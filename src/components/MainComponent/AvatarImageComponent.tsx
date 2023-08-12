import { IAvatarImageComponentViewModel } from 'viewModels';

import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

import img from 'data/testImg.jpg'; //TODO load
// import img from 'data/other3.jpeg'; //TODO load
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';

type Props = {
  defaultWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarImageComponent = ({ defaultWidth, canvasRef, viewModel }: Props) => {
  useDrawAnyImageOnCanvas(img, defaultWidth, viewModel, canvasRef);
  useImageOnCanvasMoveViewModel(viewModel, canvasRef);

  return <canvas ref={canvasRef} className="image-canvas" />;
};
