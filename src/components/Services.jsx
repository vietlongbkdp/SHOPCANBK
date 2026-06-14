import { Box, Container, Grid, Typography, Stack, Button, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPhone, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
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
    <Box component="main" sx={{ background: '#f4f6f8', minHeight: '60vh' }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg,#8e0000,#c62828)', color: '#fff', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
            <FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: 24, color: '#ffcc02' }} />
            <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '20px', md: '32px' } }}>
              DỊCH VỤ SỬA CHỮA & BẢO TRÌ
            </Typography>
          </Stack>
          <Typography sx={{ opacity: .88, fontSize: { xs: 13, md: 15 }, mb: 2.5, maxWidth: 580 }}>
            Chuyên sửa chữa tất cả các loại cân điện tử tại Huế và Đà Nẵng. Kỹ thuật viên có mặt trong 2 giờ.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
            <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
              variant="contained" startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
              sx={{ background: '#fff', color: '#c62828', fontWeight: 700, fontSize: { xs: 13, md: 14 }, borderRadius: 2, '&:hover': { background: '#f5f5f5' } }}>
              {company.phone1} – CN Huế
            </Button>
            <Button component="a" href={`tel:${company.phone2.replace(/\s/g,'')}`}
              variant="outlined" startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600, fontSize: { xs: 13, md: 14 }, borderRadius: 2, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
              {company.phone2} – CN Đà Nẵng
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Service cards */}
        <Grid container spacing={{ xs: 1.5, md: 2 }} mb={{ xs: 2, md: 3 }}>
          {services.map(s => (
            <Grid item xs={12} sm={6} md={3} key={s.id}>
              <Box sx={{
                background: '#fff', borderRadius: 2, p: { xs: 2, md: 2.5 }, height: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,.06)', border: '1px solid #f0f0f0',
                transition: 'all .25s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(198,40,40,.12)', borderColor: '#c62828' },
              }}>
                <Typography sx={{ fontSize: { xs: 30, md: 34 }, mb: 1.2 }}>{s.icon}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, md: 15 }, mb: 0.8, color: '#1a1a2e' }}>{s.title}</Typography>
                <Typography sx={{ fontSize: { xs: 12.5, md: 13 }, color: '#78909c', lineHeight: 1.65, mb: 1.5 }}>{s.description}</Typography>
                <Divider sx={{ mb: 1.2 }} />
                <Stack spacing={0.7}>
                  {s.features.map((f, i) => (
                    <Stack key={i} direction="row" spacing={0.8} alignItems="flex-start">
                      <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 13, color: '#2e7d32', marginTop: 3, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: { xs: 12, md: 12.5 }, color: '#546e7a' }}>{f}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Process */}
        <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 }, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
          <Typography sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.4, fontSize: { xs: '16px', md: '20px' } }}>
            QUY TRÌNH LÀM VIỆC
          </Typography>
          <Typography sx={{ color: '#78909c', fontSize: { xs: 12.5, md: 13 }, mb: { xs: 2, md: 3 } }}>
            4 bước đơn giản – minh bạch – chuyên nghiệp
          </Typography>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {PROCESS.map((p, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Stack alignItems="center" textAlign="center">
                  <Box sx={{
                    width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 }, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#c62828,#e65100)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: { xs: 17, md: 20 }, fontWeight: 800, mb: 1.2,
                    boxShadow: '0 4px 12px rgba(198,40,40,.3)',
                  }}>
                    {p.step}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 13, md: 14 }, mb: 0.5 }}>{p.title}</Typography>
                  <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: '#78909c', lineHeight: 1.55 }}>{p.desc}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA */}
        <Box sx={{
          borderRadius: 2, p: { xs: 2.5, md: 4 }, textAlign: 'center',
          background: 'linear-gradient(135deg,#1b5e20,#2e7d32)', color: '#fff',
        }}>
          <Typography sx={{ fontWeight: 800, mb: 0.8, fontSize: { xs: '17px', md: '22px' } }}>
            Cân của bạn đang gặp sự cố?
          </Typography>
          <Typography sx={{ opacity: .88, mb: { xs: 2, md: 3 }, fontSize: { xs: 13, md: 15 } }}>
            Gọi ngay để KTV hỗ trợ tận nơi tại Huế &amp; Đà Nẵng.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent="center">
            <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
              variant="contained" startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
              sx={{ background: '#fff', color: '#1b5e20', fontWeight: 700, px: { xs: 3, md: 4 }, fontSize: { xs: 13, md: 14 }, borderRadius: 2, '&:hover': { background: '#f5f5f5' } }}>
              {company.phone1} – CN Huế
            </Button>
            <Button component="a" href={`tel:${company.phone2.replace(/\s/g,'')}`}
              variant="outlined" startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600, px: { xs: 3, md: 4 }, fontSize: { xs: 13, md: 14 }, borderRadius: 2, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
              {company.phone2} – CN Đà Nẵng
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
