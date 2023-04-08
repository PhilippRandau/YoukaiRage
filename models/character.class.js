class Character extends MovableObject {
    y = 80;
    bottles = 100;
    coins = 0;
    // isOnPlatform = false;

    velocityX = 4;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_HURTING = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DYING = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png',
    ]

    // offset = {
    //     top: 120,
    //     right: 30,
    //     bottom: 10,
    //     left: 20
    // }

    walking_sound = new Audio('audio/walk.mp3');




    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        // this.applyGravity();
        this.animate();
    }

    animate() {
        this.walk();

    }

    walk() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.walkRight();

            } else if (this.world.keyboard.LEFT && this.x > -370) {
                this.walkLeft();
            }

            if (this.world.keyboard.UP ) { //&& !this.isAboveGround()
                this.jump();
            }

            this.world.camera_x = -this.x + 50;
        }, 1000 / 144);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
            }else if (this.isHurt()){
                this.playAnimation(this.IMAGES_HURTING);
            }else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);


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
        this.velocityY = -4;
        this.direction = 'up';
    }

    
}