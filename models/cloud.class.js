class Cloud extends MovableObject {
    y = 0;
    width = 360;
    height = 240;
    velocityX = 0.15;
    
    constructor(imgPath, x) {
        super().loadImage(imgPath);

        this.x = x
        this.animate();


    }

    animate(){
        this.moveLeft();
    }
}