import { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function FloatingContactWidget() {
  const [showWidget, setShowWidget] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactItems = [
    {
      id: 'zalo',
      icon: '💬',
      label: 'Zalo',
      color: '#0084ff',
      link: 'https://zalo.me/0981912347',
      action: () => window.open('https://zalo.me/0981912347', '_blank'),
    },
    {
      id: 'phone',
      icon: <PhoneIcon />,
      label: 'Điện Thoại',
      color: '#d32f2f',
      action: () => window.location.href = 'tel:0981912347',
    },
    {
      id: 'messenger',
      icon: '💬',
      label: 'Messenger',
      color: '#0084ff',
      action: () => window.open('https://m.me/yourpage', '_blank'),
    },
    {
      id: 'scroll',
      icon: <ExpandLessIcon />,
      label: 'Lên Đầu',
      color: '#4caf50',
      action: scrollToTop,
    },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000,
      }}
    >
      {contactItems.map((item) => (
        <Tooltip key={item.id} title={item.label} placement="left">
          <IconButton
            onClick={item.action}
            sx={{
              background: item.color,
              color: 'white',
              width: 60,
              height: 60,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              '&:hover': {
                background: item.color,
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {typeof item.icon === 'string' ? item.icon : item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
