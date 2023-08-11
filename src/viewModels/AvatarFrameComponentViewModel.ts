import { IDrawImageOnCanvasModel } from 'models';
import { IDrawImageOnCanvasViewModel } from 'types';

export interface IAvatarFrameComponentViewModel extends IDrawImageOnCanvasViewModel {}

export class AvatarFrameComponentViewModel implements IAvatarFrameComponentViewModel {
  constructor(private readonly _drawImageOnCanvasModel: IDrawImageOnCanvasModel) {}

  get canvasSize$() {
    return this._drawImageOnCanvasModel.canvasSize$;
  }

  public async loadImage(imageSrc: string, defaultImageWidth: number) {
    return this._drawImageOnCanvasModel.loadImage(imageSrc, defaultImageWidth);
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    return this._drawImageOnCanvasModel.calculateCanvasSize(drawHeight, defaultImageWidth);
  }
}
