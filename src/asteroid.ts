import { Color, drawShape } from "./draw";
import { applyBasicMovement } from "./movement";
import { Vec2 } from "./vec2";

export enum AsteroidSize {
  Small = 2,
  Medium = 5,
  Large = 8,
}

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

export class Asteroid {
  vertices: Array<Vec2>;

  constructor(
    public pos: Vec2,
    public vel: Vec2,
    public size: AsteroidSize,
    public shapeId: number,
  ) {
    // construct a shape from pre-defined shapes
    this.vertices = ASTEROID_SHAPES[this.shapeId].map(([x, y]) =>
      new Vec2(x, y).scale(this.size),
    );
  }

  update(dt: number, _now: number) {
    applyBasicMovement(this, dt, { wrap: true });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = Color.Entities;
    drawShape(ctx, this.pos, this.vertices);
  }
}
