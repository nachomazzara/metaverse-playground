import { createStore, compose, applyMiddleware } from 'redux'
import createSagasMiddleware from 'redux-saga'
import reducers from 'src/modules/reducers'
import rootSaga from 'src/modules/sagas'

const sagasMiddleware = createSagasMiddleware()

const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagasMiddleware),
    (window as any).devToolsExtension
      ? (window as any).devToolsExtension()
      : f => f
  )
)

// window.store = store
sagasMiddleware.run(rootSaga)

export default store
