import { IAvatarImageMoveModel, IDrawImageOnCanvasModel } from 'models';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDrawImageOnCanvasViewModel, TCanvasSize, TPosition } from 'types';

export interface IAvatarImageComponentViewModel extends IDrawImageOnCanvasViewModel {
  canvasSize$: Observable<TCanvasSize>;
  elementOffset$: Observable<TPosition>;

  turnOffIsMouseDown: () => void;
  fromMouseEvent: <T extends HTMLElement>(
    element: T,
    trigger: string,
  ) => Observable<React.MouseEvent<Element, MouseEvent>>;
  handleMoveElement: (event: React.MouseEvent) => void;
  handleMouseDown: <T extends HTMLElement>(element: T, event: React.MouseEvent) => void;
}

//TODO to envs
const DEFAULT_SIZE: TCanvasSize = {
  height: 0,
  styleHeight: 0,
  width: 0,
  styleWidth: 0,
};

export class AvatarImageComponentViewModel implements IAvatarImageComponentViewModel {
  private _canvasSize$ = new BehaviorSubject<TCanvasSize>(DEFAULT_SIZE);

  constructor(
    private readonly _drawImageOnCanvasModel: IDrawImageOnCanvasModel,
    private readonly _imageMoveModel: IAvatarImageMoveModel,
  ) {}

  get canvasSize$() {
    return this._canvasSize$.asObservable();
  }

  get elementOffset$() {
    return this._imageMoveModel.elementOffset$;
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    const size = this._drawImageOnCanvasModel.calculateCanvasSize(drawHeight, defaultImageWidth);
    this._canvasSize$.next(size);
    return size;
  }

  public turnOffIsMouseDown() {
    this._imageMoveModel.turnOffIsMouseDown();
  }

  public fromMouseEvent: IAvatarImageMoveModel['fromMouseEvent'] = (element, trigger) => {
    return this._imageMoveModel.fromMouseEvent(element, trigger);
  };

  public handleMoveElement: IAvatarImageMoveModel['handleMoveElement'] = (event) => {
    this._imageMoveModel.handleMoveElement(event);
  };

  public handleMouseDown: IAvatarImageMoveModel['handleMouseDown'] = (element, event) => {
    this._imageMoveModel.handleMouseDown(element, event);
  };

  public loadImage: IDrawImageOnCanvasModel['loadImage'] = (src, width) => {
    return this._drawImageOnCanvasModel.loadImage(src, width);
  };
}
