import { takeLatest, put } from 'redux-saga/effects'

import { WRITE_FILE, writeFileSuccess } from './actions'

export default function* fileSagas() {
  yield takeLatest(WRITE_FILE.request, handleWriteFile)
}

function* handleWriteFile({ name, content }: any) {
  const encoded = 'data:text/plain;base64,' + btoa(content)
  yield put(writeFileSuccess(name, content, encoded))
  window['sceneJson'].main = encoded
  window['handleServerMessage']({ type: 'update' })
}
