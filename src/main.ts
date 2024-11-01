import { Game } from "./game";
import { Keyboard } from "./keyboard";
import "./style.css";
import { ctx } from "./view";

const input = new Keyboard(window);
const game = new Game(ctx, input);

game.start();
