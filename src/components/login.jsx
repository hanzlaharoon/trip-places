import {
  Box,
  Button,
  Container,
  Grid,
  // Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { baseUrl } from '../shared/baseUrl';
import Navbar from './Navbar';

// Login true means logins page else registration page
const Login = ({ loginProp }) => {
  const [login, setLogin] = useState(loginProp);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const history = useHistory();
  const handleLogin = () => {
    const userObj = {
      email: email,
      password: password,
    };
    axios
      .post(baseUrl + 'users/login/', userObj)
      .then((res) => {
        console.log('/login', res);
        if (res.data) {
          console.log('Login Successful');
          resetForm();
          history.push('/places');
        } else {
          console.log('Login Failed');
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };
  const handleRegister = () => {
    if (password === confirmPass) {
      const userObj = {
        email: email,
        name: name,
        password: password,
      };
      axios
        .post(baseUrl + 'users/register/', userObj)
        .then((res) => {
          console.log('/register', res);
          if (res.data) {
            console.log('Register Successful');
            resetForm();
            history.push('/places');
          } else {
            console.log('Sign Up Failed');
          }
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPass('');
  };

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
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              {!login && (
                <Grid item xs={12}>
                  <TextField
                    label='Name'
                    variant='outlined'
                    // value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label='Password'
                  variant='outlined'
                  type='password'
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              {!login && (
                <Grid item xs={12}>
                  <TextField
                    label='Confirm Password'
                    variant='outlined'
                    type='password'
                    // value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
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
