import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

const FIXED_DELTA_TIME = 1000 / 120;

const player = {
  pos: {
    x: 100,
    y: 100,
  },
  vel: {
    x: 0.33,
    y: 0,
  },
};

function drawPlayer() {
  const height = 15;
  const width = 10;

  const vertices = [
    { x: height, y: 0 },
    { x: -height, y: -width },
    { x: -height, y: width },
  ];

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
