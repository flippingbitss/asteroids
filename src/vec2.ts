export class Vec2 {
  constructor(
    public x: number,
    public y: number,
  ) {}

  rotate(angle: number): Vec2 {
    const angleInRadians = (angle * Math.PI) / 180;
    const sinTheta = Math.sin(angleInRadians);
    const cosTheta = Math.cos(angleInRadians);

    const nx = this.x * cosTheta - this.y * sinTheta;
    const ny = this.x * sinTheta + this.y * cosTheta;

    return new Vec2(nx, ny);
  }

  scale(factor: number): Vec2 {
    return new Vec2(this.x * factor, this.y * factor);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
