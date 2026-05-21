import { Box, Container, Stack, Typography, Link, IconButton, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAdmin } from '../context/AdminContext';

export default function Header() {
  const { siteData } = useAdmin();
  const { company } = siteData;

  return (
    <Box component="header">
      {/* Top bar — md+ only */}
      <Box sx={{ background: '#8e0000', color: '#fff', py: 0.5, display: { xs: 'none', md: 'block' } }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={3} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 13 }} />
                <Typography component="span" sx={{ fontSize: 12 }}>{company.hours}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 13 }} />
                <Typography component="span" sx={{ fontSize: 12 }}>Chi nhánh Huế &amp; Đà Nẵng</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Tooltip title="Facebook">
                <IconButton component="a" href={company.facebook} target="_blank" rel="noopener noreferrer"
                  size="small" sx={{ color: '#fff', p: 0.2 }} aria-label="Facebook">
                  <FacebookIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
              <Link href={`https://zalo.me/${company.zalo}`} target="_blank" rel="noopener noreferrer"
                sx={{ color: '#fff', fontSize: 12 }}>
                💬 Zalo: {company.phone1}
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Logo bar */}
      <Box sx={{ background: '#fff', borderBottom: '2px solid #f0f0f0', py: { xs: 1, md: 1.8 } }}>
        <Container maxWidth="lg" >
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>

            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 1.5 }} sx={{ minWidth: 0, flex: 1 }}>
              <Box sx={{
                width: { xs: 38, md: 56 }, height: { xs: 38, md: 56 },
                background: 'linear-gradient(135deg,#c62828,#e65100)',
                borderRadius: 1.5, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: { xs: 20, md: 28 }, flexShrink: 0,
              }} role="img" aria-label="Logo">⚖️</Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography component="h1" sx={{
                  fontWeight: 800, color: '#c62828', lineHeight: 1.15,
                  fontSize: { xs: '13.5px', sm: '17px', md: '22px' },
                  letterSpacing: 0.2,
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                }}>
                  CÂN ĐIỆN TỬ BÁCH KHOA
                </Typography>
                <Typography sx={{
                  color: '#999', fontStyle: 'italic',
                  fontSize: { xs: '10px', md: '12px' },
                  display: { xs: 'none', sm: 'block' },
                }}>
                  {company.slogan}
                </Typography>
              </Box>
            </Stack>

            {/* Phone buttons */}
            <Stack direction="row" spacing={{ xs: 0.6, md: 1 }} flexShrink={0}>
              {[
                { label: 'CN Huế', phone: company.phone1 },
                { label: 'CN Đà Nẵng', phone: company.phone2 },
              ].map(({ label, phone }) => (
                <Link key={phone} component="a" href={`tel:${phone.replace(/\s/g, '')}`}
                  aria-label={`Gọi ${label}`}>
                  <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, md: 0.8 }}
                    sx={{
                      background: '#c62828', color: '#fff',
                      px: { xs: 1, md: 1.8 }, py: { xs: 0.5, md: 0.9 },
                      borderRadius: 1, transition: 'background .2s',
                      '&:hover': { background: '#8e0000' },
                    }}>
                    <PhoneIcon sx={{ fontSize: { xs: 13, md: 16 } }} />
                    <Box>
                      <Typography sx={{ fontSize: { xs: '9px', md: '10px' }, opacity: 0.82, lineHeight: 1, display: { xs: 'none', sm: 'block' } }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: { xs: '12px', md: '14px' }, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
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
