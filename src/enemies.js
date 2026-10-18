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
      this.speed = (75 + Math.random() * 25) * waveMultiplier;
      this.maxHp = 25 * waveMultiplier;
      this.color = '#ef4444'; // Red
      this.gemValue = 1;
      this.damage = 10;
      this.score = 10;
    } else if (type === 'speeder') {
      this.radius = 9;
      this.speed = (130 + Math.random() * 30) * waveMultiplier;
      this.maxHp = 14 * waveMultiplier;
      this.color = '#d946ef'; // Magenta
      this.gemValue = 2;
      this.damage = 7;
      this.score = 15;
    } else if (type === 'brute') {
      this.radius = 22;
      this.speed = 50 * waveMultiplier;
      this.maxHp = 180 * waveMultiplier;
      this.color = '#06b6d4'; // Cyan
      this.gemValue = 10;
      this.damage = 22;
      this.score = 50;
    } else if (type === 'boss') {
      this.radius = 36;
      this.speed = 55;
      this.maxHp = 1200 * waveMultiplier;
      this.color = '#eab308'; // Gold
      this.gemValue = 50;
      this.damage = 35;
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
      if (player.isRammer) {
        // 🛡️ Juggernaut Battering Ram Impact!
        const ramDmg = 140 * player.stats.damageMult * (1 + (player.berserkerDmgBonus || 0));
        player.game.damageEnemy(this, ramDmg, true, 'ram');

        // Knockback enemy away violently
        if (dist > 0.001) {
          this.x -= (dx / dist) * 70;
          this.y -= (dy / dist) * 70;
        }

        // Sparks & debris
        for (let i = 0; i < 4; i++) {
          player.game.particles.push(new Particle(this.x, this.y, '#10b981', 4, 3.5));
        }

        // Tông chết quái hồi máu!
        if (this.isDead && player.hp < player.maxHp) {
          player.hp = Math.min(player.maxHp, player.hp + 2);
          player.game.floatingTexts.push(new FloatingText(player.x, player.y - 30, '+2 HP', '#10b981', 16, false));
        }

        // Player takes 65% reduced collision damage
        player.takeDamage(this.damage * dt * 0.35);
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
    this.nextHordeTime = 45; // First horde at 45 seconds
    this.bossTimer = 0;
    this.nextBossTime = 90;  // First boss at 90 seconds
  }

  update(dt, player) {
    this.gameTime += dt;
    this.spawnTimer += dt;
    this.hordeTimer += dt;
    this.bossTimer += dt;

    const waveMult = 1.0 + (this.gameTime / 60) * 0.35;
    const spawnInterval = Math.max(0.18, 0.95 - (this.gameTime / 60) * 0.12);

    // Regular Spawning
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnStandardPack(player, waveMult);
    }

    // Horde Event Spawning
    if (this.hordeTimer >= this.nextHordeTime) {
      this.hordeTimer = 0;
      this.nextHordeTime = 60; // Every 60s thereafter
      this.triggerHorde(player, waveMult);
    }

    // Boss Spawning
    if (this.bossTimer >= this.nextBossTime) {
      this.bossTimer = 0;
      this.nextBossTime = 120; // Every 2 minutes
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
    const p = this.getSpawnPos(player);
    const rand = Math.random();

    if (rand < 0.65) {
      this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult));
    } else if (rand < 0.88) {
      this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult));
    } else {
      this.game.enemies.push(new Enemy(p.x, p.y, 'brute', waveMult));
    }
  }

  triggerHorde(player, waveMult) {
    this.game.triggerHordeAlert();
    // Spawn 40 speeders/crawlers rapidly in a ring
    const count = 35 + Math.floor(waveMult * 10);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = 380 + Math.random() * 80;
      const x = player.x + Math.cos(angle) * dist;
      const y = player.y + Math.sin(angle) * dist;
      this.game.enemies.push(new Enemy(x, y, Math.random() > 0.4 ? 'crawler' : 'speeder', waveMult * 0.9));
    }
  }

  spawnBoss(player, waveMult) {
    const p = this.getSpawnPos(player, 460);
    const boss = new Enemy(p.x, p.y, 'boss', waveMult);
    this.game.enemies.push(boss);
    this.game.activeBoss = boss;
  }
}
