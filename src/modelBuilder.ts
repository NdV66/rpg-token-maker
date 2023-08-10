import { APP_ENV } from 'appEnv';
import {
  MainComponentViewModel,
  DrawImageOnCanvasViewModel,
  ImageOnCanvasMoveViewModel,
  ExportCanvasViewModel,
} from 'viewModels';

const drawImageOnCanvasViewModel = new DrawImageOnCanvasViewModel(APP_ENV);
const imageOnCanvasMoveViewModel = new ImageOnCanvasMoveViewModel();
const exportCanvasViewModel = new ExportCanvasViewModel(APP_ENV);

export const mainComponentViewModel = new MainComponentViewModel(
  APP_ENV,
  drawImageOnCanvasViewModel,
  imageOnCanvasMoveViewModel,
  exportCanvasViewModel,
);
