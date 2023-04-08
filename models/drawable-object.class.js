class DrawableObject {
    x = 100;
    y = 180;
    img;
    height = 250;
    width = 100;
    imageCache = [];
    currentImage = 0;
    
    
    //loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Tile) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }

    drawFrameHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Tile) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
        }

    }
}