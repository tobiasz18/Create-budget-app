import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';
import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

function BudgetCategoryList({ budgetCategories, allCategories, budget }) {
  const BudgetCategoriesByParent = groupBy(
    budgetCategories,
    item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
  );

  const listItems = Object.entries(BudgetCategoriesByParent).map(([parentName, categories]) => ({
    id: parentName,
    // eslint-disable-next-line react/display-name
    Trigger: ({ onClick }) => (
      <ParentCategory
        name={parentName}
        onClick={() => onClick(parentName)}
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
  }));

  return (
    <div>
      <ToggleableList
        items={listItems}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  budgetCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget
});

BudgetCategoryList.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  budgetCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  budget: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default connect(
  mapStateToProps, null
)(BudgetCategoryList);