import { Shape } from "../Shape";
import { ShapeType } from "../ShapeType.ts";

export class RandomShape extends Shape {
  private readonly points: number[];
  private readonly boundingRadius: number;

  constructor(
    x: number,
    y: number,
    color: number,
    baseRadius: number,
    pointsCount: number,
  ) {
    super(ShapeType.Random, x, y, color);

    const pts: number[] = [];
    let maxR = 0;

    for (let i = 0; i < pointsCount; i++) {
      const angle = (i / pointsCount) * Math.PI * 2;
      const r = baseRadius * (0.6 + Math.random() * 0.8);

      pts.push(Math.cos(angle) * r, Math.sin(angle) * r);
      maxR = Math.max(maxR, r);
    }

    this.points = pts;
    this.boundingRadius = maxR;
  }

  getPoints(): number[] {
    return this.points;
  }

  getBoundingRadius(): number {
    return this.boundingRadius;
  }

  calculateArea(): number {
    let area = 0;
    const pts = this.points;

    for (let i = 0; i < pts.length; i += 2) {
      const x1 = pts[i];
      const y1 = pts[i + 1];

      const j = (i + 2) % pts.length;
      const x2 = pts[j];
      const y2 = pts[j + 1];

      area += x1 * y2 - x2 * y1;
    }

    return Math.abs(area) / 2;
  }
}
