class StatusText extends DrawableObject {
    y = 0;


    constructor(x, y, width, height, text) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text
        this.setPercentage(100);
        
    }

    drawText(ctx){
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x, this.y);

        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.percentage + ' / 100', 440, 45);
        
    }


    setPercentage(percentage) {
        this.percentage = percentage;
    }


}