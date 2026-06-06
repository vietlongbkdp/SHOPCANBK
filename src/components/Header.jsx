import { Box, Container, Stack, Typography, Link, Chip, Divider, IconButton, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faPhone, faShieldHalved, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useAdmin } from '../context/AdminContext';

export default function Header({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company } = siteData;

  return (
    <Box component="header" sx={{ background: '#fff' }}>
      {/* Top info bar */}
      <Box sx={{ background: '#1a1a2e', color: 'rgba(255,255,255,.75)', display: { xs: 'none', lg: 'block' }, py: 0.6 }}>
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={3} alignItems="center" divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,.15)', my: 0.5 }} />}>
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faClock} style={{ fontSize: 12, color: '#f9a825' }} />
                <Typography sx={{ fontSize: 12 }}>{company.hours}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 12, color: '#ef9a9a' }} />
                <Typography sx={{ fontSize: 12 }}>{company.address1}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 12, color: '#90caf9' }} />
                <Typography sx={{ fontSize: 12 }}>{company.address2}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href={company.facebook} target="_blank" rel="noopener noreferrer"
                sx={{ color: '#90caf9', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.6, '&:hover': { color: '#fff' } }}>
                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 13 }} />
                Facebook
              </Link>
              <Link href={`https://zalo.me/${company.zalo}`} target="_blank" rel="noopener noreferrer"
                sx={{ color: '#a5d6a7', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.6, '&:hover': { color: '#fff' } }}>
                <FontAwesomeIcon icon={faComment} style={{ fontSize: 13 }} />
                Zalo
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Main header */}
      <Box sx={{ borderBottom: '1px solid #e8edf2', py: { xs: 1, md: 1.5 }, boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 3 }}>

            {/* Logo */}
            <Box onClick={() => onNavigate?.('home')}
              sx={{ cursor: 'pointer', flexShrink: 0, transition: 'opacity .2s', '&:hover': { opacity: .85 } }}>
              <Box component="img" src="/logo.jpg" alt="Cân Điện Tử Bách Khoa"
                sx={{ height: { xs: 52, sm: 60, md: 76 }, width: 'auto', objectFit: 'contain' }} />
            </Box>

            {/* Company info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography component="h1" onClick={() => onNavigate?.('home')}
                sx={{
                  fontWeight: 800, cursor: 'pointer',
                  fontSize: { xs: '14px', sm: '17px', md: '22px' },
                  background: 'linear-gradient(135deg,#1a237e,#c62828)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2, letterSpacing: 0.2,
                }}>
                CÂN ĐIỆN TỬ BÁCH KHOA
              </Typography>
              <Typography sx={{ color: '#e65100', fontWeight: 700, fontStyle: 'italic', fontSize: { xs: 10, sm: 11.5, md: 13 }, mt: 0.2 }}>
                Uy Tín – Chuyên Nghiệp – Nhanh Chóng
              </Typography>
              <Stack direction="row" spacing={0.8} mt={0.6} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {[
                  { icon: faShieldHalved, label: 'Chính hãng 100%', color: '#2e7d32' },
                  { icon: faScrewdriverWrench, label: 'Sửa chữa tận nơi', color: '#c62828' },
                  { icon: faLocationDot, label: 'Huế & Đà Nẵng', color: '#1565c0' },
                ].map((t) => (
                  <Chip key={t.label} size="small"
                    icon={<FontAwesomeIcon icon={t.icon} style={{ fontSize: 11, color: t.color, marginLeft: 8 }} />}
                    label={t.label}
                    sx={{ height: 22, fontSize: 11, fontWeight: 600, background: '#f5f7fa', color: '#444', border: '1px solid #e8edf2' }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Phone buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexShrink={0}>
              {[
                { label: 'CN Huế', phone: company.phone1, gradient: 'linear-gradient(135deg,#c62828,#e53935)', shadow: 'rgba(198,40,40,.35)' },
                { label: 'CN Đà Nẵng', phone: company.phone2, gradient: 'linear-gradient(135deg,#1565c0,#1e88e5)', shadow: 'rgba(21,101,192,.35)' },
              ].map(({ label, phone, gradient, shadow }) => (
                <Link key={phone} component="a" href={`tel:${phone.replace(/\s/g, '')}`}
                  sx={{ textDecoration: 'none' }}>
                  <Stack direction="row" alignItems="center" spacing={1}
                    sx={{
                      background: gradient, color: '#fff',
                      px: { xs: 1.2, md: 2 }, py: { xs: 0.7, md: 1 },
                      borderRadius: 2,
                      boxShadow: `0 4px 12px ${shadow}`,
                      transition: 'all .2s',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 6px 18px ${shadow}` },
                    }}>
                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />
                    <Box>
                      <Typography sx={{ fontSize: { xs: '9px', md: '10px' }, opacity: .8, lineHeight: 1, display: { xs: 'none', sm: 'block' } }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: '12px', md: '15px' }, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
                        {phone}
                      </Typography>
                    </Box>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
