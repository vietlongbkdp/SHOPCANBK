import { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar,
  Typography, AppBar, IconButton, Stack, Button, Chip, useMediaQuery,
  useTheme, Divider, ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductManager from './ProductManager';
import SiteInfoManager from './SiteInfoManager';
import CategoryManager from './CategoryManager';
import { useAdmin } from '../../context/AdminContext';

const DRAWER_WIDTH = 240;

const MENU = [
  { id: 'dashboard', label: 'Tổng quan', icon: <DashboardIcon /> },
  { id: 'products', label: 'Sản phẩm', icon: <InventoryIcon /> },
  { id: 'categories', label: 'Danh mục', icon: <CategoryIcon /> },
  { id: 'siteinfo', label: 'Thông tin công ty', icon: <BusinessIcon /> },
];

function DashboardOverview({ onNavigate }) {
  const { siteData } = useAdmin();
  const stats = [
    { label: 'Tổng sản phẩm', value: siteData.products.length, color: '#c62828', icon: '📦', tab: 'products' },
    { label: 'Danh mục', value: siteData.categories.length, color: '#1565c0', icon: '🗂️', tab: 'categories' },
    { label: 'Dịch vụ', value: siteData.services?.length || 0, color: '#2e7d32', icon: '🔧', tab: 'siteinfo' },
  ];
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Tổng Quan</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        {stats.map(s => (
          <Box key={s.label} onClick={() => onNavigate(s.tab)} sx={{
            flex: '1 1 140px', background: s.color, color: 'white', borderRadius: 2,
            p: 2.5, textAlign: 'center', cursor: 'pointer',
            transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-3px)' },
          }}>
            <Typography sx={{ fontSize: 36 }}>{s.icon}</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{s.value}</Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.9, mt: 0.3 }}>{s.label}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ background: '#fff3e0', border: '1px solid #ffcc02', borderRadius: 1, p: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.5 }}>💡 Lưu ý quan trọng</Typography>
        <Typography sx={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
          Dữ liệu sản phẩm bạn thêm/sửa/xóa được lưu trên trình duyệt này. Để cập nhật thật sự lên website công khai, bạn cần liên hệ nhà phát triển để cập nhật file <code>data.json</code> lên server.
        </Typography>
      </Box>
    </Box>
  );
}

export default function AdminDashboard({ onExitAdmin }) {
  const [tab, setTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAdmin();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => { logout(); onExitAdmin && onExitAdmin(); };

  const DrawerContent = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, background: 'linear-gradient(135deg, #c62828, #e65100)', color: 'white', textAlign: 'center' }}>
        <Typography sx={{ fontSize: 28 }}>⚖️</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>CÂN ĐIỆN TỬ BÁCH KHOA</Typography>
        <Chip label="Admin" size="small" sx={{ mt: 0.5, background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11 }} />
      </Box>
      <Divider />
      <List dense sx={{ flex: 1, pt: 1 }}>
        {MENU.map(m => (
          <ListItemButton key={m.id} selected={tab === m.id}
            onClick={() => { setTab(m.id); setMobileOpen(false); }}
            sx={{ borderRadius: 1, mx: 1, mb: 0.3, '&.Mui-selected': { background: '#fff5f5', color: '#c62828', '& .MuiListItemIcon-root': { color: '#c62828' } } }}>
            <ListItemIcon sx={{ minWidth: 36 }}>{m.icon}</ListItemIcon>
            <ListItemText primary={m.label} primaryTypographyProps={{ fontSize: 14, fontWeight: tab === m.id ? 700 : 400 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton onClick={() => { onExitAdmin && onExitAdmin(); }}
          sx={{ borderRadius: 1, color: '#1565c0' }}>
          <ListItemIcon sx={{ minWidth: 36, color: '#1565c0' }}><HomeIcon /></ListItemIcon>
          <ListItemText primary="Về trang chủ" primaryTypographyProps={{ fontSize: 13 }} />
        </ListItemButton>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 1, color: '#c62828' }}>
          <ListItemIcon sx={{ minWidth: 36, color: '#c62828' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Đăng xuất" primaryTypographyProps={{ fontSize: 13 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  const renderContent = () => {
    switch (tab) {
      case 'products': return <ProductManager />;
      case 'categories': return <CategoryManager />;
      case 'siteinfo': return <SiteInfoManager />;
      default: return <DashboardOverview onNavigate={setTab} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sidebar */}
      {isMobile ? (
        <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { width: DRAWER_WIDTH } }}>
          <DrawerContent />
        </Drawer>
      ) : (
        <Drawer variant="permanent" PaperProps={{ sx: { width: DRAWER_WIDTH, boxSizing: 'border-box', border: 'none', boxShadow: '2px 0 8px rgba(0,0,0,0.06)' } }}>
          <DrawerContent />
        </Drawer>
      )}

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: isMobile ? 0 : `${DRAWER_WIDTH}px` }}>
        <AppBar position="sticky" sx={{ background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', color: '#333' }}>
          <Toolbar sx={{ minHeight: 56 }}>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 700, fontSize: 16, flex: 1 }}>
              🛠️ Quản Trị — {MENU.find(m => m.id === tab)?.label || 'Tổng quan'}
            </Typography>
            <Button variant="outlined" size="small" startIcon={<HomeIcon />}
              onClick={() => onExitAdmin && onExitAdmin()}
              sx={{ borderColor: '#1565c0', color: '#1565c0', mr: 1, fontSize: 12 }}>
              Trang chủ
            </Button>
            <Button variant="outlined" size="small" startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ borderColor: '#c62828', color: '#c62828', fontSize: 12 }}>
              Đăng xuất
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
