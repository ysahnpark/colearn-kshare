import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { addPost, fetchThreadPosts } from './forumClient'

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
  let { classes, realmUid, post } = props;

  const [threadPosts, setThreadPosts] = useState([]);

  const [postFields, setValues] = useState({
    title: "",
    body: "",
    type: "",
  });

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    // alert( JSON.stringify(postFields) )
    try {
      let response = await addPost(realmUid, postFields);
      // console.log(JSON.stringify(response));
      loadThreadPosts()
      setValues({ ...postFields, body: "" });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...postFields, [name]: value });
  };

  const loadThreadPosts = async () => {
    try {
      const threadPosts = await fetchThreadPosts(realmUid, post.forumUid, post.uid, 0);
      setThreadPosts(threadPosts.content);
    } catch (err) {
      alert("Error: " + err);
    }
  }

  /**
   * When post object's uid and forumUid is loaded, it loads posts associated to this thread 
   */
  useEffect(() => {
    if (!post.forumUid || !post.uid) return;

    loadThreadPosts();

    setValues({
      ...postFields,
      forumUid: post.forumUid,
      threadUid: post.uid
    });
    console.log("Called")
  }, [post]);


  return (
    <div >
      <div>
        <Grid container spacing={24}>
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {post.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {post.vote}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6">
          {post.body}
        </Typography>
      </div>

      {threadPosts && threadPosts.map(childPost => (
        <div>
          <Divider />

          <Grid container spacing={24}>
            <Grid item xs>
              <Typography color="textSecondary">
                {childPost.body}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom color="textSecondary">
                {moment(childPost.createdAt).format('MM/DD - hh:mm')}
              </Typography>
            </Grid>
          </Grid>

        </div>
      ))}
      <div>
        <Divider />

        <Grid container spacing={24}>
          <Grid item xs>
            <TextField
              id="body" name="body" label="Post Your Message" className={classes.textField}
              value={postFields.body}
              onChange={handleInputChange}
              fullWidth multiline
            />
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={handleSubmit} >Post</Button>
          </Grid>
        </Grid>


      </div>

    </div>
  )
}

PostThread.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostThread);