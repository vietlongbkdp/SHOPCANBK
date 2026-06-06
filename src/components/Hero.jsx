import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faScrewdriverWrench, faCartShopping, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../context/AdminContext';

const SLIDES = [
  {
    bg: 'linear-gradient(135deg,#0d1b4b 0%,#1a3a8a 100%)',
    image: '/banner.png',
    tag: 'ẢNH BIỂN HIỆU',
    showImage: true,
  },
  {
    bg: 'linear-gradient(135deg,#7b1111 0%,#c62828 60%,#e53935 100%)',
    showImage: false,
    tag: 'SỬA CHỮA',
    title: 'Sửa Chữa Cân\nĐiện Tử Tận Nơi',
    desc: 'Kỹ thuật viên đến tận nơi tại Huế & Đà Nẵng trong vòng 2 giờ. Bảo hành sau sửa chữa 3 tháng.',
    icon: faScrewdriverWrench,
    cta: 'Gọi Ngay',
    ctaType: 'call',
  },
  {
    bg: 'linear-gradient(135deg,#1b5e20 0%,#2e7d32 60%,#388e3c 100%)',
    showImage: false,
    tag: 'SẢN PHẨM',
    title: 'Cân Điện Tử\nChính Hãng',
    desc: 'Đầy đủ chủng loại: cân bàn, cân ghế, cân tiểu ly, cân sàn. Bảo hành 12–36 tháng.',
    icon: faCartShopping,
    cta: 'Xem Sản Phẩm',
    ctaType: 'products',
  },
];

export default function Hero({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[active];

  const handleCta = (type) => {
    if (type === 'call') window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`;
    else onNavigate(type);
  };

  return (
    <Box component="section">
      {/* ── Banner ── */}
      <Box sx={{
        background: slide.bg,
        transition: 'background 0.6s ease',
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 320, sm: 360, md: 420 },
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Background decoration */}
        <Box sx={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 1.5, md: 2 } }}>
          {/* Slide 0: ảnh banner */}
          {slide.showImage && (
            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={7}>
                <Box sx={{
                  borderRadius: 2, overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,.3)',
                  border: '2px solid rgba(255,255,255,.15)',
                  height: { xs: 180, sm: 220, md: 300 },
                }}>
                  <Box component="img" src="/banner.png" alt="Cân Điện Tử Bách Khoa"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ color: '#fff', textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: '20px', sm: '26px', md: '30px' }, lineHeight: 1.2, mb: 0.8 }}>
                    Cân Điện Tử Bách Khoa
                  </Typography>
                  <Typography sx={{ color: '#ffcc02', fontWeight: 700, fontSize: { xs: 13, md: 15 }, mb: 2 }}>
                    Uy Tín – Chuyên Nghiệp – Nhanh Chóng
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={1}>
                    <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
                      variant="contained"
                      startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                      sx={{ background: '#c62828', fontWeight: 700, fontSize: { xs: 13, md: 14 }, py: 1, borderRadius: 2, '&:hover': { background: '#8e0000' } }}>
                      {company.phone1}
                    </Button>
                    <Button variant="outlined"
                      startIcon={<FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 14 }} />}
                      onClick={() => onNavigate('products')}
                      sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600, fontSize: { xs: 13, md: 14 }, py: 0.9, borderRadius: 2, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.12)' } }}>
                      Xem Sản Phẩm
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Slide 1 & 2: text CTA */}
          {!slide.showImage && (
            <Box sx={{ color: '#fff', textAlign: 'center', py: { xs: 1, md: 2 } }}>
              {/* Tag badge */}
              <Box sx={{ display: 'inline-flex', background: 'rgba(255,255,255,.18)', borderRadius: 10, px: 2, py: 0.4, mb: 2 }}>
                <FontAwesomeIcon icon={slide.icon} style={{ fontSize: 13, marginRight: 6 }} />
                <Typography component="span" sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>{slide.tag}</Typography>
              </Box>

              <Typography sx={{
                fontWeight: 800, lineHeight: 1.15, mb: 1.5,
                fontSize: { xs: '26px', sm: '36px', md: '48px' },
                whiteSpace: 'pre-line',
                textShadow: '0 2px 16px rgba(0,0,0,.2)',
              }}>
                {slide.title}
              </Typography>

              <Typography sx={{
                opacity: 0.88, fontSize: { xs: 14, sm: 16, md: 18 },
                mb: 3, maxWidth: 540, mx: 'auto', lineHeight: 1.65,
              }}>
                {slide.desc}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" alignItems="center">
                <Button variant="contained" size="large"
                  startIcon={<FontAwesomeIcon icon={slide.icon} style={{ fontSize: 16 }} />}
                  onClick={() => handleCta(slide.ctaType)}
                  sx={{
                    background: 'rgba(255,255,255,.95)', color: '#c62828',
                    fontWeight: 800, fontSize: { xs: 14, md: 16 },
                    px: { xs: 3, md: 5 }, py: { xs: 1.2, md: 1.5 }, borderRadius: 3,
                    '&:hover': { background: '#fff', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,.2)' },
                    transition: 'all .2s',
                  }}>
                  {slide.cta}
                </Button>
                <Button variant="outlined" size="large"
                  startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                  onClick={() => onNavigate('contact')}
                  sx={{
                    color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600,
                    fontSize: { xs: 13, md: 15 }, px: { xs: 3, md: 4 }, py: { xs: 1.1, md: 1.4 }, borderRadius: 3,
                    '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.12)' },
                  }}>
                  Liên Hệ Tư Vấn
                </Button>
              </Stack>
            </Box>
          )}
        </Container>

        {/* Dot indicators */}
        <Stack direction="row" spacing={0.8}
          sx={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          {SLIDES.map((_, i) => (
            <Box key={i} component="button" onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              sx={{
                width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                background: i === active ? '#fff' : 'rgba(255,255,255,.4)',
                border: 'none', cursor: 'pointer', p: 0,
                transition: 'all .35s cubic-bezier(.4,0,.2,1)',
                '&:hover': { background: 'rgba(255,255,255,.8)' },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* ── Category strip ── */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #eef0f3', py: { xs: 0.7, md: 1 }, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
        <Container maxWidth="xl">
          <Box sx={{ overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            <Stack direction="row" sx={{ width: 'max-content', gap: 0.5 }}>
              {categories.map(cat => (
                <Button key={cat.id} onClick={() => onNavigate('products')} size="small"
                  sx={{
                    color: '#546e7a', fontWeight: 600,
                    fontSize: { xs: 12, md: 13 },
                    px: { xs: 1.2, md: 1.8 }, py: { xs: 0.6, md: 0.8 },
                    borderRadius: 2, whiteSpace: 'nowrap',
                    '&:hover': { color: '#c62828', background: '#fff5f5' },
                  }}
                  startIcon={<span style={{ fontSize: 15 }}>{cat.icon}</span>}
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
