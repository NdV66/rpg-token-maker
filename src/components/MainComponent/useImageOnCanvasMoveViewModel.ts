import { useRef } from 'react';
import { IImageOnCanvasMoveViewModel } from 'viewModels';
import { TPosition } from 'types';

export const useImageOnCanvasMoveViewModel = (viewModel: IImageOnCanvasMoveViewModel) => {
  let mousePosition;
  let offset: TPosition = { x: 0, y: 0 };
  let isDown = false;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    const element = canvasRef.current!;
    isDown = true;
    offset = { x: element.offsetLeft - e.clientX, y: element.offsetTop - e.clientY };
  };

  const onMouseUp = (e: React.MouseEvent) => {
    isDown = false;
  };

  const onMouseMove = (event: React.MouseEvent) => {
    const element = canvasRef.current!;
    event.preventDefault();
    console.log(isDown);
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      element.style.left = mousePosition.x + offset.x + 'px';
      element.style.top = mousePosition.y + offset.y + 'px';
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    canvasRef,
    turnOffDown: () => (isDown = false),
  };
};
