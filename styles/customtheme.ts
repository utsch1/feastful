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
  shape: {
    borderRadius: 5,
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
    },
  },
});
