import { useEffect } from 'react';
import { firstValueFrom } from 'rxjs';
import { EDotsNames, TDotsRef, TPosition, TResizeDots } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

// A *** B
// *     *
// D *** C

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

              const M: TPosition = {
                x: event.pageX,
                y: event.pageY,
              };

              const A: TPosition = { x: imageRect.left, y: imageRect.top }; //page X and page y
              const cssA = { x: imageRef.current!.offsetLeft, y: imageRef.current!.offsetTop };

              if (key === EDotsNames.A) {
                const offset: TPosition = {
                  x: Math.abs(M.x - A.x),
                  y: Math.abs(M.y - A.y),
                };

                if (M.x < A.x) {
                  width += 2 * offset.x;
                  cssA.x -= offset.x;
                } else {
                  width -= 2 * offset.x;
                  cssA.x += offset.x;
                }

                if (M.y < A.y) {
                  cssA.y -= offset.y;
                } else {
                  cssA.y += offset.y;
                }
              } else if (key === EDotsNames.B) {
                const B: TPosition = {
                  x: A.x + imageRect.width,
                  y: A.y,
                };

                if (M.x < B.x) {
                } else {
                }

                if (M.y < B.y) {
                } else {
                }
              }

              viewModel.calcResize(width, event, cssA, imageRect);
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
