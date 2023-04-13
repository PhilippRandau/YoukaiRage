class ThrowableObject extends MovableObject {
    otherDirectionCharge;
    constructor(x, y, otherDirectionCharge) {
        super().loadImage('img/03_character_youkai/Charge_2.png');
        this.frameRate = 4;
        // this.loadImages(this.IMAGES_CHARGING);

        this.otherDirectionCharge = otherDirectionCharge;
        this.charge();
        this.locChargeStart(x, y);
    }


    locChargeStart(x, y) {
        if (this.otherDirectionCharge) {
            this.x = x - 70;
        } else {
            this.x = x;
        }
        this.y = y;
    }

    charge() {
        setInterval(() => {
            if (this.otherDirectionCharge) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

}