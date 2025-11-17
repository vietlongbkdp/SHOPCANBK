import { useState } from 'react';
import { Box, Container, Grid, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Card, CardMedia, CardContent, CardActions, Button, Rating, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import data from '../data.json';

export default function Products({ onProductClick }) {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const filteredProducts = data.products.filter(p => p.category === selectedCategory);
  const selectedCategoryName = data.categories.find(c => c.id === selectedCategory)?.name || 'Sản Phẩm';

  const renderProductGrid = () => {
    return (
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#d32f2f',
            mb: 3,
            fontSize: { xs: '18px', sm: '22px', md: '28px' },
          }}
        >
          {selectedCategoryName}
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* Product Image */}
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: 200,
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
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23f5f5f5" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="%23999"%3E%E2%9A%96%EF%B8%8F%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {product.originalPrice > product.price && (
                    <Chip
                      label={`-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: '#d32f2f',
                        color: 'white',
                        fontWeight: 700,
                      }}
                    />
                  )}
                </Box>

                {/* Product Info */}
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      minHeight: '48px',
                      lineHeight: 1.4,
                      fontSize: { xs: '13px', sm: '14px', md: '16px' },
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '11px', md: '12px' } }}>
                      ({product.reviews})
                    </Typography>
                  </Box>

                  {/* Price */}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#d32f2f',
                        fontSize: { xs: '14px', sm: '16px', md: '18px' },
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
                          fontSize: { xs: '11px', md: '12px' },
                        }}
                      >
                        {product.originalPrice.toLocaleString('vi-VN')}₫
                      </Typography>
                    )}
                  </Box>
                </CardContent>

                {/* Actions */}
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => onProductClick && onProductClick(product)}
                    sx={{
                      fontSize: { xs: '11px', sm: '12px', md: '14px' },
                    }}
                  >
                    Xem Chi Tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="textSecondary">
              Không tìm thấy sản phẩm trong danh mục này
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ flex: 1, py: { xs: 3, sm: 4, md: 6 }, background: '#f9f9f9' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Page Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#d32f2f',
            mb: { xs: 3, sm: 4, md: 6 },
            textTransform: 'uppercase',
            letterSpacing: { xs: 0.5, sm: 1, md: 2 },
            fontSize: { xs: '20px', sm: '28px', md: '38px' },
          }}
        >
          Sản Phẩm
        </Typography>

        {/* Main Layout with Sidebar */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Sidebar - Category List */}
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                background: 'white',
                height: 'fit-content',
                position: { md: 'sticky' },
                top: { md: '200px' },
              }}
            >
              <List sx={{ p: 0 }}>
                {data.categories.map((category) => (
                  <ListItemButton
                    key={category.id}
                    selected={selectedCategory === category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    sx={{
                      borderLeft: selectedCategory === category.id ? '4px solid #d32f2f' : 'none',
                      background: selectedCategory === category.id ? '#fff3e0' : 'white',
                      py: { xs: 1, md: 1.5 },
                      px: { xs: 1.5, md: 2 },
                      '&:hover': {
                        background: '#f5f5f5',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: selectedCategory === category.id ? 700 : 600,
                            color: selectedCategory === category.id ? '#d32f2f' : '#333',
                            fontSize: { xs: '13px', sm: '14px', md: '15px' },
                          }}
                        >
                          {category.icon} {category.name}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Main Content - Products Grid */}
          <Grid item xs={12} md={9}>
            <Box sx={{ background: 'white', p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 1 }}>
              {renderProductGrid()}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
