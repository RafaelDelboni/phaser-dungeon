import Phaser from 'phaser'

const directions = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
}

const setDirection = function () {
  if (this.body.velocity.x <= -1) {
    this.direction = this.directions.left
  } else if (this.body.velocity.x >= 1) {
    this.direction = this.directions.right
  }
  if (this.body.velocity.y <= -1) {
    this.direction = this.directions.up
  } else if (this.body.velocity.y >= 1) {
    this.direction = this.directions.down
  }
}

export default class extends Phaser.Sprite {
  constructor ({
    game,
    x,
    y,
    name,
    firstSprite
  }) {
    super(
      game,
      x,
      y,
      'atlas',
      firstSprite
    )
    game.physics.enable(this, Phaser.Physics.ARCADE)

    this.directions = directions
    this.direction = this.directions.down

    this.body.collideWorldBounds = true
    this.body.fixedRotation = true
    this.anchor.setTo(0.5)

    this.name = name
  }

  update () {
    setDirection.call(this)
  }
}
