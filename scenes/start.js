import gameOptions from "../gameOptions.js";
import PlayGame from "./PlayGame.js";

class start extends Phaser.Scene {
    constructor() {
        super("start");
    }

    preload() {
        this.load.image(
            "background",
            "../assets/images/Preview/Background.png"
        );
    }

    create() {
        console.log("Game Start");
        document.addEventListener("click", (e) => {
            this.scene.start("PlayGame");
        });
    }

    update() {}
}

export default start;
