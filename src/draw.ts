import { Vec2 } from "./vec2";
import { HEIGHT, WIDTH } from "./view";

export enum Color {
  Entities = "white",
  Background = "#222222",
}

export function clearScreen(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = Color.Background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

export function drawShape(
  ctx: CanvasRenderingContext2D,
  pos: Vec2,
  vertices: Array<Vec2>,
) {
  ctx.save();
  ctx.strokeStyle = Color.Entities;
  ctx.translate(pos.x, pos.y);
  ctx.beginPath();
  const [tip, ...tail] = vertices;
  ctx.moveTo(tip.x, tip.y);
  for (const vertex of tail) {
    ctx.lineTo(vertex.x, vertex.y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

export function fillCircle(
  ctx: CanvasRenderingContext2D,
  pos: Vec2,
  radius: number,
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
export function fillRect(
  ctx: CanvasRenderingContext2D,
  pos: Vec2,
  w: number,
  h: number,
) {
  ctx.save();
  ctx.fillRect(pos.x, pos.y, w, h);
  ctx.restore();
}

export function drawDebugGrid(
  ctx: CanvasRenderingContext2D,
  pos: Vec2,
  size: number,
  predicate: (point: Vec2) => boolean,
) {
  for (let x = -size; x < size; x += 5) {
    for (let y = -size; y < size; y += 5) {
      const offset = new Vec2(x, y);
      const pointPos = pos.add(offset);
      if (predicate(pointPos)) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "red";
      }
      ctx.fillRect(pointPos.x, pointPos.y, 2, 2);
    }
  }
}
