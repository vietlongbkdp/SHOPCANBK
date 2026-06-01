import { Box, Container, Typography, Button, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAdmin } from '../context/AdminContext';

export default function Hero({ onNavigate }) {
  const { siteData } = useAdmin();
  const { company, categories } = siteData;

  return (
    <Box component="section">

      {/* ── Main Banner ── */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          background: '#1a2035',
          cursor: 'pointer',
        }}
        onClick={() => onNavigate('products')}
      >
        {/* Banner image */}
        <Box
          component="img"
          src="/banner.png"
          alt="Cân Điện Tử Bách Khoa – Uy tín, Chuyên nghiệp, Nhanh chóng"
          sx={{
            width: '100%',
            height: { xs: 'auto', md: 'auto' },
            maxHeight: { xs: 220, sm: 320, md: 420 },
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />

        {/* Overlay gradient + CTA — mobile */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
          p: { xs: 1.5, md: 2.5 },
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center', gap: 1,
        }}>
          <Button
            component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
            variant="contained" size="small" startIcon={<PhoneIcon />}
            sx={{ background: '#c62828', fontWeight: 700, fontSize: 12.5, '&:hover': { background: '#8e0000' } }}
            onClick={(e) => e.stopPropagation()}
          >
            {company.phone1}
          </Button>
          <Button
            variant="outlined" size="small" startIcon={<ShoppingCartIcon />}
            onClick={(e) => { e.stopPropagation(); onNavigate('products'); }}
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.7)', fontWeight: 600, fontSize: 12.5, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' } }}
          >
            Xem Sản Phẩm
          </Button>
        </Box>

        {/* Overlay — desktop */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute', bottom: 24, right: 32,
          gap: 1.5,
        }}>
          <Button
            component="a" href={`tel:${company.phone1.replace(/\s/g, '')}`}
            variant="contained" startIcon={<PhoneIcon />}
            sx={{ background: '#c62828', fontWeight: 700, fontSize: 14, px: 3, '&:hover': { background: '#8e0000' } }}
            onClick={(e) => e.stopPropagation()}
          >
            {company.phone1}
          </Button>
          <Button
            variant="outlined" startIcon={<BuildIcon />}
            onClick={(e) => { e.stopPropagation(); onNavigate('services'); }}
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.8)', fontWeight: 600, fontSize: 14, px: 3, '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.12)' } }}
          >
            Dịch Vụ Sửa Chữa
          </Button>
        </Box>
      </Box>

      {/* ── Category scroll strip ── */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #ebebeb', py: { xs: 0.6, md: 0.8 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            overflowX: 'auto', scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}>
            <Stack direction="row" sx={{ width: 'max-content', gap: { xs: 0.2, md: 0.5 } }}>
              {categories.map((cat) => (
                <Button key={cat.id} onClick={() => onNavigate('products')} size="small"
                  sx={{
                    flexShrink: 0, color: '#555', fontWeight: 600,
                    fontSize: { xs: 11.5, md: 13 },
                    px: { xs: 1, md: 1.5 }, py: { xs: 0.6, md: 0.7 },
                    borderRadius: 1, whiteSpace: 'nowrap', minWidth: 0,
                    '&:hover': { color: '#c62828', background: '#fff5f5' },
                  }}
                  startIcon={<span style={{ fontSize: 14 }}>{cat.icon}</span>}
                >
                  {cat.name}
                </Button>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
