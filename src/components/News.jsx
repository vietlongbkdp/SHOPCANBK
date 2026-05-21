import { Box, Container, Grid, Typography, Paper, Chip, Stack, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import data from '../data.json';

const { news } = data;

const extraNews = [
  { id: 4, title: "Cân Bàn Điện Tử Cho Kho Bãi – Loại Nào Bền Nhất?", date: "18/03/2025", summary: "Cân bàn công nghiệp phải chịu tải nặng, hoạt động liên tục. Bài viết so sánh các dòng cân bàn phổ biến giúp bạn chọn đúng." },
  { id: 5, title: "Tại Sao Cân Điện Tử Hiển Thị Sai? Nguyên Nhân Và Cách Xử Lý", date: "10/03/2025", summary: "Sai số trên cân điện tử có thể do nhiều nguyên nhân: loadcell hỏng, mạch điện tử lỗi hoặc cân bị rung..." },
  { id: 6, title: "Kiểm Định Cân Điện Tử – Những Điều Doanh Nghiệp Cần Biết", date: "01/03/2025", summary: "Theo quy định pháp luật, cân điện tử dùng trong thương mại phải được kiểm định định kỳ. Hướng dẫn đầy đủ quy trình." },
];

const allNews = [...news, ...extraNews];

export default function News() {
  return (
    <Box sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      <Box sx={{ background: 'linear-gradient(135deg, #c62828, #e65100)', color: 'white', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '22px', md: '36px' } }}>TIN TỨC & KIẾN THỨC</Typography>
          <Typography sx={{ opacity: 0.9, fontSize: { xs: 13, md: 16 } }}>Kinh nghiệm mua cân, hướng dẫn sử dụng và sửa chữa cân điện tử</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Featured */}
        {allNews.slice(0, 1).map(n => (
          <Paper key={n.id} sx={{ mb: 2, borderRadius: 1, overflow: 'hidden', cursor: 'pointer',
            '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }, transition: 'box-shadow 0.25s' }}>
            <Grid container>
              {n.image && (
                <Grid item xs={12} sm={4}>
                  <Box component="img" src={n.image} alt={n.title}
                    sx={{ width: '100%', height: { xs: 180, sm: '100%' }, objectFit: 'cover', display: 'block', minHeight: 200 }} />
                </Grid>
              )}
              <Grid item xs={12} sm={n.image ? 8 : 12}>
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <Chip label="Nổi bật" size="small" sx={{ background: '#c62828', color: 'white', mb: 1.5, fontWeight: 600 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, color: '#212121', fontSize: { xs: 16, md: 22 } }}>{n.title}</Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center" mb={1.5}>
                    <CalendarTodayIcon sx={{ fontSize: 14, color: '#888' }} />
                    <Typography sx={{ fontSize: 12, color: '#888' }}>{n.date}</Typography>
                  </Stack>
                  <Typography sx={{ color: '#555', lineHeight: 1.7, fontSize: { xs: 13, md: 14 } }}>{n.summary}</Typography>
                  <Button sx={{ mt: 2, color: '#c62828', fontWeight: 600, p: 0, '&:hover': { background: 'none', textDecoration: 'underline' } }}>
                    Đọc thêm →
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}

        {/* Grid */}
        <Grid container spacing={2}>
          {allNews.slice(1).map(n => (
            <Grid item xs={12} sm={6} md={4} key={n.id}>
              <Paper sx={{ borderRadius: 1, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.12)', transform: 'translateY(-3px)' }, transition: 'all 0.25s' }}>
                {n.image && (
                  <Box component="img" src={n.image} alt={n.title}
                    sx={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                )}
                <Box sx={{ p: 2, flex: 1 }}>
                  <Stack direction="row" spacing={0.5} alignItems="center" mb={1}>
                    <CalendarTodayIcon sx={{ fontSize: 12, color: '#888' }} />
                    <Typography sx={{ fontSize: 11, color: '#888' }}>{n.date}</Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#212121', lineHeight: 1.4, mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {n.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#666', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {n.summary}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
