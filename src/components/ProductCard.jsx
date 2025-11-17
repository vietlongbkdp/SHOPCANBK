import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Rating,
  Chip,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ProductCard({ product, onProductClick }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23f5f5f5" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="%23999"%3E%E2%9A%96%EF%B8%8F%3C/text%3E%3C/svg%3E';
          }}
        />
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: '#d32f2f',
              color: 'white',
              fontWeight: 700,
              fontSize: '14px',
            }}
          />
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ flex: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            fontWeight: 600,
            minHeight: '48px',
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" color="textSecondary">
            ({product.reviews})
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2, minHeight: '40px' }}>
          {product.description}
        </Typography>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#d32f2f',
            }}
          >
            {product.price.toLocaleString('vi-VN')}₫
          </Typography>
          {product.originalPrice > product.price && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'line-through',
                color: 'textSecondary',
              }}
            >
              {product.originalPrice.toLocaleString('vi-VN')}₫
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ gap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => onProductClick(product)}
        >
          Xem Chi Tiết
        </Button>
      </CardActions>
    </Card>
  );
}
