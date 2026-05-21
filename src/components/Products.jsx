import { useState } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Button, Stack,
  FormControl, Select, MenuItem, InputLabel, Chip, TextField, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';

export default function Products({ onProductClick }) {
  const { siteData } = useAdmin();
  const { products, categories } = siteData;

  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy]           = useState('default');
  const [search, setSearch]           = useState('');

  let filtered = products.filter((p) => {
    const matchCat    = selectedCat === 'all' || p.category === parseInt(selectedCat);
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating')     filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <Box component="main" sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>

        {/* Title */}
        <Paper elevation={0} sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1, border: '1px solid #ebebeb' }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700, color: '#c62828', mb: 0.4, fontSize: { xs: '18px', md: '22px' } }}>
            SẢN PHẨM CÂN ĐIỆN TỬ
          </Typography>
          <Typography sx={{ color: '#777', fontSize: 13 }}>
            Tất cả sản phẩm chính hãng, bảo hành từ 12–36 tháng
          </Typography>
        </Paper>

        {/* Filters */}
        <Paper elevation={0} sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1, border: '1px solid #ebebeb' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }} flexWrap="wrap">
            <TextField
              size="small" placeholder="Tìm kiếm sản phẩm..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 200, flex: 1 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 17, color: '#aaa' }} /></InputAdornment> }}
              inputProps={{ 'aria-label': 'Tìm kiếm sản phẩm' }}
            />
            <FormControl size="small" sx={{ minWidth: 175 }}>
              <InputLabel>Danh mục</InputLabel>
              <Select value={selectedCat} label="Danh mục" onChange={(e) => setSelectedCat(e.target.value)}>
                <MenuItem value="all">Tất Cả Sản Phẩm</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.icon} {c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Sắp xếp</InputLabel>
              <Select value={sortBy} label="Sắp xếp" onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="default">Mặc định</MenuItem>
                <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={{ fontSize: 13, color: '#888', whiteSpace: 'nowrap' }}>
              {filtered.length} sản phẩm
            </Typography>
          </Stack>

          {/* Category chips */}
          <Stack direction="row" spacing={0.8} mt={1.5} flexWrap="wrap" gap={0.8} useFlexGap>
            {[{ id: 'all', name: 'Tất cả', icon: '🔍' }, ...categories].map((c) => (
              <Chip
                key={c.id}
                label={`${c.icon} ${c.name}`}
                size="small"
                onClick={() => setSelectedCat(c.id)}
                sx={{
                  background: selectedCat === c.id ? '#c62828' : '#f0f0f0',
                  color: selectedCat === c.id ? '#fff' : '#444',
                  fontWeight: 600, cursor: 'pointer', fontSize: 12,
                  '&:hover': { background: selectedCat === c.id ? '#8e0000' : '#e5e5e5' },
                }}
              />
            ))}
          </Stack>
        </Paper>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <Grid container spacing={{ xs: 1, md: 1.5 }}>
            {filtered.map((p) => (
              <Grid item xs={6} sm={4} md={3} key={p.id}>
                <ProductCard product={p} onClick={onProductClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 1, border: '1px solid #ebebeb' }}>
            <Typography sx={{ fontSize: 40, mb: 1 }}>🔍</Typography>
            <Typography sx={{ color: '#888', fontSize: 15, mb: 2 }}>Không tìm thấy sản phẩm phù hợp.</Typography>
            <Button variant="outlined" onClick={() => { setSearch(''); setSelectedCat('all'); }}
              sx={{ borderColor: '#c62828', color: '#c62828' }}>
              Xóa bộ lọc
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
