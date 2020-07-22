import React, { useEffect, useMemo, Fragment } from 'react';
import { fetchBudget, fetchBudgetCategories } from 'data/actions/budget.actions';
import { connect } from 'react-redux';
import { fetchAllCategories } from 'data/actions/common.actions';
import { Grid } from './budget.css';
import { LoadingIndicator, Modal, Button } from 'components';
import BudgetCategoryList from 'pages/budget/components/BudgetCategoryList';
import PropTypes from 'prop-types';
import BudgetTransactionList from 'pages/budget/components/BudgetTransactionList';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Budget = ({
  commonState, budgetState,
  fetchBudget, fetchBudgetCategories, fetchAllCategories
}) => {

  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories]);

  const { t } = useTranslation();

  const isLoaded = useMemo(() =>
    (!!commonState && Object.keys(commonState).length === 0) &&
    (!!budgetState && Object.keys(budgetState).length === 0),
    [commonState, budgetState]
  );

  return (
    <Fragment>
      <Grid>
        <section>
          {isLoaded ? (
            <BudgetCategoryList />
          ) : <LoadingIndicator />}
        </section>
        <section>
          {isLoaded ? (
            <Fragment>
              <Button to="/budget/transactions/new">
                {t('Add new Transaction')}
              </Button>
              <BudgetTransactionList />
            </Fragment>
          )
            : <LoadingIndicator />}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>Add new transaction</Modal>
        </Route>
      </Switch>
    </Fragment>
  );
};

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

