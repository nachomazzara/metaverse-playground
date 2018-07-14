import {IDictionary} from './types'

export function normalizeTypes(type): { request: string; success: string; failed: string } {
  return {
    request: `[Request] ${type}`,
    success: `[Success] ${type}`,
    failed: `[Failed] ${type}`
  }
}

export function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout
  return function(this: any) {
    const context = this, args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    };
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export function action(type: string, payload: IDictionary<{}>) {
  return {
    type,
    payload
  }
}