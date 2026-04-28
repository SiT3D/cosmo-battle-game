class GameReplayPlayer {
  constructor({ getClock = () => ({}), handlers = {} } = {}) {
    this.getClock = getClock;
    this.handlers = handlers;
    this.recording = null;
    this.events = [];
    this.cursor = 0;
    this.state = "idle";
    this.startedAt = 0;
    this.playbackTime = 0;
  }

  load(recording) {
    const parsed = typeof recording === "string" ? JSON.parse(recording) : recording;
    this.recording = this.clone(parsed ?? null);
    this.events = this.clone(parsed?.events ?? []);
    this.cursor = 0;
    this.playbackTime = 0;
    this.state = "idle";
    return this.recording;
  }

  start(recording = null) {
    if (recording) {
      this.load(recording);
    }
    if (!this.recording) return false;

    this.cursor = 0;
    this.playbackTime = 0;
    this.startedAt = performance.now();
    this.state = "playing";
    this.emit("playback_start", {
      recording: this.clone(this.recording),
    });
    return true;
  }

  stop(reason = "manual") {
    if (this.state === "idle") return;

    this.state = "idle";
    this.emit("playback_stop", {
      reason,
      cursor: this.cursor,
      total: this.events.length,
    });
  }

  isPlaying() {
    return this.state === "playing";
  }

  update(dt = null) {
    if (!this.isPlaying()) return [];

    const clock = this.getClock() ?? {};
    this.playbackTime = Number.isFinite(clock.actionTime)
      ? clock.actionTime
      : this.playbackTime + Math.max(0, dt ?? 0);

    const emitted = [];
    while (this.cursor < this.events.length && this.events[this.cursor].actionTime <= this.playbackTime) {
      const event = this.clone(this.events[this.cursor]);
      this.cursor += 1;
      this.emitEvent(event);
      emitted.push(event);
    }

    if (this.cursor >= this.events.length) {
      this.stop("complete");
    }

    return emitted;
  }

  emitEvent(event) {
    const action = event?.payload?.action;
    const actionKey = action ? `${event.type}:${action}` : null;
    const handler = this.handlers[actionKey] ?? this.handlers[event.type] ?? this.handlers.default;
    if (handler) {
      handler(event, this);
    }
    this.emit("event", { event });
  }

  on(name, handler) {
    if (!this.listeners) this.listeners = {};
    if (!this.listeners[name]) this.listeners[name] = new Set();
    this.listeners[name].add(handler);
    return () => this.listeners[name].delete(handler);
  }

  emit(name, payload) {
    if (!this.listeners?.[name]) return;
    for (const handler of this.listeners[name]) {
      handler(payload, this);
    }
  }

  clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }
}

window.GameReplayPlayer = GameReplayPlayer;
