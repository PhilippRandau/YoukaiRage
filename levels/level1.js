const level1 = new Level(
    [
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space2/Pale/background.png', -719, 0),
        // new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719, 0),
        // new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719, 0),
        // new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719, 0),
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space2/Pale/background.png', 0, 0),
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space2/Pale/stars.png', -100, 0),
     
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space2/Bright/star.png', -100, 0),
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space1/Bright/rocks2_half.png', -100, 220),
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space1/Bright/rocks3_half.png', -100, 220),
        // new BackgroundObject('img/02_Tiles/Green Tiles.png', -800, 0),
        
        
        
        // new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0, 0),
        // new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space2/Pale/background.png', 719, 0),
        // new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719, 0),
        // new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719, 0),
        // new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719, 0),
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space2/Pale/background.png', 719 * 2, 0),
        // new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719*2, 0),
        // new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719*2, 0),
        // new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719*2, 0),
        new BackgroundObject('img/01_backgrounds/original_size/PNG/Space2/Pale/background.png', 719 * 3, 0),
        // new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719*3, 0),
        // new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719*3, 0),
        // new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719*3, 0),
    ],
    [
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
        new Endboss(18),
    ],
    [
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones1.png', -719),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones2.png', 0),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones1.png', 719),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones2.png', 719*2),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones1.png', 719*3),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones2.png', 719*4),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones1.png', 719*5),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones1.png', 719*6),
        new Asteroids('img/01_backgrounds/original_size/PNG/Space2/Pale/stones1.png', 719*7),
       
    ],
    [
        new Tile('img/02_Tiles/Youkai_Game.png', -1570, 0),
    ],
    [
        // new Rat(),
    ],
    [
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
        new FallingAsteroids('img/05_Effects/Magic/6.png'),
    ],
    [
        // Collision Blocks
    ]
);