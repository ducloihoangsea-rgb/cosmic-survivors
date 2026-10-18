// Weapons, Companion Drones and Projectiles System with Evolutionary Progression
import { sound } from './audio.js';
import { FloatingText, Particle } from './particles.js';

export class WeaponManager {
  constructor(game) {
    this.game = game;
    this.weapons = {
      blaster: {
        id: 'blaster',
        level: 1,
        maxLevel: 5,
        timer: 0,
        icon: '⚡',
        rarity: 'Common'
      },
      orbs: {
        id: 'orbs',
        level: 0,
        maxLevel: 5,
        angle: 0,
        icon: '🪐',
        rarity: 'Rare'
      },
      lightning: {
        id: 'lightning',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: '🌩️',
        rarity: 'Epic'
      },
      glaive: {
        id: 'glaive',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: '🌀',
        rarity: 'Rare'
      },
      missiles: {
        id: 'missiles',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: '🚀',
        rarity: 'Epic'
      },
      wingmen: {
        id: 'wingmen',
        level: 0,
        maxLevel: 5,
        timer: 0,
        angle: 0,
        icon: '🛸',
        rarity: 'Epic'
      }
    };

    this.projectiles = [];
    this.shockwaves = [];
    this.blackHoles = [];
  }

  spawnBlackHole(x, y, mult = 1.0) {
    this.blackHoles.push(new BlackHole(x, y, mult));
  }

  update(dt, player, enemies) {
    const fireMult = player.stats.fireRateMult * (1 + (player.berserkerAtkSpdBonus || 0)) * (player.isCarrier ? 1.15 : 1.0);

    // 1. Blaster logic
    const b = this.weapons.blaster;
    if (b.level > 0) {
      const cooldown = Math.max(0.12, (0.55 - b.level * 0.08) / fireMult);
      b.timer += dt;
      if (b.timer >= cooldown) {
        b.timer = 0;
        this.fireBlaster(player, enemies);
      }
    }

    // 2. Orbiting Orbs logic
    const orb = this.weapons.orbs;
    if (orb.level > 0) {
      const speed = (2.2 + orb.level * 0.5) * fireMult;
      orb.angle = (orb.angle + speed * dt) % (Math.PI * 2);
      this.checkOrbCollisions(player, enemies);
    }

    // 3. Lightning logic
    const light = this.weapons.lightning;
    if (light.level > 0) {
      const lCooldown = Math.max(0.6, (2.2 - light.level * 0.3) / fireMult);
      light.timer += dt;
      if (light.timer >= lCooldown) {
        light.timer = 0;
        this.fireLightning(player, enemies);
      }
    }

    // 4. Glaive logic
    const gl = this.weapons.glaive;
    if (gl.level > 0) {
      const gCooldown = Math.max(0.8, (2.8 - gl.level * 0.35) / fireMult);
      gl.timer += dt;
      if (gl.timer >= gCooldown) {
        gl.timer = 0;
        this.fireGlaive(player, enemies);
      }
    }

    // 5. Micro-Missiles logic
    const ms = this.weapons.missiles;
    if (ms.level > 0) {
      const mCooldown = Math.max(1.0, (3.2 - ms.level * 0.4) / fireMult);
      ms.timer += dt;
      if (ms.timer >= mCooldown) {
        ms.timer = 0;
        this.fireMissiles(player, enemies);
      }
    }

    // 6. Wingmen Support Drones logic
    const wm = this.weapons.wingmen;
    if (wm.level > 0) {
      wm.angle = (wm.angle + 1.8 * dt) % (Math.PI * 2);
      const wCooldown = Math.max(0.3, (0.9 - wm.level * 0.12) / fireMult);
      wm.timer += dt;
      if (wm.timer >= wCooldown) {
        wm.timer = 0;
        this.fireWingmen(player, enemies);
      }
    }

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt, enemies, this.game);
      if (p.isDead) {
        this.projectiles.splice(i, 1);
      }
    }

    // Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.update(dt, enemies, this.game);
      if (sw.isDead) {
        this.shockwaves.splice(i, 1);
      }
    }

    // Update Black Holes
    for (let i = this.blackHoles.length - 1; i >= 0; i--) {
      const bh = this.blackHoles[i];
      bh.update(dt, enemies, this.game);
      if (bh.isDead) {
        this.blackHoles.splice(i, 1);
      }
    }
  }

  triggerEmpShockwave(player) {
    sound.playEmpShockwave();
    this.shockwaves.push(new EmpShockwave(player.x, player.y, 140 * player.stats.damageMult));
  }

  fireBlaster(player, enemies) {
    if (enemies.length === 0) return;
    let target = enemies[0];
    let minDistSq = (target.x - player.x) ** 2 + (target.y - player.y) ** 2;
    for (let i = 1; i < enemies.length; i++) {
      const e = enemies[i];
      const distSq = (e.x - player.x) ** 2 + (e.y - player.y) ** 2;
      if (distSq < minDistSq) {
        minDistSq = distSq;
        target = e;
      }
    }
    const angle = Math.atan2(target.y - player.y, target.x - player.x);
    const bLvl = this.weapons.blaster.level;
    const baseDamage = 18 + bLvl * 10;
    const count = bLvl >= 5 ? 5 : (bLvl >= 3 ? 3 : (bLvl >= 2 ? 2 : 1));

    sound.playShoot('blaster');

    for (let i = 0; i < count; i++) {
      const spread = (i - (count - 1) / 2) * 0.16;
      this.projectiles.push(new BlasterBullet(
        player.x,
        player.y,
        angle + spread,
        baseDamage * player.stats.damageMult,
        (bLvl >= 4 ? 2 : 1) + (player.isSniper ? 2 : 0),
        bLvl >= 5,
        player.isSniper ? '#38bdf8' : null,
        'blaster'
      ));
    }
  }

  checkOrbCollisions(player, enemies) {
    const orb = this.weapons.orbs;
    const count = orb.level >= 5 ? 6 : (orb.level + 1);
    const radius = 65 + orb.level * 8;
    const damage = (14 + orb.level * 8) * player.stats.damageMult;

    for (let i = 0; i < count; i++) {
      const a = orb.angle + (i * Math.PI * 2) / count;
      const ox = player.x + Math.cos(a) * radius;
      const oy = player.y + Math.sin(a) * radius;

      for (const enemy of enemies) {
        const dist = Math.hypot(enemy.x - ox, enemy.y - oy);
        if (dist < 18 + enemy.radius) {
          if (!enemy.lastOrbHit || Date.now() - enemy.lastOrbHit > 220) {
            enemy.lastOrbHit = Date.now();
            this.game.damageEnemy(enemy, damage, false, 'orbs');
            const pushAngle = Math.atan2(enemy.y - player.y, enemy.x - player.x);
            enemy.x += Math.cos(pushAngle) * 8;
            enemy.y += Math.sin(pushAngle) * 8;
          }
        }
      }
    }
  }

  fireLightning(player, enemies) {
    if (enemies.length === 0) return;
    const light = this.weapons.lightning;
    const chainCount = 2 + light.level * 2;
    const damage = (35 + light.level * 18) * player.stats.damageMult;

    const nearby = enemies.filter(e => Math.hypot(e.x - player.x, e.y - player.y) < 450);
    if (nearby.length === 0) return;

    sound.playShoot('lightning');
    let current = nearby[Math.floor(Math.random() * nearby.length)];
    const struck = new Set();
    const chainPoints = [{ x: current.x, y: current.y - 300 }, { x: current.x, y: current.y }];

    struck.add(current);
    this.game.damageEnemy(current, damage, true, 'lightning');

    for (let i = 0; i < chainCount; i++) {
      let next = null;
      let minDist = 220;
      for (const e of enemies) {
        if (!struck.has(e)) {
          const d = Math.hypot(e.x - current.x, e.y - current.y);
          if (d < minDist) {
            minDist = d;
            next = e;
          }
        }
      }
      if (next) {
        chainPoints.push({ x: next.x, y: next.y });
        struck.add(next);
        this.game.damageEnemy(next, damage * 0.85, false, 'lightning');
        current = next;
      } else {
        break;
      }
    }

    this.projectiles.push(new LightningVisual(chainPoints));
  }

  fireGlaive(player, enemies) {
    if (enemies.length === 0) return;
    const gl = this.weapons.glaive;
    const damage = (28 + gl.level * 12) * player.stats.damageMult;
    const bounces = 3 + gl.level * 2;

    sound.playShoot('glaive');
    this.projectiles.push(new BouncingGlaive(player.x, player.y, damage, bounces, enemies));
  }

  fireMissiles(player, enemies) {
    if (enemies.length === 0) return;
    const ms = this.weapons.missiles;
    const count = ms.level >= 5 ? 10 : (2 + ms.level * 2);
    const damage = (32 + ms.level * 14) * player.stats.damageMult;

    sound.playMissileLaunch();

    for (let i = 0; i < count; i++) {
      const launchAngle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      this.projectiles.push(new HeatSeekingMissile(player.x, player.y, launchAngle, damage, enemies, ms.level >= 5));
    }
  }

  fireWingmen(player, enemies) {
    if (enemies.length === 0) return;
    const wm = this.weapons.wingmen;
    const droneCount = wm.level >= 5 ? 4 : 2;
    const radius = 50;
    const damage = (16 + wm.level * 7) * player.stats.damageMult;

    for (let i = 0; i < droneCount; i++) {
      const a = wm.angle + (i * Math.PI * 2) / droneCount;
      const dx = player.x + Math.cos(a) * radius;
      const dy = player.y + Math.sin(a) * radius;

      // Find nearest enemy to drone
      let target = null;
      let minDist = 380;
      for (const e of enemies) {
        const d = Math.hypot(e.x - dx, e.y - dy);
        if (d < minDist) {
          minDist = d;
          target = e;
        }
      }

      if (target) {
        const aimAngle = Math.atan2(target.y - dy, target.x - dx);
        this.projectiles.push(new BlasterBullet(dx, dy, aimAngle, damage, 1, false, '#38bdf8', 'wingmen'));
      }
    }
  }

  draw(ctx, player) {
    // Draw Orbiting Orbs
    const orb = this.weapons.orbs;
    if (orb.level > 0) {
      const count = orb.level >= 5 ? 6 : (orb.level + 1);
      const radius = 65 + orb.level * 8;

      for (let i = 0; i < count; i++) {
        const a = orb.angle + (i * Math.PI * 2) / count;
        const ox = player.x + Math.cos(a) * radius;
        const oy = player.y + Math.sin(a) * radius;

        ctx.save();
        ctx.shadowColor = orb.level >= 5 ? '#f43f5e' : '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.fillStyle = orb.level >= 5 ? '#fda4af' : '#7dd3fc';
        ctx.beginPath();
        ctx.arc(ox, oy, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ox, oy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Draw Wingmen Companion Drones
    const wm = this.weapons.wingmen;
    if (wm.level > 0) {
      const droneCount = wm.level >= 5 ? 4 : 2;
      const radius = 50;

      for (let i = 0; i < droneCount; i++) {
        const a = wm.angle + (i * Math.PI * 2) / droneCount;
        const dx = player.x + Math.cos(a) * radius;
        const dy = player.y + Math.sin(a) * radius;

        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(a + Math.PI / 2);
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.moveTo(9, 0);
        ctx.lineTo(-7, -6);
        ctx.lineTo(-4, 0);
        ctx.lineTo(-7, 6);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(1, 0, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Draw Shockwaves
    for (const sw of this.shockwaves) {
      sw.draw(ctx);
    }

    // Draw Black Holes
    for (const bh of this.blackHoles) {
      bh.draw(ctx);
    }

    // Draw all projectiles
    for (const p of this.projectiles) {
      p.draw(ctx);
    }
  }
}

class BlasterBullet {
  constructor(x, y, angle, damage, pierce = 1, evolved = false, color = null, source = 'blaster') {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = evolved ? 800 : 620;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    this.damage = damage;
    this.pierce = pierce;
    this.evolved = evolved;
    this.customColor = color;
    this.source = source;
    this.life = 1.2;
    this.isDead = false;
    this.radius = evolved ? 7 : 4.5;
  }

  update(dt, enemies, game) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }

    for (const e of enemies) {
      const dist = Math.hypot(e.x - this.x, e.y - this.y);
      if (dist < this.radius + e.radius) {
        game.damageEnemy(e, this.damage, false, this.source);
        this.pierce--;
        if (this.pierce <= 0) {
          this.isDead = true;
          break;
        }
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowColor = this.customColor || (this.evolved ? '#e11d48' : '#00f2fe');
    ctx.shadowBlur = 10;
    ctx.fillStyle = this.customColor || (this.evolved ? '#fb7185' : '#4facfe');

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = this.radius * 0.8;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - Math.cos(this.angle) * 16, this.y - Math.sin(this.angle) * 16);
    ctx.stroke();
    ctx.restore();
  }
}

class HeatSeekingMissile {
  constructor(x, y, angle, damage, enemies, evolved = false) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.damage = damage;
    this.speed = 360;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    this.isDead = false;
    this.life = 2.4;
    this.evolved = evolved;
    this.target = null;
    this.retargetTimer = 0;
  }

  update(dt, enemies, game) {
    this.life -= dt;
    if (this.life <= 0) {
      this.explode(game);
      return;
    }

    // Retarget nearest enemy periodically
    this.retargetTimer -= dt;
    if (this.retargetTimer <= 0 || !this.target || this.target.isDead) {
      this.retargetTimer = 0.2;
      let minDist = 500;
      this.target = null;
      for (const e of enemies) {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < minDist) {
          minDist = d;
          this.target = e;
        }
      }
    }

    if (this.target) {
      const targetAngle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
      // Smooth angular turn
      let diff = targetAngle - this.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.angle += diff * Math.min(1.0, 7.5 * dt);
    }

    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Smoke trail
    if (Math.random() < 0.6) {
      game.particles.push(new Particle(this.x, this.y, this.evolved ? '#f59e0b' : '#94a3b8', 1.5, 2.5, 0.5));
    }

    for (const e of enemies) {
      const dist = Math.hypot(e.x - this.x, e.y - this.y);
      if (dist < 10 + e.radius) {
        this.explode(game, enemies);
        break;
      }
    }
  }

  explode(game, enemies = []) {
    this.isDead = true;
    sound.playExplosion();

    const splashRadius = this.evolved ? 90 : 55;

    for (const e of enemies) {
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d <= splashRadius) {
        game.damageEnemy(e, this.damage, false, 'missiles');
      }
    }

    for (let i = 0; i < 14; i++) {
      game.particles.push(new Particle(this.x, this.y, this.evolved ? '#ef4444' : '#f59e0b', 5, 4, 0.6));
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.shadowColor = this.evolved ? '#ef4444' : '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.fillStyle = this.evolved ? '#dc2626' : '#ea580c';

    // Missile body
    ctx.fillRect(-7, -2.5, 14, 5);
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(7, -2.5);
    ctx.lineTo(12, 0);
    ctx.lineTo(7, 2.5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

class EmpShockwave {
  constructor(x, y, damage) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.radius = 10;
    this.maxRadius = 380;
    this.speed = 850;
    this.isDead = false;
    this.hitEnemies = new Set();
  }

  update(dt, enemies, game) {
    this.radius += this.speed * dt;
    if (this.radius >= this.maxRadius) {
      this.isDead = true;
      return;
    }

    for (const e of enemies) {
      if (this.hitEnemies.has(e)) continue;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (Math.abs(d - this.radius) < 35) {
        this.hitEnemies.add(e);
        game.damageEnemy(e, this.damage, true, 'emp');
        const pushAngle = Math.atan2(e.y - this.y, e.x - this.x);
        e.x += Math.cos(pushAngle) * 45;
        e.y += Math.sin(pushAngle) * 45;
      }
    }
  }

  draw(ctx) {
    const alpha = Math.max(0, 1.0 - this.radius / this.maxRadius);
    ctx.save();
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 22;
    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.96, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
}

class LightningVisual {
  constructor(points) {
    this.points = points;
    this.life = 0.16;
    this.isDead = false;
  }

  update(dt) {
    this.life -= dt;
    if (this.life <= 0) this.isDead = true;
  }

  draw(ctx) {
    if (this.points.length < 2) return;
    ctx.save();
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 16;
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      const p1 = this.points[i - 1];
      const p2 = this.points[i];
      const mx = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 30;
      const my = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 30;
      ctx.lineTo(mx, my);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();
    ctx.restore();
  }
}

class BouncingGlaive {
  constructor(x, y, damage, bounces, enemies) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.bouncesLeft = bounces;
    this.isDead = false;
    this.angle = 0;
    this.speed = 520;
    this.radius = 8;
    this.hitCooldown = new Set();

    if (enemies.length > 0) {
      const e = enemies[0];
      const a = Math.atan2(e.y - y, e.x - x);
      this.vx = Math.cos(a) * this.speed;
      this.vy = Math.sin(a) * this.speed;
    } else {
      this.vx = this.speed;
      this.vy = 0;
    }
  }

  update(dt, enemies, game) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.angle += 14 * dt;

    for (const e of enemies) {
      if (this.hitCooldown.has(e)) continue;
      const dist = Math.hypot(e.x - this.x, e.y - this.y);
      if (dist < this.radius + e.radius) {
        game.damageEnemy(e, this.damage, false, 'glaive');
        this.hitCooldown.add(e);
        this.bouncesLeft--;

        if (this.bouncesLeft <= 0) {
          this.isDead = true;
          return;
        }

        const candidates = enemies.filter(target => !this.hitCooldown.has(target));
        if (candidates.length > 0) {
          candidates.sort((a, b) => Math.hypot(a.x - this.x, a.y - this.y) - Math.hypot(b.x - this.x, b.y - this.y));
          const next = candidates[0];
          const bounceAngle = Math.atan2(next.y - this.y, next.x - this.x);
          this.vx = Math.cos(bounceAngle) * this.speed;
          this.vy = Math.sin(bounceAngle) * this.speed;
        } else {
          this.vx = -this.vx;
          this.vy = -this.vy;
        }
        break;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#c084fc';

    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(6, -14);
      ctx.lineTo(0, -6);
      ctx.lineTo(-6, -14);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

export class BlackHole {
  constructor(x, y, damageMult = 1.0) {
    this.x = x;
    this.y = y;
    this.damageMult = damageMult;
    this.life = 6.0;
    this.pullRadius = 340;
    this.pullStrength = 190;
    this.damageRadius = 160;
    this.tickTimer = 0;
    this.tickInterval = 0.28;
    this.angle = 0;
    this.isDead = false;
  }

  update(dt, enemies, game) {
    this.life -= dt;
    this.angle += dt * 4.5;

    if (this.life <= 0) {
      this.isDead = true;
      // Final Implosion / Collapse blast!
      const finalDmg = Math.round(320 * this.damageMult);
      for (const e of enemies) {
        const dist = Math.hypot(e.x - this.x, e.y - this.y);
        if (dist < this.pullRadius) {
          game.damageEnemy(e, finalDmg, true, 'blackhole');
        }
      }
      sound.playExplosion();
      for (let i = 0; i < 40; i++) {
        game.particles.push(new Particle(this.x, this.y, Math.random() < 0.5 ? '#ef4444' : '#a855f7', 8, 5.5, 1.2));
      }
      return;
    }

    // Pull enemies towards vortex center
    for (const e of enemies) {
      const dx = this.x - e.x;
      const dy = this.y - e.y;
      const dist = Math.hypot(dx, dy);
      if (dist < this.pullRadius && dist > 10) {
        const pullFactor = (1 - dist / this.pullRadius) * this.pullStrength * dt;
        e.x += (dx / dist) * pullFactor;
        e.y += (dy / dist) * pullFactor;
      }
    }

    // Tick damage
    this.tickTimer -= dt;
    if (this.tickTimer <= 0) {
      this.tickTimer = this.tickInterval;
      const tickDmg = Math.round(48 * this.damageMult);
      for (const e of enemies) {
        const dist = Math.hypot(e.x - this.x, e.y - this.y);
        if (dist < this.damageRadius) {
          game.damageEnemy(e, tickDmg, false, 'blackhole');
        }
      }
      // Accretion swirl particles
      for (let i = 0; i < 3; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 40 + Math.random() * 80;
        game.particles.push(new Particle(this.x + Math.cos(a) * r, this.y + Math.sin(a) * r, '#ef4444', 3, 3, 0.4));
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Outer gravity gravitational lensing distortion ring
    const pulse = 1 + Math.sin(this.angle * 3) * 0.08;
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(0, 0, this.damageRadius * pulse, 0, Math.PI * 2);
    ctx.stroke();

    // Swirling accretion disk
    ctx.rotate(this.angle);
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 48 + i * 16, 0, Math.PI * 0.75);
      ctx.stroke();
    }

    // Fiery Corona
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 25;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.stroke();

    // Event Horizon (Deep Pitch Black Center)
    ctx.fillStyle = '#05050a';
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 2);
    ctx.fill();

    // Inner Singularity spark
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

