import { Box, Grid, Typography } from '@mui/material';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Experience, getExperienceById } from '../../database/experiences';
import { getPhotos, Photo } from '../../database/photos';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

const pictureStyles = {
  width: '48.5%',
  objectFit: 'cover',
};

type Props = { experience: Experience } | { error: string };
type PropsPhoto = { photo: Photo };

export default function SingleExperience(props: Props & PropsPhoto) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Cooking lesson not found</title>
          <meta name="description" content="Cooking lesson not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, this cooking lesson is already in the past. Please explore other
        cooking lessons <Link href="/experiences">here</Link>.
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.experience.headline}</title>
        <meta
          name="description"
          content={`This is the ${props.experience.headline}'s form`}
        />
      </Head>

      <div>
        <div key={`experience-${props.experience.id}`}>
          <h1>{props.experience.headline}</h1>
          <Box
            style={pictureStyles}
            component="img"
            sx={{
              width: 250,
              height: 300,
              borderRadius: '5px',
            }}
            m={0}
            mr="2rem"
            src={props.photo.photoUrl}
            alt="impressions of the cooking lesson"
          />
          <Box
            style={pictureStyles}
            component="img"
            sx={{
              width: 250,
              height: 300,
              borderRadius: '5px',
            }}
            m={0}
            src={props.photo.photoUrl}
            alt="impressions of the cooking lesson"
          />
          <Grid container spacing={4}>
            <Grid item xs={7}>
              <Typography variant="h2" component="h2" m={0} mt="0.5rem">
                Cooking lesson with Ute
              </Typography>
              <Typography mb="1rem" mt="0.5rem">
                {props.experience.price}€/person
              </Typography>
              <Typography mb="1rem">{props.experience.description}</Typography>
              {/* <p>{props.experience.cuisineId}</p> */}
              {/* <p>{props.experience.eventDate}</p> */}
            </Grid>
            <Grid container item xs={5} justifyContent="center">
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundColor: 'primary.main',
                  borderRadius: '5px',
                }}
                display="flex"
                p="0.5rem"
                justifyContent="center"
              >
                <Typography variant="h2" component="h2" m={0} mt="0.5rem">
                  Get to know Ute
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const experienceId = parseIntFromContextQuery(context.query.experienceId);

  if (typeof experienceId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Cooking lesson not found',
      },
    };
  }

  const oldExperience = await getExperienceById(experienceId);
  const photos = await getPhotos();

  const experience = JSON.parse(JSON.stringify(oldExperience));

  if (typeof experience === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Cooking lesson not found',
      },
    };
  }

  const photoUrl = photos.find(
    (photo) => experience.id === photo.experiencesId,
  );

  return {
    props: { experience: experience, photo: photoUrl },
  };
}
