class FallingAsteroids extends MovableObject {
    y = 0;
    width = 360;
    height = 240;

    constructor(imgPath) {
        super().loadImage(imgPath);
        this.frameRate = 4;
        this.setBackToSpawn();
        this.randomise();
    }


    /**
    * Sets the asteroid back to its spawn position and makes it move downwards at a random velocity.
    */
    setBackToSpawn() {
        setInterval(() => {
            this.y += this.velocityY;
            if (this.y > 480) {
                this.randomise();
            }
        }, 1000 / 60);
    }


    /**
    * Randomizes the asteroid's position and velocity.
    */
    randomise() {
        this.x = Math.random() * 4000;
        this.y = Math.random() * -100;
        this.velocityY = Math.random() * 2;
        if (this.velocityY < 0.4) {
            this.velocityY * 3;
        }
    }

}