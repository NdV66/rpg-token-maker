import { IDrawImageOnCanvasModel } from 'models';
import { IDrawImageOnCanvasViewModel } from 'types';

export interface IAvatarFrameComponentViewModel extends IDrawImageOnCanvasViewModel {}

export class AvatarFrameComponentViewModel implements IAvatarFrameComponentViewModel {
  public readonly canvasSize$ = this._drawImageOnCanvasModel.canvasSize$;

  constructor(private readonly _drawImageOnCanvasModel: IDrawImageOnCanvasModel) {}

  public async loadImage(imageSrc: string, defaultImageWidth: number) {
    return this._drawImageOnCanvasModel.loadImage(imageSrc, defaultImageWidth);
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    return this._drawImageOnCanvasModel.calculateCanvasSize(drawHeight, defaultImageWidth);
  }
}
