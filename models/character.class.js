class Character extends MovableObject {
    y = 280;
    bottles = 100;
    coins = 0;
    velocityX = 4;
    offsetCenterIMG = 2;

    walking_sound = new Audio('audio/walk.mp3');


    constructor() {
        super().loadImage('img/03_character_youkai/Idle.png');
        this.frameRate = 5;
        this.animate();
        this.walk();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.switchSprite('img/03_character_youkai/Dead.png', 4)
            } else if (this.isHurt()) {
                this.switchSprite('img/03_character_youkai/Hurt.png', 3)
            } else if (this.isAboveGround()) {
                this.switchSprite('img/03_character_youkai/Scream.png', 4)
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.switchSprite('img/03_character_youkai/Walk.png', 5)
            } else {
                this.switchSprite('img/03_character_youkai/Idle.png', 5)
            }
        }, 80);
    }

    switchSprite(img, frameRate) {
        this.loadImage(img);
        this.frameRate = frameRate;
    }

    walk() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.walkRight();

            } else if (this.world.keyboard.LEFT && this.x > -370) {
                this.walkLeft();
            }

            if (this.world.keyboard.UP) { //&& !this.isAboveGround()
                this.jump();
            }

            this.world.camera_x = -this.x + 50;
        }, 1000 / 144);


    }

    updateHitbox() {
        this.hitbox.x = this.x + 52;
        this.hitbox.y = this.y + 55;
        this.hitbox.width = 20;
        this.hitbox.height = 70;
    }

    walkRight() {
        this.velocityX = 1;
        this.x += this.velocityX;
        this.otherDirection = false;
        this.direction = 'right';
        this.walking_sound.play();
    }

    walkLeft() {
        this.velocityX = -1;
        this.x += this.velocityX;
        this.otherDirection = true;
        this.direction = 'left';
        this.walking_sound.play();
    }

    jump() {
        this.velocityY = -3;
        this.direction = 'up';
    }


}