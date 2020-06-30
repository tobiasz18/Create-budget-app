import React from 'react';
import { List, ListItem } from './BudgetTransactionList.css';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';
import { formatCurrent, formatData } from 'utils';

function BudgetTransactionList({ transactions, allCategories, selectedParentCategoryId, budgetedCategories }) {
  const filteredTransactionsBySelectedParentCategory = (() => {
    if(typeof selectedParentCategoryId === 'undefined') return transactions;

    if(selectedParentCategoryId === null) {
      return transactions.filter(transaction => {
        const hasBudgetedCategory = budgetedCategories.some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);

        return !hasBudgetedCategory;
      });
    }

    return transactions.filter(transaction => {
      try {
        const category = allCategories.find(category => category.id === transaction.categoryId);
        const parentCategoryName = category.parentCategory.name;

        return parentCategoryName === selectedParentCategoryId;
      } catch (error) {
        return false;
      }
    });
  })();

  const groupedTransactions = groupBy(
    filteredTransactionsBySelectedParentCategory,
    transaction => new Date(transaction.date).getUTCDate()
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, value]) => (
        <li key={key}>
          <ul>
            {value.map(transaction => (
              <ListItem key={transaction.id}>
                <div>{transaction.description}</div>
                <div>{formatCurrent(transaction.amount)}</div>
                <div>{formatData(transaction.date)}</div>
                <div>
                  {(allCategories.find(category => category.id === transaction.categoryId) || {}).name}
                </div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

BudgetTransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  allCategories: PropTypes.array.isRequired,
  selectedParentCategoryId: PropTypes.string,
  budgetedCategories: PropTypes.array.isRequired
};

export default connect(state => ({
  transactions: state.budget.budget.transactions,
  allCategories: state.common.allCategories,
  budgetedCategories: state.budget.budgetedCategories,
  selectedParentCategoryId: state.budget.selectedParentCategoryId

}))(BudgetTransactionList);

