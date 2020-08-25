import { Keys } from '~/consts/index'
export default class TransitionFrom extends Phaser.Scene {
  constructor() {
    super(Keys.TransitionFromScene)
  }

  create() {
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor(0x421278)


    this.add.text(width * 0.5, height * 0.5, 'scene transition 1', {
      fontSize: 48
    }).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0)
    })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.time.delayedCall(1000, () => {
        this.scene.start(Keys.TransitionToScene, {
          fadeIn: true
        })
      })
    })

  }
}
