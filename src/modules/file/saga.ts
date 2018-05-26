import { takeLatest, put } from 'redux-saga/effects'

import { WRITE_FILE, writeFileSuccess } from './actions';


declare global {
  interface Window {
    sceneJson: any,
    reloadPreview: () => void
  }
}

export default function* fileSagas() {
  yield takeLatest(WRITE_FILE.request, handleWriteFile)
}

function* handleWriteFile({ name, content }: any) {
  const blobUrl = window.URL.createObjectURL(
    new Blob([content], { type: 'text/xml' })
  )
  yield put(writeFileSuccess(name, content, blobUrl))
  // window.sceneJson.main = blobUrl
  window.reloadPreview()
}