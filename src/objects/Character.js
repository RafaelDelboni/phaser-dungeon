import Phaser from 'phaser'

const directions = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
}

export default class extends Phaser.Sprite {
  constructor ({
    game,
    x,
    y,
    name,
    controls,
    speed,
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
    this.body.collideWorldBounds = true
    this.body.fixedRotation = true
    this.anchor.setTo(0.5)
    this.pythInverse = 1 / Math.SQRT2

    this.name = name
    this.cursors = controls
    this.speed = speed
  }

  update () {
    // horizontal movement
    if (this.cursors.left.isDown) {
      this.body.velocity.x = -1
      this.direction = this.directions.left
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 1
      this.direction = this.directions.right
    } else {
      this.body.velocity.x = 0
    }
    // vertical movement
    if (this.cursors.up.isDown) {
      this.body.velocity.y = -1
      this.direction = this.directions.up
    } else if (this.cursors.down.isDown) {
      this.body.velocity.y = 1
      this.direction = this.directions.down
    } else {
      this.body.velocity.y = 0
    }
    // diagonal movement match the defined speed
    let targetSpeed =
        (this.body.velocity.x !== 0 && this.body.velocity.y !== 0)
          ? this.speed * this.pythInverse
          : this.speed

    this.body.velocity.x *= targetSpeed
    this.body.velocity.y *= targetSpeed
  }
}
