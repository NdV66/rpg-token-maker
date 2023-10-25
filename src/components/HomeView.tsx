import { ThemeProvider, CssBaseline } from '@mui/material';
import { MainComponent } from './MainComponent/MainComponent';
import { IMainComponentViewModel } from 'viewModels';
import { useMuiTheme } from './useMuiTheme';
import { useSettingsContext } from './SettingsContextComponent';
import { AppNavbarView } from './AppNavbarView';

type Props = {
  mainComponentViewModel: IMainComponentViewModel;
};

export const HomePage = ({ mainComponentViewModel }: Props) => {
  const { theme } = useSettingsContext();
  const muiTheme = useMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <header role="heading" aria-level={0}>
        <AppNavbarView />
      </header>

      <main role="main">
        <MainComponent mainComponentViewModel={mainComponentViewModel} />
      </main>
    </ThemeProvider>
  );
};
