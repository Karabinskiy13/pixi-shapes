import { ShapeType } from "./ShapeType";

export abstract class Shape {
  readonly id: string;
  readonly type: ShapeType;
  abstract getBoundingRadius(): number;

  x: number;
  y: number;
  color: number;
  velocityY: number;

  protected constructor(type: ShapeType, x: number, y: number, color: number) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocityY = 0;
  }

  update(delta: number, gravity: number): void {
    this.velocityY += gravity * delta;
    this.y += this.velocityY;
  }

  abstract calculateArea(): number;
}
