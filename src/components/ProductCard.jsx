import { useState } from 'react';
import { Box, Typography, Button, Stack, Snackbar, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhone, faStar } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { T } from '../theme';

export default function ProductCard({ product, onClick }) {
  const { addItem } = useCart();
  const [snack, setSnack] = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAdd = (e) => { e.stopPropagation(); addItem(product, 1); setSnack(true); };

  return (
    <>
      <Box component="article" onClick={() => onClick?.(product)} className="card"
        sx={{
          background: T.surface, borderRadius: 3, overflow: 'hidden',
          border: `1px solid ${T.line}`, cursor: 'pointer',
          display: 'flex', flexDirection: 'column', height: '100%',
          transition: 'all .25s cubic-bezier(.16,1,.3,1)',
          '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 16px 40px ${T.brand}1f`, borderColor: T.brandLight },
        }}>

        {/* Image */}
        <Box sx={{ position: 'relative', background: T.bg, overflow: 'hidden' }}>
          <Box component="img" src={product.image} alt={product.name} width={247} height={247} loading="lazy"
            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', transition: 'transform .4s', '.card:hover &': { transform: 'scale(1.06)' } }}
            onError={(e) => { e.target.src = 'https://placehold.co/300/faf7f5/d32f2f?text=Cân+Điện+Tử'; }} />
          {discount > 0 && (
            <Box sx={{ position: 'absolute', top: 10, left: 10, background: T.gradient, color: '#fff',
              borderRadius: 2, px: 1, py: 0.4, boxShadow: `0 4px 12px ${T.brand}55` }}>
              <Typography sx={{ fontSize: 11, fontWeight: 800, lineHeight: 1 }}>-{discount}%</Typography>
            </Box>
          )}
          {product.badge && (
            <Box sx={{ position: 'absolute', top: 10, right: 10, background: 'rgba(26,20,16,.82)', backdropFilter: 'blur(6px)',
              color: '#fff', borderRadius: 2, px: 1, py: 0.4 }}>
              <Typography sx={{ fontSize: 10, fontWeight: 700, lineHeight: 1, whiteSpace: 'nowrap' }}>{product.badge}</Typography>
            </Box>
          )}
        </Box>

        {/* Body */}
        <Box sx={{ p: { xs: 1.3, md: 1.6 }, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.7 }}>
          <Typography component="h3"
            sx={{ fontSize: { xs: 12, md: 13.5 }, fontWeight: 600, color: T.ink, lineHeight: 1.45, flex: 1,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Stack direction="row" spacing={0.2}>
              {[1,2,3,4,5].map(i => (
                <FontAwesomeIcon key={i} icon={faStar}
                  style={{ fontSize: 10, color: i <= Math.round(product.rating) ? T.star : '#e0d8d2' }} />
              ))}
            </Stack>
            <Typography sx={{ fontSize: 11, color: T.inkSoft }}>({product.reviews})</Typography>
          </Stack>

          <Box>
            <Typography sx={{ background: T.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              fontWeight: 800, fontSize: { xs: 15, md: 17 }, lineHeight: 1 }}>
              {Number(product.price).toLocaleString('vi-VN')}₫
            </Typography>
            {product.originalPrice > product.price && (
              <Typography component="s" sx={{ color: '#bbb', fontSize: 11.5 }}>
                {Number(product.originalPrice).toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={0.6}>
            <Button variant="contained" size="small" fullWidth onClick={handleAdd}
              sx={{ background: T.gradient, fontSize: { xs: 11, md: 12 }, py: 0.75, borderRadius: 2, gap: 0.6,
                '&:hover': { background: T.gradientDark } }}>
              <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 11 }} />
              Thêm giỏ
            </Button>
            <Button variant="outlined" size="small" aria-label="Gọi đặt hàng"
              onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:0913331916'; }}
              sx={{ minWidth: 36, p: 0.75, borderRadius: 2, borderColor: T.line, color: T.brand,
                '&:hover': { borderColor: T.brand, background: T.gradientSoft } }}>
              <FontAwesomeIcon icon={faPhone} style={{ fontSize: 13 }} />
            </Button>
          </Stack>
        </Box>
      </Box>

      <Snackbar open={snack} autoHideDuration={1600} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ fontSize: 13, borderRadius: 2 }}>
          Đã thêm vào giỏ hàng
        </Alert>
      </Snackbar>
    </>
  );
}
