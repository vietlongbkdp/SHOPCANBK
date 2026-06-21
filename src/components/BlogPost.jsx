import { Box, Container, Typography, Chip, Stack, Button, Divider, Paper } from '@mui/material';
import { faArrowLeft, faCalendar, faUser, faTag, faPhone, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blogData from '../data/blogData';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function BlogPost({ postId, onNavigate, onBackToBlog }) {
  const post = blogData.find(p => p.id === postId) || blogData[0];

  const relatedPosts = blogData.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <Box sx={{ minHeight: '100vh', background: '#faf7f5', py: 5 }}>
      <Container maxWidth="md">
        {/* Breadcrumb */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Button size="small" onClick={() => onNavigate && onNavigate('home')} sx={{ color: '#666', p: 0, minWidth: 0, textTransform: 'none' }}>Trang chủ</Button>
          <Typography color="text.secondary">/</Typography>
          <Button size="small" onClick={() => onBackToBlog && onBackToBlog()} sx={{ color: '#666', p: 0, minWidth: 0, textTransform: 'none' }}>Tin tức</Button>
          <Typography color="text.secondary">/</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</Typography>
        </Stack>

        {/* Back button */}
        <Button
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() => onBackToBlog && onBackToBlog()}
          sx={{ mb: 3, color: '#e53935', textTransform: 'none', fontWeight: 600, pl: 0 }}
        >
          Quay lại danh sách bài viết
        </Button>

        {/* Article */}
        <Paper elevation={0} sx={{ border: '1.5px solid #eee', borderRadius: 2, overflow: 'hidden', p: { xs: 3, md: 5 } }}>
          {/* Category & Date */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
            <Chip label={post.categoryLabel} size="small" sx={{ background: '#e53935', color: '#fff', fontWeight: 700, borderRadius: 0.75 }} />
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: '#999' }}>
              <FontAwesomeIcon icon={faCalendar} size="sm" />
              <Typography variant="caption" color="text.secondary">{formatDate(post.date)}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: '#999' }}>
              <FontAwesomeIcon icon={faUser} size="sm" />
              <Typography variant="caption" color="text.secondary">{post.author}</Typography>
            </Stack>
          </Stack>

          {/* Title */}
          <Typography component="h1" variant="h4" fontWeight={800} color="#1a1a2e" sx={{ lineHeight: 1.35, mb: 3 }}>
            {post.title}
          </Typography>

          {/* Summary */}
          <Box sx={{ background: 'linear-gradient(135deg, #fff5f5, #ffeaea)', borderLeft: '4px solid #e53935', borderRadius: 1, p: 2.5, mb: 4 }}>
            <Typography variant="body1" color="#555" sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
              {post.summary}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Content */}
          <Box
            sx={{
              '& h2': { fontSize: '1.35rem', fontWeight: 700, color: '#1a1a2e', mt: 4, mb: 2, pb: 1, borderBottom: '2px solid #ffeaea' },
              '& h3': { fontSize: '1.1rem', fontWeight: 700, color: '#e53935', mt: 3, mb: 1.5 },
              '& p': { lineHeight: 1.85, color: '#333', mb: 2, fontSize: '0.97rem' },
              '& ul': { pl: 3, mb: 2 },
              '& li': { lineHeight: 1.8, color: '#333', mb: 0.5, fontSize: '0.97rem' },
              '& strong': { color: '#1a1a2e', fontWeight: 700 },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <Divider sx={{ mt: 5, mb: 3 }} />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
            <FontAwesomeIcon icon={faTag} color="#999" size="sm" />
            {post.tags.map(tag => (
              <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 0.75, color: '#666', borderColor: '#ddd', fontSize: '0.75rem' }} />
            ))}
          </Stack>
        </Paper>

        {/* CTA */}
        <Paper elevation={0} sx={{ border: '1.5px solid #e53935', borderRadius: 2, p: 4, mt: 4, background: 'linear-gradient(135deg, #fff5f5 0%, #ffeaea 100%)', textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={700} color="#1a1a2e" sx={{ mb: 1 }}>
            Cần tư vấn thêm về cân điện tử?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Đội ngũ kỹ thuật Bách Khoa sẵn sàng hỗ trợ bạn 7 ngày/tuần
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              href="tel:0938561554"
              startIcon={<FontAwesomeIcon icon={faPhone} />}
              sx={{ background: 'linear-gradient(135deg, #e53935, #c62828)', borderRadius: 1, fontWeight: 700, px: 4 }}
            >
              0938.561.554
            </Button>
            <Button
              variant="outlined"
              onClick={() => onNavigate && onNavigate('contact')}
              sx={{ borderColor: '#e53935', color: '#e53935', borderRadius: 1, fontWeight: 700, px: 4, '&:hover': { background: '#e53935', color: '#fff' } }}
            >
              Gửi Yêu Cầu
            </Button>
          </Stack>
        </Paper>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" fontWeight={700} color="#1a1a2e" sx={{ mb: 3 }}>
              Bài Viết Liên Quan
            </Typography>
            <Stack spacing={2}>
              {relatedPosts.map(rp => (
                <Paper
                  key={rp.id}
                  elevation={0}
                  onClick={() => onBackToBlog && onBackToBlog(rp.id)}
                  sx={{ border: '1.5px solid #eee', borderRadius: 1.5, p: 2.5, cursor: 'pointer', transition: '0.2s', '&:hover': { borderColor: '#e53935', background: '#fff5f5' } }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box>
                      <Typography variant="body2" fontWeight={700} color="#1a1a2e" sx={{ mb: 0.5 }}>{rp.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{formatDate(rp.date)}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
