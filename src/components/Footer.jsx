import { useState } from 'react';
import { Box, Container, Grid, Typography, Link, Stack, InputBase, Snackbar, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone, faEnvelope, faLocationDot, faClock, faAngleRight,
  faPaperPlane, faHeadset, faTruckFast, faShieldHalved, faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

const TRUST = [
  { icon: faShieldHalved, title: 'Bảo Hành Chính Hãng', desc: '12–36 tháng tùy sản phẩm' },
  { icon: faScrewdriverWrench, title: 'Sửa Chữa Tận Nơi', desc: 'Có mặt trong vòng 2 giờ' },
  { icon: faTruckFast, title: 'Giao Hàng Toàn Quốc', desc: 'Nhanh chóng, hỗ trợ COD' },
  { icon: faHeadset, title: 'Hỗ Trợ 24/7', desc: 'Tư vấn miễn phí qua Zalo' },
];

export default function Footer({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;
  const [email, setEmail] = useState('');
  const [snack, setSnack] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSnack(true); setEmail(''); }
  };

  return (
    <Box component="footer" sx={{ mt: 'auto' }}>
      {/* ── Trust bar (overlapping) ── */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{
          background: T.surface, borderRadius: 4, p: { xs: 2, md: 3 },
          boxShadow: '0 12px 40px rgba(15,23,36,.1)', border: `1px solid ${T.line}`,
          transform: { md: 'translateY(40px)' }, mb: { xs: 3, md: 0 },
        }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 2, md: 1 } }}>
            {TRUST.map((t, i) => (
              <Stack key={i} direction="row" spacing={1.5} alignItems="center"
                sx={{ px: { md: 1.5 }, borderRight: { md: i < TRUST.length - 1 ? `1px solid ${T.line}` : 'none' } }}>
                <Box sx={{ width: 44, height: 44, borderRadius: 2.5, background: T.gradient, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 16px ${T.brand}38` }}>
                  <FontAwesomeIcon icon={t.icon} style={{ fontSize: 18, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 12.5, md: 13.5 }, color: T.ink, lineHeight: 1.2 }}>{t.title}</Typography>
                  <Typography sx={{ fontSize: { xs: 10.5, md: 11.5 }, color: T.inkSoft, mt: 0.2 }}>{t.desc}</Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        </Box>
      </Container>

      {/* ── Main footer ── */}
      <Box sx={{ background: T.ink, color: '#fff', pt: { xs: 4, md: 9 } }}>
        <Container maxWidth="xl" sx={{ pb: 3 }}>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            {/* Brand + newsletter */}
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                <Box component="img" src="/logo.jpg" alt="Logo" sx={{ height: 56, borderRadius: 1.5 }} />
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: 16, lineHeight: 1.1 }}>CÂN ĐIỆN TỬ</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: 16, lineHeight: 1.1, color: T.accentLight }}>BÁCH KHOA</Typography>
                </Box>
              </Stack>
              <Typography sx={{ fontSize: 12.5, color: 'rgba(255,255,255,.5)', lineHeight: 1.75, mb: 2.5 }}>
                Chuyên sửa chữa, bảo trì tận nơi và cung cấp cân điện tử kỹ thuật số chính hãng tại Huế và Đà Nẵng.
              </Typography>

              {/* Newsletter — NEW */}
              <Typography sx={{ fontWeight: 700, fontSize: 12.5, mb: 1, color: '#fff' }}>
                Nhận tin khuyến mãi &amp; báo giá mới
              </Typography>
              <Box component="form" onSubmit={handleSubscribe}
                sx={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,.08)',
                  borderRadius: 2.5, overflow: 'hidden', border: '1px solid rgba(255,255,255,.14)', mb: 2.5,
                  '&:focus-within': { borderColor: T.accentLight } }}>
                <InputBase placeholder="Email của bạn" type="email" value={email} required
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ flex: 1, px: 1.8, py: 1, fontSize: 13, color: '#fff', '& input::placeholder': { color: 'rgba(255,255,255,.5)' } }} />
                <Box component="button" type="submit"
                  sx={{ background: T.gradient, border: 'none', color: '#fff', px: 2, py: 1.3, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', '&:hover': { filter: 'brightness(1.1)' } }}>
                  <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: 14 }} />
                </Box>
              </Box>

              {/* Social */}
              <Stack direction="row" spacing={1}>
                {[
                  { icon: faFacebook, href: company.facebook },
                  { icon: faYoutube, href: '#' },
                  { icon: faTiktok, href: '#' },
                ].map((s, i) => (
                  <Link key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    sx={{ width: 38, height: 38, borderRadius: 2, background: 'rgba(255,255,255,.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
                      '&:hover': { background: T.gradient, transform: 'translateY(-3px)' } }}>
                    <FontAwesomeIcon icon={s.icon} style={{ fontSize: 16, color: '#fff' }} />
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Products */}
            <Grid item xs={6} md={2}>
              <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: T.accentLight, letterSpacing: '0.08em', mb: 1.8 }}>SẢN PHẨM</Typography>
              <Stack spacing={1} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {categories.slice(0, 6).map(c => (
                  <Box component="li" key={c.id}>
                    <Stack direction="row" spacing={0.7} alignItems="center" onClick={() => onNavigate?.('products')}
                      sx={{ color: 'rgba(255,255,255,.55)', cursor: 'pointer', transition: 'all .2s', '&:hover': { color: '#fff', pl: 0.5 } }}>
                      <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 10, color: T.accentLight }} />
                      <Typography sx={{ fontSize: 13 }}>{c.name}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Quick links */}
            <Grid item xs={6} md={2}>
              <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: T.accentLight, letterSpacing: '0.08em', mb: 1.8 }}>LIÊN KẾT</Typography>
              <Stack spacing={1} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {[
                  { label: 'Trang Chủ', page: 'home' },
                  { label: 'Giới Thiệu', page: 'introduction' },
                  { label: 'Sản Phẩm', page: 'products' },
                  { label: 'Sửa Chữa', page: 'services' },
                  { label: 'Liên Hệ', page: 'contact' },
                ].map(l => (
                  <Box component="li" key={l.page}>
                    <Stack direction="row" spacing={0.7} alignItems="center" onClick={() => onNavigate?.(l.page)}
                      sx={{ color: 'rgba(255,255,255,.55)', cursor: 'pointer', transition: 'all .2s', '&:hover': { color: '#fff', pl: 0.5 } }}>
                      <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 10, color: T.accentLight }} />
                      <Typography sx={{ fontSize: 13 }}>{l.label}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Contact */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: T.accentLight, letterSpacing: '0.08em', mb: 1.8 }}>HỆ THỐNG CHI NHÁNH</Typography>
              <Stack spacing={1.5}>
                {[
                  { city: 'CN Huế', addr: company.address1, phone: company.phone1 },
                  { city: 'CN Đà Nẵng', addr: company.address2, phone: company.phone2 },
                ].map(b => (
                  <Box key={b.city} sx={{ background: 'rgba(255,255,255,.04)', borderRadius: 2.5, p: 1.5, border: '1px solid rgba(255,255,255,.08)' }}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 13, color: T.accentLight, marginTop: 3, flexShrink: 0 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 12.5, color: '#fff', fontWeight: 700 }}>{b.city}</Typography>
                        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,.55)', wordBreak: 'break-word', mb: 0.6 }}>{b.addr}</Typography>
                        <Link href={`tel:${b.phone.replace(/\s/g,'')}`}
                          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, fontSize: 13.5, color: T.accentLight, fontWeight: 700, '&:hover': { color: '#fff' } }}>
                          <FontAwesomeIcon icon={faPhone} style={{ fontSize: 11 }} />{b.phone}
                        </Link>
                      </Box>
                    </Stack>
                  </Box>
                ))}
                <Stack direction="row" spacing={1} alignItems="center">
                  <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 12, color: T.accentLight }} />
                  <Link href={`mailto:${company.email}`}
                    sx={{ fontSize: 13, color: 'rgba(255,255,255,.55)', wordBreak: 'break-all', '&:hover': { color: '#fff' } }}>{company.email}</Link>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ height: 1, background: 'rgba(255,255,255,.08)', my: 2.5 }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,.4)', textAlign: { xs: 'center', sm: 'left' } }}>
              © {new Date().getFullYear()} Cân Điện Tử Bách Khoa. Đã đăng ký bản quyền.
            </Typography>
            <Stack direction="row" spacing={2}>
              {['Chính sách bảo mật', 'Điều khoản'].map(t => (
                <Link key={t} href="#" sx={{ fontSize: 12, color: 'rgba(255,255,255,.4)', '&:hover': { color: T.accentLight } }}>{t}</Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          Đăng ký nhận tin thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
}
