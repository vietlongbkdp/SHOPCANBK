import { useState } from 'react';
import { Box, Typography, Button, Chip, Stack, Rating, Snackbar, Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onClick }) {
  const { addItem } = useCart();
  const [snack, setSnack] = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

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
          transition: 'transform .2s, box-shadow .2s, border-color .2s',
          '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 20px rgba(0,0,0,.1)', borderColor: '#c62828' },
          '&:active': { transform: 'scale(0.98)' },
        }}
      >
        {/* Image */}
        <Box sx={{ position: 'relative', background: '#f7f7f7', flexShrink: 0 }}>
          <Box
            component="img" src={product.image} alt={product.name} loading="lazy"
            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.target.src = 'https://placehold.co/247x247?text=Cân'; }}
          />
          {discount > 0 && (
            <Chip label={`-${discount}%`} size="small" sx={{
              position: 'absolute', top: 5, left: 5,
              background: '#c62828', color: '#fff', fontWeight: 700,
              fontSize: { xs: 10, md: 11 }, height: { xs: 18, md: 20 }, px: 0,
            }} />
          )}
          {product.badge && (
            <Chip label={product.badge} size="small" sx={{
              position: 'absolute', top: 5, right: 5,
              background: '#e65100', color: '#fff', fontWeight: 600,
              fontSize: { xs: 9, md: 10 }, height: { xs: 18, md: 20 },
              maxWidth: { xs: 70, md: 90 },
              '& .MuiChip-label': { px: { xs: 0.5, md: 0.8 } },
            }} />
          )}
        </Box>

        {/* Body */}
        <Box sx={{
          p: { xs: 0.8, md: 1.2 },
          flex: 1, display: 'flex', flexDirection: 'column', gap: { xs: 0.4, md: 0.6 },
        }}>
          {/* Name */}
          <Typography component="h3" sx={{
            fontSize: { xs: 11.5, sm: 12, md: 13 }, fontWeight: 600, color: '#222',
            lineHeight: 1.4, flex: 1,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {product.name}
          </Typography>

          {/* Rating */}
          <Stack direction="row" alignItems="center" spacing={0.3}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly
              sx={{ fontSize: { xs: 11, md: 13 } }} />
            <Typography component="span" sx={{ fontSize: { xs: 10, md: 11 }, color: '#aaa' }}>
              ({product.reviews})
            </Typography>
          </Stack>

          {/* Price */}
          <Box>
            <Typography sx={{
              color: '#c62828', fontWeight: 800,
              fontSize: { xs: '13px', sm: '14px', md: '15px' }, lineHeight: 1,
            }}>
              {Number(product.price).toLocaleString('vi-VN')}₫
            </Typography>
            {product.originalPrice > product.price && (
              <Typography component="s" sx={{ color: '#bbb', fontSize: { xs: 10, md: 11 } }}>
                {Number(product.originalPrice).toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>

          {/* Buttons */}
          <Stack direction="row" spacing={0.5} mt="auto">
            <Button
              variant="contained" size="small" fullWidth
              startIcon={<ShoppingCartIcon sx={{ fontSize: { xs: '11px !important', md: '13px !important' } }} />}
              onClick={handleAddToCart}
              sx={{
                background: '#c62828', fontWeight: 700,
                fontSize: { xs: 10, md: 11 }, py: { xs: 0.5, md: 0.7 },
                minHeight: { xs: 28, md: 32 },
                '&:hover': { background: '#8e0000' },
              }}
            >
              Thêm giỏ
            </Button>
            <Button
              variant="outlined" size="small"
              aria-label="Gọi điện"
              onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:0913331916'; }}
              sx={{
                minWidth: { xs: 28, md: 34 }, p: { xs: 0.4, md: 0.6 },
                borderColor: '#c62828', color: '#c62828', flexShrink: 0,
                minHeight: { xs: 28, md: 32 },
                '&:hover': { background: '#fff5f5' },
              }}
            >
              <PhoneIcon sx={{ fontSize: { xs: 13, md: 15 } }} />
            </Button>
          </Stack>
        </Box>
      </Box>

      <Snackbar
        open={snack} autoHideDuration={1500} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ fontSize: 13 }}>
          ✅ Đã thêm vào giỏ hàng!
        </Alert>
      </Snackbar>
    </>
  );
}
