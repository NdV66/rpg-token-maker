import { useEffect, useRef } from 'react';
import { IAvatarImageComponentViewModel } from 'viewModels';
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';

import frame from 'data/frame.png'; //TODO load

type Props = {
  viewModel: IAvatarImageComponentViewModel;
};

export const AvatarFrameComponent = ({ viewModel }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawImageOnCanvas } = useDrawAnyImageOnCanvas(
    frame,
    200,
    viewModel.drawImageOnCanvasViewModel,
  );

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]); //TODO dependencies

  return <canvas ref={canvasRef} className="frame" />;
};
