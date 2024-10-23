import { Vec2 } from "./vec2";
import { ctx, HEIGHT, WIDTH } from "./view";

export function clearScreen() {
  ctx.fillStyle = "#222222";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

export function drawShape(pos: Vec2, vertices: Array<Vec2>) {
  ctx.save();
  ctx.strokeStyle = "white";
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
