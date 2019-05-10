import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import moment from 'moment'

import ResourceLinksForm from './ResourceLinksForm'

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
const EventForm = ({ classes, origEvent, onSubmit }) => {
  const [eventDetails, setValues] = useState(origEvent);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    // alert("Event:" + JSON.stringify(eventDetails,null, null, 2));
    onSubmit(eventDetails)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...eventDetails, [name]: value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="title" name="title" label="Title" className={classes.textField}
            value={eventDetails.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              id="status" name="status" className={classes.selectEmpty}
              value={eventDetails.status}
              onChange={handleInputChange}
              input={<Input name="status" id="status" />}
              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"tbd"}>TBD</MenuItem>
              <MenuItem value={"tentative"}>Tentative</MenuItem>
              <MenuItem value={"confirmed"}>Confirmed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="start" name="start" label="Start" type="datetime-local" className={classes.textField}
            value={moment(eventDetails.start).format('YYYY-MM-DDThh:mm')}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="end" name="end" label="End" type="datetime-local" className={classes.venue}
            // defaultValue={eventDetails.end}
            value={moment(eventDetails.end).format('YYYY-MM-DDThh:mm')}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="synopsis" name="synopsis" label="Synopsis" className={classes.textField}
            value={eventDetails.synopsis}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            id="description" name="description" label="Description" className={classes.textField}
            value={eventDetails.description}
            onChange={handleInputChange}
            fullWidth multiline
          />
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <ResourceLinksForm id="resources" name="resources" resources={eventDetails.resources} onChange={handleInputChange} />
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <Button color="primary"
            onClick={handleSubmit} >
            {(origEvent.uid) ? "Update" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
  origEvent: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);