import { useEffect } from 'react';
import { EDotsNames, TDotsRef, TResizeDots } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

const updateDotsPositions = (elements: TDotsRef, dotsPositions: TResizeDots) => {
  const keys = Object.keys(EDotsNames);
  keys.forEach((key) => {
    elements[key as EDotsNames].setAttribute(
      'style',
      ` top: ${dotsPositions[key as EDotsNames].y}px; left: ${
        dotsPositions[key as EDotsNames].x
      }px;`,
    );
  });
};

export const useResizeImage = (
  viewModel: IResizeAvatarImageComponentViewModel,
  dotsRefs: React.MutableRefObject<TDotsRef>,
  imageRef: React.RefObject<HTMLCanvasElement>,
) => {
  useEffect(() => {
    const elements = dotsRefs.current;
    const dots = Object.values(dotsRefs.current);
    const keys = Object.keys(dotsRefs.current);
    const image = imageRef.current;

    if (keys.length && dots.length && image) {
      const mouseMoveActions$ = keys.map((key) => {
        return viewModel
          .fromMouseEvent(elements[key as EDotsNames], 'mousemove')
          .subscribe((event) => {
            viewModel.handleResize(key as EDotsNames, event, image);
          });
      });

      const mouseUpActions$ = dots.map((dot) =>
        viewModel.fromMouseEvent(dot!, 'mouseup').subscribe(() => {
          viewModel.handleFinishResize();
        }),
      );

      const mouseDownActions$ = dots.map((dot) =>
        viewModel.fromMouseEvent(dot!, 'mousedown').subscribe((event) => {
          viewModel.handleStartResize(image, event);
        }),
      );

      const styleDots$ = viewModel.currentSizeWithTopLeftPosition$.subscribe(({ offset, size }) => {
        const dotsPositions = viewModel.prepareOffsetsForDots(offset, size.width, size.height);
        updateDotsPositions(elements, dotsPositions);
      });

      return () => {
        mouseMoveActions$.forEach((action$) => action$.unsubscribe());
        mouseUpActions$.forEach((action$) => action$.unsubscribe());
        mouseDownActions$.forEach((action$) => action$.unsubscribe());
        styleDots$.unsubscribe();
      };
    }
  }, [viewModel, dotsRefs]);
};
