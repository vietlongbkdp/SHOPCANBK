import { Box, Container, Grid, Typography, Paper, Button, Stack, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import data from '../data.json';

export default function Home({ onProductClick }) {
  const categories = data.categories || [];

  const topSellers = [...data.products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ background: '#fff', py: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            {categories.map((cat) => (
              <Grid item key={cat.id} xs={6} sm={4} md={2}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }} elevation={0}>
                  <Avatar sx={{ bgcolor: '#f5f5f5', color: '#333' }}>{cat.icon}</Avatar>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, md: 14 } }}>{cat.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 3, md: 6 }, background: '#f4f6f8' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Giới thiệu</Typography>
                <Typography variant="body2" color="textSecondary">
                  Chuyên cung cấp các loại cân điện tử: cân nhà bếp, cân sức khỏe, cân công nghiệp, cân tính tiền và phụ kiện.
                </Typography>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Cân Đĩa</Typography>
                <Grid container spacing={2}>
                  {data.products
                    .filter(p => p.category === 3)
                    .slice(0, 8)
                    .map((product) => (
                      <Grid item xs={6} sm={4} md={3} key={product.id}>
                        <Paper sx={{ p: 1 }} elevation={0}>
                          <Box sx={{ height: 110, overflow: 'hidden' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </Box>
                          <Typography sx={{ mt: 1, fontSize: 13, fontWeight: 600 }}>{product.name}</Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Button size="small" variant="contained" onClick={() => onProductClick && onProductClick(product)}>Xem</Button>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>TOP 5 BÁN CHẠY</Typography>
                <Stack spacing={2}>
                  {topSellers.map((p) => (
                    <Stack key={p.id} direction="row" spacing={2} alignItems="center">
                      <Box sx={{ width: 64, height: 48, overflow: 'hidden' }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{p.name}</Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{p.price.toLocaleString('vi-VN')}₫</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
