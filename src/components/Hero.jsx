import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import { useAdmin } from '../context/AdminContext';

const HIGHLIGHTS = [
  'Sửa chữa tận nơi Huế & Đà Nẵng',
  'Bảo hành sau sửa chữa 3 tháng',
  'Cân chính hãng – Giá tốt nhất',
  'Giao hàng toàn quốc 24h',
];

export default function Hero({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;

  return (
    <Box component="section">

      {/* ── Banner 2 cột ── */}
      <Box sx={{
        background: 'linear-gradient(135deg,#0d1b4b 0%,#1a3a8a 60%,#0d47a1 100%)',
        py: { xs: 2, md: 3 },
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center" sx={{ flexWrap: "nowrap" }}>

            {/* Cột trái: ảnh banner */}
            <Grid item xs={6}>
              <Box
                component="img"
                src="/banner.png"
                alt="Cân Điện Tử Bách Khoa"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
            </Grid>

            {/* Cột phải: nội dung */}
            <Grid item xs={6}>
              <Box sx={{ color: '#fff' }}>
                <Typography sx={{
                  fontWeight: 800, lineHeight: 1.2, mb: 0.6,
                  fontSize: { xs: '20px', md: '26px' },
                }}>
                  Cân Điện Tử<br />Bách Khoa
                </Typography>

                <Typography sx={{
                  color: '#ffcc02', fontWeight: 700, mb: { xs: 1.5, md: 2 },
                  fontSize: { xs: 13, md: 14 },
                }}>
                  Uy Tín – Chuyên Nghiệp – Nhanh Chóng
                </Typography>

                <Stack spacing={0.9} mb={{ xs: 2, md: 2.5 }}>
                  {HIGHLIGHTS.map((h) => (
                    <Stack key={h} direction="row" spacing={0.8} alignItems="flex-start">
                      <CheckCircleIcon sx={{ color: '#69f0ae', fontSize: 16, mt: 0.15, flexShrink: 0 }} />
                      <Typography sx={{ color: 'rgba(255,255,255,.9)', fontSize: { xs: 13, md: 13.5 }, lineHeight: 1.5 }}>
                        {h}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1}>
                  <Button
                    component="a"
                    href={`tel:${company.phone1.replace(/\s/g, '')}`}
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    fullWidth
                    sx={{
                      background: '#c62828', fontWeight: 700,
                      fontSize: { xs: 13.5, md: 14 }, py: 1.1,
                      '&:hover': { background: '#8e0000' },
                    }}
                  >
                    {company.phone1}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    onClick={() => onNavigate('products')}
                    sx={{
                      color: '#fff', borderColor: 'rgba(255,255,255,.65)',
                      fontWeight: 600, fontSize: { xs: 13, md: 13.5 }, py: 1,
                      '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' },
                    }}
                  >
                    Xem Sản Phẩm
                  </Button>
                </Stack>

                <Button
                  startIcon={<BuildIcon />}
                  fullWidth
                  onClick={() => onNavigate('services')}
                  sx={{
                    mt: 0.8, color: 'rgba(255,255,255,.7)',
                    fontWeight: 600, fontSize: { xs: 12.5, md: 13 },
                    '&:hover': { color: '#fff', background: 'rgba(255,255,255,.08)' },
                  }}
                >
                  Dịch Vụ Sửa Chữa Cân
                </Button>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* ── Category strip ── */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #ebebeb', py: { xs: 0.7, md: 0.9 } }}>
        <Container maxWidth="lg">
          <Box sx={{ overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            <Stack direction="row" sx={{ width: 'max-content', gap: { xs: 0.3, md: 0.5 } }}>
              {categories.map((cat) => (
                <Button key={cat.id} onClick={() => onNavigate('products')} size="small"
                  sx={{
                    flexShrink: 0, color: '#444', fontWeight: 600,
                    fontSize: { xs: 11.5, md: 13 },
                    px: { xs: 1, md: 1.5 }, py: { xs: 0.5, md: 0.7 },
                    borderRadius: 1, whiteSpace: 'nowrap', minWidth: 0,
                    '&:hover': { color: '#c62828', background: '#fff5f5' },
                  }}
                  startIcon={<span style={{ fontSize: 14 }}>{cat.icon}</span>}
                >
                  {cat.name}
                </Button>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
