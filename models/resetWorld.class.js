class ResetWorld {
    constructor(world) {
        world.collectibles.splice(0, world.collectibles.length);
        world.enemies.splice(0, world.enemies.length);
        world.collisionBlocks.splice(0, world.collisionBlocks.length);
        world.camera_x = 506.01;
        delete world.character;
        world.character = new Character();

        world.enemies.push(
            new Worker(0, -538, 250, false),
            new Worker(1, -386, 250, true),
            new Worker(2, 15, 250, true),
            new Worker(3, 210, 250, false),
            new Worker(4, 260, 250, true),
            new Worker(5, 487, 250, true),
            new Worker(6, 722, 250, true),
            new Worker(7, 2800, 250, false),
            new Worker(8, 2850, 250, true),
            new Worker(9, 5421, 230, true),
            new Dumper(10, -161, 250, true),
            new Dumper(11, 980, 250, true),
            new Dumper(12, 1657, 250, true),
            new Dumper(13, 2696, 250, true),
            new MechWorker(14, 1962, 125, true),
            new MechWorker(15, 3429, 250, true),
            new MechWorker(16, 4080, 250, true),
            new MechWorker(17, 4658, 250, true),
            new Endboss(18, 6800, 250, true),
        );
        world.collectibles.push(
            new Collectible(0, -150, 60),
            new Collectible(1, -120, 60),
            new Collectible(2, -90, 60),
            new Collectible(3, -60, 60),
            new Collectible(4, 130, 120),
            new Collectible(5, 160, 120),
            new Collectible(6, 870, 120),
            new Collectible(7, 900, 120),
            new Collectible(8, 930, 120),
            new Collectible(9, 2785, 90),
            new Collectible(10, 2755, 90),
            new Collectible(11, 2725, 90),
            new Collectible(12, 2950, 90),
            new Collectible(13, 3140, 90),
            new Collectible(14, 3300, 180),
            new Collectible(15, 5925, 280),
            new Collectible(16, 5955, 280),
            new Collectible(17, 6660, 160),
            new Collectible(18, 6725, 160),
            new Collectible(19, 7110, 420),
            new Collectible(20, 7140, 420),
            new Collectible(21, 7170, 420),
        );
    }
}