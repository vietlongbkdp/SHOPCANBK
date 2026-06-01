import { Box, Container, Stack, Typography, Link, IconButton, Chip, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAdmin } from '../context/AdminContext';

export default function Header({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company } = siteData;

  return (
    <Box component="header">
      {/* ── Top bar ── */}
      <Box sx={{ background: '#1a1a2e', color: '#ccc', py: 0.5, display: { xs: 'none', md: 'block' } }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2.5} alignItems="center" divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,.15)' }} />}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 13, color: '#f9a825' }} />
                <Typography sx={{ fontSize: 12 }}>{company.hours}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 13, color: '#ef9a9a' }} />
                <Typography sx={{ fontSize: 12 }}>13 Trần Quý Khoáng, Huế &amp; 293 Hà Huy Tập, Đà Nẵng</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Link href={company.facebook} target="_blank" rel="noopener noreferrer"
                sx={{ color: '#90caf9', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.4, '&:hover': { color: '#fff' } }}>
                <FacebookIcon sx={{ fontSize: 14 }} /> Facebook
              </Link>
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,.15)', my: 0.5 }} />
              <Link href={`https://zalo.me/${company.zalo}`} target="_blank" rel="noopener noreferrer"
                sx={{ color: '#a5d6a7', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.4, '&:hover': { color: '#fff' } }}>
                <WhatsAppIcon sx={{ fontSize: 14 }} /> Zalo
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ── Main header ── */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #ebebeb', py: { xs: 1, md: 1.5 } }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 3 }}>

            {/* Logo */}
            <Box onClick={() => onNavigate?.('home')}
              sx={{ cursor: 'pointer', flexShrink: 0, '&:hover img': { opacity: 0.88 } }}>
              <Box component="img" src="/logo.jpg" alt="Logo Cân Điện Tử Bách Khoa"
                sx={{
                  height: { xs: 56, md: 80 },
                  width: 'auto', objectFit: 'contain', display: 'block',
                  transition: 'opacity .2s',
                }}
              />
            </Box>

            {/* Company info — fills remaining space */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Name */}
              <Typography component="h1" onClick={() => onNavigate?.('home')}
                sx={{
                  fontWeight: 800, color: '#1a237e', cursor: 'pointer',
                  fontSize: { xs: '14px', sm: '18px', md: '24px' },
                  lineHeight: 1.2, letterSpacing: 0.3,
                  '&:hover': { color: '#c62828' }, transition: 'color .2s',
                }}>
                CÂN ĐIỆN TỬ BÁCH KHOA
              </Typography>

              {/* Slogan */}
              <Typography sx={{
                color: '#e65100', fontWeight: 700, fontStyle: 'italic',
                fontSize: { xs: '10px', sm: '12px', md: '13.5px' },
                mb: { xs: 0.5, md: 0.8 },
              }}>
                Uy Tín – Chuyên Nghiệp – Nhanh Chóng
              </Typography>

              {/* Tags — desktop only */}
              <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {[
                  { icon: <VerifiedIcon sx={{ fontSize: 12 }} />, label: 'Chính hãng 100%' },
                  { icon: <BuildIcon sx={{ fontSize: 12 }} />, label: 'Sửa chữa tận nơi' },
                  { icon: <LocationOnIcon sx={{ fontSize: 12 }} />, label: 'Huế & Đà Nẵng' },
                ].map((t) => (
                  <Chip key={t.label} icon={t.icon} label={t.label} size="small"
                    sx={{
                      height: 22, fontSize: 11, fontWeight: 600,
                      background: '#f5f5f5', color: '#444',
                      '& .MuiChip-icon': { color: '#c62828', fontSize: 12 },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Phone buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.8} flexShrink={0}>
              {[
                { label: 'CN Huế',     phone: company.phone1, color: '#c62828' },
                { label: 'CN Đà Nẵng', phone: company.phone2, color: '#1565c0' },
              ].map(({ label, phone, color }) => (
                <Link key={phone} component="a" href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Stack direction="row" alignItems="center" spacing={0.7}
                    sx={{
                      background: color, color: '#fff',
                      px: { xs: 1.2, md: 2 }, py: { xs: 0.6, md: 1 },
                      borderRadius: 1.5,
                      boxShadow: `0 2px 8px ${color}55`,
                      transition: 'all .2s',
                      '&:hover': { filter: 'brightness(0.88)', transform: 'translateY(-1px)' },
                    }}>
                    <PhoneIcon sx={{ fontSize: { xs: 14, md: 18 } }} />
                    <Box>
                      <Typography sx={{ fontSize: { xs: 9, md: 10 }, opacity: 0.85, lineHeight: 1, display: { xs: 'none', sm: 'block' } }}>
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
