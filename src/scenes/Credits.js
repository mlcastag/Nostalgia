class Credits extends Phaser.Scene {
    constructor(){
        super('creditsScene')
    }

    create(){
        // Text
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 5, 'highSchool', 'Made By: Matt Castagna', 64).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 3.5, 'highSchool', 'Assets By: LimeZu', 64).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 2.8, 'highSchool', 'Music By: The Wood Brothers', 64).setOrigin(0.5)

        // Picture
        this.creditsPhoto = this.add.image(this.scale.width / 2, this.scale.height / 1.4 , 'creditsPhoto').setScale(.5)

        // Keys
        this.keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    
    }

    update(){
        
        // Return
        if(Phaser.Input.Keyboard.JustDown(this.keyCREDITS)){
            this.scene.start('menuScene')
        }

        // Restart
        if(Phaser.Input.Keyboard.JustDown(this.keyRESTART)){
            this.scene.start('menuScene')
            backgroundMusic.stop()
            backgroundMusic.play()
        }
    }

}