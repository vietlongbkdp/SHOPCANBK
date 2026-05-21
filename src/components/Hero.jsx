import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAdmin } from '../context/AdminContext';

const SLIDES = [
  {
    bg: 'linear-gradient(135deg,#b71c1c 0%,#e64a19 60%,#bf360c 100%)',
    tag: '🔧 DỊCH VỤ SỬA CHỮA',
    title: 'Sửa Chữa Cân Điện Tử',
    subtitle: 'Tận Nơi – Nhanh Chóng – Chính Xác',
    desc: 'Kỹ thuật viên có mặt trong vòng 2 giờ tại Huế & Đà Nẵng. Bảo hành sau sửa chữa 3 tháng.',
    cta: 'Gọi Ngay', ctaAction: 'call', icon: '🔧',
    btnIcon: <PhoneIcon />,
  },
  {
    bg: 'linear-gradient(135deg,#1a237e 0%,#1565c0 60%,#0277bd 100%)',
    tag: '⚖️ SẢN PHẨM CHÍNH HÃNG',
    title: 'Cân Điện Tử Chính Hãng',
    subtitle: 'Cân Bàn · Cân Ghế · Cân Sàn · Cân Tiểu Ly',
    desc: 'Đầy đủ chủng loại, bảo hành 12–36 tháng. Giao hàng toàn quốc trong 24–48 giờ.',
    cta: 'Xem Sản Phẩm', ctaAction: 'products', icon: '⚖️',
    btnIcon: <ShoppingCartIcon />,
  },
  {
    bg: 'linear-gradient(135deg,#1b5e20 0%,#2e7d32 60%,#33691e 100%)',
    tag: '📋 BẢO TRÌ & KIỂM ĐỊNH',
    title: 'Bảo Trì – Kiểm Định Cân',
    subtitle: 'Theo Tiêu Chuẩn Kỹ Thuật Quốc Gia',
    desc: 'Kiểm định cân theo ĐLVN 26, lập biên bản đầy đủ cho doanh nghiệp, nhà máy, kho bãi.',
    cta: 'Tìm Hiểu Thêm', ctaAction: 'services', icon: '📋',
    btnIcon: <VerifiedIcon />,
  },
];

export default function Hero({ onNavigate }) {
  const [active, setActive] = useState(0);
  const { siteData } = useAdmin();
  const { company, categories } = siteData;

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[active];

  const handleCta = () => {
    if (s.ctaAction === 'call') window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`;
    else onNavigate(s.ctaAction);
  };

  return (
    <Box component="section" aria-label="Banner chính">
      {/* Main slider */}
      <Box
        sx={{
          background: s.bg, color: 'white',
          py: { xs: 4, sm: 5, md: 6 },
          position: 'relative', overflow: 'hidden',
          transition: 'background 0.8s ease',
          minHeight: { xs: 220, md: 260 },
        }}
      >
        {/* Decorative glow */}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 85% 50%,rgba(255,255,255,.07) 0%,transparent 60%)',
        }} />

        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              {/* Tag pill */}
              <Box sx={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(255,255,255,.18)', borderRadius: 10,
                px: 2, py: 0.4, mb: 1.5,
              }}>
                <Typography component="span" sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 700, letterSpacing: 0.8 }}>
                  {s.tag}
                </Typography>
              </Box>

              <Typography
                component="h2"
                sx={{
                  fontWeight: 800, lineHeight: 1.1, mb: 0.8,
                  fontSize: { xs: '24px', sm: '32px', md: '44px' },
                  textShadow: '0 2px 12px rgba(0,0,0,.2)',
                }}
              >
                {s.title}
              </Typography>

              <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 500, opacity: 0.92, mb: 1.2 }}>
                {s.subtitle}
              </Typography>

              <Typography sx={{ fontSize: { xs: 13, md: 15 }, opacity: 0.83, mb: 2.5, maxWidth: 520, lineHeight: 1.65 }}>
                {s.desc}
              </Typography>

              <Stack direction="row" spacing={1.5} flexWrap="wrap" rowGap={1}>
                <Button
                  variant="contained"
                  startIcon={s.btnIcon}
                  onClick={handleCta}
                  sx={{
                    background: '#fff', color: '#c62828', fontWeight: 700,
                    fontSize: { xs: 13, md: 15 }, px: { xs: 2.5, md: 3.5 }, py: 1,
                    boxShadow: 'none',
                    '&:hover': { background: '#f5f5f5', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,.15)' },
                    transition: 'all .2s',
                  }}
                >
                  {s.cta}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<BuildIcon />}
                  onClick={() => onNavigate('contact')}
                  sx={{
                    color: 'white', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600,
                    fontSize: { xs: 13, md: 15 }, px: { xs: 2.5, md: 3.5 }, py: 1,
                    '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,.1)' },
                  }}
                >
                  Liên Hệ Tư Vấn
                </Button>
              </Stack>
            </Grid>

            {/* Decorative icon — desktop only */}
            <Grid item md={4} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box sx={{
                width: 180, height: 180, borderRadius: '50%',
                background: 'rgba(255,255,255,.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 80,
                border: '2px solid rgba(255,255,255,.2)',
              }} aria-hidden="true">
                {s.icon}
              </Box>
            </Grid>
          </Grid>

          {/* Dot indicators */}
          <Stack direction="row" spacing={1} mt={{ xs: 2.5, md: 3 }} aria-label="Slide navigation">
            {SLIDES.map((_, i) => (
              <Box
                key={i}
                component="button"
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === active}
                sx={{
                  width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === active ? '#fff' : 'rgba(255,255,255,.4)',
                  border: 'none', cursor: 'pointer', p: 0,
                  transition: 'all .3s',
                  '&:focus-visible': { outline: '2px solid white' },
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Category quick links — hidden on xs */}
      <Box sx={{
        background: '#fff', borderBottom: '1px solid #e8e8e8',
        py: 0.8, display: { xs: 'none', sm: 'block' },
      }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            sx={{ overflowX: 'auto', gap: 0.5, pb: 0.3, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
          >
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => onNavigate('products')}
                size="small"
                sx={{
                  flexShrink: 0, color: '#444', fontWeight: 600, fontSize: 13,
                  px: 1.5, py: 0.8, borderRadius: 1, whiteSpace: 'nowrap',
                  '&:hover': { color: '#c62828', background: '#fff5f5' },
                }}
                startIcon={<span style={{ fontSize: 16 }}>{cat.icon}</span>}
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
