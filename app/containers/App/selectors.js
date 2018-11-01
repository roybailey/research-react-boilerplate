/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.global;

const selectRoute = state => state.route;

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.currentUser);

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.error);

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectTodosByCurrentStatus = () =>
  createSelector(selectGlobal, globalState => {
    const status = globalState.todoData.category;
    const hasData = globalState.todoData.todos;
    return hasData
      ? hasData.filter(todo => todo.status === status.value)
      : hasData;
  });

const makeSelectTodos = () =>
  createSelector(selectGlobal, globalState => globalState.todoData.todos);

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectTodosByCurrentStatus,
  makeSelectTodos,
  makeSelectLocation,
};
