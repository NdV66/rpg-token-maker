import { useEffect } from 'react';
import { IDrawImageOnCanvasViewModel, IImageOnCanvasMoveViewModel } from 'viewModels';

import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

import img from 'data/testImg.jpg'; //TODO load
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';

type Props = {
  defaultWidth: number;
  moveImageViewModel: IImageOnCanvasMoveViewModel;
  drawImageViewModel: IDrawImageOnCanvasViewModel;
};

export const AvatarImageComponent = ({
  drawImageViewModel,
  moveImageViewModel,
  defaultWidth,
}: Props) => {
  const { drawImageOnCanvas } = useDrawAnyImageOnCanvas(img, defaultWidth, drawImageViewModel);
  const { canvasRef } = useImageOnCanvasMoveViewModel(moveImageViewModel);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]); //TODO dependencies

  return <canvas ref={canvasRef} className="image-canvas" />;
};
