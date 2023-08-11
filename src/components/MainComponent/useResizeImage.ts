import { useEffect } from 'react';
import { EDotsNames, TDotsRef, TResizeDots } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

export const useResizeImage = (
  viewModel: IResizeAvatarImageComponentViewModel,
  dotsRefs: React.MutableRefObject<TDotsRef>,
) => {
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

  useEffect(() => {
    const elements = dotsRefs.current;
    const dots = Object.values(dotsRefs.current);

    if (dots.length) {
      const mouseMoveActions$ = dots.map((dot) =>
        viewModel.fromMouseEvent(dot!, 'mousemove').subscribe((event) => {
          viewModel.calcResize(200, 200);
        }),
      );

      const mouseUpActions$ = dots.map((dot) =>
        viewModel.fromMouseEvent(dot!, 'mouseup').subscribe(() => {
          viewModel.handleFinishResize();
        }),
      );

      const mouseDownActions$ = dots.map((dot) =>
        viewModel.fromMouseEvent(dot!, 'mousedown').subscribe(() => {
          viewModel.handleStartResize();
        }),
      );

      const styleDots$ = viewModel.currentSizeWithOffset$.subscribe(({ offset, size }) => {
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
