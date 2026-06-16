import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#1565c0,#00b0ff)', color: '#fff', gap: 2,
    }}>
      <Typography sx={{ fontSize: 52 }}>⚖️</Typography>
      <CircularProgress sx={{ color: '#fff' }} size={36} />
      <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Cân Điện Tử Bách Khoa</Typography>
      <Typography sx={{ opacity: 0.8, fontSize: 13 }}>Đang tải dữ liệu...</Typography>
    </Box>
  );
}
