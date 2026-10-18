// Enemy Spawning and Swarm AI System
import { art } from './art.js';
import { FloatingText, Particle } from './particles.js';

export class Enemy {
  constructor(x, y, type = 'crawler', waveMultiplier = 1.0, playerLevel = 1) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.isDead = false;

    // Tiến trình theo cấp người chơi: cấp thấp quái yếu/chậm, cấp cao thử thách tăng dần
    const lvl = Math.max(1, playerLevel);
    const speedScale = 1.0 + Math.min(1.0, (lvl - 1) * 0.04 + (waveMultiplier - 1.0) * 0.12);
    const hpScale = (1.0 + (lvl - 1) * 0.16) * waveMultiplier;
    const dmgScale = 1.0 + (lvl - 1) * 0.08 + (waveMultiplier - 1.0) * 0.12;

    if (type === 'crawler') {
      this.radius = 12;
      this.speed = (58 + Math.random() * 16) * speedScale; // Cấp 1: 58-74 px/s (dễ thở, né tốt)
      this.maxHp = Math.max(18, Math.round(22 * hpScale)); // Cấp 1: 22 HP (1-2 phát súng cơ bản là nổ)
      this.color = '#ef4444'; // Red
      this.gemValue = 1;
      this.damage = Math.round(8 * dmgScale); // Cấp 1: 8 sát thương (không sốc chết)
      this.score = 10;
    } else if (type === 'speeder') {
      this.radius = 9;
      this.speed = (92 + Math.random() * 22) * speedScale; // Cấp 1: 92-114 px/s (không bị bay vọt tới tấp)
      this.maxHp = Math.max(12, Math.round(15 * hpScale)); // Cấp 1: 15 HP (mỏng manh)
      this.color = '#d946ef'; // Magenta
      this.gemValue = 2;
      this.damage = Math.round(6 * dmgScale); // Cấp 1: 6 sát thương
      this.score = 15;
    } else if (type === 'brute') {
      this.radius = 22;
      this.speed = 42 * speedScale; // Di chuyển chậm, đầm chắc
      this.maxHp = Math.max(80, Math.round(120 * hpScale)); // Cấp 1: 120 HP (thay vì 520 HP)
      this.color = '#06b6d4'; // Cyan
      this.gemValue = 10;
      this.damage = Math.round(16 * dmgScale); // Cấp 1: 16 sát thương
      this.score = 50;
    } else if (type === 'boss') {
      this.radius = 36;
      this.speed = 60 * Math.min(1.4, speedScale);
      this.maxHp = Math.max(600, Math.round(850 * hpScale)); // Cấp 1: 850 HP (thay vì 3800 HP)
      this.color = '#eab308'; // Gold
      this.gemValue = 50;
      this.damage = Math.round(35 * dmgScale); // Cấp 1: 35 sát thương
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
    this.nextHordeTime = 50; // Đợt tràn đầu tiên ở 50s
    this.bossTimer = 0;
    this.nextBossTime = 120;  // Boss xuất hiện ở phút thứ 2
  }

  update(dt, player) {
    this.gameTime += dt;
    this.spawnTimer += dt;
    this.hordeTimer += dt;
    this.bossTimer += dt;

    const lvl = Math.max(1, player?.level || 1);
    // Độ khó tăng dần theo cấp độ người chơi và thời gian chơi
    const waveMult = 1.0 + (this.gameTime / 60) * 0.20 + (lvl - 1) * 0.08;

    // Tần suất ra quái tăng gấp đôi (+100%): Cấp 1 ra quái mỗi ~0.85s (thay vì 1.6s)
    const baseInterval = 0.85;
    const spawnInterval = Math.max(0.18, baseInterval / (1 + (lvl - 1) * 0.14 + (this.gameTime / 60) * 0.10));

    // Regular Spawning
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnStandardPack(player, waveMult, lvl);
    }

    // Horde Event Spawning (chỉ kích hoạt khi đủ thời gian và level >= 3)
    if (this.hordeTimer >= this.nextHordeTime && lvl >= 3) {
      this.hordeTimer = 0;
      this.nextHordeTime = 55; // Mỗi 55s có 1 đợt quái tràn
      this.triggerHorde(player, waveMult, lvl);
    }

    // Boss Spawning (chỉ kích hoạt khi đủ thời gian và level >= 5)
    if (this.bossTimer >= this.nextBossTime && lvl >= 5) {
      this.bossTimer = 0;
      this.nextBossTime = 110; // Mỗi 110s có 1 Siêu Boss
      this.spawnBoss(player, waveMult, lvl);
    }
  }

  getSpawnPos(player, distance = 420) {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: player.x + Math.cos(angle) * distance,
      y: player.y + Math.sin(angle) * distance
    };
  }

  spawnStandardPack(player, waveMult, lvl = 1) {
    // Số lượng quái mỗi đợt tăng 100%: Cấp 1 ra 2-3 quái. Cấp 5-10 tăng lên 5-8 quái
    const packSize = Math.max(2, Math.min(10, Math.floor(2 + (lvl - 1) * 0.65 + (this.gameTime / 70) * 0.3)));
    for (let i = 0; i < packSize; i++) {
      const p = this.getSpawnPos(player, 380 + Math.random() * 80);
      const rand = Math.random();

      // Phân bổ chủng loại quái theo cấp độ
      if (lvl === 1) {
        // Cấp 1: 100% crawler chậm, dễ né, dễ tiêu diệt
        this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
      } else if (lvl === 2) {
        // Cấp 2: 85% crawler, 15% speeder
        if (rand < 0.85) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
        } else {
          this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult, lvl));
        }
      } else if (lvl <= 4) {
        // Cấp 3-4: 70% crawler, 22% speeder, 8% brute
        if (rand < 0.70) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
        } else if (rand < 0.92) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult, lvl));
        } else {
          this.game.enemies.push(new Enemy(p.x, p.y, 'brute', waveMult, lvl));
        }
      } else {
        // Cấp 5+: Đầy đủ quái vật
        if (rand < 0.50) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
        } else if (rand < 0.80) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult, lvl));
        } else {
          this.game.enemies.push(new Enemy(p.x, p.y, 'brute', waveMult, lvl));
        }
      }
    }
  }

  triggerHorde(player, waveMult, lvl = 1) {
    this.game.triggerHordeAlert();
    // Bầy quái tăng 100%: cấp 3 ra ~32-38 con, cấp cao ra 70-95 con
    const count = Math.min(95, Math.floor(28 + (lvl - 1) * 5 + waveMult * 7));
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = 390 + Math.random() * 80;
      const x = player.x + Math.cos(angle) * dist;
      const y = player.y + Math.sin(angle) * dist;
      this.game.enemies.push(new Enemy(x, y, Math.random() > 0.4 ? 'crawler' : 'speeder', waveMult * 0.9, lvl));
    }
  }

  spawnBoss(player, waveMult, lvl = 1) {
    const p = this.getSpawnPos(player, 460);
    const boss = new Enemy(p.x, p.y, 'boss', waveMult, lvl);
    this.game.enemies.push(boss);
    this.game.activeBoss = boss;
  }
}
