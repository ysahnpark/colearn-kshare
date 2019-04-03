import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

const ResourceLinkInput = ({ classes, resource, deleteResource, onChange }) => {

  const handleInputChange = (event) => {
    resource = { ...resource, [event.target.name]: event.target.value };
    let myEvent = {
      "target": {
        "name": event.uid,
        "value": resource
      }
    };

    onChange(myEvent);
  };

  return (
    <Grid container spacing={24}>
      <Grid item xs>
        <TextField
          id="kind" name="kind" label="Kind"
          value={resource.kind}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs>
        <TextField
          id="uri" name="uri" label="URL"
          value={resource.uri}
          onChange={handleInputChange}
        />
        <Grid item xs>
          <DeleteIcon onClick={() => deleteResource(resource)} />
        </Grid>
      </Grid>
    </Grid>
  )
}

const ResourceLinksForm = ({ classes, name, resources, onChange }) => {

  const handleInputChange = (event) => {
    // Value represents a row
    resources = resources.map(res =>
      res.uid === event.target.value.uid ? { ...event.target.value } : res
    )
    let myEvent = {
      "target": {
        "name": name,
        "value": resources
      }
    };

    onChange(myEvent);
  };

  const deleteResource = (selectedRes) => {
    resources = resources.filter((res) => res !== selectedRes);
  }

  return (
    <Grid container spacing={24}>
      {resources.map(resource =>
        <div key={resource.sid}>
          <ResourceLinkInput resource={resource} deleteResource={deleteResource} onChange={handleInputChange} />
        </div>
      )}
    </Grid>
  )
}

export default withStyles(styles)(ResourceLinksForm);