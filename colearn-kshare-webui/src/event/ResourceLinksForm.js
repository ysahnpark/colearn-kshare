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

const ResourceLinkInput = ({ classes, idx, resource, onChange, deleteResource }) => {

  const handleInputChange = (event) => {
    resource = { ...resource, [event.target.name]: event.target.value };
    // The event object passed to the callback has this structure to keep consistency with DOM model
    // So that the parent container can handle in a consistent way. See EventForm's handleInputChange()
    let myEvent = {
      "target": {
        "name": idx,
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
          <DeleteIcon onClick={() => deleteResource(idx)} />
        </Grid>
      </Grid>
    </Grid>
  )
}

const ResourceLinksForm = ({ classes, name, resources, onChange }) => {

  const propagateChangeEvent = (resources) => {
    let myEvent = {
      "target": {
        "name": name,
        "value": resources
      }
    };

    onChange(myEvent);
  }

  const handleInputChange = (event) => {
    // Value represents a row
    resources = resources.map( (res, idx) =>
      idx === event.target.name ? { ...event.target.value } : res
    )
    propagateChangeEvent(resources);
  };

  const deleteResource = (selectedRes) => {
    if (typeof selectedRes == 'number' ) {
      resources = [ ...resources.slice(0, selectedRes), ...resources.slice(selectedRes + 1)]
    } else {
      resources = resources.filter((res) => res !== selectedRes);
    }
    propagateChangeEvent(resources);
  }

  return (
    <Grid container spacing={24}>
      {resources.map((resource, idx) => {
        let resourceWithIdx = {...resource, "_idx": idx}
        return (
          <div key={idx}>
            <ResourceLinkInput idx={idx} resource={resourceWithIdx} 
              onChange={handleInputChange} deleteResource={deleteResource}  />
          </div>
        )
      }
      )}
    </Grid>
  )
}

export default withStyles(styles)(ResourceLinksForm);