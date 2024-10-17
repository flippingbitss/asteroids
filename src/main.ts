import { Key, Keyboard } from "./keyboard";
import "./style.css";
import { Vec2 } from "./vec2";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;
const input = new Keyboard(window);

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

const FIXED_DELTA_TIME = 1000 / 120;

const player = {
  angle: 0,
  pos: new Vec2(100, 100),
  vel: new Vec2(0.33, 0),
};

function drawPlayer() {
  const height = 15;
  const width = 10;

  const vertices = [
    new Vec2(height, 0),
    new Vec2(-height, -width),
    new Vec2(-height, width),
  ].map((v) => v.rotate(player.angle));

  ctx.save();
  ctx.strokeStyle = "white";
  ctx.translate(player.pos.x, player.pos.y);
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
function clearScreen() {
  ctx.fillStyle = "#222222";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function update(dt: number) {
  if (input.isKeyDown(Key.ArrowLeft)) {
    player.angle--;
  }
  if (input.isKeyDown(Key.ArrowRight)) {
    player.angle++;
  }
  player.pos.x += player.vel.x * dt;
  player.pos.y += player.vel.y * dt;
  player.pos.x %= WIDTH;
}

let lastTime = 0;
let lag = 0;

function loop(now: number) {
  const deltaTime = now - lastTime;
  lag += deltaTime;
  lastTime = now;

  clearScreen();

  while (lag >= FIXED_DELTA_TIME) {
    update(FIXED_DELTA_TIME);
    lag -= FIXED_DELTA_TIME;
  }

  drawPlayer();
  // 16.666 ms
  requestAnimationFrame(loop);
}

loop(performance.now());
