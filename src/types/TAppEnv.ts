import { TAppTheme } from './TAppTheme';
import { TTranslations } from './TTranslations';

export type TAppEnv = {
  translations: TTranslations;
  theme: TAppTheme;
  defaultImageWidth: number;
  defaultFrameSize: number;
  workspaceSize: number; //TODO: separate width and height
  minImageSize: number;
};
