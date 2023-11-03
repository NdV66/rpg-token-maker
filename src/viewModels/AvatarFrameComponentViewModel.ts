import { IDrawImageOnCanvasModel } from 'models';
import { Observable } from 'rxjs';
import { TCanvasSize } from 'types';

export interface IAvatarFrameComponentViewModel {
  canvasSize$: Observable<TCanvasSize>;
  loadImage: (imageSrc: string, defaultImageWidth: number) => Promise<{ drawHeight: number; image: HTMLImageElement }>;
  calculateCanvasSize: (drawHeight: number, defaultImageWidth: number) => void;
}

export class AvatarFrameComponentViewModel implements IAvatarFrameComponentViewModel {
  public readonly canvasSize$ = this._drawImageOnCanvasModel.canvasSize$;

  constructor(private readonly _drawImageOnCanvasModel: IDrawImageOnCanvasModel) {}

  public loadImage(imageSrc: string, defaultImageWidth: number) {
    return this._drawImageOnCanvasModel.loadImage(imageSrc, defaultImageWidth);
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    return this._drawImageOnCanvasModel.calculateCanvasSize(drawHeight, defaultImageWidth);
  }
}
