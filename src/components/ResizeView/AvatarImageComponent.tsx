import { styled } from '@mui/material';
import { IAvatarImageComponentViewModel } from 'viewModels';
import { useImageOnCanvasMoveViewModel } from './hooks/useImageOnCanvasMoveViewModel';
import { useDrawAnyImageOnCanvas } from './hooks/useDrawAnyImageOnCanvas';

type Props = {
  workspaceSizeWidth: number;
  workspaceSizeHeight: number;
  defaultWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  viewModel: IAvatarImageComponentViewModel;
  imageSrc: string;
};

export const AvatarImageComponent = ({ defaultWidth, canvasRef, viewModel, workspaceSizeHeight, workspaceSizeWidth, imageSrc }: Props) => {
  useDrawAnyImageOnCanvas(imageSrc, defaultWidth, viewModel, canvasRef);
  useImageOnCanvasMoveViewModel(viewModel, canvasRef);

  viewModel.canvasSize$.subscribe((size) => {
    const top = (workspaceSizeHeight - size.height) / 2;
    const left = (workspaceSizeWidth - size.width) / 2;

    viewModel.setInitialElementOffset({ x: left, y: top });
  });

  return <AvatarImageComponentStyled ref={canvasRef} className="image-canvas" />;
};

const AvatarImageComponentStyled = styled('canvas')(() => ({
  position: 'absolute',
  cursor: 'move',
  zIndex: 10,
}));
