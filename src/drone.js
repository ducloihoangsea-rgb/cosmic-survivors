// Autonomous Combat Mini Drone for Aegis Carrier Starship
import { sound } from './audio.js';
import { Particle, FloatingText } from './particles.js';
import { art } from './art.js';

export class DroneBullet {
  constructor(x, y, angle, damage, isEvolved = false) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 680;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    this.damage = damage;
    this.isEvolved = isEvolved;
    this.radius = 4;
    this.life = 0.9;
    this.isDead = false;
  }

  update(dt, enemies, game) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }

    // Check collision with nearby enemies using spatial grid or list
    const candidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.radius + 30) : enemies;
    for (let i = 0, len = candidates.length; i < len; i++) {
      const e = candidates[i];
      if (e.isDead) continue;
      const dist = Math.hypot(e.x - this.x, e.y - this.y);
      if (dist < this.radius + e.radius) {
        game.damageEnemy(e, this.damage, false, 'wingmen');
        this.isDead = true;
        game.particles.push(new Particle(this.x, this.y, this.isEvolved ? '#ef4444' : '#c084fc', 3, 2));
        break;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = this.isEvolved ? '#ef4444' : '#c084fc';
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(2, 0, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

export class MiniDrone {
  constructor(x, y, level = 1, isEvolved = false) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 80;
    this.vy = (Math.random() - 0.5) * 80;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 270;
    this.radius = 12;
    this.level = level;
    this.isEvolved = isEvolved;

    this.maxHp = 140 + (level - 1) * 40;
    this.hp = this.maxHp;
    this.duration = isEvolved ? 18.0 : 12.0;
    this.maxDuration = this.duration;
    this.damage = (35 + (level - 1) * 12);
    this.shootCooldown = Math.max(0.45, 0.85 - (level - 1) * 0.08);
    this.shootTimer = Math.random() * 0.4;
    this.isDead = false;
    this.orbitAngle = Math.random() * Math.PI * 2;
  }

  takeDamage(amount, game) {
    if (this.isDead) return;
    this.hp -= amount;
    if (this.hp <= 0) {
      this.destroy(game);
    }
  }

  destroy(game) {
    if (this.isDead) return;
    this.isDead = true;
    sound.playExplosion();
    const blastColor = this.isEvolved ? '#ef4444' : '#a855f7';
    for (let i = 0; i < 10; i++) {
      game.particles.push(new Particle(this.x, this.y, blastColor, 5, 3.5));
    }
  }

  update(dt, player, enemies, game) {
    this.duration -= dt;
    if (this.duration <= 0) {
      this.destroy(game);
      return;
    }

    // Find nearest target via Spatial Grid or enemies array
    const target = game.spatialGrid 
      ? game.spatialGrid.getNearest(this.x, this.y, 480) 
      : (enemies.length > 0 ? enemies[0] : null);

    if (target && !target.isDead) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const dist = Math.hypot(dx, dy);
      const targetAngle = Math.atan2(dy, dx);
      this.angle = targetAngle;

      // Keep combat stance around 110-140px
      if (dist > 130) {
        this.vx += Math.cos(targetAngle) * this.speed * dt * 4;
        this.vy += Math.sin(targetAngle) * this.speed * dt * 4;
      } else {
        // Strafe around target
        this.vx += -Math.sin(targetAngle) * this.speed * dt * 2.5;
        this.vy += Math.cos(targetAngle) * this.speed * dt * 2.5;
      }

      // Firing Logic
      this.shootTimer -= dt;
      if (this.shootTimer <= 0) {
        this.shootTimer = this.shootCooldown;
        sound.playShoot('blaster');
        const bulletDmg = this.damage * (player.stats?.damageMult || 1.0);
        game.weaponManager.projectiles.push(new DroneBullet(this.x, this.y, this.angle, bulletDmg, this.isEvolved));
      }
    } else {
      // Escort & Patrol around Mothership (Player)
      this.orbitAngle += dt * 2.2;
      const patrolDist = 85;
      const targetX = player.x + Math.cos(this.orbitAngle) * patrolDist;
      const targetY = player.y + Math.sin(this.orbitAngle) * patrolDist;
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      this.vx += dx * dt * 5.5;
      this.vy += dy * dt * 5.5;
      this.angle = Math.atan2(player.y - this.y, player.x - this.x);
    }

    // Drag / Friction
    this.vx *= 0.94;
    this.vy *= 0.94;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Contact collision with enemies: Absorb damage and counter-attack
    const contactCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.radius + 30) : enemies;
    for (let i = 0, len = contactCandidates.length; i < len; i++) {
      const e = contactCandidates[i];
      if (e.isDead) continue;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < this.radius + e.radius) {
        // Drone takes damage from mob contact
        this.takeDamage(18 * dt * 60, game);
        // Mob takes ramming counter-damage
        game.damageEnemy(e, this.damage * dt * 2.5, false, 'wingmen');
        // Push apart slightly
        const pushAngle = Math.atan2(this.y - e.y, this.x - e.x);
        this.vx += Math.cos(pushAngle) * 60;
        this.vy += Math.sin(pushAngle) * 60;
      }
    }
  }

  draw(ctx, animTime) {
    art.drawMiniDrone(ctx, this, animTime);
  }
}
