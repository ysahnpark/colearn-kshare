import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms/
const EventForm = ({ classes, origEvent, onSumbit }) => {
  const [eventDetails, setValues] = useState(origEvent);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    alert("Event:" + JSON.stringify(eventDetails,null, null, 2));
    // onSubmit(eventDetails)

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
            id="title"
            name="title"
            label="Title"
            className={classes.textField}
            value={eventDetails.title}
            onChange={handleInputChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="synopsis"
            name="synopsis"
            label="Synopsis"
            className={classes.textField}
            value={eventDetails.synopsis}
            onChange={handleInputChange}
            margin="normal"
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
  event: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);