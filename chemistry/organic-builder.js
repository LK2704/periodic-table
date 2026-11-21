// Interactive Periodic Table — Organic Carbon Chain Builder & IUPAC Naming Lab (organic-builder.js)
// Tab 3 inside #lab-modal (GDPT 2018 High School Organic Chemistry: English IUPAC + bilingual VI/EN explanations)
// Features:
// 1. 3D-Matte CPK Ball-and-Stick SVG Molecule Builder (1-10 Carbons) with explicit Hydrogens & clickable open valence slots
// 2. Smooth animation engine: rAF spring-lerp layout glide, pop-in + bond-grow, staggered Auto-fill H,
//    bond-order separation + shimmer, shrink-fade delete, red shake error feedback, and hover micro-interactions
// 3. Rigorous IUPAC 2013 / GDPT 2018 tree-graph naming engine (exportable pure function analyzeAndNameMolecule)
// 4. Realtime quantitative dashboard (Formula, Condensed Structure, Molar Mass M from window.ELEMENTS, DoU k) & 3-step explanation

(function (global) {
  'use strict';

  const MAX_CARBONS = 10;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const ROOT_STEMS = [
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
    'dec'
  ];

  const MULT_PREFIX = [
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
    'deca'
  ];

  const COMPLEX_MULT = ['', '', 'bis', 'tris', 'tetrakis'];

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

  const HALOGEN_NAMES = {
    F: 'fluoro',
    Cl: 'chloro',
    Br: 'bromo',
    I: 'iodo'
  };

  const PFG_RANK = {
    carboxyl: 5,
    aldehyde: 4,
    ketone: 3,
    alcohol: 2,
    amine: 1,
    none: 0
  };

  const ATOM_RADIUS = {
    C: 22,
    H: 14,
    O: 18.5,
    N: 18.5,
    Cl: 18.5,
    F: 17.5,
    Br: 19.5,
    I: 19.5
  };

  const CPK_STYLE = {
    C: { grad: 'orgGradC', gradMain: 'orgGradCMain', stroke: '#64748b', text: '#f8fafc', fontSize: 15 },
    H: { grad: 'orgGradH', stroke: '#94a3b8', text: '#0f172a', fontSize: 11.5 },
    O: { grad: 'orgGradO', stroke: '#fca5a5', text: '#ffffff', fontSize: 13.5 },
    N: { grad: 'orgGradN', stroke: '#93c5fd', text: '#ffffff', fontSize: 13.5 },
    Cl: { grad: 'orgGradCl', stroke: '#86efac', text: '#ffffff', fontSize: 12.5 },
    F: { grad: 'orgGradF', stroke: '#99f6e4', text: '#ffffff', fontSize: 13 },
    Br: { grad: 'orgGradBr', stroke: '#fdba74', text: '#ffffff', fontSize: 12.5 },
    I: { grad: 'orgGradI', stroke: '#d8b4fe', text: '#ffffff', fontSize: 13.5 }
  };

  const ORG_I18N = {
    vi: {
      footerHint:
        'Mẹo: Bấm nguyên tử C để chọn • Bấm tay nối trống hoặc "+ H" để gắn Hydro • Bấm liên kết C–C để xoay vòng đơn (–), đôi (=), ba (≡).',
      presetsLabel: 'Ví dụ mẫu:',
      addC: '+ C',
      addH: '+ H',
      autoFillH: 'Điền đủ H',
      deleteBtn: 'Xóa',
      undoBtn: 'Hoàn tác',
      resetBtn: 'Đặt lại (C)',
      showHLabel: 'Hiện H',
      hideHLabel: 'Ẩn H',
      numberingToggle: 'Số mạch chính (1,2,3)',
      carbonCount: (n) => `${n}/${MAX_CARBONS} C`,
      stageHint:
        'Bấm nguyên tử C để chọn • Bấm tay nối trống hoặc + H để gắn Hydro • Bấm liên kết C–C để đổi bậc (– / = / ≡)',
      heroEyebrow: 'Tên gọi IUPAC (GDPT 2018)',
      heroEyebrowPreview: 'Tên IUPAC dự kiến (chưa đủ hóa trị IV)',
      incompleteValence: (n) =>
        `Còn thiếu ${n} liên kết để đủ hóa trị — bấm "+ H", bấm tay hóa trị trống, hoặc dùng:`,
      mFormula: 'Công thức phân tử',
      mCondensed: 'CTCT thu gọn',
      mMolarMass: 'Phân tử khối (M)',
      mUnsat: 'Độ bất bão hòa (k)',
      stepsTitle: 'Cách gọi tên từng bước',
      step1Title: '1. Chọn mạch chính',
      step2Title: '2. Đánh số mạch chính',
      step3Title: '3. Liệt kê nhánh & ghép tên',
      slotTooltip: 'Bấm để gắn nhanh 1 nguyên tử H vào vị trí hóa trị trống này',
      bondTooltip: (ord) => {
        const names = { 1: 'Liên kết đơn (–)', 2: 'Liên kết đôi (=)', 3: 'Liên kết ba (≡)' };
        return `${names[ord] || 'Liên kết C–C'} — Bấm để đổi bậc liên kết`;
      },
      atomTooltip: (el, usedVal, maxVal) =>
        `${el} (đã dùng ${usedVal}/${maxVal} hóa trị)`,
      classes: {
        alkane: 'Alkane (Hiđrocacbon no)',
        alkene: 'Alkene (Hiđrocacbon không no)',
        alkadiene: 'Alkadiene (2 liên kết đôi)',
        alkyne: 'Alkyne (Hiđrocacbon không no)',
        alkenyne: 'Alkenyne (Đôi & ba)',
        halogen: 'Halogen derivative (Dẫn xuất halogen)',
        alcohol: 'Alcohol (Ancol)',
        aldehyde: 'Aldehyde (Anđehit)',
        ketone: 'Ketone (Xeton)',
        carboxylic: 'Carboxylic acid (Axit cacboxylic)',
        amine: 'Amine (Amin)'
      },
      toasts: {
        selectCarbon: 'Hãy chọn một nguyên tử Carbon (C) trước khi gắn thêm nhánh hoặc nhóm chức.',
        selectAtomForH: 'Hãy chọn nguyên tử C, O hoặc N còn trống hóa trị để gắn Hydro.',
        maxCarbons: `Phạm vi tối đa là ${MAX_CARBONS} nguyên tử Carbon (từ meth- đến dec-).`,
        valenceFull: (need, hasH) =>
          hasH
            ? `Nguyên tử đang chọn không đủ hóa trị trống (cần ${need} liên kết). Hãy xóa bớt H nếu muốn thay bằng nhóm khác.`
            : `Nguyên tử đang chọn không đủ hóa trị trống (cần ${need} liên kết, tối đa hóa trị IV).`,
        doubleOExists: 'Nguyên tử Carbon này đã có liên kết đôi =O, không thể gắn thêm =O.',
        alreadyCarboxyl: 'Nguyên tử Carbon này đã là nhóm carboxyl (-COOH).',
        geminalOh: 'Không gắn 2 nhóm -OH trên cùng một nguyên tử C (ancol không bền).',
        alreadyFullH: 'Tất cả nguyên tử đã bão hòa đủ hóa trị!',
        cannotDeleteLastC: 'Không thể xóa nguyên tử Carbon duy nhất của phân tử.',
        cannotSplitChain: 'Không thể xóa nguyên tử C này vì sẽ làm gãy mạch Carbon thành 2 mảnh rời.',
        bondExceedsValence:
          'Không thể nâng lên liên kết đôi (=): nguyên tử Carbon đã gắn tối đa nhánh/nhóm chức (hóa trị IV).',
        bondWrapToSingle:
          'Đã xoay về liên kết đơn (–) vì không thể tạo liên kết ba (≡) do bị vướng nhánh/nhóm chức (hóa trị IV).',
        bondStrippedH: (cnt, ord) =>
          `Đã tự động tách ${cnt} nguyên tử H thừa để nâng lên liên kết ${ord === 2 ? 'đôi (=)' : 'ba (≡)'}.`
      },
      pfgLabel: {
        carboxyl: 'nhóm carboxyl (-COOH)',
        aldehyde: 'nhóm aldehyde (-CHO)',
        ketone: 'nhóm carbonyl ketone (>C=O)',
        alcohol: 'nhóm hydroxyl (-OH)',
        amine: 'nhóm amino (-NH₂)'
      },
      stepExplain: {
        mainChain: (len, stem, reasonKey, pfgKey, multCount) => {
          const reasonMap = {
            single: 'Phân tử chỉ có 1 nguyên tử Carbon',
            pfg: `chứa ${ORG_I18N.vi.pfgLabel[pfgKey] || 'nhóm chức ưu tiên'}`,
            multiple: `chứa tối đa ${multCount} liên kết bội và dài nhất có thể`,
            longest: 'là mạch Carbon liên tục dài nhất (ưu tiên nhiều nhánh nhất khi bằng nhau)'
          };
          return `Mạch chính gồm ${len} nguyên tử C (gốc "${stem}-"): ${reasonMap[reasonKey] || reasonMap.longest}.`;
        },
        numbering: (reasonKey, pfgKey) => {
          const map = {
            single: 'Mạch chỉ có 1 nguyên tử C nên không cần đánh số vị trí.',
            symmetric: 'Mạch hoàn toàn đối xứng nên đánh số từ đầu nào cũng cho kết quả giống nhau.',
            pfg: `Đánh số ưu tiên sao cho ${ORG_I18N.vi.pfgLabel[pfgKey] || 'nhóm chức chính'} mang chỉ số vị trí nhỏ nhất.`,
            multiple: 'Đánh số từ đầu gần liên kết bội (=, ≡) hơn để tổng chỉ số vị trí nhỏ nhất.',
            doubleOverTriple: 'Liên kết đôi (=) và ba (≡) cách đều hai đầu → ưu tiên liên kết đôi (=) mang số nhỏ hơn.',
            branchLocant: 'Đánh số từ đầu gần nhánh thế hơn (chỉ số vị trí nhánh nhỏ nhất tại điểm khác biệt đầu tiên).',
            alpha: 'Hai chiều cho tập vị trí nhánh bằng nhau → ưu tiên nhánh đứng trước theo bảng chữ cái tiếng Anh.'
          };
          return map[reasonKey] || map.symmetric;
        },
        assemble: (subsList, coreName, finalName) => {
          if (!subsList.length) {
            return `Không có nhánh thế ngoài mạch chính → ghép gốc mạch chính với đuôi đặc trưng thu được "${finalName}".`;
          }
          return `Sắp xếp nhánh theo thứ tự chữ cái (${subsList.join(', ')}) + mạch chính "${coreName}" → "${finalName}".`;
        }
      }
    },
    en: {
      footerHint:
        'Tip: Click a Carbon atom to select • Click open slots or "+ H" to attach Hydrogen • Click any C–C bond to cycle single (–), double (=), triple (≡).',
      presetsLabel: 'Presets:',
      addC: '+ C',
      addH: '+ H',
      autoFillH: 'Auto-fill H',
      deleteBtn: 'Delete',
      undoBtn: 'Undo',
      resetBtn: 'Reset (C)',
      showHLabel: 'Show H',
      hideHLabel: 'Hide H',
      numberingToggle: 'Main chain # (1,2,3)',
      carbonCount: (n) => `${n}/${MAX_CARBONS} C`,
      stageHint:
        'Click a Carbon to select • Click open valence slots or + H to attach Hydrogen • Click any C–C bond to cycle order (– / = / ≡)',
      heroEyebrow: 'IUPAC Name (2013 / Curricular)',
      heroEyebrowPreview: 'Preview IUPAC Name (incomplete valence)',
      incompleteValence: (n) =>
        `Missing ${n} bond${n > 1 ? 's' : ''} to satisfy valence — click "+ H", click an open slot, or:`,
      mFormula: 'Molecular Formula',
      mCondensed: 'Condensed Formula',
      mMolarMass: 'Molar Mass (M)',
      mUnsat: 'Unsaturation (k)',
      stepsTitle: 'Step-by-Step IUPAC Naming',
      step1Title: '1. Select the main chain',
      step2Title: '2. Number the main chain',
      step3Title: '3. Order substituents & assemble',
      slotTooltip: 'Click to attach 1 Hydrogen atom at this open valence slot',
      bondTooltip: (ord) => {
        const names = { 1: 'Single bond (–)', 2: 'Double bond (=)', 3: 'Triple bond (≡)' };
        return `${names[ord] || 'C–C bond'} — Click to cycle bond order`;
      },
      atomTooltip: (el, usedVal, maxVal) =>
        `${el} (${usedVal}/${maxVal} valence used)`,
      classes: {
        alkane: 'Alkane',
        alkene: 'Alkene',
        alkadiene: 'Alkadiene',
        alkyne: 'Alkyne',
        alkenyne: 'Alkenyne',
        halogen: 'Halogen derivative',
        alcohol: 'Alcohol',
        aldehyde: 'Aldehyde',
        ketone: 'Ketone',
        carboxylic: 'Carboxylic acid',
        amine: 'Amine'
      },
      toasts: {
        selectCarbon: 'Select a Carbon (C) atom first before attaching a branch or functional group.',
        selectAtomForH: 'Select a C, O, or N atom with open valence to attach Hydrogen.',
        maxCarbons: `Maximum scope is ${MAX_CARBONS} Carbon atoms (meth- through dec-).`,
        valenceFull: (need, hasH) =>
          hasH
            ? `Selected atom lacks free valence (needs ${need} bond${need > 1 ? 's' : ''}). Delete an H atom first to replace it.`
            : `Selected atom lacks free valence (needs ${need} bond${need > 1 ? 's' : ''}; max valence IV).`,
        doubleOExists: 'This Carbon already has a double-bonded =O oxygen.',
        alreadyCarboxyl: 'This Carbon is already a carboxyl (-COOH) group.',
        geminalOh: 'Cannot attach two -OH groups to the same Carbon atom (unstable geminal diol).',
        alreadyFullH: 'All atoms already have complete valence!',
        cannotDeleteLastC: 'Cannot delete the only Carbon atom in the molecule.',
        cannotSplitChain: 'Cannot delete this Carbon because it would split the chain into disconnected fragments.',
        bondExceedsValence:
          'Cannot raise to a double bond (=): Carbon is already occupied by other branches/groups (valence IV).',
        bondWrapToSingle:
          'Cycled back to single bond (–) because a triple bond (≡) is blocked by existing branches/groups (valence IV).',
        bondStrippedH: (cnt, ord) =>
          `Automatically removed ${cnt} excess H atom${cnt > 1 ? 's' : ''} to form a ${ord === 2 ? 'double (=)' : 'triple (≡)'} bond.`
      },
      pfgLabel: {
        carboxyl: 'carboxyl group (-COOH)',
        aldehyde: 'aldehyde group (-CHO)',
        ketone: 'ketone carbonyl (>C=O)',
        alcohol: 'hydroxyl group (-OH)',
        amine: 'amino group (-NH₂)'
      },
      stepExplain: {
        mainChain: (len, stem, reasonKey, pfgKey, multCount) => {
          const reasonMap = {
            single: 'Single-carbon molecule',
            pfg: `includes the principal ${ORG_I18N.en.pfgLabel[pfgKey] || 'functional group'}`,
            multiple: `contains the maximum ${multCount} multiple bond${multCount > 1 ? 's' : ''} with greatest length`,
            longest: 'longest continuous Carbon chain (most substituents breaks ties)'
          };
          return `Main chain has ${len} Carbon${len > 1 ? 's' : ''} (stem "${stem}-"): ${reasonMap[reasonKey] || reasonMap.longest}.`;
        },
        numbering: (reasonKey, pfgKey) => {
          const map = {
            single: 'Only 1 Carbon atom — no chain numbering needed.',
            symmetric: 'Symmetric chain — numbering from either end produces the same locants.',
            pfg: `Numbered to give the principal ${ORG_I18N.en.pfgLabel[pfgKey] || 'functional group'} the lowest locant.`,
            multiple: 'Numbered from the end closer to multiple bond(s) (=, ≡) for lowest locants.',
            doubleOverTriple: 'Double (=) and triple (≡) bonds are equidistant → double bond takes the lower locant.',
            branchLocant: 'Numbered for the lowest substituent locant at the first point of difference.',
            alpha: 'Equal substituent locant sets → lower locant goes to the alphabetically first substituent.'
          };
          return map[reasonKey] || map.symmetric;
        },
        assemble: (subsList, coreName, finalName) => {
          if (!subsList.length) {
            return `No side substituents → combine root and suffix to form "${finalName}".`;
          }
          return `Order prefixes alphabetically (${subsList.join(', ')}) + parent "${coreName}" → "${finalName}".`;
        }
      }
    }
  };

  // =========================================================================
  // PURE HELPER UTILITIES
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

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getAtomicMass(sym) {
    if (typeof window !== 'undefined' && Array.isArray(window.ELEMENTS)) {
      const found = window.ELEMENTS.find((e) => e.symbol === sym);
      if (found && typeof found.mass === 'number') return found.mass;
    }
    return FALLBACK_MASSES[sym] || 0;
  }

  function compareNumberArrays(a, b) {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return a.length - b.length;
  }

  function compareStringArrays(a, b) {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      if (a[i] < b[i]) return -1;
      if (a[i] > b[i]) return 1;
    }
    return a.length - b.length;
  }

  function sortKeyForSubstituent(name) {
    return name.replace(/^[(\d,\-\s]+/, '').toLowerCase();
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
      atoms: graph.atoms.map((a) => {
        const copy = { id: a.id, element: a.element };
        if (typeof a.hintAngle === 'number') copy.hintAngle = a.hintAngle;
        return copy;
      }),
      bonds: graph.bonds.map((b) => ({ from: b.from, to: b.to, order: b.order }))
    };
  }

  // =========================================================================
  // CORE IUPAC ANALYZER & NAMING ENGINE (Exported for Unit Testing)
  // Supports BOTH implicit-H heavy-atom graphs and explicit-H ball-and-stick graphs
  // =========================================================================

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

  // Bond sum counting only non-Hydrogen neighbors (invariant across explicit/implicit H)
  function getHeavyBondSum(atomMap, adj, id) {
    const list = adj.get(id) || [];
    let s = 0;
    for (let i = 0; i < list.length; i++) {
      const nb = atomMap.get(list[i].to);
      if (nb && nb.element !== 'H') s += list[i].order;
    }
    return s;
  }

  // Missing open valence bonds on an atom (0 when fully saturated with explicit H / bonds)
  function getMissingValence(atomMap, adj, id) {
    const atom = atomMap.get(id);
    if (!atom) return 0;
    const maxVal = ELEMENT_VALENCE[atom.element] || 0;
    return Math.max(0, maxVal - getBondSum(adj, id));
  }

  // Effective total H count on a heavy atom (explicit bonded H + unfilled valence treated as future H)
  function getEffectiveH(atomMap, adj, id) {
    const atom = atomMap.get(id);
    if (!atom || atom.element === 'H') return 0;
    const maxVal = ELEMENT_VALENCE[atom.element] || 0;
    return Math.max(0, maxVal - getHeavyBondSum(atomMap, adj, id));
  }

  function inspectCarbonGroups(cId, atomMap, adj) {
    const neighbors = adj.get(cId) || [];
    const cNeighbors = [];
    const doubleOs = [];
    const singleOHs = [];
    const amines = [];
    const halogens = [];
    const explicitHs = [];

    for (let i = 0; i < neighbors.length; i++) {
      const edge = neighbors[i];
      const nb = atomMap.get(edge.to);
      if (!nb) continue;
      if (nb.element === 'C') {
        cNeighbors.push(edge);
      } else if (nb.element === 'H') {
        explicitHs.push(nb.id);
      } else if (nb.element === 'O') {
        if (edge.order === 2) {
          doubleOs.push(nb.id);
        } else if (edge.order === 1) {
          singleOHs.push(nb.id);
        }
      } else if (nb.element === 'N' && edge.order === 1) {
        amines.push(nb.id);
      } else if (HALOGEN_NAMES[nb.element]) {
        halogens.push({ id: nb.id, element: nb.element, name: HALOGEN_NAMES[nb.element] });
      }
    }

    const hCount = getEffectiveH(atomMap, adj, cId);
    let hasCarboxyl = false;
    let hasAldehyde = false;
    let hasKetone = false;
    let alcoholCount = singleOHs.length;
    let ketoneCount = 0;

    if (doubleOs.length >= 1 && singleOHs.length >= 1) {
      hasCarboxyl = true;
      alcoholCount = Math.max(0, singleOHs.length - 1);
    } else if (doubleOs.length >= 1) {
      if (hCount >= 1) {
        hasAldehyde = true;
      } else {
        hasKetone = true;
        ketoneCount = doubleOs.length;
      }
    }

    return {
      cNeighbors,
      doubleOs,
      singleOHs,
      amines,
      halogens,
      explicitHs,
      hCount,
      hasCarboxyl,
      hasAldehyde,
      hasKetone,
      ketoneCount,
      alcoholCount,
      amineCount: amines.length
    };
  }

  function enumerateCarbonPaths(carbonIds, cAdj) {
    const paths = [];
    const seen = new Set();

    function dfs(curr, visited, path) {
      const key =
        path[0] <= path[path.length - 1]
          ? path.join('|')
          : path.slice().reverse().join('|');
      if (!seen.has(key)) {
        seen.add(key);
        paths.push(path.slice());
      }
      const nexts = cAdj.get(curr) || [];
      for (let i = 0; i < nexts.length; i++) {
        const nb = nexts[i].to;
        if (!visited.has(nb)) {
          visited.add(nb);
          path.push(nb);
          dfs(nb, visited, path);
          path.pop();
          visited.delete(nb);
        }
      }
    }

    for (let i = 0; i < carbonIds.length; i++) {
      const start = carbonIds[i];
      const visited = new Set([start]);
      dfs(start, visited, [start]);
    }
    return paths;
  }

  function getEdgeOrder(adj, u, v) {
    const list = adj.get(u) || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].to === v) return list[i].order;
    }
    return 1;
  }

  function nameCarbonBranch(rootId, parentId, bondOrderToParent, atomMap, adj, groupInfoMap) {
    const subCarbons = [];
    const subSet = new Set();
    const stack = [rootId];
    subSet.add(rootId);
    while (stack.length) {
      const u = stack.pop();
      subCarbons.push(u);
      const nbs = adj.get(u) || [];
      for (let i = 0; i < nbs.length; i++) {
        const nb = nbs[i].to;
        if (nb !== parentId && atomMap.get(nb).element === 'C' && !subSet.has(nb)) {
          subSet.add(nb);
          stack.push(nb);
        }
      }
    }

    if (subCarbons.length === 1 && bondOrderToParent === 1) {
      const g = groupInfoMap.get(rootId);
      if (g.hasCarboxyl && g.halogens.length === 0 && g.amines.length === 0 && g.alcoholCount === 0) {
        return { name: 'carboxy', sortKey: 'carboxy', isComplex: false };
      }
      if (g.hasAldehyde && g.halogens.length === 0 && g.amines.length === 0 && g.alcoholCount === 0) {
        return { name: 'formyl', sortKey: 'formyl', isComplex: false };
      }
    }

    if (subCarbons.length === 3 && bondOrderToParent === 1) {
      const rootCNbs = (adj.get(rootId) || []).filter(
        (e) => e.to !== parentId && atomMap.get(e.to).element === 'C'
      );
      const allSaturatedPlain = subCarbons.every((cid) => {
        const gi = groupInfoMap.get(cid);
        return (
          !gi.hasCarboxyl &&
          !gi.hasAldehyde &&
          !gi.hasKetone &&
          gi.alcoholCount === 0 &&
          gi.amineCount === 0 &&
          gi.halogens.length === 0 &&
          (adj.get(cid) || []).every((e) => e.order === 1)
        );
      });
      if (allSaturatedPlain && rootCNbs.length === 2) {
        return { name: 'propan-2-yl', sortKey: 'propan-2-yl', isComplex: true };
      }
    }

    const pathsFromRoot = [];
    function dfsSub(curr, visited, path) {
      pathsFromRoot.push(path.slice());
      const nbs = adj.get(curr) || [];
      for (let i = 0; i < nbs.length; i++) {
        const nb = nbs[i].to;
        if (subSet.has(nb) && !visited.has(nb)) {
          visited.add(nb);
          path.push(nb);
          dfsSub(nb, visited, path);
          path.pop();
          visited.delete(nb);
        }
      }
    }
    dfsSub(rootId, new Set([rootId]), [rootId]);

    let bestPath = pathsFromRoot[0];
    let bestScore = null;
    for (let i = 0; i < pathsFromRoot.length; i++) {
      const p = pathsFromRoot[i];
      let mult = 0;
      let dbl = 0;
      for (let k = 0; k < p.length - 1; k++) {
        const ord = getEdgeOrder(adj, p[k], p[k + 1]);
        if (ord > 1) mult++;
        if (ord === 2) dbl++;
      }
      const pSet = new Set(p);
      let branchCnt = 0;
      for (let k = 0; k < p.length; k++) {
        const nbs = adj.get(p[k]) || [];
        for (let j = 0; j < nbs.length; j++) {
          const nb = nbs[j].to;
          if (nb !== parentId && atomMap.get(nb).element !== 'H' && !pSet.has(nb)) branchCnt++;
        }
      }
      const score = [mult, p.length, dbl, branchCnt];
      if (!bestScore || compareNumberArrays(score, bestScore) > 0) {
        bestScore = score;
        bestPath = p;
      }
    }

    const pSet = new Set(bestPath);
    const L = bestPath.length;
    const stem = ROOT_STEMS[L] || `c${L}`;

    const subSubsts = [];
    for (let i = 0; i < L; i++) {
      const cid = bestPath[i];
      const loc = i + 1;
      const gi = groupInfoMap.get(cid);
      gi.halogens.forEach((h) => subSubsts.push({ name: h.name, sortKey: h.name, loc, isComplex: false }));
      for (let k = 0; k < gi.alcoholCount; k++) {
        subSubsts.push({ name: 'hydroxy', sortKey: 'hydroxy', loc, isComplex: false });
      }
      for (let k = 0; k < gi.amineCount; k++) {
        subSubsts.push({ name: 'amino', sortKey: 'amino', loc, isComplex: false });
      }
      if (gi.hasCarboxyl) {
        subSubsts.push({ name: 'hydroxy', sortKey: 'hydroxy', loc, isComplex: false });
        subSubsts.push({ name: 'oxo', sortKey: 'oxo', loc, isComplex: false });
      } else if (gi.hasAldehyde || gi.hasKetone) {
        subSubsts.push({ name: 'oxo', sortKey: 'oxo', loc, isComplex: false });
      }
      const nbs = adj.get(cid) || [];
      for (let j = 0; j < nbs.length; j++) {
        const e = nbs[j];
        if (e.to !== parentId && atomMap.get(e.to).element === 'C' && !pSet.has(e.to)) {
          const child = nameCarbonBranch(e.to, cid, e.order, atomMap, adj, groupInfoMap);
          subSubsts.push({ name: child.name, sortKey: child.sortKey, loc, isComplex: child.isComplex });
        }
      }
    }

    const dblLocs = [];
    const triLocs = [];
    for (let i = 0; i < L - 1; i++) {
      const ord = getEdgeOrder(adj, bestPath[i], bestPath[i + 1]);
      if (ord === 2) dblLocs.push(i + 1);
      else if (ord === 3) triLocs.push(i + 1);
    }

    let suffix = bondOrderToParent === 2 ? 'ylidene' : 'yl';
    let core = stem;
    if (dblLocs.length === 0 && triLocs.length === 0) {
      core = stem + suffix;
    } else if (L === 2 && dblLocs.length === 1 && triLocs.length === 0 && bondOrderToParent === 1) {
      core = 'ethenyl';
    } else if (L === 2 && triLocs.length === 1 && dblLocs.length === 0 && bondOrderToParent === 1) {
      core = 'ethynyl';
    } else {
      let unsat = '';
      const addA = dblLocs.length >= 2 || (dblLocs.length === 0 && triLocs.length >= 2);
      if (addA) core += 'a';
      if (dblLocs.length > 0) {
        unsat += `-${dblLocs.join(',')}-${MULT_PREFIX[dblLocs.length]}en`;
      }
      if (triLocs.length > 0) {
        unsat += `-${triLocs.join(',')}-${MULT_PREFIX[triLocs.length]}yn`;
      }
      core = `${core}${unsat}${suffix}`;
    }

    if (subSubsts.length === 0) {
      const isComplex = /[\d,-]/.test(core);
      return { name: core, sortKey: sortKeyForSubstituent(core), isComplex };
    }

    const omitLoc = L === 1;
    const prefixStr = formatSubstituentPrefixes(subSubsts, omitLoc);
    const fullName = `${prefixStr}${core}`;
    return {
      name: fullName,
      sortKey: sortKeyForSubstituent(fullName),
      isComplex: true
    };
  }

  function formatSubstituentPrefixes(substituents, omitAllLocants) {
    if (!substituents.length) return '';
    const groups = new Map();
    for (let i = 0; i < substituents.length; i++) {
      const s = substituents[i];
      if (!groups.has(s.name)) {
        groups.set(s.name, { name: s.name, sortKey: s.sortKey, isComplex: s.isComplex, locs: [] });
      }
      groups.get(s.name).locs.push(s.loc);
    }

    const sorted = Array.from(groups.values()).sort((a, b) => {
      if (a.sortKey < b.sortKey) return -1;
      if (a.sortKey > b.sortKey) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const parts = sorted.map((g) => {
      g.locs.sort((x, y) => x - y);
      const count = g.locs.length;
      const locStr = omitAllLocants ? '' : g.locs.join(',');
      let body;
      if (g.isComplex) {
        const mult = count >= 2 ? COMPLEX_MULT[count] || `${MULT_PREFIX[count]}` : '';
        body = `${mult}(${g.name})`;
      } else {
        const mult = MULT_PREFIX[count] || '';
        body = `${mult}${g.name}`;
      }
      return locStr ? `${locStr}-${body}` : body;
    });

    let out = parts[0];
    for (let i = 1; i < parts.length; i++) {
      const next = parts[i];
      if (/^\d/.test(next)) out += '-' + next;
      else out += next;
    }
    return out;
  }

  function evaluateDirectedChain(dirChain, pfgType, atomMap, adj, groupInfoMap) {
    const L = dirChain.length;
    const chainSet = new Set(dirChain);

    const pfgLocs = [];
    const dblLocs = [];
    const triLocs = [];
    const multLocs = [];
    const substituents = [];

    for (let i = 0; i < L - 1; i++) {
      const ord = getEdgeOrder(adj, dirChain[i], dirChain[i + 1]);
      if (ord === 2) {
        dblLocs.push(i + 1);
        multLocs.push(i + 1);
      } else if (ord === 3) {
        triLocs.push(i + 1);
        multLocs.push(i + 1);
      }
    }

    for (let i = 0; i < L; i++) {
      const cid = dirChain[i];
      const loc = i + 1;
      const gi = groupInfoMap.get(cid);

      if (pfgType === 'carboxyl') {
        if (gi.hasCarboxyl) pfgLocs.push(loc);
        for (let k = 0; k < gi.alcoholCount; k++) {
          substituents.push({ name: 'hydroxy', sortKey: 'hydroxy', loc, isComplex: false });
        }
        if (gi.hasAldehyde || gi.hasKetone) {
          substituents.push({ name: 'oxo', sortKey: 'oxo', loc, isComplex: false });
        }
        for (let k = 0; k < gi.amineCount; k++) {
          substituents.push({ name: 'amino', sortKey: 'amino', loc, isComplex: false });
        }
      } else if (pfgType === 'aldehyde') {
        if (gi.hasAldehyde) pfgLocs.push(loc);
        if (gi.hasKetone) {
          substituents.push({ name: 'oxo', sortKey: 'oxo', loc, isComplex: false });
        }
        for (let k = 0; k < gi.alcoholCount; k++) {
          substituents.push({ name: 'hydroxy', sortKey: 'hydroxy', loc, isComplex: false });
        }
        for (let k = 0; k < gi.amineCount; k++) {
          substituents.push({ name: 'amino', sortKey: 'amino', loc, isComplex: false });
        }
      } else if (pfgType === 'ketone') {
        for (let k = 0; k < gi.ketoneCount; k++) pfgLocs.push(loc);
        for (let k = 0; k < gi.alcoholCount; k++) {
          substituents.push({ name: 'hydroxy', sortKey: 'hydroxy', loc, isComplex: false });
        }
        for (let k = 0; k < gi.amineCount; k++) {
          substituents.push({ name: 'amino', sortKey: 'amino', loc, isComplex: false });
        }
      } else if (pfgType === 'alcohol') {
        for (let k = 0; k < gi.alcoholCount; k++) pfgLocs.push(loc);
        for (let k = 0; k < gi.amineCount; k++) {
          substituents.push({ name: 'amino', sortKey: 'amino', loc, isComplex: false });
        }
      } else if (pfgType === 'amine') {
        for (let k = 0; k < gi.amineCount; k++) pfgLocs.push(loc);
      }

      gi.halogens.forEach((h) => {
        substituents.push({ name: h.name, sortKey: h.name, loc, isComplex: false });
      });

      const nbs = adj.get(cid) || [];
      for (let j = 0; j < nbs.length; j++) {
        const edge = nbs[j];
        if (atomMap.get(edge.to).element === 'C' && !chainSet.has(edge.to)) {
          const br = nameCarbonBranch(edge.to, cid, edge.order, atomMap, adj, groupInfoMap);
          substituents.push({ name: br.name, sortKey: br.sortKey, loc, isComplex: br.isComplex });
        }
      }
    }

    pfgLocs.sort((a, b) => a - b);
    dblLocs.sort((a, b) => a - b);
    triLocs.sort((a, b) => a - b);
    multLocs.sort((a, b) => a - b);

    const subLocsSorted = substituents.map((s) => s.loc).sort((a, b) => a - b);

    const alphaSubst = substituents.slice().sort((a, b) => {
      if (a.sortKey < b.sortKey) return -1;
      if (a.sortKey > b.sortKey) return 1;
      return a.loc - b.loc;
    });
    const alphaNames = alphaSubst.map((s) => s.sortKey);
    const alphaLocs = alphaSubst.map((s) => s.loc);

    return {
      dirChain,
      pfgLocs,
      dblLocs,
      triLocs,
      multLocs,
      substituents,
      subLocsSorted,
      alphaNames,
      alphaLocs
    };
  }

  function compareDirections(evalA, evalB) {
    let c = compareNumberArrays(evalA.pfgLocs, evalB.pfgLocs);
    if (c !== 0) return { cmp: c, reason: 'pfg' };

    c = compareNumberArrays(evalA.multLocs, evalB.multLocs);
    if (c !== 0) return { cmp: c, reason: 'multiple' };

    c = compareNumberArrays(evalA.dblLocs, evalB.dblLocs);
    if (c !== 0) return { cmp: c, reason: 'doubleOverTriple' };

    c = compareNumberArrays(evalA.subLocsSorted, evalB.subLocsSorted);
    if (c !== 0) return { cmp: c, reason: 'branchLocant' };

    c = compareStringArrays(evalA.alphaNames, evalB.alphaNames);
    if (c !== 0) return { cmp: c, reason: 'alpha' };

    c = compareNumberArrays(evalA.alphaLocs, evalB.alphaLocs);
    if (c !== 0) return { cmp: c, reason: 'alpha' };

    return { cmp: 0, reason: 'symmetric' };
  }

  function buildBranchCondensed(rootId, parentId, atomMap, adj, groupInfoMap) {
    const gi = groupInfoMap.get(rootId);
    const childCarbons = (adj.get(rootId) || []).filter(
      (e) => e.to !== parentId && atomMap.get(e.to).element === 'C'
    );

    if (childCarbons.length === 0) {
      if (gi.hasCarboxyl) return 'COOH';
      if (gi.hasAldehyde) return 'CHO';
      let s = 'C';
      if (gi.hCount === 1) s += 'H';
      else if (gi.hCount > 1) s += 'H' + toSubscript(gi.hCount);
      if (gi.alcoholCount > 0) s += gi.alcoholCount === 1 ? 'OH' : `(OH)${toSubscript(gi.alcoholCount)}`;
      if (gi.amineCount > 0) s += gi.amineCount === 1 ? 'NH₂' : `(NH₂)${toSubscript(gi.amineCount)}`;
      gi.halogens.forEach((h) => {
        s += h.element;
      });
      return s;
    }

    let base = 'C';
    if (gi.hCount === 1) base += 'H';
    else if (gi.hCount > 1) base += 'H' + toSubscript(gi.hCount);
    if (gi.hasKetone || gi.hasAldehyde) base = 'CO';
    if (gi.alcoholCount > 0) base += gi.alcoholCount === 1 ? '(OH)' : `(OH)${toSubscript(gi.alcoholCount)}`;
    if (gi.amineCount > 0) base += gi.amineCount === 1 ? '(NH₂)' : `(NH₂)${toSubscript(gi.amineCount)}`;
    gi.halogens.forEach((h) => {
      base += `(${h.element})`;
    });

    if (childCarbons.length === 1) {
      const e = childCarbons[0];
      const sep = e.order === 2 ? '=' : e.order === 3 ? '≡' : '';
      return base + sep + buildBranchCondensed(e.to, rootId, atomMap, adj, groupInfoMap);
    }

    const childStrs = childCarbons.map((e) => buildBranchCondensed(e.to, rootId, atomMap, adj, groupInfoMap));
    const counts = new Map();
    childStrs.forEach((cs) => counts.set(cs, (counts.get(cs) || 0) + 1));
    counts.forEach((cnt, cs) => {
      base += `(${cs})${cnt > 1 ? toSubscript(cnt) : ''}`;
    });
    return base;
  }

  function buildCondensedFormula(numberedChain, atomMap, adj, groupInfoMap) {
    const L = numberedChain.length;
    if (L === 0) return '';

    let displayChain = numberedChain.slice();
    if (L > 1) {
      const gStart = groupInfoMap.get(numberedChain[0]);
      const gEnd = groupInfoMap.get(numberedChain[L - 1]);
      const startTermPfg =
        (gStart.hasCarboxyl || gStart.hasAldehyde || gStart.alcoholCount > 0 || gStart.amineCount > 0) &&
        !(gEnd.hasCarboxyl || gEnd.hasAldehyde || gEnd.alcoholCount > 0 || gEnd.amineCount > 0);
      if (startTermPfg) {
        displayChain.reverse();
      }
    }

    const chainSet = new Set(displayChain);
    const tokens = [];

    for (let i = 0; i < L; i++) {
      const cid = displayChain[i];
      const gi = groupInfoMap.get(cid);
      const isLeftEnd = i === 0;
      const isRightEnd = i === L - 1;

      const cBranches = [];
      const nbs = adj.get(cid) || [];
      for (let j = 0; j < nbs.length; j++) {
        const e = nbs[j];
        if (atomMap.get(e.to).element === 'C' && !chainSet.has(e.to)) {
          cBranches.push(buildBranchCondensed(e.to, cid, atomMap, adj, groupInfoMap));
        }
      }

      const heteroGroups = [];
      if (gi.alcoholCount > 0) {
        for (let k = 0; k < gi.alcoholCount; k++) heteroGroups.push('OH');
      }
      if (gi.amineCount > 0) {
        for (let k = 0; k < gi.amineCount; k++) heteroGroups.push('NH₂');
      }
      gi.halogens.forEach((h) => heteroGroups.push(h.element));

      if (L === 1) {
        if (gi.hasCarboxyl) {
          let s = gi.hCount === 1 ? 'HCOOH' : 'COOH';
          if (heteroGroups.length) s = heteroGroups.join('') + '-' + s;
          tokens.push(s);
          continue;
        }
        if (gi.hasAldehyde) {
          let s = gi.hCount === 2 ? 'HCHO' : 'CHO';
          if (heteroGroups.length) s = heteroGroups.join('') + '-' + s;
          tokens.push(s);
          continue;
        }
        let s = 'C';
        if (gi.hCount === 1) s += 'H';
        else if (gi.hCount > 1) s += 'H' + toSubscript(gi.hCount);
        if (heteroGroups.length === 1 && (heteroGroups[0] === 'OH' || heteroGroups[0] === 'NH₂')) {
          s += '-' + heteroGroups[0];
        } else {
          const gMap = new Map();
          heteroGroups.forEach((x) => gMap.set(x, (gMap.get(x) || 0) + 1));
          gMap.forEach((cnt, sym) => {
            if (sym.length > 1 && cnt > 1) s += `(${sym})${toSubscript(cnt)}`;
            else s += sym + (cnt > 1 ? toSubscript(cnt) : '');
          });
        }
        tokens.push(s);
        continue;
      }

      if (gi.hasCarboxyl && cBranches.length === 0 && heteroGroups.length === 0) {
        tokens.push(isLeftEnd ? 'HOOC' : 'COOH');
        continue;
      }
      if (gi.hasAldehyde && cBranches.length === 0 && heteroGroups.length === 0) {
        tokens.push(isLeftEnd ? 'OHC' : 'CHO');
        continue;
      }
      if (gi.hasKetone && cBranches.length === 0 && heteroGroups.length === 0) {
        tokens.push('CO');
        continue;
      }

      let tok = 'C';
      if (gi.hCount === 1) tok += 'H';
      else if (gi.hCount > 1) tok += 'H' + toSubscript(gi.hCount);
      if (gi.hasKetone) tok += '(=O)';

      if (isRightEnd && cBranches.length === 0 && heteroGroups.length === 1 && (heteroGroups[0] === 'OH' || heteroGroups[0] === 'NH₂')) {
        tokens.push(`${tok}-${heteroGroups[0]}`);
        continue;
      }
      if (isLeftEnd && cBranches.length === 0 && heteroGroups.length === 1 && heteroGroups[0] === 'OH') {
        tokens.push(`HO-${tok}`);
        continue;
      }
      if (isLeftEnd && cBranches.length === 0 && heteroGroups.length === 1 && heteroGroups[0] === 'NH₂') {
        tokens.push(`H₂N-${tok}`);
        continue;
      }

      const allBranches = heteroGroups.concat(cBranches);
      const countMap = new Map();
      allBranches.forEach((b) => countMap.set(b, (countMap.get(b) || 0) + 1));
      countMap.forEach((cnt, b) => {
        tok += `(${b})${cnt > 1 ? toSubscript(cnt) : ''}`;
      });
      tokens.push(tok);
    }

    let result = tokens[0];
    for (let i = 0; i < L - 1; i++) {
      const ord = getEdgeOrder(adj, displayChain[i], displayChain[i + 1]);
      const sep = ord === 2 ? '=' : ord === 3 ? '≡' : '-';
      result += sep + tokens[i + 1];
    }
    return result;
  }

  function analyzeAndNameMolecule(graph, lang) {
    const activeLang = lang === 'en' ? 'en' : 'vi';
    const d = ORG_I18N[activeLang] || ORG_I18N.vi;
    const { atomMap, adj } = buildAdjacency(graph);

    const carbonIds = [];
    atomMap.forEach((atom, id) => {
      if (atom.element === 'C') carbonIds.push(id);
    });

    if (carbonIds.length === 0) {
      return {
        iupacName: '',
        molecularFormula: '',
        condensedFormula: '',
        molarMass: 0,
        unsaturation: 0,
        compoundClassKey: 'alkane',
        compoundClassLabel: d.classes.alkane,
        mainChainIds: [],
        mainChainNumbers: {},
        missingTotalValence: 0,
        missingCarbonValence: 0,
        isComplete: true,
        steps: []
      };
    }

    const groupInfoMap = new Map();
    const cAdj = new Map();
    carbonIds.forEach((cid) => {
      groupInfoMap.set(cid, inspectCarbonGroups(cid, atomMap, adj));
      cAdj.set(
        cid,
        (adj.get(cid) || []).filter((e) => atomMap.get(e.to).element === 'C')
      );
    });

    // Count atoms (invariant across explicit H and implicit H) + track missing valence
    const counts = { C: 0, H: 0, Br: 0, Cl: 0, F: 0, I: 0, N: 0, O: 0 };
    let missingTotalValence = 0;
    let missingCarbonValence = 0;

    atomMap.forEach((atom, id) => {
      if (atom.element === 'H') {
        counts.H += 1;
      } else {
        if (counts[atom.element] !== undefined) counts[atom.element]++;
        const miss = getMissingValence(atomMap, adj, id);
        counts.H += miss;
        missingTotalValence += miss;
        if (atom.element === 'C') missingCarbonValence += miss;
      }
    });

    const formulaOrder = ['C', 'H', 'Br', 'Cl', 'F', 'I', 'N', 'O'];
    const molecularFormula = formulaOrder
      .filter((el) => counts[el] > 0)
      .map((el) => el + (counts[el] > 1 ? toSubscript(counts[el]) : ''))
      .join('');

    let molarMass = 0;
    formulaOrder.forEach((el) => {
      if (counts[el] > 0) molarMass += counts[el] * getAtomicMass(el);
    });

    const nHalogens = counts.F + counts.Cl + counts.Br + counts.I;
    const unsaturation = Math.max(
      0,
      Math.round((2 * counts.C + 2 + counts.N - counts.H - nHalogens) / 2)
    );

    // Determine Principal Functional Group (PFG)
    let pfgType = 'none';
    let bestRank = 0;
    carbonIds.forEach((cid) => {
      const gi = groupInfoMap.get(cid);
      if (gi.hasCarboxyl && PFG_RANK.carboxyl > bestRank) {
        bestRank = PFG_RANK.carboxyl;
        pfgType = 'carboxyl';
      } else if (gi.hasAldehyde && PFG_RANK.aldehyde > bestRank) {
        bestRank = PFG_RANK.aldehyde;
        pfgType = 'aldehyde';
      } else if (gi.hasKetone && PFG_RANK.ketone > bestRank) {
        bestRank = PFG_RANK.ketone;
        pfgType = 'ketone';
      } else if (gi.alcoholCount > 0 && PFG_RANK.alcohol > bestRank) {
        bestRank = PFG_RANK.alcohol;
        pfgType = 'alcohol';
      } else if (gi.amineCount > 0 && PFG_RANK.amine > bestRank) {
        bestRank = PFG_RANK.amine;
        pfgType = 'amine';
      }
    });

    // Main chain selection
    const allPaths = enumerateCarbonPaths(carbonIds, cAdj);

    function scorePath(path) {
      let pfgCount = 0;
      let multCount = 0;
      let dblCount = 0;

      for (let i = 0; i < path.length; i++) {
        const gi = groupInfoMap.get(path[i]);
        if (pfgType === 'carboxyl' && gi.hasCarboxyl) pfgCount++;
        else if (pfgType === 'aldehyde' && gi.hasAldehyde) pfgCount++;
        else if (pfgType === 'ketone') pfgCount += gi.ketoneCount;
        else if (pfgType === 'alcohol') pfgCount += gi.alcoholCount;
        else if (pfgType === 'amine') pfgCount += gi.amineCount;
      }

      for (let i = 0; i < path.length - 1; i++) {
        const ord = getEdgeOrder(adj, path[i], path[i + 1]);
        if (ord === 2) {
          multCount++;
          dblCount++;
        } else if (ord === 3) {
          multCount++;
        }
      }

      const evalF = evaluateDirectedChain(path, pfgType, atomMap, adj, groupInfoMap);
      const revPath = path.slice().reverse();
      const evalR = evaluateDirectedChain(revPath, pfgType, atomMap, adj, groupInfoMap);
      const dirComp = compareDirections(evalF, evalR);
      const bestEval = dirComp.cmp <= 0 ? evalF : evalR;
      const numberingReason = path.length === 1 ? 'single' : dirComp.reason;

      const substCount = bestEval.substituents.length;

      return {
        path,
        pfgCount,
        multCount,
        length: path.length,
        dblCount,
        substCount,
        bestEval,
        numberingReason
      };
    }

    let bestCandidate = null;
    for (let i = 0; i < allPaths.length; i++) {
      const cand = scorePath(allPaths[i]);
      if (!bestCandidate) {
        bestCandidate = cand;
        continue;
      }
      if (cand.pfgCount !== bestCandidate.pfgCount) {
        if (cand.pfgCount > bestCandidate.pfgCount) bestCandidate = cand;
        continue;
      }
      if (cand.multCount !== bestCandidate.multCount) {
        if (cand.multCount > bestCandidate.multCount) bestCandidate = cand;
        continue;
      }
      if (cand.length !== bestCandidate.length) {
        if (cand.length > bestCandidate.length) bestCandidate = cand;
        continue;
      }
      if (cand.dblCount !== bestCandidate.dblCount) {
        if (cand.dblCount > bestCandidate.dblCount) bestCandidate = cand;
        continue;
      }
      if (cand.substCount !== bestCandidate.substCount) {
        if (cand.substCount > bestCandidate.substCount) bestCandidate = cand;
        continue;
      }
      const tie = compareDirections(cand.bestEval, bestCandidate.bestEval);
      if (tie.cmp < 0) {
        bestCandidate = cand;
      }
    }

    const chosen = bestCandidate.bestEval;
    const numberedChain = chosen.dirChain;
    const L = numberedChain.length;
    const stem = ROOT_STEMS[L] || `c${L}`;

    const pfgLocs = chosen.pfgLocs;
    let suffixWord = '';
    let suffixWithLocant = '';

    if (pfgType === 'carboxyl') {
      const mult = MULT_PREFIX[pfgLocs.length] || '';
      suffixWord = `${mult}oic acid`;
      suffixWithLocant = suffixWord;
    } else if (pfgType === 'aldehyde') {
      const mult = MULT_PREFIX[pfgLocs.length] || '';
      suffixWord = `${mult}al`;
      suffixWithLocant = suffixWord;
    } else if (pfgType === 'ketone') {
      const mult = MULT_PREFIX[pfgLocs.length] || '';
      suffixWord = `${mult}one`;
      suffixWithLocant = `-${pfgLocs.join(',')}-${suffixWord}`;
    } else if (pfgType === 'alcohol') {
      const mult = MULT_PREFIX[pfgLocs.length] || '';
      suffixWord = `${mult}ol`;
      const omitAlcoholLoc = pfgLocs.length === 1 && L <= 2;
      suffixWithLocant = omitAlcoholLoc ? suffixWord : `-${pfgLocs.join(',')}-${suffixWord}`;
    } else if (pfgType === 'amine') {
      const mult = MULT_PREFIX[pfgLocs.length] || '';
      suffixWord = `${mult}amine`;
      const omitAmineLoc = pfgLocs.length === 1 && L <= 2;
      suffixWithLocant = omitAmineLoc ? suffixWord : `-${pfgLocs.join(',')}-${suffixWord}`;
    }

    const suffixStartsWithVowel = suffixWord.length > 0 && /^[aeiouy]/i.test(suffixWord);
    const keepTerminalE = !suffixStartsWithVowel;

    const dblLocs = chosen.dblLocs;
    const triLocs = chosen.triLocs;
    const nDbl = dblLocs.length;
    const nTri = triLocs.length;
    let parentCore = '';

    if (nDbl === 0 && nTri === 0) {
      parentCore = stem + (keepTerminalE ? 'ane' : 'an');
    } else if (nDbl > 0 && nTri === 0) {
      const addA = nDbl >= 2;
      const omitUnsatLoc = nDbl === 1 && L <= 3 && pfgType === 'none';
      const mult = MULT_PREFIX[nDbl] || '';
      const end = keepTerminalE ? 'ene' : 'en';
      if (omitUnsatLoc) {
        parentCore = `${stem}${end}`;
      } else {
        parentCore = `${stem}${addA ? 'a' : ''}-${dblLocs.join(',')}-${mult}${end}`;
      }
    } else if (nDbl === 0 && nTri > 0) {
      const addA = nTri >= 2;
      const omitUnsatLoc = nTri === 1 && L <= 3 && pfgType === 'none';
      const mult = MULT_PREFIX[nTri] || '';
      const end = keepTerminalE ? 'yne' : 'yn';
      if (omitUnsatLoc) {
        parentCore = `${stem}${end}`;
      } else {
        parentCore = `${stem}${addA ? 'a' : ''}-${triLocs.join(',')}-${mult}${end}`;
      }
    } else {
      const addA = nDbl >= 2;
      const multD = MULT_PREFIX[nDbl] || '';
      const multT = MULT_PREFIX[nTri] || '';
      const endT = keepTerminalE ? 'yne' : 'yn';
      parentCore = `${stem}${addA ? 'a' : ''}-${dblLocs.join(',')}-${multD}en-${triLocs.join(',')}-${multT}${endT}`;
    }

    const coreWithSuffix = parentCore + suffixWithLocant;

    const hasAsymmetricPfgOnC2 =
      L === 2 &&
      pfgType !== 'none' &&
      !(pfgLocs.length === 2 && pfgLocs[0] === 1 && pfgLocs[1] === 2);

    const omitSubLocants =
      L === 1 || (L === 2 && !hasAsymmetricPfgOnC2 && chosen.substituents.length === 1);

    const prefixStr = formatSubstituentPrefixes(chosen.substituents, omitSubLocants);
    const iupacName = prefixStr + coreWithSuffix;

    let compoundClassKey = 'alkane';
    if (pfgType === 'carboxyl') compoundClassKey = 'carboxylic';
    else if (pfgType === 'aldehyde') compoundClassKey = 'aldehyde';
    else if (pfgType === 'ketone') compoundClassKey = 'ketone';
    else if (pfgType === 'alcohol') compoundClassKey = 'alcohol';
    else if (pfgType === 'amine') compoundClassKey = 'amine';
    else if (nHalogens > 0) compoundClassKey = 'halogen';
    else if (nDbl > 0 && nTri > 0) compoundClassKey = 'alkenyne';
    else if (nTri > 0) compoundClassKey = 'alkyne';
    else if (nDbl >= 2) compoundClassKey = 'alkadiene';
    else if (nDbl === 1) compoundClassKey = 'alkene';
    else compoundClassKey = 'alkane';

    const condensedFormula = buildCondensedFormula(numberedChain, atomMap, adj, groupInfoMap);

    const mainChainNumbers = {};
    numberedChain.forEach((cid, idx) => {
      mainChainNumbers[cid] = idx + 1;
    });

    let chainReasonKey = 'longest';
    if (L === 1) chainReasonKey = 'single';
    else if (pfgType !== 'none') chainReasonKey = 'pfg';
    else if (nDbl + nTri > 0) chainReasonKey = 'multiple';

    const groupedSubsDisplay = [];
    const subMap = new Map();
    chosen.substituents.forEach((s) => {
      if (!subMap.has(s.name)) subMap.set(s.name, { name: s.name, sortKey: s.sortKey, locs: [] });
      subMap.get(s.name).locs.push(s.loc);
    });
    Array.from(subMap.values())
      .sort((a, b) => (a.sortKey < b.sortKey ? -1 : a.sortKey > b.sortKey ? 1 : 0))
      .forEach((g) => {
        g.locs.sort((x, y) => x - y);
        const mult = MULT_PREFIX[g.locs.length] || '';
        const locPart = omitSubLocants ? '' : `${g.locs.join(',')}-`;
        groupedSubsDisplay.push(`${locPart}${mult}${g.name}`);
      });

    const steps = [
      {
        title: d.step1Title,
        text: d.stepExplain.mainChain(L, stem, chainReasonKey, pfgType, nDbl + nTri)
      },
      {
        title: d.step2Title,
        text: d.stepExplain.numbering(bestCandidate.numberingReason, pfgType)
      },
      {
        title: d.step3Title,
        text: d.stepExplain.assemble(groupedSubsDisplay, coreWithSuffix, iupacName)
      }
    ];

    return {
      iupacName,
      molecularFormula,
      condensedFormula,
      molarMass: Number(molarMass.toFixed(3)),
      unsaturation,
      compoundClassKey,
      compoundClassLabel: d.classes[compoundClassKey] || d.classes.alkane,
      mainChainIds: numberedChain,
      mainChainNumbers,
      pfgType,
      missingTotalValence,
      missingCarbonValence,
      isComplete: missingTotalValence === 0,
      steps
    };
  }

  // =========================================================================
  // PRESET MOLECULES (8 Curricular Examples — Hydrated with Explicit H on Apply)
  // =========================================================================

  function makePresetGraph(atomsSpec, bondsSpec) {
    return {
      atoms: atomsSpec.map(([id, element]) => ({ id, element })),
      bonds: bondsSpec.map(([from, to, order]) => ({ from, to, order: order || 1 }))
    };
  }

  function hydrateGraphWithHydrogens(baseGraph) {
    const graph = cloneGraph(baseGraph);
    const { atomMap, adj } = buildAdjacency(graph);
    let hSeq = 1;
    const heavyAtoms = graph.atoms.filter((a) => a.element !== 'H');
    heavyAtoms.forEach((atom) => {
      const miss = getMissingValence(atomMap, adj, atom.id);
      for (let i = 0; i < miss; i++) {
        const hid = `h${hSeq++}`;
        graph.atoms.push({ id: hid, element: 'H' });
        graph.bonds.push({ from: atom.id, to: hid, order: 1 });
      }
    });
    return graph;
  }

  const PRESETS = [
    {
      id: '2-methylbutane',
      label: '2-methylbutane',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['c4', 'C'], ['c5', 'C']],
        [['c1', 'c2', 1], ['c2', 'c3', 1], ['c3', 'c4', 1], ['c2', 'c5', 1]]
      )
    },
    {
      id: 'but-2-ene',
      label: 'but-2-ene',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['c4', 'C']],
        [['c1', 'c2', 1], ['c2', 'c3', 2], ['c3', 'c4', 1]]
      )
    },
    {
      id: '3-methylbut-1-yne',
      label: '3-methylbut-1-yne',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['c4', 'C'], ['c5', 'C']],
        [['c1', 'c2', 3], ['c2', 'c3', 1], ['c3', 'c4', 1], ['c3', 'c5', 1]]
      )
    },
    {
      id: '2-methylpropan-1-ol',
      label: '2-methylpropan-1-ol',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['c4', 'C'], ['o1', 'O']],
        [['c1', 'c2', 1], ['c2', 'c3', 1], ['c2', 'c4', 1], ['c1', 'o1', 1]]
      )
    },
    {
      id: 'butanoic-acid',
      label: 'butanoic acid',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['c4', 'C'], ['o1', 'O'], ['o2', 'O']],
        [['c1', 'c2', 1], ['c2', 'c3', 1], ['c3', 'c4', 1], ['c1', 'o1', 2], ['c1', 'o2', 1]]
      )
    },
    {
      id: '2-chloro-3-methylbutane',
      label: '2-chloro-3-methylbutane',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['c4', 'C'], ['c5', 'C'], ['cl1', 'Cl']],
        [['c1', 'c2', 1], ['c2', 'c3', 1], ['c3', 'c4', 1], ['c2', 'cl1', 1], ['c3', 'c5', 1]]
      )
    },
    {
      id: 'propanal',
      label: 'propanal',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['o1', 'O']],
        [['c1', 'c2', 1], ['c2', 'c3', 1], ['c1', 'o1', 2]]
      )
    },
    {
      id: 'propan-2-one',
      label: 'propan-2-one',
      graph: makePresetGraph(
        [['c1', 'C'], ['c2', 'C'], ['c3', 'C'], ['o1', 'O']],
        [['c1', 'c2', 1], ['c2', 'c3', 1], ['c2', 'o1', 2]]
      )
    }
  ];

  // =========================================================================
  // 2D BALL-AND-STICK GEOMETRIC LAYOUT ENGINE (Heavy Skeleton + Explicit H + Open Slots)
  // =========================================================================

  // Distribute `count` angles into the largest open angular gaps around `occupiedAngles`
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

    // Greedily allocate slots to whichever gap currently has the widest spacing per slot
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

  function computeMoleculeLayout(graph, analysis, showH) {
    const { atomMap, adj } = buildAdjacency(graph);
    const mainChain = analysis.mainChainIds || [];
    const mainSet = new Set(mainChain);
    const pos = new Map();
    const outAngle = new Map();

    const CC_MAIN_LEN = 92;
    const CC_BRANCH_LEN = 82;
    const CX_LEN = 66;
    const CH_LEN = 50;
    const XH_LEN = 42;
    const ZIG_Y = 30;

    // 1. Place main chain Carbons in crisp horizontal zigzag
    if (mainChain.length === 1) {
      pos.set(mainChain[0], { x: 0, y: 0 });
      outAngle.set(mainChain[0], -Math.PI / 2);
    } else {
      for (let i = 0; i < mainChain.length; i++) {
        const cid = mainChain[i];
        const x = i * CC_MAIN_LEN;
        const y = i % 2 === 0 ? ZIG_Y / 2 : -ZIG_Y / 2;
        pos.set(cid, { x, y });
        outAngle.set(cid, i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2);
      }
    }

    // 2. Place non-H heavy-atom branches recursively first
    function placeHeavyChildren(parentId, baseAngle, isEndpoint) {
      const pPos = pos.get(parentId);
      const unplaced = (adj.get(parentId) || []).filter(
        (e) => !pos.has(e.to) && atomMap.get(e.to).element !== 'H'
      );
      if (unplaced.length === 0) return;

      unplaced.sort((a, b) => {
        const ea = atomMap.get(a.to).element;
        const eb = atomMap.get(b.to).element;
        const rank = (el, ord) => (el === 'C' ? 0 : el === 'O' && ord === 2 ? 1 : el === 'O' ? 2 : 3);
        return rank(ea, a.order) - rank(eb, b.order);
      });

      const k = unplaced.length;
      const angles = [];

      if (mainChain.length === 1 && parentId === mainChain[0]) {
        const presets = {
          1: [0],
          2: [-Math.PI / 3, Math.PI / 3],
          3: [-Math.PI / 2, (5 * Math.PI) / 6, Math.PI / 6],
          4: [-Math.PI / 2, 0, Math.PI / 2, Math.PI]
        };
        const arr = presets[k] || [];
        for (let i = 0; i < k; i++) {
          angles.push(arr[i] !== undefined ? arr[i] : (2 * Math.PI * i) / k);
        }
      } else if (isEndpoint) {
        if (k === 1) angles.push(baseAngle);
        else if (k === 2) angles.push(baseAngle - 0.72, baseAngle + 0.72);
        else {
          const spread = 1.7;
          for (let i = 0; i < k; i++) angles.push(baseAngle - spread / 2 + (spread * i) / (k - 1));
        }
      } else {
        if (k === 1) angles.push(baseAngle);
        else if (k === 2) angles.push(baseAngle - 0.56, baseAngle + 0.56);
        else {
          const spread = 1.4;
          for (let i = 0; i < k; i++) angles.push(baseAngle - spread / 2 + (spread * i) / (k - 1));
        }
      }

      for (let i = 0; i < k; i++) {
        const edge = unplaced[i];
        const childAtom = atomMap.get(edge.to);
        const len = childAtom.element === 'C' ? CC_BRANCH_LEN : CX_LEN;
        const ang = angles[i];
        pos.set(edge.to, {
          x: pPos.x + len * Math.cos(ang),
          y: pPos.y + len * Math.sin(ang)
        });
        outAngle.set(edge.to, ang);
        placeHeavyChildren(edge.to, ang, true);
      }
    }

    for (let i = 0; i < mainChain.length; i++) {
      const cid = mainChain[i];
      if (mainChain.length === 1) {
        placeHeavyChildren(cid, 0, true);
      } else if (i === 0) {
        const base = Math.PI + (i % 2 === 0 ? -0.22 : 0.22);
        placeHeavyChildren(cid, base, true);
      } else if (i === mainChain.length - 1) {
        const base = i % 2 === 0 ? 0.22 : -0.22;
        placeHeavyChildren(cid, base, true);
      } else {
        placeHeavyChildren(cid, outAngle.get(cid), false);
      }
    }

    // 3. Place explicit Hydrogen atoms into maximal-clearance angular gaps around their parent
    // Preserve user-clicked hintAngle on bare single-Carbon or slot clicks so H stays where clicked!
    const heavyIds = graph.atoms.filter((a) => a.element !== 'H' && pos.has(a.id)).map((a) => a.id);

    heavyIds.forEach((pid) => {
      const pAtom = atomMap.get(pid);
      const pPos = pos.get(pid);
      const nbs = adj.get(pid) || [];
      const hNbs = nbs.filter((e) => atomMap.get(e.to).element === 'H');
      if (hNbs.length === 0) return;

      const occupied = [];
      nbs.forEach((e) => {
        if (atomMap.get(e.to).element !== 'H' && pos.has(e.to)) {
          const np = pos.get(e.to);
          occupied.push(Math.atan2(np.y - pPos.y, np.x - pPos.x));
        }
      });

      const hLen = pAtom.element === 'C' ? CH_LEN : XH_LEN;

      // First place H atoms that carry a user-clicked hintAngle (if no conflict)
      const remainingH = [];
      hNbs.forEach((e) => {
        const ha = atomMap.get(e.to);
        if (typeof ha.hintAngle === 'number') {
          const tooClose = occupied.some(
            (oa) => Math.abs(normalizeAngle(oa - ha.hintAngle)) < 0.55
          );
          if (!tooClose) {
            occupied.push(ha.hintAngle);
            pos.set(ha.id, {
              x: pPos.x + hLen * Math.cos(ha.hintAngle),
              y: pPos.y + hLen * Math.sin(ha.hintAngle)
            });
            return;
          }
        }
        remainingH.push(ha);
      });

      if (remainingH.length > 0) {
        const openAngles = pickOpenAngles(occupied, remainingH.length);
        remainingH.forEach((ha, idx) => {
          const ang = openAngles[idx] ?? 0;
          pos.set(ha.id, {
            x: pPos.x + hLen * Math.cos(ang),
            y: pPos.y + hLen * Math.sin(ang)
          });
        });
      }
    });

    // 4. Gentle collision-avoidance pass (only among visible atoms so hidden H don't distort skeleton)
    const visibleIds = Array.from(pos.keys()).filter((id) => {
      const el = atomMap.get(id)?.element;
      return showH || el !== 'H';
    });

    for (let iter = 0; iter < 22; iter++) {
      for (let i = 0; i < visibleIds.length; i++) {
        for (let j = i + 1; j < visibleIds.length; j++) {
          const a = visibleIds[i];
          const b = visibleIds[j];
          const elA = atomMap.get(a).element;
          const elB = atomMap.get(b).element;
          const pa = pos.get(a);
          const pb = pos.get(b);
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          const minDist =
            elA === 'H' && elB === 'H'
              ? 35
              : elA === 'H' || elB === 'H'
                ? 43
                : 56;
          if (dist < minDist) {
            const push = (minDist - dist) * 0.42;
            const ux = dx / dist;
            const uy = dy / dist;
            const aFixed = mainSet.has(a);
            const bFixed = mainSet.has(b);
            if (!aFixed && !bFixed) {
              // Prefer pushing H away from heavy atoms
              const wA = elA === 'H' && elB !== 'H' ? 0.85 : elB === 'H' && elA !== 'H' ? 0.15 : 0.5;
              const wB = 1 - wA;
              pa.x -= ux * push * wA;
              pa.y -= uy * push * wA;
              pb.x += ux * push * wB;
              pb.y += uy * push * wB;
            } else if (!bFixed) {
              pb.x += ux * push;
              pb.y += uy * push;
            } else if (!aFixed) {
              pa.x -= ux * push;
              pa.y -= uy * push;
            }
          }
        }
      }
    }

    // 5. Compute open valence slots for every incomplete Carbon (and selected O/N if incomplete)
    const valenceSlots = [];
    graph.atoms.forEach((atom) => {
      if (atom.element === 'H') return;
      if (atom.element !== 'C') return;
      const miss = getMissingValence(atomMap, adj, atom.id);
      if (miss <= 0) return;
      const pPos = pos.get(atom.id);
      if (!pPos) return;

      const occupied = [];
      (adj.get(atom.id) || []).forEach((e) => {
        const nbPos = pos.get(e.to);
        if (nbPos) {
          occupied.push(Math.atan2(nbPos.y - pPos.y, nbPos.x - pPos.x));
        }
      });

      const slotAngles = pickOpenAngles(occupied, miss);
      slotAngles.forEach((ang, sIdx) => {
        const len = 50;
        valenceSlots.push({
          key: `slot::${atom.id}::${sIdx}`,
          atomId: atom.id,
          angle: ang,
          x: pPos.x + len * Math.cos(ang),
          y: pPos.y + len * Math.sin(ang)
        });
      });
    });

    // 6. Compute smart open-corner position for each main-chain numbering badge (never overlaps bonds!)
    const badgeOffsets = new Map();
    mainChain.forEach((cid) => {
      const pPos = pos.get(cid);
      if (!pPos) return;
      const occupied = [];
      (adj.get(cid) || []).forEach((e) => {
        if (!showH && atomMap.get(e.to).element === 'H') return;
        const np = pos.get(e.to);
        if (np) occupied.push(Math.atan2(np.y - pPos.y, np.x - pPos.x));
      });
      valenceSlots.forEach((sl) => {
        if (sl.atomId === cid) occupied.push(sl.angle);
      });
      const best = pickOpenAngles(occupied, 1)[0] ?? -Math.PI / 4;
      const dist = 25;
      badgeOffsets.set(cid, {
        dx: dist * Math.cos(best),
        dy: dist * Math.sin(best)
      });
    });

    return { pos, outAngle, mainSet, valenceSlots, badgeOffsets };
  }

  function computeTargetViewBox(pos, valenceSlots, atomMap, showH, selectedId) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    pos.forEach((p, id) => {
      const atom = atomMap.get(id);
      if (!atom) return;
      if (!showH && atom.element === 'H') return;
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    valenceSlots.forEach((sl) => {
      if (sl.atomId === selectedId || pos.size <= 3) {
        if (sl.x < minX) minX = sl.x;
        if (sl.x > maxX) maxX = sl.x;
        if (sl.y < minY) minY = sl.y;
        if (sl.y > maxY) maxY = sl.y;
      }
    });

    if (!Number.isFinite(minX)) {
      return { x: -200, y: -115, w: 400, h: 230 };
    }

    const padX = 70;
    const padY = 62;
    const w = Math.max(380, maxX - minX + padX * 2);
    const h = Math.max(220, maxY - minY + padY * 2);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    return { x: cx - w / 2, y: cy - h / 2, w, h };
  }

  // =========================================================================
  // PERSISTENT SVG SCENE GRAPH & 60FPS SMOOTH ANIMATION ENGINE
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
    layerHighlight: null,
    layerSlots: null,
    layerBonds: null,
    layerAtoms: null,
    layerBadges: null,
    atomNodes: new Map(), // id -> { g, shakeG, innerG, haloCircle, sphereCircle, textEl, titleEl, lastElement, lastLabel }
    bondNodes: new Map(), // key -> { g, lines: [], hitLine, flashLine, titleEl, order, prevOrder }
    badgeNodes: new Map(), // cid -> { g, circle, text }
    currentPos: new Map(), // id -> { x, y }
    targetPos: new Map(),
    startPos: new Map(),
    atomSpawnDelay: new Map(), // id -> ms
    currentVB: null,
    startVB: null,
    targetVB: null,
    rafId: null,
    animStart: 0,
    animDuration: 280,
    lastLayout: null,
    lastAnalysis: null,
    lastAtomMap: null,
    exitingIds: new Set(),
    flashBondKeys: new Set()
  };

  function buildSVGDefs() {
    const defs = createSvgEl('defs');
    defs.innerHTML = `
      <pattern id="orgGridDots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.95" fill="rgba(148, 163, 184, 0.14)" />
      </pattern>

      <!-- CPK 3D-Matte Sphere Radial Gradients -->
      <radialGradient id="orgGradC" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#475569" />
        <stop offset="46%" stop-color="#2b3445" />
        <stop offset="100%" stop-color="#161c27" />
      </radialGradient>
      <radialGradient id="orgGradCMain" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#4b5f7a" />
        <stop offset="46%" stop-color="#283549" />
        <stop offset="100%" stop-color="#141c2a" />
      </radialGradient>
      <radialGradient id="orgGradH" cx="34%" cy="26%" r="72%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="56%" stop-color="#e8eff7" />
        <stop offset="100%" stop-color="#b9c7d8" />
      </radialGradient>
      <radialGradient id="orgGradO" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#f87171" />
        <stop offset="46%" stop-color="#ef4444" />
        <stop offset="100%" stop-color="#b91c1c" />
      </radialGradient>
      <radialGradient id="orgGradN" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#60a5fa" />
        <stop offset="46%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </radialGradient>
      <radialGradient id="orgGradCl" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="46%" stop-color="#22c55e" />
        <stop offset="100%" stop-color="#15803d" />
      </radialGradient>
      <radialGradient id="orgGradF" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#5eead4" />
        <stop offset="46%" stop-color="#14b8a6" />
        <stop offset="100%" stop-color="#0f766e" />
      </radialGradient>
      <radialGradient id="orgGradBr" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#fdba74" />
        <stop offset="46%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#c2410c" />
      </radialGradient>
      <radialGradient id="orgGradI" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#d8b4fe" />
        <stop offset="46%" stop-color="#a855f7" />
        <stop offset="100%" stop-color="#7e22ce" />
      </radialGradient>

      <filter id="orgAtomShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="3.2" flood-color="#020617" flood-opacity="0.52" />
      </filter>
      <filter id="orgCyanGlow" x="-45%" y="-45%" width="190%" height="190%">
        <feGaussianBlur stdDeviation="3.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    `;
    return defs;
  }

  function ensureSVGScene() {
    if (!dom.svgHost) return null;
    if (scene.svg && scene.svg.parentNode === dom.svgHost) return scene.svg;

    dom.svgHost.innerHTML = '';
    const svg = createSvgEl('svg', {
      class: 'org-svg',
      viewBox: '-200 -115 400 230',
      role: 'img'
    });

    svg.appendChild(buildSVGDefs());
    scene.bgRect = createSvgEl('rect', {
      x: -240,
      y: -155,
      width: 480,
      height: 310,
      fill: 'url(#orgGridDots)',
      'pointer-events': 'none'
    });
    svg.appendChild(scene.bgRect);

    scene.layerHighlight = createSvgEl('g', { class: 'org-layer-highlight', 'pointer-events': 'none' });
    scene.layerSlots = createSvgEl('g', { class: 'org-layer-slots' });
    scene.layerBonds = createSvgEl('g', { class: 'org-layer-bonds' });
    scene.layerAtoms = createSvgEl('g', { class: 'org-layer-atoms' });
    scene.layerBadges = createSvgEl('g', { class: 'org-layer-badges', 'pointer-events': 'none' });

    svg.appendChild(scene.layerHighlight);
    svg.appendChild(scene.layerSlots);
    svg.appendChild(scene.layerBonds);
    svg.appendChild(scene.layerAtoms);
    svg.appendChild(scene.layerBadges);

    dom.svgHost.appendChild(svg);
    scene.svg = svg;
    scene.atomNodes.clear();
    scene.bondNodes.clear();
    scene.badgeNodes.clear();
    scene.currentPos.clear();
    scene.currentVB = { x: -200, y: -115, w: 400, h: 230 };
    return svg;
  }

  function prefersReducedMotion() {
    return typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function updateBondGeometry(entry, pa, pb, sepFactor) {
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    const offsets =
      entry.order === 1
        ? [0]
        : entry.order === 2
          ? [-4.0 * sepFactor, 4.0 * sepFactor]
          : [-5.8 * sepFactor, 0, 5.8 * sepFactor];

    for (let i = 0; i < entry.lines.length; i++) {
      const o = offsets[i] || 0;
      const ln = entry.lines[i];
      ln.setAttribute('x1', (pa.x + nx * o).toFixed(1));
      ln.setAttribute('y1', (pa.y + ny * o).toFixed(1));
      ln.setAttribute('x2', (pb.x + nx * o).toFixed(1));
      ln.setAttribute('y2', (pb.y + ny * o).toFixed(1));
    }
    if (entry.hitLine) {
      entry.hitLine.setAttribute('x1', pa.x.toFixed(1));
      entry.hitLine.setAttribute('y1', pa.y.toFixed(1));
      entry.hitLine.setAttribute('x2', pb.x.toFixed(1));
      entry.hitLine.setAttribute('y2', pb.y.toFixed(1));
    }
    if (entry.flashLine) {
      entry.flashLine.setAttribute('x1', pa.x.toFixed(1));
      entry.flashLine.setAttribute('y1', pa.y.toFixed(1));
      entry.flashLine.setAttribute('x2', pb.x.toFixed(1));
      entry.flashLine.setAttribute('y2', pb.y.toFixed(1));
    }
  }

  function renderFrameAt(progress, elapsedMs) {
    const ease = 1 - Math.pow(1 - progress, 3);
    const analysis = scene.lastAnalysis;
    const layout = scene.lastLayout;
    const atomMap = scene.lastAtomMap;
    if (!analysis || !layout || !atomMap) return;

    // 1. Interpolate ViewBox
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
      scene.bgRect.setAttribute('x', (vb.x - 60).toFixed(1));
      scene.bgRect.setAttribute('y', (vb.y - 60).toFixed(1));
      scene.bgRect.setAttribute('width', (vb.w + 120).toFixed(1));
      scene.bgRect.setAttribute('height', (vb.h + 120).toFixed(1));
    }

    // 2. Interpolate every atom's position (respecting staggered spawn delay for Auto-fill H)
    scene.atomNodes.forEach((entry, id) => {
      const sPos = scene.startPos.get(id);
      const tPos = scene.targetPos.get(id);
      if (!sPos || !tPos) return;
      const delay = scene.atomSpawnDelay.get(id) || 0;
      let localEase = ease;
      if (delay > 0) {
        const localT = Math.max(0, Math.min(1, (elapsedMs - delay) / scene.animDuration));
        localEase = 1 - Math.pow(1 - localT, 3);
      }
      const x = sPos.x + (tPos.x - sPos.x) * localEase;
      const y = sPos.y + (tPos.y - sPos.y) * localEase;
      scene.currentPos.set(id, { x, y });
      entry.g.setAttribute('transform', `translate(${x.toFixed(1)}, ${y.toFixed(1)})`);
    });

    // 3. Update bond positions (bond grows smoothly with moving endpoints + parallel lines expand!)
    const sepEase = 0.25 + 0.75 * ease;
    scene.bondNodes.forEach((entry) => {
      const pa = scene.currentPos.get(entry.from);
      const pb = scene.currentPos.get(entry.to);
      if (!pa || !pb) return;
      const sf = entry.animateSep ? sepEase : 1;
      updateBondGeometry(entry, pa, pb, sf);
    });

    // 4. Update main-chain cyan highlight polyline
    if (scene.layerHighlight) {
      const poly = scene.layerHighlight.firstChild;
      if (poly && state.showNumbering && analysis.mainChainIds.length >= 2) {
        const pts = analysis.mainChainIds
          .map((cid) => {
            const p = scene.currentPos.get(cid);
            return p ? `${p.x.toFixed(1)},${p.y.toFixed(1)}` : null;
          })
          .filter(Boolean)
          .join(' ');
        poly.setAttribute('points', pts);
      }
    }

    // 5. Update open valence slots anchored to their smoothly-moving parent Carbon
    const slotEls = scene.layerSlots ? scene.layerSlots.children : [];
    for (let i = 0; i < slotEls.length; i++) {
      const g = slotEls[i];
      const cid = g.dataset.slotAtomId;
      const ang = Number(g.dataset.slotAngle || 0);
      const cp = scene.currentPos.get(cid);
      if (!cp) continue;
      const len = 50;
      const sx = cp.x + len * Math.cos(ang);
      const sy = cp.y + len * Math.sin(ang);
      const ln = g.querySelector('.org-slot-stem');
      const dotG = g.querySelector('.org-slot-dot-wrap');
      if (ln) {
        ln.setAttribute('x1', cp.x.toFixed(1));
        ln.setAttribute('y1', cp.y.toFixed(1));
        ln.setAttribute('x2', sx.toFixed(1));
        ln.setAttribute('y2', sy.toFixed(1));
      }
      if (dotG) {
        dotG.setAttribute('transform', `translate(${sx.toFixed(1)}, ${sy.toFixed(1)})`);
      }
    }

    // 6. Update main-chain number badges anchored to their smoothly-moving Carbon
    scene.badgeNodes.forEach((entry, cid) => {
      const p = scene.currentPos.get(cid);
      const off = layout.badgeOffsets.get(cid);
      if (!p || !off) return;
      entry.g.setAttribute(
        'transform',
        `translate(${(p.x + off.dx).toFixed(1)}, ${(p.y + off.dy).toFixed(1)})`
      );
    });
  }

  function syncSVGScene(graph, analysis, options = {}) {
    if (!ensureSVGScene()) return;
    const {
      newAtomParents = new Map(), // newId -> parentId
      staggerDelays = new Map(), // newId -> delayMs
      changedBondKeys = new Set(), // canonical bond keys whose order just changed
      instant = false
    } = options;

    const d = dict();
    const { atomMap, adj } = buildAdjacency(graph);
    const layout = computeMoleculeLayout(graph, analysis, state.showH);
    const targetVB = computeTargetViewBox(
      layout.pos,
      layout.valenceSlots,
      atomMap,
      state.showH,
      state.selectedId
    );

    scene.svg.setAttribute('aria-label', analysis.iupacName || 'Organic molecule');
    scene.lastLayout = layout;
    scene.lastAnalysis = analysis;
    scene.lastAtomMap = atomMap;

    const reduced = instant || prefersReducedMotion();

    // Main chain highlight polyline
    scene.layerHighlight.innerHTML = '';
    const mc = analysis.mainChainIds || [];
    const mainEdgeSet = new Set();
    for (let i = 0; i < mc.length - 1; i++) {
      mainEdgeSet.add(canonicalBondKey(mc[i], mc[i + 1]));
    }
    if (state.showNumbering && mc.length >= 2) {
      const poly = createSvgEl('polyline', {
        fill: 'none',
        stroke: 'rgba(56, 189, 248, 0.24)',
        'stroke-width': '16',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        filter: 'url(#orgCyanGlow)',
        class: 'org-main-chain-glow'
      });
      scene.layerHighlight.appendChild(poly);
    }

    // Determine visible atoms & bonds
    const visibleAtomIds = new Set();
    graph.atoms.forEach((a) => {
      if (state.showH || a.element !== 'H') visibleAtomIds.add(a.id);
    });

    // Remove stale atom nodes (not in visibleAtomIds and not currently animating exit)
    Array.from(scene.atomNodes.keys()).forEach((id) => {
      if (!visibleAtomIds.has(id) && !scene.exitingIds.has(id)) {
        const entry = scene.atomNodes.get(id);
        if (entry && entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
        scene.atomNodes.delete(id);
        scene.currentPos.delete(id);
      }
    });

    // Prepare interpolation start/target positions
    scene.startPos.clear();
    scene.targetPos.clear();
    scene.atomSpawnDelay.clear();

    let maxStagger = 0;

    graph.atoms.forEach((atom) => {
      if (!visibleAtomIds.has(atom.id)) return;
      const tPos = layout.pos.get(atom.id);
      if (!tPos) return;
      scene.targetPos.set(atom.id, { x: tPos.x, y: tPos.y });

      const isNew = !scene.atomNodes.has(atom.id);
      const delay = staggerDelays.get(atom.id) || 0;
      if (delay > maxStagger) maxStagger = delay;
      if (delay > 0) scene.atomSpawnDelay.set(atom.id, delay);

      if (isNew && !reduced) {
        const parentId = newAtomParents.get(atom.id);
        const parentCur = parentId ? scene.currentPos.get(parentId) || layout.pos.get(parentId) : null;
        if (parentCur) {
          scene.startPos.set(atom.id, { x: parentCur.x, y: parentCur.y });
        } else {
          scene.startPos.set(atom.id, { x: tPos.x, y: tPos.y });
        }
      } else {
        const prev = scene.currentPos.get(atom.id);
        scene.startPos.set(atom.id, prev && !reduced ? { x: prev.x, y: prev.y } : { x: tPos.x, y: tPos.y });
      }

      // Create or update persistent SVG node for atom
      let entry = scene.atomNodes.get(atom.id);
      const isSelected = atom.id === state.selectedId;
      const isMain = state.showNumbering && layout.mainSet.has(atom.id);
      const r = ATOM_RADIUS[atom.element] || 18;
      const st = CPK_STYLE[atom.element] || CPK_STYLE.C;
      const usedVal = getBondSum(adj, atom.id);
      const maxVal = ELEMENT_VALENCE[atom.element] || 4;
      const tip = d.atomTooltip(atom.element, usedVal, maxVal);

      // When H spheres are hidden, display OH / NH₂ inside O / N circles for clarity
      let displaySymbol = atom.element;
      if (!state.showH && (atom.element === 'O' || atom.element === 'N')) {
        const hBonded = (adj.get(atom.id) || []).filter((e) => atomMap.get(e.to)?.element === 'H').length;
        if (atom.element === 'O' && hBonded === 1) displaySymbol = 'OH';
        else if (atom.element === 'N' && hBonded === 1) displaySymbol = 'NH';
        else if (atom.element === 'N' && hBonded === 2) displaySymbol = 'NH₂';
      }

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

        // Soft pulsing cyan halo (shown when selected)
        const haloOuter = createSvgEl('circle', {
          cx: 0,
          cy: 0,
          r: (r + 7).toFixed(1),
          fill: 'none',
          stroke: '#38bdf8',
          'stroke-width': '2',
          class: 'org-select-halo'
        });

        // Error red flash ring (shown briefly on valence / limit violation)
        const errorRing = createSvgEl('circle', {
          cx: 0,
          cy: 0,
          r: (r + 6).toFixed(1),
          fill: 'none',
          stroke: '#ef4444',
          'stroke-width': '2.6',
          class: 'org-error-ring'
        });

        const sphereCircle = createSvgEl('circle', {
          cx: 0,
          cy: 0,
          r: r.toFixed(1),
          filter: 'url(#orgAtomShadow)',
          class: 'org-atom-sphere'
        });

        // Subtle matte specular arc highlight
        const sheen = createSvgEl('ellipse', {
          cx: (-r * 0.28).toFixed(1),
          cy: (-r * 0.34).toFixed(1),
          rx: (r * 0.32).toFixed(1),
          ry: (r * 0.18).toFixed(1),
          transform: `rotate(-32 ${(-r * 0.28).toFixed(1)} ${(-r * 0.34).toFixed(1)})`,
          fill: 'rgba(255, 255, 255, 0.22)',
          'pointer-events': 'none'
        });

        const textEl = createSvgEl('text', {
          x: 0,
          y: 0,
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'font-family': 'var(--font-sans)',
          'font-weight': '700',
          'pointer-events': 'none',
          class: 'org-atom-label'
        });

        innerG.appendChild(haloOuter);
        innerG.appendChild(errorRing);
        innerG.appendChild(sphereCircle);
        innerG.appendChild(sheen);
        innerG.appendChild(textEl);
        shakeG.appendChild(innerG);
        g.appendChild(shakeG);
        scene.layerAtoms.appendChild(g);

        entry = { g, shakeG, innerG, haloOuter, errorRing, sphereCircle, textEl, titleEl };
        scene.atomNodes.set(atom.id, entry);

        if (!reduced) {
          innerG.style.animationDelay = delay > 0 ? `${delay}ms` : '';
          innerG.classList.add('is-popping');
          const clearPop = () => {
            innerG.classList.remove('is-popping');
            innerG.style.animationDelay = '';
          };
          setTimeout(clearPop, 300 + delay);
        }
      }

      entry.g.classList.toggle('is-selected', isSelected);
      entry.g.classList.toggle('is-main-chain', isMain);
      entry.g.setAttribute('aria-label', tip);
      entry.titleEl.textContent = tip;

      const gradId = isMain && atom.element === 'C' ? st.gradMain : st.grad;
      entry.sphereCircle.setAttribute('fill', `url(#${gradId})`);
      entry.sphereCircle.setAttribute(
        'stroke',
        isSelected ? '#38bdf8' : isMain && atom.element === 'C' ? '#38bdf8' : st.stroke
      );
      entry.sphereCircle.setAttribute(
        'stroke-width',
        isSelected ? '2.4' : isMain && atom.element === 'C' ? '1.8' : '1.35'
      );

      entry.textEl.setAttribute('fill', st.text);
      const fSize = displaySymbol.length >= 3 ? st.fontSize - 3.2 : displaySymbol.length === 2 && atom.element === 'O' ? st.fontSize - 2.2 : st.fontSize;
      entry.textEl.setAttribute('font-size', String(fSize));
      entry.textEl.textContent = displaySymbol;
    });

    // Update Bonds Layer
    const activeBondKeys = new Set();
    graph.bonds.forEach((b, idx) => {
      if (!visibleAtomIds.has(b.from) || !visibleAtomIds.has(b.to)) return;
      const key = canonicalBondKey(b.from, b.to);
      activeBondKeys.add(key);

      const atomA = atomMap.get(b.from);
      const atomB = atomMap.get(b.to);
      const isCC = atomA.element === 'C' && atomB.element === 'C';
      const isHBond = atomA.element === 'H' || atomB.element === 'H';
      const isMainEdge = state.showNumbering && mainEdgeSet.has(key);
      const strokeColor = isMainEdge ? '#7dd3fc' : isCC ? '#94a3b8' : isHBond ? '#64748b' : '#8596ad';
      const strokeW = b.order === 1 ? (isMainEdge ? 3.2 : isHBond ? 2.1 : 2.6) : b.order === 2 ? 2.3 : 2.0;

      let entry = scene.bondNodes.get(key);
      const orderChanged = changedBondKeys.has(key) || (entry && entry.order !== b.order);

      if (!entry || orderChanged) {
        if (entry && entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
        const g = createSvgEl('g', {
          class: `org-bond-group ${isCC ? 'is-cc' : ''} ${isHBond ? 'is-h-bond' : ''}`,
          'data-bond-key': key
        });
        if (isCC) {
          g.setAttribute('data-bond-idx', String(idx));
          g.setAttribute('role', 'button');
          g.setAttribute('tabindex', '0');
        }
        const titleEl = createSvgEl('title');
        if (isCC) g.appendChild(titleEl);

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

        let flashLine = null;
        if (orderChanged && !reduced) {
          flashLine = createSvgEl('line', {
            stroke: '#38bdf8',
            'stroke-width': '6',
            'stroke-linecap': 'round',
            class: 'org-bond-flash',
            'pointer-events': 'none'
          });
          g.appendChild(flashLine);
          setTimeout(() => {
            if (flashLine.parentNode) flashLine.parentNode.removeChild(flashLine);
          }, 360);
        }

        let hitLine = null;
        if (isCC) {
          hitLine = createSvgEl('line', {
            stroke: 'transparent',
            'stroke-width': '22',
            'stroke-linecap': 'round',
            class: 'org-bond-hit'
          });
          g.appendChild(hitLine);
        }

        // If bond connects to a staggered new H, delay its reveal to match the H pop-in
        const delay = staggerDelays.get(b.to) || staggerDelays.get(b.from) || 0;
        if (delay > 0 && !reduced) {
          g.style.opacity = '0';
          setTimeout(() => {
            g.style.opacity = '1';
          }, delay);
        }

        scene.layerBonds.appendChild(g);
        entry = {
          g,
          lines,
          hitLine,
          flashLine,
          titleEl,
          from: b.from,
          to: b.to,
          order: b.order,
          animateSep: Boolean(orderChanged && !reduced)
        };
        scene.bondNodes.set(key, entry);
      } else {
        entry.from = b.from;
        entry.to = b.to;
        entry.animateSep = false;
        if (isCC) entry.g.setAttribute('data-bond-idx', String(idx));
        entry.lines.forEach((ln) => {
          ln.setAttribute('stroke', strokeColor);
          ln.setAttribute('stroke-width', String(strokeW));
        });
      }

      if (isCC) {
        const bTip = d.bondTooltip(b.order);
        entry.g.setAttribute('aria-label', bTip);
        entry.titleEl.textContent = bTip;
      }
    });

    // Remove stale bonds (unless exiting)
    Array.from(scene.bondNodes.keys()).forEach((key) => {
      if (!activeBondKeys.has(key)) {
        const entry = scene.bondNodes.get(key);
        const isExitingBond = entry && (scene.exitingIds.has(entry.from) || scene.exitingIds.has(entry.to));
        if (!isExitingBond) {
          if (entry && entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
          scene.bondNodes.delete(key);
        }
      }
    });

    // Rebuild Open Valence Slots (dashed stems + clickable ghost '+' circles)
    scene.layerSlots.innerHTML = '';
    layout.valenceSlots.forEach((sl) => {
      const isSelParent = sl.atomId === state.selectedId;
      // Show slots prominently on selected Carbon, and gently on other incomplete Carbons
      const g = createSvgEl('g', {
        class: `org-valence-slot ${isSelParent ? 'is-active-parent' : 'is-passive-parent'}`,
        'data-slot-atom-id': sl.atomId,
        'data-slot-angle': sl.angle.toFixed(4),
        role: 'button',
        tabindex: isSelParent ? '0' : '-1',
        'aria-label': d.slotTooltip
      });
      const titleEl = createSvgEl('title');
      titleEl.textContent = d.slotTooltip;
      g.appendChild(titleEl);

      const stem = createSvgEl('line', {
        class: 'org-slot-stem',
        'stroke-dasharray': '4 4',
        'stroke-linecap': 'round'
      });
      const dotWrap = createSvgEl('g', { class: 'org-slot-dot-wrap' });
      const dotCircle = createSvgEl('circle', {
        cx: 0,
        cy: 0,
        r: isSelParent ? '10.5' : '8',
        class: 'org-slot-circle'
      });
      const plusTxt = createSvgEl('text', {
        x: 0,
        y: 0.4,
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'font-family': 'var(--font-mono)',
        'font-size': isSelParent ? '12' : '10',
        'font-weight': '700',
        class: 'org-slot-plus',
        'pointer-events': 'none'
      });
      plusTxt.textContent = '+';

      dotWrap.appendChild(dotCircle);
      dotWrap.appendChild(plusTxt);
      g.appendChild(stem);
      g.appendChild(dotWrap);
      scene.layerSlots.appendChild(g);
    });

    // Rebuild Main Chain Numbering Badges
    scene.layerBadges.innerHTML = '';
    scene.badgeNodes.clear();
    if (state.showNumbering && analysis.mainChainNumbers) {
      mc.forEach((cid) => {
        const num = analysis.mainChainNumbers[cid];
        if (!num) return;
        const g = createSvgEl('g', { class: 'org-num-badge' });
        const circle = createSvgEl('circle', {
          cx: 0,
          cy: 0,
          r: '9',
          fill: '#0c263a',
          stroke: '#38bdf8',
          'stroke-width': '1.35'
        });
        const text = createSvgEl('text', {
          x: 0,
          y: 0.4,
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'font-family': 'var(--font-mono)',
          'font-size': '10',
          'font-weight': '700',
          fill: '#e0f2fe'
        });
        text.textContent = String(num);
        g.appendChild(circle);
        g.appendChild(text);
        scene.layerBadges.appendChild(g);
        scene.badgeNodes.set(cid, { g, circle, text });
      });
    }

    // Start Smooth Glide rAF Loop
    if (scene.rafId) {
      cancelAnimationFrame(scene.rafId);
      scene.rafId = null;
    }

    scene.startVB = scene.currentVB && !reduced ? { ...scene.currentVB } : { ...targetVB };
    scene.targetVB = { ...targetVB };
    scene.animDuration = 280;

    if (reduced) {
      renderFrameAt(1, 9999);
      return;
    }

    const totalDuration = scene.animDuration + maxStagger;
    scene.animStart = performance.now();

    function step(now) {
      const elapsed = now - scene.animStart;
      const p = Math.max(0, Math.min(1, elapsed / scene.animDuration));
      renderFrameAt(p, elapsed);
      if (elapsed < totalDuration) {
        scene.rafId = requestAnimationFrame(step);
      } else {
        renderFrameAt(1, totalDuration + 10);
        scene.rafId = null;
      }
    }

    // Paint initial frame immediately so new atoms start cleanly at parent without flicker
    renderFrameAt(0, 0);
    scene.rafId = requestAnimationFrame(step);
  }

  function triggerShakeError(atomIds) {
    const ids = Array.isArray(atomIds) ? atomIds : [atomIds];
    ids.forEach((id) => {
      const entry = scene.atomNodes.get(id);
      if (!entry) return;
      entry.shakeG.classList.remove('is-error-shake');
      // Force reflow to restart animation reliably
      void entry.shakeG.getBoundingClientRect();
      entry.shakeG.classList.add('is-error-shake');
      setTimeout(() => {
        entry.shakeG.classList.remove('is-error-shake');
      }, 340);
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
    }, 160);
  }

  // =========================================================================
  // INTERACTIVE UI CONTROLLER
  // =========================================================================

  let state = {
    lang: 'vi',
    graph: null,
    selectedId: 'c1',
    showNumbering: true,
    showH: true,
    activePresetId: null,
    nextIdNum: 40,
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

  function pushUndo() {
    state.history.push({
      graph: cloneGraph(state.graph),
      selectedId: state.selectedId,
      activePresetId: state.activePresetId
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
      }, 3600);
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

  function hasExplicitHNeighbor(atomMap, adj, atomId) {
    return (adj.get(atomId) || []).some((e) => atomMap.get(e.to)?.element === 'H');
  }

  function addCarbonBranch() {
    if (state.isMutating) return;
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel || sel.element !== 'C') {
      showToast(t.selectCarbon, 'warn');
      if (sel) triggerShakeError(sel.id);
      return;
    }
    if (countCarbons(state.graph) >= MAX_CARBONS) {
      showToast(t.maxCarbons, 'warn');
      triggerShakeError(sel.id);
      return;
    }
    const freeVal = 4 - getBondSum(adj, sel.id);
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
    state.activePresetId = null;
    showToast('');
    renderAll({ newAtomParents: new Map([[newId, sel.id]]) });
  }

  function addHydrogenToAtom(targetId, hintAngle) {
    if (state.isMutating) return;
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const target = atomMap.get(targetId || state.selectedId);
    if (!target || target.element === 'H' || HALOGEN_NAMES[target.element]) {
      showToast(t.selectAtomForH, 'warn');
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
    state.activePresetId = null;
    if (!state.showH) state.showH = true;
    showToast('');
    renderAll({ newAtomParents: new Map([[hId, target.id]]) });
  }

  function autoFillHydrogens() {
    if (state.isMutating) return;
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const toAdd = [];
    state.graph.atoms.forEach((atom) => {
      if (atom.element === 'H') return;
      const miss = getMissingValence(atomMap, adj, atom.id);
      for (let i = 0; i < miss; i++) {
        toAdd.push(atom.id);
      }
    });

    if (toAdd.length === 0) {
      showToast(t.alreadyFullH, 'info');
      return;
    }

    pushUndo();
    const newParents = new Map();
    const staggerDelays = new Map();
    const stepMs = toAdd.length > 14 ? 32 : 45;

    toAdd.forEach((parentId, idx) => {
      const hId = genAtomId('h');
      state.graph.atoms.push({ id: hId, element: 'H' });
      state.graph.bonds.push({ from: parentId, to: hId, order: 1 });
      newParents.set(hId, parentId);
      staggerDelays.set(hId, idx * stepMs);
    });

    if (!state.showH) state.showH = true;
    showToast('');
    renderAll({ newAtomParents: newParents, staggerDelays });
  }

  function addSubstituent(kind) {
    if (state.isMutating) return;
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel || sel.element !== 'C') {
      showToast(t.selectCarbon, 'warn');
      if (sel) triggerShakeError(sel.id);
      return;
    }

    const freeVal = 4 - getBondSum(adj, sel.id);
    const hasH = hasExplicitHNeighbor(atomMap, adj, sel.id);
    const gi = inspectCarbonGroups(sel.id, atomMap, adj);

    if (kind === 'COOH') {
      if (gi.hasCarboxyl) {
        showToast(t.alreadyCarboxyl, 'info');
        triggerShakeError(sel.id);
        return;
      }
      const needDoubleO = gi.doubleOs.length === 0 ? 2 : 0;
      const needSingleOH = gi.singleOHs.length === 0 ? 1 : 0;
      const needTotal = needDoubleO + needSingleOH;
      const isTerminalC = gi.cNeighbors.length <= 1 && gi.cNeighbors.every((e) => e.order === 1);

      if (isTerminalC && freeVal >= needTotal) {
        pushUndo();
        const newParents = new Map();
        const staggerDelays = new Map();
        if (needDoubleO > 0) {
          const o1 = genAtomId('o');
          state.graph.atoms.push({ id: o1, element: 'O' });
          state.graph.bonds.push({ from: sel.id, to: o1, order: 2 });
          newParents.set(o1, sel.id);
        }
        if (needSingleOH > 0) {
          const o2 = genAtomId('o');
          const ohH = genAtomId('h');
          state.graph.atoms.push({ id: o2, element: 'O' }, { id: ohH, element: 'H' });
          state.graph.bonds.push({ from: sel.id, to: o2, order: 1 }, { from: o2, to: ohH, order: 1 });
          newParents.set(o2, sel.id);
          newParents.set(ohH, o2);
          staggerDelays.set(ohH, 60);
        }
        state.activePresetId = null;
        showToast('');
        renderAll({ newAtomParents: newParents, staggerDelays });
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
      state.activePresetId = null;
      showToast('');
      renderAll({
        newAtomParents: new Map([
          [cNew, sel.id],
          [o1, sel.id],
          [o2, sel.id],
          [ohH, sel.id]
        ]),
        staggerDelays: new Map([
          [o1, 40],
          [o2, 60],
          [ohH, 100]
        ])
      });
      return;
    }

    if (kind === '=O') {
      if (gi.doubleOs.length >= 1) {
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
      state.activePresetId = null;
      showToast('');
      renderAll({ newAtomParents: new Map([[oId, sel.id]]) });
      return;
    }

    if (kind === 'OH') {
      if (gi.singleOHs.length >= 1) {
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
      state.activePresetId = null;
      showToast('');
      renderAll({
        newAtomParents: new Map([
          [oId, sel.id],
          [hId, sel.id]
        ]),
        staggerDelays: new Map([[hId, 55]])
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
      state.graph.atoms.push(
        { id: nId, element: 'N' },
        { id: h1, element: 'H' },
        { id: h2, element: 'H' }
      );
      state.graph.bonds.push(
        { from: sel.id, to: nId, order: 1 },
        { from: nId, to: h1, order: 1 },
        { from: nId, to: h2, order: 1 }
      );
      state.activePresetId = null;
      showToast('');
      renderAll({
        newAtomParents: new Map([
          [nId, sel.id],
          [h1, sel.id],
          [h2, sel.id]
        ]),
        staggerDelays: new Map([
          [h1, 50],
          [h2, 95]
        ])
      });
      return;
    }

    // Halogens: Cl, Br, F, I
    if (freeVal < 1) {
      showToast(t.valenceFull(1, hasH), 'warn');
      triggerShakeError(sel.id);
      return;
    }
    pushUndo();
    const newId = genAtomId(kind.toLowerCase());
    state.graph.atoms.push({ id: newId, element: kind });
    state.graph.bonds.push({ from: sel.id, to: newId, order: 1 });
    state.activePresetId = null;
    showToast('');
    renderAll({ newAtomParents: new Map([[newId, sel.id]]) });
  }

  function deleteSelectedAtom() {
    if (state.isMutating) return;
    const t = dict().toasts;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    if (!sel) return;

    // 1. Deleting an H atom directly
    if (sel.element === 'H') {
      const parentEdge = (adj.get(sel.id) || [])[0];
      const nextSel = parentEdge ? parentEdge.to : state.graph.atoms[0]?.id || null;
      pushUndo();
      state.isMutating = true;
      animateAtomsExit([sel.id], () => {
        state.graph.atoms = state.graph.atoms.filter((a) => a.id !== sel.id);
        state.graph.bonds = state.graph.bonds.filter((b) => b.from !== sel.id && b.to !== sel.id);
        state.selectedId = nextSel;
        state.activePresetId = null;
        state.isMutating = false;
        showToast('');
        renderAll();
      });
      return;
    }

    // 2. Deleting a heteroatom (O, N, halogen) -> also remove any H bonded to that O/N
    if (sel.element !== 'C') {
      const nbs = adj.get(sel.id) || [];
      const parentC = nbs.find((e) => atomMap.get(e.to)?.element === 'C');
      const removeIds = [sel.id];
      nbs.forEach((e) => {
        if (atomMap.get(e.to)?.element === 'H') removeIds.push(e.to);
      });
      const removeSet = new Set(removeIds);
      pushUndo();
      state.isMutating = true;
      animateAtomsExit(removeIds, () => {
        state.graph.atoms = state.graph.atoms.filter((a) => !removeSet.has(a.id));
        state.graph.bonds = state.graph.bonds.filter((b) => !removeSet.has(b.from) && !removeSet.has(b.to));
        state.selectedId = parentC ? parentC.to : state.graph.atoms[0]?.id || null;
        state.activePresetId = null;
        state.isMutating = false;
        showToast('');
        renderAll();
      });
      return;
    }

    // 3. Deleting a Carbon atom
    if (countCarbons(state.graph) <= 1) {
      showToast(t.cannotDeleteLastC, 'warn');
      triggerShakeError(sel.id);
      return;
    }

    const nbs = adj.get(sel.id) || [];
    const cNbs = nbs.filter((e) => atomMap.get(e.to)?.element === 'C');
    if (cNbs.length > 1) {
      showToast(t.cannotSplitChain, 'warn');
      triggerShakeError(sel.id);
      return;
    }

    // Leaf Carbon: remove this Carbon + all its attached non-C substituents (and their H atoms)
    const removeSet = new Set([sel.id]);
    const queue = [];
    nbs.forEach((e) => {
      if (atomMap.get(e.to)?.element !== 'C') {
        removeSet.add(e.to);
        queue.push(e.to);
      }
    });
    while (queue.length) {
      const cur = queue.pop();
      (adj.get(cur) || []).forEach((e) => {
        if (!removeSet.has(e.to) && atomMap.get(e.to)?.element !== 'C') {
          removeSet.add(e.to);
          queue.push(e.to);
        }
      });
    }

    pushUndo();
    state.isMutating = true;
    animateAtomsExit(Array.from(removeSet), () => {
      state.graph.atoms = state.graph.atoms.filter((a) => !removeSet.has(a.id));
      state.graph.bonds = state.graph.bonds.filter((b) => !removeSet.has(b.from) && !removeSet.has(b.to));
      state.selectedId = cNbs[0] ? cNbs[0].to : state.graph.atoms[0]?.id || null;
      state.activePresetId = null;
      state.isMutating = false;
      showToast('');
      renderAll();
    });
  }

  // Cycle C-C bond order: Single (1) -> Double (2) -> Triple (3) -> Single (1)
  // Automatically strips excess explicit H atoms (with smooth fade-out) when raising bond order!
  function cycleBondOrder(bondIdx) {
    if (state.isMutating) return;
    const t = dict().toasts;
    const bond = state.graph.bonds[bondIdx];
    if (!bond) return;
    const { atomMap, adj } = buildAdjacency(state.graph);
    const a = atomMap.get(bond.from);
    const b = atomMap.get(bond.to);
    if (!a || !b || a.element !== 'C' || b.element !== 'C') return;

    const hListA = (adj.get(a.id) || []).filter((e) => atomMap.get(e.to)?.element === 'H').map((e) => e.to);
    const hListB = (adj.get(b.id) || []).filter((e) => atomMap.get(e.to)?.element === 'H').map((e) => e.to);

    const heavyOtherA = getHeavyBondSum(atomMap, adj, a.id) - bond.order;
    const heavyOtherB = getHeavyBondSum(atomMap, adj, b.id) - bond.order;
    const maxPossible = Math.min(3, 4 - heavyOtherA, 4 - heavyOtherB);
    const bKey = canonicalBondKey(a.id, b.id);

    function applyOrderWithStrip(targetOrder, infoMsg) {
      const curTotalA = heavyOtherA + hListA.length + targetOrder;
      const curTotalB = heavyOtherB + hListB.length + targetOrder;
      const dropCountA = Math.max(0, curTotalA - 4);
      const dropCountB = Math.max(0, curTotalB - 4);
      const toStrip = hListA.slice(0, dropCountA).concat(hListB.slice(0, dropCountB));

      pushUndo();

      const commitOrder = () => {
        if (toStrip.length > 0) {
          const stripSet = new Set(toStrip);
          state.graph.atoms = state.graph.atoms.filter((at) => !stripSet.has(at.id));
          state.graph.bonds = state.graph.bonds.filter((bd) => !stripSet.has(bd.from) && !stripSet.has(bd.to));
          if (stripSet.has(state.selectedId)) state.selectedId = a.id;
        }
        // Re-locate bond after potential filtering
        const targetBond = state.graph.bonds.find(
          (bd) => canonicalBondKey(bd.from, bd.to) === bKey
        );
        if (targetBond) targetBond.order = targetOrder;
        state.activePresetId = null;
        state.isMutating = false;
        if (infoMsg) showToast(infoMsg, 'info');
        else if (toStrip.length > 0) showToast(t.bondStrippedH(toStrip.length, targetOrder), 'info');
        else showToast('');
        renderAll({ changedBondKeys: new Set([bKey]) });
      };

      if (toStrip.length > 0) {
        state.isMutating = true;
        animateAtomsExit(toStrip, commitOrder);
      } else {
        commitOrder();
      }
    }

    if (bond.order === 1) {
      if (maxPossible >= 2) {
        applyOrderWithStrip(2, '');
      } else {
        const blockers = [];
        if (heavyOtherA + 2 > 4) blockers.push(a.id);
        if (heavyOtherB + 2 > 4) blockers.push(b.id);
        triggerShakeError(blockers.length ? blockers : [a.id, b.id]);
        showToast(t.bondExceedsValence, 'warn');
      }
    } else if (bond.order === 2) {
      if (maxPossible >= 3) {
        applyOrderWithStrip(3, '');
      } else {
        const blockers = [];
        if (heavyOtherA + 3 > 4) blockers.push(a.id);
        if (heavyOtherB + 3 > 4) blockers.push(b.id);
        triggerShakeError(blockers);
        applyOrderWithStrip(1, t.bondWrapToSingle);
      }
    } else {
      applyOrderWithStrip(1, '');
    }
  }

  function undo() {
    if (state.isMutating || state.history.length === 0) return;
    const prev = state.history.pop();
    state.graph = prev.graph;
    state.selectedId = prev.selectedId;
    state.activePresetId = prev.activePresetId;
    showToast('');
    renderAll();
  }

  function reset() {
    if (state.isMutating) return;
    if (state.graph) pushUndo();
    state.graph = {
      atoms: [{ id: 'c1', element: 'C' }],
      bonds: []
    };
    state.selectedId = 'c1';
    state.activePresetId = null;
    showToast('');
    renderAll();
  }

  function applyPreset(presetId) {
    if (state.isMutating) return;
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    if (state.graph) pushUndo();
    state.graph = hydrateGraphWithHydrogens(preset.graph);
    state.selectedId = state.graph.atoms[0]?.id || 'c1';
    state.activePresetId = preset.id;
    showToast('');
    // Reset scene positions on preset switch so the preset pops in cleanly
    scene.atomNodes.forEach((entry) => {
      if (entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
    });
    scene.bondNodes.forEach((entry) => {
      if (entry.g.parentNode) entry.g.parentNode.removeChild(entry.g);
    });
    scene.atomNodes.clear();
    scene.bondNodes.clear();
    scene.currentPos.clear();
    renderAll();
  }

  function renderPresets() {
    if (!dom.presetsList) return;
    dom.presetsList.innerHTML = PRESETS.map((p) => {
      const isActive = state.activePresetId === p.id;
      return `<button type="button" class="lab-preset-chip ${isActive ? 'active' : ''}" data-org-preset="${p.id}">${escapeHTML(p.label)}</button>`;
    }).join('');
  }

  function renderToolbarState(analysis) {
    const d = dict();
    const cCount = countCarbons(state.graph);
    if (dom.carbonCounter) {
      dom.carbonCounter.textContent = d.carbonCount(cCount);
      dom.carbonCounter.classList.toggle('is-max', cCount >= MAX_CARBONS);
    }
    if (dom.btnUndo) {
      dom.btnUndo.disabled = state.history.length === 0;
    }
    if (dom.btnToggleNum) {
      dom.btnToggleNum.classList.toggle('active', state.showNumbering);
      dom.btnToggleNum.setAttribute('aria-pressed', state.showNumbering ? 'true' : 'false');
    }
    if (dom.btnToggleH) {
      dom.btnToggleH.classList.toggle('active', state.showH);
      dom.btnToggleH.setAttribute('aria-pressed', state.showH ? 'true' : 'false');
    }
    if (dom.toggleHLabel) {
      dom.toggleHLabel.textContent = state.showH ? d.showHLabel : d.hideHLabel;
    }
    if (dom.btnAutoFill) {
      dom.btnAutoFill.classList.toggle('is-needed', analysis.missingTotalValence > 0);
    }

    const { atomMap } = buildAdjacency(state.graph);
    const sel = atomMap.get(state.selectedId);
    const isCarbonSel = Boolean(sel && sel.element === 'C');
    const canTakeH = Boolean(sel && (sel.element === 'C' || sel.element === 'O' || sel.element === 'N'));

    // Keep buttons clickable on Carbon even when full/at max so user gets immediate shake + red flash feedback!
    if (dom.attachBtns) {
      dom.attachBtns.forEach((btn) => {
        const act = btn.dataset.orgAction;
        if (act === 'add-h') {
          btn.disabled = !canTakeH;
        } else {
          btn.disabled = !isCarbonSel;
        }
      });
    }
    if (dom.btnDelete) {
      dom.btnDelete.disabled = !sel;
    }
  }

  function renderAll(animOptions) {
    if (!dom.panel || !state.graph) return;
    const d = dict();
    const analysis = analyzeAndNameMolecule(state.graph, state.lang);

    renderPresets();
    renderToolbarState(analysis);
    renderToast();

    // 1. Update Persistent Ball-and-Stick SVG Scene with Smooth Lerp & Animations
    syncSVGScene(state.graph, analysis, animOptions || {});

    // 2. Incomplete Valence Banner & Hero Preview/Official State
    const isIncomplete = !analysis.isComplete;
    if (dom.valenceBanner && dom.valenceText) {
      dom.valenceBanner.classList.toggle('hidden', !isIncomplete);
      if (isIncomplete) {
        dom.valenceText.textContent = d.incompleteValence(analysis.missingTotalValence);
      }
    }

    if (dom.nameHero) {
      dom.nameHero.classList.toggle('is-preview', isIncomplete);
      dom.nameHero.classList.toggle('is-complete', !isIncomplete);
    }
    if (dom.heroEyebrow) {
      dom.heroEyebrow.textContent = isIncomplete ? d.heroEyebrowPreview : d.heroEyebrow;
    }
    if (dom.iupacName) dom.iupacName.textContent = analysis.iupacName || '—';
    if (dom.classBadge) {
      dom.classBadge.textContent = analysis.compoundClassLabel;
      dom.classBadge.dataset.orgClass = analysis.compoundClassKey;
    }

    // 3. Quantitative Metrics
    if (dom.valFormula) dom.valFormula.innerHTML = toSubscriptHTML(analysis.molecularFormula || '—');
    if (dom.valCondensed) dom.valCondensed.innerHTML = toSubscriptHTML(analysis.condensedFormula || '—');
    if (dom.valMass) dom.valMass.textContent = `${analysis.molarMass.toFixed(3)} g/mol`;
    if (dom.valUnsat) {
      dom.valUnsat.textContent = `k = ${analysis.unsaturation} (${analysis.unsaturation} π)`;
    }

    // 4. Step-by-Step Breakdown
    if (dom.stepsList) {
      dom.stepsList.innerHTML = analysis.steps
        .map(
          (st) => `
          <li class="org-step-item">
            <span class="org-step-title">${escapeHTML(st.title)}</span>
            <p class="org-step-text">${escapeHTML(st.text)}</p>
          </li>
        `
        )
        .join('');
    }
  }

  function applyLanguage() {
    if (!dom.panel) return;
    const d = dict();
    dom.panel.querySelectorAll('[data-i18n-org]').forEach((node) => {
      const key = node.dataset.i18nOrg;
      if (typeof d[key] === 'string') {
        node.textContent = d[key];
      }
    });
    renderAll({ instant: true });
  }

  function getHeaderTexts(lang) {
    const l = lang === 'en' ? 'en' : 'vi';
    return {
      footerHint: ORG_I18N[l].footerHint
    };
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    state.lang = lang;
    applyLanguage();
  }

  function init(opts = {}) {
    callbacks = {
      getLang: opts.getLang || (() => 'vi')
    };

    const panel = document.getElementById('lab-panel-organic');
    if (!panel) return;

    dom = {
      panel,
      presetsList: document.getElementById('org-presets-list'),
      toolbar: document.getElementById('org-toolbar'),
      attachBtns: Array.from(panel.querySelectorAll('[data-org-action]')),
      carbonCounter: document.getElementById('org-carbon-counter'),
      btnAutoFill: document.getElementById('org-btn-autofill-h'),
      btnQuickFill: document.getElementById('org-btn-quick-fill'),
      btnDelete: document.getElementById('org-btn-delete'),
      btnToggleH: document.getElementById('org-btn-toggle-h'),
      toggleHLabel: document.getElementById('org-toggle-h-label'),
      btnToggleNum: document.getElementById('org-btn-toggle-num'),
      btnUndo: document.getElementById('org-btn-undo'),
      btnReset: document.getElementById('org-btn-reset'),
      toast: document.getElementById('org-toast'),
      svgHost: document.getElementById('org-svg-host'),
      valenceBanner: document.getElementById('org-valence-banner'),
      valenceText: document.getElementById('org-valence-text'),
      nameHero: document.getElementById('org-name-hero'),
      heroEyebrow: document.getElementById('org-hero-eyebrow'),
      iupacName: document.getElementById('org-iupac-name'),
      classBadge: document.getElementById('org-class-badge'),
      valFormula: document.getElementById('org-val-formula'),
      valCondensed: document.getElementById('org-val-condensed'),
      valMass: document.getElementById('org-val-mass'),
      valUnsat: document.getElementById('org-val-unsat'),
      stepsList: document.getElementById('org-steps-list')
    };

    // Start from 1 bare Carbon atom (4 clickable open valence slots)
    state.lang = callbacks.getLang();
    state.graph = {
      atoms: [{ id: 'c1', element: 'C' }],
      bonds: []
    };
    state.selectedId = 'c1';
    state.activePresetId = null;
    state.showH = true;
    state.showNumbering = true;
    state.history = [];

    if (dom.presetsList) {
      dom.presetsList.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-org-preset]');
        if (!btn) return;
        applyPreset(btn.dataset.orgPreset);
      });
    }

    if (dom.toolbar) {
      dom.toolbar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-org-action]');
        if (!btn || btn.disabled) return;
        const action = btn.dataset.orgAction;
        if (action === 'add-c') addCarbonBranch();
        else if (action === 'add-h') addHydrogenToAtom(state.selectedId);
        else if (action === 'add-oh') addSubstituent('OH');
        else if (action === 'add-o') addSubstituent('=O');
        else if (action === 'add-cooh') addSubstituent('COOH');
        else if (action === 'add-cl') addSubstituent('Cl');
        else if (action === 'add-br') addSubstituent('Br');
        else if (action === 'add-f') addSubstituent('F');
        else if (action === 'add-i') addSubstituent('I');
        else if (action === 'add-nh2') addSubstituent('NH2');
      });
    }

    if (dom.btnAutoFill) dom.btnAutoFill.addEventListener('click', autoFillHydrogens);
    if (dom.btnQuickFill) dom.btnQuickFill.addEventListener('click', autoFillHydrogens);
    if (dom.btnDelete) dom.btnDelete.addEventListener('click', deleteSelectedAtom);

    if (dom.btnToggleH) {
      dom.btnToggleH.addEventListener('click', () => {
        state.showH = !state.showH;
        renderAll();
      });
    }

    if (dom.btnToggleNum) {
      dom.btnToggleNum.addEventListener('click', () => {
        state.showNumbering = !state.showNumbering;
        renderAll();
      });
    }

    if (dom.btnUndo) dom.btnUndo.addEventListener('click', undo);
    if (dom.btnReset) dom.btnReset.addEventListener('click', reset);

    // Interactive SVG delegation: Atoms, Open Valence Slots, and C-C Bonds
    if (dom.svgHost) {
      dom.svgHost.addEventListener('click', (e) => {
        const slotEl = e.target.closest('.org-valence-slot');
        if (slotEl) {
          const parentId = slotEl.dataset.slotAtomId;
          const ang = Number(slotEl.dataset.slotAngle);
          if (parentId) {
            addHydrogenToAtom(parentId, Number.isFinite(ang) ? ang : undefined);
          }
          return;
        }
        const atomEl = e.target.closest('.org-atom-node');
        if (atomEl) {
          const id = atomEl.dataset.atomId;
          if (id) {
            state.selectedId = id;
            showToast('');
            renderAll();
          }
          return;
        }
        const bondEl = e.target.closest('.org-bond-group.is-cc');
        if (bondEl) {
          const idx = Number(bondEl.dataset.bondIdx);
          if (Number.isInteger(idx)) {
            cycleBondOrder(idx);
          }
        }
      });

      dom.svgHost.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const slotEl = e.target.closest('.org-valence-slot');
        if (slotEl) {
          e.preventDefault();
          const parentId = slotEl.dataset.slotAtomId;
          const ang = Number(slotEl.dataset.slotAngle);
          if (parentId) addHydrogenToAtom(parentId, Number.isFinite(ang) ? ang : undefined);
          return;
        }
        const atomEl = e.target.closest('.org-atom-node');
        if (atomEl) {
          e.preventDefault();
          state.selectedId = atomEl.dataset.atomId;
          renderAll();
          return;
        }
        const bondEl = e.target.closest('.org-bond-group.is-cc');
        if (bondEl) {
          e.preventDefault();
          cycleBondOrder(Number(bondEl.dataset.bondIdx));
        }
      });
    }

    applyLanguage();
  }

  const api = {
    init,
    setLang,
    getHeaderTexts,
    reset,
    analyzeAndNameMolecule
  };

  if (typeof global !== 'undefined') {
    global.OrganicBuilder = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
