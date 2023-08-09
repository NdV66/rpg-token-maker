import { useEffect, useRef } from 'react';
import { IDrawImageOnCanvasViewModel } from 'viewModels';
import { useDrawAnyImageOnCanvas } from './useDrawAnyImageOnCanvas';

import frame from 'data/frame.png'; //TODO load

type Props = {
  viewModel: IDrawImageOnCanvasViewModel;
  size: number;
};

export const AvatarFrameComponent = ({ viewModel, size }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawImageOnCanvas } = useDrawAnyImageOnCanvas(frame, size, viewModel);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]); //TODO dependencies

  return <canvas ref={canvasRef} className="frame" />;
};
