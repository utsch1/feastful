import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { Experience, getExperiencesByUserId } from '../database/experiences';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
  experiences: Experience[];
};

export default function UserProfile(props: Props) {
  const [newExperiences, setNewExperiences] = useState<Experience[]>([]);

  // Load all experiences into state on first render and every time props.experiences changes
  // useEffect(() => {
  //   setNewExperiences(props.experiences);
  // }, [props.experiences]);

  async function deleteExperienceFromApiById(id: number) {
    const response = await fetch(`/api/user/experiences/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const deletedExperience = (await response.json()) as Experience;

    const filteredExperiences = newExperiences.filter((experience) => {
      return experience.id !== deletedExperience.id;
    });

    setNewExperiences(filteredExperiences);
  }

  console.log(props.experiences);

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
      <Link href="/addexperience">
        <a data-test-id="add-new-experience">+</a>
      </Link>
      <br />
      <br />
      <div>
        {props.experiences.map((experience) => {
          return (
            <Fragment key={`experience-${experience.id}`}>
              <span>
                <span>{experience.headline}</span>
                <Link href={`/editexperience/${experience.id}`}>Update</Link>
                <button
                  onClick={async () =>
                    await deleteExperienceFromApiById(experience.id)
                  }
                >
                  Delete
                </button>
              </span>
              <br />
            </Fragment>
          );
        })}
      </div>
      <h3>Personal information</h3>
      <Link href="/addpersonalinformation">
        <a data-test-id="add-personal-information">+</a>
      </Link>
      <br />
      <br />
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

  return {
    props: { user: user, experiences: experiences },
  };
}
