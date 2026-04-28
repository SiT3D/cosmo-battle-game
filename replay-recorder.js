class GameReplayRecorder {
  constructor(getClock = () => ({})) {
    this.getClock = getClock;
    this.mode = "idle";
    this.session = null;
    this.events = [];
    this.randomValues = [];
    this.lastRecording = null;
    this.playbackCursor = 0;
  }

  beginRecording(meta = {}) {
    this.archiveCurrentRecording();
    this.mode = "recording";
    this.playbackCursor = 0;
    this.session = {
      version: 1,
      startedAt: new Date().toISOString(),
      meta: this.clone(meta),
    };
    this.events = [];
    this.randomValues = [];
    this.record("session_start", this.session.meta);
  }

  stopRecording() {
    if (this.mode === "recording") {
      this.record("session_stop", {});
    }
    this.archiveCurrentRecording();
    this.mode = "idle";
  }

  isRecording() {
    return this.mode === "recording";
  }

  recordPlayerInput(action, payload = {}) {
    this.record("player_input", { action, ...payload });
  }

  recordEnemyInput(action, payload = {}) {
    this.record("enemy_input", { action, ...payload });
  }

  recordRandom(value) {
    if (this.mode === "recording") {
      this.randomValues.push(value);
    }
    return value;
  }

  record(type, payload = {}) {
    if (this.mode !== "recording") return null;

    const clock = this.getClock() ?? {};
    const event = {
      index: this.events.length,
      type,
      worldTime: this.round(clock.worldTime ?? 0),
      actionTime: this.round(clock.actionTime ?? 0),
      frameTime: this.round(clock.frameTime ?? performance.now()),
      randomCursor: this.randomValues.length,
      payload: this.clone(payload),
    };
    this.events.push(event);
    return event;
  }

  getRecording() {
    return {
      session: this.clone(this.session),
      events: this.clone(this.events),
      randomValues: this.clone(this.randomValues),
    };
  }

  getLastRecording() {
    return this.clone(this.lastRecording);
  }

  exportJson(spaces = 2) {
    return JSON.stringify(this.getRecording(), null, spaces);
  }

  load(recording) {
    const parsed = typeof recording === "string" ? JSON.parse(recording) : recording;
    this.session = this.clone(parsed?.session ?? null);
    this.events = this.clone(parsed?.events ?? []);
    this.randomValues = this.clone(parsed?.randomValues ?? []);
    this.playbackCursor = 0;
    this.mode = "idle";
    return this.getRecording();
  }

  beginPlayback(recording = null) {
    if (recording) {
      this.load(recording);
    }
    this.mode = "playback";
    this.playbackCursor = 0;
  }

  stopPlayback() {
    this.mode = "idle";
    this.playbackCursor = 0;
  }

  getPlaybackEventsUpTo(actionTime) {
    if (this.mode !== "playback") return [];

    const due = [];
    while (
      this.playbackCursor < this.events.length &&
      this.events[this.playbackCursor].actionTime <= actionTime
    ) {
      due.push(this.clone(this.events[this.playbackCursor]));
      this.playbackCursor += 1;
    }
    return due;
  }

  round(value) {
    return Math.round(Number(value || 0) * 1000) / 1000;
  }

  clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  archiveCurrentRecording() {
    if (!this.session || this.events.length === 0) return;
    this.lastRecording = this.getRecording();
  }
}

window.GameReplayRecorder = GameReplayRecorder;
