import { useEffect } from 'react';
import { from, map } from 'rxjs';
import { IDrawImageOnCanvasViewModel } from 'types';

export const useDrawAnyImageOnCanvas = (
  imgSrc: string,
  defaultImageWidth: number,
  viewModel: IDrawImageOnCanvasViewModel,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context && canvas) {
      const image$ = from(viewModel.loadImage(imgSrc, defaultImageWidth));
      const handleDrawImage$ = image$
        .pipe(
          map((value) => ({
            size: viewModel.calculateCanvasSize(value.drawHeight, defaultImageWidth),
            image: value.image,
          })),
        )
        .subscribe(({ size, image }) => {
          canvas.width = size.width;
          canvas.height = size.height;
          canvas.style.width = `${size.styleWidth}px`;
          canvas.style.height = `${size.styleHeight}px`;

          context.drawImage(image, 0, 0, size.width, size.height);
        });

      return () => {
        handleDrawImage$.unsubscribe();
      };
    }
  }, [canvasRef, defaultImageWidth, imgSrc, viewModel]);
};
