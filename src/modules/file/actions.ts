import { normalizeTypes } from '../common/utils'

export const CHANGE_FILE = normalizeTypes('change file')

export function changeFileRequest(name) {
  return {
    type: CHANGE_FILE.request,
    name
  }
}

export const CREATE_FILE = normalizeTypes('create file')

export function createFileRequest(name) {
  return {
    type: CREATE_FILE.request,
    name
  }
}

export const REMOVE_FILE = normalizeTypes('remove file')

export function removeFileRequest(name) {
  return {
    type: REMOVE_FILE.request,
    name
  }
}

export const WRITE_FILE = normalizeTypes('write file')

export function writeFileRequest(name, content) {
  return {
    type: WRITE_FILE.request,
    name,
    content
  }
}

export function writeFileSuccess(name, content, blobURL) {
  return {
    type: WRITE_FILE.success,
    name,
    content,
    blobURL
  }
}