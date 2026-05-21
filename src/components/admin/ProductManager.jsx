import { useState } from 'react';
import {
  Box, Typography, Stack, Button, TextField, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Chip, Select, MenuItem,
  FormControl, InputLabel, Paper, Alert, InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { useAdmin } from '../../context/AdminContext';

const EMPTY = {
  name: '', category: 1, price: '', originalPrice: '',
  rating: 5.0, reviews: 0, image: '', badge: '', description: '',
  specifications: { weight: '', accuracy: '', material: '', warranty: '' },
};

export default function ProductManager() {
  const { siteData, addProduct, updateProduct, deleteProduct } = useAdmin();
  const { products, categories } = siteData;

  const [search, setSearch]         = useState('');
  const [filterCat, setFilterCat]   = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [open, setOpen]             = useState(false);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState(EMPTY);
  const [deleteConfirm, setDelConf] = useState(null);
  const [saved, setSaved]           = useState(false);

  const filtered = products.filter(p => {
    const matchS = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchC = filterCat === 'all' || p.category === parseInt(filterCat);
    return matchS && matchC;
  });

  const discounted = products.filter(p => p.originalPrice > p.price).length;

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p, specifications: p.specifications || { weight:'',accuracy:'',material:'',warranty:'' } });
    setOpen(true);
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSpec   = (e) => setForm(p => ({ ...p, specifications: { ...p.specifications, [e.target.name]: e.target.value } }));

  const handleSave = () => {
    const product = {
      ...form,
      price:         parseInt(form.price) || 0,
      originalPrice: parseInt(form.originalPrice) || 0,
      rating:        parseFloat(form.rating) || 5.0,
      reviews:       parseInt(form.reviews) || 0,
      category:      parseInt(form.category),
    };
    editing ? updateProduct(product) : addProduct(product);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setOpen(false);
  };

  const catName = (id) => categories.find(c => c.id === id)?.name || '—';
  const catIcon = (id) => categories.find(c => c.id === id)?.icon || '📦';

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 18 } }}>
          Quản Lý Sản Phẩm
        </Typography>
        <Chip label={`${products.length} sản phẩm`} size="small"
          sx={{ background: '#f0f0f0', fontWeight: 600, fontSize: 12 }} />
      </Stack>

      {saved && <Alert severity="success" sx={{ mb: 1.5, fontSize: 12.5 }}>✅ Đã lưu! Nhớ nhấn "Xuất Bản".</Alert>}

      {/* Stats mini cards */}
      <Grid container spacing={1} mb={2}>
        <Grid item xs={6}>
          <Paper elevation={0} sx={{ p: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>
            <Typography sx={{ fontSize: 11, color: '#888', mb: 0.3 }}>Tổng sản phẩm</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: 22, color: '#111', lineHeight: 1 }}>
              {products.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={0} sx={{ p: 1.5, borderRadius: 1, border: '1px solid #ebebeb' }}>
            <Typography sx={{ fontSize: 11, color: '#888', mb: 0.3 }}>Đang giảm giá</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: 22, color: '#c62828', lineHeight: 1 }}>
              {discounted}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Add button */}
      <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={openAdd}
        sx={{
          mb: 1.5, py: 1.2, borderColor: '#e0e0e0', color: '#333',
          fontWeight: 600, fontSize: 14, borderRadius: 1.5,
          '&:hover': { borderColor: '#c62828', color: '#c62828', background: '#fff5f5' },
        }}>
        Thêm Sản Phẩm
      </Button>

      {/* Search + Filter */}
      <Stack direction="row" spacing={1} mb={1.5}>
        <TextField
          size="small" placeholder="Tìm kiếm sản phẩm..."
          value={search} onChange={e => setSearch(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: '#bbb' }} /></InputAdornment>,
            sx: { borderRadius: 1.5, fontSize: 13 },
          }}
        />
        <Button variant="outlined" startIcon={<TuneIcon />} onClick={() => setFilterOpen(!filterOpen)}
          size="small"
          sx={{
            borderColor: filterOpen ? '#c62828' : '#e0e0e0',
            color: filterOpen ? '#c62828' : '#555',
            fontWeight: 600, fontSize: 13, borderRadius: 1.5, px: 1.5,
            '&:hover': { borderColor: '#c62828', color: '#c62828' },
          }}>
          Lọc
        </Button>
      </Stack>

      {/* Filter dropdown */}
      {filterOpen && (
        <Paper elevation={0} sx={{ p: 1.5, mb: 1.5, borderRadius: 1.5, border: '1px solid #ebebeb' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Sắp xếp theo</InputLabel>
            <Select label="Sắp xếp theo" defaultValue="default">
              <MenuItem value="default">Mặc định</MenuItem>
              <MenuItem value="price-asc">Giá tăng dần</MenuItem>
              <MenuItem value="price-desc">Giá giảm dần</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      )}

      {/* Category chips */}
      <Box sx={{ overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, mb: 2 }}>
        <Stack direction="row" spacing={0.8} sx={{ width: 'max-content', pb: 0.5 }}>
          <Chip label="Tất cả" size="small" onClick={() => setFilterCat('all')}
            sx={{
              background: filterCat === 'all' ? '#c62828' : '#f0f0f0',
              color: filterCat === 'all' ? '#fff' : '#444',
              fontWeight: 700, fontSize: 12.5, height: 28, cursor: 'pointer',
              '&:hover': { opacity: 0.85 },
            }} />
          {categories.map(c => (
            <Chip key={c.id} label={c.name} size="small"
              onClick={() => setFilterCat(c.id)}
              sx={{
                background: filterCat === c.id ? '#c62828' : '#f0f0f0',
                color: filterCat === c.id ? '#fff' : '#444',
                fontWeight: 600, fontSize: 12, height: 28, cursor: 'pointer',
                '&:hover': { opacity: 0.85 },
              }} />
          ))}
        </Stack>
      </Box>

      {/* Product list */}
      <Stack spacing={1}>
        {filtered.map(p => (
          <Paper key={p.id} elevation={0} sx={{
            border: '1px solid #ebebeb', borderRadius: 1.5, overflow: 'hidden',
            '&:hover': { borderColor: '#d0d0d0', boxShadow: '0 2px 8px rgba(0,0,0,.06)' },
            transition: 'all .15s',
          }}>
            <Stack direction="row" alignItems="center" spacing={0} sx={{ p: 0 }}>
              {/* Image */}
              <Box sx={{
                width: 72, height: 72, flexShrink: 0,
                background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRight: '1px solid #f0f0f0',
              }}>
                {p.image ? (
                  <Box component="img" src={p.image} alt={p.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <Box sx={{
                  display: p.image ? 'none' : 'flex',
                  fontSize: 24, alignItems: 'center', justifyContent: 'center',
                  width: '100%', height: '100%',
                }}>
                  {catIcon(p.category)}
                </Box>
              </Box>

              {/* Info */}
              <Box sx={{ flex: 1, minWidth: 0, px: 1.5, py: 1.2 }}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={0.5}>
                  <Typography sx={{
                    fontSize: 13.5, fontWeight: 700, color: '#111', lineHeight: 1.35,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    flex: 1,
                  }}>
                    {p.name}
                  </Typography>
                  {p.badge && (
                    <Chip label={p.badge} size="small" sx={{
                      background: '#e8f5e9', color: '#2e7d32',
                      fontWeight: 700, fontSize: 10, height: 20, flexShrink: 0,
                      '& .MuiChip-label': { px: 0.8 },
                    }} />
                  )}
                </Stack>
                <Typography sx={{ fontSize: 11.5, color: '#888', mt: 0.2 }}>
                  {catName(p.category)}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#c62828', fontWeight: 800, mt: 0.3 }}>
                  {Number(p.price).toLocaleString('vi-VN')}đ
                </Typography>
              </Box>

              {/* Actions */}
              <Stack direction="column" spacing={0.5} sx={{ pr: 1.2, flexShrink: 0 }}>
                <IconButton size="small" onClick={() => openEdit(p)}
                  sx={{ border: '1px solid #e8e8e8', borderRadius: 1, p: 0.7, color: '#555', '&:hover': { borderColor: '#1565c0', color: '#1565c0' } }}>
                  <EditIcon sx={{ fontSize: 15 }} />
                </IconButton>
                <IconButton size="small" onClick={() => setDelConf(p)}
                  sx={{ border: '1px solid #fce4e4', borderRadius: 1, p: 0.7, color: '#e53935', '&:hover': { background: '#fce4e4' } }}>
                  <DeleteIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography sx={{ fontSize: 32, mb: 1 }}>🔍</Typography>
          <Typography sx={{ color: '#bbb', fontSize: 14 }}>Không tìm thấy sản phẩm.</Typography>
        </Box>
      )}

      {/* ── Add/Edit Dialog ── */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: { xs: 0, sm: 2 }, m: { xs: 0, sm: 2 }, maxHeight: { xs: '100dvh', sm: '90vh' } } }}>
        <DialogTitle sx={{ fontWeight: 700, background: '#c62828', color: '#fff', py: 1.5, fontSize: 15 }}>
          {editing ? '✏️ Chỉnh Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important', pb: 2, overflowY: 'auto' }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="Tên sản phẩm *" name="name" value={form.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Danh mục *</InputLabel>
                <Select name="category" value={form.category} label="Danh mục *" onChange={handleChange}>
                  {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.icon} {c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Badge (VD: Bán Chạy)" name="badge" value={form.badge} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" label="Giá bán (₫) *" name="price" type="number" value={form.price} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" label="Giá gốc (₫)" name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" label="Đánh giá (1–5)" name="rating" type="number"
                inputProps={{ min:1, max:5, step:0.1 }} value={form.rating} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" label="Số lượt đánh giá" name="reviews" type="number" value={form.reviews} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="URL ảnh sản phẩm" name="image" value={form.image} onChange={handleChange}
                helperText="Dán link ảnh từ internet" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="Mô tả sản phẩm" name="description" value={form.description}
                onChange={handleChange} multiline rows={3} />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: '#666', mb: 0.5 }}>Thông số kỹ thuật:</Typography>
            </Grid>
            {[['weight','Tải trọng'],['accuracy','Độ chính xác'],['material','Vật liệu'],['warranty','Bảo hành']].map(([k,l]) => (
              <Grid item xs={6} key={k}>
                <TextField fullWidth size="small" label={l} name={k}
                  value={form.specifications?.[k] || ''} onChange={handleSpec} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" size="small">Hủy</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.name || !form.price}
            sx={{ background: '#c62828', fontWeight: 700, '&:hover': { background: '#8e0000' } }}>
            {editing ? 'Lưu Thay Đổi' : 'Thêm Sản Phẩm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={Boolean(deleteConfirm)} onClose={() => setDelConf(null)} maxWidth="xs" fullWidth
        PaperProps={{ sx: { borderRadius: 2, mx: 2 } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 15 }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 13.5 }}>
            Xóa sản phẩm <strong>"{deleteConfirm?.name}"</strong>?
          </Typography>
          <Typography sx={{ color: '#c62828', fontSize: 12, mt: 0.5 }}>⚠️ Không thể hoàn tác.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDelConf(null)} size="small">Hủy</Button>
          <Button onClick={() => { deleteProduct(deleteConfirm.id); setDelConf(null); }}
            variant="contained" color="error" size="small">Xóa</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
