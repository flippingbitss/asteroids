const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

export { ctx, HEIGHT, WIDTH };
