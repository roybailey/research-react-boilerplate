import { fromJS } from 'immutable';

import { selectTodoPageStore, makeSelectTodoPageCategory } from '../selectors';

describe('selectTodoPageStore', () => {
  it('should select the todo root state', () => {
    const rootState = fromJS({ category: '' });
    const mockedState = fromJS({
      todoPage: rootState,
    });
    expect(selectTodoPageStore(mockedState)).toEqual(rootState);
  });
});

describe('makeSelectTodoPageCategory', () => {
  const categorySelector = makeSelectTodoPageCategory();
  it('should select the category', () => {
    const category = 'work';
    const mockedState = fromJS({ todoPage: { category } });
    expect(categorySelector(mockedState)).toEqual(category);
  });
});
