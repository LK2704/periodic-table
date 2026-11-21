// Interactive 3D Atom Renderer (Canvas 2D + True 3D Quaternion Math & Perspective Projection)
// Supports 360-degree drag rotation with inertia, smooth slow auto-rotation, zoom,
// 3D inclined orbital shells & 3D Bohr shell modes, and depth-sorted 3D shaded nucleons & electrons.

(function () {
  // --- Quaternion Helpers (x, y, z, w) ---
  function quatMultiply(a, b) {
    return [
      a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
      a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
      a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
      a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]
    ];
  }

  function quatNormalize(q) {
    const len = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
    return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
  }

  function quatFromAxisAngle(ax, ay, az, angle) {
    const half = angle * 0.5;
    const s = Math.sin(half);
    const len = Math.hypot(ax, ay, az) || 1;
    return [(ax / len) * s, (ay / len) * s, (az / len) * s, Math.cos(half)];
  }

  function rotateVecByQuat(vx, vy, vz, q) {
    const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    const ix = qw * vx + qy * vz - qz * vy;
    const iy = qw * vy + qz * vx - qx * vz;
    const iz = qw * vz + qx * vy - qy * vx;
    const iw = -qx * vx - qy * vy - qz * vz;

    return [
      ix * qw + iw * -qx + iy * -qz - iz * -qy,
      iy * qw + iw * -qy + iz * -qx - ix * -qz,
      iz * qw + iw * -qz + ix * -qy - iy * -qx
    ];
  }

  function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  class Atom3DRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = 0;
      this.height = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Camera & Orientation
      this.defaultQuat = quatNormalize(
        quatMultiply(
          quatFromAxisAngle(1, 0, 0, 0.36),
          quatFromAxisAngle(0, 1, 0, -0.42)
        )
      );
      this.quat = [...this.defaultQuat];
      this.zoom = 1.0;
      this.targetZoom = 1.0;

      // Interaction state
      this.autoRotate = true;
      this.orbitSpeed = 1.0; // Orbital speed multiplier (0x, 0.5x, 1x, 2x, 3x)
      this.mode = '3d'; // '3d' (tilted 3D orbitals) | 'bohr' (concentric 3D Bohr planes)
      this.isDragging = false;
      this.isPinching = false;
      this.lastPointer = { x: 0, y: 0 };
      this.lastTouch = { x: 0, y: 0 };
      this.pinchStartDist = 0;
      this.pinchStartZoom = 1.0;
      this.angularVel = { x: 0, y: 0 };

      // Atom geometry
      this.element = null;
      this.currentNeutrons = null;
      this.isExpandedView = false;
      this.accentRgb = { r: 148, g: 163, b: 184 };
      this.valenceElectronRgb = { r: 245, g: 158, b: 11 }; // Dynamically colored per element category
      this.innerElectronRgb = { r: 168, g: 160, b: 148 };  // Calm matte warm pewter for even inner shells
      this.innerElectronAltRgb = { r: 138, g: 158, b: 180 }; // Subtle matte cool slate for alternating Bohr inner shells
      this.nucleons = [];
      this.shells = [];
      this.nucleusRadius = 18;
      this.time = 0;
      this.orbitTime = 0; // Accumulated orbital phase so speed changes never jump electron angles
      this.idleRingSpecs = [
        { tilt: [0.58, 0.0, 0.25], axis: [0.84, 0.42, -0.34], precessSpeed: 0.34 },
        { tilt: [-0.55, 1.05, -0.45], axis: [-0.36, 0.88, 0.31], precessSpeed: -0.44 },
        { tilt: [0.42, 2.1, 0.72], axis: [0.28, -0.41, 0.87], precessSpeed: 0.29 }
      ];
      this.idleRingAngles = [0, 0, 0];
      this.lastFrameTime = performance.now();
      this.popScale = 1;

      // Render loop suspension state
      this._rafId = null;
      this.externalPaused = false;

      // Pre-rendered offscreen particle sprites for fast ctx.drawImage() blitting
      this.electronSpriteCache = new Map();
      this._initSprites();

      this._bindEvents();
      this.resize();
      this._loop = this._loop.bind(this);
      this._syncLoop();
    }

    _createNucleonSprite(stops) {
      const size = 64;
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const gctx = c.getContext('2d');
      const cx = size * 0.5;
      const cy = size * 0.5;
      const r = 30;
      // Broad diffuse shading for a low-gloss matte mineral surface
      const grad = gctx.createRadialGradient(
        cx - r * 0.22,
        cy - r * 0.24,
        r * 0.24,
        cx,
        cy,
        r
      );
      stops.forEach(([offset, color]) => grad.addColorStop(offset, color));
      gctx.fillStyle = grad;
      gctx.beginPath();
      gctx.arc(cx, cy, r, 0, Math.PI * 2);
      gctx.fill();
      return c;
    }

    _deriveValenceRgb(cat) {
      if (!cat) return { r: 245, g: 158, b: 11 };
      const c = hexToRgb(cat.color || '#94a3b8');
      const bh = hexToRgb(cat.borderHover || cat.color || '#94a3b8');
      // Blend true category pigment with readable matte borderHover, then preserve hue at clear dark-slate luminance
      let r = c.r * 0.58 + bh.r * 0.42;
      let g = c.g * 0.58 + bh.g * 0.42;
      let b = c.b * 0.58 + bh.b * 0.42;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const scale = Math.min(1.68, Math.max(1.12, 134 / Math.max(24, lum)));
      r = Math.min(226, r * scale);
      g = Math.min(226, g * scale);
      b = Math.min(226, b * scale);
      const lum2 = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum2 < 120) {
        const lift = ((120 - lum2) / Math.max(1, 224 - lum2)) * 0.6;
        r += (224 - r) * lift;
        g += (224 - g) * lift;
        b += (224 - b) * lift;
      }
      return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
    }

    getValenceColorHex() {
      const { r, g, b } = this.valenceElectronRgb;
      const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    getCategoryValenceHex(categoryKey) {
      const cat = window.ELEMENT_CATEGORIES && window.ELEMENT_CATEGORIES[categoryKey];
      const { r, g, b } = this._deriveValenceRgb(cat);
      const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    _getElectronSprite(er, eg, eb, isValence = false) {
      const key = `${er},${eg},${eb},${isValence ? 'v2' : 'i'}`;
      const cached = this.electronSpriteCache.get(key);
      if (cached) return cached;

      const size = isValence ? 96 : 64;
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const gctx = c.getContext('2d');
      const cx = size * 0.5;
      const cy = size * 0.5;
      const haloR = isValence ? 46 : 30;
      const coreR = isValence ? 15 : 17;

      const hiR = Math.min(255, Math.round(er + (255 - er) * (isValence ? 0.58 : 0.38)));
      const hiG = Math.min(255, Math.round(eg + (255 - eg) * (isValence ? 0.58 : 0.38)));
      const hiB = Math.min(255, Math.round(eb + (255 - eb) * (isValence ? 0.58 : 0.38)));
      const shR = Math.round(er * (isValence ? 0.66 : 0.52));
      const shG = Math.round(eg * (isValence ? 0.66 : 0.52));
      const shB = Math.round(eb * (isValence ? 0.66 : 0.52));

      if (isValence) {
        // Radiant luminous outer aura for valence electrons
        const halo = gctx.createRadialGradient(cx, cy, coreR * 0.45, cx, cy, haloR);
        halo.addColorStop(0, `rgba(${hiR}, ${hiG}, ${hiB}, 0.88)`);
        halo.addColorStop(0.28, `rgba(${er}, ${eg}, ${eb}, 0.52)`);
        halo.addColorStop(0.62, `rgba(${er}, ${eg}, ${eb}, 0.18)`);
        halo.addColorStop(1, `rgba(${er}, ${eg}, ${eb}, 0)`);
        gctx.fillStyle = halo;
        gctx.beginPath();
        gctx.arc(cx, cy, haloR, 0, Math.PI * 2);
        gctx.fill();

        // Incandescent bright core with hot white-tinted center
        const core = gctx.createRadialGradient(
          cx - coreR * 0.16,
          cy - coreR * 0.18,
          coreR * 0.12,
          cx,
          cy,
          coreR
        );
        core.addColorStop(0, '#ffffff');
        core.addColorStop(0.36, `rgb(${hiR}, ${hiG}, ${hiB})`);
        core.addColorStop(0.78, `rgb(${er}, ${eg}, ${eb})`);
        core.addColorStop(1, `rgb(${shR}, ${shG}, ${shB})`);
        gctx.fillStyle = core;
        gctx.beginPath();
        gctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        gctx.fill();

        // Bright luminous rim
        gctx.strokeStyle = `rgba(255, 255, 255, 0.72)`;
        gctx.lineWidth = 1.4;
        gctx.beginPath();
        gctx.arc(cx, cy, coreR - 0.5, 0, Math.PI * 2);
        gctx.stroke();
      } else {
        // Calm matte finish for inner shell electrons
        const halo = gctx.createRadialGradient(cx, cy, coreR * 0.65, cx, cy, haloR);
        halo.addColorStop(0, `rgba(${er}, ${eg}, ${eb}, 0.14)`);
        halo.addColorStop(0.55, `rgba(${er}, ${eg}, ${eb}, 0.048)`);
        halo.addColorStop(1, `rgba(${er}, ${eg}, ${eb}, 0)`);
        gctx.fillStyle = halo;
        gctx.beginPath();
        gctx.arc(cx, cy, haloR, 0, Math.PI * 2);
        gctx.fill();

        const core = gctx.createRadialGradient(
          cx - coreR * 0.22,
          cy - coreR * 0.24,
          coreR * 0.2,
          cx,
          cy,
          coreR
        );
        core.addColorStop(0, `rgb(${hiR}, ${hiG}, ${hiB})`);
        core.addColorStop(0.54, `rgb(${er}, ${eg}, ${eb})`);
        core.addColorStop(1, `rgb(${shR}, ${shG}, ${shB})`);
        gctx.fillStyle = core;
        gctx.beginPath();
        gctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        gctx.fill();
      }

      this.electronSpriteCache.set(key, c);
      return c;
    }

    _initSprites() {
      // Proton: muted crimson 3D sphere (#e11d48 base, low-gloss matte finish)
      this.protonSprite = this._createNucleonSprite([
        [0, '#e5526f'],
        [0.36, '#e11d48'],
        [0.8, '#9f1239'],
        [1, '#580a22']
      ]);
      // Neutron: muted dark slate 3D sphere (#475569 base, low-gloss matte finish)
      this.neutronSprite = this._createNucleonSprite([
        [0, '#64748b'],
        [0.4, '#475569'],
        [0.82, '#334155'],
        [1, '#1e2633']
      ]);
      // Inner electrons: calm matte pewter (#a8a094) + alternating cool matte slate (#8a9eb4) for clear Bohr shell separation
      this.innerElectronSprite = this._getElectronSprite(
        this.innerElectronRgb.r,
        this.innerElectronRgb.g,
        this.innerElectronRgb.b,
        false
      );
      this.innerElectronAltSprite = this._getElectronSprite(
        this.innerElectronAltRgb.r,
        this.innerElectronAltRgb.g,
        this.innerElectronAltRgb.b,
        false
      );
      // Valence electron: dynamically refreshed per element category in setElement()
      this.valenceElectronSprite = this._getElectronSprite(
        this.valenceElectronRgb.r,
        this.valenceElectronRgb.g,
        this.valenceElectronRgb.b,
        true
      );
    }

    setPaused(paused) {
      this.externalPaused = Boolean(paused);
      this._syncLoop();
    }

    _syncLoop() {
      const shouldRun = !this.externalPaused && !document.hidden;
      if (shouldRun) {
        if (this._rafId === null) {
          this.lastFrameTime = performance.now();
          this._rafId = requestAnimationFrame(this._loop);
        }
      } else if (this._rafId !== null) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
    }

    _bindEvents() {
      const el = this.canvas;

      el.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return;
        this.isDragging = true;
        this.lastPointer.x = e.clientX;
        this.lastPointer.y = e.clientY;
        this.angularVel.x = 0;
        this.angularVel.y = 0;
        el.setPointerCapture(e.pointerId);
        el.style.cursor = 'grabbing';
      });

      el.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        if (!this.isDragging) return;
        const dx = e.clientX - this.lastPointer.x;
        const dy = e.clientY - this.lastPointer.y;
        this.lastPointer.x = e.clientX;
        this.lastPointer.y = e.clientY;

        const sensitivity = 0.0085;
        // Model follows the pointer: drag right -> front turns right, drag down -> front turns down
        const ry = dx * sensitivity;
        const rx = -dy * sensitivity;

        this._applyWorldRotation(rx, ry);
        this.angularVel.x = rx;
        this.angularVel.y = ry;
      });

      const stopDrag = (e) => {
        if (e.pointerType === 'touch') return;
        if (!this.isDragging) return;
        this.isDragging = false;
        try {
          el.releasePointerCapture(e.pointerId);
        } catch (_) {}
        el.style.cursor = 'grab';
      };

      el.addEventListener('pointerup', stopDrag);
      el.addEventListener('pointercancel', stopDrag);

      const getTouchDist = (t0, t1) => Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);

      el.addEventListener(
        'touchstart',
        (e) => {
          e.preventDefault();
          if (e.touches.length === 1) {
            this.isPinching = false;
            this.isDragging = true;
            this.lastTouch.x = e.touches[0].clientX;
            this.lastTouch.y = e.touches[0].clientY;
            this.angularVel.x = 0;
            this.angularVel.y = 0;
          } else if (e.touches.length >= 2) {
            this.isDragging = false;
            this.isPinching = true;
            this.angularVel.x = 0;
            this.angularVel.y = 0;
            this.pinchStartDist = getTouchDist(e.touches[0], e.touches[1]);
            this.pinchStartZoom = this.targetZoom;
          }
        },
        { passive: false }
      );

      el.addEventListener(
        'touchmove',
        (e) => {
          e.preventDefault();
          if (e.touches.length >= 2) {
            const dist = getTouchDist(e.touches[0], e.touches[1]);
            if (!this.isPinching || this.pinchStartDist <= 8) {
              this.isPinching = true;
              this.isDragging = false;
              this.pinchStartDist = dist;
              this.pinchStartZoom = this.targetZoom;
              this.angularVel.x = 0;
              this.angularVel.y = 0;
            } else {
              const ratio = dist / this.pinchStartDist;
              this.targetZoom = Math.max(0.45, Math.min(3.5, this.pinchStartZoom * ratio));
            }
            if (this._rafId === null) {
              this.zoom = this.targetZoom;
              this._render();
            }
          } else if (e.touches.length === 1 && this.isDragging && !this.isPinching) {
            const t0 = e.touches[0];
            const dx = t0.clientX - this.lastTouch.x;
            const dy = t0.clientY - this.lastTouch.y;
            this.lastTouch.x = t0.clientX;
            this.lastTouch.y = t0.clientY;

            const sensitivity = 0.0105;
            const ry = dx * sensitivity;
            const rx = -dy * sensitivity;

            this._applyWorldRotation(rx, ry);
            this.angularVel.x = rx;
            this.angularVel.y = ry;
            if (this._rafId === null) {
              this._render();
            }
          }
        },
        { passive: false }
      );

      el.addEventListener(
        'touchend',
        (e) => {
          if (e.touches.length === 0) {
            this.isDragging = false;
            this.isPinching = false;
            this.pinchStartDist = 0;
          } else if (e.touches.length === 1) {
            this.isPinching = false;
            this.pinchStartDist = 0;
            this.isDragging = true;
            this.lastTouch.x = e.touches[0].clientX;
            this.lastTouch.y = e.touches[0].clientY;
            this.angularVel.x = 0;
            this.angularVel.y = 0;
          }
        },
        { passive: true }
      );

      el.addEventListener(
        'touchcancel',
        () => {
          this.isDragging = false;
          this.isPinching = false;
          this.pinchStartDist = 0;
          this.angularVel.x = 0;
          this.angularVel.y = 0;
        },
        { passive: true }
      );

      el.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
      el.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });

      el.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();
          const dir = -Math.sign(e.deltaY);
          const zoomFactor = dir > 0 ? 1.18 : 1 / 1.18;
          this.targetZoom = Math.max(0.35, Math.min(4.2, this.targetZoom * zoomFactor));
        },
        { passive: false }
      );

      el.addEventListener('dblclick', () => {
        this.resetView();
      });

      window.addEventListener('resize', () => this.resize());
      document.addEventListener('visibilitychange', () => this._syncLoop());
      if (typeof ResizeObserver !== 'undefined' && el.parentElement) {
        this._resizeObserver = new ResizeObserver(() => this.resize());
        this._resizeObserver.observe(el.parentElement);
      }
    }

    _applyWorldRotation(rx, ry) {
      // Pre-multiply so drag always rotates naturally relative to screen axes
      if (Math.abs(ry) > 1e-6) {
        const qy = quatFromAxisAngle(0, 1, 0, ry);
        this.quat = quatNormalize(quatMultiply(qy, this.quat));
      }
      if (Math.abs(rx) > 1e-6) {
        const qx = quatFromAxisAngle(1, 0, 0, rx);
        this.quat = quatNormalize(quatMultiply(qx, this.quat));
      }
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.width = Math.max(200, rect.width);
      this.height = Math.max(180, rect.height);
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      if (this._rafId === null) {
        this._render();
      }
    }

    resetView() {
      this.quat = [...this.defaultQuat];
      this.targetZoom = 1.0;
      this.angularVel = { x: 0, y: 0 };
    }

    zoomBy(factor) {
      const f = Number(factor);
      if (!Number.isFinite(f) || f <= 0) return;
      this.targetZoom = Math.max(0.45, Math.min(3.5, this.targetZoom * f));
      if (this._rafId === null) {
        this.zoom = this.targetZoom;
        this._render();
      }
    }

    setAutoRotate(enabled) {
      this.autoRotate = enabled;
    }

    setOrbitSpeed(multiplier) {
      const val = Number(multiplier);
      if (!Number.isFinite(val)) return;
      this.orbitSpeed = Math.max(0, Math.min(4, val));
      if (this._rafId === null) {
        this._render();
      }
    }

    setMode(mode) {
      this.mode = mode;
      if (this.element) {
        this._buildShells(this.element);
      }
      if (this._rafId === null) {
        this._render();
      }
    }

    setExpanded(expanded) {
      this.isExpandedView = Boolean(expanded);
      if (this._rafId === null) {
        this._render();
      }
    }

    setElement(element, customNeutrons = null) {
      if (!element) {
        this.clearElement();
        return;
      }
      const targetNeutrons =
        customNeutrons !== null && customNeutrons !== undefined
          ? Math.max(0, Math.round(customNeutrons))
          : element.neutrons;

      if (
        this.element &&
        this.element.number === element.number &&
        this.currentNeutrons === targetNeutrons
      ) {
        return;
      }
      this.element = element;
      this.currentNeutrons = targetNeutrons;
      const cat = window.ELEMENT_CATEGORIES[element.category];
      this.accentRgb = hexToRgb(cat ? cat.color : '#94a3b8');
      this.valenceElectronRgb = this._deriveValenceRgb(cat);
      this.valenceElectronSprite = this._getElectronSprite(
        this.valenceElectronRgb.r,
        this.valenceElectronRgb.g,
        this.valenceElectronRgb.b,
        true
      );
      this.popScale = 0.88;
      this._buildNucleus(element, targetNeutrons);
      this._buildShells(element);
      if (this._rafId === null) {
        this.popScale = 1;
        this._render();
      }
    }

    setNeutrons(customNeutrons) {
      if (!this.element) return;
      const targetNeutrons =
        customNeutrons !== null && customNeutrons !== undefined
          ? Math.max(0, Math.round(customNeutrons))
          : this.element.neutrons;

      if (this.currentNeutrons === targetNeutrons) {
        this.popScale = 0.93;
        return;
      }
      this.currentNeutrons = targetNeutrons;
      this.popScale = 0.88;
      this._buildNucleus(this.element, targetNeutrons);
      this._buildShells(this.element);
      if (this._rafId === null) {
        this.popScale = 1;
        this._render();
      }
    }

    clearElement() {
      this.element = null;
      this.currentNeutrons = null;
      this.nucleons = [];
      this.shells = [];
      if (this._rafId === null) {
        this._render();
      }
    }

    _buildNucleus(el, neutronCount = el.neutrons) {
      const neutrons = Math.max(0, Math.round(neutronCount ?? el.neutrons));
      const total = el.protons + neutrons;
      // Show exact nucleon spheres for light nuclei (up to A=17), smoothly capped at 46 for 60fps
      const visualCount =
        total <= 17
          ? Math.max(1, total)
          : Math.min(46, Math.round(6 + Math.pow(total, 0.52) * 2.5));

      const protonRatio = el.protons / Math.max(1, total);
      const numProtons =
        visualCount === total
          ? el.protons
          : Math.max(1, Math.min(visualCount, Math.round(visualCount * protonRatio)));

      const types = [];
      for (let i = 0; i < visualCount; i++) {
        // Interleave protons & neutrons evenly
        types.push(i < numProtons ? 'p' : 'n');
      }
      // Deterministic shuffle incorporating neutron count so isotope switches visibly update packing
      for (let i = types.length - 1; i > 0; i--) {
        const j = ((i * 2654435761 + el.number * 31 + neutrons * 17) >>> 0) % (i + 1);
        const tmp = types[i];
        types[i] = types[j];
        types[j] = tmp;
      }

      const nucleons = [];
      const baseSphereR = total === 1 ? 10 : total <= 4 ? 7.8 : Math.max(4.6, 7.2 - visualCount * 0.045);

      if (visualCount === 1) {
        nucleons.push({ x: 0, y: 0, z: 0, type: 'p', r: baseSphereR });
        this.nucleusRadius = baseSphereR;
      } else {
        // Multi-shell Fibonacci sphere packing for tight 3D nucleus cluster
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const maxClusterR = 7 + Math.cbrt(total) * 2.65;
        this.nucleusRadius = maxClusterR + baseSphereR * 0.7;

        for (let i = 0; i < visualCount; i++) {
          const frac = (i + 0.5) / visualCount;
          const layerR = maxClusterR * Math.cbrt(frac) * 0.92;
          const yNorm = 1 - 2 * ((i * 0.61803398875) % 1);
          const radAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
          const theta = goldenAngle * i + el.number * 0.37 + neutrons * 0.13;

          nucleons.push({
            x: Math.cos(theta) * radAtY * layerR,
            y: yNorm * layerR,
            z: Math.sin(theta) * radAtY * layerR,
            type: types[i],
            r: baseSphereR
          });
        }
      }

      this.nucleons = nucleons;
    }

    _buildShells(el) {
      const SHELL_LETTERS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
      // Guarantee exact shell counts summing to el.electrons (fallback to subshell aggregation if needed)
      let shellCounts = Array.isArray(el.shells) ? el.shells.slice() : [];
      const shellSum = shellCounts.reduce((acc, c) => acc + c, 0);
      if (shellSum !== el.electrons && Array.isArray(el.subshells) && el.subshells.length > 0) {
        const byN = [];
        el.subshells.forEach((sub) => {
          byN[sub.n - 1] = (byN[sub.n - 1] || 0) + sub.count;
        });
        shellCounts = byN.map((c) => c || 0);
      }
      const numShells = shellCounts.length;
      const shells = [];

      const innerMin =
        this.mode === 'bohr' && numShells >= 6
          ? Math.max(this.nucleusRadius + 15, 38)
          : Math.max(this.nucleusRadius + 24, 42);
      const outerMax = 148;
      const step = numShells > 1 ? (outerMax - innerMin) / (numShells - 1) : 0;

      if (this.mode === 'bohr') {
        // Classic textbook Bohr model: 1 concentric shell ring per principal quantum number (K..Q)
        for (let s = 0; s < numShells; s++) {
          const count = shellCounts[s];
          const radius = numShells === 1 ? 82 : innerMin + s * step;
          const planeQuat = quatFromAxisAngle(1, 0, 0, 0);
          const speed = (0.72 / (1 + s * 0.32)) * (s % 2 === 0 ? 1 : -1);
          const phaseOffset = s * 0.85;

          const electrons = [];
          for (let i = 0; i < count; i++) {
            electrons.push({
              baseAngle: (i / count) * Math.PI * 2 + phaseOffset
            });
          }

          shells.push({
            index: s,
            n: s + 1,
            letter: SHELL_LETTERS[s] || String(s + 1),
            radius,
            planeQuat,
            spinAxis: null,
            precessSpeed: 0,
            ringAngle: 0,
            speed,
            isValence: s === numShells - 1,
            isAltTone: s % 2 === 1,
            electrons
          });
        }
      } else {
        // Subshell-based 3D Orbital mode: distributes electrons across real s, p, d, f subshells
        // Each ring receives its own unique 3D rotation axis & independent angular velocity around a stationary nucleus
        const subshells = el.subshells || [];
        const lOffset = { s: -1.4, p: 0, d: 1.6, f: 3.2 };
        let ringIdx = 0;

        for (let i = 0; i < subshells.length; i++) {
          const sub = subshells[i];
          const baseRadius =
            numShells === 1 ? 82 : innerMin + (sub.n - 1) * step + (lOffset[sub.l] || 0);
          const isValence = sub.n === numShells;

          // Split large d (>6e) and f (>7e) subshells across 2 inclined 3D orbital planes
          const splitCount =
            (sub.l === 'f' && sub.count > 7) || (sub.l === 'd' && sub.count > 6) ? 2 : 1;

          for (let part = 0; part < splitCount; part++) {
            const eCount =
              splitCount === 1
                ? sub.count
                : part === 0
                ? Math.ceil(sub.count / 2)
                : Math.floor(sub.count / 2);
            if (eCount <= 0) continue;

            // Golden-ratio distributed initial 3D inclination for airy, non-overlapping orbital planes
            const idx = ringIdx++;
            const tiltX = (0.42 + ((idx * 0.6180339) % 1) * 1.15) * (idx % 2 === 0 ? 1 : -1);
            const tiltY = idx * 1.18 + part * 1.57;
            const tiltZ = idx * 0.53;
            let pq = quatFromAxisAngle(0, 0, 1, tiltZ);
            pq = quatMultiply(quatFromAxisAngle(0, 1, 0, tiltY), pq);
            pq = quatMultiply(quatFromAxisAngle(1, 0, 0, tiltX), pq);
            const planeQuat = quatNormalize(pq);

            // Compute a unique 3D rotation axis per ring (angled 45°–76° from the ring's normal
            // so every ring visibly precesses/rotates on its own independent 3D axis)
            const phi = idx * 2.39996323 + el.number * 0.17; // golden angle spacing
            const uVec = rotateVecByQuat(Math.cos(phi), Math.sin(phi), 0, planeQuat);
            const nVec = rotateVecByQuat(0, 0, 1, planeQuat);
            const beta = 0.24 + ((idx * 0.6180339) % 1) * 0.54; // ~14°..45° lift toward normal
            const cb = Math.cos(beta);
            const sb = Math.sin(beta);
            let ax = uVec[0] * cb + nVec[0] * sb;
            let ay = uVec[1] * cb + nVec[1] * sb;
            let az = uVec[2] * cb + nVec[2] * sb;
            const aLen = Math.hypot(ax, ay, az) || 1;
            const spinAxis = [ax / aLen, ay / aLen, az / aLen];

            // Distinct non-uniform angular speed & alternating spin direction per ring
            const speedSpread = 0.72 + ((idx * 0.381966) % 1) * 0.72;
            const depthSlowdown = 1 / (1 + (sub.n - 1) * 0.18);
            const precessDir = idx % 2 === 0 ? 1 : -1;
            const precessSpeed = 0.54 * depthSlowdown * speedSpread * precessDir;

            const speed = (0.68 / (1 + (sub.n - 1) * 0.28)) * (idx % 2 === 0 ? 1 : -1);
            const phaseOffset = idx * 0.91;

            const electrons = [];
            for (let k = 0; k < eCount; k++) {
              electrons.push({
                baseAngle: (k / eCount) * Math.PI * 2 + phaseOffset
              });
            }

            shells.push({
              index: idx,
              n: sub.n,
              subshell: `${sub.n}${sub.l}`,
              radius: baseRadius,
              planeQuat,
              spinAxis,
              precessSpeed,
              ringAngle: 0,
              speed,
              isValence,
              electrons
            });
          }
        }
      }

      this.shells = shells;
    }

    _loop(now) {
      this._rafId = null;
      if (this.externalPaused || document.hidden) return;

      const dt = Math.min(0.05, (now - this.lastFrameTime) / 1000);
      this.lastFrameTime = now;
      this.time += dt;
      this.orbitTime += dt * this.orbitSpeed;

      // Smooth zoom & element-switch pop animation
      this.zoom += (this.targetZoom - this.zoom) * Math.min(1, dt * 15);
      this.popScale += (1 - this.popScale) * Math.min(1, dt * 9);

      // Rotate each orbital ring independently on its own 3D axis while the nucleus remains stationary
      if (this.autoRotate && this.orbitSpeed > 0) {
        const ringDt = dt * this.orbitSpeed;
        for (let i = 0; i < this.shells.length; i++) {
          const sh = this.shells[i];
          if (sh.precessSpeed) {
            sh.ringAngle += ringDt * sh.precessSpeed;
          }
        }
        for (let i = 0; i < this.idleRingAngles.length; i++) {
          this.idleRingAngles[i] += ringDt * this.idleRingSpecs[i].precessSpeed;
        }
      }

      // Camera rotation updates ONLY from manual pointer drag + smooth inertia (nucleus stays still otherwise)
      if (!this.isDragging) {
        const velMag = Math.hypot(this.angularVel.x, this.angularVel.y);
        if (velMag > 0.0004) {
          this._applyWorldRotation(this.angularVel.x, this.angularVel.y);
          const decay = Math.pow(0.92, dt * 60);
          this.angularVel.x *= decay;
          this.angularVel.y *= decay;
        }
      }

      this._render();
      this._rafId = requestAnimationFrame(this._loop);
    }

    _project(x, y, z, cx, cy, scale, fov) {
      const factor = fov / (fov - z);
      return {
        x: cx + x * factor * scale,
        y: cy + y * factor * scale,
        z,
        factor: factor * scale
      };
    }

    _render() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.save();
      ctx.scale(this.dpr, this.dpr);
      ctx.clearRect(0, 0, w, h);

      if (!this.element) {
        this._renderIdlePlaceholder(ctx, w, h);
        ctx.restore();
        return;
      }

      const cx = w * 0.5;
      const cy = h * 0.5;
      const minDim = Math.min(w, h);
      const scale = (minDim / 345) * this.zoom * this.popScale;
      const fov = 560;
      const { r, g, b } = this.accentRgb;

      // Subtle neutral matte depth backdrop behind the atom (no colored bloom)
      const haloR = Math.max(40, minDim * 0.34 * this.zoom);
      const bgGlow = ctx.createRadialGradient(cx, cy, 4, cx, cy, haloR);
      bgGlow.addColorStop(0, 'rgba(148, 163, 184, 0.045)');
      bgGlow.addColorStop(0.55, 'rgba(148, 163, 184, 0.015)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      ctx.fill();

      // Orbital ring colors: drafting slate for inner shells, element-category tinted matte ring for valence shell
      const vr = this.valenceElectronRgb.r;
      const vg = this.valenceElectronRgb.g;
      const vb = this.valenceElectronRgb.b;
      const valRingR = Math.round(vr * 0.54 + 178 * 0.46);
      const valRingG = Math.round(vg * 0.54 + 186 * 0.46);
      const valRingB = Math.round(vb * 0.54 + 198 * 0.46);

      // Precompute orbital ring points & electron positions in camera space
      const ringSegments = 68;
      const backRingPaths = [];
      const frontRingPaths = [];
      const drawables = []; // Unified depth-sorted list: nucleons & electrons

      for (let s = 0; s < this.shells.length; s++) {
        const shell = this.shells[s];
        const ringQuat = shell.spinAxis
          ? quatNormalize(
              quatMultiply(
                quatFromAxisAngle(shell.spinAxis[0], shell.spinAxis[1], shell.spinAxis[2], shell.ringAngle),
                shell.planeQuat
              )
            )
          : shell.planeQuat;
        const totalQuat = quatNormalize(quatMultiply(this.quat, ringQuat));
        const pts = [];

        for (let i = 0; i <= ringSegments; i++) {
          const a = (i / ringSegments) * Math.PI * 2;
          const lx = Math.cos(a) * shell.radius;
          const ly = Math.sin(a) * shell.radius;
          const [wx, wy, wz] = rotateVecByQuat(lx, ly, 0, totalQuat);
          pts.push(this._project(wx, wy, wz, cx, cy, scale, fov));
        }

        // Split ring into back (z < 0) and front (z >= 0) segments for crisp 3D occlusion
        const isOutermost = Boolean(shell.isValence);
        const isAltTone = this.mode === 'bohr' && Boolean(shell.isAltTone) && !isOutermost;
        const totalRings = this.shells.length;
        const innerAlpha =
          this.mode === 'bohr'
            ? isAltTone
              ? 0.24
              : 0.19
            : Math.max(0.09, 0.2 - Math.max(0, totalRings - 5) * 0.008);
        const baseAlpha = isOutermost ? 0.34 : innerAlpha;

        for (let i = 0; i < ringSegments; i++) {
          const p0 = pts[i];
          const p1 = pts[i + 1];
          const midZ = (p0.z + p1.z) * 0.5;
          const seg = { p0, p1, midZ, baseAlpha, isOutermost, isAltTone };
          if (midZ < 0) {
            backRingPaths.push(seg);
          } else {
            frontRingPaths.push(seg);
          }
        }

        // Compute electrons & short orbital trails (adaptive detail for heavy elements & orbit speed)
        const electronAngleOffset = this.orbitTime * shell.speed;
        const speedFactor = Math.min(1.45, Math.max(0, this.orbitSpeed));
        const trailSteps = speedFactor === 0 ? 0 : this.element.electrons > 54 ? 3 : 6;
        const trailArc = (this.element.electrons > 54 ? 0.14 : 0.22) * speedFactor * Math.sign(shell.speed);
        const baseElectronR =
          this.mode === 'bohr' && shell.electrons.length >= 18
            ? 2.8
            : this.element.electrons > 54
            ? 3.0
            : 3.6;
        const shellElectronR = isOutermost ? baseElectronR * 1.18 : baseElectronR * 0.94;

        for (let eIdx = 0; eIdx < shell.electrons.length; eIdx++) {
          const e = shell.electrons[eIdx];
          const angle = e.baseAngle + electronAngleOffset;
          const lx = Math.cos(angle) * shell.radius;
          const ly = Math.sin(angle) * shell.radius;
          const [wx, wy, wz] = rotateVecByQuat(lx, ly, 0, totalQuat);
          const proj = this._project(wx, wy, wz, cx, cy, scale, fov);

          // Trail points behind electron
          const trail = [];
          for (let t = 1; t <= trailSteps; t++) {
            const ta = angle - (trailArc * t) / trailSteps;
            const tlx = Math.cos(ta) * shell.radius;
            const tly = Math.sin(ta) * shell.radius;
            const [twx, twy, twz] = rotateVecByQuat(tlx, tly, 0, totalQuat);
            trail.push(this._project(twx, twy, twz, cx, cy, scale, fov));
          }

          drawables.push({
            kind: 'electron',
            x: proj.x,
            y: proj.y,
            z: proj.z,
            r: Math.max(2.2, shellElectronR * proj.factor),
            isValence: isOutermost,
            isAltTone,
            trail
          });
        }
      }

      // Project nucleons
      for (let i = 0; i < this.nucleons.length; i++) {
        const n = this.nucleons[i];
        const [wx, wy, wz] = rotateVecByQuat(n.x, n.y, n.z, this.quat);
        const proj = this._project(wx, wy, wz, cx, cy, scale, fov);
        drawables.push({
          kind: 'nucleon',
          type: n.type,
          x: proj.x,
          y: proj.y,
          z: proj.z,
          r: Math.max(2.5, n.r * proj.factor)
        });
      }

      // 1) Draw BACK orbital ring segments (behind nucleus)
      ctx.lineCap = 'round';
      for (let i = 0; i < backRingPaths.length; i++) {
        const seg = backRingPaths[i];
        const depthFade = Math.max(0.32, 1 + seg.midZ / 260);
        const rr = seg.isOutermost ? valRingR : seg.isAltTone ? 132 : 168;
        const rg = seg.isOutermost ? valRingG : seg.isAltTone ? 156 : 162;
        const rb = seg.isOutermost ? valRingB : seg.isAltTone ? 182 : 152;
        ctx.strokeStyle = `rgba(${rr}, ${rg}, ${rb}, ${(seg.baseAlpha * 0.58 * depthFade).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.65, 0.9 * scale * depthFade);
        ctx.beginPath();
        ctx.moveTo(seg.p0.x, seg.p0.y);
        ctx.lineTo(seg.p1.x, seg.p1.y);
        ctx.stroke();
      }

      // Sort all drawables back-to-front by Z
      drawables.sort((a, b) => a.z - b.z);

      // Draw back-half drawables (z < 0)
      let idx = 0;
      while (idx < drawables.length && drawables[idx].z < 0) {
        this._drawParticle(ctx, drawables[idx]);
        idx++;
      }

      // Subtle matte depth shadow behind nucleus center (replaces bright red neon glow)
      const nucShadowR = Math.max(18, this.nucleusRadius * 1.75 * scale);
      const nucShadow = ctx.createRadialGradient(cx, cy, 2, cx, cy, nucShadowR);
      nucShadow.addColorStop(0, 'rgba(10, 12, 18, 0.28)');
      nucShadow.addColorStop(0.6, 'rgba(10, 12, 18, 0.08)');
      nucShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nucShadow;
      ctx.beginPath();
      ctx.arc(cx, cy, nucShadowR, 0, Math.PI * 2);
      ctx.fill();

      // 2) Draw FRONT orbital ring segments (in front of nucleus)
      for (let i = 0; i < frontRingPaths.length; i++) {
        const seg = frontRingPaths[i];
        const depthBoost = Math.min(1.25, 1 + seg.midZ / 250);
        const rr = seg.isOutermost ? valRingR : seg.isAltTone ? 132 : 168;
        const rg = seg.isOutermost ? valRingG : seg.isAltTone ? 156 : 162;
        const rb = seg.isOutermost ? valRingB : seg.isAltTone ? 182 : 152;
        ctx.strokeStyle = `rgba(${rr}, ${rg}, ${rb}, ${Math.min(0.6, seg.baseAlpha * 1.08 * depthBoost).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.75, 1.05 * scale * depthBoost);
        ctx.beginPath();
        ctx.moveTo(seg.p0.x, seg.p0.y);
        ctx.lineTo(seg.p1.x, seg.p1.y);
        ctx.stroke();
      }

      // 3) Draw front-half drawables (z >= 0)
      while (idx < drawables.length) {
        this._drawParticle(ctx, drawables[idx]);
        idx++;
      }

      // 4) In expanded Bohr 3D view, draw subtle matte shell markers (K·2 .. Q·8) along top axis
      if (this.mode === 'bohr' && this.isExpandedView && this.shells.length > 0 && minDim >= 360) {
        ctx.save();
        ctx.font = '600 10px "JetBrains Mono", Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let s = 0; s < this.shells.length; s++) {
          const sh = this.shells[s];
          const [wx, wy, wz] = rotateVecByQuat(0, -sh.radius, 0, this.quat);
          const p = this._project(wx, wy, wz, cx, cy, scale, fov);
          const tag = `${sh.letter}·${sh.electrons.length}`;
          const tw = ctx.measureText(tag).width + 8;
          ctx.fillStyle = 'rgba(14, 17, 23, 0.78)';
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(p.x - tw * 0.5, p.y - 7.5, tw, 15, 3.5);
          } else {
            ctx.rect(p.x - tw * 0.5, p.y - 7.5, tw, 15);
          }
          ctx.fill();
          ctx.strokeStyle = sh.isValence
            ? `rgba(${valRingR}, ${valRingG}, ${valRingB}, 0.58)`
            : sh.isAltTone
            ? 'rgba(138, 158, 180, 0.35)'
            : 'rgba(168, 160, 148, 0.35)';
          ctx.lineWidth = 0.85;
          ctx.stroke();
          ctx.fillStyle = sh.isValence ? '#f8fafc' : sh.isAltTone ? '#c4d4e6' : '#dcd6cb';
          ctx.fillText(tag, p.x, p.y + 0.5);
        }
        ctx.restore();
      }

      ctx.restore();
    }

    _renderIdlePlaceholder(ctx, w, h) {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const minDim = Math.min(w, h);
      const scale = (minDim / 345) * 0.92;
      const fov = 560;

      // Subtle neutral slate ambient depth
      const haloR = minDim * 0.34;
      const bgGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, haloR);
      bgGlow.addColorStop(0, 'rgba(148, 163, 184, 0.055)');
      bgGlow.addColorStop(0.55, 'rgba(148, 163, 184, 0.018)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      ctx.fill();

      // Three gentle translucent preview rings, each rotating independently on its own 3D axis around a stationary core
      const segs = 60;
      const radius = 105;

      this.idleRingSpecs.forEach((spec, sIdx) => {
        const [tx, ty, tz] = spec.tilt;
        let pq = quatFromAxisAngle(0, 0, 1, tz);
        pq = quatMultiply(quatFromAxisAngle(0, 1, 0, ty), pq);
        pq = quatMultiply(quatFromAxisAngle(1, 0, 0, tx), pq);
        const baseQuat = quatNormalize(pq);
        const [ax, ay, az] = spec.axis;
        const spinQ = quatFromAxisAngle(ax, ay, az, this.idleRingAngles[sIdx] || 0);
        const ringQuat = quatNormalize(quatMultiply(spinQ, baseQuat));
        const totalQuat = quatNormalize(quatMultiply(this.quat, ringQuat));

        ctx.beginPath();
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const [wx, wy, wz] = rotateVecByQuat(Math.cos(a) * radius, Math.sin(a) * radius, 0, totalQuat);
          const p = this._project(wx, wy, wz, cx, cy, scale, fov);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
        ctx.lineWidth = 0.95;
        ctx.stroke();

        // One calm orbiting warm amber marker dot per ring
        const ea = this.orbitTime * (0.48 + sIdx * 0.12) + sIdx * 2.1;
        const [ex, ey, ez] = rotateVecByQuat(Math.cos(ea) * radius, Math.sin(ea) * radius, 0, totalQuat);
        const ep = this._project(ex, ey, ez, cx, cy, scale, fov);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.78)';
        ctx.beginPath();
        ctx.arc(ep.x, ep.y, 2.7, 0, Math.PI * 2);
        ctx.fill();
      });

      // Matte dark slate central core
      const coreR = 10.5 * scale;
      const coreGrad = ctx.createRadialGradient(
        cx - coreR * 0.22,
        cy - coreR * 0.24,
        coreR * 0.2,
        cx,
        cy,
        coreR
      );
      coreGrad.addColorStop(0, '#64748b');
      coreGrad.addColorStop(0.55, '#475569');
      coreGrad.addColorStop(1, '#252d3b');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();
    }

    _drawParticle(ctx, item) {
      if (item.kind === 'nucleon') {
        const { x, y, r, type } = item;
        const sprite = type === 'p' ? this.protonSprite : this.neutronSprite;
        // Sprite radius is 30 inside 64x64 canvas
        const size = r * (64 / 30);
        ctx.drawImage(sprite, x - size * 0.5, y - size * 0.5, size, size);
      } else {
        // Electron with thin, subtle natural orbital trail & matte amber/brass sprite
        const { x, y, r, z, isValence, isAltTone, trail } = item;
        const depthAlpha = Math.max(0.45, Math.min(1, 0.76 + z / 290));
        const eRgb = isValence
          ? this.valenceElectronRgb
          : isAltTone
          ? this.innerElectronAltRgb
          : this.innerElectronRgb;
        const er = eRgb.r;
        const eg = eRgb.g;
        const eb = eRgb.b;

        // Draw orbital trail (brighter & luminous for outermost valence electrons)
        if (trail && trail.length > 0) {
          let prevX = x;
          let prevY = y;
          const trailBoost = isValence ? 0.44 : 0.24;
          for (let i = 0; i < trail.length; i++) {
            const tp = trail[i];
            const frac = 1 - (i + 1) / (trail.length + 1);
            ctx.strokeStyle = `rgba(${er}, ${eg}, ${eb}, ${(frac * trailBoost * depthAlpha).toFixed(3)})`;
            ctx.lineWidth = Math.max(0.55, r * (isValence ? 0.62 : 0.52) * frac);
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(tp.x, tp.y);
            ctx.stroke();
            prevX = tp.x;
            prevY = tp.y;
          }
        }

        // Blit electron sprite (valence: glowing 96x96 coreR=15 + soft additive aura; inner: matte 64x64 coreR=17)
        if (isValence) {
          const pulse = 0.92 + 0.08 * Math.sin(this.time * 2.5);
          const halfSize = r * (48 / 15);
          const glowHalf = halfSize * (1.22 + 0.08 * pulse);
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = Math.min(1, depthAlpha * 0.5 * pulse);
          ctx.drawImage(this.valenceElectronSprite, x - glowHalf, y - glowHalf, glowHalf * 2, glowHalf * 2);
          ctx.restore();

          ctx.globalAlpha = Math.min(1, depthAlpha * 1.08);
          ctx.drawImage(this.valenceElectronSprite, x - halfSize, y - halfSize, halfSize * 2, halfSize * 2);
          ctx.globalAlpha = 1;
        } else {
          const sprite = isAltTone ? this.innerElectronAltSprite : this.innerElectronSprite;
          const halfSize = r * (32 / 17);
          ctx.globalAlpha = depthAlpha;
          ctx.drawImage(sprite, x - halfSize, y - halfSize, halfSize * 2, halfSize * 2);
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  window.Atom3DRenderer = Atom3DRenderer;
})();
