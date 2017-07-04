import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from './Container';
import Settings from './components/Settings';

import store from './store';

const App = () =>
  <Provider store={store}>
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact component={() => <h1>Home</h1>} />
          <Route path="/settings" exact component={Settings} />
          <Route component={() => <h1>Not found</h1>} />
        </Switch>
      </Container>
    </Router>
  </Provider>;

export default App;
