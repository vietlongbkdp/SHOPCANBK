import { Dialog, DialogContent, Grid, Typography, Button, Stack, Chip, Divider, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPhone, faCartShopping, faShieldHalved, faTruck, faStar } from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { T } from '../theme';

export default function ProductDetail({ product, onClose }) {
  const { siteData } = useAdmin();
  const { addItem }  = useCart();
  const { company }  = siteData;
  const theme    = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!product) return null;

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <Dialog open={Boolean(product)} onClose={onClose} maxWidth="md" fullWidth fullScreen={fullScreen}
      PaperProps={{ sx: {
        borderRadius: fullScreen ? 0 : 4,
        m: fullScreen ? 0 : 2,
        width: fullScreen ? '100%' : 'auto',
        maxWidth: fullScreen ? '100%' : 'md',
        height: fullScreen ? '100%' : 'auto',
        maxHeight: fullScreen ? '100%' : '92vh',
      } }}>
      <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
        <IconButton onClick={onClose} size="small" sx={{ background: 'rgba(0,0,0,.06)', backdropFilter: 'blur(4px)', '&:hover': { background: 'rgba(0,0,0,.12)' } }}>
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 2, sm: 3.5 }, overflowY: 'auto' }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Image */}
          <Grid item xs={12} sm={5}>
            <Box sx={{ position: 'relative' }}>
              <Box component="img" src={product.image} alt={product.name}
                sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 3, border: `1px solid ${T.line}` }}
                onError={(e) => { e.target.src = 'https://placehold.co/400/faf7f5/d32f2f?text=Cân'; }} />
              {discount > 0 && (
                <Box sx={{ position: 'absolute', top: 12, left: 12, background: T.gradient, color: '#fff', borderRadius: 2, px: 1.2, py: 0.5,
                  boxShadow: `0 4px 12px ${T.brand}55` }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 800, lineHeight: 1 }}>Giảm {discount}%</Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Info */}
          <Grid item xs={12} sm={7}>
            {product.badge && <Chip label={product.badge} size="small" sx={{ background: T.gradient, color: '#fff', mb: 1, fontWeight: 700, fontSize: 11 }} />}
            <Typography component="h2" sx={{ fontWeight: 800, color: T.ink, mb: 1, lineHeight: 1.3, fontSize: { xs: '17px', md: '22px' } }}>
              {product.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Stack direction="row" spacing={0.2}>
                {[1,2,3,4,5].map(i => <FontAwesomeIcon key={i} icon={faStar} style={{ fontSize: 13, color: i <= Math.round(product.rating) ? T.star : '#e0d8d2' }} />)}
              </Stack>
              <Typography sx={{ fontSize: 12.5, color: T.inkSoft }}>({product.reviews} đánh giá)</Typography>
            </Stack>

            <Box sx={{ background: T.gradientSoft, borderRadius: 3, p: 2, mb: 2 }}>
              <Typography sx={{ background: T.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontWeight: 900, fontSize: { xs: '24px', md: '30px' }, lineHeight: 1 }}>
                {Number(product.price).toLocaleString('vi-VN')}₫
              </Typography>
              {product.originalPrice > product.price && (
                <Typography component="s" sx={{ color: '#bbb', fontSize: 15 }}>{Number(product.originalPrice).toLocaleString('vi-VN')}₫</Typography>
              )}
            </Box>

            <Typography sx={{ color: T.inkSoft, fontSize: 13.5, lineHeight: 1.75, mb: 2 }}>{product.description}</Typography>

            {product.specifications && (
              <Box mb={2}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1 }}>Thông số kỹ thuật</Typography>
                <Grid container spacing={0.8}>
                  {Object.entries(product.specifications).filter(([,v]) => v).map(([k,v]) => (
                    <Grid item xs={6} key={k}>
                      <Box sx={{ background: T.bg, borderRadius: 2, px: 1.4, py: 0.8 }}>
                        <Typography sx={{ fontSize: 11, color: T.inkSoft, textTransform: 'capitalize' }}>{k}</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{v}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />
            <Stack spacing={1} mb={2}>
              {[{ icon: faShieldHalved, text: 'Hàng chính hãng, bảo hành đầy đủ' }, { icon: faTruck, text: 'Giao hàng toàn quốc 24–48h' }].map((it, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <FontAwesomeIcon icon={it.icon} style={{ fontSize: 15, color: T.brand }} />
                  <Typography sx={{ fontSize: 12.5, color: T.inkSoft }}>{it.text}</Typography>
                </Stack>
              ))}
            </Stack>

            <Stack spacing={1}>
              <Button variant="contained" size="large" fullWidth
                startIcon={<FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 15 }} />}
                onClick={() => { addItem(product, 1); onClose(); }}
                sx={{ background: T.gradient, fontWeight: 800, py: 1.3, borderRadius: 2.5, '&:hover': { background: T.gradientDark } }}>
                Thêm Vào Giỏ Hàng
              </Button>
              <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`} variant="outlined" size="large" fullWidth
                startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                sx={{ borderColor: T.brand, color: T.brand, fontWeight: 700, py: 1.3, borderRadius: 2.5, '&:hover': { background: T.gradientSoft, borderColor: T.brand } }}>
                Gọi {company.phone1} đặt hàng
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
