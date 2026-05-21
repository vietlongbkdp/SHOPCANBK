import { Box } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function AdminEntryButton({ onClick }) {
  return (
    <Box
      onClick={onClick}
      title="Quản trị"
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 9998,
        width: 34,
        height: 34,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background .2s',
        '&:hover': { background: 'rgba(0,0,0,0.38)' },
      }}
    >
      <AdminPanelSettingsIcon sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 18 }} />
    </Box>
  );
}
