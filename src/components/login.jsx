import {
  Box,
  Button,
  Container,
  Grid,
  // Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Navbar from './Navbar';

// Login true means logins page else registration page
const Login = ({ loginProp }) => {
  const [login, setLogin] = useState(loginProp);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const handleLogin = () => {};
  const handleRegister = () => {};
  return (
    <>
      <Navbar welcome={true} />
      <Container maxWidth='sm'>
        <Box margin={1} padding={1}>
          {/* <Paper> */}
          <Box paddingY={1} paddingX={0} marginY={1}>
            <Typography variant='h4'>{login ? 'Login' : 'Register'}</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Email'
                  variant='outlined'
                  type='email'
                  fullWidth
                />
              </Grid>
              {!login && (
                <Grid item xs={12}>
                  <TextField label='Name' variant='outlined' fullWidth />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label='Password'
                  variant='outlined'
                  type='password'
                  fullWidth
                />
              </Grid>
              {!login && (
                <Grid item xs={12}>
                  <TextField
                    label='Confirm Password'
                    variant='outlined'
                    type='password'
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>

            <Grid container spacing={2} justify='space-between'>
              <Grid item>
                <Button
                  variant='text'
                  size='small'
                  onClick={() => setLogin(!login)}
                >
                  {login
                    ? 'New user? Register here.'
                    : 'Already registered? Sign in'}
                </Button>
              </Grid>
              <Grid item>
                <Box spacing={1}>
                  <Button
                    onClick={() => (login ? handleLogin() : handleRegister())}
                    variant='contained'
                  >
                    {login ? 'Login' : 'Register'}
                  </Button>
                </Box>
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
