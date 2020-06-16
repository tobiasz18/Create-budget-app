import React, { useMemo } from 'react';
import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryList.css';
import PropTypes from 'prop-types';
import { formatCurrent } from 'utils';

const ParentCategory = ({ name, onClick, categories, transactions }) => {
  const categoryLeftValue = useMemo(() => {

    const budgeted = (() => {
      try {
        return categories.reduce((acc, category) => acc + category.budget, 0);
      } catch (error) {
        return null;
      }
    })();

    const parentCategoryTransactions = transactions
      .filter(transaction => categories.find(category => category.categoryId === transaction.categoryId));
 
    const spentOnParentCategory = parentCategoryTransactions
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalLeft = budgeted ? budgeted - spentOnParentCategory : null;
    
    return totalLeft;

  }, [categories, transactions]);
  console.log(categoryLeftValue);
  return (
    <Root onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount negative={categoryLeftValue < 0} >
        {formatCurrent(categoryLeftValue)}
      </CategoryAmount>
    </Root>
  );
};

ParentCategory.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ParentCategory;