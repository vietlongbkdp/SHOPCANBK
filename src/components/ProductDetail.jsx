import {
  Dialog, DialogContent, Grid, Typography, Button, Stack,
  Rating, Chip, Divider, IconButton, Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ product, onClose }) {
  const { siteData } = useAdmin();
  const { addItem }  = useCart();
  const { company }  = siteData;

  if (!product) return null;

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <Dialog open={Boolean(product)} onClose={onClose} maxWidth="md" fullWidth
      aria-labelledby="pd-title"
      PaperProps={{ sx: { borderRadius: { xs: 0, sm: 2 }, m: { xs: 0, sm: 2 }, maxHeight: { xs: '100dvh', sm: '90vh' } } }}>

      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
        <IconButton onClick={onClose} size="small" aria-label="Đóng"
          sx={{ background: 'rgba(0,0,0,.06)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 1.5, sm: 3 }, overflowY: 'auto' }}>
        <Grid container spacing={{ xs: 1.5, md: 3 }}>

          {/* Image */}
          <Grid item xs={12} sm={5}>
            <Box sx={{ position: 'relative' }}>
              <Box component="img" src={product.image} alt={product.name}
                sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 1.5, border: '1px solid #f0f0f0', display: 'block' }}
                onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Cân'; }}
              />
              {discount > 0 && (
                <Chip label={`Giảm ${discount}%`}
                  sx={{ position: 'absolute', top: 10, left: 10, background: '#c62828', color: '#fff', fontWeight: 700, fontSize: { xs: 11, md: 12 } }} />
              )}
            </Box>
          </Grid>

          {/* Info */}
          <Grid item xs={12} sm={7}>
            {product.badge && (
              <Chip label={product.badge} size="small"
                sx={{ background: '#e65100', color: '#fff', mb: 1, fontWeight: 600, fontSize: 11 }} />
            )}

            <Typography id="pd-title" component="h2"
              sx={{ fontWeight: 700, color: '#111', mb: 1, lineHeight: 1.3, fontSize: { xs: '15px', md: '20px' } }}>
              {product.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mb={1.2}>
              <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ fontSize: { xs: 13, md: 14 } }} />
              <Typography component="span" sx={{ fontSize: 12.5, color: '#888' }}>({product.reviews})</Typography>
            </Stack>

            <Box mb={1.5}>
              <Typography sx={{ color: '#c62828', fontWeight: 800, fontSize: { xs: '20px', md: '26px' }, lineHeight: 1 }}>
                {Number(product.price).toLocaleString('vi-VN')}₫
              </Typography>
              {product.originalPrice > product.price && (
                <Typography component="s" sx={{ color: '#bbb', fontSize: { xs: 13, md: 14 } }}>
                  {Number(product.originalPrice).toLocaleString('vi-VN')}₫
                </Typography>
              )}
            </Box>

            <Typography sx={{ color: '#555', fontSize: { xs: 12.5, md: 13.5 }, lineHeight: 1.75, mb: 1.5 }}>
              {product.description}
            </Typography>

            {product.specifications && (
              <Box mb={1.5}>
                <Typography sx={{ fontWeight: 700, fontSize: 12.5, mb: 0.8 }}>Thông số kỹ thuật:</Typography>
                <Grid container spacing={0.5}>
                  {Object.entries(product.specifications).filter(([, v]) => v).map(([k, v]) => (
                    <Grid item xs={6} key={k}>
                      <Box sx={{ background: '#f8f8f8', borderRadius: 0.5, px: 1.2, py: 0.5 }}>
                        <Typography sx={{ fontSize: 10.5, color: '#aaa', textTransform: 'capitalize' }}>{k}</Typography>
                        <Typography sx={{ fontSize: { xs: 12, md: 12.5 }, fontWeight: 700, color: '#333' }}>{v}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider sx={{ my: 1.2 }} />

            <Stack spacing={0.6} mb={1.5}>
              {[
                { icon: <VerifiedIcon sx={{ color: '#2e7d32', fontSize: 15 }} />, text: 'Hàng chính hãng, bảo hành đầy đủ' },
                { icon: <LocalShippingIcon sx={{ color: '#1565c0', fontSize: 15 }} />, text: 'Giao hàng toàn quốc 24–48h' },
              ].map((g, i) => (
                <Stack key={i} direction="row" spacing={0.8} alignItems="center">
                  {g.icon}
                  <Typography sx={{ fontSize: 12.5, color: '#555' }}>{g.text}</Typography>
                </Stack>
              ))}
            </Stack>

            <Stack spacing={0.8}>
              <Button variant="contained" fullWidth size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={() => { addItem(product, 1); onClose(); }}
                sx={{ background: '#c62828', fontWeight: 700, py: { xs: 1, md: 1.2 }, fontSize: { xs: 13, md: 14 }, '&:hover': { background: '#8e0000' } }}>
                Thêm Vào Giỏ Hàng
              </Button>
              <Button component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
                variant="outlined" fullWidth size="large" startIcon={<PhoneIcon />}
                sx={{ borderColor: '#c62828', color: '#c62828', fontWeight: 700, py: { xs: 1, md: 1.2 }, fontSize: { xs: 13, md: 14 }, '&:hover': { background: '#fff5f5' } }}>
                Gọi {company.phone1}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
