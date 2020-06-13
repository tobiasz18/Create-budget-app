import React from 'react';
import { ParentCategory as Root } from './BudgetCategoryList.css';
import PropTypes from 'prop-types';

function ParentCategory({ name, onClick }) {
  console.log(typeof onClick)
  return (
    <Root onCLick={onClick}>
        {name} 
    </Root>
  );
}

ParentCategory.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}


export default ParentCategory;