class DrawableObject {
    x = 0;
    y = 180;
    img;
    imgScale = 1;
    imageCache = [];
    currentImage = 0;
    frameRate = 1;
    currentFrame = 0;
    frameBuffer = 30;
    elapsedFrames = 0;
    offsetCenterIMG = 0;
    world;
    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            this.width = (this.img.width / this.frameRate) * this.imgScale;
            this.height = this.img.height * this.imgScale;
        }
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


    cropbox() {
        return {
            x: this.currentFrame * this.img.width / this.frameRate,
            y: 0,
            width: this.img.width / this.frameRate,
            height: this.img.height,
        }
    }


    draw(ctx) {
        const cropbox = this.cropbox();
        ctx.drawImage(
            this.img,
            cropbox.x,
            cropbox.y,
            cropbox.width,
            cropbox.height,
            this.x + this.offsetCenterIMG,
            this.y,
            this.width,
            this.height);

        this.updateFrames();
    }
 
    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof MechWorker || this instanceof Worker || this instanceof Endboss || this instanceof Tile) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if(this instanceof CollisionBlock){
            world.collisionBlocks.forEach(collisionBlock => {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 0, 0 , 0.5)'
                ctx.fillRect(collisionBlock.x, collisionBlock.y, collisionBlock.width, collisionBlock.height)
                ctx.stroke();
            })
            
        }
    }

    drawFrameHitbox(ctx) {
        if (this instanceof Character || this instanceof MechWorker || this instanceof Worker || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
            ctx.stroke();
        }
    }


}

