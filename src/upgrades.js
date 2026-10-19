// Roguelite Upgrade Card Generation & Application
import { sound } from './audio.js';
import { i18n } from './i18n.js';
import { FloatingText } from './particles.js';
import { getCyberSkillIcon } from './cyberIcons.js';

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
    const luck = (this.game?.player?.luckBonus || 0) * 0.01; // e.g. 3% -> 0.03
    const r = Math.random();
    if (r < 0.015 + luck * 0.15) return 'Mythic';
    if (r < 0.07 + luck * 0.45) return 'Legendary';
    if (r < 0.23 + luck * 0.75) return 'Epic';
    if (r < 0.58 + luck * 1.0) return 'Rare';
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
        icon: getCyberSkillIcon('godpact'),
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
        icon: getCyberSkillIcon('blackhole'),
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
        icon: getCyberSkillIcon('bloodfrenzy'),
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
        icon: getCyberSkillIcon('reaper'),
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
        icon: getCyberSkillIcon('chronos'),
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

    const rCommon = getRarity('Common');
    const rRare = getRarity('Rare');
    const rEpic = getRarity('Epic');
    const rLegendary = getRarity('Legendary');
    const rAwakening = getRarity('Awakening');

    const getBuffLvl = (id) => player.buffLevels?.[id] || 0;

    // ==========================================
    // NHÓM 1: NÂNG CẤP CHỈ SỐ (Phổ thông)
    // ==========================================

    // 1. Gia Tốc (Thrust): Tốc độ bay +25%, tốc độ xoay tàu +15%
    if (getBuffLvl('thrust') < 5) {
      pool.push({
        id: 'thrust',
        categoryKey: 'stat',
        category: i18n.t('categoryStat'),
        title: `${i18n.t('thrustTitle')} Lv.${getBuffLvl('thrust') + 1}`,
        desc: i18n.t('thrustDesc'),
        rarityKey: rCommon.key,
        rarity: rCommon.label,
        icon: '🚀',
        currentLevel: getBuffLvl('thrust'),
        nextLevel: getBuffLvl('thrust') + 1,
        maxLevel: 5,
        apply: () => {
          player.stats.speedMult += 0.25;
          player.turnSpeedMult = (player.turnSpeedMult || 1.0) + 0.15;
          if (player.buffLevels) player.buffLevels.thrust = (player.buffLevels.thrust || 0) + 1;
        }
      });
    }

    // 2. Khuếch Đại (Juggernaut): Tăng 40% kích thước & khối lượng tàu, tăng 30% máu, giảm 15% tốc độ xoay
    if (getBuffLvl('juggernaut') < 3) {
      pool.push({
        id: 'juggernaut',
        categoryKey: 'stat',
        category: i18n.t('categoryStat'),
        title: `${i18n.t('juggernautTitle')} Lv.${getBuffLvl('juggernaut') + 1}`,
        desc: i18n.t('juggernautDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🛡️',
        currentLevel: getBuffLvl('juggernaut'),
        nextLevel: getBuffLvl('juggernaut') + 1,
        maxLevel: 3,
        apply: () => {
          player.radius = Math.round(player.radius * 1.4);
          player.stats.mass = (player.stats.mass || 1.0) * 1.4;
          player.maxHp = Math.round(player.maxHp * 1.3);
          player.hp = Math.min(player.maxHp, Math.round(player.hp * 1.3));
          player.turnSpeedMult = Math.max(0.35, (player.turnSpeedMult || 1.0) - 0.15);
          if (player.buffLevels) player.buffLevels.juggernaut = (player.buffLevels.juggernaut || 0) + 1;
        }
      });
    }

    // 3. Thu Nhỏ (Micro-Craft): Giảm 30% kích thước hitbox, tốc độ bay +35% (né đạn siêu dễ)
    if (getBuffLvl('microcraft') < 3) {
      pool.push({
        id: 'microcraft',
        categoryKey: 'stat',
        category: i18n.t('categoryStat'),
        title: `${i18n.t('microcraftTitle')} Lv.${getBuffLvl('microcraft') + 1}`,
        desc: i18n.t('microcraftDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🛸',
        currentLevel: getBuffLvl('microcraft'),
        nextLevel: getBuffLvl('microcraft') + 1,
        maxLevel: 3,
        apply: () => {
          player.radius = Math.max(8, Math.round(player.radius * 0.7));
          player.stats.speedMult += 0.35;
          if (player.buffLevels) player.buffLevels.microcraft = (player.buffLevels.microcraft || 0) + 1;
        }
      });
    }

    // 4. Lõi Năng Lượng (Energy Core): Tốc độ hồi khiên +40%, giảm thời gian kích nổ khiên
    if (getBuffLvl('energycore') < 3) {
      pool.push({
        id: 'energycore',
        categoryKey: 'stat',
        category: i18n.t('categoryStat'),
        title: `${i18n.t('energycoreTitle')} Lv.${getBuffLvl('energycore') + 1}`,
        desc: i18n.t('energycoreDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🔋',
        currentLevel: getBuffLvl('energycore'),
        nextLevel: getBuffLvl('energycore') + 1,
        maxLevel: 3,
        apply: () => {
          player.shieldRechargeSpeed = (player.shieldRechargeSpeed || 1.0) + 0.40;
          player.shieldBurstDelayMult = Math.max(0.4, (player.shieldBurstDelayMult || 1.0) * 0.75);
          if (player.isShieldNova) {
            player.shieldEnergy = player.maxShieldEnergy || 100;
          }
          if (player.buffLevels) player.buffLevels.energycore = (player.buffLevels.energycore || 0) + 1;
        }
      });
    }

    // 5. Mọc Đốt (Grow Segments): Thêm 2 đốt thân phía sau (Tàu Rắn) hoặc kéo dài vệt lửa phản lực gây cháy (Tàu khác)
    if (getBuffLvl('growsegments') < 3) {
      pool.push({
        id: 'growsegments',
        categoryKey: 'stat',
        category: i18n.t('categoryStat'),
        title: `${i18n.t('growsegmentsTitle')} Lv.${getBuffLvl('growsegments') + 1}`,
        desc: i18n.t('growsegmentsDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🐉',
        currentLevel: getBuffLvl('growsegments'),
        nextLevel: getBuffLvl('growsegments') + 1,
        maxLevel: 3,
        apply: () => {
          if (player.isSerpent || player.shipId === 'ship_serpent') {
            player.stats.bonusSegments = (player.stats.bonusSegments || 0) + 2;
          } else {
            player.hasFlameTrail = true;
            player.flameTrailLevel = (player.flameTrailLevel || 0) + 1;
          }
          if (player.buffLevels) player.buffLevels.growsegments = (player.buffLevels.growsegments || 0) + 1;
        }
      });
    }

    // 6. Sửa Chữa Khẩn Cấp (Nanorepair)
    if (getBuffLvl('nanorepair') < 5) {
      pool.push({
        id: 'nanorepair',
        categoryKey: 'stat',
        category: i18n.t('categoryStat'),
        title: `${i18n.t('nanorepairTitle')} Lv.${getBuffLvl('nanorepair') + 1}`,
        desc: i18n.t('nanorepairDesc'),
        rarityKey: rCommon.key,
        rarity: rCommon.label,
        icon: '💉',
        currentLevel: getBuffLvl('nanorepair'),
        nextLevel: getBuffLvl('nanorepair') + 1,
        maxLevel: 5,
        apply: () => {
          player.maxHp += 25;
          player.hp = Math.min(player.maxHp, player.hp + 60);
          if (player.buffLevels) player.buffLevels.nanorepair = (player.buffLevels.nanorepair || 0) + 1;
        }
      });
    }

    // 7. Ống Kính Vũ Trụ (Cosmic Scope): Mở rộng 25% tầm nhìn camera, +45px bán kính hút ngọc
    if (getBuffLvl('cosmicscope') < 3) {
      pool.push({
        id: 'cosmicscope',
        categoryKey: 'stat',
        category: i18n.t('categoryStat'),
        title: `${i18n.t('cosmicScopeTitle')} Lv.${getBuffLvl('cosmicscope') + 1}`,
        desc: i18n.t('cosmicScopeDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🔭',
        currentLevel: getBuffLvl('cosmicscope'),
        nextLevel: getBuffLvl('cosmicscope') + 1,
        maxLevel: 3,
        apply: () => {
          player.stats.magnetRadius = (player.stats.magnetRadius || 130) + 45;
          if (player.buffLevels) player.buffLevels.cosmicscope = (player.buffLevels.cosmicscope || 0) + 1;
        }
      });
    }

    // ==========================================
    // NHÓM 2: ĐỘT BIẾN LỐI CHƠI (Biến đổi cơ chế)
    // ==========================================

    // KỸ NĂNG ĐẶC BIỆT: Hạm Đội Drone (Chỉ xuất hiện cho Tàu Carrier)
    const droneLvl = player.droneLevel || 1;
    if (player.isCarrier && droneLvl < 5) {
      const isNextEvo = (droneLvl + 1) === 5;
      pool.push({
        id: 'drone_upgrade',
        categoryKey: 'mutation',
        category: i18n.t('categoryMutation'),
        title: isNextEvo 
          ? i18n.t('upgradeDroneEvoTitle') 
          : `${i18n.t('upgradeDroneTitle')} Lv.${droneLvl + 1}`,
        desc: isNextEvo 
          ? i18n.t('upgradeDroneEvoDesc') 
          : i18n.t('upgradeDroneDesc'),
        rarityKey: isNextEvo ? rLegendary.key : rRare.key,
        rarity: isNextEvo ? rLegendary.label : rRare.label,
        icon: '🛸',
        currentLevel: droneLvl,
        nextLevel: droneLvl + 1,
        maxLevel: 5,
        apply: () => {
          player.droneLevel = (player.droneLevel || 1) + 1;
          player.droneCooldownReduction = (player.droneCooldownReduction || 0) + 0.2;
          if (player.droneLevel >= 5) {
            player.isDroneEvolved = true;
            player.droneSpawnCount = 3;
            player.droneDuration = 18.0;
          }
          if (player.buffLevels) player.buffLevels.drone_upgrade = player.droneLevel;
        }
      });
    }

    // 7. Đâm Xuyên (Drill): Chỉ xuất hiện khi chọn tàu đâm (Rammer)
    if ((player.isRammer || player.shipId === 'rammer') && !player.hasDrill) {
      pool.push({
        id: 'drill',
        categoryKey: 'mutation',
        category: i18n.t('categoryMutation'),
        title: i18n.t('drillTitle'),
        desc: i18n.t('drillDesc'),
        rarityKey: rEpic.key,
        rarity: rEpic.label,
        icon: '🌪️',
        currentLevel: 0,
        nextLevel: 1,
        maxLevel: 1,
        apply: () => {
          player.hasDrill = true;
          if (player.buffLevels) player.buffLevels.drill = 1;
        }
      });
    }

    // 8. Khiên Lửa (Burn Field): Chỉ xuất hiện khi chọn tàu khiên (Nova Shield)
    if ((player.isShieldNova || player.shipId === 'novashield') && !player.hasBurnField) {
      pool.push({
        id: 'burnfield',
        categoryKey: 'mutation',
        category: i18n.t('categoryMutation'),
        title: i18n.t('burnfieldTitle'),
        desc: i18n.t('burnfieldDesc'),
        rarityKey: rEpic.key,
        rarity: rEpic.label,
        icon: '🔥',
        currentLevel: 0,
        nextLevel: 1,
        maxLevel: 1,
        apply: () => {
          player.hasBurnField = true;
          if (player.buffLevels) player.buffLevels.burnfield = 1;
        }
      });
    }

    // 9. Đạn Nảy (Ricochet): Đạn hoặc mảnh vỡ khi va chạm nảy sang mục tiêu lân cận
    if (!player.hasRicochet) {
      pool.push({
        id: 'ricochet',
        categoryKey: 'mutation',
        category: i18n.t('categoryMutation'),
        title: i18n.t('ricochetTitle'),
        desc: i18n.t('ricochetDesc'),
        rarityKey: rEpic.key,
        rarity: rEpic.label,
        icon: '💫',
        currentLevel: 0,
        nextLevel: 1,
        maxLevel: 1,
        apply: () => {
          player.hasRicochet = true;
          if (player.buffLevels) player.buffLevels.ricochet = 1;
        }
      });
    }

    // 10. Khí Độc Đuôi (Toxic Exhaust): Đuôi tàu (hoặc các đốt rắn) xả khói làm chậm và rút máu quái đi vào
    if (!player.hasToxicExhaust) {
      pool.push({
        id: 'toxicexhaust',
        categoryKey: 'mutation',
        category: i18n.t('categoryMutation'),
        title: i18n.t('toxicexhaustTitle'),
        desc: i18n.t('toxicexhaustDesc'),
        rarityKey: rEpic.key,
        rarity: rEpic.label,
        icon: '☣️',
        currentLevel: 0,
        nextLevel: 1,
        maxLevel: 1,
        apply: () => {
          player.hasToxicExhaust = true;
          if (player.buffLevels) player.buffLevels.toxicexhaust = 1;
        }
      });
    }

    // 11. Gai Phản Đòn (Spiked Thorns): Phản lại 100% sát thương va chạm
    if (getBuffLvl('spikedthorns') < 3) {
      pool.push({
        id: 'spikedthorns',
        categoryKey: 'mutation',
        category: i18n.t('categoryMutation'),
        title: `${i18n.t('spikedThornsTitle')} Lv.${getBuffLvl('spikedthorns') + 1}`,
        desc: i18n.t('spikedThornsDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🌵',
        currentLevel: getBuffLvl('spikedthorns'),
        nextLevel: getBuffLvl('spikedthorns') + 1,
        maxLevel: 3,
        apply: () => {
          player.stats.thorns = (player.stats.thorns || 0) + 1.0;
          if (player.buffLevels) player.buffLevels.spikedthorns = (player.buffLevels.spikedthorns || 0) + 1;
        }
      });
    }

    // ==========================================
    // NHÓM 3: SIÊU NÂNG CẤP (Fusion Mods - Cấp 10+)
    // ==========================================
    if (player.level >= 10) {
      // 12. Bom Quán Tính (Crash Nova): Chỉ xuất hiện khi chọn tàu khiên (Nova Shield)
      if ((player.isShieldNova || player.shipId === 'novashield') && !player.hasCrashNova) {
        pool.push({
          id: 'crashnova',
          categoryKey: 'fusion',
          category: i18n.t('categoryFusion'),
          title: i18n.t('crashnovaTitle'),
          desc: i18n.t('crashnovaDesc'),
          rarityKey: rLegendary.key,
          rarity: rLegendary.label,
          icon: '💥',
          currentLevel: 0,
          nextLevel: 1,
          maxLevel: 1,
          apply: () => {
            player.hasCrashNova = true;
            if (player.buffLevels) player.buffLevels.crashnova = 1;
          }
        });
      }

      // 13. Mãng Xà Bọc Thép (Iron Dragon): Chỉ xuất hiện khi chọn tàu rắn (Serpent)
      if ((player.isSerpent || player.shipId === 'ship_serpent' || player.shipId === 'serpent') && !player.hasIronDragon) {
        pool.push({
          id: 'irondragon',
          categoryKey: 'fusion',
          category: i18n.t('categoryFusion'),
          title: i18n.t('irondragonTitle'),
          desc: i18n.t('irondragonDesc'),
          rarityKey: rLegendary.key,
          rarity: rLegendary.label,
          icon: '🐲',
          currentLevel: 0,
          nextLevel: 1,
          maxLevel: 1,
          apply: () => {
            player.hasIronDragon = true;
            if (player.buffLevels) player.buffLevels.irondragon = 1;
          }
        });
      }

      // 14. Bất Tử Hóa (Immortality): Chỉ xuất hiện khi chọn tàu khiên (Nova Shield)
      if ((player.isShieldNova || player.shipId === 'novashield') && !player.hasImmortality) {
        pool.push({
          id: 'immortality',
          categoryKey: 'fusion',
          category: i18n.t('categoryFusion'),
          title: i18n.t('immortalityTitle'),
          desc: i18n.t('immortalityDesc'),
          rarityKey: rLegendary.key,
          rarity: rLegendary.label,
          icon: '⚚',
          currentLevel: 0,
          nextLevel: 1,
          maxLevel: 1,
          apply: () => {
            player.hasImmortality = true;
            player.shieldEnergy = player.maxShieldEnergy || 120;
            player.hp = 1;
            if (player.buffLevels) player.buffLevels.immortality = 1;
          }
        });
      }

      // 15. Bom Hạt Nhân (Tactical Nuke)
      pool.push({
        id: 'tacticalnuke',
        categoryKey: 'fusion',
        category: i18n.t('categoryFusion'),
        title: i18n.t('tacticalnukeTitle'),
        desc: i18n.t('tacticalnukeDesc'),
        rarityKey: rLegendary.key,
        rarity: rLegendary.label,
        icon: '☢️',
        apply: () => { this.game.triggerNuke(); }
      });
    }

    // ==========================================
    // NHÓM 4: LÕI PHỤ TRỢ (Support Cores - Đạt cấp mở khóa Thức Tỉnh)
    // ==========================================
    // 1. Lõi Tốc Đánh (core_firerate)
    if (getBuffLvl('core_firerate') < 5) {
      pool.push({
        id: 'core_firerate',
        categoryKey: 'core',
        category: i18n.t('categoryCore'),
        title: `${i18n.t('core_firerateTitle')} Lv.${getBuffLvl('core_firerate') + 1}`,
        desc: i18n.t('core_firerateDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '⚡',
        currentLevel: getBuffLvl('core_firerate'),
        nextLevel: getBuffLvl('core_firerate') + 1,
        maxLevel: 5,
        apply: () => {
          player.stats.fireRateMult = (player.stats.fireRateMult || 1.0) + 0.20;
          if (player.buffLevels) player.buffLevels.core_firerate = (player.buffLevels.core_firerate || 0) + 1;
        }
      });
    }

    // 2. Lõi Bán Kính Nổ (core_blast)
    if (getBuffLvl('core_blast') < 5) {
      pool.push({
        id: 'core_blast',
        categoryKey: 'core',
        category: i18n.t('categoryCore'),
        title: `${i18n.t('core_blastTitle')} Lv.${getBuffLvl('core_blast') + 1}`,
        desc: i18n.t('core_blastDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '💥',
        currentLevel: getBuffLvl('core_blast'),
        nextLevel: getBuffLvl('core_blast') + 1,
        maxLevel: 5,
        apply: () => {
          player.stats.blastRadiusMult = (player.stats.blastRadiusMult || 1.0) + 0.35;
          if (player.buffLevels) player.buffLevels.core_blast = (player.buffLevels.core_blast || 0) + 1;
        }
      });
    }

    // 3. Lõi Triệu Hồi (core_summon)
    if (getBuffLvl('core_summon') < 5) {
      pool.push({
        id: 'core_summon',
        categoryKey: 'core',
        category: i18n.t('categoryCore'),
        title: `${i18n.t('core_summonTitle')} Lv.${getBuffLvl('core_summon') + 1}`,
        desc: i18n.t('core_summonDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🛸',
        currentLevel: getBuffLvl('core_summon'),
        nextLevel: getBuffLvl('core_summon') + 1,
        maxLevel: 5,
        apply: () => {
          player.stats.summonDmgMult = (player.stats.summonDmgMult || 1.0) + 0.40;
          if (player.buffLevels) player.buffLevels.core_summon = (player.buffLevels.core_summon || 0) + 1;
        }
      });
    }

    // 4. Lõi Tầm Xa (core_range)
    if (getBuffLvl('core_range') < 5) {
      pool.push({
        id: 'core_range',
        categoryKey: 'core',
        category: i18n.t('categoryCore'),
        title: `${i18n.t('core_rangeTitle')} Lv.${getBuffLvl('core_range') + 1}`,
        desc: i18n.t('core_rangeDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🔭',
        currentLevel: getBuffLvl('core_range'),
        nextLevel: getBuffLvl('core_range') + 1,
        maxLevel: 5,
        apply: () => {
          player.stats.rangeMult = (player.stats.rangeMult || 1.0) + 0.35;
          if (player.buffLevels) player.buffLevels.core_range = (player.buffLevels.core_range || 0) + 1;
        }
      });
    }

    // 5. Lõi Khiên (core_shield)
    if (getBuffLvl('core_shield') < 5) {
      pool.push({
        id: 'core_shield',
        categoryKey: 'core',
        category: i18n.t('categoryCore'),
        title: `${i18n.t('core_shieldTitle')} Lv.${getBuffLvl('core_shield') + 1}`,
        desc: i18n.t('core_shieldDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🛡️',
        currentLevel: getBuffLvl('core_shield'),
        nextLevel: getBuffLvl('core_shield') + 1,
        maxLevel: 5,
        apply: () => {
          player.maxShieldEnergy = (player.maxShieldEnergy || 100) + 50;
          player.shieldEnergy = (player.shieldEnergy || 0) + 50;
          player.shieldRechargeSpeed = (player.shieldRechargeSpeed || 1.0) + 0.25;
          if (player.buffLevels) player.buffLevels.core_shield = (player.buffLevels.core_shield || 0) + 1;
        }
      });
    }

    // 6. Lõi Giáp Thân Tàu (core_hull)
    if (getBuffLvl('core_hull') < 5) {
      pool.push({
        id: 'core_hull',
        categoryKey: 'core',
        category: i18n.t('categoryCore'),
        title: `${i18n.t('core_hullTitle')} Lv.${getBuffLvl('core_hull') + 1}`,
        desc: i18n.t('core_hullDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🦾',
        currentLevel: getBuffLvl('core_hull'),
        nextLevel: getBuffLvl('core_hull') + 1,
        maxLevel: 5,
        apply: () => {
          player.maxHp = Math.round(player.maxHp * 1.4);
          player.hp = Math.min(player.maxHp, player.hp + 60);
          player.stats.mass = (player.stats.mass || 1.0) * 1.35;
          if (player.buffLevels) player.buffLevels.core_hull = (player.buffLevels.core_hull || 0) + 1;
        }
      });
    }

    // 7. Lõi Đốt Rồng (core_tail)
    if (getBuffLvl('core_tail') < 5) {
      pool.push({
        id: 'core_tail',
        categoryKey: 'core',
        category: i18n.t('categoryCore'),
        title: `${i18n.t('core_tailTitle')} Lv.${getBuffLvl('core_tail') + 1}`,
        desc: i18n.t('core_tailDesc'),
        rarityKey: rRare.key,
        rarity: rRare.label,
        icon: '🐉',
        currentLevel: getBuffLvl('core_tail'),
        nextLevel: getBuffLvl('core_tail') + 1,
        maxLevel: 5,
        apply: () => {
          player.stats.bonusSegments = (player.stats.bonusSegments || 0) + 2;
          if (player.buffLevels) player.buffLevels.core_tail = (player.buffLevels.core_tail || 0) + 1;
        }
      });
    }

    // ==========================================
    // NHÓM 5: VŨ KHÍ TÀU (Nâng cấp & Mở khóa vũ khí mới)
    // ==========================================
    const weaponKeys = ['blaster', 'orbs', 'lightning', 'glaive', 'missiles', 'wingmen', 'laser', 'bombs'];
    const weaponIcons = { 
      blaster: getCyberSkillIcon('blaster'), 
      orbs: getCyberSkillIcon('orbs'), 
      lightning: getCyberSkillIcon('lightning'), 
      glaive: getCyberSkillIcon('glaive'), 
      missiles: getCyberSkillIcon('missiles'), 
      wingmen: getCyberSkillIcon('wingmen'),
      laser: getCyberSkillIcon('laser'),
      bombs: getCyberSkillIcon('bombs')
    };

    const activeWeaponsCount = weaponKeys.filter(k => wm.weapons[k] && wm.weapons[k].level > 0).length;

    for (const wKey of weaponKeys) {
      const weapon = wm.weapons[wKey];
      if (!weapon) continue;

      if (weapon.level > 0 && weapon.level < weapon.maxLevel) {
        const curLvl = weapon.level;
        const isEvo = curLvl === 4;
        const r = isEvo ? rLegendary : (curLvl >= 2 ? rRare : rCommon);
        pool.push({
          id: wKey,
          categoryKey: 'offense',
          category: i18n.t('categoryOffense'),
          title: `${i18n.t(`${wKey}Title`)} Lv.${curLvl + 1}`,
          desc: isEvo ? (i18n.t(`${wKey}Evo`) || i18n.t(`${wKey}Desc`)) : i18n.t(`${wKey}Desc`),
          rarityKey: r.key,
          rarity: r.label,
          icon: weaponIcons[wKey] || '⚡',
          currentLevel: curLvl,
          nextLevel: curLvl + 1,
          maxLevel: weapon.maxLevel,
          apply: () => { weapon.level++; }
        });
      } else if (weapon.level === 0 && activeWeaponsCount < 5) {
        pool.push({
          id: wKey,
          categoryKey: 'offense',
          category: i18n.t('categoryOffense'),
          title: `${i18n.t(`${wKey}Title`)} [MỞ KHÓA]`,
          desc: i18n.t(`${wKey}Desc`),
          rarityKey: rRare.key,
          rarity: rRare.label,
          icon: weaponIcons[wKey] || '⚡',
          currentLevel: 0,
          nextLevel: 1,
          maxLevel: weapon.maxLevel,
          apply: () => { weapon.level = 1; }
        });
      }
    }

    // ==========================================
    // NHÓM 0: THỨC TỈNH VŨ KHÍ & TÀU (Awakening / Evolution)
    // ==========================================
    const awakeningPool = [];

    // 1. Súng máy (Blaster Lv5) + Lõi Tốc Đánh (core_firerate)
    if (wm.weapons.blaster && wm.weapons.blaster.level >= 5 && getBuffLvl('core_firerate') >= 1 && !wm.weapons.blaster.isAwakened) {
      awakeningPool.push({
        id: 'awaken_blaster',
        categoryKey: 'awakening',
        category: i18n.t('categoryAwakening'),
        title: i18n.t('awakenBlasterTitle'),
        desc: i18n.t('awakenBlasterDesc'),
        rarityKey: rAwakening.key,
        rarity: rAwakening.label,
        icon: '🌟',
        apply: () => {
          wm.weapons.blaster.isAwakened = true;
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 70, '🌟 GATLING LASERSTORM! 🌟', '#facc15', 24, true));
          sound.playCrit();
        }
      });
    }

    // 2. Thả bom (Bombs Lv5) + Lõi Bán Kính Nổ (core_blast)
    if (wm.weapons.bombs && wm.weapons.bombs.level >= 5 && getBuffLvl('core_blast') >= 1 && !wm.weapons.bombs.isAwakened) {
      awakeningPool.push({
        id: 'awaken_bombs',
        categoryKey: 'awakening',
        category: i18n.t('categoryAwakening'),
        title: i18n.t('awakenBombsTitle'),
        desc: i18n.t('awakenBombsDesc'),
        rarityKey: rAwakening.key,
        rarity: rAwakening.label,
        icon: '🌟',
        apply: () => {
          wm.weapons.bombs.isAwakened = true;
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 70, '🌟 APOCALYPSE NUKE MINES! 🌟', '#facc15', 24, true));
          sound.playCrit();
        }
      });
    }

    // 3. Drone (Wingmen Lv5 / Carrier) + Lõi Triệu Hồi (core_summon)
    if (((wm.weapons.wingmen && wm.weapons.wingmen.level >= 5) || player.isCarrier) && getBuffLvl('core_summon') >= 1 && !player.isDroneAwakened && !wm.weapons.wingmen.isAwakened) {
      awakeningPool.push({
        id: 'awaken_drone',
        categoryKey: 'awakening',
        category: i18n.t('categoryAwakening'),
        title: i18n.t('awakenDroneTitle'),
        desc: i18n.t('awakenDroneDesc'),
        rarityKey: rAwakening.key,
        rarity: rAwakening.label,
        icon: '🌟',
        apply: () => {
          wm.weapons.wingmen.isAwakened = true;
          player.isDroneAwakened = true;
          if (player.isCarrier) {
            player.droneSpawnCount = 5;
            player.droneDuration = 999;
          }
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 70, '🌟 MOTHERSHIP ARMADA! 🌟', '#facc15', 24, true));
          sound.playCrit();
        }
      });
    }

    // 4. Laze (Laser Lv5) + Lõi Tầm Xa (core_range)
    if (wm.weapons.laser && wm.weapons.laser.level >= 5 && getBuffLvl('core_range') >= 1 && !wm.weapons.laser.isAwakened) {
      awakeningPool.push({
        id: 'awaken_laser',
        categoryKey: 'awakening',
        category: i18n.t('categoryAwakening'),
        title: i18n.t('awakenLaserTitle'),
        desc: i18n.t('awakenLaserDesc'),
        rarityKey: rAwakening.key,
        rarity: rAwakening.label,
        icon: '🌟',
        apply: () => {
          wm.weapons.laser.isAwakened = true;
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 70, '🌟 ORBITAL DEATH RAY! 🌟', '#facc15', 24, true));
          sound.playCrit();
        }
      });
    }

    // 5. Tàu Khiên + Lõi Khiên (core_shield)
    if ((player.isShieldNova || player.shipId === 'novashield') && getBuffLvl('core_shield') >= 1 && !player.isShieldAwakened) {
      awakeningPool.push({
        id: 'awaken_shield',
        categoryKey: 'awakening',
        category: i18n.t('categoryAwakening'),
        title: i18n.t('awakenShieldTitle'),
        desc: i18n.t('awakenShieldDesc'),
        rarityKey: rAwakening.key,
        rarity: rAwakening.label,
        icon: '🌟',
        apply: () => {
          player.isShieldAwakened = true;
          player.maxShieldEnergy = (player.maxShieldEnergy || 100) + 100;
          player.shieldEnergy = player.maxShieldEnergy;
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 70, '🌟 AEGIS OF ETERNITY! 🌟', '#facc15', 24, true));
          sound.playCrit();
        }
      });
    }

    // 6. Tàu Đâm + Lõi Giáp (core_hull)
    if ((player.isRammer || player.shipId === 'rammer') && getBuffLvl('core_hull') >= 1 && !player.isRammerAwakened) {
      awakeningPool.push({
        id: 'awaken_rammer',
        categoryKey: 'awakening',
        category: i18n.t('categoryAwakening'),
        title: i18n.t('awakenRammerTitle'),
        desc: i18n.t('awakenRammerDesc'),
        rarityKey: rAwakening.key,
        rarity: rAwakening.label,
        icon: '🌟',
        apply: () => {
          player.isRammerAwakened = true;
          player.stats.mass = (player.stats.mass || 1.0) * 2.5;
          player.radius = Math.round(player.radius * 1.3);
          player.stats.speedMult += 0.35;
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 70, '🌟 DREADNOUGHT LEVIATHAN! 🌟', '#facc15', 24, true));
          sound.playCrit();
        }
      });
    }

    // 7. Tàu Rắn + Lõi Đốt (core_tail)
    if ((player.isSerpent || player.shipId === 'ship_serpent' || player.shipId === 'serpent') && getBuffLvl('core_tail') >= 1 && !player.isSerpentAwakened) {
      awakeningPool.push({
        id: 'awaken_serpent',
        categoryKey: 'awakening',
        category: i18n.t('categoryAwakening'),
        title: i18n.t('awakenSerpentTitle'),
        desc: i18n.t('awakenSerpentDesc'),
        rarityKey: rAwakening.key,
        rarity: rAwakening.label,
        icon: '🌟',
        apply: () => {
          player.isSerpentAwakened = true;
          player.stats.bonusSegments = (player.stats.bonusSegments || 0) + 8;
          player.hasIronDragon = true;
          this.game.floatingTexts.push(new FloatingText(player.x, player.y - 70, '🌟 OUROBOROS GOD DRAGON! 🌟', '#facc15', 24, true));
          sound.playCrit();
        }
      });
    }

    // Red Mythic Pool (1-2% drop rate)
    const mythics = this.getMythicCards();

    // Ship Archetype Synergy Priority (Tăng 6x tỉ lệ ra nâng cấp theo hệ tàu + bảo đảm thẻ hợp hệ)
    const shipSynergyMap = {
      rammer: new Set(['juggernaut', 'nanorepair', 'spikedthorns', 'thrust', 'drill', 'core_hull', 'orbs', 'bombs']),
      serpent: new Set(['growsegments', 'toxicexhaust', 'irondragon', 'spikedthorns', 'microcraft', 'core_tail', 'glaive', 'lightning']),
      novashield: new Set(['energycore', 'burnfield', 'crashnova', 'immortality', 'core_shield', 'tacticalnuke', 'laser', 'missiles'])
    };
    const preferredSynergies = shipSynergyMap[player.shipId] || new Set();

    // Weighted picker prioritizing ship synergies (Trọng số 6.0x cho thẻ hợp hệ)
    const pickWeighted = (list) => {
      if (!list || list.length === 0) return null;
      let totalWeight = 0;
      const weights = list.map(c => {
        const w = preferredSynergies.has(c.id) ? 6.0 : 1.0;
        totalWeight += w;
        return totalWeight;
      });
      const r = Math.random() * totalWeight;
      for (let i = 0; i < list.length; i++) {
        if (r <= weights[i]) return list[i];
      }
      return list[list.length - 1];
    };

    // Pick exactly 3 unique cards
    const selected = [];
    const usedIds = new Set();

    // Slot 0: ƯU TIÊN TUYỆT ĐỐI cho Thức Tỉnh (Awakening) khi hội đủ điều kiện (Vũ khí Max Lv5 + Lõi)
    if (awakeningPool.length > 0) {
      const pickedAwakening = awakeningPool[Math.floor(Math.random() * awakeningPool.length)];
      if (pickedAwakening) {
        usedIds.add(pickedAwakening.id);
        selected.push(pickedAwakening);
      }
    }

    // Slot 1: ĐẢM BẢO luôn ưu tiên rút 1 thẻ hợp hệ (Phòng thủ cho Tank, Đốt cho Rắn, Khiên cho Nova)
    if (selected.length < 3) {
      const synergyCards = pool.filter(c => preferredSynergies.has(c.id) && !usedIds.has(c.id));
      if (synergyCards.length > 0 && Math.random() < 0.90) {
        const pickedSynergy = synergyCards[Math.floor(Math.random() * synergyCards.length)];
        if (pickedSynergy) {
          usedIds.add(pickedSynergy.id);
          selected.push(pickedSynergy);
        }
      }
    }

    // If level >= 10, guarantee at least 1 Fusion Mod slot if available (65% chance)
    if (selected.length < 3 && player.level >= 10 && Math.random() < 0.65) {
      const fusions = pool.filter(c => c.categoryKey === 'fusion' && !usedIds.has(c.id));
      if (fusions.length > 0) {
        const picked = pickWeighted(fusions);
        if (picked) {
          usedIds.add(picked.id);
          selected.push(picked);
        }
      }
    }

    // Fill remaining slots respecting rarity rolls and high synergy bias (6x weight)
    while (selected.length < 3) {
      const rolledRarity = this.rollRarity();
      let candidates = [];

      if (rolledRarity === 'Mythic' && mythics.length > 0) {
        candidates = mythics.filter(c => !usedIds.has(c.id));
      }

      if (candidates.length === 0) {
        candidates = pool.filter(c => c.rarityKey === rolledRarity && !usedIds.has(c.id));
      }

      // Fallback to any remaining card in pool
      if (candidates.length === 0) {
        candidates = pool.filter(c => !usedIds.has(c.id));
      }

      if (candidates.length > 0) {
        const picked = pickWeighted(candidates);
        if (picked) {
          usedIds.add(picked.id);
          selected.push(picked);
        } else {
          break;
        }
      } else {
        break; // Pool exhausted
      }
    }

    for (const card of selected) {
      if (!card.icon || typeof card.icon !== 'string' || !card.icon.includes('<svg')) {
        card.icon = getCyberSkillIcon(card.id, card.icon);
      }
    }

    return selected;
  }
}

