import { Box, Container, Grid, Typography, Paper, Button, Stack, Divider, Avatar, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faScrewdriverWrench, faShieldHalved, faTruck,
  faHeadset, faStar, faFire, faPhone,
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';

const WHY_US = [
  { icon: faShieldHalved, color: '#c62828', bg: '#fff5f5', title: 'Chính Hãng 100%', desc: 'Nguồn gốc rõ ràng, bảo hành chính hãng từ nhà sản xuất.' },
  { icon: faScrewdriverWrench, color: '#e65100', bg: '#fff8f5', title: 'Sửa Chữa Tận Nơi', desc: 'KTV đến tận nơi tại Huế & Đà Nẵng trong vòng 2 giờ.' },
  { icon: faTruck, color: '#1565c0', bg: '#f0f4ff', title: 'Giao Hàng Toàn Quốc', desc: 'Giao hàng 24–48h, hỗ trợ COD, đóng gói kỹ càng.' },
  { icon: faHeadset, color: '#2e7d32', bg: '#f0faf0', title: 'Hỗ Trợ 24/7', desc: 'Tư vấn kỹ thuật miễn phí qua điện thoại và Zalo.' },
];

function SectionHeader({ title, subtitle, onViewAll, icon }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={2} gap={1}>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" mb={0.4}>
          {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: 16, color: '#c62828' }} />}
          <Typography component="h2"
            sx={{ fontWeight: 700, color: '#1a1a2e', fontSize: { xs: '14px', md: '18px' }, lineHeight: 1.2 }}>
            {title}
          </Typography>
        </Stack>
        <Box sx={{ width: 40, height: 3, background: 'linear-gradient(90deg,#c62828,#e65100)', borderRadius: 2 }} />
        {subtitle && <Typography sx={{ color: '#78909c', fontSize: { xs: 11, md: 12.5 }, mt: 0.4 }}>{subtitle}</Typography>}
      </Box>
      {onViewAll && (
        <Button size="small" onClick={onViewAll}
          endIcon={<FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 11 }} />}
          sx={{ color: '#c62828', fontWeight: 600, fontSize: 12.5, '&:hover': { background: '#fff5f5' } }}>
          Xem thêm
        </Button>
      )}
    </Stack>
  );
}

function ProductSection({ title, subtitle, icon, products, onProductClick, onNavigate }) {
  if (!products.length) return null;
  return (
    <Box component="section" sx={{
      background: '#fff', borderRadius: 2, p: { xs: 1.5, md: 2.5 },
      mb: { xs: 1.5, md: 2 }, boxShadow: '0 2px 8px rgba(0,0,0,.06)',
      border: '1px solid #f0f0f0',
    }}>
      <SectionHeader title={title} subtitle={subtitle} icon={icon} onViewAll={() => onNavigate('products')} />
      <Grid container spacing={{ xs: 1, md: 1.5 }}>
        {products.map(p => (
          <Grid item xs={6} sm={4} md={3} key={p.id}>
            <ProductCard product={p} onClick={onProductClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function Home({ onProductClick, onNavigate }) {
  const { siteData } = useAdmin();
  const { products, stats, services, company } = siteData;

  const byCategory = (id) => products.filter(p => p.category === id);
  const topSellers  = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 6);

  return (
    <Box sx={{ background: '#f4f6f8' }}>

      {/* Stats bar */}
      <Box sx={{ background: 'linear-gradient(135deg,#c62828,#e53935)', color: '#fff', py: { xs: 1.2, md: 2 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{
                flex: 1, textAlign: 'center', px: { xs: 0.5, md: 1 },
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.2)' : 'none',
              }}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '16px', sm: '22px', md: '30px' }, lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ opacity: .85, fontSize: { xs: '9px', sm: '11px', md: '13px' }, mt: 0.3, lineHeight: 1.2 }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 1.5, md: 2.5 }}>

          {/* ── Main content ── */}
          <Grid item xs={12} lg={9}>
            <ProductSection title="CÂN TÍNH TIỀN" subtitle="Chuyên dùng cho chợ, cửa hàng, siêu thị"
              icon={faFire} products={byCategory(1)} onProductClick={onProductClick} onNavigate={onNavigate} />

            {/* Promo banner */}
            <Box sx={{
              background: 'linear-gradient(135deg,#1a237e 0%,#0d47a1 60%,#0277bd 100%)',
              borderRadius: 2, p: { xs: 2, md: 2.5 }, mb: { xs: 1.5, md: 2 },
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5,
            }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={0.4}>
                  <FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: 18, color: '#ffcc02' }} />
                  <Typography sx={{ fontWeight: 800, color: '#fff', fontSize: { xs: 14, md: 20 } }}>
                    SỬA CHỮA CÂN ĐIỆN TỬ TẬN NƠI
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'rgba(255,255,255,.8)', fontSize: { xs: 12, md: 13.5 } }}>
                  Huế &amp; Đà Nẵng · Nhanh chóng · Bảo hành sau sửa chữa 3 tháng
                </Typography>
              </Box>
              <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
                variant="contained"
                startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                sx={{ background: '#ffcc02', color: '#1a1a2e', fontWeight: 800, flexShrink: 0, fontSize: { xs: 12, md: 14 }, '&:hover': { background: '#ffd740' } }}>
                {company.phone1}
              </Button>
            </Box>

            <ProductSection title="CÂN BÀN ĐIỆN TỬ" subtitle="100kg – 1 tấn, công nghiệp & thương mại"
              products={byCategory(2)} onProductClick={onProductClick} onNavigate={onNavigate} />

            <ProductSection title="CÂN GHẾ ĐIỆN TỬ" subtitle="100kg – 1 tấn, nông sản, thủy sản"
              products={byCategory(3)} onProductClick={onProductClick} onNavigate={onNavigate} />

            <ProductSection title="CÂN KỸ THUẬT – TIỂU LY" subtitle="Cân vàng, cân yến, phòng thí nghiệm"
              products={byCategory(6)} onProductClick={onProductClick} onNavigate={onNavigate} />

            {/* Why us */}
            <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 1.5, md: 2.5 }, boxShadow: '0 2px 8px rgba(0,0,0,.06)', border: '1px solid #f0f0f0' }}>
              <SectionHeader title="TẠI SAO CHỌN BÁCH KHOA?" />
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
                gap: 1.5,
              }}>
                {WHY_US.map((w, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start"
                    sx={{ p: 1.5, borderRadius: 2, background: w.bg, border: `1px solid ${w.color}18` }}>
                    <Box sx={{
                      width: 40, height: 40, borderRadius: 2, background: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,.08)',
                    }}>
                      <FontAwesomeIcon icon={w.icon} style={{ fontSize: 18, color: w.color }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: { xs: 12.5, md: 13.5 }, mb: 0.3, color: '#1a1a2e' }}>{w.title}</Typography>
                      <Typography sx={{ fontSize: { xs: 11.5, md: 12.5 }, color: '#78909c', lineHeight: 1.55 }}>{w.desc}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* ── Sidebar ── */}
          <Grid item xs={12} lg={3}>
            <Box sx={{ position: { lg: 'sticky' }, top: 72, display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* Top sellers */}
              <Box sx={{ background: '#fff', borderRadius: 2, p: 2, boxShadow: '0 2px 8px rgba(0,0,0,.06)', border: '1px solid #f0f0f0' }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                  <Box sx={{ width: 28, height: 28, borderRadius: 1.5, background: 'linear-gradient(135deg,#f9a825,#ff6f00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faStar} style={{ fontSize: 14, color: '#fff' }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>TOP BÁN CHẠY</Typography>
                </Stack>
                <Stack spacing={1.2} divider={<Divider flexItem />}>
                  {topSellers.map((p, i) => (
                    <Stack key={p.id} direction="row" spacing={1.2} alignItems="center"
                      sx={{ cursor: 'pointer', '&:hover .pt': { color: '#c62828' } }}
                      onClick={() => onProductClick?.(p)}>
                      <Box sx={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        background: i < 3 ? 'linear-gradient(135deg,#c62828,#e53935)' : '#f4f6f8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Typography sx={{ fontSize: 11, fontWeight: 800, color: i < 3 ? '#fff' : '#90a4ae', lineHeight: 1 }}>
                          {i + 1}
                        </Typography>
                      </Box>
                      <Box component="img" src={p.image} alt={p.name} loading="lazy"
                        sx={{ width: 46, height: 46, objectFit: 'cover', borderRadius: 1.5, flexShrink: 0, border: '1px solid #f0f0f0' }}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography className="pt"
                          sx={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.35, transition: 'color .2s', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {p.name}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#c62828', fontWeight: 700, mt: 0.2 }}>
                          {Number(p.price).toLocaleString('vi-VN')}₫
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* CTA card */}
              <Box sx={{
                borderRadius: 2, p: 2.5, overflow: 'hidden', position: 'relative',
                background: 'linear-gradient(135deg,#c62828 0%,#e65100 100%)',
                color: '#fff',
              }}>
                <Box sx={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />
                <Box sx={{ position: 'absolute', bottom: -30, left: -10, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
                <Stack direction="row" spacing={1.2} alignItems="center" mb={1}>
                  <FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: 22, color: '#ffcc02' }} />
                  <Typography sx={{ fontWeight: 800, fontSize: 15 }}>CẦN SỬA CHỮA?</Typography>
                </Stack>
                <Typography sx={{ fontSize: 12.5, opacity: .9, mb: 2, lineHeight: 1.6 }}>
                  Gọi ngay để KTV đến tận nơi tại Huế &amp; Đà Nẵng trong 2 giờ.
                </Typography>
                <Stack spacing={0.8}>
                  <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`} fullWidth
                    variant="contained"
                    startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 13 }} />}
                    sx={{ background: '#fff', color: '#c62828', fontWeight: 800, fontSize: 13, '&:hover': { background: '#f5f5f5' } }}>
                    {company.phone1}
                  </Button>
                  <Button component="a" href={`tel:${company.phone2.replace(/\s/g,'')}`} fullWidth
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 13 }} />}
                    sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.55)', fontWeight: 600, fontSize: 13, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}>
                    {company.phone2}
                  </Button>
                </Stack>
              </Box>

              {/* Services */}
              <Box sx={{ background: '#fff', borderRadius: 2, p: 2, boxShadow: '0 2px 8px rgba(0,0,0,.06)', border: '1px solid #f0f0f0' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13.5, mb: 1.2, color: '#1a1a2e' }}>
                  <FontAwesomeIcon icon={faScrewdriverWrench} style={{ marginRight: 8, color: '#c62828', fontSize: 13 }} />
                  DỊCH VỤ
                </Typography>
                <Stack spacing={0.4}>
                  {services.map(sv => (
                    <Stack key={sv.id} direction="row" spacing={1.2} alignItems="center"
                      onClick={() => onNavigate('services')}
                      sx={{ px: 1, py: 0.8, borderRadius: 1.5, cursor: 'pointer', '&:hover': { background: '#fff5f5' }, transition: 'background .15s' }}>
                      <Typography sx={{ fontSize: 17, lineHeight: 1 }}>{sv.icon}</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#37474f' }}>{sv.title}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
