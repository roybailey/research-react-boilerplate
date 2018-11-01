/* eslint-disable redux-saga/yield-effects */
/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_TODOS } from 'containers/App/constants';
import { todosLoaded, todosLoadingError } from 'containers/App/actions';

import todoData, { getTodos } from '../saga';

const category = { value: 'work' };

describe('getTodos Saga', () => {
  let getTodosGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getTodosGenerator = getTodos();

    const selectDescriptor = getTodosGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getTodosGenerator.next(category).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the todosLoaded action if it requests the data successfully', () => {
    const response = [
      {
        name: 'First todo',
      },
      {
        name: 'Second todo',
      },
    ];
    const putDescriptor = getTodosGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(todosLoaded(response, category)));
  });

  it('should call the todoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTodosGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(todosLoadingError(response)));
  });
});

describe('todosDataSaga Saga', () => {
  const todosDataSaga = todoData();

  it('should start task to watch for LOAD_TODOS action', () => {
    const takeLatestDescriptor = todosDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_TODOS, getTodos));
  });
});
