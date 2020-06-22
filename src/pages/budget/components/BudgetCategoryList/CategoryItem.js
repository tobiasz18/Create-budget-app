import React from 'react';
import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryList.css';
import PropTypes from 'prop-types';
import { formatCurrent } from 'utils';


const CategoryItem = ({ name, item, transactions }) => {
  const categoryTransactions = transactions
    .filter(transaction => transaction.categoryId === item.id);
    
  const spentOnCategory = categoryTransactions
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalLeft = item.budget - spentOnCategory;

  return (
    <Root >
      <span>{name}</span>
      <CategoryAmount negative={totalLeft < 0}>
        {formatCurrent(totalLeft)}
      </CategoryAmount>
    </Root>
  );
};

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CategoryItem;