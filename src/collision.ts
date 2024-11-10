import { Asteroid } from "./asteroid";
import { Bullet } from "./bullet";
import { Collider, ColliderType, Polygon } from "./collider";
import { EntityCollection } from "./entities";
import { Ship } from "./player";
import { Vec2 } from "./vec2";

export enum CollisionType {
  BulletAsteroid,
  BulletShip,
}

type Collision =
  | {
      type: CollisionType.BulletAsteroid;
      bullet: Bullet;
      asteroid: Asteroid;
    }
  | {
      type: CollisionType.BulletShip;
      bullet: Bullet;
      ship: Ship;
    };

export function checkCollisions(entities: EntityCollection): Array<Collision> {
  const collisions: Array<Collision> = [];
  // bullet - asteroid
  for (const bullet of entities.bullets) {
    for (const asteroid of entities.asteroids) {
      if (checkCollision(bullet.collider(), asteroid.collider())) {
        const collision: Collision = {
          type: CollisionType.BulletAsteroid,
          bullet: bullet,
          asteroid: asteroid,
        };
        collisions.push(collision);
        break;
      }
    }
  }

  return collisions;
}

function checkCollision(us: Collider, them: Collider): boolean {
  // skip point-point aka. bullet-bullet
  if (us.type === ColliderType.Point && them.type === ColliderType.Polygon) {
    return pointInsidePolygon(us.pos, them.polygon);
  } else if (
    us.type === ColliderType.Polygon &&
    them.type === ColliderType.Point
  ) {
    return pointInsidePolygon(them.pos, us.polygon);
  }

  return false;

  // todo: polygon-polygon
}

export function pointInsidePolygon(point: Vec2, polygon: Polygon) {
  let inside = false;

  const { x: xp, y: yp } = point;

  for (const [va, vb] of polygon.edges()) {
    const { x: x1, y: y1 } = va;
    const { x: x2, y: y2 } = vb;

    const withinY = yp > y2 !== yp > y1;

    if (withinY) {
      const slope = (y2 - y1) / (x2 - x1);
      if (slope === 0) {
        continue;
      }
      const xIntersect = x1 + (yp - y1) / slope;
      const withinX = xp < xIntersect;

      if (withinX) {
        inside = !inside;
      }
    }
  }
  return inside;
}
