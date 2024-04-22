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
        my.sprite.eye = this.add.sprite(this.bodyX + 30, this.bodyY - 20, "monsterParts", "eye_cute_light.png");
        my.sprite.eye.setScale(.70); //scale down to 70% of original sprite size
        my.sprite.eye = this.add.sprite(this.bodyX - 30, this.bodyY - 20, "monsterParts", "eye_cute_light.png");
        my.sprite.eye.setScale(.70); //scale down to 70% of original sprite size

        //Mouth
        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY + 25, "monsterParts", "mouthA.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 25, "monsterParts", "mouthB.png");
        my.sprite.default = this.add.sprite(this.bodyX, this.bodyY + 25, "monsterParts", "mouthG.png");
        my.sprite.fangs.visible = false; //starts with fangs invisible
        my.sprite.smile.visible = false; //TEST
        
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); //set listener for the S key
        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); //set listener for the F key


        //Change mouth depending on key press
        sKey.on('down', (key, event) => { //smile when S key is held down
            my.sprite.default.visible = false;
            my.sprite.smile.visible = true;
        });
        sKey.on('up', (key, event) => { //reset to default when S key is released
            my.sprite.default.visible = true;
            my.sprite.smile.visible = false;
        });
        fKey.on('down', (key, event) => { //fangs when F key is held down
            my.sprite.default.visible = false;
            my.sprite.fangs.visible = true;
        });
        fKey.on('up', (key, event) => { //reset to default when F key is released
            my.sprite.default.visible = true;
            my.sprite.fangs.visible = false;
        });
    }

    update() {
        //Hints: use a for loop to move
        //Note: Use justdown to move monster
        let my = this.my;    // create an alias to this.my for readability
        
    }

}