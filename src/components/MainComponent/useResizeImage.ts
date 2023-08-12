import { useEffect } from 'react';
import { firstValueFrom } from 'rxjs';
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
    const keys = Object.keys(dotsRefs.current);

    if (keys.length && dots.length) {
      const mouseMoveActions$ = keys.map((key) => {
        return viewModel
          .fromMouseEvent(elements[key as EDotsNames], 'mousemove')
          .subscribe(async (event) => {
            const { size, offset } = await firstValueFrom(viewModel.currentSizeWithOffset$);
            //TODO xD not this way

            const mouseX = event.clientX - offset.x;
            const mouseY = event.clientY - offset.y;
            const imageX = 0;
            const imageY = 0;

            switch (key) {
              case EDotsNames.A:
                console.log('top left');
                break;
              case EDotsNames.B:
                console.log('top right');
                break;
              case EDotsNames.C:
                console.log('bottom right');
                break;
              case EDotsNames.D:
                console.log('bottom left');
                break;
            }

            //bottom-right
            const newWidth = mouseX - imageX;
            const newHeight = mouseY - imageY;

            console.log(newWidth, newHeight);

            viewModel.calcResize(size.height + 1, size.width + 1);
          });
      });

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
