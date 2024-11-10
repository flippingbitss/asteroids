import { Collider, ColliderType, Polygon } from "./collider";
import { Color, drawShape } from "./draw";
import { EntityCollection } from "./entities";
import { Entity } from "./entity";
import { applyBasicMovement } from "./movement";
import { Vec2 } from "./vec2";

export enum AsteroidSize {
  Small = 0,
  Medium = 1,
  Large = 2,
}

const SIZES = [2, 5, 8];

const ASTEROID_SHAPES = [
  // [x, y]
  [
    [-5.13, -0.91],
    [-3, 0],
    [-4.7, 1.29],
    [-2.22, 4],
    [2.13, 4],
    [4.8, 1.3],
    [4.74, -0.91],
    [2.68, -3.788],
    [0.131, -4.0],
    [-0.314, -1.33],
    [-2.49, -3.72],
  ],

  [
    [-2.34, -3.8],
    [-0.83, -2.83],
    [2.66, -3.83],
    [5.1, -1.14],
    [2.7, 0.77],
    [4.76, 1.77],
    [2.45, 3.74],
    [0.15, 2.79],
    [-2.21, 3.57],
    [-4.7, 1.3],
    [-3.56, 0.02],
    [-4.66, -1.68],
  ],
  [
    [-4.8, 1.6],
    [-1.32, 1.73],
    [-2.4, 3.6],
    [1.3, 3.6],
    [4.93, 1.29],
    [4.74, 0.66],
    [1.28, -0.05],
    [4.68, -2.06],
    [2.47, -3.95],
    [1, -3],
    [-2.46, -3.87],
    [-5, -1],
  ],
];

export function hitAsteroid(asteroid: Asteroid, entities: EntityCollection) {
  if (asteroid.life < 0) {
    entities.remove(asteroid);
  }
  asteroid.life--;
  asteroid.updateGeometry();
  const child = asteroid.clone();
  const dx = Math.random() - 0.5;
  const dy = Math.random() - 0.5;
  const dir = new Vec2(dx, dy).normalize();
  child.vel.x = child.vel.x * dir.x;
  child.vel.y = child.vel.y * dir.y;
  entities.asteroids.push(child);
}

export class Asteroid implements Entity {
  name = "asteroid";
  vertices: Array<Vec2>;

  constructor(
    public pos: Vec2,
    public vel: Vec2,
    public life: number,
    public shapeId: number,
  ) {
    // construct a shape from pre-defined shapes
    this.vertices = [];
    this.updateGeometry();
  }

  updateGeometry() {
    this.vertices = ASTEROID_SHAPES[this.shapeId].map(([x, y]) =>
      new Vec2(x, y).scale(this.size),
    );
  }

  get size() {
    return SIZES[this.life];
  }

  collider(): Collider {
    return {
      type: ColliderType.Polygon,
      polygon: new Polygon(this.pos, this.vertices),
    };
  }

  update(dt: number, _now: number, _entities: EntityCollection) {
    applyBasicMovement(this, dt, { wrap: true });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = Color.Entities;
    drawShape(ctx, this.pos, this.vertices);
  }

  clone() {
    return new Asteroid(
      this.pos.copy(),
      this.vel.copy(),
      this.life,
      this.shapeId,
    );
  }
}
