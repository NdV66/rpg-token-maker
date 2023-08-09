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
  public prepareImageSize(image: HTMLImageElement, defaultImageWidth: number) {
    const { width, height } = image;
    const drawHeight = (defaultImageWidth * height) / width;
    return {
      drawHeight,
      drawWidth: defaultImageWidth,
    };
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
    const width = defaultImageWidth * DEVICE_PIXEL_RATIO;
    const height = drawHeight * DEVICE_PIXEL_RATIO;
    const styleWidth = width / DEVICE_PIXEL_RATIO;
    const styleHeight = height / DEVICE_PIXEL_RATIO;

    return {
      width,
      height,
      styleHeight,
      styleWidth,
    };
  }
}
