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
  { label: 'Trang Chủ',  page: 'home' },
  { label: 'Giới Thiệu', page: 'introduction' },
  { label: 'Sản Phẩm',   page: 'products', hasDropdown: true },
  { label: 'Sửa Chữa',   page: 'services' },
  { label: 'Liên Hệ',    page: 'contact' },
];

export default function Navigation({ onNavigate, onSearch, searchTerm, currentPage, onOpenCart }) {
  const [productsAnchor, setProductsAnchor] = useState(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileProdsOpen, setMobileProds]   = useState(false);
  const [searchOpen, setSearchOpen]         = useState(false);
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isXs     = useMediaQuery(theme.breakpoints.down('sm'));
  const { totalCount } = useCart();
  const { siteData }   = useAdmin();

  const close = () => setMobileOpen(false);

  const btnSx = (page) => ({
    color: '#fff', fontWeight: 600, fontSize: { md: 13, lg: 14 },
    px: { md: 1.2, lg: 1.8 }, py: 1.5, borderRadius: 0, minWidth: 0,
    borderBottom: currentPage === page ? '3px solid #ffeb3b' : '3px solid transparent',
    '&:hover': { background: 'rgba(255,255,255,.13)' },
  });

  return (
    <AppBar component="nav" position="sticky"
      sx={{ background: 'linear-gradient(90deg,#1b5e20,#2e7d32)', boxShadow: '0 2px 8px rgba(0,0,0,.25)' }}>
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ minHeight: { xs: 46, md: 52 }, px: { xs: 1, md: 2 }, gap: 0.5 }}>

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} aria-label="Mở menu" sx={{ mr: 0.5 }}>
              <MenuIcon sx={{ fontSize: 22 }} />
            </IconButton>
          )}

          {/* Desktop nav */}
          {!isMobile && (
            <Stack direction="row" sx={{ flex: 1 }}>
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <Box key={item.label}>
                    <Button endIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => setProductsAnchor(e.currentTarget)} sx={btnSx(item.page)}>
                      {item.label}
                    </Button>
                    <Menu anchorEl={productsAnchor} open={Boolean(productsAnchor)}
                      onClose={() => setProductsAnchor(null)}
                      PaperProps={{ sx: { minWidth: 200, mt: 0.5 } }}>
                      <MenuItem dense onClick={() => { onNavigate('products'); setProductsAnchor(null); }}>
                        <strong>Tất Cả Sản Phẩm</strong>
                      </MenuItem>
                      <Divider />
                      {siteData.categories.map((c) => (
                        <MenuItem dense key={c.id} onClick={() => { onNavigate('products'); setProductsAnchor(null); }}>
                          {c.icon}&nbsp;{c.name}
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

          {/* Mobile: logo text center */}
          {isMobile && (
            <Typography
              onClick={() => { onNavigate('home'); close(); }}
              sx={{ flex: 1, fontWeight: 800, fontSize: 13, color: '#fff', cursor: 'pointer', letterSpacing: 0.3, textAlign: 'center' }}
            >
              CÂN ĐIỆN TỬ BÁCH KHOA
            </Typography>
          )}

          {/* Right: search + cart */}
          <Stack direction="row" alignItems="center" spacing={0.3}>
            {/* Search — expandable on mobile */}
            {!isXs ? (
              <Box component="label" htmlFor="nav-search" sx={{
                display: 'flex', alignItems: 'center',
                background: 'rgba(255,255,255,.15)', borderRadius: 1,
                px: 1.2, py: 0.3, border: '1px solid rgba(255,255,255,.25)',
                width: { sm: 150, md: 200 },
                '&:focus-within': { background: 'rgba(255,255,255,.22)' }, cursor: 'text',
              }}>
                <InputBase id="nav-search" placeholder="Tìm kiếm..." value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  sx={{ color: '#fff', fontSize: 12.5, flex: 1, '& input::placeholder': { color: 'rgba(255,255,255,.65)' } }} />
                <SearchIcon sx={{ color: 'rgba(255,255,255,.7)', fontSize: 16, flexShrink: 0 }} />
              </Box>
            ) : (
              <>
                {searchOpen && (
                  <Box sx={{
                    position: 'absolute', top: 46, left: 0, right: 0,
                    background: '#1b5e20', px: 1.5, py: 1, zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 1,
                    boxShadow: '0 4px 8px rgba(0,0,0,.2)',
                  }}>
                    <InputBase placeholder="Tìm kiếm sản phẩm..." value={searchTerm}
                      onChange={(e) => onSearch(e.target.value)} autoFocus
                      sx={{
                        flex: 1, color: '#fff', fontSize: 14,
                        background: 'rgba(255,255,255,.15)', borderRadius: 1,
                        px: 1.5, py: 0.5, border: '1px solid rgba(255,255,255,.3)',
                        '& input::placeholder': { color: 'rgba(255,255,255,.7)' },
                      }} />
                    <IconButton size="small" onClick={() => setSearchOpen(false)} sx={{ color: '#fff' }}>
                      <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                )}
                <IconButton onClick={() => setSearchOpen(!searchOpen)} sx={{ color: '#fff', p: 0.8 }} aria-label="Tìm kiếm">
                  <SearchIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </>
            )}

            {/* Cart */}
            <IconButton onClick={onOpenCart} aria-label={`Giỏ hàng (${totalCount})`} sx={{ color: '#fff', p: 0.8 }}>
              <Badge badgeContent={totalCount} color="error"
                sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 15, height: 15, p: 0 } }}>
                <ShoppingCartIcon sx={{ fontSize: { xs: 20, md: 22 } }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={close} PaperProps={{ sx: { width: 270 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} py={1.2}
          sx={{ background: 'linear-gradient(135deg,#c62828,#e65100)', color: '#fff' }}>
          <Typography fontWeight={800} fontSize={14}>⚖️ BÁCH KHOA</Typography>
          <IconButton onClick={close} size="small" sx={{ color: '#fff' }}><CloseIcon /></IconButton>
        </Stack>
        <List disablePadding>
          {NAV_ITEMS.map((item) =>
            item.hasDropdown ? (
              <Box key={item.label}>
                <ListItemButton onClick={() => setMobileProds(!mobileProdsOpen)} sx={{ py: 1.3 }}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                  <ExpandMoreIcon sx={{ transform: mobileProdsOpen ? 'rotate(180deg)' : 'none', transition: '.2s', fontSize: 18, color: '#888' }} />
                </ListItemButton>
                <Collapse in={mobileProdsOpen}>
                  <List disablePadding dense>
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { onNavigate('products'); close(); }}>
                      <ListItemText primary="Tất Cả Sản Phẩm" primaryTypographyProps={{ fontWeight: 600, fontSize: 13 }} />
                    </ListItemButton>
                    {siteData.categories.map((c) => (
                      <ListItemButton key={c.id} sx={{ pl: 3 }} onClick={() => { onNavigate('products'); close(); }}>
                        <ListItemText primary={`${c.icon} ${c.name}`} primaryTypographyProps={{ fontSize: 13 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItemButton key={item.label} selected={currentPage === item.page}
                onClick={() => { onNavigate(item.page); close(); }}
                sx={{ py: 1.3, '&.Mui-selected': { background: '#fff5f5', borderLeft: '3px solid #c62828' } }}>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
              </ListItemButton>
            )
          )}
          <Divider />
          <ListItemButton onClick={() => { window.location.href = 'tel:0913331916'; }}
            sx={{ py: 1.2, background: '#fff5f5' }}>
            <ListItemText primary="📞 0913 331 916 (Huế)" primaryTypographyProps={{ fontWeight: 700, fontSize: 13, color: '#c62828' }} />
          </ListItemButton>
          <ListItemButton onClick={() => { window.location.href = 'tel:0938561544'; }}
            sx={{ py: 1.2 }}>
            <ListItemText primary="📞 0938 561 544 (Đà Nẵng)" primaryTypographyProps={{ fontWeight: 700, fontSize: 13, color: '#1565c0' }} />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}
