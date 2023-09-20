import { useEffect } from 'react';
import { IAvatarImageComponentViewModel } from 'viewModels';

export const useImageOnCanvasMoveViewModel = (
  viewModel: IAvatarImageComponentViewModel,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  useEffect(() => {
    const element = canvasRef.current;

    if (element) {
      const offset = { x: element.offsetLeft, y: element.offsetTop };
      viewModel.setInitialElementOffset(offset);

      const mouseUp$ = viewModel.fromMouseEvent(element, 'mouseup').subscribe(() => {
        viewModel.turnOffIsMouseDown();
      });

      const mouseDown$ = viewModel.fromMouseEvent(element, 'mousedown').subscribe((event) => {
        viewModel.handleMouseDown(element, event);
      });

      const mouseMove$ = viewModel.fromMouseEvent(element, 'mousemove').subscribe((event) => {
        viewModel.handleMouseMove(event);
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
