import { Box, Container, Typography, Button, Stack } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function Hero() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #d32f2f 0%, #f57c00 100%)',
        color: 'white',
        py: { xs: 4, sm: 6, md: 10 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            mb: { xs: 1, sm: 2, md: 2 },
            textTransform: 'uppercase',
            letterSpacing: { xs: 0.5, sm: 1, md: 2 },
            fontSize: { xs: '24px', sm: '32px', md: '48px' },
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          CÂN ĐIỆN TỬ CHÍNH HÃNG
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 2, sm: 3, md: 4 },
            opacity: 0.95,
            fontWeight: 300,
                      fontSize: { xs: '14px', sm: '16px', md: '20px' },
          }}
        >
          Giá tốt nhất, bảo hành toàn quốc, giao hàng nhanh
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'white',
            color: '#d32f2f',
            fontWeight: 700,
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 1, sm: 1.2, md: 1.5 },
            textTransform: 'uppercase',
            letterSpacing: 1,
            '&:hover': {
              background: '#f5f5f5',
              transform: 'translateY(-3px)',
            },
          }}
          startIcon={<ShoppingBagIcon />}
        >
          Mua Ngay
        </Button>
      </Container>
    </Box>
  );
}
