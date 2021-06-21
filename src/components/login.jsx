import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

// Login true means logins page else registration page
const Login = ({ login }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const handleLogin = () => {};
  const handleRegister = () => {};
  return (
    <>
      <Container maxWidth='sm'>
        <Box margin={1} padding={1}>
          {/* <Paper> */}
          <Box padding={1} margin={1}>
            <Typography variant='h4'>{login ? 'Login' : 'Register'}</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label='Email' variant='outlined' fullWidth />
              </Grid>
              <Grid item xs={12}>
                {!login && (
                  <TextField label='Name' variant='outlined' fullWidth />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField label='Password' variant='outlined' fullWidth />
              </Grid>
              <Grid item xs={12}>
                {!login && (
                  <TextField
                    label='Confirm Password'
                    variant='outlined'
                    fullWidth
                  />
                )}
              </Grid>
            </Grid>

            <Grid container justify='flex-end'>
              <Grid item>
                <Button
                  onClick={() => (login ? handleLogin() : handleRegister())}
                  variant='contained'
                >
                  {login ? 'Login' : 'Register'}
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* </Paper> */}
        </Box>
      </Container>
    </>
  );
};

export default Login;
