import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserByEmail, User } from '../../database/users';

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>404 - User not found</title>
          <meta name="description" content="Animal not found" />
        </Head>
        <h1>404 - User not found</h1>
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="User account" />
      </Head>

      <h1>{props.user.email}</h1>
      <p>
        {props.user.id} {props.user.email}
      </p>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the username from the URL
  const usermail = context.query.usermail as string;

  const user = await getUserByEmail(usermail);

  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  }

  return {
    props: { user },
  };
}
