export class UIOverlay {
  private countEl = document.getElementById("shapes-count")!;
  private areaEl = document.getElementById("shapes-area")!;
  private rateEl = document.getElementById("shapes-rate")!;
  private gravityEl = document.getElementById("gravity-value")!;

  onRateIncrease?: () => void;
  onRateDecrease?: () => void;
  onGravityIncrease?: () => void;
  onGravityDecrease?: () => void;

  constructor() {
    document
      .getElementById("shapes-inc")!
      .addEventListener("click", () => this.onRateIncrease?.());

    document
      .getElementById("shapes-dec")!
      .addEventListener("click", () => this.onRateDecrease?.());

    document
      .getElementById("gravity-inc")!
      .addEventListener("click", () => this.onGravityIncrease?.());

    document
      .getElementById("gravity-dec")!
      .addEventListener("click", () => this.onGravityDecrease?.());
  }

  updateStats(count: number, area: number): void {
    this.countEl.textContent = String(count);
    this.areaEl.textContent = area.toFixed(0);
  }

  updateRate(rate: number): void {
    this.rateEl.textContent = String(rate);
  }

  updateGravity(gravity: number): void {
    this.gravityEl.textContent = gravity.toFixed(2);
  }
}
