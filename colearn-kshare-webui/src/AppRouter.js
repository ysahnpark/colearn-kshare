import React from "react";

import EventBrowse from './event/EventBrowse';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return <h2>Browse</h2>;
}

function Offer() {
  return <h2>Offer</h2>;
}

function Suggest() {
  return <h2>Suggest</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Browse</Link>
            </li>
            <li>
              <Link to="/offer-event/">Offer</Link>
            </li>
            <li>
              <Link to="/suggest-event/">Suggest</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={EventBrowse} />
        <Route path="/offer-event/" component={Offer} />
        <Route path="/suggest-event/" component={Suggest} />
      </div>
    </Router>
  );
}

export default AppRouter;