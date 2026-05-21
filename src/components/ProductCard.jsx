import { Box, Typography, Button, Chip, Stack, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ProductCard({ product, onClick }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Box
      onClick={() => onClick && onClick(product)}
      sx={{
        background: 'white',
        border: '1px solid #e8e8e8',
        borderRadius: 1,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
          transform: 'translateY(-3px)',
          borderColor: '#c62828',
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative', background: '#f9f9f9' }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: '100%', aspectRatio: '1/1', objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.3s',
            '.product-card:hover &': { transform: 'scale(1.05)' },
          }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/247x247?text=Cân+Điện+Tử'; }}
        />
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            size="small"
            sx={{
              position: 'absolute', top: 8, left: 8,
              background: '#c62828', color: 'white', fontWeight: 700, fontSize: 11,
            }}
          />
        )}
        {product.badge && (
          <Chip
            label={product.badge}
            size="small"
            sx={{
              position: 'absolute', top: 8, right: 8,
              background: '#e65100', color: 'white', fontWeight: 600, fontSize: 10,
              maxWidth: 90, '& .MuiChip-label': { px: 0.8 },
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ p: 1.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{
          fontSize: { xs: 12, md: 13 }, fontWeight: 600, color: '#333',
          lineHeight: 1.4, mb: 1,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          flex: 1,
        }}>
          {product.name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ fontSize: 14 }} />
          <Typography sx={{ fontSize: 11, color: '#888' }}>({product.reviews})</Typography>
        </Stack>

        <Box mb={1}>
          <Typography sx={{ color: '#c62828', fontWeight: 700, fontSize: { xs: 15, md: 16 }, lineHeight: 1 }}>
            {product.price.toLocaleString('vi-VN')}₫
          </Typography>
          {product.originalPrice && (
            <Typography sx={{ color: '#aaa', fontSize: 12, textDecoration: 'line-through' }}>
              {product.originalPrice.toLocaleString('vi-VN')}₫
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={0.5}>
          <Button
            size="small"
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartIcon sx={{ fontSize: '14px !important' }} />}
            sx={{
              background: '#c62828', fontSize: 11, py: 0.6,
              '&:hover': { background: '#8e0000' },
            }}
          >
            Mua ngay
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              minWidth: 36, p: 0.6, borderColor: '#c62828', color: '#c62828',
              '&:hover': { background: '#fff5f5' },
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = 'tel:0913331919';
            }}
          >
            <PhoneIcon sx={{ fontSize: 16 }} />
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
