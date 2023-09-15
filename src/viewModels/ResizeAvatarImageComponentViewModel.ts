import {
  AMouseHandler,
  IAMouseHandler,
  IImageMoveModel,
  IDrawImageOnCanvasModel,
  IImageResizeModelFactory,
  IResizeImageModel,
} from 'models';
import { roundNumber } from 'models/tool';
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
  handleStartResize: (element: any, event: React.MouseEvent, image: HTMLCanvasElement) => void;
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
      const topLeft = { x: image.offsetLeft, y: image.offsetTop };
      const parentOffset = {
        x: image.parentElement!.offsetLeft,
        y: image.parentElement!.offsetTop,
      };

      const { width, height, cssA } = this._currentImageResizeModel.calcResize(
        currentDot,
        mousePosition,
        { width: image.width, height: image.height },
        topLeft,
        A,
        parentOffset,
      );

      this._moveImageViewModel.turnOffIsMouseDown();
      this._drawAvatarOnCanvasModel.calculateCanvasSize(height, width);
      this._moveImageViewModel.updateElementPositionRaw(cssA);
    }
  }

  public handleFinishResize = () => {
    this._currentImageResizeModel = null;
    this.turnOffIsMouseDown();
    this._moveImageViewModel.handleMouseUp();
  };

  public handleStartResize = (
    element: TPosition,
    event: React.MouseEvent,
    image: HTMLCanvasElement,
  ) => {
    const rawRatio = image.width / image.height; //TODO: BETTER ratio calc!
    const ratio = roundNumber(rawRatio);
    this._currentImageResizeModel = this._imageResizeModelFactory(ratio);
    this.turnOnIsMouseDown();
    this._moveImageViewModel.handleMouseDown(element, event);
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
