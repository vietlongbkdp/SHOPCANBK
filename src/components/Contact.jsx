import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Stack, Paper, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import data from '../data.json';

const { company } = data;

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <Box sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #c62828, #e65100)', color: 'white', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '22px', md: '36px' } }}>LIÊN HỆ</Typography>
          <Typography sx={{ opacity: 0.9, fontSize: { xs: 13, md: 16 } }}>
            Cân Điện Tử Bách Khoa – Hỗ trợ tư vấn và sửa chữa tại Huế & Đà Nẵng
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2.5, mb: 2, borderRadius: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#c62828', mb: 2 }}>
                🏢 CÂN ĐIỆN TỬ BÁCH KHOA
              </Typography>

              {/* Branch 1 */}
              <Box mb={2}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, background: '#c62828', color: 'white', px: 1.5, py: 0.4, borderRadius: 1, display: 'inline-block', mb: 1.5 }}>
                  Chi Nhánh Huế
                </Typography>
                <Stack spacing={1.2}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <LocationOnIcon sx={{ color: '#c62828', mt: 0.2, fontSize: 18, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: 13.5, color: '#444' }}>{company.address1}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneIcon sx={{ color: '#c62828', fontSize: 18, flexShrink: 0 }} />
                    <Typography component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
                      sx={{ fontSize: 15, color: '#c62828', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      {company.phone1}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Branch 2 */}
              <Box mb={2}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, background: '#1565c0', color: 'white', px: 1.5, py: 0.4, borderRadius: 1, display: 'inline-block', mb: 1.5 }}>
                  Chi Nhánh Đà Nẵng
                </Typography>
                <Stack spacing={1.2}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <LocationOnIcon sx={{ color: '#1565c0', mt: 0.2, fontSize: 18, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: 13.5, color: '#444' }}>{company.address2}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneIcon sx={{ color: '#1565c0', fontSize: 18, flexShrink: 0 }} />
                    <Typography component="a" href={`tel:${company.phone2.replace(/\s/g, '')}`}
                      sx={{ fontSize: 15, color: '#1565c0', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      {company.phone2}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <EmailIcon sx={{ color: '#c62828', fontSize: 18 }} />
                  <Typography component="a" href={`mailto:${company.email}`}
                    sx={{ fontSize: 13.5, color: '#444', textDecoration: 'none', '&:hover': { color: '#c62828' } }}>
                    {company.email}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <AccessTimeIcon sx={{ color: '#c62828', fontSize: 18 }} />
                  <Typography sx={{ fontSize: 13.5, color: '#444' }}>{company.hours}</Typography>
                </Stack>
              </Stack>
            </Paper>

            {/* Map Chi nhánh Huế */}
            <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <Typography sx={{ p: 1.5, fontWeight: 700, fontSize: 13, background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                📍 Bản đồ Chi Nhánh Huế
              </Typography>
              <iframe
                title="Bản đồ Cân Điện Tử Bách Khoa Huế"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.085!2d107.5894!3d16.4637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13c3fa90c07%3A0x1234!2zMTMgVHLhuqduIFF1w70gS2hob8OhbmcsIEFuIEjDsmEsIEh14bq_!5e0!3m2!1svi!2s!4v1234567890"
                width="100%" height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
              />
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Gửi Yêu Cầu Hỗ Trợ</Typography>
              <Typography sx={{ color: '#666', fontSize: 13, mb: 2.5 }}>
                Điền thông tin, chúng tôi sẽ liên hệ lại trong vòng 30 phút trong giờ làm việc.
              </Typography>

              {sent && (
                <Box sx={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 1, p: 1.5, mb: 2 }}>
                  <Typography sx={{ color: '#2e7d32', fontWeight: 600, fontSize: 14 }}>
                    ✅ Cảm ơn! Chúng tôi sẽ liên hệ bạn sớm nhất có thể.
                  </Typography>
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField label="Họ và tên *" name="name" value={form.name} onChange={handleChange} required fullWidth size="small"
                    sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c62828' }, '& .MuiInputLabel-root.Mui-focused': { color: '#c62828' } }}
                  />
                  <TextField label="Số điện thoại *" name="phone" value={form.phone} onChange={handleChange} required fullWidth size="small" type="tel"
                    sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c62828' }, '& .MuiInputLabel-root.Mui-focused': { color: '#c62828' } }}
                  />
                  <TextField label="Nội dung yêu cầu" name="message" value={form.message} onChange={handleChange} fullWidth size="small" multiline rows={5}
                    placeholder="Mô tả sự cố hoặc yêu cầu của bạn..."
                    sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c62828' }, '& .MuiInputLabel-root.Mui-focused': { color: '#c62828' } }}
                  />
                  <Button type="submit" variant="contained" size="large"
                    sx={{ background: '#c62828', fontWeight: 700, py: 1.2, '&:hover': { background: '#8e0000' } }}
                  >
                    📨 Gửi Yêu Cầu
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 2.5 }} />

              {/* Quick contact */}
              <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1.5 }}>Hoặc liên hệ trực tiếp:</Typography>
              <Grid container spacing={1}>
                {[
                  { icon: '📞', label: 'Gọi CN Huế', value: company.phone1, action: `tel:${company.phone1.replace(/\s/g, '')}` },
                  { icon: '📞', label: 'Gọi CN Đà Nẵng', value: company.phone2, action: `tel:${company.phone2.replace(/\s/g, '')}` },
                  { icon: '💬', label: 'Zalo Tư Vấn', value: 'Zalo ngay', action: `https://zalo.me/${company.phone1.replace(/\s/g, '')}` },
                  { icon: '📘', label: 'Facebook', value: 'Nhắn tin FB', action: company.facebook },
                ].map((c, i) => (
                  <Grid item xs={6} key={i}>
                    <Button fullWidth variant="outlined" href={c.action} target="_blank"
                      sx={{ borderColor: '#e0e0e0', color: '#333', py: 1, fontSize: 12, fontWeight: 600, '&:hover': { borderColor: '#c62828', color: '#c62828', background: '#fff5f5' } }}
                    >
                      {c.icon} {c.value}
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
