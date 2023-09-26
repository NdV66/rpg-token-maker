import { PropsWithChildren, useContext } from 'react';
import { SettingContext } from 'viewModels';
import { TTranslations } from 'types';

type Props = {
  translations: TTranslations;
};

export const SettingContextWrapper = ({ translations, children }: PropsWithChildren<Props>) => {
  const value = { translations };

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};

export const useSettingsContext = () => useContext(SettingContext);
