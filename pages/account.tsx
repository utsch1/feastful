import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Experience, getExperiencesByUserId } from '../database/experiences';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user: User;
  experiences: Experience[];
};

export default function UserProfile(props: Props) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const router = useRouter();

  // Load all experiences into state on first render and every time props.experiences changes
  useEffect(() => {
    setExperiences(props.experiences);
  }, [props.experiences]);

  // delete user from api
  async function deleteUserFromApiById(id: number) {
    if (!window.confirm(`Do you really want to delete this user?`)) {
      return;
    }
    await fetch(`/api/user/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    // redirect user to homepage
    await router.push(`/`);
  }

  // delete single experience from api
  async function deleteExperienceFromApiById(id: number) {
    const response = await fetch(`/api/user/experiences/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const deletedExperience = (await response.json()) as Experience;

    const filteredExperiences = experiences.filter((experience) => {
      return experience.id !== deletedExperience.id;
    });

    setExperiences(filteredExperiences);
  }

  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Account" />
      </Head>
      <Typography variant="h1">Your account overview</Typography>
      <Grid container>
        <Grid container item xs={10} mb="0.5rem">
          <Typography variant="h2" component="h3">
            Your cooking classes
          </Typography>
        </Grid>
        <Grid container item xs={2} justifyContent="flex-end">
          <Link href="/addexperience">
            <AddCircleIcon color="secondary" />
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <>
          {experiences.map((experience) => {
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
                  <Grid item xs={12} sm={7} display="flex" alignItems="center">
                    <Typography>{experience.headline}</Typography>
                  </Grid>
                  <Grid container item xs={12} sm={5} justifyContent="flex-end">
                    <Link href={`/editexperience/${experience.id}`}>
                      <Button
                        variant="contained"
                        disableElevation
                        aria-label="edit cooking class"
                      >
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      sx={{ ml: 1.5 }}
                      variant="contained"
                      disableElevation
                      aria-label="delete cooking class"
                      onClick={async () =>
                        await deleteExperienceFromApiById(experience.id)
                      }
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            );
          })}
        </>
      </Grid>
      <Grid container item xs={10} mb="0.5rem" mt="1rem">
        <Typography variant="h2" component="h3">
          Personal information
        </Typography>
      </Grid>
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
        <Grid item xs={7} display="flex" alignItems="center">
          <Typography variant="body1">Let people get to know you</Typography>
        </Grid>
        <Grid container item xs={5} justifyContent="flex-end">
          <Link
            // underline="none"
            // component="button"
            href="/editpersonalinformation"
          >
            <Button
              variant="contained"
              disableElevation
              aria-label="edit personal information"
            >
              <EditIcon />
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Button
        sx={{
          mt: '1.5rem',
          mb: '2rem',
          float: 'right',
        }}
        color="secondary"
        variant="contained"
        disableElevation
        aria-label="delete account"
        onClick={async () => await deleteUserFromApiById(props.user.id)}
      >
        Delete account
      </Button>
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
