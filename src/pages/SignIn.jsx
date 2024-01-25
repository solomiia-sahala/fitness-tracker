import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Checkbox, CssBaseline, FormControlLabel, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useState } from 'react';

const userInitialData = { id: null, email: '', password: '', error: null, auth: null };

const SignIn = () => {
  const [user, setUser] = useState(userInitialData)

  const isValid = () => !!user.email && !!user.password;

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser(prev=> ({...prev, [name]: value}));
  }

  const handleSubmit = (event) => {
   // todo firebase auth
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={ {
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={ (e) => e.preventDefault() } noValidate sx={ { mt: 1 } }>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={ <Checkbox value="remember" color="primary"/> }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            // disabled={ isValid }
            variant="contained"
            sx={ { mt: 3, mb: 2 } }
            disabled={!isValid()}
            onClick={ handleSubmit }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                { "Don't have an account? Sign Up" }
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={ { mt: 8, mb: 4 } }/>
    </Container>
  )
};
export default SignIn;