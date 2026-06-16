import { Box, Container, Typography, Stack, Button, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPhone, faScrewdriverWrench, faPhoneVolume, faMagnifyingGlass, faWrench, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

const PROCESS = [
  { step: '01', icon: faPhoneVolume, title: 'Liên Hệ', desc: 'Gọi hotline hoặc Zalo, KTV tư vấn ngay.' },
  { step: '02', icon: faMagnifyingGlass, title: 'Khảo Sát', desc: 'KTV đến tận nơi kiểm tra, báo giá cụ thể.' },
  { step: '03', icon: faWrench, title: 'Sửa Chữa', desc: 'Thực hiện nhanh, thay linh kiện chính hãng.' },
  { step: '04', icon: faHandshake, title: 'Bàn Giao', desc: 'Kiểm tra lại, bảo hành sau sửa chữa 3 tháng.' },
];

export default function Services() {
  const { siteData } = useAdmin();
  const { services, company } = siteData;

  return (
    <Box>
      {/* Header band */}
      <Box sx={{ background: `linear-gradient(135deg,${T.ink},#3d1410)`, color: '#fff', py: { xs: 3.5, md: 5 } }}>
        <Container maxWidth="xl">
          <Typography sx={{ color: T.accentLight, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.6 }}>
            TẬN TÂM · NHANH CHÓNG · UY TÍN
          </Typography>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '22px', md: '34px' }, mb: 1.5, letterSpacing: '-0.01em' }}>
            Dịch Vụ Sửa Chữa &amp; Bảo Trì
          </Typography>
          <Typography sx={{ opacity: .8, fontSize: { xs: 13, md: 15 }, mb: 2.5, maxWidth: 580, lineHeight: 1.7 }}>
            Chuyên sửa chữa tất cả các loại cân điện tử tại Huế và Đà Nẵng. Kỹ thuật viên có mặt trong vòng 2 giờ.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
            {[{ ph: company.phone1, label: 'CN Huế' }, { ph: company.phone2, label: 'CN Đà Nẵng' }].map((b, i) => (
              <Button key={b.ph} component="a" href={`tel:${b.ph.replace(/\s/g,'')}`}
                startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                sx={{ background: i === 0 ? T.gradient : 'rgba(255,255,255,.1)', color: '#fff', fontWeight: 700, fontSize: { xs: 13, md: 14 }, px: 3, py: 1.1, borderRadius: 2.5,
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,.3)', '&:hover': { background: i === 0 ? T.gradientDark : 'rgba(255,255,255,.18)' } }}>
                {b.ph} – {b.label}
              </Button>
            ))}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Service cards 2x2 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 1.5, md: 2.5 }, mb: { xs: 3, md: 5 } }}>
          {services.map(s => (
            <Box key={s.id} sx={{ background: T.surface, borderRadius: 3, p: { xs: 2.2, md: 2.8 }, display: 'flex', flexDirection: 'column',
              border: `1px solid ${T.line}`, transition: 'all .25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 16px 40px ${T.brand}14`, borderColor: T.brandLight } }}>
              <Stack direction="row" spacing={1.8} alignItems="center" mb={1.5}>
                <Box sx={{ width: 54, height: 54, borderRadius: 3, background: T.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, flexShrink: 0, boxShadow: `0 8px 20px ${T.brand}40` }}>{s.icon}</Box>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: 15, md: 17 }, color: T.ink }}>{s.title}</Typography>
              </Stack>
              <Typography sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: T.inkSoft, lineHeight: 1.65, mb: 2, minHeight: { md: 42 } }}>{s.description}</Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Stack spacing={0.9} sx={{ mt: 'auto' }}>
                {s.features.map((f, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 14, color: T.success, marginTop: 2, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: { xs: 12.5, md: 13 }, color: T.inkSoft }}>{f}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>

        {/* Process */}
        <Box sx={{ background: T.surface, borderRadius: 3, p: { xs: 2.5, md: 4 }, mb: { xs: 3, md: 5 }, border: `1px solid ${T.line}` }}>
          <Typography sx={{ color: T.brand, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.5 }}>
            4 BƯỚC ĐƠN GIẢN
          </Typography>
          <Typography sx={{ fontWeight: 800, color: T.ink, mb: { xs: 3, md: 4 }, fontSize: { xs: '18px', md: '24px' } }}>
            Quy Trình Làm Việc
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 2.5, md: 2 }, position: 'relative' }}>
            {PROCESS.map((p, i) => (
              <Stack key={i} alignItems="center" textAlign="center" sx={{ position: 'relative' }}>
                <Box sx={{ width: { xs: 58, md: 68 }, height: { xs: 58, md: 68 }, borderRadius: '50%', background: T.gradient, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, flexShrink: 0, position: 'relative',
                  boxShadow: `0 8px 20px ${T.brand}40` }}>
                  <FontAwesomeIcon icon={p.icon} style={{ fontSize: 22 }} />
                  <Box sx={{ position: 'absolute', top: -4, right: -4, width: 24, height: 24, borderRadius: '50%', background: T.ink, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, border: '2px solid #fff' }}>{p.step}</Box>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: 13.5, md: 15 }, mb: 0.5 }}>{p.title}</Typography>
                <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: T.inkSoft, lineHeight: 1.55, px: 0.5 }}>{p.desc}</Typography>
              </Stack>
            ))}
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 4, p: { xs: 3, md: 5 }, textAlign: 'center', background: T.gradient, color: '#fff' }}>
          <Box sx={{ position: 'absolute', top: -50, right: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
          <Box sx={{ position: 'relative' }}>
            <Typography sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '18px', md: '26px' } }}>Cân của bạn đang gặp sự cố?</Typography>
            <Typography sx={{ opacity: .9, mb: { xs: 2.5, md: 3 }, fontSize: { xs: 13, md: 15 } }}>Gọi ngay để KTV hỗ trợ tận nơi tại Huế &amp; Đà Nẵng.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
              {[{ ph: company.phone1, label: 'CN Huế' }, { ph: company.phone2, label: 'CN Đà Nẵng' }].map(b => (
                <Button key={b.ph} component="a" href={`tel:${b.ph.replace(/\s/g,'')}`}
                  startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                  sx={{ background: '#fff', color: T.brand, fontWeight: 800, px: 4, py: 1.3, borderRadius: 2.5, fontSize: { xs: 13, md: 14 },
                    boxShadow: '0 6px 20px rgba(0,0,0,.2)', '&:hover': { background: '#fff', transform: 'translateY(-2px)' }, transition: 'all .2s' }}>
                  {b.ph} – {b.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
