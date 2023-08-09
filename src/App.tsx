import { APP_ENV } from 'appEnv';
import { MainComponent, SettingContextWrapper } from 'components';
import { mainComponentViewModel } from 'modelBuilder';

export const App = () => (
  <SettingContextWrapper translations={APP_ENV.translations}>
    <MainComponent mainComponentViewModel={mainComponentViewModel} />
  </SettingContextWrapper>
);

export default App;
