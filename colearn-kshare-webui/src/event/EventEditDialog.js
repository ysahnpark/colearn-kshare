import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EventForm from './EventForm';

export default function EventEditDialog({event, updateEvent}) {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="form-dialog-title" >
        
        <DialogTitle id="form-dialog-title">Edit Event {event.sid}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the values and press Update
          </DialogContentText>
          <EventForm origEvent={event} onSubmit={updateEvent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={onSubmit} color="primary">
            Update
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
