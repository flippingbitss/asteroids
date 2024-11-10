import { Asteroid, AsteroidSize, hitAsteroid } from "./asteroid";
import { Bullet } from "./bullet";
import { checkCollisions, CollisionType } from "./collision";
import { clearScreen } from "./draw";
import { EntityCollection } from "./entities";
import { Keyboard } from "./keyboard";
import { Ship } from "./player";
import { Ticker } from "./ticker";
import { Vec2 } from "./vec2";
import { CENTER } from "./view";

const FIXED_DELTA_TIME = 1000 / 120;

export class Game {
  private entities: EntityCollection;

  private ticker: Ticker;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private input: Keyboard,
  ) {
    const player = new Ship(new Vec2(10, 10), new Vec2(0.2, 0.2), this.input);
    this.entities = new EntityCollection(player);

    this.ticker = new Ticker(FIXED_DELTA_TIME);
    this.ticker.onFixedUpdate(this.update.bind(this));
    this.ticker.onRender(this.draw.bind(this, this.ctx));

    const asteroid = new Asteroid(new Vec2(200, 200), new Vec2(0.1, 0.1), 2, 2);
    this.entities.asteroids.push(asteroid);
  }

  handleCollisions() {
    // check collisions across all collidable entities
    // take action based on the collision
    const collisions = checkCollisions(this.entities);
    for (const collision of collisions) {
      if (collision.type === CollisionType.BulletAsteroid) {
        const { bullet, asteroid } = collision;
        this.entities.remove(bullet);
        hitAsteroid(asteroid, this.entities);
      }
    }
  }

  start() {
    this.ticker.start();
  }

  update(dt: number, now: number) {
    for (const entity of this.entities.all()) {
      entity.update(dt, now, this.entities);
    }

    this.handleCollisions();
  }

  draw(ctx: CanvasRenderingContext2D) {
    clearScreen(ctx);
    for (const entity of this.entities.all()) {
      entity.draw(ctx);
    }
    //
    // drawDebugGrid(ctx, this.polygonCollider.polygon.pos, 150, (point) => {
    //   return pointInsidePolygon(point, this.polygonCollider.polygon);
    // });
  }
}
