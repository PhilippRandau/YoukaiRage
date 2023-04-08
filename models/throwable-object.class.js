class ThrowableObject extends MovableObject {
    IMAGES_THROWING = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.applyGravity();
        this.throw();
        this.bottleAnim();
    }


    bottleAnim() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 80);
    }

    throw() {
        this.velocityY = 30;
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

}