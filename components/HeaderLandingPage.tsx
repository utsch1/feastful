import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';

export default function HeaderLandingPage() {
  return (
    <AppBar
      position="fixed"
      sx={{
        height: '5rem',
        pl: '3rem',
        pr: '3rem',
        boxShadow: 0,
        background: 'none',
      }}
    >
      <Toolbar disableGutters={true}>
        <Grid container xs={12} alignItems="center" height="5rem">
          <Grid container item xs={4} />
          <Grid container item xs={4} justifyContent="center">
            <Box
              component="img"
              sx={{
                width: 150,
                height: 21,
              }}
              src="/logo.png"
              alt="Feastful"
            />
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <Link href="/experiences" underline="none" color="inherit">
              <ArrowRightAltIcon fontSize="large" />
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
