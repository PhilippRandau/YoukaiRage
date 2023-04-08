class Endboss extends MovableObject {
    height = 320;
    width = 320;
    y = 140;
    x = 2200;
    intervalAnimation; 
    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURTING = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DYING = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    chicken_sound = new Audio('audio/chicken.mp3');
    constructor() {
        
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        // this.x = 300 + Math.random() * 500;
        // this.walk();
        this.speed = 0.8;
        this.animate();
    }

    walk() {
        let intervalWalk;
        setInterval(() => {
            clearInterval(intervalWalk);
            let random = Math.random();
            if (random < 0.35) {
                this.otherDirection = true;
                intervalWalk = setInterval(() => {
                    this.x += this.speed;
                }, 1000 / 120);
                clearInterval(this.intervalAnimation);
                this.animate();
            } else if (random > 0.65) {
                this.otherDirection = false;
                intervalWalk = setInterval(() => {
                    this.x -= this.speed;
                }, 1000 / 120);
                clearInterval(this.intervalAnimation);
                this.animate();
            }else if(random < 0.65 && random > 0.35){
                this.loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png')
                clearInterval(this.intervalAnimation);
            }
            // this.chicken_sound.play();
        }, 2000);
    }

    animate() {
        this.intervalAnimation = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
            }else if (this.isHurt()){
                this.playAnimation(this.IMAGES_HURTING);
            }else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


}
