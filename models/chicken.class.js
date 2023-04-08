class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 365;
    intervalAnimation; 
    onCollisionCourse = true;
    energy = 100;

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    chicken_sound = new Audio('audio/chicken.mp3');

    constructor() {
        
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 500;
        // this.walk();
        this.velocityX = this.velocityX + Math.random() * 0.25
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
                    this.x += this.velocityX;
                }, 1000 / 120);
                clearInterval(this.intervalAnimation);
                this.animate();
            } else if (random > 0.65) {
                this.otherDirection = false;
                intervalWalk = setInterval(() => {
                    this.x -= this.velocityX;
                }, 1000 / 120);
                clearInterval(this.intervalAnimation);
                this.animate();
            }else if(random < 0.65 && random > 0.35){
                this.loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
                clearInterval(this.intervalAnimation);
            }
            // this.chicken_sound.play();
        }, 2000);
    }

    animate() {
        this.intervalAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 80);
    }

    

}