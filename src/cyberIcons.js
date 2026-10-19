// Cyberpunk Skill & Weapon Vector Icon System
// Crisp, native SVG icons with neon glow, HUD tech frames, and circuit styling

const ICON_SVGS = {
  // ==========================================
  // WEAPONS & COMBAT SKILLS
  // ==========================================

  // 1. Blaster / Laser Cannon
  blaster: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blaster-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f0ff"/>
          <stop offset="100%" stop-color="#0072ff"/>
        </linearGradient>
      </defs>
      <!-- Base Chassis -->
      <polygon points="14,38 20,24 28,24 34,38 24,42" fill="rgba(0,240,255,0.15)" stroke="${c}" stroke-width="1.8"/>
      <!-- Dual Gun Barrels -->
      <line x1="18" y1="24" x2="18" y2="10" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="24" x2="30" y2="10" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Muzzle Brakes -->
      <rect x="15" y="8" width="6" height="4" rx="1" fill="${c}"/>
      <rect x="27" y="8" width="6" height="4" rx="1" fill="${c}"/>
      <!-- Energy Core -->
      <circle cx="24" cy="30" r="4" fill="#ffffff" stroke="${c}" stroke-width="1.5"/>
      <!-- Twin Laser Bolts -->
      <line x1="18" y1="6" x2="18" y2="2" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="30" y1="6" x2="30" y2="2" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <!-- Crosshair Tick Marks -->
      <path d="M10 24 L6 24 M38 24 L42 24" stroke="${c}" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>
  `,

  // 2. Orbs / Plasma Satellites
  orbs: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Central Quantum Core -->
      <circle cx="24" cy="24" r="7" fill="rgba(244,63,94,0.2)" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="24" r="3" fill="#ffffff"/>
      <!-- Tilted Elliptical Orbit Paths -->
      <ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(-30 24 24)" stroke="${c}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.6"/>
      <ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(45 24 24)" stroke="${c}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.4"/>
      <!-- Orbiting Cyber Satellites -->
      <circle cx="37" cy="16" r="3.5" fill="${c}" stroke="#ffffff" stroke-width="1"/>
      <circle cx="11" cy="32" r="3" fill="${c}" stroke="#ffffff" stroke-width="1"/>
      <circle cx="16" cy="13" r="2.5" fill="#f43f5e" stroke="#ffffff" stroke-width="0.8"/>
    </svg>
  `,

  // 3. Lightning / EMP Chain
  lightning: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cyber Lightning Angular Bolt -->
      <polygon points="26,4 12,24 22,24 18,44 36,20 25,20" fill="rgba(56,189,248,0.25)" stroke="${c}" stroke-width="2" stroke-linejoin="miter"/>
      <!-- Bright Core -->
      <polygon points="25,10 16,23 23,23 20,38 31,22 24,22" fill="#ffffff" opacity="0.9"/>
      <!-- Electric Arc Sparks -->
      <path d="M8 16 L12 18 M36 32 L41 34 M32 10 L37 8 M14 36 L9 39" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  // 4. Glaive / Cyber Shuriken
  glaive: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 4 Curved Nanite Blades -->
      <path d="M24 16 L24 4 C32 10 38 16 32 24 L24 24 Z" fill="rgba(168,85,247,0.25)" stroke="${c}" stroke-width="1.8"/>
      <path d="M32 24 L44 24 C38 32 32 38 24 32 L24 24 Z" fill="rgba(168,85,247,0.25)" stroke="${c}" stroke-width="1.8"/>
      <path d="M24 32 L24 44 C16 38 10 32 16 24 L24 24 Z" fill="rgba(168,85,247,0.25)" stroke="${c}" stroke-width="1.8"/>
      <path d="M16 24 L4 24 C10 16 16 10 24 16 L24 24 Z" fill="rgba(168,85,247,0.25)" stroke="${c}" stroke-width="1.8"/>
      <!-- Central Kinetic Hub -->
      <circle cx="24" cy="24" r="5" fill="#2e1065" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="24" r="2" fill="#ffffff"/>
      <!-- Rotation Stream -->
      <circle cx="24" cy="24" r="19" stroke="${c}" stroke-width="1" stroke-dasharray="5 6" opacity="0.5"/>
    </svg>
  `,

  // 5. Missiles / Micro Rockets
  missiles: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left Rocket -->
      <g transform="translate(4, 0)">
        <polygon points="12,8 16,16 16,32 12,36 8,32 8,16" fill="rgba(249,115,22,0.2)" stroke="${c}" stroke-width="1.6"/>
        <polygon points="12,8 14,14 10,14" fill="#ffffff"/>
        <!-- Fins -->
        <polygon points="8,26 4,32 8,32" fill="${c}"/>
        <polygon points="16,26 20,32 16,32" fill="${c}"/>
        <!-- Thruster Fire -->
        <polygon points="10,36 12,44 14,36" fill="#facc15"/>
      </g>
      <!-- Right Rocket (Slightly Advanced) -->
      <g transform="translate(18, -4)">
        <polygon points="12,8 16,16 16,32 12,36 8,32 8,16" fill="rgba(249,115,22,0.2)" stroke="${c}" stroke-width="1.6"/>
        <polygon points="12,8 14,14 10,14" fill="#ffffff"/>
        <polygon points="8,26 4,32 8,32" fill="${c}"/>
        <polygon points="16,26 20,32 16,32" fill="${c}"/>
        <polygon points="10,36 12,44 14,36" fill="#facc15"/>
      </g>
      <!-- HUD Lock-on Bracket -->
      <path d="M4 14 L4 8 L10 8 M38 8 L44 8 L44 14" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
    </svg>
  `,

  // 6. Wingmen / Combat Drone
  wingmen: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Stealth Delta Wing UAV -->
      <polygon points="24,6 40,34 32,38 24,30 16,38 8,34" fill="rgba(16,185,129,0.2)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <!-- Inner Cockpit Sensor Eye -->
      <polygon points="24,14 28,24 24,28 20,24" fill="#ffffff" stroke="${c}" stroke-width="1.2"/>
      <!-- Wingtip Cannons -->
      <line x1="8" y1="30" x2="8" y2="20" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="30" x2="40" y2="20" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <!-- Ion Thruster Plume -->
      <polygon points="22,33 24,42 26,33" fill="#38bdf8"/>
    </svg>
  `,

  // 7. Laser / Orbital Railgun
  laser: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Targeting Matrix Reticle -->
      <circle cx="24" cy="24" r="16" stroke="${c}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.6"/>
      <circle cx="24" cy="24" r="6" stroke="${c}" stroke-width="1.2"/>
      <!-- Concentrated Laser Beam -->
      <line x1="4" y1="24" x2="44" y2="24" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
      <line x1="4" y1="24" x2="44" y2="24" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
      <!-- Focusing Lenses / Brackets -->
      <path d="M14 14 L24 6 L34 14 M14 34 L24 42 L34 34" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
    </svg>
  `,

  // 8. Bombs / Space Mine
  bombs: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Hexagonal Core Container -->
      <polygon points="24,12 34,18 34,30 24,36 14,30 14,18" fill="rgba(250,204,21,0.2)" stroke="${c}" stroke-width="2"/>
      <!-- 6 Proximity Spikes -->
      <line x1="24" y1="12" x2="24" y2="4" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="36" x2="24" y2="44" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="34" y1="18" x2="41" y2="14" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="30" x2="7" y2="34" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="34" y1="30" x2="41" y2="34" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="18" x2="7" y2="14" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <!-- Inner Hazard Pulsar -->
      <circle cx="24" cy="24" r="5" fill="#ef4444" stroke="#ffffff" stroke-width="1.2"/>
    </svg>
  `,

  // 9. EMP Shockwave / Ultimate
  emp: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Expanding EMP Hex Rings -->
      <polygon points="24,6 39,15 39,33 24,42 9,33 9,15" stroke="${c}" stroke-width="1.4" opacity="0.4" stroke-dasharray="4 3"/>
      <polygon points="24,12 34,18 34,30 24,36 14,30 14,18" stroke="${c}" stroke-width="1.8" fill="rgba(250,204,21,0.15)"/>
      <!-- Central High-Volt Core -->
      <circle cx="24" cy="24" r="6" fill="${c}"/>
      <polygon points="25,18 20,24 24,24 23,30 28,24 24,24" fill="#000000"/>
      <!-- Radial Shock Discharge -->
      <line x1="24" y1="4" x2="24" y2="0" stroke="${c}" stroke-width="2"/>
      <line x1="44" y1="24" x2="48" y2="24" stroke="${c}" stroke-width="2"/>
      <line x1="24" y1="44" x2="24" y2="48" stroke="${c}" stroke-width="2"/>
      <line x1="4" y1="24" x2="0" y2="24" stroke="${c}" stroke-width="2"/>
    </svg>
  `,

  // ==========================================
  // GOD-TIER & MYTHIC SKILLS
  // ==========================================

  // 10. Godpact / Destiny Overclock
  godpact: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Neural Overclock Chip -->
      <rect x="12" y="12" width="24" height="24" rx="3" fill="rgba(250,204,21,0.2)" stroke="${c}" stroke-width="2"/>
      <!-- Chip Pins -->
      <path d="M16 12 L16 6 M24 12 L24 6 M32 12 L32 6 M16 36 L16 42 M24 36 L24 42 M32 36 L32 42" stroke="${c}" stroke-width="1.8"/>
      <path d="M12 16 L6 16 M12 24 L6 24 M12 32 L6 32 M36 16 L42 16 M36 24 L42 24 M36 32 L42 32" stroke="${c}" stroke-width="1.8"/>
      <!-- Infinity Sync Symbol -->
      <path d="M18 24 C18 21 21 21 24 24 C27 27 30 27 30 24 C30 21 27 21 24 24 C21 27 18 27 18 24 Z" stroke="#ffffff" stroke-width="2" fill="none"/>
    </svg>
  `,

  // 11. Black Hole / Cosmic Singularity
  blackhole: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Gravitational Vortex Spiral -->
      <circle cx="24" cy="24" r="18" stroke="${c}" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.5"/>
      <path d="M24 6 C34 6 42 14 42 24 C42 34 34 42 24 42 C14 42 6 34 6 24" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 11 C31 11 37 17 37 24 C37 31 31 37 24 37" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Event Horizon Abyss -->
      <circle cx="24" cy="24" r="8" fill="#030712" stroke="${c}" stroke-width="2.5"/>
      <circle cx="24" cy="24" r="2" fill="#ec4899"/>
    </svg>
  `,

  // 12. Blood God Frenzy / Crimson Overdrive
  bloodfrenzy: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cyber Adrenaline Syringe & Blood Drop -->
      <path d="M24 4 C24 4 11 19 11 28 C11 35 17 41 24 41 C31 41 37 35 37 28 C37 19 24 4 24 4 Z" fill="rgba(239,68,68,0.25)" stroke="${c}" stroke-width="2"/>
      <!-- Inner Pulse ECG Heartbeat -->
      <path d="M16 28 L20 28 L22 22 L25 34 L28 26 L30 28 L32 28" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Micro Sparks -->
      <circle cx="24" cy="14" r="2" fill="#ffffff"/>
    </svg>
  `,

  // 13. Reaper / Zero-Day Execution
  reaper: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cyber Skull Silhouette -->
      <path d="M14 18 C14 11 18 8 24 8 C30 8 34 11 34 18 C34 23 32 26 30 28 L30 36 L18 36 L18 28 C16 26 14 23 14 18 Z" fill="rgba(225,29,72,0.2)" stroke="${c}" stroke-width="2"/>
      <!-- Cyber Eye Sockets -->
      <polygon points="18,18 22,20 19,23" fill="#ffffff"/>
      <polygon points="30,18 26,20 29,23" fill="#ffffff"/>
      <!-- Teeth Grill -->
      <line x1="21" y1="31" x2="21" y2="36" stroke="${c}" stroke-width="1.8"/>
      <line x1="24" y1="31" x2="24" y2="36" stroke="${c}" stroke-width="1.8"/>
      <line x1="27" y1="31" x2="27" y2="36" stroke="${c}" stroke-width="1.8"/>
      <!-- Crosshair Sights -->
      <path d="M6 24 L10 24 M38 24 L42 24 M24 2 L24 6 M24 38 L24 42" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,

  // 14. Chronos Stasis / Time Dilation
  chronos: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Digital Hourglass Frame -->
      <polygon points="12,8 36,8 26,24 36,40 12,40 22,24" fill="rgba(6,182,212,0.2)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <!-- Time Horizon Line -->
      <line x1="15" y1="14" x2="33" y2="14" stroke="${c}" stroke-width="1.5"/>
      <line x1="16" y1="34" x2="32" y2="34" stroke="${c}" stroke-width="1.5"/>
      <!-- Digital Sands Flow -->
      <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
      <line x1="24" y1="26" x2="24" y2="34" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 2"/>
      <!-- Freeze Ring Accents -->
      <path d="M6 18 C6 18 4 24 6 30 M42 18 C42 18 44 24 42 30" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  // ==========================================
  // STAT UPGRADES & PASSIVE MODULES
  // ==========================================

  // 15. Thrust / Acceleration
  thrust: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- High-Speed Fighter Rocket -->
      <polygon points="24,4 32,24 28,26 28,34 20,34 20,26 16,24" fill="rgba(249,115,22,0.25)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <!-- Cockpit -->
      <polygon points="24,10 26,18 22,18" fill="#ffffff"/>
      <!-- Dual Exhaust Plumes -->
      <polygon points="21,35 24,45 27,35" fill="#facc15"/>
      <polygon points="17,31 16,39 20,33" fill="${c}"/>
      <polygon points="31,31 32,39 28,33" fill="${c}"/>
      <!-- Speed Chevron Trails -->
      <path d="M8 20 L4 24 L8 28 M40 20 L44 24 L40 28" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,

  // 16. Juggernaut / Reinforced Bulkhead
  juggernaut: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Heavy Beveled Shield -->
      <polygon points="24,4 40,10 38,30 24,44 10,30 8,10" fill="rgba(56,189,248,0.2)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <!-- Armor Plating Seams -->
      <polygon points="24,12 33,16 31,28 24,37 17,28 15,16" stroke="${c}" stroke-width="1.5" fill="none"/>
      <!-- Rivets -->
      <circle cx="24" cy="24" r="3" fill="#ffffff"/>
      <circle cx="15" cy="14" r="1.5" fill="${c}"/>
      <circle cx="33" cy="14" r="1.5" fill="${c}"/>
    </svg>
  `,

  // 17. Micro-Craft / Nanite Stealth Airframe
  microcraft: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Shrinking Boundary Tech Box -->
      <path d="M10 16 L10 10 L16 10 M38 16 L38 10 L32 10 M10 32 L10 38 L16 38 M38 32 L38 38 L32 38" stroke="${c}" stroke-width="1.5" opacity="0.5"/>
      <!-- Agile Micro-Vessel -->
      <polygon points="24,14 34,30 28,32 24,28 20,32 14,30" fill="rgba(52,211,153,0.3)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="24" cy="22" r="2" fill="#ffffff"/>
      <!-- Agility Arrows -->
      <path d="M4 24 L8 24 M40 24 L44 24" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  // 18. Energy Core / Plasma Battery
  energycore: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Battery Frame -->
      <rect x="14" y="10" width="20" height="30" rx="3" fill="rgba(34,197,94,0.15)" stroke="${c}" stroke-width="2"/>
      <!-- Terminal Cap -->
      <rect x="20" y="6" width="8" height="4" rx="1" fill="${c}"/>
      <!-- Energy Level Cells -->
      <rect x="18" y="15" width="12" height="4" rx="1" fill="#ffffff"/>
      <rect x="18" y="22" width="12" height="4" rx="1" fill="${c}"/>
      <rect x="18" y="29" width="12" height="4" rx="1" fill="${c}"/>
      <!-- Energy Charge Lightning Bolt -->
      <path d="M26 18 L21 26 L25 26 L22 34" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  // 19. Grow Segments / Serpent Spine
  growsegments: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Articulated Cyber Vertebrae Chain -->
      <circle cx="14" cy="34" r="6" fill="rgba(16,185,129,0.2)" stroke="${c}" stroke-width="1.8"/>
      <circle cx="24" cy="24" r="7" fill="rgba(16,185,129,0.3)" stroke="${c}" stroke-width="2"/>
      <circle cx="34" cy="14" r="6" fill="rgba(16,185,129,0.2)" stroke="${c}" stroke-width="1.8"/>
      <!-- Spinal Connectors -->
      <line x1="18" y1="30" x2="20" y2="28" stroke="#ffffff" stroke-width="2"/>
      <line x1="28" y1="20" x2="30" y2="18" stroke="#ffffff" stroke-width="2"/>
      <!-- Glowing Core Nodes -->
      <circle cx="14" cy="34" r="2" fill="#ffffff"/>
      <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
      <circle cx="34" cy="14" r="2" fill="#ffffff"/>
    </svg>
  `,

  // 20. Nanorepair / Cyber Medkit
  nanorepair: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- High-Tech Cyber Syringe / Nanite Injector -->
      <g transform="rotate(-45 24 24)">
        <rect x="21" y="8" width="6" height="24" rx="2" fill="rgba(20,184,166,0.25)" stroke="${c}" stroke-width="2"/>
        <line x1="24" y1="32" x2="24" y2="44" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <line x1="17" y1="8" x2="31" y2="8" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Measurement Ticks -->
        <line x1="21" y1="14" x2="24" y2="14" stroke="${c}" stroke-width="1.5"/>
        <line x1="21" y1="20" x2="24" y2="20" stroke="${c}" stroke-width="1.5"/>
        <line x1="21" y1="26" x2="24" y2="26" stroke="${c}" stroke-width="1.5"/>
      </g>
      <!-- Nanite Sparkles -->
      <path d="M38 12 L40 8 L42 12 L46 14 L42 16 L40 20 L38 16 L34 14 Z" fill="#ffffff"/>
    </svg>
  `,

  // 21. Cosmic Scope / Sensor Radar
  cosmicscope: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Radar Target Scope Rings -->
      <circle cx="24" cy="24" r="18" stroke="${c}" stroke-width="1.8"/>
      <circle cx="24" cy="24" r="10" stroke="${c}" stroke-width="1.2" stroke-dasharray="3 3"/>
      <!-- Crosshairs with Gap -->
      <line x1="24" y1="4" x2="24" y2="16" stroke="${c}" stroke-width="1.8"/>
      <line x1="24" y1="32" x2="24" y2="44" stroke="${c}" stroke-width="1.8"/>
      <line x1="4" y1="24" x2="16" y2="24" stroke="${c}" stroke-width="1.8"/>
      <line x1="32" y1="24" x2="44" y2="24" stroke="${c}" stroke-width="1.8"/>
      <!-- Detected Target Blip -->
      <circle cx="31" cy="17" r="2.5" fill="#ef4444"/>
      <circle cx="24" cy="24" r="2" fill="#ffffff"/>
    </svg>
  `,

  // 22. Drone Upgrade / Carrier Fleet
  drone_upgrade: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Lead Drone -->
      <polygon points="24,8 30,20 26,22 24,19 22,22 18,20" fill="rgba(132,204,22,0.3)" stroke="${c}" stroke-width="1.8"/>
      <circle cx="24" cy="14" r="1.5" fill="#ffffff"/>
      <!-- Left Drone -->
      <polygon points="12,24 17,34 14,35 12,33 10,35 7,34" fill="rgba(132,204,22,0.2)" stroke="${c}" stroke-width="1.5"/>
      <!-- Right Drone -->
      <polygon points="36,24 41,34 38,35 36,33 34,35 31,34" fill="rgba(132,204,22,0.2)" stroke="${c}" stroke-width="1.5"/>
      <!-- Tactical Formation Beam Grid -->
      <line x1="24" y1="20" x2="12" y2="24" stroke="${c}" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>
      <line x1="24" y1="20" x2="36" y2="24" stroke="${c}" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>
    </svg>
  `,

  // 23. Drill / Turbo Ram
  drill: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Spiral Penetration Drill Cone -->
      <polygon points="24,4 36,34 12,34" fill="rgba(234,179,8,0.25)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M15 28 C20 29 28 29 33 28" stroke="${c}" stroke-width="2"/>
      <path d="M18 20 C22 21 26 21 30 20" stroke="${c}" stroke-width="2"/>
      <path d="M21 12 C23 13 25 13 27 12" stroke="${c}" stroke-width="2"/>
      <polygon points="24,4 26,9 22,9" fill="#ffffff"/>
      <!-- Base Motor -->
      <rect x="16" y="34" width="16" height="8" rx="2" fill="${c}"/>
    </svg>
  `,

  // 24. Burn Field / Solar Afterburner
  burnfield: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cyber Flame Crest -->
      <path d="M24 4 C24 4 30 14 30 22 C30 24 33 22 36 26 C40 32 36 42 24 44 C12 42 8 32 12 26 C15 22 18 24 18 22 C18 14 24 4 24 4 Z" fill="rgba(234,88,12,0.25)" stroke="${c}" stroke-width="2"/>
      <!-- Inner White-Hot Flame Core -->
      <path d="M24 16 C24 16 28 22 28 28 C28 32 26 36 24 38 C22 36 20 32 20 28 C20 22 24 16 24 16 Z" fill="#ffffff"/>
    </svg>
  `,

  // 25. Ricochet / Quantum Deflector
  ricochet: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 3 Reflecting Cyber Mirrors -->
      <line x1="8" y1="20" x2="16" y2="12" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="12" x2="40" y2="20" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="40" x2="28" y2="40" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
      <!-- Zigzag Ricochet Laser Path -->
      <path d="M6 34 L12 16 L36 16 L24 40 L42 34" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="16" r="2.5" fill="${c}"/>
      <circle cx="36" cy="16" r="2.5" fill="${c}"/>
      <circle cx="24" cy="40" r="2.5" fill="${c}"/>
    </svg>
  `,

  // 26. Toxic Exhaust / Neurotoxin
  toxicexhaust: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Biohazard Cyber Tri-Blade Motif -->
      <circle cx="24" cy="24" r="5" fill="rgba(163,230,53,0.3)" stroke="${c}" stroke-width="2"/>
      <path d="M24 14 C27 10 33 10 36 14 C34 18 30 19 27 19" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <path d="M33 29 C37 32 37 38 33 41 C29 40 27 36 27 33" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 29 C11 32 11 38 15 41 C19 40 21 36 21 33" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="24" cy="24" r="2" fill="#ffffff"/>
      <!-- Toxic Droplets -->
      <circle cx="12" cy="12" r="1.5" fill="${c}"/>
      <circle cx="38" cy="10" r="1.5" fill="${c}"/>
    </svg>
  `,

  // 27. Spiked Thorns / Reactive Armor
  spikedthorns: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Central Armor Node -->
      <polygon points="24,14 34,24 24,34 14,24" fill="rgba(101,163,13,0.3)" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="24" r="3" fill="#ffffff"/>
      <!-- 4 Razor Spikes -->
      <polygon points="24,2 26,14 22,14" fill="${c}"/>
      <polygon points="46,24 34,26 34,22" fill="${c}"/>
      <polygon points="24,46 22,34 26,34" fill="${c}"/>
      <polygon points="2,24 14,22 14,26" fill="${c}"/>
      <!-- 4 Corner Barbs -->
      <line x1="17" y1="17" x2="8" y2="8" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="31" y1="17" x2="40" y2="8" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="31" y1="31" x2="40" y2="40" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="17" y1="31" x2="8" y2="40" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  // 28. Crash Nova / Kinetic Collision
  crashnova: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 8-Point Kinetic Impact Star -->
      <polygon points="24,2 28,17 44,12 33,24 46,34 30,32 24,46 18,32 2,34 15,24 4,12 20,17" fill="rgba(245,158,11,0.25)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <!-- White Blast Center -->
      <circle cx="24" cy="24" r="5" fill="#ffffff"/>
      <!-- Shock Ring -->
      <circle cx="24" cy="24" r="14" stroke="${c}" stroke-width="1.5" stroke-dasharray="3 3"/>
    </svg>
  `,

  // 29. Iron Dragon / Serpent Mecha
  irondragon: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Mecha Dragon Head Silhouette -->
      <polygon points="24,6 36,16 34,26 42,28 32,38 24,34 16,38 6,28 14,26 12,16" fill="rgba(250,204,21,0.25)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
      <!-- Glowing Red Dragon Eyes -->
      <polygon points="18,22 22,23 19,25" fill="#ef4444"/>
      <polygon points="30,22 26,23 29,25" fill="#ef4444"/>
      <!-- Cyber Fangs -->
      <polygon points="21,34 24,39 27,34" fill="#ffffff"/>
    </svg>
  `,

  // 30. Immortality / Aegis Stasis
  immortality: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Diamond Forcefield Matrix -->
      <polygon points="24,4 42,24 24,44 6,24" fill="rgba(56,189,248,0.2)" stroke="${c}" stroke-width="2"/>
      <!-- Sacred Caduceus Energy Wings -->
      <circle cx="24" cy="18" r="4" fill="#ffffff" stroke="${c}" stroke-width="1.5"/>
      <line x1="24" y1="22" x2="24" y2="38" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M16 26 C20 22 28 22 32 26" stroke="${c}" stroke-width="2" fill="none"/>
      <path d="M14 32 C20 28 28 28 34 32" stroke="${c}" stroke-width="2" fill="none"/>
    </svg>
  `,

  // 31. Tactical Nuke / Radiation
  tacticalnuke: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Hazard Radiation Trefoil Symbol -->
      <circle cx="24" cy="24" r="5" fill="#ffffff" stroke="${c}" stroke-width="1.5"/>
      <path d="M24 19 L20 7 C22 6 26 6 28 7 Z" fill="${c}"/>
      <path d="M28 26 L38 32 C37 35 34 38 31 39 Z" fill="${c}"/>
      <path d="M20 26 L10 32 C11 35 14 38 17 39 Z" fill="${c}"/>
      <!-- Outer Warning Hexagon -->
      <polygon points="24,3 42,13 42,35 24,45 6,35 6,13" stroke="${c}" stroke-width="2" fill="none" stroke-dasharray="6 3"/>
    </svg>
  `,

  // ==========================================
  // SUPPORT CORES (EVOLUTION CATALYSTS)
  // ==========================================

  core_firerate: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Tachometer Overclock Meter -->
      <path d="M10 32 A 16 16 0 1 1 38 32" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
      <!-- Redline Zone -->
      <path d="M30 13 A 16 16 0 0 1 38 32" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
      <!-- Speed Needle -->
      <line x1="24" y1="28" x2="34" y2="16" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="24" cy="28" r="4" fill="${c}"/>
    </svg>
  `,

  core_blast: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Expanding Blast Wave Core -->
      <circle cx="24" cy="24" r="6" fill="#ffffff" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="24" r="12" stroke="${c}" stroke-width="1.8" stroke-dasharray="4 3"/>
      <circle cx="24" cy="24" r="18" stroke="${c}" stroke-width="1.4" opacity="0.6"/>
      <!-- Blast Radiation Vectors -->
      <line x1="24" y1="3" x2="24" y2="8" stroke="${c}" stroke-width="2"/>
      <line x1="24" y1="40" x2="24" y2="45" stroke="${c}" stroke-width="2"/>
      <line x1="3" y1="24" x2="8" y2="24" stroke="${c}" stroke-width="2"/>
      <line x1="40" y1="24" x2="45" y2="24" stroke="${c}" stroke-width="2"/>
    </svg>
  `,

  core_summon: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Drone Uplink Satellite Beacon -->
      <polygon points="24,6 36,18 24,30 12,18" fill="rgba(74,222,128,0.25)" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="18" r="3" fill="#ffffff"/>
      <!-- Sub-nodes -->
      <circle cx="10" cy="38" r="4" fill="${c}"/>
      <circle cx="24" cy="40" r="4" fill="${c}"/>
      <circle cx="38" cy="38" r="4" fill="${c}"/>
      <line x1="24" y1="30" x2="10" y2="38" stroke="${c}" stroke-width="1.5" stroke-dasharray="2 2"/>
      <line x1="24" y1="30" x2="24" y2="40" stroke="${c}" stroke-width="1.5" stroke-dasharray="2 2"/>
      <line x1="24" y1="30" x2="38" y2="38" stroke="${c}" stroke-width="1.5" stroke-dasharray="2 2"/>
    </svg>
  `,

  core_range: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Deep Space Targeting Reticle -->
      <circle cx="24" cy="24" r="16" stroke="${c}" stroke-width="1.5"/>
      <circle cx="24" cy="24" r="8" stroke="${c}" stroke-width="1.2"/>
      <line x1="24" y1="2" x2="24" y2="46" stroke="${c}" stroke-width="1.5"/>
      <line x1="2" y1="24" x2="46" y2="24" stroke="${c}" stroke-width="1.5"/>
      <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
      <rect x="20" y="20" width="8" height="8" stroke="#ffffff" stroke-width="1" fill="none"/>
    </svg>
  `,

  core_shield: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dual Layer Hex Shield Matrix -->
      <polygon points="24,6 40,15 40,33 24,42 8,33 8,15" fill="rgba(96,165,250,0.2)" stroke="${c}" stroke-width="2"/>
      <polygon points="24,12 34,18 34,30 24,36 14,30 14,18" stroke="#ffffff" stroke-width="1.5" fill="none"/>
      <circle cx="24" cy="24" r="4" fill="${c}"/>
    </svg>
  `,

  core_hull: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Exoskeleton Bulkhead Node -->
      <rect x="12" y="10" width="24" height="28" rx="4" fill="rgba(148,163,184,0.2)" stroke="${c}" stroke-width="2"/>
      <line x1="12" y1="24" x2="36" y2="24" stroke="${c}" stroke-width="2"/>
      <circle cx="18" cy="17" r="2" fill="#ffffff"/>
      <circle cx="30" cy="17" r="2" fill="#ffffff"/>
      <circle cx="18" cy="31" r="2" fill="#ffffff"/>
      <circle cx="30" cy="31" r="2" fill="#ffffff"/>
    </svg>
  `,

  core_tail: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cyber Tail Blade Link -->
      <path d="M10 38 Q 24 38 24 24 Q 24 10 38 10" stroke="${c}" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="10" cy="38" r="5" fill="${c}"/>
      <circle cx="24" cy="24" r="5" fill="#ffffff"/>
      <polygon points="38,4 44,10 38,16 32,10" fill="${c}"/>
    </svg>
  `,

  // ==========================================
  // AWAKENED LEGENDARY WEAPONS
  // ==========================================

  awaken_blaster: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="#facc15" stroke-width="2" stroke-dasharray="4 2"/>
      <!-- Multi-Barrel Gatling Array -->
      <polygon points="24,6 30,18 24,14 18,18" fill="#facc15"/>
      <line x1="16" y1="20" x2="16" y2="8" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="24" y1="18" x2="24" y2="4" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="20" x2="32" y2="8" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="18,36 30,36 34,42 14,42" fill="rgba(250,204,21,0.3)" stroke="#facc15" stroke-width="2"/>
    </svg>
  `,

  awaken_bombs: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="12" fill="rgba(250,204,21,0.3)" stroke="#facc15" stroke-width="2.5"/>
      <polygon points="24,4 32,24 24,44 16,24" stroke="#ffffff" stroke-width="1.8" fill="none"/>
      <circle cx="24" cy="24" r="5" fill="#ef4444"/>
      <circle cx="24" cy="24" r="2" fill="#ffffff"/>
    </svg>
  `,

  awaken_drone: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Mothership Fleet Carrier -->
      <polygon points="24,4 42,36 24,30 6,36" fill="rgba(250,204,21,0.25)" stroke="#facc15" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="24,12 30,24 24,22 18,24" fill="#ffffff"/>
      <circle cx="16" cy="38" r="2" fill="#facc15"/>
      <circle cx="24" cy="38" r="2.5" fill="#ffffff"/>
      <circle cx="32" cy="38" r="2" fill="#facc15"/>
    </svg>
  `,

  awaken_laser: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="#facc15" stroke-width="2"/>
      <line x1="2" y1="24" x2="46" y2="24" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <polygon points="24,8 30,24 24,40 18,24" fill="#ef4444"/>
      <circle cx="24" cy="24" r="4" fill="#ffffff"/>
    </svg>
  `,

  awaken_shield: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,4 42,12 38,34 24,44 10,34 6,12" fill="rgba(250,204,21,0.3)" stroke="#facc15" stroke-width="2.5"/>
      <polygon points="24,14 34,18 32,30 24,37 16,30 14,18" stroke="#ffffff" stroke-width="2" fill="none"/>
      <circle cx="24" cy="25" r="4" fill="#ffffff"/>
    </svg>
  `,

  awaken_rammer: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,4 44,28 34,40 24,34 14,40 4,28" fill="rgba(250,204,21,0.3)" stroke="#facc15" stroke-width="2.5"/>
      <polygon points="24,12 34,26 24,22 14,26" fill="#ffffff"/>
    </svg>
  `,

  awaken_serpent: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="#facc15" stroke-width="2.5" stroke-dasharray="8 4"/>
      <polygon points="24,4 34,14 24,20 14,14" fill="#facc15"/>
      <circle cx="24" cy="24" r="5" fill="#34d399"/>
      <circle cx="24" cy="24" r="2" fill="#ffffff"/>
    </svg>
  `,

  // ==========================================
  // HANGAR TECH PERMANENT UPGRADES
  // ==========================================

  hull: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,6 40,12 36,32 24,42 12,32 8,12" fill="rgba(56,189,248,0.2)" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="24" r="4" fill="#ffffff"/>
    </svg>
  `,

  reactor: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Tokamak Fusion Reactor Torus -->
      <circle cx="24" cy="24" r="16" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="24" r="8" fill="rgba(168,85,247,0.3)" stroke="#ffffff" stroke-width="1.8"/>
      <circle cx="24" cy="24" r="3" fill="#ffffff"/>
      <line x1="24" y1="4" x2="24" y2="12" stroke="${c}" stroke-width="2"/>
      <line x1="24" y1="36" x2="24" y2="44" stroke="${c}" stroke-width="2"/>
      <line x1="4" y1="24" x2="12" y2="24" stroke="${c}" stroke-width="2"/>
      <line x1="36" y1="24" x2="44" y2="24" stroke="${c}" stroke-width="2"/>
    </svg>
  `,

  magnet: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- High-Tech Horseshoe Magnet -->
      <path d="M12 10 L12 24 C12 30 18 36 24 36 C30 36 36 30 36 24 L36 10" stroke="${c}" stroke-width="4" stroke-linecap="square" fill="none"/>
      <!-- Pole Tips -->
      <rect x="10" y="6" width="4" height="6" fill="#ef4444"/>
      <rect x="34" y="6" width="4" height="6" fill="#38bdf8"/>
      <!-- Magnetic Flux Lines -->
      <path d="M16 16 C20 20 28 20 32 16" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 2" fill="none"/>
    </svg>
  `,

  revive: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cybernetic Heart / Phoenix Reboot -->
      <path d="M24 38 L10 24 C6 18 10 10 18 10 C21 10 23 12 24 14 C25 12 27 10 30 10 C38 10 42 18 38 24 Z" fill="rgba(244,63,94,0.25)" stroke="${c}" stroke-width="2"/>
      <path d="M16 22 L21 22 L23 16 L25 28 L27 22 L32 22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  greed: (c) => `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cyber Crypto Chip / Gold Matrix -->
      <circle cx="24" cy="24" r="16" fill="rgba(250,204,21,0.2)" stroke="${c}" stroke-width="2"/>
      <polygon points="24,12 32,24 24,36 16,24" stroke="#ffffff" stroke-width="1.8" fill="none"/>
      <circle cx="24" cy="24" r="3" fill="#facc15"/>
    </svg>
  `
};

// Aliases for synonyms and alternate keys
ICON_SVGS.nuke = ICON_SVGS.tacticalnuke;
ICON_SVGS.ram = ICON_SVGS.juggernaut;
ICON_SVGS.novashield = ICON_SVGS.core_shield;
ICON_SVGS.flame = ICON_SVGS.burnfield;
ICON_SVGS.serpent = ICON_SVGS.growsegments;
ICON_SVGS.thorns = ICON_SVGS.spikedthorns;
ICON_SVGS.toxic = ICON_SVGS.toxicexhaust;

// Color mapping for skill keys
const SKILL_COLORS = {
  blaster: '#00f0ff',
  orbs: '#f43f5e',
  lightning: '#38bdf8',
  glaive: '#a855f7',
  missiles: '#f97316',
  wingmen: '#10b981',
  laser: '#ff2255',
  bombs: '#fbbf24',
  emp: '#ffe600',
  godpact: '#facc15',
  blackhole: '#ec4899',
  bloodfrenzy: '#ef4444',
  reaper: '#e11d48',
  chronos: '#06b6d4',
  thrust: '#f97316',
  juggernaut: '#38bdf8',
  microcraft: '#34d399',
  energycore: '#22c55e',
  growsegments: '#10b981',
  nanorepair: '#14b8a6',
  cosmicscope: '#0ea5e9',
  drone_upgrade: '#84cc16',
  drill: '#eab308',
  burnfield: '#ea580c',
  ricochet: '#8b5cf6',
  toxicexhaust: '#a3e635',
  spikedthorns: '#65a30d',
  crashnova: '#f59e0b',
  irondragon: '#facc15',
  immortality: '#38bdf8',
  tacticalnuke: '#facc15',
  core_firerate: '#facc15',
  core_blast: '#fb923c',
  core_summon: '#4ade80',
  core_range: '#818cf8',
  core_shield: '#60a5fa',
  core_hull: '#94a3b8',
  core_tail: '#34d399',
  awaken_blaster: '#facc15',
  awaken_bombs: '#facc15',
  awaken_drone: '#facc15',
  awaken_laser: '#facc15',
  awaken_shield: '#facc15',
  awaken_rammer: '#facc15',
  awaken_serpent: '#facc15',
  hull: '#38bdf8',
  reactor: '#a855f7',
  magnet: '#ef4444',
  revive: '#f43f5e',
  greed: '#facc15'
};

// Map emojis to skill keys if only emoji is passed
const EMOJI_TO_KEY = {
  '⚡': 'blaster',
  '🪐': 'orbs',
  '🌩️': 'lightning',
  '🌀': 'glaive',
  '🚀': 'missiles',
  '🛸': 'wingmen',
  '🔴': 'laser',
  '🔦': 'laser',
  '💣': 'bombs',
  '🕳️': 'blackhole',
  '🩸': 'bloodfrenzy',
  '💀': 'reaper',
  '⏳': 'chronos',
  '🛡️': 'juggernaut',
  '🔋': 'energycore',
  '🐉': 'growsegments',
  '💉': 'nanorepair',
  '🔭': 'cosmicscope',
  '🌪️': 'drill',
  '🔥': 'burnfield',
  '☄️': 'burnfield',
  '💫': 'ricochet',
  '☣️': 'toxicexhaust',
  '🌵': 'spikedthorns',
  '💥': 'crashnova',
  '🐲': 'irondragon',
  '⚚': 'immortality',
  '☢️': 'tacticalnuke',
  '🦾': 'core_hull',
  '🌟': 'awaken_blaster',
  '⚛️': 'reactor',
  '🧲': 'magnet',
  '💖': 'revive',
  '🪙': 'greed'
};

/**
 * Returns raw cyberpunk SVG markup for a given skill key
 * @param {string} key - Skill or weapon ID (e.g. 'blaster', 'orbs', 'godpact')
 * @param {string} [customColor] - Override neon color
 * @returns {string} SVG HTML string
 */
export function getCyberSkillIcon(key, customColor) {
  if (!key) return '';
  const cleanKey = String(key).toLowerCase().trim();
  const resolvedKey = ICON_SVGS[cleanKey] ? cleanKey : (EMOJI_TO_KEY[key] || cleanKey);
  const renderFn = ICON_SVGS[resolvedKey];
  const color = customColor || SKILL_COLORS[resolvedKey] || '#00f0ff';

  if (renderFn) {
    return renderFn(color);
  }

  // Fallback to generic cyber pulse if key not found
  return `
    <svg viewBox="0 0 48 48" class="cyber-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,6 38,14 38,34 24,42 10,34 10,14" stroke="${color}" stroke-width="2" fill="rgba(0,240,255,0.1)"/>
      <circle cx="24" cy="24" r="5" fill="${color}"/>
    </svg>
  `;
}

/**
 * Returns fully framed Cyberpunk HUD skill icon HTML
 * @param {string} id - Skill identifier
 * @param {string} [fallback] - Existing icon or emoji
 * @param {string} [customColor] - Neon accent color
 * @returns {string} HTML string
 */
export function renderCyberIconHtml(id, fallback, customColor) {
  // If id is provided and found, use it
  if (id && (ICON_SVGS[id] || EMOJI_TO_KEY[id])) {
    return getCyberSkillIcon(id, customColor);
  }
  // If fallback matches an emoji mapping, resolve it
  if (fallback && EMOJI_TO_KEY[fallback]) {
    return getCyberSkillIcon(EMOJI_TO_KEY[fallback], customColor);
  }
  // If fallback is already an SVG string
  if (typeof fallback === 'string' && fallback.includes('<svg')) {
    return fallback;
  }
  // Try id fallback
  if (id) {
    return getCyberSkillIcon(id, customColor);
  }
  return fallback || '';
}
