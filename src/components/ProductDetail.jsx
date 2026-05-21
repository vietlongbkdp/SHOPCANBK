import { Box, Dialog, DialogContent, Grid, Typography, Button, Stack, Rating, Chip, Divider, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import data from '../data.json';

const { company } = data;

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={Boolean(product)} onClose={onClose} maxWidth="md" fullWidth
      PaperProps={{ sx: { borderRadius: 2, m: { xs: 1, sm: 2 } } }}>
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <IconButton onClick={onClose} size="small" sx={{ background: 'rgba(0,0,0,0.05)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
          {/* Image */}
          <Grid item xs={12} sm={5}>
            <Box sx={{ position: 'relative' }}>
              <Box component="img" src={product.image} alt={product.name}
                sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 1, border: '1px solid #f0f0f0' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Cân+Điện+Tử'; }}
              />
              {discount > 0 && (
                <Chip label={`Giảm ${discount}%`} sx={{ position: 'absolute', top: 12, left: 12, background: '#c62828', color: 'white', fontWeight: 700 }} />
              )}
            </Box>
          </Grid>

          {/* Info */}
          <Grid item xs={12} sm={7}>
            {product.badge && <Chip label={product.badge} size="small" sx={{ background: '#e65100', color: 'white', mb: 1, fontWeight: 600 }} />}
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#212121', mb: 1, lineHeight: 1.3, fontSize: { xs: '16px', md: '20px' } }}>
              {product.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <Rating value={product.rating} precision={0.1} size="small" readOnly />
              <Typography sx={{ fontSize: 13, color: '#666' }}>({product.reviews} đánh giá)</Typography>
            </Stack>

            <Box mb={2}>
              <Typography sx={{ color: '#c62828', fontWeight: 800, fontSize: { xs: '22px', md: '28px' }, lineHeight: 1 }}>
                {product.price.toLocaleString('vi-VN')}₫
              </Typography>
              {product.originalPrice && (
                <Typography sx={{ color: '#aaa', fontSize: 15, textDecoration: 'line-through' }}>
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </Typography>
              )}
            </Box>

            <Typography sx={{ color: '#555', fontSize: 13.5, lineHeight: 1.7, mb: 2 }}>{product.description}</Typography>

            {/* Specs */}
            {product.specifications && (
              <Box mb={2}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1 }}>Thông số kỹ thuật:</Typography>
                <Grid container spacing={0.5}>
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <Grid item xs={6} key={k}>
                      <Box sx={{ background: '#f5f5f5', borderRadius: 0.5, px: 1, py: 0.5 }}>
                        <Typography sx={{ fontSize: 11, color: '#888', textTransform: 'capitalize' }}>{k}</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#333' }}>{v}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider sx={{ my: 1.5 }} />

            {/* Guarantees */}
            <Stack spacing={0.8} mb={2}>
              {[
                { icon: <VerifiedIcon sx={{ color: '#2e7d32', fontSize: 16 }} />, text: 'Hàng chính hãng, có bảo hành đầy đủ' },
                { icon: <LocalShippingIcon sx={{ color: '#1565c0', fontSize: 16 }} />, text: 'Giao hàng toàn quốc 24–48h' },
              ].map((g, i) => (
                <Stack key={i} direction="row" spacing={0.8} alignItems="center">
                  {g.icon}
                  <Typography sx={{ fontSize: 12.5, color: '#555' }}>{g.text}</Typography>
                </Stack>
              ))}
            </Stack>

            <Stack spacing={1}>
              <Button variant="contained" size="large" fullWidth startIcon={<ShoppingCartIcon />}
                sx={{ background: '#c62828', fontWeight: 700, py: 1.2, '&:hover': { background: '#8e0000' } }}>
                Mua Ngay
              </Button>
              <Button variant="outlined" size="large" fullWidth startIcon={<PhoneIcon />}
                onClick={() => window.location.href = `tel:${company.phone1.replace(/\s/g, '')}`}
                sx={{ borderColor: '#c62828', color: '#c62828', fontWeight: 700, py: 1.2, '&:hover': { background: '#fff5f5' } }}>
                Gọi {company.phone1} để đặt hàng
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
