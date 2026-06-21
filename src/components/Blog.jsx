import { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, CardActionArea, Chip, Stack, Button, Divider } from '@mui/material';
import { faNewspaper, faCalendar, faTag, faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blogData from '../data/blogData';

const CATEGORIES = [
  { value: 'all', label: 'Tất Cả' },
  { value: 'Tu Van', label: 'Tư Vấn' },
  { value: 'Sua Chua', label: 'Sửa Chữa' },
  { value: 'Kien Thuc', label: 'Kiến Thức' },
  { value: 'Mua Sam', label: 'Mua Sắm' },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function Blog({ onNavigate, onReadPost }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? blogData
    : blogData.filter(p => p.category === activeCategory);

  return (
    <Box sx={{ minHeight: '100vh', background: '#faf7f5', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, background: 'linear-gradient(135deg, #e53935 0%, #c62828 100%)', color: '#fff', px: 3, py: 1, borderRadius: 1, mb: 2 }}>
            <FontAwesomeIcon icon={faNewspaper} />
            <Typography variant="subtitle1" fontWeight={700} sx={{ letterSpacing: 1 }}>TIN TỨC & KIẾN THỨC</Typography>
          </Box>
          <Typography variant="h4" fontWeight={800} color="#1a1a2e" sx={{ mb: 1 }}>
            Blog Cân Điện Tử Bách Khoa
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 580, mx: 'auto' }}>
            Chia sẻ kiến thức, kinh nghiệm và tư vấn về cân điện tử cho doanh nghiệp và hộ kinh doanh tại Huế, Đà Nẵng
          </Typography>
        </Box>

        {/* Category Filter */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center" sx={{ mb: 4 }}>
          {CATEGORIES.map(cat => (
            <Chip
              key={cat.value}
              label={cat.label}
              onClick={() => setActiveCategory(cat.value)}
              sx={{
                fontWeight: activeCategory === cat.value ? 700 : 500,
                background: activeCategory === cat.value ? 'linear-gradient(135deg, #e53935, #c62828)' : '#fff',
                color: activeCategory === cat.value ? '#fff' : '#555',
                border: '1.5px solid',
                borderColor: activeCategory === cat.value ? '#e53935' : '#ddd',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': { borderColor: '#e53935', color: '#e53935' }
              }}
            />
          ))}
        </Stack>

        {/* Blog Grid */}
        <Grid container spacing={3}>
          {filtered.map((post, idx) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1.5px solid #eee',
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  '&:hover': { borderColor: '#e53935', boxShadow: '0 6px 24px rgba(229,57,53,0.12)', transform: 'translateY(-3px)' }
                }}
              >
                <CardActionArea onClick={() => onReadPost && onReadPost(post.id)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ position: 'relative', background: 'linear-gradient(135deg, #ffeaea 0%, #fff5f5 100%)', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: 72, height: 72, background: 'linear-gradient(135deg, #e53935, #c62828)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesomeIcon icon={faNewspaper} size="2x" color="#fff" />
                    </Box>
                    <Chip
                      label={post.categoryLabel}
                      size="small"
                      sx={{ position: 'absolute', top: 12, left: 12, background: '#e53935', color: '#fff', fontWeight: 700, borderRadius: 0.75, fontSize: '0.7rem' }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, p: 2.5 }}>
                    <Typography variant="h6" fontWeight={700} color="#1a1a2e" sx={{ fontSize: '1rem', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6 }}>
                      {post.summary}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Divider sx={{ mb: 1.5 }} />
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: '#999', fontSize: '0.78rem' }}>
                          <FontAwesomeIcon icon={faCalendar} size="sm" />
                          <Typography variant="caption" color="text.secondary">{formatDate(post.date)}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '#e53935', fontWeight: 700, fontSize: '0.82rem' }}>
                          <Typography variant="caption" fontWeight={700} color="#e53935">Đọc tiếp</Typography>
                          <FontAwesomeIcon icon={faArrowRight} size="sm" />
                        </Stack>
                      </Stack>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Back to home */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            onClick={() => onNavigate && onNavigate('home')}
            sx={{ borderColor: '#e53935', color: '#e53935', borderRadius: 1, px: 4, '&:hover': { background: '#e53935', color: '#fff' } }}
          >
            ← Về Trang Chủ
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
