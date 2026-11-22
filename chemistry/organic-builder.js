// Interactive Periodic Table — Molecule Builder (organic-builder.js)
// Tab 3 inside #lab-modal: Build 2D linear, branched, and cyclic organic molecules
// Flat matte vector aesthetic (ChemDraw Dark Mode / One Dark IDE), zoom controls, free drag-and-drop,
// ring-aware layout, and exact canonical graph-isomorphism recognition of 110+ familiar compounds.

(function (global) {
  'use strict';

  const MAX_CARBONS = 12;
  const MIN_ZOOM = 0.45;
  const MAX_ZOOM = 2.5;
  const IDLE_TIDY_MS = 10000;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const SUBSCRIPT_DIGITS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];

  const FALLBACK_MASSES = {
    H: 1.008,
    C: 12.011,
    N: 14.007,
    O: 15.999,
    F: 18.998,
    Cl: 35.45,
    Br: 79.904,
    I: 126.9
  };

  const ELEMENT_VALENCE = {
    C: 4,
    N: 3,
    O: 2,
    F: 1,
    Cl: 1,
    Br: 1,
    I: 1,
    H: 1
  };

  const ATOM_RADIUS = {
    C: 18,
    H: 12,
    O: 17,
    N: 17,
    Cl: 16,
    Br: 16,
    F: 16,
    I: 16
  };

  // Flat Matte Scientific Vector Palette (One Dark / ChemDraw Dark Mode)
  const ATOM_STYLE = {
    C: { fill: '#1c222d', stroke: '#5b677a', text: '#e5e9f0', fontSize: 13.5 },
    H: { fill: '#252c38', stroke: '#6c788c', text: '#cbd5e1', fontSize: 10.5 },
    O: { fill: '#2b1c20', stroke: '#c95d63', text: '#e06c75', fontSize: 13 },
    N: { fill: '#1a2433', stroke: '#528bff', text: '#7aa2f7', fontSize: 13 },
    Cl: { fill: '#1a2923', stroke: '#5ea67c', text: '#7ec699', fontSize: 12 },
    Br: { fill: '#2c2219', stroke: '#b58052', text: '#d19a66', fontSize: 12 },
    F: { fill: '#192a2e', stroke: '#4fa3ad', text: '#56b6c2', fontSize: 12.5 },
    I: { fill: '#271e2e', stroke: '#9b74ad', text: '#c678dd', fontSize: 12.5 }
  };

  const ORG_I18N = {
    vi: {
      footerHint: '',
      connectBtn: 'Nối 2 nguyên tử',
      connectBtnActive: 'Đang nối... (Esc hủy)',
      autoFillH: 'Điền đủ H',
      showHLabel: 'Hiện H',
      hideHLabel: 'Ẩn H',
      undoBtn: 'Hoàn tác',
      deleteBtn: 'Xóa',
      resetBtn: 'Đặt lại (C)',
      zoomInTitle: 'Phóng to',
      zoomOutTitle: 'Thu nhỏ',
      zoomResetTitle: 'Đặt lại thu phóng (100%)',
      searchBtn: 'Tìm chất hữu cơ',
      searchPlaceholder: 'Nhập tên hoặc công thức (C6H12O6, aspirin...)',
      searchFeatured: 'Chất phổ biến gợi ý',
      searchEmpty: 'Không tìm thấy hợp chất phù hợp',
      searchClose: 'Đóng tìm kiếm',
      carbonCount: (n) => `${n}/${MAX_CARBONS}`,
      stageHint:
        'Kéo thả nguyên tử để chỉnh dáng • Cuộn để thu phóng • Shift + Click nguyên tử khác để nối vòng • Bấm liên kết để đổi bậc',
      stageHintConnect1: 'Chế độ nối vòng: Chọn nguyên tử thứ nhất...',
      stageHintConnect2: 'Chọn nguyên tử thứ hai để tạo liên kết khép vòng...',
      mFormula: 'Công thức',
      mMolarMass: 'M =',
      mState: 'Trạng thái',
      mSolubility: 'Độ tan',
      secRealLife: 'Đời sống & Ứng dụng',
      secReactions: 'Đặc trưng hóa học & Nhận biết',
      secNote: 'Đồng phân / Lưu ý',
      chainLabel: (isCyclic, ringCount, topoKey) =>
        isCyclic
          ? `Loại mạch: Mạch vòng (${ringCount} vòng)`
          : topoKey === 'branched'
            ? 'Loại mạch: Mạch hở (có nhánh)'
            : 'Loại mạch: Mạch hở (không nhánh)',
      groupsPrefix: 'Nhóm chức: ',
      noFuncGroups: 'Không có nhóm chức (Hydrocarbon no)',
      heteroNoFuncGroups: 'Hợp chất hữu cơ chứa dị tố',
      funcGroupNames: {
        carboxyl: '-COOH (Carboxylic acid)',
        carbamate: '-O-CO-N- (Carbamate)',
        ester: '-COO- (Ester)',
        amide: '-CONH₂ / -CO-N- (Amide)',
        nitrile: '-C≡N (Nitrile)',
        imine: 'C=N (Imine)',
        nitro: '-NO₂ (Nitro)',
        nitroso: '-O-N=O / -N=O (Nitrite / Nitroso)',
        aldehyde: '-CHO (Aldehyde)',
        ketone: '>C=O (Ketone)',
        phenol: '-OH gắn vòng thơm (Phenol)',
        alcohol: '-OH (Alcohol)',
        peroxide: '-O-O- / -O-OH (Peroxide)',
        oxyamine: '-O-NH₂ / -O-N- (Alkoxyamine / Hydroxylamine)',
        ether: '-O- (Ether)',
        hydrazine: '-NH-NH₂ / -N-N- (Hydrazine)',
        amine: '-NH₂ / Amine',
        hypohalite: '-O-X (Hypohalite)',
        halogen: '-X (Halogen derivative)',
        arene: 'Vòng thơm (Arene)',
        alkene: 'Liên kết đôi C=C (Alkene)',
        alkyne: 'Liên kết ba C≡C (Alkyne)'
      },
      incompleteTitle: 'Chưa hoàn thiện phân tử',
      incompleteTag: (n) => `Thiếu ${n} liên kết`,
      incompleteDesc: (n) =>
        `Còn thiếu ${n} liên kết để đạt hóa trị bão hòa — hãy gắn thêm nguyên tử, bấm chấm trống hoặc bấm "Điền đủ H" để nhận diện chất.`,
      incompleteValence: (n) =>
        `Còn thiếu ${n} liên kết để đủ hóa trị — bấm chấm trống, + H hoặc Điền đủ H.`,
      customNote: 'Phân tử tự tạo — chưa có trong từ điển hợp chất phổ biến.',
      autoIupacNote: 'Tên hệ thống tự động · IUPAC — phân tử tự tạo chưa có hồ sơ chi tiết trong từ điển.',
      slotTooltip: 'Bấm để gắn 1 nguyên tử H',
      bondTooltip: (ord) => {
        const names = { 1: 'Liên kết đơn (–)', 2: 'Liên kết đôi (=)', 3: 'Liên kết ba (≡)' };
        return `${names[ord] || 'Liên kết'} — Bấm để chọn / đổi bậc`;
      },
      atomTooltip: (el, usedVal, maxVal, collapsedH) =>
        `${el} (${usedVal}/${maxVal} hóa trị)${collapsedH > 0 ? ' — Nhấp đúp để tách H' : ''}`,
      topology: {
        cyclic: 'mạch vòng',
        branched: 'mạch nhánh',
        linear: 'mạch thẳng'
      },
      categories: {
        arene: 'Arene',
        aromatic: 'Arene',
        cycloalkane: 'Cycloalkane',
        cycloalkene: 'Cycloalkene',
        heterocycle: 'Heterocycle',
        hydrocarbon: 'Hydrocarbon',
        alkane: 'Alkane',
        alkene: 'Alkene',
        alkyne: 'Alkyne',
        alkadiene: 'Alkadiene',
        alcohol: 'Alcohol',
        phenol: 'Phenol',
        ether: 'Ether',
        aldehyde: 'Aldehyde',
        ketone: 'Ketone',
        carboxylic: 'Carboxylic acid',
        ester: 'Ester',
        carbamate: 'Carbamate',
        anhydride: 'Acid anhydride',
        carbohydrate: 'Carbohydrate',
        aminoacid: 'Amino acid',
        aminoalcohol: 'Amino alcohol (Tạp chức)',
        amine: 'Amine',
        amide: 'Amide',
        peroxide: 'Peroxide',
        oxyamine: 'Alkoxyamine / Hydroxylamine',
        nitrile: 'Nitrile',
        imine: 'Imine',
        nitro: 'Hợp chất Nitro',
        nitroso: 'Nitrite / Nitroso',
        halogen: 'Halogen derivative',
        pharma: 'Dược chất hữu cơ',
        custom: 'Hợp chất hữu cơ'
      },
      customTitle: (formula, topoLabel, famLabel, isCyclic) =>
        isCyclic
          ? `${formula} · Hợp chất ${topoLabel} (${famLabel})`
          : `${formula} · ${famLabel} ${topoLabel}`,
      toasts: {
        selectHeavy: 'Hãy chọn một nguyên tử còn hóa trị trống (C, O hoặc N) trước.',
        selectCarbon: 'Hãy chọn một nguyên tử Carbon (C) để gắn liên kết đôi =O.',
        maxCarbons: `Tối đa ${MAX_CARBONS} nguyên tử Carbon trong một phân tử.`,
        valenceFull: (need, hasH) =>
          hasH
            ? `Nguyên tử đã đủ hóa trị (cần ${need} liên kết trống). Xóa bớt H nếu muốn thay thế.`
            : `Nguyên tử đã đạt tối đa hóa trị (cần ${need} liên kết trống).`,
        doubleOExists: 'Nguyên tử C này đã có liên kết đôi =O.',
        alreadyCarboxyl: 'Nguyên tử C này đã là nhóm -COOH.',
        geminalOh: 'Không gắn 2 nhóm -OH trên cùng 1 nguyên tử C.',
        alreadyFullH: 'Tất cả nguyên tử đã đủ hóa trị.',
        cannotDeleteLast: 'Không thể xóa nguyên tử cuối cùng của phân tử.',
        cannotSplit: 'Không thể xóa vì sẽ làm phân tử đứt thành 2 mảnh rời.',
        sameAtom: 'Hãy chọn một nguyên tử khác để nối liên kết.',
        bondExists: 'Hai nguyên tử này đã có liên kết với nhau.',
        cannotBondH: 'Không thể dùng nguyên tử H để nối khép vòng.',
        connectValenceBlocked: 'Một trong hai nguyên tử đã hết hóa trị để tạo thêm liên kết.',
        bondOrderBlocked: 'Không thể nâng bậc liên kết vì nguyên tử đã hết hóa trị.',
        bondWrapSingle: 'Đã chuyển về liên kết đơn (–) do không đủ hóa trị cho liên kết ba (≡).'
      }
    },
    en: {
      footerHint: '',
      connectBtn: 'Connect 2 atoms',
      connectBtnActive: 'Connecting... (Esc cancel)',
      autoFillH: 'Auto-fill H',
      showHLabel: 'Show H',
      hideHLabel: 'Hide H',
      undoBtn: 'Undo',
      deleteBtn: 'Delete',
      resetBtn: 'Reset (C)',
      zoomInTitle: 'Zoom in',
      zoomOutTitle: 'Zoom out',
      zoomResetTitle: 'Reset zoom (100%)',
      searchBtn: 'Search compound',
      searchPlaceholder: 'Name or formula (C6H12O6, aspirin...)',
      searchFeatured: 'Popular compounds',
      searchEmpty: 'No matching compounds found',
      searchClose: 'Close search',
      carbonCount: (n) => `${n}/${MAX_CARBONS}`,
      stageHint:
        'Drag atoms freely • Scroll to zoom • Shift + Click another atom to close a ring • Click bonds to cycle order',
      stageHintConnect1: 'Connect mode: Click the first atom...',
      stageHintConnect2: 'Click the second atom to form a ring bond...',
      mFormula: 'Formula',
      mMolarMass: 'M =',
      mState: 'State',
      mSolubility: 'Solubility',
      secRealLife: 'Real-life & Applications',
      secReactions: 'Chemical Properties & Tests',
      secNote: 'Isomers / Note',
      chainLabel: (isCyclic, ringCount, topoKey) =>
        isCyclic
          ? `Chain: Cyclic (${ringCount} ring${ringCount > 1 ? 's' : ''})`
          : topoKey === 'branched'
            ? 'Chain: Open-chain (branched)'
            : 'Chain: Open-chain (linear)',
      groupsPrefix: 'Functional groups: ',
      noFuncGroups: 'None (Saturated hydrocarbon)',
      heteroNoFuncGroups: 'Heteroatom organic compound',
      funcGroupNames: {
        carboxyl: '-COOH (Carboxylic acid)',
        carbamate: '-O-CO-N- (Carbamate)',
        ester: '-COO- (Ester)',
        amide: '-CONH₂ / -CO-N- (Amide)',
        nitrile: '-C≡N (Nitrile)',
        imine: 'C=N (Imine)',
        nitro: '-NO₂ (Nitro)',
        nitroso: '-O-N=O / -N=O (Nitrite / Nitroso)',
        aldehyde: '-CHO (Aldehyde)',
        ketone: '>C=O (Ketone)',
        phenol: '-OH on aromatic ring (Phenol)',
        alcohol: '-OH (Alcohol)',
        peroxide: '-O-O- / -O-OH (Peroxide)',
        oxyamine: '-O-NH₂ / -O-N- (Alkoxyamine / Hydroxylamine)',
        ether: '-O- (Ether)',
        hydrazine: '-NH-NH₂ / -N-N- (Hydrazine)',
        amine: '-NH₂ / Amine',
        hypohalite: '-O-X (Hypohalite)',
        halogen: '-X (Halogen derivative)',
        arene: 'Aromatic ring (Arene)',
        alkene: 'C=C double bond (Alkene)',
        alkyne: 'C≡C triple bond (Alkyne)'
      },
      incompleteTitle: 'Incomplete molecule',
      incompleteTag: (n) => `${n} bond${n > 1 ? 's' : ''} needed`,
      incompleteDesc: (n) =>
        `${n} open valence bond${n > 1 ? 's' : ''} remaining — attach atoms, click a dot, or use Auto-fill H to identify the compound.`,
      incompleteValence: (n) =>
        `${n} open valence bond${n > 1 ? 's' : ''} remaining — click a dot, + H, or Auto-fill H.`,
      customNote: 'Custom molecule — not in the common compounds dictionary.',
      autoIupacNote: 'Auto-generated systematic name · IUPAC — custom molecule not in the detailed dictionary.',
      slotTooltip: 'Click to attach 1 H atom',
      bondTooltip: (ord) => {
        const names = { 1: 'Single bond (–)', 2: 'Double bond (=)', 3: 'Triple bond (≡)' };
        return `${names[ord] || 'Bond'} — Click to select / cycle order`;
      },
      atomTooltip: (el, usedVal, maxVal, collapsedH) =>
        `${el} (${usedVal}/${maxVal} valence)${collapsedH > 0 ? ' — Double-click to expand H' : ''}`,
      topology: {
        cyclic: 'Cyclic',
        branched: 'Branched',
        linear: 'Linear'
      },
      categories: {
        arene: 'Arene',
        aromatic: 'Arene',
        cycloalkane: 'Cycloalkane',
        cycloalkene: 'Cycloalkene',
        heterocycle: 'Heterocycle',
        hydrocarbon: 'Hydrocarbon',
        alkane: 'Alkane',
        alkene: 'Alkene',
        alkyne: 'Alkyne',
        alkadiene: 'Alkadiene',
        alcohol: 'Alcohol',
        phenol: 'Phenol',
        ether: 'Ether',
        aldehyde: 'Aldehyde',
        ketone: 'Ketone',
        carboxylic: 'Carboxylic acid',
        ester: 'Ester',
        carbamate: 'Carbamate',
        anhydride: 'Acid anhydride',
        carbohydrate: 'Carbohydrate',
        aminoacid: 'Amino acid',
        aminoalcohol: 'Amino alcohol',
        amine: 'Amine',
        amide: 'Amide',
        peroxide: 'Peroxide',
        oxyamine: 'Alkoxyamine / Hydroxylamine',
        nitrile: 'Nitrile',
        imine: 'Imine',
        nitro: 'Nitro compound',
        nitroso: 'Nitrite / Nitroso',
        halogen: 'Halogen derivative',
        pharma: 'Pharmaceutical',
        custom: 'Organic compound'
      },
      customTitle: (formula, topoLabel, famLabel) =>
        `${formula} · ${topoLabel} ${famLabel}`,
      toasts: {
        selectHeavy: 'Select an atom with open valence (C, O, or N) first.',
        selectCarbon: 'Select a Carbon (C) atom to attach a =O double bond.',
        maxCarbons: `Maximum ${MAX_CARBONS} Carbon atoms per molecule.`,
        valenceFull: (need, hasH) =>
          hasH
            ? `Atom has no free valence (needs ${need}). Delete an H atom first to replace it.`
            : `Atom has reached maximum valence (needs ${need} open bond${need > 1 ? 's' : ''}).`,
        doubleOExists: 'This Carbon already has a =O double bond.',
        alreadyCarboxyl: 'This Carbon is already a -COOH group.',
        geminalOh: 'Cannot attach two -OH groups to the same Carbon.',
        alreadyFullH: 'All atoms already have complete valence.',
        cannotDeleteLast: 'Cannot delete the only remaining atom.',
        cannotSplit: 'Cannot delete: doing so would split the molecule into disconnected fragments.',
        sameAtom: 'Pick a different atom to connect.',
        bondExists: 'These two atoms are already bonded.',
        cannotBondH: 'Cannot use a Hydrogen atom to close a ring.',
        connectValenceBlocked: 'One of the selected atoms has no free valence for another bond.',
        bondOrderBlocked: 'Cannot increase bond order: atom valence limit reached.',
        bondWrapSingle: 'Cycled back to single bond (–): insufficient valence for a triple bond (≡).'
      }
    }
  };

  // =========================================================================
  // PURE UTILITIES & GRAPH PRIMITIVES
  // =========================================================================

  function toSubscript(num) {
    return String(num)
      .split('')
      .map((ch) => (ch >= '0' && ch <= '9' ? SUBSCRIPT_DIGITS[Number(ch)] : ch))
      .join('');
  }

  function toSubscriptHTML(text) {
    return String(text).replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (m) => {
      const ascii = m
        .split('')
        .map((c) => SUBSCRIPT_DIGITS.indexOf(c))
        .join('');
      return `<sub>${ascii}</sub>`;
    });
  }

  function formatChemTextHTML(text) {
    const escaped = String(text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return toSubscriptHTML(escaped);
  }

  function getAtomicMass(sym) {
    if (typeof window !== 'undefined' && Array.isArray(window.ELEMENTS)) {
      const found = window.ELEMENTS.find((e) => e.symbol === sym);
      if (found && typeof found.mass === 'number') return found.mass;
    }
    return FALLBACK_MASSES[sym] || 0;
  }

  function canonicalBondKey(u, v) {
    return u < v ? `${u}::${v}` : `${v}::${u}`;
  }

  function normalizeAngle(rad) {
    let a = rad;
    while (a <= -Math.PI) a += 2 * Math.PI;
    while (a > Math.PI) a -= 2 * Math.PI;
    return a;
  }

  function cloneGraph(graph) {
    return {
      atoms: graph.atoms.map((a) => ({ id: a.id, element: a.element })),
      bonds: graph.bonds.map((b) => ({ from: b.from, to: b.to, order: b.order }))
    };
  }

  function buildAdjacency(graph) {
    const atomMap = new Map();
    const adj = new Map();
    (graph.atoms || []).forEach((a) => {
      atomMap.set(a.id, a);
      adj.set(a.id, []);
    });
    (graph.bonds || []).forEach((b, idx) => {
      const u = b.from ?? b.a ?? b.source;
      const v = b.to ?? b.b ?? b.target;
      const order = Number(b.order || 1);
      if (!atomMap.has(u) || !atomMap.has(v)) return;
      adj.get(u).push({ to: v, order, bondIdx: idx });
      adj.get(v).push({ to: u, order, bondIdx: idx });
    });
    return { atomMap, adj };
  }

  function getBondSum(adj, id) {
    const list = adj.get(id) || [];
    let s = 0;
    for (let i = 0; i < list.length; i++) s += list[i].order;
    return s;
  }

  function getHeavyBondSum(atomMap, adj, id) {
    const list = adj.get(id) || [];
    let s = 0;
    for (let i = 0; i < list.length; i++) {
      const nb = atomMap.get(list[i].to);
      if (nb && nb.element !== 'H') s += list[i].order;
    }
    return s;
  }

  function isNitroNitrogen(atomMap, adj, id) {
    const atom = atomMap.get(id);
    if (!atom || atom.element !== 'N') return false;
    const nbs = adj.get(id) || [];
    let dblOCount = 0;
    let otherHeavySum = 0;
    let hCount = 0;
    for (let i = 0; i < nbs.length; i++) {
      const nb = atomMap.get(nbs[i].to);
      if (!nb) continue;
      if (nb.element === 'H') {
        hCount += nbs[i].order;
      } else if (nb.element === 'O' && nbs[i].order === 2) {
        dblOCount += 1;
      } else {
        otherHeavySum += nbs[i].order;
      }
    }
    return dblOCount === 2 && hCount === 0 && otherHeavySum <= 1;
  }

  function getEffectiveMaxValence(atomMap, adj, id) {
    const atom = atomMap.get(id);
    if (!atom) return 0;
    if (isNitroNitrogen(atomMap, adj, id)) return 5;
    return ELEMENT_VALENCE[atom.element] || 0;
  }

  function getMissingValence(atomMap, adj, id) {
    const atom = atomMap.get(id);
    if (!atom) return 0;
    const maxVal = getEffectiveMaxValence(atomMap, adj, id);
    return Math.max(0, maxVal - getBondSum(adj, id));
  }

  function isConnectedGraph(atoms, bonds) {
    if (atoms.length <= 1) return true;
    const adj = new Map();
    atoms.forEach((a) => adj.set(a.id, []));
    bonds.forEach((b) => {
      if (adj.has(b.from) && adj.has(b.to)) {
        adj.get(b.from).push(b.to);
        adj.get(b.to).push(b.from);
      }
    });
    const visited = new Set([atoms[0].id]);
    const queue = [atoms[0].id];
    while (queue.length) {
      const u = queue.shift();
      const nbs = adj.get(u) || [];
      for (let i = 0; i < nbs.length; i++) {
        if (!visited.has(nbs[i])) {
          visited.add(nbs[i]);
          queue.push(nbs[i]);
        }
      }
    }
    return visited.size === atoms.length;
  }

  // =========================================================================
  // EXACT HEAVY-ATOM GRAPH ISOMORPHISM MATCHER (Cyclic + Aromatic + Acyclic)
  // =========================================================================

  // Extract heavy-atom graph (strip H) and normalize 6-membered alternating Kekulé rings (C / N) to order 1.5
  function buildNormalizedHeavyGraph(graph) {
    const heavyAtoms = [];
    const idToIdx = new Map();
    (graph.atoms || []).forEach((a) => {
      if (a.element !== 'H') {
        idToIdx.set(a.id, heavyAtoms.length);
        heavyAtoms.push(a.element);
      }
    });

    const n = heavyAtoms.length;
    const adj = Array.from({ length: n }, () => []);
    const edges = [];

    (graph.bonds || []).forEach((b) => {
      const uId = b.from ?? b.a ?? b.source;
      const vId = b.to ?? b.b ?? b.target;
      const u = idToIdx.get(uId);
      const v = idToIdx.get(vId);
      if (u === undefined || v === undefined || u === v) return;
      const order = Number(b.order || 1);
      const eIdx = edges.length;
      edges.push({ u, v, order });
      adj[u].push({ to: v, eIdx });
      adj[v].push({ to: u, eIdx });
    });

    // Normalize alternating Kekulé aromatic rings:
    // - 6-membered rings (benzene, pyridine, phenyl derivatives, symmetric naphthalene)
    // - 10-membered fused bicyclic perimeters (asymmetric naphthalene and 5+7 azulene systems)
    if (n >= 6) {
      const aromaticEdgeFlags = new Uint8Array(edges.length);
      const isAromEl = (el) => el === 'C' || el === 'N';
      let aromCandDbl = 0;
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].order === 2 && isAromEl(heavyAtoms[edges[i].u]) && isAromEl(heavyAtoms[edges[i].v])) {
          aromCandDbl++;
        }
      }
      const allow6Cycle = aromCandDbl >= 3;
      const allow10Cycle = n >= 10 && edges.length >= 10 && aromCandDbl >= 5;
      if (allow6Cycle) {
        for (let start = 0; start < n; start++) {
          if (!isAromEl(heavyAtoms[start])) continue;
          const path = [start];
          const edgePath = [];
          const visited = new Uint8Array(n);
          visited[start] = 1;

          const dfsArom = (curr, prevOrder) => {
            const depth = path.length;
            const nbs = adj[curr];
            for (let i = 0; i < nbs.length; i++) {
              const { to, eIdx } = nbs[i];
              const ord = edges[eIdx].order;
              if (ord !== 1 && ord !== 2) continue;
              if (prevOrder !== 0 && ord === prevOrder) continue;
              if (depth === 6 || (allow10Cycle && depth === 10)) {
                if (to === start && ord !== edges[edgePath[0]].order) {
                  for (let k = 0; k < edgePath.length; k++) aromaticEdgeFlags[edgePath[k]] = 1;
                  aromaticEdgeFlags[eIdx] = 1;
                }
                if (depth === 10 || !allow10Cycle) continue;
              }
              if (depth >= (allow10Cycle ? 10 : 6)) continue;
              if (to <= start || visited[to] || !isAromEl(heavyAtoms[to])) continue;
              visited[to] = 1;
              path.push(to);
              edgePath.push(eIdx);
              dfsArom(to, ord);
              edgePath.pop();
              path.pop();
              visited[to] = 0;
            }
          };
          dfsArom(start, 0);
        }

        for (let i = 0; i < edges.length; i++) {
          if (aromaticEdgeFlags[i]) edges[i].order = 1.5;
        }
      }
    }

    const adjMatrix = Array.from({ length: n }, () => new Map());
    const adjList = Array.from({ length: n }, () => []);
    edges.forEach((e) => {
      adjMatrix[e.u].set(e.v, e.order);
      adjMatrix[e.v].set(e.u, e.order);
      adjList[e.u].push({ to: e.v, order: e.order });
      adjList[e.v].push({ to: e.u, order: e.order });
    });

    const elemCounts = {};
    heavyAtoms.forEach((el) => {
      elemCounts[el] = (elemCounts[el] || 0) + 1;
    });

    return {
      n,
      edgeCount: edges.length,
      elements: heavyAtoms,
      adjList,
      adjMatrix,
      elemCounts,
      hasAromatic: edges.some((e) => e.order === 1.5)
    };
  }

  function areHeavyGraphsIsomorphic(gA, gB) {
    if (gA.n !== gB.n || gA.edgeCount !== gB.edgeCount) return false;
    if (gA.n === 0) return true;
    const keysA = Object.keys(gA.elemCounts);
    const keysB = Object.keys(gB.elemCounts);
    if (keysA.length !== keysB.length) return false;
    for (let i = 0; i < keysA.length; i++) {
      if (gA.elemCounts[keysA[i]] !== gB.elemCounts[keysA[i]]) return false;
    }

    const labelA = gA.elements.map(
      (el, i) => `${el}:${gA.adjList[i].map((e) => e.order).sort().join(',')}`
    );
    const labelB = gB.elements.map(
      (el, i) => `${el}:${gB.adjList[i].map((e) => e.order).sort().join(',')}`
    );

    const bucketsB = new Map();
    for (let i = 0; i < gB.n; i++) {
      const lb = labelB[i];
      if (!bucketsB.has(lb)) bucketsB.set(lb, []);
      bucketsB.get(lb).push(i);
    }

    const candidates = new Array(gA.n);
    for (let i = 0; i < gA.n; i++) {
      const list = bucketsB.get(labelA[i]);
      if (!list || list.length === 0) return false;
      candidates[i] = list;
    }

    const orderA = Array.from({ length: gA.n }, (_, i) => i).sort((a, b) => {
      if (candidates[a].length !== candidates[b].length) {
        return candidates[a].length - candidates[b].length;
      }
      return gA.adjList[b].length - gA.adjList[a].length;
    });

    const mapAtoB = new Int32Array(gA.n).fill(-1);
    const usedB = new Uint8Array(gB.n);

    function backtrack(step) {
      if (step === gA.n) return true;
      const u = orderA[step];
      const cands = candidates[u];
      const nbsA = gA.adjList[u];

      for (let i = 0; i < cands.length; i++) {
        const v = cands[i];
        if (usedB[v]) continue;

        let ok = true;
        for (let k = 0; k < nbsA.length; k++) {
          const nbU = nbsA[k].to;
          const mappedNb = mapAtoB[nbU];
          if (mappedNb !== -1) {
            if (gB.adjMatrix[v].get(mappedNb) !== nbsA[k].order) {
              ok = false;
              break;
            }
          }
        }
        if (!ok) continue;

        mapAtoB[u] = v;
        usedB[v] = 1;
        if (backtrack(step + 1)) return true;
        usedB[v] = 0;
        mapAtoB[u] = -1;
      }
      return false;
    }

    return backtrack(0);
  }

  // =========================================================================
  // ENRICHED DICTIONARY LOADER (Reads window.ORGANIC_COMPOUNDS from organic-data.js)
  // =========================================================================

  function buildKnownMolecules(rawList) {
    if (!Array.isArray(rawList)) return [];
    return rawList.map((item) => {
      const els = item.elements || [];
      const bds = item.bonds || [];
      const graph = {
        atoms: els.map((el, i) => ({ id: `r${i}`, element: el })),
        bonds: bds.map(([u, v, ord]) => ({ from: `r${u}`, to: `r${v}`, order: ord || 1 }))
      };
      return {
        ...item,
        norm: buildNormalizedHeavyGraph(graph)
      };
    });
  }

  let KNOWN_MOLECULES = buildKnownMolecules(global.ORGANIC_COMPOUNDS);

  // =========================================================================
  // SMART SEARCH INDEX & RANKING ENGINE
  // =========================================================================

  const FEATURED_COMPOUND_IDS = [
    'glucose-ring',
    'benzene',
    'ethanol',
    'acetic-acid',
    'aspirin',
    'dopamine',
    'vitamin-c',
    'naphthalene'
  ];

  function normalizeSearchText(str) {
    let s = String(str ?? '');
    for (let i = 0; i < 10; i++) {
      s = s.split(SUBSCRIPT_DIGITS[i]).join(String(i));
    }
    return s
      .replace(/[đĐ]/g, 'd')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeSearchRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function computeHeavyEntryFormula(item) {
    const els = item.elements || [];
    const bds = item.bonds || [];
    const deg = new Array(els.length).fill(0);
    const dblO = new Array(els.length).fill(0);
    for (let i = 0; i < bds.length; i++) {
      const u = bds[i][0];
      const v = bds[i][1];
      const o = Number(bds[i][2] || 1);
      deg[u] += o;
      deg[v] += o;
      if (o === 2) {
        if (els[u] === 'N' && els[v] === 'O') dblO[u]++;
        if (els[v] === 'N' && els[u] === 'O') dblO[v]++;
      }
    }
    const counts = { C: 0, H: 0, Br: 0, Cl: 0, F: 0, I: 0, N: 0, O: 0 };
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (counts[el] !== undefined) counts[el]++;
      const isNitroN = el === 'N' && dblO[i] === 2;
      const miss = isNitroN ? 0 : Math.max(0, (ELEMENT_VALENCE[el] || 4) - deg[i]);
      counts.H += miss;
    }
    const order = ['C', 'H', 'Br', 'Cl', 'F', 'I', 'N', 'O'];
    const formulaAscii = order
      .filter((el) => counts[el] > 0)
      .map((el) => el + (counts[el] > 1 ? String(counts[el]) : ''))
      .join('');
    return {
      counts,
      formulaUnicode: formatCountsFormula(counts),
      formulaAscii,
      formulaLower: formulaAscii.toLowerCase()
    };
  }

  function tryStructuralFormulaToHill(rawNormalized) {
    const compact = rawNormalized.replace(/[\s\-=≡·•]+/g, '');
    if (!compact || !/^[a-z0-9()]+$/.test(compact)) return null;
    const knownDigitless = compact === 'hcho' || compact === 'hcooh' || compact === 'hcn';
    if (!/\d/.test(compact) && !knownDigitless) return null;

    let pos = 0;
    function parseSeq(inParen) {
      const m = {};
      while (pos < compact.length) {
        const ch = compact[pos];
        if (ch === ')') {
          if (!inParen) return null;
          pos++;
          return m;
        }
        if (ch === '(') {
          pos++;
          const inner = parseSeq(true);
          if (!inner) return null;
          const dm = compact.slice(pos).match(/^\d+/);
          const mult = dm ? (pos += dm[0].length, parseInt(dm[0], 10)) : 1;
          Object.keys(inner).forEach((k) => {
            m[k] = (m[k] || 0) + inner[k] * mult;
          });
          continue;
        }
        let el = null;
        if (compact.startsWith('cl', pos)) {
          el = 'Cl';
          pos += 2;
        } else if (compact.startsWith('br', pos)) {
          el = 'Br';
          pos += 2;
        } else if ('chonfi'.includes(ch)) {
          el = ch.toUpperCase();
          pos += 1;
        } else {
          return null;
        }
        const dm = compact.slice(pos).match(/^\d+/);
        const cnt = dm ? (pos += dm[0].length, parseInt(dm[0], 10)) : 1;
        m[el] = (m[el] || 0) + cnt;
      }
      return inParen ? null : m;
    }

    const total = parseSeq(false);
    if (!total || pos !== compact.length) return null;
    const order = ['C', 'H', 'Br', 'Cl', 'F', 'I', 'N', 'O'];
    const out = order
      .filter((el) => (total[el] || 0) > 0)
      .map((el) => el.toLowerCase() + (total[el] > 1 ? String(total[el]) : ''))
      .join('');
    return out || null;
  }

  function getFormulaHintBoost(q, catKey) {
    const compact = q.replace(/[\s\-=≡·•]+/g, '');
    if (!compact || !/^[a-z0-9()]+$/.test(compact)) return 0;
    let boost = 0;
    const hasCOOH = compact.includes('cooh') || compact.includes('hooc');
    const hasCOO = !hasCOOH && /coo(?!h)/.test(compact);
    if (hasCOOH) {
      if (catKey === 'carboxylic' || catKey === 'aminoacid') boost += 80;
    } else if (hasCOO) {
      if (catKey === 'ester' || catKey === 'carbamate') boost += 80;
    }
    if (!hasCOOH && compact.includes('cho')) {
      if (catKey === 'aldehyde') boost += 75;
    }
    if (compact.includes('nh2') || compact.includes('h2n')) {
      if (
        catKey === 'amine' ||
        catKey === 'aminoacid' ||
        catKey === 'amide' ||
        catKey === 'aminoalcohol' ||
        catKey === 'oxyamine'
      ) {
        boost += 65;
      }
    }
    if (compact.includes('no2') || compact.includes('o2n')) {
      if (catKey === 'nitro') boost += 80;
    }
    if (!hasCOOH) {
      const withoutCho = compact.replace(/cho/g, '');
      if (withoutCho.includes('oh') || withoutCho.includes('ho')) {
        if (
          catKey === 'alcohol' ||
          catKey === 'phenol' ||
          catKey === 'aminoalcohol' ||
          catKey === 'carbohydrate'
        ) {
          boost += 70;
        }
      }
    }
    if (!hasCOOH && !hasCOO && (/\)\d*co$/.test(compact) || /coch\d/.test(compact))) {
      if (catKey === 'ketone') boost += 70;
    }
    return boost;
  }

  function matchesFormulaBoundaryPrefix(formulaLower, qCompact) {
    if (!qCompact || !formulaLower.startsWith(qCompact)) return false;
    if (formulaLower.length === qCompact.length) return true;
    const lastQ = qCompact[qCompact.length - 1];
    const nextF = formulaLower[qCompact.length];
    if (lastQ >= '0' && lastQ <= '9') {
      return nextF < '0' || nextF > '9';
    }
    return qCompact.length >= 2 || nextF !== 'l';
  }

  // Search-only hidden aliases for legacy transliterations and everyday keywords (do NOT alter GDPT 2018 UI names)
  const SEARCH_ALIASES = {
    // Legacy transliterations
    metan: 'methane',
    etan: 'ethane',
    propan: 'propane',
    butan: 'butane',
    pentane: 'pentane',
    etilen: 'ethylene',
    propilen: 'propylene',
    butadien: 'butadiene',
    isopren: 'isoprene',
    axetilen: 'acetylene',
    propin: 'propyne',
    benzen: 'benzene',
    toluen: 'toluene',
    stiren: 'styrene',
    xilen: ['p-xylene', 'o-xylene', 'm-xylene'],
    cumen: 'cumene',
    naftalen: 'naphthalene',
    'ancol etylic': 'ethanol',
    'ruou etylic': 'ethanol',
    con: 'ethanol',
    'ancol metylic': 'methanol',
    'ancol anlylic': 'allyl-alcohol',
    'ancol benzylic': 'benzyl-alcohol',
    'etilen glicol': 'ethylene-glycol',
    glixerol: 'glycerol',
    glixerin: 'glycerol',
    'axit fomic': 'formic-acid',
    'axit axetic': 'acetic-acid',
    'axit propionic': 'propionic-acid',
    'axit butiric': 'butyric-acid',
    'axit acrylic': 'acrylic-acid',
    'axit metacrylic': 'methacrylic-acid',
    'axit oxalic': 'oxalic-acid',
    'axit malonic': 'malonic-acid',
    'axit suxinic': 'succinic-acid',
    'axit adipic': 'adipic-acid',
    'axit benzoic': 'benzoic-acid',
    'axit salicylic': 'salicylic-acid',
    'axit terephtalic': 'terephthalic-acid',
    'axit picric': 'picric-acid',
    'axit glutamic': 'glutamic-acid',
    'axit oleic': 'glutamic-acid',
    'axit lactic': 'lactic-acid',
    'axit citric': 'citric-acid',
    'axit malic': 'malic-acid',
    'axit tartaric': 'tartaric-acid',
    axeton: 'acetone',
    'andehit fomic': 'formaldehyde',
    fomon: 'formaldehyde',
    fomalin: 'formaldehyde',
    'andehit axetic': 'acetaldehyde',
    'andehit benzoic': 'benzaldehyde',
    'andehit acrylic': 'acrolein',
    glucozo: ['glucose-ring', 'glucose-open', 'glucose-furanose'],
    'duong nho': ['glucose-ring', 'glucose-open', 'glucose-furanose'],
    fructozo: ['fructose-furanose', 'fructose-pyranose', 'fructose-open'],
    'duong qua': ['fructose-furanose', 'fructose-pyranose', 'fructose-open'],
    saccarozo: 'sucrose',
    'duong mia': 'sucrose',
    mantozo: 'maltose',
    'duong mach nha': 'maltose',
    anilin: 'aniline',
    metylamin: 'methylamine',
    etylamin: 'ethylamine',
    dimetylamin: 'dimethylamine',
    trimetylamin: 'trimethylamine',
    ure: 'urea',
    glyxin: 'glycine',
    alanin: 'alanine',
    valin: 'valine',
    lysin: 'lysine',
    'etyl axetat': 'ethyl-acetate',
    'metyl axetat': 'methyl-acetate',
    'metyl fomat': 'methyl-formate',
    'vinyl axetat': 'vinyl-acetate',
    'isoamyl axetat': 'isoamyl-acetate',
    'vinyl clorua': 'vinyl-chloride',
    clorobenzen: 'chlorobenzene',
    bromobenzen: 'bromobenzene',
    clorofom: 'chloroform',
    cloropren: 'chloroprene',
    'cloral hidrat': 'chloral-hydrate',
    'propane-1,2-diol': 'propylene-glycol',
    'propan-1,2-diol': 'propylene-glycol',
    'tert-butyl chloride': '2-chloro-2-methylpropane',
    // Everyday life keywords
    'bot ngot': 'glutamic-acid',
    'mi chinh': 'glutamic-acid',
    giam: 'acetic-acid',
    'giam an': 'acetic-acid',
    'noc kien': 'formic-acid',
    'tay son mong tay': 'acetone',
    'dau chuoi': 'isoamyl-acetate',
    'dau gio': ['methyl-salicylate', 'menthol'],
    salonpas: 'methyl-salicylate',
    'keo sua': 'vinyl-acetate',
    'bang phien': 'naphthalene',
    'long nao': 'naphthalene',
    'thuoc no': ['tnt', 'nitroglycerin', 'picric-acid'],
    'hormone hanh phuc': 'dopamine',
    'chim canh cut': 'penguinone',
    'kim cuong': 'adamantane',
    'ca phe': 'caffeine',
    'thuoc la': 'nicotine',
    chanh: 'citric-acid',
    'sua chua': 'lactic-acid',
    'vo que': 'cinnamaldehyde',
    'tao xanh': 'malic-acid',
    nho: ['tartaric-acid', 'glucose-ring'],
    'ruou vang': 'tartaric-acid'
  };

  const SEARCH_CATEGORY_TAGS = {
    carbohydrate: 'duong sugar ngot',
    alcohol: 'ruou con',
    ketone: 'ketone dung moi'
  };

  const SEARCH_COMPOUND_TAGS = {
    'glucose-ring': 'duong nho mat ong blood sugar',
    'glucose-open': 'duong nho duong',
    'glucose-furanose': 'duong nho mat ong',
    'fructose-furanose': 'duong trai cay duong mia mat ong fruit sugar',
    'fructose-pyranose': 'duong trai cay fruit sugar',
    'fructose-open': 'duong trai cay duong mat ong fruit sugar',
    'sucrose': 'duong mia duong phen c12h22o11 disaccharide table sugar',
    'maltose': 'duong mach nha c12h22o11 disaccharide malt sugar',
    'sorbitol': 'duong an kieng tao ngot sugar sweetener',
    'ribose-ring': 'duong rna atp sugar',
    'ribose-open': 'duong rna sugar',
    'deoxyribose-ring': 'duong dna sugar',
    ethanol: 'ruou etylic con uong sat khuan alcohol',
    isopropanol: 'con sat khuan rua linh kien rubbing alcohol',
    'acetic-acid': 'giam an chua vinegar',
    'citric-acid': 'chanh chua vitamin',
    'lactic-acid': 'sua chua moi co yogurt',
    'vitamin-c': 'cam chanh vitamin c antioxidant',
    aspirin: 'thuoc giam dau ha sot painkiller',
    paracetamol: 'thuoc ha sot giam dau acetaminophen',
    dopamine: 'than kinh hanh phuc neurotransmitter',
    naphthalene: 'bang phien long nao mothball',
    menthol: 'bac ha dau gio peppermint mint',
    limonene: 'cam chanh tinh dau citrus',
    vanillin: 'vani huong lieu vanilla',
    'glutamic-acid': 'bot ngot mi chinh msg',
    'isoamyl-acetate': 'dau chuoi mui chuoi banana oil',
    urea: 'phan dam urê phan bon fertilizer',
    isooctane: 'xang chi so octan gasoline fuel',
    methoxyamine: 'ch5no alkoxyamine hydroxylamine',
    aminomethanol: 'ch5no amino alcohol',
    'n-methylhydroxylamine': 'ch5no hydroxylamine',
    ethanolamine: 'c2h7no amino alcohol mea',
    methanediol: 'ch4o2 formaldehyde hydrate gem diol',
    'methyl-hydroperoxide': 'ch4o2 peroxide',
    'methyl-carbamate': 'c2h5no2 carbamate',
    bromoethane: 'ethyl bromide c2h5br',
    '2,4,6-tribromophenol': 'ket tua trang phenol brom',
    'methyl-salicylate': 'dau nong salonpas wintergreen',
    'ethyl-butyrate': 'mui dua pineapple ester',
    'phenyl-acetate': 'ester phenol',
    'glycolic-acid': 'aha tay te bao chet',
    nitromethane: 'ch3no2 nitro nhien lieu dua xe',
    'carbamic-acid': 'ch3no2 carbamic',
    'methyl-nitrite': 'ch3no2 nitrite',
    'formohydroxamic-acid': 'ch3no2 hydroxamic',
    'o-formylhydroxylamine': 'ch3no2 hydroxylamine',
    nitrobenzene: 'c6h5no2 dau hanh nhan nitro',
    tnt: 'thuoc no trinitrotoluene c7h5n3o6',
    'picric-acid': 'ket tua vang trinitrophenol c6h3n3o7',
    nitroglycerin: 'thuoc no gian mach tim c3h5n3o9',
    acrylonitrile: 'to nitron olon pan c3h3n',
    caprolactam: 'to capron nylon 6 c6h11no',
    caffeine: 'ca phe tra tinh tao coffee tea',
    nicotine: 'thuoc la tobacco alkaloid',
    eugenol: 'dinh huong tinh dau clove oil',
    cinnamaldehyde: 'que tinh dau que cinnamon',
    '2,4,6-tribromoaniline': 'ket tua trang aniline brom',
    'gluconic-acid': 'glucose brom c6h12o7',
    triglycine: 'biuret tripeptide gly gly gly c6h11n3o4',
    penguinone: 'chim canh cut penguin ketone c10h14o',
    prismane: 'lang tru ladenburg c6h6',
    'dewar-benzene': 'dewar c6h6',
    'squaric-acid': 'vong vuong c4h2o4',
    'mellitic-acid': 'hexacarboxylic benzene c12h6o12',
    azulene: 'mau xanh blue hydrocarbon c10h8',
    tetrahedrane: 'tu dien tetrahedron c4h4',
    'chloral-hydrate': 'knockout drops c2h3cl3o2 gem diol',
    'aminooxyacetic-acid': 'oxyamine amino acid c2h5no3',
    'carbon-suboxide': 'oxocarbon c3o2',
    'vinyl-alcohol': 'enol c2h4o',
    ethylmethylamine: 'amine bac 2 c3h9n',
    'isopropyl-formate': 'ester trang bac c4h8o2'
  };

  let SEARCH_INDEX_REF = null;
  let SEARCH_INDEX_CACHE = [];

  function ensureSearchIndex() {
    if (KNOWN_MOLECULES.length === 0 && Array.isArray(global.ORGANIC_COMPOUNDS)) {
      KNOWN_MOLECULES = buildKnownMolecules(global.ORGANIC_COMPOUNDS);
    }
    if (SEARCH_INDEX_REF === KNOWN_MOLECULES && SEARCH_INDEX_CACHE.length === KNOWN_MOLECULES.length) {
      return SEARCH_INDEX_CACHE;
    }
    SEARCH_INDEX_REF = KNOWN_MOLECULES;
    SEARCH_INDEX_CACHE = KNOWN_MOLECULES.map((item, idx) => {
      const f = computeHeavyEntryFormula(item);
      const tagStr = `${SEARCH_CATEGORY_TAGS[item.catKey] || ''} ${SEARCH_COMPOUND_TAGS[item.id] || ''}`;
      return {
        id: item.id,
        item,
        idx,
        formulaUnicode: f.formulaUnicode,
        formulaAscii: f.formulaAscii,
        formulaLower: f.formulaLower,
        cCount: f.counts.C || 0,
        heavyCount: (item.elements || []).length,
        nameViNorm: normalizeSearchText(item.name || ''),
        nameEnNorm: normalizeSearchText(item.nameEn || item.name || ''),
        catViNorm: normalizeSearchText(item.category || ''),
        catEnNorm: normalizeSearchText(item.categoryEn || item.category || ''),
        tagsNorm: normalizeSearchText(tagStr),
        lifeViNorm: normalizeSearchText(item.realLife || ''),
        lifeEnNorm: normalizeSearchText(item.realLifeEn || ''),
        noteNorm: normalizeSearchText(`${item.note || ''} ${item.noteEn || ''}`),
        idNorm: normalizeSearchText(String(item.id || '').replace(/-/g, ' '))
      };
    });
    return SEARCH_INDEX_CACHE;
  }

  function formatSearchHit(rec, score) {
    const it = rec.item;
    return {
      id: rec.id,
      name: it.name,
      nameEn: it.nameEn || it.name,
      category: it.category,
      categoryEn: it.categoryEn || it.category,
      catKey: it.catKey,
      formula: rec.formulaUnicode,
      formulaAscii: rec.formulaAscii,
      score
    };
  }

  function searchCompounds(rawQuery, lang, limit = 30) {
    const index = ensureSearchIndex();
    const activeEn = lang === 'en';
    const q = normalizeSearchText(rawQuery);
    if (!q) {
      const out = [];
      FEATURED_COMPOUND_IDS.forEach((fid) => {
        const rec = index.find((r) => r.id === fid);
        if (rec) out.push(formatSearchHit(rec, 1));
      });
      return out.slice(0, limit);
    }

    const qCompact = q.replace(/[\s\-\(\)\[\],·•]+/g, '');
    const hillFromStruct = tryStructuralFormulaToHill(q);
    const wordRe = new RegExp(`(?:^|[\\s(\\/\\-])${escapeSearchRegex(q)}`);
    const looksLikeFormulaToken = /^(?:c|h|o|n|cl|br|f|i)+\d+[a-z0-9]*$/.test(qCompact);
    const aliasBoostMap = new Map();
    Object.keys(SEARCH_ALIASES).forEach((aliasKey) => {
      const targets = Array.isArray(SEARCH_ALIASES[aliasKey])
        ? SEARCH_ALIASES[aliasKey]
        : [SEARCH_ALIASES[aliasKey]];
      let boost = 0;
      if (q === aliasKey) {
        boost = 880;
      } else if (aliasKey.length > 3 && q.length >= 3 && aliasKey.startsWith(q)) {
        boost = 740;
      } else if (aliasKey.length > 3 && q.length >= 4 && aliasKey.includes(q)) {
        boost = 640;
      } else if (aliasKey.length >= 3 && q.length > aliasKey.length && q.includes(aliasKey)) {
        const re = new RegExp(`(?:^|\\s)${escapeSearchRegex(aliasKey)}(?:$|\\s)`);
        if (re.test(q)) boost = 710;
      }
      if (boost > 0) {
        targets.forEach((tid, tIdx) => {
          const adjBoost = boost - tIdx * 5;
          if ((aliasBoostMap.get(tid) || 0) < adjBoost) {
            aliasBoostMap.set(tid, adjBoost);
          }
        });
      }
    });

    const matches = [];

    for (let i = 0; i < index.length; i++) {
      const rec = index[i];
      const primaryName = activeEn ? rec.nameEnNorm : rec.nameViNorm;
      const altName = activeEn ? rec.nameViNorm : rec.nameEnNorm;
      const primaryLife = activeEn ? rec.lifeEnNorm : rec.lifeViNorm;
      let score = 0;

      if (qCompact && rec.formulaLower === qCompact) {
        score = 1000 + getFormulaHintBoost(q, rec.item.catKey);
      } else if (hillFromStruct && rec.formulaLower === hillFromStruct) {
        score = 920 + getFormulaHintBoost(q, rec.item.catKey);
      } else if (qCompact && matchesFormulaBoundaryPrefix(rec.formulaLower, qCompact)) {
        score = 850;
      } else if (primaryName.startsWith(q)) {
        score = 720;
      } else if (altName.startsWith(q)) {
        score = 700;
      } else if (
        wordRe.test(primaryName) ||
        wordRe.test(altName) ||
        wordRe.test(rec.idNorm)
      ) {
        score = 580;
      } else if (rec.tagsNorm && wordRe.test(rec.tagsNorm)) {
        score = 520;
      } else if (
        rec.nameViNorm.includes(q) ||
        rec.nameEnNorm.includes(q) ||
        rec.idNorm.includes(q) ||
        rec.catViNorm.includes(q) ||
        rec.catEnNorm.includes(q) ||
        (!looksLikeFormulaToken && qCompact.length >= 2 && rec.formulaLower.includes(qCompact))
      ) {
        score = 450;
      } else if (
        rec.lifeViNorm.includes(q) ||
        rec.lifeEnNorm.includes(q) ||
        rec.noteNorm.includes(q)
      ) {
        score = wordRe.test(primaryLife) ? 345 : 320;
      }

      const aliasBoost = aliasBoostMap.get(rec.id) || 0;
      if (aliasBoost > score) {
        score = aliasBoost;
      }

      if (score > 0) {
        matches.push({ rec, score });
      }
    }

    matches.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.rec.heavyCount !== b.rec.heavyCount) return a.rec.heavyCount - b.rec.heavyCount;
      if (a.rec.cCount !== b.rec.cCount) return a.rec.cCount - b.rec.cCount;
      return a.rec.idx - b.rec.idx;
    });

    return matches.slice(0, limit).map((m) => formatSearchHit(m.rec, m.score));
  }

  // =========================================================================
  // MOLECULE IDENTIFICATION & CLASSIFICATION ENGINE (Exported for Unit Tests)
  // =========================================================================

  function classifyCustomMolecule(graph, normHeavy) {
    const { atomMap, adj } = buildAdjacency(graph);
    const heavyCount = normHeavy.n;
    const edgeCount = normHeavy.edgeCount;
    const ringCount = Math.max(0, edgeCount - heavyCount + 1);
    const isCyclic = ringCount > 0;

    let hasBranch = false;
    for (let i = 0; i < normHeavy.n; i++) {
      if (normHeavy.elements[i] === 'C') {
        const cDeg = normHeavy.adjList[i].filter((e) => normHeavy.elements[e.to] === 'C').length;
        if (cDeg >= 3) hasBranch = true;
      }
    }
    const topologyKey = isCyclic ? 'cyclic' : hasBranch ? 'branched' : 'linear';

    // Map heavy atom id -> aromatic status from normHeavy
    const aromAtomIds = new Set();
    let hIdx = 0;
    (graph.atoms || []).forEach((a) => {
      if (a.element !== 'H') {
        if ((normHeavy.adjList[hIdx] || []).some((e) => e.order === 1.5)) {
          aromAtomIds.add(a.id);
        }
        hIdx++;
      }
    });

    let hasCarboxyl = false;
    let hasCarbamate = false;
    let hasEster = false;
    let hasAmide = false;
    let hasNitrile = false;
    let hasImine = false;
    let hasNitro = false;
    let hasNitroso = false;
    let hasAldehyde = false;
    let hasKetone = false;
    let hasPhenol = false;
    let hasAlcohol = false;
    let hasPeroxide = false;
    let hasOxyamine = false;
    let hasEther = false;
    let hasHydrazine = false;
    let hasAmine = false;
    let hasHypohalite = false;
    let hasHalogen = false;
    let hasCCDouble = false;
    let hasCCTriple = false;
    let hasHeteroAtom = false;

    const isHalogenEl = (el) => el === 'Cl' || el === 'Br' || el === 'F' || el === 'I';

    (graph.bonds || []).forEach((b) => {
      const u = b.from ?? b.a ?? b.source;
      const v = b.to ?? b.b ?? b.target;
      const elU = atomMap.get(u)?.element;
      const elV = atomMap.get(v)?.element;
      const ord = Number(b.order || 1);
      if (elU === 'C' && elV === 'C') {
        if (ord === 3) hasCCTriple = true;
        else if (ord === 2 && (!aromAtomIds.has(u) || !aromAtomIds.has(v))) hasCCDouble = true;
      } else if ((elU === 'C' && elV === 'N') || (elU === 'N' && elV === 'C')) {
        if (ord === 3) hasNitrile = true;
        else if (ord === 2 && (!aromAtomIds.has(u) || !aromAtomIds.has(v))) hasImine = true;
      } else if (elU === 'O' && elV === 'O') {
        hasPeroxide = true;
      } else if (elU === 'N' && elV === 'N') {
        hasHydrazine = true;
      } else if ((elU === 'O' && isHalogenEl(elV)) || (isHalogenEl(elU) && elV === 'O')) {
        hasHypohalite = true;
      }
    });

    atomMap.forEach((atom, id) => {
      if (isHalogenEl(atom.element)) {
        hasHeteroAtom = true;
        hasHalogen = true;
      } else if (atom.element === 'N') {
        hasHeteroAtom = true;
        const heavyNbs = (adj.get(id) || []).filter((e) => atomMap.get(e.to)?.element !== 'H');
        const hasMultiBond = heavyNbs.some((e) => e.order >= 2);
        const dblOCount = heavyNbs.filter((e) => e.order === 2 && atomMap.get(e.to)?.element === 'O').length;
        const singleONb = heavyNbs.some((e) => e.order === 1 && atomMap.get(e.to)?.element === 'O');
        const hasONNeighbor = heavyNbs.some((e) => {
          const nbEl = atomMap.get(e.to)?.element;
          return nbEl === 'O' || nbEl === 'N';
        });
        const attachedToCarbonyl = heavyNbs.some((e) => {
          if (e.order !== 1 || atomMap.get(e.to)?.element !== 'C') return false;
          return (adj.get(e.to) || []).some((e2) => e2.order === 2 && atomMap.get(e2.to)?.element === 'O');
        });
        if (dblOCount === 2) hasNitro = true;
        else if (dblOCount === 1) hasNitroso = true;
        else if (singleONb) hasOxyamine = true;
        if (!aromAtomIds.has(id) && !hasMultiBond && !hasONNeighbor && !attachedToCarbonyl) {
          hasAmine = true;
        }
      } else if (atom.element === 'O') {
        hasHeteroAtom = true;
        const heavyNbs = (adj.get(id) || []).filter((e) => atomMap.get(e.to)?.element !== 'H');
        if (
          heavyNbs.length === 2 &&
          heavyNbs.every((e) => e.order === 1 && atomMap.get(e.to)?.element === 'C')
        ) {
          const isCarbamateO = heavyNbs.some((e) => {
            const cNbs = adj.get(e.to) || [];
            const hasCblO = cNbs.some((e2) => e2.order === 2 && atomMap.get(e2.to)?.element === 'O');
            const hasCN = cNbs.some((e2) => e2.order === 1 && atomMap.get(e2.to)?.element === 'N');
            return hasCblO && hasCN;
          });
          const isEsterO = heavyNbs.some((e) =>
            (adj.get(e.to) || []).some((e2) => e2.order === 2 && atomMap.get(e2.to)?.element === 'O')
          );
          if (isCarbamateO) hasCarbamate = true;
          else if (isEsterO) hasEster = true;
          else hasEther = true;
        }
      } else if (atom.element === 'C') {
        const nbs = adj.get(id) || [];
        const dblO = nbs.some((e) => e.order === 2 && atomMap.get(e.to)?.element === 'O');
        const singleOList = nbs.filter((e) => e.order === 1 && atomMap.get(e.to)?.element === 'O');
        const singleNList = nbs.filter((e) => e.order === 1 && atomMap.get(e.to)?.element === 'N');
        const hasOH = singleOList.some((e) => {
          const oHeavy = (adj.get(e.to) || []).filter((oe) => atomMap.get(oe.to)?.element !== 'H');
          return oHeavy.length === 1;
        });
        const hasCORBridge = singleOList.some((e) => {
          const oHeavy = (adj.get(e.to) || []).filter((oe) => atomMap.get(oe.to)?.element !== 'H');
          return oHeavy.length === 2 && oHeavy.every((oe) => oe.order === 1 && atomMap.get(oe.to)?.element === 'C');
        });
        const hasAnyORBridge = singleOList.some((e) => {
          const oHeavy = (adj.get(e.to) || []).filter((oe) => atomMap.get(oe.to)?.element !== 'H');
          return oHeavy.length === 2;
        });
        const hasSingleN = singleNList.length > 0;
        const heavySum = getHeavyBondSum(atomMap, adj, id);
        if (dblO && hasOH && hasSingleN) {
          hasCarboxyl = true;
          hasAmide = true;
        } else if (dblO && hasCORBridge && hasSingleN) {
          hasCarbamate = true;
        } else if (dblO && hasOH) {
          hasCarboxyl = true;
          if (hasCORBridge) hasEster = true;
        } else if (dblO && hasCORBridge) {
          hasEster = true;
        } else if (dblO && hasSingleN) {
          hasAmide = true;
        } else if (dblO) {
          if (hasAnyORBridge) hasEster = true;
          else if (4 - heavySum >= 1) hasAldehyde = true;
          else hasKetone = true;
        } else if (hasOH) {
          if (aromAtomIds.has(id)) hasPhenol = true;
          else hasAlcohol = true;
        }
      }
    });

    const functionalGroups = [];
    if (hasCarboxyl) functionalGroups.push('carboxyl');
    if (hasCarbamate) functionalGroups.push('carbamate');
    if (hasEster) functionalGroups.push('ester');
    if (hasAmide) functionalGroups.push('amide');
    if (hasNitrile) functionalGroups.push('nitrile');
    if (hasImine) functionalGroups.push('imine');
    if (hasNitro) functionalGroups.push('nitro');
    if (hasNitroso) functionalGroups.push('nitroso');
    if (hasAldehyde) functionalGroups.push('aldehyde');
    if (hasKetone) functionalGroups.push('ketone');
    if (hasPhenol) functionalGroups.push('phenol');
    if (hasAlcohol) functionalGroups.push('alcohol');
    if (hasPeroxide) functionalGroups.push('peroxide');
    if (hasOxyamine) functionalGroups.push('oxyamine');
    if (hasEther) functionalGroups.push('ether');
    if (hasHydrazine) functionalGroups.push('hydrazine');
    if (hasAmine) functionalGroups.push('amine');
    if (hasHypohalite) functionalGroups.push('hypohalite');
    if (hasHalogen) functionalGroups.push('halogen');
    if (normHeavy.hasAromatic) functionalGroups.push('arene');
    if (hasCCDouble) functionalGroups.push('alkene');
    if (hasCCTriple) functionalGroups.push('alkyne');

    let catKey = 'alkane';
    if (hasCarboxyl && hasAmine) catKey = 'aminoacid';
    else if (hasCarboxyl) catKey = 'carboxylic';
    else if (hasCarbamate) catKey = 'carbamate';
    else if (hasEster) catKey = 'ester';
    else if (hasAmide) catKey = 'amide';
    else if (hasNitrile) catKey = 'nitrile';
    else if (hasNitro) catKey = 'nitro';
    else if (hasNitroso) catKey = 'nitroso';
    else if (hasAldehyde) catKey = 'aldehyde';
    else if (hasKetone) catKey = 'ketone';
    else if (hasPhenol) catKey = 'phenol';
    else if (hasAlcohol && hasAmine) catKey = 'aminoalcohol';
    else if (hasAlcohol) catKey = 'alcohol';
    else if (hasPeroxide) catKey = 'peroxide';
    else if (hasOxyamine) catKey = 'oxyamine';
    else if (hasEther) catKey = 'ether';
    else if (hasHydrazine) catKey = 'amine';
    else if (hasImine) catKey = 'imine';
    else if (hasAmine) catKey = 'amine';
    else if (hasHalogen || hasHypohalite) catKey = 'halogen';
    else if (normHeavy.hasAromatic) catKey = hasHeteroAtom ? 'heterocycle' : 'arene';
    else if (hasCCTriple) catKey = 'alkyne';
    else if (hasCCDouble) catKey = isCyclic ? 'cycloalkene' : 'alkene';
    else if (isCyclic) catKey = hasHeteroAtom ? 'heterocycle' : 'cycloalkane';
    else if (hasHeteroAtom) catKey = 'custom';

    return { topologyKey, catKey, isCyclic, ringCount, functionalGroups, hasHeteroAtom };
  }

  function formatCountsFormula(counts) {
    const order = ['C', 'H', 'Br', 'Cl', 'F', 'I', 'N', 'O'];
    return order
      .filter((el) => counts[el] > 0)
      .map((el) => el + (counts[el] > 1 ? toSubscript(counts[el]) : ''))
      .join('');
  }

  function computeCountsMass(counts) {
    let mass = 0;
    Object.keys(counts).forEach((el) => {
      if (counts[el] > 0) mass += counts[el] * getAtomicMass(el);
    });
    return Number(mass.toFixed(3));
  }

  const IUPAC_ALKANE_STEMS = [
    '',
    'meth',
    'eth',
    'prop',
    'but',
    'pent',
    'hex',
    'hept',
    'oct',
    'non',
    'dec',
    'undec',
    'dodec'
  ];

  const IUPAC_MULTI_PREFIXES = [
    '',
    '',
    'di',
    'tri',
    'tetra',
    'penta',
    'hexa',
    'hepta',
    'octa',
    'nona',
    'deca',
    'undeca',
    'dodeca'
  ];

  const IUPAC_HALO_NAMES = {
    Br: 'bromo',
    Cl: 'chloro',
    F: 'fluoro',
    I: 'iodo'
  };

  function generateAutoIupacName(graph, normHeavy, info) {
    try {
      if (!graph || !normHeavy || !info) return null;
      if (info.isCyclic || normHeavy.hasAromatic) return null;
      const n = normHeavy.n;
      if (n === 0 || normHeavy.edgeCount !== n - 1) return null;

      const els = normHeavy.elements;
      const adjList = normHeavy.adjList;
      const cIdxList = [];
      for (let i = 0; i < n; i++) {
        if (els[i] === 'C') cIdxList.push(i);
      }
      const cCount = cIdxList.length;
      if (cCount === 0 || cCount > 12) return null;

      const cAdj = new Map();
      cIdxList.forEach((ci) => cAdj.set(ci, []));
      let cEdgeCount = 0;
      const multBonds = [];

      for (let u = 0; u < n; u++) {
        const elU = els[u];
        const uNbs = adjList[u];
        if (elU !== 'C') {
          if (uNbs.length !== 1) return null;
          const nb = uNbs[0];
          if (els[nb.to] !== 'C') return null;
          if (IUPAC_HALO_NAMES[elU] && nb.order !== 1) return null;
          if (elU === 'N' && nb.order !== 1) return null;
          if (elU === 'O' && nb.order !== 1 && nb.order !== 2) return null;
          continue;
        }
        for (let k = 0; k < uNbs.length; k++) {
          const e = uNbs[k];
          if (els[e.to] === 'C') {
            cAdj.get(u).push({ to: e.to, order: e.order });
            if (u < e.to) {
              cEdgeCount++;
              if (e.order === 2 || e.order === 3) {
                multBonds.push({ u, v: e.to, order: e.order });
              }
            }
          }
        }
      }

      if (cEdgeCount !== cCount - 1) return null;
      if (multBonds.length > 1) return null;

      const haloByC = new Map();
      const principalGroups = [];

      for (let idx = 0; idx < cIdxList.length; idx++) {
        const c = cIdxList[idx];
        const cDeg = cAdj.get(c).length;
        const nbs = adjList[c];
        let dblO = 0;
        let singleO = 0;
        let singleN = 0;
        const halos = [];

        for (let k = 0; k < nbs.length; k++) {
          const e = nbs[k];
          const nbEl = els[e.to];
          if (nbEl === 'C') continue;
          if (nbEl === 'O') {
            if (e.order === 2) dblO++;
            else if (e.order === 1) singleO++;
          } else if (nbEl === 'N') {
            if (e.order === 1) singleN++;
            else return null;
          } else if (IUPAC_HALO_NAMES[nbEl]) {
            halos.push(IUPAC_HALO_NAMES[nbEl]);
          } else {
            return null;
          }
        }

        if (halos.length > 0) haloByC.set(c, halos);

        const hasFG = dblO > 0 || singleO > 0 || singleN > 0;
        if (!hasFG) continue;
        if (halos.length > 0) return null;

        if (dblO === 1 && singleO === 1 && singleN === 0 && cDeg <= 1) {
          principalGroups.push({ type: 'carboxyl', cIdx: c });
        } else if (dblO === 1 && singleO === 0 && singleN === 0) {
          principalGroups.push({ type: cDeg <= 1 ? 'aldehyde' : 'ketone', cIdx: c });
        } else if (dblO === 0 && singleO === 1 && singleN === 0) {
          principalGroups.push({ type: 'alcohol', cIdx: c });
        } else if (dblO === 0 && singleO === 0 && singleN === 1) {
          principalGroups.push({ type: 'amine', cIdx: c });
        } else {
          return null;
        }
      }

      if (principalGroups.length > 1) return null;
      const pGroup = principalGroups.length === 1 ? principalGroups[0] : null;
      const multBond = multBonds.length === 1 ? multBonds[0] : null;
      if (pGroup && multBond) return null;

      const candidatePaths = [];
      if (cCount === 1) {
        candidatePaths.push([cIdxList[0]]);
      } else {
        const terminals = cIdxList.filter((c) => {
          const deg = cAdj.get(c).length;
          return deg === 1 || (pGroup && pGroup.cIdx === c && (pGroup.type === 'carboxyl' || pGroup.type === 'aldehyde'));
        });
        for (let i = 0; i < terminals.length; i++) {
          const start = terminals[i];
          const stack = [[start, -1, [start]]];
          while (stack.length > 0) {
            const [curr, prev, path] = stack.pop();
            const nbs = cAdj.get(curr);
            if (curr !== start && nbs.length === 1) {
              if (start < curr || !terminals.includes(curr)) {
                candidatePaths.push(path);
              }
            }
            for (let k = 0; k < nbs.length; k++) {
              const nxt = nbs[k].to;
              if (nxt !== prev) {
                stack.push([nxt, curr, path.concat(nxt)]);
              }
            }
          }
        }
      }

      function compareLexArr(a, b) {
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
          if (a[i] !== b[i]) return a[i] - b[i];
        }
        return a.length - b.length;
      }

      function inspectDirectedPath(chain) {
        const L = chain.length;
        const posMap = new Map();
        for (let i = 0; i < L; i++) posMap.set(chain[i], i);

        let fgLoc = Infinity;
        if (pGroup) {
          const pos = posMap.get(pGroup.cIdx);
          if (pos === undefined) return null;
          if ((pGroup.type === 'carboxyl' || pGroup.type === 'aldehyde') && pos !== 0) return null;
          fgLoc = pos + 1;
        }

        let multLoc = Infinity;
        if (multBond) {
          const pu = posMap.get(multBond.u);
          const pv = posMap.get(multBond.v);
          if (pu === undefined || pv === undefined || Math.abs(pu - pv) !== 1) return null;
          multLoc = Math.min(pu, pv) + 1;
        }

        const subs = [];
        let hasComplexSide = false;

        for (let i = 0; i < L; i++) {
          const c = chain[i];
          const loc = i + 1;
          const halos = haloByC.get(c);
          if (halos) {
            halos.forEach((hName) => subs.push({ name: hName, loc }));
          }
          const cNbs = cAdj.get(c);
          for (let k = 0; k < cNbs.length; k++) {
            const nb = cNbs[k].to;
            if (posMap.has(nb)) continue;
            const branchNodes = [];
            const q = [[nb, c]];
            let complex = false;
            while (q.length > 0) {
              const [u, par] = q.shift();
              branchNodes.push(u);
              if (haloByC.has(u)) {
                complex = true;
                break;
              }
              const children = cAdj.get(u).filter((e) => e.to !== par);
              if (children.length > 1) {
                complex = true;
                break;
              }
              if (children.length === 1) q.push([children[0].to, u]);
            }
            const bLen = branchNodes.length;
            if (complex || bLen > 5) {
              hasComplexSide = true;
            } else {
              subs.push({ name: `${IUPAC_ALKANE_STEMS[bLen]}yl`, loc });
            }
          }
        }

        const subLocs = subs.map((s) => s.loc).sort((a, b) => a - b);
        const alphaLocs = subs
          .slice()
          .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : a.loc - b.loc))
          .map((s) => s.loc);

        return {
          L,
          subCount: subs.length,
          fgLoc,
          multLoc,
          subLocs,
          alphaLocs,
          subs,
          hasComplexSide
        };
      }

      function isBetterCandidate(cand, best) {
        if (!best) return true;
        if (cand.L !== best.L) return cand.L > best.L;
        if (cand.subCount !== best.subCount) return cand.subCount > best.subCount;
        if (cand.hasComplexSide !== best.hasComplexSide) return !cand.hasComplexSide;
        if (cand.fgLoc !== best.fgLoc) return cand.fgLoc < best.fgLoc;
        if (cand.multLoc !== best.multLoc) return cand.multLoc < best.multLoc;
        const subCmp = compareLexArr(cand.subLocs, best.subLocs);
        if (subCmp !== 0) return subCmp < 0;
        const alphaCmp = compareLexArr(cand.alphaLocs, best.alphaLocs);
        if (alphaCmp !== 0) return alphaCmp < 0;
        return false;
      }

      let best = null;
      for (let i = 0; i < candidatePaths.length; i++) {
        const fwd = candidatePaths[i];
        const cFwd = inspectDirectedPath(fwd);
        if (cFwd && isBetterCandidate(cFwd, best)) best = cFwd;

        if (fwd.length > 1) {
          const rev = fwd.slice().reverse();
          const cRev = inspectDirectedPath(rev);
          if (cRev && isBetterCandidate(cRev, best)) best = cRev;
        }
      }

      if (!best || best.hasComplexSide) return null;

      const grouped = new Map();
      best.subs.forEach((s) => {
        if (!grouped.has(s.name)) grouped.set(s.name, []);
        grouped.get(s.name).push(s.loc);
      });
      const sortedNames = Array.from(grouped.keys()).sort();
      const totalSubs = best.subCount;
      const prefixParts = sortedNames.map((name) => {
        const locs = grouped.get(name).sort((a, b) => a - b);
        const mult = IUPAC_MULTI_PREFIXES[locs.length] || '';
        const omitLocant =
          best.L === 1 || (best.L === 2 && totalSubs === 1 && !pGroup && !multBond);
        return omitLocant ? `${mult}${name}` : `${locs.join(',')}-${mult}${name}`;
      });
      const prefixStr = prefixParts.join('-');

      const stem = IUPAC_ALKANE_STEMS[best.L];
      let parentStr = `${stem}ane`;
      if (multBond) {
        const end = multBond.order === 3 ? 'yne' : 'ene';
        parentStr = best.L === 2 ? `${stem}${end}` : `${stem}-${best.multLoc}-${end}`;
      } else if (pGroup) {
        if (pGroup.type === 'carboxyl') {
          parentStr = `${stem}anoic acid`;
        } else if (pGroup.type === 'aldehyde') {
          parentStr = `${stem}anal`;
        } else if (pGroup.type === 'ketone') {
          parentStr = best.L <= 4 ? `${stem}anone` : `${stem}an-${best.fgLoc}-one`;
        } else if (pGroup.type === 'alcohol') {
          parentStr = best.L <= 2 ? `${stem}anol` : `${stem}an-${best.fgLoc}-ol`;
        } else if (pGroup.type === 'amine') {
          parentStr = best.L <= 2 ? `${stem}anamine` : `${stem}an-${best.fgLoc}-amine`;
        }
      }

      const rawName = `${prefixStr}${parentStr}`;
      return rawName.replace(/[a-z]/, (ch) => ch.toUpperCase());
    } catch (_) {
      return null;
    }
  }

  function identifyMolecule(graph, lang) {
    const activeLang = lang === 'en' ? 'en' : 'vi';
    const d = ORG_I18N[activeLang] || ORG_I18N.vi;
    const { atomMap, adj } = buildAdjacency(graph);

    if (KNOWN_MOLECULES.length === 0 && Array.isArray(global.ORGANIC_COMPOUNDS)) {
      KNOWN_MOLECULES = buildKnownMolecules(global.ORGANIC_COMPOUNDS);
    }

    // Saturated counts (including missing valence as H) AND actual explicit-only counts
    const satCounts = { C: 0, H: 0, Br: 0, Cl: 0, F: 0, I: 0, N: 0, O: 0 };
    const actualCounts = { C: 0, H: 0, Br: 0, Cl: 0, F: 0, I: 0, N: 0, O: 0 };
    let missingTotalValence = 0;

    atomMap.forEach((atom, id) => {
      if (actualCounts[atom.element] !== undefined) actualCounts[atom.element]++;
      if (atom.element === 'H') {
        satCounts.H += 1;
      } else {
        if (satCounts[atom.element] !== undefined) satCounts[atom.element]++;
        const miss = getMissingValence(atomMap, adj, id);
        satCounts.H += miss;
        missingTotalValence += miss;
      }
    });

    const molecularFormula = formatCountsFormula(satCounts);
    const molarMass = computeCountsMass(satCounts);
    const actualFormula = formatCountsFormula(actualCounts);
    const actualMolarMass = computeCountsMass(actualCounts);

    const normHeavy = buildNormalizedHeavyGraph(graph);
    const customInfo = classifyCustomMolecule(graph, normHeavy);
    const { topologyKey, catKey, isCyclic, ringCount, functionalGroups, hasHeteroAtom } = customInfo;

    let matchedMol = null;
    for (let i = 0; i < KNOWN_MOLECULES.length; i++) {
      const ref = KNOWN_MOLECULES[i];
      if (areHeavyGraphsIsomorphic(normHeavy, ref.norm)) {
        matchedMol = ref;
        break;
      }
    }

    if (matchedMol) {
      const realLife = activeLang === 'en' ? matchedMol.realLifeEn : matchedMol.realLife;
      const reactions =
        (activeLang === 'en' ? matchedMol.reactionsEn : matchedMol.reactions) || [];
      const note = (activeLang === 'en' ? matchedMol.noteEn : matchedMol.note) || null;
      const categoryLabel =
        (activeLang === 'en' ? matchedMol.categoryEn : matchedMol.category) ||
        d.categories[matchedMol.catKey] ||
        d.categories.custom;
      return {
        matched: true,
        compoundId: matchedMol.id,
        commonName: activeLang === 'en' ? matchedMol.nameEn : matchedMol.name,
        categoryKey: matchedMol.catKey,
        categoryLabel,
        state: activeLang === 'en' ? matchedMol.stateEn : matchedMol.state,
        solubility: activeLang === 'en' ? matchedMol.solubilityEn : matchedMol.solubility,
        realLife,
        reactions,
        note,
        description: realLife,
        topologyKey,
        isCyclic,
        ringCount,
        functionalGroups,
        hasHeteroAtom,
        molecularFormula,
        molarMass,
        actualFormula,
        actualMolarMass,
        missingTotalValence,
        isComplete: missingTotalValence === 0
      };
    }

    const topoLabel = d.topology[topologyKey];
    const famLabel = d.categories[catKey] || d.categories.custom;
    const autoIupac = generateAutoIupacName(graph, normHeavy, customInfo);
    return {
      matched: false,
      compoundId: null,
      autoIupacName: autoIupac,
      commonName: autoIupac || d.customTitle(molecularFormula || '—', topoLabel, famLabel, isCyclic),
      categoryKey: catKey,
      categoryLabel: famLabel,
      state: null,
      solubility: null,
      realLife: null,
      reactions: [],
      note: null,
      description: autoIupac ? d.autoIupacNote : d.customNote,
      topologyKey,
      isCyclic,
      ringCount,
      functionalGroups,
      hasHeteroAtom,
      molecularFormula,
      molarMass,
      actualFormula,
      actualMolarMass,
      missingTotalValence,
      isComplete: missingTotalValence === 0
    };
  }

  // =========================================================================
  // RING-AWARE FORCE-DIRECTED LAYOUT ENGINE
  // =========================================================================

  function pickOpenAngles(occupiedAngles, count) {
    if (count <= 0) return [];
    if (occupiedAngles.length === 0) {
      const defaults = {
        1: [0],
        2: [-Math.PI / 2, Math.PI / 2],
        3: [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6],
        4: [-Math.PI / 2, 0, Math.PI / 2, Math.PI]
      };
      if (defaults[count]) return defaults[count].slice();
      const out = [];
      for (let i = 0; i < count; i++) out.push(normalizeAngle(-Math.PI / 2 + (2 * Math.PI * i) / count));
      return out;
    }

    if (occupiedAngles.length === 1 && (count === 3 || count === 2)) {
      const occ = normalizeAngle(occupiedAngles[0]);
      const cosA = Math.cos(occ);
      const sinA = Math.sin(occ);
      if (cosA > 0.25) {
        return count === 3 ? [-Math.PI / 2, Math.PI, Math.PI / 2] : [-Math.PI / 2, Math.PI / 2];
      }
      if (cosA < -0.25) {
        return count === 3 ? [-Math.PI / 2, 0, Math.PI / 2] : [-Math.PI / 2, Math.PI / 2];
      }
      if (count === 3) {
        return sinA >= 0 ? [Math.PI, -Math.PI / 2, 0] : [Math.PI, Math.PI / 2, 0];
      }
      return [Math.PI, 0];
    }

    const sorted = occupiedAngles.map(normalizeAngle).sort((a, b) => a - b);
    const gaps = [];
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i];
      const b = i + 1 < sorted.length ? sorted[i + 1] : sorted[0] + 2 * Math.PI;
      gaps.push({ start: a, span: b - a, alloc: 0 });
    }

    for (let k = 0; k < count; k++) {
      let bestIdx = 0;
      let bestScore = -1;
      for (let i = 0; i < gaps.length; i++) {
        const sc = gaps[i].span / (gaps[i].alloc + 1);
        if (sc > bestScore) {
          bestScore = sc;
          bestIdx = i;
        }
      }
      gaps[bestIdx].alloc += 1;
    }

    const result = [];
    gaps.forEach((g) => {
      if (g.alloc === 0) return;
      for (let j = 1; j <= g.alloc; j++) {
        result.push(normalizeAngle(g.start + (g.span * j) / (g.alloc + 1)));
      }
    });
    return result;
  }

  function findSmallRings(graph) {
    const { atomMap, adj } = buildAdjacency(graph);
    const seen = new Set();
    const rings = [];

    graph.bonds.forEach((bond) => {
      const u = bond.from;
      const v = bond.to;
      if (atomMap.get(u)?.element === 'H' || atomMap.get(v)?.element === 'H') return;

      const parent = new Map([[u, null]]);
      const depth = new Map([[u, 0]]);
      const queue = [u];
      let found = false;

      while (queue.length && !found) {
        const cur = queue.shift();
        const d = depth.get(cur);
        if (d >= 7) continue;
        const nbs = adj.get(cur) || [];
        for (let i = 0; i < nbs.length; i++) {
          const nxt = nbs[i].to;
          if (atomMap.get(nxt)?.element === 'H') continue;
          if ((cur === u && nxt === v) || (cur === v && nxt === u)) continue;
          if (!parent.has(nxt)) {
            parent.set(nxt, cur);
            depth.set(nxt, d + 1);
            if (nxt === v) {
              found = true;
              break;
            }
            queue.push(nxt);
          }
        }
      }

      if (found) {
        const cycle = [];
        let cur = v;
        while (cur !== null) {
          cycle.push(cur);
          cur = parent.get(cur);
        }
        if (cycle.length >= 3 && cycle.length <= 8) {
          const key = cycle.slice().sort().join('|');
          if (!seen.has(key)) {
            seen.add(key);
            rings.push(cycle);
          }
        }
      }
    });

    return rings;
  }

  function idealBondLength(elA, elB) {
    if (elA === 'H' || elB === 'H') {
      return elA === 'C' || elB === 'C' ? 52 : 48;
    }
    if (elA === 'C' && elB === 'C') return 84;
    return 78;
  }

  // Safe unit direction between two points (guarantees non-zero push even if coincident!)
  function safeUnitVec(dx, dy, seed) {
    const dist = Math.hypot(dx, dy);
    if (dist > 0.05) return { ux: dx / dist, uy: dy / dist, dist };
    const ang = (seed * 2.39996) % (2 * Math.PI);
    return { ux: Math.cos(ang), uy: Math.sin(ang), dist: 0.05 };
  }

  function relaxLayout(graph, positions, options = {}) {
    const {
      draggedIds = new Set(),
      collapsedHIds = new Set(),
      iterations = 115,
      showH = true,
      softAnchors = null
    } = options;
    const { atomMap, adj } = buildAdjacency(graph);
    const pos = new Map();

    graph.atoms.forEach((a, idx) => {
      const existing = positions.get(a.id);
      if (existing) {
        pos.set(a.id, { x: existing.x, y: existing.y });
      } else {
        pos.set(a.id, { x: Math.cos(idx) * 10, y: Math.sin(idx) * 10 });
      }
    });

    if (graph.atoms.length <= 1) return pos;

    const rings = findSmallRings(graph);
    const ringAtomSet = new Set();
    rings.forEach((r) => r.forEach((id) => ringAtomSet.add(id)));

    const visibleIds = graph.atoms
      .filter((a) => (showH && !collapsedHIds.has(a.id)) || a.element !== 'H')
      .map((a) => a.id);
    const visibleSet = new Set(visibleIds);
    const visibleBonds = graph.bonds.filter((b) => visibleSet.has(b.from) && visibleSet.has(b.to));

    const anchorPos = new Map();
    draggedIds.forEach((id) => {
      if (pos.has(id)) anchorPos.set(id, { x: pos.get(id).x, y: pos.get(id).y });
    });

    for (let iter = 0; iter < iterations; iter++) {
      const disp = new Map();
      graph.atoms.forEach((a) => disp.set(a.id, { x: 0, y: 0 }));

      // 1. Bond length springs
      graph.bonds.forEach((b, bIdx) => {
        if (!visibleSet.has(b.from) || !visibleSet.has(b.to)) return;
        const pa = pos.get(b.from);
        const pb = pos.get(b.to);
        if (!pa || !pb) return;
        const elA = atomMap.get(b.from).element;
        const elB = atomMap.get(b.to).element;
        const targetLen = idealBondLength(elA, elB);
        const { ux, uy, dist } = safeUnitVec(pb.x - pa.x, pb.y - pa.y, bIdx + 1);
        const diff = (dist - targetLen) * 0.24;
        const fx = ux * diff;
        const fy = uy * diff;
        const wA = elA === 'H' ? 0.85 : elB === 'H' ? 0.15 : 0.5;
        const wB = 1 - wA;
        disp.get(b.from).x += fx * wA;
        disp.get(b.from).y += fy * wA;
        disp.get(b.to).x -= fx * wB;
        disp.get(b.to).y -= fy * wB;
      });

      // 2. Ring regularization
      rings.forEach((cycle) => {
        const k = cycle.length;
        let cx = 0;
        let cy = 0;
        cycle.forEach((id) => {
          const p = pos.get(id);
          cx += p.x;
          cy += p.y;
        });
        cx /= k;
        cy /= k;

        const edgeLen = 84;
        const R = edgeLen / (2 * Math.sin(Math.PI / k));

        let bestDir = 1;
        let bestTheta = -Math.PI / 2;
        let bestErr = Infinity;

        [1, -1].forEach((dir) => {
          let sumSin = 0;
          let sumCos = 0;
          for (let i = 0; i < k; i++) {
            const p = pos.get(cycle[i]);
            const ang = Math.atan2(p.y - cy, p.x - cx);
            const expectedOffset = dir * ((2 * Math.PI * i) / k);
            sumSin += Math.sin(ang - expectedOffset);
            sumCos += Math.cos(ang - expectedOffset);
          }
          const theta0 = Math.atan2(sumSin, sumCos);
          let err = 0;
          for (let i = 0; i < k; i++) {
            const p = pos.get(cycle[i]);
            const tx = cx + R * Math.cos(theta0 + dir * ((2 * Math.PI * i) / k));
            const ty = cy + R * Math.sin(theta0 + dir * ((2 * Math.PI * i) / k));
            err += Math.hypot(tx - p.x, ty - p.y);
          }
          if (err < bestErr) {
            bestErr = err;
            bestDir = dir;
            bestTheta = theta0;
          }
        });

        for (let i = 0; i < k; i++) {
          const id = cycle[i];
          const p = pos.get(id);
          const tx = cx + R * Math.cos(bestTheta + bestDir * ((2 * Math.PI * i) / k));
          const ty = cy + R * Math.sin(bestTheta + bestDir * ((2 * Math.PI * i) / k));
          disp.get(id).x += (tx - p.x) * 0.28;
          disp.get(id).y += (ty - p.y) * 0.28;
        }

        // Push exocyclic substituents (and depth-2 children like -CH2OH) radially outward from ring centroid
        cycle.forEach((cid) => {
          const cp = pos.get(cid);
          const { ux, uy } = safeUnitVec(cp.x - cx, cp.y - cy, 1);
          const nbs = adj.get(cid) || [];
          const exo = nbs
            .filter((e) => !ringAtomSet.has(e.to) && visibleSet.has(e.to))
            .sort((a, b) => {
              const ha = atomMap.get(a.to)?.element === 'H' ? 1 : 0;
              const hb = atomMap.get(b.to)?.element === 'H' ? 1 : 0;
              if (ha !== hb) return ha - hb;
              return String(a.to).localeCompare(String(b.to));
            });

          if (exo.length === 1) {
            const eid = exo[0].to;
            const ep = pos.get(eid);
            const L = idealBondLength(atomMap.get(cid).element, atomMap.get(eid).element);
            disp.get(eid).x += (cp.x + ux * L - ep.x) * 0.16;
            disp.get(eid).y += (cp.y + uy * L - ep.y) * 0.16;
          } else if (exo.length === 2) {
            const baseAng = Math.atan2(uy, ux);
            const ep0 = pos.get(exo[0].to);
            const ep1 = pos.get(exo[1].to);
            const d0 = normalizeAngle(Math.atan2(ep0.y - cp.y, ep0.x - cp.x) - baseAng);
            const d1 = normalizeAngle(Math.atan2(ep1.y - cp.y, ep1.x - cp.x) - baseAng);
            const firstSign = d0 <= d1 ? -1 : 1;
            exo.forEach((e, idx) => {
              const eid = e.to;
              const ep = pos.get(eid);
              const L = idealBondLength(atomMap.get(cid).element, atomMap.get(eid).element);
              const sign = idx === 0 ? firstSign : -firstSign;
              const ang = baseAng + sign * 0.62;
              disp.get(eid).x += (cp.x + Math.cos(ang) * L - ep.x) * 0.14;
              disp.get(eid).y += (cp.y + Math.sin(ang) * L - ep.y) * 0.14;
            });
          }

          // Depth-2 exocyclic radial clearance (keeps -CH2OH / -COOH tails outside the ring)
          exo.forEach((e) => {
            if (atomMap.get(e.to)?.element === 'H') return;
            const ep = pos.get(e.to);
            (adj.get(e.to) || []).forEach((subE) => {
              const subId = subE.to;
              if (subId === cid || ringAtomSet.has(subId) || !visibleSet.has(subId)) return;
              const sp = pos.get(subId);
              const { ux: rux, uy: ruy, dist: distC } = safeUnitVec(sp.x - cx, sp.y - cy, 3);
              const minRingClear = R + 48;
              if (distC < minRingClear) {
                const boost = (minRingClear - distC) * 0.22;
                disp.get(subId).x += rux * boost;
                disp.get(subId).y += ruy * boost;
              } else {
                const { ux: outUx, uy: outUy } = safeUnitVec(ep.x - cx, ep.y - cy, 5);
                disp.get(subId).x += outUx * 0.35;
                disp.get(subId).y += outUy * 0.35;
              }
            });
          });
        });
      });

      // 3. Local sibling angular repulsion (keeps -NH2, -OH, -CH3 cleanly fanned at ~120°)
      graph.atoms.forEach((center, cIdx) => {
        const nbs = (adj.get(center.id) || []).filter((e) => visibleSet.has(e.to));
        if (nbs.length < 2) return;
        const cp = pos.get(center.id);
        for (let i = 0; i < nbs.length; i++) {
          for (let j = i + 1; j < nbs.length; j++) {
            const a = nbs[i].to;
            const b = nbs[j].to;
            if (ringAtomSet.has(a) && ringAtomSet.has(b) && ringAtomSet.has(center.id)) continue;
            const pa = pos.get(a);
            const pb = pos.get(b);
            const { ux, uy, dist } = safeUnitVec(pb.x - pa.x, pb.y - pa.y, cIdx * 17 + i * 5 + j);
            const elA = atomMap.get(a).element;
            const elB = atomMap.get(b).element;
            const minChord = elA === 'H' && elB === 'H' ? 54 : elA === 'H' || elB === 'H' ? 64 : 108;
            if (dist < minChord) {
              const push = (minChord - dist) * 0.18;
              const wA = elA === 'H' && elB !== 'H' ? 0.85 : elB === 'H' && elA !== 'H' ? 0.15 : 0.5;
              const wB = 1 - wA;
              disp.get(a).x -= ux * push * wA;
              disp.get(a).y -= uy * push * wA;
              disp.get(b).x += ux * push * wB;
              disp.get(b).y += uy * push * wB;
            }
          }
        }
        if (nbs.length === 2 && (nbs[0].order === 3 || nbs[1].order === 3)) {
          const pa = pos.get(nbs[0].to);
          const pb = pos.get(nbs[1].to);
          disp.get(center.id).x += ((pa.x + pb.x) / 2 - cp.x) * 0.12;
          disp.get(center.id).y += ((pa.y + pb.y) / 2 - cp.y) * 0.12;
        }
      });

      // 4. Global non-bonded overlap repulsion
      for (let i = 0; i < visibleIds.length; i++) {
        for (let j = i + 1; j < visibleIds.length; j++) {
          const a = visibleIds[i];
          const b = visibleIds[j];
          const pa = pos.get(a);
          const pb = pos.get(b);
          const { ux, uy, dist } = safeUnitVec(pb.x - pa.x, pb.y - pa.y, i * 31 + j * 7);
          const elA = atomMap.get(a).element;
          const elB = atomMap.get(b).element;
          const minDist = elA === 'H' && elB === 'H' ? 46 : elA === 'H' || elB === 'H' ? 58 : 76;
          if (dist < minDist) {
            const push = (minDist - dist) * 0.24;
            const wA = elA === 'H' && elB !== 'H' ? 0.8 : elB === 'H' && elA !== 'H' ? 0.2 : 0.5;
            const wB = 1 - wA;
            disp.get(a).x -= ux * push * wA;
            disp.get(a).y -= uy * push * wA;
            disp.get(b).x += ux * push * wB;
            disp.get(b).y += uy * push * wB;
          }
        }
      }

      // 4b. Non-bonded atom vs bond segment clearance (prevents bonds cutting across atoms)
      for (let i = 0; i < visibleBonds.length; i++) {
        const bd = visibleBonds[i];
        const pa = pos.get(bd.from);
        const pb = pos.get(bd.to);
        const vx = pb.x - pa.x;
        const vy = pb.y - pa.y;
        const lenSq = vx * vx + vy * vy;
        if (lenSq < 1) continue;
        for (let j = 0; j < visibleIds.length; j++) {
          const nid = visibleIds[j];
          if (nid === bd.from || nid === bd.to) continue;
          if (draggedIds.has(nid) && draggedIds.has(bd.from) && draggedIds.has(bd.to)) continue;
          const pn = pos.get(nid);
          const t = ((pn.x - pa.x) * vx + (pn.y - pa.y) * vy) / lenSq;
          if (t < 0.14 || t > 0.86) continue;
          const projX = pa.x + t * vx;
          const projY = pa.y + t * vy;
          const minClear = atomMap.get(nid).element === 'H' ? 24 : 30;
          const { ux, uy, dist } = safeUnitVec(pn.x - projX, pn.y - projY, i * 19 + j * 13);
          if (dist < minClear) {
            const push = (minClear - dist) * 0.22;
            const wNode = atomMap.get(nid).element === 'H' ? 0.85 : 0.6;
            disp.get(nid).x += ux * push * wNode;
            disp.get(nid).y += uy * push * wNode;
            const wBond = (1 - wNode) * 0.5;
            disp.get(bd.from).x -= ux * push * wBond;
            disp.get(bd.from).y -= uy * push * wBond;
            disp.get(bd.to).x -= ux * push * wBond;
            disp.get(bd.to).y -= uy * push * wBond;
          }
        }
      }

      // 5. Apply clamped displacements
      const stepCap = 12 * (1 - iter / (iterations * 1.4));
      graph.atoms.forEach((a) => {
        const d = disp.get(a.id);
        const anchor = anchorPos.get(a.id);
        const soft = softAnchors ? softAnchors.get(a.id) : null;
        if (anchor && !ringAtomSet.has(a.id)) {
          d.x = d.x * 0.25 + (anchor.x - pos.get(a.id).x) * 0.35;
          d.y = d.y * 0.25 + (anchor.y - pos.get(a.id).y) * 0.35;
        } else if (soft) {
          const w = a.element === 'H' ? 0.28 : 0.34;
          d.x = d.x * 0.55 + (soft.x - pos.get(a.id).x) * w;
          d.y = d.y * 0.55 + (soft.y - pos.get(a.id).y) * w;
        }
        const mag = Math.hypot(d.x, d.y);
        if (mag > stepCap) {
          d.x = (d.x / mag) * stepCap;
          d.y = (d.y / mag) * stepCap;
        }
        pos.get(a.id).x += d.x;
        pos.get(a.id).y += d.y;
      });
    }

    if (draggedIds.size === 0 && visibleIds.length > 0) {
      let cx = 0;
      let cy = 0;
      visibleIds.forEach((id) => {
        cx += pos.get(id).x;
        cy += pos.get(id).y;
      });
      cx /= visibleIds.length;
      cy /= visibleIds.length;
      pos.forEach((p) => {
        p.x -= cx;
        p.y -= cy;
      });
    }

    return pos;
  }

  // =========================================================================
  // AUTO-DRAW GRAPH BUILDER & ANTI-TANGLE 2D LAYOUT SEEDER
  // =========================================================================

  function buildGraphFromCompound(compound, idGen) {
    const counts = { C: 0, H: 0, O: 0, N: 0, X: 0 };
    const nextId =
      typeof idGen === 'function'
        ? idGen
        : (prefix) => {
            counts[prefix] = (counts[prefix] || 0) + 1;
            return `${prefix}${counts[prefix]}`;
          };

    const els = compound.elements || [];
    const bds = compound.bonds || [];
    const atoms = [];
    const bonds = [];
    const heavyIds = [];
    const deg = new Array(els.length).fill(0);
    const dblO = new Array(els.length).fill(0);

    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      const prefix = el === 'C' ? 'c' : el === 'O' ? 'o' : el === 'N' ? 'n' : 'x';
      const id = nextId(prefix);
      heavyIds.push(id);
      atoms.push({ id, element: el });
    }

    for (let i = 0; i < bds.length; i++) {
      const [u, v, ord] = bds[i];
      const order = Number(ord || 1);
      if (heavyIds[u] && heavyIds[v]) {
        bonds.push({ from: heavyIds[u], to: heavyIds[v], order });
        deg[u] += order;
        deg[v] += order;
        if (order === 2) {
          if (els[u] === 'N' && els[v] === 'O') dblO[u]++;
          if (els[v] === 'N' && els[u] === 'O') dblO[v]++;
        }
      }
    }

    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      const isNitroN = el === 'N' && dblO[i] === 2;
      const miss = isNitroN ? 0 : Math.max(0, (ELEMENT_VALENCE[el] || 4) - deg[i]);
      for (let k = 0; k < miss; k++) {
        const hid = nextId('h');
        atoms.push({ id: hid, element: 'H' });
        bonds.push({ from: heavyIds[i], to: hid, order: 1 });
      }
    }

    return { graph: { atoms, bonds }, heavyIds };
  }

  function computeSmartInitialPositions(graph, heavyIds, compoundOrOpts) {
    const opts =
      compoundOrOpts &&
      (compoundOrOpts.preserveOrientationFrom ||
        compoundOrOpts.collapsedHIds ||
        typeof compoundOrOpts.showH === 'boolean' ||
        compoundOrOpts.compound)
        ? compoundOrOpts
        : { compound: compoundOrOpts };
    const compound = opts.compound || null;
    const collapsedHIds = opts.collapsedHIds || new Set();
    const showH = typeof opts.showH === 'boolean' ? opts.showH : state.showH;
    const preserveFrom = opts.preserveOrientationFrom || null;

    const { atomMap, adj } = buildAdjacency(graph);
    const positions = new Map();
    const heavySet = new Set(heavyIds);
    const cid = compound?.id || '';
    let pinHeavy = false;
    let backbone = [];
    const atomRingCenter = new Map();

    const heavyGraph = {
      atoms: graph.atoms.filter((a) => heavySet.has(a.id)),
      bonds: graph.bonds.filter((b) => heavySet.has(b.from) && heavySet.has(b.to))
    };

    const rings = findSmallRings(heavyGraph);

    if (cid === 'naphthalene' && heavyIds.length === 10) {
      const edge = 84;
      const dx = (edge * Math.sqrt(3)) / 2;
      const dy = edge / 2;
      const coords = [
        [-2 * dx, dy],
        [-2 * dx, -dy],
        [-dx, -2 * dy],
        [0, -dy],
        [0, dy],
        [-dx, 2 * dy],
        [dx, -2 * dy],
        [2 * dx, -dy],
        [2 * dx, dy],
        [dx, 2 * dy]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x, y }));
    } else if (cid === 'cubane' && heavyIds.length === 8) {
      const s = 1.22;
      const coords = [
        [-42, -38],
        [42, -38],
        [42, 46],
        [-42, 46],
        [-10, -70],
        [74, -70],
        [74, 14],
        [-10, 14]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
      pinHeavy = true;
    } else if (cid === 'adamantane' && heavyIds.length === 10) {
      const s = 1.22;
      const coords = [
        [0, -86],
        [-78, 44],
        [78, 44],
        [14, -8],
        [-72, -32],
        [72, -32],
        [-18, -42],
        [0, 84],
        [-32, 16],
        [48, 12]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
      pinHeavy = true;
    } else if (cid === 'spiropentane' && heavyIds.length === 5) {
      const s = 1.22;
      const coords = [
        [0, 0],
        [-58, -34],
        [-58, 34],
        [58, -34],
        [58, 34]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
    } else if (cid === 'azulene' && heavyIds.length === 10) {
      const s = 1.22;
      const coords = [
        [0, -34],
        [-65, -55],
        [-105, 0],
        [-65, 55],
        [0, 34],
        [53, 76],
        [120, 61],
        [149, 0],
        [120, -61],
        [53, -76]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
    } else if (cid === 'prismane' && heavyIds.length === 6) {
      const s = 1.22;
      const coords = [
        [-66, -4],
        [-12, -46],
        [-14, 42],
        [20, 8],
        [74, -34],
        [72, 54]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
      pinHeavy = true;
    } else if (cid === 'dewar-benzene' && heavyIds.length === 6) {
      const s = 1.22;
      const coords = [
        [-62, -42],
        [-62, 26],
        [0, 42],
        [62, 26],
        [62, -42],
        [0, -26]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
      pinHeavy = true;
    } else if (cid === 'tetrahedrane' && heavyIds.length === 4) {
      const s = 1.22;
      const coords = [
        [0, -56],
        [-52, 34],
        [52, 34],
        [6, 6]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
      pinHeavy = true;
    } else if (cid === 'penguinone' && heavyIds.length === 11) {
      const s = 1.22;
      const coords = [
        [0, -64],
        [55, -32],
        [55, 32],
        [0, 64],
        [-55, 32],
        [-55, -32],
        [46, -98],
        [114, 48],
        [-36, 116],
        [36, 116],
        [-114, 48]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
      pinHeavy = true;
    } else if (cid === 'carbon-suboxide' && heavyIds.length === 5) {
      const s = 1.22;
      const coords = [
        [-120, 0],
        [-60, 0],
        [0, 0],
        [60, 0],
        [120, 0]
      ];
      coords.forEach(([x, y], i) => positions.set(heavyIds[i], { x: x * s, y: y * s }));
      pinHeavy = true;
    } else if (cid === 'sucrose' && heavyIds.length === 23) {
      const s = 1.24;
      const ringLeft = [
        [-44, 0],
        [-75, 54],
        [-137, 54],
        [-168, 0],
        [-137, -54],
        [-75, -54]
      ];
      ringLeft.forEach(([x, y], i) => {
        positions.set(heavyIds[i], { x: x * s, y: y * s });
        atomRingCenter.set(heavyIds[i], { x: -106 * s, y: 0, R: 62 * s });
      });
      positions.set(heavyIds[11], { x: 0, y: 18 * s });
      const ringRight = [
        [50, 0],
        [89, 53],
        [151, 33],
        [151, -33],
        [89, -53]
      ];
      ringRight.forEach(([x, y], i) => {
        positions.set(heavyIds[12 + i], { x: x * s, y: y * s });
        atomRingCenter.set(heavyIds[12 + i], { x: 108 * s, y: 0, R: 54 * s });
      });
    } else if (cid === 'maltose' && heavyIds.length === 23) {
      const s = 1.24;
      const ringLeft = [
        [-46, 0],
        [-77, 54],
        [-139, 54],
        [-170, 0],
        [-139, -54],
        [-77, -54]
      ];
      ringLeft.forEach(([x, y], i) => {
        positions.set(heavyIds[i], { x: x * s, y: y * s });
        atomRingCenter.set(heavyIds[i], { x: -108 * s, y: 0, R: 62 * s });
      });
      positions.set(heavyIds[11], { x: 0, y: 18 * s });
      const ringRight = [
        [170, 0],
        [139, 54],
        [77, 54],
        [46, 0],
        [77, -54],
        [139, -54]
      ];
      ringRight.forEach(([x, y], i) => {
        positions.set(heavyIds[12 + i], { x: x * s, y: y * s });
        atomRingCenter.set(heavyIds[12 + i], { x: 108 * s, y: 0, R: 62 * s });
      });
    } else if (rings.length > 0) {
      rings.sort((a, b) => b.length - a.length);
      const primary = rings[0];
      const k0 = primary.length;
      const R0 = 84 / (2 * Math.sin(Math.PI / k0));
      for (let i = 0; i < k0; i++) {
        const ang = -Math.PI / 2 + (2 * Math.PI * i) / k0;
        positions.set(primary[i], { x: R0 * Math.cos(ang), y: R0 * Math.sin(ang) });
        atomRingCenter.set(primary[i], { x: 0, y: 0, R: R0 });
      }

      // Place additional fused or spiro rings deterministically
      let fusedSafety = 0;
      while (fusedSafety < rings.length * 2) {
        fusedSafety++;
        let progress = false;
        for (let rIdx = 1; rIdx < rings.length; rIdx++) {
          const ring = rings[rIdx];
          const k = ring.length;
          const placedIdx = [];
          for (let i = 0; i < k; i++) {
            if (positions.has(ring[i])) placedIdx.push(i);
          }
          if (placedIdx.length === k || placedIdx.length === 0) continue;

          let sharedA = -1;
          let sharedB = -1;
          for (let i = 0; i < k; i++) {
            const nxt = (i + 1) % k;
            if (positions.has(ring[i]) && positions.has(ring[nxt])) {
              sharedA = i;
              sharedB = nxt;
              break;
            }
          }
          if (sharedA !== -1 && placedIdx.length === 2) {
            const pA = positions.get(ring[sharedA]);
            const pB = positions.get(ring[sharedB]);
            const midX = (pA.x + pB.x) / 2;
            const midY = (pA.y + pB.y) / 2;
            const chord = Math.hypot(pB.x - pA.x, pB.y - pA.y) || 84;
            const apothem = chord / 2 / Math.tan(Math.PI / k);
            const refCenter = atomRingCenter.get(ring[sharedA]) || { x: 0, y: 0 };
            const { ux, uy } = safeUnitVec(midX - refCenter.x, midY - refCenter.y, rIdx + 1);
            const cx = midX + ux * apothem;
            const cy = midY + uy * apothem;
            const R = chord / 2 / Math.sin(Math.PI / k);
            const angA = Math.atan2(pA.y - cy, pA.x - cx);
            const angB = Math.atan2(pB.y - cy, pB.x - cx);
            const delta = normalizeAngle(angB - angA);
            const dir = delta >= 0 ? 1 : -1;
            const step = (2 * Math.PI) / k;
            for (let stepIdx = 0; stepIdx < k; stepIdx++) {
              const idx = (sharedA + stepIdx) % k;
              const ang = angA + dir * step * stepIdx;
              if (!positions.has(ring[idx])) {
                positions.set(ring[idx], { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) });
              }
              if (!atomRingCenter.has(ring[idx])) {
                atomRingCenter.set(ring[idx], { x: cx, y: cy, R });
              }
            }
            progress = true;
          } else if (placedIdx.length === 1) {
            const pIdx = placedIdx[0];
            const pPos = positions.get(ring[pIdx]);
            const refCenter = atomRingCenter.get(ring[pIdx]) || { x: 0, y: 0 };
            const { ux, uy } = safeUnitVec(pPos.x - refCenter.x, pPos.y - refCenter.y, rIdx + 7);
            const R = 84 / (2 * Math.sin(Math.PI / k));
            const cx = pPos.x + ux * R;
            const cy = pPos.y + uy * R;
            const angStart = Math.atan2(pPos.y - cy, pPos.x - cx);
            for (let stepIdx = 0; stepIdx < k; stepIdx++) {
              const idx = (pIdx + stepIdx) % k;
              const ang = angStart + (2 * Math.PI * stepIdx) / k;
              if (!positions.has(ring[idx])) {
                positions.set(ring[idx], { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) });
              }
              if (!atomRingCenter.has(ring[idx])) {
                atomRingCenter.set(ring[idx], { x: cx, y: cy, R });
              }
            }
            progress = true;
          }
        }
        if (!progress) break;
      }
    } else if (heavyIds.length === 1) {
      positions.set(heavyIds[0], { x: 0, y: 0 });
      backbone = [heavyIds[0]];
    } else if (heavyIds.length > 1) {
      const bfsFarthest = (startId) => {
        const dist = new Map([[startId, 0]]);
        const cScore = new Map([[startId, atomMap.get(startId)?.element === 'C' ? 1 : 0]]);
        const parent = new Map([[startId, null]]);
        const q = [startId];
        let farId = startId;
        while (q.length) {
          const u = q.shift();
          const du = dist.get(u);
          const df = dist.get(farId);
          if (du > df || (du === df && (cScore.get(u) || 0) > (cScore.get(farId) || 0))) {
            farId = u;
          }
          const nbs = (adj.get(u) || [])
            .filter((e) => heavySet.has(e.to))
            .sort((a, b) => {
              const ca = atomMap.get(a.to)?.element === 'C' ? 0 : 1;
              const cb = atomMap.get(b.to)?.element === 'C' ? 0 : 1;
              return ca - cb;
            });
          nbs.forEach((e) => {
            if (dist.has(e.to)) return;
            dist.set(e.to, du + 1);
            cScore.set(e.to, (cScore.get(u) || 0) + (atomMap.get(e.to)?.element === 'C' ? 1 : 0));
            parent.set(e.to, u);
            q.push(e.to);
          });
        }
        return { farId, parent };
      };
      const pass1 = bfsFarthest(heavyIds[0]);
      const pass2 = bfsFarthest(pass1.farId);
      let cur = pass2.farId;
      while (cur) {
        backbone.unshift(cur);
        cur = pass2.parent.get(cur);
      }

      if (preserveFrom && backbone.length >= 2) {
        const pStart = preserveFrom.get(backbone[0]);
        const pEnd = preserveFrom.get(backbone[backbone.length - 1]);
        if (pStart && pEnd && pEnd.x < pStart.x - 8) {
          backbone.reverse();
        }
      }

      positions.set(backbone[0], { x: 0, y: 0 });
      let zigDir = -1;
      let prevOrd = 1;
      let prevAngle = 0;
      for (let i = 1; i < backbone.length; i++) {
        const prevId = backbone[i - 1];
        const curId = backbone[i];
        const pPos = positions.get(prevId);
        const edge = (adj.get(prevId) || []).find((e) => e.to === curId);
        const curOrd = edge ? edge.order : 1;
        const L = idealBondLength(atomMap.get(prevId).element, atomMap.get(curId).element);
        const nextTriple =
          i === 1 &&
          backbone.length > 2 &&
          ((adj.get(curId) || []).find((e) => e.to === backbone[2])?.order === 3);

        let angle;
        if (curOrd === 3 || prevOrd === 3 || nextTriple) {
          angle = i === 1 ? 0 : prevAngle;
        } else {
          angle = zigDir * (Math.PI / 6);
          zigDir *= -1;
        }
        positions.set(curId, {
          x: pPos.x + L * Math.cos(angle),
          y: pPos.y + L * Math.sin(angle)
        });
        prevOrd = curOrd;
        prevAngle = angle;
      }
    }

    const ringAtomSet = new Set();
    rings.forEach((r) => r.forEach((id) => ringAtomSet.add(id)));

    const getBranchSize = (rootId, blockedParentId) => {
      const seen = new Set([rootId, blockedParentId]);
      const q = [rootId];
      let count = 0;
      while (q.length) {
        const u = q.shift();
        count++;
        (adj.get(u) || []).forEach((e) => {
          if (!heavySet.has(e.to) || seen.has(e.to) || positions.has(e.to)) return;
          seen.add(e.to);
          q.push(e.to);
        });
      }
      return count;
    };

    // BFS outward to seed any remaining heavy branches away from rings & backbones
    let safety = 0;
    while (positions.size < heavyIds.length && safety < 28) {
      safety++;
      const byParent = new Map();
      heavyIds.forEach((hid) => {
        if (positions.has(hid)) return;
        const placedNb = (adj.get(hid) || []).find((e) => positions.has(e.to));
        if (!placedNb) return;
        if (!byParent.has(placedNb.to)) byParent.set(placedNb.to, []);
        byParent.get(placedNb.to).push(hid);
      });
      if (byParent.size === 0) break;

      byParent.forEach((children, pid) => {
        const pPos = positions.get(pid);
        const pEl = atomMap.get(pid).element;
        const rc = atomRingCenter.get(pid) || null;
        const occupied = [];
        const placedNeighbors = [];
        (adj.get(pid) || []).forEach((e) => {
          if (positions.has(e.to)) {
            const np = positions.get(e.to);
            occupied.push(Math.atan2(np.y - pPos.y, np.x - pPos.x));
            placedNeighbors.push({ id: e.to, pos: np });
          }
        });

        let angles = null;

        if (rc && ringAtomSet.has(pid)) {
          const outAng = Math.atan2(pPos.y - rc.y, pPos.x - rc.x);
          if (children.length === 1 && placedNeighbors.length === 2) {
            angles = [outAng];
          } else if (children.length === 2) {
            // Order larger substituent (-CH2OH) toward the less-crowded neighboring ring vertex (e.g. O5 in pyranose)
            const sized = children
              .map((ch) => ({ id: ch, size: getBranchSize(ch, pid) }))
              .sort((a, b) => b.size - a.size);
            const ringNbs = placedNeighbors.filter((n) => ringAtomSet.has(n.id));
            let signBig = -1;
            if (ringNbs.length === 2) {
              const exoCount = (nid) =>
                (adj.get(nid) || []).filter((e) => heavySet.has(e.to) && !ringAtomSet.has(e.to)).length +
                ((adj.get(nid) || []).some((e) => atomMap.get(e.to)?.element === 'H') ? 0.5 : 0);
              const load0 = exoCount(ringNbs[0].id);
              const load1 = exoCount(ringNbs[1].id);
              const preferredNb = load0 <= load1 ? ringNbs[0] : ringNbs[1];
              const nbDelta = normalizeAngle(
                Math.atan2(preferredNb.pos.y - pPos.y, preferredNb.pos.x - pPos.x) - outAng
              );
              signBig = nbDelta >= 0 ? 1 : -1;
            }
            const angMap = new Map([
              [sized[0].id, outAng + signBig * 0.56],
              [sized[1].id, outAng - signBig * 0.56]
            ]);
            angles = children.map((ch) => angMap.get(ch));
          }
        } else if (rc && !ringAtomSet.has(pid) && children.length === 1 && placedNeighbors.length === 1) {
          // Depth >= 2 exocyclic substituent (e.g. OH of -CH2OH): choose 120-deg zigzag arm pointing farthest from ring center
          const gp = placedNeighbors[0].pos;
          const inAng = Math.atan2(pPos.y - gp.y, pPos.x - gp.x);
          const cands = [normalizeAngle(inAng - Math.PI / 3), normalizeAngle(inAng + Math.PI / 3)];
          const L = idealBondLength(pEl, atomMap.get(children[0]).element);
          let bestAng = cands[0];
          let bestScore = -Infinity;
          cands.forEach((ang) => {
            const tx = pPos.x + L * Math.cos(ang);
            const ty = pPos.y + L * Math.sin(ang);
            const distFromRing = Math.hypot(tx - rc.x, ty - rc.y);
            let minPeerDist = Infinity;
            positions.forEach((op, oid) => {
              if (oid === pid) return;
              const d = Math.hypot(tx - op.x, ty - op.y);
              if (d < minPeerDist) minPeerDist = d;
            });
            const score = distFromRing + Math.min(minPeerDist, 140) * 1.4;
            if (score > bestScore) {
              bestScore = score;
              bestAng = ang;
            }
          });
          angles = [bestAng];
        } else if (!rc && placedNeighbors.length === 2 && (children.length === 1 || children.length === 2)) {
          // Backbone exterior vertex: point substituents outward from the apex of the zigzag V
          const v0x = placedNeighbors[0].pos.x - pPos.x;
          const v0y = placedNeighbors[0].pos.y - pPos.y;
          const d0 = Math.hypot(v0x, v0y) || 1;
          const v1x = placedNeighbors[1].pos.x - pPos.x;
          const v1y = placedNeighbors[1].pos.y - pPos.y;
          const d1 = Math.hypot(v1x, v1y) || 1;
          const sumX = v0x / d0 + v1x / d1;
          const sumY = v0y / d0 + v1y / d1;
          if (Math.hypot(sumX, sumY) > 0.1) {
            const extAng = Math.atan2(-sumY, -sumX);
            angles = children.length === 1 ? [extAng] : [extAng - 0.55, extAng + 0.55];
          }
        }

        if (!angles) {
          angles = pickOpenAngles(occupied, children.length);
        }

        children.forEach((childId, idx) => {
          const ang = angles[idx] ?? 0;
          const L = idealBondLength(pEl, atomMap.get(childId).element);
          positions.set(childId, {
            x: pPos.x + L * Math.cos(ang),
            y: pPos.y + L * Math.sin(ang)
          });
          if (rc && !atomRingCenter.has(childId)) {
            atomRingCenter.set(childId, rc);
          }
        });
      });
    }

    // Disconnected fallback if any isolated heavy atom remained unplaced
    heavyIds.forEach((hid, idx) => {
      if (!positions.has(hid)) positions.set(hid, { x: idx * 60, y: 0 });
    });

    // Seed explicit H atoms symmetrically outward from each heavy atom
    heavyIds.forEach((pid) => {
      const hAll = (adj.get(pid) || [])
        .map((e) => e.to)
        .filter((tid) => atomMap.get(tid)?.element === 'H' && !positions.has(tid));
      if (hAll.length === 0) return;
      const pPos = positions.get(pid);
      const pEl = atomMap.get(pid).element;

      const visibleHs = [];
      hAll.forEach((hid) => {
        if (!showH || collapsedHIds.has(hid)) {
          positions.set(hid, { x: pPos.x, y: pPos.y });
        } else {
          visibleHs.push(hid);
        }
      });
      if (visibleHs.length === 0) return;

      const occupied = [];
      (adj.get(pid) || []).forEach((e) => {
        if (atomMap.get(e.to)?.element === 'H' && (!showH || collapsedHIds.has(e.to))) return;
        if (positions.has(e.to)) {
          const np = positions.get(e.to);
          occupied.push(Math.atan2(np.y - pPos.y, np.x - pPos.x));
        }
      });
      const angles = pickOpenAngles(occupied, visibleHs.length);
      visibleHs.forEach((hid, idx) => {
        const ang = angles[idx] ?? 0;
        const L = idealBondLength(pEl, 'H');
        positions.set(hid, {
          x: pPos.x + L * Math.cos(ang),
          y: pPos.y + L * Math.sin(ang)
        });
      });
    });

    const softAnchors = new Map();
    if (!pinHeavy && rings.length === 0 && backbone.length >= 2) {
      backbone.forEach((id) => {
        const bp = positions.get(id);
        if (bp) softAnchors.set(id, { x: bp.x, y: bp.y });
        (adj.get(id) || []).forEach((e) => {
          if (atomMap.get(e.to)?.element === 'H' && showH && !collapsedHIds.has(e.to)) {
            const hp = positions.get(e.to);
            if (hp) softAnchors.set(e.to, { x: hp.x, y: hp.y });
          }
        });
      });
    }

    const settled = relaxLayout(graph, positions, {
      draggedIds: pinHeavy ? new Set(heavyIds) : new Set(),
      collapsedHIds,
      iterations: pinHeavy ? 45 : 155,
      showH,
      softAnchors: softAnchors.size > 0 ? softAnchors : null
    });

    const visIds = graph.atoms
      .filter((a) => (showH && !collapsedHIds.has(a.id)) || a.element !== 'H')
      .map((a) => a.id);
    if (visIds.length > 0) {
      let cx = 0;
      let cy = 0;
      visIds.forEach((id) => {
        const p = settled.get(id);
        cx += p.x;
        cy += p.y;
      });
      cx /= visIds.length;
      cy /= visIds.length;
      settled.forEach((p) => {
        p.x -= cx;
        p.y -= cy;
      });
    }

    return { positions: settled, pinHeavy };
  }

  function canonicalizeMoleculeLayout(graph) {
    if (!graph) return new Map();
    const heavyIds = graph.atoms.filter((a) => a.element !== 'H').map((a) => a.id);
    if (heavyIds.length === 0) return new Map();
    const { positions } = computeSmartInitialPositions(graph, heavyIds, {
      preserveOrientationFrom: state.positions,
      collapsedHIds: state.collapsedHIds,
      showH: state.showH
    });
    return positions;
  }

  function computeTargetViewBox(pos, valenceSlots, atomMap, showH, zoom, panX, panY, collapsedHIds = new Set()) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    pos.forEach((p, id) => {
      const atom = atomMap.get(id);
      if (!atom || ((!showH || collapsedHIds.has(id)) && atom.element === 'H')) return;
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    valenceSlots.forEach((sl) => {
      if (sl.x < minX) minX = sl.x;
      if (sl.x > maxX) maxX = sl.x;
      if (sl.y < minY) minY = sl.y;
      if (sl.y > maxY) maxY = sl.y;
    });

    const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom || 1));
    const px = Number.isFinite(panX) ? panX : 0;
    const py = Number.isFinite(panY) ? panY : 0;
    if (!Number.isFinite(minX)) {
      const w = 400 / z;
      const h = 240 / z;
      return { x: -w / 2 - px, y: -h / 2 - py, w, h };
    }

    const padX = 64;
    const padY = 56;
    const baseW = Math.max(380, maxX - minX + padX * 2);
    const baseH = Math.max(230, maxY - minY + padY * 2);
    const w = baseW / z;
    const h = baseH / z;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    return { x: cx - w / 2 - px, y: cy - h / 2 - py, w, h };
  }

  // =========================================================================
  // FLAT MATTE VECTOR SVG RENDERER + DRAG & ZOOM & RESTRAINED MOTION
  // =========================================================================

  function createSvgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => el.setAttribute(k, String(attrs[k])));
    }
    return el;
  }

  const scene = {
    svg: null,
    bgRect: null,
    layerSlots: null,
    layerBonds: null,
    layerAtoms: null,
    atomNodes: new Map(),
    bondNodes: new Map(),
    currentPos: new Map(),
    startPos: new Map(),
    targetPos: new Map(),
    currentVB: null,
    startVB: null,
    targetVB: null,
    rafId: null,
    ambientRafId: null,
    visibilityObserver: null,
    visibilityBound: false,
    animStart: 0,
    animDuration: 190,
    lastAtomMap: null,
    exitingIds: new Set(),
    drag: null,
    pan: null,
    toolbarHDrag: null,
    suppressAddHClick: false,
    mergePreviewId: null
  };

  function ensureSVGScene() {
    if (!dom.svgHost) return null;
    if (scene.svg && scene.svg.parentNode === dom.svgHost) return scene.svg;

    dom.svgHost.innerHTML = '';
    const svg = createSvgEl('svg', {
      class: 'org-svg',
      viewBox: '-200 -120 400 240',
      role: 'img'
    });

    const defs = createSvgEl('defs');
    defs.innerHTML = `
      <pattern id="orgGridDots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.85" fill="rgba(148, 163, 184, 0.1)" />
      </pattern>
    `;
    svg.appendChild(defs);

    scene.bgRect = createSvgEl('rect', {
      x: -260,
      y: -180,
      width: 520,
      height: 360,
      fill: 'url(#orgGridDots)',
      'pointer-events': 'none'
    });
    svg.appendChild(scene.bgRect);

    scene.layerSlots = createSvgEl('g', { class: 'org-layer-slots' });
    scene.layerBonds = createSvgEl('g', { class: 'org-layer-bonds' });
    scene.layerAtoms = createSvgEl('g', { class: 'org-layer-atoms' });

    svg.appendChild(scene.layerSlots);
    svg.appendChild(scene.layerBonds);
    svg.appendChild(scene.layerAtoms);

    dom.svgHost.appendChild(svg);
    scene.svg = svg;
    scene.atomNodes.clear();
    scene.bondNodes.clear();
    scene.currentPos.clear();
    scene.mergePreviewId = null;
    scene.currentVB = { x: -200, y: -120, w: 400, h: 240 };
    return svg;
  }

  function prefersReducedMotion() {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function hashAtomId(id) {
    let h = 2166136261;
    const s = String(id);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function getAmbientOffset(id, element, now) {
    if (!now || prefersReducedMotion() || scene.exitingIds.has(id)) {
      return { dx: 0, dy: 0 };
    }
    if (scene.drag && scene.drag.atomId === id) {
      return { dx: 0, dy: 0 };
    }
    const seed = hashAtomId(id);
    const freqX = 0.00105 + ((seed % 37) / 37) * 0.00055;
    const freqY = 0.00095 + (((seed >> 4) % 41) / 41) * 0.00055;
    const phaseX = (seed % 628) / 100;
    const phaseY = ((seed >> 3) % 628) / 100;
    const ampX = element === 'H' ? 2.4 : 1.85;
    const ampY = element === 'H' ? 2.0 : 1.5;
    return {
      dx: Math.sin(now * freqX + phaseX) * ampX,
      dy: Math.cos(now * freqY + phaseY) * ampY
    };
  }

  function getRenderedPos(id, now) {
    const base = scene.currentPos.get(id) || state.positions.get(id);
    if (!base) return null;
    const entry = scene.atomNodes.get(id);
    const el = entry?.element || scene.lastAtomMap?.get(id)?.element || 'C';
    const off = getAmbientOffset(id, el, now);
    return { x: base.x + off.dx, y: base.y + off.dy };
  }

  function applyRenderedPositions(now) {
    const renderedMap = new Map();
    scene.atomNodes.forEach((entry, id) => {
      const rp = getRenderedPos(id, now);
      if (!rp) return;
      renderedMap.set(id, rp);
      entry.g.setAttribute('transform', `translate(${rp.x.toFixed(1)}, ${rp.y.toFixed(1)})`);
    });

    scene.bondNodes.forEach((bEntry) => {
      const pa = renderedMap.get(bEntry.from);
      const pb = renderedMap.get(bEntry.to);
      if (pa && pb) updateBondGeometry(bEntry, pa, pb);
    });

    updateSlotsGeometry(renderedMap);
  }

  function isStageVisible() {
    return Boolean(
      dom.panel &&
        !dom.panel.classList.contains('hidden') &&
        dom.svgHost &&
        dom.svgHost.offsetParent !== null &&
        !document.hidden &&
        !prefersReducedMotion()
    );
  }

  function stopAmbientLoop() {
    if (scene.ambientRafId) {
      cancelAnimationFrame(scene.ambientRafId);
      scene.ambientRafId = null;
    }
  }

  function startAmbientLoop() {
    if (scene.ambientRafId || !isStageVisible() || scene.atomNodes.size === 0) return;
    function ambientTick(now) {
      if (!isStageVisible() || scene.atomNodes.size === 0) {
        scene.ambientRafId = null;
        return;
      }
      if (!scene.rafId && !scene.pan) {
        applyRenderedPositions(now);
      }
      scene.ambientRafId = requestAnimationFrame(ambientTick);
    }
    scene.ambientRafId = requestAnimationFrame(ambientTick);
  }

  function formatAtomDisplay(atom, adj, atomMap, extraCollapsedH = 0) {
    const st = ATOM_STYLE[atom.element] || ATOM_STYLE.C;
    let collapsedCount = 0;

    if (atom.element === 'C') {
      collapsedCount =
        (adj.get(atom.id) || []).filter(
          (e) => atomMap.get(e.to)?.element === 'H' && state.collapsedHIds.has(e.to)
        ).length + extraCollapsedH;
    } else if (atom.element === 'O' || atom.element === 'N') {
      collapsedCount =
        (adj.get(atom.id) || []).filter(
          (e) =>
            atomMap.get(e.to)?.element === 'H' &&
            (!state.showH || state.collapsedHIds.has(e.to))
        ).length + extraCollapsedH;
    }

    if (collapsedCount <= 0) {
      return {
        label: atom.element,
        radius: ATOM_RADIUS[atom.element] || 16,
        fontSize: st.fontSize,
        collapsedCount: 0
      };
    }

    const label =
      atom.element === 'O' && collapsedCount === 2
        ? 'H₂O'
        : collapsedCount === 1
          ? `${atom.element}H`
          : `${atom.element}H${toSubscript(collapsedCount)}`;

    let radius = ATOM_RADIUS[atom.element] || 17;
    let fontSize = st.fontSize;
    if (label.length === 2) {
      radius = Math.max(radius, 19.5);
      fontSize = 11.5;
    } else if (label.length >= 3) {
      radius = Math.max(radius, 21);
      fontSize = 10.6;
    }

    return { label, radius, fontSize, collapsedCount };
  }

  function updateBondGeometry(entry, pa, pb) {
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;
    const nx = -uy;
    const ny = ux;

    const rA = scene.atomNodes.get(entry.from)?.r || ATOM_RADIUS[entry.elA] || 16;
    const rB = scene.atomNodes.get(entry.to)?.r || ATOM_RADIUS[entry.elB] || 16;

    const offsets = entry.order === 1 ? [0] : entry.order === 2 ? [-3.4, 3.4] : [-4.8, 0, 4.8];

    for (let i = 0; i < entry.lines.length; i++) {
      const o = offsets[i] || 0;
      const trimA = Math.sqrt(Math.max(0, rA * rA - o * o));
      const trimB = Math.sqrt(Math.max(0, rB * rB - o * o));
      const usable = dist - trimA - trimB;

      let x1, y1, x2, y2;
      if (usable > 2) {
        x1 = pa.x + ux * trimA + nx * o;
        y1 = pa.y + uy * trimA + ny * o;
        x2 = pb.x - ux * trimB + nx * o;
        y2 = pb.y - uy * trimB + ny * o;
      } else {
        x1 = pa.x + nx * o;
        y1 = pa.y + ny * o;
        x2 = pb.x + nx * o;
        y2 = pb.y + ny * o;
      }

      const ln = entry.lines[i];
      ln.setAttribute('x1', x1.toFixed(1));
      ln.setAttribute('y1', y1.toFixed(1));
      ln.setAttribute('x2', x2.toFixed(1));
      ln.setAttribute('y2', y2.toFixed(1));
    }

    if (entry.hitLine) {
      entry.hitLine.setAttribute('x1', pa.x.toFixed(1));
      entry.hitLine.setAttribute('y1', pa.y.toFixed(1));
      entry.hitLine.setAttribute('x2', pb.x.toFixed(1));
      entry.hitLine.setAttribute('y2', pb.y.toFixed(1));
    }
  }

  function updateSlotsGeometry(posMap) {
    if (!scene.layerSlots) return;
    const source = posMap || scene.currentPos;
    const slotEls = scene.layerSlots.children;
    for (let i = 0; i < slotEls.length; i++) {
      const g = slotEls[i];
      const cid = g.dataset.slotAtomId;
      const ang = Number(g.dataset.slotAngle || 0);
      const cp = source.get(cid);
      if (!cp) continue;
      const rA = scene.atomNodes.get(cid)?.r || ATOM_RADIUS[scene.lastAtomMap?.get(cid)?.element] || 18;
      const len = rA + 22;
      const sx = cp.x + len * Math.cos(ang);
      const sy = cp.y + len * Math.sin(ang);
      const startX = cp.x + (rA + 4) * Math.cos(ang);
      const startY = cp.y + (rA + 4) * Math.sin(ang);
      const ln = g.querySelector('.org-slot-stem');
      const dot = g.querySelector('.org-slot-dot');
      const hit = g.querySelector('.org-slot-hit');
      if (ln) {
        ln.setAttribute('x1', startX.toFixed(1));
        ln.setAttribute('y1', startY.toFixed(1));
        ln.setAttribute('x2', (sx - 4 * Math.cos(ang)).toFixed(1));
        ln.setAttribute('y2', (sy - 4 * Math.sin(ang)).toFixed(1));
      }
      if (dot) {
        dot.setAttribute('cx', sx.toFixed(1));
        dot.setAttribute('cy', sy.toFixed(1));
      }
      if (hit) {
        hit.setAttribute('cx', sx.toFixed(1));
        hit.setAttribute('cy', sy.toFixed(1));
      }
    }
  }

  function renderFrameAt(progress) {
    const ease = 1 - Math.pow(1 - progress, 2);

    if (scene.startVB && scene.targetVB) {
      const vb = {
        x: scene.startVB.x + (scene.targetVB.x - scene.startVB.x) * ease,
        y: scene.startVB.y + (scene.targetVB.y - scene.startVB.y) * ease,
        w: scene.startVB.w + (scene.targetVB.w - scene.startVB.w) * ease,
        h: scene.startVB.h + (scene.targetVB.h - scene.startVB.h) * ease
      };
      scene.currentVB = vb;
      scene.svg.setAttribute(
        'viewBox',
        `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`
      );
      scene.bgRect.setAttribute('x', (vb.x - 160).toFixed(1));
      scene.bgRect.setAttribute('y', (vb.y - 160).toFixed(1));
      scene.bgRect.setAttribute('width', (vb.w + 320).toFixed(1));
      scene.bgRect.setAttribute('height', (vb.h + 320).toFixed(1));
    }

    scene.atomNodes.forEach((entry, id) => {
      const sPos = scene.startPos.get(id);
      const tPos = scene.targetPos.get(id);
      if (!sPos || !tPos) return;
      const x = sPos.x + (tPos.x - sPos.x) * ease;
      const y = sPos.y + (tPos.y - sPos.y) * ease;
      scene.currentPos.set(id, { x, y });
    });

    applyRenderedPositions(performance.now());
  }

  function computeOpenSlotsForSelected(graph, positions, atomMap, adj) {
    const slots = [];
    const selId = state.selectedId;
    if (!selId || state.connectMode) return slots;
    const atom = atomMap.get(selId);
    if (!atom || atom.element === 'H') return slots;
    const miss = getMissingValence(atomMap, adj, selId);
    if (miss <= 0) return slots;
    const pPos = positions.get(selId);
    if (!pPos) return slots;

    const occupied = [];
    (adj.get(selId) || []).forEach((e) => {
      const nbEl = atomMap.get(e.to)?.element;
      if (nbEl === 'H' && (!state.showH || state.collapsedHIds.has(e.to))) return;
      const np = positions.get(e.to);
      if (np) occupied.push(Math.atan2(np.y - pPos.y, np.x - pPos.x));
    });

    const angles = pickOpenAngles(occupied, miss);
    const disp = formatAtomDisplay(atom, adj, atomMap, 0);
    const rA = disp.radius;
    const len = rA + 22;
    angles.forEach((ang) => {
      slots.push({
        atomId: selId,
        angle: ang,
        x: pPos.x + len * Math.cos(ang),
        y: pPos.y + len * Math.sin(ang)
      });
    });
    return slots;
  }

  // Topological parent-grouped seeding: places children symmetrically AWAY from parent's existing bonds!
  // Prevents -NH2 (2 H on N), -COOH (=O and -O-H on C), or Auto-fill H from ever overlapping or covering C!
  function seedNewAtomPositions(graph, newAtomParents, atomMap, adj) {
    let remaining = graph.atoms.filter((a) => !state.positions.has(a.id));
    let safety = 0;

    while (remaining.length > 0 && safety < 20) {
      safety++;
      // Group unplaced atoms whose parent ALREADY has a position
      const readyByParent = new Map();
      const stillWaiting = [];

      remaining.forEach((a) => {
        let pid = newAtomParents.get(a.id);
        if (!pid || !state.positions.has(pid)) {
          // Fallback: find any already-positioned bonded neighbor
          const placedNb = (adj.get(a.id) || []).find((e) => state.positions.has(e.to));
          pid = placedNb ? placedNb.to : null;
        }
        if (pid && state.positions.has(pid)) {
          if (!readyByParent.has(pid)) readyByParent.set(pid, []);
          readyByParent.get(pid).push(a);
        } else {
          stillWaiting.push(a);
        }
      });

      if (readyByParent.size === 0) {
        // Disconnected seed fallback
        stillWaiting.forEach((a, idx) => {
          state.positions.set(a.id, { x: idx * 40, y: 0 });
        });
        break;
      }

      readyByParent.forEach((children, pid) => {
        const pPos = state.positions.get(pid);
        const pEl = atomMap.get(pid)?.element || 'C';
        const occupied = [];
        (adj.get(pid) || []).forEach((e) => {
          const nbEl = atomMap.get(e.to)?.element;
          if (nbEl === 'H' && (!state.showH || state.collapsedHIds.has(e.to))) return;
          if (state.positions.has(e.to)) {
            const np = state.positions.get(e.to);
            occupied.push(Math.atan2(np.y - pPos.y, np.x - pPos.x));
          }
        });

        // Separate children with explicit user-clicked hintAngle from auto-placed siblings
        const autoChildren = [];
        children.forEach((child) => {
          if (typeof child.hintAngle === 'number') {
            const len = idealBondLength(pEl, child.element);
            state.positions.set(child.id, {
              x: pPos.x + len * Math.cos(child.hintAngle),
              y: pPos.y + len * Math.sin(child.hintAngle)
            });
            occupied.push(child.hintAngle);
            delete child.hintAngle;
          } else {
            autoChildren.push(child);
          }
        });

        if (autoChildren.length > 0) {
          const angles = pickOpenAngles(occupied, autoChildren.length);
          autoChildren.forEach((child, idx) => {
            const ang = angles[idx] ?? 0;
            const len = idealBondLength(pEl, child.element);
            state.positions.set(child.id, {
              x: pPos.x + len * Math.cos(ang),
              y: pPos.y + len * Math.sin(ang)
            });
          });
        }
      });

      remaining = stillWaiting;
    }
  }

  function syncSVGScene(graph, result, options = {}) {
    if (!ensureSVGScene()) return;
    const {
      newAtomParents = new Map(),
      skipRelax = false,
      instant = false,
      keepViewBox = false,
      animDuration = scene.animDuration
    } = options;
    const transitionMs = Number(animDuration) > 0 ? Number(animDuration) : scene.animDuration;

    const d = dict();
    const { atomMap, adj } = buildAdjacency(graph);

    // Seed positions for brand-new atoms in clean parent-grouped waves
    seedNewAtomPositions(graph, newAtomParents, atomMap, adj);

    const activeIds = new Set(graph.atoms.map((a) => a.id));
    Array.from(state.positions.keys()).forEach((id) => {
      if (!activeIds.has(id)) {
        state.positions.delete(id);
        state.draggedIds.delete(id);
        state.collapsedHIds.delete(id);
      }
    });
    Array.from(state.collapsedHIds).forEach((id) => {
      if (!activeIds.has(id)) state.collapsedHIds.delete(id);
    });
    scene.mergePreviewId = null;

    if (!skipRelax) {
      state.positions = relaxLayout(graph, state.positions, {
        draggedIds: state.draggedIds,
        collapsedHIds: state.collapsedHIds,
        iterations: 115,
        showH: state.showH
      });
    }

    const valenceSlots = computeOpenSlotsForSelected(graph, state.positions, atomMap, adj);
    const targetVB =
      keepViewBox && scene.currentVB
        ? { ...scene.currentVB }
        : computeTargetViewBox(
            state.positions,
            valenceSlots,
            atomMap,
            state.showH,
            state.zoom,
            state.panX,
            state.panY,
            state.collapsedHIds
          );

    scene.svg.setAttribute('aria-label', result.isComplete ? result.commonName : d.incompleteTitle);
    scene.lastAtomMap = atomMap;

    const reduced = instant || prefersReducedMotion();

    const visibleAtomIds = new Set();
    graph.atoms.forEach((a) => {
      if (a.element !== 'H' || (state.showH && !state.collapsedHIds.has(a.id))) {
        visibleAtomIds.add(a.id);
      }
    });

    Array.from(scene.atomNodes.keys()).forEach((id) => {
      if (!visibleAtomIds.has(id) && !scene.exitingIds.has(id)) {
        const entry = scene.atomNodes.get(id);
        if (entry && entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
        scene.atomNodes.delete(id);
        scene.currentPos.delete(id);
      }
    });

    scene.startPos.clear();
    scene.targetPos.clear();

    graph.atoms.forEach((atom) => {
      if (!visibleAtomIds.has(atom.id)) return;
      const tPos = state.positions.get(atom.id);
      if (!tPos) return;
      scene.targetPos.set(atom.id, { x: tPos.x, y: tPos.y });

      const isNew = !scene.atomNodes.has(atom.id);
      if (isNew && !reduced) {
        const pid = newAtomParents.get(atom.id);
        const pCur = pid ? scene.currentPos.get(pid) || state.positions.get(pid) : null;
        scene.startPos.set(atom.id, pCur ? { x: pCur.x, y: pCur.y } : { x: tPos.x, y: tPos.y });
      } else {
        const prev = scene.currentPos.get(atom.id);
        scene.startPos.set(atom.id, prev && !reduced ? { x: prev.x, y: prev.y } : { x: tPos.x, y: tPos.y });
      }

      let entry = scene.atomNodes.get(atom.id);
      const isSelected = atom.id === state.selectedId;
      const isConnectFirst = state.connectMode && atom.id === state.connectFirstId;
      const st = ATOM_STYLE[atom.element] || ATOM_STYLE.C;
      const usedVal = getBondSum(adj, atom.id);
      const maxVal = getEffectiveMaxValence(atomMap, adj, atom.id) || ELEMENT_VALENCE[atom.element] || 4;
      const disp = formatAtomDisplay(atom, adj, atomMap, 0);
      const tip = d.atomTooltip(disp.label, usedVal, maxVal, disp.collapsedCount);

      if (!entry) {
        const g = createSvgEl('g', {
          class: `org-atom-node is-el-${atom.element.toLowerCase()}`,
          'data-atom-id': atom.id,
          role: 'button',
          tabindex: '0'
        });
        const titleEl = createSvgEl('title');
        g.appendChild(titleEl);

        const shakeG = createSvgEl('g', { class: 'org-atom-shake' });
        const innerG = createSvgEl('g', { class: 'org-atom-inner' });

        // Flat solid/tinted vector circle (glows softly when selected — NO dashed outer ring)
        const circleEl = createSvgEl('circle', {
          cx: 0,
          cy: 0,
          r: disp.radius.toFixed(1),
          fill: st.fill,
          stroke: st.stroke,
          'stroke-width': '1.5',
          class: 'org-atom-circle'
        });

        const textEl = createSvgEl('text', {
          x: 0,
          y: 0.3,
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'font-family': 'var(--font-sans)',
          'font-weight': '600',
          'pointer-events': 'none',
          class: 'org-atom-label'
        });

        innerG.appendChild(circleEl);
        innerG.appendChild(textEl);
        shakeG.appendChild(innerG);
        g.appendChild(shakeG);
        scene.layerAtoms.appendChild(g);

        entry = {
          g,
          shakeG,
          innerG,
          circleEl,
          textEl,
          titleEl,
          element: atom.element,
          r: disp.radius,
          baseDisplay: disp
        };
        scene.atomNodes.set(atom.id, entry);

        if (!reduced) {
          innerG.classList.add('is-entering');
          setTimeout(() => innerG.classList.remove('is-entering'), 180);
        }
      }

      entry.element = atom.element;
      entry.r = disp.radius;
      entry.baseDisplay = disp;
      entry.g.classList.toggle('is-selected', isSelected);
      entry.g.classList.toggle('is-connect-anchor', isConnectFirst);
      entry.g.classList.remove('is-merge-target', 'is-merge-blocked', 'is-merging-h');
      entry.g.setAttribute('aria-label', tip);
      entry.titleEl.textContent = tip;

      entry.circleEl.setAttribute('r', disp.radius.toFixed(1));
      entry.circleEl.setAttribute('fill', st.fill);
      entry.circleEl.setAttribute('stroke', st.stroke);
      entry.textEl.setAttribute('fill', st.text);
      entry.textEl.setAttribute('font-size', String(disp.fontSize));
      entry.textEl.textContent = disp.label;
    });

    // Sync Bonds Layer
    const activeBondKeys = new Set();
    graph.bonds.forEach((b, idx) => {
      if (!visibleAtomIds.has(b.from) || !visibleAtomIds.has(b.to)) return;
      const key = canonicalBondKey(b.from, b.to);
      activeBondKeys.add(key);

      const atomA = atomMap.get(b.from);
      const atomB = atomMap.get(b.to);
      const isSelectedBond = key === state.selectedBondKey;
      const strokeColor = isSelectedBond ? '#cbd5e1' : '#4b5668';
      const strokeW = isSelectedBond ? 2.4 : 2;

      let entry = scene.bondNodes.get(key);
      if (!entry || entry.order !== b.order) {
        if (entry && entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
        const g = createSvgEl('g', {
          class: 'org-bond-group',
          'data-bond-key': key,
          'data-bond-idx': String(idx),
          role: 'button',
          tabindex: '0'
        });
        const titleEl = createSvgEl('title');
        g.appendChild(titleEl);

        const lines = [];
        for (let k = 0; k < b.order; k++) {
          const ln = createSvgEl('line', {
            stroke: strokeColor,
            'stroke-width': String(strokeW),
            'stroke-linecap': 'round',
            class: 'org-bond-line'
          });
          g.appendChild(ln);
          lines.push(ln);
        }

        const hitLine = createSvgEl('line', {
          stroke: 'transparent',
          'stroke-width': '16',
          'stroke-linecap': 'round',
          class: 'org-bond-hit'
        });
        g.appendChild(hitLine);

        scene.layerBonds.appendChild(g);
        entry = {
          g,
          lines,
          hitLine,
          titleEl,
          from: b.from,
          to: b.to,
          elA: atomA.element,
          elB: atomB.element,
          order: b.order
        };
        scene.bondNodes.set(key, entry);
      } else {
        entry.from = b.from;
        entry.to = b.to;
        entry.elA = atomA.element;
        entry.elB = atomB.element;
        entry.g.setAttribute('data-bond-idx', String(idx));
        entry.lines.forEach((ln) => {
          ln.setAttribute('stroke', strokeColor);
          ln.setAttribute('stroke-width', String(strokeW));
        });
      }

      entry.g.classList.toggle('is-selected', isSelectedBond);
      const bTip = d.bondTooltip(b.order);
      entry.g.setAttribute('aria-label', bTip);
      entry.titleEl.textContent = bTip;
    });

    Array.from(scene.bondNodes.keys()).forEach((key) => {
      if (!activeBondKeys.has(key)) {
        const entry = scene.bondNodes.get(key);
        const isExiting = entry && (scene.exitingIds.has(entry.from) || scene.exitingIds.has(entry.to));
        if (!isExiting) {
          if (entry && entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
          scene.bondNodes.delete(key);
        }
      }
    });

    // Discreet Open Valence Dots (Selected Atom Only)
    scene.layerSlots.innerHTML = '';
    valenceSlots.forEach((sl) => {
      const g = createSvgEl('g', {
        class: 'org-valence-slot',
        'data-slot-atom-id': sl.atomId,
        'data-slot-angle': sl.angle.toFixed(4),
        role: 'button',
        tabindex: '0',
        'aria-label': d.slotTooltip
      });
      const titleEl = createSvgEl('title');
      titleEl.textContent = d.slotTooltip;
      g.appendChild(titleEl);

      const stem = createSvgEl('line', {
        class: 'org-slot-stem',
        'stroke-dasharray': '2 3',
        'stroke-linecap': 'round'
      });
      const dot = createSvgEl('circle', {
        r: '4.2',
        class: 'org-slot-dot'
      });
      const hit = createSvgEl('circle', {
        r: '11',
        fill: 'transparent',
        class: 'org-slot-hit'
      });
      g.appendChild(stem);
      g.appendChild(dot);
      g.appendChild(hit);
      scene.layerSlots.appendChild(g);
    });

    if (scene.rafId) {
      cancelAnimationFrame(scene.rafId);
      scene.rafId = null;
    }

    scene.startVB = scene.currentVB && !reduced ? { ...scene.currentVB } : { ...targetVB };
    scene.targetVB = { ...targetVB };

    if (reduced) {
      renderFrameAt(1);
      startAmbientLoop();
      return;
    }

    scene.animStart = performance.now();
    function tick(now) {
      const t = Math.max(0, Math.min(1, (now - scene.animStart) / transitionMs));
      renderFrameAt(t);
      if (t < 1) {
        scene.rafId = requestAnimationFrame(tick);
      } else {
        scene.rafId = null;
      }
    }
    renderFrameAt(0);
    scene.rafId = requestAnimationFrame(tick);
    startAmbientLoop();
  }

  function triggerShakeError(atomIds) {
    const ids = Array.isArray(atomIds) ? atomIds : [atomIds];
    ids.forEach((id) => {
      const entry = scene.atomNodes.get(id);
      if (!entry) return;
      entry.shakeG.classList.remove('is-error-shake');
      void entry.shakeG.getBoundingClientRect();
      entry.shakeG.classList.add('is-error-shake');
      setTimeout(() => entry.shakeG.classList.remove('is-error-shake'), 240);
    });
  }

  function animateAtomsExit(removeIds, onDone) {
    if (prefersReducedMotion()) {
      onDone();
      return;
    }
    const idSet = new Set(removeIds);
    idSet.forEach((id) => {
      scene.exitingIds.add(id);
      const entry = scene.atomNodes.get(id);
      if (entry) entry.innerG.classList.add('is-exiting');
    });
    scene.bondNodes.forEach((entry) => {
      if (idSet.has(entry.from) || idSet.has(entry.to)) {
        entry.g.classList.add('is-exiting');
      }
    });

    setTimeout(() => {
      idSet.forEach((id) => {
        scene.exitingIds.delete(id);
        const entry = scene.atomNodes.get(id);
        if (entry && entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
        scene.atomNodes.delete(id);
        scene.currentPos.delete(id);
      });
      Array.from(scene.bondNodes.entries()).forEach(([k, entry]) => {
        if (idSet.has(entry.from) || idSet.has(entry.to)) {
          if (entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
          scene.bondNodes.delete(k);
        }
      });
      onDone();
    }, 150);
  }

  function clientToSvgPoint(clientX, clientY) {
    if (!scene.svg) return { x: 0, y: 0 };
    const pt = scene.svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = scene.svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const res = pt.matrixTransform(ctm.inverse());
    return { x: res.x, y: res.y };
  }

  // =========================================================================
  // INTERACTIVE CONTROLLER STATE & GRAPH MUTATIONS
  // =========================================================================

  let state = {
    lang: 'vi',
    graph: null,
    positions: new Map(),
    draggedIds: new Set(),
    collapsedHIds: new Set(),
    selectedId: 'c1',
    selectedBondKey: null,
    connectMode: false,
    connectFirstId: null,
    showH: true,
    zoom: 1,
    panX: 0,
    panY: 0,
    nextIdNum: 20,
    history: [],
    toastMsg: '',
    toastKind: 'warn',
    toastTimer: null,
    isMutating: false,
    needsAutoTidy: false,
    idleTidyTimer: null
  };

  let callbacks = {
    getLang: () => 'vi'
  };

  let dom = {};

  function dict() {
    return ORG_I18N[state.lang] || ORG_I18N.vi;
  }

  function genAtomId(prefix) {
    state.nextIdNum += 1;
    return `${prefix}${state.nextIdNum}`;
  }

  function countCarbons(graph) {
    return graph.atoms.filter((a) => a.element === 'C').length;
  }

  function clonePosMap(map) {
    const out = new Map();
    map.forEach((p, k) => out.set(k, { x: p.x, y: p.y }));
    return out;
  }

  function pushUndo() {
    state.history.push({
      graph: cloneGraph(state.graph),
      positions: clonePosMap(state.positions),
      draggedIds: new Set(state.draggedIds),
      collapsedHIds: new Set(state.collapsedHIds),
      selectedId: state.selectedId,
      selectedBondKey: state.selectedBondKey,
      zoom: state.zoom,
      panX: state.panX,
      panY: state.panY
    });
    if (state.history.length > 40) state.history.shift();
  }

  function showToast(msg, kind) {
    state.toastMsg = msg || '';
    state.toastKind = kind || 'warn';
    if (state.toastTimer) {
      clearTimeout(state.toastTimer);
      state.toastTimer = null;
    }
    renderToast();
    if (msg) {
      state.toastTimer = setTimeout(() => {
        state.toastMsg = '';
        state.toastTimer = null;
        renderToast();
      }, 3200);
    }
  }

  function renderToast() {
    if (!dom.toast) return;
    if (!state.toastMsg) {
      dom.toast.classList.add('hidden');
      dom.toast.textContent = '';
      return;
    }
    dom.toast.textContent = state.toastMsg;
    dom.toast.className = `org-toast is-${state.toastKind}`;
  }

  function exitConnectMode() {
    state.connectMode = false;
    state.connectFirstId = null;
  }

  function clearAutoTidyTimer() {
    if (state.idleTidyTimer) {
      clearTimeout(state.idleTidyTimer);
      state.idleTidyTimer = null;
    }
  }

  function isPanelActiveInUI() {
    return Boolean(
      dom.panel &&
        !dom.panel.classList.contains('hidden') &&
        dom.svgHost &&
        dom.svgHost.offsetParent !== null &&
        !document.hidden
    );
  }

  function triggerAutoTidy() {
    state.idleTidyTimer = null;
    if (!state.needsAutoTidy || !state.graph || state.graph.atoms.length <= 1) return;
    if (
      state.isMutating ||
      scene.drag ||
      scene.pan ||
      scene.toolbarHDrag ||
      state.connectMode ||
      searchState.open ||
      !isPanelActiveInUI()
    ) {
      resetAutoTidyTimer();
      return;
    }

    const canonicalPos = canonicalizeMoleculeLayout(state.graph);
    let maxDelta = 0;
    canonicalPos.forEach((p, id) => {
      const cur = state.positions.get(id);
      if (!cur) {
        maxDelta = Infinity;
        return;
      }
      const dist = Math.hypot(p.x - cur.x, p.y - cur.y);
      if (dist > maxDelta) maxDelta = dist;
    });

    state.draggedIds.clear();
    state.needsAutoTidy = false;

    if (maxDelta >= 1.5 || Math.abs(state.panX) > 1 || Math.abs(state.panY) > 1) {
      state.positions = canonicalPos;
      state.panX = 0;
      state.panY = 0;
      renderAll({ skipRelax: true, animDuration: 360 });
    }
  }

  function resetAutoTidyTimer() {
    clearAutoTidyTimer();
    if (!state.needsAutoTidy) return;
    state.idleTidyTimer = setTimeout(triggerAutoTidy, IDLE_TIDY_MS);
  }

  function markDirtyForAutoTidy() {
    state.needsAutoTidy = true;
    resetAutoTidyTimer();
  }

  function setZoom(nextZoom, instant) {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number(nextZoom.toFixed(2))));
    if (clamped === state.zoom) return;
    state.zoom = clamped;
    renderAll({ skipRelax: true, instant: Boolean(instant) });
  }

  function resetView() {
    if (state.zoom === 1 && state.panX === 0 && state.panY === 0) return;
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    renderAll({ skipRelax: true });
  }

  function hasExplicitHNeighbor(atomMap, adj, atomId) {
    return (adj.get(atomId) || []).some((e) => atomMap.get(e.to)?.element === 'H');
  }

  function triggerMergePop(atomId) {
    const entry = scene.atomNodes.get(atomId);
    if (!entry || prefersReducedMotion()) return;
    entry.innerG.classList.remove('is-merge-pop');
    void entry.innerG.getBoundingClientRect();
    entry.innerG.classList.add('is-merge-pop');
    setTimeout(() => entry.innerG.classList.remove('is-merge-pop'), 240);
  }

  function findMergeCandidate(svgX, svgY, draggedHId) {
    if (!state.graph) return null;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const now = performance.now();
    let bestId = null;
    let bestDist = Infinity;

    scene.atomNodes.forEach((entry, id) => {
      if (id === draggedHId) return;
      const el = entry.element || atomMap.get(id)?.element;
      if (el !== 'C' && el !== 'O' && el !== 'N') return;
      const rp = getRenderedPos(id, now) || scene.currentPos.get(id) || state.positions.get(id);
      if (!rp) return;
      const dist = Math.hypot(svgX - rp.x, svgY - rp.y);
      const hitRadius = (entry.r || ATOM_RADIUS[el] || 18) + ATOM_RADIUS.H + 6;
      if (dist <= hitRadius && dist < bestDist) {
        bestDist = dist;
        bestId = id;
      }
    });

    if (!bestId) return null;
    const alreadyBonded = draggedHId
      ? state.graph.bonds.some(
          (b) =>
            (b.from === draggedHId && b.to === bestId) ||
            (b.to === draggedHId && b.from === bestId)
        )
      : false;
    const canAccept = alreadyBonded || getMissingValence(atomMap, adj, bestId) >= 1;
    return { targetId: bestId, canAccept, alreadyBonded };
  }

  function clearMergePreview() {
    if (!scene.mergePreviewId) return;
    const prev = scene.atomNodes.get(scene.mergePreviewId);
    if (prev) {
      prev.g.classList.remove('is-merge-target', 'is-merge-blocked');
      if (prev.baseDisplay) {
        prev.circleEl.setAttribute('r', prev.baseDisplay.radius.toFixed(1));
        prev.textEl.setAttribute('font-size', String(prev.baseDisplay.fontSize));
        prev.textEl.textContent = prev.baseDisplay.label;
      }
    }
    scene.mergePreviewId = null;
  }

  function setMergePreview(targetId, canAccept, extraH = 1) {
    if (scene.mergePreviewId && scene.mergePreviewId !== targetId) {
      clearMergePreview();
    }
    if (!targetId) {
      clearMergePreview();
      return;
    }
    const entry = scene.atomNodes.get(targetId);
    if (!entry) return;
    scene.mergePreviewId = targetId;
    entry.g.classList.toggle('is-merge-target', Boolean(canAccept));
    entry.g.classList.toggle('is-merge-blocked', !canAccept);

    if (canAccept && state.graph) {
      const { atomMap, adj } = buildAdjacency(state.graph);
      const atom = atomMap.get(targetId);
      if (atom) {
        const previewDisp = formatAtomDisplay(atom, adj, atomMap, extraH);
        entry.circleEl.setAttribute('r', previewDisp.radius.toFixed(1));
        entry.textEl.setAttribute('font-size', String(previewDisp.fontSize));
        entry.textEl.textContent = previewDisp.label;
      }
    } else if (entry.baseDisplay) {
      entry.circleEl.setAttribute('r', entry.baseDisplay.radius.toFixed(1));
      entry.textEl.setAttribute('font-size', String(entry.baseDisplay.fontSize));
      entry.textEl.textContent = entry.baseDisplay.label;
    }
  }

  function collapseHydrogenIntoAtom(hId, targetId) {
    if (state.isMutating || !state.graph) return false;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const hAtom = atomMap.get(hId);
    const tAtom = atomMap.get(targetId);
    if (!hAtom || hAtom.element !== 'H' || !tAtom) return false;
    if (tAtom.element !== 'C' && tAtom.element !== 'O' && tAtom.element !== 'N') return false;

    const alreadyBonded = state.graph.bonds.some(
      (b) => (b.from === hId && b.to === targetId) || (b.to === hId && b.from === targetId)
    );
    if (!alreadyBonded && getMissingValence(atomMap, adj, targetId) < 1) {
      return false;
    }

    pushUndo();
    if (!alreadyBonded) {
      state.graph.bonds = state.graph.bonds.map((b) =>
        b.from === hId || b.to === hId ? { from: targetId, to: hId, order: 1 } : b
      );
      if (!state.graph.bonds.some((b) => b.from === hId || b.to === hId)) {
        state.graph.bonds.push({ from: targetId, to: hId, order: 1 });
      }
    }

    state.collapsedHIds.add(hId);
    state.draggedIds.delete(hId);
    const tPos = state.positions.get(targetId);
    if (tPos) state.positions.set(hId, { x: tPos.x, y: tPos.y });

    state.selectedId = targetId;
    state.selectedBondKey = null;
    showToast('');
    markDirtyForAutoTidy();
    renderAll();
    triggerMergePop(targetId);
    return true;
  }

  function addAndCollapseHydrogen(targetId) {
    if (state.isMutating || !state.graph) return false;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const tAtom = atomMap.get(targetId);
    const t = dict().toasts;
    if (!tAtom || (tAtom.element !== 'C' && tAtom.element !== 'O' && tAtom.element !== 'N')) {
      showToast(t.selectHeavy, 'warn');
      return false;
    }
    if (getMissingValence(atomMap, adj, targetId) < 1) {
      showToast(t.valenceFull(1, hasExplicitHNeighbor(atomMap, adj, targetId)), 'warn');
      triggerShakeError(targetId);
      return false;
    }

    pushUndo();
    const id = genAtomId('h');
    state.graph.atoms.push({ id, element: 'H' });
    state.graph.bonds.push({ from: targetId, to: id, order: 1 });
    const tPos = state.positions.get(targetId);
    state.positions.set(id, tPos ? { x: tPos.x, y: tPos.y } : { x: 0, y: 0 });
    state.collapsedHIds.add(id);

    state.selectedId = targetId;
    state.selectedBondKey = null;
    showToast('');
    markDirtyForAutoTidy();
    renderAll();
    triggerMergePop(targetId);
    return true;
  }

  function expandCollapsedHydrogens(atomId) {
    if (state.isMutating || !state.graph) return;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const collapsedHs = (adj.get(atomId) || [])
      .map((e) => e.to)
      .filter((hid) => atomMap.get(hid)?.element === 'H' && state.collapsedHIds.has(hid));
    if (collapsedHs.length === 0) return;

    pushUndo();
    const newAtomParents = new Map();
    collapsedHs.forEach((hid) => {
      state.collapsedHIds.delete(hid);
      state.positions.delete(hid);
      scene.currentPos.delete(hid);
      newAtomParents.set(hid, atomId);
    });
    state.showH = true;
    state.selectedId = atomId;
    state.selectedBondKey = null;
    showToast('');
    markDirtyForAutoTidy();
    renderAll({ newAtomParents });
  }

  function addCarbonAtom() {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel || (sel.element !== 'C' && sel.element !== 'O' && sel.element !== 'N')) {
      showToast(t.selectHeavy, 'warn');
      if (sel) triggerShakeError(sel.id);
      return;
    }
    if (countCarbons(state.graph) >= MAX_CARBONS) {
      showToast(t.maxCarbons, 'warn');
      triggerShakeError(sel.id);
      return;
    }
    const freeVal = getMissingValence(atomMap, adj, sel.id);
    if (freeVal < 1) {
      showToast(t.valenceFull(1, hasExplicitHNeighbor(atomMap, adj, sel.id)), 'warn');
      triggerShakeError(sel.id);
      return;
    }
    pushUndo();
    const newId = genAtomId('c');
    const atomObj = { id: newId, element: 'C' };

    // Prioritize horizontal zigzag extension when on an open/linear chain end
    const heavyEdges = (adj.get(sel.id) || []).filter((e) => atomMap.get(e.to)?.element !== 'H');
    const pPos = state.positions.get(sel.id);
    let hintAngle = null;
    if (heavyEdges.length === 0) {
      hintAngle = -Math.PI / 6;
    } else if (heavyEdges.length === 1 && pPos) {
      const prevEdge = heavyEdges[0];
      const prevPos = state.positions.get(prevEdge.to);
      if (prevPos) {
        const dx = pPos.x - prevPos.x;
        const dy = pPos.y - prevPos.y;
        const dirX = dx >= -6 ? 1 : -1;
        if (prevEdge.order === 3) {
          hintAngle = Math.atan2(dy, dx);
        } else if (dy < -6) {
          hintAngle = dirX > 0 ? Math.PI / 6 : (5 * Math.PI) / 6;
        } else {
          hintAngle = dirX > 0 ? -Math.PI / 6 : (-5 * Math.PI) / 6;
        }
      } else {
        hintAngle = -Math.PI / 6;
      }
    }

    const newAtomParents = new Map([[newId, sel.id]]);
    if (typeof hintAngle === 'number') {
      atomObj.hintAngle = hintAngle;
      // Clear any visible H on sel blocking the forward horizontal path so it repositions cleanly
      (adj.get(sel.id) || []).forEach((e) => {
        if (atomMap.get(e.to)?.element !== 'H') return;
        if (!state.showH || state.collapsedHIds.has(e.to)) return;
        const hp = state.positions.get(e.to);
        if (!hp || !pPos) return;
        const hAng = Math.atan2(hp.y - pPos.y, hp.x - pPos.x);
        if (Math.abs(normalizeAngle(hAng - hintAngle)) < 0.72) {
          state.positions.delete(e.to);
          scene.currentPos.delete(e.to);
          state.draggedIds.delete(e.to);
          newAtomParents.set(e.to, sel.id);
        }
      });
    }

    state.graph.atoms.push(atomObj);
    state.graph.bonds.push({ from: sel.id, to: newId, order: 1 });
    state.selectedId = newId;
    state.selectedBondKey = null;
    showToast('');
    markDirtyForAutoTidy();
    renderAll({ newAtomParents });
  }

  function addBridgeOxygen() {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel || (sel.element !== 'C' && sel.element !== 'O' && sel.element !== 'N')) {
      showToast(t.selectHeavy, 'warn');
      if (sel) triggerShakeError(sel.id);
      return;
    }
    const freeVal = getMissingValence(atomMap, adj, sel.id);
    if (freeVal < 1) {
      showToast(t.valenceFull(1, hasExplicitHNeighbor(atomMap, adj, sel.id)), 'warn');
      triggerShakeError(sel.id);
      return;
    }
    pushUndo();
    const oId = genAtomId('o');
    state.graph.atoms.push({ id: oId, element: 'O' });
    state.graph.bonds.push({ from: sel.id, to: oId, order: 1 });
    state.selectedId = oId;
    state.selectedBondKey = null;
    showToast('');
    markDirtyForAutoTidy();
    renderAll({ newAtomParents: new Map([[oId, sel.id]]) });
  }

  function addHydrogenToAtom(targetId, hintAngle) {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const target = atomMap.get(targetId || state.selectedId);
    if (!target || target.element === 'H' || ELEMENT_VALENCE[target.element] <= 1) {
      showToast(t.selectHeavy, 'warn');
      if (target) triggerShakeError(target.id);
      return;
    }
    const freeVal = getMissingValence(atomMap, adj, target.id);
    if (freeVal < 1 || isNitroNitrogen(atomMap, adj, target.id)) {
      showToast(t.valenceFull(1, hasExplicitHNeighbor(atomMap, adj, target.id)), 'warn');
      triggerShakeError(target.id);
      return;
    }
    pushUndo();
    const hId = genAtomId('h');
    const atomObj = { id: hId, element: 'H' };
    if (typeof hintAngle === 'number') atomObj.hintAngle = hintAngle;
    state.graph.atoms.push(atomObj);
    state.graph.bonds.push({ from: target.id, to: hId, order: 1 });
    state.selectedId = target.id;
    state.selectedBondKey = null;
    if (!state.showH) state.showH = true;
    showToast('');
    markDirtyForAutoTidy();
    renderAll({ newAtomParents: new Map([[hId, target.id]]) });
  }

  function autoFillHydrogens() {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const toAdd = [];
    state.graph.atoms.forEach((atom) => {
      if (atom.element === 'H' || isNitroNitrogen(atomMap, adj, atom.id)) return;
      const miss = getMissingValence(atomMap, adj, atom.id);
      for (let i = 0; i < miss; i++) toAdd.push(atom.id);
    });
    if (toAdd.length === 0) {
      showToast(t.alreadyFullH, 'info');
      return;
    }
    pushUndo();
    const newParents = new Map();
    toAdd.forEach((pid) => {
      const hId = genAtomId('h');
      state.graph.atoms.push({ id: hId, element: 'H' });
      state.graph.bonds.push({ from: pid, to: hId, order: 1 });
      newParents.set(hId, pid);
    });
    if (!state.showH) state.showH = true;
    showToast('');
    markDirtyForAutoTidy();
    renderAll({ newAtomParents: newParents });
  }

  function addSubstituent(kind) {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel || (sel.element !== 'C' && sel.element !== 'O' && sel.element !== 'N')) {
      showToast(t.selectHeavy, 'warn');
      if (sel) triggerShakeError(sel.id);
      return;
    }

    const freeVal = getMissingValence(atomMap, adj, sel.id);
    const hasH = hasExplicitHNeighbor(atomMap, adj, sel.id);
    const nbs = adj.get(sel.id) || [];
    const dblOs = nbs.filter((e) => e.order === 2 && atomMap.get(e.to)?.element === 'O');
    const singleOHs = nbs.filter((e) => {
      if (e.order !== 1 || atomMap.get(e.to)?.element !== 'O') return false;
      const oHeavy = (adj.get(e.to) || []).filter((oe) => atomMap.get(oe.to)?.element !== 'H');
      return oHeavy.length === 1;
    });
    const cNbs = nbs.filter((e) => atomMap.get(e.to)?.element === 'C');

    if (kind === 'COOH') {
      if (sel.element === 'C' && dblOs.length >= 1 && singleOHs.length >= 1) {
        showToast(t.alreadyCarboxyl, 'info');
        triggerShakeError(sel.id);
        return;
      }
      const needDbl = dblOs.length === 0 ? 2 : 0;
      const needOH = singleOHs.length === 0 ? 1 : 0;
      const isTerm = cNbs.length <= 1 && cNbs.every((e) => e.order === 1);
      if (sel.element === 'C' && isTerm && freeVal >= needDbl + needOH) {
        pushUndo();
        const newParents = new Map();
        if (needDbl > 0) {
          const o1 = genAtomId('o');
          state.graph.atoms.push({ id: o1, element: 'O' });
          state.graph.bonds.push({ from: sel.id, to: o1, order: 2 });
          newParents.set(o1, sel.id);
        }
        if (needOH > 0) {
          const o2 = genAtomId('o');
          const ohH = genAtomId('h');
          state.graph.atoms.push({ id: o2, element: 'O' }, { id: ohH, element: 'H' });
          state.graph.bonds.push({ from: sel.id, to: o2, order: 1 }, { from: o2, to: ohH, order: 1 });
          newParents.set(o2, sel.id);
          newParents.set(ohH, o2);
        }
        state.selectedBondKey = null;
        showToast('');
        markDirtyForAutoTidy();
        renderAll({ newAtomParents: newParents });
        return;
      }
      if (countCarbons(state.graph) >= MAX_CARBONS) {
        showToast(t.maxCarbons, 'warn');
        triggerShakeError(sel.id);
        return;
      }
      if (freeVal < 1) {
        showToast(t.valenceFull(1, hasH), 'warn');
        triggerShakeError(sel.id);
        return;
      }
      pushUndo();
      const cNew = genAtomId('c');
      const o1 = genAtomId('o');
      const o2 = genAtomId('o');
      const ohH = genAtomId('h');
      state.graph.atoms.push(
        { id: cNew, element: 'C' },
        { id: o1, element: 'O' },
        { id: o2, element: 'O' },
        { id: ohH, element: 'H' }
      );
      state.graph.bonds.push(
        { from: sel.id, to: cNew, order: 1 },
        { from: cNew, to: o1, order: 2 },
        { from: cNew, to: o2, order: 1 },
        { from: o2, to: ohH, order: 1 }
      );
      state.selectedId = cNew;
      state.selectedBondKey = null;
      showToast('');
      markDirtyForAutoTidy();
      renderAll({
        newAtomParents: new Map([
          [cNew, sel.id],
          [o1, cNew],
          [o2, cNew],
          [ohH, o2]
        ])
      });
      return;
    }

    if (kind === '=O') {
      if (sel.element !== 'C') {
        showToast(t.selectCarbon, 'warn');
        triggerShakeError(sel.id);
        return;
      }
      if (dblOs.length >= 1) {
        showToast(t.doubleOExists, 'warn');
        triggerShakeError(sel.id);
        return;
      }
      if (freeVal < 2) {
        showToast(t.valenceFull(2, hasH), 'warn');
        triggerShakeError(sel.id);
        return;
      }
      pushUndo();
      const oId = genAtomId('o');
      state.graph.atoms.push({ id: oId, element: 'O' });
      state.graph.bonds.push({ from: sel.id, to: oId, order: 2 });
      state.selectedBondKey = null;
      showToast('');
      markDirtyForAutoTidy();
      renderAll({ newAtomParents: new Map([[oId, sel.id]]) });
      return;
    }

    if (kind === 'OH') {
      if (freeVal < 1) {
        showToast(t.valenceFull(1, hasH), 'warn');
        triggerShakeError(sel.id);
        return;
      }
      pushUndo();
      const oId = genAtomId('o');
      const hId = genAtomId('h');
      state.graph.atoms.push({ id: oId, element: 'O' }, { id: hId, element: 'H' });
      state.graph.bonds.push({ from: sel.id, to: oId, order: 1 }, { from: oId, to: hId, order: 1 });
      state.collapsedHIds.add(hId);
      state.selectedBondKey = null;
      showToast('');
      markDirtyForAutoTidy();
      renderAll({
        newAtomParents: new Map([
          [oId, sel.id],
          [hId, oId]
        ])
      });
      return;
    }

    if (kind === 'NH2') {
      if (freeVal < 1) {
        showToast(t.valenceFull(1, hasH), 'warn');
        triggerShakeError(sel.id);
        return;
      }
      pushUndo();
      const nId = genAtomId('n');
      const h1 = genAtomId('h');
      const h2 = genAtomId('h');
      state.graph.atoms.push({ id: nId, element: 'N' }, { id: h1, element: 'H' }, { id: h2, element: 'H' });
      state.graph.bonds.push(
        { from: sel.id, to: nId, order: 1 },
        { from: nId, to: h1, order: 1 },
        { from: nId, to: h2, order: 1 }
      );
      state.collapsedHIds.add(h1);
      state.collapsedHIds.add(h2);
      state.selectedBondKey = null;
      showToast('');
      markDirtyForAutoTidy();
      renderAll({
        newAtomParents: new Map([
          [nId, sel.id],
          [h1, nId],
          [h2, nId]
        ])
      });
      return;
    }

    // Halogens: Cl, Br
    if (freeVal < 1) {
      showToast(t.valenceFull(1, hasH), 'warn');
      triggerShakeError(sel.id);
      return;
    }
    pushUndo();
    const xId = genAtomId(kind.toLowerCase());
    state.graph.atoms.push({ id: xId, element: kind });
    state.graph.bonds.push({ from: sel.id, to: xId, order: 1 });
    state.selectedBondKey = null;
    showToast('');
    markDirtyForAutoTidy();
    renderAll({ newAtomParents: new Map([[xId, sel.id]]) });
  }

  function connectTwoAtoms(idA, idB) {
    if (state.isMutating) return;
    const t = dict().toasts;
    if (!idA || !idB || idA === idB) {
      showToast(t.sameAtom, 'warn');
      return;
    }
    const { atomMap, adj } = buildAdjacency(state.graph);
    const a = atomMap.get(idA);
    const b = atomMap.get(idB);
    if (!a || !b) return;

    if (a.element === 'H' || b.element === 'H') {
      showToast(t.cannotBondH, 'warn');
      triggerShakeError([idA, idB]);
      return;
    }

    const exists = state.graph.bonds.some(
      (bd) => canonicalBondKey(bd.from, bd.to) === canonicalBondKey(idA, idB)
    );
    if (exists) {
      showToast(t.bondExists, 'info');
      exitConnectMode();
      renderAll({ skipRelax: true });
      return;
    }

    const maxA = getEffectiveMaxValence(atomMap, adj, idA) || 1;
    const maxB = getEffectiveMaxValence(atomMap, adj, idB) || 1;
    const heavyA = getHeavyBondSum(atomMap, adj, idA);
    const heavyB = getHeavyBondSum(atomMap, adj, idB);

    if (heavyA + 1 > maxA || heavyB + 1 > maxB) {
      const blockers = [];
      if (heavyA + 1 > maxA) blockers.push(idA);
      if (heavyB + 1 > maxB) blockers.push(idB);
      triggerShakeError(blockers);
      showToast(t.connectValenceBlocked, 'warn');
      return;
    }

    const toStrip = [];
    if (getBondSum(adj, idA) + 1 > maxA) {
      const hA = (adj.get(idA) || []).find((e) => atomMap.get(e.to)?.element === 'H');
      if (hA) toStrip.push(hA.to);
    }
    if (getBondSum(adj, idB) + 1 > maxB) {
      const hB = (adj.get(idB) || []).find((e) => atomMap.get(e.to)?.element === 'H');
      if (hB) toStrip.push(hB.to);
    }

    pushUndo();
    exitConnectMode();

    const commitConnect = () => {
      if (toStrip.length > 0) {
        const stripSet = new Set(toStrip);
        state.graph.atoms = state.graph.atoms.filter((at) => !stripSet.has(at.id));
        state.graph.bonds = state.graph.bonds.filter((bd) => !stripSet.has(bd.from) && !stripSet.has(bd.to));
      }
      state.graph.bonds.push({ from: idA, to: idB, order: 1 });
      state.selectedId = idB;
      state.selectedBondKey = null;
      state.draggedIds.clear();
      state.isMutating = false;
      showToast('');
      markDirtyForAutoTidy();
      renderAll();
    };

    if (toStrip.length > 0) {
      state.isMutating = true;
      animateAtomsExit(toStrip, commitConnect);
    } else {
      commitConnect();
    }
  }

  function handleBondClick(bondKey) {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const bond = state.graph.bonds.find((b) => canonicalBondKey(b.from, b.to) === bondKey);
    if (!bond) return;

    const { atomMap, adj } = buildAdjacency(state.graph);
    const a = atomMap.get(bond.from);
    const b = atomMap.get(bond.to);
    if (!a || !b) return;

    state.selectedBondKey = bondKey;
    state.selectedId = null;

    const maxElA = getEffectiveMaxValence(atomMap, adj, a.id) || 1;
    const maxElB = getEffectiveMaxValence(atomMap, adj, b.id) || 1;
    if (maxElA < 2 || maxElB < 2) {
      showToast('');
      renderAll({ skipRelax: true, keepViewBox: true });
      return;
    }

    if (
      bond.order === 2 &&
      ((isNitroNitrogen(atomMap, adj, a.id) && b.element === 'O') ||
        (isNitroNitrogen(atomMap, adj, b.id) && a.element === 'O'))
    ) {
      showToast('');
      renderAll({ skipRelax: true, keepViewBox: true });
      return;
    }

    const hListA = (adj.get(a.id) || []).filter((e) => atomMap.get(e.to)?.element === 'H').map((e) => e.to);
    const hListB = (adj.get(b.id) || []).filter((e) => atomMap.get(e.to)?.element === 'H').map((e) => e.to);
    const heavyOtherA = getHeavyBondSum(atomMap, adj, a.id) - bond.order;
    const heavyOtherB = getHeavyBondSum(atomMap, adj, b.id) - bond.order;
    const maxPossible = Math.min(3, maxElA - heavyOtherA, maxElB - heavyOtherB);

    function applyOrder(targetOrder, infoMsg) {
      const dropA = Math.max(0, heavyOtherA + hListA.length + targetOrder - maxElA);
      const dropB = Math.max(0, heavyOtherB + hListB.length + targetOrder - maxElB);
      const toStrip = hListA.slice(0, dropA).concat(hListB.slice(0, dropB));

      pushUndo();

      const commit = () => {
        if (toStrip.length > 0) {
          const stripSet = new Set(toStrip);
          state.graph.atoms = state.graph.atoms.filter((at) => !stripSet.has(at.id));
          state.graph.bonds = state.graph.bonds.filter((bd) => !stripSet.has(bd.from) && !stripSet.has(bd.to));
        }
        const target = state.graph.bonds.find((bd) => canonicalBondKey(bd.from, bd.to) === bondKey);
        if (target) target.order = targetOrder;
        state.isMutating = false;
        showToast(infoMsg || '', infoMsg ? 'info' : 'warn');
        markDirtyForAutoTidy();
        renderAll({ skipRelax: true, keepViewBox: true });
      };

      if (toStrip.length > 0) {
        state.isMutating = true;
        animateAtomsExit(toStrip, commit);
      } else {
        commit();
      }
    }

    if (bond.order === 1) {
      if (maxPossible >= 2) {
        applyOrder(2, '');
      } else {
        if (a.element === 'O' || b.element === 'O') {
          showToast('');
          renderAll({ skipRelax: true, keepViewBox: true });
        } else {
          const blockers = [];
          if (heavyOtherA + 2 > maxElA) blockers.push(a.id);
          if (heavyOtherB + 2 > maxElB) blockers.push(b.id);
          triggerShakeError(blockers);
          showToast(t.bondOrderBlocked, 'warn');
          renderAll({ skipRelax: true, keepViewBox: true });
        }
      }
    } else if (bond.order === 2) {
      if (maxPossible >= 3) {
        applyOrder(3, '');
      } else {
        const msg = maxElA >= 3 && maxElB >= 3 ? t.bondWrapSingle : '';
        applyOrder(1, msg);
      }
    } else {
      applyOrder(1, '');
    }
  }

  function deleteSelection() {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;

    if (state.selectedBondKey) {
      const targetKey = state.selectedBondKey;
      const bond = state.graph.bonds.find((b) => canonicalBondKey(b.from, b.to) === targetKey);
      if (!bond) return;
      const remBonds = state.graph.bonds.filter((b) => canonicalBondKey(b.from, b.to) !== targetKey);
      if (!isConnectedGraph(state.graph.atoms, remBonds)) {
        showToast(t.cannotSplit, 'warn');
        triggerShakeError([bond.from, bond.to]);
        return;
      }
      pushUndo();
      state.graph.bonds = remBonds;
      state.selectedBondKey = null;
      state.selectedId = bond.from;
      showToast('');
      markDirtyForAutoTidy();
      renderAll();
      return;
    }

    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel) return;

    if (state.graph.atoms.length <= 1) {
      showToast(t.cannotDeleteLast, 'warn');
      triggerShakeError(sel.id);
      return;
    }

    if (sel.element === 'H') {
      const parent = (adj.get(sel.id) || [])[0]?.to || state.graph.atoms[0]?.id || null;
      pushUndo();
      state.isMutating = true;
      animateAtomsExit([sel.id], () => {
        state.graph.atoms = state.graph.atoms.filter((a) => a.id !== sel.id);
        state.graph.bonds = state.graph.bonds.filter((b) => b.from !== sel.id && b.to !== sel.id);
        state.selectedId = parent;
        state.isMutating = false;
        showToast('');
        markDirtyForAutoTidy();
        renderAll();
      });
      return;
    }

    const removeSet = new Set([sel.id]);
    (adj.get(sel.id) || []).forEach((e) => {
      if (atomMap.get(e.to)?.element === 'H') removeSet.add(e.to);
    });

    const remAtoms = state.graph.atoms.filter((a) => !removeSet.has(a.id));
    const remBonds = state.graph.bonds.filter((b) => !removeSet.has(b.from) && !removeSet.has(b.to));

    if (remAtoms.length === 0 || !remAtoms.some((a) => a.element === 'C')) {
      showToast(t.cannotDeleteLast, 'warn');
      triggerShakeError(sel.id);
      return;
    }
    if (!isConnectedGraph(remAtoms, remBonds)) {
      showToast(t.cannotSplit, 'warn');
      triggerShakeError(sel.id);
      return;
    }

    const fallbackSel =
      (adj.get(sel.id) || []).find((e) => !removeSet.has(e.to))?.to || remAtoms[0].id;

    pushUndo();
    state.isMutating = true;
    animateAtomsExit(Array.from(removeSet), () => {
      state.graph.atoms = remAtoms;
      state.graph.bonds = remBonds;
      state.selectedId = fallbackSel;
      state.isMutating = false;
      showToast('');
      markDirtyForAutoTidy();
      renderAll();
    });
  }

  function undo() {
    if (state.isMutating || state.history.length === 0) return;
    exitConnectMode();
    const prev = state.history.pop();
    state.graph = prev.graph;
    state.positions = prev.positions;
    state.draggedIds = prev.draggedIds;
    state.collapsedHIds = new Set(prev.collapsedHIds || []);
    state.selectedId = prev.selectedId;
    state.selectedBondKey = prev.selectedBondKey;
    if (typeof prev.zoom === 'number') state.zoom = prev.zoom;
    if (typeof prev.panX === 'number') state.panX = prev.panX;
    if (typeof prev.panY === 'number') state.panY = prev.panY;
    showToast('');
    markDirtyForAutoTidy();
    renderAll({ skipRelax: true });
  }

  function reset() {
    if (state.isMutating) return;
    exitConnectMode();
    if (state.graph) pushUndo();
    state.graph = { atoms: [{ id: 'c1', element: 'C' }], bonds: [] };
    state.positions = new Map([['c1', { x: 0, y: 0 }]]);
    state.draggedIds.clear();
    state.collapsedHIds.clear();
    state.selectedId = 'c1';
    state.selectedBondKey = null;
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    state.needsAutoTidy = false;
    clearAutoTidyTimer();
    showToast('');
    renderAll({ skipRelax: true });
  }

  const searchState = {
    open: false,
    activeIdx: 0,
    results: []
  };

  function closeSearch(returnFocus = false) {
    if (!dom.searchBox || !dom.searchTrigger) return;
    searchState.open = false;
    dom.searchBox.classList.add('hidden');
    dom.searchTrigger.classList.remove('hidden');
    dom.searchTrigger.setAttribute('aria-expanded', 'false');
    if (dom.searchInput) dom.searchInput.setAttribute('aria-expanded', 'false');
    if (returnFocus) dom.searchTrigger.focus();
  }

  function renderSearchDropdown() {
    if (!dom.searchDropdown || !dom.searchInput) return;
    const d = dict();
    const q = dom.searchInput.value || '';
    const isEmptyQuery = !q.trim();
    const results = searchCompounds(q, state.lang, isEmptyQuery ? 8 : 30);
    searchState.results = results;
    if (searchState.activeIdx >= results.length) searchState.activeIdx = 0;
    if (searchState.activeIdx < 0 && results.length > 0) searchState.activeIdx = 0;

    if (results.length === 0) {
      dom.searchDropdown.innerHTML = `<div class="org-search-empty">${escapeHTMLText(d.searchEmpty)}</div>`;
      return;
    }

    const headerHtml = isEmptyQuery
      ? `<div class="org-search-section-lbl">${escapeHTMLText(d.searchFeatured)}</div>`
      : '';
    const isEn = state.lang === 'en';
    const itemsHtml = results
      .map((item, idx) => {
        const displayName = isEn ? item.nameEn : item.name;
        const displayCat = isEn ? item.categoryEn : item.category;
        const formulaHtml = toSubscriptHTML(item.formula || '');
        const activeCls = idx === searchState.activeIdx ? ' is-active' : '';
        return `<button type="button" class="org-search-item${activeCls}" role="option" aria-selected="${idx === searchState.activeIdx ? 'true' : 'false'}" data-compound-id="${escapeHTMLText(item.id)}" data-idx="${idx}"><span class="org-search-item-main"><span class="org-search-item-name">${escapeHTMLText(displayName)}</span><span class="org-search-item-cat">${escapeHTMLText(displayCat)}</span></span><span class="org-search-item-formula mono">${formulaHtml}</span></button>`;
      })
      .join('');
    dom.searchDropdown.innerHTML = headerHtml + itemsHtml;

    const activeEl = dom.searchDropdown.querySelector('.org-search-item.is-active');
    if (activeEl && typeof activeEl.scrollIntoView === 'function') {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  function escapeHTMLText(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function openSearch() {
    if (!dom.searchBox || !dom.searchTrigger || !dom.searchInput) return;
    searchState.open = true;
    searchState.activeIdx = 0;
    dom.searchTrigger.classList.add('hidden');
    dom.searchBox.classList.remove('hidden');
    dom.searchTrigger.setAttribute('aria-expanded', 'true');
    dom.searchInput.setAttribute('aria-expanded', 'true');
    renderSearchDropdown();
    dom.searchInput.focus();
    dom.searchInput.select();
  }

  function loadCompoundById(compoundId) {
    if (state.isMutating) return false;
    ensureSearchIndex();
    const compound = KNOWN_MOLECULES.find((c) => c.id === compoundId);
    if (!compound) return false;

    exitConnectMode();
    if (state.graph) pushUndo();

    const { graph, heavyIds } = buildGraphFromCompound(compound, genAtomId);
    const { atomMap, adj } = buildAdjacency(graph);
    const rings = findSmallRings(graph);
    const nextCollapsed = new Set();

    // Condense -OH / -NH2 hydrogens on cyclic or multifunctional molecules (>= 5 heavy atoms)
    // so crowded sugars/polyols (e.g. fructose pyranose) look crisp without overlapping H balls.
    if (rings.length > 0 || heavyIds.length >= 5) {
      graph.atoms.forEach((a) => {
        if (a.element !== 'H') return;
        const parentEdge = (adj.get(a.id) || [])[0];
        const parentEl = parentEdge ? atomMap.get(parentEdge.to)?.element : null;
        if (parentEl === 'O' || parentEl === 'N') {
          nextCollapsed.add(a.id);
        }
      });
    }

    const { positions } = computeSmartInitialPositions(graph, heavyIds, {
      compound,
      collapsedHIds: nextCollapsed,
      showH: state.showH
    });

    state.graph = graph;
    state.positions = positions;
    state.draggedIds.clear();
    state.collapsedHIds = nextCollapsed;
    state.selectedId = heavyIds[0] || null;
    state.selectedBondKey = null;
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    state.needsAutoTidy = false;
    clearAutoTidyTimer();

    showToast('');
    closeSearch();
    if (dom.searchInput) dom.searchInput.value = '';
    if (dom.panel) renderAll({ skipRelax: true });
    return true;
  }

  // =========================================================================
  // UI RENDERING & EVENT BINDING
  // =========================================================================

  function renderToolbarState(result) {
    const d = dict();
    const cCount = countCarbons(state.graph);
    if (dom.carbonCounter) {
      dom.carbonCounter.textContent = d.carbonCount(cCount);
      dom.carbonCounter.classList.toggle('is-max', cCount >= MAX_CARBONS);
    }
    if (dom.btnUndo) dom.btnUndo.disabled = state.history.length === 0;
    if (dom.btnToggleH) {
      dom.btnToggleH.classList.toggle('active', state.showH);
      dom.btnToggleH.setAttribute('aria-pressed', state.showH ? 'true' : 'false');
    }
    if (dom.toggleHLabel) {
      dom.toggleHLabel.textContent = state.showH ? d.showHLabel : d.hideHLabel;
    }
    if (dom.btnConnect) {
      dom.btnConnect.classList.toggle('active', state.connectMode);
      dom.btnConnect.setAttribute('aria-pressed', state.connectMode ? 'true' : 'false');
      const span = dom.btnConnect.querySelector('span');
      if (span) span.textContent = state.connectMode ? d.connectBtnActive : d.connectBtn;
    }
    if (dom.btnZoomReset) {
      dom.btnZoomReset.textContent = `${Math.round(state.zoom * 100)}%`;
      dom.btnZoomReset.title = d.zoomResetTitle;
    }
    if (dom.btnZoomIn) {
      dom.btnZoomIn.title = d.zoomInTitle;
      dom.btnZoomIn.setAttribute('aria-label', d.zoomInTitle);
    }
    if (dom.btnZoomOut) {
      dom.btnZoomOut.title = d.zoomOutTitle;
      dom.btnZoomOut.setAttribute('aria-label', d.zoomOutTitle);
    }
    if (dom.stageHint) {
      if (state.connectMode) {
        dom.stageHint.textContent = state.connectFirstId ? d.stageHintConnect2 : d.stageHintConnect1;
      } else {
        dom.stageHint.textContent = d.stageHint;
      }
    }

    const { atomMap } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    const isC = Boolean(sel && sel.element === 'C');
    const isHeavyMulti = Boolean(sel && (sel.element === 'C' || sel.element === 'O' || sel.element === 'N'));

    if (dom.attachBtns) {
      dom.attachBtns.forEach((btn) => {
        const act = btn.dataset.orgAction;
        if (act === 'add-o') {
          btn.disabled = !isC;
        } else {
          btn.disabled = !isHeavyMulti;
        }
      });
    }
    if (dom.btnDelete) {
      dom.btnDelete.disabled = !sel && !state.selectedBondKey;
    }
    if (dom.btnAutoFill) {
      dom.btnAutoFill.disabled = result.missingTotalValence === 0;
    }
  }

  function renderAll(animOptions) {
    if (!dom.panel || !state.graph) return;
    const d = dict();
    const result = identifyMolecule(state.graph, state.lang);

    renderToolbarState(result);
    renderToast();

    syncSVGScene(state.graph, result, animOptions || {});

    const incomplete = !result.isComplete;

    // Incomplete valence banner (with quick Auto-fill H action)
    if (dom.valenceBanner && dom.valenceText) {
      dom.valenceBanner.classList.toggle('hidden', !incomplete);
      if (incomplete) {
        dom.valenceText.textContent = d.incompleteValence(result.missingTotalValence);
      }
    }

    // Strictly gate compound name & full Profile Card reveal on complete valence!
    if (dom.resultCard) {
      dom.resultCard.classList.remove('hidden');
      dom.resultCard.classList.toggle('is-incomplete', incomplete);
      dom.resultCard.classList.toggle('is-matched', !incomplete && result.matched);
    }

    if (incomplete) {
      if (dom.molName) dom.molName.textContent = d.incompleteTitle;
      if (dom.molTag) {
        dom.molTag.textContent = d.incompleteTag(result.missingTotalValence);
        dom.molTag.dataset.orgCat = 'incomplete';
      }
      if (dom.valFormula) dom.valFormula.innerHTML = toSubscriptHTML(result.actualFormula || '—');
      if (dom.valMass) {
        const massVal = Number.isFinite(result.actualMolarMass) ? result.actualMolarMass : 0;
        dom.valMass.textContent = `${massVal.toFixed(3)} g/mol`;
      }
      if (dom.pillStateWrap) dom.pillStateWrap.classList.add('hidden');
      if (dom.pillSolubilityWrap) dom.pillSolubilityWrap.classList.add('hidden');
      if (dom.molDesc) {
        dom.molDesc.textContent = d.incompleteDesc(result.missingTotalValence);
        dom.molDesc.classList.remove('hidden');
      }
      if (dom.customMeta) dom.customMeta.classList.add('hidden');
      if (dom.profileBody) dom.profileBody.classList.add('hidden');
      return;
    }

    if (dom.molName) dom.molName.textContent = result.commonName || result.molecularFormula || '—';
    if (dom.molTag) {
      dom.molTag.textContent = result.categoryLabel || d.categories.custom;
      dom.molTag.dataset.orgCat = result.categoryKey || 'custom';
    }
    if (dom.valFormula) dom.valFormula.innerHTML = toSubscriptHTML(result.molecularFormula || '—');
    if (dom.valMass) {
      const massVal = Number.isFinite(result.molarMass) ? result.molarMass : 0;
      dom.valMass.textContent = `${massVal.toFixed(3)} g/mol`;
    }

    if (result.matched) {
      if (dom.pillStateWrap && dom.valState) {
        dom.valState.textContent = result.state || '—';
        dom.pillStateWrap.classList.remove('hidden');
      }
      if (dom.pillSolubilityWrap && dom.valSolubility) {
        dom.valSolubility.textContent = result.solubility || '—';
        dom.pillSolubilityWrap.classList.remove('hidden');
      }
      if (dom.molDesc) {
        dom.molDesc.textContent = '';
        dom.molDesc.classList.add('hidden');
      }
      if (dom.customMeta) dom.customMeta.classList.add('hidden');
      if (dom.profileBody) dom.profileBody.classList.remove('hidden');

      if (dom.profileRealLife) {
        dom.profileRealLife.innerHTML = formatChemTextHTML(result.realLife || '');
      }
      if (dom.profileReactions) {
        dom.profileReactions.innerHTML = (result.reactions || [])
          .map((item) => `<li>${formatChemTextHTML(item)}</li>`)
          .join('');
      }
      if (dom.profileNoteWrap && dom.profileNote) {
        const hasNote = Boolean(result.note);
        dom.profileNoteWrap.classList.toggle('hidden', !hasNote);
        dom.profileNote.innerHTML = hasNote ? formatChemTextHTML(result.note) : '';
      }
    } else {
      if (dom.pillStateWrap) dom.pillStateWrap.classList.add('hidden');
      if (dom.pillSolubilityWrap) dom.pillSolubilityWrap.classList.add('hidden');
      if (dom.molDesc) {
        dom.molDesc.textContent = result.description || d.customNote;
        dom.molDesc.classList.remove('hidden');
      }
      if (dom.customMeta) {
        dom.customMeta.classList.remove('hidden');
        if (dom.customChain) {
          dom.customChain.textContent = d.chainLabel(result.isCyclic, result.ringCount, result.topologyKey);
        }
        if (dom.customGroups) {
          const gNames = (result.functionalGroups || [])
            .map((k) => d.funcGroupNames[k])
            .filter(Boolean);
          dom.customGroups.textContent =
            d.groupsPrefix +
            (gNames.length > 0
              ? gNames.join(', ')
              : result.hasHeteroAtom
                ? d.heteroNoFuncGroups
                : d.noFuncGroups);
        }
      }
      if (dom.profileBody) dom.profileBody.classList.add('hidden');
    }
  }

  function applyLanguage() {
    if (!dom.panel) return;
    const d = dict();
    dom.panel.querySelectorAll('[data-i18n-org]').forEach((node) => {
      const key = node.dataset.i18nOrg;
      if (typeof d[key] === 'string') node.textContent = d[key];
    });
    if (dom.searchInput && d.searchPlaceholder) {
      dom.searchInput.placeholder = d.searchPlaceholder;
    }
    if (dom.searchClear && d.searchClose) {
      dom.searchClear.setAttribute('aria-label', d.searchClose);
    }
    if (searchState.open) {
      renderSearchDropdown();
    }
    renderAll({ skipRelax: true, instant: true });
  }

  function getHeaderTexts(lang) {
    const l = lang === 'en' ? 'en' : 'vi';
    return { footerHint: ORG_I18N[l].footerHint };
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    state.lang = lang;
    applyLanguage();
  }

  function bindPointerDragging() {
    if (!dom.svgHost) return;

    dom.svgHost.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;

      const atomEl = e.target.closest('.org-atom-node');
      if (atomEl) {
        const atomId = atomEl.dataset.atomId;
        if (!atomId || !scene.currentPos.has(atomId)) return;

        e.preventDefault();
        if (scene.rafId) {
          cancelAnimationFrame(scene.rafId);
          scene.rafId = null;
        }

        const cur = getRenderedPos(atomId, performance.now()) || scene.currentPos.get(atomId);
        const origPos = state.positions.get(atomId);
        const atomObj = scene.lastAtomMap?.get(atomId);
        const startSvg = clientToSvgPoint(e.clientX, e.clientY);
        scene.drag = {
          atomId,
          isH: Boolean(atomObj && atomObj.element === 'H'),
          originPos: origPos ? { x: origPos.x, y: origPos.y } : { x: cur.x, y: cur.y },
          wasDraggedBefore: state.draggedIds.has(atomId),
          mergeTargetId: null,
          mergeCanAccept: false,
          pointerId: e.pointerId,
          startClientX: e.clientX,
          startClientY: e.clientY,
          offsetX: cur.x - startSvg.x,
          offsetY: cur.y - startSvg.y,
          shiftKey: e.shiftKey,
          moved: false
        };
        try {
          atomEl.setPointerCapture(e.pointerId);
        } catch (_) {}
        dom.svgHost.classList.add('is-dragging');
        return;
      }

      // Grab empty background to pan the molecule smoothly left / right / up / down
      if (e.target.closest('.org-bond-group') || e.target.closest('.org-valence-slot')) return;
      if (!scene.svg || !scene.currentVB) return;

      e.preventDefault();
      if (scene.rafId) {
        cancelAnimationFrame(scene.rafId);
        scene.rafId = null;
      }

      const ctm = scene.svg.getScreenCTM();
      const scaleX = ctm && ctm.a ? ctm.a : 1;
      const scaleY = ctm && ctm.d ? ctm.d : scaleX;

      scene.pan = {
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startPanX: state.panX,
        startPanY: state.panY,
        startVB: { ...scene.currentVB },
        scaleX,
        scaleY
      };
      try {
        dom.svgHost.setPointerCapture(e.pointerId);
      } catch (_) {}
      dom.svgHost.classList.add('is-panning');
    });

    dom.svgHost.addEventListener('pointermove', (e) => {
      if (scene.pan && scene.pan.pointerId === e.pointerId) {
        const dxSvg = (e.clientX - scene.pan.startClientX) / scene.pan.scaleX;
        const dySvg = (e.clientY - scene.pan.startClientY) / scene.pan.scaleY;

        state.panX = scene.pan.startPanX + dxSvg;
        state.panY = scene.pan.startPanY + dySvg;

        const vb = {
          x: scene.pan.startVB.x - dxSvg,
          y: scene.pan.startVB.y - dySvg,
          w: scene.pan.startVB.w,
          h: scene.pan.startVB.h
        };
        scene.currentVB = vb;
        scene.svg.setAttribute(
          'viewBox',
          `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`
        );
        if (scene.bgRect) {
          scene.bgRect.setAttribute('x', (vb.x - 160).toFixed(1));
          scene.bgRect.setAttribute('y', (vb.y - 160).toFixed(1));
          scene.bgRect.setAttribute('width', (vb.w + 320).toFixed(1));
          scene.bgRect.setAttribute('height', (vb.h + 320).toFixed(1));
        }
        return;
      }

      if (!scene.drag || scene.drag.pointerId !== e.pointerId) return;
      const distPx = Math.hypot(
        e.clientX - scene.drag.startClientX,
        e.clientY - scene.drag.startClientY
      );
      if (!scene.drag.moved && distPx < 4) return;
      scene.drag.moved = true;

      const svgPt = clientToSvgPoint(e.clientX, e.clientY);
      const nx = svgPt.x + scene.drag.offsetX;
      const ny = svgPt.y + scene.drag.offsetY;
      const id = scene.drag.atomId;

      state.positions.set(id, { x: nx, y: ny });
      scene.currentPos.set(id, { x: nx, y: ny });
      state.draggedIds.add(id);

      const now = performance.now();
      applyRenderedPositions(now);

      const entry = scene.atomNodes.get(id);
      if (scene.drag.isH) {
        const cand = findMergeCandidate(nx, ny, id);
        scene.drag.mergeTargetId = cand ? cand.targetId : null;
        scene.drag.mergeCanAccept = Boolean(cand && cand.canAccept);
        setMergePreview(scene.drag.mergeTargetId, scene.drag.mergeCanAccept, 1);
        if (entry) entry.g.classList.toggle('is-merging-h', Boolean(cand && cand.canAccept));
      }
    });

    const finishDrag = (e) => {
      if (scene.pan && scene.pan.pointerId === e.pointerId) {
        scene.pan = null;
        dom.svgHost.classList.remove('is-panning');
        return;
      }

      if (!scene.drag || scene.drag.pointerId !== e.pointerId) return;
      const drag = scene.drag;
      scene.drag = null;
      dom.svgHost.classList.remove('is-dragging');

      const dragEntry = scene.atomNodes.get(drag.atomId);
      if (dragEntry) dragEntry.g.classList.remove('is-merging-h');
      clearMergePreview();

      if (drag.moved && drag.isH) {
        const curPt = scene.currentPos.get(drag.atomId);
        const dropCand = curPt ? findMergeCandidate(curPt.x, curPt.y, drag.atomId) : null;
        const targetId = dropCand ? dropCand.targetId : drag.mergeTargetId;
        const canAccept = dropCand ? dropCand.canAccept : drag.mergeCanAccept;
        if (targetId) {
          if (canAccept) {
            state.positions.set(drag.atomId, { x: drag.originPos.x, y: drag.originPos.y });
            if (!drag.wasDraggedBefore) state.draggedIds.delete(drag.atomId);
            if (collapseHydrogenIntoAtom(drag.atomId, targetId)) {
              return;
            }
          }
          state.positions.set(drag.atomId, { x: drag.originPos.x, y: drag.originPos.y });
          scene.currentPos.set(drag.atomId, { x: drag.originPos.x, y: drag.originPos.y });
          if (!drag.wasDraggedBefore) state.draggedIds.delete(drag.atomId);
          triggerShakeError(targetId);
          const { atomMap, adj } = buildAdjacency(state.graph);
          showToast(dict().toasts.valenceFull(1, hasExplicitHNeighbor(atomMap, adj, targetId)), 'warn');
          renderAll({ skipRelax: true, keepViewBox: true });
          return;
        }
      }

      if (drag.moved) {
        markDirtyForAutoTidy();
        renderAll({ skipRelax: true });
        return;
      }

      const id = drag.atomId;
      if (state.connectMode) {
        if (!state.connectFirstId) {
          state.connectFirstId = id;
          state.selectedId = id;
          state.selectedBondKey = null;
          showToast('');
          renderAll({ skipRelax: true, keepViewBox: true });
        } else if (state.connectFirstId === id) {
          state.connectFirstId = null;
          renderAll({ skipRelax: true, keepViewBox: true });
        } else {
          connectTwoAtoms(state.connectFirstId, id);
        }
        return;
      }

      if (drag.shiftKey && state.selectedId && state.selectedId !== id) {
        connectTwoAtoms(state.selectedId, id);
        return;
      }

      state.selectedId = id;
      state.selectedBondKey = null;
      showToast('');
      renderAll({ skipRelax: true, keepViewBox: true });
    };

    dom.svgHost.addEventListener('pointerup', finishDrag);
    dom.svgHost.addEventListener('pointercancel', finishDrag);

    // Smooth mouse-wheel zoom directly on the canvas
    dom.svgHost.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
        setZoom(state.zoom * factor, true);
      },
      { passive: false }
    );
  }

  function bindToolbarHydrogenDrag() {
    if (!dom.toolbar || scene.toolbarDragBound) return;
    const addHBtn = dom.toolbar.querySelector('[data-org-action="add-h"]');
    if (!addHBtn) return;
    scene.toolbarDragBound = true;

    addHBtn.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || addHBtn.disabled) return;
      e.preventDefault();
      scene.toolbarHDrag = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        active: false,
        ghostEl: null,
        targetId: null,
        canAccept: false
      };
    });

    window.addEventListener('pointermove', (e) => {
      const td = scene.toolbarHDrag;
      if (!td || td.pointerId !== e.pointerId) return;

      if (!td.active) {
        if (Math.hypot(e.clientX - td.startX, e.clientY - td.startY) < 6) return;
        td.active = true;
        const ghost = document.createElement('div');
        ghost.className = 'org-drag-ghost-h';
        ghost.textContent = 'H';
        document.body.appendChild(ghost);
        td.ghostEl = ghost;
      }

      if (td.ghostEl) {
        td.ghostEl.style.left = `${e.clientX}px`;
        td.ghostEl.style.top = `${e.clientY}px`;
      }

      let cand = null;
      if (dom.svgHost && scene.svg) {
        const rect = dom.svgHost.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const svgPt = clientToSvgPoint(e.clientX, e.clientY);
          cand = findMergeCandidate(svgPt.x, svgPt.y, null);
        }
      }

      td.targetId = cand ? cand.targetId : null;
      td.canAccept = Boolean(cand && cand.canAccept);
      setMergePreview(td.targetId, td.canAccept, 1);
    });

    const endToolbarDrag = (e) => {
      const td = scene.toolbarHDrag;
      if (!td || td.pointerId !== e.pointerId) return;
      scene.toolbarHDrag = null;

      if (td.ghostEl && td.ghostEl.parentNode) {
        td.ghostEl.parentNode.removeChild(td.ghostEl);
      }
      clearMergePreview();

      if (!td.active) return;

      scene.suppressAddHClick = true;
      setTimeout(() => {
        scene.suppressAddHClick = false;
      }, 120);

      if (e.type === 'pointerup' && td.targetId) {
        if (td.canAccept) {
          addAndCollapseHydrogen(td.targetId);
        } else {
          triggerShakeError(td.targetId);
          const { atomMap, adj } = buildAdjacency(state.graph);
          showToast(
            dict().toasts.valenceFull(1, hasExplicitHNeighbor(atomMap, adj, td.targetId)),
            'warn'
          );
        }
      }
    };

    window.addEventListener('pointerup', endToolbarDrag);
    window.addEventListener('pointercancel', endToolbarDrag);
  }

  function init(opts = {}) {
    callbacks = {
      getLang: opts.getLang || (() => 'vi')
    };

    const panel = document.getElementById('lab-panel-organic');
    if (!panel) return;

    dom = {
      panel,
      toolbar: document.getElementById('org-toolbar'),
      attachBtns: Array.from(panel.querySelectorAll('[data-org-action]')),
      carbonCounter: document.getElementById('org-carbon-counter'),
      btnConnect: document.getElementById('org-btn-connect'),
      btnAutoFill: document.getElementById('org-btn-autofill-h'),
      btnQuickFill: document.getElementById('org-btn-quick-fill'),
      btnToggleH: document.getElementById('org-btn-toggle-h'),
      toggleHLabel: document.getElementById('org-toggle-h-label'),
      btnUndo: document.getElementById('org-btn-undo'),
      btnDelete: document.getElementById('org-btn-delete'),
      btnReset: document.getElementById('org-btn-reset'),
      btnZoomIn: document.getElementById('org-btn-zoom-in'),
      btnZoomOut: document.getElementById('org-btn-zoom-out'),
      btnZoomReset: document.getElementById('org-btn-zoom-reset'),
      searchOverlay: document.getElementById('org-search-overlay'),
      searchTrigger: document.getElementById('org-search-trigger'),
      searchBox: document.getElementById('org-search-box'),
      searchInput: document.getElementById('org-search-input'),
      searchClear: document.getElementById('org-search-clear'),
      searchDropdown: document.getElementById('org-search-dropdown'),
      toast: document.getElementById('org-toast'),
      svgHost: document.getElementById('org-svg-host'),
      stageHint: document.getElementById('org-stage-hint'),
      valenceBanner: document.getElementById('org-valence-banner'),
      valenceText: document.getElementById('org-valence-text'),
      resultCard: document.getElementById('org-result-card'),
      molName: document.getElementById('org-mol-name'),
      molTag: document.getElementById('org-mol-tag'),
      molDesc: document.getElementById('org-mol-desc'),
      valFormula: document.getElementById('org-val-formula'),
      valMass: document.getElementById('org-val-mass'),
      pillStateWrap: document.getElementById('org-pill-state-wrap'),
      valState: document.getElementById('org-val-state'),
      pillSolubilityWrap: document.getElementById('org-pill-solubility-wrap'),
      valSolubility: document.getElementById('org-val-solubility'),
      customMeta: document.getElementById('org-custom-meta'),
      customChain: document.getElementById('org-custom-chain'),
      customGroups: document.getElementById('org-custom-groups'),
      profileBody: document.getElementById('org-profile-body'),
      profileRealLife: document.getElementById('org-profile-reallife'),
      profileReactions: document.getElementById('org-profile-reactions'),
      profileNoteWrap: document.getElementById('org-profile-note-wrap'),
      profileNote: document.getElementById('org-profile-note')
    };

    state.lang = callbacks.getLang();
    state.graph = { atoms: [{ id: 'c1', element: 'C' }], bonds: [] };
    state.positions = new Map([['c1', { x: 0, y: 0 }]]);
    state.draggedIds = new Set();
    state.collapsedHIds = new Set();
    state.selectedId = 'c1';
    state.selectedBondKey = null;
    state.connectMode = false;
    state.connectFirstId = null;
    state.showH = true;
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    state.history = [];
    state.needsAutoTidy = false;
    clearAutoTidyTimer();

    if (dom.toolbar) {
      dom.toolbar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-org-action]');
        if (!btn || btn.disabled) return;
        const action = btn.dataset.orgAction;
        if (action === 'add-h' && scene.suppressAddHClick) {
          scene.suppressAddHClick = false;
          return;
        }
        if (action === 'add-c') addCarbonAtom();
        else if (action === 'add-h') addHydrogenToAtom(state.selectedId);
        else if (action === 'add-o-bridge') addBridgeOxygen();
        else if (action === 'add-oh') addSubstituent('OH');
        else if (action === 'add-o') addSubstituent('=O');
        else if (action === 'add-cooh') addSubstituent('COOH');
        else if (action === 'add-nh2') addSubstituent('NH2');
        else if (action === 'add-cl') addSubstituent('Cl');
        else if (action === 'add-br') addSubstituent('Br');
      });
    }

    if (dom.btnConnect) {
      dom.btnConnect.addEventListener('click', () => {
        state.connectMode = !state.connectMode;
        state.connectFirstId = null;
        showToast('');
        renderAll({ skipRelax: true, keepViewBox: true });
      });
    }

    if (dom.btnAutoFill) dom.btnAutoFill.addEventListener('click', autoFillHydrogens);
    if (dom.btnQuickFill) dom.btnQuickFill.addEventListener('click', autoFillHydrogens);
    if (dom.btnDelete) dom.btnDelete.addEventListener('click', deleteSelection);
    if (dom.btnUndo) dom.btnUndo.addEventListener('click', undo);
    if (dom.btnReset) dom.btnReset.addEventListener('click', reset);

    if (dom.btnZoomIn) dom.btnZoomIn.addEventListener('click', () => setZoom(state.zoom + 0.2));
    if (dom.btnZoomOut) dom.btnZoomOut.addEventListener('click', () => setZoom(state.zoom - 0.2));
    if (dom.btnZoomReset) dom.btnZoomReset.addEventListener('click', resetView);

    if (dom.searchTrigger) {
      dom.searchTrigger.addEventListener('click', () => openSearch());
    }
    if (dom.searchClear) {
      dom.searchClear.addEventListener('click', () => {
        if (dom.searchInput && dom.searchInput.value) {
          dom.searchInput.value = '';
          searchState.activeIdx = 0;
          renderSearchDropdown();
          dom.searchInput.focus();
        } else {
          closeSearch(true);
        }
      });
    }
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', () => {
        searchState.activeIdx = 0;
        renderSearchDropdown();
      });
      dom.searchInput.addEventListener('keydown', (e) => {
        const res = searchState.results;
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (res.length > 0) {
            searchState.activeIdx = (searchState.activeIdx + 1) % res.length;
            renderSearchDropdown();
          }
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (res.length > 0) {
            searchState.activeIdx = (searchState.activeIdx - 1 + res.length) % res.length;
            renderSearchDropdown();
          }
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const chosen = res[searchState.activeIdx] || res[0];
          if (chosen) loadCompoundById(chosen.id);
          return;
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          closeSearch(true);
        }
      });
    }
    if (dom.searchDropdown) {
      dom.searchDropdown.addEventListener('click', (e) => {
        const itemBtn = e.target.closest('[data-compound-id]');
        if (!itemBtn) return;
        loadCompoundById(itemBtn.dataset.compoundId);
      });
    }
    if (!scene.searchOutsideBound) {
      scene.searchOutsideBound = true;
      document.addEventListener('pointerdown', (e) => {
        if (!searchState.open || !dom.searchOverlay) return;
        if (!dom.searchOverlay.contains(e.target)) {
          closeSearch(false);
        }
      });
    }

    if (dom.btnToggleH) {
      dom.btnToggleH.addEventListener('click', () => {
        state.showH = !state.showH;
        markDirtyForAutoTidy();
        if (state.showH && state.collapsedHIds.size > 0) {
          const { atomMap, adj } = buildAdjacency(state.graph);
          const newAtomParents = new Map();
          Array.from(state.collapsedHIds).forEach((hid) => {
            const parentId = (adj.get(hid) || []).find((e) => atomMap.get(e.to)?.element !== 'H')?.to;
            state.positions.delete(hid);
            scene.currentPos.delete(hid);
            if (parentId) newAtomParents.set(hid, parentId);
          });
          state.collapsedHIds.clear();
          renderAll({ newAtomParents });
          return;
        }
        renderAll();
      });
    }

    bindPointerDragging();
    bindToolbarHydrogenDrag();

    if (dom.svgHost) {
      dom.svgHost.addEventListener('dblclick', (e) => {
        const atomEl = e.target.closest('.org-atom-node');
        if (!atomEl || state.connectMode) return;
        const atomId = atomEl.dataset.atomId;
        if (atomId) expandCollapsedHydrogens(atomId);
      });

      dom.svgHost.addEventListener('click', (e) => {
        const slotEl = e.target.closest('.org-valence-slot');
        if (slotEl) {
          const pid = slotEl.dataset.slotAtomId;
          const ang = Number(slotEl.dataset.slotAngle);
          if (pid) addHydrogenToAtom(pid, Number.isFinite(ang) ? ang : undefined);
          return;
        }
        const bondEl = e.target.closest('.org-bond-group');
        if (bondEl) {
          const bKey = bondEl.dataset.bondKey;
          if (bKey) handleBondClick(bKey);
        }
      });

      dom.svgHost.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.connectMode) {
          e.stopPropagation();
          exitConnectMode();
          renderAll({ skipRelax: true, keepViewBox: true });
          return;
        }
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (state.selectedId || state.selectedBondKey) {
            e.preventDefault();
            deleteSelection();
          }
          return;
        }
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const slotEl = e.target.closest('.org-valence-slot');
        if (slotEl) {
          e.preventDefault();
          const pid = slotEl.dataset.slotAtomId;
          const ang = Number(slotEl.dataset.slotAngle);
          if (pid) addHydrogenToAtom(pid, Number.isFinite(ang) ? ang : undefined);
          return;
        }
        const bondEl = e.target.closest('.org-bond-group');
        if (bondEl) {
          e.preventDefault();
          handleBondClick(bondEl.dataset.bondKey);
        }
      });
    }

    if (scene.visibilityObserver) {
      scene.visibilityObserver.disconnect();
      scene.visibilityObserver = null;
    }
    const handleVis = () => {
      if (isStageVisible()) {
        startAmbientLoop();
      } else {
        stopAmbientLoop();
      }
      if (isPanelActiveInUI()) {
        if (state.needsAutoTidy) resetAutoTidyTimer();
      } else {
        clearAutoTidyTimer();
      }
    };
    if (typeof MutationObserver !== 'undefined') {
      scene.visibilityObserver = new MutationObserver(handleVis);
      scene.visibilityObserver.observe(panel, { attributes: true, attributeFilter: ['class'] });
      const modal = panel.closest('#lab-modal');
      if (modal) {
        scene.visibilityObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });
      }
    }
    if (!scene.visibilityBound) {
      scene.visibilityBound = true;
      document.addEventListener('visibilitychange', handleVis);
    }

    if (!panel.dataset.orgIdleBound) {
      panel.dataset.orgIdleBound = '1';
      const onPanelActivity = () => {
        if (state.needsAutoTidy) resetAutoTidyTimer();
      };
      panel.addEventListener('pointerdown', onPanelActivity, { passive: true });
      panel.addEventListener('pointermove', onPanelActivity, { passive: true });
      panel.addEventListener('wheel', onPanelActivity, { passive: true });
      panel.addEventListener('keydown', onPanelActivity, { passive: true });
    }

    applyLanguage();
  }

  const api = {
    init,
    setLang,
    getHeaderTexts,
    reset,
    identifyMolecule,
    analyzeAndNameMolecule: identifyMolecule,
    buildNormalizedHeavyGraph,
    areHeavyGraphsIsomorphic,
    searchCompounds,
    buildGraphFromCompound,
    loadCompoundById,
    KNOWN_MOLECULES
  };

  if (typeof global !== 'undefined') {
    global.OrganicBuilder = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
