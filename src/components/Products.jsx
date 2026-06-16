import { useState } from 'react';
import { Box, Container, Grid, Typography, Button, Stack, Chip, TextField, InputAdornment, Collapse, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

export default function Products({ onProductClick }) {
  const { siteData } = useAdmin();
  const { products, categories } = siteData;
  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy]           = useState('default');
  const [search, setSearch]           = useState('');
  const [filterOpen, setFilterOpen]   = useState(false);

  let filtered = products.filter(p => {
    const mc = selectedCat === 'all' || p.category === parseInt(selectedCat);
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });
  if (sortBy === 'price-asc')  filtered = [...filtered].sort((a,b) => a.price-b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a,b) => b.price-a.price);
  if (sortBy === 'rating')     filtered = [...filtered].sort((a,b) => b.rating-a.rating);

  return (
    <Box sx={{ minHeight: '60vh' }}>
      {/* Page header band */}
      <Box sx={{ background: `linear-gradient(135deg,${T.ink},#3d1410)`, color: '#fff', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography sx={{ color: T.accentLight, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.5 }}>
            CHÍNH HÃNG · BẢO HÀNH 12–36 THÁNG
          </Typography>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '22px', md: '32px' }, letterSpacing: '-0.01em' }}>
            Sản Phẩm Cân Điện Tử
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        {/* Filter bar */}
        <Box sx={{ background: T.surface, borderRadius: 3, p: { xs: 1.5, md: 2 }, mb: 3, border: `1px solid ${T.line}` }}>
          <Stack direction="row" spacing={1} mb={1.5}>
            <TextField size="small" placeholder="Tìm kiếm sản phẩm..." value={search}
              onChange={e => setSearch(e.target.value)} sx={{ flex: 1 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: '#bbb' }} /></InputAdornment>,
                sx: { borderRadius: 2.5, fontSize: 13 } }} />
            <Button variant="outlined" size="small" onClick={() => setFilterOpen(!filterOpen)}
              startIcon={<FontAwesomeIcon icon={filterOpen ? faXmark : faSliders} style={{ fontSize: 13 }} />}
              sx={{ borderRadius: 2.5, borderColor: filterOpen ? T.brand : T.line, color: filterOpen ? T.brand : T.inkSoft, fontWeight: 700, px: 2 }}>
              Lọc
            </Button>
          </Stack>

          <Collapse in={filterOpen}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mb={1.5}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel sx={{ fontSize: 13 }}>Danh mục</InputLabel>
                <Select value={selectedCat} label="Danh mục" onChange={e => setSelectedCat(e.target.value)} sx={{ borderRadius: 2.5, fontSize: 13 }}>
                  <MenuItem value="all">Tất cả ({products.length})</MenuItem>
                  {categories.map(c => <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13 }}>{c.icon} {c.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel sx={{ fontSize: 13 }}>Sắp xếp</InputLabel>
                <Select value={sortBy} label="Sắp xếp" onChange={e => setSortBy(e.target.value)} sx={{ borderRadius: 2.5, fontSize: 13 }}>
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                  <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                  <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Collapse>

          <Box className="no-scrollbar" sx={{ overflowX: 'auto' }}>
            <Stack direction="row" spacing={0.8} sx={{ width: 'max-content' }}>
              {[{ id: 'all', name: 'Tất cả', icon: '🔍' }, ...categories].map(c => (
                <Chip key={c.id} label={`${c.icon} ${c.name}`} size="small" onClick={() => setSelectedCat(c.id)}
                  sx={{ background: selectedCat === c.id ? T.gradient : T.bg, color: selectedCat === c.id ? '#fff' : T.inkSoft,
                    fontWeight: 600, fontSize: { xs: 11.5, md: 12 }, height: 30, cursor: 'pointer',
                    border: selectedCat === c.id ? 'none' : `1px solid ${T.line}`, '&:hover': { opacity: .9 } }} />
              ))}
            </Stack>
          </Box>
          <Typography sx={{ fontSize: 12, color: T.inkSoft, mt: 1.5 }}>{filtered.length} sản phẩm</Typography>
        </Box>

        {filtered.length > 0 ? (
          <Grid container spacing={{ xs: 1.2, md: 2 }}>
            {filtered.map(p => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={p.id}>
                <ProductCard product={p} onClick={onProductClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8, background: T.surface, borderRadius: 3, border: `1px solid ${T.line}` }}>
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: 44, color: '#d4cbc4', marginBottom: 14 }} />
            <Typography sx={{ color: T.inkSoft, fontSize: 15, mb: 2 }}>Không tìm thấy sản phẩm phù hợp.</Typography>
            <Button onClick={() => { setSearch(''); setSelectedCat('all'); }} variant="contained"
              sx={{ background: T.gradient, borderRadius: 2.5 }}>Xóa bộ lọc</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
