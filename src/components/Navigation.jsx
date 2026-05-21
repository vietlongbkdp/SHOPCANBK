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
  const [anchor, setAnchor]         = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodsOpen, setProdsOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { totalCount } = useCart();
  const { siteData }   = useAdmin();
  const { categories } = siteData;

  const close = () => setMobileOpen(false);

  return (
    <AppBar component="nav" position="sticky" sx={{
      background: 'linear-gradient(90deg,#1b5e20,#2e7d32)',
      boxShadow: '0 2px 8px rgba(0,0,0,.25)',
    }}>
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ minHeight: { xs: 46, md: 52 }, px: { xs: 1, md: 2 }, gap: 0.5 }}>

          {/* Mobile: hamburger */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} aria-label="Mở menu" sx={{ p: 0.8 }}>
              <MenuIcon sx={{ fontSize: 22 }} />
            </IconButton>
          )}

          {/* Desktop nav */}
          {!isMobile && (
            <Stack direction="row" sx={{ flex: 1 }}>
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <Box key={item.label}>
                    <Button
                      endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
                      onClick={(e) => setAnchor(e.currentTarget)}
                      sx={{
                        color: '#fff', fontWeight: 600, fontSize: 13.5,
                        px: 1.8, py: 1.5, borderRadius: 0,
                        borderBottom: currentPage === item.page ? '3px solid #ffeb3b' : '3px solid transparent',
                        '&:hover': { background: 'rgba(255,255,255,.13)' },
                      }}
                    >
                      {item.label}
                    </Button>
                    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
                      PaperProps={{ sx: { minWidth: 200, mt: 0.5 } }}>
                      <MenuItem dense onClick={() => { onNavigate('products'); setAnchor(null); }}>
                        <strong>Tất Cả Sản Phẩm</strong>
                      </MenuItem>
                      <Divider />
                      {categories.map((c) => (
                        <MenuItem dense key={c.id} onClick={() => { onNavigate('products'); setAnchor(null); }}>
                          {c.icon}&nbsp;{c.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button key={item.label} onClick={() => onNavigate(item.page)} sx={{
                    color: '#fff', fontWeight: 600, fontSize: 13.5,
                    px: 1.8, py: 1.5, borderRadius: 0,
                    borderBottom: currentPage === item.page ? '3px solid #ffeb3b' : '3px solid transparent',
                    '&:hover': { background: 'rgba(255,255,255,.13)' },
                  }}>
                    {item.label}
                  </Button>
                )
              )}
            </Stack>
          )}

          <Box sx={{ flex: isMobile ? 1 : 0 }} />

          {/* Right: search + cart */}
          <Stack direction="row" alignItems="center" spacing={0.3}>

            {/* Mobile: expandable search */}
            {isMobile ? (
              <>
                {searchOpen ? (
                  <Box sx={{
                    display: 'flex', alignItems: 'center',
                    background: 'rgba(255,255,255,.18)', borderRadius: 1,
                    px: 1.2, py: 0.3, width: 160,
                    border: '1px solid rgba(255,255,255,.35)',
                  }}>
                    <InputBase
                      autoFocus
                      placeholder="Tìm kiếm..."
                      value={searchTerm}
                      onChange={(e) => onSearch(e.target.value)}
                      sx={{ color: '#fff', fontSize: 13, flex: 1, '& input::placeholder': { color: 'rgba(255,255,255,.65)' } }}
                    />
                    <CloseIcon
                      sx={{ color: 'rgba(255,255,255,.7)', fontSize: 16, cursor: 'pointer' }}
                      onClick={() => { setSearchOpen(false); onSearch(''); }}
                    />
                  </Box>
                ) : (
                  <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#fff', p: 0.8 }}>
                    <SearchIcon sx={{ fontSize: 21 }} />
                  </IconButton>
                )}
              </>
            ) : (
              /* Desktop search */
              <Box component="label" htmlFor="nav-search" sx={{
                display: 'flex', alignItems: 'center',
                background: 'rgba(255,255,255,.15)', borderRadius: 1,
                px: 1.5, py: 0.35, width: 210,
                border: '1px solid rgba(255,255,255,.3)',
                cursor: 'text',
                '&:focus-within': { background: 'rgba(255,255,255,.22)' },
              }}>
                <InputBase
                  id="nav-search"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  inputProps={{ 'aria-label': 'Tìm kiếm' }}
                  sx={{ color: '#fff', fontSize: 13, flex: 1, '& input::placeholder': { color: 'rgba(255,255,255,.6)' } }}
                />
                <SearchIcon sx={{ color: 'rgba(255,255,255,.7)', fontSize: 17 }} />
              </Box>
            )}

            {/* Cart */}
            <IconButton onClick={onOpenCart} aria-label={`Giỏ hàng ${totalCount} sản phẩm`}
              sx={{ color: '#fff', p: 0.8 }}>
              <Badge badgeContent={totalCount} color="error"
                sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 15, height: 15, p: 0 } }}>
                <ShoppingCartIcon sx={{ fontSize: { xs: 21, md: 22 } }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={close}
        PaperProps={{ sx: { width: 265 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} py={1.2}>
          <Typography fontWeight={700} color="#c62828" fontSize={14}>MENU</Typography>
          <IconButton onClick={close} size="small"><CloseIcon /></IconButton>
        </Stack>
        <Divider />
        <List disablePadding>
          {NAV_ITEMS.map((item) =>
            item.hasDropdown ? (
              <Box key={item.label}>
                <ListItemButton onClick={() => setProdsOpen(!prodsOpen)} sx={{ py: 1.1 }}>
                  <ListItemText primary={item.label}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: 13.5 }} />
                  <ExpandMoreIcon sx={{
                    transform: prodsOpen ? 'rotate(180deg)' : 'none',
                    transition: '.2s', fontSize: 19,
                  }} />
                </ListItemButton>
                <Collapse in={prodsOpen}>
                  <List disablePadding dense>
                    <ListItemButton sx={{ pl: 3.5 }} onClick={() => { onNavigate('products'); close(); }}>
                      <ListItemText primary="Tất Cả Sản Phẩm"
                        primaryTypographyProps={{ fontWeight: 600, fontSize: 13 }} />
                    </ListItemButton>
                    {categories.map((c) => (
                      <ListItemButton key={c.id} sx={{ pl: 3.5 }}
                        onClick={() => { onNavigate('products'); close(); }}>
                        <ListItemText primary={`${c.icon} ${c.name}`}
                          primaryTypographyProps={{ fontSize: 13 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItemButton key={item.label} selected={currentPage === item.page}
                onClick={() => { onNavigate(item.page); close(); }}
                sx={{
                  py: 1.1,
                  '&.Mui-selected': { background: '#fff5f5', borderLeft: '3px solid #c62828' },
                }}>
                <ListItemText primary={item.label}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: 13.5 }} />
              </ListItemButton>
            )
          )}
        </List>

        <Divider sx={{ mt: 'auto' }} />
        <Box sx={{ p: 2 }}>
          <Button fullWidth variant="contained"
            href="tel:0913331916" component="a"
            startIcon={<span>📞</span>}
            sx={{ background: '#c62828', fontWeight: 700, '&:hover': { background: '#8e0000' } }}>
            0913 331 916
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
