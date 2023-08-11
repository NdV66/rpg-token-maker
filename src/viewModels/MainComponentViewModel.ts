import { TAppEnv } from 'types';
import { IDrawImageOnCanvasViewModel } from './DrawImageOnCanvasViewModel';
import { IAvatarImageOnCanvasMoveViewModel } from './AvatarImageOnCanvasMoveViewModel';
import { IExportCanvasViewModel } from './ExportCanvasViewModel';
import { IDrawAvatarOnCanvasViewModel } from './DrawAvatarOnCanvasViewModel';
import { IResizeAvatarViewModel } from './ResizeAvatarViewModel';

export interface IMainComponentViewModel {
  drawAvatarOnCanvasViewModel: IDrawAvatarOnCanvasViewModel;
  drawFrameOnCanvasViewModel: IDrawImageOnCanvasViewModel;
  imageOnCanvasMoveViewModel: IAvatarImageOnCanvasMoveViewModel;
  exportCanvasViewModel: IExportCanvasViewModel;
  resizeAvatarViewModel: IResizeAvatarViewModel;

  avatarFrameSize: number;
  defaultAvatarImageWidth: number;
}

export class MainComponentViewModel implements IMainComponentViewModel {
  constructor(
    private _appEnv: TAppEnv,
    public readonly drawAvatarOnCanvasViewModel: IDrawAvatarOnCanvasViewModel,
    public readonly drawFrameOnCanvasViewModel: IDrawImageOnCanvasViewModel,
    public readonly imageOnCanvasMoveViewModel: IAvatarImageOnCanvasMoveViewModel,
    public readonly exportCanvasViewModel: IExportCanvasViewModel,
    public readonly resizeAvatarViewModel: IResizeAvatarViewModel,
  ) {}

  get avatarFrameSize() {
    return this._appEnv.defaultFrameSize;
  }

  get defaultAvatarImageWidth() {
    return this._appEnv.defaultImageWidth;
  }
}
