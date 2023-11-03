import { ThemeProvider, CssBaseline, Alert, styled } from '@mui/material';
import { ResizeView } from '../ResizeView';
import { IResizeComponentViewModel } from 'viewModels';
import { useMuiTheme } from '../useMuiTheme';
import { useSettingsContext } from '../SettingsContextComponent';
import { AppNavbarView } from './AppNavbarView';
import { ResizeViewWrapper } from './ResizeViewWrapper';
import { FooterView } from './FooterView';
import { AppContainer } from 'components/elements';

type Props = {
  resizeComponentViewModel: IResizeComponentViewModel;
};

export const HomePage = ({ resizeComponentViewModel }: Props) => {
  const { theme, translations } = useSettingsContext();
  const muiTheme = useMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <header role="heading" aria-level={0}>
        <AppNavbarView />
      </header>

      <main role="main">
        <AppContainer>
          <Alert severity="info">{translations.info}</Alert>
        </AppContainer>

        <ResizeViewWrapper>
          <ResizeView resizeComponentViewModel={resizeComponentViewModel} />
        </ResizeViewWrapper>
      </main>

      <footer>
        <FooterView />
      </footer>
    </ThemeProvider>
  );
};
