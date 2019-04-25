import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { loadRealmAsync, updateRealmAsync, deleteRealmAsync } from '../realm/actions'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerRealms: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

// prop.match comes from React-Route
// realmId can be obtained from match.params.realmId (defined in AppRouter.js)
// The {action}Event(s) funtsion are dispatch functions
function SearchAppBar(props) {

  const { match, classes, loadRealm } = props;


  useEffect(() => {
    // loadRealm(match.params.realmId);
  }, []);


  return (
    <div className={classes.root}>
      { match.params.realmId }
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            K-Realms
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


// NOTE: If the state structure changes, make sure to reflect it as parameter
// See ./index.js for the namespace used for the realmReducer when building the rootReducer
const mapStateToProps = ({realmReducer}) => ({
  realm: realmReducer
})

const mapDispatchToProps = dispatch => ({
  loadRealm: (realmId) => dispatch(loadRealmAsync(realmId)),
  updateRealm: (realm, realmId) => dispatch(updateRealmAsync(realm, realmId)),
  deleteRealm: (realmUid, realmId) => dispatch(deleteRealmAsync(realmUid, realmId))
})

const ConnectedAppBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchAppBar);

export default withStyles(styles)(ConnectedAppBar);