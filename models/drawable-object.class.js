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


    /**
     * Loads an image from the given path and sets the width and height based on the image dimensions.
     * @param {string} path - The path of the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            this.width = (this.img.width / this.frameRate) * this.imgScale;
            this.height = this.img.height * this.imgScale;
        }
        this.img.src = path;
    }


    /**
     * Loads multiple images from an array of paths and caches them.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
    * Switches the sprite image, frame rate, and frame buffer.
    * @param {string} img - The path of the new sprite image.
    * @param {number} frameRate - The frame rate of the sprite animation.
    * @param {number} frameBuffer - The number of frames to buffer before switching.
    */
    switchSprite(img, frameRate, frameBuffer) {
        if (img !== this.previousImg) {
            this.currentFrame = 0;
        }
        this.loadImage(img);
        this.frameRate = frameRate;
        this.frameBuffer = frameBuffer;
        this.previousImg = img;
    }


    /**
    * Returns the crop box coordinates for the current frame of the sprite.
    * @returns {Object} The crop box coordinates.
    */
    cropbox() {
        return {
            x: this.currentFrame * this.img.width / this.frameRate,
            y: 0,
            width: this.img.width / this.frameRate,
            height: this.img.height,
        }
    }


    /**
    * Draws the sprite on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
    */
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


    /**
    * Updates the current frame of the sprite based on the frame buffer and frame rate.
    */
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


    /**
    * Draws the frame of the sprite on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof MechWorker || this instanceof Worker || this instanceof Endboss || this instanceof Dumper || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof CollisionBlock) {
            world.collisionBlocks.forEach(collisionBlock => {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 0, 0 , 0.5)'
                ctx.fillRect(collisionBlock.x, collisionBlock.y, collisionBlock.width, collisionBlock.height)
                ctx.stroke();
            })

        }
    }


    /**
    * Draws the hitbox of the sprite on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
    */
    drawFrameHitbox(ctx) {
        if (this instanceof Character || this instanceof MechWorker || this instanceof Worker || this instanceof Endboss || this instanceof Dumper || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
            ctx.stroke();

            if (this instanceof Endboss) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = 'red';
                ctx.rect(this.hitboxAttack.x, this.hitboxAttack.y, this.hitboxAttack.width, this.hitboxAttack.height);
                ctx.stroke();
            }
        }
    }


    /**
    * Checks if the sprite is colliding with another sprite.
     * @param {Object} mo - The other sprite to check collision with.
    * @returns {boolean} True if collision occurs, false otherwise.
    */
    isColliding(mo) {
        return this.y + this.height >= mo.y &&
            this.y <= mo.y + mo.height &&
            this.x <= mo.x + mo.width &&
            (this.x + this.width) >= mo.x;
    }
}

