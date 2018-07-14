import { normalizeTypes, action } from '../common/utils'

export const CHANGE_FILE = normalizeTypes('change file')

export function changeFileRequest(name) {
  return {
    type: CHANGE_FILE.request,
    name
  }
}

export const REMOVE_FILE = normalizeTypes('remove file')

export function removeFileRequest(path) {
  return action(REMOVE_FILE.request, {
    path
  })
}

export const WRITE_FILE = normalizeTypes('write file')

export function writeFileRequest(path, raw) {
  return action(WRITE_FILE.request, { path, raw })
}

export function writeFileSuccess(path, raw, compiled) {
  return action(WRITE_FILE.success, {
    path,
    raw,
    compiled
  })
}
