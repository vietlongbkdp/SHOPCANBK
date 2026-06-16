import { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Stack, Alert, Paper } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAdmin } from '../../context/AdminContext';

const FIELDS = [
  { name: 'name',        label: 'Tên công ty',              xs: 12 },
  { name: 'slogan',      label: 'Slogan',                   xs: 12 },
  { name: 'phone1',      label: 'SĐT Chi nhánh Huế',        xs: 12, sm: 6 },
  { name: 'phone2',      label: 'SĐT Chi nhánh Đà Nẵng',    xs: 12, sm: 6 },
  { name: 'email',       label: 'Email',                    xs: 12, sm: 6 },
  { name: 'hours',       label: 'Giờ làm việc',             xs: 12, sm: 6 },
  { name: 'address1',    label: 'Địa chỉ Chi nhánh Huế',    xs: 12 },
  { name: 'address2',    label: 'Địa chỉ Chi nhánh Đà Nẵng',xs: 12 },
  { name: 'facebook',    label: 'Link Facebook',            xs: 12, sm: 6 },
  { name: 'zalo',        label: 'Số Zalo',                  xs: 12, sm: 6 },
];

export default function SiteInfoManager() {
  const { siteData, updateCompany, changePassword, resetToDefault } = useAdmin();
  const [form, setForm]   = useState({ ...siteData.company });
  const [saved, setSaved] = useState(false);

  const [passForm, setPassForm] = useState({ old: '', new1: '', new2: '' });
  const [passMsg, setPassMsg]   = useState(null);

  const handleSave = () => {
    updateCompany(form);
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const handlePassChange = () => {
    if (passForm.new1 !== passForm.new2) return setPassMsg({ type:'error', text:'Mật khẩu mới không khớp!' });
    if (passForm.new1.length < 6)        return setPassMsg({ type:'error', text:'Mật khẩu phải ít nhất 6 ký tự!' });
    const ok = changePassword(passForm.old, passForm.new1);
    setPassMsg(ok
      ? { type:'success', text:'✅ Đổi mật khẩu thành công!' }
      : { type:'error',   text:'❌ Mật khẩu cũ không đúng!' }
    );
    if (ok) setPassForm({ old:'', new1:'', new2:'' });
    setTimeout(() => setPassMsg(null), 3000);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: 15, md: 18 } }}>
        Thông Tin Công Ty
      </Typography>

      {saved && <Alert severity="success" sx={{ mb: 2, fontSize: 13 }}>✅ Đã lưu! Nhớ nhấn "Xuất Bản" để cập nhật website.</Alert>}

      <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, mb: 3, borderRadius: 1, border: '1px solid #ebebeb' }}>
        <Grid container spacing={1.5}>
          {FIELDS.map(f => (
            <Grid item xs={f.xs} sm={f.sm} key={f.name}>
              <TextField
                fullWidth size="small" label={f.label} name={f.name}
                value={form[f.name] || ''}
                onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))}
                sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor:'#1565c0' }, '& .MuiInputLabel-root.Mui-focused': { color:'#1565c0' } }}
              />
            </Grid>
          ))}
        </Grid>
        <Stack direction={{ xs:'column', sm:'row' }} spacing={1} mt={2} justifyContent="flex-end">
          <Button variant="outlined" color="error" size="small"
            onClick={() => { resetToDefault(); setForm({ ...siteData.company }); }}>
            Khôi phục mặc định
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
            sx={{ background:'#1565c0', '&:hover':{ background:'#8e0000' } }}>
            Lưu Thay Đổi
          </Button>
        </Stack>
      </Paper>

      {/* Change password */}
      <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, md: 16 }, mb: 1.5 }}>Đổi Mật Khẩu Admin</Typography>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 1, border: '1px solid #ebebeb' }}>
        {passMsg && <Alert severity={passMsg.type} sx={{ mb: 2, fontSize: 13 }}>{passMsg.text}</Alert>}
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="Mật khẩu cũ" type="password"
              value={passForm.old} onChange={e => setPassForm(p => ({ ...p, old: e.target.value }))} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="Mật khẩu mới" type="password"
              value={passForm.new1} onChange={e => setPassForm(p => ({ ...p, new1: e.target.value }))} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="Xác nhận mật khẩu mới" type="password"
              value={passForm.new2} onChange={e => setPassForm(p => ({ ...p, new2: e.target.value }))} />
          </Grid>
        </Grid>
        <Box mt={2} textAlign="right">
          <Button variant="contained" onClick={handlePassChange}
            disabled={!passForm.old || !passForm.new1 || !passForm.new2}
            sx={{ background:'#1565c0', '&:hover':{ background:'#0d47a1' } }}>
            Đổi Mật Khẩu
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
