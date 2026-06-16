import { useState } from 'react';
import { Box, Stack, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

export default function FloatingContactWidget() {
  const { siteData } = useAdmin();
  const { company } = siteData;
  const [open, setOpen] = useState(false);

  const ACTIONS = [
    { icon: faPhone, label: `${company.phone1} · Huế`, color: T.brand, action: () => window.location.href = `tel:${company.phone1.replace(/\s/g,'')}` },
    { icon: faPhone, label: `${company.phone2} · Đà Nẵng`, color: '#1565c0', action: () => window.location.href = `tel:${company.phone2.replace(/\s/g,'')}` },
    { icon: faComment, label: 'Chat Zalo', color: '#0068ff', action: () => window.open(`https://zalo.me/${company.zalo}`, '_blank') },
    { icon: faFacebook, label: 'Facebook', color: '#1877f2', action: () => window.open(company.facebook, '_blank') },
  ];

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      {open && (
        <Stack spacing={1.2} mb={1.5}>
          {ACTIONS.map((a, i) => (
            <Tooltip key={i} title={a.label} placement="left" arrow>
              <Box onClick={a.action}
                sx={{ width: 46, height: 46, borderRadius: '50%', background: a.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  boxShadow: `0 6px 18px ${a.color}66`, transition: 'all .2s',
                  animation: `fadeUp .3s ${i * 0.05}s both`,
                  '&:hover': { transform: 'scale(1.12)' } }}>
                <FontAwesomeIcon icon={a.icon} style={{ fontSize: 18, color: '#fff' }} />
              </Box>
            </Tooltip>
          ))}
        </Stack>
      )}
      <Box onClick={() => setOpen(!open)}
        sx={{ width: 56, height: 56, borderRadius: '50%',
          background: open ? T.ink : T.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: `0 8px 24px ${T.brand}66`, transition: 'all .3s',
          '&:hover': { transform: 'scale(1.08)' },
          animation: open ? 'none' : 'pulse 2.5s infinite',
          '@keyframes pulse': {
            '0%':  { boxShadow: `0 0 0 0 ${T.brand}66` },
            '70%': { boxShadow: `0 0 0 14px ${T.brand}00` },
            '100%':{ boxShadow: `0 0 0 0 ${T.brand}00` },
          } }}>
        <FontAwesomeIcon icon={open ? faXmark : faPhone} style={{ fontSize: 22, color: '#fff' }} />
      </Box>
    </Box>
  );
}
