// Interactive Periodic Table — Tab 4: Electrochemistry Lab (electrochem-lab.js)
// Covers Grade 12 (GDPT 2018) Galvanic Cells (Pin điện hóa) & Electrolytic Cells (Điện phân)
// Pure-SVG dark-matte interactive schematics, standard redox couples, LCM electron balancing,
// KNO3 salt bridge ion migration, polarity reversal comparison, and Faraday's Law calculator.

(function () {
  const FARADAY_CONSTANT = 96485; // C/mol
  const MOLAR_VOLUME_STP_2018 = 24.79; // L/mol at 25°C, 1 bar (đkc GDPT 2018)

  // 9 Standard Redox Couples (E° at 298 K, 1M, 1 bar)
  const REDOX_COUPLES = [
    {
      id: 'Mg2+/Mg',
      label: 'Mg²⁺/Mg',
      e0: -2.37,
      n: 2,
      oxLabel: 'Mg²⁺',
      redLabel: 'Mg',
      oxSpecies: 'Mg²⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Mg(s)',
      redCoeff: 1,
      electrolyte: 'Mg(NO₃)₂ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(148, 163, 184, 0.13)',
      solutionStroke: 'rgba(148, 163, 184, 0.28)',
      electrodeFill: '#cbd5e1',
      electrodeStroke: '#94a3b8',
      nameVi: 'Magnesium (Mg²⁺/Mg)',
      nameEn: 'Magnesium (Mg²⁺/Mg)'
    },
    {
      id: 'Al3+/Al',
      label: 'Al³⁺/Al',
      e0: -1.66,
      n: 3,
      oxLabel: 'Al³⁺',
      redLabel: 'Al',
      oxSpecies: 'Al³⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Al(s)',
      redCoeff: 1,
      electrolyte: 'Al(NO₃)₃ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(148, 163, 184, 0.13)',
      solutionStroke: 'rgba(148, 163, 184, 0.28)',
      electrodeFill: '#d8e0ea',
      electrodeStroke: '#94a3b8',
      nameVi: 'Aluminium (Al³⁺/Al)',
      nameEn: 'Aluminium (Al³⁺/Al)'
    },
    {
      id: 'Zn2+/Zn',
      label: 'Zn²⁺/Zn',
      e0: -0.76,
      n: 2,
      oxLabel: 'Zn²⁺',
      redLabel: 'Zn',
      oxSpecies: 'Zn²⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Zn(s)',
      redCoeff: 1,
      electrolyte: 'ZnSO₄ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(148, 163, 184, 0.14)',
      solutionStroke: 'rgba(148, 163, 184, 0.30)',
      electrodeFill: '#9aa7b8',
      electrodeStroke: '#cbd5e1',
      nameVi: 'Zinc (Zn²⁺/Zn)',
      nameEn: 'Zinc (Zn²⁺/Zn)'
    },
    {
      id: 'Fe2+/Fe',
      label: 'Fe²⁺/Fe',
      e0: -0.44,
      n: 2,
      oxLabel: 'Fe²⁺',
      redLabel: 'Fe',
      oxSpecies: 'Fe²⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Fe(s)',
      redCoeff: 1,
      electrolyte: 'FeSO₄ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(110, 178, 134, 0.23)',
      solutionStroke: 'rgba(110, 178, 134, 0.46)',
      electrodeFill: '#8590a0',
      electrodeStroke: '#b2bcc9',
      nameVi: 'Iron(II) (Fe²⁺/Fe)',
      nameEn: 'Iron(II) (Fe²⁺/Fe)'
    },
    {
      id: 'Ni2+/Ni',
      label: 'Ni²⁺/Ni',
      e0: -0.26,
      n: 2,
      oxLabel: 'Ni²⁺',
      redLabel: 'Ni',
      oxSpecies: 'Ni²⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Ni(s)',
      redCoeff: 1,
      electrolyte: 'NiSO₄ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(64, 176, 148, 0.25)',
      solutionStroke: 'rgba(64, 176, 148, 0.48)',
      electrodeFill: '#b5beca',
      electrodeStroke: '#d5dce6',
      nameVi: 'Nickel (Ni²⁺/Ni)',
      nameEn: 'Nickel (Ni²⁺/Ni)'
    },
    {
      id: 'Pb2+/Pb',
      label: 'Pb²⁺/Pb',
      e0: -0.13,
      n: 2,
      oxLabel: 'Pb²⁺',
      redLabel: 'Pb',
      oxSpecies: 'Pb²⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Pb(s)',
      redCoeff: 1,
      electrolyte: 'Pb(NO₃)₂ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(148, 163, 184, 0.14)',
      solutionStroke: 'rgba(148, 163, 184, 0.28)',
      electrodeFill: '#6b7787',
      electrodeStroke: '#94a3b8',
      nameVi: 'Lead (Pb²⁺/Pb)',
      nameEn: 'Lead (Pb²⁺/Pb)'
    },
    {
      id: '2H+/H2',
      label: '2H⁺/H₂ (Pt)',
      e0: 0.0,
      n: 2,
      oxLabel: 'H⁺',
      redLabel: 'H₂',
      oxSpecies: 'H⁺(aq)',
      oxCoeff: 2,
      redSpecies: 'H₂(g)',
      redCoeff: 1,
      electrolyte: 'H⁺ 1M (H₂ 1 bar)',
      isSHE: true,
      isGas: true,
      solutionFill: 'rgba(148, 163, 184, 0.16)',
      solutionStroke: 'rgba(148, 163, 184, 0.34)',
      electrodeFill: '#d6deeb',
      electrodeStroke: '#94a3b8',
      nameVi: 'Điện cực chuẩn Hydrogen (2H⁺/H₂, Pt)',
      nameEn: 'Standard Hydrogen Electrode (2H⁺/H₂, Pt)'
    },
    {
      id: 'Cu2+/Cu',
      label: 'Cu²⁺/Cu',
      e0: 0.34,
      n: 2,
      oxLabel: 'Cu²⁺',
      redLabel: 'Cu',
      oxSpecies: 'Cu²⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Cu(s)',
      redCoeff: 1,
      electrolyte: 'CuSO₄ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(56, 146, 214, 0.31)',
      solutionStroke: 'rgba(78, 165, 228, 0.54)',
      electrodeFill: '#c77b52',
      electrodeStroke: '#e29e78',
      nameVi: 'Copper(II) (Cu²⁺/Cu)',
      nameEn: 'Copper(II) (Cu²⁺/Cu)'
    },
    {
      id: 'Ag+/Ag',
      label: 'Ag⁺/Ag',
      e0: 0.8,
      n: 1,
      oxLabel: 'Ag⁺',
      redLabel: 'Ag',
      oxSpecies: 'Ag⁺(aq)',
      oxCoeff: 1,
      redSpecies: 'Ag(s)',
      redCoeff: 1,
      electrolyte: 'AgNO₃ 1M',
      isSHE: false,
      isGas: false,
      solutionFill: 'rgba(148, 163, 184, 0.14)',
      solutionStroke: 'rgba(148, 163, 184, 0.30)',
      electrodeFill: '#e8eef5',
      electrodeStroke: '#ffffff',
      nameVi: 'Silver (Ag⁺/Ag)',
      nameEn: 'Silver (Ag⁺/Ag)'
    }
  ];

  const GALVANIC_PRESETS = [
    { left: 'Zn2+/Zn', right: 'Cu2+/Cu', tagVi: 'Pin Daniell (Zn–Cu)', tagEn: 'Daniell Cell (Zn–Cu)' },
    { left: 'Fe2+/Fe', right: 'Cu2+/Cu', tagVi: 'Fe – Cu (0.78 V)', tagEn: 'Fe – Cu (0.78 V)' },
    { left: 'Cu2+/Cu', right: 'Ag+/Ag', tagVi: 'Cu – Ag (0.46 V)', tagEn: 'Cu – Ag (0.46 V)' },
    { left: 'Zn2+/Zn', right: '2H+/H2', tagVi: 'Zn – SHE (0.76 V)', tagEn: 'Zn – SHE (0.76 V)' },
    { left: 'Al3+/Al', right: 'Cu2+/Cu', tagVi: 'Al – Cu (3e/2e • 2.00 V)', tagEn: 'Al – Cu (3e/2e • 2.00 V)' },
    { left: 'Mg2+/Mg', right: 'Ag+/Ag', tagVi: 'Mg – Ag (3.17 V)', tagEn: 'Mg – Ag (3.17 V)' }
  ];

  // 4 Classic Grade 12 Electrolysis Systems (Inert Graphite Electrodes)
  const ELECTROLYSIS_SYSTEMS = [
    {
      id: 'cuso4',
      formula: 'CuSO₄ (dd)',
      titleVi: 'Điện phân dung dịch CuSO₄ (điện cực trơ Graphite)',
      titleEn: 'Aqueous CuSO₄ Electrolysis (Inert Graphite Electrodes)',
      badgeVi: 'Điện phân dung dịch • Tạo kim loại & axit',
      badgeEn: 'Aqueous Electrolysis • Metal & Acid Formation',
      solutionFill: 'rgba(56, 146, 214, 0.28)',
      solutionStroke: 'rgba(78, 165, 228, 0.52)',
      hasDiaphragm: false,
      isMolten: false,
      cathodeHalf: 'Cu²⁺(aq) + 2e⁻ → Cu(s)↓',
      anodeHalf: '2H₂O(l) → O₂(g)↑ + 4H⁺(aq) + 4e⁻',
      overallEq: '2CuSO₄(aq) + 2H₂O(l) →(đpdd) 2Cu(s)↓ + O₂(g)↑ + 2H₂SO₄(aq)',
      overallEqEn: '2CuSO₄(aq) + 2H₂O(l) →(electrolysis) 2Cu(s)↓ + O₂(g)↑ + 2H₂SO₄(aq)',
      cationsInBath: ['Cu²⁺', 'H⁺'],
      anionsInBath: ['SO₄²⁻', 'H₂O'],
      cathodeVisualType: 'plate-cu',
      cathodeProductTagVi: 'Bám Cu đỏ',
      cathodeProductTagEn: 'Red Cu deposit',
      anodeVisualType: 'gas-o2',
      anodeProductTagVi: 'Khí O₂↑ + H⁺',
      anodeProductTagEn: 'O₂↑ gas + H⁺',
      phenomenonVi:
        'Cathode (−) có lớp kim loại đồng màu đỏ bám vào; Anode (+) sủi bọt khí O₂ không màu. Màu xanh lam của dung dịch CuSO₄ nhạt dần và pH dung dịch giảm rõ rệt do tạo H₂SO₄.',
      phenomenonEn:
        'Red metallic copper plates onto the Cathode (−); colorless O₂ gas bubbles evolve at the Anode (+). The blue CuSO₄ solution gradually fades and solution pH drops as H₂SO₄ forms.',
      ruleNoteVi:
        'Quy tắc: Cation Cu²⁺ đứng sau Al³⁺ nên bị khử trực tiếp tại Cathode (−). Anion SO₄²⁻ là gốc acid có oxi không bị oxi hóa trong dung dịch nên phân tử H₂O bị oxi hóa tại Anode (+).',
      ruleNoteEn:
        'Rule: Cu²⁺ is reduced directly at the Cathode (−). Oxygen-bearing sulfate (SO₄²⁻) resists oxidation in aqueous solution, so H₂O is oxidized at the Anode (+) to release O₂ and H⁺.',
      faraday: {
        cathodeKind: 'mass',
        cathodeSpecies: 'Cu',
        cathodeM: 64,
        cathodeZ: 2,
        anodeKind: 'gas',
        anodeSpecies: 'O₂↑',
        anodeZ: 4
      }
    },
    {
      id: 'nacl',
      formula: 'NaCl (dd, màng ngăn)',
      titleVi: 'Điện phân dung dịch NaCl có màng ngăn (Công nghiệp Chlor-alkali)',
      titleEn: 'Aqueous NaCl Electrolysis with Diaphragm (Chlor-Alkali Process)',
      badgeVi: 'Có màng ngăn xốp • Sản xuất NaOH, H₂, Cl₂',
      badgeEn: 'Porous Diaphragm • Produces NaOH, H₂, Cl₂',
      solutionFill: 'rgba(148, 163, 184, 0.15)',
      solutionStroke: 'rgba(148, 163, 184, 0.34)',
      cathodeZoneTint: 'rgba(224, 114, 164, 0.22)', // phenolphthalein pink tint near cathode
      hasDiaphragm: true,
      isMolten: false,
      cathodeHalf: '2H₂O(l) + 2e⁻ → H₂(g)↑ + 2OH⁻(aq)',
      anodeHalf: '2Cl⁻(aq) → Cl₂(g)↑ + 2e⁻',
      overallEq: '2NaCl(aq) + 2H₂O(l) →(đpdd, màng ngăn) 2NaOH(aq) + H₂(g)↑ + Cl₂(g)↑',
      overallEqEn: '2NaCl(aq) + 2H₂O(l) →(diaphragm) 2NaOH(aq) + H₂(g)↑ + Cl₂(g)↑',
      cationsInBath: ['Na⁺', 'H₂O'],
      anionsInBath: ['Cl⁻', 'OH⁻'],
      cathodeVisualType: 'gas-h2',
      cathodeProductTagVi: 'H₂↑ + OH⁻ (hóa hồng PP)',
      cathodeProductTagEn: 'H₂↑ + OH⁻ (pink PP)',
      anodeVisualType: 'gas-cl2',
      anodeProductTagVi: 'Khí Cl₂↑ vàng lục',
      anodeProductTagEn: 'Yellow-green Cl₂↑',
      phenomenonVi:
        'Cathode (−) sủi bọt khí H₂ không màu và vùng dung dịch quanh Cathode làm hồng phenolphthalein (do sinh OH⁻). Anode (+) thoát khí Cl₂ màu vàng lục mùi hắc.',
      phenomenonEn:
        'Colorless H₂ gas bubbles at the Cathode (−) while the catholyte turns phenolphthalein pink (OH⁻ formed). Pungent yellow-green Cl₂ gas evolves at the Anode (+).',
      ruleNoteVi:
        'Vai trò màng ngăn: Ngăn khí Cl₂ ở Anode tác dụng với NaOH ở Cathode. Nếu KHÔNG có màng ngăn, phản ứng phụ Cl₂ + 2NaOH → NaCl + NaClO + H₂O sẽ tạo nước Javel.',
      ruleNoteEn:
        'Diaphragm role: Prevents Cl₂ formed at the Anode from reacting with NaOH from the Cathode. Without the diaphragm, Cl₂ + 2NaOH → NaCl + NaClO + H₂O produces Javelle bleach.',
      faraday: {
        cathodeKind: 'gas-alkali',
        cathodeSpecies: 'H₂↑',
        cathodeZ: 2,
        extraSpecies: 'NaOH',
        extraM: 40,
        extraZ: 1,
        anodeKind: 'gas',
        anodeSpecies: 'Cl₂↑',
        anodeZ: 2
      }
    },
    {
      id: 'cucl2',
      formula: 'CuCl₂ (dd)',
      titleVi: 'Điện phân dung dịch CuCl₂ (điện cực trơ Graphite)',
      titleEn: 'Aqueous CuCl₂ Electrolysis (Inert Graphite Electrodes)',
      badgeVi: 'Điện phân bản chất chất tan • Cu↓ & Cl₂↑',
      badgeEn: 'Solute Electrolysis • Cu↓ & Cl₂↑',
      solutionFill: 'rgba(58, 158, 184, 0.27)',
      solutionStroke: 'rgba(78, 178, 204, 0.50)',
      hasDiaphragm: false,
      isMolten: false,
      cathodeHalf: 'Cu²⁺(aq) + 2e⁻ → Cu(s)↓',
      anodeHalf: '2Cl⁻(aq) → Cl₂(g)↑ + 2e⁻',
      overallEq: 'CuCl₂(aq) →(đpdd) Cu(s)↓ + Cl₂(g)↑',
      overallEqEn: 'CuCl₂(aq) →(electrolysis) Cu(s)↓ + Cl₂(g)↑',
      cationsInBath: ['Cu²⁺'],
      anionsInBath: ['Cl⁻'],
      cathodeVisualType: 'plate-cu',
      cathodeProductTagVi: 'Bám Cu đỏ',
      cathodeProductTagEn: 'Red Cu deposit',
      anodeVisualType: 'gas-cl2',
      anodeProductTagVi: 'Khí Cl₂↑ vàng lục',
      anodeProductTagEn: 'Yellow-green Cl₂↑',
      phenomenonVi:
        'Cathode (−) xuất hiện lớp đồng kim loại màu đỏ gạch bám dày dần; Anode (+) sủi bọt khí Cl₂ màu vàng lục. Nồng độ CuCl₂ giảm làm màu xanh dung dịch nhạt dần.',
      phenomenonEn:
        'Brick-red metallic copper coats the Cathode (−) while yellow-green Cl₂ bubbles rise from the Anode (+). The blue-teal CuCl₂ solution fades as solute concentration drops.',
      ruleNoteVi:
        'Quy tắc: Cả cation Cu²⁺ và anion Cl⁻ đều dễ bị khử / oxi hóa hơn H₂O, nên chính các ion của chất tan CuCl₂ trực tiếp điện phân ở hai cực.',
      ruleNoteEn:
        'Rule: Both Cu²⁺ and Cl⁻ discharge more readily than water, so the dissolved CuCl₂ ions themselves undergo reduction and oxidation at the two electrodes.',
      faraday: {
        cathodeKind: 'mass',
        cathodeSpecies: 'Cu',
        cathodeM: 64,
        cathodeZ: 2,
        anodeKind: 'gas',
        anodeSpecies: 'Cl₂↑',
        anodeZ: 2
      }
    },
    {
      id: 'al2o3',
      formula: 'Al₂O₃ nóng chảy (Cryolite)',
      titleVi: 'Điện phân Al₂O₃ nóng chảy có xúc tác Cryolite (Luyện nhôm)',
      titleEn: 'Molten Al₂O₃ Electrolysis in Cryolite (Hall–Héroult Process)',
      badgeVi: 'Điện phân nóng chảy ~950°C • Sản xuất Nhôm',
      badgeEn: 'Molten Salt ~950°C • Aluminium Smelting',
      solutionFill: 'rgba(218, 128, 56, 0.25)',
      solutionStroke: 'rgba(228, 152, 82, 0.52)',
      hasDiaphragm: false,
      isMolten: true,
      cathodeHalf: 'Al³⁺(nc) + 3e⁻ → Al(l)',
      anodeHalf: '2O²⁻(nc) → O₂(g)↑ + 4e⁻',
      overallEq: '2Al₂O₃(nc) →(đpnc, Na₃AlF₆, 950°C) 4Al(l) + 3O₂(g)↑',
      overallEqEn: '2Al₂O₃(molten) →(Na₃AlF₆, 950°C) 4Al(l) + 3O₂(g)↑',
      cationsInBath: ['Al³⁺', 'Na⁺'],
      anionsInBath: ['O²⁻', 'AlF₆³⁻'],
      cathodeVisualType: 'molten-al',
      cathodeProductTagVi: 'Thu Al lỏng',
      cathodeProductTagEn: 'Molten Al pool',
      anodeVisualType: 'gas-o2-burn',
      anodeProductTagVi: 'O₂↑ (đốt cháy C anode)',
      anodeProductTagEn: 'O₂↑ (burns C anode)',
      phenomenonVi:
        'Tại Cathode (−), nhôm kim loại nóng chảy (Al lỏng) được tạo thành. Tại Anode (+), khí O₂ sinh ra ở ~950°C đốt cháy dần điện cực than chì (C) tạo hỗn hợp khí CO và CO₂.',
      phenomenonEn:
        'Molten metallic aluminium collects at the Cathode (−). At the Anode (+), evolved O₂ gas at ~950°C reacts with the graphite (C) electrodes to form CO and CO₂, requiring periodic anode replacement.',
      ruleNoteVi:
        'Vai trò Cryolite (Na₃AlF₆): Hạ nhiệt độ nóng chảy của Al₂O₃ từ ~2050°C xuống ~950°C, tăng độ dẫn điện và tạo lớp màng ngăn Al lỏng bị oxi hóa bởi không khí.',
      ruleNoteEn:
        'Role of Cryolite (Na₃AlF₆): Lowers the melting point of Al₂O₃ from ~2050°C to ~950°C, increases ionic conductivity, and forms a protective crust over the molten aluminium.',
      faraday: {
        cathodeKind: 'mass',
        cathodeSpecies: 'Al',
        cathodeM: 27,
        cathodeZ: 3,
        anodeKind: 'gas',
        anodeSpecies: 'O₂↑',
        anodeZ: 4
      }
    }
  ];

  const ELECTRO_I18N = {
    vi: {
      title: 'Phòng Lab Pin Điện Hóa & Điện Phân',
      subtitle: 'Mô phỏng Pin Galvanic (Hóa 12 GDPT 2018), đảo dấu điện cực trong Điện phân và tính định lượng Faraday',
      footerHint:
        'Gợi ý: Trong cả Pin điện hóa lẫn Bình điện phân, Anode luôn xảy ra Oxi hóa và Cathode luôn xảy ra Khử — chỉ có dấu (+/−) đảo ngược.',
      modeGalvanic: '⚡ Chế độ A: Pin điện hóa (Galvanic)',
      modeElectrolysis: '🔋 Chế độ B: Bình điện phân (Electrolysis)',
      modeGalvanicBadge: 'Tự phát (ΔG < 0) • Hóa năng → Điện năng',
      modeElectrolysisBadge: 'Cưỡng bức (Nguồn DC) • Điện năng → Hóa năng',
      presetsLabel: 'Cặp pin mẫu:',
      leftBeakerLabel: 'Cốc bên trái (Nửa pin 1)',
      rightBeakerLabel: 'Cốc bên phải (Nửa pin 2)',
      swapBeakersBtn: '⇄ Đảo vị trí 2 cốc',
      swapBeakersTitle: 'Đảo vị trí 2 cốc để chứng minh chiều dòng electron phụ thuộc bản chất điện cực (E°), không cố định trái → phải',
      voltmeterTitle: 'VÔN KẾ SỐ (298 K, 1M)',
      noCurrentBanner:
        'Hai nửa pin giống hệt nhau (ΔE° = 0.00 V) — không có sự chênh lệch thế điện cực chuẩn nên không phát sinh dòng electron.',
      anodeBadge: 'ANODE (−) • OXI HÓA',
      cathodeBadge: 'CATHODE (+) • KHỬ',
      elAnodeBadge: 'ANODE (+) • OXI HÓA',
      elCathodeBadge: 'CATHODE (−) • KHỬ',
      moltenAlPoolLabel: 'Al(l) nóng chảy',
      equalBadge: 'CÂN BẰNG (E° BẰNG NHAU)',
      saltBridgeTitle: 'Cầu muối KNO₃',
      saltBridgeRule: (anodeSideText, cathodeSideText) =>
        `NO₃⁻ → ${anodeSideText} (Anode −) • K⁺ → ${cathodeSideText} (Cathode +). Dùng KNO₃ thay vì KCl để không tạo kết tủa AgCl↓ với Ag⁺.`,
      sideLeft: 'Cốc trái',
      sideRight: 'Cốc phải',
      cellDiagramEyebrow: 'KÝ HIỆU PIN CHUẨN (IUPAC / GDPT 2018)',
      emfFormulaEyebrow: 'SỨC ĐIỆN ĐỘNG CHUẨN CỦA PIN',
      emfIntensiveNote:
        'Lưu ý: E°pin = E°cathode − E°anode là đại lượng cường độ, KHÔNG nhân theo hệ số cân bằng electron.',
      halfAnodeEyebrow: 'Bán phản ứng tại Anode (−) [Oxi hóa]',
      halfCathodeEyebrow: 'Bán phản ứng tại Cathode (+) [Khử]',
      overallEqEyebrow: 'Phương trình ion thu gọn của pin',
      eFlowLeftToRight: 'Dòng e⁻ mạch ngoài: Cốc trái (Anode −) ➔ Cốc phải (Cathode +)',
      eFlowRightToLeft: 'Dòng e⁻ mạch ngoài: Cốc phải (Anode −) ➔ Cốc trái (Cathode +)',
      eFlowNone: 'Không có dòng electron (E°pin = 0.00 V)',
      electroSystemLabel: 'Hệ điện phân SGK 12:',
      polarityCompareTitle: 'ĐẢO DẤU ĐIỆN CỰC SO VỚI PIN ĐIỆN HÓA',
      polarityAnodeBox: 'ANODE (+) • Cực dương nguồn DC hút e⁻ ➔ Quá trình OXI HÓA',
      polarityCathodeBox: 'CATHODE (−) • Cực âm nguồn DC bơm e⁻ ➔ Quá trình KHỬ',
      elHalfCathodeEyebrow: 'Quá trình khử tại Cathode (−)',
      elHalfAnodeEyebrow: 'Quá trình oxi hóa tại Anode (+)',
      elOverallEyebrow: 'Phương trình điện phân tổng quát',
      phenomenonEyebrow: 'Hiện tượng thực nghiệm',
      mechanismEyebrow: 'Bản chất & Chú ý SGK 12',
      faradayTitle: 'BỘ TÍNH NHANH ĐỊNH LUẬT FARADAY (ĐKC 25°C, 1 BAR — 24.79 L/MOL)',
      faradayFormulaHint: 'Q = I·t  |  nₑ = I·t / F (F = 96485 C/mol)  |  m = M·nₑ / z  |  V(đkc) = 24.79 · nₑ / z',
      sliderCurrentLabel: 'Cường độ dòng điện (I)',
      sliderTimeLabel: 'Thời gian điện phân (t)',
      minutesUnit: 'phút',
      chargeLabel: 'Điện lượng Q = I·t',
      molElectronLabel: 'Số mol electron trao đổi (nₑ)',
      cathodeYieldLabel: 'Sản phẩm tại Cathode (−)',
      anodeYieldLabel: 'Sản phẩm khí tại Anode (+)',
      dcSourceTitle: 'NGUỒN ĐIỆN DC',
      graphiteElectrode: 'Điện cực Graphite (C)',
      diaphragmLabel: 'Màng ngăn xốp',
      moltenBathLabel: 'Al₂O₃ + Na₃AlF₆ nóng chảy (~950°C)'
    },
    en: {
      title: 'Electrochemistry Lab — Galvanic & Electrolytic Cells',
      subtitle: 'Simulate Grade 12 Galvanic cells, electrode polarity reversal in Electrolysis, and Faraday’s Law stoichiometry',
      footerHint:
        'Tip: In both Galvanic and Electrolytic cells, Oxidation always occurs at the Anode and Reduction at the Cathode — only the (+/−) signs reverse.',
      modeGalvanic: '⚡ Mode A: Galvanic Cell (Voltaic)',
      modeElectrolysis: '🔋 Mode B: Electrolytic Cell',
      modeGalvanicBadge: 'Spontaneous (ΔG < 0) • Chemical → Electrical',
      modeElectrolysisBadge: 'Driven by DC Source • Electrical → Chemical',
      presetsLabel: 'Preset cells:',
      leftBeakerLabel: 'Left Beaker (Half-cell 1)',
      rightBeakerLabel: 'Right Beaker (Half-cell 2)',
      swapBeakersBtn: '⇄ Swap Beakers',
      swapBeakersTitle: 'Swap left and right beakers to prove electron flow depends on electrode potential (E°), not a fixed left-to-right direction',
      voltmeterTitle: 'DIGITAL VOLTMETER (298 K, 1M)',
      noCurrentBanner:
        'Both half-cells are identical (ΔE° = 0.00 V) — without a potential difference, no electron flow is generated.',
      anodeBadge: 'ANODE (−) • OXIDATION',
      cathodeBadge: 'CATHODE (+) • REDUCTION',
      elAnodeBadge: 'ANODE (+) • OXIDATION',
      elCathodeBadge: 'CATHODE (−) • REDUCTION',
      moltenAlPoolLabel: 'Molten Al(l)',
      equalBadge: 'EQUILIBRIUM (EQUAL E°)',
      saltBridgeTitle: 'KNO₃ Salt Bridge',
      saltBridgeRule: (anodeSideText, cathodeSideText) =>
        `NO₃⁻ → ${anodeSideText} (Anode −) • K⁺ → ${cathodeSideText} (Cathode +). KNO₃ is used instead of KCl to avoid AgCl↓ precipitation with Ag⁺.`,
      sideLeft: 'Left Beaker',
      sideRight: 'Right Beaker',
      cellDiagramEyebrow: 'STANDARD CELL NOTATION (IUPAC)',
      emfFormulaEyebrow: 'STANDARD CELL POTENTIAL (EMF)',
      emfIntensiveNote:
        'Note: E°cell = E°cathode − E°anode is an intensive property and is NEVER multiplied by stoichiometric electron coefficients.',
      halfAnodeEyebrow: 'Anode (−) Half-Reaction [Oxidation]',
      halfCathodeEyebrow: 'Cathode (+) Half-Reaction [Reduction]',
      overallEqEyebrow: 'Overall Balanced Ionic Equation',
      eFlowLeftToRight: 'External e⁻ flow: Left Beaker (Anode −) ➔ Right Beaker (Cathode +)',
      eFlowRightToLeft: 'External e⁻ flow: Right Beaker (Anode −) ➔ Left Beaker (Cathode +)',
      eFlowNone: 'No electron flow (E°cell = 0.00 V)',
      electroSystemLabel: 'Classic Electrolysis Systems:',
      polarityCompareTitle: 'POLARITY REVERSAL VS. GALVANIC CELL',
      polarityAnodeBox: 'ANODE (+) • DC positive terminal pulls e⁻ ➔ OXIDATION',
      polarityCathodeBox: 'CATHODE (−) • DC negative terminal pushes e⁻ ➔ REDUCTION',
      elHalfCathodeEyebrow: 'Reduction at Cathode (−)',
      elHalfAnodeEyebrow: 'Oxidation at Anode (+)',
      elOverallEyebrow: 'Overall Electrolysis Equation',
      phenomenonEyebrow: 'Experimental Observations',
      mechanismEyebrow: 'Mechanism & Key Notes',
      faradayTitle: 'FARADAY’S LAW CALCULATOR (STP 25°C, 1 BAR — 24.79 L/MOL)',
      faradayFormulaHint: 'Q = I·t  |  nₑ = I·t / F (F = 96485 C/mol)  |  m = M·nₑ / z  |  V(STP) = 24.79 · nₑ / z',
      sliderCurrentLabel: 'Electric Current (I)',
      sliderTimeLabel: 'Electrolysis Time (t)',
      minutesUnit: 'min',
      chargeLabel: 'Electric Charge Q = I·t',
      molElectronLabel: 'Moles of Electrons (nₑ)',
      cathodeYieldLabel: 'Product at Cathode (−)',
      anodeYieldLabel: 'Gas Product at Anode (+)',
      dcSourceTitle: 'DC POWER SUPPLY',
      graphiteElectrode: 'Graphite Electrode (C)',
      diaphragmLabel: 'Porous Diaphragm',
      moltenBathLabel: 'Molten Al₂O₃ + Na₃AlF₆ (~950°C)'
    }
  };

  let state = {
    initialized: false,
    lang: 'vi',
    mode: 'galvanic', // 'galvanic' | 'electrolysis'
    leftCoupleId: 'Zn2+/Zn',
    rightCoupleId: 'Cu2+/Cu',
    electroSystemId: 'cuso4',
    currentAmp: 5.0,
    timeSec: 1200
  };

  let callbacks = {
    getLang: () => 'vi'
  };

  let hostEl = null;

  function dict() {
    return ELECTRO_I18N[state.lang] || ELECTRO_I18N.vi;
  }

  function findCouple(id) {
    return REDOX_COUPLES.find((c) => c.id === id) || REDOX_COUPLES[0];
  }

  function findElectroSystem(id) {
    return ELECTROLYSIS_SYSTEMS.find((s) => s.id === id) || ELECTROLYSIS_SYSTEMS[0];
  }

  function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  function formatSignedE0(val) {
    const fixed = Math.abs(val).toFixed(2);
    if (val > 0) return `+${fixed} V`;
    if (val < 0) return `−${fixed} V`;
    return `0.00 V`;
  }

  function formatParenE0(val) {
    return `(${formatSignedE0(val)})`;
  }

  function formatCoeffSpecies(coeff, species) {
    return coeff <= 1 ? species : `${coeff}${species}`;
  }

  // Analyze the current Galvanic cell configuration
  function analyzeGalvanicCell(leftCouple, rightCouple) {
    if (leftCouple.id === rightCouple.id || Math.abs(leftCouple.e0 - rightCouple.e0) < 1e-6) {
      return {
        isIdentical: true,
        eCell: 0.0,
        anode: null,
        cathode: null,
        anodeSide: null,
        cathodeSide: null
      };
    }

    const leftIsAnode = leftCouple.e0 < rightCouple.e0;
    const anode = leftIsAnode ? leftCouple : rightCouple;
    const cathode = leftIsAnode ? rightCouple : leftCouple;
    const anodeSide = leftIsAnode ? 'left' : 'right';
    const cathodeSide = leftIsAnode ? 'right' : 'left';
    const eCell = cathode.e0 - anode.e0;

    const totalE = lcm(anode.n, cathode.n);
    const multA = totalE / anode.n;
    const multC = totalE / cathode.n;

    // Single half-reactions
    const anodeHalf = `${formatCoeffSpecies(anode.redCoeff, anode.redSpecies)} → ${formatCoeffSpecies(anode.oxCoeff, anode.oxSpecies)} + ${anode.n === 1 ? '' : anode.n}e⁻`;
    const cathodeHalf = `${formatCoeffSpecies(cathode.oxCoeff, cathode.oxSpecies)} + ${cathode.n === 1 ? '' : cathode.n}e⁻ → ${formatCoeffSpecies(cathode.redCoeff, cathode.redSpecies)}${cathode.isGas ? '↑' : ''}`;

    // Overall balanced ionic equation
    const r1 = formatCoeffSpecies(multA * anode.redCoeff, anode.redSpecies);
    const r2 = formatCoeffSpecies(multC * cathode.oxCoeff, cathode.oxSpecies);
    const p1 = formatCoeffSpecies(multA * anode.oxCoeff, anode.oxSpecies);
    const p2 = `${formatCoeffSpecies(multC * cathode.redCoeff, cathode.redSpecies)}${cathode.isGas ? '↑' : ''}`;
    const overallEq = `${r1} + ${r2} → ${p1} + ${p2}`;

    // Standard IUPAC cell diagram: (-) Anode | Anode Ion || Cathode Ion | Cathode (+)
    const anodeNotation = anode.isSHE
      ? '(-) Pt(s) | H₂(g, 1 bar) | H⁺(aq, 1M)'
      : `(-) ${anode.redLabel}(s) | ${anode.oxLabel}(aq, 1M)`;
    const cathodeNotation = cathode.isSHE
      ? 'H⁺(aq, 1M) | H₂(g, 1 bar) | Pt(s) (+)'
      : `${cathode.oxLabel}(aq, 1M) | ${cathode.redLabel}(s) (+)`;
    const cellNotation = `${anodeNotation} || ${cathodeNotation}`;

    // Explicit formula calculation string
    const emfCalcText = `E°pin = E°(${cathode.label}) − E°(${anode.label}) = ${formatParenE0(cathode.e0)} − ${formatParenE0(anode.e0)} = +${eCell.toFixed(2)} V`;

    return {
      isIdentical: false,
      eCell,
      anode,
      cathode,
      anodeSide,
      cathodeSide,
      totalE,
      multA,
      multC,
      anodeHalf,
      cathodeHalf,
      overallEq,
      cellNotation,
      emfCalcText
    };
  }

  // Render an electrode inside a Galvanic beaker (supports normal metal bar OR Pt + H2 glass hood)
  function buildGalvanicElectrodeSVG(couple, cx, role) {
    // role: 'anode' | 'cathode' | 'neutral'
    if (couple.isSHE) {
      // Standard Hydrogen Electrode (SHE): glass hood + Pt wire + Pt black foil + H2 bubbles
      const isBubblingStrong = role === 'cathode';
      return `
        <g class="echem-she-group">
          <!-- Glass gas tube hood -->
          <path d="M ${cx - 20} 82 L ${cx - 20} 206 M ${cx + 20} 82 L ${cx + 20} 206 M ${cx - 20} 82 Q ${cx} 70 ${cx + 20} 82"
                fill="rgba(203, 213, 225, 0.08)" stroke="#94a3b8" stroke-width="1.5" />
          <!-- H2 gas inlet side tube -->
          <path d="M ${cx - 34} 96 L ${cx - 20} 96" stroke="#94a3b8" stroke-width="2" />
          <text x="${cx - 37}" y="99" text-anchor="end" class="echem-svg-mini-lbl">H₂ (1 bar)</text>
          <!-- Platinum wire & platinized Pt foil -->
          <line x1="${cx}" y1="68" x2="${cx}" y2="182" stroke="#e2e8f0" stroke-width="2.2" />
          <rect x="${cx - 9}" y="176" width="18" height="24" rx="2" fill="#64748b" stroke="#e2e8f0" stroke-width="1.4" />
          <text x="${cx}" y="192" text-anchor="middle" class="echem-svg-rod-sym">Pt</text>
          <!-- Rising H2 bubbles -->
          <circle cx="${cx - 11}" cy="198" r="2.6" class="echem-svg-bubble" style="--ec-delay: 0s" />
          <circle cx="${cx + 10}" cy="190" r="2.2" class="echem-svg-bubble" style="--ec-delay: 0.6s" />
          <circle cx="${cx - 6}" cy="172" r="2.9" class="echem-svg-bubble" style="--ec-delay: 1.1s" />
          ${
            isBubblingStrong
              ? `<circle cx="${cx + 7}" cy="166" r="3.1" class="echem-svg-bubble" style="--ec-delay: 0.3s" />
                 <circle cx="${cx}" cy="158" r="2.4" class="echem-svg-bubble" style="--ec-delay: 0.9s" />`
              : ''
          }
        </g>
      `;
    }

    // Normal metal electrode bar
    const isAnode = role === 'anode';
    const isCathode = role === 'cathode';
    const barWidth = isAnode ? 24 : isCathode ? 30 : 26;
    const barX = cx - barWidth / 2;

    return `
      <g class="echem-metal-rod">
        ${
          isCathode
            ? `<!-- Plated deposition highlight layer on submerged cathode -->
               <rect x="${barX - 2.5}" y="140" width="${barWidth + 5}" height="68" rx="4"
                     fill="${couple.electrodeFill}" fill-opacity="0.38" stroke="${couple.electrodeStroke}" stroke-width="1.3" stroke-dasharray="3 2" />`
            : ''
        }
        <rect x="${barX}" y="76" width="${barWidth}" height="128" rx="3.5"
              fill="${couple.electrodeFill}" stroke="${couple.electrodeStroke}" stroke-width="1.6"
              ${isAnode ? 'stroke-dasharray="5 2"' : ''} />
        <text x="${cx}" y="114" text-anchor="middle" class="echem-svg-rod-sym">${couple.redLabel}</text>
      </g>
    `;
  }

  // Build Pure-SVG Galvanic Cell Diagram
  function buildGalvanicSVG(leftCouple, rightCouple, analysis) {
    const d = dict();
    const leftX = 148;
    const rightX = 532;
    const leftRole = analysis.isIdentical ? 'neutral' : analysis.anodeSide === 'left' ? 'anode' : 'cathode';
    const rightRole = analysis.isIdentical ? 'neutral' : analysis.anodeSide === 'right' ? 'anode' : 'cathode';

    const leftBadgeText =
      leftRole === 'anode' ? d.anodeBadge : leftRole === 'cathode' ? d.cathodeBadge : d.equalBadge;
    const rightBadgeText =
      rightRole === 'anode' ? d.anodeBadge : rightRole === 'cathode' ? d.cathodeBadge : d.equalBadge;

    const leftBadgeClass =
      leftRole === 'anode' ? 'is-anode' : leftRole === 'cathode' ? 'is-cathode' : 'is-neutral';
    const rightBadgeClass =
      rightRole === 'anode' ? 'is-anode' : rightRole === 'cathode' ? 'is-cathode' : 'is-neutral';

    // Electron flow path along external wire (Anode -> Voltmeter -> Cathode)
    const flowDir = analysis.isIdentical ? 'none' : analysis.anodeSide === 'left' ? 'ltr' : 'rtl';
    const eFlowCaption =
      flowDir === 'ltr' ? d.eFlowLeftToRight : flowDir === 'rtl' ? d.eFlowRightToLeft : d.eFlowNone;

    // Animated electrons along top external wire
    let electronParticles = '';
    if (flowDir !== 'none') {
      const dirClass = flowDir === 'ltr' ? 'echem-e-ltr' : 'echem-e-rtl';
      electronParticles = `
        <g class="echem-e-stream ${dirClass}">
          <g class="echem-e-dot" style="--e-pos: 205px; --e-delay: 0s">
            <circle cx="0" cy="30" r="6.5" fill="#272219" stroke="#d4b47c" stroke-width="1.4" />
            <text x="0" y="33" text-anchor="middle" class="echem-svg-e-txt">e⁻</text>
          </g>
          <g class="echem-e-dot" style="--e-pos: 265px; --e-delay: 0.55s">
            <circle cx="0" cy="30" r="6.5" fill="#272219" stroke="#d4b47c" stroke-width="1.4" />
            <text x="0" y="33" text-anchor="middle" class="echem-svg-e-txt">e⁻</text>
          </g>
          <g class="echem-e-dot" style="--e-pos: 415px; --e-delay: 0.25s">
            <circle cx="0" cy="30" r="6.5" fill="#272219" stroke="#d4b47c" stroke-width="1.4" />
            <text x="0" y="33" text-anchor="middle" class="echem-svg-e-txt">e⁻</text>
          </g>
          <g class="echem-e-dot" style="--e-pos: 475px; --e-delay: 0.8s">
            <circle cx="0" cy="30" r="6.5" fill="#272219" stroke="#d4b47c" stroke-width="1.4" />
            <text x="0" y="33" text-anchor="middle" class="echem-svg-e-txt">e⁻</text>
          </g>
        </g>
      `;
    }

    // Salt bridge K+ and NO3- directional arrows
    const anodeX = analysis.anodeSide === 'right' ? 434 : 246;
    const cathodeX = analysis.cathodeSide === 'left' ? 246 : 434;
    const no3Arrow = analysis.isIdentical
      ? 'NO₃⁻'
      : analysis.anodeSide === 'left'
      ? '⟵ NO₃⁻'
      : 'NO₃⁻ ⟶';
    const kArrow = analysis.isIdentical
      ? 'K⁺'
      : analysis.cathodeSide === 'right'
      ? 'K⁺ ⟶'
      : '⟵ K⁺';

    const voltmeterDisplay = analysis.isIdentical ? '0.00 V' : `+${analysis.eCell.toFixed(2)} V`;

    return `
      <svg class="echem-svg" viewBox="0 0 680 284" role="img" aria-label="${d.title}">
        <!-- External circuit wire connecting Left electrode (148,76) -> Top (30) -> Right electrode (532,76) -->
        <polyline points="${leftX},76 ${leftX},30 282,30" fill="none" stroke="#94a3b8" stroke-width="2.2" />
        <polyline points="398,30 ${rightX},30 ${rightX},76" fill="none" stroke="#94a3b8" stroke-width="2.2" />

        ${electronParticles}

        <!-- Digital Voltmeter in center of top wire -->
        <g class="echem-voltmeter">
          <rect x="282" y="10" width="116" height="42" rx="7" fill="#181c26" stroke="#d4b47c" stroke-width="1.6" />
          <text x="340" y="23" text-anchor="middle" class="echem-svg-vm-lbl">${d.voltmeterTitle}</text>
          <text x="340" y="42" text-anchor="middle" class="echem-svg-vm-val">${voltmeterDisplay}</text>
        </g>

        <!-- Electron flow direction subtitle under voltmeter -->
        <text x="340" y="66" text-anchor="middle" class="echem-svg-flow-hint">${eFlowCaption}</text>

        <!-- LEFT BEAKER -->
        <g class="echem-beaker-group">
          <!-- Liquid fill -->
          <path d="M 74 136 L 74 222 Q 74 232 84 232 L 240 232 Q 250 232 250 222 L 250 136 Z"
                fill="${leftCouple.solutionFill}" stroke="${leftCouple.solutionStroke}" stroke-width="1" />
          <!-- Glass beaker outline -->
          <path d="M 70 102 L 74 102 L 74 222 Q 74 232 84 232 L 240 232 Q 250 232 250 222 L 250 102 L 254 102"
                fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
          <!-- Left Electrode -->
          ${buildGalvanicElectrodeSVG(leftCouple, leftX, leftRole)}
          <!-- Dissolved ion badge in solution -->
          <rect x="86" y="198" width="54" height="22" rx="4" fill="rgba(15, 20, 28, 0.72)" stroke="rgba(148, 163, 184, 0.35)" stroke-width="1" />
          <text x="113" y="213" text-anchor="middle" class="echem-svg-ion-txt">${leftCouple.oxLabel}</text>
        </g>

        <!-- RIGHT BEAKER -->
        <g class="echem-beaker-group">
          <!-- Liquid fill -->
          <path d="M 430 136 L 430 222 Q 430 232 440 232 L 596 232 Q 606 232 606 222 L 606 136 Z"
                fill="${rightCouple.solutionFill}" stroke="${rightCouple.solutionStroke}" stroke-width="1" />
          <!-- Glass beaker outline -->
          <path d="M 426 102 L 430 102 L 430 222 Q 430 232 440 232 L 596 232 Q 606 232 606 222 L 606 102 L 610 102"
                fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
          <!-- Right Electrode -->
          ${buildGalvanicElectrodeSVG(rightCouple, rightX, rightRole)}
          <!-- Dissolved ion badge in solution -->
          <rect x="540" y="198" width="54" height="22" rx="4" fill="rgba(15, 20, 28, 0.72)" stroke="rgba(148, 163, 184, 0.35)" stroke-width="1" />
          <text x="567" y="213" text-anchor="middle" class="echem-svg-ion-txt">${rightCouple.oxLabel}</text>
        </g>

        <!-- U-SHAPED KNO3 SALT BRIDGE -->
        <g class="echem-salt-bridge">
          <!-- Outer U-tube -->
          <path d="M 226 178 L 226 102 Q 226 84 244 84 L 436 84 Q 454 84 454 102 L 454 178"
                fill="none" stroke="#cbd5e1" stroke-width="18" stroke-linecap="round" opacity="0.22" />
          <path d="M 226 178 L 226 102 Q 226 84 244 84 L 436 84 Q 454 84 454 102 L 454 178"
                fill="none" stroke="#d4b47c" stroke-width="13" stroke-linecap="round" opacity="0.25" />
          <!-- Salt bridge title badge -->
          <rect x="286" y="75" width="108" height="19" rx="4" fill="#1d222e" stroke="#6b5634" stroke-width="1.1" />
          <text x="340" y="88" text-anchor="middle" class="echem-svg-bridge-lbl">${d.saltBridgeTitle}</text>

          <!-- Migrating NO3- (towards Anode) and K+ (towards Cathode) pills -->
          <g class="echem-bridge-ion ${analysis.isIdentical ? '' : 'is-drifting'}">
            <rect x="${anodeX - 31}" y="114" width="62" height="19" rx="9" fill="#1e2636" stroke="#8ab4c9" stroke-width="1.1" />
            <text x="${anodeX}" y="127" text-anchor="middle" class="echem-svg-bridge-ion is-anion">${no3Arrow}</text>
          </g>
          <g class="echem-bridge-ion ${analysis.isIdentical ? '' : 'is-drifting'}">
            <rect x="${cathodeX - 27}" y="114" width="54" height="19" rx="9" fill="#2a2218" stroke="#d4b47c" stroke-width="1.1" />
            <text x="${cathodeX}" y="127" text-anchor="middle" class="echem-svg-bridge-ion is-cation">${kArrow}</text>
          </g>
        </g>

        <!-- LEFT ROLE & POTENTIAL CAPTION -->
        <g transform="translate(162, 244)">
          <rect x="-86" y="0" width="172" height="22" rx="5" class="echem-svg-role-pill ${leftBadgeClass}" />
          <text x="0" y="15" text-anchor="middle" class="echem-svg-role-txt ${leftBadgeClass}">${leftBadgeText}</text>
          <text x="0" y="35" text-anchor="middle" class="echem-svg-sub-caption">
            ${leftCouple.electrolyte} • E° = ${formatSignedE0(leftCouple.e0)}
          </text>
        </g>

        <!-- RIGHT ROLE & POTENTIAL CAPTION -->
        <g transform="translate(518, 244)">
          <rect x="-86" y="0" width="172" height="22" rx="5" class="echem-svg-role-pill ${rightBadgeClass}" />
          <text x="0" y="15" text-anchor="middle" class="echem-svg-role-txt ${rightBadgeClass}">${rightBadgeText}</text>
          <text x="0" y="35" text-anchor="middle" class="echem-svg-sub-caption">
            ${rightCouple.electrolyte} • E° = ${formatSignedE0(rightCouple.e0)}
          </text>
        </g>
      </svg>
    `;
  }

  // Build Pure-SVG Electrolytic Cell Diagram (Anode (+) on left, Cathode (−) on right)
  function buildElectrolysisSVG(sys) {
    const d = dict();
    const isEn = state.lang === 'en';
    const anodeX = 228;
    const cathodeX = 452;

    // Anode (+) visual effects (O2 or Cl2 gas bubbles)
    const anodeBubbleStroke = sys.anodeVisualType === 'gas-cl2' ? '#b8d86b' : '#8ab4c9';
    const anodeVisuals = `
      <g class="echem-el-bubbles">
        <circle cx="${anodeX - 18}" cy="196" r="3" stroke="${anodeBubbleStroke}" class="echem-svg-bubble" style="--ec-delay: 0s" />
        <circle cx="${anodeX + 18}" cy="186" r="2.6" stroke="${anodeBubbleStroke}" class="echem-svg-bubble" style="--ec-delay: 0.45s" />
        <circle cx="${anodeX - 16}" cy="168" r="3.2" stroke="${anodeBubbleStroke}" class="echem-svg-bubble" style="--ec-delay: 0.9s" />
        <circle cx="${anodeX + 17}" cy="156" r="2.8" stroke="${anodeBubbleStroke}" class="echem-svg-bubble" style="--ec-delay: 1.3s" />
      </g>
    `;

    // Cathode (−) visual effects (Cu red plating, H2 bubbles, or molten Al pool)
    let cathodeVisuals = '';
    if (sys.cathodeVisualType === 'plate-cu') {
      cathodeVisuals = `
        <rect x="${cathodeX - 15.5}" y="142" width="31" height="66" rx="4"
              fill="#c77b52" fill-opacity="0.72" stroke="#e5a07a" stroke-width="1.5" />
      `;
    } else if (sys.cathodeVisualType === 'gas-h2') {
      cathodeVisuals = `
        <g class="echem-el-bubbles">
          <circle cx="${cathodeX - 18}" cy="194" r="2.8" stroke="#e2e8f0" class="echem-svg-bubble" style="--ec-delay: 0.15s" />
          <circle cx="${cathodeX + 18}" cy="182" r="3.1" stroke="#e2e8f0" class="echem-svg-bubble" style="--ec-delay: 0.6s" />
          <circle cx="${cathodeX - 16}" cy="166" r="2.6" stroke="#e2e8f0" class="echem-svg-bubble" style="--ec-delay: 1.05s" />
          <circle cx="${cathodeX + 16}" cy="154" r="3.0" stroke="#e2e8f0" class="echem-svg-bubble" style="--ec-delay: 1.45s" />
        </g>
      `;
    } else if (sys.cathodeVisualType === 'molten-al') {
      cathodeVisuals = `
        <path d="M 152 216 L 528 216 L 528 225 Q 528 232 520 232 L 160 232 Q 152 232 152 225 Z"
              fill="#cbd5e1" fill-opacity="0.58" stroke="#e2e8f0" stroke-width="1.2" />
        <text x="340" y="227" text-anchor="middle" class="echem-svg-molten-lbl">${d.moltenAlPoolLabel}</text>
      `;
    }

    // Porous diaphragm for NaCl chlor-alkali
    const diaphragmSVG = sys.hasDiaphragm
      ? `
        <g class="echem-diaphragm">
          <!-- Phenolphthalein pink tint in cathode chamber -->
          <rect x="340" y="136" width="188" height="95" fill="${sys.cathodeZoneTint}" />
          <line x1="340" y1="112" x2="340" y2="232" stroke="#cbd5e1" stroke-width="2.4" stroke-dasharray="5 4" />
          <rect x="292" y="114" width="96" height="17" rx="4" fill="#181c26" stroke="#64748b" stroke-width="1" />
          <text x="340" y="126" text-anchor="middle" class="echem-svg-mini-lbl">${d.diaphragmLabel}</text>
        </g>
      `
      : '';

    const anodeTag = isEn ? sys.anodeProductTagEn : sys.anodeProductTagVi;
    const cathodeTag = isEn ? sys.cathodeProductTagEn : sys.cathodeProductTagVi;

    return `
      <svg class="echem-svg" viewBox="0 0 680 284" role="img" aria-label="${isEn ? sys.titleEn : sys.titleVi}">
        <!-- External wires connecting DC Source to Anode (+) on Left and Cathode (−) on Right -->
        <polyline points="${anodeX},76 ${anodeX},30 278,30" fill="none" stroke="#e08276" stroke-width="2.2" />
        <polyline points="402,30 ${cathodeX},30 ${cathodeX},76" fill="none" stroke="#7aa2f7" stroke-width="2.2" />

        <!-- Animated electrons: pulled from Anode (+) into DC (+), pushed from DC (−) into Cathode (−) -->
        <g class="echem-e-stream echem-e-ltr">
          <g class="echem-e-dot" style="--e-pos: 235px; --e-delay: 0.1s">
            <circle cx="0" cy="30" r="6.5" fill="#272219" stroke="#d4b47c" stroke-width="1.4" />
            <text x="0" y="33" text-anchor="middle" class="echem-svg-e-txt">e⁻</text>
          </g>
          <g class="echem-e-dot" style="--e-pos: 416px; --e-delay: 0.45s">
            <circle cx="0" cy="30" r="6.5" fill="#272219" stroke="#d4b47c" stroke-width="1.4" />
            <text x="0" y="33" text-anchor="middle" class="echem-svg-e-txt">e⁻</text>
          </g>
        </g>

        <!-- DC Power Source in center top -->
        <g class="echem-dc-source">
          <rect x="278" y="10" width="124" height="42" rx="7" fill="#181c26" stroke="#94a3b8" stroke-width="1.6" />
          <text x="340" y="23" text-anchor="middle" class="echem-svg-vm-lbl">${d.dcSourceTitle}</text>
          <!-- (+) terminal left, (−) terminal right -->
          <text x="296" y="42" text-anchor="middle" class="echem-svg-dc-pole is-plus">(+)</text>
          <line x1="333" y1="28" x2="333" y2="45" stroke="#e08276" stroke-width="2.6" />
          <line x1="345" y1="32" x2="345" y2="41" stroke="#7aa2f7" stroke-width="3.2" />
          <text x="384" y="42" text-anchor="middle" class="echem-svg-dc-pole is-minus">(−)</text>
        </g>

        <!-- ELECTROLYTIC VAT / BATH -->
        <g class="echem-vat">
          <!-- Electrolyte Fill -->
          <path d="M 150 136 L 150 222 Q 150 232 160 232 L 520 232 Q 530 232 530 222 L 530 136 Z"
                fill="${sys.solutionFill}" stroke="${sys.solutionStroke}" stroke-width="1" />
          ${diaphragmSVG}
          <!-- Vat Glass/Furnace Outline -->
          <path d="M 145 100 L 150 100 L 150 222 Q 150 232 160 232 L 520 232 Q 530 232 530 222 L 530 100 L 535 100"
                fill="none" stroke="${sys.isMolten ? '#d4945a' : '#94a3b8'}" stroke-width="2.2" stroke-linecap="round" />

          <!-- Left Electrode: ANODE (+) Inert Graphite -->
          <rect x="${anodeX - 13}" y="76" width="26" height="128" rx="3.5"
                fill="#3b4252" stroke="#94a3b8" stroke-width="1.6" />
          <text x="${anodeX}" y="114" text-anchor="middle" class="echem-svg-rod-sym is-light">C (+)</text>
          ${anodeVisuals}

          <!-- Right Electrode: CATHODE (−) Inert Graphite -->
          ${cathodeVisuals}
          <rect x="${cathodeX - 13}" y="76" width="26" height="128" rx="3.5"
                fill="#3b4252" stroke="#94a3b8" stroke-width="1.6" fill-opacity="${sys.cathodeVisualType === 'plate-cu' ? '0.68' : '1'}" />
          <text x="${cathodeX}" y="114" text-anchor="middle" class="echem-svg-rod-sym is-light">C (−)</text>

          <!-- Product Callout Tags inside/above Vat -->
          <rect x="${anodeX - 58}" y="54" width="116" height="18" rx="4" fill="#2a1d1d" stroke="#8c4a46" stroke-width="1" />
          <text x="${anodeX}" y="66" text-anchor="middle" class="echem-svg-prod-tag is-anode-pos">${anodeTag}</text>

          <rect x="${cathodeX - 64}" y="54" width="128" height="18" rx="4" fill="#1a2433" stroke="#3e67a8" stroke-width="1" />
          <text x="${cathodeX}" y="66" text-anchor="middle" class="echem-svg-prod-tag is-cathode-neg">${cathodeTag}</text>

          <!-- Ion migration arrows inside bath -->
          <g class="echem-bath-ions">
            <rect x="262" y="160" width="66" height="19" rx="9" fill="rgba(24, 28, 38, 0.85)" stroke="#e08276" stroke-width="1" />
            <text x="295" y="173" text-anchor="middle" class="echem-svg-bridge-ion is-anion">⟵ ${sys.anionsInBath[0]}</text>

            <rect x="352" y="186" width="66" height="19" rx="9" fill="rgba(24, 28, 38, 0.85)" stroke="#7aa2f7" stroke-width="1" />
            <text x="385" y="199" text-anchor="middle" class="echem-svg-bridge-ion is-cation">${sys.cationsInBath[0]} ⟶</text>
          </g>
        </g>

        <!-- Bottom Role Pills (Note polarity reversal: Anode is (+), Cathode is (−)) -->
        <g transform="translate(${anodeX}, 244)">
          <rect x="-86" y="0" width="172" height="22" rx="5" class="echem-svg-role-pill is-el-anode" />
          <text x="0" y="15" text-anchor="middle" class="echem-svg-role-txt is-el-anode">${d.elAnodeBadge}</text>
          <text x="0" y="35" text-anchor="middle" class="echem-svg-sub-caption">${d.graphiteElectrode}</text>
        </g>

        <g transform="translate(${cathodeX}, 244)">
          <rect x="-86" y="0" width="172" height="22" rx="5" class="echem-svg-role-pill is-el-cathode" />
          <text x="0" y="15" text-anchor="middle" class="echem-svg-role-txt is-el-cathode">${d.elCathodeBadge}</text>
          <text x="0" y="35" text-anchor="middle" class="echem-svg-sub-caption">${sys.isMolten ? d.moltenBathLabel : d.graphiteElectrode}</text>
        </g>
      </svg>
    `;
  }

  // Compute Faraday's Law values for current I, t, and system
  function computeFaradayMetrics(sys, currentAmp, timeSec) {
    const Q = currentAmp * timeSec; // Coulombs
    const nE = Q / FARADAY_CONSTANT; // mol e-
    const f = sys.faraday;

    let cathodeMain = '';
    let cathodeSub = '';
    if (f.cathodeKind === 'mass') {
      const molMetal = nE / f.cathodeZ;
      const massG = molMetal * f.cathodeM;
      cathodeMain = `${massG.toFixed(3)} g ${f.cathodeSpecies}`;
      cathodeSub = `n(${f.cathodeSpecies}) = ${molMetal.toFixed(4)} mol (M = ${f.cathodeM}, z = ${f.cathodeZ})`;
    } else if (f.cathodeKind === 'gas-alkali') {
      const molGas = nE / f.cathodeZ;
      const volL = molGas * MOLAR_VOLUME_STP_2018;
      const massNaOH = (nE / f.extraZ) * f.extraM;
      cathodeMain = `${volL.toFixed(3)} L ${f.cathodeSpecies} (${(volL * 1000).toFixed(0)} mL)`;
      cathodeSub = `+ ${massNaOH.toFixed(3)} g ${f.extraSpecies} (n = ${molGas.toFixed(4)} mol H₂)`;
    }

    const molAnodeGas = nE / f.anodeZ;
    const volAnodeL = molAnodeGas * MOLAR_VOLUME_STP_2018;
    const anodeMain = `${volAnodeL.toFixed(3)} L ${f.anodeSpecies} (${(volAnodeL * 1000).toFixed(0)} mL)`;
    const anodeSub = `n(${f.anodeSpecies.replace('↑', '')}) = ${molAnodeGas.toFixed(4)} mol (z = ${f.anodeZ}, 24.79 L/mol)`;

    return {
      Q,
      nE,
      cathodeMain,
      cathodeSub,
      anodeMain,
      anodeSub
    };
  }

  // Fast DOM update for Faraday sliders without recreating the slider elements
  function updateFaradayReadout() {
    if (!hostEl || state.mode !== 'electrolysis') return;
    const d = dict();
    const sys = findElectroSystem(state.electroSystemId);
    const metrics = computeFaradayMetrics(sys, state.currentAmp, state.timeSec);

    const valI = hostEl.querySelector('#echem-val-i');
    const valT = hostEl.querySelector('#echem-val-t');
    const outQ = hostEl.querySelector('#echem-out-q');
    const outNe = hostEl.querySelector('#echem-out-ne');
    const outCatMain = hostEl.querySelector('#echem-out-cat-main');
    const outCatSub = hostEl.querySelector('#echem-out-cat-sub');
    const outAnoMain = hostEl.querySelector('#echem-out-ano-main');
    const outAnoSub = hostEl.querySelector('#echem-out-ano-sub');

    if (valI) valI.textContent = `${state.currentAmp.toFixed(1)} A`;
    if (valT) {
      const mins = (state.timeSec / 60).toFixed(0);
      valT.textContent = `${state.timeSec} s (${mins} ${d.minutesUnit})`;
    }
    if (outQ) outQ.textContent = `${metrics.Q.toFixed(0)} C`;
    if (outNe) outNe.textContent = `${metrics.nE.toFixed(4)} mol e⁻`;
    if (outCatMain) outCatMain.textContent = metrics.cathodeMain;
    if (outCatSub) outCatSub.textContent = metrics.cathodeSub;
    if (outAnoMain) outAnoMain.textContent = metrics.anodeMain;
    if (outAnoSub) outAnoSub.textContent = metrics.anodeSub;
  }

  function renderGalvanicSection() {
    const d = dict();
    const isEn = state.lang === 'en';
    const leftCouple = findCouple(state.leftCoupleId);
    const rightCouple = findCouple(state.rightCoupleId);
    const analysis = analyzeGalvanicCell(leftCouple, rightCouple);

    const presetChipsHTML = GALVANIC_PRESETS.map((p) => {
      const isActive =
        (state.leftCoupleId === p.left && state.rightCoupleId === p.right) ||
        (state.leftCoupleId === p.right && state.rightCoupleId === p.left);
      return `
        <button type="button" class="lab-preset-chip ${isActive ? 'active' : ''}"
                data-ec-preset-left="${p.left}" data-ec-preset-right="${p.right}">
          ${isEn ? p.tagEn : p.tagVi}
        </button>
      `;
    }).join('');

    const buildCoupleOptions = (selectedId) =>
      REDOX_COUPLES.map((c) => {
        const sel = c.id === selectedId ? 'selected' : '';
        return `<option value="${c.id}" ${sel}>${c.label}  (E° = ${formatSignedE0(c.e0)}, n = ${c.n}e⁻)</option>`;
      }).join('');

    const anodeSideText = analysis.anodeSide === 'left' ? d.sideLeft : d.sideRight;
    const cathodeSideText = analysis.cathodeSide === 'left' ? d.sideLeft : d.sideRight;

    const detailsHTML = analysis.isIdentical
      ? `
        <div class="echem-warn-banner">
          <span class="echem-warn-icon">⚠</span>
          <span>${d.noCurrentBanner}</span>
        </div>
      `
      : `
        <!-- Standard Cell Diagram & EMF Intensive Property Box -->
        <div class="echem-summary-grid">
          <div class="echem-info-card">
            <span class="echem-eyebrow">${d.cellDiagramEyebrow}</span>
            <div class="echem-mono-formula">${analysis.cellNotation}</div>
            <div class="echem-bridge-note">${d.saltBridgeRule(anodeSideText, cathodeSideText)}</div>
          </div>
          <div class="echem-info-card">
            <span class="echem-eyebrow">${d.emfFormulaEyebrow}</span>
            <div class="echem-mono-formula is-gold">${analysis.emfCalcText}</div>
            <div class="echem-intensive-note">${d.emfIntensiveNote}</div>
          </div>
        </div>

        <!-- Half-Reactions & Overall Balanced Equation -->
        <div class="echem-rxn-grid">
          <div class="echem-rxn-box is-anode">
            <div class="echem-rxn-head">
              <span class="echem-eyebrow">${d.halfAnodeEyebrow}</span>
              <span class="echem-mult-tag">×${analysis.multA}</span>
            </div>
            <div class="echem-rxn-eq">${analysis.anodeHalf}</div>
          </div>
          <div class="echem-rxn-box is-cathode">
            <div class="echem-rxn-head">
              <span class="echem-eyebrow">${d.halfCathodeEyebrow}</span>
              <span class="echem-mult-tag">×${analysis.multC}</span>
            </div>
            <div class="echem-rxn-eq">${analysis.cathodeHalf}</div>
          </div>
        </div>

        <div class="echem-overall-box">
          <div class="echem-overall-head">
            <span class="echem-eyebrow">${d.overallEqEyebrow}</span>
            <span class="echem-lcm-badge">BCNN / LCM = ${analysis.totalE}e⁻</span>
          </div>
          <div class="echem-overall-eq">${analysis.overallEq}</div>
        </div>
      `;

    return `
      <!-- Quick Presets -->
      <div class="lab-presets-row echem-presets-row">
        <span class="lab-presets-label">${d.presetsLabel}</span>
        <div class="lab-presets-list">${presetChipsHTML}</div>
      </div>

      <!-- Two Half-Cell Selectors + Swap Beakers Button -->
      <div class="echem-controls-bar">
        <div class="echem-select-slot">
          <label class="echem-slot-label" for="echem-select-left">${d.leftBeakerLabel}</label>
          <select id="echem-select-left" class="echem-select">
            ${buildCoupleOptions(state.leftCoupleId)}
          </select>
        </div>

        <button type="button" class="echem-swap-btn" id="echem-swap-beakers" title="${d.swapBeakersTitle}">
          ${d.swapBeakersBtn}
        </button>

        <div class="echem-select-slot">
          <label class="echem-slot-label" for="echem-select-right">${d.rightBeakerLabel}</label>
          <select id="echem-select-right" class="echem-select">
            ${buildCoupleOptions(state.rightCoupleId)}
          </select>
        </div>
      </div>

      <!-- Pure-SVG Galvanic Cell Stage -->
      <div class="echem-visual-stage">
        ${buildGalvanicSVG(leftCouple, rightCouple, analysis)}
      </div>

      ${detailsHTML}
    `;
  }

  function renderElectrolysisSection() {
    const d = dict();
    const isEn = state.lang === 'en';
    const sys = findElectroSystem(state.electroSystemId);
    const metrics = computeFaradayMetrics(sys, state.currentAmp, state.timeSec);
    const mins = (state.timeSec / 60).toFixed(0);

    const sysChipsHTML = ELECTROLYSIS_SYSTEMS.map((item) => {
      const isActive = item.id === state.electroSystemId;
      return `
        <button type="button" class="lab-preset-chip ${isActive ? 'active' : ''}" data-ec-sys="${item.id}">
          ${item.formula}
        </button>
      `;
    }).join('');

    return `
      <!-- 4 Classic Electrolysis System Selector -->
      <div class="lab-presets-row echem-presets-row">
        <span class="lab-presets-label">${d.electroSystemLabel}</span>
        <div class="lab-presets-list">${sysChipsHTML}</div>
      </div>

      <!-- Polarity Reversal Highlight Banner -->
      <div class="echem-polarity-banner">
        <div class="echem-polarity-title">${d.polarityCompareTitle}</div>
        <div class="echem-polarity-grid">
          <div class="echem-pol-pill is-el-anode">${d.polarityAnodeBox}</div>
          <div class="echem-pol-pill is-el-cathode">${d.polarityCathodeBox}</div>
        </div>
      </div>

      <!-- Pure-SVG Electrolytic Cell Stage -->
      <div class="echem-visual-stage">
        ${buildElectrolysisSVG(sys)}
      </div>

      <!-- Half-Reactions & Overall Equation -->
      <div class="echem-rxn-grid">
        <div class="echem-rxn-box is-el-anode">
          <div class="echem-rxn-head">
            <span class="echem-eyebrow">${d.elHalfAnodeEyebrow}</span>
          </div>
          <div class="echem-rxn-eq">${sys.anodeHalf}</div>
        </div>
        <div class="echem-rxn-box is-el-cathode">
          <div class="echem-rxn-head">
            <span class="echem-eyebrow">${d.elHalfCathodeEyebrow}</span>
          </div>
          <div class="echem-rxn-eq">${sys.cathodeHalf}</div>
        </div>
      </div>

      <div class="echem-overall-box">
        <div class="echem-overall-head">
          <span class="echem-eyebrow">${d.elOverallEyebrow}</span>
          <span class="echem-lcm-badge">${isEn ? sys.badgeEn : sys.badgeVi}</span>
        </div>
        <div class="echem-overall-eq">${isEn ? sys.overallEqEn : sys.overallEq}</div>
      </div>

      <!-- Phenomenon & Mechanism Notes -->
      <div class="rxn-explain-grid">
        <div class="rxn-explain-block">
          <span class="rxn-explain-eyebrow">${d.phenomenonEyebrow}</span>
          <p class="rxn-explain-text">${isEn ? sys.phenomenonEn : sys.phenomenonVi}</p>
        </div>
        <div class="rxn-explain-block">
          <span class="rxn-explain-eyebrow">${d.mechanismEyebrow}</span>
          <p class="rxn-explain-text">${isEn ? sys.ruleNoteEn : sys.ruleNoteVi}</p>
        </div>
      </div>

      <!-- Faraday's Law Calculator -->
      <div class="echem-faraday-card">
        <div class="echem-faraday-head">
          <span class="echem-eyebrow is-gold">${d.faradayTitle}</span>
          <span class="echem-faraday-formula">${d.faradayFormulaHint}</span>
        </div>

        <div class="echem-sliders-grid">
          <div class="echem-slider-box">
            <div class="echem-slider-top">
              <label for="echem-slider-i">${d.sliderCurrentLabel}</label>
              <strong id="echem-val-i">${state.currentAmp.toFixed(1)} A</strong>
            </div>
            <input type="range" id="echem-slider-i" class="echem-range"
                   min="0.5" max="10" step="0.5" value="${state.currentAmp}" />
          </div>

          <div class="echem-slider-box">
            <div class="echem-slider-top">
              <label for="echem-slider-t">${d.sliderTimeLabel}</label>
              <strong id="echem-val-t">${state.timeSec} s (${mins} ${d.minutesUnit})</strong>
            </div>
            <input type="range" id="echem-slider-t" class="echem-range"
                   min="60" max="3600" step="60" value="${state.timeSec}" />
          </div>
        </div>

        <div class="echem-faraday-results">
          <div class="echem-f-metric">
            <span class="echem-f-lbl">${d.chargeLabel}</span>
            <strong class="echem-f-val" id="echem-out-q">${metrics.Q.toFixed(0)} C</strong>
          </div>
          <div class="echem-f-metric">
            <span class="echem-f-lbl">${d.molElectronLabel}</span>
            <strong class="echem-f-val" id="echem-out-ne">${metrics.nE.toFixed(4)} mol e⁻</strong>
          </div>
          <div class="echem-f-metric is-highlight">
            <span class="echem-f-lbl">${d.cathodeYieldLabel}</span>
            <strong class="echem-f-val" id="echem-out-cat-main">${metrics.cathodeMain}</strong>
            <span class="echem-f-sub" id="echem-out-cat-sub">${metrics.cathodeSub}</span>
          </div>
          <div class="echem-f-metric is-highlight">
            <span class="echem-f-lbl">${d.anodeYieldLabel}</span>
            <strong class="echem-f-val" id="echem-out-ano-main">${metrics.anodeMain}</strong>
            <span class="echem-f-sub" id="echem-out-ano-sub">${metrics.anodeSub}</span>
          </div>
        </div>
      </div>
    `;
  }

  function render() {
    if (!hostEl) return;
    const d = dict();
    const isGalvanic = state.mode === 'galvanic';

    hostEl.innerHTML = `
      <div class="echem-mode-bar">
        <div class="echem-mode-tabs" role="tablist">
          <button type="button" class="echem-mode-btn ${isGalvanic ? 'active' : ''}" data-ec-mode="galvanic">
            ${d.modeGalvanic}
          </button>
          <button type="button" class="echem-mode-btn ${!isGalvanic ? 'active' : ''}" data-ec-mode="electrolysis">
            ${d.modeElectrolysis}
          </button>
        </div>
        <span class="echem-mode-badge">
          ${isGalvanic ? d.modeGalvanicBadge : d.modeElectrolysisBadge}
        </span>
      </div>

      ${isGalvanic ? renderGalvanicSection() : renderElectrolysisSection()}
    `;
  }

  function bindEvents() {
    if (!hostEl) return;

    hostEl.addEventListener('click', (e) => {
      const modeBtn = e.target.closest('[data-ec-mode]');
      if (modeBtn) {
        const nextMode = modeBtn.dataset.ecMode;
        if (nextMode && nextMode !== state.mode) {
          state.mode = nextMode;
          render();
        }
        return;
      }

      const presetBtn = e.target.closest('[data-ec-preset-left]');
      if (presetBtn) {
        state.leftCoupleId = presetBtn.dataset.ecPresetLeft;
        state.rightCoupleId = presetBtn.dataset.ecPresetRight;
        render();
        return;
      }

      const swapBtn = e.target.closest('#echem-swap-beakers');
      if (swapBtn) {
        const tmp = state.leftCoupleId;
        state.leftCoupleId = state.rightCoupleId;
        state.rightCoupleId = tmp;
        render();
        return;
      }

      const sysBtn = e.target.closest('[data-ec-sys]');
      if (sysBtn) {
        const sysId = sysBtn.dataset.ecSys;
        if (sysId && sysId !== state.electroSystemId) {
          state.electroSystemId = sysId;
          render();
        }
      }
    });

    hostEl.addEventListener('change', (e) => {
      if (e.target.id === 'echem-select-left') {
        state.leftCoupleId = e.target.value;
        render();
      } else if (e.target.id === 'echem-select-right') {
        state.rightCoupleId = e.target.value;
        render();
      }
    });

    hostEl.addEventListener('input', (e) => {
      if (e.target.id === 'echem-slider-i') {
        state.currentAmp = parseFloat(e.target.value) || 0.5;
        updateFaradayReadout();
      } else if (e.target.id === 'echem-slider-t') {
        state.timeSec = parseInt(e.target.value, 10) || 60;
        updateFaradayReadout();
      }
    });
  }

  function init(opts = {}) {
    if (opts.getLang) {
      callbacks.getLang = opts.getLang;
    }
    state.lang = callbacks.getLang() || 'vi';
    hostEl = document.getElementById('lab-panel-electrochem');
    if (!hostEl) return;

    if (!state.initialized) {
      state.initialized = true;
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
    const d = ELECTRO_I18N[l];
    return {
      title: d.title,
      subtitle: d.subtitle,
      footerHint: d.footerHint
    };
  }

  window.ElectrochemLab = {
    init,
    setLang,
    getHeaderTexts
  };
})();
