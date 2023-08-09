import { IDrawImageOnCanvasViewModel } from 'viewModels';
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';

import frame from 'data/frame.png'; //TODO load

type Props = {
  viewModel: IDrawImageOnCanvasViewModel;
  size: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export const AvatarFrameComponent = ({ viewModel, size, canvasRef }: Props) => {
  useDrawAnyImageOnCanvas(frame, size, viewModel, canvasRef);

  return <canvas ref={canvasRef} className="frame" />;
};
