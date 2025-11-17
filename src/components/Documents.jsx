import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function Documents() {
  const documents = [
    {
      name: 'Bảng Giá Sản Phẩm 2024',
      description: 'Bảng giá chi tiết tất cả các sản phẩm cân điện tử',
      date: '15/11/2024',
      size: '2.5 MB',
    },
    {
      name: 'Hướng Dẫn Sử Dụng',
      description: 'Hướng dẫn chi tiết cách sử dụng các loại cân',
      date: '10/11/2024',
      size: '5.2 MB',
    },
    {
      name: 'Chứng Chỉ Bảo Hành',
      description: 'Thông tin chứng chỉ bảo hành chính hãng',
      date: '01/11/2024',
      size: '1.8 MB',
    },
    {
      name: 'Thông Số Kỹ Thuật',
      description: 'Thông số kỹ thuật chi tiết của các sản phẩm',
      date: '25/10/2024',
      size: '3.5 MB',
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
          Tài Liệu
        </Typography>

        <Paper sx={{ p: 0, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#d32f2f' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Tên Tài Liệu</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Mô Tả</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Ngày Cập Nhật</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Kích Thước</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>Tải Xuống</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((doc, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        background: '#f5f5f5',
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{doc.name}</TableCell>
                    <TableCell>{doc.description}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <FileDownloadIcon
                        sx={{
                          color: '#d32f2f',
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#b71c1c',
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Info Box */}
        <Paper sx={{ p: 4, mt: 4, background: '#fff3e0', borderLeft: '4px solid #d32f2f' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
            ℹ️ Thông Tin
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
            Tất cả các tài liệu được cập nhật thường xuyên. Nếu bạn cần tài liệu khác hoặc có thắc mắc, 
            vui lòng liên hệ với chúng tôi qua các thông tin liên hệ trên trang web.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
