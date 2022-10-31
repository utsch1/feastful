import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { LoginResponseBody } from './api/login';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      // POST to create a new session
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      console.log(loginResponseBody.errors);
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
        <meta name="description" content="Login or registration" />
      </Head>

      <h1>Login</h1>
      {errors.map((error) => {
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

      <label>
        E-Mail
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
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
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
          required
        />
      </label>
      <button
        onClick={() => {
          loginHandler();
        }}
      >
        Login
      </button>
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
