import { TAppTheme } from './TAppTheme';
import { TTranslations } from './TTranslations';

export type TAppEnv = {
  translations: TTranslations;
  theme: TAppTheme;
  defaultImageWidth: number;
  defaultFrameSize: number;
  workspaceSizeWidth: number;
  workspaceSizeHeight: number;
  minImageSize: number;
};
