/**
 * TodoPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { makeSelectTodos } from '../App/selectors';

export const selectTodoPageStore = state => state.todoPage || initialState;

export const makeSelectTodoPageCategory = () =>
  createSelector(selectTodoPageStore, todoPageState => todoPageState.category);

export const makeSelectTodoPageStatus = () =>
  createSelector(selectTodoPageStore, todoPageState => todoPageState.status);

export const makeSelectTodoByStatus = () =>
  createSelector(
    makeSelectTodoPageStatus(),
    makeSelectTodos(),
    (status, todos) =>
      todos
        ? todos.filter(todo => !status.value || todo.status === status.value)
        : todos,
  );
