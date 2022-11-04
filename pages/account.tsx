import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Experience, getExperiencesByUserId } from '../database/experiences';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
  experiences: Experience[];
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Personal Information</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h2>Hi, {props.user.email}</h2>
      <h1>Your account overview</h1>
      <h3>Your cooking classes</h3>
      <div>
        {props.experiences.map((experience) => {
          return (
            <div key={`experience-${experience.userId}`}>
              <span>
                <p>{experience.headline}</p>
                <button>Update</button>
                <button>Delete</button>
              </span>
            </div>
          );
        })}
      </div>
      <h3>Personal information</h3>
      <p>
        {props.user.id} {props.user.email}
      </p>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));
  const experiences = user && (await getExperiencesByUserId(user.id));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/account',
        permanent: false,
      },
    };
  }
  console.log(experiences);

  return {
    props: { user: user, experiences: experiences },
  };
}
