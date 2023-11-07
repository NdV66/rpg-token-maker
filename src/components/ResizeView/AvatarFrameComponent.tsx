import { IAvatarFrameComponentViewModel } from 'viewModels';
import { useDrawAnyImageOnCanvas } from './hooks/useDrawAnyImageOnCanvas';

import frame from 'data/frame.png';
import styled from '@emotion/styled';

type Props = {
  viewModel: IAvatarFrameComponentViewModel;
  size: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export const AvatarFrameComponent = ({ viewModel, size, canvasRef }: Props) => {
  useDrawAnyImageOnCanvas(frame, size, viewModel, canvasRef);
  return <AvatarFrameComponentStyled ref={canvasRef} className="frame" size={size} />;
};

const AvatarFrameComponentStyled = styled('canvas')<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
  position: 'absolute',
  top: `calc((100% - ${size}px)/2)`,
  left: `calc((100% - ${size}px)/2)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  zIndex: 20,
  pointerEvents: 'none',
}));
