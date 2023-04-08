class Level {
    backgroundObjects;
    enemies;
    clouds;
    tiles;
    level_end_x = 2200;

    constructor(backgroundObjects, enemies, clouds, tiles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.tiles = tiles;
    }
}