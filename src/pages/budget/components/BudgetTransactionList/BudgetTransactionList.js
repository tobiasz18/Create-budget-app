import React from 'react';
import { List, ListItem } from './BudgetTransactionList.css';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatCurrent, formatData } from 'utils';

function BudgetTransactionList({ transactions, allCategories }) {
  const groupedTransactions = groupBy(
    transactions,
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
  allCategories: PropTypes.array.isRequired
};

export default connect(state => ({
  transactions: state.budget.budget.transactions,
  allCategories: state.common.allCategories

}))(BudgetTransactionList);

