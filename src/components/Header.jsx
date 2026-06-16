import { useState } from 'react';
import { Box, Container, Stack, Typography, Link, InputBase, Menu, MenuItem, IconButton, Popover } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faPhone, faSearch, faChevronDown, faHeadset, faTruckFast, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

export default function Header({ onNavigate, onSearch, searchTerm }) {
  const { siteData } = useAdmin();
  const { company } = siteData;
  const [branchEl, setBranchEl] = useState(null);
  const [localSearch, setLocalSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(localSearch);
    onNavigate?.('products');
  };

  return (
    <Box component="header" sx={{ background: T.surface }}>
      {/* ── Top utility strip ── */}
      <Box sx={{ background: T.ink, color: 'rgba(255,255,255,.72)', display: { xs: 'none', md: 'block' } }}>
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 0.7 }}>
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Stack direction="row" spacing={0.8} alignItems="center">
                <FontAwesomeIcon icon={faTruckFast} style={{ fontSize: 12, color: T.accentLight }} />
                <Typography sx={{ fontSize: 12 }}>Giao hàng toàn quốc</Typography>
              </Stack>
              <Box sx={{ width: 1, height: 12, background: 'rgba(255,255,255,.2)' }} />
              <Stack direction="row" spacing={0.8} alignItems="center">
                <FontAwesomeIcon icon={faShieldHalved} style={{ fontSize: 12, color: T.accentLight }} />
                <Typography sx={{ fontSize: 12 }}>Bảo hành chính hãng</Typography>
              </Stack>
              <Box sx={{ width: 1, height: 12, background: 'rgba(255,255,255,.2)' }} />
              <Stack direction="row" spacing={0.8} alignItems="center">
                <FontAwesomeIcon icon={faClock} style={{ fontSize: 12, color: T.accentLight }} />
                <Typography sx={{ fontSize: 12 }}>{company.hours}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href={company.facebook} target="_blank" rel="noopener noreferrer"
                sx={{ color: 'rgba(255,255,255,.72)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.6, '&:hover': { color: '#fff' } }}>
                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 13 }} />Facebook
              </Link>
              <Link href={`https://zalo.me/${company.zalo}`} target="_blank" rel="noopener noreferrer"
                sx={{ color: 'rgba(255,255,255,.72)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.6, '&:hover': { color: '#fff' } }}>
                <FontAwesomeIcon icon={faComment} style={{ fontSize: 13 }} />Zalo
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ── Main bar: logo · search · hotline ── */}
      <Box sx={{ borderBottom: `1px solid ${T.line}` }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" spacing={{ xs: 1.2, md: 3 }} sx={{ py: { xs: 1, md: 1.6 } }}>

            {/* Logo + name */}
            <Stack direction="row" alignItems="center" spacing={1.2} onClick={() => onNavigate?.('home')}
              sx={{ cursor: 'pointer', flexShrink: 0 }}>
              <Box component="img" src="/logo.jpg" alt="Cân Điện Tử Bách Khoa"
                sx={{ height: { xs: 44, sm: 52, md: 64 }, width: 'auto', display: 'block',
                  transition: 'transform .3s', '&:hover': { transform: 'scale(1.04)' } }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography component="h1" sx={{ fontWeight: 900, lineHeight: 1.05, color: T.ink,
                  fontSize: { xs: '13px', sm: '16px', md: '20px' }, whiteSpace: { xs: 'normal', sm: 'nowrap' } }}>
                  CÂN ĐIỆN TỬ{' '}
                  <Box component="span" sx={{ background: T.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    BÁCH KHOA
                  </Box>
                </Typography>
                <Typography sx={{ color: T.inkSoft, fontWeight: 600, fontSize: { xs: '9px', sm: '10.5px', md: '12px' }, mt: 0.2,
                  letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  UY TÍN · CHUYÊN NGHIỆP · NHANH CHÓNG
                </Typography>
              </Box>
            </Stack>

            {/* Search bar (desktop) — NEW */}
            <Box component="form" onSubmit={handleSearch}
              sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', maxWidth: 520, mx: 'auto',
                border: `2px solid ${T.line}`, borderRadius: 3, overflow: 'hidden', transition: 'all .2s',
                '&:focus-within': { borderColor: T.brand, boxShadow: `0 0 0 3px ${T.brand}1a` } }}>
              <InputBase placeholder="Bạn cần tìm loại cân nào?" value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                sx={{ flex: 1, px: 2, py: 1, fontSize: 14 }} />
              <Box component="button" type="submit"
                sx={{ background: T.gradient, border: 'none', color: '#fff', px: 2.5, py: 1.3, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 0.8, fontWeight: 700, fontSize: 13.5,
                  transition: 'all .2s', '&:hover': { filter: 'brightness(1.08)' } }}>
                <FontAwesomeIcon icon={faSearch} style={{ fontSize: 14 }} />
                Tìm
              </Box>
            </Box>

            {/* Hotline block (desktop) — NEW with branch dropdown */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0, display: { xs: 'none', lg: 'flex' } }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', background: T.gradientSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FontAwesomeIcon icon={faHeadset} style={{ fontSize: 19, color: T.brand }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: T.inkSoft, fontWeight: 500 }}>Hotline tư vấn</Typography>
                <Box onClick={(e) => setBranchEl(e.currentTarget)}
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.6, cursor: 'pointer' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: 18, color: T.brand, lineHeight: 1.1 }}>
                    {company.phone1}
                  </Typography>
                  <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 11, color: T.inkSoft }} />
                </Box>
              </Box>
              <Popover open={Boolean(branchEl)} anchorEl={branchEl} onClose={() => setBranchEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { mt: 1, borderRadius: 3, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,.16)', minWidth: 260 } }}>
                {[
                  { label: 'Chi nhánh Huế', phone: company.phone1, addr: company.address1 },
                  { label: 'Chi nhánh Đà Nẵng', phone: company.phone2, addr: company.address2 },
                ].map((b, i) => (
                  <Link key={b.phone} href={`tel:${b.phone.replace(/\s/g,'')}`}
                    sx={{ display: 'block', p: 2, borderBottom: i === 0 ? `1px solid ${T.line}` : 'none',
                      transition: 'background .15s', '&:hover': { background: T.gradientSoft } }}>
                    <Typography sx={{ fontSize: 11.5, color: T.inkSoft, fontWeight: 600, mb: 0.3 }}>{b.label}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FontAwesomeIcon icon={faPhone} style={{ fontSize: 13, color: T.brand }} />
                      <Typography sx={{ fontWeight: 800, fontSize: 16, color: T.brand }}>{b.phone}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 11.5, color: T.inkSoft, mt: 0.4 }}>
                      <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 10, marginRight: 4 }} />{b.addr}
                    </Typography>
                  </Link>
                ))}
              </Popover>
            </Stack>

            {/* Mobile: phone CTA only */}
            <Stack direction="row" spacing={0.8} sx={{ display: { xs: 'flex', lg: 'none' }, flexShrink: 0 }}>
              <Link component="a" href={`tel:${company.phone1.replace(/\s/g,'')}`}
                sx={{ width: 40, height: 40, borderRadius: '50%', background: T.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 14px ${T.brand}40` }}>
                <FontAwesomeIcon icon={faPhone} style={{ fontSize: 16, color: '#fff' }} />
              </Link>
            </Stack>
          </Stack>

          {/* Mobile search row — NEW */}
          <Box component="form" onSubmit={handleSearch}
            sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', pb: 1.2,
              border: 'none' }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', border: `2px solid ${T.line}`, borderRadius: 2.5, overflow: 'hidden',
              '&:focus-within': { borderColor: T.brand } }}>
              <InputBase placeholder="Tìm sản phẩm cân điện tử..." value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                sx={{ flex: 1, px: 1.5, py: 0.7, fontSize: 13.5 }} />
              <Box component="button" type="submit"
                sx={{ background: T.gradient, border: 'none', color: '#fff', px: 2, py: 1, cursor: 'pointer',
                  display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faSearch} style={{ fontSize: 14 }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
