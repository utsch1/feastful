import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#e7dcda',
    },
    secondary: {
      main: '#A57B78',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Lato', 'Arial', 'sans-serif'",
    fontSize: 14,
    h1: {
      fontFamily: "'Lato', 'Arial', 'sans-serif'",
      fontSize: '2rem',
    },
    h2: {
      fontFamily: "'Lato', 'Arial', 'sans-serif'",
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Lato', 'Arial', 'sans-serif'",
      fontSize: '1rem',
    },
    h4: undefined,
    h5: undefined,
    h6: undefined,
    button: {
      fontFamily: "'Lato', 'Arial', 'sans-serif'",
      fontSize: '1rem',
      lineHeight: 1,
    },
  },
});

customTheme.shadows.push(
  '5px 7px 7px -5px rgba(165, 123, 120, 0.8), 5px 7px 7px -5px rgba(165, 123, 120, 0.8), 5px 7px 7px -5px rgba(165, 123, 120, 0.8)',
);

customTheme.typography.h1 = {
  fontSize: '1.5rem',
  lineHeight: 3,
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
    lineHeight: 3,
  },
  [customTheme.breakpoints.up('md')]: {
    fontSize: '2rem',
    lineHeight: 3,
  },
};
