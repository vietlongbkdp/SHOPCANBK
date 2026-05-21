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

  const handleAdd = (e) => {
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
          background: '#fff',
          border: '1px solid #ebebeb',
          borderRadius: 1,
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'transform .2s, box-shadow .2s, border-color .2s',
          '&:hover': {
            transform: { md: 'translateY(-3px)' },
            boxShadow: { md: '0 6px 20px rgba(0,0,0,.1)' },
            borderColor: '#c62828',
          },
        }}
      >
        {/* Image */}
        <Box sx={{ position: 'relative', background: '#f7f7f7', flexShrink: 0 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            loading="lazy"
            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=Cân'; }}
          />
          {discount > 0 && (
            <Chip label={`-${discount}%`} size="small" sx={{
              position: 'absolute', top: 5, left: 5,
              background: '#c62828', color: '#fff', fontWeight: 700,
              fontSize: { xs: 10, md: 11 }, height: { xs: 18, md: 22 },
              '& .MuiChip-label': { px: { xs: 0.6, md: 0.8 } },
            }} />
          )}
          {product.badge && (
            <Chip label={product.badge} size="small" sx={{
              position: 'absolute', top: 5, right: 5,
              background: '#e65100', color: '#fff', fontWeight: 600,
              fontSize: { xs: 9, md: 10 }, height: { xs: 18, md: 22 },
              maxWidth: { xs: 70, md: 90 },
              '& .MuiChip-label': { px: { xs: 0.5, md: 0.8 } },
            }} />
          )}
        </Box>

        {/* Body */}
        <Box sx={{
          p: { xs: 1, md: 1.4 },
          flex: 1, display: 'flex', flexDirection: 'column', gap: { xs: 0.4, md: 0.6 },
        }}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 11.5, md: 13 },
              fontWeight: 600, color: '#222', lineHeight: 1.4,
              flex: 1,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.3}>
            <Rating value={product.rating} precision={0.1} size="small"
              readOnly sx={{ fontSize: { xs: 11, md: 13 } }} />
            <Typography component="span" sx={{ fontSize: { xs: 10, md: 11 }, color: '#aaa' }}>
              ({product.reviews})
            </Typography>
          </Stack>

          <Box>
            <Typography sx={{
              color: '#c62828', fontWeight: 800,
              fontSize: { xs: 13, md: 15 }, lineHeight: 1,
            }}>
              {Number(product.price).toLocaleString('vi-VN')}₫
            </Typography>
            {product.originalPrice > product.price && (
              <Typography component="s" sx={{ color: '#ccc', fontSize: { xs: 10, md: 11.5 } }}>
                {Number(product.originalPrice).toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>

          {/* Buttons */}
          <Stack direction="row" spacing={0.5}>
            <Button
              variant="contained" size="small" fullWidth
              onClick={handleAdd}
              startIcon={<ShoppingCartIcon sx={{ fontSize: '12px !important' }} />}
              sx={{
                background: '#c62828', fontWeight: 700,
                fontSize: { xs: 10, md: 11 },
                py: { xs: 0.5, md: 0.65 },
                minWidth: 0,
                '&:hover': { background: '#8e0000' },
              }}
            >
              Thêm giỏ
            </Button>
            <Button
              variant="outlined" size="small"
              aria-label="Gọi đặt hàng"
              onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:0913331916'; }}
              sx={{
                minWidth: { xs: 30, md: 34 },
                p: { xs: 0.5, md: 0.65 },
                borderColor: '#c62828', color: '#c62828', flexShrink: 0,
                '&:hover': { background: '#fff5f5' },
              }}
            >
              <PhoneIcon sx={{ fontSize: { xs: 13, md: 15 } }} />
            </Button>
          </Stack>
        </Box>
      </Box>

      <Snackbar open={snack} autoHideDuration={1600} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ fontSize: 13 }}>
          ✅ Đã thêm vào giỏ hàng!
        </Alert>
      </Snackbar>
    </>
  );
}
