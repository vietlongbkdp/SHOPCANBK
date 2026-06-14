import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faClock, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useAdmin } from '../context/AdminContext';

export default function Footer() {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;

  return (
    <Box component="footer" sx={{ background: '#0f1923', color: '#fff' }}>
      {/* Main footer */}
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 3 }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>

          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box component="img" src="/logo.jpg" alt="Logo" sx={{ height: 72, width: 'auto', mb: 2, filter: 'brightness(1.1)' }} />
            <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#fff', mb: 0.4 }}>
              CÂN ĐIỆN TỬ BÁCH KHOA
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: '#ef9a9a', fontStyle: 'italic', mb: 1.5 }}>
              {company.slogan}
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#90a4ae', lineHeight: 1.75, mb: 2.5 }}>
              Chuyên sửa chữa, bảo trì tận nơi và cung cấp cân điện tử kỹ thuật số tại Huế và Đà Nẵng. Giao hàng toàn quốc.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: faFacebook, href: company.facebook, bg: '#1877f2', label: 'Facebook' },
                { icon: faYoutube, href: '#', bg: '#ff0000', label: 'YouTube' },
                { icon: faTiktok, href: '#', bg: '#000', label: 'TikTok' },
              ].map(s => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 1.5, background: s.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all .2s', '&:hover': { transform: 'translateY(-2px)', opacity: .9 },
                  }}>
                    <FontAwesomeIcon icon={s.icon} style={{ fontSize: 16, color: '#fff' }} />
                  </Box>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Products */}
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#ef9a9a', textTransform: 'uppercase', letterSpacing: 0.8, mb: 1.5 }}>
              Sản Phẩm
            </Typography>
            <Stack spacing={0.8} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {categories.slice(0, 6).map(c => (
                <Box component="li" key={c.id}>
                  <Stack direction="row" spacing={0.6} alignItems="center"
                    sx={{ color: '#90a4ae', fontSize: 13, cursor: 'pointer', '&:hover': { color: '#fff' }, transition: 'color .2s' }}>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, color: '#c62828' }} />
                    <Typography sx={{ fontSize: 13 }}>{c.name}</Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#ef9a9a', textTransform: 'uppercase', letterSpacing: 0.8, mb: 1.5 }}>
              Dịch Vụ
            </Typography>
            <Stack spacing={0.8} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Sửa Chữa Cân', 'Bảo Trì Định Kỳ', 'Kiểm Định Cân', 'Lắp Đặt', 'Tư Vấn KT'].map(s => (
                <Box component="li" key={s}>
                  <Stack direction="row" spacing={0.6} alignItems="center"
                    sx={{ color: '#90a4ae', cursor: 'pointer', '&:hover': { color: '#fff' }, transition: 'color .2s' }}>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, color: '#c62828' }} />
                    <Typography sx={{ fontSize: 13 }}>{s}</Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#ef9a9a', textTransform: 'uppercase', letterSpacing: 0.8, mb: 1.5 }}>
              Liên Hệ
            </Typography>
            <Stack spacing={1.5}>
              {[
                { city: 'CN Huế', addr: company.address1, phone: company.phone1, color: '#ef9a9a' },
                { city: 'CN Đà Nẵng', addr: company.address2, phone: company.phone2, color: '#90caf9' },
              ].map(b => (
                <Box key={b.city}>
                  <Stack direction="row" spacing={1} alignItems="flex-start" mb={0.4}>
                    <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 13, color: b.color, marginTop: 3, flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{ fontSize: 12, color: b.color, fontWeight: 600 }}>{b.city}</Typography>
                      <Typography sx={{ fontSize: 12.5, color: '#90a4ae', wordBreak: 'break-word' }}>{b.addr}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" pl={0.3}>
                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: 12, color: b.color }} />
                    <Link href={`tel:${b.phone.replace(/\s/g,'')}`}
                      sx={{ fontSize: 13.5, color: '#ccc', fontWeight: 700, '&:hover': { color: b.color } }}>
                      {b.phone}
                    </Link>
                  </Stack>
                </Box>
              ))}
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 13, color: '#ef9a9a' }} />
                <Link href={`mailto:${company.email}`}
                  sx={{ fontSize: 13, color: '#90a4ae', wordBreak: 'break-all', '&:hover': { color: '#fff' } }}>
                  {company.email}
                </Link>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faClock} style={{ fontSize: 13, color: '#f9a825' }} />
                <Typography sx={{ fontSize: 13, color: '#90a4ae' }}>{company.hours}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ borderColor: 'rgba(255,255,255,.06)' }} />

      {/* Bottom bar */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography sx={{ fontSize: 12.5, color: '#546e7a', textAlign: { xs: 'center', sm: 'left' } }}>
            © {new Date().getFullYear()} Cân Điện Tử Bách Khoa. Đã đăng ký bản quyền.
          </Typography>
          <Stack direction="row" spacing={2}>
            {['Chính sách bảo mật', 'Điều khoản'].map(t => (
              <Link key={t} href="#" sx={{ fontSize: 12, color: '#546e7a', '&:hover': { color: '#ef9a9a' } }}>{t}</Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
