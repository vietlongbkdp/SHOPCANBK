import { useState } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Button, Stack,
  Select, MenuItem, FormControl, InputLabel, Chip, TextField,
  InputAdornment, Collapse, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';

export default function Products({ onProductClick }) {
  const { siteData }  = useAdmin();
  const { products, categories } = siteData;

  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy]           = useState('default');
  const [search, setSearch]           = useState('');
  const [filterOpen, setFilterOpen]   = useState(false);

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
      <Container maxWidth="lg" sx={{ py: { xs: 1.5, md: 3 }, px: { xs: 1, sm: 2, md: 3 } }}>

        {/* Title */}
        <Box sx={{ mb: 1.5, px: { xs: 0.5, md: 0 } }}>
          <Typography component="h1" sx={{
            fontWeight: 800, color: '#c62828',
            fontSize: { xs: '18px', md: '22px' }, lineHeight: 1.2,
          }}>
            SẢN PHẨM CÂN ĐIỆN TỬ
          </Typography>
          <Typography sx={{ color: '#888', fontSize: { xs: 12, md: 13 } }}>
            Chính hãng – Bảo hành 12–36 tháng
          </Typography>
        </Box>

        {/* Mobile: search + filter toggle */}
        <Paper elevation={0} sx={{ p: { xs: 1, md: 1.5 }, mb: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small" placeholder="Tìm sản phẩm..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 16, color: '#bbb' }} />
                  </InputAdornment>
                ),
                sx: { fontSize: { xs: 13, md: 14 }, height: { xs: 36, md: 40 } },
              }}
              inputProps={{ 'aria-label': 'Tìm kiếm sản phẩm' }}
            />
            {/* Mobile: toggle filter */}
            <IconButton
              onClick={() => setFilterOpen(!filterOpen)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                border: `1px solid ${filterOpen ? '#c62828' : '#e0e0e0'}`,
                color: filterOpen ? '#c62828' : '#666',
                borderRadius: 1, p: 0.8,
              }}
              aria-label="Bộ lọc"
            >
              <TuneIcon sx={{ fontSize: 20 }} />
            </IconButton>

            {/* Desktop: always show sort */}
            <FormControl size="small" sx={{ display: { xs: 'none', md: 'flex' }, minWidth: 155 }}>
              <InputLabel>Sắp xếp</InputLabel>
              <Select value={sortBy} label="Sắp xếp" onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="default">Mặc định</MenuItem>
                <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
              </Select>
            </FormControl>

            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: 13, color: '#888', whiteSpace: 'nowrap' }}>
              {filtered.length} SP
            </Typography>
          </Stack>

          {/* Mobile collapsible filters */}
          <Collapse in={filterOpen} sx={{ display: { xs: 'block', md: 'none' } }}>
            <Stack direction="row" spacing={1} mt={1}>
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel sx={{ fontSize: 13 }}>Danh mục</InputLabel>
                <Select value={selectedCat} label="Danh mục" onChange={(e) => setSelectedCat(e.target.value)}
                  sx={{ fontSize: 13 }}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13 }}>{c.icon} {c.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel sx={{ fontSize: 13 }}>Sắp xếp</InputLabel>
                <Select value={sortBy} label="Sắp xếp" onChange={(e) => setSortBy(e.target.value)}
                  sx={{ fontSize: 13 }}>
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="price-asc">Giá tăng</MenuItem>
                  <MenuItem value="price-desc">Giá giảm</MenuItem>
                  <MenuItem value="rating">Đánh giá</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Collapse>

          {/* Category chips — horizontal scroll */}
          <Box sx={{
            mt: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}>
            <Stack direction="row" spacing={0.6} sx={{ width: 'max-content', pb: 0.3 }}>
              <Chip
                label="🔍 Tất cả"
                size="small"
                onClick={() => setSelectedCat('all')}
                sx={{
                  background: selectedCat === 'all' ? '#c62828' : '#f0f0f0',
                  color: selectedCat === 'all' ? '#fff' : '#444',
                  fontWeight: 600, fontSize: { xs: 11, md: 12 }, cursor: 'pointer',
                  height: { xs: 26, md: 28 },
                }}
              />
              {categories.map((c) => (
                <Chip
                  key={c.id}
                  label={`${c.icon} ${c.name}`}
                  size="small"
                  onClick={() => setSelectedCat(c.id)}
                  sx={{
                    background: selectedCat === c.id ? '#c62828' : '#f0f0f0',
                    color: selectedCat === c.id ? '#fff' : '#444',
                    fontWeight: 600, fontSize: { xs: 11, md: 12 }, cursor: 'pointer',
                    height: { xs: 26, md: 28 }, whiteSpace: 'nowrap',
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Mobile result count */}
          <Typography sx={{ display: { xs: 'block', md: 'none' }, fontSize: 12, color: '#999', mt: 0.8 }}>
            {filtered.length} sản phẩm
          </Typography>
        </Paper>

        {/* Desktop: category filter select */}
        <Paper elevation={0} sx={{
          display: { xs: 'none', md: 'block' },
          p: 1.5, mb: 2, borderRadius: 1, border: '1px solid #ebebeb',
        }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 195 }}>
              <InputLabel>Danh mục</InputLabel>
              <Select value={selectedCat} label="Danh mục" onChange={(e) => setSelectedCat(e.target.value)}>
                <MenuItem value="all">Tất Cả Sản Phẩm</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.icon} {c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', borderRadius: 1, border: '1px solid #ebebeb' }}>
            <Typography sx={{ fontSize: 36, mb: 1 }}>🔍</Typography>
            <Typography sx={{ color: '#888', fontSize: 14, mb: 2 }}>
              Không tìm thấy sản phẩm phù hợp.
            </Typography>
            <Button variant="outlined"
              onClick={() => { setSearch(''); setSelectedCat('all'); }}
              sx={{ borderColor: '#c62828', color: '#c62828', fontSize: 13 }}>
              Xóa bộ lọc
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
