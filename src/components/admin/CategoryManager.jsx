import { useState } from 'react';
import {
  Box, Typography, Stack, Button, TextField, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Alert, Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAdmin } from '../../context/AdminContext';

const EMPTY = { name: '', icon: '📦', slug: '', image: '' };

export default function CategoryManager() {
  const { siteData, addCategory, updateCategory, deleteCategory } = useAdmin();
  const { categories } = siteData;
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (c) => { setEditing(c.id); setForm({ ...c }); setOpen(true); };
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (editing) updateCategory({ ...form, id: editing });
    else addCategory(form);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setOpen(false);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Quản Lý Danh Mục ({categories.length})</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}
          sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
          Thêm Danh Mục
        </Button>
      </Stack>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Đã lưu!</Alert>}

      <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 700 }}>Icon</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tên danh mục</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Slug</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>SP</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 100 }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(c => (
              <TableRow key={c.id} hover>
                <TableCell><Typography sx={{ fontSize: 22 }}>{c.icon}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 600, fontSize: 13 }}>{c.name}</Typography></TableCell>
                <TableCell><Typography sx={{ fontSize: 12, color: '#888' }}>{c.slug}</Typography></TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 12 }}>
                    {siteData.products.filter(p => p.category === c.id).length}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton size="small" onClick={() => openEdit(c)} sx={{ color: '#1565c0' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton size="small" onClick={() => setDeleteConfirm(c)} sx={{ color: '#c62828' }}>
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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, background: '#c62828', color: 'white' }}>
          {editing ? '✏️ Sửa Danh Mục' : '➕ Thêm Danh Mục'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField fullWidth size="small" label="Tên danh mục *" name="name" value={form.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth size="small" label="Icon (emoji)" name="icon" value={form.icon} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="Slug (VD: can-ban)" name="slug" value={form.slug} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" label="URL ảnh đại diện" name="image" value={form.image} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined">Hủy</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.name}
            sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteConfirm)} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Xóa danh mục <strong>{deleteConfirm?.name}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Hủy</Button>
          <Button onClick={() => { deleteCategory(deleteConfirm.id); setDeleteConfirm(null); }} variant="contained" color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
