/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../objects/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.add.sprite(0, 0, 'atlas', 'debug-grid-1920x1920')
    this.game.world.setBounds(0, 0, 1920, 1920)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      name: 'knight'
    })
    this.game.add.existing(this.player)

    this.game.camera.setBoundsToWorld()
    this.game.camera.position = {
      x: this.world.centerX - this.game.width / 2,
      y: this.world.centerY - this.game.height / 2
    }
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.5)
  }

  update () {}

  render () {
    if (__DEV__) {
      this.game.debug.bodyInfo(this.player, 32, 32)
      this.game.debug.body(this.player)
    }
  }
}
