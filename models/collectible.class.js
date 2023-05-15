class Collectible extends DrawableObject {
    constructor(collectibleID, x, y) {
        super().switchSprite('img/08_collectibles/Card.png', 8, 13);
        this.collectibleID = collectibleID;
        this.x = x;
        this.y = y;
    }

    collecting_sound = new Audio('audio/collecting/collecting.mp3')

    collect() {
        this.world.character.addPoints(20)
        if (audio) {
            this.collecting_sound.play();
        }

        delete this.world.collectibles[this.collectibleID];
    }
}