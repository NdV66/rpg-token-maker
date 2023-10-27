import { useEffect } from 'react';
import { from, identity, map, mergeMap, tap } from 'rxjs';
import { IDrawImageOnCanvasViewModel, TCanvasSize } from 'types';

//https://github.com/Automattic/node-canvas/issues/1271

export const useDrawAnyImageOnCanvas = (imgSrc: string, defaultImageWidth: number, viewModel: IDrawImageOnCanvasViewModel, canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const drawImageOnCanvas = (canvas: HTMLCanvasElement, size: TCanvasSize, context: CanvasRenderingContext2D, image: HTMLImageElement) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.width = `${size.styleWidth}px`;
    canvas.style.height = `${size.styleHeight}px`;

    context.drawImage(image, 0, 0, size.width, size.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context && canvas) {
      const image$ = from(viewModel.loadImage(imgSrc, defaultImageWidth));

      const handleDrawImage$ = image$
        .pipe(
          tap((value) => {
            viewModel.calculateCanvasSize(value.drawHeight, defaultImageWidth);
          }),
          map((value) => viewModel.canvasSize$.pipe(map((size) => ({ size, image: value.image })))),
          mergeMap(identity),
        )
        .subscribe(({ size, image }) => {
          drawImageOnCanvas(canvas, size, context, image);
        });

      return () => {
        handleDrawImage$.unsubscribe();
      };
    }
  }, [canvasRef, defaultImageWidth, imgSrc, viewModel]);
};
