import React, { Component } from 'react';

import AppRouter from './AppRouter';
import AppBar from './layout/AppBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <AppRouter />
      </div>
    );
  }
}

export default App;
