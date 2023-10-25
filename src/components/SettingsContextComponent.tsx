import { PropsWithChildren, useContext } from 'react';
import { SettingContext } from 'viewModels';
import { TAppTheme, TTranslations } from 'types';

type Props = {
  translations: TTranslations;
  theme: TAppTheme;
};

export const SettingContextWrapper = ({ translations, theme, children }: PropsWithChildren<Props>) => {
  const value = {
    translations,
    theme,
  };

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};

export const useSettingsContext = () => useContext(SettingContext);
