import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';


function BudgetCategoryList({ budgetCategories, allCategories }) {
  const BudgetCategoriesByParent = groupBy(
    budgetCategories,
    item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
  );

  console.log(budgetCategories)
  console.log(BudgetCategoriesByParent)
 
  return (
    <div>
      ELOO
    </div>
  );
}

function mapStateToProps(state) {
  return {
    budgetCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories
  };
}

export default connect(
  mapStateToProps, null
)(BudgetCategoryList);