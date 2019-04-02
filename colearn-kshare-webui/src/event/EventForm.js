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
    //event.persist();
    const { name, value } = event.target;
    //setValues(values => ({ ...values, [name]: value }));
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
          <TextField
            id="synopsis" name="synopsis" label="Synopsis" className={classes.textField}
            value={eventDetails.synopsis}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select
              id="status" name="status"
              value={eventDetails.status}
              onChange={handleInputChange}
              input={<Input name="status" id="age-label-placeholder" />}
              displayEmpty
              className={classes.selectEmpty}
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
        <Grid item xs>
          <TextField
            id="venue" name="venue" label="Venue" className={classes.venue}
            value={eventDetails.venue}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={24}>
        <Grid item xs>
          <Button color="primary"
            onClick={handleSubmit} >
            Update
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