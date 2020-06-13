import React, { useEffect, useMemo } from 'react';
import { fetchBudget, fetchBudgetCategories } from 'data/actions/budget.actions';
import { connect } from 'react-redux';
import { fetchAllCategories } from 'data/actions/common.actions';
import { Grid } from './budget.css';
import { LoadingIndicator } from 'components';
import BudgetCategoryList from 'pages/budget/components/BudgetCategoryList';


function Budget({
  commonState, budgetState, // data
  fetchBudget, fetchBudgetCategories, fetchAllCategories // actions
}) {
  useEffect(() => {
    fetchBudget(1)
    fetchBudgetCategories(1)
    fetchAllCategories()
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories])

  const isLoaded = useMemo(() =>
    (!!commonState && Object.keys(commonState).length === 0) &&
    (!!budgetState && Object.keys(budgetState).length === 0),
    [commonState, budgetState]
  );

  return (
    <Grid>   
      <section>
        {isLoaded ? <BudgetCategoryList/> : <LoadingIndicator />}
      </section>
      <section>
        {isLoaded ? 'Transaction list' : <LoadingIndicator />}
      </section>
    </Grid>
  );
}

export default connect(state => {
  return {
    budget: state.budget.budget,
    commonState: state.common.loadingState,
    budgetState: state.budget.loadingState

  };
}, { fetchBudget, fetchBudgetCategories, fetchAllCategories })(Budget)

