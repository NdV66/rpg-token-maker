import { PropsWithChildren, useContext } from 'react';
import { SettingContext } from 'viewModels';
import { TAppEnv } from 'types';

type Props = {
  appEnv: TAppEnv;
};

export const SettingContextWrapper = ({ appEnv, children }: PropsWithChildren<Props>) => {
  const value = {
    ...appEnv,
  };

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};

export const useSettingsContext = () => useContext(SettingContext);
