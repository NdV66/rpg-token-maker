import { IImageMoveModel, IDrawImageOnCanvasModel } from 'models';
import { Observable } from 'rxjs';
import { IDrawImageOnCanvasViewModel, TCanvasSize, TPosition } from 'types';

export interface IAvatarImageComponentViewModel extends IDrawImageOnCanvasViewModel {
  canvasSize$: Observable<TCanvasSize>;
  elementOffset$: Observable<TPosition>;

  turnOffIsMouseDown: () => void;
  fromMouseEvent: <T extends HTMLElement>(
    element: T,
    trigger: string,
  ) => Observable<React.MouseEvent<Element, MouseEvent>>;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseDown: <T extends HTMLElement>(element: T, event: React.MouseEvent) => void;
}

export class AvatarImageComponentViewModel implements IAvatarImageComponentViewModel {
  constructor(
    private readonly _drawImageOnCanvasModel: IDrawImageOnCanvasModel,
    private readonly _imageMoveModel: IImageMoveModel,
  ) {}

  get canvasSize$() {
    return this._drawImageOnCanvasModel.canvasSize$;
  }

  get elementOffset$() {
    return this._imageMoveModel.elementOffset$;
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

  public handleMouseMove: IImageMoveModel['handleMouseMove'] = (event) => {
    this._imageMoveModel.handleMouseMove(event);
  };

  public handleMouseDown: IImageMoveModel['handleMouseDown'] = (element, event) => {
    this._imageMoveModel.handleMouseDown(element, event);
  };

  public loadImage: IDrawImageOnCanvasModel['loadImage'] = (src, width) => {
    return this._drawImageOnCanvasModel.loadImage(src, width);
  };
}
