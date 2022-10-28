import Head from 'next/head';
import { useState } from 'react';
import { RegisterResponseBody } from './api/register';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // async function loginHandler() {
  //   const loginResponse = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });
  //   const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;
  // }

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    console.log(registerResponseBody);
  }

  return (
    <div>
      <Head>
        <title>Login / Register</title>
        <meta name="description" content="Login or registration" />
      </Head>

      <h1>Login</h1>

      {/* <label>
        E-Mail
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
          required
        />
      </label> */}
      {/* <br />
      <br />
      <label>
        Password
        <input
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
      </button> */}

      {/* <h1>Register</h1>
      <label>
        E-Mail
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <br />
      <label>
        Password
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </label>
      <button
        onClick={async () => {
          await registerHandler();
        }}
      >
        Register
      </button> */}
    </div>
  );
}
