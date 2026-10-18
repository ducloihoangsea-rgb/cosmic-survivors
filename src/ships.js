// Starship Archetype Definitions, Base Stats & Playstyles
import { i18n } from './i18n.js';

export const SHIP_ROSTER = {
  juggernaut: {
    id: 'juggernaut',
    nameKey: 'shipJuggernautName',
    roleKey: 'shipJuggernautRole',
    descKey: 'shipJuggernautDesc',
    traitNameKey: 'shipJuggernautTrait',
    traitDescKey: 'shipJuggernautTraitDesc',
    icon: '🛡️',
    color: '#10b981',
    accentColor: '#34d399',
    glowColor: '#059669',
    stats: {
      hp: 95,
      dmg: 65,
      spd: 55,
      range: 40
    },
    baseStats: {
      maxHp: 220,
      baseSpeed: 200,
      damageMult: 1.0,
      fireRateMult: 1.0,
      critChance: 0.12,
      critMult: 1.8,
      magnetRadius: 130
    },
    startingWeapon: 'orbs',
    trait: 'rammer'
  },
  berserker: {
    id: 'berserker',
    nameKey: 'shipBerserkerName',
    roleKey: 'shipBerserkerRole',
    descKey: 'shipBerserkerDesc',
    traitNameKey: 'shipBerserkerTrait',
    traitDescKey: 'shipBerserkerTraitDesc',
    icon: '🩸',
    color: '#ef4444',
    accentColor: '#f87171',
    glowColor: '#dc2626',
    stats: {
      hp: 45,
      dmg: 100,
      spd: 75,
      range: 50
    },
    baseStats: {
      maxHp: 100,
      baseSpeed: 230,
      damageMult: 1.0,
      fireRateMult: 1.0,
      critChance: 0.25,
      critMult: 2.4,
      magnetRadius: 120
    },
    startingWeapon: 'glaive',
    trait: 'berserker'
  },
  phantom: {
    id: 'phantom',
    nameKey: 'shipPhantomName',
    roleKey: 'shipPhantomRole',
    descKey: 'shipPhantomDesc',
    traitNameKey: 'shipPhantomTrait',
    traitDescKey: 'shipPhantomTraitDesc',
    icon: '🎯',
    color: '#00f2fe',
    accentColor: '#38bdf8',
    glowColor: '#0284c7',
    stats: {
      hp: 40,
      dmg: 90,
      spd: 95,
      range: 100
    },
    baseStats: {
      maxHp: 85,
      baseSpeed: 260,
      damageMult: 1.1,
      fireRateMult: 1.05,
      critChance: 0.20,
      critMult: 2.2,
      magnetRadius: 120
    },
    startingWeapon: 'blaster',
    trait: 'sniper'
  },
  carrier: {
    id: 'carrier',
    nameKey: 'shipCarrierName',
    roleKey: 'shipCarrierRole',
    descKey: 'shipCarrierDesc',
    traitNameKey: 'shipCarrierTrait',
    traitDescKey: 'shipCarrierTraitDesc',
    icon: '🛸',
    color: '#facc15',
    accentColor: '#fde047',
    glowColor: '#d97706',
    stats: {
      hp: 60,
      dmg: 80,
      spd: 65,
      range: 85
    },
    baseStats: {
      maxHp: 110,
      baseSpeed: 220,
      damageMult: 1.0,
      fireRateMult: 1.0,
      critChance: 0.15,
      critMult: 2.0,
      magnetRadius: 165
    },
    startingWeapon: 'wingmen',
    secondaryWeapon: 'missiles',
    trait: 'carrier'
  }
};

export const SHIP_KEYS = Object.keys(SHIP_ROSTER);
