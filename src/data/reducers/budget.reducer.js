import {
  BUDGET_GET_FAILURE,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  LOADING_STATES,

  BUDGET_CATEGORIES_GET_FAILURE,
  BUDGET_CATEGORIES_GET_REQUEST,
  BUDGET_CATEGORIES_GET_SUCCESS,

  SET_SELECTED_PARENT_CATEGORY_ID
} from 'data/constants';

const initialState = {
  loadingState: null,
  budget: {},
  budgetedCategories: [],
  selectedParentCategoryId: undefined
};

function budget(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };

  switch (action.type) {
    case BUDGET_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING
        }
      };

    case BUDGET_GET_SUCCESS:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: action.payload,
        loadingState: newLoadingState
      };

    case BUDGET_GET_FAILURE:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: {},
        loadingState: newLoadingState
      };

    case BUDGET_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING
        }
      };

    case BUDGET_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.BUDGET_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetedCategories: action.payload,
        loadingState: newLoadingState
      };

    case BUDGET_CATEGORIES_GET_FAILURE:
      delete newLoadingState.BUDGET_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetedCategories: {},
        loadingState: newLoadingState
      };
      
     case SET_SELECTED_PARENT_CATEGORY_ID:
       return {
         ...state,
         selectedParentCategoryId: action.payload
       }; 

    default:
      return state;
  }
}

export default budget;