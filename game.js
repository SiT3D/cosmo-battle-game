const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const abilityIconEl = document.getElementById("abilityIcon");
const abilityNameEl = document.getElementById("abilityName");
const abilityHintEl = document.getElementById("abilityHint");
const hpLabelEl = document.getElementById("hpLabel");
const powerLabelEl = document.getElementById("powerLabel");
const timeLabelEl = document.getElementById("timeLabel");
const passiveTrayEl = document.getElementById("passiveTray");
const abilityTilesEl = document.getElementById("abilityTiles");
const levelHudEl = document.getElementById("levelHud");
const campaignOverlayEl = document.getElementById("campaignOverlay");

const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
const VIEW = { width: 0, height: 0 };
const ARENA = { x: 0, y: 0, width: 0, height: 0 };

const WALL_BOUNCE = 0.94;
const INACTIVE_TIME_SCALE = 1 / 14;
const TIME_SCALE_TRANSITION = 1.2;
const MOVE_TO_POINT_SPEED = 441;
const MOVE_STOP_DISTANCE = 10;
const MOVE_ACCELERATION = 741;
const MOVE_BRAKE = 956;
const PLAYER_TURN_RATE = 2.94;
const PLAYER_TRAJECTORY_STEPS = 42;
const PLAYER_TRAJECTORY_STEP_TIME = 1 / 30;
const PLAYER_TURN_BRAKE_ANGLE = Math.PI * 0.55;
const PLAYER_TURN_MIN_SPEED_FACTOR = 0.22;
const ENEMY_SIZE = 22;
const DEFAULT_ENEMY_HP = 2;
const SHIELD_ENEMY_HP = 4;
const ENEMY_DASH_SPEED = 816;
const ENEMY_MOVE_STOP_DISTANCE = 10;
const ENEMY_MOVE_ACCELERATION = 632;
const ENEMY_MOVE_BRAKE = 816;
const ENEMY_DASH_MIN_DISTANCE = 220;
const ENEMY_DASH_MAX_DISTANCE = 420;
const MIN_ENEMIES_PER_LEVEL = 50;
const MIN_ENEMY_TYPES_PER_LEVEL = 8;
const LEVEL1_BOSS_KIND = "level1_boss";
const LEVEL2_BOSS_KIND = "level2_boss";
const LEVEL3_BOSS_KIND = "level3_boss";
const BOSS_KINDS = [LEVEL1_BOSS_KIND, LEVEL2_BOSS_KIND, LEVEL3_BOSS_KIND];
const LEVEL1_BOSS_PHASE_ONE_HP = 20;
const LEVEL1_BOSS_PHASE_TWO_HP = 40;
const LEVEL1_BOSS_LEVEL_ONE_PHASE_TWO_HP = 10;
const LEVEL1_BOSS_LEVEL_TWO_PHASE_TWO_HP = 15;
const LEVEL1_BOSS_SIZE = 52;
const LEVEL1_BOSS_BOUNCE_SPEED = 210;
const LEVEL1_BOSS_CHASE_SPEED = 155;
const LEVEL1_BOSS_CHASE_ACCELERATION = 360;
const LEVEL1_BOSS_EXPLOSION_INTERVAL = 5;
const LEVEL1_BOSS_SHIELD_TIME = 2.1;
const LEVEL1_BOSS_SHIELD_RADIUS = 92;
const LEVEL1_BOSS_BLINK_TIME = 0.95;
const LEVEL1_BOSS_RADIAL_SHOTS = 30;
const LEVEL1_BOSS_RADIAL_SPEED = 520;
const LEVEL2_BOSS_PHASE_HP = 10;
const LEVEL2_BOSS_SIZE = 48;
const LEVEL2_BOSS_CHASE_SPEED = 118;
const LEVEL2_BOSS_CHASE_ACCELERATION = 320;
const LEVEL2_BOSS_PULL_DELAY = 3;
const LEVEL2_BOSS_PULL_CAST_TIME = 0.75;
const LEVEL2_BOSS_PULL_DURATION = 1.1;
const LEVEL2_BOSS_PULL_SPEED = MOVE_TO_POINT_SPEED * 0.5;
const LEVEL2_BOSS_PULL_RADIUS_CELLS = 3;
const LEVEL2_BOSS_STAGE_TWO_PULL_RADIUS_CELLS = 2;
const LEVEL2_BOSS_CHARGE_TIME = 2;
const LEVEL2_BOSS_DASH_TIME = 0.5;
const LEVEL2_BOSS_DASH_SPEED = 760;
const LEVEL2_BOSS_PULL_AFTER_DASH_DELAY = 1;
const LEVEL2_BOSS_BOUNCE_SPEED = 620;
const LEVEL2_BOSS_MINE_INTERVAL = 0.13;
const LEVEL2_BOSS_MINE_ARM_TIME = 2;
const LEVEL2_BOSS_MINE_BLAST_RADIUS_CELLS = 2.5;
const LEVEL2_BOSS_MINE_BLAST_SPEED = 260;
const LEVEL3_BOSS_SIZE = 50;
const LEVEL3_BOSS_STAGE_ONE_HP = 20;
const LEVEL3_BOSS_STAGE_TWO_HP = 15;
const LEVEL3_BOSS_STAGE_THREE_HP = 10;
const LEVEL3_BOSS_RADIAL_INTERVAL = 7;
const LEVEL3_BOSS_RADIAL_CAST_TIME = 1.5;
const LEVEL3_BOSS_RADIAL_SHOTS = 6;
const LEVEL3_BOSS_RADIAL_ARC = Math.PI * 0.62;
const LEVEL3_BOSS_MISSILE_INTERVAL = 3;
const LEVEL3_BOSS_MISSILE_LIFETIME = 3;
const LEVEL3_BOSS_MISSILE_SPEED = 160;
const LEVEL3_BOSS_MISSILE_ACCELERATION = 560;
const LEVEL3_BOSS_MISSILE_TURN_RATE = 5.8;
const LEVEL3_BOSS_MOVE_SPEED = 126;
const LEVEL3_BOSS_MOVE_ACCELERATION = 340;
const LEVEL3_BOSS_STAGE_TWO_VOLLEY_COOLDOWN = 3;
const LEVEL3_BOSS_STAGE_TWO_VOLLEY_COUNT = 5;
const LEVEL3_BOSS_STAGE_TWO_MISSILE_SPEED_MULTIPLIER = 0.7;
const LEVEL3_BOSS_STAGE_THREE_LASER_INTERVAL = 3;
const LEVEL3_BOSS_STAGE_THREE_LASER_CAST_TIME = 0.5;
const BRUTE_CHASE_SPEED = 97;
const BRUTE_CHASE_ACCELERATION = 260;
const BRUTE_CONTACT_HP = 5;
const SPROUTLING_CHASE_SPEED = 206;
const SPROUTLING_CHASE_ACCELERATION = 520;
const SPLITTER_CHILD_LIMIT = 8;
const SLOW_ENEMY_CHASE_SPEED = 148;
const SLOW_ENEMY_CHASE_ACCELERATION = 420;
const COMMANDER_HP = 3;
const COMMANDER_AURA_RADIUS = 76 * 4;
const COMMANDER_RALLY_DISTANCE = COMMANDER_AURA_RADIUS * 0.45;
const COMMANDER_SPEED_MULTIPLIER = 1.5;
const MEDIC_HP = 3;
const MEDIC_MOVE_SPEED_MULTIPLIER = 1.2;
const MEDIC_SUPPORT_INTERVAL = 4.5;
const MEDIC_SUPPORT_RANGE = 420;
const ENEMY_MAX_COUNT = 1;
const ENEMY_MAX_COUNT_LEVEL_OFFSET = 3;
const ENEMY_SPAWN_TELEGRAPH = 3;
const ENEMY_SPAWN_INTERVAL = [1.62, 3.7];
const ENEMY_SPAWN_INTERVAL_MULTIPLIER = 0.9;
const GRID_CELLS = 8;
const HOOK_RANGE_CELLS = 2;
const HOOK_SPEED = 1180;
const HOOK_PULL_SPEED_CELLS = 2 / 1.1;
const TELEPORT_CHARGE_TIME = 2;
const DECOY_RANGE_CELLS = 4;
const BASE_GUN_PROJECTILE_SPEED = 560;
const BASE_GUN_PROJECTILE_RADIUS = 7;
const BASE_GUN_PROJECTILE_LIFETIME = 2.2;
const BASE_GUN_COOLDOWN = 10;
const BASE_GUN_LEVEL_COOLDOWN_REDUCTION = 0.3;
const BASE_GUN_MAX_CHARGES = 5;
const LASER_RANGE_CELLS = 4;
const LASER_CHARGE_TIME = 0.5;
const PLAYER_LASER_CHARGE_TIME = 0.05;
const SNIPER_CHARGE_TIME = 15;
const PLAYER_SNIPER_CHARGE_TIME = 0.22;
const SPRAY_CHARGE_TIME = 1;
const PLAYER_SPRAY_CHARGE_TIME = 0.7;
const PLAYER_MISSILE_SPEED = 232;
const PLAYER_MISSILE_ACCELERATION = 760;
const PLAYER_MISSILE_TURN_RATE = 7.4;
const PLAYER_MISSILE_LIFETIME = 3.8;
const PLAYER_MISSILE_COUNT = 3;
const PLAYER_MISSILE_SPAWN_SPREAD = Math.PI * 0.18;
const ENEMY_SPRAY_PROJECTILE_COUNT = 7;
const PLAYER_SPRAY_PROJECTILE_COUNT = 13;
const SPRAY_SHOT_INTERVAL = 0.06;
const SPRAY_RANDOM_SPREAD = Math.PI * 0.14;
const LASER_PROJECTILE_SPEED = 460;
const PLAYER_STOLEN_LASER_SPEED_MULTIPLIER = 3.92;
const LASER_PROJECTILE_LENGTH = 58;
const LASER_PROJECTILE_WIDTH = 8;
const ENEMY_DASH_DELAY_AFTER_SHOT = 0.14;
const LASER_ENEMY_DASH_SPEED = (ENEMY_DASH_SPEED / 3) * 0.6;
const LASER_ENEMY_MOVE_ACCELERATION = (ENEMY_MOVE_ACCELERATION / 3) * 0.6;
const LASER_ENEMY_MOVE_BRAKE = (ENEMY_MOVE_BRAKE / 3) * 0.6;
const SPRAY_ENEMY_DASH_SPEED = ENEMY_DASH_SPEED * 0.5;
const SPRAY_ENEMY_MOVE_ACCELERATION = ENEMY_MOVE_ACCELERATION * 0.5;
const SPRAY_ENEMY_MOVE_BRAKE = ENEMY_MOVE_BRAKE * 0.5;
const SPRAY_ENEMY_RECOVER_DELAY = 0.8;
const SLOW_FIELD_RADIUS = 92;
const SLOW_FIELD_SPEED_MULTIPLIER = 0.38;
const SLOW_ENEMY_RECOVER_DELAY = 0.4;
const SLOW_ENEMY_HOLD_DISTANCE = 54;
const ENEMY_SHIELD_WINDUP_TIME = 0.5;
const ENEMY_SHIELD_UP_TIME = 1.2;
const ENEMY_MINE_INTERVAL_MIN = 3;
const ENEMY_MINE_INTERVAL_MAX = 10;
const GROWER_SEED_INTERVAL_MIN = 4.8;
const GROWER_SEED_INTERVAL_MAX = 7.2;
const GROWER_SEED_HATCH_TIME = 2.9;
const GROWER_SEED_RADIUS = 10;
const GROWER_SEED_MAX_COUNT = 7;
const GROWER_HATCHLING_LIMIT = 5;
const PLAYER_SHIELD_TIME = 5;
const SHIELD_COOLDOWN = 5;
const HOOK_COOLDOWN = 8;
const SHIELD_RADIUS = 84;
const ENEMY_SHIELD_RADIUS_MULTIPLIER = 2;
const PLAYER_SHIELD_BOSS_DAMAGE = 1;
const ENEMY_TOOLTIP_DELAY = 0.08;
const STOLEN_LASER_CHARGES = 7;
const STOLEN_ABILITY_CHARGES = 3;
const STOLEN_SHIELD_CHARGES = 2;
const STOLEN_BLAST_CHARGES = 4;
const STOLEN_SNIPER_CHARGES = 3;
const STOLEN_DECOY_CHARGES = 3;
const STOLEN_MISSILE_CHARGES = 2;
const STOLEN_BOMBER_BLAST_CHARGES = 2;
const BLAST_RANGE_CELLS = 4;
const BLAST_MAX_RADIUS = 311 * 1.5;
const BLAST_EXPAND_SPEED = 44;
const LEVEL1_BOSS_BLAST_MAX_RADIUS = BLAST_MAX_RADIUS * 0.7 * 1.7;
const LEVEL1_BOSS_BLAST_EXPAND_SPEED = BLAST_EXPAND_SPEED * 0.7;
const BOMBER_BLAST_MAX_RADIUS = 132 * 4;
const BOMBER_BLAST_EXPAND_SPEED = 120;
const PULSE_BOMB_INTERVAL = 1;
const PULSE_BOMB_EXPLOSIONS = 5;
const PULSE_BOMB_OFFSET_CELLS = 0.28;
const DECOY_DURATION = 10;
const DECOY_SIZE = 24;
const PLAYER_DECOY_PASSIVE_TOTAL = 3;
const PLAYER_DECOY_PASSIVE_INTERVAL = 5;
const PASSIVE_XP_INTERVAL = 10;
const PASSIVE_XP_AMOUNT = 2;
const PLAYER_MIRROR_PASSIVE_DURATION = 10;
const PLAYER_MINE_PASSIVE_TOTAL = 20;
const PLAYER_MINE_PASSIVE_DURATION = 60;
const PLAYER_MINE_PASSIVE_INTERVAL = PLAYER_MINE_PASSIVE_DURATION / PLAYER_MINE_PASSIVE_TOTAL;
const STOLEN_TRIPWIRE_CHARGES = 3;
const TRIPWIRE_LIFETIME = 30;
const TRIPWIRE_DAMAGE = 3;
const TRIPWIRE_LENGTH_CELLS = 1.25;
const TRIPWIRE_WIDTH = 8;
const PLAYER_ABILITY_CAPACITY = 2;
const MIRROR_SHIELD_DURATION = 10;
const MIRROR_SHIELD_COOLDOWN = 30;
const MIRROR_SHIELD_LENGTH_CELLS = 1.25;
const MIRROR_SHIELD_WIDTH = 10;
const MIRROR_SHIELD_FORWARD_OFFSET = 22;
const STOLEN_SPLITTER_CHARGES = 3;
const SPLITTER_PROJECTILE_COUNT = 3;
const SPLITTER_PROJECTILE_SPEED = 360;
const SPLITTER_PROJECTILE_LIFETIME = 3.4;
const SPLITTER_PROJECTILE_RADIUS = 7;
const SPLITTER_PROJECTILE_AMPLITUDE = 34;
const SPLITTER_PROJECTILE_FREQUENCY = 8.2;
const MINE_LIFETIME = 30;
const MINE_RADIUS = 12;
const REPLICATOR_CLONE_TIME = 10;
const REPLICATOR_HOP_DELAY = 0.28;
const TRICKSTER_ILLUSION_LIFETIME = 8;
const TRICKSTER_ILLUSION_LIMIT = 4;
const DEATH_RESET_DELAY = 0.8;
const ENEMY_HIT_FLASH_TIME = 0.18;

const player = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  facingAngle: -Math.PI * 0.5,
  size: 30,
  dragging: false,
  moving: false,
  launched: false,
  restingFor: 0,
  hp: 3,
  maxHp: 3,
  xp: 0,
  xpLevel: 1,
  xpNext: 6,
  upgrades: null,
  hitFlash: 0,
  hitShake: 0,
  hitInvuln: 0,
  moveTarget: null,
  dead: false,
};

const abilities = {
  hook: {
    key: "hook",
    name: "Хук",
    hint: "Click",
  },
  teleport: {
    key: "teleport",
    name: "Телепорт",
    hint: "Click",
  },
  sidearm: {
    key: "sidearm",
    name: "Пушка",
    hint: "Click",
  },
  laser: {
    key: "laser",
    name: "Лазер",
    hint: "Click",
  },
  spray: {
    key: "spray",
    name: "Спрей",
    hint: "Click",
  },
  shield: {
    key: "shield",
    name: "Щит",
    hint: "Click",
  },
  sniper: {
    key: "sniper",
    name: "Снайпер",
    hint: "Click",
  },
  decoy: {
    key: "decoy",
    name: "Приманка",
    hint: "Click",
  },
  missiles: {
    key: "missiles",
    name: "Ракеты",
    hint: "Click",
  },
  blast: {
    key: "blast",
    name: "Взрыв",
    hint: "Click",
  },
  pulse_bomb: {
    key: "pulse_bomb",
    name: "Пульс-бомба",
    hint: "Click",
  },
  splitter: {
    key: "splitter",
    name: "Зигзаг",
    hint: "Click",
  },
  tripwire: {
    key: "tripwire",
    name: "Растяжка",
    hint: "Click",
  },
};

const enemyMeta = {
  laser: { name: "Красные", color: "#ff5a5a", glow: "rgba(255, 90, 90, 0.55)" },
  shield: { name: "Желтые", color: "#ffc94d", glow: "rgba(255, 201, 77, 0.55)" },
  spray: { name: "Фиолетовые", color: "#b758ff", glow: "rgba(183, 88, 255, 0.55)" },
  mine: { name: "Мины", color: "#51d86b", glow: "rgba(81, 216, 107, 0.5)" },
  bomber: { name: "Подрывники", color: "#ff8f35", glow: "rgba(255, 143, 53, 0.55)" },
  splitter: { name: "Делители", color: "#4ee6a8", glow: "rgba(78, 230, 168, 0.55)" },
  commander: { name: "Командиры", color: "#2ad3ff", glow: "rgba(42, 211, 255, 0.55)" },
  mirror: { name: "Зеркала", color: "#c9f3ff", glow: "rgba(201, 243, 255, 0.58)" },
  brute: { name: "Танки", color: "#ffd44f", glow: "rgba(255, 212, 79, 0.55)" },
  sniper: { name: "Снайперы", color: "#a71d32", glow: "rgba(167, 29, 50, 0.55)" },
  trickster: { name: "Иллюзии", color: "#ff74ca", glow: "rgba(255, 116, 202, 0.5)" },
  grower: { name: "Садовники", color: "#9aea44", glow: "rgba(154, 234, 68, 0.5)" },
  slow: { name: "Белые", color: "#e7edf7", glow: "rgba(231, 237, 247, 0.5)" },
  heal: { name: "Лечилки", color: "#63bfff", glow: "rgba(99, 191, 255, 0.5)" },
  medic: { name: "Медики", color: "#36f0ff", glow: "rgba(54, 240, 255, 0.55)" },
  replicator: { name: "Клоны", color: "#7de8ff", glow: "rgba(125, 232, 255, 0.5)" },
  [LEVEL1_BOSS_KIND]: { name: "Босс", color: "#ff315f", glow: "rgba(255, 49, 95, 0.62)" },
  [LEVEL2_BOSS_KIND]: { name: "Магнит", color: "#ff7a2f", glow: "rgba(255, 122, 47, 0.62)" },
  [LEVEL3_BOSS_KIND]: { name: "Арсенал", color: "#a86cff", glow: "rgba(168, 108, 255, 0.62)" },
};

const enemyInfo = {
  laser: { text: "Стреляет заряженным лучом перед рывком.", reward: `Лазер, ${STOLEN_LASER_CHARGES} зарядов.` },
  shield: { text: "Поднимает защитную ауру и давит сближением.", reward: `Щит, ${STOLEN_SHIELD_CHARGES} заряда.` },
  spray: { text: "Выпускает веер быстрых снарядов.", reward: `Спрей, ${STOLEN_ABILITY_CHARGES} заряда.` },
  mine: { text: "Оставляет опасные мины на поле.", reward: "Пассив: серия мин вокруг игрока." },
  bomber: { text: "Взрывается волной при гибели.", reward: `Пульс-бомба, ${STOLEN_BOMBER_BLAST_CHARGES} заряда.` },
  splitter: { text: "После смерти делится на мелкие цели.", reward: `Зигзаг, ${STOLEN_SPLITTER_CHARGES} заряда.` },
  splitter_child: { text: "Мелкий осколок делителя.", reward: "Только опыт." },
  commander: { text: "Ускоряет ближайших союзников.", reward: "Больше опыта." },
  mirror: { text: "На 10 секунд ставит перед собой плоский отражающий щит.", reward: `Растяжки, ${STOLEN_TRIPWIRE_CHARGES} заряда.` },
  brute: { text: "Крепкий враг с большим запасом HP.", reward: "Нельзя съесть хуком." },
  sniper: { text: "Долго целится и стреляет точным выстрелом.", reward: `Снайпер, ${STOLEN_SNIPER_CHARGES} заряда.` },
  trickster: { text: "Создает обманки рядом с собой.", reward: "Пассив: приманки рядом с игроком." },
  grower: { text: "Сажает ростки, которые становятся врагами.", reward: `Ракеты, ${STOLEN_MISSILE_CHARGES} заряда.` },
  sproutling: { text: "Быстрый росток садовника.", reward: "Только опыт." },
  slow: { text: "Замедляет игрока в светлом поле.", reward: `Взрыв, ${STOLEN_BLAST_CHARGES} заряда.` },
  heal: { text: "Слабая цель лечения.", reward: "Лечение на 1 HP и опыт." },
  medic: { text: "Лечит и поддерживает других врагов.", reward: "Лечение на 1 HP и больше опыта." },
  replicator: { text: "Прыгает и создает копии себя.", reward: "Второй слот способности и сброс кулдауна хука." },
  [LEVEL1_BOSS_KIND]: { text: "Большая цель со стадиями, щитом и залпами.", reward: "Нельзя съесть хуком." },
  [LEVEL2_BOSS_KIND]: { text: "Три стадии: стяжка, рывок и минный хаос.", reward: "Нельзя съесть хуком." },
  [LEVEL3_BOSS_KIND]: { text: "Три стадии: круговые лучи, ракетные залпы и быстрые касты.", reward: "Нельзя съесть хуком." },
};

const campaignLevels = [
  {
    name: "Разминка",
    roster: { laser: 5, shield: 2 },
    minEnemies: 12,
    maxEnemies: 4,
    spawnInterval: [1.6, 2.7],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Броня",
    roster: { shield: 5, laser: 4, heal: 1, medic: 1 },
    minEnemies: 14,
    maxEnemies: 5,
    spawnInterval: [1.45, 2.5],
    boss: { kind: LEVEL2_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Фиолетовый дождь",
    roster: { spray: 5, laser: 3, trickster: 1 },
    minEnemies: 18,
    maxEnemies: 5,
    spawnInterval: [1.35, 2.35],
    boss: { kind: LEVEL3_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Минное поле",
    roster: { mine: 5, bomber: 3, shield: 3, laser: 3 },
    minEnemies: 20,
    maxEnemies: 6,
    spawnInterval: [1.25, 2.2],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Тяжелые",
    roster: { brute: 4, bomber: 3, shield: 4, heal: 2, medic: 2 },
    minEnemies: 25,
    maxEnemies: 5,
    spawnInterval: [1.55, 2.7],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Дальняя линия",
    roster: { sniper: 4, mirror: 3, laser: 4, spray: 3, splitter: 3 },
    minEnemies: 30,
    maxEnemies: 6,
    spawnInterval: [1.3, 2.35],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Сад",
    roster: { commander: 2, grower: 4, slow: 2, shield: 3, laser: 3 },
    minEnemies: 35,
    maxEnemies: 6,
    spawnInterval: [1.35, 2.4],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Обманки",
    roster: { trickster: 5, splitter: 4, spray: 4, sniper: 2 },
    minEnemies: 40,
    maxEnemies: 6,
    spawnInterval: [1.2, 2.15],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Размножение",
    roster: { commander: 3, medic: 3, replicator: 3, grower: 3, mine: 4, slow: 2 },
    minEnemies: 50,
    maxEnemies: 7,
    spawnInterval: [1.25, 2.2],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
  {
    name: "Финальная смесь",
    roster: { commander: 3, medic: 3, mirror: 4, laser: 4, shield: 4, spray: 4, bomber: 4, splitter: 4, sniper: 3, grower: 3, trickster: 3, slow: 2, brute: 2, replicator: 1 },
    minEnemies: 50,
    maxEnemies: 8,
    spawnInterval: [1.05, 1.9],
    boss: { kind: LEVEL1_BOSS_KIND, triggerRemainingRatio: 0.5 },
  },
];

function createPlayerUpgrades() {
  return {
    hookRangeMultiplier: 1,
    hookCooldownMultiplier: 1,
    laserRangeMultiplier: 1,
    blastRangeMultiplier: 1,
    decoyRangeMultiplier: 1,
    shieldCooldownMultiplier: 1,
    baseCooldownMultiplier: 1,
    baseCooldownReduction: 0,
    enemySpeedMultiplier: 1,
    enemySpawnIntervalMultiplier: 1,
    enemyHpPenalty: 0,
  };
}

function getPlayerUpgrades() {
  if (!player.upgrades) {
    player.upgrades = createPlayerUpgrades();
  }
  return player.upgrades;
}

const upgradeCards = [
  {
    id: "hook_range",
    title: "Длинный хук",
    text: "Дальность хука +18%",
    apply: () => {
      player.upgrades.hookRangeMultiplier *= 1.18;
    },
  },
  {
    id: "hook_cooldown",
    title: "Быстрый хук",
    text: "Кулдаун хука -15%",
    apply: () => {
      player.upgrades.hookCooldownMultiplier *= 0.85;
      playerHookCooldown *= 0.85;
    },
  },
  {
    id: "laser_range",
    title: "Фокус линзы",
    text: "Дальность лазера +20%",
    apply: () => {
      player.upgrades.laserRangeMultiplier *= 1.2;
    },
  },
  {
    id: "blast_range",
    title: "Широкая волна",
    text: "Дальность взрыва +18%",
    apply: () => {
      player.upgrades.blastRangeMultiplier *= 1.18;
    },
  },
  {
    id: "sidearm_reload",
    title: "Легкий затвор",
    text: "Перезарядка пушки -15%",
    apply: () => {
      player.upgrades.baseCooldownMultiplier *= 0.85;
      playerBaseGunCooldowns = playerBaseGunCooldowns.map((cooldown) => cooldown * 0.85);
    },
  },
  {
    id: "shield_reload",
    title: "Плотный щит",
    text: "Кулдаун щита -15%",
    apply: () => {
      player.upgrades.shieldCooldownMultiplier *= 0.85;
      playerShieldCooldown *= 0.85;
    },
  },
  {
    id: "decoy_range",
    title: "Дальний маяк",
    text: "Дальность приманки +20%",
    apply: () => {
      player.upgrades.decoyRangeMultiplier *= 1.2;
    },
  },
  {
    id: "max_hp",
    title: "Корпус",
    text: "Максимальное HP +1 и лечение на 1",
    apply: () => {
      player.maxHp += 1;
      player.hp = Math.min(player.maxHp, player.hp + 1);
    },
  },
  {
    id: "enemy_slow",
    title: "Сбой двигателей",
    text: "Враги действуют на 8% медленнее",
    apply: () => {
      player.upgrades.enemySpeedMultiplier *= 0.92;
    },
  },
  {
    id: "enemy_spawn",
    title: "Помехи порталам",
    text: "Новые враги появляются на 10% реже",
    apply: () => {
      player.upgrades.enemySpawnIntervalMultiplier *= 1.1;
    },
  },
  {
    id: "enemy_armor",
    title: "Хрупкая броня",
    text: "Новые крепкие враги получают -1 HP",
    apply: () => {
      player.upgrades.enemyHpPenalty += 1;
    },
  },
];

let worldTime = 0;
let actionTime = 0;
let lastFrame = performance.now();
const trail = [];
const impactBursts = [];
const enemies = [];
const spawnMarkers = [];
const laserProjectiles = [];
const baseProjectiles = [];
const zigzagProjectiles = [];
const blastWaves = [];
const activePulseBombs = [];
const beamEffects = [];
const enemySeeds = [];
const homingMissiles = [];
const enemyHomingMissiles = [];
const mines = [];
let enemyId = 0;
let mineId = 0;
let spawnClock = 0;
let currentAbility = abilities.hook;
let currentAbilityCharges = null;
let reserveAbility = null;
let reserveAbilityCharges = null;
let abilityMode = "hook";
let activeHook = null;
let activePlayerTeleport = null;
let activePlayerLaser = null;
let activePlayerSniper = null;
let activePlayerSpray = null;
let activePlayerShield = null;
const activePlayerDecoys = [];
let playerDecoyPassive = null;
let playerMinePassive = null;
let playerMirrorPassive = null;
let playerAbilityCapacity = PLAYER_ABILITY_CAPACITY;
let playerShieldCooldown = 0;
let playerHookCooldown = 0;
let playerBaseGunCooldowns = Array(BASE_GUN_MAX_CHARGES).fill(0);
let aimPoint = { x: 0, y: 0 };
let pointerInCanvas = false;
let hoveredEnemyId = null;
let hoveredEnemyTimer = 0;
let hoverAnchorPoint = { x: 0, y: 0 };
let pointerMovedSinceHover = false;
let moveMarker = null;
let deathResetTimer = 0;
let deathExplosion = null;
let passiveXpTimer = 0;
let simulationWasActive = false;
let currentTimeScale = INACTIVE_TIME_SCALE;
let gameState = "menu";
let currentLevelIndex = 0;
let levelSpawnQueue = [];
let levelCompleted = false;
let levelBossSpawned = false;
let currentLevelBossKind = null;
let pendingUpgradeChoices = [];

function resize() {
  const rect = canvas.getBoundingClientRect();
  VIEW.width = Math.round(rect.width);
  VIEW.height = Math.round(rect.height);
  canvas.width = Math.round(rect.width * DPR);
  canvas.height = Math.round(rect.height * DPR);
  ctx.setTransform(canvas.width / VIEW.width, 0, 0, canvas.height / VIEW.height, 0, 0);

  const borderInset = 10;
  ARENA.x = borderInset;
  ARENA.y = borderInset;
  ARENA.width = Math.max(220, VIEW.width - borderInset * 2);
  ARENA.height = Math.max(220, VIEW.height - borderInset * 2);

  const half = player.size * 0.5;
  const wasOutside =
    player.x < ARENA.x + half ||
    player.x > ARENA.x + ARENA.width - half ||
    player.y < ARENA.y + half ||
    player.y > ARENA.y + ARENA.height - half;

  if (!player.launched || wasOutside) {
    player.x = ARENA.x + ARENA.width * 0.5;
    player.y = ARENA.y + ARENA.height * 0.5;
  } else {
    player.x = clamp(player.x, ARENA.x + half, ARENA.x + ARENA.width - half);
    player.y = clamp(player.y, ARENA.y + half, ARENA.y + ARENA.height - half);
  }

  clampEnemiesToArena();
  aimPoint.x = player.x;
  aimPoint.y = player.y;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeAngle(angle) {
  let normalized = angle;
  while (normalized > Math.PI) normalized -= Math.PI * 2;
  while (normalized < -Math.PI) normalized += Math.PI * 2;
  return normalized;
}

function turnAngleToward(currentAngle, targetAngle, maxTurn) {
  const delta = normalizeAngle(targetAngle - currentAngle);
  return currentAngle + clamp(delta, -maxTurn, maxTurn);
}

function getTurnAdjustedTargetSpeed(baseSpeed, angleDelta) {
  if (angleDelta >= PLAYER_TURN_BRAKE_ANGLE) return baseSpeed * PLAYER_TURN_MIN_SPEED_FACTOR;
  const alignment = 1 - angleDelta / PLAYER_TURN_BRAKE_ANGLE;
  const speedFactor = PLAYER_TURN_MIN_SPEED_FACTOR + (1 - PLAYER_TURN_MIN_SPEED_FACTOR) * alignment * alignment;
  return baseSpeed * clamp(speedFactor, PLAYER_TURN_MIN_SPEED_FACTOR, 1);
}

function getCurrentLevel() {
  return campaignLevels[currentLevelIndex] ?? campaignLevels[0];
}

function getEnemyMaxCount() {
  const levelNumber = currentLevelIndex + 1;
  return ENEMY_MAX_COUNT + Math.max(1, levelNumber - ENEMY_MAX_COUNT_LEVEL_OFFSET) + Math.floor(player.xpLevel / 2);
}

function getSpawnLimitedEnemyCount() {
  return enemies.filter((enemy) => !enemy.isIllusion).length + spawnMarkers.length;
}

function getSpawnInterval() {
  const interval = getCurrentLevel()?.spawnInterval ?? ENEMY_SPAWN_INTERVAL;
  const upgradeMultiplier = getPlayerUpgrades().enemySpawnIntervalMultiplier;
  return interval.map((delay) => delay * ENEMY_SPAWN_INTERVAL_MULTIPLIER * upgradeMultiplier);
}

function getAutoRosterKinds(level = getCurrentLevel()) {
  const enemyKinds = Object.keys(enemyMeta).filter((kind) => !BOSS_KINDS.includes(kind));
  const levelIndex = Math.max(0, campaignLevels.indexOf(level));
  const offset = levelIndex % enemyKinds.length;
  return [...enemyKinds.slice(offset), ...enemyKinds.slice(0, offset)];
}

function getLevelRoster(level = getCurrentLevel()) {
  const roster = { ...level.roster };
  const enemyKinds = getAutoRosterKinds(level);

  for (const kind of enemyKinds) {
    if (Object.keys(roster).length >= MIN_ENEMY_TYPES_PER_LEVEL) break;
    if (kind in roster) continue;
    roster[kind] = 1;
  }

  const entries = Object.entries(roster);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  const targetEnemies = level.minEnemies ?? MIN_ENEMIES_PER_LEVEL;
  if (total === targetEnemies) return roster;

  const scaledEntries = entries.map(([kind, count]) => {
    const exactCount = (count / total) * targetEnemies;
    return {
      kind,
      count: Math.floor(exactCount),
      remainder: exactCount % 1,
    };
  });

  let remaining = targetEnemies - scaledEntries.reduce((sum, entry) => sum + entry.count, 0);
  const remainderOrder = [...scaledEntries].sort((left, right) => right.remainder - left.remainder);
  for (const entry of remainderOrder) {
    if (remaining <= 0) break;
    entry.count += 1;
    remaining -= 1;
  }

  return Object.fromEntries(scaledEntries.filter((entry) => entry.count > 0).map((entry) => [entry.kind, entry.count]));
}

function getLevelTotalCount(level = getCurrentLevel()) {
  return getLevelNormalEnemyCount(level) + (level.boss ? 1 : 0);
}

function getLevelNormalEnemyCount(level = getCurrentLevel()) {
  return Object.values(getLevelRoster(level)).reduce((sum, count) => sum + count, 0);
}

function shuffleList(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function buildLevelSpawnQueue(level = getCurrentLevel()) {
  const queue = [];
  for (const [kind, count] of Object.entries(getLevelRoster(level))) {
    for (let index = 0; index < count; index += 1) {
      queue.push(kind);
    }
  }
  return shuffleList(queue);
}

function getFixedLevelBossKind(levelIndex = currentLevelIndex) {
  if (levelIndex === 0) return LEVEL1_BOSS_KIND;
  if (levelIndex === 1) return LEVEL2_BOSS_KIND;
  if (levelIndex === 2) return LEVEL3_BOSS_KIND;
  return null;
}

function getRandomBossKind() {
  return BOSS_KINDS[Math.floor(Math.random() * BOSS_KINDS.length)];
}

function selectLevelBossKind(level = getCurrentLevel(), levelIndex = currentLevelIndex) {
  if (!level.boss) return null;
  return getFixedLevelBossKind(levelIndex) ?? getRandomBossKind();
}

function getCurrentLevelBossKind(level = getCurrentLevel()) {
  return currentLevelBossKind ?? level.boss?.kind ?? null;
}

function getCellSize() {
  return Math.min(ARENA.width, ARENA.height) / GRID_CELLS;
}

function getHookRange() {
  return getCellSize() * HOOK_RANGE_CELLS * getPlayerUpgrades().hookRangeMultiplier;
}

function getLaserRange() {
  return getCellSize() * LASER_RANGE_CELLS * getPlayerUpgrades().laserRangeMultiplier;
}

function getBlastRange() {
  return getCellSize() * BLAST_RANGE_CELLS * getPlayerUpgrades().blastRangeMultiplier;
}

function getDecoyRange() {
  return getCellSize() * DECOY_RANGE_CELLS * getPlayerUpgrades().decoyRangeMultiplier;
}

function getArenaProjectileReach() {
  return Math.hypot(ARENA.width, ARENA.height) + 120;
}

function getShieldRadius() {
  return SHIELD_RADIUS;
}

function isSimulationActive() {
  return (
    player.moving ||
    Boolean(activeHook) ||
    Boolean(activePlayerTeleport) ||
    Boolean(activePlayerLaser) ||
    Boolean(activePlayerSniper) ||
    Boolean(activePlayerSpray) ||
    beamEffects.length > 0
  );
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function randomDirection() {
  const angle = Math.random() * Math.PI * 2;
  return { x: Math.cos(angle), y: Math.sin(angle) };
}

function hexToRgb(hex, fallback = [255, 202, 110]) {
  const normalized = hex?.replace("#", "");
  if (!normalized || normalized.length !== 6) return fallback;
  const value = Number.parseInt(normalized, 16);
  if (Number.isNaN(value)) return fallback;
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function colorWithAlpha(color, alpha) {
  const [red, green, blue] = color;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * VIEW.width,
    y: ((event.clientY - rect.top) / rect.height) * VIEW.height,
  };
}

function startDrag(event) {
  if (gameState !== "playing") return;
  if (player.dead) return;

  const point = getCanvasPoint(event);
  aimPoint = point;
  if (event.button === 2) {
    event.preventDefault();
    launchPlayerTowardPoint(point);
    return;
  }

  if (event.button !== 0) return;
  tryUseAbilityFromClick(point);
}

function movePointer(event) {
  if (gameState !== "playing") return;
  const point = getCanvasPoint(event);
  pointerInCanvas = true;
  aimPoint = point;
  pointerMovedSinceHover = true;
}

function endDrag() {
}

function resetEnemyHover() {
  hoveredEnemyId = null;
  hoveredEnemyTimer = 0;
  pointerMovedSinceHover = false;
}

function findEnemyAtPoint(point) {
  for (let index = enemies.length - 1; index >= 0; index -= 1) {
    const enemy = enemies[index];
    const width = enemy.renderWidth || enemy.size;
    const height = enemy.renderHeight || enemy.size;
    const radius = Math.max(enemy.size, width, height) * 0.55;
    const distance = Math.hypot(point.x - enemy.x, point.y - enemy.y);
    if (distance <= radius) return enemy;
  }
  return null;
}

function updateEnemyHover(dt) {
  if (!pointerInCanvas || gameState !== "playing" || player.dead) {
    resetEnemyHover();
    return;
  }

  const hoveredEnemy = enemies.find((candidate) => candidate.id === hoveredEnemyId);
  if (hoveredEnemy && !pointerMovedSinceHover) {
    hoveredEnemyTimer += dt;
    return;
  }

  const enemy = findEnemyAtPoint(aimPoint);
  if (!enemy) {
    if (pointerMovedSinceHover) resetEnemyHover();
    return;
  }

  if (hoveredEnemyId !== enemy.id || pointerMovedSinceHover) {
    hoveredEnemyId = enemy.id;
    hoveredEnemyTimer = ENEMY_TOOLTIP_DELAY;
    hoverAnchorPoint = { x: aimPoint.x, y: aimPoint.y };
    pointerMovedSinceHover = false;
    return;
  }

  hoveredEnemyTimer += dt;
}

function canSwitchAbilities() {
  return (
    !player.dead &&
    !player.moving &&
    !activeHook &&
    !activePlayerTeleport &&
    !activePlayerLaser &&
    !activePlayerSniper &&
    !activePlayerSpray
  );
}

function getSelectableAbilityModes() {
  const modes = ["teleport", "hook"];
  modes.push("base");
  if (currentAbility.key !== abilities.hook.key) {
    modes.push("primary");
  }
  if (reserveAbility) {
    modes.push("secondary");
  }
  return modes;
}

function cycleAbilitySelection(direction = 1) {
  if (!canSwitchAbilities()) return;

  const modes = getSelectableAbilityModes();
  const currentIndex = Math.max(0, modes.indexOf(abilityMode));
  const nextIndex = (currentIndex + direction + modes.length) % modes.length;
  abilityMode = modes[nextIndex];
}

function selectAbilityModeByIndex(index) {
  if (!canSwitchAbilities()) return false;

  const modes = getSelectableAbilityModes();
  if (index < 0 || index >= modes.length) return false;
  abilityMode = modes[index];
  return true;
}

function handleKeyDown(event) {
  if (gameState !== "playing") return;

  if (event.code === "KeyQ") {
    event.preventDefault();
    cycleAbilitySelection(1);
    return;
  }

  const digitMatch = event.code.match(/^(Digit|Numpad)([1-9])$/u);
  if (!digitMatch) return;

  event.preventDefault();
  selectAbilityModeByIndex(Number(digitMatch[2]) - 1);
}

function handleWheel(event) {
  if (gameState !== "playing") return;

  if (Math.abs(event.deltaY) < 2) return;
  if (!canSwitchAbilities()) return;
  event.preventDefault();
  cycleAbilitySelection(event.deltaY > 0 ? 1 : -1);
}

function moveToward(current, target, maxDelta) {
  if (current < target) return Math.min(target, current + maxDelta);
  if (current > target) return Math.max(target, current - maxDelta);
  return current;
}

function update(dt) {
  if (gameState !== "playing") {
    resetEnemyHover();
    updateUi();
    return;
  }

  if (player.dead) {
    resetEnemyHover();
    updateImpactBursts(dt);
    updateDeathExplosion(dt);
    deathResetTimer = Math.max(0, deathResetTimer - dt);
    if (deathResetTimer <= 0) {
      resetGame();
    }
    updateUi();
    return;
  }

  const startedActive = isSimulationActive();
  if (startedActive && !simulationWasActive) {
    beginEnemyActionCycle();
  }
  const targetTimeScale = startedActive ? 1 : INACTIVE_TIME_SCALE;
  currentTimeScale = startedActive
    ? moveToward(currentTimeScale, targetTimeScale, dt / TIME_SCALE_TRANSITION)
    : INACTIVE_TIME_SCALE;
  const simDt = dt * currentTimeScale;

  worldTime += simDt;
  if (startedActive) {
    actionTime += simDt;
    updatePassiveXp(simDt);
  }
  if (player.moving) {
    updatePlayerMotion(simDt);
  }
  updateHook(simDt);
  updatePlayerTeleport(simDt);
  updatePlayerLaser(simDt);
  updatePlayerSniper(simDt);
  updatePlayerSpray(simDt);
  updateBaseProjectiles(simDt);
  updateEnemySpawns(simDt);
  updateLevelBossSpawn();
  updateEnemies(simDt * getPlayerUpgrades().enemySpeedMultiplier);
  if (player.dead) {
    updateUi();
    return;
  }
  updateEnemySeeds(simDt);
  updatePlayerMinePassive(simDt);
  updatePlayerDecoyPassive(simDt);
  updatePlayerMirrorPassive(simDt);
  updatePlayerShield(simDt);
  updatePlayerDecoy(simDt);
  updateZigzagProjectiles(simDt);
  updatePulseBombs(simDt);
  updateBlastWaves(simDt);
  if (player.dead) {
    updateUi();
    return;
  }
  updateBeamEffects(simDt);
  updateHomingMissiles(simDt);
  updateEnemyHomingMissiles(simDt);
  updateShieldAuras(simDt);
  if (player.dead) {
    updateUi();
    return;
  }
  resolveEnemyCollisions();
  if (player.dead) {
    updateUi();
    return;
  }
  updateLaserProjectiles(simDt);
  if (player.dead) {
    updateUi();
    return;
  }
  updateMines(simDt);
  if (player.dead) {
    updateUi();
    return;
  }
  playerShieldCooldown = Math.max(0, playerShieldCooldown - simDt);
  playerHookCooldown = Math.max(0, playerHookCooldown - simDt);
  playerBaseGunCooldowns = playerBaseGunCooldowns.map((cooldown) => Math.max(0, cooldown - simDt));
  simulationWasActive = startedActive;

  player.hitInvuln = Math.max(0, player.hitInvuln - simDt);
  updateTrailParticles(simDt);
  updateImpactBursts(simDt);
  player.hitFlash = Math.max(0, (player.hitFlash || 0) - simDt * 2.2);
  player.hitShake = Math.max(0, (player.hitShake || 0) - simDt * 5.5);
  updateMoveMarker(simDt);
  updateEnemyHover(dt);
  checkLevelComplete();
  updateUi();
}

function updatePlayerMotion(dt) {
  if (player.moveTarget) {
    const dx = player.moveTarget.x - player.x;
    const dy = player.moveTarget.y - player.y;
    const distance = Math.hypot(dx, dy);

    if (distance <= MOVE_STOP_DISTANCE) {
      player.x = player.moveTarget.x;
      player.y = player.moveTarget.y;
      settlePlayer();
      return;
    }

    const dirX = dx / distance;
    const dirY = dy / distance;
    const slowMultiplier = getPlayerSlowMultiplier();
    const currentSpeed = Math.hypot(player.vx, player.vy);
    const moveBrake = MOVE_BRAKE * slowMultiplier;
    const moveAcceleration = MOVE_ACCELERATION * slowMultiplier;
    const maxSpeed = MOVE_TO_POINT_SPEED * slowMultiplier;
    const brakingSpeed = Math.sqrt(2 * moveBrake * Math.max(0, distance - MOVE_STOP_DISTANCE));
    const targetSpeed = Math.min(maxSpeed, brakingSpeed);
    const targetAngle = Math.atan2(dirY, dirX);
    const currentAngle = player.facingAngle ?? (currentSpeed > 1 ? Math.atan2(player.vy, player.vx) : targetAngle);
    const angleDelta = Math.abs(normalizeAngle(targetAngle - currentAngle));
    const adjustedTargetSpeed = getTurnAdjustedTargetSpeed(targetSpeed, angleDelta);
    const nextAngle = turnAngleToward(currentAngle, targetAngle, PLAYER_TURN_RATE * dt);
    player.facingAngle = nextAngle;

    let nextSpeed = currentSpeed;
    if (currentSpeed < adjustedTargetSpeed) {
      nextSpeed = Math.min(adjustedTargetSpeed, currentSpeed + moveAcceleration * dt);
    } else {
      nextSpeed = Math.max(adjustedTargetSpeed, currentSpeed - moveBrake * dt);
    }

    const step = Math.min(nextSpeed * dt, distance);
    player.vx = Math.cos(nextAngle) * nextSpeed;
    player.vy = Math.sin(nextAngle) * nextSpeed;
    player.x += Math.cos(nextAngle) * step;
    player.y += Math.sin(nextAngle) * step;

    handlePlayerWallSlide();
    updateTrail();

    const nextDistance = Math.hypot(player.moveTarget.x - player.x, player.moveTarget.y - player.y);
    if (nextDistance <= MOVE_STOP_DISTANCE || (nextDistance > distance && distance <= MOVE_STOP_DISTANCE + step * 1.2)) {
      player.x = player.moveTarget.x;
      player.y = player.moveTarget.y;
      settlePlayer();
      return;
    }

    return;
  }

  settlePlayer();
}

function handlePlayerWallSlide() {
  const half = player.size * 0.5;
  const minX = ARENA.x + half;
  const maxX = ARENA.x + ARENA.width - half;
  const minY = ARENA.y + half;
  const maxY = ARENA.y + ARENA.height - half;

  if (player.x < minX) {
    player.x = minX;
    player.vx = Math.max(0, player.vx);
  } else if (player.x > maxX) {
    player.x = maxX;
    player.vx = Math.min(0, player.vx);
  }

  if (player.y < minY) {
    player.y = minY;
    player.vy = Math.max(0, player.vy);
  } else if (player.y > maxY) {
    player.y = maxY;
    player.vy = Math.min(0, player.vy);
  }
}

function handleWallBounce(entity) {
  const half = entity.size * 0.5;
  const minX = ARENA.x + half;
  const maxX = ARENA.x + ARENA.width - half;
  const minY = ARENA.y + half;
  const maxY = ARENA.y + ARENA.height - half;

  if (entity.x < minX) {
    entity.x = minX;
    entity.vx = Math.abs(entity.vx) * WALL_BOUNCE;
  } else if (entity.x > maxX) {
    entity.x = maxX;
    entity.vx = -Math.abs(entity.vx) * WALL_BOUNCE;
  }

  if (entity.y < minY) {
    entity.y = minY;
    entity.vy = Math.abs(entity.vy) * WALL_BOUNCE;
  } else if (entity.y > maxY) {
    entity.y = maxY;
    entity.vy = -Math.abs(entity.vy) * WALL_BOUNCE;
  }
}

function settlePlayer() {
  player.vx = 0;
  player.vy = 0;
  player.moving = false;
  player.restingFor = 0;
  player.moveTarget = null;
}

function settleEnemyMotion(enemy) {
  enemy.vx = 0;
  enemy.vy = 0;
  enemy.moving = false;
  enemy.restingFor = 0;
  enemy.moveTarget = null;
}

function getPlayerSlowMultiplier() {
  let multiplier = 1;

  for (const enemy of enemies) {
    if (enemy.kind !== "slow") continue;
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance <= SLOW_FIELD_RADIUS + player.size * 0.45) {
      multiplier = Math.min(multiplier, SLOW_FIELD_SPEED_MULTIPLIER);
    }
  }

  return multiplier;
}

function getEnemyAggroTarget(fromX = player.x, fromY = player.y) {
  let nearestDecoy = null;
  let nearestDistance = Infinity;

  for (const decoy of activePlayerDecoys) {
    const distance = Math.hypot(decoy.x - fromX, decoy.y - fromY);
    if (distance >= nearestDistance) continue;
    nearestDistance = distance;
    nearestDecoy = decoy;
  }

  if (nearestDecoy) {
    return {
      x: nearestDecoy.x,
      y: nearestDecoy.y,
      type: "decoy",
    };
  }

  return {
    x: player.x,
    y: player.y,
    type: "player",
  };
}

function updateEnemyMotion(enemy, dt) {
  if (!enemy.moveTarget) {
    settleEnemyMotion(enemy);
    return 0;
  }

  const dx = enemy.moveTarget.x - enemy.x;
  const dy = enemy.moveTarget.y - enemy.y;
  const distance = Math.hypot(dx, dy);

  if (distance <= ENEMY_MOVE_STOP_DISTANCE) {
    enemy.x = enemy.moveTarget.x;
    enemy.y = enemy.moveTarget.y;
    settleEnemyMotion(enemy);
    return 0;
  }

  const dirX = dx / distance;
  const dirY = dy / distance;
  const currentSpeed = Math.hypot(enemy.vx, enemy.vy);
  const moveBrake =
    enemy.kind === "spray"
      ? SPRAY_ENEMY_MOVE_BRAKE
      : enemy.kind === "laser"
        ? LASER_ENEMY_MOVE_BRAKE
        : ENEMY_MOVE_BRAKE;
  const moveAcceleration =
    enemy.kind === "spray"
      ? SPRAY_ENEMY_MOVE_ACCELERATION
      : enemy.kind === "laser"
        ? LASER_ENEMY_MOVE_ACCELERATION
        : ENEMY_MOVE_ACCELERATION;
  const speedMultiplier = enemy.kind === "medic" ? MEDIC_MOVE_SPEED_MULTIPLIER : 1;
  const brakingSpeed = Math.sqrt(2 * moveBrake * Math.max(0, distance - ENEMY_MOVE_STOP_DISTANCE));
  const maxSpeed =
    (enemy.kind === "spray"
        ? SPRAY_ENEMY_DASH_SPEED
        : enemy.kind === "laser"
          ? LASER_ENEMY_DASH_SPEED
          : ENEMY_DASH_SPEED) * speedMultiplier;
  const targetSpeed = Math.min(maxSpeed, brakingSpeed);

  let nextSpeed = currentSpeed;
  if (currentSpeed < targetSpeed) {
    nextSpeed = Math.min(targetSpeed, currentSpeed + moveAcceleration * dt);
  } else {
    nextSpeed = Math.max(targetSpeed, currentSpeed - moveBrake * dt);
  }

  const step = Math.min(nextSpeed * dt, distance);
  enemy.vx = dirX * nextSpeed;
  enemy.vy = dirY * nextSpeed;
  enemy.x += dirX * step;
  enemy.y += dirY * step;

  handleWallBounce(enemy);

  if (enemy.x <= ARENA.x + enemy.size * 0.5 || enemy.x >= ARENA.x + ARENA.width - enemy.size * 0.5) {
    enemy.moveTarget = null;
  }
  if (enemy.y <= ARENA.y + enemy.size * 0.5 || enemy.y >= ARENA.y + ARENA.height - enemy.size * 0.5) {
    enemy.moveTarget = null;
  }

  if (!enemy.moveTarget) {
    settleEnemyMotion(enemy);
    return 0;
  }

  return nextSpeed;
}

function updateTrail() {
  const speed = Math.hypot(player.vx, player.vy);
  if (speed < 40) return;

  const dirX = player.vx / speed;
  const dirY = player.vy / speed;
  trail.push({
    x: player.x - dirX * player.size * 0.48 + (Math.random() - 0.5) * 5,
    y: player.y - dirY * player.size * 0.48 + (Math.random() - 0.5) * 5,
    vx: -dirX * (30 + Math.random() * 34) + (Math.random() - 0.5) * 14,
    vy: -dirY * (30 + Math.random() * 34) + (Math.random() - 0.5) * 14,
    life: 0.45 + Math.random() * 0.2,
    ttl: 0.45 + Math.random() * 0.2,
    size: 4 + Math.random() * 5,
  });
  if (trail.length > 96) {
    trail.shift();
  }
}

function updateTrailParticles(dt) {
  for (let index = trail.length - 1; index >= 0; index -= 1) {
    const particle = trail[index];
    particle.ttl -= dt;
    if (particle.ttl <= 0) {
      trail.splice(index, 1);
      continue;
    }

    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= 0.94;
    particle.vy *= 0.94;
  }
}

function getEnemyRecoverDelay(enemy) {
  if (enemy.kind === "replicator") return REPLICATOR_HOP_DELAY;
  if (enemy.kind === "spray") return SPRAY_ENEMY_RECOVER_DELAY;
  if (enemy.kind === "slow") return SLOW_ENEMY_RECOVER_DELAY;
  return ENEMY_DASH_DELAY_AFTER_SHOT;
}

function getStaggeredEnemyDelay(delay) {
  return delay * randomRange(0.65, 1.45);
}

function setEnemyTurnWait(enemy, delay = getEnemyRecoverDelay(enemy)) {
  enemy.phase = "turn_wait";
  enemy.phaseTimer = getStaggeredEnemyDelay(delay);
}

function getEnemyCommandMultiplier(enemy = null) {
  const hasCommander = enemies.some(
    (candidate) =>
      candidate.kind === "commander" &&
      !candidate.isIllusion &&
      (!enemy || (
        candidate.id !== enemy.id &&
        Math.hypot(candidate.x - enemy.x, candidate.y - enemy.y) <= COMMANDER_AURA_RADIUS
      ))
  );
  return hasCommander ? COMMANDER_SPEED_MULTIPLIER : 1;
}

function supportEnemyFromMedic(medic) {
  const supportTargets = enemies
    .filter((enemy) => {
      if (enemy.id === medic.id || enemy.isIllusion) return false;
      if (enemy.kind === "medic" || enemy.kind === "splitter_child" || enemy.kind === "sproutling") return false;
      return Math.hypot(enemy.x - medic.x, enemy.y - medic.y) <= MEDIC_SUPPORT_RANGE;
    })
    .map((enemy) => ({
      enemy,
      distance: Math.hypot(enemy.x - medic.x, enemy.y - medic.y),
      canHeal: (enemy.hp ?? 1) < (enemy.maxHp ?? 1),
      canFortify: (enemy.maxHp ?? 1) < 3 && enemy.kind !== "brute",
    }))
    .filter((target) => target.canHeal || target.canFortify)
    .sort((left, right) => {
      if (left.canHeal !== right.canHeal) return left.canHeal ? -1 : 1;
      return left.distance - right.distance;
    });

  const bestTarget = supportTargets[0]?.enemy;
  if (!bestTarget) return false;

  if (bestTarget.hp < bestTarget.maxHp) {
    bestTarget.hp = Math.min(bestTarget.maxHp, bestTarget.hp + 1);
  } else {
    bestTarget.maxHp += 1;
    bestTarget.hp += 1;
  }

  beamEffects.push({
    fromX: medic.x,
    fromY: medic.y,
    toX: bestTarget.x,
    toY: bestTarget.y,
    color: "rgba(54, 240, 255, 0.9)",
    innerColor: "rgba(230, 255, 255, 0.94)",
    width: 5,
    ttl: 0.18,
    life: 0.18,
  });

  return true;
}

function getMedicWoundedAllyTarget(medic) {
  let bestTarget = null;
  let bestDistance = Infinity;

  for (const enemy of enemies) {
    if (enemy.id === medic.id || enemy.isIllusion) continue;
    if (enemy.kind === "medic" || enemy.kind === "splitter_child" || enemy.kind === "sproutling") continue;
    if ((enemy.hp ?? 1) >= (enemy.maxHp ?? 1)) continue;

    const distance = Math.hypot(enemy.x - medic.x, enemy.y - medic.y);
    if (distance >= bestDistance) continue;

    bestTarget = enemy;
    bestDistance = distance;
  }

  return bestTarget;
}

function beginEnemyActionCycle() {
  for (const enemy of enemies) {
    if (enemy.phase === "turn_wait") {
      enemy.turnShotLocked = false;
      enemy.phase = "recover";
      enemy.phaseTimer = Math.min(enemy.phaseTimer || Infinity, getStaggeredEnemyDelay(getEnemyRecoverDelay(enemy)));
    }
  }
}

function spawnImpactBurst(
  x,
  y,
  {
    count = 16,
    speedMin = 120,
    speedMax = 280,
    lifeMin = 0.18,
    lifeMax = 0.38,
    sizeMin = 3,
    sizeMax = 7,
    outerColor = [255, 96, 96],
    midColor = [255, 202, 110],
    innerColor = [255, 245, 220],
  } = {}
) {
  for (let index = 0; index < count; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomRange(speedMin, speedMax);
    const life = randomRange(lifeMin, lifeMax);
    impactBursts.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      ttl: life,
      life,
      size: randomRange(sizeMin, sizeMax),
      spin: randomRange(-8, 8),
      angle: Math.random() * Math.PI * 2,
      outerColor,
      midColor,
      innerColor,
    });
  }

  if (impactBursts.length > 180) {
    impactBursts.splice(0, impactBursts.length - 180);
  }
}

function spawnEnemyHitBurst(enemy, amount = 1) {
  const metaColor = hexToRgb(enemyMeta[enemy.kind]?.color);
  const isBoss = isBossEnemy(enemy);
  const hitSize = enemy.size || ENEMY_SIZE;
  const offsetRadius = hitSize * (isBoss ? 0.22 : 0.32);
  const angle = Math.random() * Math.PI * 2;
  const x = enemy.x + Math.cos(angle) * randomRange(0, offsetRadius);
  const y = enemy.y + Math.sin(angle) * randomRange(0, offsetRadius);
  const count = Math.round((isBoss ? 13 : 8) + amount * 3);

  enemy.hitFlash = 1;
  spawnImpactBurst(x, y, {
    count,
    speedMin: isBoss ? 95 : 75,
    speedMax: isBoss ? 290 : 230,
    lifeMin: 0.12,
    lifeMax: 0.28,
    sizeMin: isBoss ? 4 : 2.6,
    sizeMax: isBoss ? 9 : 6,
    outerColor: [255, 72, 52],
    midColor: metaColor,
    innerColor: [255, 250, 226],
  });

  impactBursts.push({
    kind: "ring",
    x,
    y,
    vx: 0,
    vy: 0,
    ttl: isBoss ? 0.24 : 0.18,
    life: isBoss ? 0.24 : 0.18,
    size: hitSize * (isBoss ? 0.4 : 0.34),
    spin: 0,
    angle: 0,
    outerColor: [255, 250, 226],
    midColor: metaColor,
    innerColor: [255, 255, 255],
  });

  if (impactBursts.length > 180) {
    impactBursts.splice(0, impactBursts.length - 180);
  }
}

function updateImpactBursts(dt) {
  for (let index = impactBursts.length - 1; index >= 0; index -= 1) {
    const burst = impactBursts[index];
    burst.ttl -= dt;
    if (burst.ttl <= 0) {
      impactBursts.splice(index, 1);
      continue;
    }

    burst.x += burst.vx * dt;
    burst.y += burst.vy * dt;
    burst.vx *= 0.92;
    burst.vy *= 0.92;
    burst.angle += burst.spin * dt;
  }
}

function updateDeathExplosion(dt) {
  if (!deathExplosion) return;

  deathExplosion.ttl -= dt;
  if (deathExplosion.ttl <= 0) {
    deathExplosion = null;
  }
}

function scheduleNextSpawn(initial = false) {
  const [minDelay, maxDelay] = getSpawnInterval();
  spawnClock = initial ? 0.8 : randomRange(minDelay, maxDelay);
}

function updateEnemySpawns(dt) {
  for (let index = spawnMarkers.length - 1; index >= 0; index -= 1) {
    const marker = spawnMarkers[index];
    marker.elapsed += dt;

    if (marker.elapsed >= ENEMY_SPAWN_TELEGRAPH) {
      spawnEnemy(marker.x, marker.y, marker.kind);
      spawnMarkers.splice(index, 1);
    }
  }

  if (levelSpawnQueue.length === 0) return;
  if (getSpawnLimitedEnemyCount() >= getEnemyMaxCount()) return;

  spawnClock -= dt;
  if (spawnClock > 0) return;

  const point = findFreePoint(ENEMY_SIZE * 2.4);
  if (point) {
    spawnMarkers.push({
      x: point.x,
      y: point.y,
      kind: levelSpawnQueue.shift(),
      elapsed: 0,
    });
  }

  scheduleNextSpawn();
}

function isBossEnemy(enemy) {
  return enemy?.kind === LEVEL1_BOSS_KIND || enemy?.kind === LEVEL2_BOSS_KIND || enemy?.kind === LEVEL3_BOSS_KIND;
}

function isBossShieldActive(enemy) {
  return enemy?.kind === LEVEL1_BOSS_KIND && enemy.bossState === "shield";
}

function isAbsorbingShieldEnemy(enemy) {
  return (enemy.kind === "shield" && enemy.phase === "shield_up") || isBossShieldActive(enemy);
}

function getEnemyShieldRadius(enemy) {
  return isBossEnemy(enemy) ? LEVEL1_BOSS_SHIELD_RADIUS : getShieldRadius() * ENEMY_SHIELD_RADIUS_MULTIPLIER;
}

function getRemainingNormalLevelEnemies() {
  let remaining = levelSpawnQueue.length + spawnMarkers.length;
  for (const enemy of enemies) {
    if (!enemy.isIllusion && !isBossEnemy(enemy)) remaining += 1;
  }
  return remaining;
}

function updateLevelBossSpawn() {
  const level = getCurrentLevel();
  if (!level.boss || levelBossSpawned || levelCompleted || player.dead) return;
  const bossKind = getCurrentLevelBossKind(level);
  if (!bossKind) return;

  const triggerRemaining = Math.floor(getLevelNormalEnemyCount(level) * (level.boss.triggerRemainingRatio ?? 0.5));
  if (getRemainingNormalLevelEnemies() > triggerRemaining) return;

  const point = findFreePoint(LEVEL1_BOSS_SIZE * 1.2) ?? {
    x: player.x < ARENA.x + ARENA.width * 0.5 ? ARENA.x + ARENA.width * 0.78 : ARENA.x + ARENA.width * 0.22,
    y: player.y < ARENA.y + ARENA.height * 0.5 ? ARENA.y + ARENA.height * 0.78 : ARENA.y + ARENA.height * 0.22,
  };
  spawnBoss(point.x, point.y, bossKind);
  levelBossSpawned = true;
}

function updateEnemies(dt) {
  for (const enemy of enemies) {
    enemy.hitFlash = Math.max(0, (enemy.hitFlash || 0) - dt / ENEMY_HIT_FLASH_TIME);

    if (enemy.isIllusion) {
      enemy.illusionTimer -= dt;
      if (enemy.illusionTimer <= 0) {
        removeEnemy(enemy.id);
      }
      continue;
    }

    const commandMultiplier = getEnemyCommandMultiplier(enemy);
    const timerDt = dt * commandMultiplier;

    if (isBossEnemy(enemy)) {
      if (enemy.kind === LEVEL2_BOSS_KIND) updateLevel2Boss(enemy, dt);
      else if (enemy.kind === LEVEL3_BOSS_KIND) updateLevel3Boss(enemy, dt);
      else updateLevel1Boss(enemy, dt);
      continue;
    }

    if (enemy.kind === "brute") {
      updateBruteEnemy(enemy, timerDt);
      continue;
    }

    if (enemy.kind === "sproutling" || enemy.kind === "splitter_child") {
      updateSproutlingEnemy(enemy, timerDt);
      continue;
    }

    if (enemy.kind === "slow") {
      updateSlowEnemy(enemy, timerDt);
      continue;
    }

    if (enemy.kind === "replicator") {
      enemy.replicateTimer -= timerDt;
      if (enemy.replicateTimer <= 0) {
        spawnReplicatorClone(enemy);
        enemy.replicateTimer += REPLICATOR_CLONE_TIME;
      }
    }

    if (enemy.kind === "mine") {
      enemy.mineTimer -= timerDt;
      if (enemy.mineTimer <= 0) {
        spawnMine(enemy.x, enemy.y, "enemy");
        enemy.mineTimer = randomRange(ENEMY_MINE_INTERVAL_MIN, ENEMY_MINE_INTERVAL_MAX);
      }
    }

    if (enemy.kind === "grower") {
      enemy.seedTimer -= timerDt;
      if (enemy.seedTimer <= 0) {
        spawnGrowerSeed(enemy.x, enemy.y);
        enemy.seedTimer = randomRange(GROWER_SEED_INTERVAL_MIN, GROWER_SEED_INTERVAL_MAX);
      }
    }

    if (enemy.kind === "medic") {
      enemy.medicTimer -= timerDt;
      if (enemy.medicTimer <= 0) {
        supportEnemyFromMedic(enemy);
        enemy.medicTimer = MEDIC_SUPPORT_INTERVAL;
      }
    }

    if (enemy.kind === "mirror") {
      if (enemy.phase === "mirror_shield") {
        enemy.phaseTimer -= dt;
        if (enemy.phaseTimer <= 0) {
          enemy.mirrorReady = false;
          enemy.mirrorShieldCooldown = MIRROR_SHIELD_COOLDOWN;
          setEnemyTurnWait(enemy);
        }
        continue;
      }

      enemy.mirrorShieldCooldown = Math.max(0, (enemy.mirrorShieldCooldown ?? MIRROR_SHIELD_COOLDOWN) - dt);
      if (!enemy.moving && enemy.phase !== "turn_wait" && enemy.mirrorShieldCooldown <= 0) {
        activateEnemyMirrorShield(enemy);
        continue;
      }
    }

    if (enemy.phase === "turn_wait") {
      enemy.phaseTimer -= timerDt;
      if (enemy.phaseTimer <= 0) {
        enemy.turnShotLocked = false;
        launchEnemy(enemy);
      }
      continue;
    }

    if (enemy.moving) {
      if (enemy.kind === "laser" && !enemy.turnShotLocked) {
        const target = getEnemyAggroTarget(enemy.x, enemy.y);
        enemy.aimX = target.x;
        enemy.aimY = target.y;
        enemy.phaseTimer -= timerDt;
        if (enemy.phaseTimer <= 0) {
          fireEnemyLaser(enemy);
          enemy.turnShotLocked = true;
          enemy.phaseTimer = 0;
        }
      }

      updateEnemyMotion(enemy, timerDt);
      if (!enemy.moving) {
        if (enemy.kind === "shield") {
          enemy.phase = "shield_windup";
          enemy.phaseTimer = ENEMY_SHIELD_WINDUP_TIME;
          enemy.phaseDuration = enemy.phaseTimer;
        } else if (enemy.kind === "trickster") {
          spawnTricksterIllusions(enemy);
          enemy.phase = "recover";
          enemy.phaseTimer = getStaggeredEnemyDelay(ENEMY_DASH_DELAY_AFTER_SHOT);
        } else if (enemy.kind === "replicator") {
          enemy.phase = "recover";
          enemy.phaseTimer = getStaggeredEnemyDelay(REPLICATOR_HOP_DELAY);
        } else if (enemy.kind === "grower") {
          enemy.phase = "recover";
          enemy.phaseTimer = getStaggeredEnemyDelay(ENEMY_DASH_DELAY_AFTER_SHOT);
        } else if (enemy.kind === "mine") {
          enemy.phase = "recover";
          enemy.phaseTimer = getStaggeredEnemyDelay(ENEMY_DASH_DELAY_AFTER_SHOT);
        } else if (enemy.kind === "slow") {
          enemy.phase = "recover";
          enemy.phaseTimer = getStaggeredEnemyDelay(SLOW_ENEMY_RECOVER_DELAY);
        } else if (enemy.kind === "spray") {
          const target = getEnemyAggroTarget(enemy.x, enemy.y);
          enemy.phase = "spray_charge";
          enemy.phaseTimer = getStaggeredEnemyDelay(SPRAY_CHARGE_TIME);
          enemy.aimX = target.x;
          enemy.aimY = target.y;
          enemy.shotsRemaining = ENEMY_SPRAY_PROJECTILE_COUNT;
          enemy.shotTimer = randomRange(0, SPRAY_SHOT_INTERVAL);
        } else if (enemy.kind === "sniper") {
          const target = getEnemyAggroTarget(enemy.x, enemy.y);
          enemy.phase = "sniper_charge";
          enemy.phaseTimer = getStaggeredEnemyDelay(SNIPER_CHARGE_TIME);
          enemy.aimX = target.x;
          enemy.aimY = target.y;
        } else if (enemy.kind === "laser") {
          if (enemy.turnShotLocked) {
            setEnemyTurnWait(enemy);
          } else {
            enemy.phase = "recover";
            enemy.phaseTimer = getStaggeredEnemyDelay(ENEMY_DASH_DELAY_AFTER_SHOT);
          }
        } else {
          const target = getEnemyAggroTarget(enemy.x, enemy.y);
          enemy.phase = "charge";
          enemy.phaseTimer = getStaggeredEnemyDelay(LASER_CHARGE_TIME);
          enemy.aimX = target.x;
          enemy.aimY = target.y;
        }
      }

      continue;
    }

    if (enemy.phase === "charge") {
      const target = getEnemyAggroTarget(enemy.x, enemy.y);
      enemy.aimX = target.x;
      enemy.aimY = target.y;
      enemy.phaseTimer -= timerDt;
      if (enemy.phaseTimer <= 0) {
        fireEnemyLaser(enemy);
        setEnemyTurnWait(enemy);
        enemy.turnShotLocked = true;
      }
      continue;
    }

    if (enemy.phase === "sniper_charge") {
      const target = getEnemyAggroTarget(enemy.x, enemy.y);
      enemy.aimX = target.x;
      enemy.aimY = target.y;
      enemy.phaseTimer -= timerDt;
      if (enemy.phaseTimer <= 0) {
        fireEnemySniper(enemy);
        setEnemyTurnWait(enemy);
        enemy.turnShotLocked = true;
      }
      continue;
    }

    if (enemy.phase === "spray_charge") {
      // Lock spray aim when the warning lines appear so the attack does not keep rotating.
      enemy.phaseTimer -= timerDt;
      if (enemy.phaseTimer <= 0) {
        enemy.phase = "spray_fire";
        enemy.shotTimer = 0;
      }
      continue;
    }

    if (enemy.phase === "spray_fire") {
      enemy.shotTimer -= timerDt;
      while (enemy.phase === "spray_fire" && enemy.shotTimer <= 0 && enemy.shotsRemaining > 0) {
        fireEnemySprayShot(enemy);
        enemy.shotsRemaining -= 1;
        if (enemy.shotsRemaining <= 0) {
          setEnemyTurnWait(enemy);
          enemy.turnShotLocked = true;
          break;
        }
        enemy.shotTimer += SPRAY_SHOT_INTERVAL;
      }
      continue;
    }

    if (enemy.phase === "recover") {
      enemy.phaseTimer -= timerDt;
      if (enemy.phaseTimer <= 0) {
        launchEnemy(enemy);
      }
      continue;
    }

    if (enemy.phase === "shield_windup") {
      enemy.phaseTimer -= timerDt;
      if (enemy.phaseTimer <= 0) {
        enemy.phase = "shield_up";
        enemy.phaseTimer = getStaggeredEnemyDelay(ENEMY_SHIELD_UP_TIME);
        enemy.phaseDuration = enemy.phaseTimer;
      }
      continue;
    }

    if (enemy.phase === "shield_up") {
      enemy.phaseTimer -= timerDt;
      if (enemy.phaseTimer <= 0) {
        setEnemyTurnWait(enemy);
      }
    }
  }
}

function updateBruteEnemy(enemy, dt) {
  const target = getEnemyAggroTarget(enemy.x, enemy.y);
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= 0.001) {
    enemy.vx = 0;
    enemy.vy = 0;
    return;
  }

  const dirX = dx / distance;
  const dirY = dy / distance;
  const currentSpeed = Math.hypot(enemy.vx, enemy.vy);
  const nextSpeed = Math.min(BRUTE_CHASE_SPEED, currentSpeed + BRUTE_CHASE_ACCELERATION * dt);
  const step = Math.min(nextSpeed * dt, Math.max(0, distance));

  enemy.vx = dirX * nextSpeed;
  enemy.vy = dirY * nextSpeed;
  enemy.x += dirX * step;
  enemy.y += dirY * step;

  handleWallBounce(enemy);
}

function updateSproutlingEnemy(enemy, dt) {
  const target = getEnemyAggroTarget(enemy.x, enemy.y);
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= 0.001) {
    enemy.vx = 0;
    enemy.vy = 0;
    return;
  }

  const dirX = dx / distance;
  const dirY = dy / distance;
  const currentSpeed = Math.hypot(enemy.vx, enemy.vy);
  const nextSpeed = Math.min(SPROUTLING_CHASE_SPEED, currentSpeed + SPROUTLING_CHASE_ACCELERATION * dt);
  const step = Math.min(nextSpeed * dt, Math.max(0, distance));

  enemy.vx = dirX * nextSpeed;
  enemy.vy = dirY * nextSpeed;
  enemy.x += dirX * step;
  enemy.y += dirY * step;

  handleWallBounce(enemy);
}

function updateSlowEnemy(enemy, dt) {
  const target = getEnemyAggroTarget();
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const distance = Math.hypot(dx, dy);

  if (distance <= 0.001) {
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.moving = false;
    return;
  }

  const distanceDelta = distance - SLOW_ENEMY_HOLD_DISTANCE;
  const dirX = dx / distance;
  const dirY = dy / distance;
  const currentSpeed = Math.hypot(enemy.vx, enemy.vy);
  const nextSpeed = Math.min(SLOW_ENEMY_CHASE_SPEED, currentSpeed + SLOW_ENEMY_CHASE_ACCELERATION * dt);
  const step = Math.min(nextSpeed * dt, Math.abs(distanceDelta));

  if (Math.abs(distanceDelta) <= 2) {
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.moving = false;
  } else {
    const moveSign = distanceDelta > 0 ? 1 : -1;
    enemy.vx = dirX * nextSpeed * moveSign;
    enemy.vy = dirY * nextSpeed * moveSign;
    enemy.x += dirX * step * moveSign;
    enemy.y += dirY * step * moveSign;
    enemy.moving = true;
  }

  enemy.phase = null;
  enemy.phaseTimer = 0;
  enemy.moveTarget = null;
  enemy.restingFor = 0;

  handleWallBounce(enemy);
}

function activateEnemyMirrorShield(enemy) {
  const target = getEnemyAggroTarget(enemy.x, enemy.y);
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;

  enemy.vx = 0;
  enemy.vy = 0;
  enemy.moving = false;
  enemy.moveTarget = null;
  enemy.phase = "mirror_shield";
  enemy.phaseTimer = MIRROR_SHIELD_DURATION;
  enemy.mirrorReady = true;
  enemy.mirrorDirX = dx / distance;
  enemy.mirrorDirY = dy / distance;
  enemy.turnShotLocked = true;
}

function updateLevel1Boss(enemy, dt) {
  if (enemy.bossStage === 1) {
    enemy.x += enemy.vx * dt;
    enemy.y += enemy.vy * dt;
    handleWallBounce(enemy);
    enemy.bossExplosionTimer -= dt;
    if (enemy.bossExplosionTimer <= 0) {
      spawnBossCellExplosion(enemy.x, enemy.y);
      enemy.bossExplosionTimer += LEVEL1_BOSS_EXPLOSION_INTERVAL;
    }
    return;
  }

  if (enemy.bossState === "shield") {
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.bossStateTimer -= dt;
    if (enemy.bossStateTimer <= 0) {
      enemy.bossState = "chase";
      enemy.bossStateTimer = randomRange(1.8, 2.7);
      enemy.bossNextSpecial = "burst";
    }
    return;
  }

  if (enemy.bossState === "blink") {
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.bossStateTimer -= dt;
    if (enemy.bossStateTimer <= 0) {
      fireBossRadialBurst(enemy);
      enemy.bossState = "chase";
      enemy.bossStateTimer = randomRange(2.0, 3.0);
      enemy.bossNextSpecial = "shield";
    }
    return;
  }

  updateBossChase(enemy, dt);
  enemy.bossStateTimer -= dt;
  if (enemy.bossStateTimer > 0) return;
  enemy.bossState = enemy.bossNextSpecial === "shield" ? "shield" : "blink";
  enemy.bossStateTimer = enemy.bossNextSpecial === "shield" ? LEVEL1_BOSS_SHIELD_TIME : LEVEL1_BOSS_BLINK_TIME;
}

function updateBossChase(enemy, dt) {
  const target = getEnemyAggroTarget(enemy.x, enemy.y);
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;
  const desiredVx = (dx / distance) * LEVEL1_BOSS_CHASE_SPEED;
  const desiredVy = (dy / distance) * LEVEL1_BOSS_CHASE_SPEED;
  enemy.vx = moveToward(enemy.vx, desiredVx, LEVEL1_BOSS_CHASE_ACCELERATION * dt);
  enemy.vy = moveToward(enemy.vy, desiredVy, LEVEL1_BOSS_CHASE_ACCELERATION * dt);
  const speed = Math.hypot(enemy.vx, enemy.vy);
  if (speed > LEVEL1_BOSS_CHASE_SPEED) {
    enemy.vx = (enemy.vx / speed) * LEVEL1_BOSS_CHASE_SPEED;
    enemy.vy = (enemy.vy / speed) * LEVEL1_BOSS_CHASE_SPEED;
  }
  enemy.x += enemy.vx * dt;
  enemy.y += enemy.vy * dt;
  handleWallBounce(enemy);
}

function updateLevel2Boss(enemy, dt) {
  if (enemy.bossStage === 1) {
    if (enemy.bossState === "pull_cast") {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.bossStateTimer -= dt;
      if (enemy.bossStateTimer <= 0) {
        enemy.bossState = "pull_active";
        enemy.bossStateTimer = LEVEL2_BOSS_PULL_DURATION;
      }
      return;
    }

    if (enemy.bossState === "pull_active") {
      enemy.vx = 0;
      enemy.vy = 0;
      pullPlayerTowardBoss(enemy, getCellSize() * LEVEL2_BOSS_PULL_RADIUS_CELLS, dt);
      enemy.bossStateTimer -= dt;
      if (enemy.bossStateTimer <= 0) {
        enemy.bossState = "chase";
        enemy.bossPullTimer = LEVEL2_BOSS_PULL_DELAY;
      }
      return;
    }

    updateLevel2BossChase(enemy, dt, LEVEL2_BOSS_CHASE_SPEED, LEVEL2_BOSS_CHASE_ACCELERATION);
    enemy.bossPullTimer -= dt;
    if (enemy.bossPullTimer <= 0) {
      enemy.bossState = "pull_cast";
      enemy.bossStateTimer = LEVEL2_BOSS_PULL_CAST_TIME;
      enemy.vx = 0;
      enemy.vy = 0;
    }
    return;
  }

  if (enemy.bossStage === 2) {
    updateLevel2BossStageTwo(enemy, dt);
    return;
  }

  updateLevel2BossStageThree(enemy, dt);
}

function updateLevel2BossChase(enemy, dt, maxSpeed, acceleration) {
  const target = getEnemyAggroTarget(enemy.x, enemy.y);
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;
  const desiredVx = (dx / distance) * maxSpeed;
  const desiredVy = (dy / distance) * maxSpeed;
  enemy.vx = moveToward(enemy.vx, desiredVx, acceleration * dt);
  enemy.vy = moveToward(enemy.vy, desiredVy, acceleration * dt);
  const speed = Math.hypot(enemy.vx, enemy.vy);
  if (speed > maxSpeed) {
    enemy.vx = (enemy.vx / speed) * maxSpeed;
    enemy.vy = (enemy.vy / speed) * maxSpeed;
  }
  enemy.x += enemy.vx * dt;
  enemy.y += enemy.vy * dt;
  handleWallBounce(enemy);
}

function updateLevel2BossStageTwo(enemy, dt) {
  if (enemy.bossState === "charge") {
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.bossStateTimer -= dt;
    enemy.aimX = player.x;
    enemy.aimY = player.y;
    if (enemy.bossStateTimer <= 0) {
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const distance = Math.hypot(dx, dy) || 1;
      enemy.vx = (dx / distance) * LEVEL2_BOSS_DASH_SPEED;
      enemy.vy = (dy / distance) * LEVEL2_BOSS_DASH_SPEED;
      enemy.bossState = "dash";
      enemy.bossStateTimer = LEVEL2_BOSS_DASH_TIME;
    }
    return;
  }

  if (enemy.bossState === "dash") {
    enemy.x += enemy.vx * dt;
    enemy.y += enemy.vy * dt;
    handleWallBounce(enemy);
    enemy.bossStateTimer -= dt;
    if (enemy.bossStateTimer <= 0) {
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.bossState = "pull_wait";
      enemy.bossStateTimer = LEVEL2_BOSS_PULL_AFTER_DASH_DELAY;
    }
    return;
  }

  enemy.bossStateTimer -= dt;
  if (enemy.bossStateTimer <= 0) {
    pullPlayerTowardBoss(enemy, getCellSize() * LEVEL2_BOSS_STAGE_TWO_PULL_RADIUS_CELLS, LEVEL2_BOSS_PULL_DURATION);
    enemy.bossState = "charge";
    enemy.bossStateTimer = LEVEL2_BOSS_CHARGE_TIME;
  }
}

function updateLevel2BossStageThree(enemy, dt) {
  enemy.x += enemy.vx * dt;
  enemy.y += enemy.vy * dt;
  handleWallBounce(enemy);
  pullPlayerTowardBoss(enemy, getCellSize() * LEVEL2_BOSS_PULL_RADIUS_CELLS, dt);

  enemy.bossMineTimer -= dt;
  while (enemy.bossMineTimer <= 0) {
    spawnBossTimedMine(enemy.x, enemy.y);
    enemy.bossMineTimer += LEVEL2_BOSS_MINE_INTERVAL;
  }
}

function pullPlayerTowardBoss(enemy, radius, dt) {
  const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
  if (distance > radius + player.size * 0.5) return false;
  if (distance <= 1) return true;

  const step = Math.min(distance, LEVEL2_BOSS_PULL_SPEED * dt);
  const half = player.size * 0.5;
  player.x = clamp(player.x + ((enemy.x - player.x) / distance) * step, ARENA.x + half, ARENA.x + ARENA.width - half);
  player.y = clamp(player.y + ((enemy.y - player.y) / distance) * step, ARENA.y + half, ARENA.y + ARENA.height - half);
  if (Math.random() < dt * 8) {
    spawnImpactBurst(player.x, player.y, { count: 3, speedMin: 40, speedMax: 120, lifeMin: 0.1, lifeMax: 0.2, sizeMin: 2, sizeMax: 5 });
  }
  return true;
}

function spawnBossCellExplosion(x, y) {
  blastWaves.push({
    owner: "enemy",
    x,
    y,
    radius: 6,
    maxRadius: LEVEL1_BOSS_BLAST_MAX_RADIUS,
    expandSpeed: LEVEL1_BOSS_BLAST_EXPAND_SPEED,
    hitEnemyIds: new Set(),
    hitPlayer: false,
  });
}

function getLevel1BossPhaseTwoHp() {
  if (currentLevelIndex === 0) return LEVEL1_BOSS_LEVEL_ONE_PHASE_TWO_HP;
  if (currentLevelIndex === 1) return LEVEL1_BOSS_LEVEL_TWO_PHASE_TWO_HP;
  return LEVEL1_BOSS_PHASE_TWO_HP;
}

function enterLevel1BossStageTwo(enemy) {
  const phaseTwoHp = getLevel1BossPhaseTwoHp();
  enemy.bossStage = 2;
  enemy.hp = phaseTwoHp;
  enemy.maxHp = phaseTwoHp;
  enemy.bossState = "chase";
  enemy.bossStateTimer = 2.4;
  enemy.bossNextSpecial = "shield";
  enemy.vx *= 0.45;
  enemy.vy *= 0.45;
  spawnImpactBurst(enemy.x, enemy.y, { count: 34, speedMin: 130, speedMax: 420, lifeMin: 0.28, lifeMax: 0.58, sizeMin: 5, sizeMax: 12 });
}

function enterLevel2BossNextStage(enemy) {
  enemy.bossStage += 1;
  enemy.hp = LEVEL2_BOSS_PHASE_HP;
  enemy.maxHp = LEVEL2_BOSS_PHASE_HP;
  enemy.vx = 0;
  enemy.vy = 0;

  if (enemy.bossStage === 2) {
    enemy.bossState = "charge";
    enemy.bossStateTimer = LEVEL2_BOSS_CHARGE_TIME;
  } else {
    const direction = randomDirection();
    enemy.bossState = "bounce";
    enemy.bossMineTimer = 0;
    enemy.vx = direction.x * LEVEL2_BOSS_BOUNCE_SPEED;
    enemy.vy = direction.y * LEVEL2_BOSS_BOUNCE_SPEED;
  }

  spawnImpactBurst(enemy.x, enemy.y, { count: 34, speedMin: 140, speedMax: 440, lifeMin: 0.24, lifeMax: 0.54, sizeMin: 5, sizeMax: 13 });
}

function fireBossRadialBurst(enemy) {
  for (let index = 0; index < LEVEL1_BOSS_RADIAL_SHOTS; index += 1) {
    const angle = (Math.PI * 2 * index) / LEVEL1_BOSS_RADIAL_SHOTS;
    spawnLaserProjectile({ owner: "enemy", x: enemy.x, y: enemy.y, dirX: Math.cos(angle), dirY: Math.sin(angle), range: getArenaProjectileReach(), color: "rgba(255, 49, 95, 0.96)", width: LASER_PROJECTILE_WIDTH - 1, speed: LEVEL1_BOSS_RADIAL_SPEED });
  }
}

function updateLevel3Boss(enemy, dt) {
  enemy.bossVolleyCooldown = Math.max(0, (enemy.bossVolleyCooldown ?? 0) - dt);

  if (enemy.bossStage === 1) {
    updateLevel3BossMovement(enemy, dt);
    updateLevel3BossStageOne(enemy, dt);
    return;
  }

  if (enemy.bossStage === 2) {
    updateLevel3BossMovement(enemy, dt);
    return;
  }

  enemy.vx = 0;
  enemy.vy = 0;
  updateLevel3BossStageThree(enemy, dt);
}

function updateLevel3BossMovement(enemy, dt) {
  const target = getEnemyAggroTarget(enemy.x, enemy.y);
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;
  const desiredVx = (dx / distance) * LEVEL3_BOSS_MOVE_SPEED;
  const desiredVy = (dy / distance) * LEVEL3_BOSS_MOVE_SPEED;

  enemy.vx = moveToward(enemy.vx, desiredVx, LEVEL3_BOSS_MOVE_ACCELERATION * dt);
  enemy.vy = moveToward(enemy.vy, desiredVy, LEVEL3_BOSS_MOVE_ACCELERATION * dt);
  const speed = Math.hypot(enemy.vx, enemy.vy);
  if (speed > LEVEL3_BOSS_MOVE_SPEED) {
    enemy.vx = (enemy.vx / speed) * LEVEL3_BOSS_MOVE_SPEED;
    enemy.vy = (enemy.vy / speed) * LEVEL3_BOSS_MOVE_SPEED;
  }

  enemy.x += enemy.vx * dt;
  enemy.y += enemy.vy * dt;
  handleWallBounce(enemy);
}

function updateLevel3BossStageOne(enemy, dt) {
  enemy.bossMissileTimer -= dt;
  if (enemy.bossMissileTimer <= 0) {
    fireEnemyHomingMissile(enemy);
    enemy.bossMissileTimer += LEVEL3_BOSS_MISSILE_INTERVAL;
  }

  if (enemy.bossState === "radial_cast") {
    enemy.bossStateTimer -= dt;
    if (enemy.bossStateTimer <= 0) {
      fireLevel3BossRadialLasers(enemy);
      enemy.bossState = "idle";
      enemy.bossRadialTimer = LEVEL3_BOSS_RADIAL_INTERVAL;
      enemy.bossRadialAngles = [];
    }
    return;
  }

  enemy.bossRadialTimer -= dt;
  if (enemy.bossRadialTimer <= 0) {
    enemy.bossState = "radial_cast";
    enemy.bossStateTimer = LEVEL3_BOSS_RADIAL_CAST_TIME;
    const centerAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    enemy.bossRadialAngles = Array.from({ length: LEVEL3_BOSS_RADIAL_SHOTS }, (_, index) => (
      centerAngle + (LEVEL3_BOSS_RADIAL_SHOTS === 1 ? 0 : (index / (LEVEL3_BOSS_RADIAL_SHOTS - 1) - 0.5) * LEVEL3_BOSS_RADIAL_ARC)
    ));
  }
}

function updateLevel3BossStageThree(enemy, dt) {
  if (enemy.bossState === "laser_cast") {
    enemy.bossStateTimer -= dt;
    if (enemy.bossStateTimer <= 0) {
      fireEnemyInstantBeam(enemy.x, enemy.y, enemy.aimX, enemy.aimY, {
        color: "rgba(169, 98, 255, 0.96)",
        innerColor: "rgba(246, 232, 255, 0.96)",
        width: 8,
      });
      fireEnemyHomingMissile(enemy);
      enemy.bossState = "idle";
      enemy.bossLaserTimer = Math.max(0, LEVEL3_BOSS_STAGE_THREE_LASER_INTERVAL - LEVEL3_BOSS_STAGE_THREE_LASER_CAST_TIME);
    }
    return;
  }

  enemy.bossLaserTimer -= dt;
  if (enemy.bossLaserTimer <= 0) {
    enemy.bossState = "laser_cast";
    enemy.bossStateTimer = LEVEL3_BOSS_STAGE_THREE_LASER_CAST_TIME;
    enemy.aimX = player.x;
    enemy.aimY = player.y;
  }
}

function fireLevel3BossRadialLasers(enemy) {
  const angles = enemy.bossRadialAngles?.length
    ? enemy.bossRadialAngles
    : (() => {
      const centerAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
      return Array.from({ length: LEVEL3_BOSS_RADIAL_SHOTS }, (_, index) => (
        centerAngle + (LEVEL3_BOSS_RADIAL_SHOTS === 1 ? 0 : (index / (LEVEL3_BOSS_RADIAL_SHOTS - 1) - 0.5) * LEVEL3_BOSS_RADIAL_ARC)
      ));
    })();
  for (const angle of angles) {
    const reach = getArenaProjectileReach();
    fireEnemyInstantBeam(
      enemy.x,
      enemy.y,
      enemy.x + Math.cos(angle) * reach,
      enemy.y + Math.sin(angle) * reach,
      {
        color: "rgba(169, 98, 255, 0.9)",
        innerColor: "rgba(244, 232, 255, 0.96)",
        width: 6,
      }
    );
  }
}

function enterLevel3BossNextStage(enemy) {
  enemy.bossStage += 1;
  enemy.hp = enemy.bossStage === 2 ? LEVEL3_BOSS_STAGE_TWO_HP : LEVEL3_BOSS_STAGE_THREE_HP;
  enemy.maxHp = enemy.hp;
  enemy.vx = 0;
  enemy.vy = 0;
  enemy.bossState = "idle";
  enemy.bossStateTimer = 0;
  enemy.bossRadialAngles = [];
  enemy.bossVolleyCooldown = 0;
  enemy.bossMissileTimer = 0;
  enemy.bossLaserTimer = enemy.bossStage === 3 ? Math.max(0, LEVEL3_BOSS_STAGE_THREE_LASER_INTERVAL - LEVEL3_BOSS_STAGE_THREE_LASER_CAST_TIME) : 0;
  enemy.moving = enemy.bossStage < 3;
  spawnImpactBurst(enemy.x, enemy.y, { count: 38, speedMin: 150, speedMax: 460, lifeMin: 0.24, lifeMax: 0.58, sizeMin: 5, sizeMax: 13 });
}

function fireEnemyInstantBeam(fromX, fromY, toX, toY, options = {}) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.hypot(dx, dy) || 1;
  const endX = fromX + (dx / distance) * getArenaProjectileReach();
  const endY = fromY + (dy / distance) * getArenaProjectileReach();

  beamEffects.push({
    fromX,
    fromY,
    toX: endX,
    toY: endY,
    color: options.color ?? "rgba(132, 12, 28, 0.96)",
    innerColor: options.innerColor ?? "rgba(255, 228, 236, 0.96)",
    width: options.width ?? 7,
    ttl: 0.14,
    life: 0.14,
  });

  let bestDecoyIndex = -1;
  let bestDecoyT = Infinity;
  for (let index = 0; index < activePlayerDecoys.length; index += 1) {
    const decoy = activePlayerDecoys[index];
    const decoyHit = getSegmentCircleHit(fromX, fromY, endX, endY, decoy.x, decoy.y, decoy.size * 0.65);
    if (!decoyHit || decoyHit.t >= bestDecoyT) continue;
    bestDecoyIndex = index;
    bestDecoyT = decoyHit.t;
  }
  if (bestDecoyIndex !== -1) {
    activePlayerDecoys.splice(bestDecoyIndex, 1);
    return;
  }

  const playerHit = getSegmentCircleHit(fromX, fromY, endX, endY, player.x, player.y, player.size * 0.55);
  if (playerHit) applyPlayerHit();
}

function fireEnemyHomingMissile(enemy, angle = null, options = {}) {
  const baseAngle = angle ?? Math.atan2(player.y - enemy.y, player.x - enemy.x);
  const permanent = enemy.kind === LEVEL3_BOSS_KIND && enemy.bossStage < 3;
  const lifetime = permanent ? Infinity : LEVEL3_BOSS_MISSILE_LIFETIME;
  const speedMultiplier = options.speedMultiplier ?? 1;
  const baseSpeed = LEVEL3_BOSS_MISSILE_SPEED * speedMultiplier;
  const maxSpeed = LEVEL3_BOSS_MISSILE_SPEED * 1.8 * speedMultiplier;
  const acceleration = LEVEL3_BOSS_MISSILE_ACCELERATION * speedMultiplier;
  enemyHomingMissiles.push({
    x: enemy.x,
    y: enemy.y,
    vx: Math.cos(baseAngle) * baseSpeed,
    vy: Math.sin(baseAngle) * baseSpeed,
    speed: baseSpeed,
    maxSpeed,
    acceleration,
    ttl: lifetime,
    life: lifetime,
    permanent,
    radius: 8,
    hp: 1,
    owner: "enemy",
    color: "rgba(169, 98, 255, 0.96)",
    innerColor: "rgba(250, 238, 255, 0.96)",
  });
}

function fireLevel3BossMissileVolley(enemy) {
  const baseAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
  for (let index = 0; index < LEVEL3_BOSS_STAGE_TWO_VOLLEY_COUNT; index += 1) {
    const spreadT = LEVEL3_BOSS_STAGE_TWO_VOLLEY_COUNT === 1 ? 0 : index / (LEVEL3_BOSS_STAGE_TWO_VOLLEY_COUNT - 1);
    fireEnemyHomingMissile(enemy, baseAngle + (spreadT - 0.5) * Math.PI * 0.9, {
      speedMultiplier: LEVEL3_BOSS_STAGE_TWO_MISSILE_SPEED_MULTIPLIER,
    });
  }
}

function getCommanderRallyTarget(commander) {
  const allies = enemies
    .filter((enemy) => enemy.id !== commander.id && !enemy.isIllusion && !isBossEnemy(enemy))
    .map((enemy) => ({
      enemy,
      distance: Math.hypot(enemy.x - commander.x, enemy.y - commander.y),
    }))
    .sort((left, right) => left.distance - right.distance)
    .slice(0, 4);

  if (allies.length === 0) return null;

  let weightTotal = 0;
  let x = 0;
  let y = 0;
  for (const ally of allies) {
    const weight = 1 / Math.max(40, ally.distance);
    weightTotal += weight;
    x += ally.enemy.x * weight;
    y += ally.enemy.y * weight;
  }

  return {
    x: x / weightTotal,
    y: y / weightTotal,
  };
}

function launchEnemy(enemy) {
  let direction = randomDirection();
  let dashDistance = randomRange(ENEMY_DASH_MIN_DISTANCE, ENEMY_DASH_MAX_DISTANCE);

  if (enemy.kind === "shield") {
    const target = getEnemyAggroTarget(enemy.x, enemy.y);
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 1) {
      direction = { x: dx / distance, y: dy / distance };
      dashDistance = Math.min(distance, ENEMY_DASH_MAX_DISTANCE);
    }
  } else if (enemy.kind === "trickster") {
    const target = getEnemyAggroTarget(enemy.x, enemy.y);
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 1) {
      const angle = Math.atan2(dy, dx) + randomRange(-0.55, 0.55);
      direction = { x: Math.cos(angle), y: Math.sin(angle) };
      dashDistance = clamp(distance * 0.9, ENEMY_DASH_MIN_DISTANCE * 0.8, ENEMY_DASH_MAX_DISTANCE);
    }
  } else if (enemy.kind === "commander") {
    const target = getCommanderRallyTarget(enemy);
    if (target) {
      const dx = target.x - enemy.x;
      const dy = target.y - enemy.y;
      const distance = Math.hypot(dx, dy);
      if (distance > COMMANDER_RALLY_DISTANCE) {
        direction = { x: dx / distance, y: dy / distance };
        dashDistance = clamp(distance - COMMANDER_RALLY_DISTANCE, ENEMY_DASH_MIN_DISTANCE * 0.45, ENEMY_DASH_MAX_DISTANCE);
      } else if (distance > 1) {
        const angle = Math.atan2(dy, dx) + randomRange(-0.7, 0.7);
        direction = { x: Math.cos(angle), y: Math.sin(angle) };
        dashDistance = ENEMY_DASH_MIN_DISTANCE * 0.45;
      }
    }
  } else if (enemy.kind === "medic") {
    const target = getMedicWoundedAllyTarget(enemy);
    if (target) {
      const dx = target.x - enemy.x;
      const dy = target.y - enemy.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 1) {
        direction = { x: dx / distance, y: dy / distance };
        dashDistance = Math.min(distance, ENEMY_DASH_MAX_DISTANCE);
      }
    }
  }

  const half = enemy.size * 0.5;
  const targetX = clamp(enemy.x + direction.x * dashDistance, ARENA.x + half, ARENA.x + ARENA.width - half);
  const targetY = clamp(enemy.y + direction.y * dashDistance, ARENA.y + half, ARENA.y + ARENA.height - half);

  enemy.moveTarget = { x: targetX, y: targetY };
  enemy.vx = 0;
  enemy.vy = 0;
  enemy.moving = true;
  enemy.restingFor = 0;
  enemy.phase = "dash";
  enemy.phaseTimer = enemy.kind === "laser" && !enemy.turnShotLocked ? getStaggeredEnemyDelay(LASER_CHARGE_TIME) : 0;
}

function createEnemy(kind, x, y) {
  const isBrute = kind === "brute";
  const isShield = kind === "shield";
  const isSproutling = kind === "sproutling";
  const isSplitterChild = kind === "splitter_child";
  const isCommander = kind === "commander";
  const isMedic = kind === "medic";
  const isLevel1Boss = kind === LEVEL1_BOSS_KIND;
  const isLevel2Boss = kind === LEVEL2_BOSS_KIND;
  const isLevel3Boss = kind === LEVEL3_BOSS_KIND;
  const isBoss = isLevel1Boss || isLevel2Boss || isLevel3Boss;
  const enemy = {
    id: enemyId += 1,
    x,
    y,
    vx: 0,
    vy: 0,
    size: isLevel1Boss ? LEVEL1_BOSS_SIZE : isLevel2Boss ? LEVEL2_BOSS_SIZE : isLevel3Boss ? LEVEL3_BOSS_SIZE : isBrute ? ENEMY_SIZE * 1.18 : isSproutling || isSplitterChild ? ENEMY_SIZE * 0.72 : ENEMY_SIZE,
    moving: false,
    restingFor: 0,
    power: randomRange(0.7, 1.4),
    kind,
    hp: isLevel1Boss ? LEVEL1_BOSS_PHASE_ONE_HP : isLevel2Boss ? LEVEL2_BOSS_PHASE_HP : isLevel3Boss ? LEVEL3_BOSS_STAGE_ONE_HP : isBrute ? BRUTE_CONTACT_HP : isShield ? SHIELD_ENEMY_HP : isCommander ? COMMANDER_HP : isMedic ? MEDIC_HP : DEFAULT_ENEMY_HP,
    maxHp: isLevel1Boss ? LEVEL1_BOSS_PHASE_ONE_HP : isLevel2Boss ? LEVEL2_BOSS_PHASE_HP : isLevel3Boss ? LEVEL3_BOSS_STAGE_ONE_HP : isBrute ? BRUTE_CONTACT_HP : isShield ? SHIELD_ENEMY_HP : isCommander ? COMMANDER_HP : isMedic ? MEDIC_HP : DEFAULT_ENEMY_HP,
    renderWidth: isLevel1Boss ? LEVEL1_BOSS_SIZE * 1.12 : isLevel2Boss ? LEVEL2_BOSS_SIZE * 1.16 : isLevel3Boss ? LEVEL3_BOSS_SIZE * 1.18 : isBrute ? ENEMY_SIZE * 1.85 : isSproutling || isSplitterChild ? ENEMY_SIZE * 0.8 : ENEMY_SIZE,
    renderHeight: isLevel1Boss ? LEVEL1_BOSS_SIZE * 1.12 : isLevel2Boss ? LEVEL2_BOSS_SIZE * 1.16 : isLevel3Boss ? LEVEL3_BOSS_SIZE * 1.18 : isBrute ? ENEMY_SIZE * 1.1 : isSproutling || isSplitterChild ? ENEMY_SIZE * 0.8 : ENEMY_SIZE,
    ability:
      kind === "shield"
        ? abilities.shield
        : kind === "laser"
          ? abilities.laser
          : kind === "sniper"
            ? abilities.sniper
          : kind === "spray"
            ? abilities.spray
          : kind === "bomber"
            ? abilities.pulse_bomb
          : kind === "splitter"
            ? abilities.splitter
            : kind === "grower"
              ? abilities.missiles
            : kind === "slow"
              ? abilities.blast
              : null,
    abilityCharges:
      kind === "shield"
        ? STOLEN_SHIELD_CHARGES
        : kind === "laser"
          ? STOLEN_LASER_CHARGES
          : kind === "sniper"
            ? STOLEN_SNIPER_CHARGES
          : kind === "spray"
            ? STOLEN_ABILITY_CHARGES
            : kind === "bomber"
              ? STOLEN_BOMBER_BLAST_CHARGES
            : kind === "splitter"
              ? STOLEN_SPLITTER_CHARGES
            : kind === "grower"
              ? STOLEN_MISSILE_CHARGES
            : kind === "slow"
              ? STOLEN_BLAST_CHARGES
              : null,
    phase: null,
    phaseTimer: 0,
    aimX: x,
    aimY: y,
    moveTarget: null,
    mineTimer: randomRange(ENEMY_MINE_INTERVAL_MIN, ENEMY_MINE_INTERVAL_MAX),
    seedTimer: randomRange(GROWER_SEED_INTERVAL_MIN, GROWER_SEED_INTERVAL_MAX),
    medicTimer: randomRange(MEDIC_SUPPORT_INTERVAL * 0.55, MEDIC_SUPPORT_INTERVAL),
    replicateTimer: REPLICATOR_CLONE_TIME,
    mirrorReady: false,
    mirrorShieldCooldown: kind === "mirror" ? randomRange(1.8, 4.4) : 0,
    mirrorDirX: 1,
    mirrorDirY: 0,
    turnShotLocked: false,
  };

  if (isBoss) {
    enemy.bossStage = 1;
    if (isLevel2Boss) {
      enemy.bossState = "chase";
      enemy.bossPullTimer = LEVEL2_BOSS_PULL_DELAY;
      enemy.bossStateTimer = 0;
      enemy.bossMineTimer = LEVEL2_BOSS_MINE_INTERVAL;
    } else if (isLevel3Boss) {
      enemy.bossState = "idle";
      enemy.bossRadialTimer = LEVEL3_BOSS_RADIAL_INTERVAL;
      enemy.bossMissileTimer = LEVEL3_BOSS_MISSILE_INTERVAL;
      enemy.bossVolleyCooldown = 0;
      enemy.bossLaserTimer = LEVEL3_BOSS_STAGE_THREE_LASER_INTERVAL;
      enemy.bossRadialAngles = [];
    } else {
      enemy.bossState = "bounce";
      enemy.bossExplosionTimer = LEVEL1_BOSS_EXPLOSION_INTERVAL;
      enemy.bossStateTimer = 0;
      enemy.bossNextSpecial = "shield";
    }
  } else {
    const hpPenalty = getPlayerUpgrades().enemyHpPenalty;
    enemy.hp = Math.max(DEFAULT_ENEMY_HP, enemy.hp - hpPenalty);
    enemy.maxHp = Math.max(DEFAULT_ENEMY_HP, enemy.maxHp - hpPenalty);
  }

  return enemy;
}

function getRandomEnemyKind() {
  const roll = Math.random();
  return (
    roll < 0.025
      ? "replicator"
      : roll < 0.06
        ? "heal"
        : roll < 0.1
          ? "slow"
        : roll < 0.15
          ? "grower"
          : roll < 0.2
            ? "trickster"
            : roll < 0.25
              ? "sniper"
              : roll < 0.34
              ? "brute"
              : roll < 0.48
                ? "mine"
                : roll < 0.63
                  ? "shield"
                  : roll < 0.82
                    ? "spray"
                    : "laser"
  );
}

function spawnEnemy(x, y, forcedKind = null) {
  const kind = forcedKind ?? getRandomEnemyKind();
  const enemy = createEnemy(kind, x, y);

  enemies.push(enemy);
  if (kind === "brute" || kind === "slow") {
    enemy.moving = true;
  } else {
    launchEnemy(enemy);
  }
}

function spawnBoss(x, y, kind = LEVEL1_BOSS_KIND) {
  const boss = createEnemy(kind, x, y);
  const direction = randomDirection();
  const speed = kind === LEVEL2_BOSS_KIND || kind === LEVEL3_BOSS_KIND ? 0 : LEVEL1_BOSS_BOUNCE_SPEED;
  boss.vx = direction.x * speed;
  boss.vy = direction.y * speed;
  boss.moving = true;
  enemies.push(boss);
  spawnImpactBurst(x, y, { count: 46, speedMin: 160, speedMax: 520, lifeMin: 0.34, lifeMax: 0.86, sizeMin: 7, sizeMax: 18 });
}

function spawnTricksterIllusions(source) {
  const illusionCount = enemies.filter((enemy) => enemy.isIllusion).length;
  const availableSlots = Math.max(0, TRICKSTER_ILLUSION_LIMIT - illusionCount);
  const count = Math.min(availableSlots, Math.random() < 0.5 ? 1 : 2);
  if (count <= 0) return;

  for (let spawned = 0; spawned < count; spawned += 1) {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = randomRange(32, 68);
      const half = ENEMY_SIZE * 0.5;
      const x = clamp(source.x + Math.cos(angle) * distance, ARENA.x + half, ARENA.x + ARENA.width - half);
      const y = clamp(source.y + Math.sin(angle) * distance, ARENA.y + half, ARENA.y + ARENA.height - half);
      const overlaps = enemies.some((enemy) => Math.hypot(x - enemy.x, y - enemy.y) < ENEMY_SIZE * 1.1);
      if (overlaps) continue;

      enemies.push({
        ...createEnemy("trickster", x, y),
        isIllusion: true,
        ability: null,
        abilityCharges: null,
        illusionTimer: TRICKSTER_ILLUSION_LIFETIME,
        turnShotLocked: true,
      });
      break;
    }
  }
}

function spawnGrowerSeed(x, y) {
  if (enemySeeds.length >= GROWER_SEED_MAX_COUNT) return false;

  const minX = ARENA.x + GROWER_SEED_RADIUS;
  const maxX = ARENA.x + ARENA.width - GROWER_SEED_RADIUS;
  const minY = ARENA.y + GROWER_SEED_RADIUS;
  const maxY = ARENA.y + ARENA.height - GROWER_SEED_RADIUS;

  enemySeeds.push({
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY),
    timer: GROWER_SEED_HATCH_TIME,
    duration: GROWER_SEED_HATCH_TIME,
    radius: GROWER_SEED_RADIUS,
    pulseSeed: Math.random() * Math.PI * 2,
  });
  return true;
}

function spawnSproutling(x, y) {
  const sproutlingCount = enemies.filter((enemy) => enemy.kind === "sproutling").length;
  if (sproutlingCount >= GROWER_HATCHLING_LIMIT) return false;

  const sproutling = createEnemy("sproutling", x, y);
  sproutling.moving = true;
  enemies.push(sproutling);
  return true;
}

function spawnSplitterChildren(source) {
  const childCount = enemies.filter((enemy) => enemy.kind === "splitter_child").length;
  const count = Math.min(2, Math.max(0, SPLITTER_CHILD_LIMIT - childCount));
  if (count <= 0) return false;

  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.8;
    const distance = randomRange(24, 46);
    const half = ENEMY_SIZE * 0.36;
    const child = createEnemy(
      "splitter_child",
      clamp(source.x + Math.cos(angle) * distance, ARENA.x + half, ARENA.x + ARENA.width - half),
      clamp(source.y + Math.sin(angle) * distance, ARENA.y + half, ARENA.y + ARENA.height - half)
    );

    child.power = source.power * 0.55;
    child.moving = true;
    child.vx = Math.cos(angle) * SPROUTLING_CHASE_SPEED * 0.45;
    child.vy = Math.sin(angle) * SPROUTLING_CHASE_SPEED * 0.45;
    enemies.push(child);
  }

  return true;
}

function spawnReplicatorClone(source) {
  if (getSpawnLimitedEnemyCount() >= getEnemyMaxCount()) return false;

  const padding = ENEMY_SIZE * 2.1;
  for (let attempt = 0; attempt < 14; attempt += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = randomRange(48, 118);
    const x = source.x + Math.cos(angle) * distance;
    const y = source.y + Math.sin(angle) * distance;
    const half = ENEMY_SIZE * 0.5;
    const candidateX = clamp(x, ARENA.x + half, ARENA.x + ARENA.width - half);
    const candidateY = clamp(y, ARENA.y + half, ARENA.y + ARENA.height - half);

    const overlaps = enemies.some(
      (enemy) => Math.hypot(candidateX - enemy.x, candidateY - enemy.y) < padding + enemy.size * 0.65
    );
    if (overlaps) continue;

    const clone = createEnemy("replicator", candidateX, candidateY);
    enemies.push(clone);
    launchEnemy(clone);
    return true;
  }

  return false;
}

function clampEnemiesToArena() {
  for (const enemy of enemies) {
    const half = enemy.size * 0.5;
    enemy.x = clamp(enemy.x, ARENA.x + half, ARENA.x + ARENA.width - half);
    enemy.y = clamp(enemy.y, ARENA.y + half, ARENA.y + ARENA.height - half);
  }

  for (const marker of spawnMarkers) {
    marker.x = clamp(marker.x, ARENA.x + ENEMY_SIZE, ARENA.x + ARENA.width - ENEMY_SIZE);
    marker.y = clamp(marker.y, ARENA.y + ENEMY_SIZE, ARENA.y + ARENA.height - ENEMY_SIZE);
  }
}

function findFreePoint(padding) {
  const minX = ARENA.x + padding;
  const maxX = ARENA.x + ARENA.width - padding;
  const minY = ARENA.y + padding;
  const maxY = ARENA.y + ARENA.height - padding;

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const candidate = {
      x: randomRange(minX, maxX),
      y: randomRange(minY, maxY),
    };

    const nearPlayer = Math.hypot(candidate.x - player.x, candidate.y - player.y) < player.size * 4;
    if (nearPlayer) continue;

    const overlapsEnemy = enemies.some(
      (enemy) => Math.hypot(candidate.x - enemy.x, candidate.y - enemy.y) < padding + enemy.size
    );
    if (overlapsEnemy) continue;

    const overlapsMarker = spawnMarkers.some(
      (marker) => Math.hypot(candidate.x - marker.x, candidate.y - marker.y) < padding * 1.25
    );
    if (overlapsMarker) continue;

    return candidate;
  }

  return null;
}

function findNearestHookTarget() {
  let bestTarget = null;
  let bestDistance = getHookRange();

  for (const enemy of enemies) {
    if (enemy.kind === "brute") continue;
    if (isBossEnemy(enemy)) continue;
    const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (distance > bestDistance) continue;

    bestTarget = enemy;
    bestDistance = distance;
  }

  return bestTarget;
}

function getAbilityIconKey(abilityKey) {
  if (abilityKey === abilities.teleport.key) return "T";
  if (abilityKey === abilities.hook.key) return "H";
  if (abilityKey === abilities.sidearm.key) return "G";
  if (abilityKey === abilities.shield.key) return "S";
  if (abilityKey === abilities.sniper.key) return "N";
  if (abilityKey === abilities.decoy.key) return "D";
  if (abilityKey === abilities.missiles.key) return "R";
  if (abilityKey === abilities.spray.key) return "V";
  if (abilityKey === abilities.blast.key) return "B";
  if (abilityKey === abilities.pulse_bomb.key) return "P";
  if (abilityKey === abilities.splitter.key) return "Z";
  if (abilityKey === abilities.tripwire.key) return "X";
  return "L";
}

function getAbilityCooldownState(abilityKey) {
  if (abilityKey === abilities.hook.key && playerHookCooldown > 0) {
    return {
      remaining: playerHookCooldown,
      duration: getHookCooldown(),
    };
  }

  if (abilityKey === abilities.shield.key && playerShieldCooldown > 0) {
    return {
      remaining: playerShieldCooldown,
      duration: getShieldCooldown(),
    };
  }

  return null;
}

function getHookCooldown() {
  return HOOK_COOLDOWN * getPlayerUpgrades().hookCooldownMultiplier;
}

function getShieldCooldown() {
  return SHIELD_COOLDOWN * getPlayerUpgrades().shieldCooldownMultiplier;
}

function getBaseGunCooldown() {
  const upgrades = getPlayerUpgrades();
  return Math.max(0.5, BASE_GUN_COOLDOWN * upgrades.baseCooldownMultiplier - upgrades.baseCooldownReduction);
}

function getReadyBaseGunCharges() {
  return playerBaseGunCooldowns.filter((cooldown) => cooldown <= 0).length;
}

function getNextBaseGunCooldown() {
  let nextCooldown = Infinity;

  for (const cooldown of playerBaseGunCooldowns) {
    if (cooldown <= 0) continue;
    nextCooldown = Math.min(nextCooldown, cooldown);
  }

  return Number.isFinite(nextCooldown) ? nextCooldown : 0;
}

function consumeBaseGunCharge() {
  const slotIndex = playerBaseGunCooldowns.findIndex((cooldown) => cooldown <= 0);
  if (slotIndex === -1) return false;
  playerBaseGunCooldowns[slotIndex] = getBaseGunCooldown();
  return true;
}

function setCurrentAbility(ability, charges = null) {
  currentAbility = ability;
  currentAbilityCharges = charges;
  abilityMode = ability.key === abilities.hook.key ? "hook" : "primary";
}

function resetToHook() {
  currentAbility = abilities.hook;
  currentAbilityCharges = null;
  abilityMode = "hook";
  reserveAbility = null;
  reserveAbilityCharges = null;
}

function getSelectedAbilityState() {
  if (abilityMode === "teleport") {
    return {
      slot: "teleport",
      ability: abilities.teleport,
      charges: null,
    };
  }

  if (abilityMode === "base") {
    return {
      slot: "base",
      ability: abilities.sidearm,
      charges: getReadyBaseGunCharges(),
    };
  }

  if (abilityMode === "secondary" && reserveAbility) {
    return {
      slot: "secondary",
      ability: reserveAbility,
      charges: reserveAbilityCharges,
    };
  }

  if (abilityMode === "primary" && currentAbility.key !== abilities.hook.key) {
    return {
      slot: "primary",
      ability: currentAbility,
      charges: currentAbilityCharges,
    };
  }

  return {
    slot: "hook",
    ability: abilities.hook,
    charges: null,
  };
}

function promoteReserveAbility() {
  if (!reserveAbility) {
    setCurrentAbility(abilities.hook);
    reserveAbility = null;
    reserveAbilityCharges = null;
    return;
  }

  currentAbility = reserveAbility;
  currentAbilityCharges = reserveAbilityCharges;
  reserveAbility = null;
  reserveAbilityCharges = null;
  abilityMode = "primary";
}

function consumeAbilityCharge(slot = "primary") {
  if (slot === "secondary") {
    if (reserveAbilityCharges === null) return;
    reserveAbilityCharges -= 1;
    if (reserveAbilityCharges <= 0) {
      reserveAbility = null;
      reserveAbilityCharges = null;
      if (abilityMode === "secondary") {
        abilityMode = currentAbility.key !== abilities.hook.key ? "primary" : "hook";
      }
    }
    return;
  }

  if (currentAbilityCharges === null) return;
  currentAbilityCharges -= 1;
  if (currentAbilityCharges <= 0) {
    promoteReserveAbility();
  }
}

function stealEnemyAbility(enemy) {
  if (enemy.isIllusion) {
    removeEnemy(enemy.id);
    return;
  }

  addPlayerXp(getEnemyXpValue(enemy));
  if (enemy.kind === "heal" || enemy.kind === "medic") {
    player.hp = Math.min(player.maxHp, player.hp + 1);
  } else if (enemy.kind === "replicator") {
    playerAbilityCapacity = Math.max(playerAbilityCapacity, PLAYER_ABILITY_CAPACITY);
    playerHookCooldown = 0;
  } else if (enemy.kind === "trickster") {
    activatePlayerDecoyPassive();
  } else if (enemy.kind === "mine") {
    activatePlayerMinePassive();
  } else if (enemy.kind === "mirror") {
    if (currentAbility.key === abilities.hook.key) {
      setCurrentAbility(abilities.tripwire, STOLEN_TRIPWIRE_CHARGES);
    } else if (playerAbilityCapacity > 1 && !reserveAbility) {
      reserveAbility = abilities.tripwire;
      reserveAbilityCharges = STOLEN_TRIPWIRE_CHARGES;
    } else {
      setCurrentAbility(abilities.tripwire, STOLEN_TRIPWIRE_CHARGES);
    }
  } else if (enemy.ability) {
    if (currentAbility.key === abilities.hook.key) {
      setCurrentAbility(enemy.ability, enemy.abilityCharges);
    } else if (playerAbilityCapacity > 1 && !reserveAbility) {
      reserveAbility = enemy.ability;
      reserveAbilityCharges = enemy.abilityCharges;
    } else {
      setCurrentAbility(enemy.ability, enemy.abilityCharges);
    }
  }
  removeEnemy(enemy.id);
}

function useLaserAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return;

  activePlayerLaser = {
    targetX: targetPoint.x,
    targetY: targetPoint.y,
    dirX: dx / distance,
    dirY: dy / distance,
    timer: PLAYER_LASER_CHARGE_TIME,
    duration: PLAYER_LASER_CHARGE_TIME,
    slot: selected.slot,
  };
}

function useBaseGunAbility(targetPoint = aimPoint) {
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1 || !consumeBaseGunCharge()) return false;

  baseProjectiles.push({
    owner: "player",
    x: player.x,
    y: player.y,
    vx: (dx / distance) * BASE_GUN_PROJECTILE_SPEED,
    vy: (dy / distance) * BASE_GUN_PROJECTILE_SPEED,
    radius: BASE_GUN_PROJECTILE_RADIUS,
    ttl: BASE_GUN_PROJECTILE_LIFETIME,
    life: BASE_GUN_PROJECTILE_LIFETIME,
    color: "rgba(255, 214, 128, 0.96)",
    innerColor: "rgba(255, 245, 214, 0.96)",
  });
  return true;
}

function useSniperAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return false;

  activePlayerSniper = {
    targetX: targetPoint.x,
    targetY: targetPoint.y,
    dirX: dx / distance,
    dirY: dy / distance,
    timer: PLAYER_SNIPER_CHARGE_TIME,
    duration: PLAYER_SNIPER_CHARGE_TIME,
    slot: selected.slot,
  };
  return true;
}

function useSprayAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return;

  activePlayerSpray = {
    phase: "charge",
    targetX: targetPoint.x,
    targetY: targetPoint.y,
    dirX: dx / distance,
    dirY: dy / distance,
    timer: PLAYER_SPRAY_CHARGE_TIME,
    shotsRemaining: PLAYER_SPRAY_PROJECTILE_COUNT,
    shotTimer: 0,
    slot: selected.slot,
  };
}

function useShieldAbility() {
  const selected = getSelectedAbilityState();
  if (activePlayerShield || playerShieldCooldown > 0) return false;

  activePlayerShield = {
    timer: PLAYER_SHIELD_TIME,
    duration: PLAYER_SHIELD_TIME,
    radius: getShieldRadius(),
    damagedBossIds: new Set(),
  };
  playerShieldCooldown = getShieldCooldown();
  consumeAbilityCharge(selected.slot);
  return true;
}

function useBlastAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return false;

  const range = getBlastRange();
  const travel = Math.min(distance, range);
  const targetX = player.x + (dx / distance) * travel;
  const targetY = player.y + (dy / distance) * travel;

  blastWaves.push({
    x: targetX,
    y: targetY,
    radius: 6,
    maxRadius: BLAST_MAX_RADIUS,
    expandSpeed: BLAST_EXPAND_SPEED,
    hitEnemyIds: new Set(),
    hitPlayer: false,
  });
  consumeAbilityCharge(selected.slot);
  return true;
}

function spawnBlastWave(x, y, {
  owner = "player",
  radius = 6,
  maxRadius = BLAST_MAX_RADIUS,
  expandSpeed = BLAST_EXPAND_SPEED,
} = {}) {
  blastWaves.push({
    owner,
    x,
    y,
    radius,
    maxRadius,
    expandSpeed,
    hitEnemyIds: new Set(),
    hitPlayer: false,
  });
}

function usePulseBombAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return false;

  const range = getBlastRange();
  const travel = Math.min(distance, range);
  const targetX = player.x + (dx / distance) * travel;
  const targetY = player.y + (dy / distance) * travel;

  activePulseBombs.push({
    x: targetX,
    y: targetY,
    timer: 0,
    interval: PULSE_BOMB_INTERVAL,
    remaining: PULSE_BOMB_EXPLOSIONS,
    pulseSeed: Math.random() * Math.PI * 2,
  });
  consumeAbilityCharge(selected.slot);
  return true;
}

function spawnBomberBlast(x, y) {
  spawnBlastWave(x, y, {
    owner: "enemy",
    radius: 8,
    maxRadius: BOMBER_BLAST_MAX_RADIUS,
    expandSpeed: BOMBER_BLAST_EXPAND_SPEED,
  });
}

function useDecoyAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return false;

  const range = getDecoyRange();
  const travel = Math.min(distance, range);
  const targetX = player.x + (dx / distance) * travel;
  const targetY = player.y + (dy / distance) * travel;

  activePlayerDecoys.push({
    x: targetX,
    y: targetY,
    timer: DECOY_DURATION,
    duration: DECOY_DURATION,
    size: DECOY_SIZE,
  });
  consumeAbilityCharge(selected.slot);
  return true;
}

function findMissileTargets(targetPoint, count) {
  const candidates = enemies
    .filter((enemy) => !enemy.isIllusion)
    .map((enemy) => ({
      enemy,
      distance: Math.hypot(enemy.x - targetPoint.x, enemy.y - targetPoint.y),
    }))
    .sort((left, right) => left.distance - right.distance)
    .map((entry) => entry.enemy);

  if (candidates.length === 0) {
    return [];
  }

  const targets = [];
  for (let index = 0; index < count; index += 1) {
    targets.push(candidates[index % candidates.length]);
  }
  return targets;
}

function useMissilesAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const targets = findMissileTargets(targetPoint, PLAYER_MISSILE_COUNT);
  if (targets.length === 0) return false;

  const baseAngle = Math.atan2(targetPoint.y - player.y, targetPoint.x - player.x);
  for (let index = 0; index < PLAYER_MISSILE_COUNT; index += 1) {
    const target = targets[index];
    const spreadT = PLAYER_MISSILE_COUNT === 1 ? 0 : index / (PLAYER_MISSILE_COUNT - 1);
    const angle = baseAngle + (spreadT - 0.5) * PLAYER_MISSILE_SPAWN_SPREAD;
    homingMissiles.push({
      x: player.x,
      y: player.y,
      vx: Math.cos(angle) * PLAYER_MISSILE_SPEED,
      vy: Math.sin(angle) * PLAYER_MISSILE_SPEED,
      speed: PLAYER_MISSILE_SPEED,
      ttl: PLAYER_MISSILE_LIFETIME,
      life: PLAYER_MISSILE_LIFETIME,
      radius: 7,
      owner: "player",
      targetId: target?.id ?? null,
      color: "rgba(186, 255, 108, 0.96)",
      innerColor: "rgba(247, 255, 214, 0.96)",
    });
  }

  consumeAbilityCharge(selected.slot);
  return true;
}

function useSplitterAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return false;

  const baseAngle = Math.atan2(dy, dx);
  for (let index = 0; index < SPLITTER_PROJECTILE_COUNT; index += 1) {
    const spread = (index - 1) * 0.16;
    const angle = baseAngle + spread;
    zigzagProjectiles.push({
      x: player.x,
      y: player.y,
      prevX: player.x,
      prevY: player.y,
      baseX: player.x,
      baseY: player.y,
      dirX: Math.cos(angle),
      dirY: Math.sin(angle),
      perpX: -Math.sin(angle),
      perpY: Math.cos(angle),
      distance: 0,
      speed: SPLITTER_PROJECTILE_SPEED,
      ttl: SPLITTER_PROJECTILE_LIFETIME,
      life: SPLITTER_PROJECTILE_LIFETIME,
      radius: SPLITTER_PROJECTILE_RADIUS,
      amplitude: SPLITTER_PROJECTILE_AMPLITUDE * (0.72 + index * 0.22),
      frequency: SPLITTER_PROJECTILE_FREQUENCY * (0.88 + index * 0.14),
      phase: index * Math.PI * 0.72,
      owner: "player",
      hitEnemyIds: new Set(),
    });
  }

  consumeAbilityCharge(selected.slot);
  return true;
}

function useTripwireAbility(targetPoint = aimPoint) {
  const selected = getSelectedAbilityState();
  const dx = targetPoint.x - player.x;
  const dy = targetPoint.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) return false;

  const halfLength = getCellSize() * TRIPWIRE_LENGTH_CELLS * 0.5;
  const perpX = -dy / distance;
  const perpY = dx / distance;
  const minX = ARENA.x + TRIPWIRE_WIDTH;
  const maxX = ARENA.x + ARENA.width - TRIPWIRE_WIDTH;
  const minY = ARENA.y + TRIPWIRE_WIDTH;
  const maxY = ARENA.y + ARENA.height - TRIPWIRE_WIDTH;
  const x = clamp(targetPoint.x, minX, maxX);
  const y = clamp(targetPoint.y, minY, maxY);

  mines.push({
    id: mineId += 1,
    x,
    y,
    owner: "player",
    kind: "tripwire",
    ttl: TRIPWIRE_LIFETIME,
    radius: TRIPWIRE_WIDTH,
    halfLength,
    dirX: perpX,
    dirY: perpY,
    hitEnemyIds: new Set(),
    pulseSeed: Math.random() * Math.PI * 2,
  });
  consumeAbilityCharge(selected.slot);
  return true;
}

function useHookAbility() {
  if (playerHookCooldown > 0) return false;
  const target = findNearestHookTarget();
  if (!target) return false;

  activeHook = {
    enemyId: target.id,
    phase: "pull",
    tipX: target.x,
    tipY: target.y,
  };
  target.moving = false;
  target.vx = 0;
  target.vy = 0;
  target.restingFor = 0;
  target.moveTarget = null;
  target.phase = null;
  target.phaseTimer = 0;
  playerHookCooldown = getHookCooldown();
  return true;
}

function useTeleportAbility(targetPoint = aimPoint) {
  const half = player.size * 0.5;
  const targetX = clamp(targetPoint.x, ARENA.x + half, ARENA.x + ARENA.width - half);
  const targetY = clamp(targetPoint.y, ARENA.y + half, ARENA.y + ARENA.height - half);
  const distance = Math.hypot(targetX - player.x, targetY - player.y);
  if (distance < 2) return false;

  activePlayerTeleport = {
    targetX,
    targetY,
    timer: TELEPORT_CHARGE_TIME,
    duration: TELEPORT_CHARGE_TIME,
  };
  return true;
}

function activatePlayerMinePassive() {
  playerMinePassive = {
    remaining: PLAYER_MINE_PASSIVE_TOTAL,
    timer: PLAYER_MINE_PASSIVE_INTERVAL,
    interval: PLAYER_MINE_PASSIVE_INTERVAL,
  };
}

function activatePlayerDecoyPassive() {
  playerDecoyPassive = {
    remaining: PLAYER_DECOY_PASSIVE_TOTAL,
    timer: PLAYER_DECOY_PASSIVE_INTERVAL,
    interval: PLAYER_DECOY_PASSIVE_INTERVAL,
  };
}

function activatePlayerMirrorPassive() {
  playerMirrorPassive = {
    timer: PLAYER_MIRROR_PASSIVE_DURATION,
    duration: PLAYER_MIRROR_PASSIVE_DURATION,
  };
}

function spawnPlayerDecoyNearPlayer() {
  const angle = Math.random() * Math.PI * 2;
  const distance = randomRange(26, 64);
  const half = DECOY_SIZE * 0.5;
  const x = clamp(player.x + Math.cos(angle) * distance, ARENA.x + half, ARENA.x + ARENA.width - half);
  const y = clamp(player.y + Math.sin(angle) * distance, ARENA.y + half, ARENA.y + ARENA.height - half);

  activePlayerDecoys.push({
    x,
    y,
    timer: DECOY_DURATION,
    duration: DECOY_DURATION,
    size: DECOY_SIZE,
  });
}

function spawnMine(x, y, owner) {
  const minX = ARENA.x + MINE_RADIUS;
  const maxX = ARENA.x + ARENA.width - MINE_RADIUS;
  const minY = ARENA.y + MINE_RADIUS;
  const maxY = ARENA.y + ARENA.height - MINE_RADIUS;

  mines.push({
    id: mineId += 1,
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY),
    owner,
    ttl: MINE_LIFETIME,
    radius: MINE_RADIUS,
    pulseSeed: Math.random() * Math.PI * 2,
  });
}

function spawnBossTimedMine(x, y) {
  const minX = ARENA.x + MINE_RADIUS;
  const maxX = ARENA.x + ARENA.width - MINE_RADIUS;
  const minY = ARENA.y + MINE_RADIUS;
  const maxY = ARENA.y + ARENA.height - MINE_RADIUS;

  mines.push({
    id: mineId += 1,
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY),
    owner: "enemy",
    ttl: LEVEL2_BOSS_MINE_ARM_TIME,
    radius: MINE_RADIUS,
    pulseSeed: Math.random() * Math.PI * 2,
    explodeOnExpire: true,
    blastRadius: getCellSize() * LEVEL2_BOSS_MINE_BLAST_RADIUS_CELLS,
    blastSpeed: LEVEL2_BOSS_MINE_BLAST_SPEED,
  });
}

function detonateMine(mine) {
  blastWaves.push({
    owner: mine.owner,
    x: mine.x,
    y: mine.y,
    radius: 6,
    maxRadius: mine.blastRadius ?? getCellSize(),
    expandSpeed: mine.blastSpeed ?? LEVEL2_BOSS_MINE_BLAST_SPEED,
    hitEnemyIds: new Set(),
    hitPlayer: false,
  });
}

function updatePlayerMinePassive(dt) {
  if (!playerMinePassive) return;

  playerMinePassive.timer -= dt;
  while (playerMinePassive && playerMinePassive.timer <= 0 && playerMinePassive.remaining > 0) {
    spawnMine(player.x, player.y, "player");
    playerMinePassive.remaining -= 1;
    if (playerMinePassive.remaining <= 0) {
      playerMinePassive = null;
      return;
    }
    playerMinePassive.timer += playerMinePassive.interval;
  }
}

function updatePlayerDecoyPassive(dt) {
  if (!playerDecoyPassive) return;

  playerDecoyPassive.timer -= dt;
  while (playerDecoyPassive && playerDecoyPassive.timer <= 0 && playerDecoyPassive.remaining > 0) {
    spawnPlayerDecoyNearPlayer();
    playerDecoyPassive.remaining -= 1;
    if (playerDecoyPassive.remaining <= 0) {
      playerDecoyPassive = null;
      return;
    }
    playerDecoyPassive.timer += playerDecoyPassive.interval;
  }
}

function updatePlayerMirrorPassive(dt) {
  if (!playerMirrorPassive) return;

  playerMirrorPassive.timer -= dt;
  if (playerMirrorPassive.timer <= 0) {
    playerMirrorPassive = null;
  }
}

function tryUseAbilityFromClick(point) {
  if (player.dead) return false;
  if (
    player.moving ||
    activeHook ||
    activePlayerTeleport ||
    activePlayerLaser ||
    activePlayerSniper ||
    activePlayerSpray ||
    player.dragging
  ) {
    return false;
  }
  const selected = getSelectedAbilityState();
  const selectedAbility = selected.ability;

  if (selectedAbility.key === abilities.hook.key) {
    return useHookAbility();
  }

  const distanceToPlayer = Math.hypot(point.x - player.x, point.y - player.y);
  if (distanceToPlayer <= player.size * 0.5) return false;

  if (selectedAbility.key === abilities.teleport.key) {
    return useTeleportAbility(point);
  }

  if (selectedAbility.key === abilities.blast.key) {
    return useBlastAbility(point);
  }

  if (selectedAbility.key === abilities.pulse_bomb.key) {
    return usePulseBombAbility(point);
  }

  if (selectedAbility.key === abilities.sidearm.key) {
    return useBaseGunAbility(point);
  }

  if (selectedAbility.key === abilities.decoy.key) {
    return useDecoyAbility(point);
  }

  if (selectedAbility.key === abilities.missiles.key) {
    return useMissilesAbility(point);
  }

  if (selectedAbility.key === abilities.splitter.key) {
    return useSplitterAbility(point);
  }

  if (selectedAbility.key === abilities.tripwire.key) {
    return useTripwireAbility(point);
  }

  if (selectedAbility.key === abilities.laser.key) {
    useLaserAbility(point);
    return true;
  }

  if (selectedAbility.key === abilities.sniper.key) {
    return useSniperAbility(point);
  }

  if (selectedAbility.key === abilities.spray.key) {
    useSprayAbility(point);
    return true;
  }

  if (selectedAbility.key === abilities.shield.key) {
    return useShieldAbility();
  }

  return false;
}

function canStartKeyboardMove() {
  return (
    !player.dead &&
    !activeHook &&
    !activePlayerTeleport &&
    !activePlayerLaser &&
    !activePlayerSniper &&
    !activePlayerSpray &&
    !player.dragging
  );
}

function launchPlayerTowardPoint(point) {
  if (!canStartKeyboardMove()) return;

  const half = player.size * 0.5;
  const targetX = clamp(point.x, ARENA.x + half, ARENA.x + ARENA.width - half);
  const targetY = clamp(point.y, ARENA.y + half, ARENA.y + ARENA.height - half);
  const distance = Math.hypot(targetX - player.x, targetY - player.y);
  if (distance <= MOVE_STOP_DISTANCE) return;

  const wasMoving = player.moving;
  player.moveTarget = { x: targetX, y: targetY };
  moveMarker = {
    x: targetX,
    y: targetY,
    ttl: 0.8,
    life: 0.8,
  };
  player.moving = true;
  player.launched = true;
  player.restingFor = 0;
  if (!wasMoving) {
    trail.length = 0;
  }
}

function updateMoveMarker(dt) {
  if (!moveMarker) return;

  moveMarker.ttl -= dt;
  if (moveMarker.ttl <= 0) {
    moveMarker = null;
  }
}

function updateHook(dt) {
  if (!activeHook) return;

  const target = enemies.find((enemy) => enemy.id === activeHook.enemyId);
  if (!target) {
    activeHook = null;
    return;
  }

  const dx = player.x - target.x;
  const dy = player.y - target.y;
  const distance = Math.hypot(dx, dy);
  const pullSpeed = getCellSize() * HOOK_PULL_SPEED_CELLS;
  const step = Math.min(distance, pullSpeed * dt);

  if (distance > 0.001) {
    target.x += (dx / distance) * step;
    target.y += (dy / distance) * step;
  }

  activeHook.tipX = target.x;
  activeHook.tipY = target.y;

  if (distance <= player.size * 0.45 + target.size * 0.35) {
    stealEnemyAbility(target);
    activeHook = null;
    return;
  }
}

function updatePlayerTeleport(dt) {
  if (!activePlayerTeleport) return;

  activePlayerTeleport.timer -= dt;
  if (activePlayerTeleport.timer > 0) return;

  spawnImpactBurst(player.x, player.y, {
    count: 14,
    speedMin: 120,
    speedMax: 260,
    lifeMin: 0.14,
    lifeMax: 0.32,
    sizeMin: 3,
    sizeMax: 7,
  });

  player.x = activePlayerTeleport.targetX;
  player.y = activePlayerTeleport.targetY;
  player.vx = 0;
  player.vy = 0;
  player.moving = false;
  player.moveTarget = null;
  player.launched = true;
  moveMarker = null;
  trail.length = 0;

  spawnImpactBurst(player.x, player.y, {
    count: 18,
    speedMin: 140,
    speedMax: 300,
    lifeMin: 0.18,
    lifeMax: 0.36,
    sizeMin: 4,
    sizeMax: 8,
  });

  activePlayerTeleport = null;
}

function updatePlayerLaser(dt) {
  if (!activePlayerLaser) return;

  activePlayerLaser.timer -= dt;
  if (activePlayerLaser.timer > 0) return;

  firePlayerLaser(activePlayerLaser);
  activePlayerLaser = null;
}

function updatePlayerSniper(dt) {
  if (!activePlayerSniper) return;

  activePlayerSniper.timer -= dt;
  if (activePlayerSniper.timer > 0) return;

  firePlayerSniper(activePlayerSniper);
  activePlayerSniper = null;
}

function updatePlayerSpray(dt) {
  if (!activePlayerSpray) return;

  if (activePlayerSpray.phase === "charge") {
    activePlayerSpray.timer -= dt;
    if (activePlayerSpray.timer > 0) return;

    activePlayerSpray.phase = "fire";
    activePlayerSpray.shotTimer = 0;
  }

  activePlayerSpray.shotTimer -= dt;
  while (activePlayerSpray && activePlayerSpray.shotTimer <= 0 && activePlayerSpray.shotsRemaining > 0) {
    firePlayerSprayShot(activePlayerSpray);
    activePlayerSpray.shotsRemaining -= 1;
    if (activePlayerSpray.shotsRemaining <= 0) {
      consumeAbilityCharge(activePlayerSpray.slot);
      activePlayerSpray = null;
      return;
    }
    activePlayerSpray.shotTimer += SPRAY_SHOT_INTERVAL;
  }
}

function updateBaseProjectiles(dt) {
  for (let index = baseProjectiles.length - 1; index >= 0; index -= 1) {
    const projectile = baseProjectiles[index];
    projectile.ttl -= dt;
    if (projectile.ttl <= 0) {
      baseProjectiles.splice(index, 1);
      continue;
    }

    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;

    if (
      projectile.x < ARENA.x - 30 ||
      projectile.x > ARENA.x + ARENA.width + 30 ||
      projectile.y < ARENA.y - 30 ||
      projectile.y > ARENA.y + ARENA.height + 30
    ) {
      baseProjectiles.splice(index, 1);
      continue;
    }

    if (projectile.owner === "player" && hitEnemyHomingMissileAt(projectile.x, projectile.y, projectile.radius)) {
      baseProjectiles.splice(index, 1);
      continue;
    }

    if (projectile.owner === "enemy") {
      const tripwireHit = findTripwireOnSegment(projectile.x - projectile.vx * dt, projectile.y - projectile.vy * dt, projectile.x, projectile.y);
      if (tripwireHit && reflectProjectileFromTripwire(tripwireHit, projectile, "base")) {
        baseProjectiles.splice(index, 1);
        continue;
      }

      const hitDistance = player.size * 0.5 + projectile.radius;
      const distanceToPlayer = Math.hypot(projectile.x - player.x, projectile.y - player.y);
      if (distanceToPlayer <= hitDistance) {
        if (reflectProjectileFromPlayerMirror(projectile, "base")) {
          baseProjectiles.splice(index, 1);
          continue;
        }
        applyPlayerHit();
        baseProjectiles.splice(index, 1);
      }
      continue;
    }

    let reflectedByMirrorShield = false;
    for (const enemy of enemies) {
      if (enemy.kind !== "mirror" || enemy.phase !== "mirror_shield") continue;
      const shield = getMirrorShieldSegment(enemy);
      const distance = getPointSegmentDistance(projectile.x, projectile.y, shield.x1, shield.y1, shield.x2, shield.y2);
      if (distance > MIRROR_SHIELD_WIDTH + projectile.radius) continue;
      reflectProjectileFromMirror(enemy, projectile, "base");
      reflectedByMirrorShield = true;
      break;
    }
    if (reflectedByMirrorShield) {
      baseProjectiles.splice(index, 1);
      continue;
    }

    let absorbedByShield = false;
    for (const enemy of enemies) {
      if (!isAbsorbingShieldEnemy(enemy)) continue;
      const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
      if (distance > getEnemyShieldRadius(enemy) + projectile.radius) continue;
      absorbedByShield = true;
      break;
    }
    if (absorbedByShield) {
      baseProjectiles.splice(index, 1);
      continue;
    }

    let hitEnemy = null;
    for (const enemy of enemies) {
      const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
      if (distance > enemy.size * 0.7 + projectile.radius) continue;
      hitEnemy = enemy;
      break;
    }

    if (!hitEnemy) continue;

    if (reflectProjectileFromMirror(hitEnemy, projectile, "base")) {
      baseProjectiles.splice(index, 1);
      continue;
    }

    damageEnemy(hitEnemy, 1);
    baseProjectiles.splice(index, 1);
  }
}

function updateZigzagProjectiles(dt) {
  for (let index = zigzagProjectiles.length - 1; index >= 0; index -= 1) {
    const projectile = zigzagProjectiles[index];
    projectile.ttl -= dt;
    if (projectile.ttl <= 0) {
      zigzagProjectiles.splice(index, 1);
      continue;
    }

    projectile.distance += projectile.speed * dt;
    projectile.prevX = projectile.x;
    projectile.prevY = projectile.y;
    const wave = Math.sin(projectile.distance * 0.035 * projectile.frequency + projectile.phase) * projectile.amplitude;
    projectile.x = projectile.baseX + projectile.dirX * projectile.distance + projectile.perpX * wave;
    projectile.y = projectile.baseY + projectile.dirY * projectile.distance + projectile.perpY * wave;

    if (
      projectile.x < ARENA.x - 40 ||
      projectile.x > ARENA.x + ARENA.width + 40 ||
      projectile.y < ARENA.y - 40 ||
      projectile.y > ARENA.y + ARENA.height + 40
    ) {
      zigzagProjectiles.splice(index, 1);
      continue;
    }

    if (hitEnemyHomingMissileOnSegment(projectile.prevX, projectile.prevY, projectile.x, projectile.y, projectile.radius)) {
      zigzagProjectiles.splice(index, 1);
      continue;
    }

    const shieldHit = findMirrorShieldOnSegment(projectile.prevX, projectile.prevY, projectile.x, projectile.y);
    if (shieldHit && reflectProjectileFromMirror(shieldHit.enemy, projectile, "laser")) {
      zigzagProjectiles.splice(index, 1);
      continue;
    }

    for (const enemy of enemies) {
      if (projectile.hitEnemyIds.has(enemy.id) || enemy.isIllusion) continue;
      if (isAbsorbingShieldEnemy(enemy)) {
        const shieldDistance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
        if (shieldDistance <= getEnemyShieldRadius(enemy) + projectile.radius) {
          zigzagProjectiles.splice(index, 1);
          break;
        }
      }
      const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
      if (distance > enemy.size * 0.65 + projectile.radius) continue;

      damageEnemy(enemy, 1);
      projectile.hitEnemyIds.add(enemy.id);
      spawnImpactBurst(projectile.x, projectile.y, {
        count: 8,
        speedMin: 70,
        speedMax: 180,
        lifeMin: 0.12,
        lifeMax: 0.24,
        sizeMin: 2,
        sizeMax: 5,
      });
      break;
    }
  }
}

function updatePlayerShield(dt) {
  if (!activePlayerShield) return;

  activePlayerShield.timer -= dt;
  if (activePlayerShield.timer <= 0) {
    activePlayerShield = null;
  }
}

function updatePlayerDecoy(dt) {
  for (let index = activePlayerDecoys.length - 1; index >= 0; index -= 1) {
    const decoy = activePlayerDecoys[index];
    decoy.timer -= dt;
    if (decoy.timer <= 0) {
      activePlayerDecoys.splice(index, 1);
    }
  }
}

function triggerPulseBombExplosion(bomb) {
  const offsetRadius = getCellSize() * PULSE_BOMB_OFFSET_CELLS;
  const angle = Math.random() * Math.PI * 2;
  const distance = randomRange(0, offsetRadius);
  const x = clamp(bomb.x + Math.cos(angle) * distance, ARENA.x + 8, ARENA.x + ARENA.width - 8);
  const y = clamp(bomb.y + Math.sin(angle) * distance, ARENA.y + 8, ARENA.y + ARENA.height - 8);

  spawnImpactBurst(x, y, {
    count: 18,
    speedMin: 90,
    speedMax: 260,
    lifeMin: 0.14,
    lifeMax: 0.34,
    sizeMin: 3,
    sizeMax: 8,
    outerColor: [255, 72, 34],
    midColor: [255, 143, 53],
    innerColor: [255, 246, 214],
  });
  spawnBlastWave(x, y, {
    owner: "player",
    radius: 8,
    maxRadius: BOMBER_BLAST_MAX_RADIUS,
    expandSpeed: BOMBER_BLAST_EXPAND_SPEED,
  });
}

function updatePulseBombs(dt) {
  for (let index = activePulseBombs.length - 1; index >= 0; index -= 1) {
    const bomb = activePulseBombs[index];
    bomb.timer -= dt;

    while (bomb.timer <= 0 && bomb.remaining > 0) {
      triggerPulseBombExplosion(bomb);
      bomb.remaining -= 1;
      bomb.timer += bomb.interval;
    }

    if (bomb.remaining <= 0) {
      activePulseBombs.splice(index, 1);
    }
  }
}

function updateBlastWaves(dt) {
  for (let index = blastWaves.length - 1; index >= 0; index -= 1) {
    const blast = blastWaves[index];
    if (!blast) continue;

    blast.radius = Math.min(blast.maxRadius, blast.radius + blast.expandSpeed * dt);

    if (blast.owner !== "enemy") {
      for (let missileIndex = enemyHomingMissiles.length - 1; missileIndex >= 0; missileIndex -= 1) {
        const missile = enemyHomingMissiles[missileIndex];
        const missileDistance = Math.hypot(missile.x - blast.x, missile.y - blast.y);
        if (missileDistance <= blast.radius + missile.radius) {
          destroyEnemyHomingMissile(missileIndex);
        }
      }

      for (const enemy of enemies) {
        if (blast.hitEnemyIds.has(enemy.id)) continue;
        const distance = Math.hypot(enemy.x - blast.x, enemy.y - blast.y);
        if (distance > blast.radius + enemy.size * 0.5) continue;

        damageEnemy(enemy, 1);
        blast.hitEnemyIds.add(enemy.id);
      }
    }

    if (blast.owner !== "player" && !blast.hitPlayer) {
      const distanceToPlayer = Math.hypot(player.x - blast.x, player.y - blast.y);
      if (distanceToPlayer <= blast.radius + player.size * 0.45) {
        applyPlayerHit();
        if (player.dead) return;
        blast.hitPlayer = true;
      }
    }

    if (blast.radius >= blast.maxRadius) {
      blastWaves.splice(index, 1);
    }
  }
}

function updateBeamEffects(dt) {
  for (let index = beamEffects.length - 1; index >= 0; index -= 1) {
    const beam = beamEffects[index];
    beam.ttl -= dt;
    if (beam.ttl <= 0) {
      beamEffects.splice(index, 1);
    }
  }
}

function updateEnemySeeds(dt) {
  for (let index = enemySeeds.length - 1; index >= 0; index -= 1) {
    const seed = enemySeeds[index];
    seed.timer -= dt;
    if (seed.timer > 0) continue;

    spawnImpactBurst(seed.x, seed.y, {
      count: 10,
      speedMin: 70,
      speedMax: 160,
      lifeMin: 0.12,
      lifeMax: 0.26,
      sizeMin: 2,
      sizeMax: 5,
    });

    spawnSproutling(seed.x, seed.y);
    enemySeeds.splice(index, 1);
  }
}

function findNearestMissileTarget(x, y) {
  let bestTarget = null;
  let bestDistance = Infinity;

  for (const enemy of enemies) {
    if (enemy.isIllusion) continue;
    const distance = Math.hypot(enemy.x - x, enemy.y - y);
    if (distance >= bestDistance) continue;
    bestDistance = distance;
    bestTarget = enemy;
  }

  return bestTarget;
}

function updateHomingMissiles(dt) {
  for (let index = homingMissiles.length - 1; index >= 0; index -= 1) {
    const missile = homingMissiles[index];
    missile.ttl -= dt;
    if (missile.ttl <= 0) {
      homingMissiles.splice(index, 1);
      continue;
    }

    let target = enemies.find((enemy) => enemy.id === missile.targetId);
    if (!target) {
      target = findNearestMissileTarget(missile.x, missile.y);
      missile.targetId = target?.id ?? null;
    }

    if (target) {
      const dx = target.x - missile.x;
      const dy = target.y - missile.y;
      const distance = Math.hypot(dx, dy) || 1;
      const desiredX = dx / distance;
      const desiredY = dy / distance;
      const currentAngle = Math.atan2(missile.vy, missile.vx);
      const desiredAngle = Math.atan2(desiredY, desiredX);
      let delta = desiredAngle - currentAngle;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      const nextAngle = currentAngle + clamp(delta, -PLAYER_MISSILE_TURN_RATE * dt, PLAYER_MISSILE_TURN_RATE * dt);

      missile.speed = Math.min(
        PLAYER_MISSILE_SPEED * 1.5,
        missile.speed + PLAYER_MISSILE_ACCELERATION * dt
      );
      missile.vx = Math.cos(nextAngle) * missile.speed;
      missile.vy = Math.sin(nextAngle) * missile.speed;
    }

    missile.x += missile.vx * dt;
    missile.y += missile.vy * dt;

    if (
      missile.x < ARENA.x - 40 ||
      missile.x > ARENA.x + ARENA.width + 40 ||
      missile.y < ARENA.y - 40 ||
      missile.y > ARENA.y + ARENA.height + 40
    ) {
      homingMissiles.splice(index, 1);
      continue;
    }

    if (hitEnemyHomingMissileAt(missile.x, missile.y, missile.radius)) {
      homingMissiles.splice(index, 1);
      continue;
    }

    const shieldHit = findMirrorShieldOnSegment(missile.x - missile.vx * dt, missile.y - missile.vy * dt, missile.x, missile.y);
    if (shieldHit && reflectProjectileFromMirror(shieldHit.enemy, missile, "laser")) {
      spawnImpactBurst(missile.x, missile.y, {
        count: 10,
        speedMin: 80,
        speedMax: 190,
        lifeMin: 0.12,
        lifeMax: 0.26,
        sizeMin: 2,
        sizeMax: 5,
      });
      homingMissiles.splice(index, 1);
      continue;
    }

    let hitEnemy = null;
    for (const enemy of enemies) {
      if (enemy.isIllusion) continue;
      if (isAbsorbingShieldEnemy(enemy)) {
        const shieldDistance = Math.hypot(enemy.x - missile.x, enemy.y - missile.y);
        if (shieldDistance <= getEnemyShieldRadius(enemy) + missile.radius) {
          hitEnemy = { absorbedByShield: true };
          break;
        }
      }
      const distance = Math.hypot(enemy.x - missile.x, enemy.y - missile.y);
      if (distance > enemy.size * 0.65 + missile.radius) continue;
      hitEnemy = enemy;
      break;
    }

    if (!hitEnemy) continue;

    if (!hitEnemy.absorbedByShield) {
      damageEnemy(hitEnemy, 1);
    }
    spawnImpactBurst(missile.x, missile.y, {
      count: 12,
      speedMin: 80,
      speedMax: 220,
      lifeMin: 0.14,
      lifeMax: 0.3,
      sizeMin: 2,
      sizeMax: 6,
    });
    homingMissiles.splice(index, 1);
  }
}

function updateEnemyHomingMissiles(dt) {
  for (let index = enemyHomingMissiles.length - 1; index >= 0; index -= 1) {
    const missile = enemyHomingMissiles[index];
    if (!missile.permanent) {
      missile.ttl -= dt;
    }
    if (!missile.permanent && missile.ttl <= 0) {
      enemyHomingMissiles.splice(index, 1);
      continue;
    }

    const target = getEnemyMissileTarget(missile);
    if (target) {
      const dx = target.x - missile.x;
      const dy = target.y - missile.y;
      const distance = Math.hypot(dx, dy) || 1;
      const currentAngle = Math.atan2(missile.vy, missile.vx);
      const desiredAngle = Math.atan2(dy / distance, dx / distance);
      let delta = desiredAngle - currentAngle;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      const nextAngle = currentAngle + clamp(delta, -LEVEL3_BOSS_MISSILE_TURN_RATE * dt, LEVEL3_BOSS_MISSILE_TURN_RATE * dt);
      missile.speed = Math.min(missile.maxSpeed ?? LEVEL3_BOSS_MISSILE_SPEED * 1.8, missile.speed + (missile.acceleration ?? LEVEL3_BOSS_MISSILE_ACCELERATION) * dt);
      missile.vx = Math.cos(nextAngle) * missile.speed;
      missile.vy = Math.sin(nextAngle) * missile.speed;
    }

    missile.x += missile.vx * dt;
    missile.y += missile.vy * dt;

    if (!missile.permanent && (
      missile.x < ARENA.x - 40 ||
      missile.x > ARENA.x + ARENA.width + 40 ||
      missile.y < ARENA.y - 40 ||
      missile.y > ARENA.y + ARENA.height + 40
    )) {
      enemyHomingMissiles.splice(index, 1);
      continue;
    }

    const tripwireHit = findTripwireOnSegment(missile.x - missile.vx * dt, missile.y - missile.vy * dt, missile.x, missile.y);
    if (tripwireHit && reflectProjectileFromTripwire(tripwireHit, missile, "missile")) {
      destroyEnemyHomingMissile(index);
      continue;
    }

    let hitDecoyIndex = -1;
    for (let decoyIndex = 0; decoyIndex < activePlayerDecoys.length; decoyIndex += 1) {
      const decoy = activePlayerDecoys[decoyIndex];
      if (Math.hypot(missile.x - decoy.x, missile.y - decoy.y) <= missile.radius + decoy.size * 0.65) {
        hitDecoyIndex = decoyIndex;
        break;
      }
    }
    if (hitDecoyIndex !== -1) {
      activePlayerDecoys.splice(hitDecoyIndex, 1);
      destroyEnemyHomingMissile(index);
      continue;
    }

    if (Math.hypot(missile.x - player.x, missile.y - player.y) <= missile.radius + player.size * 0.5) {
      if (!reflectProjectileFromPlayerMirror(missile, "laser")) {
        applyPlayerHit();
      }
      destroyEnemyHomingMissile(index);
    }
  }
}

function getEnemyMissileTarget(missile) {
  let bestTarget = { x: player.x, y: player.y };
  let bestDistance = Math.hypot(missile.x - player.x, missile.y - player.y);
  for (const decoy of activePlayerDecoys) {
    const distance = Math.hypot(missile.x - decoy.x, missile.y - decoy.y);
    if (distance >= bestDistance) continue;
    bestDistance = distance;
    bestTarget = decoy;
  }
  return bestTarget;
}

function destroyEnemyHomingMissile(index) {
  const missile = enemyHomingMissiles[index];
  if (missile) {
    spawnImpactBurst(missile.x, missile.y, {
      count: 10,
      speedMin: 80,
      speedMax: 210,
      lifeMin: 0.12,
      lifeMax: 0.28,
      sizeMin: 2,
      sizeMax: 6,
    });
  }
  enemyHomingMissiles.splice(index, 1);
}

function hitEnemyHomingMissileAt(x, y, radius) {
  for (let index = enemyHomingMissiles.length - 1; index >= 0; index -= 1) {
    const missile = enemyHomingMissiles[index];
    if (Math.hypot(missile.x - x, missile.y - y) > missile.radius + radius) continue;
    destroyEnemyHomingMissile(index);
    return true;
  }
  return false;
}

function hitEnemyHomingMissileOnSegment(fromX, fromY, toX, toY, radius = 0) {
  let bestIndex = -1;
  let bestDistance = Infinity;
  for (let index = 0; index < enemyHomingMissiles.length; index += 1) {
    const missile = enemyHomingMissiles[index];
    const distance = getPointSegmentDistance(missile.x, missile.y, fromX, fromY, toX, toY);
    if (distance > missile.radius + radius || distance >= bestDistance) continue;
    bestDistance = distance;
    bestIndex = index;
  }
  if (bestIndex === -1) return false;
  destroyEnemyHomingMissile(bestIndex);
  return true;
}

function updateShieldAuras(dt) {
  if (activePlayerShield) {
    for (let index = enemies.length - 1; index >= 0; index -= 1) {
      const enemy = enemies[index];
      const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      if (distance <= activePlayerShield.radius + enemy.size * 0.4) {
        if (isBossEnemy(enemy)) {
          if (!activePlayerShield.damagedBossIds.has(enemy.id)) {
            activePlayerShield.damagedBossIds.add(enemy.id);
            damageEnemy(enemy, PLAYER_SHIELD_BOSS_DAMAGE);
          }
        } else {
          damageEnemy(enemy, enemy.hp);
        }
      }
    }

    for (let index = mines.length - 1; index >= 0; index -= 1) {
      const mine = mines[index];
      if (mine.owner !== "enemy") continue;
      const distance = Math.hypot(mine.x - player.x, mine.y - player.y);
      if (distance <= activePlayerShield.radius + mine.radius * 0.8) {
        mines.splice(index, 1);
      }
    }

    for (let index = enemyHomingMissiles.length - 1; index >= 0; index -= 1) {
      const missile = enemyHomingMissiles[index];
      const distance = Math.hypot(missile.x - player.x, missile.y - player.y);
      if (distance <= activePlayerShield.radius + missile.radius) {
        destroyEnemyHomingMissile(index);
      }
    }
  }

  for (const enemy of enemies) {
    if (!isAbsorbingShieldEnemy(enemy)) continue;
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance <= getEnemyShieldRadius(enemy) + player.size * 0.45) {
      applyPlayerHit(isBossEnemy(enemy) ? player.maxHp : 1, { ignoreInvuln: isBossEnemy(enemy) });
    }
  }

  for (const enemy of enemies) {
    if (enemy.kind !== "mirror" || enemy.phase !== "mirror_shield") continue;
    const shield = getMirrorShieldSegment(enemy);
    const distance = getPointSegmentDistance(player.x, player.y, shield.x1, shield.y1, shield.x2, shield.y2);
    if (distance <= player.size * 0.45 + MIRROR_SHIELD_WIDTH) {
      applyPlayerHit();
    }
  }

  for (let index = laserProjectiles.length - 1; index >= 0; index -= 1) {
    const projectile = laserProjectiles[index];
    const tail = getProjectileTail(projectile);
    let destroyProjectile = false;

    if (activePlayerShield && projectile.owner !== "player") {
      const hit = getSegmentCircleHit(
        tail.x,
        tail.y,
        projectile.x,
        projectile.y,
        player.x,
        player.y,
        activePlayerShield.radius
      );
      if (hit) {
        destroyProjectile = true;
      }
    }

    if (!destroyProjectile) {
      for (const enemy of enemies) {
        if (!isAbsorbingShieldEnemy(enemy)) continue;
        const hit = getSegmentCircleHit(
          tail.x,
          tail.y,
          projectile.x,
          projectile.y,
          enemy.x,
          enemy.y,
          getEnemyShieldRadius(enemy)
        );
        if (hit) {
          destroyProjectile = true;
          break;
        }
      }
    }

    if (destroyProjectile) {
      laserProjectiles.splice(index, 1);
    }
  }
}

function resolveEnemyCollisions() {
  for (let index = enemies.length - 1; index >= 0; index -= 1) {
    const enemy = enemies[index];
    if (activeHook && activeHook.enemyId === enemy.id) continue;
    if (enemy.kind === "slow") continue;
    if (enemy.isIllusion) continue;

    const collisionDistance = player.size * 0.5 + enemy.size * 0.6;
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance > collisionDistance) continue;

    applyPlayerHit(isBossEnemy(enemy) && isBossShieldActive(enemy) ? player.maxHp : 1, { ignoreInvuln: isBossEnemy(enemy) && isBossShieldActive(enemy) });
    if (isBossEnemy(enemy)) continue;
    killEnemy(enemy);
  }
}

function updateMines(dt) {
  for (let index = mines.length - 1; index >= 0; index -= 1) {
    const mine = mines[index];
    if (!mine) continue;

    mine.ttl -= dt;
    if (mine.ttl <= 0) {
      if (mine.explodeOnExpire) detonateMine(mine);
      mines.splice(index, 1);
      continue;
    }

    if (mine.kind === "tripwire") {
      const segment = getTripwireSegment(mine);
      for (const enemy of enemies) {
        if (enemy.isIllusion) continue;
        if (mine.hitEnemyIds?.has(enemy.id)) continue;
        const distanceToEnemy = getPointSegmentDistance(enemy.x, enemy.y, segment.x1, segment.y1, segment.x2, segment.y2);
        if (distanceToEnemy > enemy.size * 0.6 + TRIPWIRE_WIDTH) continue;

        damageEnemy(enemy, TRIPWIRE_DAMAGE);
        mine.hitEnemyIds?.add(enemy.id);
        spawnImpactBurst(enemy.x, enemy.y, {
          count: 8,
          speedMin: 80,
          speedMax: 180,
          lifeMin: 0.12,
          lifeMax: 0.24,
          sizeMin: 2,
          sizeMax: 5,
        });
      }
      continue;
    }

    if (mine.owner === "enemy") {
      const hitDistance = player.size * 0.5 + mine.radius * 0.7;
      const distanceToPlayer = Math.hypot(mine.x - player.x, mine.y - player.y);
      if (distanceToPlayer <= hitDistance) {
        applyPlayerHit();
        if (player.dead) return;
        mines.splice(index, 1);
      }
      continue;
    }

    let detonated = false;
    for (const enemy of enemies) {
      const hitDistance = enemy.size * 0.6 + mine.radius * 0.72;
      const distanceToEnemy = Math.hypot(mine.x - enemy.x, mine.y - enemy.y);
      if (distanceToEnemy > hitDistance) continue;

      damageEnemy(enemy, 1);
      mines.splice(index, 1);
      detonated = true;
      break;
    }

    if (detonated) {
      continue;
    }
  }
}

function firePlayerLaser(config) {
  spawnLaserProjectile({
    owner: "player",
    x: player.x,
    y: player.y,
    dirX: config.dirX,
    dirY: config.dirY,
    range: getLaserRange(),
    color: "rgba(105, 226, 255, 0.96)",
    width: LASER_PROJECTILE_WIDTH,
    speed: LASER_PROJECTILE_SPEED * PLAYER_STOLEN_LASER_SPEED_MULTIPLIER,
  });
  consumeAbilityCharge(config.slot);
}

function firePlayerSniper(config) {
  const reach = getArenaProjectileReach();
  const endX = player.x + config.dirX * reach;
  const endY = player.y + config.dirY * reach;

  beamEffects.push({
    fromX: player.x,
    fromY: player.y,
    toX: endX,
    toY: endY,
    color: "rgba(150, 24, 40, 0.94)",
    innerColor: "rgba(255, 240, 244, 0.95)",
    width: 8,
    ttl: 0.14,
    life: 0.14,
  });

  const shieldHit = findMirrorShieldOnSegment(player.x, player.y, endX, endY);
  if (shieldHit) {
    const shield = getMirrorShieldSegment(shieldHit.enemy);
    spawnLaserProjectile({
      owner: "enemy",
      x: shield.centerX,
      y: shield.centerY,
      dirX: -config.dirX,
      dirY: -config.dirY,
      range: getCellSize() * LASER_RANGE_CELLS,
      color: "rgba(201, 243, 255, 0.94)",
      width: LASER_PROJECTILE_WIDTH - 1,
    });
    consumeAbilityCharge(config.slot);
    return;
  }

  const hits = findEnemiesOnBeam(player.x, player.y, endX, endY);
  for (const hit of hits) {
    damageEnemy(hit.enemy, 1);
  }

  consumeAbilityCharge(config.slot);
}

function firePlayerSprayShot(config) {
  spawnSprayProjectile({
    owner: "player",
    x: player.x,
    y: player.y,
    dirX: config.dirX,
    dirY: config.dirY,
    range: Infinity,
    color: "rgba(198, 118, 255, 0.96)",
    width: LASER_PROJECTILE_WIDTH - 1,
  });
}

function fireEnemyLaser(enemy) {
  const dx = enemy.aimX - enemy.x;
  const dy = enemy.aimY - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;
  const dirX = dx / distance;
  const dirY = dy / distance;
  const enemyLaserRange = getCellSize() * LASER_RANGE_CELLS;
  spawnLaserProjectile({
    owner: "enemy",
    x: enemy.x,
    y: enemy.y,
    dirX,
    dirY,
    range: enemyLaserRange,
    color: "rgba(255, 86, 104, 0.94)",
    width: LASER_PROJECTILE_WIDTH - 1,
  });
}

function fireEnemySniper(enemy) {
  const dx = enemy.aimX - enemy.x;
  const dy = enemy.aimY - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;
  const dirX = dx / distance;
  const dirY = dy / distance;
  const reach = getArenaProjectileReach();
  const endX = enemy.x + dirX * reach;
  const endY = enemy.y + dirY * reach;

  beamEffects.push({
    fromX: enemy.x,
    fromY: enemy.y,
    toX: endX,
    toY: endY,
    color: "rgba(132, 12, 28, 0.96)",
    innerColor: "rgba(255, 228, 236, 0.96)",
    width: 7,
    ttl: 0.14,
    life: 0.14,
  });

  let bestDecoyIndex = -1;
  let bestDecoyT = Infinity;
  for (let index = 0; index < activePlayerDecoys.length; index += 1) {
    const decoy = activePlayerDecoys[index];
    const decoyHit = getSegmentCircleHit(enemy.x, enemy.y, endX, endY, decoy.x, decoy.y, decoy.size * 0.65);
    if (!decoyHit || decoyHit.t >= bestDecoyT) continue;
    bestDecoyIndex = index;
    bestDecoyT = decoyHit.t;
  }
  if (bestDecoyIndex !== -1) {
    activePlayerDecoys.splice(bestDecoyIndex, 1);
    return;
  }

  const playerHit = getSegmentCircleHit(enemy.x, enemy.y, endX, endY, player.x, player.y, player.size * 0.55);
  if (playerHit) {
    applyPlayerHit();
  }
}

function fireEnemySprayShot(enemy) {
  const dx = enemy.aimX - enemy.x;
  const dy = enemy.aimY - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;
  const dirX = dx / distance;
  const dirY = dy / distance;
  spawnSprayProjectile({
    owner: "enemy",
    x: enemy.x,
    y: enemy.y,
    dirX,
    dirY,
    range: Infinity,
    color: "rgba(198, 96, 255, 0.94)",
    width: LASER_PROJECTILE_WIDTH - 2,
  });
}

function spawnSprayProjectile({ owner, x, y, dirX, dirY, range, color, width }) {
  const centerAngle = Math.atan2(dirY, dirX);
  const randomOffset = randomRange(-SPRAY_RANDOM_SPREAD * 0.5, SPRAY_RANDOM_SPREAD * 0.5);
  const angle = centerAngle + randomOffset;
  spawnLaserProjectile({
    owner,
    x,
    y,
    dirX: Math.cos(angle),
    dirY: Math.sin(angle),
    range,
    color,
    width,
  });
}

function spawnLaserProjectile({ owner, x, y, dirX, dirY, range, color, width, speed = LASER_PROJECTILE_SPEED }) {
  laserProjectiles.push({
    owner,
    x,
    y,
    prevX: x,
    prevY: y,
    dirX,
    dirY,
    traveled: 0,
    range,
    speed,
    color,
    width,
    length: LASER_PROJECTILE_LENGTH,
    sourceX: x,
    sourceY: y,
    bounces: 0,
  });
}

function getPointSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return Math.hypot(px - x1, py - y1);
  const t = clamp(((px - x1) * dx + (py - y1) * dy) / lengthSq, 0, 1);
  return Math.hypot(px - (x1 + dx * t), py - (y1 + dy * t));
}

function getSegmentDistance(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
  const cross1 = (a2x - a1x) * (b1y - a1y) - (a2y - a1y) * (b1x - a1x);
  const cross2 = (a2x - a1x) * (b2y - a1y) - (a2y - a1y) * (b2x - a1x);
  const cross3 = (b2x - b1x) * (a1y - b1y) - (b2y - b1y) * (a1x - b1x);
  const cross4 = (b2x - b1x) * (a2y - b1y) - (b2y - b1y) * (a2x - b1x);
  if (cross1 * cross2 <= 0 && cross3 * cross4 <= 0) return 0;

  return Math.min(
    getPointSegmentDistance(a1x, a1y, b1x, b1y, b2x, b2y),
    getPointSegmentDistance(a2x, a2y, b1x, b1y, b2x, b2y),
    getPointSegmentDistance(b1x, b1y, a1x, a1y, a2x, a2y),
    getPointSegmentDistance(b2x, b2y, a1x, a1y, a2x, a2y)
  );
}

function getMirrorShieldSegment(enemy) {
  const dirX = enemy.mirrorDirX || 1;
  const dirY = enemy.mirrorDirY || 0;
  const perpX = -dirY;
  const perpY = dirX;
  const halfLength = getCellSize() * MIRROR_SHIELD_LENGTH_CELLS * 0.5;
  const centerX = enemy.x + dirX * MIRROR_SHIELD_FORWARD_OFFSET;
  const centerY = enemy.y + dirY * MIRROR_SHIELD_FORWARD_OFFSET;

  return {
    x1: centerX - perpX * halfLength,
    y1: centerY - perpY * halfLength,
    x2: centerX + perpX * halfLength,
    y2: centerY + perpY * halfLength,
    centerX,
    centerY,
  };
}

function getTripwireSegment(tripwire) {
  return {
    x1: tripwire.x - tripwire.dirX * tripwire.halfLength,
    y1: tripwire.y - tripwire.dirY * tripwire.halfLength,
    x2: tripwire.x + tripwire.dirX * tripwire.halfLength,
    y2: tripwire.y + tripwire.dirY * tripwire.halfLength,
    centerX: tripwire.x,
    centerY: tripwire.y,
  };
}

function findTripwireOnSegment(fromX, fromY, toX, toY) {
  let best = null;

  for (const mine of mines) {
    if (mine.kind !== "tripwire" || mine.owner !== "player") continue;
    const segment = getTripwireSegment(mine);
    const distance = getSegmentDistance(fromX, fromY, toX, toY, segment.x1, segment.y1, segment.x2, segment.y2);
    if (distance > TRIPWIRE_WIDTH) continue;

    const hit = getSegmentCircleHit(fromX, fromY, toX, toY, segment.centerX, segment.centerY, mine.halfLength + TRIPWIRE_WIDTH);
    const t = hit?.t ?? 0;
    if (best && t >= best.t) continue;
    best = { tripwire: mine, segment, t };
  }

  return best;
}

function findMirrorShieldOnSegment(fromX, fromY, toX, toY) {
  let best = null;

  for (const enemy of enemies) {
    if (enemy.kind !== "mirror" || enemy.phase !== "mirror_shield") continue;
    const shield = getMirrorShieldSegment(enemy);
    const distance = getSegmentDistance(fromX, fromY, toX, toY, shield.x1, shield.y1, shield.x2, shield.y2);
    if (distance > MIRROR_SHIELD_WIDTH) continue;

    const hit = getSegmentCircleHit(fromX, fromY, toX, toY, shield.centerX, shield.centerY, getCellSize() * MIRROR_SHIELD_LENGTH_CELLS);
    const t = hit?.t ?? 0;
    if (best && t >= best.t) continue;
    best = { enemy, t };
  }

  return best;
}

function reflectProjectileFromTripwire(hit, projectile, type = "laser") {
  if (!hit || projectile.owner !== "enemy") return false;

  const speed = Math.hypot(projectile.vx ?? 0, projectile.vy ?? 0) || projectile.speed || LASER_PROJECTILE_SPEED;
  const fallbackDirX = (projectile.vx ?? 0) / speed;
  const fallbackDirY = (projectile.vy ?? 0) / speed;
  const incomingDirX = projectile.dirX ?? (fallbackDirX || 1);
  const incomingDirY = projectile.dirY ?? fallbackDirY;
  const dirX = -incomingDirX;
  const dirY = -incomingDirY;
  const spawnX = hit.segment.centerX + dirX * TRIPWIRE_WIDTH;
  const spawnY = hit.segment.centerY + dirY * TRIPWIRE_WIDTH;

  spawnImpactBurst(hit.segment.centerX, hit.segment.centerY, {
    count: 10,
    speedMin: 90,
    speedMax: 210,
    lifeMin: 0.12,
    lifeMax: 0.26,
    sizeMin: 2,
    sizeMax: 5,
  });

  if (type === "base") {
    baseProjectiles.push({
      owner: "player",
      x: spawnX,
      y: spawnY,
      vx: dirX * BASE_GUN_PROJECTILE_SPEED,
      vy: dirY * BASE_GUN_PROJECTILE_SPEED,
      radius: BASE_GUN_PROJECTILE_RADIUS,
      ttl: BASE_GUN_PROJECTILE_LIFETIME,
      life: BASE_GUN_PROJECTILE_LIFETIME,
      color: "rgba(201, 243, 255, 0.94)",
      innerColor: "rgba(255, 255, 255, 0.96)",
    });
    return true;
  }

  if (type === "missile") {
    const target = findNearestMissileTarget(spawnX, spawnY);
    homingMissiles.push({
      x: spawnX,
      y: spawnY,
      vx: dirX * PLAYER_MISSILE_SPEED,
      vy: dirY * PLAYER_MISSILE_SPEED,
      speed: PLAYER_MISSILE_SPEED,
      ttl: PLAYER_MISSILE_LIFETIME,
      life: PLAYER_MISSILE_LIFETIME,
      radius: 7,
      owner: "player",
      targetId: target?.id ?? null,
      color: "rgba(201, 243, 255, 0.96)",
      innerColor: "rgba(247, 255, 255, 0.96)",
    });
    return true;
  }

  spawnLaserProjectile({
    owner: "player",
    x: spawnX,
    y: spawnY,
    dirX,
    dirY,
    range: getLaserRange(),
    color: "rgba(201, 243, 255, 0.94)",
    width: LASER_PROJECTILE_WIDTH,
    speed: LASER_PROJECTILE_SPEED * PLAYER_STOLEN_LASER_SPEED_MULTIPLIER,
  });
  return true;
}

function reflectProjectileFromMirror(enemy, projectile, type = "laser") {
  if (enemy.kind !== "mirror" || enemy.phase !== "mirror_shield" || projectile.owner !== "player") return false;

  const shield = getMirrorShieldSegment(enemy);
  const dx = projectile.x - shield.centerX;
  const dy = projectile.y - shield.centerY;
  const distance = Math.hypot(dx, dy) || 1;
  const dirX = dx / distance;
  const dirY = dy / distance;

  spawnImpactBurst(shield.centerX, shield.centerY, {
    count: 12,
    speedMin: 90,
    speedMax: 210,
    lifeMin: 0.14,
    lifeMax: 0.28,
    sizeMin: 2,
    sizeMax: 5,
  });

  if (type === "base") {
    baseProjectiles.push({
      owner: "enemy",
      x: shield.centerX + dirX * MIRROR_SHIELD_WIDTH,
      y: shield.centerY + dirY * MIRROR_SHIELD_WIDTH,
      vx: dirX * BASE_GUN_PROJECTILE_SPEED,
      vy: dirY * BASE_GUN_PROJECTILE_SPEED,
      radius: BASE_GUN_PROJECTILE_RADIUS,
      ttl: BASE_GUN_PROJECTILE_LIFETIME,
      life: BASE_GUN_PROJECTILE_LIFETIME,
      color: "rgba(201, 243, 255, 0.94)",
      innerColor: "rgba(255, 255, 255, 0.96)",
    });
    return true;
  }

  spawnLaserProjectile({
    owner: "enemy",
    x: shield.centerX + dirX * MIRROR_SHIELD_WIDTH,
    y: shield.centerY + dirY * MIRROR_SHIELD_WIDTH,
    dirX,
    dirY,
    range: getCellSize() * LASER_RANGE_CELLS,
    color: "rgba(201, 243, 255, 0.94)",
    width: LASER_PROJECTILE_WIDTH - 1,
  });
  return true;
}

function reflectProjectileFromPlayerMirror(projectile, type = "laser") {
  if (!playerMirrorPassive || projectile.owner !== "enemy") return false;

  const dx = projectile.x - player.x;
  const dy = projectile.y - player.y;
  const distance = Math.hypot(dx, dy) || 1;
  const dirX = dx / distance;
  const dirY = dy / distance;

  spawnImpactBurst(player.x, player.y, {
    count: 10,
    speedMin: 90,
    speedMax: 210,
    lifeMin: 0.12,
    lifeMax: 0.24,
    sizeMin: 2,
    sizeMax: 5,
  });

  if (type === "base") {
    baseProjectiles.push({
      owner: "player",
      x: player.x + dirX * (player.size * 0.72),
      y: player.y + dirY * (player.size * 0.72),
      vx: dirX * BASE_GUN_PROJECTILE_SPEED,
      vy: dirY * BASE_GUN_PROJECTILE_SPEED,
      radius: BASE_GUN_PROJECTILE_RADIUS,
      ttl: BASE_GUN_PROJECTILE_LIFETIME,
      life: BASE_GUN_PROJECTILE_LIFETIME,
      color: "rgba(201, 243, 255, 0.94)",
      innerColor: "rgba(255, 255, 255, 0.96)",
    });
    return true;
  }

  spawnLaserProjectile({
    owner: "player",
    x: player.x + dirX * (player.size * 0.72),
    y: player.y + dirY * (player.size * 0.72),
    dirX,
    dirY,
    range: getLaserRange(),
    color: "rgba(201, 243, 255, 0.94)",
    width: LASER_PROJECTILE_WIDTH,
    speed: LASER_PROJECTILE_SPEED * PLAYER_STOLEN_LASER_SPEED_MULTIPLIER,
  });
  return true;
}

function updateLaserProjectiles(dt) {
  for (let index = laserProjectiles.length - 1; index >= 0; index -= 1) {
    const projectile = laserProjectiles[index];
    if (!projectile) continue;

    projectile.prevX = projectile.x;
    projectile.prevY = projectile.y;

    const step = projectile.speed * dt;
    projectile.x += projectile.dirX * step;
    projectile.y += projectile.dirY * step;
    projectile.traveled += step;

    const hit = projectile.owner === "player" ? hitEnemyWithProjectile(projectile) : hitEnemyProjectileTarget(projectile);
    if (player.dead) return;

    if (hit || projectile.traveled >= projectile.range + projectile.length || isProjectileOutOfArena(projectile)) {
      laserProjectiles.splice(index, 1);
    }
  }
}

function hitEnemyWithProjectile(projectile) {
  const tail = getProjectileTail(projectile);
  if (hitEnemyHomingMissileOnSegment(tail.x, tail.y, projectile.x, projectile.y, projectile.width * 0.5)) {
    return true;
  }

  const shieldHit = findMirrorShieldOnSegment(tail.x, tail.y, projectile.x, projectile.y);
  if (shieldHit && reflectProjectileFromMirror(shieldHit.enemy, projectile, "laser")) {
    return true;
  }

  const hit = findFirstEnemyOnBeam(tail.x, tail.y, projectile.x, projectile.y, projectile.length + ENEMY_SIZE);
  if (!hit) return false;

  if (reflectProjectileFromMirror(hit.enemy, projectile, "laser")) {
    return true;
  }

  damageEnemy(hit.enemy, 1);
  return true;
}

function hitEnemyProjectileTarget(projectile) {
  const tail = getProjectileTail(projectile);
  const tripwireHit = findTripwireOnSegment(tail.x, tail.y, projectile.x, projectile.y);
  if (tripwireHit && reflectProjectileFromTripwire(tripwireHit, projectile, "laser")) {
    return true;
  }

  let bestTarget = null;

  for (let index = 0; index < activePlayerDecoys.length; index += 1) {
    const decoy = activePlayerDecoys[index];
    const hitDecoy = getSegmentCircleHit(
      tail.x,
      tail.y,
      projectile.x,
      projectile.y,
      decoy.x,
      decoy.y,
      decoy.size * 0.65
    );
    if (!hitDecoy || (bestTarget && hitDecoy.t >= bestTarget.t)) continue;
    bestTarget = { type: "decoy", t: hitDecoy.t, index };
  }

  const hitPlayer = getSegmentCircleHit(
    tail.x,
    tail.y,
    projectile.x,
    projectile.y,
    player.x,
    player.y,
    player.size * 0.55
  );
  if (hitPlayer && (!bestTarget || hitPlayer.t < bestTarget.t)) {
    bestTarget = { type: "player", t: hitPlayer.t };
  }

  if (!bestTarget) return false;
  if (bestTarget.type === "decoy") {
    activePlayerDecoys.splice(bestTarget.index, 1);
    return true;
  }

  if (reflectProjectileFromPlayerMirror(projectile, "laser")) {
    return true;
  }

  applyPlayerHit();
  return true;
}

function applyPlayerHit(amount = 1, { ignoreInvuln = false } = {}) {
  if (player.dead || (!ignoreInvuln && player.hitInvuln > 0)) return false;

  player.hp = Math.max(0, player.hp - amount);
  player.hitFlash = 0.7;
  player.hitShake = 1;
  player.hitInvuln = 0.18;
  spawnImpactBurst(player.x, player.y);

  if (player.hp <= 0) {
    startDeathSequence();
  }

  return true;
}

function startDeathSequence() {
  if (player.dead) return;

  player.dead = true;
  player.hp = 0;
  player.vx = 0;
  player.vy = 0;
  player.moving = false;
  player.launched = false;
  player.restingFor = 0;
  player.moveTarget = null;
  player.hitInvuln = 0;
  activeHook = null;
  activePlayerTeleport = null;
  activePlayerLaser = null;
  activePlayerSniper = null;
  activePlayerSpray = null;
  activePlayerShield = null;
  activePlayerDecoys.length = 0;
  playerDecoyPassive = null;
  playerMirrorPassive = null;
  baseProjectiles.length = 0;
  blastWaves.length = 0;
  activePulseBombs.length = 0;
  beamEffects.length = 0;
  enemySeeds.length = 0;
  homingMissiles.length = 0;
  enemyHomingMissiles.length = 0;
  zigzagProjectiles.length = 0;
  playerMinePassive = null;
  playerAbilityCapacity = PLAYER_ABILITY_CAPACITY;
  reserveAbility = null;
  reserveAbilityCharges = null;
  abilityMode = "hook";
  playerHookCooldown = 0;
  playerBaseGunCooldowns = Array(BASE_GUN_MAX_CHARGES).fill(0);
  moveMarker = null;
  trail.length = 0;
  laserProjectiles.length = 0;
  mines.length = 0;
  deathExplosion = {
    x: player.x,
    y: player.y,
    ttl: DEATH_RESET_DELAY,
    life: DEATH_RESET_DELAY,
    radius: player.size * 0.7,
  };
  spawnImpactBurst(player.x, player.y, {
    count: 34,
    speedMin: 180,
    speedMax: 520,
    lifeMin: 0.32,
    lifeMax: 0.82,
    sizeMin: 6,
    sizeMax: 14,
  });
  deathResetTimer = DEATH_RESET_DELAY;
  simulationWasActive = false;
  currentTimeScale = INACTIVE_TIME_SCALE;
}

function resetGame() {
  const half = player.size * 0.5;
  const level = getCurrentLevel();

  worldTime = 0;
  actionTime = 0;
  passiveXpTimer = 0;
  deathResetTimer = 0;
  gameState = "playing";
  levelCompleted = false;
  levelBossSpawned = false;
  currentLevelBossKind = selectLevelBossKind(level);
  levelSpawnQueue = buildLevelSpawnQueue(level);
  pendingUpgradeChoices = [];
  simulationWasActive = false;
  currentTimeScale = INACTIVE_TIME_SCALE;
  enemyId = 0;
  mineId = 0;
  enemies.length = 0;
  spawnMarkers.length = 0;
  laserProjectiles.length = 0;
  mines.length = 0;
  trail.length = 0;
  impactBursts.length = 0;
  deathExplosion = null;

  player.maxHp = 3;
  player.hp = player.maxHp;
  player.vx = 0;
  player.vy = 0;
  player.facingAngle = -Math.PI * 0.5;
  player.moving = false;
  player.launched = false;
  player.restingFor = 0;
  player.moveTarget = null;
  player.xp = 0;
  player.xpLevel = 1;
  player.xpNext = getXpNextForLevel(player.xpLevel);
  player.upgrades = createPlayerUpgrades();
  player.hitFlash = 1;
  player.hitShake = 1.15;
  player.hitInvuln = 0.45;
  player.dead = false;

  activeHook = null;
  activePlayerTeleport = null;
  activePlayerLaser = null;
  activePlayerSniper = null;
  activePlayerSpray = null;
  activePlayerShield = null;
  activePlayerDecoys.length = 0;
  playerDecoyPassive = null;
  playerMirrorPassive = null;
  baseProjectiles.length = 0;
  blastWaves.length = 0;
  activePulseBombs.length = 0;
  beamEffects.length = 0;
  enemySeeds.length = 0;
  homingMissiles.length = 0;
  enemyHomingMissiles.length = 0;
  zigzagProjectiles.length = 0;
  playerMinePassive = null;
  playerAbilityCapacity = PLAYER_ABILITY_CAPACITY;
  reserveAbility = null;
  reserveAbilityCharges = null;
  abilityMode = "hook";
  playerShieldCooldown = 0;
  playerHookCooldown = 0;
  playerBaseGunCooldowns = Array(BASE_GUN_MAX_CHARGES).fill(0);
  resetToHook();
  moveMarker = null;

  player.x = clamp(ARENA.x + ARENA.width * 0.5, ARENA.x + half, ARENA.x + ARENA.width - half);
  player.y = clamp(ARENA.y + ARENA.height * 0.5, ARENA.y + half, ARENA.y + ARENA.height - half);
  aimPoint.x = player.x;
  aimPoint.y = player.y;
  scheduleNextSpawn(true);
  updateLevelHud();
  hideCampaignOverlay();
}

function getProjectileTail(projectile) {
  return {
    x: projectile.x - projectile.dirX * projectile.length,
    y: projectile.y - projectile.dirY * projectile.length,
  };
}

function isProjectileOutOfArena(projectile) {
  const tail = getProjectileTail(projectile);
  const margin = 40;
  return (
    (projectile.x < ARENA.x - margin && tail.x < ARENA.x - margin) ||
    (projectile.x > ARENA.x + ARENA.width + margin && tail.x > ARENA.x + ARENA.width + margin) ||
    (projectile.y < ARENA.y - margin && tail.y < ARENA.y - margin) ||
    (projectile.y > ARENA.y + ARENA.height + margin && tail.y > ARENA.y + ARENA.height + margin)
  );
}

function findFirstEnemyOnBeam(fromX, fromY, toX, toY, maxRange, predicate = null) {
  let bestHit = null;
  let bestT = Infinity;

  for (const enemy of enemies) {
    if (predicate && !predicate(enemy)) continue;
    const distanceToPlayer = Math.hypot(enemy.x - fromX, enemy.y - fromY);
    if (distanceToPlayer > maxRange + enemy.size) continue;

    const hit = getSegmentCircleHit(fromX, fromY, toX, toY, enemy.x, enemy.y, enemy.size * 0.75);
    if (!hit || hit.t >= bestT) continue;

    bestHit = { enemy, t: hit.t, x: hit.x, y: hit.y };
    bestT = hit.t;
  }

  return bestHit;
}

function findEnemiesOnBeam(fromX, fromY, toX, toY, predicate = null) {
  const hits = [];

  for (const enemy of enemies) {
    if (predicate && !predicate(enemy)) continue;
    const hit = getSegmentCircleHit(fromX, fromY, toX, toY, enemy.x, enemy.y, enemy.size * 0.75);
    if (!hit) continue;
    hits.push({ enemy, t: hit.t });
  }

  hits.sort((left, right) => left.t - right.t);
  return hits;
}

function getSegmentCircleHit(x1, y1, x2, y2, cx, cy, radius) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return null;

  const t = clamp(((cx - x1) * dx + (cy - y1) * dy) / lengthSq, 0, 1);
  const px = x1 + dx * t;
  const py = y1 + dy * t;
  const distance = Math.hypot(cx - px, cy - py);
  if (distance > radius) return null;

  return { t, x: px, y: py };
}

function removeEnemy(id) {
  const index = enemies.findIndex((enemy) => enemy.id === id);
  if (index === -1) return;
  enemies.splice(index, 1);
}

function getEnemyXpValue(enemy) {
  if (!enemy || enemy.isIllusion) return 0;
  if (isBossEnemy(enemy)) return 8;
  if (enemy.kind === "brute" || enemy.kind === "commander" || enemy.kind === "medic") return 2;
  if (enemy.kind === "splitter_child" || enemy.kind === "sproutling") return 1;
  return 1;
}

function getXpNextForLevel(level) {
  return 6 + Math.max(0, level - 1) * 3;
}

function applyPlayerLevelUp() {
  player.xpLevel += 1;
  player.xpNext = getXpNextForLevel(player.xpLevel);
  playerBaseGunCooldowns = playerBaseGunCooldowns.map((cooldown) => Math.max(0, cooldown - BASE_GUN_LEVEL_COOLDOWN_REDUCTION));
  playerBaseGunCooldowns.push(0);
  player.upgrades.baseCooldownReduction += BASE_GUN_LEVEL_COOLDOWN_REDUCTION;
  player.MOVE_TO_POINT_SPEED *= 1.05;
  player.maxHp += 1;
  player.hp = Math.min(player.maxHp, player.hp + 1);
  player.upgrades.hookRangeMultiplier *= 1.15;
}

function updatePassiveXp(dt) {
  if (dt <= 0 || player.dead || levelCompleted || gameState !== "playing") return;

  passiveXpTimer += dt;
  while (passiveXpTimer >= PASSIVE_XP_INTERVAL) {
    passiveXpTimer -= PASSIVE_XP_INTERVAL;
    addPlayerXp(PASSIVE_XP_AMOUNT);
  }
}

function addPlayerXp(amount) {
  if (amount <= 0 || player.dead || levelCompleted) return;

  player.xp += amount;
  if (gameState !== "playing") return;

  if (player.xp >= player.xpNext) {
    player.xp -= player.xpNext;
    applyPlayerLevelUp();
  }
}

function killEnemy(enemy, { explode = true } = {}) {
  if (!enemy) return false;

  if (explode && enemy.kind === "bomber") {
    spawnBomberBlast(enemy.x, enemy.y);
  }
  if (explode && enemy.kind === "splitter") {
    spawnSplitterChildren(enemy);
  }

  if (explode) {
    spawnImpactBurst(enemy.x, enemy.y, {
      count: enemy.kind === "brute" ? 30 : enemy.kind === "sproutling" || enemy.kind === "splitter_child" ? 14 : 22,
      speedMin: 110,
      speedMax: enemy.kind === "brute" ? 380 : 300,
      lifeMin: 0.55,
      lifeMax: 0.95,
      sizeMin: enemy.kind === "sproutling" || enemy.kind === "splitter_child" ? 12 : 20,
      sizeMax: enemy.kind === "brute" ? 48 : enemy.kind === "sproutling" || enemy.kind === "splitter_child" ? 22 : 38,
    });
  }

  addPlayerXp(getEnemyXpValue(enemy));
  removeEnemy(enemy.id);
  return true;
}

function damageEnemy(enemy, amount = 1) {
  // A hooked target must reach the player to be consumed reliably.
  if (activeHook && activeHook.enemyId === enemy.id) {
    return false;
  }

  if (enemy.isIllusion) {
    return killEnemy(enemy);
  }

  if (isBossShieldActive(enemy)) return false;

  spawnEnemyHitBurst(enemy, amount);
  enemy.hp = Math.max(0, (enemy.hp ?? 1) - amount);
  if (enemy.hp <= 0) {
    if (enemy.kind === LEVEL3_BOSS_KIND && enemy.bossStage < 3) {
      enterLevel3BossNextStage(enemy);
      return false;
    }
    if (enemy.kind === LEVEL2_BOSS_KIND && enemy.bossStage < 3) {
      enterLevel2BossNextStage(enemy);
      return false;
    }
    if (isBossEnemy(enemy) && enemy.bossStage === 1) {
      enterLevel1BossStageTwo(enemy);
      return false;
    }
    return killEnemy(enemy);
  }
  if (enemy.kind === LEVEL3_BOSS_KIND && enemy.bossStage === 2 && (enemy.bossVolleyCooldown ?? 0) <= 0) {
    fireLevel3BossMissileVolley(enemy);
    enemy.bossVolleyCooldown = LEVEL3_BOSS_STAGE_TWO_VOLLEY_COOLDOWN;
  }
  return false;
}

function getRemainingLevelRoster(level = getCurrentLevel()) {
  const remainingRoster = Object.fromEntries(
    Object.keys(getLevelRoster(level)).map((kind) => [kind, 0])
  );

  const addEnemyKind = (kind) => {
    remainingRoster[kind] = (remainingRoster[kind] ?? 0) + 1;
  };

  for (const kind of levelSpawnQueue) {
    addEnemyKind(kind);
  }

  for (const marker of spawnMarkers) {
    addEnemyKind(marker.kind);
  }

  for (const enemy of enemies) {
    if (enemy.isIllusion) continue;
    addEnemyKind(enemy.kind);
  }

  if (level.boss && !levelBossSpawned) {
    const bossKind = getCurrentLevelBossKind(level);
    if (bossKind) addEnemyKind(bossKind);
  }

  return remainingRoster;
}

function getRosterHtml(level = getCurrentLevel(), roster = getLevelRoster(level)) {
  return Object.entries(roster)
    .filter(([, count]) => count > 0)
    .map(([kind, count]) => {
      const meta = enemyMeta[kind] ?? { name: kind, color: "#ff5a5a", glow: "rgba(255, 90, 90, 0.45)" };
      return `<span class="roster-chip" title="${meta.name}"><span class="roster-chip__swatch" style="--enemy-color:${meta.color};--enemy-glow:${meta.glow}"></span><span class="roster-chip__count">${count}</span></span>`;
    })
    .join("");
}

function updateLevelHud() {
  if (!levelHudEl) return;
  const level = getCurrentLevel();
  const remainingRoster = getRemainingLevelRoster(level);
  const remainingCount = Object.values(remainingRoster).reduce((sum, count) => sum + count, 0);
  const totalCount = getLevelTotalCount(level);
  levelHudEl.innerHTML = `<span class="level-chip" title="${level.name}">${currentLevelIndex + 1}/10 ${remainingCount}/${totalCount}</span>${getRosterHtml(level, remainingRoster)}`;
}

function getUpgradeChoices() {
  const pool = shuffleList(upgradeCards);
  return pool.slice(0, Math.min(3, pool.length));
}

function showUpgradeChoices() {
  gameState = "upgrade";
  pendingUpgradeChoices = getUpgradeChoices();
  if (!campaignOverlayEl) return;

  const cards = pendingUpgradeChoices
    .map((card) => `<button class="upgrade-card" type="button" data-upgrade="${card.id}">
      <span class="upgrade-card__title">${card.title}</span>
      <span class="upgrade-card__text">${card.text}</span>
    </button>`)
    .join("");

  campaignOverlayEl.innerHTML = `<section class="campaign-panel upgrade-panel">
    <p class="campaign-kicker">Новый уровень</p>
    <h1 class="campaign-title">Опыт ${player.xpLevel}</h1>
    <p class="campaign-copy">Выбери одно улучшение. Игра продолжится сразу после выбора.</p>
    <div class="upgrade-grid">${cards}</div>
  </section>`;
  campaignOverlayEl.classList.add("is-visible");
}

function chooseUpgrade(id) {
  const card = pendingUpgradeChoices.find((choice) => choice.id === id);
  if (!card) return;

  card.apply();
  pendingUpgradeChoices = [];

  if (player.xp >= player.xpNext) {
    player.xp -= player.xpNext;
    applyPlayerLevelUp();
    showUpgradeChoices();
    return;
  }

  gameState = "playing";
  hideCampaignOverlay();
  scheduleNextSpawn();
}

function hideCampaignOverlay() {
  if (!campaignOverlayEl) return;
  campaignOverlayEl.classList.remove("is-visible");
  campaignOverlayEl.innerHTML = "";
}

function showCampaignMenu() {
  gameState = "menu";
  if (!campaignOverlayEl) return;

  const cards = campaignLevels
    .map((level, index) => {
      const total = getLevelTotalCount(level);
      const fixedBossKind = getFixedLevelBossKind(index);
      const roster = { ...getLevelRoster(level), ...(level.boss && fixedBossKind ? { [fixedBossKind]: 1 } : {}) };
      const rosterText = Object.entries(roster)
        .map(([kind, count]) => `${enemyMeta[kind]?.name ?? kind} ${count}`)
        .join(", ");
      const bossText = level.boss && !fixedBossKind ? ", случайный босс 1" : "";
      return `<button class="level-card" type="button" data-level="${index}">
        <span class="level-card__number">${index + 1}</span>
        <span class="level-card__name">${level.name}</span>
        <span class="level-card__meta">${total} врагов: ${rosterText}${bossText}</span>
      </button>`;
    })
    .join("");

  campaignOverlayEl.innerHTML = `<section class="campaign-panel">
    <p class="campaign-kicker">Кампания</p>
    <h1 class="campaign-title">10 арен</h1>
    <p class="campaign-copy">Выбери уровень. Сверху в бою будет показан полный состав монстров уровня, как счетчик перед раундом.</p>
    <div class="level-grid">${cards}</div>
  </section>`;
  campaignOverlayEl.classList.add("is-visible");
}

function showLevelComplete() {
  gameState = "complete";
  if (!campaignOverlayEl) return;

  const isLastLevel = currentLevelIndex >= campaignLevels.length - 1;
  campaignOverlayEl.innerHTML = `<section class="campaign-panel">
    <p class="campaign-kicker">Уровень очищен</p>
    <h1 class="campaign-title">${getCurrentLevel().name}</h1>
    <p class="campaign-copy">Время: ${actionTime.toFixed(2)}s. Можно переиграть, перейти дальше или выбрать другой уровень.</p>
    <div class="campaign-actions">
      <button class="campaign-button" type="button" data-action="restart">Повторить</button>
      ${isLastLevel ? "" : `<button class="campaign-button" type="button" data-action="next">Следующий</button>`}
      <button class="campaign-button is-secondary" type="button" data-action="menu">К выбору уровня</button>
    </div>
  </section>`;
  campaignOverlayEl.classList.add("is-visible");
}

function startLevel(index) {
  currentLevelIndex = clamp(index, 0, campaignLevels.length - 1);
  resetGame();
}

function checkLevelComplete() {
  if (levelCompleted || player.dead || gameState !== "playing") return;
  if (levelSpawnQueue.length > 0 || spawnMarkers.length > 0 || enemies.length > 0 || enemySeeds.length > 0 || activePulseBombs.length > 0) return;

  levelCompleted = true;
  showLevelComplete();
}

function updateUi() {
  updateLevelHud();
  const selected = getSelectedAbilityState();
  const selectedAbility = selected.ability;
  abilityNameEl.textContent =
    selected.charges !== null
      ? `${selectedAbility.name} x${selected.charges}`
      : selectedAbility.name;
  const selectableModes = getSelectableAbilityModes();
  const switchHint = selectableModes.length > 1 ? " | Q/Wheel/1-9" : "";
  if (selectedAbility.key === abilities.shield.key) {
    if (activePlayerShield) {
      abilityHintEl.textContent = `${activePlayerShield.timer.toFixed(1)}s`;
    } else if (playerShieldCooldown > 0) {
      abilityHintEl.textContent = `CD ${playerShieldCooldown.toFixed(1)}s`;
    } else {
      abilityHintEl.textContent = "Ready";
    }
  } else if (selectedAbility.key === abilities.hook.key) {
    abilityHintEl.textContent = playerHookCooldown > 0 ? `CD ${playerHookCooldown.toFixed(1)}s` : `Click${switchHint}`;
  } else if (selectedAbility.key === abilities.sidearm.key) {
    const readyShots = getReadyBaseGunCharges();
    const nextCooldown = getNextBaseGunCooldown();
    abilityHintEl.textContent = readyShots > 0 ? `${readyShots}/${BASE_GUN_MAX_CHARGES} Ready${switchHint}` : `CD ${nextCooldown.toFixed(1)}s`;
  } else if (selectedAbility.key === abilities.sniper.key && activePlayerSniper) {
    abilityHintEl.textContent = `${activePlayerSniper.timer.toFixed(1)}s`;
  } else if (selectedAbility.key === abilities.teleport.key && activePlayerTeleport) {
    abilityHintEl.textContent = `${activePlayerTeleport.timer.toFixed(1)}s`;
  } else {
    abilityHintEl.textContent = `Click${switchHint}`;
  }
  abilityIconEl.textContent = getAbilityIconKey(selectedAbility.key);
  hpLabelEl.textContent = `HP ${player.hp}/${player.maxHp}`;
  const xpText = `XP ${player.xp}/${player.xpNext} | Ур.${player.xpLevel}`;
  powerLabelEl.textContent = playerMinePassive
    ? `${xpText} | Мины ${playerMinePassive.remaining}`
    : xpText;
  timeLabelEl.textContent = `${actionTime.toFixed(2)}s`;
  const abilityTiles = [
    {
      mode: "teleport",
      abilityKey: abilities.teleport.key,
      icon: getAbilityIconKey(abilities.teleport.key),
      charges: null,
      active: abilityMode === "teleport",
      empty: false,
    },
    {
      mode: "hook",
      abilityKey: abilities.hook.key,
      icon: getAbilityIconKey(abilities.hook.key),
      charges: null,
      active: abilityMode === "hook",
      empty: false,
    },
    {
      mode: "base",
      abilityKey: abilities.sidearm.key,
      icon: getAbilityIconKey(abilities.sidearm.key),
      charges: getReadyBaseGunCharges(),
      active: abilityMode === "base",
      empty: false,
    },
  ];

  if (currentAbility.key !== abilities.hook.key) {
    abilityTiles.push({
      mode: "primary",
      abilityKey: currentAbility.key,
      icon: getAbilityIconKey(currentAbility.key),
      charges: currentAbilityCharges,
      active: abilityMode === "primary",
      empty: false,
    });
  }

  if (playerAbilityCapacity > 1) {
    if (reserveAbility) {
      abilityTiles.push({
        mode: "secondary",
        abilityKey: reserveAbility.key,
        icon: getAbilityIconKey(reserveAbility.key),
        charges: reserveAbilityCharges,
        active: abilityMode === "secondary",
        empty: false,
      });
    } else {
      abilityTiles.push({
        mode: "secondary",
        abilityKey: null,
        icon: "+",
        charges: null,
        active: false,
        empty: true,
      });
    }
  }

  abilityTilesEl.innerHTML = abilityTiles
    .map(
      (tile, index) => {
        const cooldown = tile.abilityKey ? getAbilityCooldownState(tile.abilityKey) : null;
        const cooldownRatio = cooldown ? clamp(cooldown.remaining / cooldown.duration, 0, 1) : 0;
        return `<div class="ability-tile${tile.active ? " is-active" : ""}${tile.empty ? " is-empty" : ""}${cooldown ? " is-cooling" : ""}" data-mode="${tile.mode}"${tile.abilityKey ? ` data-ability="${tile.abilityKey}"` : ""}>${cooldown ? `<span class="ability-tile__cooldown" style="height:${(cooldownRatio * 100).toFixed(1)}%"></span><span class="ability-tile__cooldown-label">${Math.ceil(cooldown.remaining)}</span>` : ""}<span class="ability-tile__hotkey">${index + 1}</span><span class="ability-tile__icon"><span class="ability-tile__icon-glyph">${tile.icon}</span></span>${tile.charges !== null ? `<span class="ability-tile__charges">${tile.charges}</span>` : ""}</div>`;
      }
    )
    .join("");

  const passiveChips = [];
  if (playerMinePassive) {
    passiveChips.push(
      `<div class="passive-chip"><span class="passive-chip__icon">M</span><span class="passive-chip__text">Мины ${playerMinePassive.remaining}/20</span></div>`
    );
  }
  if (playerDecoyPassive) {
    passiveChips.push(
      `<div class="passive-chip"><span class="passive-chip__icon">D</span><span class="passive-chip__text">Приманки ${playerDecoyPassive.remaining}/3</span></div>`
    );
  }
  if (playerMirrorPassive) {
    passiveChips.push(
      `<div class="passive-chip"><span class="passive-chip__icon">R</span><span class="passive-chip__text">Зеркало ${playerMirrorPassive.timer.toFixed(1)}s</span></div>`
    );
  }
  if (playerAbilityCapacity > 1) {
    passiveChips.push(
      `<div class="passive-chip"><span class="passive-chip__icon">2</span><span class="passive-chip__text">2 слота</span></div>`
    );
  }
  if (currentAbility.key !== abilities.hook.key) {
    const currentLabel =
      currentAbilityCharges === null ? currentAbility.name : `${currentAbility.name} x${currentAbilityCharges}`;
    passiveChips.push(
      `<div class="passive-chip"><span class="passive-chip__icon">${getAbilityIconKey(currentAbility.key)}</span><span class="passive-chip__text">${abilityMode === "primary" ? "Активно" : "Слот 1"} ${currentLabel}</span></div>`
    );
  }
  if (playerAbilityCapacity > 1) {
    if (reserveAbility) {
      const reserveLabel =
        reserveAbilityCharges === null ? reserveAbility.name : `${reserveAbility.name} x${reserveAbilityCharges}`;
      passiveChips.push(
        `<div class="passive-chip"><span class="passive-chip__icon">${getAbilityIconKey(reserveAbility.key)}</span><span class="passive-chip__text">${abilityMode === "secondary" ? "Активно" : "Слот 2"} ${reserveLabel}</span></div>`
      );
    } else {
      passiveChips.push(
        `<div class="passive-chip"><span class="passive-chip__icon">+</span><span class="passive-chip__text">Слот 2 пусто</span></div>`
      );
    }
  }
  passiveTrayEl.innerHTML = passiveChips.join("");
}

function draw() {
  ctx.clearRect(0, 0, VIEW.width, VIEW.height);
  drawSky();
  drawArenaGlow();
  drawArena();
  drawMoveMarker();
  drawPlayerTrajectory();
  drawSpawnMarkers();
  drawTrail();
  drawMines();
  drawEnemySeeds();
  if (!player.dead) {
    drawAbilityRange();
    drawHookTargetPreview();
  }
  drawEnemies();
  drawLaserEffects();
  drawDeathExplosion();
  drawImpactBursts();
  if (!player.dead) {
    drawPlayer();
  }
  drawDragGuide();
  drawEnemyTooltip();
}

function drawSky() {
  const sun = ctx.createRadialGradient(180, 120, 10, 180, 120, 260);
  sun.addColorStop(0, "rgba(255, 233, 154, 0.96)");
  sun.addColorStop(0.25, "rgba(255, 188, 68, 0.24)");
  sun.addColorStop(1, "rgba(255, 188, 68, 0)");
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  for (let i = 0; i < 6; i += 1) {
    const x = ((i * 240) + 80) % (VIEW.width + 220) - 110;
    const y = 110 + (i % 2) * 40;
    drawCloud(x, y, 0.9 + (i % 3) * 0.2);
  }
}

function drawCloud(x, y, scale) {
  ctx.beginPath();
  ctx.arc(x, y, 24 * scale, Math.PI * 0.6, Math.PI * 1.9);
  ctx.arc(x + 28 * scale, y - 10 * scale, 30 * scale, Math.PI, Math.PI * 2);
  ctx.arc(x + 58 * scale, y, 24 * scale, Math.PI * 1.15, Math.PI * 0.3, true);
  ctx.closePath();
  ctx.fill();
}

function drawArenaGlow() {
  const glow = ctx.createRadialGradient(
    ARENA.x + ARENA.width * 0.5,
    ARENA.y + ARENA.height * 0.45,
    30,
    ARENA.x + ARENA.width * 0.5,
    ARENA.y + ARENA.height * 0.5,
    Math.max(ARENA.width, ARENA.height) * 0.75
  );
  glow.addColorStop(0, "rgba(110, 231, 255, 0.22)");
  glow.addColorStop(0.5, "rgba(48, 124, 255, 0.09)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);
}

function drawArena() {
  ctx.save();
  ctx.translate(ARENA.x, ARENA.y);

  const fill = ctx.createLinearGradient(0, 0, ARENA.width, ARENA.height);
  fill.addColorStop(0, "rgba(8, 14, 28, 0.95)");
  fill.addColorStop(1, "rgba(6, 8, 14, 0.98)");
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, ARENA.width, ARENA.height);

  ctx.strokeStyle = "rgba(113, 226, 255, 0.9)";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, ARENA.width, ARENA.height);

  ctx.strokeStyle = "rgba(113, 226, 255, 0.1)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 8; i += 1) {
    const offsetX = (ARENA.width / 8) * i;
    const offsetY = (ARENA.height / 8) * i;
    ctx.beginPath();
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, ARENA.height);
    ctx.moveTo(0, offsetY);
    ctx.lineTo(ARENA.width, offsetY);
    ctx.stroke();
  }

  ctx.restore();
}

function drawTrail() {
  for (const particle of trail) {
    const life = clamp(particle.ttl / particle.life, 0, 1);
    ctx.save();
    ctx.fillStyle = `rgba(255, 183, 3, ${life * 0.34})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * (0.35 + life * 0.6), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 241, 195, ${life * 0.26})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * (0.16 + life * 0.28), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawImpactBursts() {
  for (const burst of impactBursts) {
    const life = clamp(burst.ttl / burst.life, 0, 1);
    ctx.save();
    ctx.translate(burst.x, burst.y);
    ctx.rotate(burst.angle);

    if (burst.kind === "ring") {
      const expansion = 1 - life;
      ctx.strokeStyle = colorWithAlpha(burst.midColor, life * 0.76);
      ctx.lineWidth = 2 + life * 2;
      ctx.beginPath();
      ctx.arc(0, 0, burst.size * (0.45 + expansion * 1.25), 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = colorWithAlpha(burst.outerColor, life * 0.48);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, burst.size * (0.72 + expansion * 1.7), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    ctx.fillStyle = colorWithAlpha(burst.outerColor, life * 0.42);
    ctx.beginPath();
    ctx.arc(0, 0, burst.size * (0.5 + (1 - life) * 0.65), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colorWithAlpha(burst.midColor, life * 0.78);
    ctx.fillRect(-burst.size * 0.55, -burst.size * 0.18, burst.size * 1.1, burst.size * 0.36);

    ctx.fillStyle = colorWithAlpha(burst.innerColor, life * 0.7);
    ctx.fillRect(-burst.size * 0.24, -burst.size * 0.1, burst.size * 0.48, burst.size * 0.2);
    ctx.restore();
  }
}

function wrapCanvasText(text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(testLine).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawRoundedRectPath(x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width * 0.5, height * 0.5);
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
}

function getEnemyTooltipData(enemy) {
  const meta = enemyMeta[enemy.kind] ?? { name: enemy.kind, color: "#ff5a5a" };
  if (enemy.isIllusion) {
    return {
      title: "Иллюзия",
      color: meta.color,
      hp: "HP 1/1 | XP 0",
      text: "Обманка трикстера. Исчезает при поедании.",
      reward: "Ничего не дает.",
    };
  }

  const info = enemyInfo[enemy.kind] ?? { text: "Обычный противник.", reward: "Только опыт." };
  return {
    title: meta.name,
    color: meta.color,
    hp: `HP ${Math.ceil(enemy.hp ?? 1)}/${Math.ceil(enemy.maxHp ?? 1)} | XP ${getEnemyXpValue(enemy)}`,
    text: info.text,
    reward: `При поедании: ${info.reward}`,
  };
}

function drawEnemyTooltip() {
  if (hoveredEnemyTimer < ENEMY_TOOLTIP_DELAY || gameState !== "playing" || player.dead) return;

  const enemy = enemies.find((candidate) => candidate.id === hoveredEnemyId);
  if (!enemy) return;

  const data = getEnemyTooltipData(enemy);
  const width = Math.min(286, Math.max(220, VIEW.width - 24));
  const padding = 12;
  const contentWidth = width - padding * 2;

  ctx.save();
  ctx.font = "700 15px 'Trebuchet MS', 'Segoe UI', sans-serif";
  const titleLine = data.title;
  ctx.font = "700 12px 'Trebuchet MS', 'Segoe UI', sans-serif";
  const hpLine = data.hp;
  ctx.font = "600 12px 'Trebuchet MS', 'Segoe UI', sans-serif";
  const textLines = wrapCanvasText(data.text, contentWidth);
  const rewardLines = wrapCanvasText(data.reward, contentWidth);
  const height = padding * 2 + 18 + 16 + textLines.length * 15 + rewardLines.length * 15 + 10;
  let x = hoverAnchorPoint.x + 18;
  let y = hoverAnchorPoint.y + 18;
  x = clamp(x, 12, VIEW.width - width - 12);
  if (y + height > VIEW.height - 12) y = hoverAnchorPoint.y - height - 18;
  y = clamp(y, 12, VIEW.height - height - 12);

  ctx.shadowColor = "rgba(0, 0, 0, 0.32)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "rgba(7, 12, 22, 0.9)";
  ctx.beginPath();
  drawRoundedRectPath(x, y, width, height, 8);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = data.color;
  ctx.fillRect(x, y, 4, height);

  let textY = y + padding + 13;
  ctx.fillStyle = "rgba(246, 250, 255, 0.96)";
  ctx.font = "700 15px 'Trebuchet MS', 'Segoe UI', sans-serif";
  ctx.fillText(titleLine, x + padding, textY);

  textY += 17;
  ctx.fillStyle = "rgba(205, 220, 235, 0.88)";
  ctx.font = "700 12px 'Trebuchet MS', 'Segoe UI', sans-serif";
  ctx.fillText(hpLine, x + padding, textY);

  textY += 18;
  ctx.fillStyle = "rgba(234, 242, 250, 0.88)";
  ctx.font = "600 12px 'Trebuchet MS', 'Segoe UI', sans-serif";
  for (const line of textLines) {
    ctx.fillText(line, x + padding, textY);
    textY += 15;
  }

  textY += 4;
  ctx.fillStyle = "rgba(255, 226, 145, 0.94)";
  for (const line of rewardLines) {
    ctx.fillText(line, x + padding, textY);
    textY += 15;
  }

  ctx.restore();
}

function drawDeathExplosion() {
  if (!deathExplosion) return;

  const progress = 1 - clamp(deathExplosion.ttl / deathExplosion.life, 0, 1);
  const fade = 1 - progress;
  const blastRadius = deathExplosion.radius + progress * 90;

  ctx.save();

  ctx.fillStyle = `rgba(18, 0, 8, ${0.14 + fade * 0.22})`;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  const glow = ctx.createRadialGradient(
    deathExplosion.x,
    deathExplosion.y,
    Math.max(2, blastRadius * 0.1),
    deathExplosion.x,
    deathExplosion.y,
    blastRadius
  );
  glow.addColorStop(0, `rgba(255, 248, 230, ${0.9 * fade})`);
  glow.addColorStop(0.25, `rgba(255, 176, 96, ${0.65 * fade})`);
  glow.addColorStop(0.6, `rgba(255, 82, 112, ${0.42 * fade})`);
  glow.addColorStop(1, "rgba(255, 82, 112, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(deathExplosion.x, deathExplosion.y, blastRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `rgba(255, 248, 236, ${0.24 * fade})`;
  ctx.beginPath();
  ctx.arc(deathExplosion.x, deathExplosion.y, blastRadius * 0.32, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(255, 244, 220, ${0.9 * fade})`;
  ctx.lineWidth = 3 + fade * 5;
  ctx.beginPath();
  ctx.arc(deathExplosion.x, deathExplosion.y, blastRadius * 0.68, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 124, 150, ${0.75 * fade})`;
  ctx.lineWidth = 2 + fade * 3;
  ctx.beginPath();
  ctx.arc(deathExplosion.x, deathExplosion.y, blastRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawSpawnMarkers() {
  for (const marker of spawnMarkers) {
    const progress = marker.elapsed / ENEMY_SPAWN_TELEGRAPH;
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 8 + marker.x * 0.01);
    const radius = 12 + pulse * 9;

    ctx.save();
    ctx.translate(marker.x, marker.y);

    ctx.strokeStyle = `rgba(255, 82, 82, ${0.35 + pulse * 0.45})`;
    ctx.lineWidth = 2 + pulse * 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 130, 130, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-9, 0);
    ctx.lineTo(9, 0);
    ctx.moveTo(0, -9);
    ctx.lineTo(0, 9);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 210, 210, 0.95)";
    ctx.lineWidth = 3;
    ctx.arc(-0.01, -0.01, radius + 8, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2 * progress);
    ctx.stroke();

    ctx.restore();
  }
}

function drawMoveMarker() {
  if (!moveMarker) return;

  const progress = 1 - clamp(moveMarker.ttl / moveMarker.life, 0, 1);
  const pulse = 0.5 + 0.5 * Math.sin(worldTime * 10);
  const radius = 14 + pulse * 7 + progress * 8;

  ctx.save();
  ctx.translate(moveMarker.x, moveMarker.y);

  ctx.strokeStyle = `rgba(122, 232, 255, ${0.25 + (1 - progress) * 0.45})`;
  ctx.lineWidth = 2 + (1 - progress) * 2;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(212, 247, 255, 0.9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-8, 0);
  ctx.lineTo(8, 0);
  ctx.moveTo(0, -8);
  ctx.lineTo(0, 8);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = `rgba(122, 232, 255, ${0.16 + (1 - progress) * 0.28})`;
  ctx.arc(0, 0, radius + 10 + progress * 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function getPredictedPlayerTrajectory() {
  if (!player.moveTarget) return [];

  const half = player.size * 0.5;
  const slowMultiplier = getPlayerSlowMultiplier();
  const moveBrake = MOVE_BRAKE * slowMultiplier;
  const moveAcceleration = MOVE_ACCELERATION * slowMultiplier;
  const maxSpeed = MOVE_TO_POINT_SPEED * slowMultiplier;
  const state = {
    x: player.x,
    y: player.y,
    vx: player.vx,
    vy: player.vy,
    facingAngle: player.facingAngle,
  };
  const points = [{ x: state.x, y: state.y }];

  for (let stepIndex = 0; stepIndex < PLAYER_TRAJECTORY_STEPS; stepIndex += 1) {
    const dx = player.moveTarget.x - state.x;
    const dy = player.moveTarget.y - state.y;
    const distance = Math.hypot(dx, dy);
    if (distance <= MOVE_STOP_DISTANCE) {
      points.push({ x: player.moveTarget.x, y: player.moveTarget.y });
      break;
    }

    const currentSpeed = Math.hypot(state.vx, state.vy);
    const targetAngle = Math.atan2(dy, dx);
    const currentAngle = state.facingAngle ?? (currentSpeed > 1 ? Math.atan2(state.vy, state.vx) : targetAngle);
    const angleDelta = Math.abs(normalizeAngle(targetAngle - currentAngle));
    const nextAngle = turnAngleToward(currentAngle, targetAngle, PLAYER_TURN_RATE * PLAYER_TRAJECTORY_STEP_TIME);
    const brakingSpeed = Math.sqrt(2 * moveBrake * Math.max(0, distance - MOVE_STOP_DISTANCE));
    const targetSpeed = Math.min(maxSpeed, brakingSpeed);
    const adjustedTargetSpeed = getTurnAdjustedTargetSpeed(targetSpeed, angleDelta);
    const nextSpeed = currentSpeed < adjustedTargetSpeed
      ? Math.min(adjustedTargetSpeed, currentSpeed + moveAcceleration * PLAYER_TRAJECTORY_STEP_TIME)
      : Math.max(adjustedTargetSpeed, currentSpeed - moveBrake * PLAYER_TRAJECTORY_STEP_TIME);
    const travel = Math.min(nextSpeed * PLAYER_TRAJECTORY_STEP_TIME, distance);

    state.vx = Math.cos(nextAngle) * nextSpeed;
    state.vy = Math.sin(nextAngle) * nextSpeed;
    state.facingAngle = nextAngle;
    state.x = clamp(state.x + Math.cos(nextAngle) * travel, ARENA.x + half, ARENA.x + ARENA.width - half);
    state.y = clamp(state.y + Math.sin(nextAngle) * travel, ARENA.y + half, ARENA.y + ARENA.height - half);
    points.push({ x: state.x, y: state.y });
  }

  return points;
}

function drawPlayerTrajectory() {
  const points = getPredictedPlayerTrajectory();
  if (points.length < 2) return;

  const pulse = 0.5 + 0.5 * Math.sin(worldTime * 8);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = `rgba(42, 211, 255, ${0.14 + pulse * 0.08})`;
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.stroke();

  ctx.strokeStyle = `rgba(220, 250, 255, ${0.62 + pulse * 0.2})`;
  ctx.lineWidth = 2.5;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  for (let index = 5; index < points.length; index += 7) {
    const point = points[index];
    ctx.fillStyle = `rgba(122, 232, 255, ${0.2 + pulse * 0.16})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawAbilityRange() {
  const selectedAbility = getSelectedAbilityState().ability;
  if (
    selectedAbility.key === abilities.teleport.key ||
    selectedAbility.key === abilities.spray.key ||
    selectedAbility.key === abilities.sniper.key ||
    selectedAbility.key === abilities.sidearm.key ||
    selectedAbility.key === abilities.missiles.key ||
    selectedAbility.key === abilities.tripwire.key
  ) {
    return;
  }
  const range =
    selectedAbility.key === abilities.hook.key
      ? getHookRange()
      : selectedAbility.key === abilities.decoy.key
        ? getDecoyRange()
      : selectedAbility.key === abilities.blast.key || selectedAbility.key === abilities.pulse_bomb.key
        ? getBlastRange()
      : selectedAbility.key === abilities.shield.key
        ? getShieldRadius()
        : getLaserRange();
  ctx.save();
  ctx.strokeStyle =
    selectedAbility.key === abilities.hook.key
      ? "rgba(255, 210, 120, 0.18)"
      : selectedAbility.key === abilities.decoy.key
        ? "rgba(255, 178, 218, 0.24)"
      : selectedAbility.key === abilities.blast.key || selectedAbility.key === abilities.pulse_bomb.key
        ? "rgba(255, 174, 84, 0.24)"
      : selectedAbility.key === abilities.shield.key
        ? "rgba(255, 224, 112, 0.26)"
        : selectedAbility.key === abilities.spray.key
          ? "rgba(210, 124, 255, 0.26)"
          : "rgba(130, 220, 255, 0.24)";
  ctx.setLineDash([10, 12]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(player.x, player.y, range, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawHookTargetPreview() {
  const selectedAbility = getSelectedAbilityState().ability;
  if (selectedAbility.key !== abilities.hook.key || activeHook) return;

  const target = findNearestHookTarget();
  if (!target) return;

  const pulse = 0.5 + 0.5 * Math.sin(worldTime * 8);
  const radius = target.size * (0.8 + pulse * 0.18);

  ctx.save();
  ctx.strokeStyle = `rgba(255, 214, 124, ${0.36 + pulse * 0.24})`;
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.strokeStyle = `rgba(255, 232, 174, ${0.58 + pulse * 0.24})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(target.x, target.y, radius + 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 196, 92, ${0.24 + pulse * 0.18})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(target.x, target.y, radius + 12 + pulse * 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawEnemies() {
  for (const enemy of enemies) {
    if (isBossEnemy(enemy)) {
      drawBoss(enemy);
      continue;
    }

    if (enemy.kind === "commander") {
      const pulse = 0.5 + 0.5 * Math.sin(worldTime * 5 + enemy.x * 0.01);
      ctx.save();
      ctx.strokeStyle = `rgba(42, 211, 255, ${0.16 + pulse * 0.12})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 7]);
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, COMMANDER_AURA_RADIUS + pulse * 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    if (enemy.kind === "medic") {
      const pulse = 0.5 + 0.5 * Math.sin(worldTime * 4.5 + enemy.y * 0.01);
      ctx.save();
      ctx.strokeStyle = `rgba(54, 240, 255, ${0.12 + pulse * 0.1})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, MEDIC_SUPPORT_RANGE + pulse * 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    if (enemy.kind === "slow") {
      const pulse = 0.5 + 0.5 * Math.sin(worldTime * 3 + enemy.x * 0.01);
      ctx.save();
      ctx.strokeStyle = `rgba(245, 248, 255, ${0.12 + pulse * 0.1})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, SLOW_FIELD_RADIUS + pulse * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
    drawEnemy(enemy);
  }
}

function drawBoss(enemy) {
  const radius = enemy.size * 0.5;
  const pulse = 0.5 + 0.5 * Math.sin(worldTime * 8);
  const isStageTwo = enemy.bossStage === 2;
  const isBlinking = enemy.bossState === "blink";
  const isLevel2Boss = enemy.kind === LEVEL2_BOSS_KIND;
  const isLevel3Boss = enemy.kind === LEVEL3_BOSS_KIND;
  const hitFlash = clamp(enemy.hitFlash || 0, 0, 1);

  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  if (hitFlash > 0) {
    const shake = Math.sin(worldTime * 95 + enemy.id) * hitFlash * 2.4;
    ctx.translate(shake, -shake * 0.5);
    ctx.scale(1 + hitFlash * 0.045, 1 + hitFlash * 0.045);
  }

  if (isLevel2Boss) {
    const pullRadius =
      enemy.bossStage === 1 && (enemy.bossState === "pull_cast" || enemy.bossState === "pull_active")
        ? getCellSize() * LEVEL2_BOSS_PULL_RADIUS_CELLS
        : enemy.bossStage === 2 && enemy.bossState === "pull_wait"
          ? getCellSize() * LEVEL2_BOSS_STAGE_TWO_PULL_RADIUS_CELLS
        : enemy.bossStage === 3
          ? getCellSize() * LEVEL2_BOSS_PULL_RADIUS_CELLS
          : 0;
    if (pullRadius > 0) {
      const castProgress = enemy.bossState === "pull_cast"
        ? 1 - clamp(enemy.bossStateTimer / LEVEL2_BOSS_PULL_CAST_TIME, 0, 1)
        : 1;
      ctx.strokeStyle = `rgba(255, 154, 84, ${0.2 + castProgress * 0.32 + pulse * 0.1})`;
      ctx.lineWidth = 2 + castProgress * 3;
      ctx.setLineDash([9, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, pullRadius * (0.35 + castProgress * 0.65), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      if (enemy.bossStage === 2 && enemy.bossState === "pull_wait") {
        const pullProgress = 1 - clamp(enemy.bossStateTimer / LEVEL2_BOSS_PULL_AFTER_DASH_DELAY, 0, 1);
        for (let index = 0; index < 3; index += 1) {
          const ringProgress = (pullProgress + index / 3) % 1;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 220, 155, ${0.52 * (1 - ringProgress)})`;
          ctx.lineWidth = 2 + (1 - ringProgress) * 2;
          ctx.arc(0, 0, pullRadius * (1 - ringProgress * 0.78), 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.strokeStyle = `rgba(255, 246, 210, ${0.2 + pullProgress * 0.42})`;
        ctx.lineWidth = 2;
        for (let index = 0; index < 10; index += 1) {
          const angle = (Math.PI * 2 * index) / 10 + worldTime * 1.8;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * pullRadius * 0.92, Math.sin(angle) * pullRadius * 0.92);
          ctx.lineTo(Math.cos(angle) * pullRadius * 0.34, Math.sin(angle) * pullRadius * 0.34);
          ctx.stroke();
        }
      }
    }
    if (enemy.bossStage === 2 && enemy.bossState === "charge") {
      const progress = 1 - clamp(enemy.bossStateTimer / LEVEL2_BOSS_CHARGE_TIME, 0, 1);
      ctx.strokeStyle = `rgba(255, 232, 190, ${0.35 + progress * 0.42})`;
      ctx.lineWidth = 3 + progress * 3;
      ctx.beginPath();
      ctx.arc(0, 0, radius + 12 + progress * 14, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2 * progress);
      ctx.stroke();
    }
  }

  if (isLevel3Boss) {
    if (enemy.bossStage === 1 && enemy.bossState === "radial_cast") {
      const progress = 1 - clamp(enemy.bossStateTimer / LEVEL3_BOSS_RADIAL_CAST_TIME, 0, 1);
      ctx.strokeStyle = `rgba(178, 120, 255, ${0.2 + progress * 0.42})`;
      ctx.lineWidth = 2 + progress * 2;
      ctx.setLineDash([10, 8]);
      const angles = enemy.bossRadialAngles?.length ? enemy.bossRadialAngles : [];
      for (const angle of angles) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.lineTo(Math.cos(angle) * getArenaProjectileReach(), Math.sin(angle) * getArenaProjectileReach());
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    if (enemy.bossStage === 3 && enemy.bossState === "laser_cast") {
      const progress = 1 - clamp(enemy.bossStateTimer / LEVEL3_BOSS_STAGE_THREE_LASER_CAST_TIME, 0, 1);
      const dx = enemy.aimX - enemy.x;
      const dy = enemy.aimY - enemy.y;
      const distance = Math.hypot(dx, dy) || 1;
      ctx.strokeStyle = `rgba(190, 132, 255, ${0.24 + progress * 0.48})`;
      ctx.lineWidth = 3 + progress * 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo((dx / distance) * getArenaProjectileReach(), (dy / distance) * getArenaProjectileReach());
      ctx.stroke();
    }
  }

  if (isBlinking) {
    const progress = 1 - clamp(enemy.bossStateTimer / LEVEL1_BOSS_BLINK_TIME, 0, 1);
    ctx.strokeStyle = `rgba(255, 210, 224, ${0.2 + progress * 0.4})`;
    ctx.lineWidth = 2 + progress * 2;
    ctx.setLineDash([8, 8]);
    for (let index = 0; index < LEVEL1_BOSS_RADIAL_SHOTS; index += 3) {
      const angle = (Math.PI * 2 * index) / LEVEL1_BOSS_RADIAL_SHOTS;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      ctx.lineTo(Math.cos(angle) * getArenaProjectileReach(), Math.sin(angle) * getArenaProjectileReach());
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  if (isBossShieldActive(enemy)) {
    const shieldProgress = clamp(enemy.bossStateTimer / LEVEL1_BOSS_SHIELD_TIME, 0, 1);
    ctx.strokeStyle = `rgba(255, 232, 112, ${0.38 + shieldProgress * 0.36})`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, LEVEL1_BOSS_SHIELD_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.rotate(Math.atan2(enemy.vy, enemy.vx) + worldTime * (isLevel3Boss ? 1.1 : isStageTwo ? 1.4 : 0.75));
  const gradient = ctx.createRadialGradient(-radius * 0.35, -radius * 0.35, 4, 0, 0, radius * 1.25);
  gradient.addColorStop(0, isLevel3Boss ? "#f6eaff" : isLevel2Boss ? "#fff0d7" : isBlinking ? "#ffffff" : "#ffd7df");
  gradient.addColorStop(0.36, isLevel3Boss ? (enemy.bossStage === 3 ? "#7f5cff" : "#a86cff") : isLevel2Boss ? (enemy.bossStage === 3 ? "#ff4f2f" : "#ff8a2f") : isStageTwo ? "#ff315f" : "#ff6f86");
  gradient.addColorStop(1, isLevel3Boss ? "#27114f" : isLevel2Boss ? "#5a1700" : isStageTwo ? "#4b0016" : "#7b0e2b");
  ctx.shadowColor = isLevel3Boss ? "rgba(168, 108, 255, 0.65)" : isLevel2Boss ? "rgba(255, 122, 47, 0.65)" : "rgba(255, 49, 95, 0.65)";
  ctx.shadowBlur = 28;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  for (let index = 0; index < 8; index += 1) {
    const angle = (Math.PI * 2 * index) / 8 + Math.PI * 0.125;
    const pointRadius = index % 2 === 0 ? radius * 1.05 : radius * 0.66;
    const x = Math.cos(angle) * pointRadius;
    const y = Math.sin(angle) * pointRadius;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255, 244, 248, 0.86)";
  ctx.lineWidth = 3;
  ctx.stroke();

  if (hitFlash > 0) {
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = `rgba(255, 250, 226, ${hitFlash * 0.42})`;
    ctx.beginPath();
    ctx.arc(0, 0, radius * (0.62 + hitFlash * 0.28), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  const hpRatio = clamp(enemy.hp / enemy.maxHp, 0, 1);
  ctx.fillStyle = "rgba(16, 22, 34, 0.82)";
  ctx.fillRect(-radius * 1.08, -radius - 18, radius * 2.16, 6);
  ctx.fillStyle = isLevel3Boss ? "rgba(168, 108, 255, 0.96)" : isLevel2Boss ? "rgba(255, 138, 47, 0.96)" : isStageTwo ? "rgba(255, 49, 95, 0.96)" : "rgba(255, 220, 108, 0.96)";
  ctx.fillRect(-radius * 1.08, -radius - 18, radius * 2.16 * hpRatio, 6);
  ctx.restore();
}

function drawEnemy(enemy) {
  const width = enemy.renderWidth || enemy.size;
  const height = enemy.renderHeight || enemy.size;
  const half = enemy.size * 0.5;
  const halfW = width * 0.5;
  const halfH = height * 0.5;
  const angle = Math.atan2(enemy.vy, enemy.vx);
  const hitFlash = clamp(enemy.hitFlash || 0, 0, 1);

  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  if (hitFlash > 0) {
    const shake = Math.sin(worldTime * 110 + enemy.id) * hitFlash * 1.8;
    ctx.translate(shake, -shake * 0.45);
    ctx.scale(1 + hitFlash * 0.07, 1 + hitFlash * 0.07);
  }
  ctx.rotate(enemy.moving ? angle : Math.PI * 0.25);
  if (enemy.isIllusion) {
    ctx.globalAlpha = 0.48;
  }

  const gradient = ctx.createLinearGradient(-half, -half, half, half);
  if (enemy.kind === "brute") {
    gradient.addColorStop(0, "#fff2b3");
    gradient.addColorStop(0.45, "#ffd44f");
    gradient.addColorStop(1, "#9c6a00");
  } else if (enemy.kind === "replicator") {
    gradient.addColorStop(0, "#d4fcff");
    gradient.addColorStop(0.45, "#7de8ff");
    gradient.addColorStop(1, "#1389a9");
  } else if (enemy.kind === "heal") {
    gradient.addColorStop(0, "#d3f4ff");
    gradient.addColorStop(0.45, "#63bfff");
    gradient.addColorStop(1, "#0a4e93");
  } else if (enemy.kind === "medic") {
    gradient.addColorStop(0, "#dcffff");
    gradient.addColorStop(0.45, "#36f0ff");
    gradient.addColorStop(1, "#057d91");
  } else if (enemy.kind === "shield") {
    gradient.addColorStop(0, "#fff0a8");
    gradient.addColorStop(0.45, "#ffc94d");
    gradient.addColorStop(1, "#a86d04");
  } else if (enemy.kind === "slow") {
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.45, "#e7edf7");
    gradient.addColorStop(1, "#7f92b1");
  } else if (enemy.kind === "grower" || enemy.kind === "sproutling") {
    gradient.addColorStop(0, "#efffd2");
    gradient.addColorStop(0.45, "#9aea44");
    gradient.addColorStop(1, "#3d7b0f");
  } else if (enemy.kind === "splitter" || enemy.kind === "splitter_child") {
    gradient.addColorStop(0, "#d8fff0");
    gradient.addColorStop(0.45, "#4ee6a8");
    gradient.addColorStop(1, "#0a7855");
  } else if (enemy.kind === "commander") {
    gradient.addColorStop(0, "#d8f8ff");
    gradient.addColorStop(0.45, "#2ad3ff");
    gradient.addColorStop(1, "#075273");
  } else if (enemy.kind === "mirror") {
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.45, "#c9f3ff");
    gradient.addColorStop(1, "#507a91");
  } else if (enemy.kind === "sniper") {
    gradient.addColorStop(0, "#ffccd4");
    gradient.addColorStop(0.45, "#a71d32");
    gradient.addColorStop(1, "#46010d");
  } else if (enemy.kind === "trickster") {
    gradient.addColorStop(0, "#ffd2f0");
    gradient.addColorStop(0.45, "#ff74ca");
    gradient.addColorStop(1, "#7b1457");
  } else if (enemy.kind === "spray") {
    gradient.addColorStop(0, "#e7bbff");
    gradient.addColorStop(0.45, "#b758ff");
    gradient.addColorStop(1, "#5b1687");
  } else if (enemy.kind === "mine") {
    gradient.addColorStop(0, "#b6ffbb");
    gradient.addColorStop(0.45, "#51d86b");
    gradient.addColorStop(1, "#125f25");
  } else if (enemy.kind === "bomber") {
    gradient.addColorStop(0, "#ffe0b6");
    gradient.addColorStop(0.45, "#ff8f35");
    gradient.addColorStop(1, "#8f2f08");
  } else {
    gradient.addColorStop(0, "#ffb4b4");
    gradient.addColorStop(0.45, "#ff5a5a");
    gradient.addColorStop(1, "#8f1028");
  }

  ctx.shadowColor =
    enemy.kind === "brute"
      ? "rgba(255, 214, 84, 0.5)"
      : enemy.kind === "replicator"
        ? "rgba(120, 244, 255, 0.48)"
      : enemy.kind === "heal"
        ? "rgba(112, 208, 255, 0.46)"
      : enemy.kind === "medic"
        ? "rgba(54, 240, 255, 0.48)"
      : enemy.kind === "shield"
      ? "rgba(255, 212, 92, 0.45)"
      : enemy.kind === "slow"
        ? "rgba(245, 248, 255, 0.45)"
      : enemy.kind === "grower" || enemy.kind === "sproutling"
        ? "rgba(166, 255, 92, 0.46)"
      : enemy.kind === "splitter" || enemy.kind === "splitter_child"
        ? "rgba(78, 230, 168, 0.46)"
      : enemy.kind === "commander"
        ? "rgba(42, 211, 255, 0.48)"
      : enemy.kind === "mirror"
        ? "rgba(201, 243, 255, 0.5)"
      : enemy.kind === "sniper"
        ? "rgba(156, 18, 42, 0.48)"
      : enemy.kind === "trickster"
        ? "rgba(255, 116, 202, 0.45)"
      : enemy.kind === "spray"
        ? "rgba(203, 100, 255, 0.45)"
        : enemy.kind === "mine"
          ? "rgba(84, 255, 118, 0.42)"
        : enemy.kind === "bomber"
          ? "rgba(255, 143, 53, 0.46)"
          : "rgba(255, 54, 84, 0.45)";
  ctx.shadowBlur = enemy.moving ? 18 : 10;
  ctx.fillStyle = gradient;
  ctx.fillRect(-halfW, -halfH, width, height);

  ctx.shadowBlur = 0;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.strokeRect(-halfW, -halfH, width, height);

  ctx.fillStyle = "rgba(255, 246, 246, 0.42)";
  ctx.fillRect(-halfW + 4, -halfH + 4, width * 0.24, height * 0.24);

  if (hitFlash > 0) {
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = `rgba(255, 250, 226, ${hitFlash * 0.58})`;
    ctx.fillRect(-halfW, -halfH, width, height);
    ctx.globalCompositeOperation = "source-over";
  }

  if (enemy.kind === "brute") {
    ctx.strokeStyle = "rgba(255, 248, 214, 0.88)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(8, 0);
    ctx.moveTo(-2, -5);
    ctx.lineTo(-2, 5);
    ctx.moveTo(2, -5);
    ctx.lineTo(2, 5);
    ctx.stroke();
  } else if (enemy.kind === "replicator") {
    ctx.strokeStyle = "rgba(228, 255, 255, 0.92)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, -4);
    ctx.lineTo(0, -8);
    ctx.lineTo(6, -4);
    ctx.lineTo(2, 2);
    ctx.lineTo(6, 8);
    ctx.lineTo(0, 4);
    ctx.lineTo(-6, 8);
    ctx.lineTo(-2, 2);
    ctx.closePath();
    ctx.stroke();
  } else if (enemy.kind === "heal") {
    ctx.strokeStyle = "rgba(230, 248, 255, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 6);
    ctx.stroke();
  } else if (enemy.kind === "medic") {
    ctx.strokeStyle = "rgba(230, 255, 255, 0.94)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(-7, 0);
    ctx.lineTo(7, 0);
    ctx.moveTo(0, -7);
    ctx.lineTo(0, 7);
    ctx.moveTo(-6, -6);
    ctx.lineTo(6, 6);
    ctx.stroke();
  } else if (enemy.kind === "mine") {
    ctx.strokeStyle = "rgba(235, 255, 235, 0.86)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 6);
    ctx.stroke();
  } else if (enemy.kind === "bomber") {
    ctx.strokeStyle = "rgba(255, 244, 224, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.moveTo(0, -10);
    ctx.lineTo(0, -4);
    ctx.moveTo(0, 4);
    ctx.lineTo(0, 10);
    ctx.moveTo(-10, 0);
    ctx.lineTo(-4, 0);
    ctx.moveTo(4, 0);
    ctx.lineTo(10, 0);
    ctx.stroke();
  } else if (enemy.kind === "slow") {
    ctx.strokeStyle = "rgba(246, 249, 255, 0.92)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.moveTo(-8, 0);
    ctx.lineTo(8, 0);
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 8);
    ctx.stroke();
  } else if (enemy.kind === "grower") {
    ctx.strokeStyle = "rgba(238, 255, 224, 0.92)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.moveTo(-7, 3);
    ctx.lineTo(0, -7);
    ctx.lineTo(7, 3);
    ctx.stroke();
  } else if (enemy.kind === "sproutling") {
    ctx.strokeStyle = "rgba(238, 255, 224, 0.88)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-4, 2);
    ctx.lineTo(0, -4);
    ctx.lineTo(4, 2);
    ctx.stroke();
  } else if (enemy.kind === "splitter" || enemy.kind === "splitter_child") {
    ctx.strokeStyle = "rgba(224, 255, 242, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-7, -5);
    ctx.lineTo(0, -9);
    ctx.lineTo(7, -5);
    ctx.moveTo(-7, 5);
    ctx.lineTo(0, 9);
    ctx.lineTo(7, 5);
    if (enemy.kind === "splitter") {
      ctx.moveTo(-8, 0);
      ctx.lineTo(8, 0);
    }
    ctx.stroke();
  } else if (enemy.kind === "commander") {
    ctx.strokeStyle = "rgba(228, 250, 255, 0.92)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, 3);
    ctx.lineTo(-3, -7);
    ctx.lineTo(0, -2);
    ctx.lineTo(3, -7);
    ctx.lineTo(8, 3);
    ctx.moveTo(-6, 7);
    ctx.lineTo(6, 7);
    ctx.stroke();
  } else if (enemy.kind === "mirror") {
    ctx.strokeStyle = enemy.phase === "mirror_shield" ? "rgba(255, 255, 255, 0.96)" : "rgba(205, 225, 235, 0.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-7, -7);
    ctx.lineTo(7, -7);
    ctx.lineTo(3, 7);
    ctx.lineTo(-7, 7);
    ctx.closePath();
    ctx.stroke();
    if (enemy.phase === "mirror_shield") {
      ctx.beginPath();
      ctx.moveTo(-3, 4);
      ctx.lineTo(5, -4);
      ctx.stroke();
    }
  } else if (enemy.kind === "sniper") {
    ctx.strokeStyle = "rgba(255, 228, 236, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, -2);
    ctx.lineTo(8, -2);
    ctx.moveTo(-8, 2);
    ctx.lineTo(8, 2);
    ctx.moveTo(0, -7);
    ctx.lineTo(0, 7);
    ctx.stroke();
  } else if (enemy.kind === "trickster") {
    ctx.strokeStyle = "rgba(255, 228, 246, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-7, 0);
    ctx.lineTo(0, -7);
    ctx.lineTo(7, 0);
    ctx.lineTo(0, 7);
    ctx.closePath();
    ctx.stroke();
  } else if (enemy.kind === "spray") {
    ctx.strokeStyle = "rgba(248, 224, 255, 0.86)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, 3);
    ctx.lineTo(0, -5);
    ctx.lineTo(6, 3);
    ctx.stroke();
  }

  if (enemy.phase === "charge") {
    const charge = 1 - clamp(enemy.phaseTimer / LASER_CHARGE_TIME, 0, 1);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 210, 210, 0.9)";
    ctx.lineWidth = 3;
    ctx.arc(0, 0, half + 9, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2 * charge);
    ctx.stroke();
  } else if (enemy.phase === "shield_windup") {
    const windupProgress = 1 - clamp(enemy.phaseTimer / (enemy.phaseDuration || ENEMY_SHIELD_WINDUP_TIME), 0, 1);
    const shieldRadius = getEnemyShieldRadius(enemy);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 224, 122, ${0.24 + windupProgress * 0.42})`;
    ctx.lineWidth = 2 + windupProgress * 3;
    ctx.setLineDash([8, 7]);
    ctx.arc(0, 0, shieldRadius * (0.25 + windupProgress * 0.75), 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 246, 198, ${0.28 + windupProgress * 0.42})`;
    ctx.lineWidth = 2;
    ctx.arc(0, 0, half + 10 + windupProgress * 10, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2 * windupProgress);
    ctx.stroke();
  } else if (enemy.phase === "shield_up") {
    const shieldProgress = clamp(enemy.phaseTimer / (enemy.phaseDuration || ENEMY_SHIELD_UP_TIME), 0, 1);
    const appearProgress = 1 - shieldProgress;
    const shieldRadius = getEnemyShieldRadius(enemy);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 224, 122, ${0.34 + shieldProgress * 0.24})`;
    ctx.lineWidth = 3 + appearProgress * 2;
    ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 246, 198, ${0.58 * (1 - appearProgress)})`;
    ctx.lineWidth = 2;
    ctx.arc(0, 0, shieldRadius * (0.35 + appearProgress * 0.65), 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 196, 66, ${0.36 * (1 - appearProgress)})`;
    ctx.lineWidth = 2;
    ctx.arc(0, 0, shieldRadius * (0.18 + appearProgress * 0.95), 0, Math.PI * 2);
    ctx.stroke();
  } else if (enemy.phase === "spray_charge") {
    const charge = 1 - clamp(enemy.phaseTimer / SPRAY_CHARGE_TIME, 0, 1);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(226, 168, 255, ${0.42 + charge * 0.28})`;
    ctx.lineWidth = 3;
    ctx.arc(0, 0, half + 10, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2 * charge);
    ctx.stroke();
  } else if (enemy.phase === "sniper_charge") {
    const charge = 1 - clamp(enemy.phaseTimer / SNIPER_CHARGE_TIME, 0, 1);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 214, 226, ${0.38 + charge * 0.34})`;
    ctx.lineWidth = 3;
    ctx.arc(0, 0, half + 10, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2 * charge);
    ctx.stroke();
  } else if (enemy.phase === "mirror_shield") {
    const shieldProgress = clamp(enemy.phaseTimer / MIRROR_SHIELD_DURATION, 0, 1);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(201, 243, 255, ${0.34 + shieldProgress * 0.36})`;
    ctx.lineWidth = 3;
    ctx.arc(0, 0, half + 10, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2 * shieldProgress);
    ctx.stroke();
  }

  if (enemy.maxHp > 1) {
    const hpRatio = clamp(enemy.hp / enemy.maxHp, 0, 1);
    ctx.fillStyle = "rgba(16, 22, 34, 0.72)";
    ctx.fillRect(-halfW, -halfH - 10, width, 4);
    ctx.fillStyle = "rgba(255, 220, 108, 0.95)";
    ctx.fillRect(-halfW, -halfH - 10, width * hpRatio, 4);
  }

  ctx.restore();
}

function drawMines() {
  for (const mine of mines) {
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 7 + mine.pulseSeed);

    if (mine.kind === "tripwire") {
      const life = clamp(mine.ttl / TRIPWIRE_LIFETIME, 0, 1);
      const segment = getTripwireSegment(mine);
      ctx.save();
      ctx.strokeStyle = `rgba(206, 238, 255, ${0.32 + pulse * 0.28})`;
      ctx.lineWidth = TRIPWIRE_WIDTH;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(segment.x1, segment.y1);
      ctx.lineTo(segment.x2, segment.y2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.32 + life * 0.42})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(segment.x1, segment.y1);
      ctx.lineTo(segment.x2, segment.y2);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    const radius = mine.radius;
    const outerRadius = radius + 4 + pulse * 3;

    ctx.save();
    ctx.translate(mine.x, mine.y);

    ctx.strokeStyle =
      mine.owner === "player" ? `rgba(196, 204, 214, ${0.24 + pulse * 0.22})` : `rgba(255, 108, 120, ${0.3 + pulse * 0.28})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = mine.owner === "player" ? "#9ea6b1" : "#ff5868";
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = mine.owner === "player" ? "rgba(241, 245, 250, 0.95)" : "rgba(255, 232, 236, 0.92)";
    ctx.fillRect(-2, -radius - 4, 4, 8);
    ctx.fillRect(-radius - 4, -2, 8, 4);

    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.beginPath();
    ctx.arc(-radius * 0.28, -radius * 0.28, radius * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawEnemySeeds() {
  for (const seed of enemySeeds) {
    const progress = 1 - clamp(seed.timer / seed.duration, 0, 1);
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 6 + seed.pulseSeed);
    const outerRadius = seed.radius + 4 + pulse * 2 + progress * 2;

    ctx.save();
    ctx.translate(seed.x, seed.y);
    ctx.strokeStyle = `rgba(166, 255, 92, ${0.22 + progress * 0.28})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#9aea44";
    ctx.beginPath();
    ctx.arc(0, 0, seed.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(242, 255, 232, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-4, 2);
    ctx.lineTo(0, -5);
    ctx.lineTo(4, 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawLaserEffects() {
  for (const enemy of enemies) {
    if (enemy.kind !== "mirror" || enemy.phase !== "mirror_shield") continue;
    const shield = getMirrorShieldSegment(enemy);
    const progress = clamp(enemy.phaseTimer / MIRROR_SHIELD_DURATION, 0, 1);
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 12 + enemy.id);

    ctx.save();
    ctx.lineCap = "round";
    ctx.strokeStyle = `rgba(201, 243, 255, ${0.28 + progress * 0.38})`;
    ctx.lineWidth = MIRROR_SHIELD_WIDTH + pulse * 3;
    ctx.beginPath();
    ctx.moveTo(shield.x1, shield.y1);
    ctx.lineTo(shield.x2, shield.y2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.46 + progress * 0.34})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(shield.x1, shield.y1);
    ctx.lineTo(shield.x2, shield.y2);
    ctx.stroke();
    ctx.restore();
  }

  if (activePlayerShield) {
    const shieldProgress = clamp(activePlayerShield.timer / activePlayerShield.duration, 0, 1);
    ctx.save();
    ctx.strokeStyle = `rgba(255, 224, 122, ${0.34 + shieldProgress * 0.34})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(player.x, player.y, activePlayerShield.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 248, 204, 0.95)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(
      player.x,
      player.y,
      activePlayerShield.radius + 6,
      -Math.PI * 0.5,
      -Math.PI * 0.5 + Math.PI * 2 * shieldProgress
    );
    ctx.stroke();
    ctx.restore();
  }

  if (playerMirrorPassive) {
    const mirrorProgress = clamp(playerMirrorPassive.timer / playerMirrorPassive.duration, 0, 1);
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 10);
    const radius = player.size * (0.9 + pulse * 0.08);

    ctx.save();
    ctx.strokeStyle = `rgba(201, 243, 255, ${0.24 + mirrorProgress * 0.5})`;
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 7]);
    ctx.beginPath();
    ctx.arc(player.x, player.y, radius + 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.22 + mirrorProgress * 0.4})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      player.x,
      player.y,
      radius + 17,
      -Math.PI * 0.5,
      -Math.PI * 0.5 + Math.PI * 2 * mirrorProgress
    );
    ctx.stroke();
    ctx.restore();
  }

  if (activeHook) {
    ctx.save();
    ctx.strokeStyle = "rgba(255, 209, 102, 0.92)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(activeHook.tipX, activeHook.tipY);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.58)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(activeHook.tipX, activeHook.tipY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "rgba(255, 236, 190, 0.96)";
    ctx.beginPath();
    ctx.arc(activeHook.tipX, activeHook.tipY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (activePlayerTeleport) {
    const progress = 1 - clamp(activePlayerTeleport.timer / activePlayerTeleport.duration, 0, 1);
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 9);

    ctx.save();
    ctx.strokeStyle = `rgba(118, 244, 255, ${0.24 + progress * 0.42})`;
    ctx.lineWidth = 2 + progress * 2;
    ctx.setLineDash([12, 10]);
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(activePlayerTeleport.targetX, activePlayerTeleport.targetY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = `rgba(212, 252, 255, ${0.35 + progress * 0.4})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(
      activePlayerTeleport.targetX,
      activePlayerTeleport.targetY,
      15 + progress * 10 + pulse * 5,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(118, 244, 255, ${0.3 + progress * 0.3})`;
    ctx.arc(
      activePlayerTeleport.targetX,
      activePlayerTeleport.targetY,
      26 + (1 - progress) * 8,
      -Math.PI * 0.5,
      -Math.PI * 0.5 + Math.PI * 2 * progress
    );
    ctx.stroke();
    ctx.restore();
  }

  if (activePlayerLaser) {
    const progress = 1 - clamp(activePlayerLaser.timer / activePlayerLaser.duration, 0, 1);
    const previewX = player.x + activePlayerLaser.dirX * getLaserRange();
    const previewY = player.y + activePlayerLaser.dirY * getLaserRange();

    ctx.save();
    ctx.strokeStyle = `rgba(114, 232, 255, ${0.24 + progress * 0.34})`;
    ctx.lineWidth = 2 + progress * 2;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(previewX, previewY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  if (activePlayerSniper) {
    const progress = 1 - clamp(activePlayerSniper.timer / activePlayerSniper.duration, 0, 1);
    const previewX = player.x + activePlayerSniper.dirX * getArenaProjectileReach();
    const previewY = player.y + activePlayerSniper.dirY * getArenaProjectileReach();

    ctx.save();
    ctx.strokeStyle = `rgba(184, 32, 56, ${0.24 + progress * 0.42})`;
    ctx.lineWidth = 3 + progress * 2;
    ctx.setLineDash([16, 10]);
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(previewX, previewY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  if (activePlayerSpray) {
    const chargeTimer = activePlayerSpray.phase === "charge" ? activePlayerSpray.timer : 0;
    const progress = activePlayerSpray.phase === "charge" ? 1 - clamp(chargeTimer / PLAYER_SPRAY_CHARGE_TIME, 0, 1) : 1;
    const centerAngle = Math.atan2(activePlayerSpray.dirY, activePlayerSpray.dirX);
    const range = getArenaProjectileReach();

    ctx.save();
    ctx.strokeStyle = `rgba(212, 122, 255, ${0.24 + progress * 0.34})`;
    ctx.lineWidth = 2 + progress * 2;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + Math.cos(centerAngle - SPRAY_RANDOM_SPREAD * 0.5) * range, player.y + Math.sin(centerAngle - SPRAY_RANDOM_SPREAD * 0.5) * range);
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + Math.cos(centerAngle) * range, player.y + Math.sin(centerAngle) * range);
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + Math.cos(centerAngle + SPRAY_RANDOM_SPREAD * 0.5) * range, player.y + Math.sin(centerAngle + SPRAY_RANDOM_SPREAD * 0.5) * range);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  for (const decoy of activePlayerDecoys) {
    const life = clamp(decoy.timer / decoy.duration, 0, 1);
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 8 + decoy.x * 0.01 + decoy.y * 0.01);
    const radius = decoy.size * (0.72 + pulse * 0.12);

    ctx.save();
    ctx.translate(decoy.x, decoy.y);
    ctx.rotate(Math.PI * 0.25);
    ctx.globalAlpha = 0.82;

    const gradient = ctx.createLinearGradient(-12, -12, 12, 12);
    gradient.addColorStop(0, "#ffe3f6");
    gradient.addColorStop(0.45, "#ff7fcf");
    gradient.addColorStop(1, "#7b1457");
    ctx.fillStyle = gradient;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255, 240, 248, 0.9)";
    ctx.strokeRect(-radius, -radius, radius * 2, radius * 2);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = `rgba(255, 166, 220, ${0.16 + life * 0.22})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(decoy.x, decoy.y, decoy.size + 8 + pulse * 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  for (const bomb of activePulseBombs) {
    const pulse = 0.5 + 0.5 * Math.sin(worldTime * 9 + bomb.pulseSeed);
    const intervalProgress = 1 - clamp(bomb.timer / bomb.interval, 0, 1);
    ctx.save();
    ctx.strokeStyle = `rgba(255, 143, 53, ${0.32 + pulse * 0.34})`;
    ctx.lineWidth = 2 + pulse * 2;
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, 14 + pulse * 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 238, 188, ${0.2 + intervalProgress * 0.42})`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 6]);
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, 24 + intervalProgress * 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = `rgba(255, 246, 214, ${0.5 + pulse * 0.34})`;
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, 4 + pulse * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  for (const blast of blastWaves) {
    const progress = clamp(blast.radius / blast.maxRadius, 0, 1);
    ctx.save();
    ctx.strokeStyle = `rgba(255, 243, 214, ${0.28 + (1 - progress) * 0.38})`;
    ctx.lineWidth = 2 + (1 - progress) * 4;
    ctx.beginPath();
    ctx.arc(blast.x, blast.y, blast.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 196, 112, ${0.18 + (1 - progress) * 0.22})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(blast.x, blast.y, Math.max(0, blast.radius - 10), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  for (const enemy of enemies) {
    if (
      enemy.phase !== "charge" &&
      enemy.phase !== "sniper_charge" &&
      enemy.phase !== "spray_charge" &&
      enemy.phase !== "spray_fire"
    ) {
      continue;
    }
    const isSpray = enemy.phase === "spray_charge" || enemy.phase === "spray_fire";
    const isSniper = enemy.phase === "sniper_charge";
    const progress = 1 - clamp(enemy.phaseTimer / (isSpray ? SPRAY_CHARGE_TIME : isSniper ? SNIPER_CHARGE_TIME : LASER_CHARGE_TIME), 0, 1);

    ctx.save();
    ctx.strokeStyle = isSpray
      ? `rgba(216, 120, 255, ${0.18 + progress * 0.3})`
      : isSniper
        ? `rgba(172, 22, 46, ${0.2 + progress * 0.34})`
        : `rgba(255, 120, 132, ${0.18 + progress * 0.3})`;
    ctx.lineWidth = 2 + progress * 2;
    ctx.setLineDash([12, 10]);
    ctx.beginPath();
    if (isSpray) {
      const centerAngle = Math.atan2(enemy.aimY - enemy.y, enemy.aimX - enemy.x);
      const range = getArenaProjectileReach();
      ctx.moveTo(enemy.x, enemy.y);
      ctx.lineTo(enemy.x + Math.cos(centerAngle - SPRAY_RANDOM_SPREAD * 0.5) * range, enemy.y + Math.sin(centerAngle - SPRAY_RANDOM_SPREAD * 0.5) * range);
      ctx.moveTo(enemy.x, enemy.y);
      ctx.lineTo(enemy.x + Math.cos(centerAngle) * range, enemy.y + Math.sin(centerAngle) * range);
      ctx.moveTo(enemy.x, enemy.y);
      ctx.lineTo(enemy.x + Math.cos(centerAngle + SPRAY_RANDOM_SPREAD * 0.5) * range, enemy.y + Math.sin(centerAngle + SPRAY_RANDOM_SPREAD * 0.5) * range);
    } else if (isSniper) {
      const angle = Math.atan2(enemy.aimY - enemy.y, enemy.aimX - enemy.x);
      const reach = getArenaProjectileReach();
      ctx.moveTo(enemy.x, enemy.y);
      ctx.lineTo(enemy.x + Math.cos(angle) * reach, enemy.y + Math.sin(angle) * reach);
    } else {
      ctx.moveTo(enemy.x, enemy.y);
      ctx.lineTo(enemy.aimX, enemy.aimY);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  for (const beam of beamEffects) {
    const life = clamp(beam.ttl / beam.life, 0, 1);
    ctx.save();
    ctx.strokeStyle = beam.color.replace(/[\d.]+\)$/u, `${0.12 + life * 0.88})`);
    ctx.lineWidth = beam.width + (1 - life) * 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(beam.fromX, beam.fromY);
    ctx.lineTo(beam.toX, beam.toY);
    ctx.stroke();

    ctx.strokeStyle = beam.innerColor.replace(/[\d.]+\)$/u, `${0.18 + life * 0.82})`);
    ctx.lineWidth = Math.max(2, beam.width * 0.34);
    ctx.beginPath();
    ctx.moveTo(beam.fromX, beam.fromY);
    ctx.lineTo(beam.toX, beam.toY);
    ctx.stroke();
    ctx.restore();
  }

  for (const missile of homingMissiles) {
    const life = clamp(missile.ttl / missile.life, 0, 1);
    const angle = Math.atan2(missile.vy, missile.vx);
    ctx.save();
    ctx.translate(missile.x, missile.y);
    ctx.rotate(angle);

    ctx.strokeStyle = missile.color.replace(/[\d.]+\)$/u, `${0.24 + life * 0.54})`);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-22, 0);
    ctx.stroke();

    ctx.fillStyle = missile.color.replace(/[\d.]+\)$/u, `${0.24 + life * 0.66})`);
    ctx.fillRect(-10, -4, 16, 8);

    ctx.fillStyle = missile.innerColor.replace(/[\d.]+\)$/u, `${0.28 + life * 0.68})`);
    ctx.fillRect(-1, -2, 9, 4);
    ctx.restore();
  }

  for (const missile of enemyHomingMissiles) {
    const life = missile.permanent ? 1 : clamp(missile.ttl / missile.life, 0, 1);
    const angle = Math.atan2(missile.vy, missile.vx);
    ctx.save();
    ctx.translate(missile.x, missile.y);
    ctx.rotate(angle);

    ctx.strokeStyle = missile.color.replace(/[\d.]+\)$/u, `${0.22 + life * 0.52})`);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-24, 0);
    ctx.stroke();

    ctx.fillStyle = missile.color.replace(/[\d.]+\)$/u, `${0.26 + life * 0.66})`);
    ctx.fillRect(-10, -5, 18, 10);

    ctx.fillStyle = missile.innerColor.replace(/[\d.]+\)$/u, `${0.32 + life * 0.62})`);
    ctx.fillRect(-1, -2, 9, 4);
    ctx.restore();
  }

  for (const projectile of zigzagProjectiles) {
    const life = clamp(projectile.ttl / projectile.life, 0, 1);
    const angle = Math.atan2(projectile.dirY, projectile.dirX);

    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(angle + Math.PI * 0.25);
    ctx.fillStyle = `rgba(78, 230, 168, ${0.22 + life * 0.62})`;
    ctx.fillRect(-projectile.radius, -projectile.radius, projectile.radius * 2, projectile.radius * 2);
    ctx.strokeStyle = `rgba(224, 255, 242, ${0.28 + life * 0.62})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(-projectile.radius, -projectile.radius, projectile.radius * 2, projectile.radius * 2);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = `rgba(201, 243, 255, ${0.1 + life * 0.24})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(projectile.prevX, projectile.prevY);
    ctx.lineTo(projectile.x, projectile.y);
    ctx.stroke();
    ctx.restore();
  }

  for (const projectile of baseProjectiles) {
    const life = clamp(projectile.ttl / projectile.life, 0, 1);
    ctx.save();
    ctx.fillStyle = projectile.color.replace(/[\d.]+\)$/u, `${0.3 + life * 0.66})`);
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.radius * (0.9 + life * 0.2), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = projectile.innerColor.replace(/[\d.]+\)$/u, `${0.38 + life * 0.58})`);
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.radius * 0.48, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  for (const projectile of laserProjectiles) {
    const tail = getProjectileTail(projectile);
    const travelAlpha = clamp(1 - projectile.traveled / (projectile.range + projectile.length), 0.22, 1);
    ctx.save();
    ctx.strokeStyle = projectile.color.replace(/[\d.]+\)$/u, `${0.24 + travelAlpha * 0.76})`);
    ctx.lineWidth = projectile.width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tail.x, tail.y);
    ctx.lineTo(projectile.x, projectile.y);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255,255,255,${0.2 + travelAlpha * 0.55})`;
    ctx.lineWidth = Math.max(1, projectile.width * 0.34);
    ctx.beginPath();
    ctx.moveTo(tail.x, tail.y);
    ctx.lineTo(projectile.x, projectile.y);
    ctx.stroke();
    ctx.restore();
  }
}

function drawPlayer() {
  const radius = player.size * 0.5;
  const angle = player.facingAngle ?? Math.atan2(player.vy, player.vx);
  const shakePower = player.hitShake > 0 ? player.hitShake * 8 : 0;
  const shakeX = shakePower > 0 ? (Math.random() - 0.5) * shakePower : 0;
  const shakeY = shakePower > 0 ? (Math.random() - 0.5) * shakePower : 0;

  ctx.save();
  ctx.translate(player.x + shakeX, player.y + shakeY);
  ctx.rotate(angle);

  if (player.moving) {
    const flamePulse = 0.5 + 0.5 * Math.sin(worldTime * 24);
    ctx.fillStyle = `rgba(122, 232, 255, ${0.35 + flamePulse * 0.32})`;
    ctx.beginPath();
    ctx.moveTo(-radius * 0.78, 0);
    ctx.lineTo(-radius * (1.26 + flamePulse * 0.3), -radius * 0.18);
    ctx.lineTo(-radius * (1.26 + flamePulse * 0.3), radius * 0.18);
    ctx.closePath();
    ctx.fill();
  }

  const gradient = ctx.createLinearGradient(-radius, -radius, radius * 1.25, radius);
  gradient.addColorStop(0, player.hitFlash > 0 ? "#ffe4e4" : "#fff2a8");
  gradient.addColorStop(0.48, player.hitFlash > 0 ? "#ff7a7a" : "#ff9f45");
  gradient.addColorStop(1, player.hitFlash > 0 ? "#ff315f" : "#ff3d81");

  ctx.shadowColor = "rgba(255, 88, 136, 0.35)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(radius * 1.25, 0);
  ctx.lineTo(-radius * 0.45, -radius * 0.72);
  ctx.lineTo(-radius * 0.95, -radius * 0.24);
  ctx.lineTo(-radius * 0.58, 0);
  ctx.lineTo(-radius * 0.95, radius * 0.24);
  ctx.lineTo(-radius * 0.45, radius * 0.72);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.32)";
  ctx.beginPath();
  ctx.moveTo(radius * 0.38, 0);
  ctx.lineTo(-radius * 0.2, -radius * 0.26);
  ctx.lineTo(-radius * 0.08, 0);
  ctx.lineTo(-radius * 0.2, radius * 0.26);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawDragGuide() {
}

function tick(now) {
  const dt = Math.min(0.033, (now - lastFrame) / 1000);
  lastFrame = now;

  update(dt);
  draw();

  requestAnimationFrame(tick);
}

canvas.addEventListener("pointerdown", startDrag);
canvas.addEventListener("pointermove", movePointer);
canvas.addEventListener("pointerleave", () => {
  pointerInCanvas = false;
  resetEnemyHover();
});
canvas.addEventListener("wheel", handleWheel, { passive: false });
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
window.addEventListener("resize", resize);
campaignOverlayEl?.addEventListener("click", (event) => {
  const upgradeButton = event.target.closest("[data-upgrade]");
  if (upgradeButton) {
    chooseUpgrade(upgradeButton.dataset.upgrade);
    return;
  }

  const levelButton = event.target.closest("[data-level]");
  if (levelButton) {
    startLevel(Number(levelButton.dataset.level));
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  if (actionButton.dataset.action === "restart") {
    startLevel(currentLevelIndex);
  } else if (actionButton.dataset.action === "next") {
    startLevel(currentLevelIndex + 1);
  } else if (actionButton.dataset.action === "menu") {
    showCampaignMenu();
  }
});

resize();
showCampaignMenu();
updateUi();
requestAnimationFrame(tick);
