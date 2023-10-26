import { styled } from '@mui/material';

const SIZE_PX = 20;
const SPACE_PX = SIZE_PX / 2;
const MARGIN_PX = -1 * SPACE_PX;

export const ResizeDot = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  display: 'block',
  width: SIZE_PX,
  height: SIZE_PX,
  borderRadius: '50%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: '30',
  marginLeft: MARGIN_PX,
  marginTop: MARGIN_PX,
}));
