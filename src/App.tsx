import { APP_ENV } from 'appEnv';
import { MainComponent, SettingContextWrapper } from 'components';
import { moveImageAreaViewModel } from 'modelBuilder';

export const App = () => (
  <SettingContextWrapper translations={APP_ENV.translations}>
    <MainComponent moveImageAreaViewModel={moveImageAreaViewModel} />
  </SettingContextWrapper>
);

export default App;
