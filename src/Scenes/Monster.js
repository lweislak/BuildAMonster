class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //Body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_yellowA.png");

        //Arms
        my.sprite.rightArm = this.add.sprite(this.bodyX + 100, this.bodyY + 50, "monsterParts", "arm_yellowB.png");
        my.sprite.leftArm = this.add.sprite(this.bodyX - 100, this.bodyY + 50, "monsterParts", "arm_yellowB.png");
        my.sprite.leftArm.flipX = true; //flip left arm

        //Legs
        my.sprite.rightLeg = this.add.sprite(this.bodyX + 50, this.bodyY + 150, "monsterParts", "leg_yellowB.png");
        my.sprite.leftLeg = this.add.sprite(this.bodyX - 50, this.bodyY + 150, "monsterParts", "leg_yellowB.png");
        my.sprite.leftLeg.flipX = true;

        //Eyes
        my.sprite.rightEye = this.add.sprite(this.bodyX + 30, this.bodyY - 20, "monsterParts", "eye_cute_light.png");
        my.sprite.rightEye.setScale(.70); //scale down to 70% of original sprite size
        my.sprite.leftEye = this.add.sprite(this.bodyX - 30, this.bodyY - 20, "monsterParts", "eye_cute_light.png");
        my.sprite.leftEye.setScale(.70); //scale down to 70% of original sprite size

        //Mouth
        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY + 25, "monsterParts", "mouthA.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 25, "monsterParts", "mouthB.png");
        my.sprite.default = this.add.sprite(this.bodyX, this.bodyY + 25, "monsterParts", "mouthG.png");
        my.sprite.fangs.visible = false; //start with fangs invisible
        my.sprite.smile.visible = false; //start with smile invisibile

        //Set listener for keys
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        //Change mouth depending on key press
        //Note: Is it better to move these functions to update() and replace with .isDown?
        this.sKey.on('down', (key, event) => { //smile when S key is held down
            my.sprite.default.visible = false;
            my.sprite.smile.visible = true;
        });
        this.sKey.on('up', (key, event) => { //reset to default when S key is released
            my.sprite.default.visible = true;
            my.sprite.smile.visible = false;
        });
        this.fKey.on('down', (key, event) => { //fangs when F key is held down
            my.sprite.default.visible = false;
            my.sprite.fangs.visible = true;
        });
        this.fKey.on('up', (key, event) => { //reset to default when F key is released
            my.sprite.default.visible = true;
            my.sprite.fangs.visible = false;
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
 
        if (this.leftKey.isDown) {
            this.bodyX--; //decrement X coordinate to move body position left
            this.updateSpritePosition();
        } else if (this.rightKey.isDown) {
            this.bodyX++; //increment X coordinate to move body position right
            this.updateSpritePosition();
        }
    }

    //Move all individual sprites, https://learn.yorkcs.com/2019/09/28/phaser-3-basics-changing-positions/
    //Note: There has got to be an easier way to do this
    updateSpritePosition() {
        let my = this.my;    // create an alias to this.my for readability
        my.sprite.body.setX(this.bodyX);
        my.sprite.rightArm.setPosition(this.bodyX + 100, this.bodyY + 50);
        my.sprite.leftArm.setPosition(this.bodyX - 100, this.bodyY + 50);
        my.sprite.rightLeg.setPosition(this.bodyX + 50, this.bodyY + 150);
        my.sprite.leftLeg.setPosition(this.bodyX - 50, this.bodyY + 150);
        my.sprite.rightEye.setPosition(this.bodyX + 30, this.bodyY - 20);
        my.sprite.leftEye.setPosition(this.bodyX - 30, this.bodyY - 20);
        my.sprite.default.setPosition(this.bodyX, this.bodyY + 25);
        my.sprite.smile.setPosition(this.bodyX, this.bodyY + 25);
        my.sprite.fangs.setPosition(this.bodyX, this.bodyY + 25);
    }

}