// Interactive Periodic Table — High School Organic Compounds Dictionary (GDPT 2018)
// Loaded immediately before organic-builder.js via relative path; exports window.ORGANIC_COMPOUNDS.

(function (global) {
  'use strict';

  const C5_RING = [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,0,1]];
  const C6_RING = [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,0,1]];
  const BENZENE = [[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1]];
  const C6_AROM = ['C','C','C','C','C','C'];

  const ORGANIC_COMPOUNDS = [
    // =========================================================================
    // 1. CARBOHYDRATES & POLYOLS (1 - 11)
    // =========================================================================
    {
      id: 'glucose-ring',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','O','C','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,0,1],[0,7,1],[1,8,1],[2,9,1],[3,10,1],[4,6,1],[6,11,1]],
      name: 'Glucose (mạch vòng)',
      nameEn: 'Glucose (pyranose ring)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Còn gọi là đường nho do có nhiều trong quả nho chín, mật ong và máu người (nồng độ ổn định khoảng 4,4 – 7,2 mmol/L), là nguồn năng lượng tức thì cho tế bào và dịch truyền y tế.',
      realLifeEn: 'Often called grape sugar because of its abundance in ripe grapes, honey, and human blood, serving as the primary cellular fuel and IV nutrient.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch màu xanh lam (tính chất polyalcohol); đun nóng tạo kết tủa đỏ gạch Cu₂O.',
        'Tham gia phản ứng tráng bạc với thuốc thử Tollens (AgNO₃/NH₃) khi cân bằng mở vòng chuyển hóa sang dạng aldehyde.',
        'Làm mất màu nước Brom và lên men bởi enzyme tạo Ethanol kèm khí CO₂.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to form a deep blue solution (polyalcohol); heating precipitates brick-red Cu₂O.',
        'Produces a silver mirror with Tollens reagent (AgNO₃/NH₃) via equilibrium ring-opening to the aldehyde form.',
        'Decolorizes bromine water (unlike Fructose) and ferments with yeast enzymes into Ethanol and CO₂.'
      ],
      note: 'Trong dung dịch nước, Glucose tồn tại chủ yếu ở dạng mạch vòng 6 cạnh (α- và β-glucose), đồng phân của Fructose và Inositol (C₆H₁₂O₆).',
      noteEn: 'Exists overwhelmingly as 6-membered α/β-pyranose rings in water; isomer of Fructose and Inositol (C₆H₁₂O₆).'
    },
    {
      id: 'fructose-furanose',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','O','C','C','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,0,1],[0,7,1],[0,5,1],[5,8,1],[1,9,1],[2,10,1],[3,6,1],[6,11,1]],
      name: 'Fructose (mạch vòng 5 cạnh)',
      nameEn: 'Fructose (furanose ring)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Dạng vòng furanose phổ biến của đường trái cây trong cấu trúc đường mía (sucrose) và mật ong tự nhiên, mang lại vị ngọt đậm đà và giữ ẩm tốt trong bánh kẹo.',
      realLifeEn: 'The furanose ring unit found in table sugar (sucrose) and natural honey, delivering intense sweetness and moisture retention in confections.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường cho dung dịch xanh lam đặc trưng của polyalcohol.',
        'Trong môi trường kiềm (thuốc thử Tollens), tự chuyển hóa qua dạng mạch hở thành Glucose nên cho phản ứng tráng bạc.',
        'Không làm mất màu nước Brom ở điều kiện thường, giúp phân biệt với Glucose.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to yield a clear deep blue complex.',
        'Undergoes base-catalyzed isomerization via open-chain enediol to Glucose in Tollens reagent, forming a silver mirror.',
        'Does not decolorize bromine water, distinguishing it cleanly from Glucose.'
      ],
      note: 'Cùng công thức C₆H₁₂O₆ với Glucose và Inositol; đây là dạng vòng 5 cạnh gắn kết trong phân tử đường mía sucrose.',
      noteEn: 'Shares C₆H₁₂O₆ with Glucose and Inositol; this 5-membered furanose form is the unit linked inside sucrose.'
    },
    {
      id: 'fructose-pyranose',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','O','C','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,0,1],[0,7,1],[0,6,1],[6,8,1],[1,9,1],[2,10,1],[3,11,1]],
      name: 'Fructose (mạch vòng 6 cạnh)',
      nameEn: 'Fructose (pyranose ring)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Dạng tinh thể bền nhất của đường quả Fructose tinh khiết ở trạng thái rắn và dung dịch lạnh, tan nhanh cho vị ngọt thanh mát hơn ở nhiệt độ thấp.',
      realLifeEn: 'The predominant crystalline form of pure Fructose in cold water, prized in chilled beverages for its crisp, clean sweetness.',
      reactions: [
        'Tác dụng với Cu(OH)₂ ở nhiệt độ thường tạo phức đồng màu xanh lam tan tốt.',
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ khi cân bằng mở vòng chuyển hóa một phần sang Glucose.',
        'Không phản ứng oxi hóa với nước Brom như Glucose.'
      ],
      reactionsEn: [
        'Complexes with Cu(OH)₂ at room temperature to form a bright blue solution.',
        'Yields a silver mirror in ammoniacal AgNO₃ via alkaline ring-opening equilibrium to Glucose.',
        'Resists oxidation by aqueous bromine water unlike aldose Glucose.'
      ],
      note: 'Dạng β-fructopyranose chiếm ~70% cân bằng Fructose tự do trong nước; khác với dạng vòng 5 cạnh trong sucrose.',
      noteEn: 'β-Fructopyranose accounts for ~70% of free Fructose in cold water, unlike the 5-membered ring inside sucrose.'
    },
    {
      id: 'glucose-furanose',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','O','C','C','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,0,1],[0,7,1],[1,8,1],[2,9,1],[3,5,1],[5,6,1],[5,10,1],[6,11,1]],
      name: 'Glucose (mạch vòng 5 cạnh)',
      nameEn: 'Glucose (furanose ring)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (cân bằng dung dịch)',
      stateEn: 'Solid (minor solution isomer)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Một dạng đồng phân vòng hiếm gặp của Glucose tồn tại với tỉ lệ nhỏ (< 1%) trong mật ong và dung dịch đường nho, thường được nghiên cứu trong tổng hợp hóa dược.',
      realLifeEn: 'A rare minor cyclic isomer (< 1%) of Glucose in honey and grape juice, frequently trapped as a protected building block in medicinal chemistry.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch màu xanh lam và cho kết tủa đỏ gạch Cu₂O khi đun nóng.',
        'Dễ dàng chuyển cân bằng sang dạng vòng 6 cạnh và dạng mạch hở nên có phản ứng tráng bạc với Tollens.',
        'Làm mất màu nước Brom tạo Gluconic acid khi mở vòng trong nước.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to a blue solution and precipitates Cu₂O upon heating.',
        'Rapidly equilibrates with the open-chain aldehyde and pyranose forms, giving a positive Tollens test.',
        'Decolorizes bromine water to yield Gluconic acid via ring-opening.'
      ],
      note: 'Đồng phân C₆H₁₂O₆ kém bền hơn dạng Glucose mạch vòng 6 cạnh nên chỉ chiếm lượng vết trong dung dịch.',
      noteEn: 'A less strained-favorable C₆H₁₂O₆ isomer than glucopyranose, present only in trace amounts at equilibrium.'
    },
    {
      id: 'inositol',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','C','O','O','O','O','O','O'],
      bonds: [...C6_RING, [0,6,1],[1,7,1],[2,8,1],[3,9,1],[4,10,1],[5,11,1]],
      name: 'Inositol',
      nameEn: 'Inositol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water',
      realLife: 'Thường được ví như "vitamin B8" có vị ngọt nhẹ tự nhiên trong các loại đậu, ngũ cốc và cam quýt; đóng vai trò truyền tín hiệu tế bào, điều hòa insulin và có mặt trong sữa công thức.',
      realLifeEn: 'Often nicknamed vitamin B8 with a mild natural sweetness in beans, grains, and citrus; vital for cell signaling and added to infant formulas and supplements.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam đậm nhờ tính chất polyalcohol có các nhóm -OH liền kề.',
        'Không có phản ứng tráng bạc với AgNO₃/NH₃ và không làm mất màu nước Brom do vòng bền hoàn toàn không mở thành aldehyde.',
        'Tác dụng với kim loại Na giải phóng khí H₂ và tham gia phản ứng ester hóa tạo phospholipid màng tế bào.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to give a royal blue solution due to adjacent -OH groups.',
        'Does NOT give a Tollens silver mirror and does not decolorize bromine water (no latent aldehyde group).',
        'Reacts with metallic Na to evolve H₂ gas and undergoes esterification into membrane phospholipids.'
      ],
      note: 'Cùng công thức C₆H₁₂O₆ với Glucose và Fructose nhưng là vòng no toàn Carbon, hoàn toàn không mở vòng.',
      noteEn: 'Shares C₆H₁₂O₆ with Glucose and Fructose, but its all-carbon cyclohexane ring cannot ring-open into a reducing sugar.'
    },
    {
      id: 'glucose-open',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','C','O','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[0,6,2],[1,7,1],[2,8,1],[3,9,1],[4,10,1],[5,11,1]],
      name: 'Glucose (mạch hở)',
      nameEn: 'Glucose (open-chain)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Đường nho có vị ngọt thanh tự nhiên trong quả nho chín, mật ong và máu người; tuy dạng mạch hở chỉ chiếm khoảng 0,02% trong dung dịch nhưng lại quyết định các phản ứng oxi hóa đặc trưng.',
      realLifeEn: 'Grape sugar with a clean sweetness in ripe fruits and honey; though present at only ~0.02% in water, the open-chain form drives Glucose reactivity.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam; đun nóng xuất hiện kết tủa đỏ gạch Cu₂O.',
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ tạo lớp bạc kim loại sáng bóng.',
        'Làm mất màu nước Brom tạo Gluconic acid — dấu hiệu nhận biết phân biệt Glucose với Fructose.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to give a blue solution and forms brick-red Cu₂O on heating.',
        'Produces a bright silver mirror with ammoniacal AgNO₃ (Tollens reagent).',
        'Decolorizes bromine water to form Gluconic acid — key test distinguishing it from Fructose.'
      ],
      note: 'Cùng công thức C₆H₁₂O₆ với Fructose và Inositol; tồn tại cân bằng động với dạng Glucose mạch vòng 6 cạnh.',
      noteEn: 'Isomeric with Fructose and Inositol (C₆H₁₂O₆); exists in dynamic equilibrium with glucopyranose rings.'
    },
    {
      id: 'fructose-open',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','C','O','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[0,6,1],[1,7,2],[2,8,1],[3,9,1],[4,10,1],[5,11,1]],
      name: 'Fructose (mạch hở)',
      nameEn: 'Fructose (open-chain)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Đường có vị ngọt sắc nhất trong các loại đường tự nhiên (ngọt gấp ~1,5 lần đường mía), chiếm khoảng 40% trong mật ong và nhiều trong trái cây chín.',
      realLifeEn: 'The sweetest naturally occurring sugar (~1.5× sweeter than sucrose), making up about 40% of honey and abundant in ripe fruits.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam (tính chất polyalcohol).',
        'Có phản ứng tráng bạc với thuốc thử Tollens (trong môi trường kiềm tự chuyển hóa một phần thành Glucose).',
        'Không làm mất màu nước Brom — dấu hiệu nhận biết phân biệt với Glucose.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to give a deep blue solution (polyalcohol behavior).',
        'Gives a silver mirror with Tollens reagent (isomerizes partly to Glucose under alkaline conditions).',
        'Does not decolorize bromine water — key test distinguishing it from Glucose.'
      ],
      note: 'Cùng công thức C₆H₁₂O₆ với Glucose và Inositol; trong dung dịch chủ yếu tồn tại ở dạng mạch vòng 5 hoặc 6 cạnh.',
      noteEn: 'Shares the formula C₆H₁₂O₆ with Glucose and Inositol; in aqueous solution it exists mostly as 5- or 6-membered rings.'
    },
    {
      id: 'ribose-ring',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','O','C','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,0,1],[0,6,1],[1,7,1],[2,8,1],[3,5,1],[5,9,1]],
      name: 'Ribose (mạch vòng)',
      nameEn: 'Ribose (furanose ring)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Loại đường nền tảng cấu tạo nên khung xương phân tử RNA và phân tử dự trữ năng lượng ATP trong mọi cơ thể sống, cũng được bổ sung trong thực phẩm hỗ trợ phục hồi cơ tim.',
      realLifeEn: 'The structural sugar forming the backbone of RNA and cellular energy currency ATP across all living organisms, also used in sports nutrition.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam (tính chất polyalcohol) và cho kết tủa đỏ gạch Cu₂O khi đun nóng.',
        'Mở vòng trong dung dịch kiềm tham gia phản ứng tráng bạc với thuốc thử Tollens.',
        'Làm mất màu nước Brom tạo Ribonic acid tương tự Glucose.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to give a blue solution and reduces it to Cu₂O on heating.',
        'Ring-opens in alkaline solution to produce a positive Tollens silver-mirror reaction.',
        'Decolorizes bromine water by oxidizing to Ribonic acid.'
      ],
      note: 'Có công thức C₅H₁₀O₅ (hơn Deoxyribose trong DNA đúng 1 nguyên tử Oxygen).',
      noteEn: 'Has molecular formula C₅H₁₀O₅, containing one more Oxygen atom than Deoxyribose found in DNA.'
    },
    {
      id: 'deoxyribose-ring',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','O','C','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,0,1],[0,6,1],[2,7,1],[3,5,1],[5,8,1]],
      name: 'Deoxyribose (mạch vòng)',
      nameEn: 'Deoxyribose (furanose ring)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Thành phần đường cốt lõi tạo nên chuỗi xoắn kép DNA lưu giữ mã di truyền ở nhân tế bào, thiếu bớt 1 Oxygen giúp DNA bền hóa học hơn hẳn RNA qua hàng triệu năm.',
      realLifeEn: 'The defining sugar backbone of the DNA double helix; lacking one hydroxyl Oxygen makes DNA remarkably stable compared with RNA.',
      reactions: [
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ khi mở vòng cân bằng trong môi trường kiềm.',
        'Không tạo phức xanh lam bền với Cu(OH)₂ ở nhiệt độ thường như Ribose do không có hai nhóm -OH kề nhau.',
        'Bền vững trước sự thủy phân trong kiềm nhờ thiếu nhóm -OH ở vị trí số 2.'
      ],
      reactionsEn: [
        'Equilibrates via ring-opening to give a positive Tollens silver-mirror test.',
        'Does not form a stable deep blue Cu(OH)₂ chelate at room temperature due to lacking adjacent cis-diols.',
        'Resists alkaline hydrolysis far better than Ribose, safeguarding genetic integrity in DNA.'
      ],
      note: 'Tên đầy đủ là 2-Deoxy-D-ribose (C₅H₁₀O₄), nền tảng của tên gọi DNA (Deoxyribonucleic acid).',
      noteEn: '2-Deoxy-D-ribose (C₅H₁₀O₄) gives DNA (Deoxyribonucleic acid) its name.'
    },
    {
      id: 'ribose-open',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[0,5,2],[1,6,1],[2,7,1],[3,8,1],[4,9,1]],
      name: 'Ribose (mạch hở)',
      nameEn: 'Ribose (open-chain)',
      category: 'Carbohydrate',
      categoryEn: 'Carbohydrate',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Đường 5 carbon vị ngọt nhẹ tự nhiên, xuất hiện ở lượng nhỏ dưới dạng cân bằng dung dịch và đóng vai trò trung gian sinh tổng hợp các vitamin nhóm B như Riboflavin (vitamin B2).',
      realLifeEn: 'Mildly sweet 5-carbon sugar present in small equilibrium amounts in water, serving biologically as an intermediate for Riboflavin (vitamin B2).',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường thành dung dịch xanh lam đậm, đun nóng cho kết tủa Cu₂O đỏ gạch.',
        'Khử thuốc thử Tollens (AgNO₃/NH₃) tạo bạc kim loại và làm mất màu dung dịch Br₂.',
        'Cộng H₂ với xúc tác Ni đun nóng tạo polyalcohol Ribitol (tiền chất tổng hợp vitamin B2).'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to a deep blue solution and precipitates brick-red Cu₂O on heating.',
        'Reduces Tollens reagent to metallic silver and decolorizes bromine water.',
        'Undergoes catalytic hydrogenation over Ni to Ribitol, a key precursor to vitamin B2.'
      ],
      note: 'Cùng công thức C₅H₁₀O₅ với Ribose mạch vòng nhưng trong dung dịch nước chiếm tỉ lệ chưa tới 0,1%.',
      noteEn: 'Open-chain isomer of cyclic Ribose (C₅H₁₀O₅), representing under 0.1% at equilibrium in water.'
    },
    {
      id: 'sorbitol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','C','C','O','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[0,6,1],[1,7,1],[2,8,1],[3,9,1],[4,10,1],[5,11,1]],
      name: 'Sorbitol',
      nameEn: 'Sorbitol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Rắn (bột tinh thể trắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Chất tạo ngọt ít calo mang cảm giác mát lưỡi trong kẹo cao su không đường, kem đánh răng và trái cây họ táo lê (lên men kém bởi vi khuẩn sâu răng).',
      realLifeEn: 'Low-calorie sugar alcohol providing a cooling sweet taste in sugar-free gum, toothpaste, and stone fruits without promoting tooth decay.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch phức đồng màu xanh lam đặc trưng của polyalcohol.',
        'Không có phản ứng tráng bạc với AgNO₃/NH₃ và không làm mất màu nước Brom (phân biệt với Glucose).',
        'Được điều chế trực tiếp bằng phản ứng cộng H₂ vào Glucose (xúc tác Ni, nhiệt độ cao).'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to give a deep blue polyalcohol complex.',
        'Negative to both Tollens silver-mirror test and bromine water (unlike its parent Glucose).',
        'Produced industrially by catalytic hydrogenation of Glucose over Ni.'
      ],
      note: 'Công thức C₆H₁₄O₆ (nhiều hơn Glucose 2 nguyên tử H), dễ nhầm với Inositol (C₆H₁₂O₆) trong đề trắc nghiệm.',
      noteEn: 'Formula is C₆H₁₄O₆ (2 more Hydrogens than Glucose); frequently contrasted with cyclic Inositol (C₆H₁₂O₆).'
    },

    // =========================================================================
    // 2. ARENES & BENZENE DERIVATIVES (12 - 35)
    // =========================================================================
    {
      id: 'benzene',
      catKey: 'arene',
      elements: C6_AROM,
      bonds: BENZENE,
      name: 'Benzene',
      nameEn: 'Benzene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu (mùi thơm nhẹ, dễ cháy)',
      stateEn: 'Colorless liquid (sweet aromatic odor)',
      solubility: 'Không tan trong nước, nhẹ hơn nước',
      solubilityEn: 'Insoluble in water (less dense than water)',
      realLife: 'Dung môi công nghiệp quan trọng dùng để tổng hợp Styrene, Phenol và sợi tổng hợp, trước đây có trong xăng và tẩy rửa nhưng hiện bị kiểm soát chặt vì gây độc tủy xương.',
      realLifeEn: 'Foundational petrochemical feedstock for Styrene, Phenol, and plastics; strictly regulated due to bone-marrow toxicity and carcinogenicity.',
      reactions: [
        'Tham gia phản ứng thế Bromine lỏng (có bột Fe/FeBr₃ xúc tác) tạo Bromobenzene và khí HBr.',
        'Thế với hỗn hợp HNO₃ đặc / H₂SO₄ đặc tạo Nitrobenzene dạng dầu màu vàng nhạt lắng xuống đáy.',
        'Không làm mất màu nước Brom và dung dịch KMnO₄ ở cả nhiệt độ thường lẫn khi đun nóng.'
      ],
      reactionsEn: [
        'Undergoes electrophilic substitution with liquid Br₂ (FeBr₃ catalyst) to form Bromobenzene and HBr.',
        'Reacts with concentrated HNO₃/H₂SO₄ to yield pale-yellow oily Nitrobenzene.',
        'Does NOT decolorize aqueous Br₂ or KMnO₄ even on heating (hallmark aromatic stability).'
      ],
      note: 'Đặc trưng hóa học là "dễ thế, khó cộng, bền vững với chất oxi hóa"; cháy sinh nhiều muội than.',
      noteEn: 'Exemplifies aromatic character: favors substitution over addition, resists KMnO₄, and burns with a sooty flame.'
    },
    {
      id: 'toluene',
      catKey: 'arene',
      elements: [...C6_AROM,'C'],
      bonds: [...BENZENE, [0,6,1]],
      name: 'Toluene',
      nameEn: 'Toluene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Dung môi pha sơn, keo dán nhựa, mực in thay thế cho Benzene vì ít độc hại hơn; cũng dùng làm nguyên liệu chế tạo thuốc nổ TNT và tăng chỉ số octane của xăng.',
      realLifeEn: 'Widely used paint thinner, adhesive solvent, and octane booster (safer substitute for Benzene), as well as the precursor to TNT.',
      reactions: [
        'Làm mất màu dung dịch KMnO₄ khi ĐUN NÓNG tạo muối Potassium benzoate và kết tủa nâu đen MnO₂ (không mất màu ở nhiệt độ thường).',
        'Phản ứng nhanh với HNO₃ đặc / H₂SO₄ đặc (nhờ nhóm -CH₃ hoạt hóa vị trí ortho, para) tạo thuốc nổ TNT (2,4,6-trinitrotoluene).',
        'Chiếu sáng tác dụng với Br₂ tạo Benzyl bromide (thế nhánh); có bột Fe tác dụng vào vòng thơm.'
      ],
      reactionsEn: [
        'Decolorizes KMnO₄ ONLY UPON HEATING to form Potassium benzoate and brown MnO₂ precipitate.',
        'Nitrates much faster than Benzene at ortho/para positions to yield the yellow explosive TNT.',
        'Brominates at the methyl side chain under UV light, or on the ring with an FeBr₃ catalyst.'
      ],
      note: 'Thí nghiệm phân biệt nhanh Benzene – Toluene – Styrene bằng KMnO₄ thường/đun nóng xuất hiện cực kỳ hay trong đề thi THPT.',
      noteEn: 'Classic KMnO₄ test triad: Benzene (no reaction), Toluene (decolorizes only when heated), Styrene (decolorizes cold).'
    },
    {
      id: 'ethylbenzene',
      catKey: 'arene',
      elements: [...C6_AROM,'C','C'],
      bonds: [...BENZENE, [0,6,1],[6,7,1]],
      name: 'Ethylbenzene',
      nameEn: 'Ethylbenzene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Hóa chất trung gian sản lượng hàng chục triệu tấn mỗi năm trong công nghiệp dầu khí để sản xuất Styrene làm hộp xốp và nhựa cứng, có mùi giống xăng nhẹ.',
      realLifeEn: 'Massive-volume petrochemical intermediate dehydrogenated to Styrene for foam packaging and hard plastics.',
      reactions: [
        'Tách H₂ trên xúc tác Fe₂O₃ ở 600°C chuyển thành Styrene — quy trình công nghiệp sản xuất Styrene chính.',
        'Oxi hóa cắt mạch nhánh bằng dung dịch KMnO₄ đun nóng cũng tạo sản phẩm chính là muối Benzoate (tương tự Toluene).',
        'Thế Br₂ có bột Fe vào vị trí ortho/para của vòng hoặc thế gốc tự do vào mạch nhánh khi chiếu sáng.'
      ],
      reactionsEn: [
        'Dehydrogenates over hot Fe₂O₃ catalyst (~600°C) into Styrene monomer.',
        'Oxidized cleanly at the benzylic carbon by hot KMnO₄ to yield Benzoic acid salts.',
        'Undergoes ring bromination with FeBr₃ or selective benzylic radical bromination under UV light.'
      ],
      note: 'Đồng phân cùng công thức C₈H₁₀ với o-, m-, p-Xylene (mạch nhánh C đều bị KMnO₄ đun nóng cắt về gốc -COOH).',
      noteEn: 'Isomer of o-, m-, and p-Xylene (C₈H₁₀); hot KMnO₄ oxidizes the whole ethyl side chain down to one -COOH.'
    },
    {
      id: 'cumene',
      catKey: 'arene',
      elements: [...C6_AROM,'C','C','C'],
      bonds: [...BENZENE, [0,6,1],[6,7,1],[6,8,1]],
      name: 'Cumene (Isopropylbenzene)',
      nameEn: 'Cumene (Isopropylbenzene)',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Thành phần có mặt tự nhiên trong dầu mỏ và xăng hàng không, là nguồn nguyên liệu chủ lực toàn cầu để điều chế đồng thời hai hóa chất Phenol và Acetone.',
      realLifeEn: 'Petroleum component famous as the single industrial starting material co-producing almost all global Phenol and Acetone.',
      reactions: [
        'Oxi hóa bởi O₂ không khí rồi thủy phân trong môi trường acid H₂SO₄ loãng thu được đồng thời Phenol và Acetone (quy trình Cumene).',
        'Làm mất màu dung dịch KMnO₄ khi đun nóng do còn nguyên tử H ở carbon gắn trực tiếp vòng thơm.',
        'Thế halogen ưu tiên vào vị trí para hoặc vào carbon nhánh bậc ba dưới ánh sáng.'
      ],
      reactionsEn: [
        'Air oxidation followed by acidic cleavage (Cumene process) co-produces Phenol and Acetone.',
        'Decolorizes hot KMnO₄ solution because it retains a benzylic Hydrogen.',
        'Undergoes clean tertiary benzylic radical substitution or para-selective ring electrophilic substitution.'
      ],
      note: 'Phương pháp sản xuất Phenol từ Cumene giúp tạo thêm Acetone có giá trị kinh tế rất cao (chương trình Hóa 11 mới).',
      noteEn: 'The Cumene route to Phenol & Acetone is a highlighted industrial synthesis in the GDPT 2018 Chemistry 11 curriculum.'
    },
    {
      id: 'o-xylene',
      catKey: 'arene',
      elements: [...C6_AROM,'C','C'],
      bonds: [...BENZENE, [0,6,1],[1,7,1]],
      name: 'o-Xylene',
      nameEn: 'o-Xylene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Dung môi công nghiệp và nguyên liệu tổng hợp Phthalic anhydride dùng sản xuất chất hóa dẻo nhựa PVC và sơn phủ alkyd.',
      realLifeEn: 'Industrial solvent and principal feedstock for Phthalic anhydride used in PVC plasticizers and alkyd paints.',
      reactions: [
        'Oxi hóa bằng O₂ (xúc tác V₂O₅) chuyển hóa thành Phthalic anhydride.',
        'Oxi hóa hoàn toàn hai nhánh kế bên bằng dung dịch KMnO₄ đun nóng tạo muối của Phthalic acid.',
        'Phản ứng thế Br₂ có mặt bột Fe dễ dàng hơn Benzene.'
      ],
      reactionsEn: [
        'Catalytic air oxidation over V₂O₅ yields Phthalic anhydride.',
        'Hot KMnO₄ oxidizes both adjacent methyl groups into Phthalate salts.',
        'Undergoes electrophilic aromatic bromination faster than Benzene.'
      ],
      note: 'Đồng phân 1,2-dimethylbenzene (C₈H₁₀), thường tách chung hỗn hợp BTX khi chưng cất dầu mỏ.',
      noteEn: '1,2-Dimethylbenzene isomer of C₈H₁₀ obtained alongside Benzene and Toluene from petroleum reforming.'
    },
    {
      id: 'm-xylene',
      catKey: 'arene',
      elements: [...C6_AROM,'C','C'],
      bonds: [...BENZENE, [0,6,1],[2,7,1]],
      name: 'm-Xylene',
      nameEn: 'm-Xylene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Đồng phân chiếm tỉ lệ cao nhất trong hỗn hợp Xylene công nghiệp, dùng trong dung môi tẩy rửa, mực in và tổng hợp nhựa chai chuyên dụng chịu áp.',
      realLifeEn: 'The most abundant Xylene isomer from reforming, used as an ink/coating solvent and monomer precursor for specialty barrier resins.',
      reactions: [
        'Oxi hóa hai nhánh bởi KMnO₄ đun nóng tạo Isophthalic acid.',
        'Dễ thế Cl₂ hoặc HNO₃ đặc vào vị trí vòng thơm hoạt hóa chung bởi cả hai nhóm methyl.',
        'Chiếu sáng với Br₂ tạo dẫn xuất thế ở mạch nhánh.'
      ],
      reactionsEn: [
        'Hot KMnO₄ oxidizes both methyl substituents to Isophthalic acid.',
        'Undergoes rapid ring nitration and halogenation due to mutually reinforcing methyl positions.',
        'Photochemical bromination targets the benzylic methyl groups.'
      ],
      note: 'Đồng phân 1,3-dimethylbenzene (C₈H₁₀); khó tách tinh khiết khỏi p-Xylene bằng chưng cất thường do nhiệt độ sôi gần nhau.',
      noteEn: '1,3-Dimethylbenzene (C₈H₁₀); boils within 0.8°C of p-Xylene, requiring selective adsorption to separate.'
    },
    {
      id: 'p-xylene',
      catKey: 'arene',
      elements: [...C6_AROM,'C','C'],
      bonds: [...BENZENE, [0,6,1],[3,7,1]],
      name: 'p-Xylene',
      nameEn: 'p-Xylene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu (đông đặc ở 13°C)',
      stateEn: 'Colorless liquid (melts at 13°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Nguyên liệu không thể thiếu để sản xuất chai nhựa nước uống PET trong suốt và sợi vải polyester mặc hằng ngày trên toàn thế giới.',
      realLifeEn: 'Crucial petrochemical feedstock oxidized into Terephthalic acid to manufacture PET beverage bottles and polyester clothing.',
      reactions: [
        'Oxi hóa trong không khí hoặc bởi KMnO₄ đun nóng chuyển thành Terephthalic acid (nguyên liệu nhựa PET).',
        'Tính đối xứng cao giúp cả 4 vị trí còn lại trên vòng tương đương khi tham gia phản ứng thế.',
        'Bền với dung dịch KMnO₄ ở nhiệt độ thường và không làm mất màu nước Brom.'
      ],
      reactionsEn: [
        'Oxidized industrially or by hot KMnO₄ cleanly into Terephthalic acid (for PET polymer).',
        'High 1,4-symmetry makes all four remaining aromatic CH sites equivalent upon monosubstitution.',
        'Unreactive toward aqueous bromine and cold KMnO₄.'
      ],
      note: 'Có điểm nóng chảy cao nhất (13°C) trong 3 đồng phân o/m/p-Xylene nhờ cấu trúc đối xứng xếp khít.',
      noteEn: 'Highest melting point (13°C) among the three C₈H₁₀ Xylene isomers due to tight crystal packing.'
    },
    {
      id: 'styrene',
      catKey: 'arene',
      elements: [...C6_AROM,'C','C'],
      bonds: [...BENZENE, [0,6,1],[6,7,2]],
      name: 'Styrene',
      nameEn: 'Styrene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Lỏng không màu (mùi đặc trưng)',
      stateEn: 'Colorless oily liquid (sweet pungent odor)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Monomer sản xuất hộp xốp đựng thức ăn, vỏ thiết bị điện tử và nhựa PS trong suốt (kèm cao su SBR làm lốp xe).',
      realLifeEn: 'Monomer polymerized into Polystyrene (PS) foam food containers, rigid plastics, and SBR tire rubber.',
      reactions: [
        'Làm mất màu nước Brom VÀ dung dịch KMnO₄ ngay ở NHIỆT ĐỘ THƯỜNG (nhờ nhánh không no bên ngoài).',
        'Trùng hợp ở điều kiện thích hợp (t°, p, xt) tạo nhựa Polystyrene (PS).',
        'Cộng hợp với H₂ (xúc tác Ni) thành Ethylbenzene và ở nhiệt độ cao thành Ethylcyclohexane.'
      ],
      reactionsEn: [
        'Rapidly decolorizes BOTH bromine water and cold KMnO₄ at ROOM TEMPERATURE.',
        'Polymerizes via heat or radical initiators into Polystyrene (PS).',
        'Hydrogenates step-wise over Ni first to Ethylbenzene and then fully to Ethylcyclohexane.'
      ],
      note: 'Không phải đồng phân của Benzene/Toluene; khác biệt hẳn khi phản ứng ngay với KMnO₄ lạnh.',
      noteEn: 'Readily distinguished from Benzene and Toluene because it decolorizes Br₂(aq) and cold KMnO₄ immediately.'
    },
    {
      id: 'naphthalene',
      catKey: 'arene',
      elements: ['C','C','C','C','C','C','C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[3,6,1],[6,7,2],[7,8,1],[8,9,2],[9,4,1]],
      name: 'Naphthalene (Băng phiến)',
      nameEn: 'Naphthalene',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Rắn (tinh thể trắng, dễ thăng hoa)',
      stateEn: 'Solid (white volatile flakes)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Chất tạo thành viên băng phiến trắng có mùi hắc quen thuộc dùng đuổi gián, mọt quần áo; có tính chất dễ bay hơi trực tiếp từ thể rắn sang khí.',
      realLifeEn: 'Traditional white mothball flakes that sublimate directly into vapor to repel moths and insects, plus feedstock for dyes.',
      reactions: [
        'Dễ tham gia phản ứng thế Bromine hoặc HNO₃ (ưu tiên vị trí α) hơn Benzene.',
        'Cộng H₂ ở áp suất, nhiệt độ thích hợp tạo Tetralin và Decalin dùng làm dung môi.',
        'Cháy trong không khí cho ngọn lửa sáng và rất nhiều khói đen (muội than).'
      ],
      reactionsEn: [
        'Undergoes electrophilic substitution faster than Benzene, selectively favoring the α-positions.',
        'Catalytic hydrogenation yields Tetralin and Decalin solvents.',
        'Burns with a bright flame accompanied by heavy black soot due to high Carbon percentage.'
      ],
      note: 'Công thức C₁₀H₈; hiện tượng băng phiến tự nhỏ dần trong tủ quần áo là minh họa kinh điển cho sự thăng hoa.',
      noteEn: 'Formula C₁₀H₈; classic everyday demonstration of sublimation as solid mothballs disappear without melting.'
    },
    {
      id: 'phenol',
      catKey: 'phenol',
      elements: [...C6_AROM,'O'],
      bonds: [...BENZENE, [0,6,1]],
      name: 'Phenol',
      nameEn: 'Phenol',
      category: 'Phenol',
      categoryEn: 'Phenol',
      state: 'Rắn (tinh thể không màu, dễ chảy rữa)',
      stateEn: 'Solid (colorless crystalline needles)',
      solubility: 'Ít tan trong nước lạnh, tan vô hạn ở 66°C',
      solubilityEn: 'Slightly soluble cold; miscible above 66°C',
      realLife: 'Có mùi thuốc sát trùng bệnh viện đặc trưng; dùng sản xuất nhựa Bakelite chịu nhiệt làm tay cầm nồi, keo dán gỗ, chất tẩy uế và nguyên liệu tổng hợp Aspirin.',
      realLifeEn: 'Carries a classic hospital antiseptic odor; essential feedstock for heat-resistant Bakelite plastics, resins, and Aspirin synthesis.',
      reactions: [
        'Có tính acid yếu (tác dụng với NaOH tạo Sodium phenolate tan tốt, nhưng không làm đổi màu quỳ tím).',
        'Phản ứng ngay với nước Brom ở điều kiện thường tạo KẾT TỦA TRẮNG 2,4,6-tribromophenol (dấu hiệu nhận biết).',
        'Thế với HNO₃ đặc / H₂SO₄ đặc tạo kết tủa vàng Acid picric; tạo phức màu TÍM với dung dịch FeCl₃.'
      ],
      reactionsEn: [
        'Weakly acidic: dissolves in NaOH to form Sodium phenolate (does not turn litmus red).',
        'Reacts instantly with bromine water to form a WHITE precipitate of 2,4,6-tribromophenol.',
        'Forms a violet complex with FeCl₃(aq) and yellow picric acid upon nitration with concentrated HNO₃/H₂SO₄.'
      ],
      note: 'Vòng thơm và nhóm -OH ảnh hưởng qua lại lẫn nhau; tiếp xúc trực tiếp gây bỏng da rất nặng.',
      noteEn: 'Mutual activation between the ring and -OH makes ring substitution effortless; corrosive on skin contact.'
    },
    {
      id: 'catechol',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','O'],
      bonds: [...BENZENE, [0,6,1],[1,7,1]],
      name: 'Catechol',
      nameEn: 'Catechol',
      category: 'Phenol',
      categoryEn: 'Phenol',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water',
      realLife: 'Hợp chất tự nhiên có trong trái cây, nhựa thực vật (tạo vết thâm khi gọt táo khoai tiếp xúc không khí) và làm khung hóa học của các chất dẫn truyền thần kinh như Dopamine, Adrenaline.',
      realLifeEn: 'Natural phenolic present in fruits (causing enzymatic browning when cut apples oxidize) and forming the core scaffold of Dopamine and Adrenaline.',
      reactions: [
        'Tạo dung dịch xanh lục đậm đặc trưng khi nhỏ dung dịch FeCl₃ (chuyển sang đỏ tím khi thêm kiềm nhẹ).',
        'Tác dụng với dung dịch NaOH tạo muối phenolate tan tốt và dễ bị oxi hóa chuyển màu nâu sẫm ngoài không khí.',
        'Khử được thuốc thử Tollens tạo bạc kim loại ngay ở nhiệt độ thường nhờ hai nhóm -OH kề nhau.'
      ],
      reactionsEn: [
        'Produces a characteristic emerald-green color with FeCl₃(aq) that turns violet upon mild basification.',
        'Dissolves cleanly in aqueous NaOH and readily darkens upon air oxidation.',
        'Reduces Tollens reagent slowly to metallic silver owing to its easily oxidized ortho-diol system.'
      ],
      note: 'Là benzene-1,2-diol (C₆H₆O₂), đồng phân vị trí với Resorcinol (1,3) và Hydroquinone (1,4).',
      noteEn: '1,2-Dihydroxybenzene (C₆H₆O₂); positional isomer of Resorcinol (1,3) and Hydroquinone (1,4).'
    },
    {
      id: 'resorcinol',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','O'],
      bonds: [...BENZENE, [0,6,1],[2,7,1]],
      name: 'Resorcinol',
      nameEn: 'Resorcinol',
      category: 'Phenol',
      categoryEn: 'Phenol',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Thành phần quen thuộc trong kem bôi trị mụn trứng cá, vảy nến nhờ tác dụng tiêu sừng sát khuẩn, đồng thời làm keo dán gỗ chịu nước cực bền dùng đóng tàu thuyền.',
      realLifeEn: 'Active antiseptic and keratolytic agent in acne/eczema creams, and resin component in waterproof marine wood adhesives.',
      reactions: [
        'Tác dụng với dung dịch FeCl₃ cho màu TÍM ĐẬM đặc trưng của hợp chất Phenol.',
        'Phản ứng rất nhanh với nước Brom tạo kết tủa trắng 2,4,6-tribromoresorcinol.',
        'Ngưng tụ với Formaldehyde tạo keo dán nhựa nhiệt rắn bền nước.'
      ],
      reactionsEn: [
        'Turns deep violet immediately upon addition of aqueous FeCl₃.',
        'Rapidly yields a white tribromo precipitate with bromine water.',
        'Condenses briskly with Formaldehyde into waterproof thermosetting resins.'
      ],
      note: 'Là benzene-1,3-diol (C₆H₆O₂), hai nhóm -OH hỗ trợ hoạt hóa cực mạnh các vị trí còn lại.',
      noteEn: '1,3-Dihydroxybenzene (C₆H₆O₂); both -OH groups reinforce ring activation at the same carbons.'
    },
    {
      id: 'hydroquinone',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','O'],
      bonds: [...BENZENE, [0,6,1],[3,7,1]],
      name: 'Hydroquinone',
      nameEn: 'Hydroquinone',
      category: 'Phenol',
      categoryEn: 'Phenol',
      state: 'Rắn (tinh thể hình kim màu trắng)',
      stateEn: 'Solid (white needle crystals)',
      solubility: 'Tan khá tốt trong nước nóng',
      solubilityEn: 'Moderately soluble cold; freely soluble hot',
      realLife: 'Nổi tiếng trong lịch sử nhiếp ảnh là chất tráng rửa phim đen trắng và trong y học da liễu dùng điều trị nám tàn nhang nhờ khả năng ức chế tổng hợp sắc tố melanin.',
      realLifeEn: 'Famous black-and-white photographic film developer and dermatological skin-lightening agent that inhibits melanin pigment formation.',
      reactions: [
        'Là chất khử mạnh: dễ bị oxi hóa nhẹ bởi FeCl₃, AgBr (trên phim ảnh) hoặc KMnO₄ chuyển thành Benzoquinone màu vàng.',
        'Tan trong dung dịch NaOH tạo dung dịch phenolate nhanh chóng bị O₂ không khí làm sẫm màu.',
        'Ngăn chặn phản ứng trùng hợp tự phát nên thường thêm lượng nhỏ làm chất ổn định cho Styrene.'
      ],
      reactionsEn: [
        'Strong reducing agent: reduces exposed AgBr in photographic film or FeCl₃ while oxidizing to yellow p-benzoquinone.',
        'Alkaline solutions darken rapidly on exposure to atmospheric Oxygen.',
        'Radical scavenger added in trace amounts to prevent premature polymerization of stored monomers like Styrene.'
      ],
      note: 'Là benzene-1,4-diol (C₆H₆O₂), đồng phân vị trí đối xứng của Catechol và Resorcinol.',
      noteEn: '1,4-Dihydroxybenzene (C₆H₆O₂); symmetric para-isomer of Catechol and Resorcinol.'
    },
    {
      id: 'benzyl-alcohol',
      catKey: 'alcohol',
      elements: [...C6_AROM,'C','O'],
      bonds: [...BENZENE, [0,6,1],[6,7,1]],
      name: 'Benzyl alcohol',
      nameEn: 'Benzyl alcohol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi thơm hoa nhài nhẹ)',
      stateEn: 'Colorless liquid (mild floral aroma)',
      solubility: 'Tan một phần trong nước (~4 g/100 mL)',
      solubilityEn: 'Moderately soluble in water (~4 g/100 mL)',
      realLife: 'Có tự nhiên trong hoa nhài, ngọc lan tây và trà; được dùng làm chất bảo quản diệt khuẩn dịu nhẹ trong thuốc tiêm, mỹ phẩm, xà phòng và hương liệu nước hoa.',
      realLifeEn: 'Naturally present in jasmine and ylang-ylang blossoms; used as a bacteriostatic preservative in injectable medicines, cosmetics, and perfumes.',
      reactions: [
        'Tác dụng với kim loại Na giải phóng khí H₂ nhưng KHÔNG phản ứng với dung dịch NaOH (phân biệt với Phenol).',
        'Không tạo màu tím với FeCl₃ và không làm mất màu nước Brom ở điều kiện thường.',
        'Oxi hóa bởi CuO đun nóng tạo Benzaldehyde (mùi hạnh nhân), hoặc bởi KMnO₄ đun nóng tạo muối Benzoate.'
      ],
      reactionsEn: [
        'Reacts with metallic Na to evolve H₂, yet does NOT react with aqueous NaOH (key contrast with Phenol).',
        'Gives no violet color with FeCl₃ and no reaction with cold bromine water.',
        'Oxidized gently over hot CuO to Benzaldehyde, or strongly by hot KMnO₄ to Benzoic acid salts.'
      ],
      note: 'Cùng công thức C₇H₈O với các đồng phân Cresol (nhóm Phenol) và Anisole (nhóm Ether) — bẫy kinh điển ở đề thi.',
      noteEn: 'Formula C₇H₈O — isomeric with o/m/p-Cresol (phenols) and Anisole (ether), but only Benzyl alcohol behaves as a true Alcohol.'
    },
    {
      id: 'anisole',
      catKey: 'ether',
      elements: [...C6_AROM,'O','C'],
      bonds: [...BENZENE, [0,6,1],[6,7,1]],
      name: 'Anisole',
      nameEn: 'Anisole',
      category: 'Ether',
      categoryEn: 'Ether',
      state: 'Lỏng không màu (mùi hoa hồi ngọt)',
      stateEn: 'Colorless liquid (sweet anise odor)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Có mùi thơm dễ chịu tương tự đại hồi và thì là, được dùng làm nguyên liệu pha chế hương liệu thực phẩm, nước hoa và làm dung môi tổng hợp dược phẩm.',
      realLifeEn: 'Pleasant anise-like aromatic liquid used in perfumes, flavorings, and as a high-boiling synthetic solvent in pharmaceutical manufacturing.',
      reactions: [
        'Không tác dụng với kim loại Na và không tan trong dung dịch kiềm NaOH (đặc trưng nhóm Ether).',
        'Tác dụng với acid HI đặc đun nóng cắt liên kết tạo lại Phenol và dẫn xuất Iodomethane (CH₃I).',
        'Vòng thơm được hoạt hóa mạnh nên tham gia phản ứng thế Br₂ (vào vị trí ortho/para) dễ hơn hẳn Benzene.'
      ],
      reactionsEn: [
        'Inert toward both metallic Na and aqueous NaOH (typical Ether stability).',
        'Cleaved by hot concentrated HI to yield Phenol and Iodomethane (CH₃I).',
        'Strongly electron-donating -OCH₃ accelerates ortho/para electrophilic bromination relative to Benzene.'
      ],
      note: 'Cùng công thức C₇H₈O với Benzyl alcohol; không phản ứng với kim loại Na giúp phân biệt ngay hai chất.',
      noteEn: 'Formula C₇H₈O isomer of Benzyl alcohol; distinguished immediately because Anisole has no -OH and does not react with Na.'
    },
    {
      id: 'aniline',
      catKey: 'amine',
      elements: [...C6_AROM,'N'],
      bonds: [...BENZENE, [0,6,1]],
      name: 'Aniline',
      nameEn: 'Aniline',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Lỏng sánh không màu (hóa nâu ngoài không khí)',
      stateEn: 'Colorless oily liquid (darkens in air)',
      solubility: 'Ít tan trong nước, nặng hơn nước',
      solubilityEn: 'Slightly soluble in water (denser than water)',
      realLife: 'Nguyên liệu cốt lõi để sản xuất thuốc nhuộm công nghiệp rực rỡ (chàm tổng hợp, phẩm màu azo), xốp polyurethane cách nhiệt và các dược chất hạ sốt như Paracetamol.',
      realLifeEn: 'Cornerstone industrial amine used to manufacture synthetic dyes (indigo, azo pigments), polyurethane foams, and analgesics such as Paracetamol.',
      reactions: [
        'Có tính base rất yếu: KHÔNG làm đổi màu quỳ tím hoặc phenolphthalein, nhưng tan được trong dung dịch HCl tạo muối Phenylammonium chloride.',
        'Nhỏ muối vào nước Brom thấy ngay KẾT TỦA TRẮNG 2,4,6-tribromoaniline (phản ứng nhận biết).',
        'Muối Phenylammonium chloride tác dụng ngược với dung dịch NaOH lại tách ra Aniline vẩn đục không tan.'
      ],
      reactionsEn: [
        'Very weak base: does NOT turn litmus blue, yet dissolves in HCl(aq) as Phenylammonium chloride.',
        'Reacts immediately with bromine water to form a WHITE precipitate of 2,4,6-tribromoaniline.',
        'Neutralizing Phenylammonium chloride with NaOH regenerates insoluble oily Aniline.'
      ],
      note: 'Thí nghiệm rửa ống nghiệm dính Aniline bằng dung dịch HCl rồi tráng nước rất hay gặp trong chương Amines.',
      noteEn: 'Classical lab note: wash glassware stained with water-insoluble Aniline using dilute HCl to convert it into a soluble salt.'
    },
    {
      id: 'chlorobenzene',
      catKey: 'halogen',
      elements: [...C6_AROM,'Cl'],
      bonds: [...BENZENE, [0,6,1]],
      name: 'Chlorobenzene',
      nameEn: 'Chlorobenzene',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (mùi hạnh nhân nhẹ)',
      stateEn: 'Colorless liquid (faint almond-like odor)',
      solubility: 'Không tan trong nước, nặng hơn nước',
      solubilityEn: 'Insoluble in water (denser than water)',
      realLife: 'Dung môi công nghiệp nhiệt độ sôi cao cho sơn, keo cao su và mực in; từng đóng vai trò trung gian quan trọng tổng hợp Phenol và nhiều thuốc bảo vệ thực vật.',
      realLifeEn: 'High-boiling industrial solvent for paints, rubber adhesives, and coatings, and historically a key precursor to Phenol.',
      reactions: [
        'KHÔNG bị thủy phân bởi dung dịch NaOH loãng đun sôi thông thường do liên kết C(sp²)–Cl cực kỳ bền.',
        'Thủy phân với NaOH đặc ở áp suất cao, 300–350°C mới tạo được muối Sodium phenolate (điều chế Phenol).',
        'Không tạo kết tủa AgCl khi đun với dung dịch AgNO₃/ethanol (phân biệt với Benzyl chloride).'
      ],
      reactionsEn: [
        'Resists hydrolysis in boiling aqueous NaOH due to partial double-bond character of the C(aryl)–Cl bond.',
        'Requires harsh conditions (concentrated NaOH, ~350°C, high pressure) to yield Sodium phenolate (Dow process).',
        'Fails to precipitate AgCl with warm AgNO₃/ethanol, unlike alkyl halides.'
      ],
      note: 'Là dẫn xuất halogen của Arene có độ bền liên kết cao; tương phản hoàn toàn với Allyl hay Ethyl chloride.',
      noteEn: 'Illustrates the extreme inertness of aryl halides toward nucleophilic substitution under ordinary conditions.'
    },
    {
      id: 'bromobenzene',
      catKey: 'halogen',
      elements: [...C6_AROM,'Br'],
      bonds: [...BENZENE, [0,6,1]],
      name: 'Bromobenzene',
      nameEn: 'Bromobenzene',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (nặng gấp ~1,5 lần nước)',
      stateEn: 'Colorless heavy liquid (~1.5 g/mL)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Sản phẩm chuẩn của bài thực hành phản ứng thế Bromine vào vòng Benzene trên phòng thí nghiệm THPT, cũng được dùng làm dung môi nặng và thuốc thử tổng hợp hữu cơ.',
      realLifeEn: 'Signature product of high-school benzene bromination labs and widely used precursor for Grignard reagents in fine organic synthesis.',
      reactions: [
        'Được điều chế bằng cách cho Benzene tác dụng với Bromine khan (KHÔNG dùng nước Brom) khi có xúc tác bột sắt hoặc FeBr₃.',
        'Bền với dung dịch kiềm loãng đun sôi; chỉ thủy phân trong kiềm đặc ở nhiệt độ và áp suất cao.',
        'Phản ứng dễ dàng với kim loại Mg trong Ether khan tạo hợp chất cơ kim phục vụ tổng hợp hữu cơ.'
      ],
      reactionsEn: [
        'Prepared directly from Benzene and dry liquid Br₂ with Fe or FeBr₃ catalyst (releasing HBr gas).',
        'Resists dilute boiling alkali; requires high temperature and pressure for nucleophilic displacement.',
        'Reacts smoothly with Magnesium in anhydrous Ether to form Phenylmagnesium bromide.'
      ],
      note: 'Vì Bromobenzene nặng hơn nước (D ≈ 1,50 g/cm³) nên khi rửa sản phẩm thí nghiệm, lớp hữu cơ nằm ở phía dưới.',
      noteEn: 'High density (~1.50 g/cm³) causes Bromobenzene to sink below the aqueous layer during separatory extraction.'
    },
    {
      id: 'benzaldehyde',
      catKey: 'aldehyde',
      elements: [...C6_AROM,'C','O'],
      bonds: [...BENZENE, [0,6,1],[6,7,2]],
      name: 'Benzaldehyde',
      nameEn: 'Benzaldehyde',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Lỏng không màu (hóa vàng nhẹ khi để lâu)',
      stateEn: 'Colorless liquid',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Thành phần tạo mùi thơm đặc trưng của quả hạnh nhân đắng, hạt đào và quả anh đào; ứng dụng rộng rãi làm hương liệu làm bánh, nước hoa và thuốc nhuộm.',
      realLifeEn: 'Natural compound responsible for the signature aroma of bitter almonds and cherries, heavily used in bakery flavorings and fragrances.',
      reactions: [
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ tạo lớp bạc sáng bóng và muối Ammonium benzoate.',
        'KHÔNG tạo kết tủa đỏ gạch Cu₂O khi đun với Cu(OH)₂/NaOH như các aldehyde mạch thẳng thông thường (Fehling âm tính).',
        'Tự oxi hóa chậm trong không khí tạo tinh thể Benzoic acid bám ở miệng lọ.'
      ],
      reactionsEn: [
        'Gives a bright silver mirror with Tollens reagent (AgNO₃/NH₃).',
        'Fails to reduce mild alkaline Cu(OH)₂ (Fehling test negative — aromatic aldehyde exception).',
        'Slowly autoxidizes in air to deposit white Benzoic acid crystals around bottle caps.'
      ],
      note: 'Là aldehyde thơm đơn giản nhất; điểm cần lưu ý là phản ứng dương tính với Tollens nhưng không tạo đỏ gạch với Cu(OH)₂.',
      noteEn: 'Simplest aromatic aldehyde; positively reduces Tollens reagent yet gives no reaction with Fehling solution.'
    },
    {
      id: 'benzoic-acid',
      catKey: 'carboxylic',
      elements: [...C6_AROM,'C','O','O'],
      bonds: [...BENZENE, [0,6,1],[6,7,2],[6,8,1]],
      name: 'Benzoic acid',
      nameEn: 'Benzoic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng hình vảy)',
      stateEn: 'Solid (white crystalline flakes)',
      solubility: 'Ít tan trong nước lạnh, tan tốt trong nước nóng',
      solubilityEn: 'Slightly soluble cold; soluble in hot water',
      realLife: 'Chất bảo quản thực phẩm phổ biến (mã E210) và muối Sodium benzoate (E211) giúp ngăn nấm mốc, vi khuẩn phát triển trong nước ngọt, tương ớt và mứt quả.',
      realLifeEn: 'Ubiquitous food preservative (E210; sodium salt E211) preventing mold and yeast spoilage in soft drinks, sauces, and fruit preserves.',
      reactions: [
        'Làm quỳ tím hóa đỏ (lực acid mạnh hơn Acetic acid và Phenol), phản ứng với NaOH, Na₂CO₃ và NaHCO₃ giải phóng khí CO₂.',
        'Tác dụng với Ethanol (xúc tác H₂SO₄ đặc, đun nóng) tạo ester Ethyl benzoate có mùi thơm bạc hà nhẹ.',
        'Cho tinh thể muối Sodium benzoate tác dụng với dung dịch HCl lại thu hồi kết tủa trắng Benzoic acid do ít tan trong nước lạnh.'
      ],
      reactionsEn: [
        'Turns litmus red (stronger than Acetic acid); dissolves in NaOH and liberates CO₂ gas from Na₂CO₃/NaHCO₃.',
        'Esterifies with Ethanol under H₂SO₄ catalysis to form fragrant Ethyl benzoate.',
        'Neutralized Sodium benzoate precipitates pure white Benzoic acid flakes when acidified and chilled.'
      ],
      note: 'Dạng chuẩn độ và kết tinh lại Benzoic acid từ nước nóng là bài thực hành kinh điển nhờ độ tan thay đổi mạnh theo nhiệt độ.',
      noteEn: 'Textbook recrystallization compound thanks to its steep solubility difference between cold and boiling water.'
    },
    {
      id: 'salicylic-acid',
      catKey: 'carboxylic',
      elements: [...C6_AROM,'C','O','O','O'],
      bonds: [...BENZENE, [0,6,1],[6,7,2],[6,8,1],[1,9,1]],
      name: 'Salicylic acid',
      nameEn: 'Salicylic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể hình kim trắng)',
      stateEn: 'Solid (white needle crystals)',
      solubility: 'Ít tan trong nước lạnh',
      solubilityEn: 'Slightly soluble in cold water',
      realLife: 'Hoạt chất BHA quen thuộc chiết xuất từ vỏ cây liễu giúp tẩy tế bào chết, thông thoáng lỗ chân lông trị mụn trứng cá và làm tiền chất sản xuất thuốc Aspirin.',
      realLifeEn: 'Popular BHA skincare ingredient from willow bark used to clear pores and treat acne, and primary feedstock for Aspirin.',
      reactions: [
        'Tác dụng với CH₃OH (H₂SO₄ đặc, t°) tạo ester Methyl salicylate có mùi dầu nóng xoa bóp (Salonpas).',
        'Tác dụng với Acetic anhydride ở nhóm -OH phenol tạo thuốc giảm đau hạ sốt Aspirin.',
        'Tạo màu TÍM ĐẶC TRƯNG với dung dịch FeCl₃ (giúp kiểm tra độ tinh khiết xem Aspirin còn lẫn acid dư hay không).'
      ],
      reactionsEn: [
        'Esterifies with Methanol (H₂SO₄) to Methyl salicylate (oil of wintergreen aroma in topical pain balms).',
        'Acetylation at its phenolic hydroxyl with Acetic anhydride yields Aspirin.',
        'Develops an intense VIOLET color with FeCl₃ — standard purity test for unreacted Salicylic acid in Aspirin.'
      ],
      note: 'Vừa mang tính acid carboxylic vừa mang tính phenol; tỉ lệ phản ứng tối đa với NaOH là 1 : 2.',
      noteEn: 'Bifunctional (Carboxylic acid + Phenol): consumes 2 equivalents of NaOH upon complete neutralization.'
    },
    {
      id: 'aspirin',
      catKey: 'pharma',
      elements: [...C6_AROM,'C','O','O','O','C','O','C'],
      bonds: [...BENZENE, [0,6,1],[6,7,2],[6,8,1],[1,9,1],[9,10,1],[10,11,2],[10,12,1]],
      name: 'Aspirin',
      nameEn: 'Aspirin',
      category: 'Dược chất hữu cơ',
      categoryEn: 'Pharmaceutical',
      state: 'Rắn (bột tinh thể trắng, vị hơi chua)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Ít tan trong nước lạnh (~0,3 g/100 mL)',
      solubilityEn: 'Slightly soluble in cold water',
      realLife: 'Một trong những loại thuốc phổ biến nhất lịch sử y học hiện đại dùng giảm đau, hạ sốt, kháng viêm và phòng ngừa cục máu đông gây nhồi máu cơ tim ở liều thấp.',
      realLifeEn: 'Iconic medication (Acetylsalicylic acid) used globally to relieve pain, fever, and inflammation, and in low doses to prevent blood clots.',
      reactions: [
        'Tác dụng với dung dịch NaOH đun nóng theo tỉ lệ mol 1 : 3 (1 mol trung hòa -COOH, 2 mol xà phòng hóa chức ester của phenol).',
        'Không cho màu tím với FeCl₃ khi tinh khiết; nếu để ẩm lâu ngày bị thủy phân sinh Salicylic acid có mùi giấm nhẹ.',
        'Phản ứng với NaHCO₃ giải phóng khí CO₂ tạo muối tan tốt hơn trong nước.'
      ],
      reactionsEn: [
        'Consumes 3 moles of NaOH per mole upon hot alkaline hydrolysis (neutralizing the acid and saponifying the phenolic ester).',
        'Pure Aspirin shows NO violet color with FeCl₃ unless moisture hydrolyzes it back to Salicylic acid and vinegar odor.',
        'Effervesces with NaHCO₃ to form a more water-soluble sodium salt.'
      ],
      note: 'Tên hóa học là Acetylsalicylic acid (C₉H₈O₄); tổng hợp từ Salicylic acid + Acetic anhydride (câu vận dụng cao Hóa 12).',
      noteEn: 'Chemical name Acetylsalicylic acid (C₉H₈O₄); classic Grade 12 organic synthesis from Salicylic acid and Acetic anhydride.'
    },
    {
      id: 'paracetamol',
      catKey: 'pharma',
      elements: [...C6_AROM,'O','N','C','O','C'],
      bonds: [...BENZENE, [0,6,1],[3,7,1],[7,8,1],[8,9,2],[8,10,1]],
      name: 'Paracetamol',
      nameEn: 'Paracetamol (Acetaminophen)',
      category: 'Dược chất hữu cơ',
      categoryEn: 'Pharmaceutical',
      state: 'Rắn (bột kết tinh trắng, vị hơi đắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Ít tan trong nước lạnh, tan tốt trong nước nóng',
      solubilityEn: 'Sparingly soluble cold; soluble in hot water',
      realLife: 'Hoạt chất giảm đau và hạ sốt thông dụng hàng đầu trong tủ thuốc gia đình (Panadol, Tylenol, Efferalgan), an toàn với dạ dày hơn Aspirin nhưng không có tác dụng kháng viêm.',
      realLifeEn: 'World-leading over-the-counter fever reducer and pain reliever (Acetaminophen/Tylenol); gentler on the stomach than Aspirin.',
      reactions: [
        'Cho dung dịch FeCl₃ vào sẽ tạo màu tím xanh nhạt do còn nguyên nhóm -OH phenol tự do.',
        'Tác dụng với NaOH theo tỉ lệ mol 1 : 1 ở nhiệt độ thường (tạo muối phenolate tan tốt) và 1 : 2 khi đun sôi thủy phân nhóm amide.',
        'Làm mất màu nước Brom tạo dẫn xuất thế vào vòng thơm.'
      ],
      reactionsEn: [
        'Yields a pale blue-violet color with aqueous FeCl₃ due to its free phenolic -OH group.',
        'Neutralizes 1 equivalent of cold NaOH at the phenol, and consumes a 2nd equivalent upon boiling amide hydrolysis.',
        'Decolorizes bromine water via rapid ring bromination.'
      ],
      note: 'Công thức C₈H₉NO₂; cần tuân thủ liều tối đa hằng ngày (≤ 4 g ở người lớn) để tránh gây độc gan.',
      noteEn: 'Formula C₈H₉NO₂; exceeds Aspirin in gastric safety, though overdose causes severe liver toxicity.'
    },
    {
      id: 'terephthalic-acid',
      catKey: 'carboxylic',
      elements: [...C6_AROM,'C','O','O','C','O','O'],
      bonds: [...BENZENE, [0,6,1],[6,7,2],[6,8,1],[3,9,1],[9,10,2],[9,11,1]],
      name: 'Terephthalic acid',
      nameEn: 'Terephthalic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (bột tinh thể trắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Hầu như không tan trong nước',
      solubilityEn: 'Practically insoluble in water',
      realLife: 'Nguyên liệu đầu vào quy mô khổng lồ cho ngành dệt may và đóng gói đồ uống: trùng ngưng cùng Ethylene glycol tạo ra nhựa PET làm chai nước lọc và sợi vải polyester.',
      realLifeEn: 'Massive-volume industrial diacid condensed with Ethylene glycol to manufacture PET plastic bottles and polyester textiles.',
      reactions: [
        'Trùng ngưng với Ethylene glycol (HO-CH₂-CH₂-OH) loại nước tạo tơ và nhựa Polyethylene terephthalate (PET).',
        'Tác dụng với NaOH và Na₂CO₃ theo tỉ lệ 1 : 2 tạo muối dicarboxylate tan tốt trong nước.',
        'Được điều chế trực tiếp bằng phản ứng oxi hóa p-Xylene trong công nghiệp.'
      ],
      reactionsEn: [
        'Polycondenses with Ethylene glycol with water elimination to yield Polyethylene terephthalate (PET).',
        'Dissolves in 2 equivalents of NaOH or Na₂CO₃ to form soluble terephthalate salts.',
        'Produced globally via catalytic air oxidation of p-Xylene.'
      ],
      note: 'Là benzene-1,4-dicarboxylic acid (C₈H₆O₄); nhớ cặp monomer PET (Terephthalic acid + Ethylene glycol) trong chương Polymer.',
      noteEn: 'Benzene-1,4-dicarboxylic acid (C₈H₆O₄); essential PET monomer pair alongside Ethylene glycol.'
    },

    // =========================================================================
    // 3. CYCLOALKANES & CYCLOALKENES (36 - 45)
    // =========================================================================
    {
      id: 'cyclopropane',
      catKey: 'cycloalkane',
      elements: ['C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,0,1]],
      name: 'Cyclopropane',
      nameEn: 'Cyclopropane',
      category: 'Cycloalkane',
      categoryEn: 'Cycloalkane',
      state: 'Khí không màu (mùi ngọt nhẹ)',
      stateEn: 'Colorless gas',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Từng được dùng làm khí gây mê tác dụng cực nhanh trong phẫu thuật ngoại khoa giữa thế kỷ 20 nhưng nay đã ngưng sử dụng vì rất dễ bắt cháy nổ khi trộn cùng Oxygen.',
      realLifeEn: 'Potent early surgical anesthetic gas retired because mixtures with Oxygen present extreme explosion hazards.',
      reactions: [
        'Do sức căng vòng 60° rất lớn, dễ tham gia phản ứng CỘNG MỞ VÒNG với H₂ (Ni, 80°C) tạo Propane.',
        'Làm mất màu dung dịch Br₂ tạo 1,3-dibromopropane và cộng HBr tạo 1-bromopropane.',
        'Không làm mất màu dung dịch KMnO₄ ở nhiệt độ thường (giúp phân biệt với Propene).'
      ],
      reactionsEn: [
        'High 60° ring strain enables easy ring-opening hydrogenation over Ni (80°C) to Propane.',
        'Decolorizes bromine solution to 1,3-dibromopropane and adds HBr to form 1-bromopropane.',
        'Does NOT decolorize cold dilute KMnO₄, distinguishing it from isomer Propene.'
      ],
      note: 'Cùng công thức C₃H₆ với Propene nhưng thuộc loại mạch vòng no có sức căng góc lớn nhất.',
      noteEn: 'Isomeric with Propene (C₃H₆); distinguishable via negative Baeyer KMnO₄ test.'
    },
    {
      id: 'cyclobutane',
      catKey: 'cycloalkane',
      elements: ['C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,0,1]],
      name: 'Cyclobutane',
      nameEn: 'Cyclobutane',
      category: 'Cycloalkane',
      categoryEn: 'Cycloalkane',
      state: 'Khí không màu (dễ hóa lỏng ở 12°C)',
      stateEn: 'Colorless gas (bp 12.5°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Khung vòng đặc biệt xuất hiện trong nhiều phân tử sinh học tự nhiên, thuốc kháng ung thư và tổn thương DNA khi da tiếp xúc quá mức với tia cực tím UV mặt trời.',
      realLifeEn: 'Strained ring motif found in natural defense compounds and formed as thymine dimers when skin DNA is damaged by UV sunlight.',
      reactions: [
        'Ít căng hơn Cyclopropane nên KHÔNG phản ứng mở vòng với nước Brom ở nhiệt độ thường.',
        'Cộng H₂ mở vòng tạo Butane khi đun nóng với xúc tác Ni ở 120–180°C.',
        'Tham gia phản ứng thế Cl₂ khi chiếu sáng giữ nguyên khung vòng.'
      ],
      reactionsEn: [
        'Less strained than Cyclopropane: does NOT react rapidly with bromine water at room temperature.',
        'Undergoes ring-opening hydrogenation over Ni around 120–180°C to yield Butane.',
        'Photochemical chlorination gives Chlorocyclobutane with the ring intact.'
      ],
      note: 'Cùng công thức C₄H₈ với nhóm đồng phân Butene.',
      noteEn: 'Cyclic C₄H₈ isomer of the Butenes; stable toward aqueous bromine unlike alkenes.'
    },
    {
      id: 'cyclopentane',
      catKey: 'cycloalkane',
      elements: ['C','C','C','C','C'],
      bonds: C5_RING,
      name: 'Cyclopentane',
      nameEn: 'Cyclopentane',
      category: 'Cycloalkane',
      categoryEn: 'Cycloalkane',
      state: 'Lỏng không màu (rất dễ cháy)',
      stateEn: 'Colorless volatile liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Chất tạo bọt cách nhiệt xanh thay thế cho khí CFC (chất gây thủng tầng ozone) trong lớp thành tủ lạnh, tủ đông và vách cách nhiệt công nghiệp hiện đại.',
      realLifeEn: 'Ozone-safe blowing agent replacing harmful CFCs in modern refrigerator polyurethane insulation foam.',
      reactions: [
        'Vòng 5 cạnh hầu như không có sức căng nên rất bền, KHÔNG phản ứng cộng mở vòng với Br₂.',
        'Thế Cl₂ hoặc Br₂ khi có ánh sáng khuếch tán hoặc gia nhiệt tạo dẫn xuất halogen vòng.',
        'Cháy hoàn toàn tạo CO₂ và hơi H₂O tỏa nhiệt lượng lớn.'
      ],
      reactionsEn: [
        'Virtually strain-free and resistant to ring-opening by bromine water or cold hydrogen.',
        'Undergoes radical halogen substitution under UV light with the 5-membered ring intact.',
        'Burns cleanly with high enthalpy of combustion.'
      ],
      note: 'Cấu trúc không phẳng hơi gập ("dạng phong bì") giúp giảm tối đa lực đẩy giữa các nguyên tử.',
      noteEn: 'Puckered "envelope" conformation relieves eclipsing strain, giving high ring stability.'
    },
    {
      id: 'cyclopentene',
      catKey: 'cycloalkene',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,1],[3,4,1],[4,0,1]],
      name: 'Cyclopentene',
      nameEn: 'Cyclopentene',
      category: 'Cycloalkene',
      categoryEn: 'Cycloalkene',
      state: 'Lỏng không màu (mùi giống xăng)',
      stateEn: 'Colorless flammable liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Nguyên liệu trung gian dùng điều chế cao su tổng hợp và polymer đặc biệt chịu đàn hồi tốt nhờ khả năng mở vòng giữ nguyên liên kết đôi.',
      realLifeEn: 'Monomer derived from petrochemical C₅ fractions to make specialized polypentenamer elastomers.',
      reactions: [
        'Làm mất màu nhanh dung dịch Bromine (cộng vào C=C) và dung dịch KMnO₄ loãng ngay ở nhiệt độ thường.',
        'Cộng H₂ (Ni, t°) chuyển thành Cyclopentane no và cộng H₂O (xúc tác acid) tạo Cyclopentanol.',
        'Chịu phản ứng trùng hợp mở vòng tạo sợi polymer đàn hồi.'
      ],
      reactionsEn: [
        'Rapidly decolorizes bromine water and cold aqueous KMnO₄ across the double bond.',
        'Hydrogenates over Ni to Cyclopentane and hydrates under acid catalysis to Cyclopentanol.',
        'Undergoes ring-opening metathesis polymerization into synthetic rubber.'
      ],
      note: 'Có công thức C₅H₈, đồng phân với Isoprene và Pentyne.',
      noteEn: 'Formula C₅H₈ — structural isomer of Isoprene and Pentynes.'
    },
    {
      id: 'cyclopentanol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','C','O'],
      bonds: [...C5_RING, [0,5,1]],
      name: 'Cyclopentanol',
      nameEn: 'Cyclopentanol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng sánh không màu (mùi bạc hà nhẹ)',
      stateEn: 'Colorless viscous liquid',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Dung môi hòa tan tốt các chất hữu cơ và là khối nguyên liệu quan trọng trong tổng hợp nước hoa, chất màu và nhiều dược chất hệ thần kinh.',
      realLifeEn: 'Solvent for dyes and fragrances, and versatile 5-membered ring building block in pharmaceuticals and perfumery.',
      reactions: [
        'Tác dụng với kim loại Na giải phóng khí H₂ tạo muối alkoxide.',
        'Tách nước bởi H₂SO₄ đặc ở 170°C tạo Cyclopentene làm mất màu nước Brom.',
        'Oxi hóa bởi K₂Cr₂O₇/H⁺ hoặc CuO đun nóng tạo Cyclopentanone (mùi bạc hà).'
      ],
      reactionsEn: [
        'Reacts smoothly with Na metal to liberate H₂ gas.',
        'Dehydrates with concentrated H₂SO₄ at ~170°C to yield Cyclopentene.',
        'Mild oxidation with CuO or dichromate yields the ketone Cyclopentanone.'
      ],
      note: 'Là alcohol bậc hai mạch vòng (C₅H₁₀O).',
      noteEn: 'Cyclic secondary alcohol (C₅H₁₀O); gives a ketone rather than an aldehyde upon mild oxidation.'
    },
    {
      id: 'cyclohexane',
      catKey: 'cycloalkane',
      elements: C6_AROM,
      bonds: C6_RING,
      name: 'Cyclohexane',
      nameEn: 'Cyclohexane',
      category: 'Cycloalkane',
      categoryEn: 'Cycloalkane',
      state: 'Lỏng không màu (mùi hơi giống xăng)',
      stateEn: 'Colorless liquid (mild detergent-like odor)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Nguyên liệu chủ lực sản lượng hàng triệu tấn dùng để sản xuất sợi tơ tổng hợp Nylon-6 và Nylon-6,6 bền dai may quần áo, dây dù và thảm trải sàn.',
      realLifeEn: 'High-volume industrial hydrocarbon almost exclusively converted into Adipic acid and Caprolactam for Nylon-6 and Nylon-6,6 fibers.',
      reactions: [
        'Không làm mất màu dung dịch Br₂ và KMnO₄ ở điều kiện thường (bền hóa học tương tự alkane).',
        'Oxi hóa bằng không khí (xúc tác muối Co) thành hỗn hợp Cyclohexanol/Cyclohexanone để sản xuất Nylon.',
        'Thế nguyên tử Br hoặc Cl dưới ánh sáng chiếu vào.'
      ],
      reactionsEn: [
        'Completely unreactive toward bromine water and cold KMnO₄ due to minimal ring strain.',
        'Catalytic air oxidation yields a Cyclohexanol/Cyclohexanone mixture bound for Nylon production.',
        'Photochemical radical halogenation substitutes on the ring without breaking it.'
      ],
      note: 'Trong không gian tồn tại chủ yếu ở dạng "ghế" bền nhất; được điều chế dễ dàng khi cộng 3 mol H₂ vào Benzene.',
      noteEn: 'Puckers into an unstrained "chair" conformation; synthesized industrially by hydrogenating Benzene with 3 H₂.'
    },
    {
      id: 'cyclohexene',
      catKey: 'cycloalkene',
      elements: C6_AROM,
      bonds: [[0,1,2],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,0,1]],
      name: 'Cyclohexene',
      nameEn: 'Cyclohexene',
      category: 'Cycloalkene',
      categoryEn: 'Cycloalkene',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Phụ gia ổn định dầu sinh học và hóa chất phổ biến trên phòng thí nghiệm hữu cơ nhờ phản ứng điều chế dễ dàng từ tách nước Cyclohexanol.',
      realLifeEn: 'Lab staple easily prepared via dehydration of Cyclohexanol and used as an intermediate for Adipic acid and Epoxides.',
      reactions: [
        'Làm mất màu ngay lập tức dung dịch nước Brom và dung dịch KMnO₄ loãng tạo cis-cyclohexane-1,2-diol.',
        'Oxi hóa mạnh cắt mạch bằng KMnO₄ đun nóng trong môi trường acid tạo Adipic acid.',
        'Cộng hợp với H₂ (Ni, t°) tạo Cyclohexane.'
      ],
      reactionsEn: [
        'Instantly decolorizes bromine water and cold dilute KMnO₄ (yielding cis-cyclohexane-1,2-diol).',
        'Hot acidic KMnO₄ cleaves the double bond to yield Adipic acid.',
        'Hydrogenates readily over Ni to Cyclohexane.'
      ],
      note: 'Tổng hợp chuẩn trong phòng thí nghiệm bằng cách đun Cyclohexanol với H₂SO₄ hoặc H₃PO₄ đặc.',
      noteEn: 'Classic undergraduate organic lab synthesis by dehydrating Cyclohexanol over H₃PO₄ or H₂SO₄.'
    },
    {
      id: 'cyclohexa-1,3-diene',
      catKey: 'cycloalkene',
      elements: C6_AROM,
      bonds: [[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,1],[5,0,1]],
      name: 'Cyclohexa-1,3-diene',
      nameEn: '1,3-Cyclohexadiene',
      category: 'Cycloalkene',
      categoryEn: 'Cycloalkene',
      state: 'Lỏng không màu (dễ cháy)',
      stateEn: 'Colorless flammable liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Hợp chất mô hình lý tưởng dùng nghiên cứu phản ứng cộng đóng vòng Diels–Alder trong tổng hợp thuốc và vật liệu polymer tiên tiến.',
      realLifeEn: 'Textbook locked cis-diene substrate celebrated for demonstrating rapid Diels–Alder cycloadditions in pharmaceutical synthesis.',
      reactions: [
        'Làm mất màu dung dịch Br₂ (cộng 1,2 hoặc 1,4) và KMnO₄ rất nhanh ở nhiệt độ thường.',
        'Dễ dàng nhường cặp nguyên tử H cho các phân tử khác khi đun nóng để chuyển về vòng Benzene bền vững.',
        'Tham gia cộng đóng vòng Diels–Alder nhạy bén với các alkene nghèo electron.'
      ],
      reactionsEn: [
        'Rapidly decolorizes Br₂(aq) (via 1,2 and 1,4 addition) and cold KMnO₄.',
        'Readily acts as a Hydrogen donor (transfer hydrogenation) because aromatizing to Benzene is highly exothermic.',
        'Undergoes fast Diels–Alder cycloadditions with electron-poor dienophiles.'
      ],
      note: 'Tỏa ít nhiệt hơn dự kiến khi cộng H₂ — minh chứng kinh điển về năng lượng liên hợp giữa hai nối đôi.',
      noteEn: 'Exhibits measurable conjugation stabilization energy upon catalytic hydrogenation.'
    },
    {
      id: 'cyclohexanol',
      catKey: 'alcohol',
      elements: [...C6_AROM,'O'],
      bonds: [...C6_RING, [0,6,1]],
      name: 'Cyclohexanol',
      nameEn: 'Cyclohexanol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Rắn mềm hoặc lỏng sệt (nóng chảy ở 25°C)',
      stateEn: 'Waxy solid / viscous liquid (mp 25°C)',
      solubility: 'Ít tan trong nước (~3,6 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~3.6 g/100 mL)',
      realLife: 'Có mùi gần giống long não; là hóa chất trung gian tỷ đô để chuyển hóa thành Adipic acid và Caprolactam dệt sợi tơ Nylon bền bỉ.',
      realLifeEn: 'Camphor-scented intermediate produced globally on a multi-million-ton scale as a precursor to Nylon fibers and plasticizers.',
      reactions: [
        'Tác dụng với Na giải phóng khí H₂ nhưng không phản ứng với dung dịch NaOH (khác hoàn toàn với Phenol).',
        'Đun nóng với H₃PO₄ đặc (165°C) tách nước tạo Cyclohexene.',
        'Oxi hóa bởi HNO₃ đặc nóng cắt vòng tạo Adipic acid để tổng hợp tơ Nylon-6,6.'
      ],
      reactionsEn: [
        'Reacts with metallic Na to produce H₂ but shows zero reaction with NaOH(aq) (unlike Phenol).',
        'Dehydrates smoothly over hot H₃PO₄ to Cyclohexene.',
        'Vigorous oxidation with hot HNO₃ cleaves the ring into Adipic acid for Nylon-6,6 synthesis.'
      ],
      note: 'Rất hay được đối chiếu với Phenol: Cyclohexanol chỉ mất mùi Na còn Phenol phản ứng với cả NaOH lẫn nước Brom.',
      noteEn: 'Often paired in contrast questions with Phenol: Cyclohexanol lacks acidity and does not react with NaOH or Br₂(aq).'
    },
    {
      id: 'cyclohexanone',
      catKey: 'ketone',
      elements: [...C6_AROM,'O'],
      bonds: [...C6_RING, [0,6,2]],
      name: 'Cyclohexanone',
      nameEn: 'Cyclohexanone',
      category: 'Ketone',
      categoryEn: 'Ketone',
      state: 'Lỏng không màu (mùi bạc hà giống Acetone)',
      stateEn: 'Colorless liquid (peppermint/acetone odor)',
      solubility: 'Tan ít trong nước (~9 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~9 g/100 mL)',
      realLife: 'Dung môi chuyên dụng dán ống nhựa PVC và sản xuất băng từ, phần lớn sản lượng công nghiệp được chuyển hóa thành Caprolactam làm sợi tơ tằm nhân tạo Nylon-6 (tơ Capron).',
      realLifeEn: 'Solvent in PVC cements and industrial key intermediate converted into ε-Caprolactam to manufacture Nylon-6.',
      reactions: [
        'KHÔNG phản ứng tráng bạc với AgNO₃/NH₃ (đặc trưng Ketone) nhưng tạo kết tủa vàng cam với thuốc thử 2,4-DNPH.',
        'Cộng H₂ (xúc tác Ni hoặc khử bằng NaBH₄) chuyển thành Cyclohexanol.',
        'Phản ứng với Hydroxylamine rồi chuyển vị tạo Caprolactam — monomer của tơ Capron (Nylon-6).'
      ],
      reactionsEn: [
        'Gives NO Tollens silver mirror (ketone), yet reacts cleanly with 2,4-DNPH to form a yellow-orange hydrazone.',
        'Reduces smoothly with H₂/Ni or NaBH₄ back to Cyclohexanol.',
        'Condenses with Hydroxylamine followed by Beckmann rearrangement into ε-Caprolactam (for Nylon-6).'
      ],
      note: 'Cùng với Cyclohexanol tạo thành "hỗn hợp KA oil" cực kỳ quan trọng trong hóa dầu tổng hợp tơ Nylon.',
      noteEn: 'Together with Cyclohexanol forms industrial "KA oil", the primary gateway to Nylon polymers.'
    },
    // =========================================================================
    // 4. HETEROCYCLES (46 - 51)
    // =========================================================================
    {
      id: 'oxirane',
      catKey: 'heterocycle',
      elements: ['C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,0,1]],
      name: 'Ethylene oxide (Oxirane)',
      nameEn: 'Ethylene oxide (Oxirane)',
      category: 'Heterocycle',
      categoryEn: 'Heterocycle',
      state: 'Khí không màu (dễ hóa lỏng ở 10,7°C)',
      stateEn: 'Colorless gas (bp 10.7°C)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Khí tiệt trùng lạnh cho ống tiêm, băng gạc và dụng cụ phẫu thuật nhựa nhạy nhiệt (không chịu được hấp nóng); trong công nghiệp dùng sản xuất chất chống đông và chất giặt rửa.',
      realLifeEn: 'Cold sterilizing gas for heat-sensitive hospital medical plastics and industrial feedstock for Ethylene glycol antifreeze and detergents.',
      reactions: [
        'Cộng hợp mở vòng rất dễ dàng với H₂O (xúc tác acid) tạo thành Ethylene glycol.',
        'Phản ứng mở vòng với dung dịch NH₃ tạo Ethanolamine dùng trong mỹ phẩm và xử lý khí thải.',
        'Căng vòng mạnh nên dễ tham gia phản ứng với các Alcohol tạo chất hoạt động bề mặt không ion.'
      ],
      reactionsEn: [
        'Strain promotes rapid acid-catalyzed ring-opening with water to produce Ethylene glycol.',
        'Reacts with Ammonia to form Ethanolamines used in gas scrubbing and soaps.',
        'Opens cleanly with Alcohols to synthesize non-ionic surfactants.'
      ],
      note: 'Là đồng phân mạch vòng của Acetaldehyde và Vinyl alcohol (C₂H₄O); rất dễ cháy nổ khi tiếp xúc không khí.',
      noteEn: 'Cyclic Ether isomer of Acetaldehyde (C₂H₄O); high 3-membered ring strain makes it unusually reactive.'
    },
    {
      id: 'thf',
      catKey: 'heterocycle',
      elements: ['C','C','C','C','O'],
      bonds: C5_RING,
      name: 'Tetrahydrofuran (THF)',
      nameEn: 'Tetrahydrofuran (THF)',
      category: 'Heterocycle',
      categoryEn: 'Heterocycle',
      state: 'Lỏng không màu (mùi giống Ether)',
      stateEn: 'Colorless mobile liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi phòng thí nghiệm "vạn năng" chuyên hòa tan nhựa PVC dùng làm keo dán ống nhựa, băng từ và là môi trường chuẩn cho các phản ứng tổng hợp hữu cơ nhạy ẩm.',
      realLifeEn: 'Versatile aprotic lab solvent that dissolves PVC for pipe cements and stabilizes Grignard and lithium hydride reagents.',
      reactions: [
        'Không tác dụng với kim loại Na (thường đun hoàn lưu với Na để làm khô hoàn toàn trước khi tổng hợp hữu cơ).',
        'Trùng hợp mở vòng dưới xúc tác acid tạo thành Poly(tetramethylene ether) glycol dùng sản xuất vải thun co giãn Spandex.',
        'Tác dụng chậm với HBr nóng tạo 1,4-dibromobutane.'
      ],
      reactionsEn: [
        'Inert to metallic Na — routinely distilled over Sodium/Benzophenone to obtain rigorously dry solvent.',
        'Acid-catalyzed ring-opening polymerization yields polyols used in elastic Spandex fibers.',
        'Hot concentrated HBr cleaves the ring into 1,4-dibromobutane.'
      ],
      note: 'Khác với Diethyl ether không tan trong nước, cấu trúc gọn vòng giúp THF trộn lẫn hoàn toàn với nước.',
      noteEn: 'Unlike Diethyl ether, THF is completely miscible with water because its Oxygen lone pairs are sterically exposed.'
    },
    {
      id: 'furan',
      catKey: 'heterocycle',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,0,1]],
      name: 'Furan',
      nameEn: 'Furan',
      category: 'Heterocycle',
      categoryEn: 'Heterocycle',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi 31°C)',
      stateEn: 'Colorless volatile liquid (bp 31°C)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Chất lỏng dễ bay hơi sinh ra ở lượng vết khi rang cà phê, nướng bánh mì (tạo hương thơm nướng) và là nhân hóa học cơ sở để chuyển hóa sinh khối thực vật thành dung môi THF.',
      realLifeEn: 'Formed in trace amounts during coffee roasting and baking, and produced industrially from agricultural biomass (corncobs) en route to THF.',
      reactions: [
        'Tham gia phản ứng cộng với H₂ (xúc tác Ni/Pd) tạo dung môi Tetrahydrofuran (THF).',
        'Hoạt tính thơm yếu hơn Benzene nên tham gia phản ứng cộng Diels–Alder nhanh và phản ứng thế rất nhẹ nhàng.',
        'Dễ bị polymer hóa tạo nhựa tối màu nếu tiếp xúc với acid vô cơ mạnh.'
      ],
      reactionsEn: [
        'Catalytic hydrogenation converts Furan directly into Tetrahydrofuran (THF).',
        'Behaves as a reactive conjugated diene in Diels–Alder cycloadditions due to lower aromaticity than Benzene.',
        'Rapidly resinifies in strong mineral acids.'
      ],
      note: 'Có công thức C₄H₄O; sản xuất từ Furfural chiết xuất từ vỏ trấu và lõi ngô.',
      noteEn: 'Formula C₄H₄O; bio-derived industrially from pentose-rich crop waste via Furfural.'
    },
    {
      id: 'thp',
      catKey: 'heterocycle',
      elements: ['C','C','C','C','C','O'],
      bonds: C6_RING,
      name: 'Tetrahydropyran (THP)',
      nameEn: 'Tetrahydropyran (THP)',
      category: 'Heterocycle',
      categoryEn: 'Heterocycle',
      state: 'Lỏng không màu (bay hơi vừa phải)',
      stateEn: 'Colorless liquid',
      solubility: 'Tan tốt trong nước lạnh',
      solubilityEn: 'Soluble in cold water',
      realLife: 'Bộ khung cốt lõi tạo nên hình dáng tự nhiên của đường Glucose, tinh bột và Cellulose trong thực vật, đồng thời là nhóm bảo vệ quen thuộc trong tổng hợp dược phẩm phức tạp.',
      realLifeEn: 'Fundamental skeletal ring underlying Glucose, starch, and cellulose, and a standard alcohol-protecting motif in organic synthesis.',
      reactions: [
        'Bền vững trước các tác nhân kiềm và chất khử mạnh như Na, LiAlH₄.',
        'Liên kết vòng bị cắt đứt khi đun nóng với dung dịch acid HI đặc tạo 1,5-diiodopentane.',
        'Nhóm bảo vệ THP gắn trên alcohol dễ dàng tháo bỏ trong dung dịch acid loãng ấm.'
      ],
      reactionsEn: [
        'Completely stable toward strong bases, Grignard reagents, and hydrides.',
        'Ring-cleaves on prolonged heating with concentrated HI to give 1,5-diiodopentane.',
        'Related THP acetal protecting groups cleave smoothly in warm dilute aqueous acid.'
      ],
      note: 'Vòng 6 cạnh bão hòa chứa 1 O này là nguồn gốc tên gọi "pyranose" của các loại đường lục giác.',
      noteEn: 'This 6-membered cyclic ether inspires the "pyranose" name given to 6-membered ring sugars.'
    },
    {
      id: 'pyridine',
      catKey: 'heterocycle',
      elements: ['C','C','C','C','C','N'],
      bonds: BENZENE,
      name: 'Pyridine',
      nameEn: 'Pyridine',
      category: 'Heterocycle',
      categoryEn: 'Heterocycle',
      state: 'Lỏng không màu (mùi cá tanh nồng khó chịu)',
      stateEn: 'Colorless liquid (sharp fishy odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi kiềm nhẹ dùng để bắt giữ acid sinh ra trong tổng hợp thuốc và là bộ khung dị vòng quý giá tạo nên vitamin B3 (Niacin), vitamin B6 và chất diệt cỏ.',
      realLifeEn: 'Basic miscible solvent that scavenges acid byproducts in synthesis, and core heterocyclic unit of vitamin B3 (Niacin) and vitamin B6.',
      reactions: [
        'Có tính base yếu: làm xanh nhẹ giấy quỳ ẩm và phản ứng ngay với acid HCl tạo muối Pyridinium chloride tan tốt.',
        'Rất bền vững về mặt thơm — KHÔNG làm mất màu nước Brom hay dung dịch KMnO₄.',
        'Không tạo phức với H⁺ cản trở vòng như Benzene nên khó tham gia phản ứng thế ái điện tử (cần nhiệt độ rất cao).'
      ],
      reactionsEn: [
        'Acts as a weak tertiary base: reacts briskly with HCl to form crystalline Pyridinium chloride salt.',
        'Exhibits full aromatic stability — inert toward cold bromine water and dilute KMnO₄.',
        'Highly deactivated toward electrophilic substitution relative to Benzene because ring Nitrogen pulls electron density.'
      ],
      note: 'Công thức C₅H₅N; đồng phân điện tử thơm trực tiếp với Benzene nhưng tan hoàn toàn trong nước.',
      noteEn: 'Aza-analog of Benzene (C₅H₅N); unlike hydrophobic Benzene, it is completely water-miscible.'
    },
    {
      id: 'pyrrole',
      catKey: 'heterocycle',
      elements: ['C','C','C','C','N'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,0,1]],
      name: 'Pyrrole',
      nameEn: 'Pyrrole',
      category: 'Heterocycle',
      categoryEn: 'Heterocycle',
      state: 'Lỏng không màu (sẫm màu dần thành nâu ngoài sáng)',
      stateEn: 'Colorless liquid (darkens upon air exposure)',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Mảnh ghép sinh hóa vĩ đại nhất tự nhiên: bốn đơn vị ghép vòng lại tạo nên nhân Hem vận chuyển Oxygen trong hồng cầu máu và chất diệp lục Chlorophyll làm lá cây có màu xanh.',
      realLifeEn: 'One of biology’s grandest building blocks: four Pyrrole units fuse into the porphyrin rings of blood Hemoglobin and plant Chlorophyll.',
      reactions: [
        'Tính base CỰC KỲ YẾU — hầu như trung tính và không tạo muối bền với HCl loãng (khác hẳn Pyridine).',
        'Ngược lại có tính acid yếu ở nhóm >N–H (phản ứng được với kim loại K giải phóng khí H₂).',
        'Rất giàu mật độ electron nên dễ tham gia phản ứng thế hoặc tạo polymer dẫn điện Polypyrrole màu đen.'
      ],
      reactionsEn: [
        'Practically NON-BASIC in water because the Nitrogen lone pair is committed to the aromatic 6π system (unlike Pyridine).',
        'Weakly acidic at the N–H site, reacting cleanly with Potassium metal to liberate H₂.',
        'Polymerizes chemically or electrochemically into conducting Polypyrrole.'
      ],
      note: 'Đừng nhầm Pyridine (tính base rõ) với Pyrrole (gần như mất tính base để giữ bền vòng thơm).',
      noteEn: 'Contrast with Pyridine: Pyrrole sacrifices basicity so Nitrogen’s lone pair can complete the aromatic sextet.'
    },

    // =========================================================================
    // 5. OPEN-CHAIN HYDROCARBONS: ALKANES, ALKENES, ALKADIENES & ALKYNES (52 - 73)
    // =========================================================================
    {
      id: 'methane',
      catKey: 'alkane',
      elements: ['C'],
      bonds: [],
      name: 'Methane',
      nameEn: 'Methane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Khí không màu, không mùi (nhẹ hơn không khí)',
      stateEn: 'Colorless, odorless gas (lighter than air)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Thành phần chính (80–95%) của khí thiên nhiên khai thác từ mỏ dầu, khí đồng hành, hầm biogas chăn nuôi và khí bùn ao; nhiên liệu sạch đốt sinh ít khói.',
      realLifeEn: 'Primary constituent of natural gas, biogas digesters, and marsh gas; a clean-burning household heating fuel.',
      reactions: [
        'Thế với khí Cl₂ dưới ánh sáng khuếch tán tạo hỗn hợp Chloromethane, Dichloromethane, Chloroform và CCl₄.',
        'Cháy hoàn toàn với ngọn lửa xanh nhạt tạo CO₂ và H₂O (nổ mạnh khi trộn với O₂ tỉ lệ 1 : 2).',
        'Nhiệt phân nhanh ở 1500°C làm lạnh đột ngột tạo Acetylene (C₂H₂) và khí H₂ — phản ứng điều chế công nghiệp quan trọng.'
      ],
      reactionsEn: [
        'Undergoes photochemical radical chlorination step-wise to CH₃Cl, CH₂Cl₂, CHCl₃, and CCl₄.',
        'Burns with a pale blue flame releasing large heat (explosive 1:2 mixture with Oxygen — firedamp).',
        'Rapid pyrolysis at 1500°C followed by rapid quenching yields Acetylene and H₂ gas.'
      ],
      note: 'Khí thiên nhiên vốn không mùi; người ta pha thêm chất có mùi tỏi thối (mercaptan) để phát hiện rò rỉ.',
      noteEn: 'Pure Methane is odorless — trace sulfur odorants are deliberately added to domestic gas supplies for leak safety.'
    },
    {
      id: 'ethane',
      catKey: 'alkane',
      elements: ['C','C'],
      bonds: [[0,1,1]],
      name: 'Ethane',
      nameEn: 'Ethane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Khí không màu, không mùi',
      stateEn: 'Colorless, odorless gas',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Thành phần nhiều thứ hai trong khí thiên nhiên sau Methane; giá trị kinh tế lớn nhất là làm nguyên liệu nhà máy hóa dầu để "cracking hơi nước" sản xuất Ethylene.',
      realLifeEn: 'Second largest component of natural gas, primarily steam-cracked industrially at high temperature to produce Ethylene.',
      reactions: [
        'Phản ứng cracking / tách H₂ ở nhiệt độ cao (xúc tác) cho hiệu suất Ethylene rất cao và khí H₂.',
        'Thế gốc tự do với Cl₂ hoặc Br₂ khi chiếu sáng tạo Ethyl chloride hoặc Ethyl bromide.',
        'Hoàn toàn không làm mất màu dung dịch nước Brom và KMnO₄ ở điều kiện thường.'
      ],
      reactionsEn: [
        'Steam cracking / catalytic dehydrogenation converts Ethane selectively into Ethylene and H₂.',
        'Reacts with Cl₂ under UV irradiation to yield Chloroethane.',
        'Completely unreactive toward bromine water and aqueous KMnO₄ at ambient conditions.'
      ],
      note: 'Chủ yếu sản xuất bằng phản ứng cracking công nghiệp; khác Methane, Ethane không tự có mùi và nhẹ gần bằng không khí.',
      noteEn: 'Unlike heavier Butane, Ethane is much harder to liquefy at room temperature and has virtually identical molar mass to air.'
    },
    {
      id: 'propane',
      catKey: 'alkane',
      elements: ['C','C','C'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Propane',
      nameEn: 'Propane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Khí không màu (hóa lỏng dưới áp suất vừa)',
      stateEn: 'Colorless gas (liquefied under pressure)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Thành phần cốt lõi trong bình gas đun nấu (LPG) trộn cùng Butane, cung cấp nguồn nhiệt sạch ổn định cho bếp gia đình, xe nâng nhà kho và đèn khò dã ngoại.',
      realLifeEn: 'Clean-burning core component of bottled LPG cooking fuel, barbecue grills, warehouse forklifts, and outdoor heaters.',
      reactions: [
        'Cháy hoàn toàn tạo 3 mol CO₂ và 4 mol H₂O (lượng H₂O lớn hơn CO₂ — dấu hiệu đặc trưng của Alkane).',
        'Thế Br₂ có ánh sáng tạo sản phẩm chính là 2-bromopropane (ưu tiên thế vào Carbon bậc cao hơn).',
        'Tách H₂ hoặc cracking nhiệt tạo Propene, Ethylene và Methane.'
      ],
      reactionsEn: [
        'Combustion generates 3 CO₂ and 4 H₂O (n(H₂O) > n(CO₂), a diagnostic hallmark of saturated alkanes).',
        'Photochemical bromination predominantly forms 2-bromopropane by targeting the secondary Carbon.',
        'Thermal cracking yields mixtures of Propene, Ethylene, and Methane.'
      ],
      note: 'Ghi nhớ quy tắc thế Alkane: nguyên tử halogen ưu tiên thế vào nguyên tử Carbon bậc cao hơn.',
      noteEn: 'Demonstrates alkane substitution selectivity: secondary hydrogens replace significantly faster than primary ones.'
    },
    {
      id: 'butane',
      catKey: 'alkane',
      elements: ['C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: 'Butane',
      nameEn: 'Butane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Khí không màu (sôi ở −0,5°C, rất dễ hóa lỏng)',
      stateEn: 'Colorless gas (bp −0.5°C, easily liquefied)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Chất lỏng trong suốt bập bùng dưới đáy bật lửa ga nhựa và lon gas mini nấu lẩu ngoài trời; chỉ cần áp suất nén nhẹ trong vỏ nhựa là giữ được ở thể lỏng.',
      realLifeEn: 'Clear liquefied fuel visible inside disposable cigarette lighters and portable camping stove canisters.',
      reactions: [
        'Oxi hóa không hoàn toàn có xúc tác Mn²⁺ là quy trình điều chế Acetic acid công nghiệp trước đây.',
        'Cracking nhiệt hoặc tách H₂ cho hỗn hợp Butenes / Buta-1,3-diene để tổng hợp cao su nhân tạo.',
        'Đồng phân hóa mạch Carbon với xúc tác AlCl₃/HCl tạo Isobutane làm nguyên liệu xăng có chỉ số octane cao.'
      ],
      reactionsEn: [
        'Catalytic air oxidation yields Acetic acid industrially.',
        'Catalytic dehydrogenation produces Butenes and Buta-1,3-diene for synthetic rubber.',
        'Acid-catalyzed skeletal isomerization converts Butane into Isobutane.'
      ],
      note: 'Từ C₄H₁₀ bắt đầu xuất hiện đồng phân mạch Carbon (n-Butane mạch thẳng và Isobutane mạch nhánh).',
      noteEn: 'C₄H₁₀ is the smallest alkane exhibiting structural isomerism (linear Butane vs. branched Isobutane).'
    },
    {
      id: 'isobutane',
      catKey: 'alkane',
      elements: ['C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[1,3,1]],
      name: 'Isobutane',
      nameEn: 'Isobutane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Khí không màu (hóa lỏng ở −11,7°C)',
      stateEn: 'Colorless gas (bp −11.7°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Môi chất làm lạnh thế hệ xanh (ký hiệu R-600a) chạy trong lốc máy phần lớn tủ lạnh gia đình tiết kiệm điện ngày nay thay cho khí CFC hại tầng ozone, đồng thời dùng sản xuất xăng chất lượng cao.',
      realLifeEn: 'Eco-friendly R-600a refrigerant powering modern energy-efficient refrigerators instead of ozone-depleting CFCs, and feedstock for high-octane gasoline.',
      reactions: [
        'Phản ứng thế Br₂ (chiếu sáng) cho sản phẩm chính 2-bromo-2-methylpropane cực kỳ chọn lọc (~99%).',
        'Tách H₂ thu được Isobutene dùng làm cao su butyl và phụ gia tăng trị số octane.',
        'Cộng hợp alkyl hóa với Butene (xúc tác acid mạnh) tạo trực tiếp Isooctane cho xăng máy bay và ô tô.'
      ],
      reactionsEn: [
        'Photochemical bromination proceeds with ~99% selectivity at the lone tertiary Carbon.',
        'Dehydrogenates cleanly into Isobutene.',
        'Acid-catalyzed alkylation with Butenes directly yields high-octane Isooctane gasoline.'
      ],
      note: 'Tên thay thế chuẩn GDPT 2018: 2-methylpropane; có nhiệt độ sôi thấp hơn Butane mạch thẳng.',
      noteEn: 'IUPAC name: 2-methylpropane; branching lowers its boiling point by ~11°C compared with n-Butane.'
    },
    {
      id: 'pentane',
      catKey: 'alkane',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1]],
      name: 'Pentane',
      nameEn: 'Pentane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Lỏng không màu (dễ bay hơi ở 36°C)',
      stateEn: 'Colorless volatile liquid (bp 36°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Chất lỏng bốc hơi cực nhanh có mặt trong phân đoạn nhẹ của dầu mỏ; được dùng để tạo hạt nhựa xốp EPS nở phồng làm thùng giữ nhiệt, mũ bảo hiểm và vật liệu địa nhiệt.',
      realLifeEn: 'Primary blowing agent trapped inside polystyrene beads to expand EPS foam boxes and helmet liners, plus fast-evaporating lab solvent.',
      reactions: [
        'Bền vững trước các dung dịch acid, kiềm, nước Brom và KMnO₄ ở nhiệt độ thường.',
        'Thế Cl₂ hoặc Br₂ khi chiếu sáng tạo hỗn hợp tới 3 dẫn xuất monohalogen đồng phân.',
        'Cracking nhiệt đứt mạch thành phân tử Alkane và Alkene nhỏ hơn.'
      ],
      reactionsEn: [
        'Chemically inert toward mineral acids, bases, bromine water, and KMnO₄ at ambient temperatures.',
        'Photochemical chlorination affords three distinct monochloropentane constitutional isomers.',
        'Undergoes thermal cracking to shorter alkanes and alkenes.'
      ],
      note: 'Là alkane mạch thẳng nhỏ nhất ở thể lỏng tại 25°C; C₅H₁₂ có tất cả 3 đồng phân cấu tạo.',
      noteEn: 'Smallest n-alkane that is liquid at 25°C; C₅H₁₂ possesses three constitutional isomers (Pentane, Isopentane, Neopentane).'
    },
    {
      id: 'isopentane',
      catKey: 'alkane',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[1,4,1]],
      name: 'Isopentane',
      nameEn: 'Isopentane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ngay ở 28°C)',
      stateEn: 'Colorless ultra-volatile liquid (bp 27.8°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Chất lỏng có nhiệt độ sôi sát nhiệt độ cơ thể người (có thể tự sôi khi cầm bình trong lòng bàn tay ấm), dùng trong tuabin nhà máy điện địa nhiệt và tách H₂ làm cao su Isoprene.',
      realLifeEn: 'Liquid boiling just above room temperature (boils in a warm hand), used in geothermal power turbines and dehydrogenated to Isoprene rubber.',
      reactions: [
        'Tách H₂ hai giai đoạn chuyển hóa thành Isoprene dùng trùng hợp cao su Isoprene đàn hồi.',
        'Phản ứng thế Cl₂ (ánh sáng) tạo tới 4 sản phẩm dẫn xuất monochloro đồng phân.',
        'Cháy hoàn toàn tỏa nhiệt lớn và hoàn toàn không làm mất màu nước Brom.'
      ],
      reactionsEn: [
        'Catalytic two-stage dehydrogenation converts it into Isoprene monomer for synthetic rubber.',
        'Free-radical chlorination generates 4 constitutional monochloro isomers.',
        'Burns cleanly with zero decolorization of bromine water.'
      ],
      note: 'Tên chuẩn IUPAC: 2-methylbutane (đây cũng là alkane C₅H₁₂ tạo nhiều dẫn xuất thế nhất khi phản ứng với Cl₂).',
      noteEn: 'IUPAC name: 2-methylbutane; gives 4 monochloro isomers (useful benchmark in HSC counting problems).'
    },
    {
      id: 'neopentane',
      catKey: 'alkane',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,1],[0,2,1],[0,3,1],[0,4,1]],
      name: 'Neopentane',
      nameEn: 'Neopentane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Khí không màu (sôi thấp ở 9,5°C)',
      stateEn: 'Colorless gas (bp 9.5°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Chất khí nhỏ gọn hình cầu dù có cùng khối lượng với Pentane lỏng nhờ diện tích tiếp xúc nhỏ nên lực tương tác Van der Waals giữa các phân tử yếu hẳn đi.',
      realLifeEn: 'Compact spherical gas at room temperature despite having the exact same mass as liquid Pentane due to weaker intermolecular contacts.',
      reactions: [
        'Khi thế Cl₂ hoặc Br₂ (ánh sáng) CHỈ TẠO DUY NHẤT 1 dẫn xuất monohalogen (do cả 4 nhánh methyl đối xứng y hệt nhau).',
        'Không có nguyên tử H ở Carbon trung tâm nên không thể tách H₂ tạo thành Alkene.',
        'Trơ hóa học với dung dịch acid, base, nước Brom và KMnO₄ ở nhiệt độ thường.'
      ],
      reactionsEn: [
        'Photochemical monohalogenation yields ONE SINGLE constitutional isomer because all 12 Hydrogens are symmetry-equivalent.',
        'Cannot undergo 1,2-dehydrogenation directly to an alkene due to lacking β-hydrogens at the quaternary core.',
        'Resistant to cold bromine water and permanganate solutions.'
      ],
      note: 'Tên chuẩn IUPAC: 2,2-dimethylpropane; câu hỏi "C₅H₁₂ phản ứng Cl₂ chỉ tạo 1 sản phẩm thế" chắc chắn là Neopentane.',
      noteEn: 'IUPAC name: 2,2-dimethylpropane; famed textbook example giving a single monohalogenation product.'
    },
    {
      id: 'hexane',
      catKey: 'alkane',
      elements: C6_AROM,
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1]],
      name: 'Hexane',
      nameEn: 'Hexane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Lỏng không màu (mùi xăng nhẹ)',
      stateEn: 'Colorless liquid (faint gasoline odor)',
      solubility: 'Không tan trong nước, nhẹ hơn nước',
      solubilityEn: 'Insoluble in water (less dense than water)',
      realLife: 'Dung môi trích ly thực phẩm phổ biến nhất dùng để tách kiệt dầu ăn từ hạt đậu nành, hướng dương, hạt cải (sau đó chưng cất thu hồi dung môi hoàn toàn) và làm dung môi keo dán giày da.',
      realLifeEn: 'Principal nonpolar solvent used globally to extract cooking oils from soybeans and canola seeds, and in rubber/shoe glues.',
      reactions: [
        'Đóng vòng tách H₂ (reforming xúc tác Pt/Al₂O₃, 500°C) chuyển thành Benzene và khí H₂ — giúp nâng cao chỉ số octane xăng.',
        'Tham gia cracking đứt mạch thành Alkane và Alkene ngắn hơn khi đun nóng.',
        'Phản ứng thế Cl₂ khi chiếu sáng tạo hỗn hợp 3 đồng phân monochlorohexane.'
      ],
      reactionsEn: [
        'Catalytic dehydrocyclization (reforming) over Pt/Al₂O₃ converts Hexane directly into Benzene + 4 H₂.',
        'Cracks thermally into lower-boiling gasoline-range alkenes and alkanes.',
        'Radical chlorination produces 3 monochlorohexane positional isomers.'
      ],
      note: 'Reforming chuyển đổi alkane mạch thẳng ít giá trị thành Arene (Benzene) giúp tăng chỉ số chống kích nổ xăng.',
      noteEn: 'Hydrocarbon reforming turns low-octane straight Hexane into high-octane aromatic Benzene.'
    },
    {
      id: 'heptane',
      catKey: 'alkane',
      elements: ['C','C','C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1]],
      name: 'Heptane',
      nameEn: 'Heptane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Có mặt trong xăng dầu tự nhiên nhưng lại gây kích nổ động cơ rất mạnh; do đó được chọn làm mốc chuẩn 0 trên thang đo chỉ số Octane của nhiên liệu xăng (trái ngược với mức 100 của Isooctane).',
      realLifeEn: 'Knocks violently in internal-combustion engines, earning the exact 0 point on the gasoline Octane Rating scale.',
      reactions: [
        'Reforming xúc tác (Pt, t°) đóng vòng thơm hóa thành Toluene (tăng mạnh chất lượng xăng) kèm khí H₂.',
        'Phản ứng thế gốc tự do với Br₂ khi chiếu ánh sáng.',
        'Cháy hoàn toàn cho ngọn lửa vàng rực tỏa nhiệt cao nhưng kích nổ sớm khi nén mạnh.'
      ],
      reactionsEn: [
        'Catalytic reforming converts n-Heptane directly into high-octane Toluene and Hydrogen gas.',
        'Undergoes UV-initiated radical bromination along its methylene chain.',
        'Auto-ignites easily under engine compression (0 octane rating).'
      ],
      note: 'Chỉ số Octane của xăng (như RON 95) nghĩa là độ chống kích nổ tương đương hỗn hợp 95% Isooctane + 5% Heptane.',
      noteEn: 'RON 95 gasoline matches the anti-knock behavior of 95% Isooctane blended with 5% n-Heptane.'
    },
    {
      id: 'octane',
      catKey: 'alkane',
      elements: ['C','C','C','C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1]],
      name: 'Octane',
      nameEn: 'Octane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Thành phần tiêu biểu trong dải chưng cất xăng khoáng (xăng chứa chủ yếu hydrocarbon từ 5 đến 12 Carbon), cung cấp năng lượng cho động cơ ô tô và xe máy.',
      realLifeEn: 'Representative hydrocarbon component of automotive gasoline fuel.',
      reactions: [
        'Cháy tỏa rất nhiều nhiệt: 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O.',
        'Tham gia cracking hoặc reforming xúc tác để tạo các nhánh ngắn và vòng thơm có giá trị nhiên liệu cao hơn.',
        'Hoàn toàn không làm mất màu dung dịch KMnO₄ và nước Brom.'
      ],
      reactionsEn: [
        'Combusts exothermically (2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O) to power piston engines.',
        'Refined via catalytic cracking and isomerization into branched fuels and Xylenes.',
        'Inert to cold bromine water and permanganate solutions.'
      ],
      note: 'Mạch thẳng n-Octane có chỉ số chống kích nổ rất kém (trái ngược hẳn với đồng phân phân nhánh mạnh Isooctane).',
      noteEn: 'Surprisingly, straight n-Octane actually has a negative octane rating — very different from branched Isooctane!'
    },
    {
      id: 'isooctane',
      catKey: 'alkane',
      elements: ['C','C','C','C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[1,5,1],[1,6,1],[3,7,1]],
      name: 'Isooctane',
      nameEn: 'Isooctane',
      category: 'Alkane',
      categoryEn: 'Alkane',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Nhiên liệu vàng của ngành động cơ đốt trong: được lấy làm mốc chuẩn chống kích nổ 100 điểm trong bảng đo chỉ số Octane của xăng RON 92, RON 95 trên cây xăng toàn cầu.',
      realLifeEn: 'Gold-standard anti-knock benchmark defining the 100 mark on global gasoline Octane Rating pumps (RON 92, 95).',
      reactions: [
        'Cháy êm trong xi lanh dưới áp suất nén cao mà không gây kích nổ tự phát sớm.',
        'Sản xuất công nghiệp qua phản ứng cộng hợp (alkyl hóa) giữa Isobutane và Isobutene có xúc tác acid.',
        'Bền vững hoàn toàn với dung dịch kiềm, acid vô cơ và nước Brom.'
      ],
      reactionsEn: [
        'Resists premature compression auto-ignition inside high-compression engines.',
        'Manufactured on a large scale via acid-catalyzed alkylation of Isobutane with Isobutene.',
        'Stable against cold Br₂(aq) and KMnO₄.'
      ],
      note: 'Tên hệ thống IUPAC chuẩn là 2,2,4-trimethylpentane (không phải đồng phân 2-methylheptane như tiền tố "iso" thông thường).',
      noteEn: 'Systematic IUPAC name is 2,2,4-trimethylpentane; shares formula C₈H₁₈ with n-Octane.'
    },
    {
      id: 'ethylene',
      catKey: 'alkene',
      elements: ['C','C'],
      bonds: [[0,1,2]],
      name: 'Ethylene',
      nameEn: 'Ethylene (Ethene)',
      category: 'Alkene',
      categoryEn: 'Alkene',
      state: 'Khí không màu (mùi ngọt rất nhẹ)',
      stateEn: 'Colorless gas (faint sweet odor)',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Hóa chất hữu cơ có sản lượng lớn nhất thế giới để sản xuất túi nilon, màng bọc, chai lọ nhựa PE; đồng thời là hormone thực vật tự nhiên do trái cây chín (như chuối, táo) tiết ra kích thích quả bên cạnh nhanh chín vàng.',
      realLifeEn: 'World’s most produced organic chemical (for Polyethylene PE bags and plastics) and natural ripening hormone emitted by apples and bananas.',
      reactions: [
        'Làm mất màu ngay dung dịch nước Brom (tạo 1,2-dibromoethane) và dung dịch KMnO₄ loãng tạo Ethylene glycol và kết tủa nâu đen MnO₂.',
        'Trùng hợp (t°, p cao, xt) tạo nhựa Polyethylene (PE).',
        'Cộng H₂O (xúc tác H₃PO₄, 300°C) tổng hợp Ethanol công nghiệp; cộng H₂ (Ni, t°) thành Ethane.'
      ],
      reactionsEn: [
        'Instantly decolorizes bromine water (to 1,2-dibromoethane) and cold KMnO₄ (to Ethylene glycol + brown MnO₂).',
        'Polymerizes into high-volume Polyethylene (PE) plastics.',
        'Acid-catalyzed hydration yields industrial Ethanol; hydrogenation over Ni forms Ethane.'
      ],
      note: 'Tên thay thế chuẩn GDPT 2018 là Ethene; mẹo để chuối xanh cạnh quả chín trong thùng kín giúp chín đồng loạt.',
      noteEn: 'Preferred IUPAC name: Ethene; explains why storing unripe green bananas in a closed bag with a ripe apple speeds ripening.'
    },
    {
      id: 'propylene',
      catKey: 'alkene',
      elements: ['C','C','C'],
      bonds: [[0,1,2],[1,2,1]],
      name: 'Propene (Propylene)',
      nameEn: 'Propene (Propylene)',
      category: 'Alkene',
      categoryEn: 'Alkene',
      state: 'Khí không màu',
      stateEn: 'Colorless gas',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Nguyên liệu cốt lõi tạo nhựa Polypropylene (PP) an toàn chịu nhiệt dùng làm hộp đựng thực phẩm quay được trong lò vi sóng, nắp chai, ống hút cứng và khẩu trang y tế.',
      realLifeEn: 'Feedstock for microwave-safe Polypropylene (PP) food containers, durable bottle caps, ropes, and medical fibers.',
      reactions: [
        'Cộng hợp tác nhân bất đối xứng (HCl, HBr, H₂O) tuân theo quy tắc Markovnikov cho sản phẩm chính bậc cao (VD: tạo Propan-2-ol).',
        'Trùng hợp (xt, t°, p) thành nhựa Polypropylene (PP) có nhánh -CH₃ đều đặn.',
        'Làm mất màu tức thì nước Brom và dung dịch KMnO₄ loãng ở nhiệt độ thường.'
      ],
      reactionsEn: [
        'Adds unsymmetrical reagents (HBr, H₂O/H⁺) by Markovnikov’s rule to give secondary major products (2-bromopropane, Propan-2-ol).',
        'Polymerizes via Ziegler–Natta catalysis into durable Polypropylene (PP).',
        'Decolorizes bromine water and cold aqueous KMnO₄ immediately.'
      ],
      note: 'Cộng với HBr luôn tạo sản phẩm chính gắn Br vào Carbon giữa mạch (2-bromopropane), không nằm ở đầu mạch.',
      noteEn: 'Classic Markovnikov substrate: H⁺ attaches to the terminal CH₂ carbon and Br⁻ to the central CH carbon.'
    },
    {
      id: 'but-1-ene',
      catKey: 'alkene',
      elements: ['C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,1]],
      name: 'But-1-ene',
      nameEn: 'But-1-ene',
      category: 'Alkene',
      categoryEn: 'Alkene',
      state: 'Khí không màu (sôi ở −6,3°C)',
      stateEn: 'Colorless gas (bp −6.3°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Phụ gia đồng trùng hợp cùng Ethylene giúp chế tạo nhựa màng co dẻo dai LLDPE làm bao bì đóng gói chịu lực kéo xé cực tốt và túi rác bền chắc.',
      realLifeEn: 'Essential comonomer blended with Ethylene to make tough, stretch-resistant LLDPE stretch wrap and heavy-duty plastic bags.',
      reactions: [
        'Làm mất màu dung dịch nước Brom và KMnO₄ loãng ở điều kiện thường.',
        'Cộng HBr theo quy tắc Markovnikov tạo sản phẩm chính 2-bromobutane.',
        'Không có đồng phân hình học cis–trans do một đầu nối đôi gắn với 2 nguyên tử H giống nhau.'
      ],
      reactionsEn: [
        'Decolorizes both bromine water and cold dilute KMnO₄.',
        'Markovnikov addition of HBr yields 2-bromobutane as the major isomer.',
        'Lacks cis–trans geometric isomerism because its terminal carbon carries two identical H atoms.'
      ],
      note: 'Dễ bị hỏi phân biệt với But-2-ene: But-1-ene KHÔNG có đồng phân hình học cis–trans còn But-2-ene thì CÓ.',
      noteEn: 'Key exam distinction: But-1-ene has NO geometric isomers, whereas internal isomer But-2-ene exhibits cis and trans forms.'
    },
    {
      id: 'but-2-ene',
      catKey: 'alkene',
      elements: ['C','C','C','C'],
      bonds: [[0,1,1],[1,2,2],[2,3,1]],
      name: 'But-2-ene',
      nameEn: 'But-2-ene',
      category: 'Alkene',
      categoryEn: 'Alkene',
      state: 'Khí không màu (dễ hóa lỏng gần 0°C)',
      stateEn: 'Colorless gas (bp ~1–4°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Sản phẩm của công nghệ chế biến dầu khí cracking, được dùng làm nguyên liệu điều chế dung môi sơn Butanone (MEK) và tổng hợp cao su nhân tạo Buta-1,3-diene.',
      realLifeEn: 'Petrochemical cracking olefin converted industrially into Butanone (MEK) coatings solvent and Buta-1,3-diene rubber.',
      reactions: [
        'Cộng HBr hoặc H₂O (H⁺) luôn chỉ tạo một sản phẩm duy nhất (2-bromobutane hoặc Butan-2-ol) nhờ cấu tạo đối xứng.',
        'Làm mất màu dung dịch Br₂ và KMnO₄ loãng ở nhiệt độ thường.',
        'Tồn tại hai đồng phân hình học cis-but-2-ene và trans-but-2-ene.'
      ],
      reactionsEn: [
        'Symmetric addition of HBr or H₂O yields a single constitutional product (2-bromobutane or Butan-2-ol).',
        'Decolorizes bromine water and cold KMnO₄.',
        'Exhibits classic cis–trans stereoisomerism across its central double bond.'
      ],
      note: 'Là hợp chất mẫu nhỏ nhất minh họa khái niệm đồng phân hình học (cis–trans) trong sách giáo khoa Hóa 11 GDPT 2018.',
      noteEn: 'Smallest textbook alkene demonstrating cis–trans geometric isomerism in Grade 11 Organic Chemistry.'
    },
    {
      id: 'isobutylene',
      catKey: 'alkene',
      elements: ['C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[1,3,1]],
      name: 'Isobutene (2-Methylpropene)',
      nameEn: 'Isobutene (2-Methylpropene)',
      category: 'Alkene',
      categoryEn: 'Alkene',
      state: 'Khí không màu',
      stateEn: 'Colorless gas',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Nguyên liệu sản xuất cao su butyl kín khí làm ruột (săm) xe máy, xe đạp, bóng đá, bóng rổ giữ hơi cực lâu; cũng dùng điều chế chất chống oxi hóa BHT bảo quản thực phẩm.',
      realLifeEn: 'Polymerized into airtight butyl rubber for inner tubes and basketball bladders, and used to make BHT food antioxidants.',
      reactions: [
        'Cộng H₂O (xúc tác H⁺) nhanh hơn nhiều so với Propene tạo alcohol bậc ba tert-Butanol.',
        'Trùng hợp cationic ở nhiệt độ thấp tạo Polyisobutylene dẻo dính.',
        'Phản ứng với Isobutane có xúc tác acid tạo xăng chuẩn Isooctane.'
      ],
      reactionsEn: [
        'Acid-catalyzed hydration rapidly yields tert-Butanol via stable tertiary carbocation intermediate.',
        'Cationic polymerization produces airtight Polyisobutylene rubber.',
        'Alkylates with Isobutane to manufacture 100-octane Isooctane gasoline.'
      ],
      note: 'Tên chuẩn IUPAC: 2-methylpropene; đồng phân mạch nhánh của các Butene (C₄H₈).',
      noteEn: 'IUPAC name: 2-methylpropene; branched C₄H₈ isomer without cis–trans stereoisomers.'
    },
    {
      id: 'butadiene',
      catKey: 'alkadiene',
      elements: ['C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,2]],
      name: 'Buta-1,3-diene',
      nameEn: 'Buta-1,3-diene',
      category: 'Alkadiene',
      categoryEn: 'Alkadiene',
      state: 'Khí không màu (mùi nhẹ giống xăng)',
      stateEn: 'Colorless gas',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Monomer trụ cột của ngành công nghiệp cao su tổng hợp: trùng hợp trực tiếp thành cao su Buna hoặc đồng trùng hợp với Styrene thành cao su Buna-S làm lốp ô tô siêu bền.',
      realLifeEn: 'Cornerstone synthetic rubber monomer: polymerized into Polybutadiene and copolymerized with Styrene (SBR) for durable car tires.',
      reactions: [
        'Cộng HBr hoặc Br₂ theo tỉ lệ 1 : 1 cho cả sản phẩm cộng 1,2 (ở −80°C) và sản phẩm cộng 1,4 (chiếm ưu thế ở 40°C).',
        'Trùng hợp (xúc tác Na hoặc hệ xúc tác phức) theo kiểu 1,4 tạo cao su Buna.',
        'Làm mất màu dung dịch Br₂ tối đa theo tỉ lệ mol 1 : 2 và làm mất màu KMnO₄ ngay ở nhiệt độ thường.'
      ],
      reactionsEn: [
        'Adds 1 equivalent of Br₂ or HBr by competing 1,2-addition (kinetic, cold) and 1,4-addition (thermodynamic, 40°C).',
        '1,4-Polymerizes (e.g., over Na) to yield Buna synthetic rubber.',
        'Consumes up to 2 equivalents of Br₂(aq) and rapidly reduces cold KMnO₄.'
      ],
      note: 'Là Alkadiene liên hợp tiêu biểu; nhớ kỹ điều kiện nhiệt độ cộng 1,2 (−80°C) và cộng 1,4 (40°C).',
      noteEn: 'Textbook conjugated alkadiene illustrating kinetic (1,2 at −80°C) vs. thermodynamic (1,4 at 40°C) control.'
    },
    {
      id: 'isoprene',
      catKey: 'alkadiene',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[1,4,1]],
      name: 'Isoprene',
      nameEn: 'Isoprene',
      category: 'Alkadiene',
      categoryEn: 'Alkadiene',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi 34°C)',
      stateEn: 'Colorless volatile liquid (bp 34°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Mắt xích thiên nhiên tạo ra nhựa mủ cây cao su, tinh dầu sả, vỏ cam chanh (limonene), sắc tố đỏ cà chua lycopene và beta-carotene màu cam trong củ cà rốt.',
      realLifeEn: 'Nature’s 5-carbon building block assembling natural rubber latex, citrus terpenes, menthol, and beta-carotene in carrots.',
      reactions: [
        'Trùng hợp theo kiểu 1,4 với xúc tác đặc hiệu (cis-1,4-polyisoprene) cho cao su tổng hợp giống hệt cao su thiên nhiên.',
        'Làm mất màu tối đa 2 mol Br₂ trong dung dịch và mất màu KMnO₄ ở điều kiện thường.',
        'Cộng với H₂ dư (Ni, t°) tạo sản phẩm no Isopentane.'
      ],
      reactionsEn: [
        'Stereospecific 1,4-polymerization yields cis-polyisoprene identical chemically to natural rubber latex.',
        'Decolorizes up to 2 molar equivalents of Br₂(aq) and cold KMnO₄.',
        'Catalytic hydrogenation with excess H₂ gives Isopentane.'
      ],
      note: 'Tên chuẩn IUPAC: 2-methylbuta-1,3-diene; khi lưu hóa cao su thiên nhiên bằng Sulfur (S) sẽ tạo cầu nối -S-S- giúp tăng độ đàn hồi.',
      noteEn: 'IUPAC name: 2-methylbuta-1,3-diene; natural rubber becomes tough and elastic when vulcanized with Sulfur.'
    },
    {
      id: 'acetylene',
      catKey: 'alkyne',
      elements: ['C','C'],
      bonds: [[0,1,3]],
      name: 'Acetylene',
      nameEn: 'Acetylene (Ethyne)',
      category: 'Alkyne',
      categoryEn: 'Alkyne',
      state: 'Khí không màu (khí đất đèn có mùi tỏi nhẹ do lẫn tạp)',
      stateEn: 'Colorless gas',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Được điều chế quen thuộc khi nhỏ nước vào đất đèn (CaC₂); khi cháy cùng Oxygen tạo ngọn lửa đèn xì đạt trên 3000°C làm nóng chảy sắt thép để hàn cắt kim loại.',
      realLifeEn: 'Generated traditionally by wetting Calcium carbide (CaC₂); burns with pure Oxygen at >3000°C in oxy-acetylene welding torches.',
      reactions: [
        'Tác dụng với dung dịch AgNO₃/NH₃ tạo KẾT TỦA VÀNG NHẠT Silver acetylide (Ag₂C₂↓) — phản ứng nhận biết alkyne đầu mạch.',
        'Làm mất màu nước Brom theo tỉ lệ 1 : 2 và cộng H₂ (xúc tác Lindlar Pd/PbCO₃) dừng ở Ethylene hoặc Ni tạo Ethane.',
        'Cộng H₂O (xt HgSO₄/H⁺, 80°C) chuyển thành Acetaldehyde; trùng hợp 3 phân tử ở 600°C/C tạo Benzene.'
      ],
      reactionsEn: [
        'Reacts with AgNO₃/NH₃ to deposit a PALE YELLOW precipitate of Silver acetylide (Ag–C≡C–Ag↓).',
        'Consumes 2 moles of Br₂(aq); Lindlar hydrogenation stops cleanly at Ethylene while Ni gives Ethane.',
        'Hg²⁺/H⁺ hydration yields Acetaldehyde; cyclic trimerization over hot charcoal produces Benzene.'
      ],
      note: 'Tên thay thế chuẩn GDPT 2018 là Ethyne; chú ý kết tủa vàng nhạt Ag₂C₂ khi khô có thể nổ nhẹ khi va chạm.',
      noteEn: 'Preferred IUPAC name: Ethyne; dry Silver acetylide is shock-sensitive and decomposed safely with HCl.'
    },
    {
      id: 'propyne',
      catKey: 'alkyne',
      elements: ['C','C','C'],
      bonds: [[0,1,3],[1,2,1]],
      name: 'Propyne',
      nameEn: 'Propyne',
      category: 'Alkyne',
      categoryEn: 'Alkyne',
      state: 'Khí không màu',
      stateEn: 'Colorless gas',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Hỗn hợp cùng Propadiene tạo thành khí MAPP đốt hàn cắt kim loại cầm tay thay cho Acetylene vì chứa được an toàn trong bình thép áp suất mà không dễ phát nổ.',
      realLifeEn: 'Component of MAPP welding fuel gas stored safely under pressure where pure Acetylene is too unstable.',
      reactions: [
        'Có phản ứng thế ion kim loại với AgNO₃/NH₃ tạo kết tủa vàng nhạt CH₃–C≡CAg↓.',
        'Làm mất màu tối đa 2 mol Br₂ tạo 1,1,2,2-tetrabromopropane.',
        'Cộng H₂O (xúc tác HgSO₄/H⁺, 80°C) tuân theo quy tắc Markovnikov tạo sản phẩm chính là Acetone (CH₃COCH₃).'
      ],
      reactionsEn: [
        'Forms a pale yellow Silver propynide precipitate with Tollens-type AgNO₃/NH₃ reagent.',
        'Consumes 2 equivalents of bromine water cleanly.',
        'Markovnikov hydration catalyzed by Hg²⁺/H⁺ yields Acetone (CH₃COCH₃) rather than Propanal.'
      ],
      note: 'Khác với Acetylene tạo aldehyde khi cộng nước, tất cả các Alkyne từ C₃ trở lên cộng nước đều tạo Ketone.',
      noteEn: 'Hydration of terminal alkynes from Propyne onward yields Ketones rather than aldehydes.'
    },
    {
      id: 'vinylacetylene',
      catKey: 'alkyne',
      elements: ['C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,3]],
      name: 'Vinylacetylene',
      nameEn: 'Vinylacetylene',
      category: 'Alkyne',
      categoryEn: 'Alkyne',
      state: 'Khí không màu (sôi ở 5°C)',
      stateEn: 'Colorless gas (bp 5°C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Hóa chất trung gian chế tạo cao su tổng hợp Neoprene (Polychloroprene) bền dầu mỡ và chống thấm nước, dùng may bộ đồ lặn biển và ống dẫn xăng dầu.',
      realLifeEn: 'Industrial dimer of Acetylene converted with HCl into Chloroprene to make oil- and weather-resistant Neoprene wetsuit rubber.',
      reactions: [
        'Tác dụng với dung dịch AgNO₃/NH₃ tạo kết tủa vàng nhạt CH₂=CH–C≡CAg↓.',
        'Làm mất màu tối đa 3 mol Br₂ trong dung dịch (1 mol ở nối đôi + 2 mol ở nối ba).',
        'Điều chế bằng phản ứng nhị hợp (đime hóa) Acetylene (CuCl/NH₄Cl, 80°C) và cộng HCl tạo Chloroprene.'
      ],
      reactionsEn: [
        'Yields a pale yellow terminal acetylide precipitate with AgNO₃/NH₃.',
        'Absorbs up to 3 moles of Br₂(aq) and 3 moles of H₂ (over Ni to form Butane).',
        'Synthesized by Cu(I)-catalyzed dimerization of Acetylene; HCl addition forms Chloroprene (monomer for Neoprene).'
      ],
      note: 'Công thức C₄H₄; vừa có tính chất Alkyne đầu mạch vừa mang cả nối đôi nên cộng tối đa 3 H₂ tạo Butane.',
      noteEn: 'Formula C₄H₄; consumes 3 equivalents of H₂ on full hydrogenation and tests positive with AgNO₃/NH₃.'
    },
    // =========================================================================
    // 6. ALCOHOLS & ETHERS (74 - 86)
    // =========================================================================
    {
      id: 'methanol',
      catKey: 'alcohol',
      elements: ['C','O'],
      bonds: [[0,1,1]],
      name: 'Methanol',
      nameEn: 'Methanol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi nhẹ giống rượu, rất độc)',
      stateEn: 'Colorless volatile liquid (toxic)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Cồn công nghiệp dùng làm dung môi sơn vecni, nhiên liệu sinh học sạch và nguyên liệu sản xuất Formaldehyde; CỰC ĐỘC khi uống nhầm (gây tổn thương thần kinh thị giác dẫn đến mù lòa và tử vong).',
      realLifeEn: 'Industrial wood alcohol used as a coating solvent, clean fuel, and feedstock for Formaldehyde; highly toxic if ingested (metabolizes to Formic acid, causing blindness).',
      reactions: [
        'Tác dụng với kim loại kiềm Na, K giải phóng khí H₂ tạo muối Sodium methoxide.',
        'Oxi hóa nhẹ bằng CuO đun nóng tạo Formaldehyde (HCHO); tác dụng với CO (xt Rh/I₂) tổng hợp Acetic acid.',
        'Cháy hoàn toàn với ngọn lửa xanh lam nhạt hầu như không thấy khói (2 CH₃OH + 3 O₂ → 2 CO₂ + 4 H₂O).'
      ],
      reactionsEn: [
        'Reacts vigorously with metallic Na to evolve H₂ gas and form Sodium methoxide.',
        'Gentle oxidation over hot CuO yields Formaldehyde; carbonylation with CO produces Acetic acid.',
        'Burns with a nearly invisible pale blue soot-free flame.'
      ],
      note: 'Rượu giả pha từ Methanol cực kỳ nguy hiểm vì mùi vị rất khó phân biệt bằng cảm quan với Ethanol.',
      noteEn: 'Toxic industrial alcohol: even 10 mL causes irreversible optic nerve damage when metabolized to Formaldehyde and Formic acid.'
    },
    {
      id: 'ethanol',
      catKey: 'alcohol',
      elements: ['C','C','O'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Ethanol (Cồn / Rượu etylic)',
      nameEn: 'Ethanol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi thơm cay đặc trưng)',
      stateEn: 'Colorless volatile liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Thành phần quen thuộc trong cồn sát khuẩn y tế 70°, nước hoa, đồ uống lên men truyền thống và pha trộn làm xăng sinh học E5/E10 giảm khí thải động cơ.',
      realLifeEn: 'Everyday ethyl alcohol in 70% medical antiseptics, perfumes, fermented beverages, and renewable E10 biofuels.',
      reactions: [
        'Tác dụng với Na giải phóng khí H₂; thực hiện phản ứng ester hóa với Acetic acid (xúc tác H₂SO₄ đặc, t°) tạo Ethyl acetate mùi thơm.',
        'Tách nước bởi H₂SO₄ đặc ở 170°C tạo khí Ethylene, ở 140°C tạo Diethyl ether.',
        'Oxi hóa bởi CuO đun nóng tạo Acetaldehyde; lên men giấm (men giấm, 25–30°C) chuyển thành Acetic acid.'
      ],
      reactionsEn: [
        'Reacts with Na evolving H₂; esterifies with Acetic acid (conc. H₂SO₄, heat) into fragrant Ethyl acetate.',
        'Dehydrates over conc. H₂SO₄ at 170°C to Ethylene or at 140°C to Diethyl ether.',
        'Oxidizes cleanly over hot CuO to Acetaldehyde or biologically by Acetobacter to vinegar (Acetic acid).'
      ],
      note: 'Đồng phân nhóm chức với Dimethyl ether (C₂H₆O) nhưng tan tốt trong nước và sôi cao hơn hẳn nhờ liên kết giữa các phân tử.',
      noteEn: 'Functional isomer of gaseous Dimethyl ether (C₂H₆O); strong hydrogen bonding gives Ethanol a high 78.4°C boiling point.'
    },
    {
      id: 'propan-1-ol',
      catKey: 'alcohol',
      elements: ['C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: 'Propan-1-ol',
      nameEn: 'Propan-1-ol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi khô nhanh chuyên dụng trong ngành mực in bao bì nhựa flexo, dung dịch sát khuẩn tay bệnh viện và công thức đánh bóng đồ gia dụng.',
      realLifeEn: 'Fast-evaporating solvent widely used in flexographic printing inks, hospital hand sanitizers, and surface polishes.',
      reactions: [
        'Oxi hóa nhẹ bằng CuO đun nóng tạo Aldehyde Propanal.',
        'Đun nóng với H₂SO₄ đặc (170°C) tách nước tạo khí Propene.',
        'Tác dụng với Na giải phóng khí H₂ và phản ứng với HBr nóng tạo 1-bromopropane.'
      ],
      reactionsEn: [
        'Gentle CuO oxidation converts primary Propan-1-ol into Propanal.',
        'Dehydration with hot concentrated H₂SO₄ (170°C) yields Propene gas.',
        'Evolves H₂ with Na metal and yields 1-bromopropane with hot aqueous HBr.'
      ],
      note: 'Cùng công thức C₃H₈O với Propan-2-ol và Methyl ethyl ether; nhưng tách nước cả hai Alcohol đều cho chung 1 alkene là Propene.',
      noteEn: 'Isomeric with Propan-2-ol (C₃H₈O); both alcohols dehydrate to the exact same alkene, Propene.'
    },
    {
      id: 'isopropanol',
      catKey: 'alcohol',
      elements: ['C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1]],
      name: 'Propan-2-ol (Isopropyl alcohol)',
      nameEn: 'Propan-2-ol (Isopropyl alcohol)',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi cồn hắc, bay hơi nhanh)',
      stateEn: 'Colorless fast-evaporating liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Cồn IPA 99,9% không thể thiếu để lau rửa bo mạch điện tử, chip máy tính, thấu kính máy ảnh vì bốc hơi siêu nhanh không để lại cặn ẩm hay rỉ sét; cũng là cồn y tế ngoài da.',
      realLifeEn: 'Ultra-clean 99.9% electronics cleaning alcohol for circuit boards and optics (evaporates spotless) and common rubbing antiseptic.',
      reactions: [
        'Oxi hóa nhẹ bởi CuO đun nóng tạo Ketone Acetone (không cho phản ứng tráng bạc).',
        'Đun nóng với H₂SO₄ đặc ở 170°C tách nước tạo Propene.',
        'Phản ứng nhanh với dung dịch I₂ trong NaOH tạo kết tủa vàng Iodoform (CHI₃↓) có mùi thuốc sát trùng.'
      ],
      reactionsEn: [
        'Mild CuO oxidation forms Acetone (ketone) rather than an aldehyde.',
        'Acid-catalyzed dehydration (170°C) produces Propene.',
        'Gives a positive yellow Iodoform test (CHI₃↓) with I₂/NaOH.'
      ],
      note: 'Là Alcohol bậc hai đơn giản nhất; sản xuất dễ dàng từ phản ứng cộng nước vào Propene.',
      noteEn: 'Simplest secondary alcohol, produced cleanly via Markovnikov hydration of Propene.'
    },
    {
      id: 'butan-1-ol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1]],
      name: 'Butan-1-ol',
      nameEn: 'Butan-1-ol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi chuối chín hơi hắc)',
      stateEn: 'Colorless liquid (characteristic fusel odor)',
      solubility: 'Tan vừa phải trong nước (~7,3 g/100 mL)',
      solubilityEn: 'Moderately soluble in water (~7.3 g/100 mL)',
      realLife: 'Tạo thành ở lượng nhỏ trong quá trình lên men rượu bia tự nhiên; trong công nghiệp dùng làm dung môi sơn bóng gỗ và nguyên liệu tổng hợp Ester tạo hương trái cây.',
      realLifeEn: 'Natural fermentation fusel alcohol used industrially as a lacquer solvent and precursor to fruity Butyl acetate.',
      reactions: [
        'Tác dụng với Acetic acid (H₂SO₄ đặc, t°) tạo ester Butyl acetate có mùi quả lê và táo.',
        'Oxi hóa nhẹ bởi CuO đun nóng tạo Butanal; oxi hóa mạnh bởi KMnO₄ tạo Butyric acid.',
        'Tách nước bởi H₂SO₄ đặc (170°C) tạo sản phẩm chính But-1-ene (hoặc kèm chuyển vị ra But-2-ene).'
      ],
      reactionsEn: [
        'Esterifies with Acetic acid to yield pear/apple-scented Butyl acetate.',
        'Oxidizes gently with CuO to Butanal, or fully to Butyric acid.',
        'Dehydrates over hot acid catalyst to yield Butenes.'
      ],
      note: 'Là đồng phân Alcohol bậc một mạch thẳng của C₄H₁₀O; độ tan trong nước giảm mạnh so với Methanol và Ethanol.',
      noteEn: 'Linear primary C₄H₁₀O alcohol; its 4-carbon hydrophobic tail makes it only partially miscible with water.'
    },
    {
      id: 'butan-2-ol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[1,4,1]],
      name: 'Butan-2-ol',
      nameEn: 'Butan-2-ol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi ngọt nhẹ)',
      stateEn: 'Colorless liquid',
      solubility: 'Tan ít trong nước (~12,5 g/100 mL)',
      solubilityEn: 'Moderately soluble in water (~12.5 g/100 mL)',
      realLife: 'Nguồn nguyên liệu công nghiệp chính để chuyển hóa thành dung môi Butanone (MEK) dùng trong keo dán giày, sơn ô tô và băng từ.',
      realLifeEn: 'Industrial alcohol produced from refinery butenes primarily to manufacture Butanone (MEK) paint and adhesive solvent.',
      reactions: [
        'Tách nước ở 170°C (xúc tác H₂SO₄ đặc) tuân theo quy tắc Zaitsev tạo SẢN PHẨM CHÍNH là But-2-ene (nhiều hơn But-1-ene).',
        'Oxi hóa bởi CuO đun nóng tạo Ketone Butanone (MEK).',
        'Tác dụng với kim loại Na giải phóng khí H₂ và phản ứng HBr tạo 2-bromobutane.'
      ],
      reactionsEn: [
        'Dehydrates at 170°C strictly following Zaitsev’s rule to yield But-2-ene as the major product.',
        'Mild CuO oxidation produces the ketone Butanone (MEK).',
        'Evolves H₂ with metallic Na and reacts with I₂/NaOH to give a yellow Iodoform precipitate.'
      ],
      note: 'Ví dụ mẫu mực minh họa quy tắc tách Zaitsev (nhóm -OH tách cùng nguyên tử H ở Carbon bậc cao hơn bên cạnh).',
      noteEn: 'Classic textbook molecule illustrating Zaitsev’s rule: elimination favors the more substituted internal alkene But-2-ene.'
    },
    {
      id: 'isobutanol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1],[0,4,1]],
      name: 'Isobutanol (2-Methylpropan-1-ol)',
      nameEn: 'Isobutanol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid',
      solubility: 'Tan vừa phải trong nước (~8,5 g/100 mL)',
      solubilityEn: 'Moderately soluble in water (~8.5 g/100 mL)',
      realLife: 'Nhiên liệu sinh học thế hệ mới có mật độ năng lượng cao gần bằng xăng mà ít hút ẩm gây gỉ bình chứa; cũng dùng tạo hương liệu tổng hợp và mực in.',
      realLifeEn: 'Next-generation biofuel with higher energy density and lower water-absorption corrosion than Ethanol, plus coating solvent.',
      reactions: [
        'Oxi hóa bởi CuO đun nóng tạo Isobutanal (2-methylpropanal).',
        'Tách nước bởi H₂SO₄ đặc ở 170°C tạo Isobutene (2-methylpropene).',
        'Tác dụng với kim loại Na giải phóng khí H₂ và ester hóa với acid hữu cơ.'
      ],
      reactionsEn: [
        'Mild CuO oxidation produces 2-methylpropanal.',
        'Acid dehydration cleanly affords 2-methylpropene gas.',
        'Reacts with Na metal releasing H₂ and forms fruity esters with Carboxylic acids.'
      ],
      note: 'Là đồng phân Alcohol bậc một mạch nhánh của C₄H₁₀O.',
      noteEn: 'Branched primary alcohol isomer of C₄H₁₀O.'
    },
    {
      id: 'tert-butanol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,1],[0,2,1],[0,3,1],[0,4,1]],
      name: 'tert-Butanol (2-Methylpropan-2-ol)',
      nameEn: 'tert-Butanol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Rắn tinh thể trắng / Lỏng (nóng chảy ở 25,5°C)',
      stateEn: 'Low-melting solid / liquid (mp 25.5°C)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Alcohol bậc ba duy nhất ở dạng tinh thể rắn giống long não khi trời hơi mát (25°C) nhờ dáng hình cầu gọn; dùng làm phụ gia tăng chỉ số octane xăng và dung môi đông khô.',
      realLifeEn: 'Unique tertiary alcohol that solidifies right near room temperature (25.5°C); used in octane boosters, paint removers, and freeze-drying.',
      reactions: [
        'KHÔNG bị oxi hóa bởi CuO đun nóng hoặc KMnO₄ nhẹ do nguyên tử C gắn -OH không còn nguyên tử H nào.',
        'Phản ứng cực nhanh ngay ở nhiệt độ thường với dung dịch HCl đặc tạo tert-Butyl chloride (lớp dầu nổi lên trên — phép thử Lucas tức thì).',
        'Tách nước rất dễ trong acid loãng tạo Isobutene.'
      ],
      reactionsEn: [
        'Resists mild oxidation by CuO or Cr(VI) (tertiary alcohol with zero α-hydrogens).',
        'Reacts INSTANTANEOUSLY with concentrated HCl at room temperature (Lucas test cloudy layer within seconds).',
        'Dehydrates rapidly even in mild acid to Isobutene.'
      ],
      note: 'Phép thử bậc Alcohol: bậc ba phản ứng HCl/ZnCl₂ tức thì nhưng trơ hoàn toàn khi đun với CuO.',
      noteEn: 'Benchmark tertiary alcohol (C₄H₁₀O): instantaneous Lucas test turbidity yet zero mild CuO oxidation.'
    },
    {
      id: 'allyl-alcohol',
      catKey: 'alcohol',
      elements: ['C','C','C','O'],
      bonds: [[0,1,2],[1,2,1],[2,3,1]],
      name: 'Allyl alcohol (Prop-2-en-1-ol)',
      nameEn: 'Allyl alcohol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi cay nồng kích thích mắt)',
      stateEn: 'Colorless pungent liquid (lacrimator)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Tiền chất công nghiệp quan trọng để tổng hợp Glycerol nhân tạo từ dầu mỏ và chế tạo các nhựa quang học chống trầy xước cho tròng kính mắt.',
      realLifeEn: 'Industrial petrochemical route to synthetic Glycerol and monomer precursor for scratch-resistant CR-39 optical eyeglass lenses.',
      reactions: [
        'Vừa làm mất màu nước Brom VÀ KMnO₄ ở nhiệt độ thường (tính chất Alkene), vừa tác dụng với Na giải phóng H₂ (tính chất Alcohol).',
        'Oxi hóa nhẹ bởi MnO₂ hoặc CuO đun nóng tạo Aldehyde không no Acrolein (CH₂=CH-CHO).',
        'Phản ứng thế -OH thành -Cl hoặc -Br xảy ra rất nhanh nhờ được hệ liên kết đôi bên cạnh ổn định.'
      ],
      reactionsEn: [
        'Exhibits dual reactivity: decolorizes bromine water and cold KMnO₄ while liberating H₂ gas with Na.',
        'Gentle oxidation converts it into pungent Acrolein aldehyde.',
        'Undergoes unusually rapid allylic halide substitution with HBr.'
      ],
      note: 'Khác với Vinyl alcohol không bền tự chuyển vị thành Acetaldehyde, Allyl alcohol là alcohol không no hoàn toàn bền vững.',
      noteEn: 'Simplest stable unsaturated alcohol (unlike unstable Vinyl alcohol which tautomerizes to Acetaldehyde).'
    },
    {
      id: 'ethylene-glycol',
      catKey: 'alcohol',
      elements: ['C','C','O','O'],
      bonds: [[0,1,1],[0,2,1],[1,3,1]],
      name: 'Ethylene glycol',
      nameEn: 'Ethylene glycol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng sánh không màu (vị hơi ngọt, độc)',
      stateEn: 'Colorless syrupy liquid (sweet-tasting, toxic)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung dịch làm mát chống đóng băng màu xanh/hồng đổ trong két nước ô tô và xe máy (vì pha với nước hạ điểm đóng băng xuống −37°C); đồng thời là một nửa nguyên liệu dệt sợi polyester và thổi chai nhựa PET.',
      realLifeEn: 'Automotive radiator antifreeze (lowering water’s freezing point below −37°C) and essential co-monomer for PET plastic bottles and polyester fabric.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch PHỨC XANH LAM ĐẬM (đặc trưng của polyalcohol có hai -OH kế nhau).',
        'Tác dụng với kim loại Na theo tỉ lệ tối đa 1 : 2 thu được đủ 1 mol khí H₂.',
        'Trùng ngưng với Terephthalic acid (t°) tạo nhựa Polyethylene terephthalate (PET).'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to form a bright DEEP BLUE chelate solution (vicinal diol test).',
        'Reacts with metallic Na liberating 1 mol H₂ per mole of diol.',
        'Polycondenses with Terephthalic acid to manufacture PET plastics and fibers.'
      ],
      note: 'Là diol đơn giản và bền vững nhất (C₂H₆O₂); cực kỳ độc nếu uống phải nên dung dịch chống đông luôn pha màu cảnh báo và vị đắng.',
      noteEn: 'Simplest vicinal diol (C₂H₆O₂); toxic upon ingestion, so commercial antifreezes include bittering agents.'
    },
    {
      id: 'glycerol',
      catKey: 'alcohol',
      elements: ['C','C','C','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[0,3,1],[1,4,1],[2,5,1]],
      name: 'Glycerol',
      nameEn: 'Glycerol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng sánh không màu (vị ngọt, hút ẩm tốt)',
      stateEn: 'Colorless viscous syrupy liquid (sweet taste)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Chất giữ ẩm thiên nhiên tuyệt vời trong kem dưỡng da, son môi, kem đánh răng và thuốc ho siro; được thu hồi tự nhiên làm phụ phẩm khi nấu xà phòng từ dầu thực vật và mỡ động vật.',
      realLifeEn: 'Gentle natural skin humectant in moisturizers, toothpaste, and cough syrups, co-produced abundantly during soap saponification.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch màu XANH LAM ĐẬM đặc trưng (phản ứng phân biệt với Ethanol và Propan-1,3-diol).',
        'Tác dụng với Na dư giải phóng 1,5 mol H₂; phản ứng với 3 acid béo tạo chất béo (triglyceride).',
        'Tác dụng với HNO₃ đặc / H₂SO₄ đặc tạo Nitroglycerin dùng làm thuốc giãn mạch tim mạch (cơn đau thắt ngực) và thuốc nổ.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to give an intense ROYAL BLUE solution (distinguishing Ethanol or 1,3-diols).',
        'Evolves 1.5 moles H₂ with Na; forms triglycerides with fatty acids.',
        'Nitration yields Nitroglycerin, used both in angina heart medication and dynamite.'
      ],
      note: 'Tên hệ thống IUPAC: Propane-1,2,3-triol; thí nghiệm Glycerol hòa tan Cu(OH)₂ luôn được hỏi trong phân biệt Alcohol.',
      noteEn: 'IUPAC name: Propane-1,2,3-triol; textbook Cu(OH)₂ test distinguishes Ethanol from Glycerol at a glance.'
    },
    {
      id: 'dimethyl-ether',
      catKey: 'ether',
      elements: ['C','O','C'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Dimethyl ether',
      nameEn: 'Dimethyl ether (DME)',
      category: 'Ether',
      categoryEn: 'Ether',
      state: 'Khí không màu (mùi nhẹ giống Ether)',
      stateEn: 'Colorless gas (mild ethereal odor)',
      solubility: 'Tan khá tốt trong nước',
      solubilityEn: 'Soluble in water (approx. 7% w/w)',
      realLife: 'Khí nén đẩy thân thiện tầng ozone trong bình xịt tóc, sơn phun và là nhiên liệu đốt sạch gần như không phát thải muội khói thay thế cho dầu Diesel truyền thống.',
      realLifeEn: 'Ozone-safe aerosol propellant in hairsprays/paints and clean-burning, soot-free synthetic Diesel alternative.',
      reactions: [
        'Hoàn toàn KHÔNG tác dụng với kim loại Na (giúp phân biệt tức thì với đồng phân Ethanol).',
        'Không làm đổi màu quỳ tím và bền với dung dịch kiềm hoặc nước Brom.',
        'Cháy hoàn toàn tạo CO₂ và H₂O với ngọn lửa sạch không muội than.'
      ],
      reactionsEn: [
        'Completely unreactive toward metallic Na (distinguishing it cleanly from isomer Ethanol).',
        'Inert toward dilute acids, bases, and bromine water.',
        'Burns cleanly with minimal particulate soot emissions.'
      ],
      note: 'Cùng công thức C₂H₆O với Ethanol nhưng chỉ là chất khí (−24°C) thay vì chất lỏng (78°C) do không tự tạo được liên kết giữa các phân tử.',
      noteEn: 'Structural isomer of Ethanol (C₂H₆O): a gas boiling 102°C lower because it lacks intermolecular O–H···O hydrogen bonds.'
    },
    {
      id: 'diethyl-ether',
      catKey: 'ether',
      elements: ['C','C','O','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1]],
      name: 'Diethyl ether',
      nameEn: 'Diethyl ether',
      category: 'Ether',
      categoryEn: 'Ether',
      state: 'Lỏng không màu (cực dễ bay hơi, sôi 34,6°C)',
      stateEn: 'Colorless volatile liquid (bp 34.6°C)',
      solubility: 'Ít tan trong nước (~6 g/100 mL), nhẹ hơn nước',
      solubilityEn: 'Slightly soluble in water (floats as top layer)',
      realLife: 'Dung môi chiết tách chất béo, tinh dầu cực tốt trong phòng thí nghiệm (tạo lớp lỏng nhẹ nổi rõ bên trên lớp nước) và nổi tiếng là thuốc gây mê toàn thân đầu tiên trong lịch sử y học thế kỷ 19.',
      realLifeEn: 'Classic upper-layer organic extraction solvent in chemistry labs and historically the first widely successful surgical anesthetic.',
      reactions: [
        'Không tác dụng với kim loại Na, K hoặc kiềm — được làm khô bằng dây Na ép trực tiếp trong bình chứa.',
        'Được điều chế khi đun Ethanol với H₂SO₄ đặc ở nhiệt độ kiểm soát 140°C (tách nước liên phân tử).',
        'Bảo quản lâu ngoài không khí và ánh sáng có thể tạo Peroxide rất dễ gây nổ khi đun cất khô.'
      ],
      reactionsEn: [
        'Inert to Na and strong bases, enabling straightforward solvent drying over Sodium wire.',
        'Prepared industrially by bimolecular dehydration of Ethanol with conc. H₂SO₄ at 140°C.',
        'Forms shock-sensitive organic peroxides if stored exposed to air and light for long periods.'
      ],
      note: 'Đừng nhầm nhiệt độ điều chế từ Ethanol: 140°C ra Diethyl ether, 170°C ra Ethylene.',
      noteEn: 'Classic Ethanol dehydration rule: 140°C yields Diethyl ether whereas 170°C produces Ethylene.'
    },

    // =========================================================================
    // 7. ALDEHYDES & KETONES (87 - 95)
    // =========================================================================
    {
      id: 'formaldehyde',
      catKey: 'aldehyde',
      elements: ['C','O'],
      bonds: [[0,1,2]],
      name: 'Formaldehyde (Methanal)',
      nameEn: 'Formaldehyde (Methanal)',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Khí không màu (mùi hắc xốc rất mạnh)',
      stateEn: 'Colorless pungent gas',
      solubility: 'Tan rất tốt trong nước (tạo dung dịch Formalin 37–40%)',
      solubilityEn: 'Very soluble in water (formalin 37–40% aqueous solution)',
      realLife: 'Dung dịch bão hòa trong nước gọi là Formalin (dung dịch 37–40%) có khả năng làm đông cứng và diệt khuẩn mạnh nên dùng ngâm bảo quản mẫu tiêu bản sinh học, đồng thời là nguyên liệu ép keo dán ván gỗ MDF và nhựa tổng hợp.',
      realLifeEn: 'Its 37–40% aqueous solution (formalin) preserves biological specimens, while massive industrial volumes manufacture wood-composite adhesives and resins.',
      reactions: [
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ tạo ra tới 4 mol Ag cho mỗi mol HCHO (tỉ lệ 1 : 4 đặc biệt!).',
        'Khử Cu(OH)₂/NaOH khi đun nóng tạo kết tủa đỏ gạch Cu₂O và làm mất màu nước Brom.',
        'Phản ứng với H₂ (Ni, t°) tạo Methanol; trùng ngưng với Phenol trong kiềm/acid tạo nhựa Bakelite.'
      ],
      reactionsEn: [
        'Reduces Tollens reagent (AgNO₃/NH₃) to deposit FOUR moles of metallic Ag per mole of HCHO!',
        'Reduces hot Cu(OH)₂/NaOH to brick-red Cu₂O and decolorizes aqueous bromine.',
        'Hydrogenates over Ni to Methanol and condenses with Phenol into Bakelite thermoset resin.'
      ],
      note: 'Tên thay thế chuẩn GDPT 2018 là Methanal; là aldehyde duy nhất tráng bạc tạo tỉ lệ mol 1 : 4 (bẫy tính toán kinh điển).',
      noteEn: 'IUPAC name: Methanal; uniquely deposits 4 Ag per molecule (instead of 2) because both C–H bonds oxidize all the way to Carbonate.'
    },
    {
      id: 'acetaldehyde',
      catKey: 'aldehyde',
      elements: ['C','C','O'],
      bonds: [[0,1,1],[1,2,2]],
      name: 'Acetaldehyde (Ethanal)',
      nameEn: 'Acetaldehyde (Ethanal)',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Lỏng không màu (bay hơi cực nhanh, sôi 20,2°C)',
      stateEn: 'Colorless volatile liquid (bp 20.2°C)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Xuất hiện tự nhiên trong táo chín và cà phê rang; trong cơ thể người, gan chuyển hóa rượu bia Ethanol thành Acetaldehyde — chính chất này gây đỏ mặt, nhức đầu và buồn nôn khi say rượu.',
      realLifeEn: 'Natural aroma in ripe fruit and roasted coffee; produced temporarily by the human liver from Ethanol, causing alcohol flushing and hangovers.',
      reactions: [
        'Tráng bạc với AgNO₃/NH₃ (tỉ lệ 1 : 2 Ag) tạo kết tủa bạc kim loại và muối Ammonium acetate.',
        'Đun nóng với Cu(OH)₂ trong môi trường kiềm tạo kết tủa ĐỎ GẠCH Cu₂O; làm mất màu nước Brom.',
        'Phản ứng với I₂ trong NaOH tạo KẾT TỦA VÀNG Iodoform (CHI₃↓) — aldehyde no đơn chức duy nhất có phản ứng này!'
      ],
      reactionsEn: [
        'Gives a bright silver mirror with AgNO₃/NH₃ (2 moles Ag per mole of Ethanal).',
        'Reduces alkaline Cu(OH)₂ on heating to brick-red Cu₂O and decolorizes bromine water.',
        'Uniquely among saturated aldehydes gives a positive yellow Iodoform precipitate (CHI₃↓) with I₂/NaOH.'
      ],
      note: 'Tên chuẩn IUPAC: Ethanal; phản ứng oxi hóa xúc tác chuyển hóa thẳng sang Acetic acid dùng để sản xuất giấm công nghiệp.',
      noteEn: 'IUPAC name: Ethanal; industrial catalytic oxidation provides a major route to Acetic acid.'
    },
    {
      id: 'propanal',
      catKey: 'aldehyde',
      elements: ['C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2]],
      name: 'Propanal',
      nameEn: 'Propanal',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Lỏng không màu (mùi trái cây hắc)',
      stateEn: 'Colorless liquid (suffocating fruity odor)',
      solubility: 'Tan khá tốt trong nước (~20 g/100 mL)',
      solubilityEn: 'Soluble in water (~20 g/100 mL)',
      realLife: 'Hóa chất trung gian quan trọng dùng sản xuất chất chống đóng rắn nhựa, cao su và tổng hợp các hương liệu thực phẩm hoặc nước hoa.',
      realLifeEn: 'Industrial intermediate converted into Propionic acid mold inhibitors, Trimethylolethane coatings resins, and fine flavorings.',
      reactions: [
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ tạo lớp bạc sáng bóng và cho kết tủa đỏ gạch Cu₂O khi đun với Cu(OH)₂/NaOH.',
        'Làm mất màu dung dịch nước Brom chuyển thành Propionic acid.',
        'Không tạo kết tủa vàng Iodoform với I₂/NaOH (phân biệt rõ với Acetone và Acetaldehyde).'
      ],
      reactionsEn: [
        'Gives a positive silver mirror with Tollens reagent and brick-red Cu₂O with hot alkaline Cu(OH)₂.',
        'Decolorizes bromine water cleanly to yield Propionic acid.',
        'Negative to the Iodoform test (I₂/NaOH), cleanly differentiating it from Acetone.'
      ],
      note: 'Cùng công thức C₃H₆O với Acetone — cặp phân biệt kinh điển bằng thuốc thử Tollens hoặc Iodoform.',
      noteEn: 'Functional isomer of Acetone (C₃H₆O); Tollens test separates them cleanly (Propanal +, Acetone −).'
    },
    {
      id: 'butanal',
      catKey: 'aldehyde',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,2]],
      name: 'Butanal',
      nameEn: 'Butanal',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Lỏng không màu (mùi nồng đặc trưng)',
      stateEn: 'Colorless liquid (pungent odor)',
      solubility: 'Tan một phần trong nước (~7 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~7 g/100 mL)',
      realLife: 'Hóa chất trung gian sản lượng lớn trong ngành hóa nhựa để tổng hợp lớp màng nhựa dẻo kẹp giữa hai lớp kính chắn gió ô tô giúp kính vỡ không văng mảnh.',
      realLifeEn: 'Major industrial aldehyde condensed into Polyvinyl butyral (PVB), the shatterproof interlayer inside automotive laminated windshields.',
      reactions: [
        'Tham gia phản ứng tráng bạc (AgNO₃/NH₃) và phản ứng tạo kết tủa đỏ gạch Cu₂O khi đun với Cu(OH)₂/NaOH.',
        'Cộng H₂ (Ni, t°) khử trực tiếp thành Butan-1-ol.',
        'Oxi hóa êm dịu bởi O₂ không khí (xúc tác muối kim loại) thành Butyric acid.'
      ],
      reactionsEn: [
        'Positive to both Tollens silver-mirror test and Fehling Cu₂O reduction upon warming.',
        'Catalytic hydrogenation over Ni produces Butan-1-ol.',
        'Air oxidation over metal catalysts yields Butyric acid.'
      ],
      note: 'Có đồng phân aldehyde mạch nhánh 2-methylpropanal (Isobutanal) cùng công thức C₄H₈O.',
      noteEn: 'Straight-chain C₄H₈O aldehyde isomer of 2-methylpropanal and Butanone.'
    },
    {
      id: 'acrolein',
      catKey: 'aldehyde',
      elements: ['C','C','C','O'],
      bonds: [[0,1,2],[1,2,1],[2,3,2]],
      name: 'Acrolein (Prop-2-enal)',
      nameEn: 'Acrolein (Prop-2-enal)',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Lỏng không màu hoặc hơi vàng (mùi cực cay xè mắt)',
      stateEn: 'Colorless liquid (intense acrid lacrimator)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Là chất có mùi khét cay xộc thẳng lên mắt mũi sinh ra khi đun dầu ăn, mỡ động vật quá lửa bốc khói trên chảo; trong công nghiệp dùng sản xuất Acid acrylic và bổ sung Methionine cho thức ăn gia súc.',
      realLifeEn: 'Acrid smoke compound formed when cooking oils overheat past their smoke point, and key industrial route to Acrylic acid and Methionine.',
      reactions: [
        'Cộng H₂ tối đa với xúc tác Ni (t°) theo tỉ lệ 1 : 2 tạo thành Propan-1-ol (khử cả nối đôi C=C và chức aldehyde).',
        'Làm mất màu dung dịch Br₂ rất nhanh và phản ứng tráng bạc với AgNO₃/NH₃ tạo lớp bạc kim loại.',
        'Không tạo kết tủa khi cho tác dụng trực tiếp với Na (không có nhóm -OH).'
      ],
      reactionsEn: [
        'Full catalytic hydrogenation with excess H₂ (Ni) reduces both C=C and C=O to Propan-1-ol.',
        'Rapidly decolorizes bromine water and produces a positive silver mirror with AgNO₃/NH₃.',
        'Oxidizes smoothly to Acrylic acid upon selective silver-oxide oxidation.'
      ],
      note: 'Cấu trúc không no đặc trưng (CH₂=CH-CHO) khiến 1 mol Acrolein có thể hấp thụ tối đa 2 mol H₂ khi cộng hoàn toàn.',
      noteEn: 'Simplest unsaturated aldehyde (CH₂=CH-CHO); consumes 2 equivalents of H₂ upon full saturation.'
    },
    {
      id: 'glyoxal',
      catKey: 'aldehyde',
      elements: ['C','C','O','O'],
      bonds: [[0,1,1],[0,2,2],[1,3,2]],
      name: 'Glyoxal',
      nameEn: 'Glyoxal',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Rắn màu vàng (nóng chảy ở 15°C; dung dịch nước 40% không màu)',
      stateEn: 'Yellow liquid/solid (mp 15°C; sold as 40% aq.)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Hóa chất xử lý giúp vải cotton không nhăn và giấy bìa chịu ẩm tốt hơn (lớp phủ chống thấm dầu mỡ trên hộp đựng thức ăn); cũng được tổng hợp từ việc oxi hóa Ethylene glycol.',
      realLifeEn: 'Crosslinking agent in permanent-press wrinkle-free cotton textiles and grease-resistant food paper packaging.',
      reactions: [
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ theo tỉ lệ đặc biệt 1 : 4 mol Ag (sinh 4 mol Ag mỗi phân tử).',
        'Đun nóng với dung dịch kiềm mạnh (NaOH) tự oxi hóa – khử nội phân tử (Cannizzaro) tạo muối Sodium glycolate.',
        'Cộng hợp với 2 H₂ (Ni, t°) khử hoàn toàn tạo lại Ethylene glycol.'
      ],
      reactionsEn: [
        'Deposits 4 moles of silver per mole of Glyoxal in the Tollens silver-mirror reaction.',
        'Undergoes rapid intramolecular Cannizzaro reaction in aqueous NaOH to form Sodium glycolate.',
        'Hydrogenates completely over Ni back to Ethylene glycol.'
      ],
      note: 'Công thức (CHO)₂ — aldehyde hai chức đơn giản nhất; cũng có tỉ lệ tráng bạc 1 : 4 tương tự Methanal (HCHO).',
      noteEn: 'Simplest dialdehyde (OHC–CHO); like Methanal, reduces 4 equivalents of Ag⁺ per molecule.'
    },
    {
      id: 'acetone',
      catKey: 'ketone',
      elements: ['C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,2]],
      name: 'Acetone (Propanone)',
      nameEn: 'Acetone (Propanone)',
      category: 'Ketone',
      categoryEn: 'Ketone',
      state: 'Lỏng không màu (mùi thơm mát đặc trưng, dễ bay hơi)',
      stateEn: 'Colorless fast-evaporating liquid (sweet mint-like odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi tẩy sạch sơn móng tay và rửa sạch dụng cụ thủy tinh dính dầu mỡ trong mọi phòng thí nghiệm; cũng dùng làm chất hòa tan ổn định khi nén khí Acetylene vào bình thép hàn xì.',
      realLifeEn: 'Universal nail polish remover, laboratory glassware rinse, and stabilizer inside pressurized Acetylene welding cylinders.',
      reactions: [
        'KHÔNG tham gia phản ứng tráng bạc (AgNO₃/NH₃), KHÔNG cho kết tủa đỏ gạch với Cu(OH)₂/NaOH và KHÔNG làm mất màu nước Brom.',
        'Phản ứng với I₂ trong dung dịch NaOH tạo KẾT TỦA VÀNG Iodoform (CHI₃↓) đặc trưng của nhóm CH₃–CO–.',
        'Cộng H₂ (Ni, t°) chuyển thành Propan-2-ol; cộng HCN tạo Cyanohydrin để tổng hợp nhựa thủy tinh hữu cơ.'
      ],
      reactionsEn: [
        'Gives NO Tollens silver mirror, NO Fehling Cu₂O precipitate, and NO bromine water decolorization.',
        'Produces a bright YELLOW Iodoform precipitate (CHI₃↓) with I₂/NaOH (methyl ketone test).',
        'Reduces with H₂/Ni or NaBH₄ to Propan-2-ol; forms acetone cyanohydrin with HCN en route to Plexiglas.'
      ],
      note: 'Là Ketone đơn giản nhất; sản xuất đồng thời cùng Phenol qua quy trình Cumene trong công nghiệp.',
      noteEn: 'Simplest Ketone; co-produced globally alongside Phenol via the industrial Cumene process.'
    },
    {
      id: 'butanone',
      catKey: 'ketone',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[1,4,2]],
      name: 'Butanone (MEK)',
      nameEn: 'Butanone (MEK)',
      category: 'Ketone',
      categoryEn: 'Ketone',
      state: 'Lỏng không màu (mùi giống Acetone nhưng hắc hơn)',
      stateEn: 'Colorless liquid (sharp acetone-like odor)',
      solubility: 'Tan tốt trong nước (~27 g/100 mL)',
      solubilityEn: 'Soluble in water (~27 g/100 mL)',
      realLife: 'Dung môi tẩy rửa công nghiệp nổi tiếng dưới tên viết tắt MEK (Methyl ethyl ketone) dùng để hàn gắn nhựa mô hình lắp ráp, mực in bút lông bảng trắng và lớp phủ bảo vệ gỗ kim loại.',
      realLifeEn: 'Widely used industrial solvent (MEK) in plastic model cements, dry-erase markers, lacquers, and vinyl adhesives.',
      reactions: [
        'Không phản ứng tráng bạc với AgNO₃/NH₃ (giúp phân biệt ngay với đồng phân Butanal).',
        'Cho phản ứng tạo kết tủa vàng Iodoform (CHI₃↓) với I₂ trong kiềm NaOH.',
        'Khử bằng H₂ (Ni, t°) tạo Butan-2-ol (alcohol bậc hai).'
      ],
      reactionsEn: [
        'Fails Tollens silver-mirror test, separating it cleanly from isomeric Butanal.',
        'Positive Iodoform reaction (yellow CHI₃↓ precipitate) due to its CH₃–C(=O)– motif.',
        'Catalytic reduction yields secondary alcohol Butan-2-ol.'
      ],
      note: 'Cùng công thức C₄H₈O với Butanal và 2-methylpropanal.',
      noteEn: 'Commonly known as MEK (methyl ethyl ketone); structural isomer of Butanal (C₄H₈O).'
    },
    {
      id: 'pentan-3-one',
      catKey: 'ketone',
      elements: ['C','C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[2,5,2]],
      name: 'Pentan-3-one',
      nameEn: 'Pentan-3-one',
      category: 'Ketone',
      categoryEn: 'Ketone',
      state: 'Lỏng không màu',
      stateEn: 'Colorless liquid (acetone-like odor)',
      solubility: 'Tan ít trong nước (~5 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~5 g/100 mL)',
      realLife: 'Dung môi công nghiệp nhiệt độ sôi cao (102°C) cho sơn phủ ô tô và nhựa tổng hợp, đồng thời là nguyên liệu then chốt tổng hợp vitamin E nhân tạo.',
      realLifeEn: 'High-boiling (102°C) solvent for automotive coatings and key chemical precursor in the industrial synthesis of vitamin E.',
      reactions: [
        'Không có phản ứng tráng bạc với AgNO₃/NH₃ và KHÔNG tạo kết tủa vàng Iodoform với I₂/NaOH (vì không có nhánh CH₃–CO–).',
        'Khử hóa bằng H₂ (Ni, t°) hoặc NaBH₄ chuyển thành Pentan-3-ol.',
        'Tạo kết tủa vàng cam đặc trưng với thuốc thử 2,4-dinitrophenylhydrazine (nhận biết chung nhóm C=O).'
      ],
      reactionsEn: [
        'Negative to BOTH Tollens silver mirror and Iodoform (I₂/NaOH) tests — distinguishes it cleanly from Pentan-2-one!',
        'Reduces smoothly to Pentan-3-ol with NaBH₄ or H₂/Ni.',
        'Forms a bright orange-yellow hydrazone precipitate with Brady’s reagent (2,4-DNPH).'
      ],
      note: 'Phép thử Iodoform phân biệt cực nhanh hai đồng phân Ketone: Pentan-2-one cho kết tủa vàng còn Pentan-3-one thì không.',
      noteEn: 'Iodoform test distinguishes Pentan-3-one (−) cleanly from its isomer Pentan-2-one (+).'
    },
    // =========================================================================
    // 8. CARBOXYLIC ACIDS, HYDROXY ACIDS, ESTERS & ANHYDRIDES (96 - 116)
    // =========================================================================
    {
      id: 'formic-acid',
      catKey: 'carboxylic',
      elements: ['C','O','O'],
      bonds: [[0,1,2],[0,2,1]],
      name: 'Formic acid',
      nameEn: 'Formic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng không màu (mùi hắc xốc, gây rộp da)',
      stateEn: 'Colorless pungent fuming liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Có tự nhiên trong nọc đốt của kiến lửa, ong và lông gai cây tầm ma (gây cảm giác đau rát khi bị cắn); được dùng rộng rãi trong thuộc da, ủ thức ăn gia súc và làm đông mủ cao su tự nhiên.',
      realLifeEn: 'Stinging defensive compound in ant and bee venom (Latin formica, ant); widely used in leather tanning, livestock silage preservation, and rubber coagulation.',
      reactions: [
        'Thể hiện tính acid mạnh nhất trong dãy đồng đẳng (hóa đỏ quỳ tím, hòa tan Mg/Zn sinh H₂, sủi bọt CO₂ với Na₂CO₃/CaCO₃).',
        'Do đầu mạch mang H giống Aldehyde nên THAM GIA PHẢN ỨNG TRÁNG BẠC (AgNO₃/NH₃) và làm mất màu nước Brom giải phóng CO₂!',
        'Đun với H₂SO₄ đặc bị mất nước nhanh chóng giải phóng khí CO độc hại (dùng điều chế CO trong phòng thí nghiệm).'
      ],
      reactionsEn: [
        'Strongest simple aliphatic Carboxylic acid: turns litmus red, evolves H₂ with Zn/Mg, and bubbles CO₂ with carbonates.',
        'Uniquely among carboxylic acids reduces Tollens reagent to a silver mirror AND decolorizes bromine water to CO₂!',
        'Dehydrates rapidly with concentrated sulfuric acid to generate pure Carbon monoxide (CO) gas.'
      ],
      note: 'Tên chuẩn IUPAC: Methanoic acid; luôn nhớ Formic acid vừa có tính Acid vừa tham gia phản ứng tráng bạc.',
      noteEn: 'IUPAC name: Methanoic acid; dual Acid + reducing Aldehyde behavior is a favorite exam distinction from Acetic acid.'
    },
    {
      id: 'acetic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','O','O'],
      bonds: [[0,1,1],[1,2,2],[1,3,1]],
      name: 'Acetic acid (Giấm ăn)',
      nameEn: 'Acetic acid (Vinegar)',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng không màu (mùi chua gắt, kết tinh giống băng ở 16,6°C)',
      stateEn: 'Colorless pungent liquid (freezes at 16.6°C)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung dịch loãng 2–5% chính là giấm ăn dùng nấu nướng và tẩy sạch cặn vôi (CaCO₃) bám trong ấm đun nước; ở dạng tinh khiết 100% (giấm băng) làm nguyên liệu tổng hợp keo dán và sợi dệt.',
      realLifeEn: 'Dilute 2–5% solutions make kitchen vinegar (dissolving kettle limescale); pure "glacial" acid is manufactured on huge scale for vinyl plastics and textiles.',
      reactions: [
        'Làm quỳ tím chuyển màu đỏ, tác dụng với kim loại hoạt động (Mg, Zn, Fe), oxide base, NaOH và muối carbonate giải phóng khí CO₂.',
        'Đun nóng với Ethanol (xúc tác H₂SO₄ đặc) thực hiện phản ứng ester hóa thuận nghịch tạo Ethyl acetate mùi thơm trái cây.',
        'Không có phản ứng tráng bạc và không làm mất màu nước Brom hay dung dịch KMnO₄.'
      ],
      reactionsEn: [
        'Turns blue litmus red, dissolves active metals evolving H₂, neutralizes bases, and liberates CO₂ from CaCO₃/NaHCO₃.',
        'Reversibly esterifies with Ethanol over H₂SO₄ catalyst to fragrant Ethyl acetate.',
        'Completely negative to Tollens reagent and cold bromine water.'
      ],
      note: 'Cùng công thức C₂H₄O₂ với Methyl formate; nhận biết nhanh bằng quỳ tím hóa đỏ hoặc sủi bọt khí khi gặp đá vôi/NaHCO₃.',
      noteEn: 'IUPAC name: Ethanoic acid; shares formula C₂H₄O₂ with Methyl formate.'
    },
    {
      id: 'propionic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1]],
      name: 'Propionic acid',
      nameEn: 'Propionic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng không màu (mùi hắc giống mồ hôi và phô mai)',
      stateEn: 'Colorless oily liquid (pungent rancid-cheese odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Chất ức chế nấm mốc cực kỳ an toàn cho bánh mì công nghiệp, bánh bông lan đóng gói (dưới dạng muối Calcium propionate) và góp phần tạo vị đặc trưng cho phô mai Thụy Sĩ.',
      realLifeEn: 'Inhibits mold and bacterial spoilage in commercial sliced bread and baked goods (typically as Calcium propionate) and occurs in Swiss cheese.',
      reactions: [
        'Làm đỏ giấy quỳ tím, phản ứng nhanh với NaOH và giải phóng CO₂ từ dung dịch NaHCO₃.',
        'Ester hóa với Methanol hoặc Ethanol (H₂SO₄ đặc, t°) tạo ester có mùi thơm dịu của dứa và rượu rum.',
        'Tác dụng với Cl₂ khi có xúc tác P đỏ thế chọn lọc vào Carbon cạnh nhóm -COOH tạo 2-chloropropionic acid.'
      ],
      reactionsEn: [
        'Turns litmus red, neutralizes bases, and effervesces with carbonate solutions.',
        'Esterifies with simple alcohols to yield sweet fruit-aroma esters.',
        'Alpha-chlorination with Cl₂/red Phosphorus yields 2-chloropropionic acid selectively.'
      ],
      note: 'Tên chuẩn IUPAC: Propanoic acid (C₃H₆O₂), đồng phân với Methyl acetate và Ethyl formate.',
      noteEn: 'IUPAC name: Propanoic acid (C₃H₆O₂); acid isomer of Methyl acetate and Ethyl formate.'
    },
    {
      id: 'butyric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,2],[3,5,1]],
      name: 'Butyric acid',
      nameEn: 'Butyric acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng sánh không màu (mùi bơ ôi và nôn mửa rất khó chịu)',
      stateEn: 'Colorless viscous liquid (pungent rancid-butter odor)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Thủ phạm tạo mùi bơ khét ôi và mùi phô mai nồng; nhưng điều thú vị là khi cho tác dụng tạo thành Ester như Ethyl butyrate lại tỏa ra hương thơm quả dứa chín ngào ngạt dùng làm bánh kẹo.',
      realLifeEn: 'Responsible for the harsh smell of rancid butter, yet remarkably transforms when esterified with Ethanol into sweet pineapple-flavored Ethyl butyrate.',
      reactions: [
        'Thể hiện đầy đủ tính chất của một Carboxylic acid yếu (đổi màu quỳ tím sang đỏ, phản ứng NaOH, NaHCO₃, Mg).',
        'Đun với Ethanol và H₂SO₄ đặc tạo ester Ethyl butyrate có mùi thơm ngọt của dứa chín.',
        'Muối được vi khuẩn có lợi trong ruột già sản sinh tự nhiên khi lên men chất xơ nuôi dưỡng niêm mạc đường ruột.'
      ],
      reactionsEn: [
        'Shows standard Carboxylic acid reactivity with litmus, metals, bases, and bicarbonates.',
        'Condenses with Ethanol (H₂SO₄, heat) into pleasant pineapple-scented Ethyl butyrate.',
        'Biological gut microbiota ferment dietary fiber into Butyrate to nourish colon cells.'
      ],
      note: 'Tên chuẩn IUPAC: Butanoic acid (C₄H₈O₂); ví dụ kinh điển về sự "lột xác" mùi hương giữa Acid và Ester.',
      noteEn: 'IUPAC name: Butanoic acid (C₄H₈O₂); classic contrast between foul free acid odor and sweet fruity ester.'
    },
    {
      id: 'oxalic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','O','O','O','O'],
      bonds: [[0,1,1],[0,2,2],[0,3,1],[1,4,2],[1,5,1]],
      name: 'Oxalic acid',
      nameEn: 'Oxalic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng không mùi)',
      stateEn: 'Solid (white odorless crystals)',
      solubility: 'Tan tốt trong nước (~10 g/100 mL)',
      solubilityEn: 'Soluble in water',
      realLife: 'Có tự nhiên tạo vị chua chát nhẹ trong quả khế chua, rau dền, rau bina (cải bó xôi) và củ cải; trong đời sống dùng tẩy sạch vết gỉ sắt ố vàng trên quần áo và đánh bóng đá cẩm thạch.',
      realLifeEn: 'Natural dicarboxylic acid giving sourness to starfruit, spinach, and rhubarb; widely used in rust-stain removers and wood bleaches.',
      reactions: [
        'Tác dụng với NaOH theo tỉ lệ mol 1 : 2 tạo muối tan; kết hợp với ion Ca²⁺ tạo kết tủa trắng Calcium oxalate rất ít tan (nguyên nhân chính gây sỏi thận).',
        'Là chất khử đặc trưng: LÀM MẤT MÀU DUNG DỊCH KMnO₄ trong môi trường H₂SO₄ khi đun nóng nhẹ giải phóng khí CO₂.',
        'Lực acid mạnh gấp hơn 3000 lần Acetic acid ở nấc phân li thứ nhất.'
      ],
      reactionsEn: [
        'Neutralizes 2 moles NaOH; precipitates insoluble white Calcium oxalate crystals with Ca²⁺ (primary component of kidney stones).',
        'Quantitatively decolorizes warm acidified KMnO₄ solution while evolving CO₂ gas (standard analytical titration).',
        'Over 3,000 times stronger acid than Acetic acid at its first dissociation.'
      ],
      note: 'Tên chuẩn IUPAC: Ethanedioic acid; câu hỏi thực tế về sỏi thận và làm mất màu thuốc tím KMnO₄.',
      noteEn: 'IUPAC name: Ethanedioic acid (H₂C₂O₄); standard primary redox titration standard for KMnO₄.'
    },
    {
      id: 'malonic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[0,3,2],[0,4,1],[2,5,2],[2,6,1]],
      name: 'Malonic acid',
      nameEn: 'Malonic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Xuất hiện tự nhiên trong củ cải đường và muối của nó đóng vai trò cốt lõi trong quá trình cơ thể tổng hợp nên các acid béo dự trữ năng lượng.',
      realLifeEn: 'Natural dicarboxylic acid in sugar beets whose thioester derivative (Malonyl-CoA) builds fatty acids in living cells.',
      reactions: [
        'Phản ứng trung hòa với NaOH theo tỉ lệ mol 1 : 2 tạo muối Sodium malonate.',
        'Đun nóng quá 140°C dễ dàng TÁCH 1 PHÂN TỬ CO₂ (decarboxylation) chuyển thành Acetic acid!',
        'Nhóm giữa cực kỳ linh hoạt, dễ tham gia phản ứng ngưng tụ và tổng hợp các dược chất.'
      ],
      reactionsEn: [
        'Consumes 2 moles NaOH per mole to form disodium malonate.',
        'Undergoes clean thermal decarboxylation above 140°C, losing CO₂ to leave Acetic acid.',
        'Central methylene group readily undergoes enolate alkylation in organic synthesis.'
      ],
      note: 'Tên chuẩn IUPAC: Propanedioic acid; tính chất đun nóng tách CO₂ giúp phân biệt ngay với Oxalic và Succinic acid.',
      noteEn: 'IUPAC name: Propanedioic acid; signature 1,3-diacid decarboxylation above its melting point yields Acetic acid + CO₂.'
    },
    {
      id: 'succinic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[0,4,2],[0,5,1],[3,6,2],[3,7,1]],
      name: 'Succinic acid',
      nameEn: 'Succinic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng không mùi)',
      stateEn: 'Solid (white odorless crystals)',
      solubility: 'Tan vừa trong nước lạnh, tan tốt khi đun nóng',
      solubilityEn: 'Soluble in water (7 g/100 mL at 20°C)',
      realLife: 'Từng được chưng cất lần đầu từ hổ phách (amber); đóng vai trò mắt xích năng lượng không thể thiếu trong chu trình Krebs của mọi tế bào hô hấp hiếu khí và dùng tạo vị umami trong thực phẩm.',
      realLifeEn: 'Originally distilled from amber; an essential intermediate in the cellular Krebs energy cycle and mild souring agent in foods/beverages.',
      reactions: [
        'Tác dụng với kiềm NaOH theo tỉ lệ 1 : 2 và sủi bọt khí CO₂ với dung dịch NaHCO₃.',
        'Đun nóng mạnh ở 235°C mất 1 phân tử H₂O đóng vòng tạo Succinic anhydride (KHÔNG mất CO₂ như Malonic acid).',
        'Trùng ngưng với Butane-1,4-diol tạo nhựa sinh học tự phân hủy PBS thân thiện môi trường.'
      ],
      reactionsEn: [
        'Reacts with 2 equivalents of NaOH and liberates CO₂ with NaHCO₃.',
        'Heating dehydrates internally into cyclic Succinic anhydride rather than losing CO₂.',
        'Polycondenses with 1,4-butanediol into biodegradable PBS plastic (straws, food trays).'
      ],
      note: 'Tên chuẩn IUPAC: Butanedioic acid; muối của nó còn được dùng sản xuất chất dẻo sinh học tự hủy.',
      noteEn: 'IUPAC name: Butanedioic acid; key renewable C4 bio-platform chemical for biodegradable polymers.'
    },
    {
      id: 'adipic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','C','C','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[0,6,2],[0,7,1],[5,8,2],[5,9,1]],
      name: 'Adipic acid',
      nameEn: 'Adipic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (bột tinh thể trắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Ít tan trong nước lạnh (~1,5 g/100 mL)',
      solubilityEn: 'Slightly soluble cold (~1.5 g/100 mL)',
      realLife: 'Nguyên liệu sản xuất hàng tỉ mét sợi dệt may Nylon-6,6 bền chắc dùng làm dây dù, lưới đánh cá, dây đai an toàn ô tô và phụ gia tạo vị chua cho thạch rau câu.',
      realLifeEn: 'Industrial giant polymerized with Hexamethylenediamine into tough Nylon-6,6 fibers for tire cords, parachutes, airbags, and carpets.',
      reactions: [
        'Trùng ngưng với Hexamethylenediamine (NH₂-(CH₂)₆-NH₂) khi đun nóng loại nước tạo Tơ Nylon-6,6.',
        'Tác dụng với NaOH theo tỉ lệ 1 : 2 tạo muối Disodium adipate tan hoàn toàn trong nước.',
        'Cơ thể dùng tổng hợp trực tiếp bằng phản ứng oxi hóa Cyclohexanone/Cyclohexanol bởi HNO₃.'
      ],
      reactionsEn: [
        'Polycondenses with Hexamethylenediamine to spin high-strength Nylon-6,6 polyamide fiber.',
        'Dissolves in 2 equivalents of NaOH and reacts with diamines to yield Nylon salt.',
        'Manufactured globally by oxidizing Cyclohexanol/Cyclohexanone with Nitric acid.'
      ],
      note: 'Tên chuẩn IUPAC: Hexanedioic acid; luôn ghi nhớ cặp đồng trùng ngưng Nylon-6,6 = Adipic acid (6 C) + Hexamethylenediamine (6 C).',
      noteEn: 'IUPAC name: Hexanedioic acid (C₆H₁₀O₄); pairs 6-carbon acid with 6-carbon diamine to earn the name Nylon-6,6.'
    },
    {
      id: 'fumaric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O','O','O'],
      bonds: [[0,1,1],[1,2,2],[2,3,1],[0,4,2],[0,5,1],[3,6,2],[3,7,1]],
      name: 'Fumaric / Maleic acid',
      nameEn: 'Fumaric / Maleic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng, vị chua gắt)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Fumaric ít tan; Maleic tan rất tốt trong nước',
      solubilityEn: 'Fumaric sparingly soluble; Maleic very soluble',
      realLife: 'Chất tạo độ chua thanh kéo dài và không hút ẩm cho bột pha nước giải khát, bánh kẹo khô; cũng là thành phần sinh hóa tự nhiên tạo năng lượng cho cơ thể khi vận động và phơi nắng.',
      realLifeEn: 'Non-hygroscopic food acidulant in dry beverage mixes and candies, and key natural cellular respiration intermediate.',
      reactions: [
        'Vừa làm đỏ quỳ tím, tác dụng với 2 NaOH, vừa làm mất màu nước Brom và dung dịch KMnO₄ ở nhiệt độ thường.',
        'Cộng H₂ (xúc tác Ni, t°) chuyển hóa hoàn toàn thành Succinic acid no.',
        'Đồng phân cis (Maleic acid) dễ mất nước đóng vòng tạo Maleic anhydride hơn đồng phân trans (Fumaric acid).'
      ],
      reactionsEn: [
        'Shows combined Acid behavior (2 equivalents NaOH, litmus red) and Alkene behavior (decolorizes Br₂ and cold KMnO₄).',
        'Hydrogenates over Ni catalyst cleanly into Succinic acid.',
        'Cis-isomer (Maleic acid) dehydrates easily upon heating into cyclic Maleic anhydride; trans-Fumaric acid cannot close directly.'
      ],
      note: 'Hai đồng phân hình học cis–trans nổi tiếng (HOOC-CH=CH-COOH): tính chất vật lý (độ tan, điểm nóng chảy) khác nhau một trời một vực.',
      noteEn: 'Classic cis/trans contrast: trans-Fumaric acid (mp 287°C, low solubility) vs. cis-Maleic acid (mp 135°C, high solubility).'
    },
    {
      id: 'lactic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1],[1,5,1]],
      name: 'Lactic acid',
      nameEn: 'Lactic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng sánh không màu hoặc chất rắn hút ẩm',
      stateEn: 'Colorless syrupy liquid / low-melting solid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Tạo nên vị chua dịu đặc trưng của sữa chua, dưa cải muối chua và kim chi lên men; đồng thời tích tụ trong cơ bắp khi chạy nước rút hoặc tập gym nặng gây cảm giác mỏi cơ.',
      realLifeEn: 'Gives tangy sourness to yogurt, sourdough, and kimchi, accumulates temporarily in fatigued muscles during intense sprinting, and makes bioplastic PLA.',
      reactions: [
        'Tác dụng với Na giải phóng ĐỦ 1 mol H₂ (vì cả chức -OH alcohol lẫn -COOH đều phản ứng với Na), nhưng chỉ tác dụng với 1 mol NaOH!',
        'Đun nóng tự trùng ngưng liên tiếp tạo Polymer sinh học phân hủy tự nhiên PLA (Polylactic acid) dùng làm ly nhựa sinh học, chỉ tự tiêu.',
        'Điều chế sinh học bằng cách lên men đường Glucose hoặc tinh bột với vi khuẩn Lactobacillus.'
      ],
      reactionsEn: [
        'Reacts with metallic Na liberating 1 mole H₂ per mole (both -OH and -COOH react), yet consumes only 1 mole of aqueous NaOH!',
        'Self-polycondenses when heated under vacuum into biodegradable PLA bioplastic (compostable cups & surgical sutures).',
        'Produced naturally by lactic-acid bacteria fermenting Glucose or lactose.'
      ],
      note: 'Chứa đồng thời nhóm -OH alcohol và -COOH nên tỉ lệ Na : acid = 2 : 1 nhưng tỉ lệ NaOH : acid = 1 : 1 (câu đếm hay thi THPT).',
      noteEn: '2-Hydroxypropanoic acid; classic bifunctional pitfall: reacts 2:1 with Na metal but 1:1 with NaOH.'
    },
    {
      id: 'citric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','C','C','O','O','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[0,3,1],[1,4,1],[2,5,1],[1,6,1],[3,7,2],[3,8,1],[4,9,2],[4,10,1],[5,11,2],[5,12,1]],
      name: 'Citric acid',
      nameEn: 'Citric acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng vị chua thanh)',
      stateEn: 'Solid (white sour crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Chiếm tới 5–8% khối lượng khô của quả chanh, cam, quýt (tạo vị chua tự nhiên tươi mát); dùng rộng rãi làm chất điều vị nước giải khát, viên sủi C (kèm NaHCO₃) và tẩy cặn ấm siêu tốc an toàn.',
      realLifeEn: 'Gives lemons and limes their brisk natural sourness; ubiquitous food acidulant, effervescent tablet fizzing partner with NaHCO₃, and natural descaler.',
      reactions: [
        'Tác dụng với dung dịch kiềm NaOH theo tỉ lệ mol tối đa 1 : 3 và phản ứng với Na dư giải phóng tới 2 mol khí H₂!',
        'Trộn bột khô cùng muối NaHCO₃ rồi thả vào nước lập tức sủi bọt khí CO₂ rất mạnh (nguyên lý viên C sủi và bom tắm).',
        'Tạo phức vòng càng bền với ion kim loại Ca²⁺, Fe³⁺ giúp làm mềm nước cứng và chống oxy hóa thực phẩm.'
      ],
      reactionsEn: [
        'Neutralizes 3 moles of NaOH per mole (triacid), while Na metal releases 2 moles of H₂ (3 acids + 1 tertiary alcohol)!',
        'Dissolving alongside dry NaHCO₃ triggers instant vigorous CO₂ effervescence (effervescent vitamin tablets).',
        'Chelates Ca²⁺ and Fe³⁺ ions cleanly, acting as a natural water softener and preservative.'
      ],
      note: 'Công thức C₆H₈O₇; chất trung tâm của chu trình Acid citric sinh năng lượng trong mọi tế bào hiếu khí.',
      noteEn: 'Formula C₆H₈O₇; central namesake molecule of the biochemical Citric Acid (Krebs) cycle.'
    },
    {
      id: 'acrylic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','O','O'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[2,4,1]],
      name: 'Acrylic acid',
      nameEn: 'Acrylic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng không màu (mùi chua gắt rất nồng)',
      stateEn: 'Colorless acrid liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Nguyên liệu sản xuất polymer siêu thấm hút (hút nước gấp hàng trăm lần trọng lượng) dùng làm lõi tã giấy trẻ em, sơn nước ngoại thất và chất kết dính công nghiệp.',
      realLifeEn: 'Monomer polymerized into superabsorbent Polyacrylic acid hydrogels inside baby diapers and durable water-based exterior acrylic paints.',
      reactions: [
        'Làm quỳ tím hóa đỏ, giải phóng H₂ khi gặp Zn/Mg và tạo khí CO₂ khi gặp NaHCO₃/CaCO₃.',
        'Làm MẤT MÀU nước Brom và KMnO₄ ngay ở nhiệt độ thường (phân biệt ngay với Acetic acid và Propionic acid).',
        'Cộng H₂ (Ni, t°) chuyển thành Propionic acid; trùng hợp tạo nhựa Poly(acrylic acid).'
      ],
      reactionsEn: [
        'Shows full Carboxylic acid behavior (turns litmus red, neutralizes bases, bubbles CO₂ with carbonates).',
        'Immediately decolorizes bromine water and cold KMnO₄ at room temperature (distinguishing it from saturated acids).',
        'Hydrogenates over Ni to Propionic acid and undergoes vinyl polymerization.'
      ],
      note: 'Tên chuẩn IUPAC: Prop-2-enoic acid; là acid không no đơn giản nhất thường gặp trong các bài phân biệt dung dịch.',
      noteEn: 'IUPAC name: Prop-2-enoic acid; simplest unsaturated carboxylic acid — rapidly decolorizes bromine water unlike Acetic acid.'
    },
    {
      id: 'methacrylic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O'],
      bonds: [[0,1,2],[1,2,1],[1,3,1],[2,4,2],[2,5,1]],
      name: 'Methacrylic acid',
      nameEn: 'Methacrylic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng không màu (kết tinh ở 16°C)',
      stateEn: 'Colorless liquid / crystals (mp 15°C)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water (~9 g/100 mL)',
      realLife: 'Nguyên liệu gốc để chuyển hóa thành Methyl methacrylate chế tạo tấm kính nhựa trong suốt siêu bền chống vỡ (PMMA / Plexiglas) dùng cho bể cá khổng lồ và kính chắn phi công.',
      realLifeEn: 'Direct precursor to Methyl methacrylate used for crystal-clear shatterproof Plexiglas (PMMA) aquariums and aircraft canopies.',
      reactions: [
        'Ester hóa với Methanol (xúc tác H₂SO₄ đặc, t°) tạo Methyl methacrylate.',
        'Làm mất màu dung dịch nước Brom và KMnO₄ ở nhiệt độ thường; phản ứng với NaOH tạo muối Methacrylate.',
        'Cộng HBr vào nối đôi tạo sản phẩm chính gắn Br ở đầu mạch (do hiệu ứng hút electron của nhóm -COOH).'
      ],
      reactionsEn: [
        'Esterifies with Methanol to produce Methyl methacrylate monomer.',
        'Decolorizes bromine water and cold KMnO₄ while neutralizing bases like NaOH and Na₂CO₃.',
        'Undergoes vinyl polymerization and salt-forming acid–base reactions smoothly.'
      ],
      note: 'Tên chuẩn IUPAC: 2-methylprop-2-enoic acid; đồng phân với các Butenoic acid.',
      noteEn: 'IUPAC name: 2-methylprop-2-enoic acid; building block for Plexiglas acrylic polymers.'
    },
    {
      id: 'methyl-formate',
      catKey: 'ester',
      elements: ['C','O','O','C'],
      bonds: [[0,1,2],[0,2,1],[2,3,1]],
      name: 'Methyl formate',
      nameEn: 'Methyl formate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (bay hơi rất nhanh, sôi ở 31,5°C)',
      stateEn: 'Colorless ultra-volatile liquid (bp 31.5°C)',
      solubility: 'Tan khá trong nước (~30 g/100 mL)',
      solubilityEn: 'Soluble in water (~30 g/100 mL)',
      realLife: 'Ester đơn giản nhất và nhẹ nhất, có mùi thơm hơi giống Ether dễ chịu; dùng làm dung môi khô tức thì, chất tạo xốp thân thiện môi trường và thậm chí được phát hiện trong đám mây bụi sao giữa ngân hà.',
      realLifeEn: 'Simplest and lightest ester; used as a fast-evaporating industrial blowing agent and famously detected in interstellar molecular clouds.',
      reactions: [
        'Thủy phân trong dung dịch NaOH đun nóng (xà phòng hóa) tạo muối Sodium formate và Methanol.',
        'Thủy phân không hoàn toàn (thuận nghịch) trong nước có mặt acid H₂SO₄ loãng khi đun nóng.',
        'Vẫn giữ nhóm đầu HCOO– nên THAM GIA PHẢN ỨNG TRÁNG BẠC (AgNO₃/NH₃) tạo 2 mol Ag và làm mất màu nước Brom!'
      ],
      reactionsEn: [
        'Saponifies upon warming with aqueous NaOH into Sodium formate and Methanol.',
        'Reversibly hydrolyzes in hot dilute acid to Formic acid and Methanol.',
        'Retains an aldehyde-like HCOO– fragment — gives a positive silver mirror with Tollens reagent (unique among common esters)!'
      ],
      note: 'Cùng công thức C₂H₄O₂ với Acetic acid (nhưng sôi thấp hơn tới 86°C do là Ester không tạo được liên kết giữa các phân tử).',
      noteEn: 'Isomeric with Acetic acid (C₂H₄O₂) yet boils 86°C lower; Tollens test (+) differentiates it from Acetates.'
    },
    {
      id: 'ethyl-formate',
      catKey: 'ester',
      elements: ['C','O','O','C','C'],
      bonds: [[0,1,2],[0,2,1],[2,3,1],[3,4,1]],
      name: 'Ethyl formate',
      nameEn: 'Ethyl formate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi rượu rum và quả mâm xôi)',
      stateEn: 'Colorless liquid (rum & raspberry aroma)',
      solubility: 'Tan vừa trong nước (~10 g/100 mL)',
      solubilityEn: 'Moderately soluble in water (~10 g/100 mL)',
      realLife: 'Chất tạo hương rượu rum và quả mâm xôi tự nhiên trong thực phẩm; còn nổi tiếng khi các nhà thiên văn vô tuyến tìm thấy phổ phát xạ của nó tại trung tâm Dải Ngân Hà (tinh vân Sagittarius B2).',
      realLifeEn: 'Gives food flavorings a rum and raspberry aroma; famously detected by radio astronomers at the center of our Milky Way galaxy.',
      reactions: [
        'Tham gia phản ứng tráng bạc với dung dịch AgNO₃/NH₃ tạo bạc kim loại (nhờ gốc Formate HCOO–).',
        'Xà phòng hóa hoàn toàn với NaOH tạo muối Sodium formate (HCOONa) và Ethanol.',
        'Không tác dụng với kim loại Na và không làm đổi màu giấy quỳ tím.'
      ],
      reactionsEn: [
        'Reduces Tollens reagent to a bright metallic silver mirror via its formate HCOO– moiety.',
        'Hot NaOH hydrolysis cleanly generates Sodium formate and Ethanol.',
        'Neutral to litmus and unreactive toward Na metal.'
      ],
      note: 'Cùng công thức C₃H₆O₂ với Methyl acetate và Propionic acid (câu tìm đồng phân ester C₃H₆O₂ có phản ứng tráng bạc).',
      noteEn: 'Shares C₃H₆O₂ with Methyl acetate; uniquely positive to Tollens silver-mirror reagent.'
    },
    {
      id: 'methyl-acetate',
      catKey: 'ester',
      elements: ['C','C','O','O','C'],
      bonds: [[0,1,1],[1,2,2],[1,3,1],[3,4,1]],
      name: 'Methyl acetate',
      nameEn: 'Methyl acetate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm keo dán nhẹ)',
      stateEn: 'Colorless volatile liquid (pleasant fruity glue odor)',
      solubility: 'Tan khá trong nước (~24 g/100 mL)',
      solubilityEn: 'Soluble in water (~24 g/100 mL)',
      realLife: 'Dung môi thân thiện môi trường thay thế cho Acetone trong keo dán nhựa, tẩy sơn móng tay ít độc và dùng sản xuất thuốc xịt khử mùi nhanh khô.',
      realLifeEn: 'Low-toxicity volatile solvent replacing Acetone in quick-dry glues, coatings, and nail polish removers.',
      reactions: [
        'Đun nóng với dung dịch NaOH (xà phòng hóa) tạo muối Sodium acetate (CH₃COONa) và Methanol (CH₃OH).',
        'Thủy phân thuận nghịch trong dung dịch H₂SO₄ loãng đun nóng tạo Acetic acid và Methanol.',
        'Hoàn toàn KHÔNG có phản ứng tráng bạc với AgNO₃/NH₃ (giúp phân biệt với đồng phân Ethyl formate).'
      ],
      reactionsEn: [
        'Hydrolyzes completely with hot aqueous NaOH into Sodium acetate and Methanol (careful: not Ethanol!).',
        'Reversible acid hydrolysis produces Acetic acid and Methanol.',
        'Negative to Tollens reagent (clearly distinguishable from isomeric Ethyl formate).'
      ],
      note: 'Cùng công thức C₃H₆O₂ với Ethyl formate nhưng không tráng bạc; nhớ gốc sau tạo Methanol (CH₃OH).',
      noteEn: 'Isomer of Ethyl formate and Propionic acid (C₃H₆O₂); remember saponification yields Methanol.'
    },
    {
      id: 'ethyl-acetate',
      catKey: 'ester',
      elements: ['C','C','O','O','C','C'],
      bonds: [[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1]],
      name: 'Ethyl acetate',
      nameEn: 'Ethyl acetate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm táo lê, nhẹ hơn nước)',
      stateEn: 'Colorless liquid (pleasant pear/apple aroma)',
      solubility: 'Ít tan trong nước (~8 g/100 mL), nổi tách lớp trên nước',
      solubilityEn: 'Slightly soluble in water (forms distinct upper layer)',
      realLife: 'Dung môi xanh dùng trong nước tẩy sơn móng tay dịu nhẹ ("acetone-free"), tách cafein tự nhiên ra khỏi hạt cà phê (tạo cà phê decaf) và tạo mùi hương kẹo trái cây.',
      realLifeEn: 'Safe solvent in acetone-free nail polish removers, coffee bean decaffeination, and fruity food flavorings.',
      reactions: [
        'Tổng hợp trực tiếp từ Ethanol và Acetic acid với H₂SO₄ đặc đun nóng (cần làm lạnh nhanh trong nước đá để thấy mùi thơm nổi tách lớp).',
        'Xà phòng hóa trong NaOH đun nóng tạo Sodium acetate và Ethanol (dùng điều chế muối cho phản ứng vôi tôi xút).',
        'Không tác dụng với kim loại Na và không làm mất màu nước Brom hay tráng bạc.'
      ],
      reactionsEn: [
        'Synthesized classically by Fischer esterification of Acetic acid + Ethanol over conc. H₂SO₄.',
        'Saponifies cleanly with NaOH(aq) into Sodium acetate and Ethanol.',
        'Unreactive with Na metal, cold Br₂(aq), or Tollens reagent.'
      ],
      note: 'Là ester mẫu kinh điển trong sách Hóa 12; khi nhỏ sản phẩm thí nghiệm vào nước lạnh thấy lớp dầu lỏng thơm nổi lên trên.',
      noteEn: 'Signature Grade 12 lab ester: pours onto cold brine/water as a fragrant immiscible upper layer.'
    },
    {
      id: 'vinyl-acetate',
      catKey: 'ester',
      elements: ['C','C','O','O','C','C'],
      bonds: [[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,2]],
      name: 'Vinyl acetate',
      nameEn: 'Vinyl acetate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi ngọt hắc)',
      stateEn: 'Colorless liquid',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water (~2 g/100 mL)',
      realLife: 'Monomer thiết yếu tạo nhựa PVAc làm keo sữa trắng dán gỗ, dán giấy, kẹo cao su (chất nền cao su tổng hợp nhai không tan) và sơn tường gốc nước.',
      realLifeEn: 'Industrial monomer polymerized into Polyvinyl acetate (PVAc) for white wood/school glues, latex wall paints, and chewing gum base.',
      reactions: [
        'Làm MẤT MÀU nước Brom và KMnO₄ ở điều kiện thường (nhờ nối đôi Vinyl); trùng hợp tạo Poly(vinyl acetate).',
        'Thủy phân trong dung dịch NaOH đun nóng KHÔNG tạo alcohol mà tạo muối Sodium acetate và ACETALDEHYDE (CH₃CHO — vì gốc vinyl -OH tự chuyển vị ngay)!',
        'Vì có Acetaldehyde sinh ra sau thủy phân, dung dịch sản phẩm tham gia được phản ứng TRÁNG BẠC!'
      ],
      reactionsEn: [
        'Decolorizes bromine water and KMnO₄ rapidly; polymerizes into Poly(vinyl acetate) (PVAc wood glue).',
        'Alkaline hydrolysis with NaOH gives Sodium acetate + ACETALDEHYDE (no alcohol formed due to enol tautomerization)!',
        'Hydrolyzed product mixture tests positive to Tollens reagent thanks to liberated Acetaldehyde.'
      ],
      note: 'KHÔNG điều chế trực tiếp từ Acid + Alcohol được mà phải cộng Acetic acid vào Acetylene; thủy phân luôn ra Aldehyde!',
      noteEn: 'Critical exam ester: prepared from Acetic acid + Acetylene; hydrolysis produces Acetaldehyde rather than an alcohol!'
    },
    {
      id: 'methyl-methacrylate',
      catKey: 'ester',
      elements: ['C','C','C','C','O','O','C'],
      bonds: [[0,1,2],[1,2,1],[1,3,1],[2,4,2],[2,5,1],[5,6,1]],
      name: 'Methyl methacrylate',
      nameEn: 'Methyl methacrylate (MMA)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi hắc trái cây)',
      stateEn: 'Colorless sharp-smelling liquid',
      solubility: 'Rất ít tan trong nước (~1,5 g/100 mL)',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Monomer sản xuất tấm nhựa mica trong suốt (thủy tinh hữu cơ Plexiglas / PMMA) truyền sáng tốt hơn kính thường, nhẹ và không vỡ vụn để làm bể thủy sinh khổng lồ, đèn hậu ô tô và răng giả nha khoa.',
      realLifeEn: 'Monomer yielding shatter-resistant, crystal-clear Plexiglas (PMMA) for giant aquarium walls, car tail lights, and dental prosthetics.',
      reactions: [
        'Trùng hợp theo gốc tự do tạo nhựa Poly(methyl methacrylate) (PMMA — thủy tinh hữu cơ).',
        'Làm mất màu nhanh nước Brom và dung dịch KMnO₄ ở nhiệt độ thường.',
        'Thủy phân bằng NaOH đun nóng thu được muối Sodium methacrylate và Methanol.'
      ],
      reactionsEn: [
        'Undergoes radical addition polymerization to crystal-clear Plexiglas (PMMA).',
        'Rapidly decolorizes bromine water and aqueous KMnO₄ across the unsaturated methacrylate bond.',
        'Saponification with hot NaOH yields Sodium methacrylate and Methanol.'
      ],
      note: 'Nhớ cặp tên: Methyl methacrylate → trùng hợp tạo thủy tinh hữu cơ Plexiglas (PMMA).',
      noteEn: 'Key polymer monomer in Grade 12 Chemistry: Methyl methacrylate polymerizes into Plexiglas (PMMA).'
    },
    {
      id: 'isoamyl-acetate',
      catKey: 'ester',
      elements: ['C','C','O','O','C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[6,8,1]],
      name: 'Isoamyl acetate (Dầu chuối)',
      nameEn: 'Isoamyl acetate (Banana oil)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi chuối chín nồng thơm ngọt)',
      stateEn: 'Colorless liquid (strong ripe-banana aroma)',
      solubility: 'Rất ít tan trong nước (~0,2 g/100 mL)',
      solubilityEn: 'Practically insoluble in water',
      realLife: 'Chính là "dầu chuối" quen thuộc mà hàng chè, xôi và làm bánh kẹo Việt Nam hay nhỏ vài giọt tạo hương thơm chuối chín ngào ngạt; trong tự nhiên ong mật cũng tiết ra để báo động đồng loại.',
      realLifeEn: 'Famous banana oil flavoring used in desserts, candies, and Vietnamese sweet soups (chè), and naturally released as a honeybee alarm pheromone.',
      reactions: [
        'Điều chế bằng phản ứng ester hóa giữa Acetic acid và Isoamyl alcohol (3-methylbutan-1-ol) có H₂SO₄ đặc đun nóng.',
        'Xà phòng hóa trong NaOH đun nóng tạo muối Sodium acetate và Isoamyl alcohol.',
        'Nổi tách thành lớp dầu thơm rõ rệt trên mặt nước do nhẹ hơn nước và rất ít tan.'
      ],
      reactionsEn: [
        'Synthesized by Fischer esterification of Acetic acid and Isoamyl alcohol over conc. H₂SO₄.',
        'Saponifies cleanly with hot NaOH into Sodium acetate and Isoamyl alcohol.',
        'Floats cleanly atop water as an aromatic upper phase.'
      ],
      note: 'Công thức C₇H₁₄O₂; trong chương trình Hóa 12 luôn gắn liền hương liệu: Isoamyl acetate = mùi chuối chín.',
      noteEn: 'Formula C₇H₁₄O₂; most famous aroma ester in Vietnamese high-school chemistry (isoamyl acetate = ripe banana).'
    },
    {
      id: 'acetic-anhydride',
      catKey: 'anhydride',
      elements: ['C','C','O','O','C','O','C'],
      bonds: [[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,2],[4,6,1]],
      name: 'Acetic anhydride',
      nameEn: 'Acetic anhydride',
      category: 'Acid anhydride',
      categoryEn: 'Acid anhydride',
      state: 'Lỏng không màu (mùi giấm rất hắc cay mắt)',
      stateEn: 'Colorless fuming liquid (sharp vinegar odor)',
      solubility: 'Phản ứng chậm tạo Acetic acid khi tan vào nước',
      solubilityEn: 'Slowly hydrolyzes into Acetic acid in water',
      realLife: 'Tác nhân tổng hợp công nghiệp cực mạnh dùng để biến Salicylic acid thành thuốc giảm đau Aspirin hàng loạt và sản xuất sợi vải lụa tơ nhân tạo không thấm.',
      realLifeEn: 'Powerful acylating reagent indispensable for converting Salicylic acid into Aspirin and producing cellulose acetate fabrics and films.',
      reactions: [
        'Phản ứng nhanh với Salicylic acid tạo Aspirin và 1 phân tử Acetic acid phụ phẩm (hiệu suất cao hơn hẳn dùng trực tiếp acid).',
        'Thủy phân với nước ấm tạo ra 2 phân tử Acetic acid; phản ứng với Alcohol tạo Ester + Acetic acid không thuận nghịch.',
        'Phản ứng với Ammonia hoặc Amine tạo Amide (như sản xuất Paracetamol từ p-aminophenol).'
      ],
      reactionsEn: [
        'Acetylates Salicylic acid cleanly to Aspirin + Acetic acid in high yield without reversible water formation.',
        'Hydrolyzes with water to 2 equivalents of Acetic acid; irreversibly acylates Alcohols to Esters.',
        'Acetylates Amines swiftly into Amides (used in Paracetamol synthesis).'
      ],
      note: 'Ký hiệu gọn (CH₃CO)₂O; nhớ trong bài tổng hợp Aspirin dùng Acetic anhydride chứ không dùng Acetic acid trực tiếp với Phenol.',
      noteEn: 'Formula (CH₃CO)₂O; necessary for acetylating Phenols like Salicylic acid where direct esterification fails.'
    },
    // =========================================================================
    // 9. AMINO ACIDS, AMINES, AMIDES & HALOGEN DERIVATIVES (117 - 138)
    // =========================================================================
    {
      id: 'glycine',
      catKey: 'aminoacid',
      elements: ['N','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1]],
      name: 'Glycine (Gly)',
      nameEn: 'Glycine (Gly)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (tinh thể trắng vị ngọt nhẹ)',
      stateEn: 'Solid (white sweet-tasting crystals)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water (~25 g/100 mL)',
      realLife: 'Đơn vị nhỏ gọn và linh hoạt nhất xây dựng nên chuỗi xoắn collagen chắc khỏe cho da, sụn khớp và dây chằng; cũng là chất dẫn truyền thần kinh ức chế giúp cơ thể thư giãn ngủ ngon và dùng tạo vị ngọt dịu trong đồ uống.',
      realLifeEn: 'Simplest proteinogenic amino acid essential for flexible collagen in skin and joints, acting as a calming neurotransmitter in the spinal cord.',
      reactions: [
        'Có tính lưỡng tính rõ rệt: phản ứng cả với dung dịch HCl (tạo muối ClH₃N–CH₂–COOH) lẫn với NaOH (tạo H₂N–CH₂–COONa).',
        'Dung dịch nước trung tính gần pH ≈ 6 nên KHÔNG làm đổi màu giấy quỳ tím.',
        'Trùng ngưng nhiều phân tử loại nước tạo mạch Polypeptide hoặc tham gia phản ứng với Alcohol trong môi trường khí HCl tạo muối Ammonium của Ester.'
      ],
      reactionsEn: [
        'Amphoteric zwitterion: reacts cleanly with both aqueous HCl and NaOH solutions.',
        'Neutral aqueous solution (~pH 6.0) leaves both red and blue litmus paper unchanged.',
        'Polycondenses into Polypeptides and forms Methyl glycinate ester salt with CH₃OH / dry HCl.'
      ],
      note: 'Là α-amino acid đơn giản nhất (M = 75) và cũng là amino acid thiên nhiên duy nhất KHÔNG có tính quang hoạt.',
      noteEn: 'Simplest α-amino acid (M = 75.07 g/mol) and the only standard proteinogenic amino acid that is achiral.'
    },
    {
      id: 'alanine',
      catKey: 'aminoacid',
      elements: ['C','C','N','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1],[3,4,2],[3,5,1]],
      name: 'Alanine (Ala)',
      nameEn: 'Alanine (Ala)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (tinh thể trắng vị ngọt)',
      stateEn: 'Solid (white sweetish crystals)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water (~16 g/100 mL)',
      realLife: 'Amino acid phổ biến hàng đầu trong tơ tằm thiên nhiên và mô cơ động vật; đóng vai trò con thoi vận chuyển năng lượng và thải đạm an toàn từ cơ bắp về gan khi vận động kéo dài.',
      realLifeEn: 'Abundant in silk fibroin and animal muscle proteins, acting as a critical glucose–alanine metabolic shuttle between muscles and liver.',
      reactions: [
        'Phân tử mang tính lưỡng tính: phản ứng cả với HCl lẫn với NaOH (tỉ lệ đều là 1 : 1).',
        'Dung dịch trong nước KHÔNG làm đổi màu giấy quỳ tím.',
        'Các mắt xích Alanine liên kết với nhau qua liên kết peptide (–CO–NH–) tạo nên chuỗi protein tơ tằm bóng mượt.'
      ],
      reactionsEn: [
        'Amphoteric behavior: dissolves cleanly in both dilute HCl and NaOH (1:1 stoichiometry).',
        'Aqueous solution does NOT turn litmus red or blue (isoelectric point pI ≈ 6.0).',
        'Condenses via peptide bonds (–CO–NH–) to build silk fibroin and enzymes.'
      ],
      note: 'M = 89; nhớ cặp tính chất "không đổi màu quỳ" cho cả Glycine (M = 75), Alanine (M = 89) và Valine (M = 117).',
      noteEn: 'M = 89.09 g/mol; along with Glycine and Valine, forms the neutral α-amino acid trio that leaves litmus unchanged.'
    },
    {
      id: 'serine',
      catKey: 'aminoacid',
      elements: ['O','C','C','N','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[2,4,1],[4,5,2],[4,6,1]],
      name: 'Serine (Ser)',
      nameEn: 'Serine (Ser)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (tinh thể trắng vị hơi ngọt)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water (~35 g/100 mL)',
      realLife: 'Chiếm tỉ lệ đặc biệt cao trong lớp keo tơ bảo vệ sợi tơ tằm tự nhiên và giữ vai trò trực tiếp thực hiện xúc tác phân cắt ở trung tâm hoạt động của nhiều enzyme tiêu hóa quan trọng.',
      realLifeEn: 'Major component of natural silk gum (sericin) and the crucial catalytic nucleophile at the active site of digestive serine proteases.',
      reactions: [
        'Thể hiện tính lưỡng tính khi tác dụng với HCl và NaOH theo tỉ lệ 1 : 1, không làm đổi màu quỳ tím.',
        'Nhóm -OH bên nhánh phản ứng thêm với kim loại Na (tổng tỉ lệ giải phóng 1 mol H₂ mỗi phân tử khi Na dư).',
        'Nhờ nhánh phân cực hút nước mạnh nên Serine dễ tan trong nước hơn hẳn Alanine và Valine.'
      ],
      reactionsEn: [
        'Amphoteric 1:1 reaction with both HCl and NaOH; nearly neutral solution leaves litmus unchanged.',
        'Extra side-chain -OH allows evolution of 1 full mole of H₂ with excess metallic Na.',
        'Far more water-soluble than nonpolar Alanine or Valine thanks to its polar hydroxymethyl side chain.'
      ],
      note: 'Phân tử khối M = 105; có 1 nguyên tử O nhiều hơn Alanine.',
      noteEn: 'M = 105.09 g/mol; polar non-essential α-amino acid vital to enzyme catalysis.'
    },
    {
      id: 'valine',
      catKey: 'aminoacid',
      elements: ['C','C','C','C','N','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1],[3,4,1],[3,5,1],[5,6,2],[5,7,1]],
      name: 'Valine (Val)',
      nameEn: 'Valine (Val)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (tinh thể trắng vị hơi đắng ngọt)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan vừa trong nước (~8,8 g/100 mL)',
      solubilityEn: 'Soluble in water (~8.8 g/100 mL)',
      realLife: 'Một trong ba amino acid mạch nhánh thiết yếu (BCAA) trong sữa tăng cơ và thực phẩm giàu đạm (thịt, cá, đậu nành) mà cơ thể người không tự tổng hợp được, giúp phục hồi sợi cơ sau tập luyện.',
      realLifeEn: 'One of three essential branched-chain amino acids (BCAAs) abundant in dairy, soy, and sports protein shakes for muscle tissue recovery.',
      reactions: [
        'Có tính lưỡng tính: phản ứng với HCl và NaOH tỉ lệ 1 : 1; dung dịch nước KHÔNG làm đổi màu quỳ tím.',
        'Tham gia phản ứng trùng ngưng ghép chuỗi tạo Peptide (các Tripeptide trở lên cho phản ứng màu Biuret tím với Cu(OH)₂).',
        'Chế biến cùng Ester hóa với Methanol / khí HCl khô tạo Ester có điểm sôi thấp hơn nhiều.'
      ],
      reactionsEn: [
        'Amphoteric 1:1 reactivity with HCl and NaOH; aqueous solution does not change litmus paper color.',
        'Couples into Peptides (tripeptides and longer proteins give violet Biuret color with alkaline Cu(OH)₂).',
        'Hydrophobic isopropyl branch helps stabilize folded interior cores of globular proteins.'
      ],
      note: 'M = 117; là amino acid thiết yếu (phải nạp qua ăn uống) có trong danh mục GDPT 2018 cùng Gly, Ala, Glu, Lys.',
      noteEn: 'Essential BCAA (M = 117.15 g/mol) highlighted alongside Gly, Ala, Glu, and Lys in Grade 12 Chemistry.'
    },
    {
      id: 'glutamic-acid',
      catKey: 'aminoacid',
      elements: ['C','C','C','C','C','N','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[1,5,1],[0,6,2],[0,7,1],[4,8,2],[4,9,1]],
      name: 'Glutamic acid (Glu)',
      nameEn: 'Glutamic acid (Glu)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (bột tinh thể trắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Ít tan trong nước lạnh (~0,9 g/100 mL)',
      solubilityEn: 'Sparingly soluble in cold water (~0.86 g/100 mL)',
      realLife: 'Nổi tiếng toàn cầu khi chuyển hóa thành muối Monosodium glutamate (MSG — tức bột ngọt / mì chính) mang lại vị ngọt thịt umami đậm đà từ rong biển và cà chua; cũng làm thuốc hỗ trợ chức năng thần kinh.',
      realLifeEn: 'Source of Monosodium glutamate (MSG) giving savory umami flavor naturally to tomatoes, cheese, and seaweed, and key brain neurotransmitter.',
      reactions: [
        'Dung dịch nước LÀM QUỲ TÍM HÓA ĐỎ (hồng) do tính acid trội hơn (có hai chức -COOH và chỉ một chức -NH₂).',
        'Tác dụng với dung dịch kiềm NaOH theo tỉ lệ tối đa 1 : 2 (tạo muối trung hòa Disodium glutamate); còn với HCl chỉ tỉ lệ 1 : 1.',
        'Phản ứng vừa đủ với 1 mol NaOH thu được muối Monosodium glutamate (MSG — bột ngọt / mì chính).'
      ],
      reactionsEn: [
        'Turns blue LITMUS RED (pI ≈ 3.2) because two carboxylic acid groups outnumber one amine group.',
        'Consumes up to 2 moles of NaOH per mole for complete neutralization, versus 1 mole of HCl.',
        'Half-neutralization (1 mole NaOH) yields commercial Monosodium glutamate (MSG).'
      ],
      note: 'M = 147; cực hay gặp câu hỏi: Gly/Ala/Val không đổi màu quỳ, Glutamic acid hóa đỏ quỳ, Lysine hóa xanh quỳ.',
      noteEn: 'M = 147.13 g/mol; textbook litmus rule: Glu turns litmus red, Lys turns it blue, Gly/Ala/Val remain neutral.'
    },
    {
      id: 'lysine',
      catKey: 'aminoacid',
      elements: ['N','C','C','C','C','C','N','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[5,7,1],[7,8,2],[7,9,1]],
      name: 'Lysine (Lys)',
      nameEn: 'Lysine (Lys)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Amino acid thiết yếu thường được bổ sung trong siro ăn ngon cho trẻ em, ngũ cốc và thức ăn chăn nuôi để giúp cơ thể hấp thu Calcium hiệu quả, tổng hợp Collagen và tăng trưởng chiều cao.',
      realLifeEn: 'Essential amino acid added to children’s nutritional supplements and grain feeds to support Calcium absorption, Collagen synthesis, and growth.',
      reactions: [
        'Dung dịch nước LÀM QUỲ TÍM HÓA XANH (tính base trội hơn vì có hai nhóm -NH₂ so với một nhóm -COOH).',
        'Tác dụng với dung dịch HCl theo tỉ lệ tối đa 1 : 2 (tạo muối dihydrochloride); tác dụng với NaOH chỉ theo tỉ lệ 1 : 1.',
        'Có thể tham gia trùng ngưng tạo mạng liên kết peptide phức tạp trong protein histone bọc lấy DNA.'
      ],
      reactionsEn: [
        'Turns red LITMUS BLUE (pI ≈ 9.7) because two basic amine groups outweigh one carboxylic acid.',
        'Reacts with up to 2 moles of HCl (forming a dihydrochloride salt), versus only 1 mole of NaOH.',
        'Basic positively charged side chain binds negatively charged DNA tightly inside cell nuclei.'
      ],
      note: 'M = 146 (chỉ kém Glutamic acid đúng 1 đơn vị!); phân biệt ngay với Glu dựa vào chiều đổi màu quỳ tím.',
      noteEn: 'M = 146.19 g/mol (1 unit lighter than Glutamic acid!); turns litmus blue instead of red.'
    },
    {
      id: 'methylamine',
      catKey: 'amine',
      elements: ['C','N'],
      bonds: [[0,1,1]],
      name: 'Methylamine',
      nameEn: 'Methylamine',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Khí không màu (mùi khai nồng giống cá tanh)',
      stateEn: 'Colorless gas (pungent ammonia/fishy odor)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Khí có mùi khai pha tanh đặc trưng, tìm thấy ở lượng vết trong nước muối cá và cây trồng; dùng làm nguyên liệu tổng hợp dược phẩm, thuốc bảo vệ thực vật và chất kết tụ.',
      realLifeEn: 'Simplest organic amine gas with a fishy ammonia odor, widely employed in manufacturing pharmaceuticals, agrochemicals, and surfactants.',
      reactions: [
        'Dung dịch nước có tính base mạnh hơn NH₃: LÀM QUỲ TÍM HÓA XANH và làm dung dịch phenolphthalein chuyển màu hồng.',
        'Tác dụng với khí HCl đặc tạo làn KHÓI TRẮNG Methylammonium chloride (CH₃NH₃Cl); phản ứng nhanh với HCl, H₂SO₄.',
        'Tạo kết tủa trắng keo hoặc xanh lơ khi nhỏ vào dung dịch FeCl₃ hoặc Cu(NO₃)₂ (kết tủa Cu(OH)₂ tan lại trong Methylamine dư thành phức xanh đậm).'
      ],
      reactionsEn: [
        'Stronger aqueous base than Ammonia: turns red litmus blue and phenolphthalein pink.',
        'Generates dense WHITE fumes of CH₃NH₃Cl when exposed to HCl gas.',
        'Precipitates metal hydroxides from Fe³⁺ or Cu²⁺ salts (re-dissolving Cu(OH)₂ in excess amine into a deep blue complex).'
      ],
      note: 'CH₃NH₂ (M = 31) là chất khí nhẹ hơn không khí một chút ở 25°C tương tự Dimethylamine, Trimethylamine và Ethylamine.',
      noteEn: 'Gaseous at 25°C along with Dimethylamine, Trimethylamine, and Ethylamine — all four simple aliphatic amines are water-soluble gases.'
    },
    {
      id: 'dimethylamine',
      catKey: 'amine',
      elements: ['C','N','C'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Dimethylamine',
      nameEn: 'Dimethylamine',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Khí không màu (hóa lỏng ở 7°C, mùi khai cá tanh)',
      stateEn: 'Colorless gas (bp 7°C, fishy ammonia odor)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Hóa chất trung gian công nghiệp dùng sản xuất dung môi hòa tan sợi vải đàn hồi Spandex/Lycra (DMF), thuốc kháng histamine trị dị ứng và chất xúc tác lưu hóa cao su.',
      realLifeEn: 'Industrial amine used to manufacture DMF solvent for elastic Spandex fibers, antihistamine medications, and rubber accelerators.',
      reactions: [
        'Là một trong những amine có tính base mạnh nhất trong dung dịch nước (mạnh hơn cả Methylamine và Ethylamine), làm xanh giấy quỳ ẩm.',
        'Tác dụng nhanh với acid HCl và acid nitrous (HNO₂) tạo hợp chất N-nitrosamine màu vàng dầu (nhận biết amine bậc hai).',
        'Phản ứng với chất acyl hóa tạo thành Amide bậc ba bền vững.'
      ],
      reactionsEn: [
        'One of the strongest simple aliphatic amine bases in water; turns red litmus blue instantly.',
        'Reacts cleanly with HNO₂ to yield yellow oily N-nitrosodimethylamine (diagnostic secondary amine test).',
        'Readily acylates with Acetic anhydride to form N,N-dimethylacetamide.'
      ],
      note: 'Cùng công thức C₂H₇N với Ethylamine; tính base: Dimethylamine (bậc II) > Ethylamine > Methylamine > NH₃ > Aniline.',
      noteEn: 'Secondary C₂H₇N isomer of Ethylamine; exhibits the highest aqueous basicity among simple methyl/ethyl amines.'
    },
    {
      id: 'trimethylamine',
      catKey: 'amine',
      elements: ['C','N','C','C'],
      bonds: [[0,1,1],[1,2,1],[1,3,1]],
      name: 'Trimethylamine',
      nameEn: 'Trimethylamine',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Khí không màu (sôi ở 2,9°C, mùi cá biển ươn đặc trưng)',
      stateEn: 'Colorless gas (bp 2.9°C, strong rotting-fish smell)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Chính là chất gây ra mùi tanh khó chịu nhất ở cá biển (cá thu, cá ngừ) để không khí ẩm; dùng mẹo vắt giấm, chanh (chứa Acid) hoặc rửa rượu giúp trung hòa bớt mùi tanh này khi nấu ăn!',
      realLifeEn: 'Key culprit behind the unmistakable smell of salt-water fish (neutralized cleanly when cooking by lemon juice or vinegar acids!).',
      reactions: [
        'Có tính base yếu hơn Methylamine và Dimethylamine trong nước nhưng vẫn làm xanh giấy quỳ và tan nhanh trong dung dịch acid (làm mất mùi tanh).',
        'Phản ứng với Iodomethane (CH₃I) tạo muối Amoni bậc bốn rắn không màu.',
        'Không có nguyên tử H gắn trực tiếp vào N nên không tạo được liên kết giữa các phân tử cùng loại (nhiệt độ sôi rất thấp) và không phản ứng tạo Amide.'
      ],
      reactionsEn: [
        'Turns red litmus blue and reacts rapidly with vinegar/lemon Citric acid into odorless non-volatile salts.',
        'Quaternizes with CH₃I cleanly into Tetramethylammonium iodide.',
        'Lacks any N–H bond, preventing self-hydrogen bonding (explaining its 2.9°C boiling point) and amide formation.'
      ],
      note: 'Công thức (CH₃)₃N (amine bậc ba, C₃H₉N); giải thích mẹo dân gian khử mùi tanh cá bằng chanh, mẻ hoặc giấm trong Hóa 12.',
      noteEn: 'Tertiary amine (C₃H₉N) featured in Grade 12 Chemistry to explain acid deodorization of fishy odors.'
    },
    {
      id: 'ethylamine',
      catKey: 'amine',
      elements: ['C','C','N'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Ethylamine',
      nameEn: 'Ethylamine',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Khí không màu (sôi ở 16,6°C, mùi khai nồng)',
      stateEn: 'Colorless gas / volatile liquid (bp 16.6°C)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Tiền chất công nghiệp dùng sản xuất thuốc diệt cỏ nông nghiệp (Atrazine) và chất phụ gia giữ mùi ổn định trong sản xuất giấy và thuộc da.',
      realLifeEn: 'Precursor to widely used agricultural herbicides (Atrazine) and auxiliary chemical in leather tanning and dye manufacturing.',
      reactions: [
        'Làm quỳ tím hóa xanh và phenolphthalein hóa hồng rõ rệt; tác dụng mạnh với HCl tạo Ethylammonium chloride (C₂H₅NH₃Cl).',
        'Phản ứng với acid nitrous (NaNO₂ + HCl) ở nhiệt độ thường giải phóng bọt khí N₂ và tạo lại Ethanol (phản ứng phân biệt amine bậc I).',
        'Nhỏ vào dung dịch CuSO₄ tạo kết tủa xanh Cu(OH)₂ rồi hòa tan thành phức đồng xanh lam thẫm.'
      ],
      reactionsEn: [
        'Strongly basic: turns litmus blue and phenolphthalein pink; yields soluble Ethylammonium chloride with HCl.',
        'Reacts with cold nitrous acid (NaNO₂/HCl) liberating vigorous N₂ gas bubbles and Ethanol (primary amine test).',
        'Forms a deep blue copper-amine complex upon excess addition to aqueous CuSO₄.'
      ],
      note: 'Cùng công thức C₂H₇N với Dimethylamine; lưu ý C₂H₅NH₂ vẫn là chất khí ở 25°C (dù rất gần điểm sôi).',
      noteEn: 'Primary C₂H₇N isomer of Dimethylamine; gas at 25°C (boils at 16.6°C).'
    },
    {
      id: 'ethylenediamine',
      catKey: 'amine',
      elements: ['N','C','C','N'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: 'Ethylenediamine',
      nameEn: 'Ethylenediamine',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Lỏng sánh không màu (mùi amoniac mạnh)',
      stateEn: 'Colorless liquid (ammoniacal odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Cánh tay kẹp đa năng tạo thành EDTA — chất "gắp kim loại" nổi tiếng dùng làm mềm nước cứng, bảo quản mẫu máu xét nghiệm không đông và giải độc ngộ độc chì, thủy ngân trong bệnh viện.',
      realLifeEn: 'Chelating ligand used to synthesize EDTA, vital in clinical blood-sample anticoagulants, water softening, and heavy-metal poisoning therapy.',
      reactions: [
        'Phản ứng trung hòa với dung dịch HCl theo tỉ lệ tối đa 1 : 2 và làm xanh quỳ tím rất mạnh.',
        'Tạo phức chất vòng càng cực kỳ bền (ký hiệu là phối tử "en") với ion Cu²⁺, Ni²⁺, Co³⁺ có màu sắc rực rỡ.',
        'Hút mạnh hơi ẩm và khí CO₂ từ không khí tạo màng muối carbonate trắng trên thành bình.'
      ],
      reactionsEn: [
        'Dibasic diamine: consumes 2 equivalents of HCl and turns red litmus deep blue.',
        'Binds transition metals such as Cu²⁺ and Co³⁺ as a strong bidentate chelate ligand ("en").',
        'Absorbs CO₂ and moisture rapidly when exposed to open air.'
      ],
      note: 'Tên chuẩn IUPAC: Ethane-1,2-diamine; là phân tử mẫu trong chương Phức chất của chương trình Hóa 12 GDPT 2018.',
      noteEn: 'IUPAC name: Ethane-1,2-diamine; quintessential bidentate ligand ("en") introduced in GDPT 2018 Grade 12 Coordination Chemistry.'
    },
    {
      id: 'hexamethylenediamine',
      catKey: 'amine',
      elements: ['N','C','C','C','C','C','C','N'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1]],
      name: 'Hexamethylenediamine',
      nameEn: 'Hexamethylenediamine',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Rắn tinh thể trắng (nóng chảy ở 41°C, mùi amine nặng)',
      stateEn: 'White crystalline solid (mp 41°C)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Một nửa mảnh ghép tạo nên cuộc cách mạng tơ sợi tổng hợp Nylon-6,6 năm 1935 — làm tất da chân, dây đàn guitar, dây thừng leo núi, bàn chải đánh răng và linh kiện nhựa kỹ thuật ô tô.',
      realLifeEn: 'Co-monomer behind Nylon-6,6 (first all-synthetic fiber, 1935) used in toothbrushes, guitar strings, climbing ropes, and engineered auto parts.',
      reactions: [
        'Trùng ngưng với Adipic acid ở nhiệt độ cao tách nước tạo thành Polymer Tơ Nylon-6,6 bền dai.',
        'Trùng ngưng nhanh ở bề mặt tiếp xúc ngay ở nhiệt độ phòng với Adipoyl chloride tạo sợi tơ dẻo kéo rút liên tục ("thí nghiệm sợi Nylon thần kỳ").',
        'Tính base mạnh: tác dụng với acid HCl theo tỉ lệ mol 1 : 2.'
      ],
      reactionsEn: [
        'Polycondenses with Adipic acid upon heating to manufacture Nylon-6,6 fiber.',
        'Undergoes instantaneous interfacial polymerization with Adipoyl chloride at room temperature (the classic Nylon Rope Trick lab).',
        'Consumes 2 moles of HCl cleanly per mole to yield a crystalline dihydrochloride salt.'
      ],
      note: 'Tên chuẩn IUPAC: Hexane-1,6-diamine; nhớ cặp phản ứng Nylon-6,6 gồm Hexamethylenediamine + Adipic acid.',
      noteEn: 'IUPAC name: Hexane-1,6-diamine; always paired with 6-carbon Adipic acid to yield Nylon-6,6.'
    },
    {
      id: 'urea',
      catKey: 'amide',
      elements: ['C','O','N','N'],
      bonds: [[0,1,2],[0,2,1],[0,3,1]],
      name: 'Urea (Phân đạm)',
      nameEn: 'Urea',
      category: 'Amide',
      categoryEn: 'Amide',
      state: 'Rắn (hạt tinh thể trắng không mùi, vị mát hơi đắng)',
      stateEn: 'Solid (white odorless prills/crystals)',
      solubility: 'Tan rất tốt trong nước (thu nhiệt mạnh làm lạnh nước)',
      solubilityEn: 'Very soluble in water (endothermic dissolution)',
      realLife: 'Loại phân đạm hóa học giàu Nitrogen nhất (~46,6% N) nuôi cây xanh tốt trên toàn cầu; đồng thời là thành phần thải đạm tự nhiên trong nước tiểu động vật có vú và chất giữ ẩm tuyệt vời trong kem dưỡng gót chân nứt nẻ.',
      realLifeEn: 'World’s highest-Nitrogen (~46.6%) solid fertilizer, natural mammalian urinary metabolite, and moisture-binding cream ingredient; first organic compound made from inorganic matter (Wöhler, 1828).',
      reactions: [
        'Thủy phân chậm trong đất nhờ enzyme Urease (hoặc nhanh khi đun kiềm/acid) chuyển hóa thành (NH₄)₂CO₃ cung cấp đạm cho rễ cây hấp thụ.',
        'Tác dụng với dung dịch Ca(OH)₂/NaOH đun nóng giải phóng khí NH₃ mùi khai làm xanh quỳ tím ẩm.',
        'Hòa tan trong nước hút nhiệt rất mạnh làm hạ nhiệt độ dung dịch (ứng dụng làm túi chườm lạnh khẩn cấp).'
      ],
      reactionsEn: [
        'Hydrolyzes via soil urease enzyme or hot acid/base into Ammonium carbonate, delivering bioavailable Nitrogen to plants.',
        'Warming with NaOH or Ca(OH)₂ liberates pungent Ammonia (NH₃) gas.',
        'Endothermic dissolution chills water dramatically (used in instant medical cold packs).'
      ],
      note: 'Năm 1828, Friedrich Wöhler tổng hợp thành công Urea từ chất vô cơ Ammonium cyanate — đánh dấu sự ra đời ngành Hóa học Hữu cơ hiện đại!',
      noteEn: 'Wöhler’s historic 1828 synthesis from inorganic Ammonium cyanate disproved "vitalism" and launched organic chemistry.'
    },
    {
      id: 'formamide',
      catKey: 'amide',
      elements: ['C','O','N'],
      bonds: [[0,1,2],[0,2,1]],
      name: 'Formamide',
      nameEn: 'Formamide',
      category: 'Amide',
      categoryEn: 'Amide',
      state: 'Lỏng sánh không màu (hút ẩm nhẹ, không mùi khi tinh khiết)',
      stateEn: 'Colorless odorless viscous liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi phân cực mạnh có hằng số điện môi lớn hơn cả nước (≈109), dùng để tách đôi mạch DNA trong sinh học phân tử, giữ ẩm mực in và tổng hợp các dược phẩm nhóm Sulfa.',
      realLifeEn: 'High-dielectric-constant (ε ≈ 109) polar solvent used to denature DNA strands in biotechnology gels, stabilize inks, and synthesize sulfa drugs.',
      reactions: [
        'Thủy phân khi đun với NaOH tạo Sodium formate (HCOONa) và giải phóng khí NH₃; đun với acid vô cơ tạo Formic acid và muối Ammonium.',
        'Tách nước ở nhiệt độ cao với xúc tác thích hợp tạo Hydrogen cyanide (HCN) công nghiệp.',
        'Môi trường trung tính (hầu như không còn tính base trên nguyên tử N do hiệu ứng liên hợp).'
      ],
      reactionsEn: [
        'Hot alkaline hydrolysis yields Sodium formate and NH₃ gas; acid hydrolysis forms Formic acid and NH₄⁺ salt.',
        'Catalytic high-temperature dehydration manufactures industrial Hydrogen cyanide (HCN).',
        'Virtually neutral in water due to strong resonance delocalization between C=O and N.'
      ],
      note: 'Công thức HCONH₂; amide đơn giản nhất, dung dịch khá bền và trung tính.',
      noteEn: 'Simplest amide (HCONH₂); polar, essentially neutral, and extraordinarily high dielectric constant.'
    },
    {
      id: 'acetamide',
      catKey: 'amide',
      elements: ['C','C','O','N'],
      bonds: [[0,1,1],[1,2,2],[1,3,1]],
      name: 'Acetamide',
      nameEn: 'Acetamide',
      category: 'Amide',
      categoryEn: 'Amide',
      state: 'Rắn (tinh thể trắng không màu, dễ chảy rữa)',
      stateEn: 'Solid (colorless hygroscopic crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water (~200 g/100 mL)',
      realLife: 'Chất hóa dẻo cho giấy và màng phim nhựa, chất ổn định chống phân hủy hóa chất và trung gian tổng hợp thuốc trừ sâu, chất màu dệt nhuộm.',
      realLifeEn: 'Plasticizer in specialty papers and films, stabilizer, and organic intermediate in textile dyes and agrochemicals.',
      reactions: [
        'Đun nóng với dung dịch NaOH giải phóng khí NH₃ mùi khai và tạo muối Sodium acetate (CH₃COONa).',
        'Đun sôi với acid HCl loãng thủy phân hoàn toàn thành Acetic acid và muối NH₄Cl.',
        'Là chất trung tính (không làm đổi màu giấy quỳ tím trong nước).'
      ],
      reactionsEn: [
        'Warming with aqueous NaOH evolves Ammonia (NH₃) gas and leaves Sodium acetate.',
        'Boiling aqueous HCl hydrolyzes it cleanly into Acetic acid and NH₄Cl.',
        'Neutral to litmus in pure aqueous solution.'
      ],
      note: 'Công thức CH₃CONH₂ (C₂H₅NO); tổng hợp kinh điển bằng cách nhiệt phân muối Ammonium acetate (CH₃COONH₄).',
      noteEn: 'Formula CH₃CONH₂ (C₂H₅NO); classic preparation via dry thermal dehydration of Ammonium acetate.'
    },
    {
      id: 'chloromethane',
      catKey: 'halogen',
      elements: ['C','Cl'],
      bonds: [[0,1,1]],
      name: 'Chloromethane',
      nameEn: 'Chloromethane (Methyl chloride)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Khí không màu (mùi ngọt nhẹ, hóa lỏng ở −24°C)',
      stateEn: 'Colorless gas (bp −24°C)',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Sản phẩm chính được dùng để sản xuất vật liệu Silicone (nút bịt kín chống thấm, khuôn nướng bánh chịu nhiệt, dầu bôi trơn y tế) và từng làm môi chất làm lạnh đầu thế kỷ 20.',
      realLifeEn: 'Primary feedstock manufacturing heat-resistant Silicone sealants and bakeware polymers, as well as Methylcellulose thickeners.',
      reactions: [
        'Thủy phân khi đun nóng trong dung dịch NaOH loãng tạo Methanol và muối NaCl.',
        'Được điều chế trực tiếp bằng phản ứng thế gốc tự do giữa khí Methane và Cl₂ (ánh sáng khuếch tán, tỉ lệ 1 : 1).',
        'Phản ứng với bột Si ở 300°C (xt Cu) tạo hỗn hợp Methylchlorosilane để tổng hợp polymer Silicone.'
      ],
      reactionsEn: [
        'Nucleophilic substitution with hot aqueous NaOH yields Methanol and NaCl.',
        'Synthesized commercially from Methane + Cl₂ (UV/heat) or Methanol + HCl.',
        'Reacts with elemental Silicon powder over Cu catalyst (Müller–Rochow process) to build Silicone rubbers.'
      ],
      note: 'Là dẫn xuất halogen đơn giản nhất (CH₃Cl) — chất khí ở nhiệt độ phòng.',
      noteEn: 'Simplest haloalkane (CH₃Cl); gas at room temperature.'
    },
    {
      id: 'dichloromethane',
      catKey: 'halogen',
      elements: ['C','Cl','Cl'],
      bonds: [[0,1,1],[0,2,1]],
      name: 'Dichloromethane (DCM)',
      nameEn: 'Dichloromethane (DCM)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (rất dễ bay hơi ở 40°C, nặng hơn nước)',
      stateEn: 'Colorless volatile liquid (bp 40°C, 1.33 g/mL)',
      solubility: 'Rất ít tan trong nước (~1,3 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (bottom layer)',
      realLife: 'Dung môi tẩy sơn cực mạnh, chiết tách Caffeine tự nhiên ra khỏi hạt cà phê (trước đây) và làm keo hàn nối nhựa mica trong suốt siêu nhanh trong gia công quảng cáo.',
      realLifeEn: 'Powerful paint stripper, solvent welder that fuses acrylic plastics cleanly, and historic caffeine extraction solvent.',
      reactions: [
        'Hầu như không cháy trong không khí ở nhiệt độ thường nhờ hàm lượng Chlorine cao; rất hay dùng tách lớp hữu cơ bên dưới phễu chiết.',
        'Phản ứng thế tiếp với Cl₂ (chiếu sáng) tạo Chloroform và Tetrachloromethane.',
        'Đun nóng với kiềm mạnh hoặc Sodium methoxide mới bị thủy phân chậm.'
      ],
      reactionsEn: [
        'Non-flammable in ordinary air and sinks below water cleanly as the lower organic phase during separatory extraction.',
        'Further photochemical chlorination produces Chloroform (CHCl₃) and CCl₄.',
        'Resists rapid alkaline hydrolysis compared with primary monohaloalkanes.'
      ],
      note: 'Công thức CH₂Cl₂; khác với Diethyl ether nổi bên trên nước, DCM nặng hơn nước (D = 1,33) nên luôn chìm xuống đáy phễu chiết.',
      noteEn: 'Formula CH₂Cl₂; higher density than water (1.33 g/cm³) puts DCM cleanly at the bottom of a separatory funnel.'
    },
    {
      id: 'chloroform',
      catKey: 'halogen',
      elements: ['C','Cl','Cl','Cl'],
      bonds: [[0,1,1],[0,2,1],[0,3,1]],
      name: 'Chloroform',
      nameEn: 'Chloroform',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (mùi ngọt hắc nặng, D = 1,49 g/cm³)',
      stateEn: 'Colorless dense volatile liquid (1.49 g/cm³)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water (~0.8 g/100 mL)',
      realLife: 'Từng nổi tiếng suốt gần một thế kỷ như chất gây mê hô hấp trong phẫu thuật; ngày nay chủ yếu làm dung môi chuyên dụng tách chiết tinh dầu, DNA và nguyên liệu sản xuất chất làm lạnh Teflon.',
      realLifeEn: 'Historically famous surgical anesthetic; now mainly used as a lab extraction solvent and feedstock for Chlorodifluoromethane (Teflon monomer).',
      reactions: [
        'Thủy phân với dung dịch NaOH đặc nóng tạo muối Sodium formate (HCOONa) và NaCl.',
        'Bị oxi hóa chậm bởi O₂ không khí dưới ánh sáng tạo khí cực độc Phosgene (COCl₂) — nên luôn đựng trong chai thủy tinh tối màu có thêm 1% Ethanol ổn định.',
        'Không bắt cháy tự do trong không khí ở nhiệt độ thường.'
      ],
      reactionsEn: [
        'Hot concentrated aqueous NaOH hydrolyzes CHCl₃ into Sodium formate and NaCl.',
        'Slowly oxidized by air/light to toxic Phosgene (COCl₂) gas — stored in brown amber bottles stabilized with ~1% Ethanol.',
        'Non-flammable solvent widely used in analytical labs (Deuterochloroform CDCl₃ for NMR spectroscopy).'
      ],
      note: 'Tên chuẩn IUPAC: Trichloromethane (CHCl₃); phải bảo quản trong chai tối màu đậy kín để tránh sinh khí độc Phosgene.',
      noteEn: 'IUPAC name: Trichloromethane (CHCl₃); must be stored in dark bottles away from Oxygen and UV light.'
    },
    {
      id: 'carbon-tetrachloride',
      catKey: 'halogen',
      elements: ['C','Cl','Cl','Cl','Cl'],
      bonds: [[0,1,1],[0,2,1],[0,3,1],[0,4,1]],
      name: 'Tetrachloromethane (CCl₄)',
      nameEn: 'Carbon tetrachloride (CCl₄)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (nặng 1,59 g/cm³, mùi giống Chloroform)',
      stateEn: 'Colorless heavy non-polar liquid (1.59 g/cm³)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Từng được nạp làm bình chữa cháy điện lực và dung môi giặt khô hiệu quả trước khi bị cấm dần theo Nghị định thư Montreal vì làm suy giảm tầng ozone và độc hại cho gan.',
      realLifeEn: 'Historically used in electrical fire extinguishers and dry cleaning, now strictly phased out under the Montreal Protocol for ozone depletion and liver toxicity.',
      reactions: [
        'KHÔNG CHÁY trong không khí (Carbon đã ở trạng thái oxi hóa +4 cực đại); hòa tan cực tốt khí Bromine I₂ tạo dung dịch màu tím đẹp.',
        'Do đối xứng tứ diện hoàn hảo, cả phân tử là dung môi KHÔNG PHÂN CỰC dù chứa 4 liên kết phân cực mạnh C–Cl.',
        'Không thủy phân trong nước thường nhưng với hơi nước quá nhiệt ở >250°C tạo CO₂ và HCl (hoặc khí độc COCl₂ khi gặp lửa).'
      ],
      reactionsEn: [
        'Completely non-flammable in air; dissolves elemental Iodine cleanly into a rich violet nonpolar phase.',
        'Perfect tetrahedral symmetry cancels individual C–Cl bond dipoles, making CCl₄ wholly NONPOLAR.',
        'Inert toward ordinary water, though superheated steam decomposes it into HCl and dangerous COCl₂.'
      ],
      note: 'Ví dụ mẫu mực về độ phân cực phân tử: liên kết C–Cl phân cực nhưng tổng hợp đối xứng tứ diện làm CCl₄ không phân cực!',
      noteEn: 'Classic molecular-polarity teaching example: four polar C–Cl bonds cancel symmetrically to yield a nonpolar molecule.'
    },
    {
      id: 'vinyl-chloride',
      catKey: 'halogen',
      elements: ['C','C','Cl'],
      bonds: [[0,1,2],[1,2,1]],
      name: 'Vinyl chloride',
      nameEn: 'Vinyl chloride',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Khí không màu (hóa lỏng ở −13,4°C)',
      stateEn: 'Colorless gas (bp −13.4°C)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Monomer hàng đầu trong ngành xây dựng: trùng hợp tạo thành nhựa PVC (Poly(vinyl chloride)) làm ống dẫn nước sạch, cửa nhựa lõi thép, thẻ ATM ngân hàng, áo mưa và vỏ dây điện cách điện.',
      realLifeEn: 'Huge-volume construction monomer polymerized into PVC pipes, vinyl siding, bank cards, medical tubing, and wire insulation.',
      reactions: [
        'Trùng hợp (xt, t°, p) tạo nhựa Poly(vinyl chloride) — viết tắt là PVC.',
        'Làm mất màu nước Brom và dung dịch KMnO₄ ở điều kiện thường (nhờ liên kết đôi C=C).',
        'Liên kết C(sp²)–Cl rất bền nên KHÔNG bị thủy phân bởi dung dịch NaOH loãng đun sôi (tương tự Chlorobenzene).'
      ],
      reactionsEn: [
        'Polymerizes via free-radical initiation into rigid or plasticized Poly(vinyl chloride) (PVC).',
        'Decolorizes aqueous Br₂ and cold dilute KMnO₄ rapidly.',
        'Resists nucleophilic hydrolysis in boiling NaOH(aq) because Cl sits directly on an sp² double-bond carbon.'
      ],
      note: 'Điều chế công nghiệp bằng phản ứng cộng HCl vào Acetylene (xt HgCl₂, 150–200°C) hoặc nhiệt phân 1,2-dichloroethane.',
      noteEn: 'Name in IUPAC: Chloroethene; prepared via HgCl₂-catalyzed HCl addition to Acetylene or cracking 1,2-dichloroethane.'
    },
    {
      id: 'ethyl-chloride',
      catKey: 'halogen',
      elements: ['C','C','Cl'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Ethyl chloride',
      nameEn: 'Ethyl chloride (Chloroethane)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Khí không màu (hóa lỏng ngay ở 12,3°C)',
      stateEn: 'Colorless gas / volatile liquid (bp 12.3°C)',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Thuốc xịt gây tê lạnh tức thì quen thuộc trong thi đấu thể thao (bóng đá, điền kinh): khi xịt lên da lập tức sôi bay hơi ở 12°C, rút nhiệt làm tê cóng giảm đau chấn thương va chạm ngay tại chỗ.',
      realLifeEn: 'Topical sports cooling anesthetic spray: boiling rapidly off warm skin at 12°C absorbs heat and numbs localized sprains or bruises.',
      reactions: [
        'Thủy phân dễ dàng khi đun nóng với dung dịch kiềm NaOH loãng (t°) tạo Ethanol và muối NaCl (làm thí nghiệm chứng minh dẫn xuất alkane phản ứng dễ hơn Chlorobenzene/Vinyl chloride!).',
        'Tác dụng với KOH trong dung dịch Ethanol đun nóng (phản ứng tách HCl) tạo khí Ethylene.',
        'Nhỏ dung dịch sản phẩm sau thủy phân kiềm đã acid hóa bằng HNO₃ vào AgNO₃ thấy ngay KẾT TỦA TRẮNG AgCl!'
      ],
      reactionsEn: [
        'Hydrolyzes cleanly when warmed in aqueous NaOH to Ethanol and NaCl (far easier than Vinyl chloride or Chlorobenzene).',
        'Elimination with alcoholic KOH (KOH/C₂H₅OH, heat) strips HCl to generate Ethylene gas.',
        'Acidifying the hydrolyzed layer with HNO₃ and adding AgNO₃ immediately precipitates white AgCl↓.'
      ],
      note: 'Nhớ quy tắc so sánh dung môi với Ethyl chloride/bromide: NaOH/H₂O đun nóng → phản ứng THẾ tạo Ethanol; KOH/C₂H₅OH đun nóng → phản ứng TÁCH tạo Ethylene.',
      noteEn: 'Classic substitution vs. elimination rule: aqueous NaOH + heat gives Ethanol; alcoholic KOH + heat gives Ethylene.'
    },
    {
      id: '1,2-dibromoethane',
      catKey: 'halogen',
      elements: ['C','C','Br','Br'],
      bonds: [[0,1,1],[0,2,1],[1,3,1]],
      name: '1,2-Dibromoethane',
      nameEn: '1,2-Dibromoethane',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (nặng 2,18 g/cm³, mùi ngọt)',
      stateEn: 'Colorless very dense liquid (2.18 g/cm³)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Slightly soluble in water (~0.4 g/100 mL)',
      realLife: 'Sản phẩm chuẩn của phản ứng kinh điển "sục khí Ethylene làm mất màu nước Brom màu vàng nâu" trên lớp học; từng làm chất quét chì trong xăng pha chì trước khi bị thay thế bởi xăng không chì.',
      realLifeEn: 'Direct liquid product formed whenever Ethylene gas decolorizes brown bromine water in class demos; formerly used as a lead scavenger in leaded fuels.',
      reactions: [
        'Tạo thành tức thì khi sục khí Ethylene vào bình chứa dung dịch Bromine nước màu da cam làm dung dịch trở nên trong suốt.',
        'Thủy phân với dung dịch NaOH đun nóng chuyển thành polyalcohol Ethylene glycol và muối NaBr.',
        'Đun nóng với KOH trong Ethanol tách 2 phân tử HBr liên tiếp tạo ra khí Acetylene!'
      ],
      reactionsEn: [
        'Formed instantaneously when Ethylene decolorizes orange-brown bromine water.',
        'Hot aqueous NaOH hydrolyzes both bromines cleanly into Ethylene glycol + 2 NaBr.',
        'Double dehydrobromination with hot alcoholic KOH eliminates 2 HBr to yield Acetylene gas!'
      ],
      note: 'Thí nghiệm Ethylene làm mất màu nước Brom tạo 1,2-dibromoethane không màu lắng xuống đáy là phản ứng nhận biết Alkene cơ bản nhất.',
      noteEn: 'Textbook product explaining why orange bromine water turns colorless and leaves tiny dense droplets on Alkene bubbling.'
    },

    // =========================================================================
    // 10. BIOMEDICAL, FLAVOR & SPECIAL GEOMETRY PACK v2 (+8 = 25 v2 TARGETS)
    // =========================================================================
    {
      id: 'dopamine',
      catKey: 'amine',
      elements: [...C6_AROM, 'O', 'O', 'C', 'C', 'N'],
      bonds: [...BENZENE, [0,6,1], [1,7,1], [3,8,1], [8,9,1], [9,10,1]],
      name: 'Dopamine',
      nameEn: 'Dopamine',
      category: 'Amine (Chất dẫn truyền)',
      categoryEn: 'Amine (Neurotransmitter)',
      state: 'Rắn (tinh thể trắng, dễ bị oxi hóa ngoài không khí)',
      stateEn: 'Solid (white crystalline powder, air-sensitive)',
      solubility: 'Tan tốt dưới dạng muối hydrochloride',
      solubilityEn: 'Water-soluble as hydrochloride salt',
      realLife: 'Chất dẫn truyền thần kinh quan trọng trong não bộ điều phối cảm giác hứng thú, động lực và vận động; dạng thuốc tiêm còn dùng cấp cứu nâng huyết áp tại bệnh viện.',
      realLifeEn: 'Key brain neurotransmitter regulating reward, motivation, and motor control; administered intravenously in critical care to support blood pressure.',
      reactions: [
        'Hai nhóm -OH phenol ở vị trí ortho dễ bị oxi hóa ngoài không khí tạo quinone màu sẫm và tạo phức đặc trưng với FeCl₃.',
        'Nhóm -NH₂ amine bậc 1 thể hiện tính base yếu, tác dụng với HCl tạo muối dopamine hydrochloride tan tốt trong nước.',
        'Vòng thơm giàu electron nhờ 2 nhóm -OH hoạt hóa mạnh nên dễ tham gia phản ứng thế Bromine.'
      ],
      reactionsEn: [
        'Catechol -OH pair on the ring easily oxidizes in air to dark quinones and gives a colored complex with FeCl₃.',
        'The primary -NH₂ amine reacts readily with HCl to yield water-soluble dopamine hydrochloride salt.',
        'Electron-rich aromatic ring undergoes rapid electrophilic substitution with bromine.'
      ],
      note: 'Là một catecholamine (vòng catechol gắn đuôi ethylamine C₈H₁₁NO₂); tiền chất sinh tổng hợp nên adrenaline.',
      noteEn: 'A catecholamine combining a 1,2-dihydroxybenzene ring with an ethylamine chain (C₈H₁₁NO₂).'
    },
    {
      id: 'vitamin-c',
      catKey: 'pharma',
      elements: ['C','C','C','C','O','C','C','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,2],[2,3,1],[3,4,1],[4,0,1],[0,7,2],[1,8,1],[2,9,1],[3,5,1],[5,6,1],[5,10,1],[6,11,1]],
      name: 'Vitamin C (Ascorbic acid)',
      nameEn: 'Vitamin C (Ascorbic acid)',
      category: 'Vitamin / Lactone',
      categoryEn: 'Vitamin / Lactone',
      state: 'Rắn (tinh thể trắng vị chua thanh)',
      stateEn: 'Solid (white sour crystals)',
      solubility: 'Tan rất tốt trong nước (~33 g/100 mL)',
      solubilityEn: 'Highly soluble in water (~33 g/100 mL)',
      realLife: 'Vitamin thiết yếu có nhiều trong cam, chanh, ổi, giúp tổng hợp collagen và tăng cường miễn dịch; thực phẩm còn dùng làm chất chống oxi hóa tự nhiên giữ trái cây không bị thâm nâu.',
      realLifeEn: 'Essential vitamin abundant in citrus, guava, and bell peppers that drives collagen synthesis and serves as a natural food antioxidant.',
      reactions: [
        'Làm mất màu dung dịch I₂ hoặc KMnO₄ nhanh chóng nhờ tính khử mạnh của cụm enediol (-C(OH)=C(OH)-).',
        'Thể hiện tính acid rõ rệt dù không có nhóm -COOH: làm đỏ quỳ tím và sủi bọt khí CO₂ với NaHCO₃.',
        'Dễ bị phân hủy bởi nhiệt độ cao và ánh sáng khi đun nấu lâu hoặc để dung dịch tiếp xúc lâu với không khí.'
      ],
      reactionsEn: [
        'Rapidly decolorizes aqueous I₂ and KMnO₄ due to its strongly reducing enediol (-C(OH)=C(OH)-) motif.',
        'Displays clear acidity (turns litmus red and fizzes with NaHCO₃) even without a -COOH group.',
        'Degrades progressively under prolonged heating or oxygen exposure during cooking.'
      ],
      note: 'Dạng vòng lactone 5 cạnh (ester nội phân tử C₆H₈O₆); tên Ascorbic acid nghĩa là "chống bệnh scorbut" ở thủy thủ xưa.',
      noteEn: 'A 5-membered cyclic lactone (C₆H₈O₆); named "anti-scorbutic" for preventing scurvy in sailors.'
    },
    {
      id: 'vanillin',
      catKey: 'aldehyde',
      elements: [...C6_AROM, 'C', 'O', 'O', 'C', 'O'],
      bonds: [...BENZENE, [0,6,1], [6,7,2], [2,8,1], [8,9,1], [3,10,1]],
      name: 'Vanillin',
      nameEn: 'Vanillin',
      category: 'Aldehyde thơm',
      categoryEn: 'Aromatic aldehyde',
      state: 'Rắn (tinh thể kim trắng mùi vani ngọt dịu)',
      stateEn: 'Solid (white needles, signature vanilla aroma)',
      solubility: 'Ít tan trong nước lạnh, tan tốt trong Ethanol',
      solubilityEn: 'Slightly soluble in cold water; soluble in Ethanol',
      realLife: 'Thành phần tạo hương chủ đạo của quả vani tự nhiên trong kem, bánh ngọt và chocolate; phần lớn hương vani thực phẩm hiện đại được tổng hợp sạch từ lignin gỗ hoặc guaiacol.',
      realLifeEn: 'Primary flavor molecule giving vanilla pods their signature sweet aroma in ice cream, pastries, and chocolate.',
      reactions: [
        'Nhóm -CHO tham gia phản ứng tráng bạc với thuốc thử Tollens (AgNO₃/NH₃) tạo lớp bạc sáng.',
        'Nhóm -OH phenol tác dụng với dung dịch NaOH tạo muối phenolate tan tốt và cho màu đặc trưng với FeCl₃.',
        'Có thể bị khử bằng NaBH₄ hoặc H₂/Ni tạo vanillyl alcohol.'
      ],
      reactionsEn: [
        'Aldehyde -CHO group gives a positive silver-mirror test with Tollens reagent (AgNO₃/NH₃).',
        'Phenolic -OH dissolves in aqueous NaOH as a salt and complexes characteristically with FeCl₃.',
        'Undergoes aldehyde reduction with NaBH₄ or catalytic hydrogenation to vanillyl alcohol.'
      ],
      note: 'Phân tử đa chức gồm vòng benzene gắn đồng thời aldehyde (-CHO), ether (-OCH₃) và phenol (-OH) với công thức C₈H₈O₃.',
      noteEn: 'Multifunctional 4-hydroxy-3-methoxybenzaldehyde (C₈H₈O₃) bearing aldehyde, ether, and phenol groups.'
    },
    {
      id: 'menthol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','C','C','O','C','C','C','C'],
      bonds: [...C6_RING, [0,6,1], [1,7,1], [7,8,1], [7,9,1], [4,10,1]],
      name: 'Menthol',
      nameEn: 'Menthol',
      category: 'Alcohol mạch vòng (Terpenoid)',
      categoryEn: 'Cyclic alcohol (Terpenoid)',
      state: 'Rắn (tinh thể trong suốt mùi bạc hà mát lạnh)',
      stateEn: 'Solid (translucent cooling mint crystals)',
      solubility: 'Rất ít tan trong nước, tan tốt trong Ethanol và dầu thực vật',
      solubilityEn: 'Very slightly soluble in water; soluble in Ethanol and oils',
      realLife: 'Tinh thể bạc hà tự nhiên trong dầu gió, kẹo ngậm thông cổ, kem đánh răng và dầu gội; tạo cảm giác mát lạnh nhờ kích hoạt trực tiếp thụ thể cảm nhận nhiệt lạnh TRPM8 trên da và niêm mạc.',
      realLifeEn: 'Main constituent of peppermint oil in balms, lozenges, and toothpaste; triggers skin TRPM8 cold receptors without lowering actual temperature.',
      reactions: [
        'Tác dụng với kim loại Na giải phóng khí H₂ tạo muối alkoxide (nhờ nhóm -OH alcohol bậc 2).',
        'Oxi hóa nhẹ nhóm -OH alcohol bậc 2 tạo ketone vòng tương ứng là menthone.',
        'Tách nước khi đun với acid mạnh (như H₂SO₄ đặc) tạo hỗn hợp alkene vòng menthene.'
      ],
      reactionsEn: [
        'Secondary -OH group reacts with metallic Na to evolve H₂ gas and form the alkoxide.',
        'Mild oxidation converts the secondary alcohol smoothly into the cyclic ketone menthone.',
        'Acid-catalyzed dehydration yields cyclic alkenes known as menthenes.'
      ],
      note: 'Một monoterpenoid C₁₀H₂₀O dạng vòng cyclohexane gắn 3 nhóm thế ở vị trí 1, 2, 5; không phản ứng với NaOH như phenol.',
      noteEn: 'A saturated cyclic monoterpenoid (C₁₀H₂₀O) that behaves strictly as a secondary alcohol rather than an acidic phenol.'
    },
    {
      id: 'limonene',
      catKey: 'cycloalkene',
      elements: ['C','C','C','C','C','C','C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,0,1],[0,6,1],[3,7,1],[7,8,2],[7,9,1]],
      name: 'Limonene',
      nameEn: 'Limonene',
      category: 'Cycloalkene (Terpene)',
      categoryEn: 'Cycloalkene (Terpene)',
      state: 'Lỏng không màu (hương vỏ cam chanh tươi mát)',
      stateEn: 'Colorless liquid (fresh citrus-peel scent)',
      solubility: 'Không tan trong nước, tan tốt trong dung môi hữu cơ',
      solubilityEn: 'Insoluble in water; miscible with organic solvents',
      realLife: 'Chiếm hơn 90% tinh dầu trong vỏ cam, chanh, bưởi; được ứng dụng rộng rãi làm hương liệu thực phẩm và dung môi tẩy rửa sinh học thân thiện môi trường (làm sạch dầu mỡ, keo dán).',
      realLifeEn: 'Makes up over 90% of citrus peel essential oil; widely used in food flavoring and as a biodegradable green degreasing solvent.',
      reactions: [
        'Làm mất màu nhanh dung dịch nước Brom (Br₂) và dung dịch KMnO₄ ở điều kiện thường do có tới 2 liên kết đôi C=C.',
        'Cộng hợp với H₂ (xúc tác Ni, đun nóng) theo tỉ lệ mol 1:2 tạo thành hydrocarbon no p-menthane (C₁₀H₂₀).',
        'Cháy hoàn toàn tỏa nhiều nhiệt (tinh dầu vỏ cam bắt lửa mạnh khi vắt gần ngọn nến).'
      ],
      reactionsEn: [
        'Rapidly decolorizes bromine water and aqueous KMnO₄ via its two C=C double bonds.',
        'Hydrogenates completely with 2 equivalents of H₂ over Ni catalyst into saturated p-menthane (C₁₀H₂₀).',
        'Combusts vigorously as a volatile terpene hydrocarbon.'
      ],
      note: 'Thuộc nhóm terpene kinh điển C₁₀H₁₆ (gồm 2 đơn vị isoprene ghép lại); đối quang D-limonene có mùi cam còn L-limonene gợi mùi thông chanh.',
      noteEn: 'Classic monoterpene (C₁₀H₁₆, two isoprene units); its D-enantiomer smells of oranges while L-limonene has a piney lemon scent.'
    },
    {
      id: 'cubane',
      catKey: 'cycloalkane',
      elements: ['C','C','C','C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,0,1],[4,5,1],[5,6,1],[6,7,1],[7,4,1],[0,4,1],[1,5,1],[2,6,1],[3,7,1]],
      name: 'Cubane',
      nameEn: 'Cubane',
      category: 'Hydrocarbon đa vòng',
      categoryEn: 'Polycyclic hydrocarbon',
      state: 'Rắn (tinh thể trắng, nhiệt độ nóng chảy cao bất thường ~131 °C)',
      stateEn: 'Solid (white crystals, unusually high mp ~131 °C)',
      solubility: 'Không tan trong nước, tan trong dung môi hữu cơ không phân cực',
      solubilityEn: 'Insoluble in water; soluble in nonpolar organic solvents',
      realLife: 'Phân tử hydrocarbon nổi tiếng với hình khối lập phương hoàn hảo (8 đỉnh Carbon, góc liên kết bị ép còn 90°); nhờ mật độ năng lượng cực cao và khối lượng riêng lớn, các dẫn xuất của Cubane được nghiên cứu làm nhiên liệu tên lửa và khung phân tử trong thiết kế thuốc.',
      realLifeEn: 'Iconic Platonic-cube hydrocarbon (C₈H₈) with compressed 90° C–C–C bond angles; its derivatives are prized in high-energy propellants and rigid 3D medicinal scaffolds.',
      reactions: [
        'Bền động học đáng kinh ngạc ở nhiệt độ thường dù sức căng góc cực lớn (~165 kcal/mol), chỉ phân hủy/đồng phân hóa khi đun trên ~200 °C.',
        'Tham gia phản ứng thế gốc tự do (như thế Chlorine hoặc Bromine chiếu sáng) mà vẫn giữ nguyên khung khối lập phương.',
        'Cháy hoàn toàn trong Oxygen giải phóng nguồn năng lượng lớn hơn hẳn nhiều hydrocarbon cùng công thức.'
      ],
      reactionsEn: [
        'Surprisingly kinetically stable up to ~200 °C despite massive ~90° angle strain.',
        'Undergoes radical halogenation cleanly without rupturing its cubic carbon cage.',
        'Releases exceptionally high heat of combustion driven by internal ring strain.'
      ],
      note: 'Cùng công thức C₈H₈ với Styrene (C₆H₅-CH=CH₂) nhưng hoàn toàn chỉ chứa liên kết đơn (k = 5 với 5 mặt lập phương độc lập / cạnh vòng).',
      noteEn: 'Shares C₈H₈ with Styrene despite having zero double bonds (degrees of unsaturation = 5 from its polycyclic cage).'
    },
    {
      id: 'spiropentane',
      catKey: 'cycloalkane',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,0,1],[0,3,1],[3,4,1],[4,0,1]],
      name: 'Spiropentane',
      nameEn: 'Spiropentane',
      category: 'Cycloalkane (Spiro)',
      categoryEn: 'Cycloalkane (Spiro)',
      state: 'Lỏng dễ bay hơi (sôi ở 39 °C)',
      stateEn: 'Volatile colorless liquid (bp 39 °C)',
      solubility: 'Không tan trong nước, tan tốt trong dung môi hữu cơ',
      solubilityEn: 'Insoluble in water; soluble in organic solvents',
      realLife: 'Hợp chất xoắn spiro nhỏ nhất trong hóa học hữu cơ với 2 vòng tam giác chụm chung đúng một nguyên tử Carbon trung tâm tạo hình nơ bướm 3D vuông góc nhau; được dùng làm mô hình nghiên cứu liên kết hóa học có sức căng vòng lớn.',
      realLifeEn: 'The smallest spiro hydrocarbon in organic chemistry, fusing two orthogonal 3-membered rings at a single quaternary spiro carbon.',
      reactions: [
        'Tham gia phản ứng cộng mở vòng dễ dàng với Bromine (Br₂) và Hydro (H₂/Ni) nhờ sức căng lớn của vòng 3 cạnh.',
        'Đồng phân hóa khi đun nóng nhẹ trên chất xúc tác thành methylene cyclobutane rồi isoprene.',
        'Cháy hoàn toàn trong Oxygen tạo CO₂ và H₂O kèm tỏa nhiệt lượng cao.'
      ],
      reactionsEn: [
        'Undergoes ring-opening addition readily with Br₂ and H₂/Ni due to intense cyclopropane ring strain.',
        'Thermally isomerizes over catalysts into methylenecyclobutane.',
        'Burns cleanly in excess oxygen to CO₂ and water with elevated heat of combustion.'
      ],
      note: 'Cùng công thức C₅H₈ với Isoprene và Cyclopentene nhưng lại hoàn toàn no (không chứa nối đôi/ba nào), vì có 2 vòng 3 cạnh.',
      noteEn: 'Isomeric with Isoprene and Cyclopentene (C₅H₈), even though every C–C bond is a single bond across its two 3-membered rings.'
    },
    {
      id: 'adamantane',
      catKey: 'cycloalkane',
      elements: ['C','C','C','C','C','C','C','C','C','C'],
      bonds: [[0,4,1],[4,1,1],[0,5,1],[5,2,1],[0,6,1],[6,3,1],[1,7,1],[7,2,1],[1,8,1],[8,3,1],[2,9,1],[9,3,1]],
      name: 'Adamantane',
      nameEn: 'Adamantane',
      category: 'Hydrocarbon đa vòng (Diamondoid)',
      categoryEn: 'Polycyclic hydrocarbon (Diamondoid)',
      state: 'Rắn (tinh thể không màu mùi long não nhẹ, nóng chảy cao ~270 °C)',
      stateEn: 'Solid (colorless crystals, faint camphor scent, mp ~270 °C)',
      solubility: 'Không tan trong nước, tan trong dung môi hữu cơ không phân cực',
      solubilityEn: 'Insoluble in water; soluble in nonpolar organic solvents',
      realLife: 'Đơn vị cấu trúc lồng 10 Carbon nhỏ nhất của mạng tinh thể kim cương tự nhiên (tên bắt nguồn từ chữ Hy Lạp "adamas" nghĩa là kim cương); khung Adamantane giúp tăng độ bền chuyển hóa cho các thuốc kháng virus và điều trị Parkinson (như Amantadine, Memantine).',
      realLifeEn: 'Smallest 10-carbon diamond-lattice cage molecule; used as a bulky lipophilic core in antiviral and neurological drugs such as Amantadine and Memantine.',
      reactions: [
        'Cực kỳ bền nhiệt (nhiệt độ nóng chảy ~270 °C rất cao so với hydrocarbon 10C) do toàn bộ 4 vòng 6 cạnh đều ở cấu dạng ghế hoàn toàn không bị sức căng góc.',
        'Thế gốc tự do với Bromine ưu tiên chọn lọc gần như hoàn toàn vào vị trí 4 đỉnh Carbon bậc ba (đỉnh cầu).',
        'Có thể tổng hợp nhanh trong công nghiệp bằng phản ứng chuyển vị xúc tác AlCl₃ từ tetrahydrodicyclopentadiene.'
      ],
      reactionsEn: [
        'Thermodynamically ultra-stable and high-melting (~270 °C) because all four fused cyclohexane rings sit in strain-free chair conformations.',
        'Electrophilic or radical bromination attacks selectively at the four bridgehead tertiary carbons.',
        'Synthesized classically in one step via AlCl₃-catalyzed rearrangement to this thermodynamic diamondoid sink.'
      ],
      note: 'Thuộc họ diamondoid với công thức C₁₀H₁₆ (cùng công thức với Limonene); cả 10 nguyên tử Carbon xếp đúng như một mảnh mạng kim cương.',
      noteEn: 'Prototype diamondoid cage (C₁₀H₁₆); shares its formula with Limonene while locking all 10 carbons into a miniature diamond unit cell.'
    },

    // =========================================================================
    // 11. HETEROATOM, POLYFUNCTIONAL, HALOGEN & CURRICULUM GAP PACK (+28)
    // =========================================================================
    {
      id: 'methoxyamine',
      catKey: 'amine',
      elements: ['C','O','N'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Methoxyamine (O-Methylhydroxylamine)',
      nameEn: 'Methoxyamine (O-Methylhydroxylamine)',
      category: 'Alkoxyamine / Hydroxylamine',
      categoryEn: 'Alkoxyamine / Hydroxylamine',
      state: 'Lỏng không màu (dễ bay hơi, mùi ammonia nhẹ)',
      stateEn: 'Colorless volatile liquid (faint ammoniacal odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Thuốc thử hóa sinh chuyên dụng dùng để gắn nhãn và biến tính có chọn lọc gốc Aldehyde hoặc Ketone thành dẫn xuất Oxime bền vững trong phân tích carbohydrate và tổng hợp dược phẩm.',
      realLifeEn: 'Specialized biochemical reagent used to trap aldehydes and ketones selectively as stable O-methyl oximes in carbohydrate analysis and drug synthesis.',
      reactions: [
        'Tác dụng với acid HCl tạo muối tinh thể Methoxyammonium chloride (CH₃ONH₃Cl) tan tốt trong nước.',
        'Ngưng tụ nhanh với Aldehyde và Ketone tạo dẫn xuất O-methyl oxime (R₂C=N–OCH₃).',
        'Có tính base yếu hơn Methylamine rõ rệt do nguyên tử Oxygen kế bên hút electron mạnh.'
      ],
      reactionsEn: [
        'Reacts with HCl to form water-soluble crystalline Methoxyammonium chloride salt.',
        'Condenses rapidly with aldehydes and ketones to yield stable O-methyl oximes.',
        'Markedly weaker base than Methylamine owing to the inductive pull of the adjacent Oxygen atom.'
      ],
      note: 'Công thức CH₅NO (cầu dị tố C–O–N); đồng phân cấu tạo với Aminomethanol và N-Methylhydroxylamine.',
      noteEn: 'Formula CH₅NO with a C–O–N linkage; constitutional isomer of Aminomethanol and N-Methylhydroxylamine.'
    },
    {
      id: 'aminomethanol',
      catKey: 'alcohol',
      elements: ['O','C','N'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Aminomethanol',
      nameEn: 'Aminomethanol',
      category: 'Amino alcohol (Tạp chức)',
      categoryEn: 'Amino alcohol',
      state: 'Chất trung gian không bền trong dung dịch nước',
      stateEn: 'Transient intermediate in aqueous solution',
      solubility: 'Tan tốt trong nước (cân bằng hóa học)',
      solubilityEn: 'Water-soluble equilibrium species',
      realLife: 'Hợp chất trung gian cực kỳ quan trọng sinh ra tức thì khi Formaldehyde (HCHO) phản ứng với Ammonia (NH₃), mở đầu chuỗi phản ứng hình thành chất sát khuẩn tiết niệu Methenamine (Urotropin) và nhựa amino.',
      realLifeEn: 'Crucial short-lived hemiaminal intermediate formed when Formaldehyde meets Ammonia en route to Methenamine (Urotropin) and amino resins.',
      reactions: [
        'Tồn tại ở cân bằng động khi trộn Formaldehyde và Ammonia: HCHO + NH₃ ⇌ HO–CH₂–NH₂.',
        'Dễ tách phân tử H₂O để chuyển thành imine CH₂=NH rồi tam hợp thành vòng bền hoặc tạo Urotropin.',
        'Mang đồng thời nhóm -OH (alcohol) và nhóm -NH₂ (amine) gắn trên cùng một nguyên tử Carbon.'
      ],
      reactionsEn: [
        'Forms reversibly in aqueous solution from Formaldehyde and Ammonia.',
        'Readily dehydrates to methanimine (CH₂=NH) or condenses onward into hexamethylenetetramine.',
        'Hemiaminal bearing both -OH and -NH₂ on the same CH₂ carbon.'
      ],
      note: 'Là hemiaminal đơn giản nhất (CH₅NO), thường kém bền nên nhanh chóng tách nước trong thực tế.',
      noteEn: 'Simplest hemiaminal (CH₅NO); isomeric with Methoxyamine and N-Methylhydroxylamine.'
    },
    {
      id: 'n-methylhydroxylamine',
      catKey: 'amine',
      elements: ['C','N','O'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'N-Methylhydroxylamine',
      nameEn: 'N-Methylhydroxylamine',
      category: 'Hydroxylamine',
      categoryEn: 'Hydroxylamine',
      state: 'Rắn tinh thể không màu (nóng chảy ở 42 °C, hút ẩm)',
      stateEn: 'Colorless hygroscopic crystals (mp 42 °C)',
      solubility: 'Tan rất tốt trong nước và Ethanol',
      solubilityEn: 'Very soluble in water and Ethanol',
      realLife: 'Chất khử chọn lọc và tác nhân tổng hợp nhóm nitrone trong hóa dược để chế tạo các phân tử có hoạt tính sinh học và chất bẫy gốc tự do bảo vệ tế bào.',
      realLifeEn: 'Selective reducing reagent and nitrone-forming building block in medicinal chemistry and free-radical spin-trapping studies.',
      reactions: [
        'Tác dụng với acid vô cơ (như HCl) tạo muối N-methylhydroxylammonium tan trong nước.',
        'Ngưng tụ với Aldehyde tạo dẫn xuất Nitrone có khả năng cộng đóng vòng 1,3-lưỡng cực.',
        'Thể hiện tính khử khá mạnh nhờ liên kết đơn N–O giàu electron.'
      ],
      reactionsEn: [
        'Forms crystalline N-methylhydroxylammonium chloride salts upon treatment with HCl.',
        'Condenses cleanly with aldehydes to generate reactive nitrones.',
        'Acts as a mild reducing agent owing to its electron-rich N–OH moiety.'
      ],
      note: 'Là một trong ba đồng phân mạch hở chính của CH₅NO (khung C–N–O, khác với C–O–N của Methoxyamine).',
      noteEn: 'One of three key CH₅NO constitutional isomers, featuring a C–N–O backbone instead of C–O–N.'
    },
    {
      id: 'ethanolamine',
      catKey: 'amine',
      elements: ['O','C','C','N'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: 'Ethanolamine (MEA)',
      nameEn: 'Ethanolamine (MEA)',
      category: 'Amino alcohol (Tạp chức)',
      categoryEn: 'Amino alcohol',
      state: 'Lỏng sánh không màu (mùi ammonia nhẹ, hút ẩm)',
      stateEn: 'Colorless viscous hygroscopic liquid (mild ammonia odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi công nghiệp chủ lực để hấp thụ và làm sạch khí chua CO₂, H₂S trong khí thiên nhiên và khói thải nhà máy; đồng thời là thành phần đầu cực của phospholipid cấu tạo màng tế bào sống và chất nhũ hóa dầu gội.',
      realLifeEn: 'Workhorse industrial amine scrubber capturing acidic CO₂ and H₂S from natural gas and power-plant flue streams, and biological headgroup of membrane phospholipids.',
      reactions: [
        'Dung dịch có tính base rõ (làm xanh giấy quỳ tím) và hấp thụ thuận nghịch khí CO₂ tạo muối carbamate khi lạnh, nhả lại CO₂ tinh khiết khi đun nóng.',
        'Nhóm -OH phản ứng với acid béo hoặc kim loại Na giải phóng khí H₂.',
        'Sản xuất công nghiệp bằng phản ứng mở vòng Ethylene oxide (Oxirane) với Ammonia (NH₃).'
      ],
      reactionsEn: [
        'Aqueous solutions turn litmus blue and reversibly scrub CO₂ gas at ambient temperature, releasing pure CO₂ upon heating.',
        'Free -OH group reacts with Na metal to evolve H₂ and forms amides/esters with fatty acids.',
        'Manufactured by reacting Ethylene oxide cleanly with aqueous Ammonia.'
      ],
      note: 'Tên chuẩn IUPAC: 2-aminoethan-1-ol (C₂H₇NO); đại diện tiêu biểu cho nhóm hợp chất tạp chức bền vững vừa là Alcohol vừa là Amine.',
      noteEn: 'IUPAC name: 2-aminoethan-1-ol (C₂H₇NO); benchmark bifunctional amino alcohol.'
    },
    {
      id: 'methanediol',
      catKey: 'alcohol',
      elements: ['O','C','O'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Methanediol (Formaldehyde hydrate)',
      nameEn: 'Methanediol (Formaldehyde hydrate)',
      category: 'Polyalcohol (Gem-diol)',
      categoryEn: 'Polyalcohol (Gem-diol)',
      state: 'Tồn tại chủ yếu trong dung dịch nước (Formalin)',
      stateEn: 'Exists primarily in aqueous solution (Formalin)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water (equilibrium form)',
      realLife: 'Thực chất chính là dạng tồn tại chiếm tới >99,9% của khí Formaldehyde khi hòa tan vào nước tạo dung dịch Formalin ngâm mẫu vật sinh học và sản xuất keo nhựa gỗ.',
      realLifeEn: 'Accounts for >99.9% of dissolved Formaldehyde in commercial aqueous Formalin used for specimen preservation and resin manufacturing.',
      reactions: [
        'Hình thành từ phản ứng cộng nước thuận nghịch vào liên kết đôi C=O của Methanal: HCHO + H₂O ⇌ HO–CH₂–OH.',
        'Khi cô đặc hoặc đun nóng dễ tách nước trả lại khí Formaldehyde và tạo oligomer Paraformaldehyde.',
        'Trong dung dịch nước vẫn tham gia phản ứng tráng bạc với AgNO₃/NH₃ do cân bằng chuyển hóa về HCHO.'
      ],
      reactionsEn: [
        'Formed via rapid hydration of Formaldehyde: HCHO + H₂O ⇌ CH₂(OH)₂.',
        'Condenses upon concentration into solid polymeric Paraformaldehyde.',
        'Equilibrates readily back to HCHO in alkaline Tollens reagent to deposit a silver mirror.'
      ],
      note: 'Công thức CH₄O₂; ngoại lệ hiếm hoi mà gem-diol (hai nhóm -OH gắn cùng một C) lại bền hơn dạng aldehyde tự do trong nước.',
      noteEn: 'Formula CH₄O₂; notable exception where a geminal diol is favored overwhelmingly over its parent carbonyl in water.'
    },
    {
      id: 'methyl-hydroperoxide',
      catKey: 'custom',
      elements: ['C','O','O'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Methyl hydroperoxide',
      nameEn: 'Methyl hydroperoxide',
      category: 'Peroxide hữu cơ',
      categoryEn: 'Organic peroxide',
      state: 'Lỏng không màu (dễ bay hơi, kém bền nhiệt)',
      stateEn: 'Colorless volatile liquid (thermally shock-sensitive)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water',
      realLife: 'Hợp chất oxi hóa trung gian xuất hiện tự nhiên trong khí quyển khi Methane bị oxi hóa quang hóa dưới ánh nắng mặt trời, góp phần điều hòa khả năng tự làm sạch của tầng đối lưu.',
      realLifeEn: 'Key atmospheric hydroperoxide intermediate generated during sunlight-driven Methane oxidation in the troposphere.',
      reactions: [
        'Chứa liên kết cầu –O–O– kém bền nên dễ phân hủy khi đun nóng hoặc va đập mạnh tỏa nhiều nhiệt.',
        'Thể hiện tính oxi hóa mạnh tương tự Hydrogen peroxide (H₂O₂), oxi hóa ion I⁻ thành I₂ trong môi trường acid.',
        'Phản ứng với kiềm mạnh tạo muối peroxide tương ứng.'
      ],
      reactionsEn: [
        'Weak O–O peroxide bond cleaves homolytically upon warming or mechanical shock.',
        'Acts as a strong oxidizer analogous to H₂O₂, oxidizing aqueous iodide to I₂.',
        'Deprotonates gently in strong aqueous alkali.'
      ],
      note: 'Công thức CH₄O₂; đồng phân chứa cầu –O–O– của Methanediol (HO–CH₂–OH).',
      noteEn: 'Formula CH₄O₂; peroxide isomer of Methanediol featuring a C–O–O linkage.'
    },
    {
      id: 'methyl-carbamate',
      catKey: 'ester',
      elements: ['C','O','C','O','N'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1]],
      name: 'Methyl carbamate',
      nameEn: 'Methyl carbamate',
      category: 'Carbamate',
      categoryEn: 'Carbamate',
      state: 'Rắn (tinh thể trắng, nóng chảy ở 54 °C)',
      stateEn: 'Solid (white crystals, mp 54 °C)',
      solubility: 'Tan rất tốt trong nước và Ethanol',
      solubilityEn: 'Very soluble in water and Ethanol',
      realLife: 'Đơn vị cấu trúc nền tảng của họ thuốc bảo vệ thực vật nhóm carbamate tác dụng nhanh và là hợp chất mẫu đại diện cho liên kết urethane (–O–CO–NH–) tạo nên nệm mút xốp Polyurethane.',
      realLifeEn: 'Simplest alkyl carbamate modeling the urethane linkage (–O–CO–NH–) used in Polyurethane foams and fast-acting agricultural carbamate insecticides.',
      reactions: [
        'Thủy phân khi đun nóng với dung dịch NaOH tạo Methanol, muối Carbonate (Na₂CO₃) và giải phóng khí NH₃.',
        'Phản ứng với Formaldehyde tạo chất hoàn tất giúp vải sợi chống nhăn trong ngành dệt may.',
        'Là phân tử trung tính, không làm đổi màu giấy quỳ tím dù mang nhóm -NH₂ do gắn sát nhóm >C=O.'
      ],
      reactionsEn: [
        'Hot alkaline hydrolysis breaks both ester and amide bonds to yield Methanol, Na₂CO₃, and NH₃ gas.',
        'Condenses with Formaldehyde into textile wrinkle-resistant finishing agents.',
        'Essentially neutral to litmus because the carbonyl group withdraws electron density from Nitrogen.'
      ],
      note: 'Công thức C₂H₅NO₂ (cùng công thức phân tử với Glycine nhưng là Carbamate không có tính lưỡng tính).',
      noteEn: 'Shares C₂H₅NO₂ with Glycine, yet behaves as a neutral carbamate rather than an amphoteric amino acid.'
    },
    {
      id: 'bromomethane',
      catKey: 'halogen',
      elements: ['C','Br'],
      bonds: [[0,1,1]],
      name: 'Bromomethane (Methyl bromide)',
      nameEn: 'Bromomethane (Methyl bromide)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Khí không màu (sôi ở 3,6 °C, nặng hơn không khí)',
      stateEn: 'Colorless gas (bp 3.6 °C)',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Từng được dùng rộng rãi để xông hơi khử trùng đất trồng và kho chứa ngũ cốc xuất khẩu diệt sâu mọt, nhưng hiện bị hạn chế nghiêm trọng theo Nghị định thư Montreal do nguy cơ phá hủy tầng ozone.',
      realLifeEn: 'Formerly a major agricultural soil and grain-storage fumigant, now heavily restricted under the Montreal Protocol for ozone depletion.',
      reactions: [
        'Thủy phân dễ dàng khi đun nóng với dung dịch NaOH loãng tạo Methanol và muối NaBr.',
        'Dung dịch sau thủy phân được acid hóa bằng HNO₃ rồi nhỏ AgNO₃ lập tức tạo kết tủa VÀNG NHẠT AgBr↓.',
        'Là tác nhân methyl hóa rất nhạy nhờ nhóm -Br tách loại tốt hơn nhóm -Cl.'
      ],
      reactionsEn: [
        'Hydrolyzes briskly in warm aqueous NaOH to give Methanol and NaBr.',
        'Acidifying the hydrolysate with HNO₃ and adding AgNO₃ yields a pale yellow AgBr precipitate.',
        'Highly effective methylating reagent because Bromide is a superior leaving group.'
      ],
      note: 'Công thức CH₃Br; dễ thủy phân trong nước kiềm hơn Chloromethane.',
      noteEn: 'Formula CH₃Br; reacts faster in nucleophilic substitution than Chloromethane.'
    },
    {
      id: 'bromoethane',
      catKey: 'halogen',
      elements: ['C','C','Br'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Bromoethane (Ethyl bromide)',
      nameEn: 'Bromoethane (Ethyl bromide)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (dễ bay hơi, sôi ở 38,4 °C, nặng hơn nước)',
      stateEn: 'Colorless volatile dense liquid (bp 38.4 °C, 1.46 g/mL)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Slightly soluble in water (bottom layer)',
      realLife: 'Thí nghiệm mẫu chuẩn trong sách giáo khoa Hóa học 11 (GDPT 2018) để minh họa sự khác biệt giữa phản ứng thế (tạo Ethanol) và phản ứng tách (tạo Ethylene), đồng thời là tác nhân gắn nhóm ethyl trong tổng hợp thuốc.',
      realLifeEn: 'Core textbook halogen derivative in GDPT 2018 Chemistry 11 contrasting aqueous substitution (Ethanol) vs. alcoholic elimination (Ethylene), and classic ethylating reagent.',
      reactions: [
        'Đun nóng với dung dịch NaOH/H₂O thực hiện phản ứng THẾ tạo Ethanol và muối NaBr.',
        'Đun nóng với KOH trong Ethanol (C₂H₅OH) thực hiện phản ứng TÁCH HBr tạo khí Ethylene (làm mất màu nước Br₂).',
        'Sản phẩm sau thủy phân kiềm khi acid hóa bằng HNO₃ tạo kết tủa vàng nhạt AgBr với dung dịch AgNO₃.'
      ],
      reactionsEn: [
        'Warming with aqueous NaOH favors nucleophilic substitution to Ethanol and NaBr.',
        'Heating with alcoholic KOH (KOH/EtOH) drives elimination of HBr to yield Ethylene gas.',
        'Released Br⁻ ion gives a pale yellow AgBr precipitate with AgNO₃ after HNO₃ acidification.'
      ],
      note: 'Thay cho Ethyl chloride dạng khí khó thao tác, Bromoethane là chất lỏng sôi 38 °C nên rất dễ dùng làm thí nghiệm thực hành trên lớp.',
      noteEn: 'Liquid at room temperature (unlike gaseous Ethyl chloride), making it ideal for classroom hydrolysis/elimination labs.'
    },
    {
      id: '1,2-dichloroethane',
      catKey: 'halogen',
      elements: ['C','C','Cl','Cl'],
      bonds: [[0,1,1],[0,2,1],[1,3,1]],
      name: '1,2-Dichloroethane',
      nameEn: '1,2-Dichloroethane',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (mùi ngọt giống Chloroform, D = 1,25 g/cm³)',
      stateEn: 'Colorless dense liquid (1.25 g/cm³, sweet odor)',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Hóa chất trung gian có sản lượng hàng chục triệu tấn mỗi năm trên thế giới dùng để nhiệt phân tách HCl sản xuất Vinyl chloride (monomer tạo nhựa ống nước PVC).',
      realLifeEn: 'Multi-million-ton industrial intermediate thermally cracked into Vinyl chloride monomer for PVC pipes and siding.',
      reactions: [
        'Nhiệt phân ở ~500 °C tách 1 phân tử HCl tạo Vinyl chloride (CH₂=CHCl) — quy trình sản xuất PVC hiện đại.',
        'Điều chế bằng phản ứng cộng khí Cl₂ vào Ethylene hoặc oxi hóa-chlorine hóa Ethylene.',
        'Đun nóng với dung dịch NaOH loãng thủy phân tạo Ethylene glycol.'
      ],
      reactionsEn: [
        'Thermal cracking at ~500 °C eliminates HCl to manufacture Vinyl chloride monomer.',
        'Produced on vast scale by adding Cl₂ across Ethylene.',
        'Hydrolyzes in warm aqueous NaOH to form Ethylene glycol.'
      ],
      note: 'Công thức C₂H₄Cl₂; cùng nhóm cộng hợp 1,2 với 1,2-Dibromoethane.',
      noteEn: 'Formula C₂H₄Cl₂; chloro analog of 1,2-Dibromoethane and key gateway to PVC plastics.'
    },
    {
      id: '2-bromopropane',
      catKey: 'halogen',
      elements: ['C','C','C','Br'],
      bonds: [[0,1,1],[1,2,1],[1,3,1]],
      name: '2-Bromopropane (Isopropyl bromide)',
      nameEn: '2-Bromopropane (Isopropyl bromide)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (sôi ở 59,4 °C, nặng hơn nước)',
      stateEn: 'Colorless dense liquid (bp 59.4 °C)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Sản phẩm chính của hai phản ứng chuẩn chương trình phổ thông: thế Br₂ vào Propane có chiếu sáng và cộng HBr vào Propene theo quy tắc Markovnikov; dùng gắn nhóm isopropyl trong tổng hợp dược phẩm.',
      realLifeEn: 'Signature major product of both Propane photochemical bromination and Markovnikov HBr addition to Propene, used in pharmaceutical isopropyl synthesis.',
      reactions: [
        'Đun nóng với dung dịch NaOH tạo alcohol bậc hai Propan-2-ol và NaBr.',
        'Đun nóng với KOH trong Ethanol tách HBr tạo khí Propene.',
        'Tác dụng với Mg trong Ether khan tạo thuốc thử Grignard isopropylmagnesium bromide.'
      ],
      reactionsEn: [
        'Hydrolyzes with warm aqueous NaOH into secondary alcohol Propan-2-ol.',
        'Dehydrobrominates cleanly with hot alcoholic KOH to Propene.',
        'Forms isopropylmagnesium bromide Grignard reagent with Magnesium turnings.'
      ],
      note: 'Công thức C₃H₇Br; minh họa trực tiếp quy tắc ưu tiên Carbon bậc cao khi thế alkane hoặc cộng Markovnikov.',
      noteEn: 'Formula C₃H₇Br; textbook product demonstrating secondary carbon selectivity.'
    },
    {
      id: 'benzyl-chloride',
      catKey: 'halogen',
      elements: [...C6_AROM,'C','Cl'],
      bonds: [...BENZENE, [0,6,1],[6,7,1]],
      name: 'Benzyl chloride',
      nameEn: 'Benzyl chloride',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (mùi hăng cay chảy nước mắt)',
      stateEn: 'Colorless pungent liquid (lacrimator)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Nguyên liệu tổng hợp chất sát khuẩn bậc bốn (Benzalkonium chloride trong nước rửa tay, nước súc miệng), hương liệu Benzyl acetate mùi hoa nhài và chất hóa dẻo nhựa.',
      realLifeEn: 'Feedstock for Benzalkonium chloride antiseptics in sanitizers and disinfectants, jasmine-scented Benzyl esters, and specialty plasticizers.',
      reactions: [
        'Thủy phân CỰC NHANH trong dung dịch kiềm hoặc nước ấm tạo Benzyl alcohol và kết tủa trắng AgCl ngay khi thử AgNO₃ (khác hẳn Chlorobenzene trơ hoàn toàn!).',
        'Điều chế bằng phản ứng thế Cl₂ vào nhánh -CH₃ của Toluene khi chiếu sáng hoặc đun nóng.',
        'Không làm mất màu nước Br₂ ở điều kiện thường.'
      ],
      reactionsEn: [
        'Hydrolyzes rapidly in warm aqueous alkali to Benzyl alcohol and precipitates white AgCl immediately with AgNO₃ (unlike wholly inert Chlorobenzene!).',
        'Prepared via free-radical chlorination of Toluene side chain under light.',
        'Unreactive toward cold aqueous bromine water.'
      ],
      note: 'Cặp so sánh kinh điển: Chlorobenzene (Cl gắn thẳng vòng thơm nên rất bền) vs. Benzyl chloride (Cl gắn nhánh -CH₂- nên thủy phân cực dễ).',
      noteEn: 'Classic contrast with Chlorobenzene: benzylic C(sp³)–Cl undergoes rapid substitution while aryl C(sp²)–Cl resists boiling NaOH.'
    },
    {
      id: '2,4,6-tribromophenol',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','Br','Br','Br'],
      bonds: [...BENZENE, [0,6,1],[1,7,1],[3,8,1],[5,9,1]],
      name: '2,4,6-Tribromophenol',
      nameEn: '2,4,6-Tribromophenol',
      category: 'Phenol',
      categoryEn: 'Phenol',
      state: 'Rắn (kết tủa trắng hoặc tinh thể hình kim mùi hắc)',
      stateEn: 'Solid (white precipitate / pungent crystals)',
      solubility: 'Hầu như không tan trong nước',
      solubilityEn: 'Practically insoluble in water',
      realLife: 'Chính là lớp KẾT TỦA TRẮNG quen thuộc xuất hiện tức thì trong ống nghiệm khi nhỏ nước Br₂ vào dung dịch Phenol để nhận biết Phenol; trong công nghiệp còn dùng làm chất chống cháy cho nhựa điện tử và bảo quản gỗ.',
      realLifeEn: 'The unmistakable WHITE precipitate formed instantaneously when bromine water meets Phenol in lab tests; industrially used as a flame retardant and wood preservative.',
      reactions: [
        'Tạo thành định lượng khi cho Phenol tác dụng với dung dịch Br₂ dư ở điều kiện thường.',
        'Có tính acid mạnh hơn Phenol tự do nhờ 3 nguyên tử Bromine hút electron, nên tan dễ dàng trong dung dịch NaOH và NaHCO₃.',
        'Không làm mất màu thêm dung dịch Br₂ do các vị trí ortho, para đã thế kín.'
      ],
      reactionsEn: [
        'Precipitates quantitatively at room temperature when Phenol reacts with excess bromine water.',
        'Significantly more acidic than Phenol owing to three electron-withdrawing Bromine atoms; dissolves in NaOH and even NaHCO₃.',
        'All ortho and para ring sites are saturated against further room-temperature bromination.'
      ],
      note: 'Công thức C₆H₃Br₃O (M = 330,8); thí nghiệm nhận biết Phenol kinh điển trong Hóa học 11.',
      noteEn: 'Formula C₆H₃Br₃O (M = 330.8 g/mol); diagnostic white precipitate identifying Phenol.'
    },
    {
      id: 'methyl-acrylate',
      catKey: 'ester',
      elements: ['C','C','C','O','O','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[2,4,1],[4,5,1]],
      name: 'Methyl acrylate',
      nameEn: 'Methyl acrylate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi hắc nồng, dễ bay hơi)',
      stateEn: 'Colorless volatile liquid (acrid odor)',
      solubility: 'Ít tan trong nước (~6 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~6 g/100 mL)',
      realLife: 'Monomer thiết yếu đồng trùng hợp với Acrylonitrile để dệt sợi vải acrylic giả len mềm ấm và sản xuất màng sơn phủ bảo vệ bề mặt kim loại, gỗ, vải da.',
      realLifeEn: 'Key monomer copolymerized with Acrylonitrile into warm wool-like acrylic fibers and durable flexible surface coatings.',
      reactions: [
        'Làm mất màu nhanh nước Br₂ và dung dịch KMnO₄ ở nhiệt độ thường nhờ liên kết đôi C=C.',
        'Thủy phân khi đun nóng với dung dịch NaOH tạo muối Sodium acrylate và Methanol.',
        'Trùng hợp (xt, t°, p) tạo polymer Poly(methyl acrylate) đàn hồi.'
      ],
      reactionsEn: [
        'Rapidly decolorizes bromine water and cold KMnO₄ across its vinyl double bond.',
        'Hot alkaline saponification yields Sodium acrylate and Methanol.',
        'Undergoes free-radical vinyl polymerization into flexible polyacrylate resins.'
      ],
      note: 'Công thức C₄H₆O₂; cùng công thức phân tử với Vinyl acetate (CH₃COOCH=CH₂), thường được hỏi phân biệt sản phẩm thủy phân kiềm!',
      noteEn: 'Shares C₄H₆O₂ with Vinyl acetate, but saponifies to Methanol rather than Acetaldehyde.'
    },
    {
      id: 'phenyl-acetate',
      catKey: 'ester',
      elements: [...C6_AROM,'O','C','O','C'],
      bonds: [...BENZENE, [0,6,1],[6,7,1],[7,8,2],[7,9,1]],
      name: 'Phenyl acetate',
      nameEn: 'Phenyl acetate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm nhẹ đặc trưng)',
      stateEn: 'Colorless oily liquid',
      solubility: 'Hầu như không tan trong nước',
      solubilityEn: 'Practically insoluble in water',
      realLife: 'Hợp chất mẫu tiêu biểu cho nhóm ester của Phenol trong chương trình Hóa học 12; dùng làm dung môi đặc biệt và tiền chất tổng hợp các hợp chất trung gian chứa nhân thơm.',
      realLifeEn: 'Benchmark phenolic ester illustrating the 1:2 NaOH saponification ratio in organic chemistry, used as a specialty synthesis intermediate.',
      reactions: [
        'Xà phòng hóa trong dung dịch NaOH dư theo tỉ lệ mol 1 : 2 (tạo HAI muối là Sodium acetate và Sodium phenolate cùng 1 H₂O — KHÔNG tạo alcohol)!',
        'Không điều chế trực tiếp bằng Acetic acid + Phenol mà phải dùng Acetic anhydride + Phenol.',
        'Không tác dụng với kim loại Na và không làm đổi màu giấy quỳ tím.'
      ],
      reactionsEn: [
        'Consumes TWO equivalents of NaOH upon hydrolysis, yielding TWO salts (Sodium acetate + Sodium phenolate) and water with NO alcohol!',
        'Prepared from Phenol and Acetic anhydride rather than direct esterification with Acetic acid.',
        'Unreactive toward metallic Na and neutral to litmus.'
      ],
      note: 'Công thức C₈H₈O₂; câu hỏi "ester phản ứng với NaOH tỉ lệ 1 : 2 tạo hai muối" kinh điển bậc nhất kỳ thi THPT!',
      noteEn: 'Formula C₈H₈O₂; classic exam ester consuming 2 mol NaOH per mole to produce two sodium salts.'
    },
    {
      id: 'methyl-salicylate',
      catKey: 'ester',
      elements: [...C6_AROM,'C','O','O','C','O'],
      bonds: [...BENZENE, [0,6,1],[6,7,2],[6,8,1],[8,9,1],[1,10,1]],
      name: 'Methyl salicylate (Dầu nóng)',
      nameEn: 'Methyl salicylate (Oil of wintergreen)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu hoặc vàng nhạt (mùi dầu gió xanh đặc trưng)',
      stateEn: 'Colorless/pale-yellow liquid (wintergreen aroma)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Thành phần tạo mùi nóng ấm quen thuộc trong cao dán giảm đau cơ khớp (Salonpas), dầu gió xoa bóp và một lượng rất nhỏ tạo hương bạc hà thơm mát trong kẹo cao su, nước súc miệng.',
      realLifeEn: 'Characteristic cooling-warm active ingredient in topical muscle pain patches and balms, and natural wintergreen flavoring in mints and mouthwash.',
      reactions: [
        'Tác dụng với dung dịch NaOH dư đun nóng theo tỉ lệ mol 1 : 2 (1 mol phản ứng nhóm -OH phenol, 1 mol xà phòng hóa chức ester -COOCH₃) tạo Disodium salicylate và Methanol.',
        'Tạo màu TÍM ĐẶC TRƯNG với dung dịch FeCl₃ do vẫn còn nguyên nhóm -OH phenol tự do.',
        'Điều chế bằng phản ứng ester hóa Salicylic acid với Methanol dư (xúc tác H₂SO₄ đặc, đun nóng).'
      ],
      reactionsEn: [
        'Consumes 2 moles of NaOH upon hot saponification (neutralizing the phenolic -OH and hydrolyzing the methyl ester) to give Disodium salicylate and Methanol.',
        'Turns intense VIOLET with aqueous FeCl₃ owing to its intact phenolic -OH group.',
        'Synthesized by Fischer esterification of Salicylic acid with Methanol over conc. H₂SO₄.'
      ],
      note: 'Công thức C₈H₈O₃; phân tử tạp chức chứa đồng thời vòng thơm, ester và -OH phenol (rất hay xuất hiện trong đề Hóa 12 GDPT 2018).',
      noteEn: 'Formula C₈H₈O₃; bifunctional ester-phenol consuming 2 NaOH per mole and giving a positive FeCl₃ test.'
    },
    {
      id: 'ethyl-butyrate',
      catKey: 'ester',
      elements: ['C','C','C','C','O','O','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,2],[3,5,1],[5,6,1],[6,7,1]],
      name: 'Ethyl butyrate (Hương dứa)',
      nameEn: 'Ethyl butyrate (Pineapple ester)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi quả dứa chín thơm ngọt)',
      stateEn: 'Colorless liquid (sweet ripe-pineapple aroma)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Ester tạo hương liệu thực phẩm nổi tiếng mang mùi thơm ngọt ngào của quả dứa (thơm) chín và cam tươi dùng trong nước ép đóng hộp, kẹo dẻo, kem trái cây và siro.',
      realLifeEn: 'Signature food-flavoring ester delivering fresh pineapple aroma naturally present in pineapples, oranges, and fruit candies.',
      reactions: [
        'Xà phòng hóa trong dung dịch NaOH đun nóng tạo muối Sodium butyrate và Ethanol.',
        'Điều chế từ Butyric acid (mùi bơ ôi khó chịu) và Ethanol với xúc tác H₂SO₄ đặc đun nóng.',
        'Không làm mất màu nước Br₂ và không phản ứng với kim loại Na.'
      ],
      reactionsEn: [
        'Saponifies with hot aqueous NaOH cleanly into Sodium butyrate and Ethanol.',
        'Prepared via Fischer esterification of foul-smelling Butyric acid and Ethanol over conc. H₂SO₄.',
        'Inert toward metallic Na and cold bromine water.'
      ],
      note: 'Công thức C₆H₁₂O₂; cặp hương ester quen thuộc trong SGK: Ethyl butyrate (mùi dứa), Isoamyl acetate (mùi chuối).',
      noteEn: 'Formula C₆H₁₂O₂; textbook pineapple-scented ester alongside banana-scented Isoamyl acetate.'
    },
    {
      id: 'methyl-ethyl-ether',
      catKey: 'ether',
      elements: ['C','O','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: 'Ethyl methyl ether (Methoxyethane)',
      nameEn: 'Ethyl methyl ether (Methoxyethane)',
      category: 'Ether',
      categoryEn: 'Ether',
      state: 'Khí không màu (sôi ở 7,4 °C, mùi Ether nhẹ)',
      stateEn: 'Colorless gas (bp 7.4 °C, ethereal odor)',
      solubility: 'Tan khá trong nước',
      solubilityEn: 'Moderately soluble in water',
      realLife: 'Ether bất đối xứng đơn giản nhất, dễ bay hơi và bắt cháy mạnh; thường được dùng làm mô hình học thuật minh họa danh pháp thay thế (Methoxyethane) và phân biệt đồng phân C₃H₈O.',
      realLifeEn: 'Simplest unsymmetrical dialkyl ether, widely used in curricula to teach alkoxyalkane nomenclature (Methoxyethane) and C₃H₈O isomerism.',
      reactions: [
        'Không tác dụng với kim loại Na (giúp phân biệt ngay với hai đồng phân Alcohol cùng công thức là Propan-1-ol và Propan-2-ol).',
        'Đun nóng với dung dịch HI đặc phân cắt thành hỗn hợp Iodomethane (CH₃I) và Ethanol hoặc Iodoethane.',
        'Bền vững với dung dịch kiềm NaOH và nước Br₂ ở điều kiện thường.'
      ],
      reactionsEn: [
        'Completely unreactive with metallic Na, cleanly distinguishing it from isomeric Propan-1-ol and Propan-2-ol.',
        'Cleaves on heating with concentrated HI into alkyl iodides and alcohols.',
        'Chemically inert toward dilute aqueous bases and bromine water.'
      ],
      note: 'Công thức C₃H₈O; không có liên kết hydrogen giữa các phân tử nên sôi thấp hơn Propan-1-ol tới gần 90 °C.',
      noteEn: 'Formula C₃H₈O; lacks intermolecular O–H···O hydrogen bonding, boiling 90 °C below Propan-1-ol.'
    },
    {
      id: 'phthalic-acid',
      catKey: 'carboxylic',
      elements: [...C6_AROM,'C','O','O','C','O','O'],
      bonds: [...BENZENE, [0,6,1],[6,7,2],[6,8,1],[1,9,1],[9,10,2],[9,11,1]],
      name: 'Phthalic acid',
      nameEn: 'Phthalic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Ít tan trong nước lạnh, tan tốt hơn trong nước nóng',
      solubilityEn: 'Slightly soluble cold; soluble in hot water',
      realLife: 'Đồng phân ortho của Terephthalic acid, dùng sản xuất chất hóa dẻo nhựa PVC mềm dẻo (phthalate), nhựa sơn alkyd phủ bề mặt bền đẹp và phẩm nhuộm công nghiệp.',
      realLifeEn: 'Ortho-isomer of Terephthalic acid used primarily via Phthalic anhydride to produce alkyd surface coatings, dyes, and PVC plasticizers.',
      reactions: [
        'Tác dụng với dung dịch NaOH theo tỉ lệ mol 1 : 2 tạo muối Disodium phthalate tan tốt trong nước.',
        'Khi đun nóng ở ~200 °C dễ dàng TÁCH 1 PHÂN TỬ H₂O đóng vòng nội phân tử tạo Phthalic anhydride (khác với Terephthalic acid không tự đóng vòng được!).',
        'Làm quỳ tím hóa đỏ và giải phóng khí CO₂ khi tác dụng với NaHCO₃.'
      ],
      reactionsEn: [
        'Neutralizes 2 equivalents of NaOH to form water-soluble Disodium phthalate.',
        'Heating dehydrates the two adjacent ortho carboxyl groups cleanly into cyclic Phthalic anhydride (impossible for para-Terephthalic acid).',
        'Turns litmus red and effervesces with NaHCO₃.'
      ],
      note: 'Tên chuẩn IUPAC: Benzene-1,2-dicarboxylic acid (C₈H₆O₄); hai nhóm -COOH cạnh nhau nên tách nước đóng vòng cực kỳ dễ.',
      noteEn: 'IUPAC name: Benzene-1,2-dicarboxylic acid (C₈H₆O₄); ortho proximity enables effortless anhydride cyclization.'
    },
    {
      id: 'propane-1,3-diol',
      catKey: 'alcohol',
      elements: ['O','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1]],
      name: 'Propane-1,3-diol',
      nameEn: 'Propane-1,3-diol',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng sánh không màu (không mùi, hút ẩm)',
      stateEn: 'Colorless odorless viscous liquid',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Nguyên liệu sinh học xanh dùng sản xuất sợi vải tổng hợp PTT co giãn mềm mượt (thương hiệu Sorona), mỹ phẩm giữ ẩm lành tính và chất chống đông thân thiện môi trường hơn Ethylene glycol.',
      realLifeEn: 'Bio-derived diol condensed into elastic, stain-resistant PTT textiles (Sorona) and mild skin-care humectants.',
      reactions: [
        'KHÔNG hòa tan Cu(OH)₂ ở nhiệt độ thường thành dung dịch xanh lam (vì hai nhóm -OH nằm cách xa nhau ở vị trí 1 và 3, không kề nhau!).',
        'Tác dụng với kim loại Na dư giải phóng 1 mol khí H₂ trên mỗi mol diol.',
        'Trùng ngưng với Terephthalic acid tạo sợi polyester PTT đàn hồi tốt.'
      ],
      reactionsEn: [
        'Does NOT dissolve Cu(OH)₂ to a deep blue solution at room temperature because its -OH groups are separated (1,3-diol rather than vicinal 1,2-diol)!',
        'Reacts with excess metallic Na liberating 1 mol H₂ per mole of diol.',
        'Polycondenses with Terephthalic acid to spin resilient PTT fibers.'
      ],
      note: 'Công thức C₃H₈O₂; phản ứng thử với Cu(OH)₂ giúp phân biệt ngay Propane-1,3-diol (−) với Propane-1,2-diol hoặc Glycerol (+).',
      noteEn: 'Formula C₃H₈O₂; classic negative Cu(OH)₂ test contrasting separated 1,3-diols against vicinal 1,2-diols.'
    },
    {
      id: 'glycolic-acid',
      catKey: 'carboxylic',
      elements: ['O','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1]],
      name: 'Glycolic acid',
      nameEn: 'Glycolic acid',
      category: 'Carboxylic acid (Hydroxy acid)',
      categoryEn: 'Carboxylic acid (Hydroxy acid)',
      state: 'Rắn (tinh thể không màu, hút ẩm nhẹ)',
      stateEn: 'Solid (colorless hygroscopic crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Hoạt chất AHA (Alpha Hydroxy Acid) tự nhiên có trong nước mía ép; nhờ kích thước phân tử nhỏ nhất nhóm AHA nên thấm sâu hiệu quả trong kem tẩy tế bào chết, trị thâm nám và trẻ hóa làn da.',
      realLifeEn: 'Smallest natural Alpha Hydroxy Acid (AHA) derived from sugarcane; prized in dermatology peels for deep exfoliation and skin renewal.',
      reactions: [
        'Tác dụng với kim loại Na giải phóng 1 mol H₂ (tỉ lệ 1 : 2 Na), nhưng chỉ tác dụng với NaOH theo tỉ lệ 1 : 1 (nhóm -OH alcohol không phản ứng với NaOH)!',
        'Làm quỳ tím hóa đỏ và giải phóng khí CO₂ khi gặp muối NaHCO₃/CaCO₃.',
        'Đun nóng tự trùng ngưng tạo polymer sinh học tự tiêu PGA làm chỉ khâu phẫu thuật tự tan.'
      ],
      reactionsEn: [
        'Reacts 1:2 with Na metal (evolving 1 mol H₂ from both -OH and -COOH) yet consumes only 1 equivalent of aqueous NaOH!',
        'Turns litmus red and liberates CO₂ gas from bicarbonates.',
        'Polycondenses into Polyglycolic acid (PGA) bioabsorbable surgical sutures.'
      ],
      note: 'Công thức C₂H₄O₃ (HO–CH₂–COOH); α-hydroxy acid đơn giản nhất và hay ra câu hỏi đếm tỉ lệ phản ứng với Na và NaOH.',
      noteEn: 'Formula C₂H₄O₃ (HO–CH₂–COOH); simplest α-hydroxy acid showing 2:1 Na vs. 1:1 NaOH stoichiometry.'
    },
    {
      id: 'but-1-yne',
      catKey: 'alkyne',
      elements: ['C','C','C','C'],
      bonds: [[0,1,3],[1,2,1],[2,3,1]],
      name: 'But-1-yne',
      nameEn: 'But-1-yne',
      category: 'Alkyne',
      categoryEn: 'Alkyne',
      state: 'Khí không màu (sôi ở 8,1 °C)',
      stateEn: 'Colorless flammable gas (bp 8.1 °C)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Khí hydrocarbon không no mạch 4 Carbon được dùng trong tổng hợp hữu cơ tinh khiết để kéo dài mạch Carbon tổng hợp dược chất và vitamin.',
      realLifeEn: 'Terminal 4-carbon alkyne gas used as a C4 nucleophilic acetylide building block in pharmaceutical and vitamin synthesis.',
      reactions: [
        'Là alkyne đầu mạch nên THAM GIA phản ứng với dung dịch AgNO₃/NH₃ tạo kết tủa vàng nhạt CH₃CH₂C≡CAg↓ (phân biệt ngay với đồng phân But-2-yne!).',
        'Làm mất màu tối đa 2 mol Br₂ trong dung dịch và mất màu KMnO₄ ở điều kiện thường.',
        'Cộng H₂O (xt HgSO₄/H⁺, 80 °C) theo quy tắc Markovnikov tạo ketone Butanone (MEK).'
      ],
      reactionsEn: [
        'Terminal C≡C–H reacts immediately with AgNO₃/NH₃ to form a pale yellow Silver acetylide precipitate (cleanly separating it from But-2-yne!).',
        'Consumes up to 2 equivalents of Br₂(aq) and decolorizes cold KMnO₄.',
        'Hg²⁺/H⁺ hydration yields Butanone (MEK) via Markovnikov selectivity.'
      ],
      note: 'Cùng công thức C₄H₆ với But-2-yne và Buta-1,3-diene; cặp phân biệt bằng AgNO₃/NH₃ cực hay ra thi.',
      noteEn: 'Shares C₄H₆ with But-2-yne and Buta-1,3-diene; uniquely tests positive with AgNO₃/NH₃ among these three isomers.'
    },
    {
      id: 'but-2-yne',
      catKey: 'alkyne',
      elements: ['C','C','C','C'],
      bonds: [[0,1,1],[1,2,3],[2,3,1]],
      name: 'But-2-yne',
      nameEn: 'But-2-yne',
      category: 'Alkyne',
      categoryEn: 'Alkyne',
      state: 'Lỏng không màu (sôi ở 27 °C)',
      stateEn: 'Colorless volatile liquid (bp 27 °C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Alkyne đối xứng đầu tiên có liên kết ba nằm giữa mạch, được dùng làm chất mẫu nghiên cứu xúc tác chọn lọc tạo đồng phân cis- hoặc trans-alkene tinh khiết trong tổng hợp hóa học.',
      realLifeEn: 'Simplest internal symmetrical alkyne, serving as a benchmark substrate for stereoselective partial hydrogenation to cis- or trans-2-butene.',
      reactions: [
        'KHÔNG phản ứng với dung dịch AgNO₃/NH₃ do không còn nguyên tử H linh động ở nối ba (phân biệt với But-1-yne).',
        'Làm mất màu tối đa 2 mol nước Br₂ tạo 2,2,3,3-tetrabromobutane và làm mất màu dung dịch KMnO₄.',
        'Cộng H₂ có xúc tác Lindlar chọn lọc tạo cis-but-2-ene hoặc xúc tác Ni dư tạo Butane.'
      ],
      reactionsEn: [
        'Gives NO precipitate with AgNO₃/NH₃ because it lacks a terminal ≡C–H bond (unlike But-1-yne).',
        'Decolorizes 2 moles of Br₂(aq) and aqueous KMnO₄ cleanly.',
        'Lindlar hydrogenation stops selectively at cis-but-2-ene; excess H₂ over Ni gives Butane.'
      ],
      note: 'Cùng công thức C₄H₆ với But-1-yne và Buta-1,3-diene; sôi cao hơn But-1-yne gần 19 °C nhờ cấu trúc đối xứng chặt chẽ.',
      noteEn: 'Isomeric with But-1-yne (C₄H₆), yet uniquely lacks terminal alkyne acidity and boils 19 °C higher.'
    },
    {
      id: 'pent-1-ene',
      catKey: 'alkene',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,1],[3,4,1]],
      name: 'Pent-1-ene',
      nameEn: 'Pent-1-ene',
      category: 'Alkene',
      categoryEn: 'Alkene',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ở 30 °C)',
      stateEn: 'Colorless ultra-volatile liquid (bp 30 °C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Là alkene mạch thẳng đầu tiên tồn tại ở thể lỏng tại nhiệt độ phòng; sinh ra trong quá trình cracking dầu mỏ và được dùng làm phụ gia pha trộn đồng trùng hợp nhựa Polyethylene tỉ trọng thấp.',
      realLifeEn: 'Smallest straight-chain alkene that is liquid at room temperature (bp 30 °C); recovered from petroleum cracking as a polyethylene comonomer.',
      reactions: [
        'Làm mất màu nhanh nước Br₂ và dung dịch KMnO₄ loãng ngay ở nhiệt độ thường.',
        'Cộng HBr theo quy tắc Markovnikov tạo sản phẩm chính 2-bromopentane.',
        'Không có đồng phân hình học cis–trans do Carbon đầu mạch gắn 2 nguyên tử H giống nhau.'
      ],
      reactionsEn: [
        'Rapidly decolorizes bromine water and cold dilute KMnO₄.',
        'Adds HBr cleanly by Markovnikov’s rule to form 2-bromopentane as the major isomer.',
        'No cis–trans stereoisomerism because C1 bears two identical H atoms.'
      ],
      note: 'Công thức C₅H₁₀ (đồng phân mạch hở với Cyclopentane).',
      noteEn: 'Formula C₅H₁₀; acyclic alkene isomer of Cyclopentane.'
    },
    {
      id: 'isoamyl-alcohol',
      catKey: 'alcohol',
      elements: ['C','C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1]],
      name: 'Isoamyl alcohol (3-Methylbutan-1-ol)',
      nameEn: 'Isoamyl alcohol (3-Methylbutan-1-ol)',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng không màu (mùi hăng đặc trưng của dầu fusel)',
      stateEn: 'Colorless liquid (strong characteristic fusel odor)',
      solubility: 'Ít tan trong nước (~2,7 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~2.7 g/100 mL)',
      realLife: 'Thành phần chính của "dầu fusel" sinh ra khi chưng cất rượu lên men từ ngũ cốc; giá trị lớn nhất là nguyên liệu phản ứng ester hóa với Acetic acid tạo ra Isoamyl acetate (dầu chuối chín) thơm ngát và tách chiết DNA trong sinh học.',
      realLifeEn: 'Principal fermentation fusel alcohol esterified with Acetic acid to manufacture banana-oil Isoamyl acetate and used in molecular biology to extract DNA.',
      reactions: [
        'Đun nóng với Acetic acid (xúc tác H₂SO₄ đặc) tạo ester Isoamyl acetate có mùi chuối chín đặc trưng.',
        'Tác dụng với kim loại Na giải phóng khí H₂ và oxi hóa nhẹ bằng CuO đun nóng tạo 3-methylbutanal.',
        'Tách nước ở 170 °C (H₂SO₄ đặc) tạo 3-methylbut-1-ene.'
      ],
      reactionsEn: [
        'Fischer esterification with Acetic acid over conc. H₂SO₄ yields banana-scented Isoamyl acetate.',
        'Liberates H₂ with metallic Na and oxidizes over hot CuO to 3-methylbutanal.',
        'Dehydrates over hot acid catalyst to 3-methylbut-1-ene.'
      ],
      note: 'Công thức C₅H₁₂O; luôn ghi nhớ trong chuỗi phản ứng điều chế dầu chuối: Isoamyl alcohol + Acetic acid → Isoamyl acetate.',
      noteEn: 'Formula C₅H₁₂O; essential alcohol partner in synthesizing banana oil (Isoamyl acetate).'
    },
    {
      id: 'p-cresol',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','C'],
      bonds: [...BENZENE, [0,6,1],[3,7,1]],
      name: 'p-Cresol (4-Methylphenol)',
      nameEn: 'p-Cresol (4-Methylphenol)',
      category: 'Phenol',
      categoryEn: 'Phenol',
      state: 'Rắn (tinh thể không màu, mùi nhựa than đá sát trùng)',
      stateEn: 'Solid (colorless crystals, tar-like phenolic odor)',
      solubility: 'Ít tan trong nước (~2 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~2 g/100 mL)',
      realLife: 'Hợp chất họ Phenol chiết xuất từ nhựa than đá, được dùng tổng hợp chất chống oxi hóa BHT bảo quản dầu ăn, thực phẩm đóng gói và chất sát trùng công nghiệp.',
      realLifeEn: 'Coal-tar phenolic used globally as the direct industrial precursor to the food antioxidant BHT (butylated hydroxytoluene) and disinfectants.',
      reactions: [
        'Thể hiện tính Phenol rõ rệt: tác dụng với cả kim loại Na và dung dịch NaOH tạo muối tan (phân biệt hoàn toàn với đồng phân Benzyl alcohol không tan trong NaOH!).',
        'Tạo màu tím xanh đặc trưng với dung dịch FeCl₃ và tạo kết tủa trắng với nước Br₂ (thế vào 2 vị trí ortho còn trống).',
        'Không phản ứng với dung dịch NaHCO₃ do lực acid yếu hơn Carbonic acid.'
      ],
      reactionsEn: [
        'Dissolves cleanly in aqueous NaOH as Sodium p-cresolate (readily distinguished from isomeric Benzyl alcohol and Anisole).',
        'Develops a blue-violet color with FeCl₃ and precipitates a dibromo derivative with bromine water.',
        'Too weakly acidic to liberate CO₂ from aqueous NaHCO₃.'
      ],
      note: 'Công thức C₇H₈O; bộ ba đồng phân C₇H₈O hay thi THPT: p-Cresol (Phenol) – Benzyl alcohol (Alcohol) – Anisole (Ether).',
      noteEn: 'Formula C₇H₈O; completes the classic Grade 11/12 isomer triad alongside Benzyl alcohol and Anisole.'
    },
    {
      id: 'isobutanal',
      catKey: 'aldehyde',
      elements: ['C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1],[3,4,2]],
      name: 'Isobutanal (2-Methylpropanal)',
      nameEn: 'Isobutanal (2-Methylpropanal)',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Lỏng không màu (dễ bay hơi, sôi ở 64 °C, mùi ngũ cốc hăng)',
      stateEn: 'Colorless volatile liquid (bp 64 °C)',
      solubility: 'Tan vừa phải trong nước (~6 g/100 mL)',
      solubilityEn: 'Moderately soluble in water (~6 g/100 mL)',
      realLife: 'Sản phẩm phụ quan trọng của công nghệ hydroformyl hóa Propene trong công nghiệp dầu khí, dùng để sản xuất dung môi pha sơn sạch không độc và tiền chất tổng hợp amino acid thiết yếu Valine.',
      realLifeEn: 'Co-product of industrial Propene hydroformylation converted into low-toxicity paint coalescents and the amino acid Valine.',
      reactions: [
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ tạo lớp bạc kim loại và đun với Cu(OH)₂/NaOH tạo kết tủa đỏ gạch Cu₂O.',
        'Làm mất màu nước Br₂ tạo Isobutyric acid.',
        'Cộng H₂ (Ni, t°) khử trực tiếp thành Isobutanol (2-methylpropan-1-ol).'
      ],
      reactionsEn: [
        'Positive to both Tollens silver-mirror reagent and Fehling Cu₂O reduction.',
        'Decolorizes bromine water cleanly to yield Isobutyric acid.',
        'Hydrogenates over Ni catalyst into Isobutanol.'
      ],
      note: 'Công thức C₄H₈O; đồng phân mạch nhánh của Butanal và đồng phân nhóm chức với Butanone (MEK).',
      noteEn: 'Formula C₄H₈O; branched aldehyde isomer of Butanal and Butanone (MEK).'
    },
    {
      id: 'pentan-2-one',
      catKey: 'ketone',
      elements: ['C','C','C','C','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[1,5,2]],
      name: 'Pentan-2-one (Methyl propyl ketone)',
      nameEn: 'Pentan-2-one (Methyl propyl ketone)',
      category: 'Ketone',
      categoryEn: 'Ketone',
      state: 'Lỏng không màu (mùi giống Acetone pha lê)',
      stateEn: 'Colorless liquid (acetone-like fruity odor)',
      solubility: 'Tan ít trong nước (~4,3 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~4.3 g/100 mL)',
      realLife: 'Dung môi công nghiệp nhiệt độ sôi trung bình (102 °C) thay thế cho các dung môi độc hại trong mực in, sơn nhựa acrylic và cũng góp phần tạo hương phô mai xanh tự nhiên.',
      realLifeEn: 'Medium-boiling (102 °C) coatings and ink solvent that also contributes naturally to blue-cheese aroma.',
      reactions: [
        'DƯƠNG TÍNH với phản ứng Iodoform (tạo kết tủa VÀNG CHI₃↓ khi gặp I₂/NaOH) do mang nhóm CH₃–C(=O)–, giúp phân biệt ngay với Pentan-3-one âm tính!',
        'KHÔNG tham gia phản ứng tráng bạc với thuốc thử Tollens (AgNO₃/NH₃).',
        'Khử hóa bằng H₂ (Ni, t°) hoặc NaBH₄ chuyển thành Pentan-2-ol.'
      ],
      reactionsEn: [
        'Gives a POSITIVE yellow Iodoform precipitate (CHI₃↓) with I₂/NaOH via its CH₃–C(=O)– motif — distinguishing it directly from Pentan-3-one (−)!',
        'Fails the Tollens silver-mirror test (typical ketone behavior).',
        'Reduces smoothly over Ni or with NaBH₄ to Pentan-2-ol.'
      ],
      note: 'Công thức C₅H₁₀O; cặp đối chiếu kinh điển Pentan-2-one (+ Iodoform) vs. Pentan-3-one (− Iodoform).',
      noteEn: 'Formula C₅H₁₀O; classic Iodoform test pair alongside symmetric isomer Pentan-3-one.'
    },

    // =========================================================================
    // 12. NITRO, NITRILE, AMINE, ALKALOID, ESTER, ACID & HYDROCARBON PACK (+58)
    // =========================================================================
    {
      id: 'nitromethane',
      catKey: 'nitro',
      elements: ['C','N','O','O'],
      bonds: [[0,1,1],[1,2,2],[1,3,2]],
      name: 'Nitromethane',
      nameEn: 'Nitromethane',
      category: 'Hợp chất Nitro',
      categoryEn: 'Nitro compound',
      state: 'Lỏng sánh không màu (mùi hơi ngọt, sôi ở 101 °C)',
      stateEn: 'Colorless oily liquid (bp 101 °C)',
      solubility: 'Ít tan trong nước (~10 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~10 g/100 mL)',
      realLife: 'Hợp chất nitro hữu cơ đơn giản nhất, nổi tiếng làm nhiên liệu đua xe mô hình RC và xe đua tốc độ cao Top Fuel Dragster (cháy cung cấp tới hơn 2 lần công suất so với xăng thông thường nhờ sẵn có nguồn Oxygen nội tại trong phân tử), đồng thời là dung môi phân cực công nghiệp.',
      realLifeEn: 'Simplest nitroalkane, famous as a high-energy racing fuel for Top Fuel dragsters and RC model engines (supplying internal Oxygen for combustion) and as a polar industrial solvent.',
      reactions: [
        'Khử nhóm -NO₂ bằng Fe/HCl hoặc H₂ (xúc tác Ni) tạo thành Methylamine (CH₃NH₂).',
        'Trong môi trường kiềm NaOH mạnh có thể chuyển sang dạng muối aci-nitronate (tính CH-acid yếu).',
        'Cháy trong Oxygen ít hơn xăng nhưng giải phóng năng lượng tức thì rất mạnh: 4 CH₃NO₂ + 3 O₂ → 4 CO₂ + 6 H₂O + 2 N₂.'
      ],
      reactionsEn: [
        'Reduction of its -NO₂ group with Fe/HCl or catalytic H₂/Ni yields Methylamine.',
        'Shows weak C–H acidity in strong aqueous base (forming aci-nitromethanoate salts).',
        'Combusts vigorously with far less external air required than gasoline hydrocarbons.'
      ],
      note: 'Công thức CH₃NO₂ (chứa nhóm -NO₂); là đồng phân cấu tạo phổ biến nhất của Carbamic acid và Methyl nitrite.',
      noteEn: 'Formula CH₃NO₂; benchmark nitroalkane isomer alongside Carbamic acid and Methyl nitrite.'
    },
    {
      id: 'carbamic-acid',
      catKey: 'carboxylic',
      elements: ['N','C','O','O'],
      bonds: [[0,1,1],[1,2,2],[1,3,1]],
      name: 'Carbamic acid',
      nameEn: 'Carbamic acid',
      category: 'Carboxylic acid (Amino-carboxylic)',
      categoryEn: 'Carboxylic acid',
      state: 'Không tồn tại bền ở trạng thái tự do (bền ở dạng muối và Ester)',
      stateEn: 'Unstable free acid (isolable as salts & esters)',
      solubility: 'Tồn tại cân bằng trong dung dịch',
      solubilityEn: 'Exists in aqueous equilibrium',
      realLife: 'Phân tử nền tảng tạo nên muối Ammonium carbamate trong quá trình công nghiệp sản xuất hàng trăm triệu tấn phân đạm Urea mỗi năm và là bộ khung gốc của họ nhựa Polyurethane (nhóm carbamate/urethane) làm nệm mút, giày thể thao.',
      realLifeEn: 'Parent scaffold of Ammonium carbamate (the key industrial intermediate to Urea fertilizer) and of every Polyurethane foam and coating.',
      reactions: [
        'Tự phân hủy nhanh ở trạng thái tự do thành khí CO₂ và khí NH₃: H₂N–COOH → NH₃ + CO₂.',
        'Ở nhiệt độ và áp suất cao, NH₃ kết hợp CO₂ tạo muối Ammonium carbamate rồi tách nước thành Urea.',
        'Các dẫn xuất ester của nó (như Methyl carbamate, Polyurethane) hoàn toàn bền vững.'
      ],
      reactionsEn: [
        'Free Carbamic acid decomposes spontaneously into Ammonia and Carbon dioxide gas.',
        'Ammonium carbamate dehydrates at elevated temperature and pressure into Urea fertilizer.',
        'Forms stable esters (carbamates / urethanes) widely used in polymers and agrochemicals.'
      ],
      note: 'Công thức CH₃NO₂ (H₂N–COOH); đồng phân carboxylic-amide của Nitromethane.',
      noteEn: 'Formula CH₃NO₂ (H₂N–COOH); formally the simplest carbamic acid isomer of Nitromethane.'
    },
    {
      id: 'methyl-nitrite',
      catKey: 'nitroso',
      elements: ['C','O','N','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2]],
      name: 'Methyl nitrite',
      nameEn: 'Methyl nitrite',
      category: 'Nitrite / Nitroso',
      categoryEn: 'Nitrite / Nitroso',
      state: 'Khí không màu (sôi ở −12 °C, mùi ngọt đặc trưng)',
      stateEn: 'Colorless gas (bp −12 °C)',
      solubility: 'Ít tan trong nước',
      solubilityEn: 'Slightly soluble in water',
      realLife: 'Là ester alkyl của Nitrous acid (HNO₂), đóng vai trò chất trung gian quan trọng trong công nghiệp hóa dầu tổng hợp Oxime và làm chất oxy hóa nhẹ trong tổng hợp hữu cơ tinh khiết.',
      realLifeEn: 'Simplest alkyl nitrite ester (from Methanol and HNO₂), serving as a gas-phase nitrosating reagent and intermediate in oxime manufacturing.',
      reactions: [
        'Thủy phân nhanh trong dung dịch kiềm NaOH tạo Methanol và muối Sodium nitrite (NaNO₂).',
        'Điều chế bằng phản ứng giữa Methanol và dung dịch NaNO₂/H₂SO₄ lạnh.',
        'Bị khử hoặc phân hủy nhiệt dễ hơn nhiều so với đồng phân Nitromethane.'
      ],
      reactionsEn: [
        'Hydrolyzes swiftly in aqueous NaOH back into Methanol and Sodium nitrite.',
        'Prepared cleanly by treating Methanol with cold aqueous NaNO₂ and Sulfuric acid.',
        'Thermally far more labile than its C-bonded isomer Nitromethane.'
      ],
      note: 'Công thức CH₃NO₂ (CH₃–O–N=O); khác Nitromethane (C gắn N) ở chỗ gốc methyl gắn qua nguyên tử Oxygen.',
      noteEn: 'Formula CH₃NO₂ (CH₃–O–N=O); O-bonded nitrite ester isomer of Nitromethane.'
    },
    {
      id: 'formohydroxamic-acid',
      catKey: 'amide',
      elements: ['C','O','N','O'],
      bonds: [[0,1,2],[0,2,1],[2,3,1]],
      name: 'Formohydroxamic acid',
      nameEn: 'Formohydroxamic acid',
      category: 'Hydroxamic acid / Amide',
      categoryEn: 'Hydroxamic acid / Amide',
      state: 'Rắn (tinh thể không màu, nóng chảy ở 81 °C)',
      stateEn: 'Solid (colorless crystals, mp 81 °C)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Hợp chất hydroxamic acid đơn giản nhất dùng làm tác nhân tạo phức chelat mạnh với ion kim loại Fe³⁺ (màu đỏ tía đặc trưng trong phép thử nhận biết dẫn xuất carboxylic) và trong nghiên cứu ức chế enzyme.',
      realLifeEn: 'Simplest hydroxamic acid, renowned for forming intense red-violet complexes with Fe³⁺ ions (ferric hydroxamate test) and modeling metalloprotein inhibitors.',
      reactions: [
        'Tạo phức chất màu ĐỎ TÍA ĐẶC TRƯNG với dung dịch FeCl₃ — cơ sở của phép thử nhận biết ester/anhydride kinh điển.',
        'Thủy phân trong dung dịch kiềm hoặc acid nóng tạo Formic acid và Hydroxylamine.',
        'Có tính acid yếu (nhờ nhóm N–OH cạnh C=O).'
      ],
      reactionsEn: [
        'Chelates Fe³⁺ ions immediately to give a vivid burgundy-violet ferric hydroxamate complex.',
        'Hydrolyzes in hot aqueous acid or base into Formic acid and Hydroxylamine.',
        'Displays mild acidity at its N–OH proton.'
      ],
      note: 'Công thức CH₃NO₂ (H–CO–NH–OH); đồng phân của Nitromethane và Carbamic acid.',
      noteEn: 'Formula CH₃NO₂ (HCONHOH); hydroxamic acid isomer of Nitromethane.'
    },
    {
      id: 'o-formylhydroxylamine',
      catKey: 'ester',
      elements: ['C','O','O','N'],
      bonds: [[0,1,2],[0,2,1],[2,3,1]],
      name: 'O-Formylhydroxylamine',
      nameEn: 'O-Formylhydroxylamine',
      category: 'Ester / Hydroxylamine',
      categoryEn: 'Ester / Hydroxylamine',
      state: 'Chất trung gian hóa học / dung dịch',
      stateEn: 'Reactive ester-hydroxylamine isomer',
      solubility: 'Tan trong dung môi phân cực',
      solubilityEn: 'Soluble in polar solvents',
      realLife: 'Đồng phân cấu tạo dạng ester-amine (H–COO–NH₂) của CH₃NO₂, thường dùng làm ví dụ đối chiếu đồng phân nhóm chức trong hóa học hữu cơ tính toán và tổng hợp hóa dược.',
      realLifeEn: 'O-Acyl hydroxylamine ester isomer of CH₃NO₂ (H–COO–NH₂) studied in functional-group isomerism and amination reactions.',
      reactions: [
        'Dễ bị thủy phân tạo muối Formate và Hydroxylamine trong môi trường kiềm.',
        'Nhóm –O–NH₂ đóng vai trò tác nhân chuyển nhóm –NH₂ trong một số phản ứng tổng hợp hữu cơ.',
        'Tự chuyển vị chậm hoặc phản ứng ngưng tụ ở nhóm -NH₂ khi có mặt carbonyl.'
      ],
      reactionsEn: [
        'Hydrolyzes cleanly in alkaline solution to Formate and Hydroxylamine.',
        'Can serve as an electrophilic aminating motif via its –O–NH₂ linkage.',
        'Condenses with electrophilic carbonyls at its free -NH₂ site.'
      ],
      note: 'Công thức CH₃NO₂ (H–CO–O–NH₂); hoàn thiện đủ bộ 5 đồng phân cấu tạo tiêu biểu của CH₃NO₂.',
      noteEn: 'Formula CH₃NO₂ (H–CO–O–NH₂); completes the 5 main structural isomers of CH₃NO₂.'
    },
    {
      id: 'nitrobenzene',
      catKey: 'nitro',
      elements: [...C6_AROM,'N','O','O'],
      bonds: [...BENZENE,[0,6,1],[6,7,2],[6,8,2]],
      name: 'Nitrobenzene',
      nameEn: 'Nitrobenzene',
      category: 'Hợp chất Nitro',
      categoryEn: 'Nitro compound',
      state: 'Chất lỏng sánh màu vàng nhạt (mùi hạnh nhân đắng, D = 1,20 g/cm³)',
      stateEn: 'Pale-yellow oily liquid (bitter almond odor, 1.20 g/mL)',
      solubility: 'Không tan trong nước, chìm xuống đáy',
      solubilityEn: 'Insoluble in water (denser than water)',
      realLife: 'Hóa chất công nghiệp chủ lực (>95% sản lượng) dùng để khử hóa sản xuất Aniline phục vụ công nghiệp thuốc nhuộm, cao su và dược phẩm Paracetamol; từng được gọi là dầu Mirbane có mùi hạnh nhân.',
      realLifeEn: 'Major petrochemical intermediate (>95% reduced industrially to Aniline for dyes, rubber chemicals, and Paracetamol); historically called oil of Mirbane.',
      reactions: [
        'Điều chế bằng phản ứng nitro hóa Benzene với hỗn hợp HNO₃ đặc / H₂SO₄ đặc (50–60 °C), tạo chất lỏng dầu vàng nặng lắng xuống đáy ống nghiệm.',
        'Khử bằng bột Fe + dung dịch HCl (sau đó trung hòa bằng NaOH) chuyển thành Aniline (C₆H₅NH₂).',
        'Nhóm -NO₂ hút electron mạnh làm vòng thơm kém hoạt động hơn Benzene và định hướng phản ứng thế tiếp theo vào vị trí meta.'
      ],
      reactionsEn: [
        'Synthesized by nitrating Benzene with mixed conc. HNO₃/H₂SO₄ at ~55 °C, separating as a dense pale-yellow bottom layer.',
        'Reduced cleanly by Fe/HCl (followed by NaOH neutralization) into Aniline.',
        'Strongly electron-withdrawing -NO₂ deactivates the aromatic ring and directs further substitution to the meta position.'
      ],
      note: 'Công thức C₆H₅NO₂; chất lỏng nặng hơn nước và rất độc (gây methemoglobin máu khi tiếp xúc qua da hoặc hít hơi).',
      noteEn: 'Formula C₆H₅NO₂; dense toxic oil serving as the industrial gateway from Benzene to Aniline.'
    },
    {
      id: 'tnt',
      catKey: 'nitro',
      elements: [...C6_AROM,'C','N','O','O','N','O','O','N','O','O'],
      bonds: [...BENZENE,[0,6,1],[1,7,1],[7,8,2],[7,9,2],[3,10,1],[10,11,2],[10,12,2],[5,13,1],[13,14,2],[13,15,2]],
      name: 'TNT (2,4,6-Trinitrotoluene)',
      nameEn: 'TNT (2,4,6-Trinitrotoluene)',
      category: 'Hợp chất Nitro',
      categoryEn: 'Nitro compound',
      state: 'Rắn (tinh thể màu vàng nhạt, nóng chảy ở 80,4 °C)',
      stateEn: 'Solid (pale-yellow crystals, mp 80.4 °C)',
      solubility: 'Hầu như không tan trong nước',
      solubilityEn: 'Practically insoluble in water',
      realLife: 'Thuốc nổ quân sự và công nghiệp khai khoáng phổ biến nhất lịch sử nhờ tính an toàn cơ học cao (nóng chảy ở 80 °C để đúc khuôn dễ dàng mà không phát nổ khi va chạm hay đun nóng nhẹ, chỉ nổ khi có kíp nổ mạnh).',
      realLifeEn: 'Classic military and mining explosive prized because it melts safely at 80 °C for casting and resists accidental shock unless triggered by a detonator.',
      reactions: [
        'Điều chế bằng cách cho Toluene phản ứng với hỗn hợp HNO₃ đặc / H₂SO₄ đặc đun nóng (thế vào cả 3 vị trí 2, 4, 6 nhờ nhóm -CH₃ hoạt hóa mạnh).',
        'Khi kích nổ phân hủy cực nhanh giải phóng lượng lớn khí N₂, CO, H₂O và muội Carbon tỏa nhiệt khổng lồ.',
        'Tạo phức màu đỏ nâu đặc trưng khi tác dụng với dung dịch kiềm mạnh trong Acetone.'
      ],
      reactionsEn: [
        'Synthesized by exhaustive nitration of Toluene with mixed conc. HNO₃/H₂SO₄ at positions 2, 4, and 6.',
        'Detonates via rapid intramolecular redox decomposition releasing hot N₂, CO, H₂O, and soot.',
        'Forms dark red Meisenheimer complexes with strong base in Acetone.'
      ],
      note: 'Công thức C₇H₅N₃O₆ (M = 227); bài toán tính hiệu suất điều chế thuốc nổ TNT từ Toluene thường gặp trong Hóa 11.',
      noteEn: 'Formula C₇H₅N₃O₆ (M = 227.13 g/mol); classic Grade 11 stoichiometry compound synthesized from Toluene.'
    },
    {
      id: 'picric-acid',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','N','O','O','N','O','O','N','O','O'],
      bonds: [...BENZENE,[0,6,1],[1,7,1],[7,8,2],[7,9,2],[3,10,1],[10,11,2],[10,12,2],[5,13,1],[13,14,2],[13,15,2]],
      name: 'Picric acid (2,4,6-Trinitrophenol)',
      nameEn: 'Picric acid (2,4,6-Trinitrophenol)',
      category: 'Phenol (Nitro-phenol)',
      categoryEn: 'Phenol (Nitro-phenol)',
      state: 'Rắn (tinh thể màu vàng rực, vị cực đắng)',
      stateEn: 'Solid (bright yellow bitter crystals)',
      solubility: 'Ít tan trong nước lạnh (~1,3 g/100 mL), tan tốt trong nước nóng',
      solubilityEn: 'Slightly soluble cold; soluble in hot water',
      realLife: 'Thuốc thử hóa học dùng định danh alkaloid, thuốc nhuộm màu vàng rực cho tơ lụa len từ thế kỷ 19, dung dịch cố định mô giải phẫu và vật liệu nổ mạnh trong lịch sử (cần bảo quản ẩm dưới lớp nước để tránh nổ khi khô).',
      realLifeEn: 'Intensely yellow dye and biological histological fixative (Bouin solution), plus historic high explosive stored wet for safety.',
      reactions: [
        'Tạo KẾT TỦA VÀNG ngay khi nhỏ HNO₃ đặc vào Phenol (có H₂SO₄ đặc xúc tác) — phản ứng nhận biết Phenol trong SGK!',
        'Nhờ 3 nhóm -NO₂ hút electron rất mạnh, có LỰC ACID MẠNH GẦN BẰNG ACID VÔ CƠ (làm đỏ quỳ tím, giải phóng khí CO₂ với Na₂CO₃/NaHCO₃ — khác hẳn Phenol thường!).',
        'Khi khô ráo dễ nổ mạnh nếu va đập hoặc gia nhiệt.'
      ],
      reactionsEn: [
        'Precipitates as bright YELLOW crystals upon nitrating Phenol with conc. HNO₃/H₂SO₄.',
        'Three electron-withdrawing -NO₂ groups render it nearly as strong as mineral acids (turns litmus red and bubbles CO₂ with NaHCO₃ — unlike Phenol!).',
        'Shock-sensitive explosive when dry, forming explosive metal picrates with heavy metals.'
      ],
      note: 'Công thức C₆H₃N₃O₇; lưu ý điểm đặc biệt: Phenol không tác dụng với NaHCO₃ nhưng Picric acid lại sủi bọt CO₂ rất mạnh!',
      noteEn: 'Formula C₆H₃N₃O₇; crucial acidity contrast: Phenol fails to react with NaHCO₃, whereas Picric acid bubbles CO₂ briskly.'
    },
    {
      id: 'nitroglycerin',
      catKey: 'ester',
      elements: ['C','C','C','O','O','O','N','O','O','N','O','O','N','O','O'],
      bonds: [[0,1,1],[1,2,1],[0,3,1],[1,4,1],[2,5,1],[3,6,1],[6,7,2],[6,8,2],[4,9,1],[9,10,2],[9,11,2],[5,12,1],[12,13,2],[12,14,2]],
      name: 'Nitroglycerin (Glyceryl trinitrate)',
      nameEn: 'Nitroglycerin (Glyceryl trinitrate)',
      category: 'Ester vô cơ (Nitrate ester)',
      categoryEn: 'Inorganic nitrate ester',
      state: 'Lỏng sánh không màu đến vàng nhạt (rất nhạy nổ khi va chạm)',
      stateEn: 'Colorless/pale-yellow dense oily liquid (highly shock-sensitive)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Vừa là thành phần cốt lõi của thuốc nổ Dynamite do Alfred Nobel phát minh năm 1867 (người sáng lập Giải Nobel), vừa là thuốc cấp cứu ngậm dưới lưỡi giãn mạch vành tức thì cho bệnh nhân đau thắt ngực, nhồi máu cơ tim.',
      realLifeEn: 'Dual-role icon: stabilized by Alfred Nobel into Dynamite (1867) and prescribed sublingually as a fast-acting vasodilator to relieve angina heart pain.',
      reactions: [
        'Điều chế bằng phản ứng ester hóa Glycerol với hỗn hợp HNO₃ đặc / H₂SO₄ đặc ở nhiệt độ thấp được kiểm soát chặt.',
        'Thủy phân trong dung dịch kiềm NaOH đặc tạo lại Glycerol và muối Sodium nitrate (NaNO₃).',
        'Phân hủy nổ tức thì tỏa lượng khí khổng lồ: 4 C₃H₅(ONO₂)₃ → 12 CO₂ + 10 H₂O + 6 N₂ + O₂.'
      ],
      reactionsEn: [
        'Prepared by esterifying Glycerol with cold mixed conc. HNO₃/H₂SO₄.',
        'Hydrolyzes in strong aqueous NaOH into Glycerol and NaNO₃.',
        'Detonates upon shock releasing huge volumes of hot N₂, CO₂, H₂O, and O₂ gas.'
      ],
      note: 'Công thức C₃H₅N₃O₉; dù tên thường gọi là "Nitroglycerin" nhưng thực chất cấu tạo là Ester của Nitric acid (–O–NO₂), không phải hợp chất Nitro.',
      noteEn: 'Formula C₃H₅N₃O₉; technically an organic nitrate ester (–O–NO₂) rather than a C-bonded nitro compound.'
    },
    {
      id: 'hydrogen-cyanide',
      catKey: 'nitrile',
      elements: ['C','N'],
      bonds: [[0,1,3]],
      name: 'Hydrogen cyanide (Hydrocyanic acid)',
      nameEn: 'Hydrogen cyanide (Hydrocyanic acid)',
      category: 'Nitrile',
      categoryEn: 'Nitrile',
      state: 'Khí hoặc lỏng không màu (sôi ở 25,6 °C, mùi hạnh nhân đắng, cực độc)',
      stateEn: 'Colorless ultra-volatile liquid/gas (bp 25.6 °C, bitter almond odor, lethal toxin)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Chất độc cực mạnh ức chế hô hấp tế bào (có lượng vết trong hạt hạnh nhân đắng, hạt táo và sắn tươi chưa chế biến kỹ); nhưng trong công nghiệp hóa chất lại là nguyên liệu tổng hợp Methyl methacrylate (nhựa mica PMMA), Nylon-6,6 và tách chiết vàng.',
      realLifeEn: 'Potent cellular respiration inhibitor occurring naturally in trace cyanogenic glycosides (cassava, apple seeds), yet vital industrially for synthesizing PMMA (Plexiglas) and adiponitrile.',
      reactions: [
        'Tan trong nước tạo Hydrocyanic acid rất yếu, tác dụng với kiềm NaOH tạo muối Sodium cyanide (NaCN).',
        'Cộng hợp vào nhóm carbonyl của Acetone tạo Acetone cyanohydrin — bước đầu sản xuất thủy tinh hữu cơ Plexiglas.',
        'Cộng hợp vào Acetylene tạo Acrylonitrile (nguyên liệu dệt tơ Nitron).'
      ],
      reactionsEn: [
        'Weak acid in water, neutralized cleanly by NaOH to Sodium cyanide.',
        'Adds across the carbonyl of Acetone to yield acetone cyanohydrin en route to Plexiglas.',
        'Adds across Acetylene to synthesize Acrylonitrile.'
      ],
      note: 'Công thức HCN (H–C≡N); vì có chứa Carbon liên kết ba trực tiếp với Nitrogen, đây là nitrile đơn giản nhất.',
      noteEn: 'Formula HCN (H–C≡N); simplest nitrile structure (formally Methanenitrile).'
    },
    {
      id: 'acetonitrile',
      catKey: 'nitrile',
      elements: ['C','C','N'],
      bonds: [[0,1,1],[1,2,3]],
      name: 'Acetonitrile (Ethanenitrile)',
      nameEn: 'Acetonitrile (Ethanenitrile)',
      category: 'Nitrile',
      categoryEn: 'Nitrile',
      state: 'Lỏng không màu (mùi hơi ngọt giống Ether, sôi ở 82 °C)',
      stateEn: 'Colorless mobile liquid (bp 82 °C)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi phân cực hàng đầu trong sắc ký lỏng hiệu năng cao (HPLC) tại các phòng kiểm nghiệm dược phẩm, thực phẩm, hóa sinh và dùng làm dung môi điện phân trong pin, siêu tụ điện.',
      realLifeEn: 'Premier polar aprotic mobile-phase solvent in HPLC analytical chemistry labs, pharmaceutical purification, and supercapacitor electrolytes.',
      reactions: [
        'Thủy phân hoàn toàn khi đun nóng trong môi trường acid hoặc kiềm (tạo Acetic acid + NH₄⁺ hoặc Sodium acetate + NH₃).',
        'Khử nhóm -C≡N bằng H₂ (xúc tác Ni) hoặc LiAlH₄ tạo thành Ethylamine.',
        'Rất bền với nhiều chất oxy hóa mạnh nên được ưu tiên chọn làm dung môi phân tích.'
      ],
      reactionsEn: [
        'Hydrolyzes on heating with aqueous acid or base to Acetic acid / Acetate + Ammonia.',
        'Catalytic hydrogenation or LiAlH₄ reduction yields Ethylamine.',
        'High electrochemical and oxidative stability makes it ideal for HPLC and electrochemistry.'
      ],
      note: 'Công thức CH₃C≡N (C₂H₃N); sản phẩm phụ chủ yếu từ quy trình tổng hợp Acrylonitrile.',
      noteEn: 'Formula CH₃CN (C₂H₃N); simplest alkyl nitrile.'
    },
    {
      id: 'acrylonitrile',
      catKey: 'nitrile',
      elements: ['C','C','C','N'],
      bonds: [[0,1,2],[1,2,1],[2,3,3]],
      name: 'Acrylonitrile',
      nameEn: 'Acrylonitrile',
      category: 'Nitrile',
      categoryEn: 'Nitrile',
      state: 'Lỏng không màu (mùi hắc giống hành tây, độc và dễ cháy)',
      stateEn: 'Colorless pungent flammable liquid',
      solubility: 'Tan vừa trong nước (~7 g/100 mL)',
      solubilityEn: 'Moderately soluble in water (~7 g/100 mL)',
      realLife: 'Monomer cốt lõi để trùng hợp tạo tơ Nitron (tơ Olon / Polyacrylonitrile) xốp nhẹ, giữ ấm cực tốt thay cho lông cừu tự nhiên để dệt áo len mùa đông, đồng thời sản xuất nhựa siêu bền ABS (vỏ mũ bảo hiểm, đồ chơi Lego) và sợi carbon hàng không.',
      realLifeEn: 'Critical monomer polymerized into warm wool-like acrylic fiber (Orlon/Nitron), tough ABS plastics (Lego bricks, helmets), and aerospace carbon fiber precursors.',
      reactions: [
        'Trùng hợp (xt, t°, p) tạo thành Polyacrylonitrile (PAN) để kéo sợi tơ Olon / Nitron.',
        'Đồng trùng hợp với Buta-1,3-diene tạo cao su Buna-N (chống dầu cực tốt) hoặc với Butadiene và Styrene tạo nhựa ABS.',
        'Làm mất màu nước Br₂ và dung dịch KMnO₄ ở nhiệt độ thường; thủy phân nhóm -C≡N thành Acrylic acid.'
      ],
      reactionsEn: [
        'Undergoes vinyl polymerization to Polyacrylonitrile (PAN) — Nitron/Olon synthetic wool fiber.',
        'Copolymerizes with Buta-1,3-diene into oil-resistant Buna-N nitrile rubber and with Styrene into ABS resin.',
        'Decolorizes bromine water and cold KMnO₄; nitrile hydrolysis gives Acrylic acid.'
      ],
      note: 'Công thức CH₂=CH–C≡N (C₃H₃N); nhớ bài Polymer Hóa 12: Tơ Nitron (tơ Olon) điều chế từ phản ứng trùng hợp Acrylonitrile.',
      noteEn: 'Formula C₃H₃N; high-frequency Grade 12 polymer monomer for Nitron/Olon acrylic fiber and Buna-N rubber.'
    },
    {
      id: 'propylamine',
      catKey: 'amine',
      elements: ['C','C','C','N'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: 'Propylamine (Propan-1-amine)',
      nameEn: 'Propylamine (Propan-1-amine)',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Lỏng không màu (dễ bay hơi, sôi ở 48 °C, mùi cá tanh khai)',
      stateEn: 'Colorless volatile liquid (bp 48 °C, fishy ammonia odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Là alkylamine mạch thẳng đầu tiên tồn tại ở thể lỏng tại nhiệt độ phòng (khác với C1–C2 dạng khí); được dùng làm chất trung gian tổng hợp thuốc trừ cỏ, cao su và dược chất.',
      realLifeEn: 'Smallest linear primary aliphatic amine that is liquid at room temperature (bp 48 °C); intermediate for agrochemicals, rubber accelerators, and drugs.',
      reactions: [
        'Có tính base mạnh hơn NH₃: làm quỳ tím hóa xanh, phenolphthalein hóa hồng và phản ứng nhanh với HCl tạo muối tan.',
        'Phản ứng với HNO₂ (NaNO₂/HCl) giải phóng khí N₂ tạo Propan-1-ol (cùng sản phẩm phụ chuyển vị).',
        'Tạo phức màu xanh thẫm với dung dịch CuSO₄ khi nhỏ dư.'
      ],
      reactionsEn: [
        'Turns red litmus blue and phenolphthalein pink; neutralizes HCl to Propylammonium chloride.',
        'Reacts with nitrous acid evolving N₂ gas bubbles (primary amine test).',
        'Dissolves precipitated Cu(OH)₂ into a deep royal-blue amine complex.'
      ],
      note: 'Công thức C₃H₉N; cùng công thức phân tử với Isopropylamine, Ethylmethylamine và Trimethylamine (tổng cộng 4 đồng phân amine C₃H₉N).',
      noteEn: 'Formula C₃H₉N; one of four constitutional amine isomers of C₃H₉N.'
    },
    {
      id: 'isopropylamine',
      catKey: 'amine',
      elements: ['C','C','C','N'],
      bonds: [[0,1,1],[1,2,1],[1,3,1]],
      name: 'Isopropylamine (Propan-2-amine)',
      nameEn: 'Isopropylamine (Propan-2-amine)',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ở 32 °C, mùi ammonia khai)',
      stateEn: 'Colorless ultra-volatile liquid (bp 32 °C, ammonia odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Hóa chất trung gian sản lượng lớn dùng pha chế muối thuốc diệt cỏ phổ rộng (như muối isopropylammonium của Glyphosate), chất chống oxy hóa cao su và tổng hợp thuốc tim mạch nhóm beta-blocker (Propranolol).',
      realLifeEn: 'High-volume industrial intermediate for herbicide formulations (Glyphosate salts), rubber stabilizers, and beta-blocker heart medications (Propranolol).',
      reactions: [
        'Làm xanh giấy quỳ tím và hòa tan trong acid HCl tạo muối tan.',
        'Tác dụng với acid nitrous (NaNO₂ + HCl) ở nhiệt độ thường sủi bọt khí N₂ và tạo Propan-2-ol.',
        'Phản ứng với Acetic anhydride tạo amide tương ứng.'
      ],
      reactionsEn: [
        'Strongly basic aqueous solution turns litmus blue and forms crystalline salts with HCl.',
        'Liberates N₂ gas with cold NaNO₂/HCl yielding Propan-2-ol.',
        'Acylates cleanly with acid anhydrides to N-isopropyl amides.'
      ],
      note: 'Công thức C₃H₉N (amine bậc 1 mạch nhánh); là chất lỏng sôi thấp hơn nhiều so với Propylamine mạch thẳng.',
      noteEn: 'Branched primary C₃H₉N amine isomer boiling 16 °C lower than linear Propylamine.'
    },
    {
      id: '2,4,6-tribromoaniline',
      catKey: 'amine',
      elements: [...C6_AROM,'N','Br','Br','Br'],
      bonds: [...BENZENE,[0,6,1],[1,7,1],[3,8,1],[5,9,1]],
      name: '2,4,6-Tribromoaniline',
      nameEn: '2,4,6-Tribromoaniline',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Rắn (kết tủa trắng hoặc tinh thể hình kim trắng, nóng chảy ở 120 °C)',
      stateEn: 'Solid (white precipitate / needles, mp 120 °C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Chính là KẾT TỦA TRẮNG quen thuộc xuất hiện tức thì khi nhỏ nước Br₂ vào dung dịch Aniline để nhận biết Aniline trong phòng thí nghiệm phổ thông; trong công nghiệp còn dùng làm chất phụ gia chống cháy.',
      realLifeEn: 'The signature WHITE precipitate formed instantly when aqueous bromine is added to Aniline in classroom qualitative tests; also used as a flame-retardant intermediate.',
      reactions: [
        'Tạo thành ngay ở nhiệt độ phòng khi Aniline phản ứng với nước Br₂ dư (thế đồng thời cả 3 vị trí 2, 4, 6).',
        'Tính base CỰC YẾU do 3 nguyên tử Bromine hút electron mạnh (không tan tốt trong HCl loãng như Aniline).',
        'Không làm mất màu thêm dung dịch Br₂ ở điều kiện thường.'
      ],
      reactionsEn: [
        'Precipitates instantaneously when Aniline meets aqueous Bromine water at room temperature.',
        'Even weaker base than Aniline because three Bromine atoms pull electron density away from -NH₂.',
        'All ortho and para ring sites are blocked against further cold bromination.'
      ],
      note: 'Công thức C₆H₄Br₃N (M = 329,8); tương tự Phenol, Aniline nhận biết cực nhạy bằng nước Br₂ tạo kết tủa trắng.',
      noteEn: 'Formula C₆H₄Br₃N (M = 329.8 g/mol); diagnostic white precipitate identifying Aniline.'
    },
    {
      id: 'dmf',
      catKey: 'amide',
      elements: ['C','O','N','C','C'],
      bonds: [[0,1,2],[0,2,1],[2,3,1],[2,4,1]],
      name: 'Dimethylformamide (DMF)',
      nameEn: 'Dimethylformamide (DMF)',
      category: 'Amide',
      categoryEn: 'Amide',
      state: 'Lỏng không màu (mùi tanh amine nhẹ, sôi ở 153 °C)',
      stateEn: 'Colorless high-boiling liquid (bp 153 °C)',
      solubility: 'Tan vô hạn trong nước và hầu hết dung môi hữu cơ',
      solubilityEn: 'Miscible with water and most organic solvents',
      realLife: 'Dung môi công nghiệp đa năng hàng đầu dùng để hòa tan kéo sợi vải thun co giãn Spandex/Lycra, sản xuất da tổng hợp PU (giả da), màng lọc và hòa tan thuốc trong tổng hợp hóa dược.',
      realLifeEn: 'Ubiquitous polar aprotic solvent indispensable for spinning elastic Spandex/Lycra fibers, polyurethane synthetic leather, and fine pharmaceutical synthesis.',
      reactions: [
        'Thủy phân khi đun nóng trong acid mạnh hoặc kiềm đặc tạo Formic acid (hoặc muối Formate) và khí Dimethylamine.',
        'Rất bền nhiệt và không có nguyên tử H linh động (dung môi aprotic), hỗ trợ đắc lực các phản ứng thế nucleophile S_N2.',
        'Trung tính với giấy quỳ tím ở điều kiện thường.'
      ],
      reactionsEn: [
        'Hydrolyzes slowly in hot strong acid or base to Formate and Dimethylamine.',
        'Polar aprotic solvent strongly accelerating bimolecular nucleophilic substitution (SN2) reactions.',
        'Neutral to litmus under ordinary conditions.'
      ],
      note: 'Công thức (CH₃)₂N–CHO (C₃H₇NO); dẫn xuất thế hai lần của Formamide.',
      noteEn: 'Formula C₃H₇NO; N,N-dimethyl derivative of Formamide.'
    },
    {
      id: 'caprolactam',
      catKey: 'amide',
      elements: ['C','C','C','C','C','C','N','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,0,1],[0,7,2]],
      name: 'ε-Caprolactam',
      nameEn: 'ε-Caprolactam',
      category: 'Amide (Lactam vòng 7 cạnh)',
      categoryEn: 'Amide (Cyclic lactam)',
      state: 'Rắn (tinh thể trắng hút ẩm, nóng chảy ở 69 °C)',
      stateEn: 'Solid (hygroscopic white flakes, mp 69 °C)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Monomer sản xuất hàng triệu tấn tơ Capron (tơ Nylon-6) bền dai, đàn hồi tốt dùng dệt lưới đánh cá, dây thừng chịu lực, thảm trải sàn, chỉ phẫu thuật y tế và bánh răng nhựa kỹ thuật chịu mài mòn.',
      realLifeEn: 'Multi-million-ton monomer ring-opened into tough Nylon-6 (Capron) fibers for fishing nets, carpets, tire cords, and precision engineering gears.',
      reactions: [
        'Trùng hợp MỞ VÒNG ở nhiệt độ cao (khoảng 250 °C có mặt ít nước xúc tác) tạo ra Polymer Tơ Capron (Nylon-6).',
        'Thủy phân mở vòng hoàn toàn trong dung dịch kiềm hoặc acid nóng tạo thành 6-Aminohexanoic acid (ε-aminocaproic acid).',
        'Là amide vòng (lactam) trung tính, không làm đổi màu giấy quỳ.'
      ],
      reactionsEn: [
        'Undergoes ring-opening polymerization (~250 °C) directly into Nylon-6 (Capron) polyamide.',
        'Complete aqueous hydrolysis opens the 7-membered ring into 6-Aminohexanoic acid.',
        'Neutral cyclic amide unreactive toward litmus at room temperature.'
      ],
      note: 'Công thức C₆H₁₁NO; nhớ câu hỏi Hóa 12: Tơ Capron (Nylon-6) có thể điều chế bằng trùng hợp Caprolactam HOẶC trùng ngưng 6-Aminohexanoic acid.',
      noteEn: 'Formula C₆H₁₁NO; Nylon-6 can be formed by ring-opening polymerization of Caprolactam OR polycondensation of 6-Aminohexanoic acid.'
    },
    {
      id: '6-aminohexanoic-acid',
      catKey: 'aminoacid',
      elements: ['N','C','C','C','C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[6,8,1]],
      name: '6-Aminohexanoic acid (ε-Aminocaproic acid)',
      nameEn: '6-Aminohexanoic acid (Aminocaproic acid)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (bột tinh thể trắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Monomer trực tiếp tham gia phản ứng trùng ngưng tạo Tơ Nylon-6 (tơ Capron), đồng thời dùng trong y học làm thuốc cầm máu (ức chế tiêu sợi huyết) sau phẫu thuật tim mạch, nha khoa.',
      realLifeEn: 'Polycondensation monomer for Nylon-6 (Capron) fiber and clinically approved antifibrinolytic medication used to prevent excessive surgical bleeding.',
      reactions: [
        'Trùng ngưng khi đun nóng loại nước tạo Tơ Nylon-6 (tơ Capron) — phản ứng trùng ngưng điển hình của ε-amino acid.',
        'Có tính lưỡng tính: phản ứng với cả dung dịch HCl lẫn dung dịch NaOH tỉ lệ 1 : 1.',
        'Thu được trực tiếp khi thủy phân mở vòng Caprolactam trong nước.'
      ],
      reactionsEn: [
        'Self-polycondenses upon heating with water elimination to yield Nylon-6 (Capron).',
        'Amphoteric amino acid reacting 1:1 with both aqueous HCl and NaOH.',
        'Produced by ring-opening hydrolysis of ε-Caprolactam.'
      ],
      note: 'Công thức H₂N–(CH₂)₅–COOH (C₆H₁₃NO₂); là ε-amino acid (nhóm -NH₂ ở vị trí C số 6, KHÔNG phải α-amino acid trong protein).',
      noteEn: 'Formula C₆H₁₃NO₂; synthetic ε-amino acid (not found in natural proteins) used for Nylon-6.'
    },
    {
      id: 'methylhydrazine',
      catKey: 'amine',
      elements: ['C','N','N'],
      bonds: [[0,1,1],[1,2,1]],
      name: 'Methylhydrazine (MMH)',
      nameEn: 'Methylhydrazine (MMH)',
      category: 'Amine / Hydrazine',
      categoryEn: 'Amine / Hydrazine',
      state: 'Lỏng không màu (mùi khai ammonia rất mạnh, dễ cháy)',
      stateEn: 'Colorless volatile liquid (strong ammonia odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Nhiên liệu đẩy tàu vũ trụ nổi tiếng (từng dùng trong động cơ hạ cánh mặt trăng Apollo, tàu con thoi và hệ thống điều khiển quỹ đạo vệ tinh ngày nay) do tự bốc cháy tức thì (hypergolic) không cần bugi đánh lửa khi tiếp xúc chất oxy hóa N₂O₄ ngoài chân không vũ trụ.',
      realLifeEn: 'Famous space-propulsion hypergolic rocket fuel powering Apollo Lunar Module thrusters, Space Shuttle orbital engines, and satellite attitude rockets — igniting spontaneously on contact with N₂O₄.',
      reactions: [
        'Tự bốc cháy nổ tức thì khi chạm chất oxy hóa Dinitrogen tetroxide (N₂O₄) mà không cần tia lửa mồi.',
        'Có tính base và tính khử rất mạnh, tạo muối với HCl và phản ứng nhanh với Aldehyde tạo Hydrazone.',
        'Mang liên kết đơn N–N giàu năng lượng tương tự Hydrazine.'
      ],
      reactionsEn: [
        'Ignites hypergolically upon mixing with N₂O₄ oxidizer in vacuum without ignition sparks.',
        'Strong base and potent reducing agent; condenses cleanly with aldehydes to methylhydrazones.',
        'Contains an energetic N–N hydrazine linkage.'
      ],
      note: 'Công thức CH₃NHNH₂ (CH₆N₂); hợp chất dị tố C–N–N tiêu biểu trong công nghệ hàng không vũ trụ.',
      noteEn: 'Formula CH₆N₂; signature C–N–N hydrazine propellant in spacecraft engineering.'
    },
    {
      id: 'phenylalanine',
      catKey: 'aminoacid',
      elements: [...C6_AROM,'C','C','N','C','O','O'],
      bonds: [...BENZENE,[0,6,1],[6,7,1],[7,8,1],[7,9,1],[9,10,2],[9,11,1]],
      name: 'Phenylalanine (Phe)',
      nameEn: 'Phenylalanine (Phe)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (tinh thể trắng vị hơi đắng)',
      stateEn: 'Solid (white crystals)',
      solubility: 'Tan ít trong nước (~2,7 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~2.7 g/100 mL)',
      realLife: 'α-Amino acid thiết yếu giàu vòng thơm tự nhiên trong thịt, sữa, trứng; là nguyên liệu tổng hợp chất tạo ngọt ít calo Aspartame (trong nước ngọt không đường) và tiền chất tạo chất dẫn truyền thần kinh Dopamine.',
      realLifeEn: 'Essential aromatic α-amino acid abundant in protein foods; converted industrially into zero-calorie sweetener Aspartame and biologically into Dopamine.',
      reactions: [
        'Có tính lưỡng tính: phản ứng với HCl và NaOH tỉ lệ 1 : 1; dung dịch nước hầu như trung tính (không đổi màu quỳ tím).',
        'Vòng thơm vẫn tham gia phản ứng thế ái điện tử (như nitro hóa với HNO₃ đặc) tạo dẫn xuất màu vàng đặc trưng (phản ứng Xanthoproteic của protein!).',
        'Trùng ngưng ghép chuỗi peptide cùng các amino acid khác.'
      ],
      reactionsEn: [
        'Amphoteric zwitterion reacting 1:1 with both HCl and NaOH; neutral solution leaves litmus unchanged.',
        'Aromatic side chain undergoes nitration with conc. HNO₃ giving the yellow Xanthoproteic protein test.',
        'Couples via peptide bonds into hydrophobic interiors of folded proteins.'
      ],
      note: 'Công thức C₉H₁₁NO₂ (M = 165,2); vòng thơm trong gốc -CH₂-C₆H₅ là nguyên nhân khiến lòng trắng trứng hóa vàng khi nhỏ HNO₃ đặc.',
      noteEn: 'Formula C₉H₁₁NO₂ (M = 165.19 g/mol); its benzene ring accounts for the classic yellow Xanthoproteic protein test.'
    },
    {
      id: 'aspartic-acid',
      catKey: 'aminoacid',
      elements: ['C','C','C','C','N','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[1,4,1],[0,5,2],[0,6,1],[3,7,2],[3,8,1]],
      name: 'Aspartic acid (Asp)',
      nameEn: 'Aspartic acid (Asp)',
      category: 'Amino acid',
      categoryEn: 'Amino acid',
      state: 'Rắn (tinh thể trắng vị hơi chua)',
      stateEn: 'Solid (white sourish crystals)',
      solubility: 'Ít tan trong nước lạnh (~0,5 g/100 mL)',
      solubilityEn: 'Sparingly soluble in cold water',
      realLife: 'Một trong hai amino acid mang tính acid tạo nên protein (cùng Glutamic acid), từng phân lập từ măng tây; kết hợp với Phenylalanine tạo ra chất tạo ngọt Aspartame ngọt gấp ~200 lần đường mía.',
      realLifeEn: 'One of two acidic proteinogenic amino acids (alongside Glutamic acid), first isolated from asparagus and combined with Phenylalanine to make Aspartame sweetener.',
      reactions: [
        'Dung dịch nước LÀM QUỲ TÍM HÓA ĐỎ do phân tử có 2 nhóm -COOH và chỉ 1 nhóm -NH₂ (tương tự Glutamic acid).',
        'Tác dụng với dung dịch NaOH tối đa theo tỉ lệ mol 1 : 2 và tác dụng với HCl theo tỉ lệ 1 : 1.',
        'Tham gia chu trình chuyển amine và tổng hợp urea trong gan.'
      ],
      reactionsEn: [
        'Turns blue LITMUS RED (pI ≈ 2.8) because two -COOH groups outnumber one -NH₂ group.',
        'Consumes 2 equivalents of NaOH upon complete neutralization versus 1 equivalent of HCl.',
        'Plays a vital role in hepatic urea-cycle nitrogen metabolism.'
      ],
      note: 'Công thức C₄H₇NO₄ (M = 133,1); đồng đẳng kế tiếp ngay dưới Glutamic acid (chỉ kém đúng 1 nhóm -CH₂-).',
      noteEn: 'Formula C₄H₇NO₄ (M = 133.10 g/mol); one methylene group shorter than Glutamic acid.'
    },
    {
      id: 'glycylglycine',
      catKey: 'aminoacid',
      elements: ['N','C','C','O','N','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1],[4,5,1],[5,6,1],[6,7,2],[6,8,1]],
      name: 'Glycylglycine (Gly-Gly)',
      nameEn: 'Glycylglycine (Gly-Gly)',
      category: 'Dipeptide',
      categoryEn: 'Dipeptide',
      state: 'Rắn (tinh thể trắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water',
      realLife: 'Dipeptide đơn giản nhất được ghép từ hai phân tử Glycine qua một liên kết peptide (–CO–NH–); thường dùng làm chất đệm pH chuẩn trong sinh hóa, phòng thí nghiệm và mô hình học tập cơ bản về thủy phân peptide.',
      realLifeEn: 'Simplest dipeptide formed from two Glycine units joined by one peptide bond; widely used as a biochemical pH buffer and textbook peptide hydrolysis model.',
      reactions: [
        'KHÔNG cho phản ứng màu Biuret tím với Cu(OH)₂/NaOH (phải từ Tripeptide chứa ít nhất 2 liên kết peptide trở lên mới có phản ứng màu Biuret!).',
        'Thủy phân hoàn toàn trong dung dịch acid HCl dư (đun nóng) tạo 2 mol muối ClH₃N–CH₂–COOH; trong NaOH dư tạo 2 mol H₂N–CH₂–COONa và 1 H₂O.',
        'Tác dụng với cả HCl (tỉ lệ 1 : 2 khi thủy phân) và NaOH (tỉ lệ 1 : 2 khi thủy phân).'
      ],
      reactionsEn: [
        'NEGATIVE to the purple Biuret Cu(OH)₂ test (requires tripeptides or longer with ≥ 2 peptide bonds!).',
        'Complete hydrolysis in hot HCl or NaOH breaks the single peptide bond to yield 2 equivalents of Glycine salts.',
        'Consumes 2 moles of NaOH per mole upon complete alkaline hydrolysis (releasing 1 mole H₂O).'
      ],
      note: 'Công thức C₄H₈N₂O₃ (M = 132,1); câu hỏi bẫy kinh điển Hóa 12: Dipeptide Gly-Gly KHÔNG có phản ứng màu Biuret!',
      noteEn: 'Formula C₄H₈N₂O₃ (M = 132.12 g/mol); classic Grade 12 trap: dipeptides give NO violet Biuret color.'
    },
    {
      id: 'caffeine',
      catKey: 'heterocycle',
      elements: ['N','C','N','C','C','C','N','C','N','C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,2],[4,5,1],[5,0,1],[4,6,1],[6,7,1],[7,8,2],[8,3,1],[0,9,1],[2,10,1],[6,11,1],[1,12,2],[5,13,2]],
      name: 'Caffeine',
      nameEn: 'Caffeine',
      category: 'Alkaloid / Heterocycle',
      categoryEn: 'Alkaloid / Heterocycle',
      state: 'Rắn (tinh thể hình kim trắng mượt, vị đắng)',
      stateEn: 'Solid (silky white bitter needles)',
      solubility: 'Tan vừa trong nước lạnh, tan rất tốt trong nước nóng',
      solubilityEn: 'Moderately soluble cold; freely soluble in hot water',
      realLife: 'Alkaloid kích thích hệ thần kinh trung ương phổ biến nhất hành tinh, có tự nhiên trong hạt cà phê, lá trà xanh, hạt cacao và ca cao cola; giúp tăng tỉnh táo, tập trung và giảm mệt mỏi tạm thời.',
      realLifeEn: 'World’s most widely consumed natural psychoactive alkaloid found in coffee beans, tea leaves, and cacao; blocks adenosine receptors to promote alertness.',
      reactions: [
        'Có tính base CỰC YẾU do các cặp electron của Nitrogen tham gia liên hợp trong hệ vòng purine (chỉ tạo muối yếu với acid mạnh).',
        'Không bị thủy phân dễ dàng như ester thường nhưng vòng purine bền vững khi pha chế đun sôi nước pha trà, cà phê.',
        'Dễ thăng hoa trực tiếp ở khoảng 178 °C tạo tinh thể hình kim trắng tinh khiết.'
      ],
      reactionsEn: [
        'Extremely weak base because its Nitrogen lone pairs delocalize into the fused xanthine aromatic ring system.',
        'Thermally stable to coffee roasting and boiling-water extraction; sublimes cleanly around 178 °C.',
        'Dissolves cleanly into dichloromethane during laboratory coffee/tea liquid–liquid extraction.'
      ],
      note: 'Công thức C₈H₁₀N₄O₂ (M = 194,2); khung nhân xanthine gồm vòng 6 cạnh hợp nhất với vòng 5 cạnh chứa 4 nguyên tử Nitrogen.',
      noteEn: 'Formula C₈H₁₀N₄O₂ (M = 194.19 g/mol); methylxanthine purine heterocycle.'
    },
    {
      id: 'nicotine',
      catKey: 'heterocycle',
      elements: ['C','C','C','C','C','N','C','C','C','C','N','C'],
      bonds: [...BENZENE,[1,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,1],[10,6,1],[10,11,1]],
      name: 'Nicotine',
      nameEn: 'Nicotine',
      category: 'Alkaloid / Heterocycle',
      categoryEn: 'Alkaloid / Heterocycle',
      state: 'Lỏng sánh không màu (hóa nâu ngoài không khí, mùi thuốc lá hắc)',
      stateEn: 'Colorless oily liquid (browns in air, sharp tobacco odor)',
      solubility: 'Tan vô hạn trong nước dưới 60 °C',
      solubilityEn: 'Miscible with water below 60 °C',
      realLife: 'Alkaloid gây nghiện mạnh có trong lá cây thuốc lá và thuốc lào (với lượng rất nhỏ trong cà chua, khoai tây họ Cà); tác động nhanh lên thụ thể acetylcholine thần kinh gây lệ thuộc và hại tim mạch, đồng thời từng được dùng làm thuốc trừ sâu tự nhiên.',
      realLifeEn: 'Addictive pyridine-pyrrolidine alkaloid concentrated in tobacco leaves; acts rapidly on brain nicotinic receptors and serves ecologically as a natural plant insecticide.',
      reactions: [
        'Chứa HAI nguyên tử Nitrogen dị vòng (một nhân Pyridine yếu và một nhân Pyrrolidine bậc ba mạnh hơn), nên có tính base rõ rệt, tác dụng với HCl theo tỉ lệ tối đa 1 : 2.',
        'Dễ bị oxi hóa bởi KMnO₄ đun nóng cắt nhánh vòng 5 cạnh chuyển vòng Pyridine thành Nicotinic acid (Vitamin B3 / Niacin!).',
        'Làm xanh nhẹ giấy quỳ tím ẩm.'
      ],
      reactionsEn: [
        'Dibasic alkaloid combining a weak pyridine Nitrogen and a stronger tertiary pyrrolidine Nitrogen (reacting up to 1:2 with HCl).',
        'Vigorous oxidation with KMnO₄ or HNO₃ cleaves the pyrrolidine ring cleanly into Nicotinic acid (Vitamin B3)!',
        'Turns moist red litmus paper blue.'
      ],
      note: 'Công thức C₁₀H₁₄N₂; điểm thú vị: oxi hóa chất độc Nicotine lại tạo thành Vitamin B3 (Nicotinic acid).',
      noteEn: 'Formula C₁₀H₁₄N₂; classic chemical irony: oxidizing toxic Nicotine yields essential Vitamin B3 (Niacin).'
    },
    {
      id: 'methyl-propionate',
      catKey: 'ester',
      elements: ['C','C','C','O','O','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1],[4,5,1]],
      name: 'Methyl propionate (Methyl propanoate)',
      nameEn: 'Methyl propionate (Methyl propanoate)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm ngọt giống trái cây và rượu rum)',
      stateEn: 'Colorless volatile liquid (fruity rum-like scent)',
      solubility: 'Tan ít trong nước (~6 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~6 g/100 mL)',
      realLife: 'Dung môi công nghiệp cho sơn cellulose, mực in và hương liệu tổng hợp vị trái cây chín; cũng là nguyên liệu trung gian điều chế Methyl methacrylate theo công nghệ xanh hiện đại.',
      realLifeEn: 'Sweet-smelling solvent for lacquers and flavorings, and key green-chemistry feedstock converted into Methyl methacrylate.',
      reactions: [
        'Xà phòng hóa trong dung dịch NaOH đun nóng tạo muối Sodium propionate (C₂H₅COONa) và Methanol.',
        'Không có phản ứng tráng bạc với AgNO₃/NH₃ và không làm mất màu nước Br₂.',
        'Điều chế bằng phản ứng ester hóa Propionic acid với Methanol (H₂SO₄ đặc, t°).'
      ],
      reactionsEn: [
        'Saponifies cleanly with hot aqueous NaOH into Sodium propionate and Methanol.',
        'Negative to Tollens reagent and cold bromine water.',
        'Prepared via Fischer esterification of Propionic acid and Methanol.'
      ],
      note: 'Công thức C₄H₈O₂; một trong 4 đồng phân ester no đơn chức của C₄H₈O₂ (cùng Ethyl acetate, Propyl formate, Isopropyl formate).',
      noteEn: 'Formula C₄H₈O₂; one of four saturated aliphatic ester isomers of C₄H₈O₂.'
    },
    {
      id: 'propyl-formate',
      catKey: 'ester',
      elements: ['C','O','O','C','C','C'],
      bonds: [[0,1,2],[0,2,1],[2,3,1],[3,4,1],[4,5,1]],
      name: 'Propyl formate (Propyl methanoate)',
      nameEn: 'Propyl formate (Propyl methanoate)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm lê và quả mận chín)',
      stateEn: 'Colorless liquid (pear/plum aroma)',
      solubility: 'Ít tan trong nước (~2,2 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~2.2 g/100 mL)',
      realLife: 'Ester có mùi thơm dịu của quả lê và mận chín dùng trong công nghiệp thực phẩm tạo hương hoa quả và làm dung môi cho nhựa tổng hợp.',
      realLifeEn: 'Pleasant pear- and plum-scented ester employed in fruit flavorings and specialty resin solvents.',
      reactions: [
        'Vẫn có nhóm HCOO– nên THAM GIA phản ứng tráng bạc với dung dịch AgNO₃/NH₃ tạo 2 mol Ag.',
        'Xà phòng hóa với dung dịch NaOH đun nóng tạo muối Sodium formate (HCOONa) và Propan-1-ol.',
        'Làm mất màu dung dịch nước Br₂ khi đun nhẹ nhờ đầu formate có tính khử.'
      ],
      reactionsEn: [
        'Retains an HCOO– formate headgroup and therefore produces a positive Tollens silver-mirror reaction.',
        'Saponifies with aqueous NaOH into Sodium formate and Propan-1-ol.',
        'Reduces mild oxidants like bromine water upon warming.'
      ],
      note: 'Công thức C₄H₈O₂; giúp phân biệt với hai đồng phân Ethyl acetate và Methyl propionate nhờ phản ứng tráng bạc dương tính.',
      noteEn: 'Formula C₄H₈O₂; Tollens-positive ester isomer of Ethyl acetate and Methyl propionate.'
    },
    {
      id: 'butyl-acetate',
      catKey: 'ester',
      elements: ['C','C','O','O','C','C','C','C'],
      bonds: [[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1]],
      name: 'Butyl acetate',
      nameEn: 'Butyl acetate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi chuối và lê chín dễ chịu)',
      stateEn: 'Colorless liquid (sweet banana/pear odor)',
      solubility: 'Rất ít tan trong nước (~0,7 g/100 mL)',
      solubilityEn: 'Very slightly soluble in water (~0.7 g/100 mL)',
      realLife: 'Dung môi sơn công nghiệp cực kỳ phổ biến trong sơn gỗ PU, sơn ô tô, sơn móng tay và mực in vì bốc hơi ở tốc độ vừa phải giúp màng sơn bóng mịn không bị đục ẩm; đồng thời có tự nhiên tạo hương trong quả táo chín.',
      realLifeEn: 'Premier industrial lacquer and automotive paint solvent prized for its balanced evaporation rate, and natural aroma ester in crisp apples.',
      reactions: [
        'Xà phòng hóa với dung dịch NaOH đun nóng thu được muối Sodium acetate và Butan-1-ol.',
        'Điều chế bằng phản ứng ester hóa Acetic acid và Butan-1-ol có mặt H₂SO₄ đặc đun nóng.',
        'Nổi tách lớp rõ rệt trên mặt nước và không phản ứng với Na kim loại.'
      ],
      reactionsEn: [
        'Hot NaOH hydrolysis yields Sodium acetate and Butan-1-ol cleanly.',
        'Synthesized commercially by Fischer esterification of Acetic acid with Butan-1-ol.',
        'Floats cleanly above water and shows zero reactivity toward Na metal.'
      ],
      note: 'Công thức C₆H₁₂O₂; đồng phân ester rất quan trọng cùng Ethyl butyrate.',
      noteEn: 'Formula C₆H₁₂O₂; isomeric with pineapple-scented Ethyl butyrate.'
    },
    {
      id: 'methyl-benzoate',
      catKey: 'ester',
      elements: [...C6_AROM,'C','O','O','C'],
      bonds: [...BENZENE,[0,6,1],[6,7,2],[6,8,1],[8,9,1]],
      name: 'Methyl benzoate',
      nameEn: 'Methyl benzoate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm nồng của quả ổi và hoa ngọc lan)',
      stateEn: 'Colorless oily liquid (fruity/ylang-ylang floral odor)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Ester thơm tạo mùi hương tự nhiên trong hoa ngọc lan tây, đinh hương và quả ổi chín; được sử dụng làm nước hoa, hương liệu thực phẩm, dung môi nhựa tổng hợp và dẫn dụ côn trùng nghiên cứu.',
      realLifeEn: 'Natural floral-fruity ester found in ylang-ylang and guava blossoms, used in fine perfumery and organic synthesis.',
      reactions: [
        'Xà phòng hóa với dung dịch NaOH đun nóng theo tỉ lệ mol 1 : 1 tạo muối Sodium benzoate và Methanol (KHÁC Phenyl acetate tỉ lệ 1 : 2!).',
        'Khi acid hóa dung dịch sau thủy phân bằng HCl và làm lạnh thấy kết tủa trắng Benzoic acid tách ra.',
        'Điều chế bằng phản ứng ester hóa Benzoic acid với Methanol (xt H₂SO₄ đặc, t°).'
      ],
      reactionsEn: [
        'Saponifies 1:1 with NaOH to Sodium benzoate and Methanol (unlike 1:2 isomer Phenyl acetate!).',
        'Acidifying the cooled hydrolysate precipitates pure white Benzoic acid.',
        'Prepared via direct Fischer esterification of Benzoic acid and Methanol.'
      ],
      note: 'Công thức C₈H₈O₂; cặp bẫy kinh điển cùng Phenyl acetate: cùng C₈H₈O₂ nhưng Methyl benzoate phản ứng NaOH tỉ lệ 1 : 1 còn Phenyl acetate tỉ lệ 1 : 2!',
      noteEn: 'Formula C₈H₈O₂; classic contrast with isomer Phenyl acetate: Methyl benzoate consumes 1 NaOH (giving Methanol), whereas Phenyl acetate consumes 2 NaOH.'
    },
    {
      id: 'ethyl-benzoate',
      catKey: 'ester',
      elements: [...C6_AROM,'C','O','O','C','C'],
      bonds: [...BENZENE,[0,6,1],[6,7,2],[6,8,1],[8,9,1],[9,10,1]],
      name: 'Ethyl benzoate',
      nameEn: 'Ethyl benzoate',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm bạc hà pha quả anh đào nhẹ)',
      stateEn: 'Colorless liquid (minty-cherry floral aroma)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Thành phần hương liệu trong nước hoa, tinh dầu trái cây anh đào nhân tạo và dùng làm chất trợ xúc tác chọn lọc khi trùng hợp nhựa Polypropylene (PP) công nghiệp.',
      realLifeEn: 'Fragrance ester with a pleasant cherry-wintergreen aroma, also serving as an industrial Ziegler–Natta catalyst modifier for Polypropylene.',
      reactions: [
        'Xà phòng hóa với dung dịch NaOH đun nóng theo tỉ lệ 1 : 1 thu được Sodium benzoate và Ethanol.',
        'Điều chế từ Benzoic acid và Ethanol đun hồi lưu với xúc tác H₂SO₄ đặc.',
        'Không làm mất màu nước Br₂ và không phản ứng với Na kim loại.'
      ],
      reactionsEn: [
        'Hot NaOH saponification (1:1) yields Sodium benzoate and Ethanol cleanly.',
        'Synthesized by acid-catalyzed esterification of Benzoic acid and Ethanol.',
        'Unreactive toward metallic Na and cold bromine water.'
      ],
      note: 'Công thức C₉H₁₀O₂; đồng phân với Benzyl acetate (CH₃COOCH₂C₆H₅).',
      noteEn: 'Formula C₉H₁₀O₂; constitutional isomer of jasmine-scented Benzyl acetate.'
    },
    {
      id: 'benzyl-acetate',
      catKey: 'ester',
      elements: [...C6_AROM,'C','O','C','O','C'],
      bonds: [...BENZENE,[0,6,1],[6,7,1],[7,8,1],[8,9,2],[8,10,1]],
      name: 'Benzyl acetate (Hương hoa nhài)',
      nameEn: 'Benzyl acetate (Jasmine ester)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (mùi thơm ngào ngạt đặc trưng của hoa nhài)',
      stateEn: 'Colorless liquid (rich jasmine floral aroma)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Thành phần chính (~65%) tạo nên hương thơm quyến rũ của tinh dầu hoa nhài (hoa lài) và ngọc lan tây; được ứng dụng rộng rãi trong sản xuất nước hoa cao cấp, xà phòng thơm, nước xả vải và mỹ phẩm.',
      realLifeEn: 'Principal aroma constituent of natural jasmine and ylang-ylang essential oils, indispensable in fine perfumery, soaps, and cosmetics.',
      reactions: [
        'Xà phòng hóa trong dung dịch NaOH đun nóng theo tỉ lệ mol 1 : 1 tạo Sodium acetate và Benzyl alcohol (lưu ý: không phải tỉ lệ 1 : 2 vì -CH₂- ngăn cách vòng thơm!).',
        'Điều chế bằng phản ứng ester hóa Acetic acid với Benzyl alcohol hoặc từ Benzyl chloride với Sodium acetate.',
        'Không làm đổi màu quỳ tím và không phản ứng với Na.'
      ],
      reactionsEn: [
        'Consumes only 1 equivalent of NaOH (unlike phenolic esters!) to produce Sodium acetate and Benzyl alcohol.',
        'Synthesized by esterifying Acetic acid with Benzyl alcohol or reacting Benzyl chloride with Sodium acetate.',
        'Neutral to litmus and inert toward metallic Na.'
      ],
      note: 'Công thức C₉H₁₀O₂; đừng nhầm với ester của Phenol — Benzyl acetate có cầu -CH₂- nên chỉ tác dụng với NaOH theo tỉ lệ 1 : 1.',
      noteEn: 'Formula C₉H₁₀O₂; remember that the -CH₂- spacer makes it an ordinary 1:1-saponifying benzylic ester rather than a phenolic ester.'
    },
    {
      id: 'dimethyl-oxalate',
      catKey: 'ester',
      elements: ['C','O','C','O','C','O','O','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1],[4,5,2],[4,6,1],[6,7,1]],
      name: 'Dimethyl oxalate',
      nameEn: 'Dimethyl oxalate',
      category: 'Ester (Diester)',
      categoryEn: 'Ester (Diester)',
      state: 'Rắn (tinh thể trắng tinh khiết, nóng chảy ở 54 °C)',
      stateEn: 'Solid (white crystals, mp 54 °C)',
      solubility: 'Ít tan trong nước lạnh, phản ứng thủy phân chậm trong nước nóng',
      solubilityEn: 'Slightly soluble cold; slowly hydrolyzes in warm water',
      realLife: 'Diester đơn giản nhất (ở trạng thái rắn tinh thể chứ không phải chất lỏng như các ester đơn chức nhỏ), là hóa chất trung gian xanh sản xuất Ethylene glycol từ khí tổng hợp CO + H₂ và dùng làm chất tạo hương.',
      realLifeEn: 'Simplest symmetrical diester (unusually a crystalline solid at room temperature); key syngas-derived intermediate for manufacturing Ethylene glycol from coal/CO.',
      reactions: [
        'Xà phòng hóa trong dung dịch NaOH theo tỉ lệ mol 1 : 2 tạo muối Disodium oxalate (Na₂C₂O₄) và 2 mol Methanol.',
        'Cộng H₂ có xúc tác đồng ở áp suất cao khử cả hai nhóm ester tạo Ethylene glycol và 2 Methanol.',
        'Thủy phân với dung dịch NH₃ tạo tinh thể Oxamide.'
      ],
      reactionsEn: [
        'Saponifies 1:2 with NaOH to yield Disodium oxalate and 2 equivalents of Methanol.',
        'Catalytic hydrogenation over copper reduces both ester groups cleanly into Ethylene glycol + Methanol.',
        'Reacts with aqueous Ammonia to precipitate Oxamide.'
      ],
      note: 'Công thức (COOCH₃)₂ (C₄H₆O₄); ester hai chức no đơn giản nhất thường dùng trong bài toán thủy phân 1 : 2 NaOH.',
      noteEn: 'Formula C₄H₆O₄; simplest saturated diester frequently featured in 1:2 NaOH saponification stoichiometry.'
    },
    {
      id: 'carbonic-acid',
      catKey: 'carboxylic',
      elements: ['C','O','O','O'],
      bonds: [[0,1,2],[0,2,1],[0,3,1]],
      name: 'Carbonic acid',
      nameEn: 'Carbonic acid',
      category: 'Acid yếu (H₂CO₃)',
      categoryEn: 'Weak acid (H₂CO₃)',
      state: 'Tồn tại chủ yếu trong dung dịch nước có khí CO₂ hòa tan',
      stateEn: 'Exists primarily in CO₂-saturated aqueous solution',
      solubility: 'Cân bằng trong nước',
      solubilityEn: 'Aqueous CO₂ equilibrium',
      realLife: 'Acid yếu tạo cảm giác tê cay sảng khoái trong nước giải khát có ga (nước ngọt, bia, soda) khi nén khí CO₂ dưới áp suất cao; đồng thời cặp đệm bicarbonate/carbonic acid đóng vai trò sống còn giữ ổn định pH máu người quanh mức 7,4.',
      realLifeEn: 'Provides the crisp tangy fizz in carbonated sodas and sparkling water, while the bicarbonate buffer system maintains human blood pH strictly around 7.4.',
      reactions: [
        'Kém bền, dễ phân hủy ngay ở nhiệt độ thường tạo khí CO₂ và H₂O: H₂CO₃ ⇌ H₂O + CO₂↑.',
        'Tác dụng với kiềm NaOH tạo muối acid NaHCO₃ (baking soda) hoặc muối trung hòa Na₂CO₃ (soda).',
        'Yếu hơn cả Acetic acid và Formic acid nên bị các carboxylic acid đẩy ra khỏi muối carbonate dưới dạng khí CO₂.'
      ],
      reactionsEn: [
        'Decomposes reversibly into dissolved CO₂ gas and water: H₂CO₃ ⇌ H₂O + CO₂↑.',
        'Neutralizes NaOH stepwise to Bicarbonate (HCO₃⁻) and Carbonate (CO₃²⁻) salts.',
        'Weaker than Carboxylic acids (but stronger than Phenol!), enabling Acetic acid to fizz CO₂ from NaHCO₃.'
      ],
      note: 'Công thức H₂CO₃ (CH₂O₃); cầu nối so sánh lực acid chuẩn: HCl > Carboxylic acid > H₂CO₃ > Phenol.',
      noteEn: 'Formula H₂CO₃ (CH₂O₃); fundamental acidity reference point: Carboxylic acids > H₂CO₃ > Phenol.'
    },
    {
      id: 'isobutyric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1],[3,4,2],[3,5,1]],
      name: 'Isobutyric acid (2-Methylpropanoic acid)',
      nameEn: 'Isobutyric acid (2-Methylpropanoic acid)',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng không màu (mùi hăng chua giống Butyric acid)',
      stateEn: 'Colorless liquid (pungent odor)',
      solubility: 'Tan khá tốt trong nước (~20 g/100 mL)',
      solubilityEn: 'Soluble in water (~20 g/100 mL)',
      realLife: 'Xuất hiện tự nhiên trong quả cây minh quyết (carob) và mật ong; các ester của nó mang mùi thơm dịu trái cây dùng làm hương liệu thực phẩm, đồng thời làm nguyên liệu tổng hợp Methacrylic acid.',
      realLifeEn: 'Occurs naturally in carob pods and vanilla; its esters provide pleasant fruity flavorings and it is dehydrogenated industrially to Methacrylic acid.',
      reactions: [
        'Làm quỳ tím hóa đỏ, tác dụng với NaOH, Mg/Zn và giải phóng khí CO₂ với Na₂CO₃/NaHCO₃.',
        'Ester hóa với Ethanol (xt H₂SO₄ đặc, t°) tạo Ethyl isobutyrate có mùi thơm dứa táo.',
        'Oxi hóa tách H₂ có xúc tác chuyển hóa thành Methacrylic acid (monomer nhựa thủy tinh hữu cơ).'
      ],
      reactionsEn: [
        'Standard Carboxylic acid reactivity with litmus, bases, active metals, and carbonates.',
        'Esterifies with Ethanol to yield sweet fruit-scented Ethyl isobutyrate.',
        'Oxidative dehydrogenation manufactures Methacrylic acid monomer.'
      ],
      note: 'Công thức C₄H₈O₂; là đồng phân carboxylic acid mạch nhánh duy nhất của Butyric acid.',
      noteEn: 'Formula C₄H₈O₂; the sole branched carboxylic acid isomer of Butyric acid.'
    },
    {
      id: 'valeric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,2],[4,6,1]],
      name: 'Valeric acid (Pentanoic acid)',
      nameEn: 'Valeric acid (Pentanoic acid)',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Lỏng không màu (mùi hắc nồng đặc trưng)',
      stateEn: 'Colorless oily liquid (unpleasant pungent odor)',
      solubility: 'Tan ít trong nước (~2,4 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~2.4 g/100 mL)',
      realLife: 'Được tìm thấy tự nhiên trong rễ cây nữ lang (Valeriana officinalis — thảo dược an thần giúp ngủ ngon); dù bản thân acid có mùi rất khó chịu nhưng các ester bay hơi của nó lại có hương táo, mơ thơm ngát dùng làm mỹ phẩm và dầu bôi trơn tổng hợp.',
      realLifeEn: 'Named after the sedative valerian root (Valeriana officinalis); though foul-smelling on its own, its volatile esters deliver fruity aromas and synthetic lubricants.',
      reactions: [
        'Làm quỳ tím hóa đỏ, trung hòa NaOH tỉ lệ 1 : 1 và sủi bọt khí CO₂ với NaHCO₃.',
        'Ester hóa với Methanol hoặc Ethanol (H₂SO₄ đặc, t°) tạo ester có mùi táo chín.',
        'Oxi hóa nhẹ tại chuỗi carbon kém hoạt động hơn so với acid không no.'
      ],
      reactionsEn: [
        'Turns litmus red, neutralizes bases cleanly, and liberates CO₂ from bicarbonates.',
        'Fischer esterification with simple alcohols produces apple-scented esters.',
        'Saturated chain resists cold bromine water and KMnO₄.'
      ],
      note: 'Công thức C₅H₁₀O₂ (Pentanoic acid); ví dụ cho thấy độ tan trong nước giảm mạnh khi mạch alkyl kéo dài lên 5 Carbon.',
      noteEn: 'Formula C₅H₁₀O₂ (Pentanoic acid); highlights decreasing water solubility at 5 carbons.'
    },
    {
      id: 'glutaric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','C','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[0,5,2],[0,6,1],[4,7,2],[4,8,1]],
      name: 'Glutaric acid (Pentanedioic acid)',
      nameEn: 'Glutaric acid (Pentanedioic acid)',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể không màu)',
      stateEn: 'Solid (colorless crystals)',
      solubility: 'Tan rất tốt trong nước (~64 g/100 mL)',
      solubilityEn: 'Very soluble in water (~64 g/100 mL)',
      realLife: 'Acid hai chức mạch 5 Carbon sinh ra tự nhiên trong cơ thể từ quá trình chuyển hóa các amino acid Lysine và Tryptophan; trong công nghiệp dùng sản xuất chất hóa dẻo polymer và chất tẩy rửa sinh học.',
      realLifeEn: 'Natural 5-carbon dicarboxylic acid generated during bodily Lysine and Tryptophan metabolism, and industrially polymerized into specialty resins and polyesters.',
      reactions: [
        'Tác dụng với NaOH theo tỉ lệ mol 1 : 2 và làm quỳ tím hóa đỏ.',
        'Đun nóng tách nước đóng vòng dễ dàng tạo thành vòng 6 cạnh bền Glutaric anhydride.',
        'Trùng ngưng với diol hoặc diamine tạo polyester / polyamide mạch 5 Carbon.'
      ],
      reactionsEn: [
        'Consumes 2 moles of NaOH per mole upon neutralization and turns litmus red.',
        'Thermal dehydration cyclizes cleanly into a 6-membered cyclic Glutaric anhydride.',
        'Condenses with diols and diamines into polyesters and nylons.'
      ],
      note: 'Công thức C₅H₈O₄ (Pentanedioic acid); nằm giữa Succinic acid (C4) và Adipic acid (C6) trong dãy đồng đẳng diacid (Oxalic – Malonic – Succinic – Glutaric – Adipic).',
      noteEn: 'Formula C₅H₈O₄; completes the classic C2–C6 dicarboxylic acid series ("OMSGAP").'
    },
    {
      id: 'isophthalic-acid',
      catKey: 'carboxylic',
      elements: [...C6_AROM,'C','O','O','C','O','O'],
      bonds: [...BENZENE,[0,6,1],[6,7,2],[6,8,1],[2,9,1],[9,10,2],[9,11,1]],
      name: 'Isophthalic acid',
      nameEn: 'Isophthalic acid',
      category: 'Carboxylic acid',
      categoryEn: 'Carboxylic acid',
      state: 'Rắn (tinh thể trắng không mùi)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Hầu như không tan trong nước lạnh',
      solubilityEn: 'Practically insoluble in cold water',
      realLife: 'Đồng phân meta của Terephthalic acid, được phối trộn một tỉ lệ nhỏ trong sản xuất chai nhựa PET cao cấp giúp tăng độ trong suốt như thủy tinh và ngăn khí CO₂ thoát ra ngoài chai nước ngọt có ga.',
      realLifeEn: 'Meta-isomer of Terephthalic acid co-polymerized into PET bottle resins to prevent crystallization haze and improve CO₂ barrier retention in soda bottles.',
      reactions: [
        'Tác dụng với NaOH theo tỉ lệ mol 1 : 2 tạo muối tan trong nước.',
        'Được điều chế bằng cách oxi hóa m-Xylene bằng không khí hoặc KMnO₄ đun nóng.',
        'Không thể tự tách nước đóng vòng nội phân tử như Phthalic acid do hai nhóm -COOH ở vị trí 1,3 cách xa nhau.'
      ],
      reactionsEn: [
        'Consumes 2 equivalents of NaOH to yield soluble sodium isophthalate.',
        'Manufactured industrially by catalytic air oxidation of m-Xylene.',
        'Cannot form an intramolecular cyclic anhydride upon heating (unlike ortho-Phthalic acid).'
      ],
      note: 'Công thức C₈H₆O₄ (Benzene-1,3-dicarboxylic acid); cùng với Phthalic acid (1,2) và Terephthalic acid (1,4) hợp thành bộ 3 đồng phân diacid thơm.',
      noteEn: 'Formula C₈H₆O₄ (1,3-benzenedicarboxylic acid); completes the ortho/meta/para aromatic diacid triad.'
    },
    {
      id: 'malic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[1,4,1],[0,5,2],[0,6,1],[3,7,2],[3,8,1]],
      name: 'Malic acid',
      nameEn: 'Malic acid',
      category: 'Carboxylic acid (Hydroxy diacid)',
      categoryEn: 'Carboxylic acid (Hydroxy diacid)',
      state: 'Rắn (tinh thể trắng vị chua thanh đậm đà)',
      stateEn: 'Solid (white sour crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Tạo nên vị chua đặc trưng của quả táo xanh, nho xanh, lê và mận (tên bắt nguồn từ chữ Latin "malum" nghĩa là quả táo); được dùng trong kẹo siêu chua và làm mắt xích quan trọng của chu trình Krebs trong tế bào.',
      realLifeEn: 'Natural fruit acid giving crisp sourness to green apples and unripe grapes (Latin malum, apple); prized in sour candies and essential to the cellular Krebs cycle.',
      reactions: [
        'Tác dụng với NaOH theo tỉ lệ 1 : 2 (2 nhóm -COOH), nhưng tác dụng với kim loại Na dư theo tỉ lệ 1 : 3 (giải phóng 1,5 mol H₂ do phản ứng thêm ở nhóm -OH alcohol!).',
        'Khi đun nóng dễ tách nước tạo Fumaric acid và Maleic anhydride.',
        'Làm quỳ tím hóa đỏ và sủi bọt CO₂ khi gặp NaHCO₃.'
      ],
      reactionsEn: [
        'Neutralizes 2 moles of NaOH (2 -COOH) yet liberates 1.5 moles of H₂ with excess metallic Na (2 -COOH + 1 -OH)!',
        'Thermal dehydration eliminates H₂O cleanly to form Fumaric acid / Maleic anhydride.',
        'Turns litmus red and effervesces with NaHCO₃.'
      ],
      note: 'Công thức C₄H₆O₅ (HOOC–CH(OH)–CH₂–COOH); phân tử tạp chức kinh điển minh họa sự khác nhau về số nhóm phản ứng giữa Na và NaOH.',
      noteEn: 'Formula C₄H₆O₅; classic bifunctional stoichiometry test (2 NaOH vs. 3 Na).'
    },
    {
      id: 'tartaric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[1,4,1],[2,5,1],[0,6,2],[0,7,1],[3,8,2],[3,9,1]],
      name: 'Tartaric acid',
      nameEn: 'Tartaric acid',
      category: 'Carboxylic acid (Dihydroxy diacid)',
      categoryEn: 'Carboxylic acid (Dihydroxy diacid)',
      state: 'Rắn (tinh thể trắng vị chua sắc)',
      stateEn: 'Solid (white sour crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Có tự nhiên trong quả nho chín và bã rượu vang ("kem tartar" trong làm bánh giúp đánh bông lòng trắng trứng); là hợp chất lịch sử giúp nhà bác học Louis Pasteur khám phá ra tính bất đối xứng quang học (đồng phân gương) năm 1848 và tạo phức thuốc thử Fehling xanh lam thẫm nhận biết đường khử.',
      realLifeEn: 'Natural acid of grapes and baking cream of tartar (stabilizes whipped egg whites); famous for Louis Pasteur’s 1848 discovery of molecular chirality and as the chelating ligand in Fehling reagent.',
      reactions: [
        'Tác dụng với NaOH tỉ lệ 1 : 2 (tạo muối Tartrate hòa tan Cu(OH)₂ tạo dung dịch xanh lam thẫm của thuốc thử Fehling), còn với Na dư tỉ lệ 1 : 4 (giải phóng 2 mol H₂)!',
        'Làm quỳ tím hóa đỏ và giải phóng khí CO₂ khi trộn với NaHCO₃ (nguyên lý bột nở làm bánh).',
        'Thể hiện tính đồng phân quang học gồm dạng D, L và dạng meso không quay cực.'
      ],
      reactionsEn: [
        'Consumes 2 moles NaOH (2 -COOH, forming Fehling’s blue copper chelate) yet reacts 1:4 with metallic Na (releasing 2 moles H₂ from 2 -COOH + 2 -OH)!',
        'Reacts with dry NaHCO₃ on wetting to evolve CO₂ leavening gas in baking powder.',
        'Famous stereochemical benchmark possessing enantiomers and an achiral meso form.'
      ],
      note: 'Công thức C₄H₆O₆; muối Potassium sodium tartrate chính là thành phần giữ Cu²⁺ tan trong dung dịch kiềm của thuốc thử Fehling.',
      noteEn: 'Formula C₄H₆O₆; Rochelle salt (its mixed Na/K salt) prevents Cu(OH)₂ precipitation in Fehling solution.'
    },
    {
      id: 'pyruvic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,2],[2,4,2],[2,5,1]],
      name: 'Pyruvic acid',
      nameEn: 'Pyruvic acid',
      category: 'Carboxylic acid (Keto acid)',
      categoryEn: 'Carboxylic acid (Keto acid)',
      state: 'Lỏng không màu (mùi hơi giống Acetic acid, sôi ở 165 °C)',
      stateEn: 'Colorless liquid (vinegar-like odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Ngã tư chuyển hóa sinh học trung tâm của mọi tế bào sống: mỗi phân tử Glucose sau đường phân tạo ra 2 phân tử Pyruvate để đi vào chu trình Krebs tạo năng lượng ATP hoặc lên men thành Lactic acid / Ethanol.',
      realLifeEn: 'Central metabolic crossroads of cellular life: glycolysis splits Glucose into two Pyruvate molecules destined for either the aerobic Krebs cycle or fermentation to Lactic acid/Ethanol.',
      reactions: [
        'Vừa có tính acid mạnh (làm đỏ quỳ tím, tác dụng NaOH tỉ lệ 1 : 1, sủi bọt CO₂ với NaHCO₃) vừa mang nhóm ketone >C=O.',
        'Cộng H₂ (Ni, t°) hoặc khử sinh học bởi NADH chuyển hóa thành Lactic acid.',
        'Dương tính với phép thử Iodoform (I₂/NaOH) tạo kết tủa vàng CHI₃↓ nhờ nhóm CH₃–C(=O)–.'
      ],
      reactionsEn: [
        'Combines carboxylic acidity (turns litmus red, fizzes with NaHCO₃) with ketone carbonyl reactivity.',
        'Hydrogenates or reduces biologically via lactate dehydrogenase into Lactic acid.',
        'Positive to the yellow Iodoform test (CHI₃↓) via its methyl ketone motif.'
      ],
      note: 'Công thức CH₃COCOOH (C₃H₄O₃); là α-keto acid đơn giản nhất và quan trọng nhất trong sinh hóa học.',
      noteEn: 'Formula C₃H₄O₃; simplest and biochemically most vital α-keto acid.'
    },
    {
      id: 'gluconic-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','C','C','O','O','O','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[0,6,2],[0,7,1],[1,8,1],[2,9,1],[3,10,1],[4,11,1],[5,12,1]],
      name: 'Gluconic acid',
      nameEn: 'Gluconic acid',
      category: 'Carboxylic acid (Polyhydroxy acid)',
      categoryEn: 'Carboxylic acid (Polyhydroxy acid)',
      state: 'Rắn tinh thể hoặc dung dịch siro không màu (vị chua dịu)',
      stateEn: 'Colorless crystals / mild sour syrup',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Sản phẩm của phản ứng kinh điển dùng NƯỚC BROMINE (Br₂) phân biệt Glucose với Fructose; có mặt tự nhiên trong mật ong, trái cây và làm phụ gia thực phẩm dịu vị, chất bổ sung khoáng chất (Calcium gluconate, Zinc gluconate).',
      realLifeEn: 'Direct oxidation product when bromine water distinguishes Glucose from Fructose; natural honey acidulant and gentle pharmaceutical mineral carrier (Calcium/Zinc gluconate).',
      reactions: [
        'Tạo thành khi oxi hóa nhóm -CHO của Glucose bằng nước Br₂ (trong khi Fructose không phản ứng).',
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam đậm (vừa do tính acid vừa do polyalcohol nhiều -OH kề nhau).',
        'Tác dụng với NaOH theo tỉ lệ 1 : 1 tạo muối Sodium gluconate (hoặc Ammonium gluconate khi dùng Tollens).'
      ],
      reactionsEn: [
        'Formed selectively by oxidizing Glucose (and not Fructose) with aqueous bromine water.',
        'Dissolves Cu(OH)₂ at room temperature to a deep blue solution via acid reaction and vicinal polyol chelation.',
        'Neutralizes 1 equivalent of NaOH cleanly to yield water-soluble Sodium gluconate.'
      ],
      note: 'Công thức C₆H₁₂O₇ (HOCH₂–(CHOH)₄–COOH); sản phẩm chuẩn cần nhớ khi cho Glucose tác dụng với dung dịch Br₂.',
      noteEn: 'Formula C₆H₁₂O₇; key Grade 12 carbohydrate reaction product of Glucose + Br₂(aq).'
    },
    {
      id: 'phthalic-anhydride',
      catKey: 'anhydride',
      elements: [...C6_AROM,'C','O','C','O','O'],
      bonds: [...BENZENE,[0,6,1],[6,7,1],[7,8,1],[8,1,1],[6,9,2],[8,10,2]],
      name: 'Phthalic anhydride',
      nameEn: 'Phthalic anhydride',
      category: 'Acid anhydride',
      categoryEn: 'Acid anhydride',
      state: 'Rắn (tinh thể hình kim hoặc vảy màu trắng)',
      stateEn: 'Solid (white crystalline needles/flakes)',
      solubility: 'Rất ít tan trong nước lạnh, phản ứng thủy phân chậm với nước nóng tạo Phthalic acid',
      solubilityEn: 'Slightly soluble cold; hydrolyzes in hot water to Phthalic acid',
      realLife: 'Hóa chất công nghiệp lớn dùng sản xuất nhựa sơn phủ alkyd, chất hóa dẻo nhựa PVC và chất chỉ thị acid–base quen thuộc nhất phòng thí nghiệm: Phenolphthalein (khi đun nóng với Phenol)!',
      realLifeEn: 'Major industrial chemical used for alkyd paints, plasticizers, and synthesizing the quintessential acid–base lab indicator Phenolphthalein (by condensation with Phenol)!',
      reactions: [
        'Thủy phân với nước nóng tạo lại Phthalic acid; tác dụng với NaOH dư (tỉ lệ 1 : 2) tạo muối Disodium phthalate.',
        'Ngưng tụ với 2 phân tử Phenol (xúc tác H₂SO₄ đặc, đun nóng) tạo chất chỉ thị màu Phenolphthalein (chuyển màu hồng trong môi trường kiềm).',
        'Điều chế bằng phản ứng oxi hóa o-Xylene hoặc Naphthalene bằng O₂ không khí (xt V₂O₅).'
      ],
      reactionsEn: [
        'Hydrolyzes in hot water to Phthalic acid and reacts 1:2 with NaOH to Disodium phthalate.',
        'Condenses with 2 equivalents of Phenol over conc. H₂SO₄ to synthesize Phenolphthalein pH indicator.',
        'Manufactured industrially by catalytic vapor-phase oxidation of o-Xylene or Naphthalene over V₂O₅.'
      ],
      note: 'Công thức C₈H₄O₃; đồng phân anhydride vòng nội phân tử của Phthalic acid.',
      noteEn: 'Formula C₈H₄O₃; cyclic internal anhydride of Phthalic acid and synthetic parent of Phenolphthalein.'
    },
    {
      id: 'propylene-glycol',
      catKey: 'alcohol',
      elements: ['C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[1,3,1],[2,4,1]],
      name: 'Propylene glycol (Propane-1,2-diol)',
      nameEn: 'Propylene glycol (Propane-1,2-diol)',
      category: 'Alcohol',
      categoryEn: 'Alcohol',
      state: 'Lỏng sánh không màu (không mùi, vị hơi ngọt)',
      stateEn: 'Colorless odorless syrupy liquid (faintly sweet)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Chất giữ ẩm, dung môi an toàn không độc được phê duyệt rộng rãi trong thực phẩm, kem dưỡng da, thuốc nhỏ mắt, dung dịch tạo khói sân khấu và chất chống đông an toàn cho hệ thống làm lạnh thực phẩm (thay thế Ethylene glycol độc hại).',
      realLifeEn: 'Food-safe, non-toxic humectant and solvent in cosmetics, medicines, theatrical fog machines, and food-grade antifreeze (replacing toxic Ethylene glycol).',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch phức đồng XANH LAM ĐẬM (do có 2 nhóm -OH kề nhau ở vị trí 1 và 2 — phân biệt ngay với Propane-1,3-diol!).',
        'Tác dụng với kim loại Na dư giải phóng 1 mol khí H₂ trên mỗi mol diol.',
        'Điều chế bằng phản ứng cộng nước mở vòng Propylene oxide hoặc oxi hóa Propene bằng dung dịch KMnO₄ loãng lạnh.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to give a DEEP BLUE solution thanks to adjacent 1,2-diol hydroxyls (distinguishing it cleanly from Propane-1,3-diol!).',
        'Reacts with excess Na metal to evolve 1 mole of H₂ per mole of diol.',
        'Formed cleanly via cold dilute KMnO₄ oxidation of Propene.'
      ],
      note: 'Công thức C₃H₈O₂; bộ đôi so sánh kinh điển: Propane-1,2-diol hòa tan được Cu(OH)₂ còn Propane-1,3-diol thì KHÔNG!',
      noteEn: 'Formula C₃H₈O₂; contrasts sharply with isomer Propane-1,3-diol by giving a positive Cu(OH)₂ blue chelate test.'
    },
    {
      id: 'o-cresol',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','C'],
      bonds: [...BENZENE,[0,6,1],[1,7,1]],
      name: 'o-Cresol (2-Methylphenol)',
      nameEn: 'o-Cresol (2-Methylphenol)',
      category: 'Phenol',
      categoryEn: 'Phenol',
      state: 'Rắn (tinh thể không màu, nóng chảy ở 30 °C, mùi sát trùng)',
      stateEn: 'Solid (colorless crystals, mp 30 °C, antiseptic odor)',
      solubility: 'Ít tan trong nước (~2,5 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~2.5 g/100 mL)',
      realLife: 'Chất sát trùng cổ điển trong dung dịch tẩy uế Lysol từ nhựa than đá và hóa chất trung gian để tổng hợp chất diệt cỏ chọn lọc, nhựa epoxy phenolic chịu nhiệt và chất chống oxy hóa.',
      realLifeEn: 'Coal-tar phenolic used traditionally in household disinfectants (Lysol) and industrially in epoxy-novolac resins and selective herbicides.',
      reactions: [
        'Tác dụng với cả Na kim loại lẫn dung dịch NaOH tạo muối Sodium o-cresolate tan tốt trong nước.',
        'Tạo phức màu tím xanh đặc trưng với dung dịch FeCl₃ và kết tủa trắng với nước Br₂.',
        'Không phản ứng với NaHCO₃ (do lực acid yếu hơn H₂CO₃).'
      ],
      reactionsEn: [
        'Reacts with both metallic Na and aqueous NaOH to form water-soluble phenolate salts.',
        'Develops a characteristic blue-violet FeCl₃ color and precipitates with aqueous bromine.',
        'Inert toward NaHCO₃ due to weak phenolic acidity.'
      ],
      note: 'Công thức C₇H₈O; đồng phân vị trí ortho của p-Cresol và đồng phân nhóm chức với Benzyl alcohol, Anisole.',
      noteEn: 'Formula C₇H₈O; ortho positional isomer of p-Cresol.'
    },
    {
      id: '1,4-dioxane',
      catKey: 'heterocycle',
      elements: ['O','C','C','O','C','C'],
      bonds: C6_RING,
      name: '1,4-Dioxane',
      nameEn: '1,4-Dioxane',
      category: 'Heterocycle / Ether vòng',
      categoryEn: 'Heterocycle / Cyclic ether',
      state: 'Lỏng không màu (nóng chảy ở 11,8 °C, sôi ở 101 °C, mùi Ether nhẹ)',
      stateEn: 'Colorless liquid (mp 11.8 °C, bp 101 °C)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Dung môi dị vòng 6 cạnh đối xứng hoàn toàn (không có momen lưỡng cực tổng hợp) nhưng lại tan vô hạn trong nước nhờ hai nguyên tử Oxygen đối xứng lộ cặp electron; dùng làm dung môi ổn định hóa học và trong tổng hợp hữu cơ.',
      realLifeEn: 'Remarkable symmetric cyclic diether (zero net dipole moment, yet completely water-miscible via hydrogen-bond acceptor oxygens) widely used as a high-boiling lab solvent.',
      reactions: [
        'Rất trơ với kiềm NaOH, kim loại Na và nhiều chất khử mạnh.',
        'Liên kết ether vòng có thể bị phân cắt bởi acid HI đặc nóng hoặc tạo muối phức với Br₂.',
        'Cháy hoàn toàn với ngọn lửa xanh lam.'
      ],
      reactionsEn: [
        'Chemically inert toward metallic Sodium, strong bases, and hydrides.',
        'Cleaved by hot concentrated HI and forms a well-defined crystalline adduct with Br₂.',
        'Miscible cleanly with both water and nonpolar hydrocarbons.'
      ],
      note: 'Công thức C₄H₈O₂; đồng phân dị vòng đối xứng cùng công thức phân tử với Ethyl acetate và Butyric acid!',
      noteEn: 'Formula C₄H₈O₂; cyclic diether isomer sharing its molecular formula with Ethyl acetate and Butyric acid.'
    },
    {
      id: 'mtbe',
      catKey: 'ether',
      elements: ['C','C','C','C','O','C'],
      bonds: [[0,1,1],[0,2,1],[0,3,1],[0,4,1],[4,5,1]],
      name: 'MTBE (Methyl tert-butyl ether)',
      nameEn: 'MTBE (Methyl tert-butyl ether)',
      category: 'Ether',
      categoryEn: 'Ether',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ở 55 °C, mùi bạc hà hắc)',
      stateEn: 'Colorless volatile liquid (bp 55 °C)',
      solubility: 'Tan ít trong nước (~4 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~4 g/100 mL)',
      realLife: 'Phụ gia pha xăng nổi tiếng dùng để nâng cao chỉ số octane chống kích nổ động cơ thay thế cho chì độc hại (tetraethyl lead) trong nhiều thập kỷ, đồng thời là dung môi chiết hữu cơ cực kỳ ưa chuộng thay Diethyl ether vì ít tạo peroxide nổ hơn.',
      realLifeEn: 'High-octane gasoline oxygenate historically replacing toxic leaded fuel additives, and safer laboratory extraction ether forming far fewer explosive peroxides than Diethyl ether.',
      reactions: [
        'Hoàn toàn không tác dụng với Na và bền vững trong môi trường kiềm.',
        'Trong môi trường acid HCl/HI hoặc H₂SO₄ đặc ấm dễ bị cắt đứt thành Methanol và Isobutene / tert-Butyl halide.',
        'Sản xuất công nghiệp bằng phản ứng cộng Methanol vào Isobutene (xt acid).'
      ],
      reactionsEn: [
        'Completely unreactive toward metallic Na and aqueous bases.',
        'Cleaves selectively in warm mineral acids into Methanol and tert-butyl derivatives / Isobutene.',
        'Manufactured cleanly by acid-catalyzed addition of Methanol across Isobutene.'
      ],
      note: 'Công thức C₅H₁₂O; tên thay thế chuẩn IUPAC: 2-methoxy-2-methylpropane.',
      noteEn: 'Formula C₅H₁₂O; IUPAC name 2-methoxy-2-methylpropane.'
    },
    {
      id: 'acetophenone',
      catKey: 'ketone',
      elements: [...C6_AROM,'C','C','O'],
      bonds: [...BENZENE,[0,6,1],[6,7,1],[6,8,2]],
      name: 'Acetophenone',
      nameEn: 'Acetophenone',
      category: 'Ketone (Ketone thơm)',
      categoryEn: 'Ketone (Aromatic ketone)',
      state: 'Lỏng không màu hoặc tinh thể trắng (nóng chảy ở 20 °C, mùi hoa cam hạnh nhân)',
      stateEn: 'Colorless liquid / low-melting solid (mp 20 °C, sweet floral scent)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Ketone thơm đơn giản nhất có tự nhiên trong táo, phô mai, chuối và súp lơ; dùng làm hương liệu mùi hoa cam, hạnh nhân cho xà phòng, nước hoa và làm tiền chất tổng hợp nhiều dược phẩm.',
      realLifeEn: 'Simplest alkyl-aryl ketone occurring naturally in apples and apricots; used in almond/cherry soaps, perfumes, and pharmaceutical chiral alcohol synthesis.',
      reactions: [
        'KHÔNG phản ứng tráng bạc với AgNO₃/NH₃, nhưng DƯƠNG TÍNH với phản ứng Iodoform (tạo kết tủa vàng CHI₃↓ khi đun với I₂/NaOH)!',
        'Khử bằng H₂ (Ni) hoặc NaBH₄ tạo 1-phenylethanol.',
        'Tổng hợp bằng phản ứng Friedel–Crafts giữa Benzene và Acetyl chloride (xt AlCl₃).'
      ],
      reactionsEn: [
        'Negative to Tollens reagent, yet positive to the yellow Iodoform test (CHI₃↓) thanks to its -COCH₃ group.',
        'Reduces smoothly with NaBH₄ to 1-phenylethanol.',
        'Synthesized classically via Friedel–Crafts acylation of Benzene.'
      ],
      note: 'Công thức C₈H₈O; ví dụ mẫu cho Ketone thơm có nhóm CH₃CO– nên tham gia phản ứng tạo kết tủa vàng Iodoform.',
      noteEn: 'Formula C₈H₈O; simplest aromatic ketone giving a positive Iodoform test.'
    },
    {
      id: 'p-benzoquinone',
      catKey: 'ketone',
      elements: ['C','C','C','C','C','C','O','O'],
      bonds: [[0,1,1],[1,2,2],[2,3,1],[3,4,1],[4,5,2],[5,0,1],[0,6,2],[3,7,2]],
      name: 'p-Benzoquinone (1,4-Benzoquinone)',
      nameEn: 'p-Benzoquinone (1,4-Benzoquinone)',
      category: 'Ketone / Quinone',
      categoryEn: 'Ketone / Quinone',
      state: 'Rắn (tinh thể màu vàng rực, mùi hắc giống Chlorine, dễ thăng hoa)',
      stateEn: 'Solid (bright yellow pungent crystals, sublimes readily)',
      solubility: 'Ít tan trong nước lạnh',
      solubilityEn: 'Slightly soluble in cold water',
      realLife: 'Khung oxy hóa – khử vàng đặc trưng tạo thành khi Hydroquinone bị oxi hóa (hoặc khi táo, khoai bị thâm ngoài không khí); cấu trúc quinone này chính là nhân hoạt động của Vitamin K giúp đông máu và Coenzyme Q10 tạo năng lượng trong ty thể.',
      realLifeEn: 'Bright yellow oxidized counterpart of Hydroquinone; its redox-active quinone core drives mitochondrial Coenzyme Q10 energy transport and blood-clotting Vitamin K.',
      reactions: [
        'Dễ bị khử thuận nghịch bởi chất khử nhẹ (SO₂, Vitamin C, H₂) trả lại phân tử Hydroquinone không màu.',
        'Làm mất màu dung dịch Br₂ (cộng hợp vào các nối đôi C=C liên hợp vì KHÔNG phải vòng thơm Benzene!).',
        'Là dienophile rất mạnh trong phản ứng cộng đóng vòng Diels–Alder.'
      ],
      reactionsEn: [
        'Reversibly reduced back to colorless Hydroquinone by mild reductants such as Vitamin C or SO₂.',
        'Reacts as an unsaturated diketone (NOT an aromatic benzene ring!), undergoing conjugate additions and Diels–Alder cycloadditions.',
        'Accepts electrons readily as an organic oxidizer.'
      ],
      note: 'Công thức C₆H₄O₂; vòng 6 cạnh có 2 nhóm =O ở vị trí 1,4 nên không còn tính thơm như Benzene.',
      noteEn: 'Formula C₆H₄O₂; non-aromatic conjugated cyclohexadienedione forming a classic redox pair with Hydroquinone.'
    },
    {
      id: 'cinnamaldehyde',
      catKey: 'aldehyde',
      elements: [...C6_AROM,'C','C','C','O'],
      bonds: [...BENZENE,[0,6,1],[6,7,2],[7,8,1],[8,9,2]],
      name: 'Cinnamaldehyde (Hương quế)',
      nameEn: 'Cinnamaldehyde (Cinnamon aldehyde)',
      category: 'Aldehyde',
      categoryEn: 'Aldehyde',
      state: 'Lỏng sánh màu vàng nhạt (mùi thơm ngọt ấm đặc trưng của vỏ quế)',
      stateEn: 'Pale-yellow oily liquid (rich warm cinnamon aroma)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Chiếm tới ~90% tinh dầu chiết xuất từ vỏ cây quế (Việt Nam là một trong những nước xuất khẩu quế nổi tiếng thế giới); dùng rộng rãi làm gia vị nấu phở, làm bánh ngọt, kẹo quế và xua đuổi côn trùng tự nhiên.',
      realLifeEn: 'Makes up ~90% of cinnamon bark essential oil (celebrated in Vietnamese phở, pastries, and cinnamon candies) and serves as an effective natural insect repellent.',
      reactions: [
        'Nhóm -CHO tham gia phản ứng tráng bạc với AgNO₃/NH₃ tạo lớp bạc sáng bóng.',
        'Nối đôi C=C mạch nhánh làm mất màu nhanh nước Br₂ và dung dịch KMnO₄ loãng ở nhiệt độ thường.',
        'Cộng H₂ dư (xúc tác Ni, t°) khử cả nối đôi C=C và chức -CHO thành 3-phenylpropan-1-ol.'
      ],
      reactionsEn: [
        'Aldehyde -CHO group gives a positive Tollens silver-mirror reaction with AgNO₃/NH₃.',
        'Side-chain alkene bond rapidly decolorizes bromine water and cold aqueous KMnO₄.',
        'Full catalytic hydrogenation reduces both C=C and -CHO to 3-phenylpropan-1-ol.'
      ],
      note: 'Công thức C₉H₈O; ví dụ thực tế sinh động về Aldehyde thơm không no có mặt trong tinh dầu thiên nhiên.',
      noteEn: 'Formula C₉H₈O; signature natural conjugated aromatic unsaturated aldehyde.'
    },
    {
      id: 'glyceraldehyde',
      catKey: 'carbohydrate',
      elements: ['C','C','C','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[0,3,2],[1,4,1],[2,5,1]],
      name: 'Glyceraldehyde',
      nameEn: 'Glyceraldehyde',
      category: 'Carbohydrate (Aldotriose)',
      categoryEn: 'Carbohydrate (Aldotriose)',
      state: 'Rắn (tinh thể trắng vị ngọt nhẹ)',
      stateEn: 'Solid (white sweet crystals)',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Đường đơn (monosaccharide) nhóm aldose nhỏ nhất trong tự nhiên (3 Carbon — aldotriose); dạng phosphate của nó là sản phẩm trực tiếp đầu tiên của quá trình quang hợp cây xanh và là điểm mốc phân loại cấu hình D/L cho mọi phân tử đường và amino acid.',
      realLifeEn: 'Smallest aldose monosaccharide (aldotriose); its phosphate ester (G3P) is the direct primary carbohydrate product of plant photosynthesis and defines the global D/L stereochemical standard.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam (hai nhóm -OH kề nhau) và đun nóng tạo kết tủa đỏ gạch Cu₂O.',
        'Tham gia phản ứng tráng bạc với AgNO₃/NH₃ và làm mất màu nước Br₂ (tạo Glyceric acid).',
        'Tác dụng với kim loại Na dư giải phóng khí H₂ và có công thức tổng quát khớp với C₃(H₂O)₃.'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to a blue chelate and reduces it to brick-red Cu₂O upon heating.',
        'Reduces Tollens reagent to metallic silver and decolorizes bromine water.',
        'Fits the classical carbohydrate stoichiometry Cₙ(H₂O)ₘ (C₃H₆O₃).'
      ],
      note: 'Công thức C₃H₆O₃; đồng phân cấu tạo cùng công thức phân tử với Lactic acid và Dihydroxyacetone.',
      noteEn: 'Formula C₃H₆O₃; smallest chiral sugar defining D/L nomenclature, isomeric with Lactic acid.'
    },
    {
      id: 'eugenol',
      catKey: 'phenol',
      elements: [...C6_AROM,'O','O','C','C','C','C'],
      bonds: [...BENZENE,[0,6,1],[1,7,1],[7,8,1],[3,9,1],[9,10,1],[10,11,2]],
      name: 'Eugenol (Tinh dầu đinh hương)',
      nameEn: 'Eugenol (Clove oil)',
      category: 'Phenol (Hợp chất đa chức)',
      categoryEn: 'Phenol (Multifunctional)',
      state: 'Lỏng sánh màu vàng nhạt (mùi thơm nồng ấm của đinh hương và hương nhu)',
      stateEn: 'Pale-yellow oily liquid (strong warm clove scent)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Thành phần chủ đạo (80–90%) trong tinh dầu nụ đinh hương và lá hương nhu trắng Việt Nam; được nha sĩ dùng trộn kẽm oxit làm chất trám răng tạm giảm đau, sát khuẩn ổ răng và dùng làm nguyên liệu tổng hợp Vanillin (hương vani).',
      realLifeEn: 'Principal constituent (~85%) of clove bud and holy basil essential oils; mixed with Zinc oxide by dentists as a soothing antiseptic temporary tooth filling, and oxidized industrially to Vanillin.',
      reactions: [
        'Nhóm -OH phenol tác dụng với NaOH tạo muối phenolate tan tốt và tạo màu xanh lục đậm với FeCl₃.',
        'Nối đôi allyl –CH₂–CH=CH₂ làm mất màu nước Br₂ và KMnO₄ ở điều kiện thường (chú ý: cộng cả vào nối đôi và thế vào vòng thơm!).',
        'Đồng phân hóa nối đôi trong kiềm tạo Isoeugenol rồi oxi hóa chuyển hóa thành hương liệu Vanillin.'
      ],
      reactionsEn: [
        'Phenolic -OH dissolves cleanly in aqueous NaOH and reacts characteristically with FeCl₃.',
        'Allyl side chain rapidly decolorizes bromine water and cold KMnO₄.',
        'Base-catalyzed double-bond shift to Isoeugenol followed by cleavage yields Vanillin.'
      ],
      note: 'Công thức C₁₀H₁₂O₂; phân tử thiên nhiên chứa đồng thời Phenol (-OH), Ether (-OCH₃), Arene và nối đôi Alkene.',
      noteEn: 'Formula C₁₀H₁₂O₂; rich natural multifunctional phenol combining -OH, -OCH₃, aromatic ring, and allyl alkene.'
    },
    {
      id: 'chloroprene',
      catKey: 'halogen',
      elements: ['C','C','C','C','Cl'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[1,4,1]],
      name: 'Chloroprene (2-Chlorobuta-1,3-diene)',
      nameEn: 'Chloroprene (2-Chlorobuta-1,3-diene)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ở 59,4 °C, mùi giống Ether)',
      stateEn: 'Colorless volatile liquid (bp 59.4 °C)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Monomer sản xuất cao su tổng hợp Neoprene (Polychloroprene / cao su Chloroprene) có khả năng chịu dầu mỡ, chịu nhiệt, chống cháy và chống thấm nước vượt trội — dùng làm bộ đồ lặn biển, ống dẫn xăng dầu và dây curoa ô tô.',
      realLifeEn: 'Monomer polymerized into tough, oil- and weather-resistant Neoprene (Polychloroprene) rubber for scuba wetsuits, fuel hoses, and industrial belts.',
      reactions: [
        'Trùng hợp theo kiểu 1,4 (nhờ có hệ liên hợp như Isoprene thay nhóm -CH₃ bằng -Cl) tạo cao su Chloroprene (Neoprene).',
        'Làm mất màu nước Br₂ và dung dịch KMnO₄ rất nhanh ở điều kiện thường.',
        'Liên kết C(sp²)–Cl gắn trên nối đôi nên bền với dung dịch NaOH loãng đun sôi (khó thủy phân như Vinyl chloride).'
      ],
      reactionsEn: [
        'Undergoes 1,4-polymerization analogous to Isoprene to manufacture oil-resistant Neoprene rubber.',
        'Rapidly decolorizes aqueous bromine and cold KMnO₄ across its conjugated diene system.',
        'Vinylic C(sp²)–Cl resists mild aqueous alkaline hydrolysis.'
      ],
      note: 'Công thức C₄H₅Cl; cấu trúc giống hệt Isoprene nhưng thay nhóm -CH₃ bằng nguyên tử Chlorine (-Cl), trong chương trình Hóa 12 là monomer của cao su Chloroprene.',
      noteEn: 'Formula C₄H₅Cl; chloro-analog of Isoprene serving as the Grade 12 monomer for Chloroprene rubber.'
    },
    {
      id: 'allyl-chloride',
      catKey: 'halogen',
      elements: ['C','C','C','Cl'],
      bonds: [[0,1,2],[1,2,1],[2,3,1]],
      name: 'Allyl chloride (3-Chloroprop-1-ene)',
      nameEn: 'Allyl chloride (3-Chloroprop-1-ene)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (dễ bay hơi, sôi ở 45 °C, mùi tỏi cay nồng)',
      stateEn: 'Colorless volatile liquid (bp 45 °C, pungent garlic odor)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Hóa chất trung gian then chốt để tổng hợp Epichlorohydrin làm keo dán siêu chắc Epoxy hai thành phần (keo AB) và điều chế Glycerol tổng hợp từ nguồn dầu mỏ.',
      realLifeEn: 'Industrial gateway manufactured from Propene + Cl₂ (500 °C) to produce Epichlorohydrin for high-strength two-part Epoxy adhesives and synthetic Glycerol.',
      reactions: [
        'Thủy phân CỰC NHANH trong dung dịch NaOH ấm tạo Allyl alcohol và kết tủa trắng AgCl ngay khi thử với AgNO₃ (khác hẳn Vinyl chloride không thủy phân!).',
        'Làm mất màu dung dịch nước Br₂ và KMnO₄ ở nhiệt độ thường nhờ nối đôi C=C.',
        'Điều chế công nghiệp bằng phản ứng thế Cl₂ vào nhóm -CH₃ của Propene ở nhiệt độ cao (~500 °C) mà vẫn bảo toàn nối đôi!'
      ],
      reactionsEn: [
        'Hydrolyzes briskly in warm aqueous NaOH to Allyl alcohol and gives immediate AgCl↓ with AgNO₃ (unlike wholly unreactive Vinyl chloride!).',
        'Decolorizes bromine water and cold KMnO₄ across its alkene bond.',
        'Produced by high-temperature (~500 °C) allylic radical chlorination of Propene.'
      ],
      note: 'Công thức C₃H₅Cl; cặp so sánh quan trọng trong Hóa 11: Vinyl chloride (Cl gắn trực tiếp C=C, trơ với NaOH loãng) vs. Allyl chloride (Cl cách nối đôi 1 C, thủy phân rất nhạy).',
      noteEn: 'Formula C₃H₅Cl; classic Grade 11 contrast with Vinyl chloride demonstrating allylic C(sp³)–Cl reactivity.'
    },
    {
      id: '1-bromopropane',
      catKey: 'halogen',
      elements: ['C','C','C','Br'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: '1-Bromopropane (n-Propyl bromide)',
      nameEn: '1-Bromopropane (n-Propyl bromide)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (sôi ở 71 °C, nặng hơn nước)',
      stateEn: 'Colorless dense liquid (bp 71 °C, 1.35 g/mL)',
      solubility: 'Rất ít tan trong nước',
      solubilityEn: 'Very slightly soluble in water',
      realLife: 'Dung môi tẩy rửa dầu mỡ chi tiết kim loại, bảng mạch điện tử và keo dán công nghiệp thay thế cho một số dung môi CFC cũ, đồng thời là đồng phân mạch thẳng chuẩn của 2-Bromopropane.',
      realLifeEn: 'Industrial metal-degreasing and precision electronics cleaning solvent replacing ozone-depleting CFCs, and linear isomer of 2-Bromopropane.',
      reactions: [
        'Đun nóng với dung dịch NaOH loãng (thế) tạo alcohol bậc một Propan-1-ol và NaBr.',
        'Đun nóng với KOH trong Ethanol (tách HBr) tạo khí Propene.',
        'Dung dịch sau thủy phân kiềm đã acid hóa bằng HNO₃ tạo kết tủa vàng nhạt AgBr với AgNO₃.'
      ],
      reactionsEn: [
        'Warmed aqueous NaOH hydrolysis produces primary alcohol Propan-1-ol and NaBr.',
        'Heating with alcoholic KOH drives HBr elimination to yield Propene gas.',
        'Hydrolysate forms pale-yellow AgBr precipitate with AgNO₃ after HNO₃ acidification.'
      ],
      note: 'Công thức C₃H₇Br; đồng phân vị trí với 2-Bromopropane.',
      noteEn: 'Formula C₃H₇Br; primary positional isomer of 2-Bromopropane.'
    },
    {
      id: '2-chloro-2-methylpropane',
      catKey: 'halogen',
      elements: ['C','C','C','C','Cl'],
      bonds: [[0,1,1],[0,2,1],[0,3,1],[0,4,1]],
      name: 'tert-Butyl chloride (2-Chloro-2-methylpropane)',
      nameEn: 'tert-Butyl chloride (2-Chloro-2-methylpropane)',
      category: 'Halogen derivative',
      categoryEn: 'Halogen derivative',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ở 50,8 °C)',
      stateEn: 'Colorless volatile liquid (bp 50.8 °C)',
      solubility: 'Rất ít tan trong nước (tự thủy phân dần)',
      solubilityEn: 'Very slightly soluble (slowly solvolyzes in water)',
      realLife: 'Sản phẩm nhận biết tức thì (lớp dầu đục nổi lên sau vài giây) khi thử alcohol bậc ba tert-Butanol với thuốc thử Lucas (HCl đặc / ZnCl₂); là hợp chất mẫu kinh điển cho cơ chế thế S_N1 tạo carbocation bậc ba bền.',
      realLifeEn: 'Instant cloudy-layer product formed in the Lucas test for tertiary alcohols (tert-Butanol + conc. HCl), and textbook prototype of unimolecular SN1 substitution.',
      reactions: [
        'Thủy phân cực nhanh ngay trong nước hoặc dung dịch kiềm loãng theo cơ chế S_N1 tạo tert-Butanol và HCl.',
        'Đun nóng nhẹ với kiềm hoặc base tạo Isobutene (2-methylpropene).',
        'Tạo kết tủa trắng AgCl gần như tức thì khi nhỏ dung dịch AgNO₃/Ethanol.'
      ],
      reactionsEn: [
        'Undergoes rapid SN1 solvolysis in water or dilute alkali to regenerate tert-Butanol.',
        'Eliminates HCl swiftly upon heating with base to yield Isobutene.',
        'Precipitates AgCl almost instantaneously with ethanolic AgNO₃.'
      ],
      note: 'Công thức C₄H₉Cl; dẫn xuất halogen bậc ba có tốc độ thủy phân S_N1 nhanh nhất trong nhóm butyl chloride.',
      noteEn: 'Formula C₄H₉Cl; tertiary haloalkane showcasing ultra-fast SN1 hydrolysis.'
    },
    {
      id: 'propadiene',
      catKey: 'alkadiene',
      elements: ['C','C','C'],
      bonds: [[0,1,2],[1,2,2]],
      name: 'Propadiene (Allene)',
      nameEn: 'Propadiene (Allene)',
      category: 'Alkadiene',
      categoryEn: 'Alkadiene',
      state: 'Khí không màu (sôi ở −34,5 °C)',
      stateEn: 'Colorless gas (bp −34.5 °C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Alkadiene đơn giản nhất trong hóa học hữu cơ và là phân tử mẫu đại diện cho nhóm diene có hai nối đôi liền kề (cumulated diene) — có mặt cùng Propyne trong khí hàn công nghiệp MAPP.',
      realLifeEn: 'Simplest alkadiene (C₃H₄) and prototype cumulated diene ("allene"), blended with Propyne in MAPP industrial welding gas.',
      reactions: [
        'Làm mất màu nước Br₂ tối đa theo tỉ lệ 1 : 2 và làm mất màu dung dịch KMnO₄ ở điều kiện thường.',
        'KHÔNG phản ứng với AgNO₃/NH₃ (giúp phân biệt ngay với đồng phân Propyne có kết tủa vàng nhạt!).',
        'Cộng H₂ dư (Ni, t°) tạo khí Propane.'
      ],
      reactionsEn: [
        'Consumes up to 2 moles of Br₂(aq) and decolorizes cold KMnO₄.',
        'Unreactive toward AgNO₃/NH₃, cleanly distinguishing it from its isomer Propyne!',
        'Hydrogenates completely over Ni catalyst to Propane.'
      ],
      note: 'Công thức CH₂=C=CH₂ (C₃H₄); khác với Buta-1,3-diene liên hợp, hai mặt phẳng nhóm =CH₂ vuông góc nhau 90° qua nguyên tử C ở giữa.',
      noteEn: 'Formula C₃H₄; its two terminal CH₂ planes twist 90° perpendicular to each other around the linear sp center carbon.'
    },
    {
      id: 'pent-2-ene',
      catKey: 'alkene',
      elements: ['C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,2],[2,3,1],[3,4,1]],
      name: 'Pent-2-ene',
      nameEn: 'Pent-2-ene',
      category: 'Alkene',
      categoryEn: 'Alkene',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ở 36–37 °C)',
      stateEn: 'Colorless volatile liquid (bp 36–37 °C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Sản phẩm chính khi tách nước Pentan-2-ol hoặc tách HBr từ 2-bromopentane theo quy tắc Zaitsev; dùng trong công nghiệp hóa dầu sản xuất phụ gia nhiên liệu và chất đóng rắn nhựa.',
      realLifeEn: 'Major Zaitsev elimination alkene formed from Pentan-2-ol or 2-bromopentane, used in petrochemical fuel blending and metathesis reactions.',
      reactions: [
        'Làm mất màu nước Br₂ và dung dịch KMnO₄ loãng ở nhiệt độ thường.',
        'Tồn tại hai đồng phân hình học cis-pent-2-ene và trans-pent-2-ene (khác với Pent-1-ene không có đồng phân hình học).',
        'Cộng HBr tạo hỗn hợp 2-bromopentane và 3-bromopentane.'
      ],
      reactionsEn: [
        'Rapidly decolorizes aqueous bromine and cold KMnO₄.',
        'Exhibits cis–trans geometric isomerism across its internal double bond (unlike Pent-1-ene).',
        'Adds HBr to yield a mixture of 2- and 3-bromopentane.'
      ],
      note: 'Công thức C₅H₁₀; thường gặp trong câu hỏi đếm đồng phân cấu tạo và đồng phân hình học của Alkene C₅H₁₀.',
      noteEn: 'Formula C₅H₁₀; featured in Grade 11 alkene structural + cis/trans isomer counting problems.'
    },
    {
      id: 'methylcyclohexane',
      catKey: 'cycloalkane',
      elements: [...C6_AROM,'C'],
      bonds: [...C6_RING,[0,6,1]],
      name: 'Methylcyclohexane (MCH)',
      nameEn: 'Methylcyclohexane (MCH)',
      category: 'Cycloalkane',
      categoryEn: 'Cycloalkane',
      state: 'Lỏng không màu (mùi giống xăng nhẹ, sôi ở 101 °C)',
      stateEn: 'Colorless liquid (mild hydrocarbon odor, bp 101 °C)',
      solubility: 'Không tan trong nước',
      solubilityEn: 'Insoluble in water',
      realLife: 'Dung môi lau rửa công nghiệp, thành phần nhiên liệu phản lực có độ ổn định nhiệt cao và đặc biệt là chất mang lưu trữ – vận chuyển khí Hydrogen lỏng an toàn hàng đầu trong công nghệ năng lượng sạch hiện đại (chu trình MCH / Toluene).',
      realLifeEn: 'Clean-burning solvent, jet-fuel component, and leading Liquid Organic Hydrogen Carrier (LOHC) safely storing and transporting clean H₂ energy via reversible Toluene hydrogenation.',
      reactions: [
        'Tách H₂ trên xúc tác Pt/Al₂O₃ (reforming) giải phóng 3 mol H₂ và tạo lại Toluene.',
        'Trơ hoàn toàn với nước Br₂ và dung dịch KMnO₄ ở điều kiện thường (nhờ vòng 6 cạnh no bền vững).',
        'Tham gia phản ứng thế Cl₂ hoặc Br₂ khi chiếu sáng.'
      ],
      reactionsEn: [
        'Catalytic dehydrogenation releases 3 equivalents of pure H₂ fuel cleanly alongside recyclable Toluene.',
        'Inert toward cold aqueous bromine and KMnO₄ due to its strain-free saturated ring.',
        'Undergoes UV-initiated free-radical halogen substitution.'
      ],
      note: 'Công thức C₇H₁₄; đồng phân mạch vòng của Heptene và là cặp lưu trữ năng lượng xanh Toluene + 3 H₂ ⇌ Methylcyclohexane.',
      noteEn: 'Formula C₇H₁₄; cyclic isomer of Heptene and core green Hydrogen carrier pair with Toluene.'
    },
    {
      id: 'biphenyl',
      catKey: 'arene',
      elements: [...C6_AROM,...C6_AROM],
      bonds: [...BENZENE,[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[11,6,1],[0,6,1]],
      name: 'Biphenyl',
      nameEn: 'Biphenyl',
      category: 'Arene',
      categoryEn: 'Arene',
      state: 'Rắn (tinh thể vảy trắng, mùi thơm nhẹ đặc trưng, nóng chảy ở 69 °C)',
      stateEn: 'Solid (white flaky crystals, mp 69 °C)',
      solubility: 'Không tan trong nước, tan tốt trong dung môi hữu cơ',
      solubilityEn: 'Insoluble in water; soluble in organic solvents',
      realLife: 'Chất truyền nhiệt chịu nhiệt độ cao cực bền trong công nghiệp, từng dùng bọc giấy gói chống nấm mốc cho cam quýt xuất khẩu và làm khung cấu trúc cứng cho vật liệu tinh thể lỏng màn hình LCD.',
      realLifeEn: 'Thermally ultra-stable heat-transfer fluid, historic citrus shipping mold inhibitor, and rigid core building block of LCD liquid-crystal display molecules.',
      reactions: [
        'Tham gia phản ứng thế ái điện tử (halogen hóa, nitro hóa) vào vị trí para (số 4) dễ hơn Benzene.',
        'Không làm mất màu nước Br₂ và bền vững với KMnO₄ ở điều kiện thường.',
        'Hai vòng benzene liên kết qua một trục nối đơn C–C tự do xoay lệch góc nhau trong pha khí để giảm lực đẩy H.'
      ],
      reactionsEn: [
        'Undergoes electrophilic substitution faster than Benzene, selectively favoring the 4-para position.',
        'Resists aqueous bromine and KMnO₄ under ambient conditions.',
        'Features two phenyl rings linked by a single C–C bond (12 carbons total).'
      ],
      note: 'Công thức C₁₂H₁₀ (chứa 12 Carbon — giới hạn tối đa của trình dựng phân tử); khác Naphthalene ở chỗ 2 vòng nối đơn chứ không chung cạnh.',
      noteEn: 'Formula C₁₂H₁₀ (maximum 12 carbons supported in builder); unlike fused Naphthalene, its two phenyl rings join via a single C–C bond.'
    },

    // =========================================================================
    // 13. CARBOHYDRATE DISACCHARIDES, PEPTIDES, STRAINED CAGES & CLASSICS (+16)
    // =========================================================================
    {
      id: 'sucrose',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','O','C','O','O','O','O','O','C','C','C','C','O','C','O','O','O','C','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,0,1],[1,7,1],[2,8,1],[3,9,1],[4,6,1],[6,10,1],[0,11,1],[11,12,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,12,1],[12,17,1],[17,18,1],[13,19,1],[14,20,1],[15,21,1],[21,22,1]],
      name: 'Saccharose (Sucrose · Đường mía)',
      nameEn: 'Sucrose (Table sugar)',
      category: 'Carbohydrate (Disaccharide)',
      categoryEn: 'Carbohydrate (Disaccharide)',
      state: 'Rắn (tinh thể trong suốt không màu, vị ngọt sắc)',
      stateEn: 'Solid (colorless crystals, sweet taste)',
      solubility: 'Tan rất tốt trong nước (độ tan tăng mạnh theo nhiệt độ)',
      solubilityEn: 'Very soluble in water (~200 g/100 mL at 20 °C)',
      realLife: 'Loại đường phổ biến nhất trong gia đình được sản xuất từ cây mía, củ cải đường và thốt nốt (còn gọi là đường kính, đường phèn); giữ vai trò nguồn năng lượng quen thuộc, chất bảo quản mứt trái cây và sản xuất nước giải khát.',
      realLifeEn: 'Everyday household sugar extracted from sugarcane and sugar beets, prized globally for cooking, baking, fruit preserves, and beverage sweetening.',
      reactions: [
        'Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch màu XANH LAM đậm (tính chất nhiều nhóm -OH liền kề).',
        'KHÔNG tham gia phản ứng tráng bạc với AgNO₃/NH₃ và KHÔNG làm mất màu nước Brom (vì không thể tự mở vòng tạo aldehyde).',
        'Thủy phân trong dung dịch acid loãng đun nóng (hoặc nhờ enzyme invertase) thu được hỗn hợp đồng mol gồm Glucose và Fructose (dung dịch sau thủy phân tráng bạc dương tính!).'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at room temperature to form a deep blue polyalcohol complex.',
        'Does NOT reduce Tollens reagent (AgNO₃/NH₃) or decolorize bromine water because both anomeric centers are locked glycosidically.',
        'Acid-catalyzed or enzymatic hydrolysis splits 1 Sucrose cleanly into 1 Glucose + 1 Fructose (turning Tollens-positive afterward!).'
      ],
      note: 'Công thức C₁₂H₂₂O₁₁ (M = 342); cấu tạo từ 1 gốc α-glucose nối C₁→C₂ với 1 gốc β-fructose nên không còn nhóm -OH hemiacetal tự do.',
      noteEn: 'Formula C₁₂H₂₂O₁₁ (M = 342.30 g/mol); non-reducing α-1,2-glycoside uniting Glucopyranose and Fructofuranose.'
    },
    {
      id: 'maltose',
      catKey: 'carbohydrate',
      elements: ['C','C','C','C','C','O','C','O','O','O','O','O','C','C','C','C','C','O','C','O','O','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,0,1],[1,7,1],[2,8,1],[3,9,1],[4,6,1],[6,10,1],[0,11,1],[11,15,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,1],[17,12,1],[12,19,1],[13,20,1],[14,21,1],[16,18,1],[18,22,1]],
      name: 'Maltose (Đường mạch nha)',
      nameEn: 'Maltose (Malt sugar)',
      category: 'Carbohydrate (Disaccharide)',
      categoryEn: 'Carbohydrate (Disaccharide)',
      state: 'Rắn (tinh thể trắng) hoặc dạng mạch nha dẻo quánh vị ngọt dịu',
      stateEn: 'Solid (white crystals) / sweet viscous syrup',
      solubility: 'Tan rất tốt trong nước',
      solubilityEn: 'Very soluble in water',
      realLife: 'Đường mạch nha thu được khi thủy phân tinh bột nhờ enzyme amylase có trong mầm thóc lúa nảy mầm (làm kẹo kéo, kẹo Cu Đơ, vịt quay giòn da vàng bóng, ủ bia và thực phẩm dinh dưỡng dễ tiêu hóa).',
      realLifeEn: 'Malt sugar liberated by amylase enzymes acting on sprouting barley and rice starch; vital in brewing beer, malted milkshakes, chewy malt candies, and golden-roast glazes.',
      reactions: [
        'Hòa tan Cu(OH)₂ tạo dung dịch xanh lam và đun nóng xuất hiện kết tủa đỏ gạch Cu₂O; đồng thời THAM GIA phản ứng tráng bạc với AgNO₃/NH₃ và làm mất màu nước Brom!',
        'Thủy phân hoàn toàn trong môi trường acid đun nóng CHỈ tạo ra 2 phân tử Glucose duy nhất (khác Saccharose tạo Glucose + Fructose).',
        'Trong dung dịch tồn tại cân bằng mở vòng ở đơn vị Glucose thứ hai (liên kết α-1,4-glycoside).'
      ],
      reactionsEn: [
        'Dissolves Cu(OH)₂ at ambient temperature (blue), precipitates Cu₂O upon heating, yields a positive Tollens silver mirror, and decolorizes bromine water.',
        'Complete acid hydrolysis yields exclusively TWO equivalents of Glucose (unlike Sucrose).',
        'Remains a reducing sugar because one pyranose ring preserves a free anomeric hemiacetal -OH.'
      ],
      note: 'Công thức C₁₂H₂₂O₁₁ (M = 342); cặp phân biệt kinh điển với Saccharose: Maltose tráng bạc trực tiếp được còn Saccharose thì KHÔNG.',
      noteEn: 'Formula C₁₂H₂₂O₁₁ (M = 342.30 g/mol); reducing α-1,4-linked Glucose dimer isomeric with non-reducing Sucrose.'
    },
    {
      id: 'isopropyl-formate',
      catKey: 'ester',
      elements: ['C','O','O','C','C','C'],
      bonds: [[0,1,2],[0,2,1],[2,3,1],[3,4,1],[3,5,1]],
      name: 'Isopropyl formate (Isopropyl methanoate)',
      nameEn: 'Isopropyl formate (Isopropyl methanoate)',
      category: 'Ester',
      categoryEn: 'Ester',
      state: 'Lỏng không màu (dễ bay hơi, sôi ở 68 °C, mùi thơm mận chín)',
      stateEn: 'Colorless volatile liquid (bp 68 °C, sweet plum aroma)',
      solubility: 'Tan ít trong nước (~2,1 g/100 mL)',
      solubilityEn: 'Slightly soluble in water (~2.1 g/100 mL)',
      realLife: 'Là ester mạch nhánh duy nhất của bộ 4 đồng phân ester no đơn chức C₄H₈O₂, thường dùng làm dung môi khô nhanh, hương liệu trái cây và được phát hiện cả trong các đám mây phân tử ở trung tâm dải Ngân Hà.',
      realLifeEn: 'The sole branched structural isomer among C₄H₈O₂ saturated esters, prized in fruit-essence chemistry and famously detected in interstellar gas clouds near the Galactic Center.',
      reactions: [
        'Mang đầu formate HCOO– nên THAM GIA phản ứng tráng bạc (tạo 2 mol Ag) với thuốc thử Tollens (AgNO₃/NH₃).',
        'Xà phòng hóa trong dung dịch NaOH đun nóng thu được muối Sodium formate (HCOONa) và alcohol bậc hai Propan-2-ol.',
        'Làm mất màu dung dịch nước Brom khi đun nhẹ.'
      ],
      reactionsEn: [
        'Reduces Tollens reagent (AgNO₃/NH₃) to metallic silver thanks to its aldehyde-like formate headgroup.',
        'Hot NaOH hydrolysis produces Sodium formate and secondary alcohol Propan-2-ol.',
        'Reduces aqueous bromine gently upon warming.'
      ],
      note: 'Công thức C₄H₈O₂ (HCOOCH(CH₃)₂); hoàn thiện đủ bộ 4 đồng phân ester đơn chức C₄H₈O₂ (cùng Ethyl acetate, Methyl propionate và Propyl formate).',
      noteEn: 'Formula C₄H₈O₂; completes all 4 aliphatic monoester constitutional isomers of C₄H₈O₂.'
    },
    {
      id: 'ethylmethylamine',
      catKey: 'amine',
      elements: ['C','C','N','C'],
      bonds: [[0,1,1],[1,2,1],[2,3,1]],
      name: 'Ethylmethylamine (N-Methylethanamine)',
      nameEn: 'Ethylmethylamine (N-Methylethanamine)',
      category: 'Amine',
      categoryEn: 'Amine',
      state: 'Lỏng không màu (rất dễ bay hơi, sôi ở 36 °C, mùi cá khai giống ammonia)',
      stateEn: 'Colorless volatile liquid (bp 36 °C, fishy ammonia odor)',
      solubility: 'Tan vô hạn trong nước',
      solubilityEn: 'Miscible with water',
      realLife: 'Amine bậc hai bất đối xứng đơn giản nhất, dùng làm khối xây dựng tổng hợp các hoạt chất dược phẩm hệ thần kinh (như thuốc điều trị Alzheimer Rivastigmine), thuốc trừ sâu và chất nhũ hóa công nghiệp.',
      realLifeEn: 'Simplest unsymmetrical secondary amine, employed in pharmaceutical synthesis (including the neurological drug Rivastigmine) and rubber curing agents.',
      reactions: [
        'Tính base mạnh hơn cả NH₃ và các amine bậc một tương ứng: làm quỳ tím hóa xanh và hòa tan nhanh trong HCl.',
        'Tác dụng với acid nitrous (HNO₂) tạo hợp chất nitrosamine dạng dầu vàng nhạt (phản ứng phân biệt amine bậc hai).',
        'Không tham gia phản ứng tạo khí N₂ khi gặp HNO₂ như amine bậc một.'
      ],
      reactionsEn: [
        'Stronger aqueous base than Ammonia or primary C₃H₉N amines; turns litmus blue cleanly.',
        'Reacts with nitrous acid (HNO₂) to separate a pale-yellow oily N-nitrosamine rather than evolving N₂ gas.',
        'Readily forms tertiary amides with acid anhydrides or acyl chlorides.'
      ],
      note: 'Công thức CH₃–CH₂–NH–CH₃ (C₃H₉N); là amine bậc hai duy nhất trong nhóm đồng phân amine C₃H₉N.',
      noteEn: 'Formula C₃H₉N; the sole secondary amine isomer in the classic 4-isomer C₃H₉N Grade 12 set.'
    },
    {
      id: 'vinyl-alcohol',
      catKey: 'alcohol',
      elements: ['C','C','O'],
      bonds: [[0,1,2],[1,2,1]],
      name: 'Vinyl alcohol (Ethenol)',
      nameEn: 'Vinyl alcohol (Ethenol)',
      category: 'Alcohol (Enol không bền)',
      categoryEn: 'Alcohol (Unstable enol)',
      state: 'Cực kỳ kém bền, gần như lập tức chuyển hóa thành Acetaldehyde',
      stateEn: 'Transient unstable tautomer (rearranges to Acetaldehyde)',
      solubility: 'Tan trong dung môi khi phát sinh tức thời',
      solubilityEn: 'Transient in solution',
      realLife: 'Dù không thể đóng chai đứng riêng (vì tự chuyển vị ngay thành Acetaldehyde), dạng mắt xích Vinyl alcohol lại tạo thành polymer Polyvinyl alcohol (PVA) làm màng bọc viên giặt tự tan trong nước, hồ vải và nước nhỏ mắt nhân tạo!',
      realLifeEn: 'Too unstable to isolate free (rapidly tautomerizing to Acetaldehyde), yet its polymerized backbone makes Polyvinyl alcohol (PVA) for water-soluble laundry pods, glues, and artificial tear drops!',
      reactions: [
        'Không bền hóa học: nhóm -OH gắn trực tiếp vào Carbon mang nối đôi C=C tự động chuyển vị ngay thành aldehyde Acetaldehyde (CH₂=CH–OH → CH₃–CHO).',
        'Chính quá trình chuyển vị này giải thích vì sao thủy phân Vinyl acetate không thu được alcohol mà thu được Acetaldehyde tráng bạc!',
        'Là đồng phân hỗ biến (tautomer) với Acetaldehyde.'
      ],
      reactionsEn: [
        'Instantaneous keto–enol tautomerization converts CH₂=CH–OH rapidly into Acetaldehyde (CH₃–CHO).',
        'Explains why alkaline hydrolysis of Vinyl acetate yields Aldehyde instead of an alcohol.',
        'Polyvinyl alcohol (PVA) must therefore be synthesized by hydrolyzing Poly(vinyl acetate), not by polymerizing Vinyl alcohol.'
      ],
      note: 'Công thức C₂H₄O; bài học kinh điển: alcohol có -OH gắn trực tiếp vào C nối đôi sẽ kém bền và chuyển hóa sang aldehyde/ketone.',
      noteEn: 'Formula C₂H₄O; textbook unstable enol tautomer of Acetaldehyde and monomer unit represented indirectly by PVA.'
    },
    {
      id: 'triglycine',
      catKey: 'aminoacid',
      elements: ['N','C','C','O','N','C','C','O','N','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,2],[2,4,1],[4,5,1],[5,6,1],[6,7,2],[6,8,1],[8,9,1],[9,10,1],[10,11,2],[10,12,1]],
      name: 'Triglycine (Gly-Gly-Gly)',
      nameEn: 'Triglycine (Gly-Gly-Gly)',
      category: 'Tripeptide (Amino acid)',
      categoryEn: 'Tripeptide',
      state: 'Rắn (bột tinh thể trắng)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water',
      realLife: 'Tripeptide đơn giản nhất được ghép từ ba mắt xích Glycine qua 2 liên kết peptide (–CO–NH–); là phân tử mẫu nhỏ nhất dùng trong thực hành phòng thí nghiệm để minh họa phản ứng màu Biuret tím đặc trưng của Peptide và Protein.',
      realLifeEn: 'Simplest tripeptide linking three Glycine residues via two peptide bonds; serves in classrooms as the smallest textbook molecule giving a positive purple Biuret reaction.',
      reactions: [
        'CHO PHẢN ỨNG MÀU BIURET (tạo phức chất MÀU TÍM ĐẶC TRƯNG với Cu(OH)₂ trong môi trường kiềm) nhờ chứa tối thiểu 2 liên kết peptide (khác với dipeptide Gly-Gly âm tính!).',
        'Thủy phân hoàn toàn trong NaOH đun nóng theo tỉ lệ mol 1 : 3 (tạo 3 mol muối Glycine-Na và 1 H₂O); trong HCl dư tỉ lệ 1 : 3 kèm 2 H₂O.',
        'Gồm 3 mắt xích Glycine với 2 liên kết peptide trong chuỗi.'
      ],
      reactionsEn: [
        'Gives a vivid VIOLET Biuret complex with alkaline Cu(OH)₂ (positive because it possesses ≥ 2 peptide bonds, unlike dipeptide Gly-Gly!).',
        'Consumes 3 moles of NaOH or HCl upon complete hot peptide hydrolysis into 3 equivalents of Glycine salts.',
        'Serves as a quantitative model for peptide-bond stoichiometry in Grade 12 exams.'
      ],
      note: 'Công thức C₆H₁₁N₃O₄ (M = 189,2); luôn nhớ cặp so sánh: Gly-Gly (dipeptide, KHÔNG Biuret) vs. Gly-Gly-Gly (tripeptide, CÓ màu tím Biuret).',
      noteEn: 'Formula C₆H₁₁N₃O₄ (M = 189.17 g/mol); smallest peptide showing positive violet Biuret reactivity.'
    },
    {
      id: 'penguinone',
      catKey: 'ketone',
      elements: ['C','C','C','C','C','C','O','C','C','C','C'],
      bonds: [[0,1,1],[1,2,2],[2,3,1],[3,4,1],[4,5,2],[5,0,1],[0,6,2],[2,7,1],[3,8,1],[3,9,1],[4,10,1]],
      name: 'Penguinone (Chim cánh cụt)',
      nameEn: 'Penguinone',
      category: 'Ketone (Phân tử hình tượng)',
      categoryEn: 'Ketone (Trivial icon)',
      state: 'Dầu lỏng vàng nhạt đến tinh thể sáp nhẹ (mùi long não thơm)',
      stateEn: 'Pale yellow oil / low-melting solid (camphor odor)',
      solubility: 'Không tan trong nước, tan tốt trong dung môi hữu cơ',
      solubilityEn: 'Insoluble in water; soluble in organic solvents',
      realLife: 'Một trong những phân tử nổi tiếng vui nhộn nhất của Hóa học hữu cơ với công thức cấu tạo 2D giống hệt một chú chim cánh cụt mũm mĩm đang đứng giơ hai cánh vẫy (mỏ =O trên đầu, hai chân -CH₃ bên dưới); thường được in trên áo thun hóa học và giáo trình giảng dạy tạo hứng thú cho học sinh.',
      realLifeEn: 'Famous whimsy icon in organic chemistry whose 2D skeletal structure unmistakably resembles a cheerful standing penguin waving two flippers with its =O beak on top and two methyl feet below.',
      reactions: [
        'Làm mất màu dung dịch Br₂ và KMnO₄ ở nhiệt độ thường nhờ 2 liên kết đôi C=C trong vòng 6 cạnh.',
        'Vòng cyclohexadienone bị kẹp giữa hai nhóm methyl bậc bốn khiến phân tử không thể dễ dàng chuyển vị enol hóa thành phenol (tồn tại bền ở dạng ketone).',
        'Phản ứng với thuốc thử 2,4-DNPH cho dẫn xuất hydrazone màu đỏ cam.'
      ],
      reactionsEn: [
        'Decolorizes bromine water and cold KMnO₄ via its cross-conjugated ring double bonds.',
        'Gem-dimethyl substitution blocks enol tautomerization, locking the molecule in its stable penguinone ketone form.',
        'Forms a bright orange-red hydrazone derivative with 2,4-DNPH.'
      ],
      note: 'Tên hệ thống IUPAC: 3,4,4,5-tetramethylcyclohexa-2,5-dien-1-one (C₁₀H₁₄O).',
      noteEn: 'Systematic IUPAC name: 3,4,4,5-tetramethylcyclohexa-2,5-dien-1-one (C₁₀H₁₄O).'
    },
    {
      id: 'prismane',
      catKey: 'cycloalkane',
      elements: ['C','C','C','C','C','C'],
      bonds: [[0,1,1],[1,2,1],[2,0,1],[3,4,1],[4,5,1],[5,3,1],[0,3,1],[1,4,1],[2,5,1]],
      name: 'Prismane (Benzene của Ladenburg)',
      nameEn: 'Prismane (Ladenburg benzene)',
      category: 'Cycloalkane (Đa vòng hình lăng trụ)',
      categoryEn: 'Polycyclic alkane (Prism cage)',
      state: 'Chất lỏng không màu rất kém bền (dễ nổ mạnh khi va đập hoặc đun nóng)',
      stateEn: 'Colorless volatile liquid (explosive upon heating or shock)',
      solubility: 'Không tan trong nước, tan trong dung môi không phân cực',
      solubilityEn: 'Insoluble in water; soluble in organic solvents',
      realLife: 'Cấu trúc lăng trụ tam giác kỳ thú do Albert Ladenburg đề xuất năm 1869 như một giả thuyết hình học thay thế cho vòng Benzene trước khi cấu trúc thơm của Kekulé được khẳng định; hơn 100 năm sau mới được tổng hợp thành công trong phòng thí nghiệm năm 1973.',
      realLifeEn: 'Famous triangular-prism valence isomer of Benzene (C₆H₆) proposed historically by Albert Ladenburg in 1869 before Kekulé’s aromatic structure triumphed, finally synthesized in 1973.',
      reactions: [
        'Hoàn toàn không có nối đôi nhưng có mức năng lượng sức căng rất lớn (kết hợp hai vòng 3 cạnh và ba vòng 4 cạnh).',
        'Khi đun nóng ở khoảng 90 °C tự đồng phân hóa tỏa nhiệt mạnh chuyển trở lại thành Benzene thơm bền vững!',
        'Khó bền cơ học và nhạy nổ khi cô đặc tinh khiết.'
      ],
      reactionsEn: [
        'Built purely of single C–C bonds combining two cyclopropane and three cyclobutane faces.',
        'Exothermically isomerizes back into aromatic Benzene at ~90 °C (violating Woodward–Hoffmann allowed speed to stay temporarily isolable).',
        'Explosive liquid when handled neat.'
      ],
      note: 'Công thức C₆H₆; bộ đồng phân hóa trị kinh điển của Benzene gồm: Benzene – Prismane – Dewar benzene.',
      noteEn: 'Formula C₆H₆; part of the classic C₆H₆ valence isomer triad alongside Benzene and Dewar benzene.'
    },
    {
      id: 'dewar-benzene',
      catKey: 'cycloalkene',
      elements: ['C','C','C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,1],[3,4,2],[4,5,1],[5,0,1],[2,5,1]],
      name: 'Dewar benzene',
      nameEn: 'Dewar benzene',
      category: 'Cycloalkene (Hai vòng chung cạnh)',
      categoryEn: 'Bicyclic diene',
      state: 'Chất lỏng không màu (kém bền, dễ bay hơi)',
      stateEn: 'Colorless volatile liquid',
      solubility: 'Không tan trong nước, tan tốt trong dung môi hữu cơ',
      solubilityEn: 'Insoluble in water; soluble in organic solvents',
      realLife: 'Cấu trúc gập cánh sách hai vòng 4 cạnh chung cạnh do James Dewar phác họa năm 1867 nhằm mô tả đồng phân phi thơm của Benzene; được tổng hợp thực nghiệm thành công năm 1962 và trở thành ví dụ vàng kiểm chứng quy tắc đối xứng quỹ đạo Woodward–Hoffmann.',
      realLifeEn: 'Open-book bicyclo[2.2.0]hexadiene valence isomer sketched by James Dewar in 1867 and synthesized cleanly in 1962; celebrated showcase of Woodward–Hoffmann orbital-symmetry kinetic barriers.',
      reactions: [
        'Làm mất màu dung dịch nước Brom và KMnO₄ ở điều kiện thường nhờ có 2 liên kết đôi C=C thực sự (không có tính thơm!).',
        'Khi đun nóng ở ~90 °C (hoặc chu kỳ bán rã vài ngày ở 25 °C) mở cầu nối giữa để chuyển về Benzene thơm bền vững hơn nhiều.',
        'Dù tỏa tới ~250 kJ/mol khi chuyển thành Benzene, quá trình bị cản trở đối xứng quỹ đạo nên vẫn cô lập được ở nhiệt độ thấp.'
      ],
      reactionsEn: [
        'Decolorizes bromine water and cold KMnO₄ rapidly as a genuine localized bicyclic diene.',
        'Reverts slowly at room temperature (half-life ~2 days) or rapidly at ~90 °C back into Benzene.',
        'Remains remarkably isolable despite ~250 kJ/mol ring strain because disrotatory ring-opening is thermally orbital-symmetry forbidden.'
      ],
      note: 'Công thức C₆H₆ (Bicyclo[2.2.0]hexa-2,5-diene); cùng công thức Benzene nhưng không phẳng và mất màu được nước Brom.',
      noteEn: 'Formula C₆H₆ (bicyclo[2.2.0]hexa-2,5-diene); bent non-aromatic valence isomer of Benzene.'
    },
    {
      id: 'squaric-acid',
      catKey: 'carboxylic',
      elements: ['C','C','C','C','O','O','O','O'],
      bonds: [[0,1,2],[1,2,1],[2,3,1],[3,0,1],[0,4,1],[1,5,1],[2,6,2],[3,7,2]],
      name: 'Squaric acid (Acid hình vuông)',
      nameEn: 'Squaric acid (Quadratic acid)',
      category: 'Acid hữu cơ mạnh (Oxocarbon)',
      categoryEn: 'Strong vinylogous diacid',
      state: 'Rắn (bột tinh thể trắng tinh khiết)',
      stateEn: 'Solid (white crystalline powder)',
      solubility: 'Tan vừa trong nước nóng (~2 g/100 mL ở 20 °C)',
      solubilityEn: 'Sparingly soluble cold; soluble in hot water',
      realLife: 'Hợp chất nổi tiếng có khung vòng 4 cạnh vuông vức đều đặn với tên gọi xuất phát từ hình vuông ("square"); được dùng để chế tạo thuốc thử nhận biết ion Fe³⁺/Ca²⁺ và tổng hợp phẩm màu Squaraine hấp thụ ánh sáng cận hồng ngoại cho pin mặt trời và cảm biến sinh học.',
      realLifeEn: 'Planar 4-membered oxocarbon acid named for its square ring geometry; building block for bright NIR-absorbing squaraine dyes in organic solar cells and bio-imaging.',
      reactions: [
        'Dù KHÔNG chứa nhóm -COOH mà chỉ mang cụm enediol-diketone nhưng lại có LỰC ACID RẤT MẠNH (pKa₁ ≈ 1,5 — mạnh gần bằng Phosphoric acid và mạnh hơn hẳn Acetic acid!).',
        'Tác dụng với NaOH theo tỉ lệ 1 : 2 tạo ion dianion C₄O₄²⁻ đối xứng hoàn toàn mang tính thơm 2π-electron.',
        'Tạo phức màu đỏ tím đậm rất nhạy với dung dịch FeCl₃.'
      ],
      reactionsEn: [
        'Remarkably strong organic acid (pKa₁ ≈ 1.5, vastly stronger than Acetic acid!) despite having ZERO -COOH groups, stabilized by its 2π-aromatic C₄O₄²⁻ dianion.',
        'Consumes 2 equivalents of NaOH and effervesces vigorously with carbonates.',
        'Produces an intense burgundy-violet chelate color with aqueous FeCl₃.'
      ],
      note: 'Công thức C₄H₂O₄ (3,4-dihydroxycyclobut-3-ene-1,2-dione); minh chứng ngoạn mục cho sự ổn định cộng hưởng thơm trong ion C₄O₄²⁻.',
      noteEn: 'Formula C₄H₂O₄; famous example of strong organic acidity without a carboxyl group thanks to 2π aromaticity.'
    },
    {
      id: 'mellitic-acid',
      catKey: 'carboxylic',
      elements: [...C6_AROM,'C','O','O','C','O','O','C','O','O','C','O','O','C','O','O','C','O','O'],
      bonds: [...BENZENE,[0,6,1],[6,7,2],[6,8,1],[1,9,1],[9,10,2],[9,11,1],[2,12,1],[12,13,2],[12,14,1],[3,15,1],[15,16,2],[15,17,1],[4,18,1],[18,19,2],[18,20,1],[5,21,1],[21,22,2],[21,23,1]],
      name: 'Mellitic acid (Benzenehexacarboxylic acid)',
      nameEn: 'Mellitic acid',
      category: 'Carboxylic acid (6 chức)',
      categoryEn: 'Carboxylic acid (Hexaacid)',
      state: 'Rắn (tinh thể hình kim trắng, mượt như lụa)',
      stateEn: 'Solid (white silky needle crystals)',
      solubility: 'Tan rất tốt trong nước và Ethanol',
      solubilityEn: 'Very soluble in water and Ethanol',
      realLife: 'Tìm thấy trong tự nhiên dưới dạng khoáng vật đá mật ong "Mellite" màu vàng trong các vỉa than nâu; khi đun khử nước hết phân tử này tạo thành anhydride C₁₂O₉ không chứa bất kỳ nguyên tử Hydrogen nào và đóng vai trò chất kết nối đa năng tổng hợp khung cơ kim MOF.',
      realLifeEn: 'Naturally occurs as the amber-colored "honey-stone" aluminum salt mineral Mellite; hexadentate linker in Metal–Organic Frameworks (MOFs) and classic gateway to Hydrogen-free C₁₂O₉ oxocarbon.',
      reactions: [
        'Mang đủ 6 nhóm -COOH gắn kín toàn bộ 6 đỉnh vòng Benzene: tác dụng với NaOH theo tỉ lệ tối đa 1 : 6 và giải phóng 6 mol CO₂ khi gặp NaHCO₃ dư.',
        'Đun nóng tách 3 phân tử H₂O tạo thành Mellitic trianhydride (C₁₂O₉ — hợp chất chỉ gồm C và O)!',
        'Rất bền nhiệt và bền vững với các chất oxi hóa như dung dịch HNO₃ hoặc H₂SO₄ đặc.'
      ],
      reactionsEn: [
        'Hexacarboxylic aromatic acid neutralizing 6 equivalents of NaOH and liberating 6 moles of CO₂ from excess NaHCO₃.',
        'Exhaustive thermal dehydration yields Mellitic trianhydride (C₁₂O₉), a molecular carbon oxide.',
        'Resistant to oxidative destruction by boiling Nitric acid.'
      ],
      note: 'Công thức C₁₂H₆O₁₂ (M = 342,2 — đúng bằng phân tử khối Saccharose/Maltose C₁₂H₂₂O₁₁ nhưng số O gấp đôi H!).',
      noteEn: 'Formula C₁₂H₆O₁₂ (M = 342.17 g/mol — coincidentally identical molar mass to Sucrose C₁₂H₂₂O₁₁).'
    },
    {
      id: 'azulene',
      catKey: 'arene',
      elements: ['C','C','C','C','C','C','C','C','C','C'],
      bonds: [[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[9,0,1],[0,4,1]],
      name: 'Azulene (Hydrocarbon màu xanh lam)',
      nameEn: 'Azulene',
      category: 'Arene (Thơm không benzenoid)',
      categoryEn: 'Arene (Non-benzenoid aromatic)',
      state: 'Rắn (tinh thể vảy MÀU XANH LAM ĐẬM rực rỡ, mùi thơm nhẹ giống Naphthalene)',
      stateEn: 'Solid (deep ROYAL BLUE crystalline flakes, naphthalene-like odor)',
      solubility: 'Không tan trong nước, tan tốt trong dung môi hữu cơ (tạo dung dịch màu xanh biếc)',
      solubilityEn: 'Insoluble in water; forms vivid sapphire-blue organic solutions',
      realLife: 'Hiện tượng kỳ diệu của Hóa học hữu cơ: dù là hydrocarbon đồng phân trực tiếp của Naphthalene trắng (C₁₀H₈), Azulene lại sở hữu MÀU XANH LAM ĐẬM rực rỡ hiếm có (tên bắt nguồn từ chữ "azul" nghĩa là xanh dương); dẫn xuất tự nhiên của nó tạo màu xanh cho tinh dầu hoa cúc La Mã làm dịu da và một số loài nấm rừng màu lam.',
      realLifeEn: 'Chemical marvel: a pure C₁₀H₈ isomer of colorless white Naphthalene that glows intense ROYAL BLUE ("azul"), giving chamomile soothing skincare oils and rare Lactarius indigo mushrooms their striking blue hue.',
      reactions: [
        'Đáp ứng quy tắc thơm Hückel với hệ liên hợp 10π-electron chạy dọc chu vi vòng 5 cạnh + vòng 7 cạnh dung hợp.',
        'Có tính phân cực điện rõ rệt (khác hoàn toàn Naphthalene không phân cực!) do vòng 7 cạnh nhường bớt mật độ electron cho vòng 5 cạnh tạo cặp vòng thơm bổ trợ.',
        'Khi nung nóng khoảng 350 °C trong pha khí có thể chuyển vị dần thành Naphthalene bền nhiệt hơn.'
      ],
      reactionsEn: [
        'Non-benzenoid 10π-electron Hückel aromatic uniting a 5-membered and 7-membered ring.',
        'Exhibits an unusually large 1.08 D dipole moment for a hydrocarbon because partial charge transfer creates an aromatic 6π cyclopentadienide + 6π tropylium resonance pair.',
        'Thermal isomerization above 350 °C rearranges Azulene cleanly into more stable Naphthalene.'
      ],
      note: 'Công thức C₁₀H₈; cùng công thức phân tử với Naphthalene (trắng, không phân cực) nhưng Azulene lại xanh dương rực rỡ và phân cực rõ.',
      noteEn: 'Formula C₁₀H₈; striking chromatic and dipolar contrast against its structural isomer Naphthalene.'
    },
    {
      id: 'tetrahedrane',
      catKey: 'cycloalkane',
      elements: ['C','C','C','C'],
      bonds: [[0,1,1],[0,2,1],[0,3,1],[1,2,1],[1,3,1],[2,3,1]],
      name: 'Tetrahedrane',
      nameEn: 'Tetrahedrane',
      category: 'Cycloalkane (Hình khối tứ diện)',
      categoryEn: 'Polycyclic alkane (Tetrahedral cage)',
      state: 'Cực kỳ kém bền ở dạng chưa gắn nhóm thế (các dẫn xuất thế cồng kềnh ở thể rắn tinh thể)',
      stateEn: 'Parent extremely strained; bulky substituted derivatives form stable solids',
      solubility: 'Tan trong dung môi không phân cực (với dẫn xuất bền)',
      solubilityEn: 'Soluble in nonpolar solvents (substituted analogs)',
      realLife: 'Khối tứ diện đều nhỏ nhất trong hình học Platonic hydrocarbon: 4 nguyên tử Carbon nối đôi một với cả 3 nguyên tử còn lại tạo góc liên kết cực nhỏ (~60°); dù phân tử mẹ C₄H₄ rất kém bền, phiên bản gắn 4 nhóm tert-butyl cồng kềnh lại tổng hợp thành tinh thể bền nhiệt tới 135 °C!',
      realLifeEn: 'Simplest Platonic cage hydrocarbon where all four Carbons sit bonded identically at vertices of a regular tetrahedron; although naked C₄H₄ is fleeting, tetra-tert-butyltetrahedrane forms surprisingly stable crystals melting at 135 °C.',
      reactions: [
        'Mọi liên kết C–C đều là liên kết đơn nhưng mang 3 mặt tam giác độc lập (độ bất bão hòa k = 3 bằng với Vinylacetylene!).',
        'Sức căng góc cực lớn khiến dẫn xuất có xu hướng mở vòng thành Cyclobutadiene khi đun nóng hoặc chiếu xạ.',
        'Phản ứng cháy tỏa năng lượng giải phóng sức căng cấu trúc khổng lồ.'
      ],
      reactionsEn: [
        'All six edges are single C–C bonds, yielding 3 independent degrees of unsaturation.',
        'Reversibly photo-isomerizes with stabilized Cyclobutadiene derivatives.',
        'High internal ring strain dramatically elevates enthalpy of combustion.'
      ],
      note: 'Công thức C₄H₄ (cùng công thức với Vinylacetylene nhưng 100% liên kết đơn dạng khối tứ diện K₄).',
      noteEn: 'Formula C₄H₄; tetrahedral K₄ structural isomer of acyclic Vinylacetylene.'
    },
    {
      id: 'chloral-hydrate',
      catKey: 'alcohol',
      elements: ['C','C','Cl','Cl','Cl','O','O'],
      bonds: [[0,1,1],[0,2,1],[0,3,1],[0,4,1],[1,5,1],[1,6,1]],
      name: 'Chloral hydrate',
      nameEn: 'Chloral hydrate',
      category: 'Alcohol / Dẫn xuất Halogen (Gem-diol bền)',
      categoryEn: 'Alcohol / Halogenated gem-diol',
      state: 'Rắn (tinh thể trong suốt không màu, mùi hắc giống dưa lưới nồng)',
      stateEn: 'Solid (colorless crystals, pungent aromatic odor)',
      solubility: 'Tan cực kỳ tốt trong nước (~800 g/100 mL)',
      solubilityEn: 'Extremely soluble in water (~800 g/100 mL)',
      realLife: 'Thuốc an thần gây ngủ cổ điển đầu tiên do Justus von Liebig tổng hợp năm 1832 (còn gắn với tên lóng "thuốc mê tức thời" trong tiểu thuyết trinh thám xưa khi nhỏ vào đồ uống có cồn); ngày nay chủ yếu dùng trong phòng thí nghiệm soi hiển vi thực vật và sinh học.',
      realLifeEn: 'Historic first synthetic hypnotic sedative synthesized by Liebig in 1832; chemically famous today as an optical clearing reagent in plant microscopy and classic textbook exception to Erlenmeyer’s gem-diol rule.',
      reactions: [
        'Ngoại lệ kinh điển: hai nhóm -OH gắn trên CÙNG 1 nguyên tử Carbon (gem-diol) hoàn toàn BỀN VỮNG thành tinh thể rắn (nhờ nhóm -CCl₃ hút electron cực mạnh và liên kết nội phân tử), thay vì tách nước thành aldehyde như thông thường!',
        'Đun với dung dịch kiềm NaOH đặc bị cắt mạch (phản ứng Haloform) tạo Chloroform (CHCl₃) và muối Sodium formate (HCOONa).',
        'Đun nóng với H₂SO₄ đặc mất nước thu hồi trở lại Trichloroacetaldehyde (Chloral).'
      ],
      reactionsEn: [
        'Rare isolable crystalline geminal diol (2 -OH on one C) stabilized strongly by the electron-withdrawing -CCl₃ group.',
        'Warm aqueous alkali cleaves the C–C bond via haloform-like cleavage into Chloroform and Sodium formate.',
        'Conc. H₂SO₄ dehydrates the solid cleanly back to oily Chloral (CCl₃CHO).'
      ],
      note: 'Công thức C₂H₃Cl₃O₂ (CCl₃–CH(OH)₂); cùng với Methanediol là hai ví dụ kinh điển phá vỡ quy tắc "2 nhóm -OH trên 1 C không bền".',
      noteEn: 'Formula C₂H₃Cl₃O₂ (2,2,2-trichloroethane-1,1-diol); alongside Methanediol, proves geminal diols can stabilize under strong electronic withdrawal.'
    },
    {
      id: 'aminooxyacetic-acid',
      catKey: 'carboxylic',
      elements: ['N','O','C','C','O','O'],
      bonds: [[0,1,1],[1,2,1],[2,3,1],[3,4,2],[3,5,1]],
      name: 'Aminooxyacetic acid (AOA)',
      nameEn: 'Aminooxyacetic acid (AOA)',
      category: 'Carboxylic acid (Tạp chức Oxyamine)',
      categoryEn: 'Carboxylic acid (Oxyamine)',
      state: 'Rắn (tinh thể trắng, thường dùng dạng muối hydrochloride ổn định)',
      stateEn: 'Solid (white crystals / stable hydrochloride salt)',
      solubility: 'Tan tốt trong nước',
      solubilityEn: 'Soluble in water',
      realLife: 'Chất ức chế mạnh các enzyme phụ thuộc vitamin B6 (như enzyme tổng hợp Ethylene gây chín héo hoa) nên được ứng dụng trong ngành trồng hoa cắt cành thương mại để kéo dài thời gian tươi lâu của hoa cẩm chướng, hoa hồng sau thu hoạch!',
      realLifeEn: 'Potent inhibitor of PLP-dependent enzymes and Ethylene biosynthesis, applied commercially to extend vase life of freshly cut carnations and ornamental flowers.',
      reactions: [
        'Phân tử tạp chức độc đáo mang đồng thời nhóm Carboxylic (-COOH) và cầu Oxyamine (-O-NH₂), phản ứng được với cả HCl lẫn NaOH.',
        'Nhóm –O–NH₂ dễ dàng ngưng tụ tạo liên kết Oxime rất bền với nhóm Aldehyde của coenzyme vitamin B6 (pyridoxal phosphate).',
        'Đun với dung dịch kiềm hoặc acid thể hiện tính chất đặc trưng của carboxylic acid.'
      ],
      reactionsEn: [
        'Unusual bifunctional aminooxy acid pairing a carboxylic acid with an –O–NH₂ hydroxylamine ether.',
        'Terminal –O–NH₂ reacts rapidly with coenzyme PLP aldehyde groups to form stable inhibitory oximes.',
        'Displays zwitterionic and acid–base neutralization reactivity.'
      ],
      note: 'Công thức H₂N–O–CH₂–COOH (C₂H₅NO₃); hợp chất mẫu kết hợp đồng thời cầu dị tố O–N và chức -COOH.',
      noteEn: 'Formula C₂H₅NO₃; intriguing bifunctional acid combining –COOH with an O-substituted hydroxylamine bridge.'
    },
    {
      id: 'carbon-suboxide',
      catKey: 'custom',
      elements: ['O','C','C','C','O'],
      bonds: [[0,1,2],[1,2,2],[2,3,2],[3,4,2]],
      name: 'Carbon suboxide (C₃O₂ · Tricarbon dioxide)',
      nameEn: 'Carbon suboxide (C₃O₂)',
      category: 'Oxocarbon hữu cơ (Cumulene)',
      categoryEn: 'Oxocarbon / Cumulene',
      state: 'Khí không màu (sôi ở 6,8 °C, mùi rất hắc cay nồng)',
      stateEn: 'Colorless pungent fuming gas (bp 6.8 °C)',
      solubility: 'Phản ứng nhanh với nước tạo Malonic acid',
      solubilityEn: 'Hydrolyzes cleanly in water into Malonic acid',
      realLife: 'Phân tử thẳng hàng hoàn hảo không chứa bất kỳ nguyên tử Hydrogen nào (O=C=C=C=O, chuỗi 4 nối đôi liền kề — cumulene), thực chất chính là "anhydride kép" của Malonic acid; cũng góp mặt ở lượng vết trong khí quyển Sao Hỏa và dễ polymer hóa tạo lớp màng Carbon màu đỏ cam.',
      realLifeEn: 'Remarkable Hydrogen-free linear cumulene (O=C=C=C=O) acting as the double anhydride of Malonic acid; detected in trace extraterrestrial chemistry and spontaneously polymerizes at room temperature into red-brown poly(carbon suboxide).',
      reactions: [
        'Tác dụng nhanh với nước (H₂O) theo tỉ lệ 1 : 2 tái tạo hoàn toàn Malonic acid: O=C=C=C=O + 2 H₂O → HOOC–CH₂–COOH!',
        'Được điều chế trực tiếp trong phòng thí nghiệm bằng cách khử nước Malonic acid với chất hút ẩm cực mạnh P₂O₅ (P₄O₁₀).',
        'Phản ứng với Ethanol tạo Diethyl malonate và với Ammonia tạo Malonamide.'
      ],
      reactionsEn: [
        'Reacts cleanly with 2 equivalents of H₂O to yield Malonic acid (serves functionally as Malonic acid bis-anhydride).',
        'Synthesized classically by dehydrating Malonic acid thoroughly over P₄O₁₀.',
        'Reacts rapidly with Alcohols and Amines to afford malonate esters and malonamides.'
      ],
      note: 'Công thức C₃O₂ (M = 68,031 g/mol); hoàn toàn không có nguyên tử Hydrogen nào nhưng bắt nguồn trực tiếp từ hữu cơ Malonic acid.',
      noteEn: 'Formula C₃O₂ (M = 68.031 g/mol); rare all-C/O Hydrogen-free linear oxocarbon derived directly from Malonic acid.'
    }
  ];

  global.ORGANIC_COMPOUNDS = ORGANIC_COMPOUNDS;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ORGANIC_COMPOUNDS;
  }
})(typeof window !== 'undefined' ? window : globalThis);
