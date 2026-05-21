import { useState } from 'react';
import {
  Box, Container, Grid, Typography, Button, Stack,
  Select, MenuItem, FormControl, InputLabel, Chip, TextField,
  InputAdornment, Collapse, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';

export default function Products({ onProductClick }) {
  const { siteData } = useAdmin();
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
      <Container maxWidth="lg" sx={{ py: { xs: 1.5, md: 3 } }}>

        {/* Title */}
        <Box mb={1.5}>
          <Typography component="h1" sx={{
            fontWeight: 800, color: '#c62828',
            fontSize: { xs: '17px', md: '22px' },
          }}>
            SẢN PHẨM CÂN ĐIỆN TỬ
          </Typography>
          <Typography sx={{ color: '#888', fontSize: { xs: 11.5, md: 13 } }}>
            Chính hãng – Bảo hành 12–36 tháng
          </Typography>
        </Box>

        {/* Search + filter toggle */}
        <Stack direction="row" spacing={1} mb={1}>
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
              sx: { fontSize: 13, height: 38 },
            }}
          />
          <IconButton
            onClick={() => setFilterOpen(!filterOpen)}
            sx={{
              border: `1px solid ${filterOpen ? '#c62828' : '#e0e0e0'}`,
              color: filterOpen ? '#c62828' : '#666',
              borderRadius: 1, p: 0.8, width: 38, height: 38,
            }}
          >
            {filterOpen ? <CloseIcon sx={{ fontSize: 18 }} /> : <TuneIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Stack>

        {/* Collapsible sort */}
        <Collapse in={filterOpen}>
          <Box mb={1}>
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ fontSize: 13 }}>Sắp xếp</InputLabel>
              <Select value={sortBy} label="Sắp xếp" onChange={(e) => setSortBy(e.target.value)} sx={{ fontSize: 13 }}>
                <MenuItem value="default">Mặc định</MenuItem>
                <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Collapse>

        {/* Category chips */}
        <Box sx={{
          overflowX: 'auto', scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          mb: 1.5,
        }}>
          <Stack direction="row" spacing={0.7} sx={{ width: 'max-content' }}>
            {[{ id: 'all', name: 'Tất cả', icon: '🔍' }, ...categories].map((c) => (
              <Chip
                key={c.id}
                label={`${c.icon} ${c.name}`}
                size="small"
                onClick={() => setSelectedCat(c.id)}
                sx={{
                  background: selectedCat === c.id ? '#c62828' : '#f0f0f0',
                  color: selectedCat === c.id ? '#fff' : '#444',
                  fontWeight: 600, fontSize: { xs: 11, md: 12 },
                  height: { xs: 26, md: 28 },
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  '&:hover': { opacity: 0.85 },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Typography sx={{ fontSize: 12, color: '#888', mb: 1.5 }}>
          {filtered.length} sản phẩm
        </Typography>

        {/* ── Product Grid — 2 cột trên mobile ── */}
        {filtered.length > 0 ? (
          <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }}>
            {filtered.map((p) => (
              <Grid item xs={6} sm={4} md={3} key={p.id}>
                <ProductCard product={p} onClick={onProductClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ fontSize: 36, mb: 1 }}>🔍</Typography>
            <Typography sx={{ color: '#888', fontSize: 14, mb: 2 }}>
              Không tìm thấy sản phẩm.
            </Typography>
            <Button variant="outlined"
              onClick={() => { setSearch(''); setSelectedCat('all'); }}
              sx={{ borderColor: '#c62828', color: '#c62828', fontSize: 13 }}>
              Xóa bộ lọc
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
