import { useState } from 'react';
import {
  Box, Container, AppBar, Toolbar, Button, MenuItem, Menu,
  Stack, InputBase, useMediaQuery, useTheme, IconButton, Drawer,
  List, ListItemButton, ListItemText, Divider, Collapse, Badge, Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faSearch, faCartShopping, faPhone,
  faHouse, faCircleInfo, faBoxOpen, faScrewdriverWrench,
  faEnvelope, faChevronDown, faChevronUp, faAngleRight, faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

const NAV_ITEMS = [
  { label: 'Trang Chủ',  page: 'home',         icon: faHouse },
  { label: 'Giới Thiệu', page: 'introduction',  icon: faCircleInfo },
  { label: 'Sản Phẩm',   page: 'products',      icon: faBoxOpen, hasDropdown: true },
  { label: 'Sửa Chữa',   page: 'services',      icon: faScrewdriverWrench },
  { label: 'Liên Hệ',    page: 'contact',       icon: faEnvelope },
];

export default function Navigation({ onNavigate, onSearch, searchTerm, currentPage, onOpenCart }) {
  const [anchor, setAnchor]         = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodsOpen, setProdsOpen]   = useState(false);
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { totalCount } = useCart();
  const { siteData }   = useAdmin();
  const { categories } = siteData;

  const isActive = (page) => currentPage === page;

  return (
    <AppBar component="nav" position="static" elevation={0}
      sx={{ background: T.gradient, boxShadow: `0 4px 20px ${T.brand}38` }}>
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{ minHeight: { xs: 50, md: 56 }, px: { xs: 1.5, md: 2.5 }, gap: 1 }}>

          {/* Hamburger (mobile) */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} aria-label="Mở menu"
              sx={{ p: 1, mr: 0.5 }}>
              <FontAwesomeIcon icon={faBars} style={{ fontSize: 19 }} />
            </IconButton>
          )}

          {/* Desktop links */}
          {!isMobile && (
            <Stack direction="row" sx={{ flex: 1, gap: 0.4 }}>
              {NAV_ITEMS.map((item) => item.hasDropdown ? (
                <Box key={item.label}>
                  <Button
                    onClick={(e) => setAnchor(e.currentTarget)}
                    endIcon={<FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 10 }} />}
                    sx={navBtnSx(isActive(item.page))}>
                    <FontAwesomeIcon icon={item.icon} style={{ fontSize: 13, marginRight: 7 }} />
                    {item.label}
                  </Button>
                  <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
                    PaperProps={{ sx: { mt: 1, minWidth: 220, borderRadius: 2.5, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,.16)' } }}>
                    <MenuItem dense onClick={() => { onNavigate('products'); setAnchor(null); }}
                      sx={{ fontWeight: 700, fontSize: 13.5, py: 1.2, color: T.brand }}>
                      <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: 10, fontSize: 13 }} />
                      Tất Cả Sản Phẩm
                    </MenuItem>
                    <Divider />
                    {categories.map((c) => (
                      <MenuItem dense key={c.id} onClick={() => { onNavigate('products'); setAnchor(null); }}
                        sx={{ fontSize: 13, py: 1 }}>
                        <span style={{ marginRight: 10, fontSize: 15 }}>{c.icon}</span>{c.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button key={item.label} onClick={() => onNavigate(item.page)} sx={navBtnSx(isActive(item.page))}>
                  <FontAwesomeIcon icon={item.icon} style={{ fontSize: 13, marginRight: 7 }} />
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          {isMobile && <Box sx={{ flex: 1 }} />}

          {/* Hotline (desktop) + Cart */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {!isMobile && (
              <Stack direction="row" alignItems="center" spacing={1}
                sx={{ background: 'rgba(255,255,255,.14)', borderRadius: 2.5, px: 1.5, py: 0.6, border: '1px solid rgba(255,255,255,.2)' }}>
                <FontAwesomeIcon icon={faTruckFast} style={{ fontSize: 14, color: '#fff' }} />
                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#fff' }}>
                  Miễn phí giao hàng nội thành
                </Typography>
              </Stack>
            )}

            <IconButton onClick={onOpenCart} aria-label={`Giỏ hàng ${totalCount}`}
              sx={{ color: '#fff', p: 1, '&:hover': { background: 'rgba(255,255,255,.15)' } }}>
              <Badge badgeContent={totalCount}
                sx={{ '& .MuiBadge-badge': { background: '#fff', color: T.brand, fontSize: 10, minWidth: 16, height: 16, p: 0, fontWeight: 800 } }}>
                <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 19 }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 288, borderRadius: '0 20px 20px 0' } }}>
        <Box sx={{ background: T.gradient, p: 2.5, color: '#fff' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 16, lineHeight: 1 }}>BÁCH KHOA</Typography>
              <Typography sx={{ fontSize: 11, opacity: .85, mt: 0.4 }}>Cân điện tử chính hãng</Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fff', p: 0.5 }}>
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Box>

        <List disablePadding sx={{ pt: 1, flex: 1 }}>
          {NAV_ITEMS.map((item) => item.hasDropdown ? (
            <Box key={item.label}>
              <ListItemButton onClick={() => setProdsOpen(!prodsOpen)} sx={{ py: 1.3, px: 2.5 }}>
                <Box sx={drawerIconSx(isActive(item.page))}>
                  <FontAwesomeIcon icon={item.icon} style={{ fontSize: 14 }} />
                </Box>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                <FontAwesomeIcon icon={prodsOpen ? faChevronUp : faChevronDown} style={{ fontSize: 11, color: '#999' }} />
              </ListItemButton>
              <Collapse in={prodsOpen}>
                <List disablePadding sx={{ background: T.bg }}>
                  {[{ id: 0, name: 'Tất Cả Sản Phẩm', icon: '📦' }, ...categories].map((c) => (
                    <ListItemButton key={c.id} sx={{ pl: 6, py: 0.9 }}
                      onClick={() => { onNavigate('products'); setMobileOpen(false); }}>
                      <span style={{ marginRight: 10, fontSize: 14 }}>{c.icon}</span>
                      <ListItemText primary={c.name} primaryTypographyProps={{ fontSize: 13 }} />
                      <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 11, color: '#ccc' }} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton key={item.label} selected={isActive(item.page)}
              onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
              sx={{ py: 1.3, px: 2.5, '&.Mui-selected': { background: T.gradientSoft } }}>
              <Box sx={drawerIconSx(isActive(item.page))}>
                <FontAwesomeIcon icon={item.icon} style={{ fontSize: 14 }} />
              </Box>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ p: 2 }}>
          <Button fullWidth variant="contained" component="a" href="tel:0913331916"
            startIcon={<FontAwesomeIcon icon={faPhone} />}
            sx={{ background: T.gradient, fontWeight: 800, py: 1.2, borderRadius: 2.5 }}>
            Gọi 0913 331 916
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}

const navBtnSx = (active) => ({
  color: '#fff', fontWeight: active ? 700 : 500, fontSize: 14,
  px: 1.6, py: 1, borderRadius: 2.5, position: 'relative',
  background: active ? 'rgba(255,255,255,.16)' : 'transparent',
  '&:hover': { background: 'rgba(255,255,255,.12)' },
});
const searchBoxSx = (w) => ({
  display: 'flex', alignItems: 'center', gap: 1,
  background: 'rgba(255,255,255,.16)', borderRadius: 2.5,
  px: 1.5, py: 0.5, width: w,
  border: '1px solid rgba(255,255,255,.22)',
  '&:focus-within': { background: 'rgba(255,255,255,.24)' },
  transition: 'all .2s',
});
const searchInputSx = { color: '#fff', fontSize: 13, flex: 1, '& input::placeholder': { color: 'rgba(255,255,255,.6)' } };
const drawerIconSx = (active) => ({
  width: 32, height: 32, borderRadius: 2, mr: 1.5, flexShrink: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: active ? T.gradient : T.gradientSoft,
  color: active ? '#fff' : T.brand,
});
