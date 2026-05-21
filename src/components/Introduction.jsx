import { Box, Container, Grid, Typography, Paper, Stack, Avatar, Divider } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import data from '../data.json';

const { company, stats } = data;

const TEAM_VALUES = [
  { icon: '🤝', title: 'Tận Tâm', desc: 'Luôn đặt lợi ích khách hàng lên hàng đầu, tư vấn trung thực.' },
  { icon: '🎯', title: 'Chính Xác', desc: 'Sửa chữa và kiểm định đạt chuẩn kỹ thuật chính xác tuyệt đối.' },
  { icon: '⚡', title: 'Nhanh Chóng', desc: 'Kỹ thuật viên đến trong 2 giờ, xử lý sự cố trong ngày.' },
  { icon: '🛡️', title: 'Uy Tín', desc: 'Hơn 10 năm phục vụ, được hàng trăm doanh nghiệp tin tưởng.' },
];

export default function Introduction() {
  return (
    <Box sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg, #c62828, #e65100)', color: 'white', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '22px', md: '36px' } }}>
            GIỚI THIỆU CÂN ĐIỆN TỬ BÁCH KHOA
          </Typography>
          <Typography sx={{ opacity: 0.9, fontSize: { xs: 13, md: 16 }, maxWidth: 600 }}>
            Đơn vị hàng đầu tại miền Trung chuyên sửa chữa, bảo trì và cung cấp cân điện tử chính hãng.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {/* About */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#c62828', mb: 2 }}>Về Chúng Tôi</Typography>
              <Typography sx={{ color: '#444', lineHeight: 1.9, mb: 2 }}>
                <strong>Cân Điện Tử Bách Khoa</strong> là đơn vị chuyên nghiệp trong lĩnh vực sửa chữa, bảo trì và kinh doanh cân điện tử tại khu vực Thừa Thiên Huế và Đà Nẵng. Với hơn <strong>10 năm kinh nghiệm</strong>, chúng tôi đã phục vụ hàng trăm khách hàng từ cá nhân đến doanh nghiệp lớn.
              </Typography>
              <Typography sx={{ color: '#444', lineHeight: 1.9, mb: 2 }}>
                Chúng tôi cung cấp đầy đủ các dòng cân điện tử: <strong>cân tính tiền, cân bàn, cân ghế, cân treo, cân sàn, cân tiểu ly</strong> và phụ kiện liên quan. Tất cả sản phẩm đều có nguồn gốc xuất xứ rõ ràng, được kiểm định chất lượng trước khi đến tay khách hàng.
              </Typography>
              <Typography sx={{ color: '#444', lineHeight: 1.9 }}>
                Đội ngũ kỹ thuật viên được đào tạo bài bản, sẵn sàng <strong>đến tận nơi sửa chữa</strong> tại Huế và Đà Nẵng trong vòng 2 giờ làm việc. Chúng tôi cam kết mang đến dịch vụ chuyên nghiệp nhất với chi phí hợp lý nhất.
              </Typography>
            </Paper>

            {/* Core Values */}
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#212121', mb: 2 }}>Giá Trị Cốt Lõi</Typography>
              <Grid container spacing={2}>
                {TEAM_VALUES.map((v, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: 1.5, background: '#fafafa', borderRadius: 1, border: '1px solid #f0f0f0' }}>
                      <Typography sx={{ fontSize: 28 }}>{v.icon}</Typography>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.3 }}>{v.title}</Typography>
                        <Typography sx={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{v.desc}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Info Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Stats */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 1, background: 'linear-gradient(135deg, #c62828, #e65100)', color: 'white' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 2 }}>🏆 Thành Tích Nổi Bật</Typography>
              <Grid container spacing={1}>
                {stats.map((s, i) => (
                  <Grid item xs={6} key={i} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 26, lineHeight: 1 }}>{s.value}</Typography>
                    <Typography sx={{ fontSize: 12, opacity: 0.9 }}>{s.label}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Branches */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#c62828', mb: 1.5 }}>📍 CHI NHÁNH</Typography>
              {[
                { city: 'Chi Nhánh Huế', addr: company.address1, phone: company.phone1 },
                { city: 'Chi Nhánh Đà Nẵng', addr: company.address2, phone: company.phone2 },
              ].map((b, i) => (
                <Box key={i}>
                  {i > 0 && <Divider sx={{ my: 1.5 }} />}
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 0.4 }}>{b.city}</Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#555', mb: 0.3 }}>📍 {b.addr}</Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#c62828', fontWeight: 600 }}>📞 {b.phone}</Typography>
                </Box>
              ))}
            </Paper>

            <Paper sx={{ p: 2, borderRadius: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#212121', mb: 1.5 }}>⏰ GIỜ LÀM VIỆC</Typography>
              <Typography sx={{ fontSize: 13, color: '#555', mb: 0.5 }}>
                <strong>Thứ 2 – Thứ 7:</strong> 7:30 – 17:30
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#555' }}>
                <strong>Chủ Nhật:</strong> Hỗ trợ qua điện thoại
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
