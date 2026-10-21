// Permanent Meta-Progression (Ship Hangar & Tech Tree)
// Saves persistent upgrades in localStorage to provide endless retention loop.

export class MetaManager {
  constructor() {
    this.storageKey = 'dopamine_meta_v1';
    this.goldKey = 'dopamine_gold';
    this.load();
  }

  load() {
    this.gold = parseInt(localStorage.getItem(this.goldKey) || '0', 10);
    const saved = localStorage.getItem(this.storageKey);
    const defaults = {
      hull: 0,       // Max HP (+25/rank -> +375 HP)
      reactor: 0,    // Damage (+8%/rank -> +120% DMG)
      firerate: 0,   // Fire Rate (+4%/rank -> +60% Fire Rate)
      speed: 0,      // Move Speed (+3%/rank -> +45% Speed)
      shield: 0,     // Max Shield (+15 Shield/rank -> +225 Shield)
      crit: 0,       // Crit Chance (+2%/rank) & Crit Dmg (+5%/rank)
      regen: 0,      // HP Regen (+0.5 HP/s per rank -> +7.5 HP/s)
      magnet: 0,     // Magnet Radius (+15px/rank -> +225px)
      luck: 0,       // Luck Bonus (+3%/rank -> +45% Luck)
      cooldown: 0,   // Cooldown Reduction (-2.5%/rank -> -37.5% CD)
      greed: 0,      // Gold Multiplier (+10%/rank -> +150% Gold)
      revive: 0,     // Extra Lives (+1 revive per 5 ranks -> max 3)
      corepower: 0,  // Core Overcharge (+6%/rank -> +90% Core Skill Power)
      coredrop: 0,   // High-Tier Core Resonance (+4%/rank -> +60% Rare/Epic/Mythic/Awakening Rate)
      area: 0,       // Blast Wave Expander (+4%/rank -> +60% AoE Radius)
      lifesteal: 0   // Vampiric Siphon (+0.4%/rank -> +6% Lifesteal on Kill)
    };

    if (saved) {
      try {
        this.ranks = { ...defaults, ...JSON.parse(saved) };
      } catch (e) {
        this.ranks = defaults;
      }
    } else {
      this.ranks = defaults;
    }

    // Kho Vũ Khí Phụ & Kho Drone (Mục 6 & 12)
    const savedArsenal = localStorage.getItem('dopamine_arsenal');
    this.equippedSecondaryWeapons = savedArsenal ? JSON.parse(savedArsenal) : ['laser'];
    const savedDrones = localStorage.getItem('dopamine_drones');
    this.equippedDrones = savedDrones ? JSON.parse(savedDrones) : ['drone_scout', 'drone_strike'];
  }

  toggleEquipWeapon(id) {
    if (this.equippedSecondaryWeapons.includes(id)) {
      this.equippedSecondaryWeapons = this.equippedSecondaryWeapons.filter(w => w !== id);
    } else {
      if (this.equippedSecondaryWeapons.length >= 2) {
        this.equippedSecondaryWeapons.shift(); // Tối đa 2 vũ khí phụ
      }
      this.equippedSecondaryWeapons.push(id);
    }
    localStorage.setItem('dopamine_arsenal', JSON.stringify(this.equippedSecondaryWeapons));
  }

  toggleEquipDrone(id) {
    if (this.equippedDrones.includes(id)) {
      this.equippedDrones = this.equippedDrones.filter(d => d !== id);
    } else {
      if (this.equippedDrones.length >= 2) {
        this.equippedDrones.shift(); // Tối đa 2 drone hộ tống
      }
      this.equippedDrones.push(id);
    }
    localStorage.setItem('dopamine_drones', JSON.stringify(this.equippedDrones));
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.ranks));
    localStorage.setItem(this.goldKey, this.gold.toString());
  }

  getCost(type) {
    const rank = this.ranks[type] || 0;
    if (rank >= 20) return null; // Tối đa 20 cấp nâng cấp (Mục 16)

    // Chi phí tăng theo cấp số nhân (Mục 1 & 16: Cần ít nhất ~40h cày cuốc để max toàn bộ)
    const isPremium = ['reactor', 'crit', 'cooldown', 'revive', 'corepower', 'coredrop', 'lifesteal'].includes(type);
    const base = isPremium ? 75 : 50;
    const mult = isPremium ? 1.42 : 1.38;
    return Math.round(base * Math.pow(mult, rank));
  }

  getMaxRank(type) {
    return 20;
  }

  upgrade(type) {
    const cost = this.getCost(type);
    if (cost === null || this.gold < cost) return false;

    this.gold -= cost;
    this.ranks[type] = (this.ranks[type] || 0) + 1;
    this.save();
    return true;
  }

  addGold(amount) {
    const greedRank = this.ranks.greed || 0;
    const mult = 1.0 + greedRank * 0.10;
    const earned = Math.round(amount * mult);
    this.gold += earned;
    this.save();
    return earned;
  }

  applyToPlayer(player) {
    const r = this.ranks;

    // 1. Hull (+25 Max HP per rank)
    const bonusHp = (r.hull || 0) * 25;
    player.maxHp += bonusHp;
    player.hp = player.maxHp;

    // 2. Reactor (+8% Damage per rank)
    player.stats.damageMult += (r.reactor || 0) * 0.08;

    // 3. Fire Rate (+4% Fire Rate per rank)
    player.stats.fireRateMult += (r.firerate || 0) * 0.04;

    // 4. Movement Speed (+3% Speed per rank)
    player.stats.speedMult += (r.speed || 0) * 0.03;

    // 5. Shield (+15 Shield per rank)
    const bonusShield = (r.shield || 0) * 15;
    player.shieldMaxHp = (player.shieldMaxHp || 0) + bonusShield;
    player.shieldHp = player.shieldMaxHp;

    // 6. Crit (+2% Crit Chance, +5% Crit Mult per rank)
    player.stats.critChance += (r.crit || 0) * 0.02;
    player.stats.critMult += (r.crit || 0) * 0.05;

    // 7. HP Regeneration (+0.5 HP/sec per rank)
    player.hpRegen = (player.hpRegen || 0) + (r.regen || 0) * 0.5;

    // 8. Magnet (+15px radius per rank)
    player.stats.magnetRadius += (r.magnet || 0) * 15;

    // 9. Luck (+3% luck bonus per rank)
    player.luckBonus = (player.luckBonus || 0) + (r.luck || 0) * 3;

    // 10. Cooldown Reduction (-2.5% cooldown per rank)
    player.cooldownReduction = (player.cooldownReduction || 0) + (r.cooldown || 0) * 0.025;

    // 11. Revives (1 revive per 5 ranks: at rank 5, 10, 15 -> max 3)
    player.revivesLeft = (player.revivesLeft || 0) + Math.floor((r.revive || 0) / 5);

    // 12. Core Overcharge (+6% Core Power & Skill damage per rank)
    player.corePowerBonus = (r.corepower || 0) * 0.06;
    player.stats.damageMult += player.corePowerBonus;

    // 13. High-Tier Core Resonance (+4% High Tier Luck per rank)
    player.highTierLuck = (r.coredrop || 0) * 0.04;

    // 14. Blast Area (+4% AoE Explosion & Shockwave Radius per rank)
    player.stats.blastRadiusMult = (player.stats.blastRadiusMult || 1.0) + (r.area || 0) * 0.04;
    player.stats.shieldRadiusMult = (player.stats.shieldRadiusMult || 1.0) + (r.area || 0) * 0.04;

    // 15. Vampiric Lifesteal (+0.4% chance to heal on kill per rank)
    player.lifesteal = (player.lifesteal || 0) + (r.lifesteal || 0) * 0.004;
  }
}

export const meta = new MetaManager();
