import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Head from 'next/head';

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>404</title>
        <meta name="description" content="404 - content not available" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </Head>

      <Box
        sx={{
          width: '80%',
          height: '800',
          backgroundColor: 'primary.main',
          borderRadius: '5px',
          boxShadow: 25,
        }}
        display="flex"
        m="auto"
        mt="2rem"
        mb="3rem"
        p="0.5rem"
        justifyContent="center"
      >
        <Grid container xs={12}>
          <Grid
            container
            item
            xs={12}
            display="flex"
            alignItems="center"
            direction="column"
          >
            <Typography sx={{ fontSize: '70px', mt: '2rem' }} variant="body1">
              OOOPS!
            </Typography>
            <Typography variant="h1">404 - PAGE NOT FOUND!</Typography>
            <Typography variant="body1" component="div" align="center">
              The page you were looking for might have been removed, <br />
              had its name changed or is temporarily unavailable
            </Typography>
            <Link href="/experiences">
              <Button
                sx={{
                  m: '0',
                  mt: '3rem',
                  mb: '3rem',
                }}
                color="secondary"
                variant="contained"
                disableElevation
                aria-label="go back to experiences"
              >
                Go back to experiences!
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
