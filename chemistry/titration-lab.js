// Interactive Periodic Table — Tab 3: Acid-Base Titration Lab (titration-lab.js)
// Covers Grade 11 (GDPT 2018) classic titration systems:
//   1) HCl + NaOH (Strong Acid + Strong Base)
//   2) CH3COOH + NaOH (Weak Acid + Strong Base, Ka = 1.75e-5)
//   3) NH3 + HCl (Weak Base + Strong Acid, Kb = 1.80e-5)
// Exact charge-balance Bisection pH solver, real-time Burette & Erlenmeyer Flask Pure-SVG,
// adaptive pH(V) titration curve, 3 real indicators with mismatch warnings, and Blind Practice Mode.

(function () {
  const KW = 1e-14;
  const V0_ML = 25.0; // Fixed analyte volume in Erlenmeyer flask (mL)
  const MAX_ADD_ML = 50.0; // Max burette capacity (mL)

  const TITRATION_SYSTEMS = [
    {
      id: 'hcl_naoh',
      chipLabel: 'HCl + NaOH',
      type: 'strong_acid_strong_base',
      analyteFormula: 'HCl',
      titrantFormula: 'NaOH',
      analyteKind: 'acid',
      ka: null,
      kb: null,
      equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
      titleVi: 'Axit mạnh + Bazơ mạnh (HCl + NaOH)',
      titleEn: 'Strong Acid + Strong Base (HCl + NaOH)',
      bestIndicators: ['bromothymol_blue', 'phenolphthalein', 'methyl_orange'],
      okIndicators: ['phenolphthalein', 'methyl_orange'],
      warnIndicators: [],
      badIndicators: []
    },
    {
      id: 'ch3cooh_naoh',
      chipLabel: 'CH₃COOH + NaOH',
      type: 'weak_acid_strong_base',
      analyteFormula: 'CH₃COOH',
      titrantFormula: 'NaOH',
      analyteKind: 'acid',
      ka: 1.75e-5, // pKa = 4.76
      kb: null,
      equation: 'CH₃COOH(aq) + NaOH(aq) → CH₃COONa(aq) + H₂O(l)',
      titleVi: 'Axit yếu + Bazơ mạnh (CH₃COOH + NaOH)',
      titleEn: 'Weak Acid + Strong Base (CH₃COOH + NaOH)',
      bestIndicators: ['phenolphthalein'],
      okIndicators: [],
      warnIndicators: ['bromothymol_blue'],
      badIndicators: ['methyl_orange']
    },
    {
      id: 'nh3_hcl',
      chipLabel: 'NH₃ + HCl',
      type: 'weak_base_strong_acid',
      analyteFormula: 'NH₃',
      titrantFormula: 'HCl',
      analyteKind: 'base',
      ka: null,
      kb: 1.8e-5, // pKb = 4.74
      equation: 'NH₃(aq) + HCl(aq) → NH₄Cl(aq)',
      titleVi: 'Bazơ yếu + Axit mạnh (NH₃ + HCl)',
      titleEn: 'Weak Base + Strong Acid (NH₃ + HCl)',
      bestIndicators: ['methyl_orange'],
      okIndicators: [],
      warnIndicators: ['bromothymol_blue'],
      badIndicators: ['phenolphthalein']
    }
  ];

  const INDICATORS = [
    {
      id: 'phenolphthalein',
      nameVi: 'Phenolphthalein',
      nameEn: 'Phenolphthalein',
      pHMin: 8.2,
      pHMax: 10.0,
      bandFill: 'rgba(232, 92, 168, 0.14)',
      bandStroke: 'rgba(232, 92, 168, 0.48)',
      // 3-stop RGBA: <8.2 colorless, mid pale pink, >=10.0 deep carmine pink
      colorLow: [208, 224, 240, 0.18],
      colorMid: [238, 128, 186, 0.50],
      colorHigh: [224, 46, 140, 0.78],
      rangeDescVi: 'pH 8.2 – 10.0 (Không màu → Hồng cánh sen)',
      rangeDescEn: 'pH 8.2 – 10.0 (Colorless → Magenta Pink)'
    },
    {
      id: 'methyl_orange',
      nameVi: 'Methyl da cam (MO)',
      nameEn: 'Methyl Orange',
      pHMin: 3.1,
      pHMax: 4.4,
      bandFill: 'rgba(240, 148, 56, 0.14)',
      bandStroke: 'rgba(240, 148, 56, 0.48)',
      // 3-stop RGBA: <3.1 red, mid orange, >=4.4 golden yellow
      colorLow: [226, 62, 68, 0.76],
      colorMid: [242, 146, 52, 0.68],
      colorHigh: [238, 204, 62, 0.62],
      rangeDescVi: 'pH 3.1 – 4.4 (Đỏ → Cam → Vàng)',
      rangeDescEn: 'pH 3.1 – 4.4 (Red → Orange → Yellow)'
    },
    {
      id: 'bromothymol_blue',
      nameVi: 'Bromothymol xanh (BTB)',
      nameEn: 'Bromothymol Blue',
      pHMin: 6.0,
      pHMax: 7.6,
      bandFill: 'rgba(72, 188, 152, 0.14)',
      bandStroke: 'rgba(72, 188, 152, 0.48)',
      // 3-stop RGBA: <6.0 yellow, mid emerald green, >=7.6 royal blue
      colorLow: [236, 204, 58, 0.68],
      colorMid: [64, 186, 124, 0.68],
      colorHigh: [56, 138, 226, 0.74],
      rangeDescVi: 'pH 6.0 – 7.6 (Vàng → Xanh lục → Xanh lam)',
      rangeDescEn: 'pH 6.0 – 7.6 (Yellow → Green → Blue)'
    }
  ];

  const TIT_I18N = {
    vi: {
      title: 'Phòng Lab Chuẩn Độ Acid–Base',
      subtitle: 'Mô phỏng chuẩn độ Burette, đường cong pH(V), chỉ thị màu & chế độ Thực hành ẩn nồng độ',
      footerHint:
        'Mẹo: Bật "Chế độ Thực hành" để tự nhỏ giọt dò điểm đổi màu chỉ thị và tính nồng độ ẩn theo công thức C₁V₁ = C₂V₂.',
      sysSelectLabel: 'Hệ chuẩn độ:',
      indicatorLabel: 'Chất chỉ thị:',
      buretteTitle: 'BỘ DỤNG CỤ CHUẨN ĐỘ (BURETTE & BÌNH TAM GIÁC)',
      curveTitle: 'ĐƯỜNG CONG CHUẨN ĐỘ pH(V)',
      analyteVolLabel: 'Mẫu V₀ = 25.0 mL',
      titrantAddedLabel: 'Đã nhỏ V',
      eqPointLabel: 'Điểm tương đương',
      hiddenEqLabel: 'Đang ẩn điểm tương đương (Thực hành)',
      btnDrop005: '+1 giọt (0.05 mL)',
      btnDrop05: '+0.5 mL',
      btnAdd2: '+2 mL',
      btnAdd5: '+5 mL',
      btnResetVol: '↺ Làm mới (0 mL)',
      sliderVolLabel: 'Thể tích nhỏ từ Burette (V)',
      sliderC0Label: 'Nồng độ mẫu trong bình (C₀)',
      sliderCtLabel: 'Nồng độ dung dịch chuẩn trên Burette',
      showFullCurveLabel: 'Hiện đường cong dự kiến',
      practiceToggleOn: '🎯 Chế độ Thực hành: ĐANG BẬT',
      practiceToggleOff: '🔍 Chế độ Khám phá (Bấm để Thực hành ẩn C₀)',
      hidePhLabel: 'Ẩn đồng hồ pH (dò thuần bằng màu chỉ thị)',
      practicePrompt: (analyte) => `Tính nồng độ C(${analyte}) theo công thức C₁·V₁ = C₂·V₂ (mol/L):`,
      practicePlaceholder: 'VD: 0.105',
      checkBtn: 'Kiểm tra đáp án',
      newSampleBtn: '🎲 Đề ngẫu nhiên mới',
      revealBtn: '👁 Xem đáp án',
      gradeInvalid: 'Hãy nhập giá trị nồng độ hợp lệ (lớn hơn 0).',
      gradeExcellent: (errPct, guess, actual) =>
        `Xuất sắc! Sai số ${errPct.toFixed(2)}% (≤ 2%). Bạn nhập ${guess.toFixed(3)} M — Đáp án đúng: ${actual.toFixed(3)} M.`,
      gradePass: (errPct, guess, actual) =>
        `Đạt yêu cầu! Sai số ${errPct.toFixed(2)}% (≤ 5%). Bạn nhập ${guess.toFixed(3)} M — Đáp án đúng: ${actual.toFixed(3)} M.`,
      gradeRetry: (errPct, guess, veq) =>
        `Chưa chính xác (sai số ${errPct.toFixed(2)}% > 5%, bạn nhập ${guess.toFixed(3)} M). Hãy dò kỹ giọt đổi màu quanh vùng tương đương (V_tđ ≈ ${veq.toFixed(1)} mL) và thử lại!`,
      revealedMsg: (actual, veq) =>
        `Đáp án bí mật: C₀ = ${actual.toFixed(3)} M (điểm tương đương tại V = ${veq.toFixed(2)} mL).`,
      phMeterHidden: 'pH: Đã ẩn',
      explainEyebrow: 'PHÂN TÍCH QUÁ TRÌNH CHUẨN ĐỘ',
      bandLegend: 'Dải đổi màu chỉ thị',
      warnPrefix: 'CẢNH BÁO CHỈ THỊ KHÔNG PHÙ HỢP:',
      advisoryPrefix: 'LƯU Ý CHỈ THỊ:',
      goodBadge: 'Chỉ thị phù hợp',
      bestBadge: 'Chỉ thị tối ưu',
      warnBadge: 'Chuyển màu hơi lệch',
      badBadge: 'Sai số lớn — Không nên dùng'
    },
    en: {
      title: 'Acid–Base Titration Lab',
      subtitle: 'Interactive Burette, exact charge-balance pH(V) curve, color indicators & unknown-C₀ Practice mode',
      footerHint:
        'Tip: Switch on "Practice Mode" to titrate an unknown sample by eye using indicator color change and solve C₁V₁ = C₂V₂.',
      sysSelectLabel: 'Titration System:',
      indicatorLabel: 'Indicator:',
      buretteTitle: 'TITRATION APPARATUS (BURETTE & FLASK)',
      curveTitle: 'TITRATION CURVE pH(V)',
      analyteVolLabel: 'Analyte V₀ = 25.0 mL',
      titrantAddedLabel: 'Added V',
      eqPointLabel: 'Equivalence Point',
      hiddenEqLabel: 'Equivalence point hidden (Practice)',
      btnDrop005: '+1 drop (0.05 mL)',
      btnDrop05: '+0.5 mL',
      btnAdd2: '+2 mL',
      btnAdd5: '+5 mL',
      btnResetVol: '↺ Reset (0 mL)',
      sliderVolLabel: 'Burette Volume Added (V)',
      sliderC0Label: 'Analyte Concentration (C₀)',
      sliderCtLabel: 'Standard Titrant Concentration',
      showFullCurveLabel: 'Show full curve preview',
      practiceToggleOn: '🎯 Practice Mode: ON',
      practiceToggleOff: '🔍 Explore Mode (Click to Practice Unknown C₀)',
      hidePhLabel: 'Hide pH meter (rely purely on indicator color)',
      practicePrompt: (analyte) => `Enter calculated C(${analyte}) using C₁·V₁ = C₂·V₂ (mol/L):`,
      practicePlaceholder: 'e.g. 0.105',
      checkBtn: 'Check Answer',
      newSampleBtn: '🎲 New Unknown Sample',
      revealBtn: '👁 Reveal Answer',
      gradeInvalid: 'Please enter a valid positive molarity value.',
      gradeExcellent: (errPct, guess, actual) =>
        `Excellent! Error ${errPct.toFixed(2)}% (≤ 2%). Your answer ${guess.toFixed(3)} M — True value: ${actual.toFixed(3)} M.`,
      gradePass: (errPct, guess, actual) =>
        `Pass! Error ${errPct.toFixed(2)}% (≤ 5%). Your answer ${guess.toFixed(3)} M — True value: ${actual.toFixed(3)} M.`,
      gradeRetry: (errPct, guess, veq) =>
        `Off target (${errPct.toFixed(2)}% error > 5%, entered ${guess.toFixed(3)} M). Watch carefully for the first color shift near V_eq ≈ ${veq.toFixed(1)} mL and try again!`,
      revealedMsg: (actual, veq) =>
        `True hidden sample concentration: C₀ = ${actual.toFixed(3)} M (equivalence at V = ${veq.toFixed(2)} mL).`,
      phMeterHidden: 'pH: Hidden',
      explainEyebrow: 'TITRATION ANALYSIS & EQUIVALENCE NOTES',
      bandLegend: 'Indicator transition band',
      warnPrefix: 'INDICATOR MISMATCH WARNING:',
      advisoryPrefix: 'INDICATOR NOTE:',
      goodBadge: 'Suitable indicator',
      bestBadge: 'Optimal indicator',
      warnBadge: 'Slightly shifted endpoint',
      badBadge: 'Large error — Unsuitable'
    }
  };

  let state = {
    initialized: false,
    lang: 'vi',
    systemId: 'hcl_naoh',
    indicatorId: 'phenolphthalein',
    c0: 0.10,
    cTitrant: 0.10,
    vAdd: 0.0,
    showFullCurve: true,
    practiceMode: false,
    secretC0: 0.112,
    hidePhInPractice: false,
    practiceGuess: '',
    practiceResult: null, // { status: 'excellent'|'pass'|'retry'|'revealed'|'invalid', msg: string }
    cachedCurveKey: '',
    cachedCurvePts: []
  };

  let callbacks = {
    getLang: () => 'vi'
  };

  let hostEl = null;

  function dict() {
    return TIT_I18N[state.lang] || TIT_I18N.vi;
  }

  function findSystem(id) {
    return TITRATION_SYSTEMS.find((s) => s.id === id) || TITRATION_SYSTEMS[0];
  }

  function findIndicator(id) {
    return INDICATORS.find((ind) => ind.id === id) || INDICATORS[0];
  }

  function getActiveC0() {
    return state.practiceMode ? state.secretC0 : state.c0;
  }

  function generateSecretC0() {
    // Random 3-decimal value guaranteed to have V_eq cleanly within [9 mL, 40 mL]
    const maxReachable = Math.min(0.16, Math.max(0.08, state.cTitrant * 1.6));
    const raw = 0.06 + Math.random() * (maxReachable - 0.06);
    return Math.round(raw * 1000) / 1000;
  }

  // Exact Charge-Balance Bisection pH Solver (55 iterations over pH ∈ [0, 14])
  // f(pH) is strictly monotonically decreasing on [0, 14]: f(0) > 0, f(14) < 0.
  function calcTitrationPH(sys, c0, cTitrant, vAdd) {
    const vTot = V0_ML + vAdd;
    const calcChargeBalance = (ph) => {
      const H = Math.pow(10, -ph);
      const OH = KW / H;
      if (sys.type === 'strong_acid_strong_base') {
        // Ca = c0 (analyte HCl), Cb = cTitrant (burette NaOH)
        return H + (cTitrant * vAdd) / vTot - OH - (c0 * V0_ML) / vTot;
      }
      if (sys.type === 'weak_acid_strong_base') {
        // Ca = c0 (analyte CH3COOH), Cb = cTitrant (burette NaOH)
        const alphaA = sys.ka / (H + sys.ka);
        return H + (cTitrant * vAdd) / vTot - OH - ((c0 * V0_ML) / vTot) * alphaA;
      }
      // weak_base_strong_acid: Cb = c0 (analyte NH3), Ca = cTitrant (burette HCl)
      const alphaBH = (sys.kb * H) / (KW + sys.kb * H);
      return H + ((c0 * V0_ML) / vTot) * alphaBH - OH - (cTitrant * vAdd) / vTot;
    };

    let lo = 0.0;
    let hi = 14.0;
    for (let i = 0; i < 55; i++) {
      const mid = 0.5 * (lo + hi);
      if (calcChargeBalance(mid) > 0) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return 0.5 * (lo + hi);
  }

  function calcEquivalenceVolume(c0, cTitrant) {
    return (c0 * V0_ML) / Math.max(1e-6, cTitrant);
  }

  // Build adaptive high-resolution pH(V) curve cached for current (system, activeC0, cTitrant)
  function ensureFullCurve(sys, activeC0, cTitrant) {
    const key = `${sys.id}|${activeC0.toFixed(4)}|${cTitrant.toFixed(4)}`;
    if (state.cachedCurveKey === key && state.cachedCurvePts.length > 0) {
      return state.cachedCurvePts;
    }

    const vEq = calcEquivalenceVolume(activeC0, cTitrant);
    const vSet = new Set();
    for (let v = 0; v <= MAX_ADD_ML; v += 0.5) {
      vSet.add(Number(v.toFixed(2)));
    }
    // Add fine steps around V_eq for razor-sharp vertical jump resolution
    if (vEq >= 0 && vEq <= MAX_ADD_ML) {
      const offsets = [-1.5, -0.8, -0.4, -0.2, -0.1, -0.05, -0.02, 0, 0.02, 0.05, 0.1, 0.2, 0.4, 0.8, 1.5];
      offsets.forEach((off) => {
        const pt = vEq + off;
        if (pt >= 0 && pt <= MAX_ADD_ML) {
          vSet.add(Number(pt.toFixed(3)));
        }
      });
    }

    const sortedV = Array.from(vSet).sort((a, b) => a - b);
    const pts = sortedV.map((v) => ({
      v,
      ph: calcTitrationPH(sys, activeC0, cTitrant, v)
    }));

    state.cachedCurveKey = key;
    state.cachedCurvePts = pts;
    return pts;
  }

  // Smooth 3-stop RGBA interpolation across indicator transition range
  function interpolateRGBA(cA, cB, t) {
    const u = Math.max(0, Math.min(1, t));
    const r = Math.round(cA[0] + (cB[0] - cA[0]) * u);
    const g = Math.round(cA[1] + (cB[1] - cA[1]) * u);
    const b = Math.round(cA[2] + (cB[2] - cA[2]) * u);
    const a = (cA[3] + (cB[3] - cA[3]) * u).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function getIndicatorColor(ind, ph) {
    if (ph <= ind.pHMin) {
      const [r, g, b, a] = ind.colorLow;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    if (ph >= ind.pHMax) {
      const [r, g, b, a] = ind.colorHigh;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    const frac = (ph - ind.pHMin) / (ind.pHMax - ind.pHMin);
    if (frac < 0.5) {
      return interpolateRGBA(ind.colorLow, ind.colorMid, frac * 2);
    }
    return interpolateRGBA(ind.colorMid, ind.colorHigh, (frac - 0.5) * 2);
  }

  function getIndicatorSuitability(sys, indId) {
    if (sys.badIndicators.includes(indId)) return 'bad';
    if (sys.warnIndicators.includes(indId)) return 'warn';
    if (sys.bestIndicators[0] === indId && sys.type === 'strong_acid_strong_base') return 'best';
    return 'good';
  }

  function buildIndicatorWarningText(sys, ind) {
    const isEn = state.lang === 'en';
    const d = dict();
    const status = getIndicatorSuitability(sys, ind.id);

    if (status === 'bad') {
      if (sys.id === 'nh3_hcl' && ind.id === 'phenolphthalein') {
        return {
          status: 'bad',
          text: isEn
            ? `${d.warnPrefix} NH₃ + HCl equivalence occurs in acidic medium (pH_eq ≈ 5.28 < 7). Phenolphthalein shifts at pH 8.2–10.0 long before equivalence, causing a huge titration error — switch to Methyl Orange!`
            : `${d.warnPrefix} Chuẩn độ NH₃ bằng HCl có điểm tương đương trong môi trường axit (pH_tđ ≈ 5.28 < 7). Phenolphthalein đổi màu tại pH 8.2–10.0 khiến dung dịch mất màu từ rất sớm trước điểm tương đương — hãy dùng Methyl da cam!`
        };
      }
      if (sys.id === 'ch3cooh_naoh' && ind.id === 'methyl_orange') {
        return {
          status: 'bad',
          text: isEn
            ? `${d.warnPrefix} CH₃COOH + NaOH equivalence lies in basic medium (pH_eq ≈ 8.72 > 7). Methyl Orange changes at pH 3.1–4.4 inside the acidic buffer zone well before equivalence — switch to Phenolphthalein!`
            : `${d.warnPrefix} Chuẩn độ CH₃COOH bằng NaOH có điểm tương đương trong môi trường kiềm (pH_tđ ≈ 8.72 > 7). Methyl da cam đổi màu ở pH 3.1–4.4 ngay giữa vùng đệm axit nên dừng chuẩn độ sai lệch rất lớn — hãy dùng Phenolphthalein!`
        };
      }
    }

    if (status === 'warn') {
      if (sys.id === 'ch3cooh_naoh') {
        return {
          status: 'warn',
          text: isEn
            ? `${d.advisoryPrefix} Bromothymol Blue (pH 6.0–7.6) begins turning green/blue slightly early before the steep jump around pH_eq ≈ 8.72. Phenolphthalein gives a sharper endpoint.`
            : `${d.advisoryPrefix} Bromothymol xanh (pH 6.0–7.6) bắt đầu chuyển xanh hơi sớm trước điểm tương đương pH_tđ ≈ 8.72. Nên ưu tiên Phenolphthalein cho kết quả sắc nét nhất.`
        };
      }
      if (sys.id === 'nh3_hcl') {
        return {
          status: 'warn',
          text: isEn
            ? `${d.advisoryPrefix} Bromothymol Blue (pH 6.0–7.6) finishes its color change slightly early before pH_eq ≈ 5.28. Methyl Orange (3.1–4.4) hits the steep region cleanly.`
            : `${d.advisoryPrefix} Bromothymol xanh (pH 6.0–7.6) chuyển vàng hơi sớm so với điểm tương đương pH_tđ ≈ 5.28. Methyl da cam (3.1–4.4) cho bước nhảy chính xác hơn.`
        };
      }
    }

    return null;
  }

  // Left Frame SVG: Burette (0–50 mL), stopcock valve, falling drop, Erlenmeyer flask & pH meter
  function buildBuretteSVG(sys, ind, currentPH) {
    const d = dict();
    const liquidColor = getIndicatorColor(ind, currentPH);

    // Burette scale 0 mL (top y=32) to 50 mL (bottom y=132) => height 100px
    const burTopY = 32;
    const burBotY = 132;
    const burFillTopY = burTopY + (state.vAdd / MAX_ADD_ML) * (burBotY - burTopY);
    const burFillH = Math.max(0, burBotY - burFillTopY);

    // Flask solution rises as Vtot goes from 25 mL (34% fill height) to 75 mL (78% fill height)
    const fillRatio = (V0_ML + state.vAdd) / (V0_ML + MAX_ADD_ML); // 0.333 .. 1.0
    const flaskBotY = 232;
    const flaskMaxH = 54;
    const flaskLiquidH = 18 + fillRatio * (flaskMaxH - 18); // ~30 .. 54 px
    const flaskSurfaceY = flaskBotY - flaskLiquidH;

    // Digital pH Meter readout (optionally hidden in Blind Practice mode)
    const showPh = !(state.practiceMode && state.hidePhInPractice);
    const phDisplayText = showPh ? `pH = ${currentPH.toFixed(2)}` : d.phMeterHidden;

    return `
      <svg class="tit-apparatus-svg" viewBox="0 0 280 258" role="img" aria-label="${d.buretteTitle}">
        <defs>
          <!-- Interior shape clip of conical Erlenmeyer flask -->
          <clipPath id="tit-flask-clip">
            <path d="M 106 160 L 122 160 L 122 176 L 148 212 Q 154 226 140 232 L 88 232 Q 74 226 80 212 L 106 176 L 106 160 Z" />
          </clipPath>
        </defs>

        <!-- Stand Rod & Clamp Arm -->
        <rect x="42" y="16" width="6" height="224" rx="2" fill="#3b4354" />
        <rect x="26" y="238" width="160" height="8" rx="3" fill="#475569" />
        <rect x="48" y="64" width="54" height="5" rx="1.5" fill="#64748b" />

        <!-- BURETTE BODY (x=104..124, y=26..138) -->
        <!-- Graduated clear titrant inside burette -->
        <rect id="tit-svg-bur-liquid" x="106" y="${burFillTopY.toFixed(1)}" width="16" height="${burFillH.toFixed(1)}"
              fill="rgba(162, 206, 240, 0.36)" />
        <!-- Burette Glass Outline & Narrow Tip -->
        <path d="M 103 24 L 106 26 L 106 135 L 112 146 L 112 155 M 125 24 L 122 26 L 122 135 L 116 146 L 116 155"
              fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Burette Volume Graduation Ticks (0, 10, 20, 30, 40, 50 mL) -->
        ${[0, 10, 20, 30, 40, 50]
          .map((ml) => {
            const yTick = (burTopY + (ml / MAX_ADD_ML) * (burBotY - burTopY)).toFixed(1);
            return `
              <line x1="106" y1="${yTick}" x2="112" y2="${yTick}" stroke="#94a3b8" stroke-width="1" />
              <text x="100" y="${Number(yTick) + 3}" text-anchor="end" class="tit-svg-tick">${ml}</text>
            `;
          })
          .join('')}

        <!-- Titrant Badge next to Burette -->
        <rect x="132" y="54" width="108" height="36" rx="5" fill="#181c26" stroke="#3d5273" stroke-width="1.1" />
        <text x="186" y="68" text-anchor="middle" class="tit-svg-bur-lbl">Burette: ${sys.titrantFormula}</text>
        <text id="tit-svg-bur-val" x="186" y="83" text-anchor="middle" class="tit-svg-bur-val">
          V = ${state.vAdd.toFixed(2)} mL
        </text>

        <!-- Stopcock Valve Handle -->
        <rect x="109" y="139" width="10" height="5" rx="1.5" fill="#d4b47c" />
        <line x1="121" y1="141.5" x2="128" y2="141.5" stroke="#d4b47c" stroke-width="2.4" stroke-linecap="round" />

        <!-- Falling Drop (animated via CSS when drop added) -->
        <circle id="tit-drop-dot" cx="114" cy="158" r="2.8" fill="#a2cef0" opacity="0" />

        <!-- ERLENMEYER FLASK (center x=114, neck x=106..122, base y=232) -->
        <!-- Indicator-colored Solution inside Flask -->
        <rect id="tit-svg-flask-liquid" x="72" y="${flaskSurfaceY.toFixed(1)}" width="84" height="${(flaskBotY - flaskSurfaceY + 2).toFixed(1)}"
              fill="${liquidColor}" clip-path="url(#tit-flask-clip)" />
        <!-- Meniscus sheen line -->
        <line id="tit-svg-flask-surface" x1="80" y1="${flaskSurfaceY.toFixed(1)}" x2="148" y2="${flaskSurfaceY.toFixed(1)}"
              stroke="rgba(255,255,255,0.34)" stroke-width="1.1" clip-path="url(#tit-flask-clip)" />

        <!-- Glass Flask Outline -->
        <path d="M 103 158 L 106 160 L 106 176 L 80 212 Q 73 226 88 232 L 140 232 Q 155 226 148 212 L 122 176 L 122 160 L 125 158"
              fill="none" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Digital pH Meter Probe & Box on Right -->
        <path d="M 120 156 L 120 220" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="none" opacity="0.65" />
        <path d="M 120 156 Q 156 138 192 156" fill="none" stroke="#64748b" stroke-width="1.4" />

        <g class="tit-ph-meter-box">
          <rect x="164" y="158" width="106" height="46" rx="6" fill="#181c26" stroke="#d4b47c" stroke-width="1.4" />
          <text x="217" y="173" text-anchor="middle" class="tit-svg-meter-eyebrow">${sys.analyteFormula} (${V0_ML} mL)</text>
          <text id="tit-svg-ph-val" x="217" y="193" text-anchor="middle" class="tit-svg-meter-ph ${showPh ? '' : 'is-masked'}">
            ${phDisplayText}
          </text>
        </g>

        <!-- Indicator Swatch Label under Meter -->
        <rect x="164" y="210" width="106" height="22" rx="4" fill="#151922" stroke="rgba(148,163,184,0.22)" stroke-width="1" />
        <circle id="tit-svg-ind-dot" cx="176" cy="221" r="5" fill="${liquidColor}" stroke="#cbd5e1" stroke-width="0.9" />
        <text x="223" y="224" text-anchor="middle" class="tit-svg-ind-name">
          ${state.lang === 'en' ? ind.nameEn : ind.nameVi}
        </text>
      </svg>
    `;
  }

  // Update Burette/Flask SVG DOM nodes cleanly in-place during rapid slider drags
  function updateBuretteInPlace(sys, ind, currentPH) {
    const host = hostEl && hostEl.querySelector('#tit-burette-svg-host');
    if (!host) return;

    const burLiquid = host.querySelector('#tit-svg-bur-liquid');
    const burVal = host.querySelector('#tit-svg-bur-val');
    const flaskLiquid = host.querySelector('#tit-svg-flask-liquid');
    const flaskSurface = host.querySelector('#tit-svg-flask-surface');
    const phVal = host.querySelector('#tit-svg-ph-val');
    const indDot = host.querySelector('#tit-svg-ind-dot');

    if (!burLiquid || !burVal || !flaskLiquid || !flaskSurface || !phVal || !indDot) {
      host.innerHTML = buildBuretteSVG(sys, ind, currentPH);
      return;
    }

    const liquidColor = getIndicatorColor(ind, currentPH);
    const burTopY = 32;
    const burBotY = 132;
    const burFillTopY = burTopY + (state.vAdd / MAX_ADD_ML) * (burBotY - burTopY);
    const burFillH = Math.max(0, burBotY - burFillTopY);

    const fillRatio = (V0_ML + state.vAdd) / (V0_ML + MAX_ADD_ML);
    const flaskBotY = 232;
    const flaskMaxH = 54;
    const flaskLiquidH = 18 + fillRatio * (flaskMaxH - 18);
    const flaskSurfaceY = flaskBotY - flaskLiquidH;

    burLiquid.setAttribute('y', burFillTopY.toFixed(1));
    burLiquid.setAttribute('height', burFillH.toFixed(1));
    burVal.textContent = `V = ${state.vAdd.toFixed(2)} mL`;

    flaskLiquid.setAttribute('y', flaskSurfaceY.toFixed(1));
    flaskLiquid.setAttribute('height', (flaskBotY - flaskSurfaceY + 2).toFixed(1));
    flaskLiquid.setAttribute('fill', liquidColor);

    flaskSurface.setAttribute('y1', flaskSurfaceY.toFixed(1));
    flaskSurface.setAttribute('y2', flaskSurfaceY.toFixed(1));

    const showPh = !(state.practiceMode && state.hidePhInPractice);
    phVal.textContent = showPh ? `pH = ${currentPH.toFixed(2)}` : dict().phMeterHidden;
    phVal.classList.toggle('is-masked', !showPh);
    indDot.setAttribute('fill', liquidColor);
  }

  function triggerDropAnimation() {
    const drop = hostEl && hostEl.querySelector('#tit-drop-dot');
    if (!drop) return;
    drop.classList.remove('is-falling');
    void drop.offsetWidth;
    drop.classList.add('is-falling');
  }

  // Right Frame SVG: Real-time pH(V) Curve with Indicator Transition Band & Equivalence Point
  function buildCurveSVG(sys, ind, activeC0, currentPH) {
    const d = dict();
    const isEn = state.lang === 'en';
    const fullPts = ensureFullCurve(sys, activeC0, state.cTitrant);
    const vEq = calcEquivalenceVolume(activeC0, state.cTitrant);
    const phEq = vEq <= MAX_ADD_ML ? calcTitrationPH(sys, activeC0, state.cTitrant, vEq) : null;

    const plotL = 40;
    const plotR = 394;
    const plotT = 16;
    const plotB = 204;
    const plotW = plotR - plotL;
    const plotH = plotB - plotT;

    const mapX = (v) => plotL + (Math.max(0, Math.min(MAX_ADD_ML, v)) / MAX_ADD_ML) * plotW;
    const mapY = (ph) => plotB - (Math.max(0, Math.min(14, ph)) / 14) * plotH;

    // Horizontal grid lines (pH 0, 2, 4, 6, 7, 8, 10, 12, 14)
    const yTicks = [0, 2, 4, 6, 7, 8, 10, 12, 14];
    const yGridSVG = yTicks
      .map((phVal) => {
        const y = mapY(phVal).toFixed(1);
        const isNeutral = phVal === 7;
        return `
          <line x1="${plotL}" y1="${y}" x2="${plotR}" y2="${y}"
                stroke="${isNeutral ? 'rgba(148,163,184,0.28)' : 'rgba(148,163,184,0.11)'}"
                stroke-width="1" ${isNeutral ? 'stroke-dasharray="3 3"' : ''} />
          ${
            phVal % 2 === 0 || phVal === 7
              ? `<text x="${plotL - 6}" y="${Number(y) + 3}" text-anchor="end" class="tit-svg-axis">${phVal}</text>`
              : ''
          }
        `;
      })
      .join('');

    // Vertical grid lines (0, 10, 20, 25, 30, 40, 50 mL)
    const xTicks = [0, 10, 20, 30, 40, 50];
    const xGridSVG = xTicks
      .map((vVal) => {
        const x = mapX(vVal).toFixed(1);
        return `
          <line x1="${x}" y1="${plotT}" x2="${x}" y2="${plotB}" stroke="rgba(148,163,184,0.1)" stroke-width="1" />
          <text x="${x}" y="${plotB + 13}" text-anchor="middle" class="tit-svg-axis">${vVal}</text>
        `;
      })
      .join('');

    // Indicator color transition band
    const bandTopY = mapY(ind.pHMax);
    const bandBotY = mapY(ind.pHMin);
    const bandH = Math.max(2, bandBotY - bandTopY);
    const indName = isEn ? ind.nameEn : ind.nameVi;
    const bandSVG = `
      <rect x="${plotL}" y="${bandTopY.toFixed(1)}" width="${plotW}" height="${bandH.toFixed(1)}"
            fill="${ind.bandFill}" stroke="${ind.bandStroke}" stroke-width="1" stroke-dasharray="3 2" />
      <text x="${plotR - 5}" y="${(bandTopY + bandH / 2 + 3).toFixed(1)}" text-anchor="end" class="tit-svg-band-lbl">
        ${indName} (${ind.pHMin}–${ind.pHMax})
      </text>
    `;

    // Ghost full preview path (hidden in Practice Mode so students cannot peek the vertical drop ahead of time)
    let ghostPathSVG = '';
    if (state.showFullCurve && !state.practiceMode) {
      const ghostD = fullPts
        .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${mapX(pt.v).toFixed(1)} ${mapY(pt.ph).toFixed(1)}`)
        .join(' ');
      ghostPathSVG = `<path d="${ghostD}" fill="none" stroke="rgba(148, 163, 184, 0.34)" stroke-width="1.5" stroke-dasharray="4 3" />`;
    }

    // Active traced path from V = 0 up to current state.vAdd
    const tracedPts = fullPts.filter((pt) => pt.v <= state.vAdd + 1e-6);
    if (tracedPts.length === 0 || Math.abs(tracedPts[tracedPts.length - 1].v - state.vAdd) > 1e-4) {
      tracedPts.push({ v: state.vAdd, ph: currentPH });
    }
    const activeD = tracedPts
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${mapX(pt.v).toFixed(1)} ${mapY(pt.ph).toFixed(1)}`)
      .join(' ');

    // Equivalence point crosshair (ONLY shown in Explore Mode — hidden in Practice Mode)
    let eqPointSVG = '';
    if (!state.practiceMode && phEq !== null) {
      const xEq = mapX(vEq).toFixed(1);
      const yEq = mapY(phEq).toFixed(1);
      eqPointSVG = `
        <line x1="${xEq}" y1="${plotT}" x2="${xEq}" y2="${plotB}" stroke="#d4b47c" stroke-width="1.15" stroke-dasharray="4 3" opacity="0.72" />
        <circle cx="${xEq}" cy="${yEq}" r="4.2" fill="#181c26" stroke="#d4b47c" stroke-width="1.8" />
        <rect x="${Math.min(plotR - 92, Math.max(plotL + 4, Number(xEq) - 44))}" y="${Math.max(plotT + 2, Number(yEq) - 24)}"
              width="88" height="16" rx="3.5" fill="#252017" stroke="#6b5634" stroke-width="0.9" />
        <text x="${Math.min(plotR - 48, Math.max(plotL + 48, Number(xEq)))}" y="${Math.max(plotT + 13, Number(yEq) - 13)}"
              text-anchor="middle" class="tit-svg-eq-lbl">
          (${vEq.toFixed(1)}mL, pH ${phEq.toFixed(2)})
        </text>
      `;
    }

    // Current operating point marker
    const curX = mapX(state.vAdd).toFixed(1);
    const curY = mapY(currentPH).toFixed(1);
    const dotColor = getIndicatorColor(ind, currentPH);

    return `
      <svg class="tit-curve-svg" viewBox="0 0 412 246" role="img" aria-label="${d.curveTitle}">
        ${yGridSVG}
        ${xGridSVG}
        ${bandSVG}

        <!-- Axes -->
        <line x1="${plotL}" y1="${plotT}" x2="${plotL}" y2="${plotB}" stroke="#94a3b8" stroke-width="1.4" />
        <line x1="${plotL}" y1="${plotB}" x2="${plotR}" y2="${plotB}" stroke="#94a3b8" stroke-width="1.4" />

        ${ghostPathSVG}
        <path d="${activeD}" fill="none" stroke="#7aa2f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        ${eqPointSVG}

        <!-- Current Operating Point -->
        <circle cx="${curX}" cy="${curY}" r="5" fill="${dotColor}" stroke="#f8fafc" stroke-width="1.8" />

        <!-- Axis Titles -->
        <text x="${(plotL + plotR) / 2}" y="236" text-anchor="middle" class="tit-svg-title">
          V (${sys.titrantFormula}, mL)
        </text>
        <text x="14" y="${(plotT + plotB) / 2}" text-anchor="middle" transform="rotate(-90 14 ${(plotT + plotB) / 2})" class="tit-svg-title">
          pH
        </text>
      </svg>
    `;
  }

  function buildExplanationText(sys, ind, activeC0, currentPH) {
    const isEn = state.lang === 'en';
    const vEq = calcEquivalenceVolume(activeC0, state.cTitrant);
    const phEq = calcTitrationPH(sys, activeC0, state.cTitrant, vEq);

    if (state.practiceMode) {
      return isEn
        ? `Unknown C₀ practice active: Watch the Erlenmeyer flask color closely as you drip ${sys.titrantFormula} (${state.cTitrant.toFixed(2)} M) into 25.0 mL ${sys.analyteFormula}. Stop right at the sharp ${ind.nameEn} color shift (${ind.rangeDescEn}) to compute C₀.`
        : `Đang bật Chế độ Thực hành: Hãy nhỏ từng giọt ${sys.titrantFormula} (${state.cTitrant.toFixed(2)} M) vào 25.0 mL ${sys.analyteFormula}, quan sát thời điểm chất chỉ thị ${ind.nameVi} chuyển màu rõ rệt (${ind.rangeDescVi}) để tính C₀.`;
    }

    const diff = state.vAdd - vEq;
    if (Math.abs(diff) <= 0.08) {
      if (sys.type === 'strong_acid_strong_base') {
        return isEn
          ? `At equivalence (V = ${vEq.toFixed(2)} mL): HCl and NaOH neutralize completely into NaCl (neither ion hydrolyzes), so pH = ${phEq.toFixed(2)}.`
          : `Tại điểm tương đương (V = ${vEq.toFixed(2)} mL): HCl và NaOH trung hòa hoàn toàn tạo muối NaCl không thủy phân, nên pH = ${phEq.toFixed(2)}.`;
      }
      if (sys.type === 'weak_acid_strong_base') {
        return isEn
          ? `At equivalence (V = ${vEq.toFixed(2)} mL): Only weak conjugate base CH₃COO⁻ remains in solution and hydrolyzes to release OH⁻, making the equivalence point basic (pH ≈ ${phEq.toFixed(2)} > 7).`
          : `Tại điểm tương đương (V = ${vEq.toFixed(2)} mL): Dung dịch chỉ chứa muối CH₃COONa; ion CH₃COO⁻ bị thủy phân tạo OH⁻ nên môi trường có tính kiềm (pH ≈ ${phEq.toFixed(2)} > 7).`;
      }
      return isEn
        ? `At equivalence (V = ${vEq.toFixed(2)} mL): Weak conjugate acid NH₄⁺ hydrolyzes to produce H⁺, making the equivalence point acidic (pH ≈ ${phEq.toFixed(2)} < 7).`
        : `Tại điểm tương đương (V = ${vEq.toFixed(2)} mL): Dung dịch chứa muối NH₄Cl; ion NH₄⁺ bị thủy phân giải phóng H⁺ nên môi trường có tính axit (pH ≈ ${phEq.toFixed(2)} < 7).`;
    }

    if (diff < 0) {
      // Before equivalence
      if (state.vAdd === 0) {
        return isEn
          ? `Initial sample (V = 0.00 mL): 25.0 mL of ${activeC0.toFixed(2)} M ${sys.analyteFormula} starts at pH = ${currentPH.toFixed(2)}. Theoretical equivalence volume is V_eq = ${vEq.toFixed(2)} mL.`
          : `Trạng thái ban đầu (V = 0.00 mL): 25.0 mL dung dịch ${sys.analyteFormula} ${activeC0.toFixed(2)} M có pH = ${currentPH.toFixed(2)}. Thể tích tương đương lý thuyết là V_tđ = ${vEq.toFixed(2)} mL.`;
      }
      if (sys.type !== 'strong_acid_strong_base' && Math.abs(state.vAdd - vEq * 0.5) <= 2.5) {
        const halfText =
          sys.type === 'weak_acid_strong_base'
            ? isEn
              ? `Buffer zone around half-equivalence (V ≈ ${(vEq / 2).toFixed(1)} mL): [CH₃COOH] ≈ [CH₃COO⁻], so pH hovers close to pKa = 4.76 (current pH = ${currentPH.toFixed(2)}).`
              : `Đang ở vùng đệm quanh điểm nửa tương đương (V ≈ ${(vEq / 2).toFixed(1)} mL): [CH₃COOH] ≈ [CH₃COO⁻], pH biến thiên rất chậm quanh pKa = 4.76 (hiện tại pH = ${currentPH.toFixed(2)}).`
            : isEn
            ? `Buffer zone around half-equivalence (V ≈ ${(vEq / 2).toFixed(1)} mL): [NH₃] ≈ [NH₄⁺], so pH buffers smoothly near pKa(NH₄⁺) = 9.26 (current pH = ${currentPH.toFixed(2)}).`
            : `Đang ở vùng đệm quanh điểm nửa tương đương (V ≈ ${(vEq / 2).toFixed(1)} mL): [NH₃] ≈ [NH₄⁺], pH giữ ổn định quanh pKa(NH₄⁺) = 9.26 (hiện tại pH = ${currentPH.toFixed(2)}).`;
        return halfText;
      }
      return isEn
        ? `Before equivalence (V = ${state.vAdd.toFixed(2)} < ${vEq.toFixed(2)} mL): Excess ${sys.analyteFormula} remains in the flask (pH = ${currentPH.toFixed(2)}).`
        : `Trước điểm tương đương (V = ${state.vAdd.toFixed(2)} < ${vEq.toFixed(2)} mL): Trong bình tam giác vẫn còn dư ${sys.analyteFormula} (pH = ${currentPH.toFixed(2)}).`;
    }

    return isEn
      ? `Past equivalence (V = ${state.vAdd.toFixed(2)} > ${vEq.toFixed(2)} mL): Excess titrant ${sys.titrantFormula} dominates solution pH (pH = ${currentPH.toFixed(2)}).`
      : `Sau điểm tương đương (V = ${state.vAdd.toFixed(2)} > ${vEq.toFixed(2)} mL): Chất chuẩn ${sys.titrantFormula} đã dư và quyết định giá trị pH dung dịch (pH = ${currentPH.toFixed(2)}).`;
  }

  function buildTelemetryHTML(sys, activeC0, currentPH) {
    const d = dict();
    const vEq = calcEquivalenceVolume(activeC0, state.cTitrant);
    const phEq = calcTitrationPH(sys, activeC0, state.cTitrant, vEq);
    const showPh = !(state.practiceMode && state.hidePhInPractice);

    const eqChip = state.practiceMode
      ? `<span class="tit-tel-chip is-practice">${d.hiddenEqLabel}</span>`
      : `<span class="tit-tel-chip is-gold">${d.eqPointLabel}: <strong>V = ${vEq.toFixed(2)} mL (pH ${phEq.toFixed(2)})</strong></span>`;

    return `
      <span class="tit-tel-chip">${d.analyteVolLabel} • C₀ = <strong>${state.practiceMode ? '?.??? M' : `${activeC0.toFixed(2)} M`}</strong></span>
      <span class="tit-tel-chip">${d.titrantAddedLabel} = <strong>${state.vAdd.toFixed(2)} mL</strong> • pH = <strong>${showPh ? currentPH.toFixed(2) : '—'}</strong></span>
      ${eqChip}
    `;
  }

  function buildWarningBannerHTML(sys, ind) {
    const warn = buildIndicatorWarningText(sys, ind);
    if (!warn) return '';
    return `
      <div class="tit-ind-banner is-${warn.status}">
        <span class="tit-warn-icon">${warn.status === 'bad' ? '⛔' : '⚠'}</span>
        <span>${warn.text}</span>
      </div>
    `;
  }

  // Targeted real-time update during slider dragging or drop addition (preserves slider pointer capture & CSS drop anim)
  function updateLiveVisuals(withDropAnim = false) {
    if (!hostEl) return;
    const sys = findSystem(state.systemId);
    const ind = findIndicator(state.indicatorId);
    const activeC0 = getActiveC0();
    const currentPH = calcTitrationPH(sys, activeC0, state.cTitrant, state.vAdd);

    const telHost = hostEl.querySelector('#tit-telemetry-host');
    if (telHost) telHost.innerHTML = buildTelemetryHTML(sys, activeC0, currentPH);

    updateBuretteInPlace(sys, ind, currentPH);
    if (withDropAnim) triggerDropAnimation();

    const curveHost = hostEl.querySelector('#tit-curve-svg-host');
    if (curveHost) curveHost.innerHTML = buildCurveSVG(sys, ind, activeC0, currentPH);

    const lblVol = hostEl.querySelector('#tit-lbl-vol');
    if (lblVol) lblVol.textContent = `${state.vAdd.toFixed(2)} mL`;

    const lblC0 = hostEl.querySelector('#tit-lbl-c0');
    if (lblC0) lblC0.textContent = state.practiceMode ? '?.??? M' : `${state.c0.toFixed(2)} M`;

    const lblCt = hostEl.querySelector('#tit-lbl-ct');
    if (lblCt) lblCt.textContent = `${state.cTitrant.toFixed(2)} M`;

    const explainBody = hostEl.querySelector('#tit-explain-body');
    if (explainBody) explainBody.textContent = buildExplanationText(sys, ind, activeC0, currentPH);
  }

  function formatPracticeMessage(res) {
    if (!res) return '';
    const d = dict();
    if (res.status === 'invalid') return d.gradeInvalid;
    if (res.status === 'excellent') return d.gradeExcellent(res.errPct, res.guess, res.actual);
    if (res.status === 'pass') return d.gradePass(res.errPct, res.guess, res.actual);
    if (res.status === 'retry') return d.gradeRetry(res.errPct, res.guess, res.veq);
    if (res.status === 'revealed') return d.revealedMsg(res.actual, res.veq);
    return '';
  }

  function renderPracticeSection(sys, activeC0) {
    if (!state.practiceMode) return '';
    const d = dict();
    const res = state.practiceResult;

    const feedbackHTML = res
      ? `<div class="tit-grade-feedback is-${res.status}">${formatPracticeMessage(res)}</div>`
      : '';

    return `
      <div class="tit-practice-card">
        <div class="tit-practice-top">
          <label class="tit-practice-check">
            <input type="checkbox" id="tit-check-hide-ph" ${state.hidePhInPractice ? 'checked' : ''} />
            <span>${d.hidePhLabel}</span>
          </label>
          <div class="tit-practice-top-btns">
            <button type="button" class="rxn-util-btn" id="tit-btn-new-sample">${d.newSampleBtn}</button>
            <button type="button" class="rxn-util-btn" id="tit-btn-reveal">${d.revealBtn}</button>
          </div>
        </div>

        <div class="tit-practice-form">
          <label class="tit-practice-prompt" for="tit-input-guess">${d.practicePrompt(sys.analyteFormula)}</label>
          <div class="tit-practice-input-row">
            <input type="number" step="0.001" min="0.001" max="1" id="tit-input-guess" class="tit-guess-input"
                   placeholder="${d.practicePlaceholder}" value="${state.practiceGuess}" />
            <button type="button" class="rxn-primary-btn tit-check-btn" id="tit-btn-check">${d.checkBtn}</button>
          </div>
        </div>

        ${feedbackHTML}
      </div>
    `;
  }

  function render() {
    if (!hostEl) return;
    const d = dict();
    const isEn = state.lang === 'en';
    const sys = findSystem(state.systemId);
    const ind = findIndicator(state.indicatorId);
    const activeC0 = getActiveC0();
    const currentPH = calcTitrationPH(sys, activeC0, state.cTitrant, state.vAdd);

    const sysChipsHTML = TITRATION_SYSTEMS.map((item) => {
      const active = item.id === sys.id ? 'active' : '';
      return `<button type="button" class="lab-preset-chip ${active}" data-tit-sys="${item.id}">${item.chipLabel}</button>`;
    }).join('');

    const indChipsHTML = INDICATORS.map((item) => {
      const active = item.id === ind.id ? 'active' : '';
      const suit = getIndicatorSuitability(sys, item.id);
      const badgeDot = suit === 'bad' ? '⛔ ' : suit === 'warn' ? '⚠ ' : '';
      return `<button type="button" class="lab-preset-chip ${suit === 'bad' ? 'is-tit-bad' : ''} ${active}" data-tit-ind="${item.id}">${badgeDot}${isEn ? item.nameEn : item.nameVi}</button>`;
    }).join('');

    const suitStatus = getIndicatorSuitability(sys, ind.id);
    const suitLabel =
      suitStatus === 'best'
        ? d.bestBadge
        : suitStatus === 'good'
        ? d.goodBadge
        : suitStatus === 'warn'
        ? d.warnBadge
        : d.badBadge;

    hostEl.innerHTML = `
      <!-- Top Selectors: Systems + Practice Toggle -->
      <div class="tit-top-toolbar">
        <div class="lab-presets-row echem-presets-row">
          <span class="lab-presets-label">${d.sysSelectLabel}</span>
          <div class="lab-presets-list">${sysChipsHTML}</div>
        </div>
        <button type="button" class="eq-cat-toggle ${state.practiceMode ? 'active' : ''}" id="tit-btn-practice">
          ${state.practiceMode ? d.practiceToggleOn : d.practiceToggleOff}
        </button>
      </div>

      <!-- Indicator Bar -->
      <div class="lab-presets-row echem-presets-row">
        <span class="lab-presets-label">${d.indicatorLabel}</span>
        <div class="lab-presets-list">${indChipsHTML}</div>
        <span class="tit-suit-badge is-${suitStatus}">${suitLabel}</span>
      </div>

      <div id="tit-warning-host">${buildWarningBannerHTML(sys, ind)}</div>

      <!-- Reaction & Live Telemetry Banner -->
      <div class="tit-telemetry-bar">
        <div class="tit-eq-main">${sys.equation}</div>
        <div class="tit-telemetry-chips" id="tit-telemetry-host">
          ${buildTelemetryHTML(sys, activeC0, currentPH)}
        </div>
      </div>

      <!-- Practice Grading Card (Visible only in Practice Mode) -->
      ${renderPracticeSection(sys, activeC0)}

      <!-- Dual Pure-SVG Stage: Left Apparatus + Right Titration Curve -->
      <div class="eq-visual-grid">
        <div class="eq-visual-card">
          <div class="eq-card-top">
            <span class="echem-eyebrow">${d.buretteTitle}</span>
          </div>
          <div id="tit-burette-svg-host">${buildBuretteSVG(sys, ind, currentPH)}</div>
          <div class="tit-drip-btns">
            <button type="button" class="tit-drip-btn is-fine" data-tit-add="0.05">${d.btnDrop005}</button>
            <button type="button" class="tit-drip-btn" data-tit-add="0.5">${d.btnDrop05}</button>
            <button type="button" class="tit-drip-btn" data-tit-add="2">${d.btnAdd2}</button>
            <button type="button" class="tit-drip-btn" data-tit-add="5">${d.btnAdd5}</button>
            <button type="button" class="rxn-util-btn tit-reset-vol" id="tit-btn-reset-vol">${d.btnResetVol}</button>
          </div>
        </div>

        <div class="eq-visual-card">
          <div class="eq-card-top">
            <span class="echem-eyebrow">${d.curveTitle}</span>
            ${
              state.practiceMode
                ? ''
                : `<label class="tit-fullcurve-toggle">
                     <input type="checkbox" id="tit-check-fullcurve" ${state.showFullCurve ? 'checked' : ''} />
                     <span>${d.showFullCurveLabel}</span>
                   </label>`
            }
          </div>
          <div id="tit-curve-svg-host">${buildCurveSVG(sys, ind, activeC0, currentPH)}</div>
          <div class="tit-curve-legend">
            <span class="tit-leg-swatch" style="background:${ind.bandFill};border-color:${ind.bandStroke}"></span>
            <span>${d.bandLegend}: ${isEn ? ind.rangeDescEn : ind.rangeDescVi}</span>
          </div>
        </div>
      </div>

      <!-- Sliders Row -->
      <div class="tit-sliders-row">
        <div class="echem-slider-box">
          <div class="echem-slider-top">
            <label for="tit-slider-vol">${d.sliderVolLabel}</label>
            <strong id="tit-lbl-vol">${state.vAdd.toFixed(2)} mL</strong>
          </div>
          <input type="range" id="tit-slider-vol" class="echem-range"
                 min="0" max="50" step="0.05" value="${state.vAdd}" />
        </div>

        <div class="echem-slider-box ${state.practiceMode ? 'is-disabled-box' : ''}">
          <div class="echem-slider-top">
            <label for="tit-slider-c0">${d.sliderC0Label}</label>
            <strong id="tit-lbl-c0">${state.practiceMode ? '?.??? M' : `${state.c0.toFixed(2)} M`}</strong>
          </div>
          <input type="range" id="tit-slider-c0" class="echem-range"
                 min="0.05" max="0.20" step="0.01" value="${state.c0}" ${state.practiceMode ? 'disabled' : ''} />
        </div>

        <div class="echem-slider-box">
          <div class="echem-slider-top">
            <label for="tit-slider-ct">${d.sliderCtLabel}</label>
            <strong id="tit-lbl-ct">${state.cTitrant.toFixed(2)} M</strong>
          </div>
          <input type="range" id="tit-slider-ct" class="echem-range"
                 min="0.05" max="0.20" step="0.01" value="${state.cTitrant}" />
        </div>
      </div>

      <!-- Automatic Explanation Card -->
      <div class="eq-explain-card">
        <span class="echem-eyebrow is-gold">${d.explainEyebrow}</span>
        <p class="eq-explain-body" id="tit-explain-body">${buildExplanationText(sys, ind, activeC0, currentPH)}</p>
      </div>
    `;
  }

  function addVolume(delta) {
    const nextV = Math.min(MAX_ADD_ML, Math.round((state.vAdd + delta) * 100) / 100);
    if (Math.abs(nextV - state.vAdd) < 1e-6) return;
    state.vAdd = nextV;
    const slider = hostEl && hostEl.querySelector('#tit-slider-vol');
    if (slider) slider.value = String(nextV);
    updateLiveVisuals(true);
  }

  function gradePracticeGuess() {
    const input = hostEl && hostEl.querySelector('#tit-input-guess');
    const rawStr = input ? input.value.trim() : state.practiceGuess;
    state.practiceGuess = rawStr;
    const guess = parseFloat(rawStr);
    const actual = state.secretC0;
    const vEq = calcEquivalenceVolume(actual, state.cTitrant);

    if (!Number.isFinite(guess) || guess <= 0) {
      state.practiceResult = { status: 'invalid' };
    } else {
      const errPct = (Math.abs(guess - actual) / actual) * 100;
      if (errPct <= 2.0) {
        state.practiceResult = { status: 'excellent', errPct, guess, actual };
      } else if (errPct <= 5.0) {
        state.practiceResult = { status: 'pass', errPct, guess, actual };
      } else {
        state.practiceResult = { status: 'retry', errPct, guess, veq: vEq };
      }
    }
    render();
  }

  function bindEvents() {
    if (!hostEl) return;

    hostEl.addEventListener('click', (e) => {
      const sysBtn = e.target.closest('[data-tit-sys]');
      if (sysBtn) {
        const nextSys = sysBtn.dataset.titSys;
        if (nextSys && nextSys !== state.systemId) {
          state.systemId = nextSys;
          state.vAdd = 0.0;
          state.cachedCurveKey = '';
          if (state.practiceMode) {
            state.secretC0 = generateSecretC0();
            state.practiceGuess = '';
            state.practiceResult = null;
          }
          render();
        }
        return;
      }

      const indBtn = e.target.closest('[data-tit-ind]');
      if (indBtn) {
        const nextInd = indBtn.dataset.titInd;
        if (nextInd && nextInd !== state.indicatorId) {
          state.indicatorId = nextInd;
          render();
        }
        return;
      }

      const dripBtn = e.target.closest('[data-tit-add]');
      if (dripBtn) {
        const delta = parseFloat(dripBtn.dataset.titAdd);
        if (Number.isFinite(delta)) addVolume(delta);
        return;
      }

      if (e.target.closest('#tit-btn-reset-vol')) {
        state.vAdd = 0.0;
        const slider = hostEl.querySelector('#tit-slider-vol');
        if (slider) slider.value = '0';
        updateLiveVisuals(false);
        return;
      }

      if (e.target.closest('#tit-btn-practice')) {
        state.practiceMode = !state.practiceMode;
        state.vAdd = 0.0;
        state.cachedCurveKey = '';
        state.practiceGuess = '';
        state.practiceResult = null;
        if (state.practiceMode) {
          state.secretC0 = generateSecretC0();
        }
        render();
        return;
      }

      if (e.target.closest('#tit-btn-new-sample')) {
        state.secretC0 = generateSecretC0();
        state.vAdd = 0.0;
        state.cachedCurveKey = '';
        state.practiceGuess = '';
        state.practiceResult = null;
        render();
        return;
      }

      if (e.target.closest('#tit-btn-reveal')) {
        const vEq = calcEquivalenceVolume(state.secretC0, state.cTitrant);
        state.practiceResult = {
          status: 'revealed',
          actual: state.secretC0,
          veq: vEq
        };
        render();
        return;
      }

      if (e.target.closest('#tit-btn-check')) {
        gradePracticeGuess();
      }
    });

    hostEl.addEventListener('change', (e) => {
      if (e.target.id === 'tit-check-fullcurve') {
        state.showFullCurve = Boolean(e.target.checked);
        updateLiveVisuals(false);
      } else if (e.target.id === 'tit-check-hide-ph') {
        state.hidePhInPractice = Boolean(e.target.checked);
        updateLiveVisuals(false);
      }
    });

    hostEl.addEventListener('input', (e) => {
      if (e.target.id === 'tit-slider-vol') {
        state.vAdd = Math.max(0, Math.min(MAX_ADD_ML, Number(e.target.value) || 0));
        updateLiveVisuals(false);
      } else if (e.target.id === 'tit-slider-c0') {
        state.c0 = Math.max(0.05, Math.min(0.20, Number(e.target.value) || 0.10));
        state.cachedCurveKey = '';
        updateLiveVisuals(false);
      } else if (e.target.id === 'tit-slider-ct') {
        state.cTitrant = Math.max(0.05, Math.min(0.20, Number(e.target.value) || 0.10));
        state.cachedCurveKey = '';
        updateLiveVisuals(false);
      } else if (e.target.id === 'tit-input-guess') {
        state.practiceGuess = e.target.value;
      }
    });

    hostEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.id === 'tit-input-guess') {
        e.preventDefault();
        gradePracticeGuess();
      }
    });
  }

  function init(opts = {}) {
    if (opts.getLang) {
      callbacks.getLang = opts.getLang;
    }
    state.lang = callbacks.getLang() || 'vi';
    hostEl = document.getElementById('vlab-panel-titration');
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
    const d = TIT_I18N[l];
    return {
      title: d.title,
      subtitle: d.subtitle,
      footerHint: d.footerHint
    };
  }

  window.TitrationLab = {
    init,
    setLang,
    getHeaderTexts
  };
})();
