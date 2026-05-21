import { useState } from 'react';
import { Box, Stack, Typography, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import data from '../data.json';

const { company } = data;

const ACTIONS = [
  { emoji: '📞', label: company.phone1, sublabel: 'CN Huế', color: '#c62828', action: () => window.location.href = `tel:${company.phone1.replace(/\s/g, '')}` },
  { emoji: '📞', label: company.phone2, sublabel: 'CN Đà Nẵng', color: '#1565c0', action: () => window.location.href = `tel:${company.phone2.replace(/\s/g, '')}` },
  { emoji: '💬', label: 'Zalo', sublabel: 'Tư vấn', color: '#0068ff', action: () => window.open(`https://zalo.me/${company.phone1.replace(/\s/g, '')}`, '_blank') },
  { emoji: '📘', label: 'Facebook', sublabel: 'Nhắn tin', color: '#3b5998', action: () => window.open(company.facebook, '_blank') },
];

export default function FloatingContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{
      position: 'fixed', bottom: 24, right: 16, zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
    }}>
      {/* Action buttons — only show when open */}
      {open && (
        <Stack spacing={1} sx={{ mb: 1.5, alignItems: 'flex-end' }}>
          {ACTIONS.map((a, i) => (
            <Tooltip key={i} title={`${a.sublabel}: ${a.label}`} placement="left" arrow>
              <Box
                onClick={a.action}
                sx={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: a.color, color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'scale(1.12)', boxShadow: '0 5px 16px rgba(0,0,0,0.35)' },
                }}
              >
                {a.emoji}
              </Box>
            </Tooltip>
          ))}
        </Stack>
      )}

      {/* Toggle button */}
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          width: 54, height: 54, borderRadius: '50%',
          background: open ? '#555' : 'linear-gradient(135deg, #c62828, #e65100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          transition: 'all 0.3s',
          '&:hover': { transform: 'scale(1.08)' },
          animation: open ? 'none' : 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%':   { boxShadow: '0 0 0 0 rgba(198,40,40,0.45)' },
            '70%':  { boxShadow: '0 0 0 12px rgba(198,40,40,0)' },
            '100%': { boxShadow: '0 0 0 0 rgba(198,40,40,0)' },
          },
        }}
      >
        {open
          ? <CloseIcon sx={{ color: 'white', fontSize: 24 }} />
          : <PhoneIcon sx={{ color: 'white', fontSize: 26 }} />
        }
      </Box>
    </Box>
  );
}
