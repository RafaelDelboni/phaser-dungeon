/* globals __DEV__ */
import Phaser from 'phaser'
import Knight from '../objects/Knight'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.add.sprite(0, 0, 'atlas', 'debug-grid-1920x1920')
    this.game.world.setBounds(0, 0, 1920, 1920)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = new Knight({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY
    })
    this.game.add.existing(this.player)

    this.cursors = this.game.input.keyboard.createCursorKeys()

    this.game.camera.setBoundsToWorld()
    this.game.camera.position = {
      x: this.world.centerX - this.game.width / 2,
      y: this.world.centerY - this.game.height / 2
    }
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.5)
  }

  update () {
    this.player.body.velocity.setTo(0, 0)

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -120
      this.player.animations.play('knight-move-up')
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 120
      this.player.animations.play('knight-move-down')
    }

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -120
      this.player.animations.play('knight-move-left')
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 120
      this.player.animations.play('knight-move-right')
    }

    if (this.player.body.velocity.x === 0 &&
    this.player.body.velocity.y === 0) {
      this.player.animations.play('knight-move-down')
      this.player.animations.stop()
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.bodyInfo(this.player, 32, 32)
      this.game.debug.body(this.player)
    }
  }
}
