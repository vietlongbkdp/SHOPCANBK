import { Box, Container, Typography, Button, Stack, Grid, Chip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

      {/* ── Banner section ── */}
      <Box sx={{ background: 'linear-gradient(135deg, #0d1b4b 0%, #1a3a8a 50%, #0d47a1 100%)', py: { xs: 0, md: 0 } }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={0}>

            {/* Banner image */}
            <Grid item xs={12} md={8}>
              <Box
                component="img"
                src="/banner.png"
                alt="Cân Điện Tử Bách Khoa"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  maxHeight: { xs: 200, sm: 280, md: 340 },
                }}
              />
            </Grid>

            {/* Right side CTA — desktop */}
            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', pl: 2, py: 3 }}>
              <Typography sx={{
                fontWeight: 800, color: '#fff', fontSize: '22px', lineHeight: 1.2, mb: 0.8,
              }}>
                Cân Điện Tử<br />Bách Khoa
              </Typography>
              <Typography sx={{ color: '#ffcc02', fontWeight: 700, fontSize: 13.5, mb: 2 }}>
                Uy Tín – Chuyên Nghiệp – Nhanh Chóng
              </Typography>

              <Stack spacing={0.7} mb={2.5}>
                {HIGHLIGHTS.map((h) => (
                  <Stack key={h} direction="row" spacing={0.8} alignItems="center">
                    <CheckCircleIcon sx={{ color: '#69f0ae', fontSize: 15, flexShrink: 0 }} />
                    <Typography sx={{ color: 'rgba(255,255,255,.88)', fontSize: 12.5 }}>{h}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Stack spacing={1}>
                <Button
                  component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
                  variant="contained" startIcon={<PhoneIcon />} fullWidth
                  sx={{ background: '#c62828', fontWeight: 700, fontSize: 13.5, py: 1, '&:hover': { background: '#8e0000' } }}
                >
                  {company.phone1}
                </Button>
                <Button
                  variant="outlined" startIcon={<ShoppingCartIcon />} fullWidth
                  onClick={() => onNavigate('products')}
                  sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600, fontSize: 13, py: 0.9, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}
                >
                  Xem Sản Phẩm
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        {/* Mobile CTA bar dưới banner */}
        <Box sx={{
          display: { xs: 'flex', md: 'none' },
          background: 'rgba(0,0,0,.35)',
          px: 2, py: 1.2, gap: 1, justifyContent: 'center',
        }}>
          <Button component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
            variant="contained" size="small" startIcon={<PhoneIcon sx={{ fontSize: 14 }} />}
            sx={{ background: '#c62828', fontWeight: 700, fontSize: 12.5, flex: 1, maxWidth: 180, '&:hover': { background: '#8e0000' } }}>
            {company.phone1}
          </Button>
          <Button variant="outlined" size="small" startIcon={<BuildIcon sx={{ fontSize: 14 }} />}
            onClick={() => onNavigate('services')}
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.65)', fontWeight: 600, fontSize: 12, flex: 1, maxWidth: 180, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
            Sửa Chữa
          </Button>
        </Box>
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
