/*
 * TodoPage Messages
 *
 * This contains all the text for the TodoPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'boilerplate.containers.TodoPage.header',
    defaultMessage: 'Todos',
  },
  todoFormHeader: {
    id: 'boilerplate.containers.TodoPage.todoFormHeader',
    defaultMessage: 'Todo List',
  },
  todoFormCategory: {
    id: 'boilerplate.containers.TodoPage.todoFormCategory',
    defaultMessage: "category (either 'work' or 'home') ",
  },
  todoFormStatus: {
    id: 'boilerplate.containers.TodoPage.todoFormStatus',
    defaultMessage: 'status',
  },
});
