import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';

import TodoListItem from 'components/TodoListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import TodoList from '../index';

describe('<TodoList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<TodoList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />),
    ).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <TodoList loading={false} error={{ message: 'Loading failed!' }} />
      </IntlProvider>,
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the todos if loading was successful', () => {
    const todos = [
      {
        title: 'Something',
      },
    ];
    const renderedComponent = shallow(<TodoList todos={todos} error={false} />);

    expect(
      renderedComponent.contains(
        <List items={todos} component={TodoListItem} />,
      ),
    ).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <TodoList todos={false} error={false} loading={false} />,
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
