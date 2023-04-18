class MechWorker extends MovableObject {
    // height = 60;
    // width = 60;
    imgScale = 1.3;
    y = 275;
    intervalAnimation;
    energy = 40;
    velocityX = 0.6;

    offsetCenterIMG = 25;

    offset = {
        x: 45,
        y: 55,
        width: 35,
        height: 70,
    }

    chicken_sound = new Audio('audio/chicken.mp3');

    constructor() {

        super().loadImage('img/04_enemies/MechWorker/Idle.png');
        this.frameRate = 4;
        // this.loadImages(this.IMAGES_WALKING);
        this.x = 700 + Math.random() * 500;
        // this.walk();
        // this.velocityX = this.velocityX + Math.random() * 0.25
        // this.animate();
    }

    walk() {
        let intervalWalk;
        setInterval(() => {
            clearInterval(intervalWalk);
            let random = Math.random();
            if (random < 0.35) {
                this.otherDirection = false;
                this.loadImage('img/04_enemies/MechWorker/Walk.png');
                this.frameRate = 6;
                intervalWalk = setInterval(() => {
                    this.x += this.velocityX;
                }, 1000 / 120);
                // clearInterval(this.intervalAnimation);
                // this.animate();
            } else if (random > 0.65) {
                this.otherDirection = true;
                this.loadImage('img/04_enemies/MechWorker/Walk.png');
                this.frameRate = 6;
                intervalWalk = setInterval(() => {
                    this.x -= this.velocityX;
                }, 1000 / 120);
                // clearInterval(this.intervalAnimation);
                // this.animate();
            } else if (random < 0.65 && random > 0.35) {
                this.loadImage('img/04_enemies/MechWorker/Idle.png');
                this.frameRate = 4;
                // clearInterval(this.intervalAnimation);
            }
            // this.chicken_sound.play();
        }, 2000);
    }

    // animate() {
    //     this.intervalAnimation = setInterval(() => {
    //         this.playAnimation(this.IMAGES_WALKING)
    //     }, 80);
    // }

    // updateHitbox(){
    //     this.hitbox.x = this.x + 20;
    //     this.hitbox.y = this.y + 55;
    //     this.hitbox.width = 35;
    //     this.hitbox.height = 70;
    // }

}