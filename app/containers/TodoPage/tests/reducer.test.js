import { fromJS } from 'immutable';

import todoReducer from '../reducer';
import { changeCategory } from '../actions';

describe('todoReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      category: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(todoReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeCategory action correctly', () => {
    const category = 'work';
    const expectedResult = state.set('category', category);

    expect(todoReducer(state, changeCategory(category))).toEqual(
      expectedResult,
    );
  });
});
