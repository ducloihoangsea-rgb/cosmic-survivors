// Internationalization (i18n) Engine with Complete Translations for Hangar, Slots & Combat

export const translations = {
  en: {
    gameTitle: 'COSMIC<br>SURVIVOR',
    subTagline: '⚡ DOPAMINE OVERLOAD ⚡',
    startBtn: 'START HUNTING',
    hangarBtn: '⚙️ SHIP HANGAR',
    themeDark: '🌙 DARK',
    themeLight: '☀️ LIGHT',
    tipMobile: '📱 Mobile: Drag thumb to move',
    tipPc: '💻 PC: WASD to move • Space: EMP Shockwave',

    levelPrefix: 'LVL',
    dopamineBurst: 'DOPAMINE BURST',
    frenzyOverload: '⚡ FRENZY OVERLOAD ⚡',
    frenzyFloat: '⚡ DOPAMINE OVERLOAD ⚡',
    critFloat: 'CRIT!',
    reviveFloat: '💖 REVIVED! 💖',
    hordeAlert: '⚠️ WARNING: HORDE DETECTED! ⚠️',

    // Dynamic Battlefields (Sectors)
    sector1Title: 'SECTOR I: ENDLESS GALAXY',
    sector1Sub: 'Deep space & luminous cyber constellations',
    sector2Title: 'SECTOR II: PLANETARY WARZONE',
    sector2Sub: 'Asteroid belts & distant orbital bombardments',
    sector3Title: 'SECTOR III: SOLAR INFERNO & BLACK HOLE',
    sector3Sub: 'Blazing solar corona & cosmic singularity',
    warpAlert: '⚡ HYPERSPACE WARP JUMP ⚡',
    sectorBadge1: 'SECTOR I: GALAXY',
    sectorBadge2: 'SECTOR II: WARZONE',
    sectorBadge3: 'SECTOR III: SOLAR FLARE',

    // Starship Skins & Milestones
    skinSectionTitle: '🎨 SHIP SKINS & LUCK UPGRADES',
    skinEquipBtn: 'EQUIP',
    skinEquippedBtn: '✓ EQUIPPED',
    skinLockedLabel: '🔒 LOCKED',
    skinLuckBonus: 'Luck',
    msKills300: 'Kill 300 monsters',
    msCombo30: 'Reach 30 Combo',
    msSurvive180: 'Survive at least 3:00 (Sector II)',
    msSurvive420: 'Survive at least 7:00 (Sector III)',
    msGold1000: 'Collect 1,000 Gold',
    msVictory: 'Flawless 10:00 Survival (Victory)',

    skinRammerDefault: 'Blazing Meteor',
    skinRammerDefaultDesc: 'Standard titanium-reinforced molten hull',
    skinRammerCyber: 'Cyber Neon Mech',
    skinRammerCyberDesc: 'Angular cyan cyber-tech plating & cold thrusters',
    skinRammerSolar: 'Solar Emperor',
    skinRammerSolarDesc: 'Radiant plasma gold forged in the solar core',
    skinRammerVoid: 'Void Dreadnought',
    skinRammerVoidDesc: 'Obsidian void hull infused with singularity energy',

    skinSerpentDefault: 'Emerald Serpent',
    skinSerpentDefaultDesc: 'Classic bio-metallic emerald scales',
    skinSerpentNeon: 'Cyber Viper',
    skinSerpentNeonDesc: 'Electrified neon cyber spine & light rings',
    skinSerpentCrimson: 'Crimson Wyrm',
    skinSerpentCrimsonDesc: 'Magma-infused dragon scales with burning embers',
    skinSerpentCelestial: 'Celestial Orochi',
    skinSerpentCelestialDesc: 'Divine golden dragon segments with holy radiance',

    skinNovaDefault: 'Cobalt Aegis',
    skinNovaDefaultDesc: 'Standard cobalt energy shockwave projector',
    skinNovaPlasma: 'Amber Plasma Barrier',
    skinNovaPlasmaDesc: 'High-heat amber plasma magnetic emitter',
    skinNovaDarkMatter: 'Dark Matter Bastion',
    skinNovaDarkMatterDesc: 'Deep violet aurora matter-absorbing shield',
    skinNovaAegisSun: 'Aegis of the Sun',
    skinNovaAegisSunDesc: 'Divine golden sunburst barrier aura',

    skinCarrierDefault: 'Neon Fleet Carrier',
    skinCarrierDefaultDesc: 'Standard cybernetic fleet drone carrier',
    skinCarrierArctic: 'Arctic Frost Carrier',
    skinCarrierArcticDesc: 'Frostbite camouflage plating with ice drones',
    skinCarrierStellar: 'Stellar Dreadship',
    skinCarrierStellarDesc: 'Nebula firestorm hull with thermite drones',
    skinCarrierDivine: 'Divine Mothership',
    skinCarrierDivineDesc: 'Supreme golden fleet flagship with holy escorts',

    levelUpTitle: 'LEVEL UP!',
    levelUpSubtitle: 'Choose your augmentation:',
    destinyLevelUpTitle: '⚡ DESTINY AWAKENING ⚡',
    destinyLevelUpSubtitle: 'The cosmos grants you a single supreme Mythic choice!',

    // Rarities
    rarityCommon: 'Common',
    rarityRare: 'Rare',
    rarityEpic: 'Epic',
    rarityLegendary: 'Legendary',
    rarityMythic: 'MYTHIC',
    rarityAwakening: 'AWAKENING',

    // Categories
    categoryOffense: '⚔️ OFFENSE',
    categorySupport: '🛡️ SUPPORT',
    categoryStat: '⚡ STATS',
    categoryMutation: '🧬 MUTATION',
    categoryFusion: '🔥 FUSION MOD',
    categoryMythic: '👑 GOD-TIER',
    categoryAwakening: '🌟 WEAPON AWAKENING',
    categoryCore: '🧬 SUPPORT CORE',

    // Starship Roster (3 Unique Gameplay Classes)
    shipSelectTitle: 'CHOOSE YOUR STARSHIP',
    shipSelectSubtitle: '3 distinctive combat paradigms: Ramming Meteor, Slithering Serpent & Exploding Nova Shield',
    shipSelectedBadge: 'READY FOR LAUNCH',
    shipSelectBtn: 'SELECT SHIP',

    // 1. Rammer
    shipRammerName: 'METEOR RAMMER',
    shipRammerRole: '☄️ IMPACT / METEOR CRUSH',
    shipRammerDesc: 'Heavy battering hull. Obliterates enemy hordes by ramming directly into them like a blazing meteor.',
    shipRammerTrait: '☄️ Meteor Collision',
    shipRammerTraitDesc: 'Extreme ramming damage (scales with Mass * Speed). Takes 70% reduced damage on direct collision. Kills heal +2 HP!',

    // 2. Serpent
    shipSerpentName: 'COSMIC SERPENT',
    shipSerpentRole: '🐉 SEGMENTED DRAGON / CONSTRICTION',
    shipSerpentDesc: 'Mythic articulated serpentine dreadnought. Slithers in loops to encircle and crush enemies.',
    shipSerpentTrait: '🐉 Dragon Segments',
    shipSerpentTraitDesc: 'Starts with 4 trailing armored segments. Segments block enemy bullets and shred monsters on swipe contact!',

    // 3. Nova Shield
    shipNovaShieldName: 'NOVA SHIELD',
    shipNovaShieldRole: '🛡️ SHIELD BOMB / SHOCKWAVE',
    shipNovaShieldDesc: 'Experimental barrier warship. No conventional guns. Detonates catastrophic EMP shockwaves when barrier shatters.',
    shipNovaShieldTrait: '🛡️ Nova Blast',
    shipNovaShieldTraitDesc: 'No main gun. Surrounding shield detonates a massive destructive shockwave when broken (or press Space)! Recharges in 3.5s.',

    // 4. Drone Carrier
    shipCarrierName: 'AEGIS DRONE CARRIER',
    shipCarrierRole: '🛸 AUTONOMOUS DRONES / CARRIER',
    shipCarrierDesc: 'Deploys autonomous combat mini-drones with independent health bars, targeting AI, and damage absorption.',
    shipCarrierTrait: '🛸 Swarm Drone Fleet',
    shipCarrierTraitDesc: 'Every 5s, deploys 2 independent Mini Drones (140 HP) that seek enemies and absorb hits for 12s.',
    upgradeDroneTitle: 'Drone Swarm',
    upgradeDroneDesc: '+25% Drone Damage, +40 Drone HP, -0.2s Spawn Cooldown.',
    upgradeDroneEvoTitle: '🔥 EVOLUTION: SUPREME MOTHERSHIP',
    upgradeDroneEvoDesc: 'Deploys 3 reinforced Mini Drones per wave, and Drone lifetime extends to 18 seconds!',

    statHp: 'HULL / MASS',
    statDmg: 'DAMAGE',
    statSpd: 'SPEED',
    statDiff: 'RADIUS / RANGE',
    shipRareBadge: '⭐ CLASS',

    hangarTabShips: '🚀 STARSHIPS & SYNERGY',
    hangarTabTech: '⚙️ PERMANENT TECH',
    hangarTabCodex: '📚 UPGRADE CODEX',
    hangarSelectShipBtn: 'DEPLOY THIS SHIP',

    hudHomeBtn: '🏠 MENU',
    hudSettingsBtn: '⚙️ SETTINGS',
    confirmQuit: 'Quit to Main Menu? Current run progress will be converted to gold.',
    shipStatsBtn: 'STATS',
    shipStatsTitle: 'SHIP REAL-TIME ATTRIBUTES',
    settingsTitle: '⚙️ GAME SETTINGS',
    settingsSub: 'Customize UI opacity & game audio',
    settingOpacity: '🪟 DPS & Stats Panel Opacity',
    settingOpacityTip: 'Drag slider to adjust transparency of real-time side panels.',
    settingSound: '🔊 Sound & Audio Effects',
    settingSoundTip: 'Toggle all sound effects, weapon audio, and gem pickup chimes.',
    soundOn: 'ON',
    soundOff: 'MUTED',

    // Weapons
    blasterTitle: 'Plasma Blaster',
    blasterUnlock: 'Plasma Blaster Unlock',
    blasterDesc: 'Increases projectile count and firing speed.',
    blasterEvo: '🔥 EVOLUTION: Fires 5 rapid hyper-lasers with piercing!',

    orbsTitle: 'Orbiting Orbs',
    orbsUnlock: 'Orbiting Orbs Unlock',
    orbsDesc: 'Adds rotating energy spheres that shred approaching swarms.',
    orbsEvo: '🔥 EVOLUTION: 6 ultra-dense plasma spheres create impervious shield!',

    lightningTitle: 'Chain Lightning',
    lightningUnlock: 'Chain Lightning Unlock',
    lightningDesc: 'Zaps clusters of enemies with high-voltage electricity.',
    lightningEvo: '🔥 EVOLUTION: Strikes 12 targets with catastrophic thunderbolts!',

    glaiveTitle: 'Bouncing Glaive',
    glaiveUnlock: 'Bouncing Glaive Unlock',
    glaiveDesc: 'Throws high-speed energy discs that ricochet through swarms.',

    missilesTitle: 'Heat-Seeking Missiles',
    missilesUnlock: 'Missiles Unlock',
    missilesDesc: 'Fires micro-missiles that lock onto nearby enemies and cause blast damage.',
    missilesEvo: '🔥 EVOLUTION: Fires 10 cluster warheads creating devastating explosions!',

    wingmenTitle: 'Wingmen Drones',
    wingmenUnlock: 'Wingmen Drones Unlock',
    wingmenDesc: '2 companion drones fly alongside ship, firing assist lasers.',
    wingmenEvo: '🔥 EVOLUTION: 4 autonomous fighter drones forming an impenetrable fleet!',

    // Bể Nâng Cấp Tinh Gọn (Curated 15 Upgrades)
    // Group 1: Stat Upgrades
    thrustTitle: 'Thrust Accelerator',
    thrustDesc: '+25% Flight Speed, +15% Ship Turn Rate.',
    juggernautTitle: 'Juggernaut Hull',
    juggernautDesc: '+40% Ship Size & Mass, +30% Max HP, -15% Turn Rate.',
    microcraftTitle: 'Micro-Craft',
    microcraftDesc: '-30% Hitbox Size, +35% Flight Speed (dodge bullets easily).',
    energycoreTitle: 'Energy Core',
    energycoreDesc: '+40% Shield Recharge Rate, faster shield detonation cooldown.',
    growsegmentsTitle: 'Segment Sprout',
    growsegmentsDesc: '+2 Segments (Serpent) or extended fiery jet flame trail (Other ships).',
    cosmicScopeTitle: 'Cosmic Scope',
    cosmicScopeDesc: '+25% Panoramic Vision FOV, +45px Magnet Gathering Radius.',

    // Group 2: Gameplay Mutations (Mechanical Alterations)
    drillTitle: 'Drill Momentum',
    drillDesc: 'When ramming kills a monster, ship does not stutter and pierces right through!',
    burnfieldTitle: 'Burn Field',
    burnfieldDesc: 'Energy field continuously scorches all enemies within surrounding radius!',
    ricochetTitle: 'Ricochet Shards',
    ricochetDesc: 'Projectiles and fragments bounce to nearby targets on impact.',
    toxicexhaustTitle: 'Toxic Exhaust',
    toxicexhaustDesc: 'Engine exhaust or segments release toxic smoke that slows and decays swarms.',

    // Group 3: Fusion Mods (Unlocked at Lv.10+)
    crashnovaTitle: '💥 Crash Nova',
    crashnovaDesc: 'FUSION MOD (Lv.10+): Ramming a target immediately detonates a shield shockwave!',
    irondragonTitle: '🐉 Iron Dragon',
    irondragonDesc: 'FUSION MOD (Lv.10+): Segments gain heavy armor & thorns, violently repelling enemies!',
    immortalityTitle: '👑 Absolute Immortality',
    immortalityDesc: 'FUSION MOD (Lv.10+): HP converted into pure recharging barrier. Barrier blast damage x3!',

    // Stat Buffs
    overclockTitle: 'Adrenaline Overclock',
    overclockDesc: '+25% Weapon Attack Speed. All weapons fire faster.',
    hyperchargeTitle: 'Hyper Reactor',
    hyperchargeDesc: '+25% Total Damage output across all weapons.',
    gravitywellTitle: 'Vortex Magnet',
    gravitywellDesc: '+50% Gem Vacuum range. Sucks XP from farther away.',
    warpengineTitle: 'Thruster Overdrive',
    warpengineDesc: '+20% Movement Speed. Outrun aggressive mobs effortlessly.',
    eaglesightTitle: 'Eagle Vision Radar',
    eaglesightDesc: '+35% Expanded Vision Zoom & Radar detection range.',
    criticalsurgeTitle: 'Precision Optics',
    criticalsurgeDesc: '+15% Critical Chance, +40% Critical Damage multipliers.',
    nanorepairTitle: 'Emergency Stimpack',
    nanorepairDesc: 'Instantly heals 60 HP and permanently grants +25 Max HP.',
    hullMassTitle: 'Titan Hull Mass',
    hullMassDesc: '+40% Mass & Hitbox size. Amplifies Meteor Ramming damage x1.6 and Nova blast area!',
    serpentSegmentsTitle: 'Dragon Segments',
    serpentSegmentsDesc: '+2 Armored Segments. Lengthens dragon body to crush and encircle more mobs!',
    barrierRadiusTitle: 'Barrier Expansion',
    barrierRadiusDesc: '+35% Shield & Segment radius. Massive Nova blasts and giant dragon body!',
    spikedThornsTitle: 'Spiked Retaliation',
    spikedThornsDesc: 'Reflects 100% collision damage back to attackers and boosts ram/swipe impact!',
    tacticalnukeTitle: '☢️ ORBITAL PURGE NUKE',
    tacticalnukeDesc: 'LEGENDARY: Vaporizes all existing enemies on screen and turns them into high-value gems!',

    // RED MYTHIC GOD-TIER SKILLS (1-2% Drop Rate)
    godPactTitle: 'Divine Destiny Pact',
    godPactDesc: '🔴 MYTHIC: Next level-up grants EXACTLY 1 guaranteed GOD-TIER RED skill!',
    blackHoleTitle: 'Cosmic Singularity',
    blackHoleDesc: '🔴 MYTHIC: Every 12s, spawns a massive Singularity pulling and annihilating all mobs!',
    bloodFrenzyTitle: 'Blood God Rampage',
    bloodFrenzyDesc: '🔴 MYTHIC: +100% Total Damage. Killing any monster restores +1 HP!',
    reaperTitle: 'Reaper Execution',
    reaperDesc: '🔴 MYTHIC: All attacks have 10% chance to INSTANTLY EXECUTE targets!',
    chronosTitle: 'Chronos Stasis',
    chronosDesc: '🔴 MYTHIC: Every 20s, freezes all enemies for 5s and deals +60% damage!',

    // Hangar / Meta Tree (12 Permanent Upgrades x 15 Ranks)
    hangarTitle: 'SHIP TECH HANGAR',
    hangarSubtitle: 'Spend gold to permanently augment your starfighter chassis up to Rank 15.',
    upgradeHull: 'Reinforced Hull',
    upgradeHullDesc: '+25 Base Max HP per rank (Rank 15: +375 HP).',
    upgradeReactor: 'Quantum Reactor',
    upgradeReactorDesc: '+8% Base Damage per rank (Rank 15: +120% DMG).',
    upgradeFirerate: 'High-Speed Loader',
    upgradeFirerateDesc: '+4% Fire Rate per rank (Rank 15: +60% Fire Rate).',
    upgradeSpeed: 'Ion Boost Thruster',
    upgradeSpeedDesc: '+3% Flight Speed per rank (Rank 15: +45% Speed).',
    upgradeShield: 'Absorption Forcefield',
    upgradeShieldDesc: '+15 Max Shield per rank (Rank 15: +225 Shield).',
    upgradeCrit: 'Precision Targeting',
    upgradeCritDesc: '+2% Crit Chance & +5% Crit Dmg per rank (Rank 15: +30% Crit, +75% Dmg).',
    upgradeRegen: 'Nanite Biorepair',
    upgradeRegenDesc: '+0.5 HP/sec Regen per rank (Rank 15: +7.5 HP/s).',
    upgradeMagnet: 'Tachyon Vacuum',
    upgradeMagnetDesc: '+15px Gem Suction Radius per rank (Rank 15: +225px).',
    upgradeLuck: 'Deep Space Radar',
    upgradeLuckDesc: '+3% Drop Luck per rank (Rank 15: +45% Luck).',
    upgradeCooldown: 'Cryo Heat Sink',
    upgradeCooldownDesc: '-2.5% Cooldown per rank (Rank 15: -37.5% CD).',
    upgradeGreed: 'Mineral Harvester',
    upgradeGreedDesc: '+10% Bonus Gold per rank (Rank 15: +150% Gold).',
    upgradeRevive: 'Quantum Emergency Pod',
    upgradeReviveDesc: '+1 Extra Life every 5 ranks (Rank 15: +3 Extra Revives).',
    cardBenefitPrefix: 'NEXT LEVEL GAIN',
    costLabel: 'Cost',
    maxedLabel: 'MAX RANK (15/15)',
    closeBtn: 'CLOSE',

    // Slot Machine Chest
    chestTitle: '🎰 LUCKY SLOT CHEST',
    chestSpinning: 'Spinning Reels...',
    chestJackpot: '🎉 MEGA JACKPOT! 🎉',
    claimBtn: 'CLAIM REWARDS',

    // Combos
    comboTitle: 'COMBO',
    combo10: '🔥 RAMPAGE (x1.2)',
    combo30: '⚡ UNSTOPPABLE (x1.5)',
    combo60: '💀 CYBER DEMON (x2.0)',
    combo100: '👑 DOPAMINE GOD (x3.0)',

    // Damage Meter
    damageMeterTitle: 'SKILL DAMAGE BREAKDOWN',
    totalDamageLabel: 'Total Damage Dealt',
    skill_blaster: 'Plasma Blaster',
    skill_orbs: 'Orbiting Orbs',
    skill_lightning: 'Chain Lightning',
    skill_glaive: 'Bouncing Glaive',
    skill_missiles: 'Heat Missiles',
    skill_wingmen: 'Wingmen Drones',
    skill_laser: 'Prism Laser Beam',
    skill_bombs: 'Space Mines',
    skill_emp: 'EMP Shockwave',
    skill_nuke: 'Orbital Nuke',
    skill_blackhole: 'Cosmic Singularity',
    skill_ram: 'Battering Ram',
    skill_novashield: 'Nova Blast / Immortality',
    skill_burnfield: 'Burn Field Incineration',
    skill_flame: 'Flame Trail Exhaust',
    skill_serpent: 'Serpent Spiked Segments',
    skill_thorns: 'Spiked Thorns Reflection',
    skill_toxic: 'Toxic Gas Cloud',
    executeFloat: '💀 EXECUTED! 💀',
    destinyPactActivated: '⚡ DESTINY PACT SEALED! ⚡',

    // New Weapons
    laserTitle: 'Prism Laser Beam',
    laserDesc: 'Fires piercing high-energy laser beams that incinerate enemies in a line.',
    laserEvo: 'Extreme beam width with devastating thermal damage over time.',
    bombsTitle: 'Space Mine Dropper',
    bombsDesc: 'Deploys proximity explosive mines that detonate on contact or delay (Summon).',
    bombsEvo: 'Deploys heavier plasma mines with massive blast radius.',

    // Support Cores (Passives required for Awakening)
    core_firerateTitle: 'Overclock Core',
    core_firerateDesc: '+20% Weapon Attack Speed across all arsenals.',
    core_blastTitle: 'Blast Matrix Core',
    core_blastDesc: '+35% Blast Radius for Bombs, Missiles, and Shield blasts.',
    core_summonTitle: 'Nanite Overlord Core',
    core_summonDesc: '+40% Damage and HP for Drones & Space Mines (Summons).',
    core_rangeTitle: 'Tachyon Scope Core',
    core_rangeDesc: '+35% Weapon Range, Laser sweep distance, and Radar vision.',
    core_shieldTitle: 'Barrier Matrix Core',
    core_shieldDesc: '+50 Shield Max HP and -25% Shield recharge delay.',
    core_hullTitle: 'Titan Armor Core',
    core_hullDesc: '+40% Max HP and +35% Ramming Collision Mass.',
    core_tailTitle: 'Dragon Tendon Core',
    core_tailDesc: '+2 Armored Segments and +40% Dragon swipe damage.',

    // Weapon & Ship Awakenings (Evolution)
    awakenBlasterTitle: '🌟 GATLING LASERSTORM',
    awakenBlasterDesc: 'AWAKENING (Blaster Lv5 + Overclock Core): 8-barrel rotary cannon spraying high-speed piercing plasma storm!',
    awakenBombsTitle: '🌟 APOCALYPSE NUKE MINES',
    awakenBombsDesc: 'AWAKENING (Bombs Lv5 + Blast Core): Each exploding mine fractures into 4 cascading cluster nukes!',
    awakenDroneTitle: '🌟 MOTHERSHIP ARMADA',
    awakenDroneDesc: 'AWAKENING (Drones Lv5 + Summoner Core): Drones equipped with quad-gatlings & homing missiles, permanent lifespan!',
    awakenLaserTitle: '🌟 ORBITAL DEATH RAY',
    awakenLaserDesc: 'AWAKENING (Laser Lv5 + Range Core): Dual 360-degree orbital thermal death rays ripping through the screen!',
    awakenShieldTitle: '🌟 AEGIS OF ETERNITY',
    awakenShieldDesc: 'AWAKENING (Nova Shield + Barrier Core): Rupture unleashes dual shockwaves and discharges static lightning storms!',
    awakenRammerTitle: '🌟 DREADNOUGHT LEVIATHAN',
    awakenRammerDesc: 'AWAKENING (Meteor Rammer + Armor Core): Impact damage x2.5, grants 1.5s invulnerability upon each ram kill!',
    awakenSerpentTitle: '🌟 OUROBOROS GOD DRAGON',
    awakenSerpentDesc: 'AWAKENING (Cosmic Serpent + Dragon Core): Flaming golden dragon scales, zapping chain lightning on contact!',

    // Elite and Victory
    eliteAlert: '⚠️ WARNING: ELITE HOSTILE DETECTED! ⚠️',
    victoryTitle: '🏆 10-MINUTE SURVIVAL VICTORY! 🏆',
    victorySubtitle: 'You survived the cosmic abyss and purged the universe! Double Gold Awarded!',

    // Game Over
    gameOverTitle: 'SYSTEM PURGED',
    gameOverSubtitle: 'You fought until the last drop of dopamine.',
    statSurvive: 'Survive Time',
    statKills: 'Enemies Slain',
    statScore: 'Score',
    statGold: 'Total Gold Vault',
    retryBtn: 'PLAY AGAIN'
  },

  vi: {
    gameTitle: 'CHIẾN HẠM<br>VÔ CỰC',
    subTagline: '⚡ BÙNG NỔ DOPAMINE ⚡',
    startBtn: 'BẮT ĐẦU SĂN',
    hangarBtn: '⚙️ XƯỞNG PHI THUYỀN',
    themeDark: '🌙 TỐI',
    themeLight: '☀️ SÁNG',
    tipMobile: '📱 Di động: Kéo ngón cái để lướt • Nút EMP',
    tipPc: '💻 PC: Phím WASD • Phím Cách (Space): Sóng Chấn Động EMP',

    levelPrefix: 'CẤP',
    dopamineBurst: 'BÙNG NỔ DOPAMINE',
    frenzyOverload: '⚡ SIÊU CUỒNG NỘ ⚡',
    frenzyFloat: '⚡ QUÁ TẢI DOPAMINE ⚡',
    critFloat: 'CHÍ MẠNG!',
    reviveFloat: '💖 TÁI SINH THÀNH CÔNG! 💖',
    hordeAlert: '⚠️ CẢNH BÁO: BẦY QUÁI ĐANG TRÀN VÀO! ⚠️',

    // Phông nền chiến trường động (Sectors)
    sector1Title: 'SECTOR I: VỰC SÂU NGÂN HÀ',
    sector1Sub: 'Chòm sao rực sáng & tinh vân vũ trụ sâu thẳm',
    sector2Title: 'SECTOR II: CHIẾN TRƯỜNG HÀNH TINH',
    sector2Sub: 'Vành đai tiểu hành tinh & hỏa lực pháo kích tầm xa',
    sector3Title: 'SECTOR III: BÃO LỬA MẶT TRỜI & HỐ ĐEN',
    sector3Sub: 'Bề mặt thái dương rực lửa & hố đen tử thần',
    warpAlert: '⚡ BƯỚC NHẢY KHÔNG GIAN ⚡',
    sectorBadge1: 'SECTOR I: NGÂN HÀ',
    sectorBadge2: 'SECTOR II: CHIẾN TRƯỜNG',
    sectorBadge3: 'SECTOR III: BÃO LỬA',

    // Kho Skin & Cột mốc mở khóa
    skinSectionTitle: '🎨 BỘ SƯU TẬP SKIN (NGOẠI HÌNH & MAY MẮN)',
    skinEquipBtn: 'TRANG BỊ',
    skinEquippedBtn: '✓ ĐANG DÙNG',
    skinLockedLabel: '🔒 KHÓA',
    skinLuckBonus: 'May Mắn',
    msKills300: 'Hạ 300 quái vật',
    msCombo30: 'Đạt chuỗi 30 Combo',
    msSurvive180: 'Sống sót qua 3:00 (Sector II)',
    msSurvive420: 'Sống sót qua 7:00 (Sector III)',
    msGold1000: 'Tích lũy 1,000 Vàng',
    msVictory: 'Sống sót trọn vẹn 10:00 (Chiến thắng)',

    skinRammerDefault: 'Thiên Thạch Rực Lửa',
    skinRammerDefaultDesc: 'Lớp vỏ hợp kim bọc titan rực lửa cơ bản',
    skinRammerCyber: 'Cơ Khí Cyber Neon',
    skinRammerCyberDesc: 'Giáp góc cạnh điện tử màu xanh băng tuyết',
    skinRammerSolar: 'Hoàng Kim Thái Dương',
    skinRammerSolarDesc: 'Vỏ mạ vàng plasma chói lọi từ lõi mặt trời',
    skinRammerVoid: 'Hư Không Hắc Ám',
    skinRammerVoidDesc: 'Vỏ hắc diện thạch tử thần từ hố đen vũ trụ',

    skinSerpentDefault: 'Mãng Xà Lục Bảo',
    skinSerpentDefaultDesc: 'Vảy rồng lục bảo nguyên bản sắc sảo',
    skinSerpentNeon: 'Bạch Xà Cyber Neon',
    skinSerpentNeonDesc: 'Đốt thân dẫn truyền xung điện tử Neon Cyan',
    skinSerpentCrimson: 'Hỏa Long Huyết Nguyệt',
    skinSerpentCrimsonDesc: 'Đốt thân rực lửa bốc khói nham thạch đỏ',
    skinSerpentCelestial: 'Thần Long Thiên Giới',
    skinSerpentCelestialDesc: 'Vảy vàng thiên giới và ngọc lam vương giả',

    skinNovaDefault: 'Khiên Lam Tinh',
    skinNovaDefaultDesc: 'Vỏ máy phát xung kích màu xanh lam năng lượng',
    skinNovaPlasma: 'Khiên Plasma Hổ Phách',
    skinNovaPlasmaDesc: 'Hào quang từ trường plasma màu cam bốc lửa',
    skinNovaDarkMatter: 'Vật Chất Tối',
    skinNovaDarkMatterDesc: 'Từ trường cực quang tím hấp thụ bóng đêm',
    skinNovaAegisSun: 'Khiên Thánh Thái Dương',
    skinNovaAegisSunDesc: 'Hào quang vàng rực thần thánh đẩy lùi bóng tối',

    skinCarrierDefault: 'Mẫu Hạm Tím Neon',
    skinCarrierDefaultDesc: 'Boong phóng drone công nghệ cyber tím',
    skinCarrierArctic: 'Hạm Đội Băng Cực',
    skinCarrierArcticDesc: 'Lớp sơn ngụy trang băng tuyết và drone hàn băng',
    skinCarrierStellar: 'Chiến Hạm Sao Băng',
    skinCarrierStellarDesc: 'Hỏa lực tinh vân đỏ rực và drone xung nhiệt',
    skinCarrierDivine: 'Mẫu Hạm Thần Thánh',
    skinCarrierDivineDesc: 'Hạm đội hoàng kim vương giả tối thượng',

    levelUpTitle: 'LÊN CẤP THÀNH CÔNG!',
    levelUpSubtitle: 'Chọn công nghệ cường hóa sinh học:',
    destinyLevelUpTitle: '⚡ LỰA CHỌN ĐỊNH MỆNH ⚡',
    destinyLevelUpSubtitle: 'Vũ trụ ban tặng duy nhất 1 ân huệ THẦN THOẠI ĐỎ tối thượng!',

    // Rarities (Độ hiếm phân cấp màu)
    rarityCommon: 'Thường',       // Trắng
    rarityRare: 'Hiếm',          // Xanh
    rarityEpic: 'Sử Thi',        // Tím
    rarityLegendary: 'Huyền Thoại', // Vàng
    rarityMythic: 'THẦN THOẠI',   // Đỏ (1-2%)
    rarityAwakening: 'THỨC TỈNH', // Vàng kim 7 màu

    // Categories
    categoryOffense: '⚔️ TẤN CÔNG',
    categorySupport: '🛡️ PHỤ TRỢ',
    categoryStat: '⚡ CHỈ SỐ',
    categoryMutation: '🧬 ĐỘT BIẾN',
    categoryFusion: '🔥 SIÊU NÂNG CẤP',
    categoryMythic: '👑 THẦN CẤP',
    categoryAwakening: '🌟 THỨC TỈNH VŨ KHÍ',
    categoryCore: '🧬 LÕI PHỤ TRỢ',

    // Starship Roster (3 Thân Tàu Khởi Đầu)
    shipSelectTitle: 'CHỌN PHI THUYỀN XUẤT TRẬN',
    shipSelectSubtitle: '3 thân tàu đại diện cho 3 cơ chế gameplay khác biệt hoàn toàn',
    shipSelectedBadge: 'SẴN SÀNG XUẤT KÍCH',
    shipSelectBtn: 'CHỌN TÀU NÀY',

    // 1. Rammer
    shipRammerName: 'TÀU TÔNG HÚC (RAMMER)',
    shipRammerRole: '☄️ VA CHẠM / THIÊN THẠCH',
    shipRammerDesc: 'Thân tàu siêu trọng tải. Lấy gia tốc lao thẳng vào giữa bầy địch như một quả thiên thạch rực lửa.',
    shipRammerTrait: '☄️ Thiên Thạch Công Phá',
    shipRammerTraitDesc: 'Sát thương va chạm cực cao (nhân chéo Khối lượng * Tốc độ). Giảm 70% sát thương khi đâm trực diện quái. Tông chết quái hồi +2 HP!',

    // 2. Serpent
    shipSerpentName: 'TÀU RỒNG XÀ (SERPENT)',
    shipSerpentRole: '🐉 ĐỐT THÂN / UỐN LƯỢN',
    shipSerpentDesc: 'Chiến hạm rồng xà uốn lượn. Bo tròn cô lập và quấn chết toàn bộ bầy quái nhỏ xung quanh.',
    shipSerpentTrait: '🐉 Đốt Thân Xà Thần',
    shipSerpentTraitDesc: 'Khởi đầu với 4 đốt thân nối đuôi nhau. Đốt thân chặn toàn bộ đạn và gây sát thương xé rách khi quẹt trúng quái!',

    // 3. Nova Shield
    shipNovaShieldName: 'KHIÊN XUNG KÍCH (NOVA SHIELD)',
    shipNovaShieldRole: '🛡️ BOM KHIÊN / SÓNG CHẤN ĐỘNG',
    shipNovaShieldDesc: 'Không có súng thường. Tận dụng áp sát kích nổ bom khiên diện rộng càn quét sạch sẽ màn hình.',
    shipNovaShieldTrait: '🛡️ Sóng Nổ Xung Kích',
    shipNovaShieldTraitDesc: 'Không súng thường. Khiên khi bị bắn vỡ (hoặc bấm Space) sẽ nổ tung một vòng sóng xung kích cực đại tỏa ra xung quanh!',

    // 4. Drone Carrier
    shipCarrierName: 'HẠM ĐỘI DRONE (CARRIER)',
    shipCarrierRole: '🛸 MẪU HẠM DRONE / TỰ ĐỘNG CHIẾN ĐẤU',
    shipCarrierDesc: 'Hàng không mẫu hạm tự động thả các mini drone độc lập có thanh máu riêng, trí tuệ nhân tạo và khả năng đỡ đòn.',
    shipCarrierTrait: '🛸 Quân Đoàn Mini Drone',
    shipCarrierTraitDesc: 'Mỗi 5s tự động thả 2 Mini Drone (140 HP) bay săn quái và đỡ đòn cho tàu mẹ trong 12s.',
    upgradeDroneTitle: 'Hạm Đội Drone',
    upgradeDroneDesc: '+25% Sát thương Drone, +40 Máu Drone, -0.2s Thời gian hồi chiêu thả.',
    upgradeDroneEvoTitle: '🔥 TIẾN HÓA: MẪU HẠM TỐI THƯỢNG',
    upgradeDroneEvoDesc: 'Mỗi đợt phóng 3 Mini Drone cực mạnh, thời gian tồn tại của Drone tăng lên 18 giây!',

    statHp: 'GIÁP / KHỐI LƯỢNG',
    statDmg: 'CÔNG',
    statSpd: 'TỐC ĐỘ',
    statDiff: 'BÁN KÍNH / TẦM',
    shipRareBadge: '⭐ CLASS',

    hangarTabShips: '🚀 CHI HẠM & KỸ NĂNG',
    hangarTabTech: '⚙️ CƯỜNG HÓA VĨNH VIỄN',
    hangarTabCodex: '📚 KHO BỂ NÂNG CẤP',
    hangarSelectShipBtn: 'CHỌN XUẤT TRẬN',

    hudHomeBtn: '🏠 MENU',
    hudSettingsBtn: '⚙️ CÀI ĐẶT',
    confirmQuit: 'Bạn có chắc chắn muốn thoát về Menu chính? Điểm số hiện tại sẽ được quy đổi thành Vàng.',
    shipStatsBtn: 'CHỈ SỐ',
    shipStatsTitle: 'CHỈ SỐ PHI THUYỀN REAL-TIME',
    settingsTitle: '⚙️ CÀI ĐẶT TRÒ CHƠI',
    settingsSub: 'Tùy chỉnh độ mờ giao diện & âm thanh',
    settingOpacity: '🪟 Độ Mờ Bảng DPS & Chỉ Số',
    settingOpacityTip: 'Kéo thanh trượt để chỉnh độ mờ kính của 2 bảng bên trái.',
    settingSound: '🔊 Âm Thanh & Nhạc Game',
    settingSoundTip: 'Bật hoặc tắt toàn bộ hiệu ứng âm thanh, tiếng súng và tiếng nhặt ngọc.',
    soundOn: 'BẬT',
    soundOff: 'TẮT',

    // Weapons
    blasterTitle: 'Súng Phóng Plasma',
    blasterUnlock: 'Kích Hoạt Súng Plasma',
    blasterDesc: 'Tăng thêm số tia đạn và tốc độ xả đạn liên thanh.',
    blasterEvo: '🔥 TIẾN HÓA: Bắn chùm 5 siêu tia laser xuyên thấu liên tục!',

    orbsTitle: 'Quả Cầu Hộ Thể',
    orbsUnlock: 'Kích Hoạt Quả Cầu Hộ Thể',
    orbsDesc: 'Quả cầu plasma xoay tròn quanh người nghiền nát quái áp sát.',
    orbsEvo: '🔥 TIẾN HÓA: 6 quả cầu năng lượng xoay cực đại tạo khiên bất tử!',

    lightningTitle: 'Sét Chuỗi Lan',
    lightningUnlock: 'Kích Hoạt Sét Chuỗi',
    lightningDesc: 'Phóng luồng điện cao thế giật xuyên chuỗi bầy quái.',
    lightningEvo: '🔥 TIẾN HÓA: Sấm sét hủy diệt 12 mục tiêu cùng lúc gây tê liệt!',

    glaiveTitle: 'Phi Tiêu Nảy',
    glaiveUnlock: 'Kích Hoạt Phi Tiêu Nảy',
    glaiveDesc: 'Ném phi tiêu tốc độ cao dội nảy liên tục qua đám đông quái vật.',

    missilesTitle: 'Tên Lửa Tầm Nhiệt',
    missilesUnlock: 'Kích Hoạt Tên Lửa',
    missilesDesc: 'Phóng chùm tên lửa tự khóa mục tiêu gần nhất và phát nổ nát bầy quái.',
    missilesEvo: '🔥 TIẾN HÓA: Mưa 10 đầu đạn tên lửa hủy diệt diện rộng cực đại!',

    wingmenTitle: 'Drone Đồng Minh',
    wingmenUnlock: 'Triệu Hồi Drone',
    wingmenDesc: '2 máy bay tiêm kích mini bay kè sát phi thuyền phụ xả laser.',
    wingmenEvo: '🔥 TIẾN HÓA: 4 drone tự hành trang bị chùm tia hỏa lực áp đảo!',

    // Bể Nâng Cấp Tinh Gọn (Chọn 1 trong 3)
    // Nhóm 1: Nhóm Nâng Cấp Chỉ Số (Phổ thông)
    thrustTitle: 'Gia Tốc (Thrust)',
    thrustDesc: 'Tốc độ bay +25%, tốc độ xoay tàu +15%.',
    juggernautTitle: 'Khuếch Đại (Juggernaut)',
    juggernautDesc: 'Tăng 40% kích thước và khối lượng tàu, tăng 30% máu, giảm 15% tốc độ xoay.',
    microcraftTitle: 'Thu Nhỏ (Micro-Craft)',
    microcraftDesc: 'Giảm 30% kích thước hitbox, tốc độ bay +35% (né đạn siêu dễ).',
    energycoreTitle: 'Lõi Năng Lượng (Energy Core)',
    energycoreDesc: 'Tốc độ hồi khiên +40%, giảm thời gian kích nổ khiên.',
    growsegmentsTitle: 'Mọc Đốt (Grow Segments)',
    growsegmentsDesc: 'Thêm 2 đốt thân phía sau (Tàu Rắn) hoặc kéo dài vệt lửa phản lực gây cháy (Tàu khác).',
    cosmicScopeTitle: 'Ống Kính Vũ Trụ (Cosmic Scope)',
    cosmicScopeDesc: 'Mở rộng 25% tầm nhìn camera toàn cảnh, tăng 45px bán kính hút ngọc từ xa.',

    // Nhóm 2: Nhóm Đột Biến Lối Chơi (Biến đổi cơ chế)
    drillTitle: 'Đâm Xuyên (Drill)',
    drillDesc: 'Khi húc quái chết, tàu không bị khựng lại mà lao thẳng qua tiếp.',
    burnfieldTitle: 'Khiên Lửa (Burn Field)',
    burnfieldDesc: 'Khiên liên tục gây sát thương thiêu đốt toàn bộ quái trong bán kính xung quanh.',
    ricochetTitle: 'Đạn Nảy (Ricochet)',
    ricochetDesc: 'Đạn hoặc mảnh vỡ khi va chạm nảy sang mục tiêu lân cận.',
    toxicexhaustTitle: 'Khí Độc Đuôi (Toxic Exhaust)',
    toxicexhaustDesc: 'Đuôi tàu (hoặc các đốt rắn) xả khói làm chậm và rút máu quái đi vào.',

    // Nhóm 3: Nhóm Siêu Nâng Cấp (Fusion Mods - Xuất hiện khi đạt cấp 10+)
    crashnovaTitle: '💥 Bom Quán Tính (Crash Nova)',
    crashnovaDesc: 'SIÊU NÂNG CẤP (Cấp 10+): Mỗi khi húc trúng mục tiêu, lập tức kích nổ một đợt sóng khiên (Tàu Húc & Tàu Khiên)!',
    irondragonTitle: '🐉 Mãng Xà Bọc Thép (Iron Dragon)',
    irondragonDesc: 'SIÊU NÂNG CẤP (Cấp 10+): Các đốt thân rắn nhận toàn bộ giáp và gai nhọn, quái chạm vào đốt thân bị bật ngược ra xa!',
    immortalityTitle: '👑 Bất Tử Hóa (Immortality)',
    immortalityDesc: 'SIÊU NÂNG CẤP (Cấp 10+): Tàu không còn bình máu xanh, toàn bộ quy đổi thành 1 lớp khiên duy nhất; bù lại sát thương nổ khiên tăng gấp 3 lần!',

    // Stat Buffs
    overclockTitle: 'Ép Xung Adrenaline',
    overclockDesc: '+25% Tốc độ đánh. Tất cả vũ khí xả đạn dồn dập hơn.',
    hyperchargeTitle: 'Lò Phản Ứng Siêu Cấp',
    hyperchargeDesc: '+25% Tổng sát thương cho toàn bộ kho vũ khí.',
    gravitywellTitle: 'Nam Châm Hút Ngọc',
    gravitywellDesc: '+50% Bán kính hút ngọc kinh nghiệm từ xa cực đã.',
    warpengineTitle: 'Động Cơ Tên Lửa',
    warpengineDesc: '+20% Tốc độ di chuyển. Lướt gió luồn lách thoát vòng vây.',
    eaglesightTitle: 'Radar Mắt Đại Bàng',
    eaglesightDesc: '+35% Tầm nhìn bao quát đấu trường & Tăng phạm vi phát hiện quái.',
    criticalsurgeTitle: 'Kính Ngắm Chuẩn Xác',
    criticalsurgeDesc: '+15% Tỷ lệ chí mạng, +40% Sát thương đòn đánh chí mạng.',
    nanorepairTitle: 'Tiêm Hồi Máu Khẩn Cấp',
    nanorepairDesc: 'Hồi phục ngay 60 Máu và tăng vĩnh viễn +25 Máu tối đa.',
    hullMassTitle: 'Khối Lượng Thân Tàu',
    hullMassDesc: '+40% Khối lượng & Hitbox. Tăng uy lực tông húc x1.6 cho Rammer và diện tích nổ cho Nova!',
    serpentSegmentsTitle: 'Đốt Thân Xà Vương',
    serpentSegmentsDesc: '+2 Đốt thân bọc thép. Kéo dài thân rồng, quẹt quái rộng hơn và chặn thêm đạn!',
    barrierRadiusTitle: 'Khuếch Đại Khiên & Thân',
    barrierRadiusDesc: '+35% Bán kính khiên và kích cỡ đốt thân. Vòng nổ Nova cực đại và đốt rắn khổng lồ!',
    spikedThornsTitle: 'Gai Gai Phản Đòn',
    spikedThornsDesc: 'Phản lại 100% sát thương va chạm cho quái vật và tăng sát thương quẹt thân!',
    tacticalnukeTitle: '☢️ BOM HẠT NHÂN THANH TRỪNG',
    tacticalnukeDesc: 'HUYỀN THOẠI: Quét sạch toàn bộ quái vật trên màn hình thành ngọc quý!',

    // KỸ NĂNG ĐỎ THẦN THOẠI SIÊU HIẾM (1-2% Tỉ Lệ Xuất Hiện)
    godPactTitle: 'Khế Ước Định Mệnh',
    godPactDesc: '🔴 THẦN THOẠI: Lần lên cấp tiếp theo CHỈ XUẤT HIỆN DUY NHẤT 1 THẺ nhưng là KỸ NĂNG ĐỎ CỰC MẠNH!',
    blackHoleTitle: 'Hố Đen Điểm Kỳ Dị',
    blackHoleDesc: '🔴 THẦN THOẠI: Cứ 12s triệu hồi Hố Đen khổng lồ gom sạch và nghiền nát toàn bộ quái vật!',
    bloodFrenzyTitle: 'Huyết Thần Thịnh Nộ',
    bloodFrenzyDesc: '🔴 THẦN THOẠI: +100% Tổng sát thương. Mỗi quái bị hạ gục hồi phục +1 Máu!',
    reaperTitle: 'Lưỡi Hái Đoạt Hồn',
    reaperDesc: '🔴 THẦN THOẠI: Mọi đòn đánh có 10% tỷ lệ KẾT LIỄU quái tức thì (One-Hit Kill)!',
    chronosTitle: 'Thời Không Ngưng Đọng',
    chronosDesc: '🔴 THẦN THOẠI: Cứ mỗi 20s đóng băng toàn thể quái vật trong 5 giây và nhận +60% sát thương!',

    // Hangar / Meta Tree (12 Nâng Cấp Vĩnh Viễn x 15 Cấp Độ)
    hangarTitle: 'XƯỞNG CÔNG NGHỆ PHI THUYỀN',
    hangarSubtitle: 'Dùng Vàng để nâng cấp vĩnh viễn sức mạnh phi thuyền lên tới Cấp 15.',
    upgradeHull: 'Gia Cố Giáp Thân Tàu',
    upgradeHullDesc: '+25 Máu gốc tối đa mỗi cấp (Cấp 15: +375 HP).',
    upgradeReactor: 'Lò Phản Ứng Lượng Tử',
    upgradeReactorDesc: '+8% Sát thương gốc cho mọi vũ khí (Cấp 15: +120% Sát thương).',
    upgradeFirerate: 'Bộ Tiếp Đạn Cao Tốc',
    upgradeFirerateDesc: '+4% Tốc độ xả đạn cho toàn bộ vũ khí (Cấp 15: +60% Tốc độ bắn).',
    upgradeSpeed: 'Động Cơ Ion Tăng Áp',
    upgradeSpeedDesc: '+3% Tốc độ bay của phi thuyền (Cấp 15: +45% Tốc độ bay).',
    upgradeShield: 'Khiên Trường Lực Hấp Thụ',
    upgradeShieldDesc: '+15 Điểm khiên bảo vệ tối đa (Cấp 15: +225 Khiên bảo vệ).',
    upgradeCrit: 'Hệ Thống Ngắm Chuẩn Laser',
    upgradeCritDesc: '+2% Tỉ lệ & +5% Sát thương bạo kích (Cấp 15: +30% Crit, +75% Sát thương bạo kích).',
    upgradeRegen: 'Mô-đun Tái Cấu Trúc Nano',
    upgradeRegenDesc: '+0.5 Máu tự phục hồi mỗi giây (Cấp 15: +7.5 HP/s).',
    upgradeMagnet: 'Phễu Hút Từ Trường',
    upgradeMagnetDesc: '+15px Bán kính nam châm hút ngọc (Cấp 15: +225px Hút ngọc).',
    upgradeLuck: 'Radar Thám Hiểm May Mắn',
    upgradeLuckDesc: '+3% Tỉ lệ may mắn nhặt đồ & thẻ hiếm (Cấp 15: +45% May mắn).',
    upgradeCooldown: 'Bộ Làm Mát Lượng Tử',
    upgradeCooldownDesc: '-2.5% Thời gian hồi chiêu mọi kỹ năng (Cấp 15: -37.5% Hồi chiêu).',
    upgradeGreed: 'Máy Khai Thác Khoáng Thạch',
    upgradeGreedDesc: '+10% Thưởng Vàng tích lũy sau mỗi trận (Cấp 15: +150% Vàng).',
    upgradeRevive: 'Cầu Cứu Hộ Lượng Tử',
    upgradeReviveDesc: 'Cứ mỗi 5 cấp nhận thêm 1 mạng hồi sinh (Cấp 15: +3 Mạng hồi sinh).',
    cardBenefitPrefix: 'LỢI ÍCH CẤP TIẾP THEO',
    costLabel: 'Giá',
    maxedLabel: 'TỐI ĐA (15/15)',
    closeBtn: 'ĐÓNG',

    // Slot Machine Chest
    chestTitle: '🎰 RƯƠNG MAY MẮN SLOT MACHINE',
    chestSpinning: 'Guồng đang quay...',
    chestJackpot: '🎉 TRÚNG LỚN JACKPOT! 🎉',
    claimBtn: 'NHẬN THƯỞNG',

    // Combos
    comboTitle: 'CHUỖI HẠ GỤC',
    combo10: '🔥 NỔI ĐIÊN (x1.2)',
    combo30: '⚡ BẤT BẠI (x1.5)',
    combo60: '💀 QUỶ DỮ CYBER (x2.0)',
    combo100: '👑 THẦN DOPAMINE (x3.0)',

    // Damage Meter
    damageMeterTitle: 'BẢNG SÁT THƯƠNG KỸ NĂNG',
    totalDamageLabel: 'Tổng Sát Thương Gây Ra',
    skill_blaster: 'Súng Phóng Plasma',
    skill_orbs: 'Quả Cầu Hộ Thể',
    skill_lightning: 'Sét Chuỗi Lan',
    skill_glaive: 'Phi Tiêu Nảy',
    skill_missiles: 'Tên Lửa Tầm Nhiệt',
    skill_wingmen: 'Drone Đồng Minh',
    skill_laser: 'Tia Laze Hội Tụ',
    skill_bombs: 'Mìn Nổ Không Gian',
    skill_emp: 'Sóng Chấn Động EMP',
    skill_nuke: 'Bom Hạt Nhân',
    skill_blackhole: 'Hố Đen Kỳ Dị',
    skill_ram: 'Thiết Giáp Tông Quái',
    skill_novashield: 'Sóng Khiên Nổ / Bất Tử',
    skill_burnfield: 'Khiên Lửa Thiêu Đốt',
    skill_flame: 'Vệt Đuôi Lửa',
    skill_serpent: 'Đốt Thân Mãng Xà',
    skill_thorns: 'Gai Phản Đòn',
    skill_toxic: 'Khí Độc Đuôi',
    executeFloat: '💀 KẾT LIỄU! 💀',
    destinyPactActivated: '⚡ KHẾ ƯỚC ĐỊNH MỆNH ĐÃ THIẾT LẬP! ⚡',

    // Vũ Khí Mới
    laserTitle: 'Tia Laze Hội Tụ',
    laserDesc: 'Bắn chùm tia laser năng lượng cao xuyên thủng mọi kẻ địch trên một đường thẳng.',
    laserEvo: 'Tia laze cực đại quét nhiệt thiêu đốt hàng loạt mục tiêu liên tục.',
    bombsTitle: 'Thả Mìn Không Gian',
    bombsDesc: 'Thả mìn nổ cảm ứng sau đuôi tàu, tự nổ diện rộng khi quái chạm vào (Thuộc Triệu Hồi).',
    bombsEvo: 'Thả mìn hạt nhân plasma công suất lớn với bán kính hủy diệt khổng lồ.',

    // Lõi Phụ Trợ (Điều kiện để Thức Tỉnh Vũ Khí & Tàu)
    core_firerateTitle: 'Lõi Tốc Đánh (Overclock)',
    core_firerateDesc: '+20% Tốc độ bắn & xả đạn cho toàn bộ vũ khí trên tàu.',
    core_blastTitle: 'Lõi Bán Kính Nổ (Blast Matrix)',
    core_blastDesc: '+35% Bán kính vụ nổ cho Mìn, Tên lửa và Sóng nổ khiên.',
    core_summonTitle: 'Lõi Triệu Hồi (Nanite Overlord)',
    core_summonDesc: '+40% Sát thương và Máu cho Drone & Mìn Không Gian (Đơn vị triệu hồi).',
    core_rangeTitle: 'Lõi Tầm Xa (Tachyon Scope)',
    core_rangeDesc: '+35% Tầm bắn, tầm quét laser và mở rộng tầm nhìn radar.',
    core_shieldTitle: 'Lõi Khiên (Barrier Matrix)',
    core_shieldDesc: '+50 HP Khiên Năng Lượng và giảm 25% thời gian nạp lại khiên.',
    core_hullTitle: 'Lõi Giáp Thân Tàu (Titan Armor)',
    core_hullDesc: '+40% Máu tối đa và +35% Khối lượng đâm húc.',
    core_tailTitle: 'Lõi Đốt Rồng (Dragon Tendon)',
    core_tailDesc: '+2 Đốt thân rồng bọc thép và +40% sát thương quẹt thân.',

    // Thức Tỉnh Vũ Khí & Tàu (Awakening / Evolution)
    awakenBlasterTitle: '🌟 GATLING LASERSTORM',
    awakenBlasterDesc: 'THỨC TỈNH (Blaster Lv5 + Lõi Tốc Đánh): 8 nòng đại bác xả đạn xuyên thấu bão lửa tốc độ ánh sáng!',
    awakenBombsTitle: '🌟 BOM HẠT NHÂN TẬN THẾ',
    awakenBombsDesc: 'THỨC TỈNH (Thả Bom Lv5 + Lõi Bán Kính): Mỗi mìn nổ phân tách thành 4 đầu đạn hạt nhân nổ chùm dây chuyền!',
    awakenDroneTitle: '🌟 HẠM ĐỘI MOTHERSHIP',
    awakenDroneDesc: 'THỨC TỈNH (Drone Lv5 + Lõi Triệu Hồi): Drone trang bị súng máy liên thanh 4 nòng, tên lửa tự dẫn, tồn tại vĩnh cửu!',
    awakenLaserTitle: '🌟 ORBITAL DEATH RAY',
    awakenLaserDesc: 'THỨC TỈNH (Laze Lv5 + Lõi Tầm Xa): 2 chùm tia laser quỹ đạo xoay 360 độ xé toạc toàn màn hình!',
    awakenShieldTitle: '🌟 AEGIS OF ETERNITY',
    awakenShieldDesc: 'THỨC TỈNH (Tàu Khiên + Lõi Khiên): Khiên vỡ tạo sóng xung kích kép và giải phóng bão sét tĩnh điện!',
    awakenRammerTitle: '🌟 DREADNOUGHT LEVIATHAN',
    awakenRammerDesc: 'THỨC TỈNH (Tàu Đâm + Lõi Giáp): Sát thương va chạm x2.5, nhận 1.5s bất tử mỗi khi tông chết quái!',
    awakenSerpentTitle: '🌟 OUROBOROS GOD DRAGON',
    awakenSerpentDesc: 'THỨC TỈNH (Tàu Rắn + Lõi Đốt): Đốt thân rồng biến thành vảy vàng rực lửa, phóng sét giật lan khi quẹt quái!',

    // Quái Tinh Anh & Chiến Thắng
    eliteAlert: '⚠️ CẢNH BÁO: QUÁI TINH ANH KHÔNG GIAN XUẤT HIỆN! ⚠️',
    victoryTitle: '🏆 CHIẾN THẮNG SINH TỒN 10 PHÚT! 🏆',
    victorySubtitle: 'Bạn đã sống sót qua 10 phút ác mộng và quét sạch vũ trụ! Thưởng vàng gấp đôi!',

    // Game Over
    gameOverTitle: 'HỆ THỐNG THẤT THỦ',
    gameOverSubtitle: 'Bạn đã chiến đấu đến giọt dopamine cuối cùng.',
    statSurvive: 'Thời Gian Sống Sót',
    statKills: 'Quái Đã Tiêu Diệt',
    statScore: 'Điểm Số',
    statGold: 'Kho Vàng Tích Lũy',
    retryBtn: 'CHƠI LẠI NGAY'
  }
};

class I18nManager {
  constructor() {
    this.lang = localStorage.getItem('dopamine_lang') || 'vi';
  }

  get current() {
    return this.lang;
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'vi') return;
    this.lang = lang;
    localStorage.setItem('dopamine_lang', lang);
  }

  t(key) {
    const dict = translations[this.lang] || translations.vi;
    return dict[key] || translations.en[key] || key;
  }
}

export const i18n = new I18nManager();
