import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import data from '../data.json';

const { company, categories } = data;

export default function Footer() {
  return (
    <Box component="footer" sx={{ background: '#1a1a1a', color: 'white', pt: { xs: 3, md: 5 }, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} mb={3}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1.5}>
              <Box sx={{
                width: 44, height: 44, background: 'linear-gradient(135deg, #c62828, #e65100)',
                borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>⚖️</Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#fff', lineHeight: 1.2 }}>CÂN ĐIỆN TỬ BÁCH KHOA</Typography>
                <Typography sx={{ fontSize: 12, color: '#f44336', fontStyle: 'italic' }}>{company.slogan}</Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: 13, color: '#aaa', lineHeight: 1.7, mb: 2 }}>
              Chuyên sửa chữa, bảo trì tận nơi và cung cấp cân điện tử kỹ thuật số tại Huế và Đà Nẵng. Giao hàng toàn quốc.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton href={company.facebook} target="_blank"
                sx={{ background: '#3b5998', width: 36, height: 36, '&:hover': { background: '#2d4373' } }}>
                <FacebookIcon sx={{ color: 'white', fontSize: 18 }} />
              </IconButton>
              <IconButton
                sx={{ background: '#ff0000', width: 36, height: 36, '&:hover': { background: '#cc0000' } }}>
                <YouTubeIcon sx={{ color: 'white', fontSize: 18 }} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Products */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#f44336', textTransform: 'uppercase', mb: 1.5, letterSpacing: 0.5 }}>
              Sản Phẩm
            </Typography>
            <Stack spacing={0.8}>
              {categories.slice(0, 6).map(c => (
                <Link key={c.id} href="#" underline="hover" sx={{ color: '#aaa', fontSize: 13, '&:hover': { color: '#f44336' }, transition: 'color 0.2s' }}>
                  {c.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#f44336', textTransform: 'uppercase', mb: 1.5, letterSpacing: 0.5 }}>
              Dịch Vụ
            </Typography>
            <Stack spacing={0.8}>
              {['Sửa Chữa Tận Nơi', 'Bảo Trì Định Kỳ', 'Kiểm Định Cân', 'Lắp Đặt Hệ Thống', 'Tư Vấn Kỹ Thuật'].map(s => (
                <Link key={s} href="#" underline="hover" sx={{ color: '#aaa', fontSize: 13, '&:hover': { color: '#f44336' }, transition: 'color 0.2s' }}>
                  {s}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#f44336', textTransform: 'uppercase', mb: 1.5, letterSpacing: 0.5 }}>
              Liên Hệ
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOnIcon sx={{ color: '#f44336', fontSize: 16, mt: 0.2, flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#f44336', fontWeight: 600 }}>Chi nhánh Huế:</Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#aaa' }}>{company.address1}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOnIcon sx={{ color: '#1565c0', fontSize: 16, mt: 0.2, flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#64b5f6', fontWeight: 600 }}>Chi nhánh Đà Nẵng:</Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#aaa' }}>{company.address2}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon sx={{ color: '#f44336', fontSize: 16 }} />
                <Link href={`tel:${company.phone1.replace(/\s/g, '')}`} sx={{ color: '#aaa', fontSize: 13, '&:hover': { color: '#f44336' } }}>
                  {company.phone1} (Huế)
                </Link>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon sx={{ color: '#64b5f6', fontSize: 16 }} />
                <Link href={`tel:${company.phone2.replace(/\s/g, '')}`} sx={{ color: '#aaa', fontSize: 13, '&:hover': { color: '#64b5f6' } }}>
                  {company.phone2} (Đà Nẵng)
                </Link>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon sx={{ color: '#f44336', fontSize: 16 }} />
                <Link href={`mailto:${company.email}`} sx={{ color: '#aaa', fontSize: 13, '&:hover': { color: '#f44336' } }}>
                  {company.email}
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography sx={{ fontSize: 12.5, color: '#666' }}>
            © 2025 Cân Điện Tử Bách Khoa. Đã đăng ký bản quyền.
          </Typography>
          <Stack direction="row" spacing={2}>
            {['Chính sách bảo mật', 'Điều khoản sử dụng'].map(t => (
              <Link key={t} href="#" underline="hover" sx={{ fontSize: 12, color: '#666', '&:hover': { color: '#f44336' } }}>{t}</Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
