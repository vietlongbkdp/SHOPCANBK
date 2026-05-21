import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, Alert, InputAdornment, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = login(password);
      if (ok) { onSuccess && onSuccess(); }
      else { setError('Mật khẩu không đúng. Vui lòng thử lại.'); }
      setLoading(false);
    }, 600);
  };

  return (
    <Box sx={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #c62828, #e65100)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2,
    }}>
      <Paper sx={{ width: '100%', maxWidth: 380, borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ background: 'linear-gradient(135deg, #c62828, #e65100)', p: 3, textAlign: 'center', color: 'white' }}>
          <Box sx={{ fontSize: 48, mb: 1 }}>⚖️</Box>
          <Typography sx={{ fontWeight: 800, fontSize: 18 }}>CÂN ĐIỆN TỬ BÁCH KHOA</Typography>
          <Typography sx={{ opacity: 0.85, fontSize: 13 }}>Trang quản trị</Typography>
        </Box>

        {/* Form */}
        <Box sx={{ p: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={2.5}>
            <LockIcon sx={{ color: '#c62828' }} />
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Đăng nhập Admin</Typography>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 2, fontSize: 13 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Mật khẩu"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth size="small" required autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c62828' }, '& .MuiInputLabel-root.Mui-focused': { color: '#c62828' } }}
              />
              <Button type="submit" variant="contained" fullWidth disabled={loading}
                sx={{ background: '#c62828', fontWeight: 700, py: 1.2, '&:hover': { background: '#8e0000' } }}>
                {loading ? 'Đang kiểm tra...' : 'Đăng Nhập'}
              </Button>
            </Stack>
          </form>


        </Box>
      </Paper>
    </Box>
  );
}
