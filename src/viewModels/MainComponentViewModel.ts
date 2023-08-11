import { TAppEnv } from 'types';
import { IDrawImageOnCanvasViewModel } from './DrawImageOnCanvasViewModel';
import { IAvatarImageOnCanvasMoveViewModel } from './AvatarImageOnCanvasMoveViewModel';
import { IExportCanvasModel } from '../models/ExportCanvasModel';
import { IDrawAvatarOnCanvasViewModel } from './DrawAvatarOnCanvasViewModel';
import { IResizeAvatarViewModel } from './ResizeAvatarViewModel';

export interface IMainComponentViewModel {
  drawAvatarOnCanvasViewModel: IDrawAvatarOnCanvasViewModel;
  drawFrameOnCanvasViewModel: IDrawImageOnCanvasViewModel;
  imageOnCanvasMoveViewModel: IAvatarImageOnCanvasMoveViewModel;
  resizeAvatarViewModel: IResizeAvatarViewModel;

  avatarFrameSize: number;
  defaultAvatarImageWidth: number;
  exportToPng: IExportCanvasModel['exportToPng'];
}

export class MainComponentViewModel implements IMainComponentViewModel {
  constructor(
    private _appEnv: TAppEnv,
    public readonly drawAvatarOnCanvasViewModel: IDrawAvatarOnCanvasViewModel,
    public readonly drawFrameOnCanvasViewModel: IDrawImageOnCanvasViewModel,
    public readonly imageOnCanvasMoveViewModel: IAvatarImageOnCanvasMoveViewModel,
    public readonly resizeAvatarViewModel: IResizeAvatarViewModel,

    private readonly _exportCanvasModel: IExportCanvasModel,
  ) {}

  get avatarFrameSize() {
    return this._appEnv.defaultFrameSize;
  }

  get defaultAvatarImageWidth() {
    return this._appEnv.defaultImageWidth;
  }

  public exportToPng = (currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) => {
    return this._exportCanvasModel.exportToPng(currentImage, currentFrame);
  };
}
