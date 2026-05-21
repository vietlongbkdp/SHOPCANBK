import {
  Drawer, Box, Typography, Stack, IconButton, Button, Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, clearCart, totalPrice, totalCount } = useCart();
  const { siteData } = useAdmin();
  const { company } = siteData;

  const handleOrder = () => {
    const text = items.map(i => `- ${i.name} x${i.qty}: ${(i.price * i.qty).toLocaleString('vi-VN')}₫`).join('\n');
    const msg  = `Xin chào! Tôi muốn đặt hàng:\n${text}\nTổng: ${totalPrice.toLocaleString('vi-VN')}₫`;
    window.open(`https://zalo.me/${company.zalo}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100vw', sm: 400 }, display: 'flex', flexDirection: 'column' } }}>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between"
        sx={{ px: 2, py: 1.5, background: '#c62828', color: '#fff', flexShrink: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <ShoppingCartIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
            Giỏ Hàng ({totalCount})
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: '#fff', p: 0.5 }} aria-label="Đóng">
          <CloseIcon />
        </IconButton>
      </Stack>

      {items.length === 0 ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, gap: 2 }}>
          <ShoppingCartIcon sx={{ fontSize: 64, color: '#e0e0e0' }} />
          <Typography sx={{ color: '#aaa', fontSize: 15 }}>Giỏ hàng trống</Typography>
          <Button variant="contained" onClick={onClose}
            sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
            Tiếp tục mua hàng
          </Button>
        </Box>
      ) : (
        <>
          {/* Items */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 1.5, sm: 2 } }}>
            <Stack spacing={1.5} divider={<Divider />}>
              {items.map((item) => (
                <Stack key={item.id} direction="row" spacing={1.2} alignItems="center">
                  <Box component="img" src={item.image} alt={item.name}
                    sx={{ width: { xs: 56, sm: 64 }, height: { xs: 56, sm: 64 }, objectFit: 'cover', borderRadius: 1, border: '1px solid #eee', flexShrink: 0 }}
                    onError={(e) => { e.target.src = 'https://placehold.co/64?text=Cân'; }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{
                      fontSize: { xs: 12.5, sm: 13 }, fontWeight: 600, lineHeight: 1.35, color: '#222',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#c62828', fontWeight: 700, mt: 0.3 }}>
                      {Number(item.price).toLocaleString('vi-VN')}₫
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty - 1)}
                        sx={{ border: '1px solid #e0e0e0', p: 0.25 }}>
                        <RemoveIcon sx={{ fontSize: 13 }} />
                      </IconButton>
                      <Typography sx={{ minWidth: 24, textAlign: 'center', fontSize: 13.5, fontWeight: 700 }}>
                        {item.qty}
                      </Typography>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty + 1)}
                        sx={{ border: '1px solid #e0e0e0', p: 0.25 }}>
                        <AddIcon sx={{ fontSize: 13 }} />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#c62828' }}>
                      {(item.price * item.qty).toLocaleString('vi-VN')}₫
                    </Typography>
                    <IconButton size="small" onClick={() => removeItem(item.id)}
                      sx={{ color: '#ccc', mt: 0.3, '&:hover': { color: '#c62828' } }}>
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Footer */}
          <Box sx={{ p: { xs: 1.5, sm: 2 }, borderTop: '1px solid #ebebeb', background: '#fafafa', flexShrink: 0 }}>
            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>Tổng cộng:</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: 16, sm: 18 }, color: '#c62828' }}>
                {totalPrice.toLocaleString('vi-VN')}₫
              </Typography>
            </Stack>
            <Stack spacing={0.8}>
              <Button fullWidth variant="contained" onClick={handleOrder}
                sx={{ background: '#c62828', fontWeight: 700, py: 1.1, fontSize: { xs: 13, sm: 14 }, '&:hover': { background: '#8e0000' } }}>
                💬 Đặt Hàng Qua Zalo
              </Button>
              <Button fullWidth variant="outlined" component="a"
                href={`tel:${company.phone1.replace(/\s/g, '')}`}
                startIcon={<PhoneIcon />}
                sx={{ borderColor: '#c62828', color: '#c62828', fontWeight: 600, py: 1, fontSize: { xs: 12.5, sm: 13.5 }, '&:hover': { background: '#fff5f5' } }}>
                Gọi {company.phone1}
              </Button>
              <Button fullWidth size="small" onClick={clearCart} sx={{ color: '#bbb', fontSize: 12 }}>
                Xóa tất cả
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Drawer>
  );
}
