import { useEffect } from 'react';
import { firstValueFrom } from 'rxjs';
import { EDotsNames, TDotsRef, TResizeDots } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

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
          .subscribe(async (event) => {
            if (viewModel.testMouseDown) {
              const { size, offset } = await firstValueFrom(viewModel.currentSizeWithOffset$);
              //TODO xD not this way
              console.log('OFFSET', offset); //by pageXY

              let newWidth = 0;
              let newHeight = 0;
              let newImageTop = 0;
              let newImageLeft = 0;

              const imageRect = image.getBoundingClientRect();
              const parentRect = image.parentElement!.getBoundingClientRect();

              const summaryTop = imageRect.top + parentRect.top; //TODO maybe save and use last parentXY from resize image
              const summaryLeft = imageRect.left + parentRect.left;

              const newLeftYDifference = summaryTop - event.pageY;
              const newLeftXDifference = summaryLeft - event.pageX;

              console.log({ newLeftYDifference, newLeftXDifference });

              switch (key) {
                case EDotsNames.A:
                  let differenceY = summaryTop - event.pageY;
                  let differenceX = summaryLeft - event.pageX;

                  if (differenceY < 0) {
                    newHeight = size.height - Math.abs(differenceY);
                  } else {
                    newHeight = size.height + differenceY;
                  }

                  if (differenceX < 0) {
                    newWidth = size.width + Math.abs(differenceX);
                  } else {
                    newWidth = size.width + differenceX;
                  }

                  break;
                case EDotsNames.B:
                  //TODO
                  //   const bx = event.pageX + size.width;
                  //   newHeight = summaryTop - event.pageY + size.height;
                  //   newWidth = summaryLeft - bx + size.width;
                  break;
                case EDotsNames.C:
                  break;
                case EDotsNames.D:
                  console.log('bottom left');
                  break;
              }

              newHeight = newHeight < 100 ? 100 : newHeight;
              newWidth = newWidth < 100 ? 100 : newWidth;

              console.log({ newWidth, newHeight });
              console.log({ newImageLeft, newImageTop });
              viewModel.calcResize(newWidth, newHeight, newImageTop, newImageLeft, event);
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
