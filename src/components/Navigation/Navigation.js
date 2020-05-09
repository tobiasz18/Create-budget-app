import React from 'react';
import { Container, List, NavigationWrapper } from './Navigation.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navigation({ items = [],  RightElement }) {
  return (
    <Container>
      <NavigationWrapper>
        <List>
          {items.map(item => (
            <li key={item.id}>
              <Link to={item.to}>{item.content}</Link>
            </li>
          ))}
        </List>
        {RightElement}
      </NavigationWrapper>
    </Container>
  )
}

Navigation.propTypes  = {
  items: PropTypes.array.isRequired
}

export default Navigation;