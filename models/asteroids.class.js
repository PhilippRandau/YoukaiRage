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


    /**
    * Sets the object back to its spawn position and continuously updates its position.
    */
    setBackToSpawn() {
        setInterval(() => {
            this.x -= this.velocityX;
            if (this.x < -740 * 2) {
                this.x = 740 * 8;
            }
        }, 1000 / 60);
    }

}