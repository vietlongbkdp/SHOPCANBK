import { Box, Container, Typography, Button, Stack, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight, faScrewdriverWrench, faShieldHalved, faTruck,
  faHeadset, faStar, faFire, faPhone, faMedal,
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

const WHY_US = [
  { icon: faShieldHalved, title: 'Chính Hãng 100%', desc: 'Nguồn gốc rõ ràng, bảo hành từ nhà sản xuất.' },
  { icon: faScrewdriverWrench, title: 'Sửa Chữa Tận Nơi', desc: 'KTV đến tận nơi tại Huế & Đà Nẵng trong 2 giờ.' },
  { icon: faTruck, title: 'Giao Hàng Toàn Quốc', desc: 'Giao 24–48h, hỗ trợ COD, đóng gói kỹ càng.' },
  { icon: faHeadset, title: 'Hỗ Trợ 24/7', desc: 'Tư vấn kỹ thuật miễn phí qua điện thoại & Zalo.' },
];

function SectionHead({ eyebrow, title, onViewAll }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={{ xs: 1.8, md: 2.5 }} gap={1}>
      <Box sx={{ minWidth: 0 }}>
        {eyebrow && (
          <Typography sx={{ color: T.brand, fontWeight: 700, fontSize: { xs: 10, md: 12 }, letterSpacing: '0.1em', mb: 0.3 }}>
            {eyebrow}
          </Typography>
        )}
        <Typography component="h2" sx={{ fontWeight: 800, color: T.ink, fontSize: { xs: '17px', md: '24px' }, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
          {title}
        </Typography>
      </Box>
      {onViewAll && (
        <>
          {/* Desktop: nút chữ */}
          <Button onClick={onViewAll}
            endIcon={<FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 12 }} />}
            sx={{ display: { xs: 'none', sm: 'flex' }, color: T.brand, fontWeight: 700, fontSize: 13, flexShrink: 0, '&:hover': { background: T.gradientSoft } }}>
            Xem tất cả
          </Button>
          {/* Mobile: mũi tên nhỏ */}
          <Box onClick={onViewAll} role="button" aria-label="Xem tất cả"
            sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', justifyContent: 'center',
              width: 30, height: 30, borderRadius: '50%', background: T.gradientSoft, flexShrink: 0, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 13, color: T.brand }} />
          </Box>
        </>
      )}
    </Stack>
  );
}

function ProductSection({ eyebrow, title, products, onProductClick, onNavigate }) {
  if (!products.length) return null;
  return (
    <Box component="section" sx={{ mb: { xs: 4, md: 6 } }}>
      <SectionHead eyebrow={eyebrow} title={title} onViewAll={() => onNavigate('products')} />
      <Box sx={{ display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(3,1fr)', md: 'repeat(4,1fr)', lg: 'repeat(5,1fr)' },
        gap: { xs: 1, md: 2 } }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </Box>
    </Box>
  );
}

export default function Home({ onProductClick, onNavigate }) {
  const { siteData } = useAdmin();
  const { products, stats, services, company } = siteData;
  const byCategory = (id) => products.filter(p => p.category === id);
  const topSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

  return (
    <Box>
      {/* Stats strip */}
      <Box sx={{ background: T.ink, color: '#fff', py: { xs: 2, md: 2.5 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{ flex: 1, textAlign: 'center', px: 0.5,
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.12)' : 'none' }}>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: '18px', sm: '24px', md: '32px' }, lineHeight: 1,
                  background: `linear-gradient(135deg,${T.accentLight},#fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </Typography>
                <Typography sx={{ opacity: .7, fontSize: { xs: '9px', sm: '11px', md: '12.5px' }, mt: 0.4, lineHeight: 1.2 }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' }, gap: { xs: 0, lg: 4 } }}>
          {/* Main */}
          <Box sx={{ minWidth: 0 }}>
            <ProductSection eyebrow="BÁN CHẠY NHẤT" title="Cân Tính Tiền"
              products={byCategory(1)} onProductClick={onProductClick} onNavigate={onNavigate} />

            {/* Repair CTA band */}
            <Box sx={{
              position: 'relative', overflow: 'hidden', borderRadius: 4, mb: { xs: 4, md: 6 },
              background: T.gradient, p: { xs: 2.5, md: 4 },
            }}>
              <Box sx={{ position: 'absolute', top: -40, right: -20, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ color: '#fff' }}>
                  <Stack direction="row" spacing={1.2} alignItems="center" mb={0.8}>
                    <FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 16, md: 22 }, letterSpacing: '-0.01em' }}>
                      Cân hỏng? Gọi là có mặt!
                    </Typography>
                  </Stack>
                  <Typography sx={{ opacity: .9, fontSize: { xs: 12.5, md: 14 } }}>
                    Kỹ thuật viên tận nơi tại Huế &amp; Đà Nẵng · Bảo hành 3 tháng
                  </Typography>
                </Box>
                <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
                  startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                  sx={{ background: '#fff', color: T.brand, fontWeight: 800, px: 3, py: 1.3, borderRadius: 2.5, flexShrink: 0,
                    boxShadow: '0 6px 20px rgba(0,0,0,.2)', '&:hover': { background: '#fff', transform: 'translateY(-2px)' }, transition: 'all .2s' }}>
                  {company.phone1}
                </Button>
              </Box>
            </Box>

            <ProductSection eyebrow="CÔNG NGHIỆP · THƯƠNG MẠI" title="Cân Bàn Điện Tử"
              products={byCategory(2)} onProductClick={onProductClick} onNavigate={onNavigate} />
            <ProductSection eyebrow="NÔNG SẢN · THỦY SẢN" title="Cân Ghế Điện Tử"
              products={byCategory(3)} onProductClick={onProductClick} onNavigate={onNavigate} />
            <ProductSection eyebrow="ĐỘ CHÍNH XÁC CAO" title="Cân Kỹ Thuật · Tiểu Ly"
              products={byCategory(6)} onProductClick={onProductClick} onNavigate={onNavigate} />

            {/* Why us */}
            <Box component="section">
              <SectionHead eyebrow="CAM KẾT CỦA CHÚNG TÔI" title="Tại Sao Chọn Bách Khoa?" />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4,1fr)' }, gap: 1.5 }}>
                {WHY_US.map((w, i) => (
                  <Box key={i} sx={{ background: T.surface, borderRadius: 3, p: 2.2, border: `1px solid ${T.line}`,
                    transition: 'all .25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 28px ${T.brand}14`, borderColor: T.brandLight } }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 2.5, background: T.gradient, mb: 1.5,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 16px ${T.brand}40` }}>
                      <FontAwesomeIcon icon={w.icon} style={{ fontSize: 19, color: '#fff' }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.5, color: T.ink }}>{w.title}</Typography>
                    <Typography sx={{ fontSize: 12.5, color: T.inkSoft, lineHeight: 1.6 }}>{w.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box sx={{ mt: { xs: 4, lg: 0 }, minWidth: 0 }}>
            <Box sx={{ position: { lg: 'sticky' }, top: 76, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Top sellers */}
              <Box sx={{ background: T.surface, borderRadius: 3, p: 2.2, border: `1px solid ${T.line}` }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Box sx={{ width: 30, height: 30, borderRadius: 2, background: T.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faFire} style={{ fontSize: 14, color: '#fff' }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 14 }}>Bán Chạy Nhất</Typography>
                </Stack>
                <Stack spacing={1.5} divider={<Divider flexItem />}>
                  {topSellers.map((p, i) => (
                    <Stack key={p.id} direction="row" spacing={1.2} alignItems="center"
                      sx={{ cursor: 'pointer', '&:hover .pt': { color: T.brand } }} onClick={() => onProductClick?.(p)}>
                      <Typography sx={{ fontWeight: 900, fontSize: 18, width: 22, textAlign: 'center', flexShrink: 0,
                        color: i < 3 ? T.brand : '#d4cbc4' }}>{i + 1}</Typography>
                      <Box component="img" src={p.image} alt={p.name} loading="lazy"
                        sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 2, flexShrink: 0, border: `1px solid ${T.line}` }}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography className="pt" sx={{ fontSize: 12, fontWeight: 600, color: T.ink, lineHeight: 1.35, transition: 'color .2s',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</Typography>
                        <Typography sx={{ fontSize: 12, color: T.brand, fontWeight: 800, mt: 0.2 }}>
                          {Number(p.price).toLocaleString('vi-VN')}₫
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* CTA */}
              <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 3, p: 2.5, background: `linear-gradient(135deg,${T.ink},#102a52)`, color: '#fff' }}>
                <Box sx={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle,${T.accent}44,transparent 70%)` }} />
                <Stack direction="row" spacing={1.2} alignItems="center" mb={1}>
                  <FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: 20, color: T.accentLight }} />
                  <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Cần sửa chữa?</Typography>
                </Stack>
                <Typography sx={{ fontSize: 12.5, opacity: .8, mb: 2, lineHeight: 1.6 }}>
                  Gọi ngay để kỹ thuật viên đến tận nơi nhanh nhất.
                </Typography>
                <Stack spacing={1}>
                  {[company.phone1, company.phone2].map((ph, i) => (
                    <Button key={ph} component="a" href={`tel:${ph.replace(/\s/g,'')}`} fullWidth
                      startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 13 }} />}
                      sx={{ background: i === 0 ? T.gradient : 'rgba(255,255,255,.1)', color: '#fff', fontWeight: 700, fontSize: 13, py: 1, borderRadius: 2,
                        border: i === 0 ? 'none' : '1px solid rgba(255,255,255,.25)',
                        '&:hover': { background: i === 0 ? T.gradientDark : 'rgba(255,255,255,.18)' } }}>
                      {ph}
                    </Button>
                  ))}
                </Stack>
              </Box>

              {/* Services */}
              <Box sx={{ background: T.surface, borderRadius: 3, p: 2.2, border: `1px solid ${T.line}` }}>
                <Typography sx={{ fontWeight: 800, fontSize: 14, mb: 1.5 }}>Dịch Vụ</Typography>
                <Stack spacing={0.5}>
                  {services.map(sv => (
                    <Stack key={sv.id} direction="row" spacing={1.2} alignItems="center" onClick={() => onNavigate('services')}
                      sx={{ px: 1, py: 0.9, borderRadius: 2, cursor: 'pointer', '&:hover': { background: T.gradientSoft } }}>
                      <Typography sx={{ fontSize: 18, lineHeight: 1 }}>{sv.icon}</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: T.ink, flex: 1 }}>{sv.title}</Typography>
                      <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 11, color: '#ccc' }} />
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
