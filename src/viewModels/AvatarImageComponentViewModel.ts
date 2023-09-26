import { IImageMoveModel, IDrawImageOnCanvasModel } from 'models';
import { Observable } from 'rxjs';
import { IDrawImageOnCanvasViewModel, TCanvasSize, TPosition } from 'types';

export interface IAvatarImageComponentViewModel extends IDrawImageOnCanvasViewModel {
  canvasSize$: Observable<TCanvasSize>;
  elementOffset$: Observable<TPosition>;

  setInitialElementOffset: (offset: TPosition) => void;
  turnOffIsMouseDown: () => void;
  fromMouseEvent: IImageMoveModel['fromMouseEvent'];
  moveImage: (event: React.MouseEvent) => void;
  startMoveImage: (element: HTMLElement, event: React.MouseEvent) => void;
}

export class AvatarImageComponentViewModel implements IAvatarImageComponentViewModel {
  constructor(
    private readonly _drawImageOnCanvasModel: IDrawImageOnCanvasModel,
    private readonly _imageMoveModel: IImageMoveModel,
  ) {}

  public elementOffset$ = this._imageMoveModel.elementOffset$;
  public canvasSize$ = this._drawImageOnCanvasModel.canvasSize$;

  public setInitialElementOffset(offset: TPosition) {
    this._imageMoveModel.setInitialElementOffset(offset);
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    this._drawImageOnCanvasModel.calculateCanvasSize(drawHeight, defaultImageWidth);
  }

  public turnOffIsMouseDown() {
    this._imageMoveModel.turnOffIsMouseDown();
  }

  public fromMouseEvent: IImageMoveModel['fromMouseEvent'] = (element, trigger) => {
    return this._imageMoveModel.fromMouseEvent(element, trigger);
  };

  public moveImage: IImageMoveModel['moveImage'] = (event) => {
    this._imageMoveModel.moveImage(event);
  };

  public startMoveImage = (element: HTMLElement, event: React.MouseEvent) => {
    const topLeftOffset: TPosition = { x: element.offsetLeft, y: element.offsetTop };
    this._imageMoveModel.startMoveImage(topLeftOffset, event);
  };

  public loadImage: IDrawImageOnCanvasModel['loadImage'] = (src, width) => {
    return this._drawImageOnCanvasModel.loadImage(src, width);
  };
}
