import React from 'react';
import { Navigation, Wrapper } from 'components';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import GlobalStyles from './index.css.js';
import nextId from "react-id-generator";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const id1 = nextId();
  const id2 = nextId();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Router>
        <Navigation 
          items={[
            { content: 'Homepage', to: '/', id: id1 },
            { content: 'budget', to: '/budget', id: id2 }
          ]}
          RightElement={(
            <div>
              <button>pl</button>
              <button>en</button>
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
    </ThemeProvider>
  );
}

export default App;
