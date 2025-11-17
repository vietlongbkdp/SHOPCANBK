import { Box, Container, Typography, Grid, Paper, Stack, Chip } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function Services() {
  const services = [
    {
      icon: <StoreIcon sx={{ fontSize: 50, color: '#d32f2f' }} />,
      title: 'Cửa Hàng Trực Tuyến',
      description: 'Mua sắm các sản phẩm cân điện tử chất lượng cao với giá tốt nhất trực tiếp từ website của chúng tôi.',
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 50, color: '#d32f2f' }} />,
      title: 'Giao Hàng Nhanh',
      description: 'Giao hàng toàn quốc nhanh chóng và an toàn. Hỗ trợ COD tại các tỉnh thành.',
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 50, color: '#d32f2f' }} />,
      title: 'Bảo Hành Chính Hãng',
      description: 'Tất cả sản phẩm đều có bảo hành chính hãng từ 1-3 năm tùy từng loại sản phẩm.',
    },
  ];

  return (
    <Box sx={{ flex: 1, py: 6, background: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#d32f2f',
            mb: 6,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Dịch Vụ Của Chúng Tôi
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 3 }}>{service.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.8 }}>
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Additional Services */}
        <Paper sx={{ p: 4, mt: 6, background: 'white' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#333' }}>
            Dịch Vụ Bổ Sung
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="✓" color="primary" sx={{ background: '#d32f2f' }} />
              <Typography variant="body1">Tư vấn kỹ thuật và chọn lựa sản phẩm phù hợp</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="✓" color="primary" sx={{ background: '#d32f2f' }} />
              <Typography variant="body1">Hỗ trợ cài đặt, bảo trì và sửa chữa sản phẩm</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="✓" color="primary" sx={{ background: '#d32f2f' }} />
              <Typography variant="body1">Cung cấp phụ tùng thay thế chính hãng</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="✓" color="primary" sx={{ background: '#d32f2f' }} />
              <Typography variant="body1">Hỗ trợ khách hàng 24/7 qua điện thoại, email, chat</Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
