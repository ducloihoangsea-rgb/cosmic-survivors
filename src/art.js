// Procedural High-Definition Cyberpunk Vector Art & Animation Engine
// Renders ultra-crisp, high-fidelity glowing sprites with zero asset loading lag.

export class ArtEngine {
  constructor() {
    this.cache = new Map();
    this.initBattlefield();
  }

  // Draw Player Ship: Sleek Neon Fighter Drone with Animated Plasma Thruster
  drawPlayer(ctx, player, animTime) {
    const isFrenzy = player.game.isFrenzy;
    const invuln = player.invulnerableTimer > 0;
    const shipId = player.shipId || 'phantom';

    // Ship Palette Selection (3 Classes)
    let shipMain = '#ef4444';
    let shipAccent = '#f97316';
    let shipGlow = '#dc2626';

    if (shipId === 'serpent') {
      shipMain = '#10b981';
      shipAccent = '#34d399';
      shipGlow = '#059669';
    } else if (shipId === 'novashield') {
      shipMain = '#00f2fe';
      shipAccent = '#38bdf8';
      shipGlow = '#0284c7';
    }

    const mainColor = isFrenzy ? '#f43f5e' : shipMain;
    const accentColor = isFrenzy ? '#fbbf24' : shipAccent;
    const glowColor = isFrenzy ? '#ec4899' : shipGlow;

    // 0. Draw Serpent Trailing Segments in World Space
    if (player.segmentPositions && player.segmentPositions.length > 0) {
      for (let i = player.segmentPositions.length - 1; i >= 0; i--) {
        const seg = player.segmentPositions[i];
        ctx.save();
        ctx.fillStyle = '#064e3b';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, seg.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner glowing dragon scale / energy core
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, seg.radius * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.facingAngle);

    // 1. Animated Plasma Thruster Flame
    const flameFlicker = Math.sin(animTime * 25) * 4;
    const flameLen = (isFrenzy ? 26 : 18) + flameFlicker;
    const gradFlame = ctx.createLinearGradient(-12, 0, -12 - flameLen, 0);
    gradFlame.addColorStop(0, '#ffffff');
    gradFlame.addColorStop(0.3, accentColor);
    gradFlame.addColorStop(1, 'transparent');

    ctx.fillStyle = gradFlame;
    ctx.beginPath();
    ctx.moveTo(-10, -5);
    ctx.lineTo(-12 - flameLen, 0);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fill();

    // 2. Twin Side Thrusters
    [-8, 8].forEach(yOffset => {
      ctx.beginPath();
      ctx.moveTo(-8, yOffset - 2);
      ctx.lineTo(-16 - flameFlicker * 0.5, yOffset);
      ctx.lineTo(-8, yOffset + 2);
      ctx.closePath();
      ctx.fill();
    });

    // 3. Energy Shield / Magnet Aura Ring (Subtle Cyberpunk HUD, ingame only)
    if (!player.isPreview && player.magnetRadius > 0) {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isFrenzy ? 'rgba(244, 63, 94, 0.25)' : 'rgba(0, 242, 254, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, player.magnetRadius, animTime, animTime + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Wing Gradient
    const hullGrad = ctx.createLinearGradient(-16, 0, 24, 0);
    hullGrad.addColorStop(0, '#090d16');
    hullGrad.addColorStop(0.5, '#1e293b');
    hullGrad.addColorStop(1, invuln ? '#ffffff' : '#334155');

    ctx.fillStyle = hullGrad;
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 2.4;

    if (shipId === 'rammer') {
      // ☄️ RAMMER: Heavy Meteor Battering Ram Wedge with Magma Spikes
      ctx.beginPath();
      ctx.moveTo(28, 0);          // Heavy front ramming beak
      ctx.lineTo(16, -14);        // Angled deflector armor
      ctx.lineTo(4, -20);         // Left shoulder plate
      ctx.lineTo(-12, -22);       // Heavy flank armor
      ctx.lineTo(-16, -12);       // Rear thruster fin
      ctx.lineTo(-12, 0);         // Main combustion exhaust
      ctx.lineTo(-16, 12);        // Right thruster fin
      ctx.lineTo(-12, 22);        // Right flank armor
      ctx.lineTo(4, 20);          // Right shoulder plate
      ctx.lineTo(16, 14);         // Angled deflector armor
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Molten Reinforced Ram Spikes
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(14, -8);
      ctx.lineTo(28, -4);
      ctx.moveTo(14, 8);
      ctx.lineTo(28, 4);
      ctx.stroke();

      // Armor plating lines
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(8, -14);
      ctx.lineTo(-8, -14);
      ctx.moveTo(8, 14);
      ctx.lineTo(-8, 14);
      ctx.stroke();

    } else if (shipId === 'serpent') {
      // 🐉 SERPENT: Articulated Emerald Dragon Head with mandibles
      ctx.beginPath();
      ctx.moveTo(26, 0);          // Dragon snout
      ctx.lineTo(16, -7);
      ctx.lineTo(22, -16);        // Left forward mandible horn
      ctx.lineTo(8, -18);         // Left temple crest
      ctx.lineTo(-6, -16);        // Dorsal spine
      ctx.lineTo(-14, -8);        // Neck joint
      ctx.lineTo(-10, 0);
      ctx.lineTo(-14, 8);         // Neck joint
      ctx.lineTo(-6, 16);         // Dorsal spine
      ctx.lineTo(8, 18);          // Right temple crest
      ctx.lineTo(22, 16);         // Right forward mandible horn
      ctx.lineTo(16, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Dragon Eyes
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(8, -6, 2.2, 0, Math.PI * 2);
      ctx.arc(8, 6, 2.2, 0, Math.PI * 2);
      ctx.fill();

    } else if (shipId === 'carrier') {
      // 🛸 CARRIER: Futuristic Drone Mothership with Hangar Bays & Launch Bays
      ctx.beginPath();
      ctx.moveTo(26, 0);          // Forward sensor nose
      ctx.lineTo(16, -10);
      ctx.lineTo(18, -24);        // Left forward drone flight deck
      ctx.lineTo(-4, -26);        // Left wing flank
      ctx.lineTo(-14, -18);       // Left thruster bay
      ctx.lineTo(-10, -6);
      ctx.lineTo(-14, 0);         // Central engine exhaust
      ctx.lineTo(-10, 6);
      ctx.lineTo(-14, 18);        // Right thruster bay
      ctx.lineTo(-4, 26);         // Right wing flank
      ctx.lineTo(18, 24);         // Right forward drone flight deck
      ctx.lineTo(16, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Dual Flight Launch Decks (Hangar Doors)
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(12, -18);
      ctx.lineTo(-2, -18);
      ctx.moveTo(12, 18);
      ctx.lineTo(-2, 18);
      ctx.stroke();

      // Drone Launch Beacon Lights (Nhấp nháy xanh ngọc)
      const beaconColor = Math.sin(animTime * 12) > 0 ? '#38bdf8' : '#a855f7';
      ctx.fillStyle = beaconColor;
      ctx.beginPath();
      ctx.arc(8, -18, 2.5, 0, Math.PI * 2);
      ctx.arc(8, 18, 2.5, 0, Math.PI * 2);
      ctx.fill();

    } else {
      // 🛡️ NOVA SHIELD: Circular High-Tech Barrier Emitter Hull
      ctx.beginPath();
      ctx.moveTo(22, 0);          // Forward sensor prow
      ctx.lineTo(14, -12);
      ctx.lineTo(2, -22);         // Left barrier projector
      ctx.lineTo(-12, -20);
      ctx.lineTo(-16, -10);
      ctx.lineTo(-12, 0);         // Engine core
      ctx.lineTo(-16, 10);
      ctx.lineTo(-12, 20);
      ctx.lineTo(2, 22);          // Right barrier projector
      ctx.lineTo(14, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Reactor Emitter Ring
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Energy Barrier Bubble (When Active)
      const hasShield = (player.shieldHp === undefined || player.shieldHp > 0);
      if (hasShield) {
        const barrierPulse = Math.sin(animTime * 8) * (player.isPreview ? 1.5 : 3);
        const barrierRad = (player.radius + (player.isPreview ? 8 : 14) + barrierPulse) * (player.stats?.shieldRadiusMult || 1.0);
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = player.isPreview ? 2.0 : 2.6;
        ctx.beginPath();
        ctx.arc(0, 0, barrierRad, animTime * 2.5, animTime * 2.5 + Math.PI * 1.4);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, barrierRad, animTime * 2.5 + Math.PI, animTime * 2.5 + Math.PI * 2.4);
        ctx.stroke();
      }
    }

    // Cockpit / Cyber Reactor Core
    const coreGrad = ctx.createRadialGradient(4, 0, 1, 4, 0, 7);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.5, mainColor);
    coreGrad.addColorStop(1, glowColor);

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.ellipse(3, 0, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Visor specular shine
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(5, -1, 1.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.ellipse(3, 0, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Visor specular shine
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(5, -1, 1.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Draw Animated Ship Preview for Selection Menu
  drawShipPreview(canvas, shipId, animTime) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Subtle breathing hover motion
    const hoverY = Math.sin(animTime * 3) * 2;
    ctx.translate(0, hoverY);
    ctx.rotate(-Math.PI / 2); // Point ship upwards on preview card

    // Safety scale to keep all glows, thrusters and segments inside canvas without clipping edges
    ctx.scale(0.80, 0.80);

    const mockPlayer = {
      x: 0,
      y: 0,
      facingAngle: 0,
      shipId: shipId,
      magnetRadius: 0,
      isPreview: true,
      radius: 14,
      invulnerableTimer: 0,
      shieldHp: shipId === 'novashield' ? 100 : 0,
      isNovaShield: shipId === 'novashield',
      segmentPositions: shipId === 'serpent' ? [
        { x: -10, y: Math.sin(animTime * 4) * 2.2, radius: 8 },
        { x: -19, y: Math.sin(animTime * 4 + 1) * 2.8, radius: 6.5 },
        { x: -27, y: Math.sin(animTime * 4 + 2) * 3.2, radius: 5 }
      ] : null,
      game: { isFrenzy: false }
    };

    this.drawPlayer(ctx, mockPlayer, animTime);
    ctx.restore();
  }

  // Draw Enemies with unique, intimidating designs
  drawEnemy(ctx, enemy, animTime) {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);

    const isHit = enemy.hitFlash > 0;
    const t = animTime * 6;

    if (enemy.type === 'crawler') {
      // Bio-Cybernetic Swarm Spider / Beetle
      this.drawCrawler(ctx, enemy, t, isHit);
    } else if (enemy.type === 'speeder') {
      // Neon Stalker Wasp / Jet
      this.drawSpeeder(ctx, enemy, t, isHit);
    } else if (enemy.type === 'brute') {
      // Armored Heavy Mech Titan
      this.drawBrute(ctx, enemy, t, isHit);
    } else if (enemy.type === 'swarmer') {
      this.drawSwarmer(ctx, enemy, t, isHit);
    } else if (enemy.type === 'shooter') {
      this.drawShooter(ctx, enemy, t, isHit);
    } else if (enemy.type === 'bomber') {
      this.drawBomber(ctx, enemy, t, isHit);
    } else if (enemy.type === 'elite_void' || enemy.type === 'elite_behemoth' || enemy.type === 'elite_harbinger' || enemy.isElite) {
      this.drawElite(ctx, enemy, animTime, isHit);
    } else if (enemy.type === 'boss') {
      // Doomsday Dreadnought Boss
      this.drawBoss(ctx, enemy, animTime, isHit);
    } else {
      this.drawCrawler(ctx, enemy, t, isHit);
    }

    // Frost Stasis Visual Ring
    if (enemy.freezeTimer > 0) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, enemy.radius + 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fill();
    }

    // Health Bar for Tanky/Boss enemies
    if (enemy.isBoss || (enemy.maxHp > 60 && enemy.hp < enemy.maxHp)) {
      const barW = Math.max(34, enemy.radius * 2.4);
      const barH = enemy.isBoss ? 7 : 4;
      const pct = Math.max(0, enemy.hp / enemy.maxHp);
      const barY = -enemy.radius - 14;

      // Dark border frame
      ctx.fillStyle = 'rgba(3, 7, 18, 0.85)';
      ctx.fillRect(-barW / 2 - 1, barY - 1, barW + 2, barH + 2);

      // HP bar gradient
      const hpGrad = ctx.createLinearGradient(-barW / 2, 0, barW / 2, 0);
      if (enemy.isBoss) {
        hpGrad.addColorStop(0, '#f59e0b');
        hpGrad.addColorStop(1, '#ef4444');
      } else {
        hpGrad.addColorStop(0, '#22c55e');
        hpGrad.addColorStop(1, '#10b981');
      }

      ctx.fillStyle = hpGrad;
      ctx.fillRect(-barW / 2, barY, barW * pct, barH);
    }

    ctx.restore();
  }

  // 1. Crawler (Arachnid Cyber Swarm)
  drawCrawler(ctx, enemy, t, isHit) {
    const color = isHit ? '#ffffff' : '#ef4444';
    const darkColor = isHit ? '#e2e8f0' : '#450a0a';

    // 4 Animated skittering legs
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 4; i++) {
      const side = i < 2 ? -1 : 1;
      const legPhase = t + i * 1.5;
      const legOffset = Math.sin(legPhase) * 5;
      const legBaseY = (i % 2 === 0 ? -4 : 4);

      ctx.beginPath();
      ctx.moveTo(side * 5, legBaseY);
      ctx.lineTo(side * 14, legBaseY + legOffset);
      ctx.lineTo(side * 18, legBaseY + legOffset * 1.6 + 6);
      ctx.stroke();
    }

    // Carapace shell
    ctx.fillStyle = darkColor;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Glowing Bio-Core / Eye
    ctx.fillStyle = isHit ? '#ffffff' : '#f87171';
    ctx.beginPath();
    ctx.arc(2, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Speeder (Neon Phantom Mantis / Jet)
  drawSpeeder(ctx, enemy, t, isHit) {
    const color = isHit ? '#ffffff' : '#d946ef';

    // Animated Fluttering Wings
    const wingSwing = Math.sin(t * 2) * 0.3;
    ctx.fillStyle = isHit ? '#ffffff' : 'rgba(217, 70, 239, 0.45)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    // Left Wing
    ctx.save();
    ctx.rotate(wingSwing);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-14, -14);
    ctx.lineTo(-3, -4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Right Wing
    ctx.save();
    ctx.rotate(-wingSwing);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-14, 14);
    ctx.lineTo(-3, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Central Needle Body
    ctx.fillStyle = isHit ? '#ffffff' : '#701a75';
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(-8, -4);
    ctx.lineTo(-12, 0);
    ctx.lineTo(-8, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Plasma stinger
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(11, 0, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Brute (Armored Hex Goliath)
  drawBrute(ctx, enemy, t, isHit) {
    const color = isHit ? '#ffffff' : '#06b6d4';

    // Outer Armored Hexagon
    ctx.fillStyle = isHit ? '#f1f5f9' : '#083344';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * 20;
      const y = Math.sin(angle) * 20;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner Pulsing Core
    const pulse = 1 + Math.sin(t * 0.8) * 0.15;
    ctx.fillStyle = isHit ? '#ffffff' : '#22d3ee';
    ctx.beginPath();
    ctx.arc(0, 0, 8 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Exhaust ports
    ctx.fillStyle = '#ffffff';
    [-8, 8].forEach(py => {
      ctx.fillRect(-16, py - 1.5, 3, 3);
    });
  }

  // 4. Boss (Doomsday Cyber Leviathan)
  drawBoss(ctx, enemy, animTime, isHit) {
    const mainColor = isHit ? '#ffffff' : '#f59e0b';
    const coreColor = isHit ? '#ffffff' : '#ef4444';

    // Rotating Outer Ring with 4 Energy Blades
    const ringAngle = animTime * 1.5;
    ctx.save();
    ctx.rotate(ringAngle);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 38, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const bx = Math.cos(a) * 38;
      const by = Math.sin(a) * 38;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Main Heavy Armored Octagon Core
    ctx.fillStyle = isHit ? '#ffffff' : '#1c1917';
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x = Math.cos(angle) * 32;
      const y = Math.sin(angle) * 32;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Hyper-Pulse Eye in center
    const eyePulse = 14 + Math.sin(animTime * 6) * 3;
    const eyeGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, eyePulse);
    eyeGrad.addColorStop(0, '#ffffff');
    eyeGrad.addColorStop(0.4, '#fbbf24');
    eyeGrad.addColorStop(1, coreColor);

    ctx.fillStyle = eyeGrad;
    ctx.beginPath();
    ctx.arc(0, 0, eyePulse, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Swarmer (Fast Nano Dart Mite)
  drawSwarmer(ctx, enemy, t, isHit) {
    const color = isHit ? '#ffffff' : '#ec4899';
    ctx.fillStyle = isHit ? '#ffffff' : '#831843';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    // Small sharp dart shape
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-6, -6);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Red eye
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(2, 0, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 6. Shooter (Sniper Gunner Pod)
  drawShooter(ctx, enemy, t, isHit) {
    const color = isHit ? '#ffffff' : '#10b981';
    ctx.fillStyle = isHit ? '#ffffff' : '#064e3b';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;

    // Heavy sniper pod with railgun nozzle
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(4, -3);
    ctx.lineTo(-8, -10);
    ctx.lineTo(-12, 0);
    ctx.lineTo(-8, 10);
    ctx.lineTo(4, 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Capacitor energy core
    const pulse = 2.5 + Math.sin(t * 1.5) * 1;
    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.arc(-2, 0, pulse, 0, Math.PI * 2);
    ctx.fill();
  }

  // 7. Bomber (Volatile Spiked Naval Mine)
  drawBomber(ctx, enemy, t, isHit) {
    const color = isHit ? '#ffffff' : '#f97316';
    const dark = isHit ? '#ffffff' : '#7c2d12';
    ctx.fillStyle = dark;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.0;

    const r = enemy.radius || 15;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.75, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Protruding detonator spikes
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.0;
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3 + t * 0.2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.7);
      ctx.lineTo(Math.cos(a) * (r + 4), Math.sin(a) * (r + 4));
      ctx.stroke();
    }

    // Flashing danger beacon
    const flash = Math.sin(t * 4) > 0 ? '#ef4444' : '#fbbf24';
    ctx.fillStyle = flash;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // 8. Elite Hostiles (Void, Behemoth, Harbinger with Royal Crown & Energy Halo)
  drawElite(ctx, enemy, animTime, isHit) {
    let mainColor = '#a855f7'; // Void
    let coreColor = '#c084fc';
    if (enemy.type === 'elite_behemoth') {
      mainColor = '#ea580c'; // Magma
      coreColor = '#f97316';
    } else if (enemy.type === 'elite_harbinger') {
      mainColor = '#06b6d4'; // Cosmic
      coreColor = '#22d3ee';
    }
    if (isHit) {
      mainColor = '#ffffff';
      coreColor = '#ffffff';
    }

    const r = enemy.radius || 30;

    // Rotating Energy Wings
    ctx.save();
    ctx.rotate(animTime * 1.8);
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 2.2;
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, r + 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Main Diamond Armored Chassis
    ctx.fillStyle = isHit ? '#ffffff' : '#0f172a';
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 3.0;

    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(0, -r);
    ctx.lineTo(-r, 0);
    ctx.lineTo(0, r);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Central pulsing Eye
    const eyeSize = (r * 0.35) + Math.sin(animTime * 5) * 2;
    ctx.fillStyle = coreColor;
    ctx.beginPath();
    ctx.arc(0, 0, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    // Royal Elite Crown on head
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.2;
    const cy = -r - 6;
    ctx.beginPath();
    ctx.moveTo(-11, cy);
    ctx.lineTo(-9, cy - 12);
    ctx.lineTo(-3, cy - 6);
    ctx.lineTo(0, cy - 14);
    ctx.lineTo(3, cy - 6);
    ctx.lineTo(9, cy - 12);
    ctx.lineTo(11, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Draw 3D-Faceted Gem with Specular Shimmer
  drawGem(ctx, gem, animTime) {
    ctx.save();
    ctx.translate(gem.x, gem.y);

    const r = gem.radius;
    const color = gem.color;

    // 8-Faceted Cut Diamond Gem
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.7, -r * 0.7);
    ctx.lineTo(r, 0);
    ctx.lineTo(r * 0.7, r * 0.7);
    ctx.lineTo(0, r);
    ctx.lineTo(-r * 0.7, r * 0.7);
    ctx.lineTo(-r, 0);
    ctx.lineTo(-r * 0.7, -r * 0.7);
    ctx.closePath();
    ctx.fill();

    // Specular inner faceted triangular reflections
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.7, -r * 0.7);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(-r * 0.7, -r * 0.7);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();

    // Star sparkle glint that rotates
    const glintPhase = (animTime * 3 + gem.sparkleTimer) % (Math.PI * 2);
    if (Math.sin(glintPhase) > 0.7) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-r * 0.2, -r * 0.2, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // ==========================================
  // DYNAMIC BATTLEFIELD BACKGROUND ENGINE (SECTOR I, II, III)
  // ==========================================

  initBattlefield() {
    // 1. Parallax Starfield (Layer 1: distant micro stars, Layer 2: bright colored stars)
    this.bgStars = [];
    for (let i = 0; i < 90; i++) {
      this.bgStars.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.6 + Math.random() * 1.2,
        alpha: 0.3 + Math.random() * 0.5,
        twinkleSpeed: 1.5 + Math.random() * 3.0,
        phase: Math.random() * Math.PI * 2,
        parallax: 0.07
      });
    }
    for (let i = 0; i < 40; i++) {
      this.bgStars.push({
        x: Math.random(),
        y: Math.random(),
        r: 1.4 + Math.random() * 1.6,
        alpha: 0.6 + Math.random() * 0.4,
        twinkleSpeed: 2.0 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        color: ['#ffffff', '#38bdf8', '#c084fc', '#fde047', '#f43f5e'][i % 5],
        parallax: 0.16
      });
    }

    // 2. Cyber Constellations (Sector 1: Deep Galaxy)
    this.constellations = [
      {
        name: 'Serpentis',
        stars: [
          { x: 0.15, y: 0.22 }, { x: 0.22, y: 0.18 }, { x: 0.28, y: 0.26 },
          { x: 0.33, y: 0.21 }, { x: 0.38, y: 0.29 }, { x: 0.44, y: 0.24 }
        ],
        edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
        color: '#38bdf8'
      },
      {
        name: 'Phoenix',
        stars: [
          { x: 0.62, y: 0.25 }, { x: 0.68, y: 0.18 }, { x: 0.74, y: 0.25 },
          { x: 0.68, y: 0.32 }, { x: 0.68, y: 0.42 }, { x: 0.60, y: 0.36 }, { x: 0.76, y: 0.36 }
        ],
        edges: [[0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [0, 5], [2, 6]],
        color: '#c084fc'
      },
      {
        name: 'Aegis',
        stars: [
          { x: 0.25, y: 0.68 }, { x: 0.32, y: 0.60 }, { x: 0.39, y: 0.68 },
          { x: 0.36, y: 0.78 }, { x: 0.28, y: 0.78 }
        ],
        edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
        color: '#38bdf8'
      },
      {
        name: 'Nova',
        stars: [
          { x: 0.75, y: 0.70 }, { x: 0.82, y: 0.62 }, { x: 0.89, y: 0.70 }, { x: 0.82, y: 0.78 }
        ],
        edges: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3]],
        color: '#fde047'
      }
    ];

    // 3. Floating Asteroid Belt (Sector 2: Planetary Warzone)
    this.asteroids = [];
    for (let i = 0; i < 14; i++) {
      const sides = 6 + Math.floor(Math.random() * 4);
      const points = [];
      const baseR = 12 + Math.random() * 20;
      for (let s = 0; s < sides; s++) {
        const ang = (s / sides) * Math.PI * 2;
        const rad = baseR * (0.72 + Math.random() * 0.56);
        points.push({ x: Math.cos(ang) * rad, y: Math.sin(ang) * rad });
      }
      this.asteroids.push({
        x: Math.random(),
        y: Math.random(),
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.4,
        points,
        parallax: 0.12 + Math.random() * 0.08,
        color: ['#475569', '#334155', '#64748b', '#78350f'][i % 4]
      });
    }

    // 4. Background Flak Explosions (Sector 2: Warzone & Sector 3: Solar flares)
    this.flakExplosions = [
      { x: 0.24, y: 0.28, period: 2.8, offset: 0.0, maxR: 44, color: '#f97316' },
      { x: 0.72, y: 0.22, period: 3.4, offset: 1.1, maxR: 56, color: '#fb923c' },
      { x: 0.38, y: 0.65, period: 2.5, offset: 1.8, maxR: 40, color: '#ea580c' },
      { x: 0.86, y: 0.56, period: 3.2, offset: 0.6, maxR: 50, color: '#facc15' },
      { x: 0.16, y: 0.74, period: 3.6, offset: 2.3, maxR: 52, color: '#ef4444' }
    ];
  }

  // Draw Dynamic Battlefield Background + Cyber Floor Grid
  drawArena(ctx, camera, width, height, animTime, isLight = false, currentSector = 1, warpTimer = 0) {
    if (!this.bgStars) {
      this.initBattlefield();
    }

    // Smooth transition weights for Sector 1, 2, 3
    let w1 = 0, w2 = 0, w3 = 0;
    const t = animTime;
    if (t < 180) {
      w1 = 1;
    } else if (t < 186) {
      const p = (t - 180) / 6;
      w1 = 1 - p;
      w2 = p;
    } else if (t < 420) {
      w2 = 1;
    } else if (t < 426) {
      const p = (t - 420) / 6;
      w2 = 1 - p;
      w3 = p;
    } else {
      w3 = 1;
    }

    // ==========================================
    // 1. DRAW PARALLAX BATTLEFIELD IN SCREEN SPACE
    // ==========================================
    ctx.save();
    // Temporarily cancel camera translation so we can render screen-space backdrop
    ctx.translate(camera.x, camera.y);

    // 1A. Sector Ambient Color Gradient Wash
    this.drawSectorAmbientWash(ctx, width, height, w1, w2, w3, isLight);

    // 1B. Parallax Stars & Hyperspace Warp Streaks
    this.drawParallaxStars(ctx, camera, width, height, animTime, warpTimer, isLight);

    // 1C. Sector 1: Deep Galaxy & Glowing Constellations
    if (w1 > 0.01) {
      this.drawSector1Galaxy(ctx, camera, width, height, animTime, w1, isLight);
    }

    // 1D. Sector 2: Planetary Warzone & Orbital Explosions
    if (w2 > 0.01) {
      this.drawSector2Warzone(ctx, camera, width, height, animTime, w2, isLight);
    }

    // 1E. Sector 3: Solar Corona Inferno & Black Hole Singularity
    if (w3 > 0.01) {
      this.drawSector3SolarSingularity(ctx, camera, width, height, animTime, w3, isLight);
    }

    // 1F. Hyperspace Warp Jump Flash
    if (warpTimer > 0) {
      const flashAlpha = Math.sin((warpTimer / 2.2) * Math.PI) * 0.28;
      ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();

    // ==========================================
    // 2. DRAW DYNAMIC CYBER GRID IN WORLD SPACE
    // ==========================================
    this.drawSectorCyberGrid(ctx, camera, width, height, animTime, isLight, w1, w2, w3);
  }

  // Sector Ambient Gradient Wash
  drawSectorAmbientWash(ctx, width, height, w1, w2, w3, isLight) {
    if (isLight) return; // Keep crisp in light mode

    // Sector 1: Deep Cosmic Violet / Midnight Blue
    if (w1 > 0.01) {
      ctx.save();
      ctx.globalAlpha = w1 * 0.45;
      const g1 = ctx.createRadialGradient(width * 0.4, height * 0.4, 60, width * 0.5, height * 0.5, Math.max(width, height) * 0.85);
      g1.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      g1.addColorStop(0.5, 'rgba(46, 16, 101, 0.20)');
      g1.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    // Sector 2: Fiery Amber / Smoky Warzone Dust
    if (w2 > 0.01) {
      ctx.save();
      ctx.globalAlpha = w2 * 0.48;
      const g2 = ctx.createRadialGradient(width * 0.7, height * 0.35, 80, width * 0.6, height * 0.5, Math.max(width, height) * 0.85);
      g2.addColorStop(0, 'rgba(249, 115, 22, 0.22)');
      g2.addColorStop(0.5, 'rgba(124, 45, 18, 0.25)');
      g2.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    // Sector 3: Solar Corona Crimson & Singularity Void
    if (w3 > 0.01) {
      ctx.save();
      ctx.globalAlpha = w3 * 0.55;
      const g3 = ctx.createRadialGradient(width * 0.15, height * 0.85, 100, width * 0.5, height * 0.5, Math.max(width, height) * 0.95);
      g3.addColorStop(0, 'rgba(239, 68, 68, 0.28)');
      g3.addColorStop(0.4, 'rgba(69, 10, 10, 0.30)');
      g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }

  // Parallax Stars with Hyperspace Warp Speed Streaks
  drawParallaxStars(ctx, camera, width, height, animTime, warpTimer, isLight) {
    const isWarp = warpTimer > 0;
    const cx = width / 2;
    const cy = height / 2;
    const warpRatio = isWarp ? warpTimer / 2.2 : 0;
    const streakMult = warpRatio * 65 + 10;

    for (let i = 0; i < this.bgStars.length; i++) {
      const s = this.bgStars[i];
      const sx = ((s.x * width - camera.x * s.parallax) % width + width) % width;
      const sy = ((s.y * height - camera.y * s.parallax) % height + height) % height;

      if (isWarp) {
        // Hyperspace Streaks radiating outward from screen center
        const dx = sx - cx;
        const dy = sy - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const dirX = dx / dist;
        const dirY = dy / dist;

        ctx.strokeStyle = s.color || '#38bdf8';
        ctx.lineWidth = Math.max(1, s.r * (1 + warpRatio * 0.8));
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + dirX * streakMult, sy + dirY * streakMult);
        ctx.stroke();
      } else {
        // Normal Twinkling Star
        const twinkle = 0.65 + 0.35 * Math.sin(animTime * s.twinkleSpeed + s.phase);
        ctx.fillStyle = s.color || (isLight ? 'rgba(2, 132, 199, 0.45)' : `rgba(255, 255, 255, ${s.alpha * twinkle})`);
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Sector 1: Deep Galaxy & Glowing Constellations
  drawSector1Galaxy(ctx, camera, width, height, animTime, weight, isLight) {
    ctx.save();
    ctx.globalAlpha = weight;

    // Distant Spiral Galaxy Center Glow
    const gx = ((width * 0.5 - camera.x * 0.03) % width + width) % width;
    const gy = ((height * 0.35 - camera.y * 0.03) % height + height) % height;
    const galGrad = ctx.createRadialGradient(gx, gy, 15, gx, gy, 190);
    galGrad.addColorStop(0, 'rgba(56, 189, 248, 0.20)');
    galGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.12)');
    galGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = galGrad;
    ctx.beginPath();
    ctx.arc(gx, gy, 190, 0, Math.PI * 2);
    ctx.fill();

    // Render Constellations with Cyber Connecting Lines
    const constParallax = 0.10;
    for (const c of this.constellations) {
      const screenStars = c.stars.map(st => ({
        x: ((st.x * width - camera.x * constParallax) % width + width) % width,
        y: ((st.y * height - camera.y * constParallax) % height + height) % height
      }));

      // Connecting Constellation Lines
      ctx.strokeStyle = isLight ? 'rgba(14, 165, 233, 0.22)' : 'rgba(56, 189, 248, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (const edge of c.edges) {
        const p1 = screenStars[edge[0]];
        const p2 = screenStars[edge[1]];
        // Only draw if not wrapped across screen border
        if (Math.hypot(p2.x - p1.x, p2.y - p1.y) < width * 0.4) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling Energy Pulse along Constellation Edges
      const pulseT = (animTime * 0.5) % 1.0;
      for (const edge of c.edges) {
        const p1 = screenStars[edge[0]];
        const p2 = screenStars[edge[1]];
        if (Math.hypot(p2.x - p1.x, p2.y - p1.y) < width * 0.4) {
          const px = p1.x + (p2.x - p1.x) * pulseT;
          const py = p1.y + (p2.y - p1.y) * pulseT;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Constellation Star Nodes
      for (const st of screenStars) {
        const pulse = 0.75 + 0.25 * Math.sin(animTime * 3.5 + st.x * 0.02);
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.arc(st.x, st.y, 2.5 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Outer halo
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(st.x, st.y, 5.5 * pulse, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Sector 2: Planetary Warzone & Orbital Explosions
  drawSector2Warzone(ctx, camera, width, height, animTime, weight, isLight) {
    ctx.save();
    ctx.globalAlpha = weight;

    // 1. Giant Ringed Volcanic Exoplanet (Far Parallax 0.035)
    const px = ((width * 0.76 - camera.x * 0.035) % (width * 1.5) + (width * 1.5)) % (width * 1.5) - width * 0.25;
    const py = ((height * 0.28 - camera.y * 0.035) % (height * 1.5) + (height * 1.5)) % (height * 1.5) - height * 0.25;
    const planetR = Math.min(105, width * 0.12);

    // Planet atmosphere backlight halo
    const haloGrad = ctx.createRadialGradient(px, py, planetR * 0.8, px, py, planetR * 1.45);
    haloGrad.addColorStop(0, 'rgba(249, 115, 22, 0.35)');
    haloGrad.addColorStop(0.6, 'rgba(194, 65, 12, 0.15)');
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(px, py, planetR * 1.45, 0, Math.PI * 2);
    ctx.fill();

    // Back half of planetary ring
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-0.38);
    ctx.beginPath();
    ctx.ellipse(0, 0, planetR * 2.1, planetR * 0.42, 0, Math.PI, Math.PI * 2);
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.45)';
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.restore();

    // Volcanic Planet Sphere
    const pGrad = ctx.createRadialGradient(px - planetR * 0.35, py - planetR * 0.35, planetR * 0.1, px, py, planetR);
    pGrad.addColorStop(0, '#f97316');
    pGrad.addColorStop(0.35, '#c2410c');
    pGrad.addColorStop(0.75, '#431407');
    pGrad.addColorStop(1, '#180703');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(px, py, planetR, 0, Math.PI * 2);
    ctx.fill();

    // Fiery Magma Fissures on Planet Face
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, planetR, 0, Math.PI * 2);
    ctx.clip();
    ctx.strokeStyle = 'rgba(254, 215, 170, 0.7)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(px - planetR * 0.6, py - planetR * 0.1);
    ctx.quadraticCurveTo(px, py + planetR * 0.2, px + planetR * 0.5, py - planetR * 0.3);
    ctx.moveTo(px - planetR * 0.2, py + planetR * 0.1);
    ctx.lineTo(px + planetR * 0.3, py + planetR * 0.5);
    ctx.stroke();
    ctx.restore();

    // Front half of planetary ring
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-0.38);
    ctx.beginPath();
    ctx.ellipse(0, 0, planetR * 2.1, planetR * 0.42, 0, 0, Math.PI);
    ctx.strokeStyle = 'rgba(251, 146, 60, 0.65)';
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.restore();

    // Fractured Moonlet
    const mx = px - planetR * 1.5;
    const my = py + planetR * 0.9;
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(mx, my, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(mx - 3, my - 2, 4, 0, Math.PI * 2);
    ctx.fill();

    // 2. Floating Asteroid Belt
    for (const ast of this.asteroids) {
      const ax = ((ast.x * width - camera.x * ast.parallax) % width + width) % width;
      const ay = ((ast.y * height - camera.y * ast.parallax) % height + height) % height;
      const curRot = ast.rot + animTime * ast.rotSpeed;

      ctx.save();
      ctx.translate(ax, ay);
      ctx.rotate(curRot);
      ctx.fillStyle = ast.color;
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < ast.points.length; i++) {
        const pt = ast.points[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // 3. Distant Orbital Flak Explosions (Chiến trường với nhiều vụ nổ)
    for (const exp of this.flakExplosions) {
      const cycle = (animTime + exp.offset) % exp.period;
      if (cycle < 1.35) {
        const progress = cycle / 1.35;
        const fx = ((exp.x * width - camera.x * 0.15) % width + width) % width;
        const fy = ((exp.y * height - camera.y * 0.15) % height + height) % height;
        const curR = progress * exp.maxR;
        const fade = 1 - progress;

        // Expanding blast core
        const bGrad = ctx.createRadialGradient(fx, fy, 2, fx, fy, Math.max(3, curR));
        bGrad.addColorStop(0, `rgba(255, 255, 255, ${fade})`);
        bGrad.addColorStop(0.35, `rgba(251, 146, 60, ${fade * 0.85})`);
        bGrad.addColorStop(0.8, `rgba(239, 68, 68, ${fade * 0.5})`);
        bGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(fx, fy, Math.max(3, curR), 0, Math.PI * 2);
        ctx.fill();

        // Expanding shockwave ring
        ctx.strokeStyle = `rgba(254, 215, 170, ${fade * 0.8})`;
        ctx.lineWidth = Math.max(0.5, fade * 2.5);
        ctx.beginPath();
        ctx.arc(fx, fy, curR * 1.4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Sector 3: Solar Corona Inferno & Black Hole Singularity
  drawSector3SolarSingularity(ctx, camera, width, height, animTime, weight, isLight) {
    ctx.save();
    ctx.globalAlpha = weight;

    // 1. The Blazing Sun / Solar Corona (Bottom-Left Corner)
    const sx = ((width * 0.12 - camera.x * 0.025) % (width * 1.8) + (width * 1.8)) % (width * 1.8) - width * 0.4;
    const sy = ((height * 0.98 - camera.y * 0.025) % (height * 1.8) + (height * 1.8)) % (height * 1.8) - height * 0.4;
    const sunR = Math.min(270, width * 0.32);

    // Giant Solar Atmosphere Corona
    const sunGrad = ctx.createRadialGradient(sx, sy, sunR * 0.15, sx, sy, sunR * 1.55);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.3, '#fef08a');
    sunGrad.addColorStop(0.65, '#f97316');
    sunGrad.addColorStop(0.88, 'rgba(239, 68, 68, 0.4)');
    sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sx, sy, sunR * 1.55, 0, Math.PI * 2);
    ctx.fill();

    // Solar Prominence Arcs (Quầng lửa nhô ra ngoài không gian)
    for (let i = 0; i < 4; i++) {
      const baseAng = -0.8 + i * 0.5 + Math.sin(animTime * 1.5 + i) * 0.1;
      const arcDist = sunR * (1.18 + Math.sin(animTime * 2.8 + i * 2) * 0.15);
      const startX = sx + Math.cos(baseAng - 0.18) * sunR * 0.98;
      const startY = sy + Math.sin(baseAng - 0.18) * sunR * 0.98;
      const tipX = sx + Math.cos(baseAng) * arcDist;
      const tipY = sy + Math.sin(baseAng) * arcDist;
      const endX = sx + Math.cos(baseAng + 0.18) * sunR * 0.98;
      const endY = sy + Math.sin(baseAng + 0.18) * sunR * 0.98;

      ctx.strokeStyle = i % 2 === 0 ? '#fde047' : '#f97316';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(tipX, tipY, endX, endY);
      ctx.stroke();
    }

    // 2. Cosmic Black Hole (Singularity & Swirling Accretion Disk)
    const bx = ((width * 0.82 - camera.x * 0.04) % (width * 1.6) + (width * 1.6)) % (width * 1.6) - width * 0.3;
    const by = ((height * 0.32 - camera.y * 0.04) % (height * 1.6) + (height * 1.6)) % (height * 1.6) - height * 0.3;
    const holeR = Math.min(38, width * 0.05);

    // Gravitational Lensing Arc (Bẻ cong ánh sáng trên đỉnh hố đen)
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(-0.35);

    // Accretion Disk Upper Lensing Halo
    ctx.beginPath();
    ctx.arc(0, 0, holeR * 1.9, Math.PI * 0.9, Math.PI * 2.1);
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.7)';
    ctx.lineWidth = 7;
    ctx.stroke();

    // Swirling Relativistic Accretion Disk (Đĩa bồi tụ)
    ctx.beginPath();
    ctx.ellipse(0, 0, holeR * 2.9, holeR * 0.72, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.75)';
    ctx.lineWidth = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, 0, holeR * 2.5, holeR * 0.58, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.9)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Pitch Black Event Horizon (Chân trời sự kiện đen tuyệt đối)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(0, 0, holeR, 0, Math.PI * 2);
    ctx.fill();

    // Golden Photon Sphere Ring
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, holeR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // 3. Cataclysmic Supernova Explosions across Sector 3
    for (const exp of this.flakExplosions) {
      const cycle = (animTime * 1.2 + exp.offset * 1.5) % exp.period;
      if (cycle < 1.4) {
        const progress = cycle / 1.4;
        const fx = ((exp.x * width * 1.2 - camera.x * 0.18) % width + width) % width;
        const fy = ((exp.y * height * 1.2 - camera.y * 0.18) % height + height) % height;
        const curR = progress * exp.maxR * 1.6;
        const fade = 1 - progress;

        // White-hot core
        ctx.fillStyle = `rgba(255, 255, 255, ${fade * 0.9})`;
        ctx.beginPath();
        ctx.arc(fx, fy, curR * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Dual plasma shockwave rings
        ctx.strokeStyle = `rgba(250, 204, 21, ${fade * 0.85})`;
        ctx.lineWidth = Math.max(1, fade * 3.5);
        ctx.beginPath();
        ctx.arc(fx, fy, curR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(239, 68, 68, ${fade * 0.6})`;
        ctx.lineWidth = Math.max(0.5, fade * 2.0);
        ctx.beginPath();
        ctx.arc(fx, fy, curR * 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Draw Cyber Floor Grid with Sector-Blended Colors
  drawSectorCyberGrid(ctx, camera, width, height, animTime, isLight, w1, w2, w3) {
    const gridSize = 90;
    const startX = Math.floor(camera.x / gridSize) * gridSize;
    const startY = Math.floor(camera.y / gridSize) * gridSize;
    const endX = startX + width + gridSize * 2;
    const endY = startY + height + gridSize * 2;

    // Line RGB interpolation (Sector 1: 14, 165, 233 | Sector 2: 249, 115, 22 | Sector 3: 239, 68, 68)
    const lr = Math.round(14 * w1 + 249 * w2 + 239 * w3);
    const lg = Math.round(165 * w1 + 115 * w2 + 68 * w3);
    const lb = Math.round(233 * w1 + 22 * w2 + 68 * w3);
    const lAlpha = isLight ? 0.16 : 0.065;

    ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${lAlpha})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let x = startX; x <= endX; x += gridSize) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }
    for (let y = startY; y <= endY; y += gridSize) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }
    ctx.stroke();

    // Glowing Micro-Circuit Junction Points
    // Junction RGB interpolation (Sector 1: 0, 242, 254 | Sector 2: 251, 146, 60 | Sector 3: 250, 204, 21)
    const jr = Math.round(0 * w1 + 251 * w2 + 250 * w3);
    const jg = Math.round(242 * w1 + 146 * w2 + 204 * w3);
    const jb = Math.round(254 * w1 + 60 * w2 + 21 * w3);

    for (let x = startX; x <= endX; x += gridSize * 2) {
      for (let y = startY; y <= endY; y += gridSize * 2) {
        const pulse = Math.sin((x * 0.01 + y * 0.01) + animTime * 2);
        if (pulse > 0.4) {
          const pAlpha = (pulse - 0.4) * (isLight ? 0.48 : 0.38);
          ctx.fillStyle = `rgba(${jr}, ${jg}, ${jb}, ${pAlpha})`;
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
      }
    }
  }

  // Draw Autonomous Mini Drone (Tàu Carrier thả ra)
  drawMiniDrone(ctx, drone, animTime) {
    ctx.save();
    ctx.translate(drone.x, drone.y);
    ctx.rotate(drone.angle);

    // Thruster trail
    ctx.fillStyle = drone.isEvolved ? '#ef4444' : '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(-12, -3);
    ctx.lineTo(-9, 0);
    ctx.lineTo(-12, 3);
    ctx.closePath();
    ctx.fill();

    // Drone chassis
    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = drone.isEvolved ? '#facc15' : '#c084fc';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(-6, -8);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-6, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Drone Sensor Eye
    ctx.fillStyle = drone.isEvolved ? '#ef4444' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(3, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    // Mini Health Bar on top (Giữ ngang)
    ctx.rotate(-drone.angle);
    const barW = 20;
    const barH = 3;
    const hpPct = Math.max(0, Math.min(1, drone.hp / drone.maxHp));
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(-barW / 2, -14, barW, barH);
    ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : (hpPct > 0.25 ? '#eab308' : '#ef4444');
    ctx.fillRect(-barW / 2, -14, barW * hpPct, barH);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(-barW / 2, -14, barW, barH);

    ctx.restore();
  }
}

export const art = new ArtEngine();
