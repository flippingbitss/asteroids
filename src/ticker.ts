type UpdateCallback = (dt: number, now: number) => void;

export class Ticker {
  private lastTime = 0;
  private lag = 0;
  private handle = 0;

  private fixedUpdateListener?: UpdateCallback;
  private renderListener?: UpdateCallback;

  constructor(private fixedDeltaTime: number) {
    this.loop = this.loop.bind(this);
  }

  onFixedUpdate(callback: UpdateCallback) {
    this.fixedUpdateListener = callback;
  }

  onRender(callback: UpdateCallback) {
    this.renderListener = callback;
  }

  start() {
    this.lastTime = performance.now();
    this.handle = requestAnimationFrame(this.loop);
  }

  end() {
    cancelAnimationFrame(this.handle);
  }

  private loop(now: number) {
    const deltaTime = now - this.lastTime;
    this.lag += deltaTime;
    this.lastTime = now;

    while (this.lag >= this.fixedDeltaTime) {
      this.fixedUpdateListener?.(this.fixedDeltaTime, now);
      this.lag -= this.fixedDeltaTime;
    }

    this.renderListener?.(deltaTime, now);

    this.handle = requestAnimationFrame(this.loop);
  }
}
