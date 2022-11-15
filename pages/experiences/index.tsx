import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { Experience, getExperiences } from '../../database/experiences';
import { getPhotos, Photo } from '../../database/photos';

type Props = {
  experiences: Experience[];
  photos: Photo[];
};

// const pictureStyles = {
//   objectFit: 'cover',
// };

export default function Experiences(props: Props) {
  return (
    <div>
      <Head>
        <title>Experiences</title>
        <meta name="description" content="Find your cooking experiences" />
      </Head>

      {/* Filterbar for full width */}
      <Box
        sx={{
          width: '80%',
          height: '80px',
          backgroundColor: 'secondary.main',
          borderRadius: '5px',
          boxShadow: 26,
          display: { xs: 'none', md: 'block' },
        }}
        m="auto"
        mt="1rem"
        pl="1rem"
        pr="1rem"
      >
        <Grid
          container
          md={12}
          columnSpacing={1}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid
            container
            item
            md={3.5}
            display="flex"
            justifyContent="space-around"
          >
            <TextField
              select
              size="small"
              color="info"
              margin="none"
              id="filter-cuisine"
              label="Cuisine"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#FFF',
                },
                width: '90%',
              }}
            >
              <MenuItem>Test</MenuItem>
            </TextField>
          </Grid>
          <Grid
            container
            item
            md={3.5}
            display="flex"
            justifyContent="space-around"
          >
            <TextField
              select
              size="small"
              color="info"
              margin="none"
              id="filter-language"
              label="Language"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#FFF',
                },
                width: '90%',
              }}
            >
              <MenuItem>Test</MenuItem>
            </TextField>
          </Grid>
          <Grid
            container
            item
            md={3.5}
            display="flex"
            justifyContent="space-around"
          >
            <TextField
              select
              size="small"
              color="info"
              margin="none"
              id="filter-postal-code"
              label="Postal Code"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#FFF',
                },
                width: '90%',
              }}
            >
              <MenuItem>Test</MenuItem>
            </TextField>
          </Grid>
          <Grid
            container
            item
            md={1.5}
            display="flex"
            justifyContent="space-around"
          >
            <Button
              sx={{
                mt: '1.5rem',
                mb: '1.5rem',
                pl: '1rem',
                pr: '1rem',
              }}
              variant="contained"
              disableElevation
              color="primary"
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Filterbar for all other devices width */}
      <Box
        sx={{
          width: 'calc(100%+6rem)',
          height: 'auto',
          backgroundColor: 'secondary.main',

          display: { xs: 'block', sm: 'block', md: 'none' },
        }}
        ml="-3rem"
        mr="-3rem"
        p="1rem"
      >
        <Grid
          container
          xs={12}
          sm={12}
          spacing={1}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid
            container
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="space-around"
            alignItems="flex-end"
          >
            <TextField
              select
              size="small"
              color="info"
              margin="none"
              id="filter-cuisine"
              label="Cuisine"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#FFF',
                },
                width: '90%',
              }}
            >
              <MenuItem>Test</MenuItem>
            </TextField>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="space-around"
          >
            <TextField
              select
              size="small"
              color="info"
              margin="none"
              id="filter-language"
              label="Language"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#FFF',
                },
                width: '90%',
              }}
            >
              <MenuItem>Test</MenuItem>
            </TextField>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="space-around"
          >
            <TextField
              select
              size="small"
              color="info"
              margin="none"
              id="filter-postal-code"
              label="Postal Code"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#FFF',
                },
                width: '90%',
              }}
            >
              <MenuItem>Test</MenuItem>
            </TextField>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={5}
            display="flex"
            justifyContent="space-around"
          >
            <Button
              sx={{
                mt: '0.5rem',
                pl: '1rem',
                pr: '1rem',
              }}
              variant="contained"
              disableElevation
              color="primary"
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h1" component="h1">
        Explore cooking lessons
      </Typography>

      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        spacing={{ xs: 0, sm: 2, md: 2 }}
        display="flex"
        m="0"
        justifyContent={{ xs: 'space-around', md: 'flex-start' }}
      >
        <>
          {props.experiences.map((experiences) => {
            return (
              <Grid
                container
                item
                xs={8}
                sm={4}
                md={3}
                key={`experience-${experiences.id}`}
                direction="column"
              >
                <Link
                  color="inherit"
                  underline="none"
                  href={`/experiences/${experiences.id}`}
                >
                  {/* condition whether there is a photo uploaded, otherwise use a colored box */}
                  {!experiences.photo ? (
                    <>
                      <Box
                        component="img"
                        sx={{
                          width: '100%',
                          borderRadius: '5px',
                          backgroundColor: 'primary.main',
                          // display: { xs: 'none', sm: 'block' },
                        }}
                        m={0}
                        src="/no-photo-available.png"
                        alt="no photo available"
                      />
                      {/* <Box
                        style={pictureStyles}
                        sx={{
                          width: 300,
                          height: 150,
                          borderRadius: '5px',
                          backgroundColor: 'primary.main',
                          display: { xs: 'block', sm: 'none' },
                        }}
                        m={0}
                      /> */}
                    </>
                  ) : (
                    <>
                      <Box
                        component="img"
                        sx={{
                          width: '100%',
                          borderRadius: '5px',
                          // display: { xs: 'none', sm: 'block' },
                        }}
                        m={0}
                        src={experiences.photo}
                        alt="impressions of the cooking lesson"
                      />
                      {/* <Box
                        style={pictureStyles}
                        component="img"
                        sx={{
                          width: 300,
                          height: 150,
                          borderRadius: '5px',
                          display: { xs: 'block', sm: 'none' },
                        }}
                        m={0}
                        src={experiences.photo}
                        alt="impressions of the cooking lesson"
                      /> */}
                    </>
                  )}
                  <Typography variant="h2" mt="0.5rem" noWrap>
                    {experiences.headline}
                  </Typography>

                  <Typography mb="1.5rem">
                    {experiences.price}€/person
                  </Typography>
                </Link>
              </Grid>
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
