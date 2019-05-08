import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import moment from 'moment'


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

const PostThread = (props) => {
  let { classes, realmId, threadPost, posts } = props;

  // TODO: Refactor empty event model which is also in EventList.js
  const [eventDetails, setValues] = useState({
    forumUid: "",
    threadUid: "",
    title: "",
    body: "",
    type: "",
  });

  posts = []

  return (
    <div >
      <h2>{eventDetails.title}</h2>
      <div>
        <Grid container spacing={24}>
          <Grid item xs>
          <Typography gutterBottom variant="h4">
              Title
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              Type
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary">
          Body
        </Typography>
      </div>

      {posts.map(post => (
        <div>
          <Divider variant="middle" />
          <Typography color="textSecondary">
            Body
          </Typography>
        </div>
      ))}

    </div>
  )
}

PostThread.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostThread);