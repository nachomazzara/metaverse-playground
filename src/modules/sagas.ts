import { all } from 'redux-saga/effects'

import filesSagas from 'src/modules/file/sagas'
import { watchWorkerMessages } from './typescript/sagas'

export default function* rootSaga() {
  yield all([filesSagas(), watchWorkerMessages()])
}
