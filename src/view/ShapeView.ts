import { FederatedPointerEvent, Graphics } from "pixi.js";
import { Shape } from "../model/Shape";
import { ShapeType } from "../model/ShapeType";
import { Circle } from "../model/shapes/Circle";
import { Polygon } from "../model/shapes/Polygon";
import { Ellipse } from "../model/shapes/Ellipse";
import { Rectangle } from "../model/shapes/Rectangle";
import { RandomShape } from "../model/shapes/RandomShape.ts";

export class ShapeView {
  readonly graphics: Graphics;
  readonly shapeId: string;
  readonly shapeType: ShapeType;

  constructor(
    shape: Shape,
    onClick: (shapeId: string, shapeType: ShapeType) => void,
  ) {
    this.shapeId = shape.id;
    this.shapeType = shape.type;

    this.graphics = new Graphics();
    this.graphics.eventMode = "static";
    this.graphics.cursor = "pointer";

    this.graphics.on("pointerdown", (e: FederatedPointerEvent) => {
      e.stopPropagation();
      onClick(this.shapeId, this.shapeType);
    });

    this.draw(shape);
  }

  draw(shape: Shape): void {
    this.graphics.clear();

    switch (shape.type) {
      case ShapeType.Circle:
        this.drawCircle(shape as Circle);
        break;

      case ShapeType.Ellipse:
        this.drawEllipse(shape as Ellipse);
        break;

      case ShapeType.Rectangle:
        this.drawRectangle(shape as Rectangle);
        break;

      case ShapeType.Random:
        this.drawRandom(shape as RandomShape);
        break;

      default:
        this.drawPolygon(shape as Polygon);
    }

    this.graphics.tint = shape.color;
  }

  update(shape: Shape): void {
    this.graphics.x = shape.x;
    this.graphics.y = shape.y;
  }

  private drawCircle(shape: Circle): void {
    this.graphics.circle(0, 0, shape.radius).fill({ color: 0xffffff });
  }

  private drawPolygon(shape: Polygon): void {
    const points: number[] = [];

    for (let i = 0; i < shape.sides; i++) {
      const angle = (i / shape.sides) * Math.PI * 2;
      points.push(
        Math.cos(angle) * shape.radius,
        Math.sin(angle) * shape.radius,
      );
    }

    this.graphics.poly(points).fill({ color: 0xffffff });
  }

  private drawRectangle(shape: Rectangle): void {
    this.graphics
      .rect(-shape.width / 2, -shape.height / 2, shape.width, shape.height)
      .fill({ color: 0xffffff });
  }

  private drawEllipse(shape: Ellipse): void {
    this.graphics
      .ellipse(0, 0, shape.radiusX, shape.radiusY)
      .fill({ color: 0xffffff });
  }

  private drawRandom(shape: RandomShape): void {
    this.graphics.poly(shape.getPoints()).fill({ color: 0xffffff });
  }
}
