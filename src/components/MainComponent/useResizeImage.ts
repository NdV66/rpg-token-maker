import { useEffect } from 'react';
import { firstValueFrom } from 'rxjs';
import { EDotsNames, TDotsRef, TPosition, TResizeDots } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;

export const useResizeImage = (
  viewModel: IResizeAvatarImageComponentViewModel,
  dotsRefs: React.MutableRefObject<TDotsRef>,
  imageRef: React.RefObject<HTMLCanvasElement>,
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
    const keys = Object.keys(dotsRefs.current);
    const image = imageRef.current;

    if (keys.length && dots.length && image) {
      const mouseMoveActions$ = keys.map((key) => {
        return viewModel
          .fromMouseEvent(elements[key as EDotsNames], 'mousemove')
          .subscribe((event) => {
            if (viewModel.testMouseDown) {
              const imageRect = image.getBoundingClientRect();
              const parentRect = image.parentElement!.getBoundingClientRect();

              let width = imageRect.width;
              let height = imageRect.height;

              const M: TPosition = {
                x: event.pageX,
                y: event.pageY,
              };

              const A: TPosition = {
                x: imageRect.left + parentRect.left,
                y: imageRect.top + parentRect.top - height,
              };

              if (key === EDotsNames.A) {
                const x = Math.abs(M.x - A.x);
                const y = Math.abs(M.y - A.y);

                if (M.x < A.x) {
                  width += 2 * x;
                } else {
                  width -= 2 * x;
                }

                if (M.y < A.y) {
                  height += 2 * y;
                } else {
                  height -= 2 * y;
                }
              } else if (key === EDotsNames.B) {
                const B: TPosition = {
                  x: A.x + imageRect.width,
                  y: A.y,
                };
                const x = Math.abs(M.x - B.x);
                const y = Math.abs(M.y - B.y);

                if (M.x < B.x) {
                  width -= 2 * x;
                } else {
                  width += 2 * x;
                }

                if (M.y < B.y) {
                  height -= 2 * y;
                } else {
                  height += 2 * y;
                }
              }

              //   if (width < MIN_WIDTH) {
              //     width = MIN_WIDTH;
              //     const minHeightWithRatio = (width * imageRect.height) / imageRect.width; //use ratio;
              //     height = height < minHeightWithRatio ? minHeightWithRatio : height;
              //   } else {
              //     height = (width * imageRect.height) / imageRect.width; //use ratio;
              //   }

              height = height < MIN_HEIGHT ? MIN_HEIGHT : height; //TODO ratio
              width = width < MIN_WIDTH ? MIN_WIDTH : width;

              //TODO better with ratio
              height = (width * imageRect.height) / imageRect.width;
              height = Math.floor(height);

              viewModel.calcResize(width, height, event);
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
