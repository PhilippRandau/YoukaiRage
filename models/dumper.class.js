class Dumper extends Enemies {
    imgScale = 1.3;
    energy = 40;
    offsetCenterIMG = 18;

    offset = {
        x: 30,
        y: 65,
        width: 60,
        height: 60,
    }

    velocityRunX = 0.8;
    velocityWalkX = 0.4;

    walkRangeX = 200;
    attackRangeX = 100;
    idleRangeX = 15;

    idle_images = 'img/04_enemies/Dumper/Idle.png'
    attack_images = 'img/04_enemies/Dumper/Attack3.png'
    walk_images = 'img/04_enemies/Dumper/Walk.png'
    hurt_images = 'img/04_enemies/Dumper/Hurt.png'

    amountIdleImages = 4;
    amountAttackImages = 6;
    amountWalkImages = 4;
    amountHurtImages = 2;

    walking_sound = new Audio('audio/walking_enemies/walk.mp3');
    running_sound = new Audio('audio/walking_enemies/run.mp3');


    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite(this.idle_images, this.amountIdleImages, 25);

        this.loadImages(this.GHOST_IMAGES);

        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;

        setTimeout(() => {
            this.walk();
        }, 1000);
    }

}