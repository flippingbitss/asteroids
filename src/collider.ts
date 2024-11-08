// point to polygon (bullet hits asteroid)
// polygon to polygon (ship hits asteroid, saucer hits asteroid)

import { Vec2 } from "./vec2";

export enum ColliderType {
  Point,
  Polygon,
}

export type PointCollider = {
  type: ColliderType.Point;
  pos: Vec2;
};

export type PolygonCollider = {
  type: ColliderType.Polygon;
  polygon: Polygon;
};

export type Collider = PointCollider | PolygonCollider;

export class Polygon {
  constructor(
    public pos: Vec2,
    public geometry: Array<Vec2>,
  ) {}

  *edges(): Generator<[Vec2, Vec2]> {
    for (let i = 0; i < this.geometry.length; i++) {
      const va = this.geometry[i].add(this.pos);
      const vb = this.geometry[(i + 1) % this.geometry.length].add(this.pos);
      yield [va, vb];
    }
  }
}
