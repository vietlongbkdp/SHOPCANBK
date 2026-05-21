import { useState } from 'react';
import {
  Box, Container, AppBar, Toolbar, Button, MenuItem, Menu,
  Stack, InputBase, useMediaQuery, useTheme, IconButton, Drawer,
  List, ListItem, ListItemText, Divider, Collapse,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from '../data.json';

const navItems = [
  { label: 'Trang Chủ', page: 'home' },
  { label: 'Giới Thiệu', page: 'introduction' },
  {
    label: 'Sản Phẩm', page: 'products',
    children: data.categories.map(c => ({ label: c.name, page: 'products' })),
  },
  { label: 'Sửa Chữa', page: 'services' },
  { label: 'Liên Hệ', page: 'contact' },
];

export default function Navigation({ onNavigate, onSearch, searchTerm, currentPage }) {
  const [productsAnchor, setProductsAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navBg = 'linear-gradient(90deg, #1b5e20 0%, #2e7d32 100%)';

  return (
    <AppBar position="sticky" sx={{ background: navBg, top: 0, zIndex: 1100, boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Toolbar sx={{ minHeight: { xs: 48, md: 52 }, px: { xs: 1, md: 2 }, gap: 0.5 }}>
          {/* Mobile menu toggle */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Nav Items */}
          {!isMobile && (
            <Stack direction="row" spacing={0} sx={{ flex: 1 }}>
              {navItems.map((item) =>
                item.children ? (
                  <Box key={item.label}>
                    <Button
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => setProductsAnchor(e.currentTarget)}
                      sx={{
                        color: 'white', fontWeight: 600, fontSize: 14, px: 2, py: 1.5, borderRadius: 0,
                        borderBottom: currentPage === item.page ? '3px solid #ffeb3b' : '3px solid transparent',
                        '&:hover': { background: 'rgba(255,255,255,0.12)' },
                      }}
                    >
                      {item.label}
                    </Button>
                    <Menu anchorEl={productsAnchor} open={Boolean(productsAnchor)} onClose={() => setProductsAnchor(null)}>
                      <MenuItem onClick={() => { onNavigate('products'); setProductsAnchor(null); }}>
                        Tất Cả Sản Phẩm
                      </MenuItem>
                      <Divider />
                      {item.children.map((c) => (
                        <MenuItem key={c.label} onClick={() => { onNavigate('products'); setProductsAnchor(null); }}>
                          {c.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={item.label}
                    onClick={() => onNavigate(item.page)}
                    sx={{
                      color: 'white', fontWeight: 600, fontSize: 14, px: 2, py: 1.5, borderRadius: 0,
                      borderBottom: currentPage === item.page ? '3px solid #ffeb3b' : '3px solid transparent',
                      '&:hover': { background: 'rgba(255,255,255,0.12)' },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              )}
            </Stack>
          )}

          {isMobile && <Box sx={{ flex: 1 }} />}

          {/* Search Box */}
          <Box sx={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 1, px: 1.5, py: 0.3,
            border: '1px solid rgba(255,255,255,0.3)',
            width: { xs: 160, sm: 220, md: 240 },
            '&:focus-within': { background: 'rgba(255,255,255,0.25)' },
          }}>
            <InputBase
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              sx={{ color: 'white', fontSize: 13, flex: 1, '& input::placeholder': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <SearchIcon sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 18 }} />
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, pt: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} pb={1}>
            <Box sx={{ fontWeight: 700, color: '#c62828', fontSize: 16 }}>MENU</Box>
            <IconButton onClick={() => setMobileOpen(false)}><CloseIcon /></IconButton>
          </Stack>
          <Divider />
          <List dense>
            {navItems.map((item) =>
              item.children ? (
                <Box key={item.label}>
                  <ListItem button onClick={() => setMobileProductsOpen(!mobileProductsOpen)}>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                    <ExpandMoreIcon sx={{ transform: mobileProductsOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                  </ListItem>
                  <Collapse in={mobileProductsOpen}>
                    <List dense disablePadding>
                      {item.children.map((c) => (
                        <ListItem button key={c.label} sx={{ pl: 4 }}
                          onClick={() => { onNavigate('products'); setMobileOpen(false); }}>
                          <ListItemText primary={c.label} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ) : (
                <ListItem button key={item.label}
                  onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
                  selected={currentPage === item.page}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
