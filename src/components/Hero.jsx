import { Box, Container, Typography, Button, Stack } from '@mui/material';
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

      {/* ── Banner ── */}
      <Box sx={{
        background: 'linear-gradient(135deg,#0d1b4b 0%,#1a3a8a 60%,#0d47a1 100%)',
        position: 'relative',
      }}>
        {/* Wrapper giới hạn chiều cao + canh giữa ảnh */}
        <Box sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}>
          {/* Banner image — full width, contain (không crop) */}
          <Box
            component="img"
            src="/banner.png"
            alt="Cân Điện Tử Bách Khoa"
            sx={{
              display: 'block',
              width: '100%',
              height: 'auto',
              maxHeight: { xs: 'none', md: 380 },
              objectFit: { xs: 'contain', md: 'contain' },
              objectPosition: 'center center',
              mx: 'auto',
            }}
          />

          {/* Desktop CTA overlay — góc phải */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            position: 'absolute',
            top: '50%',
            right: { md: '2%', lg: '4%' },
            transform: 'translateY(-50%)',
            background: 'rgba(13,23,75,0.82)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,.2)',
            borderRadius: 2,
            p: 2.5,
            minWidth: 220,
            maxWidth: 250,
          }}>
            <Typography sx={{ fontWeight: 800, color: '#fff', fontSize: 17, lineHeight: 1.25, mb: 0.5 }}>
              Cân Điện Tử<br />Bách Khoa
            </Typography>
            <Typography sx={{ color: '#ffcc02', fontWeight: 700, fontSize: 12, mb: 1.8 }}>
              Uy Tín – Chuyên Nghiệp – Nhanh Chóng
            </Typography>

            <Stack spacing={0.6} mb={2}>
              {HIGHLIGHTS.map((h) => (
                <Stack key={h} direction="row" spacing={0.7} alignItems="flex-start">
                  <CheckCircleIcon sx={{ color: '#69f0ae', fontSize: 14, mt: 0.15, flexShrink: 0 }} />
                  <Typography sx={{ color: 'rgba(255,255,255,.9)', fontSize: 12, lineHeight: 1.45 }}>{h}</Typography>
                </Stack>
              ))}
            </Stack>

            <Stack spacing={0.8}>
              <Button component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
                variant="contained" startIcon={<PhoneIcon />} fullWidth size="small"
                sx={{ background: '#c62828', fontWeight: 700, fontSize: 13, py: 0.9, '&:hover': { background: '#8e0000' } }}>
                {company.phone1}
              </Button>
              <Button variant="outlined" startIcon={<ShoppingCartIcon />} fullWidth size="small"
                onClick={() => onNavigate('products')}
                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600, fontSize: 12.5, py: 0.8, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.12)' } }}>
                Xem Sản Phẩm
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Mobile CTA bar */}
        <Box sx={{
          display: { xs: 'flex', md: 'none' },
          px: 2, py: 1.5, gap: 1, justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,.15)',
        }}>
          <Button component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
            variant="contained" size="small" startIcon={<PhoneIcon sx={{ fontSize: 14 }} />}
            sx={{ background: '#c62828', fontWeight: 700, fontSize: 12.5, flex: 1, maxWidth: 200, '&:hover': { background: '#8e0000' } }}>
            {company.phone1}
          </Button>
          <Button variant="outlined" size="small" startIcon={<BuildIcon sx={{ fontSize: 14 }} />}
            onClick={() => onNavigate('services')}
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.65)', fontWeight: 600, fontSize: 12, flex: 1, maxWidth: 200, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
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
