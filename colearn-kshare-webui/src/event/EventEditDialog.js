import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';

import EventForm from './EventForm';

export default function EventEditDialog({event, updateEvent}) {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{display : 'inline-block'}} >
      <EditIcon onClick={()=>setIsOpen(true)} />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="form-dialog-title" >

        <DialogTitle id="form-dialog-title">Edit Event {event.sid}</DialogTitle>
        <DialogContent>
          <EventForm origEvent={event} onSubmit={updateEvent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Close
          </Button>
          {/* <Button onClick={updateEvent} color="primary">
            Update
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
