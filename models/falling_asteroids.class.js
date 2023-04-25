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

    setBackToSpawn() {
        setInterval(() => {
            this.y += this.velocityY;
            if (this.y > 480) {
                this.randomise();
            }
        }, 1000 / 60);
    }

    randomise(){
        this.x = Math.random() * 4000;
        this.y = Math.random() * -100;
        this.velocityY = Math.random()*2;
        if (this.velocityY < 0.4) {
            this.velocityY * 3;
        }
    }

}