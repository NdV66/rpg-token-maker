import { createContext } from 'react';
import { TTranslations } from 'types';

export type ISettingContext = {
  translations: TTranslations;
};

export const SettingContext = createContext<ISettingContext>({} as ISettingContext);
