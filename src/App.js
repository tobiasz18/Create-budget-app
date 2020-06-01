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
import { connect } from 'react-redux';
import { fetchBudget, fetchBudgetCategories } from 'data/actions/budget.actions';
import { useEffect } from 'react';

function App({ budget, fetchBudget, fetchBudgetCategories, state }) {

  const id1 = nextId();
  const id2 = nextId();
  const { i18n } = useTranslation();
  console.log(budget, state, 'state')
  useEffect(() => {
    fetchBudget(1)
    fetchBudgetCategories(1)
  }, [fetchBudget])

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
              Budget page
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
}

const ConnectedApp = connect(state => {
  return {
    budget: state.budget.budget,
    state: state
  }
}, { fetchBudget, fetchBudgetCategories })(App)

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
