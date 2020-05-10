import React from 'react';
import { Container, List, NavigationWrapper } from './Navigation.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


function Navigation({ items = [], RightElement }) {
  const { t } = useTranslation();

  return (
    <Container>
      <NavigationWrapper>
        <List>
          {items.map(item => (
            <li key={item.id}>
              <Link to={item.to}>{t(item.content)}</Link>
            </li>
          ))}
        </List>
        {RightElement}
      </NavigationWrapper>
    </Container>
  )
}

Navigation.propTypes = {
  items: PropTypes.array.isRequired
}

export default Navigation;