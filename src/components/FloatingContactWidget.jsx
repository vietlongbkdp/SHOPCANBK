import { useState } from 'react';
import { Box, Stack, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useAdmin } from '../context/AdminContext';

export default function FloatingContactWidget() {
  const { siteData } = useAdmin();
  const { company } = siteData;
  const [open, setOpen] = useState(false);

  const ACTIONS = [
    { icon: faPhone, label: `${company.phone1} (Huế)`, color: '#c62828', action: () => window.location.href = `tel:${company.phone1.replace(/\s/g,'')}` },
    { icon: faPhone, label: `${company.phone2} (ĐN)`, color: '#1565c0', action: () => window.location.href = `tel:${company.phone2.replace(/\s/g,'')}` },
    { icon: faComment, label: 'Zalo tư vấn', color: '#0068ff', action: () => window.open(`https://zalo.me/${company.zalo}`, '_blank') },
    { icon: faFacebook, label: 'Nhắn tin Facebook', color: '#1877f2', action: () => window.open(company.facebook, '_blank') },
  ];

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      {open && (
        <Stack spacing={1} mb={1.5}>
          {ACTIONS.map((a, i) => (
            <Tooltip key={i} title={a.label} placement="left" arrow>
              <Box onClick={a.action}
                sx={{
                  width: 44, height: 44, borderRadius: '50%', background: a.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: `0 4px 14px ${a.color}66`,
                  transition: 'all .2s',
                  '&:hover': { transform: 'scale(1.12)', boxShadow: `0 6px 20px ${a.color}88` },
                }}>
                <FontAwesomeIcon icon={a.icon} style={{ fontSize: 18, color: '#fff' }} />
              </Box>
            </Tooltip>
          ))}
        </Stack>
      )}
      <Box onClick={() => setOpen(!open)}
        sx={{
          width: 52, height: 52, borderRadius: '50%',
          background: open ? '#546e7a' : 'linear-gradient(135deg,#c62828,#e65100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: open ? '0 4px 16px rgba(84,110,122,.4)' : '0 4px 16px rgba(198,40,40,.45)',
          transition: 'all .3s', '&:hover': { transform: 'scale(1.08)' },
          animation: open ? 'none' : 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%':  { boxShadow: '0 0 0 0 rgba(198,40,40,.45)' },
            '70%': { boxShadow: '0 0 0 12px rgba(198,40,40,0)' },
            '100%':{ boxShadow: '0 0 0 0 rgba(198,40,40,0)' },
          },
        }}>
        <FontAwesomeIcon icon={open ? faXmark : faPhone} style={{ fontSize: 22, color: '#fff' }} />
      </Box>
    </Box>
  );
}
