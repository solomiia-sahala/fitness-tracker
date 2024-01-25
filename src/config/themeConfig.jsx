import { createMuiTheme } from '@mui/material/styles/createTheme';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Dosis',
  },
  palette: {
    primary: {
      main: '#9367a6'
    },
    secondary: {
      main: '#f0d9d5',
    }
  },
});

export default theme;