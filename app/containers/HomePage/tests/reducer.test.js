/* eslint-disable no-param-reassign */
import produce from 'immer';
import homeReducer from '../reducer';
import { changeUsername } from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      username: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = produce(state, draft => {
      draft.username = fixture;
      return draft;
    });

    expect(homeReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  });
});
