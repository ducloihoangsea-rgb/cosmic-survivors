// Roguelite Upgrade Card Generation & Application
import { sound } from './audio.js';
import { i18n } from './i18n.js';
import { FloatingText } from './particles.js';

export class UpgradeSystem {
  constructor(game) {
    this.game = game;
  }

  // Roll rarity based on exact user weights:
  // Red Mythic: 1.5% (super rare 1-2%)
  // Yellow Legendary: 5.5%
  // Purple Epic: 16%
  // Blue Rare: 35%
  // White Common: 42%
  rollRarity() {
    const r = Math.random();
    if (r < 0.015) return 'Mythic';
    if (r < 0.07) return 'Legendary';
    if (r < 0.23) return 'Epic';
    if (r < 0.58) return 'Rare';
    return 'Common';
  }

  getMythicCards() {
    const player = this.game.player;
    const cards = [];

    // 1. Divine Destiny Pact (God-Tier Support)
    if (!player.forceMythicSingleChoice) {
      cards.push({
        id: 'godpact',
        categoryKey: 'support',
        category: i18n.t('categorySupport'),
        rarityKey: 'Mythic',
        rarity: i18n.t('rarityMythic'),
        icon: '⚡',
        title: i18n.t('godPactTitle'),
        desc: i18n.t('godPactDesc'),
        apply: () => {
          player.forceMythicSingleChoice = true;
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 60, i18n.t('destinyPactActivated'), '#ef4444', 22, true));
        }
      });
    }

    // 2. Cosmic Singularity (God-Tier Offense)
    if (!player.hasBlackHole) {
      cards.push({
        id: 'blackhole',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        rarityKey: 'Mythic',
        rarity: i18n.t('rarityMythic'),
        icon: '🕳️',
        title: i18n.t('blackHoleTitle'),
        desc: i18n.t('blackHoleDesc'),
        apply: () => {
          player.hasBlackHole = true;
          player.blackHoleTimer = 1.0;
        }
      });
    }

    // 3. Blood God Rampage (God-Tier Offense)
    if (!player.hasBloodGodFrenzy) {
      cards.push({
        id: 'bloodfrenzy',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        rarityKey: 'Mythic',
        rarity: i18n.t('rarityMythic'),
        icon: '🩸',
        title: i18n.t('bloodFrenzyTitle'),
        desc: i18n.t('bloodFrenzyDesc'),
        apply: () => {
          player.stats.damageMult += 1.0;
          player.hasBloodGodFrenzy = true;
        }
      });
    }

    // 4. Reaper Execution (God-Tier Offense)
    if (!player.hasReaperExecution) {
      cards.push({
        id: 'reaper',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        rarityKey: 'Mythic',
        rarity: i18n.t('rarityMythic'),
        icon: '💀',
        title: i18n.t('reaperTitle'),
        desc: i18n.t('reaperDesc'),
        apply: () => {
          player.hasReaperExecution = true;
        }
      });
    }

    // 5. Chronos Stasis (God-Tier Support)
    if (!player.hasChronosFreeze) {
      cards.push({
        id: 'chronos',
        categoryKey: 'support',
        category: i18n.t('categorySupport'),
        rarityKey: 'Mythic',
        rarity: i18n.t('rarityMythic'),
        icon: '⏳',
        title: i18n.t('chronosTitle'),
        desc: i18n.t('chronosDesc'),
        apply: () => {
          player.hasChronosFreeze = true;
          player.chronosTimer = 5.0;
          player.stats.damageMult += 0.6;
        }
      });
    }

    return cards;
  }

  generateCards() {
    const wm = this.game.weaponManager;
    const player = this.game.player;

    // Special Condition: "lần nâng cấp tiếp theo chỉ ra 1 lựa chọn duy nhất nhưng là kỹ năng hiếm mạnh"
    if (player.forceMythicSingleChoice) {
      player.forceMythicSingleChoice = false;
      const mythics = this.getMythicCards().filter(c => c.id !== 'godpact');
      if (mythics.length > 0) {
        const singleCard = mythics[Math.floor(Math.random() * mythics.length)];
        return [singleCard];
      }
    }

    const pool = [];

    // Helper for localized rarity & category
    const getRarity = (rarityKey) => ({
      key: rarityKey,
      label: i18n.t(`rarity${rarityKey}`)
    });

    // 1. Weapon upgrades (Category: Offense)
    if (wm.weapons.blaster.level < wm.weapons.blaster.maxLevel) {
      const isUnlock = wm.weapons.blaster.level === 0;
      const isEvo = wm.weapons.blaster.level === 4;
      const r = isEvo ? getRarity('Legendary') : (wm.weapons.blaster.level >= 2 ? getRarity('Rare') : getRarity('Common'));
      pool.push({
        id: 'blaster',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        title: isUnlock ? i18n.t('blasterUnlock') : `${i18n.t('blasterTitle')} Lv.${wm.weapons.blaster.level + 1}`,
        desc: isEvo ? i18n.t('blasterEvo') : i18n.t('blasterDesc'),
        rarityKey: r.key,
        rarity: r.label,
        icon: '⚡',
        apply: () => { wm.weapons.blaster.level++; }
      });
    }

    if (wm.weapons.orbs.level < wm.weapons.orbs.maxLevel) {
      const isUnlock = wm.weapons.orbs.level === 0;
      const isEvo = wm.weapons.orbs.level === 4;
      const r = isEvo ? getRarity('Legendary') : (wm.weapons.orbs.level >= 2 ? getRarity('Epic') : getRarity('Rare'));
      pool.push({
        id: 'orbs',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        title: isUnlock ? i18n.t('orbsUnlock') : `${i18n.t('orbsTitle')} Lv.${wm.weapons.orbs.level + 1}`,
        desc: isEvo ? i18n.t('orbsEvo') : i18n.t('orbsDesc'),
        rarityKey: r.key,
        rarity: r.label,
        icon: '🪐',
        apply: () => { wm.weapons.orbs.level++; }
      });
    }

    if (wm.weapons.lightning.level < wm.weapons.lightning.maxLevel) {
      const isUnlock = wm.weapons.lightning.level === 0;
      const isEvo = wm.weapons.lightning.level === 4;
      const r = isEvo ? getRarity('Legendary') : getRarity('Epic');
      pool.push({
        id: 'lightning',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        title: isUnlock ? i18n.t('lightningUnlock') : `${i18n.t('lightningTitle')} Lv.${wm.weapons.lightning.level + 1}`,
        desc: isEvo ? i18n.t('lightningEvo') : i18n.t('lightningDesc'),
        rarityKey: r.key,
        rarity: r.label,
        icon: '🌩️',
        apply: () => { wm.weapons.lightning.level++; }
      });
    }

    if (wm.weapons.glaive.level < wm.weapons.glaive.maxLevel) {
      const isUnlock = wm.weapons.glaive.level === 0;
      const isEvo = wm.weapons.glaive.level === 4;
      const r = isEvo ? getRarity('Legendary') : (wm.weapons.glaive.level >= 2 ? getRarity('Epic') : getRarity('Rare'));
      pool.push({
        id: 'glaive',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        title: isUnlock ? i18n.t('glaiveUnlock') : `${i18n.t('glaiveTitle')} Lv.${wm.weapons.glaive.level + 1}`,
        desc: i18n.t('glaiveDesc'),
        rarityKey: r.key,
        rarity: r.label,
        icon: '🌀',
        apply: () => { wm.weapons.glaive.level++; }
      });
    }

    if (wm.weapons.missiles.level < wm.weapons.missiles.maxLevel) {
      const isUnlock = wm.weapons.missiles.level === 0;
      const isEvo = wm.weapons.missiles.level === 4;
      const r = isEvo ? getRarity('Legendary') : getRarity('Epic');
      pool.push({
        id: 'missiles',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        title: isUnlock ? i18n.t('missilesUnlock') : `${i18n.t('missilesTitle')} Lv.${wm.weapons.missiles.level + 1}`,
        desc: isEvo ? i18n.t('missilesEvo') : i18n.t('missilesDesc'),
        rarityKey: r.key,
        rarity: r.label,
        icon: '🚀',
        apply: () => { wm.weapons.missiles.level++; }
      });
    }

    if (wm.weapons.wingmen.level < wm.weapons.wingmen.maxLevel) {
      const isUnlock = wm.weapons.wingmen.level === 0;
      const isEvo = wm.weapons.wingmen.level === 4;
      const r = isEvo ? getRarity('Legendary') : getRarity('Epic');
      pool.push({
        id: 'wingmen',
        categoryKey: 'offense',
        category: i18n.t('categoryOffense'),
        title: isUnlock ? i18n.t('wingmenUnlock') : `${i18n.t('wingmenTitle')} Lv.${wm.weapons.wingmen.level + 1}`,
        desc: isEvo ? i18n.t('wingmenEvo') : i18n.t('wingmenDesc'),
        rarityKey: r.key,
        rarity: r.label,
        icon: '🛸',
        apply: () => { wm.weapons.wingmen.level++; }
      });
    }

    // 2. Stat Buffs (Category: Support)
    const rCommon = getRarity('Common');
    const rRare = getRarity('Rare');
    const rEpic = getRarity('Epic');
    const rLegendary = getRarity('Legendary');

    pool.push({
      id: 'overclock',
      categoryKey: 'support',
      category: i18n.t('categorySupport'),
      title: i18n.t('overclockTitle'),
      desc: i18n.t('overclockDesc'),
      rarityKey: rCommon.key,
      rarity: rCommon.label,
      icon: '⏱️',
      apply: () => { player.stats.fireRateMult += 0.25; }
    });

    pool.push({
      id: 'hypercharge',
      categoryKey: 'support',
      category: i18n.t('categorySupport'),
      title: i18n.t('hyperchargeTitle'),
      desc: i18n.t('hyperchargeDesc'),
      rarityKey: rRare.key,
      rarity: rRare.label,
      icon: '💥',
      apply: () => { player.stats.damageMult += 0.25; }
    });

    pool.push({
      id: 'gravitywell',
      categoryKey: 'support',
      category: i18n.t('categorySupport'),
      title: i18n.t('gravitywellTitle'),
      desc: i18n.t('gravitywellDesc'),
      rarityKey: rCommon.key,
      rarity: rCommon.label,
      icon: '🧲',
      apply: () => { player.stats.magnetRadius = Math.round(player.stats.magnetRadius * 1.5); }
    });

    pool.push({
      id: 'warpengine',
      categoryKey: 'support',
      category: i18n.t('categorySupport'),
      title: i18n.t('warpengineTitle'),
      desc: i18n.t('warpengineDesc'),
      rarityKey: rCommon.key,
      rarity: rCommon.label,
      icon: '🚀',
      apply: () => { player.stats.speedMult += 0.20; }
    });

    pool.push({
      id: 'eaglesight',
      categoryKey: 'support',
      category: i18n.t('categorySupport'),
      title: i18n.t('eaglesightTitle'),
      desc: i18n.t('eaglesightDesc'),
      rarityKey: rRare.key,
      rarity: rRare.label,
      icon: '👁️',
      apply: () => {
        this.game.cameraZoom = Math.max(0.65, (this.game.cameraZoom || 1.0) * 0.82);
        player.stats.visionBonus = (player.stats.visionBonus || 0) + 0.35;
      }
    });

    pool.push({
      id: 'criticalsurge',
      categoryKey: 'support',
      category: i18n.t('categorySupport'),
      title: i18n.t('criticalsurgeTitle'),
      desc: i18n.t('criticalsurgeDesc'),
      rarityKey: rEpic.key,
      rarity: rEpic.label,
      icon: '🎯',
      apply: () => {
        player.stats.critChance = Math.min(0.85, player.stats.critChance + 0.15);
        player.stats.critMult += 0.4;
      }
    });

    pool.push({
      id: 'nanorepair',
      categoryKey: 'support',
      category: i18n.t('categorySupport'),
      title: i18n.t('nanorepairTitle'),
      desc: i18n.t('nanorepairDesc'),
      rarityKey: rRare.key,
      rarity: rRare.label,
      icon: '💉',
      apply: () => {
        player.maxHp += 25;
        player.hp = Math.min(player.maxHp, player.hp + 60);
      }
    });

    // Legendary Instant Nuke
    pool.push({
      id: 'tacticalnuke',
      categoryKey: 'offense',
      category: i18n.t('categoryOffense'),
      title: i18n.t('tacticalnukeTitle'),
      desc: i18n.t('tacticalnukeDesc'),
      rarityKey: rLegendary.key,
      rarity: rLegendary.label,
      icon: '☢️',
      apply: () => { this.game.triggerNuke(); }
    });

    // Red Mythic Pool (1-2% drop rate)
    const mythics = this.getMythicCards();

    // Pick 3 unique cards respecting rarity rolls
    const selected = [];
    const usedIds = new Set();

    for (let slot = 0; slot < 3; slot++) {
      const rolledRarity = this.rollRarity();
      let candidates = [];

      if (rolledRarity === 'Mythic' && mythics.length > 0) {
        candidates = mythics.filter(c => !usedIds.has(c.id));
      }

      if (candidates.length === 0) {
        candidates = pool.filter(c => c.rarityKey === rolledRarity && !usedIds.has(c.id));
      }

      // Fallback if no matching card in rolled rarity
      if (candidates.length === 0) {
        candidates = pool.filter(c => !usedIds.has(c.id));
      }

      if (candidates.length > 0) {
        const picked = candidates[Math.floor(Math.random() * candidates.length)];
        usedIds.add(picked.id);
        selected.push(picked);
      }
    }

    // Safety fallback
    if (selected.length < 3) {
      const remaining = pool.filter(c => !usedIds.has(c.id));
      while (selected.length < 3 && remaining.length > 0) {
        const p = remaining.pop();
        if (!usedIds.has(p.id)) {
          usedIds.add(p.id);
          selected.push(p);
        }
      }
    }

    return selected;
  }
}
