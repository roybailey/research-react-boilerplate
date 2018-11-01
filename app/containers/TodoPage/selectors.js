/**
 * TodoPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTodoPageStore = state => state.todoPage || initialState;

const makeSelectTodoPageCategory = () =>
  createSelector(selectTodoPageStore, todoPageState => todoPageState.category);

const makeSelectTodoPageStatus = () =>
  createSelector(selectTodoPageStore, todoPageState => todoPageState.status);

export {
  selectTodoPageStore,
  makeSelectTodoPageCategory,
  makeSelectTodoPageStatus,
};
