import { useState } from 'react';
import {
  Box, Typography, Stack, Button, TextField, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Alert, Tooltip,
  useMediaQuery, useTheme, Card, CardContent, CardActions, Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAdmin } from '../../context/AdminContext';

const EMPTY = { name: '', icon: '📦', slug: '', image: '' };

export default function CategoryManager() {
  const { siteData, addCategory, updateCategory, deleteCategory } = useAdmin();
  const { categories } = siteData;
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen]             = useState(false);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState(EMPTY);
  const [deleteConfirm, setDelConf] = useState(null);
  const [saved, setSaved]           = useState(false);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (c) => { setEditing(c.id); setForm({ ...c }); setOpen(true); };
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    editing ? updateCategory({ ...form, id: editing }) : addCategory(form);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setOpen(false);
  };

  const productCount = (id) => siteData.products.filter(p => p.category === id).length;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: 15, md: 18 } }}>
          Danh Mục ({categories.length})
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}
          size={isMobile ? 'small' : 'medium'}
          sx={{ background: '#c62828', fontWeight: 700, '&:hover': { background: '#8e0000' } }}>
          Thêm Mới
        </Button>
      </Stack>

      {saved && <Alert severity="success" sx={{ mb: 2, fontSize: 13 }}>✅ Đã lưu! Nhớ nhấn "Xuất Bản".</Alert>}

      {/* Mobile: cards */}
      {isMobile ? (
        <Stack spacing={1}>
          {categories.map(c => (
            <Card key={c.id} elevation={0} sx={{ border: '1px solid #ebebeb', borderRadius: 1 }}>
              <CardContent sx={{ p: 1.5, pb: '8px !important' }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography sx={{ fontSize: 28, lineHeight: 1 }}>{c.icon}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{c.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#888' }}>
                      {productCount(c.id)} sản phẩm · /{c.slug}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
              <Divider />
              <CardActions sx={{ px: 1.5, py: 1 }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => openEdit(c)}
                  sx={{ color: '#1565c0', fontWeight: 600, fontSize: 12.5 }}>Sửa</Button>
                <Button size="small" startIcon={<DeleteIcon />} onClick={() => setDelConf(c)}
                  sx={{ color: '#c62828', fontWeight: 600, fontSize: 12.5 }}>Xóa</Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      ) : (
        /* Desktop: table */
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #ebebeb', borderRadius: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 700, width: 60 }}>Icon</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tên danh mục</TableCell>
                <TableCell sx={{ fontWeight: 700, width: 160 }}>Slug</TableCell>
                <TableCell sx={{ fontWeight: 700, width: 80 }}>Sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 700, width: 90 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(c => (
                <TableRow key={c.id} hover>
                  <TableCell><Typography sx={{ fontSize: 22 }}>{c.icon}</Typography></TableCell>
                  <TableCell><Typography sx={{ fontSize: 13, fontWeight: 600 }}>{c.name}</Typography></TableCell>
                  <TableCell><Typography sx={{ fontSize: 12, color: '#888' }}>{c.slug}</Typography></TableCell>
                  <TableCell><Typography sx={{ fontSize: 12 }}>{productCount(c.id)}</Typography></TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Sửa">
                        <IconButton size="small" onClick={() => openEdit(c)} sx={{ color: '#1565c0' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton size="small" onClick={() => setDelConf(c)} sx={{ color: '#c62828' }}>
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
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: { xs: 0, sm: 2 }, m: { xs: 0, sm: 2 } } }}>
        <DialogTitle sx={{ fontWeight: 700, background: '#c62828', color: '#fff', py: 1.5, fontSize: 15 }}>
          {editing ? '✏️ Sửa Danh Mục' : '➕ Thêm Danh Mục'}
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important', px: { xs: 2, md: 3 } }}>
          <Grid container spacing={1.5}>
            <Grid item xs={8}>
              <TextField fullWidth size="small" label="Tên danh mục *" name="name" value={form.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={4}>
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
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" size="small">Hủy</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.name}
            sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={Boolean(deleteConfirm)} onClose={() => setDelConf(null)} maxWidth="xs" fullWidth
        PaperProps={{ sx: { borderRadius: 2, mx: 2 } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 15 }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 13.5 }}>
            Xóa danh mục <strong>"{deleteConfirm?.name}"</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDelConf(null)} size="small">Hủy</Button>
          <Button onClick={() => { deleteCategory(deleteConfirm.id); setDelConf(null); }}
            variant="contained" color="error" size="small">Xóa</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
