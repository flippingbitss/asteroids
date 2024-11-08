import { Collider, ColliderType, Polygon } from "./collider";
import { drawShape } from "./draw";
import { EntityCollection } from "./entities";
import { Entity } from "./entity";
import { Key, Keyboard } from "./keyboard";
import { applyBasicMovement } from "./movement";
import { Cannon } from "./shooting";
import { Vec2 } from "./vec2";

const SHIP_THRUST = 0.04;
const SHIP_MAX_SPEED = 0.4;
const SHIP_DRAG = 0.015;
const SHIP_FLAME_PULSE_INTERVAL = 100;
const SHIP_ROTATION_DELTA = 0.3;

const SHIP_HEIGHT = 15;
const SHIP_WIDTH = 10;

const SHIP_GEOMETRY = [
  new Vec2(SHIP_HEIGHT, 0),
  new Vec2(-SHIP_HEIGHT, -SHIP_WIDTH),
  new Vec2(-SHIP_HEIGHT + SHIP_WIDTH / 3, -SHIP_WIDTH / 2),
  new Vec2(-SHIP_HEIGHT + SHIP_WIDTH / 3, +SHIP_WIDTH / 2),
  new Vec2(-SHIP_HEIGHT, SHIP_WIDTH),
];

export class Ship implements Entity {
  name = "ship";
  angle: number;
  thrust: number;
  lastPulseTime: number;
  pulse: boolean;

  cannon: Cannon;

  constructor(
    public pos: Vec2,
    public vel: Vec2,
    private input: Keyboard,
  ) {
    this.angle = 0;
    this.thrust = 0;
    this.lastPulseTime = 0;
    this.pulse = false;

    this.cannon = new Cannon(this);
    this.input.onKeyDownOnce(Key.Space, () =>
      this.cannon.shoot(this.spawnLocation, this.dir()),
    );
  }

  dir(): Vec2 {
    const angleInRadians = (this.angle * Math.PI) / 180;
    const x = Math.cos(angleInRadians);
    const y = Math.sin(angleInRadians);
    return new Vec2(x, y);
  }

  get spawnLocation(): Vec2 {
    return this.pos.add(this.dir().scale(SHIP_HEIGHT / 2 + 10));
  }

  collider(): Collider {
    return {
      type: ColliderType.Polygon,
      polygon: new Polygon(this.pos, SHIP_GEOMETRY),
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    const vertices = SHIP_GEOMETRY.map((v) => v.rotate(this.angle));

    drawShape(ctx, this.pos, vertices);

    if (this.thrust > 0 && this.pulse) {
      const flameVertices = [
        new Vec2(-SHIP_HEIGHT + SHIP_WIDTH / 4, -SHIP_WIDTH / 3),
        new Vec2(-SHIP_HEIGHT - SHIP_WIDTH / 4, 0),
        new Vec2(-SHIP_HEIGHT + SHIP_WIDTH / 4, +SHIP_WIDTH / 3),
      ].map((v) => v.rotate(this.angle));

      drawShape(ctx, this.pos, flameVertices);
    }
  }

  update(dt: number, now: number, entities: EntityCollection) {
    this.thrust = 0;
    if (this.input.isKeyDown(Key.ArrowLeft)) {
      this.angle -= SHIP_ROTATION_DELTA * dt;
    }
    if (this.input.isKeyDown(Key.ArrowRight)) {
      this.angle += SHIP_ROTATION_DELTA * dt;
    }
    if (this.input.isKeyDown(Key.ShiftLeft)) {
      this.thrust = SHIP_THRUST;
    }

    this.cannon.update(dt, now, entities);
    if (now - this.lastPulseTime > SHIP_FLAME_PULSE_INTERVAL) {
      this.pulse = !this.pulse;
      this.lastPulseTime = now;
    }

    const mass = 10;
    // F = M * A
    // A = F / M
    // V = dt * A;

    const force = this.dir().scale(this.thrust);
    const accel = force.scale(1 / mass);
    this.vel.x += accel.x * dt;
    this.vel.y += accel.y * dt;

    const speed = this.vel.magnitude();
    // cap max speed
    if (speed > SHIP_MAX_SPEED) {
      this.vel = this.vel.scale(SHIP_MAX_SPEED / speed);
    }

    // apply drag
    this.vel = this.vel.scale(1 - SHIP_DRAG);

    // TODO: remove the any type
    applyBasicMovement(this as any, dt, { wrap: true });
  }
}
