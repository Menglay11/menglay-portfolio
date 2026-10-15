const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');
const assert = require('node:assert/strict');

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(value) {
    this.values.add(value);
  }

  remove(value) {
    this.values.delete(value);
  }

  toggle(value, force) {
    const active = force === undefined ? !this.values.has(value) : force;
    if (active) this.values.add(value);
    else this.values.delete(value);
    return active;
  }

  contains(value) {
    return this.values.has(value);
  }
}

class FakeElement {
  constructor() {
    this.listeners = new Map();
    this.attributes = new Map();
    this.dataset = {};
    this.classList = new FakeClassList();
    this.style = {};
    this.textContent = '';
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  toggleAttribute(name, force) {
    if (force) this.attributes.set(name, '');
    else this.attributes.delete(name);
  }

  click() {
    return this.listeners.get('click')?.({ target: this });
  }
}

function createHarness({ requestFullscreen } = {}) {
  const selectors = [
    '[data-model-viewer]',
    '[data-viewer-shell]',
    '[data-accessible-status]',
    '[data-auto-rotate]',
    '[data-reset-camera]',
    '[data-fullscreen]',
    '[data-fullscreen-label]'
  ];
  const elements = Object.fromEntries(selectors.map((selector) => [selector, new FakeElement()]));
  const viewer = elements['[data-model-viewer]'];
  const calls = { jumpCameraToGoal: 0, resetTurntableRotation: 0 };
  viewer.pause = () => {};
  viewer.play = () => {};
  viewer.jumpCameraToGoal = () => { calls.jumpCameraToGoal += 1; };
  viewer.resetTurntableRotation = () => { calls.resetTurntableRotation += 1; };

  const documentListeners = new Map();
  const documentElement = new FakeElement();
  const body = new FakeElement();
  const shell = elements['[data-viewer-shell]'];
  if (requestFullscreen) shell.requestFullscreen = requestFullscreen;
  const document = {
    body,
    documentElement,
    fullscreenElement: null,
    querySelector: (selector) => elements[selector] || null,
    addEventListener: (type, listener) => documentListeners.set(type, listener),
    createElement: () => ({ getContext: () => ({}) })
  };
  const window = {
    WebGLRenderingContext: function WebGLRenderingContext() {},
    addEventListener: () => {},
    setTimeout: () => 0
  };

  const source = readFileSync('js/model-viewer.js', 'utf8');
  runInNewContext(source, { document, window, URL, console });
  documentListeners.get('DOMContentLoaded')();

  return { calls, document, elements };
}

test('fullscreen control uses an in-page fullscreen fallback on mobile browsers', async () => {
  const { document, elements } = createHarness();
  const shell = elements['[data-viewer-shell]'];
  const button = elements['[data-fullscreen]'];
  const label = elements['[data-fullscreen-label]'];

  await button.click();

  assert.equal(shell.classList.contains('is-fallback-fullscreen'), true);
  assert.equal(document.documentElement.classList.contains('has-viewer-fullscreen'), true);
  assert.equal(button.getAttribute('aria-label'), 'Exit fullscreen');
  assert.equal(label.textContent, 'Exit fullscreen');

  await button.click();

  assert.equal(shell.classList.contains('is-fallback-fullscreen'), false);
  assert.equal(document.documentElement.classList.contains('has-viewer-fullscreen'), false);
  assert.equal(button.getAttribute('aria-label'), 'View model in fullscreen');
});

test('fullscreen control falls back when a mobile browser rejects its native API', async () => {
  const { elements } = createHarness({
    requestFullscreen: () => Promise.reject(new Error('Fullscreen is unavailable'))
  });

  await elements['[data-fullscreen]'].click();

  assert.equal(elements['[data-viewer-shell]'].classList.contains('is-fallback-fullscreen'), true);
});

test('orbit control starts auto-rotation immediately', () => {
  const { calls, elements } = createHarness();
  const viewer = elements['[data-model-viewer]'];
  const button = elements['[data-auto-rotate]'];

  button.click();

  assert.equal(viewer.hasAttribute('auto-rotate'), true);
  assert.equal(viewer.autoRotateDelay, 0);
  assert.equal(viewer.rotationPerSecond, '30deg');
  assert.equal(calls.resetTurntableRotation, 0);
  assert.equal(button.getAttribute('aria-pressed'), 'true');
});

test('reset control stops orbit and restores the camera and turntable', () => {
  const { calls, elements } = createHarness();
  const viewer = elements['[data-model-viewer]'];
  const orbitButton = elements['[data-auto-rotate]'];

  orbitButton.click();
  elements['[data-reset-camera]'].click();

  assert.equal(viewer.hasAttribute('auto-rotate'), false);
  assert.equal(orbitButton.getAttribute('aria-pressed'), 'false');
  assert.equal(viewer.cameraOrbit, 'auto auto auto');
  assert.equal(viewer.cameraTarget, 'auto auto auto');
  assert.equal(viewer.fieldOfView, 'auto');
  assert.equal(calls.resetTurntableRotation, 1);
  assert.equal(calls.jumpCameraToGoal, 1);
});
