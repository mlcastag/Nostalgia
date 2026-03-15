class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, cursors, objectLayer){
        super(scene, x, y, 'player', 3)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        this.speed = 200
        this.looking = 'up'
        this.body.setSize(this.width, 48)
        this.body.setOffset(0, this.height - 48)
        this.body.setCollideWorldBounds(true)
        this.cursors = cursors
        this.objectLayer = objectLayer
        this.walkingAnims(scene)
        

    }

    walkingAnims(scene){
        scene.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: scene.anims.generateFrameNumbers('player', {start: 96, end: 101})
        })
        scene.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: scene.anims.generateFrameNumbers('player', {start: 102, end: 107})
        })
        scene.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: scene.anims.generateFrameNumbers('player', {start: 108, end: 113})
        })
        scene.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: scene.anims.generateFrameNumbers('player', {start: 114, end: 119})
        })
    }

    look(){
        let playerX = this.objectLayer.worldToTileX(this.x)
        let playerY = this.objectLayer.worldToTileY(this.y)

        switch(this.looking){
            case 'left':
                playerX -= 1
                break
            case 'right':
                playerX += 1
                break
            case 'up':
                playerY -= 1
                break
            case 'down':
                playerY += 1
                break
        }

        return this.objectLayer.getTileAt(playerX, playerY)
    }

    update(){
        let direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown){
            direction.x = -1
            this.looking = 'left'
        }else if(this.cursors.right.isDown){
            direction.x = 1
            this.looking = 'right'
        }
        if(this.cursors.up.isDown){
            direction.y = -1
            this.looking = 'up'
        }else if(this.cursors.down.isDown){
            direction.y = 1
            this.looking = 'down'
        }
        direction.normalize()
        this.setVelocity(this.speed * direction.x, this.speed * direction.y)
        this.anims.play(`walk-${this.looking}`, true)
        if(!(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)){
            let idle = {right: 0, up: 1, left: 2, down: 3}
            this.setFrame(idle[this.looking])
        }
    }
}