import {
  IAvatarImageOnCanvasMoveViewModel,
  IDrawAvatarOnCanvasViewModel,
  IResizeAvatarViewModel,
} from 'viewModels';

import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

import img from 'data/testImg.jpg'; //TODO load
// import img from 'data/other3.jpeg'; //TODO load
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';
import { useStateObservable } from 'tools';

type Props = {
  defaultWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  moveImageViewModel: IAvatarImageOnCanvasMoveViewModel;
  drawImageViewModel: IDrawAvatarOnCanvasViewModel;
  resizeAvatarViewModel: IResizeAvatarViewModel;
};

export const AvatarImageComponent = ({
  drawImageViewModel,
  moveImageViewModel,
  defaultWidth,
  canvasRef,
  resizeAvatarViewModel,
}: Props) => {
  useDrawAnyImageOnCanvas(img, defaultWidth, drawImageViewModel, canvasRef);
  useImageOnCanvasMoveViewModel(moveImageViewModel, canvasRef);

  const sizeAfterResize = useStateObservable(resizeAvatarViewModel.sizeAfterResize$);
  console.log('>>>', sizeAfterResize);

  return <canvas ref={canvasRef} className="image-canvas" />;
};
