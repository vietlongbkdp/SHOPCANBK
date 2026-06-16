import { useState, useRef, useEffect } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Stack, Divider, Alert, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';
import { useAdmin } from '../context/AdminContext';

const EMAILJS_SERVICE_ID  = 'service_oe1k7lj';
const EMAILJS_TEMPLATE_ID = 'template_sron2yp';
const EMAILJS_PUBLIC_KEY  = '5jSMke5lav87ETG7V';

const COOLDOWN_MS   = 5 * 60 * 1000;   // 5 phút giữa 2 lần gửi
const MIN_FILL_MS   = 3000;            // phải mất ít nhất 3 giây điền form
const COOLDOWN_KEY  = 'bk_contact_last_sent';

export default function Contact() {
  const { siteData } = useAdmin();
  const { company } = siteData;
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error' | 'cooldown'
  const [cooldownLeft, setCooldownLeft] = useState(0); // giây còn lại
  const formRef = useRef(null);
  const honeypotRef = useRef('');           // bẫy bot
  const mountTimeRef = useRef(Date.now());  // thời điểm form load

  // Kiểm tra cooldown khi load + đếm ngược
  useEffect(() => {
    const checkCooldown = () => {
      const last = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
      const elapsed = Date.now() - last;
      if (last && elapsed < COOLDOWN_MS) {
        setCooldownLeft(Math.ceil((COOLDOWN_MS - elapsed) / 1000));
        return true;
      }
      setCooldownLeft(0);
      return false;
    };
    checkCooldown();
    const t = setInterval(checkCooldown, 1000);
    return () => clearInterval(t);
  }, []);

  const formatCooldown = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m} phút ${s} giây` : `${s} giây`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    // 1. Honeypot — nếu field ẩn có giá trị → là bot
    if (honeypotRef.current) {
      setStatus('success'); // giả vờ thành công để bot không biết
      setForm({ name: '', phone: '', message: '' });
      return;
    }

    // 2. Điền quá nhanh → nghi ngờ bot
    if (Date.now() - mountTimeRef.current < MIN_FILL_MS) {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
      return;
    }

    // 3. Cooldown — chặn gửi liên tục
    const last = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
    if (last && Date.now() - last < COOLDOWN_MS) {
      setStatus('cooldown');
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_phone: form.phone,
          message:    form.message || '(Không có nội dung)',
          to_email:   'vietlongbkdp@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', phone: '', message: '' });
      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const focusSx = { '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1565c0' }, '& .MuiInputLabel-root.Mui-focused': { color: '#1565c0' } };

  return (
    <Box component="main" sx={{ background: '#f4f6f8', minHeight: '60vh' }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg,#1565c0,#00b0ff)', color: '#fff', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="xl">
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '20px', md: '32px' }, mb: 0.5 }}>
            LIÊN HỆ
          </Typography>
          <Typography sx={{ opacity: .88, fontSize: { xs: 13, md: 15 } }}>
            Cân Điện Tử Bách Khoa – Huế &amp; Đà Nẵng
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 1.5, md: 3 }}>

          {/* Contact info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2, md: 2.5 }, mb: { xs: 1.5, md: 2 }, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, md: 15 }, color: '#1565c0', mb: 2 }}>
                🏢 CÂN ĐIỆN TỬ BÁCH KHOA
              </Typography>
              {[
                { city: 'Chi Nhánh Huế', addr: company.address1, phone: company.phone1, color: '#1565c0' },
                { city: 'Chi Nhánh Đà Nẵng', addr: company.address2, phone: company.phone2, color: '#1565c0' },
              ].map((b, i) => (
                <Box key={i}>
                  {i > 0 && <Divider sx={{ my: 1.5 }} />}
                  <Box sx={{ display: 'inline-block', background: b.color, color: '#fff', px: 1.2, py: 0.35, borderRadius: 1, mb: 1.2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, md: 13 } }}>{b.city}</Typography>
                  </Box>
                  <Stack spacing={0.8}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 15, color: b.color, marginTop: 3, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: '#37474f' }}>{b.addr}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FontAwesomeIcon icon={faPhone} style={{ fontSize: 15, color: b.color, flexShrink: 0 }} />
                      <Typography component="a" href={`tel:${b.phone.replace(/\s/g,'')}`}
                        sx={{ fontSize: { xs: 14, md: 15 }, color: b.color, fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}>
                        {b.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}
              <Divider sx={{ my: 1.5 }} />
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 14, color: '#1565c0' }} />
                  <Typography component="a" href={`mailto:${company.email}`}
                    sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: '#37474f', '&:hover': { color: '#1565c0' } }}>
                    {company.email}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FontAwesomeIcon icon={faClock} style={{ fontSize: 14, color: '#f9a825' }} />
                  <Typography sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: '#37474f' }}>{company.hours}</Typography>
                </Stack>
              </Stack>
            </Box>

            {/* Map */}
            <Box sx={{ background: '#fff', borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
              <Box sx={{ p: 1.2, background: '#fafbfc', borderBottom: '1px solid #eef0f3' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 12.5 }}>
                  <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 6, color: '#1565c0' }} />
                  Bản đồ Chi Nhánh Huế
                </Typography>
              </Box>
              <Box component="iframe" title="Bản đồ"
                src="https://maps.google.com/maps?q=13+Tr%E1%BA%A7n+Qu%C3%BD+Kho%C3%A1ng%2C+An+H%C3%B2a%2C+Th%C3%A0nh+ph%E1%BB%91+Hu%E1%BA%BF&output=embed"
                sx={{ width: '100%', height: { xs: 180, md: 220 }, border: 0, display: 'block' }}
                allowFullScreen loading="lazy" />
            </Box>
          </Grid>

          {/* Form */}
          <Grid item xs={12} md={7}>
            <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2, md: 3 }, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 15, md: 17 }, mb: 0.5 }}>Gửi Yêu Cầu Hỗ Trợ</Typography>
              <Typography sx={{ color: '#78909c', fontSize: { xs: 12, md: 13 }, mb: 2.5 }}>
                Chúng tôi sẽ liên hệ lại trong vòng 30 phút trong giờ làm việc.
              </Typography>

              {status === 'success' && (
                <Alert severity="success" sx={{ mb: 2, fontSize: 13.5, borderRadius: 2 }}>
                  ✅ Đã gửi yêu cầu thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.
                </Alert>
              )}
              {status === 'error' && (
                <Alert severity="error" sx={{ mb: 2, fontSize: 13.5, borderRadius: 2 }}>
                  ❌ Gửi không thành công. Vui lòng gọi trực tiếp {company.phone1} hoặc thử lại.
                </Alert>
              )}
              {status === 'cooldown' && (
                <Alert severity="warning" sx={{ mb: 2, fontSize: 13.5, borderRadius: 2 }}>
                  ⏳ Bạn vừa gửi yêu cầu. Vui lòng đợi <strong>{formatCooldown(cooldownLeft)}</strong> trước khi gửi tiếp.
                </Alert>
              )}

              <Box component="form" ref={formRef} onSubmit={handleSubmit}>
                <Stack spacing={1.5}>
                  {/* Honeypot — ẩn với người dùng, bẫy bot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={(e) => { honeypotRef.current = e.target.value; }}
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                    aria-hidden="true"
                  />
                  <TextField label="Họ và tên *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required fullWidth size="small" sx={focusSx} disabled={status === 'sending'} />
                  <TextField label="Số điện thoại *" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required fullWidth size="small" sx={focusSx} disabled={status === 'sending'} />
                  <TextField label="Nội dung" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} fullWidth size="small" multiline rows={4} placeholder="Mô tả sự cố hoặc yêu cầu..." sx={focusSx} disabled={status === 'sending'} />
                  <Button type="submit" variant="contained" fullWidth size="large"
                    disabled={status === 'sending' || !form.name || !form.phone || cooldownLeft > 0}
                    startIcon={status === 'sending'
                      ? <CircularProgress size={16} sx={{ color: '#fff' }} />
                      : <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: 14 }} />}
                    sx={{ background: 'linear-gradient(135deg,#1565c0,#00b0ff)', fontWeight: 700, py: { xs: 1, md: 1.2 }, fontSize: { xs: 13.5, md: 15 }, borderRadius: 2, '&:disabled': { background: '#ccc' } }}>
                    {status === 'sending' ? 'Đang gửi...' : cooldownLeft > 0 ? `Đợi ${formatCooldown(cooldownLeft)}` : 'Gửi Yêu Cầu'}
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1.2 }}>Hoặc liên hệ trực tiếp:</Typography>
              <Grid container spacing={1}>
                {[
                  { icon: faPhone, label: company.phone1, href: `tel:${company.phone1.replace(/\s/g,'')}`, color: '#1565c0' },
                  { icon: faPhone, label: company.phone2, href: `tel:${company.phone2.replace(/\s/g,'')}`, color: '#1565c0' },
                  { icon: faComment, label: 'Zalo Tư Vấn', href: `https://zalo.me/${company.zalo}`, color: '#0068ff' },
                  { icon: faFacebook, label: 'Facebook', href: company.facebook, color: '#1877f2' },
                ].map((c, i) => (
                  <Grid item xs={6} key={i}>
                    <Button fullWidth variant="outlined" component="a" href={c.href} target="_blank"
                      startIcon={<FontAwesomeIcon icon={c.icon} style={{ fontSize: 13 }} />}
                      sx={{ borderColor: '#e8edf2', color: '#37474f', py: 0.9, fontSize: { xs: 11.5, md: 12.5 }, fontWeight: 600, borderRadius: 2, '&:hover': { borderColor: c.color, color: c.color, background: `${c.color}08` } }}>
                      {c.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
