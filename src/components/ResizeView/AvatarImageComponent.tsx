import { IAvatarImageComponentViewModel } from 'viewModels';

import { useImageOnCanvasMoveViewModel } from './hooks/useImageOnCanvasMoveViewModel';

// import img from 'data/testImg.jpg'; //TODO load
import img from 'data/other3.jpeg'; //TODO load
import { useDrawAnyImageOnCanvas } from './hooks/useDrawAnyImageOnCanvas';
import { styled } from '@mui/material';

type Props = {
  defaultWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarImageComponent = ({ defaultWidth, canvasRef, viewModel }: Props) => {
  useDrawAnyImageOnCanvas(img, defaultWidth, viewModel, canvasRef);
  useImageOnCanvasMoveViewModel(viewModel, canvasRef);

  return <AvatarImageComponentStyled ref={canvasRef} className="image-canvas" />;
};

const AvatarImageComponentStyled = styled('canvas')(() => ({
  position: 'absolute',
  top: 40,
  left: 40,
  cursor: 'move',
  zIndex: 10,
}));
