import { Box, Container, Typography, Chip, Stack, Button, Divider, Paper } from '@mui/material';
import { faArrowLeft, faCalendar, faUser, faTag, faPhone } from '@fortawesome/free-solid-svg-icons';
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
    <Box sx={{ minHeight: '100vh', background: '#f0f4ff', py: 5 }}>
      <Container maxWidth="md">
        {/* Breadcrumb */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Button size="small" onClick={() => onNavigate && onNavigate('home')} sx={{ color: '#555', p: 0, minWidth: 0, textTransform: 'none' }}>Trang chủ</Button>
          <Typography color="text.secondary">/</Typography>
          <Button size="small" onClick={() => onBackToBlog && onBackToBlog()} sx={{ color: '#555', p: 0, minWidth: 0, textTransform: 'none' }}>Tin tức</Button>
          <Typography color="text.secondary">/</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</Typography>
        </Stack>

        {/* Back button */}
        <Button
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() => onBackToBlog && onBackToBlog()}
          sx={{ mb: 3, color: '#0d47a1', textTransform: 'none', fontWeight: 600, pl: 0 }}
        >
          Quay lại danh sách bài viết
        </Button>

        {/* Article */}
        <Paper elevation={0} sx={{ border: '1.5px solid #dce8ff', borderRadius: 2, overflow: 'hidden' }}>
          {/* Hero Image */}
          <Box sx={{ position: 'relative', height: { xs: 200, md: 320 }, overflow: 'hidden', background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
            <Box
              component="img"
              src={post.image}
              alt={post.imageAlt || post.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Overlay gradient */}
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(13,71,161,0.85) 0%, transparent 100%)' }} />
            {/* Category chip on image */}
            <Chip
              label={post.categoryLabel}
              size="small"
              sx={{ position: 'absolute', top: 16, left: 16, background: 'linear-gradient(135deg, #0d47a1, #00b0ff)', color: '#fff', fontWeight: 700, borderRadius: 0.75 }}
            />
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            {/* Meta */}
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
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
            <Typography component="h1" variant="h4" fontWeight={800} color="#0d47a1" sx={{ lineHeight: 1.35, mb: 3 }}>
              {post.title}
            </Typography>

            {/* Summary */}
            <Box sx={{ background: 'linear-gradient(135deg, #e3f2fd, #e8f5ff)', borderLeft: '4px solid #0d47a1', borderRadius: 1, p: 2.5, mb: 4 }}>
              <Typography variant="body1" color="#444" sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
                {post.summary}
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Content */}
            <Box
              sx={{
                '& h2': { fontSize: '1.35rem', fontWeight: 700, color: '#0d47a1', mt: 4, mb: 2, pb: 1, borderBottom: '2px solid #e3f2fd' },
                '& h3': { fontSize: '1.1rem', fontWeight: 700, color: '#1565c0', mt: 3, mb: 1.5 },
                '& p': { lineHeight: 1.85, color: '#333', mb: 2, fontSize: '0.97rem' },
                '& ul': { pl: 3, mb: 2 },
                '& li': { lineHeight: 1.8, color: '#333', mb: 0.5, fontSize: '0.97rem' },
                '& strong': { color: '#0d47a1', fontWeight: 700 },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <Divider sx={{ mt: 5, mb: 3 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <FontAwesomeIcon icon={faTag} color="#999" size="sm" />
              {post.tags.map(tag => (
                <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 0.75, color: '#555', borderColor: '#c5d8ff', fontSize: '0.75rem' }} />
              ))}
            </Stack>
          </Box>
        </Paper>

        {/* CTA */}
        <Paper elevation={0} sx={{ border: '1.5px solid #0d47a1', borderRadius: 2, p: 4, mt: 4, background: 'linear-gradient(135deg, #e3f2fd 0%, #e8f5ff 100%)', textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={700} color="#0d47a1" sx={{ mb: 1 }}>
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
              sx={{ background: 'linear-gradient(135deg, #0d47a1, #1976d2)', borderRadius: 1, fontWeight: 700, px: 4 }}
            >
              0938.561.554
            </Button>
            <Button
              variant="outlined"
              onClick={() => onNavigate && onNavigate('contact')}
              sx={{ borderColor: '#0d47a1', color: '#0d47a1', borderRadius: 1, fontWeight: 700, px: 4, '&:hover': { background: '#0d47a1', color: '#fff' } }}
            >
              Gửi Yêu Cầu
            </Button>
          </Stack>
        </Paper>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" fontWeight={700} color="#0d47a1" sx={{ mb: 3 }}>
              Bài Viết Liên Quan
            </Typography>
            <Stack spacing={2}>
              {relatedPosts.map(rp => (
                <Paper
                  key={rp.id}
                  elevation={0}
                  onClick={() => onBackToBlog && onBackToBlog(rp.id)}
                  sx={{ border: '1.5px solid #dce8ff', borderRadius: 1.5, overflow: 'hidden', cursor: 'pointer', transition: '0.2s', '&:hover': { borderColor: '#0d47a1', background: '#e3f2fd' } }}
                >
                  <Stack direction="row" spacing={0} alignItems="stretch">
                    {/* Thumbnail */}
                    <Box sx={{ width: 100, minHeight: 80, flexShrink: 0, overflow: 'hidden', background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
                      <Box
                        component="img"
                        src={rp.image}
                        alt={rp.imageAlt || rp.title}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display='none'; }}
                      />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="body2" fontWeight={700} color="#0d47a1" sx={{ mb: 0.5 }}>{rp.title}</Typography>
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
