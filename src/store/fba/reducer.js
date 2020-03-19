import initialState from './initialState';

import {
  GET_TEST_DATA_REQUEST,
  GET_TEST_DATA_SUCCESS,
  GET_TEST_DATA_FAILURE,
} from './actions';

export default function (state = initialState, action = {}) {
  switch (action.type) {
    // Login
    case GET_TEST_DATA_REQUEST:
      return {
        ...state,
        status: 'running',
      };
    case GET_TEST_DATA_SUCCESS:
      return {
        ...state,
        testData: action.payload,
        status: 'idle',
      };
    case GET_TEST_DATA_FAILURE:
      return {
        ...state,
        status: 'idle',
      };
    default:
      return state;
  }
}
