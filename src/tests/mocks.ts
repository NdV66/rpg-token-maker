import { TAppEnv } from 'types';
import { enEN } from 'data';
import {
  IDrawImageOnCanvasModel,
  IExportCanvasModel,
  IImageLoaderModel,
  IImageMoveModel,
  IImageResizeModelFactory,
  IImageUploadModel,
  IResizeImageModel,
  ITopLeftCssCalculatorModel,
} from 'models';
import { Subject } from 'rxjs';
import { IAvatarFrameComponentViewModel, IAvatarImageComponentViewModel, IResizeAvatarImageComponentViewModel } from 'viewModels';
import { DARK_THEME } from 'data/theme';

export const commonErrorMock = new Error('mocked error');

export const appEnvMock: TAppEnv = {
  translations: enEN,
  theme: DARK_THEME,
  defaultImageWidth: 300,
  defaultFrameSize: 200,
  workspaceSizeWidth: 800,
  workspaceSizeHeight: 800,
  minImageSize: 100,
};

export const imageLoaderModelMock: IImageLoaderModel = {
  loadImage: jest.fn(),
};

export const drawImageOnCanvasModelMock: IDrawImageOnCanvasModel = {
  calculateCanvasSize: jest.fn(),
  canvasSize$: new Subject(),
  loadImage: jest.fn(),
};

export const imageMoveModelMock: IImageMoveModel = {
  elementOffset$: new Subject(),
  setInitialElementOffset: jest.fn(),
  finishMoveImage: jest.fn(),
  moveImage: jest.fn(),
  startMoveImage: jest.fn(),
  updateElementPosition: jest.fn(),
  fromMouseEvent: jest.fn(),
  turnOffIsMouseDown: jest.fn(),
  turnOnIsMouseDown: jest.fn(),
};

export const resizeAvatarViewModelMock: IResizeAvatarImageComponentViewModel = {
  fromMouseEvent: jest.fn(),
  turnOffIsMouseDown: jest.fn(),
  turnOnIsMouseDown: jest.fn(),
  currentSizeWithTopLeftPosition$: new Subject(),
  handleResize: jest.fn(),
  handleStartResize: jest.fn(),
  handleFinishResize: jest.fn(),
  prepareOffsetsForDots: jest.fn(),
};

export const imageUploadModelMock: IImageUploadModel = {
  uploadImage: jest.fn(),
  currentImageSrc: new Subject(),
};

export const avatarFrameComponentViewModelMock: IAvatarFrameComponentViewModel = {
  calculateCanvasSize: jest.fn(),
  canvasSize$: new Subject(),
  loadImage: jest.fn(),
};

export const avatarImageComponentViewModelMock: IAvatarImageComponentViewModel = {
  canvasSize$: new Subject(),
  loadImage: jest.fn(),
  calculateCanvasSize: jest.fn(),
  elementOffset$: new Subject(),
  setInitialElementOffset: jest.fn(),
  turnOffIsMouseDown: jest.fn(),
  fromMouseEvent: jest.fn(),
  moveImage: jest.fn(),
  startMoveImage: jest.fn(),
};

export const exportCanvasModelMock: IExportCanvasModel = {
  exportToPng: jest.fn(),
};

export const moveImageViewModelMock: IImageMoveModel = {
  fromMouseEvent: jest.fn(),
  turnOffIsMouseDown: jest.fn(),
  turnOnIsMouseDown: jest.fn(),
  elementOffset$: new Subject(),
  setInitialElementOffset: jest.fn(),
  finishMoveImage: jest.fn(),
  moveImage: jest.fn(),
  startMoveImage: jest.fn(),
  updateElementPosition: jest.fn(),
};

export const resizeImageModelMock: IResizeImageModel = {
  calcResize: jest.fn(),
};

export const imageResizeModelFactoryMock: IImageResizeModelFactory = jest.fn().mockReturnValue(resizeImageModelMock);

export const topLeftCssCalculatorMock: ITopLeftCssCalculatorModel = {
  calcTopLeftCss: jest.fn(),
};
