(function () {
  'use strict';

  const state = {
    project: null,
    loadId: 0,
    activeAnimation: '',
    playing: false,
    ready: false
  };

  const elements = {};

  function cacheElements() {
    elements.viewer = document.querySelector('[data-model-viewer]');
    elements.shell = document.querySelector('[data-viewer-shell]');
    elements.loading = document.querySelector('[data-loading-state]');
    elements.loadingBar = document.querySelector('[data-loading-bar]');
    elements.loadingLabel = document.querySelector('[data-loading-label]');
    elements.error = document.querySelector('[data-error-state]');
    elements.errorMessage = document.querySelector('[data-error-message]');
    elements.retry = document.querySelector('[data-retry-model]');
    elements.status = document.querySelector('[data-accessible-status]');
    elements.clips = document.querySelector('[data-animation-clips]');
    elements.empty = document.querySelector('[data-animation-empty]');
    elements.playbackControls = document.querySelector('[data-playback-controls]');
    elements.speedControl = document.querySelector('[data-speed-control]');
    elements.speed = document.querySelector('[data-playback-speed]');
    elements.play = document.querySelector('[data-animation-play]');
    elements.pause = document.querySelector('[data-animation-pause]');
    elements.resume = document.querySelector('[data-animation-resume]');
    elements.restart = document.querySelector('[data-animation-restart]');
    elements.autoRotate = document.querySelector('[data-auto-rotate]');
    elements.resetCamera = document.querySelector('[data-reset-camera]');
    elements.fullscreen = document.querySelector('[data-fullscreen]');
    elements.fullscreenLabel = document.querySelector('[data-fullscreen-label]');
  }

  function announce(message) {
    if (!elements.status) return;
    elements.status.textContent = '';
    window.setTimeout(() => {
      elements.status.textContent = message;
    }, 30);
  }

  function setLoading(progress) {
    const normalized = Math.min(1, Math.max(0, Number(progress) || 0));
    if (elements.loadingBar) elements.loadingBar.style.transform = `scaleX(${normalized})`;
    if (elements.loadingLabel) {
      elements.loadingLabel.textContent = normalized > 0
        ? `Loading model · ${Math.round(normalized * 100)}%`
        : 'Preparing model…';
    }
  }

  function completeLoading() {
    if (elements.loadingBar) elements.loadingBar.style.transform = 'scaleX(1)';
    if (elements.loadingLabel) elements.loadingLabel.textContent = 'Model ready';
    elements.loading?.classList.add('is-complete');
  }

  function hideError() {
    if (elements.error) elements.error.hidden = true;
  }

  function showError(project) {
    state.ready = false;
    elements.loading?.classList.add('is-complete');
    if (elements.errorMessage) {
      elements.errorMessage.textContent = `Could not load ${project.title}. Confirm that “${project.src.split('/').pop()}” is in the models folder with exactly this capitalization, then try again.`;
    }
    if (elements.error) elements.error.hidden = false;
    updateAnimationControls([]);
    announce(`${project.title} could not be loaded. Check the model filename and try again.`);
  }

  function clearAnimation() {
    if (!elements.viewer) return;
    try {
      elements.viewer.pause();
      elements.viewer.currentTime = 0;
      elements.viewer.animationName = '';
    } catch (error) {
      // Cleanup is best-effort while a previous model is still releasing.
    }
    state.activeAnimation = '';
    state.playing = false;
  }

  function setActiveClip(name) {
    state.activeAnimation = name;
    elements.clips?.querySelectorAll('.animation-clip').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.animationName === name));
    });
  }

  function selectAnimation(name, shouldPlay) {
    if (!state.ready || !name || !elements.viewer) return;

    try {
      elements.viewer.pause();
      elements.viewer.animationName = name;
      elements.viewer.currentTime = 0;
      setActiveClip(name);
      state.playing = false;

      if (shouldPlay) {
        elements.viewer.play({ repetitions: Infinity });
        state.playing = true;
        announce(`Playing animation ${name}.`);
      } else {
        announce(`Selected animation ${name}. Press Play to begin.`);
      }
    } catch (error) {
      announce(`Animation ${name} could not be selected.`);
    }
  }

  function updateAnimationControls(animationNames) {
    if (!elements.clips || !elements.empty || !elements.playbackControls) return;
    elements.clips.replaceChildren();

    if (!animationNames.length) {
      elements.empty.hidden = false;
      elements.empty.textContent = state.ready
        ? 'This model does not contain animation clips.'
        : 'Animation clips will appear after the model loads.';
      elements.playbackControls.hidden = true;
      if (elements.speedControl) elements.speedControl.hidden = true;
      if (elements.speed) {
        elements.speed.disabled = true;
        elements.speed.value = '1';
      }
      if (elements.viewer) elements.viewer.timeScale = 1;
      return;
    }

    const fragment = document.createDocumentFragment();
    animationNames.forEach((name) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'animation-clip';
      button.dataset.animationName = name;
      button.textContent = name;
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => selectAnimation(name, true));
      fragment.append(button);
    });

    elements.clips.append(fragment);
    elements.empty.hidden = true;
    elements.playbackControls.hidden = false;
    if (elements.speedControl) elements.speedControl.hidden = false;
    if (elements.speed) elements.speed.disabled = false;
  }

  function isCurrentSource() {
    if (!state.project || !elements.viewer) return false;
    const expected = new URL(state.project.src, window.location.href).href;
    const current = new URL(elements.viewer.src || elements.viewer.getAttribute('src'), window.location.href).href;
    return current === expected;
  }

  function loadProject(project, announceSelection) {
    if (!elements.viewer || !project) return;

    state.loadId += 1;
    const loadId = state.loadId;
    state.project = project;
    state.ready = false;

    clearAnimation();
    updateAnimationControls([]);
    hideError();
    elements.loading?.classList.remove('is-complete');
    setLoading(0);

    elements.viewer.removeAttribute('auto-rotate');
    elements.autoRotate?.setAttribute('aria-pressed', 'false');
    elements.viewer.alt = project.alt;
    elements.viewer.setAttribute('src', project.src);
    elements.viewer.dataset.loadId = String(loadId);

    if (announceSelection) announce(`Loading ${project.title}.`);
  }

  function handleLoad() {
    if (!state.project || !isCurrentSource()) return;
    const expectedLoadId = String(state.loadId);
    if (elements.viewer.dataset.loadId !== expectedLoadId) return;

    state.ready = true;
    clearAnimation();
    const animations = Array.from(elements.viewer.availableAnimations || []);
    updateAnimationControls(animations);
    completeLoading();

    if (animations.length) {
      announce(`${state.project.title} loaded. ${animations.length} animation ${animations.length === 1 ? 'clip is' : 'clips are'} available. Animation is paused.`);
    } else {
      announce(`${state.project.title} loaded. This model does not contain animation clips.`);
    }
  }

  function handleProgress(event) {
    if (!state.project || !isCurrentSource() || state.ready) return;
    const progress = event.detail?.totalProgress || 0;
    setLoading(progress);

    // Some WebGL/headless environments reach 100% before dispatching the
    // component's final load event. Complete from the verified source as a
    // guarded fallback so visitors never remain behind a finished loader.
    if (progress >= 0.999) {
      const expectedLoadId = state.loadId;
      window.setTimeout(() => {
        if (!state.ready && state.loadId === expectedLoadId && isCurrentSource()) handleLoad();
      }, 500);
    }
  }

  function handleError() {
    if (!state.project || !isCurrentSource()) return;
    showError(state.project);
  }

  function playAnimation() {
    const animations = Array.from(elements.viewer?.availableAnimations || []);
    if (!animations.length) return;
    if (!state.activeAnimation) selectAnimation(animations[0], true);
    else {
      elements.viewer.play({ repetitions: Infinity });
      state.playing = true;
      announce(`Playing animation ${state.activeAnimation}.`);
    }
  }

  function pauseAnimation() {
    if (!state.activeAnimation || !state.playing) return;
    elements.viewer.pause();
    state.playing = false;
    announce(`Paused animation ${state.activeAnimation}.`);
  }

  function resumeAnimation() {
    if (!state.activeAnimation) return;
    elements.viewer.play({ repetitions: Infinity });
    state.playing = true;
    announce(`Resumed animation ${state.activeAnimation}.`);
  }

  function restartAnimation() {
    const animations = Array.from(elements.viewer?.availableAnimations || []);
    const animation = state.activeAnimation || animations[0];
    if (!animation) return;
    elements.viewer.animationName = animation;
    elements.viewer.currentTime = 0;
    elements.viewer.play({ repetitions: Infinity });
    setActiveClip(animation);
    state.playing = true;
    announce(`Restarted animation ${animation}.`);
  }

  function toggleAutoRotate() {
    if (!elements.viewer || !elements.autoRotate) return;
    const active = !elements.viewer.hasAttribute('auto-rotate');
    elements.viewer.toggleAttribute('auto-rotate', active);
    elements.autoRotate.setAttribute('aria-pressed', String(active));
    announce(active ? 'Auto-rotate enabled.' : 'Auto-rotate disabled.');
  }

  function resetCamera() {
    if (!elements.viewer) return;
    elements.viewer.cameraOrbit = '0deg 75deg auto';
    elements.viewer.cameraTarget = 'auto auto auto';
    elements.viewer.fieldOfView = 'auto';
    elements.viewer.jumpCameraToGoal?.();
    announce('Camera view reset.');
  }

  async function toggleFullscreen() {
    if (!elements.shell) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (elements.shell.requestFullscreen) {
        await elements.shell.requestFullscreen();
      } else {
        announce('Fullscreen is not supported in this browser. You can still rotate and zoom the model here.');
      }
    } catch (error) {
      announce('Fullscreen could not be opened. You can still rotate and zoom the model here.');
    }
  }

  function updateFullscreenControl() {
    const active = Boolean(document.fullscreenElement);
    if (elements.fullscreenLabel) elements.fullscreenLabel.textContent = active ? 'Exit fullscreen' : 'Fullscreen';
    if (elements.fullscreen) elements.fullscreen.setAttribute('aria-label', active ? 'Exit fullscreen' : 'View model in fullscreen');
  }

  function detectWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch (error) {
      return false;
    }
  }

  function bindEvents() {
    elements.viewer?.addEventListener('load', handleLoad);
    elements.viewer?.addEventListener('progress', handleProgress);
    elements.viewer?.addEventListener('error', handleError);
    elements.retry?.addEventListener('click', () => loadProject(state.project, true));
    elements.play?.addEventListener('click', playAnimation);
    elements.pause?.addEventListener('click', pauseAnimation);
    elements.resume?.addEventListener('click', resumeAnimation);
    elements.restart?.addEventListener('click', restartAnimation);
    elements.speed?.addEventListener('change', () => {
      const speed = Number(elements.speed.value);
      elements.viewer.timeScale = speed;
      announce(`Playback speed set to ${speed} times.`);
    });
    elements.autoRotate?.addEventListener('click', toggleAutoRotate);
    elements.resetCamera?.addEventListener('click', resetCamera);
    elements.fullscreen?.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenControl);

    window.addEventListener('portfolio:project-selected', (event) => {
      loadProject(event.detail.project, event.detail.announce);
    });
  }

  function initialize() {
    cacheElements();
    if (!elements.viewer) return;

    if (!detectWebGL()) {
      state.project = window.PORTFOLIO_PROJECTS?.[0] || null;
      if (elements.errorMessage) {
        elements.errorMessage.textContent = 'WebGL is unavailable. Enable hardware acceleration or open this page in a current browser to view the 3D work.';
      }
      if (elements.error) elements.error.hidden = false;
      elements.loading?.classList.add('is-complete');
      announce('WebGL is unavailable. Enable hardware acceleration or try a current browser.');
      return;
    }

    bindEvents();

    // main.js dispatches the initial project first; this fallback covers unusual script timing.
    window.setTimeout(() => {
      if (!state.project && window.PORTFOLIO_PROJECTS?.length) {
        loadProject(window.PORTFOLIO_PROJECTS[0], false);
      }
    }, 0);
  }

  document.addEventListener('DOMContentLoaded', initialize);
}());
