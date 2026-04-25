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
const INACTIVE_TIME_SCALE = 0.1;
const TIME_SCALE_TRANSITION = 1.2;
const MOVE_TO_POINT_SPEED = 490;
const MOVE_STOP_DISTANCE = 10;
const MOVE_ACCELERATION = 1140;
const MOVE_BRAKE = 1470;
const ENEMY_SIZE = 22;
const ENEMY_DASH_SPEED = 816;
const ENEMY_MOVE_STOP_DISTANCE = 10;
const ENEMY_MOVE_ACCELERATION = 632;
const ENEMY_MOVE_BRAKE = 816;
const ENEMY_DASH_MIN_DISTANCE = 220;
const ENEMY_DASH_MAX_DISTANCE = 420;
const MIN_ENEMIES_PER_LEVEL = 50;
const MIN_ENEMY_TYPES_PER_LEVEL = 6;
const BRUTE_CHASE_SPEED = 97;
const BRUTE_CHASE_ACCELERATION = 260;
const BRUTE_CONTACT_HP = 5;
const SPROUTLING_CHASE_SPEED = 206;
const SPROUTLING_CHASE_ACCELERATION = 520;
const SLOW_ENEMY_CHASE_SPEED = 148;
const SLOW_ENEMY_CHASE_ACCELERATION = 420;
const ENEMY_MAX_COUNT = 8;
const ENEMY_SPAWN_TELEGRAPH = 3;
const ENEMY_SPAWN_INTERVAL = [1.62, 3.7];
const GRID_CELLS = 8;
const HOOK_RANGE_CELLS = 4;
const HOOK_SPEED = 1180;
const HOOK_PULL_SPEED_CELLS = 2 / 1.1;
const TELEPORT_CHARGE_TIME = 2;
const DECOY_RANGE_CELLS = 4;
const BASE_GUN_PROJECTILE_SPEED = 560;
const BASE_GUN_PROJECTILE_RADIUS = 7;
const BASE_GUN_PROJECTILE_LIFETIME = 2.2;
const BASE_GUN_COOLDOWN = 10;
const BASE_GUN_MAX_CHARGES = 3;
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
const PLAYER_STOLEN_LASER_SPEED_MULTIPLIER = 1.4;
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
const ENEMY_SHIELD_UP_TIME = 1.2;
const ENEMY_MINE_INTERVAL_MIN = 10;
const ENEMY_MINE_INTERVAL_MAX = 20;
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
const STOLEN_LASER_CHARGES = 7;
const STOLEN_ABILITY_CHARGES = 3;
const STOLEN_SHIELD_CHARGES = 2;
const STOLEN_BLAST_CHARGES = 4;
const STOLEN_SNIPER_CHARGES = 3;
const STOLEN_DECOY_CHARGES = 3;
const STOLEN_MISSILE_CHARGES = 2;
const BLAST_RANGE_CELLS = 4;
const BLAST_MAX_RADIUS = 311 * 1.5;
const BLAST_EXPAND_SPEED = 44;
const DECOY_DURATION = 10;
const DECOY_SIZE = 24;
const PLAYER_DECOY_PASSIVE_TOTAL = 3;
const PLAYER_DECOY_PASSIVE_INTERVAL = 5;
const PLAYER_MINE_PASSIVE_TOTAL = 20;
const PLAYER_MINE_PASSIVE_DURATION = 60;
const PLAYER_MINE_PASSIVE_INTERVAL = PLAYER_MINE_PASSIVE_DURATION / PLAYER_MINE_PASSIVE_TOTAL;
const MINE_LIFETIME = 30;
const MINE_RADIUS = 12;
const REPLICATOR_CLONE_TIME = 10;
const REPLICATOR_HOP_DELAY = 0.28;
const TRICKSTER_ILLUSION_LIFETIME = 8;
const TRICKSTER_ILLUSION_LIMIT = 4;
const DEATH_RESET_DELAY = 0.8;

const player = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  size: 30,
  dragging: false,
  moving: false,
  launched: false,
  restingFor: 0,
  hp: 3,
  maxHp: 3,
  power: 1,
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
};

const enemyMeta = {
  laser: { name: "Красные", color: "#ff5a5a", glow: "rgba(255, 90, 90, 0.55)" },
  shield: { name: "Желтые", color: "#ffc94d", glow: "rgba(255, 201, 77, 0.55)" },
  spray: { name: "Фиолетовые", color: "#b758ff", glow: "rgba(183, 88, 255, 0.55)" },
  mine: { name: "Мины", color: "#51d86b", glow: "rgba(81, 216, 107, 0.5)" },
  brute: { name: "Танки", color: "#ffd44f", glow: "rgba(255, 212, 79, 0.55)" },
  sniper: { name: "Снайперы", color: "#a71d32", glow: "rgba(167, 29, 50, 0.55)" },
  trickster: { name: "Иллюзии", color: "#ff74ca", glow: "rgba(255, 116, 202, 0.5)" },
  grower: { name: "Садовники", color: "#9aea44", glow: "rgba(154, 234, 68, 0.5)" },
  slow: { name: "Белые", color: "#e7edf7", glow: "rgba(231, 237, 247, 0.5)" },
  heal: { name: "Лечилки", color: "#63bfff", glow: "rgba(99, 191, 255, 0.5)" },
  replicator: { name: "Клоны", color: "#7de8ff", glow: "rgba(125, 232, 255, 0.5)" },
};

const campaignLevels = [
  {
    name: "Разминка",
    roster: { laser: 5, shield: 2 },
    maxEnemies: 4,
    spawnInterval: [1.6, 2.7],
  },
  {
    name: "Броня",
    roster: { shield: 5, laser: 4, heal: 1 },
    maxEnemies: 5,
    spawnInterval: [1.45, 2.5],
  },
  {
    name: "Фиолетовый дождь",
    roster: { spray: 5, laser: 3, trickster: 1 },
    maxEnemies: 5,
    spawnInterval: [1.35, 2.35],
  },
  {
    name: "Минное поле",
    roster: { mine: 5, shield: 3, laser: 3 },
    maxEnemies: 6,
    spawnInterval: [1.25, 2.2],
  },
  {
    name: "Тяжелые",
    roster: { brute: 4, shield: 4, heal: 2 },
    maxEnemies: 5,
    spawnInterval: [1.55, 2.7],
  },
  {
    name: "Дальняя линия",
    roster: { sniper: 4, laser: 4, spray: 3 },
    maxEnemies: 6,
    spawnInterval: [1.3, 2.35],
  },
  {
    name: "Сад",
    roster: { grower: 4, slow: 2, shield: 3, laser: 3 },
    maxEnemies: 6,
    spawnInterval: [1.35, 2.4],
  },
  {
    name: "Обманки",
    roster: { trickster: 5, spray: 4, sniper: 2 },
    maxEnemies: 6,
    spawnInterval: [1.2, 2.15],
  },
  {
    name: "Размножение",
    roster: { replicator: 3, grower: 3, mine: 4, slow: 2 },
    maxEnemies: 7,
    spawnInterval: [1.25, 2.2],
  },
  {
    name: "Финальная смесь",
    roster: { laser: 4, shield: 4, spray: 4, sniper: 3, grower: 3, trickster: 3, slow: 2, brute: 2, replicator: 1 },
    maxEnemies: 8,
    spawnInterval: [1.05, 1.9],
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
const blastWaves = [];
const beamEffects = [];
const enemySeeds = [];
const homingMissiles = [];
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
let playerAbilityCapacity = 1;
let playerShieldCooldown = 0;
let playerHookCooldown = 0;
let playerBaseGunCooldowns = Array(BASE_GUN_MAX_CHARGES).fill(0);
let aimPoint = { x: 0, y: 0 };
let moveMarker = null;
let deathResetTimer = 0;
let deathExplosion = null;
let simulationWasActive = false;
let currentTimeScale = INACTIVE_TIME_SCALE;
let gameState = "menu";
let currentLevelIndex = 0;
let levelSpawnQueue = [];
let levelCompleted = false;

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

function getCurrentLevel() {
  return campaignLevels[currentLevelIndex] ?? campaignLevels[0];
}

function getEnemyMaxCount() {
  return getCurrentLevel()?.maxEnemies ?? ENEMY_MAX_COUNT;
}

function getSpawnInterval() {
  return getCurrentLevel()?.spawnInterval ?? ENEMY_SPAWN_INTERVAL;
}

function getLevelRoster(level = getCurrentLevel()) {
  const roster = { ...level.roster };
  const enemyKinds = Object.keys(enemyMeta);

  for (const kind of enemyKinds) {
    if (Object.keys(roster).length >= MIN_ENEMY_TYPES_PER_LEVEL) break;
    if (kind in roster) continue;
    roster[kind] = 1;
  }

  const entries = Object.entries(roster);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  if (total >= MIN_ENEMIES_PER_LEVEL) return roster;

  const scaledEntries = entries.map(([kind, count]) => {
    const exactCount = (count / total) * MIN_ENEMIES_PER_LEVEL;
    return {
      kind,
      count: Math.floor(exactCount),
      remainder: exactCount % 1,
    };
  });

  let remaining = MIN_ENEMIES_PER_LEVEL - scaledEntries.reduce((sum, entry) => sum + entry.count, 0);
  const remainderOrder = [...scaledEntries].sort((left, right) => right.remainder - left.remainder);
  for (const entry of remainderOrder) {
    if (remaining <= 0) break;
    entry.count += 1;
    remaining -= 1;
  }

  return Object.fromEntries(scaledEntries.map((entry) => [entry.kind, entry.count]));
}

function getLevelTotalCount(level = getCurrentLevel()) {
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

function getCellSize() {
  return Math.min(ARENA.width, ARENA.height) / GRID_CELLS;
}

function getHookRange() {
  return getCellSize() * HOOK_RANGE_CELLS;
}

function getLaserRange() {
  return getCellSize() * LASER_RANGE_CELLS * (1 + Math.max(0, player.power - 1) * 0.24);
}

function getBlastRange() {
  return getCellSize() * BLAST_RANGE_CELLS * (1 + Math.max(0, player.power - 1) * 0.16);
}

function getDecoyRange() {
  return getCellSize() * DECOY_RANGE_CELLS;
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
  aimPoint = point;
}

function endDrag() {
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
    updateUi();
    return;
  }

  if (player.dead) {
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
  actionTime += simDt;
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
  updateEnemies(simDt);
  if (player.dead) {
    updateUi();
    return;
  }
  updateEnemySeeds(simDt);
  updatePlayerMinePassive(simDt);
  updatePlayerDecoyPassive(simDt);
  updatePlayerShield(simDt);
  updatePlayerDecoy(simDt);
  updateBlastWaves(simDt);
  if (player.dead) {
    updateUi();
    return;
  }
  updateBeamEffects(simDt);
  updateHomingMissiles(simDt);
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

    let nextSpeed = currentSpeed;
    if (currentSpeed < targetSpeed) {
      nextSpeed = Math.min(targetSpeed, currentSpeed + moveAcceleration * dt);
    } else {
      nextSpeed = Math.max(targetSpeed, currentSpeed - moveBrake * dt);
    }

    const step = Math.min(nextSpeed * dt, distance);
    player.vx = dirX * nextSpeed;
    player.vy = dirY * nextSpeed;
    player.x += dirX * step;
    player.y += dirY * step;

    handleWallBounce(player);
    updateTrail();

    if (player.x <= ARENA.x + player.size * 0.5 || player.x >= ARENA.x + ARENA.width - player.size * 0.5) {
      player.moveTarget = null;
    }
    if (player.y <= ARENA.y + player.size * 0.5 || player.y >= ARENA.y + ARENA.height - player.size * 0.5) {
      player.moveTarget = null;
    }

    if (!player.moveTarget) {
      settlePlayer();
    }
    return;
  }

  settlePlayer();
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
  const brakingSpeed = Math.sqrt(2 * moveBrake * Math.max(0, distance - ENEMY_MOVE_STOP_DISTANCE));
  const maxSpeed =
    enemy.kind === "spray"
      ? SPRAY_ENEMY_DASH_SPEED
      : enemy.kind === "laser"
        ? LASER_ENEMY_DASH_SPEED
        : ENEMY_DASH_SPEED;
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

function beginEnemyActionCycle() {
  for (const enemy of enemies) {
    enemy.turnShotLocked = false;
    if (enemy.phase === "turn_wait") {
      enemy.phase = "recover";
      enemy.phaseTimer = getEnemyRecoverDelay(enemy);
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
    });
  }

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
  if (enemies.length + spawnMarkers.length >= getEnemyMaxCount()) return;

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

function updateEnemies(dt) {
  for (const enemy of enemies) {
    if (enemy.isIllusion) {
      enemy.illusionTimer -= dt;
      if (enemy.illusionTimer <= 0) {
        removeEnemy(enemy.id);
      }
      continue;
    }

    if (enemy.kind === "brute") {
      updateBruteEnemy(enemy, dt);
      continue;
    }

    if (enemy.kind === "sproutling") {
      updateSproutlingEnemy(enemy, dt);
      continue;
    }

    if (enemy.kind === "slow") {
      updateSlowEnemy(enemy, dt);
      continue;
    }

    if (enemy.kind === "replicator") {
      enemy.replicateTimer -= dt;
      if (enemy.replicateTimer <= 0) {
        spawnReplicatorClone(enemy);
        enemy.replicateTimer += REPLICATOR_CLONE_TIME;
      }
    }

    if (enemy.kind === "mine") {
      enemy.mineTimer -= dt;
      if (enemy.mineTimer <= 0) {
        spawnMine(enemy.x, enemy.y, "enemy");
        enemy.mineTimer = randomRange(ENEMY_MINE_INTERVAL_MIN, ENEMY_MINE_INTERVAL_MAX);
      }
    }

    if (enemy.kind === "grower") {
      enemy.seedTimer -= dt;
      if (enemy.seedTimer <= 0) {
        spawnGrowerSeed(enemy.x, enemy.y);
        enemy.seedTimer = randomRange(GROWER_SEED_INTERVAL_MIN, GROWER_SEED_INTERVAL_MAX);
      }
    }

    if (enemy.phase === "turn_wait") {
      continue;
    }

    if (enemy.moving) {
      if (enemy.kind === "laser" && !enemy.turnShotLocked) {
        const target = getEnemyAggroTarget(enemy.x, enemy.y);
        enemy.aimX = target.x;
        enemy.aimY = target.y;
        enemy.phaseTimer -= dt;
        if (enemy.phaseTimer <= 0) {
          fireEnemyLaser(enemy);
          enemy.turnShotLocked = true;
          enemy.phaseTimer = 0;
        }
      }

      updateEnemyMotion(enemy, dt);
      if (!enemy.moving) {
        if (enemy.kind === "shield") {
          enemy.phase = "shield_up";
          enemy.phaseTimer = ENEMY_SHIELD_UP_TIME;
        } else if (enemy.kind === "trickster") {
          spawnTricksterIllusions(enemy);
          enemy.phase = "recover";
          enemy.phaseTimer = ENEMY_DASH_DELAY_AFTER_SHOT;
        } else if (enemy.kind === "replicator") {
          enemy.phase = "recover";
          enemy.phaseTimer = REPLICATOR_HOP_DELAY;
        } else if (enemy.kind === "grower") {
          enemy.phase = "recover";
          enemy.phaseTimer = ENEMY_DASH_DELAY_AFTER_SHOT;
        } else if (enemy.kind === "mine") {
          enemy.phase = "recover";
          enemy.phaseTimer = ENEMY_DASH_DELAY_AFTER_SHOT;
        } else if (enemy.kind === "slow") {
          enemy.phase = "recover";
          enemy.phaseTimer = SLOW_ENEMY_RECOVER_DELAY;
        } else if (enemy.kind === "spray") {
          const target = getEnemyAggroTarget(enemy.x, enemy.y);
          enemy.phase = "spray_charge";
          enemy.phaseTimer = SPRAY_CHARGE_TIME;
          enemy.aimX = target.x;
          enemy.aimY = target.y;
          enemy.shotsRemaining = ENEMY_SPRAY_PROJECTILE_COUNT;
          enemy.shotTimer = 0;
        } else if (enemy.kind === "sniper") {
          const target = getEnemyAggroTarget(enemy.x, enemy.y);
          enemy.phase = "sniper_charge";
          enemy.phaseTimer = SNIPER_CHARGE_TIME;
          enemy.aimX = target.x;
          enemy.aimY = target.y;
        } else if (enemy.kind === "laser") {
          if (enemy.turnShotLocked) {
            enemy.phase = "turn_wait";
            enemy.phaseTimer = 0;
          } else {
            enemy.phase = "recover";
            enemy.phaseTimer = ENEMY_DASH_DELAY_AFTER_SHOT;
          }
        } else {
          const target = getEnemyAggroTarget(enemy.x, enemy.y);
          enemy.phase = "charge";
          enemy.phaseTimer = LASER_CHARGE_TIME;
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
      enemy.phaseTimer -= dt;
      if (enemy.phaseTimer <= 0) {
        fireEnemyLaser(enemy);
        enemy.phase = "turn_wait";
        enemy.phaseTimer = 0;
        enemy.turnShotLocked = true;
      }
      continue;
    }

    if (enemy.phase === "sniper_charge") {
      const target = getEnemyAggroTarget(enemy.x, enemy.y);
      enemy.aimX = target.x;
      enemy.aimY = target.y;
      enemy.phaseTimer -= dt;
      if (enemy.phaseTimer <= 0) {
        fireEnemySniper(enemy);
        enemy.phase = "turn_wait";
        enemy.phaseTimer = 0;
        enemy.turnShotLocked = true;
      }
      continue;
    }

    if (enemy.phase === "spray_charge") {
      // Lock spray aim when the warning lines appear so the attack does not keep rotating.
      enemy.phaseTimer -= dt;
      if (enemy.phaseTimer <= 0) {
        enemy.phase = "spray_fire";
        enemy.shotTimer = 0;
      }
      continue;
    }

    if (enemy.phase === "spray_fire") {
      enemy.shotTimer -= dt;
      while (enemy.phase === "spray_fire" && enemy.shotTimer <= 0 && enemy.shotsRemaining > 0) {
        fireEnemySprayShot(enemy);
        enemy.shotsRemaining -= 1;
        if (enemy.shotsRemaining <= 0) {
          enemy.phase = "turn_wait";
          enemy.phaseTimer = 0;
          enemy.turnShotLocked = true;
          break;
        }
        enemy.shotTimer += SPRAY_SHOT_INTERVAL;
      }
      continue;
    }

    if (enemy.phase === "recover") {
      enemy.phaseTimer -= dt;
      if (enemy.phaseTimer <= 0) {
        launchEnemy(enemy);
      }
      continue;
    }

    if (enemy.phase === "shield_up") {
      enemy.phaseTimer -= dt;
      if (enemy.phaseTimer <= 0) {
        enemy.phase = "turn_wait";
        enemy.phaseTimer = 0;
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
  enemy.phaseTimer = enemy.kind === "laser" && !enemy.turnShotLocked ? LASER_CHARGE_TIME : 0;
}

function createEnemy(kind, x, y) {
  const isBrute = kind === "brute";
  const isSproutling = kind === "sproutling";
  const enemy = {
    id: enemyId += 1,
    x,
    y,
    vx: 0,
    vy: 0,
    size: isBrute ? ENEMY_SIZE * 1.18 : isSproutling ? ENEMY_SIZE * 0.72 : ENEMY_SIZE,
    moving: false,
    restingFor: 0,
    power: randomRange(0.7, 1.4),
    kind,
    hp: isBrute ? BRUTE_CONTACT_HP : 1,
    maxHp: isBrute ? BRUTE_CONTACT_HP : 1,
    renderWidth: isBrute ? ENEMY_SIZE * 1.85 : isSproutling ? ENEMY_SIZE * 0.8 : ENEMY_SIZE,
    renderHeight: isBrute ? ENEMY_SIZE * 1.1 : isSproutling ? ENEMY_SIZE * 0.8 : ENEMY_SIZE,
    ability:
      kind === "shield"
        ? abilities.shield
        : kind === "laser"
          ? abilities.laser
          : kind === "sniper"
            ? abilities.sniper
          : kind === "spray"
            ? abilities.spray
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
    replicateTimer: REPLICATOR_CLONE_TIME,
    turnShotLocked: false,
  };

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

function spawnReplicatorClone(source) {
  if (enemies.length + spawnMarkers.length >= getEnemyMaxCount()) return false;

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
  return "L";
}

function getAbilityCooldownState(abilityKey) {
  if (abilityKey === abilities.hook.key && playerHookCooldown > 0) {
    return {
      remaining: playerHookCooldown,
      duration: HOOK_COOLDOWN,
    };
  }

  if (abilityKey === abilities.shield.key && playerShieldCooldown > 0) {
    return {
      remaining: playerShieldCooldown,
      duration: SHIELD_COOLDOWN,
    };
  }

  return null;
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
  playerBaseGunCooldowns[slotIndex] = BASE_GUN_COOLDOWN;
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
    playerAbilityCapacity = 1;
    reserveAbility = null;
    reserveAbilityCharges = null;
    return;
  }

  currentAbility = reserveAbility;
  currentAbilityCharges = reserveAbilityCharges;
  reserveAbility = null;
  reserveAbilityCharges = null;
  playerAbilityCapacity = 1;
  abilityMode = "primary";
}

function consumeAbilityCharge(slot = "primary") {
  if (slot === "secondary") {
    if (reserveAbilityCharges === null) return;
    reserveAbilityCharges -= 1;
    if (reserveAbilityCharges <= 0) {
      reserveAbility = null;
      reserveAbilityCharges = null;
      playerAbilityCapacity = 1;
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

  player.power = clamp(player.power + enemy.power * 0.35, 1, 4);
  if (enemy.kind === "heal") {
    player.hp = Math.min(player.maxHp, player.hp + 1);
  } else if (enemy.kind === "replicator") {
    playerAbilityCapacity = 2;
    playerHookCooldown = 0;
  } else if (enemy.kind === "trickster") {
    activatePlayerDecoyPassive();
  } else if (enemy.kind === "mine") {
    activatePlayerMinePassive();
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
  };
  playerShieldCooldown = SHIELD_COOLDOWN;
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
  playerHookCooldown = HOOK_COOLDOWN;
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

  if (selectedAbility.key === abilities.sidearm.key) {
    return useBaseGunAbility(point);
  }

  if (selectedAbility.key === abilities.decoy.key) {
    return useDecoyAbility(point);
  }

  if (selectedAbility.key === abilities.missiles.key) {
    return useMissilesAbility(point);
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
    !player.moving &&
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
  trail.length = 0;
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

    let hitEnemy = null;
    for (const enemy of enemies) {
      const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
      if (distance > enemy.size * 0.7 + projectile.radius) continue;
      hitEnemy = enemy;
      break;
    }

    if (!hitEnemy) continue;

    damageEnemy(hitEnemy, 1);
    baseProjectiles.splice(index, 1);
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

function updateBlastWaves(dt) {
  for (let index = blastWaves.length - 1; index >= 0; index -= 1) {
    const blast = blastWaves[index];
    if (!blast) continue;

    blast.radius = Math.min(blast.maxRadius, blast.radius + blast.expandSpeed * dt);

    for (const enemy of enemies) {
      if (blast.hitEnemyIds.has(enemy.id)) continue;
      const distance = Math.hypot(enemy.x - blast.x, enemy.y - blast.y);
      if (distance > blast.radius + enemy.size * 0.5) continue;

      damageEnemy(enemy, 1);
      blast.hitEnemyIds.add(enemy.id);
    }

    if (!blast.hitPlayer) {
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

    let hitEnemy = null;
    for (const enemy of enemies) {
      if (enemy.isIllusion) continue;
      const distance = Math.hypot(enemy.x - missile.x, enemy.y - missile.y);
      if (distance > enemy.size * 0.65 + missile.radius) continue;
      hitEnemy = enemy;
      break;
    }

    if (!hitEnemy) continue;

    damageEnemy(hitEnemy, 1);
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

function updateShieldAuras(dt) {
  if (activePlayerShield) {
    for (let index = enemies.length - 1; index >= 0; index -= 1) {
      const enemy = enemies[index];
      const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      if (distance <= activePlayerShield.radius + enemy.size * 0.4) {
        damageEnemy(enemy, enemy.hp);
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
  }

  for (const enemy of enemies) {
    if (enemy.kind !== "shield" || enemy.phase !== "shield_up") continue;
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance <= getShieldRadius() + player.size * 0.45) {
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
        if (enemy.kind !== "shield" || enemy.phase !== "shield_up") continue;
        const hit = getSegmentCircleHit(
          tail.x,
          tail.y,
          projectile.x,
          projectile.y,
          enemy.x,
          enemy.y,
          getShieldRadius()
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

    applyPlayerHit();
    killEnemy(enemy);
  }
}

function updateMines(dt) {
  for (let index = mines.length - 1; index >= 0; index -= 1) {
    const mine = mines[index];
    if (!mine) continue;

    mine.ttl -= dt;
    if (mine.ttl <= 0) {
      mines.splice(index, 1);
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
  const hit = findFirstEnemyOnBeam(tail.x, tail.y, projectile.x, projectile.y, projectile.length + ENEMY_SIZE);
  if (!hit) return false;

  damageEnemy(hit.enemy, 1);
  return true;
}

function hitEnemyProjectileTarget(projectile) {
  const tail = getProjectileTail(projectile);
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

  applyPlayerHit();
  return true;
}

function applyPlayerHit() {
  if (player.dead || player.hitInvuln > 0) return false;

  player.hp = Math.max(0, player.hp - 1);
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
  baseProjectiles.length = 0;
  blastWaves.length = 0;
  beamEffects.length = 0;
  enemySeeds.length = 0;
  homingMissiles.length = 0;
  playerMinePassive = null;
  playerAbilityCapacity = 1;
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
  deathResetTimer = 0;
  gameState = "playing";
  levelCompleted = false;
  levelSpawnQueue = buildLevelSpawnQueue(level);
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

  player.hp = player.maxHp;
  player.vx = 0;
  player.vy = 0;
  player.moving = false;
  player.launched = false;
  player.restingFor = 0;
  player.moveTarget = null;
  player.power = 1;
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
  baseProjectiles.length = 0;
  blastWaves.length = 0;
  beamEffects.length = 0;
  enemySeeds.length = 0;
  homingMissiles.length = 0;
  playerMinePassive = null;
  playerAbilityCapacity = 1;
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

function killEnemy(enemy, { explode = true } = {}) {
  if (!enemy) return false;

  if (explode) {
    spawnImpactBurst(enemy.x, enemy.y, {
      count: enemy.kind === "brute" ? 30 : enemy.kind === "sproutling" ? 14 : 22,
      speedMin: 110,
      speedMax: enemy.kind === "brute" ? 380 : 300,
      lifeMin: 0.55,
      lifeMax: 0.95,
      sizeMin: enemy.kind === "sproutling" ? 12 : 20,
      sizeMax: enemy.kind === "brute" ? 48 : enemy.kind === "sproutling" ? 22 : 38,
    });
  }

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

  enemy.hp = Math.max(0, (enemy.hp ?? 1) - amount);
  if (enemy.hp <= 0) {
    return killEnemy(enemy);
  }
  return false;
}

function getRosterHtml(level = getCurrentLevel()) {
  return Object.entries(getLevelRoster(level))
    .map(([kind, count]) => {
      const meta = enemyMeta[kind] ?? { name: kind, color: "#ff5a5a", glow: "rgba(255, 90, 90, 0.45)" };
      return `<span class="roster-chip" title="${meta.name}"><span class="roster-chip__swatch" style="--enemy-color:${meta.color};--enemy-glow:${meta.glow}"></span>${meta.name} ${count}</span>`;
    })
    .join("");
}

function updateLevelHud() {
  if (!levelHudEl) return;
  const level = getCurrentLevel();
  levelHudEl.innerHTML = `<span class="level-chip">Уровень ${currentLevelIndex + 1}/10: ${level.name}</span>${getRosterHtml(level)}`;
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
      const rosterText = Object.entries(getLevelRoster(level))
        .map(([kind, count]) => `${enemyMeta[kind]?.name ?? kind} ${count}`)
        .join(", ");
      return `<button class="level-card" type="button" data-level="${index}">
        <span class="level-card__number">${index + 1}</span>
        <span class="level-card__name">${level.name}</span>
        <span class="level-card__meta">${total} врагов: ${rosterText}</span>
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
  if (levelCompleted || player.dead) return;
  if (levelSpawnQueue.length > 0 || spawnMarkers.length > 0 || enemies.length > 0 || enemySeeds.length > 0) return;

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
    abilityHintEl.textContent = readyShots > 0 ? `${readyShots}/3 Ready${switchHint}` : `CD ${nextCooldown.toFixed(1)}s`;
  } else if (selectedAbility.key === abilities.sniper.key && activePlayerSniper) {
    abilityHintEl.textContent = `${activePlayerSniper.timer.toFixed(1)}s`;
  } else if (selectedAbility.key === abilities.teleport.key && activePlayerTeleport) {
    abilityHintEl.textContent = `${activePlayerTeleport.timer.toFixed(1)}s`;
  } else {
    abilityHintEl.textContent = `Click${switchHint}`;
  }
  abilityIconEl.textContent = getAbilityIconKey(selectedAbility.key);
  hpLabelEl.textContent = `HP ${player.hp}/${player.maxHp}`;
  powerLabelEl.textContent = playerMinePassive
    ? `Сила x${player.power.toFixed(1)} | Мины ${playerMinePassive.remaining}`
    : `Сила x${player.power.toFixed(1)}`;
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

    ctx.fillStyle = `rgba(255, 96, 96, ${life * 0.42})`;
    ctx.beginPath();
    ctx.arc(0, 0, burst.size * (0.5 + (1 - life) * 0.65), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 202, 110, ${life * 0.78})`;
    ctx.fillRect(-burst.size * 0.55, -burst.size * 0.18, burst.size * 1.1, burst.size * 0.36);

    ctx.fillStyle = `rgba(255, 245, 220, ${life * 0.7})`;
    ctx.fillRect(-burst.size * 0.24, -burst.size * 0.1, burst.size * 0.48, burst.size * 0.2);
    ctx.restore();
  }
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

function drawAbilityRange() {
  const selectedAbility = getSelectedAbilityState().ability;
  if (
    selectedAbility.key === abilities.teleport.key ||
    selectedAbility.key === abilities.spray.key ||
    selectedAbility.key === abilities.sniper.key ||
    selectedAbility.key === abilities.sidearm.key ||
    selectedAbility.key === abilities.missiles.key
  ) {
    return;
  }
  const range =
    selectedAbility.key === abilities.hook.key
      ? getHookRange()
      : selectedAbility.key === abilities.decoy.key
        ? getDecoyRange()
      : selectedAbility.key === abilities.blast.key
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
      : selectedAbility.key === abilities.blast.key
        ? "rgba(245, 244, 222, 0.22)"
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

function drawEnemy(enemy) {
  const width = enemy.renderWidth || enemy.size;
  const height = enemy.renderHeight || enemy.size;
  const half = enemy.size * 0.5;
  const halfW = width * 0.5;
  const halfH = height * 0.5;
  const angle = Math.atan2(enemy.vy, enemy.vx);

  ctx.save();
  ctx.translate(enemy.x, enemy.y);
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
      : enemy.kind === "shield"
      ? "rgba(255, 212, 92, 0.45)"
      : enemy.kind === "slow"
        ? "rgba(245, 248, 255, 0.45)"
      : enemy.kind === "grower" || enemy.kind === "sproutling"
        ? "rgba(166, 255, 92, 0.46)"
      : enemy.kind === "sniper"
        ? "rgba(156, 18, 42, 0.48)"
      : enemy.kind === "trickster"
        ? "rgba(255, 116, 202, 0.45)"
      : enemy.kind === "spray"
        ? "rgba(203, 100, 255, 0.45)"
        : enemy.kind === "mine"
          ? "rgba(84, 255, 118, 0.42)"
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
  } else if (enemy.kind === "mine") {
    ctx.strokeStyle = "rgba(235, 255, 235, 0.86)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 6);
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
  } else if (enemy.phase === "shield_up") {
    const shieldProgress = clamp(enemy.phaseTimer / ENEMY_SHIELD_UP_TIME, 0, 1);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 224, 122, ${0.42 + shieldProgress * 0.32})`;
    ctx.lineWidth = 4;
    ctx.arc(0, 0, getShieldRadius(), 0, Math.PI * 2);
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
  const angle = Math.atan2(player.vy, player.vx);
  const shakePower = player.hitShake > 0 ? player.hitShake * 8 : 0;
  const shakeX = shakePower > 0 ? (Math.random() - 0.5) * shakePower : 0;
  const shakeY = shakePower > 0 ? (Math.random() - 0.5) * shakePower : 0;

  ctx.save();
  ctx.translate(player.x + shakeX, player.y + shakeY);
  ctx.rotate(player.moving ? angle : Math.PI * 0.25);

  const gradient = ctx.createRadialGradient(-6, -8, 6, 0, 0, player.size);
  gradient.addColorStop(0, player.hitFlash > 0 ? "#ffe4e4" : "#fff2a8");
  gradient.addColorStop(0.38, player.hitFlash > 0 ? "#ff7a7a" : "#ff9f45");
  gradient.addColorStop(1, player.hitFlash > 0 ? "#ff315f" : "#ff3d81");

  ctx.shadowColor = "rgba(255, 88, 136, 0.35)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  ctx.arc(-radius * 0.36, -radius * 0.34, radius * 0.28, 0, Math.PI * 2);
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
canvas.addEventListener("wheel", handleWheel, { passive: false });
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
window.addEventListener("resize", resize);
campaignOverlayEl?.addEventListener("click", (event) => {
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
