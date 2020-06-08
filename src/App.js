import React, { Fragment } from 'react';
import { Navigation, Wrapper, Button } from 'components';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import GlobalStyles from './index.css.js';
import nextId from "react-id-generator";
import { useTranslation } from 'react-i18next';
import { LoadingIndicator } from 'components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Budget from 'pages/budget';

function App() {
  const id1 = nextId();
  const id2 = nextId();
  const { i18n } = useTranslation();

  return (
    <Fragment>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: 'Homepage', to: '/', id: id1 },
            { content: 'budget', to: '/budget', id: id2 }
          ]}
          RightElement={(
            <div>
              <Button variant='regular' onClick={() => i18n.changeLanguage('pl')}>pl</Button>
              <Button variant='regular' onClick={() => i18n.changeLanguage('en')}>en</Button>
            </div>
          )}
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              HOMPAGE
            </Route>
            <Route path="/budget">
              <Budget />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
}

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
