import { styled } from '@mui/material';

export const ResizeViewWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 64px - 140px)',
}));
