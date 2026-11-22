// Interactive Periodic Table — High School Organic Chemistry Data (GDPT 2018)
// Loaded immediately before reactions.js and merged into window.ReactionLab.

(function () {
  'use strict';

  const ORGANIC_WHITELIST = [
    // Alkanes & Haloalkanes
    'CH4', 'C2H6', 'C3H8', 'C4H10', 'C5H12', 'C6H14',
    'CH3Cl', 'CH2Cl2', 'CHCl3', 'CCl4', 'CH3Br',
    'C2H5Cl', 'C2H5Br', 'C3H7Cl', 'C3H7Br',
    'C2H4Br2', 'C2H4Cl2', 'C3H6Br2', 'C2H3Cl', 'C2H2Br2', 'C2H2Br4',
    // Alkenes & Alkynes
    'C2H4', 'C3H6', 'C4H8',
    'C2H2', 'C3H4', 'C4H6', 'C2Ag2',
    // Arenes & Derivatives
    'C6H6', 'C7H8', 'C8H8', 'C6H12',
    'C6H5Cl', 'C6H5Br', 'C6H5NO2', 'C7H7Br', 'C7H5N3O6',
    // Alcohols, Polyols, Alkoxides & Copper Complexes
    'CH3OH', 'C2H5OH', 'C3H7OH',
    'CH3ONa', 'C2H5ONa',
    'C2H4(OH)2', 'C3H5(OH)3',
    '[C2H4(OH)O]2Cu', '[C3H5(OH)2O]2Cu',
    // Phenols & Derivatives
    'C6H5OH', 'C6H5ONa', 'C6H5OK', 'C6H2Br3OH', 'C6H2(NO2)3OH',
    // Aldehydes & Ketones
    'HCHO', 'CH3CHO', 'C2H5CHO', 'CH3COCH3',
    // Carboxylic Acids & Organic Salts
    'HCOOH', 'CH3COOH', 'C2H5COOH',
    'HCOONa', 'HCOOK', 'HCOONH4', '(HCOO)2Mg', '(HCOO)2Zn', '(HCOO)2Ca', '(HCOO)2Cu',
    'CH3COONa', 'CH3COOK', 'CH3COONH4', '(CH3COO)2Mg', '(CH3COO)2Zn', '(CH3COO)2Ca', '(CH3COO)2Cu',
    // Esters
    'HCOOCH3', 'HCOOC2H5', 'CH3COOCH3', 'CH3COOC2H5', 'C2H5COOCH3', 'C2H5COOC2H5',
    // Carbohydrates & Derivatives
    'C6H12O6', 'Fructose', 'C6H14O6', 'C6H12O7', 'C5H11O5COONH4', 'C5H11O5COONa',
    'C6H11O7NH4', 'C6H11O7Na', '[C6H11O6]2Cu', 'C12H22O11',
    // Amines & Derivatives
    'CH3NH2', 'C2H5NH2', 'CH3NH3Cl', 'C2H5NH3Cl',
    'C6H5NH2', 'C6H5NH3Cl', 'C6H2Br3NH2',
    // Reagents & Products for Organic Reactions
    'C2Ag2', 'Ag2C2', 'CH3CCAg', '[Ag(NH3)2]OH', 'Ag2O', '(NH4)2CO3', 'Cu2O', 'Cr2(SO4)3'
  ];

  const ORGANIC_SUBSTANCES = [
    // Hydrocarbons
    { formula: 'CH4', vi: 'Methane', en: 'Methane', cat: 'organic', aliases: 'metan methane alkane ankan khi bun ao' },
    { formula: 'C2H6', vi: 'Ethane', en: 'Ethane', cat: 'organic', aliases: 'etan ethane alkane ankan' },
    { formula: 'C3H8', vi: 'Propane', en: 'Propane', cat: 'organic', aliases: 'propan propane alkane ankan' },
    { formula: 'C4H10', vi: 'Butane', en: 'Butane', cat: 'organic', aliases: 'butan butane alkane ankan' },
    { formula: 'C2H4', vi: 'Ethylene (Ethene)', en: 'Ethylene (Ethene)', cat: 'organic', aliases: 'etilen eten ethene ethylene alkene anken' },
    { formula: 'C3H6', vi: 'Propene (Propylene)', en: 'Propene (Propylene)', cat: 'organic', aliases: 'propen propilen propene propylene alkene anken' },
    { formula: 'C2H2', vi: 'Acetylene (Ethyne)', en: 'Acetylene (Ethyne)', cat: 'organic', aliases: 'axetilen etin ethyne acetylene alkyne ankin dat den' },
    { formula: 'C3H4', displayFormula: 'CH3C≡CH', vi: 'Propyne (CH₃C≡CH)', en: 'Propyne (CH₃C≡CH)', cat: 'organic', aliases: 'propin propyne ch3cch ch3c≡ch alkyne dau mach' },
    { formula: 'C6H6', vi: 'Benzene', en: 'Benzene', cat: 'organic', aliases: 'benzen benzene arene aren' },
    { formula: 'C7H8', vi: 'Toluene (Methylbenzene)', en: 'Toluene (Methylbenzene)', cat: 'organic', aliases: 'toluen toluene metylbenzen methylbenzene arene' },
    { formula: 'C8H8', vi: 'Styrene', en: 'Styrene', cat: 'organic', aliases: 'stiren styrene phenylethylene' },
    { formula: 'C6H12', vi: 'Cyclohexane', en: 'Cyclohexane', cat: 'organic', aliases: 'xiclohexan cyclohexane' },

    // Alcohols & Phenol
    { formula: 'CH3OH', vi: 'Methanol', en: 'Methanol', cat: 'organic', aliases: 'metanol ancol metylic methanol methyl alcohol' },
    { formula: 'C2H5OH', vi: 'Ethanol (Rượu etylic)', en: 'Ethanol (Ethyl alcohol)', cat: 'organic', aliases: 'etanol ruou etylic ancol etylic con ethanol ethyl alcohol' },
    { formula: 'C2H4(OH)2', vi: 'Ethylene glycol (Ethane-1,2-diol)', en: 'Ethylene glycol', cat: 'organic', aliases: 'etilen glicol ethylene glycol diol' },
    { formula: 'C3H5(OH)3', vi: 'Glycerol (Propane-1,2,3-triol)', en: 'Glycerol (Propane-1,2,3-triol)', cat: 'organic', aliases: 'glixerol glixerin glycerol glycerin triol' },
    { formula: 'C6H5OH', vi: 'Phenol', en: 'Phenol', cat: 'organic', aliases: 'phenol fenol axit phenic hydroxybenzene' },
    { formula: 'C6H5ONa', vi: 'Sodium phenolate', en: 'Sodium phenolate', cat: 'organic', aliases: 'natri phenolat sodium phenolate phenoxide' },

    // Aldehydes, Ketones & Carboxylic Acids
    { formula: 'HCHO', vi: 'Methanal (Formaldehyde)', en: 'Methanal (Formaldehyde)', cat: 'organic', aliases: 'fomandehit andehit fomic metanal formalin methanal formaldehyde' },
    { formula: 'CH3CHO', vi: 'Ethanal (Acetaldehyde)', en: 'Ethanal (Acetaldehyde)', cat: 'organic', aliases: 'axetandehit andehit axetic etanal ethanal acetaldehyde' },
    { formula: 'CH3COCH3', vi: 'Acetone (Propanone)', en: 'Acetone (Propanone)', cat: 'organic', aliases: 'axeton acetone propanone ketone' },
    { formula: 'HCOOH', vi: 'Formic acid (Methanoic acid)', en: 'Formic acid (Methanoic acid)', cat: 'organic', aliases: 'axit fomic acid fomic metanoic methanoic formic' },
    { formula: 'CH3COOH', vi: 'Acetic acid (Ethanoic acid)', en: 'Acetic acid (Ethanoic acid)', cat: 'organic', aliases: 'axit axetic acid axetic etanoic giam an vinegar ethanoic acetic' },

    // Esters
    { formula: 'HCOOCH3', vi: 'Methyl formate (Methyl methanoate)', en: 'Methyl formate', cat: 'organic', aliases: 'metyl fomat methyl formate methanoate ester este' },
    { formula: 'HCOOC2H5', vi: 'Ethyl formate (Ethyl methanoate)', en: 'Ethyl formate', cat: 'organic', aliases: 'etyl fomat ethyl formate methanoate ester este' },
    { formula: 'CH3COOCH3', vi: 'Methyl acetate (Methyl ethanoate)', en: 'Methyl acetate', cat: 'organic', aliases: 'metyl axetat methyl acetate ethanoate ester este' },
    { formula: 'CH3COOC2H5', vi: 'Ethyl acetate (Ethyl ethanoate)', en: 'Ethyl acetate', cat: 'organic', aliases: 'etyl axetat ethyl acetate ethanoate ester este' },

    // Carbohydrates
    { formula: 'C6H12O6', vi: 'Glucose (Đường nho)', en: 'Glucose', cat: 'organic', aliases: 'glucozo duong nho glucose monosaccharide' },
    { formula: 'Fructose', displayFormula: 'C6H12O6', vi: 'Fructose (Đường trái cây)', en: 'Fructose', cat: 'organic', aliases: 'fructose fructozo duong trai cay mat ong monosaccharide' },
    { formula: 'C12H22O11', vi: 'Saccharose (Sucrose)', en: 'Sucrose (Saccharose)', cat: 'organic', aliases: 'saccarozo duong mia saccharose sucrose disaccharide' },

    // Amines & Ammonium Salts
    { formula: 'CH3NH2', vi: 'Methylamine (Methanamine)', en: 'Methylamine', cat: 'organic', aliases: 'metylamin metanamin methylamine methanamine amin amine' },
    { formula: 'C6H5NH2', vi: 'Aniline (Phenylamine)', en: 'Aniline (Benzenamine)', cat: 'organic', aliases: 'anilin phenylamin aniline phenylamine benzenamine amin amine' },
    { formula: 'C6H5NH3Cl', vi: 'Phenylammonium chloride', en: 'Phenylammonium chloride (Anilinium chloride)', cat: 'organic', aliases: 'phenylamoni clorua anilinium chloride' },

    // Organic Reaction Reagents
    { formula: '[Ag(NH3)2]OH', vi: 'Thuốc thử Tollens (Phức bạc amoniac)', en: "Tollens' reagent", cat: 'base', aliases: 'thuoc thu tollens trang bac trang guong bac nitrat trong nh3 diamminesilver' },
    { formula: 'Ag2O', vi: 'Silver(I) oxide', en: 'Silver(I) oxide', cat: 'oxide', aliases: 'bac oxit silver oxide trang bac' }
  ];

  // Case-insensitive & diacritic-free common names -> canonical formula/isomer token
  const ORGANIC_NAME_ALIASES = {
    'glucose': 'C6H12O6',
    'glucozo': 'C6H12O6',
    'duong nho': 'C6H12O6',
    'fructose': 'Fructose',
    'fructozo': 'Fructose',
    'duong trai cay': 'Fructose',
    'duong mat ong': 'Fructose',
    'sucrose': 'C12H22O11',
    'saccharose': 'C12H22O11',
    'saccarozo': 'C12H22O11',
    'duong mia': 'C12H22O11',
    'methane': 'CH4',
    'metan': 'CH4',
    'ethane': 'C2H6',
    'etan': 'C2H6',
    'propane': 'C3H8',
    'propan': 'C3H8',
    'butane': 'C4H10',
    'butan': 'C4H10',
    'ethylene': 'C2H4',
    'ethene': 'C2H4',
    'etilen': 'C2H4',
    'eten': 'C2H4',
    'propene': 'C3H6',
    'propylene': 'C3H6',
    'propen': 'C3H6',
    'propilen': 'C3H6',
    'acetylene': 'C2H2',
    'ethyne': 'C2H2',
    'axetilen': 'C2H2',
    'etin': 'C2H2',
    'khi dat den': 'C2H2',
    'propyne': 'C3H4',
    'propin': 'C3H4',
    'ch3cch': 'C3H4',
    'ch3c≡ch': 'C3H4',
    'ch3-c≡ch': 'C3H4',
    'benzene': 'C6H6',
    'benzen': 'C6H6',
    'toluene': 'C7H8',
    'toluen': 'C7H8',
    'methylbenzene': 'C7H8',
    'styrene': 'C8H8',
    'stiren': 'C8H8',
    'cyclohexane': 'C6H12',
    'xiclohexan': 'C6H12',
    'methanol': 'CH3OH',
    'metanol': 'CH3OH',
    'methyl alcohol': 'CH3OH',
    'ethanol': 'C2H5OH',
    'etanol': 'C2H5OH',
    'ethyl alcohol': 'C2H5OH',
    'ruou etylic': 'C2H5OH',
    'con': 'C2H5OH',
    'ethylene glycol': 'C2H4(OH)2',
    'etilen glicol': 'C2H4(OH)2',
    'glycerol': 'C3H5(OH)3',
    'glixerol': 'C3H5(OH)3',
    'glycerin': 'C3H5(OH)3',
    'phenol': 'C6H5OH',
    'sodium phenolate': 'C6H5ONa',
    'natri phenolat': 'C6H5ONa',
    'formaldehyde': 'HCHO',
    'methanal': 'HCHO',
    'fomandehit': 'HCHO',
    'formalin': 'HCHO',
    'acetaldehyde': 'CH3CHO',
    'ethanal': 'CH3CHO',
    'axetandehit': 'CH3CHO',
    'acetone': 'CH3COCH3',
    'propanone': 'CH3COCH3',
    'axeton': 'CH3COCH3',
    'formic acid': 'HCOOH',
    'methanoic acid': 'HCOOH',
    'acid fomic': 'HCOOH',
    'axit fomic': 'HCOOH',
    'acetic acid': 'CH3COOH',
    'ethanoic acid': 'CH3COOH',
    'acid axetic': 'CH3COOH',
    'axit axetic': 'CH3COOH',
    'giam an': 'CH3COOH',
    'vinegar': 'CH3COOH',
    'ethyl acetate': 'CH3COOC2H5',
    'etyl axetat': 'CH3COOC2H5',
    'methyl acetate': 'CH3COOCH3',
    'metyl axetat': 'CH3COOCH3',
    'methyl formate': 'HCOOCH3',
    'metyl fomat': 'HCOOCH3',
    'ethyl formate': 'HCOOC2H5',
    'etyl fomat': 'HCOOC2H5',
    'methylamine': 'CH3NH2',
    'metylamin': 'CH3NH2',
    'methanamine': 'CH3NH2',
    'aniline': 'C6H5NH2',
    'anilin': 'C6H5NH2',
    'phenylamine': 'C6H5NH2',
    'tollens': '[Ag(NH3)2]OH',
    'thuoc thu tollens': '[Ag(NH3)2]OH',
    'tollens reagent': '[Ag(NH3)2]OH',
    'ammonia': 'NH3',
    'amoniac': 'NH3',
    'water': 'H2O',
    'nuoc': 'H2O',
    'bromine': 'Br2',
    'brom': 'Br2',
    'nuoc brom': 'Br2',
    'silver nitrate': 'AgNO3',
    'bac nitrat': 'AgNO3',
    'potassium permanganate': 'KMnO4',
    'thuoc tim': 'KMnO4',
    'potassium dichromate': 'K2Cr2O7',
    'sulfuric acid': 'H2SO4',
    'acid sulfuric': 'H2SO4',
    'axit sunfuric': 'H2SO4',
    'nitric acid': 'HNO3',
    'acid nitric': 'HNO3',
    'axit nitric': 'HNO3',
    'hydrochloric acid': 'HCl',
    'acid clohidric': 'HCl',
    'axit clohidric': 'HCl',
    'sodium hydroxide': 'NaOH',
    'xut': 'NaOH',
    'copper hydroxide': 'Cu(OH)2',
    'copper(ii) hydroxide': 'Cu(OH)2',
    'carbon dioxide': 'CO2'
  };

  const ORGANIC_PRESETS = [
    ['C2H4', 'Br2'],
    ['CH3COOH', 'C2H5OH'],
    ['CH3COOC2H5', 'NaOH'],
    ['CH3CHO', '[Ag(NH3)2]OH'],
    ['C6H5OH', 'Br2'],
    ['C2H4', 'KMnO4', 'H2O']
  ];

  const ORGANIC_REACTIONS = [
    // =========================================================================
    // 1. HYDROCARBON (Lớp 11 — GDPT 2018)
    // =========================================================================

    // --- ALKANE ---
    {
      reactants: ['CH4', 'Cl2'],
      products: [
        { formula: 'CH3Cl', state: 'gas' },
        { formula: 'HCl', state: 'gas' }
      ],
      type: 'substitution',
      condVi: 'ánh sáng',
      condEn: 'hν (light)',
      phenVi: 'Màu vàng lục của khí Cl₂ nhạt dần; khí HCl sinh ra làm giấy quỳ tím ẩm hóa đỏ.',
      phenEn: 'The yellow-green color of Cl₂ fades as gaseous HCl forms and turns damp litmus paper red.',
      expVi: 'Phản ứng thế halogen đặc trưng của alkane theo cơ chế gốc tự do (tỉ lệ mol 1:1 tạo chloromethane CH₃Cl). Lưu ý: nếu Cl₂ dư sẽ tiếp tục thế lần lượt tạo CH₂Cl₂, CHCl₃ và CCl₄.',
      expEn: 'Characteristic free-radical halogenation of methane (1:1 molar ratio yields chloromethane CH₃Cl). Note: excess Cl₂ sequentially substitutes further H atoms to form CH₂Cl₂, CHCl₃, and CCl₄.'
    },
    {
      reactants: ['C2H6', 'Cl2'],
      products: [
        { formula: 'C2H5Cl', state: 'gas' },
        { formula: 'HCl', state: 'gas' }
      ],
      type: 'substitution',
      condVi: 'ánh sáng',
      condEn: 'hν (light)',
      phenVi: 'Màu vàng lục của khí Cl₂ nhạt dần, tạo khí chloroethane (C₂H₅Cl) và khí HCl bốc khói nhẹ trong không khí ẩm.',
      phenEn: 'Yellow-green Cl₂ fades as chloroethane (C₂H₅Cl) and acidic HCl gas are produced.',
      expVi: 'Dưới tác dụng của ánh sáng (tia UV), nguyên tử Cl thế nguyên tử H của ethane theo cơ chế gốc tự do (tỉ lệ 1:1 cho sản phẩm thế monochloro duy nhất là C₂H₅Cl; nếu dư Cl₂ có thể tạo các dẫn xuất đa chloro).',
      expEn: 'Under UV light, free-radical substitution replaces one hydrogen atom in ethane with chlorine (1:1 ratio yields a single monochloro product, C₂H₅Cl; excess Cl₂ gives polychlorinated products).'
    },
    {
      reactants: ['C3H8', 'Cl2'],
      products: [
        { formula: 'C3H7Cl', state: null },
        { formula: 'HCl', state: 'gas' }
      ],
      type: 'substitution',
      condVi: 'ánh sáng',
      condEn: 'hν (light)',
      phenVi: 'Màu vàng lục của khí Cl₂ nhạt dần và xuất hiện khí HCl làm đỏ quỳ tím ẩm.',
      phenEn: 'Yellow-green Cl₂ fades while HCl gas evolves and reddens moist litmus paper.',
      expVi: 'Phản ứng thế monochloro của propane ưu tiên thế vào nguyên tử H gắn với cacbon bậc II tạo sản phẩm chính là 2-chloropropane (CH₃CHClCH₃) cùng sản phẩm phụ 1-chloropropane.',
      expEn: 'Monochlorination of propane favors substitution at the secondary carbon, yielding 2-chloropropane (CH₃CHClCH₃) as the major isomer alongside 1-chloropropane.'
    },

    // --- ALKENE (C2H4, C3H6) ---
    {
      reactants: ['C2H4', 'H2'],
      products: [{ formula: 'C2H6', state: 'gas' }],
      type: 'addition',
      condVi: 'Ni, t°',
      condEn: 'Ni, Δ',
      phenVi: 'Hỗn hợp khí ethylene và hydrogen giảm thể tích (tỉ lệ 2:1 về số mol khí) khi đi qua xúc tác Ni đun nóng, tạo khí ethane không màu.',
      phenEn: 'Gas volume contracts as ethylene and H₂ combine over heated nickel catalyst to produce colorless ethane gas.',
      expVi: 'Liên kết π kém bền trong nối đôi C=C bị phá vỡ, hai nguyên tử H cộng vào hai nguyên tử C tạo alkane no C₂H₆ (phản ứng cộng hydrogen / hiđro hóa).',
      expEn: 'Hydrogenation breaks the weaker π bond of the C=C double bond, adding two H atoms across the carbons to yield saturated ethane (C₂H₆).'
    },
    {
      reactants: ['C3H6', 'H2'],
      products: [{ formula: 'C3H8', state: 'gas' }],
      type: 'addition',
      condVi: 'Ni, t°',
      condEn: 'Ni, Δ',
      phenVi: 'Khí propene kết hợp với H₂ trên bề mặt xúc tác Ni nóng tạo khí propane không màu.',
      phenEn: 'Propene reacts with H₂ over a heated Ni catalyst to form colorless propane gas.',
      expVi: 'Phản ứng cộng H₂ phá vỡ liên kết π của propene (CH₂=CH-CH₃), chuyển alkene không no thành alkane tương ứng C₃H₈.',
      expEn: 'Catalytic hydrogenation cleaves the π bond of propene (CH₂=CH-CH₃), converting the unsaturated alkene into propane (C₃H₈).'
    },
    {
      reactants: ['C2H4', 'Br2'],
      products: [{ formula: 'C2H4Br2', state: null }],
      type: 'addition',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch nước brom màu vàng nâu bị mất màu nhanh chóng tạo chất lỏng không màu 1,2-dibromoethane lắng xuống đáy.',
      phenEn: 'Orange-brown bromine water rapidly decolorizes, forming colorless dense liquid 1,2-dibromoethane.',
      expVi: 'Liên kết π của ethylene cộng trực tiếp phân tử Br₂ ngay ở điều kiện thường tạo C₂H₄Br₂ (CH₂Br-CH₂Br). Đây là phản ứng đặc trưng nhận biết liên kết bội không no.',
      expEn: 'Electrophilic addition of Br₂ across the C=C double bond occurs immediately at room temperature to give 1,2-dibromoethane—a classic qualitative test for unsaturation.'
    },
    {
      reactants: ['C3H6', 'Br2'],
      products: [{ formula: 'C3H6Br2', state: null }],
      type: 'addition',
      condVi: '',
      condEn: '',
      phenVi: 'Nước brom màu vàng nâu mất màu ngay lập tức khi sục khí propene qua, tạo chất lỏng không màu 1,2-dibromopropane.',
      phenEn: 'Orange-brown bromine water immediately turns colorless upon bubbling propene gas, forming 1,2-dibromopropane.',
      expVi: 'Phản ứng cộng electrophile vào liên kết đôi C=C của propene tạo 1,2-dibromopropane (CH₂Br-CHBr-CH₃).',
      expEn: 'Electrophilic addition of Br₂ across the C=C bond of propene yields 1,2-dibromopropane (CH₂Br-CHBr-CH₃).'
    },
    {
      reactants: ['C2H4', 'HCl'],
      products: [{ formula: 'C2H5Cl', state: 'gas' }],
      type: 'addition',
      condVi: '',
      condEn: '',
      phenVi: 'Hai khí không màu kết hợp tạo khí chloroethane (ethyl chloride) không màu có mùi ete nhẹ.',
      phenEn: 'Colorless ethylene and HCl gases combine to form chloroethane (ethyl chloride).',
      expVi: 'Vì phân tử ethylene đối xứng nên cộng HCl chỉ tạo một sản phẩm duy nhất là C₂H₅Cl (CH₃-CH₂Cl).',
      expEn: 'Because ethylene is symmetrical, hydrohalogenation with HCl yields a single product: chloroethane (C₂H₅Cl).'
    },
    {
      reactants: ['C2H4', 'HBr'],
      products: [{ formula: 'C2H5Br', state: null }],
      type: 'addition',
      condVi: '',
      condEn: '',
      phenVi: 'Khí ethylene phản ứng với HBr tạo chất lỏng không màu bromoethane (ethyl bromide).',
      phenEn: 'Ethylene reacts with HBr to form colorless liquid bromoethane (ethyl bromide).',
      expVi: 'Phản ứng cộng HBr vào liên kết đôi C=C đối xứng của ethylene tạo sản phẩm duy nhất C₂H₅Br.',
      expEn: 'Addition of HBr across the symmetrical C=C double bond produces exclusively bromoethane (C₂H₅Br).'
    },
    {
      reactants: ['C2H4', 'H2O'],
      products: [{ formula: 'C2H5OH', state: null }],
      type: 'addition',
      condVi: 'H⁺, t°',
      condEn: 'H⁺, Δ',
      phenVi: 'Hơi nước cộng hợp vào khí ethylene dưới xúc tác axit (H₃PO₄ hoặc H₂SO₄ loãng) tạo chất lỏng không màu ethanol có mùi đặc trưng.',
      phenEn: 'Hydration of ethylene under acid catalysis (H₃PO₄ or dilute H₂SO₄) produces colorless liquid ethanol.',
      expVi: 'Phản ứng hydrate hóa ethylene là phương pháp tổng hợp công nghiệp quan trọng để sản xuất ethanol (C₂H₅OH) từ nguồn dầu mỏ.',
      expEn: 'Acid-catalyzed hydration of ethylene is a major industrial route for synthesizing ethanol (C₂H₅OH).'
    },
    {
      reactants: ['C3H6', 'HCl'],
      products: [{ formula: 'C3H7Cl', state: null }],
      type: 'addition',
      condVi: '',
      condEn: '',
      phenVi: 'Khí propene cộng hợp với HCl tạo hỗn hợp đồng phân chloropropane lỏng không màu.',
      phenEn: 'Propene undergoes addition with HCl to form colorless liquid chloropropane isomers.',
      expVi: 'Tuân theo quy tắc Markovnikov: nguyên tử H ưu tiên cộng vào nguyên tử C bậc thấp hơn (nhiều H hơn) của nối đôi C=C, còn Cl gắn vào C bậc cao hơn → sản phẩm chính là 2-chloropropane (CH₃CHClCH₃), sản phẩm phụ là 1-chloropropane.',
      expEn: 'Follows Markovnikov’s rule: H adds preferentially to the double-bonded carbon with more hydrogens while Cl attaches to the more substituted carbon—giving 2-chloropropane (CH₃CHClCH₃) as the major product and 1-chloropropane as the minor product.'
    },
    {
      reactants: ['C3H6', 'HBr'],
      products: [{ formula: 'C3H7Br', state: null }],
      type: 'addition',
      condVi: '',
      condEn: '',
      phenVi: 'Khí propene phản ứng với HBr tạo chất lỏng không màu (chủ yếu là 2-bromopropane).',
      phenEn: 'Propene reacts with HBr to yield colorless liquid bromopropane (predominantly 2-bromopropane).',
      expVi: 'Theo quy tắc Markovnikov, H cộng vào nhóm =CH₂ và Br cộng vào nhóm -CH= tạo sản phẩm chính 2-bromopropane (CH₃CHBrCH₃) thông qua carbocation bậc II bền hơn; sản phẩm phụ là 1-bromopropane.',
      expEn: 'By Markovnikov’s rule (via the more stable secondary carbocation), H adds to =CH₂ and Br adds to -CH=, yielding 2-bromopropane (CH₃CHBrCH₃) as the major product.'
    },
    {
      reactants: ['C3H6', 'H2O'],
      products: [{ formula: 'C3H7OH', state: null }],
      type: 'addition',
      condVi: 'H⁺, t°',
      condEn: 'H⁺, Δ',
      phenVi: 'Propene cộng nước có xúc tác axit tạo chất lỏng không màu (chủ yếu là propan-2-ol).',
      phenEn: 'Acid-catalyzed hydration of propene yields colorless liquid propanol (chiefly propan-2-ol).',
      expVi: 'Tuân theo quy tắc Markovnikov: nguyên tử H cộng vào C mang nhiều H hơn (=CH₂) và nhóm -OH cộng vào C bậc cao hơn (-CH=) → sản phẩm chính là propan-2-ol (CH₃CH(OH)CH₃), sản phẩm phụ là propan-1-ol.',
      expEn: 'Following Markovnikov’s rule, H adds to =CH₂ and -OH attaches to the secondary carbon—producing propan-2-ol (CH₃CH(OH)CH₃) as the major product alongside minor propan-1-ol.'
    },
    {
      reactants: ['C2H4', 'KMnO4', 'H2O'],
      products: [
        { formula: 'C2H4(OH)2', state: null },
        { formula: 'MnO2', state: 'precipitate' },
        { formula: 'KOH', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch thuốc tím KMnO₄ mất màu tím hồng nhanh chóng và xuất hiện kết tủa màu nâu đen MnO₂.',
      phenEn: 'Purple KMnO₄ solution rapidly decolorizes while a dark brown precipitate of MnO₂ forms.',
      expVi: 'Phản ứng oxi hóa không hoàn toàn alkene (phản ứng Baeyer): liên kết π của C₂H₄ bị oxi hóa tạo diol ethylene glycol C₂H₄(OH)₂, còn Mn(+7) bị khử xuống Mn(+4) trong MnO₂↓. Dùng để nhận biết alkene/alkyne.',
      expEn: 'The classic Baeyer test (mild oxidation of alkenes): KMnO₄ oxidizes the C=C double bond into ethylene glycol C₂H₄(OH)₂ while Mn(+7) is reduced to brown solid MnO₂.'
    },
    {
      reactants: ['C2H4', 'KMnO4'],
      extraReactants: ['H2O'],
      products: [
        { formula: 'C2H4(OH)2', state: null },
        { formula: 'MnO2', state: 'precipitate' },
        { formula: 'KOH', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch thuốc tím KMnO₄ mất màu tím hồng nhanh chóng và xuất hiện kết tủa màu nâu đen MnO₂.',
      phenEn: 'Purple KMnO₄ solution rapidly decolorizes while a dark brown precipitate of MnO₂ forms.',
      expVi: 'Khi sục ethylene qua dung dịch KMnO₄ loãng (có nước dung môi), phản ứng Baeyer tạo ethylene glycol và kết tủa nâu đen MnO₂↓.',
      expEn: 'Passing ethylene through aqueous KMnO₄ (Baeyer oxidation in solvent water) yields ethylene glycol and brown MnO₂↓.'
    },

    // --- ALKYNE (C2H2) ---
    {
      reactants: ['C2H2', 'H2'],
      products: [{ formula: 'C2H6', state: 'gas' }],
      type: 'addition',
      condVi: 'Ni, t°',
      condEn: 'Ni, Δ',
      phenVi: 'Khí acetylene kết hợp hoàn toàn với H₂ trên xúc tác Ni nóng tạo khí ethane không màu.',
      phenEn: 'Acetylene completely hydrogenates over heated Ni catalyst to form colorless ethane gas.',
      expVi: 'Với xúc tác Ni đun nóng, cả hai liên kết π trong nối ba C≡C đều bị phá vỡ để cộng 2 phân tử H₂ tạo C₂H₆. (Lưu ý: nếu dùng xúc tác Lindlar Pd/PbCO₃ hoặc Pd/BaSO₄, phản ứng dừng ở giai đoạn tạo alkene C₂H₄: C₂H₂ + H₂ → C₂H₄).',
      expEn: 'Over heated Ni, both π bonds of the C≡C triple bond saturate with 2 equivalents of H₂ to give C₂H₆. (Note: using Lindlar catalyst Pd/PbCO₃ or Pd/BaSO₄ stops hydrogenation at ethylene: C₂H₂ + H₂ → C₂H₄.)'
    },
    {
      reactants: ['C2H2', 'Br2'],
      products: [{ formula: 'C2H2Br4', state: null }],
      type: 'addition',
      condVi: 'Br₂ dư',
      condEn: 'excess Br₂',
      phenVi: 'Nước brom màu vàng nâu bị mất màu hoàn toàn, tạo chất lỏng nặng không màu 1,1,2,2-tetrabromoethane.',
      phenEn: 'Brown-orange bromine water is completely decolorized, yielding dense colorless 1,1,2,2-tetrabromoethane.',
      expVi: 'Do có 2 liên kết π trong nối ba C≡C, mỗi phân tử C₂H₂ cộng tối đa 2 phân tử Br₂ tạo C₂H₂Br₄. (Nếu phản ứng theo tỉ lệ mol 1:1 sẽ tạo sản phẩm trung gian 1,2-dibromoethene C₂H₂Br₂).',
      expEn: 'With two π bonds in its C≡C triple bond, acetylene adds two equivalents of Br₂ to form 1,1,2,2-tetrabromoethane (C₂H₂Br₄). (A 1:1 molar ratio stops at 1,2-dibromoethene C₂H₂Br₂.)'
    },
    {
      reactants: ['C2H2', 'HCl'],
      products: [{ formula: 'C2H3Cl', state: 'gas' }],
      type: 'addition',
      condVi: 'HgCl₂, t°',
      condEn: 'HgCl₂, Δ',
      phenVi: 'Khí acetylene cộng HCl theo tỉ lệ 1:1 tạo khí vinyl chloride (chloroethene) không màu.',
      phenEn: 'Acetylene adds HCl in a 1:1 ratio to generate colorless vinyl chloride (chloroethene) gas.',
      expVi: 'Dưới xúc tác HgCl₂ đun nóng, phản ứng cộng dừng ở giai đoạn 1:1 tạo CH₂=CHCl (vinyl chloride) — monomer quan trọng để trùng hợp sản xuất nhựa PVC.',
      expEn: 'Catalyzed by heated HgCl₂, 1:1 addition produces vinyl chloride (CH₂=CHCl)—the key monomer for manufacturing PVC plastic.'
    },
    {
      reactants: ['C2H2', 'H2O'],
      products: [{ formula: 'CH3CHO', state: null }],
      type: 'addition',
      condVi: 'HgSO₄/H₂SO₄, 80°C',
      condEn: 'HgSO₄/H₂SO₄, 80°C',
      phenVi: 'Khí acetylene bị hấp thụ vào dung dịch axit có xúc tác muối thủy ngân nóng tạo chất lỏng dễ bay hơi acetaldehyde (ethanal).',
      phenEn: 'Acetylene hydrates in warm acidic HgSO₄ solution to produce volatile acetaldehyde (ethanal).',
      expVi: 'Phản ứng Kucherov: cộng H₂O vào C₂H₂ bước đầu tạo vinyl alcohol (CH₂=CH-OH) không bền, lập tức chuyển vị (tautomer hóa) thành aldehyde CH₃CHO.',
      expEn: 'Kucherov hydration: water adds across C≡C to form unstable vinyl alcohol (CH₂=CH-OH), which immediately tautomerizes into acetaldehyde (CH₃CHO).'
    },
    {
      reactants: ['C2H2', 'Ag2O'],
      products: [
        { formula: 'C2Ag2', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'NH₃',
      condEn: 'NH₃',
      phenVi: 'Xuất hiện ngay kết tủa màu vàng nhạt của bạc acetylide (Ag₂C₂).',
      phenEn: 'A pale yellow precipitate of silver acetylide (Ag₂C₂) forms immediately.',
      expVi: 'Phản ứng thế nguyên tử H linh động ở nối ba đầu mạch (alk-1-yne) bằng ion Ag⁺ trong dung dịch NH₃ (dạng viết gọn với Ag₂O). Dùng để phân biệt alk-1-yne với alkene và các alkyne khác.',
      expEn: 'Substitution of acidic terminal alkyne hydrogens by Ag⁺ in ammonia solution (compact Ag₂O notation)—a signature test for terminal alkynes (alk-1-ynes).'
    },
    {
      reactants: ['C2H2', '[Ag(NH3)2]OH'],
      products: [
        { formula: 'C2Ag2', state: 'precipitate' },
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: '',
      condEn: '',
      phenVi: 'Khi sục khí C₂H₂ vào dung dịch thuốc thử Tollens (AgNO₃ trong NH₃ dư), lập tức xuất hiện kết tủa màu vàng nhạt Ag₂C₂↓ và có mùi khai NH₃.',
      phenEn: 'Bubbling C₂H₂ through Tollens’ reagent immediately yields a pale yellow Ag₂C₂ precipitate alongside ammonia odor.',
      expVi: 'Hai nguyên tử H gắn trực tiếp với nguyên tử C mang nối ba C≡C của acetylene có tính linh động nên bị ion Ag⁺ trong phức [Ag(NH₃)₂]⁺ thế chỗ tạo kết tủa silver acetylide C₂Ag₂↓.',
      expEn: 'Both terminal ≡C–H protons in acetylene are weakly acidic and are substituted by Ag⁺ from [Ag(NH₃)₂]OH to precipitate pale yellow silver acetylide (C₂Ag₂↓).'
    },
    {
      reactants: ['C2H2', 'AgNO3', 'NH3'],
      products: [
        { formula: 'Ag2C2', state: 'precipitate' },
        { formula: 'NH4NO3', state: null }
      ],
      type: 'substitution',
      condVi: '',
      condEn: '',
      phenVi: 'Xuất hiện ngay kết tủa màu vàng nhạt bạc acetylide (Ag₂C₂↓) — phản ứng nhận biết alkyne đầu mạch.',
      phenEn: 'A pale yellow precipitate of silver acetylide (Ag₂C₂↓) forms immediately — diagnostic test for terminal alkynes.',
      expVi: 'Nguyên tử H linh động ở liên kết ba đầu mạch (≡C–H) của acetylene bị ion Ag⁺ (trong hỗn hợp AgNO₃/NH₃) thế chỗ tạo kết tủa vàng nhạt Ag₂C₂↓ và muối NH₄NO₃.',
      expEn: 'Acidic terminal alkyne protons (≡C–H) in ethyne are displaced by Ag⁺ in AgNO₃/NH₃ to precipitate pale yellow silver acetylide (Ag₂C₂↓) and ammonium nitrate.'
    },
    {
      reactants: ['C3H4', 'AgNO3', 'NH3'],
      displayReactants: { C3H4: 'CH3C≡CH' },
      products: [
        { formula: 'CH3CCAg', displayFormula: 'CH3C≡CAg', state: 'precipitate' },
        { formula: 'NH4NO3', state: null }
      ],
      type: 'substitution',
      condVi: '',
      condEn: '',
      phenVi: 'Xuất hiện kết tủa màu vàng nhạt CH₃C≡CAg↓ — dấu hiệu nhận biết propyne (alk-1-yne).',
      phenEn: 'A pale yellow precipitate of CH₃C≡CAg↓ appears immediately, identifying propyne as a terminal alkyne.',
      expVi: 'Propyne (CH₃C≡CH) là alkyne có liên kết ba ở đầu mạch nên nguyên tử H linh động gắn với C(sp) tham gia phản ứng thế ion Ag⁺ trong dung dịch AgNO₃/NH₃ tạo kết tủa vàng nhạt.',
      expEn: 'Propyne (CH₃C≡CH) retains one terminal ≡C–H proton that undergoes Ag⁺ substitution in AgNO₃/NH₃ to precipitate pale yellow silver propynide (CH₃C≡CAg↓).'
    },
    {
      reactants: ['C3H4', '[Ag(NH3)2]OH'],
      displayReactants: { C3H4: 'CH3C≡CH' },
      products: [
        { formula: 'CH3CCAg', displayFormula: 'CH3C≡CAg', state: 'precipitate' },
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: '',
      condEn: '',
      phenVi: 'Xuất hiện kết tủa màu vàng nhạt CH₃C≡CAg↓ và có mùi khai của NH₃.',
      phenEn: 'Pale yellow CH₃C≡CAg↓ precipitates immediately accompanied by ammonia odor.',
      expVi: 'Tương tự acetylene, alkyne đầu mạch propyne tác dụng với thuốc thử Tollens thế một nguyên tử H đầu mạch bằng ion Ag⁺.',
      expEn: 'Terminal alkyne propyne replaces its single acidic ≡C–H hydrogen with Ag⁺ from Tollens’ reagent.'
    },
    {
      reactants: ['C3H4', 'Ag2O'],
      displayReactants: { C3H4: 'CH3C≡CH' },
      products: [
        { formula: 'CH3CCAg', displayFormula: 'CH3C≡CAg', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'NH₃',
      condEn: 'NH₃',
      phenVi: 'Xuất hiện kết tủa màu vàng nhạt CH₃C≡CAg↓ (dạng viết gọn với Ag₂O trong NH₃).',
      phenEn: 'Pale yellow CH₃C≡CAg↓ precipitate forms (compact Ag₂O/NH₃ representation).',
      expVi: 'Alkyne đầu mạch CH₃C≡CH thế ion Ag⁺ trong dung dịch NH₃ (viết gọn với Ag₂O) tạo kết tủa vàng nhạt.',
      expEn: 'Compact Ag₂O representation of propyne silver substitution in ammonia.'
    },

    // --- ARENE (C6H6, C7H8) ---
    {
      reactants: ['C6H6', 'Br2'],
      products: [
        { formula: 'C6H5Br', state: null },
        { formula: 'HBr', state: 'gas' }
      ],
      type: 'substitution',
      condVi: 'FeBr₃, t°',
      condEn: 'FeBr₃, Δ',
      phenVi: 'Màu nâu đỏ của brom khan nhạt dần khi đun nóng với benzene có bột sắt/FeBr₃, thoát ra khí HBr bốc khói trắng trong không khí ẩm.',
      phenEn: 'Reddish-brown liquid bromine fades upon warming with benzene and FeBr₃, releasing fuming HBr gas.',
      expVi: 'Phản ứng thế nguyên tử H của vòng benzene (khó cộng hơn alkene do hệ liên hợp thơm bền vững): Br thế vào vòng tạo bromobenzene (C₆H₅Br). Lưu ý: benzene không làm mất màu nước brom ở điều kiện thường.',
      expEn: 'Electrophilic aromatic substitution replaces a ring hydrogen with Br to yield bromobenzene (C₆H₅Br) while preserving aromaticity. Note: benzene does not decolorize aqueous bromine water.'
    },
    {
      reactants: ['C6H6', 'Cl2'],
      products: [
        { formula: 'C6H5Cl', state: null },
        { formula: 'HCl', state: 'gas' }
      ],
      type: 'substitution',
      condVi: 'FeCl₃, t°',
      condEn: 'FeCl₃, Δ',
      phenVi: 'Màu vàng lục của khí Cl₂ nhạt dần, tạo chất lỏng không màu chlorobenzene và khí HCl làm đỏ quỳ tím ẩm.',
      phenEn: 'Yellow-green Cl₂ fades to form colorless liquid chlorobenzene and acidic HCl gas.',
      expVi: 'Có xúc tác FeCl₃ (bột sắt), Cl₂ thế nguyên tử H trên vòng thơm tạo C₆H₅Cl. (Lưu ý: nếu chiếu tia UV không có xúc tác FeCl₃, Cl₂ cộng vào vòng benzene tạo thuốc trừ sâu 666: C₆H₆Cl₆).',
      expEn: 'With FeCl₃ catalyst, electrophilic substitution produces chlorobenzene (C₆H₅Cl). (Note: under UV light without FeCl₃, radical addition forms hexachlorocyclohexane C₆H₆Cl₆.)'
    },
    {
      reactants: ['C6H6', 'HNO3'],
      products: [
        { formula: 'C6H5NO2', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Xuất hiện lớp chất lỏng sánh màu vàng nhạt nitrobenzene mùi hạnh nhân, nặng hơn nước và lắng xuống đáy bình.',
      phenEn: 'A dense, pale yellow oily layer of nitrobenzene (almond-like odor) separates and sinks below the aqueous acid layer.',
      expVi: 'Phản ứng nitro hóa vòng benzene: H₂SO₄ đặc vừa đóng vai trò chất xúc tác tạo tác nhân electrophile NO₂⁺ vừa hút nước, tạo nitrobenzene (C₆H₅NO₂).',
      expEn: 'Electrophilic nitration of benzene: concentrated H₂SO₄ generates the nitronium ion (NO₂⁺) electrophile to substitute onto the aromatic ring, forming nitrobenzene.'
    },
    {
      reactants: ['C6H6', 'HNO3', 'H2SO4'],
      catalyst: 'H2SO4',
      products: [
        { formula: 'C6H5NO2', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo chất lỏng màu vàng nhạt, sánh như dầu, nặng hơn nước và có mùi hạnh nhân — nitrobenzene (C₆H₅NO₂).',
      phenEn: 'Forms a pale yellow, dense oily liquid heavier than water with a bitter-almond odor — nitrobenzene (C₆H₅NO₂).',
      expVi: 'H₂SO₄ đặc đóng vai trò chất xúc tác (và chất hút nước) sinh ra cation nitroni NO₂⁺ để thế nguyên tử H trên vòng thơm benzene.',
      expEn: 'Concentrated H₂SO₄ acts as acid catalyst and dehydrating medium (shown on the reaction arrow), generating NO₂⁺ for aromatic nitration to nitrobenzene.'
    },
    {
      reactants: ['C6H6', 'H2'],
      products: [{ formula: 'C6H12', state: null }],
      type: 'addition',
      condVi: 'Ni, t°, P',
      condEn: 'Ni, Δ, P',
      phenVi: 'Ở nhiệt độ và áp suất cao có xúc tác Ni, benzene cộng 3 phân tử H₂ tạo chất lỏng không màu cyclohexane.',
      phenEn: 'Under elevated temperature, pressure, and Ni catalyst, benzene adds 3 equivalents of H₂ to form colorless liquid cyclohexane.',
      expVi: 'Do vòng benzene có hệ liên hợp thơm rất bền nên chỉ cộng H₂ trong điều kiện khắc nghiệt, phá vỡ hoàn toàn tính thơm để tạo vòng no cyclohexane (C₆H₁₂).',
      expEn: 'Because the aromatic π system of benzene is exceptionally stable, vigorous catalytic hydrogenation is required to saturate all three double bonds into cyclohexane (C₆H₁₂).'
    },
    {
      reactants: ['C7H8', 'Br2'],
      products: [
        { formula: 'C7H7Br', state: null },
        { formula: 'HBr', state: 'gas' }
      ],
      type: 'substitution',
      condVi: 'FeBr₃',
      condEn: 'FeBr₃',
      phenVi: 'Phản ứng xảy ra nhanh hơn so với benzene, màu brom nhạt dần và thoát khí HBr làm đỏ quỳ tím ẩm.',
      phenEn: 'Bromine decolorizes more readily than with benzene, evolving acidic HBr gas.',
      expVi: 'Nhóm thế -CH₃ đẩy electron làm hoạt hóa vòng benzene và định hướng nhóm thế mới vào vị trí ortho- (2-bromotoluene) và para- (4-bromotoluene). (Lưu ý: nếu chiếu sáng và đun nóng không có FeBr₃, Br₂ sẽ thế vào nhánh -CH₃ tạo benzyl bromide).',
      expEn: 'The electron-donating -CH₃ group activates the aromatic ring and directs bromination to the ortho and para positions (yielding o-/p-bromotoluene). (Under light without FeBr₃, radical substitution occurs on the methyl side chain.)'
    },
    {
      reactants: ['C7H8', 'HNO3'],
      products: [
        { formula: 'C7H5N3O6', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Toluene phản ứng nitro hóa mạnh với hỗn hợp HNO₃ đặc / H₂SO₄ đặc đun nóng tạo chất rắn kết tinh màu vàng nhạt 2,4,6-trinitrotoluene (TNT).',
      phenEn: 'Vigorous nitration of toluene with concentrated HNO₃/H₂SO₄ produces pale yellow crystalline 2,4,6-trinitrotoluene (TNT).',
      expVi: 'Nhờ nhóm -CH₃ hoạt hóa vòng thơm theo định hướng ortho/para, phản ứng thế 3 nhóm -NO₂ vào các vị trí 2, 4, 6 tạo thuốc nổ TNT (C₆H₂(NO₂)₃CH₃).',
      expEn: 'Guided by the ortho/para-directing -CH₃ substituent, exhaustive nitration installs three -NO₂ groups at positions 2, 4, and 6 to yield TNT.'
    },
    {
      reactants: ['C7H8', 'HNO3', 'H2SO4'],
      catalyst: 'H2SO4',
      products: [
        { formula: 'C7H5N3O6', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo tinh thể màu vàng nhạt 2,4,6-trinitrotoluene (thuốc nổ TNT).',
      phenEn: 'Produces pale yellow crystalline 2,4,6-trinitrotoluene (TNT).',
      expVi: 'H₂SO₄ đặc làm chất xúc tác và hút nước sinh ra tác nhân NO₂⁺ thế 3 nguyên tử H ở vị trí 2, 4, 6 trên vòng thơm của toluene.',
      expEn: 'Concentrated H₂SO₄ acts as catalyst and dehydrating agent (on the arrow) to promote trisubstitution into TNT.'
    },

    // =========================================================================
    // 2. ALCOHOL & PHENOL (Lớp 11 — GDPT 2018)
    // =========================================================================

    {
      reactants: ['CH3OH', 'Na'],
      products: [
        { formula: 'CH3ONa', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Mẫu kim loại Na chìm xuống đáy, tan dần trong methanol và sủi bọt khí H₂ không màu đều đặn.',
      phenEn: 'Sodium sinks and dissolves steadily in methanol while evolving colorless bubbles of H₂ gas.',
      expVi: 'Nguyên tử H trong nhóm chức -OH của alcohol có tính linh động (phân cực mạnh về phía O) nên bị kim loại kiềm Na đẩy ra tạo sodium methoxide (CH₃ONa) và khí H₂.',
      expEn: 'The polar O–H proton of methanol reacts with alkali metal Na to liberate H₂ gas and form sodium methoxide (CH₃ONa).'
    },
    {
      reactants: ['C2H5OH', 'Na'],
      products: [
        { formula: 'C2H5ONa', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Mẫu Na chìm xuống đáy ống nghiệm chứa ethanol khan, tan dần và sủi bọt khí H₂ không màu (êm dịu hơn khi Na tác dụng với nước).',
      phenEn: 'Sodium sinks in anhydrous ethanol and dissolves steadily with effervescence of H₂ gas (milder than sodium with water).',
      expVi: 'Kim loại Na thế nguyên tử H linh động trong nhóm -OH của ethanol tạo muối sodium ethoxide (C₂H₅ONa) và giải phóng H₂↑. Phản ứng chứng minh sự có mặt của nhóm -OH trong phân tử alcohol.',
      expEn: 'Sodium displaces the hydroxyl hydrogen of ethanol to form sodium ethoxide (C₂H₅ONa) and H₂ gas, confirming the presence of the -OH functional group.'
    },
    {
      reactants: ['CH3OH', 'HBr'],
      products: [
        { formula: 'CH3Br', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun nóng methanol với dung dịch HBr đặc, tạo khí bromomethane (CH₃Br) không màu và nước.',
      phenEn: 'Heating methanol with concentrated HBr yields gaseous bromomethane (CH₃Br) and water.',
      expVi: 'Phản ứng thế nhóm -OH của alcohol bằng nguyên tử halogen -Br tạo dẫn xuất halogen CH₃Br.',
      expEn: 'Nucleophilic substitution replaces the -OH group of methanol with -Br to produce bromomethane (CH₃Br).'
    },
    {
      reactants: ['C2H5OH', 'HBr'],
      products: [
        { formula: 'C2H5Br', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Đun nóng hỗn hợp ethanol và HBr đặc tạo lớp chất lỏng không màu bromoethane không tan trong nước, lắng xuống đáy.',
      phenEn: 'Heating ethanol with concentrated HBr forms an immiscible, dense colorless layer of bromoethane.',
      expVi: 'Nhóm -OH của ethanol bị thế bởi ion Br⁻ trong môi trường axit nóng tạo ethyl bromide (C₂H₅Br) và nước.',
      expEn: 'Acid-promoted nucleophilic substitution replaces the -OH group of ethanol with Br⁻ to synthesize ethyl bromide (C₂H₅Br).'
    },
    {
      reactants: ['CH3OH', 'CuO'],
      products: [
        { formula: 'HCHO', state: 'gas' },
        { formula: 'Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Bột CuO (hoặc dây đồng nung nóng phủ lớp CuO màu đen) chuyển dần sang màu đỏ gạch của đồng kim loại và có mùi hăng xốc của formaldehyde (HCHO).',
      phenEn: 'Black CuO turns reddish-brown metallic copper while pungent formaldehyde (HCHO) vapor forms.',
      expVi: 'Alcohol bậc I (methanol) bị CuO nung nóng oxi hóa không hoàn toàn tạo aldehyde tương ứng HCHO, đồng thời Cu(+2) bị khử về Cu(0).',
      expEn: 'Heated CuO mildly oxidizes primary alcohol methanol into methanal (HCHO) while reducing Cu(+2) to elemental copper.'
    },
    {
      reactants: ['C2H5OH', 'CuO'],
      products: [
        { formula: 'CH3CHO', state: null },
        { formula: 'Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Dây đồng nung đỏ có lớp CuO màu đen lập tức sáng bóng trở lại thành màu đỏ đồng khi nhúng vào ethanol, tỏa mùi hắc nhẹ của acetaldehyde.',
      phenEn: 'A blackened oxidized copper wire immediately turns bright reddish metallic copper when dipped into ethanol, releasing acetaldehyde vapor.',
      expVi: 'Alcohol bậc I (ethanol) bị CuO oxi hóa không hoàn toàn thành aldehyde ethanal (CH₃CHO), CuO bị khử thành Cu kim loại.',
      expEn: 'Mild oxidation of primary alcohol ethanol by hot CuO produces ethanal (CH₃CHO) and regenerates metallic copper.'
    },
    {
      reactants: ['C2H5OH', 'K2Cr2O7', 'H2SO4'],
      products: [
        { formula: 'CH3COOH', state: null },
        { formula: 'Cr2(SO4)3', state: null },
        { formula: 'K2SO4', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Dung dịch chuyển màu rõ rệt từ da cam (Cr₂O₇²⁻) sang xanh lục (Cr³⁺) — nguyên lý ống thổi đo nồng độ cồn trong hơi thở.',
      phenEn: 'The solution shifts dramatically from orange-red (Cr₂O₇²⁻) to deep green (Cr³⁺) — the classic breathalyzer alcohol test principle.',
      expVi: 'Ethanol bị oxi hóa mạnh bởi K₂Cr₂O₇ trong môi trường H₂SO₄ loãng lên carboxylic acid (CH₃COOH), đồng thời Cr(+6) màu da cam bị khử về ion Cr³⁺ màu xanh lục.',
      expEn: 'Dichromate in sulfuric acid strongly oxidizes ethanol to acetic acid while orange Cr(+6) is reduced to green Cr³⁺ ions.'
    },
    {
      reactants: ['C3H5(OH)3', 'Cu(OH)2'],
      products: [
        { formula: '[C3H5(OH)2O]2Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Kết tủa xanh lam nhạt Cu(OH)₂ tan hoàn toàn tạo dung dịch phức chất màu xanh lam đậm trong suốt (copper(II) glycerate).',
      phenEn: 'Pale blue Cu(OH)₂ precipitate completely dissolves into a clear, deep royal-blue complex solution.',
      expVi: 'Phản ứng đặc trưng của polyalcohol có các nhóm -OH liền kề nhau: glycerol hòa tan Cu(OH)₂ tạo phức đồng(II) màu xanh lam đậm, dùng để phân biệt glycerol với alcohol đơn chức như ethanol.',
      expEn: 'Characteristic test for polyols with adjacent -OH groups: glycerol chelates Cu(OH)₂ into a soluble deep blue copper(II) complex, distinguishing it from monohydric alcohols.'
    },
    {
      reactants: ['C2H4(OH)2', 'Cu(OH)2'],
      products: [
        { formula: '[C2H4(OH)O]2Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Kết tủa Cu(OH)₂ tan hết tạo dung dịch phức chất màu xanh lam đậm trong suốt.',
      phenEn: 'Blue Cu(OH)₂ precipitate dissolves completely to form a clear deep blue complex solution.',
      expVi: 'Ethylene glycol có hai nhóm -OH gắn vào hai nguyên tử C kề nhau nên hòa tan được Cu(OH)₂ ở nhiệt độ thường tạo phức đồng(II) xanh lam đậm.',
      expEn: 'Because ethylene glycol possesses vicinal -OH groups, it complexes and dissolves Cu(OH)₂ at room temperature to yield a deep blue solution.'
    },
    {
      reactants: ['C6H5OH', 'Na'],
      products: [
        { formula: 'C6H5ONa', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Natri phản ứng với phenol nóng chảy, tan dần và giải phóng bọt khí H₂ không màu.',
      phenEn: 'Sodium reacts with molten phenol, dissolving steadily while evolving colorless H₂ gas bubbles.',
      expVi: 'Nhóm -OH của phenol có nguyên tử H linh động (linh động hơn cả alcohol) nên tác dụng với Na tạo sodium phenolate (C₆H₅ONa) và khí H₂.',
      expEn: 'The acidic hydroxyl hydrogen of phenol reacts with sodium metal to produce sodium phenolate (C₆H₅ONa) and hydrogen gas.'
    },
    {
      reactants: ['C6H5OH', 'NaOH'],
      products: [
        { formula: 'C6H5ONa', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Huyền phù phenol đục trắng trong nước nhanh chóng tan hết khi nhỏ dung dịch NaOH vào, tạo dung dịch sodium phenolate trong suốt.',
      phenEn: 'A cloudy suspension of sparingly soluble phenol in water clears rapidly upon adding NaOH, forming soluble sodium phenolate.',
      expVi: 'Do ảnh hưởng hút electron của vòng benzene lên nhóm -OH, phenol có tính axit yếu (tác dụng được với dung dịch kiềm mạnh NaOH, khác với alcohol không phản ứng với NaOH).',
      expEn: 'Resonance stabilization of the phenoxide ion makes phenol weakly acidic—capable of neutralizing strong base NaOH, unlike aliphatic alcohols.'
    },
    {
      reactants: ['C6H5OH', 'KOH'],
      products: [
        { formula: 'C6H5OK', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Phenol tan hoàn toàn trong dung dịch KOH tạo dung dịch potassium phenolate trong suốt.',
      phenEn: 'Phenol dissolves completely in aqueous KOH to form a clear potassium phenolate solution.',
      expVi: 'Phenol thể hiện tính axit yếu khi trung hòa dung dịch kiềm mạnh KOH tạo muối C₆H₅OK và nước.',
      expEn: 'Weakly acidic phenol neutralizes aqueous KOH to produce soluble potassium phenolate (C₆H₅OK) and water.'
    },
    {
      reactants: ['C6H5OH', 'Br2'],
      products: [
        { formula: 'C6H2Br3OH', state: 'precipitate' },
        { formula: 'HBr', state: null }
      ],
      type: 'substitution',
      condVi: '',
      condEn: '',
      phenVi: 'Nước brom màu vàng nâu mất màu ngay lập tức và xuất hiện kết tủa màu trắng của 2,4,6-tribromophenol.',
      phenEn: 'Bromine water immediately decolorizes and forms a dense white precipitate of 2,4,6-tribromophenol.',
      expVi: 'Nhóm -OH đẩy electron mạnh làm tăng mật độ electron ở các vị trí ortho và para của vòng benzene, khiến phenol dễ dàng thế đồng thời cả 3 nguyên tử H ngay ở nhiệt độ thường không cần xúc tác. Đây là phản ứng đặc trưng nhận biết phenol.',
      expEn: 'The strongly activating -OH group enriches the ortho and para positions so intensely that phenol undergoes rapid trisubstitution with aqueous Br₂ at room temperature with no catalyst—forming white 2,4,6-tribromophenol precipitate.'
    },
    {
      reactants: ['C6H5OH', 'HNO3'],
      products: [
        { formula: 'C6H2(NO2)3OH', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Phenol phản ứng mạnh với HNO₃ đặc có H₂SO₄ đặc xúc tác tạo kết tủa tinh thể màu vàng của 2,4,6-trinitrophenol (picric acid).',
      phenEn: 'Phenol undergoes vigorous nitration to yield bright yellow crystals of 2,4,6-trinitrophenol (picric acid).',
      expVi: 'Ảnh hưởng hoạt hóa mạnh của nhóm -OH làm phản ứng nitro hóa phenol diễn ra dễ dàng hơn nhiều so với benzene, thế đồng thời 3 nhóm -NO₂ vào vị trí 2, 4, 6.',
      expEn: 'Strongly activated by the -OH substituent, phenol undergoes trisubstitution at the 2, 4, and 6 positions to synthesize yellow picric acid.'
    },
    {
      reactants: ['C6H5OH', 'HNO3', 'H2SO4'],
      catalyst: 'H2SO4',
      products: [
        { formula: 'C6H2(NO2)3OH', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'substitution',
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Xuất hiện kết tủa tinh thể màu vàng rực của 2,4,6-trinitrophenol (picric acid).',
      phenEn: 'Bright yellow crystals of 2,4,6-trinitrophenol (picric acid) precipitate.',
      expVi: 'H₂SO₄ đặc xúc tác và hút nước giúp HNO₃ thế nhanh 3 nhóm -NO₂ vào vòng thơm của phenol.',
      expEn: 'Concentrated H₂SO₄ serves as catalyst and dehydrating medium for rapid trisubstitution to picric acid.'
    },
    {
      reactants: ['C6H5ONa', 'CO2', 'H2O'],
      products: [
        { formula: 'C6H5OH', state: 'precipitate' },
        { formula: 'NaHCO3', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch sodium phenolate trong suốt bị vẩn đục trắng trở lại do phenol ít tan trong nước lạnh tách ra.',
      phenEn: 'The clear sodium phenolate solution turns cloudy white as poorly soluble phenol precipitates out.',
      expVi: 'Carbonic acid (CO₂ + H₂O) đẩy được phenol ra khỏi muối phenolate (tạo NaHCO₃), chứng minh tính acid của phenol rất yếu (yếu hơn cả nấc 1 của H₂CO₃).',
      expEn: 'Carbonic acid (CO₂ + H₂O) displaces phenol from sodium phenolate (yielding NaHCO₃), proving phenol is a weaker acid than H₂CO₃.'
    },

    // =========================================================================
    // 3. ALDEHYDE & CARBOXYLIC ACID (Lớp 11 — GDPT 2018)
    // =========================================================================

    // --- Khử aldehyde bằng H2 ---
    {
      reactants: ['HCHO', 'H2'],
      products: [{ formula: 'CH3OH', state: null }],
      type: 'addition',
      condVi: 'Ni, t°',
      condEn: 'Ni, Δ',
      phenVi: 'Formaldehyde bị khử bởi khí H₂ trên xúc tác Ni đun nóng tạo chất lỏng methanol không màu.',
      phenEn: 'Formaldehyde is reduced by H₂ over heated nickel catalyst to form colorless liquid methanol.',
      expVi: 'Phản ứng cộng H₂ vào liên kết đôi C=O của nhóm chức aldehyde (-CHO), chuyển methanal thành alcohol bậc I tương ứng là methanol (CH₃OH).',
      expEn: 'Catalytic hydrogenation adds H₂ across the carbonyl C=O double bond, reducing methanal into the primary alcohol methanol (CH₃OH).'
    },
    {
      reactants: ['CH3CHO', 'H2'],
      products: [{ formula: 'C2H5OH', state: null }],
      type: 'addition',
      condVi: 'Ni, t°',
      condEn: 'Ni, Δ',
      phenVi: 'Acetaldehyde cộng hợp với H₂ trên xúc tác Ni đun nóng tạo chất lỏng không màu ethanol.',
      phenEn: 'Acetaldehyde reacts with H₂ over heated Ni catalyst to produce colorless liquid ethanol.',
      expVi: 'Nhóm chức carbonyl C=O của aldehyde bị khử bởi H₂ (cộng H₂ vào liên kết π của C=O) tạo alcohol bậc I ethanol (C₂H₅OH).',
      expEn: 'Hydrogenation across the C=O π bond reduces ethanal (CH₃CHO) into primary alcohol ethanol (C₂H₅OH).'
    },

    // --- Phản ứng tráng bạc (Tollens) & Ag2O ---
    {
      reactants: ['HCHO', '[Ag(NH3)2]OH'],
      products: [
        { formula: '(NH4)2CO3', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun nóng nhẹ, một lớp bạc kim loại (Ag) sáng bóng bám đều lên thành ống nghiệm như gương và có mùi khai NH₃.',
      phenEn: 'Upon gentle warming, a brilliant reflective silver mirror coats the glass wall alongside ammonia odor.',
      expVi: 'Phản ứng tráng bạc đặc biệt của methanal (HCHO): vì cấu tạo H-CHO có 2 nguyên tử H gắn vào nhóm C=O nên bị thuốc thử Tollens dư oxi hóa hoàn toàn đến muối (NH₄)₂CO₃ và tạo tới 4 mol Ag cho mỗi mol HCHO.',
      expEn: 'Unique Tollens’ test for formaldehyde (HCHO): because both sides of its carbonyl bear hydrogen atoms, excess reagent oxidizes it completely to (NH₄)₂CO₃, depositing 4 moles of silver per mole of HCHO.'
    },
    {
      reactants: ['CH3CHO', '[Ag(NH3)2]OH'],
      products: [
        { formula: 'CH3COONH4', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lớp bạc kim loại màu trắng sáng bóng kết tủa bám lên thành ống nghiệm (phản ứng tráng gương) kèm mùi khai nhẹ của khí NH₃.',
      phenEn: 'A shiny metallic silver mirror deposits smoothly on the inner glass wall with mild ammonia odor.',
      expVi: 'Phản ứng với thuốc thử Tollens nhận biết nhóm chức aldehyde (-CHO): CH₃CHO bị oxi hóa thành muối ammonium acetate (CH₃COONH₄), còn ion Ag⁺ bị khử về Ag kim loại theo tỉ lệ 1 mol aldehyde : 2 mol Ag.',
      expEn: 'Classic Tollens’ silver-mirror test for aldehydes: ethanal is oxidized to ammonium acetate (CH₃COONH₄) while Ag⁺ is reduced to metallic silver (1:2 stoichiometry).'
    },
    {
      reactants: ['HCHO', 'Ag2O'],
      products: [
        { formula: 'CO2', state: 'gas' },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'NH₃, t°',
      condEn: 'NH₃, Δ',
      phenVi: 'Xuất hiện lớp bạc kim loại (Ag) sáng bóng bám trên thành ống nghiệm khi đun nóng nhẹ.',
      phenEn: 'A bright metallic silver mirror forms on the test tube wall upon gentle heating.',
      expVi: 'Phương trình viết gọn của phản ứng tráng bạc HCHO trong dung dịch NH₃: 1 mol HCHO sinh ra 4 mol Ag↓. (Lưu ý: trong thực tế dung dịch NH₃ dư, CO₂ và H₂O kết hợp với NH₃ tạo muối (NH₄)₂CO₃ như ở phương trình với [Ag(NH₃)₂]OH).',
      expEn: 'Compact Ag₂O representation of formaldehyde’s silver-mirror reaction (1 mol HCHO yields 4 mol Ag). (In aqueous NH₃, CO₂ + H₂O converts to ammonium carbonate (NH₄)₂CO₃.)'
    },
    {
      reactants: ['CH3CHO', 'Ag2O'],
      products: [
        { formula: 'CH3COOH', state: null },
        { formula: 'Ag', state: 'precipitate' }
      ],
      type: 'redox',
      condVi: 'NH₃, t°',
      condEn: 'NH₃, Δ',
      phenVi: 'Lớp bạc kim loại (Ag) trắng sáng bám lên thành bình thủy tinh.',
      phenEn: 'A reflective silver metal coating deposits on the glass surface.',
      expVi: 'Phương trình dạng rút gọn của phản ứng tráng bạc ethanal (CH₃CHO) trong môi trường NH₃: nhóm -CHO bị oxi hóa thành -COOH (trong dung dịch NH₃ thực tế chuyển thành muối CH₃COONH₄) và giải phóng 2 mol Ag↓.',
      expEn: 'Compact Ag₂O notation for the silver-mirror oxidation of acetaldehyde to acetic acid (which forms CH₃COONH₄ in aqueous NH₃), depositing 2 moles of Ag per mole of aldehyde.'
    },
    {
      reactants: ['CH3CHO', 'AgNO3', 'NH3'],
      extraReactants: ['H2O'],
      products: [
        { formula: 'CH3COONH4', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH4NO3', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun nhẹ, một lớp bạc kim loại (Ag↓) sáng bóng bám đều lên thành ống nghiệm như gương.',
      phenEn: 'Gentle heating produces a gleaming silver mirror coating (Ag↓) along the glass wall.',
      expVi: 'Aldehyde ethanal (CH₃CHO) bị phức [Ag(NH₃)₂]⁺ (tạo từ AgNO₃ + NH₃ + dung môi H₂O) oxi hóa thành CH₃COONH₄ và giải phóng 2 mol Ag↓.',
      expEn: 'Ethanal (CH₃CHO) is oxidized by [Ag(NH₃)₂]⁺ (formed from AgNO₃ + NH₃ in aqueous solvent H₂O) into CH₃COONH₄ while depositing 2 moles of metallic silver.'
    },
    {
      reactants: ['HCHO', 'AgNO3', 'NH3'],
      extraReactants: ['H2O'],
      products: [
        { formula: '(NH4)2CO3', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH4NO3', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lớp bạc sáng bóng bám lên thành ống nghiệm với lượng lớn (tỉ lệ đặc biệt 1 mol HCHO : 4 mol Ag↓).',
      phenEn: 'A bright metallic silver mirror forms in a special 1:4 aldehyde-to-silver molar stoichiometry.',
      expVi: 'Methanal (HCHO) có hai nguyên tử H gắn trực tiếp vào nhóm C=O nên bị AgNO₃/NH₃ dư trong dung dịch nước oxi hóa hoàn toàn tạo (NH₄)₂CO₃ và tới 4 mol Ag↓.',
      expEn: 'Because formaldehyde has two hydrogens directly attached to the carbonyl carbon, excess AgNO₃/NH₃/H₂O oxidizes it completely to (NH₄)₂CO₃, depositing 4 moles of silver.'
    },
    {
      reactants: ['CH3CHO', 'Br2', 'H2O'],
      products: [
        { formula: 'CH3COOH', state: null },
        { formula: 'HBr', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Màu vàng nâu của nước bromine nhạt dần và mất màu hoàn toàn, thu được dung dịch acid không màu.',
      phenEn: 'The orange-brown color of aqueous bromine fades completely to yield a clear acidic solution.',
      expVi: 'Aldehyde thể hiện tính khử: nước bromine (Br₂ + H₂O) oxi hóa nhóm -CHO của ethanal thành carboxylic acid CH₃COOH và tạo HBr.',
      expEn: 'Acetaldehyde displays reducing properties: bromine water oxidizes the -CHO group cleanly to acetic acid (CH₃COOH) and HBr.'
    },
    {
      reactants: ['CH3CHO', 'Br2'],
      extraReactants: ['H2O'],
      products: [
        { formula: 'CH3COOH', state: null },
        { formula: 'HBr', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch nước bromine màu vàng nâu bị mất màu hoàn toàn tạo dung dịch acetic acid không màu.',
      phenEn: 'Orange-brown bromine water is completely decolorized into a clear acetic acid solution.',
      expVi: 'Trong dung dịch nước (có mặt dung môi H₂O), Br₂ oxi hóa aldehyde CH₃CHO thành carboxylic acid CH₃COOH và 2 HBr.',
      expEn: 'In aqueous solution (H₂O present as solvent/reactant), Br₂ oxidizes ethanal cleanly to acetic acid and HBr.'
    },

    // --- Oxi hóa aldehyde bằng Cu(OH)2 trong kiềm (3 chất) ---
    {
      reactants: ['CH3CHO', 'Cu(OH)2', 'NaOH'],
      products: [
        { formula: 'CH3COONa', state: null },
        { formula: 'Cu2O', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Kết tủa màu xanh lam Cu(OH)₂ biến mất, xuất hiện kết tủa màu đỏ gạch đặc trưng của copper(I) oxide (Cu₂O↓).',
      phenEn: 'Blue Cu(OH)₂ disappears and a signature brick-red precipitate of copper(I) oxide (Cu₂O↓) forms.',
      expVi: 'Khi đun nóng trong môi trường kiềm NaOH, Cu(+2) oxi hóa nhóm -CHO của ethanal thành muối sodium acetate (CH₃COONa) và bị khử xuống Cu(+1) trong kết tủa đỏ gạch Cu₂O. Đây là phản ứng nhận biết aldehyde quan trọng.',
      expEn: 'Upon heating in alkaline NaOH, Cu(+2) oxidizes the -CHO group of acetaldehyde to sodium acetate while being reduced to brick-red Cu₂O precipitate—a classic qualitative test for aldehydes.'
    },
    {
      reactants: ['HCHO', 'Cu(OH)2', 'NaOH'],
      products: [
        { formula: 'Na2CO3', state: null },
        { formula: 'Cu2O', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun nóng, kết tủa xanh lam Cu(OH)₂ chuyển nhanh thành kết tủa đỏ gạch Cu₂O↓.',
      phenEn: 'Upon heating, blue Cu(OH)₂ rapidly converts into a brick-red precipitate of Cu₂O↓.',
      expVi: 'Trong môi trường kiềm nóng dư, HCHO bị Cu(OH)₂ oxi hóa hoàn toàn đến muối Na₂CO₃ và tạo lượng kết tủa đỏ gạch Cu₂O gấp đôi so với aldehyde đơn chức khác.',
      expEn: 'In hot excess alkali, formaldehyde is completely oxidized by Cu(OH)₂ to Na₂CO₃, generating twice as much brick-red Cu₂O precipitate as other monoaldehydes.'
    },

    // --- Tính acid của HCOOH (Formic acid / Methanoic acid) ---
    {
      reactants: ['HCOOH', 'Na'],
      products: [
        { formula: 'HCOONa', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Natri tan nhanh trong dung dịch formic acid, tỏa nhiệt và sủi bọt khí H₂ không màu mạnh.',
      phenEn: 'Sodium dissolves vigorously in formic acid, releasing heat and rapid bubbles of colorless H₂ gas.',
      expVi: 'Formic acid (HCOOH) là carboxylic acid có tính axit yếu nhưng mạnh hơn nhiều so với alcohol và phenol; Na dễ dàng đẩy H₂ ra khỏi nhóm -COOH tạo muối sodium formate (HCOONa).',
      expEn: 'Formic acid reacts readily with reactive metal sodium to liberate H₂ gas and form sodium formate (HCOONa).'
    },
    {
      reactants: ['HCOOH', 'Mg'],
      products: [
        { formula: '(HCOO)2Mg', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Dải magie tan dần trong dung dịch HCOOH kèm sủi bọt khí H₂ không màu liên tục.',
      phenEn: 'Magnesium ribbon dissolves steadily in aqueous HCOOH with continuous effervescence of H₂ gas.',
      expVi: 'Kim loại Mg đứng trước H trong dãy hoạt động hóa học nên đẩy H₂ ra khỏi nhóm carboxyl -COOH tạo muối magnesium formate (HCOO)₂Mg.',
      expEn: 'Magnesium lies above H in the reactivity series, displacing H₂ from formic acid to yield soluble magnesium formate (HCOO)₂Mg.'
    },
    {
      reactants: ['HCOOH', 'Zn'],
      products: [
        { formula: '(HCOO)2Zn', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Viên kẽm tan dần trong dung dịch formic acid và giải phóng các bọt khí H₂ không màu.',
      phenEn: 'Zinc dissolves gradually in formic acid solution, evolving colorless bubbles of H₂ gas.',
      expVi: 'Zn đẩy nguyên tử H của nhóm -COOH trong HCOOH tạo muối zinc formate (HCOO)₂Zn và khí H₂↑.',
      expEn: 'Zinc displaces the acidic carboxyl proton of formic acid to produce zinc formate (HCOO)₂Zn and H₂ gas.'
    },
    {
      reactants: ['HCOOH', 'NaOH'],
      products: [
        { formula: 'HCOONa', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Phản ứng trung hòa tỏa nhiệt nhẹ, tạo dung dịch muối sodium formate không màu (làm mất màu hồng của phenolphtalein trong NaOH).',
      phenEn: 'Mildly exothermic neutralization yielding a clear sodium formate solution (decolorizing pink phenolphthalein in NaOH).',
      expVi: 'Nhóm -COOH của formic acid nhường proton H⁺ cho ion OH⁻ của bazơ mạnh NaOH tạo nước và muối HCOONa.',
      expEn: 'The carboxyl proton of formic acid neutralizes OH⁻ from NaOH to yield water and sodium formate (HCOONa).'
    },
    {
      reactants: ['HCOOH', 'KOH'],
      products: [
        { formula: 'HCOOK', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Phản ứng trung hòa tỏa nhiệt nhẹ tạo dung dịch muối potassium formate trong suốt.',
      phenEn: 'Exothermic acid-base neutralization producing a clear aqueous potassium formate solution.',
      expVi: 'Formic acid trung hòa dung dịch kiềm KOH tạo muối HCOOK và H₂O.',
      expEn: 'Formic acid neutralizes aqueous KOH to form potassium formate (HCOOK) and water.'
    },
    {
      reactants: ['HCOOH', 'Ca(OH)2'],
      products: [
        { formula: '(HCOO)2Ca', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Phản ứng trung hòa tạo dung dịch muối calcium formate trong suốt và nước.',
      phenEn: 'Neutralization produces a clear solution of calcium formate and water.',
      expVi: 'Hai phân tử HCOOH trung hòa một phân tử Ca(OH)₂ tạo muối tan calcium formate (HCOO)₂Ca và 2 phân tử H₂O.',
      expEn: 'Two equivalents of formic acid neutralize calcium hydroxide to yield soluble calcium formate (HCOO)₂Ca and water.'
    },
    {
      reactants: ['HCOOH', 'Na2CO3'],
      products: [
        { formula: 'HCOONa', state: null },
        { formula: 'CO2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Sủi bọt khí CO₂ không màu mạnh ngay khi nhỏ dung dịch HCOOH vào Na₂CO₃.',
      phenEn: 'Vigorous effervescence of colorless CO₂ gas occurs immediately upon mixing HCOOH with Na₂CO₃.',
      expVi: 'Vì tính axit của formic acid mạnh hơn axit cacbonic (H₂CO₃) nên đẩy được khí CO₂ ra khỏi muối cacbonat tạo HCOONa.',
      expEn: 'Because formic acid is stronger than carbonic acid (H₂CO₃), it displaces CO₂ gas from sodium carbonate to form HCOONa.'
    },
    {
      reactants: ['HCOOH', 'CaCO3'],
      products: [
        { formula: '(HCOO)2Ca', state: null },
        { formula: 'CO2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Đá vôi (CaCO₃) tan dần trong dung dịch HCOOH kèm theo sủi bọt khí CO₂ không màu.',
      phenEn: 'Solid limestone (CaCO₃) dissolves in formic acid with brisk bubbling of colorless CO₂ gas.',
      expVi: 'Carboxylic acid HCOOH mạnh hơn H₂CO₃ nên hòa tan được muối cacbonat không tan CaCO₃, tạo muối tan (HCOO)₂Ca, khí CO₂↑ và nước.',
      expEn: 'Formic acid is stronger than carbonic acid, dissolving insoluble CaCO₃ to yield soluble calcium formate, CO₂ gas, and water.'
    },
    {
      reactants: ['HCOOH', 'CuO'],
      products: [
        { formula: '(HCOO)2Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Bột CuO màu đen tan dần khi đun nhẹ trong dung dịch HCOOH tạo dung dịch màu xanh lam của copper(II) formate.',
      phenEn: 'Black CuO powder dissolves upon gentle heating in formic acid to yield a blue solution of copper(II) formate.',
      expVi: 'Formic acid thể hiện đầy đủ tính chất của một axit khi phản ứng với oxit bazơ CuO tạo muối đồng(II) và nước.',
      expEn: 'Formic acid displays typical acid reactivity by dissolving basic oxide CuO to form copper(II) formate and water.'
    },
    {
      reactants: ['HCOOH', '[Ag(NH3)2]OH'],
      products: [
        { formula: '(NH4)2CO3', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Xuất hiện lớp bạc kim loại (Ag) trắng sáng bám lên thành ống nghiệm (phản ứng tráng gương) và có mùi khai NH₃.',
      phenEn: 'A shiny metallic silver mirror forms on the glass wall along with mild ammonia odor.',
      expVi: 'Đặc điểm riêng của formic acid (HO-CH=O): trong phân tử có chứa nhóm cấu trúc tương tự aldehyde (-CHO) nên HCOOH là carboxylic acid đơn chức duy nhất tham gia phản ứng tráng bạc với thuốc thử Tollens.',
      expEn: 'Unique feature of formic acid (HO-CH=O): its structure incorporates an aldehyde-like -CHO moiety, making it the only simple carboxylic acid that gives a positive Tollens’ silver-mirror test.'
    },
    {
      reactants: ['HCOOH', 'AgNO3', 'NH3'],
      extraReactants: ['H2O'],
      products: [
        { formula: '(NH4)2CO3', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH4NO3', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Xuất hiện lớp bạc kim loại (Ag↓) sáng bóng bám lên thành ống nghiệm.',
      phenEn: 'A bright metallic silver mirror (Ag↓) deposits on the glass surface.',
      expVi: 'Do formic acid (HO–CH=O) có chứa nhóm -CHO nên vẫn tham gia phản ứng tráng bạc với AgNO₃ trong dung dịch NH₃ tạo muối (NH₄)₂CO₃ và 2 mol Ag↓.',
      expEn: 'Because formic acid (HO–CH=O) retains a formyl -CHO group, it undergoes the silver-mirror reaction in AgNO₃/NH₃/H₂O to give (NH₄)₂CO₃ and 2 mol Ag↓.'
    },
    {
      reactants: ['HCOOH', 'Ag2O'],
      products: [
        { formula: 'CO2', state: 'gas' },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 'NH₃, t°',
      condEn: 'NH₃, Δ',
      phenVi: 'Có lớp bạc sáng bóng bám lên thành bình và sủi bọt khí (nếu thiếu kiềm NH₃ dư).',
      phenEn: 'Metallic silver mirror forms on the glass wall.',
      expVi: 'Phương trình viết gọn của phản ứng tráng bạc formic acid trong NH₃ tạo 2 mol Ag↓ (CO₂ + H₂O thực tế kết hợp NH₃ dư thành (NH₄)₂CO₃).',
      expEn: 'Compact Ag₂O representation of formic acid silver-mirror oxidation yielding 2 mol Ag↓.'
    },

    // --- Tính acid của CH3COOH (Acetic acid / Ethanoic acid) ---
    {
      reactants: ['CH3COOH', 'Na'],
      products: [
        { formula: 'CH3COONa', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Kim loại Na tan nhanh trong axit axetic, tỏa nhiệt và giải phóng mạnh khí H₂ không màu.',
      phenEn: 'Sodium dissolves rapidly in acetic acid with heat evolution and vigorous H₂ gas bubbles.',
      expVi: 'Nguyên tử H linh động trong nhóm -COOH của acetic acid bị Na đẩy ra tạo muối sodium acetate (CH₃COONa) và khí H₂↑.',
      expEn: 'Sodium displaces the acidic carboxyl proton of acetic acid to produce sodium acetate (CH₃COONa) and hydrogen gas.'
    },
    {
      reactants: ['CH3COOH', 'Mg'],
      products: [
        { formula: '(CH3COO)2Mg', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Magie tan dần trong dung dịch giấm (CH₃COOH), sủi nhiều bọt khí H₂ không màu.',
      phenEn: 'Magnesium ribbon dissolves in acetic acid solution with steady bubbles of colorless H₂ gas.',
      expVi: 'Mg đứng trước H trong dãy hoạt động hóa học nên tác dụng với acetic acid tạo muối magnesium acetate (CH₃COO)₂Mg và khí H₂↑.',
      expEn: 'Magnesium displaces H₂ from acetic acid to yield soluble magnesium acetate (CH₃COO)₂Mg.'
    },
    {
      reactants: ['CH3COOH', 'Zn'],
      products: [
        { formula: '(CH3COO)2Zn', state: null },
        { formula: 'H2', state: 'gas' }
      ],
      type: 'displacement',
      condVi: '',
      condEn: '',
      phenVi: 'Kẽm tan dần trong dung dịch CH₃COOH và thoát bọt khí H₂ không màu.',
      phenEn: 'Zinc dissolves gradually in acetic acid solution, releasing colorless H₂ gas bubbles.',
      expVi: 'Kẽm phản ứng với dung dịch acetic acid tạo muối tan zinc acetate (CH₃COO)₂Zn và khí H₂.',
      expEn: 'Zinc reacts with acetic acid to form aqueous zinc acetate (CH₃COO)₂Zn and H₂ gas.'
    },
    {
      reactants: ['CH3COOH', 'NaOH'],
      products: [
        { formula: 'CH3COONa', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Phản ứng trung hòa tỏa nhiệt nhẹ, tạo dung dịch muối sodium acetate trong suốt (làm mất màu hồng của phenolphtalein trong NaOH).',
      phenEn: 'Mildly exothermic neutralization yielding clear aqueous sodium acetate (decolorizing pink phenolphthalein).',
      expVi: 'Acetic acid trung hòa dung dịch kiềm mạnh NaOH tạo muối hữu cơ sodium acetate (CH₃COONa) và nước.',
      expEn: 'Acetic acid neutralizes strong base NaOH to form soluble sodium acetate (CH₃COONa) and water.'
    },
    {
      reactants: ['CH3COOH', 'KOH'],
      products: [
        { formula: 'CH3COOK', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Phản ứng trung hòa tỏa nhiệt nhẹ tạo dung dịch potassium acetate trong suốt.',
      phenEn: 'Exothermic neutralization yielding a clear aqueous solution of potassium acetate.',
      expVi: 'Proton H⁺ từ nhóm -COOH của acetic acid kết hợp với OH⁻ của KOH tạo H₂O và muối CH₃COOK.',
      expEn: 'Carboxyl protons from acetic acid neutralize OH⁻ from KOH to produce potassium acetate (CH₃COOK) and water.'
    },
    {
      reactants: ['CH3COOH', 'Ca(OH)2'],
      products: [
        { formula: '(CH3COO)2Ca', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Acetic acid trung hòa nước vôi trong tạo dung dịch muối calcium acetate trong suốt.',
      phenEn: 'Acetic acid neutralizes limewater to yield a clear solution of calcium acetate.',
      expVi: 'Hai phân tử CH₃COOH trung hòa một phân tử Ca(OH)₂ tạo muối tan (CH₃COO)₂Ca và 2 phân tử nước.',
      expEn: 'Two equivalents of acetic acid neutralize Ca(OH)₂ to form soluble calcium acetate (CH₃COO)₂Ca and water.'
    },
    {
      reactants: ['CH3COOH', 'Na2CO3'],
      products: [
        { formula: 'CH3COONa', state: null },
        { formula: 'CO2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Sủi bọt khí CO₂ không màu mạnh (làm đục nước vôi trong khi dẫn qua).',
      phenEn: 'Vigorous effervescence of colorless CO₂ gas occurs immediately.',
      expVi: 'Acetic acid mạnh hơn axit cacbonic (H₂CO₃) nên đẩy được CO₂ ra khỏi muối Na₂CO₃ tạo muối CH₃COONa và H₂O.',
      expEn: 'Because acetic acid is stronger than carbonic acid, it displaces CO₂ gas from sodium carbonate to yield CH₃COONa and water.'
    },
    {
      reactants: ['CH3COOH', 'CaCO3'],
      products: [
        { formula: '(CH3COO)2Ca', state: null },
        { formula: 'CO2', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Đá vôi hoặc cặn ấm đun nước (CaCO₃) tan dần trong giấm ăn kèm sủi bọt khí CO₂ không màu.',
      phenEn: 'Limestone or limescale (CaCO₃) dissolves in vinegar with steady effervescence of colorless CO₂ gas.',
      expVi: 'CH₃COOH mạnh hơn H₂CO₃ nên hòa tan được CaCO₃ thành muối tan calcium acetate và giải phóng CO₂↑ — ứng dụng thực tế dùng giấm ăn để tẩy cặn vôi trong ấm siêu tốc.',
      expEn: 'Acetic acid dissolves insoluble CaCO₃ into soluble calcium acetate and CO₂ gas—the real-world chemistry behind descaling kettles with household vinegar.'
    },
    {
      reactants: ['CH3COOH', 'CuO'],
      products: [
        { formula: '(CH3COO)2Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Bột CuO màu đen tan dần khi đun nhẹ với dung dịch CH₃COOH, chuyển thành dung dịch màu xanh lam của copper(II) acetate.',
      phenEn: 'Black CuO powder dissolves upon warming in acetic acid to form a blue-green solution of copper(II) acetate.',
      expVi: 'Acetic acid tác dụng với oxit bazơ CuO tạo muối copper(II) acetate (CH₃COO)₂Cu và nước.',
      expEn: 'Acetic acid reacts with basic oxide CuO to yield copper(II) acetate and water.'
    },

    // --- Phản ứng Ester hóa (Reversible) ---
    {
      reactants: ['CH3COOH', 'C2H5OH'],
      products: [
        { formula: 'CH3COOC2H5', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo lớp chất lỏng không màu nhẹ hơn nước, không tan nổi lên trên và có mùi thơm dễ chịu đặc trưng (mùi sơn móng tay / trái cây chín) của ethyl acetate.',
      phenEn: 'A colorless, pleasant fruity-smelling liquid layer of ethyl acetate floats atop the aqueous mixture.',
      expVi: 'Phản ứng ester hóa thuận nghịch giữa acetic acid và ethanol: nhóm -OH của carboxylic acid kết hợp với H của nhóm -OH alcohol tạo H₂O. H₂SO₄ đặc vừa làm xúc tác vừa hút nước giúp chuyển dịch cân bằng theo chiều thuận.',
      expEn: 'Reversible Fischer esterification between acetic acid and ethanol yielding ethyl acetate and water; concentrated H₂SO₄ serves as both acid catalyst and dehydrating agent to shift equilibrium forward.'
    },
    {
      reactants: ['CH3COOH', 'C2H5OH', 'H2SO4'],
      catalyst: 'H2SO4',
      products: [
        { formula: 'CH3COOC2H5', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo lớp chất lỏng không màu ethyl acetate nổi lên trên, có mùi thơm nhẹ đặc trưng của trái cây chín.',
      phenEn: 'Forms a colorless upper liquid layer of ethyl acetate with a pleasant fruity aroma.',
      expVi: 'H₂SO₄ đặc đóng vai trò chất xúc tác và chất hút nước (được đặt trên mũi tên phản ứng thuận nghịch) thúc đẩy cân bằng tạo ester ethyl acetate.',
      expEn: 'Concentrated H₂SO₄ acts as catalyst and dehydrating agent (placed on the reversible arrow), shifting equilibrium toward fragrant ethyl acetate.'
    },
    {
      reactants: ['CH3COOH', 'CH3OH'],
      products: [
        { formula: 'CH3COOCH3', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Xuất hiện lớp chất lỏng không màu methyl acetate có mùi thơm nhẹ dễ chịu, nổi lên trên dung dịch.',
      phenEn: 'A fragrant colorless liquid layer of methyl acetate separates on top of the mixture.',
      expVi: 'Phản ứng ester hóa thuận nghịch giữa acetic acid và methanol tạo ester methyl acetate (CH₃COOCH₃) và nước dưới xúc tác H₂SO₄ đặc đun nóng.',
      expEn: 'Reversible Fischer esterification of acetic acid with methanol under hot concentrated H₂SO₄ produces methyl acetate (CH₃COOCH₃) and water.'
    },
    {
      reactants: ['CH3COOH', 'CH3OH', 'H2SO4'],
      catalyst: 'H2SO4',
      products: [
        { formula: 'CH3COOCH3', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo chất lỏng không màu methyl acetate nhẹ hơn nước và có mùi thơm nhẹ.',
      phenEn: 'Forms pleasant-smelling colorless liquid methyl acetate floating atop the aqueous layer.',
      expVi: 'H₂SO₄ đặc vừa làm xúc tác vừa hút H₂O (nằm trên mũi tên phản ứng thuận nghịch) tạo ester methyl acetate.',
      expEn: 'Concentrated H₂SO₄ serves as catalyst and dehydrating agent on the arrow for reversible esterification to methyl acetate.'
    },
    {
      reactants: ['HCOOH', 'C2H5OH'],
      products: [
        { formula: 'HCOOC2H5', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo chất lỏng không màu ethyl formate nhẹ hơn nước, có mùi thơm đặc trưng của rượu rum / quả mâm xôi.',
      phenEn: 'A volatile colorless layer of ethyl formate forms with a distinctive rum/raspberry aroma.',
      expVi: 'Phản ứng ester hóa thuận nghịch giữa formic acid và ethanol có H₂SO₄ đặc xúc tác đun nóng tạo ethyl formate (HCOOC₂H₅) và H₂O.',
      expEn: 'Reversible esterification between formic acid and ethanol catalyzed by hot conc. H₂SO₄ yields ethyl formate (HCOOC₂H₅) and water.'
    },
    {
      reactants: ['HCOOH', 'C2H5OH', 'H2SO4'],
      catalyst: 'H2SO4',
      products: [
        { formula: 'HCOOC2H5', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo lớp ester ethyl formate có mùi thơm rượu rum / quả mâm xôi.',
      phenEn: 'Forms a layer of ethyl formate with a rum and raspberry aroma.',
      expVi: 'H₂SO₄ đặc làm chất xúc tác và hút nước (hiển thị trên mũi tên thuận nghịch) tạo ester ethyl formate.',
      expEn: 'Concentrated H₂SO₄ serves as catalyst and dehydrating agent for reversible esterification to ethyl formate.'
    },
    {
      reactants: ['HCOOH', 'CH3OH'],
      products: [
        { formula: 'HCOOCH3', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo chất lỏng không màu dễ bay hơi methyl formate có mùi thơm nhẹ đặc trưng.',
      phenEn: 'Forms volatile, pleasant-smelling colorless liquid methyl formate.',
      expVi: 'Phản ứng ester hóa thuận nghịch tạo ester đơn giản nhất là methyl formate (HCOOCH₃) và nước dưới xúc tác H₂SO₄ đặc, đun nóng.',
      expEn: 'Reversible Fischer esterification yielding the simplest ester, methyl formate (HCOOCH₃), and water under hot conc. H₂SO₄.'
    },
    {
      reactants: ['HCOOH', 'CH3OH', 'H2SO4'],
      catalyst: 'H2SO4',
      products: [
        { formula: 'HCOOCH3', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'esterification',
      reversible: true,
      condVi: 'H₂SO₄ đặc, t°',
      condEn: 'conc. H₂SO₄, Δ',
      phenVi: 'Tạo chất lỏng không màu methyl formate có mùi thơm nhẹ.',
      phenEn: 'Forms pleasant-smelling volatile liquid methyl formate.',
      expVi: 'H₂SO₄ đặc làm xúc tác và hút nước trên mũi tên phản ứng thuận nghịch tạo methyl formate.',
      expEn: 'Concentrated H₂SO₄ catalyzes and dehydrates the reversible esterification to methyl formate.'
    },

    // =========================================================================
    // 4. ESTER, CARBOHYDRATE & AMINE (Lớp 12 — GDPT 2018)
    // =========================================================================

    // --- Xà phòng hóa & Thủy phân Ester ---
    {
      reactants: ['CH3COOC2H5', 'NaOH'],
      products: [
        { formula: 'CH3COONa', state: null },
        { formula: 'C2H5OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun nóng và khuấy đều, lớp ester ethyl acetate không tan phía trên dần tan hết, tạo thành dung dịch đồng nhất không màu.',
      phenEn: 'Upon heating, the immiscible upper layer of ethyl acetate completely disappears to leave a single homogeneous colorless solution.',
      expVi: 'Phản ứng thủy phân ester trong môi trường kiềm (phản ứng xà phòng hóa) xảy ra một chiều (không thuận nghịch), tạo muối sodium acetate (CH₃COONa) và ethanol (C₂H₅OH).',
      expEn: 'Irreversible alkaline hydrolysis (saponification) of ethyl acetate with heated NaOH yields water-soluble sodium acetate and ethanol.'
    },
    {
      reactants: ['CH3COOC2H5', 'KOH'],
      products: [
        { formula: 'CH3COOK', state: null },
        { formula: 'C2H5OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lớp chất lỏng ethyl acetate dần biến mất khi đun nóng với dung dịch KOH, thu được dung dịch trong suốt đồng nhất.',
      phenEn: 'The separate ethyl acetate layer dissolves upon heating with aqueous KOH to yield a uniform clear solution.',
      expVi: 'Phản ứng xà phòng hóa một chiều giữa ethyl acetate và KOH đun nóng tạo muối potassium acetate (CH₃COOK) và ethanol.',
      expEn: 'Irreversible saponification of ethyl acetate in heated KOH forms soluble potassium acetate (CH₃COOK) and ethanol.'
    },
    {
      reactants: ['CH3COOC2H5', 'H2O'],
      products: [
        { formula: 'CH3COOH', state: null },
        { formula: 'C2H5OH', state: null }
      ],
      type: 'hydrolysis',
      reversible: true,
      condVi: 'H⁺, t°',
      condEn: 'H⁺, Δ',
      phenVi: 'Khi đun nóng với dung dịch axit (H₂SO₄ loãng), chất lỏng vẫn tách thành 2 lớp vì phản ứng xảy ra thuận nghịch không hoàn toàn.',
      phenEn: 'Even after heating with dilute acid catalyst, two liquid layers persist because acid-catalyzed hydrolysis is reversible and incomplete.',
      expVi: 'Phản ứng thủy phân ester trong môi trường axit là phản ứng thuận nghịch (ngược với phản ứng ester hóa), tái tạo acetic acid và ethanol.',
      expEn: 'Acid-catalyzed ester hydrolysis is reversible—the exact reverse of Fischer esterification—regenerating acetic acid and ethanol.'
    },
    {
      reactants: ['HCOOCH3', 'NaOH'],
      products: [
        { formula: 'HCOONa', state: null },
        { formula: 'CH3OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Methyl formate bị thủy phân hoàn toàn khi đun nóng với dung dịch NaOH tạo dung dịch đồng nhất không màu.',
      phenEn: 'Methyl formate hydrolyzes completely upon heating with aqueous NaOH into a clear homogeneous solution.',
      expVi: 'Phản ứng xà phòng hóa một chiều của methyl formate trong kiềm NaOH tạo muối sodium formate (HCOONa) và methanol (CH₃OH).',
      expEn: 'Irreversible alkaline hydrolysis of methyl formate with NaOH yields sodium formate (HCOONa) and methanol.'
    },
    {
      reactants: ['HCOOCH3', 'KOH'],
      products: [
        { formula: 'HCOOK', state: null },
        { formula: 'CH3OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Ester methyl formate tan hết khi đun nóng với dung dịch KOH tạo dung dịch đồng nhất.',
      phenEn: 'Methyl formate dissolves completely in heated KOH solution to give a clear homogeneous mixture.',
      expVi: 'Phản ứng xà phòng hóa một chiều tạo muối potassium formate (HCOOK) và methanol (CH₃OH).',
      expEn: 'Irreversible saponification of methyl formate with KOH produces potassium formate (HCOOK) and methanol.'
    },
    {
      reactants: ['HCOOCH3', 'H2O'],
      products: [
        { formula: 'HCOOH', state: null },
        { formula: 'CH3OH', state: null }
      ],
      type: 'hydrolysis',
      reversible: true,
      condVi: 'H⁺, t°',
      condEn: 'H⁺, Δ',
      phenVi: 'Methyl formate bị thủy phân một phần khi đun nóng trong môi trường axit loãng tạo hỗn hợp cân bằng gồm axit, alcohol và ester dư.',
      phenEn: 'Methyl formate undergoes partial hydrolysis in warm dilute acid, establishing an equilibrium mixture.',
      expVi: 'Phản ứng thủy phân thuận nghịch trong môi trường axit chuyển methyl formate thành formic acid (HCOOH) và methanol (CH₃OH).',
      expEn: 'Reversible acid-catalyzed hydrolysis converts methyl formate back into formic acid and methanol.'
    },
    {
      reactants: ['CH3COOCH3', 'NaOH'],
      products: [
        { formula: 'CH3COONa', state: null },
        { formula: 'CH3OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lớp ester methyl acetate tan dần khi đun nóng với NaOH, tạo dung dịch đồng nhất không màu.',
      phenEn: 'Methyl acetate hydrolyzes completely in heated NaOH to produce a single clear colorless solution.',
      expVi: 'Phản ứng xà phòng hóa một chiều của methyl acetate trong kiềm tạo muối sodium acetate (CH₃COONa) và methanol (CH₃OH).',
      expEn: 'Irreversible saponification of methyl acetate with NaOH forms sodium acetate (CH₃COONa) and methanol.'
    },
    {
      reactants: ['CH3COOCH3', 'KOH'],
      products: [
        { formula: 'CH3COOK', state: null },
        { formula: 'CH3OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Methyl acetate bị thủy phân hoàn toàn khi đun nóng với dung dịch KOH tạo dung dịch đồng nhất.',
      phenEn: 'Methyl acetate completely dissolves upon heating with aqueous KOH into a homogeneous solution.',
      expVi: 'Phản ứng xà phòng hóa một chiều tạo muối potassium acetate (CH₃COOK) và methanol (CH₃OH).',
      expEn: 'Irreversible alkaline hydrolysis with KOH yields potassium acetate (CH₃COOK) and methanol.'
    },
    {
      reactants: ['CH3COOCH3', 'H2O'],
      products: [
        { formula: 'CH3COOH', state: null },
        { formula: 'CH3OH', state: null }
      ],
      type: 'hydrolysis',
      reversible: true,
      condVi: 'H⁺, t°',
      condEn: 'H⁺, Δ',
      phenVi: 'Đun nóng methyl acetate với nước có xúc tác axit H⁺ tạo hỗn hợp cân bằng thuận nghịch (còn lớp ester chưa phản ứng hết).',
      phenEn: 'Warming methyl acetate with acid-catalyzed water reaches a reversible equilibrium with residual ester.',
      expVi: 'Thủy phân ester trong môi trường axit xảy ra thuận nghịch tạo acetic acid (CH₃COOH) và methanol (CH₃OH).',
      expEn: 'Reversible acid-catalyzed hydrolysis splits methyl acetate into acetic acid and methanol.'
    },
    {
      reactants: ['HCOOC2H5', 'NaOH'],
      products: [
        { formula: 'HCOONa', state: null },
        { formula: 'C2H5OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lớp ethyl formate tan hoàn toàn khi đun nóng với dung dịch NaOH tạo dung dịch đồng nhất không màu.',
      phenEn: 'The ethyl formate layer dissolves completely in heated NaOH solution to yield a clear homogeneous liquid.',
      expVi: 'Phản ứng xà phòng hóa một chiều tạo muối sodium formate (HCOONa) và ethanol (C₂H₅OH).',
      expEn: 'Irreversible saponification of ethyl formate with NaOH forms sodium formate and ethanol.'
    },
    {
      reactants: ['HCOOC2H5', 'KOH'],
      products: [
        { formula: 'HCOOK', state: null },
        { formula: 'C2H5OH', state: null }
      ],
      type: 'hydrolysis',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Ethyl formate bị xà phòng hóa hoàn toàn bởi dung dịch KOH nóng tạo dung dịch đồng nhất.',
      phenEn: 'Ethyl formate saponifies completely in warm KOH solution to give a clear solution.',
      expVi: 'Phản ứng xà phòng hóa một chiều tạo muối potassium formate (HCOOK) và ethanol (C₂H₅OH).',
      expEn: 'Irreversible saponification with KOH yields potassium formate and ethanol.'
    },
    {
      reactants: ['HCOOC2H5', 'H2O'],
      products: [
        { formula: 'HCOOH', state: null },
        { formula: 'C2H5OH', state: null }
      ],
      type: 'hydrolysis',
      reversible: true,
      condVi: 'H⁺, t°',
      condEn: 'H⁺, Δ',
      phenVi: 'Phản ứng thủy phân trong môi trường axit nóng diễn ra thuận nghịch, tạo hỗn hợp cân bằng chứa ester dư.',
      phenEn: 'Acid-catalyzed hydrolysis proceeds reversibly to an equilibrium mixture containing unreacted ester.',
      expVi: 'Thủy phân thuận nghịch ethyl formate trong môi trường axit tái tạo formic acid và ethanol.',
      expEn: 'Reversible acid hydrolysis converts ethyl formate back into formic acid and ethanol.'
    },

    // --- Carbohydrate (Glucose & Saccharose) ---
    {
      reactants: ['C6H12O6', '[Ag(NH3)2]OH'],
      products: [
        { formula: 'C5H11O5COONH4', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun cách thủy nhẹ dung dịch glucose với thuốc thử Tollens, một lớp bạc kim loại (Ag) sáng bóng tráng đều lên thành ống nghiệm.',
      phenEn: 'Gentle warming of glucose with Tollens’ reagent coats the glass wall with a gleaming metallic silver mirror.',
      expVi: 'Nhờ chứa nhóm chức aldehyde (-CHO ở dạng mạch hở), glucose khử ion Ag⁺ trong phức [Ag(NH₃)₂]OH thành Ag↓ (tỉ lệ 1:2) và bị oxi hóa thành muối ammonium gluconate (CH₂OH[CHOH]₄COONH₄). Phản ứng ứng dụng trong công nghiệp tráng gương và ruột phích.',
      expEn: 'Through its open-chain aldehyde (-CHO) group, glucose reduces [Ag(NH₃)₂]OH to metallic silver (1:2 ratio) while oxidizing to ammonium gluconate—widely used in industrial mirror and thermos silvering.'
    },
    {
      reactants: ['C6H12O6', 'Ag2O'],
      products: [
        { formula: 'C6H12O7', state: null },
        { formula: 'Ag', state: 'precipitate' }
      ],
      type: 'redox',
      condVi: 'NH₃, t°',
      condEn: 'NH₃, Δ',
      phenVi: 'Xuất hiện lớp bạc kim loại (Ag) trắng sáng bám lên thành ống nghiệm.',
      phenEn: 'A bright reflective silver mirror deposits onto the glass wall.',
      expVi: 'Phương trình viết gọn của phản ứng tráng bạc glucose trong dung dịch NH₃: nhóm -CHO bị oxi hóa thành gluconic acid C₆H₁₂O₇ (thực tế trong dung dịch NH₃ tạo muối ammonium gluconate) và tách ra 2 mol Ag↓.',
      expEn: 'Compact Ag₂O representation of glucose’s silver-mirror reaction, oxidizing the aldehyde group to gluconic acid C₆H₁₂O₇ (ammonium gluconate in aqueous NH₃) and depositing 2 mol Ag.'
    },
    {
      reactants: ['C6H12O6', 'H2'],
      products: [{ formula: 'C6H14O6', state: null }],
      type: 'addition',
      condVi: 'Ni, t°',
      condEn: 'Ni, Δ',
      phenVi: 'Glucose bị khử hoàn toàn bởi H₂ có xúc tác Ni đun nóng tạo polyalcohol rắn kết tinh màu trắng có vị ngọt mát là sorbitol (C₆H₁₄O₆).',
      phenEn: 'Catalytic hydrogenation reduces glucose into white sweet crystalline sorbitol (C₆H₁₄O₆).',
      expVi: 'Nhóm -CHO ở dạng mạch hở của glucose cộng H₂ tạo thêm một nhóm -CH₂OH, sinh ra alcohol 6 chức sorbitol (CH₂OH[CHOH]₄CH₂OH).',
      expEn: 'Hydrogen adds across the open-chain C=O group of glucose to produce the hexahydric sugar alcohol sorbitol (C₆H₁₄O₆).'
    },
    {
      reactants: ['C6H12O6', 'Cu(OH)2'],
      products: [
        { formula: '[C6H11O6]2Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: 'nhiệt độ thường',
      condEn: 'room temp.',
      phenVi: 'Ở nhiệt độ thường, kết tủa xanh lam Cu(OH)₂ tan hoàn toàn trong dung dịch glucose tạo dung dịch phức chất màu xanh lam đậm trong suốt.',
      phenEn: 'At room temperature, blue Cu(OH)₂ precipitate dissolves completely in glucose solution to form a clear deep blue complex.',
      expVi: 'Do phân tử glucose có nhiều nhóm -OH liền kề nên hòa tan Cu(OH)₂ ở nhiệt độ thường tạo phức xanh lam đậm [C₆H₁₁O₆]₂Cu. (Lưu ý: nếu đun nóng dung dịch này trong môi trường kiềm NaOH, nhóm -CHO sẽ khử Cu²⁺ tạo kết tủa đỏ gạch Cu₂O↓).',
      expEn: 'Adjacent hydroxyl groups allow glucose to chelate Cu(OH)₂ at room temperature into a deep blue complex [C₆H₁₁O₆]₂Cu. (Note: heating in alkaline medium instead oxidizes the -CHO group and precipitates brick-red Cu₂O↓.)'
    },
    {
      reactants: ['C6H12O6', 'Cu(OH)2', 'NaOH'],
      products: [
        { formula: 'C6H11O7Na', state: null },
        { formula: 'Cu2O', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun nóng trong môi trường kiềm, dung dịch xanh lam chuyển nhanh sang xuất hiện kết tủa màu đỏ gạch đặc trưng của Cu₂O↓.',
      phenEn: 'Upon heating in alkaline solution, the deep blue solution rapidly yields a brick-red precipitate of Cu₂O↓.',
      expVi: 'Khác với phản ứng hòa tan tạo phức xanh lam ở nhiệt độ thường, khi đun nóng trong môi trường kiềm NaOH, nhóm aldehyde -CHO của glucose khử Cu(+2) thành Cu(+1) trong kết tủa đỏ gạch Cu₂O↓ và tạo sodium gluconate (C₆H₁₁O₇Na).',
      expEn: 'In contrast to forming a blue polyalcohol complex at room temperature, hot alkaline Cu(OH)₂ oxidizes glucose’s -CHO group to sodium gluconate (C₆H₁₁O₇Na) and precipitates brick-red Cu₂O↓.'
    },
    {
      reactants: ['C6H12O6', 'AgNO3', 'NH3'],
      extraReactants: ['H2O'],
      products: [
        { formula: 'C6H11O7NH4', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH4NO3', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Lớp bạc kim loại (Ag↓) sáng bóng bám đều lên thành ống nghiệm như gương.',
      phenEn: 'A brilliant reflective silver metal mirror (Ag↓) deposits evenly on the glass wall.',
      expVi: 'Glucose có nhóm chức aldehyde (-CHO ở dạng cân bằng mạch hở) bị AgNO₃ trong dung dịch NH₃/H₂O oxi hóa tạo muối ammonium gluconate (C₆H₁₁O₇NH₄) và giải phóng 2 mol Ag↓.',
      expEn: 'Through its open-chain -CHO group, glucose reduces AgNO₃/NH₃/H₂O to metallic silver (Ag↓) while oxidizing to ammonium gluconate (C₆H₁₁O₇NH₄).'
    },
    {
      reactants: ['C6H12O6', 'Br2', 'H2O'],
      products: [
        { formula: 'C6H12O7', state: null },
        { formula: 'HBr', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch nước bromine màu vàng nâu bị mất màu dần khi nhỏ vào dung dịch glucose.',
      phenEn: 'Orange-brown bromine water gradually loses its color when mixed with aqueous glucose.',
      expVi: 'Nước bromine oxi hóa chọn lọc nhóm -CHO của glucose thành nhóm -COOH tạo gluconic acid (C₆H₁₂O₇) và HBr. Phản ứng này dùng để phân biệt glucose với fructose (fructose không làm mất màu nước bromine).',
      expEn: 'Aqueous bromine selectively oxidizes glucose’s aldehyde group to gluconic acid (C₆H₁₂O₇) and HBr—a key test distinguishing glucose from fructose (which does not decolorize bromine water).'
    },
    {
      reactants: ['C6H12O6', 'Br2'],
      extraReactants: ['H2O'],
      products: [
        { formula: 'C6H12O7', state: null },
        { formula: 'HBr', state: null }
      ],
      type: 'redox',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch nước bromine màu vàng nâu bị mất màu khi tác dụng với dung dịch glucose.',
      phenEn: 'Orange-brown bromine water decolorizes upon reaction with glucose solution.',
      expVi: 'Nước bromine (Br₂ trong H₂O) oxi hóa nhóm aldehyde -CHO của glucose tạo gluconic acid (C₆H₁₂O₇) và 2 HBr — dấu hiệu phân biệt glucose với fructose.',
      expEn: 'Aqueous bromine oxidizes the -CHO group of glucose to gluconic acid (C₆H₁₂O₇) and HBr, distinguishing glucose from fructose.'
    },
    // --- Fructose (đồng phân C₆H₁₂O₆ của Glucose) ---
    {
      reactants: ['Fructose', 'Br2'],
      noReaction: true,
      phenVi: 'Nước bromine giữ nguyên màu vàng nâu, KHÔNG xảy ra phản ứng với fructose.',
      phenEn: 'Orange-brown bromine water retains its color — NO reaction occurs with fructose.',
      expVi: 'Fructose không có nhóm aldehyde (-CHO) và trong nước Brom không có môi trường kiềm để chuyển hóa sang Glucose, nên không làm mất màu nước Brom — đây là dấu hiệu phân biệt Fructose với Glucose.',
      expEn: 'Fructose lacks an aldehyde (-CHO) group, and aqueous bromine has no alkaline medium to isomerize fructose into glucose, so bromine water stays colored — the classic test distinguishing Fructose from Glucose.'
    },
    {
      reactants: ['Fructose', 'Br2', 'H2O'],
      noReaction: true,
      phenVi: 'Nước bromine giữ nguyên màu vàng nâu, KHÔNG xảy ra phản ứng với fructose.',
      phenEn: 'Orange-brown bromine water stays colored — NO reaction occurs with fructose.',
      expVi: 'Fructose không có nhóm aldehyde (-CHO) và trong nước Brom không có môi trường kiềm để chuyển hóa sang Glucose, nên không làm mất màu nước Brom — đây là dấu hiệu phân biệt Fructose với Glucose.',
      expEn: 'Fructose lacks an aldehyde (-CHO) group, and aqueous bromine provides no alkaline medium to convert fructose into glucose — key test distinguishing Fructose from Glucose.'
    },
    {
      reactants: ['Fructose', 'Cu(OH)2'],
      products: [
        { formula: '[C6H11O6]2Cu', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: 'nhiệt độ thường',
      condEn: 'room temp.',
      phenVi: 'Ở nhiệt độ thường, kết tủa xanh lam Cu(OH)₂ tan hoàn toàn trong dung dịch fructose tạo phức đồng(II) màu xanh lam đậm trong suốt.',
      phenEn: 'At room temperature, blue Cu(OH)₂ precipitate dissolves completely in fructose solution to form a clear deep blue complex.',
      expVi: 'Phân tử fructose có nhiều nhóm -OH liền kề (tính chất polyalcohol) nên hòa tan Cu(OH)₂ ở nhiệt độ thường tạo phức chất màu xanh lam đậm [C₆H₁₁O₆]₂Cu.',
      expEn: 'Possessing adjacent hydroxyl groups (polyalcohol property), fructose dissolves Cu(OH)₂ at room temperature to form a deep blue [C₆H₁₁O₆]₂Cu complex.'
    },
    {
      reactants: ['Fructose', 'Cu(OH)2', 'NaOH'],
      products: [
        { formula: 'C6H11O7Na', state: null },
        { formula: 'Cu2O', state: 'precipitate' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Khi đun nóng trong môi trường kiềm, fructose chuyển hóa cân bằng sang glucose và tạo kết tủa đỏ gạch Cu₂O↓.',
      phenEn: 'Upon heating in alkaline solution, fructose isomerizes partly into glucose and precipitates brick-red Cu₂O↓.',
      expVi: 'Tuy fructose không có nhóm -CHO, nhưng trong môi trường kiềm NaOH đun nóng fructose tự chuyển hóa cân bằng sang glucose rồi khử Cu(OH)₂ tạo kết tủa đỏ gạch Cu₂O↓.',
      expEn: 'Although fructose lacks an aldehyde group, base-catalyzed isomerization in hot aqueous NaOH partially converts it into glucose, reducing Cu(OH)₂ to brick-red Cu₂O↓.'
    },
    {
      reactants: ['Fructose', 'AgNO3', 'NH3'],
      extraReactants: ['H2O'],
      products: [
        { formula: 'C6H11O7NH4', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH4NO3', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Xuất hiện lớp bạc kim loại (Ag↓) sáng bóng bám lên thành ống nghiệm (phản ứng tráng bạc).',
      phenEn: 'A bright metallic silver mirror (Ag↓) deposits cleanly onto the glass wall.',
      expVi: 'Fructose không có nhóm -CHO nhưng trong môi trường kiềm NH₃ (có dung môi H₂O), fructose tự chuyển hóa cân bằng một phần thành glucose nên vẫn tham gia phản ứng tráng bạc tạo 2 mol Ag↓.',
      expEn: 'Even without an aldehyde group, fructose undergoes base-catalyzed isomerization partially into glucose in alkaline NH₃/H₂O, giving a positive Tollens silver-mirror reaction (2 mol Ag↓).'
    },
    {
      reactants: ['Fructose', '[Ag(NH3)2]OH'],
      products: [
        { formula: 'C6H11O7NH4', state: null },
        { formula: 'Ag', state: 'precipitate' },
        { formula: 'NH3', state: 'gas' },
        { formula: 'H2O', state: null }
      ],
      type: 'redox',
      condVi: 't°',
      condEn: 'Δ',
      phenVi: 'Đun nóng nhẹ với thuốc thử Tollens tạo lớp bạc sáng bóng bám lên thành ống nghiệm và có mùi khai NH₃.',
      phenEn: 'Gentle warming with Tollens’ reagent yields a reflective silver mirror and ammonia odor.',
      expVi: 'Trong môi trường kiềm của phức [Ag(NH₃)₂]OH, fructose chuyển hóa cân bằng một phần thành glucose nên có phản ứng tráng bạc (không dùng được tráng bạc để phân biệt glucose với fructose).',
      expEn: 'In alkaline Tollens’ medium, fructose partially isomerizes into glucose and gives the exact same silver-mirror test as glucose.'
    },
    {
      reactants: ['Fructose', 'Ag2O'],
      products: [
        { formula: 'C6H12O7', state: null },
        { formula: 'Ag', state: 'precipitate' }
      ],
      type: 'redox',
      condVi: 'NH₃, t°',
      condEn: 'NH₃, Δ',
      phenVi: 'Lớp bạc kim loại (Ag↓) tráng sáng bóng lên thành bình.',
      phenEn: 'A gleaming metallic silver mirror coats the vessel wall.',
      expVi: 'Trong môi trường kiềm NH₃, fructose chuyển hóa một phần sang glucose nên vẫn phản ứng tráng bạc với Ag₂O giải phóng 2 mol Ag↓.',
      expEn: 'Alkaline NH₃ medium promotes partial conversion of fructose into glucose, yielding a silver mirror with Ag₂O.'
    },
    {
      reactants: ['Fructose', 'H2'],
      products: [{ formula: 'C6H14O6', state: null }],
      type: 'addition',
      condVi: 'Ni, t°',
      condEn: 'Ni, Δ',
      phenVi: 'Fructose cộng hợp với H₂ (Ni, t°) tạo hỗn hợp đồng phân polyalcohol C₆H₁₄O₆ (sorbitol và mannitol) vị ngọt mát.',
      phenEn: 'Catalytic hydrogenation of fructose over heated Ni yields sweet crystalline polyalcohols C₆H₁₄O₆ (sorbitol and mannitol).',
      expVi: 'Nhóm ketone (>C=O) ở C2 của fructose dạng mạch hở cộng hợp H₂ chuyển thành alcohol 6 chức C₆H₁₄O₆.',
      expEn: 'Hydrogenation reduces fructose’s open-chain ketone carbonyl into the hexahydric polyalcohols sorbitol and mannitol (C₆H₁₄O₆).'
    },
    {
      reactants: ['C12H22O11', 'H2O'],
      products: [{ formula: 'C6H12O6', state: null }],
      type: 'hydrolysis',
      condVi: 'H⁺, t°',
      condEn: 'H⁺, Δ',
      phenVi: 'Dung dịch saccharose không màu sau khi đun nóng với axit loãng thu được dung dịch trong suốt có khả năng tham gia phản ứng tráng bạc.',
      phenEn: 'After warming with dilute acid catalyst, the colorless sucrose solution yields a clear mixture that now gives a positive silver-mirror test.',
      expVi: 'Phản ứng thủy phân disaccharide saccharose dưới xúc tác axit hoặc enzyme cắt liên kết glycoside tạo 1 phân tử glucose và 1 phân tử fructose. Vì glucose và fructose là đồng phân có chung công thức phân tử C₆H₁₂O₆ nên phương trình viết gọn cân bằng là 2 C₆H₁₂O₆.',
      expEn: 'Acid- or enzyme-catalyzed hydrolysis of sucrose cleaves its glycosidic bond into 1 molecule of glucose and 1 molecule of fructose. Since both monosaccharides share the molecular formula C₆H₁₂O₆, the balanced molecular equation shows 2 C₆H₁₂O₆.'
    },

    // --- Amine (Methylamine & Aniline) ---
    {
      reactants: ['CH3NH2', 'HCl'],
      products: [{ formula: 'CH3NH3Cl', state: null }],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Khi đưa hai khí gặp nhau (hoặc nhỏ HCl vào dung dịch CH₃NH₂), xuất hiện khói trắng mịn của muối methylammonium chloride; mùi khai đặc trưng của amine biến mất.',
      phenEn: 'Dense white fumes of methylammonium chloride appear upon contact and the fishy/ammonia-like odor vanishes.',
      expVi: 'Do nguyên tử N còn cặp electron chưa liên kết và nhóm -CH₃ đẩy electron làm tăng tính bazơ (mạnh hơn NH₃), methylamine dễ dàng nhận proton H⁺ từ HCl tạo muối tan CH₃NH₃Cl.',
      expEn: 'The lone pair on nitrogen (enhanced by the electron-donating methyl group) makes methylamine a stronger base than NH₃, readily accepting H⁺ from HCl to yield methylammonium chloride (CH₃NH₃Cl).'
    },
    {
      reactants: ['C6H5NH2', 'HCl'],
      products: [{ formula: 'C6H5NH3Cl', state: null }],
      type: 'neutralization',
      condVi: '',
      condEn: '',
      phenVi: 'Aniline ít tan tạo hỗn hợp vẩn đục trong nước nhanh chóng tan hoàn toàn khi nhỏ dung dịch HCl vào, thu được dung dịch muối phenylammonium chloride trong suốt.',
      phenEn: 'Cloudy, sparingly soluble aniline droplets in water dissolve completely upon adding HCl, yielding a clear phenylammonium chloride solution.',
      expVi: 'Dù có tính bazơ rất yếu (không làm đổi màu quỳ tím do vòng benzene hút electron), aniline vẫn tác dụng được với axit mạnh HCl tạo muối tan C₆H₅NH₃Cl — ứng dụng để rửa sạch ống nghiệm dính aniline.',
      expEn: 'Although resonance delocalization into the benzene ring makes aniline a very weak base (too weak to turn litmus blue), it reacts readily with strong acid HCl to form water-soluble phenylammonium chloride (C₆H₅NH₃Cl).'
    },
    {
      reactants: ['C6H5NH3Cl', 'NaOH'],
      products: [
        { formula: 'C6H5NH2', state: null },
        { formula: 'NaCl', state: null },
        { formula: 'H2O', state: null }
      ],
      type: 'exchange',
      condVi: '',
      condEn: '',
      phenVi: 'Dung dịch muối C₆H₅NH₃Cl trong suốt bị vẩn đục trở lại do các giọt dầu aniline không tan tách ra.',
      phenEn: 'The clear phenylammonium chloride solution turns cloudy as insoluble oily aniline droplets separate out.',
      expVi: 'Dung dịch kiềm mạnh NaOH đẩy bazơ yếu hơn là aniline (C₆H₅NH₂) ra khỏi muối ammonium của nó.',
      expEn: 'Strong base NaOH deprotonates the anilinium salt, regenerating free weak base aniline (C₆H₅NH₂) alongside NaCl and water.'
    },
    {
      reactants: ['C6H5NH2', 'Br2'],
      products: [
        { formula: 'C6H2Br3NH2', state: 'precipitate' },
        { formula: 'HBr', state: null }
      ],
      type: 'substitution',
      condVi: '',
      condEn: '',
      phenVi: 'Nước brom màu vàng nâu mất màu ngay lập tức và xuất hiện kết tủa màu trắng của 2,4,6-tribromoaniline.',
      phenEn: 'Bromine water rapidly decolorizes and immediately forms a white precipitate of 2,4,6-tribromoaniline.',
      expVi: 'Nhóm -NH₂ đẩy electron rất mạnh vào vòng benzene, hoạt hóa mạnh các vị trí ortho và para giúp aniline thế ngay cả 3 nguyên tử H bằng Br ở nhiệt độ thường không cần xúc tác. Đây là phản ứng nhận biết aniline đặc trưng.',
      expEn: 'The strongly activating -NH₂ group enriches the ortho and para ring positions so strongly that aniline undergoes instant trisubstitution with aqueous Br₂ at room temperature to precipitate white 2,4,6-tribromoaniline.'
    }
  ];

  window.ORGANIC_REACTION_DATA = {
    whitelist: ORGANIC_WHITELIST,
    substances: ORGANIC_SUBSTANCES,
    nameAliases: ORGANIC_NAME_ALIASES,
    reactions: ORGANIC_REACTIONS,
    presets: ORGANIC_PRESETS
  };
})();
