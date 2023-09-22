import { APP_ENV } from 'appEnv';
import {
  ImageMoveModel,
  DrawImageOnCanvasModel,
  ExportCanvasModel,
  ImageLoaderModel,
  imageResizeModelFactory,
  TopLeftCssCalculatorModel,
} from 'models';
import { ResizeImageCalculationModel } from 'models/ResizeImageCalculationModel';

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
const topLeftCssCalculatorModel = new TopLeftCssCalculatorModel();
const resizeImageCalculationModel = new ResizeImageCalculationModel();

const avatarFrameComponentViewModel = new AvatarFrameComponentViewModel(drawAvatarFrameModel);
const avatarImageComponentViewModel = new AvatarImageComponentViewModel(
  drawAvatarImageModel,
  imageMoveModel,
);
const resizeAvatarViewModel = new ResizeAvatarImageComponentViewModel(
  avatarImageComponentViewModel,
  imageMoveModel,
  imageResizeModelFactory(APP_ENV, resizeImageCalculationModel),
  topLeftCssCalculatorModel,
);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  resizeAvatarViewModel,
  avatarFrameComponentViewModel,
  avatarImageComponentViewModel,
  exportCanvasModel,
);
