import { useState } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Button, Stack,
  FormControl, Select, MenuItem, InputLabel, Chip, TextField, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from './ProductCard';
import data from '../data.json';

const { products, categories } = data;

export default function Products({ onProductClick }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  let filtered = products.filter(p => {
    const matchCat = selectedCat === 'all' || p.category === parseInt(selectedCat);
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <Box sx={{ background: '#f5f5f5', minHeight: '60vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        {/* Title */}
        <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#c62828', mb: 0.5 }}>SẢN PHẨM CÂN ĐIỆN TỬ</Typography>
          <Typography sx={{ color: '#666', fontSize: 13 }}>Tất cả sản phẩm chính hãng, bảo hành từ 12–36 tháng</Typography>
        </Paper>

        {/* Filters */}
        <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, borderRadius: 1 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ minWidth: 200 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#888' }} /></InputAdornment> }}
            />
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Danh mục</InputLabel>
              <Select value={selectedCat} label="Danh mục" onChange={e => setSelectedCat(e.target.value)}>
                <MenuItem value="all">Tất Cả Sản Phẩm</MenuItem>
                {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.icon} {c.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Sắp xếp</InputLabel>
              <Select value={sortBy} label="Sắp xếp" onChange={e => setSortBy(e.target.value)}>
                <MenuItem value="default">Mặc định</MenuItem>
                <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={{ fontSize: 13, color: '#888', ml: 'auto !important' }}>
              {filtered.length} sản phẩm
            </Typography>
          </Stack>

          {/* Category chips */}
          <Stack direction="row" spacing={0.8} mt={1.5} flexWrap="wrap" gap={0.8}>
            <Chip
              label="Tất cả"
              size="small"
              onClick={() => setSelectedCat('all')}
              sx={{
                background: selectedCat === 'all' ? '#c62828' : '#f5f5f5',
                color: selectedCat === 'all' ? 'white' : '#333',
                fontWeight: 600, cursor: 'pointer',
              }}
            />
            {categories.map(c => (
              <Chip
                key={c.id}
                label={`${c.icon} ${c.name}`}
                size="small"
                onClick={() => setSelectedCat(c.id)}
                sx={{
                  background: selectedCat === c.id ? '#c62828' : '#f5f5f5',
                  color: selectedCat === c.id ? 'white' : '#333',
                  fontWeight: 600, cursor: 'pointer',
                }}
              />
            ))}
          </Stack>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={1.5}>
          {filtered.map(p => (
            <Grid item xs={6} sm={4} md={3} key={p.id}>
              <ProductCard product={p} onClick={onProductClick} />
            </Grid>
          ))}
          {filtered.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography sx={{ color: '#888', fontSize: 16 }}>Không tìm thấy sản phẩm phù hợp.</Typography>
                <Button sx={{ mt: 2 }} onClick={() => { setSearch(''); setSelectedCat('all'); }}>Xóa bộ lọc</Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
