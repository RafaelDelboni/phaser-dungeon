import Phaser from 'phaser'
import Actions from '../actions'

const setMovement = function () {
  if (this.keys.left.isDown) {
    this.character.body.velocity.x = -1
  } else if (this.keys.right.isDown) {
    this.character.body.velocity.x = 1
  } else {
    this.character.body.velocity.x = 0
  }

  if (this.keys.up.isDown) {
    this.character.body.velocity.y = -1
  } else if (this.keys.down.isDown) {
    this.character.body.velocity.y = 1
  } else {
    this.character.body.velocity.y = 0
  }

  let currentSpeed = this.character.speed

  let targetSpeed =
    (this.character.body.velocity.x !== 0 && this.character.body.velocity.y !== 0)
      ? currentSpeed * this.pythInverse
      : currentSpeed

  this.character.body.velocity.x *= targetSpeed
  this.character.body.velocity.y *= targetSpeed
}

export default class InputControls {
  constructor (character) {
    this.character = character
    this.game = character.game

    // Prevent directions and mouse key events bubbling up to browser
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.A,
      Phaser.Keyboard.D,
      Phaser.Keyboard.W,
      Phaser.Keyboard.S,
      Phaser.Keyboard.SPACEBAR
    ])

    this.game.input.mouse.capture = true

    this.keys = {
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      dash: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      attack: this.game.input.activePointer.leftButton
    }

    this.pythInverse = 1 / Math.SQRT2
  }

  update () {
    this.character.aim.rotation = this.game.physics.arcade.angleToPointer(this.character)

    if (this.character.action === Actions.idle ||
      this.character.action === Actions.move) {
      setMovement.call(this)
    }
    this.keys.attack.onDown.add(this.character.setHappeningAction.bind(this.character, Actions.atk))
    this.keys.dash.onDown.add(this.character.setHappeningAction.bind(this.character, Actions.dash))
  }
}
