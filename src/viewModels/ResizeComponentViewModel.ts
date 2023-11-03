import { TAppEnv } from 'types';
import { IAvatarFrameComponentViewModel } from './AvatarFrameComponentViewModel';
import { IAvatarImageComponentViewModel } from './AvatarImageComponentViewModel';
import { IResizeAvatarImageComponentViewModel } from './ResizeAvatarImageComponentViewModel';

import { IExportCanvasModel } from 'models';

export interface IExportToPngViewModel {
  exportToPng: IExportCanvasModel['exportToPng'];
}

export interface IResizeComponentViewModel extends IExportToPngViewModel {
  resizeAvatarViewModel: IResizeAvatarImageComponentViewModel;
  avatarFrameComponentViewModel: IAvatarFrameComponentViewModel;
  avatarImageComponentViewModel: IAvatarImageComponentViewModel;

  avatarFrameSize: number;
  defaultAvatarImageWidth: number;
}

export class ResizeComponentViewModel implements IResizeComponentViewModel {
  constructor(
    private _appEnv: TAppEnv,
    public readonly resizeAvatarViewModel: IResizeAvatarImageComponentViewModel,
    public readonly avatarFrameComponentViewModel: IAvatarFrameComponentViewModel,
    public readonly avatarImageComponentViewModel: IAvatarImageComponentViewModel,
    private readonly _exportCanvasModel: IExportCanvasModel,
  ) {}

  public readonly avatarFrameSize = this._appEnv.defaultFrameSize;
  public readonly defaultAvatarImageWidth = this._appEnv.defaultImageWidth;

  public exportToPng = (currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) => {
    return this._exportCanvasModel.exportToPng(currentImage, currentFrame);
  };
}
