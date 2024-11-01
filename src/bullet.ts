import { Color, fillCircle } from "./draw";
import { EntityCollection } from "./entities";
import { Entity } from "./entity";
import { applyBasicMovement } from "./movement";
import { Vec2 } from "./vec2";
import { CENTER } from "./view";

const BULLET_MAX_TRAVEL_DISTANCE = CENTER.magnitude();

export class Bullet implements Entity {
  name = "bullet";
  dist: number;

  constructor(
    public pos: Vec2,
    public vel: Vec2,
  ) {
    this.dist = 0;
  }

  update(dt: number, _now: number, entities: EntityCollection) {
    applyBasicMovement(this, dt, { wrap: true });
    this.dist += this.vel.scale(dt).magnitude();
    if (this.dist > BULLET_MAX_TRAVEL_DISTANCE) {
      entities.remove(this);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = Color.Entities;
    fillCircle(ctx, this.pos, 1);
  }
}
