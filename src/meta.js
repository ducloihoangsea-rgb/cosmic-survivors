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
      revive: 0      // Extra Lives (+1 revive per 5 ranks -> max 3)
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
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.ranks));
    localStorage.setItem(this.goldKey, this.gold.toString());
  }

  getCost(type) {
    const rank = this.ranks[type] || 0;
    // 15 progressive rank cost curves
    const standardCosts = [
      40, 75, 120, 180, 260, 360, 490, 650, 850, 1100, 1400, 1800, 2300, 3000, 4000
    ];
    const premiumCosts = [
      60, 110, 180, 280, 420, 600, 820, 1100, 1450, 1900, 2500, 3300, 4400, 5800, 7800
    ];

    const baseCosts = {
      hull: standardCosts,
      reactor: premiumCosts,
      firerate: standardCosts,
      speed: standardCosts,
      shield: standardCosts,
      crit: premiumCosts,
      regen: standardCosts,
      magnet: standardCosts,
      luck: standardCosts,
      cooldown: premiumCosts,
      greed: standardCosts,
      revive: premiumCosts
    };

    const costs = baseCosts[type] || standardCosts;
    if (rank >= costs.length) return null; // Max rank reached
    return costs[rank];
  }

  getMaxRank(type) {
    return 15;
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
  }
}

export const meta = new MetaManager();
