import { Box, Container, Grid, Typography, Paper, Button, Stack, Divider, Avatar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StarIcon from '@mui/icons-material/Star';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';

const WHY_US = [
  { icon: <VerifiedIcon sx={{ color: '#c62828', fontSize: 28 }} />, title: 'Chính Hãng 100%', desc: 'Tất cả sản phẩm đều có nguồn gốc rõ ràng, bảo hành chính hãng từ nhà sản xuất.' },
  { icon: <BuildIcon sx={{ color: '#c62828', fontSize: 28 }} />, title: 'Sửa Chữa Tận Nơi', desc: 'Kỹ thuật viên đến tận nơi tại Huế & Đà Nẵng trong vòng 2 giờ làm việc.' },
  { icon: <LocalShippingIcon sx={{ color: '#c62828', fontSize: 28 }} />, title: 'Giao Hàng Toàn Quốc', desc: 'Giao hàng nhanh 24–48h, hỗ trợ COD, đóng gói kỹ đảm bảo an toàn.' },
  { icon: <SupportAgentIcon sx={{ color: '#c62828', fontSize: 28 }} />, title: 'Hỗ Trợ 24/7', desc: 'Tư vấn kỹ thuật miễn phí qua điện thoại, Zalo. Luôn có người trực hỗ trợ.' },
];

function SectionHeader({ title, subtitle, onViewAll }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2} gap={1}>
      <Box>
        <Box sx={{ width: 36, height: 3, background: '#c62828', borderRadius: 2, mb: 0.6 }} />
        <Typography component="h2" sx={{ fontWeight: 700, color: '#111', fontSize: { xs: '15px', md: '19px' }, lineHeight: 1.2 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: '#777', fontSize: { xs: 11.5, md: 12.5 }, mt: 0.3 }}>{subtitle}</Typography>
        )}
      </Box>
      {onViewAll && (
        <Button
          endIcon={<ArrowForwardIcon />} onClick={onViewAll} size="small"
          sx={{ color: '#c62828', fontWeight: 600, fontSize: 12.5, flexShrink: 0, '&:hover': { background: '#fff5f5' } }}
        >
          Xem thêm
        </Button>
      )}
    </Stack>
  );
}

function ProductSection({ title, subtitle, products, onProductClick, onNavigate }) {
  return (
    <Paper component="section" elevation={0} sx={{ p: { xs: 1.2, md: 2 }, mb: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>
      <SectionHeader title={title} subtitle={subtitle} onViewAll={() => onNavigate('products')} />
      <Grid container spacing={{ xs: 1, md: 1.5 }}>
        {products.map((p) => (
          <Grid item xs={6} sm={4} md={3} key={p.id}>
            <ProductCard product={p} onClick={onProductClick} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default function Home({ onProductClick, onNavigate }) {
  const { siteData } = useAdmin();
  const { products, stats, services, company } = siteData;

  const byCategory = (cat) => products.filter((p) => p.category === cat);
  const topSellers  = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 6);

  return (
    <Box sx={{ background: '#f5f5f5' }}>
      {/* Stats bar */}
      <Box component="section" aria-label="Thống kê" sx={{ background: '#c62828', color: '#fff', py: { xs: 1.5, md: 2 } }}>
        <Container maxWidth="lg">
          <Grid container>
            {stats.map((s, i) => (
              <Grid key={i} item xs={6} sm={3}
                sx={{
                  textAlign: 'center', py: { xs: 0.5, md: 0 },
                  borderRight: { sm: i < stats.length - 1 ? '1px solid rgba(255,255,255,.2)' : 'none' },
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '22px', md: '30px' }, lineHeight: 1 }}>{s.value}</Typography>
                <Typography sx={{ fontSize: { xs: 11, md: 13 }, opacity: 0.88 }}>{s.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 1.5, md: 3 }, px: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={2}>
          {/* ── Main content ── */}
          <Grid item xs={12} md={9}>

            <ProductSection
              title="CÂN TÍNH TIỀN"
              subtitle="Chuyên dùng cho chợ, cửa hàng, siêu thị"
              products={byCategory(1)}
              onProductClick={onProductClick}
              onNavigate={onNavigate}
            />

            {/* Promo banner */}
            <Box
              component="aside"
              sx={{
                mb: 2, borderRadius: 1, overflow: 'hidden',
                background: 'linear-gradient(135deg,#1a237e,#0277bd)',
                color: '#fff', p: { xs: 2, md: 2.5 },
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: 15, md: 20 }, mb: 0.3 }}>
                  🔧 SỬA CHỮA CÂN ĐIỆN TỬ TẬN NƠI
                </Typography>
                <Typography sx={{ opacity: 0.85, fontSize: { xs: 12, md: 13.5 } }}>
                  Tại Huế &amp; Đà Nẵng – Nhanh chóng – Chính xác – Bảo hành sau sửa chữa
                </Typography>
              </Box>
              <Button
                variant="contained"
                href={`tel:${company.phone1.replace(/\s/g, '')}`}
                component="a"
                sx={{ background: '#ffeb3b', color: '#111', fontWeight: 700, flexShrink: 0, '&:hover': { background: '#fdd835' } }}
              >
                📞 {company.phone1}
              </Button>
            </Box>

            <ProductSection
              title="CÂN BÀN ĐIỆN TỬ"
              subtitle="100kg – 1 tấn, dùng cho công nghiệp & thương mại"
              products={byCategory(2)}
              onProductClick={onProductClick}
              onNavigate={onNavigate}
            />

            <ProductSection
              title="CÂN GHẾ ĐIỆN TỬ"
              subtitle="100kg – 1 tấn, chuyên nông sản, thủy sản"
              products={byCategory(3)}
              onProductClick={onProductClick}
              onNavigate={onNavigate}
            />

            <ProductSection
              title="CÂN KỸ THUẬT – TIỂU LY"
              subtitle="Độ chính xác cực cao, cân vàng, cân yến, phòng thí nghiệm"
              products={byCategory(6)}
              onProductClick={onProductClick}
              onNavigate={onNavigate}
            />

            {/* Why us */}
            <Paper component="section" elevation={0} sx={{ p: { xs: 1.5, md: 2.5 }, mb: 2, borderRadius: 1, border: '1px solid #ebebeb' }}>
              <SectionHeader title="TẠI SAO CHỌN BÁCH KHOA?" />
              <Grid container spacing={1.5}>
                {WHY_US.map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Stack
                      direction="row" spacing={1.5} alignItems="flex-start"
                      sx={{ p: 1.5, borderRadius: 1, background: '#fafafa', border: '1px solid #f0f0f0', height: '100%' }}
                    >
                      <Avatar sx={{ background: '#fff5f5', width: 44, height: 44, flexShrink: 0 }}>{item.icon}</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 13.5, mb: 0.3 }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: 12.5, color: '#666', lineHeight: 1.55 }}>{item.desc}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* ── Sidebar ── */}
          <Grid item xs={12} md={3}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 68 }, display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* Top sellers */}
              <Paper elevation={0} sx={{ p: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>
                <Stack direction="row" alignItems="center" spacing={0.6} mb={1.5}>
                  <StarIcon sx={{ color: '#f9a825', fontSize: 18 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>TOP BÁN CHẠY</Typography>
                </Stack>
                <Stack spacing={1.2} divider={<Divider flexItem />}>
                  {topSellers.map((p, i) => (
                    <Stack
                      key={p.id} direction="row" spacing={1} alignItems="center"
                      sx={{
                        cursor: 'pointer',
                        '&:hover .prod-title': { color: '#c62828' },
                      }}
                      onClick={() => onProductClick?.(p)}
                    >
                      <Typography sx={{ fontWeight: 800, color: i < 3 ? '#c62828' : '#bbb', fontSize: 15, minWidth: 18, textAlign: 'center' }}>
                        {i + 1}
                      </Typography>
                      <Box
                        component="img" src={p.image} alt={p.name} loading="lazy"
                        sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1, flexShrink: 0, border: '1px solid #f0f0f0' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          className="prod-title"
                          sx={{
                            fontSize: 12, fontWeight: 600, color: '#333', lineHeight: 1.35,
                            transition: 'color .2s',
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          }}
                        >
                          {p.name}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#c62828', fontWeight: 700, mt: 0.2 }}>
                          {Number(p.price).toLocaleString('vi-VN')}₫
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Paper>

              {/* CTA */}
              <Paper
                elevation={0}
                sx={{ p: 2, borderRadius: 1, background: 'linear-gradient(135deg,#c62828,#e65100)', color: '#fff' }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.8 }}>🔧 CẦN SỬA CHỮA?</Typography>
                <Typography sx={{ fontSize: 12.5, opacity: 0.9, mb: 2, lineHeight: 1.6 }}>
                  Gọi ngay để kỹ thuật viên đến tận nơi tại Huế &amp; Đà Nẵng.
                </Typography>
                <Stack spacing={0.8}>
                  <Button
                    component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`} fullWidth variant="contained"
                    sx={{ background: '#fff', color: '#c62828', fontWeight: 700, fontSize: 13, '&:hover': { background: '#f5f5f5' } }}
                  >
                    📞 {company.phone1}
                  </Button>
                  <Button
                    component="a" href={`tel:${company.phone2.replace(/\s/g, '')}`} fullWidth variant="outlined"
                    sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)', fontWeight: 600, fontSize: 13, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}
                  >
                    📞 {company.phone2}
                  </Button>
                </Stack>
              </Paper>

              {/* Services list */}
              <Paper elevation={0} sx={{ p: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1.2 }}>DỊCH VỤ CỦA CHÚNG TÔI</Typography>
                <Stack spacing={0.5}>
                  {services.map((sv) => (
                    <Stack
                      key={sv.id} direction="row" spacing={1} alignItems="center"
                      onClick={() => onNavigate('services')}
                      sx={{ px: 1, py: 0.8, borderRadius: 1, cursor: 'pointer', '&:hover': { background: '#fff5f5' }, transition: 'background .15s' }}
                    >
                      <Typography sx={{ fontSize: 18, lineHeight: 1 }}>{sv.icon}</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{sv.title}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
