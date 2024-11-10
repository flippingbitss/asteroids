import { Collider } from "./collider";
import { Color, fillCircle } from "./draw";
import { EntityCollection } from "./entities";
import { Entity } from "./entity";
import { Vec2 } from "./vec2";

const EXPLOSION_TTL_IN_MS = 800;
const NUM_SHARDS = 10;
const SHARD_SPEED = 0.2;
const SHARD_DRAG_COEFF = 0.01;

type Shard = {
  pos: Vec2;
  vel: Vec2;
};

export class Explosion implements Entity {
  name = "explosion";
  vel = Vec2.zero;
  pos = Vec2.zero;

  constructor(
    private createdAt: number,
    private shards: Array<Shard>,
  ) {}

  collider(): Collider {
    throw new Error("Method not implemented.");
  }

  update(dt: number, now: number, entities: EntityCollection): void {
    if (now - this.createdAt > EXPLOSION_TTL_IN_MS) {
      entities.remove(this);
    }
    for (const shard of this.shards) {
      shard.pos = shard.pos.add(shard.vel.scale(dt));
      shard.vel = shard.vel.scale(1 - SHARD_DRAG_COEFF);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (const shard of this.shards) {
      ctx.fillStyle = Color.Entities;
      fillCircle(ctx, shard.pos, 1);
    }
  }
}

export function spawnExplosion(pos: Vec2, now: number) {
  const shards: Array<Shard> = [];
  for (let i = 0; i < NUM_SHARDS; i++) {
    const velX = Math.random() - 0.5;
    const velY = Math.random() - 0.5;
    const vel = new Vec2(velX, velY).scale(SHARD_SPEED);
    const shard = { pos, vel };
    shards.push(shard);
  }

  return new Explosion(now, shards);
}
