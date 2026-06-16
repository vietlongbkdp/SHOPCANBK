import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faScrewdriverWrench, faCartShopping, faCheckCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

const HIGHLIGHTS = [
  'Sửa chữa tận nơi trong 2 giờ',
  'Bảo hành sau sửa chữa 3 tháng',
  'Cân chính hãng VIBRA · A&D · CAS',
  'Giao hàng toàn quốc 24h',
];

export default function Hero({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;

  return (
    <Box component="section">
      {/* Hero */}
      <Box sx={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg,#0f1724 0%,#102a52 55%,#0d47a1 100%)`,
      }}>
        {/* Ambient glow */}
        <Box sx={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle,${T.accent}33 0%,transparent 70%)`, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-40%', left: '-15%', width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle,${T.brand}2e 0%,transparent 70%)`, pointerEvents: 'none' }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 3.5, md: 6 } }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 3, md: 5 }, alignItems: 'center',
          }}>
            {/* Left: copy */}
            <Box sx={{ color: '#fff', textAlign: { xs: 'center', md: 'left' } }} className="reveal">
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,.18)',
                borderRadius: 10, px: 1.8, py: 0.6, mb: 2.5,
              }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: T.accentLight,
                  boxShadow: `0 0 8px ${T.accentLight}`, animation: 'floatY 2s ease-in-out infinite' }} />
                <Typography sx={{ fontSize: { xs: 11, md: 12.5 }, fontWeight: 600, letterSpacing: '0.06em' }}>
                  CHUYÊN SỬA CHỮA &amp; CUNG CẤP CÂN ĐIỆN TỬ TẠI HUẾ
                </Typography>
              </Box>

              <Typography component="h2" sx={{
                fontWeight: 900, lineHeight: 1.08, mb: 2,
                fontSize: { xs: '30px', sm: '42px', md: '54px' },
                letterSpacing: '-0.02em',
              }}>
                Cân chính xác,<br />
                <Box component="span" sx={{
                  background: `linear-gradient(135deg,${T.accentLight},#fff)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>kinh doanh an tâm</Box>
              </Typography>

              <Typography sx={{
                fontSize: { xs: 14, md: 16.5 }, opacity: .82, mb: 3,
                maxWidth: 460, mx: { xs: 'auto', md: 0 }, lineHeight: 1.7,
              }}>
                3+ năm kinh nghiệm phục vụ tiểu thương, nhà máy, kho bãi tại Huế &amp; Đà Nẵng.
                Kỹ thuật viên có mặt tận nơi nhanh chóng.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent={{ xs: 'center', md: 'flex-start' }} mb={3.5}>
                <Button variant="contained" size="large"
                  startIcon={<FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: 15 }} />}
                  onClick={() => onNavigate('services')}
                  sx={{ background: T.gradient, fontWeight: 800, fontSize: { xs: 14, md: 15 }, px: { xs: 3, md: 4 }, py: 1.4, borderRadius: 3,
                    boxShadow: `0 8px 28px ${T.brand}66`, '&:hover': { background: T.gradient, transform: 'translateY(-3px)', boxShadow: `0 12px 36px ${T.brand}88` }, transition: 'all .25s' }}>
                  Đặt Sửa Chữa Ngay
                </Button>
                <Button variant="outlined" size="large"
                  startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                  component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
                  sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)', fontWeight: 700, fontSize: { xs: 14, md: 15 }, px: { xs: 3, md: 4 }, py: 1.4, borderRadius: 3, backdropFilter: 'blur(8px)',
                    '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
                  {company.phone1}
                </Button>
              </Stack>

              {/* Highlights */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1, maxWidth: 480, mx: { xs: 'auto', md: 0 } }}>
                {HIGHLIGHTS.map((h, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center"
                    sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 14, color: T.accentLight, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: { xs: 12.5, md: 13 }, opacity: .88 }}>{h}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>

            {/* Right: banner card */}
            <Box className="reveal" sx={{ animationDelay: '.15s' }}>
              <Box sx={{
                position: 'relative', borderRadius: 4, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.16)',
                boxShadow: '0 24px 64px rgba(0,0,0,.4)',
                background: 'rgba(255,255,255,.05)',
                p: 1,
              }}>
                <Box component="img" src="/banner.png" alt="Cân Điện Tử Bách Khoa"
                  sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: 3 }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Category quick-strip */}
      <Box sx={{ background: T.surface, borderBottom: `1px solid ${T.line}`, boxShadow: '0 4px 16px rgba(0,0,0,.04)' }}>
        <Container maxWidth="xl">
          <Box className="no-scrollbar" sx={{ overflowX: 'auto', py: { xs: 1, md: 1.2 } }}>
            <Stack direction="row" sx={{ width: 'max-content', gap: 0.5 }}>
              {categories.map((cat) => (
                <Button key={cat.id} onClick={() => onNavigate('products')} size="small"
                  sx={{ color: T.inkSoft, fontWeight: 600, fontSize: { xs: 12, md: 13 },
                    px: { xs: 1.4, md: 2 }, py: { xs: 0.7, md: 0.9 }, borderRadius: 2.5, whiteSpace: 'nowrap',
                    '&:hover': { color: T.brand, background: T.gradientSoft } }}
                  startIcon={<span style={{ fontSize: 15 }}>{cat.icon}</span>}>
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
