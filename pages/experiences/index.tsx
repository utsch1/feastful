import { Box, Grid, Link, Typography } from '@mui/material';
import Head from 'next/head';
import { Experience, getExperiences } from '../../database/experiences';
import { getPhotos, Photo } from '../../database/photos';

type Props = {
  experiences: Experience[];
  photos: Photo[];
};

export default function Experiences(props: Props) {
  return (
    <div>
      <Head>
        <title>Experiences</title>
        <meta name="description" content="Find your cooking experiences" />
      </Head>

      <div>
        <h1>Explore cooking lessons</h1>
      </div>

      <Grid container>
        <>
          {props.experiences.map((experiences) => {
            return (
              <div key={`experience-${experiences.id}`}>
                <Grid item>
                  <Box
                    component="img"
                    sx={{
                      width: 250,
                      height: 250,
                      borderRadius: '5px',
                    }}
                    m={0}
                    mr="2.8rem"
                    src={experiences.photo}
                    alt="impressions of the cooking lesson"
                  />
                  <Link
                    color="inherit"
                    underline="none"
                    href={`/experiences/${experiences.id}`}
                  >
                    <Typography variant="h2" component="h2" m={0}>
                      {experiences.headline}
                    </Typography>
                  </Link>
                  <Typography>{experiences.price}€/person</Typography>
                </Grid>
              </div>
            );
          })}
        </>
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  const oldExperiences = await getExperiences();
  const photos = await getPhotos();

  // const photos = await getPhotoUrlByExperienceId(experiences.id);

  // https://flaviocopes.com/nextjs-serialize-date-json/
  // in order to be able to use dates in frontend
  const experiences = JSON.parse(JSON.stringify(oldExperiences));

  const allExperiences = experiences.map((experience) => {
    const photoUrl = photos.find(
      (photo) => experience.id === photo.experiencesId,
    );
    return {
      id: experience.id,
      headline: experience.headline,
      price: experience.price,
      cuisineId: experience.cuisineId,
      languagesId: experience.languagesId,
      postalCodeId: experience.postalCodeId,
      eventDate: experience.eventDate,
      photo: photoUrl.photoUrl,
    };
  });

  return {
    props: { experiences: allExperiences },
  };
}
