import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import { useState } from 'react';
import {
  Cuisines,
  Experience,
  getCuisines,
  getExperiences,
  getLanguages,
  getPostalCodes,
  Languages,
  PostalCodes,
} from '../../database/experiences';
import { getPhotos } from '../../database/photos';

type Props = {
  experiences: Experience[];
  postalCodes: PostalCodes[];
  languages: Languages[];
  cuisines: Cuisines[];
};

export default function Experiences(props: Props) {
  const [cuisine, setCuisine] = useState();
  const [language, setLanguage] = useState();
  const [postalCode, setPostalCode] = useState();
  const [cuisineFilter, setCuisineFilter] = useState<number>();
  const [languageFilter, setLanguageFilter] = useState<number>();
  const [postalCodeFilter, setPostalCodeFilter] = useState<number>();

  const handleChangeCuisine = (event: SelectChangeEvent) => {
    setCuisine(event.target.value as string);
  };

  const handleChangePostalCode = (event: SelectChangeEvent) => {
    setPostalCode(event.target.value as string);
  };

  const handleChangeLanguages = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

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
              value={cuisine ? cuisine : ''}
              defaultValue={cuisine}
              onChange={handleChangeCuisine}
            >
              {props.cuisines.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.cuisine}
                </MenuItem>
              ))}
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
              value={language ? language : ''}
              defaultValue={language}
              onChange={handleChangeLanguages}
            >
              {props.languages.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.language}
                </MenuItem>
              ))}
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
              value={postalCode ? postalCode : ''}
              defaultValue={postalCode}
              onChange={handleChangePostalCode}
            >
              {props.postalCodes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.postalCode}
                </MenuItem>
              ))}
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
              onClick={() => {
                setCuisineFilter(cuisine);
                setLanguageFilter(language);
                setPostalCodeFilter(postalCode);
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Filterbar for all other devices width */}
      <Box
        sx={{
          width: 'calc(100%+2rem)',
          height: 'auto',
          backgroundColor: 'secondary.main',

          display: { xs: 'block', sm: 'block', md: 'none' },
        }}
        ml="-1rem"
        mr="-1rem"
        p="1rem"
      >
        <Grid
          container
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
              value={cuisine ? cuisine : ''}
              defaultValue={cuisine}
              onChange={handleChangeCuisine}
            >
              {props.cuisines.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.cuisine}
                </MenuItem>
              ))}
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
              value={language ? language : ''}
              defaultValue={language}
              onChange={handleChangeLanguages}
            >
              {props.languages.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.language}
                </MenuItem>
              ))}
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
              value={postalCode ? postalCode : ''}
              defaultValue={postalCode}
              onChange={handleChangePostalCode}
            >
              {props.postalCodes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.postalCode}
                </MenuItem>
              ))}
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
              onClick={() => {
                setCuisineFilter(cuisine);
                setLanguageFilter(language);
                setPostalCodeFilter(postalCode);
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h1">Explore cooking lessons</Typography>

      <Grid
        container
        spacing={{ xs: 0, sm: 2, md: 2 }}
        display="flex"
        m="0"
        justifyContent={{ xs: 'space-around', md: 'flex-start' }}
      >
        {/* filter function for the experiences */}
        {props.experiences
          .filter((experiences) => {
            // set filter to true first
            let filter = true;

            // check first whether there is a filter set, then compare the id's --> for each filter
            if (cuisineFilter && experiences.cuisineId !== cuisineFilter) {
              filter = false;
            }

            if (languageFilter && experiences.languagesId !== languageFilter) {
              filter = false;
            }

            if (
              postalCodeFilter &&
              experiences.postalCodeId !== postalCodeFilter
            ) {
              filter = false;
            }

            return filter;
          })
          // map through all experiences / filtered experiences
          .map((experiences) => {
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
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        borderRadius: '5px',
                        backgroundColor: 'primary.main',
                        boxShadow: 2,
                      }}
                      m={0}
                      src="/no-photo-available.png"
                      alt="no photo available"
                    />
                  ) : (
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        borderRadius: '5px',
                        boxShadow: 2,
                      }}
                      m={0}
                      src={experiences.photo}
                      alt="impressions of the cooking lesson"
                    />
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
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  const oldExperiences = await getExperiences();
  const photos = await getPhotos();
  const cuisines = await getCuisines();
  const postalCodes = await getPostalCodes();
  const languages = await getLanguages();

  // https://flaviocopes.com/nextjs-serialize-date-json/
  // in order to be able to use dates in frontend
  const experiences = JSON.parse(JSON.stringify(oldExperiences));

  const allExperiences = experiences.map((experience) => {
    const photoUrl = photos?.find(
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
    props: {
      experiences: allExperiences,
      cuisines: cuisines,
      postalCodes: postalCodes,
      languages: languages,
    },
  };
}
