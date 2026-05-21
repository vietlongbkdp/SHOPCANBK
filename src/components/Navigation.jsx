import { useState } from 'react';
import {
  Box, Container, AppBar, Toolbar, Button, MenuItem, Menu,
  Stack, InputBase, useMediaQuery, useTheme, IconButton, Drawer,
  List, ListItemButton, ListItemText, Divider, Collapse, Badge, Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const NAV_ITEMS = [
  { label: 'Trang Chủ',   page: 'home' },
  { label: 'Giới Thiệu',  page: 'introduction' },
  { label: 'Sản Phẩm',    page: 'products', hasDropdown: true },
  { label: 'Sửa Chữa',    page: 'services' },
  { label: 'Liên Hệ',     page: 'contact' },
];

export default function Navigation({ onNavigate, onSearch, searchTerm, currentPage, onOpenCart }) {
  const [productsAnchor, setProductsAnchor] = useState(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileProdsOpen, setMobileProds]   = useState(false);
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { totalCount } = useCart();
  const { siteData }   = useAdmin();
  const { categories } = siteData;

  const close = () => setMobileOpen(false);

  const activeStyle = { borderBottom: '3px solid #ffeb3b' };
  const btnSx = (page) => ({
    color: 'white', fontWeight: 600, fontSize: 14,
    px: { md: 1.5, lg: 2 }, py: 1.5, borderRadius: 0, minWidth: 0,
    borderBottom: currentPage === page ? '3px solid #ffeb3b' : '3px solid transparent',
    '&:hover': { background: 'rgba(255,255,255,0.13)' },
    transition: 'background .15s',
  });

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg,#1b5e20,#2e7d32)',
        boxShadow: '0 2px 8px rgba(0,0,0,.25)',
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ minHeight: { xs: 48, md: 52 }, px: { xs: 1.5, md: 2 } }}>

          {/* Mobile: hamburger */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} aria-label="Mở menu" sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop nav links */}
          {!isMobile && (
            <Stack direction="row" sx={{ flex: 1 }}>
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <Box key={item.label}>
                    <Button
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => setProductsAnchor(e.currentTarget)}
                      sx={btnSx(item.page)}
                    >
                      {item.label}
                    </Button>
                    <Menu
                      anchorEl={productsAnchor}
                      open={Boolean(productsAnchor)}
                      onClose={() => setProductsAnchor(null)}
                      PaperProps={{ sx: { minWidth: 200, mt: 0.5 } }}
                    >
                      <MenuItem dense onClick={() => { onNavigate('products'); setProductsAnchor(null); }}>
                        <strong>Tất Cả Sản Phẩm</strong>
                      </MenuItem>
                      <Divider />
                      {categories.map((c) => (
                        <MenuItem dense key={c.id} onClick={() => { onNavigate('products'); setProductsAnchor(null); }}>
                          {c.icon} &nbsp;{c.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button key={item.label} onClick={() => onNavigate(item.page)} sx={btnSx(item.page)}>
                    {item.label}
                  </Button>
                )
              )}
            </Stack>
          )}

          {isMobile && <Box sx={{ flex: 1 }} />}

          {/* Search + Cart */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Box
              component="label"
              htmlFor="nav-search"
              sx={{
                display: 'flex', alignItems: 'center',
                background: 'rgba(255,255,255,.15)', borderRadius: 1,
                px: 1.5, py: 0.35,
                border: '1px solid rgba(255,255,255,.3)',
                width: { xs: 120, sm: 170, md: 205 },
                '&:focus-within': { background: 'rgba(255,255,255,.22)' },
                cursor: 'text',
              }}
            >
              <InputBase
                id="nav-search"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                inputProps={{ 'aria-label': 'Tìm kiếm sản phẩm' }}
                sx={{
                  color: 'white', fontSize: 13, flex: 1,
                  '& input::placeholder': { color: 'rgba(255,255,255,.65)' },
                }}
              />
              <SearchIcon sx={{ color: 'rgba(255,255,255,.75)', fontSize: 17, flexShrink: 0 }} />
            </Box>

            <IconButton onClick={onOpenCart} aria-label={`Giỏ hàng (${totalCount})`} sx={{ color: 'white' }}>
              <Badge
                badgeContent={totalCount}
                color="error"
                sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16, p: 0 } }}
              >
                <ShoppingCartIcon sx={{ fontSize: 22 }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={close}
        PaperProps={{ sx: { width: 270 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} py={1.2}>
          <Typography fontWeight={700} color="#c62828" fontSize={15}>MENU</Typography>
          <IconButton onClick={close} aria-label="Đóng menu"><CloseIcon /></IconButton>
        </Stack>
        <Divider />
        <List disablePadding>
          {NAV_ITEMS.map((item) =>
            item.hasDropdown ? (
              <Box key={item.label}>
                <ListItemButton onClick={() => setMobileProds(!mobileProdsOpen)} sx={{ py: 1.2 }}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                  <ExpandMoreIcon sx={{ transform: mobileProdsOpen ? 'rotate(180deg)' : 'none', transition: '.2s', fontSize: 20 }} />
                </ListItemButton>
                <Collapse in={mobileProdsOpen}>
                  <List disablePadding dense>
                    <ListItemButton sx={{ pl: 3.5 }} onClick={() => { onNavigate('products'); close(); }}>
                      <ListItemText primary="Tất Cả Sản Phẩm" primaryTypographyProps={{ fontWeight: 600, fontSize: 13 }} />
                    </ListItemButton>
                    {categories.map((c) => (
                      <ListItemButton key={c.id} sx={{ pl: 3.5 }} onClick={() => { onNavigate('products'); close(); }}>
                        <ListItemText primary={`${c.icon} ${c.name}`} primaryTypographyProps={{ fontSize: 13 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItemButton
                key={item.label}
                selected={currentPage === item.page}
                onClick={() => { onNavigate(item.page); close(); }}
                sx={{ py: 1.2, '&.Mui-selected': { background: '#fff5f5', borderLeft: '3px solid #c62828' } }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
              </ListItemButton>
            )
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}
