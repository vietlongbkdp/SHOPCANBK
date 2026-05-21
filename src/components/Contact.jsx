import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Stack, Paper, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAdmin } from '../context/AdminContext';

export default function Contact() {
  const { siteData } = useAdmin();
  const { company } = siteData;
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <Box component="main" sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg,#c62828,#e65100)', color: '#fff', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg" >
          <Typography component="h1" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: '20px', md: '34px' } }}>
            LIÊN HỆ
          </Typography>
          <Typography sx={{ opacity: 0.88, fontSize: { xs: 12.5, md: 15 } }}>
            Cân Điện Tử Bách Khoa – Huế &amp; Đà Nẵng
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1.5, md: 3 } }}>
        <Grid container spacing={{ xs: 1.5, md: 3 }}>

          {/* Contact info */}
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, mb: { xs: 1.5, md: 0 }, borderRadius: 1, border: '1px solid #ebebeb' }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, md: 15 }, color: '#c62828', mb: 2 }}>
                🏢 CÂN ĐIỆN TỬ BÁCH KHOA
              </Typography>

              {[
                { city: 'Chi Nhánh Huế', addr: company.address1, phone: company.phone1, color: '#c62828' },
                { city: 'Chi Nhánh Đà Nẵng', addr: company.address2, phone: company.phone2, color: '#1565c0' },
              ].map((b, i) => (
                <Box key={i}>
                  {i > 0 && <Divider sx={{ my: 1.5 }} />}
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, md: 13 }, background: b.color, color: '#fff', px: 1.2, py: 0.35, borderRadius: 0.8, display: 'inline-block', mb: 1.2 }}>
                    {b.city}
                  </Typography>
                  <Stack spacing={0.8}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <LocationOnIcon sx={{ color: b.color, fontSize: 17, mt: 0.15, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: '#444' }}>{b.addr}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PhoneIcon sx={{ color: b.color, fontSize: 17, flexShrink: 0 }} />
                      <Typography component="a" href={`tel:${b.phone.replace(/\s/g, '')}`}
                        sx={{ fontSize: { xs: 14, md: 15 }, color: b.color, fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        {b.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}

              <Divider sx={{ my: 1.5 }} />
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon sx={{ color: '#c62828', fontSize: 16 }} />
                  <Typography component="a" href={`mailto:${company.email}`}
                    sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: '#444', textDecoration: 'none', '&:hover': { color: '#c62828' } }}>
                    {company.email}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ color: '#c62828', fontSize: 16 }} />
                  <Typography sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: '#444' }}>{company.hours}</Typography>
                </Stack>
              </Stack>
            </Paper>

            {/* Map */}
            <Paper elevation={0} sx={{ borderRadius: 1, overflow: 'hidden', border: '1px solid #ebebeb' }}>
              <Box sx={{ p: 1.2, background: '#fafafa', borderBottom: '1px solid #ebebeb' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 12.5 }}>📍 Bản đồ Chi Nhánh Huế</Typography>
              </Box>
              <Box
                component="iframe"
                title="Bản đồ Cân Điện Tử Bách Khoa Huế"
                src="https://maps.google.com/maps?q=13+Tr%E1%BA%A7n+Qu%C3%BD+Kho%C3%A1ng%2C+An+H%C3%B2a%2C+Th%C3%A0nh+ph%E1%BB%91+Hu%E1%BA%BF&output=embed"
                sx={{ width: '100%', height: { xs: 180, md: 220 }, border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
              />
            </Paper>
          </Grid>

          {/* Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 1, border: '1px solid #ebebeb' }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 15, md: 17 }, mb: 0.5 }}>
                Gửi Yêu Cầu Hỗ Trợ
              </Typography>
              <Typography sx={{ color: '#888', fontSize: { xs: 12, md: 13 }, mb: 2.5 }}>
                Chúng tôi sẽ liên hệ lại trong vòng 30 phút trong giờ làm việc.
              </Typography>

              {sent && (
                <Box sx={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 1, p: 1.5, mb: 2 }}>
                  <Typography sx={{ color: '#2e7d32', fontWeight: 600, fontSize: 13.5 }}>
                    ✅ Cảm ơn! Chúng tôi sẽ liên hệ bạn sớm nhất.
                  </Typography>
                </Box>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={1.5}>
                  <TextField label="Họ và tên *" name="name" value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    required fullWidth size="small"
                    sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c62828' }, '& .MuiInputLabel-root.Mui-focused': { color: '#c62828' } }}
                  />
                  <TextField label="Số điện thoại *" name="phone" type="tel" value={form.phone}
                    onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                    required fullWidth size="small"
                    sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c62828' }, '& .MuiInputLabel-root.Mui-focused': { color: '#c62828' } }}
                  />
                  <TextField label="Nội dung" name="message" value={form.message}
                    onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                    fullWidth size="small" multiline rows={4}
                    placeholder="Mô tả sự cố hoặc yêu cầu của bạn..."
                    sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c62828' }, '& .MuiInputLabel-root.Mui-focused': { color: '#c62828' } }}
                  />
                  <Button type="submit" variant="contained" fullWidth size="large"
                    sx={{ background: '#c62828', fontWeight: 700, py: { xs: 1, md: 1.2 }, fontSize: { xs: 13.5, md: 15 }, '&:hover': { background: '#8e0000' } }}>
                    📨 Gửi Yêu Cầu
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1.2 }}>Hoặc liên hệ trực tiếp:</Typography>
              <Grid container spacing={1}>
                {[
                  { label: `📞 ${company.phone1}`, href: `tel:${company.phone1.replace(/\s/g, '')}` },
                  { label: `📞 ${company.phone2}`, href: `tel:${company.phone2.replace(/\s/g, '')}` },
                  { label: '💬 Zalo Tư Vấn', href: `https://zalo.me/${company.zalo}` },
                  { label: '📘 Facebook', href: company.facebook },
                ].map((c, i) => (
                  <Grid item xs={6} key={i}>
                    <Button fullWidth variant="outlined" component="a" href={c.href} target="_blank"
                      sx={{ borderColor: '#e0e0e0', color: '#333', py: 0.9, fontSize: { xs: 12, md: 12.5 }, fontWeight: 600, '&:hover': { borderColor: '#c62828', color: '#c62828', background: '#fff5f5' } }}>
                      {c.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
