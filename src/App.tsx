import { APP_ENV } from 'appEnv';
import { MainComponent } from 'components';
import { SettingContextWrapper } from 'components/SettingsContextComponent';

export const App = () => (
  <SettingContextWrapper translations={APP_ENV.translations}>
    <MainComponent />
  </SettingContextWrapper>
);

export default App;
