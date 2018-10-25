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

import H1 from 'components/H1';
import H2 from 'components/H2';

import {
  makeSelectTodos,
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
import Input from '../HomePage/Input';
import { makeSelectTodoPageCategory } from '../TodoPage/selectors';

export class TodoPage extends React.Component {
  /**
   * when initial state category is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.category && this.props.category.trim().length > 0) {
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
                <Input
                  id="category"
                  type="text"
                  placeholder="work"
                  value={this.props.category}
                  onChange={this.props.onChangeCategory}
                />
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
  category: PropTypes.string,
  onChangeCategory: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCategory: evt => dispatch(changeCategory(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTodos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
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
