import { Shape } from "../Shape";
import { ShapeType } from "../ShapeType.ts";

export class Ellipse extends Shape {
  constructor(
    x: number,
    y: number,
    public readonly radiusX: number,
    public readonly radiusY: number,
    color: number,
  ) {
    super(ShapeType.Ellipse, x, y, color);
  }

  calculateArea(): number {
    return Math.PI * this.radiusX * this.radiusY;
  }

  getBoundingRadius(): number {
    return Math.max(this.radiusX, this.radiusY);
  }
}
