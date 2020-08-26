import { Keys } from '~/consts/index'
export default class ProgressBar extends Phaser.Scene {
  fullWidth: number
  leftCap
  middle
  rightCap
  constructor() {
    super(Keys.ProgressBarScene)
  }

  init() {
    this.fullWidth = 300
  }

  preload() {
    this.load.image('left-cap', 'assets/progress-bar/barHorizontal_green_left.png')
    this.load.image('middle', 'assets/progress-bar/barHorizontal_green_mid.png')
    this.load.image('right-cap', 'assets/progress-bar/barHorizontal_green_right.png')


    this.load.image('left-cap-shadow', 'assets/progress-bar/barHorizontal_shadow_left.png')
    this.load.image('middle-shadow', 'assets/progress-bar/barHorizontal_shadow_mid.png')
    this.load.image('right-cap-shadow', 'assets/progress-bar/barHorizontal_shadow_right.png')
  }

  create() {
    const y = 241
    const x = 101

    this.cameras.main.setBackgroundColor(0xdddddd)
    const leftShadowCap = this.add.image(x, y, 'left-cap-shadow')
      .setOrigin(0, 0.5)

    const middleShadowCap = this.add.image(leftShadowCap.x + leftShadowCap.width, y, 'middle-shadow')
      .setOrigin(0, 0.5)
    middleShadowCap.displayWidth = this.fullWidth

    this.add.image(middleShadowCap.x + middleShadowCap.displayWidth, y, 'right-cap-shadow')
      .setOrigin(0, 0.5)

    this.leftCap = this.add.image(x, y, 'left-cap')
      .setOrigin(0, 0.5)

    this.middle = this.add.image(this.leftCap.x + this.leftCap.width, y, 'middle')
      .setOrigin(0, 0.5)

    this.rightCap = this.add.image(this.middle.x + this.middle.displayWidth, y, 'right-cap')
      .setOrigin(0, 0.5)

    this.setMeterPercentage(1)
  }

  setMeterPercentage(percent = 1, duration = 2000) {
    const width = this.fullWidth * percent
    this.middle.displayWidth = width
    this.rightCap.x = this.middle.x + this.middle.displayWidth

    this.tweens.add({
      targets: this.middle,
      displayWidth: 0,
      duration,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.rightCap.x = this.middle.x + this.middle.displayWidth

        let hasMiddleWidth = this.middle.displayWidth > 0
        if (!hasMiddleWidth) {
          this.tweens.add({
            targets: [this.leftCap, this.middle, this.rightCap],
            alpha: 0,
            duration: 500
          })
          // this.leftCap.visible = hasMiddleWidth
          // this.middle.visible = hasMiddleWidth
          // this.rightCap.visible = hasMiddleWidth
        }

      }
    })
  }


}
