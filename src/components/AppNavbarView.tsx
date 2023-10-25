import { AppBar, Typography, Box, Toolbar } from '@mui/material';
import { useSettingsContext } from './SettingsContextComponent';

export const AppNavbarView = () => {
  const { translations } = useSettingsContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {translations.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
