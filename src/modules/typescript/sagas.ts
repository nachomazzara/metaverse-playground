import { call } from 'redux-saga/effects'
import { IDictionary } from '../common/types'
import { IGenericEvent } from './types'

const tsWorkerRaw = require('raw-loader!./TypescriptWorker.ts')
const tsWorkerBLOB = new Blob([tsWorkerRaw])
const tsWorkerUrl = URL.createObjectURL(tsWorkerBLOB)
const tsWorker: Worker = new Worker(tsWorkerUrl)

const pending: IDictionary<() => void> = {}

tsWorker.onmessage = (evt: IGenericEvent) => {
  pending[evt.id]()
}

function emit(evt: Pick<IGenericEvent, 'type' | 'payload'>) {
  const id = `${evt}_${Date.now()}`

  return new Promise((resolve, reject) => {
    pending[id] = resolve
    tsWorker.postMessage({ id, ...evt } as IGenericEvent)
  })
}

export function transpile() {
  return call(() =>
    emit({
      type: 'hello',
      payload: null
    })
  )
}
