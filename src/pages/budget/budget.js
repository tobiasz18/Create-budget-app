import React, { useEffect } from 'react';
import { fetchBudget, fetchBudgetCategories } from 'data/actions/budget.actions';
import { connect } from 'react-redux';

function Budget({ fetchBudget, fetchBudgetCategories }) {
  useEffect(() => {
    fetchBudget(1)
    fetchBudgetCategories(1)
  }, [fetchBudget])

  return (
    <div>
      Budget Page test
    </div>
  );
}

export default connect(state => {
  return {
    budget: state.budget.budget,
    state: state
  }
}, { fetchBudget, fetchBudgetCategories })(Budget)

