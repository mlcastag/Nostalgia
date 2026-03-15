class PlayTwo extends Phaser.Scene{
    constructor(){
        super('playTwoScene')
    }

    init(){

    }

    create(){

        // Add map
        const map = this.add.tilemap('bigSur')
        const tileset = map.addTilesetImage('tileset', 'tiles')
        const floorLayer = map.createLayer('floorLayer', tileset, 0, 0)
        this.objectLayer = map.createLayer('objectLayer', tileset, 0, 0)

        // Keys
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // Add player
        this.player = new Player(this, 500, 550, this.cursors, this.objectLayer)

        // Text 
        this.tempBox = this.add.image(this.scale.width / 2, this.scale.height + -100, 'tempBox').setScale(.3)
        this.tempBox.setVisible(false)

        this.dialogue = this.add.text(this.tempBox.x + 15, this.tempBox.y + 50, 'test', {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            wordWrap: {width: this.tempBox.width - 50}
        }).setOrigin(0.5, 0.5)
        this.dialogue.setVisible(false)

        this.interactPrompt = this.add.text(500, 500, 'Press \'E\' to interact', {
            font: 'Arial',
            fill: '#ffffff'
        })
        this.interactPrompt.setVisible(false)

        this.leavePrompt = this.add.text(0, 0, 'Press \'SPACE\' to continue', {
            font: 'Arial',
            fill: '#ffffff'
        })
        this.leavePrompt.setVisible(false)

        // Collision
        this.objectLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, this.objectLayer)
    }

    update(){

        this.player.update()

        // Continue
        if(Phaser.Input.Keyboard.JustDown(this.keySTART) /* && other conditions */){
            this.scene.start('playTwoScene')
        }

        if(this.view == 1/* && other conditions */){
            this.leavePrompt.setVisible(true)
            this.leavePrompt.setPosition(this.player.x - 60, this.player.y - 55)
        }

        const tile = this.player.look()
        if(tile && tile.properties.interact){
            this.interactPrompt.setPosition(this.player.x - this.interactPrompt.width / 2, this.player.y - 40)
            this.interactPrompt.setVisible(true)

            if(Phaser.Input.Keyboard.JustDown(this.keyINTERACT)){
                this.interactions(tile.properties.interact)
            }

        }else{
            this.interactPrompt.setVisible(false)
            this.tempBox.setVisible(false)
            this.dialogue.setVisible(false)
        }

        // Restart
        if(Phaser.Input.Keyboard.JustDown(this.keyRESTART)){
            this.scene.start('menuScene')
            backgroundMusic.stop()
            backgroundMusic.play()
        }

    }

    interactions(prompt){
        switch(prompt){
            case 'View':
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('I\'ll never forget those views.')
                this.view = 1
                break
            case 'Stage': 
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('We saw so many great shows.')
                this.stage = 1
                break
            case 'Sweet Tea': 
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('I still miss those sweet tea lemonades.')
                this.sweetTea = 1
                break
        }
    }

}