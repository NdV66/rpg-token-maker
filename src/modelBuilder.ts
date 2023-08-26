import { APP_ENV } from 'appEnv';
import {
  AvatarImageMoveModel,
  DrawImageOnCanvasModel,
  ExportCanvasModel,
  ImageLoaderModel,
  imageResizeModelFabric,
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
const avatarImageMoveModel = new AvatarImageMoveModel();

const avatarFrameComponentViewModel = new AvatarFrameComponentViewModel(drawAvatarFrameModel);
const avatarImageComponentViewModel = new AvatarImageComponentViewModel(
  drawAvatarImageModel,
  avatarImageMoveModel,
);
const resizeAvatarViewModel = new ResizeAvatarImageComponentViewModel(
  avatarImageComponentViewModel,
  avatarImageMoveModel,
  imageResizeModelFabric(APP_ENV),
);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  resizeAvatarViewModel,
  avatarFrameComponentViewModel,
  avatarImageComponentViewModel,
  exportCanvasModel,
);
