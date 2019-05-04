import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import moment from 'moment'

import {eventsBaseUrl} from './actions'

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

// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms/
const EventForm = ({ classes, realmId, eventUid }) => {
  // Refactor empty event model which is also in EventList.js
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
    resources: []
  });

  const match = matchPath(window.location.pathname, {
    path: "/:realmId/events/:eventId",
    exact: false,
    strict: false
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!eventUid) {
        eventUid = match.params.eventId
      }
      fetch(eventsBaseUrl(realmId)+ "/" + eventUid)
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
      <h2>{eventDetails.title}</h2>
      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="title" name="title" label="Title" className={classes.textField}
            value={eventDetails.title}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs>
          <FormControl className={classes.formControl}>
            <TextField
              id="status" name="status" label="Status" className={classes.textField}
              value={eventDetails.status}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
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
          />
        </Grid>
      </Grid>

    </div>
  )
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);