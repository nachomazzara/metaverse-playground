import { combineReducers } from 'redux'

import { tsSample } from '../../samples'
import { IFileState, IFile } from './types'
import { CHANGE_FILE, REMOVE_FILE, WRITE_FILE } from './actions'
import { getDetailsFromPath } from './utils'

export const defaultFileDefinition = (path: string): IFile => ({
  name: 'untitled',
  compiled: '',
  raw: '',
  path,
})

const DATA_INITIAL_STATE: IFileState = {
  'scene.js': {
    name: 'scene.js',
    compiled: '',
    path: `scene.js`,
    raw: tsSample
  }
}

function data(state: IFileState = DATA_INITIAL_STATE, action): IFileState {
  const { type, payload } = action
  switch (type) {
    case WRITE_FILE.success: {
      const { path, raw, compiled } = payload as { path: string, raw: string, compiled: string }
      const pathDetails = getDetailsFromPath(path);

      return {
        ...state,
        [path]: {
          ...defaultFileDefinition(path),
          name: pathDetails.name,
          raw,
          compiled
        }
      }
    }

    case REMOVE_FILE.request: {
      const { path } = payload as { path: string }
      const { [path]: ignoreFile, ...updatedList } = state
      return {
        ...updatedList
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
