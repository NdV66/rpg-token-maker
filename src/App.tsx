import { APP_ENV } from 'appEnv';
import { SettingContextWrapper } from 'components';
import { HomePage } from 'components/HomeView/HomeView';
import { resizeComponentViewModel } from 'modelBuilder';

export const App = () => (
  <SettingContextWrapper translations={APP_ENV.translations} theme={APP_ENV.theme}>
    <HomePage resizeComponentViewModel={resizeComponentViewModel} />
  </SettingContextWrapper>
);

export default App;
