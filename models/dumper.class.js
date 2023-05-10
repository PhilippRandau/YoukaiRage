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

    velocityRunX = 1.2;
    velocityWalkX = 0.6;

    idle_images = 'img/04_enemies/Dumper/Idle.png'
    attack_images = 'img/04_enemies/Dumper/Attack3.png'
    walk_images = 'img/04_enemies/Dumper/Walk.png'
    hurt_images = 'img/04_enemies/Dumper/Hurt.png'

    amountIdleImages = 4;
    amountAttackImages = 6;
    amountWalkImages = 4;
    amountHurtImages = 2;

    walking_sound = new Audio('audio/enemies/dumper/walk.mp3');
    running_sound = new Audio('audio/enemies/dumper/attack.mp3');
    idle_sound = new Audio('audio/enemies/dumper/idle_range.mp3');
    hurt_sound = new Audio('audio/enemies/dumper/hurt.mp3');


    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite(this.idle_images, this.amountIdleImages, this.bufferIdleImages);

        this.loadImages(this.GHOST_IMAGES);

        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;

        setTimeout(() => {
            this.startAnimations = true;
        }, 1000);
    }

}