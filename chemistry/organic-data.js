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
    }
  ];

  global.ORGANIC_COMPOUNDS = ORGANIC_COMPOUNDS;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ORGANIC_COMPOUNDS;
  }
})(typeof window !== 'undefined' ? window : globalThis);
