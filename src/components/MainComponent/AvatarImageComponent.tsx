import { useRef, useEffect } from 'react';
import { IAvatarImageComponentViewModel } from 'viewModels';
import { useImageOnCanvasViewModel } from './useImageOnCanvasViewModel';

type Props = {
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarImageComponent = ({ viewModel }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawImageOnCanvas } = useImageOnCanvasViewModel(viewModel.imageOnCanvasViewModel);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]); //TODO dependencies

  return <canvas ref={canvasRef} className="image-canvas" />;
};
