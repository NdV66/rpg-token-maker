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
const resizeAvatarViewModel = new ResizeAvatarViewModel();

const imageOnCanvasMoveViewModel = new AvatarImageOnCanvasMoveViewModel();

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  drawAvatarOnCanvasViewModel,
  drawFrameCanvasViewModel,
  imageOnCanvasMoveViewModel,
  resizeAvatarViewModel,

  exportCanvasModel,
);
