import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Button, Grid, TextField } from '@material-ui/core';
// import CssBaseline from '@material-ui/core/CssBaseline';

const AddPlace = (props) => {
  const [name, setName] = React.useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {};
  return (
    <>
      <Container maxWidth={'sm'}>
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
            multiline
            rowsMax={4}
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
      </Container>
    </>
  );
};

export default AddPlace;
