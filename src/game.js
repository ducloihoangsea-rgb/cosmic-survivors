// Main Game Loop, Player, Dopamine System, Combo Engine & Meta Upgrades
import { sound } from './audio.js';
import { FloatingText, Particle, Gem, LuckyChest } from './particles.js';
import { WeaponManager } from './weapons.js';
import { WaveSpawner } from './enemies.js';
import { Controller } from './controls.js';
import { art } from './art.js';
import { i18n } from './i18n.js';
import { meta } from './meta.js';
import { SHIP_ROSTER } from './ships.js';
import { SpatialHashGrid } from './spatial-grid.js';
import { MiniDrone } from './drone.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.controller = new Controller(canvas);
    this.waveSpawner = new WaveSpawner(this);

    // Selected Starship Archetype
    const savedShip = localStorage.getItem('dopamine_ship');
    this.selectedShipId = (savedShip === 'rammer' || savedShip === 'serpent' || savedShip === 'novashield' || savedShip === 'carrier') ? savedShip : 'rammer';

    // Game State
    this.state = 'start'; // 'start', 'playing', 'levelup', 'chest', 'gameover'
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
      blackhole: 0,
      ram: 0,
      novashield: 0,
      burnfield: 0,
      flame: 0,
      serpent: 0,
      thorns: 0,
      toxic: 0
    };
    this.totalDamageDealt = 0;

    // Camera & Screen Shake (Wider default FOV)
    this.camera = { x: 0, y: 0 };
    const isInitMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || window.innerHeight <= 600);
    this.cameraZoom = isInitMobile ? 0.80 : 0.86;
    this.screenShake = 0;
    this.freezeFrames = 0;

    // Initialize Ship Loadout
    this.initShipLoadout();

    // Entities
    this.enemies = [];
    this.gems = [];
    this.chests = [];
    this.particles = [];
    this.floatingTexts = [];
    this.toxicPuddles = [];
    this.miniDrones = [];
    this.carrierSpawnTimer = 0;
    this.spatialGrid = new SpatialHashGrid(96);
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

  selectShip(shipId) {
    if (SHIP_ROSTER[shipId]) {
      this.selectedShipId = shipId;
      localStorage.setItem('dopamine_ship', shipId);
      this.initShipLoadout();
    }
  }

  initShipLoadout() {
    const shipDef = SHIP_ROSTER[this.selectedShipId] || SHIP_ROSTER.rammer;
    this.player = new Player(this, this.selectedShipId);
    this.weaponManager = new WeaponManager(this);

    // Reset default weapons
    for (const k in this.weaponManager.weapons) {
      this.weaponManager.weapons[k].level = 0;
    }

    // Apply Starship's starting weapons
    if (shipDef.startingWeapon && this.weaponManager.weapons[shipDef.startingWeapon]) {
      this.weaponManager.weapons[shipDef.startingWeapon].level = 1;
    }
    if (shipDef.secondaryWeapon && this.weaponManager.weapons[shipDef.secondaryWeapon]) {
      this.weaponManager.weapons[shipDef.secondaryWeapon].level = 1;
    }
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
      
      // Tất cả chiến hạm đều kích nổ sóng xung kích EMP điện từ toàn màn hình
      this.weaponManager.triggerEmpShockwave(this.player);

      if (this.player.isNovaShield) {
        this.player.triggerNovaBlast(true);
        this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 50, '⚡ EMP & NOVA SUPERBLAST! ⚡', '#00f2fe', 24, true));
      } else if (this.player.isCarrier) {
        // Tàu Hàng Không: Nổ sóng EMP tê liệt đồng thời thả 4 Mini Drone cường hóa
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const d = new MiniDrone(
            this.player.x + Math.cos(angle) * 35,
            this.player.y + Math.sin(angle) * 35,
            (this.player.droneLevel || 1) + 1,
            true
          );
          this.miniDrones.push(d);
        }
        this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 50, '⚡ EMP & OVERCHARGE SWARM! ⚡', '#00f2fe', 24, true));
      } else {
        this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 45, '⚡ EMP SHOCKWAVE ⚡', '#00f2fe', 24, true));
      }
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

    // Sniper distance bonus & Ghost focus
    let distanceMult = 1.0;
    if (this.player.isSniper) {
      const dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
      if (dist > 130) {
        distanceMult += Math.min(0.85, ((dist - 130) / 350) * 0.85);
      }
      if (this.player.hasGhostFocus) {
        forceCrit = true;
        distanceMult *= 1.4;
        this.player.hasGhostFocus = false;
        this.player.noHitTimer = 0;
      }
    }

    // Berserker rage damage multiplier
    const berserkMult = 1 + (this.player.berserkerDmgBonus || 0);

    const isCrit = forceCrit || (Math.random() < this.player.stats.critChance);
    const critMult = isCrit ? this.player.stats.critMult : 1.0;
    const damage = Math.max(1, Math.round(rawDamage * distanceMult * berserkMult * critMult));

    // Berserker low-HP life leech
    if (this.player.isBerserker && this.player.hp < this.player.maxHp * 0.35 && Math.random() < 0.12) {
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + 1);
    }

    // Track real-time damage per skill
    if (this.damageStats[source] === undefined) this.damageStats[source] = 0;
    this.damageStats[source] += damage;
    this.totalDamageDealt += damage;

    enemy.takeDamage(damage);
    if (this.floatingTexts.length < 50 || isCrit) {
      this.floatingTexts.push(new FloatingText(enemy.x, enemy.y, damage.toString(), '#ffffff', isCrit ? 22 : 16, isCrit));
    }

    if (isCrit) {
      sound.playCrit();
      this.addScreenShake(3);
    } else {
      sound.playHit();
    }

    for (let i = 0; i < (isCrit ? 5 : 2); i++) {
      if (this.particles.length < 180) {
        this.particles.push(new Particle(enemy.x, enemy.y, enemy.color, 4, 3.5));
      }
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

    // Dynamic Camera Zoom & Panoramic FOV (Mở rộng tầm nhìn theo nâng cấp Ống Kính Vũ Trụ)
    const isMobile = this.canvas.width <= 768 || this.canvas.height <= 600;
    const baseZoom = isMobile ? 0.80 : 0.86;
    const visionLvl = this.player?.buffLevels?.cosmicscope || 0;
    const targetZoom = baseZoom / (1 + visionLvl * 0.25);
    this.cameraZoom += (targetZoom - this.cameraZoom) * Math.min(1, dt * 4.5);

    this.camera.x = this.player.x - this.canvas.width / 2;
    this.camera.y = this.player.y - this.canvas.height / 2;

    // 2. Wave Spawner
    this.waveSpawner.update(dt, this.player);

    // Update Spatial Hash Grid with all current enemies for O(1) queries
    this.spatialGrid.insertAll(this.enemies);

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

    // 3.5. Update Toxic Puddles (Khí Độc Đuôi)
    for (let i = this.toxicPuddles.length - 1; i >= 0; i--) {
      const tp = this.toxicPuddles[i];
      tp.update(dt, this.enemies, this);
      if (tp.isDead) {
        this.toxicPuddles.splice(i, 1);
      }
    }

    // 3.6. Carrier Autonomous Drone Deployment
    if (this.player.isCarrier) {
      this.carrierSpawnTimer -= dt;
      const cd = Math.max(3.0, 5.0 - (this.player.droneCooldownReduction || 0));
      if (this.carrierSpawnTimer <= 0) {
        this.carrierSpawnTimer = cd;
        const count = this.player.droneSpawnCount || (this.player.isDroneEvolved ? 3 : 2);
        for (let i = 0; i < count; i++) {
          const spawnAngle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
          const spawnDist = 26;
          const md = new MiniDrone(
            this.player.x + Math.cos(spawnAngle) * spawnDist,
            this.player.y + Math.sin(spawnAngle) * spawnDist,
            this.player.droneLevel || 1,
            this.player.isDroneEvolved || false
          );
          this.miniDrones.push(md);
        }
        sound.playShoot('wingmen');
      }
    }

    // 3.7. Update Mini Drones
    for (let i = this.miniDrones.length - 1; i >= 0; i--) {
      const md = this.miniDrones[i];
      md.update(dt, this.player, this.enemies, this);
      if (md.isDead) {
        this.miniDrones.splice(i, 1);
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
    // Canvas Center Zoom
    const zoom = this.cameraZoom || 1.0;
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);

    ctx.translate(-this.camera.x, -this.camera.y);

    // Draw Infinite Arena
    const isLight = document.body.classList.contains('theme-light');
    art.drawArena(ctx, this.camera, this.canvas.width / zoom, this.canvas.height / zoom, this.gameTime, isLight);

    // Draw Lucky Chests
    for (const c of this.chests) {
      c.draw(ctx, this.gameTime);
    }

    // Draw Toxic Puddles (Khí Độc)
    for (const tp of this.toxicPuddles) {
      tp.draw(ctx);
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

    // Draw Mini Drones
    for (const md of this.miniDrones) {
      md.draw(ctx, this.gameTime);
    }

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
    this.cameraZoom = (this.canvas.width <= 768 || this.canvas.height <= 600) ? 0.80 : 0.86;
    this.damageStats = {
      blaster: 0,
      orbs: 0,
      lightning: 0,
      glaive: 0,
      missiles: 0,
      wingmen: 0,
      emp: 0,
      nuke: 0,
      blackhole: 0,
      ram: 0,
      novashield: 0,
      burnfield: 0,
      flame: 0,
      serpent: 0,
      thorns: 0,
      toxic: 0
    };
    this.totalDamageDealt = 0;
    this.enemies = [];
    this.gems = [];
    this.chests = [];
    this.particles = [];
    this.floatingTexts = [];
    this.toxicPuddles = [];
    this.miniDrones = [];
    this.carrierSpawnTimer = 0;
    this.spatialGrid.clear();
    this.initShipLoadout();
    this.waveSpawner = new WaveSpawner(this);
  }
}

class Player {
  constructor(game, shipId = 'rammer') {
    this.game = game;
    this.shipId = shipId;
    const shipDef = SHIP_ROSTER[shipId] || SHIP_ROSTER.rammer;
    this.shipDef = shipDef;
    this.baseStats = shipDef.baseStats;

    this.x = 0;
    this.y = 0;
    this.radius = 16;
    this.facingAngle = 0;

    // Base Stats from Ship Archetype
    this.maxHp = shipDef.baseStats.maxHp;
    this.hp = this.maxHp;
    this.baseSpeed = shipDef.baseStats.baseSpeed;
    this.level = 1;
    this.xp = 0;
    this.nextLevelXp = 15;
    this.revivesLeft = 0;

    // Archetype Traits (4 Distinct Paradigms)
    this.isRammer = shipDef.trait === 'rammer';
    this.isSerpent = shipDef.trait === 'serpent';
    this.isNovaShield = shipDef.trait === 'novashield';
    this.isCarrier = shipDef.trait === 'carrier';
    this.noGuns = !!shipDef.baseStats.noGuns;

    // Carrier Drone stats
    this.droneLevel = 1;
    this.isDroneEvolved = false;
    this.droneCooldownReduction = 0;
    this.droneSpawnCount = shipDef.baseStats.droneSpawnCount || 2;

    // Serpent trail history buffer & segment positions
    this.trailBuffer = [];
    this.segmentPositions = [];

    // Nova Shield barrier
    this.shieldHp = shipDef.baseStats.shieldHp || 0;
    this.shieldMaxHp = shipDef.baseStats.shieldMaxHp || 0;
    this.shieldRechargeTimer = 0;

    // Red Mythic God-Tier Passives
    this.forceMythicSingleChoice = false;
    this.hasBloodGodFrenzy = false;
    this.hasReaperExecution = false;
    this.hasBlackHole = false;
    this.blackHoleTimer = 0;
    this.hasChronosFreeze = false;
    this.chronosTimer = 0;

    // Curated Upgrades Flags (3 Nhóm Nâng Cấp Tinh Gọn)
    this.turnSpeedMult = 1.0;
    this.hasDrill = false;
    this.hasBurnField = false;
    this.burnFieldTimer = 0;
    this.hasRicochet = false;
    this.hasToxicExhaust = false;
    this.toxicExhaustTimer = 0;
    this.hasFlameTrail = false;
    this.flameTrailLength = 0;
    this.hasCrashNova = false;
    this.crashNovaCooldown = 0;
    this.hasIronDragon = false;
    this.hasImmortality = false;
    this.shieldRechargeSpeed = 1.0;

    this.stats = {
      damageMult: shipDef.baseStats.damageMult,
      fireRateMult: shipDef.baseStats.fireRateMult,
      speedMult: 1.0,
      magnetRadius: shipDef.baseStats.magnetRadius,
      critChance: shipDef.baseStats.critChance,
      critMult: shipDef.baseStats.critMult,
      mass: shipDef.baseStats.mass || 1.0,
      bonusSegments: 0,
      shieldRadiusMult: 1.0,
      thorns: 0
    };

    // Track levels of passive stat augments
    this.buffLevels = {
      thrust: 0,
      juggernaut: 0,
      microcraft: 0,
      energycore: 0,
      growsegments: 0,
      cosmicscope: 0,
      drill: 0,
      burnfield: 0,
      ricochet: 0,
      toxicexhaust: 0,
      crashnova: 0,
      irondragon: 0,
      immortality: 0,
      nanorepair: 0,
      spikedthorns: 0,
      overclock: 0,
      hypercharge: 0,
      gravitywell: 0,
      warpengine: 0,
      eaglesight: 0,
      criticalsurge: 0,
      hullmass: 0,
      serpentsegments: 0,
      barrierradius: 0
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
    if (this.crashNovaCooldown > 0) {
      this.crashNovaCooldown -= dt;
    }

    const currentSpeed = this.baseSpeed * this.stats.speedMult * (this.game.isFrenzy ? 1.45 : 1.0);
    this.x += moveVector.x * currentSpeed * dt;
    this.y += moveVector.y * currentSpeed * dt;

    if (moveVector.x !== 0 || moveVector.y !== 0) {
      const targetAngle = Math.atan2(moveVector.y, moveVector.x);
      const turnRate = 14 * (this.turnSpeedMult || 1.0);
      let diff = targetAngle - this.facingAngle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      const step = turnRate * dt;
      if (Math.abs(diff) <= step) {
        this.facingAngle = targetAngle;
      } else {
        this.facingAngle += Math.sign(diff) * step;
      }
    }

    // Always maintain trail history buffer for Serpent and plasma trails
    this.trailBuffer.unshift({ x: this.x, y: this.y, facingAngle: this.facingAngle });
    if (this.trailBuffer.length > 250) {
      this.trailBuffer.pop();
    }

    // Thruster plasma particles
    if (moveVector.x !== 0 || moveVector.y !== 0) {
      if (Math.random() < 0.6) {
        const tx = this.x - Math.cos(this.facingAngle) * 16;
        const ty = this.y - Math.sin(this.facingAngle) * 16;
        const particleColor = this.game.isFrenzy ? '#f43f5e' : (this.isRammer ? '#f97316' : (this.isSerpent ? '#10b981' : '#00f2fe'));
        this.game.particles.push(new Particle(tx, ty, particleColor, this.isRammer ? 3.5 : 2, 3));
      }
    }

    // Burn Field logic (Khiên Lửa)
    if (this.hasBurnField) {
      this.burnFieldTimer = (this.burnFieldTimer || 0) + dt;
      if (this.burnFieldTimer >= 0.2) {
        this.burnFieldTimer = 0;
        const burnRadius = Math.max(70, this.radius * 2.8) * (this.stats.shieldRadiusMult || 1.0);
        for (const enemy of this.game.enemies) {
          const d = Math.hypot(enemy.x - this.x, enemy.y - this.y);
          if (d < burnRadius + enemy.radius) {
            this.game.damageEnemy(enemy, 40 * this.stats.damageMult, false, 'burnfield');
            if (Math.random() < 0.25) {
              this.game.particles.push(new Particle(enemy.x, enemy.y, '#f97316', 3.5, 3));
            }
          }
        }
      }
    }

    // Toxic Exhaust logic (Khí Độc Đuôi)
    if (this.hasToxicExhaust) {
      this.toxicExhaustTimer = (this.toxicExhaustTimer || 0) + dt;
      if (this.toxicExhaustTimer >= 0.15) {
        this.toxicExhaustTimer = 0;
        let exX = this.x - Math.cos(this.facingAngle) * (this.radius + 8);
        let exY = this.y - Math.sin(this.facingAngle) * (this.radius + 8);
        if (this.isSerpent && this.segmentPositions && this.segmentPositions.length > 0) {
          const lastSeg = this.segmentPositions[this.segmentPositions.length - 1];
          exX = lastSeg.x;
          exY = lastSeg.y;
        }
        this.game.toxicPuddles.push(new ToxicPuddle(exX, exY, 34, this.stats.damageMult));
      }
    }

    // Flame Trail logic (Mọc Đốt khi không phải Tàu Rắn)
    if (this.hasFlameTrail && this.trailBuffer.length > 5) {
      const len = Math.min(this.trailBuffer.length, (this.flameTrailLength || 1) * 12);
      for (let i = 2; i < len; i += 3) {
        const pt = this.trailBuffer[i];
        if (!pt) continue;
        if (Math.random() < 0.12) {
          this.game.particles.push(new Particle(pt.x + (Math.random() - 0.5) * 8, pt.y + (Math.random() - 0.5) * 8, '#f97316', 3, 3, 0.4));
        }
        for (const enemy of this.game.enemies) {
          const d = Math.hypot(enemy.x - pt.x, enemy.y - pt.y);
          if (d < 18 + enemy.radius) {
            this.game.damageEnemy(enemy, 28 * this.stats.damageMult * dt * 3, false, 'flame');
          }
        }
      }
    }

    // Nova Shield or Absolute Immortality Recharge logic
    if (this.isNovaShield || this.hasImmortality) {
      if (this.shieldRechargeTimer > 0) {
        this.shieldRechargeTimer -= dt * (this.shieldRechargeSpeed || 1.0);
      } else if (this.shieldHp < this.shieldMaxHp) {
        this.shieldHp = Math.min(this.shieldMaxHp, this.shieldHp + dt * 45 * (this.shieldRechargeSpeed || 1.0));
      }
    }

    // Serpent Segments Logic
    if (this.isSerpent) {
      this.segmentPositions = [];
      const totalSegments = (this.baseStats?.segments || 4) + (this.stats.bonusSegments || 0);
      const segRadius = (this.baseStats?.segmentRadius || 14) * (this.stats.shieldRadiusMult || 1.0);
      const step = 8; // Spacing along trail buffer

      for (let s = 1; s <= totalSegments; s++) {
        const idx = Math.min(this.trailBuffer.length - 1, s * step);
        const pt = this.trailBuffer[idx] || { x: this.x, y: this.y, facingAngle: this.facingAngle };
        const seg = { x: pt.x, y: pt.y, radius: segRadius, index: s };
        this.segmentPositions.push(seg);

        // Segment collision with nearby enemies: swipe damage + knockback
        for (const enemy of this.game.enemies) {
          const dx = enemy.x - seg.x;
          const dy = enemy.y - seg.y;
          const d = Math.hypot(dx, dy);
          if (d < seg.radius + enemy.radius) {
            let segDmg = (this.baseStats?.segmentDamage || 85) * this.stats.damageMult * (1 + (this.stats.thorns || 0)) * dt * 4;
            if (this.hasIronDragon) {
              segDmg *= 2.5; // Iron Dragon gives immense swipe damage
            }
            this.game.damageEnemy(enemy, Math.max(1, segDmg), false, 'serpent');
            if (d > 0.001) {
              const knockback = this.hasIronDragon ? 120 : 15;
              enemy.x += (dx / d) * knockback * dt * 60;
              enemy.y += (dy / d) * knockback * dt * 60;
            }
            if (Math.random() < 0.2) {
              this.game.particles.push(new Particle(enemy.x, enemy.y, this.hasIronDragon ? '#fbbf24' : '#34d399', 3, 2.5));
            }
          }
        }
      }
    }
  }

  triggerNovaBlast(isSuper = false) {
    const mult = this.hasImmortality ? 3.0 : 1.0;
    const baseRadius = (this.baseStats?.novaRadius || 160) * (this.stats.shieldRadiusMult || 1.0) * (this.stats.mass || 1.0);
    const radius = isSuper ? baseRadius * 1.6 : baseRadius;
    const baseDmg = (this.baseStats?.novaDamage || 320) * this.stats.damageMult * (this.stats.mass || 1.0);
    const dmg = (isSuper ? baseDmg * 2.0 : baseDmg) * mult;

    sound.playExplosion();
    this.game.addScreenShake(isSuper ? 16 : 10);

    // Shockwave particle visual
    for (let i = 0; i < (isSuper ? 36 : 22); i++) {
      const angle = (i / (isSuper ? 36 : 22)) * Math.PI * 2;
      const spd = (radius / 18);
      const px = this.x + Math.cos(angle) * 15;
      const py = this.y + Math.sin(angle) * 15;
      const p = new Particle(px, py, isSuper ? '#facc15' : (this.hasImmortality ? '#fbbf24' : '#00f2fe'), 6, 4.5, 0.9);
      p.vx = Math.cos(angle) * spd;
      p.vy = Math.sin(angle) * spd;
      this.game.particles.push(p);
    }

    this.game.floatingTexts.push(new FloatingText(this.x, this.y - 45, isSuper ? '⚡ MEGA NOVA! ⚡' : (this.hasImmortality ? '👑 IMMORTAL NOVA! 👑' : '💥 NOVA BLAST! 💥'), '#00f2fe', 22, true));

    // Damage & knock back all enemies in radius
    for (const enemy of this.game.enemies) {
      const d = Math.hypot(enemy.x - this.x, enemy.y - this.y);
      if (d < radius + enemy.radius) {
        this.game.damageEnemy(enemy, dmg, true, 'novashield');
        if (d > 0.001) {
          enemy.x += ((enemy.x - this.x) / d) * (isSuper ? 90 : 60);
          enemy.y += ((enemy.y - this.y) / d) * (isSuper ? 90 : 60);
        }
      }
    }
  }

  takeDamage(amount) {
    if (this.invulnerableTimer > 0) return;

    // Nova Shield barrier or Absolute Immortality absorbs damage first
    if (this.hasImmortality || (this.isNovaShield && this.shieldHp > 0)) {
      this.shieldHp -= amount;
      this.invulnerableTimer = 0.15;
      sound.playHit();
      for (let i = 0; i < 4; i++) {
        this.game.particles.push(new Particle(this.x, this.y, this.hasImmortality ? '#fbbf24' : '#00f2fe', 3, 3));
      }
      if (this.shieldHp <= 0) {
        this.shieldHp = 0;
        this.shieldRechargeTimer = (this.baseStats?.shieldRechargeTime || 3.5);
        this.triggerNovaBlast(this.hasImmortality);
        if (this.hasImmortality) {
          this.invulnerableTimer = 2.0; // Grace period to retreat while shield recharges!
        }
      }
      return;
    }

    this.hp -= amount;
    this.invulnerableTimer = 0.2;
    this.game.addScreenShake(5);
    sound.playHit();

    // Spiked Thorns reflection
    if (this.stats.thorns > 0) {
      for (const e of this.game.enemies) {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < this.radius + e.radius + 20) {
          this.game.damageEnemy(e, amount * this.stats.thorns * 2.0, false, 'thorns');
        }
      }
    }

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

export class ToxicPuddle {
  constructor(x, y, radius, dmgMult) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dmgMult = dmgMult;
    this.life = 2.5;
    this.maxLife = 2.5;
    this.isDead = false;
  }

  update(dt, enemies, game) {
    this.life -= dt;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }
    for (const e of enemies) {
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < this.radius + e.radius) {
        // Slow monster by 40%
        e.x -= (e.x - this.x) * 0.4 * dt;
        e.y -= (e.y - this.y) * 0.4 * dt;
        game.damageEnemy(e, 25 * this.dmgMult * dt, false, 'toxic');
      }
    }
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife) * 0.45;
    ctx.save();
    ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
