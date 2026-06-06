import { useState } from 'react';
import { Box, Container, Grid, Typography, Button, Stack, Chip, TextField, InputAdornment, Collapse, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH, faXmark } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';

export default function Products({ onProductClick }) {
  const { siteData } = useAdmin();
  const { products, categories } = siteData;
  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy]           = useState('default');
  const [search, setSearch]           = useState('');
  const [filterOpen, setFilterOpen]   = useState(false);

  let filtered = products.filter(p => {
    const matchCat    = selectedCat === 'all' || p.category === parseInt(selectedCat);
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  if (sortBy === 'price-asc')  filtered = [...filtered].sort((a,b) => a.price-b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a,b) => b.price-a.price);
  if (sortBy === 'rating')     filtered = [...filtered].sort((a,b) => b.rating-a.rating);

  return (
    <Box sx={{ background: '#f4f6f8', minHeight: '60vh' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
        <Box mb={2}>
          <Typography component="h1" sx={{ fontWeight: 800, color: '#1a1a2e', fontSize: { xs: '18px', md: '24px' } }}>
            Sản Phẩm Cân Điện Tử
          </Typography>
          <Typography sx={{ color: '#78909c', fontSize: 13 }}>Chính hãng – Bảo hành 12–36 tháng</Typography>
        </Box>

        {/* Filter bar */}
        <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 1.5, md: 2 }, mb: 2, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
          <Stack direction="row" spacing={1} mb={1}>
            <TextField size="small" placeholder="Tìm kiếm sản phẩm..." value={search}
              onChange={e => setSearch(e.target.value)} sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: '#b0bec5' }} /></InputAdornment>,
                sx: { borderRadius: 1.5, fontSize: 13 },
              }} />
            <Button variant="outlined" size="small"
              onClick={() => setFilterOpen(!filterOpen)}
              startIcon={<FontAwesomeIcon icon={filterOpen ? faXmark : faSlidersH} style={{ fontSize: 13 }} />}
              sx={{ borderRadius: 1.5, borderColor: filterOpen ? '#c62828' : '#e8edf2', color: filterOpen ? '#c62828' : '#546e7a', fontWeight: 600, px: 1.8 }}>
              Lọc
            </Button>
          </Stack>

          <Collapse in={filterOpen}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mb={1}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel sx={{ fontSize: 13 }}>Danh mục</InputLabel>
                <Select value={selectedCat} label="Danh mục" onChange={e => setSelectedCat(e.target.value)} sx={{ borderRadius: 1.5, fontSize: 13 }}>
                  <MenuItem value="all">Tất cả ({products.length})</MenuItem>
                  {categories.map(c => <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13 }}>{c.icon} {c.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel sx={{ fontSize: 13 }}>Sắp xếp</InputLabel>
                <Select value={sortBy} label="Sắp xếp" onChange={e => setSortBy(e.target.value)} sx={{ borderRadius: 1.5, fontSize: 13 }}>
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                  <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                  <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Collapse>

          {/* Category chips */}
          <Box sx={{ overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            <Stack direction="row" spacing={0.8} sx={{ width: 'max-content' }}>
              {[{ id: 'all', name: 'Tất cả', icon: '🔍' }, ...categories].map(c => (
                <Chip key={c.id} label={`${c.icon} ${c.name}`} size="small"
                  onClick={() => setSelectedCat(c.id)}
                  sx={{
                    background: selectedCat === c.id ? 'linear-gradient(135deg,#c62828,#e53935)' : '#f4f6f8',
                    color: selectedCat === c.id ? '#fff' : '#546e7a',
                    fontWeight: 600, fontSize: { xs: 11.5, md: 12 }, height: 28,
                    cursor: 'pointer', border: selectedCat === c.id ? 'none' : '1px solid #e8edf2',
                    '&:hover': { opacity: .85 },
                  }} />
              ))}
            </Stack>
          </Box>
          <Typography sx={{ fontSize: 12, color: '#90a4ae', mt: 1 }}>{filtered.length} sản phẩm</Typography>
        </Box>

        {filtered.length > 0 ? (
          <Grid container spacing={{ xs: 1, md: 1.5 }}>
            {filtered.map(p => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={p.id}>
                <ProductCard product={p} onClick={onProductClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8, background: '#fff', borderRadius: 2 }}>
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: 48, color: '#b0bec5', marginBottom: 12 }} />
            <Typography sx={{ color: '#78909c', fontSize: 15, mb: 2 }}>Không tìm thấy sản phẩm.</Typography>
            <Button onClick={() => { setSearch(''); setSelectedCat('all'); }} variant="outlined"
              sx={{ borderColor: '#c62828', color: '#c62828', borderRadius: 2 }}>
              Xóa bộ lọc
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
