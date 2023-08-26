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
  currentSizeWithTopLeftPosition$: Observable<TCanvasSizeWithOffset>;
  calcResize: (
    width: number,
    event: React.MouseEvent,
    topLeft: TPosition,
    imgRect: DOMRect,
  ) => void;
  handleStartResize: (element: any, event: React.MouseEvent) => void;
  handleFinishResize: () => void;
  prepareOffsetsForDots: (
    imageTopLeft: TPosition,
    imageWidth: number,
    imageHeight: number,
  ) => TResizeDots;

  testMouseDown: boolean; //TODO tmp
}

export class ResizeAvatarImageComponentViewModel
  extends AMouseHandler
  implements IResizeAvatarImageComponentViewModel
{
  private _currentSizeWithTopLeftPosition$ = new BehaviorSubject<TCanvasSizeWithOffset>(
    DEFAULT_SIZE,
  );
  public readonly currentSizeWithTopLeftPosition$ =
    this._currentSizeWithTopLeftPosition$.asObservable();

  constructor(
    private readonly _drawAvatarOnCanvasModel: IDrawImageOnCanvasModel,
    private readonly _moveImageViewModel: IAvatarImageMoveModel,
  ) {
    super();
    this._updateCurrentSizeWithTopLeftPosition();
  }

  get testMouseDown() {
    return this.isMouseDown;
  }

  private _updateCurrentSizeWithTopLeftPosition() {
    combineLatest([
      this._drawAvatarOnCanvasModel.canvasSize$,
      this._moveImageViewModel.elementOffset$,
    ]).subscribe(([size, offset]) => {
      this._currentSizeWithTopLeftPosition$.next({ size, offset });
    });
  }

  private _prepareSizesWithRatio = (currentWidth: number, ratio: number) => {
    const MIN_WIDTH = 100; //todo env
    const width = currentWidth < MIN_WIDTH ? MIN_WIDTH : currentWidth;
    const height = width / ratio;
    return { width, height };
  };

  // TODO only for tests
  public calcResize(
    width: number,
    event: React.MouseEvent,
    topLeft: TPosition,
    imageRect: DOMRect,
  ) {
    if (this.isMouseDown) {
      const ratio = imageRect.width / imageRect.height;

      const size = this._prepareSizesWithRatio(width, ratio);

      this._moveImageViewModel.turnOffIsMouseDown();
      this._drawAvatarOnCanvasModel.calculateCanvasSize(size.height, size.width);
      this._moveImageViewModel.updateElementPosition2(topLeft);
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
