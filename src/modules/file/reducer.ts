import { combineReducers } from 'redux'

import { IFileState } from './types'
import { CHANGE_FILE, CREATE_FILE, REMOVE_FILE, WRITE_FILE } from './actions'

declare global {
  interface Window {
    sceneJson: any
  }
}

const DATA_INITIAL_STATE: IFileState = {
  'scene.xml': {
    name: 'scene.xml',
    blobUrl: '',
    content: `<scene>
    <box position="5 0.5 5" rotation="0 45 0" color="#4CC3D9"></box>
    <sphere position="6 1.25 4" radius="1.25" color="#EF2D5E"></sphere>
    <cylinder position="7 0.75 3" radius="0.5" height="1.5" color="#FFC65D"></cylinder>
    <plane position="5 0 6" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></plane>
</scene>`
  }
}

function data(state: IFileState = DATA_INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_FILE.request: {
      return {
        ...state,
        [action.name]: {
          name: action.name,
          blobUrl: '',
          content: ''
        }
      }
    }
    case WRITE_FILE.request: {
      const blobUrl = 'data:text/plain;base64,' + btoa(action.content)

      window.sceneJson.main = blobUrl

      return {
        ...state,
        [action.name]: {
          name: action.name,
          content: action.content,
          blobUrl
        }
      }
    }
    case REMOVE_FILE.request: {
      return {
        ...Object.keys(state)
          .filter(key => key !== action.name)
          .map(key => state[key])
      }
    }
    default:
      return state
  }
}

function current(state = 'scene.xml', action) {
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
