import { IDrawImageOnCanvasViewModel, IImageOnCanvasMoveViewModel } from 'viewModels';

import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

import img from 'data/testImg.jpg'; //TODO load
// import img from 'data/other3.jpeg'; //TODO load
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';

type Props = {
  defaultWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  moveImageViewModel: IImageOnCanvasMoveViewModel;
  drawImageViewModel: IDrawImageOnCanvasViewModel;
};

export const AvatarImageComponent = ({
  drawImageViewModel,
  moveImageViewModel,
  defaultWidth,
  canvasRef,
}: Props) => {
  useDrawAnyImageOnCanvas(img, defaultWidth, drawImageViewModel, canvasRef);
  useImageOnCanvasMoveViewModel(moveImageViewModel, canvasRef);

  return <canvas ref={canvasRef} className="image-canvas" />;
};
