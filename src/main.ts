import { Asteroid, AsteroidSize } from "./asteroid";
import { clearScreen, drawShape } from "./draw";
import { Key, Keyboard } from "./keyboard";
import { applyBasicMovement } from "./movement";
import { Ship } from "./player";
import "./style.css";
import { Vec2 } from "./vec2";
import { ctx } from "./view";

const FIXED_DELTA_TIME = 1000 / 120;

const input = new Keyboard(window);
const player = new Ship(new Vec2(100, 100), new Vec2(0.2, 0.2), input);
const asteroid = new Asteroid(
  new Vec2(200, 200),
  new Vec2(0.1, 0.1),
  AsteroidSize.Large,
  2,
);

function update(dt: number, now: number) {
  player.update(dt, now);
  asteroid.update(dt, now);
}

function draw(ctx: CanvasRenderingContext2D) {
  player.draw(ctx);
  asteroid.draw(ctx);
}

let lastTime = 0;
let lag = 0;
function loop(now: number) {
  const deltaTime = now - lastTime;
  lag += deltaTime;
  lastTime = now;

  clearScreen(ctx);

  while (lag >= FIXED_DELTA_TIME) {
    update(FIXED_DELTA_TIME, now);
    lag -= FIXED_DELTA_TIME;
  }

  draw(ctx);

  // 16.666 ms
  requestAnimationFrame(loop);
}

loop(performance.now());
