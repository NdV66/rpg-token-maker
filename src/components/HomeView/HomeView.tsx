import { ThemeProvider, CssBaseline } from '@mui/material';
import { ResizeView } from '../ResizeView';
import { IMainComponentViewModel } from 'viewModels';
import { useMuiTheme } from '../useMuiTheme';
import { useSettingsContext } from '../SettingsContextComponent';
import { AppNavbarView } from './AppNavbarView';
import { ResizeViewWrapper } from './ResizeViewWrapper';

type Props = {
  resizeComponentViewModel: IMainComponentViewModel;
};

export const HomePage = ({ resizeComponentViewModel }: Props) => {
  const { theme } = useSettingsContext();
  const muiTheme = useMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <header role="heading" aria-level={0}>
        <AppNavbarView />
      </header>

      <main role="main">
        <ResizeViewWrapper>
          <ResizeView resizeComponentViewModel={resizeComponentViewModel} />
        </ResizeViewWrapper>
      </main>
    </ThemeProvider>
  );
};
