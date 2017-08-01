import {Enum} from 'enumify'

class Types extends Enum {}
export default Types.initEnum(
  {
    idle: {
      get animation () { return 'move' }
    },
    move: {
      get animation () { return 'move' }
    },
    atk: {
      get animation () { return 'atk' }
    },
    use: {
      get animation () { return 'use' }
    },
    dash: {
      get animation () { return 'move' }
    }
  }
)
