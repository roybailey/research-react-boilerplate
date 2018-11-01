/* eslint-disable no-return-assign,no-param-reassign */
import produce from 'immer';
import todoReducer from '../reducer';
import { changeCategory } from '../actions';

describe('todoReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      category: {},
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(todoReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeCategory action correctly', () => {
    const category = 'work';
    const expectedResult = produce(state, draft => {
      draft.category = category;
    });

    expect(todoReducer(state, changeCategory(category))).toEqual(
      expectedResult,
    );
  });
});
