class MechWorker extends Enemies {
    imgScale = 1.3;
    energy = 40;
    offsetCenterIMG = 25;

    offset = {
        x: 45,
        y: 55,
        width: 35,
        height: 70,
    }

    velocityRunX = 0.8;
    velocityWalkX = 0.4;

    idle_images = 'img/04_enemies/MechWorker/Special.png';
    attack_images = 'img/04_enemies/MechWorker/Attack2.png';
    walk_images = 'img/04_enemies/MechWorker/Walk.png';
    special_images = 'img/04_enemies/MechWorker/Special.png';
    hurt_images = 'img/04_enemies/MechWorker/Hurt.png';

    amountIdleImages = 4;
    amountAttackImages = 6;
    amountWalkImages = 6;
    amountHurtImages = 2;

    walking_sound = new Audio('audio/enemies/walk_run/walk.mp3');
    running_sound = new Audio('audio/enemies/walk_run/run.mp3');
    hurt_sound = new Audio('audio/enemies/mechworker/hurt.mp3');
    idle_sound = new Audio('audio/enemies/worker/talk.mp3');


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