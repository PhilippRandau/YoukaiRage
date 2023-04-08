class Tile extends DrawableObject{

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    constructor(img, x, y) {
        super();
        this.img = img;
        this.loadImage(this.img);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
}