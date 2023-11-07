import { TAppEnv } from 'types';
import { IAvatarFrameComponentViewModel } from './AvatarFrameComponentViewModel';
import { IAvatarImageComponentViewModel } from './AvatarImageComponentViewModel';
import { IResizeAvatarImageComponentViewModel } from './ResizeAvatarImageComponentViewModel';

import { IExportCanvasModel, IImageUploadModel } from 'models';
import { Observable } from 'rxjs';

export interface IExportToPngViewModel {
  exportToPng: IExportCanvasModel['exportToPng'];
}

export interface IImageUploadViewModel {
  uploadImage: IImageUploadModel['uploadImage'];
}

export interface IResizeComponentViewModel extends IExportToPngViewModel, IImageUploadViewModel {
  resizeAvatarViewModel: IResizeAvatarImageComponentViewModel;
  avatarFrameComponentViewModel: IAvatarFrameComponentViewModel;
  avatarImageComponentViewModel: IAvatarImageComponentViewModel;

  avatarFrameSize: number;
  defaultAvatarImageWidth: number;
  currentImageSrc: Observable<string>;
}

export class ResizeComponentViewModel implements IResizeComponentViewModel {
  constructor(
    private _appEnv: TAppEnv,
    public readonly resizeAvatarViewModel: IResizeAvatarImageComponentViewModel,
    public readonly avatarFrameComponentViewModel: IAvatarFrameComponentViewModel,
    public readonly avatarImageComponentViewModel: IAvatarImageComponentViewModel,

    private readonly _exportCanvasModel: IExportCanvasModel,
    private readonly _imageUploadModel: IImageUploadModel,
  ) {}

  public readonly avatarFrameSize = this._appEnv.defaultFrameSize;
  public readonly defaultAvatarImageWidth = this._appEnv.defaultImageWidth;
  public readonly currentImageSrc = this._imageUploadModel.currentImageSrc;

  public exportToPng = (currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) => {
    return this._exportCanvasModel.exportToPng(currentImage, currentFrame);
  };

  public uploadImage = (file?: File) => {
    this._imageUploadModel.uploadImage(file);
  };
}
