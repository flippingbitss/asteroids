import { Polygon } from "./collider";
import { Vec2 } from "./vec2";

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
