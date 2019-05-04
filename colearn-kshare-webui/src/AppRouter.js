import React from "react";

import VisibleEventList from './event/VisibleEventList';
import EventDetails from './event/EventDetails';
import { BrowserRouter as Router, Route, Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';

import Button from '@material-ui/core/Button';

function Offer() {
  return <h2>Offer</h2>;
}

function Suggest() {
  return <h2>Suggest</h2>;
}


// TODO: allow realmId in the router path
function AppRouter({match}) {

  return (
    <Router>
      <div>
        <nav>
          {/* TODO: Replace TEST with Realm parameter, Perhaps from window.location.pathname */}
              <Button><Link component={RouterLink} to={"/" + match.params.realmId + "/events"} variant="body2">Browse</Link></Button>
              <Button><Link component={RouterLink} to={"/" + match.params.realmId + "/events/offer-event/"} variant="body2">Offer</Link></Button>
              <Button><Link component={RouterLink} to={"/" + match.params.realmId + "/events/suggest-event/"} >Suggest</Link></Button>
        </nav>

        <Route path="/:realmId/events" exact component={VisibleEventList} />
        <Route path="/:realmId/events/:eventId" component={EventDetails} />
        <Route path="/:realmId/events/offer-event/" component={Offer} />
        <Route path="/:realmId/events/suggest-event/" component={Suggest} />
      </div>
    </Router>
  );
}

export default AppRouter;