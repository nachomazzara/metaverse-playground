import { combineReducers } from 'redux'

import {CHANGE_FILE, CREATE_FILE, REMOVE_FILE} from './actions'

const DATA_INITIAL_STATE = {
  'scene.tsx': {
    name: 'scene.tsx',
    blobUrl: '',
    content: ''
  }
}

function data(state = DATA_INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_FILE.request: {
      return {
        ...state,
        [action.name]: {
          name: action.name,
          blobUrl: '',
          content: '',
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

function current(state = 'scene.tsx', action) {
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
