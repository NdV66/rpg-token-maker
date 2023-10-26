import { APP_ENV } from 'appEnv';
import { SettingContextWrapper } from 'components';
import { HomePage } from 'components/HomeView/HomeView';
import { resizeComponentViewModel } from 'modelBuilder';

export const App = () => (
  <SettingContextWrapper appEnv={APP_ENV}>
    <HomePage resizeComponentViewModel={resizeComponentViewModel} />
  </SettingContextWrapper>
);

export default App;
