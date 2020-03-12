import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as api from 'utils/api';

import {
  GET_TEST_DATA_REQUEST,
  testActions,
} from './actions';

export function* getTestData() {
  try {
    const response = yield call(api.getTestData, {});
    yield put(testActions.getTestDataSuccess(response.data));
  } catch (err) {
    yield put(testActions.getTestDataFailure({
      message: err.message,
    }));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_TEST_DATA_REQUEST, getTestData),
  ]);
}
