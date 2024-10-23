import { WIDTH, HEIGHT } from "./view";

// TODO: Entity to a base class for player, asteroids, bullets
type Entity = any;

export function applyBasicMovement(
  entity: Entity,
  dt: number,
  opts: { wrap: boolean },
) {
  entity.pos.x += entity.vel.x * dt;
  entity.pos.y += entity.vel.y * dt;

  if (opts.wrap) {
    if (entity.pos.x < 0) entity.pos.x += WIDTH;
    if (entity.pos.y < 0) entity.pos.y += HEIGHT;
    entity.pos.x %= WIDTH;
    entity.pos.y %= HEIGHT;
  }
}
