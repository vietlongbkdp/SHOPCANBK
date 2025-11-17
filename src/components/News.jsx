import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';

export default function News() {
  const newsItems = [
    {
      id: 1,
      title: 'Ra Mắt Cân Sức Khỏe Thế Hệ Mới AF-600',
      date: '15/11/2024',
      excerpt: 'Chúng tôi rất vui mừng giới thiệu dòng cân sức khỏe thông minh AF-600 với các tính năng vượt trội...',
      image: '📱',
    },
    {
      id: 2,
      title: 'Chương Trình Khuyến Mãi Tháng 11',
      date: '10/11/2024',
      excerpt: 'Mua sắm các sản phẩm cân điện tử trong tháng 11 được giảm giá lên tới 30%...',
      image: '🎉',
    },
    {
      id: 3,
      title: 'Mở Rộng Chi Nhánh Tại TP.HCM',
      date: '05/11/2024',
      excerpt: 'Công ty cân điện tử Hoàng Gia vui mừng thông báo khai trương chi nhánh mới tại TP.HCM...',
      image: '🏢',
    },
    {
      id: 4,
      title: 'Đạt Chứng Chỉ ISO 9001:2015',
      date: '01/11/2024',
      excerpt: 'Công ty của chúng tôi đã đạt chứng chỉ ISO 9001:2015, khẳng định chất lượng dịch vụ...',
      image: '🏆',
    },
  ];

  return (
    <Box sx={{ flex: 1, py: 6, background: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#d32f2f',
            mb: 6,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Tin Tức
        </Typography>

        <Grid container spacing={4}>
          {newsItems.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ fontSize: '40px', mb: 2 }}>{item.image}</Box>
                <Typography variant="subtitle2" sx={{ color: '#d32f2f', fontWeight: 700, mb: 1 }}>
                  {item.date}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, flex: 1, lineHeight: 1.6 }}>
                  {item.excerpt}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#d32f2f',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Đọc thêm →
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
