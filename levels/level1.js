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
        new Worker(0, -538, 259, false),
        new Worker(1, -386, 259, true),
        new Worker(2, 15, 259, true),
        new Worker(3, 210, 259, false),
        new Worker(4, 260, 259, true),
        new Worker(5, 487, 259, true),
        new Worker(6, 722, 259, true),
        new Dumper(7, 50, 259, true),
        new Dumper(8, 200, 259, true),
        new MechWorker(9, 1962, 131, true), //1962
        new MechWorker(10, 3429, 259, true),
        new MechWorker(11, 4658, 259, true),
        new Endboss(12),
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