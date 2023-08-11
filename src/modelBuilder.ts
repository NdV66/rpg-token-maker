import { APP_ENV } from 'appEnv';
import { ImageLoaderModel } from 'models';
import {
  MainComponentViewModel,
  DrawImageOnCanvasViewModel,
  AvatarImageOnCanvasMoveViewModel,
  ExportCanvasViewModel,
} from 'viewModels';

const imageLoaderModel = new ImageLoaderModel();

const drawImageOnCanvasViewModel = new DrawImageOnCanvasViewModel(imageLoaderModel);
const imageOnCanvasMoveViewModel = new AvatarImageOnCanvasMoveViewModel();
const exportCanvasViewModel = new ExportCanvasViewModel(APP_ENV, imageLoaderModel);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  drawImageOnCanvasViewModel,
  imageOnCanvasMoveViewModel,
  exportCanvasViewModel,
);
