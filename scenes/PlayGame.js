import gameOptions from "../gameOptions.js";

class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.image(
            "background",
            "../assets/images/Preview/Background.png"
        );

        this.load.image(
            "knight",
            "../assets/images/game-heroes/PNG/Knight/knight.png"
        );
    }

    create() {
        console.log("Playing game...");
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.background.displayWidth = gameOptions.width;

        this.knight1 = this.add.image(gameOptions.width / 2, 0, "knight");
        this.knight1.setOrigin(0, 0);

        this.knight2 = this.add.image(gameOptions.width / 2 + 100, 0, "knight");
        this.knight2.setOrigin(0, 0);
        this.knight2.setScale(2);
        this.knight2.flipY = true;

        // this.knight1 = this.add.image(gameOptions.width / 2, 0, "knight");
        // this.knight1.setOrigin(0, 0);
    }

    update() {
        this.knight2.angle += 3;
    }
}

export default PlayGame;
