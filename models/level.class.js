class Level {
    backgroundObjects;
    enemies;
    asteroids;
    tiles;
    creatures;
    level_end_x = 4000;

    constructor(backgroundObjects, enemies, asteroids, tiles, creatures){
        this.enemies = enemies;
        this.asteroids = asteroids;
        this.backgroundObjects = backgroundObjects;
        this.tiles = tiles;
        this.creatures = creatures;
    }
}