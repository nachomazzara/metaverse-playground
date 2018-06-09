import { combineReducers } from 'redux'

import { IFileState } from './types'
import { CHANGE_FILE, CREATE_FILE, WRITE_FILE } from './actions'
const DATA_INITIAL_STATE: IFileState = {
  'scene.js': {
    name: 'scene.js',
    compiled: '',
    //     raw: `<scene>
    //     <box position="5 0.5 5" rotation="0 45 0" color="#4CC3D9"></box>
    //     <sphere position="6 1.25 4" radius="1.25" color="#EF2D5E"></sphere>
    //     <cylinder position="7 0.75 3" radius="0.5" height="1.5" color="#FFC65D"></cylinder>
    //     <plane position="5 0 6" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></plane>
    // </scene>`
    raw: `import { createElement, ScriptableScene } from 'metaverse-api'

    const networkHz = 6
    const interval = 1000 / networkHz
    
    export default class RollerCoaster extends ScriptableScene<any, { time: number }> {
      state = { time: 0 }
    
      timeout = setInterval(() => {
        this.setState({
          time: performance.now() * 0.0001
        })
      }, interval)
    
      sceneWillUnmount() {
        clearInterval(this.timeout)
      }
    
      async render() {
        const { time } = this.state
    
        const size = 2
    
        const x = Math.cos(time) * Math.cos(time) * size
        const y = Math.cos(time) * Math.sin(time) * size
        const z = Math.sin(time) * size
    
        return (
          <scene>
            <entity position={{ x: 5, y: 4, z: 5 }}>
              <entity
                id="train"
                position={{ x, y, z }}
                rotation={{ x: Math.cos(time) * 40, y: Math.sin(time) * 40, z: 0 }}
                transition={{
                  position: { duration: interval },
                  rotation: { duration: interval }
                }}
              >
                <box position={{ x: 0, y: -1, z: 0 }} color="black" scale={{ x: 3, y: 0.4, z: 5 }} />
                <box position={{ x: 1.5, y: 0, z: 0 }} color="red" scale={{ x: 0.2, y: 1, z: 5 }} />
                <box position={{ x: -1.5, y: 0, z: 0 }} color="yellow" scale={{ x: 0.2, y: 1, z: 5 }} />
    
                <box position={{ x: 0, y: 0, z: 2.5 }} color="green" scale={{ x: 3, y: 1, z: 0.2 }} />
                <box position={{ x: 0, y: 0, z: -2.5 }} color="blue" scale={{ x: 3, y: 1, z: 0.2 }} />
              </entity>
            </entity>
          </scene>
        )
      }
    }
 
`
  }
}

function data(state: IFileState = DATA_INITIAL_STATE, action): IFileState {
  switch (action.type) {
    case CREATE_FILE.request: {
      return {
        ...state,
        [action.name]: {
          name: action.name,
          compiled: '',
          raw: ''
        }
      }
    }
    case WRITE_FILE.success: {
      return {
        ...state,
        [action.name]: {
          name: action.name,
          raw: action.raw,
          compiled: action.compiled
        }
      }
    }
    default:
      return state
  }
}

function current(state = 'scene.js', action) {
  switch (action.type) {
    case CHANGE_FILE.request: {
      return action.name
    }
    default:
      return state
  }
}

function loading(state = false, action) {
  return state
}

function error(state = {}, action) {
  return state
}

export default combineReducers({ data, current, loading, error })
