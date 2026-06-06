import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary:    { main: '#c62828', light: '#ef5350', dark: '#8e0000', contrastText: '#fff' },
    secondary:  { main: '#1565c0', light: '#1e88e5', dark: '#0d47a1', contrastText: '#fff' },
    success:    { main: '#2e7d32' },
    warning:    { main: '#e65100' },
    info:       { main: '#0277bd' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
    text:       { primary: '#1a1a2e', secondary: '#546e7a' },
  },
  typography: {
    fontFamily: '"Be Vietnam Pro","Segoe UI","Helvetica Neue",Arial,sans-serif',
    h1: { fontWeight: 800, letterSpacing: -0.5 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,.08)',
    '0 2px 8px rgba(0,0,0,.1)',
    '0 4px 16px rgba(0,0,0,.1)',
    '0 6px 24px rgba(0,0,0,.12)',
    '0 8px 32px rgba(0,0,0,.12)',
    ...Array(19).fill('0 8px 32px rgba(0,0,0,.12)'),
  ],
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16, paddingRight: 16,
          '@media (min-width:600px)': { paddingLeft: 24, paddingRight: 24 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 600, borderRadius: 8,
          boxShadow: 'none', '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg,#c62828,#e53935)',
          '&:hover': { background: 'linear-gradient(135deg,#8e0000,#c62828)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,.08)' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
  },
});

export default theme;
