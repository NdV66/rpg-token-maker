import { TCanvasSize } from './TCanvasSize';

export interface IDrawImageOnCanvasViewModel {
  loadImage: (
    imageSrc: string,
    defaultImageWidth: number,
  ) => Promise<{ drawHeight: number; image: HTMLImageElement }>;
  calculateCanvasSize: (drawHeight: number, defaultImageWidth: number) => TCanvasSize;
}
