import Phaser from 'phaser'

export default class InputControls {
  constructor (game) {
    this.game = game

    // Prevent directions and mouse key events bubbling up to browser
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN
    ])
    this.game.input.mouse.capture = true

    this.keys = {
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      attack: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }

    this.pythInverse = 1 / Math.SQRT2
  }

  setMovement (velocity, speed) {
    if (this.keys.left.isDown) {
      velocity.x = -1
    } else if (this.keys.right.isDown) {
      velocity.x = 1
    } else {
      velocity.x = 0
    }

    if (this.keys.up.isDown) {
      velocity.y = -1
    } else if (this.keys.down.isDown) {
      velocity.y = 1
    } else {
      velocity.y = 0
    }

    let targetSpeed =
        (velocity.x !== 0 && velocity.y !== 0)
          ? speed * this.pythInverse
          : speed

    velocity.x *= targetSpeed
    velocity.y *= targetSpeed
  }
}
