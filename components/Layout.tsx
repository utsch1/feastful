import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { User } from '../database/users';
import Footer from './Footer';
import Header from './Header';
import HeaderLandingPage from './HeaderLandingPage';

type ChildrenProps = {
  children: JSX.Element;
};

type Props = {
  user?: User;
};

const mainStyles = css`
  min-height: calc(100vh - 3rem);
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 5rem;

  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default function Layout(props: Props & ChildrenProps) {
  // Constants for two different nav bars
  const router = useRouter();
  const showHeaderAndFooter = router.pathname === '/' ? false : true;
  const headerLandingPage = router.pathname === '/' ? true : false;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showHeaderAndFooter && <Header user={props.user} />}
      {headerLandingPage && <HeaderLandingPage />}

      <main css={mainStyles}>{props.children}</main>

      {showHeaderAndFooter && <Footer />}
    </>
  );
}
