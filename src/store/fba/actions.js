import { createAction } from 'redux-actions';

export const GET_TEST_DATA_REQUEST = '@test/GET_TEST_DATA_REQUEST';
export const GET_TEST_DATA_SUCCESS = '@test/GET_TEST_DATA_SUCCESS';
export const GET_TEST_DATA_FAILURE = '@test/GET_TEST_DATA_FAILURE';

export const testActions = {
  getTestDataRequest: createAction(GET_TEST_DATA_REQUEST),
  getTestDataSuccess: createAction(GET_TEST_DATA_SUCCESS),
  getTestDataFailure: createAction(GET_TEST_DATA_FAILURE),
};
