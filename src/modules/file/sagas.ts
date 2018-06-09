import { takeLatest, put, call } from 'redux-saga/effects'

import { WRITE_FILE, writeFileSuccess } from './actions'
import { transformMetaverseImports } from './utils'

export default function* fileSagas() {
  yield takeLatest(WRITE_FILE.request, handleWriteFile)
}

function* handleWriteFile({ name, content }: any) {
  const finalContent = yield call(() => transformMetaverseImports(content))
  const types = ['text/plain', 'application/javascript']
  const encoded = `data:${types[1]};base64,${btoa(finalContent)}`
  yield put(writeFileSuccess(name, finalContent, encoded))
  window['sceneJson'].main = encoded
  window['handleServerMessage']({ type: 'update' })
}
