/* eslint-disable no-param-reassign */
/*
 * TodoReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';
import { CHANGE_CATEGORY } from './constants';

// The initial state of the App
export const initialState = { category: {} };

function todoPageReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case CHANGE_CATEGORY:
        draft.category = action.category;
        break;
      default:
        break;
    }
    return draft;
  });
}

export default todoPageReducer;
