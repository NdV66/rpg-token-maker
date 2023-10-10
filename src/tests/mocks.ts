import { TAppEnv } from 'types';
import { enEN } from 'data';
import { IImageLoaderModel } from 'models';

export const commonErrorMock = new Error('mocked error');

export const appEnvMock: TAppEnv = {
  translations: enEN,
  defaultImageWidth: 300, //the same in css
  defaultFrameSize: 200, //the same in css
  workspaceSize: 600, //the same in css
  minImageSize: 100,
};

export const imageLoaderModelMock: IImageLoaderModel = {
  loadImage: jest.fn(),
};
