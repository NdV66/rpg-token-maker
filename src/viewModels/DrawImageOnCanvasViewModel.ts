import { TAppEnv } from 'types';

type TDrawSize = {
  drawWidth: number;
  drawHeight: number;
};

type TCanvasSize = {
  width: number;
  height: number;
  styleHeight: number;
  styleWidth: number;
};

export interface IDrawImageOnCanvasViewModel {
  prepareImageSize: (image: HTMLImageElement, defaultImageWidth: number) => TDrawSize;
  calculateCanvasSize: (drawHeight: number, defaultImageWidth: number) => TCanvasSize;
}

export class DrawImageOnCanvasViewModel implements IDrawImageOnCanvasViewModel {
  constructor(private readonly _appEnv: TAppEnv) {}

  public prepareImageSize(image: HTMLImageElement, defaultImageWidth: number) {
    const { width, height } = image;
    const drawHeight = (defaultImageWidth * height) / width;

    return {
      drawHeight,
      drawWidth: defaultImageWidth,
    };
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    const width = defaultImageWidth;
    const height = drawHeight;

    return {
      width,
      height,
      styleHeight: drawHeight,
      styleWidth: defaultImageWidth,
    };
  }
}
