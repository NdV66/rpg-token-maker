import { IDrawImageOnCanvasViewModel } from './DrawImageOnCanvasViewModel';
import { IImageOnCanvasMoveViewModel } from './ImageOnCanvasMoveViewModel';

export interface IAvatarImageComponentViewModel {
  drawImageOnCanvasViewModel: IDrawImageOnCanvasViewModel;
  imageOnCanvasMoveViewModel: IImageOnCanvasMoveViewModel;
}

export class AvatarImageComponentViewModel implements IAvatarImageComponentViewModel {
  constructor(
    public readonly drawImageOnCanvasViewModel: IDrawImageOnCanvasViewModel,
    public readonly imageOnCanvasMoveViewModel: IImageOnCanvasMoveViewModel,
  ) {}
}
