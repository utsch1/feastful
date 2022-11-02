import { css } from '@emotion/react';
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
        <label>
          E-Mail
          <input
            type="email"
            value={emailLogin}
            onChange={(event) => {
              setEmailLogin(event.currentTarget.value);
            }}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password
          <input
            type="password"
            value={passwordLogin}
            onChange={(event) => {
              setPasswordLogin(event.currentTarget.value);
            }}
            required
          />
        </label>
        <button
          onClick={async () => {
            await loginHandler();
          }}
        >
          Login
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />

      <h1>Register</h1>
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
