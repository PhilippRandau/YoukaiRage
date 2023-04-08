class StatusBar extends DrawableObject {

    IMAGES = [];
    y = 0;

    constructor(IMAGES, x, y, statusBarLevel) {
        super();
        this.IMAGES = IMAGES;
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 50;
        this.setPercentage(statusBarLevel);
        if (IMAGES[0] == 'img/7_statusbars/3_icons/icon_health_endboss.png') {
            this.width = 50;
            this.height = 50;
        }
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
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