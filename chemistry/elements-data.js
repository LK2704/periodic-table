// Complete Periodic Table of 118 Chemical Elements
// Data includes Vietnamese & English names, IUPAC atomic mass, shell configuration,
// physical/chemical properties, and classification (Kim loại / Phi kim / Á kim / Khí hiếm).

window.ELEMENT_CATEGORIES = {
  'alkali-metal': {
    label: 'Kim loại kiềm',
    labelEn: 'Alkali Metal',
    macro: 'metal',
    macroLabel: 'Kim loại',
    macroLabelEn: 'Metal',
    color: '#b91c1c',
    bg: '#2d1a1b',
    bgHover: '#3b2224',
    border: '#5c2d30',
    borderHover: '#a35558',
    glow: 'rgba(185, 28, 28, 0.14)'
  },
  'alkaline-earth': {
    label: 'Kim loại kiềm thổ',
    labelEn: 'Alkaline Earth Metal',
    macro: 'metal',
    macroLabel: 'Kim loại',
    macroLabelEn: 'Metal',
    color: '#b45309',
    bg: '#332014',
    bgHover: '#422a1b',
    border: '#613e22',
    borderHover: '#a6703e',
    glow: 'rgba(180, 83, 9, 0.14)'
  },
  'transition-metal': {
    label: 'Kim loại chuyển tiếp',
    labelEn: 'Transition Metal',
    macro: 'metal',
    macroLabel: 'Kim loại',
    macroLabelEn: 'Metal',
    color: '#854d0e',
    bg: '#2f2317',
    bgHover: '#3d2e1e',
    border: '#594328',
    borderHover: '#947448',
    glow: 'rgba(133, 77, 14, 0.14)'
  },
  'post-transition': {
    label: 'Kim loại sau chuyển tiếp',
    labelEn: 'Post-Transition Metal',
    macro: 'metal',
    macroLabel: 'Kim loại',
    macroLabelEn: 'Metal',
    color: '#475569',
    bg: '#1e242f',
    bgHover: '#28303e',
    border: '#3c4759',
    borderHover: '#78879c',
    glow: 'rgba(71, 85, 105, 0.14)'
  },
  'metalloid': {
    label: 'Á kim',
    labelEn: 'Metalloid',
    macro: 'metalloid',
    macroLabel: 'Á kim',
    macroLabelEn: 'Metalloid',
    color: '#4d7c0f',
    bg: '#282717',
    bgHover: '#34331f',
    border: '#4d5428',
    borderHover: '#839452',
    glow: 'rgba(77, 124, 15, 0.14)'
  },
  'nonmetal': {
    label: 'Phi kim',
    labelEn: 'Nonmetal',
    macro: 'nonmetal',
    macroLabel: 'Phi kim',
    macroLabelEn: 'Nonmetal',
    color: '#166534',
    bg: '#172a22',
    bgHover: '#20382e',
    border: '#2c5240',
    borderHover: '#598c70',
    glow: 'rgba(22, 101, 52, 0.14)'
  },
  'halogen': {
    label: 'Halogen',
    labelEn: 'Halogen',
    macro: 'nonmetal',
    macroLabel: 'Phi kim',
    macroLabelEn: 'Nonmetal',
    color: '#0f766e',
    bg: '#13262d',
    bgHover: '#1c353e',
    border: '#26505c',
    borderHover: '#528b96',
    glow: 'rgba(15, 118, 110, 0.14)'
  },
  'noble-gas': {
    label: 'Khí hiếm',
    labelEn: 'Noble Gas',
    macro: 'noble-gas',
    macroLabel: 'Khí hiếm',
    macroLabelEn: 'Noble Gas',
    color: '#581c87',
    bg: '#231535',
    bgHover: '#2f1e46',
    border: '#4d316b',
    borderHover: '#8565a8',
    glow: 'rgba(88, 28, 135, 0.14)'
  },
  'lanthanide': {
    label: 'Họ Lantan',
    labelEn: 'Lanthanide',
    macro: 'metal',
    macroLabel: 'Kim loại',
    macroLabelEn: 'Metal',
    color: '#9d174d',
    bg: '#311425',
    bgHover: '#401d31',
    border: '#632d4a',
    borderHover: '#a35d80',
    glow: 'rgba(157, 23, 77, 0.14)'
  },
  'actinide': {
    label: 'Họ Actini',
    labelEn: 'Actinide',
    macro: 'metal',
    macroLabel: 'Kim loại',
    macroLabelEn: 'Metal',
    color: '#4a044e',
    bg: '#2a1133',
    bgHover: '#381a43',
    border: '#572c66',
    borderHover: '#8c5e9c',
    glow: 'rgba(74, 4, 78, 0.14)'
  }
};

// Format: [z, sym, viName, enName, mass, cat, group, period, row, col, block, phase, shells, config, eneg, radius, ioniz, meltC, boilC, density, oxStates, year, desc]
const RAW_ELEMENTS = [
  [1,'H','Hydro','Hydrogen',1.008,'nonmetal',1,1,1,1,'s','Khí',[1],'1s1',2.20,53,1312,-259.16,-252.87,0.0000899,'-1, +1','1766','Nguyên tố nhẹ nhất và phổ biến nhất trong vũ trụ, thành phần cốt lõi của nước và nhiên liệu ngôi sao.'],
  [2,'He','Heli','Helium',4.0026,'noble-gas',18,1,1,18,'s','Khí',[2],'1s2',null,31,2372,-272.20,-268.93,0.0001785,'0','1868','Khí hiếm trơ hóa học, nhẹ thứ hai vũ trụ, dùng trong khinh khí cầu, làm lạnh siêu dẫn và máy MRI.'],

  [3,'Li','Liti','Lithium',6.94,'alkali-metal',1,2,2,1,'s','Rắn',[2,1],'[He] 2s1',0.98,167,520,180.50,1342,0.534,'+1','1817','Kim loại nhẹ nhất có thể nổi trên nước, thành phần chính trong pin sạc lithium-ion hiện đại.'],
  [4,'Be','Beri','Beryllium',9.0122,'alkaline-earth',2,2,2,2,'s','Rắn',[2,2],'[He] 2s2',1.57,112,899,1287,2470,1.85,'+2','1798','Kim loại kiềm thổ cứng, nhẹ, trong suốt với tia X, dùng trong hợp kim hàng không vũ trụ và gương kính viễn vọng.'],
  [5,'B','Bo','Boron',10.81,'metalloid',13,2,2,13,'p','Rắn',[2,3],'[He] 2s2 2p1',2.04,87,801,2076,3927,2.34,'+3','1808','Á kim cứng có nhiệt độ nóng chảy cao, dùng chế tạo thủy tinh borosilicat chịu nhiệt và vật liệu bán dẫn.'],
  [6,'C','Cacbon','Carbon',12.011,'nonmetal',14,2,2,14,'p','Rắn',[2,4],'[He] 2s2 2p2',2.55,67,1086,3550,4027,2.267,'-4, +2, +4','Trước 3750 TCN','Nền tảng của mọi hợp chất hữu cơ và sự sống; tồn tại ở nhiều dạng thù hình như kim cương, than chì và graphene.'],
  [7,'N','Nitơ','Nitrogen',14.007,'nonmetal',15,2,2,15,'p','Khí',[2,5],'[He] 2s2 2p3',3.04,56,1402,-210.00,-195.79,0.001251,'-3, +3, +5','1772','Chiếm khoảng 78% khí quyển Trái Đất, thiết yếu cho protein, ADN và sản xuất phân bón nông nghiệp.'],
  [8,'O','Oxi','Oxygen',15.999,'nonmetal',16,2,2,16,'p','Khí',[2,6],'[He] 2s2 2p4',3.44,48,1314,-218.79,-182.96,0.001429,'-2','1774','Chiếm 21% không khí và gần nửa khối lượng vỏ Trái Đất, duy trì sự hô hấp và quá trình cháy.'],
  [9,'F','Flo','Fluorine',18.998,'halogen',17,2,2,17,'p','Khí',[2,7],'[He] 2s2 2p5',3.98,42,1681,-219.67,-188.11,0.001696,'-1','1886','Phi kim có độ âm điện và tính oxi hóa mạnh nhất bảng tuần hoàn, dùng trong kem đánh răng và nhựa Teflon.'],
  [10,'Ne','Neon','Neon',20.180,'noble-gas',18,2,2,18,'p','Khí',[2,8],'[He] 2s2 2p6',null,38,2081,-248.59,-246.08,0.0008999,'0','1898','Khí hiếm phát ánh sáng đỏ cam rực rỡ trong ống phóng điện cao áp, nổi tiếng với các biển hiệu đèn neon.'],

  [11,'Na','Natri','Sodium',22.990,'alkali-metal',1,3,3,1,'s','Rắn',[2,8,1],'[Ne] 3s1',0.93,190,496,97.79,883,0.971,'+1','1807','Kim loại kiềm mềm, phản ứng mãnh liệt với nước; thành phần của muối ăn (NaCl) và cân bằng điện giải cơ thể.'],
  [12,'Mg','Magie','Magnesium',24.305,'alkaline-earth',2,3,3,2,'s','Rắn',[2,8,2],'[Ne] 3s2',1.31,145,738,650,1091,1.738,'+2','1755','Kim loại nhẹ cháy sáng chói, là nguyên tử trung tâm của diệp lục thực vật và hợp kim siêu nhẹ.'],
  [13,'Al','Nhôm','Aluminium',26.982,'post-transition',13,3,3,13,'p','Rắn',[2,8,3],'[Ne] 3s2 3p1',1.61,118,578,660.32,2519,2.70,'+3','1825','Kim loại phổ biến nhất trong vỏ Trái Đất, nhẹ, bền chống ăn mòn nhờ lớp oxit bảo vệ tự nhiên.'],
  [14,'Si','Silic','Silicon',28.085,'metalloid',14,3,3,14,'p','Rắn',[2,8,4],'[Ne] 3s2 3p2',1.90,111,787,1414,3265,2.329,'-4, +4','1824','Á kim nền tảng của ngành công nghiệp vi mạch bán dẫn, pin năng lượng mặt trời và thủy tinh.'],
  [15,'P','Photpho','Phosphorus',30.974,'nonmetal',15,3,3,15,'p','Rắn',[2,8,5],'[Ne] 3s2 3p3',2.19,98,1012,44.15,280.5,1.82,'-3, +3, +5','1669','Phi kim thiết yếu cho xương, răng, ATP và ADN; tồn tại ở dạng photpho trắng dễ tự bốc cháy và photpho đỏ.'],
  [16,'S','Lưu huỳnh','Sulfur',32.06,'nonmetal',16,3,3,16,'p','Rắn',[2,8,6],'[Ne] 3s2 3p4',2.58,88,1000,115.21,444.6,2.07,'-2, +4, +6','Trước 2000 TCN','Phi kim màu vàng chanh quen thuộc quanh miệng núi lửa, dùng sản xuất axit sunfuric và lưu hóa cao su.'],
  [17,'Cl','Clo','Chlorine',35.45,'halogen',17,3,3,17,'p','Khí',[2,8,7],'[Ne] 3s2 3p5',3.16,79,1251,-101.5,-34.04,0.003214,'-1, +1, +5, +7','1774','Khí halogen màu vàng lục có tính sát khuẩn mạnh, dùng khử trùng nước sinh hoạt và sản xuất nhựa PVC.'],
  [18,'Ar','Argon','Argon',39.948,'noble-gas',18,3,3,18,'p','Khí',[2,8,8],'[Ne] 3s2 3p6',null,71,1521,-189.35,-185.85,0.001784,'0','1894','Khí hiếm phổ biến nhất trong khí quyển Trái Đất (~0,93%), dùng làm khí bảo vệ khi hàn kim loại và bơm bóng đèn.'],

  [19,'K','Kali','Potassium',39.098,'alkali-metal',1,4,4,1,'s','Rắn',[2,8,8,1],'[Ar] 4s1',0.82,243,419,63.5,759,0.862,'+1','1807','Kim loại kiềm rất hoạt động, thiết yếu cho dẫn truyền xung thần kinh và là dưỡng chất quan trọng của cây trồng.'],
  [20,'Ca','Canxi','Calcium',40.078,'alkaline-earth',2,4,4,2,'s','Rắn',[2,8,8,2],'[Ar] 4s2',1.00,194,590,842,1484,1.54,'+2','1808','Kim loại kiềm thổ tạo nên cấu trúc xương, răng, đá vôi và xi măng; đóng vai trò quan trọng trong co cơ.'],
  [21,'Sc','Scandi','Scandium',44.956,'transition-metal',3,4,4,3,'d','Rắn',[2,8,9,2],'[Ar] 3d1 4s2',1.36,184,633,1541,2836,2.989,'+3','1879','Kim loại chuyển tiếp nhẹ, thường pha vào hợp kim nhôm để tăng độ bền cho khung xe đạp và máy bay.'],
  [22,'Ti','Titan','Titanium',47.867,'transition-metal',4,4,4,4,'d','Rắn',[2,8,10,2],'[Ar] 3d2 4s2',1.54,176,659,1668,3287,4.54,'+2, +3, +4','1791','Kim loại siêu bền, nhẹ, chống ăn mòn tuyệt hảo và tương thích sinh học cao, dùng trong cấy ghép y tế và tên lửa.'],
  [23,'V','Vanadi','Vanadium',50.942,'transition-metal',5,4,4,5,'d','Rắn',[2,8,11,2],'[Ar] 3d3 4s2',1.63,171,651,1910,3407,6.11,'+2, +3, +4, +5','1801','Kim loại xám bạc giúp tăng độ cứng và độ dẻo dai cho thép công cụ, trục xe và pin dòng chảy vanadi.'],
  [24,'Cr','Crom','Chromium',51.996,'transition-metal',6,4,4,6,'d','Rắn',[2,8,13,1],'[Ar] 3d5 4s1',1.66,166,653,1907,2671,7.15,'+2, +3, +6','1797','Kim loại cứng sáng bóng, thành phần tạo khả năng chống gỉ cho thép không gỉ (inox) và lớp mạ crom.'],
  [25,'Mn','Mangan','Manganese',54.938,'transition-metal',7,4,4,7,'d','Rắn',[2,8,13,2],'[Ar] 3d5 4s2',1.55,161,717,1246,2061,7.44,'+2, +4, +7','1774','Không thể thiếu trong luyện thép để khử lưu huỳnh và tăng độ chịu mài mòn; có mặt trong pin kiềm khô.'],
  [26,'Fe','Sắt','Iron',55.845,'transition-metal',8,4,4,8,'d','Rắn',[2,8,14,2],'[Ar] 3d6 4s2',1.83,156,762,1538,2862,7.874,'+2, +3','Trước 5000 TCN','Kim loại nền tảng của nền văn minh công nghiệp (thép, gang), tạo nên lõi Trái Đất và hemoglobin vận chuyển oxi.'],
  [27,'Co','Coban','Cobalt',58.933,'transition-metal',9,4,4,9,'d','Rắn',[2,8,15,2],'[Ar] 3d7 4s2',1.88,152,760,1495,2927,8.86,'+2, +3','1735','Kim loại có từ tính mạnh, dùng chế tạo siêu hợp kim tuabin, pin lithium-ion và chất tạo màu xanh coban.'],
  [28,'Ni','Niken','Nickel',58.693,'transition-metal',10,4,4,10,'d','Rắn',[2,8,16,2],'[Ar] 3d8 4s2',1.91,149,737,1455,2913,8.912,'+2, +3','1751','Kim loại trắng bạc chống oxi hóa tốt, dùng sản xuất thép không gỉ, đồng xu, pin sạc và chất xúc tác.'],
  [29,'Cu','Đồng','Copper',63.546,'transition-metal',11,4,4,11,'d','Rắn',[2,8,18,1],'[Ar] 3d10 4s1',1.90,145,745,1084.62,2562,8.96,'+1, +2','~9000 TCN','Kim loại màu đỏ cam dẫn điện và dẫn nhiệt xuất sắc, là vật liệu chủ lực cho dây dẫn điện và bo mạch.'],
  [30,'Zn','Kẽm','Zinc',65.38,'transition-metal',12,4,4,12,'d','Rắn',[2,8,18,2],'[Ar] 3d10 4s2',1.65,142,906,419.53,907,7.134,'+2','Trước 1000 TCN','Dùng mạ chống gỉ cho thép, hợp kim đồng thau và là vi chất thiết yếu hỗ trợ hệ miễn dịch con người.'],
  [31,'Ga','Gali','Gallium',69.723,'post-transition',13,4,4,13,'p','Rắn',[2,8,18,3],'[Ar] 3d10 4s2 4p1',1.81,136,579,29.76,2204,5.91,'+3','1875','Kim loại độc đáo nóng chảy ngay trên lòng bàn tay (~29,8°C), ứng dụng lớn trong đèn LED và chip GaN/GaAs.'],
  [32,'Ge','Gemani','Germanium',72.630,'metalloid',14,4,4,14,'p','Rắn',[2,8,18,4],'[Ar] 3d10 4s2 4p2',2.01,125,762,938.25,2833,5.323,'+2, +4','1886','Á kim bán dẫn quan trọng trong sợi quang học, thấu kính hồng ngoại và các transistor đầu tiên trong lịch sử.'],
  [33,'As','Asen','Arsenic',74.922,'metalloid',15,4,4,15,'p','Rắn',[2,8,18,5],'[Ar] 3d10 4s2 4p3',2.18,114,947,817,614,5.776,'-3, +3, +5','~1250','Á kim độc nổi tiếng trong lịch sử, ngày nay dùng lượng nhỏ để pha tạp bán dẫn gali asenua (GaAs).'],
  [34,'Se','Selen','Selenium',78.971,'nonmetal',16,4,4,16,'p','Rắn',[2,8,18,6],'[Ar] 3d10 4s2 4p4',2.55,103,941,221,685,4.809,'-2, +4, +6','1817','Phi kim có tính quang dẫn (độ dẫn điện tăng khi có ánh sáng), dùng trong máy photocopy, pin mặt trời và vi chất chống oxi hóa.'],
  [35,'Br','Brom','Bromine',79.904,'halogen',17,4,4,17,'p','Lỏng',[2,8,18,7],'[Ar] 3d10 4s2 4p5',2.96,94,1140,-7.2,58.8,3.122,'-1, +1, +5','1826','Phi kim duy nhất ở trạng thái lỏng ở nhiệt độ phòng, có màu nâu đỏ đậm và dễ bay hơi.'],
  [36,'Kr','Kripton','Krypton',83.798,'noble-gas',18,4,4,18,'p','Khí',[2,8,18,8],'[Ar] 3d10 4s2 4p6',3.00,88,1351,-157.36,-153.22,0.003733,'0, +2','1898','Khí hiếm dùng trong đèn flash nhiếp ảnh tốc độ cao, đèn laser và từng được dùng để định nghĩa chuẩn đơn vị mét.'],

  [37,'Rb','Rubidi','Rubidium',85.468,'alkali-metal',1,5,5,1,'s','Rắn',[2,8,18,8,1],'[Kr] 5s1',0.82,265,403,39.30,688,1.532,'+1','1861','Kim loại kiềm mềm có ánh sáng vạch quang phổ đỏ thẫm, ứng dụng trong đồng hồ nguyên tử và nghiên cứu lượng tử.'],
  [38,'Sr','Stronti','Strontium',87.62,'alkaline-earth',2,5,5,2,'s','Rắn',[2,8,18,8,2],'[Kr] 5s2',0.95,219,549,777,1382,2.64,'+2','1790','Kim loại kiềm thổ tạo ngọn lửa đỏ rực trong pháo hoa, pháo sáng và dùng trong đồng hồ mạng quang học siêu chính xác.'],
  [39,'Y','Ytri','Yttrium',88.906,'transition-metal',3,5,5,3,'d','Rắn',[2,8,18,9,2],'[Kr] 4d1 5s2',1.22,212,600,1526,3338,4.469,'+3','1794','Kim loại đất hiếm ứng dụng trong laser YAG, chất siêu dẫn nhiệt độ cao YBCO và bột phát quang LED trắng.'],
  [40,'Zr','Ziriconi','Zirconium',91.224,'transition-metal',4,5,5,4,'d','Rắn',[2,8,18,10,2],'[Kr] 4d2 5s2',1.33,206,640,1855,4409,6.506,'+4','1789','Kim loại chịu nhiệt và chống ăn mòn cực tốt, dùng làm vỏ thanh nhiên liệu hạt nhân và gốm sứ răng zirconia.'],
  [41,'Nb','Niobi','Niobium',92.906,'transition-metal',5,5,5,5,'d','Rắn',[2,8,18,12,1],'[Kr] 4d4 5s1',1.60,198,652,2477,4744,8.57,'+3, +5','1801','Kim loại siêu dẫn quan trọng để chế tạo nam châm siêu dẫn trong máy MRI và máy gia tốc hạt LHC.'],
  [42,'Mo','Molipden','Molybdenum',95.95,'transition-metal',6,5,5,6,'d','Rắn',[2,8,18,13,1],'[Kr] 4d5 5s1',2.16,190,684,2623,4639,10.22,'+4, +6','1778','Kim loại có nhiệt độ nóng chảy rất cao, tăng cường độ bền nhiệt cho hợp kim thép và là chất xúc tác lọc dầu.'],
  [43,'Tc','Tecneti','Technetium',98,'transition-metal',7,5,5,7,'d','Rắn',[2,8,18,13,2],'[Kr] 4d5 5s2',1.90,183,702,2157,4265,11.5,'+4, +7','1937','Nguyên tố phóng xạ nhân tạo đầu tiên được tổng hợp; đồng vị Tc-99m được dùng rộng rãi trong chẩn đoán hình ảnh y học.'],
  [44,'Ru','Ruteni','Ruthenium',101.07,'transition-metal',8,5,5,8,'d','Rắn',[2,8,18,15,1],'[Kr] 4d7 5s1',2.20,178,710,2334,4150,12.37,'+3, +4, +8','1844','Kim loại quý nhóm platin, dùng làm chất xúc tác hóa học hiệu suất cao và tăng độ bền tiếp điểm điện tử.'],
  [45,'Rh','Rodi','Rhodium',102.91,'transition-metal',9,5,5,9,'d','Rắn',[2,8,18,16,1],'[Kr] 4d8 5s1',2.28,173,720,1964,3695,12.41,'+3','1803','Một trong những kim loại quý hiếm và đắt giá nhất, dùng trong bộ chuyển đổi xúc tác khí thải ô tô và mạ trang sức.'],
  [46,'Pd','Paladi','Palladium',106.42,'transition-metal',10,5,5,10,'d','Rắn',[2,8,18,18],'[Kr] 4d10',2.20,169,804,1554.9,2963,12.02,'+2, +4','1803','Kim loại quý có khả năng hấp thụ khí hydro gấp 900 lần thể tích của nó, dùng trong xúc tác và lọc hydro tinh khiết.'],
  [47,'Ag','Bạc','Silver',107.87,'transition-metal',11,5,5,11,'d','Rắn',[2,8,18,18,1],'[Kr] 4d10 5s1',1.93,165,731,961.78,2162,10.501,'+1','Trước 5000 TCN','Kim loại có độ dẫn điện, dẫn nhiệt và độ phản xạ ánh sáng cao nhất trong tất cả các nguyên tố.'],
  [48,'Cd','Cadimi','Cadmium',112.41,'transition-metal',12,5,5,12,'d','Rắn',[2,8,18,18,2],'[Kr] 4d10 5s2',1.69,161,868,321.07,767,8.69,'+2','1817','Kim loại mềm màu trắng xanh, dùng trong pin NiCd, thanh điều khiển lò phản ứng hạt nhân và chấm lượng tử.'],
  [49,'In','Indi','Indium',114.82,'post-transition',13,5,5,13,'p','Rắn',[2,8,18,18,3],'[Kr] 4d10 5s2 5p1',1.78,156,558,156.60,2072,7.31,'+3','1863','Kim loại cực mềm phát ra tiếng "kêu" khi bẻ cong; thành phần của màng dẫn điện trong suốt ITO trên màn hình cảm ứng.'],
  [50,'Sn','Thiếc','Tin',118.71,'post-transition',14,5,5,14,'p','Rắn',[2,8,18,18,4],'[Kr] 4d10 5s2 5p2',1.96,145,709,231.93,2602,7.287,'+2, +4','~3500 TCN','Kim loại dễ nóng chảy, không độc, dùng làm hợp kim hàn mạch điện tử, đồng thanh và tráng hộp thực phẩm.'],
  [51,'Sb','Antimon','Antimony',121.76,'metalloid',15,5,5,15,'p','Rắn',[2,8,18,18,5],'[Kr] 4d10 5s2 5p3',2.05,133,834,630.63,1587,6.685,'-3, +3, +5','Trước 3000 TCN','Á kim giòn ánh bạc, dùng trong vật liệu chống cháy, hợp kim chì cho ắc quy và linh kiện hồng ngoại.'],
  [52,'Te','Telu','Tellurium',127.60,'metalloid',16,5,5,16,'p','Rắn',[2,8,18,18,6],'[Kr] 4d10 5s2 5p4',2.10,123,869,449.51,988,6.232,'-2, +4, +6','1782','Á kim hiếm dùng trong pin mặt trời màng mỏng CdTe và vật liệu nhiệt điện chuyển nhiệt thành điện năng.'],
  [53,'I','Iot','Iodine',126.90,'halogen',17,5,5,17,'p','Rắn',[2,8,18,18,7],'[Kr] 4d10 5s2 5p5',2.66,115,1008,113.7,184.3,4.93,'-1, +1, +5, +7','1811','Halogen rắn màu tím đen dễ thăng hoa thành hơi tím, cần thiết cho hormone tuyến giáp và thuốc sát trùng.'],
  [54,'Xe','Xenon','Xenon',131.29,'noble-gas',18,5,5,18,'p','Khí',[2,8,18,18,8],'[Kr] 4d10 5s2 5p6',2.60,108,1170,-111.75,-108.09,0.005887,'0, +2, +4, +6','1898','Khí hiếm nặng dùng trong đèn pha xenon cường độ cao, máy chiếu rạp phim và động cơ đẩy ion tàu vũ trụ.'],

  [55,'Cs','Xesi','Caesium',132.91,'alkali-metal',1,6,6,1,'s','Rắn',[2,8,18,18,8,1],'[Xe] 6s1',0.79,298,376,28.5,671,1.873,'+1','1860','Kim loại kiềm màu vàng nhạt cực kỳ hoạt động; tần số bức xạ của Cs-133 là chuẩn định nghĩa đơn vị giây (s) quốc tế.'],
  [56,'Ba','Bari','Barium',137.33,'alkaline-earth',2,6,6,2,'s','Rắn',[2,8,18,18,8,2],'[Xe] 6s2',0.89,253,503,727,1897,3.594,'+2','1808','Kim loại kiềm thổ tạo màu xanh lục cho pháo hoa; hợp chất BaSO4 dùng làm thuốc cản quang chụp X-quang đường tiêu hóa.'],

  // Lanthanides (57 - 71) -> displayed in row 9, cols 4..18
  [57,'La','Lantan','Lanthanum',138.91,'lanthanide',3,6,9,4,'f','Rắn',[2,8,18,18,9,2],'[Xe] 5d1 6s2',1.10,195,538,920,3464,6.145,'+3','1839','Nguyên tố mở đầu họ Lantan, dùng chế tạo thấu kính máy ảnh có chiết suất cao và pin xe hybrid NiMH.'],
  [58,'Ce','Xeri','Cerium',140.12,'lanthanide',null,6,9,5,'f','Rắn',[2,8,18,19,9,2],'[Xe] 4f1 5d1 6s2',1.12,185,534,795,3443,6.770,'+3, +4','1803','Nguyên tố đất hiếm phổ biến nhất, dùng làm đá lửa bật lửa, bột đánh bóng kính và bộ lọc khí thải ô tô.'],
  [59,'Pr','Prazeodim','Praseodymium',140.91,'lanthanide',null,6,9,6,'f','Rắn',[2,8,18,21,8,2],'[Xe] 4f3 6s2',1.13,247,527,935,3520,6.773,'+3','1885','Dùng chế tạo kính bảo hộ thợ hàn lọc ánh sáng vàng chói, nam châm cường độ cao và động cơ máy bay.'],
  [60,'Nd','Neodim','Neodymium',144.24,'lanthanide',null,6,9,7,'f','Rắn',[2,8,18,22,8,2],'[Xe] 4f4 6s2',1.14,206,533,1024,3074,7.007,'+3','1885','Thành phần tạo ra nam châm vĩnh cửu mạnh nhất thế giới (NdFeB) trong tai nghe, ổ cứng, xe điện và tuabin gió.'],
  [61,'Pm','Prometi','Promethium',145,'lanthanide',null,6,9,8,'f','Rắn',[2,8,18,23,8,2],'[Xe] 4f5 6s2',1.13,205,540,1042,3000,7.26,'+3','1945','Nguyên tố đất hiếm phóng xạ duy nhất trong họ Lantan, dùng trong pin hạt nhân mini và sơn dạ quang chuyên dụng.'],
  [62,'Sm','Samari','Samarium',150.36,'lanthanide',null,6,9,9,'f','Rắn',[2,8,18,24,8,2],'[Xe] 4f6 6s2',1.17,238,545,1072,1794,7.52,'+2, +3','1879','Dùng chế tạo nam châm SmCo hoạt động ổn định ở nhiệt độ cực cao và hấp thụ neutron trong lò phản ứng.'],
  [63,'Eu','Europi','Europium',151.96,'lanthanide',null,6,9,10,'f','Rắn',[2,8,18,25,8,2],'[Xe] 4f7 6s2',1.20,231,547,826,1529,5.243,'+2, +3','1901','Kim loại đất hiếm dễ phản ứng nhất, nổi tiếng với mực phát quang chống tiền giả Euro và đèn LED màu đỏ/xanh.'],
  [64,'Gd','Gadolini','Gadolinium',157.25,'lanthanide',null,6,9,11,'f','Rắn',[2,8,18,25,9,2],'[Xe] 4f7 5d1 6s2',1.20,233,593,1312,3273,7.895,'+3','1880','Có tính thuận từ cực mạnh, được sử dụng làm chất tương phản tiêm tĩnh mạch trong chụp cộng hưởng từ MRI.'],
  [65,'Tb','Tebi','Terbium',158.93,'lanthanide',null,6,9,12,'f','Rắn',[2,8,18,27,8,2],'[Xe] 4f9 6s2',1.20,225,566,1356,3230,8.229,'+3','1843','Dùng làm bột phát quang màu xanh lục cho màn hình và vật liệu từ giảo (Terfenol-D) trong loa siêu âm.'],
  [66,'Dy','Đisprosi','Dysprosium',162.50,'lanthanide',null,6,9,13,'f','Rắn',[2,8,18,28,8,2],'[Xe] 4f10 6s2',1.22,228,573,1407,2567,8.55,'+3','1886','Thêm vào nam châm neodim để giữ từ tính không bị mất khi động cơ xe điện vận hành ở nhiệt độ cao.'],
  [67,'Ho','Honmi','Holmium',164.93,'lanthanide',null,6,9,14,'f','Rắn',[2,8,18,29,8,2],'[Xe] 4f11 6s2',1.23,226,581,1461,2720,8.795,'+3','1878','Sở hữu mômen từ tự nhiên mạnh nhất trong mọi nguyên tố hóa học, dùng trong nam châm chuyên dụng và laser phẫu thuật.'],
  [68,'Er','Ebi','Erbium',167.26,'lanthanide',null,6,9,15,'f','Rắn',[2,8,18,30,8,2],'[Xe] 4f12 6s2',1.24,226,589,1529,2868,9.066,'+3','1843','Trái tim của bộ khuếch đại quang học cáp quang xuyên đại dương (EDFA), giúp tín hiệu Internet truyền đi hàng ngàn km.'],
  [69,'Tm','Tuli','Thulium',168.93,'lanthanide',null,6,9,16,'f','Rắn',[2,8,18,31,8,2],'[Xe] 4f13 6s2',1.25,222,597,1545,1950,9.321,'+3','1879','Kim loại đất hiếm ít phổ biến thứ hai, dùng trong máy chụp X-quang di động và laser y tế cắt mô chính xác.'],
  [70,'Yb','Ytecbi','Ytterbium',173.05,'lanthanide',null,6,9,17,'f','Rắn',[2,8,18,32,8,2],'[Xe] 4f14 6s2',1.10,222,603,824,1196,6.965,'+2, +3','1878','Ứng dụng trong đồng hồ nguyên tử quang học thế hệ mới, laser sợi quang công nghiệp và cảm biến ứng suất.'],
  [71,'Lu','Lutexi','Lutetium',174.97,'lanthanide',null,6,9,18,'d','Rắn',[2,8,18,32,9,2],'[Xe] 4f14 5d1 6s2',1.27,217,524,1652,3402,9.84,'+3','1907','Nguyên tố cuối cùng, cứng và đặc nhất trong họ Lantan, dùng trong máy chụp cắt lớp PET và xúc tác lọc dầu.'],

  [72,'Hf','Hafini','Hafnium',178.49,'transition-metal',4,6,6,4,'d','Rắn',[2,8,18,32,10,2],'[Xe] 4f14 5d2 6s2',1.30,208,659,2233,4603,13.31,'+4','1923','Kim loại chịu nhiệt cao, dùng làm lớp điện môi siêu mỏng (high-k) trong vi xử lý hiện đại và thanh điều khiển hạt nhân.'],
  [73,'Ta','Tantan','Tantalum',180.95,'transition-metal',5,6,6,5,'d','Rắn',[2,8,18,32,11,2],'[Xe] 4f14 5d3 6s2',1.50,200,761,3017,5458,16.654,'+5','1802','Trơ tuyệt đối với hầu hết axit ở nhiệt độ thường, dùng làm tụ điện siêu nhỏ trong điện thoại và dụng cụ phẫu thuật.'],
  [74,'W','Vonfram','Tungsten',183.84,'transition-metal',6,6,6,6,'d','Rắn',[2,8,18,32,12,2],'[Xe] 4f14 5d4 6s2',2.36,193,770,3422,5555,19.25,'+4, +6','1783','Kim loại có nhiệt độ nóng chảy cao nhất bảng tuần hoàn (3422°C), nổi tiếng với dây tóc bóng đèn và mũi khoan siêu cứng.'],
  [75,'Re','Reni','Rhenium',186.21,'transition-metal',7,6,6,7,'d','Rắn',[2,8,18,32,13,2],'[Xe] 4f14 5d5 6s2',1.90,188,760,3186,5596,21.02,'+4, +7','1925','Một trong những nguyên tố hiếm nhất vỏ Trái Đất, tăng sức chịu nhiệt cho cánh tuabin động cơ phản lực.'],
  [76,'Os','Osimi','Osmium',190.23,'transition-metal',8,6,6,8,'d','Rắn',[2,8,18,32,14,2],'[Xe] 4f14 5d6 6s2',2.20,185,840,3033,5012,22.59,'+4, +8','1803','Nguyên tố tự nhiên có khối lượng riêng lớn nhất trên Trái Đất (22,59 g/cm³), cực cứng, dùng làm ngòi bút máy cao cấp.'],
  [77,'Ir','Iridi','Iridium',192.22,'transition-metal',9,6,6,9,'d','Rắn',[2,8,18,32,15,2],'[Xe] 4f14 5d7 6s2',2.20,180,880,2446,4428,22.56,'+3, +4','1803','Kim loại chống ăn mòn tốt nhất từng biết; lớp giàu iridi trong địa tầng là bằng chứng thiên thạch làm tuyệt chủng khủng long.'],
  [78,'Pt','Platin','Platinum',195.08,'transition-metal',10,6,6,10,'d','Rắn',[2,8,18,32,17,1],'[Xe] 4f14 5d9 6s1',2.28,177,870,1768.3,3825,21.46,'+2, +4','1735','Kim loại quý bạch kim trơ bền, ứng dụng trong trang sức cao cấp, pin nhiên liệu hydro, xúc tác và thuốc trị ung thư.'],
  [79,'Au','Vàng','Gold',196.97,'transition-metal',11,6,6,11,'d','Rắn',[2,8,18,32,18,1],'[Xe] 4f14 5d10 6s1',2.54,174,890,1064.18,2856,19.282,'+1, +3','Trước 6000 TCN','Kim loại quý màu vàng rực rỡ, cực kỳ dễ dát mỏng, không bị oxi hóa, dùng trong tài chính, vi mạch và kính chắn phi hành gia.'],
  [80,'Hg','Thủy ngân','Mercury',200.59,'transition-metal',12,6,6,12,'d','Lỏng',[2,8,18,32,18,2],'[Xe] 4f14 5d10 6s2',2.00,171,1007,-38.83,356.73,13.534,'+1, +2','Trước 1500 TCN','Kim loại duy nhất tồn tại ở thể lỏng tại nhiệt độ phòng, từng dùng rộng rãi trong nhiệt kế và áp kế (độc nếu hít phải hơi).'],
  [81,'Tl','Tali','Thallium',204.38,'post-transition',13,6,6,13,'p','Rắn',[2,8,18,32,18,3],'[Xe] 4f14 5d10 6s2 6p1',1.62,156,589,304,1473,11.85,'+1, +3','1861','Kim loại mềm xám bạc rất độc, dùng trong cảm biến hồng ngoại, thủy tinh chiết suất cao và chẩn đoán tim mạch phóng xạ.'],
  [82,'Pb','Chì','Lead',207.2,'post-transition',14,6,6,14,'p','Rắn',[2,8,18,32,18,4],'[Xe] 4f14 5d10 6s2 6p2',2.33,154,716,327.46,1749,11.342,'+2, +4','~7000 TCN','Kim loại nặng, mềm, dễ uốn và cản tia X/bức xạ rất hiệu quả; dùng trong ắc quy axit-chì và tấm chắn phóng xạ.'],
  [83,'Bi','Bitmut','Bismuth',208.98,'post-transition',15,6,6,15,'p','Rắn',[2,8,18,32,18,5],'[Xe] 4f14 5d10 6s2 6p3',2.02,143,703,271.5,1564,9.807,'+3, +5','~1400','Kim loại nặng ít độc nhất, nổi tiếng với tinh thể bậc thang óng ánh sắc cầu vồng và có tính nghịch từ mạnh.'],
  [84,'Po','Poloni','Polonium',209,'post-transition',16,6,6,16,'p','Rắn',[2,8,18,32,18,6],'[Xe] 4f14 5d10 6s2 6p4',2.00,135,812,254,962,9.32,'+2, +4','1898','Nguyên tố phóng xạ alpha cực mạnh do Marie và Pierre Curie phát hiện, đặt tên theo quê hương Ba Lan của Marie Curie.'],
  [85,'At','Astatin','Astatine',210,'halogen',17,6,6,17,'p','Rắn',[2,8,18,32,18,7],'[Xe] 4f14 5d10 6s2 6p5',2.20,127,899,302,337,7.0,'-1, +1','1940','Nguyên tố tự nhiên hiếm nhất trong vỏ Trái Đất (chỉ vài chục gam cùng lúc trên toàn hành tinh), cực kỳ phóng xạ.'],
  [86,'Rn','Radon','Radon',222,'noble-gas',18,6,6,18,'p','Khí',[2,8,18,32,18,8],'[Xe] 4f14 5d10 6s2 6p6',2.20,120,1037,-71,-61.7,0.00973,'0, +2','1900','Khí hiếm phóng xạ không màu không mùi sinh ra từ sự phân rã tự nhiên của urani và radi trong đất đá.'],

  [87,'Fr','Franxi','Francium',223,'alkali-metal',1,7,7,1,'s','Rắn',[2,8,18,32,18,8,1],'[Rn] 7s1',0.70,348,380,27,677,1.87,'+1','1939','Kim loại kiềm phóng xạ cực hiếm với chu kì bán rã lớn nhất chỉ 22 phút, độ âm điện thuộc hàng thấp nhất.'],
  [88,'Ra','Radi','Radium',226,'alkaline-earth',2,7,7,2,'s','Rắn',[2,8,18,32,18,8,2],'[Rn] 7s2',0.90,283,509,700,1737,5.5,'+2','1898','Kim loại kiềm thổ phóng xạ phát ánh sáng xanh lam yếu trong bóng tối, được Marie và Pierre Curie phân lập năm 1898.'],

  // Actinides (89 - 103) -> displayed in row 10, cols 4..18
  [89,'Ac','Actini','Actinium',227,'actinide',3,7,10,4,'f','Rắn',[2,8,18,32,18,9,2],'[Rn] 6d1 7s2',1.10,195,499,1050,3198,10.07,'+3','1899','Nguyên tố mở đầu họ Actini, kim loại bạc phóng xạ mạnh đến mức phát sáng màu xanh trong đêm tối.'],
  [90,'Th','Thori','Thorium',232.04,'actinide',null,7,10,5,'f','Rắn',[2,8,18,32,18,10,2],'[Rn] 6d2 7s2',1.30,180,587,1750,4788,11.72,'+4','1829','Kim loại phóng xạ yếu phong phú gấp 3 lần urani, là nguồn nhiên liệu hạt nhân thế hệ mới đầy tiềm năng.'],
  [91,'Pa','Protactini','Protactinium',231.04,'actinide',null,7,10,6,'f','Rắn',[2,8,18,32,20,9,2],'[Rn] 5f2 6d1 7s2',1.50,180,568,1568,4027,15.37,'+4, +5','1913','Kim loại phóng xạ dày đặc, cực hiếm và độc, chủ yếu dùng trong nghiên cứu khoa học và định tuổi trầm tích biển.'],
  [92,'U','Urani','Uranium',238.03,'actinide',null,7,10,7,'f','Rắn',[2,8,18,32,21,9,2],'[Rn] 5f3 6d1 7s2',1.38,175,598,1132.2,4131,18.95,'+4, +6','1789','Nguyên tố nặng tự nhiên nổi tiếng nhất; đồng vị U-235 có khả năng phân hạch tạo nguồn năng lượng điện hạt nhân.'],
  [93,'Np','Neptuni','Neptunium',237,'actinide',null,7,10,8,'f','Rắn',[2,8,18,32,22,9,2],'[Rn] 5f4 6d1 7s2',1.36,175,605,644,3902,20.45,'+3, +4, +5','1940','Nguyên tố siêu urani đầu tiên được tổng hợp nhân tạo, đặt tên theo Sao Hải Vương (Neptune).'],
  [94,'Pu','Plutoni','Plutonium',244,'actinide',null,7,10,9,'f','Rắn',[2,8,18,32,24,8,2],'[Rn] 5f6 7s2',1.28,175,585,639.4,3228,19.84,'+3, +4, +6','1940','Nguyên tố phóng xạ nặng dùng trong lò phản ứng hạt nhân và nguồn nhiệt đồng vị RTG cho tàu thám hiểm Voyager, Perseverance.'],
  [95,'Am','Amerixi','Americium',243,'actinide',null,7,10,10,'f','Rắn',[2,8,18,32,25,8,2],'[Rn] 5f7 7s2',1.30,175,578,1176,2607,13.69,'+3','1944','Đồng vị Am-241 được dùng phổ biến với lượng cực nhỏ bên trong các đầu báo khói gia đình.'],
  [96,'Cm','Curi','Curium',247,'actinide',null,7,10,11,'f','Rắn',[2,8,18,32,25,9,2],'[Rn] 5f7 6d1 7s2',1.30,176,581,1340,3110,13.51,'+3','1944','Đặt tên vinh danh Marie & Pierre Curie; dùng trong quang phổ kế tia X trên các xe tự hành thám hiểm Sao Hỏa.'],
  [97,'Bk','Beckeli','Berkelium',247,'actinide',null,7,10,12,'f','Rắn',[2,8,18,32,27,8,2],'[Rn] 5f9 7s2',1.30,176,601,986,2627,14.79,'+3, +4','1949','Tổng hợp tại Đại học California, Berkeley; làm bia mục tiêu quan trọng để tổng hợp các nguyên tố siêu nặng như Tennessine.'],
  [98,'Cf','Califoni','Californium',251,'actinide',null,7,10,13,'f','Rắn',[2,8,18,32,28,8,2],'[Rn] 5f10 7s2',1.30,176,608,900,1470,15.1,'+3','1950','Nguồn phát neutron cực mạnh, dùng để khởi động lò phản ứng hạt nhân, dò quặng khoáng sản và điều trị một số khối u.'],
  [99,'Es','Ensteni','Einsteinium',252,'actinide',null,7,10,14,'f','Rắn',[2,8,18,32,29,8,2],'[Rn] 5f11 7s2',1.30,176,619,860,996,8.84,'+3','1952','Đặt tên theo Albert Einstein, được phát hiện lần đầu trong tro bụi vụ thử nhiệt hạch Ivy Mike năm 1952.'],
  [100,'Fm','Fecmi','Fermium',257,'actinide',null,7,10,15,'f','Rắn',[2,8,18,32,30,8,2],'[Rn] 5f12 7s2',1.30,null,627,1527,null,null,'+3','1952','Đặt tên theo nhà vật lý Enrico Fermi, là nguyên tố nặng nhất có thể tạo thành bằng cách bắn phá neutron vào nguyên tố nhẹ hơn.'],
  [101,'Md','Mendelevi','Mendelevium',258,'actinide',null,7,10,16,'f','Rắn',[2,8,18,32,31,8,2],'[Rn] 5f13 7s2',1.30,null,635,827,null,null,'+2, +3','1955','Đặt tên vinh danh Dmitri Mendeleev — cha đẻ của bảng tuần hoàn các nguyên tố hóa học.'],
  [102,'No','Nobeli','Nobelium',259,'actinide',null,7,10,17,'f','Rắn',[2,8,18,32,32,8,2],'[Rn] 5f14 7s2',1.30,null,642,827,null,null,'+2, +3','1958','Đặt tên theo Alfred Nobel; chỉ có thể tổng hợp vài nguyên tử mỗi lần trong máy gia tốc hạt.'],
  [103,'Lr','Lorenxi','Lawrencium',266,'actinide',null,7,10,18,'d','Rắn',[2,8,18,32,32,8,3],'[Rn] 5f14 7s2 7p1',1.30,null,470,1627,null,null,'+3','1961','Nguyên tố cuối cùng trong họ Actini, đặt tên theo Ernest Lawrence — người phát minh máy gia tốc cyclotron.'],

  [104,'Rf','Rơdơfodi','Rutherfordium',267,'transition-metal',4,7,7,4,'d','Rắn',[2,8,18,32,32,10,2],'[Rn] 5f14 6d2 7s2',null,null,580,2100,5500,23.2,'+4','1964','Nguyên tố siêu nặng nhân tạo đặt tên theo Ernest Rutherford, chỉ tồn tại trong thời gian rất ngắn tại phòng thí nghiệm.'],
  [105,'Db','Đubni','Dubnium',268,'transition-metal',5,7,7,5,'d','Rắn',[2,8,18,32,32,11,2],'[Rn] 5f14 6d3 7s2',null,null,665,null,null,29.3,'+5','1967','Đặt tên theo trung tâm nghiên cứu hạt nhân Dubna (Nga), có chu kì bán rã dài nhất khoảng 28 giờ.'],
  [106,'Sg','Siboogi','Seaborgium',269,'transition-metal',6,7,7,6,'d','Rắn',[2,8,18,32,32,12,2],'[Rn] 5f14 6d4 7s2',null,null,757,null,null,35.0,'+6','1974','Đặt tên theo nhà hóa học Glenn T. Seaborg; tính chất hóa học tương tự molipden và vonfram.'],
  [107,'Bh','Bori','Bohrium',270,'transition-metal',7,7,7,7,'d','Rắn',[2,8,18,32,32,13,2],'[Rn] 5f14 6d5 7s2',null,null,740,null,null,37.1,'+7','1981','Đặt tên vinh danh Niels Bohr — nhà vật lý đặt nền móng cho mô hình lượng tử của nguyên tử.'],
  [108,'Hs','Hassi','Hassium',277,'transition-metal',8,7,7,8,'d','Rắn',[2,8,18,32,32,14,2],'[Rn] 5f14 6d6 7s2',null,null,730,null,null,40.7,'+8','1984','Đặt tên theo bang Hesse (Đức), được dự đoán là một trong những nguyên tố đặc nhất nếu tồn tại ở dạng khối.'],
  [109,'Mt','Meitneri','Meitnerium',278,'transition-metal',9,7,7,9,'d','Rắn',[2,8,18,32,32,15,2],'[Rn] 5f14 6d7 7s2',null,null,800,null,null,37.4,'+3','1982','Đặt tên vinh danh nữ nhà vật lý Lise Meitner — người đồng khám phá hiện tượng phân hạch hạt nhân.'],
  [110,'Ds','Darmstadti','Darmstadtium',281,'transition-metal',10,7,7,10,'d','Rắn',[2,8,18,32,32,17,1],'[Rn] 5f14 6d9 7s1',null,null,960,null,null,34.8,'+2, +4','1994','Tổng hợp tại viện GSI ở thành phố Darmstadt (Đức), phân rã chỉ trong vài giây đến mili giây.'],
  [111,'Rg','Rơngheni','Roentgenium',282,'transition-metal',11,7,7,11,'d','Rắn',[2,8,18,32,32,18,1],'[Rn] 5f14 6d10 7s1',null,null,1020,null,null,28.7,'+3','1994','Đặt tên theo Wilhelm Röntgen — người phát hiện tia X; nằm cùng cột với đồng, bạc và vàng.'],
  [112,'Cn','Copernixi','Copernicium',285,'transition-metal',12,7,7,12,'d','Khí',[2,8,18,32,32,18,2],'[Rn] 5f14 6d10 7s2',null,null,1155,null,null,14.0,'+2','1996','Đặt tên theo nhà thiên văn Nicolaus Copernicus; hiệu ứng tương đối tính khiến nó cực kỳ dễ bay hơi.'],
  [113,'Nh','Nihoni','Nihonium',286,'post-transition',13,7,7,13,'p','Rắn',[2,8,18,32,32,18,3],'[Rn] 5f14 6d10 7s2 7p1',null,null,705,430,1130,16.0,'+1, +3','2004','Nguyên tố siêu nặng đầu tiên được khám phá tại châu Á (viện RIKEN, Nhật Bản — "Nihon").'],
  [114,'Fl','Flerovi','Flerovium',289,'post-transition',14,7,7,14,'p','Rắn',[2,8,18,32,32,18,4],'[Rn] 5f14 6d10 7s2 7p2',null,null,824,null,null,14.0,'+2','1998','Nguyên tố siêu nặng nhân tạo gần "đảo ổn định", đặt tên theo phòng thí nghiệm Flerov (Nga).'],
  [115,'Mc','Moscovi','Moscovium',290,'post-transition',15,7,7,15,'p','Rắn',[2,8,18,32,32,18,5],'[Rn] 5f14 6d10 7s2 7p3',null,null,538,400,1100,13.5,'+1, +3','2003','Đặt tên theo vùng Moscow, được tạo ra bằng cách bắn phá canxi-48 vào bia amerixi-243.'],
  [116,'Lv','Livermori','Livermorium',293,'post-transition',16,7,7,16,'p','Rắn',[2,8,18,32,32,18,6],'[Rn] 5f14 6d10 7s2 7p4',null,null,664,435,812,12.9,'+2','2000','Đặt tên theo Phòng thí nghiệm Quốc gia Lawrence Livermore (Mỹ), chỉ tồn tại trong vài chục mili giây.'],
  [117,'Ts','Tennessine','Tennessine',294,'halogen',17,7,7,17,'p','Rắn',[2,8,18,32,32,18,7],'[Rn] 5f14 6d10 7s2 7p5',null,null,743,450,610,7.2,'-1, +1, +3','2010','Nguyên tố nặng thứ hai từng được tổng hợp, xếp ở nhóm Halogen nhưng chịu ảnh hưởng mạnh của hiệu ứng tương đối tính.'],
  [118,'Og','Oganesson','Oganesson',294,'noble-gas',18,7,7,18,'p','Rắn',[2,8,18,32,32,18,8],'[Rn] 5f14 6d10 7s2 7p6',null,null,860,50,177,7.2,'0, +2, +4','2002','Nguyên tố nặng nhất bảng tuần hoàn, đặt tên theo nhà vật lý Yuri Oganessian; nằm ở nhóm khí hiếm nhưng dự đoán ở thể rắn.']
];

const EN_SUMMARIES = {
  1: 'The lightest and most abundant element in the universe, forming water and fueling nuclear fusion in stars.',
  2: 'Chemically inert noble gas, second lightest in the universe, used in balloons, cryogenics, and MRI magnets.',
  3: 'The lightest metal—able to float on water—and the core element in modern rechargeable lithium-ion batteries.',
  4: 'Stiff, lightweight alkaline earth metal transparent to X-rays, used in aerospace alloys and telescope mirrors.',
  5: 'Hard metalloid with a high melting point, essential for heat-resistant borosilicate glass and semiconductors.',
  6: 'The chemical backbone of all organic life, appearing in diverse allotropes including diamond, graphite, and graphene.',
  7: 'Makes up ~78% of Earth’s atmosphere and is essential for proteins, DNA, and agricultural fertilizers.',
  8: 'Comprises 21% of air and nearly half of Earth’s crust by mass, vital for cellular respiration and combustion.',
  9: 'The most electronegative and chemically reactive nonmetal, used in toothpaste fluorides and Teflon coatings.',
  10: 'Noble gas that glows a vivid reddish-orange in high-voltage discharge tubes, famous for neon signage.',
  11: 'Soft, highly reactive alkali metal that reacts vigorously with water; key component of table salt and nerve signaling.',
  12: 'Lightweight metal that burns with dazzling white light, sits at the core of chlorophyll, and strengthens light alloys.',
  13: 'The most abundant metal in Earth’s crust—lightweight, durable, and naturally corrosion-resistant.',
  14: 'Foundational semiconductor metalloid powering computer microchips, solar panels, and optical glass.',
  15: 'Essential nonmetal in bones, teeth, ATP, and DNA; occurs as reactive white phosphorus and stable red phosphorus.',
  16: 'Bright lemon-yellow nonmetal found near volcanic vents, widely used in sulfuric acid production and rubber vulcanization.',
  17: 'Yellow-green halogen gas with strong disinfecting power, used in water purification and PVC plastics.',
  18: 'The most abundant noble gas in Earth’s atmosphere (~0.93%), used as an inert shielding gas in welding and lighting.',
  19: 'Highly reactive alkali metal essential for nerve impulse transmission, muscle function, and plant nutrition.',
  20: 'Alkaline earth metal that builds bones, teeth, limestone, and cement, and regulates muscle contraction.',
  21: 'Lightweight transition metal alloyed with aluminum to create ultra-strong bicycle frames and aerospace parts.',
  22: 'Exceptionally strong, lightweight, corrosion-resistant, and biocompatible metal used in medical implants and rockets.',
  23: 'Silvery-gray metal added to tool steels for toughness and used in grid-scale vanadium flow batteries.',
  24: 'Hard, lustrous metal that gives stainless steel its rust resistance and provides mirror-like chrome plating.',
  25: 'Indispensable in steelmaking to remove sulfur and boost wear resistance, and widely used in alkaline batteries.',
  26: 'Backbone of industrial civilization (steel and cast iron), forms Earth’s core, and carries oxygen in hemoglobin.',
  27: 'Strongly magnetic metal used in jet turbine superalloys, lithium-ion battery cathodes, and deep blue pigments.',
  28: 'Corrosion-resistant silvery metal used in stainless steel, coins, rechargeable batteries, and industrial catalysts.',
  29: 'Reddish-orange metal with outstanding electrical and thermal conductivity, vital for power cables and circuitry.',
  30: 'Used for galvanizing steel against corrosion, making brass alloys, and supporting human immune health.',
  31: 'Remarkable metal that melts right in your hand (~29.8°C), crucial for LEDs and high-speed GaN/GaAs chips.',
  32: 'Semiconductor metalloid vital for fiber-optic systems, infrared optics, and the earliest historical transistors.',
  33: 'Historically notorious toxic metalloid, used today in trace amounts to dope gallium arsenide (GaAs) semiconductors.',
  34: 'Photoconductive nonmetal whose conductivity rises in light; used in photocopiers, solar cells, and antioxidants.',
  35: 'The only nonmetal that is liquid at room temperature—a dense, volatile, reddish-brown fuming halogen.',
  36: 'Noble gas used in high-speed photography flashes, specialized lasers, and once used to define the standard meter.',
  37: 'Soft alkali metal with deep red spectral lines, utilized in atomic clocks and ultracold quantum research.',
  38: 'Alkaline earth metal that produces brilliant crimson flames in fireworks and powers ultra-precise optical clocks.',
  39: 'Rare-earth metal used in YAG lasers, high-temperature YBCO superconductors, and white LED phosphors.',
  40: 'Heat- and corrosion-resistant metal used for nuclear fuel cladding and durable dental zirconia ceramics.',
  41: 'Crucial superconducting metal used to build powerful electromagnets in MRI scanners and the Large Hadron Collider.',
  42: 'Very high-melting metal that boosts high-temperature strength in steel alloys and acts as a petroleum catalyst.',
  43: 'The first artificially produced radioactive element; its isotope Tc-99m is a cornerstone of medical imaging.',
  44: 'Platinum-group precious metal serving as a high-efficiency chemical catalyst and wear-resistant electrical contact.',
  45: 'One of the rarest and most valuable precious metals, essential for automotive catalytic converters and fine jewelry.',
  46: 'Precious metal capable of absorbing up to 900 times its volume in hydrogen, used in catalysis and hydrogen purification.',
  47: 'Possesses the highest electrical conductivity, thermal conductivity, and reflectivity of all chemical elements.',
  48: 'Soft bluish-white metal used in NiCd batteries, nuclear control rods, and nanoscale quantum dots.',
  49: 'Ultra-soft metal that emits a crisp "tin cry" when bent; essential for transparent ITO touchscreen coatings.',
  50: 'Low-melting, non-toxic metal used in lead-free electronics solder, bronze alloys, and protective food-can linings.',
  51: 'Brittle silvery metalloid used in flame-retardant materials, lead-acid battery grids, and infrared sensors.',
  52: 'Rare metalloid powering thin-film CdTe solar panels and thermoelectric devices that convert heat into electricity.',
  53: 'Violet-black solid halogen that sublimes into purple vapor; essential for thyroid hormones and antiseptics.',
  54: 'Heavy noble gas used in high-intensity xenon headlamps, cinema projectors, and spacecraft ion thrusters.',
  55: 'Pale-gold, ultra-reactive alkali metal; Cs-133 atomic oscillations officially define the international second.',
  56: 'Alkaline earth metal creating vivid green fireworks; insoluble BaSO4 serves as a medical X-ray contrast agent.',
  57: 'First element of the lanthanide series, used in high-refractive-index camera lenses and NiMH hybrid batteries.',
  58: 'The most abundant rare-earth element, used in lighter flints, glass polishing powders, and catalytic converters.',
  59: 'Used to tint welder goggles that block yellow glare, as well as in high-strength magnets and aircraft engines.',
  60: 'Core ingredient of the world’s strongest permanent magnets (NdFeB) inside headphones, EVs, and wind turbines.',
  61: 'The only radioactive lanthanide, used in miniature nuclear batteries and specialized luminous paints.',
  62: 'Forms SmCo magnets that stay magnetized at extreme temperatures and absorbs neutrons in nuclear reactors.',
  63: 'Most reactive rare-earth metal, renowned for anti-counterfeit Euro banknote phosphors and red/blue LEDs.',
  64: 'Strongly paramagnetic metal widely used as an intravenous contrast agent in medical MRI scans.',
  65: 'Produces bright green display phosphors and magnetostrictive alloys (Terfenol-D) for acoustic transducers.',
  66: 'Added to neodymium magnets so electric vehicle motors keep their magnetic strength at high operating heat.',
  67: 'Holds the highest natural magnetic moment of any element, used in specialized magnets and surgical lasers.',
  68: 'Heart of erbium-doped fiber amplifiers (EDFA) that boost Internet light signals across transoceanic cables.',
  69: 'Second-rarest lanthanide, used in portable X-ray sources and high-precision medical surgical lasers.',
  70: 'Used in next-generation optical lattice atomic clocks, industrial fiber lasers, and precision stress gauges.',
  71: 'The final, hardest, and densest lanthanide, used in PET medical scanners and petroleum cracking catalysts.',
  72: 'Heat-resistant metal used as ultra-thin high-k gate dielectrics in modern microprocessors and nuclear control rods.',
  73: 'Virtually immune to chemical attack by most acids at room temperature; vital for miniature smartphone capacitors.',
  74: 'Has the highest melting point of any pure metal (3422°C), famous for light bulb filaments and ultra-hard drills.',
  75: 'One of Earth’s rarest elements, prized for reinforcing nickel superalloys in jet engine turbine blades.',
  76: 'The densest naturally occurring element on Earth (22.59 g/cm³), extremely hard and used in fine fountain pen nibs.',
  77: 'The most corrosion-resistant metal known; an iridium-rich clay layer marks the dinosaur-ending asteroid impact.',
  78: 'Chemically noble precious metal used in luxury jewelry, hydrogen fuel cells, catalysts, and cancer therapy.',
  79: 'Lustrous yellow precious metal—remarkably malleable and tarnish-proof—used in finance, microchips, and astronaut visors.',
  80: 'The only metal liquid at room temperature, historically used in thermometers and barometers (toxic vapor).',
  81: 'Very soft, highly toxic silvery-gray metal used in infrared optics, dense optical glass, and cardiac imaging.',
  82: 'Dense, malleable metal that shields effectively against X-rays and radiation; widely used in lead-acid batteries.',
  83: 'Least toxic heavy metal, famous for iridescent rainbow hopper crystals and strong natural diamagnetism.',
  84: 'Intensely alpha-radioactive element discovered by Marie and Pierre Curie, named after Marie’s homeland Poland.',
  85: 'The rarest naturally occurring element in Earth’s crust (only a few dozen grams exist at any moment), highly radioactive.',
  86: 'Colorless, odorless radioactive noble gas produced naturally by the underground decay of uranium and radium.',
  87: 'Extremely rare, short-lived radioactive alkali metal with a maximum half-life of only 22 minutes.',
  88: 'Radioactive alkaline earth metal that glows faintly blue in the dark, isolated by Marie and Pierre Curie in 1898.',
  89: 'Opening member of the actinide series; strongly radioactive silvery metal that emits a soft blue glow in darkness.',
  90: 'Weakly radioactive metal three times more abundant than uranium, promising for next-generation nuclear reactors.',
  91: 'Dense, scarce, toxic radioactive actinide used mainly in scientific research and ocean sediment dating.',
  92: 'The most famous heavy natural element; fissile U-235 powers nuclear electricity generation worldwide.',
  93: 'The first synthetic transuranium element ever produced, named after the planet Neptune.',
  94: 'Heavy radioactive metal powering nuclear reactors and RTG space batteries on Voyager and Mars rovers.',
  95: 'Its isotope Am-241 is used in tiny, safe quantities inside everyday household ionization smoke detectors.',
  96: 'Named for Marie and Pierre Curie; powers alpha-particle X-ray spectrometers aboard Mars exploration rovers.',
  97: 'Synthesized at UC Berkeley; serves as a crucial target material to forge superheavy elements like tennessine.',
  98: 'Intense neutron emitter used to start up nuclear reactors, detect mineral ores, and treat certain cancers.',
  99: 'Named after Albert Einstein, first discovered in the fallout debris of the 1952 Ivy Mike thermonuclear test.',
  100: 'Named after physicist Enrico Fermi; the heaviest element producible by neutron bombardment of lighter nuclei.',
  101: 'Named in honor of Dmitri Mendeleev, the visionary creator of the periodic table of elements.',
  102: 'Named after Alfred Nobel; synthesized only a few atoms at a time inside particle accelerators.',
  103: 'Final element of the actinide series, honoring Ernest Lawrence—inventor of the cyclotron particle accelerator.',
  104: 'Synthetic superheavy element honoring Ernest Rutherford, existing only fleetingly inside research laboratories.',
  105: 'Named after the nuclear research center in Dubna, Russia; its longest-lived isotope has a ~28-hour half-life.',
  106: 'Honors chemist Glenn T. Seaborg; exhibits chemical behavior closely resembling molybdenum and tungsten.',
  107: 'Named in tribute to Niels Bohr, pioneer of the quantum model of atomic structure.',
  108: 'Named after the German state of Hesse; predicted to be among the densest metals if produced in bulk.',
  109: 'Honors physicist Lise Meitner, co-discoverer of nuclear fission.',
  110: 'Synthesized at the GSI institute in Darmstadt, Germany; decays within milliseconds to a few seconds.',
  111: 'Named after Wilhelm Röntgen, discoverer of X-rays; sits directly beneath copper, silver, and gold.',
  112: 'Honors astronomer Nicolaus Copernicus; strong relativistic effects make it unusually volatile.',
  113: 'The first superheavy element discovered in Asia (at RIKEN in Japan — "Nihon").',
  114: 'Synthetic superheavy element near the predicted "island of stability", named after the Flerov Laboratory.',
  115: 'Named for the Moscow region; created by fusing calcium-48 beams with americium-243 targets.',
  116: 'Named for Lawrence Livermore National Laboratory (USA); persists for only tens of milliseconds.',
  117: 'Second-heaviest synthesized element; placed in the halogen group but heavily altered by relativistic effects.',
  118: 'The heaviest element on the periodic table, honoring Yuri Oganessian; sits in group 18 yet is predicted to be solid.'
};

const PHASE_EN_MAP = {
  'Rắn': 'Solid',
  'Lỏng': 'Liquid',
  'Khí': 'Gas'
};

const NOBLE_CORE_CONFIGS = {
  '[He]': '1s2',
  '[Ne]': '1s2 2s2 2p6',
  '[Ar]': '1s2 2s2 2p6 3s2 3p6',
  '[Kr]': '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6',
  '[Xe]': '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6',
  '[Rn]': '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6 4f14 5d10 6s2 6p6'
};

const SUBSHELL_ORDER = { s: 0, p: 1, d: 2, f: 3 };

function expandElectronConfig(configStr) {
  let raw = configStr;
  for (const [core, expanded] of Object.entries(NOBLE_CORE_CONFIGS)) {
    if (raw.startsWith(core)) {
      raw = expanded + raw.slice(core.length);
      break;
    }
  }
  const subshells = [];
  const regex = /(\d+)([spdf])(\d+)/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    subshells.push({ n: Number(m[1]), l: m[2], count: Number(m[3]) });
  }
  // Standard shell order (1s 2s 2p 3s 3p 3d 4s 4p 4d 4f ...)
  subshells.sort((a, b) => a.n - b.n || SUBSHELL_ORDER[a.l] - SUBSHELL_ORDER[b.l]);
  const fullConfig = subshells.map((s) => `${s.n}${s.l}${s.count}`).join(' ');
  return { fullConfig, subshells };
}

function formatYearEn(yearStr) {
  return String(yearStr)
    .replace(/^Trước\s+/i, 'Before ')
    .replace(/\bTCN\b/g, 'BC');
}

// Standard Specific Heat Capacity at 25°C in J/(g·K) (CRC / NIST reference values; null if unmeasured)
const SPECIFIC_HEAT_MAP = {
  1: 14.304, 2: 5.193, 3: 3.582, 4: 1.825, 5: 1.026, 6: 0.709, 7: 1.040, 8: 0.918, 9: 0.824, 10: 1.030,
  11: 1.228, 12: 1.023, 13: 0.897, 14: 0.705, 15: 0.769, 16: 0.710, 17: 0.479, 18: 0.520,
  19: 0.757, 20: 0.647, 21: 0.568, 22: 0.523, 23: 0.489, 24: 0.449, 25: 0.479, 26: 0.449, 27: 0.421, 28: 0.444,
  29: 0.385, 30: 0.388, 31: 0.371, 32: 0.320, 33: 0.329, 34: 0.321, 35: 0.474, 36: 0.248,
  37: 0.363, 38: 0.301, 39: 0.298, 40: 0.278, 41: 0.265, 42: 0.251, 43: 0.243, 44: 0.238, 45: 0.243, 46: 0.244,
  47: 0.235, 48: 0.232, 49: 0.233, 50: 0.228, 51: 0.207, 52: 0.202, 53: 0.214, 54: 0.158,
  55: 0.242, 56: 0.204, 57: 0.195, 58: 0.192, 59: 0.193, 60: 0.190, 62: 0.197, 63: 0.182, 64: 0.236, 65: 0.182,
  66: 0.173, 67: 0.165, 68: 0.168, 69: 0.160, 70: 0.155, 71: 0.154, 72: 0.144, 73: 0.140, 74: 0.132, 75: 0.137,
  76: 0.130, 77: 0.131, 78: 0.133, 79: 0.129, 80: 0.140, 81: 0.129, 82: 0.129, 83: 0.122, 84: 0.126, 86: 0.094,
  88: 0.092, 89: 0.120, 90: 0.113, 91: 0.099, 92: 0.116, 93: 0.124, 94: 0.130
};

window.ELEMENTS = RAW_ELEMENTS.map((e) => {
  const catMeta = window.ELEMENT_CATEGORIES[e[5]];
  const neutrons = Math.max(0, Math.round(e[4]) - e[0]);
  const { fullConfig, subshells } = expandElectronConfig(e[13]);
  return {
    number: e[0],
    symbol: e[1],
    name: e[2],
    enName: e[3],
    mass: e[4],
    category: e[5],
    categoryLabel: catMeta.label,
    categoryLabelEn: catMeta.labelEn,
    macro: catMeta.macro,
    macroLabel: catMeta.macroLabel,
    macroLabelEn: catMeta.macroLabelEn,
    group: e[6],
    period: e[7],
    row: e[8],
    col: e[9],
    block: e[10],
    phase: e[11],
    phaseEn: PHASE_EN_MAP[e[11]] || e[11],
    shells: e[12],
    config: e[13],
    fullConfig,
    subshells,
    electronegativity: e[14],
    radius: e[15],
    specificHeat: SPECIFIC_HEAT_MAP[e[0]] ?? null,
    ionization: e[16],
    meltC: e[17],
    boilC: e[18],
    density: e[19],
    oxidationStates: e[20],
    year: e[21],
    yearEn: formatYearEn(e[21]),
    summary: e[22],
    enSummary: EN_SUMMARIES[e[0]] || e[22],
    protons: e[0],
    electrons: e[0],
    neutrons
  };
});

window.formatElectronConfigHTML = function (configStr) {
  // Convert e.g. "[Ar] 3d6 4s2" -> "[Ar] 3d<sup>6</sup> 4s<sup>2</sup>"
  return configStr.replace(/([spdf])(\d+)/g, '$1<sup>$2</sup>');
};

window.formatSubshellsHTML = function (subshells) {
  return subshells
    .map((s) => `<span class="sub-token sub-${s.l}">${s.n}${s.l}<sup>${s.count}</sup></span>`)
    .join(' ');
};

window.formatMass = function (mass) {
  if (Number.isInteger(mass)) return `[${mass}]`;
  if (mass >= 100) return mass.toFixed(2);
  if (mass >= 10) return mass.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
  return mass.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
};
