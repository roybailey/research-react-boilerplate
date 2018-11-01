/**
 * Test the TodoPage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import TodoList from 'components/TodoList';
import { TodoPage, mapDispatchToProps } from '../index';
import { changeCategory, changeStatus } from '../actions';
import { loadTodos } from '../../App/actions';

describe('<TodoPage />', () => {
  it('should render the todos list', () => {
    const renderedComponent = shallow(
      <TodoPage loading error={false} todos={[]} category={{}} />,
    );
    expect(
      renderedComponent.contains(<TodoList loading error={false} todos={[]} />),
    ).toEqual(true);
  });

  it('should render fetch the todos on mount if a category exists', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <TodoPage
          category={{ value: 'work ' }}
          onChangeCategory={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>,
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not call onSubmitForm if category is an empty string', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <TodoPage
          category={{ value: '' }}
          onChangeCategory={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should not call onSubmitForm if category is null', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <TodoPage
          category={{}}
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeCategory', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeCategory).toBeDefined();
      });

      it('should dispatch changeCategory when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const category = { value: 'work' };
        result.onChangeCategory(category);
        expect(dispatch).toHaveBeenCalledWith(changeCategory(category));
      });
    });

    describe('onChangeStatus', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeStatus).toBeDefined();
      });

      it('should dispatch changeStatus when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const status = { value: 'DONE' };
        result.onChangeStatus(status);
        expect(dispatch).toHaveBeenCalledWith(changeStatus(status));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch loadRepos when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(loadTodos());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
