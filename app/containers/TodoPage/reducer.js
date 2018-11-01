/* eslint-disable no-param-reassign,default-case */
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
import { CHANGE_CATEGORY, CHANGE_STATUS } from './constants';

// The initial state of the App
export const initialState = { category: {}, status: {} };

function todoPageReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case CHANGE_CATEGORY:
        draft.category = action.category;
        console.log(JSON.stringify(draft, null, 2));
        break;
      case CHANGE_STATUS:
        draft.status = action.status;
        break;
    }
  });
}

export default todoPageReducer;
