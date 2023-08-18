import {
  AMouseHandler,
  IAMouseHandler,
  IAvatarImageMoveModel,
  IDrawImageOnCanvasModel,
} from 'models';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { EDotsNames, TCanvasSize, TPosition, TResizeDots } from 'types';

type TCanvasSizeWithOffset = {
  size: TCanvasSize;
  offset: TPosition;
};

const DEFAULT_SIZE: TCanvasSizeWithOffset = {
  size: {
    height: 0,
    styleHeight: 0,
    width: 0,
    styleWidth: 0,
  },
  offset: { x: 0, y: 0 },
};

export interface IResizeAvatarImageComponentViewModel extends IAMouseHandler {
  currentSizeWithOffset$: Observable<TCanvasSizeWithOffset>;
  calcResize: (width: number, height: number, event: React.MouseEvent) => void;
  handleStartResize: (element: any, event: React.MouseEvent) => void;
  handleFinishResize: () => void;
  prepareOffsetsForDots: (
    imageTopLeft: TPosition,
    imageWidth: number,
    imageHeight: number,
  ) => TResizeDots;

  testMouseDown: boolean;
}

export class ResizeAvatarImageComponentViewModel
  extends AMouseHandler
  implements IResizeAvatarImageComponentViewModel
{
  private _currentSizeWithOffset$ = new BehaviorSubject<TCanvasSizeWithOffset>(DEFAULT_SIZE);

  constructor(
    private readonly _drawAvatarOnCanvasModel: IDrawImageOnCanvasModel,
    private readonly _moveImageViewModel: IAvatarImageMoveModel,
  ) {
    super();
    this._updateCurrentSizeWithOffset();
  }

  get testMouseDown() {
    return this.isMouseDown;
  }

  private _updateCurrentSizeWithOffset() {
    combineLatest([
      this._drawAvatarOnCanvasModel.canvasSize$,
      this._moveImageViewModel.elementOffset$,
    ]).subscribe(([size, offset]) => {
      this._currentSizeWithOffset$.next({ size, offset });
    });
  }

  get currentSizeWithOffset$() {
    return this._currentSizeWithOffset$.asObservable();
  }

  // TODO only for tests
  public calcResize(width: number, height: number, event: React.MouseEvent) {
    if (this.isMouseDown) {
      this._drawAvatarOnCanvasModel.calculateCanvasSize(height, width);
      //   this._moveImageViewModel.updateElementPosition(topLeft);
      this._moveImageViewModel.turnOnIsMouseDown();
      this._moveImageViewModel.handleMouseMove(event);
      this._moveImageViewModel.turnOffIsMouseDown();
    }
  }

  public handleFinishResize = () => {
    this.turnOffIsMouseDown();
    this._moveImageViewModel.handleMouseUp();
  };

  public handleStartResize = (element: any, event: React.MouseEvent) => {
    this.turnOnIsMouseDown();

    this._moveImageViewModel.handleMouseDown(element, event);
  };

  public prepareOffsetsForDots(imageTopLeft: TPosition, imageWidth: number, imageHeight: number) {
    const { x, y } = imageTopLeft;

    return {
      [EDotsNames.A]: { x, y },
      [EDotsNames.B]: { x: x + imageWidth, y },
      [EDotsNames.C]: { x: x + imageWidth, y: y + imageHeight },
      [EDotsNames.D]: { x, y: y + imageHeight },
    };
  }
}
