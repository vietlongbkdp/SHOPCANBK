import { useState } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Button, Stack,
  FormControl, Select, MenuItem, InputLabel, Chip, TextField,
  InputAdornment, useMediaQuery, useTheme, Collapse, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';

export default function Products({ onProductClick }) {
  const { siteData } = useAdmin();
  const { products, categories } = siteData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy]           = useState('default');
  const [search, setSearch]           = useState('');
  const [showFilter, setShowFilter]   = useState(false);

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
        <Paper elevation={0} sx={{ p: { xs: 1.5, md: 2 }, mb: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>
          <Typography component="h1" sx={{ fontWeight: 700, color: '#c62828', fontSize: { xs: '16px', md: '22px' } }}>
            SẢN PHẨM CÂN ĐIỆN TỬ
          </Typography>
          <Typography sx={{ color: '#777', fontSize: { xs: 12, md: 13 } }}>
            Chính hãng – Bảo hành 12–36 tháng – Giao toàn quốc
          </Typography>
        </Paper>

        {/* Search + Filter toggle (mobile) / full filters (desktop) */}
        <Paper elevation={0} sx={{ p: { xs: 1.2, md: 2 }, mb: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>

          {/* Search row — always visible */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small" placeholder="Tìm kiếm sản phẩm..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: '#aaa' }} /></InputAdornment>,
                sx: { fontSize: 13 },
              }}
            />
            {isMobile ? (
              <IconButton
                onClick={() => setShowFilter(!showFilter)}
                sx={{
                  border: '1px solid', borderColor: showFilter ? '#c62828' : '#ddd',
                  borderRadius: 1, color: showFilter ? '#c62828' : '#666',
                  p: 0.8, flexShrink: 0,
                }}
              >
                <TuneIcon sx={{ fontSize: 20 }} />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={1}>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel sx={{ fontSize: 13 }}>Danh mục</InputLabel>
                  <Select value={selectedCat} label="Danh mục" onChange={(e) => setSelectedCat(e.target.value)} sx={{ fontSize: 13 }}>
                    <MenuItem value="all">Tất Cả</MenuItem>
                    {categories.map((c) => <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13 }}>{c.icon} {c.name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ fontSize: 13 }}>Sắp xếp</InputLabel>
                  <Select value={sortBy} label="Sắp xếp" onChange={(e) => setSortBy(e.target.value)} sx={{ fontSize: 13 }}>
                    <MenuItem value="default">Mặc định</MenuItem>
                    <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                    <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                    <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Stack>

          {/* Mobile: collapsible filters */}
          {isMobile && (
            <Collapse in={showFilter}>
              <Stack spacing={1} mt={1.2}>
                <FormControl size="small" fullWidth>
                  <InputLabel sx={{ fontSize: 13 }}>Danh mục</InputLabel>
                  <Select value={selectedCat} label="Danh mục" onChange={(e) => setSelectedCat(e.target.value)} sx={{ fontSize: 13 }}>
                    <MenuItem value="all">Tất Cả Sản Phẩm</MenuItem>
                    {categories.map((c) => <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13 }}>{c.icon} {c.name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel sx={{ fontSize: 13 }}>Sắp xếp theo</InputLabel>
                  <Select value={sortBy} label="Sắp xếp theo" onChange={(e) => setSortBy(e.target.value)} sx={{ fontSize: 13 }}>
                    <MenuItem value="default">Mặc định</MenuItem>
                    <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                    <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                    <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Collapse>
          )}

          {/* Category chips — horizontal scroll, no wrap */}
          <Box sx={{
            mt: 1.2,
            display: 'flex', gap: 0.7, flexWrap: 'nowrap',
            overflowX: 'auto', pb: 0.3,
            scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
          }}>
            {[{ id: 'all', name: 'Tất cả', icon: '🔍' }, ...categories].map((c) => (
              <Chip
                key={c.id}
                label={`${c.icon} ${c.name}`}
                size="small"
                onClick={() => setSelectedCat(c.id)}
                sx={{
                  flexShrink: 0,
                  background: selectedCat === c.id ? '#c62828' : '#f0f0f0',
                  color: selectedCat === c.id ? '#fff' : '#444',
                  fontWeight: 600, fontSize: { xs: 11, md: 12 },
                  height: { xs: 26, md: 28 },
                  cursor: 'pointer',
                  '&:hover': { background: selectedCat === c.id ? '#8e0000' : '#e0e0e0' },
                }}
              />
            ))}
          </Box>

          <Typography sx={{ fontSize: 11.5, color: '#999', mt: 0.8 }}>
            {filtered.length} sản phẩm
          </Typography>
        </Paper>

        {/* Product Grid */}
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
            <Typography sx={{ color: '#888', fontSize: 14, mb: 2 }}>Không tìm thấy sản phẩm phù hợp.</Typography>
            <Button variant="outlined" onClick={() => { setSearch(''); setSelectedCat('all'); }}
              sx={{ borderColor: '#c62828', color: '#c62828', fontSize: 13 }}>
              Xóa bộ lọc
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
