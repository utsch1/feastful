import Head from 'next/head';

type ChildrenProps = {
  children: JSX.Element;
};

export default function Layout(props: ChildrenProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>{props.children}</main>

      <Footer />
    </>
  );
}
