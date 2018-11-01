/* eslint-disable no-param-reassign */
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

import { produce } from 'immer';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS,
  LOAD_TODOS_ERROR,
} from './constants';

// The initial state of the App
const initialState = {
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

function appReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;
      case LOAD_REPOS_SUCCESS:
        draft.loading = false;
        draft.currentUser = action.username;
        draft.userData.repositories = action.repos;
        break;
      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_TODOS:
        draft.todoData.loading = true;
        draft.todoData.error = false;
        draft.todoData.todos = false;
        break;
      case LOAD_TODOS_SUCCESS:
        draft.todoData.loading = false;
        draft.todoData.category = action.category;
        draft.todoData.todos = action.todos;
        break;
      case LOAD_TODOS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      default:
        break;
    }
    return draft;
  });
}

export default appReducer;
