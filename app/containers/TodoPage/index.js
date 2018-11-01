/*
 * TodoPage
 *
 * Demo Todos Handling
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Select from 'react-select';

import H1 from 'components/H1';
import H2 from 'components/H2';
import Button from 'components/Button';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectTodos,
} from 'containers/App/selectors';

import TodoList from 'components/TodoList';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import messages from './messages';
import CenteredSection from '../HomePage/CenteredSection';
import Section from '../HomePage/Section';
import { loadTodos } from '../App/actions';

import reducer from './reducer';
import saga from './saga';
import Form from '../HomePage/Form';
import Input from '../HomePage/Input';
import { changeCategory, changeStatus } from '../TodoPage/actions';
import {
  makeSelectTodoPageCategory,
  makeSelectTodoPageStatus,
} from '../TodoPage/selectors';

const options = [
  { value: undefined, label: 'all' },
  { value: 'NOT_STARTED', label: 'Todo' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'FINISHED', label: 'Done' },
];

export class TodoPage extends React.Component {
  /**
   * when initial state category is not null, submit the form to load repos
   */
  componentDidMount() {
    if (
      this.props.category.value &&
      this.props.category.value.trim().length > 0
    ) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, todos, status } = this.props;
    const filter = status && status.value ? status.value : '';
    const filteredTodos = todos
      ? todos.filter(todo => todo.status === filter || !filter)
      : todos;
    const todoListProps = {
      loading,
      error,
      todos: filteredTodos,
    };
    console.log(
      `\n${JSON.stringify(todos)}\n  filtered by ${filter}\n${JSON.stringify(
        filteredTodos,
      )}`,
    );
    return (
      <article>
        <Helmet>
          <title>Todo Page</title>
          <meta
            name="description"
            content="Todo page of React.js Boilerplate application"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <H1>
              <FormattedMessage {...messages.header} />
            </H1>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.todoFormHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="category">
                <FormattedMessage {...messages.todoFormCategory} />
                <Input
                  id="category"
                  type="text"
                  placeholder="work"
                  value={this.props.category.value || ''}
                  onChange={evt =>
                    this.props.onChangeCategory({ value: evt.target.value })
                  }
                />
              </label>
              <br />
              <br />
              <label htmlFor="status">
                <FormattedMessage {...messages.todoFormStatus} />
                <Select
                  id="status"
                  value={this.props.status}
                  onChange={this.props.onChangeStatus}
                  options={options}
                />
              </label>
              <br />
              <Button onClick={this.props.onSubmitForm}>Submit</Button>
            </Form>
            <TodoList {...todoListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

TodoPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  todos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  category: PropTypes.object,
  status: PropTypes.object,
  onChangeCategory: PropTypes.func,
  onChangeStatus: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCategory: category => dispatch(changeCategory(category)),
    onChangeStatus: selectedOption => dispatch(changeStatus(selectedOption)),
    onSubmitForm: evt => {
      console.log('SUBMIT');
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTodos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  category: makeSelectTodoPageCategory(),
  status: makeSelectTodoPageStatus(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'todoPage', reducer });
const withSaga = injectSaga({ key: 'todoPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TodoPage);
