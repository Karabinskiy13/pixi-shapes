import { Shape } from "../Shape.ts";
import { ShapeType } from "../ShapeType.ts";

export class Rectangle extends Shape {
  readonly width: number;
  readonly height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number,
  ) {
    super(ShapeType.Rectangle, x, y, color);
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  getBoundingRadius(): number {
    return Math.sqrt((this.width / 2) ** 2 + (this.height / 2) ** 2);
  }
}
