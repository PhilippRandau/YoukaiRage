class StatusBar extends DrawableObject {
    IMAGES = [];
    y = 0;


    constructor(IMAGES, x, y, width, height, statusBarLevel, formImg) {
        super();
        this.IMAGES = IMAGES;
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.formImg = formImg;
        this.setPercentage(statusBarLevel);
    }


    /**
    * Adjusts the cropbox based on the percentage filled and returns the updated cropbox object.
    * @returns {object} The adjusted cropbox object with x, y, width, and height properties.
    */
    adjustCropbox() {
        return {
            x: 0,
            y: 0,
            width: this.statusBarFillCropbox(),
            height: this.img.height,
        }
    }


    /**
    * Draws the status bar on the canvas.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    draw(ctx) {
        let cropbox;
        if (this.formImg === 'adjustable') {
            cropbox = this.adjustCropbox();
        } else {
            cropbox = this.cropbox();
        }

        ctx.drawImage(
            this.img,
            cropbox.x,
            cropbox.y,
            cropbox.width,
            cropbox.height,
            this.x + this.offsetCenterIMG,
            this.y,
            this.statusBarFillIMG(),
            this.height);

        this.updateFrames();
    }


    /**
    * Calculates the width of the cropbox based on the percentage filled.
    * @returns {number} The width of the cropbox.
    */
    statusBarFillCropbox() {
        if (this.formImg === 'adjustable') {
            return this.img.width / 100 * this.percentage;
        } else {
            return this.img.width;
        }
    }


    /**
    * Calculates the width of the status bar image based on the percentage filled.
    * @returns {number} The width of the status bar image.
    */
    statusBarFillIMG() {
        if (this.formImg === 'adjustable') {
            return this.width / 100 * this.percentage;
        } else {
            return this.width;
        }
    }


    /**
    * Sets the percentage filled and updates the status bar image accordingly.
    * @param {number} percentage - The percentage filled.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path;
        if (this.formImg === 'adjustable') {
            path = this.IMAGES[0];
        } else {
            path = this.IMAGES[this.resolveImageIndex()];
        }
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the image index based on the percentage filled.
     * @returns {number} The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }
}