import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  Stack,
  Rating,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

export default function ProductDetail({ product, onClose }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Dialog open={!!product} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Chi Tiết Sản Phẩm
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: '#f5f5f5',
                borderRadius: 2,
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e0e0e0" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="%23999"%3E%E2%9A%96%EF%B8%8F%3C/text%3E%3C/svg%3E';
                }}
              />
              {discount > 0 && (
                <Chip
                  label={`-${discount}%`}
                  sx={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                    background: '#d32f2f',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '16px',
                  }}
                />
              )}
            </Box>
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Name */}
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating value={product.rating} readOnly />
              <Typography variant="body2" color="textSecondary">
                ({product.reviews} đánh giá)
              </Typography>
            </Box>

            {/* Description */}
            <Typography variant="body1" color="textSecondary">
              {product.description}
            </Typography>

            {/* Price */}
            <Box sx={{ background: '#f5f5f5', p: 2, borderRadius: 1 }}>
              <Stack direction="row" spacing={2} alignItems="baseline">
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#d32f2f',
                  }}
                >
                  {product.price.toLocaleString('vi-VN')}₫
                </Typography>
                {product.originalPrice > product.price && (
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'textSecondary',
                    }}
                  >
                    {product.originalPrice.toLocaleString('vi-VN')}₫
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Specifications */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Thông Số Kỹ Thuật:
              </Typography>
              <List dense>
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <ListItem key={key} disablePadding>
                    <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                      {key}:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Benefits */}
            <Box sx={{ background: 'rgba(76, 175, 80, 0.1)', p: 2, borderRadius: 1 }}>
              <List dense>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText primary="Bảo hành chính hãng" />
                </ListItem>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText primary="Giao hàng nhanh" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText primary="Hỗ trợ 24/7" />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
