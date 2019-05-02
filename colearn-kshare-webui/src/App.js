import React, { Component } from 'react';

import { matchPath } from "react-router-dom";
import AppRouter from './AppRouter';
import AppBar from './layout/AppBar';

// match contains the path in structured form
const match = matchPath(window.location.pathname, {
  path: "/:realmId/",
  exact: false,
  strict: false
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar match={match} />
        <AppRouter match={match} />
      </div>
    );
  }
}

export default App;
