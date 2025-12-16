import { UIOverlayElements } from "./UIOverlayElements.ts";

export class UIOverlay {
  onRateIncrease?: () => void;
  onRateDecrease?: () => void;
  onGravityIncrease?: () => void;
  onGravityDecrease?: () => void;

  constructor(private readonly elements: UIOverlayElements) {
    this.bindEvents();
  }

  private bindEvents(): void {
    this.elements.rateIncBtn?.addEventListener("click", () =>
      this.onRateIncrease?.(),
    );
    this.elements.rateDecBtn?.addEventListener("click", () =>
      this.onRateDecrease?.(),
    );
    this.elements.gravityIncBtn?.addEventListener("click", () =>
      this.onGravityIncrease?.(),
    );
    this.elements.gravityDecBtn?.addEventListener("click", () =>
      this.onGravityDecrease?.(),
    );
  }

  updateStats(count: number, area: number): void {
    if (this.elements.countEl)
      this.elements.countEl.textContent = String(count);
    if (this.elements.areaEl)
      this.elements.areaEl.textContent = area.toFixed(0);
  }

  updateRate(rate: number): void {
    if (this.elements.rateEl) this.elements.rateEl.textContent = String(rate);
  }

  updateGravity(gravity: number): void {
    if (this.elements.gravityEl) {
      this.elements.gravityEl.textContent = gravity.toFixed(2);
    }
  }
}
