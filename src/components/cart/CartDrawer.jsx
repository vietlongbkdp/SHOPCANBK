import {
  Drawer, Box, Typography, Stack, IconButton, Button, Divider,
  Avatar, TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, clearCart, totalPrice, totalCount } = useCart();

  const handleOrder = () => {
    const text = items.map(i => `- ${i.name} x${i.qty}: ${(i.price * i.qty).toLocaleString('vi-VN')}₫`).join('\n');
    const msg = `Xin chào! Tôi muốn đặt hàng:\n${text}\nTổng: ${totalPrice.toLocaleString('vi-VN')}₫`;
    window.open(`https://zalo.me/0913331916?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 400 }, maxWidth: '100vw' } }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between"
        sx={{ px: 2, py: 1.5, background: '#c62828', color: 'white' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <ShoppingCartIcon />
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
            Giỏ Hàng ({totalCount} sản phẩm)
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
      </Stack>

      {items.length === 0 ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, gap: 2 }}>
          <ShoppingCartIcon sx={{ fontSize: 72, color: '#e0e0e0' }} />
          <Typography sx={{ color: '#999', fontSize: 15 }}>Giỏ hàng trống</Typography>
          <Button variant="contained" onClick={onClose}
            sx={{ background: '#c62828', '&:hover': { background: '#8e0000' } }}>
            Tiếp tục mua hàng
          </Button>
        </Box>
      ) : (
        <>
          {/* Items */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            <Stack spacing={1.5} divider={<Divider />}>
              {items.map(item => (
                <Stack key={item.id} direction="row" spacing={1.5} alignItems="center">
                  <Box component="img" src={item.image} alt={item.name}
                    sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1, border: '1px solid #eee', flexShrink: 0 }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=Cân'; }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, color: '#212121',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#c62828', fontWeight: 700, mt: 0.3 }}>
                      {item.price.toLocaleString('vi-VN')}₫
                    </Typography>
                    {/* Qty control */}
                    <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty - 1)}
                        sx={{ border: '1px solid #e0e0e0', p: 0.3 }}>
                        <RemoveIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography sx={{ minWidth: 28, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
                        {item.qty}
                      </Typography>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty + 1)}
                        sx={{ border: '1px solid #e0e0e0', p: 0.3 }}>
                        <AddIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#c62828' }}>
                      {(item.price * item.qty).toLocaleString('vi-VN')}₫
                    </Typography>
                    <IconButton size="small" onClick={() => removeItem(item.id)} sx={{ color: '#999', mt: 0.5 }}>
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Footer */}
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', background: '#fafafa' }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Tổng cộng:</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#c62828' }}>
                {totalPrice.toLocaleString('vi-VN')}₫
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Button fullWidth variant="contained" size="large"
                onClick={handleOrder}
                sx={{ background: '#c62828', fontWeight: 700, '&:hover': { background: '#8e0000' } }}>
                💬 Đặt Hàng Qua Zalo
              </Button>
              <Button fullWidth variant="outlined" size="large"
                startIcon={<PhoneIcon />}
                onClick={() => window.location.href = 'tel:0913331916'}
                sx={{ borderColor: '#c62828', color: '#c62828', fontWeight: 600, '&:hover': { background: '#fff5f5' } }}>
                Gọi 0913 331 916 Đặt Hàng
              </Button>
              <Button fullWidth size="small" onClick={clearCart} sx={{ color: '#999' }}>
                Xóa tất cả
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Drawer>
  );
}
