import { eventChannel } from 'redux-saga'
import { call, take, fork } from 'redux-saga/effects'
import { IGenericEvent, WorkerEvent } from './types'
import worker from './TypescriptWorkerClient'

function createWorkerChannel(worker: Worker) {
  return eventChannel(emit => {
    const messageHandler = event => {
      emit(event as MessageEvent)
    }

    worker.addEventListener('message', messageHandler)

    const unsubscribe = () => {
      worker.removeEventListener('message', messageHandler)
    }

    return unsubscribe
  })
}

function* readDirResponse(id: string) {
  yield call(() =>
    worker.postMessage({
      id,
      type: 'READ_DIR_RESPONSE',
      payload: {}
    })
  )
}

function* readDirResponse2(id: string) {
  yield call(() =>
    worker.postMessage({
      id,
      type: 'READ_DIR_RESPONSE2',
      payload: {}
    })
  )
}

export function* watchWorkerMessages() {
  const workerChannel = yield call(createWorkerChannel, worker)

  while (true) {
    const evt: MessageEvent = yield take(workerChannel)
    const msg: IGenericEvent = evt.data

    switch (msg.type) {
      case WorkerEvent.READ_DIR_REQUEST:
        yield fork(readDirResponse, msg.id)
        yield fork(readDirResponse2, msg.id)
        break
      default:
        console.log(msg)
        break
    }

    // handle
  }
}
