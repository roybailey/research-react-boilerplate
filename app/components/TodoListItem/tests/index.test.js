/**
 * Test the repo list item
 */

import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';

import ListItem from 'components/ListItem';
import { TodoListItem } from '../index';

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <TodoListItem {...props} />
    </IntlProvider>,
  );

describe('<TodoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      id: 1,
      title: 'react-boilerplate',
      status: 'done',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(<TodoListItem item={item} />);
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });

  it('should render a tag', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.length).toBe(1);
  });
});
