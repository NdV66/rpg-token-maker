import { APP_ENV } from 'appEnv';
import { SettingContextWrapper } from 'components/SettingsContextComponent';

export const App = () => {
  return (
    <SettingContextWrapper translations={APP_ENV.translations}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </SettingContextWrapper>
  );
};

export default App;
