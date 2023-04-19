class StatusText extends DrawableObject {
    y = 0;
    textColor;

    constructor(xName, yName, width, height, text, xNumber, yNumber, percentage, textColor) {
        super();
        this.xName = xName;
        this.yName = yName;
        this.width = width;
        this.height = height;
        this.text = text
        this.xNumber = xNumber;
        this.yNumber = yNumber;
        this.percentage = percentage;
        this.textColor = textColor;
        
    }

    drawText(ctx){
        ctx.font = "24px PixelGothic";

        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text, this.xName, this.yName);

        ctx.fillStyle = this.textColor;
        ctx.fillText(this.percentage + ' | 100', this.xNumber, this.yNumber);
        
    }

    setPercentage(percentage) {
        this.percentage = percentage;
    }


}