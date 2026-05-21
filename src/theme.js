import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary:    { main: '#c62828', light: '#ef5350', dark: '#8e0000' },
    secondary:  { main: '#1b5e20', light: '#2e7d32', dark: '#003300' },
    warning:    { main: '#e65100' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Be Vietnam Pro","Segoe UI",sans-serif',
    h1: { fontWeight: 800 }, h2: { fontWeight: 700 },
    h3: { fontWeight: 700 }, h4: { fontWeight: 700 },
    h5: { fontWeight: 600 }, h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft:  '16px',
          paddingRight: '16px',
          '@media (min-width:600px)': { paddingLeft: '24px', paddingRight: '24px' },
          '@media (min-width:900px)': { paddingLeft: '24px', paddingRight: '24px' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 4 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
  },
});

export default theme;
