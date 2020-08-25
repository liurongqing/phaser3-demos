import { Keys } from '~/consts/index'
export default class TransitionFrom extends Phaser.Scene {
  constructor() {
    super(Keys.TransitionFromScene)
  }

  create() {
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor(0x421278)

    const fadeText = this.add.text(width * 0.5, height * 0.2, 'Fade', {
      fontSize: 38
    })
      .setOrigin(0.5)
      .setInteractive()

    const shakeText = this.add.text(fadeText.x, fadeText.y + 40, 'Shake', {
      fontSize: 38
    })
      .setOrigin(0.5)
      .setInteractive()



    fadeText.once('pointerdown', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0)
    })

    shakeText.once('pointerdown', () => {
      this.cameras.main.rotateTo(100)
    })
    // this.input.keyboard.once('keydown-SPACE', () => {
    //   this.cameras.main.fadeOut(1000, 0, 0, 0)
    // })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.time.delayedCall(1000, () => {
        this.scene.start(Keys.TransitionToScene, {
          fadeIn: true
        })
      })
    })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.SHAKE_COMPLETE, (cam, effect) => {
      this.time.delayedCall(1000, () => {
        this.scene.start(Keys.TransitionToScene, {
          shake: true
        })
      })
    })

  }
}
