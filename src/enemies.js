// Enemy Spawning and Swarm AI System
import { art } from './art.js';
import { FloatingText, Particle } from './particles.js';

export class Enemy {
  constructor(x, y, type = 'crawler', waveMultiplier = 1.0) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.isDead = false;

    if (type === 'crawler') {
      this.radius = 12;
      this.speed = (95 + Math.random() * 30) * waveMultiplier;
      this.maxHp = 52 * waveMultiplier; // Máu tăng từ 38 -> 52
      this.color = '#ef4444'; // Red
      this.gemValue = 1;
      this.damage = 19; // Dame tăng từ 14 -> 19
      this.score = 10;
    } else if (type === 'speeder') {
      this.radius = 9;
      this.speed = (165 + Math.random() * 40) * waveMultiplier;
      this.maxHp = 30 * waveMultiplier; // Máu tăng từ 22 -> 30
      this.color = '#d946ef'; // Magenta
      this.gemValue = 2;
      this.damage = 15; // Dame tăng từ 10 -> 15
      this.score = 15;
    } else if (type === 'brute') {
      this.radius = 22;
      this.speed = 65 * waveMultiplier;
      this.maxHp = 380 * waveMultiplier; // Máu tăng từ 260 -> 380
      this.color = '#06b6d4'; // Cyan
      this.gemValue = 10;
      this.damage = 42; // Dame tăng từ 30 -> 42
      this.score = 50;
    } else if (type === 'boss') {
      this.radius = 36;
      this.speed = 70;
      this.maxHp = 2600 * waveMultiplier; // Máu Boss tăng từ 1800 -> 2600
      this.color = '#eab308'; // Gold
      this.gemValue = 50;
      this.damage = 60; // Dame Boss tăng từ 45 -> 60
      this.score = 500;
      this.isBoss = true;
    }

    this.hp = this.maxHp;
    this.hitFlash = 0;
    this.freezeTimer = 0;
  }

  update(dt, player) {
    if (this.freezeTimer > 0) {
      this.freezeTimer -= dt;
      // Completely frozen in time!
      return;
    }

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 0.001) {
      this.x += (dx / dist) * this.speed * dt;
      this.y += (dy / dist) * this.speed * dt;
    }

    if (this.hitFlash > 0) {
      this.hitFlash -= dt;
    }

    // Touch player damage / Ramming Collision
    if (dist < this.radius + player.radius) {
      // 💥 Crash Nova Fusion Mod: Ramming / collision triggers shield blast
      if (player.hasCrashNova && (player.crashNovaCooldown || 0) <= 0) {
        player.crashNovaCooldown = 0.35;
        player.triggerNovaBlast(false);
      }

      if (player.isRammer || player.hasDrill || (player.stats.mass || 1.0) >= 1.4) {
        // ☄️ Meteor / Drill Impact: Base * Mass * Speed * DamageMult
        const baseRam = player.baseStats?.ramDamage || 160;
        const ramDmg = baseRam * (player.stats.mass || 1.0) * player.stats.speedMult * player.stats.damageMult * (player.hasDrill ? 1.4 : 1.0);
        player.game.damageEnemy(this, ramDmg, true, 'ram');

        // Knockback enemy away violently (even further if hasDrill)
        if (dist > 0.001) {
          const kb = player.hasDrill ? 120 : 80;
          this.x -= (dx / dist) * kb;
          this.y -= (dy / dist) * kb;
        }

        // Magma sparks & fiery debris
        for (let i = 0; i < 5; i++) {
          player.game.particles.push(new Particle(this.x, this.y, '#f97316', 5, 4));
        }

        // Tông chết quái hồi máu!
        if (this.isDead && player.hp < player.maxHp) {
          player.hp = Math.min(player.maxHp, player.hp + 2);
          player.game.floatingTexts.push(new FloatingText(player.x, player.y - 30, '+2 HP', '#22c55e', 16, false));
        }

        // Player takes 70% reduced collision damage (receives only 30%, or 15% if hasDrill)
        const dmgReduct = player.hasDrill ? 0.15 : 0.30;
        player.takeDamage(this.damage * dt * dmgReduct);
      } else {
        player.takeDamage(this.damage * dt);
      }
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.hitFlash = 0.08;
    if (this.hp <= 0) {
      this.isDead = true;
    }
  }

  draw(ctx, animTime = 0) {
    art.drawEnemy(ctx, this, animTime);
  }
}

export class WaveSpawner {
  constructor(game) {
    this.game = game;
    this.gameTime = 0;
    this.spawnTimer = 0;
    this.hordeTimer = 0;
    this.nextHordeTime = 25; // Bầy quái ập vào sớm ở giây 25
    this.bossTimer = 0;
    this.nextBossTime = 45;  // Boss xuất hiện sớm ngay ở giây 45
  }

  update(dt, player) {
    this.gameTime += dt;
    this.spawnTimer += dt;
    this.hordeTimer += dt;
    this.bossTimer += dt;

    const waveMult = 1.0 + (this.gameTime / 60) * 0.55; // Tăng tiến độ khó nhanh hơn nữa
    const spawnInterval = Math.max(0.06, 0.45 - (this.gameTime / 60) * 0.10); // Xả quái dày đặc gấp đôi

    // Regular Spawning
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnStandardPack(player, waveMult);
    }

    // Horde Event Spawning
    if (this.hordeTimer >= this.nextHordeTime) {
      this.hordeTimer = 0;
      this.nextHordeTime = 40; // Mỗi 40s bầy quái hung hãn lại tràn vào
      this.triggerHorde(player, waveMult);
    }

    // Boss Spawning
    if (this.bossTimer >= this.nextBossTime) {
      this.bossTimer = 0;
      this.nextBossTime = 75; // Mỗi 75s có 1 Siêu Boss
      this.spawnBoss(player, waveMult);
    }
  }

  getSpawnPos(player, distance = 420) {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: player.x + Math.cos(angle) * distance,
      y: player.y + Math.sin(angle) * distance
    };
  }

  spawnStandardPack(player, waveMult) {
    // Sinh từ 2-4 quái vật đồng thời theo thời gian
    const packSize = 1 + Math.min(3, Math.floor(waveMult * 0.9));
    for (let i = 0; i < packSize; i++) {
      const p = this.getSpawnPos(player, 380 + Math.random() * 80);
      const rand = Math.random();

      if (rand < 0.60) {
        this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult));
      } else if (rand < 0.85) {
        this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult));
      } else {
        this.game.enemies.push(new Enemy(p.x, p.y, 'brute', waveMult));
      }
    }
  }

  triggerHorde(player, waveMult) {
    this.game.triggerHordeAlert();
    // 50+ speeders & crawlers vây kín vòng tròn
    const count = 50 + Math.floor(waveMult * 15);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = 380 + Math.random() * 80;
      const x = player.x + Math.cos(angle) * dist;
      const y = player.y + Math.sin(angle) * dist;
      this.game.enemies.push(new Enemy(x, y, Math.random() > 0.35 ? 'crawler' : 'speeder', waveMult * 0.95));
    }
  }

  spawnBoss(player, waveMult) {
    const p = this.getSpawnPos(player, 460);
    const boss = new Enemy(p.x, p.y, 'boss', waveMult);
    this.game.enemies.push(boss);
    this.game.activeBoss = boss;
  }
}
