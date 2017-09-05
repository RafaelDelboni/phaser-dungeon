/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../objects/Player'
import Npc from '../objects/Npc'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.add.sprite(0, 0, 'atlas', 'debug-grid-1920x1920')
    this.game.world.setBounds(0, 0, 1920, 1920)
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // TODO: Work with subgroups
    this.game.currentStage = this.game.add.group(this.world, 'stage')

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      name: 'knight'
    })
    this.game.currentStage.add(this.player)

    this.game.currentStage.add(new Npc({
      game: this.game,
      x: this.world.centerX + 50,
      y: this.world.centerY + 50,
      name: 'green-knight'
    }))

    this.game.camera.setBoundsToWorld()
    this.game.camera.position = {
      x: this.world.centerX - this.game.width / 2,
      y: this.world.centerY - this.game.height / 2
    }
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.5)
  }

  update () {
    // TODO: Subgroups iterate thought the nested groups to colide and sort
    this.game.physics.arcade.collide(this.game.currentStage)
    this.game.currentStage.sort('y', Phaser.Group.SORT_ASCENDING)
  }

  render () {
    if (__DEV__) {
      this.game.debug.bodyInfo(this.player, -64, 32)
      this.game.currentStage.hash.map(object => this.game.debug.body(object))
    }
  }
}
