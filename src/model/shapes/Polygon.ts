import { Shape } from "../Shape";
import { ShapeType } from "../ShapeType";

export class Polygon extends Shape {
  readonly sides: number;
  readonly radius: number;

  constructor(
    type: ShapeType,
    x: number,
    y: number,
    sides: number,
    radius: number,
    color: number,
  ) {
    super(type, x, y, color);
    this.sides = sides;
    this.radius = radius;
  }

  calculateArea(): number {
    return (
      (this.sides *
        this.radius *
        this.radius *
        Math.sin((2 * Math.PI) / this.sides)) /
      2
    );
  }

  getBoundingRadius(): number {
    return this.radius;
  }
}
