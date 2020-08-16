import Phaser from 'phaser'

export default class SceneDepan extends Phaser.Scene
{

    constructor ()
    {
        super( 'scene-depan' )

        this.x = 80
        this.y = 150
    }

    create ()
    {
        //create a background
        this.cameras.main.setBackgroundColor(0x6699ff)

        //AKSARA
        this.add.text(200, 20, '- A K S A R A -', { fontFamily: 'Courier', fontSize: 42, color: '#ffffff', align: 'center' })

        //welcome screen
        var x = this.x
        var y = this.y
        var pembuka = [
                ['ha', 'ka', 'sa', 'ra', 'ja', 'wa'],
                ['pa', 'da', 'nya', 'ta'],
                ['ba', 'ha', 'sa', 'ja', 'wa'],
                ['ba', 'ka', 'la', 'ja', 'ya'],
                ['ma', 'na', 'ca', 'na', 'ga', 'ra'],
                ['pa', 'da', 'sa', 'na', 'nga'],
                ['ja', 'ya', 'ja', 'ya', 'ja', 'ya'],
                ['ha', 'na', 'da', 'na', 'sa', 'ha', 'ra', 'ya']
            ]

        for(let a = 0; a < pembuka.length; a++)
        {
            for(let b = 0; b < pembuka[a].length; b++)
            {
                this.add.image(x, y, 'aksara', pembuka[a][b])
                x += 50
            }

            x = this.x
            y += 50
        }

        /* Give version & name on game */
        this.add.text(450, 130, 'WELCOME TO', { font: '20px Times New Roman', fill: '#FFFFFF' })

        let gamename = this.add.text(450, 170, '', { font: '20px Times New Roman', fill: '#FFFFFF' })

        gamename.setText([
            this.game.config.gameTitle + ' {an educational game}',
            'v.' + this.game.config.gameVersion
        ])

        /* create tombol / button */
        let markers = [
            { name: 'list aksara' },
            //{ name: 'level' },
            { name: 'drill aksara' },
            { name: 'setting' }
        ]

        for (let i=0; i < markers.length; i++)
        {
            this.makeButton.call(this, markers[i].name, i)
        }

        this.input.on('gameobjectdown', function (pointer, button)
        {
            var index = button.getData('index')

            if(index != 100)
            {
                if(index === 0)
                {
                    this.scene.stop().start('scene-list')
                }
                /*else if(index === 1)
                {
                    this.scene.stop().start('scene-level')
                }*/
                else if(index === 1)
                {
                    this.scene.stop().start('scene-endless', { "level": 1 })
                }
                else if(index === 2)
                {
                    this.scene.stop().start('scene-pengaturan')
                }
            }

        }, this)
    }

    makeButton(name, index)
    {
        let button = this.add.image(530, 270 + index*40, 'button', 1).setInteractive()
        button.setData('index', index)
        button.setScale(2, 1.5)

        let text = this.add.bitmapText(button.x - 40, button.y - 8, 'nokia', name, 16)
        text.x += (button.width - text.width) / 2
    }
}