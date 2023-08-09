import { TAppEnv } from 'types';
import { IDrawImageOnCanvasViewModel } from './DrawImageOnCanvasViewModel';
import { IImageOnCanvasMoveViewModel } from './ImageOnCanvasMoveViewModel';

export interface IMainComponentViewModel {
  drawImageOnCanvasViewModel: IDrawImageOnCanvasViewModel;
  imageOnCanvasMoveViewModel: IImageOnCanvasMoveViewModel;
  avatarFrameSize: number;
  defaultAvatarImageWidth: number;
}

export class MainComponentViewModel implements IMainComponentViewModel {
  constructor(
    private _appEnv: TAppEnv,
    public readonly drawImageOnCanvasViewModel: IDrawImageOnCanvasViewModel,
    public readonly imageOnCanvasMoveViewModel: IImageOnCanvasMoveViewModel,
  ) {}

  get avatarFrameSize() {
    return this._appEnv.defaultFrameSize;
  }

  get defaultAvatarImageWidth() {
    return this._appEnv.defaultImageWidth;
  }
}
