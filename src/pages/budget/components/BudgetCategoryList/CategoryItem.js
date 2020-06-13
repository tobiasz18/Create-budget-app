import React from 'react';
import { CategoryItem as Root } from './BudgetCategoryList.css';
import PropTypes from 'prop-types';

const CategoryItem = ({ name }) => {
  return (
    <Root >
      {name}
    </Root>
  )
};

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CategoryItem;