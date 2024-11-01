import { Asteroid, AsteroidSize } from "./asteroid";
import { Bullet } from "./bullet";
import { clearScreen } from "./draw";
import { EntityCollection } from "./entities";
import { Keyboard } from "./keyboard";
import { Ship } from "./player";
import { Ticker } from "./ticker";
import { Vec2 } from "./vec2";
import { CENTER } from "./view";

const FIXED_DELTA_TIME = 1000 / 120;

export class Game {
  // ship
  // bullets, asteroids, behaviors

  private entities: EntityCollection;

  private ticker: Ticker;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private input: Keyboard,
  ) {
    const player = new Ship(CENTER.copy(), new Vec2(0, 0), this.input);
    this.entities = new EntityCollection(player);

    this.ticker = new Ticker(FIXED_DELTA_TIME);
    this.ticker.onFixedUpdate(this.update.bind(this));
    this.ticker.onRender(this.draw.bind(this, this.ctx));

    this.entities.asteroids.push(
      new Asteroid(
        new Vec2(200, 200),
        new Vec2(0.1, 0.1),
        AsteroidSize.Large,
        2,
      ),
    );
  }

  start() {
    this.ticker.start();
  }

  update(dt: number, now: number) {
    for (const entity of this.entities.all()) {
      entity.update(dt, now, this.entities);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    clearScreen(ctx);
    for (const entity of this.entities.all()) {
      entity.draw(ctx);
    }
  }
}
