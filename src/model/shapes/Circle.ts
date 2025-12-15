import { Shape } from "../Shape";
import { ShapeType } from "../ShapeType";

export class Circle extends Shape {
  readonly radius: number;
  constructor(x: number, y: number, radius: number, color: number) {
    super(ShapeType.Circle, x, y, color);
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getBoundingRadius(): number {
    return this.radius;
  }
}
