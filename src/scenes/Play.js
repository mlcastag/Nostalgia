class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(){
        this.foodTrucks = 0
        this.stage = 0
        this.sweetTea = 0
        this.mattTalk = 0
    }

    create(){

        // Add map
        const map = this.add.tilemap('concert')
        const tileset = map.addTilesetImage('tileset','tiles')
        const floorLayer = map.createLayer('floorLayer', tileset, 0 , 0)
        this.objectLayer = map.createLayer('objectLayer', tileset, 0 , 0)
        
        // Add band
        this.singer = this.add.sprite(this.scale.width / 2, this.scale.height / 2.3, 'singer')
        this.drummer = this.add.sprite(this.scale.width / 2.6, this.scale.height / 2.4, 'drum')
        this.guitar = this.add.sprite(this.scale.width / 1.6, this.scale.height / 2.4, 'guitar')

        // Band Animations
        this.anims.create({
            key: 'singerAnim',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('singer', {start: 0, end: 5})
        })
        this.singer.play('singerAnim')
        this.anims.create({
            key: 'drumAnim',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('drum', {start: 0, end: 11})
        })
        this.drummer.play('drumAnim')
        this.anims.create({
            key: 'guitarAnim',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('guitar', {start: 0, end: 11})
        })
        this.guitar.play('guitarAnim')

        // Keys
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // Add NPC's
        this.phoneGuy = this.physics.add.sprite(this.scale.width - 200, this.scale.height / 8, 'phoneGuy', 5)
        this.phoneGuy.body.setSize(this.width, 48)
        this.phoneGuy.setImmovable(true)
        this.phoneGuy.body.setOffset(0, this.phoneGuy.height - 48)

        this.matt = this.physics.add.sprite(this.scale.width - 700, this.scale.height / 1.1, 'matt', 3)
        this.matt.body.setSize(this.width, 48)
        this.matt.setImmovable(true)
        this.matt.body.setOffset(0, this.matt.height - 48)
        
        this.mattZone = this.add.zone(this.matt.x, this.matt.y + 5, this.matt.width + 10, this.matt.height - 1)
        this.physics.world.enable(this.mattZone)
        this.mattZone.body.setImmovable(true)
        this.mattZone.setDataEnabled()
        this.mattZone.data.set('interact', 'Matt')

        this.randomOne = this.physics.add.sprite(this.scale.width - 500, this.scale.height / 1.6, 'randomOne', 1)
        this.randomOne.body.setSize(this.width, 48)
        this.randomOne.setImmovable(true)
        this.randomOne.body.setOffset(0, this.randomOne.height - 48)

        this.randomTwo = this.physics.add.sprite(this.scale.width - 400, this.scale.height / 1.5, 'randomTwo', 1)
        this.randomTwo.body.setSize(this.width, 48)
        this.randomTwo.setImmovable(true)
        this.randomTwo.body.setOffset(0, this.randomTwo.height - 48)

        this.randomThree = this.physics.add.sprite(this.scale.width - 370, this.scale.height / 1.5, 'randomThree', 1)
        this.randomThree.body.setSize(this.width, 48)
        this.randomThree.setImmovable(true)
        this.randomThree.body.setOffset(0, this.randomThree.height - 48)

        this.randomFour = this.physics.add.sprite(this.scale.width - 300, this.scale.height / 1.5, 'randomFour', 0)
        this.randomFour.body.setSize(this.width, 48)
        this.randomFour.setImmovable(true)
        this.randomFour.body.setOffset(0, this.randomFour.height - 48)
        
        this.randomFive = this.physics.add.sprite(this.scale.width - 270, this.scale.height / 1.5, 'randomFive', 2)
        this.randomFive.body.setSize(this.width, 48)
        this.randomFive.setImmovable(true)
        this.randomFive.body.setOffset(0, this.randomFive.height - 48)

        this.randomSix = this.physics.add.sprite(this.scale.width - 550, this.scale.height / 1.3, 'randomSix', 1)
        this.randomSix.body.setSize(this.width, 48)
        this.randomSix.setImmovable(true)
        this.randomSix.body.setOffset(0, this.randomSix.height - 48)

        this.randomSeven = this.physics.add.sprite(this.scale.width - 240, this.scale.height / 1.2, 'randomSeven', 1)
        this.randomSeven.body.setSize(this.width, 48)
        this.randomSeven.setImmovable(true)
        this.randomSeven.body.setOffset(0, this.randomSeven.height - 48)

        this.randomEight = this.physics.add.sprite(this.scale.width - 390, this.scale.height / 1.32, 'randomEight', 1)
        this.randomEight.body.setSize(this.width, 48)
        this.randomEight.setImmovable(true)
        this.randomEight.body.setOffset(0, this.randomEight.height - 48)


        // Add player
        this.player = new Player(this, 705, 550, this.cursors, this.objectLayer)
          
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
        this.physics.add.collider(this.player, this.phoneGuy)
        this.physics.add.collider(this.player, this.matt)
        this.physics.add.collider(this.player, this.randomOne)
        this.physics.add.collider(this.player, this.randomTwo)
        this.physics.add.collider(this.player, this.randomThree)
        this.physics.add.collider(this.player, this.randomFour)
        this.physics.add.collider(this.player, this.randomFive)
        this.physics.add.collider(this.player, this.randomSix)
        this.physics.add.collider(this.player, this.randomSeven)
        this.physics.add.collider(this.player, this.randomEight)

        this.physics.add.overlap(this.player, this.mattZone, () => {
            console.log('its working')
        })

    }

    update(){

        this.player.update()

        // Continue
        if(Phaser.Input.Keyboard.JustDown(this.keySTART) && this.foodTrucks == 1 && this.stage == 1 && this.sweetTea == 1  && this.mattTalk == 1/* && other conditions */){
            this.scene.start('playTwoScene')
        }

        if(this.foodTrucks == 1 && this.stage == 1 && this.sweetTea == 1 && this.mattTalk == 1/* && other conditions */){
            this.leavePrompt.setVisible(true)
            this.leavePrompt.setPosition(this.player.x - 60, this.player.y - 55)
        }

        // Player/Tile interactions
        const tile = this.player.look()
        const inDaZone = this.physics.overlap(this.player, this.mattZone)
        if(tile && tile.properties.interact || inDaZone){
            this.interactPrompt.setPosition(this.player.x - this.interactPrompt.width / 2, this.player.y - 40)
            this.interactPrompt.setVisible(true)

            if(tile && tile.properties.interact && Phaser.Input.Keyboard.JustDown(this.keyINTERACT)){
                this.interactions(tile.properties.interact)
            }

            if(inDaZone && Phaser.Input.Keyboard.JustDown(this.keyINTERACT)){
                this.interactions(this.mattZone.data.get('interact'))
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

    // Interactions switch
    interactions(prompt){
        switch(prompt){
            case 'Food Truck':
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('The food trucks always hit the spot.')
                this.foodTrucks = 1
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
            case 'Matt':
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('I can\'t believe Loryn didn\'t wake me up.')
                this.mattTalk = 1
                break 
        }
    }

}