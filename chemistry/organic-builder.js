// Interactive Periodic Table — Molecule Builder (organic-builder.js)
// Tab 3 inside #lab-modal: Build 2D linear, branched, and cyclic organic molecules
// Flat matte vector aesthetic (ChemDraw Dark Mode / One Dark IDE), zoom controls, free drag-and-drop,
// ring-aware layout, and exact canonical graph-isomorphism recognition of 110+ familiar compounds.

(function (global) {
  'use strict';

  const MAX_CARBONS = 12;
  const MIN_ZOOM = 0.45;
  const MAX_ZOOM = 2.5;
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
      funcGroupNames: {
        carboxyl: '-COOH (Carboxylic acid)',
        ester: '-COO- (Ester)',
        aldehyde: '-CHO (Aldehyde)',
        ketone: '>C=O (Ketone)',
        phenol: '-OH gắn vòng thơm (Phenol)',
        alcohol: '-OH (Alcohol)',
        ether: '-O- (Ether)',
        amine: '-NH₂ / Amine',
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
        anhydride: 'Acid anhydride',
        carbohydrate: 'Carbohydrate',
        aminoacid: 'Amino acid',
        amine: 'Amine',
        amide: 'Amide',
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
        selectCarbon: 'Hãy chọn một nguyên tử Carbon (C) để gắn nhóm chức này.',
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
      funcGroupNames: {
        carboxyl: '-COOH (Carboxylic acid)',
        ester: '-COO- (Ester)',
        aldehyde: '-CHO (Aldehyde)',
        ketone: '>C=O (Ketone)',
        phenol: '-OH on aromatic ring (Phenol)',
        alcohol: '-OH (Alcohol)',
        ether: '-O- (Ether)',
        amine: '-NH₂ / Amine',
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
        anhydride: 'Acid anhydride',
        carbohydrate: 'Carbohydrate',
        aminoacid: 'Amino acid',
        amine: 'Amine',
        amide: 'Amide',
        halogen: 'Halogen derivative',
        pharma: 'Pharmaceutical',
        custom: 'Organic compound'
      },
      customTitle: (formula, topoLabel, famLabel) =>
        `${formula} · ${topoLabel} ${famLabel}`,
      toasts: {
        selectHeavy: 'Select an atom with open valence (C, O, or N) first.',
        selectCarbon: 'Select a Carbon (C) atom to attach this functional group.',
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

  function getMissingValence(atomMap, adj, id) {
    const atom = atomMap.get(id);
    if (!atom) return 0;
    const maxVal = ELEMENT_VALENCE[atom.element] || 0;
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
    // - 10-membered fused bicyclic perimeters (asymmetric Kekulé naphthalene where the shared bond is single)
    if (n >= 6) {
      const aromaticEdgeFlags = new Uint8Array(edges.length);
      const isAromEl = (el) => el === 'C' || el === 'N';
      const allow10Cycle = n >= 10 && edges.length >= 11;
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
    let hasEster = false;
    let hasAldehyde = false;
    let hasKetone = false;
    let hasPhenol = false;
    let hasAlcohol = false;
    let hasEther = false;
    let hasAmine = false;
    let hasHalogen = false;
    let hasCCDouble = false;
    let hasCCTriple = false;

    (graph.bonds || []).forEach((b) => {
      const u = b.from ?? b.a ?? b.source;
      const v = b.to ?? b.b ?? b.target;
      const elU = atomMap.get(u)?.element;
      const elV = atomMap.get(v)?.element;
      if (elU === 'C' && elV === 'C') {
        if (b.order === 3) hasCCTriple = true;
        else if (b.order === 2 && (!aromAtomIds.has(u) || !aromAtomIds.has(v))) hasCCDouble = true;
      }
    });

    atomMap.forEach((atom, id) => {
      if (atom.element === 'Cl' || atom.element === 'Br' || atom.element === 'F' || atom.element === 'I') {
        hasHalogen = true;
      } else if (atom.element === 'N') {
        hasAmine = true;
      } else if (atom.element === 'O') {
        const heavyNbs = (adj.get(id) || []).filter((e) => atomMap.get(e.to)?.element !== 'H');
        if (heavyNbs.length === 2 && heavyNbs.every((e) => e.order === 1)) {
          const isEsterO = heavyNbs.some((e) =>
            (adj.get(e.to) || []).some((e2) => e2.order === 2 && atomMap.get(e2.to)?.element === 'O')
          );
          if (isEsterO) hasEster = true;
          else hasEther = true;
        }
      } else if (atom.element === 'C') {
        const nbs = adj.get(id) || [];
        const dblO = nbs.some((e) => e.order === 2 && atomMap.get(e.to)?.element === 'O');
        const singleOList = nbs.filter((e) => e.order === 1 && atomMap.get(e.to)?.element === 'O');
        const hasOH = singleOList.some((e) => {
          const oHeavy = (adj.get(e.to) || []).filter((oe) => atomMap.get(oe.to)?.element !== 'H');
          return oHeavy.length === 1;
        });
        const hasORBridge = singleOList.some((e) => {
          const oHeavy = (adj.get(e.to) || []).filter((oe) => atomMap.get(oe.to)?.element !== 'H');
          return oHeavy.length === 2;
        });
        const heavySum = getHeavyBondSum(atomMap, adj, id);
        if (dblO && hasOH) hasCarboxyl = true;
        else if (dblO && hasORBridge) hasEster = true;
        else if (dblO) {
          if (4 - heavySum >= 1) hasAldehyde = true;
          else hasKetone = true;
        } else if (hasOH) {
          if (aromAtomIds.has(id)) hasPhenol = true;
          else hasAlcohol = true;
        }
      }
    });

    const functionalGroups = [];
    if (hasCarboxyl) functionalGroups.push('carboxyl');
    if (hasEster) functionalGroups.push('ester');
    if (hasAldehyde) functionalGroups.push('aldehyde');
    if (hasKetone) functionalGroups.push('ketone');
    if (hasPhenol) functionalGroups.push('phenol');
    if (hasAlcohol) functionalGroups.push('alcohol');
    if (hasEther) functionalGroups.push('ether');
    if (hasAmine) functionalGroups.push('amine');
    if (hasHalogen) functionalGroups.push('halogen');
    if (normHeavy.hasAromatic) functionalGroups.push('arene');
    if (hasCCDouble) functionalGroups.push('alkene');
    if (hasCCTriple) functionalGroups.push('alkyne');

    let catKey = 'alkane';
    if (hasCarboxyl && hasAmine) catKey = 'aminoacid';
    else if (hasCarboxyl) catKey = 'carboxylic';
    else if (hasEster) catKey = 'ester';
    else if (hasAldehyde) catKey = 'aldehyde';
    else if (hasKetone) catKey = 'ketone';
    else if (hasPhenol) catKey = 'phenol';
    else if (hasAlcohol) catKey = 'alcohol';
    else if (hasEther) catKey = 'ether';
    else if (hasAmine) catKey = 'amine';
    else if (hasHalogen) catKey = 'halogen';
    else if (normHeavy.hasAromatic) catKey = 'arene';
    else if (hasCCTriple) catKey = 'alkyne';
    else if (hasCCDouble) catKey = isCyclic ? 'cycloalkene' : 'alkene';
    else if (isCyclic) catKey = 'cycloalkane';

    return { topologyKey, catKey, isCyclic, ringCount, functionalGroups };
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
    const { topologyKey, catKey, isCyclic, ringCount, functionalGroups } = classifyCustomMolecule(
      graph,
      normHeavy
    );

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
    return {
      matched: false,
      compoundId: null,
      commonName: d.customTitle(molecularFormula || '—', topoLabel, famLabel, isCyclic),
      categoryKey: catKey,
      categoryLabel: famLabel,
      state: null,
      solubility: null,
      realLife: null,
      reactions: [],
      note: null,
      description: d.customNote,
      topologyKey,
      isCyclic,
      ringCount,
      functionalGroups,
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
        1: [-Math.PI / 2],
        2: [-Math.PI / 2, Math.PI / 2],
        3: [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6],
        4: [-Math.PI / 2, 0, Math.PI / 2, Math.PI]
      };
      if (defaults[count]) return defaults[count].slice();
      const out = [];
      for (let i = 0; i < count; i++) out.push(normalizeAngle(-Math.PI / 2 + (2 * Math.PI * i) / count));
      return out;
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
      return elA === 'C' || elB === 'C' ? 46 : 42;
    }
    if (elA === 'C' && elB === 'C') return 68;
    return 62;
  }

  // Safe unit direction between two points (guarantees non-zero push even if coincident!)
  function safeUnitVec(dx, dy, seed) {
    const dist = Math.hypot(dx, dy);
    if (dist > 0.05) return { ux: dx / dist, uy: dy / dist, dist };
    const ang = (seed * 2.39996) % (2 * Math.PI);
    return { ux: Math.cos(ang), uy: Math.sin(ang), dist: 0.05 };
  }

  function relaxLayout(graph, positions, options = {}) {
    const { draggedIds = new Set(), collapsedHIds = new Set(), iterations = 115, showH = true } = options;
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

        const edgeLen = 68;
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

        // Push exocyclic substituents radially outward from ring centroid
        cycle.forEach((cid) => {
          const cp = pos.get(cid);
          const { ux, uy } = safeUnitVec(cp.x - cx, cp.y - cy, 1);
          const nbs = adj.get(cid) || [];
          const exo = nbs.filter((e) => !ringAtomSet.has(e.to) && visibleSet.has(e.to));
          if (exo.length === 1) {
            const eid = exo[0].to;
            const ep = pos.get(eid);
            const L = idealBondLength(atomMap.get(cid).element, atomMap.get(eid).element);
            disp.get(eid).x += (cp.x + ux * L - ep.x) * 0.14;
            disp.get(eid).y += (cp.y + uy * L - ep.y) * 0.14;
          } else if (exo.length === 2) {
            const baseAng = Math.atan2(uy, ux);
            exo.forEach((e, idx) => {
              const eid = e.to;
              const ep = pos.get(eid);
              const L = idealBondLength(atomMap.get(cid).element, atomMap.get(eid).element);
              const ang = baseAng + (idx === 0 ? -0.52 : 0.52);
              disp.get(eid).x += (cp.x + Math.cos(ang) * L - ep.x) * 0.12;
              disp.get(eid).y += (cp.y + Math.sin(ang) * L - ep.y) * 0.12;
            });
          }
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
            const minChord = elA === 'H' && elB === 'H' ? 50 : elA === 'H' || elB === 'H' ? 62 : 90;
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
          const minDist = elA === 'H' && elB === 'H' ? 36 : elA === 'H' || elB === 'H' ? 46 : 60;
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

      // 5. Apply clamped displacements
      const stepCap = 12 * (1 - iter / (iterations * 1.4));
      graph.atoms.forEach((a) => {
        const d = disp.get(a.id);
        const anchor = anchorPos.get(a.id);
        if (anchor && !ringAtomSet.has(a.id)) {
          d.x = d.x * 0.25 + (anchor.x - pos.get(a.id).x) * 0.35;
          d.y = d.y * 0.25 + (anchor.y - pos.get(a.id).y) * 0.35;
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
      keepViewBox = false
    } = options;

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
      const maxVal = ELEMENT_VALENCE[atom.element] || 4;
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
      const t = Math.max(0, Math.min(1, (now - scene.animStart) / scene.animDuration));
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
    isMutating: false
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
      selectedBondKey: state.selectedBondKey
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
    state.graph.atoms.push({ id: newId, element: 'C' });
    state.graph.bonds.push({ from: sel.id, to: newId, order: 1 });
    state.selectedId = newId;
    state.selectedBondKey = null;
    showToast('');
    renderAll({ newAtomParents: new Map([[newId, sel.id]]) });
  }

  function addBridgeOxygen() {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel || sel.element !== 'C') {
      showToast(t.selectCarbon, 'warn');
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
    if (freeVal < 1) {
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
    renderAll({ newAtomParents: new Map([[hId, target.id]]) });
  }

  function autoFillHydrogens() {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const toAdd = [];
    state.graph.atoms.forEach((atom) => {
      if (atom.element === 'H') return;
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
    renderAll({ newAtomParents: newParents });
  }

  function addSubstituent(kind) {
    if (state.isMutating) return;
    exitConnectMode();
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel || sel.element !== 'C') {
      showToast(t.selectCarbon, 'warn');
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
      if (dblOs.length >= 1 && singleOHs.length >= 1) {
        showToast(t.alreadyCarboxyl, 'info');
        triggerShakeError(sel.id);
        return;
      }
      const needDbl = dblOs.length === 0 ? 2 : 0;
      const needOH = singleOHs.length === 0 ? 1 : 0;
      const isTerm = cNbs.length <= 1 && cNbs.every((e) => e.order === 1);
      if (isTerm && freeVal >= needDbl + needOH) {
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
      renderAll({ newAtomParents: new Map([[oId, sel.id]]) });
      return;
    }

    if (kind === 'OH') {
      if (singleOHs.length >= 1) {
        showToast(t.geminalOh, 'warn');
        triggerShakeError(sel.id);
        return;
      }
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
      state.selectedBondKey = null;
      showToast('');
      renderAll({ newAtomParents: new Map([[oId, sel.id], [hId, oId]]) });
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
      state.selectedBondKey = null;
      showToast('');
      // Correct parent chain: N attaches to C, and BOTH H attach cleanly to N (fanning 120° away from C!)
      renderAll({ newAtomParents: new Map([[nId, sel.id], [h1, nId], [h2, nId]]) });
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

    const maxA = ELEMENT_VALENCE[a.element] || 1;
    const maxB = ELEMENT_VALENCE[b.element] || 1;
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

    const maxElA = ELEMENT_VALENCE[a.element] || 1;
    const maxElB = ELEMENT_VALENCE[b.element] || 1;
    if (maxElA < 2 || maxElB < 2) {
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
    showToast('');
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
    showToast('');
    renderAll({ skipRelax: true });
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
        if (act === 'add-c' || act === 'add-h') {
          btn.disabled = !isHeavyMulti;
        } else {
          btn.disabled = !isC;
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
      if (dom.valMass) dom.valMass.textContent = `${result.actualMolarMass.toFixed(3)} g/mol`;
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

    if (dom.molName) dom.molName.textContent = result.commonName;
    if (dom.molTag) {
      dom.molTag.textContent = result.categoryLabel;
      dom.molTag.dataset.orgCat = result.categoryKey;
    }
    if (dom.valFormula) dom.valFormula.innerHTML = toSubscriptHTML(result.molecularFormula || '—');
    if (dom.valMass) dom.valMass.textContent = `${result.molarMass.toFixed(3)} g/mol`;

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
        dom.molDesc.textContent = result.description;
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
            d.groupsPrefix + (gNames.length > 0 ? gNames.join(', ') : d.noFuncGroups);
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

    if (dom.btnToggleH) {
      dom.btnToggleH.addEventListener('click', () => {
        state.showH = !state.showH;
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

    applyLanguage();
  }

  const api = {
    init,
    setLang,
    getHeaderTexts,
    reset,
    identifyMolecule,
    analyzeAndNameMolecule: identifyMolecule,
    KNOWN_MOLECULES
  };

  if (typeof global !== 'undefined') {
    global.OrganicBuilder = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
