import { Asteroid, AsteroidSize } from "./asteroid";
import { Bullet } from "./bullet";
import { PolygonCollider } from "./collider";
import { pointInsidePolygon } from "./collision";
import { clearScreen, drawDebugGrid } from "./draw";
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

  polygonCollider: PolygonCollider;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private input: Keyboard,
  ) {
    const player = new Ship(new Vec2(10, 10), new Vec2(0.2, 0.2), this.input);
    this.entities = new EntityCollection(player);

    this.ticker = new Ticker(FIXED_DELTA_TIME);
    this.ticker.onFixedUpdate(this.update.bind(this));
    this.ticker.onRender(this.draw.bind(this, this.ctx));

    this.entities.bullets.push(new Bullet(new Vec2(200, 200), new Vec2(1, 0)));

    const asteroid = new Asteroid(
      CENTER,
      // new Vec2(200, 200),
      Vec2.zero,
      // new Vec2(0.1, 0.1),
      AsteroidSize.Large,
      2,
    );
    this.entities.asteroids.push(asteroid);

    this.polygonCollider = asteroid.collider() as PolygonCollider;
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

    drawDebugGrid(ctx, this.polygonCollider.polygon.pos, 150, (point) => {
      return pointInsidePolygon(point, this.polygonCollider.polygon);
    });
  }
}
