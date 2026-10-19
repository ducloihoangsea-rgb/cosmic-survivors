// Starship Customization & Skins Engine
// Manages persistent unlocks, cosmetic variations, milestone achievements, and luck bonuses.
import { i18n } from './i18n.js';

export const SHIP_SKINS = {
  rammer: [
    {
      id: 'default',
      nameKey: 'skinRammerDefault',
      descKey: 'skinRammerDefaultDesc',
      luckBonus: 0,
      unlocked: true,
      badge: 'DEFAULT',
      colors: {
        main: '#ef4444',
        accent: '#f97316',
        glow: '#dc2626',
        thruster: '#f97316',
        hullStart: '#090d16',
        hullMid: '#1e293b'
      }
    },
    {
      id: 'cyber',
      nameKey: 'skinRammerCyber',
      descKey: 'skinRammerCyberDesc',
      luckBonus: 3,
      milestoneKey: 'msKills300',
      badge: 'CYBER',
      condition: (m) => (m.totalKills || 0) >= 300,
      colors: {
        main: '#00f2fe',
        accent: '#38bdf8',
        glow: '#0284c7',
        thruster: '#00f2fe',
        hullStart: '#041019',
        hullMid: '#0e2a47'
      }
    },
    {
      id: 'solar',
      nameKey: 'skinRammerSolar',
      descKey: 'skinRammerSolarDesc',
      luckBonus: 5,
      milestoneKey: 'msSurvive420',
      badge: 'SOLAR',
      condition: (m) => (m.maxSurviveTime || 0) >= 420,
      colors: {
        main: '#facc15',
        accent: '#fbbf24',
        glow: '#eab308',
        thruster: '#fde047',
        hullStart: '#1a1303',
        hullMid: '#3d2c06'
      }
    },
    {
      id: 'void',
      nameKey: 'skinRammerVoid',
      descKey: 'skinRammerVoidDesc',
      luckBonus: 8,
      milestoneKey: 'msVictory',
      badge: 'VOID',
      condition: (m) => Boolean(m.hasWon),
      colors: {
        main: '#c084fc',
        accent: '#a855f7',
        glow: '#9333ea',
        thruster: '#e879f9',
        hullStart: '#140524',
        hullMid: '#2d0c4e'
      }
    }
  ],

  serpent: [
    {
      id: 'default',
      nameKey: 'skinSerpentDefault',
      descKey: 'skinSerpentDefaultDesc',
      luckBonus: 0,
      unlocked: true,
      badge: 'DEFAULT',
      colors: {
        main: '#10b981',
        accent: '#34d399',
        glow: '#059669',
        thruster: '#34d399',
        segmentCore: '#34d399',
        segmentBase: '#064e3b'
      }
    },
    {
      id: 'neon',
      nameKey: 'skinSerpentNeon',
      descKey: 'skinSerpentNeonDesc',
      luckBonus: 3,
      milestoneKey: 'msCombo30',
      badge: 'NEON',
      condition: (m) => (m.maxCombo || 0) >= 30,
      colors: {
        main: '#00f2fe',
        accent: '#38bdf8',
        glow: '#0284c7',
        thruster: '#00f2fe',
        segmentCore: '#00f2fe',
        segmentBase: '#042f47'
      }
    },
    {
      id: 'crimson',
      nameKey: 'skinSerpentCrimson',
      descKey: 'skinSerpentCrimsonDesc',
      luckBonus: 5,
      milestoneKey: 'msSurvive420',
      badge: 'FLAME',
      condition: (m) => (m.maxSurviveTime || 0) >= 420,
      colors: {
        main: '#ef4444',
        accent: '#f97316',
        glow: '#dc2626',
        thruster: '#f97316',
        segmentCore: '#fbbf24',
        segmentBase: '#450a0a'
      }
    },
    {
      id: 'celestial',
      nameKey: 'skinSerpentCelestial',
      descKey: 'skinSerpentCelestialDesc',
      luckBonus: 8,
      milestoneKey: 'msVictory',
      badge: 'DIVINE',
      condition: (m) => Boolean(m.hasWon),
      colors: {
        main: '#facc15',
        accent: '#38bdf8',
        glow: '#eab308',
        thruster: '#fef08a',
        segmentCore: '#fde047',
        segmentBase: '#2e2004'
      }
    }
  ],

  novashield: [
    {
      id: 'default',
      nameKey: 'skinNovaDefault',
      descKey: 'skinNovaDefaultDesc',
      luckBonus: 0,
      unlocked: true,
      badge: 'DEFAULT',
      colors: {
        main: '#00f2fe',
        accent: '#38bdf8',
        glow: '#0284c7',
        thruster: '#38bdf8',
        shield: '#00f2fe'
      }
    },
    {
      id: 'plasma',
      nameKey: 'skinNovaPlasma',
      descKey: 'skinNovaPlasmaDesc',
      luckBonus: 3,
      milestoneKey: 'msSurvive180',
      badge: 'AMBER',
      condition: (m) => (m.maxSurviveTime || 0) >= 180,
      colors: {
        main: '#f97316',
        accent: '#fb923c',
        glow: '#ea580c',
        thruster: '#fb923c',
        shield: '#f97316'
      }
    },
    {
      id: 'darkmatter',
      nameKey: 'skinNovaDarkMatter',
      descKey: 'skinNovaDarkMatterDesc',
      luckBonus: 5,
      milestoneKey: 'msSurvive420',
      badge: 'DARK',
      condition: (m) => (m.maxSurviveTime || 0) >= 420,
      colors: {
        main: '#c084fc',
        accent: '#a855f7',
        glow: '#7e22ce',
        thruster: '#c084fc',
        shield: '#c084fc'
      }
    },
    {
      id: 'aegissun',
      nameKey: 'skinNovaAegisSun',
      descKey: 'skinNovaAegisSunDesc',
      luckBonus: 8,
      milestoneKey: 'msVictory',
      badge: 'SOLAR',
      condition: (m) => Boolean(m.hasWon),
      colors: {
        main: '#facc15',
        accent: '#ffffff',
        glow: '#eab308',
        thruster: '#fde047',
        shield: '#fde047'
      }
    }
  ],

  carrier: [
    {
      id: 'default',
      nameKey: 'skinCarrierDefault',
      descKey: 'skinCarrierDefaultDesc',
      luckBonus: 0,
      unlocked: true,
      badge: 'DEFAULT',
      colors: {
        main: '#a855f7',
        accent: '#c084fc',
        glow: '#9333ea',
        thruster: '#c084fc',
        drone: '#38bdf8'
      }
    },
    {
      id: 'arctic',
      nameKey: 'skinCarrierArctic',
      descKey: 'skinCarrierArcticDesc',
      luckBonus: 3,
      milestoneKey: 'msGold1000',
      badge: 'FROST',
      condition: (m) => (m.totalGold || 0) >= 1000,
      colors: {
        main: '#38bdf8',
        accent: '#e0f2fe',
        glow: '#0284c7',
        thruster: '#38bdf8',
        drone: '#e0f2fe'
      }
    },
    {
      id: 'stellar',
      nameKey: 'skinCarrierStellar',
      descKey: 'skinCarrierStellarDesc',
      luckBonus: 5,
      milestoneKey: 'msSurvive420',
      badge: 'NEBULA',
      condition: (m) => (m.maxSurviveTime || 0) >= 420,
      colors: {
        main: '#f97316',
        accent: '#f43f5e',
        glow: '#ea580c',
        thruster: '#f43f5e',
        drone: '#facc15'
      }
    },
    {
      id: 'divine',
      nameKey: 'skinCarrierDivine',
      descKey: 'skinCarrierDivineDesc',
      luckBonus: 8,
      milestoneKey: 'msVictory',
      badge: 'ROYAL',
      condition: (m) => Boolean(m.hasWon),
      colors: {
        main: '#facc15',
        accent: '#ffffff',
        glow: '#eab308',
        thruster: '#fef08a',
        drone: '#fde047'
      }
    }
  ]
};

class SkinManager {
  constructor() {
    this.milestoneKey = 'dopamine_milestones_v1';
    this.skinPrefix = 'dopamine_skin_';
    this.loadStats();
  }

  loadStats() {
    const raw = localStorage.getItem(this.milestoneKey);
    const defaults = {
      totalKills: 0,
      maxSurviveTime: 0,
      totalGold: 0,
      hasWon: false,
      maxCombo: 0
    };
    if (raw) {
      try {
        this.stats = { ...defaults, ...JSON.parse(raw) };
      } catch (e) {
        this.stats = defaults;
      }
    } else {
      this.stats = defaults;
    }
  }

  saveStats() {
    localStorage.setItem(this.milestoneKey, JSON.stringify(this.stats));
  }

  recordGameEnd(gameTime, kills, gold, isVictory = false, maxCombo = 0) {
    this.loadStats();
    this.stats.totalKills = (this.stats.totalKills || 0) + kills;
    this.stats.totalGold = (this.stats.totalGold || 0) + gold;
    this.stats.maxSurviveTime = Math.max(this.stats.maxSurviveTime || 0, Math.floor(gameTime));
    this.stats.maxCombo = Math.max(this.stats.maxCombo || 0, maxCombo);
    if (isVictory) {
      this.stats.hasWon = true;
    }
    this.saveStats();
  }

  isSkinUnlocked(shipId, skinId) {
    const list = SHIP_SKINS[shipId] || [];
    const skin = list.find(s => s.id === skinId);
    if (!skin) return false;
    if (skin.unlocked || skin.id === 'default') return true;
    if (typeof skin.condition === 'function') {
      return skin.condition(this.stats);
    }
    return false;
  }

  getEquippedSkinId(shipId) {
    return localStorage.getItem(this.skinPrefix + shipId) || 'default';
  }

  equipSkin(shipId, skinId) {
    if (this.isSkinUnlocked(shipId, skinId)) {
      localStorage.setItem(this.skinPrefix + shipId, skinId);
      return true;
    }
    return false;
  }

  getEquippedSkin(shipId) {
    const equippedId = this.getEquippedSkinId(shipId);
    const list = SHIP_SKINS[shipId] || SHIP_SKINS.rammer;
    return list.find(s => s.id === equippedId) || list[0];
  }

  getSkinsForShip(shipId) {
    const list = SHIP_SKINS[shipId] || [];
    return list.map(skin => ({
      ...skin,
      isUnlocked: this.isSkinUnlocked(shipId, skin.id),
      isEquipped: this.getEquippedSkinId(shipId) === skin.id
    }));
  }
}

export const skinManager = new SkinManager();
