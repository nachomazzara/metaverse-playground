import { takeLatest, put, call, select } from 'redux-saga/effects'
import { WRITE_FILE, writeFileSuccess } from './actions'
import { getMainFile } from './selectors'
import { compileTypescript, transformMetaverseImports } from './utils'

export default function* fileSagas() {
  yield takeLatest(WRITE_FILE.request as any, handleWriteFile)
}

function* handleWriteFile(action) {
  const { path, raw } = action.payload as { path: string; raw: string }
  const types = ['text/plain', 'application/javascript']
  let encoded
  if (path.endsWith('.xml')) {
    encoded = `data:${types[1]};base64,${btoa(raw)}`
  } else {
    const mainFile = yield select(getMainFile)
    const resolved = yield call(() => transformMetaverseImports(mainFile.raw))
    encoded = `data:${types[1]};base64,${btoa(compileTypescript(resolved))}`
  }
  console.log('c')

  yield put(writeFileSuccess(path, raw, encoded))

  window['sceneJson'].main = encoded // TODO rename to something other than sceneJson
  window['handleServerMessage']({ type: 'update' })
}
