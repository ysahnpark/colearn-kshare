import React from "react";

import VisibleEventList from './event/VisibleEventList';
import { BrowserRouter as Router, Route, Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';

import Button from '@material-ui/core/Button';

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
              <Button><Link component={RouterLink} to="/" variant="body2">Browse</Link></Button>
              <Button><Link component={RouterLink} to="/offer-event/" variant="body2">Offer</Link></Button>
              <Button><Link component={RouterLink} to="/suggest-event/">Suggest</Link></Button>
        </nav>

        <Route path="/" exact component={VisibleEventList} />
        <Route path="/offer-event/" component={Offer} />
        <Route path="/suggest-event/" component={Suggest} />
      </div>
    </Router>
  );
}

export default AppRouter;