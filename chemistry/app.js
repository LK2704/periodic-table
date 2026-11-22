// Interactive Periodic Table 3D — Application Controller
// Supports bilingual VI / EN switching, initial idle prompt, hover preview,
// click-to-lock focus dimming, category filtering, search, and 3D atom controls.

(function () {
  const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

  const GROUP_ROMAN = {
    1: 'IA',
    2: 'IIA',
    3: 'IIIB',
    4: 'IVB',
    5: 'VB',
    6: 'VIB',
    7: 'VIIB',
    8: 'VIIIB',
    9: 'VIIIB',
    10: 'VIIIB',
    11: 'IB',
    12: 'IIB',
    13: 'IIIA',
    14: 'IVA',
    15: 'VA',
    16: 'VIA',
    17: 'VIIA',
    18: 'VIIIA'
  };

  const I18N = {
    vi: {
      idleAtomCaption: 'Mô hình nguyên tử 3D tương tác',
      dragHint: '↻ Kéo xoay 360° • Cuộn thu phóng',
      autoRotate: 'Tự xoay',
      mode3d: 'Quỹ đạo 3D',
      modeBohr: 'Vỏ Bohr 3D',
      resetTitle: 'Đặt lại góc nhìn (hoặc nhấp đúp)',
      expandAtomTitle: 'Phóng to mô hình 3D gần toàn màn hình',
      collapseAtomTitle: 'Thu nhỏ mô hình 3D (Esc)',
      autoRotateTitle: 'Bật/Tắt tự quay các vòng quỹ đạo quanh hạt nhân đứng yên',
      modeTitle: 'Chuyển chế độ Quỹ đạo 3D / Vỏ Bohr',
      orbitSpeedStates: { 0: 'Dừng', 0.5: 'Chậm', 1: 'Bình thường', 2: 'Nhanh', 3: 'Rất nhanh' },
      orbitSpeedTitle: (label, speed) => `Tốc độ quay vòng electron: ${speed}× (${label}) — bấm để thay đổi`,
      valenceShellTip: (catLabel) => `Lớp ngoài cùng (electron hóa trị — màu nhóm ${catLabel})`,
      emptyTitle: 'Di chuột vào một nguyên tố bên dưới để khám phá',
      emptyDesc:
        'Thông số chi tiết, cấu hình electron và mô hình nguyên tử 3D sẽ hiển thị tại đây. Nhấp trực tiếp vào một ô để cố định thông tin.',
      emptyTitleMobile: 'Chọn một nguyên tố bên dưới để khám phá',
      emptyDescMobile:
        'Thông số chi tiết, cấu hình electron và các thông tin khác sẽ hiển thị tại đây. Nhấp trực tiếp vào một ô để cố định thông tin.',
      mMass: 'Nguyên tử khối',
      mOuter: 'Electron lớp ngoài',
      mConfig: 'Cấu hình electron',
      mEneg: 'Độ âm điện (Pauling)',
      mRadius: 'Bán kính nguyên tử',
      mSpecHeat: 'Nhiệt dung riêng',
      hudRadiusLabel: 'Bán kính:',
      hudRadiusTitle: 'Bán kính nguyên tử (pm)',
      mIoniz: 'Năng lượng ion hóa I₁',
      mDensity: 'Khối lượng riêng',
      mMelt: 'Nhiệt độ nóng chảy',
      mBoil: 'Nhiệt độ sôi',
      mOx: 'Số oxi hóa phổ biến',
      mPos: 'Vị trí & Phân lớp',
      mShells: 'Số lớp / Lớp vỏ e⁻',
      mYear: 'Năm phát hiện',
      detailsBtn: 'Khám phá chi tiết',
      modalOverview: 'Tổng quan',
      modalTraits: 'Đặc trưng nổi bật',
      modalApps: 'Ứng dụng thực tế',
      modalClose: 'Đóng',
      discoveredPrefix: 'Phát hiện:',
      radioactiveNote: 'Nguyên tố phóng xạ (không có đồng vị bền tự nhiên).',
      filterAll: 'Tất cả',
      filterMetal: 'Kim loại',
      filterMetalloid: 'Á kim',
      filterNonmetal: 'Phi kim',
      filterNoble: 'Khí hiếm',
      searchPlaceholder: 'Tìm: Fe, Sắt, 26...',
      searchClearTitle: 'Xóa tìm kiếm',
      unknown: 'Chưa xác định',
      none: 'Không có',
      periodShort: 'CK',
      groupLabel: 'Nhóm',
      fBlockLabel: 'Họ f',
      blockLabel: 'phân lớp',
      shellsWord: 'lớp',
      shellUnit: 'lớp',
      lanthanideSeries: 'Họ Lantan (57–71) →',
      actinideSeries: 'Họ Actini (89–103) →',
      lanthanideTooltip: 'Họ Lantan (Nguyên tố 57–71)',
      actinideTooltip: 'Họ Actini (Nguyên tố 89–103)',
      groupAxis: 'Nhóm',
      periodAxis: 'Chu kỳ',
      protonTitle: 'Số Proton',
      neutronTitle: 'Số Neutron (đồng vị phổ biến)',
      electronTitle: 'Số Electron',
      shellsTitle: 'Phân bố electron theo lớp vỏ K, L, M, N, O, P, Q',
      viewModeLabel: 'Chế độ',
      modeDefault: 'Mặc định (Nhóm chất)',
      modeTemperature: 'Trạng thái theo nhiệt độ',
      modeElectronegativity: 'Độ âm điện',
      modeRadius: 'Bán kính nguyên tử',
      modeIonization: 'Năng lượng ion hóa',
      modeDensity: 'Khối lượng riêng',
      bondingLabBtn: 'Lab',
      bondingLabTitle: 'Mở Lab — Liên kết nguyên tử, Phản ứng hóa học & Lắp ráp phân tử',
      vlabBtn: 'Thí nghiệm ảo',
      vlabBtnTitle: 'Mở Thí nghiệm ảo — Pin điện & Điện phân, Cân bằng hóa học Le Chatelier',
      toolsBtn: 'Công cụ',
      toolsBtnTitle: 'Mở Công cụ — Tính khối lượng mol, So sánh nguyên tố & Máy đo pH',
      sendToLabBtn: 'Đưa vào Lab',
      sendToLabTitle: 'Đưa nguyên tố này vào vị trí Nguyên tố A trong Phòng Lab Liên Kết',
      stateSolid: 'Rắn',
      stateLiquid: 'Lỏng',
      stateGas: 'Khí',
      stateUnknownShort: 'Chưa rõ',
      stateTags: { solid: 'R', liquid: 'L', gas: 'K', unknown: '?' },
      tempResetTitle: 'Đặt lại nhiệt độ phòng 25°C',
      heatmapLogScale: 'Thang log₁₀',
      heatmapNoData: 'Không có dữ liệu (—)',
      modeBackDefault: '↺ Mặc định',
      heatmapTitles: {
        electronegativity: 'Độ âm điện',
        radius: 'Bán kính nguyên tử',
        ionization: 'Năng lượng ion hóa I₁',
        density: 'Khối lượng riêng'
      },
      radiusPopTitle: 'Bán kính nguyên tử',
      radiusAngstrom: 'Đơn vị Å',
      radiusVsH: 'So với H (53 pm)',
      radiusOfMax: 'So với Fr (348 pm)',
      radiusRank: 'Xếp hạng lớn',
      radiusNoData: 'Chưa có dữ liệu bán kính thực nghiệm.',
      radiusRefMax: 'Fr 348 pm',
      enegStrengthLbl: 'Lực hút e⁻',
      enegStrengths: { vhigh: 'Rất mạnh', high: 'Mạnh', mod: 'Trung bình', low: 'Yếu' },
      enegVsH: 'Lệch so với H',
      enegOfMax: 'So với F (3.98)',
      enegRank: 'Xếp hạng cao',
      enegNoData: 'Không có giá trị độ âm điện Pauling.',
      enegRefMax: 'F 3.98 (max)',
      ionEvLbl: 'Đơn vị eV',
      ionEaseLbl: 'Tách 1 e⁻',
      ionEases: { vhard: 'Rất khó', hard: 'Khó', mod: 'Trung bình', easy: 'Dễ tách' },
      ionOfMax: 'So với He (2372)',
      ionRank: 'Xếp hạng cao',
      ionNoData: 'Chưa có dữ liệu năng lượng ion hóa.',
      ionRefMax: 'He 2372 kJ',
      denVsWater: 'So với nước',
      denInWater: 'Trong nước',
      denWaterStates: { gas: 'Thể khí', floats: 'Nổi (< 1)', sinks: 'Chìm (> 1)' },
      denMass1cm3: 'Khối lượng 1 cm³',
      denRank: 'Xếp hạng nặng',
      denNoData: 'Chưa có dữ liệu khối lượng riêng thực nghiệm.',
      denRefMax: 'Hs 40.7 (log₁₀)',
      orbitalTitle: 'Sơ đồ ô lượng tử (Lớp hóa trị)',
      orbitalFullConfig: 'Cấu hình đầy đủ',
      orbitalHintTitle: 'Nhấp để xem cấu hình đầy đủ và sơ đồ ô lượng tử',
      orbitalUnpaired: 'Electron độc thân',
      orbitalAllPaired: 'Đã ghép đôi hết',
      orbitalHundNote: 'Quy tắc Hund',
      orbitalClose: 'Đóng sơ đồ ô lượng tử',
      orbitalBoxPaired: '2 e⁻ ghép đôi (↑↓)',
      orbitalBoxSingle: '1 e⁻ độc thân (↑)',
      orbitalBoxEmpty: 'Ô lượng tử trống',
      modalSpectrum: 'Quang phổ vạch phát xạ (380–750 nm)',
      modalSpectrumFlame: 'Quang phổ vạch phát xạ & Màu ngọn lửa',
      spectrumHoverHint: 'Di chuột vào vạch để xem bước sóng (nm)',
      spectrumTapHint: 'Chạm vào vạch để xem bước sóng (nm)',
      spectrumLinesUnit: 'vạch chính',
      spectrumNoDataSuperheavy:
        'Nguyên tố phóng xạ nặng / siêu nặng — chưa đo được quang phổ vạch phát xạ khả kiến (380–750 nm) thực nghiệm.',
      spectrumNoDataAt:
        'Astatin phóng xạ cực hiếm — chỉ mới ghi nhận vạch phát xạ trong vùng tử ngoại (UV), chưa có dữ liệu vạch khả kiến (380–750 nm).',
      flameTestLabel: 'Thử lửa',
      formulaHighlightHint: 'Bấm ra ngoài hoặc nhấn Esc để bỏ đánh dấu',
      formulaHighlightClose: 'Xóa đánh dấu công thức',
      comparePickBanner: (sym, name) => `Đang chọn so sánh: ${sym} (${name}) — Shift + Click ô thứ 2`,
      comparePickCancel: 'Hủy chọn so sánh',
      modalIsotopes: 'Đồng vị phổ biến & Chu kì bán rã',
      modalIsotopesHint: 'Bấm để xem mô hình 3D (n⁰ = A − Z)',
      isoStable: 'Bền',
      isoRadioactive: 'Phóng xạ',
      isoView3D: 'Xem 3D',
      isoActive: 'Đang xem',
      isoResetShort: 'Mặc định',
      isoResetTitle: 'Đặt lại về đồng vị phổ biến mặc định',
      isoNeutronTip: (a, z, n, sym) => `Đồng vị ${sym}-${a}: n⁰ = ${a} − ${z} = ${n}`,
      mobileLockBarLabel: 'Thao tác nguyên tố đang khóa',
      mobileScrollTopTitle: 'Cuộn lên xem mô hình 3D và thông số',
      mobileUnlockTitle: 'Bỏ khóa nguyên tố',
      atomZoomInTitle: 'Phóng to mô hình 3D',
      atomZoomOutTitle: 'Thu nhỏ mô hình 3D',
      atomResetMobileTitle: 'Đặt lại góc nhìn 3D',
      subLabels: {
        'alkali-metal': 'KL kiềm',
        'alkaline-earth': 'KL kiềm thổ',
        'transition-metal': 'KL chuyển tiếp',
        'post-transition': 'KL sau CT',
        'metalloid': 'Á kim',
        'nonmetal': 'Phi kim',
        'halogen': 'Halogen',
        'noble-gas': 'Khí hiếm',
        'lanthanide': 'Lantan',
        'actinide': 'Actini'
      },
      groupTips: {
        metal: {
          title: 'Kim loại',
          tag: 'Nhóm lớn',
          desc: 'Chiếm phần lớn bảng tuần hoàn, thường có ánh kim, dẫn điện và dẫn nhiệt tốt, dẻo và dễ dát mỏng. Nguyên tử kim loại thường có 1–3 electron lớp ngoài cùng nên dễ nhường electron tạo ion dương.'
        },
        'alkali-metal': {
          title: 'Kim loại kiềm',
          tag: 'Nhóm IA',
          desc: 'Kim loại mềm, nhẹ, có ánh bạc và chỉ có 1 electron lớp ngoài cùng nên hoạt động hóa học rất mạnh. Chúng dễ nhường electron tạo ion +1 và phản ứng mãnh liệt với nước tạo dung dịch kiềm, giải phóng khí H₂.'
        },
        'alkaline-earth': {
          title: 'Kim loại kiềm thổ',
          tag: 'Nhóm IIA',
          desc: 'Kim loại có 2 electron lớp ngoài cùng, cứng hơn và có nhiệt độ nóng chảy cao hơn kim loại kiềm. Chúng hoạt động hóa học khá mạnh, dễ tạo ion +2 và có các hợp chất oxit mang tính kiềm phổ biến trong tự nhiên.'
        },
        'transition-metal': {
          title: 'Kim loại chuyển tiếp',
          tag: 'Nhóm IIIB–IIB',
          desc: 'Kim loại phân lớp d thường cứng, bền, có khối lượng riêng và nhiệt độ nóng chảy cao, dẫn điện và dẫn nhiệt tốt. Chúng có nhiều mức oxi hóa, thường tạo hợp chất có màu đặc trưng và làm chất xúc tác hiệu quả.'
        },
        'post-transition': {
          title: 'Kim loại sau chuyển tiếp',
          tag: 'Phân lớp p',
          desc: 'Kim loại nằm giữa nhóm chuyển tiếp và á kim, thường mềm hơn, dễ uốn và có nhiệt độ nóng chảy thấp hơn kim loại chuyển tiếp. Nhiều nguyên tố trong nhóm thể hiện tính lưỡng tính và độ âm điện cao hơn kim loại điển hình.'
        },
        metalloid: {
          title: 'Á kim',
          tag: 'Ranh giới KL–PK',
          desc: 'Nguyên tố mang tính chất trung gian giữa kim loại và phi kim, thường có ánh kim nhẹ nhưng khá giòn. Đặc trưng nổi bật nhất là tính bán dẫn điện tăng theo nhiệt độ, đóng vai trò cốt lõi trong vi mạch điện tử.'
        },
        nonmetal: {
          title: 'Phi kim',
          tag: 'Phân lớp s, p',
          desc: 'Nguyên tố có độ âm điện tương đối cao, dẫn điện và dẫn nhiệt kém, thường tồn tại ở thể khí hoặc chất rắn giòn. Chúng có xu hướng nhận hoặc góp chung electron tạo liên kết cộng hóa trị, hình thành nền tảng của sự sống.'
        },
        halogen: {
          title: 'Halogen',
          tag: 'Nhóm VIIA',
          desc: 'Phi kim điển hình có 7 electron lớp ngoài cùng và độ âm điện rất cao, chỉ cần nhận thêm 1 electron để đạt cấu hình bền vững. Chúng hoạt động hóa học rất mạnh và dễ phản ứng với kim loại tạo thành muối halogenua.'
        },
        'noble-gas': {
          title: 'Khí hiếm',
          tag: 'Nhóm VIIIA',
          desc: 'Chất khí không màu, không mùi, đơn nguyên tử với lớp vỏ electron ngoài cùng đã bão hòa bền vững. Nhờ năng lượng ion hóa rất cao, chúng hầu như trơ về mặt hóa học và rất ít tham gia phản ứng ở điều kiện thường.'
        },
        lanthanide: {
          title: 'Họ Lantan',
          tag: 'Phân lớp 4f',
          desc: 'Gồm 15 kim loại đất hiếm phân lớp 4f (từ La đến Lu) có tính chất hóa học rất giống nhau và phổ biến với số oxi hóa +3. Chúng nổi bật về từ tính và quang học, dùng nhiều trong nam châm mạnh, laser và màn hình.'
        },
        actinide: {
          title: 'Họ Actini',
          tag: 'Phân lớp 5f',
          desc: 'Gồm 15 kim loại nặng phân lớp 5f (từ Ac đến Lr), tất cả đều có tính phóng xạ và nhiều nguyên tố nặng được tổng hợp nhân tạo. Chúng có nhiều trạng thái oxi hóa và một số đồng vị là nguồn nhiên liệu hạt nhân.'
        }
      }
    },
    en: {
      idleAtomCaption: 'Interactive 3D Atomic Model',
      dragHint: '↻ Drag 360° • Scroll to zoom',
      autoRotate: 'Auto-rotate',
      mode3d: '3D Orbitals',
      modeBohr: '3D Bohr',
      resetTitle: 'Reset camera view (or double-click)',
      expandAtomTitle: 'Expand 3D atom viewer to near-fullscreen',
      collapseAtomTitle: 'Collapse 3D atom viewer (Esc)',
      autoRotateTitle: 'Toggle independent 3D orbital ring rotation around stationary nucleus',
      modeTitle: 'Switch between 3D Orbitals / 3D Bohr shells',
      orbitSpeedStates: { 0: 'Paused', 0.5: 'Slow', 1: 'Normal', 2: 'Fast', 3: 'Very fast' },
      orbitSpeedTitle: (label, speed) => `Electron orbital speed: ${speed}× (${label}) — click to cycle`,
      valenceShellTip: (catLabel) => `Outermost valence shell (colored by ${catLabel})`,
      emptyTitle: 'Hover over any element below to explore',
      emptyDesc:
        'Detailed metrics, electron configuration, and an interactive 3D atomic model will appear here. Click any element to focus it.',
      emptyTitleMobile: 'Tap an element below to explore',
      emptyDescMobile:
        'Detailed metrics, electron configuration, and other information will appear here. Tap any element directly to lock its information.',
      mMass: 'Atomic Mass',
      mOuter: 'Outer Shell e⁻',
      mConfig: 'Electron Configuration',
      mEneg: 'Electronegativity (Pauling)',
      mRadius: 'Atomic Radius',
      mSpecHeat: 'Specific Heat',
      hudRadiusLabel: 'Radius:',
      hudRadiusTitle: 'Atomic Radius (pm)',
      mIoniz: '1st Ionization Energy',
      mDensity: 'Density',
      mMelt: 'Melting Point',
      mBoil: 'Boiling Point',
      mOx: 'Oxidation States',
      mPos: 'Position & Block',
      mShells: 'Electron Shells',
      mYear: 'Year Discovered',
      detailsBtn: 'Explore More',
      modalOverview: 'Overview',
      modalTraits: 'Key Characteristics',
      modalApps: 'Real-World Applications',
      modalClose: 'Close',
      discoveredPrefix: 'Discovered:',
      radioactiveNote: 'Radioactive element with no stable naturally occurring isotopes.',
      filterAll: 'All',
      filterMetal: 'Metals',
      filterMetalloid: 'Metalloid',
      filterNonmetal: 'Nonmetal',
      filterNoble: 'Noble Gas',
      searchPlaceholder: 'Search: Fe, Iron, 26...',
      searchClearTitle: 'Clear search',
      unknown: 'Unknown',
      none: 'None',
      periodShort: 'P',
      groupLabel: 'Group',
      fBlockLabel: 'f-block',
      blockLabel: 'block',
      shellsWord: 'shells',
      shellUnit: 'shell',
      lanthanideSeries: 'Lanthanides (57–71) →',
      actinideSeries: 'Actinides (89–103) →',
      lanthanideTooltip: 'Lanthanide Series (Elements 57–71)',
      actinideTooltip: 'Actinide Series (Elements 89–103)',
      groupAxis: 'Group',
      periodAxis: 'Period',
      protonTitle: 'Protons',
      neutronTitle: 'Neutrons (most common isotope)',
      electronTitle: 'Electrons',
      shellsTitle: 'Electron distribution across K–Q shells',
      viewModeLabel: 'View',
      modeDefault: 'Default (Categories)',
      modeTemperature: 'Temperature States',
      modeElectronegativity: 'Electronegativity',
      modeRadius: 'Atomic Radius',
      modeIonization: 'Ionization Energy',
      modeDensity: 'Density',
      bondingLabBtn: 'Lab',
      bondingLabTitle: 'Open Lab — Atomic Bonding, Chemical Reactions & Molecule Builder',
      vlabBtn: 'Virtual Labs',
      vlabBtnTitle: 'Open Virtual Labs — Electrochemistry & Le Chatelier Chemical Equilibrium',
      toolsBtn: 'Tools',
      toolsBtnTitle: 'Open Tools — Molar Mass, Compare Elements & pH Meter',
      sendToLabBtn: 'Send to Lab',
      sendToLabTitle: 'Load this element into Element A of the Bonding Lab',
      stateSolid: 'Solid',
      stateLiquid: 'Liquid',
      stateGas: 'Gas',
      stateUnknownShort: 'Unknown',
      stateTags: { solid: 'S', liquid: 'L', gas: 'G', unknown: '?' },
      tempResetTitle: 'Reset to room temperature (25°C)',
      heatmapLogScale: 'Log₁₀ scale',
      heatmapNoData: 'No data (—)',
      modeBackDefault: '↺ Default',
      heatmapTitles: {
        electronegativity: 'Electronegativity',
        radius: 'Atomic Radius',
        ionization: '1st Ionization Energy',
        density: 'Density'
      },
      radiusPopTitle: 'Atomic Radius',
      radiusAngstrom: 'In Ångströms',
      radiusVsH: 'vs. H (53 pm)',
      radiusOfMax: 'of Max (Fr)',
      radiusRank: 'Size Rank',
      radiusNoData: 'No experimental atomic radius data.',
      radiusRefMax: 'Fr 348 pm',
      enegStrengthLbl: 'e⁻ Pull',
      enegStrengths: { vhigh: 'Very High', high: 'High', mod: 'Moderate', low: 'Low' },
      enegVsH: 'Δχ vs. H',
      enegOfMax: 'of Max (F)',
      enegRank: 'Rank',
      enegNoData: 'No Pauling electronegativity value.',
      enegRefMax: 'F 3.98 (max)',
      ionEvLbl: 'In eV',
      ionEaseLbl: 'e⁻ Removal',
      ionEases: { vhard: 'Very Hard', hard: 'Hard', mod: 'Moderate', easy: 'Easy' },
      ionOfMax: 'of Max (He)',
      ionRank: 'Rank',
      ionNoData: 'No experimental ionization energy data.',
      ionRefMax: 'He 2372 kJ',
      denVsWater: 'vs. Water',
      denInWater: 'In Water',
      denWaterStates: { gas: 'Gas', floats: 'Floats (< 1)', sinks: 'Sinks (> 1)' },
      denMass1cm3: 'Mass of 1 cm³',
      denRank: 'Density Rank',
      denNoData: 'No experimental density data.',
      denRefMax: 'Hs 40.7 (log₁₀)',
      orbitalTitle: 'Valence Orbital Box Diagram',
      orbitalFullConfig: 'Full configuration',
      orbitalHintTitle: 'Click to view full electron configuration and orbital box diagram',
      orbitalUnpaired: 'Unpaired electrons',
      orbitalAllPaired: 'All paired',
      orbitalHundNote: 'Hund’s rule',
      orbitalClose: 'Close orbital box diagram',
      orbitalBoxPaired: '2 paired e⁻ (↑↓)',
      orbitalBoxSingle: '1 unpaired e⁻ (↑)',
      orbitalBoxEmpty: 'Empty orbital',
      modalSpectrum: 'Atomic Emission Spectrum (380–750 nm)',
      modalSpectrumFlame: 'Emission Spectrum & Flame Test',
      spectrumHoverHint: 'Hover a line to inspect wavelength (nm)',
      spectrumTapHint: 'Tap a line to inspect wavelength (nm)',
      spectrumLinesUnit: 'key lines',
      spectrumNoDataSuperheavy:
        'Heavy / superheavy radioactive element — experimental visible emission spectrum (380–750 nm) has not been measured.',
      spectrumNoDataAt:
        'Extremely rare radioactive halogen — only ultraviolet (UV) lines observed; no visible (380–750 nm) emission lines recorded.',
      flameTestLabel: 'Flame Test',
      formulaHighlightHint: 'Click outside or press Esc to clear',
      formulaHighlightClose: 'Clear formula highlight',
      comparePickBanner: (sym, name) => `Compare pick: ${sym} (${name}) — Shift + Click a 2nd tile`,
      comparePickCancel: 'Cancel comparison pick',
      modalIsotopes: 'Common Isotopes & Half-Life',
      modalIsotopesHint: 'Click to view 3D model (n⁰ = A − Z)',
      isoStable: 'Stable',
      isoRadioactive: 'Radioactive',
      isoView3D: 'View 3D',
      isoActive: 'Active',
      isoResetShort: 'Default',
      isoResetTitle: 'Reset to default common isotope',
      isoNeutronTip: (a, z, n, sym) => `Isotope ${sym}-${a}: n⁰ = ${a} − ${z} = ${n}`,
      mobileLockBarLabel: 'Locked element actions',
      mobileScrollTopTitle: 'Scroll up to view 3D model and metrics',
      mobileUnlockTitle: 'Unlock element',
      atomZoomInTitle: 'Zoom in 3D atom',
      atomZoomOutTitle: 'Zoom out 3D atom',
      atomResetMobileTitle: 'Reset 3D view',
      subLabels: {
        'alkali-metal': 'Alkali Metal',
        'alkaline-earth': 'Alkaline Earth',
        'transition-metal': 'Transition Metal',
        'post-transition': 'Post-Transition',
        'metalloid': 'Metalloid',
        'nonmetal': 'Nonmetal',
        'halogen': 'Halogen',
        'noble-gas': 'Noble Gas',
        'lanthanide': 'Lanthanide',
        'actinide': 'Actinide'
      },
      groupTips: {
        metal: {
          title: 'Metals',
          tag: 'Broad Group',
          desc: 'Make up most of the periodic table and are typically lustrous, malleable, and strong conductors of heat and electricity. With 1–3 valence electrons, metal atoms readily lose electrons to form positive ions.'
        },
        'alkali-metal': {
          title: 'Alkali Metals',
          tag: 'Group 1',
          desc: 'Soft, lightweight, silvery metals with a single valence electron, making them highly reactive. They readily lose one electron to form +1 ions and react vigorously with water to produce alkaline solutions and H₂ gas.'
        },
        'alkaline-earth': {
          title: 'Alkaline Earth Metals',
          tag: 'Group 2',
          desc: 'Shiny metals with two valence electrons that are harder and have higher melting points than alkali metals. They are quite reactive, readily form +2 ions, and form basic oxides abundant in Earth’s crust.'
        },
        'transition-metal': {
          title: 'Transition Metals',
          tag: 'Groups 3–12',
          desc: 'd-block metals that are typically hard, dense, with high melting points and strong electrical and thermal conductivity. They exhibit multiple oxidation states, form vividly colored compounds, and act as effective catalysts.'
        },
        'post-transition': {
          title: 'Post-Transition Metals',
          tag: 'p-block',
          desc: 'Metals positioned between transition metals and metalloids, generally softer, more malleable, and lower-melting than transition metals. Many display amphoteric behavior and higher electronegativity than typical metals.'
        },
        metalloid: {
          title: 'Metalloids',
          tag: 'Staircase',
          desc: 'Elements bridging metals and nonmetals, often possessing a faint metallic luster while remaining brittle. Their signature trait is semiconductivity that rises with temperature, powering modern microchips and electronics.'
        },
        nonmetal: {
          title: 'Nonmetals',
          tag: 's, p-block',
          desc: 'Elements with relatively high electronegativity and poor heat and electrical conductivity, existing mostly as gases or brittle solids. They tend to gain or share electrons in covalent bonds, forming the basis of life.'
        },
        halogen: {
          title: 'Halogens',
          tag: 'Group 17',
          desc: 'Highly reactive nonmetals with seven valence electrons and very high electronegativity, needing just one electron to fill their outer shell. They readily react with metals to form halide salts.'
        },
        'noble-gas': {
          title: 'Noble Gases',
          tag: 'Group 18',
          desc: 'Colorless, odorless monatomic gases with completely filled valence electron shells. Their exceptionally high ionization energies make them chemically inert and largely unreactive under normal conditions.'
        },
        lanthanide: {
          title: 'Lanthanides',
          tag: '4f-block',
          desc: 'Fifteen 4f-block rare-earth metals (La–Lu) with remarkably similar chemistry and a dominant +3 oxidation state. Prized for strong magnetic and optical properties, they power high-strength magnets, lasers, and displays.'
        },
        actinide: {
          title: 'Actinides',
          tag: '5f-block',
          desc: 'Fifteen heavy 5f-block metals (Ac–Lr), all radioactive, with the heaviest members synthesized artificially. They exhibit multiple oxidation states, and key heavy isotopes serve as fuel for nuclear energy.'
        }
      }
    }
  };

  let savedLang = 'vi';
  try {
    const stored = localStorage.getItem('ptable_lang');
    if (stored === 'vi' || stored === 'en') savedLang = stored;
  } catch (_) {}

  const state = {
    lang: savedLang,
    displayed: null,
    locked: null,
    modalElement: null,
    activeMacro: 'all',
    activeCategory: null,
    hoverCategory: null,
    hoverMacro: null,
    searchQuery: '',
    autoRotate: true,
    orbitSpeedIdx: 0, // indexes ORBIT_SPEEDS: [1, 2, 3, 0, 0.5]
    atomMode: '3d',
    viewMode: 'default',
    temperatureC: 25,
    orbitalOpen: false,
    formulaHighlight: null,
    selectedIsotope: null,
    comparePick: null,
    atomExpanded: false
  };

  // DOM References
  const elTopSection = document.getElementById('top-section');
  const elAtomStageSlot = document.getElementById('atom-stage-slot');
  const elAtomStage = document.getElementById('atom-stage');
  const elAtomExpandBackdrop = document.getElementById('atom-expand-backdrop');
  const elAtomExpandedBanner = document.getElementById('atom-expanded-banner');
  const elTableSection = document.querySelector('.table-section');
  const elPeriodicWrapper = document.getElementById('periodic-wrapper');
  const elGrid = document.getElementById('periodic-grid');
  const elAtomCanvas = document.getElementById('atom-canvas');

  const elInspectorPanel = document.getElementById('inspector-panel');
  const elInspectorEmpty = document.getElementById('inspector-empty');
  const elInspectorContent = document.getElementById('inspector-content');
  const elEmptyTitle = document.getElementById('empty-title');
  const elEmptyDesc = document.getElementById('empty-desc');

  const elNum = document.getElementById('info-number');
  const elSym = document.getElementById('info-symbol');
  const elMassShort = document.getElementById('info-mass-short');
  const elName = document.getElementById('info-name');
  const elEnName = document.getElementById('info-en-name');
  const elMacro = document.getElementById('info-macro');
  const elCategory = document.getElementById('info-category');
  const elPhase = document.getElementById('info-phase');
  const btnOpenDetails = document.getElementById('btn-open-details');
  const btnSendToLab = document.getElementById('btn-send-to-lab');
  const btnOpenLab = document.getElementById('btn-open-lab');
  const btnOpenVlab = document.getElementById('btn-open-vlab');
  const btnOpenTools = document.getElementById('btn-open-tools');
  const viewModeSelect = document.getElementById('view-mode-select');

  const tempControls = document.getElementById('temp-controls');
  const tempSlider = document.getElementById('temp-slider');
  const tempValC = document.getElementById('temp-val-c');
  const tempValK = document.getElementById('temp-val-k');
  const tempPresets = document.getElementById('temp-presets');
  const tempResetBtn = document.getElementById('temp-reset-btn');
  const countSolid = document.getElementById('count-solid');
  const countLiquid = document.getElementById('count-liquid');
  const countGas = document.getElementById('count-gas');
  const countUnknown = document.getElementById('count-unknown');

  const heatmapControls = document.getElementById('heatmap-controls');
  const heatmapTitle = document.getElementById('heatmap-title');
  const heatmapLogBadge = document.getElementById('heatmap-log-badge');
  const heatmapMin = document.getElementById('heatmap-min');
  const heatmapMax = document.getElementById('heatmap-max');
  const heatmapUnit = document.getElementById('heatmap-unit');
  const heatmapResetBtn = document.getElementById('heatmap-reset-btn');

  const detailModal = document.getElementById('detail-modal');
  const detailBackdrop = document.getElementById('detail-backdrop');
  const btnCloseDetails = document.getElementById('btn-close-details');
  const btnCloseDetailsFooter = document.getElementById('btn-close-details-footer');
  const modalNumber = document.getElementById('modal-number');
  const modalSymbol = document.getElementById('modal-symbol');
  const modalTitle = document.getElementById('modal-title');
  const modalSubname = document.getElementById('modal-subname');
  const modalMacro = document.getElementById('modal-macro');
  const modalCategory = document.getElementById('modal-category');
  const modalPhase = document.getElementById('modal-phase');
  const modalSummary = document.getElementById('modal-summary');
  const modalSpectrumTitle = document.getElementById('modal-spectrum-title');
  const modalSpectrumBox = document.getElementById('modal-spectrum-box');
  const modalFlameCard = document.getElementById('modal-flame-card');
  const modalIsotopesGrid = document.getElementById('modal-isotopes-grid');
  const modalTraits = document.getElementById('modal-traits');
  const modalApps = document.getElementById('modal-apps');
  const modalMetaConfig = document.getElementById('modal-meta-config');
  const modalMetaYear = document.getElementById('modal-meta-year');

  const econfigBar = document.getElementById('econfig-bar');
  const econfigFull = document.getElementById('econfig-full');
  const econfigShort = document.getElementById('econfig-short');

  const mMass = document.getElementById('m-mass');
  const mOuter = document.getElementById('m-outer');
  const mEneg = document.getElementById('m-eneg');
  const mSpecHeat = document.getElementById('m-specheat');
  const mIoniz = document.getElementById('m-ioniz');
  const mDensity = document.getElementById('m-density');
  const mMelt = document.getElementById('m-melt');
  const mBoil = document.getElementById('m-boil');
  const mOx = document.getElementById('m-ox');
  const mPos = document.getElementById('m-pos');
  const mShells = document.getElementById('m-shells');
  const mYear = document.getElementById('m-year');

  const hudProtons = document.getElementById('hud-protons');
  const hudNeutrons = document.getElementById('hud-neutrons');
  const hudElectrons = document.getElementById('hud-electrons');
  const hudRadius = document.getElementById('hud-radius');
  const hudRadiusWrap = document.getElementById('hud-radius-wrap');
  const hudIsotopeChip = document.getElementById('hud-isotope-chip');
  const hudIsotopeLabel = document.getElementById('hud-isotope-label');
  const btnResetIsotope = document.getElementById('btn-reset-isotope');
  const hudShells = document.getElementById('hud-shells');
  const pillProton = document.getElementById('pill-proton');
  const pillNeutron = document.getElementById('pill-neutron');
  const pillElectron = document.getElementById('pill-electron');

  const ORBIT_SPEEDS = [1, 2, 3, 0, 0.5];

  const btnAutoRotate = document.getElementById('btn-autorotate');
  const autoRotateIcon = document.getElementById('autorotate-icon');
  const btnOrbitSpeed = document.getElementById('btn-orbit-speed');
  const speedIcon = document.getElementById('speed-icon');
  const speedLabel = document.getElementById('speed-label');
  const btnMode = document.getElementById('btn-mode');
  const modeLabel = document.getElementById('mode-label');
  const btnReset = document.getElementById('btn-reset');
  const btnExpandAtom = document.getElementById('btn-expand-atom');
  const btnAtomZoomIn = document.getElementById('btn-atom-zoom-in');
  const btnAtomZoomOut = document.getElementById('btn-atom-zoom-out');
  const btnAtomZoomReset = document.getElementById('btn-atom-zoom-reset');
  const detailBody = detailModal ? detailModal.querySelector('.detail-body') : null;
  const mobileLockBar = document.getElementById('mobile-lock-bar');
  const btnMobileScrollTop = document.getElementById('btn-mobile-scroll-top');
  const mobileLockZ = document.getElementById('mobile-lock-z');
  const mobileLockSym = document.getElementById('mobile-lock-sym');
  const mobileLockName = document.getElementById('mobile-lock-name');
  const mobileLockSub = document.getElementById('mobile-lock-sub');
  const btnMobileOpenDetails = document.getElementById('btn-mobile-open-details');
  const btnMobileUnlock = document.getElementById('btn-mobile-unlock');

  const hoverNoneQuery =
    typeof window.matchMedia === 'function' ? window.matchMedia('(hover: none)') : null;
  const mobileViewportQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 820px), (orientation: landscape) and (max-height: 600px) and (max-width: 1120px)')
      : null;
  const mobileLandscapeQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(orientation: landscape) and (max-height: 600px) and (max-width: 1120px)')
      : null;
  const reducedMotionQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
  let lastCellTouchTime = 0;
  let detailCloseTimer = null;
  let mobileBarHideTimer = null;
  let mobileBarEnterTimer = null;
  let mobileBarSwapTimer = null;
  let mobileBarRafId = null;
  let lastMobileBarElementNum = null;

  function isHoverNoneDevice() {
    return Boolean(hoverNoneQuery && hoverNoneQuery.matches);
  }

  function isMobileViewport() {
    return Boolean(mobileViewportQuery && mobileViewportQuery.matches);
  }

  function isMobileExperience() {
    return isMobileViewport() || isHoverNoneDevice();
  }

  function isMobileLandscape() {
    return Boolean(mobileLandscapeQuery && mobileLandscapeQuery.matches);
  }

  function prefersReducedMotion() {
    return Boolean(reducedMotionQuery && reducedMotionQuery.matches);
  }

  function syncEmptyPromptCopy() {
    const dict = t();
    const useMobileCopy = isMobileExperience();
    if (elEmptyTitle) {
      elEmptyTitle.textContent = useMobileCopy ? dict.emptyTitleMobile : dict.emptyTitle;
    }
    if (elEmptyDesc) {
      elEmptyDesc.textContent = useMobileCopy ? dict.emptyDescMobile : dict.emptyDesc;
    }
  }

  function syncMobileTableOrientation() {
    if (elPeriodicWrapper) {
      elPeriodicWrapper.style.width = '';
      elPeriodicWrapper.style.height = '';
    }
    if (elGrid) {
      elGrid.style.transform = '';
    }
    if (isMobileLandscape() && elTableSection && elTableSection.scrollLeft !== 0) {
      elTableSection.scrollLeft = 0;
    }
  }

  function updateMobileActionBar() {
    if (!mobileLockBar) return;
    if (mobileBarHideTimer !== null) {
      clearTimeout(mobileBarHideTimer);
      mobileBarHideTimer = null;
    }
    if (mobileBarEnterTimer !== null) {
      clearTimeout(mobileBarEnterTimer);
      mobileBarEnterTimer = null;
    }
    if (mobileBarSwapTimer !== null) {
      clearTimeout(mobileBarSwapTimer);
      mobileBarSwapTimer = null;
    }
    if (mobileBarRafId !== null) {
      cancelAnimationFrame(mobileBarRafId);
      mobileBarRafId = null;
    }

    const labOpen = Boolean(window.BondingLab && window.BondingLab.isOpen());
    const toolsOpen = Boolean(window.ChemTools && window.ChemTools.isOpen());
    const factsOpen = Boolean(window.ChemFacts && window.ChemFacts.isOpen());
    const hasOverlay = Boolean(state.modalElement || state.atomExpanded || labOpen || toolsOpen || factsOpen);
    const el = state.locked;
    const shouldShow = Boolean(el && !hasOverlay && isMobileExperience());

    if (el) {
      const isEn = state.lang === 'en';
      const cat = window.ELEMENT_CATEGORIES[el.category];
      if (cat) {
        mobileLockBar.style.setProperty('--accent', cat.color);
      }
      if (mobileLockZ) mobileLockZ.textContent = el.number;
      if (mobileLockSym) mobileLockSym.textContent = el.symbol;
      if (mobileLockName) mobileLockName.textContent = isEn ? el.enName : el.name;
      if (mobileLockSub) mobileLockSub.textContent = isEn ? el.categoryLabelEn : el.categoryLabel;
    }

    mobileLockBar.setAttribute('aria-hidden', String(!shouldShow));
    document.body.classList.toggle('has-mobile-lock-bar', shouldShow);

    if (shouldShow) {
      const wasHidden = mobileLockBar.classList.contains('hidden');
      const wasLeaving = mobileLockBar.classList.contains('is-leaving');
      const wasVisible = mobileLockBar.classList.contains('is-visible') && !wasHidden && !wasLeaving;
      const elementChanged =
        wasVisible && lastMobileBarElementNum !== null && el && lastMobileBarElementNum !== el.number;
      lastMobileBarElementNum = el ? el.number : null;

      mobileLockBar.classList.remove('hidden', 'is-leaving');
      mobileLockBar.classList.add('is-visible');

      if (!wasVisible && !prefersReducedMotion()) {
        const startEnter = () => {
          mobileLockBar.classList.add('is-entering');
          mobileBarEnterTimer = setTimeout(() => {
            mobileBarEnterTimer = null;
            mobileLockBar.classList.remove('is-entering');
          }, 620);
        };
        if (wasHidden) {
          mobileLockBar.classList.remove('is-entering');
          startEnter();
        } else {
          mobileLockBar.classList.remove('is-entering');
          mobileBarRafId = requestAnimationFrame(() => {
            mobileBarRafId = null;
            startEnter();
          });
        }
      } else if (elementChanged && btnMobileScrollTop && !prefersReducedMotion()) {
        btnMobileScrollTop.classList.remove('is-swapping');
        mobileBarRafId = requestAnimationFrame(() => {
          mobileBarRafId = null;
          btnMobileScrollTop.classList.add('is-swapping');
          mobileBarSwapTimer = setTimeout(() => {
            mobileBarSwapTimer = null;
            btnMobileScrollTop.classList.remove('is-swapping');
          }, 320);
        });
      }
    } else {
      lastMobileBarElementNum = null;
      mobileLockBar.classList.remove('is-visible', 'is-entering');
      if (btnMobileScrollTop) {
        btnMobileScrollTop.classList.remove('is-swapping');
      }
      if (mobileLockBar.classList.contains('hidden') || prefersReducedMotion()) {
        mobileLockBar.classList.remove('is-leaving');
        mobileLockBar.classList.add('hidden');
      } else {
        mobileLockBar.classList.add('is-leaving');
        mobileBarHideTimer = setTimeout(() => {
          mobileBarHideTimer = null;
          if (!mobileLockBar.classList.contains('is-visible')) {
            mobileLockBar.classList.remove('is-leaving');
            mobileLockBar.classList.add('hidden');
          }
        }, 330);
      }
    }
  }

  const langSwitch = document.getElementById('lang-switch');
  const macroFilters = document.getElementById('macro-filters');
  const subLegend = document.getElementById('sub-legend');
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  const cellMap = new Map();
  let laSeriesSpan = null;
  let acSeriesSpan = null;
  let laLabelEl = null;
  let acLabelEl = null;
  let laSlotEl = null;
  let acSlotEl = null;
  let axisGroupTextEl = null;
  let axisPeriodTextEl = null;
  let hoverLeaveTimer = null;
  let lastLockedCell = null;
  let lastActiveCell = null;
  let hoveredEl = null;
  let radiusHideTimer = null;
  let radiusPopover = null;
  let radiusPopoverKey = null;
  let orbitalPopover = null;
  let formulaBanner = null;
  let comparePickBanner = null;

  function cancelHoverLeave() {
    if (hoverLeaveTimer !== null) {
      clearTimeout(hoverLeaveTimer);
      hoverLeaveTimer = null;
    }
  }

  function scheduleHoverLeave() {
    cancelHoverLeave();
    hoverLeaveTimer = setTimeout(() => {
      hoverLeaveTimer = null;
      if (!state.locked) {
        clearDisplay();
      }
    }, 65);
  }

  // Initialize 3D Atom Engine (starts in ambient idle mode)
  const atomRenderer = new window.Atom3DRenderer(elAtomCanvas);

  function t() {
    return I18N[state.lang];
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

  function formatNumber(val, suffix = '') {
    if (val === null || val === undefined) return t().unknown;
    return `${val}${suffix}`;
  }

  // =========================================================================
  // VIEW MODES: Temperature States & Periodic Trends Heatmap
  // =========================================================================
  const HEATMAP_PROPS = ['electronegativity', 'radius', 'ionization', 'density'];

  const HEATMAP_STOPS = [
    { t: 0.0, bg: [36, 25, 99], accent: [99, 85, 216] },     // Deep Indigo
    { t: 0.25, bg: [18, 69, 120], accent: [38, 153, 230] },  // Ocean Blue
    { t: 0.5, bg: [13, 107, 102], accent: [20, 204, 184] },  // Vivid Teal / Cyan
    { t: 0.75, bg: [143, 100, 10], accent: [245, 197, 24] }, // Radiant Gold
    { t: 1.0, bg: [168, 40, 24], accent: [255, 92, 56] }     // Hot Crimson-Orange
  ];

  function lerpChannel(a, b, f) {
    return Math.round(a + (b - a) * f);
  }

  function rgbStr(arr) {
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
  }

  function lightenRgb(arr, factor) {
    return [
      Math.min(255, Math.round(arr[0] + (255 - arr[0]) * factor)),
      Math.min(255, Math.round(arr[1] + (255 - arr[1]) * factor)),
      Math.min(255, Math.round(arr[2] + (255 - arr[2]) * factor))
    ];
  }

  function getHeatmapColors(tNorm) {
    const clamped = Math.max(0, Math.min(1, tNorm));
    let s0 = HEATMAP_STOPS[0];
    let s1 = HEATMAP_STOPS[HEATMAP_STOPS.length - 1];
    for (let i = 0; i < HEATMAP_STOPS.length - 1; i++) {
      if (clamped >= HEATMAP_STOPS[i].t && clamped <= HEATMAP_STOPS[i + 1].t) {
        s0 = HEATMAP_STOPS[i];
        s1 = HEATMAP_STOPS[i + 1];
        break;
      }
    }
    const localF = s1.t === s0.t ? 0 : (clamped - s0.t) / (s1.t - s0.t);
    const bg = [
      lerpChannel(s0.bg[0], s1.bg[0], localF),
      lerpChannel(s0.bg[1], s1.bg[1], localF),
      lerpChannel(s0.bg[2], s1.bg[2], localF)
    ];
    const accent = [
      lerpChannel(s0.accent[0], s1.accent[0], localF),
      lerpChannel(s0.accent[1], s1.accent[1], localF),
      lerpChannel(s0.accent[2], s1.accent[2], localF)
    ];
    const bgHover = lightenRgb(bg, 0.22);
    const borderHover = lightenRgb(accent, 0.28);
    return {
      bg: rgbStr(bg),
      bgHover: rgbStr(bgHover),
      border: `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.78)`,
      borderHover: rgbStr(borderHover),
      glow: `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.45)`
    };
  }

  function formatDensityCell(v) {
    if (v < 0.01) {
      return v.toExponential(1).replace('.0e', 'e');
    }
    if (v < 10) {
      return v.toFixed(2);
    }
    return v.toFixed(1);
  }

  function buildHeatmapMeta() {
    const specs = {
      electronegativity: {
        unit: 'Pauling',
        isLog: false,
        formatCell: (v) => v.toFixed(2),
        formatBound: (v) => v.toFixed(2)
      },
      radius: {
        unit: 'pm',
        isLog: false,
        formatCell: (v) => String(Math.round(v)),
        formatBound: (v) => String(Math.round(v))
      },
      ionization: {
        unit: 'kJ/mol',
        isLog: false,
        formatCell: (v) => String(Math.round(v)),
        formatBound: (v) => String(Math.round(v))
      },
      density: {
        unit: 'g/cm³',
        isLog: true,
        formatCell: formatDensityCell,
        formatBound: (v) => (v < 0.01 ? String(v) : v.toFixed(1))
      }
    };

    Object.keys(specs).forEach((prop) => {
      const vals = window.ELEMENTS.map((e) => e[prop]).filter(
        (v) => v !== null && v !== undefined && (!specs[prop].isLog || v > 0)
      );
      const min = Math.min(...vals);
      const max = Math.max(...vals);
      specs[prop].min = min;
      specs[prop].max = max;
      if (specs[prop].isLog) {
        specs[prop].logMin = Math.log10(min);
        specs[prop].logMax = Math.log10(max);
      }
    });

    return specs;
  }

  const HEATMAP_META = buildHeatmapMeta();

  // Precomputed ranking & reference stats for all 4 Periodic Trend Heatmap modes
  const TREND_STATS = (() => {
    const out = {};
    const hEl = window.ELEMENTS.find((e) => e.number === 1);
    HEATMAP_PROPS.forEach((prop) => {
      const meta = HEATMAP_META[prop];
      const valid = window.ELEMENTS
        .filter((e) => e[prop] !== null && e[prop] !== undefined && (!meta.isLog || e[prop] > 0))
        .slice()
        .sort((a, b) => b[prop] - a[prop]);

      const rankMap = new Map();
      let lastVal = null;
      let lastRank = 0;
      valid.forEach((e, idx) => {
        if (e[prop] !== lastVal) {
          lastRank = idx + 1;
          lastVal = e[prop];
        }
        rankMap.set(e.number, lastRank);
      });

      const maxEl = valid[0] || null;
      const minEl = valid[valid.length - 1] || null;
      out[prop] = {
        total: valid.length,
        min: meta.min,
        max: meta.max,
        minSym: minEl ? minEl.symbol : '',
        maxSym: maxEl ? maxEl.symbol : '',
        isLog: meta.isLog,
        logMin: meta.logMin,
        logMax: meta.logMax,
        hVal: hEl && hEl[prop] !== null && hEl[prop] !== undefined ? hEl[prop] : null,
        rankMap
      };
    });
    return out;
  })();

  function ensureRadiusPopover() {
    if (!radiusPopover) {
      radiusPopover = document.createElement('div');
      radiusPopover.id = 'radius-popover';
      radiusPopover.className = 'radius-popover hidden';
      radiusPopover.setAttribute('role', 'status');
      radiusPopover.setAttribute('aria-live', 'polite');
      document.body.appendChild(radiusPopover);
    }
    return radiusPopover;
  }

  function cancelRadiusHide() {
    if (radiusHideTimer !== null) {
      clearTimeout(radiusHideTimer);
      radiusHideTimer = null;
    }
  }

  function scheduleRadiusHide() {
    cancelRadiusHide();
    radiusHideTimer = setTimeout(() => {
      radiusHideTimer = null;
      syncRadiusPopover();
    }, 45);
  }

  function buildRadiusVisualSVG(el, accentColor) {
    const cx = 48;
    const cy = 44;
    const maxVisualR = 38;
    const dict = t();
    const st = TREND_STATS.radius;

    if (el.radius === null || el.radius === undefined) {
      return `
        <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
          <circle cx="${cx}" cy="${cy}" r="${maxVisualR}" fill="none" stroke="rgba(148, 163, 184, 0.24)" stroke-width="1" stroke-dasharray="2.5 2.5" />
          <circle cx="${cx}" cy="${cy}" r="16" fill="rgba(148, 163, 184, 0.08)" stroke="rgba(148, 163, 184, 0.35)" stroke-width="1.2" stroke-dasharray="3 2.5" />
          <text x="${cx}" y="${cy + 5}" text-anchor="middle" class="rp-svg-q">?</text>
          <text x="${cx}" y="94" text-anchor="middle" class="rp-svg-ref">${dict.radiusRefMax}</text>
        </svg>
      `;
    }

    const scaledR = Math.max(3.5, (el.radius / st.max) * maxVisualR);
    const hVisualR = ((st.hVal || 53) / st.max) * maxVisualR;
    const showHRef = el.number !== 1 && el.radius > 75;
    const showRLabel = scaledR >= 13;
    const lineEndX = (cx + scaledR).toFixed(2);
    const labelX = (cx + scaledR * 0.5).toFixed(2);

    return `
      <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
        <circle cx="${cx}" cy="${cy}" r="${maxVisualR}" fill="none" stroke="rgba(148, 163, 184, 0.26)" stroke-width="1" stroke-dasharray="2.5 2.5" />
        <circle cx="${cx}" cy="${cy}" r="${scaledR.toFixed(2)}" fill="${accentColor}" fill-opacity="0.22" stroke="${accentColor}" stroke-width="1.6" />
        ${
          showHRef
            ? `<circle cx="${cx}" cy="${cy}" r="${hVisualR.toFixed(2)}" fill="none" stroke="rgba(226, 232, 240, 0.38)" stroke-width="0.9" stroke-dasharray="1.8 1.8" />`
            : ''
        }
        <line x1="${cx}" y1="${cy}" x2="${lineEndX}" y2="${cy}" stroke="#edf1f7" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="${cx}" cy="${cy}" r="1.9" fill="#f59e0b" />
        <circle cx="${lineEndX}" cy="${cy}" r="1.5" fill="#edf1f7" />
        ${showRLabel ? `<text x="${labelX}" y="${cy - 4}" text-anchor="middle" class="rp-svg-r">r</text>` : ''}
        <text x="${cx}" y="94" text-anchor="middle" class="rp-svg-ref">${dict.radiusRefMax}</text>
      </svg>
    `;
  }

  function buildEnegVisualSVG(el, accentColor, norm) {
    const dict = t();
    if (el.electronegativity === null || el.electronegativity === undefined) {
      return `
        <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
          <circle cx="48" cy="44" r="24" fill="rgba(148, 163, 184, 0.07)" stroke="rgba(148, 163, 184, 0.32)" stroke-width="1.2" stroke-dasharray="3 2.5" />
          <text x="48" y="49" text-anchor="middle" class="rp-svg-q">?</text>
          <text x="48" y="94" text-anchor="middle" class="rp-svg-ref">${dict.enegRefMax}</text>
        </svg>
      `;
    }

    const ax = 24;
    const bx = 77;
    const cy = 46;
    const eX = (65 - norm * 24).toFixed(1);
    let pullCue = '';

    if (norm >= 0.52) {
      // Strong pull toward left atom (δ-)
      pullCue = `
        <text x="${ax}" y="22" text-anchor="middle" class="rp-svg-delta" fill="${accentColor}">δ−</text>
        <line x1="63" y1="19" x2="41" y2="19" stroke="${accentColor}" stroke-width="1.3" stroke-linecap="round" />
        <polyline points="45,15.5 40.5,19 45,22.5" fill="none" stroke="${accentColor}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
      `;
    } else if (norm <= 0.3) {
      // Weak pull / electron donor (δ+)
      pullCue = `
        <text x="${ax}" y="22" text-anchor="middle" class="rp-svg-delta" fill="#94a3b8">δ+</text>
        <line x1="41" y1="19" x2="63" y2="19" stroke="#64748b" stroke-width="1.2" stroke-dasharray="2.5 2" stroke-linecap="round" />
        <polyline points="59,15.5 63.5,19 59,22.5" fill="none" stroke="#64748b" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
      `;
    } else {
      // Moderate / balanced pull
      pullCue = `
        <line x1="43" y1="19" x2="61" y2="19" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" />
        <polyline points="46,16 42.5,19 46,22" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="58,16 61.5,19 58,22" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
      `;
    }

    return `
      <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
        ${pullCue}
        <line x1="${ax + 13}" y1="${cy}" x2="${bx - 9}" y2="${cy}" stroke="rgba(148, 163, 184, 0.28)" stroke-width="1.2" stroke-dasharray="2.5 2.5" />
        <ellipse cx="${eX}" cy="${cy}" rx="9.5" ry="15" fill="${accentColor}" fill-opacity="0.18" />
        <circle cx="${ax}" cy="${cy}" r="13" fill="${accentColor}" fill-opacity="0.24" stroke="${accentColor}" stroke-width="1.5" />
        <text x="${ax}" y="${cy + 3.8}" text-anchor="middle" class="rp-svg-sym">${el.symbol}</text>
        <circle cx="${bx}" cy="${cy}" r="8.5" fill="none" stroke="rgba(148, 163, 184, 0.34)" stroke-width="1.1" stroke-dasharray="2.5 2" />
        <circle cx="${eX}" cy="${cy}" r="3.4" fill="#f59e0b" stroke="#161922" stroke-width="1" />
        <text x="${eX}" y="71" text-anchor="middle" class="rp-svg-sub" fill="#f59e0b">e⁻</text>
        <text x="48" y="94" text-anchor="middle" class="rp-svg-ref">${dict.enegRefMax}</text>
      </svg>
    `;
  }

  function buildIonizationVisualSVG(el, accentColor) {
    const dict = t();
    const st = TREND_STATS.ionization;

    if (el.ionization === null || el.ionization === undefined) {
      return `
        <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
          <rect x="33" y="20" width="30" height="56" rx="3" fill="rgba(148, 163, 184, 0.07)" stroke="rgba(148, 163, 184, 0.3)" stroke-width="1.2" stroke-dasharray="3 2.5" />
          <text x="48" y="53" text-anchor="middle" class="rp-svg-q">?</text>
          <text x="48" y="94" text-anchor="middle" class="rp-svg-ref">${dict.ionRefMax}</text>
        </svg>
      `;
    }

    const baseY = 78;
    const maxH = 60;
    const barH = Math.max(7, (el.ionization / st.max) * maxH);
    const topY = baseY - barH;
    const hLineY = (baseY - ((st.hVal || 1312) / st.max) * maxH).toFixed(1);

    return `
      <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
        <!-- Ceiling reference: He (2372 kJ/mol) -->
        <line x1="12" y1="${baseY - maxH}" x2="84" y2="${baseY - maxH}" stroke="rgba(148, 163, 184, 0.28)" stroke-width="1" stroke-dasharray="2.5 2.5" />
        <!-- Hydrogen reference tick (1312 kJ/mol) -->
        <line x1="12" y1="${hLineY}" x2="27" y2="${hLineY}" stroke="rgba(226, 232, 240, 0.34)" stroke-width="0.9" stroke-dasharray="2 2" />
        <text x="16" y="${(Number(hLineY) - 2.5).toFixed(1)}" text-anchor="middle" class="rp-svg-ref">H</text>
        <!-- Energy climb column -->
        <rect x="34" y="${topY.toFixed(1)}" width="28" height="${barH.toFixed(1)}" rx="2.5" fill="${accentColor}" fill-opacity="0.24" stroke="${accentColor}" stroke-width="1.5" />
        <!-- Base floor -->
        <line x1="12" y1="${baseY}" x2="84" y2="${baseY}" stroke="rgba(148, 163, 184, 0.34)" stroke-width="1.1" />
        <!-- Upward escape vector -->
        <line x1="71" y1="${baseY - 1}" x2="71" y2="${(topY + 1).toFixed(1)}" stroke="#cbd5e1" stroke-width="1.15" stroke-linecap="round" />
        <polyline points="68,${(topY + 4.5).toFixed(1)} 71,${(topY + 0.5).toFixed(1)} 74,${(topY + 4.5).toFixed(1)}" fill="none" stroke="#cbd5e1" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Escaping electron at crest -->
        <circle cx="48" cy="${topY.toFixed(1)}" r="3.4" fill="#f59e0b" stroke="#161922" stroke-width="1" />
        <text x="48" y="94" text-anchor="middle" class="rp-svg-ref">${dict.ionRefMax}</text>
      </svg>
    `;
  }

  function buildDensityVisualSVG(el, accentColor) {
    const dict = t();
    if (el.density === null || el.density === undefined || el.density <= 0) {
      return `
        <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
          <rect x="20" y="13" width="56" height="56" rx="4" fill="rgba(148, 163, 184, 0.06)" stroke="rgba(148, 163, 184, 0.32)" stroke-width="1.2" stroke-dasharray="3 2.5" />
          <text x="48" y="46" text-anchor="middle" class="rp-svg-q">?</text>
          <text x="48" y="94" text-anchor="middle" class="rp-svg-ref">${dict.denRefMax}</text>
        </svg>
      `;
    }

    const d = el.density;
    const boxX = 20;
    const boxY = 11;
    const boxS = 56;
    const dots = [];

    if (d < 0.01) {
      const coords =
        d < 0.0005
          ? [[36, 31], [59, 49]]
          : [[33, 25], [61, 27], [43, 45], [60, 55]];
      coords.forEach(([x, y]) => {
        dots.push(`<circle cx="${x}" cy="${y}" r="2.2" fill="${accentColor}" fill-opacity="0.88" />`);
      });
    } else {
      let gridN = 3;
      let dotR = 2.6;
      if (d >= 20) {
        gridN = 7;
        dotR = 2.15;
      } else if (d >= 11) {
        gridN = 6;
        dotR = 2.35;
      } else if (d >= 4.5) {
        gridN = 5;
        dotR = 2.5;
      } else if (d >= 1.0) {
        gridN = 4;
        dotR = 2.6;
      }
      const pad = 7;
      const span = boxS - pad * 2;
      const step = gridN > 1 ? span / (gridN - 1) : 0;
      for (let r = 0; r < gridN; r++) {
        for (let c = 0; c < gridN; c++) {
          const x = (boxX + pad + c * step).toFixed(1);
          const y = (boxY + pad + r * step).toFixed(1);
          dots.push(`<circle cx="${x}" cy="${y}" r="${dotR}" fill="${accentColor}" fill-opacity="0.88" />`);
        }
      }
    }

    return `
      <svg class="rp-svg" viewBox="0 0 96 98" aria-hidden="true">
        <rect x="${boxX}" y="${boxY}" width="${boxS}" height="${boxS}" rx="4" fill="${accentColor}" fill-opacity="0.12" stroke="${accentColor}" stroke-width="1.4" />
        ${dots.join('')}
        <text x="48" y="80" text-anchor="middle" class="rp-svg-sub" fill="#94a3b8">1 cm³</text>
        <text x="48" y="94" text-anchor="middle" class="rp-svg-ref">${dict.denRefMax}</text>
      </svg>
    `;
  }

  function buildTrendPopoverModel(mode, el, accentColor, norm) {
    const dict = t();
    const st = TREND_STATS[mode];
    const meta = HEATMAP_META[mode];
    const raw = el[mode];
    const hasVal = raw !== null && raw !== undefined && (!meta.isLog || raw > 0);
    const rank = hasVal ? st.rankMap.get(el.number) : null;

    if (mode === 'radius') {
      const svg = buildRadiusVisualSVG(el, accentColor);
      if (!hasVal) return { hasVal: false, svg, noData: dict.radiusNoData };
      return {
        hasVal: true,
        svg,
        valText: String(raw),
        unitText: 'pm',
        stats: [
          [dict.radiusAngstrom, `${(raw / 100).toFixed(2)} Å`],
          [dict.radiusVsH, `${(raw / (st.hVal || 53)).toFixed(2)}×`],
          [dict.radiusOfMax, `${Math.round((raw / st.max) * 100)}%`],
          [dict.radiusRank, `#${rank} / ${st.total}`]
        ],
        minLabel: `${st.min} pm (${st.minSym})`,
        maxLabel: `${st.max} pm (${st.maxSym})`
      };
    }

    if (mode === 'electronegativity') {
      const svg = buildEnegVisualSVG(el, accentColor, norm);
      if (!hasVal) return { hasVal: false, svg, noData: dict.enegNoData };
      const strength =
        raw >= 3.0
          ? dict.enegStrengths.vhigh
          : raw >= 2.2
          ? dict.enegStrengths.high
          : raw >= 1.5
          ? dict.enegStrengths.mod
          : dict.enegStrengths.low;
      const diffH = raw - (st.hVal || 2.2);
      const diffHStr = `${diffH > 0 ? '+' : diffH < 0 ? '−' : ''}${Math.abs(diffH).toFixed(2)}`;
      return {
        hasVal: true,
        svg,
        valText: raw.toFixed(2),
        unitText: 'χ',
        stats: [
          [dict.enegStrengthLbl, strength],
          [dict.enegVsH, diffHStr],
          [dict.enegOfMax, `${Math.round((raw / st.max) * 100)}%`],
          [dict.enegRank, `#${rank} / ${st.total}`]
        ],
        minLabel: `${st.min.toFixed(2)} (${st.minSym})`,
        maxLabel: `${st.max.toFixed(2)} (${st.maxSym})`
      };
    }

    if (mode === 'ionization') {
      const svg = buildIonizationVisualSVG(el, accentColor);
      if (!hasVal) return { hasVal: false, svg, noData: dict.ionNoData };
      const ease =
        raw >= 1400
          ? dict.ionEases.vhard
          : raw >= 900
          ? dict.ionEases.hard
          : raw >= 600
          ? dict.ionEases.mod
          : dict.ionEases.easy;
      return {
        hasVal: true,
        svg,
        valText: String(Math.round(raw)),
        unitText: 'kJ/mol',
        stats: [
          [dict.ionEvLbl, `${(raw / 96.485).toFixed(2)} eV`],
          [dict.ionEaseLbl, ease],
          [dict.ionOfMax, `${Math.round((raw / st.max) * 100)}%`],
          [dict.ionRank, `#${rank} / ${st.total}`]
        ],
        minLabel: `${st.min} (${st.minSym})`,
        maxLabel: `${st.max} (${st.maxSym})`
      };
    }

    // density (log10 scale)
    const svg = buildDensityVisualSVG(el, accentColor);
    if (!hasVal) return { hasVal: false, svg, noData: dict.denNoData };
    const vsWater = raw >= 1 ? `${raw.toFixed(1)}×` : raw >= 0.01 ? `${raw.toFixed(2)}×` : '< 0.01×';
    const waterState =
      el.phase === 'Khí'
        ? dict.denWaterStates.gas
        : raw < 1.0
        ? dict.denWaterStates.floats
        : dict.denWaterStates.sinks;
    const mass1cm3 =
      raw >= 1
        ? `${raw.toFixed(2)} g`
        : raw >= 0.01
        ? `${Math.round(raw * 1000)} mg`
        : `${(raw * 1000).toFixed(2)} mg`;

    return {
      hasVal: true,
      svg,
      valText: formatDensityCell(raw),
      unitText: 'g/cm³',
      stats: [
        [dict.denVsWater, vsWater],
        [dict.denInWater, waterState],
        [dict.denMass1cm3, mass1cm3],
        [dict.denRank, `#${rank} / ${st.total}`]
      ],
      minLabel: `${formatDensityCell(st.min)} (${st.minSym})`,
      maxLabel: `${st.max.toFixed(1)} (${st.maxSym})`
    };
  }

  function positionRadiusPopover(cell) {
    if (!cell || !radiusPopover || radiusPopover.classList.contains('hidden')) return;

    const rect = cell.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Hide if target cell is scrolled out of the visible viewport
    if (rect.width === 0 || rect.bottom < 0 || rect.top > vh || rect.right < 0 || rect.left > vw) {
      radiusPopover.style.visibility = 'hidden';
      return;
    }
    radiusPopover.style.visibility = 'visible';

    const margin = 10;
    const gap = 15;
    const popRect = radiusPopover.getBoundingClientRect();
    const popW = popRect.width || 262;
    const popH = popRect.height || 178;

    let side = 'right';
    let left = rect.right + gap;
    if (left + popW > vw - margin) {
      const leftCandidate = rect.left - popW - gap;
      if (leftCandidate >= margin) {
        side = 'left';
        left = leftCandidate;
      } else {
        side = 'none';
        left = Math.max(margin, Math.min(vw - popW - margin, rect.left + rect.width * 0.5 - popW * 0.5));
      }
    }

    const cellMidY = rect.top + rect.height * 0.5;
    let top = cellMidY - popH * 0.5;
    top = Math.max(margin, Math.min(vh - popH - margin, top));
    const arrowY = Math.max(18, Math.min(popH - 18, cellMidY - top));

    radiusPopover.classList.toggle('side-right', side === 'right');
    radiusPopover.classList.toggle('side-left', side === 'left');
    radiusPopover.style.left = `${Math.round(left)}px`;
    radiusPopover.style.top = `${Math.round(top)}px`;
    radiusPopover.style.setProperty('--rp-arrow-y', `${Math.round(arrowY)}px`);
  }

  function getActiveRadiusTarget() {
    if (isMobileExperience()) return null;
    if (!HEATMAP_PROPS.includes(state.viewMode)) return null;
    const labOpen = Boolean(window.BondingLab && window.BondingLab.isOpen());
    const toolsOpen = Boolean(window.ChemTools && window.ChemTools.isOpen());
    if (state.modalElement || labOpen || toolsOpen || state.atomExpanded) return null;
    return hoveredEl || state.locked || null;
  }

  function syncRadiusPopover(forceRender = false) {
    const targetEl = getActiveRadiusTarget();
    if (!targetEl) {
      if (radiusPopover) {
        radiusPopover.classList.add('hidden');
      }
      radiusPopoverKey = null;
      return;
    }

    const cell = cellMap.get(targetEl.number);
    if (!cell) return;

    const mode = state.viewMode;
    const pop = ensureRadiusPopover();
    const isEn = state.lang === 'en';
    const displayName = isEn ? targetEl.enName : targetEl.name;
    const nextKey = `${mode}:${targetEl.number}:${state.lang}`;

    if (forceRender || radiusPopoverKey !== nextKey) {
      const meta = HEATMAP_META[mode];
      const raw = targetEl[mode];
      const hasVal = raw !== null && raw !== undefined && (!meta.isLog || raw > 0);
      let accentColor = '#94a3b8';
      let norm = 0;

      if (hasVal) {
        norm = meta.isLog
          ? (Math.log10(raw) - meta.logMin) / (meta.logMax - meta.logMin || 1)
          : (raw - meta.min) / (meta.max - meta.min || 1);
        norm = Math.max(0, Math.min(1, norm));
        accentColor = getHeatmapColors(norm).borderHover;
      }

      pop.style.setProperty('--rp-accent', accentColor);
      const model = buildTrendPopoverModel(mode, targetEl, accentColor, norm);

      if (model.hasVal) {
        const pctPos = norm * 100;
        const statsHtml = model.stats
          .map(
            ([lbl, val]) => `
              <div class="rp-stat">
                <span class="rp-stat-lbl">${lbl}</span>
                <span class="rp-stat-val">${val}</span>
              </div>
            `
          )
          .join('');

        pop.innerHTML = `
          <div class="rp-header">
            <div class="rp-id">
              <span class="rp-z">${targetEl.number}</span>
              <span class="rp-sym">${targetEl.symbol}</span>
              <span class="rp-name">${displayName}</span>
            </div>
            <div class="rp-val">
              <strong>${model.valText}</strong><span>${model.unitText}</span>
            </div>
          </div>
          <div class="rp-body">
            <div class="rp-visual">${model.svg}</div>
            <div class="rp-stats">${statsHtml}</div>
          </div>
          <div class="rp-bar-wrap">
            <div class="rp-bar-track">
              <span class="rp-bar-pin" style="left: ${pctPos.toFixed(1)}%"></span>
            </div>
            <div class="rp-bar-labels">
              <span>${model.minLabel}</span>
              <span>${model.maxLabel}</span>
            </div>
          </div>
        `;
      } else {
        pop.innerHTML = `
          <div class="rp-header">
            <div class="rp-id">
              <span class="rp-z">${targetEl.number}</span>
              <span class="rp-sym">${targetEl.symbol}</span>
              <span class="rp-name">${displayName}</span>
            </div>
            <div class="rp-val rp-val-null">
              <strong>—</strong>
            </div>
          </div>
          <div class="rp-body">
            <div class="rp-visual">${model.svg}</div>
            <p class="rp-null-note">${model.noData}</p>
          </div>
        `;
      }

      radiusPopoverKey = nextKey;
    }

    pop.classList.remove('hidden');
    positionRadiusPopover(cell);
  }

  // =========================================================================
  // ORBITAL BOX DIAGRAM POPOVER (Valence Subshells + Hund's Rule)
  // =========================================================================
  const ORBITAL_BOX_COUNT = { s: 1, p: 3, d: 5, f: 7 };
  const ORBITAL_L_INDEX = { s: 0, p: 1, d: 2, f: 3 };

  function getValenceSubshells(el) {
    if (!el || !Array.isArray(el.subshells) || el.subshells.length === 0) return [];
    const period = el.period;
    // Exclude closed noble-gas core subshells preceding (period)s in Madelung/Aufbau order
    const outer = el.subshells.filter((s) => {
      const lVal = ORBITAL_L_INDEX[s.l] ?? 0;
      const sum = s.n + lVal;
      return !(sum < period || (sum === period && s.n < period));
    });
    if (outer.length === 0) return el.subshells.slice(-1);

    // Keep outermost principal shell (n === period), any partially filled subshell,
    // and the element's defining block subshell (e.g. 3d10 for Cu/Zn, 4d10 for Pd, 4f14 for Yb)
    const valence = outer.filter((s) => {
      const maxE = (ORBITAL_BOX_COUNT[s.l] || 1) * 2;
      return s.n === period || s.count < maxE || s.l === el.block;
    });
    return valence.length > 0 ? valence : outer;
  }

  function countUnpairedElectrons(el) {
    if (!el || !Array.isArray(el.subshells)) return 0;
    return el.subshells.reduce((sum, s) => {
      const boxes = ORBITAL_BOX_COUNT[s.l] || 1;
      const unpaired = s.count <= boxes ? s.count : Math.max(0, boxes * 2 - s.count);
      return sum + unpaired;
    }, 0);
  }

  function buildSubshellBoxesHTML(sub, dict) {
    const boxes = ORBITAL_BOX_COUNT[sub.l] || 1;
    const pairedCount = Math.max(0, sub.count - boxes);
    const items = [];

    for (let i = 0; i < boxes; i++) {
      let cls = 'is-empty';
      let tip = dict.orbitalBoxEmpty;
      let inner =
        '<span class="orb-arrow ghost" aria-hidden="true">↑</span><span class="orb-arrow ghost" aria-hidden="true">↓</span>';
      if (i < pairedCount) {
        cls = 'is-paired';
        tip = dict.orbitalBoxPaired;
        inner = '<span class="orb-arrow up">↑</span><span class="orb-arrow down">↓</span>';
      } else if (i < sub.count) {
        cls = 'is-single';
        tip = dict.orbitalBoxSingle;
        inner = '<span class="orb-arrow up">↑</span><span class="orb-arrow ghost" aria-hidden="true">↓</span>';
      }
      items.push(`<span class="orb-box ${cls}" title="${sub.n}${sub.l}: ${tip}">${inner}</span>`);
    }

    return `
      <div class="orb-group sub-${sub.l}">
        <div class="orb-boxes" aria-label="${sub.n}${sub.l}${sub.count}">${items.join('')}</div>
        <span class="orb-sublabel">${sub.n}${sub.l}<sup>${sub.count}</sup></span>
      </div>
    `;
  }

  function ensureOrbitalPopover() {
    if (!orbitalPopover) {
      orbitalPopover = document.createElement('div');
      orbitalPopover.id = 'orbital-popover';
      orbitalPopover.className = 'orbital-popover hidden';
      orbitalPopover.setAttribute('role', 'dialog');
      orbitalPopover.setAttribute('aria-modal', 'false');
      orbitalPopover.addEventListener('click', (e) => {
        if (e.target.closest('.orb-close-btn')) {
          closeOrbitalPopover();
        }
      });
      document.body.appendChild(orbitalPopover);
    }
    return orbitalPopover;
  }

  function positionOrbitalPopover() {
    if (!orbitalPopover || !state.orbitalOpen || !econfigBar) return;
    const barRect = econfigBar.getBoundingClientRect();
    if (barRect.width === 0 || barRect.height === 0) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 10;
    const gap = 7;

    const popRect = orbitalPopover.getBoundingClientRect();
    const popW = popRect.width || 320;
    const popH = popRect.height || 132;

    let left = barRect.left + (barRect.width - popW) * 0.5;
    left = Math.max(margin, Math.min(vw - popW - margin, left));

    let top = barRect.bottom + gap;
    let placedAbove = false;
    if (top + popH > vh - margin && barRect.top - popH - gap >= margin) {
      top = barRect.top - popH - gap;
      placedAbove = true;
    } else {
      top = Math.max(margin, Math.min(vh - popH - margin, top));
    }

    const barCenterX = barRect.left + barRect.width * 0.5;
    const arrowX = Math.max(18, Math.min(popW - 18, barCenterX - left));

    orbitalPopover.classList.toggle('is-above', placedAbove);
    orbitalPopover.style.left = `${Math.round(left)}px`;
    orbitalPopover.style.top = `${Math.round(top)}px`;
    orbitalPopover.style.setProperty('--orb-arrow-x', `${Math.round(arrowX)}px`);
  }

  function formatShorthandSubshellsHTML(configStr) {
    return String(configStr || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((tok) => {
        if (/^\[[A-Za-z]+\]$/.test(tok)) {
          return `<span class="sub-core">${tok}</span>`;
        }
        const m = tok.match(/^(\d+)([spdf])(\d+)$/);
        if (m) {
          return `<span class="sub-token sub-${m[2]}">${m[1]}${m[2]}<sup>${m[3]}</sup></span>`;
        }
        return window.formatElectronConfigHTML(tok);
      })
      .join(' ');
  }

  function renderOrbitalPopover(el) {
    if (!el) return;
    const pop = ensureOrbitalPopover();
    const dict = t();
    const valence = getValenceSubshells(el);
    const unpaired = countUnpairedElectrons(el);
    const groupsHtml = valence.map((sub) => buildSubshellBoxesHTML(sub, dict)).join('');
    const configHtml = window.formatElectronConfigHTML(el.config);
    const fullConfigHtml = window.formatSubshellsHTML(el.subshells);
    const pairedNote =
      unpaired === 0 ? `<span class="orb-paired-note">• ${dict.orbitalAllPaired}</span>` : '';

    pop.setAttribute('aria-label', `${dict.orbitalTitle} — ${el.symbol}`);
    pop.innerHTML = `
      <div class="orb-header">
        <div class="orb-title-wrap">
          <span class="orb-title">${dict.orbitalTitle}</span>
          <span class="orb-el-meta">${el.symbol} · <span class="mono">${configHtml}</span></span>
        </div>
        <button type="button" class="orb-close-btn" title="${dict.orbitalClose}" aria-label="${dict.orbitalClose}">✕</button>
      </div>
      <div class="orb-full-config">
        <span class="orb-full-label">${dict.orbitalFullConfig}</span>
        <div class="orb-full-val mono">${fullConfigHtml}</div>
      </div>
      <div class="orb-groups">${groupsHtml}</div>
      <div class="orb-footer">
        <div class="orb-unpaired-pill ${unpaired > 0 ? 'has-unpaired' : 'is-zero'}">
          <span class="orb-unpaired-dot" aria-hidden="true"></span>
          <span class="orb-unpaired-lbl">${dict.orbitalUnpaired}:</span>
          <strong class="orb-unpaired-val">${unpaired}</strong>
          ${pairedNote}
        </div>
        <span class="orb-rule-note">${dict.orbitalHundNote}</span>
      </div>
    `;
  }

  function openOrbitalPopover() {
    if (!state.displayed || !econfigBar) return;
    state.orbitalOpen = true;
    renderOrbitalPopover(state.displayed);
    orbitalPopover.classList.remove('hidden');
    econfigBar.classList.add('is-open');
    econfigBar.setAttribute('aria-expanded', 'true');
    positionOrbitalPopover();
  }

  function closeOrbitalPopover() {
    if (!state.orbitalOpen) return;
    state.orbitalOpen = false;
    if (orbitalPopover) {
      orbitalPopover.classList.add('hidden');
    }
    if (econfigBar) {
      econfigBar.classList.remove('is-open');
      econfigBar.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleOrbitalPopover() {
    if (state.orbitalOpen) {
      closeOrbitalPopover();
    } else {
      openOrbitalPopover();
    }
  }

  // Temperature physical state calculation (handles sublimation such as Arsenic: melt 817, boil 614,
  // and elements with known meltC but unknown boilC such as Fm, Md, No, Lr)
  function getElementTempState(el, tempC) {
    const melt = el.meltC;
    const boil = el.boilC;
    if (melt === null && boil === null) return 'unknown';
    if (boil !== null && tempC >= boil) return 'gas';
    if (melt !== null && tempC >= melt) {
      return boil === null ? 'unknown' : 'liquid';
    }
    if (melt !== null && tempC < melt) return 'solid';
    return 'unknown';
  }

  function getTempStateLabel(tempState) {
    const dict = t();
    if (tempState === 'solid') return dict.stateSolid;
    if (tempState === 'liquid') return dict.stateLiquid;
    if (tempState === 'gas') return dict.stateGas;
    return dict.unknown;
  }

  function updateTemperatureView() {
    const tempC = state.temperatureC;
    const tempK = tempC + 273;
    const dict = t();
    const isEn = state.lang === 'en';

    tempValC.textContent = `${tempC}°C`;
    tempValK.textContent = `${tempK} K`;
    tempSlider.value = String(tempC);

    tempPresets.querySelectorAll('.temp-preset-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.temp) === tempC);
    });

    let solid = 0;
    let liquid = 0;
    let gas = 0;
    let unknown = 0;

    window.ELEMENTS.forEach((el) => {
      const cell = cellMap.get(el.number);
      if (!cell) return;

      const st = getElementTempState(el, tempC);
      if (st === 'solid') solid++;
      else if (st === 'liquid') liquid++;
      else if (st === 'gas') gas++;
      else unknown++;

      if (cell.dataset.tempState !== st) {
        cell.dataset.tempState = st;
      }

      const tagEl = cell.querySelector('.cell-state-tag');
      if (tagEl) {
        tagEl.textContent = dict.stateTags[st] || '?';
      }

      const displayName = isEn ? el.enName : el.name;
      cell.title = `${displayName} (${el.symbol}) — ${getTempStateLabel(st)} (${tempC}°C / ${tempK} K)`;
    });

    countSolid.textContent = String(solid);
    countLiquid.textContent = String(liquid);
    countGas.textContent = String(gas);
    countUnknown.textContent = String(unknown);

    if (state.displayed) {
      renderInspectorFields(state.displayed);
    }
  }

  function updateHeatmapView(prop) {
    const meta = HEATMAP_META[prop];
    if (!meta) return;
    const dict = t();
    const isEn = state.lang === 'en';

    heatmapTitle.textContent = dict.heatmapTitles[prop] || prop;
    heatmapLogBadge.classList.toggle('hidden', !meta.isLog);
    heatmapMin.textContent = meta.formatBound(meta.min);
    heatmapMax.textContent = meta.formatBound(meta.max);
    heatmapUnit.textContent = meta.unit;

    window.ELEMENTS.forEach((el) => {
      const cell = cellMap.get(el.number);
      if (!cell) return;

      const massEl = cell.querySelector('.cell-mass');
      const raw = el[prop];
      const displayName = isEn ? el.enName : el.name;

      if (raw === null || raw === undefined || (meta.isLog && raw <= 0)) {
        cell.classList.add('is-heat-null');
        cell.style.removeProperty('--heat-bg');
        cell.style.removeProperty('--heat-bg-hover');
        cell.style.removeProperty('--heat-border');
        cell.style.removeProperty('--heat-border-hover');
        cell.style.removeProperty('--heat-glow');
        if (massEl) massEl.textContent = '—';
        cell.removeAttribute('title');
      } else {
        cell.classList.remove('is-heat-null');
        let norm;
        if (meta.isLog) {
          norm = (Math.log10(raw) - meta.logMin) / (meta.logMax - meta.logMin || 1);
        } else {
          norm = (raw - meta.min) / (meta.max - meta.min || 1);
        }
        const colors = getHeatmapColors(norm);
        cell.style.setProperty('--heat-bg', colors.bg);
        cell.style.setProperty('--heat-bg-hover', colors.bgHover);
        cell.style.setProperty('--heat-border', colors.border);
        cell.style.setProperty('--heat-border-hover', colors.borderHover);
        cell.style.setProperty('--heat-glow', colors.glow);
        if (massEl) massEl.textContent = meta.formatCell(raw);
        cell.removeAttribute('title');
      }
    });
  }

  function restoreDefaultCells() {
    window.ELEMENTS.forEach((el) => {
      const cell = cellMap.get(el.number);
      if (!cell) return;
      cell.classList.remove('is-heat-null');
      cell.removeAttribute('data-temp-state');
      cell.removeAttribute('title');
      cell.style.removeProperty('--heat-bg');
      cell.style.removeProperty('--heat-bg-hover');
      cell.style.removeProperty('--heat-border');
      cell.style.removeProperty('--heat-border-hover');
      cell.style.removeProperty('--heat-glow');
      const massEl = cell.querySelector('.cell-mass');
      if (massEl && cell.dataset.compactMass) {
        massEl.textContent = cell.dataset.compactMass;
      }
    });
  }

  function applyViewMode() {
    const mode = state.viewMode;
    const isDefault = mode === 'default';
    const isTemp = mode === 'temperature';
    const isHeat = HEATMAP_PROPS.includes(mode);

    if (viewModeSelect && viewModeSelect.value !== mode) {
      viewModeSelect.value = mode;
    }

    elGrid.classList.toggle('mode-temperature', isTemp);
    elGrid.classList.toggle('mode-heatmap', isHeat);

    // Swap legend-bar controls without expanding vertical space
    macroFilters.classList.toggle('hidden', !isDefault);
    subLegend.classList.toggle('hidden', !isDefault);
    tempControls.classList.toggle('hidden', !isTemp);
    heatmapControls.classList.toggle('hidden', !isHeat);

    if (isDefault) {
      restoreDefaultCells();
    } else if (isTemp) {
      hideCategoryTooltip();
      state.activeCategory = null;
      state.activeMacro = 'all';
      state.hoverCategory = null;
      state.hoverMacro = null;
      syncMacroFilterButtons();
      syncSubLegendButtons();
      restoreDefaultCells();
      updateTemperatureView();
    } else if (isHeat) {
      hideCategoryTooltip();
      state.activeCategory = null;
      state.activeMacro = 'all';
      state.hoverCategory = null;
      state.hoverMacro = null;
      syncMacroFilterButtons();
      syncSubLegendButtons();
      updateHeatmapView(mode);
    }

    applyFiltering();
    if (state.displayed) {
      renderInspectorFields(state.displayed);
    }
    syncRadiusPopover(true);
  }

  // Floating Element Group Hover Tooltip (appears smoothly above hovered group pill)
  let categoryTooltip = null;
  let categoryTooltipAnchor = null;

  function ensureCategoryTooltip() {
    if (!categoryTooltip) {
      categoryTooltip = document.createElement('div');
      categoryTooltip.id = 'category-tooltip';
      categoryTooltip.className = 'category-tooltip';
      categoryTooltip.setAttribute('role', 'tooltip');
      categoryTooltip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(categoryTooltip);
    }
    return categoryTooltip;
  }

  function getCategoryTooltipAccent(key) {
    if (key === 'metal') return '#b45309';
    const meta = window.ELEMENT_CATEGORIES[key];
    return meta ? meta.color : '#94a3b8';
  }

  function positionCategoryTooltip(anchorEl) {
    if (!categoryTooltip || !anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 10;
    const gap = 9;

    // Measure unconstrained width/height (avoid right-edge viewport clamping during layout)
    categoryTooltip.style.left = '0px';
    categoryTooltip.style.top = '0px';
    const tipW = categoryTooltip.offsetWidth || 260;
    const tipH = categoryTooltip.offsetHeight || 96;

    const anchorCenterX = rect.left + rect.width * 0.5;
    let left = anchorCenterX - tipW * 0.5;
    left = Math.max(margin, Math.min(vw - tipW - margin, left));

    let top = rect.top - tipH - gap;
    let placedBelow = false;
    if (top < margin && rect.bottom + tipH + gap <= vh - margin) {
      top = rect.bottom + gap;
      placedBelow = true;
    } else {
      top = Math.max(margin, top);
    }

    const arrowX = Math.max(16, Math.min(tipW - 16, anchorCenterX - left));

    categoryTooltip.classList.toggle('is-below', placedBelow);
    categoryTooltip.style.left = `${Math.round(left)}px`;
    categoryTooltip.style.top = `${Math.round(top)}px`;
    categoryTooltip.style.setProperty('--cat-arrow-x', `${Math.round(arrowX)}px`);
  }

  function showCategoryTooltip(key, anchorEl) {
    if (!anchorEl || isMobileExperience()) return;
    const dict = t();
    const tipData = dict.groupTips && dict.groupTips[key];
    if (!tipData) return;

    const tip = ensureCategoryTooltip();
    const prevKey = tip.dataset.activeKey || '';
    const isSwitchingGroup = Boolean(prevKey && prevKey !== key);

    tip.dataset.activeKey = key;
    categoryTooltipAnchor = anchorEl;

    tip.style.setProperty('--cat-accent', getCategoryTooltipAccent(key));
    tip.classList.toggle('is-macro-metal', key === 'metal');
    tip.innerHTML = `
      <div class="cat-tip-head">
        <span class="cat-tip-title-wrap">
          <i class="cat-tip-swatch" aria-hidden="true"></i>
          <strong class="cat-tip-title">${tipData.title}</strong>
        </span>
        ${tipData.tag ? `<span class="cat-tip-tag">${tipData.tag}</span>` : ''}
      </div>
      <p class="cat-tip-desc">${tipData.desc}</p>
    `;

    if (isSwitchingGroup && !prefersReducedMotion()) {
      tip.classList.add('no-transition');
      tip.classList.remove('is-visible');
      positionCategoryTooltip(anchorEl);
      void tip.offsetWidth;
      tip.classList.remove('no-transition');
    } else {
      positionCategoryTooltip(anchorEl);
      if (!tip.classList.contains('is-visible')) {
        void tip.offsetWidth;
      }
    }

    tip.setAttribute('aria-hidden', 'false');
    tip.classList.add('is-visible');
  }

  function hideCategoryTooltip() {
    categoryTooltipAnchor = null;
    if (!categoryTooltip) return;
    categoryTooltip.setAttribute('aria-hidden', 'true');
    categoryTooltip.classList.remove('is-visible');
  }

  // Render Sub-category Legend (order matching reference screenshot)
  function buildSubLegend() {
    const order = [
      'alkali-metal',
      'alkaline-earth',
      'transition-metal',
      'post-transition',
      'metalloid',
      'nonmetal',
      'halogen',
      'noble-gas',
      'lanthanide',
      'actinide'
    ];

    order.forEach((catKey) => {
      const meta = window.ELEMENT_CATEGORIES[catKey];
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'sub-pill';
      pill.dataset.category = catKey;
      pill.style.setProperty('--pill-color', meta.color);
      pill.innerHTML = `<i></i><span class="sub-pill-label"></span>`;

      pill.addEventListener('mouseenter', () => {
        state.hoverCategory = catKey;
        applyFiltering();
        showCategoryTooltip(catKey, pill);
      });

      pill.addEventListener('mouseleave', () => {
        state.hoverCategory = null;
        applyFiltering();
        hideCategoryTooltip();
      });

      pill.addEventListener('click', () => {
        toggleCategoryLock(catKey);
      });

      subLegend.appendChild(pill);
    });
  }

  // Render Periodic Table Grid
  function buildPeriodicTable() {
    const frag = document.createDocumentFragment();

    // 0) Top-left axis corner legend (Nhóm → / Chu kỳ ↓)
    const axisCorner = document.createElement('div');
    axisCorner.className = 'grid-axis-corner';
    axisCorner.style.gridRow = '1';
    axisCorner.style.gridColumn = '1';
    axisCorner.setAttribute('aria-hidden', 'true');
    axisCorner.innerHTML = `
      <span class="axis-corner-group"><span class="axis-corner-text"></span><span class="axis-corner-arrow">→</span></span>
      <span class="axis-corner-period"><span class="axis-corner-text"></span><span class="axis-corner-arrow">↓</span></span>
    `;
    axisGroupTextEl = axisCorner.querySelector('.axis-corner-group .axis-corner-text');
    axisPeriodTextEl = axisCorner.querySelector('.axis-corner-period .axis-corner-text');
    frag.appendChild(axisCorner);

    // 1) Group header labels with Roman numerals (IA..VIIIA, IIIB..IIB) & IUPAC numbers (1..18)
    for (let g = 1; g <= 18; g++) {
      if (g === 8) {
        const spanLbl = document.createElement('div');
        spanLbl.className = 'grid-axis-label group-axis-lbl group-viiib-span';
        spanLbl.dataset.axisVal = '8–10';
        spanLbl.dataset.roman = 'VIIIB';
        spanLbl.style.gridRow = '1';
        spanLbl.style.gridColumn = '9 / 12';
        spanLbl.innerHTML = `
          <div class="group-viiib-head"><span class="group-roman">VIIIB</span></div>
          <div class="group-viiib-nums">
            <span class="group-arabic">8</span>
            <span class="group-arabic">9</span>
            <span class="group-arabic">10</span>
          </div>
        `;
        frag.appendChild(spanLbl);
        g = 10; // skip 9 and 10
        continue;
      }

      const roman = GROUP_ROMAN[g] || '';
      const lbl = document.createElement('div');
      lbl.className = 'grid-axis-label group-axis-lbl';
      lbl.dataset.axisVal = String(g);
      lbl.dataset.roman = roman;
      lbl.style.gridRow = '1';
      lbl.style.gridColumn = String(g + 1);
      lbl.innerHTML = `<span class="group-roman">${roman}</span><span class="group-arabic">${g}</span>`;
      frag.appendChild(lbl);
    }

    // 2) Period numbers (1..7)
    for (let p = 1; p <= 7; p++) {
      const lbl = document.createElement('div');
      lbl.className = 'grid-axis-label period-axis-lbl';
      lbl.dataset.axisVal = String(p);
      lbl.style.gridRow = String(p + 1);
      lbl.style.gridColumn = '1';
      lbl.textContent = String(p);
      frag.appendChild(lbl);
    }

    // 3) Lanthanide & Actinide placeholders in Group 3 (clicking locks/unlocks the entire series strip)
    laSlotEl = document.createElement('button');
    laSlotEl.type = 'button';
    laSlotEl.className = 'fblock-placeholder lanthanide-slot';
    laSlotEl.style.gridRow = '7';
    laSlotEl.style.gridColumn = '4';
    laSlotEl.innerHTML = '<span>57–71</span><small>La–Lu</small>';
    laSlotEl.addEventListener('mouseenter', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = 'lanthanide';
      applyFiltering();
    });
    laSlotEl.addEventListener('mouseleave', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = null;
      applyFiltering();
    });
    laSlotEl.addEventListener('click', () => {
      toggleCategoryLock('lanthanide');
    });
    frag.appendChild(laSlotEl);

    acSlotEl = document.createElement('button');
    acSlotEl.type = 'button';
    acSlotEl.className = 'fblock-placeholder actinide-slot';
    acSlotEl.style.gridRow = '8';
    acSlotEl.style.gridColumn = '4';
    acSlotEl.innerHTML = '<span>89–103</span><small>Ac–Lr</small>';
    acSlotEl.addEventListener('mouseenter', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = 'actinide';
      applyFiltering();
    });
    acSlotEl.addEventListener('mouseleave', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = null;
      applyFiltering();
    });
    acSlotEl.addEventListener('click', () => {
      toggleCategoryLock('actinide');
    });
    frag.appendChild(acSlotEl);

    // 4) Series labels to the left of f-block rows (also hoverable/clickable to lock series)
    laLabelEl = document.createElement('button');
    laLabelEl.type = 'button';
    laLabelEl.className = 'fblock-series-label';
    laLabelEl.style.gridRow = '10';
    laLabelEl.style.gridColumn = '2 / 5';
    laSeriesSpan = document.createElement('span');
    laSeriesSpan.className = 'series-la';
    laLabelEl.appendChild(laSeriesSpan);
    laLabelEl.addEventListener('mouseenter', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = 'lanthanide';
      applyFiltering();
    });
    laLabelEl.addEventListener('mouseleave', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = null;
      applyFiltering();
    });
    laLabelEl.addEventListener('click', () => {
      toggleCategoryLock('lanthanide');
    });
    frag.appendChild(laLabelEl);

    acLabelEl = document.createElement('button');
    acLabelEl.type = 'button';
    acLabelEl.className = 'fblock-series-label';
    acLabelEl.style.gridRow = '11';
    acLabelEl.style.gridColumn = '2 / 5';
    acSeriesSpan = document.createElement('span');
    acSeriesSpan.className = 'series-ac';
    acLabelEl.appendChild(acSeriesSpan);
    acLabelEl.addEventListener('mouseenter', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = 'actinide';
      applyFiltering();
    });
    acLabelEl.addEventListener('mouseleave', () => {
      if (isMobileExperience()) return;
      state.hoverCategory = null;
      applyFiltering();
    });
    acLabelEl.addEventListener('click', () => {
      toggleCategoryLock('actinide');
    });
    frag.appendChild(acLabelEl);

    // 5) All 118 Element Cells
    window.ELEMENTS.forEach((el) => {
      const cat = window.ELEMENT_CATEGORIES[el.category];
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'element-cell';
      cell.dataset.number = String(el.number);
      cell.dataset.category = el.category;
      cell.dataset.macro = el.macro;
      cell.dataset.row = String(el.row);
      cell.dataset.col = String(el.col);

      cell.style.gridRow = String(el.row + 1);
      cell.style.gridColumn = String(el.col + 1);

      cell.style.setProperty('--el-color', cat.color);
      cell.style.setProperty('--el-bg', cat.bg);
      cell.style.setProperty('--el-bg-hover', cat.bgHover);
      cell.style.setProperty('--el-border', cat.border);
      cell.style.setProperty('--el-border-hover', cat.borderHover);
      cell.style.setProperty('--el-glow', cat.glow);

      const compactMass = Number.isInteger(el.mass)
        ? `[${el.mass}]`
        : el.mass >= 100
        ? el.mass.toFixed(1)
        : el.mass.toFixed(2);

      cell.dataset.compactMass = compactMass;

      cell.innerHTML = `
        <div class="cell-top">
          <span class="cell-num">${el.number}</span>
          <span class="cell-mass">${compactMass}</span>
          <span class="cell-state-tag" aria-hidden="true"></span>
        </div>
        <div class="cell-symbol">${el.symbol}</div>
        <div class="cell-name"></div>
      `;

      // Hover: preview ONLY if no element is locked; skipped on mobile/touch devices so taps never stall
      cell.addEventListener('mouseenter', () => {
        if (isMobileExperience() || performance.now() - lastCellTouchTime < 700) return;
        cancelHoverLeave();
        cancelRadiusHide();
        hoveredEl = el;
        if (!state.locked) {
          displayElement(el);
        }
        syncRadiusPopover();
      });

      cell.addEventListener('mouseleave', () => {
        if (isMobileExperience() || performance.now() - lastCellTouchTime < 700) return;
        if (hoveredEl && hoveredEl.number === el.number) {
          hoveredEl = null;
          scheduleRadiusHide();
        }
        if (!state.locked) {
          scheduleHoverLeave();
        }
      });

      cell.addEventListener('focus', () => {
        if (isMobileExperience() || performance.now() - lastCellTouchTime < 700) return;
        cancelHoverLeave();
        cancelRadiusHide();
        hoveredEl = el;
        if (!state.locked) {
          displayElement(el);
        }
        syncRadiusPopover();
      });

      cell.addEventListener('blur', () => {
        if (isMobileExperience() || performance.now() - lastCellTouchTime < 700) return;
        if (hoveredEl && hoveredEl.number === el.number) {
          hoveredEl = null;
          scheduleRadiusHide();
        }
        if (!state.locked) {
          scheduleHoverLeave();
        }
      });

      // Touch tap vs scroll/pinch differentiation (iOS Safari + touch screens)
      let touchTap = null;
      cell.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length !== 1) {
            if (touchTap) touchTap.multiTouch = true;
            return;
          }
          const t0 = e.touches[0];
          touchTap = {
            x: t0.clientX,
            y: t0.clientY,
            scrollLeft: elTableSection ? elTableSection.scrollLeft : 0,
            scrollTop: elTableSection ? elTableSection.scrollTop : 0,
            pageX: window.scrollX,
            pageY: window.scrollY,
            time: performance.now(),
            moved: false,
            multiTouch: false
          };
        },
        { passive: true }
      );

      cell.addEventListener(
        'touchmove',
        (e) => {
          if (!touchTap) return;
          if (e.touches.length > 1) {
            touchTap.multiTouch = true;
            touchTap.moved = true;
            return;
          }
          const t0 = e.touches[0];
          if (
            Math.abs(t0.clientX - touchTap.x) > 10 ||
            Math.abs(t0.clientY - touchTap.y) > 10 ||
            (elTableSection &&
              (Math.abs(elTableSection.scrollLeft - touchTap.scrollLeft) > 4 ||
                Math.abs(elTableSection.scrollTop - touchTap.scrollTop) > 4)) ||
            Math.abs(window.scrollX - touchTap.pageX) > 4 ||
            Math.abs(window.scrollY - touchTap.pageY) > 4
          ) {
            touchTap.moved = true;
          }
        },
        { passive: true }
      );

      cell.addEventListener(
        'touchcancel',
        () => {
          touchTap = null;
        },
        { passive: true }
      );

      cell.addEventListener(
        'touchend',
        (e) => {
          lastCellTouchTime = performance.now();
          const tap = touchTap;
          touchTap = null;
          if (!tap || tap.moved || tap.multiTouch) return;
          const scrolled =
            (elTableSection &&
              (Math.abs(elTableSection.scrollLeft - tap.scrollLeft) > 4 ||
                Math.abs(elTableSection.scrollTop - tap.scrollTop) > 4)) ||
            Math.abs(window.scrollX - tap.pageX) > 4 ||
            Math.abs(window.scrollY - tap.pageY) > 4;
          if (scrolled || performance.now() - tap.time > 550) return;

          e.preventDefault();
          if (document.activeElement === searchInput) {
            searchInput.blur();
          }
          clearComparePick();
          cancelHoverLeave();
          cancelRadiusHide();
          if (state.locked && state.locked.number === el.number) {
            unlockElement(true);
            cell.blur();
          } else {
            lockElement(el);
          }
        },
        { passive: false }
      );

      // Prevent browser focus-scrolling when tapping/clicking cells on mobile viewports
      cell.addEventListener('mousedown', (e) => {
        if (!isMobileExperience()) return;
        if (document.activeElement === searchInput) {
          searchInput.blur();
        }
        e.preventDefault();
      });

      // Click: Desktop & touch lock/unlock (detail modal opens via dedicated button)
      cell.addEventListener('click', (e) => {
        if (performance.now() - lastCellTouchTime < 700) return;
        if (isMobileExperience()) {
          clearComparePick();
          cancelHoverLeave();
          cancelRadiusHide();
          if (state.locked && state.locked.number === el.number) {
            unlockElement(true);
            cell.blur();
          } else {
            lockElement(el);
          }
          return;
        }
        if (e.shiftKey && window.ChemTools) {
          e.preventDefault();
          cancelHoverLeave();
          cancelRadiusHide();
          handleShiftCompareClick(el);
          return;
        }
        clearComparePick();
        cancelHoverLeave();
        cancelRadiusHide();
        if (state.locked && state.locked.number === el.number) {
          unlockElement(false);
          cell.blur();
        } else {
          lockElement(el);
        }
      });

      cellMap.set(el.number, cell);
      frag.appendChild(cell);
    });

    elGrid.appendChild(frag);

    // Leaving the entire periodic grid immediately returns to the idle prompt when unlocked
    elGrid.addEventListener('mouseleave', () => {
      cancelHoverLeave();
      cancelRadiusHide();
      hoveredEl = null;
      if (!state.locked) {
        clearDisplay();
      }
      syncRadiusPopover();
    });
  }

  // Render Active Element Info into Upper Half
  function renderInspectorFields(el) {
    const dict = t();
    const isEn = state.lang === 'en';
    const cat = window.ELEMENT_CATEGORIES[el.category];

    elTopSection.style.setProperty('--accent', cat.color);
    elTopSection.style.setProperty('--accent-glow', cat.glow);

    elNum.textContent = el.number;
    elSym.textContent = el.symbol;
    elMassShort.textContent = window.formatMass(el.mass);

    elName.textContent = isEn ? el.enName : el.name;
    elEnName.textContent = isEn ? (el.name !== el.enName ? el.name : '') : el.enName;

    elMacro.textContent = isEn ? el.macroLabelEn : el.macroLabel;
    elCategory.textContent = isEn ? el.categoryLabelEn : el.categoryLabel;
    if (state.viewMode === 'temperature') {
      const dynState = getElementTempState(el, state.temperatureC);
      elPhase.textContent = `${getTempStateLabel(dynState)} (${state.temperatureC}°C)`;
    } else {
      elPhase.textContent = `${isEn ? el.phaseEn : el.phase} (25°C)`;
    }

    // Electron Configuration Bar:
    // - Mobile: concise shorthand outside (full configuration opens inside the orbital popover)
    // - Desktop: full configuration outside + shorthand badge (panel scrolls smoothly if wrapped)
    const useMobileEconfig = isMobileExperience();
    if (useMobileEconfig) {
      econfigFull.innerHTML = formatShorthandSubshellsHTML(el.config);
      econfigFull.title = `${el.fullConfig} — ${dict.orbitalHintTitle}`;
      if (econfigShort) {
        econfigShort.classList.add('hidden');
        econfigShort.innerHTML = '';
      }
    } else {
      econfigFull.innerHTML = window.formatSubshellsHTML(el.subshells);
      econfigFull.title = `${el.fullConfig} — ${dict.orbitalHintTitle}`;
      const hasShorthand = el.config !== el.fullConfig;
      if (econfigShort) {
        econfigShort.classList.toggle('hidden', !hasShorthand);
        if (hasShorthand) {
          econfigShort.innerHTML = window.formatElectronConfigHTML(el.config);
          econfigShort.title = el.config;
        }
      }
    }
    if (econfigBar) econfigBar.title = dict.orbitalHintTitle;
    if (state.orbitalOpen) {
      renderOrbitalPopover(el);
      requestAnimationFrame(positionOrbitalPopover);
    }

    // 12 Metrics
    const outerCount = el.shells[el.shells.length - 1];
    const outerShellLetter = SHELL_NAMES[el.shells.length - 1] || el.shells.length;
    mMass.textContent = `${window.formatMass(el.mass)} u`;
    mOuter.textContent = isEn
      ? `${outerCount} e⁻ (${outerShellLetter} ${dict.shellUnit})`
      : `${outerCount} e⁻ (${dict.shellUnit} ${outerShellLetter})`;
    mEneg.textContent = el.electronegativity !== null ? el.electronegativity.toFixed(2) : dict.none;
    const specHeatText =
      el.specificHeat !== null && el.specificHeat !== undefined
        ? `${el.specificHeat.toFixed(3)} J/(g·K)`
        : dict.unknown;
    mSpecHeat.textContent = specHeatText;
    mSpecHeat.title = specHeatText;
    mIoniz.textContent = formatNumber(el.ionization, ' kJ/mol');
    mDensity.textContent = formatNumber(el.density, ' g/cm³');
    mMelt.textContent = formatNumber(el.meltC, ' °C');
    mBoil.textContent = formatNumber(el.boilC, ' °C');
    mOx.textContent = el.oxidationStates;

    const grpRoman = el.group ? GROUP_ROMAN[el.group] : '';
    const grpStr = el.group
      ? `${dict.groupLabel} ${grpRoman ? `${grpRoman} (${el.group})` : el.group}`
      : dict.fBlockLabel;
    mPos.textContent = `${dict.periodShort} ${el.period} • ${grpStr} • ${dict.blockLabel} ${el.block}`;
    mPos.title = mPos.textContent;

    mShells.textContent = `${el.shells.length} ${dict.shellsWord} (${el.shells.join(', ')})`;
    mShells.title = el.shells.map((c, i) => `${SHELL_NAMES[i] || i + 1}: ${c}e⁻`).join(' | ');
    mYear.textContent = isEn ? el.yearEn : el.year;

    // 3D Atom HUD
    hudProtons.textContent = el.protons;
    hudElectrons.textContent = el.electrons;
    updateHudIsotope(el);
    if (hudRadius) {
      hudRadius.textContent = el.radius !== null && el.radius !== undefined ? `${el.radius} pm` : '—';
    }

    const valenceColor = atomRenderer.getCategoryValenceHex(el.category);
    const catLabel = isEn ? el.categoryLabelEn : el.categoryLabel;
    const outerIdx = el.shells.length - 1;
    const valTip = String(dict.valenceShellTip(catLabel)).replace(/"/g, '&quot;');
    hudShells.innerHTML = el.shells
      .map((cnt, idx) => {
        if (idx === outerIdx) {
          return `<span class="shell-chip is-valence" style="--val-e-color:${valenceColor}" title="${valTip}"><i class="valence-dot" aria-hidden="true"></i>${SHELL_NAMES[idx] || idx + 1}:<b>${cnt}</b></span>`;
        }
        return `<span class="shell-chip">${SHELL_NAMES[idx] || idx + 1}:<b>${cnt}</b></span>`;
      })
      .join('');
  }

  function updateHudIsotope(el) {
    if (!el) return;
    const dict = t();
    const active =
      state.selectedIsotope && state.selectedIsotope.number === el.number
        ? state.selectedIsotope
        : null;
    const neutrons = active ? active.neutrons : el.neutrons;

    hudNeutrons.textContent = neutrons;
    if (pillNeutron) {
      pillNeutron.classList.toggle('is-isotope-active', Boolean(active));
      pillNeutron.title = active
        ? dict.isoNeutronTip(active.massNumber, el.number, neutrons, el.symbol)
        : dict.neutronTitle;
    }

    if (hudIsotopeChip && hudIsotopeLabel) {
      if (active) {
        hudIsotopeLabel.innerHTML = `<sup>${active.massNumber}</sup>${el.symbol}`;
        hudIsotopeChip.classList.remove('hidden');
      } else {
        hudIsotopeChip.classList.add('hidden');
      }
    }
  }

  function selectIsotopeFor3D(el, massNumber) {
    if (!el || !Number.isInteger(massNumber)) return;
    const neutrons = Math.max(0, massNumber - el.number);
    if (state.hoverCategory !== null || state.hoverMacro !== null) {
      state.hoverCategory = null;
      state.hoverMacro = null;
      applyFiltering();
    }
    if (!elementMatchesActiveGroup(el)) {
      clearGroupFilters();
    }
    clearFormulaHighlight();
    clearComparePick();
    cancelHoverLeave();
    cancelRadiusHide();

    state.selectedIsotope = {
      number: el.number,
      massNumber,
      neutrons
    };
    state.locked = el;
    state.displayed = el;

    elTopSection.classList.remove('is-empty');
    elInspectorEmpty.classList.add('hidden');
    elInspectorContent.classList.remove('hidden');

    renderInspectorFields(el);
    updateLockUI();
    updateCellHighlights();

    // Close modal first so Atom3DRenderer resumes RAF, then update nucleus with pop animation
    closeDetailModal();
    const alreadyExact =
      atomRenderer.element &&
      atomRenderer.element.number === el.number &&
      atomRenderer.currentNeutrons === neutrons;
    if (alreadyExact) {
      atomRenderer.setNeutrons(neutrons);
    } else {
      atomRenderer.setElement(el, neutrons);
    }
    syncRadiusPopover(true);
  }

  function resetIsotopeToDefault() {
    state.selectedIsotope = null;
    if (state.displayed) {
      atomRenderer.setNeutrons(state.displayed.neutrons);
      updateHudIsotope(state.displayed);
    } else if (hudIsotopeChip) {
      hudIsotopeChip.classList.add('hidden');
    }
  }

  let atomExpandAnimTimer = null;

  function clearAtomExpandAnim() {
    if (atomExpandAnimTimer !== null) {
      clearTimeout(atomExpandAnimTimer);
      atomExpandAnimTimer = null;
    }
  }

  function getExpandedTargetRect() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw <= 820) {
      return { left: 10, top: 10, width: Math.max(220, vw - 20), height: Math.max(220, vh - 20) };
    }
    const padX = Math.max(18, Math.min(38, Math.round(vw * 0.03)));
    const padY = Math.max(16, Math.min(30, Math.round(vh * 0.028)));
    return {
      left: padX,
      top: padY,
      width: Math.max(320, vw - padX * 2),
      height: Math.max(260, vh - padY * 2)
    };
  }

  function setAtomStageBox(rect) {
    if (!elAtomStage || !rect) return;
    elAtomStage.style.left = `${rect.left}px`;
    elAtomStage.style.top = `${rect.top}px`;
    elAtomStage.style.width = `${rect.width}px`;
    elAtomStage.style.height = `${rect.height}px`;
    elAtomStage.style.right = 'auto';
    elAtomStage.style.bottom = 'auto';
  }

  function clearAtomStageBox() {
    if (!elAtomStage) return;
    elAtomStage.style.left = '';
    elAtomStage.style.top = '';
    elAtomStage.style.right = '';
    elAtomStage.style.bottom = '';
    elAtomStage.style.width = '';
    elAtomStage.style.height = '';
    elAtomStage.style.transition = '';
  }

  function renderAtomExpandedBanner() {
    if (!elAtomExpandedBanner) return;
    if (!state.atomExpanded || !state.displayed) {
      elAtomExpandedBanner.classList.remove('is-visible');
      elAtomExpandedBanner.classList.add('hidden');
      return;
    }
    const el = state.displayed;
    const isEn = state.lang === 'en';
    const dict = t();
    const displayName = isEn ? el.enName : el.name;
    const catLbl = isEn ? el.categoryLabelEn : el.categoryLabel;
    elAtomExpandedBanner.innerHTML = `
      <span class="aeb-z mono">#${el.number}</span>
      <strong class="aeb-sym">${el.symbol}</strong>
      <span class="aeb-name">${displayName}</span>
      <span class="aeb-sep">•</span>
      <span class="aeb-cat">${catLbl}</span>
      <button type="button" class="aeb-close" id="btn-close-atom-expand" title="${dict.collapseAtomTitle}" aria-label="${dict.collapseAtomTitle}">✕</button>
    `;
    elAtomExpandedBanner.classList.remove('hidden');
  }

  function updateExpandAtomUI() {
    if (!btnExpandAtom) return;
    const dict = t();
    const expanded = state.atomExpanded;
    const title = expanded ? dict.collapseAtomTitle : dict.expandAtomTitle;
    btnExpandAtom.title = title;
    btnExpandAtom.setAttribute('aria-label', title);
    btnExpandAtom.setAttribute('aria-pressed', String(expanded));
    btnExpandAtom.classList.toggle('active', expanded);
    const openIcon = btnExpandAtom.querySelector('.expand-icon-open');
    const closeIcon = btnExpandAtom.querySelector('.expand-icon-close');
    if (openIcon) openIcon.classList.toggle('hidden', expanded);
    if (closeIcon) closeIcon.classList.toggle('hidden', !expanded);
    renderAtomExpandedBanner();
    updateMobileActionBar();
  }

  function setAtomExpanded(expanded, immediate = false) {
    const next = Boolean(expanded);
    if (next === state.atomExpanded) return;

    clearAtomExpandAnim();

    if (next && state.displayed && !state.locked) {
      lockElement(state.displayed);
    }
    if (next) {
      closeOrbitalPopover();
      if (window.ChemFacts) window.ChemFacts.close();
    }

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!elAtomStage || !elAtomStageSlot || immediate || prefersReduced) {
      state.atomExpanded = next;
      clearAtomStageBox();
      if (elAtomStage) {
        elAtomStage.classList.remove('is-transitioning', 'is-collapsing');
        elAtomStage.classList.toggle('is-expanded', next);
      }
      if (elTopSection) elTopSection.classList.toggle('has-atom-expanded', next);
      if (elAtomExpandBackdrop) {
        elAtomExpandBackdrop.classList.toggle('hidden', !next);
        elAtomExpandBackdrop.classList.toggle('is-visible', next);
      }
      atomRenderer.setExpanded(next);
      updateExpandAtomUI();
      if (next && elAtomExpandedBanner) elAtomExpandedBanner.classList.add('is-visible');
      syncRadiusPopover();
      requestAnimationFrame(() => atomRenderer.resize());
      return;
    }

    if (next) {
      const fromRect = elAtomStage.getBoundingClientRect();
      const toRect = getExpandedTargetRect();

      state.atomExpanded = true;
      atomRenderer.setExpanded(true);
      updateExpandAtomUI();
      syncRadiusPopover();

      // 1) Pin fixed stage cleanly over its original inline rect
      elAtomStage.style.transition = 'none';
      setAtomStageBox(fromRect);
      elAtomStage.classList.remove('is-collapsing');
      elAtomStage.classList.add('is-expanded');
      if (elTopSection) elTopSection.classList.add('has-atom-expanded');
      if (elAtomExpandBackdrop) {
        elAtomExpandBackdrop.classList.remove('hidden', 'is-visible');
      }
      if (elAtomExpandedBanner) {
        elAtomExpandedBanner.classList.remove('is-visible');
      }

      // Force layout before launching smooth expand transition (~240ms)
      void elAtomStage.offsetWidth;

      elAtomStage.style.transition = '';
      elAtomStage.classList.add('is-transitioning');
      setAtomStageBox(toRect);
      if (elAtomExpandBackdrop) {
        elAtomExpandBackdrop.classList.add('is-visible');
      }

      atomExpandAnimTimer = setTimeout(() => {
        atomExpandAnimTimer = null;
        if (!state.atomExpanded) return;
        elAtomStage.classList.remove('is-transitioning');
        clearAtomStageBox();
        if (elAtomExpandedBanner) {
          elAtomExpandedBanner.classList.add('is-visible');
        }
        atomRenderer.resize();
      }, 255);
    } else {
      const fromRect = elAtomStage.getBoundingClientRect();
      const toRect = elAtomStageSlot.getBoundingClientRect();

      state.atomExpanded = false;
      atomRenderer.setExpanded(false);
      updateExpandAtomUI();
      if (elAtomExpandedBanner) {
        elAtomExpandedBanner.classList.remove('is-visible');
        elAtomExpandedBanner.classList.add('hidden');
      }

      // 1) Pin expanded box explicitly in px, then smoothly glide back to grid slot (~200ms)
      elAtomStage.style.transition = 'none';
      setAtomStageBox(fromRect);
      elAtomStage.classList.remove('is-transitioning');

      void elAtomStage.offsetWidth;

      elAtomStage.style.transition = '';
      elAtomStage.classList.add('is-transitioning', 'is-collapsing');
      setAtomStageBox(toRect);
      if (elAtomExpandBackdrop) {
        elAtomExpandBackdrop.classList.remove('is-visible');
      }

      atomExpandAnimTimer = setTimeout(() => {
        atomExpandAnimTimer = null;
        if (state.atomExpanded) return;
        elAtomStage.classList.remove('is-expanded', 'is-transitioning', 'is-collapsing');
        clearAtomStageBox();
        if (elTopSection) elTopSection.classList.remove('has-atom-expanded');
        if (elAtomExpandBackdrop) elAtomExpandBackdrop.classList.add('hidden');
        syncRadiusPopover();
        atomRenderer.resize();
      }, 215);
    }
  }

  function displayElement(el) {
    const isSame = state.displayed && state.displayed.number === el.number;
    if (!isSame) {
      state.selectedIsotope = null;
    }
    state.displayed = el;

    elTopSection.classList.remove('is-empty');
    elInspectorEmpty.classList.add('hidden');
    elInspectorContent.classList.remove('hidden');

    renderInspectorFields(el);

    if (!isSame) {
      if (elInspectorPanel) elInspectorPanel.scrollTop = 0;
      atomRenderer.setElement(el);
    }
    updateCellHighlights();
    renderAtomExpandedBanner();
  }

  function clearDisplay() {
    if (state.atomExpanded) {
      setAtomExpanded(false);
    }
    closeOrbitalPopover();
    state.selectedIsotope = null;
    state.displayed = null;
    if (hudIsotopeChip) hudIsotopeChip.classList.add('hidden');
    if (pillNeutron) pillNeutron.classList.remove('is-isotope-active');
    elTopSection.classList.add('is-empty');
    elInspectorEmpty.classList.remove('hidden');
    elInspectorContent.classList.add('hidden');
    atomRenderer.clearElement();
    updateCellHighlights();
  }

  function ensureFormulaBanner() {
    if (!formulaBanner) {
      formulaBanner = document.createElement('div');
      formulaBanner.id = 'formula-highlight-banner';
      formulaBanner.className = 'formula-highlight-banner hidden';
      formulaBanner.setAttribute('role', 'status');
      formulaBanner.setAttribute('aria-live', 'polite');
      formulaBanner.addEventListener('click', (e) => {
        if (e.target.closest('.fhb-close')) {
          e.stopPropagation();
          clearFormulaHighlight();
        }
      });
      document.body.appendChild(formulaBanner);
    }
    return formulaBanner;
  }

  function renderFormulaBanner() {
    if (!state.formulaHighlight) {
      if (formulaBanner) formulaBanner.classList.add('hidden');
      return;
    }
    const dict = t();
    const banner = ensureFormulaBanner();
    const { formattedHtml, symbols } = state.formulaHighlight;
    banner.title = dict.formulaHighlightHint;
    banner.innerHTML = `
      <span class="fhb-dot" aria-hidden="true"></span>
      <span class="fhb-formula">${formattedHtml}</span>
      <span class="fhb-syms mono">${symbols.join(' · ')}</span>
      <button type="button" class="fhb-close" title="${dict.formulaHighlightClose}" aria-label="${dict.formulaHighlightClose}">✕</button>
    `;
    banner.classList.remove('hidden');
  }

  function setFormulaHighlight({ atomicNumbers, symbols, formattedHtml }) {
    if (!Array.isArray(atomicNumbers) || atomicNumbers.length === 0) return;
    clearGroupFilters();
    if (state.locked) {
      state.locked = null;
      updateLockUI();
      updateCellHighlights();
    }
    const numSet = new Set(atomicNumbers);
    state.formulaHighlight = { numbers: numSet, symbols: symbols || [], formattedHtml: formattedHtml || '' };
    elGrid.classList.add('has-formula-highlight');
    cellMap.forEach((cell, z) => {
      cell.classList.toggle('is-formula-match', numSet.has(z));
    });
    renderFormulaBanner();
  }

  function clearFormulaHighlight() {
    if (!state.formulaHighlight) return;
    state.formulaHighlight = null;
    elGrid.classList.remove('has-formula-highlight');
    cellMap.forEach((cell) => {
      cell.classList.remove('is-formula-match');
    });
    if (formulaBanner) {
      formulaBanner.classList.add('hidden');
    }
  }

  function ensureComparePickBanner() {
    if (!comparePickBanner) {
      comparePickBanner = document.createElement('div');
      comparePickBanner.id = 'compare-pick-banner';
      comparePickBanner.className = 'formula-highlight-banner compare-pick-banner hidden';
      comparePickBanner.setAttribute('role', 'status');
      comparePickBanner.setAttribute('aria-live', 'polite');
      comparePickBanner.addEventListener('click', (e) => {
        if (e.target.closest('.fhb-close')) {
          e.stopPropagation();
          clearComparePick();
        }
      });
      document.body.appendChild(comparePickBanner);
    }
    return comparePickBanner;
  }

  function renderComparePickBanner() {
    if (!state.comparePick) {
      if (comparePickBanner) comparePickBanner.classList.add('hidden');
      return;
    }
    const dict = t();
    const el = state.comparePick;
    const isEn = state.lang === 'en';
    const banner = ensureComparePickBanner();
    banner.innerHTML = `
      <span class="fhb-dot cmp-pick-dot" aria-hidden="true"></span>
      <span class="cmp-pick-text">${dict.comparePickBanner(el.symbol, isEn ? el.enName : el.name)}</span>
      <button type="button" class="fhb-close" title="${dict.comparePickCancel}" aria-label="${dict.comparePickCancel}">✕</button>
    `;
    banner.classList.remove('hidden');
  }

  function setComparePick(el) {
    clearComparePick();
    clearFormulaHighlight();
    state.comparePick = el;
    const cell = cellMap.get(el.number);
    if (cell) cell.classList.add('is-compare-pick');
    renderComparePickBanner();
  }

  function clearComparePick() {
    if (!state.comparePick) return;
    const prevCell = cellMap.get(state.comparePick.number);
    if (prevCell) prevCell.classList.remove('is-compare-pick');
    state.comparePick = null;
    if (comparePickBanner) comparePickBanner.classList.add('hidden');
  }

  function handleShiftCompareClick(el) {
    if (!window.ChemTools) return;
    if (state.comparePick) {
      if (state.comparePick.number === el.number) {
        clearComparePick();
        return;
      }
      const first = state.comparePick;
      clearComparePick();
      window.ChemTools.openCompare(first, el);
      return;
    }
    if (state.locked && state.locked.number !== el.number) {
      window.ChemTools.openCompare(state.locked, el);
      return;
    }
    setComparePick(el);
  }

  function lockElement(el) {
    if (state.hoverCategory !== null || state.hoverMacro !== null) {
      state.hoverCategory = null;
      state.hoverMacro = null;
      applyFiltering();
    }
    if (!elementMatchesActiveGroup(el)) {
      clearGroupFilters();
    }
    clearFormulaHighlight();
    clearComparePick();
    cancelHoverLeave();
    cancelRadiusHide();
    state.locked = el;
    displayElement(el);
    updateLockUI();
    updateCellHighlights();
    updateMobileActionBar();
    syncRadiusPopover(true);
  }

  function unlockElement(resetToIdle) {
    state.locked = null;
    updateLockUI();
    if (resetToIdle) {
      hoveredEl = null;
      clearDisplay();
    } else {
      updateCellHighlights();
    }
    updateMobileActionBar();
    syncRadiusPopover(true);
  }

  function buildElementTraits(el) {
    const isEn = state.lang === 'en';
    const dict = t();
    const details = window.ELEMENT_DETAILS && window.ELEMENT_DETAILS[el.number];
    const traits = [];

    // 1) Curated scientific highlight for this specific element
    if (details) {
      const traitText = isEn ? details[3] : details[2];
      if (traitText) traits.push(traitText);
    }

    // 2) Electronic & chemical bonding profile
    const outerCount = el.shells[el.shells.length - 1];
    const outerShellLetter = SHELL_NAMES[el.shells.length - 1] || el.shells.length;
    const enegPart =
      el.electronegativity !== null
        ? isEn
          ? `electronegativity ${el.electronegativity.toFixed(2)}`
          : `độ âm điện ${el.electronegativity.toFixed(2)}`
        : isEn
        ? 'no Pauling electronegativity scale value'
        : 'không xác định độ âm điện';

    if (isEn) {
      traits.push(
        `Contains ${el.shells.length} electron shell(s) (${el.shells.join(', ')}) with ${outerCount} outer electron(s) in the ${outerShellLetter} shell, ${enegPart}, and common oxidation state(s) ${el.oxidationStates}.`
      );
    } else {
      traits.push(
        `Có ${el.shells.length} lớp vỏ electron (${el.shells.join(', ')}) với ${outerCount} electron ở lớp ngoài cùng (${outerShellLetter}), ${enegPart} và số oxi hóa phổ biến: ${el.oxidationStates}.`
      );
    }

    // 3) Physical & thermal profile
    const thermalParts = [];
    if (el.meltC !== null) {
      thermalParts.push(isEn ? `melts at ${el.meltC}°C` : `nóng chảy ở ${el.meltC}°C`);
    }
    if (el.boilC !== null) {
      thermalParts.push(isEn ? `boils at ${el.boilC}°C` : `sôi ở ${el.boilC}°C`);
    }
    if (el.density !== null) {
      thermalParts.push(isEn ? `density ${el.density} g/cm³` : `khối lượng riêng ${el.density} g/cm³`);
    }
    if (thermalParts.length > 0) {
      if (isEn) {
        traits.push(`Exists as a ${el.phaseEn.toLowerCase()} at 25°C — ${thermalParts.join(', ')}.`);
      } else {
        traits.push(`Ở 25°C tồn tại ở thể ${el.phase.toLowerCase()} — ${thermalParts.join(', ')}.`);
      }
    }

    // 4) Radioactivity note where scientifically applicable (Tc, Pm, and Z >= 84)
    if (el.number === 43 || el.number === 61 || el.number >= 84) {
      traits.push(dict.radioactiveNote);
    }

    return traits;
  }

  const SPECTRUM_MIN_NM = 380;
  const SPECTRUM_MAX_NM = 750;
  const SPECTRUM_TICKS = [400, 450, 500, 550, 600, 650, 700, 750];

  function renderDetailSpectrum(el) {
    if (!modalSpectrumBox || !modalFlameCard || !modalSpectrumTitle) return;
    const dict = t();
    const isEn = state.lang === 'en';
    const lines = window.ELEMENT_SPECTRA ? window.ELEMENT_SPECTRA[el.number] : null;
    const flame = window.FLAME_TESTS ? window.FLAME_TESTS[el.number] : null;

    modalSpectrumTitle.textContent = flame ? dict.modalSpectrumFlame : dict.modalSpectrum;

    const span = SPECTRUM_MAX_NM - SPECTRUM_MIN_NM;
    const ticksHtml = SPECTRUM_TICKS.map((tick) => {
      const pct = (((tick - SPECTRUM_MIN_NM) / span) * 100).toFixed(2);
      const isRightEdge = tick === 750;
      return `<span class="spec-tick ${isRightEdge ? 'is-end' : ''}" style="left:${pct}%">${tick}${isRightEdge ? ' nm' : ''}</span>`;
    }).join('');

    if (Array.isArray(lines) && lines.length > 0) {
      const linesHtml = lines
        .map(([nm, intensity]) => {
          const pct = Math.max(0.5, Math.min(99.5, ((nm - SPECTRUM_MIN_NM) / span) * 100));
          const color = window.wavelengthToRGB ? window.wavelengthToRGB(nm) : '#edf1f7';
          const band = window.getSpectralBandName ? window.getSpectralBandName(nm, isEn) : '';
          const opacity = Math.max(0.55, Math.min(1, intensity || 0.85)).toFixed(2);
          const nmStr = nm.toFixed(1);
          return `
            <span
              class="spec-line-hit"
              tabindex="0"
              style="left:${pct.toFixed(2)}%"
              data-nm="${nmStr}"
              data-color="${color}"
              data-band="${band}"
              data-pct="${pct.toFixed(2)}"
              title="${nmStr} nm (${band})"
              aria-label="${nmStr} nm ${band}"
            ><span class="spec-line-bar" style="background:${color};opacity:${opacity};"></span></span>
          `;
        })
        .join('');

      modalSpectrumBox.innerHTML = `
        <div class="spec-strip-wrap">
          <div class="spec-tooltip hidden" aria-hidden="true"></div>
          <div class="spec-strip" role="img" aria-label="${dict.modalSpectrum} — ${el.symbol}">
            ${linesHtml}
          </div>
          <div class="spec-ruler" aria-hidden="true">${ticksHtml}</div>
        </div>
        <div class="spec-caption">
          <span>${lines.length} ${dict.spectrumLinesUnit}</span>
          <span>•</span>
          <span>${isMobileExperience() ? dict.spectrumTapHint : dict.spectrumHoverHint}</span>
        </div>
      `;
    } else {
      const noDataMsg = el.number === 85 ? dict.spectrumNoDataAt : dict.spectrumNoDataSuperheavy;
      modalSpectrumBox.innerHTML = `
        <div class="spec-strip-wrap">
          <div class="spec-strip spec-strip-empty">
            <span class="spec-empty-msg">${noDataMsg}</span>
          </div>
          <div class="spec-ruler" aria-hidden="true">${ticksHtml}</div>
        </div>
      `;
    }

    if (flame) {
      const flameLabel = isEn ? flame.labelEn : flame.labelVi;
      modalFlameCard.classList.remove('hidden');
      modalFlameCard.innerHTML = `
        <div class="flame-visual" aria-hidden="true">
          <svg class="flame-svg" viewBox="0 0 40 48" width="38" height="46">
            <path d="M20 4 C24 12, 32 20, 31 30 C30.3 36.5, 25.8 40, 20 40 C14.2 40, 9.7 36.5, 9 30 C8 20, 16 12, 20 4 Z" fill="${flame.outer}" />
            <path d="M20 13 C23 19, 27.5 24, 26.8 31 C26.2 35.6, 23.4 38.2, 20 38.2 C16.6 38.2, 13.8 35.6, 13.2 31 C12.5 24, 17 19, 20 13 Z" fill="${flame.mid}" />
            <path d="M20 22 C21.8 26, 24 29, 23.6 33.2 C23.3 35.8, 21.8 37.2, 20 37.2 C18.2 37.2, 16.7 35.8, 16.4 33.2 C16 29, 18.2 26, 20 22 Z" fill="${flame.inner}" />
            <rect x="14.5" y="40.5" width="11" height="2.4" rx="1" fill="#64748b" />
            <rect x="16" y="42.9" width="8" height="4.2" rx="1" fill="#2b3244" stroke="#475569" stroke-width="0.8" />
          </svg>
        </div>
        <div class="flame-info">
          <span class="flame-eyebrow">${dict.flameTestLabel}</span>
          <span class="flame-color-name">
            <i class="flame-dot" style="background:${flame.mid};"></i>
            ${flameLabel}
          </span>
        </div>
      `;
    } else {
      modalFlameCard.classList.add('hidden');
      modalFlameCard.innerHTML = '';
    }
  }

  function renderDetailIsotopes(el) {
    if (!modalIsotopesGrid) return;
    const dict = t();
    const isEn = state.lang === 'en';
    const list = window.ELEMENT_ISOTOPES && window.ELEMENT_ISOTOPES[el.number];
    if (!Array.isArray(list) || list.length === 0) {
      modalIsotopesGrid.innerHTML = '';
      return;
    }

    const activeA =
      state.selectedIsotope && state.selectedIsotope.number === el.number
        ? state.selectedIsotope.massNumber
        : null;

    modalIsotopesGrid.innerHTML = list
      .map(([massNumber, abundance, halfLife, noteVi, noteEn]) => {
        const neutrons = Math.max(0, massNumber - el.number);
        const isRad = halfLife !== null;
        const abStr = window.formatIsotopeAbundance ? window.formatIsotopeAbundance(abundance, state.lang) : '';
        const hlStr =
          isRad && window.formatIsotopeHalfLife
            ? window.formatIsotopeHalfLife(halfLife, state.lang)
            : '';
        const noteStr = isEn ? noteEn : noteVi;
        const isActive = activeA === massNumber;
        const hasNumAb = typeof abundance === 'number' && abundance > 0;
        const barWidth = hasNumAb ? Math.max(2, Math.min(100, abundance)) : 0;

        const detailParts = [];
        if (hasNumAb) {
          detailParts.push(`<span class="iso-abundance mono">${abStr}</span>`);
        } else if (abundance === 'trace') {
          detailParts.push(`<span class="iso-trace-tag">${abStr}</span>`);
        }
        if (isRad && hlStr) {
          detailParts.push(`<span class="iso-halflife mono">t<sub>1/2</sub> = ${hlStr}</span>`);
        }

        const tooltip = `${el.symbol}-${massNumber}: p⁺ = ${el.number}, n⁰ = ${neutrons} — ${dict.isoView3D}`;

        return `
          <button
            type="button"
            class="isotope-card ${isRad ? 'is-radioactive' : 'is-stable'} ${isActive ? 'is-active' : ''}"
            data-mass-number="${massNumber}"
            title="${tooltip}"
          >
            <div class="iso-card-top">
              <div class="iso-id-wrap">
                <span class="iso-notation"><sup>${massNumber}</sup>${el.symbol}</span>
                ${noteStr ? `<span class="iso-note-tag">${noteStr}</span>` : ''}
              </div>
              <span class="iso-status-badge ${isRad ? 'is-rad' : 'is-stable'}">
                <i class="iso-status-dot"></i>
                ${isRad ? dict.isoRadioactive : dict.isoStable}
              </span>
            </div>
            <div class="iso-card-mid">${detailParts.join('<span class="iso-mid-sep">•</span>')}</div>
            <div class="iso-card-foot">
              <span class="iso-nucleons mono">p⁺ ${el.number} · <b>n⁰ ${neutrons}</b></span>
              <span class="iso-3d-cue">${isActive ? dict.isoActive : `${dict.isoView3D} →`}</span>
            </div>
            ${
              hasNumAb
                ? `<span class="iso-ab-track" aria-hidden="true"><span class="iso-ab-fill" style="width:${barWidth.toFixed(1)}%"></span></span>`
                : ''
            }
          </button>
        `;
      })
      .join('');
  }

  function renderDetailModal(el) {
    if (!el) return;
    const isEn = state.lang === 'en';
    const dict = t();
    const cat = window.ELEMENT_CATEGORIES[el.category];
    const details = window.ELEMENT_DETAILS && window.ELEMENT_DETAILS[el.number];

    detailModal.style.setProperty('--accent', cat.color);
    detailModal.style.setProperty('--accent-glow', cat.glow);

    modalNumber.textContent = el.number;
    modalSymbol.textContent = el.symbol;
    modalTitle.textContent = isEn ? el.enName : el.name;
    modalSubname.textContent = isEn ? (el.name !== el.enName ? el.name : '') : el.enName;
    modalMacro.textContent = isEn ? el.macroLabelEn : el.macroLabel;
    modalCategory.textContent = isEn ? el.categoryLabelEn : el.categoryLabel;
    modalPhase.textContent = `${isEn ? el.phaseEn : el.phase} (25°C)`;
    modalSummary.textContent = isEn ? el.enSummary : el.summary;

    renderDetailSpectrum(el);
    renderDetailIsotopes(el);

    const traits = buildElementTraits(el);
    modalTraits.innerHTML = traits.map((item) => `<li>${item}</li>`).join('');

    const apps = details ? (isEn ? details[1] : details[0]) : [];
    modalApps.innerHTML = apps.map((item) => `<li>${item}</li>`).join('');

    modalMetaConfig.innerHTML = window.formatElectronConfigHTML(el.config);
    modalMetaYear.textContent = `${dict.discoveredPrefix} ${isEn ? el.yearEn : el.year}`;
  }

  function syncAtomPause() {
    const labOpen = Boolean(window.BondingLab && window.BondingLab.isOpen());
    const vlabOpen = Boolean(window.VirtualLab && window.VirtualLab.isOpen());
    const toolsOpen = Boolean(window.ChemTools && window.ChemTools.isOpen());
    const factsOpen = Boolean(window.ChemFacts && window.ChemFacts.isOpen());
    atomRenderer.setPaused(Boolean(state.modalElement) || labOpen || vlabOpen || toolsOpen || factsOpen);
    updateMobileActionBar();
    syncRadiusPopover();
  }

  function openDetailModal(el) {
    if (!el) return;
    if (detailCloseTimer !== null) {
      clearTimeout(detailCloseTimer);
      detailCloseTimer = null;
    }
    if (state.atomExpanded) setAtomExpanded(false, true);
    closeOrbitalPopover();
    if (window.ChemFacts) window.ChemFacts.close();
    state.modalElement = el;
    renderDetailModal(el);
    if (detailBody) detailBody.scrollTop = 0;
    detailModal.classList.remove('hidden', 'is-closing', 'is-open');
    void detailModal.offsetWidth;
    detailModal.classList.add('is-open');
    syncAtomPause();
  }

  function closeDetailModal(immediate = false) {
    if (detailCloseTimer !== null) {
      clearTimeout(detailCloseTimer);
      detailCloseTimer = null;
    }
    const wasHidden = detailModal.classList.contains('hidden');
    state.modalElement = null;
    syncAtomPause();

    if (immediate === true || wasHidden || !isMobileExperience() || prefersReducedMotion()) {
      detailModal.classList.remove('is-open', 'is-closing');
      detailModal.classList.add('hidden');
      return;
    }

    detailModal.classList.remove('is-open');
    detailModal.classList.add('is-closing');
    detailCloseTimer = setTimeout(() => {
      detailCloseTimer = null;
      detailModal.classList.remove('is-closing');
      detailModal.classList.add('hidden');
    }, 260);
  }

  function updateLockUI() {
    elGrid.classList.toggle('has-locked', Boolean(state.locked));
  }

  function updateOrbitSpeedUI() {
    if (!btnOrbitSpeed || !speedLabel || !speedIcon) return;
    const dict = t();
    const speed = ORBIT_SPEEDS[state.orbitSpeedIdx] ?? 1;
    const speedName = (dict.orbitSpeedStates && dict.orbitSpeedStates[speed]) || `${speed}×`;
    speedLabel.textContent = `${speed}×`;
    speedIcon.textContent = speed === 0 ? '⏸' : speed >= 2 ? '»' : '›';
    btnOrbitSpeed.classList.toggle('active', speed > 1);
    btnOrbitSpeed.classList.toggle('is-slow', speed > 0 && speed < 1);
    btnOrbitSpeed.classList.toggle('is-paused', speed === 0);
    btnOrbitSpeed.title = dict.orbitSpeedTitle(speedName, speed);
    btnOrbitSpeed.setAttribute('aria-label', dict.orbitSpeedTitle(speedName, speed));
  }

  function updateCellHighlights() {
    const nextLockedCell = state.locked ? cellMap.get(state.locked.number) || null : null;
    const nextActiveCell = !state.locked && state.displayed ? cellMap.get(state.displayed.number) || null : null;

    if (lastLockedCell && lastLockedCell !== nextLockedCell) {
      lastLockedCell.classList.remove('is-locked');
    }
    if (nextLockedCell && nextLockedCell !== lastLockedCell) {
      nextLockedCell.classList.add('is-locked');
    }
    lastLockedCell = nextLockedCell;

    if (lastActiveCell && lastActiveCell !== nextActiveCell) {
      lastActiveCell.classList.remove('is-active');
    }
    if (nextActiveCell && nextActiveCell !== lastActiveCell) {
      nextActiveCell.classList.add('is-active');
    }
    lastActiveCell = nextActiveCell;
  }

  // Apply Language Across All UI & Cells
  function applyLanguage() {
    const dict = t();
    const isEn = state.lang === 'en';
    document.documentElement.lang = state.lang;

    // Static text elements via data-i18n
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (dict[key] !== undefined) {
        node.textContent = dict[key];
      }
    });
    syncEmptyPromptCopy();

    // Mode & speed buttons + tooltips
    modeLabel.textContent = state.atomMode === '3d' ? dict.mode3d : dict.modeBohr;
    btnAutoRotate.title = dict.autoRotateTitle;
    updateOrbitSpeedUI();
    btnMode.title = dict.modeTitle;
    btnReset.title = dict.resetTitle;
    btnReset.setAttribute('aria-label', dict.resetTitle);
    if (mobileLockBar) {
      mobileLockBar.setAttribute('aria-label', dict.mobileLockBarLabel);
    }
    if (btnMobileScrollTop) {
      btnMobileScrollTop.title = dict.mobileScrollTopTitle;
    }
    if (btnMobileUnlock) {
      btnMobileUnlock.title = dict.mobileUnlockTitle;
      btnMobileUnlock.setAttribute('aria-label', dict.mobileUnlockTitle);
    }
    if (btnAtomZoomIn) {
      btnAtomZoomIn.title = dict.atomZoomInTitle;
      btnAtomZoomIn.setAttribute('aria-label', dict.atomZoomInTitle);
    }
    if (btnAtomZoomOut) {
      btnAtomZoomOut.title = dict.atomZoomOutTitle;
      btnAtomZoomOut.setAttribute('aria-label', dict.atomZoomOutTitle);
    }
    if (btnAtomZoomReset) {
      btnAtomZoomReset.title = dict.atomResetMobileTitle;
      btnAtomZoomReset.setAttribute('aria-label', dict.atomResetMobileTitle);
    }
    updateExpandAtomUI();
    pillProton.title = dict.protonTitle;
    pillNeutron.title = dict.neutronTitle;
    pillElectron.title = dict.electronTitle;
    if (hudRadiusWrap) hudRadiusWrap.title = dict.hudRadiusTitle;
    hudShells.title = dict.shellsTitle;
    if (btnOpenLab) btnOpenLab.title = dict.bondingLabTitle;
    if (btnOpenVlab) btnOpenVlab.title = dict.vlabBtnTitle;
    if (btnOpenTools) btnOpenTools.title = dict.toolsBtnTitle;
    if (btnResetIsotope) btnResetIsotope.title = dict.isoResetTitle;
    if (btnSendToLab) btnSendToLab.title = dict.sendToLabTitle;
    if (tempResetBtn) tempResetBtn.title = dict.tempResetTitle;
    if (econfigBar) econfigBar.title = dict.orbitalHintTitle;

    // Search input
    searchInput.placeholder = dict.searchPlaceholder;
    searchClear.title = dict.searchClearTitle;

    // Sub-legend pills
    hideCategoryTooltip();
    subLegend.querySelectorAll('.sub-pill').forEach((pill) => {
      const catKey = pill.dataset.category;
      const meta = window.ELEMENT_CATEGORIES[catKey];
      const lbl = pill.querySelector('.sub-pill-label');
      if (lbl) lbl.textContent = dict.subLabels[catKey] || (isEn ? meta.labelEn : meta.label);
      pill.removeAttribute('title');
      pill.setAttribute(
        'aria-label',
        isEn ? `${meta.labelEn} (${meta.macroLabelEn})` : `${meta.label} (${meta.macroLabel})`
      );
    });

    // Axis labels & f-block labels
    if (axisGroupTextEl) axisGroupTextEl.textContent = dict.groupAxis;
    if (axisPeriodTextEl) axisPeriodTextEl.textContent = dict.periodAxis;
    elGrid.querySelectorAll('.group-axis-lbl').forEach((lbl) => {
      const roman = lbl.dataset.roman || '';
      const num = lbl.dataset.axisVal || '';
      lbl.title = roman ? `${dict.groupAxis} ${roman} (${num})` : `${dict.groupAxis} ${num}`;
    });
    elGrid.querySelectorAll('.period-axis-lbl').forEach((lbl) => {
      lbl.title = `${dict.periodAxis} ${lbl.dataset.axisVal}`;
    });
    if (laSeriesSpan) laSeriesSpan.textContent = dict.lanthanideSeries;
    if (acSeriesSpan) acSeriesSpan.textContent = dict.actinideSeries;
    if (laSlotEl) laSlotEl.title = dict.lanthanideTooltip;
    if (acSlotEl) acSlotEl.title = dict.actinideTooltip;
    if (laLabelEl) laLabelEl.title = dict.lanthanideTooltip;
    if (acLabelEl) acLabelEl.title = dict.actinideTooltip;

    // Update all 118 element cell names & aria-labels
    window.ELEMENTS.forEach((el) => {
      const cell = cellMap.get(el.number);
      if (!cell) return;
      const nameEl = cell.querySelector('.cell-name');
      const displayName = isEn ? el.enName : el.name;
      if (nameEl) nameEl.textContent = displayName;
      cell.setAttribute(
        'aria-label',
        `${el.number} ${displayName} (${el.symbol}) - ${isEn ? el.categoryLabelEn : el.categoryLabel}`
      );
    });

    // Sync lang toggle buttons
    langSwitch.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });

    // Re-render active view mode labels (temperature state tags / heatmap title & tooltips)
    if (state.viewMode === 'temperature') {
      updateTemperatureView();
    } else if (HEATMAP_PROPS.includes(state.viewMode)) {
      updateHeatmapView(state.viewMode);
    }

    // Sync Bonding Lab, Virtual Labs & Chemistry Tools language
    if (window.BondingLab) {
      window.BondingLab.setLang(state.lang);
    }
    if (window.VirtualLab) {
      window.VirtualLab.setLang(state.lang);
    }
    if (window.ChemTools) {
      window.ChemTools.setLang(state.lang);
    }
    if (window.ChemFacts) {
      window.ChemFacts.setLang(state.lang);
    }
    if (state.formulaHighlight) {
      renderFormulaBanner();
    }
    if (state.comparePick) {
      renderComparePickBanner();
    }

    // Re-render inspector & modal if currently visible
    if (state.displayed) {
      renderInspectorFields(state.displayed);
    }
    if (state.modalElement) {
      renderDetailModal(state.modalElement);
    }
    updateMobileActionBar();
    syncRadiusPopover(true);
  }

  // Smart 4-tier chemical search (avoids false substring matches like "Cu" -> "Mercury"/"Curium")
  function getSearchMatches(rawQuery) {
    const q = normalizeText(rawQuery);
    if (!q) return null;

    // Tier 1: Pure numeric query -> exact atomic number (e.g. "26" -> Fe, "1" -> H)
    if (/^\d+$/.test(q)) {
      return window.ELEMENTS.filter((el) => String(el.number) === q);
    }

    // Tier 2: Exact chemical symbol OR exact full name (VI / EN)
    // e.g. "Cu" -> only Cu; "Fe" -> only Fe; "Tin" -> only Sn; "Bo" -> only B
    const exactMatches = window.ELEMENTS.filter((el) => {
      const sym = normalizeText(el.symbol);
      const vi = normalizeText(el.name);
      const en = normalizeText(el.enName);
      return sym === q || vi === q || en === q;
    });
    if (exactMatches.length > 0) return exactMatches;

    // Tier 3: Prefix / word-start match on symbol, Vietnamese name, or English name
    const prefixMatches = window.ELEMENTS.filter((el) => {
      const sym = normalizeText(el.symbol);
      const vi = normalizeText(el.name);
      const en = normalizeText(el.enName);
      if (sym.startsWith(q) || vi.startsWith(q) || en.startsWith(q)) return true;
      return vi.split(/\s+/).some((word) => word.startsWith(q));
    });
    if (prefixMatches.length > 0) return prefixMatches;

    // Tier 4: Substring fallback only when no exact or prefix match exists
    return window.ELEMENTS.filter((el) => {
      const vi = normalizeText(el.name);
      const en = normalizeText(el.enName);
      return vi.includes(q) || en.includes(q);
    });
  }

  // Filtering & Search
  function syncFblockSlotButtons() {
    if (laSlotEl) {
      const isLa = state.activeCategory === 'lanthanide';
      laSlotEl.classList.toggle('is-active', isLa);
      laSlotEl.setAttribute('aria-pressed', String(isLa));
    }
    if (acSlotEl) {
      const isAc = state.activeCategory === 'actinide';
      acSlotEl.classList.toggle('is-active', isAc);
      acSlotEl.setAttribute('aria-pressed', String(isAc));
    }
    if (laLabelEl) {
      laLabelEl.classList.toggle('is-active', state.activeCategory === 'lanthanide');
    }
    if (acLabelEl) {
      acLabelEl.classList.toggle('is-active', state.activeCategory === 'actinide');
    }
  }

  function elementMatchesActiveGroup(el) {
    if (!el) return false;
    if (state.activeCategory !== null) {
      return el.category === state.activeCategory;
    }
    if (state.viewMode === 'default' && state.activeMacro !== 'all') {
      return el.macro === state.activeMacro;
    }
    return true;
  }

  function clearGroupFilters() {
    const hadAny =
      state.activeCategory !== null ||
      state.activeMacro !== 'all' ||
      state.hoverCategory !== null ||
      state.hoverMacro !== null;
    state.activeCategory = null;
    state.activeMacro = 'all';
    state.hoverCategory = null;
    state.hoverMacro = null;
    syncMacroFilterButtons();
    syncSubLegendButtons();
    syncFblockSlotButtons();
    if (hadAny) {
      applyFiltering();
    }
  }

  function toggleCategoryLock(catKey) {
    clearFormulaHighlight();
    clearComparePick();
    const hadLockedElement = Boolean(state.locked);
    if (hadLockedElement) {
      unlockElement(true);
    }
    if (state.activeCategory === catKey && !hadLockedElement) {
      state.activeCategory = null;
      state.hoverCategory = null;
    } else {
      state.activeCategory = catKey;
      state.activeMacro = 'all';
    }
    syncMacroFilterButtons();
    syncSubLegendButtons();
    syncFblockSlotButtons();
    applyFiltering();
  }

  function setMacroFilter(macro) {
    clearFormulaHighlight();
    clearComparePick();
    const hadLockedElement = Boolean(state.locked);
    if (hadLockedElement) {
      unlockElement(true);
    }
    if (
      macro !== 'all' &&
      !hadLockedElement &&
      state.activeMacro === macro &&
      !state.activeCategory
    ) {
      state.activeMacro = 'all';
      state.hoverMacro = null;
    } else {
      state.activeMacro = macro;
      if (macro === 'all') {
        state.hoverMacro = null;
      }
    }
    state.activeCategory = null;
    syncMacroFilterButtons();
    syncSubLegendButtons();
    syncFblockSlotButtons();
    applyFiltering();
  }

  function applyFiltering() {
    const isDefaultMode = state.viewMode === 'default';
    const hasHoverGroup = Boolean(state.hoverCategory || (isDefaultMode && state.hoverMacro));
    const activeCat = state.hoverCategory || (!state.hoverMacro ? state.activeCategory : null);
    const activeMacro = isDefaultMode ? state.hoverMacro || state.activeMacro : 'all';
    const searchList = getSearchMatches(state.searchQuery);
    const searchSet = searchList ? new Set(searchList.map((e) => e.number)) : null;

    elGrid.classList.toggle('has-cat-hover', hasHoverGroup);

    window.ELEMENTS.forEach((el) => {
      const cell = cellMap.get(el.number);
      if (!cell) return;

      let match = true;

      if (activeCat) {
        match = el.category === activeCat;
      } else if (activeMacro !== 'all') {
        match = el.macro === activeMacro;
      }

      if (match && searchSet) {
        match = searchSet.has(el.number);
      }

      cell.classList.toggle('is-dimmed', !match);
    });

    const isFiltering = Boolean(activeCat) || activeMacro !== 'all' || Boolean(searchSet);
    const laMatch =
      !isFiltering ||
      (!searchSet && (activeCat === 'lanthanide' || (!activeCat && activeMacro === 'metal'))) ||
      (Boolean(searchSet) &&
        (activeCat ? activeCat === 'lanthanide' : activeMacro === 'all' || activeMacro === 'metal') &&
        Array.from(searchSet).some((z) => z >= 57 && z <= 71));
    const acMatch =
      !isFiltering ||
      (!searchSet && (activeCat === 'actinide' || (!activeCat && activeMacro === 'metal'))) ||
      (Boolean(searchSet) &&
        (activeCat ? activeCat === 'actinide' : activeMacro === 'all' || activeMacro === 'metal') &&
        Array.from(searchSet).some((z) => z >= 89 && z <= 103));

    if (laSlotEl) laSlotEl.classList.toggle('is-dimmed', !laMatch);
    if (acSlotEl) acSlotEl.classList.toggle('is-dimmed', !acMatch);
    if (laLabelEl) laLabelEl.classList.toggle('is-dimmed', !laMatch);
    if (acLabelEl) acLabelEl.classList.toggle('is-dimmed', !acMatch);
    syncFblockSlotButtons();
  }

  function syncMacroFilterButtons() {
    macroFilters.querySelectorAll('.filter-chip').forEach((btn) => {
      btn.classList.toggle('active', !state.activeCategory && btn.dataset.macro === state.activeMacro);
    });
  }

  function syncSubLegendButtons() {
    subLegend.querySelectorAll('.sub-pill').forEach((pill) => {
      pill.classList.toggle('active', pill.dataset.category === state.activeCategory);
    });
  }

  // Bind UI Controls
  function bindControls() {
    // Language Switcher (VI / EN)
    langSwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      const nextLang = btn.dataset.lang;
      if (nextLang !== 'vi' && nextLang !== 'en') return;
      if (nextLang === state.lang) return;
      state.lang = nextLang;
      try {
        localStorage.setItem('ptable_lang', nextLang);
      } catch (_) {}
      applyLanguage();
    });

    // Open / Close Applications & Characteristics Detail Modal
    btnOpenDetails.addEventListener('click', () => {
      if (state.displayed) {
        openDetailModal(state.displayed);
      }
    });
    if (btnMobileOpenDetails) {
      btnMobileOpenDetails.addEventListener('click', () => {
        const target = state.locked || state.displayed;
        if (target) {
          openDetailModal(target);
        }
      });
    }
    if (btnMobileUnlock) {
      btnMobileUnlock.addEventListener('click', () => {
        unlockElement(true);
      });
    }
    if (btnMobileScrollTop) {
      btnMobileScrollTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
      });
    }
    btnCloseDetails.addEventListener('click', () => closeDetailModal());
    btnCloseDetailsFooter.addEventListener('click', () => closeDetailModal());
    detailBackdrop.addEventListener('click', () => closeDetailModal());

    // Bonding Lab & Chemistry Tools triggers
    if (btnOpenLab) {
      btnOpenLab.addEventListener('click', () => {
        if (state.atomExpanded) setAtomExpanded(false, true);
        if (window.BondingLab) window.BondingLab.open();
      });
    }
    if (btnOpenVlab) {
      btnOpenVlab.addEventListener('click', () => {
        if (state.atomExpanded) setAtomExpanded(false, true);
        if (window.VirtualLab) window.VirtualLab.open();
      });
    }
    if (btnOpenTools) {
      btnOpenTools.addEventListener('click', () => {
        clearComparePick();
        if (state.atomExpanded) setAtomExpanded(false, true);
        if (window.ChemTools) window.ChemTools.open();
      });
    }
    if (btnSendToLab) {
      btnSendToLab.addEventListener('click', () => {
        if (window.BondingLab && state.displayed) {
          window.BondingLab.openWithElementA(state.displayed);
        }
      });
    }

    // Detail Modal Isotopes -> click any isotope to view 3D atom with exact n⁰ = A - Z
    if (modalIsotopesGrid) {
      modalIsotopesGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.isotope-card');
        if (!card || !state.modalElement) return;
        const massNum = Number(card.dataset.massNumber);
        if (Number.isInteger(massNum)) {
          selectIsotopeFor3D(state.modalElement, massNum);
        }
      });
    }

    // HUD Reset Isotope -> return to default common isotope
    if (btnResetIsotope) {
      btnResetIsotope.addEventListener('click', (e) => {
        e.stopPropagation();
        resetIsotopeToDefault();
      });
    }

    // Atomic Emission Spectrum interactive wavelength tooltip
    if (modalSpectrumBox) {
      const showSpecTooltip = (lineEl) => {
        const tip = modalSpectrumBox.querySelector('.spec-tooltip');
        if (!tip || !lineEl) return;
        const nm = lineEl.dataset.nm;
        const color = lineEl.dataset.color || '#edf1f7';
        const band = lineEl.dataset.band || '';
        const pct = Math.max(8, Math.min(92, Number(lineEl.dataset.pct || 50)));
        tip.innerHTML = `<span class="spec-tip-dot" style="background:${color};"></span><strong>${nm} nm</strong>${band ? `<span class="spec-tip-band">${band}</span>` : ''}`;
        tip.style.left = `${pct.toFixed(1)}%`;
        tip.classList.remove('hidden');
      };
      const hideSpecTooltip = () => {
        const tip = modalSpectrumBox.querySelector('.spec-tooltip');
        if (tip) tip.classList.add('hidden');
      };

      modalSpectrumBox.addEventListener('mouseover', (e) => {
        const hit = e.target.closest('.spec-line-hit');
        if (hit) showSpecTooltip(hit);
      });
      modalSpectrumBox.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget || !e.relatedTarget.closest('.spec-line-hit')) {
          hideSpecTooltip();
        }
      });
      modalSpectrumBox.addEventListener('focusin', (e) => {
        const hit = e.target.closest('.spec-line-hit');
        if (hit) showSpecTooltip(hit);
      });
      modalSpectrumBox.addEventListener('focusout', (e) => {
        if (!e.relatedTarget || !e.relatedTarget.closest('.spec-line-hit')) {
          hideSpecTooltip();
        }
      });
    }

    // View Mode selector (Default / Temperature States / Periodic Trends Heatmap)
    if (viewModeSelect) {
      viewModeSelect.addEventListener('change', () => {
        state.viewMode = viewModeSelect.value;
        applyViewMode();
      });
    }

    // Temperature Slider, Presets & Quick Reset (25°C)
    if (tempSlider) {
      tempSlider.addEventListener('input', () => {
        state.temperatureC = Number(tempSlider.value);
        if (state.viewMode === 'temperature') {
          updateTemperatureView();
        }
      });
    }

    if (tempPresets) {
      tempPresets.addEventListener('click', (e) => {
        const presetBtn = e.target.closest('.temp-preset-btn');
        if (!presetBtn) return;
        state.temperatureC = Number(presetBtn.dataset.temp);
        if (state.viewMode === 'temperature') {
          updateTemperatureView();
        }
      });
    }

    if (tempResetBtn) {
      tempResetBtn.addEventListener('click', () => {
        state.temperatureC = 25;
        if (state.viewMode === 'temperature') {
          updateTemperatureView();
        }
      });
    }

    // Heatmap quick return to Default mode
    if (heatmapResetBtn) {
      heatmapResetBtn.addEventListener('click', () => {
        state.viewMode = 'default';
        applyViewMode();
      });
    }

    // Electron Configuration Bar -> toggle Orbital Box Diagram popover
    if (econfigBar) {
      econfigBar.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleOrbitalPopover();
      });
      econfigBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          toggleOrbitalPopover();
        }
      });
    }

    // Close Orbital Box Diagram popover / Formula Highlight when clicking outside
    document.addEventListener('click', (e) => {
      if (state.orbitalOpen) {
        if (!e.target.closest('#orbital-popover') && !e.target.closest('#econfig-bar')) {
          closeOrbitalPopover();
        }
      }
      if (state.formulaHighlight) {
        if (
          !e.target.closest('#formula-highlight-banner') &&
          !e.target.closest('#tools-modal')
        ) {
          clearFormulaHighlight();
        }
      }
    });

    // Clicking empty space in the table area releases lock / group filter & returns to idle state
    if (elTableSection) {
      elTableSection.addEventListener('click', (e) => {
        if (e.target.closest('.element-cell, .fblock-placeholder, .fblock-series-label')) return;
        if (state.orbitalOpen) return;
        if (window.ChemFacts && window.ChemFacts.isOpen()) return;
        if (state.formulaHighlight) return;
        if (state.locked) {
          unlockElement(true);
        } else if (state.activeCategory !== null || state.activeMacro !== 'all') {
          clearGroupFilters();
        }
      });
    }

    // Keep floating popovers aligned while scrolling or resizing
    const repositionFloatingPopovers = () => {
      const targetEl = getActiveRadiusTarget();
      if (targetEl) {
        positionRadiusPopover(cellMap.get(targetEl.number));
      }
      if (state.orbitalOpen) {
        positionOrbitalPopover();
      }
      if (categoryTooltipAnchor && categoryTooltip && categoryTooltip.classList.contains('is-visible')) {
        positionCategoryTooltip(categoryTooltipAnchor);
      }
    };
    if (elTableSection) {
      elTableSection.addEventListener('scroll', repositionFloatingPopovers, { passive: true });
    }
    if (elInspectorPanel) {
      elInspectorPanel.addEventListener('scroll', repositionFloatingPopovers, { passive: true });
    }
    window.addEventListener('scroll', repositionFloatingPopovers, { passive: true });
    window.addEventListener('blur', () => {
      hideCategoryTooltip();
      if (state.hoverCategory !== null || state.hoverMacro !== null) {
        state.hoverCategory = null;
        state.hoverMacro = null;
        applyFiltering();
      }
    });
    window.addEventListener(
      'resize',
      () => {
        hideCategoryTooltip();
        repositionFloatingPopovers();
        syncMobileTableOrientation();
        syncEmptyPromptCopy();
        if (state.displayed) renderInspectorFields(state.displayed);
        updateMobileActionBar();
      },
      { passive: true }
    );
    window.addEventListener(
      'orientationchange',
      () => {
        requestAnimationFrame(() => {
          syncMobileTableOrientation();
          syncEmptyPromptCopy();
          if (state.displayed) renderInspectorFields(state.displayed);
          updateMobileActionBar();
        });
      },
      { passive: true }
    );

    // Keyboard shortcuts: Escape (close modal / popover / highlight / unlock / clear) & Arrow keys (Left/Right: Z±1, Up/Down: column above/below)
    const findVerticalNeighbor = (current, direction) => {
      let best = null;
      for (let i = 0; i < window.ELEMENTS.length; i++) {
        const el = window.ELEMENTS[i];
        if (el.col !== current.col) continue;
        if (direction < 0 && el.row < current.row) {
          if (!best || el.row > best.row) best = el;
        } else if (direction > 0 && el.row > current.row) {
          if (!best || el.row < best.row) best = el;
        }
      }
      return best;
    };

    window.addEventListener('keydown', (e) => {
      const tag = e.target && e.target.tagName;
      const isTyping =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        (e.target && e.target.isContentEditable);
      const labOpen = Boolean(window.BondingLab && window.BondingLab.isOpen());
      const vlabOpen = Boolean(window.VirtualLab && window.VirtualLab.isOpen());
      const toolsOpen = Boolean(window.ChemTools && window.ChemTools.isOpen());
      const factsOpen = Boolean(window.ChemFacts && window.ChemFacts.isOpen());

      if (e.key === 'Escape') {
        if (toolsOpen) {
          if (window.ChemTools.hasOpenDropdown()) {
            window.ChemTools.closeDropdowns();
          } else {
            window.ChemTools.close();
          }
        } else if (vlabOpen) {
          window.VirtualLab.close();
        } else if (labOpen) {
          if (window.BondingLab.hasOpenDropdown()) {
            window.BondingLab.closeDropdowns();
          } else {
            window.BondingLab.close();
          }
        } else if (state.modalElement) {
          closeDetailModal();
        } else if (state.atomExpanded) {
          setAtomExpanded(false);
        } else if (state.orbitalOpen) {
          closeOrbitalPopover();
        } else if (factsOpen) {
          window.ChemFacts.close();
        } else if (state.comparePick) {
          clearComparePick();
        } else if (state.formulaHighlight) {
          clearFormulaHighlight();
        } else if (state.locked) {
          unlockElement(true);
        } else if (state.searchQuery) {
          searchInput.value = '';
          state.searchQuery = '';
          searchClear.classList.add('hidden');
          applyFiltering();
        } else if (state.activeCategory !== null || state.activeMacro !== 'all') {
          clearGroupFilters();
        } else if (state.displayed) {
          clearDisplay();
        }
        return;
      }

      const isArrowKey =
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown';

      if (!isTyping && !labOpen && !vlabOpen && !toolsOpen && !state.modalElement && factsOpen && isArrowKey) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          window.ChemFacts.next();
        }
        return;
      }

      if (!isTyping && !labOpen && !vlabOpen && !toolsOpen && isArrowKey) {
        const current = state.locked || state.modalElement;
        if (!current) return;
        e.preventDefault();

        let nextEl = null;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          const delta = e.key === 'ArrowRight' ? 1 : -1;
          const nextZ = Math.max(1, Math.min(window.ELEMENTS.length, current.number + delta));
          if (nextZ !== current.number) {
            nextEl = window.ELEMENTS.find((item) => item.number === nextZ) || null;
          }
        } else {
          const dir = e.key === 'ArrowDown' ? 1 : -1;
          nextEl = findVerticalNeighbor(current, dir);
        }

        if (!nextEl || nextEl.number === current.number) return;

        if (state.locked) {
          hoveredEl = null;
          lockElement(nextEl);
          const cell = cellMap.get(nextEl.number);
          if (cell) {
            cell.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
            requestAnimationFrame(() => positionRadiusPopover(cell));
          }
        }
        if (state.modalElement) {
          state.modalElement = nextEl;
          renderDetailModal(nextEl);
        }
      }
    });

    // 3D Atom Stage Controls
    btnAutoRotate.addEventListener('click', () => {
      state.autoRotate = !state.autoRotate;
      atomRenderer.setAutoRotate(state.autoRotate);
      btnAutoRotate.classList.toggle('active', state.autoRotate);
      autoRotateIcon.textContent = state.autoRotate ? '⏸' : '▶';
    });

    if (btnOrbitSpeed) {
      btnOrbitSpeed.addEventListener('click', () => {
        state.orbitSpeedIdx = (state.orbitSpeedIdx + 1) % ORBIT_SPEEDS.length;
        const speed = ORBIT_SPEEDS[state.orbitSpeedIdx];
        atomRenderer.setOrbitSpeed(speed);
        updateOrbitSpeedUI();
      });
    }

    btnMode.addEventListener('click', () => {
      state.atomMode = state.atomMode === '3d' ? 'bohr' : '3d';
      atomRenderer.setMode(state.atomMode);
      modeLabel.textContent = state.atomMode === '3d' ? t().mode3d : t().modeBohr;
      btnMode.classList.toggle('active', state.atomMode === 'bohr');
    });

    btnReset.addEventListener('click', () => {
      atomRenderer.resetView();
    });

    // Mobile-only 3D thumb controls (+ / − / ↻)
    if (btnAtomZoomIn) {
      btnAtomZoomIn.addEventListener('click', () => {
        atomRenderer.zoomBy(1.22);
      });
    }
    if (btnAtomZoomOut) {
      btnAtomZoomOut.addEventListener('click', () => {
        atomRenderer.zoomBy(1 / 1.22);
      });
    }
    if (btnAtomZoomReset) {
      btnAtomZoomReset.addEventListener('click', () => {
        atomRenderer.resetView();
      });
    }

    if (btnExpandAtom) {
      btnExpandAtom.addEventListener('click', () => {
        setAtomExpanded(!state.atomExpanded);
      });
    }
    if (elAtomExpandBackdrop) {
      elAtomExpandBackdrop.addEventListener('click', () => {
        setAtomExpanded(false);
      });
    }
    if (elAtomExpandedBanner) {
      elAtomExpandedBanner.addEventListener('click', (e) => {
        if (e.target.closest('#btn-close-atom-expand')) {
          setAtomExpanded(false);
        }
      });
    }

    // Macro filter buttons
    macroFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      setMacroFilter(btn.dataset.macro);
    });
    macroFilters.querySelectorAll('.filter-chip').forEach((btn) => {
      const macroKey = btn.dataset.macro;
      if (!macroKey || macroKey === 'all') return;
      btn.addEventListener('mouseenter', () => {
        if (isMobileExperience()) return;
        state.hoverMacro = macroKey;
        applyFiltering();
        showCategoryTooltip(macroKey, btn);
      });
      btn.addEventListener('mouseleave', () => {
        if (state.hoverMacro === macroKey) {
          state.hoverMacro = null;
          applyFiltering();
        }
        hideCategoryTooltip();
      });
    });

    // Search input
    searchInput.addEventListener('input', () => {
      clearFormulaHighlight();
      state.searchQuery = searchInput.value;
      searchClear.classList.toggle('hidden', !state.searchQuery);
      applyFiltering();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && state.searchQuery.trim()) {
        const matches = getSearchMatches(state.searchQuery);
        if (matches && matches.length > 0) {
          hoveredEl = null;
          lockElement(matches[0]);
          const cell = cellMap.get(matches[0].number);
          if (cell) {
            cell.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
            requestAnimationFrame(() => positionRadiusPopover(cell));
          }
        }
      }
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClear.classList.add('hidden');
      applyFiltering();
      searchInput.focus();
    });
  }

  // Boot Application in clean idle state (no element hovered or locked yet)
  buildSubLegend();
  buildPeriodicTable();
  if (window.BondingLab) {
    window.BondingLab.init({
      getLang: () => state.lang,
      onOpen: () => {
        if (state.atomExpanded) setAtomExpanded(false, true);
        closeOrbitalPopover();
        if (window.ChemFacts) window.ChemFacts.close();
        syncAtomPause();
      },
      onClose: () => syncAtomPause()
    });
  }
  if (window.VirtualLab) {
    window.VirtualLab.init({
      getLang: () => state.lang,
      onOpen: () => {
        if (state.atomExpanded) setAtomExpanded(false, true);
        closeOrbitalPopover();
        if (window.ChemFacts) window.ChemFacts.close();
        syncAtomPause();
      },
      onClose: () => syncAtomPause()
    });
  }
  if (window.ReactionLab) {
    window.ReactionLab.init({
      getLang: () => state.lang
    });
  }
  if (window.OrganicBuilder) {
    window.OrganicBuilder.init({
      getLang: () => state.lang
    });
  }
  if (window.ChemTools) {
    window.ChemTools.init({
      getLang: () => state.lang,
      onOpen: () => {
        if (state.atomExpanded) setAtomExpanded(false, true);
        closeOrbitalPopover();
        if (window.ChemFacts) window.ChemFacts.close();
        syncAtomPause();
      },
      onClose: () => syncAtomPause(),
      onHighlightElements: (payload) => setFormulaHighlight(payload)
    });
  }
  if (window.ChemFacts) {
    window.ChemFacts.init({
      getLang: () => state.lang,
      getElementByZ: (z) => window.ELEMENTS.find((item) => item.number === z) || null,
      onOpen: () => {
        if (state.atomExpanded) setAtomExpanded(false, true);
        closeOrbitalPopover();
        syncAtomPause();
      },
      onClose: () => syncAtomPause(),
      onOpenElement: (el) => {
        if (!el) return;
        lockElement(el);
        openDetailModal(el);
      }
    });
  }
  bindControls();
  syncMobileTableOrientation();
  applyViewMode();
  applyLanguage();
  clearDisplay();
  updateLockUI();
  updateMobileActionBar();
})();
