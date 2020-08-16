import Phaser from 'phaser'

export default class SceneList extends Phaser.Scene
{
    constructor ()
    {
        super('scene-list')

        this.x = 200
        this.y = 150
    }

    create ()
    {
        // change music
        this.changeMusic()

        //create a background
        this.cameras.main.setBackgroundColor(0x6699ff)

        //AKSARA
        this.add.text(250, 20, 'AKSARA  JAWA', { fontFamily: 'Courier', fontSize: 42, color: '#ffffff', align: 'center' })

        //information
        this.add.text(230, 70, 'Click the button bellow AKSARA', { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })

        /* create tombol / button */
        let markers = [
            { name: '0' }
        ]

        for (let i=0; i < markers.length; i++)
        {
            this.makeButton.call(this, markers[i].name, i)
        }

        //create aksara fonts
        var x = this.x
        var y = this.y
        var aksara = [
                ['ha', 'na', 'ca', 'ra', 'ka'],
                ['da', 'ta', 'sa', 'wa', 'la'],
                ['pa', 'dha', 'ja', 'ya', 'nya'],
                ['ma', 'ga', 'ba', 'tha', 'nga']
            ]

        for(let a = 0; a < aksara.length; a++)
        {
            for(let b = 0; b < aksara[a].length; b++)
            {
                this.add.image(x, y, 'aksara', aksara[a][b])
                x += 100
            }

            x = this.x
            y += 100
        }

        //create button aksara + sound
        var spritemap = this.cache.json.get('sfx_aksara_dasar').spritemap
        var i = 0
        for (var spriteName in spritemap)
        {
            if (!spritemap.hasOwnProperty(spriteName))
            {
                continue
            }
            
            if(i < 5)
            {
                this.makeAksara.call(this, spriteName, this.x + i * 100, this.y + 40)
            }
            else if(i >= 5 && i < 10)
            {
                this.makeAksara.call(this, spriteName, this.x + (i - 5) * 100, this.y + 140)
            }
            else if(i >= 10 && i < 15)
            {
                this.makeAksara.call(this, spriteName, this.x + (i - 10) * 100, this.y + 240)
            }
            else if(i >= 15 && i < 20)
            {
                this.makeAksara.call(this, spriteName, this.x + (i - 15) * 100, this.y + 340)
            }

            i++
        }

        //exec
        this.input.on('gameobjectdown', function (pointer, button)
        {
            if(button.getData('index') === 0)
            {
                this.scene.stop().start('scene-depan')
                let sceneB = this.scene.get('scene-musik')
                sceneB.play_intro()
            }
            else
            {
                this.sound.playAudioSprite('sfx_aksara_dasar', button.name)
            }

        }, this)
    }

    makeButton(name, index)
    {        
        let button = this.add.image(100, 300, 'back').setScale(0.5, 0.5).setInteractive()
        button.setData('index', index)        
    }

    makeAksara(name, x, y)
    {
        var button = this.add.image(x, y, 'button', 1).setInteractive()
        button.name = name
        button.setScale(0.75, 1)

        var text = this.add.bitmapText(x - 40, y - 8, 'nokia', name, 16)
        text.x += (button.width - text.width) / 2
    }

    changeMusic()
    {
        let sceneB = this.scene.get('scene-musik')
        sceneB.play_language()
    }
}
