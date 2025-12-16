import { PixiView } from "../view/PixiView";
import { ShapeStore } from "../model/ShapeStore";
import { ShapeView } from "../view/ShapeView";
import { ShapeType } from "../model/ShapeType";
import { Ticker } from "pixi.js";
import { UIOverlay } from "../view/UIOverlay.ts";
import { ShapeFactory } from "../model/ShapeFactory.ts";
import { getElement } from "../utils/getElement.ts";

export class GameController {
  private readonly store = new ShapeStore();
  private readonly views = new Map<string, ShapeView>();
  private readonly pixi: PixiView;
  private readonly ui = new UIOverlay({
    countEl: getElement("shapes-count"),
    areaEl: getElement("shapes-area"),
    rateEl: getElement("shapes-rate"),
    gravityEl: getElement("gravity-value"),

    rateIncBtn: getElement("shapes-inc"),
    rateDecBtn: getElement("shapes-dec"),
    gravityIncBtn: getElement("gravity-inc"),
    gravityDecBtn: getElement("gravity-dec"),
  });

  private shapesPerSecond = 1;
  private spawnAccumulator = 0;

  private gravity = 0.2;

  private constructor(pixi: PixiView) {
    this.pixi = pixi;
    this.pixi.app.ticker.add(this.update);
    this.setupClickHandler();
    this.ui.onRateIncrease = () => {
      this.shapesPerSecond++;
      this.ui.updateRate(this.shapesPerSecond);
    };

    this.ui.onRateDecrease = () => {
      this.shapesPerSecond = Math.max(0, this.shapesPerSecond - 1);
      this.ui.updateRate(this.shapesPerSecond);
    };

    this.ui.onGravityIncrease = () => {
      this.gravity += 0.1;
      this.ui.updateGravity(this.gravity);
    };

    this.ui.onGravityDecrease = () => {
      this.gravity = Math.max(0, this.gravity - 0.1);
      this.ui.updateGravity(this.gravity);
    };

    this.ui.updateRate(this.shapesPerSecond);
    this.ui.updateGravity(this.gravity);
  }

  private update = (ticker: Ticker): void => {
    const delta = ticker.deltaTime;

    this.spawnAccumulator += delta;

    const spawnInterval = 60 / this.shapesPerSecond;
    while (this.shapesPerSecond > 0 && this.spawnAccumulator >= spawnInterval) {
      this.spawnAccumulator -= spawnInterval;

      const { width } = this.pixi.app.screen;
      const margin = 30;

      this.addRandomShape(
        margin + Math.random() * (width - margin * 2),
        -margin,
      );
    }

    this.store.update(delta, this.gravity);

    const removedIds = this.store.removeOutOfBounds({
      height: this.pixi.app.canvas.height,
    });

    removedIds.forEach((id) => {
      const view = this.views.get(id);
      if (view) {
        this.pixi.app.stage.removeChild(view.graphics);
        this.views.delete(id);
      }
    });
    this.store.getAll().forEach((shape) => {
      this.views.get(shape.id)?.update(shape);
    });
    this.ui.updateStats(this.store.getCount(), this.store.getTotalArea());
  };

  static async create(containerId: string): Promise<GameController> {
    const pixi = await PixiView.create(containerId);
    return new GameController(pixi);
  }

  private addRandomShape(x: number, y: number): void {
    const shape = ShapeFactory.createRandom(x, y);

    this.store.add(shape);

    const view = new ShapeView(shape, this.onShapeClick);
    this.views.set(shape.id, view);
    this.pixi.app.stage.addChild(view.graphics);
  }

  private onShapeClick = (shapeId: string, type: ShapeType): void => {
    const view = this.views.get(shapeId);
    if (view) {
      this.pixi.app.stage.removeChild(view.graphics);
      this.views.delete(shapeId);
      this.store.removeById(shapeId);
    }

    const newColor = Math.random() * 0xffffff;

    this.store.getByType(type).forEach((shape) => {
      shape.color = newColor;
    });
  };

  private setupClickHandler(): void {
    const stage = this.pixi.app.stage;

    stage.eventMode = "static";
    stage.hitArea = this.pixi.app.screen;

    stage.on("pointerdown", (e) => {
      const { x, y } = e.global;
      this.addRandomShape(x, y);
    });
  }
}
