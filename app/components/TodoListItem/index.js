/**
 * TodoListItem
 *
 * Lists the name and the status of a task
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import Wrapper from './Wrapper';

export class TodoListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <div>{item.category}</div>
        <div>{item.title}</div>
        <div>{item.status}</div>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`todo-list-item-${item.id}`} item={content} />;
  }
}

TodoListItem.propTypes = {
  item: PropTypes.object,
};

export default TodoListItem;
