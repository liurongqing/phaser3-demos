import { Keys } from '~/consts/index'
import CountdownController from '../controllers/CountdownController'

export default class Countdown extends Phaser.Scene {
  countdown: any
  constructor() {
    super(Keys.CountdownScene)
  }

  create() {
    const { width, height } = this.scale
    const timerLabel = this.add.text(width * 0.5, height * 0.5, '50', {
      fontSize: 48
    }).setOrigin(0.5)
    this.countdown = new CountdownController(this, timerLabel)
    this.countdown.start(this.handleCountdownFinished.bind(this), 10000)


    const restartText = this.add.text(width * 0.5, height * 0.2, 'Restart', {
      fontSize: 30
    })
      .setOrigin(0.5)
      .setInteractive()

    const pausedText = this.add.text(width * 0.5, height * 0.1, 'Paused', {
      fontSize: 30
    })
      .setOrigin(0.5)
      .setInteractive()

    const resumeText = this.add.text(width * 0.5, height * 0.1 - 20, 'Resume', {
      fontSize: 30
    })
      .setOrigin(0.5)
      .setInteractive()

    const winText = this.add.text(width * 0.5, height * 0.3, 'Win', {
      fontSize: 30
    })
      .setOrigin(0.5)
      .setInteractive()



    // 赢了
    winText.once(Phaser.Input.Events.POINTER_DOWN, () => {
      this.countdown.stop()
      winText.setText('I Win!')
    })

    // 重新开启
    restartText.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.countdown.start(this.handleCountdownFinished.bind(this), 10000)
    })

    // 暂停
    pausedText.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.countdown.pause()
    })

    // 恢复
    resumeText.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.countdown.resume()
    })

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      console.log('shutdown...')
      this.input.off(Phaser.Input.Events.POINTER_DOWN)
    })
  }

  update() {
    this.countdown.update()
  }

  handleCountdownFinished() {
    const { width, height } = this.scale
    this.add.text(width * 0.5, height * 0.8, '时间到，你输了。', {
      fontSize: 28
    }).setOrigin(0.5)
  }
}
