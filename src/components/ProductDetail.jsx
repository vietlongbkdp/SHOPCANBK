import { Dialog, DialogContent, Grid, Typography, Button, Stack, Chip, Divider, IconButton, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPhone, faCartShopping, faShieldHalved, faTruck, faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';

function StarRating({ value }) {
  return (
    <Stack direction="row" spacing={0.2}>
      {[1,2,3,4,5].map(i => (
        <FontAwesomeIcon key={i} icon={i <= Math.round(value) ? faStar : faStarEmpty}
          style={{ fontSize: 13, color: i <= Math.round(value) ? '#f9a825' : '#ddd' }} />
      ))}
    </Stack>
  );
}

export default function ProductDetail({ product, onClose }) {
  const { siteData } = useAdmin();
  const { addItem }  = useCart();
  const { company }  = siteData;

  if (!product) return null;

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <Dialog open={Boolean(product)} onClose={onClose} maxWidth="md" fullWidth
      PaperProps={{ sx: { borderRadius: { xs: 0, sm: 3 }, m: { xs: 0, sm: 2 }, maxHeight: { xs: '100dvh', sm: '90vh' } } }}>
      <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
        <IconButton onClick={onClose} size="small" sx={{ background: 'rgba(0,0,0,.06)', '&:hover': { background: 'rgba(0,0,0,.12)' } }}>
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 2, sm: 3 }, overflowY: 'auto' }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Image */}
          <Grid item xs={12} sm={5}>
            <Box sx={{ position: 'relative' }}>
              <Box component="img" src={product.image} alt={product.name}
                sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 2, border: '1px solid #eef0f3' }}
                onError={(e) => { e.target.src = 'https://placehold.co/400?text=Cân'; }} />
              {discount > 0 && (
                <Chip icon={<FontAwesomeIcon icon={faTag} style={{ fontSize: 11, color: '#fff', marginLeft: 8 }} />}
                  label={`Giảm ${discount}%`}
                  sx={{ position: 'absolute', top: 10, left: 10, background: 'linear-gradient(135deg,#c62828,#e53935)', color: '#fff', fontWeight: 700 }} />
              )}
            </Box>
          </Grid>

          {/* Info */}
          <Grid item xs={12} sm={7}>
            {product.badge && (
              <Chip label={product.badge} size="small" sx={{ background: '#e65100', color: '#fff', mb: 1, fontWeight: 600, fontSize: 11 }} />
            )}
            <Typography component="h2" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 1, lineHeight: 1.3, fontSize: { xs: '16px', md: '20px' } }}>
              {product.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <StarRating value={product.rating} />
              <Typography sx={{ fontSize: 12.5, color: '#78909c' }}>({product.reviews} đánh giá)</Typography>
            </Stack>

            <Box mb={2}>
              <Typography sx={{ color: '#c62828', fontWeight: 800, fontSize: { xs: '22px', md: '28px' }, lineHeight: 1 }}>
                {Number(product.price).toLocaleString('vi-VN')}₫
              </Typography>
              {product.originalPrice > product.price && (
                <Typography component="s" sx={{ color: '#b0bec5', fontSize: 15 }}>
                  {Number(product.originalPrice).toLocaleString('vi-VN')}₫
                </Typography>
              )}
            </Box>

            <Typography sx={{ color: '#546e7a', fontSize: 13.5, lineHeight: 1.75, mb: 2 }}>{product.description}</Typography>

            {product.specifications && (
              <Box mb={2}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1 }}>Thông số kỹ thuật:</Typography>
                <Grid container spacing={0.6}>
                  {Object.entries(product.specifications).filter(([,v]) => v).map(([k,v]) => (
                    <Grid item xs={6} key={k}>
                      <Box sx={{ background: '#f8f9fb', borderRadius: 1, px: 1.2, py: 0.6 }}>
                        <Typography sx={{ fontSize: 11, color: '#90a4ae', textTransform: 'capitalize' }}>{k}</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#37474f' }}>{v}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={0.8} mb={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faShieldHalved} style={{ fontSize: 15, color: '#2e7d32' }} />
                <Typography sx={{ fontSize: 12.5, color: '#546e7a' }}>Hàng chính hãng, bảo hành đầy đủ</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon icon={faTruck} style={{ fontSize: 15, color: '#1565c0' }} />
                <Typography sx={{ fontSize: 12.5, color: '#546e7a' }}>Giao hàng toàn quốc 24–48h</Typography>
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Button variant="contained" size="large" fullWidth
                startIcon={<FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 15 }} />}
                onClick={() => { addItem(product, 1); onClose(); }}
                sx={{ background: 'linear-gradient(135deg,#c62828,#e53935)', fontWeight: 700, py: 1.2, borderRadius: 2 }}>
                Thêm Vào Giỏ Hàng
              </Button>
              <Button component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
                variant="outlined" size="large" fullWidth
                startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                sx={{ borderColor: '#c62828', color: '#c62828', fontWeight: 700, py: 1.2, borderRadius: 2, '&:hover': { background: '#fff5f5' } }}>
                Gọi {company.phone1} đặt hàng
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
