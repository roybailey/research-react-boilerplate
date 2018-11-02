import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import TodoListItem from 'components/TodoListItem';

function TodoList({ loading, error, todos }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (todos && todos !== false) {
    return <List items={todos} component={TodoListItem} />;
  }

  return null;
}

TodoList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  todos: PropTypes.any,
};

export default TodoList;
