import React, { useEffect, useMemo } from 'react';
import { fetchBudget, fetchBudgetCategories } from 'data/actions/budget.actions';
import { connect } from 'react-redux';
import { fetchAllCategories } from 'data/actions/common.actions';
import { Grid } from './budget.css';
import { LoadingIndicator } from 'components';
import BudgetCategoryList from 'pages/budget/components/BudgetCategoryList';
import PropTypes from 'prop-types';
import BudgetTransactionList from 'pages/budget/components/BudgetTransactionList';

function Budget({
  commonState, budgetState, 
  fetchBudget, fetchBudgetCategories, fetchAllCategories 
}) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories])

  const isLoaded = useMemo(() =>
    (!!commonState && Object.keys(commonState).length === 0) &&
    (!!budgetState && Object.keys(budgetState).length === 0),
    [commonState, budgetState]
  );

  return (
    <Grid>
      <section>
        {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
      </section>
      <section>
        {isLoaded ? <BudgetTransactionList/> : <LoadingIndicator />}
      </section>
    </Grid>
  );
}

Budget.propTypes = {
  commonState: PropTypes.object,
  budgetState: PropTypes.object,
  fetchBudget: PropTypes.func,
  fetchBudgetCategories: PropTypes.func,
  fetchAllCategories: PropTypes.func
};

export default connect(state => {
  return {
    budget: state.budget.budget,
    commonState: state.common.loadingState,
    budgetState: state.budget.loadingState
  };
}, { fetchBudget, fetchBudgetCategories, fetchAllCategories })(Budget);

