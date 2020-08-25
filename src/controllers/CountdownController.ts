/**
 * ```typescript
 * import CountdownController from './CountdownController'
 *
 * create(){
 *    const timerLabel = this.add.text(100, 100, '45')
 *    this.countdown = new CountdownController(this, timerLabel)
 *    // 开始并设置，时间结束时的回调
 *    this.countdown.start(this.handleCountdownFinished.bind(this))
 * }
 * update(){
 *    this.countdown.update()
 * }
 *
 * // 在游戏成功时，也要调用时间停止
 * this.countdown.stop()
 *
 * handleCountdownFinished(){
 *   // 时间到，游戏结束
 * }
 * ```
 *
 */
export default class CountdownController {
  scene: Phaser.Scene
  label: Phaser.GameObjects.Text
  timerEvent: Phaser.Time.TimerEvent
  duration: number

  constructor(scene: Phaser.Scene, label: Phaser.GameObjects.Text) {
    this.scene = scene
    this.label = label
  }

  start(callback: Function, duration = 30000) {
    this.stop()
    this.duration = duration
    this.timerEvent = this.scene.time.addEvent({
      delay: duration,
      callback: () => {
        this.label.setText('0')
        this.stop()
        callback && callback()
      }
    })

  }

  stop() {
    if (this.timerEvent) {
      this.timerEvent.destroy()
      this.timerEvent = undefined
    }
  }

  pause() {
    if (!this.timerEvent || this.timerEvent.paused) return
    this.timerEvent.paused = true
  }

  resume() {
    if (!this.timerEvent || !this.timerEvent.paused) return
    this.timerEvent.paused = false
  }

  update() {
    if (!this.timerEvent || this.duration <= 0) {
      return
    }

    const elapsed = this.timerEvent.getElapsed()
    const remaining = this.duration - elapsed
    const seconds = remaining / 1000 // 转化成秒
    this.label.setText(seconds.toFixed(2))
  }
}
