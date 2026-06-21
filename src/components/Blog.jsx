import { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardActionArea, Chip, Stack, Button, Divider } from '@mui/material';
import { faNewspaper, faCalendar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
    <Box sx={{ minHeight: '100vh', background: '#f0f4ff', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, background: 'linear-gradient(135deg, #0d47a1 0%, #00b0ff 100%)', color: '#fff', px: 3, py: 1, borderRadius: 1, mb: 2 }}>
            <FontAwesomeIcon icon={faNewspaper} />
            <Typography variant="subtitle1" fontWeight={700} sx={{ letterSpacing: 1 }}>TIN TỨC & KIẾN THỨC</Typography>
          </Box>
          <Typography variant="h4" fontWeight={800} color="#0d47a1" sx={{ mb: 1 }}>
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
                background: activeCategory === cat.value ? 'linear-gradient(135deg, #0d47a1, #00b0ff)' : '#fff',
                color: activeCategory === cat.value ? '#fff' : '#555',
                border: '1.5px solid',
                borderColor: activeCategory === cat.value ? '#0d47a1' : '#ddd',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': { borderColor: '#0d47a1', color: '#0d47a1' }
              }}
            />
          ))}
        </Stack>

        {/* Blog Grid */}
        <Grid container spacing={3}>
          {filtered.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1.5px solid #dce8ff',
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  '&:hover': { borderColor: '#0d47a1', boxShadow: '0 6px 24px rgba(13,71,161,0.12)', transform: 'translateY(-3px)' }
                }}
              >
                <CardActionArea onClick={() => onReadPost && onReadPost(post.id)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  {/* Image */}
                  <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
                    <Box
                      component="img"
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.35s ease', '&:hover': { transform: 'scale(1.04)' } }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <Chip
                      label={post.categoryLabel}
                      size="small"
                      sx={{ position: 'absolute', top: 12, left: 12, background: 'linear-gradient(135deg, #0d47a1, #1565c0)', color: '#fff', fontWeight: 700, borderRadius: 0.75, fontSize: '0.7rem', backdropFilter: 'blur(4px)' }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, p: 2.5 }}>
                    <Typography variant="h6" fontWeight={700} color="#0d47a1" sx={{ fontSize: '1rem', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '#0d47a1', fontWeight: 700, fontSize: '0.82rem' }}>
                          <Typography variant="caption" fontWeight={700} color="#0d47a1">Đọc tiếp</Typography>
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
            sx={{ borderColor: '#0d47a1', color: '#0d47a1', borderRadius: 1, px: 4, '&:hover': { background: '#0d47a1', color: '#fff' } }}
          >
            ← Về Trang Chủ
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
