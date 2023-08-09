import { APP_ENV } from 'appEnv';
import { AvatarImageComponentViewModel, ImageOnCanvasViewModel } from 'viewModels';

const imageOnCanvasViewModel = new ImageOnCanvasViewModel(APP_ENV);

export const avatarImageComponentViewModel = new AvatarImageComponentViewModel(
  imageOnCanvasViewModel,
);
