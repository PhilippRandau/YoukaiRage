class CollisionHandler {
    character;
    collisionBlocks;
    throwableObjects;
    collectibles;
    enemies;
    tileCollisions2D = [];

    constructor(character, collisionBlocks, throwableObjects, collectibles, enemies) {
        this.character = character;
        this.collisionBlocks = collisionBlocks;
        this.throwableObjects = throwableObjects;
        this.collectibles = collectibles;
        this.enemies = enemies;
        this.generateCollisionBlocks();
    }

    /**
    * Generates collision blocks for the world.
    */
    generateCollisionBlocks() {
        for (let i = 0; i < tileCollisions.length; i += 300) {
            this.tileCollisions2D.push(tileCollisions.slice(i, i + 300))
        }
        this.tileCollisions2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol >= 1) {
                    this.collisionBlocks.push(new CollisionBlock(x * 32, y * 32))
                }
            })
        })
    }

    /**
    * Checks for block collisions with the character.
    */
    checkforBlockCollisionsCharacter() {
        this.character.updateHitbox();
        this.checkforHorizontalCollisions();
        this.character.applyGravity();
        this.character.updateHitbox();
        this.checkforVerticalCollisions();
    }

    /**
    * Checks for collisions between various game objects.
    */
    checkCollisions() {
        this.enemyCollisions();
        this.endbossCollisions();
        this.throwableObjectsCollisions()
        this.collectiblesCollisions();
    }


    /**
    * Handles collisions with enemies.
    */
    enemyCollisions() {
        this.enemies.forEach(enemy => {
            enemy.update();
            if (this.character.isCollidingHitbox(this.character.hitbox, enemy.hitbox) && !this.character.isJumping() && !this.character.isDead() && this.character.isFalling() && !enemy.isDead()) {
                if (this.character.lastHitTime === undefined || this.isTimePassed(500)) {
                    this.character.enemieHit = true;
                    enemy.hit();
                    this.character.lastHitTime = Date.now();
                }
            } else if (this.character.isCollidingHitbox(this.character.hitbox, enemy.hitbox) && !this.character.isDead() && !enemy.isDead()) {
                if (this.character.lastHitTime === undefined || this.isTimePassed(500)) {
                    this.character.hit();
                    this.character.lastHitTime = Date.now();
                }
            }
        });
    }




    /**
    * Handles collisions with the end boss.
    */
    endbossCollisions() {
        if (this.enemies[18]) {
            let endboss = this.enemies[18];
            if (endboss.isCollidingHitbox(endboss.hitboxAttack, this.character.hitbox) && !this.character.isDead() && endboss.isDead() && endboss.isAttacking) {
                if (this.character.lastHitTime === undefined || this.isTimePassed(500)) {
                    this.character.hit();
                    this.character.lastHitTime = Date.now();
                }
            }
        }
    }


    /**
    * Handles collisions with throwable objects.
    */
    throwableObjectsCollisions() {
        this.throwableObjects.forEach((throwableObject) => {
            throwableObject.update();
            throwableObject.world = this;
            if (this.enemies[18].isCollidingHitbox(this.enemies[18].hitbox, throwableObject.hitbox) && !this.enemies[18].isDead() && !throwableObject.hit) {
                this.enemies[18].hit();
                throwableObject.hit = true;
            }
        });
    }

    /**
     * Handles collisions with collectibles.
     */
    collectiblesCollisions() {
        this.collectibles.forEach((collectible) => {
            if (this.character.isCollidingHitbox(this.character.hitbox, collectible)) {
                collectible.collect();
                if (this.character.charges < 100) {
                    this.character.changeChargePoints(5);
                }
            }
        })
    }


    /**
    * Checks if a certain amount of time has passed since the character's last hit.
    * @param {number} time - The time threshold in milliseconds.
    * @returns {boolean} - True if the specified time has passed, false otherwise.
     */
    isTimePassed(time) {
        return Date.now() - this.character.lastHitTime > time;
    }


    /**
    * Checks for horizontal collisions between the character and collision blocks.
    */
    checkforHorizontalCollisions() {
        this.collisionBlocks.forEach(collisionBlock => {
            this.characterHorizontalCollision(collisionBlock);
            this.throwableObjectsHorizontalCollision(collisionBlock);
        });
    }


    /**
    * Handles horizontal collisions between the character and a collision block.
    * @param {Object} collisionBlock - The collision block to check against.
    */
    characterHorizontalCollision(collisionBlock) {
        if (this.character.isCollidingHitbox(this.character.hitbox, collisionBlock)) {
            if (this.character.velocityX > 0) {
                this.character.velocityX = 0;
                const offset = this.character.hitbox.x - this.character.x + this.character.hitbox.width;
                this.character.x = collisionBlock.x - offset - 0.01;
            }
            if (this.character.velocityX < 0) {
                this.character.velocityX = 0;
                const offset = this.character.hitbox.x - this.character.x;
                this.character.x = collisionBlock.x + collisionBlock.width - offset + 0.01;
            }
        }
    }


    /**
    * Handles horizontal collisions between throwable objects and a collision block.
    * @param {Object} collisionBlock - The collision block to check against.
    */
    throwableObjectsHorizontalCollision(collisionBlock) {
        this.throwableObjects.forEach(throwableObject => {
            if (throwableObject.isCollidingHitbox(throwableObject.hitbox, collisionBlock) && !throwableObject.hit) {
                throwableObject.hit = true;
                throwableObject.animate();
            }
        })
    }


    /**
    * Checks for vertical collisions between the character and collision blocks.
    */
    checkforVerticalCollisions() {
        this.collisionBlocks.forEach(collisionBlock => {
            if (this.character.isCollidingHitbox(this.character.hitbox, collisionBlock)) {
                if (this.character.velocityY > 0) {
                    this.character.velocityY = 0;
                    const offset = this.character.hitbox.y - this.character.y + this.character.hitbox.height;
                    this.character.y = collisionBlock.y - offset - 0.01;
                }
                if (this.character.velocityY < 0) {
                    this.character.velocityY = 0;
                    const offset = this.character.y - this.character.hitbox.y;
                    this.character.y = collisionBlock.y + collisionBlock.height + offset + 0.01;
                }
            }
        });

    }

    /**
     * Checks for block collisions for all enemies.
     */
    checkforBlockCollisionsEnemies() {
        this.everyEnemyUpdateHitbox();
        this.everyEnemyHorizontalBlockCollisions();
        this.everyEnemyApplyGravity();
        this.everyEnemyUpdateHitbox();
        this.everyEnemyVerticalBlockCollisions();
    }


    /**
    * Updates the hitbox of every enemy.
    */
    everyEnemyUpdateHitbox() {
        this.enemies.forEach(enemy => {
            enemy.updateHitbox();
        });
    }


    /**
    * Checks for horizontal block collisions for every enemy.
    */
    everyEnemyHorizontalBlockCollisions() {
        this.enemies.forEach(enemy => {
            this.collisionBlocks.forEach(collisionBlock => {
                this.checkforHorizontalBlockCollisionsEnemies(enemy, collisionBlock);
            });
        });
    }


    /**
     * Applies gravity to every enemy.
     */
    everyEnemyApplyGravity() {
        this.enemies.forEach(enemy => {
            enemy.applyGravity();
        });
    }


    /**
    *  Updates the hitbox of every enemy.
    */
    everyEnemyUpdateHitbox() {
        this.enemies.forEach(enemy => {
            enemy.updateHitbox();
        });
    }


    /**
    * Checks for vertical block collisions for every enemy.
    */
    everyEnemyVerticalBlockCollisions() {
        this.enemies.forEach(enemy => {
            this.collisionBlocks.forEach(collisionBlock => {
                this.checkforVerticalBlockCollisionsEnemies(enemy, collisionBlock);
            });
        });
    }

    /**
     * Checks for horizontal block collisions for a specific enemy.
     * @param {Enemy} enemy - The enemy to check collisions for.
     * @param {CollisionBlock} collisionBlock - The collision block to check collisions against.
     */
    checkforHorizontalBlockCollisionsEnemies(enemy, collisionBlock) {
        if (enemy.isCollidingHitbox(enemy.hitbox, collisionBlock)) {
            if (enemy.velocityX > 0) {
                enemy.velocityX = 0;
                const offset = enemy.hitbox.x - enemy.x + enemy.hitbox.width;
                enemy.x = collisionBlock.x - offset - 0.01;
            }
            if (enemy.velocityX < 0) {
                enemy.velocityX = 0;
                const offset = enemy.hitbox.x - enemy.x;
                enemy.x = collisionBlock.x + collisionBlock.width - offset + 0.01;
            }
        }
    }


    /**
     * Checks for vertical block collisions for a specific enemy.
     * @param {Enemy} enemy - The enemy to check collisions for.
     * @param {CollisionBlock} collisionBlock - The collision block to check collisions against.
     */
    checkforVerticalBlockCollisionsEnemies(enemy, collisionBlock) {
        if (enemy.isCollidingHitbox(enemy.hitbox, collisionBlock)) {
            if (enemy.velocityY > 0) {
                enemy.velocityY = 0;
                const offset = enemy.hitbox.y - enemy.y + enemy.hitbox.height;
                enemy.y = collisionBlock.y - offset - 0.01;
            }
            if (enemy.velocityY < 0) {
                enemy.velocityY = 0;
                const offset = enemy.y - enemy.hitbox.y;
                enemy.y = collisionBlock.y + collisionBlock.height + offset + 0.01;
            }
        }
    }
}

