import React, { useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import 'styled-components/macro';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';
import { ToggleableList } from 'components';

import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import { useTranslation } from 'react-i18next';
import { selectParentCategory } from 'data/actions/budget.actions';

function BudgetCategoryList({
  budgetedCategories, allCategories, budget,
  selectParentCategory
}) {
  const { t } = useTranslation();

  const BudgetCategoriesByParent = useMemo(() =>
    groupBy(
      budgetedCategories,
      item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    ), [budgetedCategories, allCategories]);

  const listItems = useMemo(
    () => Object.entries(BudgetCategoriesByParent).map(([parentName, categories]) => ({
      id: parentName,
      // eslint-disable-next-line react/display-name
      Trigger: ({ onClick }) => (
        <ParentCategory
          name={parentName}
          onClick={() => {
            selectParentCategory(parentName);
            onClick(parentName);
          }}
          categories={categories}
          transactions={budget.transactions}
        />
      ),
      children: categories.map(budgetedCategory => {
        const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId);
        return (
          <CategoryItem
            key={budgetedCategory.id}
            name={name}
            item={budgetedCategory}
            transactions={budget.transactions}
          />
        );
      })
    })),
    [allCategories, budget.transactions, BudgetCategoriesByParent, selectParentCategory]
  );

  const totalSpent = useMemo(() => budget.transactions
    .reduce((acc, transactions) => acc + transactions.amount, 0),
    [budget.transactions]
  );

  const restToSpent = useMemo(() => budget.totalAmount - totalSpent,
    [budget.totalAmount, totalSpent]
  );

  const amountTaken = useMemo(() => budgetedCategories.
    reduce((acc, budgetedCategory) => {
      const categoryTransactions = budget.transactions
        .filter(transaction => transaction.categoryId === budgetedCategory.id);
      const categoryExpenses = categoryTransactions
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      return acc + Math.max(categoryExpenses, budgetedCategory.budget);
    }, 0),
    [budgetedCategories, budget.transactions]
  );

  const notBudgetedTransaction = useMemo(() => budget.transactions
    .filter(transaction => {
      return !budgetedCategories
        .find(budgetedCategory => budgetedCategory.id === transaction.categoryId);
    }), [budget.transactions, budgetedCategories]);

  const notBudgetedExpenses = useMemo(() => notBudgetedTransaction.
    reduce((acc, transaction) => acc + transaction.amount, 0),
    [notBudgetedTransaction]
  );
  const availableForRestCategories = useMemo(() =>
    budget.totalAmount - amountTaken - notBudgetedExpenses,
    [budget.totalAmount, amountTaken, notBudgetedExpenses]
  );

  const handleClickParentCategoryRef = useRef(null);
  const handleClearCategorySelect = useCallback(
    () => {
      selectParentCategory();
      handleClickParentCategoryRef.current();
    }, [selectParentCategory, handleClickParentCategoryRef]);
  const handleClearSelectOtherCategories = useCallback(
    () => {
      selectParentCategory(null);
      handleClickParentCategoryRef.current();
    }, [selectParentCategory, handleClickParentCategoryRef]);

  return (
    <div>
      <div css={`border-bottom: 5px solid ${({ theme }) =>
        theme.colors.gray.light}`}
      >
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleClearCategorySelect}
        />
      </div>
      <ToggleableList
        items={listItems}
        onClickRef={handleClickParentCategoryRef}
      />
      <div
        css={`
             border-top: 5px solid ${({ theme }) => theme.colors.gray.light}
        `}
      >
        <ParentCategory
          name={t('Other categories')}
          amount={availableForRestCategories}
          onClick={handleClearSelectOtherCategories}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget
});

BudgetCategoryList.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  budgetedCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  budget: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selectParentCategory: PropTypes.func
};

export default connect(
  mapStateToProps, { selectParentCategory }
)(BudgetCategoryList);