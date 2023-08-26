import { APP_ENV } from 'appEnv';
import {
  AvatarImageMoveModel,
  DrawImageOnCanvasModel,
  ExportCanvasModel,
  ImageLoaderModel,
  ResizeImageModel,
} from 'models';

import {
  MainComponentViewModel,
  ResizeAvatarImageComponentViewModel,
  AvatarFrameComponentViewModel,
  AvatarImageComponentViewModel,
} from 'viewModels';

const imageLoaderModel = new ImageLoaderModel();
const exportCanvasModel = new ExportCanvasModel(APP_ENV, imageLoaderModel);
const drawAvatarFrameModel = new DrawImageOnCanvasModel(imageLoaderModel);
const drawAvatarImageModel = new DrawImageOnCanvasModel(imageLoaderModel);
const resizeImageModel = new ResizeImageModel();

const avatarImageMoveModel = new AvatarImageMoveModel();

const avatarFrameComponentViewModel = new AvatarFrameComponentViewModel(drawAvatarFrameModel);
const avatarImageComponentViewModel = new AvatarImageComponentViewModel(
  drawAvatarImageModel,
  avatarImageMoveModel,
);
const resizeAvatarViewModel = new ResizeAvatarImageComponentViewModel(
  avatarImageComponentViewModel,
  avatarImageMoveModel,
  resizeImageModel,
);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  resizeAvatarViewModel,
  avatarFrameComponentViewModel,
  avatarImageComponentViewModel,
  exportCanvasModel,
);
