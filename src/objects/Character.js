import Phaser from 'phaser'
import AtlasAnimation from '../helpers/AtlasAnimation'
import Actions from '../actions'
import Aim from '../actions/Aim'

const directions = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
}

const setAction = function () {
  const current = this.actions.find(state => state.isHappening)
  if (current) {
    this.action = current.action
  } else {
    if (!this.body.velocity.isZero()) {
      this.action = Actions.move
    } else {
      this.action = Actions.idle
    }
  }
}

const setDirection = function () {
  if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
    if (this.body.velocity.y <= -0.1) {
      this.direction = this.directions.up
    } else if (this.body.velocity.y >= 0.1) {
      this.direction = this.directions.down
    }
  } else {
    if (this.body.velocity.x <= -0.1) {
      this.direction = this.directions.left
    } else if (this.body.velocity.x >= 0.1) {
      this.direction = this.directions.right
    }
  }
}

const setAnimation = function () {
  if (this.body.velocity.isZero() && this.action === Actions.idle) {
    this.atlasAnimations.stop({reset: true})
  } else {
    this.atlasAnimations.play(this.action, this.direction)
  }
}

const calcTimers = function () {
  this.actions.map(
    (state) => {
      if (state.isHappening) {
        state.isHappening--
      } else if (state.isCooldown) {
        state.isCooldown--
      }
    }
  )
}

export default class extends Phaser.Sprite {
  constructor ({
    game,
    x,
    y,
    name,
    type,
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
    this.atlasAnimations = new AtlasAnimation(name, this.animations)
    this.directions = directions

    // default
    this.action = Actions.idle
    this.direction = this.directions.down

    this.body.collideWorldBounds = true
    this.body.fixedRotation = true
    this.body.bounce.setTo(-1, -1)
    this.body.height = this.body.halfHeight
    this.body.width = this.body.halfWidth
    this.body.offset.x = this.body.width / 2
    this.body.offset.y = this.body.height / 1.25

    this.anchor.setTo(0.5)
    this.name = name
    this.type = type

    this.aim = new Aim({game, character: this})
  }

  setActions (actions) {
    this.actions = actions
  }

  setHappeningAction (action, args) {
    const activeActions = this.actions.filter(state => state.isHappening)
    if (!activeActions.length) {
      this.actions
        .filter(state => !state.isHappening && state.action === action)
        .map(state => state.set(args))
    }
  }

  update () {
    this.aim.update()
    setAction.call(this)
    setDirection.call(this)
    setAnimation.call(this)
    calcTimers.call(this)
  }
}
