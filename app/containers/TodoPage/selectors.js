/**
 * TodoPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTodoPageStore = state => state.get('todoPage', initialState);

const makeSelectTodoPageCategory = () =>
  createSelector(selectTodoPageStore, todoPageState =>
    todoPageState.get('category'),
  );

export { selectTodoPageStore, makeSelectTodoPageCategory };
