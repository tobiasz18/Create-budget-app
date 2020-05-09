import React from 'react';
import { Navigation } from 'components';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import GlobalStyles from './index.css.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Router>
        <Navigation items={[
          { content: 'Homepage' , to: '/' },
          { content: 'budget', to: '/budget' }
          ]} />

        <Switch>
          <Route exact path="/">
              HOMPAGE
          </Route>
          <Route path="/budget">
              Budget page
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
