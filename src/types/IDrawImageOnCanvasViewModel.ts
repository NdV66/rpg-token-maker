import { Observable } from 'rxjs';
import { TCanvasSize } from './TCanvasSize';

export interface IDrawImageOnCanvasViewModel {
  canvasSize$: Observable<TCanvasSize>;
  loadImage: (
    imageSrc: string,
    defaultImageWidth: number,
  ) => Promise<{ drawHeight: number; image: HTMLImageElement }>;
  calculateCanvasSize: (drawHeight: number, defaultImageWidth: number) => TCanvasSize;
}
