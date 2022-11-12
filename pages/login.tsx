import { css } from '@emotion/react';
import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
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
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/account`);
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
        mt="1rem"
        p="0.5rem"
        justifyContent="center"
      >
        <Grid container item direction="row">
          <Grid container item direction="column" alignItems="center" xs={6}>
            <h1>Login</h1>
            {errorsLogin.map((error) => {
              return (
                <p
                  css={css`
                    background-color: red;
                    color: white;
                    padding: 5px;
                  `}
                  key={error.message}
                >
                  ERROR: {error.message}
                </p>
              );
            })}
            <form>
              <InputLabel htmlFor="login-email">E-mail*</InputLabel>
              <TextField
                fullWidth
                type="email"
                id="login-email"
                variant="outlined"
                margin="none"
                size="small"
                value={emailLogin}
                onChange={(event) => {
                  setEmailLogin(event.currentTarget.value);
                }}
                required
              />
              <InputLabel sx={{ mt: '1rem' }} htmlFor="login-password">
                Password*
              </InputLabel>
              <TextField
                fullWidth
                type="password"
                id="login-password"
                variant="outlined"
                margin="none"
                size="small"
                value={passwordLogin}
                onChange={(event) => {
                  setPasswordLogin(event.currentTarget.value);
                }}
                required
              />
              <Button
                sx={{ mt: 1.5 }}
                style={{ color: 'secondary' }}
                variant="contained"
                disableElevation
                onClick={async () => {
                  await loginHandler();
                }}
              >
                Login
              </Button>
            </form>
          </Grid>
          <Grid container item direction="column" alignItems="center" xs={6}>
            <h1 css={{ marginBottom: '12px' }}>New Account</h1>
            <Typography align="center">
              Do you want to offer cooking lessons? <br />
              Sign up here to create your experiences:
            </Typography>
            {errorsRegistration.map((error) => {
              return (
                <p
                  css={css`
                    background-color: red;
                    color: white;
                    padding: 5px;
                  `}
                  key={error.message}
                >
                  ERROR: {error.message}
                </p>
              );
            })}
            <form>
              <label>
                E-Mail
                <input
                  value={emailRegistration}
                  onChange={(event) => {
                    setEmailRegistration(event.currentTarget.value);
                  }}
                />
              </label>
              <br />
              <br />
              <label>
                Password
                <input
                  type="password"
                  value={passwordRegistration}
                  onChange={(event) => {
                    setPasswordRegistration(event.currentTarget.value);
                  }}
                />
              </label>
              <button
                onClick={async () => {
                  await registerHandler();
                }}
              >
                Register
              </button>
            </form>
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
