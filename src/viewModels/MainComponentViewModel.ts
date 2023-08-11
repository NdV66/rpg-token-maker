import { TAppEnv } from 'types';
import { IDrawImageOnCanvasViewModel } from './DrawImageOnCanvasViewModel';
import { IAvatarImageOnCanvasMoveViewModel } from './AvatarImageOnCanvasMoveViewModel';
import { IExportCanvasViewModel } from './ExportCanvasViewModel';

export interface IMainComponentViewModel {
  drawImageOnCanvasViewModel: IDrawImageOnCanvasViewModel;
  imageOnCanvasMoveViewModel: IAvatarImageOnCanvasMoveViewModel;
  exportCanvasViewModel: IExportCanvasViewModel;

  avatarFrameSize: number;
  defaultAvatarImageWidth: number;
}

export class MainComponentViewModel implements IMainComponentViewModel {
  constructor(
    private _appEnv: TAppEnv,
    public readonly drawImageOnCanvasViewModel: IDrawImageOnCanvasViewModel,
    public readonly imageOnCanvasMoveViewModel: IAvatarImageOnCanvasMoveViewModel,
    public readonly exportCanvasViewModel: IExportCanvasViewModel,
  ) {}

  get avatarFrameSize() {
    return this._appEnv.defaultFrameSize;
  }

  get defaultAvatarImageWidth() {
    return this._appEnv.defaultImageWidth;
  }
}
