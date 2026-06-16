import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  Stack,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';

export default function Cart({ items, onRemove, onUpdateQuantity, onClose }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total >= 500000 ? 0 : 30000;
  const discount = Math.floor(total * 0.05);
  const finalTotal = total + shipping - discount;

  return (
    <Drawer anchor="right" open={!!items} onClose={onClose} sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 } } }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1565c0 0%, #f57c00 100%)',
          color: 'white',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          🛒 Giỏ Hàng ({items.length})
        </Typography>
        <IconButton color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {items.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Giỏ hàng của bạn trống
          </Typography>
        </Box>
      ) : (
        <>
          {/* Items List */}
          <List sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
            {items.map((item) => (
              <Box key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => onRemove(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    background: '#f5f5f5',
                    borderRadius: 1,
                    mb: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.price.toLocaleString('vi-VN')}₫`}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ sx: { color: '#1565c0', fontWeight: 600 } }}
                  />
                  <Stack direction="row" spacing={1} alignItems="center" width="100%">
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      sx={{ border: '1px solid #e0e0e0' }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <TextField
                      size="small"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      sx={{ width: 60, '& input': { textAlign: 'center' } }}
                      type="number"
                    />
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      sx={{ border: '1px solid #e0e0e0' }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{
                        ml: 'auto',
                        fontWeight: 700,
                        color: '#1565c0',
                      }}
                      variant="body2"
                    >
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </Typography>
                  </Stack>
                </ListItem>
              </Box>
            ))}
          </List>

          <Divider />

          {/* Summary */}
          <Box sx={{ p: 2, background: '#f5f5f5' }}>
            <Stack spacing={1} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <Typography variant="body2">Tạm tính:</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {total.toLocaleString('vi-VN')}₫
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <Typography variant="body2">Vận chuyển:</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')}₫`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#4caf50' }}>
                <Typography variant="body2">Giảm giá:</Typography>
                <Typography variant="body2" fontWeight={600}>
                  -{discount.toLocaleString('vi-VN')}₫
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
                <Typography variant="body1" fontWeight={700}>
                  Tổng cộng:
                </Typography>
                <Typography variant="body1" fontWeight={700} sx={{ color: '#1565c0' }}>
                  {finalTotal.toLocaleString('vi-VN')}₫
                </Typography>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              sx={{ mb: 1 }}
            >
              Tiến Hành Thanh Toán
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
}
