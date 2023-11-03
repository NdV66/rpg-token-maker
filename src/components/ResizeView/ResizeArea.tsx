import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const ResizeArea = styled('div')<Props>(({ width, height }) => ({
  width,
  height,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
}));
