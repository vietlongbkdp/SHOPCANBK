import { Box, Container, Grid, Typography, Stack, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faScrewdriverWrench, faTrophy, faHandshake, faBolt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../context/AdminContext';

const TEAM_VALUES = [
  { icon: faHandshake, color: '#c62828', title: 'Tận Tâm', desc: 'Luôn đặt lợi ích khách hàng lên hàng đầu, tư vấn trung thực.' },
  { icon: faBolt, color: '#e65100', title: 'Nhanh Chóng', desc: 'Xử lý sự cố nhanh, có mặt tận nơi trong vòng 2 giờ.' },
  { icon: faShieldHalved, color: '#2e7d32', title: 'Uy Tín', desc: 'Cam kết chất lượng, bảo hành đầy đủ sau mỗi dịch vụ.' },
  { icon: faUsers, color: '#1565c0', title: 'Chuyên Nghiệp', desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo bài bản.' },
];

export default function Introduction() {
  const { siteData } = useAdmin();
  const { company, stats } = siteData;

  return (
    <Box component="main" sx={{ background: '#f4f6f8', minHeight: '60vh' }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg,#0d1b4b,#1565c0)', color: '#fff', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="xl">
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '20px', md: '32px' }, mb: 1 }}>
            GIỚI THIỆU
          </Typography>
          <Typography sx={{ opacity: .88, fontSize: { xs: 13, md: 15 }, maxWidth: 620, lineHeight: 1.7 }}>
            Cân Điện Tử Bách Khoa – địa chỉ tin cậy chuyên cung cấp, sửa chữa và bảo trì cân điện tử tại Huế và Đà Nẵng.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* About */}
        <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 }, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 20 }, color: '#c62828', mb: 1.5 }}>
            Về Chúng Tôi
          </Typography>
          <Typography sx={{ fontSize: { xs: 13.5, md: 14.5 }, color: '#37474f', lineHeight: 1.85, mb: 1.5 }}>
            Với hơn <strong>10 năm kinh nghiệm</strong> trong lĩnh vực cân điện tử, Cân Điện Tử Bách Khoa tự hào là đơn vị
            hàng đầu tại khu vực miền Trung chuyên cung cấp các loại cân chính hãng từ những thương hiệu uy tín như
            VIBRA, A&amp;D, JADEVER, CAS...
          </Typography>
          <Typography sx={{ fontSize: { xs: 13.5, md: 14.5 }, color: '#37474f', lineHeight: 1.85 }}>
            Chúng tôi không chỉ bán sản phẩm mà còn cung cấp dịch vụ sửa chữa, bảo trì, kiểm định cân tận nơi với đội ngũ
            kỹ thuật viên chuyên nghiệp, đảm bảo cân của bạn luôn hoạt động chính xác và bền bỉ.
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{
          background: 'linear-gradient(135deg,#c62828,#e53935)', color: '#fff',
          borderRadius: 2, p: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 },
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{ flex: 1, textAlign: 'center', px: 0.5,
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.2)' : 'none' }}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '18px', sm: '24px', md: '32px' }, lineHeight: 1 }}>{s.value}</Typography>
                <Typography sx={{ opacity: .85, fontSize: { xs: '9px', sm: '11px', md: '13px' }, mt: 0.3, lineHeight: 1.2 }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Values */}
        <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2, md: 3 }, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 20 }, color: '#1a1a2e', mb: 0.5 }}>
            Giá Trị Cốt Lõi
          </Typography>
          <Typography sx={{ color: '#78909c', fontSize: { xs: 12.5, md: 13 }, mb: { xs: 2, md: 2.5 } }}>
            Những điều làm nên thương hiệu Bách Khoa
          </Typography>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {TEAM_VALUES.map((v, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Stack alignItems="center" textAlign="center" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2, background: '#fafbfc', border: '1px solid #f0f0f0', height: '100%' }}>
                  <Box sx={{
                    width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 }, borderRadius: '50%',
                    background: `${v.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.2,
                  }}>
                    <FontAwesomeIcon icon={v.icon} style={{ fontSize: 20, color: v.color }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 13, md: 14 }, mb: 0.5 }}>{v.title}</Typography>
                  <Typography sx={{ fontSize: { xs: 11.5, md: 12.5 }, color: '#78909c', lineHeight: 1.55 }}>{v.desc}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
