import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import data from '../data.json';

const { company, categories } = data;

const slides = [
  {
    bg: 'linear-gradient(135deg, #b71c1c 0%, #e64a19 50%, #bf360c 100%)',
    tag: '🔧 DỊCH VỤ SỬA CHỮA',
    title: 'Sửa Chữa Cân Điện Tử',
    subtitle: 'Tận Nơi – Nhanh Chóng – Chính Xác',
    desc: 'Kỹ thuật viên có mặt trong vòng 2 giờ tại Huế & Đà Nẵng. Bảo hành sau sửa chữa 3 tháng.',
    cta: 'Gọi Ngay',
    ctaIcon: <PhoneIcon />,
    ctaAction: 'call',
  },
  {
    bg: 'linear-gradient(135deg, #1a237e 0%, #1565c0 50%, #0277bd 100%)',
    tag: '⚖️ SẢN PHẨM CHÍNH HÃNG',
    title: 'Cân Điện Tử Chính Hãng',
    subtitle: 'Cân Bàn · Cân Ghế · Cân Sàn · Cân Tiểu Ly',
    desc: 'Đầy đủ chủng loại, bảo hành 12–36 tháng. Giao hàng toàn quốc trong 24–48 giờ.',
    cta: 'Xem Sản Phẩm',
    ctaIcon: <ShoppingCartIcon />,
    ctaAction: 'products',
  },
  {
    bg: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #33691e 100%)',
    tag: '📋 BẢO TRÌ & KIỂM ĐỊNH',
    title: 'Bảo Trì – Kiểm Định Cân',
    subtitle: 'Theo Tiêu Chuẩn Kỹ Thuật Quốc Gia',
    desc: 'Kiểm định cân theo ĐLVN 26, lập biên bản đầy đủ cho doanh nghiệp, nhà máy, kho bãi.',
    cta: 'Tìm Hiểu Thêm',
    ctaIcon: <VerifiedIcon />,
    ctaAction: 'services',
  },
];

export default function Hero({ onNavigate }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  return (
    <Box>
      {/* Main Banner */}
      <Box sx={{
        background: slide.bg,
        color: 'white',
        py: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.8s ease',
        minHeight: { xs: 220, md: 280 },
        '&::before': {
          content: '""', position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: 10, px: 2, py: 0.4, mb: 1.5 }}>
                <Typography sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 600, letterSpacing: 1 }}>{slide.tag}</Typography>
              </Box>
              <Typography variant="h2" sx={{
                fontWeight: 800, mb: 0.5, lineHeight: 1.1,
                fontSize: { xs: '26px', sm: '34px', md: '44px' },
                textShadow: '0 2px 12px rgba(0,0,0,0.2)',
              }}>
                {slide.title}
              </Typography>
              <Typography sx={{
                fontSize: { xs: '14px', md: '18px' }, fontWeight: 500,
                mb: 1.5, opacity: 0.9, letterSpacing: 0.3,
              }}>
                {slide.subtitle}
              </Typography>
              <Typography sx={{ fontSize: { xs: 13, md: 15 }, opacity: 0.85, mb: 2.5, maxWidth: 500 }}>
                {slide.desc}
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1}>
                <Button
                  variant="contained"
                  startIcon={slide.ctaIcon}
                  onClick={() => slide.ctaAction === 'call'
                    ? window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`
                    : onNavigate(slide.ctaAction)
                  }
                  sx={{
                    background: 'white', color: '#c62828', fontWeight: 700,
                    fontSize: { xs: 13, md: 15 }, px: { xs: 2, md: 3 }, py: 1,
                    '&:hover': { background: '#f5f5f5', transform: 'translateY(-2px)' },
                    transition: 'all 0.2s',
                  }}
                >
                  {slide.cta}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<BuildIcon />}
                  onClick={() => onNavigate('contact')}
                  sx={{
                    color: 'white', borderColor: 'rgba(255,255,255,0.7)', fontWeight: 600,
                    fontSize: { xs: 13, md: 15 }, px: { xs: 2, md: 3 }, py: 1,
                    '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Liên Hệ Tư Vấn
                </Button>
              </Stack>
            </Grid>

            {/* Slide indicators */}
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Box sx={{
                width: 200, height: 200, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '80px', border: '2px solid rgba(255,255,255,0.2)',
              }}>
                {slide.ctaAction === 'call' ? '🔧' : slide.ctaAction === 'products' ? '⚖️' : '📋'}
              </Box>
            </Grid>
          </Grid>

          {/* Dot indicators */}
          <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, md: 3 } }}>
            {slides.map((_, i) => (
              <Box key={i} onClick={() => setActive(i)} sx={{
                width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                background: i === active ? 'white' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'all 0.3s',
              }} />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Category Quick Links */}
      <Box sx={{ background: 'white', borderBottom: '1px solid #e0e0e0', py: 1.5, display: { xs: 'none', sm: 'block' } }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={0} sx={{ overflowX: 'auto', pb: 0.5 }}>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => onNavigate && onNavigate('products')}
                sx={{
                  flexShrink: 0, color: '#333', fontWeight: 600, fontSize: 13,
                  px: 2, py: 1, borderRadius: 1, whiteSpace: 'nowrap',
                  '&:hover': { color: '#c62828', background: '#fff5f5' },
                }}
                startIcon={<span style={{ fontSize: 18 }}>{cat.icon}</span>}
              >
                {cat.name}
              </Button>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
