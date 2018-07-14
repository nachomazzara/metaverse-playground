import { takeLatest, put, call } from 'redux-saga/effects'
import { WRITE_FILE, writeFileSuccess } from './actions'
import { compileTypescript, transformMetaverseImports } from './utils'
import { transpile } from '../typescript/sagas'

export default function* fileSagas() {
  yield takeLatest(WRITE_FILE.request as any, handleWriteFile)
}

function* handleWriteFile({ name, raw }: { name: string; raw: string }) {
  const types = ['text/plain', 'application/javascript']
  let encoded
  if (name.endsWith('.xml')) {
    encoded = `data:${types[1]};base64,${btoa(raw)}`
    yield put(writeFileSuccess(name, raw, encoded))
  } else {
    const resolved = yield call(() => transformMetaverseImports(raw))
    const res = yield call(() => transpile())
    console.log(res)
    encoded = `data:${types[1]};base64,${btoa(compileTypescript(resolved))}`
    yield put(writeFileSuccess(name, raw, encoded))
  }
  window['sceneJson'].main = encoded // TODO rename to something other than sceneJson
  window['handleServerMessage']({ type: 'update' })
}
