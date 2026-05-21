import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAdmin } from '../context/AdminContext';

const SLIDES = [
  {
    bg: 'linear-gradient(135deg,#b71c1c,#e64a19)',
    tag: '🔧 DỊCH VỤ SỬA CHỮA', title: 'Sửa Chữa Cân Điện Tử',
    subtitle: 'Tận Nơi – Nhanh Chóng – Chính Xác',
    desc: 'KTV có mặt trong 2 giờ tại Huế & Đà Nẵng. Bảo hành 3 tháng sau sửa chữa.',
    cta: 'Gọi Ngay', ctaAction: 'call', icon: '🔧', btnIcon: <PhoneIcon />,
  },
  {
    bg: 'linear-gradient(135deg,#1a237e,#1565c0)',
    tag: '⚖️ SẢN PHẨM CHÍNH HÃNG', title: 'Cân Điện Tử Chính Hãng',
    subtitle: 'Cân Bàn · Cân Ghế · Cân Sàn · Cân Tiểu Ly',
    desc: 'Đầy đủ chủng loại, bảo hành 12–36 tháng. Giao hàng toàn quốc 24–48h.',
    cta: 'Xem Sản Phẩm', ctaAction: 'products', icon: '⚖️', btnIcon: <ShoppingCartIcon />,
  },
  {
    bg: 'linear-gradient(135deg,#1b5e20,#2e7d32)',
    tag: '📋 BẢO TRÌ & KIỂM ĐỊNH', title: 'Bảo Trì – Kiểm Định Cân',
    subtitle: 'Theo Tiêu Chuẩn Kỹ Thuật Quốc Gia',
    desc: 'Kiểm định theo ĐLVN 26, lập biên bản đầy đủ cho DN, nhà máy, kho bãi.',
    cta: 'Tìm Hiểu Thêm', ctaAction: 'services', icon: '📋', btnIcon: <VerifiedIcon />,
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
    <Box component="section">
      {/* Slider */}
      <Box sx={{
        background: s.bg, color: '#fff',
        py: { xs: 3, sm: 4, md: 5 },
        position: 'relative', overflow: 'hidden',
        transition: 'background 0.8s',
        minHeight: { xs: 200, sm: 240, md: 260 },
      }}>
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 85% 50%,rgba(255,255,255,.07),transparent 60%)' }} />

        <Container maxWidth="lg">
          {/* Tag */}
          <Box sx={{
            display: 'inline-flex', background: 'rgba(255,255,255,.18)',
            borderRadius: 10, px: 1.5, py: 0.35, mb: { xs: 1, md: 1.5 },
          }}>
            <Typography sx={{ fontSize: { xs: 11, md: 12.5 }, fontWeight: 700, letterSpacing: 0.8 }}>
              {s.tag}
            </Typography>
          </Box>

          {/* Title */}
          <Typography component="h2" sx={{
            fontWeight: 800, lineHeight: 1.1, mb: { xs: 0.6, md: 0.8 },
            fontSize: { xs: '22px', sm: '30px', md: '42px' },
          }}>
            {s.title}
          </Typography>

          {/* Subtitle */}
          <Typography sx={{
            fontSize: { xs: 12.5, sm: 15, md: 17 }, fontWeight: 500,
            opacity: 0.92, mb: { xs: 0.8, md: 1.2 },
          }}>
            {s.subtitle}
          </Typography>

          {/* Desc — hidden on xs to save space */}
          <Typography sx={{
            fontSize: { xs: 12, md: 14 }, opacity: 0.82,
            mb: { xs: 2, md: 2.5 }, maxWidth: 500, lineHeight: 1.65,
            display: { xs: 'none', sm: 'block' },
          }}>
            {s.desc}
          </Typography>

          {/* CTAs */}
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            <Button
              variant="contained" startIcon={s.btnIcon} onClick={handleCta}
              sx={{
                background: '#fff', color: '#c62828', fontWeight: 700,
                fontSize: { xs: 12.5, md: 14 }, px: { xs: 2, md: 3 }, py: { xs: 0.8, md: 1 },
                boxShadow: 'none',
                '&:hover': { background: '#f5f5f5' },
              }}
            >
              {s.cta}
            </Button>
            <Button
              variant="outlined" startIcon={<BuildIcon />} onClick={() => onNavigate('contact')}
              sx={{
                color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600,
                fontSize: { xs: 12.5, md: 14 }, px: { xs: 2, md: 3 }, py: { xs: 0.8, md: 1 },
                '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' },
              }}
            >
              Liên Hệ
            </Button>
          </Stack>

          {/* Dots */}
          <Stack direction="row" spacing={0.8} mt={{ xs: 2, md: 2.5 }}>
            {SLIDES.map((_, i) => (
              <Box key={i} component="button" onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                sx={{
                  width: i === active ? 22 : 7, height: 7, borderRadius: 4,
                  background: i === active ? '#fff' : 'rgba(255,255,255,.4)',
                  border: 'none', cursor: 'pointer', p: 0, transition: 'all .3s',
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Category quick links */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #e8e8e8', py: { xs: 0.6, md: 0.8 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 1, md: 3 } }}>
          <Box sx={{
            display: 'flex', gap: 0.3,
            overflowX: 'auto', pb: 0.2,
            scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
          }}>
            {categories.map((cat) => (
              <Button key={cat.id} onClick={() => onNavigate('products')} size="small"
                sx={{
                  flexShrink: 0, color: '#555', fontWeight: 600,
                  fontSize: { xs: 11.5, md: 12.5 },
                  px: { xs: 1, md: 1.5 }, py: { xs: 0.5, md: 0.7 },
                  borderRadius: 1, whiteSpace: 'nowrap',
                  '&:hover': { color: '#c62828', background: '#fff5f5' },
                }}
                startIcon={<span style={{ fontSize: 14 }}>{cat.icon}</span>}
              >
                {cat.name}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
