import { useEffect, useCallback } from 'react';
import { useStateObservable } from 'tools';
import { IDrawImageOnCanvasViewModel } from 'types';

export const useDrawAnyImageOnCanvas = (
  imgSrc: string,
  defaultImageWidth: number,
  viewModel: IDrawImageOnCanvasViewModel,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  //TODO: maybe handle it with device ratio?
  const drawImageOnCanvas = useCallback(
    async (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, width: number) => {
      const { drawHeight, image } = await viewModel.loadImage(imgSrc, width);
      const sizes = viewModel.calculateCanvasSize(drawHeight, width);

      canvas.width = sizes.width;
      canvas.height = sizes.height;
      canvas.style.width = `${sizes.styleWidth}px`;
      canvas.style.height = `${sizes.styleHeight}px`;

      ctx.drawImage(image, 0, 0, sizes.width, sizes.height);
    },
    [viewModel, imgSrc],
  );

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context) drawImageOnCanvas(context, canvasRef.current!, defaultImageWidth);
  }, [canvasRef, drawImageOnCanvas, defaultImageWidth]);
};
