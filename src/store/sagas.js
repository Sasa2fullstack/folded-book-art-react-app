import { fork, all } from 'redux-saga/effects';
import fbaSaga from './fba/sagas';

export default function* rootSaga() {
  yield all([fork(fbaSaga)]);
}
