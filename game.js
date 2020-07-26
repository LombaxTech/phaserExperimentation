import gameOptions from "./gameOptions.js";

// importing scenes
import start from "./scenes/start.js";
import PlayGame from "./scenes/PlayGame.js";

const gameConfig = {
    width: gameOptions.width,
    height: gameOptions.height,
    type: Phaser.AUTO,
    // scene: [start, PlayGame],
    scene: [PlayGame, start],
    // background: "yellow",
    // TODO: Add physics,
};

let game = new Phaser.Game(gameConfig);
