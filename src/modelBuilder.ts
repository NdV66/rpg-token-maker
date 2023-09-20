import { APP_ENV } from 'appEnv';
import {
  ImageMoveModel,
  DrawImageOnCanvasModel,
  ExportCanvasModel,
  ImageLoaderModel,
  imageResizeModelFactory,
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
const imageMoveModel = new ImageMoveModel();

const avatarFrameComponentViewModel = new AvatarFrameComponentViewModel(drawAvatarFrameModel);
const avatarImageComponentViewModel = new AvatarImageComponentViewModel(
  drawAvatarImageModel,
  imageMoveModel,
);
const resizeAvatarViewModel = new ResizeAvatarImageComponentViewModel(
  avatarImageComponentViewModel,
  imageMoveModel,
  imageResizeModelFactory(),
);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  resizeAvatarViewModel,
  avatarFrameComponentViewModel,
  avatarImageComponentViewModel,
  exportCanvasModel,
);
