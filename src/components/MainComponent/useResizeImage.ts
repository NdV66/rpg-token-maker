import { useEffect } from 'react';
import { firstValueFrom } from 'rxjs';
import { EDotsNames, TDotsRef, TPosition, TResizeDots } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;

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
          .subscribe(async (event) => {
            if (viewModel.testMouseDown) {
              const imageRect = image.getBoundingClientRect();

              let width = imageRect.width;
              let height = imageRect.height;
              const ratio = width / height;

              const M: TPosition = {
                x: event.pageX,
                y: event.pageY,
              };

              const A: TPosition = viewModel.topLeftOffset;
              const newA = { x: 0, y: 0 };

              if (key === EDotsNames.A) {
                const offset: TPosition = {
                  x: Math.abs(M.x - A.x),
                  y: Math.abs(M.y - A.y),
                };

                if (M.x < A.x) {
                  // zwieksz width
                  width += 2 * offset.x;
                } else {
                  width -= 2 * offset.x;
                }

                if (M.y < A.y) {
                  //zwieksz height
                  height += 2 * offset.y;
                } else {
                  height -= 2 * offset.y;
                }

                newA.x = event.pageX - offset.x;
                newA.y = event.pageY - offset.y;

                console.log('NEW A: ', newA, 'OLD A: ', A);
              }

              width = width < MIN_WIDTH ? MIN_WIDTH : width;
              height = width / ratio;

              viewModel.calcResize(width, height, event, newA);
            }
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

          viewModel.topLeftOffset = {
            x: imageRef.current!.offsetLeft,
            y: imageRef.current!.offsetTop,
          };
          console.log(' viewModel.currentTopLeft', viewModel.topLeftOffset);
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
