import { Person } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { LoginResponseBody } from './api/login';
import { RegisterResponseBody } from './api/register';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [emailLogin, setEmailLogin] = useState('');
  const [emailRegistration, setEmailRegistration] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [passwordRegistration, setPasswordRegistration] = useState('');
  const [errorsLogin, setErrorsLogin] = useState<{ message: string }[]>([]);
  const [errorsRegistration, setErrorsRegistration] = useState<
    { message: string }[]
  >([]);
  const router = useRouter();

  // registration handler
  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRegistration,
        password: passwordRegistration,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrorsRegistration(registerResponseBody.errors);
      console.log(registerResponseBody.errors);
    }
    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) &&
      // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/addpersonalinformation`);
  }

  // login handler
  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      // POST to create a new session
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: emailLogin,
        password: passwordLogin,
      }),
    });
    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrorsLogin(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/account`);
  }

  return (
    <div>
      <Head>
        <title>Login / Register</title>
        <meta name="description" content="Login or register" />
      </Head>

      <Box
        sx={{
          width: '80%',
          height: '800',
          backgroundColor: 'primary.main',
          borderRadius: '5px',
          boxShadow: 25,
        }}
        display="flex"
        m="auto"
        mt="2rem"
        mb="3rem"
        p="0.5rem"
        justifyContent="center"
      >
        <Grid container item direction="row">
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            xs={12}
            md={5.9}
          >
            <Typography variant="h1">Login</Typography>
            <FormGroup>
              <InputLabel
                htmlFor="login-email"
                sx={{ sm: { mt: '2rem' }, xs: { mt: '1rem' }, color: '#000' }}
              >
                E-mail*
              </InputLabel>
              <Paper elevation={0}>
                <TextField
                  fullWidth
                  type="email"
                  id="login-email"
                  variant="outlined"
                  color="secondary"
                  margin="none"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                  value={emailLogin}
                  onChange={(event) => {
                    setEmailLogin(event.currentTarget.value);
                  }}
                  required
                />
              </Paper>
              <InputLabel
                sx={{ mt: '1rem', color: '#000' }}
                htmlFor="login-password"
              >
                Password*
              </InputLabel>
              <Paper elevation={0}>
                <TextField
                  fullWidth
                  type="password"
                  id="login-password"
                  variant="outlined"
                  margin="none"
                  color="secondary"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                  value={passwordLogin}
                  onChange={(event) => {
                    setPasswordLogin(event.currentTarget.value);
                  }}
                  required
                />
              </Paper>
              <Button
                sx={{ m: 'auto', mt: '2rem', mb: '2rem', width: '50%' }}
                color="secondary"
                variant="contained"
                disableElevation
                onClick={async () => {
                  await loginHandler();
                }}
              >
                Login
              </Button>
            </FormGroup>
            {errorsLogin.map((error) => {
              return (
                <Typography color="error" key={error.message}>
                  ERROR: {error.message}
                </Typography>
              );
            })}
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            color="#000"
            variant="middle"
            sx={{
              width: '2px',
              display: { xs: 'none', md: 'block' },
            }}
          />
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            xs={12}
            md={6}
          >
            <Divider
              orientation="horizontal"
              flexItem
              color="#000"
              variant="middle"
              sx={{
                height: '2px',
                display: { xs: 'block', md: 'none' },
              }}
            />
            <Typography variant="h1">New Account</Typography>
            <Typography align="center">
              Do you want to offer cooking lessons? <br />
              Sign up here to create your experiences:
            </Typography>
            <FormGroup>
              <InputLabel
                sx={{ mt: '2rem', color: '#000' }}
                htmlFor="registration-email"
              >
                E-mail*
              </InputLabel>
              <Paper elevation={0}>
                <TextField
                  fullWidth
                  type="email"
                  id="registration-email"
                  variant="outlined"
                  margin="none"
                  color="secondary"
                  size="small"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                  value={emailRegistration}
                  onChange={(event) => {
                    setEmailRegistration(event.currentTarget.value);
                  }}
                />
              </Paper>

              <InputLabel
                sx={{ mt: '1rem', color: '#000' }}
                htmlFor="registration-password"
              >
                Password*
              </InputLabel>
              <Paper elevation={0}>
                <TextField
                  fullWidth
                  type="password"
                  id="registration-password"
                  variant="outlined"
                  margin="none"
                  color="secondary"
                  size="small"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                  value={passwordRegistration}
                  onChange={(event) => {
                    setPasswordRegistration(event.currentTarget.value);
                  }}
                />
              </Paper>
              <Button
                sx={{ m: 'auto', mt: '2rem', mb: '2rem', width: '50%' }}
                color="secondary"
                variant="contained"
                disableElevation
                onClick={async () => {
                  await registerHandler();
                }}
              >
                Register
              </Button>
            </FormGroup>
            {errorsRegistration.map((error) => {
              return (
                <Typography color="error" key={error.message}>
                  ERROR: {error.message}
                </Typography>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

// to not be able to log in twice
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
