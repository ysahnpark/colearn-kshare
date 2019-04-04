import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

import EventForm from './EventForm';

export default function EventEditDialog({event, addEvent, updateEvent}) {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{display : 'inline-block'}} >
      {(event.uid) ? <EditIcon onClick={()=>setIsOpen(true)} color="primary" />
        : <AddCircleIcon onClick={()=>setIsOpen(true)}  color="primary" ></AddCircleIcon>}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="form-dialog-title" >

        <DialogTitle id="form-dialog-title">{(event.uid) ? "Edit":"Create"} Event {event.sid}</DialogTitle>
        <DialogContent>
          {/* If event.uid is not empty, it is editingmode, assign updateEvent to onSumbit , else addEvent */}
          <EventForm origEvent={event} onSubmit={(event.uid) ? updateEvent : addEvent} />
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
