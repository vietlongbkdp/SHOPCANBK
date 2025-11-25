import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #d32f2f 0%, #f57c00 100%)' }}>
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {/* Logo */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            ⚖️ CÂN ĐIỆN TỬ BÁCH KHOA
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, fontStyle: 'italic' }}>
            Dịch vụ sữa chữa tận nơi, bào trì bảo dưỡng và mua bán cân điện tử
          </Typography>
        </Box>

        {/* Contact Info */}
        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Chip
            icon={<PhoneIcon />}
            label="0913331919"
            variant="outlined"
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              '& .MuiChip-icon': { color: 'white' },
            }}
          />
          <Chip
            icon={<PhoneIcon />}
            label="0938561544"
            variant="outlined"
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              '& .MuiChip-icon': { color: 'white' },
            }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
