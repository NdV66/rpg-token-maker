import { APP_ENV } from 'appEnv';
import { SettingContextWrapper } from 'components';
import { HomePage } from 'components/HomeView/HomeView';
import { mainComponentViewModel } from 'modelBuilder';

export const App = () => (
  <SettingContextWrapper translations={APP_ENV.translations} theme={APP_ENV.theme}>
    <HomePage mainComponentViewModel={mainComponentViewModel} />
  </SettingContextWrapper>
);

export default App;
