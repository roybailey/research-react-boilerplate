/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['userData', 'repositories']),
  );

const makeSelectTodosByCurrentStatus = () =>
  createSelector(selectGlobal, globalState => {
    const status = globalState.getIn(['todoData', 'category']);
    const hasData = globalState.getIn(['todoData', 'todos']);
    return hasData
      ? hasData.filter(todo => todo.status === status.value)
      : hasData;
  });

const makeSelectTodos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['todoData', 'todos']),
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

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
