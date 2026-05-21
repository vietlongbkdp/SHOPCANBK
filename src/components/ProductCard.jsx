import { useState } from 'react';
import { Box, Typography, Button, Chip, Stack, Rating, Snackbar, Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onClick }) {
  const { addItem } = useCart();
  const [snack, setSnack] = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, 1);
    setSnack(true);
  };

  return (
    <>
      <Box
        component="article"
        onClick={() => onClick?.(product)}
        sx={{
          background: '#fff', border: '1px solid #ebebeb', borderRadius: 1,
          overflow: 'hidden', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', height: '100%',
          transition: 'transform .22s, box-shadow .22s, border-color .22s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,.11)',
            borderColor: '#c62828',
          },
        }}
      >
        {/* Image wrapper */}
        <Box sx={{ position: 'relative', background: '#f7f7f7', flexShrink: 0 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            loading="lazy"
            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.target.src = 'https://placehold.co/247x247?text=Cân+Điện+Tử'; }}
          />
          {discount > 0 && (
            <Chip
              label={`-${discount}%`} size="small"
              sx={{ position: 'absolute', top: 7, left: 7, background: '#c62828', color: '#fff', fontWeight: 700, fontSize: 11, height: 22 }}
            />
          )}
          {product.badge && (
            <Chip
              label={product.badge} size="small"
              sx={{
                position: 'absolute', top: 7, right: 7,
                background: '#e65100', color: '#fff', fontWeight: 600, fontSize: 10, height: 22,
                maxWidth: 96, '& .MuiChip-label': { px: 0.8 },
              }}
            />
          )}
        </Box>

        {/* Body */}
        <Box sx={{ p: { xs: 1.2, md: 1.5 }, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 12, md: 13 }, fontWeight: 600, color: '#222',
              lineHeight: 1.45, flex: 1,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.4}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ fontSize: 13 }} />
            <Typography component="span" sx={{ fontSize: 11, color: '#999' }}>({product.reviews})</Typography>
          </Stack>

          <Box>
            <Typography sx={{ color: '#c62828', fontWeight: 800, fontSize: { xs: 14, md: 16 }, lineHeight: 1 }}>
              {Number(product.price).toLocaleString('vi-VN')}₫
            </Typography>
            {product.originalPrice > product.price && (
              <Typography component="s" sx={{ color: '#bbb', fontSize: 11.5, display: 'block' }}>
                {Number(product.originalPrice).toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={0.5} mt={0.3}>
            <Button
              variant="contained" size="small" fullWidth
              startIcon={<ShoppingCartIcon sx={{ fontSize: '13px !important' }} />}
              onClick={handleAddToCart}
              sx={{
                background: '#c62828', fontSize: 11, py: 0.65, fontWeight: 700,
                '&:hover': { background: '#8e0000' },
              }}
            >
              Thêm giỏ
            </Button>
            <Button
              variant="outlined" size="small"
              aria-label="Gọi điện đặt hàng"
              sx={{
                minWidth: 34, p: 0.65, borderColor: '#c62828', color: '#c62828', flexShrink: 0,
                '&:hover': { background: '#fff5f5' },
              }}
              onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:0913331916'; }}
            >
              <PhoneIcon sx={{ fontSize: 15 }} />
            </Button>
          </Stack>
        </Box>
      </Box>

      <Snackbar
        open={snack} autoHideDuration={1600} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ fontSize: 13 }}>
          ✅ Đã thêm vào giỏ hàng!
        </Alert>
      </Snackbar>
    </>
  );
}
