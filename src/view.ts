import { Vec2 } from "./vec2";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const CENTER = new Vec2(WIDTH / 2, HEIGHT / 2);

export { ctx, HEIGHT, WIDTH, CENTER };
