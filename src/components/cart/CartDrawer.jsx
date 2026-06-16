import { Drawer, Box, Typography, Stack, IconButton, Button, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faPlus, faMinus, faCartShopping, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, clearCart, totalPrice, totalCount } = useCart();
  const { siteData } = useAdmin();
  const { company } = siteData;

  const handleOrder = () => {
    const text = items.map(i => `- ${i.name} x${i.qty}: ${(i.price*i.qty).toLocaleString('vi-VN')}₫`).join('\n');
    const msg  = `Xin chào! Tôi muốn đặt hàng:\n${text}\nTổng: ${totalPrice.toLocaleString('vi-VN')}₫`;
    window.open(`https://zalo.me/${company.zalo}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100vw', sm: 400 }, display: 'flex', flexDirection: 'column', borderRadius: { sm: '12px 0 0 12px' } } }}>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between"
        sx={{ px: 2.5, py: 1.8, background: 'linear-gradient(135deg,#d32f2f,#ff6d00)', color: '#fff', flexShrink: 0 }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 18 }} />
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Giỏ Hàng ({totalCount})</Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: '#fff', p: 0.8, '&:hover': { background: 'rgba(255,255,255,.15)' } }}>
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: 20 }} />
        </IconButton>
      </Stack>

      {items.length === 0 ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, gap: 2 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: '#f4f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 36, color: '#b0bec5' }} />
          </Box>
          <Typography sx={{ color: '#90a4ae', fontSize: 15, fontWeight: 500 }}>Giỏ hàng trống</Typography>
          <Button variant="contained" onClick={onClose}
            sx={{ background: 'linear-gradient(135deg,#d32f2f,#ff6d00)', borderRadius: 2 }}>
            Tiếp tục mua hàng
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            <Stack spacing={1.5} divider={<Divider />}>
              {items.map(item => (
                <Stack key={item.id} direction="row" spacing={1.5} alignItems="center">
                  <Box component="img" src={item.image} alt={item.name}
                    sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1.5, border: '1px solid #eef0f3', flexShrink: 0 }}
                    onError={(e) => { e.target.src = 'https://placehold.co/60?text=Cân'; }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35, color: '#1a1a2e', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#d32f2f', fontWeight: 800, mt: 0.4 }}>
                      {Number(item.price).toLocaleString('vi-VN')}₫
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty-1)}
                        sx={{ border: '1px solid #e8edf2', p: 0.3, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faMinus} style={{ fontSize: 11, color: '#546e7a' }} />
                      </IconButton>
                      <Typography sx={{ minWidth: 26, textAlign: 'center', fontWeight: 700, fontSize: 14 }}>{item.qty}</Typography>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty+1)}
                        sx={{ border: '1px solid #e8edf2', p: 0.3, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: 11, color: '#546e7a' }} />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 800, color: '#d32f2f' }}>
                      {(item.price*item.qty).toLocaleString('vi-VN')}₫
                    </Typography>
                    <IconButton size="small" onClick={() => removeItem(item.id)}
                      sx={{ mt: 0.5, color: '#ef9a9a', '&:hover': { color: '#d32f2f', background: '#fff5f5' } }}>
                      <FontAwesomeIcon icon={faTrash} style={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box sx={{ p: 2.5, borderTop: '1px solid #eef0f3', background: '#fafbfc', flexShrink: 0 }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>Tổng cộng:</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#d32f2f' }}>
                {totalPrice.toLocaleString('vi-VN')}₫
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Button fullWidth variant="contained" onClick={handleOrder}
                startIcon={<FontAwesomeIcon icon={faComment} style={{ fontSize: 14 }} />}
                sx={{ background: 'linear-gradient(135deg,#d32f2f,#ff6d00)', fontWeight: 700, py: 1.2, borderRadius: 2 }}>
                Đặt Hàng Qua Zalo
              </Button>
              <Button fullWidth variant="contained" component="a"
                href={`tel:${company.phone1.replace(/\s/g,'')}`}
                startIcon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 14 }} />}
                sx={{ background: 'linear-gradient(135deg,#d32f2f,#ff6d00)', fontWeight: 700, py: 1.1, borderRadius: 2 }}>
                Gọi {company.phone1}
              </Button>
              <Button fullWidth size="small" onClick={clearCart}
                sx={{ color: '#90a4ae', fontSize: 12, '&:hover': { color: '#d32f2f' } }}>
                <FontAwesomeIcon icon={faTrash} style={{ marginRight: 6, fontSize: 11 }} />
                Xóa tất cả
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Drawer>
  );
}
