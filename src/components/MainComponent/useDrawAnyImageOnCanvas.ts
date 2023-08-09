import { useEffect, useCallback } from 'react';
import { IDrawImageOnCanvasViewModel } from 'viewModels';

export const useDrawAnyImageOnCanvas = (
  imgSrc: string,
  defaultImageWidth: number,
  viewModel: IDrawImageOnCanvasViewModel,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  const adjustCanvasSizeToScreen = useCallback(
    (canvas: HTMLCanvasElement, drawHeight: number) => {
      const values = viewModel.calculateCanvasSize(drawHeight, defaultImageWidth);

      canvas.width = values.width;
      canvas.height = values.height;
      canvas.style.width = `${values.styleWidth}px`;
      canvas.style.height = `${values.styleHeight}px`;

      return values;
    },
    [defaultImageWidth, viewModel],
  );

  const drawImageOnCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const image = new Image();
      image.src = imgSrc;
      image.onload = () => {
        const { drawHeight } = viewModel.prepareImageSize(image, defaultImageWidth);
        const size = adjustCanvasSizeToScreen(canvas, drawHeight);
        ctx.drawImage(image, 0, 0, size.width, size.height);
      };
    },
    [imgSrc, adjustCanvasSizeToScreen, viewModel, defaultImageWidth],
  );

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context) drawImageOnCanvas(context, canvasRef.current!);
  }, [canvasRef, drawImageOnCanvas]);
};
