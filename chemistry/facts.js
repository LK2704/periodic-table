// Interactive Periodic Table — Chemistry Fun Facts Controller (facts.js)
// Exports window.ChemFacts with non-repeating Fisher-Yates shuffled deck,
// bilingual VI / EN sync, and centered compact modal with directional switch animations.

(function () {
  function resolveChemFacts() {
    if (Array.isArray(window.CHEM_FACTS)) {
      return window.CHEM_FACTS;
    }
    if (typeof CHEM_FACTS !== 'undefined' && Array.isArray(CHEM_FACTS)) {
      window.CHEM_FACTS = CHEM_FACTS;
      return CHEM_FACTS;
    }
    return [];
  }

  // Expose window.CHEM_FACTS immediately if facts-data.js declared global lexical const
  resolveChemFacts();

  const LABELS = {
    vi: {
      btnTitle: 'Sự thật thú vị',
      headerTitle: 'Sự thật hóa học',
      closeLabel: 'Đóng',
      nextLabel: 'Câu tiếp theo',
      viewElement: (el) => `Xem ${el.symbol} (${el.number}) →`,
      viewElementTitle: (el) => `Mở chi tiết nguyên tố ${el.name} (${el.symbol}, Z = ${el.number})`,
      modalLabel: 'Sự thật hóa học'
    },
    en: {
      btnTitle: 'Chemistry Fun Fact',
      headerTitle: 'Chem Fact',
      closeLabel: 'Close',
      nextLabel: 'Next fun fact',
      viewElement: (el) => `View ${el.symbol} (${el.number}) →`,
      viewElementTitle: (el) => `Open details for ${el.enName} (${el.symbol}, Z = ${el.number})`,
      modalLabel: 'Chemistry Fun Fact'
    }
  };

  const state = {
    lang: 'vi',
    isOpen: false,
    deck: [],
    cursor: 0,
    currentIdx: -1,
    initialized: false
  };

  const callbacks = {
    getLang: () => 'vi',
    getElementByZ: (z) =>
      Array.isArray(window.ELEMENTS) ? window.ELEMENTS.find((item) => item.number === z) || null : null,
    onOpenElement: () => {},
    onOpen: () => {},
    onClose: () => {}
  };

  const dom = {};
  let switchTimer = null;
  let nudgeTimer = null;

  function getFactsList() {
    return resolveChemFacts();
  }

  function getLabels() {
    return LABELS[state.lang] || LABELS.vi;
  }

  function prefersReducedMotion() {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function buildShuffledDeck(length, avoidFirstIdx) {
    const arr = new Array(length);
    for (let i = 0; i < length; i++) {
      arr[i] = i;
    }
    for (let i = length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    if (length > 1 && avoidFirstIdx >= 0 && arr[0] === avoidFirstIdx) {
      const swapPos = 1 + Math.floor(Math.random() * (length - 1));
      const tmp = arr[0];
      arr[0] = arr[swapPos];
      arr[swapPos] = tmp;
    }
    return arr;
  }

  function drawNextIndex() {
    const facts = getFactsList();
    if (facts.length === 0) return -1;
    if (state.deck.length !== facts.length || state.cursor >= state.deck.length) {
      state.deck = buildShuffledDeck(facts.length, state.currentIdx);
      state.cursor = 0;
    }
    state.currentIdx = state.deck[state.cursor++];
    return state.currentIdx;
  }

  function applyStaticLabels() {
    const dict = getLabels();
    if (dom.btn) {
      dom.btn.title = dict.btnTitle;
      dom.btn.setAttribute('aria-label', dict.btnTitle);
    }
    if (dom.modal) {
      dom.modal.setAttribute('aria-label', dict.modalLabel);
    }
    if (dom.title) {
      dom.title.textContent = dict.headerTitle;
    }
    if (dom.closeBtn) {
      dom.closeBtn.title = dict.closeLabel;
      dom.closeBtn.setAttribute('aria-label', dict.closeLabel);
    }
    if (dom.nextBtn) {
      dom.nextBtn.title = dict.nextLabel;
      dom.nextBtn.setAttribute('aria-label', dict.nextLabel);
    }
  }

  function lookupElement(z) {
    const fromCallback = callbacks.getElementByZ(z);
    if (fromCallback) return fromCallback;
    return Array.isArray(window.ELEMENTS)
      ? window.ELEMENTS.find((item) => item.number === z) || null
      : null;
  }

  function renderCurrentFact() {
    const facts = getFactsList();
    if (state.currentIdx < 0 || state.currentIdx >= facts.length) return;
    const fact = facts[state.currentIdx];
    const dict = getLabels();

    if (dom.text) {
      dom.text.textContent = state.lang === 'en' ? fact.en : fact.vi;
    }
    if (dom.viewElementBtn) {
      if (fact.z !== null && Number.isInteger(fact.z)) {
        const el = lookupElement(fact.z);
        if (el) {
          dom.viewElementBtn.textContent = dict.viewElement(el);
          dom.viewElementBtn.title = dict.viewElementTitle(el);
          dom.viewElementBtn.dataset.z = String(el.number);
          dom.viewElementBtn.classList.remove('hidden');
          return;
        }
      }
      dom.viewElementBtn.classList.add('hidden');
      delete dom.viewElementBtn.dataset.z;
    }
  }

  function clearSwitchAnimation() {
    if (switchTimer !== null) {
      clearTimeout(switchTimer);
      switchTimer = null;
    }
    if (dom.stage) {
      dom.stage.classList.remove('is-exiting', 'is-entering');
    }
    if (dom.viewElementBtn) {
      dom.viewElementBtn.classList.remove('is-fading');
    }
  }

  function triggerArrowNudge() {
    if (!dom.nextBtn || prefersReducedMotion()) return;
    if (nudgeTimer !== null) {
      clearTimeout(nudgeTimer);
      nudgeTimer = null;
    }
    dom.nextBtn.classList.remove('is-nudging');
    void dom.nextBtn.offsetWidth;
    dom.nextBtn.classList.add('is-nudging');
    nudgeTimer = setTimeout(() => {
      nudgeTimer = null;
      if (dom.nextBtn) dom.nextBtn.classList.remove('is-nudging');
    }, 230);
  }

  function triggerFactEnter() {
    if (!dom.stage) return;
    dom.stage.classList.remove('is-exiting', 'is-entering');
    if (dom.viewElementBtn) {
      dom.viewElementBtn.classList.remove('is-fading');
    }
    void dom.stage.offsetWidth;
    dom.stage.classList.add('is-entering');
  }

  function open() {
    const facts = getFactsList();
    if (facts.length === 0 || !dom.modal || !dom.btn) return;
    clearSwitchAnimation();
    const nextLang = callbacks.getLang();
    if (nextLang === 'vi' || nextLang === 'en') {
      state.lang = nextLang;
    }
    drawNextIndex();
    applyStaticLabels();
    renderCurrentFact();
    state.isOpen = true;
    dom.modal.classList.add('is-open');
    dom.modal.setAttribute('aria-hidden', 'false');
    dom.btn.classList.add('is-open');
    dom.btn.setAttribute('aria-expanded', 'true');
    callbacks.onOpen();
  }

  function close() {
    if (!state.isOpen) return;
    clearSwitchAnimation();
    state.isOpen = false;
    if (dom.modal) {
      dom.modal.classList.remove('is-open');
      dom.modal.setAttribute('aria-hidden', 'true');
    }
    if (dom.btn) {
      dom.btn.classList.remove('is-open');
      dom.btn.setAttribute('aria-expanded', 'false');
    }
    callbacks.onClose();
  }

  function toggle() {
    if (state.isOpen) {
      close();
    } else {
      open();
    }
  }

  function next() {
    const facts = getFactsList();
    if (facts.length === 0) return;

    triggerArrowNudge();

    if (!state.isOpen || prefersReducedMotion() || !dom.stage) {
      clearSwitchAnimation();
      drawNextIndex();
      renderCurrentFact();
      return;
    }

    if (switchTimer !== null) {
      clearTimeout(switchTimer);
      switchTimer = null;
      drawNextIndex();
      renderCurrentFact();
      triggerFactEnter();
      return;
    }

    dom.stage.classList.remove('is-entering');
    dom.stage.classList.add('is-exiting');
    if (dom.viewElementBtn && !dom.viewElementBtn.classList.contains('hidden')) {
      dom.viewElementBtn.classList.add('is-fading');
    }

    switchTimer = setTimeout(() => {
      switchTimer = null;
      drawNextIndex();
      renderCurrentFact();
      triggerFactEnter();
    }, 110);
  }

  function isOpen() {
    return state.isOpen;
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    state.lang = lang;
    applyStaticLabels();
    if (state.currentIdx >= 0) {
      renderCurrentFact();
    }
  }

  function bindEvents() {
    if (dom.btn) {
      dom.btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
      });
    }
    if (dom.backdrop) {
      dom.backdrop.addEventListener('click', () => {
        close();
      });
    }
    if (dom.closeBtn) {
      dom.closeBtn.addEventListener('click', () => {
        close();
      });
    }
    if (dom.nextBtn) {
      dom.nextBtn.addEventListener('click', () => {
        next();
      });
    }
    if (dom.viewElementBtn) {
      dom.viewElementBtn.addEventListener('click', () => {
        const z = Number(dom.viewElementBtn.dataset.z);
        if (!Number.isInteger(z)) return;
        const el = lookupElement(z);
        close();
        if (el) {
          callbacks.onOpenElement(el);
        }
      });
    }
    if (dom.stage) {
      dom.stage.addEventListener('animationend', () => {
        if (dom.stage) dom.stage.classList.remove('is-entering');
      });
    }
  }

  function init(opts = {}) {
    if (typeof opts.getLang === 'function') callbacks.getLang = opts.getLang;
    if (typeof opts.getElementByZ === 'function') callbacks.getElementByZ = opts.getElementByZ;
    if (typeof opts.onOpenElement === 'function') callbacks.onOpenElement = opts.onOpenElement;
    if (typeof opts.onOpen === 'function') callbacks.onOpen = opts.onOpen;
    if (typeof opts.onClose === 'function') callbacks.onClose = opts.onClose;

    dom.btn = document.getElementById('btn-fun-fact');
    dom.modal = document.getElementById('fun-fact-modal');
    dom.backdrop = document.getElementById('ff-backdrop');
    dom.dialog = document.getElementById('ff-dialog');
    dom.stage = document.getElementById('ff-stage');
    dom.title = document.getElementById('ff-title');
    dom.closeBtn = document.getElementById('ff-close');
    dom.text = document.getElementById('ff-text');
    dom.viewElementBtn = document.getElementById('ff-view-element');
    dom.nextBtn = document.getElementById('ff-next');

    const initialLang = callbacks.getLang();
    if (initialLang === 'vi' || initialLang === 'en') {
      state.lang = initialLang;
    }

    if (!state.initialized) {
      bindEvents();
      state.initialized = true;
    }

    applyStaticLabels();
  }

  window.ChemFacts = {
    init,
    open,
    close,
    toggle,
    next,
    isOpen,
    setLang
  };
})();
