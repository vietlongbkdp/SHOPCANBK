import { Box, Container, Stack, Typography, Link, IconButton, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import data from '../data.json';

const { company } = data;

export default function Header() {
  return (
    <Box>
      {/* Top Info Bar */}
      <Box sx={{ background: '#8e0000', color: 'white', py: 0.6, display: { xs: 'none', md: 'block' } }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={3} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 12 }}>{company.hours}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 12 }}>Chi nhánh Huế & Đà Nẵng</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Facebook">
                <IconButton size="small" sx={{ color: 'white', p: 0.3 }} href={company.facebook} target="_blank">
                  <FacebookIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
              <Typography sx={{ fontSize: 12 }}>|</Typography>
              <Link href={`tel:${company.phone1}`} sx={{ color: 'white', textDecoration: 'none', fontSize: 12 }}>
                Zalo: {company.phone1}
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Logo Bar */}
      <Box sx={{ background: 'white', borderBottom: '1px solid #e0e0e0', py: { xs: 1.5, md: 2 } }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{
                width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 },
                background: 'linear-gradient(135deg, #c62828, #e65100)',
                borderRadius: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: { xs: 24, md: 32 }, flexShrink: 0,
              }}>⚖️</Box>
              <Box>
                <Typography variant="h5" sx={{
                  fontWeight: 800, color: '#c62828', lineHeight: 1.1,
                  fontSize: { xs: '16px', sm: '20px', md: '24px' },
                  letterSpacing: 0.5,
                }}>
                  CÂN ĐIỆN TỬ BÁCH KHOA
                </Typography>
                <Typography sx={{ color: '#666', fontSize: { xs: '11px', md: '13px' }, fontStyle: 'italic' }}>
                  {company.slogan}
                </Typography>
              </Box>
            </Stack>

            {/* Contact Numbers */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm: 2 }}>
              {[
                { label: 'Chi nhánh Huế', phone: company.phone1 },
                { label: 'Chi nhánh Đà Nẵng', phone: company.phone2 },
              ].map(({ label, phone }) => (
                <Link key={phone} href={`tel:${phone.replace(/\s/g, '')}`} underline="none">
                  <Stack direction="row" alignItems="center" spacing={1}
                    sx={{
                      background: '#c62828', color: 'white', px: { xs: 1.5, md: 2 }, py: { xs: 0.6, md: 0.8 },
                      borderRadius: 1, transition: 'background 0.2s',
                      '&:hover': { background: '#8e0000' },
                    }}>
                    <PhoneIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                    <Box>
                      <Typography sx={{ fontSize: { xs: '9px', md: '10px' }, opacity: 0.85, lineHeight: 1 }}>{label}</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: { xs: '13px', md: '15px' }, lineHeight: 1.2 }}>{phone}</Typography>
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
