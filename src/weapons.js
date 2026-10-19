// Weapons, Companion Drones and Projectiles System with Evolutionary Progression
import { sound } from './audio.js';
import { FloatingText, Particle } from './particles.js';
import { getCyberSkillIcon } from './cyberIcons.js';

export class WeaponManager {
  constructor(game) {
    this.game = game;
    this.weapons = {
      blaster: {
        id: 'blaster',
        level: 1,
        maxLevel: 5,
        timer: 0,
        icon: getCyberSkillIcon('blaster'),
        rarity: 'Common'
      },
      orbs: {
        id: 'orbs',
        level: 0,
        maxLevel: 5,
        angle: 0,
        icon: getCyberSkillIcon('orbs'),
        rarity: 'Rare'
      },
      lightning: {
        id: 'lightning',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: getCyberSkillIcon('lightning'),
        rarity: 'Epic'
      },
      glaive: {
        id: 'glaive',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: getCyberSkillIcon('glaive'),
        rarity: 'Rare'
      },
      missiles: {
        id: 'missiles',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: getCyberSkillIcon('missiles'),
        rarity: 'Epic'
      },
      wingmen: {
        id: 'wingmen',
        level: 0,
        maxLevel: 5,
        timer: 0,
        angle: 0,
        icon: getCyberSkillIcon('wingmen'),
        rarity: 'Epic',
        isAwakened: false
      },
      laser: {
        id: 'laser',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: getCyberSkillIcon('laser'),
        rarity: 'Rare',
        isAwakened: false
      },
      bombs: {
        id: 'bombs',
        level: 0,
        maxLevel: 5,
        timer: 0,
        icon: getCyberSkillIcon('bombs'),
        rarity: 'Epic',
        isAwakened: false
      }
    };

    this.projectiles = [];
    this.shockwaves = [];
    this.blackHoles = [];
    this.spaceBombs = [];
    this.laserBeams = [];
    this.laserAngle = 0;
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
      const wCooldown = Math.max(0.25, (0.9 - wm.level * 0.12) / fireMult);
      wm.timer += dt;
      if (wm.timer >= wCooldown) {
        wm.timer = 0;
        this.fireWingmen(player, enemies);
      }
    }

    // 7. Prism Laser logic
    const ls = this.weapons.laser;
    if (ls.level > 0) {
      const lCooldown = ls.isAwakened ? 0.35 : Math.max(0.4, (1.8 - ls.level * 0.25) / fireMult);
      ls.timer += dt;
      if (ls.timer >= lCooldown) {
        ls.timer = 0;
        this.fireLaser(player, enemies);
      }
    }

    // 8. Space Mine Dropper logic
    const bm = this.weapons.bombs;
    if (bm.level > 0) {
      const bCooldown = bm.isAwakened ? 0.9 : Math.max(0.8, (2.6 - bm.level * 0.3) / fireMult);
      bm.timer += dt;
      if (bm.timer >= bCooldown) {
        bm.timer = 0;
        this.fireBombs(player, enemies);
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

    // Update Space Bombs
    for (let i = this.spaceBombs.length - 1; i >= 0; i--) {
      const sb = this.spaceBombs[i];
      sb.update(dt, enemies, this.game);
      if (sb.isDead) {
        this.spaceBombs.splice(i, 1);
      }
    }

    // Update Laser Beams
    for (let i = this.laserBeams.length - 1; i >= 0; i--) {
      const lb = this.laserBeams[i];
      lb.update(dt);
      if (lb.isDead) {
        this.laserBeams.splice(i, 1);
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
    this.shockwaves.push(new EmpShockwave(player.x, player.y, 240 * player.stats.damageMult));

    // Nổ tỏa 40 tia lửa điện và hạt năng lượng cao xoay quanh tàu
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const spd = 180 + Math.random() * 320;
      const p = new Particle(player.x, player.y, i % 2 === 0 ? '#00f2fe' : '#ffffff', 5, 4, 0.7);
      p.vx = Math.cos(angle) * spd;
      p.vy = Math.sin(angle) * spd;
      this.game.particles.push(p);
    }
  }

  fireBlaster(player, enemies) {
    if (enemies.length === 0) return;
    const b = this.weapons.blaster;
    const target = this.game.spatialGrid ? this.game.spatialGrid.getNearest(player.x, player.y, b.isAwakened ? 850 : 750) : enemies[0];
    if (!target) return;
    const angle = Math.atan2(target.y - player.y, target.x - player.x);
    const bLvl = b.level;
    const baseDamage = 18 + bLvl * 10;

    sound.playShoot('blaster');

    if (b.isAwakened) {
      // 🌟 THỨC TỈNH: Gatling Laserstorm - Xả đạn 8 nòng xuyên thấu 4 quái, đạn vàng kim
      const count = 8;
      for (let i = 0; i < count; i++) {
        const spread = (i - (count - 1) / 2) * 0.12;
        this.projectiles.push(new BlasterBullet(
          player.x,
          player.y,
          angle + spread,
          baseDamage * 1.6 * player.stats.damageMult,
          4, // Pierce 4 enemies!
          true,
          '#facc15', // Gold glowing bullet
          'blaster'
        ));
      }
      return;
    }

    const count = bLvl >= 5 ? 5 : (bLvl >= 3 ? 3 : (bLvl >= 2 ? 2 : 1));

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

      const candidates = this.game.spatialGrid ? this.game.spatialGrid.query(ox, oy, 18 + 35) : enemies;
      for (const enemy of candidates) {
        if (enemy.isDead) continue;
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

    const nearby = this.game.spatialGrid ? this.game.spatialGrid.query(player.x, player.y, 450) : enemies.filter(e => Math.hypot(e.x - player.x, e.y - player.y) < 450);
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
      const candidates = this.game.spatialGrid ? this.game.spatialGrid.query(current.x, current.y, minDist) : enemies;
      for (const e of candidates) {
        if (!struck.has(e) && !e.isDead) {
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
    const droneCount = wm.isAwakened ? 6 : (wm.level >= 5 ? 4 : 2);
    const radius = wm.isAwakened ? 65 : 50;
    const summonMult = player.stats?.summonDmgMult || 1.0;
    const damage = (16 + wm.level * 7) * player.stats.damageMult * summonMult * (wm.isAwakened ? 1.6 : 1.0);

    for (let i = 0; i < droneCount; i++) {
      const a = wm.angle + (i * Math.PI * 2) / droneCount;
      const dx = player.x + Math.cos(a) * radius;
      const dy = player.y + Math.sin(a) * radius;

      // Find nearest enemy to drone
      const target = this.game.spatialGrid ? this.game.spatialGrid.getNearest(dx, dy, wm.isAwakened ? 500 : 380) : enemies[0];

      if (target) {
        const aimAngle = Math.atan2(target.y - dy, target.x - dx);
        if (wm.isAwakened) {
          // Bắn 2 nòng đạn song song + thi thoảng phóng mini missile
          this.projectiles.push(new BlasterBullet(dx - 3, dy, aimAngle, damage, 2, true, '#38bdf8', 'wingmen'));
          this.projectiles.push(new BlasterBullet(dx + 3, dy, aimAngle, damage, 2, true, '#38bdf8', 'wingmen'));
        } else {
          this.projectiles.push(new BlasterBullet(dx, dy, aimAngle, damage, 1, false, '#38bdf8', 'wingmen'));
        }
      }
    }
  }

  fireLaser(player, enemies) {
    if (enemies.length === 0) return;
    const ls = this.weapons.laser;
    const baseDmg = (32 + ls.level * 14) * player.stats.damageMult;
    const rangeMult = player.stats.rangeMult || 1.0;
    const beamLength = (ls.isAwakened ? 720 : 520) * rangeMult;
    const beamWidth = ls.isAwakened ? 16 : (8 + ls.level * 2);

    sound.playShoot('blaster');

    if (ls.isAwakened) {
      // 🌟 THỨC TỈNH: Orbital Death Ray - 2 chùm tia laser quỹ đạo xoay 360 độ xé toạc màn hình
      this.laserAngle = (this.laserAngle || 0) + 0.75;
      const angles = [this.laserAngle, this.laserAngle + Math.PI];

      for (const a of angles) {
        const x2 = player.x + Math.cos(a) * beamLength;
        const y2 = player.y + Math.sin(a) * beamLength;
        this.laserBeams.push(new LaserBeamVisual(player.x, player.y, x2, y2, beamWidth, '#facc15', true));

        const candidates = this.game.spatialGrid ? this.game.spatialGrid.query(player.x, player.y, beamLength) : enemies;
        for (const e of candidates) {
          if (e.isDead) continue;
          const distToLine = distToSegment(e.x, e.y, player.x, player.y, x2, y2);
          if (distToLine < beamWidth + e.radius) {
            this.game.damageEnemy(e, baseDmg * 1.5, true, 'laser');
          }
        }
      }
    } else {
      // Tia laze thường hội tụ vào quái gần nhất
      const target = this.game.spatialGrid ? this.game.spatialGrid.getNearest(player.x, player.y, beamLength) : enemies[0];
      if (!target) return;
      const targetAngle = Math.atan2(target.y - player.y, target.x - player.x);
      const beamCount = ls.level >= 4 ? 2 : 1;

      for (let i = 0; i < beamCount; i++) {
        const spread = (i - (beamCount - 1) / 2) * 0.22;
        const a = targetAngle + spread;
        const x2 = player.x + Math.cos(a) * beamLength;
        const y2 = player.y + Math.sin(a) * beamLength;
        this.laserBeams.push(new LaserBeamVisual(player.x, player.y, x2, y2, beamWidth, '#f43f5e', false));

        const candidates = this.game.spatialGrid ? this.game.spatialGrid.query(player.x, player.y, beamLength) : enemies;
        for (const e of candidates) {
          if (e.isDead) continue;
          const distToLine = distToSegment(e.x, e.y, player.x, player.y, x2, y2);
          if (distToLine < beamWidth + e.radius) {
            this.game.damageEnemy(e, baseDmg, false, 'laser');
          }
        }
      }
    }
  }

  fireBombs(player, enemies) {
    const bm = this.weapons.bombs;
    const summonMult = player.stats?.summonDmgMult || 1.0;
    const baseDmg = (45 + bm.level * 22) * player.stats.damageMult * summonMult;
    const blastMult = player.stats.blastRadiusMult || 1.0;
    const blastRadius = (75 + bm.level * 10) * blastMult;

    // Drop behind player
    const dropAngle = (player.facingAngle || 0) + Math.PI;
    const bx = player.x + Math.cos(dropAngle) * 26;
    const by = player.y + Math.sin(dropAngle) * 26;

    sound.playShoot('blaster');
    this.spaceBombs.push(new SpaceBomb(bx, by, baseDmg, blastRadius, bm.isAwakened));

    if (bm.level >= 4 || bm.isAwakened) {
      const b2x = player.x + Math.cos(dropAngle + 0.6) * 32;
      const b2y = player.y + Math.sin(dropAngle + 0.6) * 32;
      this.spaceBombs.push(new SpaceBomb(b2x, b2y, baseDmg * 0.9, blastRadius * 0.9, bm.isAwakened));
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
        // Zero-CPU Glow Halo (Vẽ vòng ngoài mờ thay cho shadowBlur)
        ctx.fillStyle = orb.level >= 5 ? 'rgba(244, 63, 94, 0.35)' : 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        ctx.arc(ox, oy, 15, 0, Math.PI * 2);
        ctx.fill();

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

    // Draw Space Bombs
    for (const sb of this.spaceBombs) {
      sb.draw(ctx);
    }

    // Draw Laser Beams
    for (const lb of this.laserBeams) {
      lb.draw(ctx);
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

    const candidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.radius + 35) : enemies;
    for (const e of candidates) {
      if (e.isDead) continue;
      const dist = Math.hypot(e.x - this.x, e.y - this.y);
      if (dist < this.radius + e.radius) {
        game.damageEnemy(e, this.damage, false, this.source);
        this.pierce--;
        if (this.pierce <= 0) {
          // 🪃 Ricochet Shards Mutation
          if (game.player?.hasRicochet && !this.hasRicocheted) {
            this.hasRicocheted = true;
            this.pierce = 1;
            this.damage *= 0.75;
            let next = null;
            let minDist = 240;
            const ricochetCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, 240) : enemies;
            for (const other of ricochetCandidates) {
              if (other !== e && !other.isDead) {
                const d = Math.hypot(other.x - this.x, other.y - this.y);
                if (d < minDist) {
                  minDist = d;
                  next = other;
                }
              }
            }
            if (next) {
              const a = Math.atan2(next.y - this.y, next.x - this.x);
              this.vx = Math.cos(a) * 550;
              this.vy = Math.sin(a) * 550;
              this.angle = a;
              this.life = 0.8;
              this.isDead = false;
              game.particles.push(new Particle(this.x, this.y, '#38bdf8', 3, 2));
              break;
            }
          }
          this.isDead = true;
          break;
        }
      }
    }
  }

  draw(ctx) {
    ctx.save();
    // Zero-CPU Glow Halo
    ctx.fillStyle = this.customColor || (this.evolved ? 'rgba(225, 29, 72, 0.35)' : 'rgba(0, 242, 254, 0.35)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
    ctx.fill();

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
      this.target = game.spatialGrid ? game.spatialGrid.getNearest(this.x, this.y, 500) : (enemies[0] || null);
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

    const checkCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, 10 + 35) : enemies;
    for (const e of checkCandidates) {
      if (e.isDead) continue;
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
    const splashCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, splashRadius + 30) : enemies;

    for (const e of splashCandidates) {
      if (e.isDead) continue;
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
    this.radius = 15;
    this.maxRadius = 520; // Vùng quét sóng rộng khắp màn hình
    this.speed = 920;
    this.isDead = false;
    this.hitEnemies = new Set();
    // 10 góc cố định để giật các nhánh sét răng cưa theo vòng sóng
    this.arcAngles = [0, 0.6, 1.25, 1.9, 2.5, 3.15, 3.75, 4.4, 5.0, 5.65].map(a => a + (Math.random() - 0.5) * 0.25);
  }

  update(dt, enemies, game) {
    this.radius += this.speed * dt;
    if (this.radius >= this.maxRadius) {
      this.isDead = true;
      return;
    }

    const shockCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.radius + 60) : enemies;
    for (const e of shockCandidates) {
      if (this.hitEnemies.has(e) || e.isDead) continue;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (Math.abs(d - this.radius) < 50) {
        this.hitEnemies.add(e);
        // TÊ LIỆT ĐÓNG BĂNG QUÁI 2.2 GIÂY
        e.freezeTimer = 2.2;
        game.damageEnemy(e, this.damage, true, 'emp');

        // Đánh văng lùi quái ra xa
        const pushAngle = Math.atan2(e.y - this.y, e.x - this.x);
        e.x += Math.cos(pushAngle) * 85;
        e.y += Math.sin(pushAngle) * 85;

        // Bắn tung các tia điện tích màu xanh neon trên quái
        for (let p = 0; p < 4; p++) {
          const sp = new Particle(e.x, e.y, Math.random() > 0.4 ? '#00f2fe' : '#ffffff', 3.5, 3, 0.4);
          sp.vx = (Math.random() - 0.5) * 160;
          sp.vy = (Math.random() - 0.5) * 160;
          game.particles.push(sp);
        }
      }
    }
  }

  draw(ctx) {
    const progress = this.radius / this.maxRadius;
    const alpha = Math.max(0, 1.0 - progress);
    ctx.save();

    // Zero-CPU Glow Halo (no expensive shadowBlur)
    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.25})`;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Vành sóng năng lượng tỏa dạng Gradient bán trong suốt
    const grad = ctx.createRadialGradient(
      this.x, this.y, Math.max(0, this.radius - 45),
      this.x, this.y, this.radius
    );
    grad.addColorStop(0, 'rgba(0, 242, 254, 0)');
    grad.addColorStop(0.75, `rgba(0, 242, 254, ${alpha * 0.35})`);
    grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.85})`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // 3. Vòng viền điện quang Neon ngoài dày và nét
    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.95})`;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Lõi trắng cực sáng
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.98, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Các tia sét giật zig-zag răng cưa phát ra từ vòng sóng EMP
    ctx.strokeStyle = `rgba(186, 230, 253, ${alpha * 0.9})`;
    ctx.lineWidth = 2.5;
    for (const baseAngle of this.arcAngles) {
      const r1 = Math.max(0, this.radius - 35);
      const r2 = this.radius + 20;
      const midR = (r1 + r2) / 2;
      const jitterAngle = baseAngle + (Math.sin(this.radius * 0.12 + baseAngle) * 0.15);

      ctx.beginPath();
      ctx.moveTo(this.x + Math.cos(baseAngle) * r1, this.y + Math.sin(baseAngle) * r1);
      ctx.lineTo(this.x + Math.cos(jitterAngle) * midR, this.y + Math.sin(jitterAngle) * midR);
      ctx.lineTo(this.x + Math.cos(baseAngle) * r2, this.y + Math.sin(baseAngle) * r2);
      ctx.stroke();
    }

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

    const glaiveHits = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.radius + 35) : enemies;
    for (const e of glaiveHits) {
      if (this.hitCooldown.has(e) || e.isDead) continue;
      const dist = Math.hypot(e.x - this.x, e.y - this.y);
      if (dist < this.radius + e.radius) {
        game.damageEnemy(e, this.damage, false, 'glaive');
        this.hitCooldown.add(e);
        this.bouncesLeft--;

        if (this.bouncesLeft <= 0) {
          this.isDead = true;
          return;
        }

        const candidates = (game.spatialGrid ? game.spatialGrid.query(this.x, this.y, 450) : enemies).filter(target => !this.hitCooldown.has(target) && !target.isDead);
        if (candidates.length > 0) {
          let next = candidates[0];
          let minDistSq = (next.x - this.x) ** 2 + (next.y - this.y) ** 2;
          for (let k = 1; k < candidates.length; k++) {
            const cur = candidates[k];
            const dSq = (cur.x - this.x) ** 2 + (cur.y - this.y) ** 2;
            if (dSq < minDistSq) {
              minDistSq = dSq;
              next = cur;
            }
          }
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

    const pullCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.pullRadius + 40) : enemies;

    if (this.life <= 0) {
      this.isDead = true;
      // Final Implosion / Collapse blast!
      const finalDmg = Math.round(320 * this.damageMult);
      for (const e of pullCandidates) {
        if (e.isDead) continue;
        const dist = Math.hypot(e.x - this.x, e.y - this.y);
        if (dist < this.pullRadius) {
          game.damageEnemy(e, finalDmg, true, 'blackhole');
        }
      }
      sound.playExplosion();
      for (let i = 0; i < 25; i++) {
        game.particles.push(new Particle(this.x, this.y, Math.random() < 0.5 ? '#ef4444' : '#a855f7', 7, 5, 1.0));
      }
      return;
    }

    // Pull enemies towards vortex center
    for (const e of pullCandidates) {
      if (e.isDead) continue;
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
      const dmgCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.damageRadius + 30) : pullCandidates;
      for (const e of dmgCandidates) {
        if (e.isDead) continue;
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

// Distance from point (px, py) to segment (x1, y1) -> (x2, y2)
export function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

export class SpaceBomb {
  constructor(x, y, damage, blastRadius, isAwakened = false) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.radius = isAwakened ? 16 : 11;
    this.blastRadius = blastRadius;
    this.isAwakened = isAwakened;
    this.life = 3.2;
    this.isDead = false;
    this.pulse = Math.random() * Math.PI * 2;
  }

  update(dt, enemies, game) {
    this.life -= dt;
    this.pulse += dt * 6;
    if (this.life <= 0) {
      this.explode(game);
      return;
    }

    const checkCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, this.radius + 30) : enemies;
    for (const e of checkCandidates) {
      if (e.isDead) continue;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < this.radius + e.radius) {
        this.explode(game);
        break;
      }
    }
  }

  explode(game) {
    if (this.isDead) return;
    this.isDead = true;
    sound.playExplosion();
    game.addScreenShake(this.isAwakened ? 14 : 7);

    const summonMult = game.player?.stats?.summonDmgMult || 1.0;
    const finalDmg = this.damage * summonMult;
    const radius = this.blastRadius;

    const hitCandidates = game.spatialGrid ? game.spatialGrid.query(this.x, this.y, radius + 40) : game.enemies;
    for (const e of hitCandidates) {
      if (e.isDead) continue;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < radius + e.radius) {
        game.damageEnemy(e, finalDmg, true, 'bombs');
        const pushA = Math.atan2(e.y - this.y, e.x - this.x);
        e.x += Math.cos(pushA) * 60;
        e.y += Math.sin(pushA) * 60;
      }
    }

    // Particles
    const pCount = this.isAwakened ? 25 : 12;
    for (let i = 0; i < pCount; i++) {
      game.particles.push(new Particle(this.x, this.y, this.isAwakened ? '#facc15' : '#f97316', 5, 4, 0.7));
    }

    // 🌟 THỨC TỈNH: Phân tách thành 4 mìn con nổ chùm dây chuyền!
    if (this.isAwakened && !this.isCluster) {
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const subDist = 75;
        const subX = this.x + Math.cos(a) * subDist;
        const subY = this.y + Math.sin(a) * subDist;
        const subBomb = new SpaceBomb(subX, subY, this.damage * 0.65, radius * 0.75, false);
        subBomb.isCluster = true;
        subBomb.life = 0.35 + Math.random() * 0.25;
        game.weaponManager.spaceBombs.push(subBomb);
      }
    }
  }

  draw(ctx) {
    ctx.save();
    const glow = Math.sin(this.pulse) * 0.3 + 0.7;
    ctx.fillStyle = this.isAwakened ? `rgba(234, 179, 8, ${glow})` : `rgba(249, 115, 22, ${glow})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
    ctx.stroke();

    // 4 spikes
    ctx.strokeStyle = this.isAwakened ? '#fde047' : '#fdba74';
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + this.pulse;
      ctx.beginPath();
      ctx.moveTo(this.x + Math.cos(a) * this.radius, this.y + Math.sin(a) * this.radius);
      ctx.lineTo(this.x + Math.cos(a) * (this.radius + 6), this.y + Math.sin(a) * (this.radius + 6));
      ctx.stroke();
    }
    ctx.restore();
  }
}

export class LaserBeamVisual {
  constructor(x1, y1, x2, y2, width, color = '#f43f5e', isAwakened = false) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.width = width;
    this.color = color;
    this.isAwakened = isAwakened;
    this.life = isAwakened ? 0.38 : 0.22;
    this.maxLife = this.life;
    this.isDead = false;
  }

  update(dt) {
    this.life -= dt;
    if (this.life <= 0) this.isDead = true;
  }

  draw(ctx) {
    ctx.save();
    const alpha = Math.max(0, this.life / this.maxLife);

    // Outer beam halo
    ctx.strokeStyle = this.isAwakened ? `rgba(251, 191, 36, ${alpha * 0.45})` : `rgba(244, 63, 94, ${alpha * 0.4})`;
    ctx.lineWidth = this.width * 2.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();

    // Main beam core
    ctx.strokeStyle = this.isAwakened ? `rgba(250, 204, 21, ${alpha * 0.95})` : `rgba(244, 63, 94, ${alpha * 0.9})`;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();

    // White hot center
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = this.width * 0.35;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
    ctx.restore();
  }
}

