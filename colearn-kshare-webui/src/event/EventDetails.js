import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import moment from 'moment'

import PostThread from '../forum/PostThread';
import { eventsBaseUrl } from './actions'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200,
  // },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const EventDetails = (props) => {
  let { classes, eventUid } = props;

  // TODO: Refactor empty event model which is also in EventList.js
  const [eventDetails, setValues] = useState({
    title: "",
    synopsis: "",
    description: "",
    type: "",
    start: "",
    end: "",
    presenters: [],
    status: "tentative",
    audience: "",
    level: "",
    venue: "",
    link: "",
    feedback: "",
    resources: [],
    post: {}
  });

  const match = matchPath(window.location.pathname, {
    path: "/:realmId/events/:eventId",
    exact: false,
    strict: false
  });

  const realmId = match.params.realmId;

  useEffect(() => {
    const fetchData = async () => {
      if (!eventUid) {
        eventUid = match.params.eventId
      }
      fetch(eventsBaseUrl(realmId) + "/" + eventUid)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          // dispatch(itemsIsLoading(false));
          return response;
        })
        .then((response) => response.json())
        .then((json) => setValues(json))
        .catch((error) => console.log(error));

    }
    fetchData();

  }, []);

  return (
    <div >
      <Grid container spacing={24}>
        <Grid item xs>
          <Typography gutterBottom variant="h4">
            {eventDetails.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography gutterBottom variant="h6">
            {eventDetails.status}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="start" name="start" label="Start" className={classes.textField}
            value={moment(eventDetails.start).format('YYYY-MM-DD hh:mm')}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="end" name="end" label="End" className={classes.venue}
            // defaultValue={eventDetails.end}
            value={moment(eventDetails.end).format('YYYY-MM-DD hh:mm')}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="venue" name="venue" label="Venue" className={classes.textField}
            value={eventDetails.venue}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="synopsis" name="synopsis" label="Synopsis" className={classes.textField}
            value={eventDetails.synopsis}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="description" name="description" label="Description" className={classes.textField}
            value={eventDetails.description}
            variant="filled"
            fullWidth multiline
          />
        </Grid>
      </Grid>

      <PostThread realmUid={eventDetails.realmUid} post={eventDetails.post} />

    </div>
  )
}

EventDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetails);