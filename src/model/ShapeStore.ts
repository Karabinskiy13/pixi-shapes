import { Shape } from "./Shape";
import { ShapeType } from "./ShapeType";

export class ShapeStore {
  private shapes: Shape[] = [];

  add(shape: Shape): void {
    this.shapes.push(shape);
  }

  removeById(id: string): void {
    this.shapes = this.shapes.filter((s) => s.id !== id);
  }

  getAll(): readonly Shape[] {
    return this.shapes;
  }

  getCount(): number {
    return this.shapes.length;
  }

  getTotalArea(): number {
    return this.shapes.reduce((sum, shape) => sum + shape.calculateArea(), 0);
  }

  getByType(type: ShapeType): Shape[] {
    return this.shapes.filter((s) => s.type === type);
  }

  update(delta: number, gravity: number): void {
    this.shapes.forEach((shape) => shape.update(delta, gravity));
  }

  removeOutOfBounds(bounds: { height: number }): string[] {
    const removed: string[] = [];

    this.shapes = this.shapes.filter((shape) => {
      const isVisible = shape.y - shape.getBoundingRadius() <= bounds.height;

      if (!isVisible) {
        removed.push(shape.id);
      }

      return isVisible;
    });

    return removed;
  }
}
