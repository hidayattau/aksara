import Phaser from 'phaser'

export default class ScenePengaturan extends Phaser.Scene
{
    constructor ()
    {
        super('scene-pengaturan')
    }

    create ()
    {        
        //create a background
        this.cameras.main.setBackgroundColor(0x6699ff)

        this.add.text(320, 20, 'Setting', { fontFamily: 'Courier', fontSize: 42, color: '#ffffff', align: 'center' })

        //Music
        this.add.text(200, 200, 'Music', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' })
        this.toggle1 = this.musikToggle(350, 200)

        //Full Screen
        this.add.text(200, 250, 'Full Screen', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' })
        this.toggle2 = this.fullScreenToggle(350, 250)

        /* create tombol / button */
        let markers = [
            { name: '0' }
        ]

        for (let i=0; i < markers.length; i++)
        {
            this.makeButton.call(this, markers[i].name, i)
        }

        this.input.on('gameobjectdown', function (pointer, button)
        {
            var index = button.getData('index')

            if(index === 0)
            {
                this.scene.stop().start('scene-depan')
            }

        }, this)
    }

    makeButton(name, index)
    {
        if(index < 1)
        {
            let button = this.add.image(100, 240, 'back').setScale(0.5, 0.5).setInteractive()
            button.setData('index', index)
        }
    }

    fullScreenToggle(x, y)
    {
        let toggle

        if(this.scale.isFullscreen == true && this.registry.get('fullsreen') == true)
        {
          toggle = this.add.image(x, y, 'ui', 'toggle-on').setOrigin(0)
          toggle.setData('on', true)
        }
        else
        {
          toggle = this.add.image(x, y, 'ui', 'toggle-off').setOrigin(0)
          toggle.setData('on', false)
        }
        toggle.setInteractive()

        toggle.on('pointerup', function () {
          if (toggle.getData('on'))
          {
            toggle.setFrame('toggle-off')
            toggle.setData('on', false)

            this.scale.stopFullscreen()
            this.registry.set('fullsreen', false)
          }
          else
          {
            toggle.setFrame('toggle-on')
            toggle.setData('on', true)

            this.scale.startFullscreen()
            this.registry.set('fullsreen', true)
          }

        }, this)

        return toggle
    }

    musikToggle (x, y)
    {
        let sceneB = this.scene.get('scene-musik')
        let toggle

        if(this.registry.get('back_sound') == true)
        {
          toggle = this.add.image(x, y, 'ui', 'toggle-on').setOrigin(0)
          toggle.setData('on', true)
        }
        else
        {
          toggle = this.add.image(x, y, 'ui', 'toggle-off').setOrigin(0)
          toggle.setData('on', false)
        }
        toggle.setInteractive()

        toggle.on('pointerup', function () {
          if (toggle.getData('on'))
          {
            toggle.setFrame('toggle-off')
            toggle.setData('on', false)

            this.input.on('pointerup', function () {
                sceneB.pausemusik()
            }, this)
            this.registry.set('back_sound', false)
          }
          else
          {
            toggle.setFrame('toggle-on')
            toggle.setData('on', true)

            this.input.on('pointerup', function () {
                sceneB.resumemusik()
            }, this)
            this.registry.set('back_sound', true)
          }
        }, this)

        return toggle
    }
}