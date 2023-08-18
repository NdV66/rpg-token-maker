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

              console.log({ width, height });

              const M: TPosition = {
                x: event.pageX,
                y: event.pageY,
              };

              const A: TPosition = {
                x: imageRect.left + parentRect.left,
                y: imageRect.top + parentRect.top - height,
              };

              switch (key) {
                case EDotsNames.A:
                  const x = Math.abs(M.x - A.x);
                  const y = Math.abs(M.y - A.y);

                  if (M.x < A.x) {
                    console.log('Rozszerzam width');
                    width += 2 * x;
                  } else {
                    console.log('Zmiejszam width');
                    width -= 2 * x;
                  }

                  if (M.y < A.y) {
                    console.log('Zwiększam height');
                    height += 2 * y;
                  } else {
                    console.log('Zmiejszam height');
                    height -= 2 * y;
                  }

                  break;
                case EDotsNames.B:
                  break;
                case EDotsNames.C:
                  break;
                case EDotsNames.D:
                  break;
              }

              const ratio = imageRect.width / imageRect.height;

              width = width < MIN_WIDTH ? MIN_WIDTH : width;

              const minHeightWithRatio = (width * imageRect.height) / imageRect.width; //use ratio;
              height = height < minHeightWithRatio ? minHeightWithRatio : height;

              height = (width * imageRect.height) / imageRect.width; //use ratio;
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
