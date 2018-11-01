import {
  selectTodoPageStore,
  makeSelectTodoPageCategory,
  makeSelectTodoPageStatus,
} from '../selectors';

describe('selectTodoPageStore', () => {
  it('should select the todo root state', () => {
    const rootState = { category: '' };
    const mockedState = {
      todoPage: rootState,
    };
    expect(selectTodoPageStore(mockedState)).toEqual(rootState);
  });
});

describe('makeSelectTodoPageCategory', () => {
  const categorySelector = makeSelectTodoPageCategory();
  it('should select the category', () => {
    const category = 'work';
    const mockedState = { todoPage: { category } };
    expect(categorySelector(mockedState)).toEqual(category);
  });
});

describe('makeSelectTodoPageStatus', () => {
  const categorySelector = makeSelectTodoPageStatus();
  it('should select the status', () => {
    const status = 'DONE';
    const mockedState = { todoPage: { status } };
    expect(categorySelector(mockedState)).toEqual(status);
  });
});
