import { Button, Typography } from '@mui/material';
import { useSettingsContext } from 'components/SettingsContextComponent';
import { AppContainer } from 'components/elements';

export const FooterView = () => {
  const { translations } = useSettingsContext();

  return (
    <AppContainer>
      <Button href={translations.repoLink}>{translations.repoText}</Button>
      <Typography variant="overline">{translations.author}</Typography>
      <Button href={translations.linkedinLink}>{translations.contact}</Button>
    </AppContainer>
  );
};
