import styled from '@emotion/styled';

type Props = {
  size: number;
};

export const ResizeArea = styled('div')<Props>(({ theme, size }) => ({
  width: size,
  height: size,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
}));
