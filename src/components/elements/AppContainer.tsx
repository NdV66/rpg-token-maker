import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export const AppContainer = ({ children }: React.PropsWithChildren) => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container>
      <Grid xs={10} xsOffset={1} md={10} mdOffset={1} lg={10} lgOffset={1} xl={6} xlOffset={3} justifyContent="space-between" display="flex" alignItems="center">
        {children}
      </Grid>
    </Grid>
  </Box>
);
