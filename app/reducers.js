/* eslint-disable no-param-reassign,default-case */
/**
 * Combine all reducers in this file and export the combined reducers.
 */
import produce from 'immer';
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = {
  location: null,
};

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      /* istanbul ignore next */
      case LOCATION_CHANGE:
        draft.location = action.payload;
        break;
    }
  });
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
