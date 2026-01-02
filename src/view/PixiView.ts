import { Application } from "pixi.js";

export class PixiView {
  readonly app: Application;
  readonly container: HTMLElement;

  private constructor(app: Application, container: HTMLElement) {
    this.app = app;
    this.container = container;
  }

  static async create(containerId: string): Promise<PixiView> {
    const container = document.getElementById(containerId);

    if (!container) {
      throw new Error(`Container #${containerId} not found`);
    }

    const app = new Application();

    await app.init({
      background: "#ffffff",
      resizeTo: window,
    });

    container.appendChild(app.canvas);

    return new PixiView(app, container);
  }
}
