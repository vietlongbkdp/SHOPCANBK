import { useState } from 'react';
import {
  Box, Container, AppBar, Toolbar, Button, MenuItem, Menu,
  Stack, InputBase, useMediaQuery, useTheme, IconButton, Drawer,
  List, ListItemButton, ListItemText, Divider, Collapse, Badge, Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faSearch, faCartShopping, faPhone,
  faHouse, faInfoCircle, faBoxOpen, faScrewdriverWrench,
  faEnvelope, faChevronDown, faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const NAV_ITEMS = [
  { label: 'Trang Chủ',  page: 'home',         icon: faHouse },
  { label: 'Giới Thiệu', page: 'introduction',  icon: faInfoCircle },
  { label: 'Sản Phẩm',   page: 'products',      icon: faBoxOpen, hasDropdown: true },
  { label: 'Sửa Chữa',   page: 'services',      icon: faScrewdriverWrench },
  { label: 'Liên Hệ',    page: 'contact',       icon: faEnvelope },
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

  const isActive = (page) => currentPage === page;

  return (
    <AppBar component="nav" position="static"
      sx={{
        background: 'linear-gradient(135deg,#1b5e20 0%,#2e7d32 100%)',
        boxShadow: '0 3px 12px rgba(27,94,32,.4)',
      }}>
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{ minHeight: { xs: 48, md: 54 }, px: { xs: 1.5, md: 2.5 }, gap: 1 }}>

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} aria-label="Menu"
              sx={{ p: 1, mr: 0.5 }}>
              <FontAwesomeIcon icon={faBars} style={{ fontSize: 20 }} />
            </IconButton>
          )}

          {/* Desktop nav links */}
          {!isMobile && (
            <Stack direction="row" sx={{ flex: 1, gap: 0.5 }}>
              {NAV_ITEMS.map((item) => (
                item.hasDropdown ? (
                  <Box key={item.label}>
                    <Button
                      endIcon={<FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 11 }} />}
                      onClick={(e) => setAnchor(e.currentTarget)}
                      sx={{
                        color: '#fff', fontWeight: isActive(item.page) ? 700 : 500,
                        fontSize: 14, px: 1.8, py: 1,
                        borderRadius: 1.5,
                        borderBottom: isActive(item.page) ? '2px solid #ffeb3b' : '2px solid transparent',
                        background: isActive(item.page) ? 'rgba(255,255,255,.12)' : 'transparent',
                        '&:hover': { background: 'rgba(255,255,255,.14)' },
                      }}>
                      <FontAwesomeIcon icon={item.icon} style={{ fontSize: 13, marginRight: 6 }} />
                      {item.label}
                    </Button>
                    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
                      PaperProps={{ sx: { mt: 0.5, minWidth: 210, borderRadius: 2, boxShadow: 3 } }}>
                      <MenuItem dense onClick={() => { onNavigate('products'); setAnchor(null); }}
                        sx={{ fontWeight: 700, fontSize: 13.5 }}>
                        <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: 10, color: '#c62828', fontSize: 14 }} />
                        Tất Cả Sản Phẩm
                      </MenuItem>
                      <Divider />
                      {categories.map((c) => (
                        <MenuItem dense key={c.id} onClick={() => { onNavigate('products'); setAnchor(null); }}
                          sx={{ fontSize: 13 }}>
                          <span style={{ marginRight: 10, fontSize: 15 }}>{c.icon}</span>{c.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button key={item.label} onClick={() => onNavigate(item.page)}
                    sx={{
                      color: '#fff', fontWeight: isActive(item.page) ? 700 : 500,
                      fontSize: 14, px: 1.8, py: 1, borderRadius: 1.5,
                      borderBottom: isActive(item.page) ? '2px solid #ffeb3b' : '2px solid transparent',
                      background: isActive(item.page) ? 'rgba(255,255,255,.12)' : 'transparent',
                      '&:hover': { background: 'rgba(255,255,255,.14)' },
                    }}>
                    <FontAwesomeIcon icon={item.icon} style={{ fontSize: 13, marginRight: 6 }} />
                    {item.label}
                  </Button>
                )
              ))}
            </Stack>
          )}

          {isMobile && <Box sx={{ flex: 1 }} />}

          {/* Search + Cart */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {isMobile ? (
              <>
                {searchOpen ? (
                  <Box sx={{
                    display: 'flex', alignItems: 'center',
                    background: 'rgba(255,255,255,.18)', borderRadius: 2,
                    px: 1.5, py: 0.4, width: 180,
                    border: '1px solid rgba(255,255,255,.3)',
                  }}>
                    <InputBase autoFocus placeholder="Tìm kiếm..." value={searchTerm}
                      onChange={(e) => onSearch(e.target.value)}
                      sx={{ color: '#fff', fontSize: 13, flex: 1, '& input::placeholder': { color: 'rgba(255,255,255,.6)' } }} />
                    <FontAwesomeIcon icon={faXmark} style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, cursor: 'pointer' }}
                      onClick={() => { setSearchOpen(false); onSearch(''); }} />
                  </Box>
                ) : (
                  <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#fff', p: 1 }}>
                    <FontAwesomeIcon icon={faSearch} style={{ fontSize: 18 }} />
                  </IconButton>
                )}
              </>
            ) : (
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                background: 'rgba(255,255,255,.15)', borderRadius: 2,
                px: 1.5, py: 0.5, width: 230,
                border: '1px solid rgba(255,255,255,.25)',
                '&:focus-within': { background: 'rgba(255,255,255,.22)', borderColor: 'rgba(255,255,255,.5)' },
                transition: 'all .2s',
              }}>
                <FontAwesomeIcon icon={faSearch} style={{ color: 'rgba(255,255,255,.6)', fontSize: 14 }} />
                <InputBase placeholder="Tìm kiếm sản phẩm..." value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  inputProps={{ 'aria-label': 'Tìm kiếm' }}
                  sx={{ color: '#fff', fontSize: 13, flex: 1, '& input::placeholder': { color: 'rgba(255,255,255,.55)' } }} />
              </Box>
            )}

            <IconButton onClick={onOpenCart} aria-label={`Giỏ hàng ${totalCount}`}
              sx={{
                color: '#fff', p: 1, position: 'relative',
                '&:hover': { background: 'rgba(255,255,255,.15)' },
              }}>
              <Badge badgeContent={totalCount} color="error"
                sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16, p: 0, fontWeight: 700 } }}>
                <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280, borderRadius: '0 16px 16px 0' } }}>
        {/* Drawer header */}
        <Box sx={{ background: 'linear-gradient(135deg,#1b5e20,#2e7d32)', p: 2, color: '#fff' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 700, fontSize: 15 }}>🌿 MENU</Typography>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fff', p: 0.5 }}>
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Box>

        <List disablePadding sx={{ pt: 1 }}>
          {NAV_ITEMS.map((item) => item.hasDropdown ? (
            <Box key={item.label}>
              <ListItemButton onClick={() => setProdsOpen(!prodsOpen)} sx={{ py: 1.2, px: 2 }}>
                <FontAwesomeIcon icon={item.icon} style={{ fontSize: 15, marginRight: 12, color: '#2e7d32' }} />
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                <FontAwesomeIcon icon={prodsOpen ? faChevronUp : faChevronDown} style={{ fontSize: 12, color: '#888' }} />
              </ListItemButton>
              <Collapse in={prodsOpen}>
                <List disablePadding>
                  {[{ id: 0, name: 'Tất Cả Sản Phẩm', icon: '📦' }, ...categories].map((c) => (
                    <ListItemButton key={c.id} sx={{ pl: 5, py: 0.9 }}
                      onClick={() => { onNavigate('products'); setMobileOpen(false); }}>
                      <span style={{ marginRight: 8, fontSize: 14 }}>{c.icon}</span>
                      <ListItemText primary={c.name} primaryTypographyProps={{ fontSize: 13 }} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton key={item.label} selected={isActive(item.page)}
              onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
              sx={{
                py: 1.2, px: 2,
                '&.Mui-selected': { background: '#e8f5e9', borderLeft: '3px solid #2e7d32' },
              }}>
              <FontAwesomeIcon icon={item.icon} style={{ fontSize: 15, marginRight: 12, color: '#2e7d32' }} />
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ px: 2, pb: 2 }}>
          <Button fullWidth variant="contained" component="a" href="tel:0913331916"
            startIcon={<FontAwesomeIcon icon={faPhone} />}
            sx={{ background: 'linear-gradient(135deg,#c62828,#e53935)', fontWeight: 700, borderRadius: 2 }}>
            0913 331 916
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
