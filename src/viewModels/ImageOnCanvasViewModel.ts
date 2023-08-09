import { TAppEnv } from 'types';

import img from 'data/testImg.jpg'; //TODO tmp

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

export interface IImageOnCanvasViewModel {
  imgSrc: string;

  prepareImageSize: (image: HTMLImageElement) => TDrawSize;
  calculateCanvasSize: (drawHeight: number) => TCanvasSize;
}

export class ImageOnCanvasViewModel implements IImageOnCanvasViewModel {
  constructor(private readonly _appEnv: TAppEnv) {}

  public readonly imgSrc = img;

  public prepareImageSize(image: HTMLImageElement) {
    const { width, height } = image;
    const drawHeight = (this._appEnv.defaultImageWidth * height) / width;
    return {
      drawHeight,
      drawWidth: this._appEnv.defaultImageWidth,
    };
  }

  public calculateCanvasSize(drawHeight: number) {
    const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
    const width = this._appEnv.defaultImageWidth * DEVICE_PIXEL_RATIO;
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
