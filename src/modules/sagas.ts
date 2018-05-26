import { all } from 'redux-saga/effects'

import filesSagas from 'src/modules/file/sagas'

export default function* rootSaga() {
  yield all([
    filesSagas()
  ])
}