import { Box, Button, Grid, Typography } from '@mui/material';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  Cuisines,
  Experience,
  getCuisines,
  getExperienceById,
  getLanguages,
  getPostalCodes,
  Languages,
  PostalCodes,
} from '../../database/experiences';
import { getPhotos, Photo } from '../../database/photos';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

const pictureStyles = {
  objectFit: 'cover',
};

type Props = { experience: Experience } | { error: string };
type PropsPhoto = {
  photo: Photo;
  cuisine: Cuisines;
  language: Languages;
  postalCode: PostalCodes;
};

export default function SingleExperience(props: Props & PropsPhoto) {
  // change 'undefined' date to timestamp to string to a good looking date
  const dateAsTimeStamp = Date.parse(props.experience.eventDate);
  const dateAsString = new Date(dateAsTimeStamp);
  const newEventDate =
    dateAsString.getDate() +
    '/' +
    (dateAsString.getMonth() + 1) +
    '/' +
    dateAsString.getFullYear() +
    ' ' +
    dateAsString.getHours() +
    ':' +
    ('0' + dateAsString.getMinutes()).slice(-2);

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
          <Typography variant="h1">{props.experience.headline}</Typography>
          <Grid container md={12} m="0">
            <Grid
              container
              item
              md={12}
              display="flex"
              justifyContent="space-between"
            >
              <Box
                style={pictureStyles}
                component="img"
                sx={{
                  width: '49%',
                  height: 200,
                  borderRadius: '5px',
                }}
                m={0}
                src={props.photo.photoUrl}
                alt="impressions of the cooking lesson"
              />
              {/* </Grid>
            <Grid container item md={6}> */}
              <Box
                style={pictureStyles}
                component="img"
                sx={{
                  width: '49%',
                  height: 200,
                  borderRadius: '5px',
                }}
                m={0}
                mb="1rem"
                src={props.photo.photoUrl}
                alt="impressions of the cooking lesson"
              />
            </Grid>
            <Grid container item md={6.5}>
              <Grid
                container
                item
                md={12}
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ height: 'auto' }}
              >
                <Typography variant="h2" component="h2" m={0} mt="0.5rem">
                  Cooking lesson with Ute
                </Typography>
                <Typography mb="1rem" mt="0.5rem">
                  {props.experience.price}€ /person
                </Typography>
              </Grid>
              <Grid
                container
                item
                md={12}
                display="flex"
                justifyContent="space-between"
              >
                <Grid container item md={6} direction="column">
                  <Typography>
                    Cuisine:
                    {props.cuisine.cuisine}
                  </Typography>
                  <Typography>
                    Language:
                    {props.language.language}
                  </Typography>
                </Grid>
                <Grid container item md={6} direction="column">
                  <Typography>
                    Postal Code:
                    {props.postalCode.postalCode}
                  </Typography>
                  <Typography>
                    Event Date:
                    {newEventDate}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                md={12}
                display="flex"
                alignItems="flex-start"
                sx={{ minHeight: '150px' }}
              >
                <Typography mt="1rem" mb="1rem" align="justify">
                  {props.experience.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={0.5} />

            <Grid container item md={5} justifyContent="center">
              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  backgroundColor: 'primary.main',
                  borderRadius: '5px',
                  boxShadow: 25,
                }}
                display="flex"
                mt="0.5rem"
                mb="1rem"
                p="0.5rem"
                justifyContent="center"
              >
                <Grid
                  container
                  item
                  md={12}
                  pl="0.5rem"
                  pr="0.5rem"
                  direction="column"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h2"
                    component="h2"
                    mt="0.5rem"
                    mb="3rem"
                    align="center"
                  >
                    Get to know Ute
                    <Box
                      component="img"
                      sx={{
                        height: 70,
                        width: 70,
                        borderRadius: '50%',
                      }}
                      src="/Ute.JPG"
                      alt="photo of user"
                      position="absolute"
                      right="80px"
                    />
                  </Typography>
                  <Typography align="justify">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.
                  </Typography>
                  <Button
                    sx={{
                      m: 'auto',
                      mt: '1rem',
                      mb: '1rem',
                    }}
                    color="secondary"
                    variant="contained"
                    disableElevation
                    aria-label="button for contacting via email"
                  >
                    Contact
                  </Button>
                </Grid>
                {/* <Grid
                  container
                  item
                  md={3}
                  display="flex"
                  justifyContent="center"
                >

                </Grid> */}
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
  const cuisines = await getCuisines();
  const languages = await getLanguages();
  const postalCodes = await getPostalCodes();

  const experience = JSON.parse(JSON.stringify(oldExperience));

  if (typeof experience === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Cooking lesson not found',
      },
    };
  }

  const cuisine = cuisines.find(
    (cuisine) => experience.cuisineId === cuisine.id,
  );

  const language = languages.find(
    (language) => experience.languagesId === language.id,
  );

  const postalCode = postalCodes.find(
    (postalCode) => experience.postalCodeId === postalCode.id,
  );

  const photoUrl = photos.find(
    (photo) => experience.id === photo.experiencesId,
  );

  return {
    props: {
      experience: experience,
      photo: photoUrl,
      cuisine: cuisine,
      language: language,
      postalCode: postalCode,
    },
  };
}
