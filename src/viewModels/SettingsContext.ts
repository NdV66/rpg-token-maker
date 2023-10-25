import { createContext } from 'react';
import { TAppTheme, TTranslations } from 'types';

export type ISettingContext = {
  translations: TTranslations;
  theme: TAppTheme;
};

export const SettingContext = createContext<ISettingContext>({} as ISettingContext);
