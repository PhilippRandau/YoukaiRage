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


    adjustCropbox() {
        return {
            x: 0,
            y: 0,
            width: this.statusBarFillCropbox(),
            height: this.img.height,
        }
    }

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
        // console.log(this.img, this.statusBarFill())
    }

    statusBarFillCropbox() {
        if (this.formImg === 'adjustable') {
            return this.img.width / 100 * this.percentage;
        } else {
            return this.img.width;
        }
    }

    statusBarFillIMG() {
        if (this.formImg === 'adjustable') {
            return this.width / 100 * this.percentage;
        } else {
            return this.width;
        }
    }

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