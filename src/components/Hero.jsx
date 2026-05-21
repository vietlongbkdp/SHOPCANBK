import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAdmin } from '../context/AdminContext';

const SLIDES = [
  {
    bg: 'linear-gradient(135deg,#b71c1c 0%,#e64a19 100%)',
    tag: '🔧 DỊCH VỤ SỬA CHỮA', icon: '🔧',
    title: 'Sửa Chữa Cân\nĐiện Tử', subtitle: 'Tận Nơi – Nhanh – Chính Xác',
    desc: 'KTV có mặt trong 2 giờ tại Huế & Đà Nẵng. Bảo hành 3 tháng.',
    cta: 'Gọi Ngay', ctaAction: 'call', btnIcon: <PhoneIcon />,
  },
  {
    bg: 'linear-gradient(135deg,#1a237e 0%,#0277bd 100%)',
    tag: '⚖️ SẢN PHẨM CHÍNH HÃNG', icon: '⚖️',
    title: 'Cân Điện Tử\nChính Hãng', subtitle: 'Cân Bàn · Cân Ghế · Cân Sàn · Tiểu Ly',
    desc: 'Bảo hành 12–36 tháng. Giao hàng toàn quốc 24–48 giờ.',
    cta: 'Xem Sản Phẩm', ctaAction: 'products', btnIcon: <ShoppingCartIcon />,
  },
  {
    bg: 'linear-gradient(135deg,#1b5e20 0%,#33691e 100%)',
    tag: '📋 BẢO TRÌ & KIỂM ĐỊNH', icon: '📋',
    title: 'Bảo Trì –\nKiểm Định Cân', subtitle: 'Theo Tiêu Chuẩn Kỹ Thuật Quốc Gia',
    desc: 'Kiểm định theo ĐLVN 26, lập biên bản cho doanh nghiệp, kho bãi.',
    cta: 'Tìm Hiểu', ctaAction: 'services', btnIcon: <VerifiedIcon />,
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
  const handleCta = () => s.ctaAction === 'call'
    ? window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`
    : onNavigate(s.ctaAction);

  return (
    <Box component="section">
      {/* Banner */}
      <Box sx={{
        background: s.bg, color: '#fff',
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 0, md: 0 },
        position: 'relative', overflow: 'hidden',
        minHeight: { xs: 200, sm: 240, md: 280 },
        transition: 'background 0.8s ease',
      }}>
        {/* Glow */}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 50%,rgba(255,255,255,.07) 0%,transparent 60%)',
        }} />

        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} spacing={{ xs: 2, md: 4 }}>
            <Box sx={{ flex: 1 }}>
              {/* Tag */}
              <Box sx={{
                display: 'inline-flex', background: 'rgba(255,255,255,.18)',
                borderRadius: 10, px: { xs: 1.5, md: 2 }, py: 0.35, mb: { xs: 1, md: 1.5 },
              }}>
                <Typography component="span" sx={{ fontSize: { xs: 11, md: 12.5 }, fontWeight: 700, letterSpacing: 0.5 }}>
                  {s.tag}
                </Typography>
              </Box>

              <Typography component="h2" sx={{
                fontWeight: 800, lineHeight: 1.15, mb: { xs: 0.6, md: 0.8 },
                fontSize: { xs: '22px', sm: '28px', md: '40px' },
                whiteSpace: 'pre-line',
              }}>
                {s.title}
              </Typography>

              <Typography sx={{
                fontSize: { xs: 13, sm: 15, md: 17 },
                fontWeight: 500, opacity: 0.9, mb: { xs: 0.8, md: 1.2 },
              }}>
                {s.subtitle}
              </Typography>

              <Typography sx={{
                fontSize: { xs: 12, md: 14 }, opacity: 0.82,
                mb: { xs: 2, md: 2.5 }, lineHeight: 1.6,
                display: { xs: 'none', sm: 'block' },
              }}>
                {s.desc}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                <Button
                  variant="contained"
                  startIcon={s.btnIcon}
                  onClick={handleCta}
                  size="small"
                  sx={{
                    background: '#fff', color: '#c62828', fontWeight: 700,
                    fontSize: { xs: 12.5, md: 14 },
                    px: { xs: 2, md: 3 }, py: { xs: 0.8, md: 1 },
                    boxShadow: 'none',
                    '&:hover': { background: '#f5f5f5' },
                  }}
                >
                  {s.cta}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<BuildIcon sx={{ fontSize: { xs: 14, md: 16 } }} />}
                  onClick={() => onNavigate('contact')}
                  size="small"
                  sx={{
                    color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600,
                    fontSize: { xs: 12.5, md: 14 },
                    px: { xs: 2, md: 3 }, py: { xs: 0.8, md: 1 },
                    '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' },
                  }}
                >
                  Tư Vấn
                </Button>
              </Stack>
            </Box>

            {/* Icon — md only */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              width: 160, height: 160, borderRadius: '50%',
              background: 'rgba(255,255,255,.1)',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 72, border: '2px solid rgba(255,255,255,.2)',
              flexShrink: 0,
            }} aria-hidden>
              {s.icon}
            </Box>
          </Stack>

          {/* Dots */}
          <Stack direction="row" spacing={0.8} mt={{ xs: 2, md: 2.5 }}>
            {SLIDES.map((_, i) => (
              <Box key={i} component="button" onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`} aria-current={i === active}
                sx={{
                  width: i === active ? 22 : 7, height: 7, borderRadius: 4,
                  background: i === active ? '#fff' : 'rgba(255,255,255,.4)',
                  border: 'none', cursor: 'pointer', p: 0,
                  transition: 'all .3s',
                  '&:focus-visible': { outline: '2px solid #fff' },
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Category scroll strip */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #ebebeb', py: { xs: 0.6, md: 0.8 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 1, md: 3 } }}>
          <Box sx={{
            overflowX: 'auto', scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}>
            <Stack direction="row" sx={{ width: 'max-content', gap: { xs: 0.2, md: 0.5 } }}>
              {categories.map((cat) => (
                <Button key={cat.id} onClick={() => onNavigate('products')} size="small"
                  sx={{
                    flexShrink: 0, color: '#555', fontWeight: 600,
                    fontSize: { xs: 11.5, md: 13 },
                    px: { xs: 1, md: 1.5 }, py: { xs: 0.6, md: 0.7 },
                    borderRadius: 1, whiteSpace: 'nowrap',
                    minWidth: 0,
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
