import React, { Fragment } from 'react';
import { useState } from 'react';

const Item = ({ item, onClickHandler, isActive }) => (
  <div>
    <item.Trigger onClick={onClickHandler} />
    { isActive && item.children }
  </div>
);

function ToggleableList({ items }) {
  const [selectedItem, setSelectedItem] = useState('string');

  return (
    <Fragment>
      {items.map(item => (
        <Item 
          key={item.id}
          item={item}
          onClickHandler={setSelectedItem}
          isActive={setSelectedItem === item.id}
        />
      ))}
    </Fragment>
  );
}

export default ToggleableList;