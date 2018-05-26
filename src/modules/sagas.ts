import { all } from 'redux-saga/effects'

import filesSagas from 'src/modules/file/saga'

export default function* rootSaga() {
  yield all([
    filesSagas()
  ])
}