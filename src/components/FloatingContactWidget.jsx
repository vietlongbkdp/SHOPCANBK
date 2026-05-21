import { useState } from 'react';
import { Box, Stack, IconButton, Tooltip, Typography, Fade } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import data from '../data.json';

const { company } = data;

const ACTIONS = [
  { icon: '📞', label: `Huế: ${company.phone1}`, color: '#c62828', action: () => window.location.href = `tel:${company.phone1.replace(/\s/g, '')}` },
  { icon: '📞', label: `Đà Nẵng: ${company.phone2}`, color: '#1565c0', action: () => window.location.href = `tel:${company.phone2.replace(/\s/g, '')}` },
  { icon: '💬', label: 'Zalo tư vấn', color: '#0068ff', action: () => window.open(`https://zalo.me/${company.phone1.replace(/\s/g, '')}`, '_blank') },
  { icon: '📘', label: 'Nhắn tin Facebook', color: '#3b5998', action: () => window.open(company.facebook, '_blank') },
];

export default function FloatingContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 16, zIndex: 9999 }}>
      {/* Action buttons */}
      <Fade in={open}>
        <Stack spacing={1} sx={{ mb: 1.5, alignItems: 'flex-end' }}>
          {ACTIONS.map((a, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={a.action}>
              <Box sx={{
                background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                borderRadius: 1, px: 1.5, py: 0.6, whiteSpace: 'nowrap',
              }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#333' }}>{a.label}</Typography>
              </Box>
              <Box sx={{
                width: 42, height: 42, borderRadius: '50%', background: a.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' },
              }}>
                {a.icon}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Fade>

      {/* Toggle button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            width: 52, height: 52, borderRadius: '50%',
            background: open ? '#555' : 'linear-gradient(135deg, #c62828, #e65100)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 0.3s', '&:hover': { transform: 'scale(1.08)' },
            animation: open ? 'none' : 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(198,40,40,0.4)' },
              '70%': { boxShadow: '0 0 0 10px rgba(198,40,40,0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(198,40,40,0)' },
            },
          }}
        >
          {open
            ? <CloseIcon sx={{ color: 'white', fontSize: 22 }} />
            : <PhoneIcon sx={{ color: 'white', fontSize: 24 }} />
          }
        </Box>
      </Box>
    </Box>
  );
}
