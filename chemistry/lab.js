// Interactive Periodic Table — Bonding Lab Controller (lab.js)
// Predicts chemical bonding from window.ELEMENTS (electronegativity, macro, category, shells),
// provides ~40 curated compounds/alloys, interactive searchable element pickers,
// bilingual VI/EN support, and animated inline SVG electron visualizations.

(function () {
  const SAMPLE_PAIRS = [
    ['Na', 'Cl'],
    ['H', 'O'],
    ['C', 'O'],
    ['Mg', 'O'],
    ['Fe', 'Cu'],
    ['He', 'Ne']
  ];

  // Curated lookup table keyed by alphabetically sorted symbol pair "Sym1-Sym2"
  const KNOWN_COMPOUNDS = {
    'Cl-Na': {
      formula: 'NaCl',
      kind: 'compound',
      viName: 'Natri clorua (Muối ăn)',
      enName: 'Sodium Chloride (Table Salt)',
      viDesc: 'Tinh thể ion màu trắng quen thuộc trong ẩm thực, bảo quản thực phẩm và cân bằng điện giải cơ thể.',
      enDesc: 'Iconic white ionic crystal essential for seasoning, food preservation, and biological electrolyte balance.'
    },
    'H-O': {
      formula: 'H₂O',
      kind: 'compound',
      viName: 'Nước',
      enName: 'Water',
      viDesc: 'Phân tử cộng hóa trị phân cực hình chữ V có liên kết hiđro mạnh — dung môi nền tảng của sự sống.',
      enDesc: 'Bent polar covalent molecule with strong hydrogen bonding — the universal solvent of life.'
    },
    'C-O': {
      formula: 'CO₂',
      kind: 'compound',
      viName: 'Cacbon đioxit',
      enName: 'Carbon Dioxide',
      viDesc: 'Khí không màu gồm 2 liên kết đôi C=O phân cực đối xứng thẳng hàng; nguyên liệu cho quang hợp thực vật.',
      enDesc: 'Linear gas with two polar C=O double bonds; vital to plant photosynthesis and Earth’s carbon cycle.'
    },
    'Cl-H': {
      formula: 'HCl',
      kind: 'compound',
      viName: 'Hiđro clorua (Axit clohiđric)',
      enName: 'Hydrogen Chloride (Hydrochloric Acid)',
      viDesc: 'Khí cộng hóa trị phân cực mạnh, tan rất tốt trong nước tạo axit mạnh có cả trong dịch vị dạ dày.',
      enDesc: 'Strongly polar covalent gas that dissolves readily in water to form a strong acid also found in stomach fluid.'
    },
    'H-N': {
      formula: 'NH₃',
      kind: 'compound',
      viName: 'Amoniac',
      enName: 'Ammonia',
      viDesc: 'Khí mùi khai có cấu trúc chóp tam giác phân cực, nguyên liệu cốt lõi sản xuất phân đạm toàn cầu.',
      enDesc: 'Pungent trigonal-pyramidal polar gas, the backbone of global nitrogen fertilizer manufacturing.'
    },
    'C-H': {
      formula: 'CH₄',
      kind: 'compound',
      viName: 'Metan',
      enName: 'Methane',
      viDesc: 'Hiđrocacbon đơn giản nhất có cấu trúc tứ diện đều không cực — thành phần chính của khí thiên nhiên.',
      enDesc: 'Simplest hydrocarbon with a symmetric nonpolar tetrahedral shape — primary component of natural gas.'
    },
    'Ca-O': {
      formula: 'CaO',
      kind: 'compound',
      viName: 'Canxi oxit (Vôi sống)',
      enName: 'Calcium Oxide (Quicklime)',
      viDesc: 'Chất rắn ion nhiệt độ nóng chảy rất cao, tỏa nhiệt mạnh khi tác dụng với nước; dùng trong xây dựng và luyện thép.',
      enDesc: 'High-melting ionic solid reacting exothermically with water; widely used in construction and steelmaking.'
    },
    'Cl-Mg': {
      formula: 'MgCl₂',
      kind: 'compound',
      viName: 'Magie clorua',
      enName: 'Magnesium Chloride',
      viDesc: 'Muối ion dễ hút ẩm có nhiều trong nước biển, dùng làm chất đông tụ đậu phụ và chống đóng băng đường.',
      enDesc: 'Hygroscopic ionic salt abundant in seawater, used as a tofu coagulant and road de-icer.'
    },
    'Mg-O': {
      formula: 'MgO',
      kind: 'compound',
      viName: 'Magie oxit',
      enName: 'Magnesium Oxide',
      viDesc: 'Tinh thể ion siêu bền nhiệt (~2852°C) tạo thành khi đốt cháy magie sáng chói, dùng làm gạch chịu lửa.',
      enDesc: 'Ultra-refractory ionic crystal (~2852°C) formed when magnesium burns brightly; used in furnace linings.'
    },
    'Al-O': {
      formula: 'Al₂O₃',
      kind: 'compound',
      viName: 'Nhôm oxit (Corundum)',
      enName: 'Aluminium Oxide (Alumina)',
      viDesc: 'Lớp oxit siêu cứng bảo vệ nhôm khỏi ăn mòn; dạng tinh thể tinh khiết tạo nên đá quý hồng ngọc và lam ngọc.',
      enDesc: 'Ultra-hard oxide shielding aluminium from corrosion; crystalline forms produce ruby and sapphire gemstones.'
    },
    'Fe-O': {
      formula: 'Fe₂O₃',
      kind: 'compound',
      viName: 'Sắt(III) oxit (Quặng hematit / Gỉ sắt)',
      enName: 'Iron(III) Oxide (Hematite / Rust)',
      viDesc: 'Oxit màu nâu đỏ tạo nên sắc đỏ của hành tinh Sao Hỏa, quặng khai thác sắt chính và lớp gỉ sắt tự nhiên.',
      enDesc: 'Reddish-brown oxide responsible for Mars’s rusty color, primary iron ore, and familiar steel rust.'
    },
    'Br-K': {
      formula: 'KBr',
      kind: 'compound',
      viName: 'Kali bromua',
      enName: 'Potassium Bromide',
      viDesc: 'Muối ion trong suốt với bức xạ hồng ngoại, ứng dụng rộng rãi trong quang phổ hồng ngoại (FTIR).',
      enDesc: 'Ionic salt transparent to infrared light, widely pressed into optical windows for FTIR spectroscopy.'
    },
    'F-Na': {
      formula: 'NaF',
      kind: 'compound',
      viName: 'Natri florua',
      enName: 'Sodium Fluoride',
      viDesc: 'Hợp chất ion có hiệu độ âm điện rất lớn, được bổ sung liều vi lượng trong kem đánh răng giúp ngừa sâu răng.',
      enDesc: 'Strongly ionic compound added in trace amounts to toothpaste to strengthen tooth enamel.'
    },
    'O-Si': {
      formula: 'SiO₂',
      kind: 'compound',
      viName: 'Silic đioxit (Thạch anh / Cát)',
      enName: 'Silicon Dioxide (Quartz / Silica)',
      viDesc: 'Mạng tinh thể cộng hóa trị cực bền tạo nên cát, thạch anh, thủy tinh và lớp cách điện trong vi mạch.',
      enDesc: 'Durable covalent network solid forming sand, quartz crystals, glass, and microchip insulating layers.'
    },
    'O-S': {
      formula: 'SO₂',
      kind: 'compound',
      viName: 'Lưu huỳnh đioxit',
      enName: 'Sulfur Dioxide',
      viDesc: 'Khí mùi hắc phát ra từ núi lửa và đốt nhiên liệu hóa thạch; chất trung gian chính sản xuất axit sunfuric.',
      enDesc: 'Pungent volcanic gas and industrial precursor to sulfuric acid; also used as a food preservative.'
    },
    'H-H': {
      formula: 'H₂',
      kind: 'molecule',
      viName: 'Khí Hiđro',
      enName: 'Hydrogen Gas',
      viDesc: 'Phân tử hai nguyên tử nhẹ nhất với liên kết đơn cộng hóa trị không cực; nhiên liệu sạch cho pin nhiên liệu.',
      enDesc: 'Lightest diatomic molecule held by a nonpolar single bond; clean fuel for rockets and fuel cells.'
    },
    'O-O': {
      formula: 'O₂',
      kind: 'molecule',
      viName: 'Khí Oxi',
      enName: 'Oxygen Gas',
      viDesc: 'Phân tử cộng hóa trị không cực với liên kết đôi O=O, chiếm 21% không khí và duy trì sự sống trên Trái Đất.',
      enDesc: 'Nonpolar diatomic molecule with an O=O double bond, making up 21% of air and powering aerobic life.'
    },
    'N-N': {
      formula: 'N₂',
      kind: 'molecule',
      viName: 'Khí Nitơ',
      enName: 'Nitrogen Gas',
      viDesc: 'Sở hữu liên kết ba N≡N cộng hóa trị không cực cực kỳ bền vững, khiến khí nitơ rất trơ ở nhiệt độ thường.',
      enDesc: 'Contains an exceptionally strong nonpolar N≡N triple bond, rendering atmospheric nitrogen largely inert.'
    },
    'Cl-Cl': {
      formula: 'Cl₂',
      kind: 'molecule',
      viName: 'Khí Clo',
      enName: 'Chlorine Gas',
      viDesc: 'Phân tử halogen màu vàng lục có liên kết đơn Cl–Cl không cực, dùng khử trùng nước và tổng hợp hóa chất.',
      enDesc: 'Yellow-green diatomic halogen with a nonpolar Cl–Cl bond, used in water disinfection and PVC synthesis.'
    },
    'F-F': {
      formula: 'F₂',
      kind: 'molecule',
      viName: 'Khí Flo',
      enName: 'Fluorine Gas',
      viDesc: 'Phân tử cộng hóa trị không cực nhưng có năng lượng liên kết yếu nên cực kỳ hoạt động hóa học.',
      enDesc: 'Nonpolar diatomic halogen whose weak F–F bond makes it the most chemically reactive element.'
    },
    'F-Li': {
      formula: 'LiF',
      kind: 'compound',
      viName: 'Liti florua',
      enName: 'Lithium Fluoride',
      viDesc: 'Tinh thể ion có năng lượng mạng lưới lớn, truyền tia cực tím tốt nhất trong các vật liệu quang học.',
      enDesc: 'Tightly bound ionic crystal prized for exceptional UV transmission in specialized optics.'
    },
    'Ca-Cl': {
      formula: 'CaCl₂',
      kind: 'compound',
      viName: 'Canxi clorua',
      enName: 'Calcium Chloride',
      viDesc: 'Muối ion hút ẩm cực mạnh dùng làm gói chống ẩm, tan băng tuyết mùa đông và tăng độ cứng thực phẩm.',
      enDesc: 'Strongly hygroscopic ionic salt used in moisture absorbers, winter de-icing, and food firming.'
    },
    'Cl-K': {
      formula: 'KCl',
      kind: 'compound',
      viName: 'Kali clorua',
      enName: 'Potassium Chloride',
      viDesc: 'Muối ion vị mặn dùng làm phân kali nông nghiệp và muối thay thế ít natri trong y học.',
      enDesc: 'Ionic salt essential for agricultural potash fertilizers and low-sodium dietary salt substitutes.'
    },
    'F-H': {
      formula: 'HF',
      kind: 'compound',
      viName: 'Hiđro florua (Axit flohiđric)',
      enName: 'Hydrogen Fluoride (Hydrofluoric Acid)',
      viDesc: 'Phân tử cộng hóa trị phân cực mạnh nhất có liên kết hiđro rất bền; đặc biệt có khả năng ăn mòn thủy tinh.',
      enDesc: 'Intensely polar covalent molecule with powerful hydrogen bonding; uniquely able to etch silicate glass.'
    },
    'H-S': {
      formula: 'H₂S',
      kind: 'compound',
      viName: 'Hiđro sunfua',
      enName: 'Hydrogen Sulfide',
      viDesc: 'Khí độc không màu có mùi trứng thối đặc trưng, thường xuất hiện tại suối nước nóng và khí núi lửa.',
      enDesc: 'Colorless toxic gas with a signature rotten-egg odor, naturally present in hot springs and volcanic vents.'
    },
    'Na-O': {
      formula: 'Na₂O',
      kind: 'compound',
      viName: 'Natri oxit',
      enName: 'Sodium Oxide',
      viDesc: 'Oxit bazơ ion phản ứng mạnh với nước tạo NaOH; thành phần quan trọng giúp hạ nhiệt độ nóng chảy của thủy tinh.',
      enDesc: 'Basic ionic oxide that reacts vigorously with water to form NaOH; key flux in glass manufacturing.'
    },
    'Cu-O': {
      formula: 'CuO',
      kind: 'compound',
      viName: 'Đồng(II) oxit',
      enName: 'Copper(II) Oxide',
      viDesc: 'Chất rắn màu đen dùng làm chất tạo màu gốm sứ, chất xúc tác và tiền chất vật liệu siêu dẫn nhiệt độ cao.',
      enDesc: 'Black solid used in ceramic glazes, catalysts, and high-temperature cuprate superconductors.'
    },
    'Fe-S': {
      formula: 'FeS₂ / FeS',
      kind: 'compound',
      viName: 'Sắt sunfua (Quặng Pyrit — "Vàng của kẻ ngốc")',
      enName: 'Iron Sulfide (Pyrite — "Fool’s Gold")',
      viDesc: 'Tinh thể ánh kim vàng đồng lấp lánh dễ nhầm với vàng thật, dùng làm nguyên liệu sản xuất axit sunfuric.',
      enDesc: 'Brassy metallic crystals famously mistaken for gold; historically used to produce sulfuric acid.'
    },
    'Cu-Fe': {
      formula: 'Fe–Cu',
      kind: 'alloy',
      viName: 'Hợp kim Sắt – Đồng',
      enName: 'Iron–Copper Alloy',
      viDesc: 'Kết hợp độ bền cơ học của sắt với khả năng dẫn nhiệt và chống ăn mòn của đồng trong luyện kim bột và ổ trục.',
      enDesc: 'Combines iron’s mechanical strength with copper’s thermal conductivity in sintered bearings and metallurgy.'
    },
    'Cu-Zn': {
      formula: 'Cu–Zn',
      kind: 'alloy',
      viName: 'Đồng thau (Brass)',
      enName: 'Brass Alloy',
      viDesc: 'Hợp kim ánh vàng rực rỡ dễ gia công và chống ăn mòn, nổi tiếng trong nhạc cụ kèn đồng, khóa và van nước.',
      enDesc: 'Bright gold-toned alloy prized for acoustic resonance in brass instruments, hardware, and plumbing fittings.'
    },
    'Cu-Sn': {
      formula: 'Cu–Sn',
      kind: 'alloy',
      viName: 'Đồng thanh (Bronze)',
      enName: 'Bronze Alloy',
      viDesc: 'Hợp kim cứng bền làm nên cả Thời đại Đồ đồng, ngày nay dùng đúc tượng, chuông và chân vịt tàu biển.',
      enDesc: 'Hard, corrosion-resistant alloy that defined the Bronze Age; used in sculptures, bells, and marine parts.'
    },
    'Cr-Fe': {
      formula: 'Fe–Cr',
      kind: 'alloy',
      viName: 'Thép không gỉ (Inox)',
      enName: 'Stainless Steel Base Alloy',
      viDesc: 'Crom tạo lớp màng oxit thụ động siêu mỏng giúp nền thép sắt chống gỉ sét bền bỉ trong y tế và gia dụng.',
      enDesc: 'Chromium forms a self-healing passive oxide layer that makes iron-based stainless steel rust-resistant.'
    },
    'Ag-Cl': {
      formula: 'AgCl',
      kind: 'compound',
      viName: 'Bạc clorua',
      enName: 'Silver Chloride',
      viDesc: 'Kết tủa trắng nhạy sáng, từng là nền tảng của phim ảnh truyền thống và tròng kính đổi màu photochromic.',
      enDesc: 'Light-sensitive white precipitate foundational to traditional photography and photochromic eyeglass lenses.'
    },
    'N-O': {
      formula: 'NO₂',
      kind: 'compound',
      viName: 'Nitơ đioxit',
      enName: 'Nitrogen Dioxide',
      viDesc: 'Khí màu nâu đỏ có liên kết cộng hóa trị phân cực, chất trung gian quan trọng trong sản xuất axit nitric.',
      enDesc: 'Reddish-brown polar covalent gas serving as a key intermediate in nitric acid production.'
    },
    'Al-Cl': {
      formula: 'AlCl₃',
      kind: 'compound',
      viName: 'Nhôm clorua',
      enName: 'Aluminium Chloride',
      viDesc: 'Chất xúc tác axit Lewis kinh điển trong tổng hợp hữu cơ (phản ứng Friedel–Crafts) và lọc hóa dầu.',
      enDesc: 'Classic Lewis-acid catalyst powering organic synthesis (Friedel–Crafts reactions) and petrochemicals.'
    },
    'C-Cl': {
      formula: 'CCl₄',
      kind: 'compound',
      viName: 'Cacbon tetraclorua',
      enName: 'Carbon Tetrachloride',
      viDesc: 'Gồm 4 liên kết C–Cl phân cực đối xứng tứ diện nên cả phân tử không phân cực; từng dùng làm dung môi hữu cơ.',
      enDesc: 'Contains four polar C–Cl bonds arranged symmetrically into a nonpolar tetrahedral solvent molecule.'
    },
    'I-K': {
      formula: 'KI',
      kind: 'compound',
      viName: 'Kali iotua',
      enName: 'Potassium Iodide',
      viDesc: 'Muối ion bổ sung iot vào muối ăn giúp phòng bướu cổ và bảo vệ tuyến giáp trước bức xạ iot phóng xạ.',
      enDesc: 'Ionic salt added to iodized table salt to support thyroid health and block radioactive iodine uptake.'
    },
    'C-C': {
      formula: 'C–C',
      kind: 'molecule',
      viName: 'Mạng cộng hóa trị Cacbon (Kim cương / Than chì)',
      enName: 'Carbon Covalent Network (Diamond / Graphite)',
      viDesc: 'Liên kết cộng hóa trị không cực giữa các nguyên tử C tạo nên vật liệu cứng nhất tự nhiên (kim cương) hoặc graphene siêu bền.',
      enDesc: 'Nonpolar carbon–carbon covalent networks form nature’s hardest crystal (diamond) and ultra-strong graphene.'
    },
    'F-Xe': {
      formula: 'XeF₄ / XeF₂',
      kind: 'extreme',
      viName: 'Xenon florua (Hợp chất khí hiếm)',
      enName: 'Xenon Fluorides (Noble Gas Compound)',
      viDesc: 'Được tổng hợp lần đầu năm 1962 — phá vỡ quan niệm cũ rằng khí hiếm hoàn toàn không thể tạo liên kết.',
      enDesc: 'First synthesized in 1962 — overturning the dogma that noble gases can never form chemical bonds.'
    },
    'F-Kr': {
      formula: 'KrF₂',
      kind: 'extreme',
      viName: 'Kripton điflorua (Hợp chất khí hiếm)',
      enName: 'Krypton Difluoride (Noble Gas Compound)',
      viDesc: 'Chất oxi hóa cực mạnh chỉ tổng hợp được ở nhiệt độ siêu lạnh dưới tác dụng tia UV hoặc phóng điện.',
      enDesc: 'Powerful oxidizer synthesized only at cryogenic temperatures using UV irradiation or electrical discharge.'
    }
  };

  const LAB_I18N = {
    vi: {
      title: 'Phòng Lab Ghép Đôi & Dự Đoán Liên Kết',
      subtitle: 'Chọn 2 nguyên tố để phân tích độ âm điện, kiểu liên kết hóa học và xem mô phỏng electron',
      tabBonding: 'Liên kết nguyên tử',
      tabBondingSub: 'Phân tích Δχ, kiểu liên kết & mô phỏng electron',
      tabReactions: 'Phản ứng hóa học',
      tabReactionsSub: 'Dự đoán sản phẩm, cân bằng & minh họa phân tử',
      tabOrganic: 'Lắp ráp phân tử',
      tabOrganicSub: 'Xếp mạch thẳng, nhánh & mạch vòng 2D',
      presetsLabel: 'Cặp mẫu thú vị:',
      slotA: 'Nguyên tố A',
      slotB: 'Nguyên tố B',
      searchPlaceholderA: 'Tìm nguyên tố A (Na, 11, Natri)...',
      searchPlaceholderB: 'Tìm nguyên tố B (Cl, 17, Clo)...',
      swapTitle: 'Hoán đổi nguyên tố A và B',
      footerHint: 'Mẹo: Nhập số hiệu (26), ký hiệu (Fe) hoặc tên Việt/Anh không dấu để chọn nhanh nguyên tố.',
      close: 'Đóng',
      noResults: 'Không tìm thấy nguyên tố phù hợp',
      valenceShort: 'e⁻ ngoài',
      enegLabel: 'χ',
      naShort: 'Chưa rõ',
      bondLabels: {
        'noble-gas': 'Không phản ứng ở điều kiện thường (Khí hiếm bền vững)',
        'metallic': 'Liên kết kim loại / Tạo hợp kim',
        'ionic': 'Liên kết ion (Ionic Bond)',
        'polar-covalent': 'Liên kết cộng hóa trị có cực',
        'nonpolar-covalent': 'Liên kết cộng hóa trị không cực',
        'unknown-superheavy': 'Chưa xác định độ âm điện thực nghiệm'
      },
      nobleHumorBoth:
        'Cả hai đều là "hội hướng nội hoàn hảo" của bảng tuần hoàn — lớp vỏ electron đã kín bưng nên chúng chỉ gật đầu chào nhau từ xa rồi ai về nhà nấy!',
      nobleHumorSingle:
        'Nguyên tử khí hiếm đã có lớp vỏ electron ngoài cùng kín và cực kỳ mãn nguyện — nó lịch sự từ chối mọi lời mời góp chung hay trao đổi electron ở điều kiện thường!',
      nobleExtremeXe:
        'Ngoại lệ thú vị: Dưới điều kiện khắc nghiệt (áp suất cao, tia UV hoặc phóng điện), Flo siêu âm điện vẫn có thể "ép" Xenon tạo ra các hợp chất đặc biệt như XeF₂, XeF₄, XeF₆!',
      nobleExtremeKr:
        'Ngoại lệ thú vị: Ở nhiệt độ siêu lạnh kèm phóng điện hoặc tia UV, Flo cực mạnh vẫn có thể ép Kripton tạo hợp chất hiếm KrF₂!',
      metallicSameDesc:
        'Hai nguyên tử cùng một kim loại liên kết qua mạng tinh thể ion dương bao quanh bởi "biển electron tự do", giúp dẫn điện và dẫn nhiệt tốt.',
      metallicAlloyDesc:
        'Hai nguyên tố đều là kim loại: chúng không trao đổi ion mà hòa trộn các electron hóa trị vào một "biển electron tự do" chung, có thể kết hợp tạo thành hợp kim.',
      metallicSuperheavyNote:
        'Lưu ý: Một trong hai là nguyên tố siêu nặng phóng xạ có chu kì bán rã cực ngắn và chưa xác định độ âm điện thực nghiệm, nên hợp kim vĩ mô chưa thể tạo ra ngoài phòng thí nghiệm hạt nhân.',
      superheavyDesc:
        'Ít nhất một nguyên tố trong cặp này là nguyên tố siêu nặng / phóng xạ nhân tạo chưa có giá trị độ âm điện Pauling thực nghiệm, vì vậy chưa thể tính chính xác Δχ để dự đoán kiểu liên kết.',
      ionicDesc: (donor, acceptor, dChi) =>
        `Hiệu độ âm điện lớn (Δχ = ${dChi} ≥ 1.7) giữa kim loại ${donor} và phi kim ${acceptor}: ${donor} nhường electron lớp ngoài cho ${acceptor} để tạo cặp ion trái dấu hút nhau bằng lực tĩnh điện mạnh.`,
      polarNonmetalNote: (low, high, dChi, hasMetalloid) =>
        hasMetalloid
          ? `Tuy Δχ = ${dChi} ≥ 1.7, nhưng cả ${low} và ${high} đều không phải kim loại (á kim – phi kim) nên không tạo mạng ion điển hình mà hình thành liên kết cộng hóa trị có cực mạnh, cặp electron dùng chung lệch hẳn về phía ${high}.`
          : `Tuy Δχ = ${dChi} ≥ 1.7, nhưng cả ${low} và ${high} đều là phi kim nên không tạo mạng ion điển hình mà hình thành liên kết cộng hóa trị có cực mạnh, cặp electron dùng chung lệch hẳn về phía ${high}.`,
      polarDesc: (low, high, dChi) =>
        `Hiệu độ âm điện Δχ = ${dChi} (0.4 ≤ Δχ < 1.7): hai nguyên tử góp chung electron, nhưng ${high} có độ âm điện cao hơn nên kéo mây electron dùng chung lệch về phía mình (tạo cực δ− tại ${high} và δ+ tại ${low}).`,
      nonpolarSameDesc: (sym) =>
        `Hai nguyên tử ${sym} giống hệt nhau nên Δχ = 0.00: chúng góp chung cặp electron hoàn toàn đối xứng ở chính giữa, không tạo cực điện.`,
      nonpolarDesc: (a, b, dChi) =>
        `Hiệu độ âm điện rất nhỏ (Δχ = ${dChi} < 0.4): ${a} và ${b} hút electron gần như ngang nhau nên cặp electron góp chung phân bố khá đồng đều giữa hai hạt nhân.`,
      eyebrowCompound: 'Hợp chất phổ biến',
      eyebrowAlloy: 'Hợp kim tiêu biểu',
      eyebrowMolecule: 'Đơn chất / Phân tử tiêu biểu',
      eyebrowExtreme: 'Hợp chất điều kiện khắc nghiệt',
      eyebrowGeneric: 'Dự đoán tổ hợp',
      genericNobleFormula: 'Không tạo hợp chất',
      genericNobleName: 'Hỗn hợp khí trơ',
      genericNobleDesc: 'Hai nguyên tố tồn tại độc lập dưới dạng nguyên tử đơn lẻ mà không liên kết hóa học ở điều kiện thường.',
      genericAlloyName: (a, b) => `Hợp kim / Hỗn hợp kim loại ${a}–${b}`,
      genericAlloyDesc: 'Trong mạng kim loại, electron hóa trị chuyển động tự do giữa các cation, tạo tính dẻo và độ dẫn điện đặc trưng.',
      genericSuperheavyFormula: 'Chưa xác định',
      genericSuperheavyName: 'Nguyên tố phóng xạ siêu nặng',
      genericSuperheavyDesc: 'Chỉ tổng hợp được vài nguyên tử trong máy gia tốc hạt; các tính chất hóa học chủ yếu dựa trên mô phỏng lượng tử tương đối tính.',
      genericBondName: (a, b) => `Tổ hợp ${a} + ${b}`,
      genericIonicDesc: (d, a) => `Xu hướng tạo hợp chất ion giữa cation ${d}⁺ và anion ${a}⁻ nhờ lực hút tĩnh điện mạnh.`,
      genericPolarDesc: (l, h) => `Xu hướng tạo liên kết cộng hóa trị phân cực với cặp electron dùng chung lệch về phía ${h}.`,
      genericNonpolarDesc: 'Xu hướng tạo liên kết cộng hóa trị gần như không phân cực do chênh lệch độ âm điện rất nhỏ.',
      svg: {
        ionicTitle: 'CHUYỂN ELECTRON (LIÊN KẾT ION)',
        polarTitle: 'GÓP CHUNG ELECTRON LỆCH (CỘNG HÓA TRỊ CÓ CỰC)',
        nonpolarTitle: 'GÓP CHUNG ELECTRON ĐỐI XỨNG (CỘNG HÓA TRỊ KHÔNG CỰC)',
        metallicTitle: 'BIỂN ELECTRON TỰ DO (LIÊN KẾT KIM LOẠI / HỢP KIM)',
        nobleTitle: 'LỚP VỎ KÍN BỀN VỮNG (KHÔNG PHẢN ỨNG)',
        unknownTitle: 'NGUYÊN TỐ SIÊU NẶNG — CHƯA XÁC ĐỊNH ĐỘ ÂM ĐIỆN',
        transferLabel: 'nhường e⁻',
        electrostatic: 'hút tĩnh điện',
        sharedShift: 'cặp e⁻ lệch về',
        sharedEqual: 'góp chung đều',
        seaLabel: 'Biển electron tự do (e⁻)',
        repelLabel: 'Lớp vỏ bão hòa • Không liên kết',
        extremeSpark: '⚡ Điều kiện khắc nghiệt (UV / P↑)',
        unknownBridge: 'Δχ chưa xác định',
        outerShort: 'e⁻ ngoài'
      }
    },
    en: {
      title: 'Bonding Lab & Chemical Bond Predictor',
      subtitle: 'Pick any 2 elements to analyze electronegativity difference, bond type, and animated electron behavior',
      tabBonding: 'Atomic Bonding',
      tabBondingSub: 'Analyze Δχ, bond polarity & electron animation',
      tabReactions: 'Chemical Reactions',
      tabReactionsSub: 'Predict products, balance & animate molecules',
      tabOrganic: 'Molecule Builder',
      tabOrganicSub: 'Build 2D chains, branches & rings',
      presetsLabel: 'Interesting pairs:',
      slotA: 'Element A',
      slotB: 'Element B',
      searchPlaceholderA: 'Search element A (Na, 11, Sodium)...',
      searchPlaceholderB: 'Search element B (Cl, 17, Chlorine)...',
      swapTitle: 'Swap Element A and Element B',
      footerHint: 'Tip: Type an atomic number (26), symbol (Fe), or English/Vietnamese name to pick quickly.',
      close: 'Close',
      noResults: 'No matching elements found',
      valenceShort: 'valence e⁻',
      enegLabel: 'χ',
      naShort: 'N/A',
      bondLabels: {
        'noble-gas': 'No Reaction Under Normal Conditions (Stable Noble Gas)',
        'metallic': 'Metallic Bond / Alloy Formation',
        'ionic': 'Ionic Bond',
        'polar-covalent': 'Polar Covalent Bond',
        'nonpolar-covalent': 'Nonpolar Covalent Bond',
        'unknown-superheavy': 'Undetermined Experimental Electronegativity'
      },
      nobleHumorBoth:
        'Both atoms belong to the periodic table’s ultimate VIP introverts — with full outer shells, they simply nod politely from across the room and stay solo!',
      nobleHumorSingle:
        'With a completely filled valence shell, this noble gas is living its best solo life — politely declining all offers to borrow, lend, or share electrons under normal conditions!',
      nobleExtremeXe:
        'Special note: Under extreme conditions (high pressure, UV light, or electrical discharge), ultra-electronegative Fluorine can still force Xenon into rare compounds like XeF₂, XeF₄, and XeF₆!',
      nobleExtremeKr:
        'Special note: At cryogenic temperatures with UV radiation or electric discharge, Fluorine can coerce Krypton into forming the rare compound KrF₂!',
      metallicSameDesc:
        'Identical metal atoms pack into a positive ion lattice immersed in a shared "sea of delocalized electrons," giving high electrical and thermal conductivity.',
      metallicAlloyDesc:
        'Both elements are metals: rather than transferring electrons to form anions, their valence electrons delocalize into a shared "electron sea," enabling metallic bonding and alloy formation.',
      metallicSuperheavyNote:
        'Note: One element is a short-lived synthetic superheavy metal without experimental electronegativity, so bulk alloys cannot yet be formed outside particle accelerators.',
      superheavyDesc:
        'At least one selected element is a radioactive superheavy synthetic element lacking an experimental Pauling electronegativity value, so Δχ cannot be reliably calculated.',
      ionicDesc: (donor, acceptor, dChi) =>
        `Large electronegativity difference (Δχ = ${dChi} ≥ 1.7) between metal ${donor} and nonmetal ${acceptor}: ${donor} transfers valence electron(s) to ${acceptor}, forming oppositely charged ions bound by strong electrostatic attraction.`,
      polarNonmetalNote: (low, high, dChi, hasMetalloid) =>
        hasMetalloid
          ? `Although Δχ = ${dChi} ≥ 1.7, neither ${low} nor ${high} is a metal (metalloid–nonmetal pairing), so they form a strongly polar covalent bond rather than a classic ionic lattice, pulling the shared electron pair strongly toward ${high}.`
          : `Although Δχ = ${dChi} ≥ 1.7, both ${low} and ${high} are nonmetals, so they form a strongly polar covalent bond rather than a classic ionic salt, pulling the shared electron pair strongly toward ${high}.`,
      polarDesc: (low, high, dChi) =>
        `Electronegativity difference Δχ = ${dChi} (0.4 ≤ Δχ < 1.7): both atoms share valence electrons, but more electronegative ${high} pulls the shared electron density closer (creating δ− on ${high} and δ+ on ${low}).`,
      nonpolarSameDesc: (sym) =>
        `Two identical ${sym} atoms have Δχ = 0.00: they share their bonding electron pair symmetrically right down the middle with zero dipole.`,
      nonpolarDesc: (a, b, dChi) =>
        `Very small electronegativity difference (Δχ = ${dChi} < 0.4): ${a} and ${b} pull on electrons almost equally, distributing the shared electron cloud evenly.`,
      eyebrowCompound: 'Common Compound',
      eyebrowAlloy: 'Notable Alloy',
      eyebrowMolecule: 'Common Element Molecule / Network',
      eyebrowExtreme: 'Extreme-Condition Compound',
      eyebrowGeneric: 'Predicted Pairing',
      genericNobleFormula: 'No Compound',
      genericNobleName: 'Inert Atomic Mixture',
      genericNobleDesc: 'Atoms coexist independently without forming chemical bonds at standard temperature and pressure.',
      genericAlloyName: (a, b) => `${a}–${b} Metallic Alloy / Mixture`,
      genericAlloyDesc: 'Delocalized valence electrons flow freely around positive metal cores, imparting malleability and conductivity.',
      genericSuperheavyFormula: 'Undetermined',
      genericSuperheavyName: 'Superheavy Radioactive Element',
      genericSuperheavyDesc: 'Only a few atoms have ever been synthesized; bonding predictions rely on relativistic quantum simulations.',
      genericBondName: (a, b) => `${a} + ${b} Pairing`,
      genericIonicDesc: (d, a) => `Tends to form an ionic lattice of ${d}⁺ cations and ${a}⁻ anions via electrostatic attraction.`,
      genericPolarDesc: (l, h) => `Tends to form polar covalent bonds with shared electrons shifted toward ${h}.`,
      genericNonpolarDesc: 'Tends to form nearly nonpolar covalent bonds due to minimal electronegativity difference.',
      svg: {
        ionicTitle: 'ELECTRON TRANSFER (IONIC BOND)',
        polarTitle: 'UNEQUAL ELECTRON SHARING (POLAR COVALENT)',
        nonpolarTitle: 'EQUAL ELECTRON SHARING (NONPOLAR COVALENT)',
        metallicTitle: 'DELOCALIZED ELECTRON SEA (METALLIC / ALLOY)',
        nobleTitle: 'CLOSED VALENCE SHELL (NO REACTION)',
        unknownTitle: 'SUPERHEAVY ELEMENT — ELECTRONEGATIVITY UNKNOWN',
        transferLabel: 'e⁻ transfer',
        electrostatic: 'electrostatic attraction',
        sharedShift: 'shifted toward',
        sharedEqual: 'equal sharing',
        seaLabel: 'Delocalized Electron Sea (e⁻)',
        repelLabel: 'Full outer shell • No bonding',
        extremeSpark: '⚡ Extreme conditions (UV / High P)',
        unknownBridge: 'Δχ undetermined',
        outerShort: 'outer e⁻'
      }
    }
  };

  let state = {
    lang: 'vi',
    isOpen: false,
    activeTab: 'bonding', // 'bonding' | 'reactions'
    elA: null,
    elB: null,
    hasUserPickedB: false,
    openDropdown: null, // 'a' | 'b' | null
    highlightIndex: -1,
    filteredA: [],
    filteredB: []
  };

  let callbacks = {
    getLang: () => 'vi',
    onOpen: () => {},
    onClose: () => {}
  };

  let dom = {};

  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  }

  function findBySymbol(sym) {
    return window.ELEMENTS.find((e) => e.symbol === sym) || window.ELEMENTS[0];
  }

  function getCompoundKey(elA, elB) {
    return [elA.symbol, elB.symbol].sort().join('-');
  }

  function dict() {
    return LAB_I18N[state.lang] || LAB_I18N.vi;
  }

  function getElementDisplayName(el) {
    return state.lang === 'en' ? el.enName : el.name;
  }

  function searchElements(rawQuery) {
    const q = normalizeText(rawQuery);
    if (!q) return window.ELEMENTS.slice();

    if (/^\d+$/.test(q)) {
      const exact = window.ELEMENTS.filter((el) => String(el.number) === q);
      const prefix = window.ELEMENTS.filter(
        (el) => String(el.number).startsWith(q) && String(el.number) !== q
      );
      return exact.concat(prefix);
    }

    const exact = [];
    const prefix = [];
    const sub = [];

    window.ELEMENTS.forEach((el) => {
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
      } else if (vi.includes(q) || en.includes(q) || sym.includes(q)) {
        sub.push(el);
      }
    });

    return exact.concat(prefix, sub);
  }

  // Analyze bonding between Element A and Element B
  function analyzeBond(elA, elB) {
    const compound = KNOWN_COMPOUNDS[getCompoundKey(elA, elB)] || null;
    const enegA = elA.electronegativity;
    const enegB = elB.electronegativity;
    const hasBothEneg = enegA !== null && enegB !== null;
    const deltaChi = hasBothEneg ? Number(Math.abs(enegA - enegB).toFixed(2)) : null;

    const aIsNoble = elA.category === 'noble-gas';
    const bIsNoble = elB.category === 'noble-gas';

    // 1) Noble Gas rule
    if (aIsNoble || bIsNoble) {
      const syms = [elA.symbol, elB.symbol];
      let extremeNoble = null;
      if (syms.includes('F') && syms.includes('Xe')) extremeNoble = 'Xe';
      else if (syms.includes('F') && syms.includes('Kr')) extremeNoble = 'Kr';

      return {
        type: 'noble-gas',
        deltaChi,
        bothNoble: aIsNoble && bIsNoble,
        extremeNoble,
        donor: null,
        acceptor: null,
        compound
      };
    }

    // 2) Both Metals -> Metallic / Alloy
    if (elA.macro === 'metal' && elB.macro === 'metal') {
      return {
        type: 'metallic',
        deltaChi,
        sameElement: elA.number === elB.number,
        hasSuperheavy: !hasBothEneg,
        donor: null,
        acceptor: null,
        compound
      };
    }

    // 3) Missing Electronegativity (Superheavy radioactive elements)
    if (!hasBothEneg) {
      return {
        type: 'unknown-superheavy',
        deltaChi: null,
        donor: null,
        acceptor: null,
        compound
      };
    }

    // Determine lower-χ and higher-χ atom (preserve left=A, right=B positions separately)
    let lowEl = elA;
    let highEl = elB;
    if (enegB < enegA) {
      lowEl = elB;
      highEl = elA;
    }

    const neitherIsMetal = elA.macro !== 'metal' && elB.macro !== 'metal';

    // 4) Electronegativity difference + metallic/nonmetallic character
    if (deltaChi >= 1.7) {
      // Special chemical distinction: pairs with no metal (nonmetal + nonmetal e.g. H+F, or metalloid + nonmetal e.g. B+F, Si+F)
      // form strongly polar covalent bonds rather than classic ionic lattices
      if (neitherIsMetal) {
        return {
          type: 'polar-covalent',
          isNonmetalHighDelta: true,
          hasMetalloid: elA.macro === 'metalloid' || elB.macro === 'metalloid',
          deltaChi,
          donor: lowEl,
          acceptor: highEl,
          highSide: enegA > enegB ? 'a' : 'b',
          compound
        };
      }
      return {
        type: 'ionic',
        deltaChi,
        donor: lowEl,
        acceptor: highEl,
        donorSide: enegA <= enegB ? 'a' : 'b',
        compound
      };
    }

    if (deltaChi >= 0.4) {
      return {
        type: 'polar-covalent',
        isNonmetalHighDelta: false,
        deltaChi,
        donor: lowEl,
        acceptor: highEl,
        highSide: enegA > enegB ? 'a' : 'b',
        compound
      };
    }

    return {
      type: 'nonpolar-covalent',
      deltaChi,
      sameElement: elA.number === elB.number,
      donor: lowEl,
      acceptor: highEl,
      compound
    };
  }

  // Helper: render valence electrons around a ring, optionally skipping an angle window (for shared region)
  function renderValenceDots(cx, cy, radius, count, color, options = {}) {
    const {
      startAngle = -Math.PI / 2,
      skipAngle = null,
      skipHalfWidth = 0.45,
      fadeIndex = -1
    } = options;
    if (count <= 0) return '';

    const dotR = count > 10 ? 3.2 : count > 6 ? 4.2 : 4.8;
    const pieces = [];

    // Compute angles evenly outside the skipped sector if needed
    let angles = [];
    if (skipAngle === null) {
      for (let i = 0; i < count; i++) {
        angles.push(startAngle + (2 * Math.PI * i) / count);
      }
    } else {
      const avail = 2 * Math.PI - 2 * skipHalfWidth;
      const begin = skipAngle + skipHalfWidth;
      for (let i = 0; i < count; i++) {
        const frac = (i + 0.5) / count;
        angles.push(begin + frac * avail);
      }
    }

    angles.forEach((ang, idx) => {
      const x = (cx + radius * Math.cos(ang)).toFixed(1);
      const y = (cy + radius * Math.sin(ang)).toFixed(1);
      const isFaded = idx === fadeIndex;
      pieces.push(
        `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${color}" class="${
          isFaded ? 'svg-e-donor-ghost' : 'svg-e-dot'
        }" />`
      );
    });

    return pieces.join('');
  }

  // Build Animated Inline SVG for the current pair & bond classification
  function buildBondSVG(elA, elB, analysis) {
    const tSvg = dict().svg;
    const catA = window.ELEMENT_CATEGORIES[elA.category];
    const catB = window.ELEMENT_CATEGORIES[elB.category];
    const valA = elA.shells[elA.shells.length - 1];
    const valB = elB.shells[elB.shells.length - 1];
    const enegTextA = elA.electronegativity !== null ? `χ = ${elA.electronegativity.toFixed(2)}` : 'χ = ?';
    const enegTextB = elB.electronegativity !== null ? `χ = ${elB.electronegativity.toFixed(2)}` : 'χ = ?';

    const defs = `
      <defs>
        <radialGradient id="labGradA" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${catA.borderHover}" stop-opacity="0.95" />
          <stop offset="55%" stop-color="${catA.color}" stop-opacity="0.88" />
          <stop offset="100%" stop-color="${catA.bg}" stop-opacity="0.98" />
        </radialGradient>
        <radialGradient id="labGradB" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${catB.borderHover}" stop-opacity="0.95" />
          <stop offset="55%" stop-color="${catB.color}" stop-opacity="0.88" />
          <stop offset="100%" stop-color="${catB.bg}" stop-opacity="0.98" />
        </radialGradient>
        <radialGradient id="labCloudGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ca9444" stop-opacity="0.30" />
          <stop offset="65%" stop-color="#d4b47c" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#d4b47c" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="labNobleAuraA" cx="50%" cy="50%" r="50%">
          <stop offset="58%" stop-color="${catA.borderHover}" stop-opacity="0" />
          <stop offset="84%" stop-color="${catA.borderHover}" stop-opacity="0.22" />
          <stop offset="100%" stop-color="${catA.borderHover}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="labNobleAuraB" cx="50%" cy="50%" r="50%">
          <stop offset="58%" stop-color="${catB.borderHover}" stop-opacity="0" />
          <stop offset="84%" stop-color="${catB.borderHover}" stop-opacity="0.22" />
          <stop offset="100%" stop-color="${catB.borderHover}" stop-opacity="0" />
        </radialGradient>
        <marker id="labArrowIonic" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#ca9444" />
        </marker>
        <marker id="labArrowDipole" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#d4b47c" />
        </marker>
      </defs>
    `;

    let body = '';
    let bannerTitle = '';

    // --- 1. IONIC BOND ---
    if (analysis.type === 'ionic') {
      bannerTitle = tSvg.ionicTitle;
      const ax = 166;
      const bx = 474;
      const cy = 122;
      const shellR = 60;
      const donorIsA = analysis.donorSide === 'a';

      const fromX = donorIsA ? ax + 44 : bx - 44;
      const toX = donorIsA ? bx - 44 : ax + 44;
      const arcY = cy - 42;
      const ctrlY = 24;
      const arcPath = `M ${fromX} ${arcY} Q 320 ${ctrlY} ${toX} ${arcY}`;

      const dotsA = renderValenceDots(ax, cy, shellR, valA, '#d4b47c', {
        startAngle: donorIsA ? -Math.PI / 4 : Math.PI,
        fadeIndex: donorIsA ? 0 : -1
      });
      const dotsB = renderValenceDots(bx, cy, shellR, valB, '#d4b47c', {
        startAngle: donorIsA ? 0 : (-3 * Math.PI) / 4,
        fadeIndex: donorIsA ? -1 : 0
      });

      const chargeA = donorIsA ? '(+)' : '(-)';
      const chargeB = donorIsA ? '(-)' : '(+)';
      const chargeColorA = donorIsA ? '#d69e8e' : '#7eaec0';
      const chargeColorB = donorIsA ? '#7eaec0' : '#d69e8e';

      body = `
        <!-- Electrostatic attraction bridge -->
        <line x1="${ax + 72}" y1="${cy}" x2="${bx - 72}" y2="${cy}"
          stroke="rgba(148, 163, 184, 0.36)" stroke-width="2" stroke-dasharray="5 6" class="svg-dash-flow" />
        <text x="320" y="${cy + 18}" text-anchor="middle" class="svg-sub-caption">${tSvg.electrostatic}</text>

        <!-- Curved electron transfer arrow -->
        <path d="${arcPath}" fill="none" stroke="#ca9444" stroke-width="2.2"
          stroke-dasharray="7 5" marker-end="url(#labArrowIonic)" class="svg-transfer-arc" />
        <text x="320" y="42" text-anchor="middle" class="svg-highlight-caption">${tSvg.transferLabel}</text>

        <!-- Moving transferred electron orb -->
        <g>
          <circle cx="0" cy="0" r="6.8" fill="#f59e0b" stroke="#161922" stroke-width="1.6" />
          <text x="0" y="3" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0e1117">e⁻</text>
          <animateMotion dur="2.2s" repeatCount="indefinite" path="${arcPath}" />
        </g>

        <!-- Atom A -->
        <g class="svg-atom-group">
          <circle cx="${ax}" cy="${cy}" r="${shellR}" fill="none" stroke="${catA.borderHover}" stroke-opacity="0.48" stroke-width="1.5" stroke-dasharray="4 4" />
          ${dotsA}
          <circle cx="${ax}" cy="${cy}" r="31" fill="url(#labGradA)" stroke="${catA.borderHover}" stroke-width="2" />
          <text x="${ax}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elA.symbol}</text>
          <text x="${ax}" y="${cy + 78}" text-anchor="middle" class="svg-meta">${enegTextA} • ${valA} ${tSvg.outerShort}</text>
          <!-- Charge badge A -->
          <g class="svg-badge-pulse">
            <rect x="${ax - 88}" y="${cy - 68}" width="38" height="24" rx="12" fill="#161922" stroke="${chargeColorA}" stroke-width="1.5" />
            <text x="${ax - 69}" y="${cy - 52}" text-anchor="middle" class="svg-charge" fill="${chargeColorA}">${chargeA}</text>
          </g>
        </g>

        <!-- Atom B -->
        <g class="svg-atom-group">
          <circle cx="${bx}" cy="${cy}" r="${shellR}" fill="none" stroke="${catB.borderHover}" stroke-opacity="0.48" stroke-width="1.5" stroke-dasharray="4 4" />
          ${dotsB}
          <circle cx="${bx}" cy="${cy}" r="31" fill="url(#labGradB)" stroke="${catB.borderHover}" stroke-width="2" />
          <text x="${bx}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elB.symbol}</text>
          <text x="${bx}" y="${cy + 78}" text-anchor="middle" class="svg-meta">${enegTextB} • ${valB} ${tSvg.outerShort}</text>
          <!-- Charge badge B -->
          <g class="svg-badge-pulse">
            <rect x="${bx + 50}" y="${cy - 68}" width="38" height="24" rx="12" fill="#161922" stroke="${chargeColorB}" stroke-width="1.5" />
            <text x="${bx + 69}" y="${cy - 52}" text-anchor="middle" class="svg-charge" fill="${chargeColorB}">${chargeB}</text>
          </g>
        </g>
      `;
    }

    // --- 2. COVALENT BOND (POLAR & NONPOLAR) ---
    else if (analysis.type === 'polar-covalent' || analysis.type === 'nonpolar-covalent') {
      const isPolar = analysis.type === 'polar-covalent';
      bannerTitle = isPolar ? tSvg.polarTitle : tSvg.nonpolarTitle;

      const ax = 256;
      const bx = 384;
      const cy = 134;
      const shellR = 82; // Clean overlap lens from x=302 to x=338, top y=52, bottom y=216

      // Shift shared electron pair toward higher-χ atom when polar
      const shiftX = isPolar ? (analysis.highSide === 'a' ? -15 : 15) : 0;
      const shareX = 320 + shiftX;

      const nonSharedA = Math.max(0, valA - 1);
      const nonSharedB = Math.max(0, valB - 1);

      const dotsA = renderValenceDots(ax, cy, shellR, nonSharedA, '#d4b47c', {
        skipAngle: 0,
        skipHalfWidth: 0.62
      });
      const dotsB = renderValenceDots(bx, cy, shellR, nonSharedB, '#d4b47c', {
        skipAngle: Math.PI,
        skipHalfWidth: 0.62
      });

      // Dipole visual for polar covalent
      let polarityOverlay = '';
      if (isPolar) {
        const highIsA = analysis.highSide === 'a';
        const dA = highIsA ? 'δ−' : 'δ+';
        const dB = highIsA ? 'δ+' : 'δ−';
        const cA = highIsA ? '#7eaec0' : '#d69e8e';
        const cB = highIsA ? '#d69e8e' : '#7eaec0';
        const arrowX1 = highIsA ? 372 : 268;
        const arrowX2 = highIsA ? 268 : 372;
        const plusX = highIsA ? 366 : 274;
        const highSym = highIsA ? elA.symbol : elB.symbol;

        polarityOverlay = `
          <!-- Dipole arrow -->
          <line x1="${arrowX1}" y1="42" x2="${arrowX2}" y2="42" stroke="#d4b47c" stroke-width="2" marker-end="url(#labArrowDipole)" />
          <line x1="${plusX}" y1="36" x2="${plusX}" y2="48" stroke="#d4b47c" stroke-width="2" />
          <text x="320" y="33" text-anchor="middle" class="svg-highlight-caption" fill="#d4b47c">
            ${tSvg.sharedShift} ${highSym}
          </text>

          <!-- Partial charge badges δ+ / δ- -->
          <g class="svg-badge-pulse">
            <rect x="94" y="${cy - 14}" width="44" height="26" rx="13" fill="#161922" stroke="${cA}" stroke-width="1.5" />
            <text x="116" y="${cy + 4}" text-anchor="middle" class="svg-charge" fill="${cA}">${dA}</text>
          </g>
          <g class="svg-badge-pulse">
            <rect x="502" y="${cy - 14}" width="44" height="26" rx="13" fill="#161922" stroke="${cB}" stroke-width="1.5" />
            <text x="524" y="${cy + 4}" text-anchor="middle" class="svg-charge" fill="${cB}">${dB}</text>
          </g>
        `;
      } else {
        polarityOverlay = `
          <rect x="260" y="27" width="120" height="21" rx="10.5" fill="#172a22" stroke="#2e5c45" stroke-width="1.2" />
          <text x="320" y="41" text-anchor="middle" class="svg-highlight-caption" fill="#b5d6c3">${tSvg.sharedEqual}</text>
        `;
      }

      // Shared pair orbiting gently inside the overlap lens
      const orbitPath1 = `M ${shareX} ${cy - 19} A 9 19 0 1 1 ${shareX} ${cy + 19} A 9 19 0 1 1 ${shareX} ${cy - 19}`;
      const orbitPath2 = `M ${shareX} ${cy + 19} A 9 19 0 1 1 ${shareX} ${cy - 19} A 9 19 0 1 1 ${shareX} ${cy + 19}`;

      body = `
        ${polarityOverlay}

        <!-- Shared electron cloud lens -->
        <ellipse cx="${shareX}" cy="${cy}" rx="${isPolar ? 30 : 28}" ry="48" fill="url(#labCloudGlow)" class="svg-cloud-breathe" />

        <!-- Overlapping valence rings -->
        <circle cx="${ax}" cy="${cy}" r="${shellR}" fill="none" stroke="${catA.borderHover}" stroke-opacity="0.50" stroke-width="1.6" />
        <circle cx="${bx}" cy="${cy}" r="${shellR}" fill="none" stroke="${catB.borderHover}" stroke-opacity="0.50" stroke-width="1.6" />

        <!-- Non-bonding valence electrons -->
        ${dotsA}
        ${dotsB}

        <!-- Shared electron pair orbiting in overlap zone -->
        <g>
          <circle cx="0" cy="0" r="5.6" fill="#f59e0b" stroke="#161922" stroke-width="1.5">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="${orbitPath1}" />
          </circle>
          <circle cx="0" cy="0" r="5.6" fill="#ca9444" stroke="#161922" stroke-width="1.5">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="${orbitPath2}" />
          </circle>
        </g>

        <!-- Nuclei A & B -->
        <circle cx="${ax}" cy="${cy}" r="27" fill="url(#labGradA)" stroke="${catA.borderHover}" stroke-width="2" />
        <text x="${ax}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elA.symbol}</text>

        <circle cx="${bx}" cy="${cy}" r="27" fill="url(#labGradB)" stroke="${catB.borderHover}" stroke-width="2" />
        <text x="${bx}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elB.symbol}</text>

        <!-- Footer captions -->
        <text x="${ax - 24}" y="232" text-anchor="middle" class="svg-meta">${enegTextA} • ${valA} ${tSvg.outerShort}</text>
        <text x="${bx + 24}" y="232" text-anchor="middle" class="svg-meta">${enegTextB} • ${valB} ${tSvg.outerShort}</text>
      `;
    }

    // --- 3. METALLIC BOND / ALLOY ---
    else if (analysis.type === 'metallic') {
      bannerTitle = tSvg.metallicTitle;
      const ax = 224;
      const bx = 416;
      const cy = 122;

      // Background subtle lattice ghost ions to convey crystal structure
      const ghostNodes = [
        [108, 76], [108, 168], [320, 64], [320, 180], [532, 76], [532, 168]
      ]
        .map(
          ([gx, gy]) => `
            <circle cx="${gx}" cy="${gy}" r="16" fill="rgba(148, 163, 184, 0.06)" stroke="rgba(148, 163, 184, 0.24)" stroke-width="1.2" />
            <text x="${gx}" y="${gy + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="rgba(148, 163, 184, 0.44)">+</text>
          `
        )
        .join('');

      // Free delocalized electron sea paths weaving around both positive ions
      const seaPaths = [
        'M 74 90 Q 160 44, 260 92 T 450 86 T 566 96',
        'M 566 148 Q 470 198, 360 144 T 170 156 T 74 142',
        'M 96 122 Q 210 184, 320 122 T 544 122',
        'M 544 74 Q 420 132, 320 76 T 96 168',
        'M 124 176 Q 240 60, 360 174 T 520 72'
      ];

      const seaElectrons = [];
      seaPaths.forEach((pathD, pIdx) => {
        for (let k = 0; k < 3; k++) {
          const dur = (3.4 + pIdx * 0.45).toFixed(2);
          const begin = (-k * (Number(dur) / 3) - pIdx * 0.3).toFixed(2);
          seaElectrons.push(`
            <circle r="4.2" fill="${k % 2 === 0 ? '#f59e0b' : '#d4b47c'}" stroke="#161922" stroke-width="1">
              <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${pathD}" />
            </circle>
          `);
        }
      });

      body = `
        <!-- Matte metallic lattice enclosure -->
        <rect x="64" y="42" width="512" height="156" rx="22"
          fill="rgba(148, 163, 184, 0.04)" stroke="rgba(148, 163, 184, 0.28)" stroke-width="1.3" stroke-dasharray="6 5" />

        ${ghostNodes}

        <!-- Faint flow trajectories -->
        ${seaPaths
          .map((d) => `<path d="${d}" fill="none" stroke="rgba(212, 180, 124, 0.16)" stroke-width="1.2" />`)
          .join('')}

        <!-- Animated free electron sea -->
        <g>
          ${seaElectrons.join('')}
        </g>

        <!-- Positive Metal Cation A -->
        <g class="svg-atom-group">
          <circle cx="${ax}" cy="${cy}" r="42" fill="none" stroke="${catA.borderHover}" stroke-opacity="0.35" stroke-width="1.5" class="svg-cloud-breathe" />
          <circle cx="${ax}" cy="${cy}" r="33" fill="url(#labGradA)" stroke="${catA.borderHover}" stroke-width="2.2" />
          <text x="${ax}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elA.symbol}</text>
          <circle cx="${ax + 26}" cy="${cy - 24}" r="11" fill="#1a1e29" stroke="#d4b47c" stroke-width="1.5" />
          <text x="${ax + 26}" y="${cy - 20}" text-anchor="middle" font-size="12" font-weight="800" fill="#d4b47c">+</text>
        </g>

        <!-- Positive Metal Cation B -->
        <g class="svg-atom-group">
          <circle cx="${bx}" cy="${cy}" r="42" fill="none" stroke="${catB.borderHover}" stroke-opacity="0.35" stroke-width="1.5" class="svg-cloud-breathe" />
          <circle cx="${bx}" cy="${cy}" r="33" fill="url(#labGradB)" stroke="${catB.borderHover}" stroke-width="2.2" />
          <text x="${bx}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elB.symbol}</text>
          <circle cx="${bx + 26}" cy="${cy - 24}" r="11" fill="#1a1e29" stroke="#d4b47c" stroke-width="1.5" />
          <text x="${bx + 26}" y="${cy - 20}" text-anchor="middle" font-size="12" font-weight="800" fill="#d4b47c">+</text>
        </g>

        <!-- Captions -->
        <text x="320" y="216" text-anchor="middle" class="svg-highlight-caption" fill="#d4b47c">${tSvg.seaLabel}</text>
        <text x="160" y="233" text-anchor="middle" class="svg-meta">${elA.symbol}: ${valA} ${tSvg.outerShort}</text>
        <text x="480" y="233" text-anchor="middle" class="svg-meta">${elB.symbol}: ${valB} ${tSvg.outerShort}</text>
      `;
    }

    // --- 4. NOBLE GAS (NO REACTION) ---
    else if (analysis.type === 'noble-gas') {
      bannerTitle = tSvg.nobleTitle;
      const ax = 192;
      const bx = 448;
      const cy = 122;
      const shellR = 56;
      const aNoble = elA.category === 'noble-gas';
      const bNoble = elB.category === 'noble-gas';

      const dotsA = renderValenceDots(ax, cy, shellR, valA, aNoble ? '#d4b47c' : '#ca9444');
      const dotsB = renderValenceDots(bx, cy, shellR, valB, bNoble ? '#d4b47c' : '#ca9444');

      body = `
        <!-- Repulsion cue in the middle -->
        <g class="svg-badge-pulse">
          <path d="M 294 ${cy - 18} Q 282 ${cy} 294 ${cy + 18}" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" />
          <path d="M 346 ${cy - 18} Q 358 ${cy} 346 ${cy + 18}" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" />
          <text x="320" y="${cy + 6}" text-anchor="middle" font-size="18" font-weight="800" fill="#b594c7">✕</text>
        </g>

        ${
          analysis.extremeNoble
            ? `<rect x="205" y="30" width="230" height="22" rx="11" fill="#2b2316" stroke="#6b5228" stroke-width="1.2" />
               <text x="320" y="45" text-anchor="middle" class="svg-highlight-caption" fill="#e6d5b8">${tSvg.extremeSpark}</text>`
            : `<text x="320" y="42" text-anchor="middle" class="svg-sub-caption">${tSvg.repelLabel}</text>`
        }

        <!-- Atom A (gently repels left) -->
        <g class="svg-repel-left">
          ${
            aNoble
              ? `<circle cx="${ax}" cy="${cy}" r="74" fill="url(#labNobleAuraA)" class="svg-cloud-breathe" />
                 <circle cx="${ax}" cy="${cy}" r="${shellR + 5}" fill="none" stroke="${catA.borderHover}" stroke-opacity="0.45" stroke-width="1.4" />`
              : ''
          }
          <circle cx="${ax}" cy="${cy}" r="${shellR}" fill="none" stroke="${catA.borderHover}" stroke-opacity="${aNoble ? '0.78' : '0.45'}" stroke-width="${aNoble ? '2' : '1.5'}" />
          ${dotsA}
          <circle cx="${ax}" cy="${cy}" r="30" fill="url(#labGradA)" stroke="${catA.borderHover}" stroke-width="2" />
          <text x="${ax}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elA.symbol}</text>
          <text x="${ax}" y="${cy + 78}" text-anchor="middle" class="svg-meta">${enegTextA} • ${valA} ${tSvg.outerShort}</text>
        </g>

        <!-- Atom B (gently repels right) -->
        <g class="svg-repel-right">
          ${
            bNoble
              ? `<circle cx="${bx}" cy="${cy}" r="74" fill="url(#labNobleAuraB)" class="svg-cloud-breathe" />
                 <circle cx="${bx}" cy="${cy}" r="${shellR + 5}" fill="none" stroke="${catB.borderHover}" stroke-opacity="0.45" stroke-width="1.4" />`
              : ''
          }
          <circle cx="${bx}" cy="${cy}" r="${shellR}" fill="none" stroke="${catB.borderHover}" stroke-opacity="${bNoble ? '0.78' : '0.45'}" stroke-width="${bNoble ? '2' : '1.5'}" />
          ${dotsB}
          <circle cx="${bx}" cy="${cy}" r="30" fill="url(#labGradB)" stroke="${catB.borderHover}" stroke-width="2" />
          <text x="${bx}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elB.symbol}</text>
          <text x="${bx}" y="${cy + 78}" text-anchor="middle" class="svg-meta">${enegTextB} • ${valB} ${tSvg.outerShort}</text>
        </g>
      `;
    }

    // --- 5. UNKNOWN / SUPERHEAVY ---
    else {
      bannerTitle = tSvg.unknownTitle;
      const ax = 186;
      const bx = 454;
      const cy = 122;
      const shellR = 54;
      const dotsA = renderValenceDots(ax, cy, shellR, valA, '#94a3b8');
      const dotsB = renderValenceDots(bx, cy, shellR, valB, '#94a3b8');

      body = `
        <line x1="${ax + 68}" y1="${cy}" x2="${bx - 68}" y2="${cy}" stroke="rgba(148, 163, 184, 0.35)" stroke-width="2" stroke-dasharray="5 6" />
        <circle cx="320" cy="${cy}" r="20" fill="#161922" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="4 3" class="svg-badge-pulse" />
        <text x="320" y="${cy + 6}" text-anchor="middle" font-size="18" font-weight="800" fill="#cbd5e1">?</text>
        <text x="320" y="${cy + 36}" text-anchor="middle" class="svg-sub-caption">${tSvg.unknownBridge}</text>

        <circle cx="${ax}" cy="${cy}" r="${shellR}" fill="none" stroke="${catA.borderHover}" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="${elA.electronegativity === null ? '5 4' : 'none'}" />
        ${dotsA}
        <circle cx="${ax}" cy="${cy}" r="30" fill="url(#labGradA)" stroke="${catA.borderHover}" stroke-width="2" />
        <text x="${ax}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elA.symbol}</text>
        <text x="${ax}" y="${cy + 78}" text-anchor="middle" class="svg-meta">${enegTextA} • ${valA} ${tSvg.outerShort}</text>

        <circle cx="${bx}" cy="${cy}" r="${shellR}" fill="none" stroke="${catB.borderHover}" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="${elB.electronegativity === null ? '5 4' : 'none'}" />
        ${dotsB}
        <circle cx="${bx}" cy="${cy}" r="30" fill="url(#labGradB)" stroke="${catB.borderHover}" stroke-width="2" />
        <text x="${bx}" y="${cy + 6}" text-anchor="middle" class="svg-sym">${elB.symbol}</text>
        <text x="${bx}" y="${cy + 78}" text-anchor="middle" class="svg-meta">${enegTextB} • ${valB} ${tSvg.outerShort}</text>
      `;
    }

    return `
      <svg class="lab-bond-svg" viewBox="0 0 640 242" role="img" aria-label="${bannerTitle}">
        ${defs}
        <text x="320" y="18" text-anchor="middle" class="svg-banner-title">${bannerTitle}</text>
        ${body}
      </svg>
    `;
  }

  function renderSelectedPreview(slot, el) {
    const host = slot === 'a' ? dom.previewA : dom.previewB;
    const card = slot === 'a' ? dom.pickerA : dom.pickerB;
    if (!host || !el) return;

    const cat = window.ELEMENT_CATEGORIES[el.category];
    const outer = el.shells[el.shells.length - 1];
    const d = dict();
    const enegStr = el.electronegativity !== null ? el.electronegativity.toFixed(2) : d.naShort;

    card.style.setProperty('--slot-color', cat.color);
    card.style.setProperty('--slot-bg', cat.bg);
    card.style.setProperty('--slot-glow', cat.glow);

    host.innerHTML = `
      <div class="lab-mini-tile">
        <span class="lab-mini-z">${el.number}</span>
        <span class="lab-mini-sym">${el.symbol}</span>
      </div>
      <div class="lab-mini-info">
        <div class="lab-mini-name">${getElementDisplayName(el)}</div>
        <div class="lab-mini-meta">
          <span>${d.enegLabel}: <b>${enegStr}</b></span>
          <span class="lab-mini-dot">•</span>
          <span>${outer} ${d.valenceShort}</span>
        </div>
      </div>
    `;
  }

  function renderPresets() {
    if (!dom.presetsList) return;
    const activeKey = state.elA && state.elB ? getCompoundKey(state.elA, state.elB) : '';

    dom.presetsList.innerHTML = SAMPLE_PAIRS.map(([symA, symB]) => {
      const key = [symA, symB].sort().join('-');
      const isActive = key === activeKey;
      return `<button type="button" class="lab-preset-chip ${isActive ? 'active' : ''}" data-a="${symA}" data-b="${symB}">${symA} + ${symB}</button>`;
    }).join('');
  }

  function renderDropdown(slot, query) {
    const listEl = slot === 'a' ? dom.dropdownA : dom.dropdownB;
    const matches = searchElements(query);
    if (slot === 'a') state.filteredA = matches;
    else state.filteredB = matches;

    const currentEl = slot === 'a' ? state.elA : state.elB;
    const d = dict();

    if (matches.length === 0) {
      listEl.innerHTML = `<div class="lab-dropdown-empty">${d.noResults}</div>`;
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
        const eneg = el.electronegativity !== null ? `χ ${el.electronegativity.toFixed(2)}` : 'χ —';
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
            <span class="lab-opt-name">${getElementDisplayName(el)}</span>
            <span class="lab-opt-eneg">${eneg}</span>
          </button>
        `;
      })
      .join('');
  }

  function openDropdown(slot) {
    closeDropdowns();
    state.openDropdown = slot;
    state.highlightIndex = 0;
    const inputEl = slot === 'a' ? dom.searchA : dom.searchB;
    const listEl = slot === 'a' ? dom.dropdownA : dom.dropdownB;
    renderDropdown(slot, inputEl.value);
    listEl.classList.remove('hidden');
  }

  function closeDropdowns() {
    state.openDropdown = null;
    state.highlightIndex = -1;
    if (dom.dropdownA) dom.dropdownA.classList.add('hidden');
    if (dom.dropdownB) dom.dropdownB.classList.add('hidden');
    if (window.ReactionLab && typeof window.ReactionLab.closeDropdowns === 'function') {
      window.ReactionLab.closeDropdowns();
    }
  }

  function selectElement(slot, el) {
    if (!el) return;
    if (slot === 'a') {
      state.elA = el;
      dom.searchA.value = '';
    } else {
      state.elB = el;
      state.hasUserPickedB = true;
      dom.searchB.value = '';
    }
    closeDropdowns();
    renderAll();
  }

  // Main render for the Bonding Lab state
  function renderAll() {
    if (!state.elA || !state.elB) return;
    const d = dict();
    const elA = state.elA;
    const elB = state.elB;
    const analysis = analyzeBond(elA, elB);

    // 1) Previews & Presets
    renderSelectedPreview('a', elA);
    renderSelectedPreview('b', elB);
    renderPresets();

    // 2) Animated SVG Visualization
    dom.svgHost.innerHTML = buildBondSVG(elA, elB, analysis);

    // 3) Bond Badge & Delta-Chi Meter
    dom.bondBadge.textContent = d.bondLabels[analysis.type];
    dom.bondBadge.className = `lab-bond-badge bond-${analysis.type}`;

    dom.deltaVal.textContent = analysis.deltaChi !== null ? analysis.deltaChi.toFixed(2) : '—';

    const showScale =
      analysis.deltaChi !== null &&
      (analysis.type === 'ionic' ||
        analysis.type === 'polar-covalent' ||
        analysis.type === 'nonpolar-covalent');
    dom.scaleWrap.classList.toggle('hidden', !showScale);
    if (showScale) {
      const pct = Math.max(0, Math.min(100, (analysis.deltaChi / 3.3) * 100));
      dom.scalePin.style.left = `${pct.toFixed(1)}%`;
    }

    // 4) Explanation & Callout
    const nameA = `${elA.symbol} (${getElementDisplayName(elA)})`;
    const nameB = `${elB.symbol} (${getElementDisplayName(elB)})`;
    let descText = '';
    let calloutText = '';
    let calloutKind = 'info';

    if (analysis.type === 'noble-gas') {
      descText = analysis.bothNoble ? d.nobleHumorBoth : d.nobleHumorSingle;
      if (analysis.extremeNoble === 'Xe') {
        calloutText = d.nobleExtremeXe;
        calloutKind = 'special';
      } else if (analysis.extremeNoble === 'Kr') {
        calloutText = d.nobleExtremeKr;
        calloutKind = 'special';
      }
    } else if (analysis.type === 'metallic') {
      descText = analysis.sameElement ? d.metallicSameDesc : d.metallicAlloyDesc;
      if (analysis.hasSuperheavy) {
        calloutText = d.metallicSuperheavyNote;
        calloutKind = 'warn';
      }
    } else if (analysis.type === 'unknown-superheavy') {
      descText = d.superheavyDesc;
    } else if (analysis.type === 'ionic') {
      descText = d.ionicDesc(analysis.donor.symbol, analysis.acceptor.symbol, analysis.deltaChi.toFixed(2));
    } else if (analysis.type === 'polar-covalent') {
      if (analysis.isNonmetalHighDelta) {
        descText = d.polarNonmetalNote(
          analysis.donor.symbol,
          analysis.acceptor.symbol,
          analysis.deltaChi.toFixed(2),
          analysis.hasMetalloid
        );
      } else {
        descText = d.polarDesc(
          analysis.donor.symbol,
          analysis.acceptor.symbol,
          analysis.deltaChi.toFixed(2)
        );
      }
    } else if (analysis.type === 'nonpolar-covalent') {
      descText = analysis.sameElement
        ? d.nonpolarSameDesc(elA.symbol)
        : d.nonpolarDesc(elA.symbol, elB.symbol, analysis.deltaChi.toFixed(2));
    }

    dom.analysisDesc.textContent = descText;
    if (calloutText) {
      dom.callout.textContent = calloutText;
      dom.callout.className = `lab-callout callout-${calloutKind}`;
    } else {
      dom.callout.className = 'lab-callout hidden';
      dom.callout.textContent = '';
    }

    // 5) Compound Lookup Card
    const c = analysis.compound;
    if (c) {
      const isEn = state.lang === 'en';
      const eyebrowMap = {
        compound: d.eyebrowCompound,
        alloy: d.eyebrowAlloy,
        molecule: d.eyebrowMolecule,
        extreme: d.eyebrowExtreme
      };
      dom.compoundEyebrow.textContent = eyebrowMap[c.kind] || d.eyebrowCompound;
      dom.compoundFormula.textContent = c.formula;
      dom.compoundName.textContent = isEn ? c.enName : c.viName;
      dom.compoundDesc.textContent = isEn ? c.enDesc : c.viDesc;
      dom.compoundCard.dataset.kind = c.kind;
    } else {
      dom.compoundEyebrow.textContent = d.eyebrowGeneric;
      dom.compoundCard.dataset.kind = analysis.type;
      if (analysis.type === 'noble-gas') {
        dom.compoundFormula.textContent = d.genericNobleFormula;
        dom.compoundName.textContent = d.genericNobleName;
        dom.compoundDesc.textContent = d.genericNobleDesc;
      } else if (analysis.type === 'metallic') {
        dom.compoundFormula.textContent =
          elA.number === elB.number ? elA.symbol : `${elA.symbol}–${elB.symbol}`;
        dom.compoundName.textContent = d.genericAlloyName(elA.symbol, elB.symbol);
        dom.compoundDesc.textContent = d.genericAlloyDesc;
      } else if (analysis.type === 'unknown-superheavy') {
        dom.compoundFormula.textContent = d.genericSuperheavyFormula;
        dom.compoundName.textContent = d.genericSuperheavyName;
        dom.compoundDesc.textContent = d.genericSuperheavyDesc;
      } else {
        dom.compoundFormula.textContent = `${elA.symbol} + ${elB.symbol}`;
        dom.compoundName.textContent = d.genericBondName(nameA, nameB);
        if (analysis.type === 'ionic') {
          dom.compoundDesc.textContent = d.genericIonicDesc(analysis.donor.symbol, analysis.acceptor.symbol);
        } else if (analysis.type === 'polar-covalent') {
          dom.compoundDesc.textContent = d.genericPolarDesc(analysis.donor.symbol, analysis.acceptor.symbol);
        } else {
          dom.compoundDesc.textContent = d.genericNonpolarDesc;
        }
      }
    }
  }

  function syncTabChrome() {
    const d = dict();
    const tab = state.activeTab;
    const isBonding = tab === 'bonding';
    const isRxn = tab === 'reactions';
    const isOrg = tab === 'organic';

    if (dom.tabBonding) {
      dom.tabBonding.classList.toggle('active', isBonding);
      dom.tabBonding.setAttribute('aria-selected', isBonding ? 'true' : 'false');
    }
    if (dom.tabReactions) {
      dom.tabReactions.classList.toggle('active', isRxn);
      dom.tabReactions.setAttribute('aria-selected', isRxn ? 'true' : 'false');
    }
    if (dom.tabOrganic) {
      dom.tabOrganic.classList.toggle('active', isOrg);
      dom.tabOrganic.setAttribute('aria-selected', isOrg ? 'true' : 'false');
    }

    if (dom.panelBonding) dom.panelBonding.classList.toggle('hidden', !isBonding);
    if (dom.panelReactions) dom.panelReactions.classList.toggle('hidden', !isRxn);
    if (dom.panelOrganic) dom.panelOrganic.classList.toggle('hidden', !isOrg);

    let nextFooterHint = d.footerHint;
    if (isRxn && window.ReactionLab && typeof window.ReactionLab.getHeaderTexts === 'function') {
      const rxnText = window.ReactionLab.getHeaderTexts(state.lang);
      nextFooterHint = rxnText.footerHint;
    } else if (isOrg && window.OrganicBuilder && typeof window.OrganicBuilder.getHeaderTexts === 'function') {
      const orgText = window.OrganicBuilder.getHeaderTexts(state.lang);
      nextFooterHint = orgText.footerHint;
    }
    if (dom.labFooter) {
      dom.labFooter.classList.toggle('hidden', isOrg);
    }
    if (dom.footerHint) {
      const hasHint = Boolean(nextFooterHint && nextFooterHint.trim());
      dom.footerHint.textContent = hasHint ? nextFooterHint : '';
      dom.footerHint.classList.toggle('hidden', !hasHint);
    }
  }

  function setTab(tab) {
    const nextTab = tab === 'reactions' || tab === 'organic' ? tab : 'bonding';
    const changed = state.activeTab !== nextTab;
    closeDropdowns();
    state.activeTab = nextTab;
    syncTabChrome();
    if (dom.labBody) {
      dom.labBody.scrollTop = 0;
    }
    if (changed && nextTab === 'reactions' && window.ReactionLab && typeof window.ReactionLab.replayAnimation === 'function') {
      window.ReactionLab.replayAnimation();
    }
  }

  function getActiveTab() {
    return state.activeTab;
  }

  function applyLabLanguage() {
    const d = dict();
    if (!dom.modal) return;

    dom.modal.querySelectorAll('[data-i18n-lab]').forEach((node) => {
      const key = node.dataset.i18nLab;
      if (typeof d[key] === 'string') {
        node.textContent = d[key];
      }
    });

    dom.searchA.placeholder = d.searchPlaceholderA;
    dom.searchB.placeholder = d.searchPlaceholderB;
    dom.swapBtn.title = d.swapTitle;
    dom.swapBtn.setAttribute('aria-label', d.swapTitle);

    syncTabChrome();

    if (state.elA && state.elB) {
      renderAll();
    }
    if (state.openDropdown) {
      const inp = state.openDropdown === 'a' ? dom.searchA : dom.searchB;
      renderDropdown(state.openDropdown, inp.value);
    }
  }

  function pickSmartPartnerFor(el) {
    if (!el) return findBySymbol('Cl');
    if (el.category === 'noble-gas') {
      if (el.symbol === 'Xe' || el.symbol === 'Kr') return findBySymbol('F');
      return el.symbol === 'He' ? findBySymbol('Ne') : findBySymbol('He');
    }
    if (el.symbol === 'H') return findBySymbol('O');
    if (el.symbol === 'O') return findBySymbol('H');
    if (el.symbol === 'C') return findBySymbol('O');
    if (el.symbol === 'Cl' || el.symbol === 'F' || el.symbol === 'Br' || el.symbol === 'I') {
      return findBySymbol('Na');
    }
    if (el.macro === 'metal') return findBySymbol('Cl');
    return findBySymbol('O');
  }

  function bindPickerEvents(slot) {
    const inputEl = slot === 'a' ? dom.searchA : dom.searchB;
    const listEl = slot === 'a' ? dom.dropdownA : dom.dropdownB;

    inputEl.addEventListener('focus', () => {
      openDropdown(slot);
    });

    inputEl.addEventListener('click', () => {
      if (state.openDropdown !== slot) {
        openDropdown(slot);
      }
    });

    inputEl.addEventListener('input', () => {
      state.openDropdown = slot;
      state.highlightIndex = 0;
      renderDropdown(slot, inputEl.value);
      listEl.classList.remove('hidden');
    });

    inputEl.addEventListener('keydown', (e) => {
      const list = slot === 'a' ? state.filteredA : state.filteredB;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.openDropdown !== slot) openDropdown(slot);
        if (list.length > 0) {
          state.highlightIndex = (state.highlightIndex + 1) % list.length;
          renderDropdown(slot, inputEl.value);
          const hi = listEl.querySelector('.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.openDropdown !== slot) openDropdown(slot);
        if (list.length > 0) {
          state.highlightIndex = (state.highlightIndex - 1 + list.length) % list.length;
          renderDropdown(slot, inputEl.value);
          const hi = listEl.querySelector('.is-highlighted');
          if (hi) hi.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        if (list.length > 0) {
          e.preventDefault();
          const idx = state.highlightIndex >= 0 && state.highlightIndex < list.length ? state.highlightIndex : 0;
          selectElement(slot, list[idx]);
          inputEl.blur();
        }
      } else if (e.key === 'Escape') {
        if (state.openDropdown === slot) {
          e.stopPropagation();
          closeDropdowns();
          inputEl.blur();
        }
      }
    });

    listEl.addEventListener('mousedown', (e) => {
      // Prevent input blur before click registers
      e.preventDefault();
    });

    listEl.addEventListener('click', (e) => {
      const opt = e.target.closest('.lab-option');
      if (!opt) return;
      const num = Number(opt.dataset.number);
      const found = window.ELEMENTS.find((item) => item.number === num);
      if (found) selectElement(slot, found);
    });
  }

  function init(opts = {}) {
    callbacks = {
      getLang: opts.getLang || (() => 'vi'),
      onOpen: opts.onOpen || (() => {}),
      onClose: opts.onClose || (() => {})
    };

    dom = {
      modal: document.getElementById('lab-modal'),
      backdrop: document.getElementById('lab-backdrop'),
      labFooter: document.querySelector('#lab-modal .lab-footer'),
      footerHint: document.getElementById('lab-footer-hint'),
      labBody: document.querySelector('#lab-modal .lab-body'),
      tabsBar: document.getElementById('lab-tabs'),
      tabBonding: document.getElementById('lab-tab-bonding'),
      tabReactions: document.getElementById('lab-tab-reactions'),
      tabOrganic: document.getElementById('lab-tab-organic'),
      panelBonding: document.getElementById('lab-panel-bonding'),
      panelReactions: document.getElementById('lab-panel-reactions'),
      panelOrganic: document.getElementById('lab-panel-organic'),
      btnClose: document.getElementById('btn-close-lab'),
      btnCloseFooter: document.getElementById('btn-close-lab-footer'),
      presetsList: document.getElementById('lab-presets-list'),
      pickerA: document.getElementById('lab-picker-a'),
      pickerB: document.getElementById('lab-picker-b'),
      searchA: document.getElementById('lab-search-a'),
      searchB: document.getElementById('lab-search-b'),
      dropdownA: document.getElementById('lab-dropdown-a'),
      dropdownB: document.getElementById('lab-dropdown-b'),
      previewA: document.getElementById('lab-preview-a'),
      previewB: document.getElementById('lab-preview-b'),
      swapBtn: document.getElementById('lab-swap-btn'),
      svgHost: document.getElementById('lab-svg-host'),
      bondBadge: document.getElementById('lab-bond-badge'),
      deltaVal: document.getElementById('lab-delta-val'),
      scaleWrap: document.getElementById('lab-scale-wrap'),
      scalePin: document.getElementById('lab-scale-pin'),
      analysisDesc: document.getElementById('lab-analysis-desc'),
      callout: document.getElementById('lab-callout'),
      compoundCard: document.getElementById('lab-compound-card'),
      compoundEyebrow: document.getElementById('lab-compound-eyebrow'),
      compoundFormula: document.getElementById('lab-compound-formula'),
      compoundName: document.getElementById('lab-compound-name'),
      compoundDesc: document.getElementById('lab-compound-desc')
    };

    if (!dom.modal) return;

    state.lang = callbacks.getLang();
    state.elA = findBySymbol('Na');
    state.elB = findBySymbol('Cl');

    bindPickerEvents('a');
    bindPickerEvents('b');

    if (dom.tabsBar) {
      dom.tabsBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.lab-tab-btn');
        if (!btn) return;
        const tab = btn.dataset.labTab;
        if (tab) setTab(tab);
      });
    }

    dom.swapBtn.addEventListener('click', () => {
      const tmp = state.elA;
      state.elA = state.elB;
      state.elB = tmp;
      closeDropdowns();
      renderAll();
    });

    dom.presetsList.addEventListener('click', (e) => {
      const btn = e.target.closest('.lab-preset-chip');
      if (!btn) return;
      state.elA = findBySymbol(btn.dataset.a);
      state.elB = findBySymbol(btn.dataset.b);
      state.hasUserPickedB = true;
      dom.searchA.value = '';
      dom.searchB.value = '';
      closeDropdowns();
      renderAll();
    });

    dom.btnClose.addEventListener('click', close);
    dom.btnCloseFooter.addEventListener('click', close);
    dom.backdrop.addEventListener('click', close);

    // Close open element dropdown when clicking outside picker search
    document.addEventListener('click', (e) => {
      if (!state.openDropdown) return;
      if (!e.target.closest('.lab-search-wrap')) {
        closeDropdowns();
      }
    });

    applyLabLanguage();
  }

  function open() {
    if (!dom.modal) return;
    state.lang = callbacks.getLang();
    state.isOpen = true;
    closeDropdowns();
    applyLabLanguage();
    if (window.ReactionLab && typeof window.ReactionLab.setLang === 'function') {
      window.ReactionLab.setLang(state.lang);
    }
    if (window.OrganicBuilder && typeof window.OrganicBuilder.setLang === 'function') {
      window.OrganicBuilder.setLang(state.lang);
    }
    dom.modal.classList.remove('hidden');
    callbacks.onOpen();
  }

  function openWithElementA(el) {
    setTab('bonding');
    if (!el) {
      open();
      return;
    }
    state.elA = el;
    if (!state.hasUserPickedB || !state.elB) {
      state.elB = pickSmartPartnerFor(el);
    }
    open();
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

  function hasOpenDropdown() {
    return (
      state.openDropdown !== null ||
      Boolean(window.ReactionLab && typeof window.ReactionLab.hasOpenDropdown === 'function' && window.ReactionLab.hasOpenDropdown())
    );
  }

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    state.lang = lang;
    if (window.ReactionLab && typeof window.ReactionLab.setLang === 'function') {
      window.ReactionLab.setLang(lang);
    }
    if (window.OrganicBuilder && typeof window.OrganicBuilder.setLang === 'function') {
      window.OrganicBuilder.setLang(lang);
    }
    applyLabLanguage();
  }

  window.BondingLab = {
    init,
    open,
    openWithElementA,
    close,
    isOpen,
    hasOpenDropdown,
    closeDropdowns,
    setLang,
    setTab,
    getActiveTab
  };
})();
