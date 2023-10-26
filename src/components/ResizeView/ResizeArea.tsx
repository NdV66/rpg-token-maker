import styled from '@emotion/styled';

export const WORKSPACE_SIZE_PX = 600;

export const ResizeArea = styled('div')(() => ({
  width: WORKSPACE_SIZE_PX,
  height: WORKSPACE_SIZE_PX,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
}));
