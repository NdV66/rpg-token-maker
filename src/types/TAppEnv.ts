import { TAppTheme } from './TAppTheme';
import { TTranslations } from './TTranslations';

export type TAppEnv = {
  translations: TTranslations;
  theme: TAppTheme;
  defaultImageWidth: number;
  defaultFrameSize: number;
  workspaceSize: number;
  minImageSize: number;
};
