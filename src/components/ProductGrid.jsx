import { Box, Container, Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onProductClick }) {
  if (products.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, textAlign: 'center' }}>
        <Typography variant="h5" color="textSecondary">
          Không tìm thấy sản phẩm phù hợp
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: '#d32f2f',
          mb: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: { xs: 0.5, sm: 1, md: 1 },
          fontSize: { xs: '20px', sm: '28px', md: '38px' },
        }}
      >
        Sản Phẩm Của Chúng Tôi
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={product}
              onProductClick={onProductClick}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
