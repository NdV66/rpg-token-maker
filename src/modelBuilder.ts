import { APP_ENV } from 'appEnv';
import { ImageLoaderModel } from 'models';
import {
  MainComponentViewModel,
  DrawImageOnCanvasViewModel,
  AvatarImageOnCanvasMoveViewModel,
  ExportCanvasViewModel,
  DrawAvatarOnCanvasViewModel,
} from 'viewModels';

const imageLoaderModel = new ImageLoaderModel();

const drawAvatarOnCanvasViewModel = new DrawAvatarOnCanvasViewModel(imageLoaderModel);
const drawFrameCanvasViewModel = new DrawImageOnCanvasViewModel(imageLoaderModel);

const imageOnCanvasMoveViewModel = new AvatarImageOnCanvasMoveViewModel();
const exportCanvasViewModel = new ExportCanvasViewModel(APP_ENV, imageLoaderModel);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  drawAvatarOnCanvasViewModel,
  drawFrameCanvasViewModel,
  imageOnCanvasMoveViewModel,
  exportCanvasViewModel,
);
