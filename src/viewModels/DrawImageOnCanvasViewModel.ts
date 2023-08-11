import { IImageLoaderModel } from 'models';
import { TCanvasSize } from 'types';

export interface IDrawImageOnCanvasViewModel {
  loadImage: (
    imageSrc: string,
    defaultImageWidth: number,
  ) => Promise<{ drawHeight: number; image: HTMLImageElement }>;
  calculateCanvasSize: (drawHeight: number, defaultImageWidth: number) => TCanvasSize;
}

export class DrawImageOnCanvasViewModel implements IDrawImageOnCanvasViewModel {
  constructor(private readonly _imageLoader: IImageLoaderModel) {}

  public async loadImage(imageSrc: string, defaultImageWidth: number) {
    const image = await this._imageLoader.loadImage(imageSrc);
    const { width, height } = image;
    const drawHeight = (defaultImageWidth * height) / width;

    return {
      drawHeight,
      image,
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
