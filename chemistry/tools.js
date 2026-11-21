// Interactive Periodic Table — Chemistry Tools Modal Controller (tools.js)
// Exports window.ChemTools with 3 tabbed utilities in a unified Dark Slate Matte modal:
//   Tab 1: Molar Mass & % Composition Calculator (with formula parser & table highlight)
//   Tab 2: Side-by-Side Element Comparison (with 8-metric mirrored ratio bars & Kelvin scaling)
//   Tab 3: pH Meter & Acid-Base Mixing Simulator (keyboard search, ~58-substance 25°C library,
//          exact Kw = 1e-14, 2-step H2SO4, weak acids/bases/salts, buffers & hydrolysis)

(function () {
  // =========================================================================
  // CONSTANTS & SCIENTIFIC DATA
  // =========================================================================
  const MOLAR_PRESETS = [
    'H2O',
    'H2SO4',
    'Ca(OH)2',
    'C6H12O6',
    'Fe2(SO4)3',
    'CuSO4·5H2O'
  ];

  const COMPARE_PRESETS = [
    ['Fe', 'Cu'],
    ['Na', 'K'],
    ['C', 'Si'],
    ['O', 'S'],
    ['Au', 'Ag'],
    ['H', 'He']
  ];

  const SUBSCRIPT_MAP = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
  };

  const KW = 1e-14;
  const H2SO4_KA2 = 1.2e-2;

  // Expanded 25°C Acid / Base / Hydrolyzing Salt Dictionary (~58 entries)
  const PH_SUBSTANCES = [
    // --- Strong Acids (7) ---
    { formula: 'HCl', role: 'acid', strength: 'strong-acid', proticity: 1, nameVi: 'Axit clohiđric', nameEn: 'Hydrochloric acid', kw: 'clohidric muriatic' },
    { formula: 'HBr', role: 'acid', strength: 'strong-acid', proticity: 1, nameVi: 'Axit bromhiđric', nameEn: 'Hydrobromic acid', kw: 'bromhidric' },
    { formula: 'HI', role: 'acid', strength: 'strong-acid', proticity: 1, nameVi: 'Axit iothiđric', nameEn: 'Hydroiodic acid', kw: 'iothidric' },
    { formula: 'HNO3', role: 'acid', strength: 'strong-acid', proticity: 1, nameVi: 'Axit nitric', nameEn: 'Nitric acid', kw: 'nitric' },
    { formula: 'HClO4', role: 'acid', strength: 'strong-acid', proticity: 1, nameVi: 'Axit pecloric', nameEn: 'Perchloric acid', kw: 'pecloric perchloric' },
    { formula: 'HClO3', role: 'acid', strength: 'strong-acid', proticity: 1, nameVi: 'Axit cloric', nameEn: 'Chloric acid', kw: 'cloric chloric' },
    { formula: 'H2SO4', role: 'acid', strength: 'h2so4', proticity: 2, Ka2: H2SO4_KA2, nameVi: 'Axit sunfuric', nameEn: 'Sulfuric acid', kw: 'sunfuric sulfuric' },

    // --- Weak Inorganic Acids (13) ---
    { formula: 'HF', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 6.8e-4, nameVi: 'Axit flohiđric', nameEn: 'Hydrofluoric acid', kw: 'flohidric fluoric' },
    { formula: 'HNO2', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 4.5e-4, nameVi: 'Axit nitrơ', nameEn: 'Nitrous acid', kw: 'nitro nitrous' },
    { formula: 'HClO', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 3.0e-8, nameVi: 'Axit hipoclorơ', nameEn: 'Hypochlorous acid', kw: 'hipocloro hypochlorous' },
    { formula: 'HClO2', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.1e-2, nameVi: 'Axit clorơ', nameEn: 'Chlorous acid', kw: 'cloro chlorous' },
    { formula: 'HCN', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 6.2e-10, nameVi: 'Axit xianhiđric', nameEn: 'Hydrocyanic acid', kw: 'xianhidric cyanic prussic' },
    { formula: 'H2S', role: 'acid', strength: 'weak-acid', proticity: 2, Ka: 9.1e-8, nameVi: 'Axit sunfuhiđric', nameEn: 'Hydrosulfuric acid', kw: 'sunfuhidric hydrogen sulfide' },
    { formula: 'H2CO3', role: 'acid', strength: 'weak-acid', proticity: 2, Ka: 4.3e-7, nameVi: 'Axit cacbonic', nameEn: 'Carbonic acid', kw: 'cacbonic carbonic' },
    { formula: 'H2SO3', role: 'acid', strength: 'weak-acid', proticity: 2, Ka: 1.5e-2, nameVi: 'Axit sunfurơ', nameEn: 'Sulfurous acid', kw: 'sunfuro sulfurous' },
    { formula: 'H3PO4', role: 'acid', strength: 'weak-acid', proticity: 3, Ka: 7.5e-3, nameVi: 'Axit photphoric', nameEn: 'Phosphoric acid', kw: 'photphoric phosphoric' },
    { formula: 'H3PO3', role: 'acid', strength: 'weak-acid', proticity: 2, Ka: 5.0e-2, nameVi: 'Axit photphorơ', nameEn: 'Phosphorous acid', kw: 'photphoro phosphorous' },
    { formula: 'H3BO3', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 5.8e-10, nameVi: 'Axit boric', nameEn: 'Boric acid', kw: 'boric' },
    { formula: 'H2SiO3', role: 'acid', strength: 'weak-acid', proticity: 2, Ka: 1.3e-10, nameVi: 'Axit silixic', nameEn: 'Silicic acid', kw: 'silixic silicic' },
    { formula: 'HN3', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.9e-5, nameVi: 'Axit hiđrazoic', nameEn: 'Hydrazoic acid', kw: 'hidrazoic hydrazoic' },

    // --- Organic Weak Acids (12) ---
    { formula: 'HCOOH', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.8e-4, nameVi: 'Axit fomic', nameEn: 'Formic acid', kw: 'fomic formic methanoic' },
    { formula: 'CH3COOH', aliases: ['HOAc', 'HAc'], role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.8e-5, nameVi: 'Axit axetic', nameEn: 'Acetic acid', kw: 'axetic acetic giam vinegar ethanoic' },
    { formula: 'C2H5COOH', aliases: ['CH3CH2COOH'], role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.3e-5, nameVi: 'Axit propionic', nameEn: 'Propionic acid', kw: 'propionic propanoic' },
    { formula: 'C3H7COOH', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.5e-5, nameVi: 'Axit butyric', nameEn: 'Butyric acid', kw: 'butyric butanoic' },
    { formula: 'C6H5COOH', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 6.3e-5, nameVi: 'Axit benzoic', nameEn: 'Benzoic acid', kw: 'benzoic' },
    { formula: 'H2C2O4', aliases: ['(COOH)2'], role: 'acid', strength: 'weak-acid', proticity: 2, Ka: 5.9e-2, nameVi: 'Axit oxalic', nameEn: 'Oxalic acid', kw: 'oxalic' },
    { formula: 'C6H8O7', role: 'acid', strength: 'weak-acid', proticity: 3, Ka: 7.4e-4, nameVi: 'Axit citric', nameEn: 'Citric acid', kw: 'citric chanh' },
    { formula: 'C3H6O3', aliases: ['CH3CH(OH)COOH'], role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.4e-4, nameVi: 'Axit lactic', nameEn: 'Lactic acid', kw: 'lactic sua' },
    { formula: 'C6H8O6', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 8.0e-5, nameVi: 'Axit ascorbic (Vitamin C)', nameEn: 'Ascorbic acid (Vitamin C)', kw: 'ascorbic vitamin c' },
    { formula: 'C6H5OH', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.3e-10, nameVi: 'Phenol', nameEn: 'Phenol', kw: 'phenol carbolic' },
    { formula: 'CH2ClCOOH', aliases: ['ClCH2COOH'], role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 1.4e-3, nameVi: 'Axit cloaxetic', nameEn: 'Chloroacetic acid', kw: 'cloaxetic chloroacetic' },
    { formula: 'CCl3COOH', role: 'acid', strength: 'weak-acid', proticity: 1, Ka: 2.2e-1, nameVi: 'Axit tricloaxetic', nameEn: 'Trichloroacetic acid', kw: 'tricloaxetic trichloroacetic' },

    // --- Strong Bases (8) ---
    { formula: 'LiOH', role: 'base', strength: 'strong-base', proticity: 1, nameVi: 'Liti hiđroxit', nameEn: 'Lithium hydroxide', kw: 'liti lithium' },
    { formula: 'NaOH', role: 'base', strength: 'strong-base', proticity: 1, nameVi: 'Natri hiđroxit', nameEn: 'Sodium hydroxide', kw: 'natri xut sodium caustic' },
    { formula: 'KOH', role: 'base', strength: 'strong-base', proticity: 1, nameVi: 'Kali hiđroxit', nameEn: 'Potassium hydroxide', kw: 'kali potassium' },
    { formula: 'RbOH', role: 'base', strength: 'strong-base', proticity: 1, nameVi: 'Rubidi hiđroxit', nameEn: 'Rubidium hydroxide', kw: 'rubidi rubidium' },
    { formula: 'CsOH', role: 'base', strength: 'strong-base', proticity: 1, nameVi: 'Xesi hiđroxit', nameEn: 'Caesium hydroxide', kw: 'xesi caesium cesium' },
    { formula: 'Ca(OH)2', role: 'base', strength: 'strong-base', proticity: 2, nameVi: 'Canxi hiđroxit (Nước vôi trong)', nameEn: 'Calcium hydroxide', kw: 'canxi voi toi calcium lime' },
    { formula: 'Sr(OH)2', role: 'base', strength: 'strong-base', proticity: 2, nameVi: 'Stronti hiđroxit', nameEn: 'Strontium hydroxide', kw: 'stronti strontium' },
    { formula: 'Ba(OH)2', role: 'base', strength: 'strong-base', proticity: 2, nameVi: 'Bari hiđroxit', nameEn: 'Barium hydroxide', kw: 'bari barium' },

    // --- Weak Inorganic & Organic Bases (9) ---
    { formula: 'NH3', aliases: ['NH4OH'], role: 'base', strength: 'weak-base', proticity: 1, Kb: 1.8e-5, nameVi: 'Amoniac', nameEn: 'Ammonia', kw: 'amoniac ammonia nh4oh' },
    { formula: 'CH3NH2', role: 'base', strength: 'weak-base', proticity: 1, Kb: 4.4e-4, nameVi: 'Metylamin', nameEn: 'Methylamine', kw: 'metylamin methylamine' },
    { formula: 'C2H5NH2', role: 'base', strength: 'weak-base', proticity: 1, Kb: 5.6e-4, nameVi: 'Etylamin', nameEn: 'Ethylamine', kw: 'etylamin ethylamine' },
    { formula: '(CH3)2NH', role: 'base', strength: 'weak-base', proticity: 1, Kb: 5.4e-4, nameVi: 'Đimetylamin', nameEn: 'Dimethylamine', kw: 'dimetylamin dimethylamine' },
    { formula: '(CH3)3N', role: 'base', strength: 'weak-base', proticity: 1, Kb: 6.5e-5, nameVi: 'Trimetylamin', nameEn: 'Trimethylamine', kw: 'trimetylamin trimethylamine' },
    { formula: 'C6H5NH2', role: 'base', strength: 'weak-base', proticity: 1, Kb: 4.3e-10, nameVi: 'Anilin', nameEn: 'Aniline', kw: 'anilin aniline phenylamine' },
    { formula: 'C5H5N', role: 'base', strength: 'weak-base', proticity: 1, Kb: 1.7e-9, nameVi: 'Pyridin', nameEn: 'Pyridine', kw: 'pyridin pyridine' },
    { formula: 'N2H4', role: 'base', strength: 'weak-base', proticity: 1, Kb: 1.3e-6, nameVi: 'Hiđrazin', nameEn: 'Hydrazine', kw: 'hidrazin hydrazine' },
    { formula: 'NH2OH', role: 'base', strength: 'weak-base', proticity: 1, Kb: 1.1e-8, nameVi: 'Hiđroxylamin', nameEn: 'Hydroxylamine', kw: 'hidroxylamin hydroxylamine' },

    // --- Neutral Salts & Pure Water (8) ---
    { formula: 'H2O', role: 'water', strength: 'neutral-salt', nameVi: 'Nước tinh khiết', nameEn: 'Pure water', kw: 'nuoc water' },
    { formula: 'NaCl', role: 'salt', strength: 'neutral-salt', nameVi: 'Natri clorua (Muối ăn)', nameEn: 'Sodium chloride', kw: 'muoi an salt' },
    { formula: 'KCl', role: 'salt', strength: 'neutral-salt', nameVi: 'Kali clorua', nameEn: 'Potassium chloride', kw: 'kali clorua' },
    { formula: 'NaNO3', role: 'salt', strength: 'neutral-salt', nameVi: 'Natri nitrat', nameEn: 'Sodium nitrate', kw: 'natri nitrat' },
    { formula: 'KNO3', role: 'salt', strength: 'neutral-salt', nameVi: 'Kali nitrat', nameEn: 'Potassium nitrate', kw: 'kali nitrat' },
    { formula: 'Na2SO4', role: 'salt', strength: 'neutral-salt', nameVi: 'Natri sunfat', nameEn: 'Sodium sulfate', kw: 'natri sunfat' },
    { formula: 'K2SO4', role: 'salt', strength: 'neutral-salt', nameVi: 'Kali sunfat', nameEn: 'Potassium sulfate', kw: 'kali sunfat' },
    { formula: 'BaCl2', role: 'salt', strength: 'neutral-salt', nameVi: 'Bari clorua', nameEn: 'Barium chloride', kw: 'bari clorua' },

    // --- Acidic Hydrolyzing Salts (5) ---
    { formula: 'NH4Cl', role: 'salt', strength: 'acid-salt', Ka: 5.56e-10, ionCount: 1, nameVi: 'Amoni clorua', nameEn: 'Ammonium chloride', kw: 'amoni clorua' },
    { formula: 'NH4NO3', role: 'salt', strength: 'acid-salt', Ka: 5.56e-10, ionCount: 1, nameVi: 'Amoni nitrat', nameEn: 'Ammonium nitrate', kw: 'amoni nitrat' },
    { formula: '(NH4)2SO4', role: 'salt', strength: 'acid-salt', Ka: 5.56e-10, ionCount: 2, nameVi: 'Amoni sunfat', nameEn: 'Ammonium sulfate', kw: 'amoni sunfat' },
    { formula: 'AlCl3', role: 'salt', strength: 'acid-salt', Ka: 1.4e-5, ionCount: 1, nameVi: 'Nhôm clorua', nameEn: 'Aluminium chloride', kw: 'nhom clorua aluminum' },
    { formula: 'FeCl3', role: 'salt', strength: 'acid-salt', Ka: 6.3e-3, ionCount: 1, nameVi: 'Sắt(III) clorua', nameEn: 'Iron(III) chloride', kw: 'sat clorua ferric' },

    // --- Basic & Amphiprotic Hydrolyzing Salts (10) ---
    { formula: 'CH3COONa', aliases: ['NaOAc'], role: 'salt', strength: 'base-salt', Kb: KW / 1.8e-5, ionCount: 1, nameVi: 'Natri axetat', nameEn: 'Sodium acetate', kw: 'natri axetat acetate' },
    { formula: 'HCOONa', role: 'salt', strength: 'base-salt', Kb: KW / 1.8e-4, ionCount: 1, nameVi: 'Natri fomat', nameEn: 'Sodium formate', kw: 'natri fomat formate' },
    { formula: 'NaF', role: 'salt', strength: 'base-salt', Kb: KW / 6.8e-4, ionCount: 1, nameVi: 'Natri florua', nameEn: 'Sodium fluoride', kw: 'natri florua fluoride' },
    { formula: 'KCN', role: 'salt', strength: 'base-salt', Kb: KW / 6.2e-10, ionCount: 1, nameVi: 'Kali xianua', nameEn: 'Potassium cyanide', kw: 'kali xianua cyanide' },
    { formula: 'NaClO', role: 'salt', strength: 'base-salt', Kb: KW / 3.0e-8, ionCount: 1, nameVi: 'Natri hipoclorit (Nước Javen)', nameEn: 'Sodium hypochlorite', kw: 'javen bleach hipoclorit' },
    { formula: 'Na2CO3', role: 'salt', strength: 'base-salt', Kb: 2.14e-4, ionCount: 1, nameVi: 'Natri cacbonat (Soda)', nameEn: 'Sodium carbonate', kw: 'soda cacbonat carbonate' },
    { formula: 'NaHCO3', role: 'salt', strength: 'amphiprotic-salt', Ka1: 4.3e-7, Ka2: 4.7e-11, nameVi: 'Natri hiđrocacbonat (Baking soda)', nameEn: 'Sodium bicarbonate', kw: 'baking soda hidrocacbonat' },
    { formula: 'Na2S', role: 'salt', strength: 'base-salt', Kb: 1.0e-1, ionCount: 1, nameVi: 'Natri sunfua', nameEn: 'Sodium sulfide', kw: 'natri sunfua sulfide' },
    { formula: 'Na3PO4', role: 'salt', strength: 'base-salt', Kb: 2.08e-2, ionCount: 1, nameVi: 'Natri photphat', nameEn: 'Trisodium phosphate', kw: 'natri photphat phosphate' },
    { formula: 'Na2SO3', role: 'salt', strength: 'base-salt', Kb: 1.59e-7, ionCount: 1, nameVi: 'Natri sunfit', nameEn: 'Sodium sulfite', kw: 'natri sunfit sulfite' }
  ];

  const INSOLUBLE_HYDROXIDES = new Map([
    ['fe(oh)2', 'Fe(OH)2'],
    ['fe(oh)3', 'Fe(OH)3'],
    ['cu(oh)2', 'Cu(OH)2'],
    ['al(oh)3', 'Al(OH)3'],
    ['mg(oh)2', 'Mg(OH)2'],
    ['zn(oh)2', 'Zn(OH)2'],
    ['pb(oh)2', 'Pb(OH)2'],
    ['cr(oh)3', 'Cr(OH)3'],
    ['ni(oh)2', 'Ni(OH)2'],
    ['co(oh)2', 'Co(OH)2'],
    ['mn(oh)2', 'Mn(OH)2'],
    ['be(oh)2', 'Be(OH)2'],
    ['cd(oh)2', 'Cd(OH)2'],
    ['sn(oh)2', 'Sn(OH)2'],
    ['bi(oh)3', 'Bi(OH)3'],
    ['agoh', 'AgOH'],
    ['hg(oh)2', 'Hg(OH)2']
  ]);

  // Build fast case-insensitive lookup map for PH_SUBSTANCES
  const PH_LOOKUP = new Map();
  PH_SUBSTANCES.forEach((s) => {
    PH_LOOKUP.set(s.formula.toLowerCase(), s);
    if (Array.isArray(s.aliases)) {
      s.aliases.forEach((a) => PH_LOOKUP.set(a.toLowerCase(), s));
    }
  });

  const CONC_QUICK_PRESETS = [
    { val: 1, label: '1 M' },
    { val: 0.1, label: '0.1 M' },
    { val: 0.01, label: '0.01 M' },
    { val: 0.005, label: '0.005 M' },
    { val: 1e-4, label: '10⁻⁴ M' },
    { val: 1e-8, label: '10⁻⁸ M' }
  ];

  const MIX_PRESETS = [
    { key: 'neutral', acid: 'HCl', c1: 0.1, v1: 100, base: 'NaOH', c2: 0.1, v2: 100 },
    { key: 'buffer', acid: 'CH3COOH', c1: 0.1, v1: 100, base: 'NaOH', c2: 0.1, v2: 50 },
    { key: 'weakEquiv', acid: 'CH3COOH', c1: 0.1, v1: 100, base: 'NaOH', c2: 0.1, v2: 100 },
    { key: 'weakBaseBuf', acid: 'HCl', c1: 0.1, v1: 50, base: 'NH3', c2: 0.1, v2: 100 }
  ];

  const COMPARE_METRICS = [
    { key: 'mass', isTemp: false, format: (v) => window.formatMass(v) },
    { key: 'radius', isTemp: false, format: (v) => String(v) },
    { key: 'electronegativity', isTemp: false, format: (v) => v.toFixed(2) },
    { key: 'ionization', isTemp: false, format: (v) => String(v) },
    { key: 'specificHeat', isTemp: false, format: (v) => v.toFixed(3) },
    {
      key: 'density',
      isTemp: false,
      format: (v) => {
        if (v < 0.001) return v.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
        if (v < 0.01) return v.toFixed(5).replace(/0+$/, '').replace(/\.$/, '');
        return String(v);
      }
    },
    { key: 'meltC', isTemp: true, format: (v) => String(v) },
    { key: 'boilC', isTemp: true, format: (v) => String(v) }
  ];

  // =========================================================================
  // BILINGUAL DICTIONARY (VI / EN)
  // =========================================================================
  const I18N = {
    vi: {
      modalTitle: 'Công Cụ Hóa Học',
      modalSubtitle: 'Tính khối lượng mol, so sánh nguyên tố & máy đo pH chuẩn 25°C',
      close: 'Đóng',
      tabMolar: 'Tính khối lượng mol',
      tabCompare: 'So sánh nguyên tố',
      tabPh: 'Máy đo pH',
      footerHints: {
        molar: 'Hỗ trợ ngoặc đơn (), ngoặc vuông [] lồng nhau, chỉ số Unicode (₀–₉) và muối ngậm nước (· hoặc .).',
        compare: 'Mẹo: Tìm nguyên tố bằng số hiệu Z, ký hiệu (Fe) hoặc tên Việt/Anh không dấu; dùng phím ↑/↓ và Enter để chọn.',
        ph: 'Hỗ trợ gõ tự do công thức hoặc tên chất (25°C, Kw = 10⁻¹⁴), kể cả dung dịch đệm, muối thủy phân và H₂SO₄ hai nấc.'
      },
      // Tab 1: Molar Mass
      molarPresetsLabel: 'Công thức mẫu:',
      molarInputLabel: 'Công thức hóa học',
      molarPlaceholder: 'Ví dụ: H2SO4, Ca(OH)2, Fe2(SO4)3, CuSO4·5H2O...',
      molarClearTitle: 'Xóa công thức',
      molarEmptyHint: 'Nhập công thức hóa học ở trên hoặc bấm một công thức mẫu để tính khối lượng mol và thành phần phần trăm.',
      molarTotalLabel: 'Tổng khối lượng mol (M)',
      molarElementsUnit: 'nguyên tố',
      molarAtomsUnit: 'nguyên tử',
      molarBarTitle: 'Tỷ lệ % khối lượng theo màu nhóm nguyên tố',
      molarColElement: 'Nguyên tố',
      molarColCount: 'Số nguyên tử',
      molarColAtomicMass: 'Nguyên tử khối (u)',
      molarColContrib: 'Đóng góp (g/mol)',
      molarColPercent: 'Tỷ lệ (%)',
      molarHighlightBtn: 'Đánh dấu trên bảng',
      molarHighlightTitle: 'Đóng hộp thoại và làm nổi bật các nguyên tố cấu thành trên bảng tuần hoàn',
      molarSyntheticNote: 'Lưu ý: Công thức có chứa nguyên tố phóng xạ dùng số khối đồng vị bền nhất [A].',
      errUnknownSymbol: (sym) => `Không tìm thấy ký hiệu nguyên tố "${sym}" trong bảng tuần hoàn.`,
      errLowercase: (ch, pos) =>
        `Ký tự "${ch}" không hợp lệ tại vị trí ${pos} — ký hiệu nguyên tố phải bắt đầu bằng chữ IN HOA (vd: H2O, NaCl).`,
      errMissingClose: (br) => `Thiếu dấu ngoặc đóng "${br}" trong công thức.`,
      errUnexpectedClose: (br, pos) => `Dư dấu ngoặc đóng "${br}" tại vị trí ${pos}.`,
      errMismatchBracket: (expected, got, pos) =>
        `Dấu ngoặc không khớp tại vị trí ${pos}: cần "${expected}" nhưng gặp "${got}".`,
      errEmptyGroup: 'Cặp dấu ngoặc trống không chứa nguyên tố nào.',
      errZeroSubscript: 'Chỉ số nguyên tố không được bằng 0 (nếu bạn định nhập Oxi, hãy dùng chữ "O").',
      errLeadingZero: (digits) =>
        `Chỉ số "${digits}" không hợp lệ vì bắt đầu bằng số 0 — có thể bạn gõ nhầm số 0 thay cho chữ "O"?`,
      errUnexpectedDigit: (pos) =>
        `Chữ số đặt sai vị trí (vị trí ${pos}). Chỉ số phải đứng ngay sau ký hiệu nguyên tố hoặc dấu ngoặc đóng.`,
      errInvalidChar: (ch, pos) => `Ký tự không hợp lệ "${ch}" tại vị trí ${pos}.`,
      errEmptySegment: 'Dấu chấm ngậm nước (· hoặc .) thiếu phần công thức ở hai bên.',
      errNoElements: 'Công thức chưa chứa nguyên tố hóa học hợp lệ nào.',
      errNumberTooLarge: 'Chỉ số nguyên tố quá lớn.',

      // Tab 2: Compare Elements
      cmpPresetsLabel: 'Cặp gợi ý:',
      cmpSlotA: 'Nguyên tố A',
      cmpSlotB: 'Nguyên tố B',
      cmpSearchA: 'Tìm nguyên tố A (Fe, 26, Sắt)...',
      cmpSearchB: 'Tìm nguyên tố B (Cu, 29, Đồng)...',
      cmpSwapTitle: 'Hoán đổi nguyên tố A và B',
      cmpNoResults: 'Không tìm thấy nguyên tố phù hợp',
      cmpColMetric: 'Chỉ số đối chiếu',
      cmpConfigLbl: 'Cấu hình e⁻',
      cmpOxLbl: 'Oxi hóa',
      cmpYearLbl: 'Phát hiện',
      cmpTempNote: 'Thanh tỷ lệ nhiệt độ nóng chảy & sôi được quy đổi theo thang tuyệt đối Kelvin (K = °C + 273.15).',
      cmpNoData: 'Không có dữ liệu',
      cmpMetrics: {
        mass: { label: 'Nguyên tử khối', unit: 'u' },
        radius: { label: 'Bán kính nguyên tử', unit: 'pm' },
        electronegativity: { label: 'Độ âm điện', unit: 'Pauling' },
        ionization: { label: 'Năng lượng ion hóa I₁', unit: 'kJ/mol' },
        specificHeat: { label: 'Nhiệt dung riêng', unit: 'J/(g·K)' },
        density: { label: 'Khối lượng riêng', unit: 'g/cm³' },
        meltC: { label: 'Nhiệt độ nóng chảy', unit: '°C' },
        boilC: { label: 'Nhiệt độ sôi', unit: '°C' }
      },

      // Tab 3: pH Meter
      phModeSingle: 'Dung dịch đơn',
      phModeMix: 'Pha trộn Axit + Bazơ',
      phSelectLabel: 'Nhập công thức hoặc tên chất',
      phSinglePlaceholder: 'Gõ công thức/tên: HCl, HCOOH, NH3, Na2CO3, anilin...',
      phAcidPlaceholder: 'Gõ axit: HCl, CH3COOH, H2SO4, fomic...',
      phBasePlaceholder: 'Gõ bazơ: NaOH, Ba(OH)2, NH3, anilin...',
      phNoDropdownMatch: 'Không có trong thư viện gợi ý — nhấn giữ nguyên để hệ thống tự kiểm tra công thức',
      phConcLabel: 'Nồng độ mol (Cₘ)',
      phConcRangeNote: 'Phạm vi nhập trực tiếp: 1e-9 đến 2 M (thanh trượt log₁₀: 10⁻⁶ – 1 M)',
      phConcInvalid: 'Vui lòng nhập nồng độ hợp lệ từ 1e-9 đến 2 M.',
      phEmptySubstance: 'Nhập công thức hoặc chọn chất từ danh sách gợi ý để tính pH.',
      phAcidCardTitle: 'Dung dịch Axit (mạnh hoặc yếu)',
      phBaseCardTitle: 'Dung dịch Bazơ (mạnh hoặc yếu)',
      phSubstanceLbl: 'Chất tan',
      phConcShort: 'Nồng độ (M)',
      phVolShort: 'Thể tích (mL)',
      phMixPresetsLabel: 'Mẫu pha trộn:',
      phMixPresetLabels: {
        neutral: 'Trung hòa (HCl + NaOH)',
        buffer: 'Đệm (100mL CH₃COOH 0.1M + 50mL NaOH 0.1M)',
        weakEquiv: 'Tương đương yếu (100mL CH₃COOH + 100mL NaOH)',
        weakBaseBuf: 'Đệm bazơ (50mL HCl + 100mL NH₃)'
      },
      phMixInvalid: 'Vui lòng nhập nồng độ (≥ 0, ≤ 5 M) và thể tích (> 0 mL) hợp lệ.',
      phMixNeedBoth: 'Vui lòng nhập đầy đủ 1 Axit hợp lệ bên trái và 1 Bazơ hợp lệ bên phải.',
      phWrongAcidGotBase: (f) => `${f} là bazơ, không phải axit — hãy nhập chất này vào ô Bazơ bên phải.`,
      phWrongAcidGotSalt: (f) => `${f} là muối/nước, không phải axit — hãy dùng chế độ "Dung dịch đơn" để đo pH muối.`,
      phWrongBaseGotAcid: (f) => `${f} là axit, không phải bazơ — hãy nhập chất này vào ô Axit bên trái.`,
      phWrongBaseGotSalt: (f) => `${f} là muối/nước, không phải bazơ — hãy dùng chế độ "Dung dịch đơn" để đo pH muối.`,
      phInsolubleErr: (f) => `${f} là hiđroxit ít tan / kết tủa trong nước, không tạo dung dịch kiềm mạnh ở nồng độ cao.`,
      phNonElectrolyteErr: (f) => `${f} là công thức hợp lệ nhưng không phân li tạo môi trường axit hoặc bazơ trong nước.`,
      // Classification badges
      badgeStrongAcid: (n) => `Axit mạnh (${n} nấc)`,
      badgeH2SO4: 'Axit mạnh • Nấc 1 hoàn toàn, Ka₂ = 1.2 × 10⁻²',
      badgeWeakAcid: (ka) => `Axit yếu • Ka = ${ka}`,
      badgeWeakAcidEst: 'Ước lượng axit hữu cơ yếu • Ka ≈ 1.5 × 10⁻⁵',
      badgeStrongBase: (n) => `Bazơ mạnh (${n} nấc OH⁻)`,
      badgeWeakBase: (kb) => `Bazơ yếu • Kb = ${kb}`,
      badgeWeakBaseEst: 'Ước lượng amin yếu • Kb ≈ 4.0 × 10⁻⁴',
      badgeNeutralSalt: 'Dung dịch trung tính (pH = 7.00)',
      badgeAcidSalt: (ka) => `Muối thủy phân môi trường axit • Ka = ${ka}`,
      badgeBaseSalt: (kb) => `Muối thủy phân môi trường bazơ • Kb = ${kb}`,
      badgeAmphiproticSalt: 'Muối lưỡng tính (tạo môi trường bazơ yếu, pH ≈ 8.3)',
      badgeInsoluble: 'Bazơ ít tan / kết tủa trong nước',
      badgeNonElectrolyte: 'Không phân li tạo môi trường axit / bazơ',
      badgeInvalidFormula: 'Công thức hóa học chưa hợp lệ',
      // Dropdown group tags
      tagStrongAcid: 'Axit mạnh',
      tagWeakAcid: 'Axit yếu',
      tagStrongBase: 'Bazơ mạnh',
      tagWeakBase: 'Bazơ yếu',
      tagNeutral: 'Trung tính',
      tagAcidSalt: 'Muối axit',
      tagBaseSalt: 'Muối bazơ',
      // Stoichiometry
      phStoichTitle: 'Tóm tắt cân bằng pha trộn',
      phTotalVol: 'Tổng thể tích V',
      phResidualConc: 'Trạng thái dung dịch',
      phExcessAcid: (f) => `Dư axit mạnh (${f} → dư H⁺)`,
      phExcessBase: (f) => `Dư bazơ mạnh (${f} → dư OH⁻)`,
      phEquivalence: 'Trung hòa vừa đủ — Điểm tương đương (pH = 7.00)',
      phBufferAcid: (f) => `Dung dịch đệm axit (${f} dư / muối liên hợp)`,
      phBufferBase: (f) => `Dung dịch đệm bazơ (${f} dư / muối liên hợp)`,
      phEquivBaseHydrolysis: 'Điểm tương đương — Thủy phân muối tạo môi trường bazơ',
      phEquivAcidHydrolysis: 'Điểm tương đương — Thủy phân muối tạo môi trường axit',
      phWeakWeakStatus: 'Axit yếu + Bazơ yếu (cân bằng điện li kép)',
      phWeakWeakNote: 'Trộn axit yếu với bazơ yếu: pH được tính theo cân bằng điện li đồng thời (xấp xỉ khoa học, bỏ qua tương tác hoạt độ ion).',
      phPolyproticNote: 'Lưu ý: Axit đa chức yếu được tính đương lượng tổng và xấp xỉ theo nấc Ka₁ (ưu thế chính).',
      phEnvStrongAcid: 'Axit mạnh',
      phEnvWeakAcid: 'Axit yếu',
      phEnvNeutral: 'Trung tính',
      phEnvWeakBase: 'Bazơ yếu',
      phEnvStrongBase: 'Bazơ mạnh',
      phScaleTitle: 'Thang đo pH (0 – 14 ở 25°C)',
      phScaleAcid: 'Axit',
      phScaleNeutral: 'Trung tính',
      phScaleBase: 'Bazơ',
      phIndicatorsTitle: 'Mô phỏng chất chỉ thị màu',
      phLitmusTitle: 'Quỳ tím (Litmus)',
      phLitmusRed: 'Hóa đỏ (pH < 6)',
      phLitmusPurple: 'Giữ màu tím (6 ≤ pH ≤ 8)',
      phLitmusBlue: 'Hóa xanh (pH > 8)',
      phPhenolTitle: 'Phenolphtalein',
      phPhenolClear: 'Không màu (pH < 8.2)',
      phPhenolLight: 'Hồng nhạt (8.2 ≤ pH < 10)',
      phPhenolDeep: 'Hồng đậm (pH ≥ 10)',
      phWaterNote: 'Dung dịch siêu loãng — đã tính tự điện li của nước (Kw = 10⁻¹⁴).'
    },
    en: {
      modalTitle: 'Chemistry Tools',
      modalSubtitle: 'Molar mass calculator, element comparison & 25°C pH meter',
      close: 'Close',
      tabMolar: 'Molar Mass',
      tabCompare: 'Compare Elements',
      tabPh: 'pH Meter',
      footerHints: {
        molar: 'Supports nested () / [] brackets, Unicode subscripts (₀–₉), and hydrate salts (· or .).',
        compare: 'Tip: Search by atomic number Z, symbol (Fe), or element name; use ↑/↓ and Enter to pick.',
        ph: 'Type any formula or substance name (25°C, Kw = 10⁻¹⁴), including buffers, hydrolyzing salts & 2-step H₂SO₄.'
      },
      // Tab 1: Molar Mass
      molarPresetsLabel: 'Sample formulas:',
      molarInputLabel: 'Chemical formula',
      molarPlaceholder: 'e.g., H2SO4, Ca(OH)2, Fe2(SO4)3, CuSO4·5H2O...',
      molarClearTitle: 'Clear formula',
      molarEmptyHint: 'Enter a chemical formula above or pick a sample preset to compute molar mass and mass %.',
      molarTotalLabel: 'Total Molar Mass (M)',
      molarElementsUnit: 'elements',
      molarAtomsUnit: 'atoms',
      molarBarTitle: 'Mass % distribution by element category color',
      molarColElement: 'Element',
      molarColCount: 'Atoms',
      molarColAtomicMass: 'Atomic Mass (u)',
      molarColContrib: 'Contribution (g/mol)',
      molarColPercent: 'Mass %',
      molarHighlightBtn: 'Highlight on Table',
      molarHighlightTitle: 'Close dialog and highlight constituent elements on the periodic table',
      molarSyntheticNote: 'Note: Radioactive elements use the mass number [A] of their longest-lived isotope.',
      errUnknownSymbol: (sym) => `Unknown element symbol "${sym}" — not found in the periodic table.`,
      errLowercase: (ch, pos) =>
        `Invalid character "${ch}" at position ${pos} — element symbols must start with an UPPERCASE letter (e.g., H2O, NaCl).`,
      errMissingClose: (br) => `Missing closing bracket "${br}" in formula.`,
      errUnexpectedClose: (br, pos) => `Unexpected closing bracket "${br}" at position ${pos}.`,
      errMismatchBracket: (expected, got, pos) =>
        `Mismatched bracket at position ${pos}: expected "${expected}", found "${got}".`,
      errEmptyGroup: 'Empty parentheses contain no elements.',
      errZeroSubscript: 'Subscript cannot be 0 (if you meant Oxygen, use the letter "O").',
      errLeadingZero: (digits) =>
        `Invalid subscript "${digits}" (starts with 0 — did you type digit 0 instead of letter "O"?).`,
      errUnexpectedDigit: (pos) =>
        `Unexpected digit at position ${pos}. Subscripts must immediately follow an element symbol or closing bracket.`,
      errInvalidChar: (ch, pos) => `Invalid character "${ch}" at position ${pos}.`,
      errEmptySegment: 'Hydrate separator (· or .) is missing a formula on one side.',
      errNoElements: 'Formula does not contain any valid chemical elements.',
      errNumberTooLarge: 'Subscript value is too large.',

      // Tab 2: Compare Elements
      cmpPresetsLabel: 'Suggested pairs:',
      cmpSlotA: 'Element A',
      cmpSlotB: 'Element B',
      cmpSearchA: 'Search element A (Fe, 26, Iron)...',
      cmpSearchB: 'Search element B (Cu, 29, Copper)...',
      cmpSwapTitle: 'Swap Element A and Element B',
      cmpNoResults: 'No matching elements found',
      cmpColMetric: 'Property Comparison',
      cmpConfigLbl: 'Electron config',
      cmpOxLbl: 'Oxidation',
      cmpYearLbl: 'Discovered',
      cmpTempNote: 'Melting & boiling point bars are scaled on absolute Kelvin (K = °C + 273.15).',
      cmpNoData: 'No data',
      cmpMetrics: {
        mass: { label: 'Atomic Mass', unit: 'u' },
        radius: { label: 'Atomic Radius', unit: 'pm' },
        electronegativity: { label: 'Electronegativity', unit: 'Pauling' },
        ionization: { label: '1st Ionization Energy', unit: 'kJ/mol' },
        specificHeat: { label: 'Specific Heat', unit: 'J/(g·K)' },
        density: { label: 'Density', unit: 'g/cm³' },
        meltC: { label: 'Melting Point', unit: '°C' },
        boilC: { label: 'Boiling Point', unit: '°C' }
      },

      // Tab 3: pH Meter
      phModeSingle: 'Single Solution',
      phModeMix: 'Mix Acid + Base',
      phSelectLabel: 'Enter formula or substance name',
      phSinglePlaceholder: 'Type formula/name: HCl, HCOOH, NH3, Na2CO3, aniline...',
      phAcidPlaceholder: 'Type acid: HCl, CH3COOH, H2SO4, formic...',
      phBasePlaceholder: 'Type base: NaOH, Ba(OH)2, NH3, aniline...',
      phNoDropdownMatch: 'Not in preset list — keep typing to validate or estimate formula automatically',
      phConcLabel: 'Molar concentration (Cₘ)',
      phConcRangeNote: 'Direct input range: 1e-9 to 2 M (log₁₀ slider: 10⁻⁶ – 1 M)',
      phConcInvalid: 'Please enter a valid concentration between 1e-9 and 2 M.',
      phEmptySubstance: 'Type a chemical formula or select a substance from the suggestions to calculate pH.',
      phAcidCardTitle: 'Acid Solution (strong or weak)',
      phBaseCardTitle: 'Base Solution (strong or weak)',
      phSubstanceLbl: 'Solute',
      phConcShort: 'Concentration (M)',
      phVolShort: 'Volume (mL)',
      phMixPresetsLabel: 'Mix presets:',
      phMixPresetLabels: {
        neutral: 'Neutralize (HCl + NaOH)',
        buffer: 'Buffer (100mL CH₃COOH 0.1M + 50mL NaOH 0.1M)',
        weakEquiv: 'Weak equiv. (100mL CH₃COOH + 100mL NaOH)',
        weakBaseBuf: 'Base buffer (50mL HCl + 100mL NH₃)'
      },
      phMixInvalid: 'Please enter valid concentrations (0–5 M) and volumes (> 0 mL).',
      phMixNeedBoth: 'Please enter a valid Acid on the left and a valid Base on the right.',
      phWrongAcidGotBase: (f) => `${f} is a base, not an acid — enter it in the Base field on the right.`,
      phWrongAcidGotSalt: (f) => `${f} is a salt/water, not an acid — use "Single Solution" mode for salt pH.`,
      phWrongBaseGotAcid: (f) => `${f} is an acid, not a base — enter it in the Acid field on the left.`,
      phWrongBaseGotSalt: (f) => `${f} is a salt/water, not a base — use "Single Solution" mode for salt pH.`,
      phInsolubleErr: (f) => `${f} is a sparingly soluble / precipitating hydroxide in water and does not form a strong alkaline solution.`,
      phNonElectrolyteErr: (f) => `${f} is a valid formula but does not dissociate to create an acidic or basic aqueous solution.`,
      // Classification badges
      badgeStrongAcid: (n) => `Strong acid (${n}-protic)`,
      badgeH2SO4: 'Strong acid • Step 1 complete, Ka₂ = 1.2 × 10⁻²',
      badgeWeakAcid: (ka) => `Weak acid • Ka = ${ka}`,
      badgeWeakAcidEst: 'Estimated weak organic acid • Ka ≈ 1.5 × 10⁻⁵',
      badgeStrongBase: (n) => `Strong base (${n} OH⁻)`,
      badgeWeakBase: (kb) => `Weak base • Kb = ${kb}`,
      badgeWeakBaseEst: 'Estimated weak amine • Kb ≈ 4.0 × 10⁻⁴',
      badgeNeutralSalt: 'Neutral aqueous solution (pH = 7.00)',
      badgeAcidSalt: (ka) => `Acidic hydrolyzing salt • Ka = ${ka}`,
      badgeBaseSalt: (kb) => `Basic hydrolyzing salt • Kb = ${kb}`,
      badgeAmphiproticSalt: 'Amphiprotic salt (mildly basic, pH ≈ 8.3)',
      badgeInsoluble: 'Poorly soluble hydroxide / precipitate',
      badgeNonElectrolyte: 'Non-acid/base in aqueous solution',
      badgeInvalidFormula: 'Invalid chemical formula',
      // Dropdown group tags
      tagStrongAcid: 'Strong Acid',
      tagWeakAcid: 'Weak Acid',
      tagStrongBase: 'Strong Base',
      tagWeakBase: 'Weak Base',
      tagNeutral: 'Neutral',
      tagAcidSalt: 'Acidic Salt',
      tagBaseSalt: 'Basic Salt',
      // Stoichiometry
      phStoichTitle: 'Mixing Equilibrium Summary',
      phTotalVol: 'Total Volume V',
      phResidualConc: 'Solution composition',
      phExcessAcid: (f) => `Strong acid excess (${f} → excess H⁺)`,
      phExcessBase: (f) => `Strong base excess (${f} → excess OH⁻)`,
      phEquivalence: 'Exact Neutralization — Equivalence Point (pH = 7.00)',
      phBufferAcid: (f) => `Acidic buffer (${f} excess / conjugate salt)`,
      phBufferBase: (f) => `Basic buffer (${f} excess / conjugate salt)`,
      phEquivBaseHydrolysis: 'Equivalence point — Basic salt hydrolysis',
      phEquivAcidHydrolysis: 'Equivalence point — Acidic salt hydrolysis',
      phWeakWeakStatus: 'Weak acid + Weak base (coupled equilibrium)',
      phWeakWeakNote: 'Weak acid + weak base mixture: pH computed via coupled charge-balance approximation (ideal dilute solution).',
      phPolyproticNote: 'Note: Polyprotic weak acid uses total equivalents and dominant Ka₁ equilibrium approximation.',
      phEnvStrongAcid: 'Strong Acid',
      phEnvWeakAcid: 'Weak Acid',
      phEnvNeutral: 'Neutral',
      phEnvWeakBase: 'Weak Base',
      phEnvStrongBase: 'Strong Base',
      phScaleTitle: 'pH Scale (0 – 14 at 25°C)',
      phScaleAcid: 'Acidic',
      phScaleNeutral: 'Neutral',
      phScaleBase: 'Basic',
      phIndicatorsTitle: 'Indicator Color Simulation',
      phLitmusTitle: 'Litmus Paper',
      phLitmusRed: 'Turns Red (pH < 6)',
      phLitmusPurple: 'Stays Purple (6 ≤ pH ≤ 8)',
      phLitmusBlue: 'Turns Blue (pH > 8)',
      phPhenolTitle: 'Phenolphthalein',
      phPhenolClear: 'Colorless (pH < 8.2)',
      phPhenolLight: 'Pale Pink (8.2 ≤ pH < 10)',
      phPhenolDeep: 'Deep Pink (pH ≥ 10)',
      phWaterNote: 'Ultra-dilute solution — includes water autoionization (Kw = 10⁻¹⁴).'
    }
  };

  // =========================================================================
  // STATE & DOM CACHE
  // =========================================================================
  let symbolMap = null;

  const state = {
    lang: 'vi',
    isOpen: false,
    activeTab: 'molar', // 'molar' | 'compare' | 'ph'
    // Tab 1: Molar Mass
    molarInput: 'Fe2(SO4)3',
    molarResult: null,
    // Tab 2: Compare
    elA: null,
    elB: null,
    openDropdown: null, // 'a' | 'b' | 'ph-single' | 'ph-acid' | 'ph-base' | null
    highlightIndex: -1,
    filteredA: [],
    filteredB: [],
    filteredPh: [],
    // Tab 3: pH Meter
    phMode: 'single', // 'single' | 'mix'
    phSingleText: 'HCl',
    phSingleConc: 0.01,
    phSingleInputText: '0.01',
    phSingleValid: true,
    phMixAcidText: 'CH3COOH',
    phMixC1: 0.1,
    phMixV1: 100,
    phMixBaseText: 'NaOH',
    phMixC2: 0.1,
    phMixV2: 50,
    phMixValid: true
  };

  let callbacks = {
    getLang: () => 'vi',
    onOpen: () => {},
    onClose: () => {},
    onHighlightElements: () => {}
  };

  let dom = {};

  // =========================================================================
  // HELPERS
  // =========================================================================
  function dict() {
    return I18N[state.lang] || I18N.vi;
  }

  function getSymbolMap() {
    if (!symbolMap) {
      symbolMap = new Map();
      (window.ELEMENTS || []).forEach((el) => {
        symbolMap.set(el.symbol, el);
      });
    }
    return symbolMap;
  }

  function findBySymbol(sym) {
    return getSymbolMap().get(sym) || (window.ELEMENTS || [])[0] || null;
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  }

  function normalizeFormulaInput(raw) {
    return String(raw || '')
      .replace(/[₀-₉]/g, (ch) => SUBSCRIPT_MAP[ch] || ch)
      .trim();
  }

  function formatFormulaHTML(raw) {
    const clean = normalizeFormulaInput(raw)
      .replace(/\s*([·•*.])\s*/g, '·')
      .replace(/\s+/g, '');
    const escaped = escapeHTML(clean);
    return escaped.replace(/([A-Za-z)\]])(\d+)/g, '$1<sub>$2</sub>');
  }

  function formatSciHTML(val, unit = 'M') {
    if (!Number.isFinite(val) || val <= 0) return unit ? `0 ${unit}` : '0';
    const exp = Math.floor(Math.log10(val));
    let mantissa = val / Math.pow(10, exp);
    let finalExp = exp;
    if (mantissa >= 9.995) {
      mantissa = 1;
      finalExp = exp + 1;
    }
    const suffix = unit ? ` ${unit}` : '';
    if (finalExp === 0) {
      return `${mantissa.toFixed(2)}${suffix}`;
    }
    const expStr = finalExp < 0 ? `−${Math.abs(finalExp)}` : `${finalExp}`;
    return `${mantissa.toFixed(2)} × 10<sup>${expStr}</sup>${suffix}`;
  }

  function formatKShort(val) {
    if (!Number.isFinite(val) || val <= 0) return '—';
    const exp = Math.floor(Math.log10(val));
    let mantissa = val / Math.pow(10, exp);
    let finalExp = exp;
    if (mantissa >= 9.95) {
      mantissa = 1;
      finalExp = exp + 1;
    }
    const supMap = { '-': '−', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    const sup = String(finalExp).replace(/[-0-9]/g, (c) => supMap[c] || c);
    return `${mantissa.toFixed(1).replace(/\.0$/, '')} × 10${sup}`;
  }

  function formatConcForInput(val) {
    if (!Number.isFinite(val) || val <= 0) return '';
    if (val >= 0.001) {
      const fixed = val >= 1 ? val.toFixed(3) : val >= 0.1 ? val.toFixed(4) : val.toFixed(5);
      return fixed.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '');
    }
    const expStr = val.toExponential(2);
    return expStr.replace(/\.00e/, 'e').replace(/(\.\d*?[1-9])0+e/, '$1e').replace(/e\+/, 'e');
  }

  function formatMoles(mol) {
    if (!Number.isFinite(mol) || mol <= 0) return '0 mmol';
    const mmol = mol * 1000;
    if (mmol >= 0.01) {
      const s = mmol >= 100 ? mmol.toFixed(1) : mmol >= 1 ? mmol.toFixed(2) : mmol.toFixed(3);
      return `${s.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')} mmol`;
    }
    return formatSciHTML(mol, 'mol');
  }

  function getElementDisplayName(el) {
    return state.lang === 'en' ? el.enName : el.name;
  }

  // =========================================================================
  // TAB 1: MOLAR MASS PARSER & RENDERER
  // =========================================================================
  function getCategoryBarColor(catKey, occurrenceIdx) {
    const cat = window.ELEMENT_CATEGORIES && window.ELEMENT_CATEGORIES[catKey];
    if (!cat) return '#64748b';
    if (occurrenceIdx === 0) return cat.color;
    if (occurrenceIdx === 1) return `color-mix(in srgb, ${cat.color} 78%, #cbd5e1)`;
    if (occurrenceIdx === 2) return `color-mix(in srgb, ${cat.color} 60%, #e2e8f0)`;
    return `color-mix(in srgb, ${cat.color} 84%, #0e1117)`;
  }

  function parseChemicalFormula(rawInput) {
    const d = dict();
    const normalized = normalizeFormulaInput(rawInput);
    if (!normalized) {
      return { ok: false, empty: true, error: '' };
    }

    const sMap = getSymbolMap();
    const compact = normalized.replace(/\s+/g, '');
    const segments = compact.split(/[·•*.]/);

    if (segments.some((seg) => seg.length === 0)) {
      return { ok: false, empty: false, error: d.errEmptySegment };
    }

    const totalCounts = new Map();
    let globalOffset = 0;

    for (let segIdx = 0; segIdx < segments.length; segIdx++) {
      const seg = segments[segIdx];
      let pos = 0;
      const len = seg.length;
      const absPos = (p) => globalOffset + p + 1;

      function readPositiveInt() {
        const start = pos;
        while (pos < len && seg[pos] >= '0' && seg[pos] <= '9') {
          pos++;
        }
        if (pos === start) return null;
        const rawDigits = seg.slice(start, pos);
        if (rawDigits === '0' || /^0+$/.test(rawDigits)) {
          throw new Error(d.errZeroSubscript);
        }
        if (rawDigits[0] === '0') {
          throw new Error(d.errLeadingZero(rawDigits));
        }
        const val = Number(rawDigits);
        if (!Number.isSafeInteger(val) || val > 1000000) {
          throw new Error(d.errNumberTooLarge);
        }
        return val;
      }

      function parseGroup(expectedClose) {
        const counts = new Map();
        let hasItems = false;

        while (pos < len) {
          const ch = seg[pos];

          if (ch === ')' || ch === ']') {
            if (!expectedClose) {
              throw new Error(d.errUnexpectedClose(ch, absPos(pos)));
            }
            if (ch !== expectedClose) {
              throw new Error(d.errMismatchBracket(expectedClose, ch, absPos(pos)));
            }
            if (!hasItems) {
              throw new Error(d.errEmptyGroup);
            }
            pos++;
            return counts;
          }

          if (ch === '(' || ch === '[') {
            const closeChar = ch === '(' ? ')' : ']';
            pos++;
            const inner = parseGroup(closeChar);
            const mult = readPositiveInt() ?? 1;
            inner.forEach((cnt, sym) => {
              const next = (counts.get(sym) || 0) + cnt * mult;
              if (!Number.isSafeInteger(next)) throw new Error(d.errNumberTooLarge);
              counts.set(sym, next);
            });
            hasItems = true;
            continue;
          }

          if (ch >= 'A' && ch <= 'Z') {
            const start = pos;
            pos++;
            while (pos < len && seg[pos] >= 'a' && seg[pos] <= 'z') {
              pos++;
            }
            const sym = seg.slice(start, pos);
            if (!sMap.has(sym)) {
              throw new Error(d.errUnknownSymbol(sym));
            }
            const cnt = readPositiveInt() ?? 1;
            const next = (counts.get(sym) || 0) + cnt;
            if (!Number.isSafeInteger(next)) throw new Error(d.errNumberTooLarge);
            counts.set(sym, next);
            hasItems = true;
            continue;
          }

          if (ch >= 'a' && ch <= 'z') {
            throw new Error(d.errLowercase(ch, absPos(pos)));
          }

          if (ch >= '0' && ch <= '9') {
            throw new Error(d.errUnexpectedDigit(absPos(pos)));
          }

          throw new Error(d.errInvalidChar(ch, absPos(pos)));
        }

        if (expectedClose) {
          throw new Error(d.errMissingClose(expectedClose));
        }
        return counts;
      }

      try {
        const leadingMult = readPositiveInt() ?? 1;
        if (pos >= len) {
          throw new Error(d.errNoElements);
        }
        const segCounts = parseGroup(null);
        if (segCounts.size === 0) {
          throw new Error(d.errNoElements);
        }
        segCounts.forEach((cnt, sym) => {
          const next = (totalCounts.get(sym) || 0) + cnt * leadingMult;
          if (!Number.isSafeInteger(next)) throw new Error(d.errNumberTooLarge);
          totalCounts.set(sym, next);
        });
      } catch (err) {
        return { ok: false, empty: false, error: err.message };
      }

      globalOffset += len + 1;
    }

    if (totalCounts.size === 0) {
      return { ok: false, empty: false, error: d.errNoElements };
    }

    let totalMass = 0;
    let totalAtoms = 0;
    let hasSyntheticMass = false;
    const rawItems = [];

    totalCounts.forEach((count, sym) => {
      const el = sMap.get(sym);
      const massContrib = el.mass * count;
      totalMass += massContrib;
      totalAtoms += count;
      if (Number.isInteger(el.mass)) hasSyntheticMass = true;
      rawItems.push({ el, count, massContrib });
    });

    const catUsage = new Map();
    const items = rawItems.map((item) => {
      const catKey = item.el.category;
      const idx = catUsage.get(catKey) || 0;
      catUsage.set(catKey, idx + 1);
      const pct = totalMass > 0 ? (item.massContrib / totalMass) * 100 : 0;
      const cat = window.ELEMENT_CATEGORIES[catKey];
      return {
        el: item.el,
        count: item.count,
        massContrib: item.massContrib,
        pct,
        baseColor: cat ? cat.color : '#64748b',
        barColor: getCategoryBarColor(catKey, idx),
        tileBg: cat ? cat.bg : 'var(--bg-card)',
        tileBorder: cat ? cat.borderHover : 'var(--border-strong)'
      };
    });

    return {
      ok: true,
      empty: false,
      raw: compact,
      formattedHtml: formatFormulaHTML(compact),
      items,
      totalMass,
      totalAtoms,
      hasSyntheticMass
    };
  }

  function renderMolarPresets() {
    if (!dom.molarPresets) return;
    const currentNorm = normalizeFormulaInput(state.molarInput)
      .replace(/\s*([·•*.])\s*/g, '·')
      .replace(/\s+/g, '');
    dom.molarPresets.innerHTML = MOLAR_PRESETS.map((formula) => {
      const isActive = formula === currentNorm;
      return `<button type="button" class="molar-preset-chip ${isActive ? 'active' : ''}" data-formula="${formula}">${formatFormulaHTML(formula)}</button>`;
    }).join('');
  }

  function renderMolarTab() {
    if (!dom.molarResultWrap) return;
    const d = dict();
    const isEn = state.lang === 'en';
    const result = parseChemicalFormula(state.molarInput);
    state.molarResult = result;

    renderMolarPresets();
    if (dom.molarClear) {
      dom.molarClear.classList.toggle('hidden', !state.molarInput);
    }

    if (!result.ok) {
      dom.molarResultWrap.classList.add('hidden');
      if (dom.molarHighlightBtn) dom.molarHighlightBtn.disabled = true;

      if (result.empty) {
        dom.molarError.classList.add('hidden');
        dom.molarEmpty.classList.remove('hidden');
        dom.molarEmpty.textContent = d.molarEmptyHint;
      } else {
        dom.molarEmpty.classList.add('hidden');
        dom.molarError.classList.remove('hidden');
        dom.molarErrorText.textContent = result.error;
      }
      return;
    }

    dom.molarEmpty.classList.add('hidden');
    dom.molarError.classList.add('hidden');
    dom.molarResultWrap.classList.remove('hidden');
    if (dom.molarHighlightBtn) dom.molarHighlightBtn.disabled = false;

    dom.molarFormulaDisplay.innerHTML = result.formattedHtml;
    dom.molarTotalVal.textContent = result.totalMass.toFixed(3);
    dom.molarTotalMeta.textContent = `${result.items.length} ${d.molarElementsUnit} • ${result.totalAtoms} ${d.molarAtomsUnit}`;

    dom.molarPctBar.innerHTML = result.items
      .map((item) => {
        const displayName = getElementDisplayName(item.el);
        const catLabel = isEn ? item.el.categoryLabelEn : item.el.categoryLabel;
        const tip = `${item.el.symbol} (${displayName} · ${catLabel}): ${item.pct.toFixed(2)}% (${item.massContrib.toFixed(3)} g/mol)`;
        const innerLabel =
          item.pct >= 13
            ? `<span class="molar-bar-lbl">${item.el.symbol} ${item.pct.toFixed(1)}%</span>`
            : item.pct >= 6.5
            ? `<span class="molar-bar-lbl">${item.el.symbol}</span>`
            : '';
        return `<div class="molar-bar-seg tools-molar-seg" style="width:${item.pct.toFixed(3)}%;background:${item.barColor};" title="${escapeHTML(tip)}">${innerLabel}</div>`;
      })
      .join('');

    dom.molarTbody.innerHTML = result.items
      .map((item) => {
        const displayName = getElementDisplayName(item.el);
        const catLabel = isEn ? item.el.categoryLabelEn : item.el.categoryLabel;
        const atomicMassStr = window.formatMass(item.el.mass);
        return `
          <tr>
            <td>
              <div class="tools-molar-el-cell">
                <span class="tools-molar-badge" style="background:${item.tileBg};border-color:${item.baseColor};" title="${escapeHTML(catLabel)}">${item.el.symbol}</span>
                <span class="tools-molar-el-name">${escapeHTML(displayName)}</span>
              </div>
            </td>
            <td class="mono num-col">${item.count}</td>
            <td class="mono num-col">${atomicMassStr}</td>
            <td class="mono num-col"><strong>${item.massContrib.toFixed(3)}</strong></td>
            <td class="mono num-col">
              <span class="tools-pct-pill" style="--pct-dot:${item.barColor};">${item.pct.toFixed(2)}%</span>
            </td>
          </tr>
        `;
      })
      .join('');

    dom.molarSyntheticNote.classList.toggle('hidden', !result.hasSyntheticMass);
    if (result.hasSyntheticMass) {
      dom.molarSyntheticNote.textContent = d.molarSyntheticNote;
    }
  }

  // =========================================================================
  // TAB 2: COMPARE ELEMENTS (SMART PICKERS + 8-METRIC RATIO BARS)
  // =========================================================================
  function searchElements(rawQuery) {
    const q = normalizeText(rawQuery);
    const all = window.ELEMENTS || [];
    if (!q) return all;

    if (/^\d+$/.test(q)) {
      const exactNum = all.filter((el) => String(el.number) === q);
      const startsNum = all.filter((el) => String(el.number).startsWith(q) && String(el.number) !== q);
      return [...exactNum, ...startsNum];
    }

    const exact = [];
    const prefix = [];
    const sub = [];
    all.forEach((el) => {
      const sym = normalizeText(el.symbol);
      const vi = normalizeText(el.name);
      const en = normalizeText(el.enName);
      if (sym === q || vi === q || en === q) {
        exact.push(el);
      } else if (
        sym.startsWith(q) ||
        vi.startsWith(q) ||
        en.startsWith(q) ||
        vi.split(/\s+/).some((w) => w.startsWith(q))
      ) {
        prefix.push(el);
      } else if (vi.includes(q) || en.includes(q)) {
        sub.push(el);
      }
    });
    return [...exact, ...prefix, ...sub];
  }

  function formatRatio(high, low) {
    if (!Number.isFinite(low) || low <= 0) return '—';
    const r = high / low;
    if (r >= 10000) return '>9999×';
    if (r >= 100) return `${Math.round(r)}×`;
    if (r >= 10) return `${r.toFixed(1)}×`;
    return `${r.toFixed(2)}×`;
  }

  function formatTempDiff(a, b) {
    const diff = Math.abs(a - b);
    const val = diff >= 100 ? String(Math.round(diff)) : Number(diff.toFixed(1)).toString();
    return `Δ ${val}°C`;
  }

  function renderComparePresets() {
    if (!dom.cmpPresets) return;
    const symA = state.elA ? state.elA.symbol : '';
    const symB = state.elB ? state.elB.symbol : '';
    dom.cmpPresets.innerHTML = COMPARE_PRESETS.map(([a, b]) => {
      const isActive = (symA === a && symB === b) || (symA === b && symB === a);
      return `<button type="button" class="lab-preset-chip ${isActive ? 'active' : ''}" data-a="${a}" data-b="${b}">${a} vs ${b}</button>`;
    }).join('');
  }

  function renderCompareCard(slot, el) {
    const container = slot === 'a' ? dom.cmpPreviewA : dom.cmpPreviewB;
    const card = slot === 'a' ? dom.cmpPickerA : dom.cmpPickerB;
    if (!container || !card || !el) return;

    const d = dict();
    const isEn = state.lang === 'en';
    const cat = window.ELEMENT_CATEGORIES[el.category];
    card.style.setProperty('--slot-color', cat.color);

    const catLbl = isEn ? el.categoryLabelEn : el.categoryLabel;
    const phaseLbl = isEn ? el.phaseEn : el.phase;
    const yearLbl = isEn ? el.yearEn : el.year;
    const configHtml = window.formatElectronConfigHTML(el.config);
    const oxStr = el.oxidationStates || '—';

    container.innerHTML = `
      <div class="tools-cmp-card-head">
        <div class="lab-mini-tile">
          <span class="lab-mini-z">${el.number}</span>
          <span class="lab-mini-sym">${el.symbol}</span>
        </div>
        <div class="lab-mini-info">
          <div class="lab-mini-name">${escapeHTML(getElementDisplayName(el))}</div>
          <div class="lab-mini-meta">
            <span>${escapeHTML(catLbl)}</span>
            <span class="lab-mini-dot">•</span>
            <span>${escapeHTML(phaseLbl)} (25°C)</span>
          </div>
        </div>
      </div>
      <div class="tools-cmp-facts">
        <div class="tools-cmp-fact">
          <span class="tools-cmp-fact-lbl">${d.cmpConfigLbl}</span>
          <span class="tools-cmp-fact-val mono">${configHtml}</span>
        </div>
        <div class="tools-cmp-fact">
          <span class="tools-cmp-fact-lbl">${d.cmpOxLbl}</span>
          <span class="tools-cmp-fact-val mono">${escapeHTML(oxStr)}</span>
        </div>
        <div class="tools-cmp-fact">
          <span class="tools-cmp-fact-lbl">${d.cmpYearLbl}</span>
          <span class="tools-cmp-fact-val">${escapeHTML(yearLbl)}</span>
        </div>
      </div>
    `;
  }

  function renderCompareDropdown(slot, query) {
    const listEl = slot === 'a' ? dom.cmpDropdownA : dom.cmpDropdownB;
    if (!listEl) return;
    const matches = searchElements(query);
    if (slot === 'a') state.filteredA = matches;
    else state.filteredB = matches;

    const currentEl = slot === 'a' ? state.elA : state.elB;
    const d = dict();

    if (matches.length === 0) {
      listEl.innerHTML = `<div class="lab-dropdown-empty">${d.cmpNoResults}</div>`;
      state.highlightIndex = -1;
      return;
    }

    if (state.highlightIndex >= matches.length) {
      state.highlightIndex = 0;
    }

    listEl.innerHTML = matches
      .map((el, idx) => {
        const cat = window.ELEMENT_CATEGORIES[el.category];
        const isSel = currentEl && currentEl.number === el.number;
        const isHi = idx === state.highlightIndex;
        return `
          <button
            type="button"
            class="lab-option ${isSel ? 'is-selected' : ''} ${isHi ? 'is-highlighted' : ''}"
            data-number="${el.number}"
            data-index="${idx}"
            role="option"
            aria-selected="${isSel ? 'true' : 'false'}"
          >
            <span class="lab-opt-sym" style="background:${cat.bg};border-color:${cat.color};">${el.symbol}</span>
            <span class="lab-opt-num">#${el.number}</span>
            <span class="lab-opt-name">${escapeHTML(getElementDisplayName(el))}</span>
            <span class="lab-opt-eneg">${window.formatMass(el.mass)} u</span>
          </button>
        `;
      })
      .join('');
  }

  function openCompareDropdown(slot) {
    closeDropdowns();
    state.openDropdown = slot;
    state.highlightIndex = 0;
    const inputEl = slot === 'a' ? dom.cmpSearchA : dom.cmpSearchB;
    const listEl = slot === 'a' ? dom.cmpDropdownA : dom.cmpDropdownB;
    renderCompareDropdown(slot, inputEl.value);
    listEl.classList.remove('hidden');
  }

  function closeDropdowns() {
    state.openDropdown = null;
    state.highlightIndex = -1;
    if (dom.cmpDropdownA) dom.cmpDropdownA.classList.add('hidden');
    if (dom.cmpDropdownB) dom.cmpDropdownB.classList.add('hidden');
    if (dom.phSingleDropdown) dom.phSingleDropdown.classList.add('hidden');
    if (dom.phAcidDropdown) dom.phAcidDropdown.classList.add('hidden');
    if (dom.phBaseDropdown) dom.phBaseDropdown.classList.add('hidden');
  }

  function hasOpenDropdown() {
    return state.openDropdown !== null;
  }

  function selectCompareElement(slot, el) {
    if (!el) return;
    if (slot === 'a') {
      state.elA = el;
      if (dom.cmpSearchA) dom.cmpSearchA.value = '';
    } else {
      state.elB = el;
      if (dom.cmpSearchB) dom.cmpSearchB.value = '';
    }
    closeDropdowns();
    renderCompareTab();
  }

  function renderCompareTab() {
    if (!dom.cmpRows || !state.elA || !state.elB) return;
    const d = dict();
    const elA = state.elA;
    const elB = state.elB;

    renderComparePresets();
    renderCompareCard('a', elA);
    renderCompareCard('b', elB);

    if (dom.cmpHeadA) {
      dom.cmpHeadA.innerHTML = `<i class="cmp-side-dot side-a"></i><span class="cmp-head-sym">${elA.symbol}</span><span class="cmp-head-name">${escapeHTML(getElementDisplayName(elA))}</span>`;
    }
    if (dom.cmpHeadB) {
      dom.cmpHeadB.innerHTML = `<span class="cmp-head-name">${escapeHTML(getElementDisplayName(elB))}</span><span class="cmp-head-sym">${elB.symbol}</span><i class="cmp-side-dot side-b"></i>`;
    }

    const rowsHtml = COMPARE_METRICS.map((spec) => {
      const mText = d.cmpMetrics[spec.key];
      const rawA = elA[spec.key];
      const rawB = elB[spec.key];
      const hasA = typeof rawA === 'number' && Number.isFinite(rawA);
      const hasB = typeof rawB === 'number' && Number.isFinite(rawB);

      const valTextA = hasA ? spec.format(rawA) : '—';
      const valTextB = hasB ? spec.format(rawB) : '—';

      let pctA = 0;
      let pctB = 0;
      let winner = 'none';
      let deltaBadge = '—';

      if (hasA && hasB) {
        const sA = spec.isTemp ? Math.max(0.01, rawA + 273.15) : Math.max(0, rawA);
        const sB = spec.isTemp ? Math.max(0.01, rawB + 273.15) : Math.max(0, rawB);
        const maxS = Math.max(sA, sB);

        if (maxS > 0) {
          pctA = (sA / maxS) * 100;
          pctB = (sB / maxS) * 100;
        }

        if (rawA > rawB) {
          winner = 'a';
          deltaBadge = spec.isTemp ? `◀ ${formatTempDiff(rawA, rawB)}` : `◀ ${formatRatio(rawA, rawB)}`;
        } else if (rawB > rawA) {
          winner = 'b';
          deltaBadge = spec.isTemp ? `${formatTempDiff(rawA, rawB)} ▶` : `${formatRatio(rawB, rawA)} ▶`;
        } else {
          winner = 'tie';
          deltaBadge = '=';
        }
      } else if (hasA) {
        pctA = 100;
        winner = 'only-a';
      } else if (hasB) {
        pctB = 100;
        winner = 'only-b';
      }

      const visPctA = hasA ? Math.max(3, Math.min(100, pctA)) : 0;
      const visPctB = hasB ? Math.max(3, Math.min(100, pctB)) : 0;

      const tipA = hasA
        ? spec.isTemp
          ? `${elA.symbol}: ${valTextA} °C (${(rawA + 273.15).toFixed(2)} K)`
          : `${elA.symbol}: ${valTextA} ${mText.unit}`
        : `${elA.symbol}: ${d.cmpNoData}`;
      const tipB = hasB
        ? spec.isTemp
          ? `${elB.symbol}: ${valTextB} °C (${(rawB + 273.15).toFixed(2)} K)`
          : `${elB.symbol}: ${valTextB} ${mText.unit}`
        : `${elB.symbol}: ${d.cmpNoData}`;

      const badgeCls =
        winner === 'a'
          ? 'is-win-a'
          : winner === 'b'
          ? 'is-win-b'
          : winner === 'tie'
          ? 'is-tie'
          : '';

      return `
        <div class="cmp-row" data-metric="${spec.key}">
          <div class="cmp-row-top">
            <div class="cmp-val cmp-val-a ${winner === 'a' ? 'is-higher' : ''} ${!hasA ? 'is-null' : ''}" title="${escapeHTML(tipA)}">
              <strong>${valTextA}</strong>
              ${hasA ? `<span class="cmp-val-unit">${mText.unit}</span>` : ''}
            </div>
            <div class="cmp-metric-center">
              <span class="cmp-metric-name">${mText.label}</span>
              <span class="cmp-delta-badge ${badgeCls}">${deltaBadge}</span>
            </div>
            <div class="cmp-val cmp-val-b ${winner === 'b' ? 'is-higher' : ''} ${!hasB ? 'is-null' : ''}" title="${escapeHTML(tipB)}">
              <strong>${valTextB}</strong>
              ${hasB ? `<span class="cmp-val-unit">${mText.unit}</span>` : ''}
            </div>
          </div>
          <div class="cmp-bars-row" aria-hidden="true">
            <div class="cmp-bar-track cmp-track-a ${!hasA ? 'is-null' : ''}" title="${escapeHTML(tipA)}">
              ${
                hasA
                  ? `<div class="cmp-bar-fill cmp-fill-a ${winner === 'a' || winner === 'only-a' ? 'is-higher' : ''}" style="width:${visPctA.toFixed(1)}%"></div>`
                  : ''
              }
            </div>
            <div class="cmp-bar-axis"></div>
            <div class="cmp-bar-track cmp-track-b ${!hasB ? 'is-null' : ''}" title="${escapeHTML(tipB)}">
              ${
                hasB
                  ? `<div class="cmp-bar-fill cmp-fill-b ${winner === 'b' || winner === 'only-b' ? 'is-higher' : ''}" style="width:${visPctB.toFixed(1)}%"></div>`
                  : ''
              }
            </div>
          </div>
        </div>
      `;
    }).join('');

    dom.cmpRows.innerHTML = rowsHtml;
    if (dom.cmpTempNote) {
      dom.cmpTempNote.textContent = d.cmpTempNote;
    }
  }

  // =========================================================================
  // TAB 3: pH METER — SMART SUBSTANCE RESOLVER, SEARCH & EXACT 25°C SOLVER
  // =========================================================================
  function getPhSubstanceTag(sub) {
    const d = dict();
    if (sub.strength === 'strong-acid' || sub.strength === 'h2so4') return { text: d.tagStrongAcid, cls: 'tag-acid' };
    if (sub.strength === 'weak-acid') return { text: d.tagWeakAcid, cls: 'tag-weak-acid' };
    if (sub.strength === 'strong-base') return { text: d.tagStrongBase, cls: 'tag-base' };
    if (sub.strength === 'weak-base') return { text: d.tagWeakBase, cls: 'tag-weak-base' };
    if (sub.strength === 'neutral-salt') return { text: d.tagNeutral, cls: 'tag-neutral' };
    if (sub.strength === 'acid-salt') return { text: d.tagAcidSalt, cls: 'tag-weak-acid' };
    return { text: d.tagBaseSalt, cls: 'tag-weak-base' };
  }

  function getClassificationBadge(resolved) {
    const d = dict();
    if (!resolved || resolved.status === 'empty') return null;

    if (resolved.status === 'invalid') {
      return { text: d.badgeInvalidFormula, cls: 'is-error' };
    }
    if (resolved.status === 'insoluble') {
      return { text: d.badgeInsoluble, cls: 'is-warn' };
    }
    if (resolved.status === 'non-electrolyte') {
      return { text: d.badgeNonElectrolyte, cls: 'is-muted' };
    }

    const sub = resolved.substance;
    if (resolved.estimated === 'carboxylic') {
      return { text: d.badgeWeakAcidEst, cls: 'is-weak-acid' };
    }
    if (resolved.estimated === 'amine') {
      return { text: d.badgeWeakBaseEst, cls: 'is-weak-base' };
    }
    if (sub.strength === 'strong-acid') {
      return { text: d.badgeStrongAcid(sub.proticity || 1), cls: 'is-acid' };
    }
    if (sub.strength === 'h2so4') {
      return { text: d.badgeH2SO4, cls: 'is-acid' };
    }
    if (sub.strength === 'weak-acid') {
      return { text: d.badgeWeakAcid(formatKShort(sub.Ka)), cls: 'is-weak-acid' };
    }
    if (sub.strength === 'strong-base') {
      return { text: d.badgeStrongBase(sub.proticity || 1), cls: 'is-base' };
    }
    if (sub.strength === 'weak-base') {
      return { text: d.badgeWeakBase(formatKShort(sub.Kb)), cls: 'is-weak-base' };
    }
    if (sub.strength === 'neutral-salt') {
      return { text: d.badgeNeutralSalt, cls: 'is-neutral' };
    }
    if (sub.strength === 'acid-salt') {
      return { text: d.badgeAcidSalt(formatKShort(sub.Ka)), cls: 'is-weak-acid' };
    }
    if (sub.strength === 'base-salt') {
      return { text: d.badgeBaseSalt(formatKShort(sub.Kb)), cls: 'is-weak-base' };
    }
    if (sub.strength === 'amphiprotic-salt') {
      return { text: d.badgeAmphiproticSalt, cls: 'is-weak-base' };
    }
    return null;
  }

  function resolvePhSubstance(rawText) {
    const d = dict();
    const cleaned = normalizeFormulaInput(rawText).replace(/\s+/g, '');
    if (!cleaned) {
      return { status: 'empty', error: d.phEmptySubstance };
    }

    const lower = cleaned.toLowerCase();

    // 1) Exact case-insensitive match against library formulas & aliases
    if (PH_LOOKUP.has(lower)) {
      return { status: 'ok', substance: PH_LOOKUP.get(lower), estimated: null };
    }

    // 2) Known insoluble hydroxides (case-insensitive)
    if (INSOLUBLE_HYDROXIDES.has(lower)) {
      const canon = INSOLUBLE_HYDROXIDES.get(lower);
      return { status: 'insoluble', formula: canon, error: d.phInsolubleErr(canon) };
    }

    // 3) Check exact Vietnamese / English name match (e.g. user typed "amoniac" or "anilin")
    const normQuery = normalizeText(rawText);
    const byName = PH_SUBSTANCES.find((s) => {
      const vi = normalizeText(s.nameVi);
      const en = normalizeText(s.nameEn);
      return vi === normQuery || en === normQuery || vi.replace(/^axit\s+/, '') === normQuery || en.replace(/\s+acid$/, '') === normQuery;
    });
    if (byName) {
      return { status: 'ok', substance: byName, estimated: null };
    }

    // 4) Validate syntax & elements with periodic table parser (catches H2S04, XyOH, etc.)
    const parsed = parseChemicalFormula(cleaned);
    if (!parsed.ok) {
      return { status: 'invalid', error: parsed.error };
    }

    // 5) Smart heuristics for valid formulas outside the built-in dictionary
    if (/^[A-Z][a-z]?\(OH\)[234]$/.test(cleaned)) {
      return { status: 'insoluble', formula: cleaned, error: d.phInsolubleErr(cleaned) };
    }

    if (cleaned.endsWith('COOH') && cleaned.length > 4) {
      return {
        status: 'ok',
        estimated: 'carboxylic',
        substance: {
          formula: cleaned,
          role: 'acid',
          strength: 'weak-acid',
          proticity: 1,
          Ka: 1.5e-5,
          nameVi: `Axit hữu cơ (${cleaned})`,
          nameEn: `Organic acid (${cleaned})`
        }
      };
    }

    if (cleaned.endsWith('NH2') && cleaned.length > 3) {
      return {
        status: 'ok',
        estimated: 'amine',
        substance: {
          formula: cleaned,
          role: 'base',
          strength: 'weak-base',
          proticity: 1,
          Kb: 4.0e-4,
          nameVi: `Amin hữu cơ (${cleaned})`,
          nameEn: `Organic amine (${cleaned})`
        }
      };
    }

    // 6) Valid formula but non-acid/base/hydrolyzing salt
    return { status: 'non-electrolyte', formula: cleaned, error: d.phNonElectrolyteErr(cleaned) };
  }

  function searchPhSubstances(rawQuery, filterRole = 'all') {
    const pool =
      filterRole === 'acid'
        ? PH_SUBSTANCES.filter((s) => s.role === 'acid')
        : filterRole === 'base'
        ? PH_SUBSTANCES.filter((s) => s.role === 'base')
        : PH_SUBSTANCES;

    const q = normalizeText(normalizeFormulaInput(rawQuery));
    if (!q) return pool;

    const exact = [];
    const prefix = [];
    const contains = [];

    pool.forEach((s) => {
      const f = s.formula.toLowerCase();
      const aliases = (s.aliases || []).map((a) => a.toLowerCase());
      const vi = normalizeText(s.nameVi);
      const en = normalizeText(s.nameEn);
      const kw = normalizeText(s.kw || '');

      if (f === q || aliases.includes(q)) {
        exact.push(s);
      } else if (
        f.startsWith(q) ||
        aliases.some((a) => a.startsWith(q)) ||
        vi.startsWith(q) ||
        en.startsWith(q) ||
        vi.split(/\s+/).some((w) => w.startsWith(q)) ||
        en.split(/\s+/).some((w) => w.startsWith(q))
      ) {
        prefix.push(s);
      } else if (f.includes(q) || vi.includes(q) || en.includes(q) || kw.includes(q)) {
        contains.push(s);
      }
    });

    return [...exact, ...prefix, ...contains];
  }

  // Exact monotone bisection solver for charge-balance equations f(pH) = 0
  // Requires f(lo) > 0 and f(hi) < 0 (strictly decreasing in pH).
  function solveMonotonePH(fn, lo = -1.5, hi = 15.5) {
    let a = lo;
    let b = hi;
    for (let i = 0; i < 64; i++) {
      const mid = (a + b) * 0.5;
      if (fn(mid) > 0) a = mid;
      else b = mid;
    }
    return (a + b) * 0.5;
  }

  function computeStrongIon(c) {
    const safeC = Math.max(0, c);
    return (safeC + Math.sqrt(safeC * safeC + 4 * KW)) / 2;
  }

  function computeSinglePH(substanceOrFormula, conc) {
    let sub = substanceOrFormula;
    if (typeof substanceOrFormula === 'string') {
      const resolved = resolvePhSubstance(substanceOrFormula);
      if (resolved.status !== 'ok') {
        return { ok: false, error: resolved.error };
      }
      sub = resolved.substance;
    }
    const C = Math.max(0, conc);
    let hPlus = 1e-7;
    let ohMinus = 1e-7;
    let diluteWaterNote = false;

    if (sub.strength === 'neutral-salt' || C === 0) {
      hPlus = 1e-7;
      ohMinus = 1e-7;
    } else if (sub.strength === 'strong-acid') {
      const cEff = C * (sub.proticity || 1);
      hPlus = computeStrongIon(cEff);
      ohMinus = KW / hPlus;
      diluteWaterNote = cEff > 0 && cEff < 1e-6;
    } else if (sub.strength === 'h2so4') {
      // Exact 2-step dissociation: Step 1 complete (C), Step 2 HSO4- <-> H+ + SO4^2- (Ka2 = 1.2e-2)
      const Ka2 = sub.Ka2 || H2SO4_KA2;
      const pH = solveMonotonePH((ph) => {
        const H = Math.pow(10, -ph);
        const OH = KW / H;
        return H - OH - C * (1 + Ka2 / (H + Ka2));
      });
      hPlus = Math.pow(10, -pH);
      ohMinus = KW / hPlus;
      diluteWaterNote = C > 0 && C < 1e-6;
    } else if (sub.strength === 'strong-base') {
      const cEff = C * (sub.proticity || 1);
      ohMinus = computeStrongIon(cEff);
      hPlus = KW / ohMinus;
      diluteWaterNote = cEff > 0 && cEff < 1e-6;
    } else if (sub.strength === 'weak-acid' || sub.strength === 'acid-salt') {
      const cEff = C * (sub.ionCount || 1);
      const Ka = sub.Ka;
      const pH = solveMonotonePH((ph) => {
        const H = Math.pow(10, -ph);
        const OH = KW / H;
        return H - OH - cEff * (Ka / (H + Ka));
      });
      hPlus = Math.pow(10, -pH);
      ohMinus = KW / hPlus;
      diluteWaterNote = cEff > 0 && hPlus < 1e-6;
    } else if (sub.strength === 'weak-base' || sub.strength === 'base-salt') {
      const cEff = C * (sub.ionCount || 1);
      const Kb = sub.Kb;
      const KaConj = KW / Kb;
      const pH = solveMonotonePH((ph) => {
        const H = Math.pow(10, -ph);
        const OH = KW / H;
        return H + cEff * (H / (H + KaConj)) - OH;
      });
      hPlus = Math.pow(10, -pH);
      ohMinus = KW / hPlus;
      diluteWaterNote = cEff > 0 && ohMinus < 1e-6;
    } else if (sub.strength === 'amphiprotic-salt') {
      // Exact amphiprotic charge balance for NaHCO3: [H+] + [Na+] = [OH-] + [HCO3-] + 2[CO3^2-]
      const Ka1 = sub.Ka1;
      const Ka2 = sub.Ka2;
      const pH = solveMonotonePH((ph) => {
        const H = Math.pow(10, -ph);
        const OH = KW / H;
        const denom = H * H + Ka1 * H + Ka1 * Ka2;
        const alpha1 = (Ka1 * H) / denom;
        const alpha2 = (Ka1 * Ka2) / denom;
        return H + C - OH - C * (alpha1 + 2 * alpha2);
      });
      hPlus = Math.pow(10, -pH);
      ohMinus = KW / hPlus;
    }

    const pH = -Math.log10(hPlus);
    const pOH = 14 - pH;
    return { ok: true, pH, pOH, hPlus, ohMinus, diluteWaterNote, solution: sub };
  }

  function computeMixPH(acidSubOrFormula, c1, v1Ml, baseSubOrFormula, c2, v2Ml) {
    let acid = acidSubOrFormula;
    let base = baseSubOrFormula;
    if (typeof acid === 'string') {
      const r = resolvePhSubstance(acid);
      if (r.status !== 'ok') return { ok: false, error: r.error };
      acid = r.substance;
    }
    if (typeof base === 'string') {
      const r = resolvePhSubstance(base);
      if (r.status !== 'ok') return { ok: false, error: r.error };
      base = r.substance;
    }

    const v1L = v1Ml / 1000;
    const v2L = v2Ml / 1000;
    const vTotalMl = v1Ml + v2Ml;
    const vTotalL = vTotalMl / 1000;

    const pA = acid.proticity || 1;
    const pB = base.proticity || 1;
    const nH = pA * c1 * v1L;
    const nOH = pB * c2 * v2L;
    const diff = nH - nOH;
    const eps = 1e-11 * Math.max(nH, nOH, 1e-12);

    const isAcidStrong = acid.strength === 'strong-acid' || acid.strength === 'h2so4';
    const isBaseStrong = base.strength === 'strong-base';

    let pH = 7.0;
    let status = 'neutral';
    let statusDetailHTML = '0 M';
    let diluteWaterNote = false;
    let extraNote = '';

    // Case 1: Strong Acid + Strong Base
    if (isAcidStrong && isBaseStrong) {
      if (acid.strength === 'h2so4' && diff > eps) {
        const cA = (c1 * v1L) / vTotalL;
        const cB = nOH / vTotalL;
        const Ka2 = acid.Ka2 || H2SO4_KA2;
        pH = solveMonotonePH((ph) => {
          const H = Math.pow(10, -ph);
          const OH = KW / H;
          return H + cB - OH - cA * (1 + Ka2 / (H + Ka2));
        });
        const excessH = Math.pow(10, -pH);
        status = 'excess-acid';
        statusDetailHTML = `[H⁺] = ${formatSciHTML(excessH, 'M')}`;
        diluteWaterNote = (diff / vTotalL) < 1e-6;
      } else if (Math.abs(diff) <= eps) {
        status = 'neutral';
        pH = 7.0;
        statusDetailHTML = '0 M';
      } else if (diff > 0) {
        const cEx = diff / vTotalL;
        const hPlus = computeStrongIon(cEx);
        pH = -Math.log10(hPlus);
        status = 'excess-acid';
        statusDetailHTML = `[H⁺] = ${formatSciHTML(cEx, 'M')}`;
        diluteWaterNote = cEx < 1e-6;
      } else {
        const cEx = Math.abs(diff) / vTotalL;
        const ohMinus = computeStrongIon(cEx);
        pH = 14 + Math.log10(ohMinus);
        status = 'excess-base';
        statusDetailHTML = `[OH⁻] = ${formatSciHTML(cEx, 'M')}`;
        diluteWaterNote = cEx < 1e-6;
      }
    }
    // Case 2: Weak Acid + Strong Base
    else if (!isAcidStrong && isBaseStrong) {
      const Ka = acid.Ka;
      // Use equivalent concentrations so polyprotic acids neutralize cleanly at nH = nOH
      const cTot = nH / vTotalL;
      const cBase = nOH / vTotalL;

      pH = solveMonotonePH((ph) => {
        const H = Math.pow(10, -ph);
        const OH = KW / H;
        return H + cBase - OH - cTot * (Ka / (H + Ka));
      });

      if (Math.abs(diff) <= eps) {
        status = 'equiv-base-hydrolysis';
        statusDetailHTML = `C<sub>salt</sub> = ${formatSciHTML(cTot, 'M')}`;
      } else if (diff > 0) {
        status = 'buffer-acid';
        const ratio = cBase / Math.max(1e-18, cTot - cBase);
        statusDetailHTML = `C<sub>salt</sub>/C<sub>acid</sub> = ${ratio >= 100 ? ratio.toFixed(0) : ratio.toFixed(2)}`;
      } else {
        status = 'excess-base';
        statusDetailHTML = `[OH⁻]<sub>ex</sub> = ${formatSciHTML(cBase - cTot, 'M')}`;
      }
      if (pA > 1) extraNote = dict().phPolyproticNote;
    }
    // Case 3: Strong Acid + Weak Base
    else if (isAcidStrong && !isBaseStrong) {
      const Kb = base.Kb;
      const KaConj = KW / Kb;
      const cTot = nOH / vTotalL;
      const cAcid = nH / vTotalL;

      pH = solveMonotonePH((ph) => {
        const H = Math.pow(10, -ph);
        const OH = KW / H;
        return H + cTot * (H / (H + KaConj)) - OH - cAcid;
      });

      if (Math.abs(diff) <= eps) {
        status = 'equiv-acid-hydrolysis';
        statusDetailHTML = `C<sub>salt</sub> = ${formatSciHTML(cTot, 'M')}`;
      } else if (diff < 0) {
        status = 'buffer-base';
        const ratio = cAcid / Math.max(1e-18, cTot - cAcid);
        statusDetailHTML = `C<sub>salt</sub>/C<sub>base</sub> = ${ratio >= 100 ? ratio.toFixed(0) : ratio.toFixed(2)}`;
      } else {
        status = 'excess-acid';
        statusDetailHTML = `[H⁺]<sub>ex</sub> = ${formatSciHTML(cAcid - cTot, 'M')}`;
      }
    }
    // Case 4: Weak Acid + Weak Base
    else {
      const Ka = acid.Ka;
      const Kb = base.Kb;
      const KaConj = KW / Kb;
      const cA = nH / vTotalL;
      const cB = nOH / vTotalL;

      pH = solveMonotonePH((ph) => {
        const H = Math.pow(10, -ph);
        const OH = KW / H;
        return H + cB * (H / (H + KaConj)) - OH - cA * (Ka / (H + Ka));
      });

      status = 'weak-weak';
      statusDetailHTML = `pKa ${(-Math.log10(Ka)).toFixed(2)} · pKb ${(-Math.log10(Kb)).toFixed(2)}`;
      extraNote = dict().phWeakWeakNote;
    }

    const hPlus = Math.pow(10, -pH);
    const ohMinus = KW / hPlus;
    const pOH = 14 - pH;

    return {
      ok: true,
      acid,
      base,
      nH,
      nOH,
      vTotalMl,
      status,
      statusDetailHTML,
      pH,
      pOH,
      hPlus,
      ohMinus,
      diluteWaterNote,
      extraNote
    };
  }

  function classifyEnvironment(pH) {
    const d = dict();
    if (pH < 3) return { label: d.phEnvStrongAcid, cls: 'env-strong-acid' };
    if (pH < 6.8) return { label: d.phEnvWeakAcid, cls: 'env-weak-acid' };
    if (pH <= 7.2) return { label: d.phEnvNeutral, cls: 'env-neutral' };
    if (pH <= 11) return { label: d.phEnvWeakBase, cls: 'env-weak-base' };
    return { label: d.phEnvStrongBase, cls: 'env-strong-base' };
  }

  function renderPhDropdown(slotKey, query, filterRole) {
    const listEl =
      slotKey === 'ph-single'
        ? dom.phSingleDropdown
        : slotKey === 'ph-acid'
        ? dom.phAcidDropdown
        : dom.phBaseDropdown;
    if (!listEl) return;

    const matches = searchPhSubstances(query, filterRole);
    state.filteredPh = matches;
    const d = dict();
    const isEn = state.lang === 'en';

    if (matches.length === 0) {
      listEl.innerHTML = `<div class="lab-dropdown-empty">${escapeHTML(d.phNoDropdownMatch)}</div>`;
      state.highlightIndex = -1;
      return;
    }

    if (state.highlightIndex >= matches.length) {
      state.highlightIndex = 0;
    }

    listEl.innerHTML = matches
      .slice(0, 40)
      .map((s, idx) => {
        const isHi = idx === state.highlightIndex;
        const nm = isEn ? s.nameEn : s.nameVi;
        const tag = getPhSubstanceTag(s);
        return `
          <button
            type="button"
            class="lab-option ph-opt-row ${isHi ? 'is-highlighted' : ''}"
            data-formula="${escapeHTML(s.formula)}"
            data-index="${idx}"
            role="option"
          >
            <span class="ph-opt-formula mono">${formatFormulaHTML(s.formula)}</span>
            <span class="ph-opt-name">${escapeHTML(nm)}</span>
            <span class="ph-opt-tag ${tag.cls}">${escapeHTML(tag.text)}</span>
          </button>
        `;
      })
      .join('');
  }

  function openPhDropdown(slotKey, filterRole) {
    closeDropdowns();
    state.openDropdown = slotKey;
    state.highlightIndex = 0;
    const inputEl =
      slotKey === 'ph-single'
        ? dom.phSingleInput
        : slotKey === 'ph-acid'
        ? dom.phAcidInput
        : dom.phBaseInput;
    const listEl =
      slotKey === 'ph-single'
        ? dom.phSingleDropdown
        : slotKey === 'ph-acid'
        ? dom.phAcidDropdown
        : dom.phBaseDropdown;
    if (!inputEl || !listEl) return;
    renderPhDropdown(slotKey, inputEl.value, filterRole);
    listEl.classList.remove('hidden');
  }

  function selectPhSubstance(slotKey, formula) {
    if (slotKey === 'ph-single') {
      state.phSingleText = formula;
      if (dom.phSingleInput) dom.phSingleInput.value = formula;
    } else if (slotKey === 'ph-acid') {
      state.phMixAcidText = formula;
      if (dom.phAcidInput) dom.phAcidInput.value = formula;
    } else if (slotKey === 'ph-base') {
      state.phMixBaseText = formula;
      if (dom.phBaseInput) dom.phBaseInput.value = formula;
    }
    closeDropdowns();
    renderPhTab();
  }

  function renderSubBadge(badgeEl, resolved, extraWarn = null) {
    if (!badgeEl) return;
    if (extraWarn) {
      badgeEl.className = 'ph-class-badge is-error';
      badgeEl.textContent = extraWarn;
      badgeEl.classList.remove('hidden');
      return;
    }
    const info = getClassificationBadge(resolved);
    if (!info) {
      badgeEl.classList.add('hidden');
      badgeEl.textContent = '';
      return;
    }
    const nameStr =
      resolved.status === 'ok' && resolved.substance && !resolved.estimated
        ? `${state.lang === 'en' ? resolved.substance.nameEn : resolved.substance.nameVi} — `
        : '';
    badgeEl.className = `ph-class-badge ${info.cls}`;
    badgeEl.textContent = `${nameStr}${info.text}`;
    badgeEl.classList.remove('hidden');
  }

  function renderPhQuickControls() {
    const d = dict();
    if (dom.phConcPresets) {
      dom.phConcPresets.innerHTML = CONC_QUICK_PRESETS.map((p) => {
        const isAct = state.phSingleValid && Math.abs(state.phSingleConc - p.val) <= p.val * 1e-6;
        return `<button type="button" class="tools-ph-chip ${isAct ? 'active' : ''}" data-conc="${p.val}">${p.label}</button>`;
      }).join('');
    }

    if (dom.phMixPresets) {
      const aNorm = normalizeFormulaInput(state.phMixAcidText).replace(/\s+/g, '').toLowerCase();
      const bNorm = normalizeFormulaInput(state.phMixBaseText).replace(/\s+/g, '').toLowerCase();
      dom.phMixPresets.innerHTML = MIX_PRESETS.map((p) => {
        const isAct =
          aNorm === p.acid.toLowerCase() &&
          bNorm === p.base.toLowerCase() &&
          Math.abs(state.phMixC1 - p.c1) < 1e-9 &&
          Math.abs(state.phMixV1 - p.v1) < 1e-9 &&
          Math.abs(state.phMixC2 - p.c2) < 1e-9 &&
          Math.abs(state.phMixV2 - p.v2) < 1e-9;
        return `<button type="button" class="tools-ph-chip ${isAct ? 'active' : ''}" data-mix-preset="${p.key}">${escapeHTML(d.phMixPresetLabels[p.key])}</button>`;
      }).join('');
    }
  }

  function renderPhResults(res) {
    const d = dict();
    const clampedPh = Math.max(0, Math.min(14, res.pH));
    const markerPct = (clampedPh / 14) * 100;
    const env = classifyEnvironment(res.pH);

    if (dom.phBigVal) dom.phBigVal.textContent = res.pH.toFixed(2);
    if (dom.phEnvBadge) {
      dom.phEnvBadge.textContent = env.label;
      dom.phEnvBadge.className = `ph-env-badge ${env.cls}`;
    }
    if (dom.phPohVal) dom.phPohVal.textContent = res.pOH.toFixed(2);
    if (dom.phHVal) dom.phHVal.innerHTML = formatSciHTML(res.hPlus, 'M');
    if (dom.phOhVal) dom.phOhVal.innerHTML = formatSciHTML(res.ohMinus, 'M');

    if (dom.phNeedle) dom.phNeedle.style.left = `${markerPct.toFixed(2)}%`;
    if (dom.phNeedleTag) dom.phNeedleTag.textContent = res.pH.toFixed(2);

    const noteParts = [];
    if (res.diluteWaterNote) noteParts.push(d.phWaterNote);
    if (res.extraNote) noteParts.push(res.extraNote);
    if (dom.phWaterNote) {
      dom.phWaterNote.classList.toggle('hidden', noteParts.length === 0);
      dom.phWaterNote.textContent = noteParts.join(' ');
    }

    // Litmus: Red (pH < 6), Purple (6..8), Blue (pH > 8)
    let litmusCls = 'litmus-purple';
    let litmusState = d.phLitmusPurple;
    if (res.pH < 6) {
      litmusCls = 'litmus-red';
      litmusState = d.phLitmusRed;
    } else if (res.pH > 8) {
      litmusCls = 'litmus-blue';
      litmusState = d.phLitmusBlue;
    }
    if (dom.phLitmusSwatch) dom.phLitmusSwatch.className = `ph-ind-swatch ${litmusCls}`;
    if (dom.phLitmusState) dom.phLitmusState.textContent = litmusState;

    // Phenolphthalein: Colorless (pH < 8.2), Pale Pink (8.2..10), Deep Pink (pH >= 10)
    let phenolCls = 'phenol-clear';
    let phenolState = d.phPhenolClear;
    if (res.pH >= 10) {
      phenolCls = 'phenol-deep';
      phenolState = d.phPhenolDeep;
    } else if (res.pH >= 8.2) {
      phenolCls = 'phenol-light';
      phenolState = d.phPhenolLight;
    }
    if (dom.phPhenolSwatch) dom.phPhenolSwatch.className = `ph-ind-swatch ${phenolCls}`;
    if (dom.phPhenolState) dom.phPhenolState.textContent = phenolState;
  }

  function renderPhTab() {
    if (!dom.phResultCard) return;
    const d = dict();
    const isSingle = state.phMode === 'single';

    if (dom.phModeBtns) {
      dom.phModeBtns.forEach((btn) => {
        const active = btn.dataset.phMode === state.phMode;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    }
    if (dom.phSingleControls) dom.phSingleControls.classList.toggle('hidden', !isSingle);
    if (dom.phMixControls) dom.phMixControls.classList.toggle('hidden', isSingle);
    if (dom.phStoichCard) dom.phStoichCard.classList.toggle('hidden', isSingle);

    renderPhQuickControls();

    if (isSingle) {
      const resolved = resolvePhSubstance(state.phSingleText);
      renderSubBadge(dom.phSingleBadge, resolved);

      if (resolved.status !== 'ok') {
        if (dom.phErrorBox) {
          dom.phErrorBox.classList.remove('hidden');
          dom.phErrorText.textContent = resolved.error || d.phEmptySubstance;
        }
        dom.phResultCard.classList.add('hidden');
        return;
      }

      if (!state.phSingleValid) {
        if (dom.phErrorBox) {
          dom.phErrorBox.classList.remove('hidden');
          dom.phErrorText.textContent = d.phConcInvalid;
        }
        dom.phResultCard.classList.add('hidden');
        return;
      }

      if (dom.phErrorBox) dom.phErrorBox.classList.add('hidden');
      dom.phResultCard.classList.remove('hidden');

      const res = computeSinglePH(resolved.substance, state.phSingleConc);
      renderPhResults(res);
    } else {
      const resAcid = resolvePhSubstance(state.phMixAcidText);
      const resBase = resolvePhSubstance(state.phMixBaseText);

      let acidWarn = null;
      let baseWarn = null;

      if (resAcid.status === 'ok') {
        if (resAcid.substance.role === 'base') acidWarn = d.phWrongAcidGotBase(resAcid.substance.formula);
        else if (resAcid.substance.role !== 'acid') acidWarn = d.phWrongAcidGotSalt(resAcid.substance.formula);
      }
      if (resBase.status === 'ok') {
        if (resBase.substance.role === 'acid') baseWarn = d.phWrongBaseGotAcid(resBase.substance.formula);
        else if (resBase.substance.role !== 'base') baseWarn = d.phWrongBaseGotSalt(resBase.substance.formula);
      }

      renderSubBadge(dom.phAcidBadge, resAcid, acidWarn);
      renderSubBadge(dom.phBaseBadge, resBase, baseWarn);

      const errMessages = [];
      if (acidWarn) errMessages.push(acidWarn);
      else if (resAcid.status !== 'ok') errMessages.push(resAcid.error);

      if (baseWarn) errMessages.push(baseWarn);
      else if (resBase.status !== 'ok') errMessages.push(resBase.error);

      if (!state.phMixValid) errMessages.push(d.phMixInvalid);

      if (errMessages.length > 0) {
        if (dom.phErrorBox) {
          dom.phErrorBox.classList.remove('hidden');
          dom.phErrorText.textContent = errMessages[0] || d.phMixNeedBoth;
        }
        dom.phResultCard.classList.add('hidden');
        if (dom.phStoichCard) dom.phStoichCard.classList.add('hidden');
        return;
      }

      if (dom.phErrorBox) dom.phErrorBox.classList.add('hidden');
      dom.phResultCard.classList.remove('hidden');
      if (dom.phStoichCard) dom.phStoichCard.classList.remove('hidden');

      const res = computeMixPH(
        resAcid.substance,
        state.phMixC1,
        state.phMixV1,
        resBase.substance,
        state.phMixC2,
        state.phMixV2
      );

      if (dom.phStoichNH) dom.phStoichNH.innerHTML = formatMoles(res.nH);
      if (dom.phStoichNOH) dom.phStoichNOH.innerHTML = formatMoles(res.nOH);
      if (dom.phStoichVTotal) {
        const vText = Number(res.vTotalMl.toFixed(2)).toString();
        dom.phStoichVTotal.textContent = `${vText} mL`;
      }
      if (dom.phStoichExcessConc) {
        dom.phStoichExcessConc.innerHTML = res.statusDetailHTML;
      }
      if (dom.phStoichStatus) {
        const mapStatus = {
          'neutral': { text: d.phEquivalence, cls: 'is-neutral' },
          'excess-acid': { text: d.phExcessAcid(res.acid.formula), cls: 'is-acid' },
          'excess-base': { text: d.phExcessBase(res.base.formula), cls: 'is-base' },
          'buffer-acid': { text: d.phBufferAcid(res.acid.formula), cls: 'is-acid' },
          'buffer-base': { text: d.phBufferBase(res.base.formula), cls: 'is-base' },
          'equiv-base-hydrolysis': { text: d.phEquivBaseHydrolysis, cls: 'is-base' },
          'equiv-acid-hydrolysis': { text: d.phEquivAcidHydrolysis, cls: 'is-acid' },
          'weak-weak': { text: d.phWeakWeakStatus, cls: 'is-neutral' }
        };
        const st = mapStatus[res.status] || mapStatus.neutral;
        dom.phStoichStatus.textContent = st.text;
        dom.phStoichStatus.className = `ph-stoich-status ${st.cls}`;
      }

      renderPhResults(res);
    }
  }

  // =========================================================================
  // TAB SWITCHING & LANGUAGE SYNCHRONIZATION
  // =========================================================================
  function switchTab(tabId) {
    if (tabId !== 'molar' && tabId !== 'compare' && tabId !== 'ph') return;
    closeDropdowns();
    state.activeTab = tabId;

    if (dom.tabBtns) {
      dom.tabBtns.forEach((btn) => {
        const isActive = btn.dataset.toolsTab === tabId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });
    }

    if (dom.panelMolar) dom.panelMolar.classList.toggle('hidden', tabId !== 'molar');
    if (dom.panelCompare) dom.panelCompare.classList.toggle('hidden', tabId !== 'compare');
    if (dom.panelPh) dom.panelPh.classList.toggle('hidden', tabId !== 'ph');

    if (dom.footerHint) {
      dom.footerHint.textContent = dict().footerHints[tabId] || '';
    }

    if (dom.body) {
      dom.body.scrollTop = 0;
    }

    if (tabId === 'molar') renderMolarTab();
    else if (tabId === 'compare') renderCompareTab();
    else if (tabId === 'ph') renderPhTab();
  }

  function applyLanguage() {
    if (!dom.modal) return;
    const d = dict();

    dom.modal.querySelectorAll('[data-i18n-tools]').forEach((node) => {
      const key = node.dataset.i18nTools;
      if (typeof d[key] === 'string') {
        node.textContent = d[key];
      }
    });

    if (dom.molarInput) dom.molarInput.placeholder = d.molarPlaceholder;
    if (dom.molarClear) dom.molarClear.title = d.molarClearTitle;
    if (dom.molarHighlightBtn) dom.molarHighlightBtn.title = d.molarHighlightTitle;

    if (dom.cmpSearchA) dom.cmpSearchA.placeholder = d.cmpSearchA;
    if (dom.cmpSearchB) dom.cmpSearchB.placeholder = d.cmpSearchB;
    if (dom.cmpSwapBtn) dom.cmpSwapBtn.title = d.cmpSwapTitle;

    if (dom.phSingleInput) dom.phSingleInput.placeholder = d.phSinglePlaceholder;
    if (dom.phAcidInput) dom.phAcidInput.placeholder = d.phAcidPlaceholder;
    if (dom.phBaseInput) dom.phBaseInput.placeholder = d.phBasePlaceholder;

    if (dom.footerHint) {
      dom.footerHint.textContent = d.footerHints[state.activeTab] || '';
    }

    renderMolarTab();
    renderCompareTab();
    renderPhTab();

    if (state.openDropdown === 'a' || state.openDropdown === 'b') {
      const inputEl = state.openDropdown === 'a' ? dom.cmpSearchA : dom.cmpSearchB;
      renderCompareDropdown(state.openDropdown, inputEl ? inputEl.value : '');
    } else if (state.openDropdown === 'ph-single') {
      renderPhDropdown('ph-single', dom.phSingleInput ? dom.phSingleInput.value : '', 'all');
    } else if (state.openDropdown === 'ph-acid') {
      renderPhDropdown('ph-acid', dom.phAcidInput ? dom.phAcidInput.value : '', 'acid');
    } else if (state.openDropdown === 'ph-base') {
      renderPhDropdown('ph-base', dom.phBaseInput ? dom.phBaseInput.value : '', 'base');
    }
  }

  // =========================================================================
  // EVENT BINDING & LIFECYCLE
  // =========================================================================
  function bindComparePicker(slot, inputEl, dropdownEl) {
    if (!inputEl || !dropdownEl) return;

    inputEl.addEventListener('focus', () => openCompareDropdown(slot));
    inputEl.addEventListener('click', () => openCompareDropdown(slot));
    inputEl.addEventListener('input', () => {
      state.openDropdown = slot;
      state.highlightIndex = 0;
      renderCompareDropdown(slot, inputEl.value);
      dropdownEl.classList.remove('hidden');
    });

    inputEl.addEventListener('keydown', (e) => {
      const list = slot === 'a' ? state.filteredA : state.filteredB;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.openDropdown !== slot) {
          openCompareDropdown(slot);
        } else if (list.length > 0) {
          state.highlightIndex = (state.highlightIndex + 1) % list.length;
          renderCompareDropdown(slot, inputEl.value);
          const hi = dropdownEl.querySelector('.lab-option.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (list.length > 0) {
          state.highlightIndex = (state.highlightIndex - 1 + list.length) % list.length;
          renderCompareDropdown(slot, inputEl.value);
          const hi = dropdownEl.querySelector('.lab-option.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (list.length > 0) {
          const picked = list[Math.max(0, state.highlightIndex)] || list[0];
          selectCompareElement(slot, picked);
          inputEl.blur();
        }
      } else if (e.key === 'Escape') {
        if (state.openDropdown === slot) {
          e.stopPropagation();
          closeDropdowns();
        }
      }
    });

    dropdownEl.addEventListener('mousedown', (e) => {
      const opt = e.target.closest('.lab-option');
      if (!opt) return;
      e.preventDefault();
      const num = Number(opt.dataset.number);
      const found = (window.ELEMENTS || []).find((el) => el.number === num);
      if (found) {
        selectCompareElement(slot, found);
        inputEl.blur();
      }
    });
  }

  function bindPhSearchInput(slotKey, inputEl, dropdownEl, filterRole, onChangeText) {
    if (!inputEl || !dropdownEl) return;

    inputEl.addEventListener('focus', () => openPhDropdown(slotKey, filterRole));
    inputEl.addEventListener('click', () => openPhDropdown(slotKey, filterRole));
    inputEl.addEventListener('input', () => {
      onChangeText(inputEl.value);
      state.openDropdown = slotKey;
      state.highlightIndex = 0;
      renderPhDropdown(slotKey, inputEl.value, filterRole);
      dropdownEl.classList.remove('hidden');
      renderPhTab();
    });

    inputEl.addEventListener('keydown', (e) => {
      const list = state.filteredPh.slice(0, 40);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.openDropdown !== slotKey) {
          openPhDropdown(slotKey, filterRole);
        } else if (list.length > 0) {
          state.highlightIndex = (state.highlightIndex + 1) % list.length;
          renderPhDropdown(slotKey, inputEl.value, filterRole);
          const hi = dropdownEl.querySelector('.lab-option.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (list.length > 0) {
          state.highlightIndex = (state.highlightIndex - 1 + list.length) % list.length;
          renderPhDropdown(slotKey, inputEl.value, filterRole);
          const hi = dropdownEl.querySelector('.lab-option.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (state.openDropdown === slotKey && list.length > 0 && state.highlightIndex >= 0) {
          const picked = list[state.highlightIndex];
          if (picked) {
            selectPhSubstance(slotKey, picked.formula);
            inputEl.blur();
            return;
          }
        }
        closeDropdowns();
        renderPhTab();
      } else if (e.key === 'Escape') {
        if (state.openDropdown === slotKey) {
          e.stopPropagation();
          closeDropdowns();
        }
      }
    });

    dropdownEl.addEventListener('mousedown', (e) => {
      const opt = e.target.closest('.lab-option');
      if (!opt) return;
      e.preventDefault();
      if (opt.dataset.formula) {
        selectPhSubstance(slotKey, opt.dataset.formula);
        inputEl.blur();
      }
    });
  }

  function syncSingleConcFromValue(val, updateText = true) {
    state.phSingleConc = val;
    state.phSingleValid = true;
    if (updateText && dom.phConcInput) {
      state.phSingleInputText = formatConcForInput(val);
      dom.phConcInput.value = state.phSingleInputText;
    }
    if (dom.phConcSlider) {
      const logVal = Math.log10(Math.max(1e-9, val));
      const clampedLog = Math.max(-6, Math.min(0, logVal));
      dom.phConcSlider.value = clampedLog.toFixed(3);
    }
    renderPhTab();
  }

  function parseMixInputs() {
    const c1 = Number(dom.phMixC1 ? dom.phMixC1.value : state.phMixC1);
    const v1 = Number(dom.phMixV1 ? dom.phMixV1.value : state.phMixV1);
    const c2 = Number(dom.phMixC2 ? dom.phMixC2.value : state.phMixC2);
    const v2 = Number(dom.phMixV2 ? dom.phMixV2.value : state.phMixV2);

    const valid =
      Number.isFinite(c1) && c1 >= 0 && c1 <= 5 &&
      Number.isFinite(c2) && c2 >= 0 && c2 <= 5 &&
      Number.isFinite(v1) && v1 > 0 && v1 <= 100000 &&
      Number.isFinite(v2) && v2 > 0 && v2 <= 100000;

    state.phMixValid = valid;
    if (valid) {
      state.phMixC1 = c1;
      state.phMixV1 = v1;
      state.phMixC2 = c2;
      state.phMixV2 = v2;
    }
    renderPhTab();
  }

  function init(opts = {}) {
    callbacks = {
      getLang: opts.getLang || (() => 'vi'),
      onOpen: opts.onOpen || (() => {}),
      onClose: opts.onClose || (() => {}),
      onHighlightElements: opts.onHighlightElements || (() => {})
    };

    dom = {
      modal: document.getElementById('tools-modal'),
      backdrop: document.getElementById('tools-backdrop'),
      dialog: document.getElementById('tools-dialog'),
      body: document.getElementById('tools-body'),
      btnClose: document.getElementById('btn-close-tools'),
      btnCloseFooter: document.getElementById('btn-close-tools-footer'),
      footerHint: document.getElementById('tools-footer-hint'),
      tabsWrap: document.getElementById('tools-tabs'),
      tabBtns: document.querySelectorAll('#tools-tabs .tools-tab-btn'),
      panelMolar: document.getElementById('tools-panel-molar'),
      panelCompare: document.getElementById('tools-panel-compare'),
      panelPh: document.getElementById('tools-panel-ph'),

      // Tab 1: Molar
      molarPresets: document.getElementById('tools-molar-presets'),
      molarInput: document.getElementById('tools-molar-input'),
      molarClear: document.getElementById('tools-molar-clear'),
      molarError: document.getElementById('tools-molar-error'),
      molarErrorText: document.getElementById('tools-molar-error-text'),
      molarEmpty: document.getElementById('tools-molar-empty'),
      molarResultWrap: document.getElementById('tools-molar-result'),
      molarFormulaDisplay: document.getElementById('tools-molar-formula'),
      molarTotalVal: document.getElementById('tools-molar-total'),
      molarTotalMeta: document.getElementById('tools-molar-meta'),
      molarPctBar: document.getElementById('tools-molar-bar'),
      molarTbody: document.getElementById('tools-molar-tbody'),
      molarSyntheticNote: document.getElementById('tools-molar-synthetic'),
      molarHighlightBtn: document.getElementById('btn-tools-molar-highlight'),

      // Tab 2: Compare
      cmpPresets: document.getElementById('tools-cmp-presets'),
      cmpPickerA: document.getElementById('tools-cmp-picker-a'),
      cmpPickerB: document.getElementById('tools-cmp-picker-b'),
      cmpSearchA: document.getElementById('tools-cmp-search-a'),
      cmpSearchB: document.getElementById('tools-cmp-search-b'),
      cmpDropdownA: document.getElementById('tools-cmp-dropdown-a'),
      cmpDropdownB: document.getElementById('tools-cmp-dropdown-b'),
      cmpPreviewA: document.getElementById('tools-cmp-preview-a'),
      cmpPreviewB: document.getElementById('tools-cmp-preview-b'),
      cmpSwapBtn: document.getElementById('tools-cmp-swap'),
      cmpHeadA: document.getElementById('tools-cmp-head-a'),
      cmpHeadB: document.getElementById('tools-cmp-head-b'),
      cmpRows: document.getElementById('tools-cmp-rows'),
      cmpTempNote: document.getElementById('tools-cmp-temp-note'),

      // Tab 3: pH Meter
      phModeBtns: document.querySelectorAll('#tools-ph-modes .tools-ph-mode-btn'),
      phSingleControls: document.getElementById('tools-ph-single'),
      phMixControls: document.getElementById('tools-ph-mix'),
      phSingleInput: document.getElementById('tools-ph-single-input'),
      phSingleDropdown: document.getElementById('tools-ph-single-dropdown'),
      phSingleBadge: document.getElementById('tools-ph-single-badge'),
      phConcSlider: document.getElementById('tools-ph-slider'),
      phConcInput: document.getElementById('tools-ph-conc-input'),
      phConcPresets: document.getElementById('tools-ph-conc-presets'),
      phMixPresets: document.getElementById('tools-ph-mix-presets'),
      phAcidInput: document.getElementById('tools-ph-acid-input'),
      phAcidDropdown: document.getElementById('tools-ph-acid-dropdown'),
      phAcidBadge: document.getElementById('tools-ph-acid-badge'),
      phMixC1: document.getElementById('tools-ph-c1'),
      phMixV1: document.getElementById('tools-ph-v1'),
      phBaseInput: document.getElementById('tools-ph-base-input'),
      phBaseDropdown: document.getElementById('tools-ph-base-dropdown'),
      phBaseBadge: document.getElementById('tools-ph-base-badge'),
      phMixC2: document.getElementById('tools-ph-c2'),
      phMixV2: document.getElementById('tools-ph-v2'),
      phErrorBox: document.getElementById('tools-ph-error'),
      phErrorText: document.getElementById('tools-ph-error-text'),
      phStoichCard: document.getElementById('tools-ph-stoich'),
      phStoichNH: document.getElementById('tools-ph-nh'),
      phStoichNOH: document.getElementById('tools-ph-noh'),
      phStoichVTotal: document.getElementById('tools-ph-vtotal'),
      phStoichExcessConc: document.getElementById('tools-ph-excess-conc'),
      phStoichStatus: document.getElementById('tools-ph-stoich-status'),
      phResultCard: document.getElementById('tools-ph-result'),
      phBigVal: document.getElementById('tools-ph-big-val'),
      phEnvBadge: document.getElementById('tools-ph-env-badge'),
      phPohVal: document.getElementById('tools-ph-poh-val'),
      phHVal: document.getElementById('tools-ph-h-val'),
      phOhVal: document.getElementById('tools-ph-oh-val'),
      phNeedle: document.getElementById('tools-ph-needle'),
      phNeedleTag: document.getElementById('tools-ph-needle-tag'),
      phWaterNote: document.getElementById('tools-ph-water-note'),
      phLitmusSwatch: document.getElementById('tools-ph-litmus-swatch'),
      phLitmusState: document.getElementById('tools-ph-litmus-state'),
      phPhenolSwatch: document.getElementById('tools-ph-phenol-swatch'),
      phPhenolState: document.getElementById('tools-ph-phenol-state')
    };

    if (!dom.modal) return;

    state.lang = callbacks.getLang();
    state.elA = findBySymbol('Fe');
    state.elB = findBySymbol('Cu');

    // Sync initial inputs
    if (dom.molarInput) dom.molarInput.value = state.molarInput;
    if (dom.phSingleInput) dom.phSingleInput.value = state.phSingleText;
    if (dom.phConcInput) dom.phConcInput.value = state.phSingleInputText;
    if (dom.phConcSlider) dom.phConcSlider.value = String(Math.log10(state.phSingleConc));
    if (dom.phAcidInput) dom.phAcidInput.value = state.phMixAcidText;
    if (dom.phBaseInput) dom.phBaseInput.value = state.phMixBaseText;
    if (dom.phMixC1) dom.phMixC1.value = String(state.phMixC1);
    if (dom.phMixV1) dom.phMixV1.value = String(state.phMixV1);
    if (dom.phMixC2) dom.phMixC2.value = String(state.phMixC2);
    if (dom.phMixV2) dom.phMixV2.value = String(state.phMixV2);

    // Modal close handlers
    dom.btnClose.addEventListener('click', close);
    dom.btnCloseFooter.addEventListener('click', close);
    dom.backdrop.addEventListener('click', close);

    // Close open dropdowns when clicking outside their wrap
    dom.modal.addEventListener('click', (e) => {
      if (
        state.openDropdown &&
        !e.target.closest('#tools-panel-compare .lab-search-wrap') &&
        !e.target.closest('#tools-panel-ph .ph-search-wrap')
      ) {
        closeDropdowns();
      }
    });

    // Main 3-Tab Switcher
    if (dom.tabsWrap) {
      dom.tabsWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.tools-tab-btn');
        if (!btn) return;
        switchTab(btn.dataset.toolsTab);
      });
    }

    // ---- TAB 1 EVENTS ----
    if (dom.molarInput) {
      dom.molarInput.addEventListener('input', () => {
        state.molarInput = dom.molarInput.value;
        renderMolarTab();
      });
    }
    if (dom.molarClear) {
      dom.molarClear.addEventListener('click', () => {
        state.molarInput = '';
        dom.molarInput.value = '';
        renderMolarTab();
        dom.molarInput.focus();
      });
    }
    if (dom.molarPresets) {
      dom.molarPresets.addEventListener('click', (e) => {
        const chip = e.target.closest('.molar-preset-chip');
        if (!chip) return;
        state.molarInput = chip.dataset.formula;
        dom.molarInput.value = state.molarInput;
        renderMolarTab();
        dom.molarInput.focus();
      });
    }
    if (dom.molarHighlightBtn) {
      dom.molarHighlightBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!state.molarResult || !state.molarResult.ok) return;
        const atomicNumbers = state.molarResult.items.map((item) => item.el.number);
        const symbols = state.molarResult.items.map((item) => item.el.symbol);
        const formattedHtml = state.molarResult.formattedHtml;
        close();
        callbacks.onHighlightElements({
          atomicNumbers,
          symbols,
          formattedHtml
        });
      });
    }

    // ---- TAB 2 EVENTS ----
    bindComparePicker('a', dom.cmpSearchA, dom.cmpDropdownA);
    bindComparePicker('b', dom.cmpSearchB, dom.cmpDropdownB);

    if (dom.cmpSwapBtn) {
      dom.cmpSwapBtn.addEventListener('click', () => {
        const tmp = state.elA;
        state.elA = state.elB;
        state.elB = tmp;
        closeDropdowns();
        renderCompareTab();
      });
    }
    if (dom.cmpPresets) {
      dom.cmpPresets.addEventListener('click', (e) => {
        const chip = e.target.closest('.lab-preset-chip');
        if (!chip) return;
        state.elA = findBySymbol(chip.dataset.a);
        state.elB = findBySymbol(chip.dataset.b);
        closeDropdowns();
        renderCompareTab();
      });
    }

    // ---- TAB 3 EVENTS ----
    if (dom.phModeBtns) {
      dom.phModeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const nextMode = btn.dataset.phMode;
          if (nextMode !== 'single' && nextMode !== 'mix') return;
          closeDropdowns();
          state.phMode = nextMode;
          renderPhTab();
        });
      });
    }

    bindPhSearchInput('ph-single', dom.phSingleInput, dom.phSingleDropdown, 'all', (val) => {
      state.phSingleText = val;
    });
    bindPhSearchInput('ph-acid', dom.phAcidInput, dom.phAcidDropdown, 'acid', (val) => {
      state.phMixAcidText = val;
    });
    bindPhSearchInput('ph-base', dom.phBaseInput, dom.phBaseDropdown, 'base', (val) => {
      state.phMixBaseText = val;
    });

    if (dom.phConcSlider) {
      dom.phConcSlider.addEventListener('input', () => {
        const exp = Number(dom.phConcSlider.value);
        if (!Number.isFinite(exp)) return;
        const rawVal = Math.pow(10, exp);
        const val = Number(rawVal.toPrecision(3));
        syncSingleConcFromValue(val, true);
      });
    }

    if (dom.phConcInput) {
      dom.phConcInput.addEventListener('input', () => {
        const rawStr = dom.phConcInput.value.trim().replace(',', '.');
        state.phSingleInputText = rawStr;
        const parsed = Number(rawStr);
        if (!rawStr || !Number.isFinite(parsed) || parsed < 1e-9 || parsed > 2) {
          state.phSingleValid = false;
          renderPhTab();
          return;
        }
        syncSingleConcFromValue(parsed, false);
      });
    }

    if (dom.phConcPresets) {
      dom.phConcPresets.addEventListener('click', (e) => {
        const chip = e.target.closest('.tools-ph-chip');
        if (!chip) return;
        const val = Number(chip.dataset.conc);
        if (Number.isFinite(val)) {
          syncSingleConcFromValue(val, true);
        }
      });
    }

    [dom.phMixC1, dom.phMixV1, dom.phMixC2, dom.phMixV2].forEach((inp) => {
      if (inp) inp.addEventListener('input', parseMixInputs);
    });

    if (dom.phMixPresets) {
      dom.phMixPresets.addEventListener('click', (e) => {
        const chip = e.target.closest('.tools-ph-chip');
        if (!chip) return;
        const preset = MIX_PRESETS.find((p) => p.key === chip.dataset.mixPreset);
        if (!preset) return;
        state.phMixAcidText = preset.acid;
        state.phMixC1 = preset.c1;
        state.phMixV1 = preset.v1;
        state.phMixBaseText = preset.base;
        state.phMixC2 = preset.c2;
        state.phMixV2 = preset.v2;
        state.phMixValid = true;
        if (dom.phAcidInput) dom.phAcidInput.value = preset.acid;
        if (dom.phBaseInput) dom.phBaseInput.value = preset.base;
        if (dom.phMixC1) dom.phMixC1.value = String(preset.c1);
        if (dom.phMixV1) dom.phMixV1.value = String(preset.v1);
        if (dom.phMixC2) dom.phMixC2.value = String(preset.c2);
        if (dom.phMixV2) dom.phMixV2.value = String(preset.v2);
        closeDropdowns();
        renderPhTab();
      });
    }

    applyLanguage();
    switchTab('molar');
  }

  function open(tabId) {
    if (!dom.modal) return;
    state.lang = callbacks.getLang();
    state.isOpen = true;
    applyLanguage();
    if (tabId === 'molar' || tabId === 'compare' || tabId === 'ph') {
      switchTab(tabId);
    }
    dom.modal.classList.remove('hidden');
    callbacks.onOpen();
  }

  function openCompare(elA, elB) {
    if (elA) state.elA = elA;
    if (elB) state.elB = elB;
    open('compare');
  }

  function close() {
    if (!dom.modal || !state.isOpen) return;
    closeDropdowns();
    state.isOpen = false;
    dom.modal.classList.add('hidden');
    callbacks.onClose();
  }

  function isOpen() {
    return state.isOpen;
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    state.lang = lang;
    applyLanguage();
  }

  window.ChemTools = {
    init,
    open,
    openCompare,
    close,
    isOpen,
    setLang,
    switchTab,
    hasOpenDropdown,
    closeDropdowns,
    parseChemicalFormula,
    resolvePhSubstance,
    computeSinglePH,
    computeMixPH
  };
})();
