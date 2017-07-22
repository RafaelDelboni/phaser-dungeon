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
      numberStart = 1,
      numberEnd = 5,
      speed = 6,
      loop = true
    }
  ) {
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
      this.getName(action, direction)
    )
  }

  stop (action, direction, reset = true) {
    this.animations.stop(
      this.getName(action, direction), reset
    )
  }
}
