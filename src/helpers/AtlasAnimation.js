import Phaser from 'phaser'

export default class AtlasAnimation {
  constructor (name, animations) {
    this.name = name
    this.animations = animations
  }

  getName (type, direction) {
    // name-type-direction, ex: knight-move-left
    return `${this.name}-${type}-${direction}`
  }

  add (
    {
      spriteName,
      action,
      direction,
      numberStart = 1,
      numberEnd = 5,
      speed = 6,
      loop = true
    }
  ) {
    spriteName = spriteName || this.getName(action.animation, direction)
    this.animations.add(
      spriteName,
      // name-type-direction-number, ex: knight-move-left-2
      Phaser.Animation.generateFrameNames(
        `${spriteName}-`,
        numberStart,
        numberEnd
      ),
      speed,
      loop
    )
  }

  play (action, direction) {
    this.animations.play(
      this.getName(action.animation, direction)
    )
  }

  stop ({action, direction, reset = true}) {
    const animationName = (action && direction)
      ? this.getName(action.animation, direction)
      : null

    this.animations.stop(animationName, reset)
  }
}
