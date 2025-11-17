import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ với bạn sớm.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box sx={{ flex: 1, py: { xs: 3, sm: 4, md: 6 }, background: '#f9f9f9' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#d32f2f',
            mb: { xs: 3, sm: 4, md: 6 },
            textTransform: 'uppercase',
            letterSpacing: { xs: 0.5, sm: 1, md: 2 },
            fontSize: { xs: '20px', sm: '28px', md: '38px' },
          }}
        >
          Liên Hệ
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Contact Info */}
          <Grid item xs={12} sm={12} md={5}>
            <Paper sx={{ p: 4, background: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                CÔNG TY CÂN ĐIỆN TỬ HOÀNG GIA
              </Typography>

              {/* Address */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <LocationOnIcon sx={{ color: '#d32f2f', mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Địa chỉ:
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Số 78 đường 10/3, P. Buôn Ma Thuột, Tỉnh Đắk Lắk, Việt Nam.
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Phone */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <PhoneIcon sx={{ color: '#d32f2f', mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Điện thoại:
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    02623.821 888 – 0981912347
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Email */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <EmailIcon sx={{ color: '#d32f2f', mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Email:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="a"
                    href="mailto:info@candientu.vn"
                    sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#d32f2f' } }}
                  >
                    info@candientu.vn
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Hours */}
              <Stack direction="row" spacing={2}>
                <AccessTimeIcon sx={{ color: '#d32f2f', mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Giờ mở cửa:
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    7:30 AM – 5:30 PM (Thứ 2 – Thứ 7)
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Chủ nhật: Đóng cửa
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} sm={12} md={7}>
            <Paper sx={{ p: 4, background: 'white' }}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* Name */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Your name
                    </Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Nhập tên của bạn"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#d32f2f',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d32f2f',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Email */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Your email
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Nhập email của bạn"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#d32f2f',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d32f2f',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Subject */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Subject
                    </Typography>
                    <TextField
                      fullWidth
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Nhập tiêu đề"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#d32f2f',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d32f2f',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Message */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Your message (optional)
                    </Typography>
                    <TextField
                      fullWidth
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Nhập tin nhắn của bạn"
                      multiline
                      rows={5}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#d32f2f',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d32f2f',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background: '#1976d2',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '16px',
                      py: 1.5,
                      textTransform: 'uppercase',
                      '&:hover': {
                        background: '#1565c0',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* Google Map */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#333' }}>
            Vị Trí Cửa Hàng
          </Typography>
          <Paper sx={{ p: 0, overflow: 'hidden', height: 500, boxShadow: 3 }}>
            <iframe
              title="Google Map - Cân Điện Tử Hoàng Gia"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.0394894029155!2d108.00430937520127!3d12.664849287349706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31723e7e7e7e7e7f%3A0x1234567890abcdef!2s78%20%C4%90%C6%B0%E1%BB%9Dng%2010%2F3%2C%20Bu%C3%B4n%20Ma%20Thu%E1%BB%99t%2C%20%C4%90%E1%BA%AFk%20L%E1%BA%AFk!5e0!3m2!1svi!2s!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>

          {/* Map Info */}
          <Paper sx={{ p: 3, mt: 3, background: '#f5f5f5' }}>
            <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
              <strong>📍 Địa chỉ:</strong> Số 78 đường 10/3, P. Buôn Ma Thuột, Tỉnh Đắk Lắk, Việt Nam<br />
              <strong>📞 Điện thoại:</strong> 02623.821 888 – 0981912347<br />
              <strong>⏰ Giờ mở cửa:</strong> 7:30 AM – 5:30 PM (Thứ 2 – Thứ 7)<br />
              <strong>✉️ Email:</strong> info@candientu.vn
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
