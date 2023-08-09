import { IDrawImageOnCanvasViewModel } from 'viewModels';

export const useImageOnCanvasViewModel = (viewModel: IDrawImageOnCanvasViewModel) => {
  const adjustCanvasSizeToScreen = (canvas: HTMLCanvasElement, drawHeight: number) => {
    const values = viewModel.calculateCanvasSize(drawHeight);

    canvas.width = values.width;
    canvas.height = values.height;
    canvas.style.width = `${values.styleWidth}px`;
    canvas.style.height = `${values.styleHeight}px`;

    return values;
  };

  const drawImageOnCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const image = new Image();
    image.src = viewModel.imgSrc;
    image.onload = () => {
      const { drawWidth } = viewModel.prepareImageSize(image);
      const size = adjustCanvasSizeToScreen(canvas, drawWidth);
      ctx.drawImage(image, 0, 0, size.width, size.height);
    };
  };

  return {
    drawImageOnCanvas,
  };
};
