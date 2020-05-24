import {
  BUDGET_GET,
  BUDGET_GET_FAILURE,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  LOADING_STATES
} from 'data/constants';

const initialState = {
  loadingState: {

  },
  budget: {},
  budgetedCategories: [],
}

function budget(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };

  switch (action.type) {
    case BUDGET_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING,
        }
      }
    case BUDGET_GET_SUCCESS:
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        budget: action.payload,
        loadingState: newLoadingState
      }
    case BUDGET_GET_FAILURE:
      delete newLoadingState.BUDGET_GET_REQUEST;
      
      return {
        ...state,
        budget: {},
        loadingState: newLoadingState
      }  
    default:
      return state;
  }
}

export default budget;