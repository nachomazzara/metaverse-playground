import { normalizeTypes } from '../common/utils'

export const CHANGE_FILE  = normalizeTypes('change file')

export function changeFileRequest() {
  return {
    type: CHANGE_FILE.request
  }
}


export function changeFileSuccess() {
  return {
    type: CHANGE_FILE.success
  }
}

export function changeFileFailed() {
  return {
    type: CHANGE_FILE.failed
  }
}

export const CREATE_FILE  = normalizeTypes('create file')

export function createFileRequest(name) {
  return {
    type: CREATE_FILE.request,
    name
  }
}

export const REMOVE_FILE  = normalizeTypes('remove file')


export function removeFileRequest(name) {
  return {
    type: REMOVE_FILE.request,
    name
  }
}


