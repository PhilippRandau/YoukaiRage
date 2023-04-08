class Character extends MovableObject {
    y = 80;
    bottles = 100;
    coins = 0;
    // isOnPlatform = false;

    velocityX = 4;
    IMAGES_WALKING = [
        'img/03_character_youkai/walk/walk_1.png',
        'img/03_character_youkai/walk/walk_2.png',
        'img/03_character_youkai/walk/walk_3.png',
        'img/03_character_youkai/walk/walk_4.png',
        'img/03_character_youkai/walk/walk_5.png',
    ];

    IMAGES_IDLE = [
        'img/03_character_youkai/idle/idle_1.png',
        'img/03_character_youkai/idle/idle_2.png',
        'img/03_character_youkai/idle/idle_3.png',
        'img/03_character_youkai/idle/idle_4.png',
        'img/03_character_youkai/idle/idle_5.png',
    ];

    IMAGES_JUMPING = [
        'img/03_character_youkai/jump/jump_1.png',
        'img/03_character_youkai/jump/jump_2.png',
        'img/03_character_youkai/jump/jump_3.png',
        'img/03_character_youkai/jump/jump_4.png',
    ]

    IMAGES_HURTING = [
        'img/03_character_youkai/hurt/hurt_1.png',
        'img/03_character_youkai/hurt/hurt_2.png',
        'img/03_character_youkai/hurt/hurt_3.png',
    ]

    IMAGES_DYING = [
        'img/03_character_youkai/dead/dead_1.png',
        'img/03_character_youkai/dead/dead_2.png',
        'img/03_character_youkai/dead/dead_3.png',
        'img/03_character_youkai/dead/dead_4.png',
       
    ]

    // offset = {
    //     top: 120,
    //     right: 30,
    //     bottom: 10,
    //     left: 20
    // }

    walking_sound = new Audio('audio/walk.mp3');




    constructor() {
        super().loadImage('img/03_character_youkai/walk/walk_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
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