import { Bullet } from "./bullet";
import { EntityCollection } from "./entities";
import { Entity } from "./entity";
import { Vec2 } from "./vec2";

const BULLET_SPEED = 0.3;
const BULLET_FIRE_RATE_IN_MS = 500;

export class Cannon {
  bulletSpawnLocation?: Vec2;
  dir?: Vec2;

  isShooting: boolean;
  lastFireTime = 0;

  constructor(private _owner: Entity) {
    this.isShooting = false;
  }

  shoot(bulletSpawnLocation: Vec2, dir: Vec2) {
    this.bulletSpawnLocation = bulletSpawnLocation;
    this.dir = dir;
    this.isShooting = true;
  }

  update(dt: number, now: number, entities: EntityCollection) {
    if (this.isShooting && this.bulletSpawnLocation && this.dir) {
      const interval = now - this.lastFireTime;
      if (interval > BULLET_FIRE_RATE_IN_MS) {
        const bullet = new Bullet(
          this.bulletSpawnLocation,
          this.dir.scale(BULLET_SPEED),
        );
        entities.bullets.push(bullet);
        this.isShooting = false;
        this.lastFireTime = now;
      }
    }
  }
}
