import { Box, Container, Grid, Typography, Paper, Stack, Button, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';

const DOCS = [
  { id: 1, title: 'Hướng Dẫn Sử Dụng Cân Bàn K001', type: 'PDF', size: '2.4 MB', icon: <PictureAsPdfIcon sx={{ color: '#f44336' }} /> },
  { id: 2, title: 'Tài Liệu Cân Tiểu Ly KD-TBED Series', type: 'PDF', size: '1.8 MB', icon: <PictureAsPdfIcon sx={{ color: '#f44336' }} /> },
  { id: 3, title: 'Hướng Dẫn Hiệu Chỉnh Đầu Cân Điện Tử', type: 'PDF', size: '3.1 MB', icon: <PictureAsPdfIcon sx={{ color: '#f44336' }} /> },
  { id: 4, title: 'Catalogue Cân Bàn & Cân Ghế 2025', type: 'PDF', size: '5.6 MB', icon: <PictureAsPdfIcon sx={{ color: '#f44336' }} /> },
  { id: 5, title: 'Tiêu Chuẩn Kiểm Định Cân ĐLVN 26', type: 'PDF', size: '1.2 MB', icon: <ArticleIcon sx={{ color: '#1565c0' }} /> },
  { id: 6, title: 'Bảng Giá Cân Điện Tử 2025', type: 'XLSX', size: '0.8 MB', icon: <ArticleIcon sx={{ color: '#2e7d32' }} /> },
];

export default function Documents() {
  return (
    <Box sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      <Box sx={{ background: 'linear-gradient(135deg, #c62828, #e65100)', color: 'white', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '22px', md: '36px' } }}>TÀI LIỆU KỸ THUẬT</Typography>
          <Typography sx={{ opacity: 0.9, fontSize: { xs: 13, md: 16 } }}>Hướng dẫn sử dụng, catalogue và tài liệu kỹ thuật cân điện tử</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={2}>
          {DOCS.map(doc => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Paper sx={{ p: 2.5, borderRadius: 1, border: '1px solid #e8e8e8', height: '100%', transition: 'all 0.2s',
                '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.1)', borderColor: '#c62828' } }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box sx={{ fontSize: 36 }}>{doc.icon}</Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#212121', mb: 0.8, lineHeight: 1.4 }}>{doc.title}</Typography>
                    <Stack direction="row" spacing={1} mb={1.5}>
                      <Chip label={doc.type} size="small" sx={{ background: '#f5f5f5', fontSize: 11 }} />
                      <Typography sx={{ fontSize: 12, color: '#888', alignSelf: 'center' }}>{doc.size}</Typography>
                    </Stack>
                    <Button size="small" variant="outlined" startIcon={<DownloadIcon />}
                      sx={{ borderColor: '#c62828', color: '#c62828', fontSize: 12, '&:hover': { background: '#fff5f5' } }}>
                      Tải xuống
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
