import { APP_ENV } from 'appEnv';
import {
  ImageMoveModel,
  DrawImageOnCanvasModel,
  ExportCanvasModel,
  ImageLoaderModel,
  imageResizeModelFactory,
  TopLeftCssCalculatorModel,
  ResizeImageCalculationPointsModel,
  ResizeImageCalculationsModel,
  ImageUploadModel,
} from 'models';
import { ResizeComponentViewModel, ResizeAvatarImageComponentViewModel, AvatarFrameComponentViewModel, AvatarImageComponentViewModel } from 'viewModels';

const imageLoaderModel = new ImageLoaderModel();
const exportCanvasModel = new ExportCanvasModel(APP_ENV, imageLoaderModel);
const drawAvatarFrameModel = new DrawImageOnCanvasModel(imageLoaderModel);
const drawAvatarImageModel = new DrawImageOnCanvasModel(imageLoaderModel);
const imageMoveModel = new ImageMoveModel();
const topLeftCssCalculatorModel = new TopLeftCssCalculatorModel();
const resizeImageCalculationPointsModel = new ResizeImageCalculationPointsModel();
const resizeImageCalculationsModel = new ResizeImageCalculationsModel();
const imageUploadImageModel = new ImageUploadModel();

const avatarFrameComponentViewModel = new AvatarFrameComponentViewModel(drawAvatarFrameModel);
const avatarImageComponentViewModel = new AvatarImageComponentViewModel(drawAvatarImageModel, imageMoveModel);
const resizeAvatarViewModel = new ResizeAvatarImageComponentViewModel(
  avatarImageComponentViewModel,
  imageMoveModel,
  imageResizeModelFactory(APP_ENV, resizeImageCalculationPointsModel, resizeImageCalculationsModel),
  topLeftCssCalculatorModel,
);

export const resizeComponentViewModel = new ResizeComponentViewModel(
  APP_ENV,
  resizeAvatarViewModel,
  avatarFrameComponentViewModel,
  avatarImageComponentViewModel,
  exportCanvasModel,
  imageUploadImageModel,
);
