import { APP_ENV } from 'appEnv';
import {
  AvatarImageComponentViewModel,
  DrawImageOnCanvasViewModel,
  ImageOnCanvasMoveViewModel,
} from 'viewModels';

const drawImageOnCanvasViewModel = new DrawImageOnCanvasViewModel(APP_ENV);
const imageOnCanvasMoveViewModel = new ImageOnCanvasMoveViewModel();

export const avatarImageComponentViewModel = new AvatarImageComponentViewModel(
  drawImageOnCanvasViewModel,
  imageOnCanvasMoveViewModel,
);
