// Interactive Periodic Table — Chemical Reactions Lab (reactions.js)
// Features:
// 1. 3-Step Formula Analyzer & Validator (Syntax/Elements, Noble Gas Block, Charge Neutrality + Criss-Cross Suggestions)
// 2. Exact BigInt Rational Equation Balancer (Gaussian Elimination -> RREF -> Null Space + Atom Verification)
// 3. 3-Tier Reaction Inference Engine (Tier 1: ~55 Curated Classic/Redox/3-Reactant Reactions,
//    Tier 2: Rule-Based Inorganic Chemistry Engine, Tier 3: 3-Reactant Pairwise Fallback with Spectator Detection)
// 4. Tab 2 UI Controller integrated with window.BondingLab, bilingual VI/EN, autocomplete dropdown (~88 substances)

(function () {
  'use strict';

  const SUBSCRIPT_TO_ASCII = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
  };

  const NOBLE_GASES = new Set(['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og']);
  const NOBLE_WHITELIST = new Set(['XeF2', 'XeF4', 'XeF6', 'KrF2']);

  const DIATOMIC_ELEMENTS = {
    H: 'H2', O: 'O2', N: 'N2', F: 'F2', Cl: 'Cl2', Br: 'Br2', I: 'I2'
  };

  const ELEMENTAL_WHITELIST = new Set([
    'H2', 'O2', 'O3', 'N2', 'F2', 'Cl2', 'Br2', 'I2',
    'S', 'S8', 'P', 'P4', 'C', 'Si', 'B', 'As', 'Se', 'Te', 'Ge', 'Sb',
    'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og'
  ]);

  // Direct whitelist for valid covalent compounds, special/mixed oxides, peroxides, carbides,
  // acids, acid salts, oxosalts, complexes, and organic molecules
  const FORMULA_WHITELIST = new Set([
    // Elemental
    ...ELEMENTAL_WHITELIST,
    // Noble rare
    ...NOBLE_WHITELIST,
    // Water, hydrides, covalent binary/ternary
    'H2O', 'H2O2', 'NH3', 'NH4OH', 'N2H4', 'PH3', 'AsH3', 'SiH4', 'B2H6',
    'CS2', 'CCl4', 'CHCl3', 'CH2Cl2', 'CH3Cl', 'SF6', 'SF4', 'PCl3', 'PCl5', 'SiCl4',
    'SOCl2', 'COCl2', 'HCN', 'ICl', 'IBr', 'BrF3', 'ClF3', 'OF2',
    // Organic compounds
    'CH4', 'C2H6', 'C3H8', 'C4H10', 'C5H12', 'C6H14',
    'C2H4', 'C3H6', 'C4H8', 'C2H2', 'C3H4', 'C6H6', 'C7H8',
    'CH3OH', 'C2H5OH', 'C3H7OH', 'C2H4(OH)2', 'C3H5(OH)3',
    'HCHO', 'CH3CHO', 'HCOOH', 'CH3COOH', 'C2H5COOH', '(COOH)2', 'C2H2O4',
    'CH3COOC2H5', 'HCOOCH3', 'C6H12O6', 'C12H22O11', 'C6H5OH', 'C6H5NH2', 'CO(NH2)2', 'CH3NH2',
    // Nonmetal oxides, mixed oxides, peroxides, superoxides, carbides, sulfides
    'CO', 'CO2', 'NO', 'NO2', 'N2O', 'N2O3', 'N2O4', 'N2O5',
    'SO2', 'SO3', 'P2O3', 'P2O5', 'P4O10', 'P4O6', 'SiO2', 'B2O3', 'As2O3', 'As2O5',
    'Cl2O', 'ClO2', 'Cl2O7', 'I2O5',
    'Fe3O4', 'Pb3O4', 'Mn3O4', 'FeS2', 'MnO2', 'Mn2O7', 'CrO3', 'Cr2O3', 'V2O5', 'TiO2', 'SnO2', 'PbO2',
    'Na2O2', 'K2O2', 'BaO2', 'KO2', 'NaO2', 'CaC2', 'Al4C3', 'SiC', 'Ca3P2', 'Mg3N2', 'Li3N', 'BN', 'AlN',
    'Cu2O', 'Cu2S', 'Cu2Cl2', 'Hg2Cl2', 'Ag2O', 'Ag2S', 'CrO', 'FeO', 'Fe2O3', 'CuO',
    // Common acids
    'HCl', 'HBr', 'HI', 'HF', 'H2S', 'H2SO4', 'H2SO3', 'HNO3', 'HNO2',
    'H3PO4', 'H3PO3', 'H3PO2', 'H2CO3', 'H2SiO3', 'H3BO3',
    'HClO', 'HClO2', 'HClO3', 'HClO4', 'H2CrO4', 'H2Cr2O7', 'HMnO4',
    // Common oxosalts, acid salts, aluminates, zincates, complexes
    'KMnO4', 'NaMnO4', 'K2MnO4', 'K2Cr2O7', 'Na2Cr2O7', 'K2CrO4', 'Na2CrO4', 'Cr2(SO4)3',
    'KClO3', 'NaClO3', 'KClO4', 'KClO', 'NaClO', 'Ca(ClO)2', 'CaOCl2',
    'Na2S2O3', 'Na2SiO3', 'K2SiO3', 'NaAlO2', 'KAlO2', 'Na2ZnO2', 'K2ZnO2', 'Na2PbO2',
    'Na2[Zn(OH)4]', 'K2[Zn(OH)4]', 'Na[Al(OH)4]', 'K[Al(OH)4]',
    'NaHCO3', 'KHCO3', 'Ca(HCO3)2', 'Mg(HCO3)2', 'Ba(HCO3)2', 'NH4HCO3', 'Fe(HCO3)2',
    'KHSO4', 'NaHSO4', 'NaHSO3', 'KHSO3', 'Ca(HSO3)2', 'Ba(HSO3)2',
    'NaH2PO4', 'Na2HPO4', 'KH2PO4', 'K2HPO4', 'Ca(H2PO4)2', 'CaHPO4', '(NH4)2HPO4', 'NH4H2PO4',
    'NaHS', 'KHS', 'KSCN', 'NaSCN', 'Fe(SCN)3', 'KCN', 'NaCN',
    'CH3COONa', 'CH3COOK', 'CH3COOAg', 'CH3COONH4', '(CH3COO)2Ca', '(CH3COO)2Cu', '(CH3COO)2Pb', '(CH3COO)2Zn', '(CH3COO)2Ba', '(CH3COO)2Mg'
  ]);

  // Known anions ordered from longest/polyatomic to monoatomic for unambiguous splitting
  const ANION_LIST = [
    { formula: 'CH3COO', charge: -1, polyatomic: true, nameVi: 'axetat', nameEn: 'acetate' },
    { formula: 'H2PO4', charge: -1, polyatomic: true, nameVi: 'đihiđrophotphat', nameEn: 'dihydrogen phosphate' },
    { formula: 'Cr2O7', charge: -2, polyatomic: true, nameVi: 'đicromat', nameEn: 'dichromate' },
    { formula: 'HCO3', charge: -1, polyatomic: true, nameVi: 'hiđrocacbonat', nameEn: 'bicarbonate' },
    { formula: 'HSO4', charge: -1, polyatomic: true, nameVi: 'hiđrosunfat', nameEn: 'bisulfate' },
    { formula: 'HSO3', charge: -1, polyatomic: true, nameVi: 'hiđrosunfit', nameEn: 'bisulfite' },
    { formula: 'HPO4', charge: -2, polyatomic: true, nameVi: 'hiđrophotphat', nameEn: 'hydrogen phosphate' },
    { formula: 'CrO4', charge: -2, polyatomic: true, nameVi: 'cromat', nameEn: 'chromate' },
    { formula: 'MnO4', charge: -1, polyatomic: true, nameVi: 'pemanganat', nameEn: 'permanganate' },
    { formula: 'ClO4', charge: -1, polyatomic: true, nameVi: 'peclorat', nameEn: 'perchlorate' },
    { formula: 'ClO3', charge: -1, polyatomic: true, nameVi: 'clorat', nameEn: 'chlorate' },
    { formula: 'ClO2', charge: -1, polyatomic: true, nameVi: 'clorit', nameEn: 'chlorite' },
    { formula: 'S2O3', charge: -2, polyatomic: true, nameVi: 'thiosunfat', nameEn: 'thiosulfate' },
    { formula: 'SiO3', charge: -2, polyatomic: true, nameVi: 'silicat', nameEn: 'silicate' },
    { formula: 'AlO2', charge: -1, polyatomic: true, nameVi: 'aluminat', nameEn: 'aluminate' },
    { formula: 'ZnO2', charge: -2, polyatomic: true, nameVi: 'zincat', nameEn: 'zincate' },
    { formula: 'SO4', charge: -2, polyatomic: true, nameVi: 'sunfat', nameEn: 'sulfate' },
    { formula: 'SO3', charge: -2, polyatomic: true, nameVi: 'sunfit', nameEn: 'sulfite' },
    { formula: 'CO3', charge: -2, polyatomic: true, nameVi: 'cacbonat', nameEn: 'carbonate' },
    { formula: 'PO4', charge: -3, polyatomic: true, nameVi: 'photphat', nameEn: 'phosphate' },
    { formula: 'NO3', charge: -1, polyatomic: true, nameVi: 'nitrat', nameEn: 'nitrate' },
    { formula: 'NO2', charge: -1, polyatomic: true, nameVi: 'nitrit', nameEn: 'nitrite' },
    { formula: 'ClO', charge: -1, polyatomic: true, nameVi: 'hipoclorit', nameEn: 'hypochlorite' },
    { formula: 'SCN', charge: -1, polyatomic: true, nameVi: 'thioxianat', nameEn: 'thiocyanate' },
    { formula: 'OH', charge: -1, polyatomic: true, nameVi: 'hiđroxit', nameEn: 'hydroxide' },
    { formula: 'CN', charge: -1, polyatomic: true, nameVi: 'xianua', nameEn: 'cyanide' },
    { formula: 'HS', charge: -1, polyatomic: true, nameVi: 'hiđrosunfua', nameEn: 'hydrosulfide' },
    { formula: 'Cl', charge: -1, polyatomic: false, nameVi: 'clorua', nameEn: 'chloride' },
    { formula: 'Br', charge: -1, polyatomic: false, nameVi: 'bromua', nameEn: 'bromide' },
    { formula: 'I', charge: -1, polyatomic: false, nameVi: 'iotua', nameEn: 'iodide' },
    { formula: 'F', charge: -1, polyatomic: false, nameVi: 'florua', nameEn: 'fluoride' },
    { formula: 'S', charge: -2, polyatomic: false, nameVi: 'sunfua', nameEn: 'sulfide' },
    { formula: 'O', charge: -2, polyatomic: false, nameVi: 'oxit', nameEn: 'oxide' },
    { formula: 'N', charge: -3, polyatomic: false, nameVi: 'nitrua', nameEn: 'nitride' },
    { formula: 'P', charge: -3, polyatomic: false, nameVi: 'photphua', nameEn: 'phosphide' },
    { formula: 'H', charge: -1, polyatomic: false, nameVi: 'hiđrua', nameEn: 'hydride' }
  ];

  const ANION_BY_FORMULA = new Map(ANION_LIST.map((a) => [a.formula, a]));

  // Reactivity / Activity Series (with full standard order + extended metals)
  const ACTIVITY_SERIES = [
    'Cs', 'Rb', 'K', 'Ba', 'Sr', 'Ca', 'Na', 'Li',
    'Mg', 'Al', 'Mn', 'Zn', 'Cr', 'Fe', 'Cd', 'Co', 'Ni', 'Sn', 'Pb',
    'H',
    'Cu', 'Hg', 'Ag', 'Pt', 'Au'
  ];

  const ALKALI_WATER_REACTIVE = new Set(['K', 'Ba', 'Ca', 'Na', 'Li', 'Rb', 'Cs', 'Sr']);

  // Standard single-displacement / ionic valence for metals when forming salts from elementary state
  const PRIMARY_METAL_VALENCE = {
    Li: 1, Na: 1, K: 1, Rb: 1, Cs: 1, Fr: 1, Ag: 1,
    Be: 2, Mg: 2, Ca: 2, Sr: 2, Ba: 2, Ra: 2,
    Zn: 2, Cd: 2, Fe: 2, Ni: 2, Co: 2, Sn: 2, Pb: 2, Cu: 2, Hg: 2, Mn: 2, Cr: 2,
    Al: 3, Ga: 3, In: 3, Sc: 3, Bi: 3, Au: 3,
    Ti: 4, Zr: 4
  };

  const ACIDIC_OXIDE_ANION = {
    CO2: 'CO3',
    SO2: 'SO3',
    SO3: 'SO4',
    P2O5: 'PO4',
    N2O5: 'NO3',
    SiO2: 'SiO3'
  };

  const SOLUBLE_BASIC_OXIDES = new Set(['Na2O', 'K2O', 'Li2O', 'CaO', 'BaO', 'SrO', 'Rb2O', 'Cs2O']);
  const AMPHOTERIC_OXIDES = new Set(['Al2O3', 'ZnO', 'Cr2O3', 'BeO', 'PbO', 'SnO']);
  const NEUTRAL_OXIDES = new Set(['CO', 'NO', 'N2O']);

  // Acid definitions (formula -> anion, hCount, strength, commonNonOxidizing)
  const ACID_DEFS = {
    HCl: { anion: 'Cl', hCount: 1, strong: true, commonNonOx: true },
    HBr: { anion: 'Br', hCount: 1, strong: true, commonNonOx: true },
    HI: { anion: 'I', hCount: 1, strong: true, commonNonOx: true },
    HF: { anion: 'F', hCount: 1, strong: false, commonNonOx: true },
    H2S: { anion: 'S', hCount: 2, strong: false, commonNonOx: false },
    H2SO4: { anion: 'SO4', hCount: 2, strong: true, commonNonOx: true },
    H2SO3: { anion: 'SO3', hCount: 2, strong: false, commonNonOx: false },
    HNO3: { anion: 'NO3', hCount: 1, strong: true, commonNonOx: false, oxidizing: true },
    HNO2: { anion: 'NO2', hCount: 1, strong: false, commonNonOx: false },
    H3PO4: { anion: 'PO4', hCount: 3, strong: false, commonNonOx: true },
    H2CO3: { anion: 'CO3', hCount: 2, strong: false, commonNonOx: false },
    H2SiO3: { anion: 'SiO3', hCount: 2, strong: false, commonNonOx: false, insoluble: true },
    HClO: { anion: 'ClO', hCount: 1, strong: false, commonNonOx: false },
    HClO3: { anion: 'ClO3', hCount: 1, strong: true, commonNonOx: false },
    HClO4: { anion: 'ClO4', hCount: 1, strong: true, commonNonOx: true },
    CH3COOH: { anion: 'CH3COO', hCount: 1, strong: false, commonNonOx: true }
  };

  // Acid strength rank for weak-acid displacement check
  const ACID_STRENGTH = {
    HClO4: 10, HI: 10, HBr: 10, HCl: 10, H2SO4: 10, HNO3: 10, HClO3: 9,
    H3PO4: 6, H2SO3: 5, HF: 5, HNO2: 4, CH3COOH: 3, H2CO3: 2, H2S: 1, HClO: 1, H2SiO3: 0
  };

  // 6 Quick-Click Preset Reactions (Inorganic + Optional Organic from reactions-organic-data.js)
  const ORGANIC_DATA = window.ORGANIC_REACTION_DATA || {};

  const REACTION_PRESETS = [
    ['HCl', 'NaOH'],
    ['Fe', 'H2SO4'],
    ['BaCl2', 'Na2SO4'],
    ['AgNO3', 'HCl'],
    ['Fe(OH)2', 'O2', 'H2O'],
    ['Al', 'NaOH', 'H2O']
  ];

  const ORGANIC_PRESETS = Array.isArray(ORGANIC_DATA.presets) ? ORGANIC_DATA.presets.slice() : [];

  // Merge organic whitelist formulas into FORMULA_WHITELIST
  if (Array.isArray(ORGANIC_DATA.whitelist)) {
    ORGANIC_DATA.whitelist.forEach((f) => FORMULA_WHITELIST.add(f));
  }

  // Curated Autocomplete Catalog (~88 common inorganic & organic substances)
  const COMMON_SUBSTANCES = [
    // Acids
    { formula: 'HCl', vi: 'Axit clohiđric', en: 'Hydrochloric acid', cat: 'acid', aliases: 'acid clohidric' },
    { formula: 'H2SO4', vi: 'Axit sunfuric', en: 'Sulfuric acid', cat: 'acid', aliases: 'acid sulfuric' },
    { formula: 'HNO3', vi: 'Axit nitric', en: 'Nitric acid', cat: 'acid', aliases: 'acid nitric' },
    { formula: 'H3PO4', vi: 'Axit photphoric', en: 'Phosphoric acid', cat: 'acid' },
    { formula: 'H2CO3', vi: 'Axit cacbonic', en: 'Carbonic acid', cat: 'acid' },
    { formula: 'H2SO3', vi: 'Axit sunfurơ', en: 'Sulfurous acid', cat: 'acid' },
    { formula: 'H2S', vi: 'Hiđro sunfua', en: 'Hydrogen sulfide', cat: 'acid' },
    { formula: 'HBr', vi: 'Axit bromhiđric', en: 'Hydrobromic acid', cat: 'acid' },
    { formula: 'HI', vi: 'Axit iothiđric', en: 'Hydroiodic acid', cat: 'acid' },
    { formula: 'HF', vi: 'Axit flohiđric', en: 'Hydrofluoric acid', cat: 'acid' },
    { formula: 'CH3COOH', vi: 'Axit axetic (Giấm)', en: 'Acetic acid', cat: 'organic', aliases: 'giam an vinegar' },
    // Bases
    { formula: 'NaOH', vi: 'Natri hiđroxit (Xút)', en: 'Sodium hydroxide', cat: 'base', aliases: 'xut kiem caustic soda' },
    { formula: 'KOH', vi: 'Kali hiđroxit', en: 'Potassium hydroxide', cat: 'base' },
    { formula: 'Ca(OH)2', vi: 'Canxi hiđroxit (Nước vôi trong)', en: 'Calcium hydroxide (Limewater)', cat: 'base', aliases: 'nuoc voi trong voi toi' },
    { formula: 'Ba(OH)2', vi: 'Bari hiđroxit', en: 'Barium hydroxide', cat: 'base' },
    { formula: 'Fe(OH)2', vi: 'Sắt(II) hiđroxit', en: 'Iron(II) hydroxide', cat: 'base' },
    { formula: 'Fe(OH)3', vi: 'Sắt(III) hiđroxit', en: 'Iron(III) hydroxide', cat: 'base' },
    { formula: 'Cu(OH)2', vi: 'Đồng(II) hiđroxit', en: 'Copper(II) hydroxide', cat: 'base' },
    { formula: 'Al(OH)3', vi: 'Nhôm hiđroxit', en: 'Aluminium hydroxide', cat: 'base' },
    { formula: 'Mg(OH)2', vi: 'Magie hiđroxit', en: 'Magnesium hydroxide', cat: 'base' },
    { formula: 'Zn(OH)2', vi: 'Kẽm hiđroxit', en: 'Zinc hydroxide', cat: 'base' },
    // Salts
    { formula: 'NaCl', vi: 'Natri clorua (Muối ăn)', en: 'Sodium chloride (Table salt)', cat: 'salt', aliases: 'muoi an' },
    { formula: 'BaCl2', vi: 'Bari clorua', en: 'Barium chloride', cat: 'salt' },
    { formula: 'Na2SO4', vi: 'Natri sunfat', en: 'Sodium sulfate', cat: 'salt' },
    { formula: 'AgNO3', vi: 'Bạc nitrat', en: 'Silver nitrate', cat: 'salt' },
    { formula: 'CaCO3', vi: 'Canxi cacbonat (Đá vôi)', en: 'Calcium carbonate (Limestone)', cat: 'salt', aliases: 'da voi' },
    { formula: 'Na2CO3', vi: 'Natri cacbonat (Sođa)', en: 'Sodium carbonate (Soda ash)', cat: 'salt', aliases: 'soda' },
    { formula: 'NaHCO3', vi: 'Natri hiđrocacbonat (Baking soda)', en: 'Sodium bicarbonate', cat: 'salt', aliases: 'baking soda' },
    { formula: 'CuSO4', vi: 'Đồng(II) sunfat', en: 'Copper(II) sulfate', cat: 'salt' },
    { formula: 'FeSO4', vi: 'Sắt(II) sunfat', en: 'Iron(II) sulfate', cat: 'salt' },
    { formula: 'Fe2(SO4)3', vi: 'Sắt(III) sunfat', en: 'Iron(III) sulfate', cat: 'salt' },
    { formula: 'FeCl2', vi: 'Sắt(II) clorua', en: 'Iron(II) chloride', cat: 'salt' },
    { formula: 'FeCl3', vi: 'Sắt(III) clorua', en: 'Iron(III) chloride', cat: 'salt' },
    { formula: 'AgCl', vi: 'Bạc clorua', en: 'Silver chloride', cat: 'salt' },
    { formula: 'NaNO3', vi: 'Natri nitrat', en: 'Sodium nitrate', cat: 'salt' },
    { formula: 'BaSO4', vi: 'Bari sunfat', en: 'Barium sulfate', cat: 'salt' },
    { formula: 'KMnO4', vi: 'Kali pemanganat (Thuốc tím)', en: 'Potassium permanganate', cat: 'salt', aliases: 'thuoc tim' },
    { formula: 'K2Cr2O7', vi: 'Kali đicromat', en: 'Potassium dichromate', cat: 'salt' },
    { formula: 'KClO3', vi: 'Kali clorat', en: 'Potassium chlorate', cat: 'salt' },
    { formula: 'NH4Cl', vi: 'Amoni clorua', en: 'Ammonium chloride', cat: 'salt' },
    { formula: '(NH4)2SO4', vi: 'Amoni sunfat', en: 'Ammonium sulfate', cat: 'salt' },
    { formula: 'CaCl2', vi: 'Canxi clorua', en: 'Calcium chloride', cat: 'salt' },
    { formula: 'MgCl2', vi: 'Magie clorua', en: 'Magnesium chloride', cat: 'salt' },
    { formula: 'AlCl3', vi: 'Nhôm clorua', en: 'Aluminium chloride', cat: 'salt' },
    { formula: 'ZnSO4', vi: 'Kẽm sunfat', en: 'Zinc sulfate', cat: 'salt' },
    { formula: 'Na2SO3', vi: 'Natri sunfit', en: 'Sodium sulfite', cat: 'salt' },
    { formula: 'FeS', vi: 'Sắt(II) sunfua', en: 'Iron(II) sulfide', cat: 'salt' },
    { formula: 'FeS2', vi: 'Sắt đisunfua (Quặng pirit)', en: 'Iron disulfide (Pyrite)', cat: 'salt', aliases: 'pyrit pirit' },
    { formula: 'KCl', vi: 'Kali clorua', en: 'Potassium chloride', cat: 'salt' },
    { formula: 'KI', vi: 'Kali iotua', en: 'Potassium iodide', cat: 'salt' },
    { formula: 'Pb(NO3)2', vi: 'Chì(II) nitrat', en: 'Lead(II) nitrate', cat: 'salt' },
    { formula: 'Na2S', vi: 'Natri sunfua', en: 'Sodium sulfide', cat: 'salt' },
    // Oxides & Water
    { formula: 'H2O', vi: 'Nước', en: 'Water', cat: 'oxide', aliases: 'nuoc water' },
    { formula: 'H2O2', vi: 'Hiđro peoxit (Oxi già)', en: 'Hydrogen peroxide', cat: 'oxide', aliases: 'oxi gia' },
    { formula: 'CO2', vi: 'Cacbon đioxit', en: 'Carbon dioxide', cat: 'oxide' },
    { formula: 'CO', vi: 'Cacbon monoxit', en: 'Carbon monoxide', cat: 'oxide' },
    { formula: 'SO2', vi: 'Lưu huỳnh đioxit', en: 'Sulfur dioxide', cat: 'oxide' },
    { formula: 'SO3', vi: 'Lưu huỳnh trioxit', en: 'Sulfur trioxide', cat: 'oxide' },
    { formula: 'NO2', vi: 'Nitơ đioxit', en: 'Nitrogen dioxide', cat: 'oxide' },
    { formula: 'P2O5', vi: 'Điphotpho pentaoxit', en: 'Phosphorus pentoxide', cat: 'oxide' },
    { formula: 'CaO', vi: 'Canxi oxit (Vôi sống)', en: 'Calcium oxide (Quicklime)', cat: 'oxide', aliases: 'voi song' },
    { formula: 'Na2O', vi: 'Natri oxit', en: 'Sodium oxide', cat: 'oxide' },
    { formula: 'Na2O2', vi: 'Natri peoxit', en: 'Sodium peroxide', cat: 'oxide' },
    { formula: 'CuO', vi: 'Đồng(II) oxit', en: 'Copper(II) oxide', cat: 'oxide' },
    { formula: 'Fe2O3', vi: 'Sắt(III) oxit', en: 'Iron(III) oxide', cat: 'oxide' },
    { formula: 'Fe3O4', vi: 'Oxit sắt từ', en: 'Iron(II,III) oxide', cat: 'oxide' },
    { formula: 'Al2O3', vi: 'Nhôm oxit', en: 'Aluminium oxide', cat: 'oxide' },
    { formula: 'MnO2', vi: 'Mangan đioxit', en: 'Manganese dioxide', cat: 'oxide' },
    // Metals
    { formula: 'Fe', vi: 'Sắt', en: 'Iron', cat: 'metal' },
    { formula: 'Al', vi: 'Nhôm', en: 'Aluminium', cat: 'metal' },
    { formula: 'Cu', vi: 'Đồng', en: 'Copper', cat: 'metal' },
    { formula: 'Zn', vi: 'Kẽm', en: 'Zinc', cat: 'metal' },
    { formula: 'Na', vi: 'Natri', en: 'Sodium', cat: 'metal' },
    { formula: 'K', vi: 'Kali', en: 'Potassium', cat: 'metal' },
    { formula: 'Ca', vi: 'Canxi', en: 'Calcium', cat: 'metal' },
    { formula: 'Ba', vi: 'Bari', en: 'Barium', cat: 'metal' },
    { formula: 'Mg', vi: 'Magie', en: 'Magnesium', cat: 'metal' },
    { formula: 'Ag', vi: 'Bạc', en: 'Silver', cat: 'metal' },
    // Nonmetals & Organics
    { formula: 'O2', vi: 'Khí Oxi', en: 'Oxygen gas', cat: 'nonmetal' },
    { formula: 'H2', vi: 'Khí Hiđro', en: 'Hydrogen gas', cat: 'nonmetal' },
    { formula: 'Cl2', vi: 'Khí Clo', en: 'Chlorine gas', cat: 'nonmetal' },
    { formula: 'Br2', vi: 'Brom', en: 'Bromine', cat: 'nonmetal' },
    { formula: 'N2', vi: 'Khí Nitơ', en: 'Nitrogen gas', cat: 'nonmetal' },
    { formula: 'S', vi: 'Lưu huỳnh', en: 'Sulfur', cat: 'nonmetal' },
    { formula: 'C', vi: 'Cacbon', en: 'Carbon', cat: 'nonmetal' },
    { formula: 'NH3', vi: 'Amoniac', en: 'Ammonia', cat: 'nonmetal' },
    { formula: 'CH4', vi: 'Metan', en: 'Methane', cat: 'organic' },
    { formula: 'C2H5OH', vi: 'Etanol (Rượu etylic)', en: 'Ethanol', cat: 'organic', aliases: 'ruou etylic alcohol' },
    { formula: 'C6H12O6', vi: 'Glucozơ', en: 'Glucose', cat: 'organic', aliases: 'duong glucose' }
  ];

  // Merge organic substances into COMMON_SUBSTANCES (enriching existing entries without duplicates)
  if (Array.isArray(ORGANIC_DATA.substances)) {
    const existingByFormula = new Map(COMMON_SUBSTANCES.map((s) => [s.formula, s]));
    ORGANIC_DATA.substances.forEach((item) => {
      if (!item || !item.formula) return;
      const existing = existingByFormula.get(item.formula);
      if (existing) {
        if (item.vi) existing.vi = item.vi;
        if (item.en) existing.en = item.en;
        if (item.displayFormula) existing.displayFormula = item.displayFormula;
        if (item.aliases) {
          existing.aliases = existing.aliases ? `${existing.aliases} ${item.aliases}` : item.aliases;
        }
      } else {
        COMMON_SUBSTANCES.push(item);
        existingByFormula.set(item.formula, item);
      }
    });
  }

  // Named isomer resolution: maps special named isomer tokens to true molecular formula for parsing/balancing
  const ISOMER_FORMULA_MAP = {
    Fructose: 'C6H12O6'
  };

  function resolveChemicalFormula(formula) {
    return ISOMER_FORMULA_MAP[formula] || formula;
  }

  // Case-insensitive & diacritic-free name/alias -> canonical formula lookup
  const NAME_ALIAS_MAP = new Map();
  if (ORGANIC_DATA.nameAliases && typeof ORGANIC_DATA.nameAliases === 'object') {
    Object.keys(ORGANIC_DATA.nameAliases).forEach((aliasKey) => {
      const target = ORGANIC_DATA.nameAliases[aliasKey];
      const normKey = String(aliasKey || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .trim();
      if (normKey) {
        NAME_ALIAS_MAP.set(normKey, target);
        const compactKey = normKey.replace(/\s+/g, '');
        if (compactKey.length >= 3 && !NAME_ALIAS_MAP.has(compactKey)) {
          NAME_ALIAS_MAP.set(compactKey, target);
        }
      }
    });
  }

  // Lowercase -> Canonical formula lookup for smart auto-capitalization (e.g. "hcl" -> "HCl")
  const LOWERCASE_CANONICAL_MAP = new Map();
  COMMON_SUBSTANCES.forEach((item) => {
    LOWERCASE_CANONICAL_MAP.set(item.formula.toLowerCase(), item.formula);
  });
  FORMULA_WHITELIST.forEach((f) => {
    if (!LOWERCASE_CANONICAL_MAP.has(f.toLowerCase())) {
      LOWERCASE_CANONICAL_MAP.set(f.toLowerCase(), f);
    }
  });
  Object.keys(ISOMER_FORMULA_MAP).forEach((tok) => {
    LOWERCASE_CANONICAL_MAP.set(tok.toLowerCase(), tok);
    NAME_ALIAS_MAP.set(tok.toLowerCase(), tok);
  });

  // =========================================================================
  // TIER 1: CURATED DICTIONARY (~56 Classic, Redox & 3-Reactant Reactions)
  // =========================================================================
  const TIER1_REACTIONS = [
    // --- 3-REACTANT CLASSIC REACTIONS ---
    {
      reactants: ['Fe(OH)2', 'O2', 'H2O'],
      products: [{ formula: 'Fe(OH)3', state: 'precipitate' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Kết tủa trắng xanh của Fe(OH)₂ dần chuyển sang màu nâu đỏ của Fe(OH)₃ trong không khí ẩm.',
      phenEn: 'Pale greenish-white Fe(OH)₂ precipitate gradually turns reddish-brown Fe(OH)₃ in moist air.',
      expVi: 'Fe(+2) trong Fe(OH)₂ dễ bị O₂ không khí oxi hóa lên trạng thái bền hơn là Fe(+3) khi có mặt nước.',
      expEn: 'Iron(II) in Fe(OH)₂ is readily oxidized by atmospheric O₂ in the presence of water to the more stable iron(III) hydroxide.'
    },
    {
      reactants: ['Al', 'NaOH', 'H2O'],
      products: [{ formula: 'NaAlO2', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Nhôm tan dần trong dung dịch kiềm kèm theo sủi bọt khí H₂ không màu rất mạnh.',
      phenEn: 'Aluminium dissolves steadily in alkaline solution with vigorous effervescence of colorless H₂ gas.',
      expVi: 'Nhôm phản ứng với nước tạo Al(OH)₃ và H₂, sau đó lớp Al(OH)₃ lưỡng tính tan ngay trong NaOH tạo muối natri aluminat (NaAlO₂), giúp phản ứng diễn ra liên tục.',
      expEn: 'Aluminium reacts with water to form H₂ and amphoteric Al(OH)₃, which immediately dissolves in NaOH to form soluble sodium aluminate (NaAlO₂).'
    },
    {
      reactants: ['Al', 'KOH', 'H2O'],
      products: [{ formula: 'KAlO2', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Nhôm tan dần trong dung dịch KOH, sủi bọt khí H₂ không màu mạnh.',
      phenEn: 'Aluminium dissolves in KOH solution while releasing vigorous bubbles of H₂ gas.',
      expVi: 'Tương tự với NaOH, Al(OH)₃ lưỡng tính tan trong dung dịch KOH tạo muối kali aluminat (KAlO₂) và giải phóng H₂.',
      expEn: 'Amphoteric Al(OH)₃ formed on the metal surface dissolves in KOH to yield potassium aluminate (KAlO₂) and hydrogen gas.'
    },
    {
      reactants: ['Zn', 'NaOH', 'H2O'],
      products: [{ formula: 'Na2[Zn(OH)4]', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Kẽm tan dần trong dung dịch kiềm, sủi bọt khí H₂ không màu (tạo dung dịch trong suốt chứa phức zincat).',
      phenEn: 'Zinc dissolves gradually in alkaline solution, evolving colorless H₂ gas to form a clear zincate solution.',
      expVi: 'Kẽm tạo hiđroxit lưỡng tính Zn(OH)₂ tan được trong dung dịch NaOH tạo phức Na₂[Zn(OH)₄] (dạng khan tương ứng là Na₂ZnO₂).',
      expEn: 'Zinc dissolves in aqueous NaOH via amphoteric Zn(OH)₂ to form the soluble tetrahydroxozincate complex Na₂[Zn(OH)₄] (anhydrous equivalent: Na₂ZnO₂).'
    },
    {
      reactants: ['NO2', 'O2', 'H2O'],
      products: [{ formula: 'HNO3', state: null }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Khí NO₂ màu nâu đỏ bị hấp thụ hoàn toàn vào nước cùng với O₂ tạo dung dịch axit nitric không màu.',
      phenEn: 'Reddish-brown NO₂ gas is absorbed with O₂ into water to produce a colorless nitric acid solution.',
      expVi: 'Đây là giai đoạn cuối trong quy trình Ostwald sản xuất công nghiệp axit nitric (HNO₃) từ amoniac.',
      expEn: 'This is the final absorption step of the industrial Ostwald process for manufacturing nitric acid (HNO₃).'
    },
    {
      reactants: ['CaCO3', 'CO2', 'H2O'],
      products: [{ formula: 'Ca(HCO3)2', state: null }],
      type: 'synthesis',
      condVi: '',
      condEn: '',
      phenVi: 'Đá vôi (CaCO₃) không tan bị hòa tan dần tạo dung dịch muối tan Ca(HCO₃)₂ trong suốt.',
      phenEn: 'Insoluble limestone (CaCO₃) slowly dissolves to produce a clear solution of calcium bicarbonate Ca(HCO₃)₂.',
      expVi: 'Phản ứng xâm thực đá vôi trong tự nhiên, giải thích sự hình thành hang động karst và hiện tượng nước cứng tạm thời.',
      expEn: 'Natural weathering of limestone by CO₂-rich rainwater—responsible for karst cave formation and temporary water hardness.'
    },
    {
      reactants: ['KMnO4', 'FeSO4', 'H2SO4'],
      products: [
        { formula: 'Fe2(SO4)3', state: null },
        { formula: 'MnSO4', state: null },
        { formula: 'K2SO4', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch thuốc tím KMnO₄ mất màu tím hồng rất nhanh, chuyển sang dung dịch màu vàng nhạt của ion Fe³⁺.',
      phenEn: 'The deep purple color of KMnO₄ rapidly decolorizes to a pale yellow solution containing Fe³⁺ ions.',
      expVi: 'Trong môi trường axit H₂SO₄, Mn(+7) là chất oxi hóa mạnh bị khử về Mn(+2) không màu, đồng thời oxi hóa Fe(+2) lên Fe(+3). Thường dùng để chuẩn độ định lượng sắt.',
      expEn: 'In sulfuric acid medium, permanganate Mn(+7) is reduced to nearly colorless Mn(+2) while oxidizing Fe(+2) to Fe(+3)—a classic redox titration.'
    },
    {
      reactants: ['Na2CO3', 'CO2', 'H2O'],
      products: [{ formula: 'NaHCO3', state: null }],
      type: 'synthesis',
      condVi: '',
      condEn: '',
      phenVi: 'Khí CO₂ bị hấp thụ vào dung dịch Na₂CO₃ tạo thành dung dịch muối axit NaHCO₃ (nếu đặc có thể tách tinh thể NaHCO₃ ít tan hơn).',
      phenEn: 'CO₂ is absorbed by aqueous Na₂CO₃ to form sodium bicarbonate NaHCO₃ (which may crystallize out from concentrated solutions).',
      expVi: 'Ion CO₃²⁻ kết hợp với H₂O và CO₂ tạo muối hiđrocacbonat (HCO₃⁻).',
      expEn: 'Carbonate ions react with dissolved CO₂ and water to convert the normal salt into the acid salt bicarbonate.'
    },
    {
      reactants: ['SO2', 'Br2', 'H2O'],
      products: [{ formula: 'H2SO4', state: null }, { formula: 'HBr', state: null }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Nước brom màu vàng nâu bị mất màu hoàn toàn tạo dung dịch axit không màu.',
      phenEn: 'Brownish-orange bromine water is completely decolorized into a clear acidic solution.',
      expVi: 'SO₂ thể hiện tính khử (S⁺⁴ → S⁺⁶ trong H₂SO₄), khử Br₂ (0) thành Br⁻ trong HBr. Đây là phản ứng nhận biết khí SO₂ kinh điển.',
      expEn: 'SO₂ acts as a reducing agent (S⁺⁴ → S⁺⁶), reducing orange Br₂ to colorless HBr—a classic qualitative test for SO₂.'
    },
    {
      reactants: ['Cl2', 'SO2', 'H2O'],
      products: [{ formula: 'H2SO4', state: null }, { formula: 'HCl', state: null }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Màu vàng lục của khí clo biến mất khi đi qua dung dịch chứa SO₂, tạo hỗn hợp hai axit mạnh.',
      phenEn: 'The yellow-green color of chlorine fades as it reacts with aqueous SO₂, yielding a mixture of two strong acids.',
      expVi: 'Cl₂ oxi hóa S(+4) trong SO₂ lên S(+6) trong H₂SO₄ và bị khử xuống Cl(−1) trong HCl.',
      expEn: 'Chlorine oxidizes S(+4) in SO₂ to S(+6) in H₂SO₄ while being reduced to chloride ions (HCl).'
    },
    {
      reactants: ['FeCl2', 'KMnO4', 'H2SO4'],
      products: [
        { formula: 'Fe2(SO4)3', state: null },
        { formula: 'Cl2', state: 'gas' },
        { formula: 'MnSO4', state: null },
        { formula: 'K2SO4', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Màu tím của KMnO₄ nhạt dần, xuất hiện khí Cl₂ màu vàng lục mùi hắc thoát ra và dung dịch chuyển sang màu vàng nâu của Fe³⁺.',
      phenEn: 'Purple KMnO₄ fades while pungent yellow-green Cl₂ gas evolves and the solution turns yellowish-brown due to Fe³⁺.',
      expVi: 'Trong môi trường axit H₂SO₄, KMnO₄ oxi hóa mạnh cả hai chất khử trong FeCl₂: Fe²⁺ → Fe³⁺ và Cl⁻ → Cl₂↑.',
      expEn: 'In acidic H₂SO₄ medium, strong oxidizer KMnO₄ oxidizes both reducing ions in FeCl₂: Fe²⁺ to Fe³⁺ and Cl⁻ to Cl₂ gas.'
    },

    // --- 2-REACTANT CLASSIC & REDOX REACTIONS ---
    {
      reactants: ['Fe', 'O2'],
      products: [{ formula: 'Fe3O4', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Dây sắt nung đỏ cháy sáng trong bình khí O₂, bắn ra các hạt tia lửa sáng và tạo chất rắn màu đen (oxit sắt từ Fe₃O₄).',
      phenEn: 'Red-hot iron wire burns brightly in O₂ gas with glowing sparks, forming black iron(II,III) oxide (Fe₃O₄).',
      expVi: 'Sắt cháy trong oxi nguyên chất tạo oxit sắt từ Fe₃O₄ (hỗn hợp kết tinh tương đương FeO·Fe₂O₃).',
      expEn: 'Iron combusts in oxygen to produce magnetic mixed oxide Fe₃O₄ (formally FeO·Fe₂O₃).'
    },
    {
      reactants: ['Fe', 'Cl2'],
      products: [{ formula: 'FeCl3', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Sắt nóng đỏ cháy mạnh trong khí Cl₂ tạo khói màu nâu đỏ đặc trưng của muối sắt(III) clorua.',
      phenEn: 'Heated iron burns vigorously in chlorine gas, producing dense reddish-brown fumes of iron(III) chloride.',
      expVi: 'Cl₂ là chất oxi hóa mạnh nên đẩy trực tiếp Fe(0) lên số oxi hóa cao nhất phổ biến Fe(+3), không dừng ở FeCl₂.',
      expEn: 'Because Cl₂ is a strong oxidizing agent, it oxidizes Fe directly all the way to the +3 state (FeCl₃).'
    },
    {
      reactants: ['Fe', 'S'],
      products: [{ formula: 'FeS', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Hỗn hợp bột sắt và lưu huỳnh nóng đỏ rực lên, tỏa nhiệt mạnh tạo khối rắn màu đen không bị nam châm hút.',
      phenEn: 'A heated mixture of iron and sulfur glows red-hot exothermically, fusing into a black non-magnetic FeS solid.',
      expVi: 'Lưu huỳnh có tính oxi hóa yếu hơn Cl₂ nên chỉ oxi hóa Fe lên mức oxi hóa Fe(+2) tạo FeS.',
      expEn: 'Sulfur is a milder oxidizer than chlorine, so it oxidizes iron only to iron(II) sulfide (FeS).'
    },
    {
      reactants: ['FeCl2', 'Cl2'],
      products: [{ formula: 'FeCl3', state: null }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch FeCl₂ màu xanh lục nhạt nhanh chóng chuyển sang màu vàng nâu của FeCl₃.',
      phenEn: 'Pale green FeCl₂ solution rapidly turns yellowish-brown as FeCl₃ forms.',
      expVi: 'Khí Cl₂ oxi hóa ion Fe²⁺ lên ion Fe³⁺ và bị khử thành ion Cl⁻.',
      expEn: 'Chlorine gas oxidizes Fe²⁺ cations to Fe³⁺ while itself being reduced to Cl⁻.'
    },
    {
      reactants: ['FeCl3', 'Fe'],
      products: [{ formula: 'FeCl2', state: null }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Bột sắt tan một phần, dung dịch màu vàng nâu của FeCl₃ nhạt dần chuyển sang màu xanh lục nhạt của FeCl₂.',
      phenEn: 'Iron dissolves into the solution as yellow-brown FeCl₃ fades to pale green FeCl₂.',
      expVi: 'Phản ứng tỉ lệ nghịch (comproportionation): Fe(0) khử Fe(+3) về trạng thái trung gian Fe(+2).',
      expEn: 'A classic comproportionation redox reaction where metallic Fe(0) reduces Fe(+3) to intermediate Fe(+2).'
    },
    {
      reactants: ['FeCl3', 'Cu'],
      products: [{ formula: 'FeCl2', state: null }, { formula: 'CuCl2', state: null }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Đồng kim loại tan dần trong dung dịch FeCl₃ màu vàng nâu, tạo dung dịch màu xanh lục đậm (ứng dụng ăn mòn bo mạch in PCB).',
      phenEn: 'Metallic copper dissolves in yellow-brown FeCl₃ solution, turning dark green—widely used to etch copper PCB circuit boards.',
      expVi: 'Vì thế điện cực chuẩn E°(Fe³⁺/Fe²⁺) = +0,77 V > E°(Cu²⁺/Cu) = +0,34 V nên ion Fe³⁺ oxi hóa được Cu thành Cu²⁺.',
      expEn: 'Since E°(Fe³⁺/Fe²⁺) = +0.77 V > E°(Cu²⁺/Cu) = +0.34 V, Fe³⁺ readily oxidizes copper metal to Cu²⁺.'
    },
    {
      reactants: ['Cu', 'HNO3'],
      products: [
        { formula: 'Cu(NO3)2', state: null },
        { formula: 'NO2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'đặc',
      condEn: 'conc.',
      phenVi: 'Đồng tan nhanh tạo dung dịch Cu(NO₃)₂ màu xanh lam đậm và thoát ra nhiều khí NO₂ màu nâu đỏ, mùi hắc.',
      phenEn: 'Copper dissolves rapidly to yield a deep blue Cu(NO₃)₂ solution while releasing dense reddish-brown NO₂ fumes.',
      expVi: 'HNO₃ đặc có tính oxi hóa rất mạnh, oxi hóa được cả kim loại đứng sau H như Cu. (Lưu ý: với HNO₃ loãng tạo khí NO không màu hóa nâu ngoài không khí: 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O).',
      expEn: 'Concentrated HNO₃ strongly oxidizes unreactive metals like Cu to Cu²⁺, reducing nitrate to brown NO₂. (Note: dilute HNO₃ yields colorless NO gas instead: 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O).'
    },
    {
      reactants: ['Fe', 'HNO3'],
      products: [
        { formula: 'Fe(NO3)3', state: null },
        { formula: 'NO', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'loãng',
      condEn: 'dil.',
      phenVi: 'Sắt tan tạo dung dịch màu vàng nâu của Fe(NO₃)₃ và giải phóng khí NO không màu (hóa nâu đỏ ngay khi gặp O₂ không khí).',
      phenEn: 'Iron dissolves into a yellowish-brown Fe(NO₃)₃ solution while releasing colorless NO gas (which turns brown in air).',
      expVi: 'HNO₃ loãng oxi hóa Fe trực tiếp lên mức Fe(+3) (nếu axit dư). Lưu ý: sắt bị thụ động hóa trong HNO₃ đặc nguội.',
      expEn: 'Dilute nitric acid oxidizes iron to Fe(+3) nitrate. Note: iron becomes passivated in cold concentrated HNO₃.'
    },
    {
      reactants: ['Ag', 'HNO3'],
      products: [
        { formula: 'AgNO3', state: null },
        { formula: 'NO', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'loãng',
      condEn: 'dil.',
      phenVi: 'Bạc kim loại tan trong HNO₃ loãng tạo dung dịch AgNO₃ trong suốt và thoát khí NO không màu hóa nâu ngoài không khí.',
      phenEn: 'Silver dissolves in dilute HNO₃ to form a clear AgNO₃ solution and colorless NO gas that browns in air.',
      expVi: 'Dù Ag đứng sau H, tính oxi hóa mạnh của ion NO₃⁻ trong môi trường axit vẫn hòa tan được bạc. (Với HNO₃ đặc tạo khí NO₂ nâu đỏ: Ag + 2HNO₃ → AgNO₃ + NO₂↑ + H₂O).',
      expEn: 'Despite Ag lying below H in the activity series, oxidizing HNO₃ dissolves silver. (Concentrated HNO₃ produces brown NO₂ gas instead.)'
    },
    {
      reactants: ['Cu', 'H2SO4'],
      products: [
        { formula: 'CuSO4', state: null },
        { formula: 'SO2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'đặc, nóng',
      condEn: 'conc., Δ',
      phenVi: 'Đồng tan khi đun nóng với H₂SO₄ đặc, dung dịch chuyển sang màu xanh lam của CuSO₄ và thoát khí SO₂ không màu có mùi hắc.',
      phenEn: 'Copper dissolves in hot concentrated H₂SO₄, turning the solution blue (CuSO₄) while evolving pungent SO₂ gas.',
      expVi: 'Cu không phản ứng với H₂SO₄ loãng (do đứng sau H), nhưng H₂SO₄ đặc nóng thể hiện tính oxi hóa mạnh của S(+6), khử xuống SO₂.',
      expEn: 'Copper cannot react with dilute H₂SO₄, but hot concentrated H₂SO₄ acts as a strong oxidizer where S(+6) is reduced to SO₂.'
    },
    {
      reactants: ['KMnO4', 'HCl'],
      products: [
        { formula: 'KCl', state: null },
        { formula: 'MnCl2', state: null },
        { formula: 'Cl2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'đặc',
      condEn: 'conc.',
      phenVi: 'Tinh thể thuốc tím tan ngay trong HCl đặc, giải phóng mạnh khí Cl₂ màu vàng lục mùi sốc đặc trưng.',
      phenEn: 'Dark purple KMnO₄ crystals react immediately with concentrated HCl, vigorously releasing pungent yellow-green Cl₂ gas.',
      expVi: 'Phương pháp điều chế khí clo phổ biến trong phòng thí nghiệm ngay ở nhiệt độ thường nhờ tính oxi hóa mạnh của Mn(+7).',
      expEn: 'Standard laboratory method for generating chlorine gas at room temperature by oxidizing Cl⁻ with permanganate.'
    },
    {
      reactants: ['MnO2', 'HCl'],
      products: [
        { formula: 'MnCl2', state: null },
        { formula: 'Cl2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'đặc, t°',
      condEn: 'conc., Δ',
      phenVi: 'Bột MnO₂ màu đen tan dần khi đun nóng với HCl đặc, giải phóng khí Cl₂ màu vàng lục.',
      phenEn: 'Black MnO₂ powder dissolves upon heating with concentrated HCl, evolving yellow-green chlorine gas.',
      expVi: 'Mn(+4) trong MnO₂ oxi hóa Cl⁻ thành Cl₂ và bị khử xuống Mn(+2) — phản ứng kinh điển của Carl Scheele (1774) khi phát hiện khí clo.',
      expEn: 'Mn(+4) oxidizes chloride to Cl₂ while being reduced to Mn(+2)—the historic 1774 reaction by which Scheele discovered chlorine.'
    },
    {
      reactants: ['Na', 'H2O'],
      products: [{ formula: 'NaOH', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Mẫu natri nóng chảy thành giọt tròn, chạy nhanh trên mặt nước, tỏa nhiệt mạnh và sủi bọt khí H₂ dày đặc (làm phenolphtalein hóa hồng).',
      phenEn: 'Sodium melts into a silvery sphere darting across the water surface with hissing H₂ gas and strong heat release (turning phenolphthalein pink).',
      expVi: 'Kim loại kiềm Na có tính khử rất mạnh, dễ dàng khử H⁺ của nước thành khí H₂ và tạo dung dịch kiềm mạnh NaOH.',
      expEn: 'Highly reactive alkali metal Na readily reduces water protons to H₂ gas while leaving an alkaline NaOH solution.'
    },
    {
      reactants: ['K', 'H2O'],
      products: [{ formula: 'KOH', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Kali phản ứng mãnh liệt hơn natri, tỏa nhiệt đủ lớn để đốt cháy khí H₂ ngay lập tức với ngọn lửa màu tím hoa cà đặc trưng.',
      phenEn: 'Potassium reacts even more violently than sodium, igniting the evolved H₂ instantly with a characteristic lilac flame.',
      expVi: 'K có năng lượng ion hóa thấp hơn Na nên phản ứng với nước cực kỳ mãnh liệt tạo dung dịch kiềm mạnh KOH.',
      expEn: 'With a lower ionization energy than sodium, potassium reacts explosively with water to yield KOH and burning H₂.'
    },
    {
      reactants: ['Li', 'H2O'],
      products: [{ formula: 'LiOH', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Liti nổi trên mặt nước, sủi bọt khí H₂ đều đặn và tan dần tạo dung dịch kiềm LiOH.',
      phenEn: 'Lithium floats on water, fizzing steadily with H₂ gas bubbles as it dissolves into alkaline LiOH.',
      expVi: 'Kim loại kiềm nhẹ nhất phản ứng êm dịu hơn Na và K nhưng vẫn giải phóng hoàn toàn H₂ và tạo bazơ mạnh.',
      expEn: 'The lightest alkali metal reacts steadily—less violently than Na or K—to produce LiOH and H₂.'
    },
    {
      reactants: ['Ca', 'H2O'],
      products: [{ formula: 'Ca(OH)2', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Canxi chìm xuống nước, sủi bọt khí H₂ liên tục và làm dung dịch hơi đục trắng do Ca(OH)₂ ít tan.',
      phenEn: 'Calcium sinks and releases a steady stream of H₂ bubbles, turning the water cloudy with sparingly soluble Ca(OH)₂.',
      expVi: 'Kim loại kiềm thổ Ca khử nước ngay ở nhiệt độ thường tạo hiđroxit kiềm thổ và khí hiđro.',
      expEn: 'Alkaline earth metal calcium reduces cold water directly to calcium hydroxide and hydrogen gas.'
    },
    {
      reactants: ['Ba', 'H2O'],
      products: [{ formula: 'Ba(OH)2', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Bari phản ứng nhanh và mạnh với nước, sủi bọt khí H₂ dày đặc tạo dung dịch kiềm Ba(OH)₂ trong suốt.',
      phenEn: 'Barium reacts rapidly with water, releasing vigorous H₂ bubbles and forming a clear alkaline Ba(OH)₂ solution.',
      expVi: 'Bari là kim loại kiềm thổ hoạt động rất mạnh, tan nhanh trong nước tạo bazơ mạnh Ba(OH)₂.',
      expEn: 'Highly reactive alkaline earth metal barium rapidly reduces water to form soluble strong base Ba(OH)₂ and H₂.'
    },
    {
      reactants: ['Na2O2', 'H2O'],
      products: [{ formula: 'NaOH', state: null }, { formula: 'O2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Bột Na₂O₂ màu vàng nhạt tan trong nước, tỏa nhiệt và sủi mạnh bọt khí O₂ (làm bùng cháy que đóm còn tàn đỏ).',
      phenEn: 'Pale yellow Na₂O₂ dissolves exothermically in water while vigorously evolving O₂ gas (relighting a glowing splint).',
      expVi: 'Phản ứng tự oxi hóa - khử của ion peoxit O₂²⁻ (O⁻¹ vừa bị khử xuống O⁻² trong NaOH, vừa bị oxi hóa lên O⁰ trong O₂).',
      expEn: 'Disproportionation of peroxide oxygen O(−1) into O(−2) in NaOH and O(0) in gaseous O₂.'
    },
    {
      reactants: ['Na2O2', 'CO2'],
      products: [{ formula: 'Na2CO3', state: null }, { formula: 'O2', state: 'gas' }],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Bột Na₂O₂ màu vàng nhạt chuyển dần sang màu trắng của Na₂CO₃ đồng thời giải phóng khí O₂ tinh khiết.',
      phenEn: 'Pale yellow Na₂O₂ turns into white Na₂CO₃ powder while liberating breathable O₂ gas.',
      expVi: 'Phản ứng vừa hấp thụ khí CO₂ vừa tái sinh khí O₂ — ứng dụng nổi tiếng trong tàu ngầm và tàu vũ trụ.',
      expEn: 'Simultaneously scrubs CO₂ and regenerates breathable O₂—famous for life-support systems in submarines and spacecraft.'
    },
    {
      reactants: ['Cl2', 'NaOH'],
      products: [
        { formula: 'NaCl', state: null },
        { formula: 'NaClO', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Khí Cl₂ màu vàng lục bị hấp thụ hoàn toàn tạo dung dịch không màu có mùi tẩy nhẹ (nước Javel).',
      phenEn: 'Yellow-green chlorine gas is absorbed to form a colorless bleaching solution (liquid bleach / Javel water).',
      expVi: 'Phản ứng tự oxi hóa - khử của Cl₂(0) thành Cl(−1) trong NaCl và Cl(+1) trong NaClO (chất tẩy trắng, sát khuẩn).',
      expEn: 'Disproportionation of Cl₂(0) into chloride (NaCl) and hypochlorite (NaClO), the active disinfecting agent in bleach.'
    },
    {
      reactants: ['Cl2', 'H2O'],
      products: [{ formula: 'HCl', state: null }, { formula: 'HClO', state: null }],
      type: 'redox',
      condVi: '⇌',
      condEn: '⇌',
      phenVi: 'Khí Cl₂ tan một phần tạo nước clo màu vàng lục nhạt, làm quỳ tím hóa đỏ rồi mất màu ngay sau đó.',
      phenEn: 'Cl₂ dissolves partially into pale yellow chlorine water that turns litmus red and quickly bleaches it white.',
      expVi: 'Phản ứng thuận nghịch tự oxi hóa - khử tạo HCl và axit yếu HClO có tính oxi hóa và tẩy màu mạnh.',
      expEn: 'Reversible disproportionation producing HCl and hypochlorous acid (HClO), a potent bleaching and disinfecting oxidizer.'
    },
    {
      reactants: ['Ca(OH)2', 'CO2'],
      products: [{ formula: 'CaCO3', state: 'precipitate' }, { formula: 'H2O', state: null }],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Nước vôi trong Ca(OH)₂ bị vẩn đục do xuất hiện kết tủa trắng mịn CaCO₃.',
      phenEn: 'Clear limewater turns milky white due to the formation of fine white CaCO₃ precipitate.',
      expVi: 'Phản ứng kinh điển dùng để nhận biết khí CO₂. (Nếu sục CO₂ dư, kết tủa sẽ tan trở lại tạo Ca(HCO₃)₂).',
      expEn: 'The classic limewater test for carbon dioxide. (Excess CO₂ redissolves the precipitate into soluble Ca(HCO₃)₂.)'
    },
    {
      reactants: ['Fe2O3', 'CO'],
      products: [{ formula: 'Fe', state: null }, { formula: 'CO2', state: 'gas' }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Bột Fe₂O₃ màu đỏ nâu bị khử dần thành bột sắt màu xám đen (bị nam châm hút) và sinh khí CO₂.',
      phenEn: 'Reddish-brown Fe₂O₃ powder is reduced to dark gray magnetic iron metal while evolving CO₂ gas.',
      expVi: 'Phản ứng cốt lõi trong lò cao luyện gang: khí CO khử oxit sắt thành sắt kim loại ở nhiệt độ cao.',
      expEn: 'The core blast-furnace smelting reaction where carbon monoxide reduces iron(III) oxide ore to metallic iron.'
    },
    {
      reactants: ['Fe2O3', 'Al'],
      products: [{ formula: 'Fe', state: null }, { formula: 'Al2O3', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Phản ứng nhiệt nhôm (Thermite) tỏa nhiệt cực lớn (>2000°C), phát sáng chói lòa tạo sắt nóng chảy trắng rực.',
      phenEn: 'The classic thermite reaction erupts with blinding light and intense heat (>2000°C), producing white-hot molten iron.',
      expVi: 'Nhôm có ái lực với oxi mạnh hơn sắt rất nhiều nên đẩy sắt ra khỏi oxit; ứng dụng thực tế để hàn đường ray tàu hỏa.',
      expEn: 'Aluminium’s far greater affinity for oxygen reduces Fe₂O₃ violently to molten iron—used industrially for welding railway tracks.'
    },
    {
      reactants: ['CuO', 'H2'],
      products: [{ formula: 'Cu', state: null }, { formula: 'H2O', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Bột CuO màu đen chuyển dần sang màu đỏ gạch của đồng kim loại, kèm những giọt hơi nước đọng trên thành ống nghiệm.',
      phenEn: 'Black CuO powder gradually turns reddish-brown metallic copper while water droplets condense on the cool glass walls.',
      expVi: 'Khí H₂ ở nhiệt độ cao khử Cu(+2) trong CuO về Cu(0) và tạo thành hơi nước.',
      expEn: 'Heated hydrogen gas reduces Cu(+2) in copper(II) oxide to elemental copper while forming water vapor.'
    },
    {
      reactants: ['FeS2', 'O2'],
      products: [{ formula: 'Fe2O3', state: null }, { formula: 'SO2', state: 'gas' }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Quặng pirit sắt cháy trong oxi tạo chất rắn Fe₂O₃ màu đỏ nâu và khí SO₂ mùi hắc.',
      phenEn: 'Iron pyrite roasts in oxygen to leave reddish-brown Fe₂O₃ solid and pungent SO₂ gas.',
      expVi: 'Giai đoạn đốt quặng pirit để sản xuất khí SO₂ làm nguyên liệu đầu vào cho công nghiệp sản xuất axit sunfuric (H₂SO₄).',
      expEn: 'Industrial roasting of pyrite ore to generate SO₂ feedstock for sulfuric acid manufacturing.'
    },
    {
      reactants: ['H2', 'O2'],
      products: [{ formula: 'H2O', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Hỗn hợp khí H₂ và O₂ cháy nổ mạnh (mạnh nhất ở tỉ lệ thể tích 2:1), tỏa nhiệt lớn tạo hơi nước.',
      phenEn: 'Hydrogen and oxygen ignite explosively (loudest at a 2:1 volume ratio), releasing intense energy and water vapor.',
      expVi: 'Phản ứng hóa hợp tỏa nhiệt cao cung cấp năng lượng cho động cơ tên lửa nhiên liệu lỏng và pin nhiên liệu hydro sạch.',
      expEn: 'Highly exothermic synthesis powering liquid-hydrogen rocket engines and clean hydrogen fuel cells.'
    },
    {
      reactants: ['H2', 'Cl2'],
      products: [{ formula: 'HCl', state: 'gas' }],
      type: 'redox',
      condVi: 'ánh sáng',
      condEn: 'hν (light)',
      phenVi: 'Dưới ánh sáng mạnh (tia UV), hỗn hợp H₂ và Cl₂ phản ứng nổ tạo khí HCl không màu bốc khói trong không khí ẩm.',
      phenEn: 'Under bright UV light, H₂ and Cl₂ react explosively to form colorless HCl gas that fumes in moist air.',
      expVi: 'Ánh sáng phá vỡ liên kết Cl–Cl khơi mào cơ chế gốc tự do dây chuyền tạo phân tử HCl.',
      expEn: 'Photons cleave the Cl–Cl bond, initiating a rapid free-radical chain reaction that synthesizes HCl.'
    },
    {
      reactants: ['N2', 'H2'],
      products: [{ formula: 'NH3', state: 'gas' }],
      type: 'synthesis',
      condVi: 't°, P, xt Fe',
      condEn: 'Δ, P, Fe cat.',
      phenVi: 'Ở áp suất cao và nhiệt độ khoảng 450°C có xúc tác sắt, tạo ra khí amoniac NH₃ có mùi khai đặc trưng.',
      phenEn: 'Under high pressure (~200 atm), ~450°C, and an iron catalyst, pungent ammonia gas (NH₃) is synthesized.',
      expVi: 'Quy trình Haber–Bosch kinh điển — nền tảng sản xuất phân đạm nuôi sống hàng tỉ người trên Trái Đất.',
      expEn: 'The landmark Haber–Bosch process—the industrial backbone of global nitrogen fertilizer production.'
    },
    {
      reactants: ['SO2', 'O2'],
      products: [{ formula: 'SO3', state: null }],
      type: 'synthesis',
      condVi: 't°, V₂O₅',
      condEn: 'Δ, V₂O₅',
      phenVi: 'Khí SO₂ bị oxi hóa có xúc tác V₂O₅ ở ~450°C tạo hơi SO₃ (dễ ngưng tụ thành chất lỏng/rắn bốc khói trắng).',
      phenEn: 'Catalyzed by V₂O₅ at ~450°C, SO₂ is oxidized to SO₃ vapor that fumes densely in humid air.',
      expVi: 'Giai đoạn tiếp xúc then chốt (Contact Process) để chuyển SO₂ thành SO₃ trước khi hấp thụ tạo H₂SO₄.',
      expEn: 'The central catalytic step of the Contact Process converting SO₂ to SO₃ for sulfuric acid production.'
    },
    {
      reactants: ['NH3', 'HCl'],
      products: [{ formula: 'NH4Cl', state: null }],
      type: 'synthesis',
      condVi: '',
      condEn: '',
      phenVi: 'Hai khí không màu gặp nhau lập tức tạo đám khói trắng dày đặc gồm các tinh thể siêu mịn NH₄Cl.',
      phenEn: 'Two colorless gases meet and instantly form a dense white smoke of fine solid NH₄Cl crystals.',
      expVi: 'Phản ứng axit–bazơ theo Brønsted–Lowry: phân tử NH₃ nhận proton H⁺ từ HCl tạo muối ion amoni clorua.',
      expEn: 'A Brønsted–Lowry acid–base combination where NH₃ accepts a proton from HCl to form solid ammonium chloride.'
    },
    {
      reactants: ['CH4', 'O2'],
      products: [{ formula: 'CO2', state: 'gas' }, { formula: 'H2O', state: null }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khí metan cháy với ngọn lửa màu xanh lam nhạt, tỏa nhiều nhiệt, tạo khí CO₂ và hơi nước.',
      phenEn: 'Methane burns cleanly with a pale blue flame, releasing abundant heat, carbon dioxide, and water vapor.',
      expVi: 'Phản ứng đốt cháy hoàn toàn hiđrocacbon đơn giản nhất — thành phần chính của khí thiên nhiên và khí biogas.',
      expEn: 'Complete combustion of the simplest hydrocarbon—the primary fuel component of natural gas and biogas.'
    },
    {
      reactants: ['C2H5OH', 'O2'],
      products: [{ formula: 'CO2', state: 'gas' }, { formula: 'H2O', state: null }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Cồn etanol cháy êm với ngọn lửa xanh lam sáng, không có muội đen, tỏa nhiệt mạnh.',
      phenEn: 'Ethanol burns smoothly with a clean blue flame and no soot, releasing substantial heat.',
      expVi: 'Phản ứng đốt cháy hoàn toàn ancol etylic (ứng dụng trong đèn cồn thí nghiệm và xăng sinh học E5/E10).',
      expEn: 'Complete combustion of ethanol—used in laboratory spirit burners and renewable biofuels.'
    },
    {
      reactants: ['C6H12O6', 'O2'],
      products: [{ formula: 'CO2', state: 'gas' }, { formula: 'H2O', state: null }],
      type: 'combustion',
      condVi: 't° / hô hấp',
      condEn: 'Δ / respiration',
      phenVi: 'Glucozơ bị oxi hóa hoàn toàn thành CO₂ và H₂O kèm giải phóng năng lượng lớn.',
      phenEn: 'Glucose is completely oxidized into CO₂ and H₂O while releasing significant chemical energy.',
      expVi: 'Đây cũng chính là phương trình tổng quát của quá trình hô hấp tế bào hiếu khí cung cấp năng lượng ATP cho sinh vật.',
      expEn: 'Also represents the overall equation of aerobic cellular respiration powering ATP synthesis in living organisms.'
    },
    {
      reactants: ['CaO', 'H2O'],
      products: [{ formula: 'Ca(OH)2', state: null }],
      type: 'synthesis',
      condVi: '',
      condEn: '',
      phenVi: 'Vôi sống (CaO) phản ứng tỏa nhiệt rất mạnh (làm nước sôi sùng sục), tạo vôi tôi Ca(OH)₂ dạng nhão trắng.',
      phenEn: 'Quicklime (CaO) reacts intensely exothermically—steaming and boiling water—to produce white slaked lime Ca(OH)₂.',
      expVi: 'Phản ứng tôi vôi kinh điển: oxit bazơ của kim loại kiềm thổ kết hợp trực tiếp với nước tạo dung dịch bazơ.',
      expEn: 'Classic lime slaking: a basic alkaline-earth oxide hydrates directly to form calcium hydroxide.'
    },
    {
      reactants: ['P2O5', 'H2O'],
      products: [{ formula: 'H3PO4', state: null }],
      type: 'synthesis',
      condVi: '',
      condEn: '',
      phenVi: 'Bột trắng P₂O₅ hút nước cực mạnh, phát tiếng xèo và tỏa nhiệt lớn tạo dung dịch axit photphoric.',
      phenEn: 'White P₂O₅ powder reacts vigorously with a hiss and intense heat to form phosphoric acid.',
      expVi: 'Oxit axit tác dụng với nước tạo axit tương ứng; nhờ tính háo nước mạnh, P₂O₅ thường dùng làm chất làm khô khí.',
      expEn: 'Acidic oxide hydration to phosphoric acid; its fierce affinity for water makes P₂O₅ a powerful desiccant.'
    },
    {
      reactants: ['SO3', 'H2O'],
      products: [{ formula: 'H2SO4', state: null }],
      type: 'synthesis',
      condVi: '',
      condEn: '',
      phenVi: 'SO₃ phản ứng cực kỳ mãnh liệt và tỏa nhiệt rất mạnh với nước tạo làn sương mù axit sunfuric dày đặc.',
      phenEn: 'SO₃ reacts violently and exothermically with water, producing a dense mist of sulfuric acid.',
      expVi: 'Trong công nghiệp người ta hấp thụ SO₃ bằng H₂SO₄ đặc tạo oleum thay vì phun trực tiếp vào nước để tránh tạo mù axit.',
      expEn: 'Industrially, SO₃ is absorbed into concentrated H₂SO₄ (forming oleum) rather than directly into water to avoid acid fog.'
    },

    // --- EXTRA USEFUL CLASSICS & AMPHOTERIC REACTIONS ---
    {
      reactants: ['C2H4', 'O2'],
      products: [{ formula: 'CO2', state: 'gas' }, { formula: 'H2O', state: null }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khí etilen cháy sáng với ngọn lửa vàng sáng và tỏa nhiệt lớn.',
      phenEn: 'Ethylene burns with a luminous flame, releasing heat, CO₂, and water vapor.',
      expVi: 'Phản ứng cháy hoàn toàn anken C₂H₄ trong oxi dư.',
      expEn: 'Complete combustion of the alkene ethylene in excess oxygen.'
    },
    {
      reactants: ['C2H2', 'O2'],
      products: [{ formula: 'CO2', state: 'gas' }, { formula: 'H2O', state: null }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khí axetilen cháy với ngọn lửa cực nóng (~3000°C trong oxi tinh khiết), dùng trong đèn xì hàn cắt kim loại.',
      phenEn: 'Acetylene burns in pure oxygen at ~3000°C—hot enough for oxy-acetylene welding and cutting torches.',
      expVi: 'Liên kết ba C≡C giàu năng lượng giải phóng lượng nhiệt rất lớn khi cháy hoàn toàn.',
      expEn: 'The high-energy C≡C triple bond releases exceptional thermal energy upon complete combustion.'
    },
    {
      reactants: ['C', 'O2'],
      products: [{ formula: 'CO2', state: 'gas' }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Than cacbon cháy đỏ rực trong oxi tạo khí CO₂ không màu và tỏa nhiều nhiệt.',
      phenEn: 'Carbon glows red-hot in oxygen, releasing heat and colorless CO₂ gas.',
      expVi: 'Phản ứng cháy hoàn toàn của cacbon khi cung cấp đủ oxi (nếu thiếu oxi tạo khí CO độc).',
      expEn: 'Complete combustion of carbon in ample oxygen (oxygen-starved combustion yields toxic CO).'
    },
    {
      reactants: ['CO', 'O2'],
      products: [{ formula: 'CO2', state: 'gas' }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khí CO cháy trong không khí với ngọn lửa màu xanh lam nhạt đặc trưng, tỏa nhiệt.',
      phenEn: 'Carbon monoxide burns with a signature pale blue flame to form carbon dioxide.',
      expVi: 'C(+2) trong CO bị oxi hóa lên trạng thái bền C(+4) trong CO₂.',
      expEn: 'C(+2) in CO is oxidized to its fully oxidized C(+4) state in CO₂.'
    },
    {
      reactants: ['S', 'O2'],
      products: [{ formula: 'SO2', state: 'gas' }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lưu huỳnh cháy với ngọn lửa xanh lam rực rỡ trong oxi, tạo khí SO₂ có mùi hắc sốc.',
      phenEn: 'Sulfur burns with a vivid blue flame in oxygen, producing pungent SO₂ gas.',
      expVi: 'Lưu huỳnh bị oxi hóa lên S(+4) tạo khí lưu huỳnh đioxit.',
      expEn: 'Elemental sulfur oxidizes to sulfur(IV) oxide (SO₂).'
    },
    {
      reactants: ['P', 'O2'],
      products: [{ formula: 'P2O5', state: null }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Photpho cháy sáng chói trong oxi tạo đám khói trắng dày đặc gồm các hạt mịn P₂O₅.',
      phenEn: 'Phosphorus burns brilliantly in oxygen, producing thick white clouds of solid P₂O₅.',
      expVi: 'Photpho bị oxi hóa mạnh trong oxi dư lên mức oxi hóa P(+5) tạo điphotpho pentaoxit.',
      expEn: 'Phosphorus oxidizes to P(+5) in excess oxygen, forming phosphorus pentoxide.'
    },
    {
      reactants: ['Mg', 'O2'],
      products: [{ formula: 'MgO', state: null }],
      type: 'combustion',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Dải magie cháy với ánh sáng trắng chói lòa, để lại tro bột trắng MgO.',
      phenEn: 'Magnesium ribbon burns with a dazzling white light, leaving behind fine white MgO ash.',
      expVi: 'Phản ứng tỏa nhiệt mạnh giữa kim loại kiềm thổ Mg và khí O₂ tạo oxit ion siêu bền nhiệt MgO.',
      expEn: 'Intensely exothermic oxidation of magnesium producing refractory ionic MgO.'
    },
    {
      reactants: ['Al', 'O2'],
      products: [{ formula: 'Al2O3', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Bột nhôm cháy sáng rực trong oxi tạo lớp chất rắn trắng Al₂O₃.',
      phenEn: 'Aluminium powder burns brightly in oxygen to form white solid Al₂O₃.',
      expVi: 'Ở nhiệt độ thường lớp màng Al₂O₃ siêu mỏng tự bảo vệ nhôm khỏi bị ăn mòn sâu.',
      expEn: 'At room temperature, a microscopic Al₂O₃ skin passivates aluminium against further corrosion.'
    },
    {
      reactants: ['Cu', 'O2'],
      products: [{ formula: 'CuO', state: null }],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lá đồng màu đỏ cam bị phủ lớp chất rắn màu đen của CuO khi nung nóng trong không khí.',
      phenEn: 'Reddish-orange copper turns black upon heating in air as a layer of CuO forms.',
      expVi: 'Đồng bị oxi hóa ở nhiệt độ cao tạo đồng(II) oxit.',
      expEn: 'Copper oxidizes at elevated temperatures to form black copper(II) oxide.'
    },
    {
      reactants: ['Al2O3', 'NaOH'],
      products: [{ formula: 'NaAlO2', state: null }, { formula: 'H2O', state: null }],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Bột Al₂O₃ màu trắng tan dần trong dung dịch NaOH tạo dung dịch trong suốt.',
      phenEn: 'White Al₂O₃ dissolves in NaOH solution to yield a clear sodium aluminate solution.',
      expVi: 'Al₂O₃ là oxit lưỡng tính nên tan được trong cả axit lẫn dung dịch kiềm mạnh (cơ sở quy trình Bayer tinh chế quặng boxit).',
      expEn: 'Amphoteric Al₂O₃ dissolves in strong alkali to form soluble aluminate—the basis of the Bayer bauxite refining process.'
    },
    {
      reactants: ['Al(OH)3', 'NaOH'],
      products: [{ formula: 'NaAlO2', state: null }, { formula: 'H2O', state: null }],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Kết tủa keo trắng Al(OH)₃ tan hoàn toàn khi nhỏ dung dịch NaOH vào, thu được dung dịch trong suốt.',
      phenEn: 'White gelatinous Al(OH)₃ precipitate dissolves completely upon adding NaOH, leaving a clear solution.',
      expVi: 'Al(OH)₃ là hiđroxit lưỡng tính, thể hiện tính axit yếu khi tác dụng với bazơ mạnh tạo muối aluminat.',
      expEn: 'Amphoteric Al(OH)₃ acts as a weak acid toward strong base NaOH, forming soluble sodium aluminate.'
    },
    {
      reactants: ['ZnO', 'NaOH'],
      products: [{ formula: 'Na2ZnO2', state: null }, { formula: 'H2O', state: null }],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Bột ZnO trắng tan dần trong dung dịch NaOH tạo dung dịch muối natri zincat trong suốt.',
      phenEn: 'White ZnO powder dissolves in NaOH to give a clear sodium zincate solution.',
      expVi: 'ZnO là oxit lưỡng tính, vừa tác dụng được với axit vừa tan được trong dung dịch kiềm mạnh.',
      expEn: 'Amphoteric zinc oxide reacts with strong alkali to yield soluble sodium zincate.'
    },
    {
      reactants: ['Zn(OH)2', 'NaOH'],
      products: [{ formula: 'Na2ZnO2', state: null }, { formula: 'H2O', state: null }],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Kết tủa keo trắng Zn(OH)₂ tan hoàn toàn trong dung dịch NaOH dư.',
      phenEn: 'White gelatinous Zn(OH)₂ dissolves completely in excess NaOH solution.',
      expVi: 'Zn(OH)₂ là hiđroxit lưỡng tính nên tan được trong kiềm mạnh tạo muối zincat và nước.',
      expEn: 'Amphoteric Zn(OH)₂ dissolves in strong base to form soluble zincate and water.'
    },
    {
      reactants: ['Zn', 'NaOH'],
      products: [{ formula: 'Na2ZnO2', state: null }, { formula: 'H2', state: 'gas' }],
      type: 'redox',
      condVi: 'dd / t°',
      condEn: 'aq / Δ',
      phenVi: 'Kẽm tan dần trong dung dịch NaOH và giải phóng bọt khí H₂ không màu.',
      phenEn: 'Zinc dissolves in NaOH solution while releasing colorless hydrogen gas bubbles.',
      expVi: 'Phương trình rút gọn của kẽm tan trong dung dịch kiềm tạo muối natri zincat (Na₂ZnO₂) và khí H₂.',
      expEn: 'Simplified equation for zinc dissolving in alkaline NaOH to form sodium zincate (Na₂ZnO₂) and H₂ gas.'
    },
    {
      reactants: ['Fe3O4', 'HCl'],
      products: [
        { formula: 'FeCl2', state: null },
        { formula: 'FeCl3', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Oxit sắt từ màu đen tan trong dung dịch HCl tạo dung dịch màu vàng nâu chứa hỗn hợp cả hai muối sắt(II) và sắt(III).',
      phenEn: 'Black magnetic iron oxide dissolves in HCl to give a yellow-brown solution containing both Fe(II) and Fe(III) chlorides.',
      expVi: 'Do Fe₃O₄ có bản chất là oxit hỗn hợp FeO·Fe₂O₃ nên khi phản ứng với axit không có tính oxi hóa tạo đồng thời muối Fe²⁺ và Fe³⁺ theo tỉ lệ mol 1:2.',
      expEn: 'Because Fe₃O₄ is a mixed oxide (FeO·Fe₂O₃), reacting with HCl produces FeCl₂ and FeCl₃ simultaneously in a 1:2 molar ratio.'
    },
    {
      reactants: ['Fe3O4', 'H2SO4'],
      products: [
        { formula: 'FeSO4', state: null },
        { formula: 'Fe2(SO4)3', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: 'loãng',
      condEn: 'dil.',
      phenVi: 'Fe₃O₄ tan trong H₂SO₄ loãng tạo hỗn hợp dung dịch muối FeSO₄ và Fe₂(SO₄)₃.',
      phenEn: 'Fe₃O₄ dissolves in dilute H₂SO₄ to produce a mixed solution of FeSO₄ and Fe₂(SO₄)₃.',
      expVi: 'Vì Fe₃O₄ tương đương FeO·Fe₂O₃ nên tạo đồng thời muối sắt(II) và muối sắt(III) sunfat.',
      expEn: 'As a mixed Fe(II)/Fe(III) oxide, Fe₃O₄ yields both iron(II) and iron(III) sulfates with dilute sulfuric acid.'
    },
    {
      reactants: ['CO2', 'H2O'],
      products: [{ formula: 'H2CO3', state: null }],
      type: 'synthesis',
      condVi: '⇌',
      condEn: '⇌',
      phenVi: 'Khí CO₂ tan một phần trong nước tạo dung dịch axit yếu làm quỳ tím hơi chuyển hồng (nước giải khát có gas).',
      phenEn: 'CO₂ dissolves partially in water to produce mildly acidic sparkling water (weak carbonic acid).',
      expVi: 'Phản ứng thuận nghịch tạo axit cacbonic H₂CO₃ rất kém bền, dễ phân hủy ngược lại thành CO₂ và H₂O.',
      expEn: 'Reversible hydration forming unstable carbonic acid H₂CO₃, which readily decomposes back into CO₂ and H₂O.'
    },
    {
      reactants: ['SO2', 'H2O'],
      products: [{ formula: 'H2SO3', state: null }],
      type: 'synthesis',
      condVi: '⇌',
      condEn: '⇌',
      phenVi: 'Khí SO₂ tan tốt trong nước tạo dung dịch axit sunfurơ làm quỳ tím hóa đỏ (tác nhân gây mưa axit).',
      phenEn: 'SO₂ dissolves readily in water to form acidic sulfurous acid (a key contributor to acid rain).',
      expVi: 'Phản ứng thuận nghịch tạo axit yếu H₂SO₃ kém bền.',
      expEn: 'Reversible hydration forming weak, unstable sulfurous acid H₂SO₃.'
    }
  ];

  // Merge organic curated reactions into TIER1_REACTIONS
  if (Array.isArray(ORGANIC_DATA.reactions)) {
    ORGANIC_DATA.reactions.forEach((entry) => {
      TIER1_REACTIONS.push(entry);
    });
  }

  // Build order-independent Tier 1 lookup Map
  const TIER1_MAP = new Map();
  TIER1_REACTIONS.forEach((entry) => {
    const key = entry.reactants.slice().sort().join('+');
    if (!TIER1_MAP.has(key)) {
      TIER1_MAP.set(key, entry);
    }
    // Also register every reactant & product in lowercase canonical map
    entry.reactants.forEach((f) => {
      if (!LOWERCASE_CANONICAL_MAP.has(f.toLowerCase())) {
        LOWERCASE_CANONICAL_MAP.set(f.toLowerCase(), f);
      }
    });
    if (Array.isArray(entry.products)) {
      entry.products.forEach((p) => {
        if (!LOWERCASE_CANONICAL_MAP.has(p.formula.toLowerCase())) {
          LOWERCASE_CANONICAL_MAP.set(p.formula.toLowerCase(), p.formula);
        }
      });
    }
  });

  // =========================================================================
  // BILINGUAL UI & ENGINE DICTIONARY (VI / EN)
  // =========================================================================
  const RXN_I18N = {
    vi: {
      modalTitle: 'Phòng Lab Phản Ứng Hóa Học',
      modalSubtitle: 'Nhập 2 hoặc 3 chất hóa học để kiểm duyệt công thức, suy luận sản phẩm và cân bằng phương trình chính xác',
      footerHint: 'Mẹo: Gõ công thức tự do (vd: H2SO4, Ca(OH)2) hoặc chọn từ danh sách gợi ý, nhấn Enter để chạy phản ứng.',
      presetsLabel: 'Ví dụ nhanh:',
      presetGroupInorganic: 'Vô cơ',
      presetGroupOrganic: 'Hữu cơ',
      slotLabel: (i) => `Chất ${i + 1}`,
      slotPlaceholder: (i) =>
        i === 0 ? 'vd: HCl, Fe, BaCl2...' : i === 1 ? 'vd: NaOH, H2SO4, Na2SO4...' : 'vd: H2O, O2, NaCl...',
      addThirdBtn: '+ Thêm chất thứ 3',
      removeThirdTitle: 'Bỏ chất thứ 3',
      clearAllBtn: 'Xóa tất cả',
      reactBtn: 'Phản ứng',
      didYouMean: 'Ý bạn là:',
      noSuggestions: 'Không có chất gợi ý khớp — nhấn Enter để kiểm tra công thức tự do',
      emptyState: 'Nhập công thức các chất tham gia ở trên hoặc bấm vào một ví dụ nhanh để dự đoán và cân bằng phương trình hóa học.',
      phenLabel: 'Hiện tượng thực tế',
      expLabel: 'Giải thích bản chất',
      spectatorPrefix: 'Ghi chú chất không tham gia:',
      sourceTier1: 'Phản ứng thực nghiệm',
      sourceTier2: 'Suy luận theo quy tắc',
      visualTitle: 'Minh họa phân tử',
      replayBtn: 'Phát lại',
      legCovalent: 'Cộng hóa trị',
      legIonic: 'Tương tác ion',
      legGas: 'Khí bay hơi',
      legPpt: 'Kết tủa',
      noRxnVisualCaption: 'Không xảy ra phản ứng — các phân tử giữ nguyên trạng thái',
      catLabels: {
        acid: 'Axit',
        base: 'Bazơ',
        salt: 'Muối',
        oxide: 'Oxit',
        metal: 'Kim loại',
        nonmetal: 'Phi kim',
        organic: 'Hữu cơ'
      },
      typeLabels: {
        neutralization: 'Phản ứng trung hòa',
        exchange: 'Phản ứng trao đổi',
        displacement: 'Phản ứng thế',
        redox: 'Phản ứng oxi hóa - khử',
        synthesis: 'Phản ứng hóa hợp',
        combustion: 'Phản ứng đốt cháy',
        addition: 'Phản ứng cộng',
        substitution: 'Phản ứng thế',
        esterification: 'Phản ứng ester hóa',
        hydrolysis: 'Phản ứng thủy phân',
        'no-reaction': 'Không xảy ra phản ứng'
      },
      errEmpty: 'Vui lòng nhập công thức hóa học.',
      errLeadingDigit: (raw) => `Không nhập hệ số cân bằng phía trước công thức "${raw}". Hệ thống sẽ tự cân bằng.`,
      errZeroSubscript: (raw, badNum) =>
        `Chỉ số / ký hiệu "${badNum}" không hợp lệ trong "${raw}" — chỉ số nguyên tử không được bằng 0 hoặc bắt đầu bằng số 0.`,
      errZeroAsO: (raw, badNum) =>
        `Ký hiệu không hợp lệ ("${badNum}" trong "${raw}") — chỉ số không được bắt đầu bằng số 0. Có thể bạn gõ nhầm số 0 thay cho chữ O?`,
      errUnmatchedOpen: 'Thiếu dấu ngoặc đóng ")" trong công thức.',
      errUnmatchedClose: 'Dư dấu ngoặc đóng ")" không khớp trong công thức.',
      errMismatchBracket: 'Dấu ngoặc mở và đóng không khớp nhau.',
      errEmptyParens: 'Cặp dấu ngoặc "()" trống không chứa nguyên tố nào.',
      errInvalidChar: (ch) => `Ký tự không hợp lệ "${ch}" trong công thức hóa học.`,
      errLowercaseStart: (ch) => `Ký tự "${ch}" không hợp lệ — ký hiệu nguyên tố phải bắt đầu bằng chữ IN HOA (vd: NaCl, H2SO4).`,
      errUnknownElement: (sym) => `Ký hiệu nguyên tố "${sym}" không tồn tại trong bảng tuần hoàn.`,
      errTooLarge: 'Chỉ số nguyên tử quá lớn.',
      errNobleCompound: (sym, name, formula) =>
        `"${sym}" (${name}) là khí hiếm trơ có lớp vỏ electron bão hòa, không tạo hợp chất "${formula}".`,
      errNobleDiatomic: (sym, formula) =>
        `Khí hiếm "${sym}" tồn tại ở dạng đơn nguyên tử, không tạo phân tử "${formula}".`,
      errDiatomicSingle: (sym, diatomic) =>
        `Đơn chất "${sym}" ở điều kiện thường tồn tại dưới dạng phân tử hai nguyên tử "${diatomic}".`,
      errMetalSubscript: (sym, formula) =>
        `Đơn chất "${sym}" được viết ở dạng nguyên tử đơn "${sym}", không viết "${formula}".`,
      errMissingParens: (formula, anion) =>
        `Nhóm nguyên tử "${anion}" có chỉ số lớn hơn 1 cần được đặt trong dấu ngoặc đơn "()" (trong "${formula}").`,
      errUnreducedRatio: (formula) =>
        `Tỉ lệ chỉ số trong "${formula}" chưa tối giản theo quy tắc hóa trị hợp chất ion.`,
      errValenceMismatch: (formula, cation, valencesStr, anion, anionCharge) =>
        `Công thức "${formula}" sai hóa trị: ${cation} có hóa trị phổ biến (${valencesStr}) và gốc ${anion} có điện tích (${anionCharge}) nên tổng điện tích khác 0.`,
      errInvalidCompound: (formula) =>
        `Công thức "${formula}" không tạo thành hợp chất trung hòa điện hợp lệ.`,
      errMetalMetalCompound: (formula) =>
        `"${formula}" gồm hai nguyên tố kim loại — kim loại không kết hợp với nhau theo quy tắc hợp chất ion.`,
      errDuplicate: (f) =>
        `Hai chất tham gia trùng nhau (${f} + ${f}) — một chất không tự phản ứng với chính nó.`
    },
    en: {
      modalTitle: 'Chemical Reactions Lab',
      modalSubtitle: 'Enter 2 or 3 chemical formulas to validate stoichiometry, infer products, and balance equations exactly',
      footerHint: 'Tip: Type any formula (e.g., H2SO4, Ca(OH)2) or pick from suggestions, then press Enter to react.',
      presetsLabel: 'Quick examples:',
      presetGroupInorganic: 'Inorganic',
      presetGroupOrganic: 'Organic',
      slotLabel: (i) => `Reactant ${i + 1}`,
      slotPlaceholder: (i) =>
        i === 0 ? 'e.g., HCl, Fe, BaCl2...' : i === 1 ? 'e.g., NaOH, H2SO4, Na2SO4...' : 'e.g., H2O, O2, NaCl...',
      addThirdBtn: '+ Add 3rd reactant',
      removeThirdTitle: 'Remove 3rd reactant',
      clearAllBtn: 'Clear all',
      reactBtn: 'React',
      didYouMean: 'Did you mean:',
      noSuggestions: 'No catalog match — press Enter to validate custom formula',
      emptyState: 'Enter reactant formulas above or pick a quick example to predict products and balance the chemical equation.',
      phenLabel: 'Observed Phenomenon',
      expLabel: 'Chemical Explanation',
      spectatorPrefix: 'Spectator note:',
      sourceTier1: 'Experimental Database',
      sourceTier2: 'Rule-Based Inference',
      visualTitle: 'Molecular Visualization',
      replayBtn: 'Replay',
      legCovalent: 'Covalent',
      legIonic: 'Ionic',
      legGas: 'Gas',
      legPpt: 'Precipitate',
      noRxnVisualCaption: 'No reaction — molecules remain unchanged',
      catLabels: {
        acid: 'Acid',
        base: 'Base',
        salt: 'Salt',
        oxide: 'Oxide',
        metal: 'Metal',
        nonmetal: 'Nonmetal',
        organic: 'Organic'
      },
      typeLabels: {
        neutralization: 'Neutralization',
        exchange: 'Double Displacement',
        displacement: 'Single Displacement',
        redox: 'Redox Reaction',
        synthesis: 'Synthesis',
        combustion: 'Combustion',
        addition: 'Addition',
        substitution: 'Substitution',
        esterification: 'Esterification',
        hydrolysis: 'Hydrolysis',
        'no-reaction': 'No Reaction'
      },
      errEmpty: 'Please enter a chemical formula.',
      errLeadingDigit: (raw) => `Do not include a leading coefficient in "${raw}" — the balancer computes coefficients automatically.`,
      errZeroSubscript: (raw, badNum) =>
        `Invalid subscript "${badNum}" in "${raw}" — atomic subscripts cannot be 0 or start with 0.`,
      errZeroAsO: (raw, badNum) =>
        `Invalid symbol/subscript ("${badNum}" in "${raw}") — subscripts cannot start with 0. Did you type digit 0 instead of letter O?`,
      errUnmatchedOpen: 'Missing closing parenthesis ")" in formula.',
      errUnmatchedClose: 'Unexpected closing parenthesis ")" in formula.',
      errMismatchBracket: 'Mismatched opening and closing brackets.',
      errEmptyParens: 'Empty parentheses "()" contain no elements.',
      errInvalidChar: (ch) => `Invalid character "${ch}" in chemical formula.`,
      errLowercaseStart: (ch) => `Invalid character "${ch}" — element symbols must start with an UPPERCASE letter (e.g., NaCl, H2SO4).`,
      errUnknownElement: (sym) => `Element symbol "${sym}" does not exist in the periodic table.`,
      errTooLarge: 'Subscript value is too large.',
      errNobleCompound: (sym, name, formula) =>
        `"${sym}" (${name}) is an inert noble gas with a full valence shell and does not form "${formula}".`,
      errNobleDiatomic: (sym, formula) =>
        `Noble gas "${sym}" is monoatomic and does not form "${formula}".`,
      errDiatomicSingle: (sym, diatomic) =>
        `Under standard conditions, elemental "${sym}" exists as the diatomic molecule "${diatomic}".`,
      errMetalSubscript: (sym, formula) =>
        `Elemental "${sym}" is written as a monoatomic symbol "${sym}", not "${formula}".`,
      errMissingParens: (formula, anion) =>
        `Polyatomic group "${anion}" with a count greater than 1 must be enclosed in parentheses "()" (in "${formula}").`,
      errUnreducedRatio: (formula) =>
        `Subscript ratio in "${formula}" is not in lowest terms for an ionic compound.`,
      errValenceMismatch: (formula, cation, valencesStr, anion, anionCharge) =>
        `Invalid valence in "${formula}": ${cation} has common valence (${valencesStr}) while ${anion} carries charge (${anionCharge}), so net charge is not zero.`,
      errInvalidCompound: (formula) =>
        `"${formula}" does not represent a valid electrically neutral chemical compound.`,
      errMetalMetalCompound: (formula) =>
        `"${formula}" combines two metals — metals do not form standard ionic compounds together.`,
      errDuplicate: (f) =>
        `Duplicate reactants (${f} + ${f}) — a substance does not react with itself.`
    }
  };

  // =========================================================================
  // HELPER UTILITIES
  // =========================================================================
  let elementMapCache = null;

  function getElementMap() {
    if (!elementMapCache || elementMapCache.size === 0) {
      elementMapCache = new Map();
      (window.ELEMENTS || []).forEach((el) => {
        elementMapCache.set(el.symbol, el);
      });
    }
    return elementMapCache;
  }

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizeSearchText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  }

  function numGcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  }

  function formatFormulaHTML(formula) {
    if (formula === 'Fructose') {
      return 'C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> <span class="rxn-isomer-tag">(Fructose)</span>';
    }
    const escaped = escapeHTML(formula);
    return escaped.replace(/([A-Za-z)\]])(\d+)/g, '$1<sub>$2</sub>');
  }

  function formatFormulaUnicode(formula) {
    if (formula === 'Fructose') {
      return 'C₆H₁₂O₆ (Fructose)';
    }
    const map = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
    return String(formula || '').replace(/([A-Za-z)\]])(\d+)/g, (_, pre, digits) => {
      return pre + digits.replace(/\d/g, (d) => map[d] || d);
    });
  }

  function romanValence(v) {
    const map = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII' };
    return map[v] || String(v);
  }

  function parsePositiveOxidationStates(el) {
    if (!el || !el.oxidationStates) return [];
    const matches = String(el.oxidationStates).match(/\+\d+/g) || [];
    const vals = matches.map((s) => parseInt(s, 10)).filter((n) => n > 0);
    return Array.from(new Set(vals)).sort((a, b) => a - b);
  }

  // Filter realistic positive valences for ionic/covalent validation
  function getValidCationValences(cationSym, anionFormula) {
    if (cationSym === 'NH4') return [1];
    const el = getElementMap().get(cationSym);
    if (!el) return [];

    // Real-world chemistry valence caps for transition metals in simple salts/hydroxides
    if (cationSym === 'Mn') {
      if (anionFormula === 'O') return [2, 4, 7];
      if (anionFormula === 'F') return [2, 3, 4];
      return [2];
    }
    if (cationSym === 'Cr') {
      if (anionFormula === 'O') return [2, 3, 6];
      return [2, 3];
    }
    if (cationSym === 'V') {
      if (anionFormula === 'O') return [2, 3, 4, 5];
      return [2, 3, 4];
    }
    if (cationSym === 'Cu') {
      if (anionFormula === 'O' || anionFormula === 'S' || anionFormula === 'Cl' || anionFormula === 'Br' || anionFormula === 'I') {
        return [1, 2];
      }
      return [2];
    }
    if (cationSym === 'Pb' || cationSym === 'Sn') {
      if (anionFormula === 'O' || anionFormula === 'Cl' || anionFormula === 'F' || anionFormula === 'S') {
        return [2, 4];
      }
      return [2];
    }
    if (cationSym === 'Au') {
      return [1, 3];
    }
    if (cationSym === 'Fe') {
      return [2, 3];
    }

    const pos = parsePositiveOxidationStates(el);
    return pos;
  }

  // Build canonical ionic formula using criss-cross rule
  function buildIonicFormula(cationSym, valence, anionFormula) {
    const anion = ANION_BY_FORMULA.get(anionFormula);
    if (!anion) return null;
    const q = Math.abs(anion.charge);
    const g = numGcd(valence, q);
    const cSub = q / g;
    const aSub = valence / g;

    // Acetate convention: CH3COONa, (CH3COO)2Ca
    if (anionFormula === 'CH3COO' && cationSym !== 'H') {
      const aPart = aSub === 1 ? 'CH3COO' : `(CH3COO)${aSub}`;
      const cPart = cationSym === 'NH4'
        ? (cSub === 1 ? 'NH4' : `(NH4)${cSub}`)
        : (cSub === 1 ? cationSym : `${cationSym}${cSub}`);
      return aPart + cPart;
    }

    const cPart = cationSym === 'NH4'
      ? (cSub === 1 ? 'NH4' : `(NH4)${cSub}`)
      : (cSub === 1 ? cationSym : `${cationSym}${cSub}`);

    let aPart;
    if (aSub === 1) {
      aPart = anion.formula;
    } else if (anion.polyatomic) {
      aPart = `(${anion.formula})${aSub}`;
    } else {
      aPart = `${anion.formula}${aSub}`;
    }
    return cPart + aPart;
  }

  // =========================================================================
  // 3-STEP FORMULA NORMALIZER, PARSER & VALIDATOR
  // =========================================================================

  // Pure syntax & element parser (supports nested () and optionally [])
  function parseFormulaSyntax(formula, options = {}) {
    const allowSquare = Boolean(options.allowSquare);
    const eMap = getElementMap();
    const len = formula.length;
    let pos = 0;

    function parseGroup(expectedClose) {
      const counts = Object.create(null);
      let hasItems = false;

      while (pos < len) {
        const ch = formula[pos];

        if (ch === ')' || ch === ']') {
          if (!expectedClose) {
            return { ok: false, errorCode: 'errUnmatchedClose', raw: formula };
          }
          if (ch !== expectedClose) {
            return { ok: false, errorCode: 'errMismatchBracket', raw: formula };
          }
          pos++;
          if (!hasItems) {
            return { ok: false, errorCode: 'errEmptyParens', raw: formula };
          }
          return { ok: true, counts };
        }

        if (ch === '(' || (allowSquare && ch === '[')) {
          pos++;
          const sub = parseGroup(ch === '(' ? ')' : ']');
          if (!sub.ok) return sub;
          const multRes = readNumber();
          if (!multRes.ok) return multRes;
          const mult = multRes.value;
          for (const [sym, cnt] of Object.entries(sub.counts)) {
            counts[sym] = (counts[sym] || 0) + cnt * mult;
          }
          hasItems = true;
          continue;
        }

        if (ch >= 'A' && ch <= 'Z') {
          let end = pos + 1;
          while (end < len && formula[end] >= 'a' && formula[end] <= 'z') {
            end++;
          }
          const sym = formula.slice(pos, end);
          pos = end;

          if (!eMap.has(sym)) {
            return { ok: false, errorCode: 'errUnknownElement', sym, raw: formula };
          }

          const numRes = readNumber();
          if (!numRes.ok) return numRes;
          const cnt = numRes.value;
          counts[sym] = (counts[sym] || 0) + cnt;
          hasItems = true;
          continue;
        }

        if (ch >= '0' && ch <= '9') {
          if (!hasItems && pos === 0 && !expectedClose) {
            return { ok: false, errorCode: 'errLeadingDigit', raw: formula };
          }
          return { ok: false, errorCode: 'errInvalidChar', ch, raw: formula };
        }

        if (ch >= 'a' && ch <= 'z') {
          return { ok: false, errorCode: 'errLowercaseStart', ch, raw: formula };
        }

        return { ok: false, errorCode: 'errInvalidChar', ch, raw: formula };
      }

      if (expectedClose) {
        return { ok: false, errorCode: 'errUnmatchedOpen', raw: formula };
      }
      if (!hasItems) {
        return { ok: false, errorCode: 'errEmpty', raw: formula };
      }
      return { ok: true, counts };
    }

    function readNumber() {
      if (pos >= len || formula[pos] < '0' || formula[pos] > '9') {
        return { ok: true, value: 1 };
      }
      const start = pos;
      while (pos < len && formula[pos] >= '0' && formula[pos] <= '9') {
        pos++;
      }
      const numStr = formula.slice(start, pos);
      if (numStr[0] === '0') {
        // Detect digit '0' mistyped for letter 'O' (e.g. H2S04, CaC03, Na0H, H20)
        return {
          ok: false,
          errorCode: numStr.length > 1 || pos < len ? 'errZeroAsO' : 'errZeroSubscript',
          badNum: numStr,
          raw: formula
        };
      }
      const val = parseInt(numStr, 10);
      if (!Number.isFinite(val) || val <= 0) {
        return { ok: false, errorCode: 'errZeroSubscript', badNum: numStr, raw: formula };
      }
      if (val > 500) {
        return { ok: false, errorCode: 'errTooLarge', raw: formula };
      }
      return { ok: true, value: val };
    }

    const res = parseGroup(null);
    if (!res.ok) return res;
    return {
      ok: true,
      formula,
      atoms: res.counts,
      elements: Object.keys(res.counts)
    };
  }

  // Normalize user input: trim, convert Unicode subscripts, resolve common substance names, auto-case formulas
  function normalizeInputFormula(raw) {
    const asciiSub = String(raw || '').replace(/[₀-₉]/g, (ch) => SUBSCRIPT_TO_ASCII[ch] || ch);
    const trimmed = asciiSub.trim();
    if (!trimmed) return '';

    const rawLower = trimmed.toLowerCase();
    if (NAME_ALIAS_MAP.has(rawLower)) {
      return NAME_ALIAS_MAP.get(rawLower);
    }

    const searchNorm = normalizeSearchText(trimmed);
    if (NAME_ALIAS_MAP.has(searchNorm)) {
      return NAME_ALIAS_MAP.get(searchNorm);
    }

    const compactNorm = searchNorm.replace(/\s+/g, '');
    if (NAME_ALIAS_MAP.has(compactNorm)) {
      return NAME_ALIAS_MAP.get(compactNorm);
    }

    const cleaned = asciiSub.replace(/\s+/g, '');
    if (!cleaned) return '';

    const lower = cleaned.toLowerCase();
    if (NAME_ALIAS_MAP.has(lower)) {
      return NAME_ALIAS_MAP.get(lower);
    }
    // 1. If all lowercase and in common canonical map (e.g. "hcl" -> "HCl", "naoh" -> "NaOH", "fe(oh)2" -> "Fe(OH)2")
    if (cleaned === lower && LOWERCASE_CANONICAL_MAP.has(lower)) {
      return LOWERCASE_CANONICAL_MAP.get(lower);
    }
    // 2. If all lowercase and matches an element symbol (e.g. "fe" -> "Fe", "cu" -> "Cu", "na" -> "Na")
    if (cleaned === lower) {
      const eMap = getElementMap();
      for (const sym of eMap.keys()) {
        if (sym.toLowerCase() === lower) {
          return sym;
        }
      }
    }
    // 3. If mixed case fails syntax parsing (e.g. "Hcl", "Naoh", "H2so4", "Bacl2"), check canonical map
    const quickParse = parseFormulaSyntax(cleaned, { allowSquare: true });
    if (!quickParse.ok && LOWERCASE_CANONICAL_MAP.has(lower)) {
      return LOWERCASE_CANONICAL_MAP.get(lower);
    }

    return cleaned;
  }

  // Split ionic / salt / base / binary compound into { cation, cCount, anion, aCount, missingParens? }
  function splitIonicFormula(formula) {
    const eMap = getElementMap();

    // Case A: Acetate-first form e.g. CH3COONa, (CH3COO)2Ca, CH3COONH4
    const acetMatch = formula.match(/^(?:\(CH3COO\)(\d+)|CH3COO)(?:\((NH4)\)(\d*)|(NH4)|([A-Z][a-z]?)(\d*))$/);
    if (acetMatch) {
      const aCount = acetMatch[1] ? parseInt(acetMatch[1], 10) : 1;
      const cation = acetMatch[2] || acetMatch[4] || acetMatch[5];
      const cCountStr = acetMatch[3] || acetMatch[6] || '';
      const cCount = cCountStr ? parseInt(cCountStr, 10) : 1;
      if (cation === 'NH4' || eMap.has(cation)) {
        return {
          cation,
          cCount,
          anion: ANION_BY_FORMULA.get('CH3COO'),
          aCount,
          missingParens: false
        };
      }
    }

    // Case B: Standard CationPart + AnionPart
    let cation = null;
    let cCount = 1;
    let rest = '';

    // Check NH4 cation first: (NH4)2... or NH4...
    const nh4Paren = formula.match(/^\(NH4\)(\d+)(.+)$/);
    if (nh4Paren) {
      cation = 'NH4';
      cCount = parseInt(nh4Paren[1], 10);
      rest = nh4Paren[2];
    } else if (formula.startsWith('NH4') && formula.length > 3) {
      cation = 'NH4';
      cCount = 1;
      rest = formula.slice(3);
    } else {
      // Single element cation: Symbol + optional count
      const catMatch = formula.match(/^([A-Z][a-z]?)(\d*)(.+)$/);
      if (catMatch && eMap.has(catMatch[1])) {
        cation = catMatch[1];
        cCount = catMatch[2] ? parseInt(catMatch[2], 10) : 1;
        rest = catMatch[3];
      }
    }

    if (!cation || !rest) return null;

    // Try matching rest against ANION_LIST
    for (let i = 0; i < ANION_LIST.length; i++) {
      const anion = ANION_LIST[i];
      const af = anion.formula;

      // Exact match (aCount = 1)
      if (rest === af) {
        return { cation, cCount, anion, aCount: 1, missingParens: false };
      }

      // Parenthesized polyatomic or monoatomic: (Anion)k
      if (rest.startsWith(`(${af})`)) {
        const tail = rest.slice(af.length + 2);
        if (/^\d+$/.test(tail)) {
          return { cation, cCount, anion, aCount: parseInt(tail, 10), missingParens: false };
        }
        if (tail === '') {
          return { cation, cCount, anion, aCount: 1, missingParens: false };
        }
      }

      // Unparenthesized with trailing digits: e.g. Cl2, O3, or typo CaOH2
      if (rest.startsWith(af)) {
        const tail = rest.slice(af.length);
        if (/^\d+$/.test(tail)) {
          if (!anion.polyatomic) {
            return { cation, cCount, anion, aCount: parseInt(tail, 10), missingParens: false };
          } else {
            // e.g. CaOH2 instead of Ca(OH)2 — polyatomic anion with count but missing parens!
            return { cation, cCount, anion, aCount: parseInt(tail, 10), missingParens: true };
          }
        }
      }
    }

    return null;
  }

  // Helper to check if a candidate suggestion passes all 3 validation steps (no recursion loop)
  function isValidCandidateFormula(candidate) {
    if (!candidate) return false;
    const res = validateFormula(candidate, 'vi', true);
    return res.ok;
  }

  // Full 3-Step Validator
  function validateFormula(rawInput, lang = 'vi', skipTypoProbe = false) {
    const d = RXN_I18N[lang] || RXN_I18N.vi;
    const eMap = getElementMap();
    const formula = normalizeInputFormula(rawInput);

    if (!formula) {
      return { ok: false, empty: true, step: 1, formula: '', error: d.errEmpty, suggestions: [] };
    }

    // Named isomer tokens (e.g. Fructose -> C6H12O6) validate directly via resolved formula
    if (ISOMER_FORMULA_MAP[formula]) {
      const resolvedParsed = parseFormulaSyntax(ISOMER_FORMULA_MAP[formula], { allowSquare: true });
      if (resolvedParsed.ok) {
        return {
          ok: true,
          formula,
          atoms: resolvedParsed.counts || resolvedParsed.atoms,
          elements: resolvedParsed.elements
        };
      }
    }

    // --- STEP 1: Syntax & Elements ---
    const parsed = parseFormulaSyntax(formula, { allowSquare: true });
    if (!parsed.ok) {
      const suggestions = [];
      let errorMsg = '';

      if (parsed.errorCode === 'errLeadingDigit') {
        errorMsg = d.errLeadingDigit(formula);
        const stripped = formula.replace(/^\d+/, '');
        if (!skipTypoProbe && stripped && isValidCandidateFormula(stripped)) {
          suggestions.push(stripped);
        }
      } else if (parsed.errorCode === 'errZeroAsO' || parsed.errorCode === 'errZeroSubscript') {
        const probeO = formula.replace(/0/g, 'O');
        if (!skipTypoProbe && probeO !== formula && isValidCandidateFormula(probeO)) {
          errorMsg = d.errZeroAsO(formula, parsed.badNum);
          suggestions.push(probeO);
        } else {
          errorMsg = parsed.errorCode === 'errZeroAsO'
            ? d.errZeroAsO(formula, parsed.badNum)
            : d.errZeroSubscript(formula, parsed.badNum);
        }
      } else if (parsed.errorCode === 'errUnknownElement') {
        errorMsg = d.errUnknownElement(parsed.sym);
      } else if (parsed.errorCode === 'errInvalidChar') {
        errorMsg = d.errInvalidChar(parsed.ch);
      } else if (parsed.errorCode === 'errLowercaseStart') {
        errorMsg = d.errLowercaseStart(parsed.ch);
      } else if (typeof d[parsed.errorCode] === 'function') {
        errorMsg = d[parsed.errorCode](formula);
      } else {
        errorMsg = d[parsed.errorCode] || d.errInvalidCompound(formula);
      }

      return { ok: false, empty: false, step: 1, formula, error: errorMsg, suggestions };
    }

    const { atoms, elements } = parsed;

    // --- STEP 2: Noble Gas Compound Block ---
    const noblePresent = elements.find((sym) => NOBLE_GASES.has(sym));
    if (noblePresent) {
      if (elements.length >= 2 && !NOBLE_WHITELIST.has(formula)) {
        const el = eMap.get(noblePresent);
        const elName = el ? (lang === 'en' ? el.enName : el.name) : noblePresent;
        return {
          ok: false,
          empty: false,
          step: 2,
          formula,
          error: d.errNobleCompound(noblePresent, elName, formula),
          suggestions: []
        };
      }
      if (elements.length === 1 && atoms[noblePresent] > 1) {
        return {
          ok: false,
          empty: false,
          step: 2,
          formula,
          error: d.errNobleDiatomic(noblePresent, formula),
          suggestions: [noblePresent]
        };
      }
    }

    // --- STEP 3: Whitelist, Single Element & Valence / Charge Neutrality ---
    // Helper: detect mistyped digit '0' instead of letter 'O' (e.g. H20 -> H2O, Fe304 -> Fe3O4, K2Cr207 -> K2Cr2O7)
    const probeZeroAsO = () => {
      if (skipTypoProbe || !formula.includes('0')) return null;
      const cand = formula.replace(/0/g, 'O');
      if (cand !== formula && isValidCandidateFormula(cand)) return cand;
      return null;
    };

    // 3a. Single-element substances
    if (elements.length === 1) {
      const sym = elements[0];
      const cnt = atoms[sym];
      if (ELEMENTAL_WHITELIST.has(formula)) {
        return { ok: true, formula, atoms, elements };
      }
      const zeroFix = probeZeroAsO();
      if (zeroFix) {
        return {
          ok: false,
          empty: false,
          step: 1,
          formula,
          error: d.errZeroAsO(formula, String(cnt)),
          suggestions: [zeroFix]
        };
      }
      if (DIATOMIC_ELEMENTS[sym]) {
        if (cnt === 2 || (sym === 'O' && cnt === 3)) {
          return { ok: true, formula, atoms, elements };
        }
        return {
          ok: false,
          empty: false,
          step: 3,
          formula,
          error: d.errDiatomicSingle(sym, DIATOMIC_ELEMENTS[sym]),
          suggestions: [DIATOMIC_ELEMENTS[sym]]
        };
      }
      // Metals, metalloids, solid nonmetals (monoatomic)
      if (cnt === 1) {
        return { ok: true, formula, atoms, elements };
      }
      return {
        ok: false,
        empty: false,
        step: 3,
        formula,
        error: d.errMetalSubscript(sym, formula),
        suggestions: [sym]
      };
    }

    // 3b. Direct Whitelist (covalent compounds, organic molecules, special oxides, acids, oxosalts...)
    if (FORMULA_WHITELIST.has(formula)) {
      return { ok: true, formula, atoms, elements };
    }

    // 3c. Ionic / Salt / Base / Oxide Cation + Anion Validation
    const split = splitIonicFormula(formula);
    if (split) {
      const { cation, cCount, anion, aCount, missingParens } = split;
      const catEl = cation === 'NH4' ? null : eMap.get(cation);
      const anEl = !anion.polyatomic ? eMap.get(anion.formula) : null;

      // Reject same element on both sides or two metals
      if (cation === anion.formula) {
        return { ok: false, empty: false, step: 3, formula, error: d.errInvalidCompound(formula), suggestions: [] };
      }
      if (catEl && anEl && catEl.macro === 'metal' && anEl.macro === 'metal') {
        return { ok: false, empty: false, step: 3, formula, error: d.errMetalMetalCompound(formula), suggestions: [] };
      }

      // Polyatomic oxoanions/hydroxide only combine with metals, H, or NH4
      if (anion.polyatomic && cation !== 'NH4' && cation !== 'H' && catEl && catEl.macro !== 'metal') {
        return { ok: false, empty: false, step: 3, formula, error: d.errInvalidCompound(formula), suggestions: [] };
      }

      const validValences = getValidCationValences(cation, anion.formula);
      if (validValences.length === 0) {
        return { ok: false, empty: false, step: 3, formula, error: d.errInvalidCompound(formula), suggestions: [] };
      }

      // Build criss-cross suggestions for cation + anion
      const buildSuggestions = () => {
        const list = [];
        // Prefer standard common valences (limit to 3 cleanest suggestions)
        const candValences = validValences.slice(0, 3);
        candValences.forEach((v) => {
          const f = buildIonicFormula(cation, v, anion.formula);
          if (f && f !== formula && !list.includes(f)) {
            list.push(f);
          }
        });
        return list;
      };

      // Missing parentheses around polyatomic anion (e.g. CaOH2 -> Ca(OH)2)
      if (missingParens) {
        return {
          ok: false,
          empty: false,
          step: 3,
          formula,
          error: d.errMissingParens(formula, anion.formula),
          suggestions: buildSuggestions()
        };
      }

      const totalAnionCharge = aCount * anion.charge; // negative
      const matchingValence = validValences.find((v) => cCount * v + totalAnionCharge === 0);

      if (matchingValence !== undefined) {
        // Ensure reduced ratio for ionic compounds (e.g. block Na2Cl2 -> NaCl, Mg2O2 -> MgO)
        const isIonicPair = cation === 'NH4' || (catEl && catEl.macro === 'metal') || anion.polyatomic;
        if (isIonicPair && numGcd(cCount, aCount) > 1) {
          const reduced = buildIonicFormula(cation, matchingValence, anion.formula);
          return {
            ok: false,
            empty: false,
            step: 3,
            formula,
            error: d.errUnreducedRatio(formula),
            suggestions: reduced && reduced !== formula ? [reduced] : []
          };
        }
        return { ok: true, formula, atoms, elements };
      }

      // Valence mismatch -> report clear reason + criss-cross suggestions
      const valStr = validValences.map((v) => `+${v}`).join(', ');
      const anChargeStr = `${anion.charge}`;
      return {
        ok: false,
        empty: false,
        step: 3,
        formula,
        error: d.errValenceMismatch(formula, cation, valStr, anion.formula, anChargeStr),
        suggestions: buildSuggestions()
      };
    }

    // 3d. Fallback: Check digit '0' typo for 'O' or uppercase 'I' typo for 'l' (e.g. K2Cr207 -> K2Cr2O7, NaCI -> NaCl)
    const suggestions = [];
    const zeroFixFallback = probeZeroAsO();
    if (zeroFixFallback) {
      return {
        ok: false,
        empty: false,
        step: 1,
        formula,
        error: d.errZeroAsO(formula, '0'),
        suggestions: [zeroFixFallback]
      };
    }
    if (!skipTypoProbe && formula.includes('CI')) {
      const probeCl = formula.replace(/CI/g, 'Cl');
      if (probeCl !== formula && isValidCandidateFormula(probeCl)) {
        suggestions.push(probeCl);
      }
    }

    // Check if two metals combined (e.g. NaFe, CuZn)
    if (elements.length >= 2 && elements.every((sym) => eMap.get(sym)?.macro === 'metal')) {
      return {
        ok: false,
        empty: false,
        step: 3,
        formula,
        error: d.errMetalMetalCompound(formula),
        suggestions
      };
    }

    return {
      ok: false,
      empty: false,
      step: 3,
      formula,
      error: d.errInvalidCompound(formula),
      suggestions
    };
  }

  // =========================================================================
  // EXACT BIGINT RATIONAL EQUATION BALANCER (GAUSS-JORDAN RREF + VERIFY)
  // =========================================================================
  function bigAbs(n) {
    return n < 0n ? -n : n;
  }

  function bigGcd(a, b) {
    a = bigAbs(a);
    b = bigAbs(b);
    while (b !== 0n) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a === 0n ? 1n : a;
  }

  function bigLcm(a, b) {
    if (a === 0n || b === 0n) return 0n;
    return bigAbs((a / bigGcd(a, b)) * b);
  }

  function makeFrac(num, den = 1n) {
    if (den === 0n) throw new Error('Division by zero in rational balancer');
    if (num === 0n) return { num: 0n, den: 1n };
    if (den < 0n) {
      num = -num;
      den = -den;
    }
    const g = bigGcd(num, den);
    return { num: num / g, den: den / g };
  }

  function fSub(a, b) {
    return makeFrac(a.num * b.den - b.num * a.den, a.den * b.den);
  }

  function fMul(a, b) {
    return makeFrac(a.num * b.num, a.den * b.den);
  }

  function fDiv(a, b) {
    return makeFrac(a.num * b.den, a.den * b.num);
  }

  function fNeg(a) {
    return { num: -a.num, den: a.den };
  }

  function fIsZero(a) {
    return a.num === 0n;
  }

  function verifyBalancedEquation(parsedReactants, parsedProducts, rCoeffs, pCoeffs) {
    if (rCoeffs.length !== parsedReactants.length || pCoeffs.length !== parsedProducts.length) return false;
    for (let i = 0; i < rCoeffs.length; i++) {
      if (!Number.isInteger(rCoeffs[i]) || rCoeffs[i] < 1) return false;
    }
    for (let i = 0; i < pCoeffs.length; i++) {
      if (!Number.isInteger(pCoeffs[i]) || pCoeffs[i] < 1) return false;
    }

    const lhs = Object.create(null);
    const rhs = Object.create(null);

    parsedReactants.forEach((p, idx) => {
      const c = rCoeffs[idx];
      for (const [el, cnt] of Object.entries(p.atoms)) {
        lhs[el] = (lhs[el] || 0) + cnt * c;
      }
    });
    parsedProducts.forEach((p, idx) => {
      const c = pCoeffs[idx];
      for (const [el, cnt] of Object.entries(p.atoms)) {
        rhs[el] = (rhs[el] || 0) + cnt * c;
      }
    });

    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);
    if (lhsKeys.length === 0 || lhsKeys.length !== rhsKeys.length) return false;

    for (let i = 0; i < lhsKeys.length; i++) {
      const el = lhsKeys[i];
      if (lhs[el] !== rhs[el] || lhs[el] <= 0) return false;
    }
    return true;
  }

  function balanceEquation(reactantFormulas, productFormulas) {
    if (!reactantFormulas.length || !productFormulas.length) return null;

    const parsedR = reactantFormulas.map((f) => parseFormulaSyntax(resolveChemicalFormula(f), { allowSquare: true }));
    const parsedP = productFormulas.map((f) => parseFormulaSyntax(resolveChemicalFormula(f), { allowSquare: true }));
    if (parsedR.some((p) => !p.ok) || parsedP.some((p) => !p.ok)) return null;

    // Collect distinct elements & verify LHS and RHS element sets match
    const lhsElSet = new Set();
    const rhsElSet = new Set();
    parsedR.forEach((p) => p.elements.forEach((e) => lhsElSet.add(e)));
    parsedP.forEach((p) => p.elements.forEach((e) => rhsElSet.add(e)));

    if (lhsElSet.size !== rhsElSet.size) return null;
    for (const el of lhsElSet) {
      if (!rhsElSet.has(el)) return null;
    }

    const elList = Array.from(lhsElSet);
    const R = parsedR.length;
    const P = parsedP.length;
    const N = R + P;
    const M = elList.length;

    // Build M x N matrix of exact BigInt Fractions
    const mat = [];
    for (let i = 0; i < M; i++) {
      const el = elList[i];
      const row = [];
      for (let j = 0; j < R; j++) {
        row.push(makeFrac(BigInt(parsedR[j].atoms[el] || 0), 1n));
      }
      for (let k = 0; k < P; k++) {
        row.push(makeFrac(-BigInt(parsedP[k].atoms[el] || 0), 1n));
      }
      mat.push(row);
    }

    // Gauss-Jordan Elimination to Reduced Row Echelon Form (RREF)
    let pivotRow = 0;
    const pivotCols = [];

    for (let col = 0; col < N && pivotRow < M; col++) {
      let found = -1;
      for (let r = pivotRow; r < M; r++) {
        if (!fIsZero(mat[r][col])) {
          found = r;
          break;
        }
      }
      if (found === -1) continue;

      if (found !== pivotRow) {
        const tmp = mat[pivotRow];
        mat[pivotRow] = mat[found];
        mat[found] = tmp;
      }

      const pivotVal = mat[pivotRow][col];
      for (let c = col; c < N; c++) {
        mat[pivotRow][c] = fDiv(mat[pivotRow][c], pivotVal);
      }

      for (let r = 0; r < M; r++) {
        if (r === pivotRow || fIsZero(mat[r][col])) continue;
        const factor = mat[r][col];
        for (let c = col; c < N; c++) {
          mat[r][c] = fSub(mat[r][c], fMul(factor, mat[pivotRow][c]));
        }
      }

      pivotCols.push(col);
      pivotRow++;
    }

    const pivotSet = new Set(pivotCols);
    const freeCols = [];
    for (let c = 0; c < N; c++) {
      if (!pivotSet.has(c)) freeCols.push(c);
    }
    if (freeCols.length === 0) return null;

    // Construct basis vectors of the null space
    const basis = freeCols.map((fc) => {
      const vec = new Array(N).fill(null).map(() => makeFrac(0n, 1n));
      vec[fc] = makeFrac(1n, 1n);
      for (let r = 0; r < pivotCols.length; r++) {
        const pc = pivotCols[r];
        vec[pc] = fNeg(mat[r][fc]);
      }
      return vec;
    });

    // Combine basis (for standard 1D nullspace, takes basis[0])
    const sol = new Array(N).fill(null).map(() => makeFrac(0n, 1n));
    for (let b = 0; b < basis.length; b++) {
      for (let c = 0; c < N; c++) {
        sol[c] = makeFrac(sol[c].num * basis[b][c].den + basis[b][c].num * sol[c].den, sol[c].den * basis[b][c].den);
      }
    }

    // Convert rational vector to smallest positive integers
    let commonDen = 1n;
    for (let c = 0; c < N; c++) {
      commonDen = bigLcm(commonDen, sol[c].den);
    }
    let intVec = sol.map((f) => f.num * (commonDen / f.den));

    if (intVec.every((v) => v < 0n)) {
      intVec = intVec.map((v) => -v);
    }
    if (intVec.some((v) => v <= 0n)) return null;

    let overallGcd = intVec[0];
    for (let c = 1; c < N; c++) {
      overallGcd = bigGcd(overallGcd, intVec[c]);
    }
    intVec = intVec.map((v) => v / overallGcd);

    const numVec = intVec.map((v) => Number(v));
    const reactantCoeffs = numVec.slice(0, R);
    const productCoeffs = numVec.slice(R);

    // Mandatory post-verification of exact atom conservation
    if (!verifyBalancedEquation(parsedR, parsedP, reactantCoeffs, productCoeffs)) {
      return null;
    }

    return { reactantCoeffs, productCoeffs };
  }

  // =========================================================================
  // SOLUBILITY & SUBSTANCE CLASSIFIER FOR TIER 2 INFERENCE
  // =========================================================================

  // Returns 'soluble' | 'slightly' | 'insoluble'
  function getSolubility(cation, anionFormula) {
    // Always soluble cations
    if (cation === 'Na' || cation === 'K' || cation === 'NH4' || cation === 'Rb' || cation === 'Cs') {
      return 'soluble';
    }
    if (cation === 'Li') {
      if (anionFormula === 'CO3' || anionFormula === 'PO4' || anionFormula === 'F') return 'insoluble';
      return 'soluble';
    }
    // Always soluble anions
    if (
      anionFormula === 'NO3' ||
      anionFormula === 'CH3COO' ||
      anionFormula === 'HCO3' ||
      anionFormula === 'ClO3' ||
      anionFormula === 'ClO4' ||
      anionFormula === 'MnO4' ||
      anionFormula === 'HSO4' ||
      anionFormula === 'H2PO4'
    ) {
      return 'soluble';
    }

    // Halides Cl-, Br-, I-
    if (anionFormula === 'Cl' || anionFormula === 'Br' || anionFormula === 'I') {
      if (cation === 'Ag' || cation === 'Pb' || cation === 'Hg') {
        if (cation === 'Hg' && anionFormula === 'Cl') return 'soluble'; // HgCl2 is soluble; Hg2Cl2 insoluble
        return 'insoluble';
      }
      return 'soluble';
    }

    // Fluoride F-
    if (anionFormula === 'F') {
      if (cation === 'Ca' || cation === 'Mg' || cation === 'Ba' || cation === 'Sr' || cation === 'Pb') {
        return 'insoluble';
      }
      return 'soluble';
    }

    // Sulfate SO4^2-
    if (anionFormula === 'SO4') {
      if (cation === 'Ba' || cation === 'Pb' || cation === 'Sr' || cation === 'Ra') return 'insoluble';
      if (cation === 'Ca' || cation === 'Ag') return 'slightly';
      return 'soluble';
    }

    // Hydroxide OH-
    if (anionFormula === 'OH') {
      if (cation === 'Ba' || cation === 'Sr') return 'soluble';
      if (cation === 'Ca') return 'slightly'; // Limewater — treated as soluble base in reactions
      return 'insoluble';
    }

    // Sulfide S^2-
    if (anionFormula === 'S') {
      if (cation === 'Ba' || cation === 'Ca' || cation === 'Sr' || cation === 'Mg') {
        return 'soluble'; // Soluble / hydrolyzes in water
      }
      return 'insoluble';
    }

    // Carbonate, Sulfite, Phosphate, Silicate
    if (anionFormula === 'CO3' || anionFormula === 'SO3' || anionFormula === 'PO4' || anionFormula === 'SiO3') {
      return 'insoluble';
    }

    // Default reasonable behavior
    return 'soluble';
  }

  function isReactantSoluble(cation, anionFormula) {
    const sol = getSolubility(cation, anionFormula);
    return sol === 'soluble' || (anionFormula === 'OH' && sol === 'slightly');
  }

  // Classify a validated formula into chemical role for Tier 2
  function classifySubstance(formula) {
    const resolved = resolveChemicalFormula(formula);
    const parsed = parseFormulaSyntax(resolved, { allowSquare: true });
    if (!parsed.ok) return { kind: 'other', formula };
    const { atoms, elements } = parsed;
    const eMap = getElementMap();

    // Water
    if (resolved === 'H2O') {
      return { kind: 'water', formula };
    }

    // Elementary substance
    if (elements.length === 1) {
      const sym = elements[0];
      const el = eMap.get(sym);
      return {
        kind: 'element',
        formula,
        symbol: sym,
        el,
        isMetal: el?.macro === 'metal',
        isNonmetal: el?.macro === 'nonmetal',
        isMetalloid: el?.macro === 'metalloid',
        isNobleGas: el?.category === 'noble-gas'
      };
    }

    // Acid
    if (ACID_DEFS[formula]) {
      return {
        kind: 'acid',
        formula,
        ...ACID_DEFS[formula],
        strength: ACID_STRENGTH[formula] ?? 5
      };
    }

    // Neutral Oxides
    if (NEUTRAL_OXIDES.has(formula)) {
      return { kind: 'oxide', oxideType: 'neutral', formula };
    }

    // Acidic Oxides
    if (ACIDIC_OXIDE_ANION[formula]) {
      return {
        kind: 'oxide',
        oxideType: 'acidic',
        formula,
        oxyanion: ACIDIC_OXIDE_ANION[formula]
      };
    }

    // Split Ionic (Base, Basic/Amphoteric Oxide, Salt)
    const split = splitIonicFormula(formula);
    if (split && !split.missingParens) {
      const { cation, cCount, anion, aCount } = split;
      const cationValence = Math.round((aCount * Math.abs(anion.charge)) / cCount);

      // Base: M(OH)n or NH4OH
      if (anion.formula === 'OH' && cation !== 'H') {
        const sol = getSolubility(cation, 'OH');
        return {
          kind: 'base',
          formula,
          cation,
          cationValence,
          ohCount: aCount,
          soluble: sol === 'soluble' || sol === 'slightly',
          solubility: sol
        };
      }

      // Metal Oxide: MxOy
      if (anion.formula === 'O' && cation !== 'H' && cation !== 'NH4') {
        const catEl = eMap.get(cation);
        if (catEl && catEl.macro === 'metal') {
          const isAmphoteric = AMPHOTERIC_OXIDES.has(formula);
          const isSolubleBasic = SOLUBLE_BASIC_OXIDES.has(formula);
          return {
            kind: 'oxide',
            oxideType: isAmphoteric ? 'amphoteric' : 'basic',
            formula,
            cation,
            cationValence,
            solubleBasic: isSolubleBasic
          };
        }
      }

      // Acid (fallback if not in ACID_DEFS)
      if (cation === 'H') {
        return {
          kind: 'acid',
          formula,
          anion: anion.formula,
          hCount: cCount,
          strong: false,
          commonNonOx: false,
          strength: ACID_STRENGTH[formula] ?? 4
        };
      }

      // Salt
      const sol = getSolubility(cation, anion.formula);
      return {
        kind: 'salt',
        formula,
        cation,
        cationValence,
        cCount,
        anion: anion.formula,
        anionCharge: anion.charge,
        aCount,
        solubility: sol,
        soluble: sol === 'soluble',
        isAcidSalt: anion.formula === 'HCO3' || anion.formula === 'HSO4' || anion.formula === 'HSO3'
      };
    }

    return { kind: 'other', formula };
  }

  // Color / visual note for well-known precipitates & gases to enrich explanations
  const PRECIPITATE_TRAITS = {
    BaSO4: { vi: 'kết tủa trắng mịn không tan trong axit', en: 'fine white acid-insoluble precipitate' },
    AgCl: { vi: 'kết tủa trắng (hóa đen dần ngoài ánh sáng)', en: 'white precipitate (darkens in light)' },
    AgBr: { vi: 'kết tủa màu vàng nhạt', en: 'pale yellow precipitate' },
    AgI: { vi: 'kết tủa màu vàng đậm', en: 'deep yellow precipitate' },
    Ag2S: { vi: 'kết tủa màu đen', en: 'black precipitate' },
    Ag2O: { vi: 'kết tủa màu nâu đen', en: 'dark brown precipitate' },
    Ag3PO4: { vi: 'kết tủa màu vàng', en: 'yellow precipitate' },
    CaCO3: { vi: 'kết tủa màu trắng', en: 'white precipitate' },
    BaCO3: { vi: 'kết tủa màu trắng', en: 'white precipitate' },
    BaSO3: { vi: 'kết tủa màu trắng', en: 'white precipitate' },
    CuS: { vi: 'kết tủa màu đen', en: 'black precipitate' },
    PbS: { vi: 'kết tủa màu đen', en: 'black precipitate' },
    FeS: { vi: 'kết tủa màu đen', en: 'black precipitate' },
    PbI2: { vi: 'kết tủa màu vàng tươi', en: 'bright yellow precipitate' },
    PbSO4: { vi: 'kết tủa màu trắng', en: 'white precipitate' },
    PbCl2: { vi: 'kết tủa màu trắng', en: 'white precipitate' },
    'Cu(OH)2': { vi: 'kết tủa màu xanh lam', en: 'sky-blue precipitate' },
    'Fe(OH)2': { vi: 'kết tủa màu trắng xanh', en: 'pale greenish-white precipitate' },
    'Fe(OH)3': { vi: 'kết tủa màu nâu đỏ', en: 'reddish-brown precipitate' },
    'Al(OH)3': { vi: 'kết tủa keo màu trắng', en: 'white gelatinous precipitate' },
    'Mg(OH)2': { vi: 'kết tủa màu trắng', en: 'white precipitate' },
    'Zn(OH)2': { vi: 'kết tủa keo màu trắng', en: 'white gelatinous precipitate' },
    H2SiO3: { vi: 'kết tủa dạng keo trắng', en: 'white gelatinous silicic acid precipitate' }
  };

  const GAS_TRAITS = {
    H2: { vi: 'khí H₂ không màu, nhẹ hơn không khí', en: 'colorless, flammable H₂ gas' },
    CO2: { vi: 'khí CO₂ không màu, không mùi (làm đục nước vôi trong)', en: 'colorless, odorless CO₂ gas' },
    SO2: { vi: 'khí SO₂ không màu, có mùi hắc sốc', en: 'colorless, pungent SO₂ gas' },
    NH3: { vi: 'khí NH₃ không màu, có mùi khai đặc trưng (làm xanh quỳ tím ẩm)', en: 'colorless, pungent NH₃ gas (turns damp litmus blue)' },
    H2S: { vi: 'khí H₂S không màu, có mùi trứng thối', en: 'colorless H₂S gas with a rotten-egg odor' }
  };

  function makeBalancedResult(reactants, productsSpec, meta) {
    const bal = balanceEquation(reactants, productsSpec.map((p) => p.formula));
    if (!bal) return null;

    const displayReactants = meta.displayReactants || {};
    return {
      reacted: true,
      tier: meta.tier,
      source: meta.tier === 1 ? 'experimental' : 'rule',
      type: meta.type,
      reversible: Boolean(meta.reversible),
      catalyst: meta.catalyst || null,
      condVi: meta.condVi || '',
      condEn: meta.condEn || '',
      reactants: reactants.map((f, idx) => ({
        formula: f,
        displayFormula: displayReactants[f] || null,
        coeff: bal.reactantCoeffs[idx]
      })),
      products: productsSpec.map((p, idx) => ({
        formula: p.formula,
        displayFormula: p.displayFormula || null,
        coeff: bal.productCoeffs[idx],
        state: p.state || null
      })),
      phenVi: meta.phenVi || '',
      phenEn: meta.phenEn || '',
      expVi: meta.expVi || '',
      expEn: meta.expEn || '',
      spectator: meta.spectator || null
    };
  }

  function makeNoReactionResult(reactants, phenVi, phenEn, expVi, expEn, tier = 2) {
    return {
      reacted: false,
      tier,
      source: 'rule',
      type: 'no-reaction',
      condVi: '',
      condEn: '',
      reactants: reactants.map((f) => ({ formula: f, coeff: 1 })),
      products: [],
      phenVi,
      phenEn,
      expVi,
      expEn,
      spectator: null
    };
  }

  // Helper: expand unstable products (H2CO3, H2SO3, NH4OH, AgOH, H2S, H2SiO3)
  function expandProductSpec(formula, cation, anion) {
    if (formula === 'H2CO3') {
      return [
        { formula: 'H2O', state: null },
        { formula: 'CO2', state: 'gas' }
      ];
    }
    if (formula === 'H2SO3') {
      return [
        { formula: 'H2O', state: null },
        { formula: 'SO2', state: 'gas' }
      ];
    }
    if (formula === 'NH4OH') {
      return [
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ];
    }
    if (formula === 'AgOH') {
      return [
        { formula: 'Ag2O', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ];
    }
    if (formula === 'H2S') {
      return [{ formula: 'H2S', state: 'gas' }];
    }
    if (formula === 'H2SiO3') {
      return [{ formula: 'H2SiO3', state: 'precipitate' }];
    }
    if (formula === 'H2O') {
      return [{ formula: 'H2O', state: null }];
    }
    if (cation && anion) {
      const sol = getSolubility(cation, anion);
      if (sol === 'insoluble') {
        return [{ formula, state: 'precipitate' }];
      }
      if (sol === 'slightly' && (formula === 'CaSO4' || formula === 'Ag2SO4')) {
        return [{ formula, state: 'precipitate', slightlySoluble: true }];
      }
    }
    return [{ formula, state: null }];
  }

  function mergeDuplicateProducts(list) {
    const map = new Map();
    list.forEach((item) => {
      if (!map.has(item.formula)) {
        map.set(item.formula, { ...item });
      }
    });
    return Array.from(map.values());
  }

  // =========================================================================
  // TIER 1 LOOKUP
  // =========================================================================
  function lookupTier1(formulas) {
    const key = formulas.slice().sort().join('+');
    const entry = TIER1_MAP.get(key);
    if (!entry) return null;

    if (entry.noReaction) {
      return makeNoReactionResult(formulas, entry.phenVi, entry.phenEn, entry.expVi, entry.expEn, 1);
    }

    // Remove catalyst from LHS (moved onto reaction arrow) & append aqueous solvent reactants if needed
    let lhsFormulas = entry.catalyst
      ? formulas.filter((f) => f !== entry.catalyst)
      : formulas.slice();

    if (Array.isArray(entry.extraReactants)) {
      entry.extraReactants.forEach((extra) => {
        if (!lhsFormulas.includes(extra)) lhsFormulas.push(extra);
      });
    }

    // Preserve user input order on LHS
    return makeBalancedResult(lhsFormulas, entry.products, {
      tier: 1,
      type: entry.type,
      reversible: Boolean(entry.reversible),
      catalyst: entry.catalyst || null,
      displayReactants: entry.displayReactants || null,
      condVi: entry.condVi,
      condEn: entry.condEn,
      phenVi: entry.phenVi,
      phenEn: entry.phenEn,
      expVi: entry.expVi,
      expEn: entry.expEn
    });
  }

  // =========================================================================
  // TIER 2 RULE-BASED INFERENCE ENGINE (2 REACTANTS)
  // =========================================================================
  function inferTier2Pair(fA, fB) {
    const cA = classifySubstance(fA);
    const cB = classifySubstance(fB);
    const pair = [cA, cB];
    const findKind = (k) => pair.find((x) => x.kind === k);
    const findOther = (first) => (first === cA ? cB : cA);

    // --- RULE 1: ACID + BASE -> SALT + H2O (Neutralization) ---
    if ((cA.kind === 'acid' && cB.kind === 'base') || (cA.kind === 'base' && cB.kind === 'acid')) {
      const acid = findKind('acid');
      const base = findKind('base');

      // Very weak acid (H2CO3, H2S, H2SiO3) does not dissolve insoluble hydroxide well
      if (!base.soluble && acid.strength <= 2) {
        return makeNoReactionResult(
          [fA, fB],
          `Không quan sát thấy phản ứng rõ rệt giữa bazơ không tan ${formatFormulaUnicode(base.formula)} và axit rất yếu ${formatFormulaUnicode(acid.formula)}.`,
          `No noticeable reaction between insoluble base ${formatFormulaUnicode(base.formula)} and very weak acid ${formatFormulaUnicode(acid.formula)}.`,
          `Axit yếu ${formatFormulaUnicode(acid.formula)} phân li rất ít ion H⁺ nên không đủ mạnh để hòa tan kết tủa ${formatFormulaUnicode(base.formula)}.`,
          `Weak acid ${formatFormulaUnicode(acid.formula)} dissociates minimally and cannot effectively dissolve insoluble ${formatFormulaUnicode(base.formula)}.`
        );
      }

      const saltFormula = buildIonicFormula(base.cation, base.cationValence, acid.anion);
      if (saltFormula) {
        const saltSpecs = expandProductSpec(saltFormula, base.cation, acid.anion);
        const products = mergeDuplicateProducts([...saltSpecs, { formula: 'H2O', state: null }]);
        const hasPpt = products.find((p) => p.state === 'precipitate');
        const pptTrait = hasPpt && PRECIPITATE_TRAITS[hasPpt.formula];

        const phenVi = hasPpt
          ? `Phản ứng tỏa nhiệt, xuất hiện ${pptTrait ? pptTrait.vi : 'kết tủa'} ${formatFormulaUnicode(hasPpt.formula)} và tạo nước.`
          : base.soluble
            ? `Phản ứng trung hòa tỏa nhiệt nhẹ, tạo dung dịch muối ${formatFormulaUnicode(saltFormula)} trong suốt và nước (pH tiến về trung tính).`
            : `Bazơ không tan ${formatFormulaUnicode(base.formula)} tan dần trong dung dịch axit ${formatFormulaUnicode(acid.formula)} tạo dung dịch muối ${formatFormulaUnicode(saltFormula)}.`;

        const phenEn = hasPpt
          ? `Exothermic neutralization forming ${pptTrait ? pptTrait.en : 'precipitate'} ${formatFormulaUnicode(hasPpt.formula)} and water.`
          : base.soluble
            ? `Exothermic neutralization producing a clear aqueous solution of ${formatFormulaUnicode(saltFormula)} and water (pH approaches neutral).`
            : `Insoluble hydroxide ${formatFormulaUnicode(base.formula)} dissolves in ${formatFormulaUnicode(acid.formula)} to yield soluble salt ${formatFormulaUnicode(saltFormula)}.`;

        const expVi = `Ion H⁺ từ axit ${formatFormulaUnicode(acid.formula)} kết hợp với ion OH⁻ từ bazơ ${formatFormulaUnicode(base.formula)} (kim loại ${base.cation} giữ nguyên hóa trị ${romanValence(base.cationValence)}) tạo thành phân tử H₂O bền vững và muối ${formatFormulaUnicode(saltFormula)}.`;
        const expEn = `H⁺ ions from ${formatFormulaUnicode(acid.formula)} combine with OH⁻ from ${formatFormulaUnicode(base.formula)} (preserving ${base.cation}(${romanValence(base.cationValence)}) valence) to form water and salt ${formatFormulaUnicode(saltFormula)}.`;

        const res = makeBalancedResult([fA, fB], products, {
          tier: 2,
          type: 'neutralization',
          phenVi,
          phenEn,
          expVi,
          expEn
        });
        if (res) return res;
      }
    }

    // --- RULE 2: METAL + ACID ---
    if ((cA.kind === 'element' && cA.isMetal && cB.kind === 'acid') ||
        (cB.kind === 'element' && cB.isMetal && cA.kind === 'acid')) {
      const metal = cA.kind === 'element' ? cA : cB;
      const acid = cA.kind === 'acid' ? cA : cB;
      const mSym = metal.symbol;

      if (metal.el.number >= 100) {
        return makeNoReactionResult(
          [fA, fB],
          `Chưa xác định phản ứng vĩ mô với nguyên tố phóng xạ siêu nặng ${mSym} (Z = ${metal.el.number}).`,
          `Bulk chemical reaction undetermined for synthetic superheavy element ${mSym} (Z = ${metal.el.number}).`,
          `Nguyên tố siêu nặng Z ≥ 100 có chu kì bán rã cực ngắn, không thực hiện phản ứng hóa học thông thường.`,
          `Superheavy elements (Z ≥ 100) decay in fractions of a second and lack standard bulk reactions.`
        );
      }

      // Special handling for oxidizing HNO3 with other metals not in Tier 1
      if (acid.formula === 'HNO3') {
        if (mSym === 'Au' || mSym === 'Pt') {
          return makeNoReactionResult(
            [fA, fB],
            `Kim loại quý ${mSym} không tan trong axit nitric HNO₃ đơn lẻ.`,
            `Noble metal ${mSym} does not dissolve in nitric acid (HNO₃) alone.`,
            `${mSym} cực kỳ trơ hóa học, chỉ có thể bị hòa tan trong nước cường toan (hỗn hợp HCl đặc + HNO₃ đặc).`,
            `${mSym} is chemically noble and requires aqua regia (conc. HCl + conc. HNO₃) to dissolve.`
          );
        }
        const highVal = mSym === 'Fe' ? 3 : (PRIMARY_METAL_VALENCE[mSym] || parsePositiveOxidationStates(metal.el)[0] || 2);
        const nitrate = buildIonicFormula(mSym, highVal, 'NO3');
        if (nitrate) {
          const res = makeBalancedResult(
            [fA, fB],
            [
              { formula: nitrate, state: null },
              { formula: 'NO', state: 'gas' },
              { formula: 'H2O', state: null }
            ],
            {
              tier: 2,
              type: 'redox',
              condVi: 'loãng',
              condEn: 'dil.',
              phenVi: `Kim loại ${mSym} tan trong HNO₃ loãng tạo dung dịch muối ${formatFormulaUnicode(nitrate)} và giải phóng khí NO không màu (hóa nâu trong không khí).`,
              phenEn: `${mSym} dissolves in dilute HNO₃ to form ${formatFormulaUnicode(nitrate)} solution while evolving colorless NO gas (turns brown in air).`,
              expVi: `HNO₃ là axit có tính oxi hóa mạnh nên không giải phóng H₂ mà khử N(+5) xuống các sản phẩm khử như NO hoặc NO₂.`,
              expEn: `Because HNO₃ is a strongly oxidizing acid, nitrate nitrogen N(+5) is reduced to NO/NO₂ instead of evolving H₂.`
            }
          );
          if (res) return res;
        }
      }

      // Common non-oxidizing acids: HCl, H2SO4 (dilute), HBr, HI, H3PO4, CH3COOH
      const hIdx = ACTIVITY_SERIES.indexOf('H');
      const mIdx = ACTIVITY_SERIES.indexOf(mSym);

      if (mIdx === -1) {
        // Rare metal not in core series: check electronegativity/group fallback
        if (metal.el.electronegativity !== null && metal.el.electronegativity > 2.0) {
          return makeNoReactionResult(
            [fA, fB],
            `Không xảy ra phản ứng giữa ${mSym} và dung dịch axit ${formatFormulaUnicode(acid.formula)} loãng.`,
            `No reaction between ${mSym} and dilute ${formatFormulaUnicode(acid.formula)}.`,
            `Kim loại ${mSym} có tính khử yếu, không đẩy được H₂ ra khỏi dung dịch axit loãng thông thường.`,
            `${mSym} has low reducing activity and does not displace hydrogen from dilute non-oxidizing acids.`
          );
        }
      } else if (mIdx > hIdx) {
        const extraH2SO4Vi = acid.formula === 'H2SO4'
          ? ' (Lưu ý: chỉ có thể phản ứng với H₂SO₄ đặc, nóng theo cơ chế oxi hóa - khử).'
          : '';
        const extraH2SO4En = acid.formula === 'H2SO4'
          ? ' (Note: hot concentrated H₂SO₄ is required for an oxidizing reaction.)'
          : '';
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng: ${mSym} không tan trong dung dịch ${formatFormulaUnicode(acid.formula)} loãng.`,
          `No reaction: ${mSym} does not dissolve in dilute ${formatFormulaUnicode(acid.formula)}.`,
          `Trong dãy hoạt động hóa học, ${mSym} đứng sau H nên không thể đẩy hiđro (H₂) ra khỏi dung dịch axit thường.${extraH2SO4Vi}`,
          `In the reactivity series, ${mSym} lies below H and cannot displace H₂ from common dilute acids.${extraH2SO4En}`
        );
      }

      if (!acid.commonNonOx && acid.strength <= 2) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng rõ rệt giữa ${mSym} và axit rất yếu ${formatFormulaUnicode(acid.formula)}.`,
          `No significant reaction between ${mSym} and very weak acid ${formatFormulaUnicode(acid.formula)}.`,
          `Axit ${formatFormulaUnicode(acid.formula)} quá yếu, nồng độ ion H⁺ rất thấp.`,
          `${formatFormulaUnicode(acid.formula)} is too weak an acid to noticeably attack ${mSym}.`
        );
      }

      const valence = PRIMARY_METAL_VALENCE[mSym] || parsePositiveOxidationStates(metal.el)[0] || 2;
      const saltFormula = buildIonicFormula(mSym, valence, acid.anion);
      if (saltFormula) {
        const saltSpecs = expandProductSpec(saltFormula, mSym, acid.anion);
        const products = [...saltSpecs, { formula: 'H2', state: 'gas' }];
        const feNoteVi = mSym === 'Fe'
          ? ' (Lưu ý: với axit thường không có tính oxi hóa, Fe chỉ lên mức oxi hóa +2 tạo muối sắt(II)).'
          : '';
        const feNoteEn = mSym === 'Fe'
          ? ' (Note: non-oxidizing acids oxidize Fe only to iron(II), Fe²⁺.)'
          : '';
        const pbNoteVi = mSym === 'Pb' && (acid.formula === 'H2SO4' || acid.formula === 'HCl')
          ? ' Thực tế phản ứng sớm dừng lại do lớp muối chì không tan bao phủ bề mặt kim loại.'
          : '';
        const pbNoteEn = mSym === 'Pb' && (acid.formula === 'H2SO4' || acid.formula === 'HCl')
          ? ' In practice, the reaction quickly passivates as an insoluble lead salt coats the metal.'
          : '';

        const res = makeBalancedResult([fA, fB], products, {
          tier: 2,
          type: 'displacement',
          condVi: acid.formula === 'H2SO4' ? 'loãng' : '',
          condEn: acid.formula === 'H2SO4' ? 'dil.' : '',
          phenVi: `Kim loại ${mSym} tan dần trong dung dịch ${formatFormulaUnicode(acid.formula)}, sủi bọt khí H₂ không màu.${pbNoteVi}`,
          phenEn: `${mSym} dissolves in ${formatFormulaUnicode(acid.formula)}, releasing colorless H₂ gas bubbles.${pbNoteEn}`,
          expVi: `${mSym} đứng trước H trong dãy hoạt động hóa học nên đẩy được H₂ ra khỏi dung dịch axit tạo muối ${formatFormulaUnicode(saltFormula)}.${feNoteVi}`,
          expEn: `${mSym} sits above H in the reactivity series, displacing H₂ gas to form salt ${formatFormulaUnicode(saltFormula)}.${feNoteEn}`
        });
        if (res) return res;
      }
    }

    // --- RULE 3: METAL + SALT ---
    if ((cA.kind === 'element' && cA.isMetal && cB.kind === 'salt') ||
        (cB.kind === 'element' && cB.isMetal && cA.kind === 'salt')) {
      const metal = cA.kind === 'element' ? cA : cB;
      const salt = cA.kind === 'salt' ? cA : cB;
      const mSym = metal.symbol;

      if (!salt.soluble) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng vì muối ${formatFormulaUnicode(salt.formula)} không tan trong nước.`,
          `No reaction because salt ${formatFormulaUnicode(salt.formula)} is insoluble in water.`,
          `Phản ứng đẩy kim loại từ dung dịch muối đòi hỏi muối tham gia phải tan để tạo ion kim loại tự do trong dung dịch.`,
          `Single displacement requires a soluble salt so metal cations are free in aqueous solution.`
        );
      }

      // Special critical exception: Alkali / reactive alkaline-earth metals (K, Na, Ca, Ba, Li...) in aqueous salt solution
      if (ALKALI_WATER_REACTIVE.has(mSym)) {
        const mVal = PRIMARY_METAL_VALENCE[mSym] || 1;
        const baseFormula = buildIonicFormula(mSym, mVal, 'OH');
        // Check if resulting base reacts with the salt
        const hydroxideProduct = salt.cation === 'NH4'
          ? 'NH4OH'
          : buildIonicFormula(salt.cation, salt.cationValence, 'OH');
        const newSaltFormula = buildIonicFormula(mSym, mVal, salt.anion);

        const canPptOrGas =
          salt.cation !== mSym &&
          (salt.cation === 'NH4' || getSolubility(salt.cation, 'OH') === 'insoluble');

        if (canPptOrGas && hydroxideProduct && newSaltFormula) {
          const ohExpanded = expandProductSpec(hydroxideProduct, salt.cation, 'OH');
          const saltExpanded = expandProductSpec(newSaltFormula, mSym, salt.anion);
          // For NH4+ salt: 2Na + 2NH4Cl -> 2NaCl + 2NH3 + H2 (H2O cancels!)
          if (salt.cation === 'NH4') {
            const products = mergeDuplicateProducts([
              ...saltExpanded,
              { formula: 'NH3', state: 'gas' },
              { formula: 'H2', state: 'gas' }
            ]);
            const res = makeBalancedResult([fA, fB], products, {
              tier: 2,
              type: 'redox',
              condVi: 'dd (có H₂O)',
              condEn: 'aq (with H₂O)',
              phenVi: `${mSym} phản ứng mãnh liệt với nước trong dung dịch, thoát ra đồng thời khí H₂ không màu và khí NH₃ mùi khai.`,
              phenEn: `${mSym} reacts vigorously with water in the solution, releasing both H₂ gas and pungent NH₃ gas.`,
              expVi: `Ngoại lệ quan trọng: Kim loại kiềm/kiềm thổ ${mSym} không đẩy trực tiếp cation muối mà phản ứng với H₂O trước tạo bazơ ${formatFormulaUnicode(baseFormula)} + H₂↑, sau đó ${formatFormulaUnicode(baseFormula)} tác dụng với muối amoni giải phóng NH₃↑.`,
              expEn: `Important exception: Active metal ${mSym} reacts with water first to form ${formatFormulaUnicode(baseFormula)} + H₂↑, and the base then reacts with ammonium ions to liberate NH₃↑.`
            });
            if (res) return res;
          } else {
            // Net aqueous reaction including H2O: e.g. 2Na + CuSO4 + 2H2O -> Cu(OH)2↓ + Na2SO4 + H2↑
            const products = mergeDuplicateProducts([
              ...ohExpanded,
              ...saltExpanded,
              { formula: 'H2', state: 'gas' }
            ]);
            const pptItem = products.find((p) => p.state === 'precipitate');
            const pptTrait = pptItem && PRECIPITATE_TRAITS[pptItem.formula];
            const res = makeBalancedResult([fA, fB, 'H2O'], products, {
              tier: 2,
              type: 'redox',
              condVi: 'trong dung dịch',
              condEn: 'in aqueous sol.',
              phenVi: `${mSym} chạy trên mặt dung dịch, sủi bọt khí H₂ mạnh và xuất hiện ${pptTrait ? pptTrait.vi : 'kết tủa'} ${pptItem ? formatFormulaUnicode(pptItem.formula) : ''} (không thu được kim loại ${salt.cation}).`,
              phenEn: `${mSym} reacts violently with vigorous H₂ gas bubbles and forms ${pptTrait ? pptTrait.en : 'precipitate'} ${pptItem ? formatFormulaUnicode(pptItem.formula) : ''} (metallic ${salt.cation} is NOT displaced).`,
              expVi: `Ngoại lệ quan trọng: Kim loại kiềm/kiềm thổ ${mSym} phản ứng với H₂O trong dung dịch trước tạo bazơ ${formatFormulaUnicode(baseFormula)} + H₂↑, sau đó ${formatFormulaUnicode(baseFormula)} mới trao đổi với ${formatFormulaUnicode(salt.formula)} tạo kết tủa ${pptItem ? formatFormulaUnicode(pptItem.formula) : ''}.`,
              expEn: `Important exception: Alkali/alkaline-earth metal ${mSym} reacts with water first to form ${formatFormulaUnicode(baseFormula)} + H₂↑; the resulting base then precipitates ${pptItem ? formatFormulaUnicode(pptItem.formula) : ''} from ${formatFormulaUnicode(salt.formula)}.`
            });
            if (res) return res;
          }
        } else {
          // Reacts only with water; salt acts as spectator!
          const res = makeBalancedResult([mSym, 'H2O'], [
            { formula: baseFormula, state: null },
            { formula: 'H2', state: 'gas' }
          ], {
            tier: 2,
            type: 'redox',
            condVi: 'trong dung dịch',
            condEn: 'in aqueous sol.',
            phenVi: `${mSym} chỉ phản ứng mãnh liệt với nước tạo dung dịch kiềm ${formatFormulaUnicode(baseFormula)} và khí H₂↑; muối ${formatFormulaUnicode(salt.formula)} không bị kết tủa.`,
            phenEn: `${mSym} reacts vigorously only with the water solvent to produce ${formatFormulaUnicode(baseFormula)} and H₂↑; ${formatFormulaUnicode(salt.formula)} remains unreacted.`,
            expVi: `Ngoại lệ quan trọng: ${mSym} là kim loại kiềm/kiềm thổ nên ưu tiên khử H₂O trước tạo ${formatFormulaUnicode(baseFormula)}, và vì ${formatFormulaUnicode(baseFormula)} không tạo kết tủa hay khí với ${formatFormulaUnicode(salt.formula)} nên muối chỉ đóng vai trò chất nền.`,
            expEn: `Important exception: ${mSym} reacts with water first to form ${formatFormulaUnicode(baseFormula)}, which has no precipitation or gas-forming reaction with ${formatFormulaUnicode(salt.formula)}.`,
            spectator: salt.formula
          });
          if (res) return res;
        }
      }

      // Standard metal + soluble salt displacement
      if (salt.cation === mSym) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng vì kim loại ${mSym} và cation trong muối đều là cùng một nguyên tố.`,
          `No reaction because ${mSym} is already the same metal as the salt cation.`,
          `Kim loại không đẩy chính ion cùng hóa trị của nó ra khỏi muối.`,
          `A metal cannot displace its own cation at the same oxidation state.`
        );
      }

      if (salt.cation === 'NH4') {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng thế trực tiếp giữa ${mSym} và muối amoni ${formatFormulaUnicode(salt.formula)}.`,
          `No direct single-displacement reaction between ${mSym} and ammonium salt ${formatFormulaUnicode(salt.formula)}.`,
          `Kim loại ${mSym} không đẩy được ion NH₄⁺ ra khỏi dung dịch muối ở điều kiện thường.`,
          `${mSym} does not directly displace NH₄⁺ from aqueous solution at standard conditions.`
        );
      }

      const idx1 = ACTIVITY_SERIES.indexOf(mSym);
      const idx2 = ACTIVITY_SERIES.indexOf(salt.cation);

      if (idx1 !== -1 && idx2 !== -1 && idx1 < idx2) {
        const mVal = PRIMARY_METAL_VALENCE[mSym] || parsePositiveOxidationStates(metal.el)[0] || 2;
        const newSalt = buildIonicFormula(mSym, mVal, salt.anion);
        if (newSalt) {
          const saltSpecs = expandProductSpec(newSalt, mSym, salt.anion);
          const products = [...saltSpecs, { formula: salt.cation, state: 'precipitate' }];
          const res = makeBalancedResult([fA, fB], products, {
            tier: 2,
            type: 'displacement',
            phenVi: `Kim loại ${mSym} tan một phần, đồng thời kim loại ${salt.cation} tách ra bám lên bề mặt dưới dạng kết tủa rắn; màu dung dịch thay đổi theo ion muối mới ${formatFormulaUnicode(newSalt)}.`,
            phenEn: `${mSym} partially dissolves as elemental ${salt.cation} deposits out of solution, forming aqueous ${formatFormulaUnicode(newSalt)}.`,
            expVi: `Vì ${mSym} hoạt động hóa học mạnh hơn ${salt.cation} (đứng trước ${salt.cation} trong dãy hoạt động hóa học) nên ${mSym} khử được ion ${salt.cation} thành kim loại tự do.`,
            expEn: `Because ${mSym} is more reactive than ${salt.cation} (higher in the activity series), it reduces ${salt.cation} ions to solid metal.`
          });
          if (res) return res;
        }
      } else {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng: ${mSym} không đẩy được ${salt.cation} ra khỏi muối ${formatFormulaUnicode(salt.formula)}.`,
          `No reaction: ${mSym} cannot displace ${salt.cation} from ${formatFormulaUnicode(salt.formula)}.`,
          `Trong dãy hoạt động hóa học, ${mSym} đứng sau (hoạt động yếu hơn) ${salt.cation} nên không có khả năng khử ion ${salt.cation}.`,
          `In the reactivity series, ${mSym} is less reactive than ${salt.cation} and cannot displace it from solution.`
        );
      }
    }

    // --- RULE 4: OXIDES (+ ACID, + BASE, + H2O, + OXIDE) ---
    // 4a. Basic / Amphoteric Oxide + Acid -> Salt + H2O
    if ((cA.kind === 'oxide' && (cA.oxideType === 'basic' || cA.oxideType === 'amphoteric') && cB.kind === 'acid') ||
        (cB.kind === 'oxide' && (cB.oxideType === 'basic' || cB.oxideType === 'amphoteric') && cA.kind === 'acid')) {
      const oxide = cA.kind === 'oxide' ? cA : cB;
      const acid = cA.kind === 'acid' ? cA : cB;

      if (acid.strength <= 2) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng rõ rệt giữa oxit ${formatFormulaUnicode(oxide.formula)} và axit yếu ${formatFormulaUnicode(acid.formula)}.`,
          `No appreciable reaction between ${formatFormulaUnicode(oxide.formula)} and very weak acid ${formatFormulaUnicode(acid.formula)}.`,
          `Axit ${formatFormulaUnicode(acid.formula)} quá yếu để hòa tan oxit kim loại ${formatFormulaUnicode(oxide.formula)}.`,
          `${formatFormulaUnicode(acid.formula)} is too weak to dissolve metal oxide ${formatFormulaUnicode(oxide.formula)}.`
        );
      }

      const saltFormula = buildIonicFormula(oxide.cation, oxide.cationValence, acid.anion);
      if (saltFormula) {
        const saltSpecs = expandProductSpec(saltFormula, oxide.cation, acid.anion);
        const products = mergeDuplicateProducts([...saltSpecs, { formula: 'H2O', state: null }]);
        const res = makeBalancedResult([fA, fB], products, {
          tier: 2,
          type: 'exchange',
          phenVi: `Chất rắn ${formatFormulaUnicode(oxide.formula)} tan dần trong dung dịch axit ${formatFormulaUnicode(acid.formula)} tạo dung dịch muối ${formatFormulaUnicode(saltFormula)} và nước.`,
          phenEn: `Solid oxide ${formatFormulaUnicode(oxide.formula)} dissolves in ${formatFormulaUnicode(acid.formula)} to produce salt ${formatFormulaUnicode(saltFormula)} and water.`,
          expVi: `Oxit bazơ (hoặc lưỡng tính) tác dụng với axit tạo thành muối (giữ nguyên hóa trị ${romanValence(oxide.cationValence)} của ${oxide.cation}) và H₂O.`,
          expEn: `A basic (or amphoteric) metal oxide reacts with an acid to yield the corresponding ${oxide.cation}(${romanValence(oxide.cationValence)}) salt and water.`
        });
        if (res) return res;
      }
    }

    // 4b. Acidic Oxide + Soluble Base -> Salt + H2O
    if ((cA.kind === 'oxide' && cA.oxideType === 'acidic' && cB.kind === 'base') ||
        (cB.kind === 'oxide' && cB.oxideType === 'acidic' && cA.kind === 'base')) {
      const oxide = cA.kind === 'oxide' ? cA : cB;
      const base = cA.kind === 'base' ? cA : cB;

      if (!base.soluble) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng giữa oxit axit ${formatFormulaUnicode(oxide.formula)} và bazơ không tan ${formatFormulaUnicode(base.formula)}.`,
          `No reaction between acidic oxide ${formatFormulaUnicode(oxide.formula)} and insoluble base ${formatFormulaUnicode(base.formula)}.`,
          `Oxit axit chỉ phản ứng dễ dàng với dung dịch bazơ tan (kiềm).`,
          `Acidic oxides react readily only with soluble alkaline bases in solution.`
        );
      }

      const saltFormula = buildIonicFormula(base.cation, base.cationValence, oxide.oxyanion);
      if (saltFormula) {
        const saltSpecs = expandProductSpec(saltFormula, base.cation, oxide.oxyanion);
        const products = mergeDuplicateProducts([...saltSpecs, { formula: 'H2O', state: null }]);
        const ppt = products.find((p) => p.state === 'precipitate');
        const pptTrait = ppt && PRECIPITATE_TRAITS[ppt.formula];
        const isSiO2 = oxide.formula === 'SiO2';
        const res = makeBalancedResult([fA, fB], products, {
          tier: 2,
          type: 'exchange',
          condVi: isSiO2 ? 't° (kiềm đặc/nóng chảy)' : '',
          condEn: isSiO2 ? 'Δ (conc./molten)' : '',
          phenVi: ppt
            ? `Dung dịch bazơ bị vẩn đục do tạo ${pptTrait ? pptTrait.vi : 'kết tủa'} ${formatFormulaUnicode(ppt.formula)} và nước.`
            : `Oxit axit ${formatFormulaUnicode(oxide.formula)} bị hấp thụ vào dung dịch kiềm ${formatFormulaUnicode(base.formula)} tạo dung dịch muối ${formatFormulaUnicode(saltFormula)}.`,
          phenEn: ppt
            ? `The alkaline solution turns cloudy with ${pptTrait ? pptTrait.en : 'precipitate'} ${formatFormulaUnicode(ppt.formula)} and water.`
            : `Acidic oxide ${formatFormulaUnicode(oxide.formula)} is absorbed into aqueous ${formatFormulaUnicode(base.formula)} to form ${formatFormulaUnicode(saltFormula)} and water.`,
          expVi: `Oxit axit tác dụng với dung dịch bazơ tan tạo muối trung hòa ${formatFormulaUnicode(saltFormula)} và H₂O.`,
          expEn: `An acidic oxide neutralizes a soluble base to produce normal salt ${formatFormulaUnicode(saltFormula)} and water.`
        });
        if (res) return res;
      }
    }

    // 4c. Oxide + Water
    if ((cA.kind === 'oxide' && cB.kind === 'water') || (cB.kind === 'oxide' && cA.kind === 'water')) {
      const oxide = cA.kind === 'oxide' ? cA : cB;

      if (oxide.oxideType === 'basic' && oxide.solubleBasic) {
        const baseFormula = buildIonicFormula(oxide.cation, oxide.cationValence, 'OH');
        if (baseFormula) {
          const res = makeBalancedResult([fA, fB], [{ formula: baseFormula, state: null }], {
            tier: 2,
            type: 'synthesis',
            phenVi: `Oxit ${formatFormulaUnicode(oxide.formula)} tan nhanh trong nước kèm tỏa nhiệt mạnh, tạo dung dịch kiềm ${formatFormulaUnicode(baseFormula)} (làm xanh quỳ tím).`,
            phenEn: `${formatFormulaUnicode(oxide.formula)} hydrates exothermically in water to form an alkaline ${formatFormulaUnicode(baseFormula)} solution (turns litmus blue).`,
            expVi: `Oxit của kim loại kiềm và kiềm thổ (Na₂O, K₂O, CaO, BaO, Li₂O) tác dụng trực tiếp với H₂O tạo dung dịch bazơ tương ứng.`,
            expEn: `Soluble basic oxides (Group 1 & heavier Group 2 oxides) combine directly with water to form strong hydroxides.`
          });
          if (res) return res;
        }
      }

      if (oxide.oxideType === 'acidic' && oxide.formula !== 'SiO2') {
        const acidFormula = buildIonicFormula('H', 1, oxide.oxyanion);
        if (acidFormula) {
          const res = makeBalancedResult([fA, fB], [{ formula: acidFormula, state: null }], {
            tier: 2,
            type: 'synthesis',
            phenVi: `Oxit axit ${formatFormulaUnicode(oxide.formula)} hòa tan và kết hợp với nước tạo dung dịch axit ${formatFormulaUnicode(acidFormula)}.`,
            phenEn: `Acidic oxide ${formatFormulaUnicode(oxide.formula)} dissolves and hydrates in water to form ${formatFormulaUnicode(acidFormula)}.`,
            expVi: `Hầu hết oxit axit (trừ SiO₂) phản ứng hóa hợp với H₂O tạo axit chứa oxi tương ứng.`,
            expEn: `Most acidic nonmetal oxides (except SiO₂) hydrate in water to form their corresponding oxyacids.`
          });
          if (res) return res;
        }
      }

      return makeNoReactionResult(
        [fA, fB],
        `Không xảy ra phản ứng: oxit ${formatFormulaUnicode(oxide.formula)} không tan và không tác dụng với nước ở điều kiện thường.`,
        `No reaction: ${formatFormulaUnicode(oxide.formula)} is insoluble and does not react with water under standard conditions.`,
        oxide.formula === 'SiO2'
          ? `Mạng tinh thể cộng hóa trị của SiO₂ (thạch anh/cát) cực kỳ bền vững nên hoàn toàn trơ với nước.`
          : oxide.oxideType === 'neutral'
            ? `${formatFormulaUnicode(oxide.formula)} là oxit trung tính (không tạo muối) nên không phản ứng với nước.`
            : `Chỉ các oxit bazơ của kim loại kiềm/kiềm thổ (Na₂O, K₂O, CaO, BaO, Li₂O) mới tác dụng trực tiếp với nước ở nhiệt độ thường.`,
        oxide.formula === 'SiO2'
          ? `The covalent network lattice of SiO₂ (quartz/sand) is exceptionally strong and completely insoluble in water.`
          : oxide.oxideType === 'neutral'
            ? `${formatFormulaUnicode(oxide.formula)} is a neutral oxide and does not hydrate in water.`
            : `Only soluble alkali/alkaline-earth oxides react directly with water at room temperature.`
      );
    }

    // 4d. Soluble Basic Oxide + Acidic Oxide -> Salt
    if (cA.kind === 'oxide' && cB.kind === 'oxide' && cA.oxideType !== cB.oxideType) {
      const basic = cA.oxideType === 'basic' ? cA : cB.oxideType === 'basic' ? cB : null;
      const acidic = cA.oxideType === 'acidic' ? cA : cB.oxideType === 'acidic' ? cB : null;
      if (basic && acidic && basic.solubleBasic) {
        const saltFormula = buildIonicFormula(basic.cation, basic.cationValence, acidic.oxyanion);
        if (saltFormula) {
          const res = makeBalancedResult([fA, fB], [{ formula: saltFormula, state: null }], {
            tier: 2,
            type: 'synthesis',
            condVi: acidic.formula === 'SiO2' ? 't° cao' : '',
            condEn: acidic.formula === 'SiO2' ? 'high Δ' : '',
            phenVi: `Oxit bazơ ${formatFormulaUnicode(basic.formula)} kết hợp với oxit axit ${formatFormulaUnicode(acidic.formula)} tạo muối rắn ${formatFormulaUnicode(saltFormula)}.`,
            phenEn: `Basic oxide ${formatFormulaUnicode(basic.formula)} combines with acidic oxide ${formatFormulaUnicode(acidic.formula)} to form solid ${formatFormulaUnicode(saltFormula)}.`,
            expVi: `Phản ứng hóa hợp giữa oxit bazơ mạnh và oxit axit tạo ra muối tương ứng.`,
            expEn: `Direct combination of a strong basic oxide and an acidic oxide yields the corresponding oxosalt.`
          });
          if (res) return res;
        }
      }
    }

    // --- RULE 5: DOUBLE DISPLACEMENT (Salt+Salt, Salt+Base, Salt+Acid) ---
    // 5a. Salt + Salt
    if (cA.kind === 'salt' && cB.kind === 'salt') {
      if (!cA.soluble || !cB.soluble) {
        const insol = !cA.soluble ? cA.formula : cB.formula;
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng vì ${formatFormulaUnicode(insol)} là muối không tan trong nước.`,
          `No reaction because ${formatFormulaUnicode(insol)} is insoluble in water.`,
          `Phản ứng trao đổi giữa hai muối yêu cầu cả hai muối tham gia phải tan trong nước để các ion có thể tiếp xúc và hoán đổi tự do.`,
          `Double displacement between two salts requires both reactants to be water-soluble so ions can exchange freely.`
        );
      }

      if (cA.cation === cB.cation || cA.anion === cB.anion) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng vì hai muối có chung ion (${cA.cation === cB.cation ? cA.cation : cA.anion}).`,
          `No reaction because both salts share a common ion (${cA.cation === cB.cation ? cA.cation : cA.anion}).`,
          `Khi hoán đổi các ion cùng loại vẫn thu được chính hai muối ban đầu, không tạo sản phẩm mới.`,
          `Swapping identical ions yields the exact same starting substances with no driving force.`
        );
      }

      const p1Formula = buildIonicFormula(cA.cation, cA.cationValence, cB.anion);
      const p2Formula = buildIonicFormula(cB.cation, cB.cationValence, cA.anion);
      if (p1Formula && p2Formula) {
        const p1List = expandProductSpec(p1Formula, cA.cation, cB.anion);
        const p2List = expandProductSpec(p2Formula, cB.cation, cA.anion);
        const products = mergeDuplicateProducts([...p1List, ...p2List]);

        const ppts = products.filter((p) => p.state === 'precipitate');
        const gases = products.filter((p) => p.state === 'gas');
        const hasWater = products.some((p) => p.formula === 'H2O');

        if (ppts.length === 0 && gases.length === 0 && !hasWater) {
          return makeNoReactionResult(
            [fA, fB],
            `Không xảy ra phản ứng (dung dịch vẫn trong suốt, không xuất hiện kết tủa hay khí thoát ra).`,
            `No reaction (solution remains completely clear with no precipitate or gas).`,
            `Không xảy ra phản ứng (các ion chỉ tồn tại tự do trong dung dịch): cả ${formatFormulaUnicode(p1Formula)} và ${formatFormulaUnicode(p2Formula)} đều tan tốt trong nước nên không thỏa mãn điều kiện phản ứng trao đổi.`,
            `No reaction (all ions remain free in solution): both ${formatFormulaUnicode(p1Formula)} and ${formatFormulaUnicode(p2Formula)} are soluble strong electrolytes, providing no driving force.`
          );
        }

        const primaryPpt = ppts[0];
        const pptTrait = primaryPpt && PRECIPITATE_TRAITS[primaryPpt.formula];
        const slightNoteVi = primaryPpt?.slightlySoluble ? ' (chất ít tan, tách kết tủa ở dung dịch đủ đặc)' : '';
        const slightNoteEn = primaryPpt?.slightlySoluble ? ' (sparingly soluble; precipitates in concentrated solutions)' : '';

        const res = makeBalancedResult([fA, fB], products, {
          tier: 2,
          type: 'exchange',
          phenVi: primaryPpt
            ? `Xuất hiện ${pptTrait ? pptTrait.vi : 'kết tủa'} ${formatFormulaUnicode(primaryPpt.formula)} tách ra khỏi dung dịch${slightNoteVi}.`
            : `Phản ứng trao đổi xảy ra kèm tạo sản phẩm mới.`,
          phenEn: primaryPpt
            ? `Formation of ${pptTrait ? pptTrait.en : 'precipitate'} ${formatFormulaUnicode(primaryPpt.formula)} settling out of solution${slightNoteEn}.`
            : `Double displacement occurs forming new products.`,
          expVi: `Hai muối tan trao đổi thành phần cation và anion cho nhau; phản ứng xảy ra vì tạo thành chất kết tủa ${ppts.map((p) => formatFormulaUnicode(p.formula)).join(', ')} làm giảm nồng độ ion tự do trong dung dịch.`,
          expEn: `Two soluble salts exchange ions; the reaction is driven forward by the precipitation of insoluble ${ppts.map((p) => formatFormulaUnicode(p.formula)).join(', ')}.`
        });
        if (res) return res;
      }
    }

    // 5b. Salt + Base
    if ((cA.kind === 'salt' && cB.kind === 'base') || (cB.kind === 'salt' && cA.kind === 'base')) {
      const salt = cA.kind === 'salt' ? cA : cB;
      const base = cA.kind === 'base' ? cA : cB;

      // Special: Acid salt (HCO3-, HSO4-, HSO3-) + Soluble Base
      if (salt.isAcidSalt && base.soluble) {
        const neutralAnionMap = { HCO3: 'CO3', HSO4: 'SO4', HSO3: 'SO3' };
        const neutralAnion = neutralAnionMap[salt.anion];
        if (neutralAnion) {
          if (salt.cation === base.cation) {
            const pSalt = buildIonicFormula(salt.cation, salt.cationValence, neutralAnion);
            if (pSalt) {
              const pList = expandProductSpec(pSalt, salt.cation, neutralAnion);
              const products = mergeDuplicateProducts([...pList, { formula: 'H2O', state: null }]);
              const res = makeBalancedResult([fA, fB], products, {
                tier: 2,
                type: 'neutralization',
                phenVi: `Muối axit ${formatFormulaUnicode(salt.formula)} bị trung hòa bởi bazơ ${formatFormulaUnicode(base.formula)} tạo muối trung hòa ${formatFormulaUnicode(pSalt)} và nước.`,
                phenEn: `Acid salt ${formatFormulaUnicode(salt.formula)} is neutralized by ${formatFormulaUnicode(base.formula)} to form normal salt ${formatFormulaUnicode(pSalt)} and water.`,
                expVi: `Gốc axit ${formatFormulaUnicode(salt.anion)}⁻ nhường H⁺ cho OH⁻ tạo H₂O và chuyển thành gốc muối trung hòa ${formatFormulaUnicode(neutralAnion)}²⁻.`,
                expEn: `The acidic anion ${formatFormulaUnicode(salt.anion)}⁻ donates H⁺ to OH⁻ to form H₂O and normal anion ${formatFormulaUnicode(neutralAnion)}²⁻.`
              });
              if (res) return res;
            }
          } else {
            // Different cations e.g. NaHCO3 + Ca(OH)2 -> CaCO3↓ + NaOH + H2O (or Na2CO3 + CaCO3 + H2O)
            const s1 = buildIonicFormula(base.cation, base.cationValence, neutralAnion);
            const s2 = buildIonicFormula(salt.cation, salt.cationValence, neutralAnion);
            if (s1 && s2) {
              const products = mergeDuplicateProducts([
                ...expandProductSpec(s1, base.cation, neutralAnion),
                ...expandProductSpec(s2, salt.cation, neutralAnion),
                { formula: 'H2O', state: null }
              ]);
              const res = makeBalancedResult([fA, fB], products, {
                tier: 2,
                type: 'exchange',
                phenVi: `Phản ứng giữa muối axit ${formatFormulaUnicode(salt.formula)} và dung dịch kiềm ${formatFormulaUnicode(base.formula)} tạo muối trung hòa và nước.`,
                phenEn: `Acid salt ${formatFormulaUnicode(salt.formula)} reacts with alkaline ${formatFormulaUnicode(base.formula)} to yield normal salts and water.`,
                expVi: `Ion ${formatFormulaUnicode(salt.anion)}⁻ kết hợp với OH⁻ tạo gốc ${formatFormulaUnicode(neutralAnion)}²⁻ và H₂O.`,
                expEn: `${formatFormulaUnicode(salt.anion)}⁻ reacts with OH⁻ to generate ${formatFormulaUnicode(neutralAnion)}²⁻ and H₂O.`
              });
              if (res) return res;
            }
          }
        }
      }

      if (!salt.soluble || !base.soluble) {
        const insol = !salt.soluble ? salt.formula : base.formula;
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng vì ${formatFormulaUnicode(insol)} không tan trong nước.`,
          `No reaction because ${formatFormulaUnicode(insol)} is insoluble in water.`,
          `Phản ứng trao đổi giữa muối và bazơ yêu cầu cả hai chất tham gia đều phải tan trong nước.`,
          `Double displacement between a salt and a base requires both reactants to be soluble in water.`
        );
      }

      if (salt.cation === base.cation) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng vì muối và bazơ có chung cation ${salt.cation}.`,
          `No reaction because both share the same cation ${salt.cation}.`,
          `Không thể tạo ra chất kết tủa, chất bay hơi hay nước mới khi hai chất có cùng ion kim loại.`,
          `Sharing the same metal cation leaves no new product upon ion exchange.`
        );
      }

      const newSaltFormula = buildIonicFormula(base.cation, base.cationValence, salt.anion);
      const newBaseFormula = buildIonicFormula(salt.cation, salt.cationValence, 'OH');
      if (newSaltFormula && newBaseFormula) {
        const sSpecs = expandProductSpec(newSaltFormula, base.cation, salt.anion);
        const bSpecs = expandProductSpec(newBaseFormula, salt.cation, 'OH');
        const products = mergeDuplicateProducts([...bSpecs, ...sSpecs]);

        const ppts = products.filter((p) => p.state === 'precipitate');
        const gases = products.filter((p) => p.state === 'gas');
        const hasWater = products.some((p) => p.formula === 'H2O');

        if (ppts.length === 0 && gases.length === 0 && !hasWater) {
          return makeNoReactionResult(
            [fA, fB],
            `Không xảy ra phản ứng (không tạo kết tủa, khí hay nước).`,
            `No reaction (no precipitate, gas, or water is formed).`,
            `Không xảy ra phản ứng (các ion chỉ tồn tại tự do trong dung dịch): cả ${formatFormulaUnicode(newBaseFormula)} và ${formatFormulaUnicode(newSaltFormula)} đều tan tốt trong nước.`,
            `No reaction (all ions remain free in solution): both ${formatFormulaUnicode(newBaseFormula)} and ${formatFormulaUnicode(newSaltFormula)} remain completely soluble.`
          );
        }

        const obsPartsVi = [];
        const obsPartsEn = [];
        ppts.forEach((p) => {
          const t = PRECIPITATE_TRAITS[p.formula];
          obsPartsVi.push(`xuất hiện ${t ? t.vi : 'kết tủa'} ${formatFormulaUnicode(p.formula)}`);
          obsPartsEn.push(`${t ? t.en : 'precipitate'} ${formatFormulaUnicode(p.formula)} forms`);
        });
        gases.forEach((g) => {
          const t = GAS_TRAITS[g.formula];
          obsPartsVi.push(`thoát ra ${t ? t.vi : 'khí ' + formatFormulaUnicode(g.formula)}`);
          obsPartsEn.push(`${t ? t.en : formatFormulaUnicode(g.formula) + ' gas'} evolves`);
        });

        const nh4NoteVi = newBaseFormula === 'NH4OH' ? ' (NH₄OH không bền tự phân hủy thành NH₃↑ và H₂O).' : '';
        const nh4NoteEn = newBaseFormula === 'NH4OH' ? ' (unstable NH₄OH immediately decomposes into NH₃↑ and H₂O).' : '';
        const agNoteVi = newBaseFormula === 'AgOH' ? ' (AgOH không bền tự phân hủy ngay thành Ag₂O↓ và H₂O).' : '';
        const agNoteEn = newBaseFormula === 'AgOH' ? ' (unstable AgOH immediately decomposes into Ag₂O↓ and H₂O).' : '';

        const res = makeBalancedResult([fA, fB], products, {
          tier: 2,
          type: 'exchange',
          phenVi: `Phản ứng xảy ra ngay khi trộn hai dung dịch: ${obsPartsVi.join(' đồng thời ')}.`,
          phenEn: `Reaction occurs immediately upon mixing: ${obsPartsEn.join(' while ')}.`,
          expVi: `Phản ứng trao đổi ion giữa dung dịch muối và dung dịch bazơ thỏa mãn điều kiện tạo kết tủa hoặc chất bay hơi${nh4NoteVi}${agNoteVi}`,
          expEn: `Ion-exchange reaction between soluble salt and base driven by precipitate or gas formation${nh4NoteEn}${agNoteEn}`
        });
        if (res) return res;
      }
    }

    // 5c. Salt + Acid
    if ((cA.kind === 'salt' && cB.kind === 'acid') || (cB.kind === 'salt' && cA.kind === 'acid')) {
      const salt = cA.kind === 'salt' ? cA : cB;
      const acid = cA.kind === 'acid' ? cA : cB;

      // Ultra-insoluble salts that do NOT dissolve in common acids
      const acidInsolubleSalts = new Set(['AgCl', 'AgBr', 'AgI', 'BaSO4', 'PbSO4']);
      if (acidInsolubleSalts.has(salt.formula)) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng: kết tủa ${formatFormulaUnicode(salt.formula)} hoàn toàn bền vững, không tan trong axit ${formatFormulaUnicode(acid.formula)}.`,
          `No reaction: ${formatFormulaUnicode(salt.formula)} is completely insoluble and does not dissolve in ${formatFormulaUnicode(acid.formula)}.`,
          `${formatFormulaUnicode(salt.formula)} có tích số tan cực nhỏ và gốc axit mạnh tương ứng nên không thể bị hòa tan bởi dung dịch axit thông thường.`,
          `${formatFormulaUnicode(salt.formula)} has an extremely low solubility product and resists dissolution in common mineral acids.`
        );
      }

      // Heavy metal sulfides (CuS, Ag2S, HgS, PbS) do not dissolve in dilute non-oxidizing acids
      const heavyAcidInsolSulfides = new Set(['CuS', 'Ag2S', 'HgS', 'PbS', 'Cu2S']);
      if (heavyAcidInsolSulfides.has(salt.formula) && !acid.oxidizing) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng: muối sunfua ${formatFormulaUnicode(salt.formula)} không tan trong axit ${formatFormulaUnicode(acid.formula)} loãng.`,
          `No reaction: heavy metal sulfide ${formatFormulaUnicode(salt.formula)} does not dissolve in dilute ${formatFormulaUnicode(acid.formula)}.`,
          `Các muối sunfua kim loại nặng (CuS, Ag₂S, PbS, HgS) cực kỳ bền và không tan trong dung dịch HCl hay H₂SO₄ loãng.`,
          `Heavy metal sulfides (CuS, Ag₂S, PbS, HgS) have extremely low Ksp and do not react with dilute HCl or H₂SO₄.`
        );
      }

      if (salt.anion === acid.anion) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng vì muối và axit có chung gốc axit ${formatFormulaUnicode(salt.anion)}.`,
          `No reaction because salt and acid share the same anion ${formatFormulaUnicode(salt.anion)}.`,
          `Hai chất có chung gốc axit nên không thể trao đổi tạo sản phẩm mới.`,
          `Sharing the same anion produces no chemical change upon ion exchange.`
        );
      }

      // Compute swapped acid formula
      let newAcidFormula;
      if (salt.anion === 'HCO3') {
        newAcidFormula = 'H2CO3';
      } else if (salt.anion === 'HSO3') {
        newAcidFormula = 'H2SO3';
      } else if (salt.anion === 'HSO4') {
        newAcidFormula = 'H2SO4';
      } else if (salt.anion === 'CH3COO') {
        newAcidFormula = 'CH3COOH';
      } else {
        newAcidFormula = buildIonicFormula('H', 1, salt.anion);
      }

      const newSaltFormula = buildIonicFormula(salt.cation, salt.cationValence, acid.anion);
      if (newSaltFormula && newAcidFormula) {
        const sSpecs = expandProductSpec(newSaltFormula, salt.cation, acid.anion);
        const aSpecs = expandProductSpec(newAcidFormula, null, null);
        const products = mergeDuplicateProducts([...sSpecs, ...aSpecs]);

        const ppts = products.filter((p) => p.state === 'precipitate');
        const gases = products.filter((p) => p.state === 'gas');
        const hasWater = products.some((p) => p.formula === 'H2O');
        const newAcidStrength = ACID_STRENGTH[newAcidFormula] ?? 5;
        const weakerAcidFormed = newAcidStrength < acid.strength && (newAcidFormula === 'CH3COOH' || newAcidFormula === 'HF' || newAcidFormula === 'H3PO4');

        // If reactant salt was insoluble, require a gas/water/weaker-acid driving force with stronger acid
        if (!salt.soluble && newAcidStrength >= acid.strength && ppts.length === 0) {
          return makeNoReactionResult(
            [fA, fB],
            `Không xảy ra phản ứng: axit ${formatFormulaUnicode(acid.formula)} không đủ mạnh để hòa tan muối không tan ${formatFormulaUnicode(salt.formula)}.`,
            `No reaction: ${formatFormulaUnicode(acid.formula)} is not strong enough to dissolve insoluble salt ${formatFormulaUnicode(salt.formula)}.`,
            `Muối không tan chỉ phản ứng với axit mạnh hơn axit tạo ra gốc muối đó.`,
            `An insoluble salt only reacts when the incoming acid is stronger than the conjugate acid of its anion.`
          );
        }

        // If reactant salt was soluble and acid is weaker than product acid, reaction only occurs if precipitate forms (e.g. AgNO3 + H2S -> Ag2S↓)
        if (salt.soluble && ppts.length === 0 && gases.length === 0 && !hasWater && !weakerAcidFormed) {
          return makeNoReactionResult(
            [fA, fB],
            `Không xảy ra phản ứng (không tạo ra chất kết tủa, khí bay hơi hay axit yếu hơn).`,
            `No reaction (no precipitate, gas, or weaker acid is produced).`,
            `Không xảy ra phản ứng (các ion chỉ tồn tại tự do trong dung dịch): cả muối mới ${formatFormulaUnicode(newSaltFormula)} và axit ${formatFormulaUnicode(newAcidFormula)} đều tan và điện li mạnh.`,
            `No reaction (all ions remain free in solution): both ${formatFormulaUnicode(newSaltFormula)} and ${formatFormulaUnicode(newAcidFormula)} are soluble strong electrolytes.`
          );
        }

        const obsVi = [];
        const obsEn = [];
        if (!salt.soluble) {
          obsVi.push(`chất rắn ${formatFormulaUnicode(salt.formula)} tan dần`);
          obsEn.push(`solid ${formatFormulaUnicode(salt.formula)} dissolves`);
        }
        ppts.forEach((p) => {
          const t = PRECIPITATE_TRAITS[p.formula];
          obsVi.push(`xuất hiện ${t ? t.vi : 'kết tủa'} ${formatFormulaUnicode(p.formula)}`);
          obsEn.push(`${t ? t.en : 'precipitate'} ${formatFormulaUnicode(p.formula)} forms`);
        });
        gases.forEach((g) => {
          const t = GAS_TRAITS[g.formula];
          obsVi.push(`sủi bọt ${t ? t.vi : 'khí ' + formatFormulaUnicode(g.formula)}`);
          obsEn.push(`effervescence of ${t ? t.en : formatFormulaUnicode(g.formula) + ' gas'}`);
        });
        if (obsVi.length === 0) {
          obsVi.push(`tạo dung dịch muối ${formatFormulaUnicode(newSaltFormula)} và axit yếu ${formatFormulaUnicode(newAcidFormula)}`);
          obsEn.push(`forms aqueous ${formatFormulaUnicode(newSaltFormula)} and weak acid ${formatFormulaUnicode(newAcidFormula)}`);
        }

        let decompVi = '';
        let decompEn = '';
        if (newAcidFormula === 'H2CO3') {
          decompVi = ' Axit H₂CO₃ sinh ra kém bền nên tự phân hủy ngay thành H₂O và CO₂↑.';
          decompEn = ' Unstable H₂CO₃ immediately decomposes into H₂O and CO₂↑.';
        } else if (newAcidFormula === 'H2SO3') {
          decompVi = ' Axit H₂SO₃ kém bền tự phân hủy thành H₂O và SO₂↑.';
          decompEn = ' Unstable H₂SO₃ decomposes immediately into H₂O and SO₂↑.';
        }

        const res = makeBalancedResult([fA, fB], products, {
          tier: 2,
          type: 'exchange',
          phenVi: obsVi[0].charAt(0).toUpperCase() + obsVi.join(', ').slice(1) + '.',
          phenEn: obsEn[0].charAt(0).toUpperCase() + obsEn.join(', ').slice(1) + '.',
          expVi: `Phản ứng trao đổi giữa muối và axit thỏa mãn điều kiện tạo ${ppts.length ? 'kết tủa' : gases.length ? 'khí bay hơi' : 'axit yếu hơn'}.${decompVi}`,
          expEn: `Double displacement between salt and acid driven by ${ppts.length ? 'precipitate formation' : gases.length ? 'gas evolution' : 'weak acid formation'}.${decompEn}`
        });
        if (res) return res;
      }
    }

    // --- RULE 6: TWO ELEMENTARY SUBSTANCES ---
    if (cA.kind === 'element' && cB.kind === 'element') {
      const elA = cA.el;
      const elB = cB.el;

      // 6a. Noble Gas Block
      if (cA.isNobleGas || cB.isNobleGas) {
        const nobleSym = cA.isNobleGas ? cA.symbol : cB.symbol;
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng ở điều kiện thường vì ${nobleSym} là khí hiếm trơ.`,
          `No reaction under standard conditions because ${nobleSym} is an inert noble gas.`,
          `Nguyên tử khí hiếm ${nobleSym} đã có lớp vỏ electron ngoài cùng bão hòa bền vững nên không tham gia phản ứng hóa hợp thông thường.`,
          `Noble gas ${nobleSym} possesses a completely filled valence shell and resists chemical combination under normal conditions.`
        );
      }

      // 6b. Metal + Metal Block
      if (cA.isMetal && cB.isMetal) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng hóa học: hai kim loại ${cA.symbol} và ${cB.symbol} không tạo hợp chất hóa học với nhau.`,
          `No chemical reaction: metals ${cA.symbol} and ${cB.symbol} do not react to form a compound.`,
          `Khi nung nóng chảy cùng nhau, hai kim loại có thể hòa trộn tạo hợp kim thông qua liên kết kim loại (bạn có thể chuyển sang Tab 1 "Liên kết nguyên tử" để khám phá).`,
          `When melted together, two metals may form an alloy via metallic bonding (switch to Tab 1 "Atomic Bonding" to explore).`
        );
      }

      // 6c. Superheavy Z >= 100 Block
      if (elA.number >= 100 || elB.number >= 100) {
        const sh = elA.number >= 100 ? elA : elB;
        return makeNoReactionResult(
          [fA, fB],
          `Không thể dự đoán phản ứng hóa hợp cho nguyên tố siêu nặng ${sh.symbol} (Z = ${sh.number}).`,
          `Cannot predict synthesis reaction for synthetic superheavy element ${sh.symbol} (Z = ${sh.number}).`,
          `Các nguyên tố siêu nặng Z ≥ 100 có tính phóng xạ cực mạnh, chu kì bán rã rất ngắn và chưa có dữ liệu hóa học thực nghiệm đầy đủ.`,
          `Superheavy elements (Z ≥ 100) are highly radioactive with fleeting half-lives and lack bulk experimental reaction data.`
        );
      }

      // 6d. Chemically inert / non-reacting elementary pairs
      const symPairKey = [cA.symbol, cB.symbol].sort().join('-');
      const INERT_ELEMENT_PAIRS = new Set([
        'Au-O', 'O-Pt', 'Ag-O', 'Au-S', 'Pt-S',
        'Au-H', 'Cu-H', 'Ag-H', 'Fe-H', 'H-Pt', 'H-Zn', 'Al-H', 'H-Pb', 'H-Ni', 'H-Sn', 'H-Hg',
        'Cl-O', 'Br-O', 'I-O', 'Cl-N', 'Br-N', 'I-N', 'C-Cl', 'C-Br', 'C-I', 'C-N'
      ]);
      if (INERT_ELEMENT_PAIRS.has(symPairKey)) {
        return makeNoReactionResult(
          [fA, fB],
          `Không xảy ra phản ứng hóa hợp trực tiếp giữa ${formatFormulaUnicode(fA)} và ${formatFormulaUnicode(fB)} ở điều kiện thông thường.`,
          `No direct combination reaction between ${formatFormulaUnicode(fA)} and ${formatFormulaUnicode(fB)} under normal conditions.`,
          `Hai đơn chất này không kết hợp trực tiếp với nhau ở điều kiện thí nghiệm thông thường.`,
          `These two elementary substances do not combine directly under standard laboratory conditions.`
        );
      }

      if (symPairKey === 'N-O') {
        const res = makeBalancedResult([fA, fB], [{ formula: 'NO', state: 'gas' }], {
          tier: 2,
          type: 'synthesis',
          condVi: '~3000°C / tia lửa điện',
          condEn: '~3000°C / electric arc',
          phenVi: `Ở nhiệt độ cực cao (~3000°C hoặc khi có sấm sét), N₂ và O₂ kết hợp tạo khí NO không màu.`,
          phenEn: `At extreme temperatures (~3000°C or during lightning strikes), N₂ and O₂ combine into colorless NO gas.`,
          expVi: `Do liên kết ba N≡N cực kỳ bền vững, phản ứng thu nhiệt mạnh này chỉ xảy ra khi có tia lửa điện hoặc sấm sét tự nhiên.`,
          expEn: `Due to the exceptionally strong N≡N triple bond, this endothermic synthesis occurs only in electric arcs or lightning.`
        });
        if (res) return res;
      }

      // 6e. Electronegativity + Criss-Cross Synthesis Prediction
      if (elA.electronegativity !== null && elB.electronegativity !== null) {
        const lowC = elA.electronegativity <= elB.electronegativity ? cA : cB;
        const highC = lowC === cA ? cB : cA;

        const NEG_VALENCE = {
          F: 1, Cl: 1, Br: 1, I: 1,
          O: 2, S: 2, Se: 2, Te: 2,
          N: 3, P: 3, As: 3,
          C: 4, Si: 4,
          H: 1
        };

        const negVal = NEG_VALENCE[highC.symbol];
        if (!negVal) {
          return makeNoReactionResult(
            [fA, fB],
            `Chưa có quy tắc hóa hợp trực tiếp cho cặp ${formatFormulaUnicode(fA)} và ${formatFormulaUnicode(fB)}.`,
            `No direct synthesis rule applies for ${formatFormulaUnicode(fA)} and ${formatFormulaUnicode(fB)}.`,
            `Hai đơn chất này không tạo hợp chất hai nguyên tố điển hình ở điều kiện phổ thông.`,
            `These two elements do not form a typical binary compound under common conditions.`
          );
        }

        // Determine positive valence of lower-χ element
        let posVal;
        if (lowC.symbol === 'Fe' && (highC.symbol === 'F' || highC.symbol === 'Cl' || highC.symbol === 'Br')) {
          posVal = 3;
        } else if (lowC.symbol === 'H') {
          posVal = 1;
        } else if (lowC.symbol === 'C' || lowC.symbol === 'Si') {
          posVal = 4;
        } else if (lowC.symbol === 'P') {
          posVal = highC.symbol === 'F' || highC.symbol === 'O' ? 5 : 3;
        } else if (lowC.symbol === 'S') {
          posVal = highC.symbol === 'F' ? 6 : 4;
        } else if (PRIMARY_METAL_VALENCE[lowC.symbol]) {
          posVal = PRIMARY_METAL_VALENCE[lowC.symbol];
        } else {
          const states = parsePositiveOxidationStates(lowC.el);
          posVal = states[0] || 2;
        }

        let productFormula;
        // Conventional hydrogen-second formulas (NH3, PH3, CH4, SiH4) vs H-first (HBr, HI, HF, H2S)
        if (lowC.symbol === 'H' && (highC.symbol === 'N' || highC.symbol === 'P' || highC.symbol === 'C' || highC.symbol === 'Si')) {
          productFormula = `${highC.symbol}H${negVal === 1 ? '' : negVal}`;
        } else if (ANION_BY_FORMULA.has(highC.symbol)) {
          productFormula = buildIonicFormula(lowC.symbol, posVal, highC.symbol);
        } else {
          const g = numGcd(posVal, negVal);
          const s1 = negVal / g;
          const s2 = posVal / g;
          productFormula = `${lowC.symbol}${s1 === 1 ? '' : s1}${highC.symbol}${s2 === 1 ? '' : s2}`;
        }

        if (productFormula) {
          const isGasProduct = ['HBr', 'HI', 'HF', 'H2S', 'HCl', 'NH3', 'CO2', 'SO2', 'BF3', 'SiF4'].includes(productFormula);
          const needsHeat = !(highC.symbol === 'F' || (ALKALI_WATER_REACTIVE.has(lowC.symbol) && highC.symbol === 'Cl'));
          const res = makeBalancedResult(
            [fA, fB],
            [{ formula: productFormula, state: isGasProduct ? 'gas' : null }],
            {
              tier: 2,
              type: 'synthesis',
              condVi: needsHeat ? 't°' : '',
              condEn: needsHeat ? 'Δ' : '',
              phenVi: `Hai đơn chất ${formatFormulaUnicode(fA)} và ${formatFormulaUnicode(fB)} hóa hợp với nhau tạo hợp chất ${formatFormulaUnicode(productFormula)}.`,
              phenEn: `Elementary ${formatFormulaUnicode(fA)} and ${formatFormulaUnicode(fB)} combine directly to synthesize ${formatFormulaUnicode(productFormula)}.`,
              expVi: `Dựa theo độ âm điện (χ(${lowC.symbol}) = ${lowC.el.electronegativity.toFixed(2)} < χ(${highC.symbol}) = ${highC.el.electronegativity.toFixed(2)}) và quy tắc chéo hóa trị (${lowC.symbol} hóa trị ${romanValence(posVal)}, ${highC.symbol} hóa trị ${romanValence(negVal)}) tạo sản phẩm ${formatFormulaUnicode(productFormula)}.`,
              expEn: `Predicted from electronegativity (χ(${lowC.symbol}) = ${lowC.el.electronegativity.toFixed(2)} < χ(${highC.symbol}) = ${highC.el.electronegativity.toFixed(2)}) and criss-cross valences (${lowC.symbol}(+${posVal}) with ${highC.symbol}(−${negVal})) yielding ${formatFormulaUnicode(productFormula)}.`
            }
          );
          if (res) return res;
        }
      }
    }

    // --- RULE 7: ORGANIC COMPLETE COMBUSTION (C,H or C,H,O + O2 -> CO2↑ + H2O) ---
    if (fA === 'O2' || fB === 'O2') {
      const orgFormula = fA === 'O2' ? fB : fA;
      const orgResolved = resolveChemicalFormula(orgFormula);
      if (orgResolved !== 'H2CO3' && orgResolved !== 'O2') {
        const parsedOrg = parseFormulaSyntax(orgResolved, { allowSquare: true });
        if (
          parsedOrg.ok &&
          parsedOrg.atoms.C > 0 &&
          parsedOrg.atoms.H > 0 &&
          parsedOrg.elements.every((el) => el === 'C' || el === 'H' || el === 'O')
        ) {
          const hasO = Boolean(parsedOrg.atoms.O);
          const res = makeBalancedResult(
            [fA, fB],
            [
              { formula: 'CO2', state: 'gas' },
              { formula: 'H2O', state: null }
            ],
            {
              tier: 2,
              type: 'combustion',
              condVi: 't°',
              condEn: 'Δ',
              phenVi: `Hợp chất hữu cơ ${formatFormulaUnicode(orgFormula)} cháy trong khí O₂ dư, tỏa nhiều nhiệt, tạo khí CO₂ không màu và hơi nước.`,
              phenEn: `Organic compound ${formatFormulaUnicode(orgFormula)} undergoes complete combustion in excess O₂, releasing heat, colorless CO₂ gas, and water vapor.`,
              expVi: `Phản ứng đốt cháy hoàn toàn hợp chất hữu cơ chỉ chứa ${hasO ? 'C, H, O' : 'C và H (hydrocarbon)'} trong oxi dư: toàn bộ nguyên tử C chuyển thành CO₂↑ và toàn bộ H chuyển thành H₂O.`,
              expEn: `Complete combustion of an organic compound composed solely of ${hasO ? 'C, H, and O' : 'C and H (hydrocarbon)'} in excess O₂ converts all carbon to CO₂↑ and all hydrogen to H₂O.`
            }
          );
          if (res) return res;
        }
      }
    }

    // --- FALLBACK: SPECIFIC NON-REACTING CLASS PAIRS ---
    if (cA.kind === 'acid' && cB.kind === 'acid') {
      return makeNoReactionResult(
        [fA, fB],
        `Không xảy ra phản ứng giữa hai axit ${formatFormulaUnicode(fA)} và ${formatFormulaUnicode(fB)}.`,
        `No reaction between two acids ${formatFormulaUnicode(fA)} and ${formatFormulaUnicode(fB)}.`,
        `Hai axit thông thường không phản ứng trao đổi với nhau trong dung dịch.`,
        `Two common acids do not react with each other under normal aqueous conditions.`
      );
    }

    if (cA.kind === 'base' && cB.kind === 'base') {
      return makeNoReactionResult(
        [fA, fB],
        `Không xảy ra phản ứng giữa hai bazơ ${formatFormulaUnicode(fA)} và ${formatFormulaUnicode(fB)}.`,
        `No reaction between two bases ${formatFormulaUnicode(fA)} and ${formatFormulaUnicode(fB)}.`,
        `Hai bazơ không phản ứng với nhau (trừ trường hợp hiđroxit lưỡng tính như Al(OH)₃, Zn(OH)₂ tác dụng với kiềm mạnh).`,
        `Two bases do not react together (unless one is an amphoteric hydroxide like Al(OH)₃ or Zn(OH)₂ with strong alkali).`
      );
    }

    if ((cA.kind === 'water' && cB.kind === 'salt') || (cB.kind === 'water' && cA.kind === 'salt')) {
      const salt = cA.kind === 'salt' ? cA : cB;
      return makeNoReactionResult(
        [fA, fB],
        salt.soluble
          ? `${formatFormulaUnicode(salt.formula)} hòa tan vật lý trong nước tạo dung dịch trong suốt (không tạo chất hóa học mới).`
          : `${formatFormulaUnicode(salt.formula)} không tan và không phản ứng với nước ở điều kiện thường.`,
        salt.soluble
          ? `${formatFormulaUnicode(salt.formula)} physically dissolves and dissociates in water (no new chemical compound is formed).`
          : `${formatFormulaUnicode(salt.formula)} is insoluble and does not react with water at standard conditions.`,
        salt.soluble
          ? `Quá trình hòa tan muối trong nước là sự điện li vật lý thành các ion hiđrat hóa, không phải phản ứng tạo chất mới.`
          : `Muối không tan giữ nguyên trạng thái rắn khi cho vào nước.`,
        salt.soluble
          ? `Dissolution in water is physical dissociation into hydrated ions rather than a new chemical synthesis.`
          : `Insoluble salts remain as an unaltered solid phase in water.`
      );
    }

    if ((cA.kind === 'water' && cB.kind === 'element' && cB.isMetal) ||
        (cB.kind === 'water' && cA.kind === 'element' && cA.isMetal)) {
      const metal = cA.kind === 'element' ? cA : cB;
      if (metal.symbol === 'Mg') {
        const res = makeBalancedResult([fA, fB], [
          { formula: 'Mg(OH)2', state: 'precipitate' },
          { formula: 'H2', state: 'gas' }
        ], {
          tier: 2,
          type: 'redox',
          condVi: 't° (nước nóng)',
          condEn: 'Δ (hot water)',
          phenVi: `Magie phản ứng rất chậm với nước lạnh nhưng sủi bọt khí H₂ rõ rệt trong nước nóng, tạo kết tủa trắng Mg(OH)₂.`,
          phenEn: `Magnesium reacts very slowly with cold water but steadily evolves H₂ bubbles in hot water, forming white Mg(OH)₂.`,
          expVi: `Mg có tính khử trung bình mạnh; lớp Mg(OH)₂ ít tan bám trên bề mặt làm phản ứng ở nhiệt độ thường diễn ra rất chậm.`,
          expEn: `A thin sparingly soluble Mg(OH)₂ layer slows reaction in cold water, requiring heat for sustained H₂ evolution.`
        });
        if (res) return res;
      }
      return makeNoReactionResult(
        [fA, fB],
        `Không xảy ra phản ứng giữa kim loại ${metal.symbol} và nước ở điều kiện thường.`,
        `No reaction between metallic ${metal.symbol} and liquid water at room temperature.`,
        `Ở nhiệt độ thường, chỉ các kim loại kiềm và kiềm thổ mạnh (K, Na, Li, Ca, Ba) mới phản ứng trực tiếp với nước tạo dung dịch kiềm và khí H₂.`,
        `At room temperature, only active alkali and heavier alkaline-earth metals (K, Na, Li, Ca, Ba) react directly with water.`
      );
    }

    // Generic No Reaction fallback
    return makeNoReactionResult(
      [fA, fB],
      `Không xảy ra phản ứng hóa học giữa ${formatFormulaUnicode(fA)} và ${formatFormulaUnicode(fB)} ở điều kiện thường.`,
      `No chemical reaction occurs between ${formatFormulaUnicode(fA)} and ${formatFormulaUnicode(fB)} under standard conditions.`,
      `Hai chất này không thỏa mãn điều kiện trao đổi ion, phản ứng thế, trung hòa hay oxi hóa - khử phổ biến ở điều kiện tiêu chuẩn.`,
      `These two substances do not meet the criteria for ion exchange, displacement, neutralization, or standard redox reactions.`
    );
  }

  // =========================================================================
  // MAIN 3-TIER PREDICTION ENTRYPOINT
  // =========================================================================
  function predictReaction(rawFormulas) {
    const canonicalFormulas = (rawFormulas || []).map((f) => normalizeInputFormula(f));

    // 1. Check Tier 1 Dictionary first (works for both 2 and 3 reactants, order-independent)
    const tier1 = lookupTier1(canonicalFormulas);
    if (tier1) return tier1;

    // 2. If 2 reactants -> run Tier 2 rule engine
    if (canonicalFormulas.length === 2) {
      return inferTier2Pair(canonicalFormulas[0], canonicalFormulas[1]);
    }

    // 3. Tier 3: 3 reactants not in Tier 1 -> test pairs (A,B), (A,C), (B,C) through Tier 1 & Tier 2
    if (canonicalFormulas.length === 3) {
      const [A, B, C] = canonicalFormulas;
      const candidatePairs = [
        { pair: [A, B], spectator: C },
        { pair: [A, C], spectator: B },
        { pair: [B, C], spectator: A }
      ];

      for (let i = 0; i < candidatePairs.length; i++) {
        const { pair, spectator } = candidatePairs[i];
        const res = lookupTier1(pair) || inferTier2Pair(pair[0], pair[1]);
        if (res && res.reacted) {
          return {
            ...res,
            tier: res.tier === 1 ? 1 : 3,
            spectator
          };
        }
      }

      return makeNoReactionResult(
        canonicalFormulas,
        `Không xảy ra phản ứng giữa 3 chất ${canonicalFormulas.map(formatFormulaUnicode).join(', ')} ở điều kiện thường.`,
        `No reaction occurs among ${canonicalFormulas.map(formatFormulaUnicode).join(', ')} under standard conditions.`,
        `Đã kiểm tra cả tổ hợp 3 chất và từng cặp đôi (${formatFormulaUnicode(A)} + ${formatFormulaUnicode(B)}, ${formatFormulaUnicode(A)} + ${formatFormulaUnicode(C)}, ${formatFormulaUnicode(B)} + ${formatFormulaUnicode(C)}) nhưng không cặp nào thỏa mãn điều kiện phản ứng.`,
        `Neither the 3-substance combination nor any pairwise subset (${formatFormulaUnicode(A)} + ${formatFormulaUnicode(B)}, ${formatFormulaUnicode(A)} + ${formatFormulaUnicode(C)}, ${formatFormulaUnicode(B)} + ${formatFormulaUnicode(C)}) undergoes a reaction at standard conditions.`,
        3
      );
    }

    return null;
  }

  // =========================================================================
  // 2-LAYER PURE-SVG MOLECULAR VISUALIZATION & MATTE ANIMATION ENGINE
  // =========================================================================
  const SVG_SUBSCRIPT_DIGITS = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };

  function getAtomRadius(sym) {
    if (sym === 'H') return 7.5;
    const el = getElementMap().get(sym);
    if (el && typeof el.radius === 'number') {
      const t = Math.max(0, Math.min(1, (el.radius - 42) / (255 - 42)));
      return Number((8.4 + Math.pow(t, 0.72) * 6.5).toFixed(1));
    }
    return 13.5;
  }

  function getAtomCategoryKey(sym) {
    const el = getElementMap().get(sym);
    return (el && el.category) || 'nonmetal';
  }

  function formatChargeBadge(charge) {
    if (!charge) return '';
    const abs = Math.abs(charge);
    const sign = charge > 0 ? '+' : '−';
    return abs === 1 ? sign : `${abs}${sign}`;
  }

  function bondDist(symA, symB, gap = 8.5) {
    return getAtomRadius(symA) + getAtomRadius(symB) + gap;
  }

  function cloneGraph(g) {
    return {
      atoms: g.atoms.map((a) => ({ ...a })),
      bonds: g.bonds.map((b) => ({ ...b })),
      badges: (g.badges || []).map((bg) => ({ ...bg }))
    };
  }

  function mirrorGraphX(g) {
    return {
      atoms: g.atoms.map((a) => ({ ...a, x: -a.x })),
      bonds: g.bonds.map((b) => ({ ...b })),
      badges: (g.badges || []).map((bg) => ({ ...bg, x: -bg.x }))
    };
  }

  function measureGraph(g) {
    if (!g || !g.atoms || g.atoms.length === 0) {
      return { minX: -12, maxX: 12, minY: -12, maxY: 12, width: 24, height: 24, cx: 0, cy: 0 };
    }
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    g.atoms.forEach((a) => {
      const r = a.r || getAtomRadius(a.sym);
      if (a.x - r < minX) minX = a.x - r;
      if (a.x + r > maxX) maxX = a.x + r;
      if (a.y - r < minY) minY = a.y - r;
      if (a.y + r > maxY) maxY = a.y + r;
    });

    (g.badges || []).forEach((bg) => {
      const padX = bg.text.length * 4 + 5;
      if (bg.x - padX < minX) minX = bg.x - padX;
      if (bg.x + padX > maxX) maxX = bg.x + padX;
      if (bg.y - 7 < minY) minY = bg.y - 7;
      if (bg.y + 6 > maxY) maxY = bg.y + 6;
    });

    return {
      minX,
      maxX,
      minY,
      maxY,
      width: Math.max(16, maxX - minX),
      height: Math.max(16, maxY - minY),
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2
    };
  }

  function centerGraph(g) {
    const m = measureGraph(g);
    g.atoms.forEach((a) => {
      a.x -= m.cx;
      a.y -= m.cy;
    });
    (g.badges || []).forEach((bg) => {
      bg.x -= m.cx;
      bg.y -= m.cy;
    });
    return g;
  }

  function mergeGraphUnit(target, unit, dx, dy) {
    const offset = target.atoms.length;
    unit.atoms.forEach((a) => {
      target.atoms.push({ ...a, x: a.x + dx, y: a.y + dy });
    });
    unit.bonds.forEach((b) => {
      target.bonds.push({ ...b, a: b.a + offset, b: b.b + offset });
    });
    (unit.badges || []).forEach((bg) => {
      target.badges.push({ ...bg, x: bg.x + dx, y: bg.y + dy });
    });
    return offset; // anchor index (atom 0 of unit)
  }

  // Build radial polyatomic unit around central atom (index 0)
  function buildStarUnit(centerSym, satellites, bondOrders = [], startAngleDeg = -90, gap = 8) {
    const atoms = [{ sym: centerSym, x: 0, y: 0 }];
    const bonds = [];
    const n = satellites.length;
    for (let i = 0; i < n; i++) {
      const satSym = satellites[i];
      const ang = ((startAngleDeg + (360 * i) / n) * Math.PI) / 180;
      const dist = bondDist(centerSym, satSym, gap);
      atoms.push({
        sym: satSym,
        x: Number((Math.cos(ang) * dist).toFixed(1)),
        y: Number((Math.sin(ang) * dist).toFixed(1))
      });
      bonds.push({ a: 0, b: i + 1, order: bondOrders[i] || 1, kind: 'covalent' });
    }
    return { atoms, bonds, badges: [] };
  }

  // Layer 1 Polyatomic Ion Geometries (anchor is atom 0)
  function buildPolyatomicIonUnit(ionFormula) {
    if (ionFormula === 'OH') {
      const d = bondDist('O', 'H', 7.5);
      return {
        atoms: [{ sym: 'O', x: 0, y: 0 }, { sym: 'H', x: d, y: 0 }],
        bonds: [{ a: 0, b: 1, order: 1, kind: 'covalent' }],
        badges: []
      };
    }
    if (ionFormula === 'CN') {
      const d = bondDist('C', 'N', 8.5);
      return {
        atoms: [{ sym: 'C', x: 0, y: 0 }, { sym: 'N', x: d, y: 0 }],
        bonds: [{ a: 0, b: 1, order: 3, kind: 'covalent' }],
        badges: []
      };
    }
    if (ionFormula === 'HS') {
      const d = bondDist('S', 'H', 7.5);
      return {
        atoms: [{ sym: 'S', x: 0, y: 0 }, { sym: 'H', x: d, y: 0 }],
        bonds: [{ a: 0, b: 1, order: 1, kind: 'covalent' }],
        badges: []
      };
    }
    if (ionFormula === 'ClO') {
      const d = bondDist('O', 'Cl', 8);
      return {
        atoms: [{ sym: 'O', x: 0, y: 0 }, { sym: 'Cl', x: d, y: 0 }],
        bonds: [{ a: 0, b: 1, order: 1, kind: 'covalent' }],
        badges: []
      };
    }
    if (ionFormula === 'CO3') return buildStarUnit('C', ['O', 'O', 'O'], [2, 1, 1], -90, 7.5);
    if (ionFormula === 'NO3') return buildStarUnit('N', ['O', 'O', 'O'], [2, 1, 1], -90, 7.5);
    if (ionFormula === 'SO3') return buildStarUnit('S', ['O', 'O', 'O'], [2, 1, 1], -90, 7.5);
    if (ionFormula === 'ClO3') return buildStarUnit('Cl', ['O', 'O', 'O'], [2, 2, 1], -90, 7.5);
    if (ionFormula === 'SiO3') return buildStarUnit('Si', ['O', 'O', 'O'], [2, 1, 1], -90, 7.5);
    if (ionFormula === 'NO2') {
      const d = bondDist('N', 'O', 8);
      const rad = (58 * Math.PI) / 180;
      return {
        atoms: [
          { sym: 'N', x: 0, y: -5 },
          { sym: 'O', x: -Math.sin(rad) * d, y: -5 + Math.cos(rad) * d },
          { sym: 'O', x: Math.sin(rad) * d, y: -5 + Math.cos(rad) * d }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' }
        ],
        badges: []
      };
    }
    if (ionFormula === 'SO4') return buildStarUnit('S', ['O', 'O', 'O', 'O'], [2, 1, 2, 1], -90, 7);
    if (ionFormula === 'PO4') return buildStarUnit('P', ['O', 'O', 'O', 'O'], [2, 1, 1, 1], -90, 7);
    if (ionFormula === 'NH4') return buildStarUnit('N', ['H', 'H', 'H', 'H'], [1, 1, 1, 1], -90, 7);
    if (ionFormula === 'MnO4') return buildStarUnit('Mn', ['O', 'O', 'O', 'O'], [2, 2, 2, 1], -90, 7);
    if (ionFormula === 'CrO4') return buildStarUnit('Cr', ['O', 'O', 'O', 'O'], [2, 1, 2, 1], -90, 7);
    if (ionFormula === 'Cr2O7') {
      const d = bondDist('Cr', 'O', 5.5);
      const rad65 = (65 * Math.PI) / 180;
      const rad115 = (115 * Math.PI) / 180;
      return {
        atoms: [
          { sym: 'O', x: 0, y: 0 },
          { sym: 'Cr', x: -d, y: 0 },
          { sym: 'Cr', x: d, y: 0 },
          { sym: 'O', x: Number((-2 * d).toFixed(1)), y: 0 },
          { sym: 'O', x: Number((-d + Math.cos(rad115) * d).toFixed(1)), y: Number((-Math.sin(rad115) * d).toFixed(1)) },
          { sym: 'O', x: Number((-d + Math.cos(rad115) * d).toFixed(1)), y: Number((Math.sin(rad115) * d).toFixed(1)) },
          { sym: 'O', x: Number((2 * d).toFixed(1)), y: 0 },
          { sym: 'O', x: Number((d + Math.cos(rad65) * d).toFixed(1)), y: Number((-Math.sin(rad65) * d).toFixed(1)) },
          { sym: 'O', x: Number((d + Math.cos(rad65) * d).toFixed(1)), y: Number((Math.sin(rad65) * d).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 1, b: 3, order: 1, kind: 'covalent' },
          { a: 1, b: 4, order: 2, kind: 'covalent' },
          { a: 1, b: 5, order: 2, kind: 'covalent' },
          { a: 2, b: 6, order: 1, kind: 'covalent' },
          { a: 2, b: 7, order: 2, kind: 'covalent' },
          { a: 2, b: 8, order: 2, kind: 'covalent' }
        ],
        badges: []
      };
    }
    if (ionFormula === 'ClO4') return buildStarUnit('Cl', ['O', 'O', 'O', 'O'], [2, 2, 2, 1], -90, 7);
    if (ionFormula === 'AlO2') {
      const d = bondDist('Al', 'O', 7.5);
      return {
        atoms: [
          { sym: 'Al', x: 0, y: 0 },
          { sym: 'O', x: -d, y: 0 },
          { sym: 'O', x: d, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' }
        ],
        badges: []
      };
    }
    if (ionFormula === 'ZnO2') {
      const d = bondDist('Zn', 'O', 7.5);
      return {
        atoms: [
          { sym: 'Zn', x: 0, y: 0 },
          { sym: 'O', x: -d, y: 0 },
          { sym: 'O', x: d, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' }
        ],
        badges: []
      };
    }
    if (ionFormula === 'HCO3') {
      const g = buildStarUnit('C', ['O', 'O', 'O'], [2, 1, 1], -90, 7.5);
      const oRight = g.atoms[2];
      const dh = bondDist('O', 'H', 6.5);
      g.atoms.push({ sym: 'H', x: oRight.x + dh * 0.9, y: oRight.y + dh * 0.25 });
      g.bonds.push({ a: 2, b: 4, order: 1, kind: 'covalent' });
      return g;
    }
    if (ionFormula === 'HSO4') {
      const g = buildStarUnit('S', ['O', 'O', 'O', 'O'], [2, 1, 2, 1], -90, 7);
      const oRight = g.atoms[2];
      const dh = bondDist('O', 'H', 6.5);
      g.atoms.push({ sym: 'H', x: oRight.x + dh, y: oRight.y });
      g.bonds.push({ a: 2, b: 5, order: 1, kind: 'covalent' });
      return g;
    }
    if (ionFormula === 'CH3COO') {
      const dCC = bondDist('C', 'C', 7.5);
      const dCO = bondDist('C', 'O', 7);
      return {
        atoms: [
          { sym: 'C', x: 0, y: 0 },
          { sym: 'C', x: -dCC, y: 0 },
          { sym: 'O', x: dCO * 0.72, y: -dCO * 0.72 },
          { sym: 'O', x: dCO * 0.72, y: dCO * 0.72 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 2, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' }
        ],
        badges: []
      };
    }
    return null;
  }

  // Layer 1: Standard curated molecular geometries (~35 common molecules)
  function buildLayer1Molecule(formula) {
    // Diatomic linear molecules
    const DIATOMICS = {
      H2: ['H', 'H', 1],
      Cl2: ['Cl', 'Cl', 1],
      Br2: ['Br', 'Br', 1],
      I2: ['I', 'I', 1],
      F2: ['F', 'F', 1],
      HCl: ['H', 'Cl', 1],
      HBr: ['H', 'Br', 1],
      HI: ['H', 'I', 1],
      HF: ['H', 'F', 1],
      O2: ['O', 'O', 2],
      NO: ['N', 'O', 2],
      N2: ['N', 'N', 3],
      CO: ['C', 'O', 3]
    };
    if (DIATOMICS[formula]) {
      const [s1, s2, order] = DIATOMICS[formula];
      const gap = order === 3 ? 11 : order === 2 ? 10 : 9;
      const d = bondDist(s1, s2, gap);
      return centerGraph({
        atoms: [{ sym: s1, x: -d / 2, y: 0 }, { sym: s2, x: d / 2, y: 0 }],
        bonds: [{ a: 0, b: 1, order, kind: 'covalent' }],
        badges: []
      });
    }

    // Linear 3-atom & 4-atom: CO2, C2H2
    if (formula === 'CO2') {
      const d = bondDist('C', 'O', 9.5);
      return centerGraph({
        atoms: [
          { sym: 'O', x: -d, y: 0 },
          { sym: 'C', x: 0, y: 0 },
          { sym: 'O', x: d, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 1, b: 2, order: 2, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2H2') {
      const dCC = bondDist('C', 'C', 10);
      const dCH = bondDist('C', 'H', 7.5);
      return centerGraph({
        atoms: [
          { sym: 'H', x: -dCC / 2 - dCH, y: 0 },
          { sym: 'C', x: -dCC / 2, y: 0 },
          { sym: 'C', x: dCC / 2, y: 0 },
          { sym: 'H', x: dCC / 2 + dCH, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 3, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }

    // Bent / V-shaped: H2O, H2S, SO2, NO2, H2O2, O3, HClO
    if (formula === 'H2O' || formula === 'H2S') {
      const center = formula === 'H2O' ? 'O' : 'S';
      const d = bondDist(center, 'H', 7.5);
      const halfRad = ((formula === 'H2O' ? 52 : 46) * Math.PI) / 180;
      return centerGraph({
        atoms: [
          { sym: center, x: 0, y: 0 },
          { sym: 'H', x: -Math.sin(halfRad) * d, y: Math.cos(halfRad) * d },
          { sym: 'H', x: Math.sin(halfRad) * d, y: Math.cos(halfRad) * d }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'SO2' || formula === 'NO2' || formula === 'O3') {
      const center = formula === 'SO2' ? 'S' : formula === 'NO2' ? 'N' : 'O';
      const d = bondDist(center, 'O', 8.5);
      const halfRad = (60 * Math.PI) / 180;
      const ord2 = formula === 'SO2' ? 2 : 1;
      return centerGraph({
        atoms: [
          { sym: center, x: 0, y: 0 },
          { sym: 'O', x: -Math.sin(halfRad) * d, y: Math.cos(halfRad) * d },
          { sym: 'O', x: Math.sin(halfRad) * d, y: Math.cos(halfRad) * d }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: ord2, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'H2O2') {
      const dOO = bondDist('O', 'O', 8.5);
      const dOH = bondDist('O', 'H', 7);
      return centerGraph({
        atoms: [
          { sym: 'H', x: -dOO / 2 - dOH * 0.65, y: -dOH * 0.72 },
          { sym: 'O', x: -dOO / 2, y: 0 },
          { sym: 'O', x: dOO / 2, y: 0 },
          { sym: 'H', x: dOO / 2 + dOH * 0.65, y: dOH * 0.72 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'HClO') {
      const dOH = bondDist('O', 'H', 7);
      const dOCl = bondDist('O', 'Cl', 8);
      return centerGraph({
        atoms: [
          { sym: 'O', x: 0, y: -4 },
          { sym: 'H', x: -dOH * 0.8, y: dOH * 0.6 },
          { sym: 'Cl', x: dOCl * 0.85, y: dOCl * 0.52 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }

    // Pyramidal / Trigonal planar: NH3, SO3
    if (formula === 'NH3') {
      const d = bondDist('N', 'H', 7.5);
      return centerGraph({
        atoms: [
          { sym: 'N', x: 0, y: -6 },
          { sym: 'H', x: -d * 0.88, y: -6 + d * 0.56 },
          { sym: 'H', x: 0, y: -6 + d * 1.02 },
          { sym: 'H', x: d * 0.88, y: -6 + d * 0.56 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'SO3') {
      return centerGraph(buildStarUnit('S', ['O', 'O', 'O'], [2, 2, 2], -90, 8));
    }

    // Tetrahedral / 2D Cross: CH4, CCl4
    if (formula === 'CH4') {
      return centerGraph(buildStarUnit('C', ['H', 'H', 'H', 'H'], [1, 1, 1, 1], -90, 7.5));
    }
    if (formula === 'CCl4') {
      return centerGraph(buildStarUnit('C', ['Cl', 'Cl', 'Cl', 'Cl'], [1, 1, 1, 1], -90, 8));
    }

    // Common Oxyacids: H2SO4, HNO3, H3PO4, H2CO3, H2SO3
    if (formula === 'H2SO4') {
      const dSO = bondDist('S', 'O', 7.5);
      const dOH = bondDist('O', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'S', x: 0, y: 0 },
          { sym: 'O', x: 0, y: -dSO },
          { sym: 'O', x: 0, y: dSO },
          { sym: 'O', x: -dSO, y: 0 },
          { sym: 'O', x: dSO, y: 0 },
          { sym: 'H', x: -dSO - dOH * 0.85, y: -dOH * 0.45 },
          { sym: 'H', x: dSO + dOH * 0.85, y: dOH * 0.45 }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 2, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 3, b: 5, order: 1, kind: 'covalent' },
          { a: 4, b: 6, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'HNO3') {
      const g = buildStarUnit('N', ['O', 'O', 'O'], [2, 1, 1], -90, 7.5);
      const oRight = g.atoms[2];
      const dh = bondDist('O', 'H', 6.5);
      g.atoms.push({ sym: 'H', x: oRight.x + dh * 0.9, y: oRight.y - dh * 0.25 });
      g.bonds.push({ a: 2, b: 4, order: 1, kind: 'covalent' });
      return centerGraph(g);
    }
    if (formula === 'H3PO4') {
      const dPO = bondDist('P', 'O', 7);
      const dOH = bondDist('O', 'H', 6);
      return centerGraph({
        atoms: [
          { sym: 'P', x: 0, y: 0 },
          { sym: 'O', x: 0, y: -dPO },
          { sym: 'O', x: -dPO, y: 0 },
          { sym: 'O', x: dPO, y: 0 },
          { sym: 'O', x: 0, y: dPO },
          { sym: 'H', x: -dPO - dOH * 0.85, y: 0 },
          { sym: 'H', x: dPO + dOH * 0.85, y: 0 },
          { sym: 'H', x: dOH * 0.7, y: dPO + dOH * 0.6 }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 2, b: 5, order: 1, kind: 'covalent' },
          { a: 3, b: 6, order: 1, kind: 'covalent' },
          { a: 4, b: 7, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'H2CO3' || formula === 'H2SO3') {
      const cen = formula === 'H2CO3' ? 'C' : 'S';
      const g = buildStarUnit(cen, ['O', 'O', 'O'], [2, 1, 1], -90, 7.5);
      const dh = bondDist('O', 'H', 6.5);
      g.atoms.push({ sym: 'H', x: g.atoms[2].x + dh * 0.85, y: g.atoms[2].y + dh * 0.25 });
      g.atoms.push({ sym: 'H', x: g.atoms[3].x - dh * 0.85, y: g.atoms[3].y + dh * 0.25 });
      g.bonds.push({ a: 2, b: 4, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 3, b: 5, order: 1, kind: 'covalent' });
      return centerGraph(g);
    }

    // Organics: C2H4, C2H5OH, CH3COOH, C6H12O6
    if (formula === 'C2H4') {
      const dCC = bondDist('C', 'C', 9);
      const dCH = bondDist('C', 'H', 7);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC / 2, y: 0 },
          { sym: 'C', x: dCC / 2, y: 0 },
          { sym: 'H', x: -dCC / 2 - dCH * 0.72, y: -dCH * 0.72 },
          { sym: 'H', x: -dCC / 2 - dCH * 0.72, y: dCH * 0.72 },
          { sym: 'H', x: dCC / 2 + dCH * 0.72, y: -dCH * 0.72 },
          { sym: 'H', x: dCC / 2 + dCH * 0.72, y: dCH * 0.72 }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 1, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2H5OH') {
      const dCC = bondDist('C', 'C', 7.5);
      const dCO = bondDist('C', 'O', 7.5);
      const dOH = bondDist('O', 'H', 6.5);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 0 },
          { sym: 'C', x: 0, y: 0 },
          { sym: 'O', x: dCO, y: 0 },
          { sym: 'H', x: dCO + dOH * 0.85, y: -dOH * 0.45 },
          { sym: 'H', x: -dCC, y: -dCH },
          { sym: 'H', x: -dCC, y: dCH },
          { sym: 'H', x: 0, y: -dCH },
          { sym: 'H', x: 0, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 0, b: 5, order: 1, kind: 'covalent' },
          { a: 1, b: 6, order: 1, kind: 'covalent' },
          { a: 1, b: 7, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'CH3COOH') {
      const dCC = bondDist('C', 'C', 8);
      const dCO = bondDist('C', 'O', 7.5);
      const dOH = bondDist('O', 'H', 6.5);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 0 },
          { sym: 'C', x: 0, y: 0 },
          { sym: 'O', x: 0, y: -dCO },
          { sym: 'O', x: dCO, y: 0 },
          { sym: 'H', x: dCO + dOH * 0.88, y: -dOH * 0.35 },
          { sym: 'H', x: -dCC - dCH * 0.85, y: 0 },
          { sym: 'H', x: -dCC, y: -dCH },
          { sym: 'H', x: -dCC, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 2, kind: 'covalent' },
          { a: 1, b: 3, order: 1, kind: 'covalent' },
          { a: 3, b: 4, order: 1, kind: 'covalent' },
          { a: 0, b: 5, order: 1, kind: 'covalent' },
          { a: 0, b: 6, order: 1, kind: 'covalent' },
          { a: 0, b: 7, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C6H12O6') {
      // Compact pyranose ring motif (5 C + 1 O hexagon + 2 exocyclic O)
      const R = 22;
      const ringSyms = ['O', 'C', 'C', 'C', 'C', 'C'];
      const atoms = ringSyms.map((sym, i) => {
        const ang = ((-60 + i * 60) * Math.PI) / 180;
        return { sym, x: Number((Math.cos(ang) * R).toFixed(1)), y: Number((Math.sin(ang) * R).toFixed(1)) };
      });
      const bonds = [
        { a: 0, b: 1, order: 1, kind: 'covalent' },
        { a: 1, b: 2, order: 1, kind: 'covalent' },
        { a: 2, b: 3, order: 1, kind: 'covalent' },
        { a: 3, b: 4, order: 1, kind: 'covalent' },
        { a: 4, b: 5, order: 1, kind: 'covalent' },
        { a: 5, b: 0, order: 1, kind: 'covalent' }
      ];
      return centerGraph({ atoms, bonds, badges: [] });
    }

    // Extended High School Organic Structures (Benzene rings, functional groups, chains, esters, polyols)
    const buildHexRing = (aromatic = true) => {
      const R = 25;
      const atoms = [];
      const bonds = [];
      for (let i = 0; i < 6; i++) {
        const ang = ((i * 60) * Math.PI) / 180;
        atoms.push({
          sym: 'C',
          x: Number((Math.cos(ang) * R).toFixed(1)),
          y: Number((Math.sin(ang) * R).toFixed(1))
        });
        bonds.push({
          a: i,
          b: (i + 1) % 6,
          order: aromatic && i % 2 === 0 ? 2 : 1,
          kind: 'covalent'
        });
      }
      return { atoms, bonds, badges: [], R };
    };

    if (formula === 'C6H6') {
      const g = buildHexRing(true);
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'C6H12') {
      const g = buildHexRing(false);
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'C6H5OH') {
      const g = buildHexRing(true);
      const dCO = bondDist('C', 'O', 6.5);
      const dOH = bondDist('O', 'H', 6);
      const ox = g.R + dCO;
      g.atoms.push({ sym: 'O', x: Number(ox.toFixed(1)), y: 0 });
      g.atoms.push({ sym: 'H', x: Number((ox + dOH * 0.78).toFixed(1)), y: Number((-dOH * 0.62).toFixed(1)) });
      g.bonds.push({ a: 0, b: 6, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 7, order: 1, kind: 'covalent' });
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'C6H5ONa' || formula === 'C6H5OK') {
      const mSym = formula === 'C6H5ONa' ? 'Na' : 'K';
      const g = buildHexRing(true);
      const dCO = bondDist('C', 'O', 6.5);
      const dOM = bondDist('O', mSym, 12);
      const ox = g.R + dCO;
      const mx = ox + dOM;
      g.atoms.push({ sym: 'O', x: Number(ox.toFixed(1)), y: 0 });
      g.atoms.push({ sym: mSym, x: Number(mx.toFixed(1)), y: 0 });
      g.bonds.push({ a: 0, b: 6, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 7, order: 1, kind: 'ionic' });
      return centerGraph({
        atoms: g.atoms,
        bonds: g.bonds,
        badges: [
          { x: Number(ox.toFixed(1)), y: -15, text: '−', sign: 'neg' },
          { x: Number(mx.toFixed(1)), y: -17, text: '+', sign: 'pos' }
        ]
      });
    }
    if (formula === 'C6H5NH2') {
      const g = buildHexRing(true);
      const dCN = bondDist('C', 'N', 6.5);
      const dNH = bondDist('N', 'H', 6);
      const nx = g.R + dCN;
      g.atoms.push({ sym: 'N', x: Number(nx.toFixed(1)), y: 0 });
      g.atoms.push({ sym: 'H', x: Number((nx + dNH * 0.72).toFixed(1)), y: Number((-dNH * 0.68).toFixed(1)) });
      g.atoms.push({ sym: 'H', x: Number((nx + dNH * 0.72).toFixed(1)), y: Number((dNH * 0.68).toFixed(1)) });
      g.bonds.push({ a: 0, b: 6, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 7, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 8, order: 1, kind: 'covalent' });
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'C6H5Br' || formula === 'C6H5Cl') {
      const xSym = formula === 'C6H5Br' ? 'Br' : 'Cl';
      const g = buildHexRing(true);
      const dCX = bondDist('C', xSym, 7);
      g.atoms.push({ sym: xSym, x: Number((g.R + dCX).toFixed(1)), y: 0 });
      g.bonds.push({ a: 0, b: 6, order: 1, kind: 'covalent' });
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'C7H8') {
      const g = buildHexRing(true);
      const dCC = bondDist('C', 'C', 6.5);
      const dCH = bondDist('C', 'H', 5.5);
      const cx = g.R + dCC;
      g.atoms.push({ sym: 'C', x: Number(cx.toFixed(1)), y: 0 });
      g.atoms.push({ sym: 'H', x: Number((cx + dCH).toFixed(1)), y: 0 });
      g.atoms.push({ sym: 'H', x: Number(cx.toFixed(1)), y: Number((-dCH).toFixed(1)) });
      g.atoms.push({ sym: 'H', x: Number(cx.toFixed(1)), y: Number(dCH.toFixed(1)) });
      g.bonds.push({ a: 0, b: 6, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 7, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 8, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 9, order: 1, kind: 'covalent' });
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'C6H5NO2') {
      const g = buildHexRing(true);
      const dCN = bondDist('C', 'N', 6.5);
      const dNO = bondDist('N', 'O', 6.5);
      const nx = g.R + dCN;
      g.atoms.push({ sym: 'N', x: Number(nx.toFixed(1)), y: 0 });
      g.atoms.push({ sym: 'O', x: Number((nx + dNO * 0.72).toFixed(1)), y: Number((-dNO * 0.68).toFixed(1)) });
      g.atoms.push({ sym: 'O', x: Number((nx + dNO * 0.72).toFixed(1)), y: Number((dNO * 0.68).toFixed(1)) });
      g.bonds.push({ a: 0, b: 6, order: 1, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 7, order: 2, kind: 'covalent' });
      g.bonds.push({ a: 6, b: 8, order: 1, kind: 'covalent' });
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'C6H2Br3OH' || formula === 'C6H2Br3NH2') {
      const g = buildHexRing(true);
      const isOH = formula === 'C6H2Br3OH';
      const headSym = isOH ? 'O' : 'N';
      const dHead = bondDist('C', headSym, 6);
      const dCBr = bondDist('C', 'Br', 6.5);
      g.atoms.push({ sym: headSym, x: Number((g.R + dHead).toFixed(1)), y: 0 });
      g.bonds.push({ a: 0, b: 6, order: 1, kind: 'covalent' });
      // Attach 3 Br atoms at ortho (vertices 1, 5) and para (vertex 3)
      [1, 3, 5].forEach((vIdx) => {
        const v = g.atoms[vIdx];
        const ang = (vIdx * 60 * Math.PI) / 180;
        const brIdx = g.atoms.length;
        g.atoms.push({
          sym: 'Br',
          x: Number((v.x + Math.cos(ang) * dCBr).toFixed(1)),
          y: Number((v.y + Math.sin(ang) * dCBr).toFixed(1))
        });
        g.bonds.push({ a: vIdx, b: brIdx, order: 1, kind: 'covalent' });
      });
      return centerGraph({ atoms: g.atoms, bonds: g.bonds, badges: [] });
    }
    if (formula === 'HCHO') {
      const dCO = bondDist('C', 'O', 8.5);
      const dCH = bondDist('C', 'H', 7);
      return centerGraph({
        atoms: [
          { sym: 'C', x: 0, y: 0 },
          { sym: 'O', x: 0, y: -dCO },
          { sym: 'H', x: Number((-dCH * 0.86).toFixed(1)), y: Number((dCH * 0.52).toFixed(1)) },
          { sym: 'H', x: Number((dCH * 0.86).toFixed(1)), y: Number((dCH * 0.52).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'CH3CHO') {
      const dCC = bondDist('C', 'C', 8);
      const dCO = bondDist('C', 'O', 8);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 0 },
          { sym: 'C', x: 0, y: 0 },
          { sym: 'O', x: Number((dCO * 0.72).toFixed(1)), y: Number((-dCO * 0.72).toFixed(1)) },
          { sym: 'H', x: Number((dCH * 0.78).toFixed(1)), y: Number((dCH * 0.65).toFixed(1)) },
          { sym: 'H', x: Number((-dCC - dCH * 0.88).toFixed(1)), y: 0 },
          { sym: 'H', x: -dCC, y: -dCH },
          { sym: 'H', x: -dCC, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 2, kind: 'covalent' },
          { a: 1, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 0, b: 5, order: 1, kind: 'covalent' },
          { a: 0, b: 6, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'HCOOH') {
      const dCO = bondDist('C', 'O', 7.5);
      const dOH = bondDist('O', 'H', 6.5);
      const dCH = bondDist('C', 'H', 7);
      return centerGraph({
        atoms: [
          { sym: 'C', x: 0, y: 0 },
          { sym: 'O', x: 0, y: -dCO },
          { sym: 'H', x: -dCH, y: 0 },
          { sym: 'O', x: dCO, y: 0 },
          { sym: 'H', x: Number((dCO + dOH * 0.85).toFixed(1)), y: Number((-dOH * 0.4).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 3, b: 4, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'CH3COOC2H5' || formula === 'CH3COOCH3' || formula === 'HCOOC2H5' || formula === 'HCOOCH3') {
      const isFormate = formula.startsWith('HCOO');
      const isEthyl = formula.endsWith('C2H5');
      const dCC = bondDist('C', 'C', 6.5);
      const dCO = bondDist('C', 'O', 6.5);
      const dCH = bondDist('C', 'H', 6.5);
      const atoms = [];
      const bonds = [];
      // Left group (H or CH3 carbon) -> Carbonyl C(=O) -> Ester O -> Right alkyl chain
      atoms.push({ sym: isFormate ? 'H' : 'C', x: Number((-(isFormate ? dCH : dCC)).toFixed(1)), y: 6 });
      atoms.push({ sym: 'C', x: 0, y: 0 });
      atoms.push({ sym: 'O', x: 0, y: Number((-dCO).toFixed(1)) });
      atoms.push({ sym: 'O', x: Number(dCO.toFixed(1)), y: 6 });
      atoms.push({ sym: 'C', x: Number((dCO + dCO * 0.92).toFixed(1)), y: 0 });
      bonds.push({ a: 0, b: 1, order: 1, kind: 'covalent' });
      bonds.push({ a: 1, b: 2, order: 2, kind: 'covalent' });
      bonds.push({ a: 1, b: 3, order: 1, kind: 'covalent' });
      bonds.push({ a: 3, b: 4, order: 1, kind: 'covalent' });
      if (isEthyl) {
        atoms.push({ sym: 'C', x: Number((dCO + dCO * 0.92 + dCC * 0.9).toFixed(1)), y: 8 });
        bonds.push({ a: 4, b: 5, order: 1, kind: 'covalent' });
      }
      return centerGraph({ atoms, bonds, badges: [] });
    }
    if (formula === 'CH3OH') {
      const dCO = bondDist('C', 'O', 7.5);
      const dOH = bondDist('O', 'H', 6.5);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: 0, y: 0 },
          { sym: 'O', x: dCO, y: 0 },
          { sym: 'H', x: Number((dCO + dOH * 0.85).toFixed(1)), y: Number((-dOH * 0.45).toFixed(1)) },
          { sym: 'H', x: -dCH, y: 0 },
          { sym: 'H', x: 0, y: -dCH },
          { sym: 'H', x: 0, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 0, b: 5, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'CH3NH2') {
      const dCN = bondDist('C', 'N', 7.5);
      const dNH = bondDist('N', 'H', 6.5);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: 0, y: 0 },
          { sym: 'N', x: dCN, y: 0 },
          { sym: 'H', x: Number((dCN + dNH * 0.72).toFixed(1)), y: Number((-dNH * 0.68).toFixed(1)) },
          { sym: 'H', x: Number((dCN + dNH * 0.72).toFixed(1)), y: Number((dNH * 0.68).toFixed(1)) },
          { sym: 'H', x: -dCH, y: 0 },
          { sym: 'H', x: 0, y: -dCH },
          { sym: 'H', x: 0, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 1, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 0, b: 5, order: 1, kind: 'covalent' },
          { a: 0, b: 6, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'CH3Cl' || formula === 'CH3Br') {
      const xSym = formula === 'CH3Cl' ? 'Cl' : 'Br';
      return centerGraph(buildStarUnit('C', ['H', xSym, 'H', 'H'], [1, 1, 1, 1], -90, 7.5));
    }
    if (formula === 'C2H6') {
      const dCC = bondDist('C', 'C', 8);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC / 2, y: 0 },
          { sym: 'C', x: dCC / 2, y: 0 },
          { sym: 'H', x: Number((-dCC / 2 - dCH * 0.88).toFixed(1)), y: 0 },
          { sym: 'H', x: -dCC / 2, y: -dCH },
          { sym: 'H', x: -dCC / 2, y: dCH },
          { sym: 'H', x: Number((dCC / 2 + dCH * 0.88).toFixed(1)), y: 0 },
          { sym: 'H', x: dCC / 2, y: -dCH },
          { sym: 'H', x: dCC / 2, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' },
          { a: 1, b: 6, order: 1, kind: 'covalent' },
          { a: 1, b: 7, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2H5Cl' || formula === 'C2H5Br') {
      const xSym = formula === 'C2H5Cl' ? 'Cl' : 'Br';
      const dCC = bondDist('C', 'C', 7.5);
      const dCX = bondDist('C', xSym, 7.5);
      const dCH = bondDist('C', 'H', 6);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 0 },
          { sym: 'C', x: 0, y: 0 },
          { sym: xSym, x: dCX, y: 0 },
          { sym: 'H', x: -dCC, y: -dCH },
          { sym: 'H', x: -dCC, y: dCH },
          { sym: 'H', x: 0, y: -dCH },
          { sym: 'H', x: 0, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' },
          { a: 1, b: 6, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2H4Br2' || formula === 'C2H4Cl2') {
      const xSym = formula === 'C2H4Br2' ? 'Br' : 'Cl';
      const dCC = bondDist('C', 'C', 8);
      const dCX = bondDist('C', xSym, 7);
      const dCH = bondDist('C', 'H', 6);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC / 2, y: 0 },
          { sym: 'C', x: dCC / 2, y: 0 },
          { sym: xSym, x: -dCC / 2, y: -dCX },
          { sym: xSym, x: dCC / 2, y: dCX },
          { sym: 'H', x: -dCC / 2, y: dCH },
          { sym: 'H', x: dCC / 2, y: -dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 1, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2H3Cl') {
      const dCC = bondDist('C', 'C', 9);
      const dCH = bondDist('C', 'H', 6.5);
      const dCCl = bondDist('C', 'Cl', 7);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC / 2, y: 0 },
          { sym: 'C', x: dCC / 2, y: 0 },
          { sym: 'H', x: Number((-dCC / 2 - dCH * 0.72).toFixed(1)), y: Number((-dCH * 0.72).toFixed(1)) },
          { sym: 'H', x: Number((-dCC / 2 - dCH * 0.72).toFixed(1)), y: Number((dCH * 0.72).toFixed(1)) },
          { sym: 'Cl', x: Number((dCC / 2 + dCCl * 0.72).toFixed(1)), y: Number((-dCCl * 0.72).toFixed(1)) },
          { sym: 'H', x: Number((dCC / 2 + dCH * 0.72).toFixed(1)), y: Number((dCH * 0.72).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 1, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2H2Br4') {
      const dCC = bondDist('C', 'C', 8.5);
      const dCBr = bondDist('C', 'Br', 7);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC / 2, y: 0 },
          { sym: 'C', x: dCC / 2, y: 0 },
          { sym: 'Br', x: -dCC / 2, y: -dCBr },
          { sym: 'Br', x: -dCC / 2, y: dCBr },
          { sym: 'Br', x: dCC / 2, y: -dCBr },
          { sym: 'Br', x: dCC / 2, y: dCBr }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 1, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2Ag2' || formula === 'Ag2C2') {
      const dCC = bondDist('C', 'C', 9.5);
      const dCAg = bondDist('C', 'Ag', 9.5);
      return centerGraph({
        atoms: [
          { sym: 'Ag', x: -dCC / 2 - dCAg, y: 0 },
          { sym: 'C', x: -dCC / 2, y: 0 },
          { sym: 'C', x: dCC / 2, y: 0 },
          { sym: 'Ag', x: dCC / 2 + dCAg, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'ionic' },
          { a: 1, b: 2, order: 3, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'ionic' }
        ],
        badges: []
      });
    }
    if (formula === 'C3H4') {
      const dCC = bondDist('C', 'C', 8.5);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 0 },
          { sym: 'C', x: 0, y: 0 },
          { sym: 'C', x: dCC, y: 0 },
          { sym: 'H', x: dCC + dCH, y: 0 },
          { sym: 'H', x: -dCC - dCH * 0.85, y: 0 },
          { sym: 'H', x: -dCC, y: -dCH },
          { sym: 'H', x: -dCC, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 3, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 0, b: 5, order: 1, kind: 'covalent' },
          { a: 0, b: 6, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'CH3CCAg') {
      const dCC = bondDist('C', 'C', 8.5);
      const dCAg = bondDist('C', 'Ag', 8.5);
      const dCH = bondDist('C', 'H', 6.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 0 },
          { sym: 'C', x: 0, y: 0 },
          { sym: 'C', x: dCC, y: 0 },
          { sym: 'Ag', x: dCC + dCAg, y: 0 },
          { sym: 'H', x: -dCC - dCH * 0.85, y: 0 },
          { sym: 'H', x: -dCC, y: -dCH },
          { sym: 'H', x: -dCC, y: dCH }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 3, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'ionic' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 0, b: 5, order: 1, kind: 'covalent' },
          { a: 0, b: 6, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C3H6') {
      const dCC = bondDist('C', 'C', 8);
      const dCH = bondDist('C', 'H', 6);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 4 },
          { sym: 'C', x: 0, y: -4 },
          { sym: 'C', x: dCC, y: 4 },
          { sym: 'H', x: Number((-dCC - dCH * 0.72).toFixed(1)), y: Number((4 - dCH * 0.68).toFixed(1)) },
          { sym: 'H', x: Number((-dCC - dCH * 0.55).toFixed(1)), y: Number((4 + dCH * 0.82).toFixed(1)) },
          { sym: 'H', x: 0, y: Number((-4 - dCH).toFixed(1)) },
          { sym: 'H', x: Number((dCC + dCH * 0.85).toFixed(1)), y: 4 },
          { sym: 'H', x: dCC, y: Number((4 + dCH).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 2, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' },
          { a: 2, b: 6, order: 1, kind: 'covalent' },
          { a: 2, b: 7, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C3H8') {
      const dCC = bondDist('C', 'C', 7.5);
      const dCH = bondDist('C', 'H', 6);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: 5 },
          { sym: 'C', x: 0, y: -5 },
          { sym: 'C', x: dCC, y: 5 },
          { sym: 'H', x: Number((-dCC - dCH * 0.85).toFixed(1)), y: 5 },
          { sym: 'H', x: -dCC, y: Number((5 + dCH).toFixed(1)) },
          { sym: 'H', x: 0, y: Number((-5 - dCH).toFixed(1)) },
          { sym: 'H', x: Number((dCC + dCH * 0.85).toFixed(1)), y: 5 },
          { sym: 'H', x: dCC, y: Number((5 + dCH).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' },
          { a: 2, b: 6, order: 1, kind: 'covalent' },
          { a: 2, b: 7, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C2H4(OH)2') {
      const dCC = bondDist('C', 'C', 8);
      const dCO = bondDist('C', 'O', 7);
      const dOH = bondDist('O', 'H', 5.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC / 2, y: -8 },
          { sym: 'C', x: dCC / 2, y: -8 },
          { sym: 'O', x: -dCC / 2, y: -8 + dCO },
          { sym: 'O', x: dCC / 2, y: -8 + dCO },
          { sym: 'H', x: Number((-dCC / 2 - dOH * 0.72).toFixed(1)), y: Number((-8 + dCO + dOH * 0.65).toFixed(1)) },
          { sym: 'H', x: Number((dCC / 2 + dOH * 0.72).toFixed(1)), y: Number((-8 + dCO + dOH * 0.65).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 1, b: 3, order: 1, kind: 'covalent' },
          { a: 2, b: 4, order: 1, kind: 'covalent' },
          { a: 3, b: 5, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === 'C3H5(OH)3') {
      const dCC = bondDist('C', 'C', 7.5);
      const dCO = bondDist('C', 'O', 7);
      const dOH = bondDist('O', 'H', 5.5);
      return centerGraph({
        atoms: [
          { sym: 'C', x: -dCC, y: -12 },
          { sym: 'C', x: 0, y: -12 },
          { sym: 'C', x: dCC, y: -12 },
          { sym: 'O', x: -dCC, y: -12 + dCO },
          { sym: 'O', x: 0, y: -12 + dCO },
          { sym: 'O', x: dCC, y: -12 + dCO },
          { sym: 'H', x: Number((-dCC - dOH * 0.65).toFixed(1)), y: Number((-12 + dCO + dOH * 0.72).toFixed(1)) },
          { sym: 'H', x: Number((dOH * 0.65).toFixed(1)), y: Number((-12 + dCO + dOH * 0.72).toFixed(1)) },
          { sym: 'H', x: Number((dCC + dOH * 0.65).toFixed(1)), y: Number((-12 + dCO + dOH * 0.72).toFixed(1)) }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 1, b: 4, order: 1, kind: 'covalent' },
          { a: 2, b: 5, order: 1, kind: 'covalent' },
          { a: 3, b: 6, order: 1, kind: 'covalent' },
          { a: 4, b: 7, order: 1, kind: 'covalent' },
          { a: 5, b: 8, order: 1, kind: 'covalent' }
        ],
        badges: []
      });
    }
    if (formula === '[Ag(NH3)2]OH') {
      const dAgN = bondDist('Ag', 'N', 7.5);
      const dNO = 22;
      const dOH = bondDist('O', 'H', 5.5);
      return centerGraph({
        atoms: [
          { sym: 'Ag', x: 0, y: 0 },
          { sym: 'N', x: -dAgN, y: 0 },
          { sym: 'N', x: dAgN, y: 0 },
          { sym: 'O', x: dAgN + dNO, y: 0 },
          { sym: 'H', x: dAgN + dNO + dOH, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'ionic' },
          { a: 3, b: 4, order: 1, kind: 'covalent' }
        ],
        badges: [
          { x: 0, y: -18, text: '+', sign: 'pos' },
          { x: dAgN + dNO, y: -15, text: '−', sign: 'neg' }
        ]
      });
    }
    if (formula === 'C12H22O11') {
      // Compact disaccharide motif: pyranose hexagon bridged by O to furanose pentagon
      const R6 = 18;
      const R5 = 16;
      const atoms = [];
      const bonds = [];
      const leftSyms = ['O', 'C', 'C', 'C', 'C', 'C'];
      leftSyms.forEach((sym, i) => {
        const ang = ((-60 + i * 60) * Math.PI) / 180;
        atoms.push({ sym, x: Number((-34 + Math.cos(ang) * R6).toFixed(1)), y: Number((Math.sin(ang) * R6).toFixed(1)) });
        bonds.push({ a: i, b: (i + 1) % 6, order: 1, kind: 'covalent' });
      });
      atoms.push({ sym: 'O', x: 0, y: 5 }); // glycosidic oxygen (idx 6)
      bonds.push({ a: 1, b: 6, order: 1, kind: 'covalent' });
      const rightSyms = ['O', 'C', 'C', 'C', 'C'];
      rightSyms.forEach((sym, i) => {
        const ang = ((-90 + i * 72) * Math.PI) / 180;
        atoms.push({ sym, x: Number((32 + Math.cos(ang) * R5).toFixed(1)), y: Number((Math.sin(ang) * R5).toFixed(1)) });
        bonds.push({ a: 7 + i, b: 7 + ((i + 1) % 5), order: 1, kind: 'covalent' });
      });
      bonds.push({ a: 6, b: 11, order: 1, kind: 'covalent' });
      return centerGraph({ atoms, bonds, badges: [] });
    }

    // Special solids / oxides / complexes
    if (formula === 'Na2[Zn(OH)4]') {
      const znR = getAtomRadius('Zn');
      const dZnO = znR + getAtomRadius('O') + 8;
      const dOH = bondDist('O', 'H', 5.5);
      const g = {
        atoms: [
          { sym: 'Zn', x: 0, y: 0 },
          { sym: 'O', x: 0, y: -dZnO },
          { sym: 'O', x: 0, y: dZnO },
          { sym: 'O', x: -dZnO, y: 0 },
          { sym: 'O', x: dZnO, y: 0 },
          { sym: 'H', x: dOH * 0.85, y: -dZnO - dOH * 0.35 },
          { sym: 'H', x: -dOH * 0.85, y: dZnO + dOH * 0.35 },
          { sym: 'Na', x: -dZnO - 32, y: 0 },
          { sym: 'Na', x: dZnO + 32, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 0, b: 3, order: 1, kind: 'covalent' },
          { a: 0, b: 4, order: 1, kind: 'covalent' },
          { a: 1, b: 5, order: 1, kind: 'covalent' },
          { a: 2, b: 6, order: 1, kind: 'covalent' },
          { a: 3, b: 7, order: 1, kind: 'ionic' },
          { a: 4, b: 8, order: 1, kind: 'ionic' }
        ],
        badges: [
          { x: -dZnO - 42, y: -15, text: '+', sign: 'pos' },
          { x: dZnO + 42, y: -15, text: '+', sign: 'pos' }
        ]
      };
      return centerGraph(g);
    }
    if (formula === 'Na2O2') {
      const dOO = bondDist('O', 'O', 8);
      const dNaO = bondDist('Na', 'O', 13);
      return centerGraph({
        atoms: [
          { sym: 'Na', x: -dOO / 2 - dNaO, y: 0 },
          { sym: 'O', x: -dOO / 2, y: 0 },
          { sym: 'O', x: dOO / 2, y: 0 },
          { sym: 'Na', x: dOO / 2 + dNaO, y: 0 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'ionic' },
          { a: 1, b: 2, order: 1, kind: 'covalent' },
          { a: 2, b: 3, order: 1, kind: 'ionic' }
        ],
        badges: [
          { x: -dOO / 2 - dNaO, y: -18, text: '+', sign: 'pos' },
          { x: 0, y: -14, text: '2−', sign: 'neg' },
          { x: dOO / 2 + dNaO, y: -18, text: '+', sign: 'pos' }
        ]
      });
    }
    if (formula === 'FeS2') {
      const dSS = bondDist('S', 'S', 7.5);
      const dFeS = bondDist('Fe', 'S', 13);
      return centerGraph({
        atoms: [
          { sym: 'Fe', x: -dFeS, y: 0 },
          { sym: 'S', x: 0, y: -dSS / 2 },
          { sym: 'S', x: 0, y: dSS / 2 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'ionic' },
          { a: 0, b: 2, order: 1, kind: 'ionic' },
          { a: 1, b: 2, order: 1, kind: 'covalent' }
        ],
        badges: [
          { x: -dFeS - 4, y: -17, text: '2+', sign: 'pos' },
          { x: 14, y: -15, text: '2−', sign: 'neg' }
        ]
      });
    }
    if (formula === 'Fe3O4') {
      return centerGraph({
        atoms: [
          { sym: 'Fe', x: 0, y: 0 },
          { sym: 'Fe', x: -28, y: -14 },
          { sym: 'Fe', x: 28, y: -14 },
          { sym: 'O', x: -16, y: 14 },
          { sym: 'O', x: 16, y: 14 },
          { sym: 'O', x: 0, y: -22 },
          { sym: 'O', x: 0, y: 24 }
        ],
        bonds: [
          { a: 0, b: 3, order: 1, kind: 'ionic' },
          { a: 0, b: 4, order: 1, kind: 'ionic' },
          { a: 1, b: 3, order: 1, kind: 'ionic' },
          { a: 1, b: 5, order: 1, kind: 'ionic' },
          { a: 2, b: 4, order: 1, kind: 'ionic' },
          { a: 2, b: 5, order: 1, kind: 'ionic' },
          { a: 0, b: 6, order: 1, kind: 'ionic' }
        ],
        badges: []
      });
    }
    if (formula === 'Fe2O3' || formula === 'Al2O3') {
      const mSym = formula === 'Fe2O3' ? 'Fe' : 'Al';
      const d = bondDist(mSym, 'O', 10);
      return centerGraph({
        atoms: [
          { sym: 'O', x: 0, y: -6 },
          { sym: mSym, x: -d * 0.92, y: 6 },
          { sym: mSym, x: d * 0.92, y: 6 },
          { sym: 'O', x: -d * 1.8, y: -6 },
          { sym: 'O', x: d * 1.8, y: -6 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'ionic' },
          { a: 0, b: 2, order: 1, kind: 'ionic' },
          { a: 1, b: 3, order: 1, kind: 'ionic' },
          { a: 2, b: 4, order: 1, kind: 'ionic' }
        ],
        badges: [
          { x: -d * 0.92, y: 24, text: '3+', sign: 'pos' },
          { x: d * 0.92, y: 24, text: '3+', sign: 'pos' }
        ]
      });
    }
    if (formula === 'P2O5') {
      const d = bondDist('P', 'O', 7.5);
      return centerGraph({
        atoms: [
          { sym: 'O', x: 0, y: 0 },
          { sym: 'P', x: -d * 0.95, y: 0 },
          { sym: 'P', x: d * 0.95, y: 0 },
          { sym: 'O', x: -d * 1.65, y: -d * 0.72 },
          { sym: 'O', x: -d * 1.65, y: d * 0.72 },
          { sym: 'O', x: d * 1.65, y: -d * 0.72 },
          { sym: 'O', x: d * 1.65, y: d * 0.72 }
        ],
        bonds: [
          { a: 0, b: 1, order: 1, kind: 'covalent' },
          { a: 0, b: 2, order: 1, kind: 'covalent' },
          { a: 1, b: 3, order: 2, kind: 'covalent' },
          { a: 1, b: 4, order: 2, kind: 'covalent' },
          { a: 2, b: 5, order: 2, kind: 'covalent' },
          { a: 2, b: 6, order: 2, kind: 'covalent' }
        ],
        badges: []
      });
    }

    return null;
  }

  // Layer 2: Algorithmic builder for metals/solids, ionic salts/bases, and other covalent molecules
  function buildLayer2Molecule(formula) {
    const parsed = parseFormulaSyntax(formula, { allowSquare: true });
    if (!parsed.ok) {
      return { atoms: [{ sym: 'C', x: 0, y: 0 }], bonds: [], badges: [] };
    }
    const { atoms: atomCounts, elements } = parsed;
    const eMap = getElementMap();

    // 2a. Elementary solid / metal / noble gas
    if (elements.length === 1) {
      const sym = elements[0];
      const el = eMap.get(sym);
      const r = getAtomRadius(sym);
      if (el && el.macro === 'metal') {
        // Neat compact 3-atom metallic cluster (2 recessed back atoms + 1 hero front atom)
        const dx = r * 0.76;
        const dy = r * 0.62;
        return centerGraph({
          atoms: [
            { sym, x: -dx, y: dy, r: Number((r * 0.86).toFixed(1)), muted: true },
            { sym, x: dx, y: dy, r: Number((r * 0.86).toFixed(1)), muted: true },
            { sym, x: 0, y: -dy * 0.72, r }
          ],
          bonds: [],
          badges: []
        });
      }
      return { atoms: [{ sym, x: 0, y: 0, r }], bonds: [], badges: [] };
    }

    // 2b. Ionic Compounds / Salts / Bases / Metal Oxides
    const split = splitIonicFormula(formula);
    if (split && !split.missingParens) {
      const { cation, cCount, anion, aCount } = split;
      const catEl = cation === 'NH4' ? null : eMap.get(cation);
      const isIonic = cation === 'NH4' || (catEl && catEl.macro === 'metal') || anion.polyatomic;

      if (isIonic && cation !== 'H') {
        const cationVal = Math.max(1, Math.round((aCount * Math.abs(anion.charge)) / cCount));
        const catUnitBase = cation === 'NH4'
          ? buildPolyatomicIonUnit('NH4')
          : { atoms: [{ sym: cation, x: 0, y: 0 }], bonds: [], badges: [] };

        const anUnitBase = anion.polyatomic
          ? (buildPolyatomicIonUnit(anion.formula) || buildStarUnit((anion.formula.match(/^[A-Z][a-z]?/) || ['O'])[0], ['O'], [1]))
          : { atoms: [{ sym: anion.formula, x: 0, y: 0 }], bonds: [], badges: [] };

        const catChargeStr = formatChargeBadge(cationVal);
        const anChargeStr = formatChargeBadge(anion.charge);
        const g = { atoms: [], bonds: [], badges: [] };

        const catBox = measureGraph(catUnitBase);
        const anBox = measureGraph(anUnitBase);
        const ionicGap = 15;

        // 1 : 1 ionic pair (e.g. NaCl, NaOH, AgNO3, BaSO4, CaCO3, FeSO4, KMnO4, NaAlO2)
        if (cCount === 1 && aCount === 1) {
          const catShiftX = -(ionicGap / 2 + catBox.maxX);
          const anShiftX = ionicGap / 2 - anBox.minX;
          const cIdx = mergeGraphUnit(g, catUnitBase, catShiftX, 0);
          const aIdx = mergeGraphUnit(g, anUnitBase, anShiftX, 0);
          g.bonds.push({ a: cIdx, b: aIdx, order: 1, kind: 'ionic' });
          g.badges.push({ x: catShiftX + catBox.cx, y: catBox.minY - 5, text: catChargeStr, sign: 'pos' });
          g.badges.push({ x: anShiftX + anBox.cx + (anion.polyatomic ? 6 : 0), y: anBox.minY - 5, text: anChargeStr, sign: 'neg' });
          return centerGraph(g);
        }

        // 1 : 2 (e.g. BaCl2, Ca(OH)2, Fe(OH)2, Cu(NO3)2, MgCl2)
        if (cCount === 1 && aCount === 2) {
          const cIdx = mergeGraphUnit(g, catUnitBase, 0, 0);
          const leftAn = mirrorGraphX(anUnitBase);
          const leftBox = measureGraph(leftAn);
          const leftShiftX = -(catBox.maxX + ionicGap + leftBox.maxX);
          const rightShiftX = catBox.maxX + ionicGap - anBox.minX;
          const a1 = mergeGraphUnit(g, leftAn, leftShiftX, 0);
          const a2 = mergeGraphUnit(g, anUnitBase, rightShiftX, 0);
          g.bonds.push({ a: cIdx, b: a1, order: 1, kind: 'ionic' });
          g.bonds.push({ a: cIdx, b: a2, order: 1, kind: 'ionic' });
          g.badges.push({ x: 0, y: catBox.minY - 6, text: catChargeStr, sign: 'pos' });
          g.badges.push({ x: leftShiftX + leftBox.minX + 2, y: leftBox.minY - 5, text: anChargeStr, sign: 'neg' });
          g.badges.push({ x: rightShiftX + anBox.maxX - 2, y: anBox.minY - 5, text: anChargeStr, sign: 'neg' });
          return centerGraph(g);
        }

        // 2 : 1 (e.g. Na2SO4, Na2CO3, K2SO4, Na2O, (NH4)2SO4, Na2ZnO2)
        if (cCount === 2 && aCount === 1) {
          const aIdx = mergeGraphUnit(g, anUnitBase, 0, 0);
          const leftShiftX = -(Math.abs(anBox.minX) + ionicGap + catBox.maxX);
          const rightShiftX = anBox.maxX + ionicGap - catBox.minX;
          const c1 = mergeGraphUnit(g, catUnitBase, leftShiftX, 0);
          const c2 = mergeGraphUnit(g, catUnitBase, rightShiftX, 0);
          g.bonds.push({ a: c1, b: aIdx, order: 1, kind: 'ionic' });
          g.bonds.push({ a: c2, b: aIdx, order: 1, kind: 'ionic' });
          g.badges.push({ x: leftShiftX, y: catBox.minY - 5, text: catChargeStr, sign: 'pos' });
          g.badges.push({ x: 0, y: anBox.minY - 6, text: anChargeStr, sign: 'neg' });
          g.badges.push({ x: rightShiftX, y: catBox.minY - 5, text: catChargeStr, sign: 'pos' });
          return centerGraph(g);
        }

        // 1 : 3 (e.g. Fe(OH)3, FeCl3, AlCl3, Al(OH)3, Fe(NO3)3)
        if (cCount === 1 && aCount === 3) {
          const cIdx = mergeGraphUnit(g, catUnitBase, 0, 0);
          const dist = Math.max(catBox.width, catBox.height) * 0.5 + Math.max(anBox.width, anBox.height) * 0.48 + 13;
          const angles = [-90, 28, 152];
          angles.forEach((deg) => {
            const rad = (deg * Math.PI) / 180;
            const unit = deg > 90 ? mirrorGraphX(anUnitBase) : cloneGraph(anUnitBase);
            const uCentered = centerGraph(unit);
            const dx = Number((Math.cos(rad) * dist).toFixed(1));
            const dy = Number((Math.sin(rad) * dist).toFixed(1));
            const aIdx = mergeGraphUnit(g, uCentered, dx, dy);
            g.bonds.push({ a: cIdx, b: aIdx, order: 1, kind: 'ionic' });
          });
          g.badges.push({ x: catBox.maxX + 4, y: -catBox.maxY - 2, text: catChargeStr, sign: 'pos' });
          return centerGraph(g);
        }

        // 3 : 1 (e.g. Na3PO4, K3PO4)
        if (cCount === 3 && aCount === 1) {
          const aIdx = mergeGraphUnit(g, anUnitBase, 0, 0);
          const dist = Math.max(anBox.width, anBox.height) * 0.5 + Math.max(catBox.width, catBox.height) * 0.5 + 13;
          const angles = [-90, 28, 152];
          angles.forEach((deg) => {
            const rad = (deg * Math.PI) / 180;
            const dx = Number((Math.cos(rad) * dist).toFixed(1));
            const dy = Number((Math.sin(rad) * dist).toFixed(1));
            const cIdx = mergeGraphUnit(g, catUnitBase, dx, dy);
            g.bonds.push({ a: cIdx, b: aIdx, order: 1, kind: 'ionic' });
          });
          g.badges.push({ x: anBox.maxX + 4, y: -anBox.maxY - 1, text: anChargeStr, sign: 'neg' });
          return centerGraph(g);
        }

        // Higher stoichiometry (e.g. Fe2(SO4)3, Al2(SO4)3, Ca3(PO4)2): clean representative ionic pair with ion counts
        const catShiftX = -(ionicGap / 2 + catBox.maxX);
        const anShiftX = ionicGap / 2 - anBox.minX;
        const cIdx = mergeGraphUnit(g, catUnitBase, catShiftX, 0);
        const aIdx = mergeGraphUnit(g, anUnitBase, anShiftX, 0);
        g.bonds.push({ a: cIdx, b: aIdx, order: 1, kind: 'ionic' });
        g.badges.push({ x: catShiftX, y: catBox.minY - 6, text: `${cCount}× ${catChargeStr}`, sign: 'pos' });
        g.badges.push({ x: anShiftX, y: anBox.minY - 6, text: `${aCount}× ${anChargeStr}`, sign: 'neg' });
        return centerGraph(g);
      }
    }

    // 2c. General Covalent Fallback: central atom + evenly distributed satellites
    let centerSym = elements[0];
    let bestScore = Infinity;
    elements.forEach((sym) => {
      const cnt = atomCounts[sym];
      const el = eMap.get(sym);
      const eneg = el && el.electronegativity !== null ? el.electronegativity : 2.5;
      const score = (sym === 'H' ? 1000 : 0) + cnt * 10 + eneg;
      if (score < bestScore) {
        bestScore = score;
        centerSym = sym;
      }
    });

    const sats = [];
    elements.forEach((sym) => {
      const n = sym === centerSym ? atomCounts[sym] - 1 : atomCounts[sym];
      for (let i = 0; i < Math.min(n, 6); i++) {
        sats.push(sym);
      }
    });

    if (sats.length === 0) {
      return { atoms: [{ sym: centerSym, x: 0, y: 0 }], bonds: [], badges: [] };
    }
    return centerGraph(buildStarUnit(centerSym, sats.slice(0, 6), [], -90, 8));
  }

  function buildMoleculeGraph(formula) {
    const resolved = resolveChemicalFormula(formula);
    return buildLayer1Molecule(resolved) || buildLayer2Molecule(resolved);
  }

  // Render SVG formula text with clean subscript <tspan>s
  function formatSVGFormulaText(formula) {
    if (formula === 'Fructose') return 'Fructose';
    const escaped = escapeHTML(formula);
    return escaped.replace(/([A-Za-z)\]])(\d+)/g, (_, pre, digits) => {
      const subDigits = digits.replace(/\d/g, (d) => SVG_SUBSCRIPT_DIGITS[d] || d);
      return `${pre}${subDigits}`;
    });
  }

  function collectUsedCategories(graphs) {
    const set = new Set();
    graphs.forEach((g) => {
      (g.atoms || []).forEach((a) => {
        set.add(getAtomCategoryKey(a.sym));
      });
    });
    return Array.from(set);
  }

  function renderAtomDefs(catKeys, uidPrefix) {
    const cats = window.ELEMENT_CATEGORIES || {};
    return catKeys
      .map((key) => {
        const c = cats[key] || { borderHover: '#94a3b8', color: '#475569', bg: '#1e242f' };
        return `
          <radialGradient id="${uidPrefix}_${key}" cx="34%" cy="30%" r="68%">
            <stop offset="0%" stop-color="${c.borderHover}" stop-opacity="0.96" />
            <stop offset="54%" stop-color="${c.color}" stop-opacity="0.94" />
            <stop offset="100%" stop-color="${c.bg}" stop-opacity="0.98" />
          </radialGradient>
        `;
      })
      .join('');
  }

  function renderSingleGraphSVG(graph, cx, cy, scale, lang, uidPrefix) {
    const eMap = getElementMap();
    const cats = window.ELEMENT_CATEGORIES || {};

    // 1. Render bonds first so lines terminate cleanly underneath atom spheres
    const bondsHTML = (graph.bonds || [])
      .map((b) => {
        const a1 = graph.atoms[b.a];
        const a2 = graph.atoms[b.b];
        if (!a1 || !a2) return '';
        const x1 = a1.x;
        const y1 = a1.y;
        const x2 = a2.x;
        const y2 = a2.y;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        const px = -dy / len;
        const py = dx / len;

        if (b.kind === 'ionic') {
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#94a3b8" stroke-width="1.65" stroke-dasharray="3.2 3" stroke-opacity="0.78" />`;
        }

        const order = b.order || 1;
        if (order === 1) {
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#9aa8bd" stroke-width="2.1" stroke-linecap="round" />`;
        }
        if (order === 2) {
          const off = 2.35;
          return `
            <line x1="${(x1 + px * off).toFixed(1)}" y1="${(y1 + py * off).toFixed(1)}" x2="${(x2 + px * off).toFixed(1)}" y2="${(y2 + py * off).toFixed(1)}" stroke="#9aa8bd" stroke-width="1.6" stroke-linecap="round" />
            <line x1="${(x1 - px * off).toFixed(1)}" y1="${(y1 - py * off).toFixed(1)}" x2="${(x2 - px * off).toFixed(1)}" y2="${(y2 - py * off).toFixed(1)}" stroke="#9aa8bd" stroke-width="1.6" stroke-linecap="round" />
          `;
        }
        const off3 = 3.2;
        return `
          <line x1="${(x1 + px * off3).toFixed(1)}" y1="${(y1 + py * off3).toFixed(1)}" x2="${(x2 + px * off3).toFixed(1)}" y2="${(y2 + py * off3).toFixed(1)}" stroke="#9aa8bd" stroke-width="1.35" stroke-linecap="round" />
          <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#9aa8bd" stroke-width="1.35" stroke-linecap="round" />
          <line x1="${(x1 - px * off3).toFixed(1)}" y1="${(y1 - py * off3).toFixed(1)}" x2="${(x2 - px * off3).toFixed(1)}" y2="${(y2 - py * off3).toFixed(1)}" stroke="#9aa8bd" stroke-width="1.35" stroke-linecap="round" />
        `;
      })
      .join('');

    // 2. Render matte 3D spheres with centered symbol and hover <title>
    const atomsHTML = (graph.atoms || [])
      .map((a) => {
        const el = eMap.get(a.sym);
        const catKey = (el && el.category) || 'nonmetal';
        const cat = cats[catKey] || { borderHover: '#94a3b8' };
        const r = a.r || getAtomRadius(a.sym);
        const effR = r * scale;
        const showLabel = !a.muted && effR >= 5.0;
        const fontSize = a.sym.length > 1 ? Math.max(6.0, r * 0.72) : Math.max(6.8, r * 0.92);
        const elName = el ? (lang === 'en' ? el.enName : el.name) : a.sym;
        const tooltip = el ? `${elName} (${el.symbol}) — Z = ${el.number}` : a.sym;

        return `
          <g class="rxn-atom-node" opacity="${a.muted ? '0.68' : '1'}">
            <title>${escapeHTML(tooltip)}</title>
            <circle cx="${a.x.toFixed(1)}" cy="${a.y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#${uidPrefix}_${catKey})" stroke="${cat.borderHover}" stroke-opacity="${a.muted ? '0.45' : '0.78'}" stroke-width="1.15" />
            ${
              showLabel
                ? `<text x="${a.x.toFixed(1)}" y="${(a.y + fontSize * 0.35).toFixed(1)}" text-anchor="middle" font-size="${fontSize.toFixed(1)}" class="rxn-svg-atom-sym">${escapeHTML(a.sym)}</text>`
                : ''
            }
          </g>
        `;
      })
      .join('');

    // 3. Render subtle charge badges (+ / −) for ionic compounds
    const badgesHTML = (graph.badges || [])
      .map((bg) => {
        const fill = bg.sign === 'pos' ? '#d6a494' : '#8cb8cc';
        return `<text x="${bg.x.toFixed(1)}" y="${bg.y.toFixed(1)}" text-anchor="middle" class="rxn-svg-charge" fill="${fill}">${escapeHTML(bg.text)}</text>`;
      })
      .join('');

    return `<g transform="translate(${cx.toFixed(1)}, ${cy.toFixed(1)}) scale(${scale.toFixed(3)})">${bondsHTML}${atomsHTML}${badgesHTML}</g>`;
  }

  // Render a species cluster (either expanded copies <= 3 or single representative + ×N badge)
  function renderSpeciesClusterSVG(item, slotX, slotW, centerY, maxH, expandedMode, lang, uidPrefix) {
    const graph = item.graph;
    const m = measureGraph(graph);
    const padX = 12;
    const availW = Math.max(44, slotW - padX * 2);
    const count = expandedMode ? item.coeff : 1;

    let molSVG = '';
    let coeffBadgeSVG = '';

    if (count === 1) {
      const scale = Math.min(1.06, availW / m.width, maxH / m.height);
      molSVG = renderSingleGraphSVG(graph, slotX + slotW / 2, centerY, scale, lang, uidPrefix);

      if (!expandedMode && item.coeff > 1) {
        const badgeText = `×${item.coeff}`;
        const bw = badgeText.length > 2 ? 32 : 26;
        const bx = slotX + slotW - bw - 4;
        const by = 22;
        coeffBadgeSVG = `
          <g class="rxn-svg-coeff-badge">
            <rect x="${bx.toFixed(1)}" y="${by}" width="${bw}" height="18" rx="4" fill="#272219" stroke="#6b5634" stroke-width="1" />
            <text x="${(bx + bw / 2).toFixed(1)}" y="${by + 12.5}" text-anchor="middle" class="rxn-svg-coeff-text">${badgeText}</text>
          </g>
        `;
      }
    } else if (count === 2) {
      // Arrange 2 identical molecules cleanly stacked vertically (or side-by-side if very tall)
      const tall = m.height > m.width * 1.25;
      if (tall) {
        const gap = 8;
        const scale = Math.min(0.95, (availW - gap) / (m.width * 2), maxH / m.height);
        const step = m.width * scale + gap;
        const midX = slotX + slotW / 2;
        molSVG =
          renderSingleGraphSVG(graph, midX - step / 2, centerY - 2, scale, lang, uidPrefix) +
          renderSingleGraphSVG(graph, midX + step / 2, centerY + 3, scale, lang, uidPrefix);
      } else {
        const gap = 8;
        const scale = Math.min(0.95, availW / (m.width + 8), (maxH - gap) / (m.height * 2));
        const step = m.height * scale + gap;
        const midX = slotX + slotW / 2;
        molSVG =
          renderSingleGraphSVG(graph, midX - 4, centerY - step / 2, scale, lang, uidPrefix) +
          renderSingleGraphSVG(graph, midX + 4, centerY + step / 2, scale, lang, uidPrefix);
      }
    } else {
      // count === 3: compact 2-top / 1-bottom triangle (or 3-vertical if very wide)
      const veryWide = m.width > m.height * 1.7;
      if (veryWide) {
        const gap = 6;
        const scale = Math.min(0.84, availW / m.width, (maxH - gap * 2) / (m.height * 3));
        const step = m.height * scale + gap;
        const midX = slotX + slotW / 2;
        molSVG =
          renderSingleGraphSVG(graph, midX - 3, centerY - step, scale, lang, uidPrefix) +
          renderSingleGraphSVG(graph, midX + 3, centerY, scale, lang, uidPrefix) +
          renderSingleGraphSVG(graph, midX - 2, centerY + step, scale, lang, uidPrefix);
      } else {
        const gapX = 8;
        const gapY = 7;
        const scale = Math.min(0.85, (availW - gapX) / (m.width * 2), (maxH - gapY) / (m.height * 2));
        const stepX = m.width * scale + gapX;
        const stepY = m.height * scale + gapY;
        const midX = slotX + slotW / 2;
        molSVG =
          renderSingleGraphSVG(graph, midX - stepX / 2, centerY - stepY / 2, scale, lang, uidPrefix) +
          renderSingleGraphSVG(graph, midX + stepX / 2, centerY - stepY / 2, scale, lang, uidPrefix) +
          renderSingleGraphSVG(graph, midX, centerY + stepY / 2, scale, lang, uidPrefix);
      }
    }

    return { molSVG, coeffBadgeSVG };
  }

  // Main Scene Builder for Tab 2 Molecular Visualization
  function buildReactionSVG(result, lang = 'vi', animKey = 1) {
    if (!result) return '';
    const d = RXN_I18N[lang] || RXN_I18N.vi;
    const uidPrefix = `rxnGrad${animKey}`;

    const lhsItems = result.reactants.map((r) => ({ ...r, graph: buildMoleculeGraph(r.formula) }));
    const rhsItems = (result.products || []).map((p) => ({ ...p, graph: buildMoleculeGraph(p.formula) }));
    const allGraphs = lhsItems.concat(rhsItems).map((it) => it.graph);
    const defsHTML = `<defs>${renderAtomDefs(collectUsedCategories(allGraphs), uidPrefix)}</defs>`;

    // --- NO REACTION SCENE ---
    if (!result.reacted) {
      const n = lhsItems.length;
      const W = 680;
      const H = 186;
      const centerY = 92;
      const positions = n === 3 ? [150, 340, 530] : [210, 470];

      const molsHTML = lhsItems
        .map((item, idx) => {
          const cx = positions[idx];
          const m = measureGraph(item.graph);
          const scale = Math.min(1.12, 130 / m.width, 86 / m.height);
          const labelStr = formatSVGFormulaText(item.displayFormula || item.formula);
          return `
            <g class="rxn-no-rxn-item">
              ${renderSingleGraphSVG(item.graph, cx, centerY, scale, lang, uidPrefix)}
              <text x="${cx}" y="${H - 18}" text-anchor="middle" class="rxn-svg-label">${labelStr}</text>
            </g>
          `;
        })
        .join('');

      const crossPositions = n === 3 ? [245, 435] : [340];
      const crossHTML = crossPositions
        .map(
          (x) => `
          <g>
            <circle cx="${x}" cy="${centerY}" r="14" fill="#161922" stroke="#5c3642" stroke-width="1.3" />
            <text x="${x}" y="${centerY + 5}" text-anchor="middle" class="rxn-svg-no-x">✕</text>
          </g>
        `
        )
        .join('');

      return `
        <svg class="rxn-mol-svg is-no-reaction" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHTML(d.noRxnVisualCaption)}">
          ${defsHTML}
          <text x="${W / 2}" y="22" text-anchor="middle" class="rxn-svg-caption">${escapeHTML(d.noRxnVisualCaption)}</text>
          ${crossHTML}
          ${molsHTML}
        </svg>
      `;
    }

    // --- ACTIVE REACTION SCENE ---
    const allTerms = result.reactants.concat(result.products);
    const maxCoeff = allTerms.reduce((mx, item) => Math.max(mx, item.coeff), 1);
    const totalMolecules = allTerms.reduce((sum, item) => sum + item.coeff, 0);
    const speciesCount = allTerms.length;
    const expandedMode = maxCoeff <= 3 && totalMolecules <= 8 && speciesCount <= 5;

    // Allocate crisp proportional slot widths
    const calcSlotWidth = (item) => {
      const m = measureGraph(item.graph);
      const base = Math.max(82, Math.min(134, m.width * 1.15 + 24));
      if (expandedMode && item.coeff >= 2) {
        return Math.max(96, Math.min(142, base + 12));
      }
      return speciesCount >= 6 ? Math.min(base, 108) : base;
    };

    const lhsWidths = lhsItems.map(calcSlotWidth);
    const rhsWidths = rhsItems.map(calcSlotWidth);
    const plusW = speciesCount >= 6 ? 18 : 22;

    const condText = lang === 'en' ? result.condEn : result.condVi;
    const isReversible = Boolean(result.reversible) || condText === '⇌';
    const condLabel = condText === '⇌' ? '' : (condText || '');
    const arrowW = Math.max(66, condLabel ? Math.min(126, condLabel.length * 6.8 + 26) : 66);

    const lhsTotalW = lhsWidths.reduce((s, w) => s + w, 0) + Math.max(0, lhsItems.length - 1) * plusW;
    const rhsTotalW = rhsWidths.reduce((s, w) => s + w, 0) + Math.max(0, rhsItems.length - 1) * plusW;
    const contentW = lhsTotalW + arrowW + rhsTotalW;
    const padOuter = 24;
    const W = Math.max(680, Math.round(contentW + padOuter * 2));
    const H = 208;
    const startX = (W - contentW) / 2;
    const centerY = 98;
    const maxMolH = 104;
    const labelY = 190;
    const pptFloorY = 164;

    // Build LHS
    let curX = startX;
    const lhsParts = [];
    lhsItems.forEach((item, idx) => {
      const w = lhsWidths[idx];
      const { molSVG, coeffBadgeSVG } = renderSpeciesClusterSVG(item, curX, w, centerY, maxMolH, expandedMode, lang, uidPrefix);
      const labelStr = formatSVGFormulaText(item.displayFormula || item.formula);
      lhsParts.push(`
        <g class="rxn-anim-lhs" style="--lhs-delay: ${(idx * 0.08).toFixed(2)}s">
          ${molSVG}
          ${coeffBadgeSVG}
          <text x="${(curX + w / 2).toFixed(1)}" y="${labelY}" text-anchor="middle" class="rxn-svg-label">${labelStr}</text>
        </g>
      `);
      curX += w;
      if (idx < lhsItems.length - 1) {
        lhsParts.push(
          `<text x="${(curX + plusW / 2).toFixed(1)}" y="${centerY + 5}" text-anchor="middle" class="rxn-svg-plus rxn-anim-lhs" style="--lhs-delay: 0.1s">+</text>`
        );
        curX += plusW;
      }
    });

    // Build Center Arrow
    const arrowStartX = curX + 12;
    const arrowEndX = curX + arrowW - 12;
    const arrowMidX = curX + arrowW / 2;
    const arrowSVG = isReversible
      ? `
        <g class="rxn-anim-arrow">
          ${condLabel ? `<text x="${arrowMidX.toFixed(1)}" y="${centerY - 14}" text-anchor="middle" class="rxn-svg-cond">${escapeHTML(condLabel)}</text>` : ''}
          <line x1="${arrowStartX.toFixed(1)}" y1="${centerY - 4}" x2="${arrowEndX.toFixed(1)}" y2="${centerY - 4}" stroke-width="2" stroke-linecap="round" class="rxn-arrow-stroke" />
          <polyline points="${(arrowEndX - 6).toFixed(1)},${centerY - 9} ${arrowEndX.toFixed(1)},${centerY - 4} ${(arrowEndX - 6).toFixed(1)},${centerY - 1}" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="rxn-arrow-stroke" />
          <line x1="${arrowEndX.toFixed(1)}" y1="${centerY + 4}" x2="${arrowStartX.toFixed(1)}" y2="${centerY + 4}" stroke-width="2" stroke-linecap="round" class="rxn-arrow-stroke" />
          <polyline points="${(arrowStartX + 6).toFixed(1)},${centerY + 1} ${arrowStartX.toFixed(1)},${centerY + 4} ${(arrowStartX + 6).toFixed(1)},${centerY + 9}" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="rxn-arrow-stroke" />
        </g>
      `
      : `
        <g class="rxn-anim-arrow">
          ${condLabel ? `<text x="${arrowMidX.toFixed(1)}" y="${centerY - 11}" text-anchor="middle" class="rxn-svg-cond">${escapeHTML(condLabel)}</text>` : ''}
          <line x1="${arrowStartX.toFixed(1)}" y1="${centerY}" x2="${(arrowEndX - 4).toFixed(1)}" y2="${centerY}" stroke-width="2.1" stroke-linecap="round" class="rxn-arrow-stroke" />
          <polygon points="${arrowEndX.toFixed(1)},${centerY} ${(arrowEndX - 8).toFixed(1)},${centerY - 4.5} ${(arrowEndX - 8).toFixed(1)},${centerY + 4.5}" class="rxn-arrow-fill" />
        </g>
      `;

    curX += arrowW;

    // Build RHS
    const rhsParts = [];
    rhsItems.forEach((item, idx) => {
      const w = rhsWidths[idx];
      const midX = curX + w / 2;
      const { molSVG, coeffBadgeSVG } = renderSpeciesClusterSVG(item, curX, w, centerY, maxMolH, expandedMode, lang, uidPrefix);
      const labelStr = formatSVGFormulaText(item.displayFormula || item.formula);
      const isGas = item.state === 'gas';
      const isPpt = item.state === 'precipitate';
      const stateClass = isGas ? 'rxn-anim-gas' : isPpt ? 'rxn-anim-ppt' : '';
      const stateSuffix = isGas
        ? ` <tspan class="rxn-svg-lbl-gas">↑</tspan>`
        : isPpt
          ? ` <tspan class="rxn-svg-lbl-ppt">↓</tspan>`
          : '';

      // Subtle rising bubble rings for gas products (Beat 3); shift slightly left if ×N badge is at top-right
      const hasCoeffBadge = !expandedMode && item.coeff > 1;
      const bubX = hasCoeffBadge ? midX - 11 : midX;
      const bubblesSVG = isGas
        ? `
          <g class="rxn-gas-bubbles">
            <circle cx="${(bubX - 10).toFixed(1)}" cy="48" r="2.1" class="rxn-anim-bubble" style="--bub-delay: 1.25s" />
            <circle cx="${(bubX + 1).toFixed(1)}" cy="41" r="2.8" class="rxn-anim-bubble" style="--bub-delay: 1.55s" />
            <circle cx="${(bubX + 11).toFixed(1)}" cy="49" r="1.8" class="rxn-anim-bubble" style="--bub-delay: 1.9s" />
          </g>
        `
        : '';

      // Thin matte slate settling floor beneath precipitate products (Beat 3)
      const pptFloorSVG = isPpt
        ? `<line x1="${(curX + 10).toFixed(1)}" y1="${pptFloorY}" x2="${(curX + w - 10).toFixed(1)}" y2="${pptFloorY}" class="rxn-ppt-floor" />`
        : '';

      rhsParts.push(`
        <g class="rxn-anim-rhs" style="--rhs-delay: ${(0.62 + idx * 0.1).toFixed(2)}s">
          ${bubblesSVG}
          <g class="${stateClass}">
            ${molSVG}
          </g>
          ${coeffBadgeSVG}
          ${pptFloorSVG}
          <text x="${midX.toFixed(1)}" y="${labelY}" text-anchor="middle" class="rxn-svg-label">${labelStr}${stateSuffix}</text>
        </g>
      `);

      curX += w;
      if (idx < rhsItems.length - 1) {
        rhsParts.push(
          `<text x="${(curX + plusW / 2).toFixed(1)}" y="${centerY + 5}" text-anchor="middle" class="rxn-svg-plus rxn-anim-rhs" style="--rhs-delay: 0.72s">+</text>`
        );
        curX += plusW;
      }
    });

    const ariaEq = `${result.reactants.map((r) => r.formula).join(' + ')} → ${result.products.map((p) => p.formula).join(' + ')}`;
    return `
      <svg class="rxn-mol-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHTML(ariaEq)}">
        ${defsHTML}
        ${lhsParts.join('')}
        ${arrowSVG}
        ${rhsParts.join('')}
      </svg>
    `;
  }

  // =========================================================================
  // TAB 2 UI CONTROLLER
  // =========================================================================
  let state = {
    lang: 'vi',
    presetGroup: 'inorganic', // 'inorganic' | 'organic'
    showThird: false,
    inputs: ['HCl', 'NaOH', ''],
    slotErrors: [null, null, null], // { error, suggestions } | null
    globalError: null,
    lastResult: null,
    lastValidatedFormulas: null,
    openDropdown: null, // 0 | 1 | 2 | null
    highlightIndex: -1,
    filteredLists: [[], [], []],
    animCounter: 0
  };

  let dom = {};

  function t() {
    return RXN_I18N[state.lang] || RXN_I18N.vi;
  }

  function searchSubstances(rawQuery) {
    const cleaned = String(rawQuery || '')
      .replace(/[₀-₉]/g, (ch) => SUBSCRIPT_TO_ASCII[ch] || ch)
      .trim();
    const q = normalizeSearchText(cleaned);
    if (!q) return COMMON_SUBSTANCES.slice();

    const exact = [];
    const prefix = [];
    const sub = [];

    COMMON_SUBSTANCES.forEach((item) => {
      const f = item.formula.toLowerCase();
      const df = (item.displayFormula || '').toLowerCase();
      const vi = normalizeSearchText(item.vi);
      const en = normalizeSearchText(item.en);
      const al = normalizeSearchText(item.aliases || '');

      if (f === q || df === q || vi === q || en === q) {
        exact.push(item);
      } else if (
        f.startsWith(q) ||
        (df && df.startsWith(q)) ||
        vi.startsWith(q) ||
        en.startsWith(q) ||
        vi.split(/\s+/).some((w) => w.startsWith(q)) ||
        en.split(/\s+/).some((w) => w.startsWith(q))
      ) {
        prefix.push(item);
      } else if (f.includes(q) || (df && df.includes(q)) || vi.includes(q) || en.includes(q) || al.includes(q)) {
        sub.push(item);
      }
    });

    return exact.concat(prefix, sub);
  }

  function getActivePresets() {
    return state.presetGroup === 'organic' && ORGANIC_PRESETS.length > 0
      ? ORGANIC_PRESETS
      : REACTION_PRESETS;
  }

  function renderPresets() {
    if (!dom.presetsList) return;
    const activeSet = state.inputs
      .slice(0, state.showThird ? 3 : 2)
      .map((s) => normalizeInputFormula(s))
      .filter(Boolean)
      .sort()
      .join('+');

    if (dom.presetFilter) {
      dom.presetFilter.querySelectorAll('.rxn-preset-tab').forEach((btn) => {
        const isOn = btn.dataset.presetGroup === state.presetGroup;
        btn.classList.toggle('active', isOn);
        btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
      });
    }

    const activePresets = getActivePresets();
    dom.presetsList.innerHTML = activePresets.map((preset, idx) => {
      const pKey = preset.slice().sort().join('+');
      const isActive = Boolean(activeSet && pKey === activeSet);
      const labelHTML = preset.map(formatFormulaHTML).join(' + ');
      return `<button type="button" class="lab-preset-chip ${isActive ? 'active' : ''}" data-preset-idx="${idx}">${labelHTML}</button>`;
    }).join('');
  }

  function renderSlotVisibility() {
    if (!dom.slot2 || !dom.plus2 || !dom.btnAddThird) return;
    dom.slot2.classList.toggle('hidden', !state.showThird);
    dom.plus2.classList.toggle('hidden', !state.showThird);
    dom.btnAddThird.classList.toggle('hidden', state.showThird);
  }

  function renderSlotError(idx) {
    const slotEl = dom.slots[idx];
    const errEl = dom.errors[idx];
    if (!slotEl || !errEl) return;

    const errObj = state.slotErrors[idx];
    if (!errObj) {
      slotEl.classList.remove('has-error');
      errEl.classList.add('hidden');
      errEl.innerHTML = '';
      return;
    }

    const d = t();
    slotEl.classList.add('has-error');
    errEl.classList.remove('hidden');

    const suggHTML = errObj.suggestions && errObj.suggestions.length > 0
      ? `<div class="rxn-error-suggestions">
           <span class="rxn-sugg-label">${escapeHTML(d.didYouMean)}</span>
           ${errObj.suggestions
             .map(
               (s) =>
                 `<button type="button" class="rxn-sugg-btn" data-slot="${idx}" data-fix="${escapeHTML(s)}">${formatFormulaHTML(s)}</button>`
             )
             .join('')}
         </div>`
      : '';

    errEl.innerHTML = `
      <div class="rxn-error-msg">
        <span class="rxn-error-dot" aria-hidden="true">!</span>
        <span>${escapeHTML(errObj.error)}</span>
      </div>
      ${suggHTML}
    `;
  }

  function renderGlobalError() {
    if (!dom.globalError) return;
    if (!state.globalError) {
      dom.globalError.classList.add('hidden');
      dom.globalError.innerHTML = '';
      return;
    }
    dom.globalError.classList.remove('hidden');
    dom.globalError.innerHTML = `
      <span class="rxn-error-dot" aria-hidden="true">!</span>
      <span>${escapeHTML(state.globalError)}</span>
    `;
  }

  function renderDropdown(idx, query) {
    const listEl = dom.dropdowns[idx];
    if (!listEl) return;

    const matches = searchSubstances(query);
    state.filteredLists[idx] = matches;
    const d = t();

    if (matches.length === 0) {
      listEl.classList.add('hidden');
      state.highlightIndex = -1;
      if (state.openDropdown === idx) {
        state.openDropdown = null;
        if (dom.slots[idx]) dom.slots[idx].classList.remove('is-open');
      }
      return;
    }

    if (state.highlightIndex >= matches.length) {
      state.highlightIndex = 0;
    }

    const currentNorm = normalizeInputFormula(state.inputs[idx]);
    listEl.innerHTML = matches
      .slice(0, 40)
      .map((item, i) => {
        const isSel = currentNorm === item.formula;
        const isHi = i === state.highlightIndex;
        const name = state.lang === 'en' ? item.en : item.vi;
        const catLabel = d.catLabels[item.cat] || item.cat;
        return `
          <button
            type="button"
            class="rxn-option ${isSel ? 'is-selected' : ''} ${isHi ? 'is-highlighted' : ''}"
            data-formula="${escapeHTML(item.formula)}"
            data-index="${i}"
            role="option"
            aria-selected="${isSel ? 'true' : 'false'}"
          >
            <span class="rxn-opt-formula">${formatFormulaHTML(item.displayFormula || item.formula)}</span>
            <span class="rxn-opt-name">${escapeHTML(name)}</span>
            <span class="rxn-opt-cat cat-${item.cat}">${escapeHTML(catLabel)}</span>
          </button>
        `;
      })
      .join('');
  }

  function openDropdown(idx, autoHighlightFirst = false) {
    closeDropdowns();
    const query = dom.inputs[idx] ? dom.inputs[idx].value : '';
    const matches = searchSubstances(query);
    if (matches.length === 0) return;

    state.openDropdown = idx;
    const normQ = normalizeInputFormula(query).toLowerCase();
    const exactMatchFirst = matches[0] && matches[0].formula.toLowerCase() === normQ;
    state.highlightIndex = autoHighlightFirst && !exactMatchFirst ? 0 : -1;

    renderDropdown(idx, query);
    if (dom.dropdowns[idx]) dom.dropdowns[idx].classList.remove('hidden');
    if (dom.slots[idx]) dom.slots[idx].classList.add('is-open');
  }

  function closeDropdowns() {
    state.openDropdown = null;
    state.highlightIndex = -1;
    (dom.dropdowns || []).forEach((el) => {
      if (el) el.classList.add('hidden');
    });
    (dom.slots || []).forEach((el) => {
      if (el) el.classList.remove('is-open');
    });
  }

  function hasOpenDropdown() {
    return state.openDropdown !== null;
  }

  function selectSuggestion(idx, item) {
    if (!item || !dom.inputs[idx]) return;
    state.inputs[idx] = item.formula;
    dom.inputs[idx].value = item.formula;
    state.slotErrors[idx] = null;
    state.globalError = null;
    renderSlotError(idx);
    renderGlobalError();
    renderPresets();
    closeDropdowns();
  }

  function renderEquationHTML(result) {
    const renderTerm = (term) => {
      const coeffHTML = term.coeff > 1 ? `<span class="rxn-coeff">${term.coeff}</span>` : '';
      const formulaHTML = `<span class="rxn-formula">${formatFormulaHTML(term.displayFormula || term.formula)}</span>`;
      const stateHTML =
        term.state === 'precipitate'
          ? `<span class="rxn-state rxn-state-ppt" title="${state.lang === 'en' ? 'Precipitate' : 'Kết tủa'}">↓</span>`
          : term.state === 'gas'
            ? `<span class="rxn-state rxn-state-gas" title="${state.lang === 'en' ? 'Gas evolved' : 'Chất khí bay hơi'}">↑</span>`
            : '';
      return `<span class="rxn-term">${coeffHTML}${formulaHTML}${stateHTML}</span>`;
    };

    const lhsHTML = result.reactants
      .map(renderTerm)
      .join('<span class="rxn-eq-plus">+</span>');

    if (!result.reacted) {
      return `
        <div class="rxn-eq-line is-no-reaction">
          ${lhsHTML}
          <span class="rxn-arrow-wrap">
            <span class="rxn-arrow-glyph is-blocked" aria-hidden="true">↛</span>
          </span>
          <span class="rxn-no-rxn-tag">${escapeHTML(t().typeLabels['no-reaction'])}</span>
        </div>
      `;
    }

    const condText = state.lang === 'en' ? result.condEn : result.condVi;
    const isReversible = Boolean(result.reversible) || condText === '⇌';
    const arrowGlyph = isReversible ? '⇌' : '→';
    const condLabel = condText === '⇌' ? '' : (condText || '');
    const condAbove = condLabel
      ? `<span class="rxn-arrow-cond">${escapeHTML(condLabel)}</span>`
      : '';

    const rhsHTML = result.products
      .map(renderTerm)
      .join('<span class="rxn-eq-plus">+</span>');

    return `
      <div class="rxn-eq-line">
        ${lhsHTML}
        <span class="rxn-arrow-wrap ${condAbove ? 'has-cond' : ''}">
          ${condAbove}
          <span class="rxn-arrow-glyph" aria-hidden="true">${arrowGlyph}</span>
        </span>
        ${rhsHTML}
      </div>
    `;
  }

  function renderVisual(res) {
    if (!dom.svgHost || !dom.visualStage) return;
    if (!res) {
      dom.svgHost.innerHTML = '';
      return;
    }
    state.animCounter += 1;
    dom.svgHost.innerHTML = buildReactionSVG(res, state.lang, state.animCounter);
    if (dom.btnReplay) {
      dom.btnReplay.classList.toggle('hidden', !res.reacted);
    }
  }

  function replayAnimation() {
    if (!state.lastResult || !state.lastResult.reacted) return;
    renderVisual(state.lastResult);
  }

  function renderResult() {
    if (!dom.resultCard || !dom.emptyState) return;
    const d = t();
    const hasActiveError = Boolean(state.globalError) || state.slotErrors.some(Boolean);

    if (!state.lastResult) {
      dom.resultCard.classList.add('hidden');
      if (dom.svgHost) dom.svgHost.innerHTML = '';
      if (hasActiveError) {
        dom.emptyState.classList.add('hidden');
      } else {
        dom.emptyState.classList.remove('hidden');
        dom.emptyState.textContent = d.emptyState;
      }
      return;
    }

    const res = state.lastResult;
    dom.emptyState.classList.add('hidden');
    dom.resultCard.classList.remove('hidden');
    dom.resultCard.dataset.type = res.type;

    // Type badge
    dom.typeBadge.textContent = d.typeLabels[res.type] || res.type;
    dom.typeBadge.className = `rxn-type-badge rxn-type-${res.type}`;

    // Source badge
    const isTier1 = res.source === 'experimental';
    dom.sourceBadge.textContent = isTier1 ? d.sourceTier1 : d.sourceTier2;
    dom.sourceBadge.className = `rxn-source-badge ${isTier1 ? 'source-tier1' : 'source-tier2'}`;

    // Equation box
    dom.equationStage.innerHTML = renderEquationHTML(res);

    // Animated Pure-SVG Molecular Stage
    renderVisual(res);

    // Tier 3 Spectator note
    if (res.spectator) {
      const specF = formatFormulaHTML(res.spectator);
      const specMsg =
        state.lang === 'en'
          ? `<strong>${escapeHTML(d.spectatorPrefix)}</strong> ${specF} does not directly participate in this reaction (acts as an unreactive spectator / excess substance).`
          : `<strong>${escapeHTML(d.spectatorPrefix)}</strong> ${specF} không tham gia trực tiếp vào phương trình trên (đóng vai trò chất nền / chất dư).`;
      dom.spectatorNote.innerHTML = specMsg;
      dom.spectatorNote.classList.remove('hidden');
    } else {
      dom.spectatorNote.classList.add('hidden');
      dom.spectatorNote.innerHTML = '';
    }

    // Phenomenon & Explanation
    const phen = state.lang === 'en' ? res.phenEn : res.phenVi;
    const exp = state.lang === 'en' ? res.expEn : res.expVi;

    dom.phenLabel.textContent = d.phenLabel;
    dom.phenText.textContent = phen;
    dom.expLabel.textContent = d.expLabel;
    dom.expText.textContent = exp;
  }

  function runReaction() {
    closeDropdowns();
    const count = state.showThird ? 3 : 2;
    state.slotErrors = [null, null, null];
    state.globalError = null;

    let hasAnyError = false;
    const canonicalList = [];

    for (let i = 0; i < count; i++) {
      const raw = dom.inputs[i] ? dom.inputs[i].value : state.inputs[i];
      state.inputs[i] = raw;

      const v = validateFormula(raw, state.lang);
      if (!v.ok) {
        state.slotErrors[i] = { error: v.error, suggestions: v.suggestions || [] };
        hasAnyError = true;
      } else {
        // Reflect canonical normalization back cleanly (e.g. "hcl" -> "HCl", "H₂SO₄" -> "H2SO4")
        state.inputs[i] = v.formula;
        if (dom.inputs[i]) dom.inputs[i].value = v.formula;
        canonicalList.push(v.formula);
      }
      renderSlotError(i);
    }
    if (!state.showThird) {
      renderSlotError(2);
    }

    if (hasAnyError) {
      state.lastResult = null;
      renderGlobalError();
      renderPresets();
      renderResult();
      return;
    }

    // Duplicate reactant check
    const seen = new Set();
    for (let i = 0; i < canonicalList.length; i++) {
      const f = canonicalList[i];
      if (seen.has(f)) {
        state.globalError = t().errDuplicate(formatFormulaUnicode(f));
        state.lastResult = null;
        renderGlobalError();
        renderPresets();
        renderResult();
        return;
      }
      seen.add(f);
    }

    renderGlobalError();
    state.lastValidatedFormulas = canonicalList.slice();
    state.lastResult = predictReaction(canonicalList);
    renderPresets();
    renderResult();
  }

  function clearAll() {
    closeDropdowns();
    state.inputs = ['', '', ''];
    state.slotErrors = [null, null, null];
    state.globalError = null;
    state.lastResult = null;
    state.lastValidatedFormulas = null;
    state.showThird = false;
    dom.inputs.forEach((inp) => {
      if (inp) inp.value = '';
    });
    renderSlotVisibility();
    [0, 1, 2].forEach(renderSlotError);
    renderGlobalError();
    renderPresets();
    renderResult();
    if (dom.inputs[0]) dom.inputs[0].focus();
  }

  function applyPreset(presetFormulas) {
    closeDropdowns();
    state.showThird = presetFormulas.length === 3;
    state.inputs = [presetFormulas[0] || '', presetFormulas[1] || '', presetFormulas[2] || ''];
    state.inputs.forEach((val, idx) => {
      if (dom.inputs[idx]) dom.inputs[idx].value = val;
    });
    renderSlotVisibility();
    runReaction();
  }

  function applyLanguage() {
    if (!dom.panel) return;
    const d = t();

    dom.panel.querySelectorAll('[data-i18n-rxn]').forEach((node) => {
      const key = node.dataset.i18nRxn;
      if (typeof d[key] === 'string') {
        node.textContent = d[key];
      }
    });

    [0, 1, 2].forEach((idx) => {
      if (dom.slotLabels[idx]) dom.slotLabels[idx].textContent = d.slotLabel(idx);
      if (dom.inputs[idx]) dom.inputs[idx].placeholder = d.slotPlaceholder(idx);
    });

    if (dom.btnRemoveThird) {
      dom.btnRemoveThird.title = d.removeThirdTitle;
      dom.btnRemoveThird.setAttribute('aria-label', d.removeThirdTitle);
    }

    // Re-localize active slot validation errors if any
    const count = state.showThird ? 3 : 2;
    for (let i = 0; i < count; i++) {
      if (state.slotErrors[i]) {
        const v = validateFormula(state.inputs[i], state.lang);
        state.slotErrors[i] = v.ok ? null : { error: v.error, suggestions: v.suggestions || [] };
        renderSlotError(i);
      }
    }

    // Re-localize duplicate global error if any
    if (state.globalError) {
      const norms = state.inputs.slice(0, count).map(normalizeInputFormula).filter(Boolean);
      const seen = new Set();
      let dup = null;
      for (const f of norms) {
        if (seen.has(f)) {
          dup = f;
          break;
        }
        seen.add(f);
      }
      state.globalError = dup ? d.errDuplicate(formatFormulaUnicode(dup)) : null;
      renderGlobalError();
    }

    // Refresh open dropdown
    if (state.openDropdown !== null && dom.inputs[state.openDropdown]) {
      renderDropdown(state.openDropdown, dom.inputs[state.openDropdown].value);
    }

    renderPresets();
    renderResult();
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    state.lang = lang;
    applyLanguage();
  }

  function getHeaderTexts(lang) {
    const d = RXN_I18N[lang] || RXN_I18N.vi;
    return {
      title: d.modalTitle,
      subtitle: d.modalSubtitle,
      footerHint: d.footerHint
    };
  }

  function bindSlotEvents(idx) {
    const inputEl = dom.inputs[idx];
    const listEl = dom.dropdowns[idx];
    const errEl = dom.errors[idx];
    if (!inputEl || !listEl) return;

    inputEl.addEventListener('focus', () => {
      openDropdown(idx, false);
    });

    inputEl.addEventListener('click', () => {
      if (state.openDropdown !== idx) {
        openDropdown(idx, false);
      }
    });

    inputEl.addEventListener('input', () => {
      state.inputs[idx] = inputEl.value;
      state.slotErrors[idx] = null;
      state.globalError = null;
      renderSlotError(idx);
      renderGlobalError();
      renderPresets();
      openDropdown(idx, true);
    });

    inputEl.addEventListener('keydown', (e) => {
      const list = state.filteredLists[idx] || [];
      const maxShown = Math.min(list.length, 40);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.openDropdown !== idx) {
          openDropdown(idx, false);
        }
        const curList = state.filteredLists[idx] || [];
        const curMax = Math.min(curList.length, 40);
        if (curMax > 0) {
          state.highlightIndex = (state.highlightIndex + 1) % curMax;
          renderDropdown(idx, inputEl.value);
          const hi = listEl.querySelector('.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.openDropdown !== idx) {
          openDropdown(idx, false);
        }
        const curList = state.filteredLists[idx] || [];
        const curMax = Math.min(curList.length, 40);
        if (curMax > 0) {
          state.highlightIndex = state.highlightIndex <= 0 ? curMax - 1 : state.highlightIndex - 1;
          renderDropdown(idx, inputEl.value);
          const hi = listEl.querySelector('.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (state.openDropdown === idx && state.highlightIndex >= 0 && state.highlightIndex < maxShown) {
          selectSuggestion(idx, list[state.highlightIndex]);
        } else {
          closeDropdowns();
          runReaction();
        }
      } else if (e.key === 'Escape') {
        if (state.openDropdown === idx) {
          e.stopPropagation();
          closeDropdowns();
        }
      }
    });

    listEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });

    listEl.addEventListener('click', (e) => {
      const opt = e.target.closest('.rxn-option');
      if (!opt) return;
      const formula = opt.dataset.formula;
      const item = COMMON_SUBSTANCES.find((s) => s.formula === formula);
      if (item) selectSuggestion(idx, item);
    });

    // Quick-fix suggestion buttons inside inline error box
    if (errEl) {
      errEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.rxn-sugg-btn');
        if (!btn) return;
        const fix = btn.dataset.fix;
        if (!fix) return;
        state.inputs[idx] = fix;
        inputEl.value = fix;
        state.slotErrors[idx] = null;
        renderSlotError(idx);

        // If all visible slots have values, re-run immediately!
        const activeCount = state.showThird ? 3 : 2;
        const allFilled = state.inputs.slice(0, activeCount).every((v) => String(v || '').trim().length > 0);
        if (allFilled) {
          runReaction();
        }
      });
    }
  }

  function init(opts = {}) {
    state.lang = typeof opts.getLang === 'function' ? opts.getLang() : 'vi';

    dom = {
      panel: document.getElementById('lab-panel-reactions'),
      presetFilter: document.getElementById('rxn-preset-filter'),
      presetsList: document.getElementById('rxn-presets-list'),
      slots: [
        document.getElementById('rxn-slot-0'),
        document.getElementById('rxn-slot-1'),
        document.getElementById('rxn-slot-2')
      ],
      slot2: document.getElementById('rxn-slot-2'),
      plus2: document.getElementById('rxn-plus-2'),
      slotLabels: [
        document.getElementById('rxn-label-0'),
        document.getElementById('rxn-label-1'),
        document.getElementById('rxn-label-2')
      ],
      inputs: [
        document.getElementById('rxn-input-0'),
        document.getElementById('rxn-input-1'),
        document.getElementById('rxn-input-2')
      ],
      dropdowns: [
        document.getElementById('rxn-dropdown-0'),
        document.getElementById('rxn-dropdown-1'),
        document.getElementById('rxn-dropdown-2')
      ],
      errors: [
        document.getElementById('rxn-error-0'),
        document.getElementById('rxn-error-1'),
        document.getElementById('rxn-error-2')
      ],
      globalError: document.getElementById('rxn-global-error'),
      btnAddThird: document.getElementById('rxn-btn-add-third'),
      btnRemoveThird: document.getElementById('rxn-remove-2'),
      btnClear: document.getElementById('rxn-btn-clear'),
      btnReact: document.getElementById('rxn-btn-react'),
      emptyState: document.getElementById('rxn-empty-state'),
      resultCard: document.getElementById('rxn-result-card'),
      typeBadge: document.getElementById('rxn-type-badge'),
      sourceBadge: document.getElementById('rxn-source-badge'),
      equationStage: document.getElementById('rxn-equation-stage'),
      visualStage: document.getElementById('rxn-visual-stage'),
      svgHost: document.getElementById('rxn-svg-host'),
      btnReplay: document.getElementById('rxn-btn-replay'),
      spectatorNote: document.getElementById('rxn-spectator-note'),
      phenLabel: document.getElementById('rxn-phen-label'),
      phenText: document.getElementById('rxn-phen-text'),
      expLabel: document.getElementById('rxn-exp-label'),
      expText: document.getElementById('rxn-exp-text')
    };

    if (!dom.panel) return;

    [0, 1, 2].forEach(bindSlotEvents);

    if (dom.presetFilter) {
      dom.presetFilter.addEventListener('click', (e) => {
        const btn = e.target.closest('.rxn-preset-tab');
        if (!btn) return;
        const group = btn.dataset.presetGroup;
        if (group !== 'inorganic' && group !== 'organic') return;
        if (state.presetGroup === group) return;
        state.presetGroup = group;
        renderPresets();
      });
    }

    if (dom.presetsList) {
      dom.presetsList.addEventListener('click', (e) => {
        const btn = e.target.closest('.lab-preset-chip');
        if (!btn) return;
        const idx = Number(btn.dataset.presetIdx);
        const list = getActivePresets();
        if (list[idx]) {
          applyPreset(list[idx]);
        }
      });
    }

    if (dom.btnAddThird) {
      dom.btnAddThird.addEventListener('click', () => {
        state.showThird = true;
        renderSlotVisibility();
        if (dom.inputs[2]) dom.inputs[2].focus();
      });
    }

    if (dom.btnRemoveThird) {
      dom.btnRemoveThird.addEventListener('click', () => {
        closeDropdowns();
        state.showThird = false;
        state.inputs[2] = '';
        state.slotErrors[2] = null;
        if (dom.inputs[2]) dom.inputs[2].value = '';
        renderSlotError(2);
        renderSlotVisibility();
        renderPresets();
      });
    }

    if (dom.btnClear) {
      dom.btnClear.addEventListener('click', clearAll);
    }

    if (dom.btnReact) {
      dom.btnReact.addEventListener('click', runReaction);
    }

    if (dom.btnReplay) {
      dom.btnReplay.addEventListener('click', replayAnimation);
    }

    // Close dropdown when clicking outside reactant input wrapper
    document.addEventListener('click', (e) => {
      if (state.openDropdown === null) return;
      if (!e.target.closest('.rxn-input-wrap')) {
        closeDropdowns();
      }
    });

    // Boot with default first preset (HCl + NaOH) ready to inspect
    dom.inputs[0].value = state.inputs[0];
    dom.inputs[1].value = state.inputs[1];
    dom.inputs[2].value = '';
    renderSlotVisibility();
    applyLanguage();
    runReaction();
  }

  window.ReactionLab = {
    init,
    setLang,
    hasOpenDropdown,
    closeDropdowns,
    getHeaderTexts,
    replayAnimation,
    // Expose pure chemistry & SVG engine functions for verification & testing
    validateFormula,
    balanceEquation,
    predictReaction,
    normalizeInputFormula,
    buildReactionSVG
  };
})();
