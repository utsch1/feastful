import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
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
import {
  getPersonalInformation,
  getPersonalInformationByExperienceId,
  PersonalInformation,
  PersonalInformationWithEmail,
} from '../../database/personalInformation';
import {
  getPhotoByExperienceId,
  getPhotos,
  Photo,
} from '../../database/photos';
import { getUser, User } from '../../database/users';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props = { experience: Experience } | { error: string };
type PropsPhoto = {
  photo: Photo;
  cuisine: Cuisines;
  language: Languages;
  postalCode: PostalCodes;
  personalInformation: PersonalInformationWithEmail;
  // emailContact: User;
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

  //change first letter of user first name to uppercase
  // const firstName =
  //   props.personalInformation.firstName.charAt(0).toUpperCase() +
  //   props.personalInformation.firstName.slice(1);

  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Cooking lesson not found</title>
          <meta name="description" content="Cooking lesson not found" />
        </Head>
        <Typography variant="h1">{props.error}</Typography>
        <Typography>
          We are sorry, this cooking lesson is already in the past or has been
          removed. Please explore other cooking lessons
          <Link href="/experiences">here</Link>
        </Typography>
        .
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

      {/* <div key={`experience-${props.experience.id}`}> */}
      <Typography variant="h1">{props.experience.headline}</Typography>
      <Grid container m="0">
        {/* <Grid
          container
          item
          md={12}
          display="flex"
          justifyContent="space-between"
        > */}
        {/* condition whether there is a photo uploaded, otherwise use a colored box */}
        {/* {!props.photo.photoUrl ? (
            <Box sx={{
              width: '100%',
              height: 1,
            }}
            m={0}
            />

          ) : (
            <Box
              // style={pictureStyles}
              component="img"
              sx={{
                width: '100%',
                height: 200,
                borderRadius: '5px',
                objectFit: 'cover',
              }}
              m={0}
              src={props.photo.photoUrl}
              alt="impressions of the cooking lesson"
            />
          )} */}
        {/* </Grid> */}
        <Grid container item md={12}>
          <Grid
            container
            item
            md={12}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ height: 'auto' }}
            mt="1rem"
          >
            <Typography variant="h2">
              Cooking lesson with {props.personalInformation.firstName}
            </Typography>
            <Typography variant="h2" component="body">
              {props.experience.price}€ /person
            </Typography>
          </Grid>
          <Grid
            container
            item
            display="flex"
            spacing={1}
            justifyContent="center"
            mt="1rem"
          >
            <Grid container item xs={6} md={3}>
              <RestaurantIcon color="secondary" sx={{ width: '100%' }} />
              <Typography align="center" sx={{ width: '100%' }}>
                {props.cuisine.cuisine}
              </Typography>
            </Grid>
            <Grid container item xs={6} md={3}>
              <LanguageIcon color="secondary" sx={{ width: '100%' }} />
              <Typography align="center" sx={{ width: '100%' }}>
                {props.language.language}
              </Typography>
            </Grid>
            <Grid container item xs={6} md={3}>
              <HomeIcon color="secondary" sx={{ width: '100%' }} />
              <Typography align="center" sx={{ width: '100%' }}>
                {props.postalCode.postalCode}
              </Typography>
            </Grid>
            <Grid container item xs={6} md={3}>
              <EventIcon color="secondary" sx={{ width: '100%' }} />
              <Typography align="center" sx={{ width: '100%' }}>
                {newEventDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Typography mt="1rem" align="justify">
              {props.experience.description}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '75%', md: '50%' },
              height: 'auto',
              backgroundColor: 'primary.main',
              borderRadius: '5px',
              boxShadow: 25,
            }}
            mt="2rem"
            mb="2rem"
            p="1rem"
          >
            <Grid container justifyContent="center">
              <Grid container item md={12} display="flex" alignItems="center">
                <Box
                  component="img"
                  sx={{
                    height: 70,
                    width: 70,
                    borderRadius: '50%',
                  }}
                  src={props.personalInformation.photoUrl}
                  alt="photo of user"
                />
                <Typography variant="h2" component="h2" ml="1rem">
                  Get to know {props.personalInformation.firstName}
                </Typography>
              </Grid>
              <Typography align="justify" mt="1rem">
                {props.personalInformation.personalInformation}
              </Typography>
              <Link
                href={`mailto:${props.personalInformation.email}`}
                underline="none"
              >
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
              </Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* </div> */}
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
  const photos = await getPhotoByExperienceId(experienceId);
  const cuisines = await getCuisines();
  const languages = await getLanguages();
  const postalCodes = await getPostalCodes();
  const personalInformation = await getPersonalInformationByExperienceId(
    experienceId,
  );
  // const contactInformation = await getUser();

  console.log(photos);

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

  // const photoUrl = photos.find(
  //   (photo) => experience.id === photo.experiencesId,
  // );

  // const personalInformation = personalInformations.find(
  //   (information) => experience.userId === information.userId,
  // );

  // const emailContact = contactInformation.find(
  //   (information) => personalInformations.userId === information.id,
  // );

  return {
    props: {
      experience: experience,
      photo: photos,
      cuisine: cuisine,
      language: language,
      postalCode: postalCode,
      personalInformation: personalInformation,
      // emailContact: emailContact,
    },
  };
}
