import {
  BUDGET_GET,
  BUDGET_CATEGORIES_GET,
} from 'data/constants';

import API from 'data/fetch';

export const fetchBudget = id => {
  const promise =  API.budget.fetchBudget(id);

    return {
      type: BUDGET_GET,
      promise
    }
}

export const fetchBudgetCategories = id => {
  const promise = API.budget.fetchBudgetedCategories(id);

  return {
    type: BUDGET_CATEGORIES_GET,
    promise
  }
}