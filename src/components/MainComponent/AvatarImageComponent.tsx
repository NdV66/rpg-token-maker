import { useEffect } from 'react';
import { IAvatarImageComponentViewModel } from 'viewModels';

import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

import img from 'data/testImg.jpg'; //TODO load
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';

type Props = {
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarImageComponent = ({ viewModel }: Props) => {
  const { drawImageOnCanvas } = useDrawAnyImageOnCanvas(
    img,
    260,
    viewModel.drawImageOnCanvasViewModel,
  );
  const { canvasRef } = useImageOnCanvasMoveViewModel(viewModel.imageOnCanvasMoveViewModel);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]); //TODO dependencies

  return <canvas ref={canvasRef} className="image-canvas" />;
};
