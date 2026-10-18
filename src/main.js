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
  const hangarTabShipsBtn = document.getElementById('hangar-tab-ships-btn');
  const hangarTabTechBtn = document.getElementById('hangar-tab-tech-btn');
  const hangarTabCodexBtn = document.getElementById('hangar-tab-codex-btn');
  const hangarShipsView = document.getElementById('hangar-ships-view');
  const hangarTechView = document.getElementById('hangar-tech-view');
  const hangarCodexView = document.getElementById('hangar-codex-view');
  const hangarShipsList = document.getElementById('hangar-ships-list');
  const hangarCodexList = document.getElementById('hangar-codex-list');

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

  // Real-Time Ship Attributes Elements
  const statsToggleBtn = document.getElementById('stats-toggle-btn');
  const statsBtnLabel = document.getElementById('stats-btn-label');
  const shipStatsPanel = document.getElementById('ship-stats-panel');
  const shipStatsTitle = document.getElementById('ship-stats-title');
  const statsCloseBtn = document.getElementById('stats-close-btn');
  const shipStatsList = document.getElementById('ship-stats-list');

  // Interactive Buttons
  const startBtn = document.getElementById('start-btn');
  const retryBtn = document.getElementById('retry-btn');
  const langBtnVi = document.getElementById('lang-btn-vi');
  const langBtnEn = document.getElementById('lang-btn-en');
  const hudLangBtn = document.getElementById('hud-lang-btn');
  const hudThemeBtn = document.getElementById('hud-theme-btn');
  const hudHomeBtn = document.getElementById('hud-home-btn');
  const startThemeBtn = document.getElementById('start-theme-btn');
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
    if (statsBtnLabel) statsBtnLabel.textContent = i18n.t('shipStatsBtn');
    if (shipStatsTitle) shipStatsTitle.textContent = i18n.t('shipStatsTitle');

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
        ${ship.isRare ? `<span class="ship-card-rare-tag">${i18n.t('shipRareBadge')}</span>` : ''}
        <div class="ship-canvas-wrap">
          <canvas width="88" height="88"></canvas>
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

  // Modal Visibility State Controller (che hết phần không cần thiết khi mở modal)
  function updateModalState() {
    const isModalOpen = (startScreen && startScreen.classList.contains('active')) ||
                        (levelUpModal && levelUpModal.classList.contains('active')) ||
                        (gameOverModal && gameOverModal.classList.contains('active')) ||
                        (chestModal && chestModal.classList.contains('active')) ||
                        (hangarModal && hangarModal.classList.contains('active'));
    if (isModalOpen) {
      document.body.classList.add('in-modal');
    } else {
      document.body.classList.remove('in-modal');
    }
  }

  // Damage Meter Toggle Handlers (Hiển thị đồng thời cùng chỉ số tàu)
  meterToggleBtn.addEventListener('click', () => {
    sound.playCardSelect();
    damageMeterPanel.classList.toggle('hidden');
  });

  meterCloseBtn.addEventListener('click', () => {
    sound.playCardSelect();
    damageMeterPanel.classList.add('hidden');
  });

  // Real-Time Ship Attributes Toggle Handlers (Hiển thị đồng thời cùng DPS)
  if (statsToggleBtn) {
    statsToggleBtn.addEventListener('click', () => {
      sound.playCardSelect();
      shipStatsPanel.classList.toggle('hidden');
    });
  }

  if (statsCloseBtn) {
    statsCloseBtn.addEventListener('click', () => {
      sound.playCardSelect();
      shipStatsPanel.classList.add('hidden');
    });
  }

  // HUD Return to Main Menu Button
  if (hudHomeBtn) {
    hudHomeBtn.addEventListener('click', () => {
      sound.playCardSelect();
      if (confirm(i18n.t('confirmQuit'))) {
        game.state = 'start';
        // Convert current score to gold vault
        if (game.score > 0) {
          const rawGold = Math.floor(game.score / 10);
          meta.addGold(rawGold);
        }
        startScreen.classList.add('active');
        levelUpModal.classList.remove('active');
        gameOverModal.classList.remove('active');
        chestModal.classList.remove('active');
        damageMeterPanel.classList.add('hidden');
        if (shipStatsPanel) shipStatsPanel.classList.add('hidden');
        updateModalState();
      }
    });
  }

  // Render Hangar Ships & Detailed Stats
  const hangarShipPreviews = [];
  function renderHangarShips() {
    if (!hangarShipsList) return;
    hangarShipPreviews.length = 0;
    hangarShipsList.innerHTML = '';

    const lang = i18n.current === 'vi' ? 'vi' : 'en';

    SHIP_KEYS.forEach(key => {
      const ship = SHIP_ROSTER[key];
      const isSelected = game.selectedShipId === key;

      const card = document.createElement('div');
      card.className = `hangar-ship-card ${isSelected ? 'active' : ''}`;
      card.style.setProperty('--ship-color', ship.color);
      card.style.setProperty('--ship-accent', ship.accentColor);
      card.style.setProperty('--ship-glow', ship.glowColor);

      const specsList = ship.specs ? (ship.specs[lang] || ship.specs.vi) : [];
      const specsHtml = specsList.map(s => `
        <div class="hangar-spec-row">
          <span class="hangar-spec-lbl">${s.label}:</span>
          <span class="hangar-spec-val">${s.val}</span>
        </div>
      `).join('');

      const synergiesList = ship.synergies ? (ship.synergies[lang] || ship.synergies.vi) : [];
      const synergiesHtml = synergiesList.map(syn => `
        <span class="hangar-synergy-tag">${syn}</span>
      `).join('');

      card.innerHTML = `
        <div class="hangar-ship-top">
          <div class="ship-canvas-wrap">
            <canvas width="88" height="88"></canvas>
          </div>
          <div class="hangar-ship-heading">
            <div class="ship-card-name">${i18n.t(ship.nameKey)}</div>
            <div class="ship-card-role">${i18n.t(ship.roleKey)}</div>
          </div>
        </div>
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

        <div class="hangar-specs-box">
          <div class="hangar-section-title">${i18n.current === 'vi' ? '📊 CHỈ SỐ KỸ NĂNG & CƠ CHẾ' : '📊 SKILL STATS & MECHANICS'}</div>
          ${specsHtml}
        </div>

        <div class="hangar-synergies-box">
          <div class="hangar-section-title">${i18n.current === 'vi' ? '⚡ NÂNG CẤP SYNERGY TỐI ƯU' : '⚡ RECOMMENDED SYNERGIES'}</div>
          <div class="hangar-synergies-wrap">
            ${synergiesHtml}
          </div>
        </div>

        <button class="btn-select-ship ${isSelected ? 'selected' : ''}">
          ${isSelected ? `✓ ${i18n.t('shipSelectedBadge')}` : i18n.t('hangarSelectShipBtn')}
        </button>
      `;

      const selectBtn = card.querySelector('.btn-select-ship');
      selectBtn.addEventListener('click', () => {
        sound.playJackpot();
        game.selectShip(key);
        renderShipSelector();
        renderHangarShips();
      });

      hangarShipsList.appendChild(card);
      const cvs = card.querySelector('canvas');
      if (cvs) {
        hangarShipPreviews.push({ canvas: cvs, shipId: key });
      }
    });
  }

  // Hangar Tabs Switching (3 tabs)
  function switchHangarTab(activeTab) {
    sound.playCardSelect();
    hangarTabShipsBtn?.classList.remove('active');
    hangarTabTechBtn?.classList.remove('active');
    hangarTabCodexBtn?.classList.remove('active');

    hangarShipsView?.classList.add('hidden');
    hangarTechView?.classList.add('hidden');
    hangarCodexView?.classList.add('hidden');

    if (activeTab === 'ships') {
      hangarTabShipsBtn?.classList.add('active');
      hangarShipsView?.classList.remove('hidden');
      renderHangarShips();
    } else if (activeTab === 'tech') {
      hangarTabTechBtn?.classList.add('active');
      hangarTechView?.classList.remove('hidden');
      renderHangar();
    } else if (activeTab === 'codex') {
      hangarTabCodexBtn?.classList.add('active');
      hangarCodexView?.classList.remove('hidden');
      renderHangarCodex();
    }
  }

  if (hangarTabShipsBtn) hangarTabShipsBtn.addEventListener('click', () => switchHangarTab('ships'));
  if (hangarTabTechBtn) hangarTabTechBtn.addEventListener('click', () => switchHangarTab('tech'));
  if (hangarTabCodexBtn) hangarTabCodexBtn.addEventListener('click', () => switchHangarTab('codex'));

  // Filtered Render for Hangar Upgrades & Weapons Codex Vault
  let currentCodexFilter = 'all';
  function setupCodexFilters() {
    const filterBtns = document.querySelectorAll('.codex-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playCardSelect();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCodexFilter = btn.dataset.filter || 'all';
        renderHangarCodex(currentCodexFilter);
      });
    });
  }

  function renderHangarCodex(activeFilter = currentCodexFilter) {
    if (!hangarCodexList) return;
    hangarCodexList.innerHTML = '';
    const isVi = i18n.current === 'vi';

    const groups = [
      {
        id: 'stat',
        title: isVi ? '1. NHÓM NÂNG CẤP CHỈ SỐ (PHỔ THÔNG)' : '1. STAT UPGRADES (COMMON / RARE)',
        color: '#38bdf8',
        items: [
          {
            icon: '🚀',
            name: isVi ? 'Gia Tốc (Thrust)' : 'Thrust Accelerator',
            rarity: isVi ? 'Phổ thông' : 'Common',
            rarityClass: 'common',
            borderClass: 'card-border-common',
            synergy: { class: 'rammer', label: isVi ? '☄️ Tối ưu: Tàu Tông Húc (Tăng tốc & Xoay đầm)' : '☄️ Best: Rammer (Speed & Agility)' },
            desc: isVi ? 'Tốc độ bay +25%, tốc độ xoay tàu +15%. Giúp phi thuyền cơ động lướt húc mục tiêu chính xác.' : '+25% Flight Speed, +15% Ship Turn Rate. Enhances evasion and ramming accuracy.'
          },
          {
            icon: '🛡️',
            name: isVi ? 'Khuếch Đại (Juggernaut)' : 'Juggernaut Hull',
            rarity: isVi ? 'Hiếm' : 'Rare',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'rammer', label: isVi ? '☄️ Tối ưu: Tàu Tank / Tông Húc (Phòng thủ & Khối lượng)' : '☄️ Best: Rammer (Mass & Defense)' },
            desc: isVi ? 'Tăng 40% kích thước & khối lượng tàu, tăng 30% máu tối đa, giảm 15% tốc độ xoay. Đâm quái cực mạnh!' : '+40% Size & Mass, +30% Max HP, -15% Turn Rate. Massive collision impact.'
          },
          {
            icon: '🛸',
            name: isVi ? 'Thu Nhỏ (Micro-Craft)' : 'Micro-Craft',
            rarity: isVi ? 'Hiếm' : 'Rare',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'serpent', label: isVi ? '🐉 Tối ưu: Tàu Rồng Xà (Né đạn & Luồn lách)' : '🐉 Best: Serpent (Agile Dodging)' },
            desc: isVi ? 'Giảm 30% kích thước hitbox nhận đòn, tốc độ bay +35%. Luồn lách né biển đạn dễ như chơi.' : '-30% Hitbox Size, +35% Flight Speed. Easily weave through bullet hell.'
          },
          {
            icon: '🔋',
            name: isVi ? 'Lõi Năng Lượng (Energy Core)' : 'Energy Core',
            rarity: isVi ? 'Hiếm' : 'Rare',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'novashield', label: isVi ? '🛡️ Tối ưu: Tàu Khiên Nổ (Sạc khiên siêu tốc)' : '🛡️ Best: Nova Shield (Fast Barrier Recharge)' },
            desc: isVi ? 'Tốc độ hồi khiên +40%, giảm thời gian kích nổ khiên. Tái tạo lá chắn liên tục sau mỗi đòn đánh.' : '+40% Shield Recharge Rate, faster burst delay. Essential for Nova barrier cycles.'
          },
          {
            icon: '🐉',
            name: isVi ? 'Mọc Đốt (Grow Segments)' : 'Segment Sprout',
            rarity: isVi ? 'Hiếm' : 'Rare',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'serpent', label: isVi ? '🐉 Tối ưu: Tàu Rồng Xà (Mọc thêm 2 đốt thân)' : '🐉 Best: Serpent (+2 Body Segments)' },
            desc: isVi ? 'Thêm 2 đốt thân bọc thép chặn đạn (Tàu Rắn) hoặc kéo dài vệt lửa phản lực gây cháy (Tàu khác).' : '+2 Armored Segments (Serpent) or extended burning flame trail (Other ships).'
          },
          {
            icon: '💉',
            name: isVi ? 'Sửa Chữa Khẩn Cấp (Nanorepair)' : 'Nanorepair System',
            rarity: isVi ? 'Phổ thông' : 'Common',
            rarityClass: 'common',
            borderClass: 'card-border-common',
            synergy: { class: 'rammer', label: isVi ? '☄️ Tối ưu: Tàu Tank (Hồi phục & Gia tăng HP)' : '☄️ Best: Rammer (Hull Sustain)' },
            desc: isVi ? 'Tăng 25 Max HP và lập tức phục hồi 60 HP. Giữ vững sinh mệnh khi bị quái vật cắn ép góc.' : '+25 Max HP and instantly restores 60 HP. Reliable survival sustain.'
          },
          {
            icon: '🔭',
            name: isVi ? 'Ống Kính Vũ Trụ (Cosmic Scope)' : 'Cosmic Scope Lens',
            rarity: isVi ? 'Hiếm' : 'Rare',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'general', label: isVi ? '✨ Phù hợp: Mọi chiến hạm (Bao quát chiến trường)' : '✨ Universal: Maximize Battlefield Vision' },
            desc: isVi ? 'Mở rộng 25% tầm nhìn camera toàn cảnh, tăng 45px bán kính hút ngọc từ xa.' : '+25% Panoramic Vision FOV, +45px Magnet Gathering Radius.'
          }
        ]
      },
      {
        id: 'mutation',
        title: isVi ? '2. NHÓM ĐỘT BIẾN LỐI CHƠI (BIẾN ĐỔI CƠ CHẾ)' : '2. GAMEPLAY MUTATIONS (MECHANICAL ALTERATIONS)',
        color: '#c084fc',
        items: [
          {
            icon: '🌪️',
            name: isVi ? 'Đâm Xuyên (Drill)' : 'Drill Momentum',
            rarity: isVi ? 'Sử thi' : 'Epic',
            rarityClass: 'epic',
            borderClass: 'card-border-epic',
            synergy: { class: 'rammer', label: isVi ? '☄️ Tối ưu: Tàu Tông Húc (Càn quét xuyên bầy)' : '☄️ Best: Rammer (Unstoppable Ramming)' },
            desc: isVi ? 'Khi húc chết quái, tàu không bị khựng lại mà giữ nguyên vận tốc lao thẳng xuyên qua tiếp!' : 'When ramming kills an enemy, ship maintains velocity and continues piercing through!'
          },
          {
            icon: '🔥',
            name: isVi ? 'Khiên Lửa (Burn Field)' : 'Burn Field',
            rarity: isVi ? 'Sử thi' : 'Epic',
            rarityClass: 'epic',
            borderClass: 'card-border-epic',
            synergy: { class: 'novashield', label: isVi ? '🛡️ Tối ưu: Tàu Khiên Nổ (Thiêu đốt diện rộng)' : '🛡️ Best: Nova Shield (Aura Damage)' },
            desc: isVi ? 'Khiên liên tục gây sát thương thiêu đốt toàn bộ quái trong bán kính xung quanh tàu.' : 'Shield constantly emits intense heat, incinerating all enemies in close proximity.'
          },
          {
            icon: '💫',
            name: isVi ? 'Đạn Nảy (Ricochet)' : 'Ricochet Kinetic',
            rarity: isVi ? 'Sử thi' : 'Epic',
            rarityClass: 'epic',
            borderClass: 'card-border-epic',
            synergy: { class: 'general', label: isVi ? '✨ Phù hợp: Mọi hỏa lực tầm xa' : '✨ Universal: Ranged Projectiles' },
            desc: isVi ? 'Đạn hoặc mảnh vỡ khi va chạm lập tức dội nảy sang các mục tiêu lân cận.' : 'Projectiles ricochet upon impact toward nearby targets for cascading carnage.'
          },
          {
            icon: '☣️',
            name: isVi ? 'Khí Độc Đuôi (Toxic Exhaust)' : 'Toxic Exhaust Trail',
            rarity: isVi ? 'Sử thi' : 'Epic',
            rarityClass: 'epic',
            borderClass: 'card-border-epic',
            synergy: { class: 'serpent', label: isVi ? '🐉 Tối ưu: Tàu Rồng Xà (Bo quái xả độc)' : '🐉 Best: Serpent (Poison Encirclement)' },
            desc: isVi ? 'Đuôi tàu hoặc các đốt rắn xả màn khói độc cực đặc làm chậm và rút cạn máu quái đi vào.' : 'Engine exhaust and body segments emit dense toxic fumes that slow & melt enemies.'
          },
          {
            icon: '🌵',
            name: isVi ? 'Gai Phản Đòn (Spiked Thorns)' : 'Spiked Thorns',
            rarity: isVi ? 'Hiếm' : 'Rare',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'rammer', label: isVi ? '☄️ Tối ưu: Tàu Tank & Rắn (Phản 100% sát thương)' : '☄️ Best: Rammer / Serpent (100% Thorn Defense)' },
            desc: isVi ? 'Phản lại 100% sát thương va chạm cho bất kỳ con quái nào dám đụng vào thân tàu hoặc đốt thân.' : 'Reflects 100% collision damage back to attackers on contact.'
          }
        ]
      },
      {
        id: 'fusion',
        title: isVi ? '3. SIÊU NÂNG CẤP FUSION MODS (CẤP 10+)' : '3. FUSION MODS (LEVEL 10+ REQUIRED)',
        color: '#facc15',
        items: [
          {
            icon: '💥',
            name: isVi ? 'Bom Quán Tính (Crash Nova)' : 'Crash Nova Shockwave',
            rarity: isVi ? 'Huyền thoại' : 'Legendary',
            rarityClass: 'legendary',
            borderClass: 'card-border-legendary',
            synergy: { class: 'rammer', label: isVi ? '☄️ Độc quyền: Tàu Tông Húc (Nổ sóng xung kích)' : '☄️ Exclusive: Rammer Impact Nova' },
            desc: isVi ? 'Mỗi khi húc trúng mục tiêu, lập tức phát nổ một luồng sóng xung kích nghiền nát bầy quái xung quanh!' : 'Every ramming hit detonates a kinetic shockwave blasting nearby clusters.'
          },
          {
            icon: '🐲',
            name: isVi ? 'Mãng Xà Bọc Thép (Iron Dragon)' : 'Iron Dragon Armor',
            rarity: isVi ? 'Huyền thoại' : 'Legendary',
            rarityClass: 'legendary',
            borderClass: 'card-border-legendary',
            synergy: { class: 'serpent', label: isVi ? '🐉 Độc quyền: Tàu Rồng Xà (Hất văng quái)' : '🐉 Exclusive: Serpent Heavy Spikes' },
            desc: isVi ? 'Các đốt thân rắn nhận giáp & gai, quái chạm vào đốt thân bị đánh bật ngược ra xa và choáng váng.' : 'Serpent segments gain heavy armor & spikes, knocking monsters violently backward.'
          },
          {
            icon: '⚚',
            name: isVi ? 'Bất Tử Hóa (Immortality)' : 'Overload Immortality',
            rarity: isVi ? 'Huyền thoại' : 'Legendary',
            rarityClass: 'legendary',
            borderClass: 'card-border-legendary',
            synergy: { class: 'novashield', label: isVi ? '🛡️ Độc quyền: Tàu Khiên Nổ (x3 Sát thương nổ khiên)' : '🛡️ Exclusive: Nova Shield Overload' },
            desc: isVi ? 'Toàn bộ thanh máu quy đổi thành khiên năng lượng, sát thương nổ sóng khiên tăng vọt gấp 3 lần!' : 'Converts all health into dynamic energy shields; shield rupture damage tripled!'
          },
          {
            icon: '☢️',
            name: isVi ? 'Bom Hạt Nhân (Tactical Nuke)' : 'Tactical Nuke Bomb',
            rarity: isVi ? 'Huyền thoại' : 'Legendary',
            rarityClass: 'legendary',
            borderClass: 'card-border-legendary',
            synergy: { class: 'general', label: isVi ? '✨ Phù hợp: Cứu nguy khẩn cấp mọi tàu' : '✨ Universal: Screen Wipe Emergency' },
            desc: isVi ? 'Kích nổ vũ khí hạt nhân quét sạch 100% quái vật hiện diện trên toàn bộ bản đồ!' : 'Detonates a tactical nuclear device clearing all non-boss enemies instantly.'
          }
        ]
      },
      {
        id: 'mythic',
        title: isVi ? '4. THẦN THOẠI ĐỎ CỰC HIẾM (MYTHIC - TỈ LỆ 1.5%)' : '4. MYTHIC RED CARDS (1.5% DROP RATE)',
        color: '#ef4444',
        items: [
          {
            icon: '⚡',
            name: isVi ? 'Khế Ước Thần Mệnh (Destiny Pact)' : 'Divine Destiny Pact',
            rarity: isVi ? 'Thần thoại' : 'Mythic',
            rarityClass: 'mythic',
            borderClass: 'card-border-mythic',
            synergy: { class: 'general', label: isVi ? '✨ Kích hoạt kỹ năng tối thượng' : '✨ Ultra God-Tier Empowerment' },
            desc: isVi ? 'Lần lên cấp tiếp theo ép xuất hiện duy nhất 1 thẻ nhưng BẢO ĐẢM là Thần Thoại Đỏ cực mạnh!' : 'Forces your next level up to offer a guaranteed single God-Tier Mythic card!'
          },
          {
            icon: '🕳️',
            name: isVi ? 'Kỳ Điểm Vũ Trụ (Singularity)' : 'Cosmic Singularity',
            rarity: isVi ? 'Thần thoại' : 'Mythic',
            rarityClass: 'mythic',
            borderClass: 'card-border-mythic',
            synergy: { class: 'general', label: isVi ? '✨ Hố đen gom quái diện rộng' : '✨ Swarm Black Hole Trap' },
            desc: isVi ? 'Tạo hố đen mini kéo hút và nghiền nát toàn bộ kẻ địch mỗi 6 giây.' : 'Spawns gravitational singularities pulling & crushing swarms every 6s.'
          },
          {
            icon: '🩸',
            name: isVi ? 'Huyết Ma Cuồng Nộ (Blood God)' : 'Blood God Rampage',
            rarity: isVi ? 'Thần thoại' : 'Mythic',
            rarityClass: 'mythic',
            borderClass: 'card-border-mythic',
            synergy: { class: 'rammer', label: isVi ? '☄️ Tối ưu: Tàu Tank (Tăng 100% công & Hồi máu)' : '☄️ Best: Rammer (+100% Dmg & Lifesteal)' },
            desc: isVi ? 'Tăng gấp đôi toàn bộ sát thương (+100%), hạ gục quái lập tức phục hồi lượng máu dồi dào.' : 'Doubles all damage (+100%) and constantly regenerates health on monster kills.'
          },
          {
            icon: '💀',
            name: isVi ? 'Lưỡi Hái Tử Thần (Reaper)' : 'Reaper Execution',
            rarity: isVi ? 'Thần thoại' : 'Mythic',
            rarityClass: 'mythic',
            borderClass: 'card-border-mythic',
            synergy: { class: 'general', label: isVi ? '✨ Trảm sát Boss < 25% HP' : '✨ Instant Execute < 25% HP' },
            desc: isVi ? 'Lập tức trảm sát bất kỳ quái vật hoặc Boss nào có lượng máu tụt xuống dưới 25%.' : 'Instantly executes any monster or boss with health under 25%.'
          },
          {
            icon: '⏳',
            name: isVi ? 'Ngưng Đọng Thời Không (Chronos)' : 'Chronos Stasis',
            rarity: isVi ? 'Thần thoại' : 'Mythic',
            rarityClass: 'mythic',
            borderClass: 'card-border-mythic',
            synergy: { class: 'novashield', label: isVi ? '🛡️ Tối ưu: Tàu Khiên (Đóng băng 5s & +60% dmg)' : '🛡️ Best: Nova Shield (Freeze & Burst)' },
            desc: isVi ? 'Đóng băng thời gian toàn bộ quái vật trong 5 giây, tăng thêm 60% sát thương toàn thể.' : 'Freezes all enemies for 5 seconds and grants a +60% damage boost.'
          }
        ]
      },
      {
        id: 'weapon',
        title: isVi ? '5. KHO VŨ KHÍ HẠM ĐỘI (FLEET ARSENAL)' : '5. FLEET WEAPON ARSENAL',
        color: '#10b981',
        items: [
          {
            icon: '⚡',
            name: isVi ? 'Pháo Plasma Kép' : 'Plasma Blaster',
            rarity: isVi ? 'Vũ khí' : 'Weapon',
            rarityClass: 'common',
            borderClass: 'card-border-common',
            synergy: { class: 'general', label: isVi ? '✨ Vũ khí tầm xa cơ bản' : '✨ Primary Ranged Laser' },
            desc: isVi ? 'Bắn loạt tia năng lượng phía trước. Tiến hóa: Bắn 5 siêu tia xuyên thấu liên thanh.' : 'Frontal laser cannons. Evolution: 5 piercing hyper-lasers with rapid fire.'
          },
          {
            icon: '🪐',
            name: isVi ? 'Quả Cầu Hộ Thể' : 'Orbiting Orbs',
            rarity: isVi ? 'Vũ khí' : 'Weapon',
            rarityClass: 'common',
            borderClass: 'card-border-common',
            synergy: { class: 'rammer', label: isVi ? '☄️ Tối ưu: Tàu Tank (Nghiền nát quái áp sát)' : '☄️ Best: Rammer (Close Defense)' },
            desc: isVi ? 'Vòng xoay cầu plasma càn quét quái áp sát. Tiến hóa: 6 quả cầu tạo lá chắn bất tử.' : 'Rotating spheres shredding close swarms. Evolution: 6 impenetrable barrier spheres.'
          },
          {
            icon: '🌩️',
            name: isVi ? 'Sét Chuỗi Lan' : 'Chain Lightning',
            rarity: isVi ? 'Vũ khí' : 'Weapon',
            rarityClass: 'common',
            borderClass: 'card-border-common',
            synergy: { class: 'serpent', label: isVi ? '🐉 Tối ưu: Tàu Rồng Xà (Giật lan chuỗi)' : '🐉 Best: Serpent (Chain Arc Stun)' },
            desc: isVi ? 'Phóng sét gián đoạn chuỗi địch. Tiến hóa: Sấm sét hủy diệt 12 mục tiêu cùng lúc.' : 'Zaps clusters of enemies. Evolution: Thunderbolts strike 12 targets simultaneously.'
          },
          {
            icon: '🌀',
            name: isVi ? 'Phi Tiêu Nảy' : 'Bouncing Glaive',
            rarity: isVi ? 'Vũ khí' : 'Weapon',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'serpent', label: isVi ? '🐉 Khởi đầu: Tàu Rồng Xà (Dội nảy liên hoàn)' : '🐉 Starter: Serpent (Ricochets)' },
            desc: isVi ? 'Phi đao năng lượng tốc độ cao dội nảy liên tục qua nhiều tầng quái vật.' : 'High-velocity energy disc bouncing across multiple enemies.'
          },
          {
            icon: '🚀',
            name: isVi ? 'Tên Lửa Tầm Nhiệt' : 'Heat-Seeking Missiles',
            rarity: isVi ? 'Vũ khí' : 'Weapon',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'novashield', label: isVi ? '🛡️ Tối ưu: Tàu Khiên Nổ (Tự tìm quái nổ to)' : '🛡️ Best: Nova Shield (Homing Blast)' },
            desc: isVi ? 'Tên lửa tự tìm và nổ diện rộng. Tiến hóa: Chùm 10 đầu đạn hủy diệt.' : 'Homing missiles with blast radius. Evolution: 10 cluster warheads.'
          },
          {
            icon: '🛸',
            name: isVi ? 'Drone Đồng Minh' : 'Wingmen Drones',
            rarity: isVi ? 'Vũ khí' : 'Weapon',
            rarityClass: 'rare',
            borderClass: 'card-border-rare',
            synergy: { class: 'general', label: isVi ? '✨ Phi đội máy bay hộ tống' : '✨ Escort Gunship Fleet' },
            desc: isVi ? '2 máy bay phụ trợ bám sát phi thuyền. Tiến hóa: Đội hình 4 drone tự hành cực mạnh.' : 'Escort companion drones. Evolution: 4 autonomous heavy support gunships.'
          }
        ]
      }
    ];

    const filteredGroups = activeFilter === 'all' ? groups : groups.filter(g => g.id === activeFilter);

    filteredGroups.forEach(g => {
      const gTitle = document.createElement('div');
      gTitle.className = 'codex-group-title';
      gTitle.style.color = g.color;
      gTitle.textContent = g.title;
      hangarCodexList.appendChild(gTitle);

      g.items.forEach(item => {
        const card = document.createElement('div');
        card.className = `codex-card ${item.borderClass || ''}`;
        card.innerHTML = `
          <div class="codex-icon">${item.icon}</div>
          <div class="codex-info">
            <div class="codex-header-row">
              <span class="codex-name">${item.name}</span>
              <span class="card-rarity-pill ${item.rarityClass}">${item.rarity}</span>
            </div>
            <div class="codex-desc">${item.desc}</div>
            ${item.synergy ? `<div class="codex-synergy-tag ${item.synergy.class}">${item.synergy.label}</div>` : ''}
          </div>
        `;
        hangarCodexList.appendChild(card);
      });
    });
  }

  // Render Hangar Permanent Tech Upgrades
  function renderHangar() {
    meta.load();
    hangarGoldVal.textContent = meta.gold.toLocaleString();
    hangarList.innerHTML = '';

    if (hangarTabShipsBtn) hangarTabShipsBtn.textContent = i18n.t('hangarTabShips');
    if (hangarTabTechBtn) hangarTabTechBtn.textContent = i18n.t('hangarTabTech');
    if (hangarTabCodexBtn) hangarTabCodexBtn.textContent = i18n.t('hangarTabCodex');

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
    renderHangarShips();
    renderHangarCodex();
    hangarModal.classList.add('active');
    updateModalState();
  }

  startHangarBtn.addEventListener('click', openHangar);
  overHangarBtn.addEventListener('click', openHangar);
  setupCodexFilters();
  const hangarHeaderCloseBtn = document.getElementById('hangar-header-close-btn');
  const closeHangar = () => {
    sound.playCardSelect();
    hangarModal.classList.remove('active');
    updateModalState();
  };
  hangarCloseBtn.addEventListener('click', closeHangar);
  if (hangarHeaderCloseBtn) {
    hangarHeaderCloseBtn.addEventListener('click', closeHangar);
  }
  // Click outside modal box to close
  hangarModal.addEventListener('click', (e) => {
    if (e.target === hangarModal) {
      closeHangar();
    }
  });
  // Press Escape to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hangarModal.classList.contains('active')) {
      closeHangar();
    }
  });

  // Theme Toggle Engine (Dark / Light)
  let currentTheme = localStorage.getItem('dopamine_theme') || 'dark';
  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('dopamine_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      if (startThemeBtn) startThemeBtn.textContent = i18n.t('themeLight');
      if (hudThemeBtn) hudThemeBtn.textContent = '☀️';
    } else {
      document.body.classList.remove('theme-light');
      if (startThemeBtn) startThemeBtn.textContent = i18n.t('themeDark');
      if (hudThemeBtn) hudThemeBtn.textContent = '🌙';
    }
  }

  function toggleTheme() {
    sound.playCardSelect();
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  if (startThemeBtn) startThemeBtn.addEventListener('click', toggleTheme);
  if (hudThemeBtn) hudThemeBtn.addEventListener('click', toggleTheme);

  // Language selectors
  langBtnVi.addEventListener('click', () => {
    sound.playCardSelect();
    applyLanguage('vi');
    applyTheme(currentTheme);
  });

  langBtnEn.addEventListener('click', () => {
    sound.playCardSelect();
    applyLanguage('en');
    applyTheme(currentTheme);
  });

  hudLangBtn.addEventListener('click', () => {
    sound.playCardSelect();
    applyLanguage(i18n.current === 'vi' ? 'en' : 'vi');
    applyTheme(currentTheme);
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
    updateModalState();
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

          let levelBadgeHtml = '';
          if (card.currentLevel !== undefined && card.maxLevel) {
            if (card.currentLevel === 0) {
              levelBadgeHtml = `<span class="card-level-badge unlock">${i18n.current === 'vi' ? 'MỞ KHÓA (CẤP 1)' : 'UNLOCK (LV.1)'}</span>`;
            } else {
              levelBadgeHtml = `<span class="card-level-badge progress">${i18n.current === 'vi' ? `CẤP ${card.currentLevel} ➔ ${card.nextLevel} (TỐI ĐA ${card.maxLevel})` : `LV.${card.currentLevel} ➔ ${card.nextLevel} (MAX ${card.maxLevel})`}</span>`;
            }
          } else if (card.rarityKey === 'Mythic') {
            levelBadgeHtml = `<span class="card-level-badge mythic">${i18n.current === 'vi' ? 'TỐI THƯỢNG' : 'ULTIMATE'}</span>`;
          }

          cEl.innerHTML = `
            <div class="card-icon">${card.icon}</div>
            <div class="card-info">
              <div class="card-header-row">
                <span class="card-name">${card.title}</span>
                <div class="card-badges-group">
                  ${levelBadgeHtml}
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
    updateModalState();
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

      // Build Level Badge
      let levelBadgeHtml = '';
      if (card.currentLevel !== undefined && card.maxLevel) {
        if (card.currentLevel === 0) {
          levelBadgeHtml = `<span class="card-level-badge unlock">${i18n.current === 'vi' ? 'MỞ KHÓA (CẤP 1)' : 'UNLOCK (LV.1)'}</span>`;
        } else {
          levelBadgeHtml = `<span class="card-level-badge progress">${i18n.current === 'vi' ? `CẤP ${card.currentLevel} ➔ ${card.nextLevel} (TỐI ĐA ${card.maxLevel})` : `LV.${card.currentLevel} ➔ ${card.nextLevel} (MAX ${card.maxLevel})`}</span>`;
        }
      } else if (card.rarityKey === 'Mythic') {
        levelBadgeHtml = `<span class="card-level-badge mythic">${i18n.current === 'vi' ? 'TỐI THƯỢNG' : 'ULTIMATE'}</span>`;
      }

      cardEl.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <div class="card-info">
          <div class="card-header-row">
            <span class="card-name">${card.title}</span>
            <div class="card-badges-group">
              ${levelBadgeHtml}
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
        updateModalState();
      });

      cardsContainer.appendChild(cardEl);
    });

    levelUpModal.classList.add('active');
    updateModalState();
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
    updateModalState();
  };

  // Start Button Click (Vào trận đấu chỉ hiển thị chỉ số cơ bản)
  startBtn.addEventListener('click', () => {
    sound.resume();
    sound.playCardSelect();
    startScreen.classList.remove('active');
    damageMeterPanel.classList.add('hidden');
    if (shipStatsPanel) shipStatsPanel.classList.add('hidden');
    game.state = 'playing';
    updateModalState();
  });

  // Retry Button Click
  retryBtn.addEventListener('click', () => {
    sound.playCardSelect();
    gameOverModal.classList.remove('active');
    damageMeterPanel.classList.add('hidden');
    if (shipStatsPanel) shipStatsPanel.classList.add('hidden');
    game.restart();
    updateModalState();
  });

  // Initial language & theme application
  applyLanguage(i18n.current);
  applyTheme(currentTheme);
  updateModalState();

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
    // Render animated Starship preview models in Hangar
    if (hangarModal && hangarModal.classList.contains('active') && hangarShipsView && !hangarShipsView.classList.contains('hidden')) {
      for (const sp of hangarShipPreviews) {
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

    // Real-Time Ship Attributes Panel Update
    if (shipStatsPanel && !shipStatsPanel.classList.contains('hidden')) {
      const sp = game.player;
      const totalSpeed = Math.round(sp.baseSpeed * sp.stats.speedMult * (game.isFrenzy ? 1.45 : 1.0));
      const dmgBonus = Math.round((sp.stats.damageMult - 1.0 + (sp.berserkerDmgBonus || 0)) * 100);
      const atkSpdBonus = Math.round((sp.stats.fireRateMult - 1.0 + (sp.berserkerAtkSpdBonus || 0)) * 100);
      const critChancePct = Math.round(sp.stats.critChance * 100);
      const critDmgMult = (sp.stats.critMult).toFixed(1);
      const magnetRange = Math.round(sp.magnetRadius);
      const visionZoom = Math.round(100 / (game.cameraZoom || 1.0));

      shipStatsList.innerHTML = `
        <div class="ship-stat-box">
          <span class="stat-box-label">MÁU / GIÁP (HP)</span>
          <span class="stat-box-val" style="color: #22c55e;">${Math.round(sp.hp)} / ${sp.maxHp}</span>
          <span class="stat-box-sub">${sp.revivesLeft > 0 ? `💖 ${sp.revivesLeft} Tái sinh` : 'Chưa có bảo hiểm'}</span>
        </div>
        <div class="ship-stat-box">
          <span class="stat-box-label">HỎA LỰC (DAMAGE)</span>
          <span class="stat-box-val" style="color: #ef4444;">x${sp.stats.damageMult.toFixed(2)}</span>
          <span class="stat-box-sub">${dmgBonus >= 0 ? `+${dmgBonus}% Buff` : `${dmgBonus}%`}</span>
        </div>
        <div class="ship-stat-box">
          <span class="stat-box-label">TỐC ĐỘ DI CHUYỂN</span>
          <span class="stat-box-val" style="color: #38bdf8;">${totalSpeed} px/s</span>
          <span class="stat-box-sub">${game.isFrenzy ? '⚡ FRENZY BOOST' : 'Động cơ ổn định'}</span>
        </div>
        <div class="ship-stat-box">
          <span class="stat-box-label">TỐC ĐỘ BẮN / XẢ ĐẠN</span>
          <span class="stat-box-val" style="color: #facc15;">x${sp.stats.fireRateMult.toFixed(2)}</span>
          <span class="stat-box-sub">${atkSpdBonus >= 0 ? `+${atkSpdBonus}% Tốc đánh` : ''}</span>
        </div>
        <div class="ship-stat-box">
          <span class="stat-box-label">TỈ LỆ CHÍ MẠNG</span>
          <span class="stat-box-val" style="color: #f43f5e;">${critChancePct}%</span>
          <span class="stat-box-sub">Sát thương x${critDmgMult}</span>
        </div>
        <div class="ship-stat-box">
          <span class="stat-box-label">TẦM HÚT NGỌC & TẦM NHÌN</span>
          <span class="stat-box-val" style="color: #a855f7;">${magnetRange} px</span>
          <span class="stat-box-sub">🔭 Tầm nhìn: ${visionZoom}%</span>
        </div>
      `;
    }

    // Mobile Threat Auto-Fade: Tự làm mờ (opacity 0.15) khi quái vật áp sát < 230px để chống điểm mù
    const isAnyPanelOpen = (!damageMeterPanel.classList.contains('hidden')) || (shipStatsPanel && !shipStatsPanel.classList.contains('hidden'));
    if (isAnyPanelOpen && game.state === 'playing' && game.player) {
      let isThreatNear = false;
      const px = game.player.x;
      const py = game.player.y;
      const thresholdSq = 230 * 230;
      const enemies = game.enemies || [];
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (e.isDead) continue;
        const dx = e.x - px;
        const dy = e.y - py;
        if (dx * dx + dy * dy < thresholdSq) {
          isThreatNear = true;
          break;
        }
      }

      if (isThreatNear) {
        damageMeterPanel.classList.add('threat-fade');
        if (shipStatsPanel) shipStatsPanel.classList.add('threat-fade');
      } else {
        damageMeterPanel.classList.remove('threat-fade');
        if (shipStatsPanel) shipStatsPanel.classList.remove('threat-fade');
      }
    }

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
});
