import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../database/users';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/user');
    const profileResponseBody = await profileResponse.json();

    if ('errors' in profileResponseBody) {
      setUser(undefined);
    } else {
      setUser(profileResponseBody.user);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          @font-face {
            font-family: 'Lato-Regular';
            src: url('../fonts/Lato/Lato-Regular.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Lato-Italic';
            src: url('../fonts/Lato/Lato-Italic.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Lato-Bold';
            src: url('../fonts/Lato/Lato-Bold.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Lato-BoldItalic';
            src: url('../fonts/Lato/Lato-BoldItalic.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Lato-Thin';
            src: url('../fonts/Lato/Lato-Thin.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Lato-ThinItalic';
            src: url('../fonts/Lato/Lato-ThinItalic.ttf') format('truetype');
          }

          body {
            height: 100vh;
            background-color: #ffffff;
            font-family: 'Lato-Regular', sans-serif;
            font-size: 14px;
            margin: 0;
          }

          h1 {
            font-size: 2rem;
            margin: 0.75rem 0 0 0;
            font-family: 'Lato-Bold', sans-serif;
            color: #000000;
          }

          h2 {
            font-size: 1.25rem;
            margin: 1.5rem 0 0 0;
            font-family: 'Lato-Italic', sans-serif;
            color: #3a4337;
          }
          label {
            font-family: 'Lato-Bold', sans-serif;
          }

          label > span {
            font-family: 'Lato-Light', sans-serif;
            float: right;
            margin-bottom: 0.3rem;
          }

          input {
            display: block;
            width: 100%;
            border: 0.5px solid #000000;
            border-radius: 5px;
          }

          textarea {
            width: 100%;
            border: 0.5px solid #000000;
            border-radius: 5px;
          }

          select {
            width: 100%;
          }
        `}
      />
      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

export default MyApp;
