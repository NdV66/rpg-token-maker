import { styled } from '@mui/material';

export const ResizeWorkArea = styled('div')(({ theme }) => ({
  background: theme.palette.secondary.main,
  width: '100%',
  height: '100%',
  position: 'relative',
}));
