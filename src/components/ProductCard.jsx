import { useState } from 'react';
import { Box, Typography, Button, Chip, Stack, Snackbar, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhone, faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { useCart } from '../context/CartContext';

function StarRating({ value }) {
  return (
    <Stack direction="row" spacing={0.2} alignItems="center">
      {[1,2,3,4,5].map(i => (
        <FontAwesomeIcon key={i} icon={i <= Math.round(value) ? faStar : faStarEmpty}
          style={{ fontSize: 11, color: i <= Math.round(value) ? '#f9a825' : '#ddd' }} />
      ))}
    </Stack>
  );
}

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
      <Box component="article" onClick={() => onClick?.(product)}
        sx={{
          background: '#fff', borderRadius: 2, overflow: 'hidden',
          border: '1px solid #eef0f3', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', height: '100%',
          transition: 'all .22s cubic-bezier(.4,0,.2,1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0,0,0,.12)',
            borderColor: '#c62828',
          },
        }}>

        {/* Image */}
        <Box sx={{ position: 'relative', background: '#f8f9fb', flexShrink: 0 }}>
          <Box component="img" src={product.image} alt={product.name} loading="lazy"
            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', transition: 'transform .3s', '.card:hover &': { transform: 'scale(1.04)' } }}
            onError={(e) => { e.target.src = 'https://placehold.co/300x300/f8f9fb/888?text=Cân+Điện+Tử'; }} />
          {discount > 0 && (
            <Box sx={{
              position: 'absolute', top: 8, left: 8,
              background: 'linear-gradient(135deg,#c62828,#e53935)',
              color: '#fff', borderRadius: 1, px: 0.8, py: 0.3,
              display: 'flex', alignItems: 'center', gap: 0.4,
            }}>
              <FontAwesomeIcon icon={faTag} style={{ fontSize: 10 }} />
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, lineHeight: 1 }}>-{discount}%</Typography>
            </Box>
          )}
          {product.badge && (
            <Box sx={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(230,81,0,.9)', backdropFilter: 'blur(4px)',
              color: '#fff', borderRadius: 1, px: 0.8, py: 0.3,
            }}>
              <Typography sx={{ fontSize: 10, fontWeight: 700, lineHeight: 1, whiteSpace: 'nowrap' }}>
                {product.badge}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 1.2, md: 1.4 }, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
          <Typography component="h3"
            sx={{
              fontSize: { xs: 12, md: 13 }, fontWeight: 600, color: '#1a1a2e',
              lineHeight: 1.45, flex: 1,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <StarRating value={product.rating} />
            <Typography sx={{ fontSize: 11, color: '#90a4ae' }}>({product.reviews})</Typography>
          </Stack>

          <Box>
            <Typography sx={{ color: '#c62828', fontWeight: 800, fontSize: { xs: 14, md: 16 }, lineHeight: 1 }}>
              {Number(product.price).toLocaleString('vi-VN')}₫
            </Typography>
            {product.originalPrice > product.price && (
              <Typography component="s" sx={{ color: '#b0bec5', fontSize: 11.5 }}>
                {Number(product.originalPrice).toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={0.5}>
            <Button variant="contained" size="small" fullWidth onClick={handleAdd}
              sx={{
                background: 'linear-gradient(135deg,#c62828,#e53935)',
                fontSize: { xs: 10.5, md: 11.5 }, py: 0.7, borderRadius: 1.5,
                gap: 0.6,
              }}>
              <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 11 }} />
              Thêm giỏ
            </Button>
            <Button variant="outlined" size="small" aria-label="Gọi đặt hàng"
              onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:0913331916'; }}
              sx={{
                minWidth: 34, p: 0.7, borderRadius: 1.5,
                borderColor: '#e8edf2', color: '#546e7a',
                '&:hover': { borderColor: '#c62828', color: '#c62828', background: '#fff5f5' },
              }}>
              <FontAwesomeIcon icon={faPhone} style={{ fontSize: 13 }} />
            </Button>
          </Stack>
        </Box>
      </Box>

      <Snackbar open={snack} autoHideDuration={1600} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ fontSize: 13, borderRadius: 2 }}>
          ✅ Đã thêm vào giỏ hàng!
        </Alert>
      </Snackbar>
    </>
  );
}
