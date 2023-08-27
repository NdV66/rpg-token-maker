import { useCallback, useEffect } from 'react';
import { EDotsNames, TDotsRef } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';
import { updateDotsPositions } from './tools';

export const useResizeImage = (
  viewModel: IResizeAvatarImageComponentViewModel,
  dotsRefs: React.MutableRefObject<TDotsRef>,
  imageRef: React.RefObject<HTMLCanvasElement>,
) => {
  const subscribeToStyleDots = useCallback(
    (elements: TDotsRef) =>
      viewModel.currentSizeWithTopLeftPosition$.subscribe(({ offset, size }) => {
        const dotsPositions = viewModel.prepareOffsetsForDots(offset, size.width, size.height);
        updateDotsPositions(elements, dotsPositions);
      }),
    [viewModel],
  );

  const subscribeToMouseUp = useCallback(
    (dots: HTMLDivElement[]) =>
      dots.map((dot) =>
        viewModel.fromMouseEvent(dot!, 'mouseup').subscribe(() => {
          viewModel.handleFinishResize();
        }),
      ),
    [viewModel],
  );

  const subscribeToMouseDown = useCallback(
    (dots: HTMLDivElement[], image: HTMLCanvasElement) =>
      dots.map((dot) =>
        viewModel.fromMouseEvent(dot!, 'mousedown').subscribe((event) => {
          viewModel.handleStartResize(image, event, image);
        }),
      ),
    [viewModel],
  );

  const subscribeToMouseMove = useCallback(
    (keys: string[], image: HTMLCanvasElement, elements: TDotsRef) =>
      keys.map((key) => {
        return viewModel
          .fromMouseEvent(elements[key as EDotsNames], 'mousemove')
          .subscribe((event) => {
            viewModel.handleResize(key as EDotsNames, event, image);
          });
      }),
    [viewModel],
  );

  useEffect(() => {
    const elements = dotsRefs.current;
    const dots = Object.values(dotsRefs.current);
    const keys = Object.keys(dotsRefs.current);
    const image = imageRef.current;

    if (keys.length && dots.length && image) {
      const mouseMoveActions$ = subscribeToMouseMove(keys, image, elements);
      const mouseUpActions$ = subscribeToMouseUp(dots);
      const styleDots$ = subscribeToStyleDots(elements);
      const mouseDownActions$ = subscribeToMouseDown(dots, image);

      return () => {
        mouseMoveActions$.forEach((action$) => action$.unsubscribe());
        mouseUpActions$.forEach((action$) => action$.unsubscribe());
        mouseDownActions$.forEach((action$) => action$.unsubscribe());
        styleDots$.unsubscribe();
      };
    }
  }, [
    viewModel,
    dotsRefs,
    imageRef,
    subscribeToStyleDots,
    subscribeToMouseUp,
    subscribeToMouseDown,
    subscribeToMouseMove,
  ]);
};
