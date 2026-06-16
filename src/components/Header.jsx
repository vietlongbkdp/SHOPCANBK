import { Box, Container, Stack, Typography, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

export default function Header({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company } = siteData;

  return (
    <Box component="header" sx={{ background: T.surface }}>
      {/* Utility bar */}
      <Box sx={{ background: T.ink, color: 'rgba(255,255,255,.7)', display: { xs: 'none', lg: 'block' } }}>
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 0.7 }}>
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Stack direction="row" spacing={0.8} alignItems="center">
                <FontAwesomeIcon icon={faClock} style={{ fontSize: 11, color: T.accentLight }} />
                <Typography sx={{ fontSize: 12 }}>{company.hours}</Typography>
              </Stack>
              <Box sx={{ width: 1, height: 12, background: 'rgba(255,255,255,.2)' }} />
              <Stack direction="row" spacing={0.8} alignItems="center">
                <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 11, color: T.accentLight }} />
                <Typography sx={{ fontSize: 12 }}>{company.address1} &nbsp;·&nbsp; {company.address2}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href={company.facebook} target="_blank" rel="noopener noreferrer"
                sx={{ color: 'rgba(255,255,255,.7)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.6, '&:hover': { color: '#fff' } }}>
                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 13 }} />Facebook
              </Link>
              <Link href={`https://zalo.me/${company.zalo}`} target="_blank" rel="noopener noreferrer"
                sx={{ color: 'rgba(255,255,255,.7)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.6, '&:hover': { color: '#fff' } }}>
                <FontAwesomeIcon icon={faComment} style={{ fontSize: 13 }} />Zalo
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Brand bar */}
      <Box sx={{ borderBottom: `1px solid ${T.line}` }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" spacing={{ xs: 1.2, md: 2 }} sx={{ py: { xs: 1, md: 1.4 } }}>

            {/* Logo */}
            <Box onClick={() => onNavigate?.('home')} sx={{ cursor: 'pointer', flexShrink: 0 }}>
              <Box component="img" src="/logo.jpg" alt="Cân Điện Tử Bách Khoa"
                sx={{ height: { xs: 46, sm: 56, md: 68 }, width: 'auto', display: 'block',
                  transition: 'transform .3s', '&:hover': { transform: 'scale(1.04)' } }} />
            </Box>

            {/* Name */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography component="h1" onClick={() => onNavigate?.('home')}
                sx={{
                  fontWeight: 900, cursor: 'pointer', lineHeight: 1.1, color: T.ink,
                  fontSize: { xs: '13px', sm: '17px', md: '22px' },
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                }}>
                CÂN ĐIỆN TỬ{' '}
                <Box component="span" sx={{
                  background: T.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>BÁCH KHOA</Box>
              </Typography>
              <Typography sx={{
                color: T.inkSoft, fontWeight: 600, fontSize: { xs: '9.5px', sm: '11px', md: '12.5px' }, mt: 0.2,
                letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                UY TÍN · CHUYÊN NGHIỆP · NHANH CHÓNG
              </Typography>
            </Box>

            {/* Phone CTAs */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.8} flexShrink={0}>
              {[
                { label: 'Chi nhánh Huế', phone: company.phone1 },
                { label: 'Chi nhánh Đà Nẵng', phone: company.phone2 },
              ].map(({ label, phone }, idx) => (
                <Link key={phone} component="a" href={`tel:${phone.replace(/\s/g,'')}`}>
                  <Stack direction="row" alignItems="center" spacing={1}
                    sx={{
                      background: idx === 0 ? T.gradient : T.surface,
                      color: idx === 0 ? '#fff' : T.brand,
                      border: idx === 0 ? 'none' : `1.5px solid ${T.brand}`,
                      px: { xs: 1.1, md: 1.8 }, py: { xs: 0.55, md: 0.85 }, borderRadius: 2.5,
                      boxShadow: idx === 0 ? `0 4px 14px ${T.brand}40` : 'none',
                      transition: 'all .2s',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 6px 18px ${T.brand}40` },
                    }}>
                    <Box sx={{
                      width: { xs: 22, md: 28 }, height: { xs: 22, md: 28 }, borderRadius: '50%',
                      background: idx === 0 ? 'rgba(255,255,255,.2)' : T.gradientSoft,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <FontAwesomeIcon icon={faPhone} style={{ fontSize: 11, color: idx === 0 ? '#fff' : T.brand }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: { xs: '8px', md: '9.5px' }, opacity: .8, lineHeight: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: '11.5px', md: '14px' }, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
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
