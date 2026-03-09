class Letter extends Phaser.Scene{
    constructor(){
        super('letterScene')
    }

    create(){
        this.pictureOne = this.add.image(0, 0, 'pictureOne').setOrigin(0, 0).setScale(.7)
    }

    update(){

    }




}
