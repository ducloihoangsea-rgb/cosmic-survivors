// Main Game Bootstrap, UI Wiring, Hangar Meta Tree, Slot Machine & Real-Time Damage Meter
import { Game } from './game.js';
import { UpgradeSystem } from './upgrades.js';
import { sound } from './audio.js';
import { i18n } from './i18n.js';
import { meta } from './meta.js';
import { art } from './art.js';
import { SHIP_ROSTER, SHIP_KEYS } from './ships.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const game = new Game(canvas);
  const upgradeSystem = new UpgradeSystem(game);

  // Modals
  const startScreen = document.getElementById('start-screen');
  const levelUpModal = document.getElementById('levelup-modal');
  const cardsContainer = document.getElementById('cards-container');
  const gameOverModal = document.getElementById('gameover-modal');
  const hordeAlert = document.getElementById('horde-alert');
  const hangarModal = document.getElementById('hangar-modal');
  const chestModal = document.getElementById('chest-modal');

  // Starship Selection Elements
  const shipSelectorBox = document.getElementById('ship-selector-box');
  const shipSelectTitle = document.getElementById('ship-select-title');
  const shipSelectSub = document.getElementById('ship-select-sub');

  // Real-Time Damage Meter Elements
  const meterToggleBtn = document.getElementById('meter-toggle-btn');
  const damageMeterPanel = document.getElementById('damage-meter-panel');
  const meterCloseBtn = document.getElementById('meter-close-btn');
  const meterTitle = document.getElementById('meter-title');
  const meterTotalLabel = document.getElementById('meter-total-label');
  const meterTotalVal = document.getElementById('meter-total-val');
  const meterSkillsList = document.getElementById('meter-skills-list');

  // Interactive Buttons
  const startBtn = document.getElementById('start-btn');
  const retryBtn = document.getElementById('retry-btn');
  const langBtnVi = document.getElementById('lang-btn-vi');
  const langBtnEn = document.getElementById('lang-btn-en');
  const hudLangBtn = document.getElementById('hud-lang-btn');
  const startHangarBtn = document.getElementById('start-hangar-btn');
  const overHangarBtn = document.getElementById('over-hangar-btn');
  const hangarCloseBtn = document.getElementById('hangar-close-btn');
  const chestClaimBtn = document.getElementById('chest-claim-btn');
  const btnUltimate = document.getElementById('btn-ultimate');
  const ultProgressCircle = document.getElementById('ult-progress-circle');

  // Translatable Labels
  const startTitle = document.getElementById('start-title');
  const startSub = document.getElementById('start-sub');
  const tipMobile = document.getElementById('tip-mobile');
  const tipPc = document.getElementById('tip-pc');
  const levelupTitle = document.getElementById('levelup-title');
  const levelupSub = document.getElementById('levelup-sub');
  const gameoverTitle = document.getElementById('gameover-title');
  const gameoverSub = document.getElementById('gameover-sub');
  const statLblSurvive = document.getElementById('stat-lbl-survive');
  const statLblKills = document.getElementById('stat-lbl-kills');
  const statLblScore = document.getElementById('stat-lbl-score');
  const statLblGold = document.getElementById('stat-lbl-gold');
  const hangarTitle = document.getElementById('hangar-title');
  const hangarSub = document.getElementById('hangar-sub');
  const chestTitle = document.getElementById('chest-title');
  const chestSub = document.getElementById('chest-sub');

  // HUD Elements
  const xpBar = document.getElementById('xp-bar');
  const hpBar = document.getElementById('hp-bar');
  const levelBadge = document.getElementById('level-badge');
  const timerDisplay = document.getElementById('timer-display');
  const killsDisplay = document.getElementById('kills-display');
  const dopamineBar = document.getElementById('dopamine-bar');
  const dopamineLabel = document.getElementById('dopamine-label');
  const comboBadge = document.getElementById('combo-badge');
  const comboText = document.getElementById('combo-text');

  // Stats Values
  const statSurvive = document.getElementById('stat-survive');
  const statKills = document.getElementById('stat-kills');
  const statScore = document.getElementById('stat-score');
  const statGold = document.getElementById('stat-gold');
  const hangarGoldVal = document.getElementById('hangar-gold-val');
  const hangarList = document.getElementById('hangar-list');

  // Slot Reels
  const reel1 = document.getElementById('reel-1');
  const reel2 = document.getElementById('reel-2');
  const reel3 = document.getElementById('reel-3');
  const chestResult = document.getElementById('chest-result');
  const chestCardsBox = document.getElementById('chest-cards-box');

  // Skill Catalog for Real-time Meter
  const skillCatalog = [
    { id: 'blaster', key: 'skill_blaster', icon: '⚡', color: '#00f2fe' },
    { id: 'orbs', key: 'skill_orbs', icon: '🪐', color: '#f43f5e' },
    { id: 'lightning', key: 'skill_lightning', icon: '🌩️', color: '#38bdf8' },
    { id: 'glaive', key: 'skill_glaive', icon: '🌀', color: '#a855f7' },
    { id: 'missiles', key: 'skill_missiles', icon: '🚀', color: '#f97316' },
    { id: 'wingmen', key: 'skill_wingmen', icon: '🛸', color: '#10b981' },
    { id: 'emp', key: 'skill_emp', icon: '⚡', color: '#facc15' },
    { id: 'nuke', key: 'skill_nuke', icon: '☢️', color: '#ef4444' },
    { id: 'blackhole', key: 'skill_blackhole', icon: '🕳️', color: '#ec4899' },
    { id: 'ram', key: 'skill_ram', icon: '🛡️', color: '#10b981' }
  ];

  function formatDmg(val) {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 10000) return (val / 1000).toFixed(1) + 'K';
    return val.toLocaleString();
  }

  // Refresh all text in the UI based on current language
  function applyLanguage(lang) {
    i18n.setLanguage(lang);

    startTitle.innerHTML = i18n.t('gameTitle');
    startSub.innerHTML = i18n.t('subTagline');
    startBtn.textContent = i18n.t('startBtn');
    startHangarBtn.textContent = i18n.t('hangarBtn');
    overHangarBtn.textContent = i18n.t('hangarBtn');
    tipMobile.textContent = i18n.t('tipMobile');
    tipPc.textContent = i18n.t('tipPc');

    hordeAlert.textContent = i18n.t('hordeAlert');
    levelupTitle.textContent = i18n.t('levelUpTitle');
    levelupSub.textContent = i18n.t('levelUpSubtitle');

    hangarTitle.textContent = i18n.t('hangarTitle');
    hangarSub.textContent = i18n.t('hangarSubtitle');
    hangarCloseBtn.textContent = i18n.t('closeBtn');

    chestTitle.textContent = i18n.t('chestTitle');
    chestClaimBtn.textContent = i18n.t('claimBtn');

    meterTitle.textContent = i18n.t('damageMeterTitle');
    meterTotalLabel.textContent = i18n.t('totalDamageLabel');

    gameoverTitle.textContent = i18n.t('gameOverTitle');
    gameoverSub.textContent = i18n.t('gameOverSubtitle');
    statLblSurvive.textContent = i18n.t('statSurvive');
    statLblKills.textContent = i18n.t('statKills');
    statLblScore.textContent = i18n.t('statScore');
    statLblGold.textContent = i18n.t('statGold');
    retryBtn.textContent = i18n.t('retryBtn');

    if (lang === 'vi') {
      langBtnVi.classList.add('active');
      langBtnEn.classList.remove('active');
      hudLangBtn.textContent = '🇻🇳 VI';
    } else {
      langBtnEn.classList.add('active');
      langBtnVi.classList.remove('active');
      hudLangBtn.textContent = '🇬🇧 EN';
    }

    if (shipSelectTitle) shipSelectTitle.textContent = i18n.t('shipSelectTitle');
    if (shipSelectSub) shipSelectSub.textContent = i18n.t('shipSelectSubtitle');

    renderShipSelector();
    renderHangar();
  }

  // Starship Selection Card Generator
  const shipPreviews = [];
  function renderShipSelector() {
    if (!shipSelectorBox) return;
    shipPreviews.length = 0;
    shipSelectorBox.innerHTML = '';

    SHIP_KEYS.forEach(key => {
      const ship = SHIP_ROSTER[key];
      const isSelected = game.selectedShipId === key;

      const card = document.createElement('div');
      card.className = `ship-card ${isSelected ? 'active' : ''}`;
      card.style.setProperty('--ship-color', ship.color);
      card.style.setProperty('--ship-accent', ship.accentColor);
      card.style.setProperty('--ship-glow', ship.glowColor);
      card.dataset.shipId = key;

      card.innerHTML = `
        <span class="ship-card-selected-tag">${i18n.t('shipSelectedBadge')}</span>
        <div class="ship-canvas-wrap">
          <canvas width="54" height="54"></canvas>
        </div>
        <div class="ship-card-name">${i18n.t(ship.nameKey)}</div>
        <div class="ship-card-role">${i18n.t(ship.roleKey)}</div>
        <div class="ship-stat-bars">
          <div class="stat-mini-row">
            <span class="stat-mini-lbl">${i18n.t('statHp')}</span>
            <div class="stat-mini-track"><div class="stat-mini-fill" style="width: ${ship.stats.hp}%;"></div></div>
          </div>
          <div class="stat-mini-row">
            <span class="stat-mini-lbl">${i18n.t('statDmg')}</span>
            <div class="stat-mini-track"><div class="stat-mini-fill" style="width: ${ship.stats.dmg}%;"></div></div>
          </div>
          <div class="stat-mini-row">
            <span class="stat-mini-lbl">${i18n.t('statSpd')}</span>
            <div class="stat-mini-track"><div class="stat-mini-fill" style="width: ${ship.stats.spd}%;"></div></div>
          </div>
          <div class="stat-mini-row">
            <span class="stat-mini-lbl">${i18n.t('statDiff')}</span>
            <div class="stat-mini-track"><div class="stat-mini-fill" style="width: ${ship.stats.range}%;"></div></div>
          </div>
        </div>
        <div class="ship-trait-pill">
          <b>${i18n.t(ship.traitNameKey)}</b>
          ${i18n.t(ship.traitDescKey)}
        </div>
      `;

      card.addEventListener('click', () => {
        sound.playCardSelect();
        game.selectShip(key);
        document.querySelectorAll('.ship-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      shipSelectorBox.appendChild(card);
      const cvs = card.querySelector('canvas');
      if (cvs) {
        shipPreviews.push({ canvas: cvs, shipId: key });
      }
    });
  }

  // Damage Meter Toggle Handlers
  meterToggleBtn.addEventListener('click', () => {
    sound.playCardSelect();
    damageMeterPanel.classList.toggle('hidden');
  });

  meterCloseBtn.addEventListener('click', () => {
    sound.playCardSelect();
    damageMeterPanel.classList.add('hidden');
  });

  // Render Hangar Permanent Tech Upgrades
  function renderHangar() {
    meta.load();
    hangarGoldVal.textContent = meta.gold.toLocaleString();
    hangarList.innerHTML = '';

    const upgrades = [
      { id: 'hull', titleKey: 'upgradeHull', descKey: 'upgradeHullDesc', icon: '🛡️' },
      { id: 'reactor', titleKey: 'upgradeReactor', descKey: 'upgradeReactorDesc', icon: '⚛️' },
      { id: 'magnet', titleKey: 'upgradeMagnet', descKey: 'upgradeMagnetDesc', icon: '🧲' },
      { id: 'revive', titleKey: 'upgradeRevive', descKey: 'upgradeReviveDesc', icon: '💖' },
      { id: 'greed', titleKey: 'upgradeGreed', descKey: 'upgradeGreedDesc', icon: '🪙' }
    ];

    upgrades.forEach(u => {
      const currentRank = meta.ranks[u.id] || 0;
      const maxRank = meta.getMaxRank(u.id);
      const cost = meta.getCost(u.id);
      const isMaxed = cost === null;
      const canAfford = !isMaxed && meta.gold >= cost;

      let rankPillsHtml = '';
      for (let i = 0; i < maxRank; i++) {
        rankPillsHtml += `<span class="rank-node ${i < currentRank ? 'active' : ''}"></span>`;
      }

      const item = document.createElement('div');
      item.className = 'hangar-item';
      item.innerHTML = `
        <div class="hangar-item-icon">${u.icon}</div>
        <div class="hangar-item-info">
          <div class="hangar-item-title">${i18n.t(u.titleKey)}</div>
          <div class="hangar-item-desc">${i18n.t(u.descKey)}</div>
          <div class="rank-nodes-row">${rankPillsHtml}</div>
        </div>
        <div class="hangar-item-action">
          <button class="btn-upgrade ${isMaxed ? 'maxed' : (canAfford ? 'affordable' : 'locked')}">
            ${isMaxed ? i18n.t('maxedLabel') : `🪙 ${cost}`}
          </button>
        </div>
      `;

      if (!isMaxed && canAfford) {
        const btn = item.querySelector('.btn-upgrade');
        btn.addEventListener('click', () => {
          if (meta.upgrade(u.id)) {
            sound.playJackpot();
            renderHangar();
          }
        });
      }

      hangarList.appendChild(item);
    });
  }

  // Open & Close Hangar
  function openHangar() {
    sound.playCardSelect();
    renderHangar();
    hangarModal.classList.add('active');
  }

  startHangarBtn.addEventListener('click', openHangar);
  overHangarBtn.addEventListener('click', openHangar);
  hangarCloseBtn.addEventListener('click', () => {
    sound.playCardSelect();
    hangarModal.classList.remove('active');
  });

  // Language selectors
  langBtnVi.addEventListener('click', () => {
    sound.playCardSelect();
    applyLanguage('vi');
  });

  langBtnEn.addEventListener('click', () => {
    sound.playCardSelect();
    applyLanguage('en');
  });

  hudLangBtn.addEventListener('click', () => {
    sound.playCardSelect();
    applyLanguage(i18n.current === 'vi' ? 'en' : 'vi');
  });

  // Screen Resizing
  function handleResize() {
    game.resize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // Audio start trigger on first user interaction
  function unlockAudio() {
    sound.resume();
  }
  window.addEventListener('touchstart', unlockAudio, { once: true });
  window.addEventListener('click', unlockAudio, { once: true });

  // Touch Ultimate EMP Button
  btnUltimate.addEventListener('click', () => {
    game.triggerUltimate();
  });
  btnUltimate.addEventListener('touchstart', (e) => {
    e.preventDefault();
    game.triggerUltimate();
  }, { passive: false });

  // Horde Alert Handler
  game.onHordeAlertCallback = () => {
    hordeAlert.textContent = i18n.t('hordeAlert');
    hordeAlert.classList.add('active');
    setTimeout(() => {
      hordeAlert.classList.remove('active');
    }, 2800);
  };

  // Lucky Slot Machine Chest Flow
  game.onLuckyChestCallback = () => {
    chestModal.classList.add('active');
    chestResult.classList.add('hidden');
    chestClaimBtn.classList.add('hidden');
    chestSub.textContent = i18n.t('chestSpinning');

    const slotSymbols = ['⚡', '🪐', '🌩️', '🌀', '🚀', '🛸', '💎', '👑', '💥'];
    let ticks = 0;
    const maxTicks = 20;

    const interval = setInterval(() => {
      ticks++;
      sound.playSlotTick();
      reel1.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      reel2.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      reel3.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];

      if (ticks >= maxTicks) {
        clearInterval(interval);
        reel1.textContent = '💎';
        reel2.textContent = '💎';
        reel3.textContent = '💎';
        sound.playJackpot();

        const rewardCards = upgradeSystem.generateCards();
        chestCardsBox.innerHTML = '';
        rewardCards.forEach(card => {
          card.apply();
          const cEl = document.createElement('div');
          cEl.className = `upgrade-card rarity-${card.rarityKey}`;
          cEl.innerHTML = `
            <div class="card-icon">${card.icon}</div>
            <div class="card-info">
              <div class="card-header-row">
                <span class="card-name">${card.title}</span>
                <div class="card-badges-group">
                  <span class="card-category-badge ${card.categoryKey}">${card.category}</span>
                  <span class="card-badge ${card.rarityKey}">${card.rarity}</span>
                </div>
              </div>
              <div class="card-desc">${card.desc}</div>
            </div>
          `;
          chestCardsBox.appendChild(cEl);
        });

        chestSub.textContent = i18n.t('chestJackpot');
        chestResult.classList.remove('hidden');
        chestClaimBtn.classList.remove('hidden');
      }
    }, 75);
  };

  chestClaimBtn.addEventListener('click', () => {
    sound.playCardSelect();
    chestModal.classList.remove('active');
    game.state = 'playing';
  });

  // Level Up Modal Handler
  game.onLevelUpCallback = () => {
    const cards = upgradeSystem.generateCards();
    cardsContainer.innerHTML = '';

    const isSingleDestiny = cards.length === 1;
    if (isSingleDestiny) {
      cardsContainer.classList.add('single-choice');
      levelupTitle.textContent = i18n.t('destinyLevelUpTitle');
      levelupSub.textContent = i18n.t('destinyLevelUpSubtitle');
    } else {
      cardsContainer.classList.remove('single-choice');
      levelupTitle.textContent = i18n.t('levelUpTitle');
      levelupSub.textContent = i18n.t('levelUpSubtitle');
    }

    // Play special fanfare if any rolled card is Mythic!
    const hasMythic = cards.some(c => c.rarityKey === 'Mythic');
    if (hasMythic) {
      sound.playMythicFanfare();
    }

    cards.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = `upgrade-card rarity-${card.rarityKey}`;
      cardEl.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <div class="card-info">
          <div class="card-header-row">
            <span class="card-name">${card.title}</span>
            <div class="card-badges-group">
              <span class="card-category-badge ${card.categoryKey}">${card.category}</span>
              <span class="card-badge ${card.rarityKey}">${card.rarity}</span>
            </div>
          </div>
          <div class="card-desc">${card.desc}</div>
        </div>
      `;

      cardEl.addEventListener('click', () => {
        sound.playCardSelect();
        card.apply();
        levelUpModal.classList.remove('active');
        game.state = 'playing';
      });

      cardsContainer.appendChild(cardEl);
    });

    levelUpModal.classList.add('active');
  };

  // Game Over Handler
  game.onGameOverCallback = () => {
    const mins = Math.floor(game.gameTime / 60);
    const secs = Math.floor(game.gameTime % 60);
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    statSurvive.textContent = timeStr;
    statKills.textContent = game.kills.toString();
    statScore.textContent = game.score.toLocaleString();
    statGold.textContent = `${meta.gold.toLocaleString()} (+${game.earnedGold})`;

    gameOverModal.classList.add('active');
  };

  // Start Button Click
  startBtn.addEventListener('click', () => {
    sound.resume();
    sound.playCardSelect();
    startScreen.classList.remove('active');
    game.state = 'playing';
  });

  // Retry Button Click
  retryBtn.addEventListener('click', () => {
    sound.playCardSelect();
    gameOverModal.classList.remove('active');
    game.restart();
  });

  // Initial language application
  applyLanguage(i18n.current);

  // Main Animation Loop
  let lastTime = performance.now();
  function gameLoop(currentTime) {
    const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
    lastTime = currentTime;

    game.update(dt);
    game.draw();

    // Render animated Starship preview models on Start Screen
    if (startScreen.classList.contains('active')) {
      for (const sp of shipPreviews) {
        art.drawShipPreview(sp.canvas, sp.shipId, currentTime / 1000);
      }
    }

    // Update HUD
    const p = game.player;
    levelBadge.textContent = `${i18n.t('levelPrefix')} ${p.level}`;
    const xpPct = Math.min(100, (p.xp / p.nextLevelXp) * 100);
    xpBar.style.width = `${xpPct}%`;

    const hpPct = Math.max(0, (p.hp / p.maxHp) * 100);
    hpBar.style.width = `${hpPct}%`;

    const mins = Math.floor(game.gameTime / 60);
    const secs = Math.floor(game.gameTime % 60);
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    killsDisplay.textContent = `${game.kills} 💀`;

    // Dopamine meter
    dopamineBar.style.width = `${game.dopamineMeter}%`;
    if (game.isFrenzy) {
      dopamineLabel.textContent = i18n.t('frenzyOverload');
      dopamineLabel.style.color = '#fde047';
    } else {
      dopamineLabel.textContent = i18n.t('dopamineBurst');
      dopamineLabel.style.color = '#f43f5e';
    }

    // Kill Combo Multiplier Display
    if (game.combo >= 2 && game.comboTimer > 0) {
      comboBadge.classList.remove('hidden');
      const mult = game.getComboMultiplier().toFixed(1);
      comboText.textContent = `🔥 ${game.combo} COMBO (x${mult})`;
    } else {
      comboBadge.classList.add('hidden');
    }

    // Active Ultimate EMP Skill Button
    const ultPct = Math.min(100, game.ultimateCharge);
    const circumference = 276.46; // 2 * PI * 44
    const offset = circumference - (ultPct / 100) * circumference;
    ultProgressCircle.style.strokeDashoffset = offset.toString();

    if (ultPct >= 100) {
      btnUltimate.classList.add('ready');
    } else {
      btnUltimate.classList.remove('ready');
    }

    // Real-Time Skill Damage Meter Update
    if (!damageMeterPanel.classList.contains('hidden')) {
      meterTotalVal.textContent = formatDmg(game.totalDamageDealt);
      const total = Math.max(1, game.totalDamageDealt);

      const activeSkills = skillCatalog
        .map(s => ({ ...s, damage: game.damageStats[s.id] || 0 }))
        .filter(s => s.damage > 0)
        .sort((a, b) => b.damage - a.damage);

      if (activeSkills.length === 0) {
        meterSkillsList.innerHTML = `<div style="text-align: center; color: #64748b; font-size: 12px; padding: 12px 0;">Chưa tạo sát thương / No damage yet</div>`;
      } else {
        meterSkillsList.innerHTML = activeSkills.map(s => {
          const pct = ((s.damage / total) * 100).toFixed(1);
          return `
            <div class="meter-skill-item">
              <div class="meter-skill-info-row">
                <div class="meter-skill-name-group">
                  <span class="meter-skill-icon">${s.icon}</span>
                  <span class="meter-skill-name">${i18n.t(s.key)}</span>
                </div>
                <div class="meter-skill-stats-group">
                  <span class="meter-skill-dmg">${formatDmg(s.damage)}</span>
                  <span class="meter-skill-pct" style="color: ${s.color};">${pct}%</span>
                </div>
              </div>
              <div class="meter-progress-track">
                <div class="meter-progress-bar" style="width: ${pct}%; background: ${s.color}; box-shadow: 0 0 8px ${s.color};"></div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
});
