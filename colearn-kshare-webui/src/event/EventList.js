import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import LoopIcon from '@material-ui/icons/Loop';
import DeleteIcon from '@material-ui/icons/Delete';

import moment from 'moment'

import EventEditDialog from './EventEditDialog';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  link: {
    paddingLeft: '.2em'
  }
});

/*
let id = 0;
function createData(date, time, title, synopsis, presenter, audience) {
  id += 1;
  return {id, date, time, title, synopsis, presenter, audience };
}

const rows = [
  createData('2019/01/07', '12:15 ~ 1:00', 'World A', 'The world is beautiful', 'John Doe', 'everyone'),
  createData('2019/01/07', '12:15 ~ 1:00', 'WOold B', 'The world is beautiful', 'John Doe', 'everyone'),
  createData('2019/01/07', '12:15 ~ 1:00', 'World C', 'The world is beautiful', 'John Doe', 'everyone'),
];
*/

function EventList({ classes, events, loadEvents, addEvent, updateEvent, deleteEvent }) {

  const emptyEvent = {
    title: "",
    synopsis: "",
    description: "",
    type: "",
    start: "",
    end: "",
    presenters: [],
    status: "",
    audience: "",
    level: "",
    venue: "",
    link: "",
    feedback: "",
    resources: []
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell colSpan={8} className={classes.row} align="right">
              <Tooltip title="Reload">
                <LoopIcon className={classes.icon} color="primary"></LoopIcon>
              </Tooltip>

              <EventEditDialog event={emptyEvent} addEvent={addEvent} updateEvent={updateEvent} />

              {/* <Tooltip title="Add new Event">
                <AddCircleIcon className={classes.icon} color="primary" ></AddCircleIcon>
              </Tooltip> */}
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell align="center">When</CustomTableCell>
            <CustomTableCell align="center">Title</CustomTableCell>
            <CustomTableCell align="center">Synopsis</CustomTableCell>
            <CustomTableCell align="center">Presenters</CustomTableCell>
            <CustomTableCell align="center">Status</CustomTableCell>
            <CustomTableCell align="center">Venue</CustomTableCell>
            <CustomTableCell align="center">Resources</CustomTableCell>
            <CustomTableCell align="center">Action</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(event => (
            <TableRow className={classes.row} key={event.sid}>
              <CustomTableCell component="th" >
                {moment(event.start).format('MM/DD/YY h:mm')} ~ {moment(event.end).format('h:mm')}
              </CustomTableCell>
              <CustomTableCell >{event.title}</CustomTableCell>
              <CustomTableCell >{event.synopsis}</CustomTableCell>
              <CustomTableCell >{event.presenters}</CustomTableCell>
              <CustomTableCell >{event.status}</CustomTableCell>
              <CustomTableCell >{event.venue}</CustomTableCell>
              <CustomTableCell >
                {
                  event.resources.map(resource => (
                    <a className={classes.link} href={resource.uri} key={resource.sid}>{resource.kind}</a>
                  ))
                }
              </CustomTableCell>
              <CustomTableCell >
                <EventEditDialog event={event} addEvent={addEvent} updateEvent={updateEvent} />
                <DeleteIcon className={classes.icon} onClick={() => deleteEvent(event.uid)} />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};

export default withStyles(styles)(EventList);