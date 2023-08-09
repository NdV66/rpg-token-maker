import { APP_ENV } from 'appEnv';
import { MainComponent, SettingContextWrapper } from 'components';
import { avatarImageComponentViewModel } from 'modelBuilder';

export const App = () => (
  <SettingContextWrapper translations={APP_ENV.translations}>
    <MainComponent avatarImageComponentViewModel={avatarImageComponentViewModel} />
  </SettingContextWrapper>
);

export default App;
