import {
  AMouseHandler,
  IAMouseHandler,
  IAvatarImageMoveModel,
  IDrawImageOnCanvasModel,
  IResizeImageModel,
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
  handleResize: (currentDot: EDotsNames, event: React.MouseEvent, image: HTMLCanvasElement) => void;
  handleStartResize: (element: any, event: React.MouseEvent) => void;
  handleFinishResize: () => void;
  prepareOffsetsForDots: (
    imageTopLeft: TPosition,
    imageWidth: number,
    imageHeight: number,
  ) => TResizeDots;
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
    private readonly _resizeImageModel: IResizeImageModel,
  ) {
    super();
    this._updateCurrentSizeWithTopLeftPosition();
  }

  private _updateCurrentSizeWithTopLeftPosition() {
    combineLatest([
      this._drawAvatarOnCanvasModel.canvasSize$,
      this._moveImageViewModel.elementOffset$,
    ]).subscribe(([size, offset]) => {
      this._currentSizeWithTopLeftPosition$.next({ size, offset });
    });
  }

  public handleResize(currentDot: EDotsNames, event: React.MouseEvent, image: HTMLCanvasElement) {
    if (this.isMouseDown) {
      const { width, height, cssA } = this._resizeImageModel.calcResize(currentDot, event, image);

      this._moveImageViewModel.turnOffIsMouseDown();
      this._drawAvatarOnCanvasModel.calculateCanvasSize(height, width);
      this._moveImageViewModel.updateElementPosition2(cssA);
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
