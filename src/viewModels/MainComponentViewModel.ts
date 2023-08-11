import { TAppEnv } from 'types';
import { IAvatarFrameComponentViewModel } from './AvatarFrameComponentViewModel';
import { IAvatarImageComponentViewModel } from './AvatarImageComponentViewModel';
import { IResizeAvatarImageComponentViewModel } from './ResizeAvatarImageComponentViewModel';

import { IExportCanvasModel } from 'models';

export interface IMainComponentViewModel {
  resizeAvatarViewModel: IResizeAvatarImageComponentViewModel;
  avatarFrameComponentViewModel: IAvatarFrameComponentViewModel;
  avatarImageComponentViewModel: IAvatarImageComponentViewModel;

  avatarFrameSize: number;
  defaultAvatarImageWidth: number;
  exportToPng: IExportCanvasModel['exportToPng'];
}

export class MainComponentViewModel implements IMainComponentViewModel {
  constructor(
    private _appEnv: TAppEnv,
    public readonly resizeAvatarViewModel: IResizeAvatarImageComponentViewModel,
    public readonly avatarFrameComponentViewModel: IAvatarFrameComponentViewModel,
    public readonly avatarImageComponentViewModel: IAvatarImageComponentViewModel,

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
