// Main Game Loop, Player, Dopamine System, Combo Engine & Meta Upgrades
import { sound } from './audio.js';
import { FloatingText, Particle, Gem, LuckyChest } from './particles.js';
import { WeaponManager } from './weapons.js';
import { WaveSpawner } from './enemies.js';
import { Controller } from './controls.js';
import { art } from './art.js';
import { i18n } from './i18n.js';
import { meta } from './meta.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.controller = new Controller(canvas);
    this.weaponManager = new WeaponManager(this);
    this.waveSpawner = new WaveSpawner(this);

    // Game State
    this.state = 'playing'; // 'playing', 'levelup', 'chest', 'gameover'
    this.gameTime = 0;
    this.kills = 0;
    this.score = 0;
    this.earnedGold = 0;

    // Dopamine Frenzy System
    this.dopamineMeter = 0; // 0 to 100
    this.isFrenzy = false;
    this.frenzyTimer = 0;

    // Active Ultimate EMP Skill
    this.ultimateCharge = 0; // 0 to 100

    // Kill Combo Multiplier System
    this.combo = 0;
    this.comboTimer = 0;
    this.comboMilestone = 0;

    // Real-Time Skill Damage Tracking
    this.damageStats = {
      blaster: 0,
      orbs: 0,
      lightning: 0,
      glaive: 0,
      missiles: 0,
      wingmen: 0,
      emp: 0,
      nuke: 0,
      blackhole: 0
    };
    this.totalDamageDealt = 0;

    // Camera & Screen Shake
    this.camera = { x: 0, y: 0 };
    this.screenShake = 0;
    this.freezeFrames = 0;

    // Entities
    this.player = new Player(this);
    this.enemies = [];
    this.gems = [];
    this.chests = [];
    this.particles = [];
    this.floatingTexts = [];
    this.activeBoss = null;

    // UI callbacks
    this.onLevelUpCallback = null;
    this.onGameOverCallback = null;
    this.onHordeAlertCallback = null;
    this.onLuckyChestCallback = null;

    // Spacebar listener for EMP Ultimate
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.state === 'playing') {
        this.triggerUltimate();
      }
    });

    this.lastTime = performance.now();
  }

  resize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
  }

  addScreenShake(amount) {
    this.screenShake = 0; // Disabled per user request for rock-solid camera
  }

  triggerHordeAlert() {
    sound.playHordeSiren();
    if (this.onHordeAlertCallback) {
      this.onHordeAlertCallback();
    }
  }

  triggerUltimate() {
    if (this.ultimateCharge >= 100) {
      this.ultimateCharge = 0;
      this.weaponManager.triggerEmpShockwave(this.player);
      this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 45, '⚡ EMP SHOCKWAVE ⚡', '#00f2fe', 22, true));
    }
  }

  getComboMultiplier() {
    if (this.combo >= 100) return 3.0;
    if (this.combo >= 60) return 2.0;
    if (this.combo >= 30) return 1.5;
    if (this.combo >= 10) return 1.2;
    return 1.0;
  }

  damageEnemy(enemy, rawDamage, forceCrit = false, source = 'blaster') {
    // 10% instant execution if Reaper Execution unlocked
    if (this.player.hasReaperExecution && !enemy.isBoss && Math.random() < 0.10) {
      const execDmg = Math.max(enemy.hp, Math.round(rawDamage * 3));
      if (this.damageStats[source] === undefined) this.damageStats[source] = 0;
      this.damageStats[source] += execDmg;
      this.totalDamageDealt += execDmg;

      enemy.hp = 0;
      enemy.isDead = true;
      this.floatingTexts.push(new FloatingText(enemy.x, enemy.y, i18n.t('executeFloat'), '#ef4444', 22, true));
      sound.playCrit();
      for (let i = 0; i < 8; i++) {
        this.particles.push(new Particle(enemy.x, enemy.y, '#ef4444', 5, 4));
      }
      this.onEnemyKilled(enemy);
      return;
    }

    const isCrit = forceCrit || (Math.random() < this.player.stats.critChance);
    const damage = isCrit ? Math.round(rawDamage * this.player.stats.critMult) : Math.round(rawDamage);

    // Track real-time damage per skill
    if (this.damageStats[source] === undefined) this.damageStats[source] = 0;
    this.damageStats[source] += damage;
    this.totalDamageDealt += damage;

    enemy.takeDamage(damage);
    this.floatingTexts.push(new FloatingText(enemy.x, enemy.y, damage.toString(), '#ffffff', isCrit ? 22 : 16, isCrit));

    if (isCrit) {
      sound.playCrit();
      this.addScreenShake(3);
    } else {
      sound.playHit();
    }

    for (let i = 0; i < (isCrit ? 6 : 3); i++) {
      this.particles.push(new Particle(enemy.x, enemy.y, enemy.color, 4, 3.5));
    }

    if (enemy.isDead) {
      this.onEnemyKilled(enemy);
    }
  }

  onEnemyKilled(enemy) {
    // Blood God Rampage: +1 HP per monster kill
    if (this.player.hasBloodGodFrenzy && this.player.hp < this.player.maxHp) {
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + 1);
    }

    this.kills++;
    this.combo++;
    this.comboTimer = 2.8;

    const mult = this.getComboMultiplier();
    this.score += Math.round(enemy.score * mult);

    // Combo milestones
    if (this.combo >= 100 && this.comboMilestone < 100) {
      this.comboMilestone = 100;
      sound.playComboMilestone();
      this.addScreenShake(9);
      this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 60, i18n.t('combo100'), '#facc15', 24, true));
    } else if (this.combo >= 60 && this.comboMilestone < 60) {
      this.comboMilestone = 60;
      sound.playComboMilestone();
      this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 60, i18n.t('combo60'), '#ec4899', 22, true));
    } else if (this.combo >= 30 && this.comboMilestone < 30) {
      this.comboMilestone = 30;
      sound.playComboMilestone();
      this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 60, i18n.t('combo30'), '#38bdf8', 20, true));
    } else if (this.combo >= 10 && this.comboMilestone < 10) {
      this.comboMilestone = 10;
      sound.playComboMilestone();
      this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 60, i18n.t('combo10'), '#22c55e', 18, true));
    }

    // Dopamine Frenzy gauge fill
    this.dopamineMeter = Math.min(100, this.dopamineMeter + (enemy.isBoss ? 45 : 2.5));
    if (this.dopamineMeter >= 100 && !this.isFrenzy) {
      this.activateFrenzy();
    }

    // Drop gems
    this.gems.push(new Gem(enemy.x, enemy.y, enemy.gemValue));

    // Death burst
    for (let i = 0; i < 10; i++) {
      this.particles.push(new Particle(enemy.x, enemy.y, enemy.color, 6, 4.5, 0.8));
    }

    if (enemy.isBoss) {
      sound.playExplosion();
      this.addScreenShake(18);
      this.freezeFrames = 4;
      this.activeBoss = null;

      // Drop Lucky Golden Chest
      this.chests.push(new LuckyChest(enemy.x, enemy.y));

      for (let i = 0; i < 8; i++) {
        this.gems.push(new Gem(enemy.x + (Math.random() - 0.5) * 40, enemy.y + (Math.random() - 0.5) * 40, 25));
      }
    }
  }

  activateFrenzy() {
    this.isFrenzy = true;
    this.frenzyTimer = 7.5;
    sound.playFrenzy();
    this.addScreenShake(10);
    this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 40, i18n.t('frenzyFloat'), '#ff0077', 26, true));

    for (const gem of this.gems) {
      gem.isAttracted = true;
      gem.speed = 12;
    }
  }

  openLuckyChest() {
    sound.playJackpot();
    this.state = 'chest';
    this.addScreenShake(10);

    if (this.onLuckyChestCallback) {
      this.onLuckyChestCallback();
    }
  }

  triggerNuke() {
    sound.playExplosion();
    this.addScreenShake(20);
    this.freezeFrames = 5;

    for (const enemy of this.enemies) {
      const nukeDmg = Math.round(enemy.hp);
      this.damageStats.nuke = (this.damageStats.nuke || 0) + nukeDmg;
      this.totalDamageDealt += nukeDmg;
      enemy.isDead = true;
      this.kills++;
      this.gems.push(new Gem(enemy.x, enemy.y, 5));
      for (let i = 0; i < 6; i++) {
        this.particles.push(new Particle(enemy.x, enemy.y, '#f59e0b', 8, 4));
      }
    }
    this.enemies = [];
  }

  update(dt) {
    if (this.state !== 'playing') return;

    if (this.freezeFrames > 0) {
      this.freezeFrames--;
      return;
    }

    this.gameTime += dt;

    // Combo timer decay
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.comboMilestone = 0;
      }
    }

    // Screen Shake decay
    if (this.screenShake > 0) {
      this.screenShake *= 0.9;
      if (this.screenShake < 0.2) this.screenShake = 0;
    }

    // Frenzy meter decay / update
    if (this.isFrenzy) {
      this.frenzyTimer -= dt;
      this.dopamineMeter = (this.frenzyTimer / 7.5) * 100;
      if (this.frenzyTimer <= 0) {
        this.isFrenzy = false;
        this.dopamineMeter = 0;
      }
    } else if (this.dopamineMeter > 0) {
      this.dopamineMeter = Math.max(0, this.dopamineMeter - dt * 2.2);
    }

    // 1. Update Player
    const move = this.controller.getVector();
    this.player.update(dt, move);

    this.camera.x = this.player.x - this.canvas.width / 2;
    this.camera.y = this.player.y - this.canvas.height / 2;

    // 2. Wave Spawner
    this.waveSpawner.update(dt, this.player);

    // 3. Update Weapons
    this.weaponManager.update(dt, this.player, this.enemies);

    // Periodic Cosmic Singularity Black Hole spawning
    if (this.player.hasBlackHole) {
      this.player.blackHoleTimer -= dt;
      if (this.player.blackHoleTimer <= 0) {
        this.player.blackHoleTimer = 12.0;
        let spawnX = this.player.x;
        let spawnY = this.player.y;
        if (this.enemies.length > 0) {
          const nearest = this.enemies.reduce((closest, cur) => {
            const d1 = Math.hypot(cur.x - this.player.x, cur.y - this.player.y);
            const d2 = Math.hypot(closest.x - this.player.x, closest.y - this.player.y);
            return d1 < d2 ? cur : closest;
          }, this.enemies[0]);
          spawnX = nearest.x;
          spawnY = nearest.y;
        }
        this.weaponManager.spawnBlackHole(spawnX, spawnY, this.player.stats.damageMult);
      }
    }

    // Periodic Chronos Stasis freeze
    if (this.player.hasChronosFreeze) {
      this.player.chronosTimer -= dt;
      if (this.player.chronosTimer <= 0) {
        this.player.chronosTimer = 20.0;
        sound.playJackpot();
        for (const e of this.enemies) {
          e.freezeTimer = 5.0;
        }
        for (let i = 0; i < 30; i++) {
          this.particles.push(new Particle(this.player.x, this.player.y, '#38bdf8', 7, 5, 1.2));
        }
        this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 70, '⏳ CHRONOS STASIS! ⏳', '#38bdf8', 24, true));
      }
    }

    // 4. Update Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.update(dt, this.player);
      if (e.isDead) {
        this.enemies.splice(i, 1);
      }
    }

    // 5. Update Gems
    for (let i = this.gems.length - 1; i >= 0; i--) {
      const g = this.gems[i];
      const collected = g.update(this.player);
      if (collected) {
        this.player.addXp(g.value);
        this.ultimateCharge = Math.min(100, this.ultimateCharge + 1.8);
        sound.playGemPickup();
        this.gems.splice(i, 1);
      }
    }

    // 6. Update Lucky Chests
    for (let i = this.chests.length - 1; i >= 0; i--) {
      const c = this.chests[i];
      if (c.update(this.player)) {
        this.chests.splice(i, 1);
        this.openLuckyChest();
        break;
      }
    }

    // 7. Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // 8. Update Floating Texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.update();
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // Player Death & Extra Life Revive
    if (this.player.hp <= 0) {
      if (this.player.revivesLeft > 0) {
        this.player.revivesLeft--;
        this.player.hp = Math.round(this.player.maxHp * 0.5);
        this.player.invulnerableTimer = 2.5;
        sound.playJackpot();
        this.addScreenShake(18);
        this.triggerNuke();
        this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 50, i18n.t('reviveFloat'), '#22c55e', 24, true));
      } else {
        this.gameOver();
      }
    }
  }

  gameOver() {
    this.state = 'gameover';
    const rawGold = Math.floor(this.score / 10);
    this.earnedGold = meta.addGold(rawGold);

    if (this.onGameOverCallback) {
      this.onGameOverCallback();
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    ctx.translate(-this.camera.x, -this.camera.y);

    // Draw Infinite Arena
    art.drawArena(ctx, this.camera, this.canvas.width, this.canvas.height, this.gameTime);

    // Draw Lucky Chests
    for (const c of this.chests) {
      c.draw(ctx, this.gameTime);
    }

    // Draw Gems
    for (const g of this.gems) {
      g.draw(ctx, this.gameTime);
    }

    // Draw Enemies
    for (const e of this.enemies) {
      e.draw(ctx, this.gameTime);
    }

    // Draw Weapons / Projectiles / Drones / Shockwaves
    this.weaponManager.draw(ctx, this.player);

    // Draw Player
    this.player.draw(ctx);

    // Draw Particles
    for (const p of this.particles) {
      p.draw(ctx);
    }

    // Draw Floating Texts
    for (const ft of this.floatingTexts) {
      ft.draw(ctx);
    }

    ctx.restore();

    // Draw Joystick Overlay on Screen Space
    this.controller.draw(ctx);

    // Frenzy Rainbow Glow border on screen
    if (this.isFrenzy) {
      ctx.save();
      ctx.strokeStyle = `hsl(${(Date.now() / 4) % 360}, 100%, 60%)`;
      ctx.lineWidth = 14;
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 20;
      ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.restore();
    }
  }

  restart() {
    this.state = 'playing';
    this.gameTime = 0;
    this.kills = 0;
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.comboMilestone = 0;
    this.dopamineMeter = 0;
    this.ultimateCharge = 0;
    this.isFrenzy = false;
    this.damageStats = {
      blaster: 0,
      orbs: 0,
      lightning: 0,
      glaive: 0,
      missiles: 0,
      wingmen: 0,
      emp: 0,
      nuke: 0,
      blackhole: 0
    };
    this.totalDamageDealt = 0;
    this.enemies = [];
    this.gems = [];
    this.chests = [];
    this.particles = [];
    this.floatingTexts = [];
    this.player = new Player(this);
    this.weaponManager = new WeaponManager(this);
    this.waveSpawner = new WaveSpawner(this);
  }
}

class Player {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.radius = 16;
    this.facingAngle = 0;

    // Base Stats
    this.maxHp = 100;
    this.hp = this.maxHp;
    this.baseSpeed = 220;
    this.level = 1;
    this.xp = 0;
    this.nextLevelXp = 15;
    this.revivesLeft = 0;

    // Red Mythic God-Tier Passives
    this.forceMythicSingleChoice = false;
    this.hasBloodGodFrenzy = false;
    this.hasReaperExecution = false;
    this.hasBlackHole = false;
    this.blackHoleTimer = 0;
    this.hasChronosFreeze = false;
    this.chronosTimer = 0;

    this.stats = {
      damageMult: 1.0,
      fireRateMult: 1.0,
      speedMult: 1.0,
      magnetRadius: 120,
      critChance: 0.15,
      critMult: 2.0
    };

    this.invulnerableTimer = 0;

    // Apply persistent Meta Hangar upgrades!
    meta.applyToPlayer(this);
  }

  get magnetRadius() {
    return this.game.isFrenzy ? 800 : this.stats.magnetRadius;
  }

  update(dt, moveVector) {
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer -= dt;
    }

    const currentSpeed = this.baseSpeed * this.stats.speedMult * (this.game.isFrenzy ? 1.45 : 1.0);
    this.x += moveVector.x * currentSpeed * dt;
    this.y += moveVector.y * currentSpeed * dt;

    if (moveVector.x !== 0 || moveVector.y !== 0) {
      this.facingAngle = Math.atan2(moveVector.y, moveVector.x);
      if (Math.random() < 0.6) {
        const tx = this.x - Math.cos(this.facingAngle) * 16;
        const ty = this.y - Math.sin(this.facingAngle) * 16;
        this.game.particles.push(new Particle(tx, ty, this.game.isFrenzy ? '#f43f5e' : '#38bdf8', 2, 3));
      }
    }
  }

  takeDamage(amount) {
    if (this.invulnerableTimer > 0) return;
    this.hp -= amount;
    this.invulnerableTimer = 0.2;
    this.game.addScreenShake(5);
    sound.playHit();

    if (this.hp < 0) this.hp = 0;
  }

  addXp(amount) {
    this.xp += amount;
    if (this.xp >= this.nextLevelXp) {
      this.xp -= this.nextLevelXp;
      this.level++;
      this.nextLevelXp = Math.floor(this.nextLevelXp * 1.25 + 10);
      this.levelUp();
    }
  }

  levelUp() {
    sound.playLevelUp();
    this.game.state = 'levelup';
    this.game.addScreenShake(8);

    for (let i = 0; i < 35; i++) {
      this.game.particles.push(new Particle(this.x, this.y, '#facc15', 7, 5, 1.2));
    }

    if (this.game.onLevelUpCallback) {
      this.game.onLevelUpCallback();
    }
  }

  draw(ctx) {
    art.drawPlayer(ctx, this, this.game.gameTime);
  }
}
