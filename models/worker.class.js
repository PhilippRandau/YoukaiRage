class Worker extends MovableObject {
    imgScale = 1.3;
    y = 275;
    intervalAnimation;
    energy = 100;
    velocityX = 0.6;
    offsetCenterIMG = 33;

    offset = {
        x: 53,
        y: 65,
        width: 20,
        height: 60,
    }


    chicken_sound = new Audio('audio/chicken.mp3');

    constructor() {

        super().loadImage('img/04_enemies/Worker/Idle.png');
        this.frameRate = 4;
        // this.loadImages(this.IMAGES_WALKING);
        this.x = 617;//300 + Math.random() * 500
        // this.walk();
        // this.velocityX = this.velocityX + Math.random() * 0.25
        // this.animate();
        this.otherDirection = true;
    }

    walk() {
        let intervalWalk;
        setInterval(() => {
            clearInterval(intervalWalk);
            let random = Math.random();
            if (random < 0.35) {
                this.otherDirection = false;
                this.loadImage('img/04_enemies/Worker/Walk.png');
                this.frameRate = 6;
                intervalWalk = setInterval(() => {
                    this.x += this.velocityX;
                }, 1000 / 120);
                // clearInterval(this.intervalAnimation);
                // this.animate();
            } else if (random > 0.65) {
                this.otherDirection = true;
                this.loadImage('img/04_enemies/Worker/Walk.png');
                this.frameRate = 6;
                intervalWalk = setInterval(() => {
                    this.x -= this.velocityX;
                }, 1000 / 120);
                // clearInterval(this.intervalAnimation);
                // this.animate();
            } else if (random < 0.65 && random > 0.35) {
                this.loadImage('img/04_enemies/Worker/Idle.png');
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
    //     this.hitbox.y = this.y + 65;
    //     this.hitbox.width = 20;
    //     this.hitbox.height = 60;
    // }

}