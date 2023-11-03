import { createContext } from 'react';
import { TAppEnv } from 'types';

export type ISettingContext = TAppEnv;

export const SettingContext = createContext<ISettingContext>({} as ISettingContext);
