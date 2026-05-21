import { Box, Container, Grid, Typography, Paper, Stack, Chip, Avatar, Divider, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import data from '../data.json';

const { services, company } = data;

const PROCESS = [
  { step: '01', title: 'Liên Hệ', desc: 'Gọi hotline hoặc Zalo để mô tả sự cố, kỹ thuật viên tư vấn ngay.' },
  { step: '02', title: 'Khảo Sát', desc: 'KTV đến tận nơi kiểm tra, báo giá cụ thể trước khi tiến hành.' },
  { step: '03', title: 'Sửa Chữa', desc: 'Thực hiện sửa chữa nhanh chóng, thay thế linh kiện chính hãng.' },
  { step: '04', title: 'Bàn Giao', desc: 'Kiểm tra lại, bàn giao và bảo hành sau sửa chữa 3 tháng.' },
];

export default function Services() {
  return (
    <Box sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg, #8e0000, #c62828)', color: 'white', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '22px', md: '36px' } }}>
            DỊCH VỤ SỬA CHỮA & BẢO TRÌ CÂN ĐIỆN TỬ
          </Typography>
          <Typography sx={{ opacity: 0.9, fontSize: { xs: 13, md: 16 }, mb: 2, maxWidth: 600 }}>
            Chuyên sửa chữa tất cả các loại cân điện tử tại Huế và Đà Nẵng. Kỹ thuật viên có mặt trong 2 giờ.
          </Typography>
          <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1}>
            <Button variant="contained"
              onClick={() => window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`}
              startIcon={<PhoneIcon />}
              sx={{ background: 'white', color: '#c62828', fontWeight: 700, '&:hover': { background: '#f5f5f5' } }}
            >
              {company.phone1} (Huế)
            </Button>
            <Button variant="outlined"
              onClick={() => window.location.href = `tel:${company.phone2.replace(/\s/g, '')}`}
              startIcon={<PhoneIcon />}
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)', fontWeight: 600, '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' } }}
            >
              {company.phone2} (Đà Nẵng)
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 1.5, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Services Grid */}
        <Grid container spacing={2} mb={3}>
          {services.map((s) => (
            <Grid item xs={12} sm={6} md={3} key={s.id}>
              <Paper sx={{
                p: 2.5, height: '100%', borderRadius: 1, border: '1px solid #e8e8e8',
                transition: 'all 0.25s',
                '&:hover': { boxShadow: '0 6px 20px rgba(198,40,40,0.12)', borderColor: '#c62828', transform: 'translateY(-3px)' },
              }}>
                <Typography sx={{ fontSize: 36, mb: 1.5 }}>{s.icon}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1, color: '#212121' }}>{s.title}</Typography>
                <Typography sx={{ fontSize: 13, color: '#666', lineHeight: 1.6, mb: 2 }}>{s.description}</Typography>
                <Divider sx={{ my: 1 }} />
                <Stack spacing={0.8} mt={1.5}>
                  {s.features.map((f, i) => (
                    <Stack key={i} direction="row" spacing={0.8} alignItems="flex-start">
                      <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: 16, mt: 0.1, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: 12.5, color: '#555' }}>{f}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Process */}
        <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#212121', mb: 0.5 }}>QUY TRÌNH LÀM VIỆC</Typography>
          <Typography sx={{ color: '#666', fontSize: 13, mb: 3 }}>4 bước đơn giản – minh bạch – chuyên nghiệp</Typography>
          <Grid container spacing={2}>
            {PROCESS.map((p, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box sx={{ textAlign: 'center', px: 1 }}>
                  <Avatar sx={{
                    width: 56, height: 56, background: 'linear-gradient(135deg, #c62828, #e65100)',
                    fontSize: 20, fontWeight: 800, mx: 'auto', mb: 1.5,
                  }}>
                    {p.step}
                  </Avatar>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.8 }}>{p.title}</Typography>
                  <Typography sx={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{p.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* CTA */}
        <Paper sx={{
          p: { xs: 2, md: 4 }, borderRadius: 1, textAlign: 'center',
          background: 'linear-gradient(135deg, #1b5e20, #2e7d32)', color: 'white',
        }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Cân của bạn đang gặp sự cố?</Typography>
          <Typography sx={{ opacity: 0.9, mb: 3, fontSize: 15 }}>
            Đừng lo! Gọi ngay để được kỹ thuật viên tư vấn và hỗ trợ tận nơi tại Huế & Đà Nẵng.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
            <Button variant="contained" size="large" startIcon={<PhoneIcon />}
              onClick={() => window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`}
              sx={{ background: 'white', color: '#1b5e20', fontWeight: 700, px: 4, '&:hover': { background: '#f5f5f5' } }}
            >
              {company.phone1} – CN Huế
            </Button>
            <Button variant="outlined" size="large" startIcon={<PhoneIcon />}
              onClick={() => window.location.href = `tel:${company.phone2.replace(/\s/g, '')}`}
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)', fontWeight: 600, px: 4, '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' } }}
            >
              {company.phone2} – CN Đà Nẵng
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
