import AtlasAnimation from '../helpers/AtlasAnimation'
import Character from './Character'

const actions = {
  move: 'move',
  atk: 'atk',
  use: 'use'
}

const addAllAnimations = function () {
  Object.keys(this.directions).map(
    (direction) => Object.keys(this.actions).map(
      (action) => this.atlasAnimations.add(
        {spriteName: this.atlasAnimations.getName(
          action,
          direction
        )}
      )
    )
  )
}

const setAnimation = function () {
  if (!this.body.velocity.isZero()) {
    this.atlasAnimations.play(this.actions.move, this.direction)
  } else {
    this.atlasAnimations.stop(this.actions.move, this.direction, true)
  }
}

export default class extends Character {
  constructor ({
    game, x, y, name
  }) {
    super({
      game,
      x,
      y,
      name,
      speed: 200,
      controls: game.input.keyboard.createCursorKeys(),
      firstSprite: `${name}-${actions.move}-down-1`
    })

    this.actions = actions
    this.atlasAnimations = new AtlasAnimation(name, this.animations)
    this.direction = this.directions.down

    addAllAnimations.call(this)
  }

  update () {
    super.update()
    setAnimation.call(this)
  }
}
