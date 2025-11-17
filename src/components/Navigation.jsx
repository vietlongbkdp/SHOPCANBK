import { useState } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  Menu,
  Stack,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Navigation({
  onNavigate,
  onSearch,
  searchTerm,
  currentPage,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: 'Giới Thiệu', page: 'introduction' },
    { label: 'Ngành Nghề', page: 'services' },
    { label: 'Sản Phẩm', page: 'products' },
    { label: 'Dịch Vụ', page: 'services' },
    { label: 'Tài Liệu', page: 'documents' },
    { label: 'Tin Tức', page: 'news' },
    { label: 'Liên Hệ', page: 'contact' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (page) => {
    onNavigate(page);
    handleMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #7cb342 0%, #558b2f 100%)',
        top: 64,
        zIndex: 97,
      }}
    >
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Toolbar sx={{ justifyContent: 'space-between', gap: { xs: 1, md: 2 }, flexWrap: 'wrap' }}>
          {/* Main Menu Button */}
          <Button
            onClick={handleMenuOpen}
            sx={{
              background: '#f9a825',
              color: 'white',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              padding: { xs: '8px 12px', sm: '10px 16px', md: '10px 20px' },
              borderRadius: 0,
              '&:hover': {
                background: '#f39c12',
              },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            GIỚI THIỆU
          </Button>

          {/* Home button */}
          <Button
            onClick={() => handleNavigate('home')}
            sx={{
              color: 'white',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              padding: { xs: '8px 12px', sm: '8px 16px', md: '8px 18px' },
              borderRadius: 0,
              '&:hover': { background: 'rgba(255,255,255,0.08)' },
              display: { xs: 'none', sm: 'inline-flex' },
            }}
          >
            TRANG CHỦ
          </Button>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                minWidth: '200px',
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                selected={currentPage === item.page}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* Menu Items */}
          <Stack direction="row" spacing={0} sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }}>
            {['NGÀNH NGHỀ', 'SẢN PHẨM', 'DỊCH VỤ', 'TÀI LIỆU', 'TIN TỨC'].map((label, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  const pageMap = {
                    'NGÀNH NGHỀ': 'introduction',
                    'SẢN PHẨM': 'products',
                    'DỊCH VỤ': 'services',
                    'TÀI LIỆU': 'documents',
                    'TIN TỨC': 'news',
                  };
                  handleNavigate(pageMap[label]);
                }}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: { xs: '12px', sm: '13px', md: '15px' },
                  padding: { xs: '8px 12px', sm: '8px 16px', md: '10px 20px' },
                  borderRadius: 0,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                  borderBottom: currentPage === label.toLowerCase() ? '3px solid white' : 'none',
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>

          {/* Contact Button */}
          <Button
            onClick={() => handleNavigate('contact')}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: { xs: '12px', sm: '14px', md: '15px' },
              padding: { xs: '8px 12px', sm: '10px 16px', md: '10px 20px' },
              borderRadius: 1,
              border: '2px solid white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            LIÊN HỆ
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
