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
              const parentRect = image.parentElement!.getBoundingClientRect();
              const { offset } = await firstValueFrom(viewModel.currentSizeWithOffset$);

              let width = imageRect.width;
              let height = imageRect.height;
              const topLeftOffset = viewModel.topLeftOffset;

              const M: TPosition = {
                x: event.pageX,
                y: event.pageY,
              };

              const A: TPosition = { x: 0, y: 0 };
              const newA = { x: 0, y: 0 };

              if (key === EDotsNames.A) {
                const x = Math.abs(M.x - A.x);
                const y = Math.abs(M.y - A.y);

                if (M.x < A.x) {
                  // zwieksz width
                  width += 2 * x;
                } else {
                  width -= 2 * x;
                }

                if (M.y < A.y) {
                  //zwieksz height
                  height += 2 * y;
                } else {
                  height -= 2 * y;
                }

                newA.x = M.x - topLeftOffset.x;
                newA.y = M.y - topLeftOffset.y;

                console.log('NEW A: ', newA, 'OLD A: ', A);
              }

              width = width < MIN_WIDTH ? MIN_WIDTH : width;
              height = (width * imageRect.height) / imageRect.width; //TODO better with ratio
              height = Math.floor(height);

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
            //odniesienie do tego, ze teraz to left top jest 0, 0 obrazka
            x: imageRef.current!.offsetLeft - event.pageX,
            y: imageRef.current!.offsetTop - event.pageY,
          };
          console.log(
            ' viewModel.currentTopLeft',
            viewModel.topLeftOffset,
            imageRef.current!.offsetLeft,
            {
              pageX: event.pageX,
              pageY: event.pageY,
            },
          );
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
