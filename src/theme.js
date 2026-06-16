import { createTheme } from '@mui/material/styles';

// ── DESIGN TOKENS ─────────────────────────────────────
// Tone chủ đạo: đỏ-cam gradient (lấy từ logo BK)
export const T = {
  // Primary brand gradient
  brand:        '#d32f2f',
  brandDark:    '#9a0007',
  brandLight:   '#ff6659',
  accent:       '#ff6d00',       // cam nhấn
  accentLight:  '#ff9e40',
  gradient:     'linear-gradient(135deg,#d32f2f 0%,#ff6d00 100%)',
  gradientDark: 'linear-gradient(135deg,#9a0007 0%,#d32f2f 100%)',
  gradientSoft: 'linear-gradient(135deg,#fff5f3 0%,#ffece4 100%)',
  // Neutrals
  ink:          '#1a1410',       // gần đen, ấm
  inkSoft:      '#5d544e',
  line:         '#efe9e5',
  surface:      '#ffffff',
  bg:           '#faf7f5',       // nền ấm nhạt
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
