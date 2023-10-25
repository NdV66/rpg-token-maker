import { TAppEnv } from 'types';
import { enEN } from 'data';
import { DARK_THEME } from 'data/theme';

export const APP_ENV: TAppEnv = {
  translations: enEN,
  theme: DARK_THEME,
  defaultImageWidth: 300, //the same in css
  defaultFrameSize: 200, //the same in css
  workspaceSize: 600, //the same in css
  minImageSize: 100,
};
