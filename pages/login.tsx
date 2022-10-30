import Head from 'next/head';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  }

  return (
    <div>
      <Head>
        <title>Login / Register</title>
        <meta name="description" content="Login or registration" />
      </Head>

      <h1>Login</h1>

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
