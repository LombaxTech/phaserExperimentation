import gameOptions from "../gameOptions.js";
import Beam from "../beam.js";
import Explosion from "../explosion.js";

class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.image(
            "background",
            "../assets/images/Preview/Background.png"
        );

        // this.load.image(
        //     "knight",
        //     "../assets/images/game-heroes/PNG/Knight/knight.png"
        // );

        this.load.spritesheet(
            "ship",
            "../assets/images/spritesheets/spritesheets/ship.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            }
        );

        this.load.spritesheet(
            "ship2",
            "../assets/images/spritesheets/spritesheets/ship2.png",
            {
                frameWidth: 32,
                frameHeight: 16,
            }
        );
        this.load.spritesheet(
            "ship3",
            "../assets/images/spritesheets/spritesheets/ship3.png",
            {
                frameWidth: 32,
                frameHeight: 32,
            }
        );
        this.load.spritesheet(
            "explosion",
            "../assets/images/spritesheets/spritesheets/explosion.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            }
        );

        this.load.spritesheet(
            "power-up",
            "../assets/images/power-up-spritesheet/power-up.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            }
        );

        this.load.spritesheet("beam", "../assets/images/beam.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.audio("beam_audio", "../assets/music/sounds/beam.ogg");
        this.load.audio(
            "explosion_audio",
            "../assets/music/sounds/explosion.ogg"
        );
        this.load.audio("pickup_audio", "../assets/music/sounds/pickup.ogg");
        this.load.audio("music", "../assets/music/sounds/music.ogg");
    }

    create() {
        console.log("Playing game...");

        this.score = 0;

        // this.background = this.add.image(0, 0, "background");
        this.background = this.add.tileSprite(
            0,
            0,
            gameOptions.width,
            gameOptions.height,
            "background"
        );
        this.background.setOrigin(0, 0);
        // this.background.setScrollFactor(0);
        // this.background.displayWidth = gameOptions.width;

        this.text1 = this.add.text(20, 20, "Playing Game", {
            font: "30px Arial",
            // fill: "yellow",
        });

        this.scoreText = this.add.text(20, 60, `Score: ${this.score}`, {
            font: "50px Arial",
        });

        // console.log(this.text1.text);

        this.beamSound = this.sound.add("beam_audio");
        this.explosionSound = this.sound.add("explosion_audio");
        this.pickupSound = this.sound.add("pickup_audio");
        this.music = this.sound.add("music");

        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };

        // this.music.play(musicConfig);

        this.ship1 = this.physics.add.sprite(
            gameOptions.width / 2 - 50,
            gameOptions.height / 2,
            "ship"
        );

        this.ship2 = this.physics.add.sprite(
            gameOptions.width / 2,
            gameOptions.height / 2,
            "ship2"
        );

        this.ship3 = this.physics.add.sprite(
            gameOptions.width / 2 + 50,
            gameOptions.height / 2,
            "ship3"
        );

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "explosion_anim",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1,
            }),
            frameRepeat: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end: 3,
            }),
            frameRepeat: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "thrust",
            frames: this.anims.ge,
        });

        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1,
        });

        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on("gameobjectdown", this.destroyShip, this);

        this.powerUps = this.physics.add.group();

        let maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(
                0,
                0,
                gameOptions.width,
                gameOptions.height
            );
            if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray");
            }
            powerUp.setVelocity(300, 300);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        // this.ship1.setVelocityX(50);
        this.ship1.setCollideWorldBounds(true);
        // this.ship1.setGravityY(900);
        // this.ship2.setVelocity(400, 400);
        // this.ship2.setBounce(1);
        // this.ship2.setCollideWorldBounds(true);
        // this.ship3.setVelocity(400, 400);
        // this.ship3.setCollideWorldBounds(true);
        // this.ship3.setBounce(1);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.projectiles = this.physics.add.group();
        this.enemyShips = this.physics.add.group();

        this.enemyShips.add(this.ship2);
        this.enemyShips.add(this.ship3);

        this.enemyShips.getChildren().forEach((ship) => {
            ship.setVelocity(200, 200);
            ship.setBounce(1);
            ship.setCollideWorldBounds(true);
        });

        // console.log(this.enemyShips.getChildren());
        // console.log(this.projectiles.getChildren());
        // console.log(this.cursorKeys);

        this.physics.add.collider(
            this.projectiles,
            this.powerUps,
            (beam, powerUp) => {
                beam.destroy();
            }
        );

        this.physics.add.overlap(
            this.ship1,
            this.powerUps,
            this.pickPowerUp,
            null,
            this
        );

        this.physics.add.overlap(
            this.ship1,
            this.enemyShips,
            this.takeDamage,
            null,
            this
        );

        this.physics.add.overlap(
            this.projectiles,
            this.enemyShips,
            this.destroyShip,
            null,
            this
        );
    }

    update() {
        this.background.tilePositionX -= 0.5;
        this.moveShipManager();
        this.projectiles
            .getChildren()
            .forEach((projectile) => projectile.update());
    }

    moveKnight(knight, speed) {
        knight.y += speed;
        if (knight.y > gameOptions.height) {
            this.resetKnightPos(knight);
        }
    }

    resetKnightPos(knight) {
        knight.y = 0;
        knight.x = Phaser.Math.Between(0, gameOptions.width);
    }

    destroyShip(pointer, ship) {
        // console.log(ship);
        // ship.destroy();
        ship.setTexture("explosion");
        ship.play("explosion_anim");
    }

    moveShipManager() {
        // console.log("move");
        if (this.cursorKeys.up.isDown) {
            this.ship1.setVelocityY(-200);
        }
        if (this.cursorKeys.down.isDown) {
            this.ship1.setVelocityY(200);
        }
        if (this.cursorKeys.left.isDown) {
            this.ship1.setVelocityX(-200);
        }
        if (this.cursorKeys.right.isDown) {
            this.ship1.setVelocityX(200);
        }
        // if (this.cursorKeys.space.isDown) {
        //     console.log("fire");
        // }
        // if (this.cursorKeys.up.isDown) {
        //     this.ship1.setVelocityY(-200);
        // }
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            // console.log("fire");
            // if (this.ship1.active) {
            this.shootBeam();
            // }
        }
    }

    shootBeam() {
        // console.log("fire");
        if (this.ship1.active) {
            new Beam(this);
            this.beamSound.play();
        }
        // let beam = new Beam(this);
        // console.log(new Beam(this));
    }

    pickPowerUp(ship, powerUp) {
        powerUp.disableBody(true, true);
        this.pickupSound.play();
        // console.log({ ship, powerUp });
    }

    takeDamage(ship, enemy) {
        enemy.x = gameOptions.width / 2;
        enemy.y = gameOptions.height / 2;

        new Explosion(this, ship.x, ship.y);
        ship.disableBody(true, true);
        // this.resetPos(ship);

        this.time.addEvent({
            delay: 3000,
            callback: this.resetPos(ship),
            callbackScope: this,
            loop: false,
        });
    }

    destroyShip(projectile, enemy) {
        let explosion = new Explosion(this, enemy.x, enemy.y);
        this.score += 10;
        this.scoreText.text = `Score: ${this.score}`;
        enemy.x = 0;
        enemy.y = 0;

        projectile.destroy();

        // enemy.destroy();
        // console.log("destroy");
    }

    resetPos(ship) {
        let x = gameOptions.width / 2;
        let y = gameOptions.height / 2;
        ship.enableBody(true, x, y, true, true);
    }
}

export default PlayGame;

// this.knight1 = this.add.image(gameOptions.width / 2, 0, "knight");
// this.knight1.setOrigin(0, 0);

// this.knight2 = this.add.image(gameOptions.width / 2 + 100, 0, "knight");
// this.knight2.setOrigin(0, 0);
// this.knight2.setScale(2);
// this.knight2.flipY = true;
// this.knight1.body.setVelocityY(2);

// this.knight1 = this.add.image(gameOptions.width / 2, 0, "knight");
// this.knight1.setOrigin(0, 0);

// this.knight2 = this.add.image(gameOptions.width / 2 + 100, 0, "knight");
// this.knight2.setOrigin(0, 0);
// this.knight2.setScale(2);
// this.knight2.flipY = true;
// this.knight1.body.setVelocityY(2);
