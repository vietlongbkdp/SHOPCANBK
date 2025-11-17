import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: '#212121',
        color: 'white',
        py: { xs: 3, sm: 4, md: 6 },
        mt: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          {/* About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: { xs: 1.5, md: 2 },
                color: '#d32f2f',
                textTransform: 'uppercase',
                letterSpacing: { xs: 0.5, md: 1 },
                fontSize: { xs: '13px', sm: '14px', md: '16px' },
              }}
            >
              Về Chúng Tôi
            </Typography>
            <Stack spacing={1}>
              {['Giới thiệu', 'Tin tức', 'Blog'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: '#bdbdbd',
                    textDecoration: 'none',
                    fontSize: { xs: '12px', sm: '13px', md: '14px' },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#d32f2f',
                      pl: 1,
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Policies */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: { xs: 1.5, md: 2 },
                color: '#d32f2f',
                textTransform: 'uppercase',
                letterSpacing: { xs: 0.5, md: 1 },
                fontSize: { xs: '13px', sm: '14px', md: '16px' },
              }}
            >
              Chính Sách
            </Typography>
            <Stack spacing={1}>
              {['Chính sách giao hàng', 'Chính sách trả hàng', 'Chính sách bảo hành'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: '#bdbdbd',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#d32f2f',
                      pl: 1,
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#d32f2f',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Hỗ Trợ
            </Typography>
            <Stack spacing={1}>
              {['Liên hệ', 'Câu hỏi thường gặp', 'Hướng dẫn mua hàng'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: '#bdbdbd',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#d32f2f',
                      pl: 1,
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#d32f2f',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Liên Hệ
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                📞 Hotline: 1900-5555
              </Typography>
              <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                📧 Email: info@candientu.vn
              </Typography>
              <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                📍 Địa chỉ: 123 Nguyễn Hue, TP.HCM
              </Typography>

              {/* Social Links */}
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <IconButton
                  color="inherit"
                  sx={{
                    background: '#d32f2f',
                    width: 40,
                    height: 40,
                    '&:hover': {
                      background: '#1976d2',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="inherit"
                  sx={{
                    background: '#d32f2f',
                    width: 40,
                    height: 40,
                    '&:hover': {
                      background: '#1976d2',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <YouTubeIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="inherit"
                  sx={{
                    background: '#d32f2f',
                    width: 40,
                    height: 40,
                    '&:hover': {
                      background: '#1976d2',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 3 }}>
          <Typography variant="body2" sx={{ color: '#bdbdbd', textAlign: 'center' }}>
            &copy; 2025 Cân Điện Tử Hoàng Gia. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
