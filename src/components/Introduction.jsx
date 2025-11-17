import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';

export default function Introduction() {
  return (
    <Box sx={{ flex: 1, py: 6, background: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#d32f2f',
            mb: 4,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Giới Thiệu
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ p: 4, background: 'white' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
                Về Công Ty Cân Điện Tử Hoàng Gia
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'textSecondary' }}>
                Công Ty Cân Điện Tử Hoàng Gia được thành lập với mục đích cung cấp các sản phẩm cân điện tử chất lượng cao, 
                đáp ứng nhu cầu của các khách hàng trong các lĩnh vực khác nhau từ nhà bếp, sức khỏe, công nghiệp đến trang sức.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#333', mt: 4 }}>
                Sứ Mệnh
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'textSecondary' }}>
                Cung cấp các sản phẩm cân điện tử chính xác, tin cậy với giá cả phải chăng để phục vụ tốt nhất cho khách hàng.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#333', mt: 4 }}>
                Tầm Nhìn
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'textSecondary' }}>
                Trở thành nhà cung cấp cân điện tử hàng đầu tại Việt Nam, được khách hàng tin tưởng và yêu mến.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#333', mt: 4 }}>
                Các Giá Trị Cốt Lõi
              </Typography>
              <ul style={{ color: '#666', lineHeight: 2 }}>
                <li><strong>Chất lượng:</strong> Sản phẩm luôn đảm bảo chất lượng tốt nhất</li>
                <li><strong>Tin cậy:</strong> Dịch vụ sau bán hàng chuyên nghiệp và tận tình</li>
                <li><strong>Tôn trọng:</strong> Luôn tôn trọng và lắng nghe ý kiến khách hàng</li>
                <li><strong>Phát triển:</strong> Không ngừng cải tiến và phát triển</li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
