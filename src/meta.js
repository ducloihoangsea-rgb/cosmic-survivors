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
      hull: 0,       // Max HP (+25 per rank)
      reactor: 0,    // Damage (+10% per rank)
      magnet: 0,     // Magnet Radius (+20% per rank)
      revive: 0,     // Extra Lives (1 per rank, max 2)
      greed: 0       // Gold Multiplier (+25% per rank)
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
    const baseCosts = {
      hull: [40, 90, 180, 350, 700],
      reactor: [50, 110, 220, 450, 900],
      magnet: [30, 70, 140, 280, 560],
      revive: [300, 900],
      greed: [40, 80, 160, 320, 640]
    };

    const costs = baseCosts[type];
    if (!costs || rank >= costs.length) return null; // Max rank reached
    return costs[rank];
  }

  getMaxRank(type) {
    const maxRanks = {
      hull: 5,
      reactor: 5,
      magnet: 5,
      revive: 2,
      greed: 5
    };
    return maxRanks[type] || 5;
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
    const mult = 1.0 + greedRank * 0.25;
    const earned = Math.round(amount * mult);
    this.gold += earned;
    this.save();
    return earned;
  }

  applyToPlayer(player) {
    // Apply permanent stats
    player.maxHp += (this.ranks.hull || 0) * 25;
    player.hp = player.maxHp;
    player.stats.damageMult += (this.ranks.reactor || 0) * 0.10;
    player.stats.magnetRadius += Math.round((this.ranks.magnet || 0) * 24);
    player.revivesLeft = this.ranks.revive || 0;
  }
}

export const meta = new MetaManager();
