// Procedural High-Definition Cyberpunk Vector Art & Animation Engine
// Renders ultra-crisp, high-fidelity glowing sprites with zero asset loading lag.

export class ArtEngine {
  constructor() {
    this.cache = new Map();
  }

  // Draw Player Ship: Sleek Neon Fighter Drone with Animated Plasma Thruster
  drawPlayer(ctx, player, animTime) {
    const isFrenzy = player.game.isFrenzy;
    const invuln = player.invulnerableTimer > 0;
    const mainColor = isFrenzy ? '#f43f5e' : '#00f2fe';
    const accentColor = isFrenzy ? '#fbbf24' : '#38bdf8';
    const glowColor = isFrenzy ? '#ec4899' : '#00f2fe';

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
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 15;
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

    // 3. Energy Shield / Magnet Aura Ring (Subtle Cyberpunk HUD)
    ctx.shadowBlur = 0;
    ctx.strokeStyle = isFrenzy ? 'rgba(244, 63, 94, 0.25)' : 'rgba(0, 242, 254, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, player.magnetRadius, animTime, animTime + Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Main Hull - Swept Wings Fighter
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = invuln ? 25 : 14;

    // Wing Gradient
    const hullGrad = ctx.createLinearGradient(-15, 0, 20, 0);
    hullGrad.addColorStop(0, '#0f172a');
    hullGrad.addColorStop(0.6, '#1e293b');
    hullGrad.addColorStop(1, invuln ? '#ffffff' : '#334155');

    ctx.fillStyle = hullGrad;
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(22, 0);               // Nose tip
    ctx.lineTo(8, -8);                // Forward shoulder
    ctx.lineTo(-6, -20);              // Left wing tip
    ctx.lineTo(-10, -16);             // Left wing fin
    ctx.lineTo(-8, -6);               // Left inner engine
    ctx.lineTo(-14, 0);               // Rear center
    ctx.lineTo(-8, 6);                // Right inner engine
    ctx.lineTo(-10, 16);              // Right wing fin
    ctx.lineTo(-6, 20);               // Right wing tip
    ctx.lineTo(8, 8);                 // Right shoulder
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 5. Neon Edge Accents / Wing Panels
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-4, -16);
    ctx.lineTo(4, -7);
    ctx.moveTo(-4, 16);
    ctx.lineTo(4, 7);
    ctx.stroke();

    // 6. Cockpit / Cyber Core (Pulsing crystalline visor)
    const coreGrad = ctx.createRadialGradient(4, 0, 1, 4, 0, 7);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.5, mainColor);
    coreGrad.addColorStop(1, '#0284c7');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.ellipse(4, 0, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Visor specular shine
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(6, -1, 1.5, 0, Math.PI * 2);
    ctx.fill();

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
    } else if (enemy.type === 'boss') {
      // Doomsday Dreadnought Boss
      this.drawBoss(ctx, enemy, animTime, isHit);
    }

    // Frost Stasis Visual Ring
    if (enemy.freezeTimer > 0) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 12;
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
    ctx.shadowColor = isHit ? '#ffffff' : '#ef4444';
    ctx.shadowBlur = 8;

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
    ctx.shadowColor = isHit ? '#ffffff' : '#c026d3';
    ctx.shadowBlur = 10;

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
    ctx.shadowColor = isHit ? '#ffffff' : '#0891b2';
    ctx.shadowBlur = 12;

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
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 24;

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

  // Draw 3D-Faceted Gem with Specular Shimmer
  drawGem(ctx, gem, animTime) {
    ctx.save();
    ctx.translate(gem.x, gem.y);

    const r = gem.radius;
    const color = gem.color;
    ctx.shadowColor = gem.glow;
    ctx.shadowBlur = 10;

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
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(-r * 0.2, -r * 0.2, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Draw High-Tech Futuristic Cyber Floor Grid with Parallax Stars
  drawArena(ctx, camera, width, height, animTime) {
    const gridSize = 90;
    const startX = Math.floor(camera.x / gridSize) * gridSize;
    const startY = Math.floor(camera.y / gridSize) * gridSize;
    const endX = startX + width + gridSize * 2;
    const endY = startY + height + gridSize * 2;

    // Ambient Cyber Grid Lines
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.055)';
    ctx.lineWidth = 1.2;

    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    for (let y = startY; y <= endY; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }

    // Glowing Micro-Circuit Junction Points
    for (let x = startX; x <= endX; x += gridSize * 2) {
      for (let y = startY; y <= endY; y += gridSize * 2) {
        const pulse = Math.sin((x * 0.01 + y * 0.01) + animTime * 2);
        if (pulse > 0.4) {
          ctx.fillStyle = `rgba(0, 242, 254, ${(pulse - 0.4) * 0.35})`;
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
      }
    }
  }
}

export const art = new ArtEngine();
