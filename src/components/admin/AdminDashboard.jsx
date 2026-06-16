import { useState } from 'react';
import {
  Box, Drawer, List, AppBar, Toolbar, Typography, IconButton,
  Stack, Button, Chip, useMediaQuery, useTheme, Divider,
  ListItemButton, ListItemIcon, ListItemText, Alert, Snackbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProductManager from './ProductManager';
import SiteInfoManager from './SiteInfoManager';
import CategoryManager from './CategoryManager';
import { useAdmin } from '../../context/AdminContext';

const DRAWER_WIDTH = 240;

const MENU = [
  { id: 'dashboard',  label: 'Tổng quan',          icon: <DashboardIcon /> },
  { id: 'products',   label: 'Sản phẩm',            icon: <InventoryIcon /> },
  { id: 'categories', label: 'Danh mục',            icon: <CategoryIcon /> },
  { id: 'siteinfo',   label: 'Thông tin công ty',   icon: <BusinessIcon /> },
];

function DashboardOverview({ onNavigate }) {
  const { siteData, publishToGitHub, saving, saveMsg, hasUnsaved } = useAdmin();
  const [snack, setSnack] = useState(false);

  const handlePublish = async () => {
    await publishToGitHub();
    setSnack(true);
  };

  const stats = [
    { label: 'Sản phẩm', value: siteData.products.length, color: '#1565c0', icon: '📦', tab: 'products' },
    { label: 'Danh mục', value: siteData.categories.length, color: '#1565c0', icon: '🗂️', tab: 'categories' },
    { label: 'Dịch vụ', value: siteData.services?.length || 0, color: '#2e7d32', icon: '🔧', tab: 'siteinfo' },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Tổng Quan</Typography>

      {/* Publish button */}
      <Box sx={{
        p: 2, mb: 2.5, borderRadius: 1, border: `2px solid ${hasUnsaved ? '#ff9800' : '#e0e0e0'}`,
        background: hasUnsaved ? '#fff8e1' : '#fafafa',
      }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.3 }}>
              {hasUnsaved ? '⚠️ Có thay đổi chưa xuất bản' : '✅ Đã đồng bộ'}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: '#666' }}>
              {hasUnsaved
                ? 'Nhấn "Xuất Bản" để đẩy lên GitHub và cập nhật website.'
                : 'Mọi thay đổi đã được xuất bản lên website.'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handlePublish}
            disabled={saving || !hasUnsaved}
            sx={{ background: '#1565c0', fontWeight: 700, '&:hover': { background: '#8e0000' }, '&:disabled': { background: '#ccc' } }}
          >
            {saving ? 'Đang xuất bản...' : 'Xuất Bản'}
          </Button>
        </Stack>
      </Box>

      {/* Stats */}
      <Stack direction="row" flexWrap="wrap" gap={1.5} mb={2.5}>
        {stats.map(s => (
          <Box key={s.label} onClick={() => onNavigate(s.tab)} sx={{
            flex: '1 1 130px', background: s.color, color: '#fff', borderRadius: 2,
            p: 2, textAlign: 'center', cursor: 'pointer',
            transition: 'transform .2s', '&:hover': { transform: 'translateY(-2px)' },
          }}>
            <Typography sx={{ fontSize: 32 }}>{s.icon}</Typography>
            <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{s.value}</Typography>
            <Typography sx={{ fontSize: 12.5, opacity: 0.9 }}>{s.label}</Typography>
          </Box>
        ))}
      </Stack>

      <Box sx={{ background: '#e3f2fd', border: '1px solid #90caf9', borderRadius: 1, p: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 13.5, mb: 0.5 }}>💡 Hướng dẫn sử dụng</Typography>
        <Typography sx={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
          Thêm/sửa/xóa sản phẩm → nhấn <strong>"Xuất Bản"</strong> để cập nhật website.<br/>
          Website sẽ tự động cập nhật sau khoảng <strong>1–2 phút</strong>.
        </Typography>
      </Box>

      <Snackbar open={snack} autoHideDuration={5000} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        {saveMsg && (
          <Alert severity={saveMsg.type} variant="filled" onClose={() => setSnack(false)}>
            {saveMsg.text}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}

export default function AdminDashboard({ onExitAdmin }) {
  const [tab, setTab]           = useState('dashboard');
  const [mobileOpen, setMobile] = useState(false);
  const { logout, hasUnsaved }  = useAdmin();
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => { logout(); onExitAdmin?.(); };

  const DrawerContent = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, background: 'linear-gradient(135deg,#1565c0,#00b0ff)', color: '#fff', textAlign: 'center' }}>
        <Typography sx={{ fontSize: 26 }}>⚖️</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>BÁCH KHOA ADMIN</Typography>
        <Chip label="Quản trị" size="small"
          sx={{ mt: 0.5, background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: 11 }} />
      </Box>
      <Divider />
      <List dense sx={{ flex: 1, pt: 1 }}>
        {MENU.map(m => (
          <ListItemButton key={m.id}
            selected={tab === m.id}
            onClick={() => { setTab(m.id); setMobile(false); }}
            sx={{
              borderRadius: 1, mx: 1, mb: 0.3,
              '&.Mui-selected': { background: '#fff5f5', color: '#1565c0', '& .MuiListItemIcon-root': { color: '#1565c0' } },
            }}>
            <ListItemIcon sx={{ minWidth: 36 }}>{m.icon}</ListItemIcon>
            <ListItemText primary={m.label} primaryTypographyProps={{ fontSize: 13.5, fontWeight: tab === m.id ? 700 : 400 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 1 }}>
        {hasUnsaved && (
          <Box sx={{ px: 1, py: 0.6, mb: 0.5, background: '#fff3e0', borderRadius: 1 }}>
            <Typography sx={{ fontSize: 11.5, color: '#00b0ff', fontWeight: 600 }}>
              ⚠️ Có thay đổi chưa xuất bản
            </Typography>
          </Box>
        )}
        <ListItemButton onClick={() => onExitAdmin?.()} sx={{ borderRadius: 1, color: '#1565c0' }}>
          <ListItemIcon sx={{ minWidth: 36, color: '#1565c0' }}><HomeIcon /></ListItemIcon>
          <ListItemText primary="Về trang chủ" primaryTypographyProps={{ fontSize: 13 }} />
        </ListItemButton>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 1, color: '#1565c0' }}>
          <ListItemIcon sx={{ minWidth: 36, color: '#1565c0' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Đăng xuất" primaryTypographyProps={{ fontSize: 13 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  const renderContent = () => {
    switch (tab) {
      case 'products':   return <ProductManager />;
      case 'categories': return <CategoryManager />;
      case 'siteinfo':   return <SiteInfoManager />;
      default:           return <DashboardOverview onNavigate={setTab} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {isMobile ? (
        <Drawer anchor="left" open={mobileOpen} onClose={() => setMobile(false)}
          PaperProps={{ sx: { width: DRAWER_WIDTH } }}>
          <DrawerContent />
        </Drawer>
      ) : (
        <Drawer variant="permanent"
          PaperProps={{ sx: { width: DRAWER_WIDTH, border: 'none', boxShadow: '2px 0 8px rgba(0,0,0,.06)' } }}>
          <DrawerContent />
        </Drawer>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: isMobile ? 0 : `${DRAWER_WIDTH}px` }}>
        <AppBar position="sticky" elevation={0}
          sx={{ background: '#fff', borderBottom: '1px solid #e0e0e0', color: '#333' }}>
          <Toolbar sx={{ minHeight: 52 }}>
            {isMobile && (
              <IconButton onClick={() => setMobile(true)} sx={{ mr: 1 }}><MenuIcon /></IconButton>
            )}
            <Typography sx={{ fontWeight: 700, fontSize: 15, flex: 1 }}>
              🛠️ {MENU.find(m => m.id === tab)?.label || 'Tổng quan'}
            </Typography>
            {hasUnsaved && (
              <Chip label="Chưa xuất bản" size="small"
                sx={{ background: '#fff3e0', color: '#00b0ff', fontWeight: 600, mr: 1, fontSize: 11 }} />
            )}
            <Button size="small" startIcon={<HomeIcon />} onClick={() => onExitAdmin?.()}
              sx={{ color: '#1565c0', mr: 0.5, fontSize: 12 }}>
              {!isMobile && 'Trang chủ'}
            </Button>
            <Button size="small" startIcon={<LogoutIcon />} onClick={handleLogout}
              sx={{ color: '#1565c0', fontSize: 12 }}>
              {!isMobile && 'Đăng xuất'}
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, maxWidth: 1200 }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}
