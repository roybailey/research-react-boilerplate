/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS,
  LOAD_TODOS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  todoData: {
    todos: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);

    case LOAD_TODOS:
      return state
        .setIn(['todoData', 'loading'], true)
        .setIn(['todoData', 'error'], false)
        .setIn(['todoData', 'todos'], false);
    case LOAD_TODOS_SUCCESS:
      return state
        .setIn(['todoData', 'loading'], false)
        .setIn(['todoData', 'category'], action.category)
        .setIn(['todoData', 'todos'], action.todos);
    case LOAD_TODOS_ERROR:
      return state
        .setIn(['todoData', 'loading'], false)
        .setIn(['todoData', 'error'], action.error);
    default:
      return state;
  }
}

export default appReducer;
