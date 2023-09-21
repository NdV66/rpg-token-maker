import {
  AMouseHandler,
  IAMouseHandler,
  IImageMoveModel,
  IDrawImageOnCanvasModel,
  IImageResizeModelFactory,
  IResizeImageModel,
  ITopLeftCssCalculatorModel,
} from 'models';
import { roundNumber } from 'models/tools';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { EDotsNames, TCanvasSize, TPosition, TResizeDots, TSize } from 'types';

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
  handleStartResize: (image: HTMLCanvasElement) => void;
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
  private _currentSizeWithTopLeftPosition$ = new BehaviorSubject(DEFAULT_SIZE);
  private _currentImageResizeModel: IResizeImageModel | null = null;

  public readonly currentSizeWithTopLeftPosition$ =
    this._currentSizeWithTopLeftPosition$.asObservable();

  constructor(
    private readonly _drawAvatarOnCanvasModel: IDrawImageOnCanvasModel,
    private readonly _moveImageViewModel: IImageMoveModel,
    private readonly _imageResizeModelFactory: IImageResizeModelFactory,
    private readonly _topLeftCssCalculator: ITopLeftCssCalculatorModel,
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

  private _calcRatio(image: TSize) {
    return Math.min(image.width / image.height);
  }

  /**
   * This calculation is based on pageY and pageX.
   * @param currentDot
   * @param event
   * @param image
   */
  public handleResize(currentDot: EDotsNames, event: React.MouseEvent, image: HTMLCanvasElement) {
    if (this.isMouseDown && this._currentImageResizeModel) {
      const imageRect = image.getBoundingClientRect();
      const mousePosition: TPosition = {
        x: event.pageX,
        y: event.pageY,
      };
      const A: TPosition = { x: imageRect.left, y: imageRect.top }; //pageX and pageY for HTML element
      const parentOffset = {
        x: image.parentElement!.offsetLeft,
        y: image.parentElement!.offsetTop,
      };

      const newImageSize = this._currentImageResizeModel.calcResize(
        currentDot,
        mousePosition,
        { width: image.width, height: image.height },
        A,
      );

      const cssA = this._topLeftCssCalculator.calcTopLeftCss(
        currentDot,
        parentOffset,
        newImageSize,
        mousePosition,
      );
      this._moveImageViewModel.turnOffIsMouseDown();
      this._drawAvatarOnCanvasModel.calculateCanvasSize(newImageSize.height, newImageSize.width);
      this._moveImageViewModel.updateElementPositionRaw(cssA);
    }
  }

  public handleFinishResize = () => {
    this._currentImageResizeModel = null;
    this.turnOffIsMouseDown();
    this._moveImageViewModel.finishMoveImage();
  };

  public handleStartResize = (image: HTMLCanvasElement) => {
    const ratio = roundNumber(this._calcRatio(image));
    this._currentImageResizeModel = this._imageResizeModelFactory(ratio);
    this.turnOnIsMouseDown();
  };

  public prepareOffsetsForDots({ x, y }: TPosition, imageWidth: number, imageHeight: number) {
    return {
      [EDotsNames.A]: { x, y },
      [EDotsNames.B]: { x: x + imageWidth, y },
      [EDotsNames.C]: { x: x + imageWidth, y: y + imageHeight },
      [EDotsNames.D]: { x, y: y + imageHeight },
    };
  }
}
