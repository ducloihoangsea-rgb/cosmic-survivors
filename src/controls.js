// 1-Thumb Virtual Floating Joystick & Desktop Keyboard Controller

export class Controller {
  constructor(canvas) {
    this.canvas = canvas;
    this.moveX = 0;
    this.moveY = 0;

    // Joystick Touch state
    this.touchId = null;
    this.originX = 0;
    this.originY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDragging = false;
    this.maxRadius = 50;

    // Keyboard state
    this.keys = {
      w: false, a: false, s: false, d: false,
      ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
    };

    this.bindEvents();
  }

  bindEvents() {
    // Touch Events
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
    window.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });

    // Mouse drag as fallback testing for desktop
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      const rect = this.canvas.getBoundingClientRect();
      this.originX = e.clientX - rect.left;
      this.originY = e.clientY - rect.top;
      this.currentX = this.originX;
      this.currentY = this.originY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const rect = this.canvas.getBoundingClientRect();
      this.currentX = e.clientX - rect.left;
      this.currentY = e.clientY - rect.top;
      this.updateMovement();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.moveX = 0;
        this.moveY = 0;
      }
    });

    // Keyboard Events
    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key) || this.keys.hasOwnProperty(e.key.toLowerCase())) {
        this.keys[e.key] = true;
        this.keys[e.key.toLowerCase()] = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key) || this.keys.hasOwnProperty(e.key.toLowerCase())) {
        this.keys[e.key] = false;
        this.keys[e.key.toLowerCase()] = false;
      }
    });
  }

  handleTouchStart(e) {
    e.preventDefault();
    if (this.touchId !== null) return;
    const touch = e.changedTouches[0];
    this.touchId = touch.identifier;
    const rect = this.canvas.getBoundingClientRect();
    this.originX = touch.clientX - rect.left;
    this.originY = touch.clientY - rect.top;
    this.currentX = this.originX;
    this.currentY = this.originY;
    this.isDragging = true;
  }

  handleTouchMove(e) {
    if (this.touchId === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === this.touchId) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        this.currentX = touch.clientX - rect.left;
        this.currentY = touch.clientY - rect.top;
        this.updateMovement();
        break;
      }
    }
  }

  handleTouchEnd(e) {
    if (this.touchId === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === this.touchId) {
        this.touchId = null;
        this.isDragging = false;
        this.moveX = 0;
        this.moveY = 0;
        break;
      }
    }
  }

  updateMovement() {
    const dx = this.currentX - this.originX;
    const dy = this.currentY - this.originY;
    const dist = Math.hypot(dx, dy);

    if (dist < 6) {
      this.moveX = 0;
      this.moveY = 0;
      return;
    }

    const angle = Math.atan2(dy, dx);
    const intensity = Math.min(dist / this.maxRadius, 1.0);
    this.moveX = Math.cos(angle) * intensity;
    this.moveY = Math.sin(angle) * intensity;
  }

  getVector() {
    // If touch/mouse active
    if (this.isDragging) {
      return { x: this.moveX, y: this.moveY };
    }

    // Keyboard fallback
    let kx = 0;
    let ky = 0;
    if (this.keys.w || this.keys.ArrowUp) ky -= 1;
    if (this.keys.s || this.keys.ArrowDown) ky += 1;
    if (this.keys.a || this.keys.ArrowLeft) kx -= 1;
    if (this.keys.d || this.keys.ArrowRight) kx += 1;

    const len = Math.hypot(kx, ky);
    if (len > 0) {
      return { x: kx / len, y: ky / len };
    }

    return { x: 0, y: 0 };
  }

  draw(ctx) {
    if (!this.isDragging) return;

    ctx.save();
    // Joystick Base
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
    ctx.beginPath();
    ctx.arc(this.originX, this.originY, this.maxRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Knob position clamped
    const dx = this.currentX - this.originX;
    const dy = this.currentY - this.originY;
    const dist = Math.min(Math.hypot(dx, dy), this.maxRadius);
    const angle = Math.atan2(dy, dx);
    const kx = this.originX + Math.cos(angle) * dist;
    const ky = this.originY + Math.sin(angle) * dist;

    // Joystick Knob
    ctx.fillStyle = '#38bdf8';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(kx, ky, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
