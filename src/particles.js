// High Performance Particle & Floating Combat Text Engine
import { art } from './art.js';

export class FloatingText {
  constructor(x, y, text, color = '#ffffff', size = 16, isCrit = false) {
    this.x = x + (Math.random() - 0.5) * 16;
    this.y = y - 10;
    this.text = text;
    this.color = color;
    this.size = size;
    this.isCrit = isCrit;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = isCrit ? -3.5 : -2;
    this.life = 1.0; // 1.0 to 0
    this.decay = isCrit ? 0.016 : 0.024;
    this.scale = isCrit ? 1.6 : 1.0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.06; // gravity
    this.life -= this.decay;
    if (this.isCrit && this.scale > 1.1) {
      this.scale -= 0.02;
    }
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.font = `900 ${Math.round(this.size * this.scale)}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';

    if (this.isCrit) {
      ctx.fillStyle = '#ffea00';
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#78350f';
      ctx.strokeText(this.text, this.x, this.y);
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = this.color;
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#000000';
      ctx.strokeText(this.text, this.x, this.y);
      ctx.fillText(this.text, this.x, this.y);
    }
    ctx.restore();
  }
}

export class Particle {
  constructor(x, y, color, speed = 3, size = 4, life = 1.0) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const spd = (0.5 + Math.random()) * speed;
    this.vx = Math.cos(angle) * spd;
    this.vy = Math.sin(angle) * spd;
    this.size = size;
    this.initialSize = size;
    this.life = life;
    this.maxLife = life;
    this.drag = 0.94;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.life -= 0.03;
    this.size = Math.max(0, this.initialSize * (this.life / this.maxLife));
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class Gem {
  constructor(x, y, value = 1) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.isAttracted = false;
    this.speed = 1.0;
    this.sparkleTimer = Math.random() * 60;

    // Gem Tier Color
    if (value >= 25) {
      this.color = '#a855f7'; // Purple Tier
      this.radius = 7;
      this.glow = '#d8b4fe';
    } else if (value >= 5) {
      this.color = '#22c55e'; // Green Tier
      this.radius = 5.5;
      this.glow = '#86efac';
    } else {
      this.color = '#00f2fe'; // Blue Tier
      this.radius = 4.5;
      this.glow = '#38bdf8';
    }
  }

  update(player) {
    this.sparkleTimer++;
    // Physics dampening initial scatter
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.92;
    this.vy *= 0.92;

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy);

    // Suction pull
    if (dist < player.magnetRadius || this.isAttracted) {
      this.isAttracted = true;
      // Exponential pull acceleration towards player (Vacuum Dopamine)
      this.speed += 0.85;
      const angle = Math.atan2(dy, dx);
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;

      if (dist < player.radius + this.radius + 6) {
        return true; // Collected!
      }
    }
    return false;
  }

  draw(ctx, animTime = 0) {
    art.drawGem(ctx, this, animTime);
  }
}

export class LuckyChest {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 16;
    this.sparkleTimer = 0;
  }

  update(player) {
    this.sparkleTimer += 0.05;
    const dist = Math.hypot(player.x - this.x, player.y - this.y);
    return dist < player.radius + this.radius;
  }

  draw(ctx, animTime = 0) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const pulse = 1 + Math.sin(animTime * 6) * 0.12;
    ctx.scale(pulse, pulse);

    // Golden Treasure Chest Box
    ctx.fillStyle = '#b45309';
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.fillRect(-12, -8, 24, 16);
    ctx.strokeRect(-12, -8, 24, 16);

    // Golden dome lid
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, -8, 12, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lock latch
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3, -4, 6, 8);

    ctx.restore();
  }
}
