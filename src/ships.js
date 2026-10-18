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
      hp: 100, // VƯỢT TRỘI DUY NHẤT: MÁU/GIÁP
      dmg: 45,
      spd: 45,
      range: 40
    },
    baseStats: {
      maxHp: 240,
      baseSpeed: 190,
      damageMult: 0.9,
      fireRateMult: 0.95,
      critChance: 0.08,
      critMult: 1.6,
      magnetRadius: 120
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
      hp: 40,
      dmg: 100, // VƯỢT TRỘI DUY NHẤT: CÔNG / BẠO KÍCH
      spd: 55,
      range: 45
    },
    baseStats: {
      maxHp: 85,
      baseSpeed: 215,
      damageMult: 1.25,
      fireRateMult: 1.05,
      critChance: 0.28,
      critMult: 2.6,
      magnetRadius: 110
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
      hp: 35,
      dmg: 55,
      spd: 100, // VƯỢT TRỘI DUY NHẤT: TỐC ĐỘ DI CHUYỂN
      range: 60
    },
    baseStats: {
      maxHp: 75,
      baseSpeed: 285,
      damageMult: 1.0,
      fireRateMult: 1.0,
      critChance: 0.15,
      critMult: 2.0,
      magnetRadius: 115
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
      hp: 50,
      dmg: 50,
      spd: 45,
      range: 100 // VƯỢT TRỘI DUY NHẤT: TẦM BẮN & HÚT NGỌC
    },
    baseStats: {
      maxHp: 95,
      baseSpeed: 200,
      damageMult: 0.95,
      fireRateMult: 1.0,
      critChance: 0.10,
      critMult: 1.8,
      magnetRadius: 180
    },
    startingWeapon: 'wingmen',
    secondaryWeapon: 'missiles',
    trait: 'carrier'
  },
  nebula: {
    id: 'nebula',
    nameKey: 'shipNebulaName',
    roleKey: 'shipNebulaRole',
    descKey: 'shipNebulaDesc',
    traitNameKey: 'shipNebulaTrait',
    traitDescKey: 'shipNebulaTraitDesc',
    icon: '🌌',
    isRare: true,
    color: '#a855f7',
    accentColor: '#c084fc',
    glowColor: '#7e22ce',
    stats: {
      hp: 45,
      dmg: 90, // VƯỢT TRỘI KÉP 1: CÔNG CAO
      spd: 90, // VƯỢT TRỘI KÉP 2: TỐC ĐỘ CAO
      range: 50
    },
    baseStats: {
      maxHp: 80,
      baseSpeed: 275,
      damageMult: 1.2,
      fireRateMult: 1.15,
      critChance: 0.22,
      critMult: 2.3,
      magnetRadius: 130
    },
    startingWeapon: 'lightning',
    secondaryWeapon: 'blaster',
    trait: 'nebula'
  }
};

export const SHIP_KEYS = Object.keys(SHIP_ROSTER);
