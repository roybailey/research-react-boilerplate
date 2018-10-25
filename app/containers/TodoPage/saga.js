/**
 * Gets the todos of the category from faker generated data
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TODOS } from 'containers/App/constants';
import { todosLoaded, todosLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectTodoPageCategory } from 'containers/TodoPage/selectors';

/**
 * Github repos request/response handler
 */
export function* getTodos() {
  // Select category from store
  const category = yield select(makeSelectTodoPageCategory());
  const requestURL = `/api/todo`;

  try {
    // Call our request helper (see 'utils/request')
    console.log(`Sending ${category} todo request ${requestURL}`);
    const todos = yield call(request, requestURL);
    console.log(`Received\n${JSON.stringify(todos, null, 2)}`);
    yield put(todosLoaded(todos, category));
  } catch (err) {
    yield put(todosLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* todoData() {
  // Watches for LOAD_TODOS actions and calls getTodos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_TODOS, getTodos);
}
