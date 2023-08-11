import { IAvatarImageComponentViewModel, IResizeAvatarImageComponentViewModel } from 'viewModels';

import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

import img from 'data/testImg.jpg'; //TODO load
// import img from 'data/other3.jpeg'; //TODO load
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';
import { useStateObservable } from 'tools';

type Props = {
  defaultWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarImageComponent = ({ defaultWidth, canvasRef, viewModel }: Props) => {
  useDrawAnyImageOnCanvas(img, defaultWidth, viewModel, canvasRef);
  useImageOnCanvasMoveViewModel(viewModel, canvasRef);

  //   const sizeAfterResize = useStateObservable(resizeAvatarViewModel.currentSizeWithOffset$);
  //   console.log('>>> sizeAfterResize', sizeAfterResize);

  return <canvas ref={canvasRef} className="image-canvas" />;
};
