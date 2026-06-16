import { Box, Container, Typography, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faBolt, faShieldHalved, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

const VALUES = [
  { icon: faHandshake, title: 'Tận Tâm', desc: 'Luôn đặt lợi ích khách hàng lên hàng đầu, tư vấn trung thực.' },
  { icon: faBolt, title: 'Nhanh Chóng', desc: 'Xử lý sự cố nhanh, có mặt tận nơi trong vòng 2 giờ.' },
  { icon: faShieldHalved, title: 'Uy Tín', desc: 'Cam kết chất lượng, bảo hành đầy đủ sau mỗi dịch vụ.' },
  { icon: faUsers, title: 'Chuyên Nghiệp', desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, đào tạo bài bản.' },
];

export default function Introduction() {
  const { siteData } = useAdmin();
  const { stats } = siteData;

  return (
    <Box>
      {/* Header band */}
      <Box sx={{ background: `linear-gradient(135deg,${T.ink},#102a52)`, color: '#fff', py: { xs: 3.5, md: 5 } }}>
        <Container maxWidth="xl">
          <Typography sx={{ color: T.accentLight, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.6 }}>
            VỀ CÂN ĐIỆN TỬ BÁCH KHOA
          </Typography>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '22px', md: '34px' }, mb: 1.5 }}>
            Đối Tác Tin Cậy Của Bạn
          </Typography>
          <Typography sx={{ opacity: .8, fontSize: { xs: 13, md: 15 }, maxWidth: 640, lineHeight: 1.75 }}>
            Địa chỉ chuyên cung cấp, sửa chữa và bảo trì cân điện tử hàng đầu tại Huế và Đà Nẵng.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* About */}
        <Box sx={{ background: T.surface, borderRadius: 3, p: { xs: 2.5, md: 4 }, mb: { xs: 3, md: 4 }, border: `1px solid ${T.line}` }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: 18, md: 22 }, mb: 2,
            background: T.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
            Về Chúng Tôi
          </Typography>
          <Typography sx={{ fontSize: { xs: 13.5, md: 14.5 }, color: '#2a3441', lineHeight: 1.9, mb: 1.5 }}>
            Với hơn <strong style={{ color: T.brand }}>10 năm kinh nghiệm</strong> trong lĩnh vực cân điện tử, Cân Điện Tử Bách Khoa
            tự hào là đơn vị hàng đầu tại miền Trung chuyên cung cấp các loại cân chính hãng từ những thương hiệu uy tín như
            VIBRA, A&amp;D, JADEVER, CAS...
          </Typography>
          <Typography sx={{ fontSize: { xs: 13.5, md: 14.5 }, color: '#2a3441', lineHeight: 1.9 }}>
            Chúng tôi không chỉ bán sản phẩm mà còn cung cấp dịch vụ sửa chữa, bảo trì, kiểm định cân tận nơi với đội ngũ
            kỹ thuật viên chuyên nghiệp, đảm bảo cân của bạn luôn hoạt động chính xác và bền bỉ.
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ background: T.gradient, borderRadius: 3, p: { xs: 2.5, md: 3.5 }, mb: { xs: 3, md: 4 }, color: '#fff' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{ flex: 1, textAlign: 'center', px: 0.5,
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.25)' : 'none' }}>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: '20px', sm: '26px', md: '34px' }, lineHeight: 1 }}>{s.value}</Typography>
                <Typography sx={{ opacity: .85, fontSize: { xs: '9px', sm: '11px', md: '13px' }, mt: 0.4, lineHeight: 1.2 }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Values */}
        <Box sx={{ background: T.surface, borderRadius: 3, p: { xs: 2.5, md: 4 }, border: `1px solid ${T.line}` }}>
          <Typography sx={{ color: T.brand, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.5 }}>
            GIÁ TRỊ CỐT LÕI
          </Typography>
          <Typography sx={{ fontWeight: 800, color: T.ink, mb: { xs: 2.5, md: 3 }, fontSize: { xs: '18px', md: '24px' } }}>
            Những điều làm nên thương hiệu
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 1.5, md: 2 } }}>
            {VALUES.map((v, i) => (
              <Box key={i} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, background: T.bg, border: `1px solid ${T.line}`, textAlign: 'center',
                transition: 'all .25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 28px ${T.brand}14`, background: T.surface } }}>
                <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: T.gradient, mx: 'auto', mb: 1.5,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${T.brand}40` }}>
                  <FontAwesomeIcon icon={v.icon} style={{ fontSize: 21, color: '#fff' }} />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: 13.5, md: 14.5 }, mb: 0.5 }}>{v.title}</Typography>
                <Typography sx={{ fontSize: { xs: 11.5, md: 12.5 }, color: T.inkSoft, lineHeight: 1.55 }}>{v.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
