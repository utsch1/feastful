import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';
import Head from 'next/head';

const StyledButton = styled(Button)`
  background-color: #e7dcda;
  border-radius: 3px;
  border: 0;
  color: black;
  height: 40px;
  z-index: '1';
  float: 'center';
  &:hover {
    background: #e7dcda;
    color: black;
  }
`;

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
        ml="-3rem"
        mr="-3rem"
      >
        <CardMedia
          component="img"
          image="/backgroundImage.jpg"
          alt="plate with food in a decorative way"
          height="100%"
          width="100%"
          sx={{ opacity: '0.7' }}
        />
        <Box
          component="img"
          sx={{
            width: 150,
            height: 21,
            zIndex: 1,
            position: 'absolute',
            top: '5%',
            m: 'auto',
          }}
          src="/logo.png"
          alt="Feastful"
        />
        <Box
          width="100%"
          position="absolute"
          top="50%"
          sx={{ background: 'primary.main' }}
        >
          <Typography
            sx={{ fontSize: '2.5rem', fontWeight: '700' }}
            lineHeight="none"
            align="center"
          >
            DISCOVER YOUR INNER FOODIE.
          </Typography>
        </Box>
        <Link href="/experiences" underline="none">
          <StyledButton
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
            }}
          >
            <ArrowRightAltIcon />
          </StyledButton>
        </Link>
      </Box>
    </>
  );
}
