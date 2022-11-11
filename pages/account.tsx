import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState } from 'react';
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
      {/* <div>Hi, {props.user.email}</div> */}
      <h1>Your account overview</h1>
      <h3>Your cooking classes</h3>
      <Link href="/addexperience">
        <AddCircleIcon color="primary" />
      </Link>
      <br />
      <br />

      <Grid container>
        <>
          {props.experiences.map((experience) => {
            return (
              <Fragment key={`experience-${experience.id}`}>
                <Grid
                  container
                  item
                  p="0.5rem"
                  mb="0.5rem"
                  sx={{
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: '5px',
                  }}
                >
                  <Grid item xs={7}>
                    <Typography>{experience.headline}</Typography>
                  </Grid>
                  <Grid container item xs={5} justifyContent="flex-end">
                    <Link
                      underline="none"
                      component="button"
                      href={`/editexperience/${experience.id}`}
                    >
                      <Button variant="contained" disableElevation>
                        Update
                      </Button>
                    </Link>
                    <Button
                      sx={{ ml: 1.5 }}
                      variant="contained"
                      disableElevation
                      onClick={async () =>
                        await deleteExperienceFromApiById(experience.id)
                      }
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            );
          })}
        </>
      </Grid>
      <h3>Personal information</h3>
      <Link href="/addpersonalinformation">
        <AddCircleIcon color="primary" />
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
