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
        // this.percentage = percentage;
        this.textColor = textColor;
        this.setPercentage(percentage);

    }

    drawText(ctx) {
        ctx.fillStyle = this.textColor;
        switch (this.text) {
            case 'Boss Health':
                ctx.font = "26px PixelGothic";
                ctx.fillText(this.percentage + ' | 100', this.xNumber, this.yNumber);
                break;

            case 'Points':
                ctx.font = "50px PixelGothic";
                ctx.fillText(this.percentage, this.xNumber, this.yNumber);
                break;
            case 'Health':
            case 'Charge':
                ctx.font = "30px PixelGothic";
                ctx.fillText(this.percentage + ' | 100', this.xNumber, this.yNumber);
                ctx.fillText(this.percentage, this.xNumber, this.yNumber);
                break;
        }
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text, this.xName, this.yName);
        

    }

    setPercentage(percentage) {
        this.percentage = percentage;
    }


}