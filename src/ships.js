// Starship Archetype Definitions, Base Stats & Playstyles (3 Distinct Combat Paradigms)
import { i18n } from './i18n.js';

export const SHIP_ROSTER = {
  rammer: {
    id: 'rammer',
    nameKey: 'shipRammerName',
    roleKey: 'shipRammerRole',
    descKey: 'shipRammerDesc',
    traitNameKey: 'shipRammerTrait',
    traitDescKey: 'shipRammerTraitDesc',
    icon: '☄️',
    color: '#ef4444',
    accentColor: '#f97316',
    glowColor: '#dc2626',
    stats: {
      hp: 100, // Khối lượng & Giáp khủng
      dmg: 90, // Sát thương va chạm cực cao
      spd: 85, // Tốc độ lao dũng mãnh
      range: 35
    },
    baseStats: {
      maxHp: 280,
      baseSpeed: 235,
      damageMult: 1.0,
      fireRateMult: 1.0,
      critChance: 0.12,
      critMult: 2.0,
      magnetRadius: 130,
      mass: 1.5,
      ramDamage: 180,
      damageReduction: 0.70
    },
    startingWeapon: 'orbs',
    trait: 'rammer',
    specs: {
      vi: [
        { label: 'Sát thương tông húc', val: '180 dmg (× Khối lượng × Tốc độ)' },
        { label: 'Giảm sát thương khi đâm', val: '-70% sát thương nhận' },
        { label: 'Hấp thu sinh lực', val: '+2 HP mỗi quái húc chết' },
        { label: 'Đẩy lùi thiên thạch', val: 'Hất văng bầy quái 80px' },
        { label: 'Vũ khí khởi đầu', val: 'Quả Cầu Hộ Thể' },
        { label: 'Kỹ năng Nộ (Space / EMP)', val: 'Thiên Thạch Xuyên Phá (Lao cực đại)' }
      ],
      en: [
        { label: 'Ramming Impact', val: '180 dmg (× Mass × Speed)' },
        { label: 'Head-on Defense', val: '-70% collision damage taken' },
        { label: 'Siphon Health', val: '+2 HP on ram kill' },
        { label: 'Knockback Force', val: 'Blasts swarms back 80px' },
        { label: 'Starting Weapon', val: 'Orbiting Orbs' },
        { label: 'Ultimate (Space / EMP)', val: 'Meteor Piercing Dash' }
      ]
    },
    synergies: {
      vi: ['Gia Tốc (Tốc độ & Xoay)', 'Khuếch Đại (Kích thước & Khối lượng)', 'Đâm Xuyên (Drill)', 'Bom Quán Tính (Crash Nova)'],
      en: ['Thrust (+Speed & Turn)', 'Juggernaut (+Size & Mass)', 'Drill (Lethal Pass-through)', 'Crash Nova (Impact Blast)']
    }
  },
  serpent: {
    id: 'serpent',
    nameKey: 'shipSerpentName',
    roleKey: 'shipSerpentRole',
    descKey: 'shipSerpentDesc',
    traitNameKey: 'shipSerpentTrait',
    traitDescKey: 'shipSerpentTraitDesc',
    icon: '🐉',
    color: '#10b981',
    accentColor: '#34d399',
    glowColor: '#059669',
    stats: {
      hp: 65,
      dmg: 80,
      spd: 80,
      range: 95 // Chiều dài uốn lượn và đốt thân
    },
    baseStats: {
      maxHp: 160,
      baseSpeed: 215,
      damageMult: 1.0,
      fireRateMult: 1.0,
      critChance: 0.15,
      critMult: 2.0,
      magnetRadius: 150,
      segments: 4,
      segmentRadius: 14,
      segmentDamage: 85
    },
    startingWeapon: 'glaive',
    trait: 'serpent',
    specs: {
      vi: [
        { label: 'Đốt thân rồng nối đuôi', val: '4 đốt bọc thép (Tối đa 10)' },
        { label: 'Phòng thủ chặn đạn', val: '100% đạn địch bị đốt triệt tiêu' },
        { label: 'Sát thương xé rách', val: '85 dmg/tick khi quẹt quái' },
        { label: 'Cơ chế chiến đấu', val: 'Uốn lượn bo tròn xiết chết bầy địch' },
        { label: 'Vũ khí khởi đầu', val: 'Phi Tiêu Nảy' },
        { label: 'Kỹ năng Nộ (Space / EMP)', val: 'Long Trảo Xung Kích (Nổ sóng làm chậm)' }
      ],
      en: [
        { label: 'Trailing Segments', val: '4 armored segments (Max 10)' },
        { label: 'Projectile Barrier', val: 'Blocks 100% incoming bullets' },
        { label: 'Laceration Damage', val: '85 dmg/tick on contact' },
        { label: 'Combat Style', val: 'Encircle & constrict mob swarms' },
        { label: 'Starting Weapon', val: 'Bouncing Glaive' },
        { label: 'Ultimate (Space / EMP)', val: 'Dragon Claw Shockwave' }
      ]
    },
    synergies: {
      vi: ['Mọc Đốt (+2 Đốt thân)', 'Khí Độc Đuôi (Làm chậm & Rút máu)', 'Mãng Xà Bọc Thép (Gai quẹt văng)'],
      en: ['Grow Segments (+2 Segments)', 'Toxic Exhaust (Slow & Poison)', 'Iron Dragon (Spiked Knockback)']
    }
  },
  novashield: {
    id: 'novashield',
    nameKey: 'shipNovaShieldName',
    roleKey: 'shipNovaShieldRole',
    descKey: 'shipNovaShieldDesc',
    traitNameKey: 'shipNovaShieldTrait',
    traitDescKey: 'shipNovaShieldTraitDesc',
    icon: '🛡️',
    color: '#00f2fe',
    accentColor: '#38bdf8',
    glowColor: '#0284c7',
    stats: {
      hp: 85,
      dmg: 100, // Bom khiên sát thương cực đại
      spd: 70,
      range: 90 // Bán kính sóng xung kích
    },
    baseStats: {
      maxHp: 180,
      baseSpeed: 200,
      damageMult: 1.15,
      fireRateMult: 1.0,
      critChance: 0.18,
      critMult: 2.2,
      magnetRadius: 140,
      shieldHp: 160,
      shieldMaxHp: 160,
      shieldRechargeTime: 3.5,
      novaRadius: 160,
      novaDamage: 160,
      noGuns: true
    },
    startingWeapon: null,
    trait: 'novashield',
    specs: {
      vi: [
        { label: 'Khiên bảo vệ độc lập', val: '160 HP hấp thụ mọi sát thương' },
        { label: 'Sóng nổ Nova', val: 'Bán kính 160px • 160 dmg khi vỡ' },
        { label: 'Tự sạc lại khiên', val: '3.5 giây sau lần trúng đòn cuối' },
        { label: 'Hỏa lực', val: 'Không có súng thường • Bom khiên áp sát' },
        { label: 'Kỹ năng Nộ (Space / EMP)', val: 'Super Mega Nova Blast (Bán kính x2.2)' }
      ],
      en: [
        { label: 'Energy Barrier', val: '160 HP independent damage absorption' },
        { label: 'Nova Shockwave', val: '160px radius • 160 dmg on rupture' },
        { label: 'Recharge Delay', val: '3.5s after last damage taken' },
        { label: 'Firepower', val: 'No conventional guns • Close-range blast' },
        { label: 'Ultimate (Space / EMP)', val: 'Super Mega Nova Blast (Radius x2.2)' }
      ]
    },
    synergies: {
      vi: ['Lõi Năng Lượng (Tăng tốc sạc khiên)', 'Khiên Lửa (Burn Field)', 'Bất Tử Hóa (Nổ khiên x3)'],
      en: ['Energy Core (+Recharge Speed)', 'Burn Field (Aura Damage)', 'Immortality (Single Barrier x3 Nova)']
    }
  },
  carrier: {
    id: 'carrier',
    nameKey: 'shipCarrierName',
    roleKey: 'shipCarrierRole',
    descKey: 'shipCarrierDesc',
    traitNameKey: 'shipCarrierTrait',
    traitDescKey: 'shipCarrierTraitDesc',
    icon: '🛸',
    color: '#a855f7',
    accentColor: '#c084fc',
    glowColor: '#9333ea',
    stats: {
      hp: 80,
      dmg: 95,
      spd: 75,
      range: 90
    },
    baseStats: {
      maxHp: 200,
      baseSpeed: 210,
      damageMult: 1.0,
      fireRateMult: 1.0,
      critChance: 0.15,
      critMult: 2.0,
      magnetRadius: 140,
      droneSpawnInterval: 5.0,
      droneSpawnCount: 2,
      droneDuration: 12.0,
      droneMaxHp: 140,
      droneDamage: 35
    },
    startingWeapon: 'blaster',
    trait: 'carrier',
    specs: {
      vi: [
        { label: 'Hạm Đội Drone Tự Hành', val: 'Mỗi 5s tự động phóng 2 Mini Drone' },
        { label: 'Thanh Máu & Độ Bền', val: '140 HP riêng • Tồn tại 12s (Tiến hóa: 18s)' },
        { label: 'Trí Tuệ Nhân Tạo AI', val: 'Tự động săn lùng và bắn phá quái vật gần nhất' },
        { label: 'Đỡ Đòn & Hấp Thụ', val: 'Hấp thụ đòn đánh quái thay cho tàu mẹ' },
        { label: 'Vũ khí khởi đầu', val: 'Súng Plasma' },
        { label: 'Kỹ năng Nộ (Space / EMP)', val: 'Quân Đoàn Siêu Cấp (Thả tức thì 4 Mini Drone cường hóa)' }
      ],
      en: [
        { label: 'Autonomous Drone Fleet', val: 'Deploys 2 combat Mini Drones every 5s' },
        { label: 'Health & Lifetime', val: '140 independent HP • 12s duration (Evolved: 18s)' },
        { label: 'Targeting AI', val: 'Autonomously hunts down the nearest hostile targets' },
        { label: 'Shield & Decoy', val: 'Draws enemy attacks & absorbs damage for mothership' },
        { label: 'Starting Weapon', val: 'Plasma Blaster' },
        { label: 'Ultimate (Space / EMP)', val: 'Overcharge Swarm (Instantly launches 4 Super Drones)' }
      ]
    },
    synergies: {
      vi: ['Quân Đoàn Drone (Tiến Hóa: 3 Drone 18s)', 'Gia Tốc Hồi Chiêu (-0.2s/cấp)', 'Drone Bọc Thép (+Máu & Sát Thương)'],
      en: ['Swarm Fleet (Evolved: 3 Drones 18s)', 'Rapid Deployment (-0.2s CD/rank)', 'Armored Drones (+HP & Damage)']
    }
  }
};

export const SHIP_KEYS = Object.keys(SHIP_ROSTER);

