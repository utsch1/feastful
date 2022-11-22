import { CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Head from 'next/head';
import { getCuisines } from '../database/experiences';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home of feastful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        height="100vh"
        width="100vw"
        mt="-5rem"
        mb="-5rem"
        ml="-1rem"
        mr="-1rem"
      >
        <CardMedia
          component="img"
          image="/backgroundImage.jpg"
          alt="plate with food in a decorative way"
          height="100%"
          width="100%"
          sx={{ opacity: '0.6' }}
        />
        <Box
          width="100%"
          position="absolute"
          top="50%"
          sx={{ background: 'primary.main' }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: '700',
            }}
            lineHeight="none"
            align="center"
          >
            DISCOVER YOUR INNER FOODIE
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const cuisines = await getCuisines();

  return {
    props: {
      cuisines: cuisines,
    },
  };
}
