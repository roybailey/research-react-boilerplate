/* eslint-disable no-param-reassign,no-unused-vars */
import produce from 'immer';
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
    state = {
      loading: false,
      error: false,
      currentUser: false,
      userData: {
        repositories: false,
      },
      todoData: {
        todos: false,
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.userData.repositories = false;
    });

    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const username = 'test';
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.currentUser = username;
      draft.userData.repositories = fixture;
    });

    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(
      expectedResult,
    );
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = fixture;
    });

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });

  //
  // Load Todos
  //

  it('should handle the loadTodos action correctly', () => {
    const expectedResult = produce(state, draft => {
      state.todoData.loading = true;
      state.todoData.error = false;
      state.todoData.todos = false;
    });
    expect(appReducer(state, loadTodos())).toEqual(expectedResult);
  });

  it('should handle the todosLoaded action correctly', () => {
    const fixture = [
      {
        title: 'My Todo',
      },
    ];
    const category = 'work';
    const expectedResult = produce(state, draft => {
      draft.todoData.loading = false;
      draft.todoData.category = category;
      draft.todoData.todos = fixture;
    });

    expect(appReducer(state, todosLoaded(fixture, category))).toEqual(
      expectedResult,
    );
  });

  it('should handle the todosLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = fixture;
    });

    expect(appReducer(state, todosLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
});
