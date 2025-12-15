import { Shape } from "./Shape";
import { ShapeType } from "./ShapeType";
import { Circle } from "./shapes/Circle";
import { Polygon } from "./shapes/Polygon";
import { Ellipse } from "./shapes/Ellipse";
import { RandomShape } from "./shapes/RandomShape.ts";
import { getRandomColor } from "../utils/color.ts";

export class ShapeFactory {
  static createRandom(x: number, y: number): Shape {
    const color = getRandomColor();
    const size = Math.random() * 80 + 20;

    const types = [
      ShapeType.Circle,
      ShapeType.Triangle,
      ShapeType.Rectangle,
      ShapeType.Pentagon,
      ShapeType.Hexagon,
      ShapeType.Ellipse,
      ShapeType.Random,
    ];

    const type = types[Math.floor(Math.random() * types.length)];

    switch (type) {
      case ShapeType.Circle:
        return new Circle(x, y, size, color);

      case ShapeType.Ellipse:
        return new Ellipse(x, y, size * 1.4, size, color);

      case ShapeType.Triangle:
        return new Polygon(type, x, y, 3, size, color);

      case ShapeType.Rectangle:
        return new Polygon(type, x, y, 4, size, color);

      case ShapeType.Pentagon:
        return new Polygon(type, x, y, 5, size, color);

      case ShapeType.Hexagon:
        return new Polygon(type, x, y, 6, size, color);

      case ShapeType.Random:
        return new RandomShape(x, y, color);
    }
  }
}
