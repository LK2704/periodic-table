// Interactive Periodic Table — Virtual Labs Controller & Tab 2: Chemical Equilibrium Lab (equilibrium-lab.js)
// window.VirtualLab: manages #vlab-modal (Tab 1: Electrochemistry, Tab 2: Chemical Equilibrium)
// window.EquilibriumLab: Grade 11 (GDPT 2018) Le Chatelier's Principle & Van 't Hoff thermodynamic simulator
// Features accurate Bisection equilibrium solver, dynamic Pure-SVG Piston Cylinder, and continuous C(t) history graph.

(function () {
  const VLAB_I18N = {
    vi: {
      tabElectrochem: 'Pin điện & Điện phân',
      tabElectrochemSub: 'Pin Galvanic, đảo cực điện phân & Faraday',
      tabEquilibrium: 'Cân bằng hóa học',
      tabEquilibriumSub: "Nguyên lý Le Chatelier, Van 't Hoff & đồ thị C(t)",
      tabTitration: 'Chuẩn độ Acid–Base',
      tabTitrationSub: 'Burette, đường cong pH(V) & thực hành ẩn C₀',
      close: 'Đóng'
    },
    en: {
      tabElectrochem: 'Electrochemistry',
      tabElectrochemSub: 'Galvanic cells, electrolysis & Faraday’s Law',
      tabEquilibrium: 'Equilibrium',
      tabEquilibriumSub: "Le Chatelier's principle, Van 't Hoff & C(t) plot",
      tabTitration: 'Titration',
      tabTitrationSub: 'Burette, pH(V) curve & unknown C₀ practice',
      close: 'Close'
    }
  };

  let vState = {
    isOpen: false,
    lang: 'vi',
    activeTab: 'electrochem'
  };

  let vCallbacks = {
    getLang: () => 'vi',
    onOpen: () => {},
    onClose: () => {}
  };

  let vDom = {};

  function vDict() {
    return VLAB_I18N[vState.lang] || VLAB_I18N.vi;
  }

  function syncTabChrome() {
    const tab = vState.activeTab;
    const isElectro = tab === 'electrochem';
    const isEq = tab === 'equilibrium';
    const isTit = tab === 'titration';

    if (vDom.tabElectrochem) {
      vDom.tabElectrochem.classList.toggle('active', isElectro);
      vDom.tabElectrochem.setAttribute('aria-selected', isElectro ? 'true' : 'false');
    }
    if (vDom.tabEquilibrium) {
      vDom.tabEquilibrium.classList.toggle('active', isEq);
      vDom.tabEquilibrium.setAttribute('aria-selected', isEq ? 'true' : 'false');
    }
    if (vDom.tabTitration) {
      vDom.tabTitration.classList.toggle('active', isTit);
      vDom.tabTitration.setAttribute('aria-selected', isTit ? 'true' : 'false');
    }

    if (vDom.panelElectrochem) vDom.panelElectrochem.classList.toggle('hidden', !isElectro);
    if (vDom.panelEquilibrium) vDom.panelEquilibrium.classList.toggle('hidden', !isEq);
    if (vDom.panelTitration) vDom.panelTitration.classList.toggle('hidden', !isTit);

    let nextFooterHint = '';
    if (isElectro && window.ElectrochemLab && typeof window.ElectrochemLab.getHeaderTexts === 'function') {
      nextFooterHint = window.ElectrochemLab.getHeaderTexts(vState.lang).footerHint || '';
    } else if (isEq && window.EquilibriumLab && typeof window.EquilibriumLab.getHeaderTexts === 'function') {
      nextFooterHint = window.EquilibriumLab.getHeaderTexts(vState.lang).footerHint || '';
    } else if (isTit && window.TitrationLab && typeof window.TitrationLab.getHeaderTexts === 'function') {
      nextFooterHint = window.TitrationLab.getHeaderTexts(vState.lang).footerHint || '';
    }

    if (vDom.footerHint) {
      const hasHint = Boolean(nextFooterHint && nextFooterHint.trim());
      vDom.footerHint.textContent = hasHint ? nextFooterHint : '';
      vDom.footerHint.classList.toggle('hidden', !hasHint);
    }
  }

  function applyVirtualLabLanguage() {
    const d = vDict();
    if (!vDom.modal) return;
    vDom.modal.querySelectorAll('[data-i18n-vlab]').forEach((node) => {
      const key = node.dataset.i18nVlab;
      if (typeof d[key] === 'string') {
        node.textContent = d[key];
      }
    });
    syncTabChrome();
  }

  function setTab(tab) {
    const nextTab = tab === 'equilibrium' || tab === 'titration' ? tab : 'electrochem';
    vState.activeTab = nextTab;
    syncTabChrome();
    if (vDom.body) {
      vDom.body.scrollTop = 0;
    }
  }

  function open(initialTab) {
    if (!vDom.modal) return;
    vState.lang = vCallbacks.getLang() || 'vi';
    if (initialTab === 'electrochem' || initialTab === 'equilibrium' || initialTab === 'titration') {
      vState.activeTab = initialTab;
    }
    vState.isOpen = true;
    applyVirtualLabLanguage();
    if (window.ElectrochemLab && typeof window.ElectrochemLab.setLang === 'function') {
      window.ElectrochemLab.setLang(vState.lang);
    }
    if (window.EquilibriumLab && typeof window.EquilibriumLab.setLang === 'function') {
      window.EquilibriumLab.setLang(vState.lang);
    }
    if (window.TitrationLab && typeof window.TitrationLab.setLang === 'function') {
      window.TitrationLab.setLang(vState.lang);
    }
    vDom.modal.classList.remove('hidden');
    vCallbacks.onOpen();
  }

  function close() {
    if (!vDom.modal || !vState.isOpen) return;
    vState.isOpen = false;
    vDom.modal.classList.add('hidden');
    vCallbacks.onClose();
  }

  function isOpen() {
    return vState.isOpen;
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    vState.lang = lang;
    if (window.ElectrochemLab && typeof window.ElectrochemLab.setLang === 'function') {
      window.ElectrochemLab.setLang(lang);
    }
    if (window.EquilibriumLab && typeof window.EquilibriumLab.setLang === 'function') {
      window.EquilibriumLab.setLang(lang);
    }
    if (window.TitrationLab && typeof window.TitrationLab.setLang === 'function') {
      window.TitrationLab.setLang(lang);
    }
    applyVirtualLabLanguage();
  }

  function getActiveTab() {
    return vState.activeTab;
  }

  function init(opts = {}) {
    vCallbacks = {
      getLang: opts.getLang || (() => 'vi'),
      onOpen: opts.onOpen || (() => {}),
      onClose: opts.onClose || (() => {})
    };

    vDom = {
      modal: document.getElementById('vlab-modal'),
      backdrop: document.getElementById('vlab-backdrop'),
      tabsBar: document.getElementById('vlab-tabs'),
      tabElectrochem: document.getElementById('vlab-tab-electrochem'),
      tabEquilibrium: document.getElementById('vlab-tab-equilibrium'),
      tabTitration: document.getElementById('vlab-tab-titration'),
      panelElectrochem: document.getElementById('lab-panel-electrochem'),
      panelEquilibrium: document.getElementById('vlab-panel-equilibrium'),
      panelTitration: document.getElementById('vlab-panel-titration'),
      body: document.querySelector('#vlab-modal .lab-body'),
      footerHint: document.getElementById('vlab-footer-hint'),
      btnClose: document.getElementById('btn-close-vlab'),
      btnCloseFooter: document.getElementById('btn-close-vlab-footer')
    };

    if (!vDom.modal) return;

    vState.lang = vCallbacks.getLang() || 'vi';

    if (vDom.tabsBar) {
      vDom.tabsBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.lab-tab-btn');
        if (!btn) return;
        const tab = btn.dataset.vlabTab;
        if (tab) setTab(tab);
      });
    }

    if (vDom.btnClose) vDom.btnClose.addEventListener('click', close);
    if (vDom.btnCloseFooter) vDom.btnCloseFooter.addEventListener('click', close);
    if (vDom.backdrop) vDom.backdrop.addEventListener('click', close);

    if (window.ElectrochemLab && typeof window.ElectrochemLab.init === 'function') {
      window.ElectrochemLab.init({ getLang: vCallbacks.getLang });
    }
    if (window.EquilibriumLab && typeof window.EquilibriumLab.init === 'function') {
      window.EquilibriumLab.init({ getLang: vCallbacks.getLang });
    }
    if (window.TitrationLab && typeof window.TitrationLab.init === 'function') {
      window.TitrationLab.init({ getLang: vCallbacks.getLang });
    }

    applyVirtualLabLanguage();
  }

  window.VirtualLab = {
    init,
    open,
    close,
    isOpen,
    setLang,
    setTab,
    getActiveTab
  };
})();

(function () {
  const R_GAS = 8.314; // J/(mol·K)
  const MAX_SEGMENTS = 5;
  const BASE_RATE_K = 3.6;
  const CATALYST_MULT = 2.5;
  const SUB_DIGIT_MAP = {
    '₀': '0',
    '₁': '1',
    '₂': '2',
    '₃': '3',
    '₄': '4',
    '₅': '5',
    '₆': '6',
    '₇': '7',
    '₈': '8',
    '₉': '9'
  };

  function fmtChemHTML(str) {
    return String(str)
      .replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (m) => `<sub>${m.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => SUB_DIGIT_MAP[c] || c)}</sub>`)
      .replace(/\b([KQ])_C\b/g, '$1<sub>C</sub>')
      .replace(/ΔrH°/g, 'Δ<sub>r</sub>H°');
  }

  // 4 Standard Grade 11 (GDPT 2018) Reversible Gas-Phase Systems
  const EQUILIBRIUM_SYSTEMS = [
    {
      id: 'no2_n2o4',
      chipLabel: '2NO₂ ⇌ N₂O₄',
      equation: '2NO₂(g) ⇌ N₂O₄(g)',
      titleVi: 'Chuyển hóa Nitrogen dioxide ↔ Dinitrogen tetroxide',
      titleEn: 'Nitrogen Dioxide ↔ Dinitrogen Tetroxide Equilibrium',
      deltaH: -57.2, // kJ/mol (Exothermic)
      deltaN: -1, // (1 - 2)
      tMin: 260,
      tMax: 420,
      tStep: 2,
      tRef: 330,
      kRef: 4.0,
      colorSpeciesId: 'NO2',
      gasColorType: 'brown',
      species: [
        { id: 'NO2', label: 'NO₂', role: 'reactant', nu: -2, initC: 0.5, color: '#e07a52', addStep: 0.4, removeStep: 0.25 },
        { id: 'N2O4', label: 'N₂O₄', role: 'product', nu: 1, initC: 1.0, color: '#e5cda0', addStep: 0.4, removeStep: 0.25 }
      ],
      visualHintVi: 'NO₂ có màu nâu đỏ đậm • N₂O₄ không màu',
      visualHintEn: 'NO₂ is dark reddish-brown • N₂O₄ is colorless'
    },
    {
      id: 'h2_i2_hi',
      chipLabel: 'H₂ + I₂ ⇌ 2HI',
      equation: 'H₂(g) + I₂(g) ⇌ 2HI(g)',
      titleVi: 'Cân bằng Hydrogen iodide (Đẳng số mol khí, Δn = 0)',
      titleEn: 'Hydrogen Iodide Equilibrium (Equal Gas Moles, Δn = 0)',
      deltaH: -9.5, // kJ/mol (Mildly exothermic)
      deltaN: 0, // (2 - 2)
      tMin: 400,
      tMax: 800,
      tStep: 5,
      tRef: 600,
      kRef: 16.0,
      colorSpeciesId: 'I2',
      gasColorType: 'violet',
      species: [
        { id: 'H2', label: 'H₂', role: 'reactant', nu: -1, initC: 0.3, color: '#7aa2f7', addStep: 0.35, removeStep: 0.18 },
        { id: 'I2', label: 'I₂', role: 'reactant', nu: -1, initC: 0.3, color: '#b876e8', addStep: 0.35, removeStep: 0.18 },
        { id: 'HI', label: 'HI', role: 'product', nu: 2, initC: 1.2, color: '#6fd1c4', addStep: 0.45, removeStep: 0.28 }
      ],
      visualHintVi: 'Hơi I₂ có màu tím đặc trưng • Δn = 0 (đổi P không làm dịch chuyển)',
      visualHintEn: 'I₂ vapor is deep violet • Δn = 0 (pressure changes do NOT shift equilibrium)'
    },
    {
      id: 'n2_h2_nh3',
      chipLabel: 'N₂ + 3H₂ ⇌ 2NH₃',
      equation: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
      titleVi: 'Tổng hợp Ammonia (Quá trình Haber–Bosch)',
      titleEn: 'Ammonia Synthesis (Haber–Bosch Process)',
      deltaH: -91.8, // kJ/mol (Exothermic)
      deltaN: -2, // (2 - 4)
      tMin: 500,
      tMax: 900,
      tStep: 5,
      tRef: 650,
      kRef: 4.0,
      colorSpeciesId: null,
      gasColorType: 'neutral',
      species: [
        { id: 'N2', label: 'N₂', role: 'reactant', nu: -1, initC: 0.25, color: '#6ab5d9', addStep: 0.35, removeStep: 0.15 },
        { id: 'H2', label: 'H₂', role: 'reactant', nu: -3, initC: 1.0, color: '#e2a46b', addStep: 0.45, removeStep: 0.25 },
        { id: 'NH3', label: 'NH₃', role: 'product', nu: 2, initC: 1.0, color: '#7ec699', addStep: 0.45, removeStep: 0.25 }
      ],
      visualHintVi: 'Cả 3 khí đều không màu • Tỏa nhiệt mạnh & giảm số mol khí (4 → 2)',
      visualHintEn: 'All gases colorless • Strongly exothermic with gas mole decrease (4 → 2)'
    },
    {
      id: 'pcl5_pcl3_cl2',
      chipLabel: 'PCl₅ ⇌ PCl₃ + Cl₂',
      equation: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)',
      titleVi: 'Phân hủy Phosphorus pentachloride (Thu nhiệt, ΔH > 0)',
      titleEn: 'Phosphorus Pentachloride Dissociation (Endothermic, ΔH > 0)',
      deltaH: 87.9, // kJ/mol (Endothermic)
      deltaN: 1, // (2 - 1)
      tMin: 420,
      tMax: 620,
      tStep: 2,
      tRef: 500,
      kRef: 0.5,
      colorSpeciesId: 'Cl2',
      gasColorType: 'yellowgreen',
      species: [
        { id: 'PCl5', label: 'PCl₅', role: 'reactant', nu: -1, initC: 0.72, color: '#9da8ba', addStep: 0.4, removeStep: 0.22 },
        { id: 'PCl3', label: 'PCl₃', role: 'product', nu: 1, initC: 0.6, color: '#6ab5d9', addStep: 0.35, removeStep: 0.22 },
        { id: 'Cl2', label: 'Cl₂', role: 'product', nu: 1, initC: 0.6, color: '#a8cc44', addStep: 0.35, removeStep: 0.22 }
      ],
      visualHintVi: 'Khí Cl₂ có màu vàng lục • Thu nhiệt (ΔH > 0), tăng số mol khí (1 → 2)',
      visualHintEn: 'Cl₂ gas is yellow-green • Endothermic (ΔH > 0), gas mole increase (1 → 2)'
    }
  ];

  const EQ_I18N = {
    vi: {
      title: 'Phòng Lab Cân Bằng Hóa Học (Le Chatelier)',
      subtitle: 'Mô phỏng dịch chuyển cân bằng thuận nghịch theo Nhiệt độ, Áp suất/Thể tích, Nồng độ & Xúc tác',
      footerHint:
        'Lưu ý: Hằng số cân bằng K_C chỉ phụ thuộc vào bản chất phản ứng và nhiệt độ T; áp suất, nồng độ và chất xúc tác KHÔNG làm đổi K_C.',
      sysSelectLabel: 'Hệ thuận nghịch SGK 11:',
      pistonPanelTitle: 'XI-LANH PÍT-TÔNG & ĐỘ ĐẬM MÀU KHÍ',
      graphPanelTitle: 'ĐỒ THỊ NỒNG ĐỘ THEO THỜI GIAN C(t)',
      resetBtn: '↺ Đặt lại cân bằng đầu',
      shiftForward: '→ Dịch chuyển CHIỀU THUẬN',
      shiftReverse: '← Dịch chuyển CHIỀU NGHỊCH',
      shiftNone: '⇌ KHÔNG dịch chuyển cân bằng',
      volumePrefix: 'Thể tích V',
      pressurePrefix: 'Áp suất P',
      exoTag: 'Tỏa nhiệt (ΔrH° < 0)',
      endoTag: 'Thu nhiệt (ΔrH° > 0)',
      ctrlTempTitle: '1. Nhiệt độ (T)',
      ctrlVolTitle: '2. Thể tích / Áp suất (V tỉ lệ nghịch P)',
      ctrlVolHint: 'Kéo nhỏ V để tăng P • Kéo lớn V để giảm P',
      ctrlConcTitle: '3. Thêm / Rút nồng độ chất (K_C giữ nguyên)',
      addBtn: '+ Thêm',
      removeBtn: '− Rút',
      ctrlCatTitle: '4. Chất xúc tác (Catalyst)',
      catalystBtn: 'Xúc tác',
      catalystNote: 'Tăng đều tốc độ thuận & nghịch (~2.5×)',
      explainEyebrow: 'GIẢI THÍCH THEO NGUYÊN LÝ LE CHATELIER',
      concListLabel: 'Nồng độ cân bằng mới:',
      axisTimeLabel: 'Thời gian phản ứng (t)',
      axisConcLabel: 'Nồng độ [C] (mol/L)',
      uncatalyzedLegend: 'Đường mờ: không xúc tác',
      reactantTag: 'Chất đầu',
      productTag: 'Sản phẩm'
    },
    en: {
      title: 'Chemical Equilibrium Lab (Le Chatelier)',
      subtitle: 'Simulate reversible gas equilibria across Temperature, Volume/Pressure, Concentration & Catalyst',
      footerHint:
        'Key rule: The equilibrium constant K_C depends ONLY on temperature T; pressure, concentration changes, and catalysts NEVER change K_C.',
      sysSelectLabel: 'Reversible Systems:',
      pistonPanelTitle: 'DYNAMIC PISTON CYLINDER & GAS COLOR',
      graphPanelTitle: 'CONCENTRATION VS. TIME PLOT C(t)',
      resetBtn: '↺ Reset Initial Equilibrium',
      shiftForward: '→ Shifts FORWARD',
      shiftReverse: '← Shifts REVERSE',
      shiftNone: '⇌ NO Equilibrium Shift',
      volumePrefix: 'Volume V',
      pressurePrefix: 'Pressure P',
      exoTag: 'Exothermic (ΔrH° < 0)',
      endoTag: 'Endothermic (ΔrH° > 0)',
      ctrlTempTitle: '1. Temperature (T)',
      ctrlVolTitle: '2. Volume / Pressure (P ∝ 1/V)',
      ctrlVolHint: 'Decrease V to raise P • Increase V to lower P',
      ctrlConcTitle: '3. Add / Remove Species (K_C unchanged)',
      addBtn: '+ Add',
      removeBtn: '− Remove',
      ctrlCatTitle: '4. Catalyst Toggle',
      catalystBtn: 'Catalyst',
      catalystNote: 'Accelerates forward & reverse rates equally (~2.5×)',
      explainEyebrow: 'LE CHATELIER’S PRINCIPLE EXPLANATION',
      concListLabel: 'New Equilibrium Concentrations:',
      axisTimeLabel: 'Reaction Progress (t)',
      axisConcLabel: 'Concentration [C] (M)',
      uncatalyzedLegend: 'Dotted: uncatalyzed rate',
      reactantTag: 'Reactant',
      productTag: 'Product'
    }
  };

  let state = {
    initialized: false,
    lang: 'vi',
    systemId: 'no2_n2o4',
    tempK: 330,
    volumeL: 1.0,
    catalystOn: false,
    kc: 4.0,
    qcInst: 4.0,
    shiftDir: 'none', // 'forward' | 'reverse' | 'none'
    currentC: [],
    segments: [], // [{ tStart, tEnd, cPrevEnd, cStart, cEnd, rateK, isCatalyzed, tagVi, tagEn }]
    lastAction: { kind: 'initial' },
    activeDrag: null
  };

  let callbacks = {
    getLang: () => 'vi'
  };

  let hostEl = null;

  function dict() {
    return EQ_I18N[state.lang] || EQ_I18N.vi;
  }

  function findSystem(id) {
    return EQUILIBRIUM_SYSTEMS.find((s) => s.id === id) || EQUILIBRIUM_SYSTEMS[0];
  }

  // Exact Van 't Hoff equation: K_C(T) = K_ref * exp(-ΔH°*1000/R * (1/T - 1/T_ref))
  function calcKc(sys, tempK) {
    const deltaHJ = sys.deltaH * 1000;
    const exponent = (-deltaHJ / R_GAS) * (1 / tempK - 1 / sys.tRef);
    return sys.kRef * Math.exp(exponent);
  }

  // Exact Reaction Quotient Q_C(c) = prod(c_i^nu_i)
  function calcQc(sys, conc) {
    let logQ = 0;
    for (let i = 0; i < sys.species.length; i++) {
      const sp = sys.species[i];
      const val = Math.max(1e-18, conc[i]);
      logQ += sp.nu * Math.log(val);
    }
    return Math.exp(logQ);
  }

  // Exact Bisection Solver: finds reaction extent x = ξ/V where Q_C(c0 + ν*x) = Kc and all c_i > 0
  function solveEquilibrium(sys, c0, Kc) {
    let xMin = -Infinity;
    let xMax = Infinity;
    for (let i = 0; i < sys.species.length; i++) {
      const nu = sys.species[i].nu;
      const c = c0[i];
      if (nu > 0) {
        xMin = Math.max(xMin, -c / nu);
      } else if (nu < 0) {
        xMax = Math.min(xMax, c / -nu);
      }
    }

    const logKc = Math.log(Kc);
    const evalF = (x) => {
      let logQ = 0;
      for (let i = 0; i < sys.species.length; i++) {
        const val = c0[i] + sys.species[i].nu * x;
        logQ += sys.species[i].nu * Math.log(Math.max(1e-18, val));
      }
      return logQ - logKc;
    };

    const f0 = evalF(0);
    if (Math.abs(f0) < 1e-6) {
      return {
        cEq: c0.slice(),
        shift: 'none',
        extent: 0
      };
    }

    let lo, hi;
    if (f0 < 0) {
      // Q_C < K_C => shifts forward (x > 0)
      lo = 0;
      let delta = (xMax - lo) * 1e-3;
      while (delta > 1e-15 && evalF(xMax - delta) < 0) {
        delta *= 0.01;
      }
      hi = xMax - delta;
    } else {
      // Q_C > K_C => shifts reverse (x < 0)
      hi = 0;
      let delta = (hi - xMin) * 1e-3;
      while (delta > 1e-15 && evalF(xMin + delta) > 0) {
        delta *= 0.01;
      }
      lo = xMin + delta;
    }

    for (let iter = 0; iter < 85; iter++) {
      const mid = 0.5 * (lo + hi);
      const fMid = evalF(mid);
      if (Math.abs(fMid) < 1e-10 || hi - lo < 1e-14) {
        lo = hi = mid;
        break;
      }
      if (fMid < 0) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    const xStar = 0.5 * (lo + hi);
    const cEq = sys.species.map((sp, idx) => Math.max(1e-6, c0[idx] + sp.nu * xStar));
    const shift = Math.abs(xStar) < 1e-5 ? 'none' : xStar > 0 ? 'forward' : 'reverse';

    return {
      cEq,
      shift,
      extent: xStar
    };
  }

  function resetSystem(systemId) {
    const sys = findSystem(systemId || state.systemId);
    state.activeDrag = null;
    state.systemId = sys.id;
    state.tempK = sys.tRef;
    state.volumeL = 1.0;
    state.kc = calcKc(sys, sys.tRef);
    const initC = sys.species.map((sp) => sp.initC);
    state.currentC = initC.slice();
    state.qcInst = calcQc(sys, initC);
    state.shiftDir = 'none';
    state.lastAction = { kind: 'initial' };
    state.segments = [
      {
        tStart: 0,
        tEnd: 1,
        cPrevEnd: initC.slice(),
        cStart: initC.slice(),
        cEnd: initC.slice(),
        rateK: state.catalystOn ? BASE_RATE_K * CATALYST_MULT : BASE_RATE_K,
        isCatalyzed: state.catalystOn,
        tagVi: 't₀',
        tagEn: 't₀'
      }
    ];
  }

  function makeSegment(tStart, cPrevEnd, cStart, cEnd, tagVi, tagEn) {
    const rateK = state.catalystOn ? BASE_RATE_K * CATALYST_MULT : BASE_RATE_K;
    return {
      tStart,
      tEnd: tStart + 1,
      cPrevEnd: cPrevEnd.slice(),
      cStart: cStart.slice(),
      cEnd: cEnd.slice(),
      rateK,
      isCatalyzed: state.catalystOn,
      tagVi,
      tagEn
    };
  }

  function pushSegment(cPrevEnd, cStart, cEnd, tagVi, tagEn) {
    const last = state.segments[state.segments.length - 1];
    const tStart = last ? last.tEnd : 0;
    state.segments.push(makeSegment(tStart, cPrevEnd, cStart, cEnd, tagVi, tagEn));
    if (state.segments.length > MAX_SEGMENTS) {
      state.segments = state.segments.slice(state.segments.length - MAX_SEGMENTS);
    }
  }

  function applyLiveSliderUpdate(dragType, rawValue) {
    const sys = findSystem(state.systemId);

    // If a different drag baseline was open, clear it cleanly first
    if (state.activeDrag && state.activeDrag.type !== dragType) {
      state.activeDrag = null;
    }

    if (!state.activeDrag) {
      state.activeDrag = {
        type: dragType,
        baseTempK: state.tempK,
        baseVolL: state.volumeL,
        baseC: state.currentC.slice(),
        baseKc: state.kc,
        baseQcInst: state.qcInst,
        baseShiftDir: state.shiftDir,
        baseLastAction: state.lastAction,
        baseSegments: state.segments.slice()
      };
    }

    const base = state.activeDrag;
    const baseLast = base.baseSegments[base.baseSegments.length - 1];
    const nextTStart = baseLast ? baseLast.tEnd : 0;

    if (dragType === 'temp') {
      const clampedT = Math.max(sys.tMin, Math.min(sys.tMax, Number(rawValue)));
      if (Math.abs(clampedT - base.baseTempK) < 1e-6) {
        state.tempK = base.baseTempK;
        state.kc = base.baseKc;
        state.qcInst = base.baseQcInst;
        state.shiftDir = base.baseShiftDir;
        state.currentC = base.baseC.slice();
        state.lastAction = base.baseLastAction;
        state.segments = base.baseSegments.slice();
      } else {
        const nextKc = calcKc(sys, clampedT);
        const qcInst = calcQc(sys, base.baseC);
        const sol = solveEquilibrium(sys, base.baseC, nextKc);
        const tag = clampedT > base.baseTempK ? `T↑ ${clampedT}K` : `T↓ ${clampedT}K`;
        const dragSeg = makeSegment(nextTStart, base.baseC, base.baseC, sol.cEq, tag, tag);
        const nextSegs = base.baseSegments.concat(dragSeg);

        state.tempK = clampedT;
        state.kc = nextKc;
        state.qcInst = qcInst;
        state.shiftDir = sol.shift;
        state.currentC = sol.cEq.slice();
        state.lastAction = {
          kind: clampedT > base.baseTempK ? 'temp-up' : 'temp-down',
          prevT: base.baseTempK,
          newT: clampedT,
          prevKc: base.baseKc,
          newKc: nextKc,
          qcInst
        };
        state.segments = nextSegs.length > MAX_SEGMENTS ? nextSegs.slice(nextSegs.length - MAX_SEGMENTS) : nextSegs;
      }
    } else if (dragType === 'vol') {
      const clampedV = Math.max(0.5, Math.min(2.0, Number(rawValue)));
      if (Math.abs(clampedV - base.baseVolL) < 1e-6) {
        state.volumeL = base.baseVolL;
        state.kc = base.baseKc;
        state.qcInst = base.baseQcInst;
        state.shiftDir = base.baseShiftDir;
        state.currentC = base.baseC.slice();
        state.lastAction = base.baseLastAction;
        state.segments = base.baseSegments.slice();
      } else {
        const scale = base.baseVolL / clampedV;
        const cInst = base.baseC.map((c) => Math.max(1e-5, c * scale));
        const qcInst = calcQc(sys, cInst);
        // IMPORTANT: K_C depends ONLY on temperature T — stays 100% invariant on volume/pressure changes
        const sol = solveEquilibrium(sys, cInst, base.baseKc);
        const tag = clampedV < base.baseVolL ? `V↓ (${(1 / clampedV).toFixed(1)}P)` : `V↑ (${(1 / clampedV).toFixed(1)}P)`;
        const dragSeg = makeSegment(nextTStart, base.baseC, cInst, sol.cEq, tag, tag);
        const nextSegs = base.baseSegments.concat(dragSeg);

        state.volumeL = clampedV;
        state.kc = base.baseKc;
        state.qcInst = qcInst;
        state.shiftDir = sol.shift;
        state.currentC = sol.cEq.slice();
        state.lastAction = {
          kind: clampedV < base.baseVolL ? 'vol-down' : 'vol-up',
          prevV: base.baseVolL,
          newV: clampedV,
          qcInst,
          kc: base.baseKc
        };
        state.segments = nextSegs.length > MAX_SEGMENTS ? nextSegs.slice(nextSegs.length - MAX_SEGMENTS) : nextSegs;
      }
    }

    updateLiveVisuals();
  }

  function applySpeciesPerturbation(speciesIdx, isAdd) {
    state.activeDrag = null;
    const sys = findSystem(state.systemId);
    const sp = sys.species[speciesIdx];
    if (!sp) return;

    const cPrev = state.currentC.slice();
    const cInst = cPrev.slice();
    if (isAdd) {
      cInst[speciesIdx] = Math.min(4.5, cPrev[speciesIdx] + sp.addStep);
    } else {
      cInst[speciesIdx] =
        cPrev[speciesIdx] > sp.removeStep + 0.02
          ? cPrev[speciesIdx] - sp.removeStep
          : Math.max(0.005, cPrev[speciesIdx] * 0.45);
    }
    if (Math.abs(cInst[speciesIdx] - cPrev[speciesIdx]) < 1e-5) return;

    const qcInst = calcQc(sys, cInst);
    // IMPORTANT: K_C depends ONLY on temperature T — stays 100% invariant on concentration perturbations
    const sol = solveEquilibrium(sys, cInst, state.kc);

    state.qcInst = qcInst;
    state.shiftDir = sol.shift;
    state.currentC = sol.cEq.slice();
    state.lastAction = {
      kind: isAdd ? 'add-species' : 'remove-species',
      speciesLabel: sp.label,
      speciesRole: sp.role,
      oldVal: cPrev[speciesIdx],
      newVal: cInst[speciesIdx],
      qcInst,
      kc: state.kc
    };

    const tag = `${isAdd ? '+' : '−'}${sp.label}`;
    pushSegment(cPrev, cInst, sol.cEq, tag, tag);
    render();
  }

  function toggleCatalyst() {
    state.activeDrag = null;
    state.catalystOn = !state.catalystOn;
    // Update the most recent relaxation segment rate so the user immediately sees the ~2.5x steeper slope
    // while K_C and equilibrium concentrations remain 100% unchanged.
    const lastSeg = state.segments[state.segments.length - 1];
    if (lastSeg) {
      lastSeg.isCatalyzed = state.catalystOn;
      lastSeg.rateK = state.catalystOn ? BASE_RATE_K * CATALYST_MULT : BASE_RATE_K;
    }
    state.shiftDir = 'none';
    state.lastAction = {
      kind: 'catalyst',
      enabled: state.catalystOn
    };

    const catBtn = hostEl && hostEl.querySelector('#eq-cat-toggle');
    if (catBtn) {
      catBtn.classList.toggle('active', state.catalystOn);
      catBtn.setAttribute('aria-pressed', state.catalystOn ? 'true' : 'false');
      updateLiveVisuals();
    } else {
      render();
    }
  }

  function formatSciNumber(val) {
    if (!Number.isFinite(val)) return '—';
    if (val >= 100 || (val > 0 && val < 0.01)) {
      const exp = Math.floor(Math.log10(val));
      const mant = val / Math.pow(10, exp);
      return `${mant.toFixed(2)}×10^${exp}`;
    }
    return val >= 10 ? val.toFixed(2) : val.toFixed(3);
  }

  // Compute gas mixture fill & border glow inside the piston chamber
  function getChamberGasFill(sys, conc) {
    if (!sys.colorSpeciesId) {
      const totalC = conc.reduce((acc, v) => acc + v, 0);
      const alpha = Math.min(0.24, 0.06 + totalC * 0.045);
      return `rgba(148, 163, 184, ${alpha.toFixed(3)})`;
    }
    const idx = sys.species.findIndex((sp) => sp.id === sys.colorSpeciesId);
    const keyC = idx >= 0 ? conc[idx] : 0;
    if (sys.gasColorType === 'brown') {
      const alpha = Math.min(0.76, 0.05 + keyC * 0.42);
      return `rgba(196, 74, 38, ${alpha.toFixed(3)})`;
    }
    if (sys.gasColorType === 'violet') {
      const alpha = Math.min(0.74, 0.06 + keyC * 0.62);
      return `rgba(162, 76, 214, ${alpha.toFixed(3)})`;
    }
    if (sys.gasColorType === 'yellowgreen') {
      const alpha = Math.min(0.68, 0.05 + keyC * 0.46);
      return `rgba(154, 198, 62, ${alpha.toFixed(3)})`;
    }
    return 'rgba(148, 163, 184, 0.14)';
  }

  function computePistonMetrics(sys) {
    const chamberBottom = 214;
    const chamberMinY = 58; // Top wall at V = 2.00 L
    const maxGasH = chamberBottom - chamberMinY; // 156 px at V = 2.00 L
    const gasH = (state.volumeL / 2.0) * maxGasH;
    const pistonBottomY = chamberBottom - gasH;
    const pistonTopY = pistonBottomY - 14;
    const gasFill = getChamberGasFill(sys, state.currentC);

    // Relative temperature factor for subtle thermal vibration duration (hotter = faster)
    const tNorm = (state.tempK - sys.tMin) / Math.max(1, sys.tMax - sys.tMin);
    const vibDur = (1.6 - tNorm * 0.85).toFixed(2);

    // Exactly 32 gas particles distributed proportionally across species concentrations
    const TOTAL_DOTS = 32;
    const totalConc = Math.max(0.01, state.currentC.reduce((a, b) => a + b, 0));
    const counts = [];
    let countSum = 0;
    for (let i = 0; i < sys.species.length; i++) {
      const reserveRest = (sys.species.length - 1 - i) * 2;
      const maxAvail = TOTAL_DOTS - countSum - reserveRest;
      const rawCount =
        i === sys.species.length - 1
          ? TOTAL_DOTS - countSum
          : Math.min(maxAvail, Math.max(2, Math.round((state.currentC[i] / totalConc) * TOTAL_DOTS)));
      counts.push(rawCount);
      countSum += rawCount;
    }

    const xLeft = 66;
    const xSpan = 168;
    const ySpan = Math.max(22, gasH - 14);
    const particles = [];
    let idx = 0;
    sys.species.forEach((sp, i) => {
      for (let k = 0; k < counts[i]; k++) {
        const rx = ((idx * 53 + 17) % 100) / 100;
        const ry = ((idx * 79 + 31) % 100) / 100;
        particles.push({
          idx,
          color: sp.color,
          cx: (xLeft + rx * xSpan).toFixed(1),
          cy: (pistonBottomY + 7 + ry * ySpan).toFixed(1)
        });
        idx++;
      }
    });

    const relPressure = (1.0 / state.volumeL) * (state.tempK / sys.tRef);
    const captionText = `V = ${state.volumeL.toFixed(2)} L  •  P ≈ ${relPressure.toFixed(2)}×P₀  •  T = ${state.tempK} K`;

    return {
      chamberBottom,
      maxGasH,
      gasH,
      pistonBottomY,
      pistonTopY,
      gasFill,
      vibDur,
      particles,
      captionText
    };
  }

  // Left SVG: Dynamic Piston Cylinder with scaled Volume V, gas color, and vibrating molecules
  function buildPistonSVG(sys) {
    const m = computePistonMetrics(sys);
    const dotsSVG = m.particles
      .map((p) => {
        const delay = (((p.idx * 29) % 15) * 0.11).toFixed(2);
        const dx = (p.idx % 2 === 0 ? 2.6 : -2.6).toFixed(1);
        const dy = (p.idx % 3 === 0 ? -2.4 : 2.2).toFixed(1);
        return `<circle cx="${p.cx}" cy="${p.cy}" r="3.4" fill="${p.color}" fill-opacity="0.92" data-mol-idx="${p.idx}" class="eq-mol-particle" style="--eq-dur:${m.vibDur}s;--eq-delay:${delay}s;--eq-dx:${dx}px;--eq-dy:${dy}px;" />`;
      })
      .join('');

    return `
      <svg class="eq-piston-svg" viewBox="0 0 300 248" role="img" aria-label="${sys.equation}">
        <defs>
          <clipPath id="eq-chamber-clip">
            <rect x="56" y="42" width="188" height="${m.chamberBottom - 42}" rx="3" />
          </clipPath>
        </defs>

        <!-- Cylinder graduation scale marks (0.5 L, 1.0 L, 1.5 L, 2.0 L) -->
        ${[0.5, 1.0, 1.5, 2.0]
          .map((vMark) => {
            const yTick = (m.chamberBottom - (vMark / 2.0) * m.maxGasH).toFixed(1);
            return `
              <line x1="42" y1="${yTick}" x2="52" y2="${yTick}" stroke="#64748b" stroke-width="1.2" />
              <text x="38" y="${Number(yTick) + 3}" text-anchor="end" class="eq-svg-axis-txt">${vMark.toFixed(1)}L</text>
            `;
          })
          .join('')}

        <!-- Gas Chamber Interior Color -->
        <rect id="eq-svg-gas-rect" x="56" y="${m.pistonBottomY.toFixed(1)}" width="188" height="${m.gasH.toFixed(1)}"
              fill="${m.gasFill}" clip-path="url(#eq-chamber-clip)" />

        <!-- Vibrating Molecule Dots inside Gas Chamber -->
        <g clip-path="url(#eq-chamber-clip)">
          ${dotsSVG}
        </g>

        <!-- Moving Piston Rod & Head -->
        <rect id="eq-svg-piston-rod" x="143" y="6" width="14" height="${Math.max(4, m.pistonTopY - 6).toFixed(1)}" rx="2"
              fill="#475569" stroke="#94a3b8" stroke-width="1.2" />
        <rect id="eq-svg-piston-head" x="58" y="${m.pistonTopY.toFixed(1)}" width="184" height="14" rx="2.5"
              fill="#64748b" stroke="#cbd5e1" stroke-width="1.5" />
        <line id="eq-svg-piston-line" x1="66" y1="${(m.pistonTopY + 5).toFixed(1)}" x2="234" y2="${(m.pistonTopY + 5).toFixed(1)}"
              stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" />

        <!-- Outer Glass Cylinder Walls -->
        <path d="M 52 38 L 56 38 L 56 ${m.chamberBottom} Q 56 220 62 220 L 238 220 Q 244 220 244 ${m.chamberBottom} L 244 38 L 248 38"
              fill="none" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round" />

        <!-- Live V, P & T Footer inside SVG -->
        <text id="eq-svg-piston-caption" x="150" y="238" text-anchor="middle" class="eq-svg-caption">
          ${m.captionText}
        </text>
      </svg>
    `;
  }

  // Update piston SVG attributes in place so CSS molecular motion keeps running smoothly during slider drags
  function updatePistonSVGInPlace(sys, syncSpeed) {
    const pistonHost = hostEl && hostEl.querySelector('#eq-piston-svg-host');
    if (!pistonHost) return;

    const gasRect = pistonHost.querySelector('#eq-svg-gas-rect');
    const pistonRod = pistonHost.querySelector('#eq-svg-piston-rod');
    const pistonHead = pistonHost.querySelector('#eq-svg-piston-head');
    const pistonLine = pistonHost.querySelector('#eq-svg-piston-line');
    const captionEl = pistonHost.querySelector('#eq-svg-piston-caption');
    const circles = pistonHost.querySelectorAll('.eq-mol-particle');

    const m = computePistonMetrics(sys);
    if (!gasRect || !pistonRod || !pistonHead || !pistonLine || !captionEl || circles.length !== m.particles.length) {
      pistonHost.innerHTML = buildPistonSVG(sys);
      return;
    }

    gasRect.setAttribute('y', m.pistonBottomY.toFixed(1));
    gasRect.setAttribute('height', m.gasH.toFixed(1));
    gasRect.setAttribute('fill', m.gasFill);

    pistonRod.setAttribute('height', Math.max(4, m.pistonTopY - 6).toFixed(1));
    pistonHead.setAttribute('y', m.pistonTopY.toFixed(1));
    pistonLine.setAttribute('y1', (m.pistonTopY + 5).toFixed(1));
    pistonLine.setAttribute('y2', (m.pistonTopY + 5).toFixed(1));
    captionEl.textContent = m.captionText;

    for (let i = 0; i < m.particles.length; i++) {
      const p = m.particles[i];
      const circle = circles[i];
      circle.setAttribute('cx', p.cx);
      circle.setAttribute('cy', p.cy);
      circle.setAttribute('fill', p.color);
      if (syncSpeed) {
        circle.style.setProperty('--eq-dur', `${m.vibDur}s`);
      }
    }
  }

  // Right SVG: Continuous Multi-Segment Concentration vs. Time C(t) Plot
  function buildGraphSVG(sys) {
    const d = dict();
    const isEn = state.lang === 'en';
    const segs = state.segments;

    const plotL = 54;
    const plotR = 396;
    const plotT = 23;
    const plotB = 198;
    const plotW = plotR - plotL;
    const plotH = plotB - plotT;

    // Determine Y-axis upper ceiling across all segments cleanly
    let maxVal = 1.2;
    segs.forEach((seg) => {
      seg.cPrevEnd.forEach((v) => { if (v > maxVal) maxVal = v; });
      seg.cStart.forEach((v) => { if (v > maxVal) maxVal = v; });
      seg.cEnd.forEach((v) => { if (v > maxVal) maxVal = v; });
    });
    const yMax = Math.max(1.0, Math.ceil((maxVal * 1.15) * 4) / 4);

    const tMin = segs.length > 0 ? segs[0].tStart : 0;
    const tMax = segs.length > 0 ? Math.max(tMin + 1, segs[segs.length - 1].tEnd) : 1;
    const tSpan = tMax - tMin;

    const mapX = (tVal) => plotL + ((tVal - tMin) / tSpan) * plotW;
    const mapY = (cVal) => plotB - Math.max(0, Math.min(1, cVal / yMax)) * plotH;

    // Grid horizontal lines & Y ticks
    const yTicks = [0, 0.25, 0.5, 0.75, 1.0].map((frac) => frac * yMax);
    const yGridSVG = yTicks
      .map((val) => {
        const y = mapY(val).toFixed(1);
        return `
          <line x1="${plotL}" y1="${y}" x2="${plotR}" y2="${y}" stroke="rgba(148,163,184,0.12)" stroke-width="1" />
          <text x="${plotL - 6}" y="${Number(y) + 3}" text-anchor="end" class="eq-svg-axis-txt">${val.toFixed(2)}</text>
        `;
      })
      .join('');

    // Vertical perturbation dashed lines & compact action tags
    let markersSVG = '';
    for (let sIdx = 1; sIdx < segs.length; sIdx++) {
      const seg = segs[sIdx];
      const xM = mapX(seg.tStart).toFixed(1);
      const tag = isEn ? seg.tagEn : seg.tagVi;
      markersSVG += `
        <line x1="${xM}" y1="${plotT}" x2="${xM}" y2="${plotB}" stroke="#d4b47c" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.75" />
        <rect x="${Number(xM) - 29}" y="4" width="58" height="14.5" rx="3" fill="#252017" stroke="#6b5634" stroke-width="0.9" />
        <text x="${xM}" y="13.8" text-anchor="middle" class="eq-svg-marker-txt">${tag}</text>
      `;
    }

    // Plot curves for each species across all segments
    let curvesSVG = '';
    const stepsPerSeg = 22;
    sys.species.forEach((sp, spIdx) => {
      let pathD = '';
      let dashedJumps = '';
      let uncatalyzedOverlay = '';

      segs.forEach((seg, sIdx) => {
        const yPrev = mapY(seg.cPrevEnd[spIdx]);
        const yStart = mapY(seg.cStart[spIdx]);
        const c0 = seg.cStart[spIdx];
        const c1 = seg.cEnd[spIdx];
        const k = seg.rateK;
        const denom = 1 - Math.exp(-k);

        // Draw crisp vertical step jump when instantaneous concentration changed (Volume or Add/Remove)
        if (sIdx > 0 && Math.abs(c0 - seg.cPrevEnd[spIdx]) > 1e-4) {
          const xJump = mapX(seg.tStart).toFixed(1);
          dashedJumps += `<line x1="${xJump}" y1="${yPrev.toFixed(1)}" x2="${xJump}" y2="${yStart.toFixed(1)}" stroke="${sp.color}" stroke-width="1.4" stroke-dasharray="2.5 2.5" opacity="0.82" />`;
        }

        let segPath = '';
        for (let step = 0; step <= stepsPerSeg; step++) {
          const u = step / stepsPerSeg;
          const decayFrac = (Math.exp(-k * u) - Math.exp(-k)) / denom;
          const cVal = c1 + (c0 - c1) * decayFrac;
          const xPx = mapX(seg.tStart + u).toFixed(1);
          const yPx = mapY(cVal).toFixed(1);
          segPath += (step === 0 ? `M ${xPx} ${yPx}` : ` L ${xPx} ${yPx}`);
        }
        pathD += (pathD ? ' ' : '') + segPath;

        // If latest segment uses Catalyst, show dotted uncatalyzed reference curve reaching the exact same c1
        if (sIdx === segs.length - 1 && seg.isCatalyzed && Math.abs(c1 - c0) > 1e-3) {
          const refDenom = 1 - Math.exp(-BASE_RATE_K);
          let refPath = '';
          for (let step = 0; step <= stepsPerSeg; step++) {
            const u = step / stepsPerSeg;
            const decayFrac = (Math.exp(-BASE_RATE_K * u) - Math.exp(-BASE_RATE_K)) / refDenom;
            const cVal = c1 + (c0 - c1) * decayFrac;
            const xPx = mapX(seg.tStart + u).toFixed(1);
            const yPx = mapY(cVal).toFixed(1);
            refPath += (step === 0 ? `M ${xPx} ${yPx}` : ` L ${xPx} ${yPx}`);
          }
          uncatalyzedOverlay += `<path d="${refPath}" fill="none" stroke="${sp.color}" stroke-width="1.35" stroke-dasharray="3 3" opacity="0.55" />`;
        }
      });

      const lastVal = state.currentC[spIdx];
      const yEnd = mapY(lastVal).toFixed(1);
      curvesSVG += `
        ${dashedJumps}
        ${uncatalyzedOverlay}
        <path d="${pathD}" fill="none" stroke="${sp.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="${plotR}" cy="${yEnd}" r="3.2" fill="${sp.color}" stroke="#0e1117" stroke-width="1" />
      `;
    });

    return `
      <svg class="eq-graph-svg" viewBox="0 0 410 248" role="img" aria-label="${d.graphPanelTitle}">
        ${yGridSVG}
        ${markersSVG}

        <!-- Axes -->
        <line x1="${plotL}" y1="${plotT}" x2="${plotL}" y2="${plotB}" stroke="#94a3b8" stroke-width="1.4" />
        <line x1="${plotL}" y1="${plotB}" x2="${plotR}" y2="${plotB}" stroke="#94a3b8" stroke-width="1.4" />

        ${curvesSVG}

        <!-- Axis Labels -->
        <text x="${(plotL + plotR) / 2}" y="222" text-anchor="middle" class="eq-svg-caption">${d.axisTimeLabel}</text>
        <text x="13" y="${(plotT + plotB) / 2}" text-anchor="middle" transform="rotate(-90 13 ${(plotT + plotB) / 2})" class="eq-svg-caption">${d.axisConcLabel}</text>
      </svg>
    `;
  }

  function buildExplanationText(sys) {
    const isEn = state.lang === 'en';
    const act = state.lastAction;
    const isExo = sys.deltaH < 0;

    if (act.kind === 'initial') {
      return isEn
        ? `System is at initial equilibrium at T = ${sys.tRef} K and V = 1.00 L (Q_C = K_C = ${formatSciNumber(state.kc)}). Adjust Temperature, Volume/Pressure, Concentration, or Catalyst to observe Le Chatelier’s Principle.`
        : `Hệ đang ở trạng thái cân bằng ban đầu tại T = ${sys.tRef} K và V = 1.00 L (Q_C = K_C = ${formatSciNumber(state.kc)}). Hãy thử thay đổi Nhiệt độ, Thể tích/Áp suất, Nồng độ hoặc Xúc tác để quan sát nguyên lý Le Chatelier.`;
    }

    if (act.kind === 'temp-up' || act.kind === 'temp-down') {
      const heated = act.kind === 'temp-up';
      if (isEn) {
        const thermoType = isExo ? 'exothermic (ΔH < 0)' : 'endothermic (ΔH > 0)';
        const favorSide = heated
          ? isExo
            ? 'the endothermic reverse direction (to absorb added heat), lowering K_C'
            : 'the endothermic forward direction (to absorb added heat), raising K_C'
          : isExo
          ? 'the exothermic forward direction (to release heat), raising K_C'
          : 'the exothermic reverse direction (to release heat), lowering K_C';
        return `This reaction is ${thermoType}. ${heated ? 'Increasing' : 'Decreasing'} temperature shifts the equilibrium toward ${favorSide}: K_C changes from ${formatSciNumber(act.prevKc)} to ${formatSciNumber(act.newKc)}.`;
      } else {
        const thermoType = isExo ? 'tỏa nhiệt (ΔrH° < 0)' : 'thu nhiệt (ΔrH° > 0)';
        const favorSide = heated
          ? isExo
            ? 'chiều nghịch thu nhiệt (làm giảm nhiệt độ), khiến K_C giảm'
            : 'chiều thuận thu nhiệt (làm giảm nhiệt độ), khiến K_C tăng'
          : isExo
          ? 'chiều thuận tỏa nhiệt (chống lại sự làm lạnh), khiến K_C tăng'
          : 'chiều nghịch tỏa nhiệt (chống lại sự làm lạnh), khiến K_C giảm';
        return `Phản ứng thuận có tính chất ${thermoType}. Khi ${heated ? 'tăng' : 'giảm'} nhiệt độ, cân bằng dịch chuyển theo ${favorSide}: K_C đổi từ ${formatSciNumber(act.prevKc)} thành ${formatSciNumber(act.newKc)}.`;
      }
    }

    if (act.kind === 'vol-down' || act.kind === 'vol-up') {
      const compressed = act.kind === 'vol-down';
      if (sys.deltaN === 0) {
        return isEn
          ? `Pressure ${compressed ? 'increased (V↓)' : 'decreased (V↑)'}, but K_C remains unchanged (${formatSciNumber(state.kc)}). Because Δn = 0 (equal moles of gas on both sides), Q_C still equals K_C — NO equilibrium shift occurs!`
          : `Khi ${compressed ? 'nén giảm thể tích (tăng P)' : 'giãn tăng thể tích (giảm P)'}, hằng số K_C giữ nguyên (${formatSciNumber(state.kc)}). Do tổng số mol khí hai vế bằng nhau (Δn = 0), Q_C vẫn bằng K_C nên cân bằng KHÔNG bị dịch chuyển!`;
      }
      if (isEn) {
        const moleSide = compressed ? 'fewer' : 'more';
        const dirWord = state.shiftDir === 'forward' ? 'FORWARD' : 'REVERSE';
        const shiftText = `shifts ${dirWord} toward the side with ${moleSide} gas moles`;
        return `${compressed ? 'Compressing the piston increases' : 'Expanding the piston decreases'} total pressure while K_C stays strictly constant (${formatSciNumber(state.kc)}). Instantly Q_C = ${formatSciNumber(act.qcInst)}, so the system ${shiftText}.`;
      } else {
        const shiftSide =
          compressed
            ? 'về phía có ÍT mol khí hơn để giảm áp suất'
            : 'về phía có NHIỀU mol khí hơn để chống lại sự giảm áp suất';
        const dirText = state.shiftDir === 'forward' ? 'CHIỀU THUẬN' : 'CHIỀU NGHỊCH';
        return `${compressed ? 'Nén thể tích làm TĂNG áp suất' : 'Tăng thể tích làm GIẢM áp suất'} (lưu ý K_C = ${formatSciNumber(state.kc)} KHÔNG đổi). Thương số tức thời Q_C = ${formatSciNumber(act.qcInst)} khác K_C nên cân bằng dịch chuyển theo ${dirText} (${shiftSide}).`;
      }
    }

    if (act.kind === 'add-species' || act.kind === 'remove-species') {
      const isAdd = act.kind === 'add-species';
      if (isEn) {
        const dirWord = state.shiftDir === 'forward' ? 'FORWARD' : state.shiftDir === 'reverse' ? 'REVERSE' : 'unchanged';
        return `${isAdd ? 'Adding' : 'Removing'} ${act.speciesLabel} keeps K_C constant (${formatSciNumber(state.kc)}) while Q_C jumps to ${formatSciNumber(act.qcInst)}. To counteract this change, equilibrium shifts ${dirWord} (${isAdd ? 'consuming added' : 'replenishing removed'} ${act.speciesLabel}).`;
      } else {
        const dirWord = state.shiftDir === 'forward' ? 'CHIỀU THUẬN' : state.shiftDir === 'reverse' ? 'CHIỀU NGHỊCH' : 'không đổi';
        return `Khi ${isAdd ? 'thêm' : 'rút bớt'} ${act.speciesLabel}, hằng số K_C giữ nguyên tuyệt đối (${formatSciNumber(state.kc)}), thương số tức thời Q_C = ${formatSciNumber(act.qcInst)}. Cân bằng dịch chuyển theo ${dirWord} nhằm ${isAdd ? 'làm giảm bớt lượng' : 'bù đắp lại lượng'} ${act.speciesLabel}.`;
      }
    }

    if (act.kind === 'catalyst') {
      return isEn
        ? `Catalyst ${act.enabled ? 'enabled' : 'disabled'}: Catalysts lower activation energy for BOTH forward and reverse pathways equally. Therefore K_C (${formatSciNumber(state.kc)}) and final equilibrium concentrations do NOT change — equilibrium is simply reached ~2.5× faster.`
        : `Đã ${act.enabled ? 'BẬT' : 'TẮT'} chất xúc tác: Xúc tác làm tăng ĐỀU tốc độ phản ứng thuận và tốc độ phản ứng nghịch nên KHÔNG làm dịch chuyển cân bằng; K_C (${formatSciNumber(state.kc)}) và nồng độ cân bằng giữ nguyên 100%, hệ chỉ đạt trạng thái cân bằng nhanh gấp ~2.5 lần.`;
    }

    return '';
  }

  function buildTelemetryHTML(sys) {
    const d = dict();
    let shiftBadgeClass = 'is-none';
    let shiftBadgeText = d.shiftNone;
    if (state.shiftDir === 'forward') {
      shiftBadgeClass = 'is-forward';
      shiftBadgeText = d.shiftForward;
    } else if (state.shiftDir === 'reverse') {
      shiftBadgeClass = 'is-reverse';
      shiftBadgeText = d.shiftReverse;
    }

    const qCompareSym =
      Math.abs(state.qcInst - state.kc) / Math.max(1e-9, state.kc) < 1e-4
        ? 'Q<sub>C</sub> = K<sub>C</sub>'
        : state.qcInst < state.kc
        ? 'Q<sub>C</sub> &lt; K<sub>C</sub>'
        : 'Q<sub>C</sub> &gt; K<sub>C</sub>';

    return `
      <span class="eq-shift-badge ${shiftBadgeClass}">${shiftBadgeText}</span>
      <div class="eq-kq-row">
        <span class="eq-kq-chip">K<sub>C</sub>(${state.tempK}K) = <strong>${formatSciNumber(state.kc)}</strong></span>
        <span class="eq-kq-chip">Q<sub>C</sub> = <strong>${formatSciNumber(state.qcInst)}</strong></span>
        <span class="eq-kq-chip is-cmp">${qCompareSym}</span>
      </div>
    `;
  }

  function buildConcPillsHTML(sys) {
    return sys.species
      .map((sp, idx) => {
        const val = state.currentC[idx];
        return `
          <span class="eq-conc-pill">
            <i class="eq-sp-dot" style="background:${sp.color}"></i>
            <span class="eq-sp-name">[${fmtChemHTML(sp.label)}]</span>
            <strong class="eq-sp-val">${val.toFixed(3)} M</strong>
          </span>
        `;
      })
      .join('');
  }

  // Targeted real-time update during slider dragging (preserves <input type="range"> & particle CSS animation)
  function updateLiveVisuals(syncSpeed = false) {
    if (!hostEl) return;
    const d = dict();
    const sys = findSystem(state.systemId);

    const telemetryHost = hostEl.querySelector('#eq-telemetry-host');
    if (telemetryHost) telemetryHost.innerHTML = buildTelemetryHTML(sys);

    updatePistonSVGInPlace(sys, syncSpeed);

    const concHost = hostEl.querySelector('#eq-conc-pills-host');
    if (concHost) concHost.innerHTML = buildConcPillsHTML(sys);

    const graphHost = hostEl.querySelector('#eq-graph-svg-host');
    if (graphHost) {
      graphHost.innerHTML =
        buildGraphSVG(sys) +
        (state.catalystOn ? `<div class="eq-cat-graph-note">${d.uncatalyzedLegend}</div>` : '');
    }

    const lblTemp = hostEl.querySelector('#eq-lbl-temp');
    if (lblTemp) {
      lblTemp.textContent = `${state.tempK} K (${(state.tempK - 273.15).toFixed(0)} °C)`;
    }

    const lblVol = hostEl.querySelector('#eq-lbl-vol');
    if (lblVol) {
      const relP = ((1.0 / state.volumeL) * (state.tempK / sys.tRef)).toFixed(2);
      lblVol.textContent = `V = ${state.volumeL.toFixed(2)} L (P ≈ ${relP}×)`;
    }

    hostEl.querySelectorAll('[data-eq-sp-role]').forEach((node) => {
      const idx = parseInt(node.dataset.eqSpRole, 10);
      const sp = sys.species[idx];
      if (sp) {
        const roleTag = sp.role === 'reactant' ? d.reactantTag : d.productTag;
        node.textContent = `${roleTag} • ${state.currentC[idx].toFixed(2)}M`;
      }
    });

    const explainBody = hostEl.querySelector('#eq-explain-body');
    if (explainBody) explainBody.innerHTML = fmtChemHTML(buildExplanationText(sys));
  }

  function render() {
    if (!hostEl) return;
    const d = dict();
    const isEn = state.lang === 'en';
    const sys = findSystem(state.systemId);

    const sysChipsHTML = EQUILIBRIUM_SYSTEMS.map((item) => {
      const active = item.id === sys.id ? 'active' : '';
      return `<button type="button" class="lab-preset-chip ${active}" data-eq-sys="${item.id}">${fmtChemHTML(item.chipLabel)}</button>`;
    }).join('');

    const tempC = (state.tempK - 273.15).toFixed(0);
    const relP = ((1.0 / state.volumeL) * (state.tempK / sys.tRef)).toFixed(2);
    const thermoBadge = sys.deltaH < 0 ? `${d.exoTag} • ΔrH° = ${sys.deltaH} kJ` : `${d.endoTag} • ΔrH° = +${sys.deltaH} kJ`;

    const legendHTML = sys.species
      .map(
        (sp) => `
        <span class="eq-leg-item">
          <i class="eq-sp-line" style="background:${sp.color}"></i>
          <span>[${fmtChemHTML(sp.label)}]</span>
        </span>
      `
      )
      .join('');

    const speciesControlsHTML = sys.species
      .map((sp, idx) => {
        const roleTag = sp.role === 'reactant' ? d.reactantTag : d.productTag;
        return `
          <div class="eq-sp-ctrl-row">
            <div class="eq-sp-ctrl-info">
              <i class="eq-sp-dot" style="background:${sp.color}"></i>
              <strong>${fmtChemHTML(sp.label)}</strong>
              <span class="eq-sp-role" data-eq-sp-role="${idx}">${roleTag} • ${state.currentC[idx].toFixed(2)}M</span>
            </div>
            <div class="eq-sp-ctrl-btns">
              <button type="button" class="eq-mini-btn is-add" data-eq-add="${idx}">${d.addBtn}</button>
              <button type="button" class="eq-mini-btn is-rem" data-eq-rem="${idx}">${d.removeBtn}</button>
            </div>
          </div>
        `;
      })
      .join('');

    hostEl.innerHTML = `
      <!-- Top System Bar -->
      <div class="lab-presets-row echem-presets-row">
        <span class="lab-presets-label">${d.sysSelectLabel}</span>
        <div class="lab-presets-list">${sysChipsHTML}</div>
        <button type="button" class="rxn-util-btn eq-reset-btn" id="eq-reset-btn">${d.resetBtn}</button>
      </div>

      <!-- Main Reaction Equation & K_C / Q_C Telemetry Banner -->
      <div class="eq-header-banner">
        <div class="eq-eq-block">
          <div class="eq-eq-formula">${fmtChemHTML(sys.equation)}</div>
          <div class="eq-eq-sub">
            <span class="eq-thermo-pill">${fmtChemHTML(thermoBadge)}</span>
            <span class="eq-hint-pill">${fmtChemHTML(isEn ? sys.visualHintEn : sys.visualHintVi)}</span>
          </div>
        </div>
        <div class="eq-metrics-right" id="eq-telemetry-host">
          ${buildTelemetryHTML(sys)}
        </div>
      </div>

      <!-- Dual SVG Visualization Grid: Left Piston Cylinder + Right C(t) Graph -->
      <div class="eq-visual-grid">
        <div class="eq-visual-card">
          <div class="eq-card-top">
            <span class="echem-eyebrow">${d.pistonPanelTitle}</span>
          </div>
          <div id="eq-piston-svg-host">${buildPistonSVG(sys)}</div>
          <div class="eq-conc-strip">
            <span class="eq-conc-lbl">${d.concListLabel}</span>
            <div class="eq-conc-pills" id="eq-conc-pills-host">${buildConcPillsHTML(sys)}</div>
          </div>
        </div>

        <div class="eq-visual-card">
          <div class="eq-card-top">
            <span class="echem-eyebrow">${d.graphPanelTitle}</span>
            <div class="eq-legend-row">${legendHTML}</div>
          </div>
          <div id="eq-graph-svg-host">
            ${buildGraphSVG(sys)}
            ${
              state.catalystOn
                ? `<div class="eq-cat-graph-note">${d.uncatalyzedLegend}</div>`
                : ''
            }
          </div>
        </div>
      </div>

      <!-- Controls Dashboard -->
      <div class="eq-controls-grid">
        <div class="eq-ctrl-card">
          <div class="echem-slider-top">
            <label for="eq-slider-temp">${d.ctrlTempTitle}</label>
            <strong id="eq-lbl-temp">${state.tempK} K (${tempC} °C)</strong>
          </div>
          <input type="range" id="eq-slider-temp" class="echem-range"
                 min="${sys.tMin}" max="${sys.tMax}" step="${sys.tStep}" value="${state.tempK}" />
          <div class="echem-slider-top eq-sub-slider-top">
            <label for="eq-slider-vol">${d.ctrlVolTitle}</label>
            <strong id="eq-lbl-vol">V = ${state.volumeL.toFixed(2)} L (P ≈ ${relP}×)</strong>
          </div>
          <input type="range" id="eq-slider-vol" class="echem-range"
                 min="0.5" max="2.0" step="0.02" value="${state.volumeL}" />
          <div class="eq-ctrl-hint">${d.ctrlVolHint}</div>
        </div>

        <div class="eq-ctrl-card">
          <div class="echem-slider-top">
            <span>${fmtChemHTML(d.ctrlConcTitle)}</span>
          </div>
          <div class="eq-sp-ctrl-list">
            ${speciesControlsHTML}
          </div>
          <div class="eq-catalyst-row">
            <button type="button" class="eq-cat-toggle ${state.catalystOn ? 'active' : ''}" id="eq-cat-toggle" aria-pressed="${state.catalystOn ? 'true' : 'false'}">
              <span class="eq-cat-dot" aria-hidden="true"></span>
              <span class="eq-cat-lbl">${d.catalystBtn}</span>
            </button>
            <span class="eq-cat-note">${d.catalystNote}</span>
          </div>
        </div>
      </div>

      <!-- Automatic Le Chatelier Explanation Box -->
      <div class="eq-explain-card">
        <span class="echem-eyebrow is-gold">${d.explainEyebrow}</span>
        <p class="eq-explain-body" id="eq-explain-body">${fmtChemHTML(buildExplanationText(sys))}</p>
      </div>
    `;
  }

  function bindEvents() {
    if (!hostEl) return;

    hostEl.addEventListener('click', (e) => {
      const sysBtn = e.target.closest('[data-eq-sys]');
      if (sysBtn) {
        const nextId = sysBtn.dataset.eqSys;
        if (nextId && nextId !== state.systemId) {
          resetSystem(nextId);
          render();
        }
        return;
      }

      if (e.target.closest('#eq-reset-btn')) {
        resetSystem(state.systemId);
        render();
        return;
      }

      const addBtn = e.target.closest('[data-eq-add]');
      if (addBtn) {
        const idx = parseInt(addBtn.dataset.eqAdd, 10);
        if (Number.isInteger(idx)) applySpeciesPerturbation(idx, true);
        return;
      }

      const remBtn = e.target.closest('[data-eq-rem]');
      if (remBtn) {
        const idx = parseInt(remBtn.dataset.eqRem, 10);
        if (Number.isInteger(idx)) applySpeciesPerturbation(idx, false);
        return;
      }

      if (e.target.closest('#eq-cat-toggle')) {
        toggleCatalyst();
      }
    });

    // Real-time continuous updates as the user drags T or V/P sliders
    hostEl.addEventListener('input', (e) => {
      if (e.target.id === 'eq-slider-temp') {
        applyLiveSliderUpdate('temp', Number(e.target.value));
      } else if (e.target.id === 'eq-slider-vol') {
        applyLiveSliderUpdate('vol', Number(e.target.value));
      }
    });

    // Commit and close active drag session when slider drag ends (or keyboard/click step completes)
    hostEl.addEventListener('change', (e) => {
      if (e.target.id === 'eq-slider-temp') {
        applyLiveSliderUpdate('temp', Number(e.target.value));
        state.activeDrag = null;
        updateLiveVisuals(true);
      } else if (e.target.id === 'eq-slider-vol') {
        applyLiveSliderUpdate('vol', Number(e.target.value));
        state.activeDrag = null;
        updateLiveVisuals(false);
      }
    });
  }

  function init(opts = {}) {
    if (opts.getLang) {
      callbacks.getLang = opts.getLang;
    }
    state.lang = callbacks.getLang() || 'vi';
    hostEl = document.getElementById('vlab-panel-equilibrium');
    if (!hostEl) return;

    if (!state.initialized) {
      state.initialized = true;
      resetSystem('no2_n2o4');
      bindEvents();
    }
    render();
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    state.lang = lang;
    if (hostEl) {
      render();
    }
  }

  function getHeaderTexts(lang) {
    const l = lang === 'en' ? 'en' : 'vi';
    const d = EQ_I18N[l];
    return {
      title: d.title,
      subtitle: d.subtitle,
      footerHint: d.footerHint
    };
  }

  window.EquilibriumLab = {
    init,
    setLang,
    getHeaderTexts
  };
})();
