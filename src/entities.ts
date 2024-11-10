import { Asteroid } from "./asteroid";
import { Bullet } from "./bullet";
import { Entity } from "./entity";
import { Explosion } from "./explosion";
import { Ship } from "./player";

export class EntityCollection {
  public ship: Ship;
  public asteroids: Array<Asteroid>;
  public bullets: Array<Bullet>;
  public explosions: Array<Explosion>;

  constructor(ship: Ship) {
    this.ship = ship;
    this.asteroids = [];
    this.bullets = [];
    this.explosions = [];
  }

  *all(): Generator<Entity> {
    yield this.ship;
    yield* this.asteroids;
    yield* this.bullets;
    yield* this.explosions;
  }

  remove(entity: Entity) {
    // todo: handle removing player ship
    this.bullets = this.bullets.filter((x) => x !== entity);
    this.asteroids = this.asteroids.filter((x) => x !== entity);
    this.explosions = this.explosions.filter((x) => x !== entity);
  }
}
