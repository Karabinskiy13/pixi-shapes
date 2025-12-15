import { GameController } from "./controller/Controller.ts";
import "./styles/style.scss";

(async () => {
  await GameController.create("pixi-container");
})();
