import { combineReducers } from 'redux'

import { tsSample } from '../../samples'
import { IFileState } from './types'
import { CHANGE_FILE, CREATE_FILE, WRITE_FILE } from './actions'
const DATA_INITIAL_STATE: IFileState = {
  'scene.js': {
    name: 'scene.js',
    compiled: '',
    raw: tsSample
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
