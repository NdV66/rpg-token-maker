import { useEffect } from 'react';
import { IAvatarImageOnCanvasMoveViewModel } from 'viewModels';

export const useImageOnCanvasMoveViewModel = (
  viewModel: IAvatarImageOnCanvasMoveViewModel,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  useEffect(() => {
    const element = canvasRef.current;

    if (element) {
      const mouseUp$ = viewModel.fromMouseEvent(element, 'mouseup').subscribe(() => {
        viewModel.turnOffIsMouseDown();
      });

      const mouseDown$ = viewModel.fromMouseEvent(element, 'mousedown').subscribe((event) => {
        viewModel.handleMouseDown(element, event);
      });

      const mouseMove$ = viewModel.fromMouseEvent(element, 'mousemove').subscribe((event) => {
        viewModel.handleMoveElement(event);
      });

      const subscribeToOffset$ = viewModel.elementOffset$.subscribe((offset) => {
        element.style.left = `${offset.x}px`;
        element.style.top = `${offset.y}px`;
      });

      return () => {
        mouseUp$.unsubscribe();
        mouseDown$.unsubscribe();
        mouseMove$.unsubscribe();
        subscribeToOffset$.unsubscribe();
      };
    }
  }, [viewModel, canvasRef]);
};
