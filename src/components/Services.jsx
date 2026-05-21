import { Box, Container, Grid, Typography, Paper, Stack, Button, Divider, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAdmin } from '../context/AdminContext';

const PROCESS = [
  { step: '01', title: 'Liên Hệ', desc: 'Gọi hotline hoặc Zalo, KTV tư vấn ngay.' },
  { step: '02', title: 'Khảo Sát', desc: 'KTV đến tận nơi kiểm tra, báo giá cụ thể.' },
  { step: '03', title: 'Sửa Chữa', desc: 'Thực hiện nhanh, thay linh kiện chính hãng.' },
  { step: '04', title: 'Bàn Giao', desc: 'Kiểm tra lại, bảo hành sau sửa chữa 3 tháng.' },
];

export default function Services() {
  const { siteData } = useAdmin();
  const { services, company } = siteData;

  return (
    <Box component="main" sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg,#8e0000,#c62828)', color: '#fff', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Typography component="h1" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '20px', md: '34px' } }}>
            DỊCH VỤ SỬA CHỮA & BẢO TRÌ
          </Typography>
          <Typography sx={{ opacity: 0.88, fontSize: { xs: 12.5, md: 15 }, mb: 2, maxWidth: 560 }}>
            Chuyên sửa chữa tất cả các loại cân điện tử tại Huế và Đà Nẵng. KTV có mặt trong 2 giờ.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
              variant="contained" startIcon={<PhoneIcon />}
              sx={{ background: '#fff', color: '#c62828', fontWeight: 700, fontSize: { xs: 13, md: 14 }, '&:hover': { background: '#f5f5f5' } }}>
              {company.phone1} – CN Huế
            </Button>
            <Button component="a" href={`tel:${company.phone2.replace(/\s/g, '')}`}
              variant="outlined" startIcon={<PhoneIcon />}
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.65)', fontWeight: 600, fontSize: { xs: 13, md: 14 }, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
              {company.phone2} – CN Đà Nẵng
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1.5, md: 3 } }}>

        {/* Services cards */}
        <Grid container spacing={{ xs: 1.5, md: 2 }} mb={{ xs: 2, md: 3 }}>
          {services.map((s) => (
            <Grid item xs={12} sm={6} md={3} key={s.id}>
              <Paper elevation={0} sx={{
                p: { xs: 2, md: 2.5 }, height: '100%', borderRadius: 1,
                border: '1px solid #ebebeb', transition: 'all .25s',
                '&:hover': { boxShadow: '0 6px 20px rgba(198,40,40,.1)', borderColor: '#c62828', transform: 'translateY(-2px)' },
              }}>
                <Typography sx={{ fontSize: { xs: 30, md: 34 }, mb: 1.2 }}>{s.icon}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, md: 15 }, mb: 0.8, color: '#111' }}>
                  {s.title}
                </Typography>
                <Typography sx={{ fontSize: { xs: 12.5, md: 13 }, color: '#666', lineHeight: 1.65, mb: 1.5 }}>
                  {s.description}
                </Typography>
                <Divider sx={{ mb: 1.2 }} />
                <Stack spacing={0.7}>
                  {s.features.map((f, i) => (
                    <Stack key={i} direction="row" spacing={0.8} alignItems="flex-start">
                      <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: 15, mt: 0.15, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: { xs: 12, md: 12.5 }, color: '#555' }}>{f}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Process */}
        <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 }, borderRadius: 1, border: '1px solid #ebebeb' }}>
          <Typography sx={{ fontWeight: 700, color: '#111', mb: 0.4, fontSize: { xs: '15px', md: '19px' } }}>
            QUY TRÌNH LÀM VIỆC
          </Typography>
          <Typography sx={{ color: '#888', fontSize: { xs: 12, md: 13 }, mb: { xs: 2, md: 3 } }}>
            4 bước đơn giản – minh bạch – chuyên nghiệp
          </Typography>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {PROCESS.map((p, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Stack alignItems="center" textAlign="center" sx={{ px: { xs: 0.5, md: 1 } }}>
                  <Avatar sx={{
                    width: { xs: 44, md: 52 }, height: { xs: 44, md: 52 },
                    background: 'linear-gradient(135deg,#c62828,#e65100)',
                    fontSize: { xs: 16, md: 19 }, fontWeight: 800, mb: 1.2,
                  }}>
                    {p.step}
                  </Avatar>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 13, md: 14 }, mb: 0.5 }}>{p.title}</Typography>
                  <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: '#666', lineHeight: 1.55 }}>{p.desc}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* CTA */}
        <Paper elevation={0} sx={{
          p: { xs: 2.5, md: 4 }, borderRadius: 1, textAlign: 'center',
          background: 'linear-gradient(135deg,#1b5e20,#2e7d32)', color: '#fff',
        }}>
          <Typography sx={{ fontWeight: 800, mb: 0.8, fontSize: { xs: '16px', md: '22px' } }}>
            Cân của bạn đang gặp sự cố?
          </Typography>
          <Typography sx={{ opacity: 0.88, mb: { xs: 2, md: 3 }, fontSize: { xs: 13, md: 15 } }}>
            Gọi ngay để KTV hỗ trợ tận nơi tại Huế &amp; Đà Nẵng.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent="center">
            <Button component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
              variant="contained" startIcon={<PhoneIcon />}
              sx={{ background: '#fff', color: '#1b5e20', fontWeight: 700, px: { xs: 3, md: 4 }, fontSize: { xs: 13, md: 14 }, '&:hover': { background: '#f5f5f5' } }}>
              {company.phone1} – CN Huế
            </Button>
            <Button component="a" href={`tel:${company.phone2.replace(/\s/g, '')}`}
              variant="outlined" startIcon={<PhoneIcon />}
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.65)', fontWeight: 600, px: { xs: 3, md: 4 }, fontSize: { xs: 13, md: 14 }, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
              {company.phone2} – CN Đà Nẵng
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
