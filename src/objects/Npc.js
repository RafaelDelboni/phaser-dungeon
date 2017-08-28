import Character from './Character'
import actionTypes from '../actions/Types'
import Attacks from '../actions/Attacks'
import Dash from '../actions/Dash'

const addMoveAnimations = function () {
  Object.keys(this.directions).map(
    (direction) => this.atlasAnimations.add({
      action: actionTypes.move,
      direction,
      speed: 8
    })
  )
}

const addAtkAnimations = function () {
  Object.keys(this.directions).map(
    (direction) => this.atlasAnimations.add({
      action: actionTypes.atk,
      direction,
      speed: 13
    })
  )
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
      firstSprite: `${name}-move-down-1`
    })

    this.setActions([
      new Attacks({
        character: this,
        attacks: [{id: 0, type: 'normal', time: 24, speed: 13, cooldown: 15}]
      }),
      new Dash({
        character: this,
        dash: {time: 15, speed: 300, cooldown: 15}
      })
    ])

    this.speed = 140

    addMoveAnimations.call(this)
    addAtkAnimations.call(this)
  }

  update () {
    super.update()
  }
}
