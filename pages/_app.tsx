import '../styles/globals.css';
import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
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
            font-family: 'Lato';
            src: url('../asset/Lato/Lato-Black.ttf');
            src: url('../asset/Lato/Lato-BlackItalic.ttf');
            src: url('../asset/Lato/Lato-Bold.ttf');
            src: url('../asset/Lato/Lato-BoldItalic.ttf');
            src: url('../asset/Lato/Lato-Italic.ttf');
            src: url('../asset/Lato/Lato-Light.ttf');
            src: url('../asset/Lato/Lato-LightItalic.ttf');
            src: url('../asset/Lato/Lato-Regular.ttf');
            src: url('../asset/Lato/Lato-Thin.ttf');
            src: url('../asset/Lato/Lato-ThinItalic.ttf');
          }

          body {
            margin: 0 48px 0 48px;
            height: 100vh;
            background-color: #ffffff;
            font-size: 16px;
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}

export default MyApp;
