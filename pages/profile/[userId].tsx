import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { getUserById, User } from '../../database/users';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

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

      <h1>Welcome back!</h1>
      <p>
        {props.user.id} {props.user.email}
      </p>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieve the user ID from the URL
  const userId = parseIntFromContextQuery(context.query.userId);

  if (typeof userId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  const foundUser = await getUserById(userId);

  if (typeof foundUser === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  return {
    props: {
      user: foundUser,
    },
  };
}
