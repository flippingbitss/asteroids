import { clearScreen, drawShape } from "./draw";
import { Key, Keyboard } from "./keyboard";
import "./style.css";
import { Vec2 } from "./vec2";
import { ctx, HEIGHT, WIDTH } from "./view";

const input = new Keyboard(window);

const FIXED_DELTA_TIME = 1000 / 120;

const PLAYER_THRUST = 0.05;
const PLAYER_MAX_SPEED = 0.4;
const PLAYER_DRAG = 0.015;
const PLAYER_FLAME_PULSE_INTERVAL = 100;

const player = {
  angle: 0,
  thrust: 0,
  lastPulseTime: 0,
  pulse: false,
  pos: new Vec2(100, 100),
  vel: new Vec2(0.33, 0),

  dir(): Vec2 {
    const angleInRadians = (this.angle * Math.PI) / 180;
    const x = Math.cos(angleInRadians);
    const y = Math.sin(angleInRadians);
    return new Vec2(x, y);
  },
};

function drawPlayer() {
  const height = 15;
  const width = 10;

  const vertices = [
    new Vec2(height, 0),
    new Vec2(-height, -width),
    new Vec2(-height + width / 3, -width / 2),
    new Vec2(-height + width / 3, +width / 2),
    new Vec2(-height, width),
  ].map((v) => v.rotate(player.angle));

  drawShape(player.pos, vertices);

  if (player.thrust > 0 && player.pulse) {
    const flameVertices = [
      new Vec2(-height + width / 4, -width / 3),
      new Vec2(-height - width / 4, 0),
      new Vec2(-height + width / 4, +width / 3),
    ].map((v) => v.rotate(player.angle));

    drawShape(player.pos, flameVertices);
  }
}

function update(dt: number, now: number) {
  player.thrust = 0;
  if (input.isKeyDown(Key.ArrowLeft)) {
    player.angle--;
  }
  if (input.isKeyDown(Key.ArrowRight)) {
    player.angle++;
  }
  if (input.isKeyDown(Key.ShiftLeft)) {
    player.thrust = PLAYER_THRUST;
  }

  if (now - player.lastPulseTime > PLAYER_FLAME_PULSE_INTERVAL) {
    player.pulse = !player.pulse;
    player.lastPulseTime = now;
  }

  const mass = 1;
  // F = M * A
  // A = F / M
  // V = dt * A;

  const force = player.dir().scale(player.thrust);
  const accel = force.scale(1 / mass);
  player.vel.x += accel.x;
  player.vel.y += accel.y;

  const speed = player.vel.magnitude();
  // cap max speed
  if (speed > PLAYER_MAX_SPEED) {
    player.vel = player.vel.scale(PLAYER_MAX_SPEED / speed);
  }

  // apply drag
  player.vel = player.vel.scale(1 - PLAYER_DRAG);

  player.pos.x += player.vel.x * dt;
  player.pos.y += player.vel.y * dt;
  if (player.pos.x < 0) player.pos.x += WIDTH;
  if (player.pos.y < 0) player.pos.y += HEIGHT;
  player.pos.x %= WIDTH;
  player.pos.y %= HEIGHT;
}

let lastTime = 0;
let lag = 0;

function loop(now: number) {
  const deltaTime = now - lastTime;
  lag += deltaTime;
  lastTime = now;

  clearScreen();

  while (lag >= FIXED_DELTA_TIME) {
    update(FIXED_DELTA_TIME, now);
    lag -= FIXED_DELTA_TIME;
  }

  drawPlayer();
  // 16.666 ms
  requestAnimationFrame(loop);
}

loop(performance.now());
