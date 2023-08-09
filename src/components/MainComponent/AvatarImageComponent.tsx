import { useRef, useEffect } from 'react';
import { IAvatarImageComponentViewModel } from 'viewModels';
import { useImageOnCanvasViewModel } from './useImageOnCanvasViewModel';
import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

type Props = {
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarImageComponent = ({ viewModel }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawImageOnCanvas } = useImageOnCanvasViewModel(viewModel.drawImageOnCanvasViewModel);
  useImageOnCanvasMoveViewModel(viewModel.imageOnCanvasMoveViewModel, canvasRef);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]); //TODO dependencies

  return <canvas ref={canvasRef} className="image-canvas" />;
};
