import React from "react";

import VisibleEventList from './event/VisibleEventList';
import { matchPath, BrowserRouter as Router, Route, Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';

import Button from '@material-ui/core/Button';

function Offer() {
  return <h2>Offer</h2>;
}

function Suggest() {
  return <h2>Suggest</h2>;
}

const match = matchPath(window.location.pathname, {
  path: "/:realmId/",
  exact: false,
  strict: false
});

console.log(JSON.stringify(match));

// TODO: allow realmId in the router path
function AppRouter(props) {
  return (
    <Router>
      <div>
        <nav>
          {/* TODO: Replace TEST with Realm parameter, Perhaps from window.location.pathname */}
              <Button><Link component={RouterLink} to={"/" + match.params.realmId + "/browse"} variant="body2">Browse</Link></Button>
              <Button><Link component={RouterLink} to={"/" + match.params.realmId + "/offer-event/"} variant="body2">Offer</Link></Button>
              <Button><Link component={RouterLink} to={"/" + match.params.realmId + "/suggest-event/"} >Suggest</Link></Button>
        </nav>

        <Route path="/:realmId/browse" component={VisibleEventList} />
        <Route path="/:realmId/offer-event/" component={Offer} />
        <Route path="/:realmId/suggest-event/" component={Suggest} />
      </div>
    </Router>
  );
}

export default AppRouter;