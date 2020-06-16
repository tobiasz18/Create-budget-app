import React, { Fragment } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Item = ({ item, onClickHandler, isActive }) => (
  <div>
    <item.Trigger onClick={onClickHandler} />
    { isActive && item.children }
  </div>
);

function ToggleableList({ items }) {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <Fragment>
      {items.map(item => (
        <Item 
          key={item.id}
          item={item}
          onClickHandler={setSelectedItem}
          isActive={selectedItem === item.id}
        />
      ))}
    </Fragment>
  );
}

ToggleableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default ToggleableList;