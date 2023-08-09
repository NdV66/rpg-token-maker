import { APP_ENV } from 'appEnv';
import {
  MainComponentViewModel,
  DrawImageOnCanvasViewModel,
  ImageOnCanvasMoveViewModel,
} from 'viewModels';

const drawImageOnCanvasViewModel = new DrawImageOnCanvasViewModel(APP_ENV);
const imageOnCanvasMoveViewModel = new ImageOnCanvasMoveViewModel();

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  drawImageOnCanvasViewModel,
  imageOnCanvasMoveViewModel,
);
