import { Box, Container, Grid, Typography, Paper, Button, Stack, Divider, Avatar, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StarIcon from '@mui/icons-material/Star';
import ProductCard from './ProductCard';
import data from '../data.json';

const { products, categories, stats, news, services, company } = data;

const WHY_US = [
  { icon: <VerifiedIcon sx={{ color: '#c62828', fontSize: 32 }} />, title: 'Chính Hãng 100%', desc: 'Tất cả sản phẩm đều có nguồn gốc rõ ràng, bảo hành chính hãng từ nhà sản xuất.' },
  { icon: <BuildIcon sx={{ color: '#c62828', fontSize: 32 }} />, title: 'Sửa Chữa Tận Nơi', desc: 'Kỹ thuật viên đến tận nơi tại Huế & Đà Nẵng trong vòng 2 giờ làm việc.' },
  { icon: <LocalShippingIcon sx={{ color: '#c62828', fontSize: 32 }} />, title: 'Giao Hàng Toàn Quốc', desc: 'Giao hàng nhanh 24–48h, hỗ trợ COD, đóng gói kỹ đảm bảo an toàn sản phẩm.' },
  { icon: <SupportAgentIcon sx={{ color: '#c62828', fontSize: 32 }} />, title: 'Hỗ Trợ 24/7', desc: 'Tư vấn kỹ thuật miễn phí qua điện thoại, Zalo. Luôn có người trực hỗ trợ.' },
];

function SectionHeader({ title, subtitle, onViewAll }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={2}>
      <Box>
        <Box sx={{ width: 40, height: 4, background: '#c62828', borderRadius: 2, mb: 0.8 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#212121', fontSize: { xs: '16px', md: '20px' } }}>
          {title}
        </Typography>
        {subtitle && <Typography sx={{ color: '#666', fontSize: 13 }}>{subtitle}</Typography>}
      </Box>
      {onViewAll && (
        <Button endIcon={<ArrowForwardIcon />} onClick={onViewAll}
          sx={{ color: '#c62828', fontWeight: 600, fontSize: 13, '&:hover': { background: '#fff5f5' } }}>
          Xem thêm
        </Button>
      )}
    </Stack>
  );
}

export default function Home({ onProductClick, onNavigate }) {
  const canTinhTien = products.filter(p => p.category === 1);
  const canBan = products.filter(p => p.category === 2);
  const canGhe = products.filter(p => p.category === 3);
  const canKyThuat = products.filter(p => p.category === 6);
  const topSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 6);

  return (
    <Box sx={{ background: '#f5f5f5' }}>
      {/* Stats Bar */}
      <Box sx={{ background: '#c62828', color: 'white', py: { xs: 1.5, md: 2 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {stats.map((s, i) => (
              <Grid item xs={6} sm={3} key={i} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '20px', md: '28px' }, lineHeight: 1 }}>{s.value}</Typography>
                <Typography sx={{ fontSize: { xs: 11, md: 13 }, opacity: 0.9 }}>{s.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          {/* Left Main Content */}
          <Grid item xs={12} md={9}>

            {/* Cân Tính Tiền */}
            <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1 }}>
              <SectionHeader
                title="CÂN TÍNH TIỀN"
                subtitle="Chuyên dùng cho chợ, cửa hàng, siêu thị"
                onViewAll={() => onNavigate && onNavigate('products')}
              />
              <Grid container spacing={1.5}>
                {canTinhTien.map(p => (
                  <Grid item xs={6} sm={4} md={3} key={p.id}>
                    <ProductCard product={p} onClick={onProductClick} />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Promo Banner */}
            <Box sx={{
              mb: 2, borderRadius: 1, overflow: 'hidden',
              background: 'linear-gradient(135deg, #1a237e, #0277bd)',
              color: 'white', p: { xs: 2, md: 3 },
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 1,
            }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: 16, md: 22 } }}>🔧 SỬA CHỮA CÂN ĐIỆN TỬ TẬN NƠI</Typography>
                <Typography sx={{ opacity: 0.85, fontSize: { xs: 12, md: 14 } }}>Tại Huế & Đà Nẵng – Nhanh chóng – Chính xác – Bảo hành sau sửa chữa</Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`}
                sx={{ background: '#ffeb3b', color: '#1a1a1a', fontWeight: 700, '&:hover': { background: '#fdd835' } }}
              >
                📞 {company.phone1}
              </Button>
            </Box>

            {/* Cân Bàn */}
            <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1 }}>
              <SectionHeader
                title="CÂN BÀN ĐIỆN TỬ"
                subtitle="100kg – 1 tấn, dùng cho công nghiệp & thương mại"
                onViewAll={() => onNavigate && onNavigate('products')}
              />
              <Grid container spacing={1.5}>
                {canBan.map(p => (
                  <Grid item xs={6} sm={4} md={3} key={p.id}>
                    <ProductCard product={p} onClick={onProductClick} />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Cân Ghế */}
            <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1 }}>
              <SectionHeader
                title="CÂN GHẾ ĐIỆN TỬ"
                subtitle="100kg – 1 tấn, chuyên nông sản, thủy sản"
                onViewAll={() => onNavigate && onNavigate('products')}
              />
              <Grid container spacing={1.5}>
                {canGhe.map(p => (
                  <Grid item xs={6} sm={4} md={3} key={p.id}>
                    <ProductCard product={p} onClick={onProductClick} />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Cân Kỹ Thuật */}
            <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1 }}>
              <SectionHeader
                title="CÂN KỸ THUẬT – TIỂU LY"
                subtitle="Độ chính xác cực cao, cân vàng, cân yến, phòng thí nghiệm"
                onViewAll={() => onNavigate && onNavigate('products')}
              />
              <Grid container spacing={1.5}>
                {canKyThuat.map(p => (
                  <Grid item xs={6} sm={4} md={3} key={p.id}>
                    <ProductCard product={p} onClick={onProductClick} />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Why Choose Us */}
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1 }}>
              <SectionHeader title="TẠI SAO CHỌN BÁCH KHOA?" />
              <Grid container spacing={2}>
                {WHY_US.map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Stack direction="row" spacing={2} alignItems="flex-start"
                      sx={{ p: 1.5, borderRadius: 1, background: '#fafafa', border: '1px solid #f0f0f0' }}>
                      <Avatar sx={{ background: '#fff5f5', width: 48, height: 48 }}>{item.icon}</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.3 }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: 12.5, color: '#666', lineHeight: 1.5 }}>{item.desc}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* News */}
            <Paper sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 1 }}>
              <SectionHeader title="TIN TỨC & KIẾN THỨC" onViewAll={() => onNavigate && onNavigate('news')} />
              <Stack spacing={1.5}>
                {news.map(n => (
                  <Stack key={n.id} direction="row" spacing={1.5} sx={{
                    p: 1, borderRadius: 1, cursor: 'pointer',
                    '&:hover': { background: '#fafafa' }, transition: 'background 0.2s',
                  }}>
                    <Box component="img" src={n.image} alt={n.title}
                      sx={{ width: 90, height: 66, objectFit: 'cover', borderRadius: 1, flexShrink: 0 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#212121', lineHeight: 1.4, mb: 0.4 }}>
                        {n.title}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#888', mb: 0.3 }}>{n.date}</Typography>
                      <Typography sx={{ fontSize: 12, color: '#666', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {n.summary}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            {/* Top Sellers */}
            <Paper sx={{ p: 1.5, mb: 2, borderRadius: 1, position: 'sticky', top: 70 }}>
              <Stack direction="row" alignItems="center" spacing={0.5} mb={1.5}>
                <StarIcon sx={{ color: '#f9a825', fontSize: 18 }} />
                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>TOP BÁN CHẠY</Typography>
              </Stack>
              <Stack spacing={1.5} divider={<Divider flexItem />}>
                {topSellers.map((p, i) => (
                  <Stack key={p.id} direction="row" spacing={1} alignItems="center"
                    sx={{ cursor: 'pointer', '&:hover .prod-title': { color: '#c62828' } }}
                    onClick={() => onProductClick && onProductClick(p)}
                  >
                    <Typography sx={{ fontWeight: 800, color: i < 3 ? '#c62828' : '#888', fontSize: 16, minWidth: 20 }}>
                      {i + 1}
                    </Typography>
                    <Box component="img" src={p.image} alt={p.name}
                      sx={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 1, flexShrink: 0 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography className="prod-title" sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, color: '#333', transition: 'color 0.2s', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {p.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#c62828', fontWeight: 700 }}>
                        {p.price.toLocaleString('vi-VN')}₫
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            {/* Contact CTA */}
            <Paper sx={{ p: 2, borderRadius: 1, background: 'linear-gradient(135deg, #c62828, #e65100)', color: 'white' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>🔧 CẦN SỬA CHỮA?</Typography>
              <Typography sx={{ fontSize: 12, opacity: 0.9, mb: 2, lineHeight: 1.5 }}>
                Gọi ngay để được kỹ thuật viên tư vấn và đến tận nơi hỗ trợ tại Huế & Đà Nẵng.
              </Typography>
              <Button fullWidth variant="contained"
                onClick={() => window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`}
                sx={{ background: 'white', color: '#c62828', fontWeight: 700, mb: 1, '&:hover': { background: '#f5f5f5' } }}
              >
                📞 {company.phone1}
              </Button>
              <Button fullWidth variant="outlined"
                onClick={() => window.location.href = `tel:${company.phone2.replace(/\s/g, '')}`}
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)', fontWeight: 600, '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' } }}
              >
                📞 {company.phone2}
              </Button>
            </Paper>

            {/* Services quick list */}
            <Paper sx={{ p: 1.5, mt: 2, borderRadius: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1.5, color: '#212121' }}>DỊCH VỤ CỦA CHÚNG TÔI</Typography>
              <Stack spacing={0.8}>
                {services.map(s => (
                  <Stack key={s.id} direction="row" spacing={1} alignItems="center"
                    sx={{ p: 0.8, borderRadius: 1, cursor: 'pointer', '&:hover': { background: '#fff5f5' }, transition: 'background 0.15s' }}
                    onClick={() => onNavigate && onNavigate('services')}
                  >
                    <Typography sx={{ fontSize: 20 }}>{s.icon}</Typography>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#333' }}>{s.title}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
