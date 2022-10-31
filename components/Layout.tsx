import { css } from '@emotion/react';
import Head from 'next/head';
import { User } from '../database/users';
import Footer from './Footer';
import Header from './Header';

type ChildrenProps = {
  children: JSX.Element;
};

type Props = {
  user?: User;
};

const mainStyles = css`
  min-height: calc(100vh - 5rem);
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 5rem;
`;

export default function Layout(props: Props & ChildrenProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header user={props.user} />

      <main css={mainStyles}>{props.children}</main>

      <Footer />
    </>
  );
}
