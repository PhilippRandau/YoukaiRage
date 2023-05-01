class CollisionBlock extends DrawableObject {
    width = 32;
    height = 32;
    constructor(x, y) {
        super();
        
        this.x = x - 1570;
        this.y = y;
    }

    drawCollisionBlocks(ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}