import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
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

const EventList = ({ classes, events, loadEvents, updateEvent, deleteEvent }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <CustomTableCell>Start Time</CustomTableCell>
          <CustomTableCell align="right">End Time</CustomTableCell>
          <CustomTableCell align="right">Title</CustomTableCell>
          <CustomTableCell align="right">Synopsis</CustomTableCell>
          <CustomTableCell align="right">Presenters</CustomTableCell>
          <CustomTableCell align="right">Audience</CustomTableCell>
          <CustomTableCell align="right">Venue</CustomTableCell>
          <CustomTableCell align="right">Edit</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map(event => (
          <TableRow className={classes.row} key={event.sid}>
            <CustomTableCell component="th" scope="row">{event.start}</CustomTableCell>
            <CustomTableCell align="right">{event.end}</CustomTableCell>
            <CustomTableCell align="right">{event.title}</CustomTableCell>
            <CustomTableCell align="right">{event.synopsis}</CustomTableCell>
            <CustomTableCell align="right">{event.presenters}</CustomTableCell>
            <CustomTableCell align="right">{event.audience}</CustomTableCell>
            <CustomTableCell align="right">{event.venue}</CustomTableCell>
            <CustomTableCell >
              <EventEditDialog event={event} updateEvent= {updateEvent}/>
              <Button onClick={()=>deleteEvent(event.uid)}>Delete</Button>
            </CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};

export default withStyles(styles)(EventList);