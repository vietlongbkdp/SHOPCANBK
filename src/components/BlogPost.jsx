import { useEffect } from 'react';
import { Box, Container, Typography, Chip, Stack, Button, Divider, Paper } from '@mui/material';
import { faArrowLeft, faCalendar, faUser, faTag, faPhone, faShareNodes, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blogData from '../data/blogData';

const SITE_URL = 'https://candientubk.com';
const SITE_NAME = 'Cân Điện Tử Bách Khoa';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateISO(dateStr) {
  return new Date(dateStr).toISOString();
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 160);
}

export default function BlogPost({ postId, onNavigate, onBackToBlog }) {
  const post = blogData.find(p => p.id === postId) || blogData[0];
  const relatedPosts = blogData.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  // ─── Dynamic SEO ──────────────────────────────────────────────
  useEffect(() => {
    const pageTitle = post.title + ' | ' + SITE_NAME;
    const desc = post.summary.substring(0, 155);
    const canonicalUrl = SITE_URL + '/bai-viet/' + post.slug;

    // Update title + meta
    document.title = pageTitle;

    const setMeta = (sel, val) => {
      if (!val) return;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        const isOg = sel.includes('property=');
        el.setAttribute(isOg ? 'property' : 'name', sel.match(/["']([^"']+)["']/)?.[1] || '');
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', pageTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:image"]', post.image);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:type"]', 'article');
    setMeta('meta[name="twitter:title"]', pageTitle);
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', post.image);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;

    // ─── BlogPosting Schema ─────────────────────────────────────
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.summary,
      'image': post.image,
      'datePublished': formatDateISO(post.date),
      'dateModified': formatDateISO(post.date),
      'author': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL,
        'logo': { '@type': 'ImageObject', 'url': SITE_URL + '/logo.jpg' }
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'logo': { '@type': 'ImageObject', 'url': SITE_URL + '/logo.jpg' }
      },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': canonicalUrl },
      'keywords': post.tags.join(', '),
      'articleSection': post.categoryLabel,
      'inLanguage': 'vi-VN',
      'wordCount': post.content.replace(/<[^>]+>/g, '').split(/\s+/).length
    };

    // ─── BreadcrumbList Schema ──────────────────────────────────
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Trang Chủ', 'item': SITE_URL },
        { '@type': 'ListItem', 'position': 2, 'name': 'Tin Tức', 'item': SITE_URL + '/tin-tuc' },
        { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': canonicalUrl }
      ]
    };

    // Inject schemas
    ['dynamic-blog-schema', 'dynamic-breadcrumb-schema'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    const s1 = document.createElement('script');
    s1.type = 'application/ld+json';
    s1.id = 'dynamic-blog-schema';
    s1.textContent = JSON.stringify(blogSchema);
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.type = 'application/ld+json';
    s2.id = 'dynamic-breadcrumb-schema';
    s2.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(s2);

    // Push state for sharable URL (without actual routing)
    if (window.history && window.history.pushState) {
      window.history.pushState({ postId: post.id }, pageTitle, '/bai-viet/' + post.slug);
    }

    return () => {
      document.title = SITE_NAME + ' – Sửa Chữa & Mua Bán Cân Tại Huế & Đà Nẵng';
      setMeta('meta[name="description"]', 'Cân Điện Tử Bách Khoa – Chuyên sửa chữa, bảo trì tận nơi, kiểm định và mua bán cân điện tử tại Huế và Đà Nẵng. Gọi ngay: 0913 331 916.');
      setMeta('meta[property="og:type"]', 'website');
      if (canonical) canonical.href = SITE_URL + '/';
      ['dynamic-blog-schema', 'dynamic-breadcrumb-schema'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
      if (window.history && window.history.pushState) {
        window.history.pushState({}, SITE_NAME, '/');
      }
    };
  }, [post.id]);

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
          <Box sx={{ position: 'relative', height: { xs: 200, md: 340 }, overflow: 'hidden', background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
            <Box
              component="img"
              src={post.image}
              alt={post.imageAlt || post.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(13,71,161,0.85) 0%, transparent 100%)' }} />
            <Chip label={post.categoryLabel} size="small" sx={{ position: 'absolute', top: 16, left: 16, background: 'linear-gradient(135deg, #0d47a1, #00b0ff)', color: '#fff', fontWeight: 700, borderRadius: 0.75 }} />
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <FontAwesomeIcon icon={faCalendar} size="sm" color="#999" />
                <Typography variant="caption" color="text.secondary">{formatDate(post.date)}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <FontAwesomeIcon icon={faUser} size="sm" color="#999" />
                <Typography variant="caption" color="text.secondary">{post.author}</Typography>
              </Stack>
            </Stack>

            <Typography component="h1" variant="h4" fontWeight={800} color="#0d47a1" sx={{ lineHeight: 1.35, mb: 3 }}>
              {post.title}
            </Typography>

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
                '& ul, & ol': { pl: 3, mb: 2 },
                '& li': { lineHeight: 1.8, color: '#333', mb: 0.5, fontSize: '0.97rem' },
                '& strong': { color: '#0d47a1', fontWeight: 700 },
                '& a': { color: '#1565c0', textDecoration: 'underline' },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <Divider sx={{ mt: 5, mb: 3 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <FontAwesomeIcon icon={faTag} color="#999" size="sm" />
              {post.tags.map(tag => (
                <Chip key={tag} label={'#' + tag} size="small" variant="outlined" sx={{ borderRadius: 0.75, color: '#0d47a1', borderColor: '#c5d8ff', fontSize: '0.75rem', '&:hover': { background: '#e3f2fd' } }} />
              ))}
            </Stack>
          </Box>
        </Paper>

        {/* Share prompt */}
        <Paper elevation={0} sx={{ border: '1.5px solid #dce8ff', borderRadius: 2, p: 3, mt: 3, background: '#fff', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FontAwesomeIcon icon={faShareNodes} color="#0d47a1" size="lg" />
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={700} color="#0d47a1" variant="body1">Bài viết có ích cho bạn?</Typography>
            <Typography variant="body2" color="text.secondary">Chia sẻ để giúp tiểu thương, doanh nghiệp khác biết thêm kiến thức về cân điện tử.</Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => { if (navigator.share) { navigator.share({ title: post.title, text: post.summary, url: window.location.href }); } }}
            sx={{ background: 'linear-gradient(135deg, #0d47a1, #1976d2)', borderRadius: 1, fontWeight: 700, textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            Chia sẻ ngay
          </Button>
        </Paper>

        {/* CTA */}
        <Paper elevation={0} sx={{ border: '1.5px solid #0d47a1', borderRadius: 2, p: 4, mt: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #e8f5ff 100%)', textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={700} color="#0d47a1" sx={{ mb: 1 }}>
            Cần tư vấn thêm về cân điện tử?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Đội ngũ kỹ thuật Bách Khoa sẵn sàng hỗ trợ bạn 7 ngày/tuần tại Huế & Đà Nẵng
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 2 }}>
            <Button variant="contained" href="tel:0938561554" startIcon={<FontAwesomeIcon icon={faPhone} />} sx={{ background: 'linear-gradient(135deg, #0d47a1, #1976d2)', borderRadius: 1, fontWeight: 700, px: 4 }}>
              0938.561.554
            </Button>
            <Button variant="outlined" onClick={() => onNavigate && onNavigate('contact')} sx={{ borderColor: '#0d47a1', color: '#0d47a1', borderRadius: 1, fontWeight: 700, px: 4, '&:hover': { background: '#0d47a1', color: '#fff' } }}>
              Gửi Yêu Cầu
            </Button>
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" useFlexGap>
            {['Sửa cân tận nơi trong 2 giờ', 'Bảo hành 3–12 tháng', 'Miễn phí kiểm tra ban đầu'].map(item => (
              <Stack key={item} direction="row" spacing={0.75} alignItems="center">
                <FontAwesomeIcon icon={faCircleCheck} color="#0d47a1" size="sm" />
                <Typography variant="caption" color="#555">{item}</Typography>
              </Stack>
            ))}
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
                <Paper key={rp.id} elevation={0} onClick={() => onBackToBlog && onBackToBlog(rp.id)}
                  sx={{ border: '1.5px solid #dce8ff', borderRadius: 1.5, overflow: 'hidden', cursor: 'pointer', transition: '0.2s', '&:hover': { borderColor: '#0d47a1', background: '#e3f2fd' } }}>
                  <Stack direction="row" alignItems="stretch">
                    <Box sx={{ width: 110, minHeight: 80, flexShrink: 0, overflow: 'hidden', background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
                      <Box component="img" src={rp.image} alt={rp.imageAlt || rp.title}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display='none'; }} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Chip label={rp.categoryLabel} size="small" sx={{ mb: 1, background: '#e3f2fd', color: '#0d47a1', fontWeight: 700, borderRadius: 0.75, fontSize: '0.68rem' }} />
                      <Typography variant="body2" fontWeight={700} color="#0d47a1" sx={{ mb: 0.5, lineHeight: 1.4 }}>{rp.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{formatDate(rp.date)}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* All blog CTA */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={() => onBackToBlog && onBackToBlog()}
            sx={{ borderColor: '#0d47a1', color: '#0d47a1', borderRadius: 1, px: 4, mr: 2, '&:hover': { background: '#0d47a1', color: '#fff' } }}>
            ← Xem Tất Cả Bài Viết
          </Button>
          <Button variant="text" onClick={() => onNavigate && onNavigate('home')}
            sx={{ color: '#666', textTransform: 'none' }}>
            Về Trang Chủ
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
