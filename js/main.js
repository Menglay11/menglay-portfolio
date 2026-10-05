(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'blender-first',
      title: 'My First Blender Model',
      category: '3D Models',
      src: 'models/Blender_First.glb',
      alt: 'Interactive view of Kaing Menglay’s first Blender model'
    },
    {
      id: 'car',
      title: 'Car',
      category: '3D Models',
      src: 'models/Car.glb',
      alt: 'Interactive view of Kaing Menglay’s car model'
    },
    {
      id: 'cup',
      title: 'Cup',
      category: '3D Models',
      src: 'models/Cup.glb',
      alt: 'Interactive view of Kaing Menglay’s cup model'
    },
    {
      id: 'animation-study',
      title: 'Animation Study',
      category: 'Models with Animation',
      src: 'models/Animation.glb',
      alt: 'Interactive view of Kaing Menglay’s animation study'
    },
    {
      id: 'first-animated-character',
      title: 'First Animated Character',
      category: 'Models with Animation',
      src: 'models/firstCharacterWithAnimation.glb',
      alt: 'Interactive view of Kaing Menglay’s first animated character'
    }
  ];

  window.PORTFOLIO_PROJECTS = PROJECTS;

  const SELECTORS = {
    themeToggle: '[data-theme-toggle]',
    navToggle: '[data-nav-toggle]',
    navigation: '[data-navigation]',
    navLinks: '.nav-link',
    projectGroups: '[data-project-groups]',
    projectTitle: '[data-project-title]',
    projectCategory: '[data-project-category]',
    projectPosition: '[data-project-position]',
    projectTotal: '[data-project-total]',
    currentYear: '[data-current-year]'
  };

  let activeProjectId = PROJECTS[0].id;

  function safelyStoreTheme(theme) {
    try {
      localStorage.setItem('km-portfolio-theme', theme);
    } catch (error) {
      // The theme still works for the current visit when storage is unavailable.
    }
  }

  function updateThemeControl(theme) {
    const toggle = document.querySelector(SELECTORS.themeToggle);
    if (!toggle) return;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0b0c0c' : '#e9e7df');
  }

  function initializeTheme() {
    const root = document.documentElement;
    const initialTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = initialTheme;
    updateThemeControl(initialTheme);

    document.querySelector(SELECTORS.themeToggle)?.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      safelyStoreTheme(nextTheme);
      updateThemeControl(nextTheme);
    });
  }

  function initializeNavigation() {
    const toggle = document.querySelector(SELECTORS.navToggle);
    const nav = document.querySelector(SELECTORS.navigation);
    const links = Array.from(document.querySelectorAll(SELECTORS.navLinks));

    if (toggle && nav) {
      const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      };

      toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
      links.forEach((link) => link.addEventListener('click', () => setOpen(false)));

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
          toggle.focus();
        }
      });

      document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
      });
    }

    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        links.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${visible.target.id}`;
          link.classList.toggle('is-active', isActive);
          if (isActive) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5] });

      sections.forEach((section) => observer.observe(section));
    }
  }

  function createProjectButton(project, index) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-selector';
    button.dataset.projectId = project.id;
    button.setAttribute('aria-pressed', String(project.id === activeProjectId));

    const number = document.createElement('span');
    number.className = 'project-selector__number';
    number.textContent = String(index + 1).padStart(2, '0');

    const name = document.createElement('span');
    name.className = 'project-selector__name';
    name.textContent = project.title;

    const state = document.createElement('span');
    state.className = 'project-selector__state';
    state.setAttribute('aria-hidden', 'true');

    button.append(number, name, state);
    button.addEventListener('click', () => selectProject(project.id, true));
    return button;
  }

  function renderProjectNavigation() {
    const container = document.querySelector(SELECTORS.projectGroups);
    if (!container) return;

    const categories = [...new Set(PROJECTS.map((project) => project.category))];
    const fragment = document.createDocumentFragment();

    categories.forEach((category) => {
      const group = document.createElement('section');
      group.className = 'project-group';
      const heading = document.createElement('h3');
      heading.textContent = category;
      const list = document.createElement('div');
      list.className = 'project-list';

      PROJECTS.forEach((project, index) => {
        if (project.category === category) list.append(createProjectButton(project, index));
      });

      group.append(heading, list);
      fragment.append(group);
    });

    container.replaceChildren(fragment);
  }

  function updateProjectText(project) {
    const index = PROJECTS.findIndex((item) => item.id === project.id);
    const title = document.querySelector(SELECTORS.projectTitle);
    const category = document.querySelector(SELECTORS.projectCategory);
    const position = document.querySelector(SELECTORS.projectPosition);
    const total = document.querySelector(SELECTORS.projectTotal);

    if (title) title.textContent = project.title;
    if (category) category.textContent = project.category;
    if (position) position.textContent = String(index + 1).padStart(2, '0');
    if (total) total.textContent = String(PROJECTS.length).padStart(2, '0');

    document.querySelectorAll('.project-selector').forEach((button) => {
      const isActive = button.dataset.projectId === project.id;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function selectProject(projectId, announce) {
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project) return;

    activeProjectId = project.id;
    updateProjectText(project);
    window.dispatchEvent(new CustomEvent('portfolio:project-selected', {
      detail: { project, announce: Boolean(announce) }
    }));
  }

  function initializeProjects() {
    renderProjectNavigation();
    selectProject(activeProjectId, false);
  }

  function initializeFooter() {
    document.querySelectorAll(SELECTORS.currentYear).forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  function initializePageMotion() {
    const root = document.documentElement;
    const header = document.querySelector('[data-site-header]');
    const meter = document.querySelector('[data-scroll-meter]');
    const atelier = document.querySelector('.atelier');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateScroll = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maximum));
      header?.classList.toggle('is-scrolled', window.scrollY > 24);
      if (meter) meter.style.transform = `scaleX(${progress})`;
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    if (reduceMotion) return;
    root.classList.add('motion-ready');

    let frame = 0;
    atelier?.addEventListener('pointermove', (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const bounds = atelier.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        root.style.setProperty('--mx', x.toFixed(3));
        root.style.setProperty('--my', y.toFixed(3));
        frame = 0;
      });
    });

    atelier?.addEventListener('pointerleave', () => {
      root.style.setProperty('--mx', '0');
      root.style.setProperty('--my', '0');
    });

    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    reveals.forEach((element) => revealObserver.observe(element));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeProjects();
    initializeFooter();
    initializePageMotion();
  });
}());
