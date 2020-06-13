import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';
import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';

function BudgetCategoryList({ budgetCategories, allCategories }) {
  const BudgetCategoriesByParent = groupBy(
    budgetCategories,
    item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
  );
  console.log(budgetCategories, allCategories)
  const listItems = Object.entries(BudgetCategoriesByParent).map(([parentName, categories]) => ({
    id: parentName,
    Trigger: ({ onClick }) => (
      <ParentCategory
        name={parentName}
        onClick={onClick}
      />
    )
    /*children: categories.map(category => (

    ))*/
  }));
  console.log(listItems, 'listItems');

  return (
    <div>
      <ToggleableList
        items={listItems}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    budgetCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories
  };
};

BudgetCategoryList.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  budgetCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(
  mapStateToProps, null
)(BudgetCategoryList);