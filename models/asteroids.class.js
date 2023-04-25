class Asteroids extends MovableObject {
    y = 0;
    width = 360;
    height = 240;
    velocityX = 0.15;
    
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x
        this.setBackToSpawn();
    }

    setBackToSpawn() {
        setInterval(() => {
            this.x -= this.velocityX;
            if (this.x < -740 * 2) {
                this.x = 740 * 8;
            }
        }, 1000 / 60);
    }

}