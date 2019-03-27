import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const EventBrowse = ({ classes, events, loadEvents }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <CustomTableCell>Date</CustomTableCell>
          <CustomTableCell align="right">Time</CustomTableCell>
          <CustomTableCell align="right">Title</CustomTableCell>
          <CustomTableCell align="right">Synopsis</CustomTableCell>
          <CustomTableCell align="right">Presenter</CustomTableCell>
          <CustomTableCell align="right">Audience</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow className={classes.row} key={row.id}>
            <CustomTableCell component="th" scope="row">{row.date}</CustomTableCell>
            <CustomTableCell align="right">{row.time}</CustomTableCell>
            <CustomTableCell align="right">{row.title}</CustomTableCell>
            <CustomTableCell align="right">{row.synopsis}</CustomTableCell>
            <CustomTableCell align="right">{row.presenter}</CustomTableCell>
            <CustomTableCell align="right">{row.audience}</CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)

EventBrowse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventBrowse);