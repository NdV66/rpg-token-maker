import { useEffect } from 'react';
import { IAvatarImageComponentViewModel } from 'viewModels';
import { useImageOnCanvasViewModel } from './useImageOnCanvasViewModel';
import { useImageOnCanvasMoveViewModel } from './useImageOnCanvasMoveViewModel';

type Props = {
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarImageComponent = ({ viewModel }: Props) => {
  const { drawImageOnCanvas } = useImageOnCanvasViewModel(viewModel.drawImageOnCanvasViewModel);
  const { canvasRef } = useImageOnCanvasMoveViewModel(viewModel.imageOnCanvasMoveViewModel);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]); //TODO dependencies

  return (
    <div
      className="xx"
      onMouseLeave={() => {
        viewModel.imageOnCanvasMoveViewModel.turnOffIsMouseDown();
      }}
    >
      <canvas ref={canvasRef} className="image-canvas" />
    </div>
  );
};
