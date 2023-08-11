import { APP_ENV } from 'appEnv';
import { ExportCanvasModel, ImageLoaderModel } from 'models';
import {
  MainComponentViewModel,
  DrawImageOnCanvasViewModel,
  AvatarImageOnCanvasMoveViewModel,
  DrawAvatarOnCanvasViewModel,
  ResizeAvatarViewModel,
} from 'viewModels';

const imageLoaderModel = new ImageLoaderModel();
const exportCanvasModel = new ExportCanvasModel(APP_ENV, imageLoaderModel);

const drawAvatarOnCanvasViewModel = new DrawAvatarOnCanvasViewModel(imageLoaderModel);
const drawFrameCanvasViewModel = new DrawImageOnCanvasViewModel(imageLoaderModel);

const avatarOnCanvasMoveViewModel = new AvatarImageOnCanvasMoveViewModel();

const resizeAvatarViewModel = new ResizeAvatarViewModel(
  drawAvatarOnCanvasViewModel,
  avatarOnCanvasMoveViewModel,
);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  drawAvatarOnCanvasViewModel,
  drawFrameCanvasViewModel,
  avatarOnCanvasMoveViewModel,
  resizeAvatarViewModel,

  exportCanvasModel,
);
