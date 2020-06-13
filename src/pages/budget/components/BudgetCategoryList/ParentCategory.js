import React from 'react';
import { ParentCategory as Root } from './BudgetCategoryList.css';
import PropTypes from 'prop-types';

const ParentCategory = ({ name, onClick }) => {
  return (
    <Root onClick={onClick}>
      {name}
    </Root>
  )
};

ParentCategory.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};


export default ParentCategory;