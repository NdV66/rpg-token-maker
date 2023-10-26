import { TAppEnv } from 'types';
import { enEN } from 'data';
import { DARK_THEME } from 'data/theme';

export const APP_ENV: TAppEnv = {
  translations: enEN,
  theme: DARK_THEME,
  defaultImageWidth: 300,
  defaultFrameSize: 200,
  workspaceSize: 800,
  minImageSize: 100,
};
