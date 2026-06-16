import { createTheme } from '@mui/material/styles';

// ── DESIGN TOKENS ─────────────────────────────────────
// Tone chủ đạo: xanh dương gradient
export const T = {
  // Primary brand gradient
  brand:        '#1565c0',
  brandDark:    '#0d47a1',
  brandLight:   '#5e92f3',
  accent:       '#00b0ff',       // xanh sáng nhấn
  accentLight:  '#69e2ff',
  gradient:     'linear-gradient(135deg,#1565c0 0%,#00b0ff 100%)',
  gradientDark: 'linear-gradient(135deg,#0d47a1 0%,#1565c0 100%)',
  gradientSoft: 'linear-gradient(135deg,#f0f6ff 0%,#e3f2ff 100%)',
  // Neutrals
  ink:          '#0f1724',       // gần đen, ngả xanh
  inkSoft:      '#4a5568',
  line:         '#e6edf5',
  surface:      '#ffffff',
  bg:           '#f5f8fc',       // nền xanh nhạt
  // States
  success:      '#2e7d32',
  star:         '#ffa000',
};

const theme = createTheme({
  palette: {
    primary:    { main: T.brand, light: T.brandLight, dark: T.brandDark, contrastText: '#fff' },
    secondary:  { main: T.accent, light: T.accentLight, contrastText: '#fff' },
    success:    { main: T.success },
    background: { default: T.bg, paper: T.surface },
    text:       { primary: T.ink, secondary: T.inkSoft },
  },
  typography: {
    fontFamily: '"Be Vietnam Pro","Segoe UI",sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
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
        root: { textTransform: 'none', fontWeight: 700, borderRadius: 10, boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
        containedPrimary: {
          background: T.gradient,
          '&:hover': { background: T.gradientDark },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default theme;
