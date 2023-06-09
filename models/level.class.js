class Level {
    backgroundObjects;
    enemies;
    asteroids;
    tiles;
    creatures;
    fallingAsteroids;
    collisionBlocks;
    collectibles;
    level_end_x_right = 8000;
    level_end_x_left = -800;

    constructor(backgroundObjects, enemies, asteroids, tiles, creatures, fallingAsteroids, collisionBlocks, collectibles){
        this.enemies = enemies;
        this.asteroids = asteroids;
        this.backgroundObjects = backgroundObjects;
        this.tiles = tiles;
        this.creatures = creatures;
        this.fallingAsteroids = fallingAsteroids;
        this.collisionBlocks = collisionBlocks;
        this.collectibles = collectibles;
    }
}