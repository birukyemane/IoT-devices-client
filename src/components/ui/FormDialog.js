import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    }
  }));

function FormDialog({ onAdd, models }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modelId, setModelId] = useState('');
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setModelId('');
    setSerialNumber('');
  }

  function handleModelChange(event) {
    setModelId(event.target.value);
  }  
  
  function handleNameChange(event) {
    setName(event.target.value);
  }  
  
  function handleSerialChange(event) {
    setSerialNumber(event.target.value);
  }  

  function handleOnClick(event) {
    onAdd(name, modelId, serialNumber)
    setOpen(false);
    setName('');
    setModelId('');
    setSerialNumber('');
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        NEW DEVICE
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter new device. 
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            label="Device name"
            type="text"
            fullWidth
            onChange={handleNameChange}
            value= {name}
            />
             <FormControl  className={classes.formControl}>
                <InputLabel id="select-label">Model</InputLabel>
                <Select
                    labelId="select-label"
                    value={modelId}
                    onChange={handleModelChange}
                    margin="dense"
                >
                 {models.map( model => <MenuItem key={model.id} value={model.id}>{model.name}</MenuItem>)}             
                </Select>
            </FormControl>
            <TextField
            autoFocus
            margin="dense"
            label="Serial number"
            type="text"
            fullWidth
            onChange={handleSerialChange}
            value={serialNumber}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOnClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
