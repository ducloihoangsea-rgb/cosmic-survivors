// Enemy Spawning and Swarm AI System
import { art } from './art.js';
import { sound } from './audio.js';
import { i18n } from './i18n.js';
import { FloatingText, Particle, LuckyChest } from './particles.js';

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
      this.speed = (58 + Math.random() * 16) * speedScale;
      this.maxHp = Math.max(18, Math.round(22 * hpScale));
      this.color = '#ef4444'; // Red
      this.gemValue = 1;
      this.damage = Math.round(8 * dmgScale);
      this.score = 10;
    } else if (type === 'speeder') {
      this.radius = 9;
      this.speed = (92 + Math.random() * 22) * speedScale;
      this.maxHp = Math.max(12, Math.round(15 * hpScale));
      this.color = '#d946ef'; // Magenta
      this.gemValue = 2;
      this.damage = Math.round(6 * dmgScale);
      this.score = 15;
    } else if (type === 'swarmer') {
      this.radius = 7;
      this.speed = (125 + Math.random() * 25) * speedScale;
      this.maxHp = Math.max(10, Math.round(12 * hpScale));
      this.color = '#4ade80'; // Lime Green
      this.gemValue = 1;
      this.damage = Math.round(5 * dmgScale);
      this.score = 12;
    } else if (type === 'shooter') {
      this.radius = 14;
      this.speed = 52 * speedScale;
      this.maxHp = Math.max(30, Math.round(42 * hpScale));
      this.color = '#8b5cf6'; // Violet
      this.gemValue = 3;
      this.damage = Math.round(10 * dmgScale);
      this.shootCooldown = 2.4;
      this.shootTimer = Math.random() * 1.5;
      this.score = 35;
    } else if (type === 'bomber') {
      this.radius = 15;
      this.speed = 76 * speedScale;
      this.maxHp = Math.max(24, Math.round(32 * hpScale));
      this.color = '#f97316'; // Fiery Orange
      this.gemValue = 2;
      this.damage = Math.round(22 * dmgScale);
      this.fuseTimer = 0;
      this.isDetonating = false;
      this.score = 25;
    } else if (type === 'brute') {
      this.radius = 22;
      this.speed = 42 * speedScale;
      this.maxHp = Math.max(80, Math.round(120 * hpScale));
      this.color = '#06b6d4'; // Cyan
      this.gemValue = 10;
      this.damage = Math.round(16 * dmgScale);
      this.score = 50;
    } else if (type === 'elite_void') {
      // 🌟 Quái Tinh Anh Phút 3: Void Sentinel
      this.radius = 34;
      this.speed = 54 * Math.min(1.3, speedScale);
      this.maxHp = Math.max(2200, Math.round(2800 * hpScale));
      this.color = '#c084fc';
      this.gemValue = 80;
      this.damage = Math.round(24 * dmgScale);
      this.score = 1200;
      this.isElite = true;
      this.eliteTitle = 'VOID SENTINEL';
      this.shootTimer = 2.0;
    } else if (type === 'elite_behemoth') {
      // 🌟 Quái Tinh Anh Phút 5: Plasma Behemoth
      this.radius = 40;
      this.speed = 48 * Math.min(1.3, speedScale);
      this.maxHp = Math.max(5200, Math.round(6500 * hpScale));
      this.color = '#f43f5e';
      this.gemValue = 150;
      this.damage = Math.round(32 * dmgScale);
      this.score = 2500;
      this.isElite = true;
      this.eliteTitle = 'PLASMA BEHEMOTH';
      this.shootTimer = 1.8;
    } else if (type === 'elite_harbinger') {
      // 🌟 Quái Tinh Anh Phút 7: Cosmic Harbinger
      this.radius = 46;
      this.speed = 52 * Math.min(1.3, speedScale);
      this.maxHp = Math.max(11000, Math.round(14000 * hpScale));
      this.color = '#fbbf24';
      this.gemValue = 280;
      this.damage = Math.round(38 * dmgScale);
      this.score = 5500;
      this.isElite = true;
      this.eliteTitle = 'COSMIC HARBINGER';
      this.shootTimer = 1.5;
    } else if (type === 'boss') {
      this.radius = 36;
      this.speed = 60 * Math.min(1.4, speedScale);
      this.maxHp = Math.max(600, Math.round(850 * hpScale));
      this.color = '#eab308'; // Gold
      this.gemValue = 50;
      this.damage = Math.round(35 * dmgScale);
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
      return;
    }

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy);

    // AI Di Chuyển Theo Chủng Loại
    if (this.type === 'shooter') {
      // Giữ khoảng cách 220-270px
      if (dist < 220) {
        this.x -= (dx / dist) * this.speed * dt;
        this.y -= (dy / dist) * this.speed * dt;
      } else if (dist > 270) {
        this.x += (dx / dist) * this.speed * dt;
        this.y += (dy / dist) * this.speed * dt;
      }
      this.shootTimer = (this.shootTimer || 0) - dt;
      if (this.shootTimer <= 0) {
        this.shootTimer = this.shootCooldown || 2.4;
        const aimAngle = Math.atan2(player.y - this.y, player.x - this.x);
        player.game.enemyBullets.push(new EnemyBullet(this.x, this.y, aimAngle, 210, this.damage, '#c084fc'));
        sound.playShoot('blaster');
      }
    } else if (this.type === 'bomber') {
      // Lao vào tự sát
      if (dist > 0.001) {
        this.x += (dx / dist) * this.speed * dt;
        this.y += (dy / dist) * this.speed * dt;
      }
      if (dist < 65) {
        this.isDetonating = true;
      }
      if (this.isDetonating) {
        this.fuseTimer = (this.fuseTimer || 0) + dt;
        if (this.fuseTimer >= 0.55) {
          this.isDead = true;
          sound.playExplosion();
          player.game.addScreenShake(6);
          for (let i = 0; i < 16; i++) {
            player.game.particles.push(new Particle(this.x, this.y, '#f97316', 5, 4, 0.6));
          }
          if (dist < 90) {
            player.takeDamage(this.damage * 1.5);
          }
          return;
        }
      }
    } else {
      // Các loại quái khác đuổi theo người chơi
      if (dist > 0.001) {
        this.x += (dx / dist) * this.speed * dt;
        this.y += (dy / dist) * this.speed * dt;
      }
    }

    // AI Quái Tinh Anh bắn đạn
    if (this.isElite) {
      this.shootTimer = (this.shootTimer || 2.0) - dt;
      if (this.shootTimer <= 0) {
        const aimAngle = Math.atan2(player.y - this.y, player.x - this.x);
        if (this.type === 'elite_void') {
          this.shootTimer = 2.4;
          for (let i = 0; i < 4; i++) {
            const a = aimAngle + (i * Math.PI / 2);
            player.game.enemyBullets.push(new EnemyBullet(this.x, this.y, a, 230, this.damage, '#c084fc'));
          }
        } else if (this.type === 'elite_behemoth') {
          this.shootTimer = 2.0;
          for (let i = 0; i < 8; i++) {
            const a = aimAngle + (i * Math.PI / 4);
            player.game.enemyBullets.push(new EnemyBullet(this.x, this.y, a, 200, this.damage, '#f43f5e'));
          }
        } else if (this.type === 'elite_harbinger') {
          this.shootTimer = 1.8;
          for (let i = -1; i <= 1; i++) {
            player.game.enemyBullets.push(new EnemyBullet(this.x, this.y, aimAngle + i * 0.22, 240, this.damage, '#fbbf24'));
          }
          // Thả 2 swarmer
          player.game.enemies.push(new Enemy(this.x + 25, this.y, 'swarmer', 1.0, player.level));
          player.game.enemies.push(new Enemy(this.x - 25, this.y, 'swarmer', 1.0, player.level));
        }
      }
    }

    if (this.hitFlash > 0) {
      this.hitFlash -= dt;
    }

    // Touch player damage / Ramming Collision
    if (dist < this.radius + player.radius) {
      // 💥 Crash Nova Fusion Mod: Ramming / collision triggers shield blast
      if (player.hasCrashNova && (player.crashNovaCooldown || 0) <= 0) {
        player.crashNovaCooldown = 1.2;
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

        // Player takes reduced collision damage
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
      if (this.isElite) {
        // Rớt Rương May Mắn 100% khi hạ Tinh Anh!
        this.game?.chests?.push(new LuckyChest(this.x, this.y));
      }
    }
  }

  draw(ctx, animTime = 0) {
    art.drawEnemy(ctx, this, animTime);
  }
}

export class EnemyBullet {
  constructor(x, y, angle, speed, damage, color = '#f43f5e') {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.damage = damage;
    this.radius = 5.5;
    this.color = color;
    this.life = 4.0;
    this.isDead = false;
  }

  update(dt, player, game) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }

    // 1. Chặn đạn bằng đốt thân Tàu Rồng (Serpent Segments)
    if (player.isSerpent || player.shipId === 'ship_serpent') {
      const segCount = (player.baseStats?.segments || 4) + (player.stats.bonusSegments || 0);
      const segSpacing = 16;
      for (let s = 1; s <= segCount; s++) {
        const idx = s * segSpacing;
        if (idx < player.trailBuffer.length) {
          const pt = player.trailBuffer[idx];
          const segRadius = (player.baseStats?.segmentRadius || 14) * (player.stats.shieldRadiusMult || 1.0);
          if (Math.hypot(this.x - pt.x, this.y - pt.y) < this.radius + segRadius) {
            this.isDead = true;
            for (let i = 0; i < 4; i++) {
              game.particles.push(new Particle(this.x, this.y, '#34d399', 3, 2));
            }
            return;
          }
        }
      }
    }

    // 2. Va chạm với người chơi
    if (Math.hypot(this.x - player.x, this.y - player.y) < this.radius + player.radius) {
      this.isDead = true;
      player.takeDamage(this.damage);
      for (let i = 0; i < 4; i++) {
        game.particles.push(new Particle(this.x, this.y, '#f43f5e', 4, 3));
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
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
    this.spawnedElites = new Set();
  }

  update(dt, player) {
    this.gameTime += dt;
    this.spawnTimer += dt;
    this.hordeTimer += dt;
    this.bossTimer += dt;

    const lvl = Math.max(1, player?.level || 1);
    const waveMult = 1.0 + (this.gameTime / 60) * 0.20 + (lvl - 1) * 0.08;
    const baseInterval = 0.85;
    const spawnInterval = Math.max(0.18, baseInterval / (1 + (lvl - 1) * 0.14 + (this.gameTime / 60) * 0.10));

    // Regular Spawning
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnStandardPack(player, waveMult, lvl);
    }

    // Horde Event Spawning
    if (this.hordeTimer >= this.nextHordeTime && lvl >= 3) {
      this.hordeTimer = 0;
      this.nextHordeTime = 55;
      this.triggerHorde(player, waveMult, lvl);
    }

    // Boss Spawning định kỳ
    if (this.bossTimer >= this.nextBossTime && lvl >= 5) {
      this.bossTimer = 0;
      this.nextBossTime = 110;
      this.spawnBoss(player, waveMult, lvl);
    }

    // 🌟 Quái Tinh Anh Xuất Hiện Chính Xác Tại Các Mốc 3, 5, 7 Phút
    // Mốc 3 Phút (180s)
    if (this.gameTime >= 180 && !this.spawnedElites.has(3)) {
      this.spawnedElites.add(3);
      this.spawnElite(player, 'elite_void', waveMult, lvl);
    }
    // Mốc 5 Phút (300s)
    if (this.gameTime >= 300 && !this.spawnedElites.has(5)) {
      this.spawnedElites.add(5);
      this.spawnElite(player, 'elite_behemoth', waveMult, lvl);
    }
    // Mốc 7 Phút (420s)
    if (this.gameTime >= 420 && !this.spawnedElites.has(7)) {
      this.spawnedElites.add(7);
      this.spawnElite(player, 'elite_harbinger', waveMult, lvl);
    }
  }

  getSpawnPos(player, distance = 420) {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: player.x + Math.cos(angle) * distance,
      y: player.y + Math.sin(angle) * distance
    };
  }

  spawnElite(player, type, waveMult, lvl = 1) {
    const p = this.getSpawnPos(player, 480);
    const elite = new Enemy(p.x, p.y, type, waveMult, lvl);
    elite.game = this.game;
    this.game.enemies.push(elite);
    this.game.activeBoss = elite;
    sound.playJackpot();
    this.game.addScreenShake(14);
    if (this.game.triggerHordeAlert) {
      this.game.triggerHordeAlert(i18n.t('eliteAlert'));
    }
  }

  spawnStandardPack(player, waveMult, lvl = 1) {
    const packSize = Math.max(2, Math.min(10, Math.floor(2 + (lvl - 1) * 0.65 + (this.gameTime / 70) * 0.3)));
    for (let i = 0; i < packSize; i++) {
      const p = this.getSpawnPos(player, 380 + Math.random() * 80);
      const rand = Math.random();

      // Phân bổ chủng loại quái theo cấp độ & thời gian
      if (lvl === 1) {
        // Cấp 1: 100% crawler chậm
        this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
      } else if (lvl === 2) {
        // Cấp 2: 70% crawler, 20% speeder, 10% swarmer
        if (rand < 0.70) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
        } else if (rand < 0.90) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult, lvl));
        } else {
          this.game.enemies.push(new Enemy(p.x, p.y, 'swarmer', waveMult, lvl));
        }
      } else if (lvl <= 4) {
        // Cấp 3-4: crawler, speeder, swarmer, brute
        if (rand < 0.50) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
        } else if (rand < 0.75) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'swarmer', waveMult, lvl));
        } else if (rand < 0.90) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult, lvl));
        } else {
          this.game.enemies.push(new Enemy(p.x, p.y, 'brute', waveMult, lvl));
        }
      } else {
        // Cấp 5+: Đầy đủ quái vật gồm cả Shooter & Bomber
        if (rand < 0.35) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'crawler', waveMult, lvl));
        } else if (rand < 0.55) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'swarmer', waveMult, lvl));
        } else if (rand < 0.70) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'speeder', waveMult, lvl));
        } else if (rand < 0.82) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'shooter', waveMult, lvl));
        } else if (rand < 0.92) {
          this.game.enemies.push(new Enemy(p.x, p.y, 'bomber', waveMult, lvl));
        } else {
          this.game.enemies.push(new Enemy(p.x, p.y, 'brute', waveMult, lvl));
        }
      }
    }
  }

  triggerHorde(player, waveMult, lvl = 1) {
    this.game.triggerHordeAlert();
    const count = Math.min(95, Math.floor(28 + (lvl - 1) * 5 + waveMult * 7));
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = 390 + Math.random() * 80;
      const x = player.x + Math.cos(angle) * dist;
      const y = player.y + Math.sin(angle) * dist;
      const r = Math.random();
      const mobType = r < 0.45 ? 'swarmer' : (r < 0.80 ? 'crawler' : 'speeder');
      this.game.enemies.push(new Enemy(x, y, mobType, waveMult * 0.9, lvl));
    }
  }

  spawnBoss(player, waveMult, lvl = 1) {
    const p = this.getSpawnPos(player, 460);
    const boss = new Enemy(p.x, p.y, 'boss', waveMult, lvl);
    boss.game = this.game;
    this.game.enemies.push(boss);
    this.game.activeBoss = boss;
  }
}
