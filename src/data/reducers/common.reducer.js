import {
  ALL_CATEGORIES_GET,
  ALL_CATEGORIES_GET_FAILURE,
  ALL_CATEGORIES_GET_REQUEST,
  ALL_CATEGORIES_GET_SUCCESS,
  LOADING_STATES
} from 'data/constants';

const initialState = {
  loadingState: {},
  allCategories: [],
}

function common(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };

  switch (action.type) {
    case ALL_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING,
        }
      }
    case ALL_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;

      return {
        ...state,
        allCategories: action.payload,
        loadingState: newLoadingState
      }
    case ALL_CATEGORIES_GET_FAILURE:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST
      
      return {
        ...state,
        allCategories: {},
        loadingState: newLoadingState
      }  
    default:
      return state;
  }
}

export default common;