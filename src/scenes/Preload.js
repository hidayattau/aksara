import Phaser from 'phaser'

export default class Preload extends Phaser.Scene
{
	constructor()
	{
		super('preload')
	}

	preload()
    {
        //create a background
	    this.cameras.main.setBackgroundColor(0x6699ff)

	    //prepare loading bar
	    this.fullBar = this.add.graphics()
	    this.fullBar.fillStyle(0x66ccff, 1)
	    this.fullBar.fillRect((this.cameras.main.width / 4)-2,(this.cameras.main.height /2) - 18, (this.cameras.main.width / 2) + 4, 20)
	    this.progress = this.add.graphics()

	    //pass loading progress as value to loading bar and redraw as files load
	    this.load.on('progress', function (value) {
	        this.progress.clear()
	        this.progress.fillStyle(0x6600ff, 1)
	        this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height /2) - 16, (this.cameras.main.width / 2) * value, 16)
	    }, this)

	    //cleanup our graphics on complete
	    this.load.on('complete', function () {
	        this.progress.destroy()
	        this.fullBar.destroy()
	    }, this)

	    //start loading
	    this.load.pack('Preload', 'assets/pack.json', 'aksara_game')
        this.load.audioSprite('sfx_aksara_dasar', "assets/audios/aksara/aksara_dasar.json", [
            "assets/audios/aksara/aksara_dasar.ogg",
            "assets/audios/aksara/aksara_dasar.mp3"
        ])
        this.load.spritesheet('button', 'assets/ui/flixel-button.png', { frameWidth: 80, frameHeight: 20 })
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml')
        this.load.atlas('ui', 'assets/ui/ui.png', 'assets/ui/ui.json')
    }

    create()
    {
    	// Create default cursor
    	this.input.setDefaultCursor('url(assets/images/SC2-cursor-protoss.cur), pointer')

		this.initRegistry() //initialize the starting registry values.

		this.scene.launch('scene-musik') //launch Music
        this.scene.start('scene-depan')
    }

	initRegistry()
	{
		//the game registry provides a place accessible by all scenes to set and get data.
	    //Here we store our key that tells the LevelScene what map to load.
	    this.registry.set('back_sound', true)
	    this.registry.set('fullsreen', false)
	}
}
