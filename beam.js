import gameOptions from "./gameOptions.js";

class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        let x = scene.ship1.x;
        let y = scene.ship1.y;

        // let x = 50;
        // let y = 50;

        super(scene, x, y, "beam");
        scene.add.existing(this);
        scene.projectiles.add(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.setVelocityY(-300);
    }

    update() {
        if (this.y < 100) {
            this.destroy();
        }
    }
}

export default Beam;
