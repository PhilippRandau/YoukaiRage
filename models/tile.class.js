class Tile extends DrawableObject {

    constructor(img, x, y) {
        super();
        this.img = img;

        this.x = x;
        this.y = y;
        this.loadImage(this.img);
    }
}