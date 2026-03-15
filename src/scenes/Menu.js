class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }

    preload(){

        // Loading bar
        let loading = this.add.graphics()
        this.load.on('progress', (value) => {
            loading.clear()
            loading.fillStyle(0xFFFFFF, 1)
            loading.fillRect(this.scale.width * .1, this.scale.height * .5, this.scale.width * .8 * value, 15)
        })
        this.load.on('complete', () => {
            loading.destroy()
        })
        
        // Load
        this.load.path = './assets/'

        this.load.image('creditsPhoto', 'creditsPhoto.jpg')
        this.load.image('tempBox', 'tempBox.png')
        this.load.image('pictureOne', 'pictureOne.jpg')
        this.load.bitmapFont('highSchool', 'Highschool Nostalgia.png', 'Highschool Nostalgia.xml')
        this.load.image('tiles', 'tileset.png')
        this.load.tilemapTiledJSON('concert', 'concert.json')
        this.load.tilemapTiledJSON('bigSur', 'bigSur.json')
        
        this.load.spritesheet('singer', 'singer.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('guitar', 'guitar.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('drum', 'drum.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('player', 'player.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('phoneGuy', 'phoneGuy.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('matt', 'matt.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomOne', 'randomOne.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomTwo', 'randomTwo.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomThree', 'randomThree.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomFour', 'randomFour.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomFive', 'randomFive.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomSix', 'randomSix.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomSeven', 'randomSeven.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet('randomEight', 'randomEight.png', {
            frameWidth: 32,
            frameHeight: 64
        })

        this.load.audio('postcards', 'postcardsFromHell.wav')

    }

    create(){

        this.add.bitmapText(this.scale.width / 2, this.scale.height / 5, 'highSchool', 'To: Ivan', 64).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 3, 'highSchool', 'From: Matt', 64).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 2, 'highSchool', 'Use the arrow keys to move', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.8, 'highSchool', 'Press \'E\' to interact', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.65, 'highSchool', 'Press \'SPACE\' to start', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.5, 'highSchool', 'Interact with everything to advance', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.2, 'highSchool', 'Press \'C\' for credits', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.1, 'highSchool', 'Press \'R\' to restart to menu', 32).setOrigin(0.5)

    
    
        if(!backgroundMusic){
            backgroundMusic = this.sound.add('postcards', {
            volume: 0.1,
            loop: true
        })
            backgroundMusic.play()
        }

        this.keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    

    }

    update(){
        
        if(Phaser.Input.Keyboard.JustDown(this.keySTART)){
            this.scene.start('playScene')
        }
            
        if(Phaser.Input.Keyboard.JustDown(this.keyCREDITS)){
            this.scene.start('creditsScene')
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyRESTART)){
            this.scene.start('menuScene')
            backgroundMusic.stop()
            backgroundMusic.play()
        }
            
    }

}