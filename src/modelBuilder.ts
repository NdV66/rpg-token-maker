import {
  AvatarImageComponentViewModel,
  DrawImageOnCanvasViewModel,
  ImageOnCanvasMoveViewModel,
} from 'viewModels';

const drawImageOnCanvasViewModel = new DrawImageOnCanvasViewModel();
const imageOnCanvasMoveViewModel = new ImageOnCanvasMoveViewModel();

export const avatarImageComponentViewModel = new AvatarImageComponentViewModel(
  drawImageOnCanvasViewModel,
  imageOnCanvasMoveViewModel,
);
