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
  makeSelectTodosByCurrentStatus,
  makeSelectLoading,
  makeSelectError,
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
import { changeCategory } from '../TodoPage/actions';
import Form from '../HomePage/Form';
import { makeSelectTodoPageCategory } from '../TodoPage/selectors';

const options = [
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
    const { loading, error, todos } = this.props;
    const todoListProps = {
      loading,
      error,
      todos,
    };
    console.log(JSON.stringify(todoListProps, null, 2));
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
              <FormattedMessage {...messages.todoListHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.todoListCategory} />
                <Select
                  id="category"
                  value={this.props.category}
                  onChange={this.props.onChangeCategory}
                  options={options}
                />
                <Button onClick={this.props.onSubmitForm}>Submit</Button>
              </label>
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
  onChangeCategory: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCategory: selectedOption =>
      dispatch(changeCategory(selectedOption)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTodos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodosByCurrentStatus(),
  category: makeSelectTodoPageCategory(),
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
