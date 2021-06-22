import React, { useState } from 'react';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import { Box, Button, TextField } from '@material-ui/core';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import { useHistory } from 'react-router';

const AddPlace = () => {
  const [name, setName] = React.useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (name && location && description) {
      const placeObj = {
        name: name.trim(),
        location: location.trim(),
        description: description.trim(),
      };
      axios
        .post(baseUrl + 'places/add/', placeObj)
        .then((res) => {
          console.log('/places/add', res);
          if (res.data) {
            console.log('Place added');
            resetForm();
            handleClose();
            history.push('/places');
          } else {
            console.log('Failed');
          }
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  };

  const resetForm = () => {
    setName('');
    setLocation('');
    setDescription('');
  };

  return (
    <>
      <Button
        variant='contained'
        // color='primary'
        onClick={handleClickOpen}
      >
        Add New Place
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add New Place</DialogTitle>
        <DialogContent>
          {/* <form> */}
          <TextField
            label='Name'
            fullWidth
            value={name}
            margin='dense'
            onChange={handleChangeName}
          />
          <TextField
            label='Location'
            value={location}
            fullWidth
            margin='dense'
            onChange={handleChangeLocation}
          />
          <TextField
            label='Description'
            value={description}
            // multiline
            // rowsMax={4}
            fullWidth
            margin='dense'
            onChange={handleChangeDescription}
          />
          {/* </form> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Container maxWidth={'sm'}>
        <form>
          <TextField
            label='Name'
            fullWidth
            value={name}
            margin='dense'
            onChange={handleChangeName}
          />
          <TextField
            label='Location'
            value={location}
            fullWidth
            margin='dense'
            onChange={handleChangeLocation}
          />
          <TextField
            label='Description'
            value={description}
            // multiline
            // rowsMax={4}
            fullWidth
            margin='dense'
            onChange={handleChangeDescription}
          />

          <Box margin={1} padding={1}>
            <Grid container justify='flex-end'>
              <Grid item>
                <Button variant='outlined' onSubmit={() => handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container> */}
    </>
  );
};

export default AddPlace;
