import { Collider } from "./collider";
import { EntityCollection } from "./entities";
import { Vec2 } from "./vec2";

export interface Entity {
  name: string;
  pos: Vec2;
  vel: Vec2;

  collider(): Collider;

  update(dt: number, now: number, entities: EntityCollection): void;
  draw(ctx: CanvasRenderingContext2D): void;
}
