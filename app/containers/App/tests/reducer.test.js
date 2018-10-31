import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  loadRepos,
  reposLoaded,
  repoLoadingError,
  loadTodos,
  todosLoaded,
  todosLoadingError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        repositories: false,
      }),
      todoData: fromJS({
        todos: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'repositories'], false);

    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'repositories'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(
      expectedResult,
    );
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state.set('error', fixture).set('loading', false);

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });

  //
  // Load Todos
  //

  it('should handle the loadTodos action correctly', () => {
    const expectedResult = state
      .setIn(['todoData', 'loading'], true)
      .setIn(['todoData', 'error'], false)
      .setIn(['todoData', 'todos'], false);

    expect(appReducer(state, loadTodos())).toEqual(expectedResult);
  });

  it('should handle the todosLoaded action correctly', () => {
    const fixture = [
      {
        title: 'My Todo',
      },
    ];
    const category = 'work';
    const expectedResult = state
      .setIn(['todoData', 'todos'], fixture)
      .setIn(['todoData', 'loading'], false)
      .setIn(['todoData', 'category'], category);

    expect(appReducer(state, todosLoaded(fixture, category))).toEqual(
      expectedResult,
    );
  });

  it('should handle the todosLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .setIn(['todoData', 'error'], fixture)
      .setIn(['todoData', 'loading'], false);

    expect(appReducer(state, todosLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
});
