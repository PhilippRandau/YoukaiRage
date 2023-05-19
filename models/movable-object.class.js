class MovableObject extends DrawableObject {
    enemieID;
    otherDirection = false;
    velocityX = 0;
    velocityY = 1;
    gravity = 0.02;
    energy = 100;
    lastHit = 0;
    previousImg;
    hitbox = {
        x: this.x,
        y: this.y,
        width: 20,
        height: 20,
    }

    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }

    gameOverScreenShown = false;


    /**
    * Shows the game over screen if it has not been shown already.
    */
    showGameOverScreen() {
        if (this.gameOverScreenShown) {
            return;
        }

        this.gameOverScreenShown = true;
        setTimeout(() => {
            world.enemies.forEach(enemy => {
                enemy.pauseSounds();
            });
            this.pauseSounds();
            this.backgroundSoundsPause();
            document.getElementById('outroScreen').classList.remove('d-none');
            document.getElementById('fullscreen').classList.add('d-none');
            document.getElementById('endScore').innerHTML = `Score: ${this.world.character.points}`
        }, 1000);
    }


    /**
    * Pauses the background sounds.
    */
    backgroundSoundsPause() {
        this.world.background_Sound_Outside.pause();
        this.world.background_Sound_EnemyBase.pause();
    }


    /**
    * Applies gravity to the object's position.
    */
    applyGravity() {
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        if (this.hitbox.y < 0) {
            this.velocityY = 0.05;
        }
        if (this.y + this.height + this.velocityY < canvas.height) {
            this.velocityY += this.gravity;
        } else {
            // Stopps falling lower than canvas height
            // this.velocityY = 0;
        }
        if (this.y + this.height > canvas.height && this.energy > 0) {
            this.instantDeath();
        }


    }


    /**
    * Checks if the object is currently on the ground.
    * @returns {boolean} True if the object is on the ground, false otherwise.
    */
    isOnGround() {
        return this.velocityY === 0;
    }


    /**
    * Plays an animation by cycling through the specified images.
    * @param {string[]} images - An array of image paths.
    * @param {number} framesPerImage - The number of frames to display each image.
    */
    playAnimation(images, framesPerImage) {
        if (!this.animationCounter || this.animationCounter >= framesPerImage) {
            this.animationCounter = 0;
            this.currentImage = (this.currentImage + 1) % images.length;
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
        }
        this.animationCounter++;
    }


    /**
    * Checks if two objects' hitboxes are colliding.
    * @param {Object} object1 - The first object with a hitbox.
    * @param {Object} object2 - The second object with a hitbox.
    * @returns {boolean} True if the hitboxes are colliding, false otherwise.
    */
    isCollidingHitbox(object1, object2) {
        return object1.y + object1.height >= object2.y &&
            object1.y <= object2.y + object2.height &&
            object1.x <= object2.x + object2.width &&
            (object1.x + object1.width) >= object2.x;
    }


    /**
    * Triggers an instant death by setting the energy to 0.
    */
    instantDeath() {
        this.energy = 0;
        if (this instanceof Character) {
            this.world.statusText[0].setPercentage(this.energy);
        }
    }


    /**
     * Handles the hit action on the life form.
     */
    hit() {
        this.lastHit = new Date().getTime();
        if (this instanceof Character) {
            this.hitCharacter();
        }
        if (this instanceof Worker || this instanceof MechWorker || this instanceof Dumper) {
            this.hitEnemies();
        }
        if (this instanceof Endboss) {
            this.hitEndboss();
        }
        this.lifeFormHitSound();
    }


    /**
    * Handles the hit action on the character.
    */
    hitCharacter() {
        this.energy -= 20;
        this.world.statusText[0].setPercentage(this.energy);
        if (world.character.points > 0) {
            this.addPoints(-20);
        }
    }


    /**
     * Handles the hit action on the enemies.
     */
    hitEnemies() {
        this.energy -= 20;
        this.addPoints(20);
    }


    /**
    * Handles the hit action on the end boss.
    */
    hitEndboss() {
        this.energy -= 10;
        this.world.statusBar[1].setPercentage(this.energy);
        this.world.statusText[3].setPercentage(this.energy);
        this.addPoints(50);
    }


    /**
    * Plays the hit sound for the life form.
    */
    lifeFormHitSound() {
        this.hurt_sound.currentTime = 0;
        this.playSound(this.hurt_sound);
    }


    /**
    * Adds points to the character's score.
    * @param {number} amount - The amount of points to add.
    */
    addPoints(amount) {
        this.world.character.points += amount;
        this.world.statusText[2].setPercentage(this.world.character.points);
    }


    /**
    * Checks if the life form is currently hurt.
     * @returns {boolean} True if the life form is hurt, false otherwise.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }


    /**
    * Checks if the life form is dead.
    * @returns {boolean} True if the life form is dead, false otherwise.
    */
    isDead() {
        return this.energy === 0;
    }


    /**
    * Plays a sound.
    * @param {HTMLAudioElement} sound - The audio element to play.
    */
    playSound(sound) {
        if (audio) {
            sound.play();
        }
    }


    /**
     * Updates the hitbox position and dimensions.
     */
    updateHitbox() {
        this.hitbox.x = this.x + this.offset.x;
        this.hitbox.y = this.y + this.offset.y;
        this.hitbox.width = this.offset.width;
        this.hitbox.height = this.offset.height;

        if (this instanceof Endboss) {
            this.endbossShootingHitbox();
        }
    }


    /**
    * Updates the shooting hitbox position and dimensions for the end boss.
    */
    endbossShootingHitbox() {
        if (!this.otherDirection) {
            this.hitboxAttack.x = this.hitbox.x + this.hitbox.width;
        } else {
            this.hitboxAttack.x = this.x + this.offsetAttack.x;
        }
        this.hitboxAttack.y = this.y + this.offsetAttack.y;
        this.hitboxAttack.width = this.offsetAttack.width;
        this.hitboxAttack.height = this.offsetAttack.height;
    }



}
