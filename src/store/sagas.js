import { fork, all } from 'redux-saga/effects';
import testSaga from './test/sagas';

export default function* rootSaga() {
  yield all([
    fork(testSaga),
  ]);
}
