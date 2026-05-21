import { useState } from 'react';
import {
  Box, Typography, Stack, Button, TextField, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Chip, Select, MenuItem,
  FormControl, InputLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Alert, InputAdornment, Tooltip,
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

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = add new
  const [form, setForm] = useState(EMPTY);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.category === parseInt(filterCat);
    return matchSearch && matchCat;
  });

  const openAdd = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p, specifications: p.specifications || { weight: '', accuracy: '', material: '', warranty: '' } });
    setOpen(true);
  };
  const handleClose = () => { setOpen(false); setEditing(null); };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSpec = (e) => setForm(prev => ({ ...prev, specifications: { ...prev.specifications, [e.target.name]: e.target.value } }));

  const handleSave = () => {
    const product = {
      ...form,
      price: parseInt(form.price) || 0,
      originalPrice: parseInt(form.originalPrice) || 0,
      rating: parseFloat(form.rating) || 5.0,
      reviews: parseInt(form.reviews) || 0,
      category: parseInt(form.category),
    };
    if (editing) updateProduct(product);
    else addProduct(product);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    handleClose();
  };

  const handleDelete = (id) => { deleteProduct(id); setDeleteConfirm(null); };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} mb={2} spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Quản Lý Sản Phẩm ({products.length})</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}
          sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
          Thêm Sản Phẩm
        </Button>
      </Stack>

      {saved && <Alert severity="success" sx={{ mb: 2 }}>Đã lưu thành công!</Alert>}

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mb={2}>
        <TextField size="small" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)}
          sx={{ minWidth: 200 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#888' }} /></InputAdornment> }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Danh mục</InputLabel>
          <Select value={filterCat} label="Danh mục" onChange={e => setFilterCat(e.target.value)}>
            <MenuItem value="all">Tất cả</MenuItem>
            {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 700, width: 50 }}>Ảnh</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Danh mục</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Giá</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Badge</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 100 }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Box component="img" src={p.image} alt={p.name}
                    sx={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 1 }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/44?text=?'; }}
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, maxWidth: 280,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 12, color: '#666' }}>
                    {categories.find(c => c.id === p.category)?.name || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#c62828', whiteSpace: 'nowrap' }}>
                    {parseInt(p.price).toLocaleString('vi-VN')}₫
                  </Typography>
                </TableCell>
                <TableCell>
                  {p.badge && <Chip label={p.badge} size="small" sx={{ background: '#e65100', color: 'white', fontSize: 10 }} />}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton size="small" onClick={() => openEdit(p)} sx={{ color: '#1565c0' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton size="small" onClick={() => setDeleteConfirm(p)} sx={{ color: '#c62828' }}>
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

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle sx={{ fontWeight: 700, background: '#c62828', color: 'white' }}>
          {editing ? '✏️ Chỉnh Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="Tên sản phẩm *" name="name" value={form.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Danh mục *</InputLabel>
                <Select name="category" value={form.category} label="Danh mục *" onChange={handleChange}>
                  {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Badge (VD: Bán Chạy, Giảm 20%)" name="badge" value={form.badge} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Giá bán (₫) *" name="price" type="number" value={form.price} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Giá gốc (₫)" name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Đánh giá (1-5)" name="rating" type="number" inputProps={{ min: 1, max: 5, step: 0.1 }} value={form.rating} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Số lượt đánh giá" name="reviews" type="number" value={form.reviews} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="URL ảnh sản phẩm" name="image" value={form.image} onChange={handleChange}
                helperText="Dán link ảnh từ internet hoặc để trống" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="Mô tả sản phẩm" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
            </Grid>
            <Grid item xs={12}><Typography sx={{ fontWeight: 700, fontSize: 13, mt: 0.5 }}>Thông số kỹ thuật:</Typography></Grid>
            {[['weight','Tải trọng (VD: 30kg, 1 tấn)'],['accuracy','Độ chính xác (VD: 10g, 0.01g)'],['material','Vật liệu (VD: Inox 304)'],['warranty','Bảo hành (VD: 12 tháng)']].map(([k,l]) => (
              <Grid item xs={12} sm={6} key={k}>
                <TextField fullWidth size="small" label={l} name={k} value={form.specifications?.[k] || ''} onChange={handleSpec} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined">Hủy</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.name || !form.price}
            sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
            {editing ? 'Lưu Thay Đổi' : 'Thêm Sản Phẩm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={Boolean(deleteConfirm)} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn xóa <strong>{deleteConfirm?.name}</strong>?</Typography>
          <Typography sx={{ color: '#c62828', fontSize: 13, mt: 1 }}>⚠️ Không thể hoàn tác sau khi xóa.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Hủy</Button>
          <Button onClick={() => handleDelete(deleteConfirm.id)} variant="contained" color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
