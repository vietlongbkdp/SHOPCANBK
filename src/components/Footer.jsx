import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faClock, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

export default function Footer() {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;

  return (
    <Box component="footer" sx={{ background: T.ink, color: '#fff', mt: 'auto' }}>
      {/* Top accent line */}
      <Box sx={{ height: 4, background: T.gradient }} />

      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 3 }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box component="img" src="/logo.jpg" alt="Logo" sx={{ height: 64, mb: 2, borderRadius: 1.5 }} />
            <Typography sx={{ fontWeight: 800, fontSize: 15, mb: 0.4 }}>CÂN ĐIỆN TỬ BÁCH KHOA</Typography>
            <Typography sx={{ fontSize: 12, color: T.accentLight, fontWeight: 600, mb: 1.5 }}>{company.slogan}</Typography>
            <Typography sx={{ fontSize: 12.5, color: 'rgba(255,255,255,.5)', lineHeight: 1.75, mb: 2.5 }}>
              Chuyên sửa chữa, bảo trì tận nơi và cung cấp cân điện tử kỹ thuật số tại Huế và Đà Nẵng. Giao hàng toàn quốc.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: faFacebook, href: company.facebook },
                { icon: faYoutube, href: '#' },
                { icon: faTiktok, href: '#' },
              ].map((s, i) => (
                <Link key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  sx={{ width: 38, height: 38, borderRadius: 2, background: 'rgba(255,255,255,.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
                    '&:hover': { background: T.gradient, transform: 'translateY(-3px)' } }}>
                  <FontAwesomeIcon icon={s.icon} style={{ fontSize: 16, color: '#fff' }} />
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Products */}
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: T.accentLight, letterSpacing: '0.08em', mb: 1.8 }}>SẢN PHẨM</Typography>
            <Stack spacing={1} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {categories.slice(0, 6).map(c => (
                <Box component="li" key={c.id}>
                  <Stack direction="row" spacing={0.7} alignItems="center"
                    sx={{ color: 'rgba(255,255,255,.55)', cursor: 'pointer', transition: 'all .2s', '&:hover': { color: '#fff', pl: 0.5 } }}>
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 10, color: T.brand }} />
                    <Typography sx={{ fontSize: 13 }}>{c.name}</Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: T.accentLight, letterSpacing: '0.08em', mb: 1.8 }}>DỊCH VỤ</Typography>
            <Stack spacing={1} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Sửa Chữa Cân', 'Bảo Trì Định Kỳ', 'Kiểm Định Cân', 'Lắp Đặt', 'Tư Vấn KT'].map(s => (
                <Box component="li" key={s}>
                  <Stack direction="row" spacing={0.7} alignItems="center"
                    sx={{ color: 'rgba(255,255,255,.55)', cursor: 'pointer', transition: 'all .2s', '&:hover': { color: '#fff', pl: 0.5 } }}>
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 10, color: T.brand }} />
                    <Typography sx={{ fontSize: 13 }}>{s}</Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: T.accentLight, letterSpacing: '0.08em', mb: 1.8 }}>LIÊN HỆ</Typography>
            <Stack spacing={1.5}>
              {[
                { city: 'CN Huế', addr: company.address1, phone: company.phone1 },
                { city: 'CN Đà Nẵng', addr: company.address2, phone: company.phone2 },
              ].map(b => (
                <Box key={b.city}>
                  <Stack direction="row" spacing={1} alignItems="flex-start" mb={0.4}>
                    <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 13, color: T.brand, marginTop: 3, flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{ fontSize: 12, color: T.accentLight, fontWeight: 600 }}>{b.city}</Typography>
                      <Typography sx={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', wordBreak: 'break-word' }}>{b.addr}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" pl={0.3}>
                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: 12, color: T.brand }} />
                    <Link href={`tel:${b.phone.replace(/\s/g,'')}`}
                      sx={{ fontSize: 13.5, color: '#fff', fontWeight: 700, '&:hover': { color: T.accentLight } }}>{b.phone}</Link>
                  </Stack>
                </Box>
              ))}
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 12, color: T.brand }} />
                <Link href={`mailto:${company.email}`}
                  sx={{ fontSize: 13, color: 'rgba(255,255,255,.55)', wordBreak: 'break-all', '&:hover': { color: '#fff' } }}>{company.email}</Link>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faClock} style={{ fontSize: 12, color: T.accentLight }} />
                <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{company.hours}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ height: 1, background: 'rgba(255,255,255,.08)', my: 2.5 }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,.4)', textAlign: { xs: 'center', sm: 'left' } }}>
            © {new Date().getFullYear()} Cân Điện Tử Bách Khoa. Đã đăng ký bản quyền.
          </Typography>
          <Stack direction="row" spacing={2}>
            {['Chính sách bảo mật', 'Điều khoản'].map(t => (
              <Link key={t} href="#" sx={{ fontSize: 12, color: 'rgba(255,255,255,.4)', '&:hover': { color: T.accentLight } }}>{t}</Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
