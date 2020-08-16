import Phaser from 'phaser'

export default class SceneMusik extends Phaser.Scene {

    constructor ()
    {
        super('scene-musik')

        this.music = undefined
    }

    create ()
    {
        /* Background Musik */
        this.music = this.createMusic()
        window.setTimeout(() => {
            this.music.play()
        }, 2000)
    }

    createMusic()
    {
        const music = this.sound.add('theme-sound', { loop: true })

        return music
    }

    pausemusik()
    {
        this.music.pause()
    }

    resumemusik()
    {
        this.music.resume()
    }

    play_intro()
    {
        this.music.pause()
        this.music = this.sound.add('theme-sound', { loop: true })

        if(this.registry.get('back_sound') == true)
        {
            this.music.play()
        }
    }

    play_language()
    {
        this.music.pause()
        this.music = this.sound.add('woodland_fantasy', { loop: true })
        this.music.volume = 0.4
        this.music.play()
    }
}
