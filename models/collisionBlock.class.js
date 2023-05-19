class CollisionBlock extends DrawableObject {
    width = 32;
    height = 32;
    constructor(x, y) {
        super();

        this.x = x - 1570;
        this.y = y;
    }

    
    /**
     * Draws collision blocks on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    drawCollisionBlocks(ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}