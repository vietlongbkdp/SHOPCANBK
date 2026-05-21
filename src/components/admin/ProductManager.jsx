import { useState } from 'react';
import {
  Box, Typography, Stack, Button, TextField, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Chip, Select, MenuItem,
  FormControl, InputLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Alert, InputAdornment, Tooltip,
  useMediaQuery, useTheme, Card, CardContent, CardActions, Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useAdmin } from '../../context/AdminContext';

const EMPTY = {
  name: '', category: 1, price: '', originalPrice: '',
  rating: 5.0, reviews: 0, image: '', badge: '', description: '',
  specifications: { weight: '', accuracy: '', material: '', warranty: '' },
};

export default function ProductManager() {
  const { siteData, addProduct, updateProduct, deleteProduct } = useAdmin();
  const { products, categories } = siteData;
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [search, setSearch]         = useState('');
  const [filterCat, setFilterCat]   = useState('all');
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
      price: parseInt(form.price) || 0,
      originalPrice: parseInt(form.originalPrice) || 0,
      rating: parseFloat(form.rating) || 5.0,
      reviews: parseInt(form.reviews) || 0,
      category: parseInt(form.category),
    };
    editing ? updateProduct(product) : addProduct(product);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setOpen(false);
  };

  const catName = (id) => categories.find(c => c.id === id)?.name || '—';

  // ── Mobile card list ──
  const MobileList = () => (
    <Stack spacing={1}>
      {filtered.map(p => (
        <Card key={p.id} elevation={0} sx={{ border: '1px solid #ebebeb', borderRadius: 1 }}>
          <CardContent sx={{ p: 1.5, pb: '8px !important' }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box
                component="img" src={p.image} alt={p.name} loading="lazy"
                sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1, flexShrink: 0, border: '1px solid #f0f0f0' }}
                onError={(e) => { e.target.src = 'https://placehold.co/60?text=?'; }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{
                  fontSize: 13, fontWeight: 700, color: '#111', lineHeight: 1.35, mb: 0.4,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {p.name}
                </Typography>
                <Stack direction="row" spacing={0.8} alignItems="center" flexWrap="wrap" gap={0.5}>
                  <Typography sx={{ fontSize: 12, color: '#888' }}>{catName(p.category)}</Typography>
                  <Typography sx={{ fontSize: 13, color: '#c62828', fontWeight: 700 }}>
                    {Number(p.price).toLocaleString('vi-VN')}₫
                  </Typography>
                  {p.badge && (
                    <Chip label={p.badge} size="small"
                      sx={{ background: '#e65100', color: '#fff', fontSize: 10, height: 20 }} />
                  )}
                </Stack>
              </Box>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ px: 1.5, py: 1, gap: 1 }}>
            <Button size="small" startIcon={<EditIcon />} onClick={() => openEdit(p)}
              sx={{ color: '#1565c0', fontWeight: 600, fontSize: 12.5 }}>
              Sửa
            </Button>
            <Button size="small" startIcon={<DeleteIcon />} onClick={() => setDelConf(p)}
              sx={{ color: '#c62828', fontWeight: 600, fontSize: 12.5 }}>
              Xóa
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );

  // ── Desktop table ──
  const DesktopTable = () => (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #ebebeb', borderRadius: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ background: '#f5f5f5' }}>
            <TableCell sx={{ fontWeight: 700, width: 56 }}>Ảnh</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Tên sản phẩm</TableCell>
            <TableCell sx={{ fontWeight: 700, width: 120 }}>Danh mục</TableCell>
            <TableCell sx={{ fontWeight: 700, width: 130 }}>Giá</TableCell>
            <TableCell sx={{ fontWeight: 700, width: 110 }}>Badge</TableCell>
            <TableCell sx={{ fontWeight: 700, width: 90 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map(p => (
            <TableRow key={p.id} hover>
              <TableCell>
                <Box component="img" src={p.image} alt={p.name}
                  sx={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 1 }}
                  onError={(e) => { e.target.src='https://placehold.co/44?text=?'; }}
                />
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: 13, fontWeight: 600, maxWidth: 260,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.name}
                </Typography>
              </TableCell>
              <TableCell><Typography sx={{ fontSize: 12.5, color: '#666' }}>{catName(p.category)}</Typography></TableCell>
              <TableCell>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#c62828', whiteSpace: 'nowrap' }}>
                  {Number(p.price).toLocaleString('vi-VN')}₫
                </Typography>
              </TableCell>
              <TableCell>
                {p.badge && <Chip label={p.badge} size="small" sx={{ background: '#e65100', color: '#fff', fontSize: 10 }} />}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={0.5}>
                  <Tooltip title="Sửa">
                    <IconButton size="small" onClick={() => openEdit(p)} sx={{ color: '#1565c0' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton size="small" onClick={() => setDelConf(p)} sx={{ color: '#c62828' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} gap={1}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: 15, md: 18 } }}>
          Sản Phẩm ({products.length})
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd} size={isMobile ? 'small' : 'medium'}
          sx={{ background: '#c62828', fontWeight: 700, '&:hover': { background: '#8e0000' } }}>
          Thêm Mới
        </Button>
      </Stack>

      {saved && <Alert severity="success" sx={{ mb: 2, fontSize: 13 }}>✅ Đã lưu! Nhớ nhấn "Xuất Bản" để cập nhật website.</Alert>}

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mb={2}>
        <TextField size="small" placeholder="Tìm kiếm..." value={search}
          onChange={e => setSearch(e.target.value)} sx={{ flex: 1 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 17, color: '#bbb' }} /></InputAdornment> }}
        />
        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 175 } }}>
          <InputLabel>Danh mục</InputLabel>
          <Select value={filterCat} label="Danh mục" onChange={e => setFilterCat(e.target.value)}>
            <MenuItem value="all">Tất cả ({products.length})</MenuItem>
            {categories.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.icon} {c.name} ({products.filter(p => p.category === c.id).length})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Typography sx={{ fontSize: 12.5, color: '#888', mb: 1.5 }}>
        Hiển thị {filtered.length}/{products.length} sản phẩm
      </Typography>

      {/* List — card on mobile, table on desktop */}
      {isMobile ? <MobileList /> : <DesktopTable />}

      {filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{ color: '#aaa' }}>Không tìm thấy sản phẩm nào.</Typography>
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: { xs: 0, sm: 2 }, m: { xs: 0, sm: 2 }, maxHeight: { xs: '100dvh', sm: '90vh' } } }}>
        <DialogTitle sx={{ fontWeight: 700, background: '#c62828', color: '#fff', py: 1.5, fontSize: { xs: 15, md: 17 } }}>
          {editing ? '✏️ Chỉnh Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important', px: { xs: 2, md: 3 }, overflowY: 'auto' }}>
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
              <TextField fullWidth size="small" label="Đánh giá (1-5)" name="rating" type="number"
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
              <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#555', mb: 0.5 }}>Thông số kỹ thuật:</Typography>
            </Grid>
            {[
              ['weight','Tải trọng (VD: 30kg)'],
              ['accuracy','Độ chính xác (VD: 10g)'],
              ['material','Vật liệu (VD: Inox 304)'],
              ['warranty','Bảo hành (VD: 12 tháng)'],
            ].map(([k,l]) => (
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
            sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
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
          <Typography sx={{ color: '#c62828', fontSize: 12.5, mt: 0.8 }}>⚠️ Không thể hoàn tác.</Typography>
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
