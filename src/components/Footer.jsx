import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAdmin } from '../context/AdminContext';

export default function Footer() {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;

  return (
    <Box component="footer" sx={{ background: '#1a1a1a', color: '#fff', pt: { xs: 3, md: 5 }, pb: 2 }}>
      <Container maxWidth="lg" >
        <Grid container spacing={{ xs: 3, md: 4 }} mb={{ xs: 2, md: 3 }}>

          {/* Brand */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1.5}>
              <Box sx={{
                width: 40, height: 40, background: 'linear-gradient(135deg,#c62828,#e65100)',
                borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }} aria-hidden>⚖️</Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: 13.5, md: 14.5 }, lineHeight: 1.2 }}>
                  CÂN ĐIỆN TỬ BÁCH KHOA
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: '#ef9a9a', fontStyle: 'italic' }}>{company.slogan}</Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: 12.5, color: '#999', lineHeight: 1.75, mb: 2 }}>
              Chuyên sửa chữa, bảo trì tận nơi và cung cấp cân điện tử kỹ thuật số tại Huế và Đà Nẵng.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton component="a" href={company.facebook} target="_blank" rel="noopener noreferrer"
                aria-label="Facebook" size="small"
                sx={{ background: '#3b5998', width: 32, height: 32, '&:hover': { background: '#2d4373' } }}>
                <FacebookIcon sx={{ color: '#fff', fontSize: 16 }} />
              </IconButton>
              <IconButton aria-label="YouTube" size="small"
                sx={{ background: '#cc0000', width: 32, height: 32, '&:hover': { background: '#aa0000' } }}>
                <YouTubeIcon sx={{ color: '#fff', fontSize: 16 }} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Products */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#ef9a9a', textTransform: 'uppercase', mb: 1.2, letterSpacing: 0.5 }}>
              Sản Phẩm
            </Typography>
            <Stack component="ul" spacing={0.7} sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {categories.slice(0, 6).map((c) => (
                <Box component="li" key={c.id}>
                  <Typography component="span" sx={{ color: '#aaa', fontSize: 12.5, cursor: 'pointer', '&:hover': { color: '#ef9a9a' }, transition: 'color .2s' }}>
                    {c.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#ef9a9a', textTransform: 'uppercase', mb: 1.2, letterSpacing: 0.5 }}>
              Dịch Vụ
            </Typography>
            <Stack component="ul" spacing={0.7} sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Sửa Chữa', 'Bảo Trì', 'Kiểm Định', 'Lắp Đặt', 'Tư Vấn'].map((s) => (
                <Box component="li" key={s}>
                  <Typography component="span"
                    sx={{ color: '#aaa', fontSize: 12.5, cursor: 'pointer', '&:hover': { color: '#ef9a9a' }, transition: 'color .2s' }}>
                    {s}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#ef9a9a', textTransform: 'uppercase', mb: 1.2, letterSpacing: 0.5 }}>
              Liên Hệ
            </Typography>
            <Stack spacing={1.2}>
              {[
                { city: 'CN Huế', addr: company.address1, phone: company.phone1, color: '#ef9a9a' },
                { city: 'CN Đà Nẵng', addr: company.address2, phone: company.phone2, color: '#90caf9' },
              ].map((b) => (
                <Box key={b.city}>
                  <Stack direction="row" spacing={0.8} alignItems="flex-start" mb={0.3}>
                    <LocationOnIcon sx={{ color: b.color, fontSize: 14, mt: 0.2, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: 12.5, color: '#bbb', lineHeight: 1.5 }}>
                      <Typography component="span" sx={{ color: b.color, fontWeight: 600, fontSize: 12 }}>{b.city}: </Typography>
                      {b.addr}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.8} alignItems="center" pl={0.3}>
                    <PhoneIcon sx={{ color: b.color, fontSize: 13 }} />
                    <Link href={`tel:${b.phone.replace(/\s/g, '')}`}
                      sx={{ color: '#ccc', fontSize: 13, fontWeight: 600, '&:hover': { color: b.color } }}>
                      {b.phone}
                    </Link>
                  </Stack>
                </Box>
              ))}
              <Stack direction="row" spacing={0.8} alignItems="center">
                <EmailIcon sx={{ color: '#ef9a9a', fontSize: 14 }} />
                <Link href={`mailto:${company.email}`}
                  sx={{ color: '#bbb', fontSize: 12.5, '&:hover': { color: '#ef9a9a' } }}>
                  {company.email}
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,.07)', mb: 2 }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={0.8}>
          <Typography sx={{ fontSize: 12, color: '#555', textAlign: { xs: 'center', sm: 'left' } }}>
            © {new Date().getFullYear()} Cân Điện Tử Bách Khoa. Đã đăng ký bản quyền.
          </Typography>
          <Stack direction="row" spacing={2}>
            {['Chính sách bảo mật', 'Điều khoản'].map((t) => (
              <Link key={t} href="#" sx={{ fontSize: 12, color: '#555', '&:hover': { color: '#ef9a9a' } }}>{t}</Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
